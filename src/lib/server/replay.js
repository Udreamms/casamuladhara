import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
// Landing del replay de una clase (página de venta con video): anota que la persona la vio y ordena la oferta así:
// la clase grabada → «Todo lo que recibes» (la lista de /pendulo o /tarot, pieza por pieza) → el precio → el cierre real (cuenta regresiva)
// y el botón de inscripción → preguntas frecuentes (las de /pendulo o /tarot) → enlace a WhatsApp.
import { OFERTAS, cierreOferta, configClases, contactoPorCodigo, primerNombre, registrarEvento } from '@/lib/server/embudo.js';
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { extras, pagoPorWhatsapp, plataforma, PLATAFORMA_URL, reservaPendulo, reservaTarot } from '@/lib/server/banderas.js';
import { enlaceInvalido, esc, pagina, pixel, reproductor, WHATSAPP } from '@/lib/server/paginas.js';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const NOMBRE = { pendulo: 'Péndulo Hebreo', tarot: 'Tarot Terapéutico' };
const PRECIO = { pendulo: extras() ? '$69.900 CLP · reserva $10.000 + saldo $59.900' : '$69.900 CLP · pago único', tarot: '2 cuotas mensuales de 70 USD' };

// «Todo lo que incluye» y las preguntas frecuentes se leen de la landing del curso (src/paginas/pendulo.html y tarot.html),
// para que el replay diga siempre lo mismo que la página del curso. Si no se pueden leer, esas dos secciones no se muestran.
const sinTags = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const deLanding = {};
function landing(clase) {
  if (deLanding[clase]) return deLanding[clase];
  let incluye = [], faq = [];
  try {
    const h = readFileSync(join(process.cwd(), 'src', 'paginas', `${clase}.html`), 'utf8');
    const i = h.indexOf('<div class="incluye-l">');
    if (i >= 0) incluye = h.slice(i, h.indexOf('</ul>', i)).split('<li>').slice(1).map(sinTags).filter(Boolean);
    const j = h.indexOf('class="faq"');
    if (j >= 0) faq = [...h.slice(j, h.indexOf('</div>', j)).matchAll(/<summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p>/g)].map((m) => [sinTags(m[1]), sinTags(m[2])]);
  } catch (e) { console.error('replay landing', e); }
  return (deLanding[clase] = { incluye, faq });
}
// Testimonios: déjalos vacíos hasta tener los reales (con permiso). Mientras estén vacíos, la sección no se muestra.
const TESTIMONIOS = [];

