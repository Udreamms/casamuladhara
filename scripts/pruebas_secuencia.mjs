// Prueba de la secuencia de WhatsApp (src/lib/server/secuencia.js y src/app/api/secuencia/route.js) con una base de datos falsa y un WhatsApp falso. No toca nada real.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const R = fileURLToPath(new URL('../src/', import.meta.url));
const quitar = (t) => t.replace(/^import .*$/gm, '').replace(/^export (async )?/gm, '$1');
const agenda = quitar(fs.readFileSync(R + 'lib/server/agenda.js', 'utf8'));
const embudo = quitar(fs.readFileSync(R + 'lib/server/embudo.js', 'utf8'));
const secu = quitar(fs.readFileSync(R + 'lib/server/secuencia.js', 'utf8'));
const ruta = quitar(fs.readFileSync(R + 'app/api/secuencia/route.js', 'utf8'));

// ---- Firestore falso (se toma el de prueba_pago.mjs y se le agrega set con merge)
let falso = fs.readFileSync(new URL('./firestore-falso.fragmento.js', import.meta.url), 'utf8');
falso = falso.replace('async set(d) { tablas.set(r, clon(d)); }', 'async set(d, o) { if (o?.merge && tablas.has(r)) aplicar(tablas.get(r), d); else tablas.set(r, clon(d)); }');
const F = new Function('crypto', `${falso}\nreturn { tablas, db, FieldValue };`)(crypto);
const { tablas, db, FieldValue } = F;
const json = (body, status = 200) => ({ body, status });

// ---- WhatsApp falso
const salida = []; let fallar = false, conectado = true;
const configurado = () => conectado;
const enviarTexto = async (a, texto) => { if (fallar) throw new Error('Meta rechazó'); salida.push({ a, tipo: 'texto', texto }); return `wamid${salida.length}`; };
// La función real de src/lib/server/whatsapp.js arma el cuerpo; el fetch falso lo captura para poder revisarlo
const waReal = quitar(fs.readFileSync(R + 'lib/server/whatsapp.js', 'utf8'));
let cuerpoMeta = null;
const fetchFalso = async (u, i) => { cuerpoMeta = JSON.parse(i.body); return { ok: true, json: async () => ({ messages: [{ id: 'wamidX' }] }) }; };
const REAL = new Function('fetch', 'process', `${waReal}
return { enviarPlantillaCon };`)(fetchFalso, { env: { WHATSAPP_TOKEN: 't', WHATSAPP_PHONE_ID: '123' } });
const enviarPlantillaCon = async (a, p) => { if (fallar) throw new Error('Meta rechazó'); await REAL.enviarPlantillaCon(a, p); salida.push({ a, tipo: 'plantilla', ...p, cuerpo: cuerpoMeta }); return `wamid${salida.length}`; };
const Timestamp = { fromMillis: (m) => m };
let usuario = { admin: true, email: 'karen@example.com', uid: 'k1' };
const auth = () => ({ verifyIdToken: async (t) => { if (t !== 'bueno') throw new Error('mal'); return usuario; } });
const env = { APP_URL: 'https://sitio.cl', CRON_SECRET: 'llave-cron' };

const codigo = `
const AG = (() => { ${agenda}
 return { chileAUtc, utcAChile }; })();
const EM = (() => { const { chileAUtc, utcAChile } = AG; ${embudo}
 return { CODIGO, OFERTAS, RANGO, claseDe, claveClase, configClases, contactoPorCodigo, diaLargo, esClaseGratis, normaliza, primerNombre, waClave }; })();
const { chileAUtc, utcAChile } = AG;
const { CODIGO, OFERTAS, RANGO, claseDe, claveClase, configClases, contactoPorCodigo, diaLargo, esClaseGratis, normaliza, primerNombre, waClave } = EM;
${secu}
${ruta}
return { GET, POST, correrSecuencia, responderEntrante, pasoDebido, leerConfig, guardarConfig, AG };`;
const M = new Function('crypto', 'db', 'FieldValue', 'Timestamp', 'json', 'auth', 'process', 'configurado', 'enviarTexto', 'enviarPlantillaCon', 'Buffer', codigo)(crypto, db, FieldValue, Timestamp, json, auth, { env }, configurado, enviarTexto, enviarPlantillaCon, Buffer);
const { chileAUtc } = M.AG;

let fallas = 0;
const ok = (c, t) => { console.log(`${c ? 'OK   ' : 'FALLA'} ${t}`); if (!c) fallas++; };
const post = (body, tok = 'bueno') => M.POST({ headers: { get: () => `Bearer ${tok}` }, json: async () => body });
const cron = (tok) => M.GET({ headers: { get: () => (tok ? `Bearer ${tok}` : '') } });
const lead = (id) => tablas.get(`leads/${id}`);
const MEET = 'https://meet.google.com/abc-defg-hij';

