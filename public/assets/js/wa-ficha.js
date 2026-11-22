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
