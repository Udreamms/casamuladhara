// Pruebas de la etiqueta, el filtro y el bono de exalumna de Black Friday (datos inventados, sin Firestore real). Uso: node scripts/pruebas_crm_black_friday.mjs
import assert from 'node:assert/strict';
import { blackFridayDe, esExalumna, textoBono, BONO_EXALUMNA } from '../public/assets/js/black-friday.js';

const pagoHecho = (l) => !!(l.pago?.t || (l.pagos || []).length || l.saldoPagado);
const bf = (plan, t = 1) => ({ plan, t });

// Etiqueta: solo con lead.blackFriday; conserva la postulación en la misma ficha
assert.equal(blackFridayDe([{ form: 'formacion' }]), null);
assert.deepEqual(blackFridayDe([{ form: 'formacion', postulacion: { x: 1 }, blackFriday: bf('9 cuotas de $39.000', 5) }]), { plan: '9 cuotas de $39.000', t: 5 });
assert.equal(blackFridayDe([{ blackFriday: bf('A', 1) }, { blackFriday: bf('$224.000 al contado', 9) }]).plan, '$224.000 al contado');
assert.equal(blackFridayDe([{ blackFriday: 'x' }]), null);

// Bono: pagos de Péndulo o Tarot (uno, otro o los dos); la misma persona por correo/WhatsApp ya viene agrupada en leads
assert.equal(esExalumna([{ form: 'formacion' }], pagoHecho), false);
assert.equal(esExalumna([{ form: 'pendulo', pagos: [{}] }], pagoHecho), true);
assert.equal(esExalumna([{ form: 'tarot', pago: { t: 1 } }], pagoHecho), true);
assert.equal(esExalumna([{ form: 'pendulo' }], pagoHecho), false, 'interesada sin pago no es exalumna');
assert.equal(esExalumna([{ form: 'formacion' }], pagoHecho, [1]), true, 'alumna con Péndulo comprado en el aula');
assert.equal(esExalumna([{ form: 'formacion' }], pagoHecho, [2, 3]), false);

// Texto para Karen
assert.equal(BONO_EXALUMNA, 20000);
assert.match(textoBono('$224.000 al contado'), /bono de \$20\.000\. Al contado: \$204\.000\./);
assert.match(textoBono('9 cuotas de $39.000'), /1\.ª de \$19\.000 y las otras 8 de \$39\.000/);
console.log('pruebas_crm_black_friday: todo bien');
