# Casa Muladhara · Sitio y Aula

Sitio estático (Vercel, sin build) con aula virtual conectada a Firebase (proyecto `casamuladhara`).

- `index.html`: sitio principal. "Mi cuenta" lleva al login real.
- `assets/js/experiencia.js`, `assets/js/cosmos.js`, `assets/css/experiencia.css`: la portada en movimiento (péndulo 3D con Three.js, recorrido con scroll, portal de la Escuela, galería giratoria). Three.js y Lenis van copiados en `assets/vendor/`. Con "reducir movimiento" activado en el equipo, la portada se ve estática.
- `login.html`: ingreso / registro (correo y contraseña, Google).
- `aula.html`: aula virtual. Sin sesión redirige a `login.html`.
- `assets/js/firebase.js`, `assets/js/cloud.js`: configuración y capa de datos (Auth + Firestore).
- `curso/n1.js`, `curso/n2.js`, `curso/n3.js`: contenido de las clases de cada nivel. Solo se sirven a quien tiene ese nivel abierto.
- `api/billing.js`, `api/stripe-webhook.js`: pagos con Stripe (funciones de Vercel).
- `api/_lib/access.js`: la regla única de quién abre qué nivel.
- `middleware.js`: bloquea en el servidor `curso/nN.js` y `assets/nN/` según el nivel de cada alumna.
- `firestore.rules`, `storage.rules`, `firestore.indexes.json`: seguridad e índices.

## Formación y pagos (Stripe)
Una sola inscripción para la formación completa de cinco niveles: **9 cuotas de 55 USD** (Stripe deja de cobrar sola después de la novena) o **499 USD al contado**. Quien paga en cuotas puede pagar lo que le falta al contado cuando quiera.

- **Roles** (`users/{uid}.role`): `admin` (la Maestra), `student_free` (toda cuenta nueva: ve el programa y la comunidad, todo bloqueado), `student_subscribed` (paga en cuotas al día o ya pagó todo) y `student_permanent` (alumnas que pagaron niveles antes de la plataforma). Nadie elige su rol: lo ponen el webhook de Stripe o la Maestra, y las reglas de Firestore impiden cambiarlo desde el navegador.
- **Niveles abiertos** (claims `lvls` y `lvl` en el token): cada alumna tiene los suyos, no necesariamente en orden. Se suman los niveles que compró aparte (`ownedLevels`, alumnas antiguas, permanentes) y, si el programa está pagado o al día, los que la Maestra le desbloqueó (`unlockedLevels`). `blocked: true` la bloquea. Se cambian desde el portal de la Maestra (`admin.html`). `middleware.js` y las reglas los exigen antes de servir el contenido de cada nivel.
- **Cuota atrasada**: se pausa lo que no tenía; conserva su acceso permanente y su avance. Cada pago queda en `users/{uid}/payments`.

### Tus alumnas actuales
```bash
node scripts/admin.mjs grant ana@correo.com 3      # compró solo el Nivel 3 (permanente, sin cobro)
node scripts/admin.mjs cuotas ana@correo.com 4     # si quiere seguir, paga solo 4 cuotas (o 220 USD al contado)
node scripts/admin.mjs enroll ana@correo.com --levels 1,2   # niveles del programa desbloqueados mientras paga
```
Para regalar la formación completa: `enroll correo --plan completo`.

### Puesta en marcha
1. En Stripe: un producto con un precio recurrente mensual de 55 USD y otro único de 499 USD; activa el portal de clientes (cambiar tarjeta y cancelar).
2. En Stripe → Webhooks: el endpoint `https://TU-DOMINIO/api/stripe-webhook` con `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid` e `invoice.payment_failed`.
3. En Vercel → Settings → Environment Variables, las del archivo `.env.local` de tu computador (no se sube a GitHub): `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_PRICE_FULL_ID`, `STRIPE_WEBHOOK_SECRET`, `FIREBASE_SERVICE_ACCOUNT`, `APP_URL` y `ADMIN_EMAILS`.
4. Después de publicar: `node scripts/deploy-backend.mjs` (reglas), el `grant` de cada alumna actual y una vez `node scripts/admin.mjs sync-members`.

## Administración (en tu computador)
Requiere la llave de servicio en `~/.config/casamuladhara/service-account.json` (fuera del repo).

```bash
cd scripts && npm install && cd ..
node scripts/admin.mjs create-admin holamaestrakaren@gmail.com 'CONTRASEÑA'   # crea la cuenta de la Maestra (o cambia su contraseña)
node scripts/admin.mjs remove-admin correo-anterior@gmail.com                # le quita el rol de Maestra
node scripts/admin.mjs make-admin tu@correo.com
node scripts/admin.mjs enroll alumna@correo.com --levels 1,2 --plan mensual --pay ok
node scripts/admin.mjs list
node scripts/deploy-backend.mjs     # publica reglas (e índices, si la cuenta tiene permiso)
node scripts/test-rules.mjs         # prueba de aislamiento (crea y borra cuentas de prueba)
node scripts/auth-domains.mjs mi-dominio.vercel.app   # autoriza un dominio para el login
```
