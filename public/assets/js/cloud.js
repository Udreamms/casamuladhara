// Capa de datos del aula: sesión + Firestore.
// Todo lo personal vive en users/{uid}/…; las reglas (firebase/firestore.rules) impiden leer lo de otra alumna.
import { auth, db } from './firebase.js';
import { PREVIEW, startPreview } from './preview.js';
import { profileApi, googlePhoto } from './profile.js';
import { onAuthStateChanged, onIdTokenChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, query, orderBy, limit,
  onSnapshot, serverTimestamp, writeBatch, increment, where, collectionGroup, Timestamp,
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
const person = (name, uid, photo) => ({ who: name, ini: initials(name), c: colorFor(uid || name), photo: photo || '' });

// Clave estable de cada clase: nivel_módulo_clase
export const lessonKey = (levelId, i, j) => `${levelId}_${i}_${j}`;

// Vista previa de la rama valentina: entra sin sesión (ver preview.js)
if (PREVIEW) {
  startPreview();
  await new Promise(() => {});
}

const user = await new Promise((res) => { const off = onAuthStateChanged(auth, (u) => { off(); res(u); }); });
if (!user) {
  location.replace('/login?mode=login&next=/aula');
  await new Promise(() => {});
}
// Si cierra sesión en otra pestaña, sale también de esta
onAuthStateChanged(auth, (u) => { if (!u) location.replace('/login?mode=login'); });

// El servidor (src/proxy.js) lee esta cookie para servir el contenido de las clases y sus materiales.
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
    role: 'student_free', accessLevel: 1, plan: 'none', paymentStatus: 'none',
    createdAt: serverTimestamp(), lastLogin: serverTimestamp(),
  });
} else {
  await updateDoc(userRef, { lastLogin: serverTimestamp() });
}
snap = await getDoc(userRef);
const p = snap.data();

const token = await user.getIdTokenResult(true);
setSessionCookie(token.token);
const isAdmin = token.claims.admin === true;
// lvls (los niveles que tiene abiertos, p. ej. [3]) y lvl (el más alto) los ponen el webhook de Stripe y la Maestra desde su portal
const paid = new URLSearchParams(location.search).get('pago');
if (paid) history.replaceState(null, '', '/aula');

