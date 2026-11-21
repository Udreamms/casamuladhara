// Semana Black Friday de la Formación en el CRM (lógica pura, se prueba en Node: scripts/pruebas_crm_black_friday.mjs).
// La ficha de la Formación trae lead.blackFriday = { plan, t } (lo marca /api/leads). Si la persona ya había postulado, es la misma ficha y se conserva su postulación.
export const BONO_EXALUMNA = 20000;
const clp = (n) => `$${Number(n).toLocaleString('es-CL')}`;

// Plan de Black Friday de la persona (el más reciente), o null
export const blackFridayDe = (leads = []) => {
  const bf = leads.filter((l) => l?.blackFriday && typeof l.blackFriday === 'object')
    .sort((a, b) => (Number(b.blackFriday.t) || 0) - (Number(a.blackFriday.t) || 0))[0]?.blackFriday;
  return bf ? { plan: String(bf.plan || 'Black Friday'), t: Number(bf.t) || 0 } : null;
};

// Exalumna: tiene pagos de Péndulo o de Tarot (uno o los dos). pagoHecho = criterio del CRM para una ficha; ownedLevels = niveles comprados en el aula (1 Péndulo, 5 Tarot).
export const esExalumna = (leads = [], pagoHecho = () => false, ownedLevels = []) =>
  leads.some((l) => ['pendulo', 'tarot', 'clase-pendulo', 'clase-tarot'].includes(l.form) && pagoHecho(l)) || ownedLevels.some((n) => n === 1 || n === 5);

// Texto para Karen: cómo queda el link de Mercado Pago con el bono ($20.000 una sola vez, aunque tenga Péndulo y Tarot)
export const textoBono = (plan = '') => {
  const cuotas = /cuota/i.test(plan), m = String(plan).match(/\$\s*([\d.]+)/), monto = m ? Number(m[1].replace(/\./g, '')) : 0;
  const cuenta = !monto ? '' : cuotas ? ` En cuotas: la 1.ª de ${clp(monto - BONO_EXALUMNA)} y las otras 8 de ${clp(monto)}.` : ` Al contado: ${clp(monto - BONO_EXALUMNA)}.`;
  return `Exalumna: bono de ${clp(BONO_EXALUMNA)}.${cuenta}`;
};
