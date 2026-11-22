// WhatsApp Business (API oficial de Meta, "Cloud API") con el número +56 9 7280 3407 (desde el 21 nov 2026 es también el número de las landings: src/lib/whatsapp.js).
// Variables de entorno en Vercel:
//   WHATSAPP_TOKEN         token permanente del usuario del sistema (Meta Business → Usuarios del sistema → Generar token, permiso whatsapp_business_messaging)
//   WHATSAPP_PHONE_ID      "Identificador del número de teléfono" de +56 9 7280 3407 (Meta for Developers → WhatsApp → Configuración de la API)
//   WHATSAPP_VERIFY_TOKEN  una frase cualquiera que tú inventas; se pega igual al configurar el webhook en Meta
//   WHATSAPP_APP_SECRET    "Clave secreta de la app" (Configuración de la app → Básica); con ella se comprueba que los avisos vienen de Meta
//   WHATSAPP_WABA_ID       opcional: "Identificador de la cuenta de WhatsApp Business"; con él el portal lista tus plantillas aprobadas para elegir
//   WHATSAPP_TEMPLATE_NAME opcional: plantilla aprobada para escribirle primero a alguien (por defecto hello_world, la que trae Meta)
//   WHATSAPP_TEMPLATE_LANG opcional: idioma de esa plantilla (por defecto en_US; para una propia, p. ej. es)
//   WHATSAPP_TEMPLATE_VARS opcional: 1 si la plantilla lleva {{1}} con el nombre de la persona
//   META_GRAPH_VERSION     opcional: versión de la API de Meta (la misma que usa meta.js)
const VERSION = process.env.META_GRAPH_VERSION || 'v23.0';

export const configurado = () => !!(process.env.WHATSAPP_TOKEN?.trim() && process.env.WHATSAPP_PHONE_ID?.trim());

// Número como lo pide WhatsApp: solo dígitos con código de país. Un celular chileno sin código (9 dígitos que empiezan en 9) se toma como +56.
export function normalizar(numero) {
  let d = String(numero || '').replace(/\D/g, '').replace(/^00/, '');
  if (d.length === 9 && d[0] === '9') d = `56${d}`;
  return d.length >= 8 && d.length <= 15 ? d : '';
}

