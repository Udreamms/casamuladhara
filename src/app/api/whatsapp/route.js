// /api/whatsapp  · chat de WhatsApp Business dentro del portal de la Maestra (número de Karen, API oficial de Meta)
//   GET                      verificación del webhook que pide Meta al configurarlo (hub.verify_token = WHATSAPP_VERIFY_TOKEN)
//   POST (con firma de Meta) avisos de Meta: mensajes que llegan, estados de entrega y los que Karen escribe desde la app de WhatsApp Business
//   POST (Authorization: Bearer <token de la Maestra>, cuerpo { action, ... }):
//     'estado'                      -> { configurado }
//     'enviar'   { to, text, name } -> escribe un mensaje (solo dentro de las 24 h desde que la persona escribió)
//     'plantilla' { to, name }      -> abre la conversación con la plantilla aprobada (cuando pasaron más de 24 h o aún no ha escrito)
//     'leido'    { to }             -> marca la conversación como leída
// Se guarda en wa_chats/{número} y wa_chats/{número}/messages/{id}; el portal los lee en vivo (solo la Maestra, ver firestore.rules).
import crypto from 'node:crypto';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { auth, db, json } from '@/lib/server/services.js';
import { configurado, enviarPlantilla, enviarTexto, normalizar } from '@/lib/server/whatsapp.js';
import { pideParar } from '@/lib/server/embudo.js';

const VENTANA = 24 * 60 * 60 * 1000;
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

function firmaValida(cuerpo, firma) {
  const secreto = process.env.WHATSAPP_APP_SECRET?.trim();
  if (!secreto || !firma) return false;
  const esperada = `sha256=${crypto.createHmac('sha256', secreto).update(cuerpo).digest('hex')}`;
  const a = Buffer.from(esperada), b = Buffer.from(firma);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function guardar(numero, { dir, id, text, nombre, ms, status }) {
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
  await chat.collection('messages').doc(id).set({ dir, text: text.slice(0, 4000), ts, ...(status ? { status } : {}) }, { merge: true });
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
        if (numero) await guardar(numero, { dir: 'in', id: m.id, text: textoDe(m), nombre: nombres[m.from], ms: Number(m.timestamp) * 1000 });
        if (numero && pideParar(textoDe(m))) await noContactar(numero);
      }
      // Lo que Karen escribe desde la app de WhatsApp Business en su teléfono también queda en el chat del portal
      for (const m of v.message_echoes || []) {
        const numero = normalizar(m.to);
        if (numero) await guardar(numero, { dir: 'out', id: m.id, text: textoDe(m), ms: Number(m.timestamp) * 1000, status: 'sent' });
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

export async function GET(request) {
  const q = new URL(request.url).searchParams;
  const clave = process.env.WHATSAPP_VERIFY_TOKEN?.trim();
  if (clave && q.get('hub.mode') === 'subscribe' && q.get('hub.verify_token') === clave) {
    return new Response(q.get('hub.challenge') || '', { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
  return new Response('No autorizado', { status: 403 });
}

export async function POST(request) {
  const crudo = await request.text();
  const firma = request.headers.get('x-hub-signature-256');
  let body = {};
  try { body = JSON.parse(crudo); } catch { /* cuerpo vacío o roto */ }

  // Aviso de Meta: se comprueba la firma antes de guardar nada
  if (firma) {
    if (!firmaValida(crudo, firma)) return new Response('Firma no válida', { status: 401 });
    try { await aviso(body); } catch (e) { console.error('whatsapp webhook', e); return new Response('Error', { status: 500 }); }
    return new Response('ok', { status: 200 });
  }

  let user;
  try {
    user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  } catch (e) {
    return json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401);
  }
  if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);

  if (body.action === 'estado') return json({ configurado: configurado() });
  if (!configurado()) return json({ error: 'WhatsApp todavía no está conectado: faltan WHATSAPP_TOKEN y WHATSAPP_PHONE_ID en Vercel.' }, 503);

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
      const ultimo = (await db().doc(`wa_chats/${numero}`).get()).data()?.lastInboundAt?.toMillis?.() || 0;
      if (Date.now() - ultimo > VENTANA) {
        return json({ error: 'Pasaron más de 24 horas desde su último mensaje. WhatsApp solo permite abrir la conversación con la plantilla.', plantilla: true }, 409);
      }
      const id = await enviarTexto(numero, texto);
      await guardar(numero, { dir: 'out', id: id || `out-${Date.now()}`, text: texto, nombre, status: 'sent' });
      return json({ ok: true });
    }
    if (body.action === 'plantilla') {
      const id = await enviarPlantilla(numero, nombre.split(/\s+/)[0]);
      const t = process.env.WHATSAPP_TEMPLATE_NAME?.trim() || 'hello_world';
      await guardar(numero, { dir: 'out', id: id || `out-${Date.now()}`, text: `[Plantilla ${t}]`, nombre, status: 'sent' });
      return json({ ok: true });
    }
    return json({ error: 'Acción desconocida.' }, 400);
  } catch (e) {
    console.error('whatsapp', e);
    return json({ error: e.message || 'No pudimos enviar el mensaje.' }, 502);
  }
}
