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
//
// Modo prueba (config/secuenciaWA.soloNumero): con un número escrito, la secuencia SOLO le escribe a esa persona (envíos, simulación y respuesta automática),
// aunque esté encendida y haya un cron. Mientras haya número de prueba, el botón «Enviar ahora» del panel envía solo a ese número, incluso con la secuencia apagada.
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { CODIGO, OFERTAS, RANGO, claseDe, claveClase, configClases, contactoPorCodigo, diaLargo, esClaseGratis, normaliza, primerNombre, waClave } from '@/lib/server/embudo.js';
import { db } from '@/lib/server/services.js';
import { configurado, enviarPlantillaCon, enviarTexto } from '@/lib/server/whatsapp.js';

const H = 36e5, MIN = 6e4, VENTANA = 24 * H;
const HORA_DESDE = 8, HORA_HASTA = 22;
const CFG = 'config/secuenciaWA';
export const LANG = 'es_CL';
// Qué mensajes salen solos (se eligen en el panel). Al principio: la bienvenida y los dos recordatorios; lo de después de la clase queda apagado.
export const PASOS_INICIAL = { link: true, diaAntes: true, unaHora: true, gracias: false, replay: false };
// Plantillas (español de Chile). Mientras Meta no las apruebe, aprobadas[nombre] queda en false y no se usan.
export const PLANTILLAS = {
  clase_link_personal: { paso: 'link', uso: 'Al registrarse: enlace personal a la clase' },
  clase_recordatorio_dia_antes_2: { paso: 'diaAntes', uso: '24 horas antes de la clase' },
  clase_recordatorio_40min: { paso: 'unaHora', uso: '40 minutos antes de la clase' },
  clase_gracias_asistio: { paso: 'gracias', uso: 'Ya no se usa: lo de después de la clase sale solo con texto libre y gratis' },
  clase_replay_no_asistio: { paso: 'replay', uso: 'Ya no se usa: lo de después de la clase sale solo con texto libre y gratis' },
  bienvenida_general_2: { paso: null, uso: 'Sin paso asignado todavía' },
  clase_gratis_pendulo_2: { paso: null, uso: 'Sin paso asignado todavía' },
  clase_gratis_tarot_2: { paso: null, uso: 'Sin paso asignado todavía' },
};
// El mismo celular puede venir escrito de dos maneras (Argentina: 54 9 …; México: 52 1 …)
export function variantesNumero(numero) {
  const n = String(numero || '').replace(/\D/g, ''), v = new Set(n ? [n] : []);
  if (/^549\d{10}$/.test(n)) v.add(`54${n.slice(3)}`); else if (/^54\d{10}$/.test(n)) v.add(`549${n.slice(2)}`);
  if (/^521\d{10}$/.test(n)) v.add(`52${n.slice(3)}`); else if (/^52\d{10}$/.test(n)) v.add(`521${n.slice(2)}`);
  return [...v];
}
const ms = (t) => (t?.toMillis ? t.toMillis() : typeof t === 'number' ? t : 0);
const base = () => (process.env.APP_URL || 'https://www.casamuladhara.com').replace(/\/$/, '');
const sano = (k) => `c_${String(k).replace(/[^A-Za-z0-9]/g, '_')}`; // clave segura para un campo de Firestore

// ---------- Interruptor y plantillas aprobadas (config/secuenciaWA) ----------
export async function leerConfig() {
  const d = (await db().doc(CFG).get()).data() || {};
  return {
    activa: d.activa === true,
    soloNumero: waClave(d.soloNumero) || '',
    pasos: Object.fromEntries(Object.entries(PASOS_INICIAL).map(([k, v]) => [k, typeof d.pasos?.[k] === 'boolean' ? d.pasos[k] : v])),
    aprobadas: Object.fromEntries(Object.keys(PLANTILLAS).map((n) => [n, d.aprobadas?.[n] === true])),
  };
}
export async function guardarConfig(c, por = '') {
  const actual = await leerConfig();
  // soloNumero: texto vacío = sin modo prueba; un número = solo se le escribe a esa persona; si no es un número válido, se rechaza
  let solo = actual.soloNumero;
  if (typeof c.soloNumero === 'string') { solo = c.soloNumero.trim() ? waClave(c.soloNumero) : ''; if (c.soloNumero.trim() && !solo) throw new Error('Número de prueba no válido (con código de país, por ejemplo +56 9 1234 5678).'); }
  const sig = {
    activa: typeof c.activa === 'boolean' ? c.activa : actual.activa,
    soloNumero: solo,
    pasos: { ...actual.pasos, ...Object.fromEntries(Object.keys(PASOS_INICIAL).filter((k) => typeof c.pasos?.[k] === 'boolean').map((k) => [k, c.pasos[k]])) },
    aprobadas: { ...actual.aprobadas, ...Object.fromEntries(Object.keys(PLANTILLAS).filter((n) => typeof c.aprobadas?.[n] === 'boolean').map((n) => [n, c.aprobadas[n]])) },
    actualizado: Date.now(), por: String(por || '').slice(0, 120),
  };
  await db().doc(CFG).set(sig, { merge: true });
  return { activa: sig.activa, soloNumero: sig.soloNumero, pasos: sig.pasos, aprobadas: sig.aprobadas };
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
  if (ahora >= S - 40 * MIN && ahora < S - 15 * MIN && !hecho('unaHora')) return 'unaHora'; // recordatorio 40 minutos antes
  if (ahora >= S - 24 * H && ahora < S - 18 * H && !hecho('diaAntes') && reg < S - 23 * H) return 'diaAntes';
  if (ahora >= reg + 2 * MIN && ahora < S - 15 * MIN && !hecho('link') && !l.waEnlaceT && !l.waEscribioT) return 'link';
  return null;
}

