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

## Meta: Píxel y API de conversiones
El Píxel (navegador) está en `public/assets/js/landing/captacion.js`. La API de conversiones (servidor) está en `src/lib/server/meta.js` y envía los mismos eventos con el mismo `event_id`, para que Meta los cuente una sola vez:
- **Lead:** formularios de las landings (`/api/leads`).
- **Schedule:** reserva de una terapia (`/api/terapias`).
- **Purchase:** pago al contado de la formación o primera cuota (`/api/stripe-webhook`). Las cuotas siguientes no se envían.

Correo, teléfono y nombre viajan cifrados (SHA-256). Variables en Vercel (y `.env.local`), nunca en el código:
- `META_CAPI_TOKEN`: token del conjunto de datos (Administrador de eventos → Configuración → Generar token). Sin él no se envía nada y el sitio funciona igual.
- `META_TEST_EVENT_CODE` (opcional): código de "Probar eventos". Con él, los eventos solo aparecen en esa pestaña y no cuentan en los anuncios. Se quita al terminar de probar.
- `META_PIXEL_ID` y `META_GRAPH_VERSION` (opcionales): por defecto, el Píxel Casa Muladhara y la versión `v23.0`.

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
node scripts/calendario-horarios.mjs # revisa los horarios de clases gratis, cursos, Tarot y formación (hora de Chile) y los choques; con --aplicar respalda el calendario, reemplaza lo de la carga inicial y carga las fechas
node scripts/auth-domains.mjs mi-dominio.vercel.app   # autoriza un dominio para el login
```

## WhatsApp Business en el portal (chat con las interesadas)
En **Interesadas**, el número de WhatsApp de cada persona abre una conversación dentro del portal (menú **WhatsApp**), con el número de Karen (+56 9 4004 4528) y no con el WhatsApp del computador. Usa la API oficial de Meta (Cloud API): `src/app/api/whatsapp` recibe y envía, `src/lib/server/whatsapp.js` habla con Meta y las conversaciones quedan en `wa_chats/{número}` (solo la Maestra las lee, ver `firebase/firestore.rules`).

Puesta en marcha (una sola vez):
1. En [developers.facebook.com](https://developers.facebook.com) crea una app tipo *Business* con el producto **WhatsApp**, dentro del Business Manager de Casa Muladhara.
2. Agrega el número **+56 9 4004 4528**. Para seguir usando la app de WhatsApp Business en el teléfono a la vez, elige el modo **coexistencia** (conectar una cuenta existente de la app WhatsApp Business). Sin coexistencia, el número deja de funcionar en la app.
3. En Vercel agrega: `WHATSAPP_TOKEN` (token permanente de un usuario del sistema con permiso `whatsapp_business_messaging`), `WHATSAPP_PHONE_ID` (identificador del número), `WHATSAPP_APP_SECRET` (clave secreta de la app) y `WHATSAPP_VERIFY_TOKEN` (una frase que inventes).
4. En WhatsApp → Configuración → Webhook: URL `https://TU-DOMINIO/api/whatsapp`, el mismo `WHATSAPP_VERIFY_TOKEN`, y suscribe `messages` (y `smb_message_echoes` si usas coexistencia).
5. Publica las reglas: `firebase deploy --only firestore:rules`.

Reglas de WhatsApp: solo se puede escribir con texto libre dentro de las 24 h desde el último mensaje de la persona. Para empezar la conversación se envía una **plantilla aprobada** (por defecto `hello_world`; crea una propia en español en el administrador de WhatsApp y configura `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANG` y, si lleva `{{1}}` con el nombre, `WHATSAPP_TEMPLATE_VARS=1`). Las imágenes y audios que lleguen se ven como aviso en el portal; se abren en la app de WhatsApp.

## Embudo de las clases gratis (Péndulo, Tarot, Formación) y contrato con la landing
Cada persona que se inscribe a una clase recibe un **código personal** (12 caracteres al azar, revocable, vence 60 días después del cierre de la oferta) y sus enlaces. El CRM mide quién entró, quién asistió y quién compró. Código en `src/lib/server/embudo.js`.

