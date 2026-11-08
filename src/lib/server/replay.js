// Página del replay de una clase: anota que la persona lo vio, muestra el video y la oferta con su fecha límite.
import { OFERTAS, cierreOferta, configClases, contactoPorCodigo, primerNombre, registrarEvento } from '@/lib/server/embudo.js';
import { utcAChile } from '@/lib/server/agenda.js';
import { enlaceInvalido, esc, pagina, reproductor } from '@/lib/server/paginas.js';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const NOMBRE = { pendulo: 'Péndulo Hebreo', tarot: 'Tarot Terapéutico' };

export async function paginaReplay(request, clase) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const c = await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    await registrarEvento({ codigo, evento: 'vio_replay', fechaIso: new Date().toISOString(), origen: 'replay' });
    const url = (await configClases()).replay[clase];
    const oferta = OFERTAS[clase], cierre = cierreOferta(clase);
    const f = cierre ? utcAChile(cierre) : null, d = f ? new Date(`${f.fecha}T00:00:00Z`) : null;
    const limite = f ? `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} a las ${f.hora} (hora de Chile)` : '';
    const abierta = !cierre || Date.now() < cierre;
    return pagina(`Replay · ${NOMBRE[clase]}`, `<h1>Replay de la clase de ${NOMBRE[clase]}</h1><p>Hola ${esc(primerNombre(c.name))}, aquí tienes la clase completa.</p>
      ${/^https:\/\//i.test(url || '') ? reproductor(url) : '<p class="muted">El replay estará disponible en unos momentos. Vuelve a abrir este enlace más tarde.</p>'}
      ${oferta ? (abierta ? `<p>Si quieres seguir profundizando, la inscripción al curso está abierta hasta el <b>${esc(limite)}</b>.</p><a class="b" href="/comprar?l=${esc(codigo)}">Quiero inscribirme</a>` : '<p class="muted">La inscripción a este curso ya cerró. Escríbenos para avisarte de la próxima fecha.</p>') : ''}`);
  } catch (e) {
    console.error('replay', e);
    return pagina('Error', '<h1>No pudimos abrir el replay</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
