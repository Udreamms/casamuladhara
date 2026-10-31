// GET /api/proximas?tipo=pendulo|tarot -> { nextStart }
// Fecha de inicio del próximo grupo de cada curso, para las landings /pendulo y /tarot.
// Sale del Calendario de la Maestra (calendario/{id}): la fecha más cercana, desde hoy (hora de Chile),
// de tipo 'curso-pendulo' o 'tarot'. Se lee en el servidor: el calendario solo lo ve la Maestra.
import { db } from '@/lib/server/services.js';

const TIPOS = { pendulo: 'curso-pendulo', tarot: 'tarot' };
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const hoyChile = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

export async function GET(request) {
  const tipo = TIPOS[new URL(request.url).searchParams.get('tipo')];
  if (!tipo) return Response.json({ error: 'Curso no válido.' }, { status: 400 });
  const headers = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };
  try {
    const hoy = hoyChile();
    // Solo filtro por tipo (índice simple); el resto se ordena aquí, son pocas fechas
    const s = await db().collection('calendario').where('type', '==', tipo).get();
    const nextStart = s.docs.map((d) => d.data().date).filter((f) => FECHA.test(f || '') && f >= hoy).sort()[0] || '';
    return Response.json({ nextStart }, { headers });
  } catch (e) {
    console.error('proximas', e);
    return Response.json({ nextStart: '' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
