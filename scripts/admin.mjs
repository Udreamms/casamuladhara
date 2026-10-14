// Administración de Casa Muladhara (corre en tu computador con la llave de servicio).
//
//   node scripts/admin.mjs make-admin  <correo>                 Da el rol de Maestra (ve el panel y modera)
//   node scripts/admin.mjs enroll      <correo> [--level 1-5] [--plan mensual|completo|none] [--pay none|ok|overdue]
//                                     (con plan y pago al día abre las clases; sirve para regalar acceso)
//   node scripts/admin.mjs payment     <correo> <monto> "<detalle>"  [--failed]   Registra un pago en su historial
//   node scripts/admin.mjs notify      <correo> "<mensaje>"            Aviso en su campana de notificaciones
//   node scripts/admin.mjs answer      <correo> <preguntaId> "<respuesta>"   Responde una pregunta de clase
//   node scripts/admin.mjs list                                   Lista de alumnas
//   node scripts/admin.mjs sync-members                           Pone rol y acceso a todas según su plan (una vez, al activar Stripe)
//   node scripts/admin.mjs welcome                                Publica el mensaje de bienvenida en # General
//
// Las alumnas NO pueden cambiar nivel, plan, pago ni rol: las reglas de Firestore lo impiden.
import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';
import { keyFile, DATABASE } from './_auth.mjs';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(readFileSync(keyFile, 'utf8'))) });
const db = getFirestore(admin.app(), DATABASE);
const [cmd, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i >= 0 ? rest[i + 1] : d; };
const pos = rest.filter((a, i) => !a.startsWith('--') && !rest[i - 1]?.startsWith('--'));
const isMember = (p) => p.plan === 'completo' || (p.plan === 'mensual' && p.paymentStatus === 'ok');
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
    const ref = db.doc(`users/${u.uid}`);
    await ref.set(data, { merge: true });
    // El acceso a las clases lo da el claim member (lo mismo que hace el webhook de Stripe al pagar)
    const p = (await ref.get()).data();
    const member = isMember(p);
    await admin.auth().setCustomUserClaims(u.uid, { ...(u.customClaims || {}), member });
    if (p.role !== 'admin') await ref.set({ role: member ? 'student_subscribed' : 'student_free' }, { merge: true });
    console.log(`✔ ${u.email}:`, data, member ? '· clases abiertas' : '· clases bloqueadas');
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
    s.forEach((d) => { const x = d.data(); console.log(`${x.email}\t${x.role}\tnivel ${x.accessLevel}\tplan ${x.plan}\tpago ${x.paymentStatus}`); });
    console.log(`${s.size} cuenta(s)`);
    break;
  }
  case 'sync-members': {
    const s = await db.collection('users').get();
    for (const d of s.docs) {
      const member = isMember(d.data());
      const role = d.data().role === 'admin' ? 'admin' : member ? 'student_subscribed' : 'student_free';
      const u = await admin.auth().getUser(d.id).catch(() => null);
      if (!u || ((u.customClaims?.member === true) === member && d.data().role === role)) continue;
      await admin.auth().setCustomUserClaims(u.uid, { ...(u.customClaims || {}), member });
      await d.ref.set({ role }, { merge: true });
      console.log(`✔ ${u.email}: ${member ? 'clases abiertas' : 'clases bloqueadas'}`);
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
    console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 14).join('\n'));
}
process.exit(0);
