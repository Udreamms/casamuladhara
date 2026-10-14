// Regla única de acceso al aula (la usan el webhook de Stripe y scripts/admin.mjs).
//   Paga al día (cuotas al día o formación pagada): abre hasta su accessLevel (lo sube la Maestra),
//   y como mínimo el nivel siguiente a su acceso permanente.
//   Acceso permanente (grantLevel): niveles ya pagados antes de la plataforma; no se pierden nunca.
//   La Maestra ve todo.
export const LEVELS = 5;
export const INSTALLMENTS = 9;

export const isPaying = (p = {}) => p.plan === 'completo' || (p.plan === 'mensual' && p.paymentStatus === 'ok');

export function accessFor(p = {}) {
  if (p.role === 'admin') return { role: 'admin', lvl: LEVELS };
  const grant = Math.max(0, Math.min(LEVELS, Number(p.grantLevel) || 0));
  const paying = isPaying(p);
  // al pagar se abre, como mínimo, el nivel siguiente al que ya tenía
  const lvl = paying ? Math.min(LEVELS, Math.max(Number(p.accessLevel) || 1, grant + 1)) : grant;
  const role = paying ? 'student_subscribed' : grant ? 'student_permanent' : 'student_free';
  return { role, lvl };
}
