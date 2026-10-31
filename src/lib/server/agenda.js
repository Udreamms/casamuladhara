// Agenda de terapias: qué horas están libres según el Calendario de la Maestra (calendario/{id}).
// Todo se calcula en hora de Chile (America/Santiago, con su cambio de horario); al navegador se le entregan instantes (ms UTC).
export const TZ = 'America/Santiago';
export const TERAPIAS = [
  'Reiki', 'Radiestesia y Sanación del Alma', 'Péndulo Hebreo', 'Registros Akáshicos', 'Vidas Pasadas',
  'Sanando Niño Interior', 'Terapia Transgeneracional', 'Tarot Terapéutico y Evolutivo', 'Limpieza energética de espacios',
  'No sé, quiero orientación',
];
export const LIMPIEZA = 'Limpieza energética de espacios';
export const HORA_INICIO = 9; // atiende de 9:00 a 18:00 (Chile)
export const HORA_FIN = 18;
export const DIAS = [1, 2, 3, 4, 5]; // lunes a viernes (0 = domingo)
export const DURACION = 120; // minutos que se reservan por defecto: las sesiones duran entre 1 y 2 horas
export const ANTICIPACION_H = 4;
export const DIAS_ADELANTE = 31;
export const ZONAS_CHILE = ['America/Santiago', 'America/Punta_Arenas', 'Pacific/Easter'];
export const DIRECCION = 'Bellas Artes, Santiago de Chile';

const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const pad = (n) => String(n).padStart(2, '0');
const fmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
const partes = (ts) => Object.fromEntries(fmt.formatToParts(new Date(ts)).map((p) => [p.type, +p.value]));
const desfase = (ts) => { const p = partes(ts); return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ts / 1000) * 1000; };

// 'AAAA-MM-DD' + 'HH:MM' en hora de Chile -> ms UTC
export const chileAUtc = (fecha, hora) => {
  const [y, m, d] = fecha.split('-').map(Number), [h, mi] = hora.split(':').map(Number);
  const base = Date.UTC(y, m - 1, d, h, mi);
  return base - desfase(base - desfase(base));
};
// ms UTC -> { fecha: 'AAAA-MM-DD', hora: 'HH:MM' } en hora de Chile
export const utcAChile = (ts) => { const p = partes(ts); return { fecha: `${p.year}-${pad(p.month)}-${pad(p.day)}`, hora: `${pad(p.hour)}:${pad(p.minute)}` }; };
const masDias = (fecha, n) => new Date(Date.parse(`${fecha}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const diaSemana = (fecha) => new Date(`${fecha}T00:00:00Z`).getUTCDay();

// Tramos [desde, hasta) ocupados. Una fecha con hora ocupa esa hora; sin hora ocupa el día entero (Karen no disponible, receso, formación…).
export function ocupado(eventos) {
  const tramos = [];
  for (const e of eventos) {
    if (e.type === 'interno' || !FECHA.test(e.date || '')) continue;
    const fin = FECHA.test(e.endDate || '') && e.endDate > e.date ? e.endDate : e.date;
    for (let dia = e.date, n = 0; dia <= fin && n < 120; dia = masDias(dia, 1), n++) {
      if (HORA.test(e.time || '')) {
        const desde = chileAUtc(dia, e.time);
        const dur = Number.isFinite(e.duration) && e.duration > 0 ? e.duration : e.type === 'clase-pendulo' || e.type === 'clase-tarot' ? 60 : DURACION;
        tramos.push([desde, desde + dur * 6e4]);
      } else tramos.push([chileAUtc(dia, '00:00'), chileAUtc(masDias(dia, 1), '00:00')]);
    }
  }
  return tramos;
}

// Horas de inicio libres (ms UTC), de hora en hora, dentro del horario de Karen, con 4 horas de anticipación y hasta un mes
export function horasLibres(eventos, ahora = Date.now()) {
  const tramos = ocupado(eventos), libres = [];
  const hoy = utcAChile(ahora).fecha;
  for (let i = 0; i <= DIAS_ADELANTE + 1; i++) {
    const dia = masDias(hoy, i);
    if (!DIAS.includes(diaSemana(dia))) continue;
    for (let h = HORA_INICIO; h * 60 + DURACION <= HORA_FIN * 60; h++) {
      const desde = chileAUtc(dia, `${pad(h)}:00`), hasta = desde + DURACION * 6e4;
      if (desde < ahora + ANTICIPACION_H * 36e5 || desde > ahora + DIAS_ADELANTE * 864e5) continue;
      if (tramos.some(([a, b]) => desde < b && hasta > a)) continue;
      libres.push(desde);
    }
  }
  return libres;
}
