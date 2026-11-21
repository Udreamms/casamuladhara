// Secuencia automática de WhatsApp para las clases gratis (Péndulo y Tarot). APAGADA por defecto: no envía nada hasta que la Maestra la enciende
// en /staff → WhatsApp (config/secuenciaWA.activa = true). Además cada plantilla solo se usa cuando se marca como aprobada por Meta.
//
// Qué hace
//   1. Responder a quien escribe («Mi código: XXXX», o por su número, o pidiendo el correo): le entrega su enlace personal /entrar/<código> (nunca el Meet directo). Ver responderEntrante.
//   2. Cada 5 minutos (GET /api/secuencia con CRON_SECRET) revisa las clases de hoy, ayer y mañana y manda al que corresponda:
//        link       al registrarse (clase_link_personal)           · diaAntes  24 h antes (clase_recordatorio_dia_antes_2)
//        unaHora    1 h antes (clase_recordatorio_1h)             · post      30 min después del fin: clase_gracias_asistio (entró) o clase_replay_no_asistio
//
// Reglas que siempre se cumplen
//   · máximo 1 mensaje automático por día por persona (las respuestas a lo que ella escribe no cuentan) · solo de 8:00 a 22:00 hora de Chile
//   · nada a quien respondió «no», «baja»… (lead.noContactar), a quien no aceptó recibir WhatsApp ni a quien está descartada
//   · dentro de las 24 h desde su último mensaje se escribe con texto libre; fuera de esa ventana, solo con plantilla aprobada (si no hay, no se envía)
//   · cada paso se envía una sola vez por persona y clase (se reserva antes de enviar: dos revisiones a la vez no duplican) y queda en su historial
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { CODIGO, OFERTAS, RANGO, claseDe, claveClase, configClases, contactoPorCodigo, diaLargo, esClaseGratis, normaliza, primerNombre, waClave } from '@/lib/server/embudo.js';
import { db } from '@/lib/server/services.js';
import { configurado, enviarPlantillaCon, enviarTexto } from '@/lib/server/whatsapp.js';

const H = 36e5, MIN = 6e4, VENTANA = 24 * H;
const HORA_DESDE = 8, HORA_HASTA = 22;
const CFG = 'config/secuenciaWA';
export const LANG = 'es_CL';
// Plantillas (español de Chile). Mientras Meta no las apruebe, aprobadas[nombre] queda en false y no se usan.
export const PLANTILLAS = {
  clase_link_personal: { paso: 'link', uso: 'Al registrarse: enlace personal a la clase' },
  clase_recordatorio_dia_antes_2: { paso: 'diaAntes', uso: '24 horas antes de la clase' },
  clase_recordatorio_1h: { paso: 'unaHora', uso: '1 hora antes de la clase' },
  clase_gracias_asistio: { paso: 'gracias', uso: 'Después de la clase, a quien entró (con la grabación)' },
  clase_replay_no_asistio: { paso: 'replay', uso: 'Después de la clase, a quien no entró (con la grabación)' },
  bienvenida_general_2: { paso: null, uso: 'Sin paso asignado todavía' },
  clase_gratis_pendulo_2: { paso: null, uso: 'Sin paso asignado todavía' },
  clase_gratis_tarot_2: { paso: null, uso: 'Sin paso asignado todavía' },
};
const ms = (t) => (t?.toMillis ? t.toMillis() : typeof t === 'number' ? t : 0);
const base = () => (process.env.APP_URL || 'https://www.casamuladhara.com').replace(/\/$/, '');
const sano = (k) => `c_${String(k).replace(/[^A-Za-z0-9]/g, '_')}`; // clave segura para un campo de Firestore

