// Botón de la barra de la portada: "Mi cuenta" sin sesión, "Ir al aula" si la persona ya entró (Firebase Auth).
// Sin script o mientras carga queda "Mi cuenta" -> /aula, que pide iniciar sesión si hace falta.
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const btn = document.getElementById('acct-btn');
const label = btn?.querySelector('.acct-label');
if (btn && label) {
  onAuthStateChanged(auth, (u) => {
    label.textContent = u ? 'Ir al aula' : 'Mi cuenta';
    btn.href = u ? '/aula' : '/login?mode=login';
    btn.setAttribute('aria-label', label.textContent);
  });
}
