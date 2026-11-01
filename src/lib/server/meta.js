// API de conversiones de Meta (eventos enviados desde el servidor, además del Píxel del navegador).
// Variables de entorno (Vercel y .env.local; nunca en el código ni en GitHub):
//   META_CAPI_TOKEN        token del conjunto de datos (Administrador de eventos → Configuración → Generar token). Sin él, no se envía nada.
//   META_TEST_EVENT_CODE   opcional: código de "Probar eventos"; con él los eventos solo aparecen en esa pestaña, no cuentan en anuncios.
//   META_PIXEL_ID          opcional: por defecto el Píxel Casa Muladhara.
//   META_GRAPH_VERSION     opcional: versión de la API de Meta.
//   META_CAPI_DRY_RUN=1    solo para pruebas locales: muestra lo que se enviaría, sin enviarlo.
// El mismo evento llega por el navegador (fbq) y por el servidor con el mismo event_id: Meta lo cuenta una sola vez.
// Los datos de la persona (correo, teléfono, nombre) viajan cifrados con SHA-256, como pide Meta.
import { createHash } from 'node:crypto';
import { after } from 'next/server';

const PIXEL = process.env.META_PIXEL_ID || '716765743270935';
const VERSION = process.env.META_GRAPH_VERSION || 'v23.0';
const sha = (v) => createHash('sha256').update(v).digest('hex');
const texto = (v) => (typeof v === 'string' ? v.trim().toLowerCase() : '');
const digitos = (v) => String(v || '').replace(/\D/g, '');
const cookie = (cabecera, nombre) => {
  const m = new RegExp(`(?:^|;\\s*)${nombre}=([^;]+)`).exec(cabecera || '');
  return m ? decodeURIComponent(m[1]) : '';
};
export const idValido = (v) => (typeof v === 'string' && /^[A-Za-z0-9_-]{8,64}$/.test(v) ? v : '');

// Datos del navegador que ayudan a Meta a reconocer a la persona: IP, dispositivo y cookies del Píxel (_fbp, _fbc)
export function contexto(request, fbclid = '') {
  const h = request.headers;
  const fbc = cookie(h.get('cookie'), '_fbc') || (typeof fbclid === 'string' && /^[\w-]{10,200}$/.test(fbclid) ? `fb.1.${Date.now()}.${fbclid}` : '');
  return {
    ip: (h.get('x-forwarded-for') || '').split(',')[0].trim(),
    ua: h.get('user-agent') || '',
    fbp: cookie(h.get('cookie'), '_fbp'),
    fbc,
    url: h.get('referer') || '',
  };
}

// user_data de un evento: correo, teléfono y nombre cifrados + contexto del navegador
export function usuario({ email, phone, nombre, uid } = {}, ctx = {}) {
  const u = {};
  const em = texto(email), ph = digitos(phone), fn = texto(nombre).split(/\s+/)[0];
  if (em) u.em = [sha(em)];
  if (ph.length >= 8) u.ph = [sha(ph)];
  if (fn) u.fn = [sha(fn)];
  if (uid) u.external_id = [sha(String(uid))];
  if (ctx.ip) u.client_ip_address = ctx.ip;
  if (ctx.ua) u.client_user_agent = ctx.ua;
  if (ctx.fbp) u.fbp = ctx.fbp;
  if (ctx.fbc) u.fbc = ctx.fbc;
  return u;
}

// Envía un evento a Meta. Nunca lanza errores: un fallo de Meta no debe romper un formulario, una reserva ni un pago.
export async function enviar({ nombre, id, url, user, custom, tiempo }) {
  const token = process.env.META_CAPI_TOKEN;
  const dry = process.env.META_CAPI_DRY_RUN === '1';
  if (!token && !dry) return { saltado: true };
  const evento = {
    event_name: nombre,
    event_time: Math.floor((tiempo || Date.now()) / 1000),
    event_id: id,
    action_source: 'website',
    ...(url ? { event_source_url: url } : {}),
    user_data: user || {},
    ...(custom ? { custom_data: custom } : {}),
  };
  const cuerpo = { data: [evento], ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}) };
  if (dry) { console.log('[meta dry-run]', JSON.stringify(cuerpo)); return { dry: true, cuerpo }; }
  try {
    const r = await fetch(`https://graph.facebook.com/${VERSION}/${PIXEL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...cuerpo, access_token: token }),
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) console.error('meta capi', nombre, r.status, (await r.text().catch(() => '')).slice(0, 300));
    return { ok: r.ok };
  } catch (e) {
    console.error('meta capi', nombre, e?.message || e);
    return { ok: false };
  }
}

// Igual que enviar, pero después de responder a la persona (no la hace esperar)
export function enviarDespues(args) {
  try { after(() => enviar(args)); } catch { enviar(args); }
}
