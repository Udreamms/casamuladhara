import { pagina } from '@/lib/pagina';
import { reservaPendulo } from '@/lib/server/banderas.js';

// Con EMBUDO_RESERVA_PENDULO=1 (o en local) se ve la página de venta con reserva; sin ella, la de siempre.
const { metadata, viewport, Pagina } = pagina(reservaPendulo() ? 'pendulo' : 'pendulo-sin-reserva');
export { metadata, viewport };
export default Pagina;
