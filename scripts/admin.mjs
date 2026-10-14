// Administración de Casa Muladhara (corre en tu computador con la llave de servicio).
//
//   node scripts/admin.mjs make-admin  <correo>                 Da el rol de Maestra (ve el panel y modera)
//   node scripts/admin.mjs enroll      <correo> [--level 1-5] [--plan mensual|completo|none] [--pay none|ok|overdue]
//                                     (--level es el nivel abierto mientras paga; con --plan completo regalas la formación)
//   node scripts/admin.mjs grant       <correo> <nivel>             Acceso permanente hasta ese nivel (ya pagado; 0 lo quita)
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
import { accessFor } from '../api/_lib/access.js';
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
  const { role, lvl } = accessFor(p);
  if (p.role !== role) await ref.set({ role }, { merge: true });
  const u = await admin.auth().getUser(uid);
  await admin.auth().setCustomUserClaims(uid, { ...(u.customClaims || {}), lvl, member: lvl > 0 });
  return lvl ? `abre hasta el Nivel ${lvl}` : 'todo bloqueado';
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
  case 'enroll': {
    const u = await byEmail(pos[0]);
    const data = {};
    if (flag('level')) data.accessLevel = Math.min(5, Math.max(1, Number(flag('level'))));
    if (flag('plan')) data.plan = flag('plan');
    if (flag('pay')) data.paymentStatus = flag('pay');
    if (!Object.keys(data).length) throw new Error('Indica --level, --plan o --pay');
    await db.doc(`users/${u.uid}`).set(data, { merge: true });
    console.log(`✔ ${u.email}:`, data, '·', await applyAccess(u.uid));
    break;
  }
  case 'grant': {
    const u = await byEmail(pos[0]);
    const level = Math.min(5, Math.max(0, Number(pos[1])));
    if (Number.isNaN(level)) throw new Error('Indica el nivel: 0 a 5');
    await db.doc(`users/${u.uid}`).set({ grantLevel: level }, { merge: true });
    console.log(`✔ ${u.email}: acceso permanente hasta el Nivel ${level} ·`, await applyAccess(u.uid));
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
    s.forEach((d) => { const x = d.data(); console.log(`${x.email}\t${x.role}\tnivel ${x.accessLevel}\tpermanente ${x.grantLevel || 0}\tplan ${x.plan}\tpago ${x.paymentStatus}\tcuotas ${x.paidInstallments || 0}/${x.installments || 9}`); });
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
    console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 17).join('\n'));
}
process.exit(0);
