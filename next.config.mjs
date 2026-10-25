const PAGINAS = 'index|login|aula|admin|terapias|pendulo|meditacion|sala';

/** @type {import('next').NextConfig} */
export default {
  // Enlaces antiguos: /aula.html -> /aula (y /index.html -> /)
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: `/:pagina(${PAGINAS}).html`, destination: '/:pagina', permanent: true },
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