**Variables en Vercel:** `CRM_API_KEY` (clave secreta entre el sitio y el CRM; invéntala larga y aleatoria) y `APP_URL` (dirección pública del sitio, con `https://`, sin `/` al final; sin ella no se crean los enlaces personales).

### API (clave secreta: `Authorization: Bearer <CRM_API_KEY>`)
`GET /contacto/validar?codigo=XXXXXXXXXXXX`
→ `{ "valido": true, "primer_nombre": "Ana", "estado": "registrada", "clase": "pendulo", "sala_url": "https://meet.google.com/..." }`
→ `{ "valido": false }` si el código no existe, fue revocado o venció. Sin clave: 401 (503 si el servidor no tiene `CRM_API_KEY`).

`POST /eventos` con `{ "codigo": "...", "evento": "...", "fecha_iso": "2026-11-07T19:03:00-03:00", "origen": "whatsapp", "extra": {} }`
→ `{ "ok": true, "ignorado": false, "estado": "entro", "sesion_id": "<id de la clase del Calendario>", "cuenta": true, "clase_id": "<clase a la que está inscrita ahora>", "clase_fecha": "2026-11-14" }`. El mismo evento del mismo contacto en menos de 60 segundos responde `{ "ok": true, "ignorado": true }`. Código inválido: 404 `{ "ok": false, "error": "codigo_invalido" }`; evento desconocido: 400 `evento_invalido`.

| evento | efecto |
|---|---|
| `clic_entrar` | "Entró" solo si ocurre entre 10 minutos antes y 30 después del inicio de la clase (del Calendario); fuera de ese rango se anota pero no cuenta |
| `codigo_asistencia_ok` | "Asistió confirmado" |
| `autodeclara_asistio` | asistencia **autodeclarada: sí** (no cambia la etapa; si figuraba "No asistió" pasa a "No identificada") |
| `autodeclara_no_asistio` | asistencia autodeclarada: no (etapa "No asistió" si no tenía otra) |
| `vio_replay` | "Vio el replay" (no baja a quien ya asistió) |
| `clic_comprar` | "Vio la oferta" + seguimiento para hoy en el CRM (tarea para Karen) |
| `pago_confirmado` (`extra: { monto, moneda }`) | "Matriculada", sale de las secuencias de venta, se borra la tarea y queda inscrita en el curso |
| `pago_fallido` (`extra: { monto, moneda }`) | **No cambia la etapa** (sigue Matriculada). Deja el aviso «Cobro fallido: escribirle hoy» y una tarea para hoy; el siguiente `pago_confirmado` lo quita |
| `lista_espera` | Etapa «Lista de espera» (curso lleno), salvo que ya tenga cupo reservado o pagado |

**La asistencia es POR CLASE.** Una persona puede inscribirse a varias clases del mismo programa (la del 7, la del 14…) con la misma tarjeta y el mismo código. La asistencia se guarda en `asistencia.sesiones[<id de la clase>]` y los campos sueltos (`asistencia.entro`, `confirmada`…) reflejan solo la clase a la que está inscrita ahora (`claseEvento` / `claseFecha`). `clic_entrar` y `codigo_asistencia_ok` aceptan `sesion_id` (id de la clase en el Calendario); sin él se toma la clase en curso a esa hora. Respuesta: `sesion_id` = clase en cuya ventana cayó el evento (`null` si ninguna), `clase_id` / `clase_fecha` = clase a la que está inscrita ahora, `cuenta` = si el evento cuenta para esa clase de ahora (un clic en la ventana de la clase del 7 no cuenta para quien ya está inscrita a la del 14).
Al inscribirse de nuevo (`api/leads`, registro repetido) a **otra** clase: la tarjeta es la misma; la asistencia de la clase anterior queda guardada con esa clase; la etapa vuelve a «Registrada» (se conservan Matriculada, Inscrita, Reservó cupo y En conversación); el historial suma «Se inscribió de nuevo para el {día fecha}» y `clases` conserva la lista de clases. «Preparar contactos» asigna a su clase la asistencia que ya estaba guardada (las del 7 de noviembre).

