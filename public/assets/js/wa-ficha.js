// Ayudantes del chat de WhatsApp del portal (sin dependencias, para poder probarlos): encontrar la tarjeta de un chat y el chat de una tarjeta,
// aunque el número venga escrito de otra manera (Argentina con y sin el 9, México con y sin el 1, un 0 de más después del código de país como en +595 0984…)
// o la persona haya escrito desde otro número con su «Mi código».

// País según el código del número (los de uso más común aquí)
const CODIGOS_PAIS = { 1: 'Estados Unidos', 34: 'España', 51: 'Perú', 52: 'México', 53: 'Cuba', 54: 'Argentina', 55: 'Brasil', 56: 'Chile', 57: 'Colombia', 58: 'Venezuela',
  502: 'Guatemala', 503: 'El Salvador', 504: 'Honduras', 505: 'Nicaragua', 506: 'Costa Rica', 507: 'Panamá', 591: 'Bolivia', 593: 'Ecuador', 595: 'Paraguay', 598: 'Uruguay' };
export const paisDeNumero = (numero) => {
  const n = String(numero || '').replace(/\D/g, '');
  return CODIGOS_PAIS[n.slice(0, 3)] || CODIGOS_PAIS[n.slice(0, 2)] || CODIGOS_PAIS[n.slice(0, 1)] || '';
};

export const variantesNum = (numero) => {
  const n = String(numero || '').replace(/\D/g, ''), v = new Set(n ? [n] : []);
  if (/^549\d{10}$/.test(n)) v.add(`54${n.slice(3)}`); else if (/^54\d{10}$/.test(n)) v.add(`549${n.slice(2)}`);
  if (/^521\d{10}$/.test(n)) v.add(`52${n.slice(3)}`); else if (/^52\d{10}$/.test(n)) v.add(`521${n.slice(2)}`);
  return [...v];
};

// La misma persona tiene siempre la misma clave aunque el número venga escrito distinto: sin el 0 de marcación nacional que algunas ponen después del código
// de país (+595 0984… = +595 984…) y sin el 9 de Argentina ni el 1 de México. Sirve para comparar, no para escribirle.
export const claveNumero = (numero) => {
  let n = String(numero || '').replace(/\D/g, '');
  const cod = [3, 2, 1].map((k) => n.slice(0, k)).find((c) => CODIGOS_PAIS[c]);
  if (cod && n[cod.length] === '0') n = cod + n.slice(cod.length + 1);
  if (/^549\d{10}$/.test(n)) n = `54${n.slice(3)}`;
  if (/^521\d{10}$/.test(n)) n = `52${n.slice(3)}`;
  return n;
};

// El id del chat de un número: el que ya existe (aunque el número venga escrito distinto) o, si no hay chat, el mismo número
export const chatIdDe = (num, chats) => {
  if (!num) return num;
  const k = claveNumero(num);
  return (chats || []).find((c) => claveNumero(c.id) === k)?.id || num;
};

const RE_CODIGO = /mi c[oó]digo:?\s*([A-Za-z0-9]{8,20})/i;
// La tarjeta (registro) de un chat: primero por su número (aunque esté escrito distinto) y, si no, por el «Mi código: XXXX» que escribió.
// Devuelve { lead, por: 'número' | 'código', difiere } o null. difiere = el número guardado en la tarjeta no es exactamente el del chat.
// waNum = cómo el portal normaliza un número.
export const fichaDeChat = (chatId, msgs, leads, waNum) => {
  const k = claveNumero(chatId), todas = leads || [];
  const porNumero = todas.filter((l) => claveNumero(waNum(l.whatsapp)) === k || claveNumero(l.waKey) === k);
  if (porNumero.length) {
    const lead = porNumero.find((l) => l.codigo) || porNumero[0];
    return { lead, por: 'número', difiere: String(lead.waKey || waNum(lead.whatsapp) || '') !== String(chatId) }; // waKey = a quién se le escribe de verdad
  }
  for (const m of msgs || []) {
    if (m.dir !== 'in') continue;
    const codigo = String(m.text || '').match(RE_CODIGO)?.[1];
    const l = codigo ? todas.find((x) => x.codigo === codigo) : null;
    if (l) return { lead: l, por: 'código', difiere: true };
  }
  return null;
};

// Datos de contacto de una persona con el número desde el que escribió: nombre y correo no cambian; el país pasa al del nuevo número si lo conocemos.
// Devuelve { contacto, pregunta } (pregunta = el texto de confirmación para la Maestra).
export const contactoConNumero = (persona, chatId) => {
  const n = String(chatId || '').replace(/\D/g, ''), pais = paisDeNumero(n) || persona.country || '';
  const contacto = { name: persona.nombre || '', email: persona.email || '', whatsapp: `+${n}`, country: pais };
  const cambiaPais = pais && pais !== (persona.country || '');
  return { contacto, pregunta: `¿Guardar +${n} como el WhatsApp de ${persona.nombre}? Hoy tiene ${persona.whatsapp || 'ninguno'}${cambiaPais ? ` y el país pasa a ${pais}` : ''}.` };
};
