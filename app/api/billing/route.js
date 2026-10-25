// POST /api/billing  (Authorization: Bearer <token de Firebase>, cuerpo { kind })
//   kind 'cuotas'   -> Stripe Checkout de la formación en cuotas mensuales (o el portal si ya está inscrita)
//   kind 'completo' -> pago único: la formación completa, o lo que falta si ya paga en cuotas
//   kind 'portal'   -> portal de Stripe (cambiar tarjeta, pagar una cuota pendiente o cancelar)
// Devuelve { url }.
import { INSTALLMENTS } from '../_lib/access.js';
import { appUrl, auth, db, fullPriceId, json, priceId, stripe } from '../_lib/server.js';

const LIVE = ['active', 'trialing', 'past_due', 'unpaid'];

export async function POST(request) {
  const header = request.headers.get('authorization') || '';
  let user;
  try {
    user = await auth().verifyIdToken(header.replace(/^Bearer\s+/i, ''));
  } catch {
    return json({ error: 'Tu sesión expiró. Vuelve a iniciar sesión.' }, 401);
  }
  const { kind = 'cuotas' } = await request.json().catch(() => ({}));

  try {
    const ref = db().doc(`users/${user.uid}`);
    const profile = (await ref.get()).data() || {};
    if (profile.plan === 'completo') return json({ error: 'Tu formación ya está pagada.' }, 400);
    const origin = appUrl(request);
    const live = profile.stripeSubscriptionId && LIVE.includes(profile.stripeStatus);

    let customer = profile.stripeCustomerId;
    if (kind === 'portal' || (kind === 'cuotas' && live)) {
      if (!customer) return json({ error: 'Aún no tienes pagos con tarjeta. Elige un plan para inscribirte.' }, 400);
      const portal = await stripe().billingPortal.sessions.create({ customer, return_url: `${origin}/aula` });
      return json({ url: portal.url });
    }

    if (!customer) {
      const c = await stripe().customers.create({ email: user.email, name: profile.displayName || undefined, metadata: { uid: user.uid } });
      customer = c.id;
      await ref.set({ stripeCustomerId: customer }, { merge: true });
    }
    const total = Number(profile.installments) || INSTALLMENTS;
    const common = {
      customer,
      client_reference_id: user.uid,
      locale: 'es',
      allow_promotion_codes: true,
      success_url: `${origin}/aula?pago=ok`,
      cancel_url: `${origin}/aula?pago=cancelado`,
    };

    if (kind === 'completo') {
      // Precio fijo de la formación completa, salvo que ya pague en cuotas o tenga cuotas a medida:
      // entonces paga al contado solo las cuotas que le faltan.
      const paid = live ? Number(profile.paidInstallments) || 0 : 0;
      const remaining = Math.max(1, total - paid);
      let line;
      if (!live && total === INSTALLMENTS) {
        line = { price: fullPriceId(), quantity: 1 };
      } else {
        const monthly = await stripe().prices.retrieve(priceId());
        line = {
          price_data: {
            currency: monthly.currency,
            unit_amount: monthly.unit_amount * remaining,
            product_data: { name: `Formación Casa Muladhara · ${remaining} cuota${remaining === 1 ? '' : 's'} al contado` },
          },
          quantity: 1,
        };
      }
      const session = await stripe().checkout.sessions.create({
        ...common,
        mode: 'payment',
        line_items: [line],
        metadata: { uid: user.uid, kind: 'completo', subscription: live ? profile.stripeSubscriptionId : '' },
      });
      return json({ url: session.url });
    }

    const session = await stripe().checkout.sessions.create({
      ...common,
      mode: 'subscription',
      line_items: [{ price: priceId(), quantity: 1 }],
      subscription_data: { metadata: { uid: user.uid, installments: String(total) } },
      metadata: { uid: user.uid, kind: 'cuotas' },
    });
    return json({ url: session.url });
  } catch (e) {
    console.error('billing', e);
    return json({ error: 'No se pudo abrir el pago. Inténtalo de nuevo en un momento.' }, 500);
  }
}
