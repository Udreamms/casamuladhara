// Horarios públicos de las landings, calculados desde el Calendario de la Maestra (calendario/{id}). Todo en hora de Chile.
// Solo se entregan datos que se pueden mostrar al público: nunca eventos "por confirmar" (tentative), salvo el próximo inicio de
// cada curso o grupo, que se muestra con la palabra "próximo". Nada de esto vive escrito en el HTML: al pasar el tiempo, cambia solo.
import { chileAUtc } from './agenda.js';

const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const pad = (n) => String(n).padStart(2, '0');
const hm = (m) => `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`;
const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const masUno = (f) => new Date(Date.parse(`${f}T00:00:00Z`) + 864e5).toISOString().slice(0, 10);

const valido = (e) => FECHA.test(e.date || '') && e.type !== 'interno';
const horaFin = (e) => (HORA.test(e.endTime || '') ? e.endTime : HORA.test(e.time || '') && e.duration > 0 ? hm(mins(e.time) + e.duration) : '');
const inicioUtc = (e) => chileAUtc(e.date, HORA.test(e.time || '') ? e.time : '00:00');
// Un evento sin hora de término dura hasta el final del día
const finUtc = (e) => { const f = horaFin(e); return f && f > e.time ? chileAUtc(e.date, f) : chileAUtc(masUno(e.date), '00:00'); };
const cortar = (e) => ({ fecha: e.date, hora: HORA.test(e.time || '') ? e.time : '', fin: horaFin(e), titulo: e.title || '', nota: e.note || '' });
const porInicio = (a, b) => inicioUtc(a) - inicioUtc(b);

// Próximas clases gratis (hasta 3): solo las confirmadas y que no hayan terminado
const proximas = (eventos, tipo, ahora, n = 3) => eventos.filter((e) => e.type === tipo && !e.tentative && finUtc(e) > ahora).sort(porInicio).slice(0, n).map(cortar);

// Grupos o cursos: eventos del mismo tipo con el mismo título. Se muestra el próximo que aún no empieza (puede estar por confirmar).
function siguiente(eventos, tipo, ahora) {
  const grupos = new Map();
  for (const e of eventos.filter((x) => x.type === tipo)) { if (!grupos.has(e.title)) grupos.set(e.title, []); grupos.get(e.title).push(e); }
  const lista = [...grupos.entries()].map(([titulo, s]) => ({ titulo, sesiones: s.sort(porInicio) })).filter((g) => inicioUtc(g.sesiones[0]) > ahora).sort((a, b) => inicioUtc(a.sesiones[0]) - inicioUtc(b.sesiones[0]));
  const g = lista[0];
  return g ? { titulo: g.titulo, sesiones: g.sesiones.map(cortar), porConfirmar: !!g.sesiones[0].tentative } : null;
}

// Inicio del próximo grupo de la formación: la clase inaugural más cercana que no haya terminado
function inicioFormacion(eventos, ahora) {
  const e = eventos.filter((x) => x.type === 'formacion-inicio' && finUtc(x) > ahora).sort(porInicio)[0];
  return e ? { ...cortar(e), porConfirmar: !!e.tentative } : null;
}

export function publico(todos, ahora = Date.now()) {
  const eventos = todos.filter(valido);
  const tarot = siguiente(eventos, 'tarot', ahora), pendulo = siguiente(eventos, 'curso-pendulo', ahora);
  return {
    claseTarot: proximas(eventos, 'clase-tarot', ahora),
    clasePendulo: proximas(eventos, 'clase-pendulo', ahora),
    tarot: tarot && { titulo: tarot.titulo, ...tarot.sesiones[0], porConfirmar: tarot.porConfirmar },
    pendulo: pendulo && { titulo: pendulo.titulo, sesiones: pendulo.sesiones.map(({ fecha, hora, fin, nota }) => ({ fecha, hora, fin, nota })), porConfirmar: pendulo.porConfirmar },
    formacion: inicioFormacion(eventos, ahora),
  };
}
