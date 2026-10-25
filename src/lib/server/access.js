// Regla única de acceso al aula (la usan el webhook de Stripe, el portal de la Maestra y scripts/admin.mjs).
// Cada alumna tiene sus propios niveles abiertos, no necesariamente en orden:
//   ownedLevels    niveles que compró aparte (alumnas antiguas, p. ej. solo el Nivel 3). No se pierden nunca.
//   unlockedLevels niveles del programa completo que la Maestra le va desbloqueando a medida que avanza.
//                  Valen solo mientras el programa está pagado (pago completo o cuotas al día).
//   blocked        la Maestra la bloqueó: no abre ningún nivel.
// Datos antiguos: grantLevel N equivale a ownedLevels 1..N y accessLevel N a unlockedLevels 1..N.
// La Maestra ve todo.
export const LEVELS = 5;
export const INSTALLMENTS = 9;

export const isPaying = (p = {}) => p.plan === 'completo' || (p.plan === 'mensual' && p.paymentStatus === 'ok');

const upTo = (n) => Array.from({ length: Math.max(0, Math.min(LEVELS, Number(n) || 0)) }, (_, i) => i + 1);
// Lista válida de niveles (1 a 5, sin repetir, ordenada); null si el campo no existe
export const cleanLevels = (v) => (Array.isArray(v)
  ? [...new Set(v.map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= LEVELS))].sort((a, b) => a - b)
  : null);

export const ownedOf = (p = {}) => cleanLevels(p.ownedLevels) ?? upTo(p.grantLevel);
export const unlockedOf = (p = {}) => cleanLevels(p.unlockedLevels) ?? upTo(Math.max(Number(p.accessLevel) || 1, (Number(p.grantLevel) || 0) + 1));

export function accessFor(p = {}) {
  if (p.role === 'admin') return { role: 'admin', lvls: upTo(LEVELS), lvl: LEVELS };
  const paying = isPaying(p);
  const owned = ownedOf(p);
  const role = paying ? 'student_subscribed' : owned.length ? 'student_permanent' : 'student_free';
  const lvls = p.blocked === true ? [] : cleanLevels([...owned, ...(paying ? unlockedOf(p) : [])]);
  return { role, lvls, lvl: lvls.length ? lvls[lvls.length - 1] : 0 };
}
