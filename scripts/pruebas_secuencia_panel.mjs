// Prueba del panel «Secuencia automática de la clase» en /staff (public/assets/js/admin.js) con respuestas del servidor inventadas.
import fs from 'node:fs';

const s = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const finBloque = s.indexOf('// Chats de WhatsApp que todavía no tienen tarjeta'); // el botón de las tarjetas de los chats va justo después del panel
const bloque = s.slice(s.indexOf('// Secuencia automática de la clase'), finBloque > 0 ? finBloque : s.indexOf('V.whatsapp = () =>'));
const cfg = { activa: false, soloNumero: '', aprobadas: { clase_link_personal: false, clase_recordatorio_1h: true }, plantillas: [{ nombre: 'clase_link_personal', uso: 'Al registrarse' }, { nombre: 'clase_recordatorio_1h', uso: '1 hora antes' }], conectado: true, cron: false };
const llamadas = [], esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const nodos = {}, $ = (q) => (nodos[q] ||= { innerHTML: '', textContent: '', value: '' });
const handlers = {}, document = { addEventListener: (t, f) => { handlers[t] = f; } };
const auth = { currentUser: { getIdToken: async () => 't' } }, A = {}, toasts = [], toast = (m) => toasts.push(m);
let confirmaciones = [], respuestaEjecutar = { enviados: 1, omitidos: 0, errores: 0, detalle: [{ nombre: 'Dueña', paso: 'link', resultado: 'enviado (plantilla)' }] };
globalThis.confirm = (m) => { confirmaciones.push(m); return true; };
globalThis.fetch = async (u, i) => {
  const b = JSON.parse(i.body); llamadas.push(b);
  if (b.action === 'simular') return { ok: true, json: async () => ({ pendientes: [{ nombre: 'Prueba', paso: 'unaHora' }] }) };
  if (b.action === 'ejecutar') return { ok: true, json: async () => respuestaEjecutar };
  if (b.action === 'guardar') {
    if (typeof b.activa === 'boolean') cfg.activa = b.activa;
    if (b.aprobadas) Object.assign(cfg.aprobadas, b.aprobadas);
    if (typeof b.soloNumero === 'string') {
      const d = b.soloNumero.replace(/\D/g, '');
      if (b.soloNumero.trim() && d.length < 8) return { ok: false, json: async () => ({ error: 'Número de prueba no válido (con código de país, por ejemplo +56 9 1234 5678).' }) };
      cfg.soloNumero = d;
    }
  }
  return { ok: true, json: async () => ({ ...cfg }) };
};
const f = new Function('esc', '$', 'document', 'auth', 'A', 'toast', `${bloque}\nreturn { secHTML, secCargar, secPintar };`)(esc, $, document, auth, A, toast);
const clic = (sec, extra = {}) => handlers.click({ target: { closest: (q) => (q === '[data-sec]' ? { dataset: { sec }, ...extra } : null) } });
let fallas = 0;
const ok = (c, t) => { console.log(`${c ? 'OK   ' : 'FALLA'} ${t}`); if (!c) fallas++; };
const html = () => $('#sec-card').innerHTML;

ok(f.secHTML().includes('Cargando'), 'antes de cargar muestra «Cargando…»');
await f.secCargar();
ok(html().includes('Apagada') && html().includes('Encender') && html().includes('no envía ningún mensaje'), 'apagada: lo dice y ofrece Encender');
ok(html().includes('Plantillas aprobadas por Meta (1 de 2)') && /data-sec-pl="clase_recordatorio_1h" checked/.test(html()), 'lista las plantillas con las aprobadas marcadas');
await clic('encender');
ok(llamadas.at(-1).action === 'guardar' && llamadas.at(-1).activa === true && html().includes('Encendida') && html().includes('Falta CRON_SECRET'), 'Encender pide confirmación, guarda y avisa que falta el cron');
await handlers.change({ target: { closest: (q) => (q === '[data-sec-pl]' ? { dataset: { secPl: 'clase_link_personal' }, checked: true } : null) } });
ok(llamadas.at(-1).aprobadas.clase_link_personal === true && cfg.aprobadas.clase_link_personal === true, 'marcar una plantilla como aprobada la guarda');
await clic('simular');
ok($('#sec-sim').textContent.includes('Saldrían 1') && $('#sec-sim').textContent.includes('recordatorio de 1 h'), '«Ver qué saldría» lista los pendientes sin enviar');
await clic('apagar');
ok(llamadas.at(-1).activa === false && html().includes('Apagada'), 'Apagar la deja apagada');
ok(!html().includes('sec-video'), 'el panel no pide enlace de video');

