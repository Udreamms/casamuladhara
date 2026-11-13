import { existsSync } from 'node:fs';
import { join } from 'node:path';
// Landing del replay de una clase (estilo página de venta con video): anota que la persona la vio, muestra el video (o su marco
// mientras no esté cargado), cuenta regresiva al cierre de la inscripción, el botón de inscripción, preguntas frecuentes y testimonios.
import { OFERTAS, cierreOferta, configClases, contactoPorCodigo, primerNombre, registrarEvento } from '@/lib/server/embudo.js';
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { extras, plataforma, PLATAFORMA_URL, reservaPendulo, reservaTarot } from '@/lib/server/banderas.js';
import { enlaceInvalido, esc, pagina, pixel, reproductor, WHATSAPP } from '@/lib/server/paginas.js';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const NOMBRE = { pendulo: 'Péndulo Hebreo', tarot: 'Tarot Terapéutico' };
const PRECIO = { pendulo: extras() ? '$69.900 CLP · reserva $10.000 + saldo $59.900' : '$69.900 CLP · pago único', tarot: '2 cuotas mensuales de 70 USD' };
// Testimonios: déjalos vacíos hasta tener los reales (con permiso). Mientras estén vacíos, la sección no se muestra.
const TESTIMONIOS = [];

export const CSS = `*{box-sizing:border-box}body{margin:0;background:#f6f4ec;color:#22302a;font:17px/1.65 Mulish,Segoe UI,system-ui,sans-serif}
.top{background:#1f3f32;color:#ece7d3;text-align:center;padding:10px 16px;font:700 .8rem/1.4 Mulish,sans-serif;letter-spacing:.06em}
.top b{color:#e8c98a}main{width:min(860px,100%);margin:0 auto;padding:28px 20px 60px;display:grid;gap:34px}
.k{font:700 .72rem/1 Mulish,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a77a3b}
h1{margin:6px 0 8px;font:400 clamp(1.8rem,5vw,2.6rem)/1.2 Marcellus,Georgia,serif;color:#1f3f32}h2{margin:0 0 10px;font:400 1.6rem/1.25 Marcellus,Georgia,serif;color:#1f3f32}p{margin:0}
.hero{text-align:center}.hero p{color:#4b5a52}
.video{aspect-ratio:16/9;width:100%;border:0;border-radius:18px;background:#000;box-shadow:0 22px 44px -22px rgba(31,63,50,.55)}
.marco{aspect-ratio:16/9;border-radius:18px;background:radial-gradient(circle at 50% 40%,#2f5a47,#162f25);display:grid;place-items:center;color:#ece7d3;text-align:center;padding:20px;box-shadow:0 22px 44px -22px rgba(31,63,50,.55)}
.marco i{display:grid;place-items:center;width:84px;height:84px;margin:0 auto 14px;border-radius:50%;background:#e8c98a;color:#1f3f32;font-size:2rem;font-style:normal;padding-left:6px}
.oferta{background:#fffdf6;border:1px solid #d9d5c3;border-radius:22px;padding:30px 24px;text-align:center;display:grid;gap:14px;justify-items:center;box-shadow:0 12px 30px -16px rgba(31,63,50,.3)}
.cuenta{display:flex;gap:10px;justify-content:center}.cuenta div{min-width:70px;background:#1f3f32;color:#ece7d3;border-radius:14px;padding:10px 6px}
.cuenta b{display:block;font:400 1.8rem/1 Marcellus,Georgia,serif}.cuenta small{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#e8c98a}
.precio{font:400 1.5rem/1.2 Marcellus,Georgia,serif;color:#1f3f32}
a.b{display:inline-flex;justify-content:center;align-items:center;padding:18px 34px;border-radius:999px;background:#2b5443;color:#ece7d3;font:700 .95rem/1 Mulish,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;box-shadow:0 10px 24px -10px rgba(31,63,50,.6)}
a.b:hover{background:#1f3f32}a.alt{color:#2b5443;font-weight:700}.muted{color:#5d6b63;font-size:.9rem}
details{background:#fffdf6;border:1px solid #d9d5c3;border-radius:14px;padding:14px 18px;margin-bottom:10px}summary{cursor:pointer;font-weight:700;color:#1f3f32}details p{margin-top:8px}
.testis{display:grid;gap:12px}.testis blockquote{margin:0;background:#fffdf6;border-left:4px solid #a77a3b;border-radius:10px;padding:14px 18px}
.social{display:grid;gap:14px;text-align:center}.social h2{margin:0}.social .fotos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.social .fotos img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:14px;display:block}
.social .mazo{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:18px;align-items:center;text-align:left}.social .mazo img{width:100%;height:auto;border-radius:18px;display:block;box-shadow:0 22px 44px -22px rgba(31,63,50,.55)}.social ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}.social li b{display:block;font:400 1.15rem/1.3 Marcellus,Georgia,serif;color:#1f3f32}.social li span{color:#5d6b63;font-size:.92rem;line-height:1.45}
.social blockquote{margin:0;text-align:left;background:#fffdf6;border-left:4px solid #a77a3b;border-radius:10px;padding:14px 18px;font:400 1.05rem/1.55 Marcellus,Georgia,serif;color:#1f3f32}.social blockquote small{display:block;margin-top:8px;font:700 .85rem/1.3 Mulish,sans-serif;color:#5d6b63}
@media (max-width:640px){.social .mazo{grid-template-columns:1fr}}
footer{text-align:center}`;

