// Prueba: el botón «Enviar plantilla» de la TARJETA tiene el mismo selector de plantillas aprobadas que la pestaña WhatsApp (public/assets/js/admin.js).
// Datos inventados; Meta y la base de datos son falsos.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
let ok = 0;
const prueba = async (nombre, fn) => { await fn(); ok++; console.log('OK  ', nombre); };

// ---- el selector y la carga de la lista
const bloque = src.slice(src.indexOf('const waPlantillasHTML'), src.indexOf('// Secuencia automática de la clase'));
const PLANT = [
  { name: 'clase_link_personal', lang: 'es_CL', vars: 4, usable: false, texto: 'con botón' },
  { name: 'clase_gratis_tarot_2', lang: 'es_CL', vars: 1, usable: true, texto: 'Hola {{1}} <b>' },
  { name: 'bienvenida_general_2', lang: 'es_CL', vars: 1, usable: true, texto: 'Bienvenida' },
];
const montar = (api) => {
  const A = { wa: {} }, S = { view: 'interesadas' }, llamadas = [], repintes = [];
  const waApi = async (b) => { llamadas.push(b.action); return api(b); };
  const f = new Function('A', 'S', 'esc', 'waApi', 'waRepaint', `${bloque}\nreturn { waPlantillasHTML, waCargarPlantillas };`)(A, S, esc, waApi, () => repintes.push('repinta'));
  return { A, S, llamadas, repintes, ...f };
};

await prueba('el selector lista solo las plantillas que se pueden enviar con una variable y usa el id que se le pida', async () => {
  const m = montar(async () => ({ plantillas: PLANT }));
  assert.equal(m.waPlantillasHTML(), ''); // antes de cargar no hay nada
  await m.waCargarPlantillas();
  const h = m.waPlantillasHTML('wf-pl');
  assert.match(h, /^<select id="wf-pl" aria-label="Plantilla">/);
  assert.ok(h.includes('clase_gratis_tarot_2 (es_CL)') && h.includes('bienvenida_general_2 (es_CL)') && !h.includes('clase_link_personal'));
  assert.ok(h.includes('title="Hola {{1}} &lt;b>"'), 'el texto de la plantilla sale escapado');
  assert.match(m.waPlantillasHTML(), /^<select id="wa-pl"/); // el de la pestaña WhatsApp sigue igual
});
await prueba('la lista se pide una sola vez aunque la pidan la pestaña WhatsApp y la tarjeta a la vez; quien llega después espera a que termine', async () => {
  let liberar; const espera = new Promise((r) => { liberar = r; });
  const m = montar(async () => { await espera; return { plantillas: PLANT }; });
  const a = m.waCargarPlantillas(), b = m.waCargarPlantillas(); // la segunda llega mientras la primera sigue cargando
  liberar(); await Promise.all([a, b]);
  assert.deepEqual(m.llamadas, ['plantillas']);
  assert.ok(m.waPlantillasHTML('wf-pl').includes('clase_gratis_tarot_2'));
  await m.waCargarPlantillas(); assert.deepEqual(m.llamadas, ['plantillas']); // ya cargada: no vuelve a pedirla
});
await prueba('si falla la carga de la lista no se rompe: queda sin selector y se usa la plantilla de siempre', async () => {
  const m = montar(async () => { throw new Error('sin conexión'); });
  await m.waCargarPlantillas();
  assert.equal(m.waPlantillasHTML('wf-pl'), ''); assert.equal(m.A.wa.plantillas, null);
});
await prueba('solo repinta la pestaña WhatsApp cuando se está viendo', async () => {
  const m = montar(async () => ({ plantillas: PLANT })); m.S.view = 'whatsapp';
  await m.waCargarPlantillas(); assert.deepEqual(m.repintes, ['repinta']);
  const o = montar(async () => ({ plantillas: PLANT })); await o.waCargarPlantillas(); assert.deepEqual(o.repintes, []);
});

