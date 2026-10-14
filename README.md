# Casa Muladhara · Sitio y Aula

Sitio estático (Vercel, sin build) con aula virtual conectada a Firebase (proyecto `casamuladhara`).

- `index.html`: sitio principal. "Mi cuenta" lleva al login real.
- `login.html`: ingreso / registro (correo y contraseña, Google).
- `aula.html`: aula virtual. Sin sesión redirige a `login.html`.
- `assets/js/firebase.js`, `assets/js/cloud.js`: configuración y capa de datos (Auth + Firestore).
- `curso/clases.js`: contenido de las clases. Solo se sirve con suscripción activa (ver abajo).
- `api/billing.js`, `api/stripe-webhook.js`: suscripción con Stripe (funciones de Vercel).
- `middleware.js`: bloquea en el servidor `curso/` y los materiales de `assets/n2`, `assets/n3`.
- `firestore.rules`, `storage.rules`, `firestore.indexes.json`: seguridad e índices.

## Suscripción (Stripe, 55 USD al mes)
- Toda cuenta nueva es **gratis**: entra al aula, ve el programa, la comunidad y su perfil, pero las clases, videos y materiales están bloqueados con un botón "Suscribirme".
- El botón abre Stripe Checkout (`/api/billing`). Si ya tiene suscripción, abre el portal de Stripe para cambiar tarjeta, pagar una cuota pendiente o cancelar.
- Stripe avisa a `/api/stripe-webhook`, que deja la cuenta en `plan: mensual` + `paymentStatus: ok` y le da el claim `member` (abre las clases). Si un cobro falla queda `overdue` (acceso pausado, conserva su avance); si cancela vuelve a `none`. Cada factura queda en `users/{uid}/payments`.
- El contenido no viaja al navegador sin acceso: `middleware.js` revisa el token de Firebase (cookie `cm_session`) y exige `member` o `admin` antes de servir `curso/` y `assets/n2`, `assets/n3`.
- Dentro de la suscripción, los niveles se siguen abriendo con `accessLevel` (lo sube la Maestra).
- Al activar esto, corre una vez `node scripts/admin.mjs sync-members` para que las alumnas que ya tienen plan al día no pierdan el acceso.
- Regalar acceso sin pago: `node scripts/admin.mjs enroll correo --plan mensual --pay ok` (o `--plan completo`). Quitarlo: `--plan none --pay none`.

Variables de entorno en Vercel: ver `.env.example` (`STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, `FIREBASE_SERVICE_ACCOUNT`).
Eventos del webhook en Stripe: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`.

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
