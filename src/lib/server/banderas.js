// Funciones del embudo que están escritas pero APAGADAS. Se encienden con EMBUDO_EXTRAS=1 (variable de entorno); sin ella no se ven ni se usan:
//   - reserva de $10.000 por WhatsApp y saldo del Péndulo
//   - página de gracias con video de Karen y archivo del calendario (/clase-*/gracias, /calendario) y su video de bienvenida
//   - lista de espera y cupos
export const extras = () => process.env.EMBUDO_EXTRAS === '1';
