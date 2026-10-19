// Prueba de aislamiento contra el proyecto real: crea usuarios temporales, intenta cruzar datos y limpia.
//   node scripts/test-rules.mjs
import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';
import { keyFile, DATABASE } from './_auth.mjs';
import { getFirestore as adminDb } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';
import { setLogLevel } from 'firebase/firestore';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, collectionGroup, getDocs, query,
  orderBy, limit, serverTimestamp, writeBatch, increment, where } from 'firebase/firestore';

setLogLevel('silent');
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(readFileSync(keyFile, 'utf8'))) });
const adb = adminDb(admin.app(), DATABASE);
const cfg = { apiKey: 'AIzaSyDG8ariC_HJCIXUamYcXuLsKvZnlmGxl3A', authDomain: 'casamuladhara.firebaseapp.com', projectId: 'casamuladhara' };

const tag = Date.now().toString(36);
const mk = async (name, claims) => {
  const email = `${name}-${tag}@test.casamuladhara.invalid`;
  const u = await admin.auth().createUser({ email, emailVerified: true, displayName: name });
  if (claims) await admin.auth().setCustomUserClaims(u.uid, claims);
  return { uid: u.uid, email, name, claims };
};
const login = async (u) => {
  const app = initializeApp(cfg, u.uid);
  const auth = getAuth(app);
  const cred = await signInWithCustomToken(auth, await admin.auth().createCustomToken(u.uid, u.claims || {}, ));
  await cred.user.getIdToken(true);
  return { db: getFirestore(app, DATABASE), auth };
};

let pass = 0, fail = 0;
const ok = (name, cond) => { cond ? pass++ : fail++; console.log(`${cond ? '  ✔' : '  ✘ FALLA'} ${name}`); };
const allowed = async (name, fn) => { try { await fn(); ok(name, true); } catch (e) { ok(`${name}  → ${e.code}`, false); } };
const denied = async (name, fn) => { try { await fn(); ok(`${name} (debía negarse)`, false); } catch (e) { ok(name, e.code === 'permission-denied'); if (e.code !== 'permission-denied') console.log('     ', e.code, e.message); } };
const profile = (u, extra = {}) => ({ uid: u.uid, email: u.email, displayName: u.name, photoURL: '', role: 'student_free', accessLevel: 1, plan: 'none', paymentStatus: 'none', createdAt: serverTimestamp(), lastLogin: serverTimestamp(), ...extra });

