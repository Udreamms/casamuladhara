# Casa Muladhara · Sitio y Aula

Sitio estático (Vercel, sin build) con aula virtual conectada a Firebase (proyecto `casamuladhara`).

- `index.html`: sitio principal. "Mi cuenta" lleva al login real.
- `login.html`: ingreso / registro (correo y contraseña, Google).
- `aula.html`: aula virtual. Sin sesión redirige a `login.html`.
- `assets/js/firebase.js`, `assets/js/cloud.js`: configuración y capa de datos (Auth + Firestore).
- `firestore.rules`, `storage.rules`, `firestore.indexes.json`: seguridad e índices.

## Aislamiento de datos
Todo lo personal (perfil, avance, notas, preguntas, ayuda, pagos) vive bajo `users/{uid}`; las reglas solo dejan acceder a su dueña o a la Maestra (claim `admin`). Nivel, plan, pago y rol no se pueden cambiar desde el navegador. La comunidad es el único espacio compartido y solo expone nombre y lo publicado, nunca el correo.

## Administración (en tu computador)
Requiere la llave de servicio en `~/.config/casamuladhara/service-account.json` (fuera del repo).

```bash
cd scripts && npm install && cd ..
node scripts/admin.mjs make-admin tu@correo.com
node scripts/admin.mjs enroll alumna@correo.com --level 2 --plan mensual --pay ok
node scripts/admin.mjs list
node scripts/deploy-backend.mjs     # publica reglas (e índices, si la cuenta tiene permiso)
node scripts/test-rules.mjs         # prueba de aislamiento (crea y borra cuentas de prueba)
node scripts/auth-domains.mjs mi-dominio.vercel.app   # autoriza un dominio para el login
```
