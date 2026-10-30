/* ---------- pieces ---------- */
function badgeSVG(b,on){
  const h=on?b.hue:'#9aa39c';
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="g${b.id}${on?1:0}" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="${h}" stop-opacity=".95"/><stop offset="1" stop-color="#1f3f32"/></radialGradient></defs>
  <circle cx="60" cy="60" r="56" fill="#f2c66d"/><circle cx="60" cy="60" r="51" fill="url(#g${b.id}${on?1:0})"/>
  <circle cx="60" cy="60" r="44" fill="none" stroke="#f2c66d" stroke-width="1" stroke-dasharray="2 4" opacity=".8"/>
  <svg x="32" y="22" width="56" height="56" style="color:#ece7d3"><use href="#mark"/></svg>
  <text x="60" y="94" text-anchor="middle" font-family="Josefin Sans,system-ui,sans-serif" font-weight="600" font-size="9" letter-spacing="2" fill="#f2c66d">NIVEL ${b.lvl}</text></svg>`;
}
function summitSVG(){return `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" fill="none" stroke="#f2c66d" stroke-width="2"/><circle cx="60" cy="60" r="48" fill="none" stroke="#f2c66d" stroke-width="1" stroke-dasharray="3 4"/><svg x="26" y="22" width="68" height="68" style="color:#f2c66d"><use href="#mark"/></svg><text x="60" y="100" text-anchor="middle" font-family="Josefin Sans,system-ui,sans-serif" font-weight="600" font-size="8" letter-spacing="2" fill="#f2c66d">INTEGRAL</text></svg>`}
const modePill=lv=>lv.mode==='pres'?'<span class="pill pres">Presencial</span>':'<span class="pill live">Online en vivo</span>';
const statusPill=lv=>({done:'<span class="pill done">Completado</span>',progress:'<span class="pill prog">En curso</span>',locked:'<span class="pill lock">Por desbloquear</span>'})[lv.status];
const icLock='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const photoCss=u=>typeof u==='string'&&/^https:\/\/[^\s"'()\\]+$/.test(u)?`background-image:url('${u}')`:'';
const av=(p,big)=>{const ph=photoCss(p.photo);const sz=big?'':' sm';
  return p.karen?`<span class="av${sz} karen${ph?' ph':''}" style="${ph}">${ph?'':'MH'}</span>`:`<span class="av${sz}${ph?' ph':''}" style="--c:${p.c||'#f2c66d'};${ph}">${ph?'':esc(p.ini||'')}</span>`};
const totalPct=()=>{const a=LEVELS.flatMap(allLessons);return Math.round(a.filter(x=>x.done).length/a.length*100)};

function pathHTML(){
  return `<div class="path">${LEVELS.map(lv=>`<button class="lvl ${lv.status==='locked'?'locked':''}" data-open-level="${lv.id}">
    <span class="n">${lv.n}</span><h3>${lv.title}</h3>
    <div style="display:flex;gap:6px;flex-wrap:wrap">${statusPill(lv)}</div>
    ${lv.status!=='locked'?`<div class="bar"><i style="width:${pct(lv)}%"></i></div>`:''}
    <span class="meta">${lv.dur}</span></button>`).join('')}
    <button class="lvl summit" data-go="insignias">${summitSVG()}<small>Certificación final</small><h3>Terapeuta Holístico Integral</h3></button></div>`;
}

