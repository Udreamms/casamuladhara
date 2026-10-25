// Cada página del sitio vive en paginas/<nombre>.html con su propio HTML, estilos y scripts (el mismo diseño y el 3D de siempre).
// Next.js la sirve como ruta (/aula, /login, /staff…): el título, la descripción y el color del <head> pasan a metadata
// y todo lo demás se entrega tal cual. Los scripts corren al cargar la página porque los enlaces son <a> normales.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const texto = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const metaDe = (html, name) => html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"`, 'i'))?.[1];

function leer(nombre) {
  const html = readFileSync(join(process.cwd(), 'paginas', `${nombre}.html`), 'utf8');
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? '';
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  // charset, viewport y title los pone Next; el resto del <head> (fuentes, estilos, scripts) va antes del contenido
  const quitar = (s) => s.replace(/<meta[^>]*(charset|name="?(viewport|description|theme-color|robots)"?)[^>]*>/gi, '').replace(/<title>[\s\S]*?<\/title>/i, '');
  return {
    title: title && texto(title),
    description: metaDe(head, 'description'),
    themeColor: metaDe(head, 'theme-color'),
    robots: metaDe(head, 'robots'),
    html: quitar(head) + quitar(body),
  };
}

export function pagina(nombre) {
  const p = leer(nombre);
  return {
    metadata: { title: p.title, description: p.description, robots: p.robots },
    viewport: { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: p.themeColor },
    // display:contents: el contenedor no cambia el diseño, el contenido queda como hijo directo de <body>
    Pagina: () => <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: p.html }} />,
  };
}
