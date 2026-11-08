// GET /comprar?l=<codigo>  -> anota el clic en "comprar" (el seguimiento queda para Karen si no paga) y lleva a la página del curso.
import { contactoPorCodigo, registrarEvento } from '@/lib/server/embudo.js';
import { enlaceInvalido } from '@/lib/server/paginas.js';

export async function GET(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const c = await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    await registrarEvento({ codigo, evento: 'clic_comprar', fechaIso: new Date().toISOString(), origen: 'replay' });
    return new Response(null, { status: 302, headers: { Location: `${c.clase === 'tarot' ? '/tarot' : '/pendulo'}?l=${codigo}#reservar`, 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('comprar', e);
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }
}
