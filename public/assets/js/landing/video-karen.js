// Video de Karen en las landings: foto de Karen como portada y el video solo parte cuando la persona aprieta «play» (nunca solo con sonido).
// Uso: <div class="vk" data-video="PEGA_AQUÍ_EL_ENLACE"><img src="foto-de-karen.webp" alt="…"></div>
//   data-video: enlace de YouTube (no listado), Vimeo o un archivo .mp4 propio. Los subtítulos van grabados en el video.
//   Si data-video está vacío, se ve lo que tenga dentro: la foto de Karen o un marco vacío <div class="vk-vacio">…</div> (sin botón de play).
(() => {
  if (!document.getElementById('vk-css')) {
    const s = document.createElement('style'); s.id = 'vk-css';
    s.textContent = `.vk{position:relative;width:100%;aspect-ratio:16/10;border-radius:20px;overflow:hidden;background:#1d1d1d;box-shadow:0 22px 44px -24px rgba(0,0,0,.55)}
.vk>img{width:100%;height:100%;object-fit:cover;object-position:50% 22%;display:block}
.vk iframe,.vk video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
.vk-play{position:absolute;inset:0;margin:auto;width:84px;height:84px;border-radius:50%;border:0;background:rgba(255,253,246,.92);color:#222;font-size:2rem;padding-left:6px;cursor:pointer;box-shadow:0 10px 30px -8px rgba(0,0,0,.6)}
.vk-play:hover{transform:scale(1.05)}.vk-cap{position:absolute;left:0;right:0;bottom:0;padding:26px 16px 12px;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff;font:700 .85rem/1.3 Mulish,system-ui,sans-serif;text-align:center}
.vk-vacio{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:14px;background:radial-gradient(circle at 50% 40%,#3a3a3a,#141414);color:#f3efe4;text-align:center;padding:20px;font:600 1rem/1.3 'Google Sans Flex',Mulish,system-ui,sans-serif}
.vk-vacio i{display:grid;place-items:center;width:78px;height:78px;border-radius:50%;background:rgba(255,253,246,.92);color:#222;font-size:1.9rem;font-style:normal;padding-left:6px}
.vk{aspect-ratio:16/9}`;
    document.head.appendChild(s);
  }
  const embed = (url) => {
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{6,})/);
    if (yt) return `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video de Karen"></iframe>`;
    const vi = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vi) return `<iframe src="https://player.vimeo.com/video/${vi[1]}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video de Karen"></iframe>`;
    if (/\.(mp4|webm)(\?|$)/i.test(url)) return `<video controls autoplay playsinline src="${url.replace(/"/g, '&quot;')}"></video>`;
    return '';
  };
  document.querySelectorAll('.vk').forEach((el) => {
    const url = (el.dataset.video || '').trim();
    if (!/^https:\/\//i.test(url) || !embed(url)) return; // sin enlace: queda la foto de Karen
    const b = document.createElement('button'); b.type = 'button'; b.className = 'vk-play'; b.setAttribute('aria-label', 'Ver el video de Karen'); b.textContent = '▶';
    const cap = document.createElement('span'); cap.className = 'vk-cap'; cap.textContent = 'Aprieta play para ver el mensaje de Karen';
    el.querySelector('.vk-vacio')?.remove(); // con video cargado, el marco vacío deja de mostrarse
    b.addEventListener('click', () => { el.insertAdjacentHTML('beforeend', embed(url)); b.remove(); cap.remove(); });
    el.append(b, cap);
  });
})();
