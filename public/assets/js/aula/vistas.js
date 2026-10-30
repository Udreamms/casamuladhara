/* ---------- views ---------- */
const V={};
V.inicio=()=>{
  const p=totalPct();const r=52,c=2*Math.PI*r;
  const resume=resumePoint();
  const lv=LEVELS[2],les=allLessons(lv)[9];
  return `
  <section class="hero"><svg class="motif"><use href="#mark"/></svg>
    <div><span class="eyebrow">Escuela de Formación Holística</span>
      <h2>Hola, ${esc(ME.name.split(' ')[0])}. ${resume.lv.status==='locked'?'Te damos la bienvenida.':'Hoy sigues en el Nivel '+resume.lv.n+'.'}</h2>
      <p>${CM.free?'Conoce el programa del Nivel 1 y cómo funciona la formación de cinco niveles.':resume.started?'Te quedaste en '+esc(resume.les.t)+'.':'Tu camino empieza en '+esc(resume.les.t)+'. Cuando marques una clase como vista, tu avance se guarda.'}</p>
      <div class="hero-actions">${CM.free?'<button class="btn btn-primary" data-open-level="pendulo">Ver el programa</button>':`<button class="btn btn-primary" data-open-lesson="${resume.lv.id},${resume.i},${resume.j}">${resume.started?'Continuar clase':'Comenzar'}</button>`}<button class="btn btn-ghost" data-go="calendario">Ver calendario</button></div></div>
    <div class="ring-wrap"><svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(236,231,211,.15)" stroke-width="8"/><circle cx="60" cy="60" r="${r}" fill="none" stroke="#f2c66d" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 60 60)"/><text x="60" y="58" text-anchor="middle" font-family="Marcellus,Georgia,serif" font-size="26" fill="#ece7d3">${p}%</text><text x="60" y="76" text-anchor="middle" font-family="Josefin Sans,system-ui,sans-serif" font-size="7" letter-spacing="1.5" fill="#b9c4b5">DE TU FORMACIÓN</text></svg>
      <span class="lbl">Camino a Terapeuta<br>Holístico Integral</span></div>
  </section>
  ${CM.free?`<section class="card panel" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));align-items:center;gap:22px">
    ${CM.config.welcomeVideo?videoHTML(CM.config.welcomeVideo,'Bienvenida de la Maestra'):playerMsg('<span class="pill pres">Muy pronto</span><b style="font:400 clamp(1.1rem,2.6vw,1.6rem)/1.2 var(--f-display)">Un video de bienvenida de la Maestra</b>')}
    <div style="display:grid;gap:12px"><span class="eyebrow">Bienvenida</span><h3 style="font-size:1.35rem">Conoce la formación</h3><p class="muted" style="margin:0">La Maestra te cuenta qué vas a aprender en los cinco niveles y cómo funciona la formación. Revisa el programa del Nivel 1, preséntate en la comunidad y mira las próximas clases.</p><button class="btn btn-primary" style="justify-self:start" data-go="pagos">${CTA_TXT}</button></div></section>`:''}
  <section style="display:grid;gap:14px"><div class="panel-h"><h3 style="font-size:1.35rem">Tu camino de cinco niveles</h3><button class="link" data-go="formacion">Ver todo</button></div>${pathHTML()}</section>
  <div class="cols">
    <section class="card panel"><div class="panel-h"><h3>Próxima clase en vivo</h3><button class="link" data-go="calendario">Calendario</button></div>
      ${(()=>{const a=upcomingLive()[0];if(!a)return '<p class="muted" style="font-size:.88rem">No hay clases en vivo programadas por ahora.</p>';const k=keyLesson(a.id);return `<div class="next-class">${liveDate(a)}<div class="t"><b>${esc(k?k.les.t:a.title)}</b><span>${fmtHour(a.start.toMillis())} a ${fmtHour(liveEnd(a))} · Nivel ${a.level} · con la Maestra Holística</span></div><div style="display:flex;gap:6px">${liveActs(a)}</div></div>`})()}
      <div class="panel-h" style="margin-top:6px"><h3>Conversaciones recientes</h3><button class="link" data-go="comunidad">Comunidad</button></div>
      <div>${POSTS.length?'':'<p class="muted" style="font-size:.88rem">Aún no hay conversaciones. Rompe el hielo en Comunidad.</p>'}${POSTS.slice(0,3).map(p=>`<div class="mini-post">${av(p)}<div style="min-width:0"><b>${esc(p.who)}</b>${p.karen?'<span class="tag-k">Maestra</span>':''}<p>${esc(p.txt)}</p></div></div>`).join('')}</div>
    </section>
    <section class="card panel"><div class="panel-h"><h3>Tus insignias</h3><button class="link" data-go="insignias">Ver todas</button></div>
      <div class="badge-row">${BADGES.slice(0,4).map(b=>`<span title="${b.name}" style="${b.earned?'':'filter:grayscale(1);opacity:.4'}">${badgeSVG(b,!!b.earned)}</span>`).join('')}</div>
      <p class="muted" style="font-size:.88rem">Llevas ${BADGES.filter(b=>b.earned).length} de ${BADGES.length} insignias.${(()=>{const nb=BADGES.find(b=>!b.earned);return nb?' La próxima es <b style="color:var(--fg)">'+nb.name+'</b>, al terminar su nivel.':''})()}</p>
      ${CM.isAdmin?`<div class="panel-h" style="margin-top:6px"><h3>Nuevo en Recursos</h3><button class="link" data-go="recursos">Biblioteca</button></div>
      <div class="files">${RES.filter(r=>r.new).map(fileHTML).join('')}</div>`:''}
    </section>
  </div>`;
};
function fileHTML(f){const k=f.k||f.type;return `<div class="file"><span class="ficon ${k}">${k.toUpperCase()}</span><div class="fx"><b>${esc(f.t||f.name)}</b><small>${f.size}</small></div>${f.href&&f.lvl>0&&!hasLv(f.lvl)?`<button class="btn btn-ghost btn-sm" data-go="pagos">Inscríbete</button>`:f.href?`<a class="btn btn-ghost btn-sm" href="${f.href}" target="_blank" rel="noopener">Abrir PDF</a>`:`<button class="btn btn-ghost btn-sm" data-toast="En la plataforma real esto descarga el archivo">${k==='mp3'||k==='mp4'?'Reproducir':'Descargar'}</button>`}</div>`}

