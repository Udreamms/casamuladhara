// /api/terapias  — agenda de terapias sobre el Calendario de la Maestra (calendario/{id})
//   GET  -> { slots: [ms UTC…], tz, duracion }   horas de inicio libres (nunca devuelve datos de otras personas)
//   POST -> { terapia, modalidad, start, name, whatsapp, email, direccion, tz, web }
//           guarda la cita en el calendario (type 'terapia') y responde { ok, start, fecha, hora, duracion, modalidad, enlace? }
// La escritura se hace aquí, con la llave de servicio: el navegador no escribe en Firestore.
import { FieldValue } from 'firebase-admin/firestore';
import { db, json } from '@/lib/server/services.js';
import { TERAPIAS, LIMPIEZA, ZONAS_CHILE, DURACION, TZ, horasLibres, utcAChile } from '@/lib/server/agenda.js';

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HTTPS = /^https:\/\/[^\s"'<>]+$/i;
const zonaValida = (z) => { try { new Intl.DateTimeFormat('en', { timeZone: z }); return true; } catch { return false; } };
const eventos = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));

export async function GET() {
  try {
    const libres = horasLibres(eventos(await db().collection('calendario').get()));
    return json({ slots: libres, tz: TZ, duracion: DURACION });
  } catch (e) {
    console.error('terapias GET', e);
    return json({ error: 'No pudimos cargar los horarios. Inténtalo de nuevo en un momento.' }, 500);
  }
}

export async function POST(request) {
  const b = await request.json().catch(() => ({}));
  // Campo trampa para bots
  if (str(b.web, 200)) return json({ ok: true });
  const terapia = TERAPIAS.includes(b.terapia) ? b.terapia : null;
  const modalidad = ['online', 'presencial'].includes(b.modalidad) ? b.modalidad : null;
  const start = Number(b.start);
  const tz = zonaValida(str(b.tz, 60)) ? str(b.tz, 60) : '';
  const name = str(b.name, 120), email = str(b.email, 160).toLowerCase(), whatsapp = str(b.whatsapp, 40), direccion = str(b.direccion, 240);
  if (!terapia || !modalidad || !Number.isFinite(start)) return json({ error: 'Faltan datos de la sesión. Vuelve a elegir tu horario.' }, 400);
  if (name.length < 2) return json({ error: 'Escribe tu nombre.' }, 400);
  if (whatsapp.replace(/\D/g, '').length < 8) return json({ error: 'Escribe tu WhatsApp con el código de país.' }, 400);
  if (!EMAIL.test(email)) return json({ error: 'Revisa tu correo.' }, 400);
  const enChile = ZONAS_CHILE.includes(tz);
  if (modalidad === 'presencial' && !enChile) return json({ error: 'La sesión presencial es solo para personas en Chile. Elige online.' }, 400);
  if (terapia === LIMPIEZA) {
    if (modalidad !== 'presencial' || !enChile) return json({ error: 'La limpieza de espacios es presencial y solo en Chile.' }, 400);
    if (direccion.length < 8) return json({ error: 'Escribe la dirección del lugar a limpiar.' }, 400);
  }
  try {
    const firestore = db();
    const ref = firestore.collection('calendario').doc();
    const dig = whatsapp.replace(/\D/g, '');
    const cita = await firestore.runTransaction(async (tx) => {
      const todos = eventos(await tx.get(firestore.collection('calendario')));
      if (!horasLibres(todos).includes(start)) return null; // ya no está libre (o está fuera de horario)
      const { fecha, hora } = utcAChile(start);
      // Para que nadie llene el calendario: máximo 3 sesiones futuras por WhatsApp o correo
      const hoy = utcAChile(Date.now()).fecha;
      const mias = todos.filter((e) => e.type === 'terapia' && e.date >= hoy && (e.email === email || String(e.whatsapp || '').replace(/\D/g, '') === dig));
      if (mias.length >= 3) return 'limite';
      const nota = [`Reservó en la web`, modalidad === 'online' ? 'Online' : `Presencial${direccion ? ` · ${direccion}` : ''}`, `WhatsApp ${whatsapp}`, email, tz && `Zona de la persona: ${tz}`].filter(Boolean).join(' · ');
      tx.set(ref, {
        type: 'terapia', title: `${terapia} · ${name}`, date: fecha, time: hora, endDate: '', note: nota, duration: DURACION,
        terapia, name, email, whatsapp, modalidad, direccion, clientTz: tz, start, source: 'web', createdAt: FieldValue.serverTimestamp(),
      });
      return { fecha, hora };
    });
    if (cita === null) return json({ error: 'Ese horario ya no está disponible. Elige otro, por favor.', refrescar: true }, 409);
    if (cita === 'limite') return json({ error: 'Ya tienes varias sesiones agendadas. Escríbenos por WhatsApp si necesitas otra.' }, 429);
    let enlace = '';
    if (modalidad === 'online') {
      const g = ((await firestore.doc('config/clases').get()).data() || {}).enlaceTerapias;
      if (typeof g === 'string' && HTTPS.test(g.trim())) enlace = g.trim();
    }
    return json({ ok: true, id: ref.id, start, fecha: cita.fecha, hora: cita.hora, duracion: DURACION, modalidad, ...(enlace ? { enlace } : {}) });
  } catch (e) {
    console.error('terapias POST', e);
    return json({ error: 'No pudimos agendar tu sesión. Escríbenos por WhatsApp y te ayudamos.' }, 500);
  }
}
