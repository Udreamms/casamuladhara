// Prueba de la ficha automática por WhatsApp (src/lib/server/ficha-wa.js). Datos inventados; la base de datos es falsa.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { asegurarFicha, crearFichasFaltantes, variantesNumero } from '../src/lib/server/ficha-wa.js';

// Base falsa: colección «leads» con where(campo, '==' | 'in', valor), limit(), doc().create()
function baseFalsa(inicial = [], chats = {}) {
  const docs = new Map(inicial.map((d) => [d.id, { ...d }]));
  const consulta = (filtros = [], tope = Infinity) => ({
    where: (campo, op, valor) => consulta([...filtros, [campo, op, valor]], tope),
    limit: (n) => consulta(filtros, n),
    get: async () => {
      const hallados = [...docs.entries()].filter(([, d]) => filtros.every(([c, op, v]) => (op === 'in' ? v.includes(d[c]) : d[c] === v))).slice(0, tope);
      return { empty: !hallados.length, docs: hallados.map(([id, d]) => ({ id, data: () => d })) };
    },
  });
  return {
    docs,
    collection: (ruta = 'leads') => {
      if (ruta === 'wa_chats') return { limit: () => ({ get: async () => ({ docs: Object.entries(chats).map(([id, c]) => ({ id, data: () => c.datos })) }) }) };
      const m = ruta.match(/^wa_chats\/(\d+)\/messages$/);
      if (m) return { orderBy: () => ({ limit: () => ({ get: async () => ({ docs: (chats[m[1]]?.mensajes || []).map((x) => ({ data: () => x })) }) }) }) };
      return consulta();
    },
    doc: (ruta) => ({ create: async (datos) => { const id = ruta.split('/')[1]; if (docs.has(id)) { const e = new Error('ALREADY_EXISTS'); e.code = 6; throw e; } docs.set(id, { ...datos }); } }),
  };
}
const MARCA = { sentinel: 'hora-del-servidor' };
let ok = 0;
const prueba = async (nombre, fn) => { await fn(); ok++; console.log('OK  ', nombre); };

