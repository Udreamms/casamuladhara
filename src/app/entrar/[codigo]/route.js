// GET /entrar/<codigo>  -> anota el clic en "entrar" y lleva a la sala de la clase (Google Meet).
// Cuenta como "Entró" solo si el clic ocurre entre 10 minutos antes y 30 después del inicio de la clase.
import { configClases, contactoPorCodigo, registrarEvento } from '@/lib/server/embudo.js';
import { enlaceInvalido, pagina } from '@/lib/server/paginas.js';

export async function GET(request, { params }) {
  const { codigo } = await params;
  try {
    const c = await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    await registrarEvento({ codigo, evento: 'clic_entrar', fechaIso: new Date().toISOString(), origen: new URL(request.url).searchParams.get('o') || 'enlace' });
    const sala = (await configClases()).sala[c.clase];
    if (!/^https:\/\//i.test(sala || '')) return pagina('Clase', '<h1>Todavía no hay enlace de la clase</h1><p>Karen lo publicará en cuanto esté listo. Vuelve a abrir este enlace unos minutos antes de empezar.</p>', 200);
    return new Response(null, { status: 302, headers: { Location: sala, 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('entrar', e);
    return pagina('Error', '<h1>No pudimos abrir la clase</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
