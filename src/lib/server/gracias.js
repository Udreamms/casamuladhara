// Página de gracias de las clases gratis (/clase-pendulo/gracias, /clase-tarot/gracias): se abre al inscribirse.
// Tres pasos para no perderse la clase (agendar, alarma, pedir el enlace por WhatsApp), video de Karen (o su foto con un mensaje mientras no exista),
// en Tarot las horas por país y, al final, «Mientras esperas la clase»: el próximo curso (fecha del Calendario) y el descuento en la Formación.
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { contactoPorCodigo } from '@/lib/server/embudo.js';
import { CSS } from '@/lib/server/replay.js';
import { gracias } from '@/lib/server/banderas.js';
import { enlaceInvalido, esc, pagina, pixel, WHATSAPP } from '@/lib/server/paginas.js';
import { db } from '@/lib/server/services.js';
import { publico } from '@/lib/server/horarios.js';

const NOMBRE = { pendulo: 'Péndulo Hebreo', tarot: 'Tarot Terapéutico' };
const DIA_SEMANA = { pendulo: 6, tarot: 2 }; // sábado y martes, 19:00 hora de Chile
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const HORA = '19:00', DURACION_MIN = 30;
const HORAS_PAIS = [['Chile', '19:00'], ['Argentina, Uruguay y Paraguay', '19:00'], ['Colombia, Perú y Ecuador', '17:00'], ['México', '16:00']];

