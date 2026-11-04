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
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => (t.hidden = true), 4200); }
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
  const [us, qs, tk, ps, cf, fm, cl] = await Promise.all([
    getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))),
    getDocs(query(collectionGroup(db, 'questions'), where('answered', '==', false), orderBy('createdAt', 'desc'), limit(100))),
    getDocs(query(collectionGroup(db, 'tickets'), where('status', '==', 'open'), orderBy('createdAt', 'desc'), limit(100))),
    getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(60))),
    getDoc(doc(db, 'config', 'aula')),
    getDoc(doc(db, 'config', 'formacion')),
    getDoc(doc(db, 'config', 'clases')),
  ]);
  A.formacion = fm.data() || {};
  A.clases = cl.data() || {};
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
    if (body.action === 'all') A.leads = out.leads;
    return A.leads;
  },
  deletePost: async (id) => { await deleteDoc(doc(db, 'posts', id)); A.posts = A.posts.filter((p) => p.id !== id); },
  saveConfig: async (d) => { await setDoc(doc(db, 'config', 'aula'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.config, d); },
  // Fecha de inicio y cupos del próximo grupo de la formación: los muestra la landing /formacion (src/app/api/formacion)
  // Enlaces de Google Meet de las clases gratis (se entregan al registrarse, src/app/api/leads).
  // El inicio de los cursos (/pendulo, /tarot) sale del Calendario (src/app/api/proximas).
  saveClases: async (d) => { await setDoc(doc(db, 'config', 'clases'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.clases, d); },
  saveFormacion: async (d) => { await setDoc(doc(db, 'config', 'formacion'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.formacion, d); },
};

// ---------- Vista ----------
const S = { view: 'inicio', leadSel: new Set(), crmVista: 'embudo', crmProg: '', crmQ: '', crmOrigen: '', crmSeg: false, crmDesc: false, q: '', open: null, filter: 'todas', lvOpen: {}, fq: '', cls: null, ansWho: '', ansLv: 0 };
const NAV = [
  ['inicio', 'Inicio', '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-6h4v6"/>'],
  ['--', 'CRM'],
  ['interesadas', 'Interesadas', '<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/>', () => leadsSinVer().length],
  ['whatsapp', 'WhatsApp', '<path d="M12 21a9 9 0 1 0-9-9c0 1.6.4 3.1 1.2 4.4L3 21l4.6-1.2A9 9 0 0 0 12 21z"/><path d="M9 8.5c.3 3 3 5.7 6.500 6.500"/>', () => A.wa.chats.reduce((n, c) => n + (c.unread || 0), 0)],
  ['calendario', 'Calendario', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'],
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
const nuevasLeads = () => (A.leads || []).filter((l) => leadEtapa(l) === 'nuevo');
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
const LEAD_FORMS = { pendulo: 'Péndulo Hebreo', 'clase-pendulo': 'Clase gratis Péndulo', tarot: 'Tarot Terapéutico', 'clase-tarot': 'Clase gratis Tarot', formacion: 'Formación', sala: 'Sala Abierta', terapias: 'Terapias', meditacion: 'Meditación', regalo: 'Portada · Sala Abierta' };
const LEAD_STATES = [['nuevo', 'Nueva'], ['contactado', 'Contactada'], ['clase', 'Tomó la clase'], ['conversando', 'En conversación'], ['inscrita', 'Inscrita'], ['descartado', 'Descartada']];
// Programas para filtrar: las dos clases gratis, los dos cursos, la formación completa y el resto de formularios
const LEAD_PROGS = [['clase-pendulo', 'Clase gratis Péndulo', ['clase-pendulo']], ['clase-tarot', 'Clase gratis Tarot', ['clase-tarot']], ['pendulo', 'Curso Péndulo', ['pendulo']],
  ['tarot', 'Tarot Terapéutico', ['tarot']], ['formacion', 'Formación completa', ['formacion']], ['otros', 'Otros', ['sala', 'terapias', 'meditacion', 'regalo']]];
// Mismo criterio que src/lib/server/whatsapp.js: solo dígitos con código de país (un celular chileno de 9 dígitos que empieza en 9 se toma como +56)
const waNum = (n) => { let d = String(n || '').replace(/\D/g, '').replace(/^00/, ''); if (d.length === 9 && d[0] === '9') d = `56${d}`; return d.length >= 8 && d.length <= 15 ? d : ''; };
const waLink = (n) => { const d = String(n || '').replace(/\D/g, ''); return d ? `https://wa.me/${d}` : ''; };
const leadOrigen = (l) => l.utm?.utm_source || 'directo';
const leadOrigenTxt = (l) => [l.utm?.utm_source && l.utm?.utm_medium ? `${l.utm.utm_source} / ${l.utm.utm_medium}` : l.utm?.utm_source, l.utm?.utm_campaign, l.utm?.utm_content].filter(Boolean).join(' · ') || 'Directo';
// Vínculos: una interesada y una alumna son la misma persona si comparten correo o WhatsApp (sirve también para detectar registros repetidos)
const llavesDe = (x) => [String(x.email || '').trim().toLowerCase(), waNum(x.whatsapp || x.phone)].filter(Boolean);
const vinculos = () => {
  const sig = `${A.leads?.length ?? -1}|${A.students.length}`;
  if (A._vin?.sig === sig) return A._vin; // se recalcula si cambió la cantidad de interesadas o de alumnas
  const alumna = new Map(), porLlave = new Map();
  A.students.forEach((u) => llavesDe(u).forEach((k) => { if (!alumna.has(k)) alumna.set(k, u); }));
  (A.leads || []).forEach((l) => llavesDe(l).forEach((k) => { if (!porLlave.has(k)) porLlave.set(k, []); porLlave.get(k).push(l); }));
  return (A._vin = { sig, alumna, porLlave });
};
const alumnaDe = (l) => { const v = vinculos(); for (const k of llavesDe(l)) if (v.alumna.has(k)) return v.alumna.get(k); return null; };
const otrasDe = (l) => { const v = vinculos(), vistos = new Set([l.id]), out = []; for (const k of llavesDe(l)) for (const x of v.porLlave.get(k) || []) if (!vistos.has(x.id)) { vistos.add(x.id); out.push(x); } return out; };
const leadsDeAlumna = (u) => { const v = vinculos(), vistos = new Set(), out = []; for (const k of llavesDe(u)) for (const x of v.porLlave.get(k) || []) if (!vistos.has(x.id)) { vistos.add(x.id); out.push(x); } return out; };
const pagoOAbierto = (u) => paying(u) || ownedOf(u).length > 0;
// Etapa que se muestra: quien ya paga o compró algo figura como Inscrita aunque nadie lo haya marcado (el webhook de Stripe lo guarda de ahora en adelante)
const leadEtapa = (l) => {
  const e = LEAD_STATES.some(([k]) => k === l.status) ? l.status : 'nuevo';
  if (['nuevo', 'contactado', 'clase', 'conversando'].includes(e)) { const u = alumnaDe(l); if (u && pagoOAbierto(u)) return 'inscrita'; }
  return e;
};
const seguimientoHoy = (l) => !!l.followUp && l.followUp <= ymd(hoyCL()) && !['inscrita', 'descartado'].includes(leadEtapa(l));
const leadsFiltradas = () => {
  const q = (S.crmQ || '').toLowerCase().trim(), prog = LEAD_PROGS.find((x) => x[0] === S.crmProg);
  return (A.leads || []).filter((l) => (!prog || prog[2].includes(l.form))
    && (!S.crmOrigen || leadOrigen(l) === S.crmOrigen)
    && (!S.crmSeg || seguimientoHoy(l))
    && (!q || [l.name, l.email, l.whatsapp, l.interest, l.message, l.note].join(' ').toLowerCase().includes(q)));
};
const leadContacto = (l) => { const wa = waLink(l.whatsapp); return `${wa ? `<a href="${wa}" data-wa-open="${esc(waNum(l.whatsapp))}" data-wa-name="${esc(l.name)}" title="Escribirle desde el portal">${esc(l.whatsapp)}</a>` : ''}${l.whatsapp && l.email ? ' · ' : ''}${esc(l.email)}${l.country ? ` · ${esc(l.country)}` : ''}`; };
const alumnaBadge = (l) => { const u = alumnaDe(l), o = otrasDe(l); return `${u ? `<span class="pill ${pagoOAbierto(u) ? 'done' : 'pres'}" title="Ya tiene cuenta en el aula">${pagoOAbierto(u) ? 'Alumna' : 'Con cuenta'}</span>` : ''}${o.length ? `<span class="pill lock" title="${esc(o.map((x) => LEAD_FORMS[x.form] || x.form).join(', '))}">+${o.length} registro${o.length === 1 ? '' : 's'}</span>` : ''}`; };
const segBadge = (l) => (l.followUp ? `<span class="pill ${seguimientoHoy(l) ? 'bad' : 'lock'}" title="Próximo seguimiento">${seguimientoHoy(l) ? 'Seguimiento hoy' : `Seguir ${fechaLarga(l.followUp)}`}</span>` : '');

V.interesadas = () => {
  const head = `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>CRM · Interesadas</h1><p>Personas que dejaron sus datos en la página. Muévelas por el embudo, escribe notas y fija cuándo volver a escribirles.</p></div><button class="btn btn-ghost btn-sm" data-leads-reload>Actualizar</button></div>`;
  if (!A.leads) return `${head}<div class="card empty">Cargando interesadas…</div>`;
  const sinLink = [['enlacePendulo', 'Péndulo'], ['enlaceTarot', 'Tarot'], ['enlaceTerapias', 'terapias online']].filter(([k]) => !A.clases?.[k]).map(([, n]) => n);
  const aviso = sinLink.length ? `<div class="card" style="padding:12px 14px;font-size:.88rem;border-left:4px solid #b8402f"><b>Falta el enlace de Google Meet de ${sinLink.join(', ')}.</b> Mientras no esté, quienes se registren no ven el botón para entrar. Cárgalo en <button class="link" data-go="ajustes">Ajustes del aula</button>.</div>` : '';
  const lista = leadsFiltradas(), vista = S.crmVista || 'embudo';
  const chip = (attr, v, t, on) => `<button class="chip" ${attr}="${esc(v)}" aria-pressed="${on}">${t}</button>`;
  const origenes = [...new Set(A.leads.map(leadOrigen))].sort();
  const nSeg = A.leads.filter(seguimientoHoy).length;
  const controles = `<div class="filters">${chip('data-crm-vista', 'embudo', 'Embudo', vista === 'embudo')}${chip('data-crm-vista', 'tabla', 'Tabla', vista === 'tabla')}
    <input type="text" id="crm-q" placeholder="Buscar por nombre, correo, WhatsApp o nota" value="${esc(S.crmQ || '')}" style="flex:1;min-width:220px;border-radius:999px">
    <select id="crm-origen" aria-label="Origen" style="border-radius:999px"><option value="">Todos los orígenes</option>${origenes.map((o) => `<option value="${esc(o)}" ${S.crmOrigen === o ? 'selected' : ''}>${esc(o === 'directo' ? 'Directo' : o)}</option>`).join('')}</select>
    <button class="chip" data-crm-seg aria-pressed="${!!S.crmSeg}">Seguimiento hoy${nSeg ? ` (${nSeg})` : ''}</button></div>
    <div class="filters">${chip('data-crm-prog', '', `Todas (${A.leads.length})`, !S.crmProg)}${LEAD_PROGS.map(([k, t, fs]) => chip('data-crm-prog', k, `${t} (${A.leads.filter((l) => fs.includes(l.form)).length})`, S.crmProg === k)).join('')}</div>`;

  if (vista === 'tabla') {
    const sel = S.leadSel, barra = sel.size ? `<div class="filters" style="padding:0 4px 12px"><b>${sel.size} seleccionada${sel.size === 1 ? '' : 's'}</b><button class="btn btn-ghost btn-sm" style="color:#b8402f" data-leads-del>Eliminar seleccionadas</button><button class="link" data-leads-clear>Quitar selección</button></div>` : '';
    return `${head}${aviso}${controles}
    <section class="card panel">${barra}<div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:32px"><input type="checkbox" data-lead-all aria-label="Seleccionar todas" ${lista.length && lista.every((l) => sel.has(l.id)) ? 'checked' : ''}></th><th>Persona</th><th>Programa</th><th>Le interesa</th><th>Origen</th><th>Fecha</th><th>Seguimiento</th><th>Etapa</th></tr></thead><tbody>
    ${lista.map((l) => `<tr>
      <td><input type="checkbox" data-lead-sel="${esc(l.id)}" aria-label="Seleccionar a ${esc(l.name)}" ${sel.has(l.id) ? 'checked' : ''}></td>
      <td><button class="link" data-lead-open="${esc(l.id)}" style="font-weight:700">${esc(l.name)}</button><br><span class="muted" style="font-size:.84rem">${leadContacto(l)}</span></td>
      <td>${esc(LEAD_FORMS[l.form] || l.form)}</td>
      <td>${esc(l.interest)}${l.note ? `<br><span class="muted" style="font-size:.84rem">📝 ${esc(l.note.slice(0, 80))}${l.note.length > 80 ? '…' : ''}</span>` : ''}</td>
      <td class="muted" style="font-size:.84rem">${esc(leadOrigenTxt(l))}</td>
      <td class="muted" style="font-size:.84rem">${fdateMs(l.createdAt)}</td>
      <td>${alumnaBadge(l)}${segBadge(l)}</td>
      <td><select data-lead-status="${esc(l.id)}" aria-label="Etapa">${LEAD_STATES.map(([k, t]) => `<option value="${k}" ${leadEtapa(l) === k ? 'selected' : ''}>${t}</option>`).join('')}</select></td></tr>`).join('') || '<tr><td colspan="8" class="muted">No hay interesadas con estos filtros.</td></tr>'}
    </tbody></table></div></section>`;
  }

  // Embudo: una columna por etapa; se arrastran las tarjetas o se cambia la etapa desde su ficha
  const verDesc = !!S.crmDesc, etapas = LEAD_STATES.filter(([k]) => verDesc || k !== 'descartado');
  const tarjeta = (l) => `<article class="kb-card" draggable="true" data-lead-card="${esc(l.id)}" data-lead-open="${esc(l.id)}">
      <b>${esc(l.name)}</b><span class="muted">${esc(LEAD_FORMS[l.form] || l.form)} · ${fdateMs(l.createdAt).split(',')[0]}</span>
      ${l.interest ? `<small>${esc(l.interest)}</small>` : ''}${l.note ? `<small class="muted">📝 ${esc(l.note.slice(0, 70))}${l.note.length > 70 ? '…' : ''}</small>` : ''}
      <div class="kb-meta">${alumnaBadge(l)}${segBadge(l)}${l.whatsapp ? `<a class="btn btn-ghost btn-sm" href="${waLink(l.whatsapp)}" data-wa-open="${esc(waNum(l.whatsapp))}" data-wa-name="${esc(l.name)}">WhatsApp</a>` : ''}</div></article>`;
  return `${head}${aviso}${controles}
  <div class="filters"><button class="chip" data-crm-desc aria-pressed="${verDesc}">Mostrar descartadas (${lista.filter((l) => leadEtapa(l) === 'descartado').length})</button><span class="muted" style="font-size:.82rem">Arrastra una tarjeta a otra columna para cambiar su etapa. Toca una tarjeta para ver su ficha.</span></div>
  <div class="kb">${etapas.map(([k, t]) => { const col = lista.filter((l) => leadEtapa(l) === k); return `<section class="kb-col" data-kb-col="${k}"><h4>${t} <span class="count">${col.length}</span></h4>${col.map(tarjeta).join('') || '<p class="muted" style="font-size:.82rem;margin:0">Nadie aquí.</p>'}</section>`; }).join('')}</div>`;
};

// Ficha de una interesada: datos, etapa, nota y próximo seguimiento
function leadFicha(id) {
  const l = (A.leads || []).find((x) => x.id === id); if (!l) return;
  const k = (t, v) => (v ? `<dt>${t}</dt><dd>${v}</dd>` : '');
  dialog(`<span class="eyebrow">Interesada</span><h3>${esc(l.name)}</h3>
  <dl class="kv" style="margin:8px 0 12px">${k('Contacto', leadContacto(l))}${k('Programa', esc(LEAD_FORMS[l.form] || l.form))}${k('Le interesa', esc(l.interest))}${k('Mensaje', esc(l.message))}${k('Clase', l.claseFecha ? esc(fechaLarga(l.claseFecha)) : '')}${k('Origen', esc(leadOrigenTxt(l)))}${k('Registrada', fdateMs(l.createdAt))}</dl>
  <form id="lead-form" class="cal-form">
    ${(() => { const u = alumnaDe(l), o = otrasDe(l); return `${u ? `<div class="card full" style="padding:10px 14px;font-size:.86rem;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap"><span><b>Ya tiene cuenta en el aula:</b> ${esc(nameOf(u))} · ${esc(payState(u)[1])}</span><button type="button" class="btn btn-ghost btn-sm" data-lead-alumna="${esc(u.id)}">Ver su ficha</button></div>` : ''}${o.length ? `<div class="card full" style="padding:10px 14px;font-size:.84rem;display:grid;gap:4px"><b>También se registró en:</b>${o.map((x) => `<span>${esc(LEAD_FORMS[x.form] || x.form)} · ${fdateMs(x.createdAt)} · ${esc(LEAD_STATES.find(([k]) => k === leadEtapa(x))?.[1] || '')}</span>`).join('')}</div>` : ''}`; })()}
    <label><b>Etapa</b><select id="lf-status">${LEAD_STATES.map(([v, t]) => `<option value="${v}" ${leadEtapa(l) === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    <label><b>Próximo seguimiento</b><input type="date" id="lf-fup" value="${esc(l.followUp || '')}"></label>
    <label class="full"><b>Nota</b><textarea id="lf-note" maxlength="1000" rows="4" placeholder="Lo que conversaron, qué le interesa, qué le falta decidir…">${esc(l.note || '')}</textarea></label>
    <div class="full actions"><button class="btn btn-primary btn-sm">Guardar</button>${l.whatsapp ? `<a class="btn btn-ghost btn-sm" href="${waLink(l.whatsapp)}" data-wa-open="${esc(waNum(l.whatsapp))}" data-wa-name="${esc(l.name)}">Escribir por WhatsApp</a>` : ''}${l.email ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(l.email)}">Correo</a>` : ''}<button type="button" class="btn btn-ghost btn-sm" id="lf-del" style="color:#b8402f;margin-left:auto">Eliminar</button></div>
  </form>`, true);
  $('#lead-form').onsubmit = async (e) => {
    e.preventDefault();
    const cambios = { status: $('#lf-status').value, followUp: $('#lf-fup').value, note: $('#lf-note').value.trim() };
    try { await data.leads({ action: 'update', id, ...cambios }); Object.assign(l, cambios); $('#dlg').close(); paintNav(); render(false); toast('Guardado.'); } catch (err) { fail(err); }
  };
  $('#lf-del').onclick = async () => {
    if (!confirm(`¿Eliminar a ${l.name} de tu lista? No se puede deshacer.`)) return;
    try { await data.leads({ action: 'delete', ids: [id] }); A.leads = A.leads.filter((x) => x.id !== id); S.leadSel.delete(id); $('#dlg').close(); paintNav(); render(false); toast('Eliminada.'); } catch (err) { fail(err); }
  };
}
async function leadMover(id, status) {
  const l = (A.leads || []).find((x) => x.id === id); if (!l || leadEtapa(l) === status) return;
  const antes = l.status; l.status = status; paintNav(); render(false);
  try { await data.leads({ action: 'update', id, status }); } catch (e) { l.status = antes; paintNav(); render(false); fail(e); }
}
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
  ${(A.leads || []).filter(seguimientoHoy).length ? `<div class="alert"><div><b>${(A.leads || []).filter(seguimientoHoy).length} seguimiento${(A.leads || []).filter(seguimientoHoy).length === 1 ? '' : 's'} para hoy</b><p>Personas a las que quedaste de escribirles.</p></div><button class="btn" data-crm-hoy>Ver</button></div>` : ''}
  ${atrasadas.length ? `<div class="alert"><div><b>${atrasadas.length} cuota${atrasadas.length === 1 ? '' : 's'} atrasada${atrasadas.length === 1 ? '' : 's'}</b><p>${esc(atrasadas.slice(0, 3).map(nameOf).join(', '))}${atrasadas.length > 3 ? '…' : ''}</p></div><button class="btn" data-go="pagos">Ver pagos</button></div>` : ''}
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
  const enlace = A.clases?.[v.type === 'clase-pendulo' ? 'enlacePendulo' : 'enlaceTarot'] || '';
  const texto = (l) => `Hola ${String(l.name || '').split(' ')[0]}, te recuerdo tu clase gratis de ${v.type === 'clase-pendulo' ? 'Péndulo Hebreo' : 'Tarot Terapéutico'}: ${fechaLarga(v.date)}${v.time ? ` a las ${v.time} (hora de Chile)` : ''}. ${enlace ? `Entra por Google Meet: ${enlace}` : ''} ¡Te espero!`;
  const fila = (l) => `<tr><td><b>${esc(l.name)}</b>${l.country ? `<br><span class="muted">${esc(l.country)}</span>` : ''}</td><td>${l.whatsapp ? `<a href="${waLink(l.whatsapp)}" data-wa-open="${esc(waNum(l.whatsapp))}" data-wa-name="${esc(l.name)}">${esc(l.whatsapp)}</a>` : ''}</td><td>${l.email ? `<a href="mailto:${esc(l.email)}?subject=${encodeURIComponent('Tu clase gratis · Casa Muladhara')}&body=${encodeURIComponent(texto(l))}">${esc(l.email)}</a>` : ''}</td></tr>`;
  return `<div class="card full" style="padding:12px 14px;display:grid;gap:8px;font-size:.84rem"><b>Inscritas a esta clase: ${lista.length}</b>${lista.length ? `<div class="tbl-wrap"><table class="tbl"><tbody>${lista.map(fila).join('')}</tbody></table></div>` : '<span class="muted">Todavía nadie se registró para esta fecha.</span>'}${enlace ? '' : '<span style="color:#b8402f;font-weight:700">Falta el enlace de Google Meet de esta clase en Ajustes del aula.</span>'}</div>`;
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
  $('#cf-type').onchange = avisar; $('#cf-time').oninput = avisar; $('#cf-allday').onchange = avisar; avisar();
  $('#cal-form').onsubmit = async (ev) => {
    ev.preventDefault();
    const bloq = $('#cf-type').value === 'bloqueado', todo = bloq && $('#cf-allday').checked;
    const time = todo ? '' : $('#cf-time').value, endTime = time ? $('#cf-endtime').value : '';
    if (bloq && !todo && (!time || !endTime)) return toast('Elige la hora de inicio y de término, o marca "Todo el día".');
    if (endTime && endTime <= time) return toast('La hora de término debe ser después de la de inicio.');
    const duration = endTime ? (Number(endTime.slice(0, 2)) * 60 + Number(endTime.slice(3))) - (Number(time.slice(0, 2)) * 60 + Number(time.slice(3))) : 0;
    const d = { type: $('#cf-type').value, title: $('#cf-title').value.trim(), date: $('#cf-date').value, time, endTime, duration, endDate: $('#cf-end').value, note: $('#cf-note').value.trim(), tentative: $('#cf-tent').checked };
    if (!d.date) return toast('Elige la fecha.');
    if (d.endDate && d.endDate < d.date) return toast('La fecha de término no puede ser antes de la fecha.');
    try {
      const rep = $('#cf-rep')?.checked, hasta = $('#cf-until')?.value;
      if (!e && rep) {
        if (!hasta || hasta < d.date) return toast('Elige hasta qué fecha se repite.');
        const lista = [], largo = d.endDate ? tOf(d.endDate) - tOf(d.date) : 0;
        for (let t = tOf(d.date); t <= tOf(hasta) && lista.length < 104; t += 7 * 864e5) lista.push({ ...d, date: ymd(t), endDate: d.endDate ? ymd(t + largo) : '' });
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
  <section class="card panel"><h3>Google Meet: clases gratis y terapias online</h3><p class="muted" style="margin:0;font-size:.88rem">Al reservar su lugar, la persona ve un botón para entrar a la clase con este enlace. Déjalo vacío para mostrar "Te enviamos el enlace por WhatsApp".</p>
    <form id="cl-form" style="display:grid;gap:10px"><label style="display:grid;gap:6px;font-size:.84rem"><b>Enlace de Google Meet · clase de Péndulo (sábados)</b><input type="url" id="cl-pendulo" placeholder="https://meet.google.com/abc-defg-hij" value="${esc(A.clases?.enlacePendulo || '')}"></label><label style="display:grid;gap:6px;font-size:.84rem"><b>Enlace de Google Meet · clase de Tarot (martes)</b><input type="url" id="cl-tarot" placeholder="https://meet.google.com/abc-defg-hij" value="${esc(A.clases?.enlaceTarot || '')}"></label><label style="display:grid;gap:6px;font-size:.84rem"><b>Enlace de Google Meet · terapias online</b><input type="url" id="cl-terapias" placeholder="https://meet.google.com/abc-defg-hij" value="${esc(A.clases?.enlaceTerapias || '')}"></label><button class="btn btn-primary btn-sm" style="justify-self:start">Guardar</button></form></section>
  <section class="card panel"><h3>Cursos: próximo inicio</h3><p class="muted" style="margin:0;font-size:.88rem">Las páginas /pendulo y /tarot muestran la fecha más cercana que tengas en el Calendario como "Curso Péndulo Hebreo Nivel 1" o "Grupo de Tarot Terapéutico".</p><button class="btn btn-ghost btn-sm" style="justify-self:start" data-go="calendario">Abrir el calendario</button></section>
  <section class="card panel"><h3>Clases en vivo</h3><p class="muted" style="margin:0;font-size:.88rem">Las clases en vivo y sus grabaciones se programan dentro de cada clase del aula, donde ves el contenido.</p><a class="btn btn-ghost btn-sm" style="justify-self:start" href="/aula">Ir al aula</a></section>`;

// Un solo manejador para todos los [data-go]: el menú se vuelve a pintar solo (p. ej. al llegar una alumna nueva) y sus botones siguen funcionando
document.addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b) go(b.dataset.go); });
document.addEventListener('click', (e) => { const b = e.target.closest('[data-lead-alumna]'); if (b) { if ($('#dlg').open) $('#dlg').close(); openStudent(b.dataset.leadAlumna); } });
document.addEventListener('click', (e) => { if (e.target.closest('[data-crm-hoy]')) { S.crmSeg = true; S.crmProg = ''; S.crmQ = ''; S.crmOrigen = ''; go('interesadas'); } });
document.addEventListener('click', (e) => { const a = e.target.closest('[data-wa-open]'); if (!a) return; e.preventDefault(); if ($('#dlg').open) $('#dlg').close(); waOpen(a.dataset.waOpen, a.dataset.waName); go('whatsapp'); });
document.addEventListener('click', (e) => { const b = e.target.closest('[data-wa-chat]'); if (b) { waOpen(b.dataset.waChat, ''); waRepaint(); } });
function paintNav() {
  // Estando en la sección, lo que llegue mientras la miras cuenta como visto
  if (S.view === 'interesadas') marcarVisto('interesadas', Math.max(0, ...(A.leads || []).map((l) => l.createdAt || 0)));
  if (S.view === 'alumnas' || S.view === 'ficha') marcarVisto('alumnas', Math.max(0, ...A.students.map((u) => u.createdAt?.toMillis?.() || 0)));
  $('#nav').innerHTML = NAV.map(([k, n, ic, c]) => { if (k === '--') return `<div class="nav-label">${n}</div>`; const cnt = c ? c() : 0; return `<button data-go="${k}" ${S.view === k || (S.view === 'ficha' && k === 'alumnas') || (S.view === 'clase' && k === 'formacion') ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24">${ic}</svg>${n}${cnt ? `<span class="count">${cnt}</span>` : ''}</button>`; }).join('');
}
function render(top = true) {
  A._vin = null;
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
  document.querySelectorAll('[data-crm-seg]').forEach((b) => (b.onclick = () => { S.crmSeg = !S.crmSeg; render(false); }));
  document.querySelectorAll('[data-crm-desc]').forEach((b) => (b.onclick = () => { S.crmDesc = !S.crmDesc; render(false); }));
  const co = $('#crm-origen'); if (co) co.onchange = () => { S.crmOrigen = co.value; render(false); };
  const cq = $('#crm-q'); if (cq) cq.oninput = () => { S.crmQ = cq.value; const p = cq.selectionStart; render(false); const c2 = $('#crm-q'); c2.focus(); c2.setSelectionRange(p, p); };
  document.querySelectorAll('[data-lead-open]').forEach((b) => (b.onclick = (e) => { if (e.target.closest('a')) return; leadFicha(b.dataset.leadOpen); }));
  document.querySelectorAll('[data-lead-card]').forEach((c) => (c.ondragstart = (e) => { e.dataTransfer.setData('text/plain', c.dataset.leadCard); e.dataTransfer.effectAllowed = 'move'; }));
  document.querySelectorAll('[data-kb-col]').forEach((col) => {
    col.ondragover = (e) => { e.preventDefault(); col.classList.add('over'); };
    col.ondragleave = () => col.classList.remove('over');
    col.ondrop = (e) => { e.preventDefault(); col.classList.remove('over'); const id = e.dataTransfer.getData('text/plain'); if (id) leadMover(id, col.dataset.kbCol); };
  });
  document.querySelectorAll('[data-lead-sel]').forEach((cb) => (cb.onchange = () => { cb.checked ? S.leadSel.add(cb.dataset.leadSel) : S.leadSel.delete(cb.dataset.leadSel); render(false); }));
  document.querySelectorAll('[data-lead-all]').forEach((cb) => (cb.onchange = () => { S.leadSel = cb.checked ? new Set(leadsFiltradas().map((l) => l.id)) : new Set(); render(false); }));
  document.querySelectorAll('[data-leads-clear]').forEach((b) => (b.onclick = () => { S.leadSel = new Set(); render(false); }));
  document.querySelectorAll('[data-leads-del]').forEach((b) => (b.onclick = async () => {
    const ids = [...S.leadSel];
    if (!ids.length || !confirm(`¿Eliminar ${ids.length} interesada${ids.length === 1 ? '' : 's'}? Se borran de tu lista y no se puede deshacer.`)) return;
    b.disabled = true;
    try { await data.leads({ action: 'delete', ids }); A.leads = A.leads.filter((l) => !S.leadSel.has(l.id)); S.leadSel = new Set(); paintNav(); render(false); toast(`${ids.length} eliminada${ids.length === 1 ? '' : 's'}.`); } catch (e) { fail(e); b.disabled = false; }
  }));
  document.querySelectorAll('[data-del-student]').forEach((b) => (b.onclick = async () => {
    const u = student(b.dataset.delStudent); if (!u) return;
    const conPago = paying(u) || ownedOf(u).length > 0;
    const t = prompt(`Vas a eliminar a ${nameOf(u)} y todo su avance, preguntas y pagos registrados. No se puede deshacer.${conPago ? '\n\nATENCIÓN: tiene pagos o niveles comprados.' : ''}\n\nEscribe ELIMINAR para confirmar:`);
    if (t?.trim() !== 'ELIMINAR') return;
    b.disabled = true;
    try { await api({ action: 'deleteStudent', uid: u.id, force: conPago }); A.students = A.students.filter((x) => x.id !== u.id); S.open = null; go('alumnas'); toast('Alumna eliminada.'); } catch (e) { fail(e); b.disabled = false; }
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
  document.querySelectorAll('[data-lead-status]').forEach((s) => (s.onchange = async () => {
    const l = A.leads.find((x) => x.id === s.dataset.leadStatus);
    try { await data.leads({ action: 'status', id: l.id, status: s.value }); l.status = s.value; paintNav(); toast('Estado guardado.'); } catch (e) { fail(e); s.value = l.status; }
  }));
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
    const enlacePendulo = $('#cl-pendulo').value.trim(), enlaceTarot = $('#cl-tarot').value.trim(), enlaceTerapias = $('#cl-terapias').value.trim();
    if ([enlacePendulo, enlaceTarot, enlaceTerapias].some((u) => u && !isHttps(u))) return toast('Los enlaces deben empezar con https://');
    try { await data.saveClases({ enlacePendulo, enlaceTarot, enlaceTerapias }); toast('Enlaces de Google Meet guardados'); } catch (err) { fail(err); }
  };
}
const papi = (uid) => profileApi(uid);
function dialog(html, ancha = false) { $('#dlg-body').innerHTML = html; const d = $('#dlg'); d.classList.toggle('wide', ancha); if (!d.open) d.showModal(); }
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
