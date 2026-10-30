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
      const body = {
        action: 'save', form: f.dataset.lead,
        name: val('name'), email: val('email'), whatsapp: val('whatsapp'), country: val('country'),
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
