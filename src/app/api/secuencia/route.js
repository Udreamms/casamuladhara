// /api/secuencia  · secuencia automática de WhatsApp de las clases gratis (lógica en src/lib/server/secuencia.js). Viene APAGADA.
//   GET  (Authorization: Bearer <CRON_SECRET>)   la revisión que corre cada 5 minutos (cron de Vercel o un servicio externo). Si la secuencia está apagada no hace nada.
//   POST (Authorization: Bearer <token de la Maestra>, cuerpo { action, ... })
//     'estado'                                    -> { activa, aprobadas, videoUrl, plantillas: [{ nombre, uso }], conectado }
//     'guardar' { activa?, aprobadas?, videoUrl? } -> enciende o apaga la secuencia y marca qué plantillas ya aprobó Meta
//     'simular'                                   -> { pendientes: [...] } lo que saldría ahora, sin enviar nada (sirve aunque esté apagada)
// Variables de Vercel: CRON_SECRET (la llave del cron), APP_URL (opcional) y las de WhatsApp (ver src/lib/server/whatsapp.js).
import crypto from 'node:crypto';
import { auth, json } from '@/lib/server/services.js';
import { PLANTILLAS, correrSecuencia, guardarConfig, leerConfig } from '@/lib/server/secuencia.js';
import { configurado } from '@/lib/server/whatsapp.js';

function llaveCronValida(request) {
  const secreto = process.env.CRON_SECRET?.trim();
  if (!secreto) return false;
  const dada = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(dada), b = Buffer.from(secreto);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function GET(request) {
  if (!llaveCronValida(request)) return new Response('No autorizado', { status: 401 });
  try { return json(await correrSecuencia()); } catch (e) { console.error('secuencia', e); return json({ error: 'No se pudo revisar la secuencia.' }, 500); }
}

export async function POST(request) {
  let user;
  try { user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')); } catch { return json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401); }
  if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);
  const body = await request.json().catch(() => ({}));
  try {
    if (body.action === 'guardar') await guardarConfig({ activa: body.activa, aprobadas: body.aprobadas, videoUrl: body.videoUrl }, user.email || user.uid);
    if (body.action === 'simular') return json(await correrSecuencia({ enviar: false }));
    if (body.action !== 'estado' && body.action !== 'guardar') return json({ error: 'Acción desconocida.' }, 400);
    return json({ ...(await leerConfig()), plantillas: Object.entries(PLANTILLAS).map(([nombre, p]) => ({ nombre, uso: p.uso })), conectado: configurado(), cron: !!process.env.CRON_SECRET?.trim() });
  } catch (e) { console.error('secuencia', e); return json({ error: 'No se pudo completar.' }, 500); }
}
