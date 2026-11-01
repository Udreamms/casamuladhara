// Precios en pesos chilenos: junto a un precio en USD se muestra una línea corta con el equivalente al dólar de hoy (/api/dolar),
// SOLO a quien visita desde Chile (zona horaria de Chile). El resto del mundo ve únicamente los dólares.
// Uso: <p class="clp" data-clp="al mes:70,en total:140" hidden></p>  (etiqueta:monto en USD, separados por coma)
// Si el valor del dólar no carga, la línea queda oculta: nunca se muestra un valor inventado.
(() => {
  const cajas = [...document.querySelectorAll('[data-clp]')];
  if (!cajas.length) return;
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { /* sin zona */ }
  if (!['America/Santiago', 'America/Punta_Arenas', 'Pacific/Easter'].includes(tz)) return;
  const pesos = (n) => `$${new Intl.NumberFormat('es-CL').format(Math.round(n / 100) * 100)}`;
  fetch('/api/dolar').then((r) => (r.ok ? r.json() : Promise.reject())).then(({ clp }) => {
    if (!(clp > 300)) return;
    for (const el of cajas) {
      const partes = el.dataset.clp.split(',').map((p) => p.split(':')).filter(([, usd]) => Number(usd) > 0);
      if (!partes.length) continue;
      el.textContent = `En pesos chilenos: ≈ ${partes.map(([etiqueta, usd]) => `${pesos(Number(usd) * clp)} ${etiqueta.trim()}`).join(' · ')} (referencial)`;
      el.hidden = false;
    }
  }).catch(() => { /* queda oculto */ });
})();
