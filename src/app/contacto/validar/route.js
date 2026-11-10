// GET /contacto/validar?codigo=XXXXXXXXXXXX   (Authorization: Bearer <CRM_API_KEY>)
//   -> { valido: true, primer_nombre, estado, clase, sala_url }   o   { valido: false } si el código no existe, fue revocado o venció
import { autorizado } from '@/lib/server/crmapi.js';
import { configClases, contactoPorCodigo, estadoClase, primerNombre } from '@/lib/server/embudo.js';
import { json } from '@/lib/server/services.js';

export async function GET(request) {
  const a = autorizado(request);
  if (a !== true) return json({ error: a }, a === 'sin_clave_configurada' ? 503 : 401);
  try {
    const c = await contactoPorCodigo(new URL(request.url).searchParams.get('codigo'));
    if (!c) return json({ valido: false });
    const cfg = await configClases();
    return json({ valido: true, primer_nombre: primerNombre(c.name), estado: estadoClase(c.status, c.form), clase: c.clase, sala_url: cfg.sala[c.clase] || '' });
  } catch (e) {
    console.error('contacto/validar', e);
    return json({ error: 'error_interno' }, 500);
  }
}
