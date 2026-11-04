// POST /api/stripe-webhook  (lo llama Stripe; se valida la firma con STRIPE_WEBHOOK_SECRET)
// Mantiene al día la cuenta de cada alumna según sus pagos:
//   cuotas al día      -> plan 'mensual', pago 'ok'
//   cuota atrasada     -> pago 'overdue' (se pausa lo que no tenía; conserva su acceso permanente y su avance)
//   cancelada          -> plan 'none'
//   última cuota pagada o pago al contado -> plan 'completo' y la suscripción se detiene sola
// Después aplica la regla de acceso (src/lib/server/access.js): rol en Firestore y nivel en el token.
// Cada pago queda en users/{uid}/payments.
// Al empezar a pagar (primera cuota o pago al contado), sus registros en Interesadas (mismo correo) pasan a la etapa Inscrita.
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { INSTALLMENTS } from '@/lib/server/access.js';
import { applyAccess } from '@/lib/server/apply.js';
import { db, json, stripe, webhookSecret } from '@/lib/server/services.js';
import { enviarDespues, usuario } from '@/lib/server/meta.js';

const ACTIVE = ['active', 'trialing'];
const OVERDUE = ['past_due', 'unpaid'];
const idOf = (x) => (typeof x === 'string' ? x : x?.id);

async function uidFor(customerId, hint) {
  if (hint) return hint;
  if (!customerId) return null;
  const q = await db().collection('users').where('stripeCustomerId', '==', customerId).limit(1).get();
  if (!q.empty) return q.docs[0].id;
  const c = await stripe().customers.retrieve(customerId);
  return c.deleted ? null : c.metadata?.uid || null;
}

async function cancelQuietly(subscriptionId) {
  try {
    await stripe().subscriptions.cancel(subscriptionId);
  } catch (e) {
    if (e?.code !== 'resource_missing') throw e;
  }
}

// CRM: quien paga deja de ser "interesada". Nunca debe romper el webhook, por eso se atrapa cualquier error.
async function marcarInscrita(uid) {
  try {
    const email = String((await db().doc(`users/${uid}`).get()).data()?.email || '').trim().toLowerCase();
    if (!email) return;
    const s = await db().collection('leads').where('email', '==', email).get();
    const lote = db().batch();
    let n = 0;
    s.docs.forEach((d) => { if (!['inscrita', 'descartado'].includes(d.data().status)) { lote.update(d.ref, { status: 'inscrita', updatedAt: FieldValue.serverTimestamp() }); n++; } });
    if (n) await lote.commit();
  } catch (e) { console.error('leads inscrita', e); }
}

async function syncSubscription(subscriptionId, hint) {
  // Siempre se lee el estado actual desde Stripe: los eventos pueden llegar desordenados
  const sub = await stripe().subscriptions.retrieve(subscriptionId);
  const customer = idOf(sub.customer);
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
  await ref.set({
    stripeCustomerId: customer,
    stripeSubscriptionId: sub.id,
    stripeStatus: sub.status,
    cancelAtPeriodEnd: !!sub.cancel_at_period_end,
    currentPeriodEnd: end && (active || overdue) ? Timestamp.fromMillis(end * 1000) : null,
    // quien terminó de pagar la formación no cambia de plan por la suscripción
    ...(profile.plan === 'completo' ? {} : {
      plan: active || overdue ? 'mensual' : 'none',
      paymentStatus: active ? 'ok' : overdue ? 'overdue' : 'none',
    }),
  }, { merge: true });
  await applyAccess(uid);
  if (active) await marcarInscrita(uid);
}

