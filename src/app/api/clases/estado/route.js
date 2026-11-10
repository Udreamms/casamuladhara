// GET /api/clases/estado?clase=pendulo|tarot   (público, sin datos personales)
//   -> { cupos_disponibles, lista_espera }
//   cupos_disponibles: número de cupos que quedan, o null si el curso no tiene límite.
//   lista_espera: true cuando los cupos se llenaron y la lista de espera está activada (configuración por clase en /staff).
// Las landings lo leen para mostrar «Lista de espera» en el botón cuando el curso está lleno.
import { estadoCupos } from '@/lib/server/embudo.js';

const cabeceras = { 'Cache-Control': 'public, s-maxage=20, stale-while-revalidate=60', 'Access-Control-Allow-Origin': '*' };

export async function GET(request) {
  const clase = new URL(request.url).searchParams.get('clase') || '';
  if (!['pendulo', 'tarot'].includes(clase)) return Response.json({ error: 'clase_invalida' }, { status: 400, headers: cabeceras });
  try {
    const e = await estadoCupos(clase);
    return Response.json({ cupos_disponibles: e.cupos_disponibles, lista_espera: e.lista_espera }, { headers: cabeceras });
  } catch (err) {
    console.error('clases/estado', err);
    return Response.json({ error: 'error_interno' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
