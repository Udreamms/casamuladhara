// Carga las fechas iniciales del Calendario de la Maestra (calendario/{id}). Se corre una vez:
//   node scripts/calendario-inicial.mjs
// Si una fecha ya existe (mismo tipo, día y título), no la vuelve a crear: se puede correr de nuevo sin duplicar.
// Después, todo se edita desde el Portal de la Maestra → Calendario.
import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';
import { keyFile, DATABASE } from './_auth.mjs';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(readFileSync(keyFile, 'utf8'))) });
const db = getFirestore(admin.app(), DATABASE);

const ev = (type, title, date, extra = {}) => ({ type, title, date, time: '', endDate: '', note: '', ...extra });
const FECHAS = [
  ...['2026-11-07', '2026-11-14', '2026-11-21', '2026-11-28', '2026-12-05', '2026-12-19', '2027-01-09', '2027-01-23', '2027-01-30']
    .map((d) => ev('clase-pendulo', 'Clase gratis Péndulo', d, { time: '19:00' })),
  ...['2026-11-10', '2026-11-17'].map((d) => ev('clase-tarot', 'Clase gratis Tarot', d, { time: '19:00' })),
  ev('curso-pendulo', 'Péndulo 1', '2026-11-21'),
  ev('curso-pendulo', 'Péndulo 2', '2027-01-23'),
  ev('tarot', 'Inicio Tarot grupo 1', '2026-11-24', { note: 'por confirmar con Karen' }),
  ev('formacion-inicio', 'Formación grupo 1 · Nivel 2', '2026-12-08'),
  ...['2026-12-15', '2026-12-19', '2027-01-05'].map((d) => ev('formacion', 'Grupo 1 · Nivel 2', d)),
  ev('formacion-inicio', 'Formación grupo 2 · Nivel 2', '2027-03-09', { note: 'aproximado' }),
  ev('receso', 'Receso', '2026-12-21', { endDate: '2027-01-04' }),
  ...['2026-12-11', '2026-12-12', '2027-01-15', '2027-01-16'].map((d) => ev('bloqueado', 'Karen no disponible', d)),
  ev('interno', 'Revisión de anuncios y decisión del embudo', '2026-12-20'),
];

const existentes = new Set((await db.collection('calendario').get()).docs.map((d) => { const x = d.data(); return `${x.type}|${x.date}|${x.title}`; }));
let creadas = 0, saltadas = 0;
const batch = db.batch();
for (const f of FECHAS) {
  if (existentes.has(`${f.type}|${f.date}|${f.title}`)) { saltadas++; continue; }
  batch.set(db.collection('calendario').doc(), { ...f, createdAt: FieldValue.serverTimestamp() });
  creadas++;
}
if (creadas) await batch.commit();
console.log(`Calendario: ${creadas} fechas creadas, ${saltadas} ya existían.`);
process.exit(0);
