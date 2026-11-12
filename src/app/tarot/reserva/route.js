// GET /tarot/reserva?estado=ok&session_id=…&lead=…   -> vuelta de Stripe tras la reserva de 10 USD del Tarot
//   estado=ok (y Stripe confirma que está pagada): «¡Tu cupo está reservado!» + Purchase de 10 USD en el Píxel
//   cualquier otro caso (canceló o falló): «Tu pago no se completó» con el botón para volver a Stripe; el lead queda «Reserva iniciada, sin pago»
// La marca «Reservó» en el CRM la pone el webhook de Stripe (checkout.session.completed), no esta página.
import { FieldValue } from 'firebase-admin/firestore';
import { reservaTarot } from '@/lib/server/banderas.js';
import { esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';
import { db, stripe } from '@/lib/server/services.js';

const ID = /^[A-Za-z0-9_-]{1,80}$/;

export async function GET(request) {
  if (!reservaTarot()) return new Response(null, { status: 302, headers: { Location: '/tarot' } });
  const q = new URL(request.url).searchParams;
  const lead = ID.test(q.get('lead') || '') ? q.get('lead') : '';
  const sesionId = ID.test(q.get('session_id') || '') ? q.get('session_id') : '';
  try {
    if (q.get('estado') === 'ok' && sesionId) {
      const s = await stripe().checkout.sessions.retrieve(sesionId);
      if (s.payment_status === 'paid' && s.metadata?.kind === 'tarot_reserva') {
        return pagina('Tu cupo está reservado',
          `<h1>¡Tu cupo está reservado!</h1><p>Tus 10 USD se descuentan de tu primera cuota: pagas 60 USD antes del inicio del curso y 70 USD el segundo mes.</p>
           <p>Te escribimos por WhatsApp con el enlace de pago, el calendario y cómo te llega tu mazo.</p>
           <a class="b" href="${esc(WHATSAPP)}">Escribir a Karen por WhatsApp</a>`,
          200, 'Purchase', `compra-${s.id}`, { value: 10, currency: 'USD', content_name: 'Reserva Tarot Terapéutico' });
      }
    }
    // Sin pago: el lead queda «Reserva iniciada, sin pago» (nunca pisa una reserva ya pagada)
    if (lead) {
      const ref = db().doc(`leads/${lead}`), d = await ref.get();
      if (d.exists && d.data().form === 'tarot' && d.data().reserva?.estado === 'iniciada') await ref.update({ 'reserva.estado': 'sin_pago', updatedAt: FieldValue.serverTimestamp() });
    }
  } catch (e) {
    console.error('tarot/reserva', e);
  }
  const reintento = lead ? `/comprar?curso=tarot&pago=reserva&lead=${encodeURIComponent(lead)}` : '/tarot#oferta';
  return pagina('Tu pago no se completó',
    `<h1>Tu pago no se completó</h1><p>Puedes intentarlo de nuevo cuando quieras.</p><a class="b" href="${esc(reintento)}">Volver a Stripe</a>
     <p><a class="alt" href="${esc(WHATSAPP)}">¿Necesitas otra forma de pago? Escríbele a Karen</a></p>`, 200);
}
