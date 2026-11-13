// GET /comprar?l=<codigo>  -> anota el clic en "inscribirme" (el seguimiento queda para Karen si no paga) y lleva al pago.
//   Tarot: Stripe Checkout, 2 cuotas mensuales de 70 USD (se detiene solo tras la segunda; ver stripe-webhook).
//   Péndulo: pago fijo de 69.900 CLP en Mercado Pago. Con EMBUDO_EXTRAS=1: reserva de $10.000 por WhatsApp con el mensaje ya escrito (el saldo de $59.900 se paga antes de la primera clase).
// Pasa por una página breve para que el Píxel de Meta cuente InitiateCheckout (Tarot) o Contact (Péndulo) antes de salir.
import { FieldValue } from 'firebase-admin/firestore';
import { extras, PAGO_RESERVA_PENDULO, pagoPorWhatsapp, reservaPendulo, reservaTarot } from '@/lib/server/banderas.js';
import { cierreOferta, contactoPorCodigo, primerNombre, registrarEvento } from '@/lib/server/embudo.js';
import { contexto, enviarDespues, usuario } from '@/lib/server/meta.js';
import { enlaceInvalido, esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';
import { appUrl, db, stripe, tarotPriceId } from '@/lib/server/services.js';

// Enlace de pago del Péndulo: Mercado Pago, 69.900 CLP, valor fijo
const PAGO_PENDULO = 'https://mpago.la/2jXpsgn';

const salida = (url, evento, id, params = null) => pagina('Abriendo…', `<h1>Un momento…</h1><p>Te llevamos al siguiente paso.</p><a class="b" href="${esc(url)}">Continuar</a>
  <script>setTimeout(()=>location.replace(${JSON.stringify(url)}),700)</script>`, 200, evento, id, params);

// Checkout de Stripe de pago único por 10 USD (reserva del Tarot). El lead viaja como referencia; el webhook lo marca «Reservó» al aprobarse el pago.
async function checkoutReservaTarot(request, leadId, lead) {
  const origen = appUrl(request), idEv = `ic-reserva-tarot-${leadId}-${Date.now()}`;
  const sesion = await stripe().checkout.sessions.create({
    mode: 'payment', locale: 'es',
    line_items: [{ quantity: 1, price_data: { currency: 'usd', unit_amount: 1000, product_data: { name: 'Reserva Tarot Terapéutico' } } }],
    ...(lead.email ? { customer_email: lead.email } : {}),
    client_reference_id: leadId,
    metadata: { kind: 'tarot_reserva', lead: leadId },
    payment_intent_data: { metadata: { kind: 'tarot_reserva', lead: leadId } },
    success_url: `${origen}/tarot/reserva?estado=ok&session_id={CHECKOUT_SESSION_ID}&lead=${leadId}`,
    cancel_url: `${origen}/tarot/reserva?estado=cancelada&lead=${leadId}`,
  });
  enviarDespues({ nombre: 'InitiateCheckout', id: idEv, url: `${origen}/comprar`, user: usuario({ email: lead.email, phone: lead.whatsapp, nombre: lead.name }, contexto(request)), custom: { value: 10, currency: 'USD' } });
  return salida(sesion.url, 'InitiateCheckout', idEv, { value: 10, currency: 'USD', content_name: 'Reserva Tarot Terapéutico' });
}

export async function GET(request) {
  const q = new URL(request.url).searchParams, codigo = q.get('l') || '';
  try {
    // Reserva de 10 USD del Tarot desde /tarot: Checkout de Stripe de pago único (el concepto y el monto van en el propio Checkout, no en un precio guardado).
    // El lead (guardado por el formulario) viaja como referencia; el webhook lo marca «Reservó» al aprobarse el pago.
    if (q.get('curso') === 'tarot' && q.get('pago') === 'reserva' && reservaTarot()) {
      const cierre = cierreOferta('tarot');
      if (cierre && Date.now() >= cierre) return new Response(null, { status: 302, headers: { Location: '/tarot' } });
      const leadId = /^[A-Za-z0-9]{1,40}$/.test(q.get('lead') || '') ? q.get('lead') : '';
      const d = leadId ? await db().doc(`leads/${leadId}`).get() : null;
      if (!d?.exists || d.data().form !== 'tarot') return new Response(null, { status: 302, headers: { Location: '/tarot#oferta' } });
      return checkoutReservaTarot(request, leadId, d.data());
    }
    // Reserva de $10.000 del Péndulo desde /pendulo: directo a Mercado Pago (con el código personal, si viene, se anota el clic). Cerrada la inscripción, vuelve a la página del curso.
    if (q.get('curso') === 'pendulo' && q.get('pago') === 'reserva' && reservaPendulo()) {
      const cierre = cierreOferta('pendulo');
      if (cierre && Date.now() >= cierre) return new Response(null, { status: 302, headers: { Location: '/pendulo' } });
      if (codigo && await contactoPorCodigo(codigo)) await registrarEvento({ codigo, evento: 'clic_comprar', fechaIso: new Date().toISOString(), origen: 'pendulo' });
      return salida(PAGO_RESERVA_PENDULO, 'InitiateCheckout', `ic-reserva-${codigo || 'web'}-${Date.now()}`, { value: 10000, currency: 'CLP', content_name: 'Reserva Péndulo Hebreo Nivel 1' });
    }
    // Reserva desde la landing del replay (la persona ya tiene su código y su ficha en el CRM: no hay formulario):
    // se anota «reserva iniciada» en su ficha y va directo a Mercado Pago (Péndulo, 10.000 CLP) o a Stripe (Tarot, 10 USD).
    if (codigo && q.get('pago') === 'reserva') {
      const c = await contactoPorCodigo(codigo);
      if (!c) return enlaceInvalido();
      const tarot = c.clase === 'tarot', volver = { status: 302, headers: { Location: `/clase-${tarot ? 'tarot' : 'pendulo'}/replay?l=${encodeURIComponent(codigo)}#oferta` } };
      const cierre = cierreOferta(tarot ? 'tarot' : 'pendulo');
      if (!(tarot ? reservaTarot() : reservaPendulo()) || (cierre && Date.now() >= cierre)) return new Response(null, volver);
      await registrarEvento({ codigo, evento: 'clic_comprar', fechaIso: new Date().toISOString(), origen: 'replay' });
      if (!String(c.reserva?.estado || '').startsWith('pag')) await c.ref.update({ reserva: { monto: tarot ? 10 : 10000, moneda: tarot ? 'USD' : 'CLP', estado: 'iniciada', t: Date.now() }, updatedAt: FieldValue.serverTimestamp() });
      // Solución rápida: el pago lo coordina Karen por WhatsApp (la reserva ya quedó anotada en su ficha)
      if (pagoPorWhatsapp(tarot ? 'tarot' : 'pendulo')) {
        const texto = `Hola Karen, soy ${primerNombre(c.name)}. Quiero reservar mi cupo en el curso de ${tarot ? 'Tarot Terapéutico' : 'Péndulo Hebreo'}. Mi código: ${codigo}`;
        return salida(`${WHATSAPP}?text=${encodeURIComponent(texto)}`, 'Contact', `ct-reserva-${codigo}-${Date.now()}`);
      }
      if (tarot) return checkoutReservaTarot(request, c.id, c);
      return salida(PAGO_RESERVA_PENDULO, 'InitiateCheckout', `ic-reserva-${codigo}-${Date.now()}`, { value: 10000, currency: 'CLP', content_name: 'Reserva Péndulo Hebreo Nivel 1' });
    }
    if (!codigo && q.get('curso') === 'pendulo') return salida(PAGO_PENDULO, 'InitiateCheckout', `ic-pendulo-${Date.now()}`);
    const c = await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    await registrarEvento({ codigo, evento: 'clic_comprar', fechaIso: new Date().toISOString(), origen: 'replay' });
    const id = `ic-${codigo}-${Date.now()}`;

    if (c.clase === 'tarot') {
      const origen = appUrl(request);
      const sesion = await stripe().checkout.sessions.create({
        mode: 'subscription', locale: 'es', allow_promotion_codes: true,
        line_items: [{ price: tarotPriceId(), quantity: 1 }],
        ...(c.email ? { customer_email: c.email } : {}),
        client_reference_id: codigo,
        subscription_data: { metadata: { kind: 'tarot', codigo, installments: '2' } },
        metadata: { kind: 'tarot', codigo },
        success_url: `${origen}/clase-tarot/replay?l=${codigo}&pago=ok`,
        cancel_url: `${origen}/clase-tarot/replay?l=${codigo}#oferta`,
      });
      enviarDespues({ nombre: 'InitiateCheckout', id, url: `${origen}/comprar`, user: usuario({ email: c.email, phone: c.whatsapp, nombre: c.name }, contexto(request)), custom: { value: 140, currency: 'USD' } });
      return salida(sesion.url, 'InitiateCheckout', id);
    }

    // Péndulo: pago fijo de 69.900 CLP en Mercado Pago (un solo enlace, no se toma de ninguna otra parte)
    if (!extras()) return salida(PAGO_PENDULO, 'InitiateCheckout', id);

    const texto = `Hola Karen, soy ${primerNombre(c.name)}. Quiero reservar mi cupo en el curso de Péndulo Hebreo con la reserva de $10.000.`;
    return salida(`${WHATSAPP}?text=${encodeURIComponent(texto)}`, 'Contact', id);
  } catch (e) {
    console.error('comprar', e);
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }
}
