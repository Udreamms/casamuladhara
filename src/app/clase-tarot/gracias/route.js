import { paginaGracias } from '@/lib/server/gracias.js';

export const GET = (request) => paginaGracias(request, 'tarot');
