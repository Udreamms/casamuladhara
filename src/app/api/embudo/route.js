// POST /api/embudo  (Authorization: Bearer <token de la Maestra>, cuerpo { action, ... })  Acciones del portal para las matrículas.
//   action 'reserva' -> { id, pagada, monto?, forzar? }   Péndulo: la reserva se paga por WhatsApp. Al marcarla pagada la persona queda «Reservó cupo»,
//                       con su monto, fecha y el saldo pendiente (precio − reserva), que debe pagarse antes de la primera clase.
//                       Si los cupos están llenos responde 409 { error: 'cupos_llenos' } (con forzar:true la Maestra puede darle el cupo igual).
//                       pagada:false deshace la reserva.
//   action 'saldo'   -> { id }   Marca el saldo pagado: queda «Matriculada» y su curso inscrito. Sale de las secuencias de venta.
import { FieldValue } from 'firebase-admin/firestore';
import { utcAChile } from '@/lib/server/agenda.js';
import { OFERTAS, RANGO, asegurarCurso, configClases, estadoCupos } from '@/lib/server/embudo.js';
import { auth, db, json } from '@/lib/server/services.js';

const ID = /^[A-Za-z0-9]{1,40}$/;
const ev = (tipo, texto) => ({ t: Date.now(), tipo, texto: String(texto).slice(0, 300) });
const clp = (n) => `$${Number(n).toLocaleString('es-CL')}`;

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
    if (typeof body.id !== 'string' || !ID.test(body.id)) return json({ error: 'Datos no válidos.' }, 400);
    const ref = db().doc(`leads/${body.id}`), snap = await ref.get();
    if (!snap.exists) return json({ error: 'Esa persona ya no existe. Actualiza la lista.' }, 404);
    const l = snap.data();
    if ((l.clase || '') !== 'pendulo') return json({ error: 'La reserva y el saldo son del curso de Péndulo.' }, 400);
    await configClases(); // aplica los cambios de precio, reserva y cupos hechos en /staff
    const o = OFERTAS.pendulo, ahora = Date.now();

    if (body.action === 'reserva') {
      if (body.pagada === false) {
        await ref.update({
          reservaPagada: false, reservaMonto: 0, reservaFecha: 0, ...(l.status === 'reservo_cupo' ? { status: 'vio_oferta' } : {}),
          eventos: FieldValue.arrayUnion(ev('etapa', 'Reserva deshecha')), updatedAt: FieldValue.serverTimestamp(),
        });
        return json({ ok: true });
      }
      const yaTieneCupo = ['reservo_cupo', 'matriculada', 'inscrita'].includes(l.status);
      if (!yaTieneCupo && body.forzar !== true) {
        const e = await estadoCupos('pendulo');
        if (e.cupos != null && e.cupos_disponibles === 0) return json({ error: 'cupos_llenos', cupos: e.cupos, ocupados: e.ocupados, lista_espera: e.lista_espera }, 409);
      }
      const monto = Number(body.monto) > 0 ? Math.round(Number(body.monto)) : Number(o.reserva) || 10000;
      const hoy = utcAChile(ahora).fecha;
      const cambios = {
        reservaPagada: true, reservaMonto: monto, reservaFecha: ahora, saldoLimite: o.inicio,
        ...((RANGO[l.status] ?? 0) < RANGO.reservo_cupo ? { status: 'reservo_cupo' } : {}),
        ...(!l.followUp || l.followUp < hoy ? { followUp: o.inicio > hoy ? o.inicio : hoy } : {}),
      };
      await ref.update({
        ...cambios,
        eventos: FieldValue.arrayUnion(ev('etapa', `Reservó cupo: ${clp(monto)} por WhatsApp. Saldo pendiente ${clp(Math.max(0, o.precio - monto))}, antes de la primera clase (${o.inicio})`)),
        updatedAt: FieldValue.serverTimestamp(),
      });
      return json({ ok: true, saldo: Math.max(0, o.precio - monto), cupos: await estadoCupos('pendulo') });
    }

    // saldo pagado: la persona queda matriculada
    const reserva = l.reservaPagada ? Number(l.reservaMonto) || 0 : 0, saldo = Math.max(0, o.precio - reserva);
    await ref.update({
      status: 'matriculada', saldoPagado: true, saldoFecha: ahora, secuenciasVenta: false, followUp: '',
      pago: { t: ahora, monto: o.precio, moneda: o.moneda },
      pagos: FieldValue.arrayUnion({ t: ahora, monto: saldo, moneda: o.moneda, tipo: 'saldo' }),
      eventos: FieldValue.arrayUnion(ev('etapa', `Saldo pagado (${clp(saldo)}): matriculada`)), updatedAt: FieldValue.serverTimestamp(),
    });
    try { await asegurarCurso(l, 'pendulo'); } catch (e) { console.error('embudo curso', e); }
    return json({ ok: true });
  } catch (e) {
    console.error('api/embudo', e);
    return json({ error: 'No se pudo completar la acción. Inténtalo de nuevo.' }, 500);
  }
}