// ---- Datos inventados: una clase gratis de Péndulo el sábado 2026-11-21 a las 19:00 (Chile), de 1 hora
const S = chileAUtc('2026-11-21', '19:00'), H = 36e5, MIN = 6e4, F1 = S + H;
tablas.set('calendario/e1', { type: 'clase-pendulo', date: '2026-11-21', time: '19:00', duration: 60 });
tablas.set('calendario/e2', { type: 'clase-pendulo', date: '2026-11-21', time: '19:00', tentative: true });
tablas.set('config/clases', { enlacePendulo: MEET, enlaceTarot: MEET, replayPendulo: '' });
const cod = (n) => `Codigo${String(n).padStart(6, '0')}`; // 12 caracteres
const mk = (id, extra = {}) => tablas.set(`leads/${id}`, { form: 'clase-pendulo', clase: 'pendulo', name: `Prueba ${id} Apellido`, email: `${id}@example.com`, whatsapp: `+56 9 7000 00${id.slice(-2)}`, waKey: `5697000${'0'.repeat(2)}${id.slice(-2)}`, codigo: cod(id.replace(/\D/g, '') || 1), status: 'registrada', claseEvento: 'e1', claseFecha: '2026-11-21', createdAt: S - 4 * 864e5, consentimiento: { whatsapp: { aceptado: true } }, eventos: [], ...extra });
const num = (id) => lead(id).waKey;

// ---- 1. Apagada por defecto
mk('a01');
ok((await M.leerConfig()).activa === false, 'viene apagada por defecto');
let r = await M.correrSecuencia({ ahora: S - 23 * H });
ok(r.activa === false && r.enviados === 0 && salida.length === 0, 'apagada: la revisión no envía nada');
r = await M.responderEntrante({ numero: num('a01'), texto: `Mi código: ${lead('a01').codigo}` });
ok(!r.respondio && salida.length === 0, 'apagada: tampoco responde a quien escribe');
r = await post({ action: 'simular' }); // 5 h después de abrir la ventana de 24 h: ya toca el recordatorio del día antes
ok(r.status === 200 && Array.isArray(r.body.pendientes), 'simular responde sin enviar');
r = await M.correrSecuencia({ ahora: S - 23 * H, enviar: false });
ok(r.pendientes.length === 1 && r.pendientes[0].paso === 'diaAntes' && salida.length === 0 && !lead('a01').secuencia, 'simular: muestra lo que saldría aunque esté apagada, sin enviar ni anotar nada');
const sinLlave = await cron(); const llaveMala = await cron('otra'); const llaveBuena = await cron('llave-cron');
ok(sinLlave.status === 401 && llaveMala.status === 401 && llaveBuena.status === 200 && salida.length === 0, 'el cron exige la llave; con la secuencia apagada no envía');
env.CRON_SECRET = ''; ok((await cron('')).status === 401, 'sin CRON_SECRET en Vercel nadie puede disparar la revisión'); env.CRON_SECRET = 'llave-cron';

// ---- 2. Permisos del interruptor
usuario = { admin: false }; ok((await post({ action: 'guardar', activa: true })).status === 403, 'solo la Maestra enciende la secuencia'); usuario = { admin: true, email: 'karen@example.com' };
ok((await post({ action: 'guardar', activa: true }, 'malo')).status === 401, 'sin sesión: 401');
let e = await post({ action: 'estado' });
ok(!('videoUrl' in e.body) && !e.body.plantillas.some((p) => p.nombre === 'clase_recordatorio_dia_antes') && e.body.plantillas.some((p) => p.nombre === 'clase_recordatorio_dia_antes_2'), 'la plantilla vieja ya no existe y el campo del video tampoco');
ok(e.body.activa === false && e.body.plantillas.length === 9 && Object.values(e.body.aprobadas).every((v) => v === false), 'las 9 plantillas empiezan sin aprobar');

// ---- 3. Encendida pero sin plantillas aprobadas: fuera de la ventana de 24 h no se envía nada
e = await post({ action: 'guardar', activa: true });
ok(e.body.activa === true && tablas.get('config/secuenciaWA').por === 'karen@example.com', 'la Maestra enciende la secuencia');
r = await M.correrSecuencia({ ahora: S - 23 * H });
ok(r.enviados === 0 && r.omitidos === 1 && salida.length === 0 && !lead('a01').secuencia, 'sin plantilla aprobada y con la ventana cerrada: no se envía ni se reserva el paso');
conectado = false; r = await M.correrSecuencia({ ahora: S - 23 * H }); ok(r.enviados === 0 && /no está conectado/.test(r.aviso), 'sin WhatsApp conectado no envía'); conectado = true;
r = await M.correrSecuencia({ ahora: chileAUtc('2026-11-20', '23:30') }); ok(r.enviados === 0 && /fuera de horario/.test(r.aviso), 'a las 23:30 de Chile no envía (solo de 8:00 a 22:00)');
r = await M.correrSecuencia({ ahora: chileAUtc('2026-11-20', '07:30') }); ok(r.enviados === 0 && /fuera de horario/.test(r.aviso), 'a las 7:30 tampoco');

