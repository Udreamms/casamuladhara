// Captación en la portada y las landings: Píxel de Meta, origen de la visita (UTM) y formularios que guardan en /api/leads.
// Cada formulario lleva data-lead="<nombre>" (pendulo, formacion, sala, terapias, meditacion, regalo) y sus campos un name:
// name, email, whatsapp, country, interest, message. El mensaje de gracias es el .lp-ok o .gift-ok del propio formulario.
(() => {
  const PIXEL = '716765743270935'; // Píxel Casa Muladhara (Business Casa Muladhara)

  /* Píxel de Meta: código base oficial */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', PIXEL);
  fbq('track', 'PageView');

  // Origen de la visita: se guarda en la primera página con UTM y acompaña a la persona mientras navega el sitio
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  const ORIGEN = 'cm-origen';
  const qs = new URLSearchParams(location.search);
  const desdeUrl = Object.fromEntries(KEYS.map((k) => [k, qs.get(k)]).filter(([, v]) => v));
  try { if (Object.keys(desdeUrl).length) sessionStorage.setItem(ORIGEN, JSON.stringify(desdeUrl)); } catch { /* sin almacenamiento */ }
  const origen = () => { try { return JSON.parse(sessionStorage.getItem(ORIGEN)) || desdeUrl; } catch { return desdeUrl; } };

  // Botones de WhatsApp: cuentan como contacto para Meta
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="wa.link"], a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    if (a) fbq('track', 'Contact', { content_name: location.pathname });
  });

  // Códigos de país del WhatsApp: el HTML trae solo Chile (por si falla el script) y aquí se completa la lista
  const PAISES = [['Chile', '+56'], ['Argentina', '+54'], ['Bolivia', '+591'], ['Colombia', '+57'], ['Costa Rica', '+506'], ['Ecuador', '+593'],
    ['El Salvador', '+503'], ['España', '+34'], ['Estados Unidos', '+1'], ['Guatemala', '+502'], ['Honduras', '+504'], ['México', '+52'],
    ['Nicaragua', '+505'], ['Panamá', '+507'], ['Paraguay', '+595'], ['Perú', '+51'], ['Puerto Rico', '+1'], ['Rep. Dominicana', '+1'],
    ['Uruguay', '+598'], ['Venezuela', '+58'], ['Australia', '+61'], ['Canadá', '+1'], ['Otro país', '']];
  document.querySelectorAll('select[data-cc]').forEach((s) => {
    s.replaceChildren(...PAISES.map(([p, c]) => { const o = new Option(c ? `${p} ${c}` : p, c); o.dataset.country = p === 'Otro país' ? '' : p; return o; }));
  });

  // ---------- Gracias de las clases gratis: Zoom, archivo .ics y Google Calendar ----------
  // La clase es a las 19:00 hora de Chile y dura 30 minutos; se pasa a UTC para que el calendario la muestre bien en cualquier país.
  const utcDeChile = (y, m, d, h, mi) => {
    const deseado = Date.UTC(y, m - 1, d, h, mi);
    let t = deseado;
    for (let i = 0; i < 3; i++) {
      const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
        .formatToParts(new Date(t)).map((x) => [x.type, x.value]));
      t += deseado - Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute);
    }
    return new Date(t);
  };
  const utc = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const icsTexto = (s) => String(s).replace(/\\/g, '\\\\').replace(/[,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const el = (tag, attrs = {}, text = '') => { const e = document.createElement(tag); Object.assign(e, attrs); if (text) e.textContent = text; return e; };
  function graciasClase(f, zoom) {
    const op = f.elements.interest?.selectedOptions[0];
    const fecha = op?.dataset.date; // 'AAAA-MM-DD' si eligió un día concreto
    const dia = (op?.textContent || '').split(' · ')[0].toLowerCase();
    const titulo = `Clase gratis de ${f.dataset.clase} con Karen`;
    const nodos = [el('b', {}, fecha ? `¡Listo, tu lugar está reservado! Te esperamos el ${dia} a las 19:00 (hora de Chile).` : '¡Listo, tu lugar está reservado! La clase es a las 19:00 (hora de Chile).')];
    const acciones = el('span', { className: 'gracias-acciones' });
    acciones.append(el('a', { className: 'btn btn-zoom', href: zoom, target: '_blank', rel: 'noopener' }, 'Entrar a la clase por Zoom'));
    if (fecha) {
      const [y, m, d] = fecha.split('-').map(Number);
      const ini = utcDeChile(y, m, d, 19, 0), fin = new Date(ini.getTime() + 30 * 60000);
      const detalle = `Entra a la clase por Zoom: ${zoom}`;
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Casa Muladhara//Clases gratis//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
        `UID:${fecha}-${f.dataset.lead}@casamuladhara`, `DTSTAMP:${utc(new Date())}`, `DTSTART:${utc(ini)}`, `DTEND:${utc(fin)}`,
        `SUMMARY:${icsTexto(titulo)}`, `DESCRIPTION:${icsTexto(detalle)}`, `LOCATION:${icsTexto(zoom)}`, `URL:${zoom}`,
        'BEGIN:VALARM', 'TRIGGER:-PT1H', 'ACTION:DISPLAY', `DESCRIPTION:${icsTexto(titulo)}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      const cal = el('a', { className: 'btn btn-cal', href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' })), download: `clase-gratis-${fecha}.ics` }, 'Agregar a mi calendario');
      const g = new URL('https://calendar.google.com/calendar/render');
      g.search = new URLSearchParams({ action: 'TEMPLATE', text: titulo, dates: `${utc(ini)}/${utc(fin)}`, details: detalle, location: zoom }).toString();
      acciones.append(cal, el('a', { className: 'gcal', href: g.toString(), target: '_blank', rel: 'noopener' }, 'Google Calendar'));
    }
    nodos.push(acciones, el('small', {}, 'También te lo enviamos por WhatsApp con un recordatorio 1 hora antes.'));
    return nodos;
  }

  document.querySelectorAll('form[data-lead]').forEach((f) => {
    // Campo trampa para bots, invisible para las personas
    f.insertAdjacentHTML('beforeend', '<input name="web" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">');
    const ok = f.querySelector('.lp-ok, .gift-ok');
    const btn = f.querySelector('button[type="submit"], button:not([type])');
    let err = f.querySelector('.lp-err');
    if (!err) { err = document.createElement('p'); err.className = 'lp-err'; err.hidden = true; err.setAttribute('role', 'alert'); err.style.cssText = 'margin:0;color:#9b3b2a;font-size:.9rem'; (ok || btn).insertAdjacentElement('afterend', err); }

    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (f.dataset.sending) return;
      const val = (n) => f.elements[n]?.value ?? '';
      // Con selector de código de país, el WhatsApp se guarda completo (+56 9 1234 5678) y el país sale del código
      const cc = f.elements.cc, pais = cc?.selectedOptions[0]?.dataset.country || '';
      const numero = val('whatsapp').trim();
      const whatsapp = cc && cc.value && numero && !numero.startsWith('+') ? `${cc.value} ${numero}` : numero;
      const body = {
        action: 'save', form: f.dataset.lead,
        name: val('name'), email: val('email'), whatsapp, country: val('country') || pais,
        interest: val('interest'), message: val('message'), web: val('web'),
        page: location.pathname, utm: origen(),
      };
      f.dataset.sending = '1'; err.hidden = true;
      const txt = btn?.textContent; if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
      try {
        const r = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const out = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(out.error || 'No pudimos enviar tus datos.');
        fbq('track', 'Lead', { content_name: f.dataset.lead });
        f.querySelectorAll('label, button, small').forEach((el) => (el.hidden = true));
        // Clase gratis con enlace de Zoom guardado: el gracias trae el botón de Zoom y el calendario
        if (ok && out.zoom && f.dataset.clase) ok.replaceChildren(...graciasClase(f, out.zoom));
        if (ok) { ok.hidden = false; ok.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      } catch (ex) {
        const m = ex.message || 'No pudimos enviar tus datos.';
        err.textContent = /whatsapp/i.test(m) ? m : `${m} Si sigue fallando, escríbenos por WhatsApp.`;
        err.hidden = false;
        if (btn) { btn.disabled = false; btn.textContent = txt; }
      } finally { delete f.dataset.sending; }
    });
  });
})();
