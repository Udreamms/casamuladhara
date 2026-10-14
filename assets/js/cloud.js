// Capa de datos del aula: sesión + Firestore.
// Todo lo personal vive en users/{uid}/…; las reglas (firestore.rules) impiden leer lo de otra alumna.
import { auth, db } from './firebase.js';
import { onAuthStateChanged, onIdTokenChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, query, orderBy, limit,
  onSnapshot, serverTimestamp, writeBatch, increment,
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const COLORS = ['#f2c66d', '#cfe0c4', '#e8c9b8', '#f2e1b5', '#d4dcea', '#efd3c3'];
const pretty = (s) => s.replace(/[._\-+]+/g, ' ').replace(/\d+/g, '').trim().replace(/\b\p{L}/gu, (c) => c.toUpperCase()) || 'Alumna';
const initials = (n) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'A';
const colorFor = (seed) => COLORS[[...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
const ago = (ts) => {
  if (!ts?.toMillis) return 'Ahora';
  const m = Math.max(0, Date.now() - ts.toMillis()) / 60000;
  if (m < 1) return 'Ahora';
  if (m < 60) return `Hace ${Math.floor(m)} min`;
  if (m < 1440) return `Hace ${Math.floor(m / 60)} h`;
  if (m < 10080) { const d = Math.floor(m / 1440); return d === 1 ? 'Ayer' : `Hace ${d} días`; }
  return ts.toDate().toLocaleDateString('es', { day: 'numeric', month: 'short' });
};
const fdate = (ts) => (ts?.toDate ? ts.toDate().toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const person = (name, uid) => ({ who: name, ini: initials(name), c: colorFor(uid || name) });

// Clave estable de cada clase: nivel_módulo_clase
export const lessonKey = (levelId, i, j) => `${levelId}_${i}_${j}`;

const user = await new Promise((res) => { const off = onAuthStateChanged(auth, (u) => { off(); res(u); }); });
if (!user) {
  location.replace('login.html?mode=login&next=aula.html');
  await new Promise(() => {});
}
// Si cierra sesión en otra pestaña, sale también de esta
onAuthStateChanged(auth, (u) => { if (!u) location.replace('login.html?mode=login'); });

// El servidor (middleware.js) lee esta cookie para servir el contenido de las clases y sus materiales.
// Es el mismo token de sesión de Firebase (dura 1 hora y se renueva solo).
const setSessionCookie = (t) => {
  document.cookie = t
    ? `cm_session=${t}; Path=/; Max-Age=3600; SameSite=Lax; Secure`
    : 'cm_session=; Path=/; Max-Age=0; SameSite=Lax; Secure';
};
onIdTokenChanged(auth, async (u) => setSessionCookie(u ? await u.getIdToken() : ''));

const uid = user.uid;
const me = (path) => doc(db, 'users', uid, ...path.split('/'));
const mine = (name) => collection(db, 'users', uid, name);

// ---- Perfil (se crea la primera vez que entra; nivel/plan/pago los fija solo la Maestra) ----
const userRef = doc(db, 'users', uid);
let snap = await getDoc(userRef);
if (!snap.exists()) {
  await setDoc(userRef, {
    uid,
    email: (user.email || '').trim().toLowerCase(),
    displayName: user.displayName || pretty((user.email || '').split('@')[0]),
    photoURL: user.photoURL || '',
    role: 'student', accessLevel: 1, plan: 'none', paymentStatus: 'none',
    createdAt: serverTimestamp(), lastLogin: serverTimestamp(),
  });
} else {
  await updateDoc(userRef, { lastLogin: serverTimestamp() });
}
snap = await getDoc(userRef);
const p = snap.data();

let token = await user.getIdTokenResult(true);
setSessionCookie(token.token);
const isAdmin = token.claims.admin === true;
// member=true lo pone el webhook de Stripe (o la Maestra con scripts/admin.mjs) mientras la suscripción esté al día
const paid = new URLSearchParams(location.search).get('pago');
if (paid) history.replaceState(null, '', 'aula.html');

const name = p.displayName || pretty((p.email || '').split('@')[0]);
const CM = {
  uid, isAdmin, member: token.claims.member === true, paid,
  profile: { ...p, name, ini: initials(name), c: colorFor(uid), accessLevel: Number(p.accessLevel) || 1, plan: p.plan || 'none', paymentStatus: p.paymentStatus || 'none' },
  progress: {}, doneAt: {}, notes: {}, questions: {}, tickets: [], payments: [], notifications: [],
  posts: [], likes: new Set(), students: [],
  onPosts: () => {},
  signOut: () => signOut(auth).then(() => { setSessionCookie(''); location.replace('login.html?mode=login'); }),
};

// ---- Carga inicial (solo mis datos) ----
const [prog, notes, qs, tks, pays, nots] = await Promise.all([
  getDocs(mine('progress')), getDocs(mine('notes')), getDocs(query(mine('questions'), orderBy('createdAt', 'asc'))),
  getDocs(query(mine('tickets'), orderBy('createdAt', 'desc'))), getDocs(query(mine('payments'), orderBy('createdAt', 'desc'))),
  getDocs(query(mine('notifications'), orderBy('createdAt', 'desc'), limit(20))),
]);
prog.forEach((d) => { if (d.data().done) { CM.progress[d.id] = true; CM.doneAt[d.id] = d.data().updatedAt; } });
notes.forEach((d) => { CM.notes[d.id] = d.data().text || ''; });
qs.forEach((d) => { const q = d.data(); (CM.questions[q.lessonKey] ||= []).push({ id: d.id, ...q }); });
tks.forEach((d) => CM.tickets.push({ id: d.id, ...d.data() }));
pays.forEach((d) => CM.payments.push({ id: d.id, ...d.data() }));
nots.forEach((d) => CM.notifications.push({ id: d.id, ...d.data(), when: ago(d.data().createdAt) }));

// ---- Avance, notas, preguntas, ayuda ----
CM.setDone = async (key, done) => {
  if (done) { await setDoc(me(`progress/${key}`), { done: true, updatedAt: serverTimestamp() }); CM.progress[key] = true; CM.doneAt[key] = { toDate: () => new Date(), toMillis: () => Date.now() }; }
  else { await deleteDoc(me(`progress/${key}`)); delete CM.progress[key]; delete CM.doneAt[key]; }
};
CM.saveNote = async (key, text) => {
  if (!text.trim()) { await deleteDoc(me(`notes/${key}`)); delete CM.notes[key]; return; }
  await setDoc(me(`notes/${key}`), { text, updatedAt: serverTimestamp() }); CM.notes[key] = text;
};
CM.ask = async (key, text) => {
  const ref = await addDoc(mine('questions'), { lessonKey: key, text, answered: false, createdAt: serverTimestamp() });
  (CM.questions[key] ||= []).push({ id: ref.id, lessonKey: key, text, answered: false });
};
CM.ticket = async (topic, message) => {
  const ref = await addDoc(mine('tickets'), { topic, message, status: 'open', createdAt: serverTimestamp() });
  CM.tickets.unshift({ id: ref.id, topic, message, status: 'open' });
};
CM.fdate = fdate;

// ---- Comunidad (publicaciones compartidas entre alumnas, sin correos ni datos privados) ----
let rawPosts = [], rawReplies = [];
const rebuild = () => {
  const byPost = {};
  rawReplies.slice().reverse().forEach((r) => (byPost[r.postId] ||= []).push({ ...person(r.authorName, r.authorUid), karen: r.isTeacher, txt: r.text, id: r.id, mine: r.authorUid === uid }));
  CM.posts = rawPosts.map((x) => ({
    id: x.id, ch: x.ch, ...person(x.authorName, x.authorUid), karen: x.isTeacher, when: ago(x.createdAt), txt: x.text,
    likes: x.likeCount || 0, liked: CM.likes.has(x.id), replies: byPost[x.id] || [], mine: x.authorUid === uid,
  }));
  CM.onPosts();
};
onSnapshot(query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(80)),
  (s) => { rawPosts = s.docs.map((d) => ({ id: d.id, ...d.data() })); rebuild(); }, (e) => console.warn('posts', e.code));
onSnapshot(query(collection(db, 'replies'), orderBy('createdAt', 'desc'), limit(400)),
  (s) => { rawReplies = s.docs.map((d) => ({ id: d.id, ...d.data() })); rebuild(); }, (e) => console.warn('replies', e.code));
onSnapshot(mine('likes'), (s) => { CM.likes = new Set(s.docs.map((d) => d.id)); rebuild(); }, (e) => console.warn('likes', e.code));

CM.post = (ch, text) => addDoc(collection(db, 'posts'), {
  ch, text, authorUid: uid, authorName: name, isTeacher: isAdmin, likeCount: 0, createdAt: serverTimestamp(),
});
CM.reply = (postId, text) => addDoc(collection(db, 'replies'), {
  postId, text, authorUid: uid, authorName: name, isTeacher: isAdmin, createdAt: serverTimestamp(),
});
CM.toggleLike = async (postId) => {
  const b = writeBatch(db), likeRef = me(`likes/${postId}`), postRef = doc(db, 'posts', postId);
  if (CM.likes.has(postId)) { b.delete(likeRef); b.update(postRef, { likeCount: increment(-1) }); }
  else { b.set(likeRef, { createdAt: serverTimestamp() }); b.update(postRef, { likeCount: increment(1) }); }
  await b.commit();
};
CM.deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// ---- Solo Maestra: listado de alumnas ----
CM.loadStudents = async () => {
  if (!isAdmin) return [];
  const s = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
  CM.students = s.docs.map((d) => ({ id: d.id, ...d.data() })).filter((u) => u.role === 'student')
    .map((u) => ({ ...u, n: u.displayName || u.email, ...person(u.displayName || u.email, u.id), email: u.email, since: fdate(u.createdAt) }));
  return CM.students;
};

// ---- Suscripción (Stripe): devuelve la URL de pago o del portal para administrarla ----
CM.billing = async () => {
  const r = await fetch('/api/billing', { method: 'POST', headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
  const out = await r.json().catch(() => ({}));
  if (!r.ok || !out.url) throw new Error(out.error || 'No se pudo abrir el pago. Inténtalo de nuevo.');
  return out.url;
};

window.CM = CM;
window.cmStart(CM);

// Al volver de Stripe el webhook puede tardar unos segundos: esperamos el acceso y recargamos el aula
if (paid === 'ok' && !CM.member && !isAdmin) {
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    token = await user.getIdTokenResult(true);
    if (token.claims.member === true) { location.replace('aula.html'); break; }
  }
}