// ---------- Interruptor y plantillas aprobadas (config/secuenciaWA) ----------
export async function leerConfig() {
  const d = (await db().doc(CFG).get()).data() || {};
  return {
    activa: d.activa === true,
    aprobadas: Object.fromEntries(Object.keys(PLANTILLAS).map((n) => [n, d.aprobadas?.[n] === true])),
  };
}
export async function guardarConfig(c, por = '') {
  const actual = await leerConfig();
  const sig = {
    activa: typeof c.activa === 'boolean' ? c.activa : actual.activa,
    aprobadas: { ...actual.aprobadas, ...Object.fromEntries(Object.keys(PLANTILLAS).filter((n) => typeof c.aprobadas?.[n] === 'boolean').map((n) => [n, c.aprobadas[n]])) },
    actualizado: Date.now(), por: String(por || '').slice(0, 120),
  };
  await db().doc(CFG).set(sig, { merge: true });
  return { activa: sig.activa, aprobadas: sig.aprobadas };
}

// ---------- Reglas de envío ----------
export const enHorario = (ahora) => { const h = Number(utcAChile(ahora).hora.slice(0, 2)); return h >= HORA_DESDE && h < HORA_HASTA; };
const NO_ESCRIBIR = (l) => l.noContactar === true || (l.tags || []).includes('No contactar') || l.status === 'descartado' || l.consentimiento?.whatsapp?.aceptado !== true;

// La clase del Calendario como la necesita la secuencia: { id, tipo, clase, fecha, hora, inicio, fin }
const claseDeEvento = (id, e) => {
  if (!e || e.tentative || !/^\d{4}-\d{2}-\d{2}$/.test(e.date || '') || !/^\d{2}:\d{2}$/.test(e.time || '')) return null;
  const inicio = chileAUtc(e.date, e.time), dur = Number.isFinite(e.duration) && e.duration > 0 ? e.duration : 60;
  return { id, clase: e.type === 'clase-tarot' ? 'tarot' : 'pendulo', fecha: e.date, hora: e.time, inicio, fin: inicio + dur * MIN };
};

// Qué paso toca ahora para esa persona y esa clase (o null). Solo mira los tiempos y lo ya enviado; no envía nada.
export function pasoDebido({ l, ev, ahora }) {
  const S = ev.inicio, F = ev.fin, k = sano(ev.id), hecho = (p) => !!l.secuencia?.[k]?.[p];
  const reg = ms(l.createdAt);
  if (ahora >= F + 30 * MIN) {
    if (ahora >= F + 30 * MIN + 20 * H || hecho('gracias') || hecho('replay') || RANGO[l.status] >= 5) return null; // ya compró: no se le escribe de la clase
    const a = l.asistencia?.sesiones?.[claveClase({ evento: ev.id, fecha: ev.fecha })] || l.asistencia || {};
    return a.entro || a.confirmada ? 'gracias' : 'replay';
  }
  if (ahora >= S - H && ahora < S - 15 * MIN && !hecho('unaHora')) return 'unaHora';
  if (ahora >= S - 24 * H && ahora < S - 18 * H && !hecho('diaAntes') && reg < S - 23 * H) return 'diaAntes';
  if (ahora >= reg + 2 * MIN && ahora < S - 15 * MIN && !hecho('link') && !l.waEnlaceT && !l.waEscribioT) return 'link';
  return null;
}

