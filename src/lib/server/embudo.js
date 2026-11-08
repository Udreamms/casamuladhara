// Embudo de las clases gratis (Péndulo, Tarot, Formación): etapas, niveles de asistencia, código personal y eventos.
// Lo usan /api/leads (registro y herramientas de la Maestra), las rutas públicas (/entrar, /confirmar, /asistencia, replay)
// y la API del sitio (/contacto/validar y /eventos).
import crypto from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { db } from '@/lib/server/services.js';

export const CLASES = ['pendulo', 'tarot', 'formacion'];
// Línea de programa de cada formulario: la clase gratis y el curso comparten línea (Péndulo, Tarot)
export const claseDe = (form) => ({ 'clase-pendulo': 'pendulo', pendulo: 'pendulo', 'clase-tarot': 'tarot', tarot: 'tarot', formacion: 'formacion' })[form] || '';
export const esClaseGratis = (form) => form === 'clase-pendulo' || form === 'clase-tarot';

// Etapas del embudo de una clase gratis. Las seis primeras son el camino; las demás, alternativas.
export const ETAPAS_CLASE = ['registrada', 'confirmada', 'entro', 'asistio_confirmado', 'vio_oferta', 'matriculada', 'no_asistio', 'no_identificada', 'vio_replay', 'sin_respuesta', 'lista_espera'];
// Etapas de siempre (cursos y formación) más las del embudo de clases. Todas se guardan en el campo status.
export const ETAPAS = ['nuevo', 'contactado', 'clase', 'conversando', 'inscrita', 'descartado', ...ETAPAS_CLASE];
// Para que una etapa solo avance (nunca retroceda por un evento): mayor número = más avanzada
export const RANGO = {
  descartado: -1, nuevo: 0, registrada: 0, lista_espera: 0, contactado: 1, confirmada: 1, sin_respuesta: 1, no_asistio: 1, no_identificada: 1,
  entro: 2, vio_replay: 2, clase: 3, asistio_confirmado: 3, conversando: 4, vio_oferta: 4, inscrita: 5, matriculada: 5,
};
export const ETAPA_TXT = {
  nuevo: 'Nueva', contactado: 'Contactada', clase: 'Tomó la clase', conversando: 'En conversación', inscrita: 'Inscrita', descartado: 'Descartada',
  registrada: 'Registrada', confirmada: 'Confirmada', entro: 'Entró', asistio_confirmado: 'Asistió confirmado', vio_oferta: 'Vio la oferta', matriculada: 'Matriculada',
  no_asistio: 'No asistió', no_identificada: 'No identificada', vio_replay: 'Vio el replay', sin_respuesta: 'Sin respuesta', lista_espera: 'Lista de espera',
};
export const EVENTOS = ['clic_entrar', 'codigo_asistencia_ok', 'autodeclara_asistio', 'autodeclara_no_asistio', 'vio_replay', 'clic_comprar', 'pago_confirmado'];

// Ofertas del curso de cada línea (hora de Chile). El código personal caduca 60 días después del cierre.
export const OFERTAS = {
  pendulo: { cierre: ['2026-11-18', '17:00'], inicio: '2026-11-18', precio: 69900, moneda: 'CLP' },
  tarot: { cierre: ['2026-11-26', '17:00'], inicio: '2026-11-26', precio: 70, moneda: 'USD', cuotas: 2 },
};
export const cierreOferta = (clase) => (OFERTAS[clase] ? chileAUtc(OFERTAS[clase].cierre[0], OFERTAS[clase].cierre[1]) : 0);
export const venceCodigo = (clase, ahora = Date.now()) => (cierreOferta(clase) || ahora) + 60 * 864e5;

// Código personal: 12 caracteres aleatorios (letras y números), sin sesgo
const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export function nuevoCodigo() {
  let s = '';
  while (s.length < 12) for (const b of crypto.randomBytes(24)) if (b < 248 && s.length < 12) s += ALFABETO[b % 62]; // 248 = 62 × 4: evita el sesgo del resto
  return s;
}
export const CODIGO = /^[A-Za-z0-9]{12}$/;
export const waClave = (n) => { let d = String(n || '').replace(/\D/g, '').replace(/^00/, ''); if (d.length === 9 && d[0] === '9') d = `56${d}`; return d.length >= 8 && d.length <= 15 ? d : ''; };

