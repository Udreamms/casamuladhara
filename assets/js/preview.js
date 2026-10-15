// Modo revisión: SOLO en la vista previa de la rama valentina (y en localhost) se entra al aula sin iniciar sesión,
// para poder seguir editándola. Se decide por el dominio, así que en el sitio real (rama main) nunca se activa.
// Todo lo que se haga aquí queda solo en esta pestaña: no se lee ni se escribe nada en Firebase.
export const PREVIEW = /^casamuladhara-git-valentina-/.test(location.hostname)
  || ['localhost', '127.0.0.1'].includes(location.hostname);

export function startPreview() {
  const now = () => ({ toDate: () => new Date(), toMillis: () => Date.now() });
  const name = 'Modo revisión';
  let n = 0;
  const id = () => 'demo' + ++n;
  const CM = {
    uid: 'preview', isAdmin: true, lvl: 5, paid: null, free: false, freeChannels: ['presentaciones', 'testimonios'],
    profile: { name, ini: 'MR', c: '#f2c66d', accessLevel: 5, plan: 'completo', paymentStatus: 'ok' },
    progress: {}, doneAt: {}, notes: {}, questions: {}, tickets: [], payments: [], notifications: [],
    posts: [], likes: new Set(), students: [], agenda: [], liveLinks: {}, config: {}, pending: [],
    onPosts: () => {},
    fdate: (ts) => (ts?.toDate ? ts.toDate().toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }) : ''),
    signOut: async () => location.replace('login.html?mode=login'),
    loadStudents: async () => [], loadQuestions: async () => [],
    setDone: async (key, done) => { if (done) { CM.progress[key] = true; CM.doneAt[key] = now(); } else { delete CM.progress[key]; delete CM.doneAt[key]; } },
    saveNote: async (key, text) => { if (text.trim()) CM.notes[key] = text; else delete CM.notes[key]; },
    ask: async (key, text) => { (CM.questions[key] ||= []).push({ id: id(), lessonKey: key, text, answered: false }); },
    ticket: async (topic, message) => { CM.tickets.unshift({ id: id(), topic, message, status: 'open' }); },
    post: async (ch, text) => { CM.posts.unshift({ id: id(), ch, who: name, ini: 'MR', c: '#f2c66d', karen: true, when: 'Ahora', txt: text, likes: 0, liked: false, replies: [], mine: true }); CM.onPosts(); },
    reply: async (postId, text) => { const p = CM.posts.find((x) => x.id === postId); if (p) p.replies.push({ who: name, ini: 'MR', c: '#f2c66d', karen: true, txt: text, id: id(), mine: true }); CM.onPosts(); },
    toggleLike: async (postId) => { const p = CM.posts.find((x) => x.id === postId); if (p) { p.liked = !p.liked; p.likes += p.liked ? 1 : -1; } CM.onPosts(); },
    deletePost: async (postId) => { CM.posts = CM.posts.filter((x) => x.id !== postId); CM.onPosts(); },
    saveLive: async (key, { level, title, start, durationMin, url, recordingUrl }) => {
      const ts = { toDate: () => start, toMillis: () => start.getTime() };
      CM.agenda = CM.agenda.filter((a) => a.id !== key).concat({ id: key, level, title, start: ts, durationMin });
      CM.liveLinks[key] = { level, url, recordingUrl };
    },
    deleteLive: async (key) => { CM.agenda = CM.agenda.filter((a) => a.id !== key); delete CM.liveLinks[key]; },
    saveConfig: async (data) => { Object.assign(CM.config, data); },
    answer: async (q, reply) => { q.reply = reply; q.answered = true; CM.pending = CM.pending.filter((x) => x.id !== q.id); },
    billing: async () => { throw new Error('Los pagos están desactivados en el modo revisión.'); },
  };
  window.CM = CM;
  window.cmStart(CM);
}
