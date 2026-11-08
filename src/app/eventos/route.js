// POST /eventos   (Authorization: Bearer <CRM_API_KEY>)   cuerpo { codigo, evento, fecha_iso, origen, extra }
//   evento: clic_entrar | codigo_asistencia_ok | autodeclara_asistio | autodeclara_no_asistio | vio_replay | clic_comprar | pago_confirmado
//   extra (pago_confirmado): { monto, moneda }
//   -> { ok: true, ignorado: false, estado }    el mismo evento del mismo contacto en menos de 60 segundos responde { ok: true, ignorado: true }
//   -> 404 { ok: false, error: 'codigo_invalido' }   400 { ok: false, error: 'evento_invalido' }   401/503 sin clave
import { autorizado } from '@/lib/server/crmapi.js';
import { registrarEvento } from '@/lib/server/embudo.js';
import { json } from '@/lib/server/services.js';

export async function POST(request) {
  const a = autorizado(request);
  if (a !== true) return json({ ok: false, error: a }, a === 'sin_clave_configurada' ? 503 : 401);
  const b = await request.json().catch(() => ({}));
  try {
    const r = await registrarEvento({
      codigo: b.codigo, evento: b.evento, fechaIso: b.fecha_iso,
      origen: typeof b.origen === 'string' ? b.origen.slice(0, 40) : '', extra: b.extra && typeof b.extra === 'object' ? b.extra : {},
    });
    if (r.error) return json({ ok: false, error: r.error }, r.status);
    return json(r);
  } catch (e) {
    console.error('eventos', e);
    return json({ ok: false, error: 'error_interno' }, 500);
  }
}
