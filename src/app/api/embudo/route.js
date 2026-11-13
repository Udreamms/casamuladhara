// POST /api/embudo  (Authorization: Bearer <token de la Maestra>, cuerpo { action, ... })  Acciones del portal para las reservas y las matrículas.
// La reserva vive en lead.reserva = { monto, moneda, estado: 'iniciada' | 'sin_pago' | 'pagada', t, pagadaT?, stripeSession?, marcadaPor? } (la crea la landing al apretar «Reservar»;
// el webhook de Stripe la pasa a 'pagada' en el Tarot; en el Péndulo —Mercado Pago no avisa— la marca la Maestra a mano). La etapa (status) NO cambia al marcar la reserva.
//   action 'reserva' -> { id, pagada, forzar? }   pagada:true  = «Marcar reserva pagada»: reserva.estado = 'pagada', con su monto, moneda, fecha y quién la marcó (queda en el historial).
//                       Si hay un máximo de cupos y están llenos (solo con la lista de espera encendida) responde 409 { error: 'cupos_llenos' }; con forzar:true se da el cupo igual.
//                       pagada:false = «Deshacer»: vuelve a 'iniciada'. Sirve para el Péndulo (Mercado Pago) y para el Tarot si alguien paga por otra vía.
//   action 'saldo'   -> { id }   «Saldo pagado»: la persona queda Matriculada (en una clase gratis, 'matriculada'; en la tarjeta del curso, 'inscrita': la etapa equivalente que ya tiene ese programa)
//                       y su curso inscrito. Sale de las secuencias de venta. El cobro del saldo lo envía Karen por WhatsApp: aquí solo se anota que se pagó.
// Las reservas del Péndulo anotadas antes con reservaPagada / reservaMonto / reservaFecha se siguen leyendo; lo nuevo se guarda solo en lead.reserva.
import { FieldValue } from 'firebase-admin/firestore';
import { FUNCIONES, OFERTAS, asegurarCurso, configClases, esClaseGratis, estadoCupos } from '@/lib/server/embudo.js';
import { auth, db, json } from '@/lib/server/services.js';

const ID = /^[A-Za-z0-9]{1,40}$/;
const ev = (tipo, texto, por) => ({ t: Date.now(), tipo, texto: String(texto).slice(0, 300), ...(por ? { por: String(por).slice(0, 120) } : {}) });
const dinero = (n, mon) => (mon === 'USD' ? `${Number(n).toLocaleString('es-CL')} USD` : `$${Number(n).toLocaleString('es-CL')} CLP`);

export async function POST(request) {
  let user;
  try {
    user = await auth().verifyIdToken((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  } catch (e) {
    return json({ error: 'Tu sesión expiró. Vuelve a entrar al portal.' }, 401);
  }
  if (user.admin !== true) return json({ error: 'Esta acción es solo para la Maestra.' }, 403);
  const body = await request.json().catch(() => ({}));
  try {
    if (!['reserva', 'saldo'].includes(body.action)) return json({ error: 'Acción desconocida.' }, 400);
    if (!FUNCIONES.reserva) return json({ error: 'La reserva y el saldo están desactivados por ahora.' }, 409);
    if (typeof body.id !== 'string' || !ID.test(body.id)) return json({ error: 'Datos no válidos.' }, 400);
    const ref = db().doc(`leads/${body.id}`), snap = await ref.get();
    if (!snap.exists) return json({ error: 'Esa persona ya no existe. Actualiza la lista.' }, 404);
    const l = snap.data(), clase = l.clase || '';
    if (!['pendulo', 'tarot'].includes(clase)) return json({ error: 'La reserva y el saldo son de los cursos de Péndulo y Tarot.' }, 400);
    await configClases(); // aplica los cambios de precio y reserva hechos en /staff
    const o = OFERTAS[clase], ahora = Date.now(), quien = user.email || user.uid, r = l.reserva && typeof l.reserva === 'object' ? l.reserva : {};
    const moneda = r.moneda || o.moneda, monto = Number(r.monto) > 0 ? Number(r.monto) : Number(o.reserva) || (clase === 'tarot' ? 10 : 10000);

    if (body.action === 'reserva') {
      if (body.pagada === false) {
        await ref.update({
          ...(r.estado ? { 'reserva.estado': 'iniciada', 'reserva.pagadaT': FieldValue.delete(), 'reserva.marcadaPor': FieldValue.delete() } : {}),
          ...(l.reservaPagada ? { reservaPagada: false, reservaMonto: 0, reservaFecha: 0 } : {}), // reserva anotada con el sistema anterior
          ...(l.status === 'reservo_cupo' ? { status: 'vio_oferta' } : {}),
          eventos: FieldValue.arrayUnion(ev('reserva', `Reserva deshecha por ${quien}: vuelve a «Reserva iniciada, sin pago»`, quien)), updatedAt: FieldValue.serverTimestamp(),
        });
        return json({ ok: true });
      }
      const yaTieneCupo = String(r.estado || '').startsWith('pag') || l.reservaPagada === true || ['reservo_cupo', 'matriculada', 'inscrita'].includes(l.status);
      if (!yaTieneCupo && body.forzar !== true) {
        const e = await estadoCupos(clase);
        if (e && e.cupos != null && e.cupos_disponibles === 0) return json({ error: 'cupos_llenos', cupos: e.cupos, ocupados: e.ocupados, lista_espera: e.lista_espera }, 409);
      }
      // Marcar pagada: solo se toca la reserva (monto y moneda los que ya tenía la reserva, o los de la oferta); la etapa no cambia
      await ref.update({
        reserva: { ...r, monto, moneda, estado: 'pagada', t: r.t || ahora, pagadaT: ahora, marcadaPor: quien },
        eventos: FieldValue.arrayUnion(ev('reserva', `Reserva marcada como pagada a mano por ${quien}: ${dinero(monto, moneda)}`, quien)),
        updatedAt: FieldValue.serverTimestamp(),
      });
      return json({ ok: true, monto, moneda });
    }

    // Saldo pagado: la persona queda matriculada. Péndulo: precio − reserva. Tarot: la 1.ª cuota (precio − reserva); la 2.ª se cobra el mes siguiente
    const reservaPagada = String(r.estado || '').startsWith('pag') || l.reservaPagada === true;
    const pagadoReserva = reservaPagada ? (Number(r.monto) || Number(l.reservaMonto) || monto) : 0, saldo = Math.max(0, o.precio - pagadoReserva);
    await ref.update({
      status: esClaseGratis(l.form) ? 'matriculada' : 'inscrita', saldoPagado: true, saldoFecha: ahora, secuenciasVenta: false, followUp: '',
      pago: { t: ahora, monto: o.precio, moneda: o.moneda },
      pagos: FieldValue.arrayUnion({ t: ahora, monto: saldo, moneda: o.moneda, tipo: 'saldo' }),
      eventos: FieldValue.arrayUnion(ev('etapa', `Saldo pagado (${dinero(saldo, o.moneda)}) · marcado por ${quien}: matriculada`, quien)), updatedAt: FieldValue.serverTimestamp(),
    });
    try { await asegurarCurso(l, clase); } catch (e) { console.error('embudo curso', e); }
    return json({ ok: true });
  } catch (e) {
    console.error('api/embudo', e);
    return json({ error: 'No se pudo completar la acción. Inténtalo de nuevo.' }, 500);
  }
}
