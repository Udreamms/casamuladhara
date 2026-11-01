// GET /api/horarios -> { claseTarot, clasePendulo, tarot, pendulo, formacion }
// Fechas y horarios públicos de las landings, calculados desde el Calendario de la Maestra (calendario/{id}) a la hora de Chile.
// Se lee en el servidor: el calendario solo lo ve la Maestra y aquí solo sale lo que se puede mostrar (src/lib/server/horarios.js).
import { db } from '@/lib/server/services.js';
import { publico } from '@/lib/server/horarios.js';

export async function GET() {
  try {
    const s = await db().collection('calendario').get();
    return Response.json(publico(s.docs.map((d) => d.data())), { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
  } catch (e) {
    console.error('horarios', e);
    return Response.json({}, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
