// Prueba: en el pipeline de las clases, mover una tarjeta a mano gana sobre la marca de «Replay enviado» (public/assets/js/admin.js). Datos inventados.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const i = src.indexOf('const ultimaEtapaT'), j = src.indexOf('const etapaPipe = (l) => {');
assert.ok(i > 0 && j > i, 'no se encontró el bloque');
const { replayPendiente, ultimaEtapaT } = new Function(`${src.slice(i, j)}\nreturn { replayPendiente, ultimaEtapaT };`)();
let ok = 0;
const prueba = (nombre, fn) => { fn(); ok++; console.log('OK  ', nombre); };
const H = 36e5, T = Date.UTC(2026, 10, 21, 15, 0, 0);

prueba('con la marca del replay y sin cambios de etapa: sigue en «Replay enviado»', () => {
  assert.equal(replayPendiente({ replayEnviadoT: T, eventos: [] }), true);
  assert.equal(replayPendiente({ replayEnviadoT: T }), true);
  assert.equal(replayPendiente({ replayEnviadoT: T, eventos: [{ t: T - H, tipo: 'etapa', texto: 'Etapa: Se registró' }] }), true); // la movió ANTES del replay
});
prueba('si la Maestra la mueve a mano DESPUÉS del replay, gana lo que ella eligió', () => {
  assert.equal(replayPendiente({ replayEnviadoT: T, eventos: [{ t: T + H, tipo: 'etapa', texto: 'Etapa: Ingresó a la clase' }] }), false);
  assert.equal(ultimaEtapaT({ eventos: [{ t: 5, tipo: 'etapa' }, { t: 9, tipo: 'etapa' }, { t: 99, tipo: 'envio' }] }), 9);
});
prueba('si después se vuelve a marcar el replay (más nuevo que su movimiento), vuelve a «Replay enviado»', () => {
  assert.equal(replayPendiente({ replayEnviadoT: T + 2 * H, eventos: [{ t: T + H, tipo: 'etapa' }] }), true);
});
prueba('sin marca de replay nunca está pendiente; los eventos raros no rompen nada', () => {
  assert.equal(replayPendiente({ eventos: [{ t: T, tipo: 'etapa' }] }), false);
  assert.equal(replayPendiente({ replayEnviadoT: T, eventos: [null, { tipo: 'etapa' }, { t: 'x', tipo: 'etapa' }] }), true);
});
prueba('el pipeline de las clases usa esa regla, y la marca del replay no se borra (los listados de replay siguen igual)', () => {
  assert.match(src, /\['registrada', 'entro', 'no_asistio'\]\.includes\(k\) && replayPendiente\(l\)\) k = 'replay_enviado';/);
  assert.ok(!/includes\(k\) && l\.replayEnviadoT\)/.test(src));
  assert.match(src, /'Recibieron el replay', \(l\) => !!l\.replayEnviadoT/);
});
console.log(`\n${ok} pruebas OK`);
