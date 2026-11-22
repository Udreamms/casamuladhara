// Prueba: en el chat de WhatsApp del portal, encontrar la tarjeta de quien escribe (por número, con o sin el 9 de Argentina, o por su «Mi código»)
// y que la ficha encuentre su chat. Datos inventados; no usa la base de datos.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chatIdDe, contactoConNumero, fichaDeChat, paisDeNumero, variantesNum } from '../public/assets/js/wa-ficha.js';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
// Como normaliza el portal un número (admin.js: waNum)
const waNum = (n) => { let d = String(n || '').replace(/\D/g, '').replace(/^00/, ''); if (d.length === 9 && d[0] === '9') d = `56${d}`; return d.length >= 8 && d.length <= 15 ? d : ''; };
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
  assert.match(src, /import \{ chatIdDe, contactoConNumero, fichaDeChat, variantesNum \} from '\.\/wa-ficha\.js';/);
  assert.match(src, /const fi = A\.leads \? fichaDeChat\(n, A\.wa\.msgs, A\.leads, waNum\) : undefined;/);
  assert.ok(src.includes('data-wa-tarjeta="${esc(fi.lead.id)}"') && src.includes('data-wa-enlace="${esc(fi.lead.id)}"') && src.includes('No tiene tarjeta en Interesadas.'));
  assert.ok(src.includes("${libre ? `<button class=\"btn btn-ghost btn-sm\" data-wa-enlace"), 'el botón del enlace solo aparece si se le puede escribir libremente');
  assert.match(src, /if \(!A\.leads\) data\.leads\(\)\.then\(\(\) => \{ if \(S\.view === 'whatsapp'\) waRepaint\(true\); \}\)/);
});
prueba('la ficha busca su chat con las dos formas del número (las 4 veces que lo usa) y el nombre del chat también', () => {
  assert.equal((src.match(/chatIdDe\(waNum\(p\.whatsapp\), A\.wa\.chats\)/g) || []).length, 4);
  assert.match(src, /A\.leads\?\.find\(\(l\) => variantesNum\(n\)\.includes\(waNum\(l\.whatsapp\)\)\)\?\.name/);
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
prueba('el portal: el botón solo aparece cuando la tarjeta se encontró por su código; pide confirmación, actualiza todas sus fichas y recarga el chat', () => {
  assert.ok(src.includes("${fi.por === 'código' ? `<button class=\"btn btn-ghost btn-sm\" data-wa-usar-numero=\"${esc(fi.lead.id)}\""));
  assert.match(src, /const \{ contacto, pregunta \} = contactoConNumero\(per, S\.waOpen\);\n\s+if \(!confirm\(pregunta\)\) return;/);
  assert.match(src, /await data\.leads\(\{ action: 'update', ids: per\.leads\.map\(\(l\) => l\.id\), contacto \}\);/);
  assert.match(src, /per\.leads\.forEach\(\(l\) => Object\.assign\(l, contacto, \{ email: String\(contacto\.email\)\.toLowerCase\(\), waKey: S\.waOpen \}\)\);/);
  assert.match(src, /A\._per = null; paintNav\(\); waRepaint\(true\); toast\('Listo: su tarjeta ahora tiene el número de este chat\.'\)/);
  assert.match(src, /import \{ chatIdDe, contactoConNumero, fichaDeChat, variantesNum \} from/);
});
prueba('servidor: al editar el WhatsApp de una tarjeta también se actualiza su clave (waKey), que usan la secuencia y la ficha automática', () => {
  const ruta = fs.readFileSync(new URL('../src/app/api/leads/route.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.ok(ruta.includes('Object.assign(cambios, { name, email, whatsapp, country, waKey: waClave(whatsapp) });'));
  assert.equal((ruta.match(/waKey: waClave\(/g) || []).length, 2); // el registro nuevo y la edición de contacto
});
console.log(`\n${ok} pruebas OK`);
