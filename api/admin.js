// POST /api/admin  (Authorization: Bearer <token de Firebase>, cuerpo { action, ... })
// Lo usa el portal de la Maestra (admin.html).
//   action 'me'     -> activa la cuenta de la Maestra la primera vez (correo en ADMIN_EMAILS y ya verificado)
//                      y devuelve { admin, verified }.
//   action 'access' -> { uid, ownedLevels?: [..], unlockedLevels?: [..], blocked?: bool } cambia los niveles
//                      de una alumna (ver api/_lib/access.js) y los aplica al instante (rol en Firestore y claims).
import { FieldValue } from 'firebase-admin/firestore';
import { cleanLevels } from './_lib/access.js';
import { applyAccess } from './_lib/apply.js';
import { auth, db, json } from './_lib/server.js';

// Correo de la Maestra (se puede cambiar con la variable de entorno ADMIN_EMAILS, separados por coma)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'holamaestrakaren@gmail.com')
  .split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);

export async function POST(request) {
  let admin;
  try {
    admin = auth();
  } catch (e) {
    // Falta o está mal la llave de servicio en Vercel (FIREBASE_SERVICE_ACCOUNT): no es culpa de la sesión
    console.error('admin config', e);
    return json({ error: 'El servidor no tiene configurada la llave de Firebase (FIREBASE_SERVICE_ACCOUNT en Vercel).' }, 500);
  }
  let user;
  try {
    user = await admin.verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  } catch (e) {
    console.error('admin token', e.code || e.message);
    if (/project|aud|credential/i.test(`${e.code} ${e.message}`)) {
      return json({ error: 'La llave de Firebase en Vercel no es del proyecto casamuladhara. Revisa FIREBASE_SERVICE_ACCOUNT.' }, 500);
    }
    return json({ error: 'Tu sesión expiró. Vuelve a iniciar sesión.' }, 401);
  }
  const body = await request.json().catch(() => ({}));
  const email = (user.email || '').toLowerCase();

  try {
    if (body.action === 'me') {
      if (user.admin === true) return json({ admin: true, verified: true });
      if (!ADMIN_EMAILS.includes(email)) return json({ admin: false, verified: !!user.email_verified });
      // Solo quien tiene acceso a la bandeja de ese Gmail puede verificarlo: recién entonces es Maestra
      if (!user.email_verified) return json({ admin: false, verified: false });
      const u = await auth().getUser(user.uid);
      await auth().setCustomUserClaims(user.uid, { ...(u.customClaims || {}), admin: true });
      await db().doc(`users/${user.uid}`).set({
        uid: user.uid, email, displayName: u.displayName || 'Maestra Holística', role: 'admin',
        createdAt: FieldValue.serverTimestamp(), lastLogin: FieldValue.serverTimestamp(),
      }, { merge: true });
      return json({ admin: true, verified: true, fresh: true });
    }

    if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);

    if (body.action === 'access') {
      const { uid } = body;
      if (typeof uid !== 'string' || !/^[A-Za-z0-9]{10,128}$/.test(uid)) return json({ error: 'Alumna no válida.' }, 400);
      const ref = db().doc(`users/${uid}`);
      const profile = (await ref.get()).data();
      if (!profile) return json({ error: 'No encontramos a esa alumna.' }, 404);
      if (profile.role === 'admin') return json({ error: 'No se puede cambiar el acceso de la Maestra.' }, 400);
      const data = {};
      for (const k of ['ownedLevels', 'unlockedLevels']) {
        if (!(k in body)) continue;
        const v = cleanLevels(body[k]);
        if (!v) return json({ error: 'Niveles no válidos.' }, 400);
        data[k] = v;
      }
      if ('blocked' in body) {
        if (typeof body.blocked !== 'boolean') return json({ error: 'Valor no válido.' }, 400);
        data.blocked = body.blocked;
      }
      if (!Object.keys(data).length) return json({ error: 'No hay cambios.' }, 400);
      await ref.set({ ...data, accessUpdatedAt: FieldValue.serverTimestamp() }, { merge: true });
      return json(await applyAccess(uid));
    }

    return json({ error: 'Acción desconocida.' }, 400);
  } catch (e) {
    console.error('admin', e);
    return json({ error: 'No se pudo completar la acción. Inténtalo de nuevo.' }, 500);
  }
}
