// Prueba: etiqueta «Falta el replay» (quién necesita que la Maestra le mande el replay a mano, desde su WhatsApp Business) en public/assets/js/admin.js.
// Datos inventados; Meta y la base de datos son falsos.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const src = fs.readFileSync(new URL('../public/assets/js/admin.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const i = src.indexOf('const finClaseMs'), j = src.indexOf('const replaySinAbrir = (l, p) =>');
assert.ok(i > 0 && j > i, 'no se encontró el bloque del replay a mano');
const bloque = src.slice(i, j);
const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
let ok = 0;
const prueba = async (nombre, fn) => { await fn(); ok++; console.log('OK  ', nombre); };

// Ahora = 21 nov 2026, 20:40 hora de Chile (clase de 19:00 a 20:00 → +30 min = 20:30)
const AHORA = Date.UTC(2026, 10, 21, 23, 40);
const FIN = Date.UTC(2026, 10, 21, 23, 0); // 20:00 de Chile (UTC-3 en noviembre)
const montar = ({ chats = [], ev = { id: 'e1', date: '2026-11-21', time: '19:00', duration: 60 }, excluida = '' } = {}) => {
  const A = { cal: ev ? [ev] : [], wa: { chats } };
  const chileAMs = (fecha, hora) => { const [y, m, d] = fecha.split('-').map(Number), [h, mi] = hora.split(':').map(Number); return Date.UTC(y, m - 1, d, h + 3, mi); };
  const tracksEn = (p, prog) => p.leads.filter((l) => prog[2].includes(l.form));
  const f = new Function('A', 'esClase', 'ofertaDe', 'claseDeL', 'chileAMs', 'excluidaDeEnvio', 'waLibre', 'chatIdDe', 'waNum', 'tracksEn', 'esc', 'Date',
    `${bloque}\nreturn { finClaseMs, claveSecuencia, replayPorEnviar, ventanaAbiertaP, replayBadge, replayBloque };`)(
    A, (f2) => f2 === 'clase-pendulo' || f2 === 'clase-tarot', () => ({}), (l) => l.clase, chileAMs, () => excluida,
    (c) => AHORA - (c?.lastInboundAt || 0) < 864e5, (n, cs) => (cs.find((c) => c.id === n)?.id || n), (n) => String(n || '').replace(/\D/g, ''), tracksEn, esc,
    class extends Date { static now() { return AHORA; } });
  return f;
};
const lead = (extra = {}) => ({ id: 'L1', form: 'clase-pendulo', clase: 'pendulo', claseEvento: 'e1', codigo: 'CODIGO123456', enlace_replay: 'https://www.casamuladhara.com/clase-pendulo/replay?l=CODIGO123456', ...extra });
const persona = (l, whatsapp = '+56 9 1111 1111') => ({ id: 'P1', whatsapp, leads: [l] });
const PROG = ['clase-pendulo', 'Clase gratis Péndulo', ['clase-pendulo']];