export const CSS = `*{box-sizing:border-box}body{margin:0;background:#f6f4ec;color:#22302a;font:17px/1.65 Google Sans Flex,system-ui,sans-serif}
.top{background:#1f3f32;color:#ece7d3;text-align:center;padding:10px 16px;font:700 .8rem/1.4 Google Sans Flex,system-ui,sans-serif;letter-spacing:.06em}
.top b{color:#e8c98a}main{width:min(860px,100%);margin:0 auto;padding:28px 20px 60px;display:grid;gap:34px}
.k{font:600 .9rem/1.3 Google Sans Flex,system-ui,sans-serif;color:#2b5443}
h1{margin:6px 0 8px;font:600 clamp(1.8rem,5vw,2.7rem)/1.15 Google Sans Flex,system-ui,sans-serif;letter-spacing:-.01em;color:#1d1d1d}h2{margin:0 0 10px;font:600 1.6rem/1.25 Google Sans Flex,system-ui,sans-serif;color:#1f3f32}p{margin:0}
.hero{text-align:center}.hero p{color:#4b5a52}
.video{aspect-ratio:16/9;width:100%;border:0;border-radius:18px;background:#000;box-shadow:0 22px 44px -22px rgba(31,63,50,.55)}
.marco{aspect-ratio:16/9;border-radius:18px;background:radial-gradient(circle at 50% 40%,#2f5a47,#162f25);display:grid;place-items:center;color:#ece7d3;text-align:center;padding:20px;box-shadow:0 22px 44px -22px rgba(31,63,50,.55)}
.marco i{display:grid;place-items:center;width:84px;height:84px;margin:0 auto 14px;border-radius:50%;background:#e8c98a;color:#1f3f32;font-size:2rem;font-style:normal;padding-left:6px}
.oferta{background:#fffdf6;border:1px solid #d9d5c3;border-radius:22px;padding:30px 24px;text-align:center;display:grid;gap:14px;justify-items:center;box-shadow:0 12px 30px -16px rgba(31,63,50,.3)}
.cuenta{display:flex;gap:10px;justify-content:center}.cuenta div{min-width:70px;background:#1f3f32;color:#ece7d3;border-radius:14px;padding:10px 6px}
.cuenta b{display:block;font:600 1.8rem/1 Google Sans Flex,system-ui,sans-serif}.cuenta small{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#e8c98a}
.precio{font:600 1.5rem/1.2 Google Sans Flex,system-ui,sans-serif;color:#1f3f32}
a.b{display:inline-flex;justify-content:center;align-items:center;padding:18px 34px;border-radius:12px;background:#f2c66d;color:#1d1d1d;font:700 1.02rem/1 Google Sans Flex,system-ui,sans-serif;text-decoration:none;box-shadow:0 10px 24px -12px rgba(0,0,0,.35)}
a.b:hover{background:#eab84f}a.alt{color:#2b5443;font-weight:700}.muted{color:#5d6b63;font-size:.9rem}
details{background:#fffdf6;border:1px solid #d9d5c3;border-radius:14px;padding:14px 18px;margin-bottom:10px}summary{cursor:pointer;font-weight:700;color:#1f3f32}details p{margin-top:8px}
.testis{display:grid;gap:12px}.testis blockquote{margin:0;background:#fffdf6;border-left:4px solid #a77a3b;border-radius:10px;padding:14px 18px}
.social{display:grid;gap:14px;text-align:center}.social h2{margin:0}.social .fotos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.social .fotos img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:14px;display:block}
.social .mazo{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:18px;align-items:center;text-align:left}.social .mazo img{width:100%;height:auto;border-radius:18px;display:block;box-shadow:0 22px 44px -22px rgba(31,63,50,.55)}.social ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}.social li b{display:block;font:600 1.15rem/1.3 Google Sans Flex,system-ui,sans-serif;color:#1f3f32}.social li span{color:#5d6b63;font-size:.92rem;line-height:1.45}
.social blockquote{margin:0;text-align:left;background:#fffdf6;border-left:4px solid #a77a3b;border-radius:10px;padding:14px 18px;font:600 1.05rem/1.55 Google Sans Flex,system-ui,sans-serif;color:#1f3f32}.social blockquote small{display:block;margin-top:8px;font:700 .85rem/1.3 Google Sans Flex,system-ui,sans-serif;color:#5d6b63}
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
    const titulo = seg === 'si' ? `Gracias por estar en la masterclass, ${nombre}` : seg === 'no' ? `${nombre}, aquí tienes la masterclass completa, por si no pudiste verla` : `Hola ${nombre}, aquí tienes la grabación de la masterclass`;
    const plat = plataforma();
    const bajada = seg === 'si' ? `Aquí tienes la grabación para que la repases. Si sientes que es tu camino, abajo puedes inscribirte al curso.` : seg === 'no' ? `Aquí te dejamos la grabación completa de la masterclass de ${NOMBRE[clase]}. Mírala con calma: cuando termines, abajo puedes inscribirte.` : `Mira la masterclass completa y, si sientes que es tu camino, abajo puedes inscribirte al curso.`;
    if (!prueba) await registrarEvento({ codigo, evento: 'vio_replay', fechaIso: new Date().toISOString(), origen: 'replay' });
    const url = (await configClases()).replay[clase];
    const cierre = cierreOferta(clase), oferta = OFERTAS[clase];
    const f = cierre ? utcAChile(cierre) : null, d = f ? new Date(`${f.fecha}T00:00:00Z`) : null;
    const limite = f ? `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} a las ${f.hora} (hora de Chile)` : '';
    const abierta = !!oferta && (!cierre || Date.now() < cierre);
    const video = /^https:\/\//i.test(url || '')
      ? reproductor(url)
      : '<div class="marco"><div><i>▶</i><b>Aquí irá la masterclass grabada</b><p class="muted" style="color:#c9d4cc">El video estará disponible muy pronto.</p></div></div>';
    // Captura del aula por dentro: se pone el archivo en public/assets/general/aula-por-dentro.(webp|png|jpg) y aparece sola
    const capturaArchivo = ['webp', 'png', 'jpg'].find((x) => existsSync(join(process.cwd(), 'public', 'assets', 'general', `aula-por-dentro.${x}`)));
    const captura = capturaArchivo ? `<img src="/assets/general/aula-por-dentro.${capturaArchivo}" alt="Así se ve el aula del estudiante de Casa Muladhara" style="width:100%;border-radius:14px;box-shadow:0 18px 40px -20px rgba(31,63,50,.5)">`
      : (process.env.NODE_ENV !== 'production' ? '<div class="marco" style="aspect-ratio:16/9"><div><b>Aquí irá una captura del aula por dentro</b></div></div>' : '');
    const pasosPlat = [['Crea tu cuenta', 'Solo necesitas tu correo y una contraseña. Toma un minuto y no pide tarjeta.'], ['Entra al aula del estudiante', 'Es la plataforma online donde viven las clases de Casa Muladhara.'], [`Mira las 4 clases gratis de ${NOMBRE[clase]}`, 'Velas cuando quieras y las veces que quieras, desde tu celular o tu computador.']];
    const bloquePlat = plat ? `<section class="oferta" id="plataforma" style="justify-items:stretch;text-align:left"><span class="k" style="text-align:center">Gratis · Aula del estudiante</span><h2 style="text-align:center">¿Aún no estás lista? Sigue aprendiendo con 4 clases gratis</h2><p class="muted" style="text-align:center">Entra al aula del estudiante, nuestra plataforma online: ahí están las clases de ${NOMBRE[clase]} para que sigas a tu ritmo, sin costo.</p>${captura}<ol style="list-style:none;margin:6px 0;padding:0;display:grid;gap:10px">${pasosPlat.map(([t, x], i) => `<li style="display:flex;gap:12px;align-items:flex-start"><b style="flex:none;width:30px;height:30px;border-radius:50%;background:#1f3f32;color:#e8c98a;display:grid;place-items:center">${i + 1}</b><span><b>${esc(t)}</b><br><span class="muted">${esc(x)}</span></span></li>`).join('')}</ol><div style="text-align:center"><a class="b" href="${PLATAFORMA_URL}${codigo ? `&l=${encodeURIComponent(codigo)}` : ''}" onclick="window.fbq&&fbq('trackCustom','IrAPlataforma')">Crear mi cuenta gratis</a></div></section>` : '';
    // Reserva (10.000 CLP el Péndulo, 10 USD el Tarot): botón directo al pago, sin formulario (la persona ya está en el CRM con su código)
    const reserva = clase === 'tarot' ? reservaTarot() : reservaPendulo();
    const porWa = pagoPorWhatsapp(clase); // el pago de la reserva lo coordina Karen por WhatsApp (ver banderas.js)
    const RES = {
      pendulo: { precio: '$70.000 CLP, en 2 cuotas de $35.000', linea: 'Asegura tu cupo con tu primera cuota · la segunda, antes de la práctica presencial', boton: 'Quiero mi cupo', pasarela: 'Mercado Pago', total: '' },
      tarot: { precio: '140 USD, en 4 cuotas de 35 USD', linea: 'Asegura tu cupo con tu primera cuota · las demás, cada 2 semanas', boton: 'Quiero mi cupo', pasarela: 'tarjeta, con Stripe', total: '' },
    }[clase];
    const ctaReserva = `<section class="oferta" id="oferta"><span class="k">Inscripciones abiertas</span><h2>Curso de ${NOMBRE[clase]}</h2><div class="precio">${RES.precio}</div><p class="muted" style="font-weight:700;color:#1f3f32">${esc(RES.linea)}</p>
         <div class="cuenta" data-cierre="${cierre}" aria-label="Tiempo para el cierre"><div><b data-u="d">--</b><small>días</small></div><div><b data-u="h">--</b><small>horas</small></div><div><b data-u="m">--</b><small>min</small></div><div><b data-u="s">--</b><small>seg</small></div></div>
         <p class="muted">La inscripción cierra el <b>${esc(limite)}</b>.</p><a class="b" href="/comprar?l=${esc(codigo)}&amp;pago=reserva">${porWa ? 'Quiero mi cupo por WhatsApp' : RES.boton}</a>
         <p class="muted" style="font-size:.82rem">La primera cuota asegura tu cupo y no es reembolsable, pero si no puedes asistir, la usas en el próximo grupo. ${porWa ? 'Karen te envía por WhatsApp el link para pagar.' : `Pago seguro con ${RES.pasarela}.`}</p>
         ${RES.total ? `<p class="muted" style="font-size:.85rem"><a class="alt" href="/comprar?l=${esc(codigo)}">${RES.total}</a></p>` : ''}</section>`;
    const cta = abierta && reserva ? ctaReserva : abierta
      ? `<section class="oferta" id="oferta"><span class="k">Inscripciones abiertas</span><h2>Curso de ${NOMBRE[clase]}</h2><div class="precio">${PRECIO[clase]}</div>
         <div class="cuenta" data-cierre="${cierre}" aria-label="Tiempo para el cierre"><div><b data-u="d">--</b><small>días</small></div><div><b data-u="h">--</b><small>horas</small></div><div><b data-u="m">--</b><small>min</small></div><div><b data-u="s">--</b><small>seg</small></div></div>
         <p class="muted">La inscripción cierra el <b>${esc(limite)}</b>.</p><a class="b" href="/comprar?l=${esc(codigo)}">${clase === 'tarot' ? 'Quiero inscribirme' : extras() ? 'Reservar mi cupo por WhatsApp' : 'Quiero inscribirme'}</a></section>`
      : `<section class="oferta"><h2>La inscripción ya cerró</h2><p class="muted">Escríbenos y te avisamos de la próxima fecha.</p><a class="b" href="${WHATSAPP}">Escribir por WhatsApp</a></section>`;
    const { incluye, faq: faqCurso } = landing(clase);
    const check = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" style="flex:none;margin-top:3px"><circle cx="10" cy="10" r="10" fill="#e8c98a"/><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#1f3f32" stroke-width="2"/></svg>';
    const recibes = incluye.length ? `<section class="oferta" style="justify-items:stretch;text-align:left"><h2 style="text-align:center">Todo lo que recibes</h2><ul style="list-style:none;margin:0;padding:0;display:grid;gap:12px">${incluye.map((t) => `<li style="display:flex;gap:12px">${check}<span>${esc(t)}</span></li>`).join('')}</ul></section>` : '';
    const faqViejas = [
      ['¿Hasta cuándo puedo inscribirme?', oferta ? `La inscripción cierra el ${limite}.` : 'Escríbenos y te avisamos.'],
      ['¿Cuánto cuesta?', reserva ? (clase === 'tarot' ? 'El curso completo se paga en 4 cuotas de 35 USD (140 USD en total): la primera al inscribirte, para asegurar tu cupo, y las demás cada 2 semanas. Karen te envía por WhatsApp los links de pago.' : 'El curso completo se paga en 2 cuotas de $35.000: la primera al inscribirte, para asegurar tu cupo, y la segunda antes de la práctica presencial. Karen te envía por WhatsApp los links de pago.') : clase === 'tarot' ? 'Son 2 cuotas mensuales de 70 USD (140 USD en total), con tarjeta.' : (extras() ? 'El curso cuesta $69.900 CLP. Reservas tu cupo con $10.000 por WhatsApp y esa reserva se descuenta: el saldo de $59.900 se paga antes de la primera clase.' : 'El curso cuesta $69.900 CLP.')],
      ...(clase === 'tarot' ? [['¿Cómo se cobran las cuotas?', reserva ? 'Karen te envía por WhatsApp el link de cada cuota.' : 'Pagas la primera cuota hoy y la segunda un mes después, con la misma tarjeta. Después de la segunda no se cobra nada más.']] : (extras() ? [['¿Cómo reservo mi cupo?', 'Pulsa «Reservar mi cupo por WhatsApp»: se abre un chat con Karen con el mensaje ya escrito y ella te indica cómo pagar los $10.000.']] : [])),
      ...(reserva ? [['¿Y si después no puedo asistir?', 'La primera cuota no es reembolsable, pero no la pierdes: la usas en el próximo grupo. Avísanos por WhatsApp antes del inicio.']] : []),
      ['¿Y si no pude ver la masterclass en vivo?', 'No pasa nada: esta página tiene la masterclass completa y puedes verla las veces que quieras.'],
      ['¿Tengo dudas antes de inscribirme?', 'Escríbenos por WhatsApp y Karen o su equipo te responde.'],
    ];
    // Preguntas frecuentes: las de la landing del curso (si no se pudieron leer, quedan las de siempre)
    const faq = faqCurso.length ? faqCurso : faqViejas;
    const testis = TESTIMONIOS.length ? `<section class="testis"><h2>Lo que dicen quienes ya estuvieron</h2>${TESTIMONIOS.map((t) => `<blockquote>“${esc(t.texto)}”<br><b>${esc(t.nombre)}</b></blockquote>`).join('')}</section>` : '';
    const pagado = new URL(request.url).searchParams.get('pago') === 'ok';
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Masterclass grabada · ${NOMBRE[clase]} · Casa Muladhara</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&display=swap"><style>${CSS}</style></head><body>
${pagado ? '<div class="top" style="background:#2b5443">¡Pago recibido! Gracias por inscribirte. Karen te escribirá con los siguientes pasos.</div>' : ''}${abierta && !pagado ? `<div class="top">Inscripción abierta hasta el <b>${esc(limite)}</b></div>` : ''}
<main><section class="hero"><span class="k">Casa Muladhara · Masterclass grabada</span><h1>${titulo}</h1><p>${bajada}</p></section>
${video}${recibes}${cta}${bloquePlat}${testis}<section><h2>Preguntas frecuentes</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>
<footer class="muted">¿Dudas? <a class="alt" href="${WHATSAPP}">Escríbele a Karen por WhatsApp</a></footer></main>
<script>${CUENTA}</script>${pixel('ReplayView', '', { segmento: seg })}</body></html>`;
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  } catch (e) {
    console.error('replay', e);
    return pagina('Error', '<h1>No pudimos abrir el replay</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
