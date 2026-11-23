// Replay enviado desde el celular: cuando la Maestra le escribe a alguien desde el WhatsApp Business de su teléfono y el mensaje lleva el enlace del replay de esa persona
// (…/clase-pendulo/replay?l=<código> o …/clase-tarot/replay?l=<código>), la tarjeta queda marcada «Replay enviado» sola (lead.replayEnviadoT), igual que al pulsar
// «Ya le envié el replay». Llega por el aviso «smb_message_echoes» de Meta (los mensajes enviados desde la app) y solo mira mensajes salientes.
// Sin importaciones, para poder probarlo con una base falsa. arrayUnion y marca son los de Firestore (FieldValue.arrayUnion / serverTimestamp).
const RE_REPLAY = /\/clase-(?:pendulo|tarot)\/replay\?l=([A-Za-z0-9]{12})(?![A-Za-z0-9])/g;

export async function marcarReplayEnviado(firestore, { texto, ahora = Date.now(), arrayUnion, marca }) {
  const codigos = [...new Set([...String(texto || '').matchAll(RE_REPLAY)].map((m) => m[1]))].slice(0, 3);
  let marcadas = 0;
  for (const codigo of codigos) {
    const q = await firestore.collection('leads').where('codigo', '==', codigo).limit(1).get();
    if (q.empty) continue;
    const d = q.docs[0];
    if (d.data().replayEnviadoT) continue; // ya estaba marcado
    await d.ref.update({
      replayEnviadoT: ahora, [`ultimoEnvio.whatsapp`]: ahora,
      eventos: arrayUnion({ t: ahora, tipo: 'envio', texto: 'Se le envió el replay desde el WhatsApp Business del celular' }), updatedAt: marca,
    });
    marcadas++;
  }
  return marcadas;
}
