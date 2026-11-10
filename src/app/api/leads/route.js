// POST /api/leads  (cuerpo { action, ... })
// Personas que dejan sus datos en los formularios de las landings (Péndulo, Formación, Sala Abierta, Terapias, Meditación, portada).
// Se guardan en leads/{id} desde el servidor: el navegador no escribe en Firestore y las reglas siguen denegando todo lo demás.
//   action 'save' -> { form, name, email, whatsapp, country, interest, message, utm, page, web }   sin sesión, desde cualquier landing
//                    Una persona (mismo correo, o mismo WhatsApp si no dejó correo) queda una sola vez por formulario: si vuelve a enviarlo se actualiza
//                    su registro (nueva fecha de clase, nuevo mensaje) y responde { repetida: true }, en vez de crear otro.
//   action 'all'  -> { leads: [{ id, form, name, ..., createdAt }] }   solo la Maestra (Authorization: Bearer <token>)
//   action 'update' -> { id, status?, note?, followUp? }   la Maestra cambia la etapa, escribe una nota o fija la fecha de seguimiento (AAAA-MM-DD; vacío la quita)
//                      con ids: [..] (hasta 30) la nota y el seguimiento se guardan en todos los programas de una misma persona
//   action 'estado' -> { ids: [..], status, followUp? }   la Maestra cambia la etapa de varias a la vez (hasta 200), p. ej. quienes tomaron la clase (y les fija el seguimiento)
//   action 'nota' -> { ids: [..], texto }   agrega una nota al historial de una persona (queda en todos sus programas como última nota)
//   action 'etiquetas' -> { ids: [..], agregar?: [..], quitar?: [..] }   etiquetas de una o varias personas (hasta 200 registros)
//   update también acepta motivo (por qué se descartó) y contacto { name, email, whatsapp, country } (corrige los datos de la persona en todos sus programas). Cada cambio de etapa, seguimiento o nota queda en el historial (eventos) del registro.
//   action 'addProgram' -> { fromId, form, status }   la Maestra suma otro programa a una persona que ya está (p. ej. de la clase gratis al curso): crea o actualiza
//                      su registro en ese formulario con los mismos datos de contacto, sin duplicarla
//   action 'delete' -> { ids: [..] }   la Maestra elimina interesadas (hasta 100 a la vez); no se puede deshacer
import crypto from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { chileAUtc } from '@/lib/server/agenda.js';
import { ETAPAS, ETAPAS_DE_LA_CLASE, ETAPA_TXT, RANGO, anotarAsistencia, asistenciaMigrada, baseSitio, claseDe, claseVigente, datosDeCodigo, diaLargo, mismaClase, nuevoCodigo, normaliza, venceCodigo, waClave } from '@/lib/server/embudo.js';
import { auth, db, json } from '@/lib/server/services.js';
import { contexto, enviarDespues, idValido, usuario } from '@/lib/server/meta.js';

