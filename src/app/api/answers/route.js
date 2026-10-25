// POST /api/answers  (Authorization: Bearer <token de Firebase>, cuerpo { action, ... })
// Respuestas que cada alumna escribe dentro de las clases (reflexiones, ejercicios, fichas).
// Se guardan en users/{uid}/answers/{nivel_módulo_clase} desde el servidor, así no dependen de las reglas de Firestore.
//   action 'mine' -> { answers: [{ key, fields, updatedAt }] }   las de la propia alumna, para volver a mostrarlas
//   action 'save' -> { key, fields: { campo: { q, v, paso } } }   guarda las respuestas de una clase
//   action 'all'  -> { answers: [{ uid, key, fields, updatedAt }] }   solo la Maestra: las de todas las alumnas
import { FieldValue } from 'firebase-admin/firestore';
import { auth, db, json } from '@/lib/server/services.js';

const KEY = /^[a-z0-9_-]{1,80}$/;
const FIELD = /^[A-Za-z0-9_:-]{1,80}$/;
const MAX_FIELDS = 300;
const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
const out = (d, uid) => ({ ...(uid ? { uid } : {}), key: d.id, fields: d.data().fields || {}, updatedAt: d.data().updatedAt?.toMillis?.() || 0 });

export async function POST(request) {
  let user;
  try {
    user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  } catch (e) {
    console.error('answers token', e.code || e.message);
    return json({ error: 'Tu sesión expiró. Vuelve a entrar al aula.' }, 401);
  }
  const body = await request.json().catch(() => ({}));
  try {
    if (body.action === 'mine') {
      const s = await db().collection(`users/${user.uid}/answers`).get();
      return json({ answers: s.docs.map((d) => out(d)) });
    }
    if (body.action === 'save') {
      if (typeof body.key !== 'string' || !KEY.test(body.key)) return json({ error: 'Clase no válida.' }, 400);
      const src = body.fields && typeof body.fields === 'object' ? Object.entries(body.fields) : [];
      if (src.length > MAX_FIELDS) return json({ error: 'Demasiadas respuestas en una clase.' }, 400);
      const fields = {};
      for (const [k, f] of src) {
        if (!FIELD.test(k) || !f || typeof f !== 'object') continue;
        fields[k] = { q: str(f.q, 300), v: str(f.v, 5000), paso: str(f.paso, 200) };
      }
      const ref = db().doc(`users/${user.uid}/answers/${body.key}`);
      // Si borró todo lo que había escrito en la clase, no queda nada que mostrar
      if (!Object.values(fields).some((f) => f.v.trim())) await ref.delete();
      else await ref.set({ fields, updatedAt: FieldValue.serverTimestamp() });
      return json({ ok: true });
    }
    if (body.action === 'all') {
      if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);
      const s = await db().collectionGroup('answers').get();
      return json({ answers: s.docs.map((d) => out(d, d.ref.parent.parent.id)) });
    }
    return json({ error: 'Acción desconocida.' }, 400);
  } catch (e) {
    console.error('answers', e);
    return json({ error: 'No se pudieron guardar tus respuestas. Inténtalo de nuevo.' }, 500);
  }
}