// Texto libre (dentro de las 24 h) y plantilla de cada paso. boton = el código personal, que va en el botón de enlace (…/entrar/{{1}}) de clase_link_personal,
// clase_recordatorio_dia_antes_2 y clase_recordatorio_1h; gracias y replay no llevan botón (los de respuesta rápida tampoco llevan parámetros).
function armar(paso, { l, ev, cfg, replay }) {
  const n = primerNombre(l.name) || 'hola', nombre = (OFERTAS[ev.clase] || {}).nombre || (ev.clase === 'tarot' ? 'Tarot Terapéutico' : 'Péndulo Hebreo');
  const dia = diaLargo(ev.fecha), enlace = `${base()}/entrar/${l.codigo}`;
  const grabacion = `${base()}/clase-${ev.clase}/replay?l=${l.codigo}`;
  const T = {
    link: { nombre: 'clase_link_personal', vars: [n, nombre, dia, ev.hora], boton: l.codigo,
      texto: `Hola ${n} 🌿 Este es tu enlace personal para entrar a la clase gratuita de ${nombre}, el ${dia} a las ${ev.hora}: ${enlace}\n\nEs solo tuyo: no lo compartas.` },
    diaAntes: { nombre: 'clase_recordatorio_dia_antes_2', vars: [n, nombre, ev.hora], boton: l.codigo,
      texto: `Hola ${n} 🌿 Mañana a las ${ev.hora} es tu clase gratuita de ${nombre} con Karen. Tu enlace para entrar: ${enlace}` },
    unaHora: { nombre: 'clase_recordatorio_1h', vars: [n, nombre, ev.hora], boton: l.codigo,
      texto: `Hola ${n} 🌿 En una hora (${ev.hora}) empieza tu clase gratuita de ${nombre}. Entra con tu enlace personal: ${enlace}` },
    gracias: { nombre: 'clase_gracias_asistio', vars: [n, nombre, grabacion],
      texto: `Hola ${n} 🌿 Gracias por acompañarnos en la clase de ${nombre}. Aquí tienes la grabación para verla cuando quieras: ${grabacion}` },
    replay: { nombre: 'clase_replay_no_asistio', vars: [n, nombre, grabacion],
      texto: `Hola ${n} 🌿 Por si no pudiste verla en vivo, aquí está la grabación de la clase de ${nombre}: ${grabacion}` },
  };
  return T[paso];
}

// ---------- Salida al chat del portal ----------
async function registrarSalida(numero, id, texto) {
  const t = Timestamp.fromMillis(Date.now());
  await db().doc(`wa_chats/${numero}`).set({ number: numero, lastText: texto.slice(0, 200), lastDir: 'out', lastAt: t }, { merge: true });
  await db().doc(`wa_chats/${numero}/messages/${id || `out-${Date.now()}`}`).set({ dir: 'out', text: texto.slice(0, 4000), ts: t, status: 'sent', auto: true }, { merge: true });
}
const ventanaAbierta = async (numero) => Date.now() - ms((await db().doc(`wa_chats/${numero}`).get()).data()?.lastInboundAt) < VENTANA;

