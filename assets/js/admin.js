// Portal de la Maestra (admin.html): alumnas, acceso por alumna, pagos, mensajes, preguntas, ayuda y comunidad.
// Entra con correo y contraseña. La primera vez la cuenta se activa al verificar el Gmail (ver api/admin.js).
// Lo que se ve aquí lo protegen las reglas de Firestore: solo una cuenta con el claim admin puede leerlo.
import { auth, db } from './firebase.js';
import { profileApi, mountProfileEditor, googlePhoto } from './profile.js';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,
  onAuthStateChanged, onIdTokenChanged, signOut,
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, collectionGroup, getDocs, query, orderBy, where, limit,
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
const CHANNELS = { general: 'General', presentaciones: 'Preséntate', n1: 'Nivel 1', n2: 'Nivel 2', n3: 'Nivel 3', n4: 'Nivel 4', n5: 'Nivel 5', testimonios: 'Testimonios' };

let tt;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => (t.hidden = true), 4200); }
const fail = (e) => { console.error(e); toast(e?.message && !e.code ? e.message : 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.'); };

// ---------- Regla de acceso (la misma que api/_lib/access.js) ----------
const paying = (u) => u.plan === 'completo' || (u.plan === 'mensual' && u.paymentStatus === 'ok');
const upTo = (n) => Array.from({ length: Math.max(0, Math.min(5, Number(n) || 0)) }, (_, i) => i + 1);
const list = (v) => (Array.isArray(v) ? v.map(Number) : null);
const ownedOf = (u) => list(u.ownedLevels) ?? upTo(u.grantLevel);
const unlockedOf = (u) => list(u.unlockedLevels) ?? upTo(Math.max(Number(u.accessLevel) || 1, (Number(u.grantLevel) || 0) + 1));
const openOf = (u) => (u.blocked ? [] : [...new Set([...ownedOf(u), ...(paying(u) ? unlockedOf(u) : [])])].sort());
const payState = (u) => (u.plan === 'completo' ? ['done', 'Pagó completo']
  : u.plan === 'mensual' ? (u.paymentStatus === 'overdue' ? ['bad', 'Cuota pendiente'] : ['pres', 'En cuotas al día'])
    : ownedOf(u).length ? ['done', `Compró el Nivel ${ownedOf(u).join(', ')}`] : ['lock', 'Sin pago']);

// ---------- Datos ----------
const A = { students: [], questions: [], tickets: [], posts: [], config: {}, payments: {}, me: null };
let api = null; // llama a /api/admin con el token de la Maestra

async function loadAll() {
  const [us, qs, tk, ps, cf] = await Promise.all([
    getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))),
    getDocs(query(collectionGroup(db, 'questions'), where('answered', '==', false), orderBy('createdAt', 'desc'), limit(100))),
    getDocs(query(collectionGroup(db, 'tickets'), where('status', '==', 'open'), orderBy('createdAt', 'desc'), limit(100))),
    getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(60))),
    getDoc(doc(db, 'config', 'aula')),
  ]);
  A.students = us.docs.map((d) => ({ id: d.id, ...d.data() })).filter((u) => u.role !== 'admin');
  A.questions = qs.docs.map((d) => ({ id: d.id, uid: d.ref.parent.parent.id, ...d.data() }));
  A.tickets = tk.docs.map((d) => ({ id: d.id, uid: d.ref.parent.parent.id, ...d.data() }));
  A.posts = ps.docs.map((d) => ({ id: d.id, ...d.data() }));
  A.config = cf.data() || {};
}
const data = {
  setAccess: async (uid, body) => {
    await api({ action: 'access', uid, ...body });
    Object.assign(A.students.find((x) => x.id === uid), body);
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
      text: `La Maestra respondió tu pregunta${lv ? ` del Nivel ${lv.n}` : ''}. Ábrela en la pestaña Preguntas de esa clase.`,
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
  deletePost: async (id) => { await deleteDoc(doc(db, 'posts', id)); A.posts = A.posts.filter((p) => p.id !== id); },
  saveConfig: async (d) => { await setDoc(doc(db, 'config', 'aula'), { ...d, updatedAt: serverTimestamp() }, { merge: true }); Object.assign(A.config, d); },
};

// ---------- Vista ----------
const S = { view: 'alumnas', q: '', open: null, filter: 'todas' };
const NAV = [
  ['alumnas', 'Alumnas', '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>', () => A.students.filter(isNew).length],
  ['pagos', 'Pagos', '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'],
  ['mensajes', 'Mensajes', '<path d="M4 5h16v11H9l-5 4z"/>'],
  ['preguntas', 'Preguntas de clase', '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>', () => A.questions.length],
  ['ayuda', 'Mensajes de ayuda', '<path d="M12 21a9 9 0 1 0-9-9c0 1.6.4 3.1 1.2 4.4L3 21l4.6-1.2A9 9 0 0 0 12 21z"/>', () => A.tickets.length],
  ['comunidad', 'Comunidad', '<path d="M7 10h10M7 14h6"/><path d="M4 4h16v13H8l-4 3z"/>'],
  ['ajustes', 'Ajustes del aula', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'],
];
const nameOf = (u) => u?.displayName || u?.email || 'Alumna';
const photoCss = (u) => (typeof u === 'string' && /^https:\/\/[^\s"'()\\]+$/.test(u) ? `background-image:url('${u}')` : '');
const av = (u) => { const ph = photoCss(u?.photoURL); return `<span class="av sm${ph ? ' ph' : ''}" style="--c:${colorFor(u?.id || nameOf(u))};${ph}">${ph ? '' : esc(initials(nameOf(u)))}</span>`; };
const student = (uid) => A.students.find((s) => s.id === uid);
const levelPills = (u) => (u.blocked ? '<span class="pill bad">Bloqueada</span>'
  : openOf(u).map((n) => `<span class="pill done">Nivel ${n}</span>`).join(' ') || '<span class="pill lock">Ninguno</span>');
// Fila de niveles para marcar o desmarcar (field: ownedLevels o unlockedLevels)
const levelBoxes = (u, field, cur) => `<div class="lvbox" role="group">${LEVELS.map((l) => `<label title="${esc(l.t)}"><input type="checkbox" data-lv="${field}" data-uid="${u.id}" value="${l.n}" ${cur.includes(l.n) ? 'checked' : ''}><span>Nivel ${l.n}</span></label>`).join('')}</div>`;
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
      <div style="display:grid;gap:6px"><b style="font-size:.88rem">Desbloqueados en el programa completo</b>${levelBoxes(u, 'unlockedLevels', unlockedOf(u))}<small class="muted">Se abren mientras su programa esté pagado o con las cuotas al día.${paying(u) ? '' : ' <b>Ahora no tiene el programa pagado</b>, así que estos niveles quedan cerrados.'}</small></div>
      <div style="display:grid;gap:6px"><b style="font-size:.88rem">Comprados aparte (alumna antigua)</b>${levelBoxes(u, 'ownedLevels', ownedOf(u))}<small class="muted">Quedan abiertos siempre, pague o no el programa.</small></div>
    </section>
    <section class="card panel"><div class="panel-h"><h3>Datos de la alumna</h3><button class="btn btn-ghost btn-sm" data-edit-student="${u.id}">Editar</button></div>
      <dl class="kv"><dt>Nombre</dt><dd>${esc(nameOf(u))}</dd><dt>Correo</dt><dd>${esc(u.email)}</dd><dt>Teléfono</dt><dd>${esc(u.phone) || '<span class="muted">—</span>'}</dd><dt>País o ciudad</dt><dd>${esc(u.country) || '<span class="muted">—</span>'}</dd>${u.bio ? `<dt>Sobre ella</dt><dd>${esc(u.bio)}</dd>` : ''}<dt>Desde</dt><dd>${fdate(u.createdAt) || '—'}</dd></dl>
    </section>
    <section class="card panel"><h3>Escribirle un mensaje</h3><p class="muted" style="font-size:.86rem">Le llega a la campana de avisos del aula.</p>
      <form data-msg-one="${u.id}" style="display:grid;gap:10px"><textarea maxlength="1900" placeholder="Hola ${esc(nameOf(u).split(' ')[0])}, …" aria-label="Mensaje"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Enviar mensaje</button></form>
    </section>
  </div>
  <section class="card panel"><h3>Historial de pagos</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Fecha</th><th>Detalle</th><th>Monto</th><th>Estado</th></tr></thead><tbody>
    ${!pays ? '<tr><td colspan="4" class="muted">Cargando…</td></tr>' : pays.map((p) => `<tr><td>${fdate(p.paidAt) || fdate(p.createdAt)}</td><td>${esc(p.concept || 'Pago')}</td><td>${esc(p.amount ?? 0)} USD</td><td><span class="pill ${p.status === 'failed' ? 'bad' : 'done'}">${p.status === 'failed' ? 'Rechazado' : 'Pagado'}</span></td></tr>`).join('') || '<tr><td colspan="4" class="muted">Aún no tiene pagos registrados.</td></tr>'}
  </tbody></table></div></section>`;
};
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
    <label style="display:grid;gap:6px;font-size:.84rem"><b>Para</b><select id="msg-to"><option value="all">Todas las alumnas (${A.students.length})</option><option value="access">Solo alumnas con niveles abiertos (${A.students.filter((u) => openOf(u).length > 0).length})</option>${LEVELS.map((l) => `<option value="lvl${l.n}">Alumnas con el Nivel ${l.n} abierto</option>`).join('')}${A.students.map((u) => `<option value="${u.id}">${esc(nameOf(u))} · ${esc(u.email)}</option>`).join('')}</select></label>
    <label style="display:grid;gap:6px;font-size:.84rem"><b>Mensaje</b><textarea id="msg-text" maxlength="1900" placeholder="Escribe tu mensaje"></textarea></label>
    <button class="btn btn-primary btn-sm" style="justify-self:start">Enviar</button></form></section>`;
V.preguntas = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Preguntas de clase</h1><p>Lo que tus alumnas preguntan debajo de cada clase. Al responder, la respuesta aparece en la clase y le llega un aviso.</p></div></div>
  <section class="card panel">${A.questions.length ? A.questions.map((q, ix) => { const u = student(q.uid), lv = levelOfKey(q.lessonKey); return `<article style="display:grid;gap:8px;padding:14px 0;border-top:1px solid var(--line)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${av(u)}<b>${esc(nameOf(u))}</b><span class="muted" style="font-size:.84rem">${lv ? 'Nivel ' + lv.n + ' · ' : ''}${fdate(q.createdAt)}</span></div>
    <p style="margin:0">${esc(q.text)}</p>
    <form data-answer="${ix}" style="display:grid;gap:8px"><textarea placeholder="Tu respuesta" aria-label="Respuesta"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Responder</button></form></article>`; }).join('') : '<p class="muted" style="margin:0">No tienes preguntas pendientes.</p>'}</section>`;
V.ayuda = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Mensajes de ayuda</h1><p>Lo que te escriben desde la sección Ayuda del aula. Tu respuesta les llega como aviso.</p></div></div>
  <section class="card panel">${A.tickets.length ? A.tickets.map((t, ix) => { const u = student(t.uid); return `<article style="display:grid;gap:8px;padding:14px 0;border-top:1px solid var(--line)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${av(u)}<b>${esc(nameOf(u))}</b><span class="pill lock">${esc(t.topic)}</span><span class="muted" style="font-size:.84rem">${fdate(t.createdAt)}</span></div>
    <p style="margin:0;white-space:pre-line">${esc(t.message)}</p>
    <form data-ticket="${ix}" style="display:grid;gap:8px"><textarea placeholder="Tu respuesta (opcional)" aria-label="Respuesta"></textarea><button class="btn btn-primary btn-sm" style="justify-self:start">Responder y cerrar</button></form></article>`; }).join('') : '<p class="muted" style="margin:0">No hay mensajes de ayuda abiertos.</p>'}</section>`;
V.comunidad = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Comunidad</h1><p>Las últimas publicaciones de las alumnas. Puedes borrar las que no correspondan. Para escribir o responder como Maestra, entra al aula.</p></div><a class="btn btn-ghost btn-sm" href="aula.html">Abrir la comunidad en el aula</a></div>
  <section class="card panel">${A.posts.length ? A.posts.map((p) => `<article style="display:grid;gap:6px;padding:14px 0;border-top:1px solid var(--line)">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><b>${esc(p.authorName)}</b>${p.isTeacher ? '<span class="pill pres">Maestra</span>' : ''}<span class="muted" style="font-size:.84rem"># ${esc(CHANNELS[p.ch] || p.ch)} · ${fdate(p.createdAt)}</span><button class="link" style="margin-left:auto" data-delpost="${p.id}">Borrar</button></div>
    <p style="margin:0;white-space:pre-line">${esc(p.text)}</p></article>`).join('') : '<p class="muted" style="margin:0">Todavía no hay publicaciones.</p>'}</section>`;
V.ajustes = () => `<div class="view-head"><div><span class="eyebrow">Portal de la Maestra</span><h1>Ajustes del aula</h1></div></div>
  <section class="card panel"><h3>Video de bienvenida</h3><p class="muted" style="margin:0;font-size:.88rem">Lo ven las cuentas gratis en Inicio. Pega el enlace de YouTube, Vimeo o Google Drive. Déjalo vacío para mostrar "Muy pronto".</p>
    <form id="wv-form" style="display:flex;gap:8px;flex-wrap:wrap"><input type="url" id="wv-url" placeholder="https://" value="${esc(A.config.welcomeVideo || '')}" style="flex:1;min-width:220px"><button class="btn btn-primary btn-sm">Guardar</button></form></section>
  <section class="card panel"><h3>Clases en vivo</h3><p class="muted" style="margin:0;font-size:.88rem">Las clases en vivo y sus grabaciones se programan dentro de cada clase del aula, donde ves el contenido.</p><a class="btn btn-ghost btn-sm" style="justify-self:start" href="aula.html">Ir al aula</a></section>`;

function paintNav() {
  $('#nav').innerHTML = NAV.map(([k, n, ic, c]) => { const cnt = c ? c() : 0; return `<button data-go="${k}" ${S.view === k || (S.view === 'ficha' && k === 'alumnas') ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24">${ic}</svg>${n}${cnt ? `<span class="count">${cnt}</span>` : ''}</button>`; }).join('');
}
function render(top = true) {
  paintNav();
  $('#view').innerHTML = V[S.view]();
  if (top) scrollTo(0, 0);
  bind();
}
function go(v) { S.view = v; $('#side').classList.remove('open'); $('#scrim').hidden = true; render(); }
async function openStudent(uid) {
  S.open = uid; go('ficha');
  try { await data.payments(uid); if (S.view === 'ficha' && S.open === uid) render(false); } catch (e) { fail(e); }
}
function bind() {
  document.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => go(b.dataset.go)));
  document.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => openStudent(b.dataset.open)));
  document.querySelectorAll('[data-filter]').forEach((b) => (b.onclick = () => { S.filter = b.dataset.filter; render(false); }));
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
    try { await data.setAccess(uid, { [field]: levels }); render(false); toast(`${cb.checked ? 'Desbloqueado' : 'Cerrado'} el Nivel ${cb.value}`); } catch (e) { fail(e); render(false); }
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
}
const papi = (uid) => profileApi(uid);
function dialog(html) { $('#dlg-body').innerHTML = html; const d = $('#dlg'); if (!d.open) d.showModal(); }
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
  'auth/invalid-credential': 'Correo o contraseña incorrectos.', 'auth/invalid-email': 'Escribe un correo válido.',
  'auth/email-already-in-use': 'Ese correo ya tiene una cuenta. Usa «Entrar» o «Olvidé mi contraseña».',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
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
async function enter(u) {
  say('Abriendo tu portal…', true);
  try {
    const me = await api({ action: 'me' });
    if (!me.admin && !me.verified) {
      await sendEmailVerification(u).catch(() => {});
      await signOut(auth);
      return say(`Te enviamos un correo a ${u.email} para confirmar que es tuyo. Ábrelo, toca el enlace y vuelve a entrar aquí.`, true);
    }
    if (!me.admin) { await signOut(auth); return say('Esta cuenta no es la de la Maestra. Las alumnas entran por el aula.'); }
    await u.getIdToken(true);
    await loadAll();
    watchStudents();
    const p = (await getDoc(doc(db, 'users', u.uid))).data() || {};
    start({ id: u.uid, ...p, displayName: p.displayName || 'Maestra Holística' });
  } catch (e) { console.error(e); say(e.message || 'No pudimos abrir el portal. Inténtalo de nuevo.'); }
}
$('#lg-form').onsubmit = async (e) => {
  e.preventDefault();
  const email = $('#lg-email').value.trim(), pass = $('#lg-pass').value, create = e.submitter?.id === 'lg-create';
  if (!email || !pass) return say('Escribe tu correo y tu contraseña.');
  lock(true);
  try {
    const cred = create ? await createUserWithEmailAndPassword(auth, email, pass) : await signInWithEmailAndPassword(auth, email, pass);
    await enter(cred.user);
  } catch (err) { say(ERR[err.code] || 'No pudimos entrar. Inténtalo de nuevo.'); }
  lock(false);
};
$('#lg-forgot').onclick = async () => {
  const email = $('#lg-email').value.trim();
  if (!email) return say('Escribe tu correo arriba y vuelve a tocar «Olvidé mi contraseña».');
  try { await sendPasswordResetEmail(auth, email); } catch (err) { if (err.code !== 'auth/user-not-found') return say(ERR[err.code] || 'No se pudo enviar el correo.'); }
  say('Si ese correo tiene una cuenta, te enviamos un enlace para crear una nueva contraseña.', true);
};
$('#logout').onclick = () => signOut(auth).then(() => { setSessionCookie(''); location.reload(); });

const current = await new Promise((res) => { const off = onAuthStateChanged(auth, (u) => { off(); res(u); }); });
if (current) enter(current); else say('');
