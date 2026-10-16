// Aplica la regla de acceso a una cuenta: guarda el rol en Firestore y el nivel en el token (claims).
// middleware.js lee el claim lvl para decidir qué niveles se pueden descargar.
import { accessFor } from './access.js';
import { auth, db } from './server.js';

export async function applyAccess(uid) {
  const ref = db().doc(`users/${uid}`);
  const profile = (await ref.get()).data() || {};
  const { role, lvl } = accessFor(profile);
  if (profile.role !== role) await ref.set({ role }, { merge: true });
  const u = await auth().getUser(uid);
  const claims = u.customClaims || {};
  if (claims.lvl !== lvl || claims.member !== lvl > 0) {
    await auth().setCustomUserClaims(uid, { ...claims, lvl, member: lvl > 0 });
  }
  return { role, lvl };
}