// Enlaces de una persona (base = dirección pública del sitio)
export const enlacesDe = (codigo, clase, base) => (base ? {
  enlace_entrada: `${base}/entrar/${codigo}`,
  enlace_replay: `${base}${clase === 'tarot' ? '/clase-tarot' : '/clase-pendulo'}/replay?l=${codigo}`,
} : {});
// Dirección pública del sitio para los enlaces personales. Desde un computador local (localhost) sin APP_URL se devuelve '' para no
// guardar en la base de datos real enlaces que solo funcionan en ese computador.
export const baseSitio = (request) => {
  const u = (process.env.APP_URL || new URL(request.url).origin).replace(/\/$/, '');
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(u) ? '' : u;
};
// Datos que se agregan al registro de quien se inscribe a una clase
export function datosDeCodigo(form, base, existente = {}) {
  const clase = claseDe(form);
  if (!clase) return {};
  const codigo = existente.codigo && CODIGO.test(existente.codigo) ? existente.codigo : nuevoCodigo();
  return { clase, codigo, codigoVence: existente.codigoVence || venceCodigo(clase), codigoRevocado: false, ...enlacesDe(codigo, clase, base) };
}

export async function configClases() {
  const d = (await db().doc('config/clases').get()).data() || {};
  return {
    sala: { pendulo: d.enlacePendulo || '', tarot: d.enlaceTarot || '', formacion: d.enlaceFormacion || '' },
    replay: { pendulo: d.replayPendulo || '', tarot: d.replayTarot || '', formacion: '' },
  };
}

// Clase gratis cuya ventana (10 minutos antes a 30 después del inicio) contiene el instante ts. Trae la palabra de asistencia.
export async function sesionEn(clase, ts) {
  const tipo = clase === 'tarot' ? 'clase-tarot' : 'clase-pendulo';
  const s = await db().collection('calendario').where('type', '==', tipo).get();
  for (const d of s.docs) {
    const e = d.data();
    if (!e.date || !e.time || e.tentative) continue;
    const inicio = chileAUtc(e.date, e.time);
    if (ts >= inicio - 10 * 60e3 && ts <= inicio + 30 * 60e3) return { id: d.id, inicio, palabra: String(e.codigoAsistencia || ''), fecha: e.date };
  }
  return null;
}

// Sin tildes, minúsculas y sin signos: para comparar palabras y nombres
export const normaliza = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();

// Etapa tal como la ve el sitio: en las clases gratis, las etapas de antes se traducen a las del embudo nuevo
export const estadoClase = (status, form) => (esClaseGratis(form)
  ? ({ nuevo: 'registrada', contactado: 'confirmada', clase: 'asistio_confirmado', conversando: 'vio_oferta', inscrita: 'matriculada' })[status] || status
  : status);
export const primerNombre = (n) => String(n || '').trim().split(/\s+/)[0] || '';
// El contacto de un código válido (no revocado ni vencido), o null
export async function contactoPorCodigo(codigo) {
  if (!CODIGO.test(String(codigo || ''))) return null;
  const q = await db().collection('leads').where('codigo', '==', codigo).limit(1).get();
  if (q.empty) return null;
  const l = q.docs[0].data();
  if (l.codigoRevocado || (l.codigoVence && Date.now() > l.codigoVence)) return null;
  return { id: q.docs[0].id, ref: q.docs[0].ref, ...l, clase: l.clase || claseDe(l.form) };
}

