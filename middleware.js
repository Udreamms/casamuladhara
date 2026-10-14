// Vercel Routing Middleware: protege en el servidor el contenido de las clases y sus materiales.
// Solo pasa quien trae la cookie cm_session con un token válido de Firebase (proyecto casamuladhara)
// y el claim member=true (suscripción al día) o admin=true (la Maestra). El resto recibe 401/403.
import { next } from '@vercel/functions';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const PROJECT = 'casamuladhara';
const KEYS = createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));

export const config = { matcher: ['/curso/:path*', '/assets/n2/:path*', '/assets/n3/:path*'] };

const deny = (status, text) => new Response(text, {
  status,
  headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
});

export default async function middleware(request) {
  const token = (request.headers.get('cookie') || '').match(/(?:^|;\s*)cm_session=([^;]+)/)?.[1];
  if (!token) return deny(401, 'Inicia sesión en el aula para ver este contenido.');
  try {
    const { payload } = await jwtVerify(token, KEYS, { issuer: `https://securetoken.google.com/${PROJECT}`, audience: PROJECT });
    if (payload.admin === true || payload.member === true) return next();
    return deny(403, 'Este contenido es para alumnas con la suscripción activa.');
  } catch {
    return deny(401, 'Tu sesión expiró. Vuelve a entrar al aula.');
  }
}