const name = p.displayName || pretty((p.email || '').split('@')[0]);
const CM = {
  uid, isAdmin, lvl: isAdmin ? 5 : Number(token.claims.lvl) || 0, paid,
  // tokens antiguos sin lvls: todos los niveles hasta lvl
  lvls: isAdmin ? [1, 2, 3, 4, 5] : Array.isArray(token.claims.lvls) ? token.claims.lvls : Array.from({ length: Number(token.claims.lvl) || 0 }, (_, i) => i + 1),
  blocked: p.blocked === true,
  editor: { api: profileApi(uid), hasGoogle: !!googlePhoto() },
  profile: { ...p, name, ini: initials(name), c: colorFor(uid), accessLevel: Number(p.accessLevel) || 1, plan: p.plan || 'none', paymentStatus: p.paymentStatus || 'none' },
  progress: {}, doneAt: {}, notes: {}, questions: {}, tickets: [], payments: [], notifications: [],
  posts: [], likes: new Set(), students: [],
  onPosts: () => {},
  signOut: () => signOut(auth).then(() => { setSessionCookie(''); location.replace('/login?mode=login'); }),
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
// Tras guardar el perfil: refresca el nombre y la foto que usa el aula
CM.applyProfile = (P) => {
  const n = P.displayName || CM.profile.name;
  Object.assign(CM.profile, { name: n, ini: initials(n), displayName: P.displayName, photoURL: P.photoURL || '', phone: P.phone || '', country: P.country || '', bio: P.bio || '' });
};

// ---- Comunidad (publicaciones compartidas entre alumnas, sin correos ni datos privados) ----
let rawPosts = [], rawReplies = [];
const rebuild = () => {
  const byPost = {};
  rawReplies.slice().reverse().forEach((r) => (byPost[r.postId] ||= []).push({ ...person(r.authorName, r.authorUid, r.authorPhoto), karen: r.isTeacher, txt: r.text, id: r.id, mine: r.authorUid === uid }));
  CM.posts = rawPosts.map((x) => ({
    id: x.id, ch: x.ch, ...person(x.authorName, x.authorUid, x.authorPhoto), karen: x.isTeacher, when: ago(x.createdAt), txt: x.text,
    likes: x.likeCount || 0, liked: CM.likes.has(x.id), replies: byPost[x.id] || [], mine: x.authorUid === uid,
  }));
  CM.onPosts();
};
// Sin niveles abiertos solo se ven Preséntate y Testimonios (las reglas de Firestore lo exigen igual)
const FREE_CHANNELS = ['presentaciones', 'testimonios'];
CM.free = !isAdmin && CM.lvls.length === 0;
CM.freeChannels = FREE_CHANNELS;
const inFree = CM.free ? [where('ch', 'in', FREE_CHANNELS)] : [];
onSnapshot(query(collection(db, 'posts'), ...inFree, orderBy('createdAt', 'desc'), limit(80)),
  (s) => { rawPosts = s.docs.map((d) => ({ id: d.id, ...d.data() })); rebuild(); }, (e) => console.warn('posts', e.code));
onSnapshot(query(collection(db, 'replies'), ...inFree, orderBy('createdAt', 'desc'), limit(400)),
  (s) => { rawReplies = s.docs.map((d) => ({ id: d.id, ...d.data() })); rebuild(); }, (e) => console.warn('replies', e.code));
onSnapshot(mine('likes'), (s) => { CM.likes = new Set(s.docs.map((d) => d.id)); rebuild(); }, (e) => console.warn('likes', e.code));

CM.post = (ch, text) => addDoc(collection(db, 'posts'), {
  ch, text, authorUid: uid, authorName: CM.profile.displayName || CM.profile.name, authorPhoto: CM.profile.photoURL || '', isTeacher: isAdmin, likeCount: 0, createdAt: serverTimestamp(),
});
CM.reply = (postId, text, ch) => addDoc(collection(db, 'replies'), {
  postId, ch, text, authorUid: uid, authorName: CM.profile.displayName || CM.profile.name, authorPhoto: CM.profile.photoURL || '', isTeacher: isAdmin, createdAt: serverTimestamp(),
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
  CM.students = s.docs.map((d) => ({ id: d.id, ...d.data() })).filter((u) => u.role !== 'admin')
    .map((u) => ({ ...u, n: u.displayName || u.email, ...person(u.displayName || u.email, u.id), email: u.email, since: fdate(u.createdAt), next: fdate(u.currentPeriodEnd) }));
  return CM.students;
};

// ---- Clases en vivo: agenda (la ven todas) y enlaces de sala y grabación (solo con el nivel abierto) ----
const toLive = (d) => ({ id: d.id, ...d.data() });
CM.agenda = []; CM.liveLinks = {};
CM.loadLive = async () => {
  const [ag, links] = await Promise.all([
    getDocs(query(collection(db, 'agenda'), orderBy('start', 'asc'), limit(200))),
    isAdmin ? getDocs(collection(db, 'liveLinks'))
      : Promise.all(CM.lvls.map((n) => getDocs(query(collection(db, 'liveLinks'), where('level', '==', n))))),
  ]);
  CM.agenda = ag.docs.map(toLive);
  CM.liveLinks = {};
  [links].flat().forEach((s) => s.forEach((d) => { CM.liveLinks[d.id] = d.data(); }));
};
// Solo la Maestra: programa o actualiza la clase en vivo de una lección
CM.saveLive = async (key, { level, title, start, durationMin, url, recordingUrl }) => {
  const b = writeBatch(db);
  b.set(doc(db, 'agenda', key), { level, title, start: Timestamp.fromDate(start), durationMin, updatedAt: serverTimestamp() });
  b.set(doc(db, 'liveLinks', key), { level, url, recordingUrl, updatedAt: serverTimestamp() });
  await b.commit();
  await CM.loadLive();
};
CM.deleteLive = async (key) => {
  const b = writeBatch(db);
  b.delete(doc(db, 'agenda', key)); b.delete(doc(db, 'liveLinks', key));
  await b.commit();
  await CM.loadLive();
};

// ---- Ajustes del aula (video de bienvenida) ----
CM.config = {};
CM.loadConfig = async () => { CM.config = (await getDoc(doc(db, 'config', 'aula'))).data() || {}; };
CM.saveConfig = async (data) => {
  await setDoc(doc(db, 'config', 'aula'), { ...data, updatedAt: serverTimestamp() }, { merge: true });
  await CM.loadConfig();
};

// ---- Solo Maestra: preguntas de las alumnas para responder desde el panel ----
CM.pending = [];
CM.loadQuestions = async () => {
  if (!isAdmin) return [];
  const s = await getDocs(query(collectionGroup(db, 'questions'), where('answered', '==', false), orderBy('createdAt', 'desc'), limit(100)));
  CM.pending = s.docs.map((d) => ({ id: d.id, uid: d.ref.parent.parent.id, ...d.data(), when: ago(d.data().createdAt) }));
  return CM.pending;
};
CM.answer = async (q, reply, lessonTitle) => {
  const b = writeBatch(db);
  b.update(doc(db, 'users', q.uid, 'questions', q.id), { reply, answered: true, repliedAt: serverTimestamp() });
  b.set(doc(collection(db, 'users', q.uid, 'notifications')), {
    text: `La Maestra respondió tu pregunta en «${lessonTitle}». Ábrela en la pestaña Preguntas de esa clase.`,
    read: false, createdAt: serverTimestamp(),
  });
  await b.commit();
  CM.pending = CM.pending.filter((x) => x.id !== q.id);
};

await Promise.all([CM.loadLive(), CM.loadConfig()]).catch((e) => console.warn('aula', e.code || e));

// ---- Suscripción (Stripe): devuelve la URL de pago o del portal para administrarla ----
CM.billing = async (kind) => {
  const r = await fetch('/api/billing', {
    method: 'POST',
    headers: { Authorization: `Bearer ${await user.getIdToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind }),
  });
  const out = await r.json().catch(() => ({}));
  if (!r.ok || !out.url) throw new Error(out.error || 'No se pudo abrir el pago. Inténtalo de nuevo.');
  return out.url;
};

window.CM = CM;
window.cmStart(CM);

// Al volver de Stripe el webhook puede tardar unos segundos: esperamos a que se registre y recargamos el aula
if (paid === 'ok' && !isAdmin) {
  const before = JSON.stringify([p.plan, p.paymentStatus, p.paidInstallments || 0]);
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const now = (await getDoc(userRef)).data();
    if (JSON.stringify([now.plan, now.paymentStatus, now.paidInstallments || 0]) !== before) {
      await user.getIdToken(true);
      location.replace('/aula');
      break;
    }
  }
}