const FORMS = ['pendulo', 'clase-pendulo', 'tarot', 'clase-tarot', 'formacion', 'sala', 'terapias', 'meditacion', 'regalo'];
// Clases gratis: al registrarse, la respuesta trae el enlace de Google Meet guardado por la Maestra en config/clases (nunca va en el HTML)
const ENLACE = { 'clase-pendulo': 'enlacePendulo', 'clase-tarot': 'enlaceTarot' };
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const HTTPS = /^https:\/\/[^\s"'<>]+$/i;
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const out = (d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toMillis?.() || 0, updatedAt: d.data().updatedAt?.toMillis?.() || 0 });
const ID = /^[A-Za-z0-9]{1,40}$/;
const MOTIVOS = ['No responde', 'Precio', 'No es el momento', 'No le interesa', 'Compró en otro lugar', 'Registro repetido o de prueba', 'Otro'];
// Historial de cada registro: arreglo de { t (ms), tipo, texto }. arrayUnion no admite serverTimestamp, por eso la hora va en milisegundos.
const ev = (tipo, texto) => ({ t: Date.now(), tipo, texto: String(texto).slice(0, 1000) });
const etiquetasOk = (v) => (Array.isArray(v) ? [...new Set(v.map((x) => String(x ?? '').trim()))].filter(Boolean) : []);
// Registro de una persona en un formulario: el id sale de formulario + correo (o WhatsApp), así un doble envío cae en el mismo documento.
// Si ya hay uno de antes (id al azar) con ese correo y formulario, se usa ese.
async function refDe(firestore, form, email, whatsapp) {
  const llave = email || String(whatsapp || '').replace(/\D/g, '');
  let ref = llave ? firestore.collection('leads').doc(crypto.createHash('sha1').update(`${form}|${llave}`).digest('hex').slice(0, 20)) : firestore.collection('leads').doc();
  let hallado = false;
  if (email) {
    const previo = await firestore.collection('leads').where('email', '==', email).where('form', '==', form).limit(1).get();
    if (!previo.empty) { ref = previo.docs[0].ref; hallado = true; }
  }
  // Misma persona aunque cambie de correo: se reconoce también por el WhatsApp (clave en dígitos con código de país)
  const wk = waClave(whatsapp);
  if (!hallado && wk) {
    const porWa = await firestore.collection('leads').where('waKey', '==', wk).where('form', '==', form).limit(1).get();
    if (!porWa.empty) ref = porWa.docs[0].ref;
  }
  return ref;
}
// Consentimiento de contacto: { aceptado, fecha, texto, origen } por canal
const consentimientoOk = (c) => (c && typeof c === 'object' ? { aceptado: c.aceptado === true, fecha: str(c.fecha, 40) || new Date().toISOString(), texto: str(c.texto, 600), origen: str(c.origen, 80) } : null);

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const delPortal = ['all', 'status', 'update', 'delete', 'estado', 'addProgram', 'nota', 'etiquetas', 'preparar', 'codigo', 'clasificar', 'enviado'].includes(body.action); // acciones de la Maestra: su error no es el de una landing
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
        status: form === 'clase-pendulo' || form === 'clase-tarot' ? 'registrada' : 'nuevo',
        waKey: waClave(body.whatsapp),
        createdAt: FieldValue.serverTimestamp(),
      };
      const edad = Math.round(Number(body.edad));
      if (Number.isFinite(edad) && edad >= 5 && edad <= 110) lead.edad = edad;
      const consentimiento = Object.fromEntries(['email', 'whatsapp'].map((k) => [k, consentimientoOk(body.consentimiento?.[k])]).filter(([, v]) => v));
      if (Object.keys(consentimiento).length) lead.consentimiento = consentimiento;
      if (!lead.name) return json({ error: 'Escribe tu nombre.' }, 400);
      if (!lead.whatsapp && !lead.email) return json({ error: 'Déjanos tu WhatsApp o tu correo para poder escribirte.' }, 400);
      if (lead.email && !EMAIL.test(lead.email)) return json({ error: 'Revisa tu correo.' }, 400);
      // Clase gratis con fecha elegida: queda asociada a esa clase del Calendario (así Karen ve quiénes vienen cada día)
      if (ENLACE[form] && FECHA.test(str(body.date, 10))) {
        try {
          const s = await db().collection('calendario').where('type', '==', form).where('date', '==', str(body.date, 10)).limit(1).get();
          if (!s.empty) Object.assign(lead, { claseEvento: s.docs[0].id, claseFecha: str(body.date, 10), clases: [{ evento: s.docs[0].id, fecha: str(body.date, 10), t: Date.now() }] });
        } catch (e) { console.error('leads clase', e); } // sin la asociación igual se guarda la interesada
      }
      // Clase, código personal único (12 caracteres) y enlaces de esa persona: entrada y replay
      Object.assign(lead, datosDeCodigo(form, baseSitio(request)));
      // Misma persona y mismo formulario = mismo registro. Dos envíos casi a la vez (doble clic, reintento) caen en el mismo
      // documento y la transacción deja solo uno.
      const firestore = db();
      const ref = await refDe(firestore, form, lead.email, lead.whatsapp);
      let repetida = false, codigoFinal = lead.codigo || '';
      await firestore.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        codigoFinal = lead.codigo || '';
        if (!snap.exists) { repetida = false; tx.set(ref, lead); return; }
        repetida = true;
        // se conservan la fecha, el origen de la campaña, la etapa y el código personal que ya tenía
        const { createdAt, utm, status, form: f, clase, codigo, codigoVence, codigoRevocado, enlace_entrada, enlace_replay, email, clases: _c, ...nuevo } = lead;
        if (snap.data().codigo) codigoFinal = snap.data().codigo;
        const vacio = (v) => v === '' || v === undefined;
        // Se inscribe de nuevo, pero a OTRA clase (p. ej. no se convenció con la del 7 y viene a la del 14): la asistencia de la anterior se guarda
        // con esa clase, la etapa vuelve a «Registrada» para la nueva, queda una línea en su historial y se conserva la lista de clases.
        const prev = snap.data(), nueva = lead.claseEvento || lead.claseFecha ? { evento: lead.claseEvento || '', fecha: lead.claseFecha || '' } : null, vieja = claseVigente(prev);
        const otraClase = !!nueva && !mismaClase(nueva, vieja);
        const cambioClase = {};
        if (otraClase) {
          const lista = Array.isArray(prev.clases) ? [...prev.clases] : [];
          if ((vieja.evento || vieja.fecha) && !lista.some((c) => mismaClase(c, vieja))) lista.unshift({ ...vieja });
          lista.push({ ...nueva, t: Date.now() });
          const migrada = asistenciaMigrada(prev) || prev.asistencia;
          Object.assign(cambioClase, {
            clases: lista,
            ...(migrada?.sesiones ? { asistencia: { sesiones: migrada.sesiones } } : {}),
            replayEnviadoT: FieldValue.delete(), seguimientoReplayT: FieldValue.delete(),
            ...(ETAPAS_DE_LA_CLASE.includes(prev.status) ? { status: lead.status } : {}),
            eventos: FieldValue.arrayUnion(ev('inscripcion', `Se inscribió de nuevo para el ${diaLargo(nueva.fecha)}`), ...(ETAPAS_DE_LA_CLASE.includes(prev.status) && prev.status !== lead.status ? [ev('etapa', `Etapa: ${ETAPA_TXT[lead.status] || lead.status} (nueva clase)`)] : [])),
          });
        }
        tx.update(ref, {
          ...Object.fromEntries(Object.entries(nuevo).filter(([, v]) => !vacio(v))),
          // Un correo distinto del que ya teníamos no lo pisa: queda como correo adicional (así no se pierde el vínculo con su cuenta)
          ...(email && !snap.data().email ? { email } : {}),
          ...(email && snap.data().email && snap.data().email !== email ? { emailsExtra: FieldValue.arrayUnion(email) } : {}),
          ...(!snap.data().codigo && codigo ? { clase, codigo, codigoVence, codigoRevocado, ...(enlace_entrada ? { enlace_entrada, enlace_replay } : {}) } : {}),
          ...(snap.data().status === 'descartado' ? { status: lead.status } : {}), // si vuelve a escribir, vuelve a "por contactar"
          ...cambioClase,
          repeticiones: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });
      });
      // API de conversiones de Meta: el mismo Lead que registra el Píxel, con el mismo id para que no se cuente doble.
      // Quien repite el formulario no se cuenta otra vez como Lead nuevo en las campañas.
      const ctx = contexto(request, lead.utm.fbclid);
      if (!repetida) enviarDespues({ nombre: 'Lead', id: idValido(body.eventId) || `lead-${ref.id}`, url: ctx.url, user: usuario({ email: lead.email, phone: lead.whatsapp, nombre: lead.name }, ctx) });
      return json({ ok: true, id: ref.id, ...(codigoFinal ? { codigo: codigoFinal } : {}), ...(repetida ? { repetida: true } : {}) });
    }
    if (body.action === 'all' || body.action === 'status' || body.action === 'update' || body.action === 'delete' || body.action === 'estado' || body.action === 'addProgram' || body.action === 'nota' || body.action === 'etiquetas' || body.action === 'preparar' || body.action === 'codigo' || body.action === 'clasificar' || body.action === 'enviado') {
      let user;
      try {
        user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
      } catch (e) {
        return json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401);
      }
      if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);
      if (body.action === 'enviado') {
        // La Maestra anota que le escribió a alguien (queda en su historial; sirve para no escribirle dos veces el mismo día por el mismo canal)
        const ids = Array.isArray(body.ids) ? [...new Set(body.ids)] : [];
        const canal = body.canal === 'email' ? 'email' : body.canal === 'whatsapp' ? 'whatsapp' : '';
        if (!canal || !ids.length || ids.length > 50 || ids.some((id) => typeof id !== 'string' || !ID.test(id))) return json({ error: 'Datos no válidos.' }, 400);
        const plantilla = str(body.plantilla, 60);
        const lote = db().batch();
        // replay:true = el mensaje llevaba el enlace del replay (para el seguimiento «No abrió el replay»); seguimiento:'replay' = ya se le preguntó si lo vio
        const marca = { ...(body.replay === true ? { replayEnviadoT: Date.now() } : {}), ...(body.seguimiento === 'replay' ? { seguimientoReplayT: Date.now() } : {}) };
        ids.forEach((id) => lote.update(db().doc(`leads/${id}`), { ...marca, [`ultimoEnvio.${canal}`]: Date.now(), eventos: FieldValue.arrayUnion(ev('envio', `Mensaje por ${canal}${plantilla ? `: ${plantilla}` : ''}`)), updatedAt: FieldValue.serverTimestamp() }));
        try { await lote.commit(); } catch (e) {
          if (e.code === 5 || /NOT_FOUND/.test(String(e.message))) return json({ error: 'Esa persona ya no existe. Actualiza la lista.' }, 404);
          throw e;
        }
        return json({ ok: true });
      }
      if (body.action === 'preparar') {
        // Deja a cada contacto con su clase, la clave de WhatsApp, el código personal y sus enlaces (los que ya tienen no se tocan)
        const base = baseSitio(request);
        if (!base) return json({ error: 'Falta la dirección pública del sitio (APP_URL en Vercel): sin ella los enlaces personales quedarían apuntando a este computador.' }, 400);
        const firestore = db(), s = await firestore.collection('leads').limit(3000).get();
        let lote = firestore.batch(), n = 0, enLote = 0;
        for (const d of s.docs) {
          const l = d.data(), need = {};
          if (claseDe(l.form) && (!l.codigo || !l.enlace_entrada || !l.clase)) Object.assign(need, datosDeCodigo(l.form, base, l));
          if (!l.waKey && waClave(l.whatsapp)) need.waKey = waClave(l.whatsapp);
          // La asistencia que ya estaba guardada (campos sueltos) queda asignada a su clase (p. ej. las del 7 de noviembre) y se arma la lista de clases
          const mig = asistenciaMigrada(l); if (mig) need.asistencia = mig;
          if (!Array.isArray(l.clases) && (l.claseEvento || l.claseFecha)) need.clases = [claseVigente(l)];
          if (!Object.keys(need).length) continue;
          lote.update(d.ref, need); n++; enLote++;
          if (enLote === 400) { await lote.commit(); lote = firestore.batch(); enLote = 0; }
        }
        if (enLote) await lote.commit();
        return json({ ok: true, revisadas: s.size, actualizadas: n });
      }
      if (body.action === 'codigo') {
        if (typeof body.id !== 'string' || !ID.test(body.id)) return json({ error: 'Datos no válidos.' }, 400);
        const ref = db().doc(`leads/${body.id}`), snap = await ref.get();
        if (!snap.exists) return json({ error: 'Esa persona ya no existe. Actualiza la lista.' }, 404);
        if (body.accion === 'regenerar') {
          const base = baseSitio(request);
          if (!base) return json({ error: 'Falta la dirección pública del sitio (APP_URL en Vercel).' }, 400);
          const nuevo = datosDeCodigo(snap.data().form, base, {});
          await ref.update({ ...nuevo, eventos: FieldValue.arrayUnion(ev('codigo', 'Código personal regenerado: el anterior dejó de servir')), updatedAt: FieldValue.serverTimestamp() });
          return json({ ok: true, codigo: nuevo.codigo });
        }
        await ref.update({ codigoRevocado: true, eventos: FieldValue.arrayUnion(ev('codigo', 'Código personal revocado')), updatedAt: FieldValue.serverTimestamp() });
        return json({ ok: true });
      }
      if (body.action === 'clasificar') {
        // Marca quiénes entraron a una clase (lista del informe de Meet) y deja al resto como No asistió / No identificada.
        // Sin aplicar:true solo muestra cómo quedaría (nada se guarda).
        const firestore = db();
        const sesId = typeof body.sesion === 'string' && ID.test(body.sesion) ? body.sesion : '';
        const nivel = body.nivel === 'entro' ? 'entro' : 'asistio_confirmado';
        const lineas = (Array.isArray(body.lista) ? body.lista : String(body.lista || '').split(/\r?\n/)).map((x) => String(x).trim()).filter(Boolean).slice(0, 400);
        const sesion = sesId ? await firestore.doc(`calendario/${sesId}`).get() : null;
        if (!sesion?.exists || !['clase-pendulo', 'clase-tarot'].includes(sesion.data().type)) return json({ error: 'Elige la clase del Calendario.' }, 400);
        const e = sesion.data(), inicio = e.date && e.time ? chileAUtc(e.date, e.time) : Date.now();
        const todas = await firestore.collection('leads').where('form', '==', e.type).get();
        const cand = todas.docs.map((d) => ({ id: d.id, ref: d.ref, ...d.data() })).filter((l) => l.claseEvento === sesId || l.claseFecha === e.date);
        const porEmail = new Map(), porWa = new Map(), porNombre = new Map();
        cand.forEach((l) => { if (l.email) porEmail.set(l.email, l); const k = l.waKey || waClave(l.whatsapp); if (k) porWa.set(k, l); if (l.name) porNombre.set(normaliza(l.name), l); });
        const marcadas = new Map(), sinMatch = [];
        for (const linea of lineas) {
          const mail = ((linea.match(/[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/) || [])[0] || '').toLowerCase();
          const tel = waClave((linea.match(/\+?\d[\d\s().-]{7,}\d/) || [])[0]);
          let l = (mail && porEmail.get(mail)) || (tel && porWa.get(tel)) || null;
          if (!l) {
            const nom = normaliza(linea.replace(/[^\s@]+@[^\s@]+/g, ' ').replace(/\+?\d[\d\s().-]{7,}\d/g, ' '));
            if (nom) {
              l = porNombre.get(nom) || null;
              const toks = nom.split(' ').filter((t) => t.length > 1);
              if (!l && toks.length >= 2) { const hit = cand.filter((c) => { const ct = normaliza(c.name).split(' '); return toks.every((t) => ct.includes(t)); }); if (hit.length === 1) l = hit[0]; }
            }
          }
          if (l) marcadas.set(l.id, l); else sinMatch.push(linea);
        }
        // La asistencia es por clase: aquí solo cuenta la de ESTA clase (no la de otra a la que haya entrado antes)
        const estaClase = { evento: sesId, fecha: e.date };
        const deEstaClase = (l) => { const a = asistenciaMigrada(l) || l.asistencia || {}; return a.sesiones ? Object.values(a.sesiones).find((x) => mismaClase(x, estaClase)) || {} : a; };
        const yaAsistio = (l) => !!(deEstaClase(l).entro || deEstaClase(l).confirmada) || ['entro', 'asistio_confirmado', 'clase', 'conversando', 'vio_oferta', 'inscrita', 'matriculada'].includes(l.status);
        const noAsist = [], noIdent = [];
        cand.forEach((l) => {
          if (marcadas.has(l.id) || yaAsistio(l)) return;
          // Quien no entró queda "No asistió" (la página del replay le muestra «sabemos que no pudiste entrar»); "No identificada" es solo para quien dice que estuvo.
          if (l.asistencia?.autodeclarada === 'si') { if (['registrada', 'nuevo', 'contactado', 'confirmada', 'no_asistio'].includes(l.status)) noIdent.push(l); } else if (['registrada', 'nuevo', 'contactado', 'confirmada', 'no_identificada', 'sin_respuesta'].includes(l.status)) noAsist.push(l);
        });
        const nombres = (arr) => arr.map((l) => ({ id: l.id, nombre: l.name }));
        const informe = { total: cand.length, marcadas: nombres([...marcadas.values()]), noAsistio: nombres(noAsist), noIdentificada: nombres(noIdent), sinMatch };
        if (body.aplicar !== true) return json({ ok: true, vista: true, ...informe });
        const txt = `Clasificación de la clase del ${e.date}`;
        const ops = [
          ...[...marcadas.values()].map((l) => [l, {
            status: (RANGO[nivel] ?? 0) > (RANGO[l.status] ?? 0) ? nivel : l.status,
            asistencia: anotarAsistencia(l, estaClase, { [nivel === 'entro' ? 'entro' : 'confirmada']: inicio, fuente: 'meet' }, true),
          }, `${txt}: ${ETAPA_TXT[nivel]}`]),
          ...noAsist.map((l) => [l, { status: 'no_asistio' }, `${txt}: No asistió`]),
          ...noIdent.map((l) => [l, { status: 'no_identificada' }, `${txt}: No identificada (dice que estuvo, pero no está en la lista)`]),
        ];
        for (let i = 0; i < ops.length; i += 400) {
          const lote = firestore.batch();
          ops.slice(i, i + 400).forEach(([l, cambios, texto]) => lote.update(l.ref, { ...cambios, eventos: FieldValue.arrayUnion(ev('asistencia', texto)), updatedAt: FieldValue.serverTimestamp() }));
          await lote.commit();
        }
        return json({ ok: true, aplicado: true, ...informe });
      }
      if (body.action === 'nota') {
        const ids = Array.isArray(body.ids) ? [...new Set(body.ids)] : [];
        const texto = typeof body.texto === 'string' ? body.texto.trim().slice(0, 1000) : '';
        if (!texto || !ids.length || ids.length > 30 || ids.some((id) => typeof id !== 'string' || !ID.test(id))) return json({ error: 'Escribe la nota.' }, 400);
        const lote = db().batch();
        ids.forEach((id, i) => lote.update(db().doc(`leads/${id}`), { note: texto, ...(i === 0 ? { eventos: FieldValue.arrayUnion(ev('nota', texto)) } : {}), updatedAt: FieldValue.serverTimestamp() }));
        try { await lote.commit(); } catch (e) {
          if (e.code === 5 || /NOT_FOUND/.test(String(e.message))) return json({ error: 'Esa persona ya no existe. Actualiza la lista.' }, 404);
          throw e;
        }
        return json({ ok: true });
      }
      if (body.action === 'etiquetas') {
        const ids = Array.isArray(body.ids) ? [...new Set(body.ids)] : [];
        const agregar = etiquetasOk(body.agregar), quitar = etiquetasOk(body.quitar);
        if (!ids.length || ids.length > 200 || ids.some((id) => typeof id !== 'string' || !ID.test(id)) || (!agregar.length && !quitar.length)
          || [...agregar, ...quitar].some((t) => t.length > 30) || agregar.length > 10 || quitar.length > 10 || (agregar.length && quitar.length)) return json({ error: 'Etiqueta no válida (hasta 30 letras).' }, 400);
        const lote = db().batch();
        ids.forEach((id) => lote.update(db().doc(`leads/${id}`), { tags: agregar.length ? FieldValue.arrayUnion(...agregar) : FieldValue.arrayRemove(...quitar), updatedAt: FieldValue.serverTimestamp() }));
        try { await lote.commit(); } catch (e) {
          if (e.code === 5 || /NOT_FOUND/.test(String(e.message))) return json({ error: 'Alguna ya no existe. Actualiza la lista.' }, 404);
          throw e;
        }
        return json({ ok: true });
      }
      if (body.action === 'estado') {
        const ids = Array.isArray(body.ids) ? [...new Set(body.ids)] : [];
        if (!ETAPAS.includes(body.status) || !ids.length || ids.length > 200 || ids.some((id) => typeof id !== 'string' || !ID.test(id))) return json({ error: 'Datos no válidos.' }, 400);
        if ('followUp' in body && body.followUp !== '' && !FECHA.test(String(body.followUp))) return json({ error: 'Fecha no válida.' }, 400);
        const lote = db().batch();
        ids.forEach((id) => lote.update(db().doc(`leads/${id}`), {
          status: body.status, ...('followUp' in body ? { followUp: body.followUp } : {}),
          eventos: FieldValue.arrayUnion(ev('etapa', `Etapa: ${ETAPA_TXT[body.status]}`), ...('followUp' in body && body.followUp ? [ev('seguimiento', `Seguimiento para el ${body.followUp}`)] : [])),
          updatedAt: FieldValue.serverTimestamp(),
        }));
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
        let creada = false;
        await firestore.runTransaction(async (tx) => {
          const snap = await tx.get(ref);
          creada = false;
          // Si ya estaba en ese programa, solo avanza de etapa (nunca la baja ni la pisa)
          if (snap.exists) { if ((RANGO[body.status] ?? 0) > (RANGO[snap.data().status] ?? 0)) tx.update(ref, { status: body.status, updatedAt: FieldValue.serverTimestamp() }); return; }
          creada = true;
          tx.set(ref, {
            form: body.form, name: o.name || '', email: o.email || '', whatsapp: o.whatsapp || '', country: o.country || '',
            interest: '', message: '', page: 'crm', utm: {}, status: body.status, desdeForm: o.form || '',
            ...(o.note ? { note: o.note } : {}), ...(o.followUp ? { followUp: o.followUp } : {}), ...(Array.isArray(o.tags) && o.tags.length ? { tags: o.tags } : {}),
            eventos: [ev('programa', `Agregada a mano: etapa ${ETAPA_TXT[body.status]}`)],
            createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(),
          });
        });
        return json({ ok: true, id: ref.id, creada });
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
        if ('motivo' in body) {
          if (typeof body.motivo !== 'string' || (body.motivo && !MOTIVOS.includes(body.motivo))) return json({ error: 'Motivo no válido.' }, 400);
          cambios.motivo = body.motivo;
        }
        if ('contacto' in body) {
          const c = body.contacto && typeof body.contacto === 'object' ? body.contacto : {};
          const name = str(c.name, 120), email = str(c.email, 160).toLowerCase(), whatsapp = str(c.whatsapp, 40), country = str(c.country, 60);
          if (name.length < 2) return json({ error: 'Escribe el nombre.' }, 400);
          if (!email && !whatsapp.replace(/\D/g, '')) return json({ error: 'Deja un correo o un WhatsApp para poder contactarla.' }, 400);
          if (email && !EMAIL.test(email)) return json({ error: 'Revisa el correo.' }, 400);
          Object.assign(cambios, { name, email, whatsapp, country });
        }
        if (!Object.keys(cambios).length) return json({ error: 'No hay cambios.' }, 400);
        const eventos = [
          ...('contacto' in body ? [ev('contacto', 'Datos de contacto actualizados')] : []),
          ...(cambios.status ? [ev('etapa', `Etapa: ${ETAPA_TXT[cambios.status]}${cambios.motivo ? ` (${cambios.motivo})` : ''}`)] : []),
          ...('followUp' in cambios ? [ev('seguimiento', cambios.followUp ? `Seguimiento para el ${cambios.followUp}` : 'Seguimiento quitado')] : []),
        ];
        const lote = db().batch();
        objetivos.forEach((id, i) => lote.update(db().doc(`leads/${id}`), { ...cambios, ...(i === 0 && eventos.length ? { eventos: FieldValue.arrayUnion(...eventos) } : {}), updatedAt: FieldValue.serverTimestamp() }));
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