V.formacion=()=>`
  <div class="view-head"><div><span class="eyebrow">Escuela de Formación Holística</span><h1>Mi formación</h1><p>Cinco niveles que te llevan a la certificación de Terapeuta Holístico Integral. Toca un nivel para ver sus clases, videos y materiales.</p></div>
  <div class="stat-row"><div><b>${totalPct()}%</b>avance total</div><div><b>${LEVELS.flatMap(allLessons).filter(l=>l.done).length}</b>clases vistas</div><div><b>${BADGES.filter(b=>b.earned).length}/${BADGES.length}</b>insignias</div></div></div>
  ${pathHTML()}
  <section style="display:grid;gap:14px">${LEVELS.map(lv=>`<article class="card panel" style="grid-template-columns:minmax(0,1fr) auto;align-items:center">
    <div style="display:grid;gap:8px;min-width:0"><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span class="eyebrow">Nivel ${lv.n}</span>${modePill(lv)}${statusPill(lv)}</div>
    <h3 style="font-size:1.35rem">${lv.title}</h3>${lv.n===4?`<div style="display:flex;gap:6px;flex-wrap:wrap">${lv.modules.map((m,i)=>`<span class="pill ${modOpen(lv,i)?'done':'lock'}">${esc(m.title)}</span>`).join('')}</div>`:''}${detailOpen(lv)?`<p class="muted" style="font-size:.9rem;max-width:60em">${lv.desc}</p><span class="muted" style="font-size:.8rem">${lv.dur} · ${allLessons(lv).length} clases</span>`:`<span class="muted" style="font-size:.8rem">${lv.dur}</span>`}</div>
    ${detailOpen(lv)?`<button class="btn ${lv.status==='locked'?'btn-ghost':'btn-primary'}" data-open-level="${lv.id}">${lv.status==='done'?'Repasar':lv.status==='progress'?'Continuar':'Ver programa'}</button>`:`<button class="btn btn-ghost" data-go="pagos">Inscríbete para ver el programa</button>`}</article>`).join('')}</section>`;

