// Páginas públicas sencillas del embudo (confirmar asistencia, código de asistencia, replay). Son HTML simple con los colores del sitio.
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const WHATSAPP = 'https://wa.me/56940044528';

// Píxel de Meta solo en el sitio real (igual que captacion.js); evento: evento propio opcional, p. ej. ReplayView
export const pixel = (evento, id = '', params = null) => `<script>if(['casamuladhara.com','www.casamuladhara.com'].includes(location.hostname)){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','716765743270935');fbq('track','PageView');${evento ? `fbq('${['InitiateCheckout', 'Contact'].includes(evento) ? 'track' : 'trackCustom'}','${evento}'${params || id ? `,${JSON.stringify(params || {})}` : ''}${id ? `,{eventID:'${id}'}` : ''});` : ''}}</script>`;

export function pagina(titulo, cuerpo, status = 200, evento = '', eventoId = '') {
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>${esc(titulo)} · Casa Muladhara</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@400;700&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f6f4ec;color:#22302a;font:16px/1.6 Mulish,Segoe UI,system-ui,sans-serif}
main{width:min(560px,100%);background:#fffdf6;border:1px solid #d9d5c3;border-radius:22px;padding:32px 28px;box-shadow:0 12px 30px -16px rgba(31,63,50,.3);display:grid;gap:14px}
small.k{font:700 .7rem/1 Mulish,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a77a3b}
h1{margin:0;font:400 1.7rem/1.25 Marcellus,Georgia,serif;color:#1f3f32}p{margin:0}
a.b,button{display:inline-flex;justify-content:center;align-items:center;padding:14px 22px;border-radius:999px;border:0;background:#2b5443;color:#ece7d3;font:700 .85rem/1 Mulish,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;cursor:pointer}
a.b.alt{background:#e9e4d0;color:#1f3f32}input{font:inherit;padding:13px 15px;border-radius:12px;border:1px solid #d9d5c3;background:#f6f4ec;width:100%}
.muted{color:#5d6b63;font-size:.9rem}.err{color:#b8402f;font-weight:700}.video{aspect-ratio:16/9;width:100%;border:0;border-radius:14px;background:#000}
</style></head><body><main><small class="k">Casa Muladhara</small>${cuerpo}</main>${pixel(evento, eventoId)}</body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}
export const enlaceInvalido = () => pagina('Enlace no válido', `<h1>Este enlace ya no es válido</h1><p>Puede haber caducado. Escríbenos por WhatsApp y te ayudamos.</p><a class="b" href="${WHATSAPP}">Escribir por WhatsApp</a>`, 404);

// Video del replay: YouTube y Vimeo se incrustan; otro enlace se ofrece como botón
export function reproductor(url) {
  const yt = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
  if (yt) return `<iframe class="video" src="https://www.youtube.com/embed/${esc(yt[1])}" allow="encrypted-media; picture-in-picture" allowfullscreen title="Replay de la clase"></iframe>`;
  const vi = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vi) return `<iframe class="video" src="https://player.vimeo.com/video/${esc(vi[1])}" allow="fullscreen; picture-in-picture" allowfullscreen title="Replay de la clase"></iframe>`;
  if (/\.mp4(\?|$)/i.test(url)) return `<video class="video" controls src="${esc(url)}"></video>`;
  return `<a class="b" href="${esc(url)}" target="_blank" rel="noopener">Ver el replay</a>`;
}