const CUENTA = `(()=>{const el=document.querySelector('.cuenta');if(!el)return;const t=+el.dataset.cierre,p=(n)=>String(n).padStart(2,'0');const u=(k)=>el.querySelector('[data-u='+k+']');
const tick=()=>{const s=Math.max(0,Math.floor((t-Date.now())/1000));u('d').textContent=p(Math.floor(s/86400));u('h').textContent=p(Math.floor(s%86400/3600));u('m').textContent=p(Math.floor(s%3600/60));u('s').textContent=p(s%60);};tick();setInterval(tick,1000)})()`;

// Quién es la persona respecto a la clase. Decide si ENTRÓ a la clase: el clic en su enlace /entrar dentro de la ventana de la clase
// (asistencia.entro) o el informe de Meet cargado por Karen en «Clasificar una clase». No cuentan la palabra de asistencia ni la autodeclaración.
//   'si'     entró
//   'no'     no entró: Karen la clasificó «No asistió», o ya pasó su clase y no hizo clic dentro de la ventana
//   'neutro' sin dato: no se puede identificar («No identificada»), o su clase aún no pasa
const ESTUVO = ['entro', 'asistio_confirmado', 'clase', 'inscrita', 'matriculada'];
export function segmentoDe(c, ahora = Date.now()) {
  const a = c.asistencia || {};
  if (c.status === 'no_identificada') return 'neutro';
  if (a.entro || (a.confirmada && a.fuente === 'meet') || ESTUVO.includes(c.status)) return 'si';
  if (c.status === 'no_asistio') return 'no';
  if (/^\d{4}-\d{2}-\d{2}$/.test(c.claseFecha || '') && chileAUtc(c.claseFecha, '19:00') + 30 * 60e3 < ahora) return 'no';
  return 'neutro';
}

