// POST /api/aula/cuenta  (Authorization: Bearer <token de Firebase>, cuerpo { origen?, l? })
// La alumna acaba de crear su cuenta del aula (gratis, sin pagar): queda anotado en el CRM para poder medirlo.
//   origen  de dónde vino: 'clase-gratis' (enlace del replay u otra página), 'directo'… (solo letras, números y guiones)
//   l       código personal de 12 caracteres, si venía de un mensaje o de la página del replay (une la cuenta con esa persona aunque use otro correo)
// Evento que queda: `cuenta_gratis_creada`, en el historial de la persona y en el campo cuentaAula { t, origen, uid }.
//   - Si la persona ya está en el CRM (mismo correo o mismo código): se marcan sus registros, sin crear otro ni cambiar su etapa.
//   - Si no está: se crea un registro nuevo (programa «Cuenta gratis del aula», origen guardado) para que se vea y se mida.
// Se repite sin problema: si ya estaba anotada, no hace nada. Responde { ok, nueva?, ya? }.
import { FieldValue } from 'firebase-admin/firestore';
import { CODIGO } from '@/lib/server/embudo.js';
import { auth, db, json } from '@/lib/server/services.js';

const ORIGEN = /^[a-z0-9_-]{1,40}$/;
const EVENTO ='cuenta_gratis_creada';

export async function POST(request) {
  let user;
  try {
    user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  } catch (e) {
    return json({ error: 'Tu sesión expiró. Vuelve a entrar al aula.' }, 401);
  }
  const body = await request.json().catch(() => ({}));
  const origen = typeof body.origen === 'string' && ORIGEN.test(body.origen) ? body.origen : 'directo';
  const codigo = typeof body.l === 'string' && CODIGO.test(body.l) ? body.l : '';
  const email = String(user.email || '').trim().toLowerCase();
  if (!email) return json({ error: 'Tu cuenta no tiene correo.' }, 400);
  try {
    const firestore = db(), ahora = Date.now();
    const docs = new Map();
    (await firestore.collection('leads').where('email', '==', email).get()).docs.forEach((d) => docs.set(d.id, d));
    if (codigo) (await firestore.collection('leads').where('codigo', '==', codigo).limit(1).get()).docs.forEach((d) => docs.set(d.id, d));
    const marca = { t: ahora, origen, uid: user.uid };
    const evento = { t: ahora, tipo: 'evento', texto: `${EVENTO} · origen: ${origen}` };
    if (!docs.size) {
      await firestore.collection('leads').add({
        form: 'cuenta-gratis', name: String(user.name || '').slice(0, 120) || email.split('@')[0], email, whatsapp: '', country: '', interest: '', message: '',
        page: 'aula', utm: {}, status: 'nuevo', origen, cuentaAula: marca, eventos: [evento],
        createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
      });
      return json({ ok: true, nueva: true });
    }
    const pendientes = [...docs.values()].filter((d) => !d.data().cuentaAula);
    if (!pendientes.length) return json({ ok: true, ya: true });
    const lote = firestore.batch();
    pendientes.forEach((d) => lote.update(d.ref, { cuentaAula: marca, eventos: FieldValue.arrayUnion(evento), updatedAt: FieldValue.serverTimestamp() }));
    await lote.commit();
    return json({ ok: true });
  } catch (e) {
    console.error('aula cuenta', e);
    return json({ error: 'No se pudo anotar la cuenta.' }, 500);
  }
}
