import { paginaReplay } from '@/lib/server/replay.js';

export const GET = (request) => paginaReplay(request, 'tarot');