// ---- 4. Con la plantilla aprobada: 24 h antes
await post({ action: 'guardar', aprobadas: { clase_recordatorio_dia_antes_2: true } });
r = await M.correrSecuencia({ ahora: S - 23 * H });
ok(r.enviados === 1 && salida.length === 1, 'plantilla aprobada: sale el recordatorio de 24 h');
const s1 = salida[0];
ok(s1.tipo === 'plantilla' && s1.name === 'clase_recordatorio_dia_antes_2' && s1.lang === 'es_CL' && s1.a === num('a01'), 'usa la plantilla correcta, en es_CL, al número de la persona');
ok(s1.vars[0] === 'Prueba' && s1.vars[1] === 'Péndulo Hebreo' && s1.vars.length === 3 && s1.vars[2] === '19:00', 'variables: solo nombre, clase y hora (sin enlace de video)');
ok(!JSON.stringify(salida).includes('meet.google'), 'nunca se envía el Meet directo');
ok(lead('a01').secuencia.c_e1.diaAntes.via === 'plantilla' && lead('a01').waAutoDia === '2026-11-20' && lead('a01').eventos.some((x) => /WhatsApp automático \(diaAntes\)/.test(x.texto)), 'queda anotado en la ficha (historial, día y paso)');
ok(tablas.get(`wa_chats/${num('a01')}`).lastText.startsWith('[Plantilla clase_recordatorio_dia_antes_2]') && [...tablas.keys()].some((k) => k.startsWith(`wa_chats/${num('a01')}/messages/`)), 'el mensaje queda en el chat del portal');
r = await M.correrSecuencia({ ahora: S - 23 * H + 10 * MIN }); ok(r.enviados === 0 && salida.length === 1, 'la revisión siguiente (5 minutos después) no lo repite');
r = await M.correrSecuencia({ ahora: S - 20 * H }); ok(salida.length === 1, 'ni más tarde ese mismo día: máximo 1 por día');

// ---- 5. Dentro de la ventana de 24 h: texto libre (no hace falta plantilla)
mk('b02'); tablas.set(`wa_chats/${num('b02')}`, { lastInboundAt: S - 23.5 * H });
r = await M.correrSecuencia({ ahora: S - 23 * H + 20 * MIN });
const sb = salida.find((x) => x.a === num('b02'));
ok(sb && sb.tipo === 'texto' && sb.texto.includes(`https://sitio.cl/entrar/${lead('b02').codigo}`) && !sb.texto.includes('meet') && !/video/i.test(sb.texto) && (sb.texto.match(/https:/g) || []).length === 1, 'si escribió en las últimas 24 h se le escribe con texto libre y su enlace personal');

// ---- 6. 40 minutos antes; el máximo diario no aplica entre días distintos
await post({ action: 'guardar', aprobadas: { clase_recordatorio_40min: true } });
const antes = salida.length;
r = await M.correrSecuencia({ ahora: S - 45 * MIN });
ok(salida.length === antes, 'a 45 minutos de la clase todavía no sale el recordatorio');
r = await M.correrSecuencia({ ahora: S - 38 * MIN });
const u1 = salida.slice(antes).find((x) => x.name === 'clase_recordatorio_40min');
ok(u1 && u1.vars.join('|') === 'Prueba|Péndulo Hebreo|19:00' && u1.a === num('a01'), '40 minutos antes: plantilla clase_recordatorio_40min (nombre, clase, hora)');
r = await M.correrSecuencia({ ahora: S - 30 * MIN }); ok(salida.slice(antes).filter((x) => x.a === num('a01')).length === 1, 'y solo una vez');
r = await M.correrSecuencia({ ahora: S - 10 * MIN }); ok(salida.length === antes + salida.slice(antes).length, 'a 10 minutos de la clase ya no se envía nada nuevo de la secuencia');

// ---- 7. Enlace personal al registrarse (clase_link_personal) y máximo 1 por día
mk('c03', { createdAt: S - 10 * H - 10 * MIN });
await post({ action: 'guardar', aprobadas: { clase_link_personal: true } });
r = await M.correrSecuencia({ ahora: S - 10 * H });
const lk = salida.find((x) => x.name === 'clase_link_personal');
ok(lk && lk.a === num('c03') && lk.boton === lead('c03').codigo && lk.vars.join('|') === 'Prueba|Péndulo Hebreo|sábado 21 de noviembre|19:00', 'al registrarse: clase_link_personal con nombre, clase, fecha, hora y el código en el botón');
ok(lead('c03').waEnlaceT > 0, 'queda anotado que ya recibió su enlace');
const n0 = salida.length; r = await M.correrSecuencia({ ahora: S - 10 * H + 30 * MIN }); ok(salida.length === n0, 'no repite el enlace');
mk('c04', { createdAt: S - 10 * H - 10 * MIN, waEscribioT: S - 11 * H }); r = await M.correrSecuencia({ ahora: S - 10 * H + 40 * MIN }); ok(!salida.some((x) => x.a === num('c04')), 'a quien ya escribió no se le manda la plantilla del enlace (lo recibe en la respuesta automática)');
mk('c05', { createdAt: S - 10 * H }); r = await M.correrSecuencia({ ahora: S - 10 * H + 1 * MIN }); ok(!salida.some((x) => x.a === num('c05')), 'espera 2 minutos tras el registro');