export async function paginaReplay(request, clase) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    // Solo en el computador local (nunca en producción): código de vista previa, sin tocar la base de datos real
    const prueba = process.env.NODE_ENV !== 'production' && codigo === 'PREVIEWLOCAL';
    const c = prueba ? { name: 'María Prueba' } : await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    // En la vista previa local se elige el caso con &e=si|no|neutro
    const seg = prueba ? (['si', 'no', 'neutro'].includes(new URL(request.url).searchParams.get('e')) ? new URL(request.url).searchParams.get('e') : 'neutro') : segmentoDe(c);
    const nombre = esc(primerNombre(c.name));
    const titulo = seg === 'si' ? `Gracias por estar en la clase, ${nombre}` : seg === 'no' ? `${nombre}, aquí tienes la clase completa, por si no pudiste verla` : `Hola ${nombre}, aquí tienes la grabación de la clase`;
    const plat = plataforma();
    const bajada = seg === 'si' ? `Aquí tienes la grabación para que la repases. Si sientes que es tu camino, abajo puedes inscribirte al curso.` : seg === 'no' ? `Aquí te dejamos la grabación completa de la clase de ${NOMBRE[clase]}. Mírala con calma: cuando termines, abajo puedes inscribirte.` : `Mira la clase completa y, si sientes que es tu camino, abajo puedes inscribirte al curso.`;
    if (!prueba) await registrarEvento({ codigo, evento: 'vio_replay', fechaIso: new Date().toISOString(), origen: 'replay' });
    const url = (await configClases()).replay[clase];
    const cierre = cierreOferta(clase), oferta = OFERTAS[clase];
    const f = cierre ? utcAChile(cierre) : null, d = f ? new Date(`${f.fecha}T00:00:00Z`) : null;
    const limite = f ? `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} a las ${f.hora} (hora de Chile)` : '';
    const abierta = !!oferta && (!cierre || Date.now() < cierre);
    const video = /^https:\/\//i.test(url || '')
      ? reproductor(url)
      : '<div class="marco"><div><i>▶</i><b>Aquí irá la clase grabada</b><p class="muted" style="color:#c9d4cc">El video estará disponible muy pronto.</p></div></div>';
    // Captura del aula por dentro: se pone el archivo en public/assets/general/aula-por-dentro.(webp|png|jpg) y aparece sola
    const capturaArchivo = ['webp', 'png', 'jpg'].find((x) => existsSync(join(process.cwd(), 'public', 'assets', 'general', `aula-por-dentro.${x}`)));
    const captura = capturaArchivo ? `<img src="/assets/general/aula-por-dentro.${capturaArchivo}" alt="Así se ve el aula del estudiante de Casa Muladhara" style="width:100%;border-radius:14px;box-shadow:0 18px 40px -20px rgba(31,63,50,.5)">`
      : (process.env.NODE_ENV !== 'production' ? '<div class="marco" style="aspect-ratio:16/9"><div><b>Aquí irá una captura del aula por dentro</b></div></div>' : '');
    const pasosPlat = [['Crea tu cuenta', 'Solo necesitas tu correo y una contraseña. Toma un minuto y no pide tarjeta.'], ['Entra al aula del estudiante', 'Es la plataforma online donde viven las clases de Casa Muladhara.'], [`Mira las 4 clases gratis de ${NOMBRE[clase]}`, 'Velas cuando quieras y las veces que quieras, desde tu celular o tu computador.']];
    const bloquePlat = plat ? `<section class="oferta" id="plataforma" style="justify-items:stretch;text-align:left"><span class="k" style="text-align:center">Gratis · Aula del estudiante</span><h2 style="text-align:center">¿Aún no estás lista? Sigue aprendiendo con 4 clases gratis</h2><p class="muted" style="text-align:center">Entra al aula del estudiante, nuestra plataforma online: ahí están las clases de ${NOMBRE[clase]} para que sigas a tu ritmo, sin costo.</p>${captura}<ol style="list-style:none;margin:6px 0;padding:0;display:grid;gap:10px">${pasosPlat.map(([t, x], i) => `<li style="display:flex;gap:12px;align-items:flex-start"><b style="flex:none;width:30px;height:30px;border-radius:50%;background:#1f3f32;color:#e8c98a;display:grid;place-items:center">${i + 1}</b><span><b>${esc(t)}</b><br><span class="muted">${esc(x)}</span></span></li>`).join('')}</ol><div style="text-align:center"><a class="b" href="${PLATAFORMA_URL}${codigo ? `&l=${encodeURIComponent(codigo)}` : ''}" onclick="window.fbq&&fbq('trackCustom','IrAPlataforma')">Crear mi cuenta gratis</a></div></section>` : '';
    // Prueba social corta antes de la oferta: solo lo real que ya está en las landings de los cursos (sin testimonios inventados)
    const img = (f, alt) => `<img loading="lazy" decoding="async" src="/assets/img/${f}.webp" alt="${alt}">`;
    const social = clase === 'tarot'
      ? `<section class="social"><span class="k">Por dentro del curso</span><h2>Tu mazo, tu aula y tu grupo</h2>
         <div class="mazo"><img loading="lazy" decoding="async" src="/assets/img/mazo-tarot-camino-del-ser.jpg" alt="Mazo Tarot Camino del Ser de Casa Muladhara: caja y lomo, 78 cartas">
         <ul><li><b>Tu mazo Tarot Camino del Ser</b><span>Las 78 cartas, para practicar desde la primera clase.</span></li><li><b>Tu aula virtual</b><span>Las 16 clases grabadas y el material de apoyo.</span></li><li><b>Tu grupo</b><span>Un grupo pequeño, de 20 personas, para que Karen pueda acompañar cada una de tus lecturas.</span></li></ul></div>
         <blockquote>“Hoy el tarot es una de las herramientas que más me ha enseñado sobre mí misma. Por eso no lo enseño para predecir, sino para conocerte y acompañar a otras personas con respeto.”<small>Karen Oyarce · Maestra Holística, creadora del Método Casa Muladhara</small></blockquote></section>`
      : `<section class="social"><span class="k">Ellas ya empezaron</span><h2>Alumnas de Péndulo Hebreo con Karen</h2>
         <div class="fotos">${img('231aa77989', 'Graduación de Péndulo Hebreo Nivel 1')}${img('81f0a09164', 'Karen con una alumna que recibe su certificado de Péndulo Hebreo Nivel 1')}${img('6a5a5d85dd', 'Clase práctica de Péndulo Hebreo')}</div></section>`;
    // Reserva (10.000 CLP el Péndulo, 10 USD el Tarot): botón directo al pago, sin formulario (la persona ya está en el CRM con su código)
    const reserva = clase === 'tarot' ? reservaTarot() : reservaPendulo();
    const RES = {
      pendulo: { precio: '$69.900 CLP · curso completo', linea: 'Hoy reservas tu cupo con $10.000 · el saldo de $59.900 se paga antes del inicio del curso', boton: 'Reservar mi cupo por $10.000', pasarela: 'Mercado Pago', total: '¿Prefieres pagar el total? Paga $69.900' },
      tarot: { precio: '140 USD · curso completo · 2 cuotas de 70 USD', linea: 'Hoy reservas tu cupo con 10 USD. Se descuentan de tu primera cuota: pagas 60 USD antes del inicio del curso y 70 USD el segundo mes.', boton: 'Reservar mi cupo por 10 USD', pasarela: 'tarjeta, con Stripe', total: '¿Prefieres pagar las 2 cuotas de 70 USD? Inscríbete aquí' },
    }[clase];
    const ctaReserva = `<section class="oferta" id="oferta"><span class="k">Inscripciones abiertas</span><h2>Curso de ${NOMBRE[clase]}</h2><div class="precio">${RES.precio}</div><p class="muted" style="font-weight:700;color:#1f3f32">${esc(RES.linea)}</p>
         <div class="cuenta" data-cierre="${cierre}" aria-label="Tiempo para el cierre"><div><b data-u="d">--</b><small>días</small></div><div><b data-u="h">--</b><small>horas</small></div><div><b data-u="m">--</b><small>min</small></div><div><b data-u="s">--</b><small>seg</small></div></div>
         <p class="muted">La inscripción cierra el <b>${esc(limite)}</b>.</p><a class="b" href="/comprar?l=${esc(codigo)}&amp;pago=reserva">${RES.boton}</a>
         <p class="muted" style="font-size:.82rem">La reserva no es reembolsable, pero si no puedes asistir, la usas en el próximo grupo. Pago seguro con ${RES.pasarela}.</p>
         <p class="muted" style="font-size:.85rem"><a class="alt" href="/comprar?l=${esc(codigo)}">${RES.total}</a></p></section>`;
    const cta = abierta && reserva ? ctaReserva : abierta
      ? `<section class="oferta" id="oferta"><span class="k">Inscripciones abiertas</span><h2>Curso de ${NOMBRE[clase]}</h2><div class="precio">${PRECIO[clase]}</div>
         <div class="cuenta" data-cierre="${cierre}" aria-label="Tiempo para el cierre"><div><b data-u="d">--</b><small>días</small></div><div><b data-u="h">--</b><small>horas</small></div><div><b data-u="m">--</b><small>min</small></div><div><b data-u="s">--</b><small>seg</small></div></div>
         <p class="muted">La inscripción cierra el <b>${esc(limite)}</b>.</p><a class="b" href="/comprar?l=${esc(codigo)}">${clase === 'tarot' ? 'Quiero inscribirme' : extras() ? 'Reservar mi cupo por WhatsApp' : 'Quiero inscribirme'}</a></section>`
      : `<section class="oferta"><h2>La inscripción ya cerró</h2><p class="muted">Escríbenos y te avisamos de la próxima fecha.</p><a class="b" href="${WHATSAPP}">Escribir por WhatsApp</a></section>`;
    const faq = [
      ['¿Hasta cuándo puedo inscribirme?', oferta ? `La inscripción cierra el ${limite}.` : 'Escríbenos y te avisamos.'],
      ['¿Cuánto cuesta?', reserva ? (clase === 'tarot' ? 'El curso cuesta 140 USD, en 2 cuotas de 70 USD. Reservas tu cupo con 10 USD con tarjeta, por Stripe: se descuentan de tu primera cuota (60 USD antes del inicio del curso y 70 USD el segundo mes).' : 'El curso cuesta $69.900 CLP. Reservas tu cupo con $10.000 por Mercado Pago y pagas el saldo de $59.900 antes del inicio del curso.') : clase === 'tarot' ? 'Son 2 cuotas mensuales de 70 USD (140 USD en total), con tarjeta.' : (extras() ? 'El curso cuesta $69.900 CLP. Reservas tu cupo con $10.000 por WhatsApp y esa reserva se descuenta: el saldo de $59.900 se paga antes de la primera clase.' : 'El curso cuesta $69.900 CLP.')],
      ...(clase === 'tarot' ? [['¿Cómo se cobran las cuotas?', 'Pagas la primera cuota hoy y la segunda un mes después, con la misma tarjeta. Después de la segunda no se cobra nada más.']] : (extras() ? [['¿Cómo reservo mi cupo?', 'Pulsa «Reservar mi cupo por WhatsApp»: se abre un chat con Karen con el mensaje ya escrito y ella te indica cómo pagar los $10.000.']] : [])),
      ...(reserva ? [['¿Y si después no puedo asistir?', 'La reserva no es reembolsable, pero no la pierdes: la usas en el próximo grupo. Avísanos por WhatsApp antes del inicio.']] : []),
      ['¿Y si no pude ver la clase en vivo?', 'No pasa nada: esta página tiene la clase completa y puedes verla las veces que quieras.'],
      ['¿Tengo dudas antes de inscribirme?', 'Escríbenos por WhatsApp y Karen o su equipo te responde.'],
    ];
    const testis = TESTIMONIOS.length ? `<section class="testis"><h2>Lo que dicen quienes ya estuvieron</h2>${TESTIMONIOS.map((t) => `<blockquote>“${esc(t.texto)}”<br><b>${esc(t.nombre)}</b></blockquote>`).join('')}</section>` : '';
    const pagado = new URL(request.url).searchParams.get('pago') === 'ok';
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Clase grabada · ${NOMBRE[clase]} · Casa Muladhara</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@400;700&display=swap"><style>${CSS}</style></head><body>
${pagado ? '<div class="top" style="background:#2b5443">¡Pago recibido! Gracias por inscribirte. Karen te escribirá con los siguientes pasos.</div>' : ''}${abierta && !pagado ? `<div class="top">Inscripción abierta hasta el <b>${esc(limite)}</b></div>` : ''}
<main><section class="hero"><span class="k">Casa Muladhara · Clase grabada</span><h1>${titulo}</h1><p>${bajada}</p></section>
${video}${social}${cta}${bloquePlat}${testis}<section><h2>Preguntas frecuentes</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>
<footer class="muted">¿Dudas? <a class="alt" href="${WHATSAPP}">Escríbenos por WhatsApp</a></footer></main>
<script>${CUENTA}</script>${pixel('ReplayView', '', { segmento: seg })}</body></html>`;
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  } catch (e) {
    console.error('replay', e);
    return pagina('Error', '<h1>No pudimos abrir el replay</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
