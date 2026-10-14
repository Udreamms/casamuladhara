// Utilidades compartidas por las funciones de Vercel (api/*). Las llaves viven solo en variables de entorno.
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import Stripe from 'stripe';

const need = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Falta la variable de entorno ${name}`);
  return v;
};

// FIREBASE_SERVICE_ACCOUNT: el JSON completo de la llave de servicio (tal cual, o en base64)
const firebase = () => {
  if (getApps().length) return getApps()[0];
  const raw = need('FIREBASE_SERVICE_ACCOUNT').trim();
  const json = JSON.parse(raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8'));
  return initializeApp({ credential: cert(json) });
};
export const auth = () => getAuth(firebase());
// La base de datos del proyecto se llama "casamuladhara" (no "(default)")
export const db = () => getFirestore(firebase(), 'casamuladhara');

let client;
export const stripe = () => (client ||= new Stripe(need('STRIPE_SECRET_KEY')));
export const priceId = () => need('STRIPE_PRICE_ID');
export const webhookSecret = () => need('STRIPE_WEBHOOK_SECRET');

// Dirección pública del sitio para volver desde Stripe (APP_URL, o la del propio pedido)
export const appUrl = (request) => (process.env.APP_URL || new URL(request.url).origin).replace(/\/$/, '');

export const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