V.curso=()=>{
  const lv=LEVELS.find(l=>l.id===S.level);const [mi,li]=S.lesson;const les=lv.modules[mi].lessons[li];
  // en el Nivel 4 cada módulo es un curso que se abre por separado (4.1 a 4.4)
  // y dentro del curso, cada clase (Clase 1 a 4) se abre por separado
  const clsLock=lv.status!=='locked'&&modOpen(lv,mi)&&!clsOpen(lv,mi,les);
  const locked=lv.status==='locked'||!modOpen(lv,mi)||clsLock;
  const lvTag=lv.n===4?'Nivel 4.'+(mi+1):'Nivel '+lv.n,lockTitle=clsLock?esc(les.t):lv.n===4?esc(lv.modules[mi].title):lv.title;
  const nextTxt=clsLock?'Esta clase se abre cuando la Maestra te la habilite':lv.n===4?'Este curso se abre cuando la Maestra te lo habilite':'Se desbloquea al completar el Nivel '+(lv.n-1);
  const flat=allLessons(lv);const doneN=flat.filter(l=>l.done).length;
  const upcoming=!locked&&!les.done&&/En vivo/.test(les.len);
  const isSl=!!les.slides;
  if(!detailOpen(lv))return `<div class="crumbs"><button data-go="formacion">Mi formación</button><span>/</span><span>Nivel ${lv.n} · ${lv.title}</span></div>
  <div style="max-width:900px">${playerMsg(`<span class="pill pres">Nivel ${lv.n}</span><b style="font:400 clamp(1.2rem,3vw,1.8rem)/1.2 var(--f-display)">${lv.title}</b><span style="color:#b9c4b5;font-size:.9rem">${lv.dur}</span><span style="color:#b9c4b5;font-size:.9rem;max-width:30em">El programa de este nivel se muestra al inscribirte en la formación.</span><button ${lightBtn} data-go="pagos">${CTA_TXT}</button>`)}</div>`;
  const live=!locked&&liveHTML(lv.id+'_'+mi+'_'+li,les);
  if(S.overdue&&locked&&!CM.isAdmin)return `<div class="crumbs"><button data-go="formacion">Mi formación</button><span>/</span><span>Nivel ${lv.n} · ${lv.title}</span></div>
  <div class="player" style="max-width:900px"><svg class="motif"><use href="#mark"/></svg><div style="position:relative;display:grid;gap:12px;justify-items:center;text-align:center;padding:20px"><span class="pill bad" style="background:rgba(239,138,115,.2);color:#ffd2c7">Acceso pausado</span><b style="font:400 clamp(1.2rem,3vw,1.8rem)/1.2 var(--f-display)">${esc(les.t)}</b><span style="color:#b9c4b5;font-size:.9rem;max-width:30em">Esta clase vuelve a estar disponible en cuanto se registre el pago de tu cuota. No pierdes tu avance.</span><button class="btn btn-sm" style="background:#e9e4d0;color:#1f3f32" data-checkout="portal">Actualizar mi pago</button></div></div>`;
  const tabs=[['temas','Temas de la clase'],['materiales','Materiales'],['preguntas','Preguntas'],['notas','Mis notas']];
  const key=lv.id+'_'+mi+'_'+li;
  const qa=(CM.questions[key]||[]).flatMap(q=>[{who:ME.name,ini:ME.ini,c:ME.c,photo:ME.photo,txt:q.text}].concat(q.reply?[{who:'Maestra Holística',karen:1,ini:'MH',txt:q.reply,reply:1}]:[]));
  const dur=toSec(les.len)||1;
  const si=isSl?Math.min(S.sl[key]||0,les.slides.length-1):0;
  const body={
    temas:isSl?`<ol class="chapters">${les.topics.map((c,i)=>`<li class="${si===i?'now':''}"><button data-slide="${i}"><span class="ts">${c.ts}</span><span><span class="ct">${esc(c.t)}</span>${c.d?`<span class="cd">${esc(c.d)}</span>`:''}</span></button></li>`).join('')}</ol>`:les.topics.length?`<ol class="chapters">${les.topics.map((c,i)=>`<li class="${curChapter(les)===i?'now':''}"><button data-seek="${toSec(c.ts)}"><span class="ts">${c.ts}</span><span><span class="ct">${esc(c.t)}</span>${c.d?`<span class="cd">${esc(c.d)}</span>`:''}</span></button></li>`).join('')}</ol>`:`<p class="muted">Los temas de esta clase se publican cuando se abre el nivel.</p>`,
    materiales:les.files.length?`<div class="files">${les.files.map(f=>fileHTML({...f,k:f.type})).join('')}</div>`:`<p class="muted">Esta clase no tiene materiales descargables.</p>`,
    preguntas:`<div class="qa">${qa.map(q=>`<div class="q ${q.reply?'reply':''}">${av(q)}<div class="bubble"><b>${esc(q.who)}</b>${q.karen?'<span class="tag-k">Maestra</span>':''}<p>${esc(q.txt)}</p></div></div>`).join('')||'<p class="muted">Aún no hay preguntas. Sé la primera.</p>'}
      <form class="reply-form" id="qa-form"><input type="text" id="qa-in" placeholder="Escribe tu pregunta para la Maestra Holística" aria-label="Tu pregunta"><button class="btn btn-primary btn-sm">Enviar</button></form></div>`,
    notas:`<textarea id="notes" placeholder="Tus apuntes de esta clase. Solo tú los ves.">${esc(CM.notes[key]||'')}</textarea><div><button class="btn btn-ghost btn-sm" id="save-notes">Guardar notas</button></div>`
  };
  return `
  <div class="crumbs"><button data-go="formacion">Mi formación</button><span>/</span><span>Nivel ${lv.n} · ${lv.title}</span></div>
  <div class="course">
    <div style="display:grid;gap:20px;min-width:0">
      ${locked?`<div class="player"><svg class="motif"><use href="#mark"/></svg><div style="position:relative;display:grid;gap:12px;justify-items:center;text-align:center;padding:20px"><span class="pill pres">${lvTag}</span><b style="font:400 clamp(1.2rem,3vw,1.8rem)/1.2 var(--f-display)">${lockTitle}</b>${S.paying||clsLock?`<span style="color:#b9c4b5;font-size:.9rem">${nextTxt}</span>${clsLock?'':`<button class="btn btn-primary btn-sm" style="background:#e9e4d0;color:#1f3f32" data-go="pagos">Ver mi plan</button>`}`:`<span style="color:#b9c4b5;font-size:.9rem;max-width:30em">Esta clase es parte de la formación completa. Inscríbete para abrir las clases, videos y materiales nivel a nivel.</span><button class="btn btn-primary btn-sm" style="background:#e9e4d0;color:#1f3f32" data-go="pagos">Ver cómo inscribirme</button>`}</div></div>`:
      live&&!isSl?live:upcoming?`<div class="player"><svg class="motif"><use href="#mark"/></svg><div class="cap"><div><small>Nivel ${lv.n} · Próxima clase en vivo</small><b>${esc(les.t)}</b></div></div><div style="position:relative;display:grid;gap:12px;justify-items:center;text-align:center"><span class="pill live" style="color:#ece7d3;border-color:rgba(236,231,211,.4)">${les.len.replace('En vivo','En vivo el')}</span><span style="color:#b9c4b5;font-size:.88rem">La Maestra publicará aquí la fecha y el enlace de la sala.</span><span style="color:#b9c4b5;font-size:.82rem">La grabación queda aquí al terminar</span></div></div>`:
      isSl?(live||'')+deckHTML(les,si):`<div class="player" id="player"><svg class="motif"><use href="#mark"/></svg>
        <div class="cap"><div><small>Nivel ${lv.n} · ${esc(lv.modules[mi].title)}</small><b>${esc(les.t)}</b></div></div>
        <button class="play" id="play" aria-label="${S.playing?'Pausar':'Reproducir'}">${S.playing?'<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'}</button>
        ${les.topics.length?`<span class="chapter-now" id="chap-now">${esc(les.topics[curChapter(les)].t)}</span>`:''}
        <div class="controls"><button id="play2" aria-label="Reproducir o pausar">${S.playing?'<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'}</button>
        <span id="tnow">${fmt(S.t)}</span><div class="track" id="track"><i id="tfill" style="width:${S.t/dur*100}%"></i>${les.topics.slice(1).map(c=>`<span style="left:${toSec(c.ts)/dur*100}%"></span>`).join('')}</div><span>${les.len}</span></div></div>`}
      <div class="lesson-head"><div><div style="display:flex;gap:8px;flex-wrap:wrap">${modePill(lv)}${les.done?'<span class="pill done">Vista</span>':''}</div><h2>${esc(les.t)}</h2></div>
        ${!locked&&!upcoming?`<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn ${les.done?'btn-ghost':'btn-primary'} btn-sm" id="mark-done">${les.done?'Marcar como no vista':'Marcar como vista'}</button><button class="btn btn-ghost btn-sm" id="next-les">Siguiente clase</button></div>`:''}</div>
      ${locked?`<div class="lock-note">${icLock}<span>${clsLock?'Ya tienes este curso. Las clases se abren una por una, cuando la Maestra te las habilite.':S.paying?`Puedes revisar el programa completo. ${lv.n===4?'Las clases, videos y materiales de este curso se abren cuando la Maestra te lo habilite.':`Las clases, videos y materiales se abren cuando completes el Nivel ${lv.n-1}.`}`:`Puedes revisar el programa completo. Las clases, videos y materiales se abren al inscribirte en la formación: 9 cuotas de 55 USD o un solo pago.`}</span></div>`:
      `<div class="tabs" role="tablist">${tabs.map(([k,n])=>`<button role="tab" aria-selected="${S.tab===k}" data-tab="${k}">${n}${k==='preguntas'&&qa.length?` (${qa.length})`:''}</button>`).join('')}</div><div>${body[S.tab]}</div>`}
    </div>
    <aside class="card syllabus">
      <div class="syl-top"><span class="eyebrow">Nivel ${lv.n}</span><h3>${lv.title}</h3>${statusPill(lv)}<div class="bar"><i style="width:${pct(lv)}%"></i></div><div class="row"><span>${doneN} de ${flat.length} clases</span><span>${pct(lv)}%</span></div></div>
      ${lv.modules.map((m,i)=>{const open=S.openMods[lv.id+i]!==undefined?S.openMods[lv.id+i]:i===mi;const md=m.lessons.filter(l=>l.done).length;
        const ml=lv.status==='locked'||!modOpen(lv,i);
        return `<div class="mod"><button class="mod-h" aria-expanded="${open}" data-mod="${i}"><b>${lv.n===4&&ml&&!CM.isAdmin?icLock+' ':''}${esc(m.title)}</b><small>${md}/${m.lessons.length}</small><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
        <div ${open?'':'hidden'}>${m.lessons.map((l,j)=>{const lk=ml||!clsOpen(lv,i,l);return `<button class="les ${i===mi&&j===li?'cur':''} ${lk?'locked':''}" data-les="${i},${j}" ${lk?'aria-disabled="true"':''}><span class="chk ${l.done?'on':''} ${lk?'lk':''}">${lk?icLock:''}</span><span>${esc(l.t)}</span><small>${esc(l.len)}</small></button>`}).join('')}</div></div>`}).join('')}
      ${!S.paying&&!CM.isAdmin?`<div style="padding:18px;display:grid;gap:10px;border-top:1px solid var(--line)"><p class="muted" style="margin:0;font-size:.88rem">Las clases, videos y materiales se abren al inscribirte en la formación completa.</p><button class="btn btn-primary btn-sm" data-go="pagos">${CTA_TXT}</button></div>`:''}
    </aside>
  </div>${CM.isAdmin&&!locked?liveEditor(lv,mi,li):''}`;
};
// Solo la Maestra: programa la clase en vivo de esta lección y agrega la grabación
function liveEditor(lv,mi,li){const key=lv.id+'_'+mi+'_'+li,a=liveOf(key),L=CM.liveLinks[key]||{};
  return `<details class="card panel" style="margin-top:20px" ${a?'open':''}><summary style="cursor:pointer"><b>Clase en vivo de esta lección</b> <span class="muted" style="font-size:.84rem">· solo la Maestra</span></summary>
  <form id="live-form" data-key="${key}" data-level="${lv.n===4?41+mi:lv.n}" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:12px">
    <label class="n2-f"><span>Fecha y hora</span><input type="datetime-local" id="lv-start" value="${a?toLocalInput(a.start.toDate()):''}" required></label>
    <label class="n2-f"><span>Duración (minutos)</span><input type="number" id="lv-dur" min="15" max="600" step="5" value="${a?a.durationMin:90}"></label>
    <label class="n2-f"><span>Enlace de la sala (Zoom o Meet)</span><input type="url" id="lv-url" placeholder="https://" value="${esc(L.url||'')}"></label>
    <label class="n2-f"><span>Grabación (YouTube, Vimeo o Drive)</span><input type="url" id="lv-rec" placeholder="https://" value="${esc(L.recordingUrl||'')}"></label>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn btn-primary btn-sm">Guardar</button>${a?'<button type="button" class="btn btn-ghost btn-sm" id="lv-del">Quitar esta clase en vivo</button>':''}</div>
  </form><p class="muted" style="margin:0;font-size:.82rem">Las alumnas con este nivel ven la fecha y el botón para entrar ${LIVE_OPEN_MIN} minutos antes. Al terminar, si agregas la grabación, la ven en esta misma clase.</p></details>`}
function curLesson(){const lv=LEVELS.find(l=>l.id===S.level);return lv.modules[S.lesson[0]].lessons[S.lesson[1]]}
function goSlide(v){const lv=LEVELS.find(l=>l.id===S.level),les=curLesson();if(!les.slides)return;
  if(v==='nextles'){const nx=$('#next-les');nx&&nx.click();return} // el modo Ampliar sigue en la clase siguiente; solo se quita con Cerrar o Esc
  if(v==='zoom'){S.full=!S.full;document.body.style.overflow=S.full?'hidden':'';render(false);return}
  const key=lv.id+'_'+S.lesson[0]+'_'+S.lesson[1];const n=les.slides.length;let i=S.sl[key]||0;
  i=v==='next'?Math.min(n-1,i+1):v==='prev'?Math.max(0,i-1):Math.max(0,Math.min(n-1,+v));S.sl[key]=i;S.anim=1;render(false);
  const d=document.querySelector('.deck');if(d){const r=d.getBoundingClientRect();if(r.top<0)window.scrollTo({top:window.scrollY+r.top-80,behavior:'smooth'})}}
function toSec(s){if(!s||!/\d/.test(s)||/En vivo|paso/.test(s))return 0;return s.split(':').map(Number).reduce((a,b)=>a*60+b,0)}
function fmt(s){s=Math.floor(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')}
function curChapter(les){let k=0;les.topics.forEach((c,i)=>{if(toSec(c.ts)<=S.t)k=i});return k}

V.insignias=()=>{
  const earned=BADGES.filter(b=>b.earned).length;
  return `<div class="view-head"><div><span class="eyebrow">Tus logros</span><h1>Insignias y certificados</h1><p>Cada nivel que completas te entrega una insignia. Con las ocho obtienes el certificado de Terapeuta Holístico Integral.</p></div>
  <div class="stat-row"><div><b>${earned} de ${BADGES.length}</b>insignias</div><div><b>${totalPct()}%</b>hacia tu certificación</div></div></div>
  <section class="cert-banner">${summitSVG()}<div><span class="eyebrow">Certificación final</span><h3>Terapeuta Holístico Integral</h3><p>Se emite al completar los cinco niveles, incluidas las cuatro especializaciones del Nivel 4.</p><div class="bar"><i style="width:${earned/BADGES.length*100}%"></i></div></div><button class="btn" id="cert-preview">Ver certificado</button></section>
  <section style="display:grid;gap:14px"><h3 style="font-size:1.3rem">Obtenidas</h3><div class="badges">${BADGES.filter(b=>b.earned).map(b=>`<button class="bdg" data-badge="${b.id}">${badgeSVG(b,1)}<b>${b.name}</b><small>${b.sub}</small><span class="pill done">Obtenida el ${b.earned}</span></button>`).join('')}</div></section>
  <section style="display:grid;gap:14px"><h3 style="font-size:1.3rem">Por ganar</h3><div class="badges">${BADGES.filter(b=>!b.earned).map(b=>`<button class="bdg off" data-badge="${b.id}">${badgeSVG(b,0)}<b>${b.name}</b><small>${b.sub}</small></button>`).join('')}</div></section>`;
};

V.comunidad=()=>{
  const chans=CM.free?CHANNELS.filter(c=>CM.freeChannels.includes(c.id)):CHANNELS;
  if(!chans.some(c=>c.id===S.ch))S.ch=chans[0].id;
  const canWrite=!CM.free||S.ch==='presentaciones';
  const ch=CHANNELS.find(c=>c.id===S.ch);const list=POSTS.filter(p=>p.ch===S.ch).map(p=>({...p,i:p.id}));
  return `<div class="view-head"><div><span class="eyebrow">Comunidad</span><h1>Conversa con tus compañeras</h1><p>${CM.free?'Preséntate y lee lo que cuentan las alumnas de la formación. Los canales de cada nivel se abren al inscribirte.':'Un espacio por nivel para compartir prácticas, dudas y avances. La Maestra Holística participa en todos.'}</p></div></div>
  <div class="comm">
    <nav class="card channels" aria-label="Canales"><span class="nav-label">Canales</span>${chans.map(c=>{const n=POSTS.filter(p=>p.ch===c.id).length;return `<button class="ch" aria-current="${c.id===S.ch}" data-ch="${c.id}"># ${c.name}${n?`<small>${n}</small>`:''}</button>`}).join('')}</nav>
    <div style="display:grid;gap:14px;min-width:0">
      ${canWrite?`<form class="card composer" id="composer"><div class="top">${av({ini:ME.ini,c:ME.c,photo:ME.photo},1)}<textarea id="post-in" placeholder="Comparte algo en # ${ch.name}" aria-label="Nueva publicación"></textarea></div>
        <div class="act"><span class="muted" style="font-size:.78rem">Publicas como ${esc(ME.name)}</span><button class="btn btn-primary btn-sm">Publicar</button></div></form>`:''}
      <div class="feed">${list.length?list.map(p=>`<article class="card post"><div class="post-h">${av(p)}<div><b>${esc(p.who)}</b>${p.karen?'<span class="tag-k">Maestra Holística</span>':''}<small>${p.when} · # ${ch.name}</small></div></div><p>${esc(p.txt)}</p>
        <div class="post-a"><button aria-pressed="${!!p.liked}" data-like="${p.i}"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>${p.likes}</button><button data-focus-reply="${p.i}"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>${p.replies.length} respuestas</button>${(p.mine||CM.isAdmin)?`<button data-delpost="${p.id}" style="margin-left:auto">Eliminar</button>`:''}</div>
        ${p.replies.length?`<div class="replies">${p.replies.map(r=>`<div class="q">${av(r)}<div class="bubble"><b>${esc(r.who)}</b>${r.karen?'<span class="tag-k">Maestra</span>':''}<p>${esc(r.txt)}</p></div></div>`).join('')}</div>`:''}
        ${canWrite?`<form class="reply-form" data-reply="${p.i}"><input type="text" id="r${p.i}" placeholder="Responder" aria-label="Responder"><button class="btn btn-ghost btn-sm">Enviar</button></form>`:''}</article>`).join(''):`<div class="card empty">Este canal se abre cuando comience el nivel. Mientras tanto, conversa en # General.</div>`}</div>
    </div>
    <aside class="right" style="display:grid;gap:14px">
      <section class="card panel"><h3 style="font-size:1.1rem">Tu perfil</h3><div class="member">${av({ini:ME.ini,c:ME.c,photo:ME.photo})}<div><b>${esc(ME.name)}</b><small>${CM.isAdmin?'Maestra':'Estudiante'}</small></div></div><button class="btn btn-ghost btn-sm" id="edit-profile" style="justify-self:start">Editar mi perfil</button></section>
      <section class="card panel"><h3 style="font-size:1.1rem">Acuerdos de la comunidad</h3><ul class="rules"><li>Habla desde el respeto y el cariño.</li><li>Lo que se comparte aquí, se queda aquí.</li><li>No publiques datos de tus consultantes.</li><li>Las dudas de clase van en la pestaña Preguntas de cada clase.</li></ul></section>
    </aside>
  </div>`;
};

V.calendario=()=>{const up=upcomingLive();
  return `<div class="view-head"><div><span class="eyebrow">Calendario</span><h1>Clases y encuentros</h1><p>Las próximas clases en vivo con la Maestra. La hora se muestra en tu zona horaria.</p></div></div>
  <div class="agenda">${up.length?up.map(a=>{const k=keyLesson(a.id),open=liveState(a)==='open';return `<article class="card ev ${open?'today':''}">${liveDate(a)}
  <div style="min-width:0"><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px"><span class="pill live">Clase en vivo</span>${open?'<span class="pill pres">Ahora</span>':''}</div><h3>${esc(k?k.les.t:a.title)}</h3><p>${a.start.toDate().toLocaleDateString('es',{weekday:'long'})} · ${fmtHour(a.start.toMillis())} a ${fmtHour(liveEnd(a))} · Nivel ${a.level}</p></div>
  <div class="acts"><a class="btn btn-ghost btn-sm" href="${gcalLink(a)}" target="_blank" rel="noopener">Agregar a mi calendario</a>${liveActs(a)}</div></article>`}).join(''):'<div class="card empty">Aún no hay clases en vivo programadas. Aquí verás las próximas fechas.</div>'}</div>`};

V.recursos=()=>{
  const types=['Todos','PDF','Audio','Video','Plantilla'];
  const q=S.resQ.toLowerCase();
  const list=RES.filter(r=>(S.resType==='Todos'||r.type===S.resType)&&(S.resLvl==='0'||String(r.lvl)===S.resLvl||(S.resLvl==='g'&&r.lvl===0))&&(!q||r.t.toLowerCase().includes(q)));
  return `<div class="view-head"><div><span class="eyebrow">Biblioteca</span><h1>Recursos</h1><p>Guías, gráficos, meditaciones y plantillas de todos los niveles, reunidos en un solo lugar.</p></div></div>
  <div class="filters">${types.map(t=>`<button class="chip" aria-pressed="${S.resType===t}" data-rtype="${t}">${t}</button>`).join('')}
    <select id="rlvl" aria-label="Filtrar por nivel"><option value="0">Todos los niveles</option>${[1,2,3,4,5].map(n=>`<option value="${n}" ${S.resLvl==n?'selected':''}>Nivel ${n}</option>`).join('')}<option value="g" ${S.resLvl==='g'?'selected':''}>Para tu consulta</option></select>
    <input type="text" id="rq" placeholder="Buscar recurso" value="${esc(S.resQ)}" style="width:auto;flex:1;min-width:160px;border-radius:999px;padding:8px 14px;background:var(--surface)" aria-label="Buscar recurso"></div>
  <div class="res-grid">${list.length?list.map(r=>`<article class="card res"><div class="top"><span class="ficon ${r.k}">${r.k.toUpperCase()}</span><div><b>${r.t}</b><small>${r.lvl?'Nivel '+r.lvl:'Para tu consulta'} · ${r.type}</small></div></div><div class="foot"><span>${r.size}</span>${r.href&&r.lvl>0&&!hasLv(r.lvl)?`<button class="btn btn-ghost btn-sm" data-go="pagos">Inscríbete</button>`:r.href?`<a class="btn btn-ghost btn-sm" href="${r.href}" target="_blank" rel="noopener">Abrir PDF</a>`:`<button class="btn btn-ghost btn-sm" data-toast="En la plataforma real esto ${r.k==='mp3'||r.k==='mp4'?'reproduce':'descarga'} el archivo">${r.k==='mp3'||r.k==='mp4'?'Reproducir':'Descargar'}</button>`}</div></article>`).join(''):`<div class="card empty" style="grid-column:1/-1">No hay recursos con esos filtros.</div>`}</div>`;
};

V.soporte=()=>{
  const t=FAQ[S.supTopic];
  return `<section class="sup-hero"><span class="eyebrow" style="color:#8a6430">Centro de ayuda</span><h2>¿En qué te podemos ayudar?</h2>
    <label class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input type="text" id="sq" placeholder="Ej.: grabación, contraseña, certificado" aria-label="Buscar en ayuda"></label></section>
  <div class="topics">${Object.entries(FAQ).map(([k,v])=>`<button class="topic" aria-pressed="${S.supTopic===k}" data-topic="${k}"><svg viewBox="0 0 24 24">${v.ic}</svg><b>${v.name}</b><small>${v.q.length} preguntas</small></button>`).join('')}</div>
  <div class="cols">
    <section class="card panel"><h3>${t.name}</h3><div class="faq" id="faq">${t.q.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>
    <section class="card panel"><h3>Escríbenos</h3>${S.sent?`<div class="ok-msg">Recibimos tu mensaje. Te responderemos por correo dentro de 24 horas hábiles.</div>`:''}
      <form class="ticket" id="ticket"><label for="tk-topic">Tema<select id="tk-topic">${Object.values(FAQ).map(v=>`<option>${v.name}</option>`).join('')}<option>Otro</option></select></label>
      <label for="tk-msg">Cuéntanos qué pasó<textarea id="tk-msg" style="min-height:110px" placeholder="Describe tu duda o problema"></textarea></label><button class="btn btn-primary">Enviar mensaje</button></form>
      <h3 style="font-size:1.05rem;margin-top:8px">Tus solicitudes</h3><ul class="tickets">${CM.tickets.map(t=>`<li><span>${esc(t.topic)}: ${esc(t.message.slice(0,60))}${t.message.length>60?'…':''}</span><span class="pill ${t.status==='open'?'prog':'done'}">${t.status==='open'?'Abierta':'Resuelta'}</span></li>`).join('')||'<li><span class="muted">Aún no has enviado solicitudes.</span></li>'}</ul>
    </section>
  </div>`;
};

V.tienda=()=>`<section class="shop-hero"><svg class="motif"><use href="#mark"/></svg><div style="position:relative"><span class="eyebrow">La tiendita</span><h2>Preparados y herramientas para tus prácticas</h2>
    <p>Elaborados en Casa Muladhara para acompañar la limpieza y armonización energética, en casa o en consulta.</p></div></section>
  <div class="shop">${SHOP.map(p=>`<article class="card shop-item"><div class="shop-img"><img loading="lazy" decoding="async" src="${p.img}" alt="${esc(p.alt)}">${p.isNew?'<span class="pill pres">Nuevo</span>':''}</div>
    <div class="shop-body"><span class="eyebrow">${p.tag}</span><h3>${p.name}</h3><ul>${p.pts.map(x=>`<li>${x}</li>`).join('')}</ul>${p.warn?`<span class="shop-warn">${p.warn}</span>`:''}
    <div class="shop-buy"><div class="shop-price">${p.price}<small>${p.unit}</small></div><button class="btn btn-primary btn-sm" data-shop="${p.id}">Pedir</button></div></div></article>`).join('')}</div>
  <div class="shop-foot"><span>Despacho a domicilio o retiro en consulta</span><span>Coordinamos contigo el pago y la entrega</span><span>Consultas por Instagram @casa.muladhara</span></div>`;

V.trabaja=()=>{
  const ck=on=>`<span class="chk ${on?'on':''}"></span>`;
  const services=['Péndulo Hebreo','Limpieza de casas y espacios','Radiestesia y Sanación del Alma','Vidas pasadas','Terapia transgeneracional','Niño interior','Limpieza uterina','Tarot Terapéutico'];
  return `<section class="job-hero"><svg class="motif"><use href="#mark"/></svg>
    <div style="position:relative"><span class="eyebrow">Bolsa de terapeutas</span><h2>Te formaste con nosotras. Ahora puedes atender en Casa Muladhara.</h2>
      <p>Cuando terminas tu formación puedes postular para ofrecer tus terapias como parte del equipo de Casa Muladhara, con el respaldo de Karen y de la Escuela.</p></div>
    <ol class="job-steps"><li><b>1</b>Postulas desde aquí</li><li><b>2</b>Conversas con Karen</li><li><b>3</b>Haces una práctica acompañada</li><li><b>4</b>Te sumas al equipo y recibes consultantes</li></ol>
  </section>
  <div class="perks">
    <div><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c.8-3.5 3.2-5.5 6-5.5s5.2 2 6 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.6.8 2.6 2.6 3 5.2"/></svg><b>Consultantes derivados</b><small>Casa Muladhara te deriva personas que buscan terapia.</small></div>
    <div><svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/></svg><b>Espacio presencial u online</b><small>Atiende en la sala de Casa Muladhara o desde tu casa.</small></div>
    <div><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/></svg><b>El respaldo de la Escuela</b><small>Tu perfil aparece en la web con tu certificación.</small></div>
    <div><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg><b>Acompañamiento</b><small>Supervisión de casos y comunidad de terapeutas.</small></div>
  </div>
  <div class="cols">
    <section class="card panel">${S.applied?`<div class="panel-h"><h3>Tu postulación</h3><span class="pill prog">En revisión</span></div>
      <p class="muted" style="font-size:.9rem">Recibimos tu postulación. Karen la revisará y te escribiremos para coordinar una conversación.</p>
      <ul class="track-app"><li class="done"><span class="dotc"></span><div>Postulación enviada<small>Hoy</small></div></li><li class="now"><span class="dotc"></span><div>Conversación con Karen<small>Te escribiremos para agendarla</small></div></li><li><span class="dotc"></span><div>Práctica acompañada</div></li><li><span class="dotc"></span><div>Te sumas al equipo</div></li></ul>
      <button class="btn btn-ghost btn-sm" style="justify-self:start" id="app-reset">Editar postulación</button>`:
    `<h3>Postula a Casa Muladhara</h3>
      <form class="apply" id="apply">
        <fieldset><legend>¿Qué terapias te gustaría ofrecer?</legend><div class="checks">${services.map((s,i)=>`<label><input type="checkbox" ${i<2?'checked':''}>${s}</label>`).join('')}</div></fieldset>
        <fieldset><legend>¿Cómo te gustaría atender?</legend><div class="checks">${['Presencial','Online','Ambas'].map((s,i)=>`<label><input type="radio" name="mod" ${i===2?'checked':''}>${s}</label>`).join('')}</div></fieldset>
        <div class="row2"><label class="f" for="ap-city">Ciudad<input type="text" id="ap-city" value="Quilpué"></label><label class="f" for="ap-days">Disponibilidad<select id="ap-days"><option>Mañanas</option><option selected>Tardes</option><option>Fines de semana</option><option>Flexible</option></select></label></div>
        <label class="f" for="ap-why">¿Por qué quieres ser parte de Casa Muladhara?<textarea id="ap-why" style="min-height:100px" placeholder="Cuéntanos de ti y de tu experiencia"></textarea></label>
        <button class="btn btn-primary" style="justify-self:start">Enviar postulación</button>
      </form>`}
    </section>
    <section class="card panel"><h3>Requisitos</h3>
      <ul class="req">
        <li>${ck(1)}<div>Ser alumna de la Escuela de Formación Holística<small>Cumplido</small></div></li>
        <li>${ck(0)}<div>Certificación de Terapeuta Holístico Integral<small>Te faltan los niveles 3, 4 y 5. Puedes postular desde ya y la revisamos al terminar.</small></div></li>
        <li>${ck(0)}<div>Conversación y práctica con Karen<small>Se coordina después de postular</small></div></li>
      </ul>
      <button class="link" style="justify-self:start" data-go="insignias">Ver mi avance hacia la certificación</button>
    </section>
  </div>`;
};

V.pagos=()=>{
  const P=CM.profile,total=Number(P.installments)||9,paid=Math.min(total,Number(P.paidInstallments)||0);
  const full=S.plan==='completo',cuotas=S.plan==='mensual',noplan=S.plan==='none',grant=Number(P.grantLevel)||0;
  const contado=cuotas?(total-paid)*55:total===9?499:total*55;
  const next=P.currentPeriodEnd&&P.currentPeriodEnd.toDate?fmtDay(P.currentPeriodEnd.toDate()):'';
  return `<div class="view-head"><div><span class="eyebrow">Mi plan</span><h1>Mis pagos</h1><p>Una sola inscripción para la formación completa de cinco niveles. Los niveles se abren a medida que avanzas.</p></div></div>
  ${grant&&!full?`<div class="card panel" style="margin-bottom:18px"><p style="margin:0">Tienes <b>acceso permanente hasta el Nivel ${grant}</b>, que ya pagaste. ${cuotas?'Tus cuotas abren los niveles siguientes.':'Para seguir con los niveles siguientes, inscríbete en la formación.'}</p></div>`:''}
  <div class="plans">
    <article class="card plan ${cuotas?'cur':''}">${cuotas?'<span class="pill prog tagc">Tu plan</span>':''}<span class="eyebrow">En cuotas</span><div class="price">55<small>USD al mes · ${total} cuotas</small></div>
      <ul><li>Cobro automático cada mes con tu tarjeta</li><li>Después de la cuota ${total} se deja de cobrar y la formación queda pagada</li><li>Los niveles se abren a medida que avanzas</li><li>Puedes pagar lo que falta al contado cuando quieras</li></ul>
      ${full?'':noplan?`<button class="btn btn-primary btn-sm" style="justify-self:start" data-checkout="cuotas">Inscribirme en cuotas</button>`:`<div class="bar"><i style="width:${paid/total*100}%"></i></div><span class="muted" style="font-size:.82rem">Cuota ${paid} de ${total}</span><button class="btn btn-ghost btn-sm" style="justify-self:start" data-checkout="portal">Cambiar tarjeta o cancelar</button>`}</article>
    <article class="card plan ${full?'cur':''}">${full?'<span class="pill done tagc">Tu plan</span>':''}<span class="eyebrow">${cuotas?'Pagar lo que falta':'Pago completo'}</span><div class="price">${full?499:contado}<small>USD una vez</small></div>
      <ul>${cuotas?`<li>Pagas al contado las ${total-paid} cuotas que te faltan</li><li>No se te cobra nada más</li>`:'<li>Un solo pago por toda la formación</li><li>Sin cobros mensuales</li>'}<li>Acceso garantizado hasta tu certificación</li></ul>
      ${full?'<span class="pill done" style="justify-self:start">Formación pagada</span>':`<button class="btn btn-primary btn-sm" style="justify-self:start" data-checkout="completo">${cuotas?'Pagar lo que falta':'Pagar la formación completa'}</button>`}</article>
  </div>
  <div class="cols">
    <section class="card panel"><h3>Historial de pagos</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Fecha</th><th>Detalle</th><th>Monto</th><th>Estado</th><th></th></tr></thead><tbody>
            ${PAYMENTS.map(p=>`<tr><td>${esc(p.d)}</td><td>${esc(p.c)}</td><td>${esc(p.a)} USD</td><td><span class="pill ${p.s==='ok'?'done':'bad'}">${p.s==='ok'?'Pagado':'Rechazado'}</span></td><td></td></tr>`).join('')||'<tr><td colspan="5" class="muted">Aún no tienes pagos registrados.</td></tr>'}
    </tbody></table></div></section>
    <section class="card panel"><h3>Próximo cobro</h3>
      ${full?'<p class="muted">No tienes cobros pendientes. Tu formación está pagada.</p>':noplan?'<p class="muted">Aún no estás inscrita en la formación. Elige cuotas o pago completo para abrir las clases.</p>':`<dl class="kv"><dt>Estado</dt><dd>${S.overdue?'Pago pendiente':P.cancelAtPeriodEnd?'Cancelada, sin más cobros':'Al día'}</dd><dt>Cuota</dt><dd>${paid} de ${total}</dd><dt>Monto</dt><dd>55 USD</dd>${next?`<dt>${P.cancelAtPeriodEnd?'Acceso hasta':'Próximo cobro'}</dt><dd>${next}</dd>`:''}</dl>`}
    </section>
  </div>`;
};

// El panel de la Maestra vive en su propio portal (/admin)
V.maestra=()=>'<div class="card empty">Abriendo el portal de la Maestra…</div>';

// Suscripción mensual: Stripe Checkout para suscribirse, portal de Stripe para tarjeta y cancelación
async function checkout(kind,btn){
  if(btn)btn.disabled=true;
  try{location.href=await CM.billing(kind)}
  catch(e){console.error(e);if(btn)btn.disabled=false;toast(e.message||'No se pudo abrir el pago. Inténtalo de nuevo.')}
}
