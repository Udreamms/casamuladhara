// Administración de Casa Muladhara (corre en tu computador con la llave de servicio).
//
//   node scripts/admin.mjs make-admin  <correo>                 Da el rol de Maestra (ve el panel y modera)
//   node scripts/admin.mjs create-admin <correo> <contraseña>    Crea la cuenta de la Maestra (o le cambia la contraseña) y le da el rol
//   node scripts/admin.mjs remove-admin <correo>                 Le quita el rol de Maestra a esa cuenta
//   node scripts/admin.mjs enroll      <correo> [--levels 1,2] [--plan mensual|completo|none] [--pay none|ok|overdue]
//                                     (--levels son los niveles del programa desbloqueados; con --plan completo regalas la formación)
//   node scripts/admin.mjs grant       <correo> <niveles>           Niveles comprados aparte, p. ej. 3 o 1,2 (permanentes; 0 los quita)
//   node scripts/admin.mjs cuotas      <correo> <n>                 Cuántas cuotas paga esta alumna (por defecto 9)
//   node scripts/admin.mjs payment     <correo> <monto> "<detalle>"  [--failed]   Registra un pago en su historial
//   node scripts/admin.mjs notify      <correo> "<mensaje>"            Aviso en su campana de notificaciones
//   node scripts/admin.mjs answer      <correo> <preguntaId> "<respuesta>"   Responde una pregunta de clase
//   node scripts/admin.mjs list                                   Lista de alumnas
//   node scripts/admin.mjs sync-members                           Recalcula rol y nivel abierto de todas (una vez, al activar Stripe)
//   node scripts/admin.mjs welcome                                Publica el mensaje de bienvenida en # General
//
// Las alumnas NO pueden cambiar nivel, plan, pago ni rol: las reglas de Firestore lo impiden.
import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';
import { keyFile, DATABASE } from './_auth.mjs';
import { accessFor, cleanLevels, ownedOf, unlockedOf } from '../src/lib/server/access.js';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(readFileSync(keyFile, 'utf8'))) });
const db = getFirestore(admin.app(), DATABASE);
const [cmd, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i >= 0 ? rest[i + 1] : d; };
const pos = rest.filter((a, i) => !a.startsWith('--') && !rest[i - 1]?.startsWith('--'));
// Misma regla que el webhook de Stripe: rol en Firestore y nivel abierto (claim lvl) en el token
const applyAccess = async (uid) => {
  const ref = db.doc(`users/${uid}`);
  const p = (await ref.get()).data() || {};
  const { role, lvls, lvl, cls } = accessFor(p);
  if (p.role !== role) await ref.set({ role }, { merge: true });
  const u = await admin.auth().getUser(uid);
  await admin.auth().setCustomUserClaims(uid, { ...(u.customClaims || {}), lvl, lvls, cls, member: lvl > 0 });
  return lvls.length ? `abre el Nivel ${lvls.join(', ')}` : 'todo bloqueado';
};
const byEmail = async (email) => {
  const u = await admin.auth().getUserByEmail(email.trim().toLowerCase());
  return u;
};

