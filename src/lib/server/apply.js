// Aplica la regla de acceso a una cuenta: guarda el rol en Firestore y los niveles en el token (claims).
//   lvls: niveles abiertos (p. ej. [3]); lvl: el más alto; cls: clases abiertas del Nivel 4 (p. ej. [411, 412]). src/proxy.js y firebase/firestore.rules los leen.
import { accessFor } from './access.js';
import { auth, db } from './services.js';

export async function applyAccess(uid) {
  const ref = db().doc(`users/${uid}`);
  const profile = (await ref.get()).data() || {};
  const { role, lvls, lvl, cls } = accessFor(profile);
  if (profile.role !== role) await ref.set({ role }, { merge: true });
  const u = await auth().getUser(uid);
  const claims = u.customClaims || {};
  if (claims.lvl !== lvl || claims.member !== lvl > 0 || String(claims.lvls) !== String(lvls) || String(claims.cls) !== String(cls)) {
    await auth().setCustomUserClaims(uid, { ...claims, lvl, lvls, cls, member: lvl > 0 });
  }
  return { role, lvls, lvl };
}