// ---- 8. A quién NO se le escribe
mk('d10', { noContactar: true }); mk('d11', { consentimiento: { whatsapp: { aceptado: false } } }); mk('d12', { status: 'descartado' }); mk('d13', { consentimiento: undefined }); mk('d14', { tags: ['No contactar'] }); mk('d15', { waAutoDia: '2026-11-21' });
r = await M.correrSecuencia({ ahora: S - 50 * MIN });
ok(['d10', 'd11', 'd12', 'd13', 'd14', 'd15'].every((id) => !salida.some((x) => x.a === num(id))), 'no escribe a quien pidió no contactar, no aceptó WhatsApp, está descartada, no dio consentimiento o ya recibió uno hoy');
mk('d16', { form: 'pendulo', status: 'inscrita' }); r = await M.correrSecuencia({ ahora: S - 50 * MIN }); ok(!salida.some((x) => x.a === num('d16')), 'las matrículas de curso no entran a la secuencia de la clase gratis');
const ev = tablas.get('calendario/e2'); mk('d17', { claseEvento: 'e2' }); r = await M.correrSecuencia({ ahora: S - 50 * MIN }); ok(!salida.some((x) => x.a === num('d17')), 'una clase «tentativa» del Calendario no dispara mensajes');

// ---- 9. Después de la clase: entró → gracias, no entró → replay (con la grabación publicada)
mk('p20', { asistencia: { sesiones: { e1: { entro: S + 5 * MIN } } } }); mk('p21');
const ahoraPost = F1 + 35 * MIN; // 20:35 de Chile
await post({ action: 'guardar', aprobadas: { clase_gracias_asistio: true, clase_replay_no_asistio: true }, pasos: { gracias: true, replay: true } });
let k0 = salida.length; r = await M.correrSecuencia({ ahora: ahoraPost });
ok(!salida.slice(k0).some((x) => x.a === num('p20')), 'sin la grabación publicada no se envía el mensaje de después de la clase');
tablas.set('config/clases', { enlacePendulo: MEET, replayPendulo: 'https://youtu.be/abc' });
k0 = salida.length; r = await M.correrSecuencia({ ahora: ahoraPost });
const g = salida.slice(k0).find((x) => x.a === num('p20')), rp = salida.slice(k0).find((x) => x.a === num('p21'));
ok(g && g.name === 'clase_gracias_asistio' && g.vars[2] === `https://sitio.cl/clase-pendulo/replay?l=${lead('p20').codigo}`, 'a quien entró: clase_gracias_asistio con su enlace personal a la grabación');
ok(rp && rp.name === 'clase_replay_no_asistio' && rp.vars.length === 3, 'a quien no entró: clase_replay_no_asistio');
ok(!salida.slice(k0).some((x) => x.a === num('a01')) , 'quien ya recibió un mensaje ese día (la 1 h antes fue el mismo día) espera al día siguiente');
k0 = salida.length; r = await M.correrSecuencia({ ahora: F1 + 29 * MIN }); ok(salida.length === k0, 'antes de 30 minutos del fin no se envía');
mk('p22', { status: 'matriculada' }); k0 = salida.length; r = await M.correrSecuencia({ ahora: ahoraPost + 5 * MIN }); ok(!salida.slice(k0).some((x) => x.a === num('p22')), 'quien ya compró no recibe el mensaje de la clase');
k0 = salida.length; r = await M.correrSecuencia({ ahora: chileAUtc('2026-11-22', '09:00') }); ok(salida.slice(k0).some((x) => x.a === num('a01') && /^clase_(gracias|replay)/.test(x.name || '')), 'al día siguiente (dentro de las 8:00 a 22:00) salen los pendientes de ayer');

// ---- 10. Error de Meta: se anota y no se reintenta en bucle
mk('e30', { createdAt: S - 4 * 864e5 }); tablas.set(`wa_chats/${num('e30')}`, { lastInboundAt: S - 23.5 * H });
fallar = true; k0 = salida.length; r = await M.correrSecuencia({ ahora: S - 23 * H + 5 * MIN });
ok(r.errores >= 1 && lead('e30').secuencia.c_e1.diaAntes.error === 'Meta rechazó' && lead('e30').eventos.some((x) => /no se pudo enviar/.test(x.texto)), 'si Meta rechaza el envío queda anotado en la ficha');
fallar = false; r = await M.correrSecuencia({ ahora: S - 23 * H + 10 * MIN }); ok(!salida.slice(k0).some((x) => x.a === num('e30')), 'y no se reintenta en cada revisión');

