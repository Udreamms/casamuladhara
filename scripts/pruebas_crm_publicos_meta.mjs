// Pruebas de los públicos para Meta (datos inventados, sin Firestore real). Uso: node scripts/pruebas_crm_publicos_meta.mjs
import assert from 'node:assert/strict';
import { construirPublicos, csvPublico, normalizaTel, normalizaEmail, primerNombre } from '../public/assets/js/publicos-meta.js';

const pagoHecho = (l) => !!(l.pago?.t || (l.pagos || []).length || l.saldoPagado);
const ctx = { pagoHecho, etapaDe: (l) => l.status || 'nuevo', niveles: (p) => p.niveles || [], pagaAula: (p) => !!p.paga };
const P = (id, nombre, email, whatsapp, leads, extra = {}) => ({ id, nombre, email, whatsapp, leads, ...extra });
const pos = { motivo: 'x', t: 1 };

// Teléfonos
assert.equal(normalizaTel('9 1234 5678').tel, '+56912345678');
assert.equal(normalizaTel('+56 9 1234 5678').tel, '+56912345678');
assert.equal(normalizaTel('56912345678').tel, '+56912345678');
assert.equal(normalizaTel('+54 9 11 2233 4455').tel, '+5491122334455', 'otro país válido se deja tal cual');
assert.equal(normalizaTel('+34 612 345 678').tel, '+34612345678');
assert.equal(normalizaTel('12345').problema, '12345');
assert.equal(normalizaTel('+56 9 123').tel, '', '+56 con largo malo no se arregla');
assert.equal(normalizaTel('').problema, '');
assert.equal(normalizaEmail('  Ana@Correo.CL '), 'ana@correo.cl');
assert.equal(normalizaEmail('=cmd@x.com'), '');
assert.equal(primerNombre('=HYPERLINK("x") Ana'), 'HYPERLINK("x")');
assert.equal(primerNombre('  -Ana Pérez'), 'Ana');

const personas = [
  P('1', 'Alma Pendulo', 'ALMA@x.cl', '912345678', [{ form: 'pendulo', pagos: [{}] }]),
  P('2', 'Tania Tarot', 'tania@x.cl', '', [{ form: 'tarot', pago: { t: 1 } }]),
  P('3', 'Fabi Formación', 'fabi@x.cl', '+56 9 8888 7777', [{ form: 'formacion', postulacion: pos, blackFriday: { plan: 'p', t: 1 }, pago: { t: 2 } }]),
  P('4', 'Lola Aula', 'lola@x.cl', '', [{ form: 'clase-pendulo' }], { niveles: [1] }),
  P('5', 'Paula Postuló', 'paula@x.cl', '977776666', [{ form: 'formacion', postulacion: pos }]),
  P('6', 'Bea BlackFriday', 'bea@x.cl', '966665555', [{ form: 'formacion', blackFriday: { plan: 'p', t: 1 } }]),
  P('7', 'Paga Aula', 'aula@x.cl', '', [{ form: 'formacion', postulacion: pos }], { paga: true }),
  P('8', 'Desc Descartada', 'desc@x.cl', '955554444', [{ form: 'formacion', postulacion: pos, status: 'descartado' }]),
  P('9', 'Duplicada Postuló', 'PAULA@x.cl', '', [{ form: 'formacion', postulacion: pos }]), // mismo correo que 5
  P('10', 'Otra Misma', 'otra@x.cl', '977776666', [{ form: 'formacion', blackFriday: { plan: 'p', t: 1 } }]), // mismo WhatsApp que 5
  P('11', '=Malo', 'malo@x.cl', '12345', [{ form: 'formacion', postulacion: pos }]),
  P('12', 'Sin Datos', '', '', [{ form: 'formacion', postulacion: pos }]),
  P('13', 'Solo Interesada', 'sola@x.cl', '', [{ form: 'clase-tarot' }]),
  P('14', 'Alumna Descartada', 'alu@x.cl', '', [{ form: 'pendulo', pagos: [{}], status: 'descartado' }]),
];
const r = construirPublicos(personas, ctx);
const em = (a) => a.map((f) => f.email || f.fn);

// Alumnas: Péndulo, Tarot, Formación pagada, nivel del aula, pago del aula
assert.deepEqual(em(r.alumnas), ['alma@x.cl', 'tania@x.cl', 'fabi@x.cl', 'lola@x.cl', 'aula@x.cl']);
// Levantaron la mano: postularon o Black Friday sin pagar, sin duplicados, sin Descartadas
assert.deepEqual(em(r.manoLevantada), ['paula@x.cl', 'bea@x.cl', 'malo@x.cl'], '9 (mismo correo) y 10 (mismo WhatsApp) no se repiten; 12 sin contacto no sale');
assert.ok(!em(r.manoLevantada).includes('desc@x.cl'), 'Descartada fuera');
assert.ok(!em(r.alumnas).includes('alu@x.cl') && !em(r.manoLevantada).includes('alu@x.cl'), 'ficha Descartada sin otra cosa: fuera');
// Ninguna persona pagada sale en «Levantaron la mano»
const pagadas = new Set(r.alumnas.map((f) => f.email));
assert.ok(r.manoLevantada.every((f) => !pagadas.has(f.email)));
// Compradoras BF: ficha con blackFriday y pago
assert.deepEqual(em(r.compradorasBF), ['fabi@x.cl']);
// Formato
assert.equal(r.alumnas[0].phone, '+56912345678');
assert.equal(r.alumnas[0].country, 'cl');
assert.equal(r.manoLevantada[0].phone, '+56977776666');
assert.equal(r.manoLevantada.find((f) => f.email === 'malo@x.cl').phone, '', 'teléfono malo va vacío');
assert.equal(r.manoLevantada.find((f) => f.email === 'malo@x.cl').fn, 'Malo', 'sin = al inicio');
assert.equal(r.avisos.telefonosMalos.length, 1);
assert.equal(r.avisos.sinContacto, 1);

// CSV: BOM, comillas, escapes, sin inyección
const csv = csvPublico([{ email: 'a@x.cl', phone: '+56911111111', fn: '=2+3', country: 'cl' }, { email: 'b@x.cl', phone: '', fn: 'Ana "la" Ñandú', country: 'cl' }]);
assert.ok(csv.startsWith('﻿"email","phone","fn","country"\r\n'));
assert.match(csv, /"\+56911111111"/);
assert.match(csv, /"'=2\+3"/);
assert.match(csv, /"Ana ""la"" Ñandú"/);
console.log('OK pruebas_crm_publicos_meta');