await prueba('quien escribe y no tiene ficha: se crea la ficha «Escribió por WhatsApp», etapa Nueva, sin consentimiento', async () => {
  const db = baseFalsa();
  const r = await asegurarFicha(db, { numero: '59176538154', nombre: 'Dorysiña', texto: 'Hola, quiero información', marca: MARCA });
  assert.equal(r.creada, true);
  const l = db.docs.get('wa59176538154');
  assert.equal(l.form, 'whatsapp'); assert.equal(l.status, 'nuevo'); assert.equal(l.name, 'Dorysiña');
  assert.equal(l.whatsapp, '+59176538154'); assert.equal(l.waKey, '59176538154'); assert.equal(l.email, '');
  assert.equal(l.interest, 'Escribió por WhatsApp'); assert.equal(l.message, 'Hola, quiero información');
  assert.equal(l.createdAt, MARCA); assert.deepEqual(l.utm, {});
  assert.equal(l.consentimiento, undefined); assert.equal(l.noContactar, undefined); assert.equal(l.origen, undefined);
  assert.equal(l.eventos.length, 1); assert.match(l.eventos[0].texto, /^Escribió por WhatsApp: Hola, quiero información/);
});
await prueba('sin nombre de perfil: usa el número', async () => {
  const db = baseFalsa(); await asegurarFicha(db, { numero: '56912345678', nombre: '', texto: '', marca: MARCA });
  assert.equal(db.docs.get('wa56912345678').name, '+56912345678');
  assert.equal(db.docs.get('wa56912345678').eventos[0].texto, 'Escribió por WhatsApp');
});
await prueba('si ya tiene ficha (registrada por formulario) no se crea otra', async () => {
  const db = baseFalsa([{ id: 'abc', form: 'clase-tarot', waKey: '56912345678', name: 'Ana' }]);
  const r = await asegurarFicha(db, { numero: '56912345678', nombre: 'Ana', texto: 'Hola', marca: MARCA });
  assert.deepEqual(r, { creada: false, motivo: 'ya tiene ficha' }); assert.equal(db.docs.size, 1);
});
await prueba('celulares de Argentina: ficha guardada sin el 9 y mensaje que llega con 9 (y al revés) no duplican', async () => {
  const sin9 = baseFalsa([{ id: 'm', form: 'clase-tarot', waKey: '543516137941', name: 'Milvia' }]);
  assert.equal((await asegurarFicha(sin9, { numero: '5493516137941', nombre: 'Milvia', texto: 'Hola', marca: MARCA })).creada, false);
  assert.equal(sin9.docs.size, 1);
  const con9 = baseFalsa([{ id: 'm', form: 'clase-tarot', waKey: '5493516137941', name: 'Milvia' }]);
  assert.equal((await asegurarFicha(con9, { numero: '543516137941', texto: 'Hola', marca: MARCA })).creada, false);
  assert.deepEqual(variantesNumero('5493516137941').sort(), ['543516137941', '5493516137941']);
  assert.deepEqual(variantesNumero('521' + '5512345678').sort(), ['5215512345678', '525512345678']);
  assert.deepEqual(variantesNumero('56912345678'), ['56912345678']);
});
await prueba('si el mensaje trae «Mi código» y ese código ya tiene ficha (otro número): no se duplica', async () => {
  const db = baseFalsa([{ id: 'd', form: 'clase-tarot', waKey: '59170000000', codigo: 'de0PtAURPX0W', name: 'Dorysiña' }]);
  const r = await asegurarFicha(db, { numero: '59176538154', nombre: 'Dorysiña', texto: 'Hola, ya me registré para la clase gratuita. Mi código: de0PtAURPX0W', marca: MARCA });
  assert.deepEqual(r, { creada: false, motivo: 'su código ya tiene ficha', ficha: { id: 'd', nombre: 'Dorysiña' } }); assert.equal(db.docs.size, 1);
});
await prueba('un código que no existe no impide crear la ficha', async () => {
  const db = baseFalsa();
  assert.equal((await asegurarFicha(db, { numero: '56911112222', texto: 'Mi código: ZZZZZZZZZZZZ', marca: MARCA })).creada, true);
});
await prueba('dos mensajes casi a la vez: queda una sola ficha y no falla', async () => {
  const db = baseFalsa();
  const [a, b] = await Promise.all([1, 2].map(() => asegurarFicha(db, { numero: '56933334444', texto: 'Hola', marca: MARCA })));
  assert.equal(db.docs.size, 1);
  assert.ok([a, b].some((r) => r.creada));
});
await prueba('si el id ya existe (carrera entre dos avisos) responde «ya existe» sin lanzar error', async () => {
  const db = baseFalsa([{ id: 'wa56955556666', form: 'whatsapp', waKey: 'otra-clave' }]); // existe el documento pero la consulta por waKey no lo ve
  assert.deepEqual(await asegurarFicha(db, { numero: '56955556666', texto: 'Hola', marca: MARCA }), { creada: false, motivo: 'ya existe' });
});
await prueba('número vacío o con letras: no hace nada; un error distinto de la base sí se propaga', async () => {
  const db = baseFalsa();
  assert.equal((await asegurarFicha(db, { numero: '', marca: MARCA })).creada, false);
  assert.equal((await asegurarFicha(db, { numero: 'abc', marca: MARCA })).creada, false);
  assert.equal(db.docs.size, 0);
  const rota = { collection: () => ({ where: () => ({ limit: () => ({ get: async () => { throw new Error('sin conexión'); } }) }) }) };
  await assert.rejects(() => asegurarFicha(rota, { numero: '56900000001', marca: MARCA }), /sin conexión/);
});
await prueba('mensaje largo o con saltos de línea: se resume en una línea de hasta 300 caracteres', async () => {
  const db = baseFalsa();
  await asegurarFicha(db, { numero: '56977778888', texto: `Hola\n\n${'a'.repeat(500)}`, marca: MARCA });
  const l = db.docs.get('wa56977778888');
  assert.ok(!l.message.includes('\n') && l.message.length === 300);
});
await prueba('el webhook la llama para cada mensaje que llega, sin que un error detenga el aviso de Meta', () => {
  const src = fs.readFileSync(new URL('../src/app/api/whatsapp/route.js', import.meta.url), 'utf8');
  assert.match(src, /import \{ asegurarFicha, crearFichasFaltantes \} from '@\/lib\/server\/ficha-wa\.js';/);
  assert.match(src, /if \(numero\) await asegurarFicha\(db\(\), \{ numero, nombre: nombres\[m\.from\], texto: textoDe\(m\), marca: FieldValue\.serverTimestamp\(\) \}\)\.catch\(/);
  assert.equal((src.match(/asegurarFicha\(/g) || []).length, 1); // solo para mensajes que llegan, no para los que Karen escribe ni los estados
});
await prueba('el portal sabe mostrar el origen «WhatsApp» (etiqueta del programa y de la ficha)', () => {
  const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8');
  assert.match(src, /'cuenta-gratis': 'Cuenta gratis del aula', whatsapp: 'Escribió por WhatsApp' \}/);
  assert.match(src, /'cuenta-gratis': 'Cuenta gratis', whatsapp: 'WhatsApp' \}/);
});