async function recordInvoice(inv, paid) {
  const meta = inv.parent?.subscription_details?.metadata || inv.subscription_details?.metadata || {};
  const uid = await uidFor(idOf(inv.customer), meta.uid);
  if (!uid) return null;
  const user = db().doc(`users/${uid}`);
  await user.collection('payments').doc(inv.id).set({
    amount: (paid ? inv.amount_paid : inv.amount_due) / 100,
    currency: inv.currency,
    concept: 'Cuota mensual de la formación',
    kind: 'installment',
    status: paid ? 'paid' : 'failed',
    invoiceUrl: inv.hosted_invoice_url || '',
    paidAt: paid ? Timestamp.fromMillis((inv.status_transitions?.paid_at || inv.created) * 1000) : null,
    createdAt: Timestamp.fromMillis(inv.created * 1000),
  }, { merge: true });
  if (!paid) {
    await user.collection('notifications').doc(`pago-${inv.id}`).set({
      text: 'No pudimos cobrar tu cuota. Actualiza tu tarjeta en Mis pagos para seguir avanzando en la formación.',
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });
  }
  return uid;
}

// Cuenta las cuotas pagadas; al completar todas, la formación queda pagada y se detiene el cobro
async function countInstallments(uid, subscriptionId) {
  const ref = db().doc(`users/${uid}`);
  const profile = (await ref.get()).data() || {};
  const sub = await stripe().subscriptions.retrieve(subscriptionId);
  const total = Number(profile.installments) || Number(sub.metadata?.installments) || INSTALLMENTS;
  const list = await stripe().invoices.list({ subscription: subscriptionId, status: 'paid', limit: 100 });
  const paid = list.data.filter((i) => i.amount_paid > 0).length;
  await ref.set({ paidInstallments: paid, installments: total }, { merge: true });
  if (paid >= total) {
    await ref.set({ plan: 'completo', paymentStatus: 'ok', currentPeriodEnd: null }, { merge: true });
    await cancelQuietly(subscriptionId);
  }
}

async function paidInFull(session) {
  const uid = await uidFor(idOf(session.customer), session.metadata?.uid || session.client_reference_id);
  if (!uid) return;
  const ref = db().doc(`users/${uid}`);
  await ref.collection('payments').doc(session.id).set({
    amount: session.amount_total / 100,
    currency: session.currency,
    concept: 'Pago al contado de la formación',
    kind: 'full',
    status: 'paid',
    paidAt: Timestamp.fromMillis(session.created * 1000),
    createdAt: Timestamp.fromMillis(session.created * 1000),
  }, { merge: true });
  await ref.set({ plan: 'completo', paymentStatus: 'ok', currentPeriodEnd: null, stripeCustomerId: idOf(session.customer) }, { merge: true });
  if (session.metadata?.subscription) await cancelQuietly(session.metadata.subscription);
  await applyAccess(uid);
  await marcarInscrita(uid);
}

// API de conversiones de Meta: compra de la formación (pago al contado, o primera cuota). Un fallo aquí no afecta al pago.
const compraMeta = ({ id, email, valor, moneda, creado, uid }) => enviarDespues({
  nombre: 'Purchase', id: `compra-${id}`, tiempo: creado * 1000,
  user: usuario({ email, uid }), custom: { value: valor, currency: String(moneda || 'usd').toUpperCase() },
});

const subscriptionOf = (inv) => idOf(inv.parent?.subscription_details?.subscription ?? inv.subscription);

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
        if (o.mode === 'subscription' && o.subscription) await syncSubscription(idOf(o.subscription), o.client_reference_id);
        else if (o.mode === 'payment' && o.payment_status === 'paid' && o.metadata?.kind === 'completo') {
          await paidInFull(o);
          compraMeta({ id: o.id, email: o.customer_details?.email || o.customer_email, valor: o.amount_total / 100, moneda: o.currency, creado: o.created, uid: o.metadata?.uid || o.client_reference_id });
        }
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
        const paid = event.type === 'invoice.paid';
        const uid = await recordInvoice(o, paid);
        // Meta: solo la primera cuota cuenta como compra; las siguientes son la misma venta
        if (paid && o.billing_reason === 'subscription_create') compraMeta({ id: o.id, email: o.customer_email, valor: o.amount_paid / 100, moneda: o.currency, creado: o.created, uid });
        const sub = subscriptionOf(o);
        if (sub && uid && paid) await countInstallments(uid, sub);
        if (sub) await syncSubscription(sub, uid);
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
