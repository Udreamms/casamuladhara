// Ficha automática: quien escribe por WhatsApp sin haberse registrado queda con ficha en el CRM (form 'whatsapp', etapa «Nueva», origen orgánico).
// Antes esa persona solo aparecía en la pestaña WhatsApp. No se crea ficha si:
//   · ya hay una con ese número (también en la otra forma de escribirlo: los celulares de Argentina con y sin el 9, los de México con y sin el 1), o
//   · el mensaje trae su «Mi código: XXXX» y ese código ya tiene ficha (se registró con otro número: no se duplica).
// No guarda consentimiento: escribirnos no es aceptar mensajes automáticos, así que la secuencia no le envía nada por su cuenta.
// Sin importaciones, para poder probarlo con una base falsa. `marca` es la hora del servidor (FieldValue.serverTimestamp()).
const RE_CODIGO = /mi c[oó]digo:?\s*([A-Za-z0-9]{8,20})/i;

// El mismo celular puede venir escrito de dos maneras según quién lo guardó (Argentina: 54 9 ...; México: 52 1 ...)
export function variantesNumero(numero) {
  const n = String(numero || '').replace(/\D/g, ''), v = new Set(n ? [n] : []);
  if (/^549\d{10}$/.test(n)) v.add(`54${n.slice(3)}`);
  else if (/^54\d{10}$/.test(n)) v.add(`549${n.slice(2)}`);
  if (/^521\d{10}$/.test(n)) v.add(`52${n.slice(3)}`);
  else if (/^52\d{10}$/.test(n)) v.add(`521${n.slice(2)}`);
  return [...v];
}

// fecha (opcional): cuándo escribió por primera vez; si no se da, la ficha queda con la hora actual (`marca`)
export async function asegurarFicha(firestore, { numero, nombre = '', texto = '', marca, fecha }) {
  const n = String(numero || '').replace(/\D/g, '');
  if (!n) return { creada: false, motivo: 'sin número' };
  const hay = await firestore.collection('leads').where('waKey', 'in', variantesNumero(n)).limit(1).get();
  if (!hay.empty) return { creada: false, motivo: 'ya tiene ficha' };
  const codigo = String(texto || '').match(RE_CODIGO)?.[1];
  if (codigo) {
    const porCodigo = await firestore.collection('leads').where('codigo', '==', codigo).limit(1).get();
    if (!porCodigo.empty) { const d = porCodigo.docs[0]; return { creada: false, motivo: 'su código ya tiene ficha', ficha: { id: d.id, nombre: String(d.data().name || '') } }; }
  }
  const ahora = Date.now(), primero = String(texto || '').replace(/\s+/g, ' ').trim().slice(0, 300);
  try {
    // id fijo por número: dos mensajes casi a la vez caen en el mismo documento y create() deja solo uno
    await firestore.doc(`leads/wa${n}`).create({
      form: 'whatsapp', name: String(nombre || '').trim().slice(0, 120) || `+${n}`, email: '', whatsapp: `+${n}`, country: '',
      interest: 'Escribió por WhatsApp', message: primero, page: 'WhatsApp', utm: {}, status: 'nuevo', waKey: n,
      eventos: [{ t: ahora, tipo: 'evento', texto: `Escribió por WhatsApp${primero ? `: ${primero.slice(0, 140)}` : ''}` }],
      createdAt: fecha || marca, updatedAt: marca,
    });
    return { creada: true };
  } catch (e) {
    if (e?.code === 6 || /ALREADY_EXISTS/.test(String(e?.message))) return { creada: false, motivo: 'ya existe' };
    throw e;
  }
}

// Una sola vez, a pedido de la Maestra: crea la ficha de cada chat que todavía no tiene (los que escribieron antes de que existiera la ficha automática).
// No envía nada. Si el mensaje trae «Mi código» de alguien ya registrado con otro número, no la duplica: queda en `otras` para que la encuentre por su nombre.
export async function crearFichasFaltantes(firestore, { marca, tope = 500 }) {
  const chats = await firestore.collection('wa_chats').limit(tope).get();
  const salida = { total: chats.docs.length, creadas: 0, yaTenian: 0, otras: [] };
  for (const c of chats.docs) {
    const d = c.data() || {}, msgs = await firestore.collection(`wa_chats/${c.id}/messages`).orderBy('ts', 'asc').limit(8).get();
    const entrantes = msgs.docs.map((m) => m.data()).filter((m) => m.dir === 'in');
    const texto = entrantes.map((m) => m.text || '').join(' ') || d.lastText || '';
    const r = await asegurarFicha(firestore, { numero: c.id, nombre: d.name || '', texto, marca, fecha: entrantes[0]?.ts });
    if (r.creada) salida.creadas++;
    else if (r.ficha) salida.otras.push({ numero: c.id, nombre: d.name || '', ficha: r.ficha.nombre });
    else salida.yaTenian++;
  }
  return salida;
}