Cada `pago_confirmado` queda en el historial de pagos (`pagos`): así el CRM muestra «Cuotas pagadas 1/2 · 2/2» del Tarot. **Hay que enviar el evento en cada cuota pagada**, no solo en la primera.

Estados (`estado`): `registrada, confirmada, entro, asistio_confirmado, vio_oferta, matriculada` y las alternativas `no_asistio, no_identificada, vio_replay, sin_respuesta, lista_espera`. Una etapa solo avanza con los eventos, nunca retrocede. Los tres niveles de asistencia (Entró, Autodeclarada, Asistió confirmado) se guardan por separado y no se mezclan.

### Páginas del sitio (las usa la landing y los mensajes)
- `/entrar/<codigo>`: anota `clic_entrar` y lleva a la sala de la clase (el enlace de Google Meet de Ajustes).
- `/confirmar?l=<codigo>&r=si|no`: botones «Sí estuve» / «No pude entrar» (asistencia autodeclarada).
- `/asistencia?l=<codigo>`: la persona escribe la palabra de la clase. La palabra se define en el Calendario, dentro de cada clase gratis; vale de 10 minutos antes a 30 después; máximo 8 intentos.
- `/clase-pendulo/replay?l=<codigo>` y `/clase-tarot/replay?l=<codigo>`: anotan `vio_replay`, muestran el video (enlace de Ajustes) y la oferta con su fecha límite.
- `/comprar?l=<codigo>`: anota `clic_comprar` y lleva a la página del curso.

### Registro (`POST /api/leads`, `action: "save"`)
Además de lo de siempre acepta `edad` y `consentimiento: { email: { aceptado, fecha, texto, origen }, whatsapp: { ... } }`, y devuelve el `codigo` de la persona. La clave de unicidad es el correo y el WhatsApp (en dígitos con código de país): si ya existe, se actualiza y no se duplica; un correo distinto no pisa al anterior (queda como correo adicional).

### Herramientas en el portal (Interesadas)
**Preparar contactos** (crea código y enlaces a los registros de antes), **Clasificar una clase** (pega la lista de Meet: ve cómo quedaría y luego aplica) y **Envíos** (textos con variables `{{nombre}} {{enlace_entrada}} {{enlace_replay}} {{enlace_si}} {{enlace_no}} {{enlace_asistencia}} {{fecha_limite}}`, envío persona por persona y exportación para correo masivo).

### Alcance congelado (qué está activo y qué está oculto)
Mientras el alcance está congelado, estas funciones están **ocultas con una bandera apagada** (el código no se borró; para volver a mostrarlas se pone la bandera en `true`):
- Portal: `FUNC` en `public/assets/js/admin.js` → `fichaCompleta` (ficha estilo GoHighLevel; mientras está apagada se usa `leadFichaSimple`), `etiquetas`, `tareas` (seguimientos), `metricas`, `deshacer`, `reserva`, `cuotas`, `listaEspera`.
- Servidor: `FUNCIONES` en `src/lib/server/embudo.js` → `reserva` (`/api/embudo` responde 409) y `listaEspera` (el evento `lista_espera` se ignora y `/api/clases/estado` responde sin cupos ni lista de espera). Deben coincidir con las del portal.
- Asistencia: los grupos de Envíos se basan en el **clic** en `/entrar/<codigo>` dentro de la ventana de la clase (10 min antes a 30 después): **Entró** (o marcada con «Clasificar una clase») y **No entró** (inscrita a esa clase y sin clic; solo se calcula cuando la ventana terminó). La autodeclaración y la palabra de asistencia están ocultas con `FUNC.autodeclaracion` y `FUNC.palabraAsistencia` (el código sigue). En «Clases y ofertas» se cargan los Meet reales de cada clase (no se muestran a las alumnas).
- Lo que queda **activo**: código personal por contacto, registro simple (entró, asistió confirmado, autodeclarada, vio replay, clic en comprar, matriculada), Envíos (plantillas, envío por persona, exportar), «Preparar contactos», «Clasificar una clase», `/contacto/validar`, `/eventos`, sin duplicados por correo y WhatsApp.
- Reglas de envío: máximo 1 mensaje por canal por persona al día (el portal bloquea), nada entre 22:00 y 8:00 (Chile), y quien responde «no» (o «stop», «baja»…) queda con `noContactar` (lo marca el webhook de WhatsApp; también el botón «Pidió parar» o la etiqueta «No contactar») y sale de todos los envíos.
- Los datos que ya se guardan (pagos, reserva, cupos configurados, etiquetas) **no se pierden** al ocultar: «Clases y ofertas» conserva lo guardado aunque sus campos estén ocultos.

