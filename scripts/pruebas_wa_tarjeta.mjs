// Prueba: en el chat de WhatsApp del portal, encontrar la tarjeta de quien escribe (por número, con o sin el 9 de Argentina, o por su «Mi código»)
// y que la ficha encuentre su chat. Datos inventados; no usa la base de datos.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chatIdDe, claveNumero, contactoConNumero, fichaDeChat, paisDeNumero, planNumeros, variantesNum } from '../public/assets/js/wa-ficha.js';
import { variantesNumero } from '../src/lib/server/ficha-wa.js';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
// Como normaliza el portal un número: la función real de admin.js
const waNum = new Function(`${src.match(/^const waNum = .*$/m)[0]}\nreturn waNum;`)();
let ok = 0;
const prueba = (nombre, fn) => { fn(); ok++; console.log('OK  ', nombre); };

prueba('variantes del número: Argentina con y sin 9, México con y sin 1; los demás quedan igual', () => {
  assert.deepEqual(variantesNum('5492477352538').sort(), ['542477352538', '5492477352538']);
  assert.deepEqual(variantesNum('+54 2477 352538').sort(), ['542477352538', '5492477352538']);
  assert.deepEqual(variantesNum('5215512345678').sort(), ['5215512345678', '525512345678']);
  assert.deepEqual(variantesNum('56972803407'), ['56972803407']);
  assert.deepEqual(variantesNum('59176538154'), ['59176538154']);
  assert.deepEqual(variantesNum(''), []);
});
prueba('chatIdDe: usa el chat que ya existe (con o sin 9); sin chat devuelve el mismo número', () => {
  const chats = [{ id: '5492477352538' }, { id: '56911111111' }];
  assert.equal(chatIdDe('542477352538', chats), '5492477352538'); // la tarjeta lo tiene sin 9 y el chat con 9
  assert.equal(chatIdDe('5492477352538', chats), '5492477352538');
  assert.equal(chatIdDe('56911111111', chats), '56911111111');
  assert.equal(chatIdDe('542477999999', chats), '542477999999');
  assert.equal(chatIdDe('', chats), ''); assert.equal(chatIdDe('5491111111111', undefined), '5491111111111');
});
const leads = [
  { id: 'L1', name: 'María Sarlenga', whatsapp: '+54 2477 352538', waKey: '542477352538', codigo: 'aHsIXCyzaJ6v' },
  { id: 'L2', name: 'Dorysiña Villalva', whatsapp: '+591 70000000', waKey: '59170000000', codigo: 'de0PtAURPX0W' },
  { id: 'L3', name: 'Solo WhatsApp', whatsapp: '+56 9 3333 3333', waKey: '56933333333' },
  { id: 'L4', name: 'Solo WhatsApp (clase)', whatsapp: '+56 9 3333 3333', waKey: '56933333333', codigo: 'CLASE1234567' },
];
prueba('fichaDeChat por número: el celular argentino escrito sin 9 en la tarjeta y con 9 en el chat', () => {
  const r = fichaDeChat('5492477352538', [], leads, waNum);
  assert.equal(r.lead.id, 'L1'); assert.equal(r.por, 'número');
});
prueba('fichaDeChat por código: escribió desde otro número pero trae su «Mi código»', () => {
  const msgs = [{ dir: 'in', text: 'Hola, ya me registré para la clase gratuita de Tarot Terapéutico con Karen. Quiero recibir el enlace de la clase para poder ingresar. Mi código: de0PtAURPX0W', ts: 1 }];
  const r = fichaDeChat('59176538154', msgs, leads, waNum);
  assert.equal(r.lead.id, 'L2'); assert.equal(r.por, 'código');
});
prueba('si hay varias tarjetas del mismo número, prefiere la que tiene código de clase', () => {
  assert.equal(fichaDeChat('56933333333', [], leads, waNum).lead.id, 'L4');
});
prueba('sin tarjeta: devuelve null (también con un código que no existe o escrito por Karen, no por la persona)', () => {
  assert.equal(fichaDeChat('56999999999', [], leads, waNum), null);
  assert.equal(fichaDeChat('56999999999', [{ dir: 'in', text: 'Mi código: NOEXISTE12345' }], leads, waNum), null);
  assert.equal(fichaDeChat('56999999999', [{ dir: 'out', text: 'Tu código: de0PtAURPX0W. Mi código: de0PtAURPX0W' }], leads, waNum), null);
  assert.equal(fichaDeChat('56999999999', undefined, undefined, waNum), null);
});
prueba('el portal usa la búsqueda: botones «Abrir su tarjeta» y «Poner su enlace en el mensaje», y avisa si no hay tarjeta', () => {
  assert.match(src, /import \{ chatIdDe, claveNumero, contactoConNumero, fichaDeChat, planNumeros \} from '\.\/wa-ficha\.js';/);
  assert.match(src, /const fi = A\.leads \? fichaDeChat\(n, A\.wa\.msgs, A\.leads, waNum\) : undefined;/);
  assert.ok(src.includes('data-wa-tarjeta="${esc(fi.lead.id)}"') && src.includes('data-wa-enlace="${esc(fi.lead.id)}"') && src.includes('No tiene tarjeta en Interesadas.'));
  assert.ok(src.includes("${libre ? `<button class=\"btn btn-ghost btn-sm\" data-wa-enlace"), 'el botón del enlace solo aparece si se le puede escribir libremente');
  assert.match(src, /if \(!A\.leads\) data\.leads\(\)\.then\(\(\) => \{ if \(S\.view === 'whatsapp'\) waRepaint\(true\); \}\)/);
});
prueba('la ficha busca su chat con las dos formas del número (las 4 veces que lo usa) y el nombre del chat también', () => {
  assert.equal((src.match(/chatIdDe\(waNum\(p\.whatsapp\), A\.wa\.chats\)/g) || []).length, 5); // las 4 de la tarjeta y la de «Falta el replay» (ventana de 24 h)
  assert.match(src, /A\.leads\?\.find\(\(l\) => claveNumero\(waNum\(l\.whatsapp\)\) === claveNumero\(n\)\)\?\.name/);
});
prueba('«Poner su enlace»: escribe la bienvenida de esa persona y, al enviarla, queda marcada «Bienvenida» solo en ese chat', () => {
  assert.match(src, /const cx = ctxRespuesta\(per\); t\.value = RESPUESTAS\[0\]\[1\]\(cx\); t\.focus\(\);/);
  assert.match(src, /bvPend = \{ id: per\.id, lead: cx\.leadId \}; waEnlaceDe = \{ per, chat: S\.waOpen \};/);
  assert.match(src, /if \(waEnlaceDe && waEnlaceDe\.chat === S\.waOpen\) \{ const x = waEnlaceDe\.per; waEnlaceDe = null; await bienvenidaTrasEnviar\(x\); \}/);
  assert.equal(src.split('\n').find((l) => l.includes("const RESPUESTAS = [")) !== undefined, true);
  assert.ok(src.indexOf("['Bienvenida (link de la clase)'") > 0 && src.indexOf("['Bienvenida (link de la clase)'") < src.indexOf("['Compromiso de asistir en vivo'"), 'la bienvenida es la primera respuesta (índice 0)');
});

