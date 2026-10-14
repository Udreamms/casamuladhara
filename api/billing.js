// POST /api/billing  (Authorization: Bearer <token de Firebase>)
// Sin suscripción: crea un Stripe Checkout de 55 USD/mes. Con suscripción: abre el portal de Stripe
// (cambiar tarjeta, pagar una cuota pendiente o cancelar). Devuelve { url }.
import { appUrl, auth, db, json, priceId, stripe } from './_lib/server.js';

const LIVE = ['active', 'trialing', 'past_due', 'unpaid'];

export async function POST(request) {
  const header = request.headers.get('authorization') || '';
  let user;
  try {
    user = await auth().verifyIdToken(header.replace(/^Bearer\s+/i, ''));
  } catch {
    return json({ error: 'Tu sesión expiró. Vuelve a iniciar sesión.' }, 401);
  }

  try {
    const ref = db().doc(`users/${user.uid}`);
    const profile = (await ref.get()).data() || {};
    if (profile.plan === 'completo') return json({ error: 'Tu formación ya está pagada.' }, 400);
    const origin = appUrl(request);

    if (profile.stripeCustomerId && profile.stripeSubscriptionId && LIVE.includes(profile.stripeStatus)) {
      const portal = await stripe().billingPortal.sessions.create({
        customer: profile.stripeCustomerId,
        return_url: `${origin}/aula.html`,
      });
      return json({ url: portal.url });
    }

    let customer = profile.stripeCustomerId;
    if (!customer) {
      const c = await stripe().customers.create({
        email: user.email,
        name: profile.displayName || undefined,
        metadata: { uid: user.uid },
      });
      customer = c.id;
      await ref.set({ stripeCustomerId: customer }, { merge: true });
    }

    const session = await stripe().checkout.sessions.create({
      mode: 'subscription',
      customer,
      client_reference_id: user.uid,
      line_items: [{ price: priceId(), quantity: 1 }],
      subscription_data: { metadata: { uid: user.uid } },
      metadata: { uid: user.uid },
      allow_promotion_codes: true,
      locale: 'es',
      success_url: `${origin}/aula.html?pago=ok`,
      cancel_url: `${origin}/aula.html?pago=cancelado`,
    });
    return json({ url: session.url });
  } catch (e) {
    console.error('billing', e);
    return json({ error: 'No se pudo abrir el pago. Inténtalo de nuevo en un momento.' }, 500);
  }
}
