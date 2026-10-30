// GET /api/formacion -> { nextStart, seats }
// Fecha de inicio del próximo grupo de la formación y sus cupos, para la landing /formacion.
// La Maestra los edita en su portal (Ajustes del aula), que guarda en config/formacion.
//   nextStart: 'AAAA-MM-DD' o ''   seats: número o null
import { db } from '@/lib/server/services.js';

const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export async function GET() {
  const headers = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };
  try {
    const d = (await db().doc('config/formacion').get()).data() || {};
    const nextStart = typeof d.nextStart === 'string' && FECHA.test(d.nextStart) ? d.nextStart : '';
    const seats = Number.isInteger(d.seats) && d.seats > 0 ? d.seats : null;
    return Response.json({ nextStart, seats }, { headers });
  } catch (e) {
    console.error('formacion', e);
    return Response.json({ nextStart: '', seats: null }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
