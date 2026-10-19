// Edición de perfil (nombre, datos y foto). Lo usan el aula y el portal de la Maestra.
// La foto de Google se usa por defecto; se puede cambiar por una propia, quitar o volver a la de Google.
// Las fotos propias viven en Storage (users/{uid}/…) y se guardan recortadas y livianas.
import { auth, db, storage } from './firebase.js';
import { doc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js';

export const LIMITS = { name: 120, phone: 40, country: 60, bio: 500 };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const initials = (n) => String(n || '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'A';

// Foto de la cuenta de Google (si entró con Google)
export const googlePhoto = () => auth.currentUser?.providerData.find((p) => p.providerId === 'google.com')?.photoURL || '';

const isStorageUrl = (u) => /^https:\/\/firebasestorage\.googleapis\.com\//.test(u || '');
const dropOld = (url) => (isStorageUrl(url) ? deleteObject(ref(storage, url)).catch(() => {}) : Promise.resolve());

// Recorta al centro en cuadrado y deja la imagen en 480 px (JPEG liviano)
export async function squareJpeg(file, size = 480) {
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) throw new Error('Elige una imagen JPG, PNG o WebP.');
  if (file.size > 15 * 1024 * 1024) throw new Error('La imagen es muy pesada (máximo 15 MB).');
  const bmp = await createImageBitmap(file).catch(() => { throw new Error('No pudimos leer esa imagen. Prueba con otra.'); });
  const side = Math.min(bmp.width, bmp.height);
  const c = document.createElement('canvas'); c.width = c.height = size;
  c.getContext('2d').drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, size, size);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('No pudimos preparar la imagen.'))), 'image/jpeg', 0.86));
}

export function cleanData(d) {
  const name = String(d.displayName ?? '').trim().replace(/\s+/g, ' ');
  if (name.length < 2) throw new Error('Escribe tu nombre (mínimo 2 letras).');
  const out = { displayName: name.slice(0, LIMITS.name) };
  for (const k of ['phone', 'country', 'bio']) if (k in d) out[k] = String(d[k] ?? '').trim().slice(0, LIMITS[k]);
  return out;
}

// Acciones sobre el perfil de `uid` (la propia cuenta o, para la Maestra, la de una alumna)
export const profileApi = (uid) => ({
  save: async (data) => { const c = cleanData(data); await updateDoc(doc(db, 'users', uid), c); return c; },
  setPhoto: async (file, oldUrl) => {
    const blob = await squareJpeg(file);
    const r = ref(storage, `users/${uid}/avatar-${Date.now()}.jpg`);
    await uploadBytes(r, blob, { contentType: 'image/jpeg', cacheControl: 'public,max-age=31536000' });
    const url = await getDownloadURL(r);
    await updateDoc(doc(db, 'users', uid), { photoURL: url });
    await dropOld(oldUrl);
    return url;
  },
  useGoogle: async (oldUrl) => { const url = googlePhoto(); await updateDoc(doc(db, 'users', uid), { photoURL: url }); await dropOld(oldUrl); return url; },
  remove: async (oldUrl) => { await updateDoc(doc(db, 'users', uid), { photoURL: '' }); await dropOld(oldUrl); return ''; },
});

const avatar = (p) => (p.photoURL
  ? `<img src="${esc(p.photoURL)}" alt="" referrerpolicy="no-referrer" style="width:96px;height:96px;border-radius:50%;object-fit:cover;display:block">`
  : `<span style="width:96px;height:96px;border-radius:50%;display:grid;place-items:center;font:700 1.6rem/1 var(--f-body,system-ui);color:#1f3f32;background:${esc(p.color || '#f2c66d')}">${esc(initials(p.displayName))}</span>`);