// ---- 11. Respuesta automática al que escribe
let n = salida.length; mk('r40'); mk('r41'); mk('r42', { waKey: '56970009999' });
r = await M.responderEntrante({ numero: '56911112222', texto: `Hola, ya me registré. Mi código: ${lead('r40').codigo}`, ahora: S - 30 * H });
ok(r.respondio && salida[n].a === '56911112222' && salida[n].texto.includes(`https://sitio.cl/entrar/${lead('r40').codigo}`) && salida[n].texto.includes('sábado 21 de noviembre a las 19:00'), 'con «Mi código: XXXX» se identifica por el código (aunque escriba desde otro número) y recibe su enlace');
ok(!salida[n].texto.includes('meet.google') && lead('r40').waEscribioT > 0 && lead('r40').waEnlaceT > 0 && lead('r40').eventos.some((x) => /Escribió por WhatsApp/.test(x.texto)), 'nunca manda el Meet; queda anotado que escribió y recibió el enlace');
n = salida.length; r = await M.responderEntrante({ numero: '56911112222', texto: `Mi código: ${lead('r40').codigo}`, ahora: S - 30 * H + 20e3 });
ok(!r.respondio && salida.length === n, 'el mismo mensaje repetido en menos de 60 s se ignora');
n = salida.length; r = await M.responderEntrante({ numero: lead('r41').waKey, texto: 'Hola', ahora: S - 30 * H });
ok(r.respondio && salida[n].texto.includes(lead('r41').codigo), 'sin código se identifica por su número');
n = salida.length; r = await M.responderEntrante({ numero: lead('r41').waKey, texto: 'muchas gracias', ahora: S - 30 * H + 5 * 60e3 });
ok(!r.respondio && salida.length === n, 'si ya tiene su enlace, un «gracias» no lo repite (lo ve Karen en el chat)');
n = salida.length; r = await M.responderEntrante({ numero: lead('r41').waKey, texto: '¿me mandas el link de nuevo?', ahora: S - 30 * H + 10 * 60e3 });
ok(r.respondio && salida[n].texto.includes(lead('r41').codigo), 'si lo pide, se lo vuelve a enviar');
n = salida.length; r = await M.responderEntrante({ numero: '56988887777', texto: 'Hola quiero info', ahora: S - 30 * H });
ok(r.respondio && /correo/.test(salida[n].texto) && !salida[n].texto.includes('entrar/'), 'si no la reconoce, le pide el correo');
n = salida.length; r = await M.responderEntrante({ numero: '56988887777', texto: 'Hola??', ahora: S - 30 * H + 60 * 60e3 });
ok(!r.respondio && salida.length === n, 'el pedido de correo no se repite en 6 horas');
n = salida.length; r = await M.responderEntrante({ numero: '56988887777', texto: `mi correo es ${lead('r42').email.toUpperCase()}`, ahora: S - 30 * H + 2 * 60 * 60e3 });
ok(r.respondio && salida[n].texto.includes(lead('r42').codigo), 'con su correo se identifica y recibe su enlace');
mk('r43', { noContactar: true }); n = salida.length; r = await M.responderEntrante({ numero: lead('r43').waKey, texto: 'hola', ahora: S - 30 * H });
ok(!r.respondio && salida.length === n, 'quien pidió no contactar no recibe respuesta automática');
n = salida.length; r = await M.responderEntrante({ numero: '56955554444', texto: 'Mi código: AAAAAAAAAAAA', ahora: S - 30 * H });
ok(r.respondio && /correo/.test(salida[n].texto), 'un código que no existe no entrega ningún enlace: pide el correo');
await post({ action: 'guardar', activa: false }); n = salida.length;
r = await M.responderEntrante({ numero: lead('r42').waKey, texto: `Mi código: ${lead('r42').codigo}`, ahora: S - 10 * H }); const c2 = await M.correrSecuencia({ ahora: S - 50 * MIN });
ok(!r.respondio && c2.activa === false && salida.length === n, 'al apagarla vuelve a no enviar nada');


// ---- 12. Botón de enlace: el código va en el botón de los tres pasos que lo tienen, y en ninguno más
const boton = (x) => (x.cuerpo.template.components || []).find((c) => c.type === 'button');
const idDe = (a) => [...tablas.keys()].filter((k) => k.startsWith('leads/')).map((k) => k.slice(6)).find((id) => lead(id).waKey === a);
const por = (nombre) => salida.find((x) => x.name === nombre && x.cuerpo);
for (const nombre of ['clase_link_personal', 'clase_recordatorio_dia_antes_2', 'clase_recordatorio_40min']) {
  const x = por(nombre), b = x && boton(x);
  ok(b && b.sub_type === 'url' && b.index === '0' && b.parameters.length === 1 && b.parameters[0].type === 'text' && b.parameters[0].text === lead(idDe(x.a)).codigo, `${nombre}: el cuerpo lleva el botón url (index 0) con el código personal`);
  ok(x && x.cuerpo.template.components.find((c) => c.type === 'body') && x.cuerpo.template.language.code === 'es_CL', `${nombre}: y además el cuerpo con sus variables, en es_CL`);
}
for (const nombre of ['clase_gracias_asistio', 'clase_replay_no_asistio']) { const x = por(nombre); ok(x && !boton(x) && x.cuerpo.template.components.every((c) => c.type === 'body'), `${nombre}: sin botón (solo el cuerpo)`); }

