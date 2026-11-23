// /api/whatsapp  · chat de WhatsApp Business dentro del portal de la Maestra (número +56 9 7280 3407, API oficial de Meta)
//   GET                      verificación del webhook que pide Meta al configurarlo (hub.verify_token = WHATSAPP_VERIFY_TOKEN)
//   POST (con firma de Meta) avisos de Meta: mensajes que llegan, estados de entrega y los que Karen escribe desde la app de WhatsApp Business
//   POST (Authorization: Bearer <token de la Maestra>, cuerpo { action, ... }):
//     'estado'                      -> { configurado }
//     'enviar'   { to, text, name } -> escribe un mensaje (solo dentro de las 24 h desde que la persona escribió)
//     'plantilla' { to, name, plantilla? } -> abre la conversación con una plantilla aprobada (cuando pasaron más de 24 h o aún no ha escrito)
//     'plantillas'                  -> lista las plantillas aprobadas en Meta (necesita WHATSAPP_WABA_ID)
//     'archivo'  (formulario: to, name, text = pie de foto, file) -> foto, audio, video o documento de hasta 4 MB, también solo dentro de las 24 h
//   GET ?media=<id> (Authorization: Bearer <token de la Maestra>) -> el archivo de un mensaje, para verlo en el portal
//     'leido'    { to }             -> marca la conversación como leída
// Se guarda en wa_chats/{número} y wa_chats/{número}/messages/{id}; el portal los lee en vivo (solo la Maestra, ver firestore.rules).
import crypto from 'node:crypto';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { auth, db, json } from '@/lib/server/services.js';
import { bajarArchivo, configurado, enviarArchivo, enviarPlantilla, enviarTexto, normalizar, plantillasAprobadas, TIPO_ARCHIVO } from '@/lib/server/whatsapp.js';
import { asegurarFicha, crearFichasFaltantes } from '@/lib/server/ficha-wa.js';
import { pideParar } from '@/lib/server/embudo.js';
import { responderEntrante } from '@/lib/server/secuencia.js';
import { marcarReplayEnviado } from '@/lib/server/replay-eco.js';

const VENTANA = 24 * 60 * 60 * 1000;
const LIMITE_ARCHIVO = 4 * 1024 * 1024; // Vercel no deja pasar cuerpos de más de ~4,5 MB
const AVISO_VENTANA = { error: 'Pasaron más de 24 horas desde su último mensaje. WhatsApp solo permite abrir la conversación con la plantilla.', plantilla: true };
const fueraDeVentana = async (numero) => Date.now() - ((await db().doc(`wa_chats/${numero}`).get()).data()?.lastInboundAt?.toMillis?.() || 0) > VENTANA;
const TIPOS = { image: 'Imagen', audio: 'Audio', voice: 'Nota de voz', video: 'Video', document: 'Documento', sticker: 'Sticker', location: 'Ubicación', contacts: 'Contacto', button: '', interactive: '', reaction: 'Reacción' };

// Texto que se muestra de cada mensaje (los archivos se ven en la app de WhatsApp; aquí queda el aviso y el pie de foto)
function textoDe(m) {
  if (m.type === 'text') return m.text?.body || '';
  if (m.type === 'button') return m.button?.text || '';
  if (m.type === 'interactive') return m.interactive?.button_reply?.title || m.interactive?.list_reply?.title || '';
  if (m.type === 'reaction') return m.reaction?.emoji || '';
  const pie = m[m.type]?.caption || m[m.type]?.filename || '';
  return `[${TIPOS[m.type] || 'Mensaje'}]${pie ? ` ${pie}` : ''}`;
}

// Datos extra para mostrar el mensaje en el portal: el archivo (se descarga aparte con su id) o la ubicación
function extraDe(m) {
  if (['image', 'audio', 'voice', 'video', 'document', 'sticker'].includes(m.type)) {
    const f = m[m.type] || m.audio || {};
    return f.id ? { media: { id: f.id, mime: f.mime_type || '', kind: m.type === 'voice' ? 'audio' : m.type, ...(f.filename ? { filename: f.filename } : {}) } } : {};
  }
  if (m.type === 'location' && m.location) {
    return { loc: { lat: Number(m.location.latitude), lng: Number(m.location.longitude), ...(m.location.name ? { name: m.location.name } : {}) } };
  }
  return {};
}

