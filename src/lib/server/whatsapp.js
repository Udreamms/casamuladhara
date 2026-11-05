// WhatsApp Business (API oficial de Meta, "Cloud API") con el número de Karen.
// Variables de entorno en Vercel:
//   WHATSAPP_TOKEN         token permanente del usuario del sistema (Meta Business → Usuarios del sistema → Generar token, permiso whatsapp_business_messaging)
//   WHATSAPP_PHONE_ID      "Identificador del número de teléfono" de +56 9 4004 4528 (Meta for Developers → WhatsApp → Configuración de la API)
//   WHATSAPP_VERIFY_TOKEN  una frase cualquiera que tú inventas; se pega igual al configurar el webhook en Meta
//   WHATSAPP_APP_SECRET    "Clave secreta de la app" (Configuración de la app → Básica); con ella se comprueba que los avisos vienen de Meta
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

// Plantilla aprobada: la única forma de escribirle a alguien que no ha escrito en las últimas 24 horas
export function enviarPlantilla(a, nombre) {
  const name = process.env.WHATSAPP_TEMPLATE_NAME?.trim() || 'hello_world';
  const lang = process.env.WHATSAPP_TEMPLATE_LANG?.trim() || 'en_US';
  const components = process.env.WHATSAPP_TEMPLATE_VARS === '1'
    ? [{ type: 'body', parameters: [{ type: 'text', text: String(nombre || 'hola').slice(0, 60) }] }] : [];
  return llamar({ to: a, type: 'template', template: { name, language: { code: lang }, ...(components.length ? { components } : {}) } });
}
