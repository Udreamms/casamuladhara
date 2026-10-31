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

// ---------- sonido ambiente (cuencos de cuarzo), siempre opcional ----------
const soundBtn = $('#sound-btn');
let audio = null;
soundBtn?.addEventListener('click', () => {
  if (!audio) audio = makeAmbient();
  const on = soundBtn.getAttribute('aria-pressed') !== 'true';
  soundBtn.setAttribute('aria-pressed', on);
  soundBtn.setAttribute('aria-label', on ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente');
  audio.set(on);
});
// El botón de sonido se ve solo dentro de la casona (desde las puertas hasta la despedida), no en la llegada ni en el pie.
// Al salir, el sonido se apaga para que nadie quede con música sin un botón a la vista para pararla.
if (soundBtn) {
  const salas = stops.filter(s => Number(s.dataset.stop) >= 1);
  // Dentro = alguna sala cruza el centro de la pantalla
  const revisar = () => {
    const mid = innerHeight / 2;
    soundBtn.hidden = !salas.some(s => { const r = s.getBoundingClientRect(); return r.top < mid && r.bottom > mid; });
    if (soundBtn.hidden && soundBtn.getAttribute('aria-pressed') === 'true') soundBtn.click();
  };
  addEventListener('scroll', revisar, { passive: true });
  addEventListener('resize', revisar);
  revisar();
}
// Cuencos afinados en Do pentatónico (Do Re Mi Sol La), así todas las notas combinan entre sí,
// sobre un zumbido grave y quieto de Do y Sol. Se genera en el navegador: sin archivos de audio.
function makeAmbient() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3; comp.connect(ctx.destination);
  const master = ctx.createGain(); master.gain.value = 0; master.connect(comp);
  const verb = ctx.createConvolver();
  const len = ctx.sampleRate * 5, buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
  verb.buffer = buf;
  const wet = ctx.createGain(); wet.gain.value = .55; verb.connect(wet); wet.connect(master);
  const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
  // zumbido de Do y Sol graves, apenas desafinados para que respire
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 400;
  const drone = ctx.createGain(); drone.gain.value = .07; lp.connect(drone); drone.connect(master); drone.connect(verb);
  for (const m of [36, 43]) for (const cents of [-4, 4]) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = hz(m); o.detune.value = cents; o.connect(lp); o.start();
  }
  // un cuenco cada 6,5 segundos, con un leve vibrato
  const NOTES = [60, 62, 64, 67, 69, 72, 55, 57];
  let timer = null;
  const bowl = () => {
    const midi = NOTES[Math.floor(Math.random() * NOTES.length)], t = ctx.currentTime;
    [[1, 1], [2, .18], [3.01, .06]].forEach(([m, a], k) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = hz(midi) * m;
      if (k === 0) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 1.1; lg.gain.value = 1.5; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + 11); }
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09 * a, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + 11 / (1 + k * .6));
      o.connect(g); g.connect(master); g.connect(verb); o.start(t); o.stop(t + 11.1);
    });
  };
  return {
    set(on) {
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(on ? .8 : 0, ctx.currentTime + 2);
      clearInterval(timer);
      if (on) { bowl(); timer = setInterval(bowl, 6500); }
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
