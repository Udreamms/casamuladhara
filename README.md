# Casa Muladhara · Sitio y Aula

Sitio web estático de Casa Muladhara con el aula virtual integrada.

- `index.html`: sitio principal. El botón **Mi cuenta** de la barra superior lleva a `aula.html`.
- `aula.html`: aula virtual de estudiantes (ingreso de demostración).
- `pendulo.html`, `sala.html`, `terapias.html`, `meditacion.html`: landing pages.
- `assets/`: imágenes, PDFs y video usados por el aula.

## Desplegar en Vercel

No necesita build. En Vercel: **Add New → Project → importar este repositorio**, Framework Preset **Other**, sin comando de build y con el directorio raíz `./`. Después se agrega el dominio `casamuladhara.com` en **Settings → Domains**.