function firmaValida(cuerpo, firma) {
  const secreto = process.env.WHATSAPP_APP_SECRET?.trim();
  if (!secreto || !firma) return false;
  const esperada = `sha256=${crypto.createHmac('sha256', secreto).update(cuerpo).digest('hex')}`;
  const a = Buffer.from(esperada), b = Buffer.from(firma);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function guardar(numero, { dir, id, text, nombre, ms, status, extra }) {
  const chat = db().doc(`wa_chats/${numero}`);
  const ts = Timestamp.fromMillis(ms || Date.now());
  const previo = (await chat.get()).data() || {};
  const entrante = dir === 'in';
  await chat.set({
    number: numero,
    ...(nombre && !previo.name ? { name: nombre } : {}),
    lastText: text.slice(0, 200),
    lastDir: dir,
    lastAt: ts,
    ...(entrante ? { lastInboundAt: ts, unread: FieldValue.increment(1) } : {}),
  }, { merge: true });
  await chat.collection('messages').doc(id).set({ dir, text: text.slice(0, 4000), ts, ...(status ? { status } : {}), ...(extra || {}) }, { merge: true });
}

// Quien responde «no» (o «stop», «baja»…) no recibe más mensajes: se marca en todos sus registros y sale de los envíos del portal
async function noContactar(numero) {
  try {
    const s = await db().collection('leads').where('waKey', '==', numero).get();
    const e = { t: Date.now(), tipo: 'envio', texto: 'Respondió «no»: no se le escribe más' };
    await Promise.all(s.docs.map((d) => d.ref.update({ noContactar: true, eventos: FieldValue.arrayUnion(e), updatedAt: FieldValue.serverTimestamp() })));
  } catch (err) { console.error('whatsapp noContactar', err); }
}

async function aviso(payload) {
  for (const entrada of payload.entry || []) {
    for (const cambio of entrada.changes || []) {
      const v = cambio.value || {};
      const nombres = Object.fromEntries((v.contacts || []).map((c) => [c.wa_id, c.profile?.name || '']));
      for (const m of v.messages || []) {
        const numero = normalizar(m.from);
        // Quien escribe y no tiene ficha queda en el CRM (si falla, el aviso de Meta igual se da por recibido)
        if (numero) await asegurarFicha(db(), { numero, nombre: nombres[m.from], texto: textoDe(m), marca: FieldValue.serverTimestamp() }).catch((err) => console.error('whatsapp ficha', err));
        if (numero) await guardar(numero, { dir: 'in', id: m.id, text: textoDe(m), nombre: nombres[m.from], ms: Number(m.timestamp) * 1000, extra: extraDe(m) });
        if (numero && pideParar(textoDe(m))) await noContactar(numero);
        // Secuencia de la clase (apagada por defecto): responde con el enlace personal. Si falla, el aviso de Meta igual se da por recibido.
        else if (numero && ['text', 'button', 'interactive'].includes(m.type)) await responderEntrante({ numero, texto: textoDe(m) }).catch((err) => console.error('whatsapp secuencia', err));
      }
      // Lo que Karen escribe desde la app de WhatsApp Business en su teléfono también queda en el chat del portal
      for (const m of v.message_echoes || []) {
        const numero = normalizar(m.to);
        if (numero) await guardar(numero, { dir: 'out', id: m.id, text: textoDe(m), ms: Number(m.timestamp) * 1000, status: 'sent', extra: extraDe(m) });
        // Si el mensaje lleva el enlace del replay de esa persona, su tarjeta queda marcada «Replay enviado» (si falla, el aviso de Meta igual se da por recibido)
        if (numero) await marcarReplayEnviado(db(), { texto: textoDe(m), ahora: Number(m.timestamp) * 1000 || Date.now(), arrayUnion: (e) => FieldValue.arrayUnion(e), marca: FieldValue.serverTimestamp() }).catch((err) => console.error('whatsapp replay', err));
      }
      for (const s of v.statuses || []) {
        const numero = normalizar(s.recipient_id);
        if (!numero || !s.id) continue;
        const error = s.errors?.[0]?.message || s.errors?.[0]?.title || '';
        await db().doc(`wa_chats/${numero}/messages/${s.id}`).set({ status: s.status, ...(error ? { error } : {}) }, { merge: true });
      }
    }
  }
}

// Solo la Maestra: devuelve su usuario o una respuesta de error
async function soloMaestra(request) {
  let user;
  try {
    user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  } catch (e) {
    return { error: json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401) };
  }
  if (user.admin !== true) return { error: json({ error: 'Esta acción es solo para la Maestra.' }, 403) };
  return { user };
}

// Fotos, audios y documentos de las conversaciones: el portal los pide aquí (con la sesión de la Maestra) y Meta los entrega con la llave del servidor
async function verArchivo(request, id) {
  const { error } = await soloMaestra(request);
  if (error) return error;
  if (!configurado()) return json({ error: 'WhatsApp todavía no está conectado.' }, 503);
  try {
    const { cuerpo, mime } = await bajarArchivo(id);
    return new Response(cuerpo, { status: 200, headers: { 'Content-Type': mime, 'Cache-Control': 'private, max-age=3600', 'X-Content-Type-Options': 'nosniff' } });
  } catch (e) { return json({ error: e.message }, 404); }
}

