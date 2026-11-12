// GET /comprar?l=<codigo>  -> anota el clic en "inscribirme" (el seguimiento queda para Karen si no paga) y lleva al pago.
//   Tarot: Stripe Checkout, 2 cuotas mensuales de 70 USD (se detiene solo tras la segunda; ver stripe-webhook).
//   Péndulo: pago fijo de 69.900 CLP en Mercado Pago. Con EMBUDO_EXTRAS=1: reserva de $10.000 por WhatsApp con el mensaje ya escrito (el saldo de $59.900 se paga antes de la primera clase).
// Pasa por una página breve para que el Píxel de Meta cuente InitiateCheckout (Tarot) o Contact (Péndulo) antes de salir.
import { extras, PAGO_RESERVA_PENDULO, reservaPendulo } from '@/lib/server/banderas.js';
import { cierreOferta, contactoPorCodigo, primerNombre, registrarEvento } from '@/lib/server/embudo.js';
import { contexto, enviarDespues, usuario } from '@/lib/server/meta.js';
import { enlaceInvalido, esc, pagina, WHATSAPP } from '@/lib/server/paginas.js';
import { appUrl, stripe, tarotPriceId } from '@/lib/server/services.js';

// Enlace de pago del Péndulo: Mercado Pago, 69.900 CLP, valor fijo
const PAGO_PENDULO = 'https://mpago.la/2jXpsgn';

const salida = (url, evento, id) => pagina('Abriendo…', `<h1>Un momento…</h1><p>Te llevamos al siguiente paso.</p><a class="b" href="${esc(url)}">Continuar</a>
  <script>setTimeout(()=>location.replace(${JSON.stringify(url)}),700)</script>`, 200, evento, id);

export async function GET(request) {
  const q = new URL(request.url).searchParams, codigo = q.get('l') || '';
  try {
    // Reserva de $10.000 del Péndulo desde /pendulo: directo a Mercado Pago (con el código personal, si viene, se anota el clic). Cerrada la inscripción, vuelve a la página del curso.
    if (q.get('curso') === 'pendulo' && q.get('pago') === 'reserva' && reservaPendulo()) {
      const cierre = cierreOferta('pendulo');
      if (cierre && Date.now() >= cierre) return new Response(null, { status: 302, headers: { Location: '/pendulo' } });
      if (codigo && await contactoPorCodigo(codigo)) await registrarEvento({ codigo, evento: 'clic_comprar', fechaIso: new Date().toISOString(), origen: 'pendulo' });
      return salida(PAGO_RESERVA_PENDULO, 'InitiateCheckout', `ic-reserva-${codigo || 'web'}-${Date.now()}`);
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