// ---- Modo prueba
ok(html().includes('Modo prueba') && !html().includes('ACTIVO') && html().includes('id="sec-solo"') && html().includes('data-sec="solo-guardar"') && !html().includes('data-sec="ejecutar"') && !html().includes('solo-quitar'),
  'sin número de prueba: pide el número y todavía no muestra «Enviar ahora» ni «Quitar»');
$('#sec-solo').value = '+1 385 384 7208';
await clic('solo-guardar');
ok(llamadas.at(-1).action === 'guardar' && llamadas.at(-1).soloNumero === '+1 385 384 7208' && cfg.soloNumero === '13853847208', 'guarda el número de prueba');
ok(html().includes('Modo prueba · ACTIVO') && html().includes('value="+13853847208"') && html().includes('data-sec="ejecutar"') && html().includes('Enviar ahora (solo a +13853847208)') && html().includes('data-sec="solo-quitar"'),
  'con número: queda ACTIVO, muestra el número y ofrece «Enviar ahora» y «Quitar modo prueba»');
ok(html().includes('solo le escribe a +13853847208') && toasts.at(-1) === 'Modo prueba guardado.', 'explica que solo le escribe a ese número');
const boton = { disabled: false };
await clic('ejecutar', boton);
ok(llamadas.at(-1).action === 'ejecutar' && confirmaciones.at(-1).includes('+13853847208') && confirmaciones.at(-1).includes('8:00 a 22:00'), '«Enviar ahora» pide confirmación (dice a quién y el horario) y llama a «ejecutar»');
ok($('#sec-ejec').textContent.includes('Enviados: 1') && $('#sec-ejec').textContent.includes('Dueña (enlace al registrarse): enviado (plantilla)') && boton.disabled === false, 'muestra el resultado: cuántos y qué pasó con cada paso, y deja el botón libre');
respuestaEjecutar = { enviados: 0, omitidos: 0, errores: 0, detalle: [] };
await clic('ejecutar', { disabled: false });
ok($('#sec-ejec').textContent.includes('no tiene ningún paso pendiente'), 'si no hay nada que enviar, lo dice');
respuestaEjecutar = { activa: false, enviados: 0, aviso: 'fuera de horario (8:00 a 22:00 hora de Chile)' };
await clic('ejecutar', { disabled: false });
ok($('#sec-ejec').textContent === 'fuera de horario (8:00 a 22:00 hora de Chile)', 'si el servidor avisa algo (horario, WhatsApp sin conectar), lo muestra tal cual');
globalThis.confirm = () => false; const antes = llamadas.length;
await clic('ejecutar', { disabled: false });
ok(llamadas.length === antes, 'si se cancela la confirmación no envía nada'); globalThis.confirm = () => true;
await clic('solo-quitar');
ok(llamadas.at(-1).soloNumero === '' && cfg.soloNumero === '' && !html().includes('ACTIVO') && !html().includes('data-sec="ejecutar"') && toasts.at(-1) === 'Modo prueba quitado.', '«Quitar modo prueba» lo apaga y esconde «Enviar ahora»');
$('#sec-solo').value = '12';
await clic('solo-guardar');
ok(toasts.at(-1).includes('Número de prueba no válido') && cfg.soloNumero === '', 'un número inválido muestra el error del servidor y no activa nada');
console.log(fallas ? `\n${fallas} fallas` : '\nTodo en orden');
