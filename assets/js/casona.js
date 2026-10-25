// La casona de Casa Muladhara en 3D: una casa moderna de noche (madera, piedra y vidrio), con jardín, puertas que
// se abren y un recorrido por dentro: recibidor, sala de Péndulo Hebreo, pasillo de terapias, escalera de la
// Escuela, Sala Abierta, aula, tiendita y el jardín de los niños en la terraza. Todo está hecho con geometría y
// texturas dibujadas aquí (no hay modelos externos); las fotos reales del sitio cuelgan en las paredes.
// recorrido.js mueve state.u (la posición en el recorrido, de 0 a 12) y esta escena pone la cámara donde toca.
import * as THREE from 'three';
import { RoomEnvironment } from '../vendor/RoomEnvironment.js';
import { EffectComposer } from '../vendor/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../vendor/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../vendor/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../vendor/jsm/postprocessing/OutputPass.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const rand = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();

// ---------- recorrido de la cámara: u -> posición y punto al que mira ----------
const PATH = [
  [0, [-6.5, 1.9, 29], [-1.2, 3.6, 0]],
  [0.6, [-3, 1.8, 20], [0, 3.1, 0]],
  [1.0, [0, 1.7, 12], [0, 2.5, 0]],
  [1.5, [0, 1.7, 4.5], [0, 1.9, -6]],
  [2.0, [0, 1.7, -1.5], [0, 1.7, -10]],
  [2.5, [2.6, 1.65, -5.6], [8.5, 1.95, -6.5]],
  [2.8, [-0.8, 1.7, -8.2], [-4.6, 1.4, -8.6]],
  [3.0, [0, 1.75, -12.5], [0, 1.2, -21]],
  [3.35, [-1.3, 3.0, -17.2], [0, 0.8, -21]],
  [3.7, [3.2, 1.7, -21], [-8.5, 1.9, -21]],
  [4.0, [0, 1.65, -27], [0, 1.6, -36]],
  [5.0, [0, 1.65, -56.5], [0, 1.7, -66]],
  [5.12, [0, 1.75, -59.4], [0, 3.2, -66]],
  ...[1, 2, 3, 4, 5].map(k => [5.12 + k * 0.155, [0.7, k * 0.88 + 1.7, -60 - (k - 0.45) * 3.4], [-2.2, k * 0.88 + 1.55, -60 - (k - 0.45) * 3.4 - 3.8]]),
  [6.0, [0.6, 6.1, -79.4], [-4, 6.3, -80.6]],
  [6.6, [-0.4, 6.15, -81.2], [-4, 6.0, -80.6]],
  [7.0, [0, 6.7, -81.6], [0, 4.6, -86]],
  [7.6, [1.4, 6.3, -84], [0, 4.5, -86]],
  [8.0, [0, 6.1, -89.2], [0, 6.0, -97]],
  [8.4, [0.4, 6.1, -94], [-6, 6.3, -97.5]],
  [8.75, [0.6, 6.1, -96.2], [-6, 6.2, -97.5]],
  [9.0, [-0.6, 6.1, -96.6], [6, 5.8, -97.5]],
  [9.7, [-1.2, 6.0, -98.6], [6, 5.8, -98]],
  [10.0, [0, 6.1, -103], [0, 6.0, -115]],
  [10.6, [1.0, 6.0, -108], [-3, 6.7, -117]],
  [11.0, [2.5, 7.4, -110], [0, 10, -130]],
  [11.6, [3, 14, -110], [0, 40, -190]],
  [12.0, [2, 20, -108], [0, 46, -190]],
].map(([u, p, l]) => ({ u, p: V(...p), l: V(...l) }));

function catmull(p0, p1, p2, p3, t, out) {
  const t2 = t * t, t3 = t2 * t;
  return out.set(
    0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    0.5 * (2 * p1.z + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3));
}
function sample(u, pos, look) {
  u = clamp(u, PATH[0].u, PATH[PATH.length - 1].u);
  let i = 0; while (i < PATH.length - 2 && PATH[i + 1].u <= u) i++;
  const a = PATH[Math.max(0, i - 1)], b = PATH[i], c = PATH[i + 1], d = PATH[Math.min(PATH.length - 1, i + 2)];
  const t = (u - b.u) / (c.u - b.u);
  catmull(a.p, b.p, c.p, d.p, t, pos); catmull(a.l, b.l, c.l, d.l, t, look);
}

// ---------- texturas dibujadas ----------
function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
const woodTex = (base, repeat) => canvasTex(512, 512, (g, w, h) => {
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 220; i++) {
    const x = rand() * w, a = .03 + rand() * .09;
    g.strokeStyle = rand() < .55 ? `rgba(40,20,8,${a})` : `rgba(255,230,190,${a})`;
    g.lineWidth = .5 + rand() * 2.2; g.beginPath(); g.moveTo(x, 0);
    for (let y = 0; y <= h; y += 24) g.lineTo(x + Math.sin(y * .015 + i) * 4, y);
    g.stroke();
  }
}, repeat);
const planksTex = (base, repeat) => canvasTex(1024, 1024, (g, w, h) => {
  const rows = 8, rh = h / rows;
  for (let r = 0; r < rows; r++) {
    let x = -rand() * 300;
    while (x < w) {
      const len = 260 + rand() * 300, l = 0.85 + rand() * 0.3;
      const c = new THREE.Color(base).multiplyScalar(l);
      g.fillStyle = `#${c.getHexString()}`; g.fillRect(x, r * rh, len, rh);
      for (let k = 0; k < 10; k++) { g.strokeStyle = `rgba(60,30,10,${.04 + rand() * .06})`; g.beginPath(); const yy = r * rh + rand() * rh; g.moveTo(x, yy); g.lineTo(x + len, yy + (rand() - .5) * 6); g.stroke(); }
      g.fillStyle = 'rgba(30,15,5,.45)'; g.fillRect(x, r * rh, 2, rh);
      x += len;
    }
    g.fillStyle = 'rgba(30,15,5,.5)'; g.fillRect(0, r * rh, w, 2);
  }
}, repeat);
const stoneTex = (base, repeat) => canvasTex(512, 512, (g, w, h) => {
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  const rows = 6;
  for (let r = 0; r < rows; r++) {
    let x = -rand() * 80; const rh = h / rows;
    while (x < w) {
      const len = 60 + rand() * 120, c = new THREE.Color(base).multiplyScalar(.82 + rand() * .3);
      g.fillStyle = `#${c.getHexString()}`; g.fillRect(x + 3, r * rh + 3, len - 6, rh - 6);
      x += len;
    }
  }
  for (let i = 0; i < 4000; i++) { g.fillStyle = `rgba(${rand() < .5 ? '0,0,0' : '255,255,255'},${rand() * .06})`; g.fillRect(rand() * w, rand() * h, 2, 2); }
}, repeat);
const dotTex = () => canvasTex(64, 64, (g, w) => {
  const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.3, 'rgba(255,255,255,.6)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, w, w);
});

// logo de Casa Muladhara (los mismos trazos del símbolo SVG del sitio)
function drawMark(g, cx, cy, s, color) {
  g.save(); g.translate(cx, cy); g.scale(s / 100, s / 100); g.fillStyle = color;
  const outer = new Path2D('M0,-19 C7,-26 9,-38 0,-47 C-9,-38 -7,-26 0,-19Z');
  const inner = new Path2D('M0,-12 C4,-16 5,-23 0,-28 C-5,-23 -4,-16 0,-12Z');
  for (let i = 0; i < 14; i++) { const r = i * 360 / 14 + 360 / 28; if (r < 22 || r > 338) continue; g.save(); g.rotate(r * Math.PI / 180); g.fill(outer); g.restore(); }
  for (let i = 0; i < 10; i++) { const r = i * 36 + 18; if (r < 30 || r > 330) continue; g.save(); g.rotate(r * Math.PI / 180); g.fill(inner); g.restore(); }
  g.beginPath(); g.arc(0, -27, 5.2, 0, Math.PI * 2); g.fill();
  g.fill(new Path2D('M-2.6 -20 C-9 -24 -14 -31 -17 -39 C-12 -33 -7 -27 -3.4 -24 Z M2.6 -20 C9 -24 14 -31 17 -39 C12 -33 7 -27 3.4 -24 Z M-3.6 -20.5 L3.6 -20.5 L2.2 6 L1.2 30 L-1.2 30 L-2.2 6 Z'));
  g.restore();
}
function flowerOfLife(g, cx, cy, R, color, lw) {
  g.strokeStyle = color; g.lineWidth = lw;
  const c = (x, y, r) => { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke(); };
  c(cx, cy, R);
  for (let i = 0; i < 6; i++) c(cx + Math.cos(i * Math.PI / 3) * R, cy + Math.sin(i * Math.PI / 3) * R, R);
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; c(cx + Math.cos(a) * R * Math.sqrt(3), cy + Math.sin(a) * R * Math.sqrt(3), R); }
  c(cx, cy, R * 2); c(cx, cy, R * 2.3);
}
function textTex(w, h, draw) { return canvasTex(w, h, draw); }
function fitText(g, text, maxW, size, font) {
  let s = size; g.font = `${s}px ${font}`;
  while (g.measureText(text).width > maxW && s > 10) { s -= 2; g.font = `${s}px ${font}`; }
  return s;
}

