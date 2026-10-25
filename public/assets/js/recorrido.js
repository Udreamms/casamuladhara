// El recorrido por la casona: el scroll mueve la cámara de casona.js de sala en sala, y las tarjetas de cada sala
// aparecen al pasar. Corre solo con html.fx (lo pone el <head> si hay WebGL y no se pidió reducir el movimiento).
window.__casonaReady = true;
const root = document.documentElement;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

const FX = root.classList.contains('fx');
const stops = $$('.stop');
const state = { u: 0, pointer: { nx: 0, ny: 0 } };

// ---------- sonido ambiente (cuencos), siempre opcional ----------
const soundBtn = $('#sound-btn');
let audio = null;
soundBtn?.addEventListener('click', () => {
  if (!audio) audio = makeAmbient();
  const on = soundBtn.getAttribute('aria-pressed') !== 'true';
  soundBtn.setAttribute('aria-pressed', on);
  soundBtn.setAttribute('aria-label', on ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente');
  audio.set(on);
});
function makeAmbient() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  const verb = ctx.createConvolver();
  const len = ctx.sampleRate * 3, buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5); }
  verb.buffer = buf; verb.connect(master);
  // zumbido grave (OM, 136.1 Hz) que respira
  for (const [f, g] of [[136.1, .05], [204.15, .025]]) {
    const o = ctx.createOscillator(), gn = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    o.frequency.value = f; gn.gain.value = g; lfo.frequency.value = .07; lg.gain.value = g * .6;
    lfo.connect(lg); lg.connect(gn.gain); o.connect(gn); gn.connect(master); gn.connect(verb); o.start(); lfo.start();
  }
  // un cuenco que suena cada tanto
  let timer = null;
  const bowl = () => {
    const base = [220, 261.6, 196][Math.floor(Math.random() * 3)], t = ctx.currentTime;
    for (const [m, a] of [[1, .12], [2.71, .05], [5.15, .025]]) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = base * m; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(a, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + 7);
      o.connect(g); g.connect(master); g.connect(verb); o.start(t); o.stop(t + 7.2);
    }
  };
  return {
    set(on) {
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(on ? .5 : 0, ctx.currentTime + 1.5);
      clearInterval(timer);
      if (on) { bowl(); timer = setInterval(bowl, 9000); }
    }
  };
}

// ---------- "Maestra Karen" letra por letra ----------
const kidsH = $('.card-kids h2');
if (kidsH) {
  const txt = kidsH.textContent; kidsH.setAttribute('aria-label', txt); kidsH.textContent = '';
  [...txt].forEach((ch, i) => { const s = document.createElement('span'); s.className = 'l'; s.setAttribute('aria-hidden', 'true'); s.textContent = ch === ' ' ? ' ' : ch; s.style.setProperty('--i', i); kidsH.append(s); });
}

