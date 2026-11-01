// Carga los horarios del Calendario de la Maestra (calendario/{id}): clases gratis, cursos de Péndulo, Tarot y Formación.
// Todo en hora de Chile. Reglas: lunes a viernes de 19:00 a 21:30 como máximo; sábados en la mañana (9:00 a 13:00) y la clase gratis de las 19:00.
//   node scripts/calendario-horarios.mjs            solo muestra el plan y revisa choques (no escribe nada)
//   node scripts/calendario-horarios.mjs --aplicar  hace un respaldo, borra lo que creó la carga inicial (o una carga anterior de este script) y carga las fechas
// Lo que Karen agregó a mano (y las terapias reservadas en la web) no se toca. Cada fecha cargada aquí lleva source: 'carga-horarios'.
import admin from 'firebase-admin';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { keyFile, DATABASE } from './_auth.mjs';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const APLICAR = process.argv.includes('--aplicar');
const SOURCE = 'carga-horarios';

// ---------- fechas ----------
const mas = (f, n) => new Date(Date.parse(`${f}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const dow = (f) => new Date(`${f}T00:00:00Z`).getUTCDay(); // 0 domingo … 6 sábado
const BLOQUEADOS = ['2026-12-11', '2026-12-12', '2027-01-15', '2027-01-16'];
const RECESO = ['2026-12-21', '2027-01-04'];
const HASTA = '2027-07-31'; // las clases gratis se generan hasta el final del último grupo de Tarot
const libre = (f) => !BLOQUEADOS.includes(f) && !(f >= RECESO[0] && f <= RECESO[1]);
const tent = (f) => f >= '2027-01-01'; // desde enero: por confirmar
const hm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const min = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const ev = (type, title, date, time, dur, extra = {}) => ({
  type, title, date, time: time || '', endTime: time ? hm(min(time) + dur) : '', duration: time ? dur : 0, endDate: '', note: '', tentative: tent(date), source: SOURCE, ...extra,
});
const cada = (diaSemana, desde, hasta = HASTA) => { const r = []; for (let f = desde; f <= hasta; f = mas(f, 1)) if (dow(f) === diaSemana && libre(f)) r.push(f); return r; };

const E = [];
// Clases gratis: martes Tarot y sábado Péndulo, 19:00 a 19:30
cada(2, '2026-11-10').forEach((f) => E.push(ev('clase-tarot', 'Clase gratis Tarot', f, '19:00', 30)));
cada(6, '2026-11-07').forEach((f) => E.push(ev('clase-pendulo', 'Clase gratis Péndulo', f, '19:00', 30)));

// Cursos de Péndulo: 2 clases online de 2 h + práctica de 4 h (cursos 1 y 2); desde enero, 2 sábados de 4 h (uno online y otro presencial)
const CURSOS = [
  ['Péndulo · Curso 1', [['2026-11-18', '19:00', 120, 'online'], ['2026-11-19', '19:00', 120, 'online'], ['2026-11-21', '09:00', 240, 'práctica']]],
  ['Péndulo · Curso 2', [['2026-12-16', '19:00', 120, 'online'], ['2026-12-18', '19:00', 120, 'online'], ['2026-12-19', '09:00', 240, 'práctica']]],
  ...[['3', '2027-01-23', '2027-01-30'], ['4', '2027-02-20', '2027-02-27'], ['5', '2027-03-20', '2027-03-27'], ['6', '2027-04-17', '2027-04-24'], ['7', '2027-05-15', '2027-05-22']]
    .map(([n, a, b]) => [`Péndulo · Curso ${n}`, [[a, '09:00', 240, 'online en vivo'], [b, '09:00', 240, 'presencial en la sala']]]),
];
CURSOS.forEach(([titulo, ses]) => ses.forEach(([f, t, d, nota]) => E.push(ev('curso-pendulo', titulo, f, t, d, { note: nota }))));
const ocupadoPendulo = new Set(CURSOS.flatMap(([, s]) => s.map(([f]) => f)));

// Tarot: un solo grupo a la vez, jueves y viernes 19:00 a 21:30, 16 clases (8 semanas)
const TAROT = [['1', '2026-11-26'], ['2', '2027-02-18'], ['3', '2027-04-15'], ['4', '2027-06-10']];
for (const [n, inicio] of TAROT) {
  const fechas = [];
  for (let f = inicio; fechas.length < 16; f = mas(f, 1)) if ([4, 5].includes(dow(f)) && libre(f) && !ocupadoPendulo.has(f)) fechas.push(f);
  fechas.forEach((f, i) => E.push(ev('tarot', `Tarot grupo ${n}`, f, '19:00', 150, { note: `Clase ${i + 1}/16${n === '4' ? ' · Nivel 5 de la Formación grupo 1' : ''}` })));
}

// Formación grupo 1: 38 sesiones de 2 h, martes 19:30 y miércoles 19:00 (N2 2 sesiones, N3 12, N4 24)
const N4 = ['Niño interior', 'Vidas pasadas', 'Transgeneracional', 'Limpieza uterina'];
const titulo = (s) => (s <= 2 ? `N2 Limpieza energética de casa ${s}/2` : s <= 14 ? `N3 Radiestesia ${s - 2}/12` : `N4.${Math.floor((s - 15) / 6) + 1} ${N4[Math.floor((s - 15) / 6)]} ${((s - 15) % 6) + 1}/6`);
const sesiones = [];
for (let f = '2026-12-08'; sesiones.length < 38; f = mas(f, 1)) if ([2, 3].includes(dow(f)) && libre(f) && f !== '2026-12-16') sesiones.push(f);
sesiones.forEach((f, i) => {
  const s = i + 1, martes = dow(f) === 2, t = martes ? '19:30' : '19:00';
  if (s === 1) E.push(ev('formacion-inicio', 'Formación grupo 1 · clase inaugural · N2 Limpieza energética de casa 1/2', f, t, 120));
  else E.push(ev('formacion', `F1 · ${titulo(s)}`, f, t, 120, { note: `Sesión ${s}/38` }));
});
const finF1 = sesiones.at(-1);
E.push(ev('formacion-inicio', 'Formación grupo 2 · N2 Limpieza energética de casa 1/2', '2027-05-25', '19:30', 120, { note: 'Mismas 38 sesiones, termina aprox. el 29 de septiembre' }));

// Días sin clases y receso
BLOQUEADOS.forEach((f) => E.push(ev('bloqueado', 'Karen no disponible', f, '', 0)));
E.push(ev('bloqueado', 'Receso', RECESO[0], '', 0, { endDate: RECESO[1] })); // el receso es "Karen no disponible" en varios días seguidos

// ---------- revisión de choques ----------
const choques = [];
const tramo = (e) => (e.time ? [Date.parse(`${e.date}T${e.time}:00Z`), Date.parse(`${e.date}T${e.endTime}:00Z`)] : null);
for (let i = 0; i < E.length; i++) for (let j = i + 1; j < E.length; j++) {
  const a = E[i], b = E[j];
  if (a.date !== b.date) continue;
  const ta = tramo(a), tb = tramo(b);
  if ((ta && tb && ta[0] < tb[1] && tb[0] < ta[1]) || (!ta && tb) || (!tb && ta)) choques.push(`${a.date} ${a.title} ↔ ${b.title}`);
}
for (const e of E) { // nada dentro del receso ni de un día bloqueado
  if (e.type === 'bloqueado') continue;
  if (!libre(e.date)) choques.push(`${e.date} ${e.title} cae en un día sin clases`);
}
const horario = (e) => { const d = dow(e.date), t = e.time; if (!t) return ''; if (d >= 1 && d <= 5) return t >= '19:00' && e.endTime <= '21:30' ? '' : `${e.date} ${e.title} fuera de 19:00 a 21:30`; if (d === 6) return (t >= '09:00' && e.endTime <= '13:00') || (t === '19:00' && e.endTime === '19:30') ? '' : `${e.date} ${e.title} fuera del horario del sábado`; return `${e.date} ${e.title} en domingo`; };
E.forEach((e) => { const m = horario(e); if (m) choques.push(m); });
if (sesiones.length !== 38 || finF1 !== '2027-05-04') choques.push(`La formación grupo 1 debía terminar el 2027-05-04 y termina ${finF1}`);
for (const [n, , ] of TAROT) { const l = E.filter((e) => e.title === `Tarot grupo ${n}`); if (l.length !== 16) choques.push(`Tarot grupo ${n}: ${l.length} clases`); }

const porTipo = E.reduce((m, e) => ((m[e.type] = (m[e.type] || 0) + 1), m), {});
console.log('Fechas a cargar:', E.length, JSON.stringify(porTipo));
console.log('Formación grupo 1:', sesiones[0], '→', finF1, '· Tarot:', TAROT.map(([n]) => { const l = E.filter((e) => e.title === `Tarot grupo ${n}`); return `G${n} ${l[0].date}→${l.at(-1).date}`; }).join(' · '));
console.log('Choques y errores:', choques.length ? `\n  - ${choques.join('\n  - ')}` : 'ninguno');
if (choques.length) process.exit(1);
if (!APLICAR) { console.log('\n(Solo revisión: agrega --aplicar para escribir en la base de datos)'); process.exit(0); }

// ---------- escritura ----------
// Fechas que creó la carga inicial (calendario-inicial.mjs), para borrar solo esas
const ANTIGUAS = new Set([
  ...['2026-11-07', '2026-11-14', '2026-11-21', '2026-11-28', '2026-12-05', '2026-12-19', '2027-01-09', '2027-01-23', '2027-01-30'].map((d) => `clase-pendulo|${d}|Clase gratis Péndulo`),
  ...['2026-11-10', '2026-11-17'].map((d) => `clase-tarot|${d}|Clase gratis Tarot`),
  ...['2026-11-17', '2026-11-19'].map((d) => `curso-pendulo|${d}|Péndulo 1 · clase online`),
  'curso-pendulo|2026-11-21|Péndulo 1', 'curso-pendulo|2027-01-23|Péndulo 2', 'tarot|2026-11-24|Inicio Tarot grupo 1',
  'formacion-inicio|2026-12-08|Formación grupo 1 · Nivel 2',
  ...['2026-12-15', '2026-12-19', '2027-01-05'].map((d) => `formacion|${d}|Grupo 1 · Nivel 2`),
  'formacion-inicio|2027-03-09|Formación grupo 2 · Nivel 2', 'receso|2026-12-21|Receso',
  ...['2026-12-11', '2026-12-12', '2027-01-15', '2027-01-16'].map((d) => `bloqueado|${d}|Karen no disponible`),
  'interno|2026-12-20|Revisión de anuncios y decisión del embudo',
]);
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(readFileSync(keyFile, 'utf8'))) });
const db = getFirestore(admin.app(), DATABASE);
const todo = await db.collection('calendario').get();
const dir = `${homedir()}/.config/casamuladhara/respaldos`;
mkdirSync(dir, { recursive: true });
const archivo = `${dir}/calendario-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`;
writeFileSync(archivo, JSON.stringify(todo.docs.map((d) => ({ id: d.id, ...d.data() })), null, 1));
console.log(`Respaldo de ${todo.size} fechas en ${archivo}`);
const borrar = todo.docs.filter((d) => { const x = d.data(); return x.source === SOURCE || ANTIGUAS.has(`${x.type}|${x.date}|${x.title}`); });
const quedan = todo.docs.filter((d) => !borrar.includes(d)).map((d) => { const x = d.data(); return `${x.date} ${x.type} ${x.title}`; });
for (let i = 0; i < borrar.length; i += 400) { const b = db.batch(); borrar.slice(i, i + 400).forEach((d) => b.delete(d.ref)); await b.commit(); }
console.log(`Borradas: ${borrar.length} (carga inicial o carga anterior). Se conservan ${quedan.length}${quedan.length ? ':\n  - ' + quedan.join('\n  - ') : ''}`);
for (let i = 0; i < E.length; i += 400) { const b = db.batch(); E.slice(i, i + 400).forEach((e) => b.set(db.collection('calendario').doc(), { ...e, createdAt: FieldValue.serverTimestamp() })); await b.commit(); }
console.log(`Cargadas: ${E.length}`);