switch (cmd) {
  case 'make-admin': {
    const u = await byEmail(pos[0]);
    await admin.auth().setCustomUserClaims(u.uid, { ...(u.customClaims || {}), admin: true });
    await db.doc(`users/${u.uid}`).set({ role: 'admin' }, { merge: true });
    console.log(`✔ ${u.email} ahora es Maestra. Debe cerrar sesión y volver a entrar.`);
    break;
  }
  case 'create-admin': {
    const email = (pos[0] || '').trim().toLowerCase();
    const password = pos[1];
    if (!email || !password || password.length < 6) throw new Error('Indica correo y contraseña (mínimo 6 caracteres)');
    let u = await admin.auth().getUserByEmail(email).catch(() => null);
    if (u) u = await admin.auth().updateUser(u.uid, { password, emailVerified: true });
    else u = await admin.auth().createUser({ email, password, emailVerified: true, displayName: 'Maestra Holística' });
    await admin.auth().setCustomUserClaims(u.uid, { ...(u.customClaims || {}), admin: true });
    await db.doc(`users/${u.uid}`).set({ email, role: 'admin' }, { merge: true });
    console.log(`✔ ${email} es la Maestra y ya puede entrar con esa contraseña.`);
    break;
  }
  case 'remove-admin': {
    const u = await byEmail(pos[0]);
    const { admin: _drop, ...claims } = u.customClaims || {};
    await admin.auth().setCustomUserClaims(u.uid, claims);
    await db.doc(`users/${u.uid}`).set({ role: 'student_free' }, { merge: true });
    console.log(`✔ ${u.email} ya no es Maestra ·`, await applyAccess(u.uid));
    break;
  }
  case 'enroll': {
    const u = await byEmail(pos[0]);
    const data = {};
    if (flag('levels')) data.unlockedLevels = cleanLevels(flag('levels').split(',')) || [];
    if (flag('plan')) data.plan = flag('plan');
    if (flag('pay')) data.paymentStatus = flag('pay');
    if (!Object.keys(data).length) throw new Error('Indica --levels, --plan o --pay');
    await db.doc(`users/${u.uid}`).set(data, { merge: true });
    console.log(`✔ ${u.email}:`, data, '·', await applyAccess(u.uid));
    break;
  }
  case 'grant': {
    const u = await byEmail(pos[0]);
    const levels = cleanLevels(String(pos[1] ?? '').split(','));
    if (!pos[1] || !levels) throw new Error('Indica los niveles: 3, 1,2 o 0 para quitarlos');
    await db.doc(`users/${u.uid}`).set({ ownedLevels: levels }, { merge: true });
    console.log(`✔ ${u.email}: niveles comprados ${levels.join(', ') || 'ninguno'} ·`, await applyAccess(u.uid));
    break;
  }
  case 'cuotas': {
    const u = await byEmail(pos[0]);
    const n = Math.round(Number(pos[1]));
    if (!(n >= 1 && n <= 24)) throw new Error('Indica cuántas cuotas: 1 a 24');
    await db.doc(`users/${u.uid}`).set({ installments: n }, { merge: true });
    console.log(`✔ ${u.email}: paga ${n} cuota(s) de 55 USD (o ${n * 55} USD al contado)`);
    break;
  }
  case 'payment': {
    const u = await byEmail(pos[0]);
    await db.collection(`users/${u.uid}/payments`).add({
      amount: Number(pos[1]), concept: pos[2] || 'Pago', status: rest.includes('--failed') ? 'failed' : 'paid',
      paidAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp(),
    });
    console.log(`✔ pago registrado para ${u.email}`);
    break;
  }
  case 'notify': {
    const u = await byEmail(pos[0]);
    await db.collection(`users/${u.uid}/notifications`).add({ text: pos[1], read: false, createdAt: FieldValue.serverTimestamp() });
    console.log(`✔ aviso enviado a ${u.email}`);
    break;
  }
  case 'answer': {
    const u = await byEmail(pos[0]);
    await db.doc(`users/${u.uid}/questions/${pos[1]}`).update({ reply: pos[2], answered: true, repliedAt: FieldValue.serverTimestamp() });
    console.log('✔ respuesta guardada');
    break;
  }
  case 'list': {
    const s = await db.collection('users').get();
    s.forEach((d) => { const x = d.data(); console.log(`${x.email}\t${x.role}\tabiertos ${accessFor(x).lvls.join(',') || '-'}\tcomprados ${ownedOf(x).join(',') || '-'}\tdesbloqueados ${unlockedOf(x).join(',')}${x.blocked ? '\tBLOQUEADA' : ''}\tplan ${x.plan}\tpago ${x.paymentStatus}\tcuotas ${x.paidInstallments || 0}/${x.installments || 9}`); });
    console.log(`${s.size} cuenta(s)`);
    break;
  }
  case 'sync-members': {
    const s = await db.collection('users').get();
    for (const d of s.docs) {
      const u = await admin.auth().getUser(d.id).catch(() => null);
      if (u) console.log(`✔ ${u.email}: ${await applyAccess(d.id)}`);
    }
    break;
  }
  case 'welcome': {
    await db.collection('posts').add({
      ch: 'general', text: 'Bienvenidas al aula virtual de Casa Muladhara. Este es un espacio para compartir prácticas, dudas y avances con cariño y respeto. Lo que se comparte aquí, se queda aquí.',
      authorUid: 'maestra', authorName: 'Maestra Holística', isTeacher: true, likeCount: 0, createdAt: FieldValue.serverTimestamp(),
    });
    console.log('✔ mensaje de bienvenida publicado');
    break;
  }
  default:
    console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 19).join('\n'));
}
process.exit(0);