// ---------- carrito: el producto vuela al carrito ----------
const cartBtn = $('#cart-btn'), badge = $('#cart-count');
$$('[data-add]').forEach(b => b.addEventListener('click', () => {
  const a = b.getBoundingClientRect(), c = cartBtn.getBoundingClientRect();
  const d = document.createElement('div'); d.className = 'fly-dot'; document.body.append(d);
  const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = c.left + c.width / 2, y1 = c.top + c.height / 2;
  const anim = d.animate([{ transform: `translate(${x0}px,${y0}px)` }, { transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 160}px) scale(1.4)`, offset: .45 }, { transform: `translate(${x1}px,${y1}px) scale(.4)` }], { duration: 900, easing: 'cubic-bezier(.5,0,.3,1)' });
  anim.onfinish = () => { d.remove(); badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop'); };
}));

// ---------- contadores del recibidor ----------
function countUp(box) {
  $$('b', box).forEach(b => {
    const m = b.textContent.match(/^(\D*)(\d+)(.*)$/); if (!m) return;
    const [, pre, num, post] = m, end = +num, t0 = performance.now();
    const tick = now => { const p = clamp((now - t0) / 1400); b.textContent = pre + Math.round(end * (1 - Math.pow(1 - p, 3))) + post; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
}

if (FX) start(); else $$('.card').forEach(c => c.classList.add('in'));

function start() {
  addEventListener('pointermove', e => { state.pointer.nx = e.clientX / innerWidth * 2 - 1; state.pointer.ny = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  // en el celular, inclinar el teléfono también mira alrededor
  addEventListener('deviceorientation', e => { if (e.gamma == null) return; state.pointer.nx = clamp(e.gamma / 30, -1, 1) * .6; state.pointer.ny = clamp((e.beta - 45) / 30, -1, 1) * .4; }, { passive: true });

  const lenis = window.Lenis ? new window.Lenis({ lerp: .075, wheelMultiplier: .9, anchors: { offset: -70, duration: 2.4 } }) : null;

  // tarjetas que aparecen
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    $$('.stats', e.target).forEach(countUp);
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.card').forEach(c => io.observe(c));
  // la llegada se ve de inmediato
  $$('.stop-hero .card').forEach(c => c.classList.add('in'));

  // escena 3D
  const veil = $('#veil'), veilBar = $('#veil-bar');
  const reveal = () => veil.classList.add('gone');
  import('./casona.js')
    .then(m => m.startCasona($('#casona'), state, p => veilBar.style.setProperty('--p', Math.max(.05, p))))
    .then(reveal)
    .catch(err => { console.warn('La casona 3D no pudo cargar', err); root.classList.remove('fx'); $$('.card').forEach(c => c.classList.add('in')); reveal(); });
  setTimeout(reveal, 9000);

  const header = $('header.top'), nav = $('#nav');
  const doorsWord = $('.doors-word');
  const plano = $$('#plano a'), planoT = plano.map(a => $(a.getAttribute('href')));
  const doorItems = $$('#terapias .doors-list li');
  const stepItems = $$('#escuela .steps li');
  let lastY = scrollY, hideAcc = 0, doorOn = -1, stepOn = -1, planoOn = -1;

  function frame(now) {
    lenis && lenis.raf(now);
    const H = innerHeight, ref = H * .5, y = scrollY, dy = y - lastY; lastY = y;

    // posición en el recorrido
    let u = 0;
    for (let i = 0; i < stops.length; i++) {
      const r = stops[i].getBoundingClientRect();
      if (ref < r.top) { u = i; break; }
      if (ref < r.bottom) { u = i + (ref - r.top) / r.height; break; }
      u = i + 1;
    }
    state.u = u; window.__casonaU = u;

    // "Bienvenida" mientras se abren las puertas
    if (doorsWord) doorsWord.style.setProperty('--dw', (smooth(1.15, 1.4, u) * (1 - smooth(1.62, 1.85, u))).toFixed(3));

    // la puerta de la terapia que se está pasando
    let d = -1;
    if (u > 4 && u < 5) { const camZ = -27 - (u - 4) * 29.5; d = clamp(Math.round((camZ + 31.5) / -3), 0, 8); }
    if (d !== doorOn) { doorItems.forEach((li, i) => li.classList.toggle('on', i === d)); doorOn = d; }
    // el escalón que se está subiendo
    let s = -1;
    if (u > 5.12 && u < 6.1) s = clamp(Math.floor((u - 5.12) / .155), 0, 4);
    if (s !== stepOn) { stepItems.forEach((li, i) => li.classList.toggle('on', i === s)); stepOn = s; }

    // cabecera se esconde al bajar y vuelve al subir
    if (!nav.classList.contains('open')) {
      hideAcc = dy > 0 ? Math.max(0, hideAcc) + dy : Math.min(0, hideAcc) + dy;
      if (y < 200 || hideAcc < -40) header.classList.remove('hide'); else if (hideAcc > 90) header.classList.add('hide');
    }
    // plano lateral
    let on = 0; planoT.forEach((t, i) => { if (t && t.getBoundingClientRect().top < H * .5) on = i; });
    if (on !== planoOn) { plano.forEach((a, i) => a.classList.toggle('on', i === on)); planoOn = on; }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
