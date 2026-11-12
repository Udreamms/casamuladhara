// Cada página del sitio vive en src/paginas/<nombre>.html con su propio HTML, estilos y scripts (el mismo diseño y el 3D de siempre).
// Next.js la sirve como ruta (/aula, /login, /staff…): el título, la descripción y el color del <head> pasan a metadata
// y todo lo demás se entrega tal cual. Los scripts corren al cargar la página porque los enlaces son <a> normales.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { WHATSAPP_NUMERO } from '@/lib/whatsapp.js';
import { reservaPendulo } from '@/lib/server/banderas.js';

const texto = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const metaDe = (html, name) => html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"`, 'i'))?.[1];

// Bloques que dependen de una bandera: <!--RESERVA-->…<!--/RESERVA--> se ve con la reserva encendida y <!--SINRESERVA-->…<!--/SINRESERVA--> con ella apagada
const bandera = (html) => {
  const [quita, deja] = reservaPendulo() ? ['SINRESERVA', 'RESERVA'] : ['RESERVA', 'SINRESERVA'];
  return html.split(`<!--${quita}-->`).map((t, i) => (i === 0 ? t : t.slice(t.indexOf(`<!--/${quita}-->`) + `<!--/${quita}-->`.length))).join('').replaceAll(`<!--${deja}-->`, '').replaceAll(`<!--/${deja}-->`, '');
};

function leer(nombre) {
  const html = readFileSync(join(process.cwd(), 'src', 'paginas', `${nombre}.html`), 'utf8');
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? '';
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  // El <html> lo pone el layout común: el data-theme de la página se aplica con un script que corre antes de sus estilos
  const theme = html.match(/<html[^>]*data-theme="([a-z]+)"/i)?.[1];
  const fijarTema = theme ? `<script>document.documentElement.dataset.theme=${JSON.stringify(theme)}</script>` : '';
  // charset, viewport, title y color-scheme los pone Next; el resto del <head> (fuentes, estilos, scripts) va antes del contenido
  const quitar = (s) => s.replace(/<meta[^>]*(charset|name="?(viewport|description|theme-color|robots|color-scheme)"?)[^>]*>/gi, '').replace(/<title>[\s\S]*?<\/title>/i, '');
  return {
    title: title && texto(title),
    description: metaDe(head, 'description'),
    themeColor: metaDe(head, 'theme-color'),
    colorScheme: metaDe(head, 'color-scheme'),
    robots: metaDe(head, 'robots'),
    // El número de WhatsApp sale de un solo lugar (lib/whatsapp.js): se cambia en los enlaces wa.me escritos en el HTML y se expone al script
    html: bandera(`<script>window.CM_WA_NUM=${JSON.stringify(WHATSAPP_NUMERO)}</script>` + (fijarTema + quitar(head) + quitar(body)).replaceAll('wa.me/56940044528', `wa.me/${WHATSAPP_NUMERO}`)),
  };
}

export function pagina(nombre) {
  const p = leer(nombre);
  return {
    metadata: { title: p.title, description: p.description, robots: p.robots },
    viewport: { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: p.themeColor, colorScheme: p.colorScheme },
    // display:contents: el contenedor no cambia el diseño, el contenido queda como hijo directo de <body>
    Pagina: () => <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: p.html }} />,
  };
}