// ---- Caso Patricia: se registró con un número y el sistema le puso +56 (Chile), pero escribió desde su +591 (Bolivia)
prueba('el país según el código del número', () => {
  assert.equal(paisDeNumero('59172512244'), 'Bolivia'); assert.equal(paisDeNumero('+54 9 2477 352538'), 'Argentina'); assert.equal(paisDeNumero('56972803407'), 'Chile');
  assert.equal(paisDeNumero('13853847208'), 'Estados Unidos'); assert.equal(paisDeNumero('5215512345678'), 'México'); assert.equal(paisDeNumero('999123'), ''); assert.equal(paisDeNumero(''), '');
});
prueba('Patricia: su chat se une a su tarjeta por el código y, al usar el número del chat, pasa a encontrarse por el número', () => {
  const lead = { id: 'P1', name: 'Patricia Nolasco Guillén', whatsapp: '+56 72512244', waKey: '5672512244', codigo: 'pMFnSqhhTuyJ' };
  const msgs = [{ dir: 'in', text: 'Hola, ya me registré para la clase gratuita de Tarot Terapéutico con Karen. Mi código: pMFnSqhhTuyJ' }];
  assert.equal(fichaDeChat('59172512244', msgs, [lead], waNum).por, 'código');
  const { contacto } = contactoConNumero({ nombre: lead.name, email: 'patricianolasco244@gmail.com', whatsapp: lead.whatsapp, country: 'Chile' }, '59172512244');
  Object.assign(lead, contacto, { waKey: '59172512244' });
  const r = fichaDeChat('59172512244', msgs, [lead], waNum);
  assert.equal(r.por, 'número'); assert.equal(r.lead.id, 'P1');
});
prueba('contactoConNumero: guarda el número del chat con «+», conserva nombre y correo, cambia el país y lo explica en la pregunta', () => {
  const p = { nombre: 'Patricia Nolasco Guillén', email: 'patricianolasco244@gmail.com', whatsapp: '+56 72512244', country: 'Chile' };
  const { contacto, pregunta } = contactoConNumero(p, '59172512244');
  assert.deepEqual(contacto, { name: 'Patricia Nolasco Guillén', email: 'patricianolasco244@gmail.com', whatsapp: '+59172512244', country: 'Bolivia' });
  assert.equal(pregunta, '¿Guardar +59172512244 como el WhatsApp de Patricia Nolasco Guillén? Hoy tiene +56 72512244 y el país pasa a Bolivia.');
});
prueba('contactoConNumero: si el país no cambia no lo menciona, y si no conoce el código deja el país que tenía', () => {
  const mismo = contactoConNumero({ nombre: 'Ana', email: 'a@x.cl', whatsapp: '+54 2477 352538', country: 'Argentina' }, '5492477352538');
  assert.equal(mismo.contacto.country, 'Argentina'); assert.ok(!mismo.pregunta.includes('el país pasa'));
  const raro = contactoConNumero({ nombre: 'Eva', email: '', whatsapp: '', country: 'Chile' }, '999123456789');
  assert.equal(raro.contacto.country, 'Chile'); assert.equal(raro.contacto.whatsapp, '+999123456789'); assert.match(raro.pregunta, /Hoy tiene ninguno/);
});
prueba('el portal: el botón solo aparece cuando el número de la tarjeta no es el del chat; pide confirmación, actualiza todas sus fichas y recarga el chat', () => {
  assert.ok(src.includes("${fi.difiere ? `<button class=\"btn btn-ghost btn-sm\" data-wa-usar-numero=\"${esc(fi.lead.id)}\""));
  assert.match(src, /const \{ contacto, pregunta \} = contactoConNumero\(per, S\.waOpen\);\n\s+if \(!confirm\(pregunta\)\) return;/);
  assert.match(src, /await data\.leads\(\{ action: 'update', ids: per\.leads\.map\(\(l\) => l\.id\), contacto \}\);/);
  assert.match(src, /per\.leads\.forEach\(\(l\) => Object\.assign\(l, contacto, \{ email: String\(contacto\.email\)\.toLowerCase\(\), waKey: S\.waOpen \}\)\);/);
  assert.match(src, /A\._per = null; paintNav\(\); waRepaint\(true\); toast\('Listo: su tarjeta ahora tiene el número de este chat\.'\)/);
  assert.match(src, /import \{ chatIdDe, claveNumero, contactoConNumero, fichaDeChat, planNumeros \} from/);
});
prueba('servidor: al editar el WhatsApp de una tarjeta también se actualiza su clave (waKey), que usan la secuencia y la ficha automática', () => {
  const ruta = fs.readFileSync(new URL('../src/app/api/leads/route.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.ok(ruta.includes('Object.assign(cambios, { name, email, whatsapp, country, waKey: waClave(whatsapp) });'));
  assert.equal((ruta.match(/waKey: waClave\(/g) || []).length, 2); // el registro nuevo y la edición de contacto
});

// ---- Caso Liz: la tarjeta tiene +595 0984479339 (con un 0 de más) y su chat está en 595984479339
prueba('claveNumero: el mismo celular da la misma clave aunque venga con 0 de más, con 9 (Argentina) o con 1 (México)', () => {
  assert.equal(claveNumero('595984479339'), '595984479339'); assert.equal(claveNumero('5950984479339'), '595984479339'); assert.equal(claveNumero('+595 0984479339'), '595984479339');
  assert.equal(claveNumero('5492477352538'), claveNumero('542477352538')); assert.equal(claveNumero('5215512345678'), claveNumero('525512345678'));
  assert.equal(claveNumero('56972803407'), '56972803407'); assert.equal(claveNumero('13853847208'), '13853847208'); assert.equal(claveNumero('59172512244'), '59172512244'); assert.equal(claveNumero(''), '');
});
prueba('waNum del portal: quita el 0 de más después del código de país y deja los números normales como estaban', () => {
  assert.equal(waNum('+595 0984479339'), '595984479339'); assert.equal(waNum('0984479339'), '0984479339'); // sin código de país no se adivina
  assert.equal(waNum('+56 9 7280 3407'), '56972803407'); assert.equal(waNum('972803407'), '56972803407'); assert.equal(waNum('+591 72512244'), '59172512244'); assert.equal(waNum('+1 385 384 7208'), '13853847208');
  assert.equal(waNum('+54 9 2477 352538'), '5492477352538'); assert.equal(waNum(''), '');
});
prueba('Liz: su chat se une a su tarjeta por el número, el portal avisa que el número difiere y, al usar el del chat, deja de diferir', () => {
  const lead = { id: 'F1', name: 'Liz', whatsapp: '+595 0984479339', waKey: '5950984479339', codigo: 'UqpJRJUy9Npp' };
  assert.equal(chatIdDe(waNum(lead.whatsapp), [{ id: '595984479339' }]), '595984479339'); // la ficha encuentra su chat
  const r = fichaDeChat('595984479339', [], [lead], waNum);
  assert.equal(r.lead.id, 'F1'); assert.equal(r.por, 'número'); assert.equal(r.difiere, true);
  const { contacto } = contactoConNumero({ nombre: 'Liz', email: 'liz@x.com', whatsapp: lead.whatsapp, country: 'Paraguay' }, '595984479339');
  assert.equal(contacto.whatsapp, '+595984479339'); assert.equal(contacto.country, 'Paraguay');
  Object.assign(lead, contacto, { waKey: '595984479339' });
  assert.equal(fichaDeChat('595984479339', [], [lead], waNum).difiere, false);
});
prueba('fichaDeChat: si el número coincide exactamente, no marca que difiera', () => {
  assert.equal(fichaDeChat('56911111111', [], [{ id: 'a', whatsapp: '+56 9 1111 1111', waKey: '56911111111' }], waNum).difiere, false);
  assert.equal(fichaDeChat('5492477352538', [], [{ id: 'a', whatsapp: '+54 2477 352538', waKey: '542477352538' }], waNum).difiere, true); // Argentina sin 9 en la tarjeta
});
prueba('servidor: waClave y normalizar también quitan el 0 de más (las tarjetas nuevas guardan su clave sin él); la ficha automática busca la forma vieja', () => {
  const emb = fs.readFileSync(new URL('../src/lib/server/embudo.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const waClave = new Function(`${emb.match(/^export const waClave = .*$/m)[0].replace('export ', '')}\nreturn waClave;`)();
  assert.equal(waClave('+595 0984479339'), '595984479339'); assert.equal(waClave('+56 9 7280 3407'), '56972803407'); assert.equal(waClave('abc'), '');
  const wa = fs.readFileSync(new URL('../src/lib/server/whatsapp.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const normalizar = new Function(`${wa.slice(wa.indexOf('export function normalizar'), wa.indexOf('\n}\n', wa.indexOf('export function normalizar')) + 3).replace('export ', '')}\nreturn normalizar;`)();
  assert.equal(normalizar('+595 0984479339'), '595984479339'); assert.equal(normalizar('+591 72512244'), '59172512244');
  assert.ok(variantesNumero('595984479339').includes('5950984479339') && variantesNumero('595984479339').includes('595984479339'));
  assert.ok(!variantesNumero('5950984479339').includes('59500984479339'), 'si el número ya trae el 0 no le agrega otro');
});

// ---- Corregir de una vez los números de todas las tarjetas que no coinciden con su chat
const L = (id, name, whatsapp, waKey, extra = {}) => ({ id, name, whatsapp, waKey, ...extra });
const CODE = (c) => `Hola, ya me registré para la clase gratuita. Mi código: ${c}`;
prueba('planNumeros: propone corregir a Liz (0 de más), María (Argentina sin 9) y Patricia (escribió con su código desde otro país); no toca a quien ya coincide', () => {
  const leads = [
    L('liz', 'Liz', '+595 0984479339', '5950984479339', { codigo: 'UqpJRJUy9Npp' }),
    L('mar', 'María', '+54 2477 352538', '542477352538', { codigo: 'aHsIXCyzaJ6v' }),
    L('pat', 'Patricia', '+56 72512244', '5672512244', { codigo: 'pMFnSqhhTuyJ' }),
    L('ok', 'Ya coincide', '+56 9 1111 1111', '56911111111', { codigo: 'AAAAAAAAAAAA' }),
  ];
  const chats = [{ id: '595984479339' }, { id: '5492477352538' }, { id: '59172512244' }, { id: '56911111111' }, { id: '56988888888' }];
  const { cambios, dudosas } = planNumeros({ chats, leads, waNum, textosPorChat: { '59172512244': [CODE('pMFnSqhhTuyJ')], '56988888888': ['Hola'] } });
  assert.deepEqual(cambios.map((c) => [c.lead.id, c.chatId, c.por]).sort(), [['liz', '595984479339', 'número'], ['mar', '5492477352538', 'número'], ['pat', '59172512244', 'código']]);
  assert.deepEqual(dudosas, []);
});
prueba('planNumeros: no inventa nada: sin tarjeta o sin coincidencia no propone cambios', () => {
  assert.deepEqual(planNumeros({ chats: [{ id: '56999999999' }], leads: [L('a', 'A', '+56 9 1111 1111', '56911111111')], textosPorChat: { '56999999999': ['Mi código: NOEXISTE12345'] }, waNum }), { cambios: [], dudosas: [] });
  assert.deepEqual(planNumeros({ chats: [], leads: [], waNum }), { cambios: [], dudosas: [] });
  assert.deepEqual(planNumeros({ waNum }), { cambios: [], dudosas: [] });
});
prueba('planNumeros: deja como dudosa (sin proponer) a quien escribió desde dos números (también si uno es el número que ya tiene guardado)', () => {
  const doble = L('d', 'Doble', '+56 9 2222 2222', '56922222222', { codigo: 'BBBBBBBBBBBB' });
  const a = planNumeros({ chats: [{ id: '595111111111' }, { id: '595222222222' }], leads: [L('x', 'X', '+595 0111111111', '5950111111111'), doble], textosPorChat: {}, waNum });
  assert.equal(a.cambios.length, 1); // X sí: solo un chat
  const b = planNumeros({ chats: [{ id: '56922222222' }, { id: '59177777777' }], leads: [doble], textosPorChat: { '59177777777': [CODE('BBBBBBBBBBBB')] }, waNum });
  assert.equal(b.cambios.length, 0); assert.equal(b.dudosas.length, 1); assert.match(b.dudosas[0].motivo, /más de un número/);
  const c = planNumeros({ chats: [{ id: '595984479339' }, { id: '5950984479339' }], leads: [L('liz', 'Liz', '+595 0984479339', '5950984479339')], waNum });
  assert.equal(c.dudosas.length, 1); assert.match(c.dudosas[0].motivo, /más de un número/);
});
prueba('el botón del portal: busca los chats sin tarjeta por número, lee sus primeros mensajes, muestra la lista y solo cambia lo que se confirma', async () => {
  const adm = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.ok(adm.includes('data-wa-revisar title="Busca las tarjetas cuyo WhatsApp no coincide con el de su chat y te deja corregirlas todas. No envía mensajes.">Revisar números de las tarjetas</button>'));
  const bloque = adm.slice(adm.indexOf('// Corregir de una vez los números de las tarjetas'), adm.indexOf('V.whatsapp = () =>'));
  const handlers = [], dialogos = [], llamadas = [];
  const documento = { addEventListener: (t, f) => handlers.push(f) };
  const persona = { id: 'pliz', nombre: 'Liz', email: 'liz@x.com', whatsapp: '+595 0984479339', country: 'Paraguay', leads: [{ id: 'liz', name: 'Liz', whatsapp: '+595 0984479339', waKey: '5950984479339', codigo: 'UqpJRJUy9Npp' }] };
  const A = { leads: persona.leads, wa: { chats: [{ id: '595984479339' }] }, _per: 'cache' };
  const data = { leads: async (b) => llamadas.push(b?.action || 'cargar') };
  const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lecturas = [];
  const fn = new Function('document', 'A', 'data', 'waNum', 'getDocs', 'query', 'collection', 'db', 'orderBy', 'limit', 'planNumeros', 'fichaDeChat', 'contactoConNumero', 'personaPorLead', 'esc', 'dialog', 'fail', 'paintNav', 'waRepaint', '$', bloque);
  fn(documento, A, data, waNum, async () => { lecturas.push('lee'); return { docs: [] }; }, () => ({}), () => ({}), {}, () => ({}), () => ({}), planNumeros, fichaDeChat, contactoConNumero, () => persona, esc, (h) => dialogos.push(h), (e) => dialogos.push(`ERROR ${e.message}`), () => llamadas.push('nav'), () => llamadas.push('repinta'), () => ({ close() { dialogos.push('CERRADO'); } }));
  const [revisar, cerrar, aplicar] = handlers;
  const boton = { disabled: false }, clic = (sel, el) => ({ target: { closest: (q) => (q === sel ? el : null) } });
  await revisar(clic('[data-wa-revisar]', boton));
  assert.equal(boton.disabled, false); assert.equal(llamadas.length, 0, 'revisar no cambia nada');
  assert.match(dialogos[0], /<b>1<\/b> tarjeta tiene un número distinto al de su chat/); assert.match(dialogos[0], /\+595 0984479339 → <b>\+595984479339<\/b>/);
  assert.match(dialogos[0], /data-wa-aplicar-numeros>Corregir las 1</); assert.match(dialogos[0], /data-wa-cerrar>No cambiar nada/);
  cerrar(clic('[data-wa-cerrar]', {})); assert.equal(dialogos.at(-1), 'CERRADO');
  await aplicar(clic('[data-wa-aplicar-numeros]', { disabled: false }));
  assert.deepEqual(llamadas.filter((x) => x === 'update'), ['update']);
  assert.equal(persona.leads[0].waKey, '595984479339'); assert.equal(persona.leads[0].whatsapp, '+595984479339'); assert.equal(A._per, null);
  assert.match(dialogos.at(-1), /Se corrigieron <b>1<\/b> tarjeta\./);
  await aplicar(clic('[data-wa-aplicar-numeros]', { disabled: false })); // pulsar dos veces no repite nada
  assert.equal(llamadas.filter((x) => x === 'update').length, 1);
});
console.log(`\n${ok} pruebas OK`);