// Un evento del embudo para el contacto con ese código. Ignora el mismo evento del mismo contacto en menos de 60 segundos.
// Devuelve { ok, estado, ignorado } o { error, status }.
export async function registrarEvento({ codigo, evento, fechaIso, origen = '', extra = {} }) {
  if (!EVENTOS.includes(evento)) return { error: 'evento_invalido', status: 400 };
  if (!CODIGO.test(String(codigo || ''))) return { error: 'codigo_invalido', status: 404 };
  const q = await db().collection('leads').where('codigo', '==', codigo).limit(1).get();
  if (q.empty) return { error: 'codigo_invalido', status: 404 };
  const ref = q.docs[0].ref, previo = q.docs[0].data(), ahora = Date.now();
  if (previo.codigoRevocado || (previo.codigoVence && ahora > previo.codigoVence)) return { error: 'codigo_invalido', status: 404 };
  let ts = Date.parse(fechaIso);
  if (!Number.isFinite(ts) || Math.abs(ts - ahora) > 864e5) ts = ahora; // se acepta la hora enviada solo si es razonable
  const clase = previo.clase || claseDe(previo.form);
  const sesion = evento === 'clic_entrar' || evento === 'codigo_asistencia_ok' ? await sesionEn(clase, ts) : null;
  const ev = (tipo, texto) => ({ t: ahora, tipo, texto: String(texto).slice(0, 300) });
  let resultado = { ok: true };
  await db().runTransaction(async (tx) => {
    const l = (await tx.get(ref)).data();
    if (l.evtUltimo?.[evento] && ahora - l.evtUltimo[evento] < 60000) { resultado = { ok: true, ignorado: true, estado: l.status }; return; }
    const asist = { ...(l.asistencia || {}) };
    let estado = l.status;
    const subir = (nuevo) => { if ((RANGO[nuevo] ?? 0) > (RANGO[estado] ?? 0)) estado = nuevo; };
    const cambios = {};
    const eventos = [ev('evento', `${evento}${origen ? ` · ${origen}` : ''}`)];
    if (evento === 'clic_entrar') {
      if (sesion) { asist.entro = asist.entro || ts; asist.evento = sesion.id; subir('entro'); }
      else eventos.push(ev('evento', 'Clic en entrar fuera del horario de la clase: no cuenta como entrada'));
    } else if (evento === 'codigo_asistencia_ok') {
      asist.confirmada = ts; asist.fuente = 'codigo'; if (sesion) asist.evento = sesion.id; subir('asistio_confirmado');
    } else if (evento === 'autodeclara_asistio') {
      asist.autodeclarada = 'si'; asist.autodeclaradaT = ts;
      if (estado === 'no_asistio') estado = 'no_identificada'; // dice que estuvo pero no aparece en la lista: no se puede identificar
    } else if (evento === 'autodeclara_no_asistio') {
      asist.autodeclarada = 'no'; asist.autodeclaradaT = ts; subir('no_asistio');
    } else if (evento === 'vio_replay') {
      cambios.replayT = ts; subir('vio_replay');
    } else if (evento === 'clic_comprar') {
      cambios.compraClicT = ts; subir('vio_oferta');
      const hoy = utcAChile(ahora).fecha;
      if (!l.followUp || l.followUp < hoy) { cambios.followUp = hoy; eventos.push(ev('seguimiento', 'Hizo clic en comprar y aún no paga: escribirle hoy')); }
    } else if (evento === 'pago_confirmado') {
      const monto = Number(extra?.monto), moneda = String(extra?.moneda || '').toUpperCase().slice(0, 3);
      cambios.pago = { t: ts, ...(Number.isFinite(monto) ? { monto } : {}), ...(moneda ? { moneda } : {}) };
      estado = 'matriculada'; cambios.secuenciasVenta = false; cambios.followUp = '';
      eventos.push(ev('etapa', `Pago confirmado${Number.isFinite(monto) ? `: ${monto} ${moneda}` : ''}`));
    }
    if (estado !== l.status) { cambios.status = estado; eventos.push(ev('etapa', `Etapa: ${ETAPA_TXT[estado] || estado}`)); }
    tx.update(ref, { ...cambios, ...(Object.keys(asist).length ? { asistencia: asist } : {}), [`evtUltimo.${evento}`]: ahora, eventos: FieldValue.arrayUnion(...eventos), updatedAt: FieldValue.serverTimestamp() });
    resultado = { ok: true, ignorado: false, estado };
  });
  if (evento === 'pago_confirmado' && !resultado.ignorado) { try { await asegurarCurso(previo, clase); } catch (e) { console.error('embudo curso', e); } }
  return resultado;
}

// Quien paga el curso queda también inscrita en el programa de curso (para que aparezca en su pipeline)
export async function asegurarCurso(previo, clase) {
  const form = clase === 'tarot' ? 'tarot' : clase === 'pendulo' ? 'pendulo' : '';
  if (!form || !previo.email) return;
  const q = await db().collection('leads').where('email', '==', previo.email).where('form', '==', form).limit(1).get();
  if (!q.empty) { if ((RANGO[q.docs[0].data().status] ?? 0) < RANGO.inscrita) await q.docs[0].ref.update({ status: 'inscrita', updatedAt: FieldValue.serverTimestamp() }); return; }
  await db().collection('leads').add({
    form, clase, name: previo.name || '', email: previo.email || '', whatsapp: previo.whatsapp || '', waKey: previo.waKey || '', country: previo.country || '',
    interest: '', message: '', page: 'embudo', utm: {}, status: 'inscrita', desdeForm: previo.form || '',
    eventos: [{ t: Date.now(), tipo: 'programa', texto: 'Pagó el curso: inscrita automáticamente' }],
    createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
  });
}
