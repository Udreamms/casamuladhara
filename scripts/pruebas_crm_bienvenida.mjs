// Prueba de la etiqueta «Bienvenida» del CRM (public/assets/js/admin.js). Datos inventados; la base de datos y WhatsApp son falsos.
// Toma del archivo los ayudantes de la bienvenida y la respuesta rápida, y los ejecuta con piezas falsas.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const corte = (desde, hasta) => { const i = src.indexOf(desde), j = src.indexOf(hasta, i); assert.ok(i >= 0 && j > i, `no se encontró el bloque ${desde}`); return src.slice(i, j); };

// ---- ayudantes de la bienvenida
const finBloque = "márcala a mano en la ficha.'); }\n}\n";
const bloque = corte('const TAG_BIENVENIDA', finBloque) + finBloque;
const llamadas = [], toasts = [], marcas = { repintar: 0 };
let fallaApi = false;
const tracksEn = (p, prog) => p.leads.filter((l) => prog[2].includes(l.form));
const A = { _per: 'cache' };
const data = { leads: async (cuerpo) => { if (fallaApi) throw new Error('sin conexión'); llamadas.push(cuerpo); } };
const documento = { querySelectorAll: () => [{ dataset: { bv: 'L1' }, set checked(v) { marcas.checked = v; } }] };
const { tieneBv, bienvenidaEn, bienvenidaBadge, marcarBienvenida, bienvenidaTrasEnviar, setPend } = new Function('tracksEn', 'A', 'data', 'paintNav', 'render', 'toast', 'document',
  `${bloque}\nreturn { tieneBv, bienvenidaEn, bienvenidaBadge, marcarBienvenida, bienvenidaTrasEnviar, setPend: (v) => { bvPend = v; } };`)(tracksEn, A, data, () => marcas.repintar++, () => {}, (m) => toasts.push(m), documento);

let ok = 0;
const prueba = async (nombre, fn) => { await fn(); ok++; console.log('OK  ', nombre); };
const PROG_TAROT = ['clase-tarot', 'Clase gratis Tarot', ['clase-tarot']], PROG_PEND = ['clase-pendulo', 'Clase gratis Péndulo', ['clase-pendulo']];
const persona = () => ({ id: 'P1', leads: [{ id: 'L1', form: 'clase-tarot', tags: ['Bienvenida'] }, { id: 'L2', form: 'clase-pendulo', tags: [] }, { id: 'L3', form: 'formacion' }] });

await prueba('la bienvenida es por producto: Tarot sí, Péndulo no, y «Todos» ve si alguna', () => {
  const p = persona();
  assert.equal(bienvenidaEn(p, PROG_TAROT), true);
  assert.equal(bienvenidaEn(p, PROG_PEND), false);
  assert.equal(bienvenidaEn(p, null), true);
  assert.equal(bienvenidaEn({ id: 'X', leads: [{ id: 'a', form: 'clase-tarot' }] }, PROG_TAROT), false); // sin campo tags
});
await prueba('la etiqueta «Bienvenida ✓» solo se dibuja dentro de un programa y solo a quien la tiene', () => {
  const p = persona();
  assert.match(bienvenidaBadge(p, PROG_TAROT), /Bienvenida ✓/);
  assert.equal(bienvenidaBadge(p, PROG_PEND), '');
  assert.equal(bienvenidaBadge(p, null), '');
});
await prueba('marcar a mano: guarda la etiqueta solo en esa ficha, avisa a la base y no repite si ya está', async () => {
  const p = persona(); llamadas.length = 0;
  assert.equal(await marcarBienvenida(p, 'L2', true), true);
  assert.deepEqual(llamadas, [{ action: 'etiquetas', ids: ['L2'], agregar: ['Bienvenida'] }]);
  assert.ok(tieneBv(p.leads[1]) && tieneBv(p.leads[0]));
  assert.equal(A._per, null);
  assert.equal(await marcarBienvenida(p, 'L2', true), false);
  assert.equal(llamadas.length, 1);
});
await prueba('quitarla: usa «quitar» y deja la ficha sin la etiqueta', async () => {
  const p = persona(); llamadas.length = 0;
  assert.equal(await marcarBienvenida(p, 'L1', false), true);
  assert.deepEqual(llamadas, [{ action: 'etiquetas', ids: ['L1'], quitar: ['Bienvenida'] }]);
  assert.equal(tieneBv(p.leads[0]), false);
  assert.equal(await marcarBienvenida(p, 'L1', false), false);
});
await prueba('una ficha que no existe no llama a la base', async () => {
  llamadas.length = 0;
  assert.equal(await marcarBienvenida(persona(), 'NOPE', true), false);
  assert.equal(llamadas.length, 0);
});
await prueba('si falla la base al marcar a mano, el error sale y la ficha no cambia', async () => {
  const p = persona(); fallaApi = true;
  await assert.rejects(() => marcarBienvenida(p, 'L2', true), /sin conexión/);
  fallaApi = false;
  assert.equal(tieneBv(p.leads[1]), false);
});
await prueba('al enviar la bienvenida: se marca sola la ficha de esa respuesta y se repinta', async () => {
  const p = persona(); p.leads[0].tags = []; llamadas.length = 0; toasts.length = 0; marcas.repintar = 0; marcas.checked = false;
  setPend({ id: 'P1', lead: 'L1' });
  await bienvenidaTrasEnviar(p);
  assert.deepEqual(llamadas, [{ action: 'etiquetas', ids: ['L1'], agregar: ['Bienvenida'] }]);
  assert.ok(tieneBv(p.leads[0]));
  assert.equal(marcas.repintar, 1); assert.equal(marcas.checked, true);
  assert.match(toasts[0], /marcada la bienvenida/);
  await bienvenidaTrasEnviar(p); // ya se usó: no vuelve a marcar
  assert.equal(llamadas.length, 1);
});
await prueba('no marca si se envió otro mensaje, ni a otra persona (la selección quedó de una ficha anterior)', async () => {
  const p = persona(); p.leads[0].tags = []; llamadas.length = 0;
  await bienvenidaTrasEnviar(p); // sin bienvenida elegida
  setPend({ id: 'OTRA', lead: 'L1' });
  await bienvenidaTrasEnviar(p); // elegida en otra ficha
  setPend({ id: 'P1', lead: '' });
  await bienvenidaTrasEnviar(p); // sin ficha de clase
  assert.equal(llamadas.length, 0); assert.equal(tieneBv(p.leads[0]), false);
});
await prueba('si falla el etiquetado después de enviar, avisa que se envió y no lanza error', async () => {
  const p = persona(); p.leads[0].tags = []; toasts.length = 0; fallaApi = true;
  setPend({ id: 'P1', lead: 'L1' });
  await bienvenidaTrasEnviar(p);
  fallaApi = false;
  assert.match(toasts[0], /Se envió, pero no se pudo marcar/);
  assert.equal(tieneBv(p.leads[0]), false);
});

