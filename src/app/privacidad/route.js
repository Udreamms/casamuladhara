// /privacidad · Política de privacidad pública (la pide Meta para publicar la app de WhatsApp y sirve también para el sitio).
// Página independiente: no toca las landings. Si cambian los proveedores o los datos que se guardan, se actualiza aquí.

const ACTUALIZADA = '20 de noviembre de 2026';
const WA_NEGOCIO = '56972803407'; // WhatsApp Business de Casa Muladhara (API oficial de Meta)

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Política de privacidad · Casa Muladhara</title>
<meta name="description" content="Cómo Casa Muladhara cuida y usa tus datos: formularios, WhatsApp, pagos y tus derechos.">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@400;700&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;background:#f6f4ec;color:#22302a;font:16px/1.7 Mulish,Segoe UI,system-ui,sans-serif;padding:24px 16px}
main{max-width:760px;margin:0 auto;background:#fffdf6;border:1px solid #d9d5c3;border-radius:22px;padding:34px 28px;box-shadow:0 12px 30px -16px rgba(31,63,50,.3)}
small.k{font:700 .7rem/1 Mulish,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a77a3b}
h1{margin:.4em 0 .2em;font:400 2rem/1.2 Marcellus,Georgia,serif;color:#1f3f32}h2{margin:1.8em 0 .4em;font:400 1.25rem/1.3 Marcellus,Georgia,serif;color:#1f3f32}
p,li{margin:.5em 0}ul{padding-left:1.2em}a{color:#2b5443;font-weight:700}.muted{color:#5d6b63;font-size:.92rem}
</style></head><body><main>
<small class="k">Casa Muladhara</small>
<h1>Política de privacidad</h1>
<p class="muted">Última actualización: ${ACTUALIZADA}</p>
<p><b>Casa Muladhara</b>, empresa constituida en Estados Unidos, es la responsable del tratamiento de tus datos en casamuladhara.com y en nuestro WhatsApp. Junto a la Maestra Karen, cuidamos tus datos con el mismo respeto con que acompañamos a quienes confían en nosotras. Aquí te contamos qué guardamos, para qué lo usamos y cómo puedes pedirnos que lo corrijamos o lo borremos.</p>

<h2>1. Qué datos recibimos</h2>
<ul>
<li><b>Los que tú nos das</b> al inscribirte a una clase, reservar una terapia, comprar o crear tu cuenta: nombre, correo electrónico, número de WhatsApp, país y el programa que te interesa.</li>
<li><b>Tus mensajes de WhatsApp</b> cuando nos escribes o te respondemos (texto, fotos, audios, documentos o ubicación que nos envíes).</li>
<li><b>Datos de uso del sitio</b>: de qué anuncio o enlace llegaste y cómo navegas, mediante el píxel de Meta y cookies, para saber qué funciona y mejorar el sitio.</li>
<li><b>Datos de pago</b>: los pagos los procesa Stripe. Casa Muladhara no ve ni guarda el número de tu tarjeta.</li>
</ul>

<h2>2. Para qué los usamos</h2>
<ul>
<li>Darte acceso a la clase, la terapia, el aula virtual o el curso que pediste.</li>
<li>Responderte tus consultas y acompañarte por WhatsApp, el correo o el teléfono.</li>
<li>Recordarte tus clases y avisarte de novedades relacionadas con lo que te interesó.</li>
<li>Medir y mejorar nuestros anuncios y el sitio web.</li>
<li>Cumplir obligaciones legales y de pago.</li>
</ul>
<p>No vendemos tus datos ni los entregamos a terceros para que te escriban por su cuenta.</p>

<h2>3. WhatsApp</h2>
<p>Atendemos por el número +56 9 7280 3407 usando la API oficial de WhatsApp Business de Meta. Solo te escribimos si nos dejaste tus datos o si tú nos escribiste primero, de forma cercana y sin presión. Si no quieres recibir más mensajes, responde <b>«baja»</b> o <b>«no»</b> y dejaremos de escribirte.</p>

<h2>4. Con quién compartimos tus datos</h2>
<p>Solo con los servicios que necesitamos para funcionar, que tratan los datos por encargo nuestro:</p>
<ul>
<li><b>Meta</b> (WhatsApp Business, píxel y medición de anuncios).</li>
<li><b>Stripe</b> (pagos).</li>
<li><b>Google Firebase</b> y <b>Vercel</b> (almacenamiento y alojamiento del sitio).</li>
<li><b>Proveedores de video</b> para las clases y los replays (por ejemplo, YouTube o Vimeo).</li>
</ul>
<p>Algunos de estos servicios operan fuera de Chile; al usarlos, tus datos pueden tratarse en otros países con sus propias medidas de seguridad.</p>

<h2>5. Cuánto tiempo los guardamos</h2>
<p>Mientras sigas en contacto con nosotras o mantengas una cuenta, y después solo el tiempo necesario para cumplir obligaciones legales o resolver reclamos. Puedes pedirnos que los borremos antes.</p>

<h2>6. Tus derechos</h2>
<p>Puedes pedirnos en cualquier momento que te mostremos qué datos tenemos de ti, los corrijamos, los eliminemos, dejemos de usarlos para enviarte mensajes o limitemos su uso, conforme a la ley que te sea aplicable según tu país de residencia (por ejemplo, la Ley N° 19.628 de Chile para quienes viven en Chile).</p>
<p>Para ejercer estos derechos o pedir que borremos tus datos, escríbenos por WhatsApp a <a href="https://wa.me/${WA_NEGOCIO}?text=Quiero%20pedir%20informaci%C3%B3n%20o%20borrar%20mis%20datos" rel="noopener">+56 9 7280 3407</a> indicando el número o correo con el que te registraste. Te responderemos y lo haremos en un plazo razonable.</p>

<h2>7. Seguridad</h2>
<p>Guardamos tus datos en servicios con acceso restringido y los conservamos solo en cuentas del equipo autorizado. Ningún sistema es infalible, pero trabajamos para protegerlos.</p>

<h2>8. Cookies</h2>
<p>Usamos cookies y el píxel de Meta para medir visitas y anuncios. Puedes bloquearlas o borrarlas desde la configuración de tu navegador; el sitio seguirá funcionando.</p>

<h2>9. Cambios a esta política</h2>
<p>Si cambiamos algo importante, actualizaremos esta página y la fecha de arriba.</p>

<p class="muted">Casa Muladhara · casamuladhara.com · WhatsApp de contacto: <a href="https://wa.me/${WA_NEGOCIO}" rel="noopener">+56 9 7280 3407</a></p>
</main></body></html>`;

export const GET = () => new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
