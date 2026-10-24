// Escena 3D de la portada: un péndulo hebreo que cuelga sobre un loto dorado, anillos de energía y partículas.
// experiencia.js mueve el objeto `state` (dónde va el péndulo en pantalla, qué capítulo del recorrido se ve,
// el puntero) y esta escena lo sigue en su propio requestAnimationFrame.
import * as THREE from 'three';
import { RoomEnvironment } from '../vendor/RoomEnvironment.js';

const FOV = 35, CAM_Z = 10;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Estados: 0 portada, 1..5 capítulos del recorrido (sanar, formarte, aprender, cuidar, jugar)
// rings: [rotX, rotY, posY, escala] por anillo
const STATES = [
  { tilt: 0,     spin: 0,    rings: [[1.25, 0.2, -0.1, 1], [0.35, 1.1, -0.1, 1.15], [1.57, -0.6, -0.1, 1.3]], glow: '#f2c66d', flower: 0.35, lotus: 1 },
  { tilt: 0,     spin: 0.9,  rings: [[1.4, 0, 0.55, 0.75], [1.4, 0, -0.1, 0.95], [1.4, 0, -0.75, 1.15]],      glow: '#f6d58a', flower: 0.5,  lotus: 1.08 },
  { tilt: -0.12, spin: 2.6,  rings: [[1.57, 0, -0.9, 1.3], [1.57, 0, -0.15, 1.0], [1.57, 0, 0.6, 0.7]],       glow: '#e8bd63', flower: 0.25, lotus: 0.95 },
  { tilt: 0.1,   spin: 4.2,  rings: [[1.0, 0.3, -0.1, 1.2], [1.0, 2.4, -0.1, 1.2], [1.57, 1.3, -0.1, 1.2]],   glow: '#a8e0c8', flower: 0.6,  lotus: 0.9 },
  { tilt: 0.22,  spin: 5.6,  rings: [[2.0, 0, -1.95, 1.05], [2.0, 0, -1.9, 1.3], [2.0, 0, -1.85, 1.55]],     glow: '#f2c66d', flower: 0.3,  lotus: 1.15 },
  { tilt: -0.18, spin: 7.4,  rings: [[0.6, 0.9, 0.3, 1.1], [2.2, -0.7, -0.4, 1.3], [1.2, 2.0, 0.1, 0.9]],    glow: '#f0b7a4', flower: 0.45, lotus: 1 },
];

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function woodTexture() {
  return canvasTexture(512, 256, (g, w, h) => {
    g.fillStyle = '#a8743f'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) {
      const x = Math.random() * w, a = .04 + Math.random() * .1;
      g.strokeStyle = Math.random() < .5 ? `rgba(120,72,34,${a})` : `rgba(240,205,150,${a})`;
      g.lineWidth = .6 + Math.random() * 2.4;
      g.beginPath(); g.moveTo(x, 0);
      for (let y = 0; y <= h; y += 16) g.lineTo(x + Math.sin(y * .02 + i) * 3, y);
      g.stroke();
    }
  });
}

function dotTexture() {
  return canvasTexture(64, 64, (g, w) => {
    const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.25, 'rgba(255,255,255,.75)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, w);
  });
}

