// GET /formacion/gracias?l=<codigo>  -> página de gracias de la postulación a la Formación: agenda la llamada de orientación (20 minutos con Karen).
// El botón «Elegir día y hora» abre el MISMO calendario con el que se agendan las terapias en la web (agendar.js → /api/terapias):
// la persona elige día y hora entre los horarios libres de Karen, la cita queda en el Calendario del Portal y en su ficha, y el Píxel cuenta Schedule.
// PREVIEWLOCAL (solo en el computador local) permite ver la página sin datos reales.
import { WA_FORMACION } from '@/lib/server/banderas.js';
import { ORIENTACION } from '@/lib/server/agenda.js';
import { contactoPorCodigo } from '@/lib/server/embudo.js';
import { enlaceInvalido, esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';

export async function GET(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const prueba = process.env.NODE_ENV !== 'production' && codigo === 'PREVIEWLOCAL';
    const c = prueba ? { name: 'María Prueba' } : await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    const datos = `data-agendar="${esc(ORIENTACION)}" data-nombre="${esc(c.name || '')}" data-whatsapp="${esc(c.whatsapp || '')}" data-correo="${esc(c.email || '')}" data-codigo="${prueba ? '' : esc(codigo)}"`;
    return pagina('Gracias por postular',
      `<h1>Recibimos tu postulación</h1>
       <p>Gracias por contarnos de ti. Elige el día y la hora de tu llamada de orientación.</p>
       <p><button type="button" class="b" ${datos} style="padding:20px 42px;font-size:1rem;cursor:pointer">Elegir día y hora</button></p>
       <p class="muted">¿Prefieres escribirnos? <a class="alt" href="${esc(`${WHATSAPP}?text=${encodeURIComponent(WA_FORMACION)}`)}" target="_blank" rel="noopener">Habla con Karen por WhatsApp</a></p>
       <script src="/assets/js/landing/agendar.js" defer></script>`);
  } catch (e) {
    console.error('formacion/gracias', e);
    return pagina('Error', '<h1>No pudimos abrir la página</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
