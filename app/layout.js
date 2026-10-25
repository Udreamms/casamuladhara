// Estructura común: cada página trae sus propios estilos y scripts (ver lib/pagina.js).
// suppressHydrationWarning: los scripts de las páginas cambian clases y estilos de <html> y <body> al cargar.
export default function Layout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