await prueba('desde 30 minutos después del fin de la clase y sin replay enviado, falta el replay', () => {
  const m = montar();
  assert.equal(m.finClaseMs(lead()), FIN);
  assert.equal(m.replayPorEnviar(lead(), persona(lead())), true);
});
await prueba('antes de los 30 minutos (la secuencia todavía no corre) o pasada una semana, no aparece', () => {
  const l = lead(), p = persona(l);
  const antes = montar(); // AHORA = fin + 40 min → sí; cambiamos el fin con otro evento
  assert.equal(montar({ ev: { id: 'e1', date: '2026-11-21', time: '20:30', duration: 60 } }).replayPorEnviar(l, p), false); // termina a las 21:30: aún no
  assert.equal(montar({ ev: { id: 'e1', date: '2026-11-10', time: '19:00', duration: 60 } }).replayPorEnviar(l, p), false); // hace 11 días
  assert.equal(antes.replayPorEnviar(l, p), true);
});
await prueba('se quita cuando el replay ya salió solo (gracias o replay en la secuencia), cuando se marcó a mano o cuando ya lo vio', () => {
  const m = montar(), p = (l) => persona(l);
  for (const l of [lead({ secuencia: { c_e1: { gracias: { t: 1 } } } }), lead({ secuencia: { c_e1: { replay: { t: 1 } } } }), lead({ replayEnviadoT: AHORA - 1000 }), lead({ replayT: AHORA - 1000 })]) assert.equal(m.replayPorEnviar(l, p(l)), false);
  assert.equal(m.replayPorEnviar(lead({ secuencia: { c_otra: { gracias: { t: 1 } } } }), p(lead())), true); // el replay de OTRA clase no cuenta
});
await prueba('no aparece para quien no se debe escribir (compró, pidió no contactar…), sin clase, o sin enlace', () => {
  const l = lead(), p = persona(l);
  assert.equal(montar({ excluida: 'Ya compró' }).replayPorEnviar(l, p), false);
  assert.equal(montar().replayPorEnviar(lead({ form: 'pendulo' }), p), false); // no es una clase gratis
  assert.equal(montar().replayPorEnviar(lead({ claseEvento: '' }), p), false);
  assert.equal(montar({ ev: null }).replayPorEnviar(lead({ claseFecha: '' }), p), false); // sin fecha de clase
  assert.equal(montar().replayPorEnviar(lead({ enlace_replay: '', codigo: '' }), p), false);
});
await prueba('la clave de la secuencia es la misma que usa el servidor (con caracteres raros)', () => {
  const m = montar();
  assert.equal(m.claveSecuencia({ claseEvento: 'abc-123' }), 'c_abc_123'); assert.equal(m.claveSecuencia({ claseEvento: 'E1' }), 'c_E1');
  const srv = fs.readFileSync(new URL('../src/lib/server/secuencia.js', import.meta.url), 'utf8');
  assert.ok(srv.includes("const sano = (k) => `c_${String(k).replace(/[^A-Za-z0-9]/g, '_')}`;"));
});
await prueba('la etiqueta distingue a quien tiene la ventana de 24 h abierta (sale solo) de quien la tiene cerrada (hay que mandarlo desde el celular)', () => {
  const l = lead(), p = persona(l, '+56 9 1111 1111');
  const cerrada = montar({ chats: [{ id: '56911111111', lastInboundAt: AHORA - 30 * 36e5 }] }), abierta = montar({ chats: [{ id: '56911111111', lastInboundAt: AHORA - 2 * 36e5 }] }), sinChat = montar();
  assert.match(cerrada.replayBadge(p, PROG), /pill bad[^>]*>Replay · desde el celular</);
  assert.match(sinChat.replayBadge(p, PROG), /Replay · desde el celular/);
  assert.match(abierta.replayBadge(p, PROG), /pill lock[^>]*>Falta el replay</);
  assert.equal(abierta.replayBadge(persona(lead({ replayEnviadoT: AHORA - 1 })), PROG), ''); // ya enviado: sin etiqueta
  assert.equal(abierta.replayBadge(p, ['pendulo', 'Curso Péndulo', ['pendulo']]), ''); // en otro programa no se muestra
  assert.match(abierta.replayBadge(p, null), /Falta el replay/); // en «Todos» mira todos sus registros
});
await prueba('la ficha muestra qué hacer según la ventana, el enlace del replay y el botón «Ya le envié el replay»', () => {
  const l = lead(), p = persona(l);
  const cerrada = montar().replayBloque(l, p), abierta = montar({ chats: [{ id: '56911111111', lastInboundAt: AHORA - 2 * 36e5 }] }).replayBloque(l, p);
  assert.ok(cerrada.includes('Falta enviarle el replay') && cerrada.includes('ventana de 24 h está cerrada') && cerrada.includes('WhatsApp Business (es gratis)'));
  assert.ok(abierta.includes('ventana de 24 h está abierta') && abierta.includes('le sale solo (gratis)'));
  for (const h of [cerrada, abierta]) assert.ok(h.includes('https://www.casamuladhara.com/clase-pendulo/replay?l=CODIGO123456') && h.includes('data-replay-hecho="L1"') && h.includes('Ya le envié el replay'));
  assert.equal(montar().replayBloque(lead({ replayEnviadoT: 1 }), p), '');
});
await prueba('el botón «Ya le envié el replay» anota el envío (replay:true, por WhatsApp) y recarga la ficha', async () => {
  const k = src.indexOf("  document.querySelectorAll('#dlg [data-replay-hecho]')"), k2 = src.indexOf("\n  }));\n", k) + 8;
  assert.ok(k > 0 && k2 > k, 'no se encontró el botón');
  const llamadas = [], toasts = [];
  const l = lead(), p = { id: 'P1', leads: [l] };
  let click; const b = { dataset: { replayHecho: 'L1' }, disabled: false };
  const fn = new Function('document', 'p', 'data', 'refrescar', 'leadFichaSimple', 'id', 'toast', 'fail', src.slice(k, k2));
  fn({ querySelectorAll: () => ({ forEach: (f2) => f2(b) }) }, p, { leads: async (x) => llamadas.push(x) }, () => llamadas.push('refrescar'), () => llamadas.push('ficha'), 'P1', (m) => toasts.push(m), (e) => toasts.push(`ERROR ${e.message}`));
  await b.onclick();
  assert.deepEqual(llamadas[0], { action: 'enviado', ids: ['L1'], canal: 'whatsapp', plantilla: 'replay (desde el celular)', replay: true });
  assert.ok(l.replayEnviadoT > 0 && l.ultimoEnvio.whatsapp > 0); assert.deepEqual(llamadas.slice(1), ['refrescar', 'ficha']); assert.equal(toasts[0], 'Anotado: se le envió el replay.');
  const malo = lead(); const b2 = { dataset: { replayHecho: 'L1' }, disabled: false }, t2 = [];
  new Function('document', 'p', 'data', 'refrescar', 'leadFichaSimple', 'id', 'toast', 'fail', src.slice(k, k2))({ querySelectorAll: () => ({ forEach: (f2) => f2(b2) }) }, { id: 'P1', leads: [malo] }, { leads: async () => { throw new Error('sin conexión'); } }, () => {}, () => {}, 'P1', () => {}, (e) => t2.push(e.message));
  await b2.onclick(); assert.deepEqual(t2, ['sin conexión']); assert.equal(b2.disabled, false); assert.equal(malo.replayEnviadoT, undefined);
});
await prueba('el pipeline: etiqueta en la tarjeta, chip «Falta el replay (n)» solo en las clases, filtro que se reinicia, y el bloque en la ficha', () => {
  assert.match(src, /\$\{bienvenidaBadge\(p, prog\)\}\$\{prog \? replayBadge\(p, prog\) : ''\}\$\{asistPersona\(p\)\}/);
  assert.ok(src.includes('${prog && esClase(prog[0]) ? `<button type="button" class="chip" data-crm-replay aria-pressed="${!!S.crmReplay}"'));
  assert.ok(src.includes("&& (!S.crmReplay || !prog || tracksEn(p, prog).some((l) => replayPorEnviar(l, p)))"));
  assert.ok(src.includes('S.crmBF || S.crmSinBv || S.crmReplay ||') && src.includes("crmReplay: false, crmTag: '', crmSeg:") && src.includes('S.crmSinBv = false; S.crmReplay = false;'));
  assert.ok(src.includes("[data-crm-replay]').forEach((b) => (b.onclick = () => { S.crmReplay = !S.crmReplay; render(false); }));"));
  assert.ok(src.includes('Se le dio la bienvenida</label>\n      ${replayBloque(l, p)}'));
});
console.log(`\n${ok} pruebas OK`);
