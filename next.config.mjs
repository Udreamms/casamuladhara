const PAGINAS = 'index|login|aula|admin|terapias|clase-pendulo|formacion|meditacion|sala';

/** @type {import('next').NextConfig} */
export default {
  // Enlaces antiguos: /aula.html -> /aula (y /index.html -> /)
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: `/:pagina(${PAGINAS}).html`, destination: '/:pagina', permanent: true },
      // Péndulo Hebreo tiene una sola landing: la clase gratis. El curso de 70 USD lo vende Karen por WhatsApp.
      { source: '/pendulo', destination: '/clase-pendulo', permanent: false },
      { source: '/pendulo.html', destination: '/clase-pendulo', permanent: false },
    ];
  },
  async headers() {
    return [
      { source: '/assets/img/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      ...[1, 2, 3, 4, 5].map((n) => ({ source: `/assets/n${n}/:path*`, headers: [{ key: 'Cache-Control', value: 'private, max-age=604800' }] })),
      { source: '/curso/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-cache' }] },
    ];
  },
};
