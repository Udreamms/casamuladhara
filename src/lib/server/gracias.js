// Página de gracias de las clases gratis (/clase-pendulo/gracias, /clase-tarot/gracias): se abre al inscribirse.
// Saludo con el nombre, video de Karen, tres pasos (agendar, alarma, guardar el WhatsApp), enlace personal para entrar y, en Tarot, las horas por país.
import { chileAUtc, utcAChile } from '@/lib/server/agenda.js';
import { contactoPorCodigo, primerNombre } from '@/lib/server/embudo.js';
import { CSS } from '@/lib/server/replay.js';
import { gracias } from '@/lib/server/banderas.js';
import { enlaceInvalido, esc, pagina, pixel, reproductor, WHATSAPP } from '@/lib/server/paginas.js';
import { db } from '@/lib/server/services.js';

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
    `SUMMARY:Clase gratis de ${NOMBRE[clase]} con Karen`, `DESCRIPTION:Es una clase en vivo. Entra con tu enlace personal: ${origen}/entrar/${codigo}`, `LOCATION:${origen}/entrar/${codigo}`,
    ...alarma(60, 'Tu clase empieza en 1 hora'), ...alarma(15, 'Tu clase empieza en 15 minutos'), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
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
    const cfg = (await db().doc('config/clases').get()).data() || {};
    const url = cfg[clase === 'tarot' ? 'videoGraciasTarot' : 'videoGraciasPendulo'];
    // Sin video cargado se muestra un bloque de espera; al cargar el enlace en /staff → Clases y ofertas lo reemplaza solo
    const video = /^https:\/\/\S+$/i.test(url || '') ? reproductor(url) : '<div class="marco"><div><b>Karen te da la bienvenida · el video estará aquí muy pronto</b></div></div>';
    const ini = chileAUtc(fecha, HORA), fin = ini + DURACION_MIN * 60e3, origen = new URL(request.url).origin;
    const g = new URL('https://calendar.google.com/calendar/render');
    g.search = new URLSearchParams({ action: 'TEMPLATE', text: `Clase gratis de ${NOMBRE[clase]} con Karen`, dates: `${utc(ini)}/${utc(fin)}`, details: `Es una clase en vivo. Entra con tu enlace personal: ${origen}/entrar/${codigo}`, location: `${origen}/entrar/${codigo}` }).toString();
    const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hola, ya me registré para la clase gratuita de ${NOMBRE[clase]} con Karen. Quiero recibir el enlace de la clase para poder ingresar. Mi código: ${codigo}`)}`;
    const paso = (n, t, texto, acciones) => `<div class="paso"><b class="n">${n}</b><div><h3>${t}</h3><p>${texto}</p><div class="acc">${acciones}</div></div></div>`;
    const tabla = clase === 'tarot'
      ? `<section class="oferta" style="justify-items:stretch;text-align:left"><h2 style="text-align:center">¿A qué hora es en tu país?</h2><table style="width:100%;border-collapse:collapse">${HORAS_PAIS.map(([p, h]) => `<tr><td style="padding:6px 0">${p}</td><td style="padding:6px 0;text-align:right;font-weight:700">${h}</td></tr>`).join('')}</table><p class="muted">La clase es a las 19:00 de Chile; estas son las horas para noviembre.</p></section>` : '';
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Tu lugar está reservado · Casa Muladhara</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@400;700&display=swap"><style>${CSS}
.paso>div:last-child{min-width:0}main{grid-template-columns:minmax(0,1fr)}.paso{display:flex;gap:16px;background:#fffdf6;border:1px solid #d9d5c3;border-radius:18px;padding:18px 20px}.paso .n{flex:none;width:38px;height:38px;border-radius:50%;background:#1f3f32;color:#e8c98a;display:grid;place-items:center;font:400 1.2rem/1 Marcellus,Georgia,serif}
.paso h3{margin:0 0 4px;font:400 1.25rem/1.3 Marcellus,Georgia,serif;color:#1f3f32}.acc{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}a.b.s{padding:12px 20px;font-size:.8rem}a.b.wa{background:#25a244;color:#fff;padding:20px 36px;font-size:1rem;width:100%;max-width:420px;box-sizing:border-box}a.b.alt2{background:#e9e4d0;color:#1f3f32;box-shadow:none}</style></head><body>
<div class="top">Tu lugar está reservado · <b>${esc(cuando)}</b></div>
<main><section class="hero"><span class="k">Casa Muladhara · Clase gratis</span><h1>¡Listo, ${esc(primerNombre(c.name))}! Ya tienes tu lugar reservado</h1><p>Te esperamos el <b>${esc(cuando)}</b>. Haz los tres pasos de abajo.</p></section>
${video}
<section style="display:grid;gap:12px"><h2>Haz esto ahora, para no perderte la clase</h2>
${paso(1, 'Agéndala en tu calendario', 'Es una clase en vivo: reserva ese momento solo para ti.', `<a class="b s" href="${esc(g.toString())}" target="_blank" rel="noopener">Google Calendar</a><a class="b s alt2" href="/calendario?l=${esc(codigo)}">iPhone / Outlook (.ics)</a>`)}
${paso(2, 'Pon una alarma', 'Programa una alarma en tu celular para unos minutos antes. El archivo del calendario ya trae avisos 1 hora y 15 minutos antes.', '')}
<div class="paso"><b class="n">3</b><div><h3>Obtén tu enlace de acceso por WhatsApp ♥</h3><p>Escríbenos para recibir directamente el enlace de la clase y tenerlo siempre a mano.</p><div class="acc"><a class="b wa" href="${esc(wa)}" target="_blank" rel="noopener" onclick="window.fbq&&fbq('track','Contact')">Obtener mi link de la reunión</a></div><p class="muted" style="font-size:.85rem;margin-top:8px">Abre WhatsApp con un mensaje preparado para enviar.</p></div></div>
</section>
${tabla}
<section class="oferta"><h2>El día de la clase</h2><p class="muted">Guarda esta página: el botón te lleva directo a la clase.</p><a class="b" href="/entrar/${esc(codigo)}">Entrar a la clase</a></section>
<footer class="muted">¿Dudas? <a class="alt" href="${WHATSAPP}">Escríbenos por WhatsApp</a></footer></main>${pixel('')}</body></html>`;
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  } catch (e) {
    console.error('gracias', e);
    return pagina('Error', '<h1>No pudimos abrir la página</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
