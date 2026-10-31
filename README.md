# Casa Muladhara · Sitio y Aula

Sitio en **Next.js** (Vercel) con aula virtual conectada a Firebase (proyecto `casamuladhara`).

```bash
npm install
npm run dev     # http://localhost:3000 (lee .env.local)
npm run build   # build de producción, el mismo que hace Vercel
```

```
src/
  app/                  rutas de Next.js (cada carpeta es una dirección)
    page.js             /            portada 3D
    login/ aula/        /login /aula
    staff/ admin/       /staff /admin  portal de la Maestra
    terapias/ clase-pendulo/ formacion/ meditacion/ sala/
    api/                rutas de API: admin, billing, stripe-webhook
    layout.js
  lib/
    pagina.js           entrega cada página de src/paginas en su ruta
    server/             código solo del servidor
      access.js         la regla única de quién abre qué nivel
      apply.js          aplica el acceso (rol en Firestore y claims del token)
      services.js       Firebase Admin y Stripe (leen las variables de entorno)
  paginas/*.html        HTML, estilos y scripts de cada página (el diseño y el 3D de siempre)
  proxy.js              bloquea en el servidor curso/nN.js y assets/nN/ según el nivel de cada alumna
public/                 archivos que se sirven tal cual
  assets/css/           estilos: aula/ (por secciones), login.css, staff.css, landing.css, casona.css
  assets/js/            scripts: aula/ (módulos del aula, en orden), login/, staff/, landing/,
                        firebase.js, cloud.js, admin.js, profile.js, casona.js y recorrido.js (3D)
  assets/img, assets/vendor, assets/n2…n5 (materiales por nivel)
  curso/n1.js … n5.js   contenido de las clases de cada nivel
firebase/               firestore.rules, storage.rules, firestore.indexes.json
scripts/                administración desde tu computador (alumnas, Maestra, reglas)
```

- Los enlaces antiguos con `.html` redirigen a la ruta nueva (`next.config.mjs`).
- La portada es una casona moderna en 3D que se recorre al bajar (`public/assets/js/casona.js`, `recorrido.js`, `public/assets/css/casona.css`). Three.js y Lenis van copiados en `public/assets/vendor/`. Sin WebGL o con "reducir movimiento" activado, la portada se ve como tarjetas estáticas.
- `/login`: ingreso / registro de alumnas (correo y contraseña, Google). `/aula` sin sesión redirige ahí.
- `/staff`: portal de la Maestra. Se entra con usuario y contraseña (`STAFF_USER` y `STAFF_PASSWORD`, sin correo) por `src/app/api/staff`.
- `public/assets/js/firebase.js`, `public/assets/js/cloud.js`: configuración y capa de datos del navegador (Auth + Firestore).
- Imports del servidor con el alias `@/` → `src/` (`jsconfig.json`).

## Formación y pagos (Stripe)
Una sola inscripción para la formación completa de cinco niveles: **9 cuotas de 55 USD** (Stripe deja de cobrar sola después de la novena) o **449 USD al contado**. Quien paga en cuotas puede pagar lo que le falta al contado cuando quiera.

- **Roles** (`users/{uid}.role`): `admin` (la Maestra), `student_free` (toda cuenta nueva: ve el programa y la comunidad, todo bloqueado), `student_subscribed` (paga en cuotas al día o ya pagó todo) y `student_permanent` (alumnas que pagaron niveles antes de la plataforma). Nadie elige su rol: lo ponen el webhook de Stripe o la Maestra, y las reglas de Firestore impiden cambiarlo desde el navegador.
- **Niveles abiertos** (claims `lvls` y `lvl` en el token): cada alumna tiene los suyos, no necesariamente en orden. Se suman los niveles que compró aparte (`ownedLevels`, alumnas antiguas, permanentes) y, si el programa está pagado o al día, los que la Maestra le desbloqueó (`unlockedLevels`). `blocked: true` la bloquea. Se cambian desde el portal de la Maestra (`/staff`). `src/proxy.js` y las reglas los exigen antes de servir el contenido de cada nivel.
- **Cuota atrasada**: se pausa lo que no tenía; conserva su acceso permanente y su avance. Cada pago queda en `users/{uid}/payments`.

### Tus alumnas actuales
```bash
node scripts/admin.mjs grant ana@correo.com 3      # compró solo el Nivel 3 (permanente, sin cobro)
node scripts/admin.mjs cuotas ana@correo.com 4     # si quiere seguir, paga solo 4 cuotas (o 220 USD al contado)
node scripts/admin.mjs enroll ana@correo.com --levels 1,2   # niveles del programa desbloqueados mientras paga
```
Para regalar la formación completa: `enroll correo --plan completo`.

### Puesta en marcha
1. En Stripe: un producto con un precio recurrente mensual de 55 USD y otro único de 449 USD; activa el portal de clientes (cambiar tarjeta y cancelar).
2. En Stripe → Webhooks: el endpoint `https://TU-DOMINIO/api/stripe-webhook` con `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid` e `invoice.payment_failed`.
3. En Vercel → Settings → Environment Variables, las del archivo `.env.local` de tu computador (no se sube a GitHub): `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_PRICE_FULL_ID`, `STRIPE_WEBHOOK_SECRET`, `FIREBASE_SERVICE_ACCOUNT`, `APP_URL`, `ADMIN_EMAILS`, `STAFF_USER` y `STAFF_PASSWORD` (usuario y contraseña de `/staff`).
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
node scripts/calendario-inicial.mjs # carga una vez las fechas iniciales del Calendario de la Maestra (no duplica)
node scripts/auth-domains.mjs mi-dominio.vercel.app   # autoriza un dominio para el login
```