// ---- piezas de la pantalla (se comprueban en el código)
await prueba('filtro «Sin bienvenida»: solo dentro de un programa, sin descartadas, y se reinicia con «Quitar filtros» y al cambiar de pestaña', () => {
  assert.match(src, /&& \(!S\.crmSinBv \|\| !prog \|\| \(etapaVista\(p\) !== 'descartado' && !bienvenidaEn\(p, prog\)\)\)/);
  assert.match(src, /\$\{prog \? `<button type="button" class="chip" data-crm-bv aria-pressed="\$\{!!S\.crmSinBv\}"[^`]*Sin bienvenida \(/);
  assert.match(src, /S\.crmPost \|\| S\.crmBF \|\| S\.crmSinBv/);
  assert.match(src, /crmBF: false, crmSinBv: false, crmReplay: false, crmTag: ''/);
  assert.match(src, /S\.crmEtapa = ''; S\.crmSinBv = false;/);
  assert.match(src, /\[data-crm-bv\]'\)\.forEach\(\(b\) => \(b\.onclick = \(\) => \{ S\.crmSinBv = !S\.crmSinBv;/);
});
await prueba('la etiqueta sale en la tarjeta del embudo y en la tabla, y no se duplica con las etiquetas generales', () => {
  assert.equal((src.match(/bienvenidaBadge\(p, prog\)/g) || []).length, 2); // tarjeta del embudo y fila de la tabla
  assert.match(src, /\$\{bfBadges\(p\)\}\$\{bienvenidaBadge\(p, prog\)\}/);
  assert.match(src, /p\.tags\.filter\(\(t\) => t !== TAG_BIENVENIDA\)/);
});
await prueba('la ficha tiene la casilla «Se le dio la bienvenida» por programa y el chat marca al enviar (las dos versiones de la ficha)', () => {
  assert.match(src, /<input type="checkbox" data-bv="\$\{esc\(l\.id\)\}" \$\{tieneBv\(l\) \? 'checked' : ''\}> Se le dio la bienvenida/);
  assert.equal((src.match(/await bienvenidaTrasEnviar\(p\);/g) || []).length, 2);
  assert.equal((src.match(/bvPend = r\[2\] === 'bienvenida' \? \{ id: p\.id, lead: cx\.leadId \} : null;/g) || []).length, 2);
});

// ---- la respuesta rápida lleva la marca y el contexto trae la ficha de la clase
await prueba('la respuesta «Bienvenida» está marcada y su contexto trae la ficha de la clase (no otra)', () => {
  const MES_N = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const DIA_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const tOf = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  const LEAD_FORMS = { pendulo: 'Péndulo Hebreo', 'clase-pendulo': 'Clase gratis Péndulo', tarot: 'Tarot Terapéutico', 'clase-tarot': 'Clase gratis Tarot', formacion: 'Formación' };
  const esClase = (f) => f === 'clase-pendulo' || f === 'clase-tarot';
  const { RESPUESTAS, ctxRespuesta } = new Function('DIA_LARGO', 'MES_N', 'tOf', 'LEAD_FORMS', 'esClase', 'fechaLarga', 'A',
    `${corte('const RESPUESTAS = [', '// Conversación de WhatsApp dentro de la ficha')}\nreturn { RESPUESTAS, ctxRespuesta };`)(DIA_LARGO, MES_N, tOf, LEAD_FORMS, esClase, (s) => s, { cal: [] });
  assert.deepEqual(RESPUESTAS.map((r) => r[2]), ['bienvenida', undefined, undefined, undefined, undefined, undefined]);
  const p = { nombre: 'Ana', leads: [{ id: 'F1', form: 'formacion' }, { id: 'T9', form: 'clase-tarot', claseFecha: '2026-12-01' }] };
  assert.equal(ctxRespuesta(p).leadId, 'T9');
});
console.log(`\n${ok} pruebas OK`);
