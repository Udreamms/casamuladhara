// Regla única de acceso al aula (la usan el webhook de Stripe, el portal de la Maestra y scripts/admin.mjs).
// Cada alumna tiene sus propios niveles abiertos, no necesariamente en orden:
//   ownedLevels    niveles que compró aparte (alumnas antiguas, p. ej. solo el Nivel 3). No se pierden nunca.
//   unlockedLevels niveles del programa completo que la Maestra le va desbloqueando a medida que avanza.
//                  Valen solo mientras el programa está pagado (pago completo o cuotas al día).
//   blocked        la Maestra la bloqueó: no abre ningún nivel.
// Datos antiguos: grantLevel N equivale a ownedLevels 1..N y accessLevel N a unlockedLevels 1..N.
// El Nivel 4 son cuatro cursos que se abren por separado, cada uno con su número:
//   41 = 4.1 Niño interior · 42 = 4.2 Vidas pasadas · 43 = 4.3 Terapia transgeneracional · 44 = 4.4 Limpieza uterina
// Un 4 suelto (datos de antes de dividirlo) ya no abre nada: la Maestra le abre a cada alumna los cursos que hizo.
// La Maestra ve todo.
export const LEVELS = 5;
export const SUBLEVELS = [41, 42, 43, 44];
export const ALL_LEVELS = [1, 2, 3, ...SUBLEVELS, 5];
export const INSTALLMENTS = 9;
// Nivel al que pertenece un curso: 41 -> 4
export const mainLevel = (n) => (n > 10 ? Math.floor(n / 10) : n);

export const isPaying = (p = {}) => p.plan === 'completo' || (p.plan === 'mensual' && p.paymentStatus === 'ok');

// Datos antiguos: niveles 1..n (sin los cursos del Nivel 4, que se abren uno por uno)
const upTo = (n) => ALL_LEVELS.filter((x) => x <= LEVELS && x <= (Number(n) || 0));
// Lista válida de niveles (1, 2, 3, 41 a 44 y 5, sin repetir, en ese orden); null si el campo no existe
export const cleanLevels = (v) => (Array.isArray(v)
  ? ALL_LEVELS.filter((n) => v.map(Number).includes(n))
  : null);

export const ownedOf = (p = {}) => cleanLevels(p.ownedLevels) ?? upTo(p.grantLevel);
export const unlockedOf = (p = {}) => cleanLevels(p.unlockedLevels) ?? upTo(Math.max(Number(p.accessLevel) || 1, (Number(p.grantLevel) || 0) + 1));

export function accessFor(p = {}) {
  if (p.role === 'admin') return { role: 'admin', lvls: ALL_LEVELS, lvl: LEVELS };
  const paying = isPaying(p);
  const owned = ownedOf(p);
  const role = paying ? 'student_subscribed' : owned.length ? 'student_permanent' : 'student_free';
  const lvls = p.blocked === true ? [] : cleanLevels([...owned, ...(paying ? unlockedOf(p) : [])]);
  // lvl: el nivel más alto que tiene algo abierto (para descargar el código de las clases, ver src/proxy.js)
  return { role, lvls, lvl: Math.max(0, ...lvls.map(mainLevel)) };
}