export async function GET(request) {
  const q = new URL(request.url).searchParams;
  if (q.get('media')) return verArchivo(request, q.get('media'));
  const clave = process.env.WHATSAPP_VERIFY_TOKEN?.trim();
  if (clave && q.get('hub.mode') === 'subscribe' && q.get('hub.verify_token') === clave) {
    return new Response(q.get('hub.challenge') || '', { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
  return new Response('No autorizado', { status: 403 });
}

export async function POST(request) {
  // Los archivos que sube el portal llegan como formulario; todo lo demás como JSON
  const conArchivo = (request.headers.get('content-type') || '').includes('multipart/form-data');
  const firma = request.headers.get('x-hub-signature-256');
  let crudo = '', body = {}, archivo = null;
  if (conArchivo) {
    try {
      const fd = await request.formData();
      body = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string'));
      archivo = fd.get('file');
    } catch { return json({ error: 'No se pudo leer el archivo.' }, 400); }
  } else {
    crudo = await request.text();
    try { body = JSON.parse(crudo); } catch { /* cuerpo vacío o roto */ }
  }

  // Aviso de Meta: se comprueba la firma antes de guardar nada
  if (firma && !conArchivo) {
    if (!firmaValida(crudo, firma)) return new Response('Firma no válida', { status: 401 });
    try { await aviso(body); } catch (e) { console.error('whatsapp webhook', e); return new Response('Error', { status: 500 }); }
    return new Response('ok', { status: 200 });
  }

  const { error } = await soloMaestra(request);
  if (error) return error;

  if (body.action === 'estado') return json({ configurado: configurado(), plantillas: !!process.env.WHATSAPP_WABA_ID?.trim() });
  // Crea la ficha de los chats que no la tienen (no envía nada ni necesita Meta)
  if (body.action === 'fichas') {
    try { return json({ ok: true, ...(await crearFichasFaltantes(db(), { marca: FieldValue.serverTimestamp() })) }); } catch (e) { console.error('whatsapp fichas', e); return json({ error: 'No se pudieron crear las tarjetas.' }, 500); }
  }
  if (!configurado()) return json({ error: 'WhatsApp todavía no está conectado: faltan WHATSAPP_TOKEN y WHATSAPP_PHONE_ID en Vercel.' }, 503);

  if (body.action === 'plantillas') {
    try { return json({ plantillas: await plantillasAprobadas() }); } catch (e) { return json({ error: e.message }, 502); }
  }

  const numero = normalizar(body.to);
  if (!numero) return json({ error: 'El número de WhatsApp no es válido. Debe llevar el código de país.' }, 400);

  try {
    if (body.action === 'leido') {
      await db().doc(`wa_chats/${numero}`).set({ unread: 0 }, { merge: true });
      return json({ ok: true });
    }
    const nombre = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
    if (body.action === 'enviar') {
      const texto = typeof body.text === 'string' ? body.text.trim().slice(0, 4000) : '';
      if (!texto) return json({ error: 'Escribe el mensaje.' }, 400);
      if (await fueraDeVentana(numero)) return json(AVISO_VENTANA, 409);
      const id = await enviarTexto(numero, texto);
      await guardar(numero, { dir: 'out', id: id || `out-${Date.now()}`, text: texto, nombre, status: 'sent' });
      return json({ ok: true });
    }
    if (body.action === 'archivo') {
      if (!archivo || typeof archivo === 'string' || !archivo.size) return json({ error: 'Elige un archivo.' }, 400);
      if (archivo.size > LIMITE_ARCHIVO) return json({ error: 'El archivo pesa más de 4 MB. Envía uno más liviano.' }, 413);
      const mime = (archivo.type || '').split(';')[0].toLowerCase();
      if (!TIPO_ARCHIVO(mime)) return json({ error: 'No se reconoce el tipo de archivo.' }, 400);
      if (await fueraDeVentana(numero)) return json(AVISO_VENTANA, 409);
      const caption = typeof body.text === 'string' ? body.text.trim().slice(0, 1000) : '';
      const filename = String(archivo.name || 'archivo').slice(0, 120);
      const r = await enviarArchivo(numero, { buffer: Buffer.from(await archivo.arrayBuffer()), mime, filename, caption });
      const etiqueta = { image: 'Imagen', audio: 'Audio', video: 'Video', document: 'Documento' }[r.tipo];
      await guardar(numero, {
        dir: 'out', id: r.id || `out-${Date.now()}`, text: `[${etiqueta}]${caption ? ` ${caption}` : r.tipo === 'document' ? ` ${filename}` : ''}`, nombre, status: 'sent',
        extra: { media: { id: r.mediaId, mime, kind: r.tipo, ...(r.tipo === 'document' ? { filename } : {}) } },
      });
      return json({ ok: true });
    }
    if (body.action === 'plantilla') {
      const elegida = body.plantilla?.name ? { name: String(body.plantilla.name), lang: String(body.plantilla.lang || 'es'), vars: Number(body.plantilla.vars) || 0 } : null;
      const id = await enviarPlantilla(numero, nombre.split(/\s+/)[0], elegida);
      const t = elegida?.name || process.env.WHATSAPP_TEMPLATE_NAME?.trim() || 'hello_world';
      await guardar(numero, { dir: 'out', id: id || `out-${Date.now()}`, text: `[Plantilla ${t}]`, nombre, status: 'sent' });
      return json({ ok: true });
    }
    return json({ error: 'Acción desconocida.' }, 400);
  } catch (e) {
    console.error('whatsapp', e);
    return json({ error: e.message || 'No pudimos enviar el mensaje.' }, 502);
  }
}