// Envía un paso a una persona. Devuelve { ok, via } | { omitido } | { error }.
async function enviarPaso({ ref, l, ev, paso, cfg, hoy, ahora, replay }) {
  const numero = waClave(l.waKey || l.whatsapp);
  if (!numero) return { omitido: 'sin número' };
  if ((paso === 'gracias' || paso === 'replay') && !/^https:\/\//i.test(replay || '')) return { omitido: 'la grabación aún no está publicada' };
  const m = armar(paso, { l, ev, cfg, replay });
  const abierta = await ventanaAbierta(numero);
  if (paso === 'link' && abierta) return { omitido: 'ya le escribió: recibe el enlace por la respuesta automática' };
  if (!abierta && cfg.aprobadas[m.nombre] !== true) return { omitido: `la plantilla ${m.nombre} aún no está aprobada` };
  const k = sano(ev.id);
  // Se reserva el paso antes de enviar: si dos revisiones coinciden, solo una lo envía
  let reservado = false;
  await db().runTransaction(async (tx) => {
    const x = (await tx.get(ref)).data() || {};
    if (x.secuencia?.[k]?.[paso] || x.waAutoDia === hoy || NO_ESCRIBIR(x)) return;
    tx.update(ref, { [`secuencia.${k}.${paso}`]: { t: ahora }, waAutoDia: hoy });
    reservado = true;
  });
  if (!reservado) return { omitido: 'ya recibió un mensaje hoy, o este paso ya salió' };
  try {
    const id = abierta ? await enviarTexto(numero, m.texto) : await enviarPlantillaCon(numero, { name: m.nombre, lang: LANG, vars: m.vars, boton: m.boton || '' });
    await registrarSalida(numero, id, abierta ? m.texto : `[Plantilla ${m.nombre}] ${m.texto}`).catch((e) => console.error('secuencia chat', e));
    await ref.update({ [`secuencia.${k}.${paso}`]: { t: ahora, id: id || '', via: abierta ? 'texto' : 'plantilla' }, ...(paso === 'link' ? { waEnlaceT: ahora } : {}),
      eventos: FieldValue.arrayUnion({ t: ahora, tipo: 'envio', texto: `WhatsApp automático (${paso}): ${abierta ? 'texto' : `plantilla ${m.nombre}`}` }), updatedAt: FieldValue.serverTimestamp() });
    return { ok: true, via: abierta ? 'texto' : 'plantilla' };
  } catch (e) {
    console.error('secuencia envío', e);
    await ref.update({ [`secuencia.${k}.${paso}`]: { t: ahora, error: String(e.message || e).slice(0, 200) }, eventos: FieldValue.arrayUnion({ t: ahora, tipo: 'envio', texto: `WhatsApp automático (${paso}) no se pudo enviar: ${String(e.message || e).slice(0, 120)}` }) }).catch(() => {});
    return { error: String(e.message || e) };
  }
}

// ---------- Revisión periódica ----------
// enviar:false = solo simula: lista lo que saldría ahora (sin enviar ni anotar nada, aunque la secuencia esté apagada)
export async function correrSecuencia({ ahora = Date.now(), enviar = true } = {}) {
  const cfg = await leerConfig();
  if (enviar) {
    if (!cfg.activa) return { activa: false, enviados: 0 };
    if (!configurado()) return { activa: true, enviados: 0, aviso: 'WhatsApp no está conectado' };
    if (!enHorario(ahora)) return { activa: true, enviados: 0, aviso: 'fuera de horario (8:00 a 22:00 hora de Chile)' };
  }
  const { replay } = await configClases();
  const hoy = utcAChile(ahora).fecha, salida = { activa: cfg.activa, enviados: 0, omitidos: 0, errores: 0, pendientes: [] };
  for (const tipo of ['clase-pendulo', 'clase-tarot']) {
    const cal = await db().collection('calendario').where('type', '==', tipo).get();
    for (const d of cal.docs) {
      const ev = claseDeEvento(d.id, d.data());
      if (!ev || ahora < ev.inicio - 25 * H || ahora > ev.fin + 22 * H) continue;
      const personas = await db().collection('leads').where('claseEvento', '==', d.id).get();
      for (const p of personas.docs) {
        const l = p.data();
        if (!esClaseGratis(l.form) || !l.codigo || !CODIGO.test(l.codigo) || NO_ESCRIBIR(l) || l.waAutoDia === hoy) continue;
        const paso = pasoDebido({ l, ev, ahora });
        if (!paso) continue;
        if (!enviar) { salida.pendientes.push({ id: p.id, nombre: primerNombre(l.name), paso, clase: ev.clase, fecha: ev.fecha }); continue; }
        if (salida.enviados >= 80) return salida; // tope por revisión
        const r = await enviarPaso({ ref: p.ref, l: { ...l, id: p.id }, ev, paso, cfg, hoy, ahora, replay: replay[ev.clase] });
        if (r.ok) salida.enviados++; else if (r.error) salida.errores++; else salida.omitidos++;
      }
    }
  }
  return salida;
}

// ---------- Respuesta automática a quien escribe ----------
const RE_CODIGO = /c[oó]digo\s*[:\-]?\s*([A-Za-z0-9]{12})\b/i;
const RE_CORREO = /[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/;
const PIDE_ENLACE = /enlace|link|clase|entrar|ingres|meet|zoom|donde|cuando|hora/;
const ultimaClase = (docs) => docs.filter((d) => esClaseGratis(d.data().form) && d.data().codigo).sort((a, b) => ms(b.data().createdAt) - ms(a.data().createdAt))[0];

// Escribe a quien nos escribió: identifica por «Mi código: XXXX», si no por su número y si no pide el correo.
// Devuelve { respondio, motivo }. No hace nada si la secuencia está apagada. Nunca manda el Meet directo: solo /entrar/<código>.
export async function responderEntrante({ numero, texto, ahora = Date.now() }) {
  const cfg = await leerConfig();
  if (!cfg.activa || !configurado()) return { respondio: false, motivo: 'apagada' };
  const t = String(texto || ''), tn = normaliza(t);
  const chatRef = db().doc(`wa_chats/${numero}`);
  let doc = null;
  const porCodigo = RE_CODIGO.exec(t)?.[1];
  if (porCodigo) { const c = await contactoPorCodigo(porCodigo); if (c) doc = { id: c.id, ref: c.ref, data: () => c }; }
  if (!doc) doc = ultimaClase((await db().collection('leads').where('waKey', '==', numero).get()).docs);
  if (!doc) {
    const correo = RE_CORREO.exec(t)?.[0]?.toLowerCase();
    if (correo) doc = ultimaClase((await db().collection('leads').where('email', '==', correo).get()).docs);
  }
  if (!doc) {
    // No la reconocemos: se le pide el correo (una vez cada 6 horas) en vez de adivinar
    const chat = (await chatRef.get()).data() || {};
    if (ahora - (chat.autoPideCorreoT || 0) < 6 * H) return { respondio: false, motivo: 'ya se le pidió el correo' };
    const msg = 'Hola 🌿 Gracias por escribirnos. Para enviarte el enlace de tu clase, ¿me dices con qué correo te registraste?';
    const id = await enviarTexto(numero, msg);
    await registrarSalida(numero, id, msg).catch((e) => console.error('secuencia chat', e));
    await chatRef.set({ autoPideCorreoT: ahora }, { merge: true });
    return { respondio: true, motivo: 'pidió correo' };
  }
  const l = doc.data();
  if (NO_ESCRIBIR(l)) return { respondio: false, motivo: 'no contactar' };
  if (ahora - (l.waRespT || 0) < 60e3) return { respondio: false, motivo: 'repetido (menos de 60 s)' };
  const marca = { waEscribioT: l.waEscribioT || ahora, waRespT: ahora };
  if (!porCodigo && l.waEnlaceT && !PIDE_ENLACE.test(tn)) { await doc.ref.update(marca); return { respondio: false, motivo: 'ya tiene su enlace' }; }
  let ev = null;
  if (l.claseEvento) { const s = await db().doc(`calendario/${l.claseEvento}`).get(); ev = s.exists ? claseDeEvento(s.id, s.data()) : null; }
  const clase = l.clase || claseDe(l.form), nombre = (OFERTAS[clase] || {}).nombre || 'la clase gratuita', n = primerNombre(l.name);
  const cuando = ev ? `, el ${diaLargo(ev.fecha)} a las ${ev.hora}` : '';
  const msg = `Hola${n ? ` ${n}` : ''} 🌿 ¡Qué alegría! Este es tu enlace personal para entrar a la clase gratuita de ${nombre}${cuando}: ${base()}/entrar/${l.codigo}\n\nEs solo tuyo: no lo compartas. Si necesitas algo más, escríbeme por aquí.`;
  const id = await enviarTexto(numero, msg);
  await registrarSalida(numero, id, msg).catch((e) => console.error('secuencia chat', e));
  await doc.ref.update({ ...marca, waEnlaceT: ahora, eventos: FieldValue.arrayUnion({ t: ahora, tipo: 'envio', texto: 'Escribió por WhatsApp: se le envió su enlace personal' }), updatedAt: FieldValue.serverTimestamp() });
  return { respondio: true, motivo: 'enlace enviado' };
}
