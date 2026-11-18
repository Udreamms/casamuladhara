// GET /formacion/agendar?l=<codigo>  -> anota que la postulante apretó «Elegir día y hora» (clic_agendar en su ficha del CRM) y la lleva a la agenda.
// El Píxel cuenta Schedule en la breve página de paso. El enlace de la agenda está en UN solo lugar: AGENDA_FORMACION_URL (banderas.js).
// Si ese enlace está vacío, abre el WhatsApp de Karen con el mensaje ya escrito (nunca un enlace roto).
import { FieldValue } from 'firebase-admin/firestore';
import { AGENDA_FORMACION_URL, WA_FORMACION } from '@/lib/server/banderas.js';
import { contactoPorCodigo } from '@/lib/server/embudo.js';
import { enlaceInvalido, esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';

export async function GET(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const prueba = process.env.NODE_ENV !== 'production' && codigo === 'PREVIEWLOCAL';
    const c = prueba ? { name: 'María Prueba' } : await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    if (!prueba) {
      await c.ref.update({
        agendaClicT: Date.now(),
        eventos: FieldValue.arrayUnion({ t: Date.now(), tipo: 'clic_agendar', texto: 'Pulsó «Elegir día y hora» para agendar su llamada de orientación' }),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
    const destino = AGENDA_FORMACION_URL || `${WHATSAPP}?text=${encodeURIComponent(WA_FORMACION)}`;
    return pagina('Abriendo la agenda…',
      `<h1>Un momento…</h1><p>Te llevamos a la agenda de Karen.</p><a class="b" href="${esc(destino)}">Continuar</a>
       <script>setTimeout(()=>location.replace(${JSON.stringify(destino)}),700)</script>`, 200, 'Schedule', `sch-${codigo}-${Date.now()}`);
  } catch (e) {
    console.error('formacion/agendar', e);
    return new Response(null, { status: 302, headers: { Location: '/formacion/postular' } });
  }
}
