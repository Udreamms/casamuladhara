import { pagina } from '@/lib/pagina';

const { metadata, viewport, Pagina } = pagina('links');

// Semana Black Friday: hasta el lunes 30 de noviembre de 2026 a las 23:59 (hora de Chile) el título y la descripción
// (lo que muestra WhatsApp al compartir el link) hablan de la oferta. Después vuelven solos a los de siempre.
// La página se vuelve a generar cada hora, así que el cambio queda hecho a más tardar a la 1:00 del 1 de diciembre.
const FIN_BLACK_FRIDAY = Date.parse('2026-11-30T23:59:59-03:00');
const NORMAL = {
  title: 'Casa Muladhara · Karen Oyarce',
  description: 'Masterclass gratis, formación de terapeutas y terapias holísticas con Karen Oyarce, Casa Muladhara.',
};
export const revalidate = 3600;
export function generateMetadata() {
  return Date.now() <= FIN_BLACK_FRIDAY ? metadata : { ...metadata, ...NORMAL };
}
export { viewport };
export default Pagina;
