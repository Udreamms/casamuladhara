// Proxy de Next.js (antes middleware.js): protege en el servidor el contenido de las clases y sus materiales, nivel por nivel.
// Pide la cookie cm_session con un token válido de Firebase (proyecto casamuladhara). El claim lvls
// (lo ponen el webhook de Stripe, el portal de la Maestra o scripts/admin.mjs) dice qué niveles tiene abiertos,
// p. ej. [3]; lvl es el más alto. La Maestra (admin) abre todo.
//   /assets/n2/...  (materiales)  -> requiere el Nivel 2 abierto
//   /curso/n2.js    (código)      -> requiere lvl >= 2: el código de cada nivel usa piezas de los anteriores,
//                                    así que se descargan juntos; el aula solo muestra los niveles abiertos
import { NextResponse } from 'next/server';
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

export async function proxy(request) {
  const token = (request.headers.get('cookie') || '').match(/(?:^|;\s*)cm_session=([^;]+)/)?.[1];
  if (!token) return deny(401, 'Inicia sesión en el aula para ver este contenido.');
  let payload;
  try {
    ({ payload } = await jwtVerify(token, KEYS, { issuer: `https://securetoken.google.com/${PROJECT}`, audience: PROJECT }));
  } catch {
    return deny(401, 'Tu sesión expiró. Vuelve a entrar al aula.');
  }
  const path = new URL(request.url).pathname;
  const need = levelOf(path);
  if (payload.admin === true) return NextResponse.next();
  const lvl = Number(payload.lvl) || 0;
  const open = Array.isArray(payload.lvls) ? payload.lvls.includes(need) : lvl >= need; // tokens antiguos: solo lvl
  if (path.startsWith('/curso/n') ? lvl >= need : open) return NextResponse.next();
  return deny(403, 'Este contenido se abre cuando tengas acceso a este nivel.');
}
