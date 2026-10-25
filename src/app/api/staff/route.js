// POST /api/staff  (cuerpo { usuario, clave }) -> { token }
// Entrada del Staff al portal de la Maestra con usuario y contraseña, sin correo.
// El usuario y la contraseña viven solo en las variables de entorno STAFF_USER y STAFF_PASSWORD (Vercel y .env.local).
// Si coinciden, devuelve un token de Firebase para la cuenta fija del Staff, que tiene el claim admin.
import { createHash, timingSafeEqual } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { auth, db, json } from '@/lib/server/services.js';

const STAFF_UID = 'staff-casamuladhara';
// Compara sin filtrar por tiempo cuántos caracteres coinciden
const same = (a, b) => timingSafeEqual(createHash('sha256').update(String(a)).digest(), createHash('sha256').update(String(b)).digest());
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  const user = process.env.STAFF_USER, pass = process.env.STAFF_PASSWORD;
  if (!user || !pass) return json({ error: 'Falta configurar STAFF_USER y STAFF_PASSWORD en Vercel.' }, 500);
  const body = await request.json().catch(() => ({}));
  const okUser = same(String(body.usuario || '').trim().toLowerCase(), user.trim().toLowerCase());
  const okPass = same(String(body.clave || ''), pass);
  if (!okUser || !okPass) {
    await wait(1500); // frena los intentos repetidos
    return json({ error: 'Usuario o contraseña incorrectos.' }, 401);
  }
  try {
    // La cuenta del Staff existe una sola vez en Firebase Auth, sin correo, y siempre con el claim admin
    await auth().getUser(STAFF_UID).catch((e) => {
      if (e.code === 'auth/user-not-found') return auth().createUser({ uid: STAFF_UID, displayName: 'Maestra Holística' });
      throw e;
    });
    await auth().setCustomUserClaims(STAFF_UID, { admin: true });
    await db().doc(`users/${STAFF_UID}`).set({
      uid: STAFF_UID, displayName: 'Maestra Holística', role: 'admin', lastLogin: FieldValue.serverTimestamp(),
    }, { merge: true });
    return json({ token: await auth().createCustomToken(STAFF_UID, { admin: true }) });
  } catch (e) {
    console.error('staff', e);
    return json({ error: 'El servidor no tiene configurada la llave de Firebase (FIREBASE_SERVICE_ACCOUNT en Vercel).' }, 500);
  }
}
