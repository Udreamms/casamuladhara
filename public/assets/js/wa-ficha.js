// Ayudantes del chat de WhatsApp del portal (sin dependencias, para poder probarlos): encontrar la tarjeta de un chat y el chat de una tarjeta,
// aunque el número venga escrito de otra manera (Argentina con y sin el 9, México con y sin el 1) o la persona haya escrito desde otro número con su «Mi código».
export const variantesNum = (numero) => {
  const n = String(numero || '').replace(/\D/g, ''), v = new Set(n ? [n] : []);
  if (/^549\d{10}$/.test(n)) v.add(`54${n.slice(3)}`); else if (/^54\d{10}$/.test(n)) v.add(`549${n.slice(2)}`);
  if (/^521\d{10}$/.test(n)) v.add(`52${n.slice(3)}`); else if (/^52\d{10}$/.test(n)) v.add(`521${n.slice(2)}`);
  return [...v];
};

// El id del chat de un número: el que ya existe (con o sin el 9) o, si no hay chat, el mismo número
export const chatIdDe = (num, chats) => {
  if (!num) return num;
  const v = variantesNum(num);
  return (chats || []).find((c) => v.includes(c.id))?.id || num;
};

const RE_CODIGO = /mi c[oó]digo:?\s*([A-Za-z0-9]{8,20})/i;
// La tarjeta (registro) de un chat: primero por su número (en cualquiera de sus dos formas) y, si no, por el «Mi código: XXXX» que escribió.
// Devuelve { lead, por: 'número' | 'código' } o null. waNum = cómo el portal normaliza un número.
export const fichaDeChat = (chatId, msgs, leads, waNum) => {
  const v = variantesNum(chatId), todas = leads || [];
  const porNumero = todas.filter((l) => v.includes(waNum(l.whatsapp)) || v.includes(String(l.waKey || '')));
  if (porNumero.length) return { lead: porNumero.find((l) => l.codigo) || porNumero[0], por: 'número' };
  for (const m of msgs || []) {
    if (m.dir !== 'in') continue;
    const codigo = String(m.text || '').match(RE_CODIGO)?.[1];
    const l = codigo ? todas.find((x) => x.codigo === codigo) : null;
    if (l) return { lead: l, por: 'código' };
  }
  return null;
};

// País según el código del número (los de uso más común aquí); si no lo conocemos, devuelve ''
const CODIGOS_PAIS = { 1: 'Estados Unidos', 34: 'España', 51: 'Perú', 52: 'México', 53: 'Cuba', 54: 'Argentina', 55: 'Brasil', 56: 'Chile', 57: 'Colombia', 58: 'Venezuela',
  502: 'Guatemala', 503: 'El Salvador', 504: 'Honduras', 505: 'Nicaragua', 506: 'Costa Rica', 507: 'Panamá', 591: 'Bolivia', 593: 'Ecuador', 595: 'Paraguay', 598: 'Uruguay' };
export const paisDeNumero = (numero) => {
  const n = String(numero || '').replace(/\D/g, '');
  return CODIGOS_PAIS[n.slice(0, 3)] || CODIGOS_PAIS[n.slice(0, 2)] || CODIGOS_PAIS[n.slice(0, 1)] || '';
};

// Datos de contacto de una persona con el número desde el que escribió: nombre y correo no cambian; el país pasa al del nuevo número si lo conocemos.
// Devuelve { contacto, pregunta } (pregunta = el texto de confirmación para la Maestra).
export const contactoConNumero = (persona, chatId) => {
  const n = String(chatId || '').replace(/\D/g, ''), pais = paisDeNumero(n) || persona.country || '';
  const contacto = { name: persona.nombre || '', email: persona.email || '', whatsapp: `+${n}`, country: pais };
  const cambiaPais = pais && pais !== (persona.country || '');
  return { contacto, pregunta: `¿Guardar +${n} como el WhatsApp de ${persona.nombre}? Hoy tiene ${persona.whatsapp || 'ninguno'}${cambiaPais ? ` y el país pasa a ${pais}` : ''}.` };
};