// ---- 13. Modo prueba: la secuencia solo le escribe al número elegido (aunque esté encendida) y «Enviar ahora» funciona incluso apagada
salida.length = 0;
const NUM_PRUEBA = '13853847208'; // un celular de EE. UU. inventado, como el de la dueña
const hoyAhora = S - 10 * H; // 9:00 de Chile del día de la clase
mk('p01', { whatsapp: '+1 385 384 7208', waKey: NUM_PRUEBA, createdAt: S - 10 * H - 10 * MIN, name: 'Dueña Prueba' });
mk('p02', { createdAt: S - 10 * H - 10 * MIN });
await post({ action: 'guardar', activa: true, aprobadas: { clase_link_personal: true } });
let est = await post({ action: 'guardar', soloNumero: '+1 (385) 384-7208' });
ok(est.status === 200 && est.body.soloNumero === NUM_PRUEBA && tablas.get('config/secuenciaWA').soloNumero === NUM_PRUEBA, 'el número de prueba se guarda solo con dígitos y con código de país');
ok((await post({ action: 'estado' })).body.soloNumero === NUM_PRUEBA, 'el estado del panel trae el número de prueba');
r = await M.correrSecuencia({ ahora: hoyAhora, enviar: false });
ok(r.pendientes.length === 1 && r.pendientes[0].id === 'p01' && r.fueraDePrueba >= 1 && r.soloNumero === NUM_PRUEBA, 'simular en modo prueba: solo aparece la persona de prueba (las demás se cuentan como «fuera de prueba»)');
r = await M.correrSecuencia({ ahora: hoyAhora });
ok(r.enviados === 1 && salida.length === 1 && salida[0].a === NUM_PRUEBA && salida[0].name === 'clase_link_personal', 'encendida con modo prueba: sale el enlace solo al número de prueba');
ok(r.detalle.length === 1 && r.detalle[0].nombre === 'Dueña' && /enviado \(plantilla\)/.test(r.detalle[0].resultado), 'y el detalle dice qué pasó con ese paso');
ok(!lead('p02').secuencia && !lead('p02').waAutoDia && !salida.some((x) => x.a === num('p02')), 'las demás personas no reciben nada ni se les reserva el paso');
const ex = await M.responderEntrante({ numero: num('p02'), texto: `Mi código: ${lead('p02').codigo}`, ahora: hoyAhora });
ok(!ex.respondio && /modo prueba/.test(ex.motivo) && salida.length === 1, 'la respuesta automática tampoco le escribe a otros mientras haya modo prueba');
const ey = await M.responderEntrante({ numero: NUM_PRUEBA, texto: `Mi código: ${lead('p01').codigo}`, ahora: hoyAhora + 5 * MIN });
ok(ey.respondio && salida.length === 2 && salida[1].a === NUM_PRUEBA, 'pero sí al número de prueba');
// «Enviar ahora» con la secuencia APAGADA: envía solo al número de prueba
await post({ action: 'guardar', activa: false });
mk('p03', { whatsapp: '+1 385 384 7208', waKey: NUM_PRUEBA, createdAt: S - 10 * H - 10 * MIN, name: 'Dueña Otra', codigo: cod(903) });
salida.length = 0;
r = await M.correrSecuencia({ ahora: hoyAhora });
ok(r.activa === false && r.enviados === 0 && salida.length === 0, 'apagada: la revisión normal (el cron) no envía nada, ni siquiera a la persona de prueba');
r = await M.correrSecuencia({ ahora: hoyAhora, manual: true });
ok(r.enviados === 1 && salida.length === 1 && salida[0].a === NUM_PRUEBA && !salida.some((x) => x.a === num('p02')), '«Enviar ahora» con la secuencia apagada: envía solo al número de prueba');
r = await M.correrSecuencia({ ahora: chileAUtc('2026-11-21', '23:30'), manual: true });
ok(r.enviados === 0 && /fuera de horario/.test(r.aviso), '«Enviar ahora» respeta el horario de 8:00 a 22:00');
conectado = false; r = await M.correrSecuencia({ ahora: hoyAhora, manual: true }); ok(r.enviados === 0 && /no está conectado/.test(r.aviso), '«Enviar ahora» sin WhatsApp conectado no envía'); conectado = true;
// Variante del número: Argentina con y sin el 9
const antes13 = salida.length;
mk('p04', { whatsapp: '+54 351 613 7941', waKey: '543516137941', createdAt: S - 10 * H - 10 * MIN, codigo: cod(904) });
await post({ action: 'guardar', soloNumero: '+54 9 351 613 7941' });
r = await M.correrSecuencia({ ahora: hoyAhora, manual: true });
ok(r.enviados === 1 && salida.length === antes13 + 1 && salida[salida.length - 1].a === '543516137941', 'el celular de Argentina con 9 en el panel encuentra la ficha guardada sin 9');
// Sin número de prueba, «Enviar ahora» no hace nada
await post({ action: 'guardar', soloNumero: '' });
est = await post({ action: 'estado' });
ok(est.body.soloNumero === '', 'texto vacío quita el modo prueba');
const antes13b = salida.length, sinNumero = await post({ action: 'ejecutar' });
ok(sinNumero.status === 200 && /número de prueba/.test(sinNumero.body.aviso) && salida.length === antes13b, '«Enviar ahora» sin número de prueba no envía y avisa');
const mala = await post({ action: 'guardar', soloNumero: 'abc' });
ok(mala.status === 400 && /Número de prueba no válido/.test(mala.body.error) && tablas.get('config/secuenciaWA').soloNumero === '', 'un número inválido se rechaza y no cambia nada');
usuario = { admin: false }; ok((await post({ action: 'ejecutar' })).status === 403 && (await post({ action: 'guardar', soloNumero: NUM_PRUEBA })).status === 403, 'solo la Maestra usa «Enviar ahora» y el número de prueba'); usuario = { admin: true, email: 'karen@example.com' };
ok((await post({ action: 'ejecutar' }, 'malo')).status === 401, 'sin sesión: 401');
// Con modo prueba y secuencia encendida, la revisión periódica también respeta el número
await post({ action: 'guardar', activa: true, soloNumero: NUM_PRUEBA });
salida.length = 0; mk('p05', { whatsapp: '+1 385 384 7208', waKey: NUM_PRUEBA, createdAt: S - 10 * H - 10 * MIN, codigo: cod(905) });
r = await M.correrSecuencia({ ahora: hoyAhora });
ok(r.enviados >= 1 && salida.every((x) => x.a === NUM_PRUEBA), 'encendida con modo prueba: la revisión periódica solo envía al número de prueba');
await post({ action: 'guardar', soloNumero: '' }); salida.length = 0;
mk('p06', { createdAt: S - 10 * H - 10 * MIN, codigo: cod(906) });
r = await M.correrSecuencia({ ahora: hoyAhora });
ok(r.enviados >= 1 && salida.some((x) => x.a === num('p06')) && r.fueraDePrueba === undefined, 'al quitar el modo prueba vuelve a escribir a todas las que corresponde');

