// GET /formacion/gracias?l=<codigo>  -> página de gracias de la postulación a la Formación: agenda la llamada de orientación (20 minutos con Karen).
// El botón pasa por /formacion/agendar (anota clic_agendar en el CRM y el evento Schedule del Píxel) y abre la agenda.
// PREVIEWLOCAL (solo en el computador local) permite ver la página sin datos reales.
import { WA_FORMACION } from '@/lib/server/banderas.js';
import { contactoPorCodigo, primerNombre } from '@/lib/server/embudo.js';
import { enlaceInvalido, esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';

export async function GET(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const prueba = process.env.NODE_ENV !== 'production' && codigo === 'PREVIEWLOCAL';
    const c = prueba ? { name: 'María Prueba' } : await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    const nombre = esc(primerNombre(c.name));
    return pagina('Gracias por postular',
      `<h1>Gracias, ${nombre}. Agenda tu llamada de orientación de 20 minutos con Karen.</h1>
       <p>Es gratis y sin compromiso: conversamos sobre la Formación y resolvemos tus dudas.</p>
       <p><a class="b" href="/formacion/agendar?l=${esc(codigo)}" style="padding:20px 42px;font-size:1rem">Elegir día y hora</a></p>
       <p class="muted">¿Prefieres escribirnos? <a class="alt" href="${esc(`${WHATSAPP}?text=${encodeURIComponent(WA_FORMACION)}`)}" target="_blank" rel="noopener">Habla con Karen por WhatsApp</a></p>`);
  } catch (e) {
    console.error('formacion/gracias', e);
    return pagina('Error', '<h1>No pudimos abrir la página</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