/* ---------- vista gratis, clases en vivo y videos ---------- */
// Sin inscripción se ven los títulos del Nivel 1; de los demás niveles, solo nombre y duración
// cada alumna tiene sus propios niveles abiertos (p. ej. solo el Nivel 3)
// el Nivel 4 son cuatro cursos con su propio número (41 = 4.1 … 44 = 4.4): tiene el Nivel 4 si tiene alguno
const hasLv=n=>CM.isAdmin||S.lvls.has(n)||(n===4&&[41,42,43,44].some(x=>S.lvls.has(x)));
const modOpen=(lv,i)=>lv.n===4?hasLv(41+i):hasLv(lv.n);
// y dentro de cada curso la Maestra abre clase por clase: la lección "Clase 2 · …" del 4.1 es la clase 412
const lesClass=l=>Number((/^Clase (\d+)/.exec(l.t)||[])[1])||0;
const clsOpen=(lv,i,l)=>lv.n!==4||CM.isAdmin||!CM.cls||!lesClass(l)||CM.cls.includes((41+i)*10+lesClass(l));
const detailOpen=lv=>CM.isAdmin||S.paying||lv.n===1||hasLv(lv.n);
const CTA_TXT='Comienza tu formación: 9 cuotas de 55 USD';
const LIVE_OPEN_MIN=15;
const liveOf=key=>CM.agenda.find(a=>a.id===key);
const liveEnd=a=>a.start.toMillis()+(a.durationMin||90)*60000;
const liveState=a=>{const n=Date.now();return n<a.start.toMillis()-LIVE_OPEN_MIN*60000?'soon':n<=liveEnd(a)?'open':'done'};
const fmtWhen=a=>a.start.toDate().toLocaleString('es',{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'});
const fmtHour=ms=>new Date(ms).toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
const isHttps=u=>/^https:\/\/[^\s"<>]+$/i.test(u||'');
const keyLesson=key=>{const [id,i,j]=String(key).split('_');const lv=LEVELS.find(l=>l.id===id);const les=lv&&lv.modules[+i]&&lv.modules[+i].lessons[+j];return les?{lv,i:+i,j:+j,les}:null};
// YouTube, Vimeo y Google Drive se ven dentro del aula; cualquier otro enlace se abre aparte
function embedURL(u){try{const x=new URL(u);const h=x.hostname.replace(/^www\./,'');
  if(h==='youtu.be')return 'https://www.youtube-nocookie.com/embed/'+x.pathname.slice(1);
  if(h.endsWith('youtube.com')){const v=x.searchParams.get('v')||(x.pathname.match(/\/(?:live|embed|shorts)\/([\w-]+)/)||[])[1];if(v)return 'https://www.youtube-nocookie.com/embed/'+v}
  if(h.endsWith('vimeo.com')){const v=(x.pathname.match(/(\d{5,})/)||[])[1];if(v)return 'https://player.vimeo.com/video/'+v}
  if(h==='drive.google.com'){const v=(x.pathname.match(/\/d\/([\w-]+)/)||[])[1];if(v)return 'https://drive.google.com/file/d/'+v+'/preview'}
}catch(e){}return ''}
const playerMsg=inner=>`<div class="player"><svg class="motif"><use href="#mark"/></svg><div style="position:relative;display:grid;gap:12px;justify-items:center;text-align:center;padding:20px">${inner}</div></div>`;
const lightBtn='class="btn btn-primary btn-sm" style="background:#e9e4d0;color:#1f3f32"';
function videoHTML(u,label){const e=embedURL(u);
  if(e)return `<div class="player"><iframe src="${esc(e)}" title="${esc(label)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`;
  return playerMsg(`<b style="font:400 clamp(1.2rem,3vw,1.8rem)/1.2 var(--f-display)">${esc(label)}</b>${isHttps(u)?`<a ${lightBtn} href="${esc(u)}" target="_blank" rel="noopener">Ver el video</a>`:''}`)}
// la clase en vivo de una lección: antes, la fecha y el botón para entrar; después, la grabación
function liveHTML(key,les){const a=liveOf(key);if(!a)return '';const L=CM.liveLinks[key]||{};const st=liveState(a);
  if(st==='done'&&L.recordingUrl)return videoHTML(L.recordingUrl,'Grabación · '+les.t);
  const pill=t=>`<span class="pill live" style="color:#ece7d3;border-color:rgba(236,231,211,.4)">${t}</span>`;
  const title=`<b style="font:400 clamp(1.2rem,3vw,1.8rem)/1.2 var(--f-display)">${esc(les.t)}</b>`;
  const note=t=>`<span style="color:#b9c4b5;font-size:.88rem;max-width:30em">${t}</span>`;
  if(st==='done')return playerMsg(pill('Clase realizada')+title+note('La grabación de esta clase quedará aquí muy pronto.'));
  return playerMsg(pill(st==='open'?'En vivo ahora':'Próxima clase en vivo')+title+note(fmtWhen(a)+' · '+(a.durationMin||90)+' min')
    +(st==='open'&&isHttps(L.url)?`<a ${lightBtn} href="${esc(L.url)}" target="_blank" rel="noopener">Entrar a la clase</a>`:note('La sala se abre '+LIVE_OPEN_MIN+' minutos antes de la clase. La grabación queda aquí al terminar.')))}
const gcalLink=a=>{const f=ms=>new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g,'');return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(a.title+' · Casa Muladhara')+'&dates='+f(a.start.toMillis())+'/'+f(liveEnd(a))};
function liveDate(a){const d=a.start.toDate();return `<div class="date"><small>${d.toLocaleDateString('es',{weekday:'short'}).replace('.','')}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('es',{month:'short'}).replace('.','')}</small></div>`}
function liveActs(a){const k=keyLesson(a.id),L=CM.liveLinks[a.id]||{},open=liveState(a)==='open';
  if(!hasLv(a.level))return `<button class="btn btn-ghost btn-sm" data-go="pagos">Inscríbete</button>`;
  return (open&&isHttps(L.url)?`<a class="btn btn-primary btn-sm" href="${esc(L.url)}" target="_blank" rel="noopener">Entrar</a>`:'')
    +(k?`<button class="btn btn-ghost btn-sm" data-open-lesson="${k.lv.id},${k.i},${k.j}">Ver clase</button>`:'');}
const upcomingLive=()=>CM.agenda.filter(a=>liveEnd(a)>=Date.now());
const toLocalInput=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16);