// ---- Chats que ya existían sin tarjeta (botón «Crear tarjetas de los chats sin tarjeta»)
const TS = { t: 'primer-mensaje' };
await prueba('crea la tarjeta de los chats sin ella: usa el nombre del chat, su primer mensaje y la fecha en que escribió; no envía nada', async () => {
  const db = baseFalsa([{ id: 'x', form: 'clase-tarot', waKey: '56911111111', name: 'Ya Registrada' }], {
    '56911111111': { datos: { name: 'Ya Registrada', lastText: 'hola' }, mensajes: [{ dir: 'in', text: 'hola', ts: TS }] },
    '59176538154': { datos: { name: 'Dorysiña', lastText: 'gracias' }, mensajes: [{ dir: 'in', text: 'Hola, quiero información', ts: TS }, { dir: 'out', text: 'Hola Dorysiña' }, { dir: 'in', text: 'gracias', ts: { t: 'otro' } }] },
    '56922222222': { datos: { lastText: 'Buenas tardes' }, mensajes: [] },
  });
  const r = await crearFichasFaltantes(db, { marca: MARCA });
  assert.deepEqual({ total: r.total, creadas: r.creadas, yaTenian: r.yaTenian, otras: r.otras }, { total: 3, creadas: 2, yaTenian: 1, otras: [] });
  const d = db.docs.get('wa59176538154');
  assert.equal(d.name, 'Dorysiña'); assert.equal(d.createdAt, TS); assert.match(d.message, /^Hola, quiero información gracias/);
  assert.equal(db.docs.get('wa56922222222').name, '+56922222222'); assert.equal(db.docs.get('wa56922222222').message, 'Buenas tardes'); assert.equal(db.docs.get('wa56922222222').createdAt, MARCA);
});
await prueba('si el chat trae «Mi código» de alguien ya registrada con otro número: no la duplica y la deja en «otras» con el nombre de su tarjeta', async () => {
  const db = baseFalsa([{ id: 'd', form: 'clase-tarot', waKey: '59170000000', codigo: 'de0PtAURPX0W', name: 'Dorysiña Villalva' }], {
    '59176538154': { datos: { name: 'Dory' }, mensajes: [{ dir: 'in', text: 'Hola, ya me registré. Mi código: de0PtAURPX0W', ts: TS }] },
  });
  const r = await crearFichasFaltantes(db, { marca: MARCA });
  assert.equal(r.creadas, 0); assert.deepEqual(r.otras, [{ numero: '59176538154', nombre: 'Dory', ficha: 'Dorysiña Villalva' }]); assert.equal(db.docs.size, 1);
});
await prueba('se puede pulsar dos veces: la segunda no crea nada nuevo', async () => {
  const db = baseFalsa([], { '56933333333': { datos: { name: 'Ana' }, mensajes: [{ dir: 'in', text: 'Hola', ts: TS }] } });
  assert.equal((await crearFichasFaltantes(db, { marca: MARCA })).creadas, 1);
  const r2 = await crearFichasFaltantes(db, { marca: MARCA });
  assert.deepEqual({ creadas: r2.creadas, yaTenian: r2.yaTenian }, { creadas: 0, yaTenian: 1 }); assert.equal(db.docs.size, 1);
});
await prueba('la ruta tiene la acción «fichas» después de comprobar a la Maestra y sin exigir Meta; el portal tiene el botón y lo explica', () => {
  const ruta = fs.readFileSync(new URL('../src/app/api/whatsapp/route.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const iRol = ruta.lastIndexOf('const { error } = await soloMaestra(request);'), iFichas = ruta.indexOf("if (body.action === 'fichas')"), iMeta = ruta.indexOf('if (!configurado()) return json(', iRol);
  assert.ok(iRol > 0 && iFichas > iRol && iFichas < iMeta, 'la acción debe ir después de comprobar a la Maestra y antes de exigir Meta');
  const adm = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.ok(adm.includes('data-wa-fichas title="Crea en Interesadas la tarjeta de cada chat que todavía no tiene. No envía ningún mensaje.">Crear tarjetas de los chats sin tarjeta</button>'));
});
await prueba('el botón del portal: pide confirmación, llama a «fichas», recarga Interesadas y muestra el resultado con las personas que escribieron desde otro número', async () => {
  const adm = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const bloque = adm.slice(adm.indexOf('// Chats de WhatsApp que todavía no tienen tarjeta'), adm.indexOf('V.whatsapp = () =>'));
  const llamadas = [], dialogos = []; let confirma = true, handler;
  const documento = { addEventListener: (t, f) => { handler = f; } };
  const A = { _per: 'cache' }, data = { leads: async () => llamadas.push('leads') };
  const waApi = async (b) => { llamadas.push(b.action); return { creadas: 2, yaTenian: 1, otras: [{ numero: '59176538154', nombre: 'Dory <b>', ficha: 'Dorysiña Villalva' }] }; };
  const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const fn = new Function('document', 'confirm', 'waApi', 'data', 'A', 'paintNav', 'esc', 'dialog', 'fail', bloque);
  fn(documento, () => confirma, waApi, data, A, () => llamadas.push('nav'), esc, (h) => dialogos.push(h), (e) => dialogos.push(`ERROR ${e.message}`));
  const boton = { disabled: false };
  await handler({ target: { closest: (q) => (q === '[data-wa-fichas]' ? boton : null) } });
  assert.deepEqual(llamadas, ['fichas', 'leads', 'nav']); assert.equal(A._per, null); assert.equal(boton.disabled, false);
  assert.match(dialogos[0], /<b>2<\/b> tarjetas nuevas/); assert.match(dialogos[0], /1 chat ya tenía tarjeta/); assert.match(dialogos[0], /Dory &lt;b>.*ya está como «Dorysiña Villalva»/);
  confirma = false; llamadas.length = 0;
  await handler({ target: { closest: (q) => (q === '[data-wa-fichas]' ? boton : null) } });
  assert.deepEqual(llamadas, []); // si cancela, no hace nada
});
console.log(`\n${ok} pruebas OK`);
