// Filas que se muestran de lead.postulacion en la ficha de la Formación (lógica pura; prueba: scripts/pruebas_crm_postulacion.mjs).
// Postulación nueva: { motivo, experiencia, horas, t }. Las antiguas traen además objetivo, inicio e inversion: esas solo se muestran si la ficha las tiene.
// «experiencia» cambió de pregunta: en la nueva es «Cursos holísticos» (Sí, con Karen / Sí, en otro lugar / No, empiezo desde cero); en la antigua sigue como «Experiencia».
export const filasPostulacion = (po = {}) => {
  const nueva = !!(po.motivo || po.horas);
  return [
    ['motivo', 'Qué la mueve'],
    ['experiencia', nueva ? 'Cursos holísticos' : 'Experiencia'],
    ['horas', 'Horas por semana'],
    ['objetivo', 'Objetivo'],
    ['inicio', 'Cuándo quiere empezar'],
    ['inversion', 'Inversión'],
  ].filter(([k]) => ['motivo', 'experiencia', 'horas'].includes(k) ? (k === 'experiencia' || po[k]) : po[k])
    .map(([k, t]) => [t, po[k] || '—']);
};
