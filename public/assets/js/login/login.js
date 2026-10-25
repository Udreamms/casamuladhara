import { auth } from '../firebase.js';
import { PREVIEW } from '../preview.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
  sendPasswordResetEmail, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const $ = (s) => document.querySelector(s);
const params = new URLSearchParams(location.search);
// Solo se permite volver a páginas internas conocidas (evita redirecciones abiertas)
const NEXT = ['/aula'].includes(params.get('next')) ? params.get('next') : '/aula';

let registering = false, busy = false, tt;

function say(msg, err) {
  const t = $('#toast'); t.textContent = msg; t.classList.toggle('err', !!err); t.hidden = false;
  clearTimeout(tt); tt = setTimeout(() => (t.hidden = true), 5000);
}
function words(el, text, delay0 = 0, step = .1) {
  el.textContent = '';
  text.split(' ').forEach((w, i) => {
    const s = document.createElement('span'); s.className = 'w'; s.textContent = w;
    s.style.animationDelay = (delay0 + i * step) + 's'; el.appendChild(s);
  });
}
function lines(arr) {
  const box = $('#titles'); box.textContent = '';
  arr.forEach((txt, li) => {
    const d = document.createElement('div'); d.className = 'words l' + li; box.appendChild(d);
    words(d, txt, .15 + li * .5, .08);
  });
}
function setMode(reg) {
  registering = reg;
  $('#sw-login').setAttribute('aria-pressed', !reg);
  $('#sw-register').setAttribute('aria-pressed', reg);
  $('#submit').textContent = reg ? 'Registrarse en Casa Muladhara' : 'Iniciar Sesión';
  $('#password').autocomplete = reg ? 'new-password' : 'current-password';
  $('#forgot').hidden = reg;
  lines(reg
    ? ['Tu camino comienza hoy en Casa Muladhara', 'Crea tu cuenta para comenzar']
    : ['¡Te damos la bienvenida de nuevo!', 'Inicia sesión con tu cuenta para continuar']);
}
function showForm(reg) {
  $('#screen-options').hidden = true; $('#screen-form').hidden = false; setMode(reg);
}
function showOptions() { $('#screen-form').hidden = true; $('#screen-options').hidden = false; }

words($('#hero-title'), 'Bienvenido a Casa Muladhara', .2, .1);
words($('#hero-sub'), 'Elige cómo deseas ingresar', 1, .1);

$('#opt-register').onclick = () => showForm(true);
$('#opt-login').onclick = () => showForm(false);
$('#sw-login').onclick = () => setMode(false);
$('#sw-register').onclick = () => setMode(true);
$('#back-opts').onclick = showOptions;

if (params.get('register') === 'true') showForm(true);
else if (params.get('mode') === 'login') showForm(false);
if (params.get('email')) $('#email').value = params.get('email');

const ERR = {
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/invalid-email': 'Escribe un correo válido.',
  'auth/user-not-found': 'No encontramos una cuenta con ese correo.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ese correo ya tiene una cuenta. Prueba iniciar sesión.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
  'auth/popup-closed-by-user': 'Cerraste la ventana de Google antes de terminar.',
  'auth/cancelled-popup-request': 'Cerraste la ventana de Google antes de terminar.',
  'auth/popup-blocked': 'Tu navegador bloqueó la ventana de Google. Permite las ventanas emergentes e inténtalo otra vez.',
  'auth/unauthorized-domain': 'Este dominio aún no está autorizado para iniciar sesión.',
  'auth/user-disabled': 'Esta cuenta está deshabilitada. Escríbenos para ayudarte.',
};
const msg = (e) => ERR[e.code] || 'No pudimos completar la acción. Inténtalo de nuevo.';
function lock(v) { busy = v; $('#submit').disabled = v; $('#google').disabled = v; }

let leaving = false;
function go() { if (!leaving) { leaving = true; location.replace(NEXT); } }

$('#auth-form').onsubmit = async (e) => {
  e.preventDefault(); if (busy) return;
  const email = $('#email').value.trim(), pass = $('#password').value;
  if (PREVIEW) return go(); // vista previa de la rama valentina: entra sin iniciar sesión
  if (!email || !pass) return say('Escribe tu correo y contraseña.', true);
  lock(true); $('#submit').textContent = 'Sincronizando...';
  try {
    registering ? await createUserWithEmailAndPassword(auth, email, pass) : await signInWithEmailAndPassword(auth, email, pass);
    go();
  } catch (err) { say(msg(err), true); }
  finally { lock(false); setMode(registering); }
};

$('#google').onclick = async () => {
  if (busy) return;
  if (PREVIEW) return go(); // vista previa de la rama valentina: entra sin iniciar sesión
  lock(true);
  // select_account: Google siempre pregunta con qué cuenta entrar (útil si el equipo tiene varias sesiones)
  const google = new GoogleAuthProvider(); google.setCustomParameters({ prompt: 'select_account' });
  try { await signInWithPopup(auth, google); go(); }
  catch (err) { say(msg(err), true); }
  finally { lock(false); }
};

$('#forgot').onclick = async () => {
  const email = $('#email').value.trim();
  if (!email) return say('Escribe tu correo arriba y vuelve a tocar “¿Olvidaste tu contraseña?”.', true);
  try { await sendPasswordResetEmail(auth, email); } catch (err) { if (err.code !== 'auth/user-not-found') return say(msg(err), true); }
  say('Si ese correo tiene una cuenta, te enviamos un enlace para crear una nueva contraseña.');
};

// Si ya hay una sesión abierta, entra directo al aula
onAuthStateChanged(auth, (u) => { if (u) go(); });
