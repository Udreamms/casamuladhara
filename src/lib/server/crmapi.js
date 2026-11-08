// Clave secreta entre el servidor del sitio y el CRM: Authorization: Bearer <CRM_API_KEY> (variable de entorno en Vercel).
import crypto from 'node:crypto';

// true si la clave es correcta; si no, el motivo ('sin_clave_configurada' o 'no_autorizado')
export function autorizado(request) {
  const clave = (process.env.CRM_API_KEY || '').trim();
  if (!clave) return 'sin_clave_configurada';
  const dada = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  const a = crypto.createHash('sha256').update(dada).digest(), b = crypto.createHash('sha256').update(clave).digest();
  return crypto.timingSafeEqual(a, b) ? true : 'no_autorizado';
}
