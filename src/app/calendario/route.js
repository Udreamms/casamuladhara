// GET /calendario?l=<codigo>  -> archivo .ics de la clase gratis de esa persona (con alarmas 1 hora y 15 minutos antes), para iPhone, Outlook y otros.
import { claseDePersona, ics } from '@/lib/server/gracias.js';
import { enlaceInvalido } from '@/lib/server/paginas.js';

export async function GET(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const d = await claseDePersona(codigo);
    if (!d) return enlaceInvalido();
    return new Response(ics(d, new URL(request.url).origin), { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': `attachment; filename="clase-${d.clase}.ics"`, 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('calendario', e);
    return new Response('No pudimos generar el calendario', { status: 500 });
  }
}