// Texto libre (dentro de las 24 h) y plantilla de cada paso. boton = el código personal, que va en el botón de enlace (…/entrar/{{1}}) de clase_link_personal
// y clase_recordatorio_dia_antes_2; el recordatorio de 40 minutos, gracias y replay no llevan botón de enlace (los de respuesta rápida tampoco llevan parámetros).
function armar(paso, { l, ev, cfg, replay }) {
  const n = primerNombre(l.name) || 'hola', nombre = (OFERTAS[ev.clase] || {}).nombre || (ev.clase === 'tarot' ? 'Tarot Terapéutico' : 'Péndulo Hebreo');
  const dia = diaLargo(ev.fecha), enlace = `${base()}/entrar/${l.codigo}`;
  const grabacion = `${base()}/clase-${ev.clase}/replay?l=${l.codigo}`;
  const T = {
    link: { nombre: 'clase_link_personal', vars: [n, nombre, dia, ev.hora], boton: l.codigo,
      texto: `Hola ${n} 🌿 Este es tu enlace personal para entrar a la clase gratuita de ${nombre}, el ${dia} a las ${ev.hora}: ${enlace}\n\nEs solo tuyo: no lo compartas.` },
    diaAntes: { nombre: 'clase_recordatorio_dia_antes_2', vars: [n, nombre, ev.hora], boton: l.codigo,
      texto: `Hola ${n} 🌿 Mañana a las ${ev.hora} es tu clase gratuita de ${nombre} con Karen. Tu enlace para entrar: ${enlace}` },
    // Sin enlace (ya lo recibió varias veces): solo avisa y ofrece ayuda. La plantilla lleva dos botones de respuesta rápida («Ya me conecto» y «Tengo un problema con el link»),
    // que no llevan parámetros; quien toca el segundo recibe su enlace de nuevo (responderEntrante) y cualquiera de los dos abre la ventana de 24 h.
    unaHora: { nombre: 'clase_recordatorio_40min', vars: [n, nombre, ev.hora],
      texto: `Hola ${n} 🌿 En unos minutos, hoy a las ${ev.hora}, empieza tu clase gratuita de ${nombre}. Si tienes algún problema con tu link, avísanos por aquí.` },
    gracias: { nombre: 'clase_gracias_asistio', vars: [n, nombre, grabacion],
      texto: `Hola ${n} 🌿 Gracias por acompañarnos en la clase de ${nombre}. Aquí tienes la grabación para verla cuando quieras: ${grabacion}` },
    replay: { nombre: 'clase_replay_no_asistio', vars: [n, nombre, grabacion],
      texto: `Hola ${n} 🌿 Por si no pudiste verla en vivo, aquí está la grabación de la clase de ${nombre}: ${grabacion}` },
  };
  return T[paso];
}

// Bienvenida con su enlace personal (el mismo texto para quien escribe con su código y para la respuesta rápida «Bienvenida» del portal), con el aviso de que habrá recordatorios
export const textoBienvenida = (l, ev) => {
  const clase = l.clase || claseDe(l.form), nombre = (OFERTAS[clase] || {}).nombre || (clase === 'tarot' ? 'Tarot Terapéutico' : clase === 'pendulo' ? 'Péndulo Hebreo' : 'la clase gratuita');
  const cuando = ev ? `el ${diaLargo(ev.fecha)} a las ${ev.hora} (hora de Chile)` : 'en la clase';
  return `Hola, ${primerNombre(l.name) || 'hola'}! Qué alegría que te hayas registrado. Este es tu link personal para la clase gratis de ${nombre}${clase === 'tarot' ? ', donde vas a aprender a usar las cartas para conocerte y acompañar a otras personas' : ''}:\n${base()}/entrar/${l.codigo}\nNos vemos ${cuando} ✨\n\nSolo para que sepas: te enviaré unos recordatorios por aquí antes de la clase.`;
};

// ---------- Salida al chat del portal ----------
async function registrarSalida(numero, id, texto) {
  const t = Timestamp.fromMillis(Date.now());
  await db().doc(`wa_chats/${numero}`).set({ number: numero, lastText: texto.slice(0, 200), lastDir: 'out', lastAt: t }, { merge: true });
  await db().doc(`wa_chats/${numero}/messages/${id || `out-${Date.now()}`}`).set({ dir: 'out', text: texto.slice(0, 4000), ts: t, status: 'sent', auto: true }, { merge: true });
}
const ventanaAbierta = async (numero, ahora = Date.now()) => ahora - ms((await db().doc(`wa_chats/${numero}`).get()).data()?.lastInboundAt) < VENTANA;