// ---- 15. Secuencia sencilla: bienvenida + recordatorio de un día antes + recordatorio 40 minutos antes; lo de después de la clase queda apagado
const T1 = S - 10 * H;
await post({ action: 'guardar', activa: true, soloNumero: '', aprobadas: { clase_link_personal: true, clase_recordatorio_dia_antes_2: true, clase_recordatorio_40min: true, clase_gracias_asistio: true, clase_replay_no_asistio: true }, pasos: { link: true, diaAntes: true, unaHora: true, gracias: false, replay: false } });
ok((await M.leerConfig()).pasos.link === true, 'los mensajes que salen solos se guardan');
let cfg15 = (await post({ action: 'estado' })).body;
ok(JSON.stringify(cfg15.pasos) === JSON.stringify({ link: true, diaAntes: true, unaHora: true, gracias: false, replay: false }), 'el estado trae qué mensajes salen solos');
ok(cfg15.plantillas.some((p) => p.nombre === 'clase_link_personal_2') && cfg15.plantillas.some((p) => p.nombre === 'clase_recordatorio_40min') && !cfg15.plantillas.some((p) => p.nombre === 'clase_recordatorio_1h'), 'las plantillas nuevas están en la lista y la de 1 hora ya no');
const pasosInicial = new Function('return null;'); void pasosInicial;
tablas.delete('config/secuenciaWA'); ok(JSON.stringify((await M.leerConfig()).pasos) === JSON.stringify({ link: true, diaAntes: true, unaHora: true, gracias: false, replay: false }), 'sin configuración guardada, al encender salen la bienvenida y los dos recordatorios, y no lo de después de la clase');
await post({ action: 'guardar', activa: true, aprobadas: { clase_link_personal: true, clase_recordatorio_dia_antes_2: true, clase_recordatorio_40min: true, clase_gracias_asistio: true, clase_replay_no_asistio: true } });
ok((await post({ action: 'guardar', pasos: { gracias: 'si', otro: true } })).body.pasos.gracias === false, 'un valor que no es verdadero/falso, o un mensaje que no existe, se ignora');
usuario = { admin: false }; ok((await post({ action: 'guardar', pasos: { gracias: true } })).status === 403, 'solo la Maestra elige qué mensajes salen'); usuario = { admin: true, email: 'karen@example.com' };

// Recordatorio a los 40 minutos
const YA_ENLACE = { createdAt: S - 3 * 864e5, waEnlaceT: S - 2 * 864e5 }; // ya recibió su enlace: así solo se prueban los recordatorios
mk('x91', YA_ENLACE); salida.length = 0;
r = await M.correrSecuencia({ ahora: S - 45 * MIN }); ok(!salida.some((x) => x.a === num('x91')), 'a 45 minutos de la clase todavía no sale el recordatorio');
r = await M.correrSecuencia({ ahora: S - 38 * MIN });
const r40 = salida.find((x) => x.a === num('x91'));
ok(r40 && r40.name === 'clase_recordatorio_40min' && r40.vars.join('|') === 'Prueba|Péndulo Hebreo|19:00' && r40.boton === lead('x91').codigo, 'a los 40 minutos antes sale clase_recordatorio_40min con nombre, clase, hora y el código en el botón');
const n15 = salida.length; r = await M.correrSecuencia({ ahora: S - 30 * MIN }); ok(salida.length === n15, 'y solo una vez');
r = await M.correrSecuencia({ ahora: S - 10 * MIN }); ok(salida.length === n15, 'a 10 minutos de la clase ya no sale nada');
// con la ventana abierta, el recordatorio sale como texto libre con la hora de hoy
mk('x92', YA_ENLACE); tablas.set(`wa_chats/${num('x92')}`, { lastInboundAt: S - 2 * H }); salida.length = 0;
r = await M.correrSecuencia({ ahora: S - 38 * MIN });
ok(salida.find((x) => x.a === num('x92'))?.texto === `Hola Prueba 🌿 En unos minutos, hoy a las 19:00, empieza tu clase gratuita de Péndulo Hebreo. Entra con tu enlace personal: https://sitio.cl/entrar/${lead('x92').codigo}`, 'con la ventana abierta el texto dice «en unos minutos, hoy a las 19:00» (no «en una hora»)');

