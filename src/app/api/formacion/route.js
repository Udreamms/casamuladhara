// GET /api/formacion -> { nextStart }
// Fecha de inicio del próximo grupo de la formación, para la portada y la landing /formacion.
// Sale del Calendario de la Maestra (calendario/{id}): la fecha más cercana, desde hoy (hora de Chile), de tipo 'formacion-inicio'.
// Si el calendario no tiene ninguna, se usa la fecha que se guardó antes en config/formacion.
//   nextStart: 'AAAA-MM-DD' o ''
import { db } from '@/lib/server/services.js';

const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const hoyChile = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

export async function GET() {
  const headers = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };
  try {
    const hoy = hoyChile();
    const s = await db().collection('calendario').where('type', '==', 'formacion-inicio').get();
    let nextStart = s.docs.map((d) => d.data().date).filter((f) => FECHA.test(f || '') && f >= hoy).sort()[0] || '';
    if (!nextStart) {
      const d = (await db().doc('config/formacion').get()).data() || {};
      nextStart = typeof d.nextStart === 'string' && FECHA.test(d.nextStart) ? d.nextStart : '';
    }
    return Response.json({ nextStart }, { headers });
  } catch (e) {
    console.error('formacion', e);
    return Response.json({ nextStart: '' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
