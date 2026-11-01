// Fechas y horarios de las landings: salen del Calendario de la Maestra (/api/horarios), nunca escritos en el HTML.
// Uso: <script src="/assets/js/landing/horarios.js" data-clase="clase-tarot|clase-pendulo" | data-curso="tarot|pendulo" defer></script>
//   data-clase  -> "Próxima clase", el selector de fechas (#saturdays) y el bloque "Tu siguiente paso"
//   data-curso  -> rellena [data-next-start] (inicio) y [data-next-detalle] (todas las fechas) y muestra [data-next-wrap]
//   en cualquier página rellena [data-hr-zona] (hora de Chile y su equivalente en la zona de quien mira) y [data-hr-form] (próximo grupo de la formación)
// Si falla, o si no hay fechas confirmadas, queda el texto fijo de la página (sin fechas): nunca una fecha vieja.
(() => {
  const yo = document.currentScript?.dataset || {};
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const may = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const partes = (f) => { const [y, m, d] = f.split('-').map(Number); return { y, m: m - 1, d, dia: DIAS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] }; };
  const anioHoy = new Date().getFullYear();
  // El año solo aparece si la fecha cae en otro año y está a más de 6 meses
  const mes = (p) => `${MESES[p.m]}${p.y !== anioHoy && Date.UTC(p.y, p.m, p.d) - Date.now() > 183 * 864e5 ? ` de ${p.y}` : ''}`;
  const fecha = (f) => { const p = partes(f); return `${p.dia} ${p.d} de ${mes(p)}`; };
  const hora = (h) => h.replace(/^0/, '');
  const rango = (h, fin) => (fin ? `${hora(h)} a ${hora(fin)}` : hora(h));

  // Sesiones de un curso: agrupa por horario ("Miércoles 18 y jueves 19 de noviembre, 19:00 a 21:00 online · Sábado 21, 9:00 a 13:00 práctica")
  const sesiones = (lista) => {
    const grupos = [];
    for (const s of lista) { const k = `${s.hora}|${s.fin}`; let g = grupos.find((x) => x.k === k); if (!g) grupos.push((g = { k, hora: s.hora, fin: s.fin, s: [] })); g.s.push(s); }
    let mesAnterior = '';
    return grupos.map((g) => {
      const notas = [...new Set(g.s.map((s) => s.nota).filter(Boolean))];
      const ps = g.s.map((s) => ({ ...partes(s.fecha), nota: s.nota }));
      const mismoMes = ps.every((p) => p.m === ps[0].m && p.y === ps[0].y);
      let t;
      if (notas.length > 1) t = `${ps.map((p) => `${p.dia} ${p.d} de ${mes(p)}${p.nota ? ` ${p.nota}` : ''}`).join(' y ')}, ${rango(g.hora, g.fin)}`;
      else {
        const dias = ps.map((p) => `${p.dia} ${p.d}`);
        const m = mismoMes ? mes(ps[0]) : '';
        t = `${mismoMes ? `${dias.join(' y ')}${m === mesAnterior ? '' : ` de ${m}`}` : ps.map((p) => `${p.dia} ${p.d} de ${mes(p)}`).join(' y ')}, ${rango(g.hora, g.fin)}${notas[0] ? ` ${notas[0]}` : ''}`;
        if (mismoMes) mesAnterior = m;
      }
      return t;
    }).map(may).join(' · ');
  };

  // Hora de Chile y su equivalente en la zona de quien mira la página: sirve para cualquier país y cambia sola con el horario de verano de Chile
  const CHILE = ['America/Santiago', 'America/Punta_Arenas', 'Pacific/Easter'];
  const miZona = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; } })();
  const desfase = (tz, ts) => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(ts).map((x) => [x.type, x.value])); return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - ts) / 36e5; };
  // 'AAAA-MM-DD' + 'HH:MM' en hora de Chile -> instante (ms UTC)
  const chileAUtc = (f, h) => { const [y, m, d] = f.split('-').map(Number), [hh, mm] = h.split(':').map(Number), base = Date.UTC(y, m - 1, d, hh, mm), o = (t) => desfase('America/Santiago', t) * 36e5; return base - o(base - o(base)); };
  const zona = (f, h = '19:00') => {
    if (!miZona || CHILE.includes(miZona)) return 'Hora de Chile.';
    try {
      const t = chileAUtc(f, h), dia = new Intl.DateTimeFormat('en-CA', { timeZone: miZona }).format(t);
      const hora = new Intl.DateTimeFormat('es', { timeZone: miZona, hour: 'numeric', minute: '2-digit', hourCycle: 'h23' }).format(t);
      return `Hora de Chile. En tu zona horaria (${miZona.replace(/_/g, ' ')}) serían las ${hora}${dia > f ? ' del día siguiente' : dia < f ? ' del día anterior' : ''}.`;
    } catch { return 'Hora de Chile.'; }
  };
  const hoyISO = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());

  fetch('/api/horarios').then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => {
    const prim = yo.clase === 'clase-tarot' ? d.claseTarot?.[0] : yo.clase === 'clase-pendulo' ? d.clasePendulo?.[0] : yo.curso === 'tarot' ? d.tarot : yo.curso === 'pendulo' ? d.pendulo?.sesiones?.[0] : null;
    document.querySelectorAll('[data-hr-zona]').forEach((el) => { el.textContent = zona(prim?.fecha || hoyISO(), el.dataset.hora || prim?.hora || '19:00'); el.hidden = false; });
    const form = d.formacion?.fecha ? fecha(d.formacion.fecha) : '';
    document.querySelectorAll('[data-hr-form]').forEach((el) => (el.textContent = form));

    // Clases gratis (martes Tarot / sábado Péndulo)
    if (yo.clase) {
      const lista = yo.clase === 'clase-tarot' ? d.claseTarot : d.clasePendulo, dia = yo.clase === 'clase-tarot' ? 'martes' : 'sábado';
      if (lista?.length) {
        const txt = (c) => `${may(fecha(c.fecha))} · ${hora(c.hora)}`;
        const next = document.getElementById('next-class'); if (next) next.textContent = `Próxima clase: ${fecha(lista[0].fecha)} · ${hora(lista[0].hora)}`;
        const sel = document.getElementById('saturdays');
        if (sel) sel.replaceChildren(...lista.map((c) => { const o = new Option(txt(c), txt(c)); o.dataset.date = c.fecha; return o; }), new Option(`Avísenme del próximo ${dia}`, `Avísenme del próximo ${dia}`));
      }
      // Tu siguiente paso: el próximo curso y la formación
      const bloque = document.querySelector('[data-hr-siguiente]');
      if (bloque) {
        const curso = yo.clase === 'clase-tarot' ? d.tarot && `${fecha(d.tarot.fecha)}, ${rango(d.tarot.hora, d.tarot.fin)}` : d.pendulo && sesiones(d.pendulo.sesiones);
        bloque.querySelectorAll('[data-hr-curso]').forEach((el) => { el.textContent = curso || ''; el.closest('[data-hr-linea]').hidden = !curso; });
        bloque.querySelectorAll('[data-hr-form]').forEach((el) => (el.closest('[data-hr-linea]').hidden = !form));
        bloque.hidden = !curso && !form;
      }
    }

    // Cursos: /tarot y /pendulo
    if (yo.curso) {
      const g = yo.curso === 'tarot' ? d.tarot : d.pendulo;
      if (g) {
        const inicio = yo.curso === 'tarot' ? `${fecha(g.fecha)}, ${rango(g.hora, g.fin)}` : fecha(g.sesiones[0].fecha);
        const detalle = yo.curso === 'tarot' ? inicio : sesiones(g.sesiones);
        document.querySelectorAll('[data-next-start]').forEach((el) => (el.textContent = inicio));
        document.querySelectorAll('[data-next-detalle]').forEach((el) => (el.textContent = detalle));
        document.querySelectorAll('[data-next-wrap]').forEach((el) => (el.hidden = false));
      }
    }
  }).catch(() => { /* quedan los textos fijos de la página, sin fechas */ });

  // La diferencia horaria también se muestra si falla la carga (con la fecha de hoy)
  document.querySelectorAll('[data-hr-zona]').forEach((el) => { el.textContent = zona(hoyISO(), el.dataset.hora || '19:00'); el.hidden = false; });
})();
