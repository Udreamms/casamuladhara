import { pagina } from '@/lib/pagina';
import { reservaTarot } from '@/lib/server/banderas.js';

// Con EMBUDO_RESERVA_TAROT=1 (o en local) se ve la página de venta con reserva; sin ella, la de siempre.
const { metadata, viewport, Pagina } = pagina(reservaTarot() ? 'tarot' : 'tarot-sin-reserva');
export { metadata, viewport };
export default Pagina;
