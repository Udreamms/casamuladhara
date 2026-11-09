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
