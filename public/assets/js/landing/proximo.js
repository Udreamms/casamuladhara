// Próximo inicio de un curso (/pendulo, /tarot): la fecha la pone la Maestra en su portal (config/cursos, /api/proximas).
// Uso: <script src="/assets/js/landing/proximo.js" data-curso="pendulo"></script>
// Rellena [data-next-start] y muestra [data-next-wrap]. Sin fecha, o si ya pasó: "escríbenos y te avisamos".
// Mientras carga o si falla, los [data-next-wrap] quedan ocultos: nunca se ve una fecha vieja.
(() => {
  const curso = document.currentScript?.dataset.curso;
  if (!curso) return;
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const hoyChile = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    return Date.UTC(+p.year, +p.month - 1, +p.day);
  };
  // 'AAAA-MM-DD' -> 'sábado 21 de noviembre' ('… de 2027' si es más lejos); '' si está vacía, mal escrita o ya pasó
  const fecha = (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); if (!m) return '';
    const t = Date.UTC(+m[1], +m[2] - 1, +m[3]), hoy = hoyChile(); if (t < hoy) return '';
    const d = new Date(t), anioHoy = new Date(hoy).getUTCFullYear();
    const sinAnio = d.getUTCFullYear() === anioHoy || (d.getUTCFullYear() === anioHoy + 1 && t - hoy < 183 * 864e5);
    return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}${sinAnio ? '' : ` de ${d.getUTCFullYear()}`}`;
  };
  fetch(`/api/proximas?tipo=${encodeURIComponent(curso)}`).then((r) => (r.ok ? r.json() : Promise.reject())).then(({ nextStart }) => {
    const f = fecha(nextStart);
    document.querySelectorAll('[data-next-start]').forEach((el) => (el.textContent = f || 'escríbenos y te avisamos'));
    document.querySelectorAll('[data-next-wrap]').forEach((el) => (el.hidden = false));
  }).catch(() => { /* quedan ocultos */ });
})();
