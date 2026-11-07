// POST /api/leads  (cuerpo { action, ... })
// Personas que dejan sus datos en los formularios de las landings (Péndulo, Formación, Sala Abierta, Terapias, Meditación, portada).
// Se guardan en leads/{id} desde el servidor: el navegador no escribe en Firestore y las reglas siguen denegando todo lo demás.
//   action 'save' -> { form, name, email, whatsapp, country, interest, message, utm, page, web }   sin sesión, desde cualquier landing
//                    Una persona (mismo correo, o mismo WhatsApp si no dejó correo) queda una sola vez por formulario: si vuelve a enviarlo se actualiza
//                    su registro (nueva fecha de clase, nuevo mensaje) y responde { repetida: true }, en vez de crear otro.
//   action 'all'  -> { leads: [{ id, form, name, ..., createdAt }] }   solo la Maestra (Authorization: Bearer <token>)
//   action 'update' -> { id, status?, note?, followUp? }   la Maestra cambia la etapa, escribe una nota o fija la fecha de seguimiento (AAAA-MM-DD; vacío la quita)
//                      con ids: [..] (hasta 30) la nota y el seguimiento se guardan en todos los programas de una misma persona
//   action 'estado' -> { ids: [..], status }   la Maestra cambia la etapa de varias a la vez (hasta 200), p. ej. quienes tomaron la clase
//   action 'addProgram' -> { fromId, form, status }   la Maestra suma otro programa a una persona que ya está (p. ej. de la clase gratis al curso): crea o actualiza
//                      su registro en ese formulario con los mismos datos de contacto, sin duplicarla
//   action 'delete' -> { ids: [..] }   la Maestra elimina interesadas (hasta 100 a la vez); no se puede deshacer
import crypto from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { auth, db, json } from '@/lib/server/services.js';
import { contexto, enviarDespues, idValido, usuario } from '@/lib/server/meta.js';