// Fecha de su clase: la que eligió al inscribirse (si aún no pasó); si no, la próxima del día de la semana de esa clase
function fechaDeClase(clase, elegida) {
  const ahora = Date.now(), hoy = utcAChile(ahora).fecha;
  if (/^\d{4}-\d{2}-\d{2}$/.test(elegida || '') && chileAUtc(elegida, HORA) + DURACION_MIN * 60e3 > ahora) return elegida;
  const d = new Date(`${hoy}T00:00:00Z`);
  for (let i = 0; i < 8; i++) {
    const f = d.toISOString().slice(0, 10);
    if (d.getUTCDay() === DIA_SEMANA[clase] && chileAUtc(f, HORA) + DURACION_MIN * 60e3 > ahora) return f;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return hoy;
}

// Persona + su clase, o null si el código no sirve. PREVIEWLOCAL (solo en el computador local) permite ver la página sin datos reales.
export async function claseDePersona(codigo) {
  if (!gracias()) return null; // apagada (ver banderas.js)
  const prueba = process.env.NODE_ENV !== 'production' && ['PREVIEWLOCAL', 'PREVIEWPENDU'].includes(codigo);
  const c = prueba ? { name: 'María Prueba', clase: codigo === 'PREVIEWPENDU' ? 'pendulo' : 'tarot', codigo } : await contactoPorCodigo(codigo);
  if (!c) return null;
  const clase = c.clase === 'tarot' ? 'tarot' : 'pendulo';
  return { c, clase, codigo, fecha: fechaDeClase(clase, c.claseFecha) };
}

const utc = (ts) => new Date(ts).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
export function ics({ clase, codigo, fecha }, origen) {
  const ini = chileAUtc(fecha, HORA), fin = ini + DURACION_MIN * 60e3;
  const alarma = (min, txt) => ['BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${txt}`, `TRIGGER:-PT${min}M`, 'END:VALARM'];
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Casa Muladhara//Clase gratis//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:clase-${clase}-${fecha}-${codigo}@casamuladhara.com`, `DTSTAMP:${utc(Date.now())}`, `DTSTART:${utc(ini)}`, `DTEND:${utc(fin)}`,
    `SUMMARY:Masterclass gratis de ${NOMBRE[clase]} con Karen`, `DESCRIPTION:Es una masterclass en vivo. Entra con tu enlace personal: ${origen}/entrar/${codigo}`, `LOCATION:${origen}/entrar/${codigo}`,
    ...alarma(60, 'Tu masterclass empieza en 1 hora'), ...alarma(15, 'Tu masterclass empieza en 15 minutos'), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}

export async function paginaGracias(request, clase) {
  if (!gracias()) return enlaceInvalido(); // apagada (ver banderas.js)
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const d = await claseDePersona(codigo);
    if (!d) return enlaceInvalido();
    if (d.clase !== clase) return Response.redirect(new URL(`/clase-${d.clase}/gracias?l=${codigo}`, request.url), 302);
    const { c, fecha } = d, f = new Date(`${fecha}T00:00:00Z`);
    const cuando = `${DIAS[f.getUTCDay()]} ${f.getUTCDate()} de ${MESES[f.getUTCMonth()]} a las ${HORA} (hora de Chile)`;
    const diaFecha = `${DIAS[f.getUTCDay()]} ${f.getUTCDate()} de ${MESES[f.getUTCMonth()]}`;
    const cfg = (await db().doc('config/clases').get()).data() || {};
    const url = cfg[clase === 'tarot' ? 'videoGraciasTarot' : 'videoGraciasPendulo'];
    // Sin video cargado se muestra un bloque de espera; al cargar el enlace en /staff → Clases y ofertas lo reemplaza solo
    // Video de Karen (60 s, con subtítulos grabados), se carga en /staff → Clases y ofertas: portada con su foto y parte solo al apretar play (video-karen.js).
    // Mientras no exista: su foto con un mensaje.
    const foto = clase === 'tarot' ? '/assets/img/karen-retrato-2.webp' : '/assets/img/e2ec26d75a.webp';
    const video = /^https:\/\/\S+$/i.test(url || '')
      ? `<div class="vk" data-video="${esc(url)}"><img src="${foto}" alt="Karen Oyarce Sáez, Maestra Holística"></div>`
      : `<div class="karen-msj"><img src="${foto}" alt="Karen Oyarce Sáez, Maestra Holística"><p>“Te espero el ${esc(diaFecha)} a las ${HORA}. En la masterclass te muestro, paso a paso, por dónde empezar. Llega unos minutos antes y ten a mano papel y lápiz.”<b>Karen</b></p></div>`;
    // Mientras esperas la clase: el próximo curso con su fecha del Calendario (si no hay fecha, se oculta solo la fecha)
    let prox = '';
    try {
      const h = publico((await db().collection('calendario').get()).docs.map((x) => x.data()));
      const fc = clase === 'tarot' ? h.tarot?.fecha : h.pendulo?.sesiones?.[0]?.fecha;
      if (/^\d{4}-\d{2}-\d{2}$/.test(fc || '')) { const g = new Date(`${fc}T00:00:00Z`); prox = `Empieza el ${DIAS[g.getUTCDay()]} ${g.getUTCDate()} de ${MESES[g.getUTCMonth()]}`; }
    } catch (e) { console.error('gracias horarios', e); }
    const curso = clase === 'tarot'
      ? 'Si después quieres aprender de verdad, el curso de Tarot Terapéutico son 16 clases en vivo en 8 semanas.'
      : 'Si después quieres aprender a usarlo de verdad, el próximo curso Péndulo Hebreo Nivel 1 es en Santiago y online.';
    const espera = `<section class="espera"><h3>Mientras esperas la masterclass</h3><p>${curso} ${prox ? `<b>${esc(prox)}</b> · ` : ''}<a class="alt" href="/${clase}">Ver el curso</a></p>
<p class="muted" style="font-size:.85rem;margin-top:10px">Y si un día sientes el llamado de acompañar a otras personas, lo que pagues en el curso se descuenta de la Formación de Terapeuta Holística Integral.</p></section>`;
    const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hola, ya me registré para la clase gratuita de ${NOMBRE[clase]} con Karen. Quiero recibir el enlace de la clase para poder ingresar. Mi código: ${codigo}`)}`;
    const paso = (n, t, texto, acciones) => `<div class="paso"><b class="n">${n}</b><div><h3>${t}</h3><p>${texto}</p><div class="acc">${acciones}</div></div></div>`;
    const tabla = clase === 'tarot'
      ? `<section class="oferta" style="justify-items:stretch;text-align:left"><h2 style="text-align:center">¿A qué hora es en tu país?</h2><table style="width:100%;border-collapse:collapse">${HORAS_PAIS.map(([p, h]) => `<tr><td style="padding:6px 0">${p}</td><td style="padding:6px 0;text-align:right;font-weight:700">${h}</td></tr>`).join('')}</table><p class="muted">La masterclass es a las 19:00 de Chile; estas son las horas para noviembre.</p></section>` : '';
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Tu lugar está casi listo · Casa Muladhara</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@400;700&display=swap"><style>${CSS}
.paso>div:last-child{min-width:0}.karen-msj{display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr);gap:22px;align-items:center;background:#fffdf6;border:1px solid #d9d5c3;border-radius:22px;padding:22px}.karen-msj img{width:100%;aspect-ratio:4/5;object-fit:cover;object-position:50% 20%;border-radius:16px;display:block}.karen-msj p{font:400 1.2rem/1.5 Marcellus,Georgia,serif;color:#1f3f32}.karen-msj b{display:block;margin-top:10px;font:700 .95rem/1 Mulish,sans-serif;color:#a77a3b}@media (max-width:600px){.karen-msj{grid-template-columns:1fr}.karen-msj img{max-width:260px;margin:0 auto}}.espera{background:#fffdf6;border:1px solid #d9d5c3;border-radius:18px;padding:22px 24px}.espera h3{margin:0 0 8px;font:400 1.35rem/1.3 Marcellus,Georgia,serif;color:#1f3f32}main{grid-template-columns:minmax(0,1fr)}.paso{display:flex;gap:16px;background:#fffdf6;border:1px solid #d9d5c3;border-radius:18px;padding:18px 20px}.paso .n{flex:none;width:38px;height:38px;border-radius:50%;background:#1f3f32;color:#e8c98a;display:grid;place-items:center;font:400 1.2rem/1 Marcellus,Georgia,serif}
.paso h3{margin:0 0 4px;font:400 1.25rem/1.3 Marcellus,Georgia,serif;color:#1f3f32}.acc{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}a.b.s{padding:12px 20px;font-size:.8rem}a.b.wa{background:#25a244;color:#fff;padding:20px 36px;font-size:1rem;width:100%;max-width:420px;box-sizing:border-box}a.b.alt2{background:#e9e4d0;color:#1f3f32;box-shadow:none}</style></head><body>
<div class="top">Tu masterclass · <b>${esc(cuando)}</b></div>
<main><section class="hero"><span class="k">Casa Muladhara · Masterclass gratis</span><h1>¡Tu lugar está casi listo!</h1><p>Haz estos 3 pasos para no perderte la masterclass:</p></section>
<section style="display:grid;gap:12px">
${paso(1, 'Agéndala en tu calendario', `Reserva este momento: ${esc(diaFecha)}, ${HORA} (hora de Chile).`, '')}
${paso(2, 'Pon una alarma', 'Programa una alarma en tu celular para unos minutos antes.', '')}
<div class="paso"><b class="n">3</b><div><h3>Recibe el link de la masterclass por WhatsApp ♥</h3><p>Escríbenos para recibir directamente el enlace de la masterclass y tenerlo siempre a mano.</p><div class="acc"><a class="b wa" href="${esc(wa)}" target="_blank" rel="noopener" onclick="window.fbq&&fbq('track','Contact')">Recibe el link de la masterclass por WhatsApp</a></div><p class="muted" style="font-size:.85rem;margin-top:8px">Abre WhatsApp con un mensaje preparado para enviar.</p></div></div>
</section>
${video}
${tabla}
<p class="muted" style="text-align:center;font-size:.85rem">El día de la masterclass te enviamos tu enlace por WhatsApp. ¿Aún no lo pediste? <a class="alt" href="${esc(wa)}" target="_blank" rel="noopener" onclick="window.fbq&&fbq('track','Contact')">Pídelo aquí</a></p>
${espera}
<footer class="muted">¿Dudas? <a class="alt" href="${WHATSAPP}">Escríbenos por WhatsApp</a></footer></main>${pixel('')}<script src="/assets/js/landing/video-karen.js" defer></script></body></html>`;
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  } catch (e) {
    console.error('gracias', e);
    return pagina('Error', '<h1>No pudimos abrir la página</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
