// Inicialización de Firebase (proyecto casamuladhara).
// Estos valores son públicos por diseño: la seguridad real está en firestore.rules / storage.rules.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

export const firebaseConfig = {
  apiKey: 'AIzaSyDG8ariC_HJCIXUamYcXuLsKvZnlmGxl3A',
  authDomain: 'casamuladhara.firebaseapp.com',
  projectId: 'casamuladhara',
  storageBucket: 'casamuladhara.firebasestorage.app',
  messagingSenderId: '883626891006',
  appId: '1:883626891006:web:c78ebdf35f264693e037af',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// La base de datos del proyecto se llama "casamuladhara" (no "(default)")
export const db = getFirestore(app, 'casamuladhara');
