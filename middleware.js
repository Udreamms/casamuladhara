// Vercel Routing Middleware: protege en el servidor el contenido de las clases y sus materiales, nivel por nivel.
// Pide la cookie cm_session con un token válido de Firebase (proyecto casamuladhara). El claim lvl
// (lo pone el webhook de Stripe o scripts/admin.mjs) dice hasta qué nivel puede abrir; la Maestra (admin) abre todo.
//   /curso/n2.js, /assets/n2/...  -> requiere lvl >= 2   (igual para cada nivel)
import { next } from '@vercel/functions';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const PROJECT = 'casamuladhara';
const KEYS = createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));

export const config = {
  matcher: ['/curso/:path*', '/assets/n1/:path*', '/assets/n2/:path*', '/assets/n3/:path*', '/assets/n4/:path*', '/assets/n5/:path*'],
};

const deny = (status, text) => new Response(text, {
  status,
  headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
});

// Nivel que pide la ruta; lo que no se reconoce queda reservado para la Maestra
const levelOf = (path) => Number(path.match(/^\/(?:curso\/n|assets\/n)(\d+)(?:\.js$|\/)/)?.[1]) || 99;

export default async function middleware(request) {
  const token = (request.headers.get('cookie') || '').match(/(?:^|;\s*)cm_session=([^;]+)/)?.[1];
  if (!token) return deny(401, 'Inicia sesión en el aula para ver este contenido.');
  let payload;
  try {
    ({ payload } = await jwtVerify(token, KEYS, { issuer: `https://securetoken.google.com/${PROJECT}`, audience: PROJECT }));
  } catch {
    return deny(401, 'Tu sesión expiró. Vuelve a entrar al aula.');
  }
  const need = levelOf(new URL(request.url).pathname);
  if (payload.admin === true || (Number(payload.lvl) || 0) >= need) return next();
  return deny(403, 'Este contenido se abre cuando tengas acceso a este nivel.');
}