// Envía un paso a una persona. Devuelve { ok, via } | { omitido } | { error }.
async function enviarPaso({ ref, l, ev, paso, cfg, hoy, ahora, replay }) {
  const numero = waClave(l.waKey || l.whatsapp);
  if (!numero) return { omitido: 'sin número' };
  if ((paso === 'gracias' || paso === 'replay') && !/^https:\/\//i.test(replay || '')) return { omitido: 'la grabación aún no está publicada' };
  const m = armar(paso, { l, ev, cfg, replay });
  const abierta = await ventanaAbierta(numero, ahora);
  if (paso === 'link' && abierta) return { omitido: 'ya le escribió: recibe el enlace por la respuesta automática' };
  // Después de la clase solo se escribe con texto libre (gratis): si no escribió en las últimas 24 h no se manda plantilla, que tendría costo
  if (!abierta && (paso === 'gracias' || paso === 'replay')) return { omitido: 'lo de después de la clase solo sale con la ventana de 24 h abierta (es gratis); con plantilla tendría costo' };
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
// manual = el botón «Enviar ahora» del panel: solo funciona con número de prueba y envía solo a ese número aunque la secuencia esté apagada
export async function correrSecuencia({ ahora = Date.now(), enviar = true, manual = false } = {}) {
  const cfg = await leerConfig();
  const solo = cfg.soloNumero ? variantesNumero(cfg.soloNumero) : null;
  if (enviar) {
    if (manual && !solo) return { activa: cfg.activa, enviados: 0, aviso: 'Escribe primero el número de prueba' };
    if (!cfg.activa && !manual) return { activa: false, enviados: 0 };
    if (!configurado()) return { activa: true, enviados: 0, aviso: 'WhatsApp no está conectado' };
    if (!enHorario(ahora)) return { activa: true, enviados: 0, aviso: 'fuera de horario (8:00 a 22:00 hora de Chile)' };
  }
  const { replay } = await configClases();
  const hoy = utcAChile(ahora).fecha, salida = { activa: cfg.activa, soloNumero: cfg.soloNumero, enviados: 0, omitidos: 0, errores: 0, pendientes: [], ...(solo ? { fueraDePrueba: 0, detalle: [] } : {}) };
  for (const tipo of ['clase-pendulo', 'clase-tarot']) {
    const cal = await db().collection('calendario').where('type', '==', tipo).get();
    for (const d of cal.docs) {
      const ev = claseDeEvento(d.id, d.data());
      if (!ev || ahora < ev.inicio - 25 * H || ahora > ev.fin + 22 * H) continue;
      const personas = await db().collection('leads').where('claseEvento', '==', d.id).get();
      for (const p of personas.docs) {
        const l = p.data();
        if (solo && !solo.includes(waClave(l.waKey || l.whatsapp))) { salida.fueraDePrueba++; continue; } // modo prueba: solo el número elegido
        if (!esClaseGratis(l.form) || !l.codigo || !CODIGO.test(l.codigo) || NO_ESCRIBIR(l) || l.waAutoDia === hoy) continue;
        const paso = pasoDebido({ l, ev, ahora });
        if (!paso || cfg.pasos[paso] !== true) continue; // solo los mensajes que la Maestra dejó encendidos
        if (!enviar) { salida.pendientes.push({ id: p.id, nombre: primerNombre(l.name), paso, clase: ev.clase, fecha: ev.fecha }); continue; }
        if (salida.enviados >= 80) return salida; // tope por revisión
        const r = await enviarPaso({ ref: p.ref, l: { ...l, id: p.id }, ev, paso, cfg, hoy, ahora, replay: replay[ev.clase] });
        if (r.ok) salida.enviados++; else if (r.error) salida.errores++; else salida.omitidos++;
        if (solo && salida.detalle.length < 10) salida.detalle.push({ nombre: primerNombre(l.name), paso, resultado: r.ok ? `enviado (${r.via})` : r.error ? `error: ${r.error}` : r.omitido }); // en modo prueba se ve qué pasó con cada paso
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
  if (cfg.soloNumero && !variantesNumero(cfg.soloNumero).includes(String(numero))) return { respondio: false, motivo: 'modo prueba: solo responde al número de prueba' };
  if (cfg.pasos.link !== true) return { respondio: false, motivo: 'la bienvenida está apagada' };
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
  const msg = textoBienvenida(l, ev), id = await enviarTexto(numero, msg);
  await registrarSalida(numero, id, msg).catch((e) => console.error('secuencia chat', e));
  await doc.ref.update({ ...marca, waEnlaceT: ahora, eventos: FieldValue.arrayUnion({ t: ahora, tipo: 'envio', texto: 'Escribió por WhatsApp: se le envió su enlace personal' }), updatedAt: FieldValue.serverTimestamp() });
  return { respondio: true, motivo: 'enlace enviado' };
}
