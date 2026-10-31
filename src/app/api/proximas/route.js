// GET /api/proximas?tipo=pendulo|tarot -> { nextStart }
// Fecha de inicio del próximo grupo de cada curso, para las landings /pendulo y /tarot.
// La Maestra la edita en su portal (Ajustes del aula), que guarda en config/cursos: { pendulo: 'AAAA-MM-DD', tarot: 'AAAA-MM-DD' }.
import { db } from '@/lib/server/services.js';

const TIPOS = ['pendulo', 'tarot'];
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request) {
  const tipo = new URL(request.url).searchParams.get('tipo');
  if (!TIPOS.includes(tipo)) return Response.json({ error: 'Curso no válido.' }, { status: 400 });
  const headers = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };
  try {
    const d = (await db().doc('config/cursos').get()).data() || {};
    const nextStart = typeof d[tipo] === 'string' && FECHA.test(d[tipo]) ? d[tipo] : '';
    return Response.json({ nextStart }, { headers });
  } catch (e) {
    console.error('proximas', e);
    return Response.json({ nextStart: '' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
