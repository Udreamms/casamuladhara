// Prueba de las respuestas rápidas del chat (public/assets/js/admin.js). Datos inventados; no usa la base de datos ni WhatsApp.
// Toma del archivo el bloque RESPUESTAS / ctxRespuesta y lo ejecuta con piezas falsas.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8');
const ini = src.indexOf('const RESPUESTAS = [');
const fin = src.indexOf('// Conversación de WhatsApp dentro de la ficha');
assert.ok(ini > 0 && fin > ini, 'no se encontró el bloque de respuestas rápidas');

const DIA_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']; // en admin.js ya existe más abajo (la usa el calendario)
const MES_N = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const tOf = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const LEAD_FORMS = { pendulo: 'Péndulo Hebreo', 'clase-pendulo': 'Clase gratis Péndulo', tarot: 'Tarot Terapéutico', 'clase-tarot': 'Clase gratis Tarot' };
const esClase = (f) => f === 'clase-pendulo' || f === 'clase-tarot';
const fechaLarga = (s) => s;
const A = { cal: [{ id: 'ev1', time: '19:00' }] };
const { RESPUESTAS, ctxRespuesta } = new Function('DIA_LARGO', 'MES_N', 'tOf', 'LEAD_FORMS', 'esClase', 'fechaLarga', 'A', `${src.slice(ini, fin)}\nreturn { RESPUESTAS, ctxRespuesta };`)(DIA_LARGO, MES_N, tOf, LEAD_FORMS, esClase, fechaLarga, A);

let ok = 0;
const prueba = (nombre, fn) => { fn(); ok++; console.log('OK  ', nombre); };
const texto = (titulo, p) => RESPUESTAS.find(([t]) => t.startsWith(titulo))[1](ctxRespuesta(p));
const tarot = { nombre: 'Dorysiña Villalva', leads: [{ form: 'clase-tarot', claseFecha: '2026-12-01', claseEvento: 'ev1', enlace_entrada: 'https://www.casamuladhara.com/entrar/de0PtAURPX0W' }] };

prueba('hay 6 respuestas: las 3 nuevas y las 3 que se mantienen (la de bienvenida reemplaza a «Link de la clase»)', () => {
  assert.deepEqual(RESPUESTAS.map(([t]) => t), ['Bienvenida (link de la clase)', 'Compromiso de asistir en vivo', 'Confirmación (respondió «sí»)', 'Recordatorio de la clase', 'Después de la clase', 'Contarle del curso']);
});
prueba('bienvenida (Tarot): idéntica al texto pedido, con el día completo y el link solo en su línea', () => {
  assert.equal(texto('Bienvenida', tarot),
    'Hola, Dorysiña! Qué alegría que te hayas registrado. Este es tu link personal para la clase gratis de Tarot Terapéutico, donde vas a aprender a usar las cartas para conocerte y acompañar a otras personas:\nhttps://www.casamuladhara.com/entrar/de0PtAURPX0W\nNos vemos el martes 1 de diciembre a las 19:00 (hora de Chile) ✨\n\nSolo para que sepas: te enviaré unos recordatorios por aquí antes de la clase.');
});
prueba('compromiso (Tarot): texto pedido', () => {
  assert.equal(texto('Compromiso', tarot),
    'Una cosita más, Dorysiña 💛 Esta clase la preparé para vivirla en vivo, porque ahí es donde podrás hacer preguntas, sentir las cartas y hacer las lecturas conmigo. ¿Me respondes con un "sí" si te comprometes a estar el martes 1 de diciembre a las 19:00?');
});
prueba('confirmación: fecha y hora de cada contacto', () => {
  assert.equal(texto('Confirmación', tarot), '¡Maravilloso! 🙌 Ya te espero el martes 1 de diciembre a las 19:00 (hora de Chile).');
  const otra = { nombre: 'Ana', leads: [{ form: 'clase-tarot', claseFecha: '2026-12-08', claseEvento: 'ev1' }] };
  assert.match(texto('Confirmación', otra), /el martes 8 de diciembre a las 19:00/);
});
prueba('Péndulo: no promete «las cartas» y usa «Péndulo Hebreo»', () => {
  const p = { nombre: 'Luz', leads: [{ form: 'clase-pendulo', claseFecha: '2026-12-02', claseEvento: 'ev1', enlace_entrada: 'https://x/entrar/ABC' }] };
  const b = texto('Bienvenida', p), c = texto('Compromiso', p);
  assert.match(b, /clase gratis de Péndulo Hebreo:\n/);
  assert.ok(!/cartas/.test(b) && !/cartas/.test(c));
  assert.match(b, /el miércoles 2 de diciembre a las 19:00/);
});
prueba('sin fecha de clase ni enlace: no inventa nada y avisa que falta el enlace', () => {
  const p = { nombre: 'Sol', leads: [{ form: 'clase-tarot' }] };
  const b = texto('Bienvenida', p);
  assert.match(b, /falta su enlace personal/);
  assert.match(b, /Nos vemos en la clase ✨\n\nSolo para que sepas: te enviaré unos recordatorios por aquí antes de la clase\.$/);
  assert.match(texto('Confirmación', p), /Ya te espero en la clase\.$/);
  assert.ok(!/undefined|null/.test(RESPUESTAS.map(([, f]) => f(ctxRespuesta(p))).join('\n')));
});
prueba('sin hora en el calendario: solo el día', () => {
  const p = { nombre: 'Eva', leads: [{ form: 'clase-tarot', claseFecha: '2026-12-01', claseEvento: 'nada' }] };
  assert.match(texto('Compromiso', p), /a estar el martes 1 de diciembre\?$/);
});
prueba('las otras 3 respuestas siguen igual', () => {
  assert.match(texto('Recordatorio', tarot), /^Hola Dorysiña, te recuerdo tu clase gratis de Tarot/);
  assert.match(texto('Después', tarot), /¿cómo te fue en la clase de Tarot\?/);
  assert.match(texto('Contarle', tarot), /cómo inscribirte/);
});
console.log(`\n${ok} pruebas OK`);
