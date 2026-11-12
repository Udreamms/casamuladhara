// Banderas del embudo.
// Página de gracias de las clases gratis (/clase-*/gracias y /calendario): ACTIVA de forma permanente.
export const gracias = () => true;
// Funciones escritas pero APAGADAS: se encienden con EMBUDO_EXTRAS=1 (variable de entorno). Sin ella no se ven ni se usan:
//   - reserva de $10.000 por WhatsApp y saldo del Péndulo
//   - lista de espera y cupos
export const extras = () => process.env.EMBUDO_EXTRAS === '1';
// /asistencia (palabra de asistencia) y /confirmar (botones «Sí estuve» / «No pude entrar»): APAGADOS por decisión del usuario.
// El código sigue en src/app/asistencia y src/app/confirmar; sin esta bandera responden «enlace no válido» y ninguna página los menciona.
export const asistenciaPalabra = () => false;
// Invitación a crear la cuenta de la plataforma (clases gratis en el aula) en la landing del replay.
// En el computador local se ve siempre; en producción se enciende con EMBUDO_PLATAFORMA=1 cuando el aula ya tenga las clases gratis abiertas.
export const plataforma = () => process.env.NODE_ENV !== 'production' || process.env.EMBUDO_PLATAFORMA === '1';
// Dirección donde crean su cuenta gratis en el aula (único lugar; la landing le agrega &l=<codigo> si la persona tiene código).
export const PLATAFORMA_URL = '/login?register=true&origen=clase-gratis&ver=gratis';
// Reserva de $10.000 del Péndulo en /pendulo (botón directo a Mercado Pago). Bandera propia, aislada de EMBUDO_EXTRAS:
// en el computador local se ve siempre; en producción y en la vista previa de Vercel se enciende con EMBUDO_RESERVA_PENDULO=1.
// /pendulo es una página fija: la variable debe existir cuando se construye el sitio (build).
export const reservaPendulo = () => process.env.NODE_ENV !== 'production' || process.env.EMBUDO_RESERVA_PENDULO === '1';
// Enlaces de Mercado Pago (valor fijo). El saldo de $59.900 (https://mpago.la/29TeLus) NO va en la web: solo lo envía Karen por WhatsApp.
export const PAGO_RESERVA_PENDULO = 'https://mpago.la/1tk7Mac';
