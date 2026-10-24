// Movimiento de la portada: scroll suave, recorrido con el péndulo 3D, títulos que se revelan, tarjetas 3D,
// portal que entra por la puerta de la casona, galería giratoria y detalles juguetones.
// Solo corre con html.fx (lo pone el script del <head> si la persona no pidió reducir el movimiento).
window.__fxReady = true;
const root = document.documentElement;
const FX = root.classList.contains('fx');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

if (FX) init();

function init() {
  const vh = () => innerHeight;
  const pointer = { x: innerWidth / 2, y: innerHeight / 2, nx: 0, ny: 0 };
  addEventListener('pointermove', e => {
    pointer.x = e.clientX; pointer.y = e.clientY;
    pointer.nx = e.clientX / innerWidth * 2 - 1; pointer.ny = e.clientY / innerHeight * 2 - 1;
  }, { passive: true });

  // ---------- scroll suave ----------
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: .1, wheelMultiplier: 1, anchors: { offset: -70 } });
  }

  // ---------- títulos palabra por palabra ----------
  const splitWords = el => {
    if (el.dataset.split) return; el.dataset.split = '1';
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el); el.classList.add('split');
  };
  $$('.hero h1, .section-head h2, .gift h2, .platform h2, .teacher h3, .gallery-head h3, .offer-main h3, .portal-title p').forEach(splitWords);

  // "Maestra Karen" (niños) letra por letra, para que rebote
  const kidsH = $('.kids h2');
  if (kidsH) {
    const txt = kidsH.textContent; kidsH.setAttribute('aria-label', txt); kidsH.textContent = '';
    [...txt].forEach((ch, i) => {
      const s = document.createElement('span'); s.className = 'l'; s.setAttribute('aria-hidden', 'true');
      s.textContent = ch === ' ' ? ' ' : ch; s.style.setProperty('--i', i); kidsH.append(s);
    });
  }

  // ---------- revelado al entrar en pantalla ----------
  const groups = [
    '.section-head > :not(h2)', '.teacher > div > :not(h3)', '.gift-grid > div > :not(h2):not(.btn)', '.gift-form',
    '.platform-grid > div:first-child > :not(h2)', '.kids-grid > div:first-child > :not(h2)', '.videos .video',
    '.therapy-grid .therapy', '.products .product', '.aula-feats > div', '.why-row > *', '.strip > div', '.offer',
    '.modal-note', '.family', '.foot > div', '.gallery-head > *', '.shop-foot > span', '.school-top .section-head > p'
  ];
  groups.forEach(sel => {
    const els = $$(sel);
    const byParent = new Map();
    els.forEach(el => {
      if (el.hasAttribute('data-rv')) return;
      const n = byParent.get(el.parentNode) || 0; byParent.set(el.parentNode, n + 1);
      el.setAttribute('data-rv', ''); el.style.setProperty('--d', Math.min(n, 8));
    });
  });
  $$('.karen-orbit, .dash, .casona-fig').forEach(el => el.setAttribute('data-rv', 'zoom'));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.matches('.stats')) countUp(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .12 });
  $$('[data-rv], .split, .stairs, .kids h2, .stats').forEach(el => io.observe(el));
  $$('.dash').forEach(el => io.observe(el));
  // la portada se revela al cargar
  requestAnimationFrame(() => $$('.hero .split').forEach(el => el.classList.add('in')));

  function countUp(box) {
    $$('b', box).forEach(b => {
      const m = b.textContent.match(/^(\D*)(\d+)(.*)$/); if (!m) return;
      const [, pre, num, post] = m, end = +num, t0 = performance.now();
      const tick = now => {
        const p = clamp((now - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
        b.textContent = pre + Math.round(end * e) + post;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // ---------- tarjetas con inclinación 3D ----------
  if (fine) {
    $$('.therapy, .product, .offer, .gift-form, .video .thumb, .aula-feats > div, .modal-note, .summit-card, .stats > div').forEach(el => {
      el.setAttribute('data-tilt', '');
      const g = document.createElement('span'); g.className = 'glare'; el.append(g);
      const max = el.matches('.offer, .product') ? 5 : 9;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add('tilting');
        el.style.setProperty('--ry', ((x - .5) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((.5 - y) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
      });
      el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
    // botones magnéticos
    $$('.btn').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });
    // cursor
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    if (dot && ring) {
      root.classList.add('cursor-on');
      addEventListener('pointermove', () => root.classList.add('cursor-live'), { once: true });
      let rx = pointer.x, ry = pointer.y;
      const loop = () => {
        rx = lerp(rx, pointer.x, .18); ry = lerp(ry, pointer.y, .18);
        dot.style.transform = `translate(${pointer.x}px,${pointer.y}px)`;
        ring.style.transform = `translate(${rx}px,${ry}px)`;
        requestAnimationFrame(loop);
      };
      loop();
      document.addEventListener('pointerover', e => ring.classList.toggle('big', !!e.target.closest('a, button, .gallery.ring-on, input, select, label')));
      document.addEventListener('pointerleave', () => { dot.style.opacity = ring.style.opacity = 0; });
      document.addEventListener('pointerenter', () => { dot.style.opacity = ring.style.opacity = ''; });
    }
  }

  // ---------- carrito: el producto vuela al carrito ----------
  const cartBtn = $('#cart-btn'), badge = $('#cart-count');
  $$('[data-add]').forEach(b => b.addEventListener('click', () => {
    if (!cartBtn) return;
    const a = b.getBoundingClientRect(), c = cartBtn.getBoundingClientRect();
    const d = document.createElement('div'); d.className = 'fly-dot'; document.body.append(d);
    const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = c.left + c.width / 2, y1 = c.top + c.height / 2;
    d.animate([
      { transform: `translate(${x0}px,${y0}px) scale(1)` },
      { transform: `translate(${lerp(x0, x1, .5)}px,${Math.min(y0, y1) - 160}px) scale(1.4)`, offset: .45 },
      { transform: `translate(${x1}px,${y1}px) scale(.4)` }
    ], { duration: 900, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = () => {
      d.remove(); badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop');
    };
  }));

  // ---------- burbujas de niños ----------
  const bubbles = $('.bubbles');
  if (bubbles) {
    const cols = ['#f6d27c', '#9fcfb4', '#b9c9ef', '#f0b7a4', '#ffffff'];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span'), size = 18 + Math.random() * 70;
      s.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;background:${cols[i % cols.length]};--t:${12 + Math.random() * 14}s;--dl:${-Math.random() * 20}s;--sx:${(Math.random() - .5) * 120}px`;
      bubbles.append(s);
    }
  }

  // ---------- galería giratoria 3D ----------
  const gallery = $('.gallery');
  let ringState = null;
  if (gallery) {
    const figs = $$('figure', gallery);
    const ringEl = document.createElement('div'); ringEl.className = 'ring';
    figs.forEach(f => ringEl.append(f));
    gallery.append(ringEl); gallery.classList.add('ring-on');
    gallery.tabIndex = 0;
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', 'Galería de estudiantes en 3D. Arrastra o usa las flechas para girar.');
    const hint = document.createElement('p'); hint.className = 'ring-hint'; hint.textContent = 'Arrastra para girar';
    gallery.after(hint);
    const n = figs.length;
    ringState = { el: ringEl, figs, n, angle: 0, drag: 0, vel: 0, r: 500, dragging: false };
    const layout = () => {
      const cw = clamp(innerWidth * .17, 140, 230);
      const r = (cw / 2) / Math.tan(Math.PI / n) + 24;
      ringState.r = r;
      gallery.style.setProperty('--cw', cw + 'px');
      gallery.style.setProperty('--rh', Math.round(cw * 4 / 3 + 140) + 'px');
      figs.forEach((f, i) => { f.style.transform = `rotateY(${i * 360 / n}deg) translateZ(${r}px)`; });
    };
    layout(); addEventListener('resize', layout);
    let lastX = 0;
    gallery.addEventListener('pointerdown', e => { ringState.dragging = true; lastX = e.clientX; gallery.setPointerCapture(e.pointerId); });
    gallery.addEventListener('pointermove', e => {
      if (!ringState.dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      ringState.drag += dx * .25; ringState.vel = dx * .25;
    });
    const end = () => { ringState.dragging = false; };
    gallery.addEventListener('pointerup', end); gallery.addEventListener('pointercancel', end);
    gallery.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { ringState.vel = -8; e.preventDefault(); }
      if (e.key === 'ArrowRight') { ringState.vel = 8; e.preventDefault(); }
    });
  }

  // ---------- recorrido: capítulos ----------
  const story = $('#camino');
  const chapters = $$('.chapter', story);
  const stepBtns = $$('.story-steps button', story);
  const storyNum = $('#story-num');
  const word = $('#cosmos-word');
  let activeCh = -1;
  stepBtns.forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.ch, top = story.getBoundingClientRect().top + scrollY;
    const span = story.offsetHeight - vh();
    const y = top + span * ((i + .5) / chapters.length);
    lenis ? lenis.scrollTo(y, { duration: 1.4 }) : scrollTo({ top: y, behavior: 'smooth' });
  }));

  // ---------- escena 3D ----------
  const cosmos = $('#cosmos'), canvas = $('#cosmos-canvas');
  const heroOrb = $('#hero-orb'), storyOrb = $('#story-orb'), hero = $('#inicio');
  const state = { anchor: { x: innerWidth * .7, y: innerHeight * .5, size: 400 }, pointer, stage: 0, visible: true, velocity: 0, scrollY: 0, still: false };
  const webgl = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();
  if (webgl && canvas) {
    root.classList.add('has-3d');
    import('./cosmos.js').then(m => m.startCosmos(canvas, state)).catch(err => { console.warn('3D no disponible', err); root.classList.remove('has-3d'); });
  }
  const C = [ // colores del fondo por estado (portada + 5 capítulos)
    ['#386650', '#2b5443', '#1f3f32'], ['#3f6e57', '#2b5443', '#18302a'], ['#2f5a4f', '#1f3f32', '#10241d'],
    ['#2d5a5a', '#1d3f40', '#112729'], ['#6b5a36', '#3b412b', '#1c2a20'], ['#4a7a5a', '#2f5d47', '#1f3f32']
  ];
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mixHex = (a, b, t) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',')})`; };

  // ---------- el resto de elementos ligados al scroll ----------
  const bar = $('.scroll-bar i');
  const header = $('header.top'), nav = $('#nav');
  const portal = $('#portal'), house = $('.portal-house', portal || document), stage = $('.portal-stage', portal || document);
  const doorL = $('.door-l'), doorR = $('.door-r'), doorGlow = $('.door-glow');
  const dash = $('.dash'), orbit = $('.karen-orbit'), giant = $('.foot-giant'), footer = $('footer');
  const track = $('.marquee-track');
  if (track) track.innerHTML += track.innerHTML;
  let mqX = 0;
  const dots = $$('#dots a'), dotTargets = dots.map(a => $(a.getAttribute('href')));

  let lastY = scrollY, vel = 0, lastT = performance.now(), hideAcc = 0;
  function frame(now) {
    const dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
    lenis && lenis.raf(now);
    const y = scrollY, H = vh(), W = innerWidth;
    const dy = y - lastY; lastY = y;
    vel = lerp(vel, dy / Math.max(dt, .001), .2);
    state.velocity = vel; state.scrollY = y;

    // barra de progreso
    const max = document.documentElement.scrollHeight - H;
    bar && bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    // cabecera se esconde al bajar y vuelve al subir
    if (header && !nav.classList.contains('open')) {
      hideAcc = dy > 0 ? Math.max(0, hideAcc) + dy : Math.min(0, hideAcc) + dy;
      if (y < 200 || hideAcc < -40) header.classList.remove('hide');
      else if (hideAcc > 80) header.classList.add('hide');
    }

    // recorrido
    if (story) {
      const r = story.getBoundingClientRect();
      const span = Math.max(1, r.height - H);
      const p = clamp(-r.top / span);
      const n = chapters.length;
      const c = clamp(p * n - .5, 0, n - 1);
      const idx = Math.round(c);
      if (idx !== activeCh) {
        chapters.forEach((ch, i) => { ch.classList.toggle('on', i === idx); ch.classList.toggle('past', i < idx); });
        stepBtns.forEach((b, i) => b.classList.toggle('on', i === idx));
        if (storyNum) storyNum.textContent = String(idx + 1).padStart(2, '0');
        if (word) word.textContent = chapters[idx].dataset.word;
        activeCh = idx;
      }
      // 3D: mezcla portada -> recorrido y capítulo con pausas
      const fl = Math.floor(c), cs = fl + smooth(.3, .7, c - fl);
      const heroH = hero ? hero.getBoundingClientRect() : null;
      const mix = smooth(0, 1, clamp(1 - r.top / Math.max(1, (heroH ? heroH.height : H))));
      state.stage = mix + cs * smooth(.95, 1, mix);
      const a = heroOrb && heroOrb.getBoundingClientRect(), b = storyOrb && storyOrb.getBoundingClientRect();
      if (a && b && b.height) {
        const m = mix;
        state.anchor.x = lerp(a.left + a.width / 2, b.left + b.width / 2, m);
        state.anchor.y = lerp(a.top + a.height / 2, b.top + b.height / 2, m);
        state.anchor.size = lerp(a.height || 400, b.height, m);
      }
      state.visible = r.bottom > 0;
      if (cosmos) {
        cosmos.classList.toggle('off', !state.visible);
        const sf = clamp(state.stage, 0, 5), i0 = Math.floor(sf), i1 = Math.min(5, i0 + 1), f = sf - i0;
        cosmos.style.setProperty('--c1', mixHex(C[i0][0], C[i1][0], f));
        cosmos.style.setProperty('--c2', mixHex(C[i0][1], C[i1][1], f));
        cosmos.style.setProperty('--c3', mixHex(C[i0][2], C[i1][2], f));
        // palabra gigante detrás del péndulo, cambia con cada capítulo
        const fr = c - fl, fade = 1 - smooth(.3, .5, fr) + smooth(.5, .7, fr);
        word.style.setProperty('--wo', (mix * fade * (r.bottom > H * .3 ? 1 : 0)).toFixed(3));
        word.style.setProperty('--ws', (1 + (c - idx) * .15).toFixed(3));
      }
    }

    // portal de la Escuela: entrar por la puerta de la casona
    if (portal && house) {
      const r = portal.getBoundingClientRect();
      if (r.top < H && r.bottom > 0) {
        const p = clamp(-r.top / Math.max(1, r.height - H));
        const svgW = house.offsetWidth, svgH = svgW * 400 / 520;
        const need = Math.max(W / (svgW * 44 / 520), H / (svgH * 60 / 400)) * 2.2;
        const z = smooth(.18, .9, p);
        const s = Math.exp(Math.log(need) * Math.pow(z, 1.6));
        stage.style.setProperty('--hs', s.toFixed(4));
        stage.style.setProperty('--hx', ((1 - z) * (fine ? -pointer.ny * 5 : 0) + (1 - z) * 6).toFixed(2) + 'deg');
        stage.style.setProperty('--hy', ((1 - z) * (fine ? pointer.nx * 7 : 0)).toFixed(2) + 'deg');
        stage.style.setProperty('--to', (1 - smooth(.04, .2, p)).toFixed(3));
        const open = smooth(.12, .42, p);
        if (doorL) { doorL.style.transform = `scaleX(${1 - open * .92})`; doorR.style.transform = `scaleX(${1 - open * .92})`; doorGlow.setAttribute('opacity', open.toFixed(3)); }
        stage.style.setProperty('--lo', smooth(.62, .82, p).toFixed(3));
        stage.style.setProperty('--fo', smooth(.84, .98, p).toFixed(3));
      }
    }

    // tablero del aula se endereza al entrar
    if (dash) {
      const r = dash.getBoundingClientRect();
      if (r.top < H && r.bottom > 0) dash.style.setProperty('--d', (1 - smooth(H * .95, H * .3, r.top)).toFixed(3));
    }
    // foto de Karen flota con el scroll
    if (orbit) {
      const r = orbit.getBoundingClientRect();
      if (r.top < H && r.bottom > 0) orbit.style.setProperty('--py', ((r.top + r.height / 2 - H / 2) * -.08).toFixed(1) + 'px');
    }
    // marquee: avanza solo y se acelera con el scroll
    if (track) {
      const half = track.scrollWidth / 2;
      mqX -= (40 + Math.min(900, Math.abs(vel) * .6)) * dt * (dy < 0 ? -1 : 1);
      if (half) { mqX = ((mqX % half) - half) % half; }
      track.style.transform = `translate3d(${mqX.toFixed(1)}px,0,0)`;
    }
    // galería giratoria
    if (ringState) {
      const r = gallery.getBoundingClientRect();
      if (r.top < H && r.bottom > 0) {
        if (!ringState.dragging) { ringState.vel *= Math.pow(.04, dt); ringState.drag += ringState.vel * dt * 10; }
        const scrollAng = (r.top - H / 2) * .12;
        ringState.angle = ringState.drag + scrollAng - now * .004;
        ringState.el.style.transform = `translateZ(${-ringState.r}px) rotateX(-6deg) rotateY(${ringState.angle.toFixed(2)}deg)`;
        ringState.figs.forEach((f, i) => {
          const a = (i * 360 / ringState.n + ringState.angle) * Math.PI / 180;
          f.style.opacity = (.25 + .75 * clamp((Math.cos(a) + .2) / 1.2)).toFixed(3);
        });
      }
    }
    // pie: la palabra gigante se abre
    if (giant && footer) {
      const r = footer.getBoundingClientRect();
      giant.style.setProperty('--fg', smooth(H, H * .35, r.top + r.height * .5).toFixed(3));
    }
    // puntos de navegación
    let on = 0;
    dotTargets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < H * .5) on = i; });
    dots.forEach((d, i) => d.classList.toggle('on', i === on));

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
