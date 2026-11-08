// GET /confirmar?l=<codigo>&r=si|no  -> el botón "Sí estuve" / "No pude entrar" del primer mensaje. Queda como asistencia AUTODECLARADA
// (no se mezcla con "Entró" ni con "Asistió confirmado").
import { contactoPorCodigo, primerNombre, registrarEvento } from '@/lib/server/embudo.js';
import { enlaceInvalido, esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';

export async function GET(request) {
  const q = new URL(request.url).searchParams, codigo = q.get('l') || '', si = q.get('r') === 'si';
  if (!['si', 'no'].includes(q.get('r') || '')) return enlaceInvalido();
  try {
    const c = await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    await registrarEvento({ codigo, evento: si ? 'autodeclara_asistio' : 'autodeclara_no_asistio', fechaIso: new Date().toISOString(), origen: 'mensaje' });
    const replay = `${c.clase === 'tarot' ? '/clase-tarot' : '/clase-pendulo'}/replay?l=${esc(codigo)}`;
    return pagina('Gracias', si
      ? `<h1>¡Gracias, ${esc(primerNombre(c.name))}!</h1><p>Anotamos que estuviste en la clase. Qué alegría que hayas estado.</p><a class="b" href="${replay}">Ver el replay y la oferta</a>`
      : `<h1>Gracias por avisar, ${esc(primerNombre(c.name))}</h1><p>No te preocupes: puedes ver la clase completa cuando quieras.</p><a class="b" href="${replay}">Ver el replay</a><a class="b alt" href="${WHATSAPP}">Escribir por WhatsApp</a>`);
  } catch (e) {
    console.error('confirmar', e);
    return pagina('Error', '<h1>No pudimos anotar tu respuesta</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