// Casillas: cada mensaje se enciende y se apaga solo
await post({ action: 'guardar', pasos: { unaHora: false } });
mk('x93', YA_ENLACE); salida.length = 0; r = await M.correrSecuencia({ ahora: S - 38 * MIN });
ok(!salida.some((x) => x.a === num('x93')), 'con el recordatorio de 40 minutos apagado no sale');
r = await M.correrSecuencia({ ahora: S - 38 * MIN, enviar: false }); ok(!r.pendientes.some((x) => x.id === 'x93'), 'ni aparece en «Ver qué saldría ahora»');
await post({ action: 'guardar', pasos: { unaHora: true } });
// Lo de después de la clase queda apagado aunque haya grabación y plantillas aprobadas
tablas.set('config/clases', { enlacePendulo: MEET, replayPendulo: 'https://youtu.be/abc' });
mk('x94', { createdAt: S - 3 * 864e5, asistencia: { entro: S + 5 * MIN } }); mk('x95', { createdAt: S - 3 * 864e5 }); salida.length = 0;
r = await M.correrSecuencia({ ahora: S + 60 * MIN + 31 * MIN });
ok(!salida.some((x) => x.a === num('x94') || x.a === num('x95')), 'después de la clase no sale ni el «gracias» ni la grabación mientras estén apagados');
await post({ action: 'guardar', pasos: { gracias: true, replay: true } }); r = await M.correrSecuencia({ ahora: S + 60 * MIN + 31 * MIN });
ok(salida.some((x) => x.a === num('x94') && x.name === 'clase_gracias_asistio') && salida.some((x) => x.a === num('x95') && x.name === 'clase_replay_no_asistio'), 'si la Maestra los enciende, salen');
await post({ action: 'guardar', pasos: { gracias: false, replay: false } });

// Bienvenida: la plantilla nueva (con el aviso de recordatorios) se usa cuando está aprobada
mk('x96', { createdAt: T1 - 10 * MIN }); salida.length = 0; r = await M.correrSecuencia({ ahora: T1 });
ok(salida.find((x) => x.a === num('x96'))?.name === 'clase_link_personal', 'la bienvenida por plantilla usa clase_link_personal mientras la nueva no esté aprobada');
await post({ action: 'guardar', aprobadas: { clase_link_personal_2: true } });
mk('x97', { createdAt: T1 - 10 * MIN }); r = await M.correrSecuencia({ ahora: T1 + 60 * MIN });
const l2 = salida.find((x) => x.a === num('x97'));
ok(l2 && l2.name === 'clase_link_personal_2' && l2.vars.join('|') === 'Prueba|Péndulo Hebreo|sábado 21 de noviembre|19:00' && l2.boton === lead('x97').codigo, 'cuando clase_link_personal_2 está aprobada se usa esa, con las mismas variables y el código en el botón');
// Texto de bienvenida (quien escribe con su código) y casilla de la bienvenida
tablas.set('calendario/e9', { type: 'clase-tarot', date: '2026-11-21', time: '19:00', duration: 60 });
mk('x98', { name: 'María Soledad', form: 'clase-tarot', clase: 'tarot', claseEvento: 'e9', claseFecha: '2026-11-21' }); salida.length = 0;
let rb = await M.responderEntrante({ numero: num('x98'), texto: `Mi código: ${lead('x98').codigo}`, ahora: S - 5 * H });
ok(rb.respondio && salida[0].texto === `¡Hola, María! 🌙 Qué alegría que te hayas registrado. Este es tu link personal para la clase gratis de Tarot Terapéutico, donde vas a aprender a usar las cartas para conocerte y acompañar a otras personas:\n👉 https://sitio.cl/entrar/${lead('x98').codigo}\nNos vemos el sábado 21 de noviembre a las 19:00 (hora de Chile) ✨\n\nSolo para que sepas: te enviaré unos recordatorios por aquí antes de la clase.`, 'a quien escribe con su código se le responde con la bienvenida acordada (Tarot), el enlace en su línea y el aviso de que habrá recordatorios');
mk('x99', { name: 'Luz Pérez' }); salida.length = 0; rb = await M.responderEntrante({ numero: num('x99'), texto: `Mi código: ${lead('x99').codigo}`, ahora: S - 5 * H });
ok(salida[0].texto === `¡Hola, Luz! 🌙 Qué alegría que te hayas registrado. Este es tu link personal para la clase gratis de Péndulo Hebreo:\n👉 https://sitio.cl/entrar/${lead('x99').codigo}\nNos vemos el sábado 21 de noviembre a las 19:00 (hora de Chile) ✨\n\nSolo para que sepas: te enviaré unos recordatorios por aquí antes de la clase.`, 'Péndulo: la misma bienvenida sin «las cartas»');
await post({ action: 'guardar', pasos: { link: false } }); mk('y01'); salida.length = 0; const nB = salida.length;
rb = await M.responderEntrante({ numero: num('y01'), texto: `Mi código: ${lead('y01').codigo}`, ahora: S - 5 * H });
ok(!rb.respondio && /bienvenida está apagada/.test(rb.motivo) && salida.length === nB, 'con la casilla de la bienvenida apagada tampoco se responde con el enlace');
mk('y02', { createdAt: T1 - 10 * MIN }); r = await M.correrSecuencia({ ahora: T1 }); ok(!salida.some((x) => x.a === num('y02')), 'ni sale la bienvenida por plantilla');
await post({ action: 'guardar', pasos: { link: true } });

console.log(fallas ? `\n${fallas} fallas` : '\nTodo en orden');
