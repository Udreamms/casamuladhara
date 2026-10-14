// POST /api/stripe-webhook  (lo llama Stripe; se valida la firma con STRIPE_WEBHOOK_SECRET)
// Mantiene al día la cuenta de cada alumna según su suscripción:
//   activa             -> rol 'student_subscribed', plan 'mensual', pago 'ok', claim member=true (abre las clases)
//   pago atrasado      -> rol 'student_free', pago 'overdue', member=false (acceso pausado, conserva su avance)
//   cancelada/expirada -> rol 'student_free', plan 'none', pago 'none', member=false
// Además registra cada factura en users/{uid}/payments.
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { auth, db, json, stripe, webhookSecret } from './_lib/server.js';

const ACTIVE = ['active', 'trialing'];
const OVERDUE = ['past_due', 'unpaid'];

async function uidFor(customerId, hint) {
  if (hint) return hint;
  const q = await db().collection('users').where('stripeCustomerId', '==', customerId).limit(1).get();
  if (!q.empty) return q.docs[0].id;
  const c = await stripe().customers.retrieve(customerId);
  return c.deleted ? null : c.metadata?.uid || null;
}

async function setMember(uid, member) {
  const u = await auth().getUser(uid);
  const claims = u.customClaims || {};
  if ((claims.member === true) !== member) await auth().setCustomUserClaims(uid, { ...claims, member });
}

async function syncSubscription(subscriptionId, hint) {
  // Siempre se lee el estado actual desde Stripe: los eventos pueden llegar desordenados
  const sub = await stripe().subscriptions.retrieve(subscriptionId);
  const customer = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const uid = await uidFor(customer, hint || sub.metadata?.uid);
  if (!uid) return console.warn('Suscripción sin alumna asociada', sub.id);

  const ref = db().doc(`users/${uid}`);
  const profile = (await ref.get()).data() || {};
  const active = ACTIVE.includes(sub.status);
  const overdue = OVERDUE.includes(sub.status);
  // Una suscripción vieja no pisa a otra vigente
  if (profile.stripeSubscriptionId && profile.stripeSubscriptionId !== sub.id
      && [...ACTIVE, ...OVERDUE].includes(profile.stripeStatus) && !active && !overdue) return;

  const end = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end;
  const full = profile.plan === 'completo';
  const member = full || active;
  await ref.set({
    // la Maestra conserva su rol; las alumnas pasan a 'con suscripción' o vuelven a 'gratis'
    ...(profile.role === 'admin' ? {} : { role: member ? 'student_subscribed' : 'student_free' }),
    stripeCustomerId: customer,
    stripeSubscriptionId: sub.id,
    stripeStatus: sub.status,
    cancelAtPeriodEnd: !!sub.cancel_at_period_end,
    currentPeriodEnd: end ? Timestamp.fromMillis(end * 1000) : null,
    // quien pagó la formación completa no cambia de plan por la suscripción
    ...(full ? {} : {
      plan: active || overdue ? 'mensual' : 'none',
      paymentStatus: active ? 'ok' : overdue ? 'overdue' : 'none',
    }),
  }, { merge: true });
  await setMember(uid, member);
}

async function recordInvoice(inv, paid) {
  const customer = typeof inv.customer === 'string' ? inv.customer : inv.customer?.id;
  if (!customer) return;
  const meta = inv.parent?.subscription_details?.metadata || inv.subscription_details?.metadata || {};
  const uid = await uidFor(customer, meta.uid);
  if (!uid) return;
  const user = db().doc(`users/${uid}`);
  await user.collection('payments').doc(inv.id).set({
    amount: (paid ? inv.amount_paid : inv.amount_due) / 100,
    currency: inv.currency,
    concept: 'Suscripción mensual del aula',
    kind: 'subscription',
    status: paid ? 'paid' : 'failed',
    invoiceUrl: inv.hosted_invoice_url || '',
    paidAt: paid ? Timestamp.fromMillis((inv.status_transitions?.paid_at || inv.created) * 1000) : null,
    createdAt: Timestamp.fromMillis(inv.created * 1000),
  }, { merge: true });
  if (!paid) {
    await user.collection('notifications').doc(`pago-${inv.id}`).set({
      text: 'No pudimos cobrar tu suscripción. Actualiza tu tarjeta en Mis pagos para mantener tu acceso a las clases.',
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });
  }
}

const subscriptionOf = (inv) => {
  const s = inv.parent?.subscription_details?.subscription ?? inv.subscription;
  return typeof s === 'string' ? s : s?.id;
};

export async function POST(request) {
  let event;
  try {
    event = stripe().webhooks.constructEvent(await request.text(), request.headers.get('stripe-signature'), webhookSecret());
  } catch (e) {
    return json({ error: `Firma inválida: ${e.message}` }, 400);
  }

  try {
    const o = event.data.object;
    switch (event.type) {
      case 'checkout.session.completed':
        if (o.mode === 'subscription' && o.subscription) await syncSubscription(o.subscription, o.client_reference_id);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed':
        await syncSubscription(o.id);
        break;
      case 'invoice.paid':
      case 'invoice.payment_failed': {
        await recordInvoice(o, event.type === 'invoice.paid');
        const sub = subscriptionOf(o);
        if (sub) await syncSubscription(sub);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    // 500 hace que Stripe reintente el evento más tarde
    console.error('stripe-webhook', event.type, e);
    return json({ error: 'No se pudo procesar el evento' }, 500);
  }
  return json({ received: true });
}