async function llamar(cuerpo) {
  const r = await fetch(`https://graph.facebook.com/${VERSION}/${process.env.WHATSAPP_PHONE_ID.trim()}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN.trim()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', ...cuerpo }),
  });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e = new Error(out.error?.error_user_msg || out.error?.message || 'WhatsApp rechazó el mensaje.');
    e.codigo = out.error?.code;
    throw e;
  }
  return out.messages?.[0]?.id || '';
}

export const enviarTexto = (a, texto) => llamar({ to: a, type: 'text', text: { body: texto, preview_url: true } });

// Plantilla aprobada: la única forma de escribirle a alguien que no ha escrito en las últimas 24 horas.
// `elegida` ({ name, lang, vars }) viene de la lista de plantillas del portal; sin ella se usa la de las variables de Vercel.
export function enviarPlantilla(a, nombre, elegida) {
  const name = elegida?.name || process.env.WHATSAPP_TEMPLATE_NAME?.trim() || 'hello_world';
  const lang = elegida?.lang || process.env.WHATSAPP_TEMPLATE_LANG?.trim() || 'en_US';
  const conNombre = elegida ? Number(elegida.vars) === 1 : process.env.WHATSAPP_TEMPLATE_VARS === '1';
  const components = conNombre
    ? [{ type: 'body', parameters: [{ type: 'text', text: String(nombre || 'hola').slice(0, 60) }] }] : [];
  return llamar({ to: a, type: 'template', template: { name, language: { code: lang }, ...(components.length ? { components } : {}) } });
}

// Plantilla aprobada con las variables del cuerpo ({{1}}, {{2}}…) y, si lleva un botón de enlace con variable, su valor (el código personal).
// La usa la secuencia automática de la clase (src/lib/server/secuencia.js).
export function enviarPlantillaCon(a, { name, lang = 'es_CL', vars = [], boton = '' }) {
  const components = [
    ...(vars.length ? [{ type: 'body', parameters: vars.map((v) => ({ type: 'text', text: String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, 900) || '-' })) }] : []),
    ...(boton ? [{ type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: String(boton) }] }] : []),
  ];
  return llamar({ to: a, type: 'template', template: { name, language: { code: lang }, ...(components.length ? { components } : {}) } });
}

// ---------- Archivos (fotos, audios, videos y documentos) ----------
const AUTH = () => ({ Authorization: `Bearer ${process.env.WHATSAPP_TOKEN.trim()}` });
export const TIPO_ARCHIVO = (mime = '') => (/^image\/(jpeg|png)$/.test(mime) ? 'image'
  : /^video\/(mp4|3gpp)$/.test(mime) ? 'video'
  : /^audio\/(aac|mp4|mpeg|amr|ogg)/.test(mime) ? 'audio'
  : mime ? 'document' : '');

// Sube el archivo a Meta y lo envía; devuelve { id del mensaje, id del archivo }
export async function enviarArchivo(a, { buffer, mime, filename, caption }) {
  const tipo = TIPO_ARCHIVO(mime);
  const fd = new FormData();
  fd.append('messaging_product', 'whatsapp');
  fd.append('type', mime);
  fd.append('file', new Blob([buffer], { type: mime }), filename || 'archivo');
  const r = await fetch(`https://graph.facebook.com/${VERSION}/${process.env.WHATSAPP_PHONE_ID.trim()}/media`, { method: 'POST', headers: AUTH(), body: fd });
  const sub = await r.json().catch(() => ({}));
  if (!r.ok || !sub.id) throw new Error(sub.error?.error_user_msg || sub.error?.message || 'WhatsApp no aceptó el archivo.');
  const cuerpo = { id: sub.id, ...(caption && tipo !== 'audio' ? { caption } : {}), ...(tipo === 'document' ? { filename: filename || 'archivo' } : {}) };
  const id = await llamar({ to: a, type: tipo, [tipo]: cuerpo });
  return { id, mediaId: sub.id, tipo };
}

// Descarga un archivo que llegó (o que se envió) para mostrarlo en el portal
export async function bajarArchivo(mediaId) {
  const m = await fetch(`https://graph.facebook.com/${VERSION}/${encodeURIComponent(mediaId)}`, { headers: AUTH() });
  const info = await m.json().catch(() => ({}));
  if (!m.ok || !info.url) throw new Error('No se encontró el archivo.');
  const f = await fetch(info.url, { headers: AUTH() });
  if (!f.ok) throw new Error('No se pudo descargar el archivo.');
  return { cuerpo: f.body, mime: info.mime_type || f.headers.get('content-type') || 'application/octet-stream' };
}

// ---------- Plantillas aprobadas (necesita WHATSAPP_WABA_ID: el identificador de la cuenta de WhatsApp Business) ----------
export async function plantillasAprobadas() {
  const waba = process.env.WHATSAPP_WABA_ID?.trim();
  if (!waba) return null;
  const r = await fetch(`https://graph.facebook.com/${VERSION}/${waba}/message_templates?status=APPROVED&limit=100&fields=name,language,components,category`, { headers: AUTH() });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(out.error?.message || 'No se pudieron leer las plantillas de Meta.');
  return (out.data || []).map((t) => {
    const cuerpo = t.components?.find((c) => c.type === 'BODY')?.text || '';
    const vars = (cuerpo.match(/\{\{\d+\}\}/g) || []).length;
    const cabecera = t.components?.find((c) => c.type === 'HEADER');
    const botonesConVariable = (t.components?.find((c) => c.type === 'BUTTONS')?.buttons || []).some((b) => /\{\{\d+\}\}/.test(b.url || ''));
    // Solo se ofrecen las que el portal sabe llenar: sin variables o con una sola (el nombre), y sin cabecera de archivo
    const usable = vars <= 1 && (!cabecera || cabecera.format === 'TEXT' && !/\{\{/.test(cabecera.text || '')) && !botonesConVariable;
    return { name: t.name, lang: t.language, categoria: t.category, texto: cuerpo, vars, usable };
  });
}
