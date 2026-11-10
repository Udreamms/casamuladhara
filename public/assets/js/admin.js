// Portal de la Maestra (/admin): alumnas, acceso por alumna, la formación completa, pagos, mensajes, preguntas, ayuda y comunidad.
// Entra con usuario y contraseña (sin correo): /api/staff los compara con STAFF_USER y STAFF_PASSWORD y entrega la sesión del Staff.
// Lo que se ve aquí lo protegen las reglas de Firestore: solo una cuenta con el claim admin puede leerlo.
import { auth, db } from './firebase.js';
import { profileApi, mountProfileEditor, googlePhoto } from './profile.js';
import {
  signInWithCustomToken,
  onAuthStateChanged, onIdTokenChanged, signOut,
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, collectionGroup, getDocs, query, orderBy, where, limit,
  writeBatch, serverTimestamp, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const COLORS = ['#f2c66d', '#cfe0c4', '#e8c9b8', '#f2e1b5', '#d4dcea', '#efd3c3'];
const colorFor = (seed) => COLORS[[...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
const initials = (n) => String(n).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'A';
const fdate = (ts) => (ts?.toDate ? ts.toDate().toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const isHttps = (u) => /^https:\/\/[^\s]+$/i.test(u);
const LEVELS = [
  { n: 1, id: 'pendulo', t: 'Péndulo Hebreo' }, { n: 2, id: 'espacios', t: 'Limpieza de casas y espacios' },
  { n: 3, id: 'radiestesia', t: 'Radiestesia y Sanación del Alma' }, { n: 4, id: 'especializaciones', t: 'Especializaciones' },
  { n: 5, id: 'tarot', t: 'Tarot Terapéutico' },
];
const levelOfKey = (key) => LEVELS.find((l) => String(key).startsWith(l.id + '_'));
// Lo que se abre por separado (igual que src/lib/server/access.js): los niveles 1, 2, 3 y 5,
// y los cuatro cursos del Nivel 4, cada uno con su número: 41 = 4.1, 42 = 4.2, 43 = 4.3, 44 = 4.4
const UNITS = [
  { n: 1, t: 'Péndulo Hebreo' }, { n: 2, t: 'Limpieza de casas y espacios' }, { n: 3, t: 'Radiestesia y Sanación del Alma' },
  { n: 41, t: 'Niño interior' }, { n: 42, t: 'Vidas pasadas' }, { n: 43, t: 'Terapia transgeneracional' }, { n: 44, t: 'Limpieza uterina' },
  { n: 5, t: 'Tarot Terapéutico' },
];
const lvName = (n) => (n > 10 ? `${Math.floor(n / 10)}.${n % 10}` : String(n));
// "Nivel 4.2" para una clase del Nivel 4 (cada módulo es un curso), "Nivel 3" para las demás
const keyLevelName = (key) => { const lv = levelOfKey(key); if (!lv) return ''; const i = Number(String(key).split('_')[1]); return lv.n === 4 && i >= 0 && i < 4 ? `4.${i + 1}` : String(lv.n); };
const CHANNELS = { general: 'General', presentaciones: 'Preséntate', n1: 'Nivel 1', n2: 'Nivel 2', n3: 'Nivel 3', n4: 'Nivel 4', n5: 'Nivel 5', testimonios: 'Testimonios' };

let tt;
// Aviso abajo. Si hay una ventana abierta se muestra dentro de ella (si no, queda tapado). Con accion { label, fn } agrega un botón (p. ej. Deshacer).
function toast(msg, accion) {
  const t = $('#toast'), host = $('#dlg').open ? $('#dlg') : document.body;
  if (t.parentElement !== host) host.appendChild(t);
  t.textContent = msg;
  if (accion) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = accion.label;
    b.style.cssText = 'margin-left:12px;background:none;border:0;color:inherit;font:inherit;font-weight:700;text-decoration:underline;cursor:pointer';
    b.onclick = () => { t.hidden = true; accion.fn(); };
    t.append(b);
  }
  t.hidden = false; clearTimeout(tt); tt = setTimeout(() => (t.hidden = true), accion ? 10000 : 4200);
}
const fail = (e) => { console.error(e); toast(e?.message && !e.code ? e.message : 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.'); };

// ---------- Regla de acceso (la misma que src/lib/server/access.js) ----------
const paying = (u) => u.plan === 'completo' || (u.plan === 'mensual' && u.paymentStatus === 'ok');
// datos antiguos: niveles 1..n, sin los cursos del Nivel 4 (esos se abren uno por uno)
const upTo = (n) => [1, 2, 3, 5].filter((x) => x <= (Number(n) || 0));
const inOrder = (ns) => UNITS.map((l) => l.n).filter((n) => ns.includes(n));
const list = (v) => (Array.isArray(v) ? inOrder(v.map(Number)) : null);
const ownedOf = (u) => list(u.ownedLevels) ?? upTo(u.grantLevel);
const unlockedOf = (u) => list(u.unlockedLevels) ?? upTo(Math.max(Number(u.accessLevel) || 1, (Number(u.grantLevel) || 0) + 1));
// Clases de cada curso del Nivel 4 (1 a 4): un curso sin entrada en n4Classes las tiene todas abiertas (alumnas de antes)
const CLASSES = [1, 2, 3, 4];
const classesOf = (u, c) => (Array.isArray(u.n4Classes?.[c]) ? CLASSES.filter((k) => u.n4Classes[c].map(Number).includes(k)) : CLASSES);
const openOf = (u) => (u.blocked ? [] : inOrder([...ownedOf(u), ...(paying(u) ? unlockedOf(u) : [])]));
const payState = (u) => (u.plan === 'completo' ? ['done', 'Pagó completo']
  : u.plan === 'mensual' ? (u.paymentStatus === 'overdue' ? ['bad', 'Cuota pendiente'] : ['pres', 'En cuotas al día'])
    : ownedOf(u).length ? ['done', `Compró el Nivel ${ownedOf(u).map(lvName).join(', ')}`] : ['lock', 'Sin pago']);

// ---------- Datos ----------
const A = { wa: { chats: [], msgs: [], on: null }, students: [], questions: [], tickets: [], posts: [], config: {}, payments: {}, me: null, answers: null };
let api = null; // llama a /api/admin con el token de la Maestra

async function loadAll() {
  const [us, qs, tk, ps, cf, fm, cl, gr] = await Promise.all([
    getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))),
    getDocs(query(collectionGroup(db, 'questions'), where('answered', '==', false), orderBy('createdAt', 'desc'), limit(100))),
    getDocs(query(collectionGroup(db, 'tickets'), where('status', '==', 'open'), orderBy('createdAt', 'desc'), limit(100))),
    getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(60))),
    getDoc(doc(db, 'config', 'aula')),
    getDoc(doc(db, 'config', 'formacion')),
    getDoc(doc(db, 'config', 'clases')),
    getDoc(doc(db, 'config', 'clasesGratis')),
  ]);
  A.formacion = fm.data() || {};
  A.clases = cl.data() || {};
  A.gratis = (gr.data() || {}).clases || [];
  A.students = us.docs.map((d) => ({ id: d.id, ...d.data() })).filter((u) => u.role !== 'admin');
  A.questions = qs.docs.map((d) => ({ id: d.id, uid: d.ref.parent.parent.id, ...d.data() }));
  A.tickets = tk.docs.map((d) => ({ id: d.id, uid: d.ref.parent.parent.id, ...d.data() }));
  A.posts = ps.docs.map((d) => ({ id: d.id, ...d.data() }));
  A.config = cf.data() || {};
}
const data = {
  setAccess: async (uid, body) => {
    const out = await api({ action: 'access', uid, ...body });
    Object.assign(A.students.find((x) => x.id === uid), body, { n4Classes: out.n4Classes || {} });
  },
  payments: async (uid) => {
    if (!A.payments[uid]) {
      const s = await getDocs(query(collection(db, 'users', uid, 'payments'), orderBy('createdAt', 'desc')));
      A.payments[uid] = s.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    return A.payments[uid];
  },
  notify: async (uids, text) => {
    for (let i = 0; i < uids.length; i += 400) {
      const b = writeBatch(db);
      uids.slice(i, i + 400).forEach((uid) => b.set(doc(collection(db, 'users', uid, 'notifications')), { text, read: false, createdAt: serverTimestamp() }));
      await b.commit();
    }
  },
  answer: async (q, reply) => {
    const lv = levelOfKey(q.lessonKey);
    const b = writeBatch(db);
    b.update(doc(db, 'users', q.uid, 'questions', q.id), { reply, answered: true, repliedAt: serverTimestamp() });
    b.set(doc(collection(db, 'users', q.uid, 'notifications')), {
      text: `La Maestra respondió tu pregunta${lv ? ` del Nivel ${keyLevelName(q.lessonKey)}` : ''}. Ábrela en la pestaña Preguntas de esa clase.`,
      read: false, createdAt: serverTimestamp(),
    });
    await b.commit();
    A.questions = A.questions.filter((x) => x.id !== q.id);
  },
  closeTicket: async (t, reply) => {
    const b = writeBatch(db);
    b.update(doc(db, 'users', t.uid, 'tickets', t.id), { status: 'closed', ...(reply ? { reply, repliedAt: serverTimestamp() } : {}) });
    if (reply) b.set(doc(collection(db, 'users', t.uid, 'notifications')), { text: `Respuesta a tu mensaje «${t.topic}»: ${reply}`.slice(0, 1900), read: false, createdAt: serverTimestamp() });
    await b.commit();
    A.tickets = A.tickets.filter((x) => x.id !== t.id);
  },
  // El programa completo (niveles, módulos y clases) sale de los mismos datos del aula; se evalúa aparte para no mezclar sus nombres con los del portal
  course: async () => {
    if (!A.course) {
      const src = await Promise.all(['datos', 'datos-niveles'].map((f) => fetch(`/assets/js/aula/${f}.js`).then((r) => {
        if (!r.ok) throw new Error('No se pudo cargar el programa de la formación.');
        return r.text();
      })));
      A.course = new Function(`${src.join('\n')}\n;return LEVELS;`)();
    }
    return A.course;
  },
  // Lo que las alumnas escriben dentro de las clases (src/app/api/answers): las más recientes primero
  answers: async () => {
    const r = await fetch('/api/answers', {
      method: 'POST', headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'all' }),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(out.error || 'No se pudieron cargar las respuestas.');
    A.answers = out.answers.sort((a, b) => b.updatedAt - a.updatedAt);
    return A.answers;
  },
  // Calendario de la Maestra (calendario/{id}): clases gratis, cursos, formación, recesos, bloqueos y recordatorios
  cal: async () => {
    const s = await getDocs(query(collection(db, 'calendario'), orderBy('date', 'asc')));
    A.cal = s.docs.map((d) => { const x = { id: d.id, ...d.data() }; if (x.type === 'receso') x.type = 'bloqueado'; return x; });
    return A.cal;
  },
  calSave: async (id, d) => {
    if (id) await updateDoc(doc(db, 'calendario', id), d);
    else await addDoc(collection(db, 'calendario'), { ...d, createdAt: serverTimestamp() });
  },
  calAddMany: async (list) => {
    for (let i = 0; i < list.length; i += 400) {
      const b = writeBatch(db);
      list.slice(i, i + 400).forEach((d) => b.set(doc(collection(db, 'calendario')), { ...d, createdAt: serverTimestamp() }));
      await b.commit();
    }
  },
  calDelete: async (id) => { await deleteDoc(doc(db, 'calendario', id)); },
  // Personas que dejaron sus datos en las landings (src/app/api/leads): las más recientes primero
  leads: async (body = { action: 'all' }) => {
    const r = await fetch('/api/leads', {
      method: 'POST', headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(out.error || 'No se pudieron cargar las interesadas.');
    A._ultimo = out; // la última respuesta (p. ej. el id de lo que se acaba de crear)
    if (body.action === 'all') A.leads = out.leads;
    return A.leads;
  },
  deletePost: async (id) => { await deleteDoc(doc(db, 'posts', id)); A.posts = A.posts.filter((p) => p.id !== id); },
  saveConfig: async (d) => { await setDoc(doc(db, 'config', 'aula'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.config, d); },
  // Fecha de inicio y cupos del próximo grupo de la formación: los muestra la landing /formacion (src/app/api/formacion)
  // Enlaces de Google Meet de las clases gratis (se entregan al registrarse, src/app/api/leads).
  // El inicio de los cursos (/pendulo, /tarot) sale del Calendario (src/app/api/proximas).
  saveGratis: async (clases) => { await setDoc(doc(db, 'config', 'clasesGratis'), { clases, updatedAt: serverTimestamp() }); A.gratis = clases; A.gratisDraft = null; },
  saveClases: async (d) => { await setDoc(doc(db, 'config', 'clases'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.clases, d); },
  saveFormacion: async (d) => { await setDoc(doc(db, 'config', 'formacion'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.formacion, d); },
};

// ---------- Vista ----------
const S = { view: 'inicio', leadSel: new Set(), crmVista: 'embudo', crmProg: '', crmQ: '', crmOrigen: '', crmSeg: false, crmDesc: false, crmSinCuenta: false, crmEtapa: '', crmTag: '', crmRango: '', crmMetrica: 'origen', fichaTab: 'resumen', crmLista: '', clicOrden: 'recientes', q: '', open: null, filter: 'todas', lvOpen: {}, fq: '', cls: null, ansWho: '', ansLv: 0 };
const NAV = [
  ['inicio', 'Inicio', '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-6h4v6"/>'],
  ['--', 'CRM'],
  ['interesadas', 'Interesadas', '<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/>', () => leadsSinVer().length],
  ['whatsapp', 'WhatsApp', '<path d="M12 21a9 9 0 1 0-9-9c0 1.6.4 3.1 1.2 4.4L3 21l4.6-1.2A9 9 0 0 0 12 21z"/><path d="M9 8.5c.3 3 3 5.7 6.500 6.500"/>', () => A.wa.chats.reduce((n, c) => n + (c.unread || 0), 0)],
  ['calendario', 'Calendario', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'],
  ['envios', 'Envíos', '<path d="M4 12 20 4l-4 16-4-7z"/><path d="M12 13l8-9"/>'],
  ['clases', 'Clases y ofertas', '<path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M3 12h3M18 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/><circle cx="12" cy="12" r="3"/>'],
  ['gratis', 'Clases gratis del aula', '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>'],
  ['--', 'Alumnas'],
  ['alumnas', 'Alumnas', '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>', () => alumnasSinVer().length],
  ['pagos', 'Pagos', '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'],
  ['preguntas', 'Preguntas de clase', '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>', () => A.questions.length],
  ['respuestas', 'Respuestas de clase', '<path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>', () => newAnswers().length],
  ['ayuda', 'Mensajes de ayuda', '<path d="M12 21a9 9 0 1 0-9-9c0 1.6.4 3.1 1.2 4.4L3 21l4.6-1.2A9 9 0 0 0 12 21z"/>', () => A.tickets.length],
  ['--', 'Contenido'],
  ['formacion', 'Formación completa', '<path d="M3 8 12 4l9 4-9 4z"/><path d="M7 10v5c3 2 7 2 10 0v-5"/>'],
  ['comunidad', 'Comunidad', '<path d="M7 10h10M7 14h6"/><path d="M4 4h16v13H8l-4 3z"/>'],
  ['mensajes', 'Avisos a alumnas', '<path d="M4 5h16v11H9l-5 4z"/>'],
  ['ajustes', 'Ajustes del aula', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'],
];
// Una por persona (su registro más reciente) y solo si nada de lo suyo está más avanzado que "Nueva"
const nuevasLeads = () => personas().filter((p) => esNueva(etapaDe(p))).map((p) => p.leads[p.leads.length - 1]);
// Burbujas del menú: se quitan al entrar a la sección y vuelven solo con lo que llega después de esa visita (se guarda en este navegador)
const vistoAt = (k) => { try { return Number(localStorage.getItem(`cm-visto-${k}`)) || 0; } catch { return 0; } };
const marcarVisto = (k, hasta) => { try { localStorage.setItem(`cm-visto-${k}`, String(Math.max(Date.now(), hasta || 0))); } catch { /* sin almacenamiento */ } };
const leadsSinVer = () => nuevasLeads().filter((l) => (l.createdAt || 0) > vistoAt('interesadas'));
const alumnasSinVer = () => A.students.filter((u) => isNew(u) && u.createdAt.toMillis() > vistoAt('alumnas'));
const nameOf = (u) => u?.displayName || u?.email || 'Alumna';
const photoCss = (u) => (typeof u === 'string' && /^https:\/\/[^\s"'()\\]+$/.test(u) ? `background-image:url('${u}')` : '');
const av = (u) => { const ph = photoCss(u?.photoURL); return `<span class="av sm${ph ? ' ph' : ''}" style="--c:${colorFor(u?.id || nameOf(u))};${ph}">${ph ? '' : esc(initials(nameOf(u)))}</span>`; };
const student = (uid) => A.students.find((s) => s.id === uid);
const levelPills = (u) => (u.blocked ? '<span class="pill bad">Bloqueada</span>'
  : openOf(u).map((n) => `<span class="pill done">Nivel ${lvName(n)}</span>`).join(' ') || '<span class="pill lock">Ninguno</span>');
// Fila de niveles para marcar o desmarcar (field: ownedLevels o unlockedLevels)
const levelBoxes = (u, field, cur) => `<div class="lvbox" role="group">${UNITS.map((l) => `<label title="${esc(l.t)}"><input type="checkbox" data-lv="${field}" data-uid="${u.id}" value="${l.n}" ${cur.includes(l.n) ? 'checked' : ''}><span>Nivel ${lvName(l.n)}${l.n > 10 ? ` · ${esc(l.t)}` : ''}</span></label>`).join('')}</div>`;
// Clases de los cuatro cursos del Nivel 4, para abrírselas una por una
// (en un curso que aún no tiene, marcar una clase le abre también el curso)
const hasCourse = (u, c) => [...ownedOf(u), ...unlockedOf(u)].includes(c);
const classBoxes = (u) => UNITS.filter((l) => l.n > 10).map((l) => { const has = hasCourse(u, l.n);
  return `<div style="display:grid;gap:4px"><small><b>Nivel ${lvName(l.n)} · ${esc(l.t)}</b>${has ? '' : ' <span class="muted">· aún no tiene este curso: al marcarle una clase se le abre</span>'}</small><div class="lvbox" role="group">${CLASSES.map((k) => `<label><input type="checkbox" data-n4cls="${l.n}" data-uid="${u.id}" value="${k}" ${has && classesOf(u, l.n).includes(k) ? 'checked' : ''}><span>Clase ${k}</span></label>`).join('')}</div></div>`; }).join('');
const blockBtn = (u) => `<button class="btn ${u.blocked ? 'btn-primary' : 'btn-ghost'} btn-sm" data-block="${u.id}">${u.blocked ? 'Desbloquear' : 'Bloquear'}</button>`;

const V = {};
V.alumnas = () => {
  const q = S.q.toLowerCase();
  const list = A.students.filter((u) => (!q || (nameOf(u) + ' ' + (u.email || '')).toLowerCase().includes(q))
    && (S.filter === 'todas' || (S.filter === 'bloqueadas' ? u.blocked : S.filter === 'pendientes' ? u.paymentStatus === 'overdue' : openOf(u).length > 0)));
  const chip = (k, t) => `<button class="chip" data-filter="${k}" aria-pressed="${S.filter === k}">${t}</button>`;
  return `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Tus alumnas</h1><p>Cada alumna tiene sus propios niveles. Abre su ficha para desbloquearle niveles del programa a medida que avanza, o marcar los que compró aparte.</p></div></div>
  <div class="kpis"><div><b>${A.students.length}</b><span>cuentas registradas</span></div><div><b>${A.students.filter(isNew).length}</b><span>nuevas esta semana</span></div><div><b>${A.students.filter((u) => openOf(u).length > 0).length}</b><span>con niveles abiertos</span></div><div><b>${A.students.filter((u) => u.paymentStatus === 'overdue').length}</b><span>con cuota pendiente</span></div><div><b>${A.students.filter((u) => u.blocked).length}</b><span>bloqueadas</span></div></div>
  <section class="card panel">
    <div class="filters"><input type="text" id="sq" placeholder="Buscar por nombre o correo" value="${esc(S.q)}" style="flex:1;min-width:200px;border-radius:999px">${chip('todas', 'Todas')}${chip('abiertas', 'Con acceso')}${chip('pendientes', 'Cuota pendiente')}${chip('bloqueadas', 'Bloqueadas')}</div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Alumna</th><th>Pago</th><th>Niveles abiertos</th><th></th><th></th></tr></thead><tbody>
    ${list.map((u) => { const [k, t] = payState(u); return `<tr><td><span style="display:flex;gap:10px;align-items:center">${av(u)}<span><b style="display:block">${esc(nameOf(u))}${isNew(u) ? ' <span class="pill pres">Nueva</span>' : ''}</b><small class="muted">${esc(u.email)}</small></span></span></td><td><span class="pill ${k}">${t}</span></td><td>${levelPills(u)}</td><td>${blockBtn(u)}</td><td><button class="link" data-open="${u.id}">Ver ficha</button></td></tr>`; }).join('') || '<tr><td colspan="5" class="muted">No hay alumnas con ese filtro.</td></tr>'}
    </tbody></table></div>
  </section>`;
};
V.ficha = () => {
  const u = student(S.open);
  if (!u) return '<div class="card empty">No encontramos a esa alumna.</div>';
  const [k, t] = payState(u), pays = A.payments[u.id];
  const total = Number(u.installments) || 9;
  return `<button class="link" style="justify-self:start" data-go="alumnas">← Volver a las alumnas</button>
  <div class="view-head"><div style="display:flex;gap:14px;align-items:center">${av(u).replace('av sm', 'av')}<div><span class="eyebrow">Ficha de la alumna</span><h1 style="margin-top:6px">${esc(nameOf(u))}</h1><p>${esc(u.email)} · Desde ${fdate(u.createdAt) || '—'}</p></div></div></div>
  <div class="cols">
    <section class="card panel"><div class="panel-h"><h3>Niveles</h3>${blockBtn(u)}</div>
      <dl class="kv"><dt>Abiertos ahora</dt><dd>${levelPills(u)}</dd><dt>Pago</dt><dd><span class="pill ${k}">${t}</span></dd>${u.plan === 'mensual' ? `<dt>Cuotas</dt><dd>${Number(u.paidInstallments) || 0} de ${total}</dd>` : ''}${u.currentPeriodEnd?.toDate ? `<dt>Próximo cobro</dt><dd>${fdate(u.currentPeriodEnd)}</dd>` : ''}</dl>
      <div style="display:grid;gap:6px"><b style="font-size:.88rem">Desbloqueados en el programa completo</b>${levelBoxes(u, 'unlockedLevels', unlockedOf(u))}<small class="muted">Se abren mientras su programa esté pagado o con las cuotas al día.</small>${paying(u) ? '' : `<div class="alert" style="padding:12px 14px;font-size:.86rem"><span><b style="display:inline;font:inherit;font-weight:700">${esc(nameOf(u).split(' ')[0])} no tiene el programa pagado</b>, así que lo que marques aquí no se le abre todavía. Para abrirle un nivel ahora, márcalo abajo en «Abiertos siempre».</span></div>`}</div>
      <div style="display:grid;gap:6px"><b style="font-size:.88rem">Abiertos siempre (comprados aparte o regalados)</b>${levelBoxes(u, 'ownedLevels', ownedOf(u))}<small class="muted">Quedan abiertos siempre, pague o no el programa.</small></div>
      <div style="display:grid;gap:8px"><b style="font-size:.88rem">Clases del Nivel 4 (una por una)</b>${classBoxes(u)}<small class="muted">Cada curso del Nivel 4 tiene 4 clases. Al abrirle un curso empiezan cerradas: márcale cada clase cuando quieras que la vea.</small></div>
      <div style="display:grid;gap:6px"><b style="font-size:.88rem">Niveles completados</b>${levelBoxes(u, 'completedLevels', list(u.completedLevels) || [])}<small class="muted">Los que ya terminó, por ejemplo antes de la plataforma. En su aula salen completados al 100 % y con su insignia.</small></div>
    </section>
    <section class="card panel"><div class="panel-h"><h3>Datos de la alumna</h3><button class="btn btn-ghost btn-sm" data-edit-student="${u.id}">Editar</button></div>
      <dl class="kv"><dt>Nombre</dt><dd>${esc(nameOf(u))}</dd><dt>Correo</dt><dd>${esc(u.email)}</dd><dt>Teléfono</dt><dd>${esc(u.phone) || '<span class="muted">—</span>'}</dd><dt>País o ciudad</dt><dd>${esc(u.country) || '<span class="muted">—</span>'}</dd>${u.bio ? `<dt>Sobre ella</dt><dd>${esc(u.bio)}</dd>` : ''}<dt>Desde</dt><dd>${fdate(u.createdAt) || '—'}</dd></dl>
    </section>
    <section class="card panel"><h3>Escribirle un mensaje</h3><p class="muted" style="font-size:.86rem">Le llega a la campana de avisos del aula.</p>
      <form data-msg-one="${u.id}" style="display:grid;gap:10px"><textarea maxlength="1900" placeholder="Hola ${esc(nameOf(u).split(' ')[0])}, …" aria-label="Mensaje"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Enviar mensaje</button></form>
    </section>
  </div>
  ${(() => { const ls = leadsDeAlumna(u); return ls.length ? `<section class="card panel"><h3>Cómo llegó</h3><p class="muted" style="font-size:.86rem;margin:0">Sus registros en los formularios de la página, antes o después de crear su cuenta.</p><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Fecha</th><th>Formulario</th><th>Le interesaba</th><th>Origen</th></tr></thead><tbody>${ls.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)).map((l) => `<tr><td>${fdateMs(l.createdAt)}</td><td>${esc(LEAD_FORMS[l.form] || l.form)}</td><td>${esc(l.interest)}</td><td class="muted">${esc(leadOrigenTxt(l))}</td></tr>`).join('')}</tbody></table></div></section>` : ''; })()}
  <section class="card panel"><h3>Historial de pagos</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Fecha</th><th>Detalle</th><th>Monto</th><th>Estado</th></tr></thead><tbody>
    ${!pays ? '<tr><td colspan="4" class="muted">Cargando…</td></tr>' : pays.map((p) => `<tr><td>${fdate(p.paidAt) || fdate(p.createdAt)}</td><td>${esc(p.concept || 'Pago')}</td><td>${esc(p.amount ?? 0)} USD</td><td><span class="pill ${p.status === 'failed' ? 'bad' : 'done'}">${p.status === 'failed' ? 'Rechazado' : 'Pagado'}</span></td></tr>`).join('') || '<tr><td colspan="4" class="muted">Aún no tiene pagos registrados.</td></tr>'}
  </tbody></table></div></section>
  <section class="card panel"><div class="panel-h"><h3>Respuestas en las clases</h3><button class="link" data-ans-who="${u.id}">Ver en Respuestas de clase</button></div>
    ${answersHTML(A.answers && A.course ? A.answers.filter((a) => a.uid === u.id) : null, false)}</section>
  <section class="card panel" style="border-color:#e3b8ae"><h3>Eliminar alumna</h3><p class="muted" style="font-size:.86rem;margin:0">Para cuentas de prueba o repetidas. Borra su cuenta y todo lo que cuelga de ella (avance, preguntas, pagos registrados). No se puede deshacer. Si tiene suscripción en Stripe, cancélala allá aparte. Para solo cerrarle el acceso, usa Bloquear.</p><button class="btn btn-ghost btn-sm" style="justify-self:start;color:#b8402f" data-del-student="${u.id}">Eliminar a ${esc(nameOf(u).split(' ')[0])}</button></section>`;
};
// La formación tal como la ven las alumnas, toda abierta para la Maestra: niveles, módulos y clases
const lessonsOf = (lv) => lv.modules.flatMap((m) => m.lessons);
const filesOf = (lv) => lessonsOf(lv).reduce((a, l) => a + (l.files?.length || 0), 0);
V.formacion = () => {
  const head = `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Formación completa</h1><p>Todo el programa que ven tus alumnas, con cada nivel abierto para ti aunque ellas lo tengan bloqueado. Abre cualquier clase para verla tal cual. Mirar aquí no le abre nada a ninguna alumna.</p></div></div>`;
  if (!A.course) return `${head}<div class="card empty">Cargando el programa…</div>`;
  const C = A.course, q = S.fq.trim().toLowerCase();
  const has = (t) => String(t).toLowerCase().includes(q);
  const levels = C.map((lv) => {
    const mods = lv.modules.map((m, i) => ({ m, i, ls: m.lessons.map((l, j) => ({ l, j })).filter(({ l }) => !q || has(l.t) || has(m.title)) }))
      .filter((x) => x.ls.length);
    if (q && !mods.length) return '';
    const n = A.students.filter((u) => openOf(u).some((x) => x === lv.n || Math.floor(x / 10) === lv.n)).length;
    const open = !!q || !!S.lvOpen[lv.id];
    return `<article class="card panel fm-lv">
      <div class="fm-top"><div style="display:grid;gap:8px;min-width:0">
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span class="eyebrow">Nivel ${lv.n}</span><span class="pill ${n ? 'done' : 'lock'}">${n} ${n === 1 ? 'alumna lo tiene' : 'alumnas lo tienen'} abierto</span></div>
        <h3 style="font-size:1.35rem">${esc(lv.title)}</h3>
        <p class="muted" style="font-size:.9rem;max-width:60em">${esc(lv.desc)}</p>
        <span class="muted" style="font-size:.8rem">${esc(lv.dur)} · ${lv.modules.length} módulos · ${lessonsOf(lv).length} clases${filesOf(lv) ? ` · ${filesOf(lv)} materiales` : ''}</span></div>
        <div class="fm-acts"><button class="btn btn-primary btn-sm" data-cls="${lv.id},0,0">Abrir el nivel</button>${q ? '' : `<button class="btn btn-ghost btn-sm" data-lvopen="${lv.id}" aria-expanded="${open}">${open ? 'Ocultar módulos' : 'Ver módulos'}</button>`}</div></div>
      ${open ? `<div class="fm-mods">${mods.map(({ m, i, ls }) => `<details class="fm-mod" ${q || i === 0 ? 'open' : ''}><summary><b>${esc(m.title)}</b><small>${lv.n === 4 ? `${((c) => `${c} ${c === 1 ? 'alumna lo tiene' : 'alumnas lo tienen'} abierto · `)(A.students.filter((u) => openOf(u).includes(41 + i)).length)}` : ''}${m.lessons.length} ${m.lessons.length === 1 ? 'clase' : 'clases'}</small></summary>
        <ol class="fm-les">${ls.map(({ l, j }) => `<li><button data-cls="${lv.id},${i},${j}"><span class="fm-t">${esc(l.t)}</span><small>${esc(l.len || '')}${l.files?.length ? ` · ${l.files.length} ${l.files.length === 1 ? 'material' : 'materiales'}` : ''}</small><span class="link">Ver clase</span></button></li>`).join('')}</ol></details>`).join('')}</div>` : ''}
    </article>`;
  }).join('');
  return `${head}
  <div class="kpis"><div><b>${C.length}</b><span>niveles</span></div><div><b>${C.reduce((a, lv) => a + lv.modules.length, 0)}</b><span>módulos</span></div><div><b>${C.reduce((a, lv) => a + lessonsOf(lv).length, 0)}</b><span>clases</span></div><div><b>${C.reduce((a, lv) => a + filesOf(lv), 0)}</b><span>materiales para descargar</span></div></div>
  <div class="filters"><input type="text" id="fq" placeholder="Buscar una clase o un módulo" value="${esc(S.fq)}" style="flex:1;min-width:200px;border-radius:999px"></div>
  <section style="display:grid;gap:14px">${levels || '<div class="card empty">No hay clases con ese nombre.</div>'}</section>`;
};
// ---------- Respuestas de clase ----------
// Cada clase se guarda como nivel_módulo_clase; con el programa del aula se ordena por nivel, módulo y clase
const SEEN_KEY = 'cm-respuestas-vistas';
const seenAt = () => { try { return Number(localStorage.getItem(SEEN_KEY)) || 0; } catch { return 0; } };
const markSeen = () => { try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch { /* sin almacenamiento */ } };
let seen = seenAt();
const newAnswers = () => { const t = seenAt(); return (A.answers || []).filter((a) => a.updatedAt > t); };
const placeOf = (key) => {
  const m = String(key).match(/^(.+)_(\d+)_(\d+)$/);
  const lv = m && A.course?.find((l) => l.id === m[1]), mod = lv?.modules[+m[2]], les = mod?.lessons[+m[3]];
  return les ? { lv, mod, les, i: +m[2], j: +m[3] } : null;
};
const fdateMs = (ms) => (ms ? new Date(ms).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');
const answerFields = (a) => Object.values(a.fields).filter((f) => String(f.v || '').trim());
const answerBody = (a) => `<dl class="ans-list">${answerFields(a).map((f) => `<dt>${f.paso ? `<span class="muted">${esc(f.paso)} · </span>` : ''}${esc(f.q || 'Respuesta')}</dt><dd>${esc(f.v)}</dd>`).join('')}</dl>`;
// list: respuestas ya filtradas; byStudent: agrupa también por alumna dentro de cada clase (vista general) o no (ficha)
function answersHTML(list, byStudent = true) {
  if (!list) return '<p class="muted" style="margin:0">Cargando respuestas…</p>';
  if (!list.length) return '<p class="muted" style="margin:0">Todavía no hay respuestas escritas en las clases.</p>';
  const groups = new Map();
  list.forEach((a) => {
    const p = placeOf(a.key);
    const id = p ? `${p.lv.n}|${p.i}|${p.j}` : `9|${a.key}`;
    if (!groups.has(id)) groups.set(id, { p, key: a.key, items: [] });
    groups.get(id).items.push(a);
  });
  const order = (g) => (g.p ? [g.p.lv.n, g.p.i, g.p.j] : [99, 0, 0]);
  const sorted = [...groups.values()].sort((x, y) => { const a = order(x), b = order(y); return a[0] - b[0] || a[1] - b[1] || a[2] - b[2]; });
  let lastLv = null, lastMod = null;
  return sorted.map((g) => {
    let head = '';
    if (g.p && g.p.lv !== lastLv) { head += `<h3 class="ans-lv"><span class="eyebrow">Nivel ${g.p.lv.n}</span> ${esc(g.p.lv.title)}</h3>`; lastLv = g.p.lv; lastMod = null; }
    if (g.p && g.p.mod !== lastMod) { head += `<h4 class="ans-mod">${esc(g.p.mod.title)}</h4>`; lastMod = g.p.mod; }
    const title = g.p ? esc(g.p.les.t) : `Clase ${esc(g.key)}`;
    const items = g.items.map((a) => {
      const u = student(a.uid), isNewA = a.updatedAt > seen;
      return `<article class="ans-item">${byStudent ? `<div class="ans-who">${av(u)}<button class="link" style="font-size:.8rem;letter-spacing:.06em;text-transform:none;font-family:var(--f-body);color:var(--fg)" data-open="${esc(a.uid)}">${esc(nameOf(u))}</button>` : '<div class="ans-who">'}<span class="muted" style="font-size:.8rem">${fdateMs(a.updatedAt)}</span>${isNewA ? '<span class="pill pres">Nueva</span>' : ''}</div>${answerBody(a)}</article>`;
    }).join('');
    return `${head}<section class="ans-les"><div class="ans-les-h"><b>${title}</b>${g.p ? `<button class="link" data-cls="${g.p.lv.id},${g.p.i},${g.p.j}">Ver clase</button>` : ''}</div>${items}</section>`;
  }).join('');
}
V.respuestas = () => {
  const head = `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Respuestas de clase</h1><p>Lo que tus alumnas escriben dentro de las clases: reflexiones, ejercicios y fichas. Se guarda solo mientras escriben y aquí queda ordenado por nivel, módulo y clase.</p></div><button class="btn btn-ghost btn-sm" data-ans-reload>Actualizar</button></div>`;
  if (!A.answers || !A.course) return `${head}<div class="card empty">Cargando respuestas…</div>`;
  const who = S.ansWho, lvN = S.ansLv;
  const list = A.answers.filter((a) => (!who || a.uid === who) && (!lvN || placeOf(a.key)?.lv.n === lvN) && answerFields(a).length);
  const writers = [...new Set(A.answers.map((a) => a.uid))].map(student).filter(Boolean).sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
  const chip = (n, t) => `<button class="chip" data-ans-lv="${n}" aria-pressed="${lvN === n}">${t}</button>`;
  return `${head}
  <div class="filters"><select id="ans-who" aria-label="Alumna" style="border-radius:999px;min-width:200px"><option value="">Todas las alumnas (${writers.length})</option>${writers.map((u) => `<option value="${esc(u.id)}" ${who === u.id ? 'selected' : ''}>${esc(nameOf(u))}</option>`).join('')}</select>
    ${chip(0, 'Todos los niveles')}${A.course.map((l) => chip(l.n, `Nivel ${l.n}`)).join('')}</div>
  <section class="card panel">${answersHTML(list)}</section>`;
};
// Carga programa y respuestas (para Respuestas de clase y la ficha de cada alumna)
async function loadAnswers(force = false) {
  await Promise.all([data.course(), force || !A.answers ? data.answers() : null]);
}
// Una clase abierta dentro del portal: es el aula misma (/aula?embed=1), sin su menú, con la sesión de la Maestra
V.clase = () => {
  const [id, i, j] = S.cls || [];
  const lv = A.course?.find((l) => l.id === id), m = lv?.modules[i], l = m?.lessons[j];
  if (!l) return '<button class="link" style="justify-self:start" data-go="formacion">← Volver a la formación</button><div class="card empty">No encontramos esa clase.</div>';
  const src = `/aula?nivel=${encodeURIComponent(id)}&clase=${i}-${j}`;
  return `<button class="link" style="justify-self:start" data-go="formacion">← Volver a la formación</button>
  <div class="view-head"><div><span class="eyebrow">Nivel ${lv.n} · ${esc(lv.title)}</span><h1 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">${esc(m.title)}</h1><p>Así la ven tus alumnas. Desde el temario del nivel puedes recorrer todas sus clases.</p></div><a class="btn btn-ghost btn-sm" href="${src}" target="_blank" rel="noopener">Abrir en otra pestaña</a></div>
  <iframe class="aula-frame" src="${src}&embed=1" title="Clase: ${esc(l.t)}"></iframe>`;
};
const LEAD_FORMS = { pendulo: 'Péndulo Hebreo', 'clase-pendulo': 'Clase gratis Péndulo', tarot: 'Tarot Terapéutico', 'clase-tarot': 'Clase gratis Tarot', formacion: 'Formación', sala: 'Sala Abierta', terapias: 'Terapias', meditacion: 'Meditación', regalo: 'Portada · Sala Abierta', 'cuenta-gratis': 'Cuenta gratis del aula' };
const LEAD_STATES = [['nuevo', 'Nueva'], ['contactado', 'Contactada'], ['clase', 'Tomó la clase'], ['conversando', 'En conversación'], ['inscrita', 'Inscrita'], ['descartado', 'Descartada']];
// Embudo de las clases gratis (las mismas etapas y rangos que el servidor, src/lib/server/embudo.js). Se guardan en el campo status.
const ETAPAS_CLASE = [['registrada', 'Registrada'], ['confirmada', 'Confirmada'], ['entro', 'Entró'], ['asistio_confirmado', 'Asistió confirmado'], ['vio_oferta', 'Vio la oferta'], ['reservo_cupo', 'Reservó cupo'], ['matriculada', 'Matriculada'],
  ['no_asistio', 'No asistió'], ['no_identificada', 'No identificada'], ['vio_replay', 'Vio el replay'], ['sin_respuesta', 'Sin respuesta'], ['lista_espera', 'Lista de espera']];
const PASOS_CLASE = ETAPAS_CLASE.slice(0, 7).map(([k]) => k);
// La reserva por WhatsApp es solo del Péndulo: en el Tarot no existe la etapa «Reservó cupo»
const etapasOcultas = () => [...(FUNC.reserva ? [] : ['reservo_cupo']), ...(FUNC.listaEspera ? [] : ['lista_espera']), ...(FUNC.autodeclaracion ? [] : ['no_identificada'])];
const etapasClaseDe = (form) => ETAPAS_CLASE.filter(([k]) => !etapasOcultas().includes(k) && (form !== 'clase-tarot' || k !== 'reservo_cupo'));
// Quien ya estaba en una etapa oculta se ve en la etapa visible más cercana (el dato no se toca)
const etapaVisible = (k) => (k === 'reservo_cupo' && !FUNC.reserva ? 'vio_oferta' : k === 'lista_espera' && !FUNC.listaEspera ? 'registrada' : k === 'no_identificada' && !FUNC.autodeclaracion ? 'no_asistio' : k);
const ETAPA_NOMBRE = Object.fromEntries([...LEAD_STATES, ...ETAPAS_CLASE]);
// ALCANCE CONGELADO: funciones ocultas con bandera apagada (el código sigue aquí, no se borró). Para volver a mostrar una, ponla en true.
// El servidor tiene sus propias banderas para reserva y lista de espera (FUNCIONES en src/lib/server/embudo.js): deben coincidir.
const FUNC = { autodeclaracion: false, palabraAsistencia: false, fichaCompleta: false, etiquetas: false, tareas: false, metricas: false, deshacer: false, reserva: false, cuotas: false, listaEspera: false };
const RANGO_ETAPA = { descartado: -1, nuevo: 0, registrada: 0, lista_espera: 0, contactado: 1, confirmada: 1, sin_respuesta: 1, no_asistio: 1, no_identificada: 1, entro: 2, vio_replay: 2, clase: 3, asistio_confirmado: 3, conversando: 4, vio_oferta: 4, reservo_cupo: 4.5, inscrita: 5, matriculada: 5 };
// En una clase gratis, las etapas de antes se leen como las del embudo nuevo
const CLASE_ANTIGUA = { nuevo: 'registrada', contactado: 'confirmada', clase: 'asistio_confirmado', conversando: 'vio_oferta', inscrita: 'matriculada' };
// Vista "Todos los programas": las etapas del embudo de clases se agrupan en las columnas de siempre
const bucketEtapa = (k) => ({ registrada: 'nuevo', lista_espera: 'nuevo', no_asistio: 'nuevo', no_identificada: 'nuevo', sin_respuesta: 'nuevo', confirmada: 'contactado', entro: 'clase', vio_replay: 'clase', asistio_confirmado: 'clase', vio_oferta: 'conversando', reservo_cupo: 'conversando', matriculada: 'inscrita' })[k] || k;
const esNueva = (k) => k === 'nuevo' || k === 'registrada';
const esInscrita = (k) => k === 'inscrita' || k === 'matriculada';
// Programas para filtrar: las dos clases gratis, los dos cursos, la formación completa y el resto de formularios
const LEAD_PROGS = [['clase-pendulo', 'Clase gratis Péndulo', ['clase-pendulo']], ['clase-tarot', 'Clase gratis Tarot', ['clase-tarot']], ['pendulo', 'Curso Péndulo', ['pendulo']],
  ['tarot', 'Tarot Terapéutico', ['tarot']], ['formacion', 'Formación completa', ['formacion']], ['otros', 'Otros', ['sala', 'terapias', 'meditacion', 'regalo']]];
// Programas pagos (se pagan por fuera con Karen, salvo la Formación completa, que también se detecta por Stripe) y los que se pueden sumar a una persona
const PROG_PAGOS = [['pendulo', 'Curso Péndulo'], ['tarot', 'Curso Tarot'], ['formacion', 'Formación completa']];
const PROG_AGREGAR = [['clase-pendulo', 'Clase gratis Péndulo'], ['clase-tarot', 'Clase gratis Tarot'], ...PROG_PAGOS];
const PROG_CORTO = { 'clase-pendulo': 'Clase Péndulo', 'clase-tarot': 'Clase Tarot', pendulo: 'Curso Péndulo', tarot: 'Curso Tarot', formacion: 'Formación', sala: 'Sala', terapias: 'Terapias', meditacion: 'Meditación', regalo: 'Portada', 'cuenta-gratis': 'Cuenta gratis' };
const esClase = (f) => f === 'clase-pendulo' || f === 'clase-tarot';
const esPago = (f) => ['pendulo', 'tarot', 'formacion'].includes(f);
// En un curso pago la primera etapa es "Interesada"; en una clase gratis, "Inscrita" quiere decir inscrita a un curso
const etapaTxt = (form, k) => (k === 'nuevo' && esPago(form) ? 'Interesada' : ETAPA_NOMBRE[k] || k);
// Mismo criterio que src/lib/server/whatsapp.js: solo dígitos con código de país (un celular chileno de 9 dígitos que empieza en 9 se toma como +56)
const waNum = (n) => { let d = String(n || '').replace(/\D/g, '').replace(/^00/, ''); if (d.length === 9 && d[0] === '9') d = `56${d}`; return d.length >= 8 && d.length <= 15 ? d : ''; };
const waLink = (n) => { const d = String(n || '').replace(/\D/g, ''); return d ? `https://wa.me/${d}` : ''; };
const leadOrigen = (l) => l.utm?.utm_source || 'directo';
const leadOrigenTxt = (l) => [l.utm?.utm_source && l.utm?.utm_medium ? `${l.utm.utm_source} / ${l.utm.utm_medium}` : l.utm?.utm_source, l.utm?.utm_campaign, l.utm?.utm_content].filter(Boolean).join(' · ') || (l.origen ? `Cuenta del aula (${l.origen})` : 'Directo');
// Vínculos: una interesada y una alumna son la misma persona si comparten correo o WhatsApp
const llavesDe = (x) => [String(x.email || '').trim().toLowerCase(), ...(x.emailsExtra || []).map((e) => String(e).trim().toLowerCase()), waNum(x.whatsapp || x.phone)].filter(Boolean);
const vinculos = () => {
  const sig = `${A.leads?.length ?? -1}|${A.students.length}`;
  if (A._vin?.sig === sig) return A._vin; // se recalcula si cambió la cantidad de interesadas o de alumnas
  const alumna = new Map(), porLlave = new Map();
  A.students.forEach((u) => llavesDe(u).forEach((k) => { if (!alumna.has(k)) alumna.set(k, u); }));
  (A.leads || []).forEach((l) => llavesDe(l).forEach((k) => { if (!porLlave.has(k)) porLlave.set(k, []); porLlave.get(k).push(l); }));
  return (A._vin = { sig, alumna, porLlave });
};
const alumnaDe = (l) => { const v = vinculos(); for (const k of llavesDe(l)) if (v.alumna.has(k)) return v.alumna.get(k); return null; };
const leadsDeAlumna = (u) => { const v = vinculos(), vistos = new Set(), out = []; for (const k of llavesDe(u)) for (const x of v.porLlave.get(k) || []) if (!vistos.has(x.id)) { vistos.add(x.id); out.push(x); } return out; };
const pagoOAbierto = (u) => paying(u) || ownedOf(u).length > 0;
// Etapa de un registro. Solo si nadie la movió ("Nueva") y la persona ya paga o compró algo, figura como Inscrita; si Karen la movió a mano, se respeta.
const leadEtapa = (l) => {
  let e = ETAPA_NOMBRE[l.status] ? l.status : 'nuevo';
  if (esClase(l.form) && CLASE_ANTIGUA[e]) e = CLASE_ANTIGUA[e];
  if (esNueva(e)) { const u = alumnaDe(l); if (u && pagoOAbierto(u)) return esClase(l.form) ? 'matriculada' : 'inscrita'; }
  return e;
};

// ---------- Personas: una tarjeta por persona, con un recorrido por cada programa ----------
// Los registros (un formulario cada uno) de la misma persona (mismo correo o WhatsApp, directo o encadenado) se agrupan en una sola.
// Cada registro es su recorrido en ese programa: tiene su propia etapa.
const personas = () => {
  const sig = `${A.leads?.length ?? -1}|${A.students.length}`;
  if (A._per?.sig === sig) return A._per.lista;
  const leads = [...(A.leads || [])].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const padre = new Map(), duenio = new Map();
  const raiz = (x) => { while (padre.get(x) !== x) { padre.set(x, padre.get(padre.get(x))); x = padre.get(x); } return x; };
  leads.forEach((l) => padre.set(l.id, l.id));
  leads.forEach((l) => llavesDe(l).forEach((k) => { const o = duenio.get(k); if (o) padre.set(raiz(l.id), raiz(o)); else duenio.set(k, l.id); }));
  const grupos = new Map();
  leads.forEach((l) => { const r = raiz(l.id); if (!grupos.has(r)) grupos.set(r, []); grupos.get(r).push(l); });
  const lista = [...grupos.values()].map((ls) => {
    const ultimo = ls[ls.length - 1], rev = [...ls].reverse();
    const porAct = [...ls].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0) || (b.createdAt || 0) - (a.createdAt || 0));
    return {
      id: ls[0].id, leads: ls, nombre: ultimo.name, email: rev.find((x) => x.email)?.email || '', whatsapp: rev.find((x) => x.whatsapp)?.whatsapp || '', country: rev.find((x) => x.country)?.country || '',
      tags: [...new Set(ls.flatMap((x) => x.tags || []))], alumna: ls.map(alumnaDe).find(Boolean) || null, note: porAct.find((x) => x.note)?.note || '', followUp: porAct.find((x) => x.followUp)?.followUp || '',
    };
  });
  A._per = { sig, lista };
  return lista;
};
const personaDe = (leadId) => personas().find((p) => p.leads.some((l) => l.id === leadId));
const progDe = (k) => LEAD_PROGS.find((x) => x[0] === k);
const tracksEn = (p, prog) => p.leads.filter((l) => prog[2].includes(l.form));
const formacionPagada = (p) => !!p.alumna && paying(p.alumna);
const tieneProg = (p, prog) => tracksEn(p, prog).length > 0 || (prog[0] === 'formacion' && formacionPagada(p));
const mejorDe = (es) => { const v = es.filter((k) => k !== 'descartado'); return v.length ? v.reduce((a, b) => ((RANGO_ETAPA[b] ?? 0) > (RANGO_ETAPA[a] ?? 0) ? b : a)) : 'descartado'; };
const etapaDe = (p) => mejorDe(p.leads.map(leadEtapa));
// Etapa en un programa; quien ya paga la Formación completa figura Inscrita aunque no tenga registro en ese formulario
const etapaEn = (p, prog) => (prog[0] === 'formacion' && formacionPagada(p) ? 'inscrita' : mejorDe(tracksEn(p, prog).map(leadEtapa)));
const etapaVista = (p) => { const prog = progDe(S.crmProg); if (!prog) return bucketEtapa(etapaDe(p)); const e = etapaEn(p, prog); return esClase(prog[0]) ? etapaVisible(e) : bucketEtapa(e); };
const ultimaActividad = (p) => Math.max(...p.leads.map((l) => l.createdAt || 0));
const seguimientoHoyP = (p) => FUNC.tareas && !!p.followUp && p.followUp <= ymd(hoyCL()) && !esInscrita(etapaDe(p)) && etapaDe(p) !== 'descartado';
// Repetidas: la misma persona (correo o WhatsApp) en el mismo formulario con menos de 24 horas entre un envío y otro (doble envío por accidente).
// De cada grupo se conserva la que está más avanzada en el embudo (o tiene nota) y, si empatan, la primera.
// Descartada va al final: si una de dos fue descartada a mano para esconder la repetida, se queda la otra.
const RANGO = { descartado: 0, nuevo: 1, contactado: 2, clase: 3, conversando: 4, inscrita: 5 };
const repetidasPorLimpiar = () => {
  const porForm = new Map();
  [...(A.leads || [])].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)).forEach((l) => { if (!porForm.has(l.form)) porForm.set(l.form, []); porForm.get(l.form).push(l); });
  const borrar = [];
  for (const lista of porForm.values()) {
    const grupos = [];
    for (const l of lista) {
      const llaves = llavesDe(l);
      const g = grupos.find((x) => (l.createdAt || 0) - x.ultimo < 864e5 && x.llaves.some((k) => llaves.includes(k)));
      if (g) { g.items.push(l); g.llaves.push(...llaves); g.ultimo = l.createdAt || 0; } else grupos.push({ items: [l], llaves: [...llaves], ultimo: l.createdAt || 0 });
    }
    for (const g of grupos) {
      if (g.items.length < 2) continue;
      const mejor = [...g.items].sort((a, b) => (RANGO[b.status] ?? 0) - (RANGO[a.status] ?? 0) || (b.note ? 1 : 0) - (a.note ? 1 : 0) || (a.createdAt || 0) - (b.createdAt || 0))[0];
      g.items.forEach((x) => { if (x !== mejor) borrar.push(x); });
    }
  }
  return borrar;
};
const personasFiltradas = () => {
  const q = (S.crmQ || '').toLowerCase().trim(), prog = progDe(S.crmProg);
  return personas().filter((p) => (!prog || tieneProg(p, prog))
    && (!S.crmOrigen || p.leads.some((l) => leadOrigen(l) === S.crmOrigen))
    && (!S.crmSeg || seguimientoHoyP(p))
    && (!S.crmSinCuenta || !p.alumna)
    && (!S.crmTag || p.tags.includes(S.crmTag))
    && (!S.crmEtapa || etapaVista(p) === S.crmEtapa)
    && (!q || [p.nombre, p.email, p.whatsapp, p.note, ...p.leads.map((l) => `${l.interest} ${l.message}`)].join(' ').toLowerCase().includes(q)))
    .sort((a, b) => ultimaActividad(b) - ultimaActividad(a));
};
const contactoDe = (p) => { const wa = waLink(p.whatsapp); return `${wa ? `<a href="${wa}" data-wa-open="${esc(waNum(p.whatsapp))}" data-wa-name="${esc(p.nombre)}" title="Escribirle desde el portal">${esc(p.whatsapp)}</a>` : ''}${p.whatsapp && p.email ? ' · ' : ''}${esc(p.email)}${p.country ? ` · ${esc(p.country)}` : ''}`; };
// Cuenta en el aula: "Sin cuenta" avisa a quién falta pedirle que la cree (en rojo si ya está inscrita)
const cuentaBadge = (p) => {
  if (p.alumna) return `<span class="pill ${pagoOAbierto(p.alumna) ? 'done' : 'pres'}" title="Ya tiene cuenta en el aula">${pagoOAbierto(p.alumna) ? 'Alumna' : 'Con cuenta'}</span>`;
  const urgente = esInscrita(etapaDe(p));
  return `<span class="pill ${urgente ? 'bad' : 'lock'}" title="${urgente ? 'Está inscrita y aún no creó su cuenta en el aula' : 'Aún no tiene cuenta en el aula'}">Sin cuenta</span>`;
};
// Tres niveles de asistencia, con etiquetas distintas que no se mezclan: Entró (clic en el enlace), Autodeclarada (lo dijo ella) y Asistió confirmado (código o informe de Meet)
// La asistencia se guarda POR CLASE (asistencia.sesiones). Aquí se lee solo la de la clase a la que la persona está inscrita ahora (claseEvento / claseFecha).
// Lo guardado antes de este cambio (campos sueltos) cuenta para la clase que tenía; si ya tiene otra clase y no se sabe de cuál era, no cuenta.
const asistenciaActual = (l) => {
  const a = l.asistencia || {}, ev = l.claseEvento || '', fe = l.claseFecha || '';
  if (a.sesiones) { const r = Object.values(a.sesiones).find((x) => (ev && x.evento === ev) || (fe && x.fecha === fe)); return r || (!ev && !fe ? a : {}); }
  return a.evento && ev && a.evento !== ev ? {} : a;
};
const asistBadges = (l) => { const a = asistenciaActual(l); return [
  a.confirmada ? '<span class="pill done" title="Escribió el código de asistencia o aparece en el informe de Meet">Asistió confirmado</span>' : '',
  a.entro ? '<span class="pill pres" title="Hizo clic en el enlace de entrada durante la clase">Entró</span>' : '',
  FUNC.autodeclaracion && a.autodeclarada ? `<span class="pill lock" title="Lo dijo ella en el mensaje; no está verificado">Autodeclarada: ${a.autodeclarada === 'si' ? 'sí' : 'no'}</span>` : ''].filter(Boolean).join(' '); };
const asistPersona = (p) => p.leads.filter((l) => esClase(l.form)).map(asistBadges).filter(Boolean).join(' ');
const segBadge = (p) => (FUNC.tareas && p.followUp ? `<span class="pill ${seguimientoHoyP(p) ? 'bad' : 'lock'}" title="Próximo seguimiento">${seguimientoHoyP(p) ? 'Seguimiento hoy' : `Seguir ${fechaLarga(p.followUp)}`}</span>` : '');
const progPills = (p) => `${p.leads.map((l) => `<span class="pill lock" title="${esc(LEAD_FORMS[l.form] || l.form)}">${esc(PROG_CORTO[l.form] || l.form)} · ${esc(etapaTxt(l.form, leadEtapa(l)))}</span>`).join(' ')}${formacionPagada(p) && !p.leads.some((l) => l.form === 'formacion') ? ' <span class="pill done">Formación · Inscrita</span>' : ''}`;

// Resumen por origen de campaña, por programa y por motivo de descarte (se calcula con las personas, desde su primer registro)
const metricasHTML = () => {
  const dias = Number(S.crmRango) || 0, desde = dias ? Date.now() - dias * 864e5 : 0;
  const ps = personas().filter((p) => (p.leads[0].createdAt || 0) >= desde);
  const por = S.crmMetrica || 'origen';
  const clave = { origen: (l) => l.utm?.utm_source || 'directo', campania: (l) => l.utm?.utm_campaign || '(sin campaña)', anuncio: (l) => l.utm?.utm_content || '(sin anuncio)' }[por];
  const R = { nuevo: 0, contactado: 1, clase: 2, conversando: 3, inscrita: 4 };
  const alcanzo = (p, n) => { const e = bucketEtapa(etapaDe(p)); return e !== 'descartado' && R[e] >= n; };
  const grupos = new Map();
  ps.forEach((p) => { const k = clave(p.leads[0]); const g = grupos.get(k) || { k, n: 0, c: 0, a: 0, v: 0, i: 0 }; g.n++; if (alcanzo(p, 1)) g.c++; if (alcanzo(p, 2)) g.a++; if (alcanzo(p, 3)) g.v++; if (alcanzo(p, 4)) g.i++; grupos.set(k, g); });
  const filas = [...grupos.values()].sort((a, b) => b.n - a.n);
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '—');
  const tot = filas.reduce((t, g) => ({ n: t.n + g.n, c: t.c + g.c, a: t.a + g.a, v: t.v + g.v, i: t.i + g.i }), { n: 0, c: 0, a: 0, v: 0, i: 0 });
  const celda = (n, base) => `<td>${n} <span class="muted" style="font-size:.78rem">${pct(n, base)}</span></td>`;
  const motivos = new Map();
  ps.forEach((p) => p.leads.forEach((l) => { if (l.status === 'descartado') { const m = l.motivo || '(sin motivo)'; motivos.set(m, (motivos.get(m) || 0) + 1); } }));
  const chip = (attr, v, t, on) => `<button class="chip" ${attr}="${esc(v)}" aria-pressed="${on}">${t}</button>`;
  const porProg = LEAD_PROGS.map(([k, t, fs]) => { const prog = [k, t, fs], mias = ps.filter((p) => tieneProg(p, prog)); const cuenta = (e) => mias.filter((p) => bucketEtapa(etapaEn(p, prog)) === e).length; return `<tr><td><b>${esc(t)}</b></td><td>${mias.length}</td>${LEAD_STATES.map(([e]) => `<td>${cuenta(e)}</td>`).join('')}</tr>`; }).join('');
  return `<div class="filters">${chip('data-crm-metrica', 'origen', 'Por origen', por === 'origen')}${chip('data-crm-metrica', 'campania', 'Por campaña', por === 'campania')}${chip('data-crm-metrica', 'anuncio', 'Por anuncio', por === 'anuncio')}
    <select id="crm-rango" aria-label="Periodo" style="border-radius:999px"><option value="">Todo el tiempo</option><option value="30" ${S.crmRango === '30' ? 'selected' : ''}>Últimos 30 días</option><option value="7" ${S.crmRango === '7' ? 'selected' : ''}>Últimos 7 días</option></select></div>
  <section class="card panel"><h3>De dónde llegan y hasta dónde avanzan</h3><p class="muted" style="font-size:.84rem;margin:0">Cuenta personas según su primer registro y la etapa más avanzada que alcanzaron. Las descartadas solo cuentan como registradas.</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${por === 'origen' ? 'Origen' : por === 'campania' ? 'Campaña' : 'Anuncio'}</th><th>Registradas</th><th>Contactadas</th><th>Tomaron la clase</th><th>En conversación</th><th>Inscritas</th></tr></thead><tbody>
    ${filas.map((g) => `<tr><td><b>${esc(g.k)}</b></td><td>${g.n}</td>${celda(g.c, g.n)}${celda(g.a, g.n)}${celda(g.v, g.n)}${celda(g.i, g.n)}</tr>`).join('') || '<tr><td colspan="6" class="muted">Todavía no hay datos en este periodo.</td></tr>'}
    ${filas.length > 1 ? `<tr><td><b>Total</b></td><td><b>${tot.n}</b></td>${celda(tot.c, tot.n)}${celda(tot.a, tot.n)}${celda(tot.v, tot.n)}${celda(tot.i, tot.n)}</tr>` : ''}</tbody></table></div></section>
  <section class="card panel"><h3>Por programa</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Programa</th><th>Personas</th>${LEAD_STATES.map(([e, t]) => `<th>${esc(t)}</th>`).join('')}</tr></thead><tbody>${porProg}</tbody></table></div></section>
  ${matriculasHTML()}
  <section class="card panel"><h3>Por qué se descartan</h3>${motivos.size ? `<div class="tbl-wrap"><table class="tbl"><tbody>${[...motivos.entries()].sort((a, b) => b[1] - a[1]).map(([m, n]) => `<tr><td>${esc(m)}</td><td style="text-align:right"><b>${n}</b></td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Todavía no hay descartadas. Al descartar a alguien, el portal te pregunta el motivo.</p>'}</section>`;
};

// Exporta a Excel (CSV) las personas que se ven con los filtros actuales. Sirve también como respaldo.
function exportarCsv() {
  const lista = personasFiltradas();
  const cab = ['Nombre', 'Correo', 'WhatsApp', 'País', 'Programas y etapa', 'Etapa más avanzada', 'Origen', 'Campaña', 'Cuenta en el aula', 'Etiquetas', 'Seguimiento', 'Última nota', 'Primer registro'];
  const fila = (p) => [p.nombre, p.email, p.whatsapp, p.country, p.leads.map((l) => `${PROG_CORTO[l.form] || l.form}: ${etapaTxt(l.form, leadEtapa(l))}`).join(' | '), etapaTxt('', etapaDe(p)),
    p.leads[0].utm?.utm_source || 'directo', p.leads[0].utm?.utm_campaign || '', p.alumna ? 'Sí' : 'No', p.tags.join(' | '), p.followUp, p.note, ymd(p.leads[0].createdAt || Date.now())];
  // Una celda que empieza como fórmula (=, @, o + / - seguido de otra cosa que un número) se neutraliza para que Excel no la ejecute
  const celda = (v) => { let t = String(v ?? ''); if (/^[=@]|^[+\-](?![\d\s])/.test(t)) t = `'${t}`; return `"${t.replace(/"/g, '""')}"`; };
  const csv = `﻿${[cab, ...lista.map(fila)].map((r) => r.map(celda).join(',')).join('\r\n')}`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `interesadas-${ymd(Date.now())}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  toast(`Exportadas ${lista.length} personas.`);
}

V.interesadas = () => {
  const head = `<div class="crm-head"><div><span class="eyebrow">CRM</span><h1>Interesadas</h1></div><div class="crm-acciones"><button class="btn btn-primary btn-sm" data-go="envios">Envíos</button>
    <details class="menu"><summary class="btn btn-ghost btn-sm">Herramientas ▾</summary><div class="menu-lista">
      <button type="button" data-crm-preparar title="Crea el código personal y los enlaces de cada contacto">Preparar contactos</button><button type="button" data-crm-clasificar>Clasificar una clase</button><button type="button" data-crm-csv>Exportar a Excel</button>
      ${A.leads && repetidasPorLimpiar().length ? `<button type="button" data-leads-dedup>Limpiar repetidas (${repetidasPorLimpiar().length})</button>` : ''}<button type="button" data-leads-reload>Actualizar la lista</button></div></details></div></div>`;
  if (!A.leads) return `${head}<div class="card empty">Cargando interesadas…</div>`;
  const sinLink = [['enlacePendulo', 'Péndulo'], ['enlaceTarot', 'Tarot'], ['enlaceTerapias', 'terapias online']].filter(([k]) => !A.clases?.[k]).map(([, n]) => n);
  const aviso = sinLink.length ? `<div class="card" style="padding:12px 14px;font-size:.88rem;border-left:4px solid #b8402f"><b>Falta el enlace de Google Meet de ${sinLink.join(', ')}.</b> Sin él, el enlace personal de la clase no tiene a dónde llevar. Cárgalo en <button class="link" data-go="clases">Clases y ofertas</button> (Péndulo y Tarot) o en <button class="link" data-go="ajustes">Ajustes del aula</button> (terapias).</div>` : '';
  const prog = progDe(S.crmProg), lista = personasFiltradas(), vista = S.crmVista === 'metricas' && !FUNC.metricas ? 'embudo' : S.crmVista || 'embudo', todas = personas();
  const chip = (attr, v, t, on) => `<button class="chip" ${attr}="${esc(v)}" aria-pressed="${on}">${t}</button>`;
  const seg = (attr, items, actual) => `<div class="seg" role="group">${items.map(([v, t]) => `<button type="button" ${attr}="${v}" aria-pressed="${actual === v}">${t}</button>`).join('')}</div>`;
  const vistas = seg('data-crm-vista', [['embudo', 'Embudo'], ['tabla', 'Tabla'], ...(FUNC.metricas ? [['metricas', 'Métricas']] : [])], vista);
  if (S.crmLista) return `${head}${aviso}${ofertaBanner()}${listaMatricula()}`;
  if (vista === 'metricas') return `${head}${aviso}<div class="crm-bar">${vistas}</div>${metricasHTML()}`;
  const origenes = [...new Set(A.leads.map(leadOrigen))].sort(), tags = [...new Set(todas.flatMap((p) => p.tags))].sort();
  const base = prog ? todas.filter((p) => tieneProg(p, prog)) : todas;
  const primera = prog && esClase(prog[0]) ? 'registrada' : 'nuevo';
  const nSeg = base.filter(seguimientoHoyP).length, nSin = base.filter((p) => !p.alumna).length, nNuevas = base.filter((p) => etapaVista(p) === primera).length;
  const etapasProg = prog && esClase(prog[0]) ? [...etapasClaseDe(prog[0]), ['descartado', 'Descartada']] : LEAD_STATES.filter(([k]) => !(prog && esPago(prog[0]) && k === 'clase'));
  const hayFiltro = !!(S.crmQ || S.crmOrigen || S.crmEtapa || S.crmTag || S.crmSeg || S.crmSinCuenta);
  const kpi = (k, n, t, on) => `<button type="button" class="crm-kpi" data-crm-kpi="${k}" aria-pressed="${on}"><b>${n}</b><span>${t}</span></button>`;
  const kpis = `<div class="crm-kpis">${kpi('todos', base.length, prog ? 'en este programa' : 'personas', !hayFiltro)}${kpi('nuevas', nNuevas, 'por contactar', S.crmEtapa === primera)}${FUNC.tareas ? kpi('seg', nSeg, 'seguimientos hoy', !!S.crmSeg) : ''}${kpi('sin', nSin, 'sin cuenta en el aula', !!S.crmSinCuenta)}${kpi('clic', filasClic().length, 'clic sin pagar', S.crmLista === 'clic')}</div>`;
  const barra = `<div class="crm-bar">${vistas}
    <input type="text" id="crm-q" placeholder="Buscar por nombre, correo, WhatsApp o nota" value="${esc(S.crmQ || '')}" aria-label="Buscar">
    <select id="crm-origen" aria-label="Origen"><option value="">Origen: todos</option>${origenes.map((o) => `<option value="${esc(o)}" ${S.crmOrigen === o ? 'selected' : ''}>${esc(o === 'directo' ? 'Directo' : o)}</option>`).join('')}</select>
    <select id="crm-etapa" aria-label="Etapa"><option value="">Etapa: todas</option>${etapasProg.map(([k]) => `<option value="${k}" ${S.crmEtapa === k ? 'selected' : ''}>${esc(etapaTxt(prog?.[0], k))}</option>`).join('')}</select>
    ${FUNC.etiquetas && tags.length ? `<select id="crm-tag" aria-label="Etiqueta"><option value="">Etiqueta: todas</option>${tags.map((t) => `<option ${S.crmTag === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>` : ''}
    ${hayFiltro ? '<button type="button" class="link" data-crm-kpi="todos">Quitar filtros</button>' : ''}</div>`;
  const tabs = `<nav class="crm-tabs" aria-label="Programas">${[['', 'Todos', todas.length], ...LEAD_PROGS.map(([k, t, fs]) => [k, t, todas.filter((p) => tieneProg(p, [k, t, fs])).length])].map(([k, t, n]) => `<button type="button" data-crm-prog="${esc(k)}" aria-pressed="${(S.crmProg || '') === k}">${esc(t)}<span class="n">${n}</span></button>`).join('')}</nav>`;
  const controles = `${ofertaBanner()}${cuposHTML() ? `<div class="cupos">${cuposHTML()}</div>` : ''}${kpis}${barra}${tabs}`;
  const tagsPills = (p) => !FUNC.etiquetas ? '' : p.tags.map((t) => `<span class="pill pres">${esc(t)}</span>`).join(' ');

  if (vista === 'tabla') {
    const sel = S.leadSel, n = sel.size;
    const barra = n ? `<div class="filters" style="padding:0 4px 12px"><b>${n} persona${n === 1 ? '' : 's'} seleccionada${n === 1 ? '' : 's'}</b>
      ${prog ? `<select id="bulk-etapa" aria-label="Mover a" style="border-radius:999px"><option value="">Mover a…</option>${etapasProg.map(([k]) => `<option value="${k}">${esc(etapaTxt(prog[0], k))}</option>`).join('')}</select>` : ''}
      ${FUNC.etiquetas ? `<input id="bulk-tag" list="tags-lista" placeholder="Etiqueta" maxlength="30" style="border-radius:999px;max-width:160px"><datalist id="tags-lista">${tags.map((t) => `<option value="${esc(t)}">`).join('')}</datalist><button class="btn btn-ghost btn-sm" data-bulk-tag>Etiquetar</button>` : ''}
      <button class="btn btn-ghost btn-sm" style="color:#b8402f" data-leads-del>Eliminar seleccionadas</button><button class="link" data-leads-clear>Quitar selección</button></div>` : '';
    return `${head}${aviso}${controles}
    <section class="card panel">${barra}<div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:32px"><input type="checkbox" data-lead-all aria-label="Seleccionar todas" ${lista.length && lista.every((p) => sel.has(p.id)) ? 'checked' : ''}></th><th>Persona</th><th>Programas</th><th>Origen</th><th>Registro</th><th>Cuenta y seguimiento</th><th>Etapa${prog ? ` en ${esc(prog[1])}` : ''}</th></tr></thead><tbody>
    ${lista.map((p) => { const trk = prog ? tracksEn(p, prog)[0] : null; return `<tr>
      <td><input type="checkbox" data-lead-sel="${esc(p.id)}" aria-label="Seleccionar a ${esc(p.nombre)}" ${sel.has(p.id) ? 'checked' : ''}></td>
      <td class="persona"><button class="link nom" data-lead-open="${esc(p.id)}">${esc(p.nombre)}</button><br><span class="muted" style="font-size:.84rem">${contactoDe(p)}</span>${p.note ? `<br><span class="muted" style="font-size:.84rem">📝 ${esc(p.note.slice(0, 80))}${p.note.length > 80 ? '…' : ''}</span>` : ''}</td>
      <td style="white-space:normal">${progPills(p)} ${tagsPills(p)}</td>
      <td class="muted" style="font-size:.84rem">${esc(leadOrigenTxt(p.leads[0]))}</td>
      <td class="muted" style="font-size:.84rem">${fdateMs(p.leads[0].createdAt)}</td>
      <td>${cuentaBadge(p)} ${segBadge(p)}</td>
      <td>${trk ? `<select data-lead-status="${esc(trk.id)}" aria-label="Etapa">${etapasProg.map(([k]) => `<option value="${k}" ${(esClase(trk.form) ? etapaVisible(leadEtapa(trk)) : leadEtapa(trk)) === k ? 'selected' : ''}>${esc(etapaTxt(prog[0], k))}</option>`).join('')}</select>` : `<span class="pill lock">${esc(etapaTxt(prog?.[0], etapaVista(p)))}</span>`}</td></tr>`; }).join('') || '<tr><td colspan="7" class="muted">No hay personas con estos filtros.</td></tr>'}
    </tbody></table></div></section>`;
  }

  // Embudo: una columna por etapa; con un programa elegido se arrastran las tarjetas entre columnas
  const verDesc = !!S.crmDesc, etapas = etapasProg.filter(([k]) => verDesc || k !== 'descartado');
  const tarjeta = (p) => {
    const trk = prog ? tracksEn(p, prog)[0] : null;
    const linea = trk ? `${esc(PROG_CORTO[trk.form] || trk.form)} · ${fdateMs(trk.createdAt).split(',')[0]}${trk.claseFecha ? ` · clase ${esc(fechaLarga(trk.claseFecha))}` : ''}` : '';
    const otras = prog ? p.leads.filter((l) => !prog[2].includes(l.form)).map((l) => `<span class="pill lock">${esc(PROG_CORTO[l.form] || l.form)}</span>`).join(' ') : '';
    return `<article class="kb-card" ${trk ? `draggable="true" data-lead-card="${esc(trk.id)}"` : ''} data-lead-open="${esc(p.id)}">
      <div class="kb-top"><span class="av sm" style="--c:${colorFor(p.id)}">${esc(initials(p.nombre))}</span><div class="kb-id"><b>${esc(p.nombre)}</b>${prog ? `<span class="muted">${linea || 'Formación completa · pagó en la plataforma'}</span>` : ''}</div></div>${prog ? '' : `<span style="display:flex;gap:4px;flex-wrap:wrap">${progPills(p)}</span>`}
      ${trk?.interest ? `<small>${esc(trk.interest)}</small>` : ''}${p.note ? `<small class="muted">📝 ${esc(p.note.slice(0, 70))}${p.note.length > 70 ? '…' : ''}</small>` : ''}
      <div class="kb-meta">${cuentaBadge(p)}${asistPersona(p)}${pagoPersona(p)}${segBadge(p)}${tagsPills(p)}${otras}${p.whatsapp ? `<a class="btn btn-ghost btn-sm" href="${waLink(p.whatsapp)}" data-wa-open="${esc(waNum(p.whatsapp))}" data-wa-name="${esc(p.nombre)}">WhatsApp</a>` : ''}</div></article>`;
  };
  return `${head}${aviso}${controles}
  <div class="crm-hint"><span>${prog ? 'Arrastra una tarjeta para cambiar su etapa. Toca una tarjeta para abrir su ficha.' : 'Cada persona aparece en su etapa más avanzada. Elige un programa para mover tarjetas.'}</span><button type="button" class="chip" data-crm-desc aria-pressed="${verDesc}">Mostrar descartadas (${lista.filter((p) => etapaVista(p) === 'descartado').length})</button></div>
  <div class="kb">${etapas.map(([k]) => { const col = lista.filter((p) => etapaVista(p) === k); return `<section class="kb-col" data-kb-col="${k}"><h4>${esc(etapaTxt(prog?.[0], k))} <span class="count">${col.length}</span></h4>${col.map(tarjeta).join('') || '<p class="muted" style="font-size:.82rem;margin:0">Nadie aquí.</p>'}</section>`; }).join('')}</div>`;
};

// A qué programa pago pasa una persona de la clase gratis: se agrega a ese programa en su ficha (sin duplicarla).
// Devuelve { forms, etapa } ([] en forms si solo se marca), o null si se cancela.
// opciones.etapa: pregunta también si "está en conversación" o "ya se inscribió"; sin eso, queda Inscrita.
function pedirProgramasPago(p, opciones = {}) {
  return new Promise((resolve) => {
    const ya = new Set(p.leads.filter((x) => esPago(x.form)).map((x) => x.form));
    let listo = false;
    const alCerrar = () => fin(null);
    const fin = (v) => { if (listo) return; listo = true; $('#dlg').removeEventListener('close', alCerrar); resolve(v); };
    dialog(`<span class="eyebrow">${opciones.etapa ? 'Pasar a un curso' : 'Inscrita'}</span><h3>${esc(p.nombre)}</h3>
    <p class="muted" style="font-size:.88rem;margin:6px 0 12px">${opciones.etapa ? '¿A qué programa pasa? Entra a su pipeline como «Interesada» y desde ahí tú la mueves.' : '¿A qué programa pago se inscribió? Se agrega a ese programa como inscrita.'} Es la misma persona, no se duplica. Si son varios, marca todos.</p>
    <form id="pp-form" style="display:grid;gap:10px">${PROG_PAGOS.map(([k, t]) => `<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="pp" value="${k}" ${opciones.etapa && ya.has(k) ? 'disabled' : ''}> ${esc(t)}${ya.has(k) ? ' <span class="muted">(ya está en este programa)</span>' : ''}</label>`).join('')}
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm">Confirmar</button>${opciones.etapa ? '' : '<button type="button" class="btn btn-ghost btn-sm" id="pp-skip">Marcar sin elegir programa</button>'}<button type="button" class="btn btn-ghost btn-sm" id="pp-no">Cancelar</button></div></form>`);
    $('#dlg').addEventListener('close', alCerrar);
    $('#pp-form').onsubmit = (e) => {
      e.preventDefault();
      const v = [...document.querySelectorAll('#pp-form input[name=pp]:checked')].map((x) => x.value).filter(Boolean);
      if (!v.length) return toast(opciones.etapa ? 'Elige a qué programa pasa.' : 'Elige un programa, o usa «Marcar sin elegir programa».');
      const et = opciones.etapa ? 'nuevo' : 'inscrita'; // al pasar a un curso entra como Interesada; al marcarla inscrita, como Inscrita
      fin({ forms: v, etapa: et }); $('#dlg').close();
    };
    const skip = $('#pp-skip'); if (skip) skip.onclick = () => { fin({ forms: [], etapa: 'inscrita' }); $('#dlg').close(); };
    $('#pp-no').onclick = () => $('#dlg').close();
  });
}
// Etiquetas que se ofrecen con un clic (Karen puede crear las suyas)
const ETIQUETAS_SUGERIDAS = ['No contactar', 'Pidió descuento', 'Quiere pagar en cuotas', 'Pidió más información', 'Sin respuesta', 'Cliente de terapias', 'Recomendada por alguien'];
// Por qué se descartó a alguien (ayuda a ver, con el tiempo, dónde se pierde la gente)
const MOTIVOS = ['No responde', 'Precio', 'No es el momento', 'No le interesa', 'Compró en otro lugar', 'Registro repetido o de prueba', 'Otro'];
function pedirMotivo(p) {
  return new Promise((resolve) => {
    let listo = false;
    const alCerrar = () => fin(null);
    const fin = (v) => { if (listo) return; listo = true; $('#dlg').removeEventListener('close', alCerrar); resolve(v); };
    dialog(`<span class="eyebrow">Descartar</span><h3>${esc(p.nombre)}</h3>
    <p class="muted" style="font-size:.88rem;margin:6px 0 12px">¿Por qué se descarta? Queda anotado y se resume en Métricas.</p>
    <form id="mo-form" style="display:grid;gap:10px"><select id="mo-motivo" aria-label="Motivo">${MOTIVOS.map((m) => `<option>${esc(m)}</option>`).join('')}</select>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm">Descartar</button><button type="button" class="btn btn-ghost btn-sm" id="mo-no">Cancelar</button></div></form>`);
    $('#dlg').addEventListener('close', alCerrar);
    $('#mo-form').onsubmit = (e) => { e.preventDefault(); fin($('#mo-motivo').value); $('#dlg').close(); };
    $('#mo-no').onclick = () => $('#dlg').close();
  });
}
// Después de que alguien toma la clase queda una tarea para el día siguiente (ofrecerle el curso), si no tenía un seguimiento pendiente
const seguimientoAuto = (p) => (FUNC.tareas && (!p.followUp || p.followUp < ymd(hoyCL()) ? ymd(hoyCL() + 864e5) : null));
const etapaNombre = (k) => LEAD_STATES.find(([x]) => x === k)?.[1] || k;

// Cambia la etapa de una persona en un programa (un registro). Devuelve true si cambió.
async function leadMover(id, status) {
  const l = (A.leads || []).find((x) => x.id === id); if (!l) return false;
  if (l.status === status && leadEtapa(l) === status) return false;
  const p = personaDe(id);
  let extra = [], motivo = '';
  if ((status === 'inscrita' || status === 'matriculada') && esClase(l.form)) {
    const r = await pedirProgramasPago(p);
    if (r === null) { render(false); return false; }
    extra = r.forms;
  }
  if (status === 'descartado') {
    const m = await pedirMotivo(p);
    if (m === null) { render(false); return false; }
    motivo = m;
  }
  const antes = { status: l.status, motivo: l.motivo, eventos: l.eventos };
  l.status = status; if (motivo) l.motivo = motivo;
  l.eventos = [...(l.eventos || []), { t: Date.now(), tipo: 'etapa', texto: `Etapa: ${etapaNombre(status)}${motivo ? ` (${motivo})` : ''}` }];
  A._per = null; paintNav(); render(false);
  try {
    await data.leads({ action: 'update', id, status, ...(motivo ? { motivo } : {}) });
    const fup = status === 'clase' || status === 'asistio_confirmado' ? seguimientoAuto(p) : null;
    if (fup) { await data.leads({ action: 'update', ids: p.leads.map((x) => x.id), followUp: fup }); p.leads.forEach((x) => (x.followUp = fup)); toast('Quedó un seguimiento para mañana: ofrecerle el curso.'); }
    for (const form of extra) await data.leads({ action: 'addProgram', fromId: id, form, status: 'inscrita' });
    if (extra.length) await data.leads({ action: 'all' });
    A._per = null; paintNav(); render(false);
    return true;
  } catch (e) { Object.assign(l, antes); A._per = null; paintNav(); render(false); fail(e); return false; }
}

// Respuestas rápidas del chat: se escriben en el cuadro para que Karen las ajuste antes de enviar
const RESPUESTAS = [
  ['Link de la clase', (c) => `Hola ${c.nombre}, te dejo el link de tu clase gratis de ${c.programa}${c.fecha ? ` (${c.fecha})` : ''}: ${c.link || '[falta su enlace personal: usa «Preparar contactos»]'}. ¡Te espero!`],
  ['Recordatorio de la clase', (c) => `Hola ${c.nombre}, te recuerdo tu clase gratis de ${c.programa}${c.fecha ? `: ${c.fecha}` : ''}. Entra por aquí: ${c.link || '[falta su enlace personal: usa «Preparar contactos»]'}`],
  ['Después de la clase', (c) => `Hola ${c.nombre}, ¿cómo te fue en la clase de ${c.programa}? Me encantaría saber qué te pareció y resolver tus dudas.`],
  ['Contarle del curso', (c) => `Hola ${c.nombre}, si te gustó la clase, puedo contarte cómo funciona el curso y cómo inscribirte. ¿Te parece?`],
];
const ctxRespuesta = (p) => {
  const trk = p.leads.find((l) => esClase(l.form)) || p.leads[0];
  const evt = trk?.claseEvento ? (A.cal || []).find((x) => x.id === trk.claseEvento) : null;
  return {
    nombre: String(p.nombre || '').split(' ')[0],
    programa: (LEAD_FORMS[trk?.form] || 'Casa Muladhara').replace('Clase gratis ', ''),
    fecha: trk?.claseFecha ? `${fechaLarga(trk.claseFecha)}${evt?.time ? ` a las ${evt.time} (hora de Chile)` : ''}` : '',
    link: trk && esClase(trk.form) ? trk.enlace_entrada || '' : '', // solo el enlace personal /entrar/<codigo>, nunca el de Meet
  };
};

// Conversación de WhatsApp dentro de la ficha: se lee en vivo de wa_chats/{número}; enviar pasa por el servidor (src/app/api/whatsapp)
let waFichaOff = null;
function waFichaMontar(p) {
  waFichaOff?.(); waFichaOff = null;
  const n = waNum(p.whatsapp), box = $('#wf-msgs'); if (!n || !box) return;
  const pintar = (msgs) => { box.innerHTML = msgs.map((m) => `<div class="wa-m ${m.dir === 'out' ? 'out' : ''}">${esc(m.text)}<small>${m.ts?.toMillis ? waHora(m.ts.toMillis()) : ''}</small></div>`).join('') || '<div class="wa-empty">Todavía no hay mensajes con esta persona.</div>'; box.scrollTop = box.scrollHeight; };
  try {
    waFichaOff = onSnapshot(query(collection(db, 'wa_chats', n, 'messages'), orderBy('ts', 'asc'), limit(200)), (snap) => pintar(snap.docs.map((d) => d.data())),
      () => { box.innerHTML = '<div class="wa-empty">Todavía no se puede leer la conversación: falta conectar WhatsApp y publicar las reglas de Firestore.</div>'; });
  } catch { /* sin conexión */ }
  if (A.wa.chats.find((x) => x.id === n)?.unread) waApi({ action: 'leido', to: n }).catch(() => {});
  if (A.wa.on === null) waApi({ action: 'estado' }).then((r) => { A.wa.on = r.configurado; if (!r.configurado && $('#wf-aviso')) $('#wf-aviso').hidden = false; }).catch(() => {});
}

// Ficha de una persona, al estilo de un CRM: datos de contacto a la izquierda (se editan y se guardan con "Guardar cambios"),
// al centro la conversación de WhatsApp y el historial, y a la derecha sus programas con la etapa de cada uno.
// Las etapas, etiquetas y seguimientos se guardan al instante (avisa con "Guardado").
async function pasarACurso(l) {
  const p = personaDe(l.id), r = await pedirProgramasPago(p, { etapa: true });
  if (!r || !r.forms.length) return false;
  try {
    const creadas = [];
    for (const form of r.forms) { await data.leads({ action: 'addProgram', fromId: l.id, form, status: r.etapa }); if (A._ultimo?.creada) creadas.push(A._ultimo.id); }
    if (r.etapa === 'inscrita' && !esInscrita(l.status)) await data.leads({ action: 'update', id: l.id, status: esClase(l.form) ? 'matriculada' : 'inscrita' });
    await data.leads({ action: 'all' }); A._per = null; paintNav(); render(false);
    const nombres = r.forms.map((f) => PROG_AGREGAR.find(([k]) => k === f)?.[1] || f).join(' y ');
    toast(`Pasó a ${nombres} como interesada.`, FUNC.deshacer && creadas.length ? {
      label: 'Deshacer',
      fn: async () => { try { await data.leads({ action: 'delete', ids: creadas }); A.leads = A.leads.filter((x) => !creadas.includes(x.id)); A._per = null; paintNav(); render(false); toast('Deshecho: ya no está en ese programa.'); } catch (e) { fail(e); } },
    } : undefined);
    return true;
  } catch (e) { fail(e); return false; }
}


// Ficha simple (la que está activa mientras el alcance está congelado): contacto, registro de la clase, etapa por programa, enlaces personales y nota.
// La ficha completa (pestañas, etiquetas, seguimientos, pagos) sigue en leadFicha(); se activa con FUNC.fichaCompleta.
function leadFichaSimple(id) {
  const p = personaDe(id) || personas().find((x) => x.id === id); if (!p) return;
  const ids = p.leads.map((l) => l.id), refrescar = () => { A._per = null; paintNav(); render(false); };
  const fila = (ok, txt, t) => `<li style="display:flex;gap:8px;align-items:center"><span class="pill ${ok ? 'done' : 'lock'}" style="min-width:2.4rem;text-align:center">${ok ? 'Sí' : 'No'}</span><span>${txt}</span>${ok && t ? `<span class="muted" style="font-size:.78rem">${esc(fechaCorta(t))}</span>` : ''}</li>`;
  const registro = (l) => { const a = asistenciaActual(l), e = leadEtapa(l);
    return `<ul class="reg" style="list-style:none;margin:0;padding:0;display:grid;gap:6px;font-size:.88rem">${fila(!!a.entro, 'Entró a la clase (clic en su enlace)', a.entro)}${fila(!!a.confirmada, 'Asistió confirmado', a.confirmada)}${FUNC.autodeclaracion ? fila(a.autodeclarada === 'si', `Asistencia autodeclarada${a.autodeclarada === 'no' ? ' (dijo que no pudo entrar)' : ''}`, a.autodeclaradaT) : ''}${fila(!!l.replayT || e === 'vio_replay', 'Vio el replay', l.replayT)}${fila(!!l.compraClicT, 'Hizo clic en comprar', l.compraClicT)}${fila(esInscrita(e) || !!l.pago?.t, 'Matriculada', l.pago?.t)}</ul>`; };
  const opciones = (l) => (esClase(l.form) ? [...etapasClaseDe(l.form), ['descartado', 'Descartada']] : LEAD_STATES.filter(([k]) => !(esPago(l.form) && k === 'clase')));
  const tarjeta = (l) => { const act = esClase(l.form) ? etapaVisible(leadEtapa(l)) : leadEtapa(l);
    return `<div class="pg"><div class="pg-top"><b>${esc(LEAD_FORMS[l.form] || l.form)}</b></div>
      <span class="muted" style="font-size:.78rem">${fdateMs(l.createdAt)}${l.claseFecha ? ` · clase ${esc(fechaLarga(l.claseFecha))}` : ''}${l.status === 'descartado' && l.motivo ? ` · motivo: ${esc(l.motivo)}` : ''}</span>
      <label style="display:grid;gap:4px;font-size:.8rem">Etapa<select data-fs-etapa="${esc(l.id)}">${opciones(l).map(([k, t]) => `<option value="${k}" ${act === k ? 'selected' : ''}>${esc(etapaTxt(l.form, k))}</option>`).join('')}</select></label>
      ${esClase(l.form) ? registro(l) : ''}</div>`; };
  const n = waNum(p.whatsapp), c = A.wa.chats.find((x) => x.id === n), libre = waLibre(c);
  const chat = !n ? '<div class="wa-empty" style="flex:1;border:1px dashed var(--line);border-radius:12px">Esta persona no dejó WhatsApp.</div>' : `<div class="alert" id="wf-aviso" ${A.wa.on === false ? '' : 'hidden'}><div><b>WhatsApp todavía no está conectado</b><p>Cuando esté el número definitivo y las llaves de Meta, aquí podrás conversar uno a uno. Mientras tanto el chat no envía ni recibe.</p></div></div>
      <div class="wa-msgs" id="wf-msgs" style="flex:1;min-height:260px;border:1px solid var(--line);border-radius:12px"><div class="wa-empty">Cargando conversación…</div></div>
      ${libre ? `<div style="display:grid;gap:8px"><select id="wf-resp" aria-label="Respuestas rápidas"><option value="">Respuestas rápidas…</option>${RESPUESTAS.map(([t], i) => `<option value="${i}">${esc(t)}</option>`).join('')}</select>
        <form class="wa-send" id="wf-form" style="padding:0;border:0"><textarea id="wf-text" rows="2" placeholder="Escribe un mensaje…" aria-label="Mensaje"></textarea><button class="btn btn-primary btn-sm">Enviar</button></form></div>`
      : `<div class="wa-note"><span>${c?.lastInboundAt ? 'Pasaron más de 24 horas desde su último mensaje.' : 'Esta persona aún no te ha escrito.'} WhatsApp solo permite empezar con un mensaje de plantilla (con costo); cuando responda podrás escribirle libremente.</span><button type="button" class="btn btn-primary btn-sm" id="wf-plantilla">Enviar plantilla</button></div>`}`;
  dialog(`<div class="ct"><aside class="ct-izq"><div class="ct-cab"><span class="av lg" style="--c:${colorFor(p.id)}">${esc(initials(p.nombre))}</span><div><h3>${esc(p.nombre)}</h3><span class="muted" style="font-size:.8rem">${esc(etapaTxt('', etapaDe(p)))}</span></div></div>
    <div class="ct-badges" style="margin:0">${cuentaBadge(p)} ${asistPersona(p)}</div>
    <div class="ct-acc">${p.email ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(p.email)}">Escribir correo</a>` : ''}</div>
    <form class="ct-form" id="ct-form">
      <label>Nombre<input data-ct="name" value="${esc(p.nombre)}" maxlength="120" autocomplete="off"></label>
      <label>Correo<input data-ct="email" type="email" value="${esc(p.email)}" maxlength="160" autocomplete="off"></label>
      <label>WhatsApp<input data-ct="whatsapp" type="tel" value="${esc(p.whatsapp)}" maxlength="40" autocomplete="off"></label>
      <label>País<input data-ct="country" value="${esc(p.country)}" maxlength="60" autocomplete="off"></label>
      <div class="ct-guardar"><span class="muted" id="ct-estado" style="font-size:.8rem">Todo guardado</span><button class="btn btn-primary btn-sm" id="ct-save" disabled>Guardar cambios</button></div>
    </form>
    <section class="ct-sec"><b>Datos</b><dl class="kv" style="font-size:.84rem;gap:6px 12px"><dt>Origen</dt><dd>${esc(leadOrigenTxt(p.leads[0]))}</dd><dt>Primer registro</dt><dd>${fdateMs(p.leads[0].createdAt)}</dd>${((c) => (c ? `<dt>Cuenta del aula</dt><dd>Creada ${esc(fdateMs(c.t))} · origen: ${esc(c.origen || 'directo')}</dd>` : ''))(p.leads.map((x) => x.cuentaAula).find(Boolean))}</dl></section>
    <section class="ct-sec"><b>Enlaces personales</b>${enlacesPersonales(p)}</section>
    <button type="button" class="link" id="lf-del" style="color:#b8402f;justify-self:start">Eliminar persona</button></aside>
  <main class="ct-centro"><div class="ct-sec"><b>Conversación de WhatsApp${n ? ` · ${esc(p.whatsapp)}` : ''}</b></div>${chat}</main>
  <aside class="ct-der"><h4 style="font:600 .62rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:0">Programas y registro</h4>${p.leads.map(tarjeta).join('')}
    <section class="ct-sec"><b>Nota</b><form id="nota-form" style="display:grid;gap:8px"><textarea id="nt-text" maxlength="1000" rows="3" placeholder="Anota lo que conversaron…" aria-label="Nota">${esc(p.note || '')}</textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Guardar nota</button></form></section></aside></div>`, true);
  $('#dlg').classList.add('contacto');
  $('#dlg').addEventListener('close', () => { waFichaOff?.(); waFichaOff = null; }, { once: true });
  if (n) {
    waFichaMontar(p);
    const t = $('#wf-text'), form = $('#wf-form'), resp = $('#wf-resp'), pl = $('#wf-plantilla');
    if (resp) resp.onchange = () => { if (resp.value === '') return; t.value = RESPUESTAS[Number(resp.value)][1](ctxRespuesta(p)); resp.value = ''; t.focus(); };
    if (form) {
      t.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } };
      form.onsubmit = async (e) => {
        e.preventDefault();
        const text = t.value.trim(); if (!text) return;
        const b = form.querySelector('button'); b.disabled = true;
        try { await waApi({ action: 'enviar', to: n, text, name: p.nombre }); t.value = ''; } catch (err) { fail(err); }
        b.disabled = false;
      };
    }
    if (pl) pl.onclick = async () => { pl.disabled = true; try { await waApi({ action: 'plantilla', to: n, name: p.nombre }); toast('Plantilla enviada. Cuando responda podrás escribirle aquí.'); } catch (err) { fail(err); pl.disabled = false; } };
  }
  const campos = [...document.querySelectorAll('#dlg [data-ct]')], orig = { name: p.nombre, email: p.email, whatsapp: p.whatsapp, country: p.country };
  const sucio = () => campos.some((c) => c.value.trim() !== (orig[c.dataset.ct] || ''));
  const marcar = () => { $('#ct-save').disabled = !sucio(); $('#ct-estado').textContent = sucio() ? 'Hay cambios sin guardar' : 'Todo guardado'; };
  campos.forEach((c) => (c.oninput = marcar));
  $('#ct-form').onsubmit = async (e) => {
    e.preventDefault(); if (!sucio()) return;
    const contacto = Object.fromEntries(campos.map((c) => [c.dataset.ct, c.value.trim()])), b = $('#ct-save'); b.disabled = true;
    try { await data.leads({ action: 'update', ids, contacto }); p.leads.forEach((l) => Object.assign(l, contacto, { email: contacto.email.toLowerCase() })); refrescar(); leadFichaSimple(id); toast('Cambios guardados.'); } catch (err) { fail(err); b.disabled = false; }
  };
  document.querySelectorAll('#dlg [data-fs-etapa]').forEach((s) => (s.onchange = async () => { const cambio = await leadMover(s.dataset.fsEtapa, s.value); if (cambio) toast('Guardado.'); leadFichaSimple(id); }));
  document.querySelectorAll('#dlg [data-codigo]').forEach((b) => (b.onclick = async () => {
    const [tid, accion] = b.dataset.codigo.split('|'), l = A.leads.find((x) => x.id === tid); if (!l) return;
    if (!confirm(accion === 'revocar' ? 'Si lo revocas, los enlaces de esta persona dejan de funcionar. ¿Revocar el código?' : 'Se crea un código nuevo y los enlaces anteriores dejan de funcionar. ¿Regenerar?')) return;
    try {
      await data.leads({ action: 'codigo', id: tid, accion });
      if (accion === 'revocar') l.codigoRevocado = true; else await data.leads({ action: 'all' });
      refrescar(); leadFichaSimple(id); toast(accion === 'revocar' ? 'Código revocado.' : 'Código regenerado.');
    } catch (err) { fail(err); }
  }));
  $('#nota-form').onsubmit = async (e) => {
    e.preventDefault();
    const texto = $('#nt-text').value.trim(); if (!texto) return toast('Escribe la nota.');
    try { await data.leads({ action: 'nota', ids, texto }); p.leads.forEach((l) => { l.note = texto; }); refrescar(); leadFichaSimple(id); toast('Nota guardada.'); } catch (err) { fail(err); }
  };
  $('#lf-del').onclick = async () => {
    if (!confirm(`¿Eliminar a ${p.nombre} de tu lista${p.leads.length > 1 ? ` (${p.leads.length} programas)` : ''}? No se puede deshacer.`)) return;
    try { await data.leads({ action: 'delete', ids }); A.leads = A.leads.filter((x) => !ids.includes(x.id)); S.leadSel.delete(p.id); $('#dlg').close(); refrescar(); toast('Eliminada.'); } catch (err) { fail(err); }
  };
}

function leadFicha(id) {
  if (!FUNC.fichaCompleta) return leadFichaSimple(id);
  const p = personaDe(id) || personas().find((x) => x.id === id); if (!p) return;
  const tab = S.fichaTab === 'wa' ? 'wa' : 'historial';
  const ids = p.leads.map((l) => l.id), formas = new Set(p.leads.map((l) => l.form));
  const refrescar = () => { A._per = null; paintNav(); render(false); };
  const pestana = (v, t) => `<button type="button" class="chip" data-ficha-tab="${v}" aria-pressed="${tab === v}">${t}</button>`;
  const secc = (t, html) => `<section class="ct-sec"><b>${t}</b>${html}</section>`;
  const todasTags = [...new Set(personas().flatMap((x) => x.tags))].sort();
  const sugeridas = [...new Set([...ETIQUETAS_SUGERIDAS, ...todasTags])].filter((t) => !p.tags.includes(t)).slice(0, 8);

  // ----- centro: WhatsApp o Historial
  let centro = '';
  if (tab === 'wa') {
    const n = waNum(p.whatsapp), c = A.wa.chats.find((x) => x.id === n), libre = waLibre(c);
    centro = !n ? '<p class="muted">Esta persona no dejó WhatsApp.</p>' : `<div class="alert" id="wf-aviso" ${A.wa.on === false ? '' : 'hidden'}><div><b>WhatsApp todavía no está conectado</b><p>Faltan las llaves de Meta en Vercel. Mientras tanto, el chat aquí no envía ni recibe.</p></div></div>
      <div class="wa-msgs" id="wf-msgs" style="flex:1;min-height:260px;border:1px solid var(--line);border-radius:12px"><div class="wa-empty">Cargando conversación…</div></div>
      ${libre ? `<div style="display:grid;gap:8px"><select id="wf-resp" aria-label="Respuestas rápidas"><option value="">Respuestas rápidas…</option>${RESPUESTAS.map(([t], i) => `<option value="${i}">${esc(t)}</option>`).join('')}</select>
        <form class="wa-send" id="wf-form" style="padding:0;border:0"><textarea id="wf-text" rows="2" placeholder="Escribe un mensaje…" aria-label="Mensaje"></textarea><button class="btn btn-primary btn-sm">Enviar</button></form></div>`
      : `<div class="wa-note"><span>${c?.lastInboundAt ? 'Pasaron más de 24 horas desde su último mensaje.' : 'Esta persona aún no te ha escrito.'} WhatsApp solo permite empezar con un mensaje de plantilla (con costo); cuando responda podrás escribirle libremente.</span><button type="button" class="btn btn-primary btn-sm" id="wf-plantilla">Enviar plantilla</button></div>`}`;
  } else {
    const evs = [];
    p.leads.forEach((l) => {
      evs.push({ t: l.createdAt || 0, tipo: 'registro', texto: `${l.desdeForm ? 'Agregada a mano a' : 'Se registró en'} ${LEAD_FORMS[l.form] || l.form}${l.claseFecha ? ` · clase ${fechaLarga(l.claseFecha)}` : ''}${l.desdeForm ? '' : ` · ${leadOrigenTxt(l)}`}` });
      (l.eventos || []).forEach((e) => evs.push({ t: e.t, tipo: e.tipo, texto: `${e.texto}${e.tipo === 'etapa' ? ` · ${PROG_CORTO[l.form] || l.form}` : ''}` }));
    });
    evs.sort((a, b) => b.t - a.t);
    centro = `<form id="nota-form" style="display:grid;gap:8px"><textarea id="nt-text" maxlength="1000" rows="3" placeholder="Anota lo que conversaron, qué le interesa, qué falta decidir…" aria-label="Nota"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Guardar nota</button></form>
      <ol class="tl">${evs.map((e) => `<li class="tl-${esc(e.tipo)}"><time>${fdateMs(e.t)}</time><span>${esc(e.texto)}</span></li>`).join('')}</ol>`;
  }

  // ----- derecha: cuenta en el aula y programas (cada uno con sus pasos)
  const pasosDe = (l) => (esClase(l.form) ? etapasClaseDe(l.form).filter(([k]) => PASOS_CLASE.includes(k)) : LEAD_STATES.filter(([k]) => k !== 'descartado' && !(esPago(l.form) && k === 'clase')));
  const alternas = (l) => (esClase(l.form) ? etapasClaseDe(l.form).filter(([k]) => !PASOS_CLASE.includes(k)) : []);
  const tarjetaProg = (l) => {
    const pasos = pasosDe(l), act = leadEtapa(l), i = pasos.findIndex(([k]) => k === act);
    return `<div class="pg"><div class="pg-top"><b>${esc(LEAD_FORMS[l.form] || l.form)}</b></div>
      <span class="muted" style="font-size:.78rem">${fdateMs(l.createdAt)}${l.claseFecha ? ` · clase ${esc(fechaLarga(l.claseFecha))}` : ''}${l.desdeForm ? ' · agregado a mano' : ''}${act === 'descartado' && l.motivo ? ` · motivo: ${esc(l.motivo)}` : ''}</span>
      ${esClase(l.form) ? `<div style="display:flex;gap:4px;flex-wrap:wrap">${asistBadges(l)}</div>` : ''}
      ${esClase(l.form) ? bloquePago(l) : ''}
      <div class="pasos" role="group" aria-label="Etapa en ${esc(LEAD_FORMS[l.form] || l.form)}">${pasos.map(([k], j) => `<button type="button" class="paso ${act === k ? 'on' : i > j ? 'hecha' : ''}" data-paso="${esc(l.id)}|${k}" aria-pressed="${act === k}">${esc(etapaTxt(l.form, k))}</button>`).join('')}${alternas(l).map(([k, t]) => `<button type="button" class="paso alt ${act === k ? 'on' : ''}" data-paso="${esc(l.id)}|${k}" aria-pressed="${act === k}">${esc(t)}</button>`).join('')}<button type="button" class="paso descartar ${act === 'descartado' ? 'on' : ''}" data-paso="${esc(l.id)}|descartado" aria-pressed="${act === 'descartado'}">Descartada</button></div>
      ${esClase(l.form) ? `<button type="button" class="btn btn-ghost btn-sm" data-pasar="${esc(l.id)}">Pasar a un curso →</button>` : ''}
      <button type="button" class="btn btn-ghost btn-sm" style="color:#b8402f;border-color:#e3b8ae" data-trk-del="${esc(l.id)}" title="Borra solo este programa de la persona">${l.desdeForm ? '↩ Deshacer: no pasó a este programa' : '↩ Quitar de este programa'}</button></div>`;
  };
  const faltan = PROG_AGREGAR.filter(([f]) => !formas.has(f));
  const cuenta = p.alumna
    ? `<div class="pg"><b>Cuenta en el aula</b><span style="font-size:.88rem">${esc(nameOf(p.alumna))} · ${esc(payState(p.alumna)[1])}</span><button type="button" class="btn btn-ghost btn-sm" data-lead-alumna="${esc(p.alumna.id)}">Ver su ficha</button></div>`
    : `<div class="pg" style="${esInscrita(etapaDe(p)) ? 'border-color:#e3b8ae' : ''}"><b>Cuenta en el aula</b><span style="font-size:.86rem;color:${esInscrita(etapaDe(p)) ? '#b8402f' : 'inherit'}">Aún no tiene cuenta.${esInscrita(etapaDe(p)) ? ' Ya está inscrita: pídele que la cree.' : ''}</span><span class="muted" style="font-size:.78rem">Si la creó con otro correo, corrígelo a la izquierda para que se unan.</span></div>`;
  const derecha = `${cuenta}<h4 style="font:600 .62rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin:6px 0 0">Programas</h4>
    ${p.leads.map(tarjetaProg).join('')}${formacionPagada(p) && !formas.has('formacion') ? '<div class="pg"><div class="pg-top"><b>Formación completa</b><span class="pill done">Inscrita</span></div><span class="muted" style="font-size:.78rem">pagó en la plataforma</span></div>' : ''}
    ${faltan.length ? `<details class="pg pg-add"><summary>+ Agregar a otro programa</summary><div style="display:grid;gap:8px;margin-top:10px"><span class="muted" style="font-size:.8rem">Úsalo si pidió información por otro lado (llamada, mensaje) y no se registró en esa página. Entra en la primera etapa y tú la mueves con los pasos.</span><select id="fa-form" aria-label="Programa a agregar">${faltan.map(([f, t]) => `<option value="${f}">${esc(t)}</option>`).join('')}</select><button type="button" class="btn btn-primary btn-sm" id="fa-add">Agregar</button></div></details>` : ''}
    <p class="muted" style="font-size:.78rem;margin:0">Las etapas, el seguimiento y las etiquetas se guardan al instante. Los datos de contacto se guardan con «Guardar cambios».</p>`;

  // ----- izquierda: persona, contacto editable, seguimiento, etiquetas
  const izquierda = `<div class="ct-cab"><span class="av lg" style="--c:${colorFor(p.id)}">${esc(initials(p.nombre))}</span><div><h3>${esc(p.nombre)}</h3><span class="muted" style="font-size:.8rem">${esc(etapaTxt('', etapaDe(p)))}</span></div></div>
    <div class="ct-badges" style="margin:0">${cuentaBadge(p)} ${asistPersona(p)} ${pagoPersona(p)} ${segBadge(p)}</div>
    <div class="ct-acc">${p.whatsapp ? '<button type="button" class="btn btn-primary btn-sm" data-ficha-tab="wa">WhatsApp</button>' : ''}${p.email ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(p.email)}">Correo</a>` : ''}</div>
    <form class="ct-form" id="ct-form">
      <label>Nombre<input data-ct="name" value="${esc(p.nombre)}" maxlength="120" autocomplete="off"></label>
      <label>Correo<input data-ct="email" type="email" value="${esc(p.email)}" maxlength="160" autocomplete="off"></label>
      <label>WhatsApp<input data-ct="whatsapp" type="tel" value="${esc(p.whatsapp)}" maxlength="40" autocomplete="off"></label>
      <label>País<input data-ct="country" value="${esc(p.country)}" maxlength="60" autocomplete="off"></label>
      <div class="ct-guardar"><span class="muted" id="ct-estado" style="font-size:.8rem">Todo guardado</span><button class="btn btn-primary btn-sm" id="ct-save" disabled>Guardar cambios</button></div>
    </form>
    ${secc('Próximo seguimiento', `<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><input type="date" id="sg-fecha" value="${esc(p.followUp || '')}" style="max-width:150px"><button type="button" class="btn btn-ghost btn-sm" data-sg="fecha">Guardar</button></div><div style="display:flex;gap:6px;flex-wrap:wrap"><button type="button" class="chip" data-sg="1">Mañana</button><button type="button" class="chip" data-sg="3">En 3 días</button><button type="button" class="chip" data-sg="7">En 1 semana</button>${p.followUp ? '<button type="button" class="link" data-sg="quitar">Quitar</button>' : ''}</div>`)}
    ${secc('Etiquetas', `<span class="muted" style="font-size:.78rem">Marcas para agrupar personas (por ejemplo «Pidió descuento»). Luego puedes filtrar la lista por ellas.</span>${p.tags.length ? `<div style="display:flex;gap:6px;flex-wrap:wrap">${p.tags.map((t) => `<span class="pill pres">${esc(t)} <button type="button" class="link" data-tag-del="${esc(t)}" aria-label="Quitar ${esc(t)}" style="padding:0 0 0 4px">×</button></span>`).join('')}</div>` : ''}${sugeridas.length ? `<div style="display:flex;gap:6px;flex-wrap:wrap">${sugeridas.map((t) => `<button type="button" class="chip" data-tag-sug="${esc(t)}">+ ${esc(t)}</button>`).join('')}</div>` : ''}<div style="display:flex;gap:6px"><input id="tg-nueva" list="tags-lista" placeholder="Crear etiqueta propia" maxlength="30"><datalist id="tags-lista">${todasTags.map((t) => `<option value="${esc(t)}">`).join('')}</datalist><button type="button" class="btn btn-ghost btn-sm" id="tg-add">Agregar</button></div>`)}
    ${secc('Datos', `<dl class="kv" style="font-size:.84rem;gap:6px 12px"><dt>Origen</dt><dd>${esc(leadOrigenTxt(p.leads[0]))}</dd><dt>Primer registro</dt><dd>${fdateMs(p.leads[0].createdAt)}</dd>${p.leads.map((l) => l.message).filter(Boolean).pop() ? `<dt>Mensaje</dt><dd style="font-weight:400;text-align:left">${esc(p.leads.map((l) => l.message).filter(Boolean).pop())}</dd>` : ''}</dl>`)}
    ${secc('Enlaces personales', enlacesPersonales(p))}
    <button type="button" class="link" id="lf-del" style="color:#b8402f;justify-self:start">Eliminar persona</button>`;

  dialog(`<div class="ct"><aside class="ct-izq">${izquierda}</aside><main class="ct-centro"><div class="filters">${pestana('historial', 'Historial')}${pestana('wa', 'WhatsApp')}</div>${centro}</main><aside class="ct-der">${derecha}</aside></div>`, true);
  $('#dlg').classList.add('contacto');

  $('#dlg').addEventListener('close', () => { waFichaOff?.(); waFichaOff = null; }, { once: true });
  document.querySelectorAll('#dlg [data-ficha-tab]').forEach((b) => (b.onclick = () => { S.fichaTab = b.dataset.fichaTab; leadFicha(id); }));

  // Datos de contacto: el botón se activa al cambiar algo
  const campos = [...document.querySelectorAll('#dlg [data-ct]')], orig = { name: p.nombre, email: p.email, whatsapp: p.whatsapp, country: p.country };
  const sucio = () => campos.some((c) => c.value.trim() !== (orig[c.dataset.ct] || ''));
  const marcar = () => { $('#ct-save').disabled = !sucio(); $('#ct-estado').textContent = sucio() ? 'Hay cambios sin guardar' : 'Todo guardado'; };
  campos.forEach((c) => (c.oninput = marcar));
  $('#ct-form').onsubmit = async (e) => {
    e.preventDefault();
    if (!sucio()) return;
    const contacto = Object.fromEntries(campos.map((c) => [c.dataset.ct, c.value.trim()]));
    const b = $('#ct-save'); b.disabled = true;
    try {
      await data.leads({ action: 'update', ids, contacto });
      p.leads.forEach((l) => Object.assign(l, contacto, { email: contacto.email.toLowerCase() }));
      refrescar(); leadFicha(id); toast('Cambios guardados.');
    } catch (err) { fail(err); b.disabled = false; }
  };

  // Programas
  document.querySelectorAll('#dlg [data-paso]').forEach((b) => (b.onclick = async () => {
    const [tid, etapa] = b.dataset.paso.split('|');
    const cambio = await leadMover(tid, etapa);
    if (cambio) toast('Guardado.');
    leadFicha(id);
  }));
  document.querySelectorAll('#dlg [data-reserva]').forEach((b) => (b.onclick = async () => {
    const [tid, accion] = b.dataset.reserva.split('|'), o = ofertaDe('pendulo');
    try {
      if (accion === 'pagar') {
        const txt = prompt(`Monto de la reserva pagada (por defecto ${clp(o.reserva)}):`, String(o.reserva)); if (txt === null) return;
        const monto = Number(String(txt).replace(/\D/g, '')) || o.reserva;
        try { await embApi({ action: 'reserva', id: tid, pagada: true, monto }); } catch (err) {
          if (err.codigo !== 'cupos_llenos') throw err;
          const d = err.datos || {};
          if (confirm(`Los cupos del ${o.nombre} están llenos (${d.ocupados} de ${d.cupos}).\n\n¿Pasarla a la lista de espera?`)) { await leadMover(tid, 'lista_espera'); leadFicha(id); return; }
          if (!confirm('¿Darle el cupo de todas formas, por encima del máximo?')) return;
          await embApi({ action: 'reserva', id: tid, pagada: true, monto, forzar: true });
        }
      } else if (accion === 'deshacer') {
        if (!confirm('¿Deshacer la reserva? Vuelve a «Vio la oferta».')) return;
        await embApi({ action: 'reserva', id: tid, pagada: false });
      } else if (accion === 'saldo') {
        if (!confirm('¿Marcar el saldo como pagado? Queda matriculada en el curso.')) return;
        await embApi({ action: 'saldo', id: tid });
      }
      await data.leads({ action: 'all' }); refrescar(); leadFicha(id); toast('Guardado.');
    } catch (err) { fail(err); }
  }));
  document.querySelectorAll('#dlg [data-pasar]').forEach((b) => (b.onclick = async () => { const l = A.leads.find((x) => x.id === b.dataset.pasar); if (l) await pasarACurso(l); leadFicha(id); }));
  document.querySelectorAll('#dlg [data-trk-del]').forEach((b) => (b.onclick = async () => {
    const l = A.leads.find((x) => x.id === b.dataset.trkDel); if (!l) return;
    const resto = p.leads.filter((x) => x.id !== l.id).map((x) => LEAD_FORMS[x.form] || x.form);
      if (!confirm(`¿Quitar a ${p.nombre} de ${LEAD_FORMS[l.form] || l.form}?\n\n${resto.length ? `Seguirá en: ${resto.join(', ')}.` : 'Es su único programa: la persona se elimina de tu lista.'}\n\nNo se puede deshacer.`)) return;
    try {
      await data.leads({ action: 'delete', ids: [l.id] }); A.leads = A.leads.filter((x) => x.id !== l.id); S.leadSel.delete(p.id); refrescar();
      if (p.leads.length > 1) leadFicha(p.leads.find((x) => x.id !== l.id).id); else $('#dlg').close();
      toast('Quitada.');
    } catch (err) { fail(err); }
  }));
  const add = $('#fa-add');
  if (add) add.onclick = async () => {
    add.disabled = true;
    try { await data.leads({ action: 'addProgram', fromId: p.leads[0].id, form: $('#fa-form').value, status: 'nuevo' }); await data.leads({ action: 'all' }); refrescar(); leadFicha(id); toast('Programa agregado.'); } catch (err) { fail(err); add.disabled = false; }
  };

  // Seguimiento, etiquetas y eliminar
  document.querySelectorAll('#dlg [data-sg]').forEach((b) => (b.onclick = async () => {
    const v = b.dataset.sg, fecha = v === 'quitar' ? '' : v === 'fecha' ? $('#sg-fecha').value : ymd(hoyCL() + Number(v) * 864e5);
    if (v === 'fecha' && !fecha) return toast('Elige una fecha.');
    try { await data.leads({ action: 'update', ids, followUp: fecha }); p.leads.forEach((l) => { l.followUp = fecha; }); refrescar(); leadFicha(id); toast(fecha ? 'Seguimiento guardado.' : 'Seguimiento quitado.'); } catch (err) { fail(err); }
  }));
  const tagAccion = async (body, aplicar) => { try { await data.leads({ action: 'etiquetas', ids, ...body }); p.leads.forEach(aplicar); refrescar(); leadFicha(id); toast('Guardado.'); } catch (err) { fail(err); } };
  $('#tg-add').onclick = () => { const t = $('#tg-nueva').value.trim(); if (!t) return; tagAccion({ agregar: [t] }, (l) => { l.tags = [...new Set([...(l.tags || []), t])]; }); };
  $('#tg-nueva').onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); $('#tg-add').click(); } };
  document.querySelectorAll('#dlg [data-tag-sug]').forEach((b) => (b.onclick = () => { const t = b.dataset.tagSug; tagAccion({ agregar: [t] }, (l) => { l.tags = [...new Set([...(l.tags || []), t])]; }); }));
  document.querySelectorAll('#dlg [data-tag-del]').forEach((b) => (b.onclick = () => { const t = b.dataset.tagDel; tagAccion({ quitar: [t] }, (l) => { l.tags = (l.tags || []).filter((x) => x !== t); }); }));
  $('#lf-del').onclick = async () => {
    if (!confirm(`¿Eliminar a ${p.nombre} de tu lista${p.leads.length > 1 ? ` (${p.leads.length} programas)` : ''}? No se puede deshacer.`)) return;
    try { await data.leads({ action: 'delete', ids }); A.leads = A.leads.filter((x) => !ids.includes(x.id)); S.leadSel.delete(p.id); $('#dlg').close(); refrescar(); toast('Eliminada.'); } catch (err) { fail(err); }
  };

  document.querySelectorAll('#dlg [data-codigo]').forEach((b) => (b.onclick = async () => {
    const [tid, accion] = b.dataset.codigo.split('|'), l = A.leads.find((x) => x.id === tid); if (!l) return;
    if (!confirm(accion === 'revocar' ? 'Si lo revocas, los enlaces de esta persona dejan de funcionar. ¿Revocar el código?' : 'Se crea un código nuevo y los enlaces anteriores dejan de funcionar. ¿Regenerar?')) return;
    try {
      await data.leads({ action: 'codigo', id: tid, accion });
      if (accion === 'revocar') l.codigoRevocado = true; else await data.leads({ action: 'all' });
      refrescar(); leadFicha(id); toast(accion === 'revocar' ? 'Código revocado.' : 'Código regenerado.');
    } catch (err) { fail(err); }
  }));

  // Centro
  if (tab === 'wa') {
    waFichaMontar(p);
    const n = waNum(p.whatsapp), t = $('#wf-text'), form = $('#wf-form'), resp = $('#wf-resp');
    if (resp) resp.onchange = () => { if (resp.value === '') return; t.value = RESPUESTAS[Number(resp.value)][1](ctxRespuesta(p)); resp.value = ''; t.focus(); };
    if (form) {
      t.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } };
      form.onsubmit = async (e) => {
        e.preventDefault();
        const text = t.value.trim(); if (!text) return;
        const b = form.querySelector('button'); b.disabled = true;
        try { await waApi({ action: 'enviar', to: n, text, name: p.nombre }); t.value = ''; } catch (err) { fail(err); }
        b.disabled = false;
      };
    }
    const pl = $('#wf-plantilla');
    if (pl) pl.onclick = async () => { pl.disabled = true; try { await waApi({ action: 'plantilla', to: n, name: p.nombre }); toast('Plantilla enviada. Cuando responda podrás escribirle aquí.'); } catch (err) { fail(err); pl.disabled = false; } };
  } else {
    $('#nota-form').onsubmit = async (e) => {
      e.preventDefault();
      const texto = $('#nt-text').value.trim(); if (!texto) return toast('Escribe la nota.');
      try {
        await data.leads({ action: 'nota', ids, texto });
        p.leads.forEach((l) => { l.note = texto; }); p.leads[0].eventos = [...(p.leads[0].eventos || []), { t: Date.now(), tipo: 'nota', texto }];
        refrescar(); leadFicha(id); toast('Nota guardada.');
      } catch (err) { fail(err); }
    };
  }
}
// ---------- Herramientas del embudo de clases gratis ----------
// Oferta de cada línea (hora de Chile; la misma que usa el servidor en src/lib/server/embudo.js)
const DIAS_L = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES_L = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const horaChile = () => Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Santiago', hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
const diaChile = (ms) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date(ms));

// Segmentos para los mensajes, según el CLIC en /entrar/<codigo> dentro de la ventana de la clase (10 min antes a 30 después):
//   Entró = tiene clic_entrar en la ventana (o la Maestra la marcó con «Clasificar una clase»); No entró = inscrita a esa clase y sin clic.
//   Solo se calcula cuando la ventana terminó; antes queda «pendiente» y no entra en ningún grupo.
const SEGMENTOS = [['entro', 'Entró'], ['no_entro', 'No entró'], ['oferta', 'Vieron la oferta, sin respuesta'], ['todas', 'Todas (menos matriculadas)']];
// Textos de ejemplo (se usan mientras no guardes uno propio): quien entró recibe gracias + replay + oferta; quien no entró, replay + oferta con tono neutro
const TEXTO_EJEMPLO = {
  entro: 'Gracias por estar en la clase, {{nombre}}. Aquí tienes la grabación para repasarla: {{enlace_replay}}\n\nLa inscripción al curso cierra el {{fecha_limite}}.',
  no_entro: 'Hola {{nombre}}, te dejo la grabación de la clase por si no pudiste verla completa: {{enlace_replay}}\n\nLa inscripción al curso cierra el {{fecha_limite}}.',
};
// Cuándo termina la ventana de la clase de esta persona (ms), o 0 si no se sabe qué clase fue
const finVentanaClase = (l) => {
  const o = ofertaDe(claseDeL(l)) || {}, ev = l.claseEvento ? (A.cal || []).find((e) => e.id === l.claseEvento) : null;
  const fecha = ev?.date || l.claseFecha, hora = ev?.time || o.claseHora;
  if (!fecha || !hora) return 0;
  return chileAMs(fecha, hora) + (Number.isFinite(Number(o.ventanaDespues)) ? Number(o.ventanaDespues) : 30) * 6e4;
};
const asistioL = (l) => !!(asistenciaActual(l).entro || asistenciaActual(l).confirmada) || ['entro', 'asistio_confirmado'].includes(leadEtapa(l));
// 'entro' | 'no_entro' | 'pendiente' (la clase aún no termina) | 'sin_dato' (no se sabe a qué clase se inscribió)
const segClic = (l) => {
  if (asistioL(l)) return 'entro';
  const fin = finVentanaClase(l);
  return !fin ? 'sin_dato' : Date.now() <= fin ? 'pendiente' : 'no_entro';
};
// Quién no debe recibir mensajes de venta: ya compró, se descartó, pidió que no le escribamos, o rechazó el consentimiento
const excluidaDeEnvio = (l, p) => (['matriculada', 'descartado', 'lista_espera'].includes(leadEtapa(l)) ? 'Ya compró o está fuera'
  : l.secuenciasVenta === false ? 'Ya compró' : ((p?.tags || []).includes('No contactar') || l.noContactar) ? 'Pidió que no le escribamos' : l.consentimiento?.whatsapp?.aceptado === false ? 'No aceptó que le escribamos' : '');
// Variables que se reemplazan en los textos con los datos de cada persona
const variablesDe = (l) => {
  const base = l.enlace_entrada ? new URL(l.enlace_entrada).origin : '';
  return {
    nombre: String(l.name || '').trim().split(/\s+/)[0], clase: ofertaDe(l.clase)?.nombre || '', fecha_limite: fechaLimite(l.clase),
    enlace_entrada: l.enlace_entrada || '', enlace_replay: l.enlace_replay || '',
    enlace_si: base && l.codigo ? `${base}/confirmar?l=${l.codigo}&r=si` : '', enlace_no: base && l.codigo ? `${base}/confirmar?l=${l.codigo}&r=no` : '',
    enlace_asistencia: base && l.codigo ? `${base}/asistencia?l=${l.codigo}` : '',
    enlace_gracias: base && l.codigo ? `${base}/clase-${claseDeL(l) || 'pendulo'}/gracias?l=${l.codigo}` : '',
    enlace_calendario: base && l.codigo ? `${base}/calendario?l=${l.codigo}` : '',
  };
};
// Variables que se ofrecen (las de autodeclaración y palabra de asistencia están ocultas con su bandera)
const varsEnvio = () => [['nombre'], ['clase'], ['enlace_entrada'], ['enlace_replay'], ['enlace_si', 'autodeclaracion'], ['enlace_no', 'autodeclaracion'], ['enlace_asistencia', 'palabraAsistencia'], ['enlace_gracias'], ['enlace_calendario'], ['fecha_limite']].filter(([, f]) => !f || FUNC[f]).map(([k]) => k);
const rellenar = (texto, l) => { const v = variablesDe(l); return String(texto || '').replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => (k in v ? v[k] : m)); };

V.envios = () => {
  const head = `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Envíos de la clase</h1><p>Escribe el texto una vez y envíalo persona por persona, con su enlace personal ya puesto. Cada envío queda anotado en su historial.</p></div></div>`;
  if (!A.leads || !A.plantillas) return `${head}<div class="card empty">Cargando…</div>`;
  const clase = S.envClase || 'pendulo', seg = S.envSeg || 'entro', clave = `${clase}_${seg}`;
  const texto = textoEnvio(clase, seg), esEjemplo = !A.plantillas[clave] && !!TEXTO_EJEMPLO[seg];
  const chip = (attr, v, t, on) => `<button class="chip" ${attr}="${esc(v)}" aria-pressed="${on}">${t}</button>`;
  const todos = A.leads.filter((l) => l.form === `clase-${clase}`), porId = new Map(personas().flatMap((p) => p.leads.map((l) => [l.id, p])));
  const enSeg = todos.filter((l) => enSegmento(l, seg, porId.get(l.id)));
  const filas = enSeg.map((l) => ({ l, motivo: excluidaDeEnvio(l, porId.get(l.id)) }));
  const aEnviar = filas.filter((f) => !f.motivo), excl = filas.filter((f) => f.motivo);
  const hoy = diaChile(Date.now()), enviadoHoy = (l, canal) => !!l.ultimoEnvio?.[canal] && diaChile(l.ultimoEnvio[canal]) === hoy;
  const fuera = horaChile() < 8 || horaChile() >= 22;
  const aviso = fuera ? '<div class="card" style="padding:12px 14px;font-size:.88rem;border-left:4px solid #b8402f"><b>Es de noche en Chile.</b> No se envía entre las 22:00 y las 8:00: espera a la mañana.</div>' : '';
  const sinCodigo = aEnviar.filter((f) => !f.l.codigo).length, pendientes = todos.filter((l) => segClic(l) === 'pendiente' && !excluidaDeEnvio(l, porId.get(l.id))).length;
  const fila = ({ l }) => { const msg = rellenar(texto, l), n = waNum(l.whatsapp);
    return `<tr><td><b>${esc(l.name)}</b><br><span class="muted" style="font-size:.8rem">${esc(l.email || '')}${l.email && l.whatsapp ? ' · ' : ''}${esc(l.whatsapp || '')}</span></td>
      <td>${asistBadges(l) || '<span class="muted" style="font-size:.8rem">—</span>'}${l.consentimiento ? '' : ' <span class="pill lock" title="No hay registro de que haya aceptado recibir mensajes">sin consentimiento registrado</span>'}</td>
      <td style="white-space:normal">${enviadoHoy(l, 'whatsapp') ? '<span class="pill done">WhatsApp enviado hoy</span> ' : ''}${enviadoHoy(l, 'email') ? '<span class="pill done">Correo enviado hoy</span>' : ''}</td>
      <td style="text-align:right;white-space:nowrap">${n && texto ? `<a class="btn btn-ghost btn-sm" href="https://wa.me/${n}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" data-env-wa="${esc(l.id)}">WhatsApp</a>` : ''}
        ${l.email && texto ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(l.email)}?subject=${encodeURIComponent(`${ofertaDe(clase).nombre}: tu clase y tu lugar`)}&body=${encodeURIComponent(msg)}" data-env-mail="${esc(l.id)}">Correo</a>` : ''}
        ${texto ? `<button type="button" class="btn btn-ghost btn-sm" data-env-copy="${esc(l.id)}">Copiar</button>` : ''}
        <button type="button" class="link" style="color:#b8402f;font-size:.78rem" data-env-parar="${esc(l.id)}" title="Respondió «no» o pidió que no le escribamos: sale de todos los envíos">Pidió parar</button></td></tr>`; };
  const ejemplo = aEnviar[0] ? rellenar(texto, aEnviar[0].l) : '';
  return `${head}${aviso}
  <div class="filters">${chip('data-env-clase', 'pendulo', 'Péndulo Hebreo', clase === 'pendulo')}${chip('data-env-clase', 'tarot', 'Tarot Terapéutico', clase === 'tarot')}</div>
  <div class="filters">${SEGMENTOS.map(([k, t]) => chip('data-env-seg', k, `${t} (${todos.filter((l) => enSegmento(l, k, porId.get(l.id)) && !excluidaDeEnvio(l, porId.get(l.id))).length})`, seg === k)).join('')}</div>
  <section class="card panel"><h3>Texto para: ${esc(SEGMENTOS.find(([k]) => k === seg)[1].toLowerCase())}</h3>
    <p class="muted" style="font-size:.84rem;margin:0">Variables: ${varsEnvio().map((k) => `<code>{{${k}}}</code>`).join(' ')}. Cada una se reemplaza con los datos de la persona.</p>
    ${pendientes ? `<p class="muted" style="font-size:.82rem;margin:0">Hay ${pendientes} inscrita${pendientes === 1 ? '' : 's'} cuya clase aún no termina: se clasifican como «Entró» o «No entró» cuando pasa la ventana (30 minutos después del inicio).</p>` : ''}
    <textarea id="env-texto" rows="7" maxlength="3000" placeholder="Hola {{nombre}}, te dejo el replay de la clase: {{enlace_replay}}&#10;&#10;La inscripción cierra el {{fecha_limite}}." aria-label="Texto del mensaje">${esc(texto)}</textarea>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button class="btn btn-primary btn-sm" data-env-guardar>Guardar texto</button><span class="muted" style="font-size:.8rem">${esEjemplo ? 'Es un texto de ejemplo: edítalo si quieres y guárdalo para dejarlo fijo.' : 'Se guarda para esta clase y este grupo.'}</span></div>
    ${ejemplo ? `<div class="card" style="padding:12px 14px;font-size:.86rem;white-space:pre-wrap"><b style="display:block;margin-bottom:4px">Así le llegaría a ${esc(aEnviar[0].l.name.split(' ')[0])}:</b>${esc(ejemplo)}</div>` : ''}</section>
  <section class="card panel"><div class="panel-h"><h3>${aEnviar.length} persona${aEnviar.length === 1 ? '' : 's'} para escribir</h3><button class="btn btn-ghost btn-sm" data-env-csv>Exportar para correo masivo</button></div>
    ${sinCodigo ? `<p style="font-size:.84rem;color:#b8402f;margin:0"><b>${sinCodigo}</b> no tienen código personal todavía: usa «Preparar contactos» en Interesadas.</p>` : ''}
    <p class="muted" style="font-size:.8rem;margin:0">Reglas: máximo un mensaje por canal por persona al día, nada entre las 22:00 y las 8:00 (Chile), y quien responde «no» o pide parar sale de los envíos. ${excl.length ? `Se dejan fuera ${excl.length} (ya compraron, pidieron no recibir mensajes o no aceptaron).` : ''}</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Persona</th><th>Asistencia</th><th>Hoy</th><th></th></tr></thead><tbody>${aEnviar.map(fila).join('') || '<tr><td colspan="4" class="muted">No hay personas en este grupo.</td></tr>'}</tbody></table></div></section>`;
};
// Las plantillas viven en config/plantillas (solo la Maestra las escribe, ver firestore.rules)
data.plantillas = async () => { A.plantillas = (await getDoc(doc(db, 'config', 'plantillas'))).data() || {}; return A.plantillas; };
async function envioMarcar(l, canal) {
  const clave = `${S.envClase || 'pendulo'}_${S.envSeg || 'entro'}`;
  try {
    const lleva = /\{\{\s*enlace_replay\s*\}\}/.test(textoEnvio(S.envClase || 'pendulo', S.envSeg || 'entro'));
    await data.leads({ action: 'enviado', ids: [l.id], canal, plantilla: clave, ...(lleva ? { replay: true } : {}) });
    if (lleva) l.replayEnviadoT = Date.now();
    l.ultimoEnvio = { ...(l.ultimoEnvio || {}), [canal]: Date.now() };
    l.eventos = [...(l.eventos || []), { t: Date.now(), tipo: 'envio', texto: `Mensaje por ${canal}: ${clave}` }];
    render(false);
  } catch (e) { fail(e); }
}
function exportarEnvioCsv() {
  const clase = S.envClase || 'pendulo', seg = S.envSeg || 'entro', texto = textoEnvio(clase, seg);
  const porId = new Map(personas().flatMap((p) => p.leads.map((l) => [l.id, p])));
  const lista = A.leads.filter((l) => l.form === `clase-${clase}` && enSegmento(l, seg, porId.get(l.id)) && !excluidaDeEnvio(l, porId.get(l.id)));
  const cols = varsEnvio(), cab = ['Nombre', 'Correo', 'WhatsApp', ...cols, 'Mensaje'];
  const fila = (l) => { const v = variablesDe(l); return [l.name, l.email, l.whatsapp, ...cols.map((k) => v[k]), rellenar(texto, l)]; };
  const celda = (x) => { let t = String(x ?? ''); if (/^[=@]|^[+\-](?![\d\s])/.test(t)) t = `'${t}`; return `"${t.replace(/"/g, '""')}"`; };
  const csv = `﻿${[cab, ...lista.map(fila)].map((r) => r.map(celda).join(',')).join('\r\n')}`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = `envio-${clase}-${seg}-${ymd(Date.now())}.csv`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  toast(`Exportadas ${lista.length} personas.`);
}

// Clasificar una clase con el informe de Meet: quienes están en la lista quedan "Asistió confirmado" (o "Entró"); el resto, "No asistió",
// salvo quienes dicen que estuvieron: "No identificada". Primero muestra cómo quedaría; recién con "Aplicar" se guarda.
function clasificarClase() {
  const sesiones = (A.cal || []).filter((e) => ['clase-pendulo', 'clase-tarot'].includes(e.type) && e.date && e.time && !e.tentative).sort((a, b) => b.date.localeCompare(a.date));
  if (!sesiones.length) return toast('Primero agrega la clase en el Calendario (tipo «Clase gratis»).');
  const hoy = ymd(hoyCL()), sugerida = sesiones.find((e) => e.date <= hoy) || sesiones[0];
  dialog(`<span class="eyebrow">Clase gratis</span><h3>Clasificar una clase</h3>
  <p class="muted" style="font-size:.86rem;margin:6px 0 12px">Pega a quienes entraron (informe de asistencia de Google Meet): una persona por línea, con su correo, su teléfono o su nombre. Antes de guardar, ves cómo quedaría cada una.</p>
  <form id="cc-form" style="display:grid;gap:10px">
    <label style="display:grid;gap:4px;font-size:.84rem"><b>Clase</b><select id="cc-sesion">${sesiones.map((e) => `<option value="${esc(e.id)}" ${e.id === sugerida.id ? 'selected' : ''}>${esc(CAL_TYPES[e.type][0])} · ${esc(fechaLarga(e.date))} · ${esc(e.time)}</option>`).join('')}</select></label>
    <label style="display:grid;gap:4px;font-size:.84rem"><b>A quienes están en la lista se les marca</b><select id="cc-nivel"><option value="asistio_confirmado">Asistió confirmado (10 minutos o más en la clase)</option><option value="entro">Entró (solo entró, sin confirmar el tiempo)</option></select></label>
    <label style="display:grid;gap:4px;font-size:.84rem"><b>Lista de quienes entraron</b><textarea id="cc-lista" rows="9" placeholder="ana@correo.com&#10;+56 9 1234 5678&#10;María González"></textarea></label>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm">Ver cómo quedaría</button></div>
    <div id="cc-informe"></div></form>`, true);
  const llamar = async (aplicar) => data.leads({ action: 'clasificar', sesion: $('#cc-sesion').value, nivel: $('#cc-nivel').value, lista: $('#cc-lista').value, aplicar }).then(() => A._ultimo);
  const nombres = (arr) => (arr.length ? `<span style="font-size:.84rem">${arr.slice(0, 40).map((x) => esc(x.nombre)).join(', ')}${arr.length > 40 ? ` y ${arr.length - 40} más` : ''}</span>` : '<span class="muted">Nadie</span>');
  $('#cc-form').onsubmit = async (e) => {
    e.preventDefault();
    if (!$('#cc-lista').value.trim()) return toast('Pega la lista de quienes entraron.');
    try {
      const r = await llamar(false);
      $('#cc-informe').innerHTML = `<div class="card" style="padding:12px 14px;display:grid;gap:8px;font-size:.88rem"><b>Inscritas a esta clase: ${r.total}</b>
        <div><b style="color:#3f7d5c">${r.marcadas.length} marcadas como «${esc(ETAPA_NOMBRE[$('#cc-nivel').value])}»</b><br>${nombres(r.marcadas)}</div>
        <div><b>${r.noAsistio.length} quedan «No asistió»</b><br>${nombres(r.noAsistio)}</div>
        <div><b>${r.noIdentificada.length} quedan «No identificada»</b> <span class="muted">(dijeron que estuvieron, pero no están en la lista)</span><br>${nombres(r.noIdentificada)}</div>
        ${r.sinMatch.length ? `<div><b style="color:#b8402f">${r.sinMatch.length} de tu lista no coinciden con nadie inscrito</b><br><span style="font-size:.84rem">${r.sinMatch.map((x) => esc(x)).join(' · ')}</span><br><span class="muted">Revísalas: pueden haber entrado con otro nombre. Puedes marcarlas a mano desde su ficha.</span></div>` : ''}
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn btn-primary btn-sm" id="cc-aplicar">Aplicar y guardar</button><button type="button" class="btn btn-ghost btn-sm" id="cc-no">Cancelar</button></div></div>`;
      $('#cc-no').onclick = () => $('#dlg').close();
      $('#cc-aplicar').onclick = async () => {
        if (!confirm(`Se cambiará la etapa de ${r.marcadas.length + r.noAsistio.length + r.noIdentificada.length} personas. ¿Aplicar?`)) return;
        $('#cc-aplicar').disabled = true;
        try { await llamar(true); await data.leads({ action: 'all' }); A._per = null; paintNav(); render(false); $('#dlg').close(); toast('Clase clasificada.'); } catch (err) { fail(err); $('#cc-aplicar').disabled = false; }
      };
    } catch (err) { fail(err); }
  };
}
// Deja a cada contacto con su clase, clave de WhatsApp, código personal y enlaces (a los que ya tienen no se les cambia nada)
async function prepararContactos() {
  if (!confirm('Esto les crea a todas las personas su código personal y sus enlaces (entrada y replay). A quienes ya los tienen no se les cambia nada. ¿Seguir?')) return;
  try {
    await data.leads({ action: 'preparar' }); const r = A._ultimo;
    await data.leads({ action: 'all' }); A._per = null; paintNav(); render(false);
    toast(r.actualizadas ? `Listo: ${r.actualizadas} contactos preparados.` : 'Todos los contactos ya estaban preparados.');
  } catch (e) { fail(e); }
}
// Enlaces personales de una persona (para copiar), con revocar y regenerar
const enlacesPersonales = (p) => {
  const ls = p.leads.filter((l) => l.codigo);
  if (!ls.length) return '<span class="muted" style="font-size:.78rem">Aún no tiene código personal. Usa «Preparar contactos» en la lista de Interesadas.</span>';
  return ls.map((l) => {
    const base = l.enlace_entrada ? new URL(l.enlace_entrada).origin : '';
    const filas = [['Entrada a la clase', l.enlace_entrada], ['Replay', l.enlace_replay], ...(FUNC.autodeclaracion ? [['Botón «Sí estuve»', base && `${base}/confirmar?l=${l.codigo}&r=si`], ['Botón «No pude entrar»', base && `${base}/confirmar?l=${l.codigo}&r=no`]] : []), ...(FUNC.palabraAsistencia ? [['Código de asistencia', base && `${base}/asistencia?l=${l.codigo}`]] : [])].filter(([, u]) => u);
    return `<div class="pg" style="gap:6px"><b style="font-size:.8rem">${esc(LEAD_FORMS[l.form] || l.form)}</b>${l.codigoRevocado ? '<span class="pill bad">Código revocado</span>' : ''}
      <span class="muted" style="font-size:.74rem">Código <code>${esc(l.codigo)}</code>${l.codigoVence ? ` · vence ${esc(fechaLarga(ymd(l.codigoVence)))}` : ''}</span>
      <div style="display:flex;gap:4px;flex-wrap:wrap">${filas.map(([t, u]) => `<button type="button" class="chip" data-copiar="${esc(u)}" title="${esc(u)}">Copiar: ${esc(t)}</button>`).join('')}</div>
      <div style="display:flex;gap:10px"><button type="button" class="link" style="color:#b8402f;font-size:.78rem" data-codigo="${esc(l.id)}|revocar">Revocar código</button><button type="button" class="link" style="font-size:.78rem" data-codigo="${esc(l.id)}|regenerar">Regenerar</button></div></div>`;
  }).join('');
};
// ---------- Matrículas: clic sin pago, reserva del Péndulo, cuotas del Tarot, oferta por cerrar, cupos y configuración por clase ----------
// Valores de partida de cada oferta (los mismos que usa el servidor). Lo que la Maestra guarda en «Clases y ofertas» (config/clases.ofertas) manda sobre esto.
const OFERTA_UI = {
  pendulo: { nombre: 'Péndulo Hebreo', claseDia: 'sábado', claseHora: '19:00', cierre: ['2026-11-18', '17:00'], inicio: '2026-11-18', precio: 69900, moneda: 'CLP', reserva: 10000, cupos: null, listaEspera: true, ventanaAntes: 10, ventanaDespues: 30, palabra: '', texto: '' },
  tarot: { nombre: 'Tarot Terapéutico', claseDia: 'martes', claseHora: '19:00', cierre: ['2026-11-26', '17:00'], inicio: '2026-11-26', precio: 70, moneda: 'USD', cuotas: 2, cupos: null, listaEspera: true, ventanaAntes: 10, ventanaDespues: 30, palabra: '', texto: '' },
};
const FECHA_OK = /^\d{4}-\d{2}-\d{2}$/, HORA_OK = /^([01]\d|2[0-3]):[0-5]\d$/;
const ofertaDe = (clase) => {
  const b = OFERTA_UI[clase]; if (!b) return null;
  const o = A.clases?.ofertas?.[clase] || {}, num = (v, d) => (v !== '' && v != null && Number.isFinite(Number(v)) ? Number(v) : d);
  return {
    ...b, nombre: o.nombre || b.nombre, claseDia: o.claseDia || b.claseDia, claseHora: HORA_OK.test(o.claseHora || '') ? o.claseHora : b.claseHora,
    cierre: FECHA_OK.test(o.cierreFecha || '') && HORA_OK.test(o.cierreHora || '') ? [o.cierreFecha, o.cierreHora] : b.cierre, inicio: FECHA_OK.test(o.inicio || '') ? o.inicio : b.inicio,
    precio: num(o.precio, b.precio), reserva: num(o.reserva, b.reserva), cuotas: num(o.cuotas, b.cuotas), moneda: /^[A-Z]{3}$/.test(o.moneda || '') ? o.moneda : b.moneda,
    cupos: 'cupos' in o ? (o.cupos === '' || o.cupos == null ? null : num(o.cupos, b.cupos)) : b.cupos, listaEspera: typeof o.listaEspera === 'boolean' ? o.listaEspera : b.listaEspera,
    ventanaAntes: num(o.ventanaAntes, b.ventanaAntes), ventanaDespues: num(o.ventanaDespues, b.ventanaDespues), palabra: o.palabra ?? b.palabra, texto: o.texto ?? b.texto,
  };
};
const clp = (n) => `$${Number(n || 0).toLocaleString('es-CL')}`;
const dinero = (n, mon) => (mon === 'USD' ? `${Number(n || 0).toLocaleString('es-CL')} USD` : clp(n));
const claseDeForm = (f) => ({ 'clase-pendulo': 'pendulo', pendulo: 'pendulo', 'clase-tarot': 'tarot', tarot: 'tarot' })[f] || '';
const claseDeL = (l) => l.clase || claseDeForm(l.form);
// 'AAAA-MM-DD' + 'HH:MM' en hora de Chile -> ms (con su cambio de horario)
const chileAMs = (fecha, hora) => {
  const [y, m, d] = fecha.split('-').map(Number), [h, mi] = hora.split(':').map(Number), base = Date.UTC(y, m - 1, d, h, mi);
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
  const off = (t) => { const p = Object.fromEntries(fmt.formatToParts(new Date(t)).map((x) => [x.type, +x.value])); return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(t / 1000) * 1000; };
  return base - off(base - off(base));
};
const cierreMs = (clase) => { const o = ofertaDe(clase); return o ? chileAMs(o.cierre[0], o.cierre[1]) : 0; };
const fechaLimite = (clase) => { const o = ofertaDe(clase); if (!o) return ''; const d = new Date(`${o.cierre[0]}T00:00:00Z`); return `${DIAS_L[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES_L[d.getUTCMonth()]} a las ${o.cierre[1]} (hora de Chile)`; };
const fechaCorta = (ms) => (ms ? new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', day: 'numeric', month: 'short' }).format(new Date(ms)) : '');
const diasDesde = (ms) => Math.max(0, Math.floor((Date.now() - ms) / 864e5));
const embApi = async (body) => {
  const r = await fetch('/api/embudo', { method: 'POST', headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(out.error === 'cupos_llenos' ? 'Los cupos están llenos.' : out.error || 'No se pudo completar la acción.'); e.codigo = out.error; e.datos = out; throw e; }
  return out;
};

// ----- Pagos
const pagoHecho = (l) => !!(l.pago?.t || (l.pagos || []).length || l.saldoPagado) || esInscrita(leadEtapa(l));
const clicSinPago = (l) => esClase(l.form) && !!l.compraClicT && !pagoHecho(l) && !l.reservaPagada && leadEtapa(l) !== 'descartado';
const filasClic = () => personas().map((p) => { const ls = p.leads.filter(clicSinPago).sort((a, b) => b.compraClicT - a.compraClicT); return ls.length ? { p, l: ls[0] } : null; }).filter(Boolean)
  .sort((a, b) => (S.clicOrden === 'antiguos' ? a.l.compraClicT - b.l.compraClicT : b.l.compraClicT - a.l.compraClicT));
// Ya vio la oferta (replay o clic) y no ha pagado, reservado ni respondido por WhatsApp
const respondioDespues = (l) => { const n = waNum(l.whatsapp), c = n && A.wa.chats.find((x) => x.id === n); return (c?.lastInboundAt?.toMillis?.() || 0) > (l.replayT || l.compraClicT || 0); };
const vioOfertaSinRespuesta = (l, p) => esClase(l.form) && (['vio_oferta', 'vio_replay'].includes(leadEtapa(l)) || !!l.replayT || !!l.compraClicT) && !pagoHecho(l) && !l.reservaPagada
  && !['descartado', 'reservo_cupo', 'lista_espera'].includes(leadEtapa(l)) && !(p?.tags || []).includes('No contactar') && !l.noContactar && !respondioDespues(l); // en lista de espera no se les apura: el curso está lleno
const pagoBadges = (l) => {
  const b = [];
  if (FUNC.reserva && l.reservaPagada) b.push(`<span class="pill pres" title="Reserva pagada por WhatsApp">Reserva ${clp(l.reservaMonto)}</span>`);
  if (FUNC.reserva && l.reservaPagada && !pagoHecho(l)) b.push(`<span class="pill bad" title="Debe pagarse antes de la primera clase">Saldo ${clp(Math.max(0, ofertaDe('pendulo').precio - (l.reservaMonto || 0)))}</span>`);
  if (FUNC.cuotas && claseDeL(l) === 'tarot' && ((l.pagos || []).length || l.pago)) { const t = ofertaDe('tarot').cuotas || 2, n = Math.min(t, (l.pagos || []).length || 1); b.push(`<span class="pill ${n >= t ? 'done' : 'pres'}" title="Cuotas pagadas del Tarot">Cuotas ${n}/${t}</span>`); }
  if (FUNC.cuotas && l.cobroFallido) b.push('<span class="pill bad" title="Un cobro falló: escribirle hoy">Cobro fallido</span>');
  return b.join(' ');
};
const pagoPersona = (p) => p.leads.filter((l) => esClase(l.form)).map(pagoBadges).filter(Boolean).join(' ');
const origenMatricula = (l) => `Clase gratis de ${(ofertaDe(claseDeL(l))?.nombre || '').replace(' Hebreo', '').replace(' Terapéutico', '')}${l.claseFecha ? ` del ${l.claseFecha}` : ''} · campaña ${l.utm?.utm_campaign || '—'} · anuncio ${l.utm?.utm_content || '—'}`;
// Bloque de la ficha: reserva y saldo (Péndulo) o cuotas (Tarot)
const bloquePago = (l) => {
  const clase = claseDeL(l), o = ofertaDe(clase), id = esc(l.id);
  if (!o || !esClase(l.form) || (clase === 'tarot' ? !FUNC.cuotas : !FUNC.reserva)) return '';
  const clic = l.compraClicT ? `<span class="muted" style="font-size:.78rem">Hizo clic en «inscribirme» el ${esc(fechaCorta(l.compraClicT))}${pagoHecho(l) || l.reservaPagada ? '' : ' y todavía no paga'}.</span>` : '';
  const origen = pagoHecho(l) || l.reservaPagada ? `<span class="muted" style="font-size:.76rem">Origen: ${esc(origenMatricula(l))}</span>` : '';
  if (clase === 'tarot') {
    const pagos = l.pagos?.length ? l.pagos : l.pago ? [l.pago] : [], t = o.cuotas || 2, n = Math.min(t, pagos.length);
    const fallo = l.cobroFallido ? `<div class="alert" style="margin:0"><div><b>Cobro fallido: escribirle hoy</b><p>El ${esc(fechaCorta(l.cobroFallido.t))}${l.cobroFallido.monto ? ` no se pudo cobrar ${esc(dinero(l.cobroFallido.monto, (l.cobroFallido.moneda || '').toUpperCase()))}` : ' falló un cobro'}. Sigue matriculada.</p></div></div>` : '';
    if (!pagos.length) return clic || fallo ? `<div class="pg-pago">${fallo}${clic}</div>` : '';
    const sig = n < t && pagos[0]?.t ? (() => { const d = new Date(pagos[0].t); d.setMonth(d.getMonth() + 1); return d.getTime(); })() : 0;
    return `<div class="pg-pago">${fallo}<b>Cuotas pagadas ${n}/${t}</b><div style="display:flex;gap:6px;flex-wrap:wrap">${Array.from({ length: t }, (_, i) => `<span class="pill ${i < n ? 'done' : 'lock'}">${i + 1}/${t} ${i < n ? '✓' : 'pendiente'}</span>`).join(' ')}</div>
      <span class="muted" style="font-size:.78rem">${pagos.slice(0, t).map((x) => `${esc(dinero(x.monto, (x.moneda || '').toUpperCase()))} el ${esc(fechaCorta(x.t))}`).join(' · ')}${sig ? ` · la siguiente se cobra un mes después (hacia el ${esc(fechaCorta(sig))})` : ''}</span>${origen}</div>`;
  }
  const reserva = l.reservaPagada ? Number(l.reservaMonto) || 0 : 0, saldo = Math.max(0, o.precio - reserva);
  if (pagoHecho(l)) return `<div class="pg-pago"><b>Matrícula pagada completa</b><span style="font-size:.86rem">${esc(dinero(o.precio, o.moneda))}${l.reservaPagada ? ` (reserva ${esc(clp(reserva))} + saldo ${esc(clp(saldo))})` : ''}</span>${origen}</div>`;
  if (l.reservaPagada) return `<div class="pg-pago"><b>Reserva pagada · ${esc(clp(reserva))}</b><span style="font-size:.86rem">Pagada el ${esc(fechaCorta(l.reservaFecha))}. <b>Saldo pendiente ${esc(clp(saldo))}</b>: debe pagarse antes de la primera clase (${esc(fechaLarga(o.inicio))}).</span>${origen}
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button type="button" class="btn btn-primary btn-sm" data-reserva="${id}|saldo">Marcar saldo pagado</button><button type="button" class="link" style="color:#b8402f" data-reserva="${id}|deshacer">Deshacer reserva</button></div></div>`;
  return `<div class="pg-pago"><b>Reserva y saldo</b><span class="muted" style="font-size:.82rem">Reserva ${esc(clp(o.reserva))} por WhatsApp · saldo ${esc(clp(Math.max(0, o.precio - o.reserva)))} antes de la primera clase.</span>${clic}
    <button type="button" class="btn btn-ghost btn-sm" data-reserva="${id}|pagar">Marcar reserva pagada (${esc(clp(o.reserva))})</button></div>`;
};

// ----- Cupos y lista de espera
const ocupaCupo = (l) => ['reservo_cupo', 'matriculada'].includes(leadEtapa(l)) || (['pendulo', 'tarot'].includes(l.form) && leadEtapa(l) === 'inscrita');
const cuposDe = (clase) => {
  const o = ofertaDe(clase), ps = personas();
  const ocupados = ps.filter((p) => p.leads.some((l) => claseDeL(l) === clase && ocupaCupo(l))).length;
  const espera = ps.filter((p) => p.leads.some((l) => claseDeL(l) === clase && esClase(l.form) && leadEtapa(l) === 'lista_espera')).length;
  return { cupos: o.cupos, ocupados, espera, lleno: o.cupos != null && ocupados >= o.cupos, nombre: o.nombre };
};
const cuposHTML = () => !FUNC.listaEspera ? '' : ['pendulo', 'tarot'].map((c) => {
  const k = cuposDe(c); if (k.cupos == null) return '';
  const pct = Math.min(100, Math.round((k.ocupados / (k.cupos || 1)) * 100));
  return `<div class="cupo ${k.lleno ? 'lleno' : ''}"><div class="cupo-top"><b>${esc(k.nombre)}</b><span>${k.ocupados} de ${k.cupos} cupos${k.lleno ? ' · LLENO' : ''}${k.espera ? ` · ${k.espera} en lista de espera` : ''}</span></div><div class="cupo-barra"><i style="width:${pct}%"></i></div></div>`;
}).join('');

// ----- La oferta cierra en menos de 48 horas
const ofertasPorCerrar = () => ['pendulo', 'tarot'].map((clase) => {
  const ms = cierreMs(clase) - Date.now();
  if (!(ms > 0 && ms <= 48 * 36e5)) return null;
  const filas = personas().flatMap((p) => p.leads.filter((l) => claseDeL(l) === clase && vioOfertaSinRespuesta(l, p)).map((l) => ({ p, l })));
  return { clase, horas: Math.ceil(ms / 36e5), filas };
}).filter(Boolean);
const ofertaBanner = () => ofertasPorCerrar().map((o) => `<div class="alert"><div><b>La oferta del ${esc(ofertaDe(o.clase).nombre)} cierra en ${o.horas} hora${o.horas === 1 ? '' : 's'}</b><p>${o.filas.length ? `${o.filas.length} persona${o.filas.length === 1 ? '' : 's'} vieron la oferta y no han respondido.` : 'Todas las que vieron la oferta ya respondieron.'}</p></div>${o.filas.length ? `<span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-crm-lista="oferta:${o.clase}">Ver lista</button><button class="btn" data-env-ir="${o.clase}">Escribirles</button></span>` : ''}</div>`).join('') + avisosSeguimiento();

// ----- Lista de seguimiento: clic en inscribirme sin pago, o vio la oferta sin responder
const listaMatricula = () => {
  const modo = S.crmLista || '', clase = modo.startsWith('oferta:') ? modo.split(':')[1] : '';
  if (modo === 'replay' || modo === 'fallido') return listaSeguimiento(modo);
  const filas = clase
    ? personas().flatMap((p) => p.leads.filter((l) => claseDeL(l) === clase && vioOfertaSinRespuesta(l, p)).map((l) => ({ p, l }))).sort((a, b) => (b.l.compraClicT || b.l.replayT || 0) - (a.l.compraClicT || a.l.replayT || 0))
    : filasClic();
  const titulo = clase ? `Vieron la oferta del ${esc(ofertaDe(clase).nombre)} y no han respondido` : 'Hicieron clic en «inscribirme» y no pagaron';
  const msj = (p, l) => (clase
    ? `Hola ${String(p.nombre).split(' ')[0]}, te escribo para avisarte que la inscripción al curso de ${ofertaDe(claseDeL(l)).nombre} cierra el ${fechaLimite(claseDeL(l))}. ¿Tienes alguna duda que te pueda resolver?`
    : `Hola ${String(p.nombre).split(' ')[0]}, vi que entraste a inscribirte al curso de ${ofertaDe(claseDeL(l)).nombre}. ¿Te puedo ayudar con algo o resolverte alguna duda?`);
  const fila = ({ p, l }) => { const t = l.compraClicT || l.replayT || 0, n = waNum(p.whatsapp);
    return `<tr><td class="persona"><button class="link nom" data-lead-open="${esc(p.id)}">${esc(p.nombre)}</button><br><span class="muted" style="font-size:.84rem">${contactoDe(p)}</span></td>
      <td>${esc(ofertaDe(claseDeL(l)).nombre)}</td><td class="muted" style="font-size:.84rem">${l.compraClicT ? 'Clic en inscribirme' : 'Vio el replay'}<br>${esc(fechaCorta(t))}</td>
      <td><b>${t ? diasDesde(t) : '—'}</b> <span class="muted" style="font-size:.8rem">día${diasDesde(t) === 1 ? '' : 's'}</span></td>
      <td>${esc(etapaTxt(l.form, leadEtapa(l)))} ${pagoBadges(l)}</td>
      <td style="text-align:right;white-space:nowrap">${n ? `<a class="btn btn-primary btn-sm" href="https://wa.me/${n}?text=${encodeURIComponent(msj(p, l))}" target="_blank" rel="noopener">WhatsApp</a>` : '<span class="muted">sin WhatsApp</span>'}</td></tr>`; };
  return `<div class="crm-hint"><button type="button" class="link" data-crm-lista="">← Volver al CRM</button>${clase ? '' : `<span style="display:flex;gap:8px;align-items:center">Orden:<span class="seg"><button type="button" data-clic-orden="recientes" aria-pressed="${S.clicOrden !== 'antiguos'}">Más recientes primero</button><button type="button" data-clic-orden="antiguos" aria-pressed="${S.clicOrden === 'antiguos'}">Más antiguos primero</button></span></span>`}</div>
    <section class="card panel"><div class="panel-h"><h3>${titulo} (${filas.length})</h3></div>
    <p class="muted" style="font-size:.82rem;margin:0">El botón de WhatsApp abre la conversación con el mensaje ya escrito; lo revisas antes de enviar.</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Persona</th><th>Curso</th><th>Qué hizo</th><th>Hace</th><th>Estado</th><th></th></tr></thead><tbody>${filas.map(fila).join('') || '<tr><td colspan="6" class="muted">No hay nadie en esta lista.</td></tr>'}</tbody></table></div></section>`;
};

// ----- Seguimiento: «No abrió el replay» (24 h o más después de enviárselo) y «Cobro fallido» (cuota del Tarot que no se pudo cobrar)
const replaySinAbrir = (l, p) => esClase(l.form) && !!l.replayEnviadoT && Date.now() - l.replayEnviadoT >= 24 * 36e5 && !l.replayT && leadEtapa(l) !== 'vio_replay'
  && !pagoHecho(l) && !l.reservaPagada && !['descartado', 'reservo_cupo', 'lista_espera'].includes(leadEtapa(l)) && !(p?.tags || []).includes('No contactar') && !l.noContactar && !(l.seguimientoReplayT > l.replayEnviadoT);
const filasReplay = () => personas().flatMap((p) => p.leads.filter((l) => replaySinAbrir(l, p)).map((l) => ({ p, l }))).sort((a, b) => a.l.replayEnviadoT - b.l.replayEnviadoT);
const filasFallidas = () => personas().flatMap((p) => p.leads.filter((l) => esClase(l.form) && l.cobroFallido).map((l) => ({ p, l }))).sort((a, b) => b.l.cobroFallido.t - a.l.cobroFallido.t);
const avisosSeguimiento = () => {
  const r = filasReplay().length, f = FUNC.cuotas ? filasFallidas().length : 0;
  return [f ? `<div class="alert"><div><b>${f} cobro${f === 1 ? '' : 's'} fallido${f === 1 ? '' : 's'}</b><p>Cobro fallido: escribirle hoy. La persona sigue matriculada; solo hay que ayudarle con el pago.</p></div><button class="btn" data-crm-lista="fallido">Ver lista</button></div>` : '', r ? `<div class="alert"><div><b>${r} persona${r === 1 ? '' : 's'} no abrieron el replay</b><p>Ya se lo enviaste hace 24 horas o más y no lo han visto. Pregúntales: «¿Pudiste ver la clase?».</p></div><button class="btn" data-crm-lista="replay">Ver lista</button></div>` : ''].join('');
};
const listaSeguimiento = (modo) => {
  const replay = modo === 'replay', filas = replay ? filasReplay() : filasFallidas();
  const msj = (p, l) => (replay ? `Hola ${String(p.nombre).split(' ')[0]}, ¿pudiste ver la clase?` : `Hola ${String(p.nombre).split(' ')[0]}, vi que no se pudo cobrar tu cuota del curso de ${ofertaDe(claseDeL(l)).nombre}. ¿Te ayudo a revisarlo?`);
  const fila = ({ p, l }) => { const t = replay ? l.replayEnviadoT : l.cobroFallido.t, n = waNum(p.whatsapp), h = Math.floor((Date.now() - t) / 36e5);
    const que = replay ? 'Se le envió el replay y no lo ha abierto' : `Cobro fallido${l.cobroFallido.monto ? `: ${dinero(l.cobroFallido.monto, (l.cobroFallido.moneda || '').toUpperCase())}` : ''}`;
    return `<tr><td class="persona"><button class="link nom" data-lead-open="${esc(p.id)}">${esc(p.nombre)}</button><br><span class="muted" style="font-size:.84rem">${contactoDe(p)}</span></td>
      <td>${esc(ofertaDe(claseDeL(l)).nombre)}</td><td class="muted" style="font-size:.84rem">${esc(que)}<br>${esc(fechaCorta(t))}</td>
      <td><b>${h < 48 ? h : Math.floor(h / 24)}</b> <span class="muted" style="font-size:.8rem">${h < 48 ? 'horas' : 'días'}</span></td>
      <td>${esc(etapaTxt(l.form, leadEtapa(l)))} ${pagoBadges(l)}</td>
      <td style="text-align:right;white-space:nowrap">${n ? `<a class="btn btn-primary btn-sm" href="https://wa.me/${n}?text=${encodeURIComponent(msj(p, l))}" target="_blank" rel="noopener" ${replay ? `data-seg-replay="${esc(l.id)}"` : ''}>WhatsApp</a>` : '<span class="muted">sin WhatsApp</span>'}</td></tr>`; };
  return `<div class="crm-hint"><button type="button" class="link" data-crm-lista="">← Volver al CRM</button></div>
    <section class="card panel"><div class="panel-h"><h3>${replay ? 'No abrieron el replay' : 'Cobro fallido: escribirles hoy'} (${filas.length})</h3></div>
    <p class="muted" style="font-size:.82rem;margin:0">${replay ? 'Ya se les envió el replay hace 24 horas o más y no hay registro de que lo hayan visto. Al abrir WhatsApp salen de esta lista.' : 'No cambia su etapa (siguen Matriculadas). El aviso se quita solo cuando se confirma un pago nuevo.'}</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Persona</th><th>Curso</th><th>Qué pasó</th><th>Hace</th><th>Estado</th><th></th></tr></thead><tbody>${filas.map(fila).join('') || '<tr><td colspan="6" class="muted">No hay nadie en esta lista.</td></tr>'}</tbody></table></div></section>`;
};

// ----- Origen de cada matrícula (en Métricas)
const matriculasHTML = () => {
  const filas = personas().flatMap((p) => p.leads.filter((l) => esClase(l.form) && ['reservo_cupo', 'matriculada'].includes(leadEtapa(l))).map((l) => ({ p, l, t: l.pago?.t || l.saldoFecha || l.reservaFecha || l.updatedAt || l.createdAt || 0 }))).sort((a, b) => b.t - a.t);
  const porCamp = new Map();
  filas.forEach(({ l }) => { const k = `${ofertaDe(claseDeL(l)).nombre} · ${l.utm?.utm_campaign || '(sin campaña)'}`; porCamp.set(k, (porCamp.get(k) || 0) + 1); });
  const pagado = (l) => { const o = ofertaDe(claseDeL(l)); if (claseDeL(l) === 'tarot') { const n = Math.min(o.cuotas || 2, (l.pagos || []).length || (l.pago ? 1 : 0)); return `Cuotas ${n}/${o.cuotas || 2}`; } return pagoHecho(l) ? 'Pagada completa' : l.reservaPagada ? `Reserva ${clp(l.reservaMonto)}` : '—'; };
  return `<section class="card panel"><h3>Origen de las matrículas</h3><p class="muted" style="font-size:.84rem;margin:0">Cada reserva o matrícula con la clase gratis y la campaña de donde llegó.</p>
    ${filas.length ? `<div style="display:flex;gap:6px;flex-wrap:wrap">${[...porCamp.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `<span class="pill pres">${esc(k)}: ${n}</span>`).join('')}</div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Persona</th><th>Curso</th><th>Estado</th><th>Pagado</th><th>Fecha</th><th>Clase gratis</th><th>Campaña</th><th>Anuncio</th><th>Origen</th></tr></thead><tbody>
    ${filas.map(({ p, l, t }) => `<tr><td><button class="link nom" data-lead-open="${esc(p.id)}">${esc(p.nombre)}</button></td><td>${esc(ofertaDe(claseDeL(l)).nombre)}</td><td>${esc(etapaTxt(l.form, leadEtapa(l)))}</td><td>${esc(pagado(l))}</td><td class="muted">${esc(fechaCorta(t))}</td><td class="muted">${esc(l.claseFecha || '—')}</td><td>${esc(l.utm?.utm_campaign || '—')}</td><td>${esc(l.utm?.utm_content || '—')}</td><td>${esc(l.utm?.utm_source || 'directo')}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Todavía no hay reservas ni matrículas.</p>'}</section>`;
};

// ----- Clases gratis del aula: las ve toda cuenta (pagada o no) en /aula, sección «Clases gratis». Se guardan en config/clasesGratis.clases
// [{ id, grupo: 'pendulo' | 'tarot', titulo, video, orden, gratis }]. Sin «Gratis» marcado, la clase queda oculta (borrador).
const GRATIS_GRUPOS = [['pendulo', 'Péndulo Hebreo'], ['tarot', 'Tarot Terapéutico']];
const gratisBorrador = () => (A.gratisDraft ||= (A.gratis || []).map((c) => ({ ...c })));
const gratisNuevoId = () => `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
// Pasa lo que está escrito en pantalla al borrador (antes de agregar, quitar o guardar)
const gratisLeer = () => document.querySelectorAll('[data-gr-id]').forEach((fila) => {
  const c = gratisBorrador().find((x) => x.id === fila.dataset.grId); if (!c) return;
  const v = (k) => fila.querySelector(`[data-gr="${k}"]`);
  c.titulo = v('titulo').value.trim(); c.video = v('video').value.trim(); c.orden = Number(v('orden').value) || 0; c.gratis = v('gratis').checked;
});
V.gratis = () => {
  const base = location.origin, L = gratisBorrador();
  const urls = [['Registro (para el botón de la página del replay)', `${base}/login?register=true&origen=clase-gratis&ver=gratis`], ['Sección «Clases gratis» (quien ya tiene cuenta)', `${base}/aula?ver=gratis`]];
  const grupo = ([g, nombre]) => {
    const f = L.filter((c) => c.grupo === g).sort((a, b) => (Number(a.orden) || 0) - (Number(b.orden) || 0));
    return `<section class="card panel"><h3>${esc(nombre)}</h3>
      <div class="gr-rows">${f.map((c) => `<div class="gr-fila" data-gr-id="${esc(c.id)}">
        <label>Orden<input data-gr="orden" type="number" min="1" step="1" value="${esc(c.orden ?? '')}"></label>
        <label>Título de la clase<input data-gr="titulo" type="text" maxlength="120" value="${esc(c.titulo || '')}" placeholder="Clase 1 · …"></label>
        <label>Enlace del video<input data-gr="video" type="url" value="${esc(c.video || '')}" placeholder="https://youtu.be/… o https://vimeo.com/…"></label>
        <label class="cfg-chk"><input data-gr="gratis" type="checkbox" ${c.gratis !== false ? 'checked' : ''}><span>Gratis</span></label>
        <button type="button" class="btn btn-ghost btn-sm" data-gr-quitar="${esc(c.id)}">Quitar</button></div>`).join('') || '<p class="muted" style="margin:0">Aún no hay clases en este grupo.</p>'}</div>
      <div><button type="button" class="btn btn-ghost btn-sm" data-gr-agregar="${g}">+ Agregar clase</button></div></section>`;
  };
  return `<div class="crm-head"><div><span class="eyebrow">Aula</span><h1>Clases gratis del aula</h1></div><a class="btn btn-ghost btn-sm" href="/aula?ver=gratis" target="_blank" rel="noopener">Ver como la ven ellas</a></div>
    <p class="muted" style="max-width:46em;margin:0">Cualquier persona con cuenta del aula, aunque no haya pagado, ve estas clases en «Clases gratis». El resto del aula sigue cerrado para quien no pagó. El número de «Orden» define cómo se ven; con «Gratis» desmarcado la clase queda oculta mientras la preparas.</p>
    <section class="card panel"><h3>Enlaces para la página del replay</h3><div style="display:grid;gap:8px">${urls.map(([t, u]) => `<div style="display:grid;gap:2px"><small class="muted">${esc(t)}</small><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><code style="word-break:break-all">${esc(u)}</code><button type="button" class="btn btn-ghost btn-sm" data-copiar="${esc(u)}">Copiar</button></div></div>`).join('')}</div></section>
    <form id="gr-form" style="display:grid;gap:16px">${GRATIS_GRUPOS.map(grupo).join('')}<div style="position:sticky;bottom:0;padding:12px 0;background:var(--bg)"><button class="btn btn-primary">Guardar clases gratis</button></div></form>`;
};
async function guardarGratis() {
  gratisLeer();
  const lista = [];
  for (const c of gratisBorrador()) {
    if (!c.titulo && !c.video) continue; // fila vacía: no se guarda
    if (!c.titulo) return toast('Cada clase necesita un título.');
    if (c.video && !isHttps(c.video)) return toast(`El enlace del video de «${c.titulo}» debe empezar con https://`);
    if (c.gratis !== false && !c.video) return toast(`«${c.titulo}»: agrega el enlace del video, o desmarca «Gratis» para dejarla oculta.`);
    lista.push({ id: c.id, grupo: c.grupo, titulo: c.titulo, video: c.video || '', orden: Number(c.orden) || 0, gratis: c.gratis !== false });
  }
  try { await data.saveGratis(lista); render(false); toast('Clases gratis guardadas.'); } catch (e) { fail(e); }
}

// ----- Clases y ofertas: configuración por clase (se guarda en config/clases)
V.clases = () => {
  const head = '<div class="crm-head"><div><span class="eyebrow">CRM</span><h1>Clases y ofertas</h1></div></div><p class="muted" style="max-width:46em;margin:0">Lo que dejes vacío usa el valor de respaldo (el que aparece en gris). Los cambios se aplican en todo el sitio: páginas del replay, avisos, cupos y el CRM.</p>';
  const c = (clase) => {
    const b = OFERTA_UI[clase], o = A.clases?.ofertas?.[clase] || {}, f = (k, etq, tipo, ph, extra = '', val = o[k]) => `<label class="cfg-f"><b>${etq}</b><input data-cfg="${clase}.${k}" type="${tipo}" value="${esc(val ?? '')}" placeholder="${esc(ph ?? '')}" ${extra}>${tipo === 'date' || tipo === 'time' ? `<small class="muted" style="font-weight:400">Si está vacío se usa: ${esc(ph)}</small>` : ''}</label>`;
    const sala = clase === 'pendulo' ? A.clases?.enlacePendulo : A.clases?.enlaceTarot, replay = clase === 'pendulo' ? A.clases?.replayPendulo : A.clases?.replayTarot, videoG = clase === 'pendulo' ? A.clases?.videoGraciasPendulo : A.clases?.videoGraciasTarot;
    return `<section class="card panel"><h3>${esc(b.nombre)}</h3>
      <div class="cfg-g">${f('nombre', 'Nombre del curso', 'text', b.nombre)}${f('claseDia', 'Día de la clase gratis', 'text', b.claseDia)}${f('claseHora', 'Hora de la clase gratis (Chile)', 'time', b.claseHora)}
        <label class="cfg-f"><b>Enlace de Google Meet de la clase (sala real)</b><input data-cfg="${clase}.sala" type="url" value="${esc(sala || '')}" placeholder="https://meet.google.com/…"><small class="muted" style="font-weight:400">No se muestra a las alumnas: usan su enlace personal. Usa siempre la misma sala para esta clase.</small></label>
        <label class="cfg-f"><b>Enlace del replay</b><input data-cfg="${clase}.replay" type="url" value="${esc(replay || '')}" placeholder="https://youtu.be/…"></label>
        <label class="cfg-f"><b>Video de bienvenida de Karen (página de gracias)</b><input data-cfg="${clase}.videoGracias" type="url" value="${esc(videoG || '')}" placeholder="https://youtu.be/… o https://vimeo.com/…"><small class="muted" style="font-weight:400">Se muestra en /clase-${clase}/gracias. YouTube o Vimeo, con https.</small></label>
        ${f('inicio', 'Inicio del curso', 'date', b.inicio)}${f('cierreFecha', 'Cierre de inscripción: fecha', 'date', b.cierre[0])}${f('cierreHora', 'Cierre: hora (Chile)', 'time', b.cierre[1])}
        ${f('precio', `Precio (${b.moneda})`, 'number', String(b.precio), 'min="0" step="any"')}
        <label class="cfg-f"><b>Moneda</b><select data-cfg="${clase}.moneda">${['CLP', 'USD'].map((m) => `<option ${(o.moneda || b.moneda) === m ? 'selected' : ''}>${m}</option>`).join('')}</select></label>
        ${clase === 'pendulo' ? (FUNC.reserva ? f('reserva', 'Reserva por WhatsApp (CLP)', 'number', String(b.reserva), 'min="0"') : '') : (FUNC.cuotas ? f('cuotas', 'Cuotas', 'number', String(b.cuotas), 'min="1" max="12"') : '')}
        ${FUNC.listaEspera ? `${f('cupos', 'Cupos máximos (vacío = sin límite)', 'number', 'sin límite', 'min="0"')}
        <label class="cfg-f cfg-chk"><input data-cfg="${clase}.listaEspera" type="checkbox" ${(typeof o.listaEspera === 'boolean' ? o.listaEspera : b.listaEspera) ? 'checked' : ''}><span>Abrir lista de espera cuando se llenen los cupos</span></label>` : ''}
        ${FUNC.palabraAsistencia ? f('palabra', 'Palabra de asistencia por defecto', 'text', 'se define en cada clase del Calendario') : ''}${f('ventanaAntes', 'Ventana: minutos antes de la clase', 'number', String(b.ventanaAntes), 'min="0" max="240"')}${f('ventanaDespues', 'Ventana: minutos después del inicio', 'number', String(b.ventanaDespues), 'min="0" max="240"')}</div>
      <label class="cfg-f"><b>Texto de la oferta</b><textarea data-cfg="${clase}.texto" rows="4" maxlength="1500" placeholder="Lo que se muestra junto a la fecha límite en la página del replay">${esc(o.texto || '')}</textarea></label></section>`;
  };
  return `${head}<form id="cfg-form" style="display:grid;gap:16px">${c('pendulo')}${c('tarot')}<div style="position:sticky;bottom:0;padding:12px 0;background:var(--bg)"><button class="btn btn-primary">Guardar clases y ofertas</button></div></form>`;
};
async function guardarClases(form) {
  const v = {}, pon = (el) => { const [clase, k] = el.dataset.cfg.split('.'); (v[clase] ||= {})[k] = el.type === 'checkbox' ? el.checked : el.value.trim(); };
  document.querySelectorAll('[data-cfg]').forEach(pon);
  const ofertas = {};
  for (const clase of ['pendulo', 'tarot']) {
    const x = { ...(v[clase] || {}) }, o = {}, previo = A.clases?.ofertas?.[clase] || {};
    for (const k of ['reserva', 'cuotas', 'cupos', 'listaEspera', 'palabra']) if (!(k in x)) x[k] = previo[k] ?? (k === 'listaEspera' ? undefined : ''); // campo oculto: no se pisa lo guardado
    for (const k of ['sala', 'replay']) if (x[k] && !isHttps(x[k])) return toast('Los enlaces deben empezar con https://');
    if (x.videoGracias && !/^https:\/\/(www\.|m\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)\/\S+$/i.test(x.videoGracias)) return toast('El video de bienvenida debe ser un enlace de YouTube o Vimeo con https://');
    if (!!x.cierreFecha !== !!x.cierreHora) return toast('El cierre necesita fecha y hora.');
    // Los campos vacíos se guardan vacíos: así se puede volver al valor de respaldo
    for (const k of ['nombre', 'claseDia', 'texto', 'palabra', 'claseHora', 'inicio', 'cierreFecha', 'cierreHora']) o[k] = x[k] || '';
    for (const k of ['precio', 'reserva', 'cuotas', 'ventanaAntes', 'ventanaDespues']) { if (x[k] === undefined || x[k] === '') { o[k] = ''; continue; } if (!Number.isFinite(Number(x[k])) || Number(x[k]) < 0) return toast(`Revisa el número de «${k}».`); o[k] = Number(x[k]); }
    o.cupos = x.cupos === '' || x.cupos === undefined ? '' : Number(x.cupos);
    if (o.cupos !== '' && (!Number.isFinite(o.cupos) || o.cupos < 0)) return toast('Revisa los cupos máximos.');
    o.moneda = x.moneda; if (typeof x.listaEspera === 'boolean') o.listaEspera = x.listaEspera;
    ofertas[clase] = o;
  }
  const d = { ofertas, enlacePendulo: v.pendulo?.sala || '', enlaceTarot: v.tarot?.sala || '', replayPendulo: v.pendulo?.replay || '', replayTarot: v.tarot?.replay || '', videoGraciasPendulo: v.pendulo?.videoGracias || '', videoGraciasTarot: v.tarot?.videoGracias || '' };
  try { await data.saveClases(d); render(false); toast('Clases y ofertas guardadas.'); } catch (e) { fail(e); }
}

const enSegmento = (l, k, p) => k === 'todas' || (k === 'oferta' ? vioOfertaSinRespuesta(l, p) : segClic(l) === k);
// Texto de un grupo: el guardado, o el de ejemplo mientras no haya uno guardado
const textoEnvio = (clase, seg) => (A.plantillas || {})[`${clase}_${seg}`] || TEXTO_EJEMPLO[seg] || '';
// ---------- Inicio: lo importante del día a mano ----------
V.inicio = () => {
  const hoy = ymd(hoyCL()), nombre = (A.me?.displayName || '').split(' ')[0] || 'Karen';
  const nuevas = nuevasLeads(), sinLeer = A.wa.chats.reduce((n, c) => n + (c.unread || 0), 0);
  const clases = (A.cal || []).filter((e) => ['clase-pendulo', 'clase-tarot'].includes(e.type) && e.date >= hoy && !e.tentative)
    .sort((a, b) => `${a.date} ${a.time || ''}`.localeCompare(`${b.date} ${b.time || ''}`)).slice(0, 5);
  const atrasadas = A.students.filter((u) => u.paymentStatus === 'overdue');
  const kpi = (n, t, ir) => `<div data-go="${ir}" role="button" tabindex="0" style="cursor:pointer"><b>${n}</b><span>${t}</span></div>`;
  const fila = (l) => `<tr><td><b>${esc(l.name)}</b><br><span class="muted" style="font-size:.84rem">${esc(LEAD_FORMS[l.form] || l.form)} · ${fdateMs(l.createdAt)}</span></td><td style="text-align:right">${l.whatsapp ? `<a class="btn btn-ghost btn-sm" href="${waLink(l.whatsapp)}" data-wa-open="${esc(waNum(l.whatsapp))}" data-wa-name="${esc(l.name)}">Escribir</a>` : ''}</td></tr>`;
  const clase = (e) => { const n = (A.leads || []).filter((l) => l.claseEvento === e.id).length; return `<tr data-go="calendario" style="cursor:pointer"><td><b>${esc(CAL_TYPES[e.type]?.[0] || e.type)}</b><br><span class="muted" style="font-size:.84rem">${e.date === hoy ? 'Hoy' : fechaLarga(e.date)}${e.time ? ` · ${esc(e.time)}` : ''}</span></td><td style="text-align:right"><span class="pill ${n ? 'done' : 'lock'}">${n} inscrita${n === 1 ? '' : 's'}</span></td></tr>`; };
  return `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Hola, ${esc(nombre)}</h1><p>Lo que necesita tu atención hoy.</p></div></div>
  <div class="kpis">${kpi(nuevas.length, 'interesadas nuevas', 'interesadas')}${kpi(sinLeer, 'WhatsApp sin leer', 'whatsapp')}${kpi(A.questions.length, 'preguntas de clase', 'preguntas')}${kpi(A.tickets.length, 'mensajes de ayuda', 'ayuda')}</div>
  ${(() => { const t = personas().filter(seguimientoHoyP).sort((a, b) => a.followUp.localeCompare(b.followUp)), hoyS = ymd(hoyCL()); return t.length ? `<section class="card panel"><div class="panel-h"><h3>Para hoy (${t.length})</h3><button class="link" data-crm-hoy>Ver en el CRM</button></div><div class="tbl-wrap"><table class="tbl"><tbody>${t.slice(0, 8).map((q) => `<tr><td><button class="link" data-lead-open="${esc(q.id)}" style="font-weight:700">${esc(q.nombre)}</button><br><span class="muted" style="font-size:.84rem">${q.followUp < hoyS ? `Vencido el ${esc(fechaLarga(q.followUp))}` : 'Hoy'} · ${esc(q.leads.map((l) => PROG_CORTO[l.form] || l.form).join(', '))}</span></td><td style="text-align:right">${q.whatsapp ? `<a class="btn btn-ghost btn-sm" href="${waLink(q.whatsapp)}" data-wa-open="${esc(waNum(q.whatsapp))}" data-wa-name="${esc(q.nombre)}">WhatsApp</a>` : ''}</td></tr>`).join('')}</tbody></table></div>${t.length > 8 ? `<p class="muted" style="font-size:.84rem;margin:0">Y ${t.length - 8} más en el CRM.</p>` : ''}</section>` : ''; })()}
  ${personas().filter((p) => esInscrita(etapaDe(p)) && !p.alumna).length ? `<div class="alert"><div><b>${personas().filter((p) => esInscrita(etapaDe(p)) && !p.alumna).length} inscrita${personas().filter((p) => esInscrita(etapaDe(p)) && !p.alumna).length === 1 ? '' : 's'} sin cuenta en el aula</b><p>Ya están inscritas pero no crearon su cuenta. Escríbeles para que la creen con su correo.</p></div><button class="btn" data-crm-sincuenta-ya>Ver</button></div>` : ''}
  ${atrasadas.length ? `<div class="alert"><div><b>${atrasadas.length} cuota${atrasadas.length === 1 ? '' : 's'} atrasada${atrasadas.length === 1 ? '' : 's'}</b><p>${esc(atrasadas.slice(0, 3).map(nameOf).join(', '))}${atrasadas.length > 3 ? '…' : ''}</p></div><button class="btn" data-go="pagos">Ver pagos</button></div>` : ''}
  ${ofertaBanner()}
  ${filasClic().length ? `<div class="alert"><div><b>${filasClic().length} persona${filasClic().length === 1 ? '' : 's'} hicieron clic en «inscribirme» y no pagaron</b><p>Escríbeles mientras la oferta sigue abierta.</p></div><button class="btn" data-crm-lista="clic">Ver lista</button></div>` : ''}
  ${cuposHTML() ? `<div class="cupos">${cuposHTML()}</div>` : ''}
  <div class="cols">
    <section class="card panel"><div class="panel-h"><h3>Interesadas por contactar</h3><button class="link" data-go="interesadas">Ver todas</button></div>
      ${!A.leads ? '<p class="muted">Cargando…</p>' : nuevas.length ? `<div class="tbl-wrap"><table class="tbl"><tbody>${nuevas.slice(0, 6).map(fila).join('')}</tbody></table></div>` : '<p class="muted">No hay interesadas nuevas. Todo al día.</p>'}</section>
    <section class="card panel"><div class="panel-h"><h3>Próximas clases gratis</h3><button class="link" data-go="calendario">Calendario</button></div>
      ${!A.cal ? '<p class="muted">Cargando…</p>' : clases.length ? `<div class="tbl-wrap"><table class="tbl"><tbody>${clases.map(clase).join('')}</tbody></table></div>` : '<p class="muted">No hay clases gratis programadas en el Calendario.</p>'}</section>
  </div>`;
};
// ---------- Chat de WhatsApp Business (número de Karen, src/app/api/whatsapp) ----------
// Las conversaciones llegan en vivo desde Firestore; enviar y marcar como leído pasa por el servidor, que es quien habla con Meta.
const waApi = async (body) => {
  const r = await fetch('/api/whatsapp', {
    method: 'POST', headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(out.error || 'No se pudo enviar por WhatsApp.');
  return out;
};
const waNameOf = (n, chat) => chat?.name || A.leads?.find((l) => waNum(l.whatsapp) === n)?.name || A.students.find((u) => waNum(u.phone) === n)?.displayName || `+${n}`;
const waHora = (ms) => { const d = new Date(ms); return d.toDateString() === new Date().toDateString() ? d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) : d.toLocaleDateString('es', { day: 'numeric', month: 'short' }); };
const waChats = () => {
  const l = [...A.wa.chats];
  if (S.waOpen && !l.some((c) => c.id === S.waOpen)) l.unshift({ id: S.waOpen, number: S.waOpen, name: S.waName, lastText: 'Conversación nueva', lastAt: null });
  return l;
};
const waListHTML = () => waChats().map((c) => `<button class="wa-item" data-wa-chat="${esc(c.id)}" aria-current="${S.waOpen === c.id}"><b><span>${esc(waNameOf(c.id, c))}</span>${c.unread ? `<span class="count">${c.unread}</span>` : ''}</b><small>${esc(c.lastDir === 'out' ? 'Tú: ' : '')}${esc(c.lastText || '')}${c.lastAt?.toMillis ? ` · ${waHora(c.lastAt.toMillis())}` : ''}</small></button>`).join('') || '<div class="wa-empty">Todavía no hay conversaciones. Abre una desde Interesadas, tocando el número de WhatsApp de la persona.</div>';
const waLibre = (c) => Date.now() - (c?.lastInboundAt?.toMillis?.() || 0) < 864e5;
const waChatHTML = () => {
  const n = S.waOpen;
  if (!n) return '<div class="wa-empty">Elige una conversación para verla y responder desde aquí.</div>';
  const c = A.wa.chats.find((x) => x.id === n), libre = waLibre(c);
  const estado = (m) => (m.dir !== 'out' ? '' : { read: ' ✓✓ leído', delivered: ' ✓✓', failed: ' · no se pudo entregar' }[m.status] || ' ✓');
  return `<div class="wa-chat"><div class="wa-top"><div><b>${esc(waNameOf(n, c))}</b><br><span class="muted" style="font-size:.84rem">+${esc(n)}</span></div></div>
    <div class="wa-msgs" id="wa-msgs">${A.wa.msgs.map((m) => `<div class="wa-m ${m.dir === 'out' ? 'out' : ''}">${esc(m.text)}<small class="${m.status === 'failed' ? 'bad' : ''}">${m.ts?.toMillis ? waHora(m.ts.toMillis()) : ''}${estado(m)}</small></div>`).join('') || '<div class="wa-empty">Aún no hay mensajes. Empieza con la plantilla.</div>'}</div>
    ${libre ? '<form class="wa-send" id="wa-form"><textarea id="wa-text" rows="1" placeholder="Escribe un mensaje…" aria-label="Mensaje"></textarea><button class="btn btn-primary btn-sm">Enviar</button></form>'
    : `<div class="wa-note"><span>${c?.lastInboundAt ? 'Pasaron más de 24 horas desde su último mensaje.' : 'Esta persona aún no te ha escrito.'} WhatsApp solo permite empezar con un mensaje de plantilla; cuando responda podrás escribirle libremente.</span><button class="btn btn-primary btn-sm" data-wa-plantilla>Enviar plantilla</button></div>`}</div>`;
};
V.whatsapp = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>WhatsApp</h1><p>Conversaciones desde el WhatsApp Business de Karen (+56 9 4004 4528). Lo que escribas aquí sale con ese número.</p></div></div>
  ${A.wa.on === false ? '<div class="card empty">WhatsApp todavía no está conectado: faltan las llaves de Meta en Vercel (WHATSAPP_TOKEN y WHATSAPP_PHONE_ID). Los pasos están en el README.</div>' : ''}
  <section class="card wa"><div class="wa-list" id="wa-list">${waListHTML()}</div><div id="wa-pane" style="display:grid;min-width:0;min-height:0">${waChatHTML()}</div></section>`;
let waMsgsOff = null, waChatsOff = null;
function waRepaint(soloMensajes = false) {
  if (S.view !== 'whatsapp') return paintNav();
  const l = $('#wa-list'); if (l && !soloMensajes) l.innerHTML = waListHTML();
  const p = $('#wa-pane'); if (!p) return;
  const t = $('#wa-text'), borrador = t?.value || '', foco = document.activeElement === t;
  const m0 = $('#wa-msgs'), abajo = !m0 || m0.scrollHeight - m0.scrollTop - m0.clientHeight < 80;
  p.innerHTML = waChatHTML(); waBind();
  const t2 = $('#wa-text'); if (t2) { t2.value = borrador; if (foco) t2.focus(); }
  const m = $('#wa-msgs'); if (m && abajo) m.scrollTop = m.scrollHeight;
}
function waWatch() {
  waChatsOff?.();
  waChatsOff = onSnapshot(query(collection(db, 'wa_chats'), orderBy('lastAt', 'desc'), limit(200)), (snap) => {
    A.wa.chats = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    paintNav();
    if (S.view === 'whatsapp') waRepaint();
    // Si está leyendo esta conversación, lo que llega queda como leído
    const c = A.wa.chats.find((x) => x.id === S.waOpen);
    if (S.view === 'whatsapp' && c?.unread) waApi({ action: 'leido', to: c.id }).catch(() => {});
  }, (e) => console.warn('whatsapp', e.code));
}
function waOpen(n, nombre) {
  S.waOpen = n; S.waName = nombre || ''; A.wa.msgs = [];
  waMsgsOff?.();
  waMsgsOff = onSnapshot(query(collection(db, 'wa_chats', n, 'messages'), orderBy('ts', 'asc'), limit(300)), (snap) => {
    A.wa.msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    waRepaint(true);
  }, (e) => console.warn('whatsapp mensajes', e.code));
  if (A.wa.chats.find((x) => x.id === n)?.unread) waApi({ action: 'leido', to: n }).catch(() => {});
}
function waBind() {
  const form = $('#wa-form');
  if (form) {
    const t = $('#wa-text');
    t.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } };
    form.onsubmit = async (e) => {
      e.preventDefault();
      const text = t.value.trim(); if (!text) return;
      const b = form.querySelector('button'); b.disabled = true;
      try { await waApi({ action: 'enviar', to: S.waOpen, text, name: S.waName }); t.value = ''; } catch (err) { fail(err); }
      b.disabled = false;
    };
  }
  const pl = $('[data-wa-plantilla]');
  if (pl) pl.onclick = async () => {
    pl.disabled = true;
    try { await waApi({ action: 'plantilla', to: S.waOpen, name: S.waName || waNameOf(S.waOpen) }); toast('Plantilla enviada. Cuando responda podrás escribirle aquí.'); } catch (err) { fail(err); pl.disabled = false; }
  };
}
// ---------- Calendario de la Maestra ----------
// Fechas como texto AAAA-MM-DD (día de Chile), sin horas de por medio: así no hay corrimientos por zona horaria.
const CAL_TYPES = {
  bloqueado: ['Karen no disponible', '#b8402f'],
  'clase-pendulo': ['Clase gratis Péndulo', '#d9a93f'],
  'clase-tarot': ['Clase gratis Tarot', '#7a5c8e'],
  'curso-pendulo': ['Curso de Péndulo Hebreo ($69.900 CLP)', '#b07d1f'],
  tarot: ['Grupo de Tarot Terapéutico (16 clases en 8 semanas, 70 USD al mes)', '#5a3f6e'],
  formacion: ['Formación (clase de un grupo)', '#3f7a5e'],
  'formacion-inicio': ['Inicio de un grupo de formación', '#2b5443'],
  terapia: ['Terapia agendada', '#d1568b'],
};
const LIBRE_NO = ['bloqueado', 'receso'];
const MES_N = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIA_N = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const ymd = (t) => new Date(t).toISOString().slice(0, 10);
const tOf = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const hoyCL = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date()).map((x) => [x.type, x.value])); return Date.UTC(+p.year, +p.month - 1, +p.day); };
const fechaLarga = (s) => { const d = new Date(tOf(s)); return `${DIA_N[d.getUTCDay()]} ${d.getUTCDate()} de ${MES_N[d.getUTCMonth()]}`; };
// Cada evento ocupa sus días (un rango como el receso, hasta 120 días); devuelve { 'AAAA-MM-DD': [eventos] }
const calPorDia = () => {
  const m = {};
  for (const e of A.cal || []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '')) continue;
    const fin = /^\d{4}-\d{2}-\d{2}$/.test(e.endDate || '') && e.endDate > e.date ? tOf(e.endDate) : tOf(e.date);
    for (let t = tOf(e.date), n = 0; t <= fin && n < 120; t += 864e5, n++) (m[ymd(t)] ||= []).push(e);
  }
  Object.values(m).forEach((l) => l.sort((a, b) => (a.time || '99').localeCompare(b.time || '99')));
  return m;
};
// Terapias agendadas desde la web (type 'terapia'): mensaje de recordatorio listo para enviar por WhatsApp o Gmail
const DIR_PRESENCIAL = 'Calle Mosqueto #459, piso 3, oficina 301 (salida metro Bellas Artes), Santiago de Chile';
const cuando = (ts, tz) => new Intl.DateTimeFormat('es', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(ts);
function recordatorio(e) {
  const cl = e.start ? cuando(e.start, 'America/Santiago') : `${fechaLarga(e.date)} ${e.time || ''}`.trim();
  const suyo = e.start && e.clientTz && e.clientTz !== 'America/Santiago' ? cuando(e.start, e.clientTz) : '';
  const lugar = e.modalidad === 'online' ? `Online por Google Meet: ${A.clases?.enlaceTerapias || '(falta el enlace en Ajustes)'}`
    : /limpieza/i.test(e.terapia || '') ? `En ${e.direccion || 'tu dirección'}` : `Presencial en ${DIR_PRESENCIAL}`;
  const texto = `Hola ${(e.name || '').split(' ')[0]}, te escribe Karen de Casa Muladhara. Te recuerdo tu sesión de ${e.terapia || 'terapia'}:\n- Día y hora: ${suyo ? `${suyo} (tu hora, ${e.clientTz})\n- En Chile: ${cl}` : `${cl} (hora de Chile)`}\n- ${lugar}\n\n¡Te espero!`;
  const asunto = `Tu sesión de ${e.terapia || 'terapia'} con Karen · Casa Muladhara`;
  const wa = String(e.whatsapp || '').replace(/\D/g, '');
  return {
    wa: wa ? `https://wa.me/${wa}?text=${encodeURIComponent(texto)}` : '',
    mail: e.email ? `https://mail.google.com/mail/?view=cm&authuser=holamaestrakaren%40gmail.com&to=${encodeURIComponent(e.email)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(texto)}` : '',
  };
}
const botonesRec = (e) => { const r = recordatorio(e); return `${r.wa ? `<a class="btn btn-ghost btn-sm" href="${esc(r.wa)}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${r.mail ? `<a class="btn btn-ghost btn-sm" href="${esc(r.mail)}" target="_blank" rel="noopener">Correo</a>` : ''}`; };
const choque = (l) => l.some((e) => LIBRE_NO.includes(e.type)) && l.some((e) => !LIBRE_NO.includes(e.type));
// Hora de término: la guardada, o inicio + duración (terapias reservadas en la web)
const hmDe = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const finDe = (e) => e.endTime || (/^\d{2}:\d{2}$/.test(e.time || '') && e.duration > 0 ? hmDe(Number(e.time.slice(0, 2)) * 60 + Number(e.time.slice(3)) + e.duration) : '');
// Sin hora, un evento bloquea el día completo (en "Karen no disponible" es lo esperado: es el "todo el día")
const SIN_HORA_OK = ['bloqueado'];
const sinHora = (e) => !e.time && !SIN_HORA_OK.includes(e.type);
const AVISO_SIN_HORA = 'Sin hora, este evento bloquea el día completo';
const calChip = (e) => {
  const [n, c] = CAL_TYPES[e.type] || ['Fecha', '#5d6b63'], fin = finDe(e);
  const aviso = [e.tentative ? 'Por confirmar' : '', sinHora(e) ? AVISO_SIN_HORA : ''].filter(Boolean).join(' · ');
  return `<button class="cal-ev${e.tentative ? ' tent' : ''}" style="--c:${c}" data-cal-ev="${esc(e.id)}" title="${esc(aviso ? `${n} · ${aviso}` : n)}">${sinHora(e) ? '<span aria-hidden="true">⚠ </span>' : ''}${e.time ? `<b>${esc(e.time)}${fin ? `–${esc(fin)}` : ''}</b> ` : ''}${esc(e.title || n)}${e.tentative ? ' <i class="tent-tag">por confirmar</i>' : ''}</button>`;
};
// ---------- Vistas del calendario: día, semana, mes y año (como Google Calendar) ----------
const HORA_PX = 44; // alto de una hora en la grilla de día y semana
const DIA_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const lunesDe = (t) => t - ((new Date(t).getUTCDay() + 6) % 7) * 864e5;
const minDe = (h) => (/^\d{2}:\d{2}$/.test(h || '') ? Number(h.slice(0, 2)) * 60 + Number(h.slice(3)) : null);
const calTitulo = (v, ref) => {
  const d = new Date(ref);
  if (v === 'dia') return `${DIA_LARGO[d.getUTCDay()]} ${d.getUTCDate()} de ${MES_N[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
  if (v === 'mes') return `${MES_N[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  if (v === 'anio') return String(d.getUTCFullYear());
  const a = new Date(lunesDe(ref)), b = new Date(lunesDe(ref) + 6 * 864e5);
  return a.getUTCMonth() === b.getUTCMonth() ? `${a.getUTCDate()} al ${b.getUTCDate()} de ${MES_N[b.getUTCMonth()]} de ${b.getUTCFullYear()}` : `${a.getUTCDate()} de ${MES_N[a.getUTCMonth()]} al ${b.getUTCDate()} de ${MES_N[b.getUTCMonth()]} de ${b.getUTCFullYear()}`;
};
const horaAhoraCL = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value])); return (+p.hour % 24) * 60 + +p.minute; };
// Grilla de horas para uno o siete días: lo que no tiene hora va arriba ("todo el día"); lo demás se posiciona según su hora
function calGrilla(dias, porDia) {
  const hoy = hoyCL(), claves = dias.map(ymd);
  let desde = 7 * 60, hasta = 23 * 60;
  for (const k of claves) for (const e of porDia[k] || []) { const a = minDe(e.time); if (a === null) continue; const b = minDe(finDe(e)) ?? a + 60; desde = Math.min(desde, Math.floor(a / 60) * 60); hasta = Math.max(hasta, Math.min(24 * 60, Math.ceil(b / 60) * 60)); }
  const filas = (hasta - desde) / 60, px = (m) => ((m - desde) * HORA_PX) / 60;
  const horas = Array.from({ length: filas }, (_, i) => `<span style="top:${i * HORA_PX}px">${String(desde / 60 + i).padStart(2, '0')}:00</span>`).join('');
  const cab = dias.map((t, i) => { const d = new Date(t), l = porDia[claves[i]] || []; return `<button class="tg-dia${t === hoy ? ' hoy' : ''}${choque(l) ? ' clash' : ''}" data-cal-dia="${claves[i]}" title="${choque(l) ? 'Choque: Karen no disponible' : 'Ver este día'}"><small>${DIA_N[d.getUTCDay()]}</small><b>${d.getUTCDate()}</b></button>`; }).join('');
  const todoDia = claves.map((k) => `<div class="tg-ad">${(porDia[k] || []).filter((e) => minDe(e.time) === null).map(calChip).join('')}</div>`).join('');
  const ahora = horaAhoraCL();
  const cols = claves.map((k, i) => {
    const evs = (porDia[k] || []).filter((e) => minDe(e.time) !== null)
      .map((e) => { const a = minDe(e.time); return { e, a, b: Math.max(minDe(finDe(e)) ?? a + 60, a + 25) }; }).sort((x, y) => x.a - y.a || y.b - x.b);
    // Eventos que se pisan se reparten en carriles lado a lado
    let grupo = [], fines = [], finMax = -1;
    const cerrar = () => { grupo.forEach((x) => (x.n = fines.length)); grupo = []; fines = []; finMax = -1; };
    for (const x of evs) {
      if (grupo.length && x.a >= finMax) cerrar();
      let c = fines.findIndex((f) => f <= x.a); if (c < 0) { c = fines.length; fines.push(0); }
      fines[c] = x.b; x.c = c; grupo.push(x); finMax = Math.max(finMax, x.b);
    }
    cerrar();
    const bloques = evs.map(({ e, a, b, c, n }) => {
      const [nom, col] = CAL_TYPES[e.type] || ['Fecha', '#5d6b63'], fin = finDe(e);
      return `<button class="tg-ev${e.tentative ? ' tent' : ''}" style="--c:${col};top:${px(a)}px;height:${Math.max(px(b) - px(a) - 2, 20)}px;left:calc(${(c / n) * 100}% + 1px);width:calc(${100 / n}% - 3px)" data-cal-ev="${esc(e.id)}" title="${esc(`${nom}${e.tentative ? ' · Por confirmar' : ''}`)}"><b>${esc(e.time)}${fin ? `–${esc(fin)}` : ''}</b> ${esc(e.title || nom)}${e.tentative ? ' <i class="tent-tag">por confirmar</i>' : ''}</button>`;
    }).join('');
    const linea = dias[i] === hoy && ahora >= desde && ahora <= hasta ? `<div class="tg-now" style="top:${px(ahora)}px"></div>` : '';
    return `<div class="tg-col${dias[i] === hoy ? ' hoy' : ''}">${bloques}${linea}</div>`;
  }).join('');
  return `<div class="tg" style="--n:${dias.length};--hp:${HORA_PX}px"><div class="tg-in">
    <div class="tg-row"><i></i>${cab}</div>
    <div class="tg-row tg-allday"><i>todo el día</i>${todoDia}</div>
    <div class="tg-body" style="height:${filas * HORA_PX}px"><div class="tg-hours">${horas}</div>${cols}</div>
  </div></div>`;
}
// Año: doce mini meses; los días con algo en el calendario se marcan y al tocarlos se abre ese día
function calAnio(anio, porDia) {
  const hoy = hoyCL();
  return `<div class="yr">${MES_N.map((nom, m) => {
    const off = (new Date(Date.UTC(anio, m, 1)).getUTCDay() + 6) % 7, n = new Date(Date.UTC(anio, m + 1, 0)).getUTCDate();
    const dias = Array.from({ length: n }, (_, i) => {
      const t = Date.UTC(anio, m, i + 1), k = ymd(t), l = porDia[k] || [];
      const cls = [l.length ? 'has' : '', l.some((e) => LIBRE_NO.includes(e.type)) ? 'blk' : '', t === hoy ? 'hoy' : ''].filter(Boolean).join(' ');
      return `<button class="${cls}" data-cal-dia="${k}" title="${esc(l.slice(0, 4).map((e) => e.title || '').join(' · '))}">${i + 1}</button>`;
    });
    return `<section class="yr-m"><button class="yr-t" data-cal-mes-ir="${anio}-${String(m + 1).padStart(2, '0')}-01">${nom}</button><div class="yr-g">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => `<b>${d}</b>`).join('')}${'<i></i>'.repeat(off)}${dias.join('')}</div></section>`;
  }).join('')}</div>`;
}
// Terapias que alguien agendó desde la web: siempre a la vista, con los botones para recordarle por WhatsApp o correo
function calTerapias(hoy) {
  const hoyK = ymd(hoy), manK = ymd(hoy + 864e5);
  const lista = (A.cal || []).filter((e) => e.type === 'terapia' && e.date >= hoyK).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
  const fila = (e) => { const fin = finDe(e), cuando = e.date === hoyK ? 'Hoy' : e.date === manK ? 'Mañana' : fechaLarga(e.date); return `<div class="cal-row"><b>${cuando}${e.time ? ` · ${esc(e.time)}${fin ? `–${esc(fin)}` : ''}` : ''}</b><div><button class="cal-ev" style="--c:#d1568b" data-cal-ev="${esc(e.id)}">${esc(e.terapia || 'Terapia')} · ${esc(e.name || '')} <i class="tent-tag">${e.modalidad === 'online' ? 'online' : 'presencial'}</i></button><div class="rec">${botonesRec(e) || '<span class="muted">Sin datos de contacto</span>'}</div></div></div>`; };
  return `<section class="card panel"><h3>Terapias agendadas y recordatorios</h3>
    <p class="muted" style="margin:0;font-size:.88rem">Cuando alguien agenda una terapia desde la web aparece aquí. Los botones <b>WhatsApp</b> y <b>Correo</b> abren el recordatorio ya escrito (día, hora en su zona, enlace de Meet o dirección): solo pulsas enviar.</p>
    ${lista.length ? lista.map(fila).join('') : '<p class="muted" style="margin:0"><b>Aún no hay terapias agendadas.</b> La primera que se reserve aparecerá en esta lista.</p>'}
  </section>`;
}
V.calendario = () => {
  const head = `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Calendario</h1><p>Clases gratis, cursos, formación y los momentos en que no estás disponible (citas, trámites, vacaciones). Solo tú lo ves.</p></div><button class="btn btn-primary btn-sm" data-cal-add>Agregar fecha</button></div>`;
  if (!A.cal) return `${head}<div class="card empty">Cargando calendario…</div>`;
  const hoy = hoyCL(), porDia = calPorDia();
  S.calVista ||= innerWidth < 760 ? 'dia' : 'semana';
  S.calRef ||= hoy;
  const v = S.calVista, ref = S.calRef, r = new Date(ref);
  let cuerpo;
  if (v === 'dia') cuerpo = calGrilla([ref], porDia);
  else if (v === 'semana') cuerpo = calGrilla(Array.from({ length: 7 }, (_, i) => lunesDe(ref) + i * 864e5), porDia);
  else if (v === 'anio') cuerpo = calAnio(r.getUTCFullYear(), porDia);
  else {
    const y = r.getUTCFullYear(), mo = r.getUTCMonth(), desfase = (new Date(Date.UTC(y, mo, 1)).getUTCDay() + 6) % 7, enMes = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate(), celdas = [];
    for (let i = 0; i < desfase; i++) celdas.push('<div class="cal-day out"></div>');
    for (let d = 1; d <= enMes; d++) {
      const k = ymd(Date.UTC(y, mo, d)), l = porDia[k] || [];
      celdas.push(`<div class="cal-day${tOf(k) === hoy ? ' today' : ''}${choque(l) ? ' clash' : ''}"><button class="cal-n" data-cal-dia="${k}" title="Ver este día">${d}</button>${choque(l) ? '<span class="cal-clash">Choque: Karen no disponible</span>' : ''}${l.map(calChip).join('')}</div>`);
    }
    cuerpo = `<div class="cal-scroll"><div class="cal-grid">${['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => `<div class="cal-wd">${d}</div>`).join('')}${celdas.join('')}</div></div>`;
  }
  return `${head}
  ${calTerapias(hoy)}
  <div class="cal-legend">${Object.entries(CAL_TYPES).map(([, [n, c]]) => `<span style="--c:${c}">${esc(n)}</span>`).join('')}<span class="tent-leg">Borde punteado: por confirmar</span></div>
  <section class="card panel cal-main">
    <div class="cal-bar">
      <div class="cal-nav"><button class="btn btn-ghost btn-sm" data-cal-hoy>Hoy</button><button class="btn btn-ghost btn-sm" data-cal-nav="-1" aria-label="Anterior">←</button><button class="btn btn-ghost btn-sm" data-cal-nav="1" aria-label="Siguiente">→</button><h3 class="cal-title">${esc(calTitulo(v, ref))}</h3></div>
      <div class="seg" role="group" aria-label="Vista del calendario">${[['dia', 'Día'], ['semana', 'Semana'], ['mes', 'Mes'], ['anio', 'Año']].map(([k, n]) => `<button class="${v === k ? 'on' : ''}" data-cal-vista="${k}" aria-pressed="${v === k}">${n}</button>`).join('')}</div>
    </div>
    ${cuerpo}
  </section>`;
};
// Formulario para agregar o editar una fecha (en la ventana del portal)
// Clases gratis: quiénes se registraron para esa fecha (src/app/api/leads las asocia a la clase del Calendario)
const claseInscritas = (v) => {
  if (!v.id || !['clase-pendulo', 'clase-tarot'].includes(v.type)) return '';
  const lista = (A.leads || []).filter((l) => l.claseEvento === v.id);
  const texto = (l) => `Hola ${String(l.name || '').split(' ')[0]}, te recuerdo tu clase gratis de ${v.type === 'clase-pendulo' ? 'Péndulo Hebreo' : 'Tarot Terapéutico'}: ${fechaLarga(v.date)}${v.time ? ` a las ${v.time} (hora de Chile)` : ''}. ${l.enlace_entrada ? `Entra con tu enlace personal: ${l.enlace_entrada}` : ''} ¡Te espero!`;
  const fila = (l) => `<tr><td><input type="checkbox" data-asist="${esc(l.id)}" aria-label="Marcar que ${esc(l.name)} entró"></td><td><b>${esc(l.name)}</b>${l.country ? `<br><span class="muted">${esc(l.country)}</span>` : ''}</td><td>${l.whatsapp ? `<a href="${waLink(l.whatsapp)}" data-wa-open="${esc(waNum(l.whatsapp))}" data-wa-name="${esc(l.name)}">${esc(l.whatsapp)}</a>` : ''}</td><td>${l.email ? `<a href="mailto:${esc(l.email)}?subject=${encodeURIComponent('Tu clase gratis · Casa Muladhara')}&body=${encodeURIComponent(texto(l))}">${esc(l.email)}</a>` : ''}</td><td style="text-align:right"><button type="button" class="link" style="color:#b8402f" data-insc-del="${esc(l.id)}">Eliminar</button></td></tr>`;
  return `<div class="card full" style="padding:12px 14px;display:grid;gap:8px;font-size:.84rem"><b>Inscritas a esta clase: ${lista.length}</b>${lista.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:28px"><input type="checkbox" data-asist-all aria-label="Marcar todas"></th><th>Persona</th><th>WhatsApp</th><th>Correo</th><th></th></tr></thead><tbody>${lista.map(fila).join('')}</tbody></table></div><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button type="button" class="btn btn-primary btn-sm" data-asist-go="${esc(v.id)}">Marcar como «Asistió confirmado»</button><span class="muted">Marca a quienes estuvieron en la clase; pasan a «Asistió confirmado» en el CRM.</span></div>` : '<span class="muted">Todavía nadie se registró para esta fecha.</span>'}${enlace ? '' : '<span style="color:#b8402f;font-weight:700">Falta el enlace de Google Meet de esta clase en Ajustes del aula.</span>'}</div>`;
};
function calForm(e) {
  const v = e || { type: 'bloqueado', date: ymd(S.calRef || hoyCL()) };
  dialog(`<span class="eyebrow">Calendario</span><h3>${e ? 'Editar fecha' : 'Agregar fecha'}</h3>
  <form id="cal-form" class="cal-form">
    <label><b>Tipo</b><select id="cf-type">${Object.entries(CAL_TYPES).map(([k, [n]]) => `<option value="${k}" ${v.type === k ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
    <label><b>Título</b><input id="cf-title" maxlength="120" value="${esc(v.title || '')}" placeholder="Si lo dejas vacío, se usa el tipo"></label>
    <label><b>Fecha</b><input type="date" id="cf-date" required value="${esc(v.date || '')}"></label>
    <label><b>Hasta el día (opcional, varios días seguidos)</b><input type="date" id="cf-end" value="${esc(v.endDate || '')}"></label>
    <label><b>Hora de inicio</b><input type="time" id="cf-time" value="${esc(v.time || '')}"></label>
    <label><b>Hora de término</b><input type="time" id="cf-endtime" value="${esc(finDe(v))}"></label>
    <div class="full chks"><label id="cf-allday-row" hidden><input type="checkbox" id="cf-allday" ${v.type === 'bloqueado' && e && !e.time ? 'checked' : ''}> Todo el día</label><label><input type="checkbox" id="cf-tent" ${v.tentative ? 'checked' : ''}> Por confirmar (borde punteado; no se muestra en las landings)</label></div>
    <p class="full muted" style="margin:-4px 0 0;font-size:.78rem">El evento bloquea solo desde la hora de inicio hasta la de término. Si dura menos, cambia la hora de término y esa hora vuelve a quedar libre en la web.</p>
    <p id="cf-warn" class="full" role="alert" style="margin:0;font-size:.82rem;font-weight:700;color:#b8402f" hidden>${AVISO_SIN_HORA}.</p>
    ${v.type === 'terapia' && (v.whatsapp || v.email) ? `<div class="card full" style="padding:12px 14px;display:grid;gap:6px;font-size:.84rem"><b>${esc(v.name || '')}</b><span>${esc(v.modalidad === 'online' ? 'Online' : v.direccion ? `Presencial · ${v.direccion}` : 'Presencial')}${v.clientTz ? ` · Zona: ${esc(v.clientTz)}` : ''}</span><span>${esc(v.whatsapp || '')} · ${esc(v.email || '')}</span><div style="display:flex;gap:6px;flex-wrap:wrap">${botonesRec(v)}</div></div>` : ''}
    ${claseInscritas(v)}
    <label class="full" id="cf-palabra-fila" ${FUNC.palabraAsistencia && ['clase-pendulo', 'clase-tarot'].includes(v.type) ? '' : 'hidden'}><b>Palabra de asistencia</b><input id="cf-palabra" maxlength="40" value="${esc(v.codigoAsistencia || '')}" placeholder="Una palabra que dirás en la clase"><span class="muted" style="font-size:.78rem;font-weight:400">Quien la escribe en /asistencia durante la clase (de 10 minutos antes a 30 después) queda «Asistió confirmado». Cada clase tiene su propia palabra: al repetir cada semana, las demás quedan vacías.</span></label>
    <label class="full"><b>Nota</b><textarea id="cf-note" maxlength="500" rows="2">${esc(v.note || '')}</textarea></label>
    ${e ? '' : '<label class="full rep"><input type="checkbox" id="cf-rep"> Repetir cada semana hasta <input type="date" id="cf-until"></label>'}
    <div class="full actions"><button class="btn btn-primary btn-sm">Guardar</button>${e ? '<button type="button" class="btn btn-ghost btn-sm" id="cf-del">Borrar</button>' : ''}</div>
  </form>`, true);
  // Aviso en vivo: un evento sin hora bloquea el día completo
  const avisar = () => {
    const bloq = $('#cf-type').value === 'bloqueado', todo = bloq && $('#cf-allday').checked;
    $('#cf-allday-row').hidden = !bloq;
    $('#cf-time').disabled = $('#cf-endtime').disabled = todo;
    if (todo) { $('#cf-time').value = ''; $('#cf-endtime').value = ''; }
    $('#cf-title').placeholder = bloq ? 'Ej.: Médico, trámite, vacaciones (vacío: Karen no disponible)' : 'Si lo dejas vacío, se usa el tipo';
    $('#cf-warn').hidden = !!$('#cf-time').value || SIN_HORA_OK.includes($('#cf-type').value);
  };
  $('#cf-type').addEventListener('change', () => { $('#cf-palabra-fila').hidden = !FUNC.palabraAsistencia || !['clase-pendulo', 'clase-tarot'].includes($('#cf-type').value); });
  $('#cf-type').onchange = avisar; $('#cf-time').oninput = avisar; $('#cf-allday').onchange = avisar; avisar();
  $('#cal-form').onsubmit = async (ev) => {
    ev.preventDefault();
    const bloq = $('#cf-type').value === 'bloqueado', todo = bloq && $('#cf-allday').checked;
    const time = todo ? '' : $('#cf-time').value, endTime = time ? $('#cf-endtime').value : '';
    if (bloq && !todo && (!time || !endTime)) return toast('Elige la hora de inicio y de término, o marca "Todo el día".');
    if (endTime && endTime <= time) return toast('La hora de término debe ser después de la de inicio.');
    const duration = endTime ? (Number(endTime.slice(0, 2)) * 60 + Number(endTime.slice(3))) - (Number(time.slice(0, 2)) * 60 + Number(time.slice(3))) : 0;
    const d = { type: $('#cf-type').value, title: $('#cf-title').value.trim(), date: $('#cf-date').value, time, endTime, duration, endDate: $('#cf-end').value, note: $('#cf-note').value.trim(), tentative: $('#cf-tent').checked, ...(['clase-pendulo', 'clase-tarot'].includes($('#cf-type').value) ? { codigoAsistencia: $('#cf-palabra').value.trim() } : {}) };
    if (!d.date) return toast('Elige la fecha.');
    if (d.endDate && d.endDate < d.date) return toast('La fecha de término no puede ser antes de la fecha.');
    try {
      const rep = $('#cf-rep')?.checked, hasta = $('#cf-until')?.value;
      if (!e && rep) {
        if (!hasta || hasta < d.date) return toast('Elige hasta qué fecha se repite.');
        const lista = [], largo = d.endDate ? tOf(d.endDate) - tOf(d.date) : 0;
        for (let t = tOf(d.date); t <= tOf(hasta) && lista.length < 104; t += 7 * 864e5) lista.push({ ...d, date: ymd(t), endDate: d.endDate ? ymd(t + largo) : '', ...('codigoAsistencia' in d && lista.length ? { codigoAsistencia: '' } : {}) });
        await data.calAddMany(lista);
        toast(`${lista.length} fechas agregadas`);
      } else {
        await data.calSave(e?.id, d);
        toast(e ? 'Fecha guardada' : 'Fecha agregada');
      }
      $('#dlg').close();
      await data.cal(); render(false);
    } catch (err) { fail(err); }
  };
  const del = $('#cf-del');
  if (del) del.onclick = async () => {
    if (!confirm(`¿Borrar "${e.title || CAL_TYPES[e.type]?.[0] || 'esta fecha'}" del ${fechaLarga(e.date)}?`)) return;
    try { await data.calDelete(e.id); toast('Fecha borrada'); $('#dlg').close(); await data.cal(); render(false); } catch (err) { fail(err); }
  };
}
V.pagos = () => {
  const cuotas = A.students.filter((u) => u.plan === 'mensual' && u.paymentStatus !== 'overdue');
  const rows = A.students.filter((u) => u.plan !== 'none' || Number(u.grantLevel)).sort((a, b) => (b.paymentStatus === 'overdue') - (a.paymentStatus === 'overdue'));
  return `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Pagos</h1><p>Stripe actualiza solo las cuotas y los pagos completos. Abre la ficha de una alumna para ver su historial.</p></div></div>
  <div class="kpis"><div><b>${A.students.filter((u) => u.plan === 'completo').length}</b><span>pagaron completo</span></div><div><b>${cuotas.length}</b><span>en cuotas al día</span></div><div><b>${A.students.filter((u) => u.paymentStatus === 'overdue').length}</b><span>con cuota pendiente</span></div><div><b>${cuotas.length * 55} USD</b><span>ingreso mensual en cuotas</span></div></div>
  <section class="card panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Alumna</th><th>Estado</th><th>Cuotas</th><th>Próximo cobro</th><th></th></tr></thead><tbody>
  ${rows.map((u) => { const [k, t] = payState(u); return `<tr><td><span style="display:flex;gap:10px;align-items:center">${av(u)}${esc(nameOf(u))}</span></td><td><span class="pill ${k}">${t}</span></td><td>${u.plan === 'mensual' ? `${Number(u.paidInstallments) || 0} de ${Number(u.installments) || 9}` : '—'}</td><td>${u.plan === 'mensual' && u.currentPeriodEnd?.toDate ? (u.cancelAtPeriodEnd ? 'Termina ' : '') + fdate(u.currentPeriodEnd) : '—'}</td><td><button class="link" data-open="${u.id}">Ver ficha</button></td></tr>`; }).join('') || '<tr><td colspan="5" class="muted">Todavía no hay pagos.</td></tr>'}
  </tbody></table></div></section>`;
};
V.mensajes = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Mensajes</h1><p>Escribe un aviso a una alumna o a todas. Les llega a la campana del aula. Para conversar en grupo está la comunidad.</p></div></div>
  <section class="card panel"><form id="msg-form" style="display:grid;gap:12px">
    <label style="display:grid;gap:6px;font-size:.84rem"><b>Para</b><select id="msg-to"><option value="all">Todas las alumnas (${A.students.length})</option><option value="access">Solo alumnas con niveles abiertos (${A.students.filter((u) => openOf(u).length > 0).length})</option>${UNITS.map((l) => `<option value="lvl${l.n}">Alumnas con el Nivel ${lvName(l.n)} abierto${l.n > 10 ? ` (${esc(l.t)})` : ''}</option>`).join('')}${A.students.map((u) => `<option value="${u.id}">${esc(nameOf(u))} · ${esc(u.email)}</option>`).join('')}</select></label>
    <label style="display:grid;gap:6px;font-size:.84rem"><b>Mensaje</b><textarea id="msg-text" maxlength="1900" placeholder="Escribe tu mensaje"></textarea></label>
    <button class="btn btn-primary btn-sm" style="justify-self:start">Enviar</button></form></section>`;
V.preguntas = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Preguntas de clase</h1><p>Lo que tus alumnas preguntan debajo de cada clase. Al responder, la respuesta aparece en la clase y le llega un aviso.</p></div></div>
  <section class="card panel">${A.questions.length ? A.questions.map((q, ix) => { const u = student(q.uid), lv = levelOfKey(q.lessonKey); return `<article style="display:grid;gap:8px;padding:14px 0;border-top:1px solid var(--line)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${av(u)}<b>${esc(nameOf(u))}</b><span class="muted" style="font-size:.84rem">${lv ? 'Nivel ' + keyLevelName(q.lessonKey) + ' · ' : ''}${fdate(q.createdAt)}</span></div>
    <p style="margin:0">${esc(q.text)}</p>
    <form data-answer="${ix}" style="display:grid;gap:8px"><textarea placeholder="Tu respuesta" aria-label="Respuesta"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Responder</button></form></article>`; }).join('') : '<p class="muted" style="margin:0">No tienes preguntas pendientes.</p>'}</section>`;
V.ayuda = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Mensajes de ayuda</h1><p>Lo que te escriben desde la sección Ayuda del aula. Tu respuesta les llega como aviso.</p></div></div>
  <section class="card panel">${A.tickets.length ? A.tickets.map((t, ix) => { const u = student(t.uid); return `<article style="display:grid;gap:8px;padding:14px 0;border-top:1px solid var(--line)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${av(u)}<b>${esc(nameOf(u))}</b><span class="pill lock">${esc(t.topic)}</span><span class="muted" style="font-size:.84rem">${fdate(t.createdAt)}</span></div>
    <p style="margin:0;white-space:pre-line">${esc(t.message)}</p>
    <form data-ticket="${ix}" style="display:grid;gap:8px"><textarea placeholder="Tu respuesta (opcional)" aria-label="Respuesta"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Responder y cerrar</button></form></article>`; }).join('') : '<p class="muted" style="margin:0">No hay mensajes de ayuda abiertos.</p>'}</section>`;
V.comunidad = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Comunidad</h1><p>Las últimas publicaciones de las alumnas. Puedes borrar las que no correspondan. Para escribir o responder como Maestra, entra al aula.</p></div><a class="btn btn-ghost btn-sm" href="/aula">Abrir la comunidad en el aula</a></div>
  <section class="card panel">${A.posts.length ? A.posts.map((p) => `<article style="display:grid;gap:6px;padding:14px 0;border-top:1px solid var(--line)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><b>${esc(p.authorName)}</b>${p.isTeacher ? '<span class="pill pres">Maestra</span>' : ''}<span class="muted" style="font-size:.84rem"># ${esc(CHANNELS[p.ch] || p.ch)} · ${fdate(p.createdAt)}</span><button class="link" style="margin-left:auto" data-delpost="${p.id}">Borrar</button></div>
    <p style="margin:0;white-space:pre-line">${esc(p.text)}</p></article>`).join('') : '<p class="muted" style="margin:0">Todavía no hay publicaciones.</p>'}</section>`;
V.ajustes = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Ajustes del aula</h1></div></div>
  <section class="card panel"><h3>Video de bienvenida</h3><p class="muted" style="margin:0;font-size:.88rem">Lo ven las cuentas gratis en Inicio. Pega el enlace de YouTube, Vimeo o Google Drive. Déjalo vacío para mostrar "Muy pronto".</p>
    <form id="wv-form" style="display:flex;gap:8px;flex-wrap:wrap"><input type="url" id="wv-url" placeholder="https://" value="${esc(A.config.welcomeVideo || '')}" style="flex:1;min-width:220px"><button class="btn btn-primary btn-sm">Guardar</button></form></section>
  <section class="card panel"><h3>Formación: próximo grupo</h3><p class="muted" style="margin:0;font-size:.88rem">La portada y la página /formacion muestran la fecha más cercana de tipo "Inicio de un grupo de formación" que tengas en el Calendario, con "cupos limitados". Cuando la fecha pasa, dejan de mostrarla solas.</p><button class="btn btn-ghost btn-sm" style="justify-self:start" data-go="calendario">Abrir el calendario</button></section>
  <section class="card panel"><h3>Google Meet: terapias online</h3><p class="muted" style="margin:0;font-size:.88rem">El Meet de las clases gratis (Péndulo y Tarot) se carga en Clases y ofertas y no se muestra a las alumnas: ellas entran con su enlace personal (/entrar/código).</p>
    <form id="cl-form" style="display:grid;gap:10px"><label style="display:grid;gap:6px;font-size:.84rem"><b>Enlace de Google Meet · terapias online</b><input type="url" id="cl-terapias" placeholder="https://meet.google.com/abc-defg-hij" value="${esc(A.clases?.enlaceTerapias || '')}"></label><button class="btn btn-primary btn-sm" style="justify-self:start">Guardar</button></form></section>
  <section class="card panel"><h3>Cursos: próximo inicio</h3><p class="muted" style="margin:0;font-size:.88rem">Las páginas /pendulo y /tarot muestran la fecha más cercana que tengas en el Calendario como "Curso Péndulo Hebreo Nivel 1" o "Grupo de Tarot Terapéutico".</p><button class="btn btn-ghost btn-sm" style="justify-self:start" data-go="calendario">Abrir el calendario</button></section>
  <section class="card panel"><h3>Clases en vivo</h3><p class="muted" style="margin:0;font-size:.88rem">Las clases en vivo y sus grabaciones se programan dentro de cada clase del aula, donde ves el contenido.</p><a class="btn btn-ghost btn-sm" style="justify-self:start" href="/aula">Ir al aula</a></section>`;

// Un solo manejador para todos los [data-go]: el menú se vuelve a pintar solo (p. ej. al llegar una alumna nueva) y sus botones siguen funcionando
document.addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go); });
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-insc-del]'); if (!b) return;
  const l = (A.leads || []).find((x) => x.id === b.dataset.inscDel); if (!l) return;
  if (!confirm(`¿Eliminar a ${l.name} de esta clase? También se borra de Interesadas y no se puede deshacer.`)) return;
  b.disabled = true;
  try {
    await data.leads({ action: 'delete', ids: [l.id] });
    A.leads = A.leads.filter((x) => x.id !== l.id); S.leadSel.delete(l.id); paintNav(); render(false);
    const ev = (A.cal || []).find((x) => x.id === l.claseEvento); if (ev && $('#dlg').open) calForm(ev);
    toast('Eliminada.');
  } catch (err) { fail(err); b.disabled = false; }
});
document.addEventListener('click', (e) => { document.querySelectorAll('details.menu[open]').forEach((d) => { if (!d.contains(e.target)) d.removeAttribute('open'); }); });
document.addEventListener('click', (e) => { const b = e.target.closest('[data-copiar]'); if (b) navigator.clipboard?.writeText(b.dataset.copiar).then(() => toast('Copiado.')).catch(() => toast('No se pudo copiar.')); });
document.addEventListener('click', (e) => { const b = e.target.closest('[data-lead-alumna]'); if (b) { if ($('#dlg').open) $('#dlg').close(); openStudent(b.dataset.leadAlumna); } });
document.addEventListener('click', (e) => { if (e.target.closest('[data-crm-hoy]')) { Object.assign(S, { crmSeg: true, crmProg: '', crmQ: '', crmOrigen: '', crmSinCuenta: false, crmEtapa: '', crmTag: '', crmVista: 'embudo' }); go('interesadas'); } });
document.addEventListener('click', (e) => { if (e.target.closest('[data-crm-sincuenta-ya]')) { Object.assign(S, { crmSeg: false, crmProg: '', crmQ: '', crmOrigen: '', crmSinCuenta: true, crmEtapa: 'inscrita', crmTag: '', crmVista: 'tabla' }); go('interesadas'); } });
// Asistencia a una clase gratis: se marcan quienes entraron y pasan juntas a "Tomó la clase"
document.addEventListener('change', (e) => { const t = e.target.closest('[data-asist-all]'); if (t) document.querySelectorAll('#dlg [data-asist]').forEach((c) => (c.checked = t.checked)); });
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-asist-go]'); if (!b) return;
  const ev = (A.cal || []).find((x) => x.id === b.dataset.asistGo);
  const marcadas = [...document.querySelectorAll('#dlg [data-asist]:checked')].map((c) => c.dataset.asist);
  if (!marcadas.length) return toast('Marca a quienes entraron a la clase.');
  const ids = marcadas.filter((id) => (RANGO_ETAPA[leadEtapa(A.leads.find((l) => l.id === id) || {})] ?? 0) < RANGO_ETAPA.asistio_confirmado); // no se retrocede a quien ya va más adelante
  if (!ids.length) return toast('Todas esas ya estaban más adelante en el embudo.');
  b.disabled = true;
  try {
    const manana = ymd(hoyCL() + 864e5), hoy = ymd(hoyCL());
    const pide = (id) => { const q = personaDe(id); return FUNC.tareas && !!q && (!q.followUp || q.followUp < hoy); }; // solo a quien no tiene ya un seguimiento pendiente
    const conSeg = ids.filter(pide), sinSeg = ids.filter((id) => !pide(id));
    if (sinSeg.length) await data.leads({ action: 'estado', ids: sinSeg, status: 'asistio_confirmado' });
    if (conSeg.length) await data.leads({ action: 'estado', ids: conSeg, status: 'asistio_confirmado', followUp: manana });
    A.leads.forEach((l) => { if (ids.includes(l.id)) { l.status = 'asistio_confirmado'; l.eventos = [...(l.eventos || []), { t: Date.now(), tipo: 'etapa', texto: `Etapa: ${etapaNombre('asistio_confirmado')}` }]; if (conSeg.includes(l.id)) l.followUp = manana; } });
    A._per = null; paintNav(); render(false);
    if (ev && $('#dlg').open) calForm(ev);
    toast(`${ids.length} persona${ids.length === 1 ? '' : 's'} marcada${ids.length === 1 ? '' : 's'} como que tomó la clase.`);
  } catch (err) { fail(err); b.disabled = false; }
});
document.addEventListener('click', (e) => { const a = e.target.closest('[data-wa-open]'); if (!a) return; e.preventDefault(); if ($('#dlg').open) $('#dlg').close(); waOpen(a.dataset.waOpen, a.dataset.waName); go('whatsapp'); });
document.addEventListener('click', (e) => { const b = e.target.closest('[data-wa-chat]'); if (b) { waOpen(b.dataset.waChat, ''); waRepaint(); } });
function paintNav() {
  // Estando en la sección, lo que llegue mientras la miras cuenta como visto
  if (S.view === 'interesadas') marcarVisto('interesadas', Math.max(0, ...(A.leads || []).map((l) => l.createdAt || 0)));
  if (S.view === 'alumnas' || S.view === 'ficha') marcarVisto('alumnas', Math.max(0, ...A.students.map((u) => u.createdAt?.toMillis?.() || 0)));
  $('#nav').innerHTML = NAV.map(([k, n, ic, c]) => { if (k === '--') return `<div class="nav-label">${n}</div>`; const cnt = c ? c() : 0; return `<button data-go="${k}" ${S.view === k || (S.view === 'ficha' && k === 'alumnas') || (S.view === 'clase' && k === 'formacion') ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24">${ic}</svg>${n}${cnt ? `<span class="count">${cnt}</span>` : ''}</button>`; }).join('');
}
function render(top = true) {
  A._vin = null; A._per = null;
  paintNav();
  $('#view').innerHTML = V[S.view]();
  if (top) scrollTo(0, 0);
  bind();
}
function go(v) {
  // Las marcadas como nuevas son las que llegaron desde la visita anterior a Respuestas de clase
  if (v === 'respuestas' && S.view !== 'respuestas') { seen = seenAt(); markSeen(); }
  S.view = v; $('#side').classList.remove('open'); $('#scrim').hidden = true; render();
  if (v === 'formacion' && !A.course) data.course().then(() => S.view === 'formacion' && render(false)).catch(fail);
  if (v === 'respuestas') {
    loadAnswers(true).then(() => { if (S.view === 'respuestas') render(false); }).catch(fail);
  }
  if (v === 'interesadas') data.leads().then(() => { if (S.view === 'interesadas') render(false); }).catch(fail);
  if (v === 'whatsapp') {
    if (A.wa.on === null) waApi({ action: 'estado' }).then((r) => { A.wa.on = r.configurado; if (!r.configurado && S.view === 'whatsapp') render(false); }).catch(() => {});
    if (S.waOpen) { const m = $('#wa-msgs'); if (m) m.scrollTop = m.scrollHeight; }
  }
  if (v === 'envios' && !A.plantillas) data.plantillas().then(() => { if (S.view === 'envios') render(false); }).catch(fail);
  if (v === 'calendario') data.cal().then(() => { if (S.view === 'calendario') render(false); }).catch(fail);
}
async function openStudent(uid) {
  S.open = uid; go('ficha');
  try { await Promise.all([data.payments(uid), loadAnswers()]); if (S.view === 'ficha' && S.open === uid) render(false); } catch (e) { fail(e); }
}
function bind() {
  document.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => openStudent(b.dataset.open)));
  document.querySelectorAll('[data-filter]').forEach((b) => (b.onclick = () => { S.filter = b.dataset.filter; render(false); }));
  document.querySelectorAll('[data-ans-lv]').forEach((b) => (b.onclick = () => { S.ansLv = Number(b.dataset.ansLv); render(false); }));
  document.querySelectorAll('[data-ans-who]').forEach((b) => (b.onclick = () => { S.ansWho = b.dataset.ansWho; S.ansLv = 0; go('respuestas'); }));
  document.querySelectorAll('[data-ans-reload]').forEach((b) => (b.onclick = () => { b.disabled = true; loadAnswers(true).then(() => render(false)).catch(fail); }));
  if (S.view === 'whatsapp') waBind();
  document.querySelectorAll('[data-crm-vista]').forEach((b) => (b.onclick = () => { S.crmVista = b.dataset.crmVista; render(false); }));
  document.querySelectorAll('[data-crm-prog]').forEach((b) => (b.onclick = () => { S.crmProg = b.dataset.crmProg; S.leadSel = new Set(); render(false); }));
  document.querySelectorAll('[data-crm-metrica]').forEach((b) => (b.onclick = () => { S.crmMetrica = b.dataset.crmMetrica; render(false); }));
  document.querySelectorAll('[data-crm-csv]').forEach((b) => (b.onclick = () => exportarCsv()));
  const cr = $('#crm-rango'); if (cr) cr.onchange = () => { S.crmRango = cr.value; render(false); };
  const ct = $('#crm-tag'); if (ct) ct.onchange = () => { S.crmTag = ct.value; render(false); };
  const be = $('#bulk-etapa');
  if (be) be.onchange = async () => {
    const prog = progDe(S.crmProg), status = be.value; if (!status || !prog) return;
    const ids = personas().filter((q) => S.leadSel.has(q.id)).map((q) => tracksEn(q, prog)[0]?.id).filter(Boolean);
    if (!ids.length) { be.value = ''; return toast('Esas personas no tienen registro en este programa.'); }
    if (!confirm(`¿Mover ${ids.length} persona${ids.length === 1 ? '' : 's'} a «${etapaTxt(prog[0], status)}» en ${prog[1]}?`)) { be.value = ''; return; }
    try {
      for (let i = 0; i < ids.length; i += 200) await data.leads({ action: 'estado', ids: ids.slice(i, i + 200), status });
      A.leads.forEach((l) => { if (ids.includes(l.id)) { l.status = status; l.eventos = [...(l.eventos || []), { t: Date.now(), tipo: 'etapa', texto: `Etapa: ${etapaNombre(status)}` }]; } });
      S.leadSel = new Set(); A._per = null; paintNav(); render(false); toast(`${ids.length} movida${ids.length === 1 ? '' : 's'}.`);
    } catch (e) { fail(e); be.value = ''; }
  };
  document.querySelectorAll('[data-bulk-tag]').forEach((b) => (b.onclick = async () => {
    const t = ($('#bulk-tag').value || '').trim(); if (!t) return toast('Escribe la etiqueta.');
    const ids = personas().filter((q) => S.leadSel.has(q.id)).flatMap((q) => q.leads.map((l) => l.id));
    b.disabled = true;
    try {
      for (let i = 0; i < ids.length; i += 200) await data.leads({ action: 'etiquetas', ids: ids.slice(i, i + 200), agregar: [t] });
      A.leads.forEach((l) => { if (ids.includes(l.id)) l.tags = [...new Set([...(l.tags || []), t])]; });
      A._per = null; render(false); toast(`Etiqueta «${t}» agregada.`);
    } catch (e) { fail(e); b.disabled = false; }
  }));
  document.querySelectorAll('[data-crm-kpi]').forEach((b) => (b.onclick = () => {
    const k = b.dataset.crmKpi, prog = progDe(S.crmProg), primera = prog && esClase(prog[0]) ? 'registrada' : 'nuevo';
    S.crmLista = k === 'clic' && S.crmLista !== 'clic' ? 'clic' : '';
    if (k === 'todos') Object.assign(S, { crmQ: '', crmOrigen: '', crmEtapa: '', crmTag: '', crmSeg: false, crmSinCuenta: false });
    else if (k === 'nuevas') S.crmEtapa = S.crmEtapa === primera ? '' : primera;
    else if (k === 'seg') S.crmSeg = !S.crmSeg;
    else if (k === 'sin') S.crmSinCuenta = !S.crmSinCuenta;
    render(false);
  }));
  document.querySelectorAll('.menu-lista button').forEach((b) => b.addEventListener('click', () => b.closest('details')?.removeAttribute('open')));
  document.querySelectorAll('[data-crm-lista]').forEach((b) => (b.onclick = () => { S.crmLista = b.dataset.crmLista; go('interesadas'); }));
  document.querySelectorAll('[data-seg-replay]').forEach((a) => (a.onclick = () => {
    const l = A.leads.find((x) => x.id === a.dataset.segReplay); if (!l) return;
    if (horaChile() < 8 || horaChile() >= 22) { return toast('No se envía entre las 22:00 y las 8:00 (hora de Chile).'); }
    data.leads({ action: 'enviado', ids: [l.id], canal: 'whatsapp', plantilla: 'replay_seguimiento', seguimiento: 'replay' }).then(() => { l.seguimientoReplayT = Date.now(); l.ultimoEnvio = { ...(l.ultimoEnvio || {}), whatsapp: Date.now() }; render(false); }).catch(fail);
  }));
  document.querySelectorAll('[data-env-ir]').forEach((b) => (b.onclick = () => { S.envClase = b.dataset.envIr; S.envSeg = 'oferta'; go('envios'); }));
  document.querySelectorAll('[data-clic-orden]').forEach((b) => (b.onclick = () => { S.clicOrden = b.dataset.clicOrden; render(false); }));
  const cf = $('#cfg-form'); if (cf) cf.onsubmit = (e) => { e.preventDefault(); guardarClases(cf); };
  const gf = $('#gr-form');
  if (gf) {
    gf.onsubmit = (e) => { e.preventDefault(); guardarGratis(); };
    gf.querySelectorAll('[data-gr-agregar]').forEach((b) => (b.onclick = () => {
      gratisLeer(); const g = b.dataset.grAgregar;
      gratisBorrador().push({ id: gratisNuevoId(), grupo: g, titulo: '', video: '', orden: Math.max(0, ...gratisBorrador().filter((c) => c.grupo === g).map((c) => Number(c.orden) || 0)) + 1, gratis: true });
      render(false);
    }));
    gf.querySelectorAll('[data-gr-quitar]').forEach((b) => (b.onclick = () => {
      gratisLeer(); if (!confirm('¿Quitar esta clase de la lista? Se borra al guardar.')) return;
      A.gratisDraft = gratisBorrador().filter((c) => c.id !== b.dataset.grQuitar); render(false);
    }));
  }
  document.querySelectorAll('[data-crm-preparar]').forEach((b) => (b.onclick = () => prepararContactos()));
  document.querySelectorAll('[data-crm-clasificar]').forEach((b) => (b.onclick = () => clasificarClase()));
  document.querySelectorAll('[data-env-clase]').forEach((b) => (b.onclick = () => { S.envClase = b.dataset.envClase; render(false); }));
  document.querySelectorAll('[data-env-seg]').forEach((b) => (b.onclick = () => { S.envSeg = b.dataset.envSeg; render(false); }));
  document.querySelectorAll('[data-env-csv]').forEach((b) => (b.onclick = () => exportarEnvioCsv()));
  document.querySelectorAll('[data-env-guardar]').forEach((b) => (b.onclick = async () => {
    const clave = `${S.envClase || 'pendulo'}_${S.envSeg || 'entro'}`, texto = $('#env-texto').value.trim();
    try { await setDoc(doc(db, 'config', 'plantillas'), { [clave]: texto, updatedAt: serverTimestamp() }, { merge: true }); A.plantillas[clave] = texto; render(false); toast('Texto guardado.'); } catch (e) { fail(e); }
  }));
  const envCanal = (canal) => (a) => (a.onclick = (e) => {
    const l = A.leads.find((x) => x.id === a.dataset[canal === 'whatsapp' ? 'envWa' : 'envMail']); if (!l) return;
    if (horaChile() < 8 || horaChile() >= 22) { e.preventDefault(); return toast('No se envía entre las 22:00 y las 8:00 (hora de Chile).'); }
    if (l.ultimoEnvio?.[canal] && diaChile(l.ultimoEnvio[canal]) === diaChile(Date.now())) { e.preventDefault(); return toast(`Ya le escribiste hoy por ${canal === 'whatsapp' ? 'WhatsApp' : 'correo'}: máximo un mensaje por canal al día. Mañana puedes volver a escribirle.`); }
    if (l.noContactar || (personaDe(l.id)?.tags || []).includes('No contactar')) { e.preventDefault(); return toast('Pidió que no le escribamos.'); }
    envioMarcar(l, canal);
  });
  document.querySelectorAll('[data-env-wa]').forEach(envCanal('whatsapp'));
  document.querySelectorAll('[data-env-mail]').forEach(envCanal('email'));
  document.querySelectorAll('[data-env-parar]').forEach((b) => (b.onclick = async () => {
    const l = A.leads.find((x) => x.id === b.dataset.envParar); if (!l) return;
    if (!confirm(`¿Marcar a ${l.name} como «No contactar»? Sale de todos los envíos y no se le escribe más.`)) return;
    const q = personaDe(l.id), ids = q ? q.leads.map((x) => x.id) : [l.id];
    try { await data.leads({ action: 'etiquetas', ids, agregar: ['No contactar'] }); A.leads.forEach((x) => { if (ids.includes(x.id)) x.tags = [...new Set([...(x.tags || []), 'No contactar'])]; }); A._per = null; render(false); toast('Listo: no se le escribe más.'); } catch (e) { fail(e); }
  }));
  document.querySelectorAll('[data-env-copy]').forEach((b) => (b.onclick = () => {
    const l = A.leads.find((x) => x.id === b.dataset.envCopy); if (!l) return;
    const texto = rellenar(textoEnvio(S.envClase || 'pendulo', S.envSeg || 'entro'), l);
    navigator.clipboard?.writeText(texto).then(() => toast('Mensaje copiado.')).catch(() => toast('No se pudo copiar.'));
  }));
  document.querySelectorAll('[data-crm-sincuenta]').forEach((b) => (b.onclick = () => { S.crmSinCuenta = !S.crmSinCuenta; render(false); }));
  const ce = $('#crm-etapa'); if (ce) ce.onchange = () => { S.crmEtapa = ce.value; render(false); };
  document.querySelectorAll('[data-crm-seg]').forEach((b) => (b.onclick = () => { S.crmSeg = !S.crmSeg; render(false); }));
  document.querySelectorAll('[data-crm-desc]').forEach((b) => (b.onclick = () => { S.crmDesc = !S.crmDesc; render(false); }));
  const co = $('#crm-origen'); if (co) co.onchange = () => { S.crmOrigen = co.value; render(false); };
  const cq = $('#crm-q'); if (cq) cq.oninput = () => { S.crmQ = cq.value; const p = cq.selectionStart; render(false); const c2 = $('#crm-q'); c2.focus(); c2.setSelectionRange(p, p); };
  document.querySelectorAll('[data-lead-open]').forEach((b) => (b.onclick = (e) => { if (e.target.closest('a')) return; S.fichaTab = 'resumen'; leadFicha(b.dataset.leadOpen); }));
  document.querySelectorAll('[data-lead-card]').forEach((c) => (c.ondragstart = (e) => { e.dataTransfer.setData('text/plain', c.dataset.leadCard); e.dataTransfer.effectAllowed = 'move'; }));
  document.querySelectorAll('[data-kb-col]').forEach((col) => {
    col.ondragover = (e) => { e.preventDefault(); col.classList.add('over'); };
    col.ondragleave = () => col.classList.remove('over');
    col.ondrop = (e) => { e.preventDefault(); col.classList.remove('over'); const id = e.dataTransfer.getData('text/plain'); if (id) leadMover(id, col.dataset.kbCol); };
  });
  document.querySelectorAll('[data-lead-sel]').forEach((cb) => (cb.onchange = () => { cb.checked ? S.leadSel.add(cb.dataset.leadSel) : S.leadSel.delete(cb.dataset.leadSel); render(false); }));
  document.querySelectorAll('[data-lead-all]').forEach((cb) => (cb.onchange = () => { S.leadSel = cb.checked ? new Set(personasFiltradas().map((p) => p.id)) : new Set(); render(false); }));
  document.querySelectorAll('[data-leads-clear]').forEach((b) => (b.onclick = () => { S.leadSel = new Set(); render(false); }));
  document.querySelectorAll('[data-leads-del]').forEach((b) => (b.onclick = async () => {
    const sel = personas().filter((q) => S.leadSel.has(q.id)), ids = sel.flatMap((q) => q.leads.map((l) => l.id));
    if (!ids.length || !confirm(`¿Eliminar ${sel.length} persona${sel.length === 1 ? '' : 's'}${ids.length > sel.length ? ` (${ids.length} registros en total)` : ''}? Se borran de tu lista y no se puede deshacer.`)) return;
    b.disabled = true;
    try {
      for (let i = 0; i < ids.length; i += 100) await data.leads({ action: 'delete', ids: ids.slice(i, i + 100) });
      A.leads = A.leads.filter((l) => !ids.includes(l.id)); A._per = null; S.leadSel = new Set(); paintNav(); render(false); toast(`${sel.length} eliminada${sel.length === 1 ? '' : 's'}.`);
    } catch (e) { fail(e); b.disabled = false; }
  }));
  document.querySelectorAll('[data-del-student]').forEach((b) => (b.onclick = async () => {
    const u = student(b.dataset.delStudent); if (!u) return;
    const conPago = paying(u) || ownedOf(u).length > 0;
    const t = prompt(`Vas a eliminar a ${nameOf(u)} y todo su avance, preguntas y pagos registrados. No se puede deshacer.${conPago ? '\n\nATENCIÓN: tiene pagos o niveles comprados.' : ''}\n\nEscribe ELIMINAR para confirmar:`);
    if (t?.trim() !== 'ELIMINAR') return;
    b.disabled = true;
    try { await api({ action: 'deleteStudent', uid: u.id, force: conPago }); A.students = A.students.filter((x) => x.id !== u.id); S.open = null; go('alumnas'); toast('Alumna eliminada.'); } catch (e) { fail(e); b.disabled = false; }
  }));
  document.querySelectorAll('[data-leads-dedup]').forEach((b) => (b.onclick = async () => {
    const sobran = repetidasPorLimpiar();
    if (!sobran.length) return;
    const ej = sobran.slice(0, 5).map((l) => `• ${l.name} (${LEAD_FORMS[l.form] || l.form})`).join('\n');
    if (!confirm(`Hay ${sobran.length} registro${sobran.length === 1 ? '' : 's'} repetido${sobran.length === 1 ? '' : 's'}: la misma persona en el mismo formulario con menos de 24 horas de diferencia.\n\nSe conserva el más avanzado de cada persona y se eliminan los demás. No se puede deshacer.\n\n${ej}${sobran.length > 5 ? '\n…' : ''}\n\n¿Eliminarlos?`)) return;
    b.disabled = true;
    try {
      const ids = sobran.map((l) => l.id);
      for (let i = 0; i < ids.length; i += 100) await data.leads({ action: 'delete', ids: ids.slice(i, i + 100) });
      A.leads = A.leads.filter((l) => !ids.includes(l.id)); S.leadSel = new Set(); paintNav(); render(false); toast(`${ids.length} repetida${ids.length === 1 ? '' : 's'} eliminada${ids.length === 1 ? '' : 's'}.`);
    } catch (e) { fail(e); b.disabled = false; }
  }));
  document.querySelectorAll('[data-leads-reload]').forEach((b) => (b.onclick = () => { b.disabled = true; data.leads().then(() => render(false)).catch(fail); }));
  document.querySelectorAll('[data-cal-add]').forEach((b) => (b.onclick = () => calForm()));
  document.querySelectorAll('[data-cal-ev]').forEach((b) => (b.onclick = () => calForm(A.cal.find((e) => e.id === b.dataset.calEv))));
  document.querySelectorAll('[data-cal-vista]').forEach((b) => (b.onclick = () => { S.calVista = b.dataset.calVista; render(false); }));
  document.querySelectorAll('[data-cal-hoy]').forEach((b) => (b.onclick = () => { S.calRef = hoyCL(); render(false); }));
  document.querySelectorAll('[data-cal-nav]').forEach((b) => (b.onclick = () => {
    const n = Number(b.dataset.calNav), d = new Date(S.calRef || hoyCL()), v = S.calVista;
    S.calRef = v === 'dia' ? d.getTime() + n * 864e5 : v === 'semana' ? d.getTime() + n * 7 * 864e5 : v === 'mes' ? Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1) : Date.UTC(d.getUTCFullYear() + n, d.getUTCMonth(), 1);
    render(false);
  }));
  document.querySelectorAll('[data-cal-dia]').forEach((b) => (b.onclick = () => { S.calRef = tOf(b.dataset.calDia); S.calVista = 'dia'; render(false); }));
  document.querySelectorAll('[data-cal-mes-ir]').forEach((b) => (b.onclick = () => { S.calRef = tOf(b.dataset.calMesIr); S.calVista = 'mes'; render(false); }));
  document.querySelectorAll('[data-lead-status]').forEach((s) => (s.onchange = () => leadMover(s.dataset.leadStatus, s.value)));
  const aw = $('#ans-who'); if (aw) aw.onchange = () => { S.ansWho = aw.value; render(false); };
  document.querySelectorAll('[data-lvopen]').forEach((b) => (b.onclick = () => { S.lvOpen[b.dataset.lvopen] = !S.lvOpen[b.dataset.lvopen]; render(false); }));
  document.querySelectorAll('[data-cls]').forEach((b) => (b.onclick = () => { const [id, i, j] = b.dataset.cls.split(','); S.cls = [id, +i, +j]; go('clase'); }));
  const fq = $('#fq'); if (fq) fq.oninput = () => { S.fq = fq.value; const p = fq.selectionStart; render(false); const f2 = $('#fq'); f2.focus(); f2.setSelectionRange(p, p); };
  const sq = $('#sq'); if (sq) sq.oninput = () => { S.q = sq.value; const p = sq.selectionStart; render(false); const s2 = $('#sq'); s2.focus(); s2.setSelectionRange(p, p); };
  document.querySelectorAll('[data-edit-student]').forEach((b) => (b.onclick = () => {
    const u = student(b.dataset.editStudent);
    dialog(`<span class="eyebrow">Alumna</span><h3>Editar datos</h3><p class="muted" style="margin:0 0 12px;font-size:.88rem">Cambia el nombre y los datos de contacto de ${esc(nameOf(u))}. La foto la elige ella.</p><div id="pf-box"></div>`);
    mountProfileEditor($('#pf-box'), {
      profile: { displayName: u.displayName || nameOf(u), phone: u.phone || '', country: u.country || '', bio: u.bio || '' },
      api: papi(u.id), toast, photo: false,
      onChange: (P) => { Object.assign(u, { displayName: P.displayName, phone: P.phone, country: P.country, bio: P.bio }); render(false); },
    });
  }));
  document.querySelectorAll('[data-block]').forEach((b) => (b.onclick = async () => {
    const u = student(b.dataset.block), blocked = !u.blocked;
    if (blocked && !confirm(`¿Bloquear a ${nameOf(u)}? No podrá abrir ningún nivel hasta que la desbloquees.`)) return;
    b.disabled = true;
    try { await data.setAccess(u.id, { blocked }); render(false); toast(blocked ? 'Alumna bloqueada' : 'Alumna desbloqueada'); } catch (e) { fail(e); render(false); }
  }));
  document.querySelectorAll('input[data-lv]').forEach((cb) => (cb.onchange = async () => {
    const { lv: field, uid } = cb.dataset;
    const levels = [...document.querySelectorAll(`input[data-lv="${field}"][data-uid="${uid}"]`)].filter((x) => x.checked).map((x) => Number(x.value));
    document.querySelectorAll('input[data-lv]').forEach((x) => (x.disabled = true));
    try { await data.setAccess(uid, { [field]: levels }); render(false); const u = student(uid);
      toast(field === 'completedLevels' ? `Nivel ${lvName(+cb.value)} ${cb.checked ? 'marcado como completado' : 'ya no está completado'}` : field === 'unlockedLevels' && cb.checked && !paying(u) ? `Nivel ${lvName(+cb.value)} guardado, pero no se le abre hasta que pague. Para abrírselo ya, márcalo en «Abiertos siempre».` : `${cb.checked ? 'Desbloqueado' : 'Cerrado'} el Nivel ${lvName(+cb.value)}`); } catch (e) { fail(e); render(false); }
  }));
  document.querySelectorAll('input[data-n4cls]').forEach((cb) => (cb.onchange = async () => {
    const { n4cls: c, uid } = cb.dataset;
    const ks = [...document.querySelectorAll(`input[data-n4cls="${c}"][data-uid="${uid}"]`)].filter((x) => x.checked).map((x) => Number(x.value));
    document.querySelectorAll('input[data-n4cls]').forEach((x) => (x.disabled = true));
    // curso que aún no tiene: se le abre en el programa si lo tiene pagado, si no en «Abiertos siempre»
    const u = student(uid), body = { n4Classes: { [c]: ks } };
    if (!hasCourse(u, +c)) { const f = paying(u) ? 'unlockedLevels' : 'ownedLevels'; body[f] = inOrder([...(f === 'unlockedLevels' ? unlockedOf(u) : ownedOf(u)), +c]); }
    try { await data.setAccess(uid, body); render(false); toast(`${cb.checked ? 'Abierta' : 'Cerrada'} la Clase ${cb.value} del Nivel ${lvName(+c)}`); } catch (e) { fail(e); render(false); }
  }));
  document.querySelectorAll('form[data-msg-one]').forEach((f) => (f.onsubmit = async (e) => {
    e.preventDefault(); const v = f.querySelector('textarea').value.trim(); if (!v) return;
    f.querySelector('button').disabled = true;
    try { await data.notify([f.dataset.msgOne], v); f.reset(); toast('Mensaje enviado'); } catch (err) { fail(err); }
    f.querySelector('button').disabled = false;
  }));
  const mf = $('#msg-form'); if (mf) mf.onsubmit = async (e) => {
    e.preventDefault(); const v = $('#msg-text').value.trim(), to = $('#msg-to').value; if (!v) return toast('Escribe tu mensaje');
    const uids = to === 'all' ? A.students.map((u) => u.id) : to === 'access' ? A.students.filter((u) => openOf(u).length > 0).map((u) => u.id)
      : to.startsWith('lvl') ? A.students.filter((u) => openOf(u).includes(Number(to.slice(3)))).map((u) => u.id) : [to];
    if (!uids.length) return toast('No hay alumnas en ese grupo');
    if (uids.length > 1 && !confirm(`¿Enviar este mensaje a ${uids.length} alumnas?`)) return;
    mf.querySelector('button').disabled = true;
    try { await data.notify(uids, v); mf.reset(); toast(uids.length > 1 ? `Mensaje enviado a ${uids.length} alumnas` : 'Mensaje enviado'); } catch (err) { fail(err); }
    mf.querySelector('button').disabled = false;
  };
  document.querySelectorAll('form[data-answer]').forEach((f) => (f.onsubmit = async (e) => {
    e.preventDefault(); const q = A.questions[+f.dataset.answer], v = f.querySelector('textarea').value.trim(); if (!q || !v) return;
    f.querySelector('button').disabled = true;
    try { await data.answer(q, v); render(false); toast('Respuesta enviada'); } catch (err) { f.querySelector('button').disabled = false; fail(err); }
  }));
  document.querySelectorAll('form[data-ticket]').forEach((f) => (f.onsubmit = async (e) => {
    e.preventDefault(); const t = A.tickets[+f.dataset.ticket]; if (!t) return;
    f.querySelector('button').disabled = true;
    try { await data.closeTicket(t, f.querySelector('textarea').value.trim()); render(false); toast('Mensaje cerrado'); } catch (err) { f.querySelector('button').disabled = false; fail(err); }
  }));
  document.querySelectorAll('[data-delpost]').forEach((b) => (b.onclick = async () => {
    if (!confirm('¿Borrar esta publicación de la comunidad?')) return;
    try { await data.deletePost(b.dataset.delpost); render(false); toast('Publicación borrada'); } catch (e) { fail(e); }
  }));
  const wv = $('#wv-form'); if (wv) wv.onsubmit = async (e) => {
    e.preventDefault(); const u = $('#wv-url').value.trim(); if (u && !isHttps(u)) return toast('El enlace debe empezar con https://');
    try { await data.saveConfig({ welcomeVideo: u }); toast('Video de bienvenida guardado'); } catch (err) { fail(err); }
  };

  const cl = $('#cl-form'); if (cl) cl.onsubmit = async (e) => {
    e.preventDefault();
    const enlaceTerapias = $('#cl-terapias').value.trim();
    if (enlaceTerapias && !isHttps(enlaceTerapias)) return toast('Los enlaces deben empezar con https://');
    try { await data.saveClases({ enlaceTerapias }); toast('Enlace de terapias guardado'); } catch (err) { fail(err); }
  };
}
const papi = (uid) => profileApi(uid);
function dialog(html, ancha = false) { $('#dlg-body').innerHTML = html; const d = $('#dlg'); d.classList.toggle('wide', ancha); d.classList.remove('contacto'); if (!d.open) d.showModal(); }
$('#dlg-x').onclick = () => $('#dlg').close();
$('#dlg').addEventListener('click', (e) => { if (e.target.id === 'dlg') $('#dlg').close(); });
function paintMe() {
  const m = A.me, ph = photoCss(m?.photoURL), a = $('#me-av');
  $('#me-name').textContent = nameOf(m);
  a.className = 'av karen' + (ph ? ' ph' : ''); a.style.cssText = ph; a.textContent = ph ? '' : initials(nameOf(m));
}
function openMyProfile() {
  dialog('<span class="eyebrow">Mi cuenta</span><h3>Mi perfil</h3><p class="muted" style="margin:0 0 12px;font-size:.88rem">Tu nombre y tu foto se ven en la comunidad y en las respuestas a las alumnas.</p><div id="pf-box"></div>');
  const m = A.me;
  mountProfileEditor($('#pf-box'), {
    profile: { displayName: m.displayName || nameOf(m), photoURL: m.photoURL || '', phone: m.phone || '', country: m.country || '', bio: m.bio || '' },
    api: papi(m.id), toast, hasGoogle: !!googlePhoto(),
    onChange: (P) => { Object.assign(m, { displayName: P.displayName, photoURL: P.photoURL || '', phone: P.phone, country: P.country, bio: P.bio }); paintMe(); },
  });
}
$('#me-card').onclick = openMyProfile;
$('#me-card').onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMyProfile(); } };
$('#menu-btn').onclick = () => { $('#side').classList.add('open'); $('#scrim').hidden = false; };
$('#scrim').onclick = () => { $('#side').classList.remove('open'); $('#scrim').hidden = true; };

function start(me) {
  A.me = me; paintMe();
  $('#login').hidden = true; $('#app').hidden = false;
  render();
}

// ---------- Sesión de la Maestra ----------
const setSessionCookie = (t) => {
  document.cookie = t ? `cm_session=${t}; Path=/; Max-Age=3600; SameSite=Lax; Secure` : 'cm_session=; Path=/; Max-Age=0; SameSite=Lax; Secure';
};
onIdTokenChanged(auth, async (u) => setSessionCookie(u ? await u.getIdToken() : ''));
api = async (body) => {
  const r = await fetch('/api/admin', {
    method: 'POST', headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(out.error || 'No se pudo completar la acción.');
  return out;
};
const ERR = {
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
};
const say = (m, ok) => { const el = $('#lg-msg'); el.textContent = m; el.className = ok ? 'bye' : 'muted'; el.hidden = !m; };
const lock = (v) => document.querySelectorAll('#lg-form button').forEach((b) => (b.disabled = v));

// Alumnas en vivo: apenas alguien se registra aparece aquí sin recargar
const DAY = 864e5;
const isNew = (u) => u.createdAt?.toMillis && Date.now() - u.createdAt.toMillis() < 7 * DAY;
let liveReady = false, liveOff = null;
function watchStudents() {
  liveOff?.();
  liveOff = onSnapshot(query(collection(db, 'users'), orderBy('createdAt', 'desc')), (snap) => {
    A.students = snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((u) => u.role !== 'admin');
    if (liveReady) snap.docChanges().filter((c) => c.type === 'added' && c.doc.data().role !== 'admin').forEach((c) => toast(`Nueva alumna registrada: ${nameOf({ ...c.doc.data() })}`));
    liveReady = true;
    const a = document.activeElement, typing = a && /INPUT|TEXTAREA|SELECT/.test(a.tagName) && a.value && a.id !== 'sq';
    if (!typing && !$('#dlg').open && ['alumnas', 'pagos', 'mensajes'].includes(S.view)) render(false);
    else paintNav();
  }, (e) => console.warn('alumnas', e.code));
}
// auto: la sesión que ya estaba abierta al cargar (si es de una alumna, solo se muestra el login sin cerrarla)
async function enter(u, auto = false) {
  say('Abriendo tu portal…', true);
  try {
    const me = await api({ action: 'me' });
    if (!me.admin) {
      if (auto) return say('');
      await signOut(auth); return say('Esta cuenta no es del Staff. Las alumnas entran por el aula.');
    }
    await u.getIdToken(true);
    await loadAll();
    watchStudents();
    waWatch();
    loadAnswers().then(paintNav).catch((e) => console.warn('respuestas', e.message));
    data.leads().then(() => { paintNav(); if (S.view === 'inicio') render(false); }).catch((e) => console.warn('interesadas', e.message));
    data.cal().then(() => { if (S.view === 'inicio') render(false); }).catch((e) => console.warn('calendario', e.message));
    const p = (await getDoc(doc(db, 'users', u.uid))).data() || {};
    start({ id: u.uid, ...p, displayName: p.displayName || 'Maestra Holística' });
  } catch (e) { console.error(e); say(e.message || 'No pudimos abrir el portal. Inténtalo de nuevo.'); }
}
$('#lg-form').onsubmit = async (e) => {
  e.preventDefault();
  const usuario = $('#lg-user').value.trim(), clave = $('#lg-pass').value;
  if (!usuario || !clave) return say('Escribe tu usuario y tu contraseña.');
  lock(true);
  try {
    const r = await fetch('/api/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ usuario, clave }) });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(out.error || 'No pudimos entrar. Inténtalo de nuevo.');
    const cred = await signInWithCustomToken(auth, out.token);
    await enter(cred.user);
  } catch (err) { say(ERR[err.code] || err.message || 'No pudimos entrar. Inténtalo de nuevo.'); }
  lock(false);
};
$('#logout').onclick = () => signOut(auth).then(() => { setSessionCookie(''); location.reload(); });

const current = await new Promise((res) => { const off = onAuthStateChanged(auth, (u) => { off(); res(u); }); });
if (current) enter(current, true); else say('');
