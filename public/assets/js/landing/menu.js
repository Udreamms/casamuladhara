// Menú de las landings: hamburguesa en el celular, un solo desplegable abierto a la vez,
// y se cierran al tocar fuera o con Esc. El botón "Mi cuenta" se actualiza después de cargar la página.
(() => {
  const menu = document.getElementById('menu'), btn = document.getElementById('menu-btn');
  const dds = [...document.querySelectorAll('.menu .dd')];
  const cerrar = (salvo) => dds.forEach((d) => { if (d !== salvo) d.open = false; });
  dds.forEach((d) => d.addEventListener('toggle', () => { if (d.open) cerrar(d); }));
  btn?.addEventListener('click', () => {
    const abierto = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', abierto);
    if (!abierto) cerrar();
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu, #menu-btn')) { cerrar(); menu?.classList.remove('open'); btn?.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { cerrar(); menu?.classList.remove('open'); btn?.setAttribute('aria-expanded', 'false'); } });
  // La sesión se lee sin frenar la carga de la landing
  const cuenta = () => import('/assets/js/landing/cuenta.js').catch(() => {});
  'requestIdleCallback' in window ? requestIdleCallback(cuenta, { timeout: 3000 }) : setTimeout(cuenta, 1500);
})();