export async function startCasona(canvas, state, onProgress = () => {}) {
  const isSmall = Math.min(innerWidth, innerHeight) < 700;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isSmall, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isSmall ? 1.5 : 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .95;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1612);
  scene.fog = new THREE.FogExp2(0x0b1814, 0.011);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.05, 700);

  // fuentes para los letreros
  try { await Promise.race([Promise.all(['64px Marcellus', '600 40px "Josefin Sans"', '600 60px Fredoka'].map(f => document.fonts.load(f))), new Promise(r => setTimeout(r, 2500))]); } catch { }

  // fotos reales del sitio
  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  let loaded = 0, total = 0;
  const photo = src => { total++; const t = loader.load(src, () => { loaded++; onProgress(loaded / total); }, undefined, () => { loaded++; onProgress(loaded / total); }); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };

  // ---------- materiales ----------
  const std = ({ env = .18, ...o }) => { const m = new THREE.MeshStandardMaterial(o); m.envMapIntensity = env; return m; };
  const glow = (hex, k = 1) => new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k) });
  const M = {
    stone: std({ map: stoneTex('#8f877a', [3, 2]), roughness: .92 }),
    stoneLight: std({ color: 0xcfc6b2, roughness: .85 }),
    stoneDark: std({ color: 0x3b3c37, roughness: .9 }),
    wood: std({ map: woodTex('#6e4326', [2, 1]), roughness: .6 }),
    woodLight: std({ map: woodTex('#b98a5a', [1, 1]), roughness: .5, env: .5 }),
    floor: std({ map: planksTex('#7c5434', [9, 15]), roughness: .4, env: .45 }),
    floorUp: std({ map: planksTex('#86603c', [7, 15]), roughness: .4, env: .45 }),
    plaster: std({ color: 0xbfb08f, roughness: .95 }),
    plasterWarm: std({ map: woodTex('#3e2a1b', [6, 1]), roughness: .6, env: .3 }),
    ceil: std({ map: woodTex('#5a3c26', [10, 3]), roughness: .7 }),
    travertine: std({ map: stoneTex('#a79878', [2, 1]), roughness: .7, env: .3 }),
    dark: std({ color: 0x18201c, roughness: .7 }),
    gold: std({ color: 0xdcb46c, roughness: .25, metalness: 1, env: 1 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x9cc4b8, roughness: .04, metalness: .3, transparent: true, opacity: .18, envMapIntensity: 1.2, depthWrite: false }),
    grass: std({ color: 0x1d3a28, roughness: 1 }),
    leaf: std({ color: 0x2c5a3a, roughness: .85, flatShading: true }),
    leaf2: std({ color: 0x3f7350, roughness: .85, flatShading: true }),
    bark: std({ color: 0x4a3221, roughness: .9 }),
    water: std({ color: 0x0b1c19, roughness: .06, metalness: .9, env: 1 }),
    cream: std({ color: 0xece4cc, roughness: .8 }),
    warmWin: new THREE.MeshBasicMaterial({ map: canvasTex(1024, 256, (g, w, h) => {
      const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#6b4524'); gr.addColorStop(.5, '#d9a35f'); gr.addColorStop(1, '#8a5a2e'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 6) { g.fillStyle = `rgba(60,30,10,${.08 + rand() * .2})`; g.fillRect(x, 0, 3, h); }
      for (const [x, ww] of [[140, 60], [520, 50], [800, 70]]) { g.fillStyle = 'rgba(40,22,10,.55)'; g.beginPath(); g.ellipse(x, h * .55, ww * .35, ww * .9, 0, 0, 7); g.fill(); g.beginPath(); g.arc(x, h * .55 - ww, ww * .28, 0, 7); g.fill(); }
    }), color: new THREE.Color(1.1, 1.1, 1.1) }),
    lampGlow: glow(0xffd9a0, 3.2),
    goldGlow: glow(0xf2c66d, 2.6),
  };

  const world = new THREE.Group(); scene.add(world);
  const lamps = []; // anclas de luz: el pool de luces reales va a las más cercanas a la cámara
  const lamp = (x, y, z, color = 0xffc98a, i = 18, d = 9) => lamps.push({ p: V(x, y, z), c: new THREE.Color(color), i, d });
  const anim = []; // funciones por cuadro

  const geoBox = new THREE.BoxGeometry(1, 1, 1);
  function box(mat, w, h, d, x, y0, z, parent = world) {
    const m = new THREE.Mesh(geoBox, mat); m.scale.set(w, h, d); m.position.set(x, y0 + h / 2, z); parent.add(m); return m;
  }
  function plane(mat, w, h, x, y, z, ry = 0, parent = world) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry; parent.add(m); return m;
  }
  function floor(mat, x0, x1, z0, z1, y = 0, parent = world, rep) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z0 - z1), mat);
    m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); parent.add(m); return m;
  }
  function ceiling(mat, x0, x1, z0, z1, y) { const m = floor(mat, x0, x1, z0, z1, y); m.rotation.x = Math.PI / 2; return m; }
  function wallX(mat, x, z0, z1, y0, y1, inwardSign) { // pared en x fija, mirando hacia adentro
    const m = plane(mat, z0 - z1, y1 - y0, x, (y0 + y1) / 2, (z0 + z1) / 2, inwardSign > 0 ? Math.PI / 2 : -Math.PI / 2); return m;
  }

  // ---------- cielo, luna, estrellas ----------
  const sky = new THREE.Mesh(new THREE.SphereGeometry(520, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {},
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `varying vec3 vP; void main(){ float h = vP.y;
      vec3 zen = vec3(0.02,0.05,0.05); vec3 mid = vec3(0.05,0.13,0.11); vec3 hor = vec3(0.25,0.22,0.15);
      vec3 c = mix(hor, mid, smoothstep(-0.02, 0.18, h)); c = mix(c, zen, smoothstep(0.18, 0.75, h));
      gl_FragColor = vec4(c, 1.0); }`
  }));
  scene.add(sky);
  const dot = dotTex();
  {
    const N = 1600, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const th = rand() * Math.PI * 2, ph = Math.acos(1 - rand() * .9), r = 480;
      pos.set([Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r + 10, Math.sin(ph) * Math.sin(th) * r], i * 3);
      const k = .6 + rand() * .9; col.set([k, k * .96, k * .85], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(g, new THREE.PointsMaterial({ size: 2.2, map: dot, vertexColors: true, transparent: true, depthWrite: false, fog: false, sizeAttenuation: true }));
    scene.add(stars);
    const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xfff3d6, fog: false, depthWrite: false }));
    moon.position.set(150, 120, -330); moon.scale.setScalar(42); scene.add(moon);
    const moonCore = new THREE.Mesh(new THREE.CircleGeometry(9, 48), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff6e0).multiplyScalar(2.2), fog: false }));
    moonCore.position.copy(moon.position); moonCore.lookAt(0, 0, 0); scene.add(moonCore);
  }
  scene.add(new THREE.HemisphereLight(0x8fb0c8, 0x14261e, .32));
  const moonLight = new THREE.DirectionalLight(0x9db8d6, .6); moonLight.position.set(-120, 150, 120); scene.add(moonLight);
  scene.add(new THREE.AmbientLight(0xffe6c4, .1));

  // ---------- jardín delantero ----------
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), M.grass); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.01; world.add(ground);
  {
    // sendero de piedras
    const stones = new THREE.InstancedMesh(geoBox, M.stoneLight, 22); const o = new THREE.Object3D();
    for (let i = 0; i < 22; i++) { o.position.set((i % 2 ? .25 : -.25) + (rand() - .5) * .2, .03, 33 - i * 1.45); o.scale.set(1.5 + rand() * .3, .06, .9); o.rotation.y = (rand() - .5) * .2; o.updateMatrix(); stones.setMatrixAt(i, o.matrix); }
    world.add(stones);
    box(M.stoneLight, 7, .1, 3, 0, 0, 1.4); // plataforma de la entrada
    // faroles
    for (const z of [29, 23, 17, 11, 5]) for (const s of [-1, 1]) {
      box(M.dark, .12, 1, .12, s * 2.3, 0, z);
      box(M.lampGlow, .2, .26, .2, s * 2.3, 1, z);
      box(M.dark, .3, .04, .3, s * 2.3, 1.26, z);
      lamp(s * 2.3, 1.1, z, 0xffc98a, 6, 6);
    }
    // estanque con lotos de luz
    const pool = box(M.water, 7, .04, 12, -8.5, 0, 16);
    for (const [x, z, w, d] of [[-8.5, 22.2, 7.4, .4], [-8.5, 9.8, 7.4, .4], [-12.2, 16, .4, 12.4], [-4.8, 16, .4, 12.4]]) box(M.stoneLight, w, .25, d, x, 0, z);
    const lotusGeo = new THREE.SphereGeometry(.16, 12, 8);
    for (let i = 0; i < 7; i++) {
      const x = -8.5 + (rand() - .5) * 5, z = 16 + (rand() - .5) * 9;
      const l = new THREE.Mesh(lotusGeo, M.lampGlow); l.scale.set(1, .5, 1); l.position.set(x, .08, z); world.add(l);
      const pad = new THREE.Mesh(new THREE.CircleGeometry(.45, 16), M.leaf2); pad.rotation.x = -Math.PI / 2; pad.position.set(x + .2, .05, z + .1); world.add(pad);
    }
    lamp(-8.5, .8, 16, 0xffd59a, 10, 9);
    void pool;
  }
  // árboles y arbustos
  const icoGeo = new THREE.IcosahedronGeometry(1, 1);
  function tree(x, z, s = 1, y = 0, parent = world) {
    const t = new THREE.Group(); t.position.set(x, y, z); t.scale.setScalar(s); parent.add(t);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.14, .22, 3, 7), M.bark); trunk.position.y = 1.5; t.add(trunk);
    for (let k = 0; k < 4; k++) {
      const f = new THREE.Mesh(icoGeo, k % 2 ? M.leaf : M.leaf2);
      f.position.set((rand() - .5) * 1.4, 3.2 + rand() * 1.4, (rand() - .5) * 1.4); f.scale.setScalar(1.1 + rand() * .7); f.rotation.set(rand(), rand(), rand()); t.add(f);
    }
    return t;
  }
  for (let i = 0; i < 44; i++) {
    const side = i % 2 ? 1 : -1, x = side * (13 + rand() * 40), z = -30 + rand() * 75;
    if (Math.abs(x) < 15 && z < 4) continue;
    tree(x, z, .9 + rand() * .9);
  }
  for (let i = 0; i < 18; i++) { const b = new THREE.Mesh(icoGeo, i % 2 ? M.leaf : M.leaf2); const s = i < 9 ? -1 : 1; b.position.set(s * (3.2 + (i % 9) * .65), .35, 1.0 + rand() * .6); b.scale.set(.5, .45, .45); world.add(b); }

  // luciérnagas
  const flies = (() => {
    const N = isSmall ? 70 : 140, pos = new Float32Array(N * 3), base = [];
    for (let i = 0; i < N; i++) { const p = [(rand() - .5) * 40, .3 + rand() * 2.6, -4 + rand() * 40]; base.push(p.concat([rand() * 6.28])); pos.set(p, i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ size: .16, map: dot, color: new THREE.Color(0xf6e27a).multiplyScalar(2), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(g, m); world.add(pts);
    anim.push(t => { for (let i = 0; i < N; i++) { const b = base[i]; pos[i * 3] = b[0] + Math.sin(t * .3 + b[3]) * .8; pos[i * 3 + 1] = b[1] + Math.sin(t * .7 + b[3] * 2) * .3; pos[i * 3 + 2] = b[2] + Math.cos(t * .25 + b[3]) * .8; } g.attributes.position.needsUpdate = true; m.opacity = .7 + Math.sin(t * 3) * .2; });
  })();
  void flies;

  // ---------- fachada moderna ----------
  // planta baja: piedra con ventanales a los lados de la entrada
  for (const s of [-1, 1]) {
    const xo = s * 9, xi = s * 2.6, cx = (xo + xi) / 2, w = Math.abs(xo - xi);
    box(M.stone, w, .6, .5, cx, 0, -.25);
    box(M.stone, w, .6, .5, cx, 3.8, -.25);
    box(M.stone, .6, 3.2, .5, xo - s * .3, .6, -.25);
    box(M.stone, .6, 3.2, .5, xi + s * .3, .6, -.25);
    const gw = w - 1.2, gx = cx;
    plane(M.glass, gw, 3.2, gx, 2.2, 0.02);
    for (let k = 1; k < 4; k++) box(M.dark, .06, 3.2, .08, gx - gw / 2 + k * gw / 4, .6, 0);
    box(M.dark, gw, .06, .08, gx, 2.9, 0);
  }
  // portal de entrada en madera y letrero
  box(M.wood, .85, 4.4, .7, -2.17, 0, -.1);
  box(M.wood, .85, 4.4, .7, 2.17, 0, -.1);
  box(M.wood, 5.2, .8, .7, 0, 3.6, -.1);
  const signTex = textTex(1024, 160, (g, w, h) => {
    g.fillStyle = '#1b1610'; g.fillRect(0, 0, w, h);
    drawMark(g, 90, h / 2 + 8, 120, '#f2c66d');
    g.fillStyle = '#f2c66d'; g.textBaseline = 'middle';
    fitText(g, 'CASA MULADHARA', w - 220, 78, '"Josefin Sans"');
    g.fillText('CASA MULADHARA', 170, h / 2 + 4);
  });
  plane(new THREE.MeshBasicMaterial({ map: signTex, color: new THREE.Color(1.6, 1.6, 1.6) }), 4.4, .69, 0, 4.0, .26);
  // puertas dobles (giran hacia adentro)
  const doorMat = std({ map: woodTex('#4f2f1a', [1, 2]), roughness: .5, env: .6 });
  const doors = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group(); pivot.position.set(s * 1.75, 0, -.15); world.add(pivot);
    const leaf = box(doorMat, 1.75, 3.6, .1, -s * .875, 0, 0, pivot);
    box(M.gold, .05, 1.4, .06, -s * 1.55, 1.1, .08, pivot);
    for (let k = 0; k < 6; k++) box(M.dark, .02, 3.3, .012, -s * (.25 + k * .25), .15, .056, pivot);
    void leaf; doors.push({ pivot, s });
  }
  // apliques junto a la puerta
  for (const s of [-1, 1]) { box(M.lampGlow, .12, .5, .08, s * 2.95, 2.3, .2); lamp(s * 2.95, 2.5, .8, 0xffc98a, 8, 7); }
  // planta alta en voladizo, revestida en listones de madera con un ventanal corrido
  box(M.dark, 20, 4, 15.4, 0, 4.4, -6.3);
  plane(M.warmWin, 17, 2.4, 0, 6.4, 1.42);
  plane(M.glass, 17, 2.4, 0, 6.4, 1.47);
  for (let k = 0; k <= 10; k++) box(M.dark, .07, 2.4, .1, -8.5 + k * 1.7, 5.2, 1.47);
  {
    const slatMat = std({ map: woodTex('#8a5a34', [1, 1]), roughness: .55 });
    const xs = []; for (let x = -9.95; x <= 9.95; x += .19) xs.push(x);
    const rows = [[4.4, .8], [7.6, .8]];
    const inst = new THREE.InstancedMesh(geoBox, slatMat, xs.length * 2 + 40); let n = 0; const o = new THREE.Object3D();
    for (const [y0, h] of rows) for (const x of xs) { o.position.set(x, y0 + h / 2, 1.5); o.scale.set(.11, h, .08); o.updateMatrix(); inst.setMatrixAt(n++, o.matrix); }
    for (const s of [-1, 1]) for (let x = 8.6; x <= 9.95; x += .19) { o.position.set(s * x, 6.4, 1.5); o.scale.set(.11, 2.4, .08); o.updateMatrix(); inst.setMatrixAt(n++, o.matrix); }
    inst.count = n; world.add(inst);
    // baranda de vidrio del balcón
    plane(M.glass, 17, 1, 0, 5.0, 1.9);
    box(M.gold, 17, .04, .05, 0, 5.5, 1.9);
  }
  // losa del techo con luces bajo el alero
  box(M.stoneDark, 22.4, .35, 17.6, 0, 8.4, -6.5);
  for (let x = -10; x <= 10; x += 2.5) { const d = new THREE.Mesh(new THREE.CircleGeometry(.09, 12), M.lampGlow); d.rotation.x = Math.PI / 2; d.position.set(x, 8.39, 1.9); world.add(d); }
  lamp(0, 7.6, 3, 0xffcf96, 10, 10);
  // muros laterales y cubierta de toda la casa (silueta)
  box(M.stoneDark, .4, 8.8, 104, -9.2, 0, -52);
  box(M.stoneDark, .4, 8.8, 104, 9.2, 0, -52);
  box(M.stoneDark, 18.8, .3, 90, 0, 8.8, -59);

  // ---------- interior ----------
  // recibidor y sala de péndulo: ancho completo
  floor(M.floor, -8.5, 8.5, 0, -28, .005);
  ceiling(M.ceil, -8.5, 8.5, 0, -28, 4.2);
  wallX(M.plaster, -8.5, 0, -28, 0, 4.2, 1);
  wallX(M.plaster, 8.5, 0, -28, 0, 4.2, -1);
  // zócalo de madera en las paredes
  for (const s of [-1, 1]) box(M.plasterWarm, .06, 1.1, 28, s * 8.47, 0, -14);
  // muro interior de la fachada (por dentro)
  for (const s of [-1, 1]) plane(M.plasterWarm, 6.4, 1, s * 5.7, .3, -.52, Math.PI);
  // tabique entre recibidor y sala de péndulo, con vano
  for (const s of [-1, 1]) box(M.plaster, 6.9, 4.2, .3, s * 5.05, 0, -14);
  box(M.plaster, 3.2, 1, .3, 0, 3.2, -14);
  box(M.woodLight, 3.3, .12, .34, 0, 3.15, -14);

  // --- recibidor ---
  {
    const rug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 64), new THREE.MeshStandardMaterial({ map: textTex(1024, 1024, (g, w, h) => {
      g.fillStyle = '#d8cfb6'; g.beginPath(); g.arc(w / 2, h / 2, w / 2, 0, 7); g.fill();
      flowerOfLife(g, w / 2, h / 2, 150, 'rgba(167,122,59,.55)', 5);
      g.strokeStyle = 'rgba(43,84,67,.5)'; g.lineWidth = 14; g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 30, 0, 7); g.stroke();
    }), roughness: .95 }));
    rug.rotation.x = -Math.PI / 2; rug.position.set(0, .012, -6.5); world.add(rug);
    // mandala de luz en la pared izquierda
    const mandala = plane(new THREE.MeshBasicMaterial({ map: textTex(1024, 1024, (g, w, h) => { flowerOfLife(g, w / 2, h / 2, 170, '#f2c66d', 7); drawMark(g, w / 2, h / 2 + 30, 300, '#f2c66d'); }), color: new THREE.Color(2.2, 2.2, 2.2), transparent: true, depthWrite: false }), 3, 3, -8.45, 2.25, -6.5, Math.PI / 2);
    void mandala;
    // retrato de Karen en la pared derecha, con luz de cuadro
    box(M.woodLight, .08, 1.78, 1.46, 8.44, 1.06, -6.5);
    const karen = photo('assets/img/e2ec26d75a.webp');
    plane(new THREE.MeshStandardMaterial({ map: karen, emissiveMap: karen, emissive: 0xffffff, emissiveIntensity: .45, roughness: .7 }), 1.3, 1.62, 8.39, 1.95, -6.5, -Math.PI / 2);
    box(M.lampGlow, .1, .04, .9, 8.3, 2.95, -6.5);
    lamp(7.2, 2.8, -6.5, 0xffe2b8, 10, 5);
    const plaque = textTex(1024, 256, (g, w, h) => { g.fillStyle = '#2b5443'; g.fillRect(0, 0, w, h); g.fillStyle = '#ece7d3'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '84px Marcellus'; g.fillText('Karen Oyarce Sáez', w / 2, 100); g.fillStyle = '#f2c66d'; g.font = '600 40px "Josefin Sans"'; g.fillText('MAESTRA HOLÍSTICA', w / 2, 190); });
    plane(new THREE.MeshBasicMaterial({ map: plaque }), 1.2, .3, 8.42, .82, -6.5, -Math.PI / 2);
    // altar con loto dorado flotante
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(.45, .55, 1, 32), M.stoneLight); ped.position.set(-4.6, .5, -8.6); world.add(ped);
    const lotus = new THREE.Group(); lotus.position.set(-4.6, 1.55, -8.6); world.add(lotus);
    const petalShape = new THREE.Shape(); petalShape.moveTo(0, 0); petalShape.bezierCurveTo(.2, .14, .18, .44, 0, .62); petalShape.bezierCurveTo(-.18, .44, -.2, .14, 0, 0);
    const petalGeo = new THREE.ExtrudeGeometry(petalShape, { depth: .01, bevelEnabled: true, bevelThickness: .008, bevelSize: .01, bevelSegments: 2, curveSegments: 12 });
    for (const [n, lift, sc] of [[10, .5, 1], [8, .95, .75], [6, 1.25, .5]]) for (let i = 0; i < n; i++) {
      const h = new THREE.Group(); h.rotation.y = i / n * Math.PI * 2 + lift; lotus.add(h);
      const p = new THREE.Mesh(petalGeo, n === 8 ? M.gold : M.cream); p.scale.setScalar(sc); p.rotation.x = -Math.PI / 2 + lift; p.position.z = .03; h.add(p);
    }
    const seed = new THREE.Mesh(new THREE.SphereGeometry(.08, 16, 12), M.lampGlow); seed.position.y = .06; lotus.add(seed);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xf2c66d, transparent: true, opacity: .6, blending: THREE.AdditiveBlending, depthWrite: false })); halo.scale.setScalar(1.6); halo.position.y = .1; lotus.add(halo);
    const rings = [];
    for (let i = 0; i < 3; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(.55 + i * .12, .006, 6, 80), M.goldGlow); lotus.add(r); rings.push(r); }
    lamp(-4.6, 2.0, -8.6, 0xf2c66d, 9, 5);
    anim.push(t => { lotus.position.y = 1.55 + Math.sin(t * 1.2) * .05; lotus.rotation.y = t * .3; rings.forEach((r, i) => { r.rotation.x = t * (.4 + i * .2) + i; r.rotation.y = t * (.3 - i * .15); }); });
    // consola, banco y plantas
    box(M.woodLight, 2.6, .9, .55, -6.8, 0, -12.6);
    box(M.woodLight, 2.2, .45, .5, 6.9, 0, -10.5);
    const potGeo = new THREE.CylinderGeometry(.32, .24, .6, 16);
    for (const [x, z] of [[-7.6, -1.4], [7.6, -1.4], [-7.6, -13], [7.6, -13], [-2.4, -13.3], [2.4, -13.3]]) {
      const pot = new THREE.Mesh(potGeo, M.stoneLight); pot.position.set(x, .3, z); world.add(pot);
      for (let k = 0; k < 3; k++) { const f = new THREE.Mesh(icoGeo, k % 2 ? M.leaf : M.leaf2); f.position.set(x + (rand() - .5) * .4, .9 + k * .35, z + (rand() - .5) * .4); f.scale.setScalar(.38 - k * .06); world.add(f); }
    }
    // lámparas colgantes
    for (const z of [-2.8, -6.5, -10.2]) {
      box(M.dark, .015, 1.1, .015, 0, 3.1, z);
      const b = new THREE.Mesh(new THREE.SphereGeometry(.2, 20, 14), M.lampGlow); b.position.set(0, 3.0, z); world.add(b);
      lamp(0, 2.8, z, 0xffcf96, 14, 8);
    }
  }

  // --- sala de péndulo hebreo ---
  {
    const cx = 0, cz = -21;
    const top = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, .08, 64), M.woodLight); top.position.set(cx, .76, cz); world.add(top);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(.18, .3, .72, 16), M.wood); leg.position.set(cx, .36, cz); world.add(leg);
    const fol = plane(new THREE.MeshBasicMaterial({ map: textTex(512, 512, (g, w, h) => flowerOfLife(g, w / 2, h / 2, 80, '#f2c66d', 4)), color: new THREE.Color(2.4, 2.4, 2.4), transparent: true, depthWrite: false }), 1.3, 1.3, cx, .805, cz);
    fol.rotation.x = -Math.PI / 2;
    const stoolGeo = new THREE.CylinderGeometry(.26, .26, .45, 20);
    const card = new THREE.MeshStandardMaterial({ color: 0xf6f1e2, roughness: .9 });
    const pends = [];
    const profile = [[0, -.3], [.03, -.26], [.07, -.16], [.08, -.13], [.08, .12], [.06, .17], [.03, .2], [.02, .23], [0, .24]].map(([x, y]) => new THREE.Vector2(x, y));
    const pendGeo = new THREE.LatheGeometry(profile, 24);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 + .3;
      const st = new THREE.Mesh(stoolGeo, i % 2 ? M.wood : M.cream); st.position.set(cx + Math.cos(a) * 2.45, .225, cz + Math.sin(a) * 2.45); world.add(st);
      const px = cx + Math.cos(a) * 1.15, pz = cz + Math.sin(a) * 1.15;
      const c = new THREE.Mesh(new THREE.PlaneGeometry(.22, .3), card); c.rotation.x = -Math.PI / 2; c.rotation.z = a; c.position.set(px, .802, pz); world.add(c);
      const pivot = new THREE.Group(); pivot.position.set(px, 4.2, pz); world.add(pivot);
      box(M.cream, .008, 2.85, .008, 0, -2.85, 0, pivot);
      const bob = new THREE.Mesh(pendGeo, M.woodLight); bob.position.y = -3.1; pivot.add(bob);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(.082, .008, 6, 24), M.gold); ring.rotation.x = Math.PI / 2; ring.position.y = -3.0; pivot.add(ring);
      pends.push({ pivot, ph: i * 1.1 });
    }
    anim.push(t => pends.forEach(p => { p.pivot.rotation.x = Math.sin(t * 1.6 + p.ph) * .06; p.pivot.rotation.z = Math.cos(t * 1.6 + p.ph) * .06; }));
    // anillo de luz sobre la mesa
    const halo = new THREE.Mesh(new THREE.TorusGeometry(1.4, .025, 8, 96), M.lampGlow); halo.rotation.x = Math.PI / 2; halo.position.set(cx, 3.7, cz); world.add(halo);
    lamp(cx, 3.2, cz, 0xffd7a0, 22, 9);
    // fotos de las estudiantes en las dos paredes
    const pics = [['231aa77989', 620, 465], ['f08f46f33a', 465, 620], ['292ddf3bf0', 620, 465], ['81f0a09164', 465, 620], ['41a246e938', 525, 620], ['37953e38df', 465, 620], ['6a5a5d85dd', 620, 465],
      ['df920f9476', 465, 620], ['851f49ec16', 465, 620], ['48b7a9fedc', 465, 620], ['37d3617307', 465, 620], ['554d470b85', 465, 620], ['eb751efb2e', 620, 465], ['85b1dea157', 465, 620]];
    pics.forEach(([id, w, h], i) => {
      const s = i < 7 ? -1 : 1, k = i % 7, z = -15.4 - k * 1.78, hh = 1.12, ww = hh * w / h;
      const tex = photo(`assets/img/${id}.webp`);
      box(M.dark, .05, hh + .1, ww + .1, s * 8.47, 1.85 - hh / 2 - .05, z);
      plane(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: .4, roughness: .7 }), ww, hh, s * 8.43, 1.85, z, s < 0 ? Math.PI / 2 : -Math.PI / 2);
    });
    lamp(-6.8, 3, -21, 0xffe2b8, 10, 7); lamp(6.8, 3, -21, 0xffe2b8, 10, 7);
    const title = textTex(1024, 200, (g, w, h) => { g.fillStyle = '#ece7d3'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '96px Marcellus'; g.fillText('Sala de Péndulo Hebreo', w / 2, h / 2); });
    plane(new THREE.MeshBasicMaterial({ map: title, transparent: true, color: new THREE.Color(1.3, 1.3, 1.3) }), 3, .58, 0, 3.6, -14.17, 0);
  }
  // tabique al pasillo
  for (const s of [-1, 1]) box(M.plaster, 6.1, 4.2, .3, s * 5.45, 0, -28);
  box(M.plaster, 4.8, .8, .3, 0, 3.4, -28);

  // --- pasillo de las terapias ---
  const THER = [['Reiki', 0xf2c66d], ['Radiestesia y Sanación del Alma', 0x9fd3b8], ['Péndulo Hebreo', 0xe8bd63], ['Registros Akáshicos', 0xb9c9ef], ['Vidas Pasadas', 0xc9a8e0],
    ['Sanando Niño Interior', 0xf0b7a4], ['Terapia Transgeneracional', 0xa8e0c8], ['Tarot Terapéutico y Evolutivo', 0xe8735f], ['Limpieza energética de espacios', 0xd9f0c4]];
  const doorZ = i => -31.5 - i * 3;
  const therapyDoors = [];
  {
    const z0 = -28, z1 = -58, W = 2.4, H = 3.4;
    floor(std({ color: 0x2a2a26, roughness: .35, env: .8 }), -W, W, z0, z1, .006);
    ceiling(M.dark, -W, W, z0, z1, H);
    box(M.lampGlow, .1, .02, 29.6, 0, H - .03, (z0 + z1) / 2);
    for (const s of [-1, 1]) box(M.goldGlow, .04, .02, 29.6, s * (W - .05), .01, (z0 + z1) / 2);
    for (const s of [-1, 1]) {
      const mine = THER.map((_, i) => i).filter(i => (i % 2 ? 1 : -1) === s);
      let zc = z0;
      const segs = [];
      for (const i of mine) { const dz = doorZ(i); segs.push([zc, dz + .6]); zc = dz - .6; }
      segs.push([zc, z1]);
      for (const [a, b] of segs) if (a - b > .01) wallX(M.plasterWarm, s * W, a, b, 0, H, -s);
      for (const i of mine) {
        const dz = doorZ(i), col = THER[i][1];
        wallX(M.plasterWarm, s * W, dz + .6, dz - .6, 2.5, H, -s);
        // salita detrás de la puerta, encendida con su color
        const room = new THREE.Group(); world.add(room);
        box(M.dark, 1.6, .02, 1.3, s * (W + .8), 0, dz, room);
        plane(glow(col, .85), 1.25, 2.5, s * (W + 1.58), 1.25, dz, s > 0 ? -Math.PI / 2 : Math.PI / 2, room);
        lamp(s * (W + .3), 1.4, dz, col, 7, 5);
        // marco y hoja entreabierta
        box(M.wood, .14, 2.5, .08, s * W, 0, dz + .62); box(M.wood, .14, 2.5, .08, s * W, 0, dz - .62); box(M.wood, .14, .1, 1.32, s * W, 2.45, dz);
        const hinge = new THREE.Group(); hinge.position.set(s * W, 0, dz + .6); world.add(hinge);
        box(doorMat, .06, 2.45, 1.2, s * .03, 0, -.6, hinge);
        box(M.gold, .03, .3, .03, s * .07, 1.05, -1.08, hinge);
        // letrero con el nombre de la terapia
        const name = THER[i][0];
        const sign = textTex(1024, 220, (g, w, h) => {
          g.fillStyle = '#1b2520'; g.fillRect(0, 0, w, h);
          g.fillStyle = `#${new THREE.Color(col).getHexString()}`; g.fillRect(0, h - 10, w, 10);
          g.fillStyle = '#ece7d3'; g.textAlign = 'center'; g.textBaseline = 'middle';
          fitText(g, name, w - 80, 84, 'Marcellus'); g.fillText(name, w / 2, h / 2 - 12);
          g.fillStyle = '#f2c66d'; g.font = '600 32px "Josefin Sans"'; g.fillText(String(i + 1).padStart(2, '0'), w / 2, h - 40);
        });
        plane(new THREE.MeshBasicMaterial({ map: sign, color: new THREE.Color(1.15, 1.15, 1.15) }), 1.25, .27, s * (W - .03), 2.85, dz, s > 0 ? -Math.PI / 2 : Math.PI / 2);
        therapyDoors.push({ hinge, s, i });
      }
    }
    anim.push((t, u) => therapyDoors.forEach(d => {
      const near = 1 - smooth(1.2, 4.5, Math.abs(camZ - doorZ(d.i)));
      d.hinge.rotation.y = -d.s * (.35 + near * .9 + Math.sin(t * .8 + d.i) * .02);
    }));
  }
  // tabique entre el pasillo y la escalera
  for (const s of [-1, 1]) box(M.plaster, 3.6, 8.6, .3, s * 4.2, 0, -58);
  box(M.plaster, 4.8, 5.2, .3, 0, 3.4, -58);

  // --- escalera de la Escuela (doble altura) ---
  const STEPS = [['Paso 1 · Inicia', 'Péndulo Hebreo Nivel 1'], ['Paso 2 · Equilibra', 'Limpieza Energética de Casas y Espacios'], ['Paso 3 · Transforma', 'Radiestesia y Sanación del Alma'],
    ['Paso 4 · Especialízate', 'Especializaciones en Radiestesia'], ['Paso 5 · Integra', 'Tarot Terapéutico: El Camino del Ser']];
  const stepGlow = [];
  {
    floor(M.floor, -6, 6, -58, -60.01, .005);
    floor(M.stoneDark, -6, 6, -60, -77, .002);
    wallX(M.plaster, -6, -58, -104, 0, 8.6, 1);
    wallX(M.plaster, 6, -58, -104, 0, 8.6, -1);
    ceiling(M.ceil, -6, 6, -58, -104, 8.6);
    for (const z of [-64, -71]) for (const s of [-1, 1]) {
      plane(glow(0x1d2c3c, 1), 1.4, 6, s * 5.97, 4.3, z, s > 0 ? -Math.PI / 2 : Math.PI / 2);
      plane(glow(0x9db8d6, .5), .05, 6, s * 5.96, 4.3, z, s > 0 ? -Math.PI / 2 : Math.PI / 2);
      box(M.dark, .06, 6, .08, s * 5.95, 1.3, z);
    }
    for (let k = 1; k <= 5; k++) {
      const z0 = -60 - (k - 1) * 3.4, zc = z0 - 1.7, y = k * .88;
      box(M.travertine, 6.4, y, 3.4, 0, 0, zc);
      const nose = box(M.goldGlow.clone(), 6.4, .03, .06, 0, y - .015, z0 + .02); stepGlow.push(nose);
      const num = textTex(256, 256, (g, w, h) => { g.fillStyle = '#f2c66d'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '200px Marcellus'; g.fillText(String(k), w / 2, h / 2 + 10); });
      plane(new THREE.MeshBasicMaterial({ map: num, transparent: true, color: new THREE.Color(1.8, 1.8, 1.8), depthWrite: false }), .7, .7, 0, y - .44, z0 + .015);
      // estela con el nombre de la formación
      const st = textTex(1024, 820, (g, w, h) => {
        g.fillStyle = 'rgba(20,32,27,.94)'; g.fillRect(0, 0, w, h);
        g.strokeStyle = '#f2c66d'; g.lineWidth = 6; g.strokeRect(24, 24, w - 48, h - 48);
        g.fillStyle = '#f2c66d'; g.textAlign = 'center'; g.font = '600 46px "Josefin Sans"'; g.fillText(STEPS[k - 1][0].toUpperCase(), w / 2, 140);
        g.fillStyle = '#ece7d3'; const words = STEPS[k - 1][1].split(' '); const lines = []; let line = '';
        g.font = '92px Marcellus';
        for (const wd of words) { const tt = line ? line + ' ' + wd : wd; if (g.measureText(tt).width > w - 140) { lines.push(line); line = wd; } else line = tt; }
        lines.push(line); lines.forEach((l, j) => g.fillText(l, w / 2, 300 + j * 110));
        g.font = '220px Marcellus'; g.fillStyle = 'rgba(242,198,109,.18)'; g.fillText(String(k), w / 2, h - 90);
      });
      const stele = plane(new THREE.MeshBasicMaterial({ map: st, color: new THREE.Color(1.1, 1.1, 1.1) }), 1.4, 1.12, -2.35, y + 1.45, zc - .6, .35);
      box(M.dark, .06, 1.0, .06, -2.35, y, zc - .62);
      void stele;
      lamp(0, y + 1.6, zc, 0xffd9a0, 8, 6);
      // plantas altas a los lados
      for (const s of [-1, 1]) { const f = new THREE.Mesh(icoGeo, M.leaf); f.position.set(s * 4.6, y * .6 + .9, zc); f.scale.set(.6, 1.1, .6); world.add(f); }
    }
    // losa del piso superior
    box(M.stoneDark, 12, .3, 27, 0, 4.1, -90.5);
    floor(M.floorUp, -6, 6, -77, -104, 4.405);
    // árbol de la vida en el descanso
    const tol = new THREE.Group(); tol.position.set(-4.1, 4.4, -80.6); world.add(tol);
    const goldTube = M.goldGlow;
    const branch = (pts, r) => tol.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => V(...p))), 24, r, 6), goldTube));
    branch([[0, 0, 0], [0, .8, 0], [.05, 1.6, 0], [0, 2.3, 0]], .05);
    for (const [a, b, c] of [[[0, 1.1, 0], [-.5, 1.6, .1], [-.9, 2.0, .2]], [[0, 1.2, 0], [.5, 1.7, -.1], [.95, 2.1, -.1]], [[0, 1.7, 0], [-.35, 2.2, -.1], [-.55, 2.7, 0]], [[0, 1.8, 0], [.35, 2.3, .1], [.6, 2.75, .1]], [[0, 0, 0], [-.4, -.02, .2], [-.8, -.05, .3]], [[0, 0, 0], [.45, -.02, -.1], [.85, -.05, -.2]]])
      branch([a, b, c], .025);
    const leafPts = []; for (let i = 0; i < 120; i++) { const a = rand() * Math.PI * 2, r = .3 + rand() * .9; leafPts.push(Math.cos(a) * r, 2.2 + Math.sin(a) * r * .7 + (rand() - .5) * .4, (rand() - .5) * .5); }
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(leafPts, 3));
    const leaves = new THREE.Points(lg, new THREE.PointsMaterial({ size: .12, map: dot, color: new THREE.Color(0xf2c66d).multiplyScalar(2.5), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    tol.add(leaves);
    const tolCircle = new THREE.Mesh(new THREE.TorusGeometry(1.45, .015, 6, 96), goldTube); tolCircle.position.y = 1.5; tol.add(tolCircle);
    lamp(-3.5, 6.5, -80.6, 0xf2c66d, 12, 7);
    anim.push(t => { tol.rotation.y = Math.sin(t * .3) * .25; leaves.material.opacity = .75 + Math.sin(t * 2) * .2; });
    const certTex = textTex(1024, 200, (g, w, h) => { g.fillStyle = '#f2c66d'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '600 52px "Josefin Sans"'; g.fillText('TERAPEUTA HOLÍSTICO INTEGRAL', w / 2, h / 2); });
    plane(new THREE.MeshBasicMaterial({ map: certTex, transparent: true, depthWrite: false, color: new THREE.Color(1.6, 1.6, 1.6) }), 2.4, .47, -4.1, 4.75, -80.2, .3);
  }

  // --- Sala Abierta (piso superior) ---
  const candles = [];
  {
    const cx = 0, cz = -85.5, y = 4.4;
    const cushionCols = [0xb86a4b, 0x7fa585, 0xece4cc, 0xc9a8e0, 0xb86a4b, 0x7fa585, 0xece4cc, 0xf2c66d];
    const cg = new THREE.CylinderGeometry(.38, .4, .16, 24);
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const c = new THREE.Mesh(cg, std({ color: cushionCols[i], roughness: .95 })); c.position.set(cx + Math.cos(a) * 1.9, y + .08, cz + Math.sin(a) * 1.9); world.add(c); }
    const altar = new THREE.Mesh(new THREE.CylinderGeometry(.6, .6, .18, 32), M.woodLight); altar.position.set(cx, y + .09, cz); world.add(altar);
    const bowl = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [.14, .01], [.2, .06], [.22, .14], [.21, .145]].map(([a, b]) => new THREE.Vector2(a, b)), 32), M.gold); bowl.position.set(cx + .22, y + .18, cz); world.add(bowl);
    const flameMat = new THREE.SpriteMaterial({ map: dot, color: new THREE.Color(0xffa040).multiplyScalar(3), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2, r = .32, h = .12 + (i % 3) * .06;
      const c = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, h, 12), M.cream); c.position.set(cx - .1 + Math.cos(a) * r * .6, y + .18 + h / 2, cz + Math.sin(a) * r); world.add(c);
      const f = new THREE.Sprite(flameMat); f.scale.set(.08, .14, 1); f.position.set(c.position.x, y + .2 + h + .05, c.position.z); world.add(f); candles.push(f);
    }
    lamp(cx, y + .9, cz, 0xff9a4a, 12, 7);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, .03, 8, 120), M.lampGlow); ring.rotation.x = Math.PI / 2; ring.position.set(cx, 8.0, cz); world.add(ring);
    lamp(cx, 7.6, cz, 0xffd7a0, 10, 9);
    // letrero EN VIVO
    const live = textTex(1024, 320, (g, w, h) => {
      g.fillStyle = '#16201b'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#e8735f'; g.beginPath(); g.arc(90, 90, 26, 0, 7); g.fill();
      g.fillStyle = '#ece7d3'; g.font = '600 56px "Josefin Sans"'; g.textBaseline = 'middle'; g.fillText('SALA ABIERTA · EN VIVO', 140, 92);
      g.fillStyle = '#f2c66d'; g.font = '64px Marcellus'; g.fillText('Martes 19:00 · Sábado 11:00', 70, 220);
    });
    plane(new THREE.MeshBasicMaterial({ map: live, color: new THREE.Color(1.2, 1.2, 1.2) }), 2.6, .81, -5.96, 6.6, -85.5, Math.PI / 2);
    // plantas colgantes
    for (const [x, z] of [[-3.5, -82], [3.5, -82], [-3.5, -89], [3.5, -89]]) { box(M.dark, .01, .8, .01, x, 7.8, z); const f = new THREE.Mesh(icoGeo, M.leaf2); f.position.set(x, 7.6, z); f.scale.set(.35, .45, .35); world.add(f); }
  }
  for (const s of [-1, 1]) box(M.plaster, 4.4, 4.2, .3, s * 3.8, 4.4, -91);
  box(M.plaster, 3.2, 1, .3, 0, 7.6, -91);

  // --- aula y tiendita ---
  {
    const y = 4.4;
    const dash = textTex(1600, 950, (g, w, h) => {
      g.fillStyle = '#fffdf6'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#2b5443'; g.fillRect(0, 0, w, 130);
      drawMark(g, 75, 72, 110, '#ece7d3');
      g.fillStyle = '#ece7d3'; g.font = '600 44px "Josefin Sans"'; g.textBaseline = 'middle'; g.fillText('AULA CASA MULADHARA', 150, 68);
      g.fillStyle = '#22302a'; g.font = '84px Marcellus'; g.fillText('Hola, Valentina', 70, 230);
      [['Péndulo Hebreo Nivel 1', 'Completado', 1], ['Radiestesia y Sanación del Alma', '3 de 8 clases', .375], ['Limpieza Energética de Espacios', 'Por iniciar', 0]].forEach(([n, s, p], i) => {
        const yy = 320 + i * 190;
        g.strokeStyle = '#d9d5c3'; g.lineWidth = 3; g.strokeRect(70, yy, w - 140, 160);
        g.fillStyle = '#22302a'; g.font = '700 46px Mulish, sans-serif'; g.fillText(n, 110, yy + 55);
        g.fillStyle = '#5d6b63'; g.textAlign = 'right'; g.fillText(s, w - 110, yy + 55); g.textAlign = 'left';
        g.fillStyle = '#d9d5c3'; g.fillRect(110, yy + 110, w - 220, 14);
        g.fillStyle = '#2b5443'; g.fillRect(110, yy + 110, (w - 220) * p, 14);
      });
    });
    box(M.dark, .08, 2.0, 3.3, -5.95, y + 1.3, -97.5);
    plane(new THREE.MeshBasicMaterial({ map: dash, color: new THREE.Color(.78, .78, .78) }), 3.1, 1.84, -5.9, y + 2.3, -97.5, Math.PI / 2);
    lamp(-4.5, y + 2.4, -97.5, 0xdfeaff, 8, 6);
    box(M.woodLight, 1, .06, 2.4, -5.3, y + .76, -97.5);
    for (const dz of [-1, 1]) box(M.dark, .05, .76, .05, -4.9, y, -97.5 + dz);
    const chair = box(M.cream, .5, .45, .5, -4.4, y, -97.5); void chair;
    // repisas con los productos
    const sprayTex = photo('assets/img/c6ce786100.webp'), tintTex = photo('assets/img/cdf5f76943.webp');
    for (const [z, tex, w, h] of [[-95.2, sprayTex, 720, 889], [-99.6, tintTex, 676, 775]]) {
      const hh = 1.2, ww = hh * w / h;
      box(M.woodLight, .05, hh + .1, ww + .1, 5.97, y + 2.6 - hh / 2 - .05 + .1, z);
      plane(new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: .45, roughness: .6 }), ww, hh, 5.93, y + 2.7, z, -Math.PI / 2);
    }
    const amber = new THREE.MeshPhysicalMaterial({ color: 0x7a3a10, roughness: .1, metalness: 0, transmission: 0, transparent: true, opacity: .92, clearcoat: 1, envMapIntensity: 1.2 });
    const label = std({ color: 0x2b5443, roughness: .7 });
    for (const sy of [y + .8, y + 1.45]) {
      box(M.woodLight, .4, .05, 6.5, 5.78, sy, -97.4);
      box(M.lampGlow, .02, .02, 6.3, 5.6, sy + .6, -97.4);
      for (let k = 0; k < 9; k++) {
        const z = -94.6 - k * .68, spray = (k + (sy > y + 1 ? 1 : 0)) % 2 === 0;
        const b = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .22, 20), amber); b.position.set(5.75, sy + .135, z); world.add(b);
        const l = new THREE.Mesh(new THREE.CylinderGeometry(.072, .072, .1, 20), label); l.position.set(5.75, sy + .13, z); world.add(l);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(spray ? .035 : .045, .05, spray ? .1 : .07, 12), spray ? M.cream : M.dark); cap.position.set(5.75, sy + .3, z); world.add(cap);
      }
    }
    lamp(4.6, y + 2.2, -97.4, 0xffd9a8, 10, 6);
    const shopSign = textTex(1024, 200, (g, w, h) => { g.fillStyle = '#ece7d3'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '96px Marcellus'; g.fillText('La tiendita', w / 2, h / 2); });
    plane(new THREE.MeshBasicMaterial({ map: shopSign, transparent: true, depthWrite: false }), 2, .39, 5.95, y + 3.6, -97.4, -Math.PI / 2);
    // muro de vidrio hacia la terraza
    for (const s of [-1, 1]) { plane(M.glass, 4.6, 4.2, s * 3.7, y + 2.1, -104); for (let k = 0; k <= 3; k++) box(M.dark, .06, 4.2, .08, s * (1.4 + k * 1.53), y, -104); }
    box(M.dark, 12, .1, .1, 0, y + 4.1, -104);
  }

  // --- terraza: el jardín de Maestra Karen ---
  const kidsFrames = [];
  {
    const y = 4.4;
    box(M.stone, 18, .5, 24, 0, y - .5, -116);
    const lawn = floor(std({ color: 0x3b6b45, roughness: 1 }), -8.8, 8.8, -104.2, -127.8, y + .01); void lawn;
    for (const [x, z, w, d] of [[-8.9, -116, .06, 24], [8.9, -116, .06, 24], [0, -127.9, 18, .06]]) { const g = box(M.glass, w, 1.1, d, x, y, z); g.renderOrder = 2; box(M.gold, w + .02, .04, d + .02, x, y + 1.1, z); }
    // árbol grande con los cuadros de los videos colgando
    const t = tree(-3, -117, 1.7, y);
    const kids = ['55eaee5a9f', '7d63999fc3', '6765ba3ad3', '5d7729f660'];
    kids.forEach((id, i) => {
      const tex = photo(`assets/img/${id}.webp`);
      const g = new THREE.Group(); g.position.set(-5.3 + i * 1.5, y + 5.2, -115.6 + (i % 2) * .5); world.add(g);
      box(M.cream, .008, .9, .008, 0, -.9, 0, g);
      box(M.woodLight, .98, 1.2, .05, 0, -2.1, -.03, g);
      const p = new THREE.Mesh(new THREE.PlaneGeometry(.88, 1.1), new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: .55, roughness: .7 }));
      p.position.set(0, -1.5, .001); g.add(p);
      kidsFrames.push({ g, ph: i * 1.3 });
    });
    void t;
    anim.push(tm => kidsFrames.forEach(f => { f.g.rotation.z = Math.sin(tm * .9 + f.ph) * .05; f.g.rotation.y = Math.sin(tm * .6 + f.ph) * .12; }));
    // columpio
    for (const dx of [-.4, .4]) box(M.cream, .02, 2.2, .02, 1.6 + dx, y + .6, -117.5);
    box(M.woodLight, 1, .06, .35, 1.6, y + .6, -117.5);
    box(M.bark, .25, .25, 3.6, 1.6, y + 2.8, -117.5).rotation.x = Math.PI / 2;
    // flores
    const fg = new THREE.SphereGeometry(.07, 8, 6), fcol = [0xf6d27c, 0xf0b7a4, 0xb9c9ef, 0xc9a8e0, 0xffffff];
    const fm = fcol.map(c => glow(c, 1.1));
    for (let i = 0; i < 120; i++) { const f = new THREE.Mesh(fg, fm[i % fm.length]); f.position.set((rand() - .5) * 16, y + .08, -105 - rand() * 22); world.add(f); }
    // guirnalda de luces entre postes
    const bulbs = [];
    for (const [a, b] of [[V(-8.5, y + 3, -105), V(8.5, y + 3, -105)], [V(-8.5, y + 3, -127), V(8.5, y + 3, -127)], [V(8.5, y + 3, -105), V(8.5, y + 3, -127)]]) {
      for (let k = 0; k <= 24; k++) { const t2 = k / 24; const p = a.clone().lerp(b, t2); p.y -= Math.sin(t2 * Math.PI) * .7; bulbs.push(p); }
      box(M.dark, .08, 3, .08, a.x, y, a.z); box(M.dark, .08, 3, .08, b.x, y, b.z);
    }
    const bulbGeo = new THREE.SphereGeometry(.05, 8, 6);
    const bulbInst = new THREE.InstancedMesh(bulbGeo, glow(0xffd9a0, 3), bulbs.length); const o = new THREE.Object3D();
    bulbs.forEach((p, i) => { o.position.copy(p); o.updateMatrix(); bulbInst.setMatrixAt(i, o.matrix); }); world.add(bulbInst);
    lamp(0, y + 2.6, -110, 0xffd7a0, 14, 12); lamp(-3, y + 3, -118, 0xffd7a0, 14, 12);
    // burbujas de colores
    const N = 90, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), base = [];
    const bc = [0xf6d27c, 0x9fcfb4, 0xb9c9ef, 0xf0b7a4].map(c => new THREE.Color(c));
    for (let i = 0; i < N; i++) { base.push([(rand() - .5) * 14, rand() * 6, -106 - rand() * 18, rand() * 6.28, .3 + rand() * .5]); const c = bc[i % 4]; col.set([c.r, c.g, c.b], i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    world.add(new THREE.Points(g, new THREE.PointsMaterial({ size: .35, map: dot, vertexColors: true, transparent: true, opacity: .8, depthWrite: false })));
    anim.push(tm => { for (let i = 0; i < N; i++) { const b = base[i]; const yy = (b[1] + tm * b[4]) % 6; pos[i * 3] = b[0] + Math.sin(tm * .8 + b[3]) * .4; pos[i * 3 + 1] = y + .3 + yy; pos[i * 3 + 2] = b[2]; } g.attributes.position.needsUpdate = true; });
    const kidsSign = textTex(1024, 220, (g2, w, h) => { g2.fillStyle = '#f6d27c'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.font = '600 120px Fredoka'; g2.fillText('Maestra Karen', w / 2, h / 2); });
    plane(new THREE.MeshBasicMaterial({ map: kidsSign, transparent: true, depthWrite: false, color: new THREE.Color(1.5, 1.5, 1.5) }), 3.2, .69, -3, y + 6.9, -115.3, .1);
  }

  // --- loto de estrellas en el cielo (el final del viaje) ---
  const skyLotus = new THREE.Group(); skyLotus.position.set(0, 48, -200); scene.add(skyLotus);
  let skyMat;
  {
    const pts = [];
    const petal = (rot, sc, lift) => { for (let k = 0; k <= 60; k++) { const t = k / 60; const a = t * Math.PI; const x = Math.sin(a) * .42 * Math.sin(a * .9 + .2), y = t * 1.15; for (const s of [-1, 1]) { const px = s * x, py = y; const c = Math.cos(rot), sn = Math.sin(rot); pts.push((px * c - py * sn) * sc, (px * sn + py * c) * sc * lift, 0); } } };
    for (let i = 0; i < 9; i++) petal((i - 4) * .33, 14, 1);
    for (let i = 0; i < 5; i++) petal((i - 2) * .38, 9, 1);
    for (let i = 0; i < 400; i++) { const a = rand() * Math.PI * 2, r = rand() * 3; pts.push(Math.cos(a) * r, Math.sin(a) * r * .4 - 1, 0); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    skyMat = new THREE.PointsMaterial({ size: .9, map: dot, color: new THREE.Color(0xf2c66d).multiplyScalar(2.2), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    skyLotus.add(new THREE.Points(g, skyMat));
  }

  // ---------- pool de luces reales ----------
  const POOL = isSmall ? 4 : 6;
  const pool = [];
  for (let i = 0; i < POOL; i++) { const l = new THREE.PointLight(0xffffff, 0, 8, 2); scene.add(l); pool.push(l); }
  const tmp = [];
  function assignLights(cam) {
    tmp.length = 0;
    for (const a of lamps) { const d = a.p.distanceTo(cam); if (d < 34) tmp.push([d, a]); }
    tmp.sort((x, y) => x[0] - y[0]);
    for (let i = 0; i < POOL; i++) {
      const l = pool[i], e = tmp[i];
      if (!e) { l.intensity = 0; continue; }
      const [d, a] = e;
      l.position.copy(a.p); l.color.copy(a.c); l.distance = a.d * 1.6;
      l.intensity = a.i * (1 - smooth(16, 34, d)) * (a.flicker ? .85 + Math.sin(performance.now() * .012 + i) * .15 : 1);
    }
  }
  lamps.forEach(a => { if (a.c.r > .99 && a.c.g < .65) a.flicker = true; });

  // ---------- render con brillo (bloom) ----------
  let composer = null, bloom = null;
  if (!isSmall) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), .55, .55, .92);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }
  let W = 0, H = 0;
  function resize() {
    const w = innerWidth, h = innerHeight;
    if (w === W && Math.abs(h - H) < 120) return;
    W = w; H = h;
    renderer.setSize(w, h, false); composer && composer.setSize(w, h);
    camera.aspect = w / h; camera.fov = w / h < .8 ? 68 : 55; camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);

  // ---------- bucle ----------
  const pos = V(0, 0, 0), look = V(0, 0, 0), curPos = V(0, 1.7, 40), curLook = V(0, 3, 0), right = V(0, 0, 0), up = V(0, 1, 0);
  let camZ = 40, last = performance.now(), t0 = last, first = true;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000;
    resize();
    const u = state.u;
    sample(u, pos, look);
    // la persona puede mirar un poco alrededor con el mouse
    right.subVectors(look, pos).cross(up).normalize();
    look.addScaledVector(right, (state.pointer.nx || 0) * .9).addScaledVector(up, -(state.pointer.ny || 0) * .5);
    const k = first ? 1 : 1 - Math.pow(.004, dt);
    first = false;
    curPos.lerp(pos, k); curLook.lerp(look, k);
    // respiración suave de la cámara
    camera.position.copy(curPos); camera.position.y += Math.sin(t * .8) * .025;
    camera.lookAt(curLook);
    camZ = camera.position.z;
    // puertas
    const open = smooth(.95, 1.55, u);
    doors[0].pivot.rotation.y = open * 1.75; doors[1].pivot.rotation.y = -open * 1.75;
    // escalones: se encienden al pisarlos
    stepGlow.forEach((m, i) => { const on = smooth(5.1 + (i + .5) * .155, 5.12 + (i + 1) * .155, u); m.material.color.setRGB(2.6 + on * 3, 2.0 + on * 2.2, 1.0 + on); });
    // velas
    candles.forEach((c, i) => { const f = .9 + Math.sin(t * 13 + i * 2) * .08 + Math.sin(t * 7.3 + i) * .06; c.scale.set(.08 * f, .14 * f, 1); });
    skyMat.opacity = smooth(10.6, 11.6, u) * (.85 + Math.sin(t * 1.5) * .15);
    skyLotus.rotation.z = Math.sin(t * .2) * .05;
    anim.forEach(f => f(t, u));
    assignLights(camera.position);
    if (composer) { bloom.strength = .5 + smooth(10.8, 12, u) * .35; composer.render(); } else renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
  // primera imagen lista
  return new Promise(res => { const check = () => (total === 0 || loaded >= total) ? res() : setTimeout(check, 100); check(); setTimeout(res, 7000); });
}