export function startCosmos(canvas, state) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  const small = Math.min(innerWidth, innerHeight) < 700;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(FOV, innerWidth / innerHeight, 0.1, 60);
  camera.position.set(0, 0, CAM_Z);

  // luces: llave cálida, contraluz verde menta y relleno suave
  const key = new THREE.DirectionalLight(0xffe2b0, 2.2); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fe0c4, 2.4); rim.position.set(-4, 2, -3); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xfff3dc, 0x1f3f32, .6));

  const gold = new THREE.MeshStandardMaterial({ color: 0xe0b56a, metalness: 1, roughness: .22 });
  const wood = new THREE.MeshPhysicalMaterial({ map: woodTexture(), roughness: .42, metalness: .05, clearcoat: .9, clearcoatRoughness: .2 });

  // root: se ubica sobre el ancla de la pantalla
  const root = new THREE.Group(); scene.add(root);

  // péndulo hebreo (torneado) colgando de un pivote alto
  const pivot = new THREE.Group(); pivot.position.y = 4; root.add(pivot);
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, 3, 8), new THREE.MeshStandardMaterial({ color: 0xece4cc, roughness: .9 }));
  cord.position.y = -1.5; pivot.add(cord);
  const pend = new THREE.Group(); pend.position.y = -4; pivot.add(pend);
  const profile = [[0, -1.3], [.05, -1.22], [.2, -.86], [.29, -.66], [.32, -.58], [.32, .56], [.3, .64], [.22, .72], [.13, .78], [.075, .84], [.06, .9], [.085, .95], [.06, 1.0], [0, 1.01]]
    .map(([x, y]) => new THREE.Vector2(x, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 72), wood); pend.add(body);
  for (const y of [-.5, -.42, .44, .52]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(.322, .018, 12, 72), gold);
    band.rotation.x = Math.PI / 2; band.position.y = y; pend.add(band);
  }
  const tipCap = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 12), gold); tipCap.position.y = -1.27; pend.add(tipCap);

  // loto dorado bajo el péndulo
  const lotus = new THREE.Group(); lotus.position.y = -2.05; lotus.rotation.x = .5; root.add(lotus);
  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0); petalShape.bezierCurveTo(.36, .25, .32, .78, 0, 1.12); petalShape.bezierCurveTo(-.32, .78, -.36, .25, 0, 0);
  const petalGeo = new THREE.ExtrudeGeometry(petalShape, { depth: .02, bevelEnabled: true, bevelThickness: .015, bevelSize: .02, bevelSegments: 2, curveSegments: 18 });
  const petalCream = new THREE.MeshPhysicalMaterial({ color: 0xeadcb4, roughness: .45, sheen: 1, sheenColor: new THREE.Color(0xf2c66d), emissive: 0x3a2a10, emissiveIntensity: .25, side: THREE.DoubleSide });
  const lotusPetals = [];
  const ring = (n, scale, lift, mat, offset) => {
    for (let i = 0; i < n; i++) {
      const holder = new THREE.Group(); holder.rotation.y = i / n * Math.PI * 2 + offset;
      const m = new THREE.Mesh(petalGeo, mat); m.scale.setScalar(scale); m.position.z = .06;
      m.rotation.x = -Math.PI / 2 + lift; m.userData.lift = lift;
      holder.add(m); lotus.add(holder); lotusPetals.push(m);
    }
  };
  ring(10, .95, .38, petalCream, 0);
  ring(8, .7, .85, gold, Math.PI / 8);
  ring(6, .45, 1.2, petalCream, 0);
  const seed = new THREE.Mesh(new THREE.SphereGeometry(.16, 24, 16), gold); seed.position.y = .1; lotus.add(seed);

  // halo de luz bajo el loto (como el pedestal del video de referencia)
  const dot = dotTexture();
  const glowMat = new THREE.SpriteMaterial({ map: dot, color: 0xf2c66d, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false });
  const glow = new THREE.Sprite(glowMat); glow.scale.set(5.2, 2.6, 1); glow.position.set(0, -2.1, -.4); root.add(glow);
  const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xfff1c9, transparent: true, opacity: .22, blending: THREE.AdditiveBlending, depthWrite: false }));
  aura.scale.set(4.6, 4.6, 1); aura.position.set(0, -.2, -1); root.add(aura);

  // anillos de energía con cuentas que orbitan
  const ringGroups = [];
  const beadMat = new THREE.MeshBasicMaterial({ color: 0xfff1c9 });
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group(); root.add(g);
    const spinner = new THREE.Group(); g.add(spinner);
    const tor = new THREE.Mesh(new THREE.TorusGeometry(1.25, .011, 8, 160), gold); spinner.add(tor);
    for (let b = 0; b < 2; b++) {
      const a = b * Math.PI + i;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(.045, 12, 8), beadMat);
      bead.position.set(Math.cos(a) * 1.25, Math.sin(a) * 1.25, 0); spinner.add(bead);
      const bg = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xf2c66d, transparent: true, opacity: .8, blending: THREE.AdditiveBlending, depthWrite: false }));
      bg.scale.setScalar(.38); bead.add(bg);
    }
    g.userData = { spinner, speed: (.35 + i * .18) * (i % 2 ? -1 : 1) };
    ringGroups.push(g);
  }

  // flor de la vida detrás
  const flower = new THREE.Group(); flower.position.set(0, -.3, -1.6); root.add(flower);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xf2c66d, transparent: true, opacity: .3 });
  const circle = (cx, cy, r) => {
    const pts = []; for (let i = 0; i <= 96; i++) { const a = i / 96 * Math.PI * 2; pts.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0)); }
    flower.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  };
  const R = .72; circle(0, 0, R);
  for (let i = 0; i < 6; i++) circle(Math.cos(i * Math.PI / 3) * R, Math.sin(i * Math.PI / 3) * R, R);
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; circle(Math.cos(a) * R * Math.sqrt(3), Math.sin(a) * R * Math.sqrt(3), R); }
  circle(0, 0, R * 2); circle(0, 0, R * 2.6);

  // partículas de energía que suben
  const N = small ? 380 : 800;
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), spd = new Float32Array(N), phase = new Float32Array(N);
  const palette = [new THREE.Color('#f2c66d'), new THREE.Color('#fff1c9'), new THREE.Color('#9fd3b8'), new THREE.Color('#e8bd63')];
  const kidsPalette = [new THREE.Color('#f6d27c'), new THREE.Color('#9fcfb4'), new THREE.Color('#b9c9ef'), new THREE.Color('#f0b7a4')];
  const base = new Float32Array(N * 3), kids = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 16; pos[i * 3 + 1] = (Math.random() - .5) * 10; pos[i * 3 + 2] = -6 + Math.random() * 8;
    spd[i] = .12 + Math.random() * .35; phase[i] = Math.random() * 6.28;
    const c = palette[i % 4], k = kidsPalette[(i * 7) % 4];
    base.set([c.r, c.g, c.b], i * 3); kids.set([k.r, k.g, k.b], i * 3);
  }
  col.set(base);
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pgeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const points = new THREE.Points(pgeo, new THREE.PointsMaterial({ size: .07, map: dot, vertexColors: true, transparent: true, opacity: .85, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  scene.add(points);

  // tamaño
  let W = 0, H = 0;
  function resize() {
    const w = innerWidth, h = innerHeight;
    if (w === W && Math.abs(h - H) < 120) return;
    W = w; H = h; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);

  const worldPerPx = () => 2 * CAM_Z * Math.tan(FOV * Math.PI / 360) / H;
  const tmpGlow = new THREE.Color(), cA = new THREE.Color(), cB = new THREE.Color();

  // física del péndulo
  let theta = 0, omega = 0, last = performance.now(), t0 = last, spinAcc = 0;
  let px = state.pointer.x, py = state.pointer.y, cur = { x: null, y: 0, s: 1 };

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!state.visible) return;
    resize();
    const t = (now - t0) / 1000;

    // estado interpolado
    const sf = clamp(state.stage, 0, STATES.length - 1), i0 = Math.floor(sf), i1 = Math.min(STATES.length - 1, i0 + 1), f = sf - i0;
    const A = STATES[i0], B = STATES[i1];

    // posición en pantalla -> mundo
    const k = worldPerPx();
    const target = { x: (state.anchor.x - W / 2) * k, y: -(state.anchor.y - H / 2) * k, s: state.anchor.size * k / 3.9 };
    if (cur.x === null) cur = { ...target };
    const follow = 1 - Math.pow(.0005, dt);
    cur.x = lerp(cur.x, target.x, follow); cur.y = lerp(cur.y, target.y, follow); cur.s = lerp(cur.s, target.s, follow);
    const intro = state.still ? 1 : clamp(t / 1.8), drop = 1 - Math.pow(1 - intro, 3);
    root.position.set(cur.x, cur.y + .55 * cur.s + (1 - drop) * 6, 0);
    root.scale.setScalar(cur.s);
    root.rotation.z = lerp(A.tilt, B.tilt, f);
    root.rotation.y = lerp(root.rotation.y, (state.pointer.nx || 0) * .35, .05);
    root.rotation.x = lerp(root.rotation.x, (state.pointer.ny || 0) * .12, .05);

    // empuje del puntero: su velocidad cerca del péndulo lo mece
    const vx = (state.pointer.x - px) / Math.max(dt, .001); px = state.pointer.x; py = state.pointer.y;
    const bodyX = state.anchor.x, bodyY = state.anchor.y - state.anchor.size * .1;
    const near = Math.hypot(state.pointer.x - bodyX, state.pointer.y - bodyY) < state.anchor.size * .55;
    if (near && !state.still) omega += clamp(vx * .00035, -.25, .25);
    const drive = state.still ? 0 : .07 * Math.sin(t * 1.15) + (state.pointer.nx || 0) * .05;
    omega += (-9 * (theta - drive) - 1.1 * omega) * dt; theta += omega * dt;
    theta = clamp(theta, -.45, .45);
    pivot.rotation.z = theta;
    spinAcc += dt * (state.still ? 0 : .35 + clamp(state.velocity * .0015, -3, 3));
    pend.rotation.y = spinAcc + lerp(A.spin, B.spin, f);

    // anillos
    ringGroups.forEach((g, i) => {
      const a = A.rings[i], b = B.rings[i];
      g.rotation.x = lerp(a[0], b[0], f) + Math.sin(t * .4 + i) * .06;
      g.rotation.y = lerp(a[1], b[1], f) + t * .08 * (i % 2 ? -1 : 1);
      g.position.y = lerp(a[2], b[2], f);
      g.scale.setScalar(lerp(a[3], b[3], f));
      g.userData.spinner.rotation.z += dt * g.userData.speed * (state.still ? 0 : 1);
    });

    // loto: respira y se abre un poco con cada capítulo
    const open = lerp(A.lotus, B.lotus, f);
    lotus.rotation.y = t * .12;
    lotusPetals.forEach(m => { m.rotation.x = -Math.PI / 2 + m.userData.lift * open + Math.sin(t * 1.2) * .03; });
    flower.rotation.z = -t * .05;
    lineMat.opacity = lerp(A.flower, B.flower, f);
    cA.set(A.glow); cB.set(B.glow); tmpGlow.copy(cA).lerp(cB, f);
    glowMat.color.copy(tmpGlow); glowMat.opacity = .45 + Math.sin(t * 1.6) * .08;

    // partículas: suben, se mecen y en el capítulo de niños se pintan de colores
    const kidsMix = clamp(sf - 4);
    const boost = 1 + Math.min(4, Math.abs(state.velocity) * .004);
    for (let i = 0; i < N; i++) {
      const j = i * 3;
      pos[j + 1] += spd[i] * dt * boost * (state.still ? 0 : 1);
      pos[j] += Math.sin(t * .6 + phase[i]) * dt * .05;
      if (pos[j + 1] > 5.5) { pos[j + 1] = -5.5; pos[j] = (Math.random() - .5) * 16; }
      col[j] = lerp(base[j], kids[j], kidsMix); col[j + 1] = lerp(base[j + 1], kids[j + 1], kidsMix); col[j + 2] = lerp(base[j + 2], kids[j + 2], kidsMix);
    }
    pgeo.attributes.position.needsUpdate = true;
    pgeo.attributes.color.needsUpdate = true;
    points.position.y = -state.scrollY * k * .15 % 10;

    camera.position.x = lerp(camera.position.x, (state.pointer.nx || 0) * .25, .04);
    camera.position.y = lerp(camera.position.y, -(state.pointer.ny || 0) * .18, .04);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
  return true;
}