const FORMS = ['pendulo', 'clase-pendulo', 'tarot', 'clase-tarot', 'formacion', 'sala', 'terapias', 'meditacion', 'regalo'];
// Clases gratis: al registrarse, la respuesta trae el enlace de Google Meet guardado por la Maestra en config/clases (nunca va en el HTML)
const ENLACE = { 'clase-pendulo': 'enlacePendulo', 'clase-tarot': 'enlaceTarot' };
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HTTPS = /^https:\/\/[^\s"'<>]+$/i;
const ETAPAS = ['nuevo', 'contactado', 'clase', 'conversando', 'inscrita', 'descartado'];
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const out = (d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toMillis?.() || 0, updatedAt: d.data().updatedAt?.toMillis?.() || 0 });
const ID = /^[A-Za-z0-9]{1,40}$/;
// Registro de una persona en un formulario: el id sale de formulario + correo (o WhatsApp), así un doble envío cae en el mismo documento.
// Si ya hay uno de antes (id al azar) con ese correo y formulario, se usa ese.
async function refDe(firestore, form, email, whatsapp) {
  const llave = email || String(whatsapp || '').replace(/\D/g, '');
  let ref = llave ? firestore.collection('leads').doc(crypto.createHash('sha1').update(`${form}|${llave}`).digest('hex').slice(0, 20)) : firestore.collection('leads').doc();
  if (email) {
    const previo = await firestore.collection('leads').where('email', '==', email).where('form', '==', form).limit(1).get();
    if (!previo.empty) ref = previo.docs[0].ref;
  }
  return ref;
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const delPortal = ['all', 'status', 'update', 'delete', 'estado', 'addProgram'].includes(body.action); // acciones de la Maestra: su error no es el de una landing
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
      // Clase gratis con fecha elegida: queda asociada a esa clase del Calendario (así Karen ve quiénes vienen cada día)
      if (ENLACE[form] && FECHA.test(str(body.date, 10))) {
        try {
          const s = await db().collection('calendario').where('type', '==', form).where('date', '==', str(body.date, 10)).limit(1).get();
          if (!s.empty) Object.assign(lead, { claseEvento: s.docs[0].id, claseFecha: str(body.date, 10) });
        } catch (e) { console.error('leads clase', e); } // sin la asociación igual se guarda la interesada
      }
      // Misma persona y mismo formulario = mismo registro. Dos envíos casi a la vez (doble clic, reintento) caen en el mismo
      // documento y la transacción deja solo uno.
      const firestore = db();
      const ref = await refDe(firestore, form, lead.email, lead.whatsapp);
      let repetida = false;
      await firestore.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (!snap.exists) { repetida = false; tx.set(ref, lead); return; }
        repetida = true;
        const { createdAt, utm, status, form: f, ...nuevo } = lead; // se conservan la fecha, el origen de la campaña y la etapa
        const vacio = (v) => v === '' || v === undefined;
        tx.update(ref, {
          ...Object.fromEntries(Object.entries(nuevo).filter(([, v]) => !vacio(v))),
          ...(snap.data().status === 'descartado' ? { status: 'nuevo' } : {}), // si vuelve a escribir, vuelve a "por contactar"
          repeticiones: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });
      });
      // API de conversiones de Meta: el mismo Lead que registra el Píxel, con el mismo id para que no se cuente doble.
      // Quien repite el formulario no se cuenta otra vez como Lead nuevo en las campañas.
      const ctx = contexto(request, lead.utm.fbclid);
      if (!repetida) enviarDespues({ nombre: 'Lead', id: idValido(body.eventId) || `lead-${ref.id}`, url: ctx.url, user: usuario({ email: lead.email, phone: lead.whatsapp, nombre: lead.name }, ctx) });
      let enlace = '';
      if (ENLACE[form]) {
        const guardado = ((await db().doc('config/clases').get()).data() || {})[ENLACE[form]];
        if (typeof guardado === 'string' && HTTPS.test(guardado.trim())) enlace = guardado.trim();
      }
      return json({ ok: true, id: ref.id, ...(repetida ? { repetida: true } : {}), ...(enlace ? { enlace } : {}) });
    }
    if (body.action === 'all' || body.action === 'status' || body.action === 'update' || body.action === 'delete' || body.action === 'estado' || body.action === 'addProgram') {
      let user;
      try {
        user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
      } catch (e) {
        return json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401);
      }
      if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);
      if (body.action === 'estado') {
        const ids = Array.isArray(body.ids) ? [...new Set(body.ids)] : [];
        if (!ETAPAS.includes(body.status) || !ids.length || ids.length > 200 || ids.some((id) => typeof id !== 'string' || !ID.test(id))) return json({ error: 'Datos no válidos.' }, 400);
        const lote = db().batch();
        ids.forEach((id) => lote.update(db().doc(`leads/${id}`), { status: body.status, updatedAt: FieldValue.serverTimestamp() }));
        try { await lote.commit(); } catch (e) {
          if (e.code === 5 || /NOT_FOUND/.test(String(e.message))) return json({ error: 'Alguna ya no existe. Actualiza la lista.' }, 404);
          throw e;
        }
        return json({ ok: true, cambiadas: ids.length });
      }
      if (body.action === 'addProgram') {
        if (typeof body.fromId !== 'string' || !ID.test(body.fromId) || !FORMS.includes(body.form) || !ETAPAS.includes(body.status)) return json({ error: 'Datos no válidos.' }, 400);
        const firestore = db();
        const origen = await firestore.doc(`leads/${body.fromId}`).get();
        if (!origen.exists) return json({ error: 'Esa persona ya no existe. Actualiza la lista.' }, 404);
        const o = origen.data();
        const ref = await refDe(firestore, body.form, o.email || '', o.whatsapp || '');
        await firestore.runTransaction(async (tx) => {
          const snap = await tx.get(ref);
          if (snap.exists) { tx.update(ref, { status: body.status, updatedAt: FieldValue.serverTimestamp() }); return; }
          tx.set(ref, {
            form: body.form, name: o.name || '', email: o.email || '', whatsapp: o.whatsapp || '', country: o.country || '',
            interest: '', message: '', page: 'crm', utm: {}, status: body.status, desdeForm: o.form || '',
            ...(o.note ? { note: o.note } : {}), ...(o.followUp ? { followUp: o.followUp } : {}),
            createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
          });
        });
        return json({ ok: true, id: ref.id });
      }
      if (body.action === 'delete') {
        const ids = Array.isArray(body.ids) ? [...new Set(body.ids)] : [];
        if (!ids.length || ids.length > 100 || ids.some((id) => typeof id !== 'string' || !/^[A-Za-z0-9]{1,40}$/.test(id))) return json({ error: 'Datos no válidos.' }, 400);
        const lote = db().batch();
        ids.forEach((id) => lote.delete(db().doc(`leads/${id}`)));
        await lote.commit();
        return json({ ok: true, eliminadas: ids.length });
      }
      if (body.action === 'update') {
        const objetivos = Array.isArray(body.ids) ? [...new Set(body.ids)] : [body.id];
        if (!objetivos.length || objetivos.length > 30 || objetivos.some((id) => typeof id !== 'string' || !ID.test(id))) return json({ error: 'Datos no válidos.' }, 400);
        const cambios = {};
        if ('status' in body) { if (!ETAPAS.includes(body.status)) return json({ error: 'Etapa no válida.' }, 400); cambios.status = body.status; }
        if ('note' in body) { if (typeof body.note !== 'string') return json({ error: 'Nota no válida.' }, 400); cambios.note = body.note.trim().slice(0, 1000); }
        if ('followUp' in body) {
          if (body.followUp !== '' && !FECHA.test(String(body.followUp))) return json({ error: 'Fecha no válida.' }, 400);
          cambios.followUp = body.followUp;
        }
        if (!Object.keys(cambios).length) return json({ error: 'No hay cambios.' }, 400);
        const lote = db().batch();
        objetivos.forEach((id) => lote.update(db().doc(`leads/${id}`), { ...cambios, updatedAt: FieldValue.serverTimestamp() }));
        try { await lote.commit(); } catch (e) {
          if (e.code === 5 || /NOT_FOUND/.test(String(e.message))) return json({ error: 'Esa interesada ya no existe. Actualiza la lista.' }, 404);
          throw e;
        }
        return json({ ok: true });
      }
      if (body.action === 'status') {
        const status = ETAPAS.includes(body.status) ? body.status : null;
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
    if (delPortal) return json({ error: 'No se pudo completar la acción. Inténtalo de nuevo.' }, 500);
    return json({ error: 'No pudimos guardar tus datos. Escríbenos por WhatsApp y te ayudamos.' }, 500);
  }
}