// Dibuja el formulario dentro de `el`. `api` = profileApi(uid) o equivalente; `onChange(perfil)` avisa cada cambio guardado.
// opts.photo=false oculta la foto (p. ej. la Maestra editando datos de una alumna).
export function mountProfileEditor(el, { profile, api, onChange, toast = () => {}, photo = true, hasGoogle = !!googlePhoto() }) {
  const P = { ...profile };
  const D = { displayName: P.displayName, phone: P.phone, country: P.country, bio: P.bio }; // lo que está escrito en el formulario
  const draw = () => {
    el.innerHTML = `<form class="pf" style="display:grid;gap:14px;text-align:left" novalidate>
      ${photo ? `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        <div id="pf-av">${avatar(P)}</div>
        <div style="display:grid;gap:8px">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn btn-primary btn-sm" id="pf-up">${P.photoURL ? 'Cambiar foto' : 'Subir foto'}</button>
            ${hasGoogle && P.photoURL !== googlePhoto() ? '<button type="button" class="btn btn-ghost btn-sm" id="pf-g">Usar la de Google</button>' : ''}
            ${P.photoURL ? '<button type="button" class="btn btn-ghost btn-sm" id="pf-rm">Quitar</button>' : ''}
          </div>
          <small style="opacity:.7">JPG, PNG o WebP. Se recorta en cuadrado.</small>
          <input type="file" id="pf-file" accept="image/jpeg,image/png,image/webp" hidden>
        </div></div>` : ''}
      <label style="display:grid;gap:6px;font-size:.84rem;font-weight:700">Nombre<input type="text" id="pf-name" maxlength="${LIMITS.name}" value="${esc(D.displayName)}" autocomplete="name" required></label>
      <label style="display:grid;gap:6px;font-size:.84rem;font-weight:700">Teléfono o WhatsApp<input type="text" id="pf-phone" maxlength="${LIMITS.phone}" value="${esc(D.phone)}" autocomplete="tel" placeholder="+56 9 …"></label>
      <label style="display:grid;gap:6px;font-size:.84rem;font-weight:700">País o ciudad<input type="text" id="pf-country" maxlength="${LIMITS.country}" value="${esc(D.country)}" autocomplete="country-name"></label>
      <label style="display:grid;gap:6px;font-size:.84rem;font-weight:700">Sobre mí<textarea id="pf-bio" maxlength="${LIMITS.bio}" rows="3" placeholder="Cuéntanos un poco de ti">${esc(D.bio)}</textarea></label>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn btn-primary" id="pf-save">Guardar cambios</button><small style="opacity:.7">El correo no se puede cambiar.</small></div>
    </form>`;
    const grab = () => { D.displayName = el.querySelector('#pf-name').value; D.phone = el.querySelector('#pf-phone').value; D.country = el.querySelector('#pf-country').value; D.bio = el.querySelector('#pf-bio').value; };
    const busy = async (btn, fn, okMsg) => {
      grab();
      const all = el.querySelectorAll('button'); all.forEach((b) => (b.disabled = true));
      try { await fn(); toast(okMsg); onChange?.({ ...P }); draw(); }
      catch (e) { console.error(e); toast(e?.message && !e.code ? e.message : 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.'); all.forEach((b) => (b.disabled = false)); }
    };
    const file = el.querySelector('#pf-file');
    el.querySelector('#pf-up')?.addEventListener('click', () => file.click());
    file?.addEventListener('change', () => { const f = file.files[0]; if (f) busy(null, async () => { P.photoURL = await api.setPhoto(f, P.photoURL); }, 'Foto actualizada'); });
    el.querySelector('#pf-g')?.addEventListener('click', () => busy(null, async () => { P.photoURL = await api.useGoogle(P.photoURL); }, 'Usamos tu foto de Google'));
    el.querySelector('#pf-rm')?.addEventListener('click', () => busy(null, async () => { P.photoURL = await api.remove(P.photoURL); }, 'Foto quitada'));
    el.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      busy(null, async () => {
        const c = await api.save({ displayName: el.querySelector('#pf-name').value, phone: el.querySelector('#pf-phone').value,
          country: el.querySelector('#pf-country').value, bio: el.querySelector('#pf-bio').value });
        Object.assign(P, c); Object.assign(D, c);
      }, 'Perfil guardado');
    });
  };
  draw();
}
