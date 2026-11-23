// Prueba: el replay enviado desde el celular marca la tarjeta solo (src/lib/server/replay-eco.js y el webhook de WhatsApp). Datos inventados; la base de datos es falsa.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { marcarReplayEnviado } from '../src/lib/server/replay-eco.js';

function baseFalsa(leads) {
  const docs = new Map(Object.entries(leads).map(([id, d]) => [id, { ...d }]));
  return {
    docs,
    collection: () => ({
      where: (campo, op, valor) => ({
        limit: () => ({ get: async () => {
          const hallados = [...docs.entries()].filter(([, d]) => d[campo] === valor);
          return { empty: !hallados.length, docs: hallados.map(([id]) => ({ data: () => docs.get(id), ref: { update: async (c) => { const x = docs.get(id); for (const [k, v] of Object.entries(c)) { if (k === 'eventos') x.eventos = [...(x.eventos || []), ...v.__union]; else if (k.includes('.')) { const [a, b] = k.split('.'); x[a] = { ...(x[a] || {}), [b]: v }; } else x[k] = v; } } } })) };
        } }),
      }),
    }),
  };
}
const union = (...e) => ({ __union: e.flat() });
const llamar = (db, texto, ahora = 1000) => marcarReplayEnviado(db, { texto, ahora, arrayUnion: (e) => union(e), marca: 'HORA' });
let ok = 0;
const prueba = async (nombre, fn) => { await fn(); ok++; console.log('OK  ', nombre); };

await prueba('un mensaje con el enlace del replay de una persona marca su tarjeta como «Replay enviado» y deja el historial', async () => {
  const db = baseFalsa({ a: { codigo: 'UqpJRJUy9Npp', eventos: [] }, b: { codigo: 'OtraPersona12', eventos: [] } });
  const n = await llamar(db, 'Hola Liz 🌿 Aquí está la grabación: https://www.casamuladhara.com/clase-tarot/replay?l=UqpJRJUy9Npp Un abrazo', 5000);
  assert.equal(n, 1);
  const a = db.docs.get('a');
  assert.equal(a.replayEnviadoT, 5000); assert.equal(a.ultimoEnvio.whatsapp, 5000); assert.equal(a.updatedAt, 'HORA');
  assert.deepEqual(a.eventos, [{ t: 5000, tipo: 'envio', texto: 'Se le envió el replay desde el WhatsApp Business del celular' }]);
  assert.equal(db.docs.get('b').replayEnviadoT, undefined); // la otra persona no se toca
});
await prueba('sirve para Péndulo y Tarot, con el enlace pegado en medio del texto o al final, y con varios enlaces', async () => {
  const db = baseFalsa({ a: { codigo: 'AAAAAAAAAAAA' }, b: { codigo: 'BBBBBBBBBBBB' } });
  assert.equal(await llamar(db, 'mira: https://www.casamuladhara.com/clase-pendulo/replay?l=AAAAAAAAAAAA.'), 1);
  assert.equal(await llamar(db, 'https://www.casamuladhara.com/clase-pendulo/replay?l=BBBBBBBBBBBB\ny https://www.casamuladhara.com/clase-tarot/replay?l=AAAAAAAAAAAA'), 1); // A ya estaba marcada
  assert.ok(db.docs.get('a').replayEnviadoT && db.docs.get('b').replayEnviadoT);
});
await prueba('no marca nada con mensajes que no llevan el enlace del replay (el enlace de entrada a la clase, otras páginas, un código inexistente o texto suelto)', async () => {
  const db = baseFalsa({ a: { codigo: 'AAAAAAAAAAAA' } });
  for (const t of ['Hola, te dejo tu enlace: https://www.casamuladhara.com/entrar/AAAAAAAAAAAA', 'AAAAAAAAAAAA', 'https://www.casamuladhara.com/clase-tarot/replay', 'https://www.casamuladhara.com/clase-tarot/replay?l=ZZZZZZZZZZZZ', '', null, undefined])
    assert.equal(await llamar(db, t), 0, String(t));
});
await prueba('no pisa la fecha si ya estaba marcada, y un código más largo no cuenta', async () => {
  const db = baseFalsa({ a: { codigo: 'AAAAAAAAAAAA', replayEnviadoT: 111, eventos: [] } });
  assert.equal(await llamar(db, 'https://www.casamuladhara.com/clase-tarot/replay?l=AAAAAAAAAAAA', 999), 0);
  assert.equal(db.docs.get('a').replayEnviadoT, 111); assert.deepEqual(db.docs.get('a').eventos, []);
  const db2 = baseFalsa({ a: { codigo: 'AAAAAAAAAAAA' } });
  assert.equal(await llamar(db2, 'https://www.casamuladhara.com/clase-tarot/replay?l=AAAAAAAAAAAAB'), 0);
});
await prueba('el webhook lo llama solo para los mensajes salientes del celular (eco), sin que un error detenga el aviso de Meta', () => {
  const ruta = fs.readFileSync(new URL('../src/app/api/whatsapp/route.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  assert.ok(ruta.includes("import { marcarReplayEnviado } from '@/lib/server/replay-eco.js';"));
  const i = ruta.indexOf('for (const m of v.message_echoes || []) {'), f = ruta.indexOf('\n      }\n', i);
  const bloque = ruta.slice(i, f);
  assert.ok(bloque.includes('await marcarReplayEnviado(db(), { texto: textoDe(m), ahora: Number(m.timestamp) * 1000 || Date.now(), arrayUnion: (e) => FieldValue.arrayUnion(e), marca: FieldValue.serverTimestamp() }).catch('));
  assert.equal((ruta.match(/marcarReplayEnviado\(/g) || []).length, 1); // solo en el eco: no para los mensajes que llegan ni para los que salen del portal
});
console.log(`\n${ok} pruebas OK`);