### Cupos, reserva del Péndulo y configuración por clase
- **`GET /api/clases/estado?clase=pendulo|tarot`** (público, sin datos personales) → `{ "cupos_disponibles": 12, "lista_espera": false }`. `cupos_disponibles` es `null` si el curso no tiene límite; `lista_espera` es `true` cuando los cupos se llenaron y la lista de espera está activada. Lo leen las landings.
- **`POST /api/embudo`** (sesión de la Maestra): `reserva` (Péndulo, $10.000 por WhatsApp: etapa «Reservó cupo», monto, fecha y saldo; con cupos llenos responde 409) y `saldo` (marca el saldo pagado y matricula).
- **Clases y ofertas** (menú del portal): por clase, nombre, día y hora de la clase gratis, sala, replay, inicio, cierre (fecha y hora de Chile), precio, reserva o cuotas, cupos, lista de espera, palabra de asistencia con su ventana y texto de la oferta. Se guarda en `config/clases.ofertas`; lo vacío usa los valores de `OFERTAS` en `src/lib/server/embudo.js`. `configClases()` aplica los cambios a `OFERTAS` en cada petición, así las páginas del sitio los ven sin cambiar código.

## Clases gratis dentro del aula
Cualquier cuenta del aula, aunque no haya pagado (`CM.free`), ve la sección **Clases gratis** con dos grupos: Péndulo Hebreo y Tarot Terapéutico. El resto del aula sigue cerrado para quien no pagó (nada de esa sección abre niveles).
- **Dónde se cargan:** portal `/staff` → «Clases gratis del aula» (título, enlace del video —YouTube, Vimeo o Drive—, orden y «Gratis»; sin «Gratis» la clase queda oculta). Se guardan en `config/clasesGratis.clases`; las reglas de Firestore ya dejan leer `config/*` a cualquier cuenta con sesión, así que **no hay que cambiar reglas**.
- **URL de registro** (para el botón de la página del replay): `/login?register=true&origen=clase-gratis&ver=gratis`. Opcionales: `&l=<codigo personal>` (une la cuenta con esa persona aunque use otro correo) y `&email=<correo>` (lo deja escrito). Al terminar el registro entra directo a la sección.
- **URL de la sección** (quien ya tiene cuenta): `/aula?ver=gratis` (si no tiene sesión pasa por el login y vuelve).
- **Cuenta gratis:** correo y contraseña, o Google (lo que ya existía). Al crearse el perfil por primera vez, el aula llama a `POST /api/aula/cuenta` (con su sesión; manda el `origen` y el `l` que traía el enlace). Evento que queda: **`cuenta_gratis_creada`** en el historial de la persona y el campo `cuentaAula { t, origen, uid }`. Si la persona ya estaba en el CRM (mismo correo o mismo código) se marcan sus registros sin cambiar su etapa; si no, se crea un registro nuevo del programa «Cuenta gratis del aula» con `origen`. Repetir la llamada no duplica.

