// POST /api/leads  (cuerpo { action, ... })
// Personas que dejan sus datos en los formularios de las landings (Péndulo, Formación, Sala Abierta, Terapias, Meditación, portada).
// Se guardan en leads/{id} desde el servidor: el navegador no escribe en Firestore y las reglas siguen denegando todo lo demás.
//   action 'save' -> { form, name, email, whatsapp, country, interest, message, utm, page, web }   sin sesión, desde cualquier landing
//   action 'all'  -> { leads: [{ id, form, name, ..., createdAt }] }   solo la Maestra (Authorization: Bearer <token>)
import { FieldValue } from 'firebase-admin/firestore';
import { auth, db, json } from '@/lib/server/services.js';

const FORMS = ['pendulo', 'formacion', 'sala', 'terapias', 'meditacion', 'regalo'];
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const out = (d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toMillis?.() || 0 });

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  try {
    if (body.action === 'save') {
      // Campo trampa: las personas no lo ven, los bots lo llenan. Se responde ok para no darles pistas.
      if (str(body.web, 200)) return json({ ok: true });
      const form = FORMS.includes(body.form) ? body.form : null;
      if (!form) return json({ error: 'Formulario no válido.' }, 400);
      const lead = {
        form,
        name: str(body.name, 120),
        email: str(body.email, 160).toLowerCase(),
        whatsapp: str(body.whatsapp, 40),
        country: str(body.country, 60),
        interest: str(body.interest, 200),
        message: str(body.message, 1500),
        page: str(body.page, 300),
        utm: Object.fromEntries(UTM.map((k) => [k, str(body.utm?.[k], 200)]).filter(([, v]) => v)),
        status: 'nuevo',
        createdAt: FieldValue.serverTimestamp(),
      };
      if (!lead.name) return json({ error: 'Escribe tu nombre.' }, 400);
      if (!lead.whatsapp && !lead.email) return json({ error: 'Déjanos tu WhatsApp o tu correo para poder escribirte.' }, 400);
      if (lead.email && !EMAIL.test(lead.email)) return json({ error: 'Revisa tu correo.' }, 400);
      const ref = await db().collection('leads').add(lead);
      return json({ ok: true, id: ref.id });
    }
    if (body.action === 'all' || body.action === 'status') {
      let user;
      try {
        user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
      } catch (e) {
        return json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401);
      }
      if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);
      if (body.action === 'status') {
        const status = ['nuevo', 'contactado', 'inscrita', 'descartado'].includes(body.status) ? body.status : null;
        if (!status || typeof body.id !== 'string' || !/^[A-Za-z0-9]{1,40}$/.test(body.id)) return json({ error: 'Datos no válidos.' }, 400);
        await db().doc(`leads/${body.id}`).update({ status });
        return json({ ok: true });
      }
      const s = await db().collection('leads').orderBy('createdAt', 'desc').limit(500).get();
      return json({ leads: s.docs.map(out) });
    }
    return json({ error: 'Acción desconocida.' }, 400);
  } catch (e) {
    console.error('leads', e);
    return json({ error: 'No pudimos guardar tus datos. Escríbenos por WhatsApp y te ayudamos.' }, 500);
  }
}
