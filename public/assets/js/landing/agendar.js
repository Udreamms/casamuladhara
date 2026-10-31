// Agendar una terapia desde la portada: abre una ventana, muestra las horas libres del Calendario de la Maestra (/api/terapias)
// en la zona horaria de la persona y guarda la cita. Cualquier botón con data-agendar="<terapia>" la abre.
(() => {
  const CL = 'America/Santiago';
  const CHILE = [CL, 'America/Punta_Arenas', 'Pacific/Easter'];
  const LIMPIEZA = 'Limpieza energética de espacios';
  const ORIENTA = 'No sé, quiero orientación';
  const TERAPIAS = ['Reiki', 'Radiestesia y Sanación del Alma', 'Péndulo Hebreo', 'Registros Akáshicos', 'Vidas Pasadas', 'Sanando Niño Interior',
    'Terapia Transgeneracional', 'Tarot Terapéutico y Evolutivo', LIMPIEZA, ORIENTA];
  const miTz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || CL; } catch { return CL; } })();
  const enChile = CHILE.includes(miTz);
  const hora = (ts, tz) => new Intl.DateTimeFormat('es', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(ts);
  const dia = (ts, tz) => new Intl.DateTimeFormat('es', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long' }).format(ts);
  const clave = (ts, tz) => new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(ts);
  const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const css = document.createElement('style');
  css.textContent = `
  dialog.ag{border:0;border-radius:22px;padding:0;width:min(520px,94vw);max-height:92vh;overflow:auto;background:#fffdf6;color:#22302a;box-shadow:0 30px 60px -25px rgba(0,0,0,.6);font:15px/1.5 "Mulish","Segoe UI",system-ui,sans-serif}
  dialog.ag::backdrop{background:rgba(20,28,24,.62)}
  .ag-in{padding:26px 24px;display:grid;gap:14px;position:relative}
  .ag-x{position:absolute;top:10px;right:14px;background:none;border:0;font-size:1.7rem;line-height:1;color:#5d6b63;cursor:pointer}
  .ag h3{margin:0;font:400 1.5rem/1.2 "Marcellus",Georgia,serif}
  .ag-eyebrow{font:600 .68rem/1 "Josefin Sans",system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a77a3b}
  .ag label{display:grid;gap:6px;font-size:.82rem;font-weight:700}
  .ag input,.ag select{font:inherit;font-weight:400;padding:12px 14px;border-radius:12px;border:1px solid #d9d5c3;background:#f6f4ec;color:#22302a;width:100%;box-sizing:border-box}
  .ag fieldset{border:0;padding:0;margin:0;display:grid;gap:6px}.ag legend{font-size:.82rem;font-weight:700;padding:0;margin-bottom:6px}
  .ag-mod{display:flex;gap:8px;flex-wrap:wrap}
  .ag-mod label{display:flex;align-items:center;gap:8px;font-weight:600;border:1px solid #d9d5c3;border-radius:12px;padding:10px 14px;background:#f6f4ec;cursor:pointer}
  .ag-mod label:has(input:checked){border-color:#2b5443;background:#e9e4d0}.ag-mod input{width:auto;padding:0}
  .ag-mod label.off{opacity:.45;cursor:not-allowed}
  .ag-tz{margin:0;font-size:.8rem;color:#5d6b63;background:#f0ede1;border-radius:12px;padding:10px 12px}
  .ag-horas{display:flex;gap:8px;flex-wrap:wrap}
  .ag-horas button{font:600 .9rem/1.1 inherit;border:1px solid #d9d5c3;background:#f6f4ec;color:#22302a;border-radius:12px;padding:10px 14px;cursor:pointer;display:grid;gap:2px;text-align:center}
  .ag-horas button small{font-weight:400;font-size:.68rem;color:#5d6b63}
  .ag-horas button[aria-pressed="true"]{background:#2b5443;border-color:#2b5443;color:#ece7d3}.ag-horas button[aria-pressed="true"] small{color:#b9c4b5}
  .ag-note{margin:0;font-size:.8rem;color:#5d6b63}.ag-err{margin:0;color:#b8402f;font-size:.86rem;font-weight:600}
  .ag-go,.ag-btn{display:inline-flex;justify-content:center;align-items:center;font:600 .8rem/1 "Josefin Sans",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;padding:1.05em 1.5em;border-radius:999px;border:0;background:#2b5443;color:#ece7d3;text-decoration:none;cursor:pointer}
  .ag-go[disabled]{opacity:.5;cursor:default}.ag-btn.alt{background:#e9e4d0;color:#1f3f32}
  .ag-ok{display:grid;gap:12px}.ag-ok dl{margin:0;display:grid;gap:4px;background:#f0ede1;border-radius:14px;padding:14px 16px}.ag-ok dt{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a77a3b}.ag-ok dd{margin:0 0 6px}
  .ag-hp{position:absolute!important;left:-9999px!important;opacity:0!important;height:0!important;overflow:hidden!important}`;
  document.head.appendChild(css);

  let dlg, slots = [], cargado = 0;
  const q = (s) => dlg.querySelector(s);

  function construir() {
    dlg = document.createElement('dialog');
    dlg.className = 'ag';
    dlg.setAttribute('aria-label', 'Agendar una terapia');
    dlg.innerHTML = `<div class="ag-in"><button type="button" class="ag-x" aria-label="Cerrar">×</button>
    <form id="ag-form" novalidate style="display:grid;gap:14px">
      <div><span class="ag-eyebrow">Agendar sesión</span><h3>Reserva tu hora con Karen</h3></div>
      <label>Terapia<select name="terapia">${TERAPIAS.map((t) => `<option>${t}</option>`).join('')}</select></label>
      <fieldset class="ag-mod"><legend>Modalidad</legend>
        <label><input type="radio" name="modalidad" value="online" checked> Online</label>
        <label data-pres><input type="radio" name="modalidad" value="presencial"> Presencial · Bellas Artes, Santiago</label>
      </fieldset>
      <p class="ag-note" data-pres-note hidden></p>
      <p class="ag-tz" data-tz></p>
      <label>Día<select data-dia></select></label>
      <div><div class="ag-horas" data-horas role="group" aria-label="Horas disponibles"></div></div>
      <p class="ag-note">Cada sesión dura entre 1 y 2 horas, según la terapia. Reservamos 2 horas para que Karen no se apure.</p>
      <label>Tu nombre<input name="name" autocomplete="name" maxlength="120" required></label>
      <label>WhatsApp (con código de país)<input name="whatsapp" type="tel" autocomplete="tel" placeholder="+56 9 1234 5678" maxlength="40" required></label>
      <label>Correo<input name="email" type="email" autocomplete="email" maxlength="160" required></label>
      <label data-dir hidden>Dirección del lugar a limpiar (Chile)<input name="direccion" maxlength="240" placeholder="Calle, número, comuna"></label>
      <div class="ag-hp" aria-hidden="true"><label>Web<input name="web" tabindex="-1" autocomplete="off"></label></div>
      <p class="ag-err" data-err role="alert" hidden></p>
      <button class="ag-go" type="submit">Confirmar mi sesión</button>
    </form>
    <div class="ag-ok" data-ok hidden></div></div>`;
    document.body.appendChild(dlg);
    q('.ag-x').onclick = () => dlg.close();
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    q('[name=terapia]').onchange = ajustar;
    dlg.querySelectorAll('[name=modalidad]').forEach((r) => (r.onchange = ajustar));
    q('[data-dia]').onchange = pintarHoras;
    q('#ag-form').onsubmit = enviar;
    q('[data-tz]').textContent = enChile || miTz === CL
      ? 'Los horarios están en hora de Chile. Karen atiende de lunes a viernes, de 9:00 a 18:00.'
      : `Los horarios que ves están en TU hora local (${miTz.replace('_', ' ')}). Cada hora muestra también su equivalente en Chile. Karen atiende de lunes a viernes, de 9:00 a 18:00 hora de Chile.`;
  }

  // Modalidad y dirección según la terapia y el país de la persona
  function ajustar() {
    const limpieza = q('[name=terapia]').value === LIMPIEZA;
    const pres = q('[data-pres]'), radioP = pres.querySelector('input'), radioO = q('[name=modalidad][value=online]');
    const nota = q('[data-pres-note]');
    nota.hidden = true;
    pres.classList.toggle('off', !enChile);
    radioP.disabled = !enChile;
    radioO.disabled = limpieza;
    q('[data-dir]').hidden = !(limpieza && enChile);
    if (limpieza) { radioP.checked = enChile; nota.hidden = false; nota.textContent = enChile ? 'La limpieza de espacios es presencial: Karen va al lugar que nos indiques.' : 'La limpieza de espacios es presencial y solo está disponible en Chile.'; }
    else if (!enChile) { radioO.checked = true; nota.hidden = false; nota.textContent = 'Desde fuera de Chile las sesiones son online.'; }
    q('.ag-go').disabled = limpieza && !enChile;
  }

  function pintarDias() {
    const sel = q('[data-dia]'), vistos = new Map();
    for (const ts of slots) { const k = clave(ts, miTz); if (!vistos.has(k)) vistos.set(k, ts); }
    sel.replaceChildren(...[...vistos].map(([k, ts]) => { const o = new Option(mayus(dia(ts, miTz)), k); return o; }));
    if (!vistos.size) sel.replaceChildren(new Option('No hay horas disponibles por ahora', ''));
    pintarHoras();
  }
  function pintarHoras() {
    const cont = q('[data-horas]'), k = q('[data-dia]').value;
    cont.replaceChildren(...slots.filter((ts) => clave(ts, miTz) === k).map((ts) => {
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.ts = ts; b.setAttribute('aria-pressed', 'false');
      b.textContent = hora(ts, miTz);
      if (!enChile && miTz !== CL) { const s = document.createElement('small'); s.textContent = `Chile ${hora(ts, CL)}`; b.appendChild(s); }
      b.onclick = () => { cont.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); };
      return b;
    }));
  }
  async function cargar(forzar) {
    if (!forzar && slots.length && Date.now() - cargado < 60000) return pintarDias();
    q('[data-dia]').replaceChildren(new Option('Cargando horarios…', ''));
    try {
      const r = await fetch('/api/terapias', { cache: 'no-store' });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      slots = d.slots || []; cargado = Date.now();
      pintarDias();
    } catch (e) { q('[data-dia]').replaceChildren(new Option('No pudimos cargar los horarios', '')); error(e.message || 'No pudimos cargar los horarios. Inténtalo de nuevo.'); }
  }
  const error = (m) => { const p = q('[data-err]'); p.textContent = m || ''; p.hidden = !m; };

  async function enviar(ev) {
    ev.preventDefault();
    error('');
    const f = new FormData(q('#ag-form')), elegido = q('[data-horas] [aria-pressed=true]');
    if (!elegido) return error('Elige el día y la hora de tu sesión.');
    const body = { terapia: f.get('terapia'), modalidad: f.get('modalidad'), start: Number(elegido.dataset.ts), name: f.get('name'), whatsapp: f.get('whatsapp'), email: f.get('email'), direccion: f.get('direccion'), tz: miTz, web: f.get('web') };
    if (String(body.name).trim().length < 2) return error('Escribe tu nombre.');
    if (String(body.whatsapp).replace(/\D/g, '').length < 8) return error('Escribe tu WhatsApp con el código de país.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())) return error('Revisa tu correo.');
    if (body.terapia === LIMPIEZA && String(body.direccion).trim().length < 8) return error('Escribe la dirección del lugar a limpiar.');
    const go = q('.ag-go'); go.disabled = true; go.textContent = 'Agendando…';
    try {
      const r = await fetch('/api/terapias', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { if (d.refrescar) await cargar(true); throw new Error(d.error || 'No pudimos agendar tu sesión.'); }
      if (window.fbq) fbq('track', 'Schedule', { content_name: body.terapia });
      gracias(body, d);
    } catch (e) { error(e.message); } finally { go.disabled = false; go.textContent = 'Confirmar mi sesión'; }
  }

  function gracias(b, d) {
    const ok = q('[data-ok]'), fin = d.start + d.duracion * 6e4;
    const iso = (t) => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
    const cal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(`${b.terapia} con Karen · Casa Muladhara`) + `&dates=${iso(d.start)}/${iso(fin)}` + (d.enlace ? '&location=' + encodeURIComponent(d.enlace) : '');
    const el = (t, c, txt) => { const x = document.createElement(t); if (c) x.className = c; if (txt) x.textContent = txt; return x; };
    const dl = el('dl'), fila = (k, v) => { dl.append(el('dt', '', k), el('dd', '', v)); };
    fila('Terapia', b.terapia);
    fila(enChile || miTz === CL ? 'Día y hora (Chile)' : `Día y hora (tu hora, ${miTz.replace('_', ' ')})`, `${mayus(dia(d.start, miTz))} · ${hora(d.start, miTz)}`);
    if (!enChile && miTz !== CL) fila('En hora de Chile', `${mayus(dia(d.start, CL))} · ${hora(d.start, CL)}`);
    fila('Modalidad', d.modalidad === 'online' ? 'Online por Google Meet' : b.terapia === LIMPIEZA ? `En tu lugar: ${b.direccion}` : 'Presencial · Bellas Artes, Santiago de Chile');
    const botones = el('div'); botones.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
    if (d.enlace) { const a = el('a', 'ag-btn', 'Enlace de la sesión (Meet)'); a.href = d.enlace; a.target = '_blank'; a.rel = 'noopener'; botones.append(a); }
    const c = el('a', 'ag-btn alt', 'Agregar a mi calendario'); c.href = cal; c.target = '_blank'; c.rel = 'noopener'; botones.append(c);
    ok.replaceChildren(el('span', 'ag-eyebrow', 'Sesión agendada'), el('h3', '', `¡Listo, ${String(b.name).trim().split(' ')[0]}!`),
      el('p', 'ag-note', 'Tu hora quedó reservada. Karen te escribirá por WhatsApp y a tu correo para confirmar los detalles y recordarte tu sesión.'), dl, botones);
    if (d.modalidad === 'presencial' && b.terapia !== LIMPIEZA) ok.insertBefore(el('p', 'ag-note', 'Te enviaremos la dirección exacta antes de tu sesión.'), botones);
    q('#ag-form').hidden = true; ok.hidden = false;
    slots = slots.filter((t) => !(t < fin && t + d.duracion * 6e4 > d.start));
  }

  function abrir(terapia) {
    if (!dlg) construir();
    q('#ag-form').hidden = false; q('[data-ok]').hidden = true; error('');
    q('[name=terapia]').value = TERAPIAS.includes(terapia) ? terapia : ORIENTA;
    ajustar();
    dlg.showModal();
    cargar(false);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-agendar]');
    if (!a) return;
    e.preventDefault();
    abrir(a.dataset.agendar);
  });
})();
