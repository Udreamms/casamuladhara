// Base de datos falsa para las pruebas de la secuencia (se carga como texto y se ejecuta con new Function; no es un módulo).
// ---- Firestore falso
const tablas = new Map(); let seq = 0;
const clon = (x) => JSON.parse(JSON.stringify(x));
const aplicar = (dato, cambios) => {
  for (const [k, v] of Object.entries(cambios)) {
    const partes = k.split('.'); let o = dato;
    partes.slice(0, -1).forEach((p) => { o = o[p] ??= {}; });
    const u = partes.at(-1);
    if (v && v.__union) { o[u] = o[u] || []; v.__union.forEach((x) => { if (!o[u].some((y) => JSON.stringify(y) === JSON.stringify(x))) o[u].push(x); }); }
    else if (v && v.__del) delete o[u];
    else if (v && v.__inc) o[u] = (o[u] || 0) + v.__inc;
    else o[u] = v;
  }
};
const docRef = (r) => ({ id: r.split('/').pop(), path: r,
  async get() { return { exists: tablas.has(r), id: r.split('/').pop(), data: () => (tablas.has(r) ? clon(tablas.get(r)) : undefined), ref: docRef(r) }; },
  async update(c) { if (!tablas.has(r)) { const e = new Error('NOT_FOUND'); e.code = 5; throw e; } aplicar(tablas.get(r), c); },
  async set(d) { tablas.set(r, clon(d)); } });
const consulta = (col, filtros = []) => ({ where(f, op, v) { return consulta(col, [...filtros, [f, v]]); }, limit() { return this; }, orderBy() { return this; },
  async get() { const docs = [...tablas.entries()].filter(([r, d]) => r.startsWith(col + '/') && filtros.every(([f, v]) => d[f] === v)).map(([r, d]) => ({ id: r.split('/').pop(), ref: docRef(r), data: () => clon(d) })); return { empty: !docs.length, docs, size: docs.length }; } });
const db = () => ({
  collection: (c) => ({ ...consulta(c), doc: (id = `auto${++seq}`) => docRef(`${c}/${id}`), async add(d) { const id = `auto${++seq}`; tablas.set(`${c}/${id}`, clon(d)); return docRef(`${c}/${id}`); } }),
  doc: (r) => docRef(r),
  batch() { const ops = []; return { update: (ref, c) => ops.push(() => ref.update(c)), delete: (ref) => ops.push(() => tablas.delete(ref.path)), async commit() { for (const o of ops) await o(); } }; },
  async runTransaction(fn) { return fn({ get: (ref) => ref.get(), update: (ref, c) => aplicar(tablas.get(ref.path), c), set: (ref, d) => tablas.set(ref.path, clon(d)) }); },
});
const FieldValue = { arrayUnion: (...a) => ({ __union: a }), serverTimestamp: () => 'TS', increment: (n) => ({ __inc: n }), arrayRemove: () => ({}), delete: () => ({ __del: true }) };