// ---- el botón de la tarjeta
const iBoton = src.indexOf("    if (pl) {\n      waCargarPlantillas().then("), fBoton = src.indexOf("\n    }\n", iBoton) + 7;
assert.ok(iBoton > 0 && fBoton > iBoton, 'no se encontró el botón de la tarjeta');
const botonTarjeta = src.slice(iBoton, fBoton);
const probarBoton = async ({ plantillas, valor }) => {
  const enviados = [], toasts = [], errores = [], nodos = { '#wf-pl-wrap': { innerHTML: '' }, '#wf-pl': valor === undefined ? null : { value: valor } };
  const pl = { disabled: false }, A = { wa: { plantillas } };
  const waApi = async (b) => { enviados.push(b); };
  const waCargarPlantillas = async () => {}, waPlantillasHTML = (id) => `<select id="${id}">`;
  const f = new Function('pl', '$', 'A', 'waApi', 'waCargarPlantillas', 'waPlantillasHTML', 'n', 'p', 'toast', 'fail', `${botonTarjeta}\nreturn pl;`);
  const r = f(pl, (q) => nodos[q], A, waApi, waCargarPlantillas, waPlantillasHTML, '5492477352538', { nombre: 'María Soledad Fernández' }, (m) => toasts.push(m), (e) => errores.push(e));
  await new Promise((x) => setTimeout(x, 0)); // deja que corra el .then de la carga
  await r.onclick();
  return { enviados, toasts, errores, pl, nodos };
};
await prueba('en la tarjeta: envía la plantilla elegida con su nombre, idioma y variables, al chat de la persona', async () => {
  const r = await probarBoton({ plantillas: PLANT, valor: '1' }); // índice dentro de las que se pueden enviar: 0 = clase_gratis_tarot_2, 1 = bienvenida_general_2
  assert.deepEqual(r.enviados, [{ action: 'plantilla', to: '5492477352538', name: 'María Soledad Fernández', plantilla: { name: 'bienvenida_general_2', lang: 'es_CL', vars: 1 } }]);
  assert.match(r.toasts[0], /Plantilla enviada/); assert.equal(r.nodos['#wf-pl-wrap'].innerHTML, '<select id="wf-pl">');
  const r0 = await probarBoton({ plantillas: PLANT, valor: '0' });
  assert.equal(r0.enviados[0].plantilla.name, 'clase_gratis_tarot_2');
});
await prueba('en la tarjeta: sin lista de plantillas envía como siempre (la del servidor); si Meta falla, avisa y deja reintentar', async () => {
  const sin = await probarBoton({ plantillas: null, valor: undefined });
  assert.deepEqual(sin.enviados, [{ action: 'plantilla', to: '5492477352538', name: 'María Soledad Fernández' }]);
  const pl = { disabled: false }, errores = [];
  const f = new Function('pl', '$', 'A', 'waApi', 'waCargarPlantillas', 'waPlantillasHTML', 'n', 'p', 'toast', 'fail', `${botonTarjeta}\nreturn pl;`);
  const r = f(pl, () => null, { wa: { plantillas: null } }, async () => { throw new Error('Meta dijo no'); }, async () => {}, () => '', '5491', { nombre: 'Ana' }, () => {}, (e) => errores.push(e.message));
  await r.onclick();
  assert.deepEqual(errores, ['Meta dijo no']); assert.equal(pl.disabled, false);
});
await prueba('las dos versiones de la tarjeta tienen el selector junto al botón y usan este mismo código', () => {
  assert.equal((src.match(/<span id="wf-pl-wrap">\$\{waPlantillasHTML\('wf-pl'\)\}<\/span><button type="button" class="btn btn-primary btn-sm" id="wf-plantilla">Enviar plantilla<\/button>/g) || []).length, 2);
  assert.equal((src.match(/waCargarPlantillas\(\)\.then\(\(\) => \{ const w = \$\('#wf-pl-wrap'\)/g) || []).length, 2);
  assert.ok(!src.includes("try { await waApi({ action: 'plantilla', to: n, name: p.nombre }); toast("), 'ya no queda el envío sin plantilla elegida');
});
console.log(`\n${ok} pruebas OK`);