// A y B tienen el Nivel 1 abierto; F es una cuenta gratis (sin niveles)
const A = await mk('ana', { lvl: 1 }), B = await mk('bea', { lvl: 1 }), F = await mk('fran'), M = await mk('maestra', { admin: true });
// J es una alumna antigua que compró solo el Nivel 3
const J = await mk('juana', { lvl: 3, lvls: [3] });
const created = [];
try {
  const a = await login(A), b = await login(B), f = await login(F), m = await login(M), j = await login(J);
  await adb.doc(`users/${F.uid}`).set({ uid: F.uid, email: F.email, displayName: F.name, role: 'student_free' });

  console.log('\nPerfil');
  await denied('A no puede crearse como admin', () => setDoc(doc(a.db, 'users', A.uid), profile(A, { role: 'admin' })));
  await denied('A no puede crearse con suscripción', () => setDoc(doc(a.db, 'users', A.uid), profile(A, { role: 'student_subscribed' })));
  await denied('A no puede crearse con nivel 5', () => setDoc(doc(a.db, 'users', A.uid), profile(A, { accessLevel: 5 })));
  await denied('A no puede crearse con plan pagado', () => setDoc(doc(a.db, 'users', A.uid), profile(A, { plan: 'completo' })));
  await denied('A no puede crear el perfil de B', () => setDoc(doc(a.db, 'users', B.uid), profile(B)));
  await denied('A no puede usar otro correo', () => setDoc(doc(a.db, 'users', A.uid), profile(A, { email: 'otra@x.com' })));
  await allowed('A crea su perfil', () => setDoc(doc(a.db, 'users', A.uid), profile(A)));
  await allowed('B crea su perfil', () => setDoc(doc(b.db, 'users', B.uid), profile(B)));
  await allowed('A lee su perfil', () => getDoc(doc(a.db, 'users', A.uid)));
  await denied('A NO lee el perfil de B', () => getDoc(doc(a.db, 'users', B.uid)));
  await denied('A NO lista usuarios', () => getDocs(collection(a.db, 'users')));
  await denied('A NO se sube de nivel', () => updateDoc(doc(a.db, 'users', A.uid), { accessLevel: 5 }));
  await denied('A NO se cambia el rol', () => updateDoc(doc(a.db, 'users', A.uid), { role: 'admin' }));
  await denied('A NO se pone suscripción sola', () => updateDoc(doc(a.db, 'users', A.uid), { role: 'student_subscribed' }));
  await denied('A NO se pone el plan', () => updateDoc(doc(a.db, 'users', A.uid), { plan: 'completo' }));
  await denied('A NO borra el estado de pago pendiente', () => updateDoc(doc(a.db, 'users', A.uid), { paymentStatus: 'ok' }));
  await denied('A NO edita el perfil de B', () => updateDoc(doc(a.db, 'users', B.uid), { displayName: 'hackeada' }));
  await allowed('A actualiza su último ingreso', () => updateDoc(doc(a.db, 'users', A.uid), { lastLogin: serverTimestamp() }));

  console.log('\nAvance y notas');
  await allowed('A guarda avance propio', () => setDoc(doc(a.db, 'users', A.uid, 'progress', 'pendulo_0_0'), { done: true, updatedAt: serverTimestamp() }));
  await denied('A NO escribe avance de B', () => setDoc(doc(a.db, 'users', B.uid, 'progress', 'pendulo_0_0'), { done: true, updatedAt: serverTimestamp() }));
  await denied('A NO lee avance de B', () => getDocs(collection(a.db, 'users', B.uid, 'progress')));
  await allowed('A guarda nota privada', () => setDoc(doc(a.db, 'users', A.uid, 'notes', 'pendulo_0_0'), { text: 'secreto de Ana', updatedAt: serverTimestamp() }));
  await denied('B NO lee la nota de A', () => getDoc(doc(b.db, 'users', A.uid, 'notes', 'pendulo_0_0')));
  await denied('B NO lee las notas de A (lista)', () => getDocs(collection(b.db, 'users', A.uid, 'notes')));
  await denied('A NO mete campos extra en el avance', () => setDoc(doc(a.db, 'users', A.uid, 'progress', 'x_0_0'), { done: true, updatedAt: serverTimestamp(), score: 99 }));

  console.log('\nPreguntas, ayuda y pagos');
  let qid;
  await allowed('A hace una pregunta', async () => { qid = (await addDoc(collection(a.db, 'users', A.uid, 'questions'), { lessonKey: 'pendulo_0_0', text: '¿cómo?', answered: false, createdAt: serverTimestamp() })).id; });
  await denied('A NO se auto-responde como Maestra', () => updateDoc(doc(a.db, 'users', A.uid, 'questions', qid), { reply: 'ok', answered: true }));
  await denied('B NO lee preguntas de A', () => getDocs(collection(b.db, 'users', A.uid, 'questions')));
  await denied('B NO lee preguntas de todas (collectionGroup)', () => getDocs(query(collectionGroup(b.db, 'questions'), limit(5))));
  await allowed('A abre una solicitud de ayuda', () => addDoc(collection(a.db, 'users', A.uid, 'tickets'), { topic: 'Pagos', message: 'hola', status: 'open', createdAt: serverTimestamp() }));
  await denied('B NO lee solicitudes de A', () => getDocs(collection(b.db, 'users', A.uid, 'tickets')));
  await denied('A NO se registra un pago', () => addDoc(collection(a.db, 'users', A.uid, 'payments'), { amount: 55, status: 'paid', createdAt: serverTimestamp() }));
  await denied('A NO se crea notificaciones', () => addDoc(collection(a.db, 'users', A.uid, 'notifications'), { text: 'x', read: false, createdAt: serverTimestamp() }));
  await adb.collection(`users/${A.uid}/payments`).add({ amount: 55, status: 'paid', createdAt: new Date() });
  await allowed('A lee sus pagos', () => getDocs(collection(a.db, 'users', A.uid, 'payments')));
  await denied('B NO lee pagos de A', () => getDocs(collection(b.db, 'users', A.uid, 'payments')));

  console.log('\nComunidad');
  let pid;
  await denied('A NO publica con nombre falso', () => addDoc(collection(a.db, 'posts'), { ch: 'general', text: 'hola', authorUid: A.uid, authorName: 'Maestra Holística', isTeacher: false, likeCount: 0, createdAt: serverTimestamp() }));
  await denied('A NO se hace pasar por Maestra', () => addDoc(collection(a.db, 'posts'), { ch: 'general', text: 'hola', authorUid: A.uid, authorName: A.name, isTeacher: true, likeCount: 0, createdAt: serverTimestamp() }));
  await denied('A NO publica a nombre de B', () => addDoc(collection(a.db, 'posts'), { ch: 'general', text: 'hola', authorUid: B.uid, authorName: B.name, isTeacher: false, likeCount: 0, createdAt: serverTimestamp() }));
  await denied('A NO publica con likes inflados', () => addDoc(collection(a.db, 'posts'), { ch: 'general', text: 'hola', authorUid: A.uid, authorName: A.name, isTeacher: false, likeCount: 50, createdAt: serverTimestamp() }));
  await allowed('A publica', async () => { pid = (await addDoc(collection(a.db, 'posts'), { ch: 'general', text: 'hola a todas', authorUid: A.uid, authorName: A.name, isTeacher: false, likeCount: 0, createdAt: serverTimestamp() })).id; });
  await allowed('B ve la publicación de A', async () => { const s = await getDocs(query(collection(b.db, 'posts'), orderBy('createdAt', 'desc'), limit(10))); if (!s.docs.some((d) => d.id === pid)) throw { code: 'no-visible' }; });
  await denied('B NO edita el texto de A', () => updateDoc(doc(b.db, 'posts', pid), { text: 'editado' }));
  await denied('B NO borra la publicación de A', () => deleteDoc(doc(b.db, 'posts', pid)));
  await denied('B NO infla likes sin dar like', () => updateDoc(doc(b.db, 'posts', pid), { likeCount: increment(5) }));
  await allowed('B da like (lote)', async () => { const w = writeBatch(b.db); w.set(doc(b.db, 'users', B.uid, 'likes', pid), { createdAt: serverTimestamp() }); w.update(doc(b.db, 'posts', pid), { likeCount: increment(1) }); await w.commit(); });
  await denied('B NO da un segundo like', async () => { const w = writeBatch(b.db); w.update(doc(b.db, 'posts', pid), { likeCount: increment(1) }); await w.commit(); });
  await denied('B NO lee los likes de A', () => getDocs(collection(b.db, 'users', A.uid, 'likes')));
  await allowed('B responde', () => addDoc(collection(b.db, 'replies'), { postId: pid, ch: 'general', text: 'hola Ana', authorUid: B.uid, authorName: B.name, isTeacher: false, createdAt: serverTimestamp() }));
  await denied('B NO responde con nombre ajeno', () => addDoc(collection(b.db, 'replies'), { postId: pid, ch: 'general', text: 'x', authorUid: B.uid, authorName: A.name, isTeacher: false, createdAt: serverTimestamp() }));
  await denied('B NO responde con otro canal', () => addDoc(collection(b.db, 'replies'), { postId: pid, ch: 'presentaciones', text: 'x', authorUid: B.uid, authorName: B.name, isTeacher: false, createdAt: serverTimestamp() }));
  await allowed('A borra su publicación', () => deleteDoc(doc(a.db, 'posts', pid)));

  console.log('\nCuenta gratis');
  const freeQ = (db, c) => getDocs(query(collection(db, c), where('ch', 'in', ['presentaciones', 'testimonios']), orderBy('createdAt', 'desc'), limit(10)));
  await allowed('F lee Preséntate y Testimonios', () => freeQ(f.db, 'posts'));
  await allowed('F lee respuestas de esos canales', () => freeQ(f.db, 'replies'));
  await denied('F NO lee toda la comunidad', () => getDocs(query(collection(f.db, 'posts'), orderBy('createdAt', 'desc'), limit(10))));
  await denied('F NO publica en General', () => addDoc(collection(f.db, 'posts'), { ch: 'general', text: 'hola', authorUid: F.uid, authorName: F.name, isTeacher: false, likeCount: 0, createdAt: serverTimestamp() }));
  await denied('F NO publica en Testimonios', () => addDoc(collection(f.db, 'posts'), { ch: 'testimonios', text: 'hola', authorUid: F.uid, authorName: F.name, isTeacher: false, likeCount: 0, createdAt: serverTimestamp() }));
  await allowed('F se presenta', () => addDoc(collection(f.db, 'posts'), { ch: 'presentaciones', text: 'Hola, soy Fran', authorUid: F.uid, authorName: F.name, isTeacher: false, likeCount: 0, createdAt: serverTimestamp() }).then((r) => created.push(r)));

  console.log('\nClases en vivo');
  await allowed('Maestra programa una clase', async () => {
    const w = writeBatch(m.db);
    w.set(doc(m.db, 'agenda', 'test_' + tag), { level: 2, title: 'Prueba', start: new Date(), durationMin: 60 });
    w.set(doc(m.db, 'liveLinks', 'test_' + tag), { level: 2, url: 'https://meet.google.com/x', recordingUrl: '' });
    await w.commit();
    created.push(doc(m.db, 'agenda', 'test_' + tag), doc(m.db, 'liveLinks', 'test_' + tag));
  });
  await allowed('F ve la agenda', () => getDoc(doc(f.db, 'agenda', 'test_' + tag)));
  await denied('F NO ve el enlace de la sala', () => getDoc(doc(f.db, 'liveLinks', 'test_' + tag)));
  await denied('A (Nivel 1) NO ve el enlace del Nivel 2', () => getDoc(doc(a.db, 'liveLinks', 'test_' + tag)));
  await allowed('A lista los enlaces de su nivel', () => getDocs(query(collection(a.db, 'liveLinks'), where('level', '<=', 1))));
  await denied('J (solo Nivel 3) NO ve el enlace del Nivel 2', () => getDoc(doc(j.db, 'liveLinks', 'test_' + tag)));
  await allowed('J lista los enlaces del Nivel 3', () => getDocs(query(collection(j.db, 'liveLinks'), where('level', '==', 3))));
  await denied('A NO programa clases', () => setDoc(doc(a.db, 'agenda', 'x_' + tag), { level: 1, title: 'x' }));
  await denied('A NO cambia el video de bienvenida', () => setDoc(doc(a.db, 'config', 'aula'), { welcomeVideo: 'x' }));

  console.log('\nMaestra y visitantes');
  await allowed('Maestra lista usuarios', () => getDocs(collection(m.db, 'users')));
  await allowed('Maestra lee notas de A', () => getDocs(collection(m.db, 'users', A.uid, 'notes')));
  await allowed('Maestra lee todas las preguntas', () => getDocs(query(collectionGroup(m.db, 'questions'), limit(5))));
  await allowed('Maestra responde pregunta', () => updateDoc(doc(m.db, 'users', A.uid, 'questions', qid), { reply: 'Con el gráfico', answered: true }));
  await allowed('Maestra sube a A de nivel', () => updateDoc(doc(m.db, 'users', A.uid), { accessLevel: 2, plan: 'mensual' }));
  await adb.doc(`users/${M.uid}`).set({ uid: M.uid, email: M.email, displayName: M.name, role: 'admin' });
  await allowed('Maestra publica como Maestra', () => addDoc(collection(m.db, 'posts'), { ch: 'general', text: 'Bienvenidas', authorUid: M.uid, authorName: M.name, isTeacher: true, likeCount: 0, createdAt: serverTimestamp() }).then((r) => created.push(r)));
  const anon = getFirestore(initializeApp(cfg, 'anon'), DATABASE);
  await denied('Visitante NO lee la comunidad', () => getDocs(collection(anon, 'posts')));
  await denied('Visitante NO lee usuarios', () => getDoc(doc(anon, 'users', A.uid)));
  await denied('Nadie lee colecciones no declaradas', () => getDocs(collection(a.db, 'secretos')));
} finally {
  for (const r of created) await adb.doc(r.path).delete().catch(() => {});
  for (const u of [A, B, F, M, J]) {
    await adb.recursiveDelete(adb.doc(`users/${u.uid}`)).catch(() => {});
    await admin.auth().deleteUser(u.uid).catch(() => {});
  }
  const left = await adb.collection('replies').where('authorUid', 'in', [A.uid, B.uid, M.uid]).get();
  for (const d of left.docs) await d.ref.delete();
  const posts = await adb.collection('posts').where('authorUid', 'in', [A.uid, B.uid, F.uid, M.uid]).get();
  for (const d of posts.docs) await d.ref.delete();
}
console.log(`\n${pass} correctas, ${fail} con fallas`);
process.exit(fail ? 1 : 0);