### Seguimiento de reservas (Péndulo y Tarot) en Interesadas
La landing guarda en el lead `reserva = { monto, moneda, estado, t, pagadaT?, stripeSession?, marcadaPor? }` (Péndulo 10.000 CLP, Tarot 10 USD; `estado`: `iniciada`, `sin_pago` o `pagada`). La **etapa no cambia**. Las banderas `FUNC.reserva` (portal) y `FUNCIONES.reserva` (servidor) van **siempre juntas** y hoy están encendidas.
- **Etiquetas** (lista, tabla y ficha): `iniciada` / `sin_pago` → «Reserva iniciada, sin pago»; `pagada` → «Reservó · $10.000 CLP» / «Reservó · 10 USD». Si no está pagada no se muestra «Reservó».
- **Filtro «Reserva»** en Interesadas: sin etiqueta / Reserva iniciada, sin pago / Reservó (igual para Péndulo y Tarot; dentro de un programa mira solo esa línea).
- **Ficha:** «Marcar reserva pagada» y «Deshacer reserva» (`POST /api/embudo`, `action: 'reserva'`): ponen `reserva.estado` y dejan en `eventos` quién (`por`) y cuándo (`t`). Casilla «Saldo pagado» (`action: 'saldo'`): queda matriculada (en una clase gratis `matriculada`; en la tarjeta del curso `inscrita`, la etapa equivalente de ese programa) y su curso inscrito. No se crean etapas nuevas; «Reservó cupo» ya no se ofrece como etapa (lo antiguo se ve como «Vio la oferta»).
- **Aviso y lista «Reservaron y no han pagado el saldo»:** reserva `pagada` sin saldo pagado. Plazo = inicio del curso (Péndulo mié 18 nov 19:00 Chile; Tarot jue 26 nov 19:00 Chile). Saldos: Péndulo 59.900 CLP; Tarot 60 USD (1.ª cuota) y 70 USD el segundo mes. El cobro lo envía Karen por WhatsApp con su link: el portal no envía ni guarda links de pago ni los muestra a las alumnas.
- Las reservas del Péndulo anotadas antes con `reservaPagada` / `reservaMonto` / `reservaFecha` se siguen leyendo; lo nuevo se guarda solo en `lead.reserva`.
- **Envíos — grupos de reserva** (solo con `FUNC.reserva`): «Reserva iniciada, sin pago», «Reservó: enviar el saldo» y «Reservó: recordatorio del saldo», por curso, con las plantillas 1A/1B, 2A/2B y 3A/3B como texto de ejemplo (editable y guardable como cualquier otro). Los textos usan variables que salen de «Clases y ofertas» (inicio, precio, reserva): `{{curso}}`, `{{fecha_inicio}}` (día completo), `{{hora_inicio}}` (19:00 Chile, fija en el código: `HORA_INICIO_CURSO`), `{{reserva}}`, `{{saldo}}` (precio − reserva; Tarot = 1.ª cuota) y `{{segunda_cuota}}` (Tarot), así que para el siguiente grupo basta cambiar «Inicio del curso» y el precio. Aplican las mismas reglas de envío (1 mensaje por canal al día, nada entre 22:00 y 8:00, quien responde «no» o «baja» sale). Donde dice `[LINK DEL SALDO]` Karen pega el link al enviar: el portal no lo guarda ni lo envía, y avisa antes de abrir WhatsApp o el correo.
- **Reservas desde el replay:** la landing también guarda `lead.reserva` en fichas de clase gratis (`clase-pendulo` / `clase-tarot`). Etiqueta, filtro, saldo y Envíos leen `reserva.estado` sin importar el formulario; la etiqueta convive con la etapa (no la cambia). Quien tiene reserva (aunque solo esté iniciada) sale de «clic sin pago». Si una persona tiene reserva en la ficha de clase gratis y en la del curso, se muestra una sola (la más avanzada) y una sola fila en la lista de saldos y en Envíos.
