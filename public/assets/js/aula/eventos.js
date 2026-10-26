/* ---------- render + events ---------- */
let timer;
// Secciones cerradas por ahora para las alumnas (la Maestra sí entra)
const LOCKED_VIEWS=['recursos'];
const isLockedView=v=>LOCKED_VIEWS.includes(v)&&!CM.isAdmin;
const LOCK_SVG='<svg class="lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
function render(scrollTop=true){
  if(isLockedView(S.view))S.view='inicio';
  $('#nav').innerHTML=NAV.filter(x=>x[0]!=='maestra'||CM.isAdmin).map(([k,n,ic,c])=>`${k==='maestra'?'<span class="nav-label">Solo para la Maestra</span>':''}<button data-go="${k}" ${isLockedView(k)?'class="locked" aria-disabled="true" title="Próximamente"':''} ${(S.view===k||(S.view==='curso'&&k==='formacion'))?'aria-current="page"':''}><svg viewBox="0 0 24 24">${ic}</svg>${n}${isLockedView(k)?LOCK_SVG:''}${c?`<span class="count">${c}</span>`:''}</button>`).join('');
  $('#view').innerHTML=(CM.blocked?`<div class="alert"><div><b>Tu acceso está pausado</b><p>La Maestra pausó tu acceso a las clases. Escríbenos desde Ayuda si tienes dudas.</p></div></div>`:'')+(S.overdue&&S.view!=='maestra'?`<div class="alert"><div><b>Tu cuota está pendiente</b><p>Tu acceso a clases, grabaciones y materiales está pausado. Se reactiva apenas se registre el pago.</p></div><button class="btn btn-sm" data-checkout="portal">Actualizar mi pago</button></div>`:'')+V[S.view]();
  if(scrollTop)window.scrollTo(0,0);
  // Ampliar dura hasta que la alumna lo cierre; si la vista ya no tiene pasos (otra sección o una clase sin pasos), se suelta
  if(S.full&&!document.querySelector('.deck.full')){S.full=0;document.body.style.overflow=''}
  bindView();if(typeof pndMount==='function')pndMount();
}
function go(v){if(v==='maestra'){location.href='/staff';return}if(isLockedView(v)){toast('Los recursos estarán disponibles muy pronto.');closeSide();return}S.view=v;stopPlay();closeSide();render()}
function openLevel(id){const lv=LEVELS.find(l=>l.id===id);S.level=id;let pos=[0,0];
  const first=lv.modules.findIndex((m,i)=>modOpen(lv,i));if(first>0)pos=[first,0];
  outer:for(let i=0;i<lv.modules.length;i++)if(modOpen(lv,i))for(let j=0;j<lv.modules[i].lessons.length;j++){if(!lv.modules[i].lessons[j].done){pos=[i,j];break outer}}
  S.lesson=pos;S.tab='temas';S.t=0;stopPlay();S.view='curso';closeSide();render()}
function stopPlay(){S.playing=false;clearInterval(timer)}
function bindView(){
  const play=()=>{const lv=LEVELS.find(l=>l.id===S.level);const les=lv.modules[S.lesson[0]].lessons[S.lesson[1]];const dur=toSec(les.len);
    S.playing=!S.playing;clearInterval(timer);
    if(S.playing)timer=setInterval(()=>{S.t=Math.min(dur,S.t+dur/90);updPlayer(les,dur);if(S.t>=dur){stopPlay();render(false)}},500);
    render(false)};
  $('#play')&&($('#play').onclick=play);$('#play2')&&($('#play2').onclick=play);
  const tr=$('#track');if(tr)tr.onclick=e=>{const r=tr.getBoundingClientRect();const lv=LEVELS.find(l=>l.id===S.level);const les=lv.modules[S.lesson[0]].lessons[S.lesson[1]];S.t=(e.clientX-r.left)/r.width*toSec(les.len);render(false)};
  const n=$('#notes');if(n){n.oninput=()=>{CM.notes[lkey()]=n.value};$('#save-notes').onclick=()=>CM.saveNote(lkey(),n.value).then(()=>toast('Notas guardadas')).catch(fail)}
  const qf=$('#qa-form');if(qf)qf.onsubmit=e=>{e.preventDefault();const v=$('#qa-in').value.trim();if(!v)return;CM.ask(lkey(),v).then(()=>{render(false);toast('Pregunta enviada a la Maestra Holística')}).catch(fail)};
  const md=$('#mark-done');if(md)md.onclick=()=>{const lv=LEVELS.find(l=>l.id===S.level);const les=lv.modules[S.lesson[0]].lessons[S.lesson[1]];const nv=!les.done;md.disabled=true;CM.setDone(lkey(),nv).then(()=>{les.done=nv;refreshDerived();render(false);toast(nv?'Clase marcada como vista':'Clase marcada como no vista')}).catch(e=>{md.disabled=false;fail(e)})};
  const nx=$('#next-les');if(nx)nx.onclick=()=>{const lv=LEVELS.find(l=>l.id===S.level);let [i,j]=S.lesson;j++;if(j>=lv.modules[i].lessons.length){i++;j=0}if(i>=lv.modules.length){toast('Terminaste las clases de este nivel');return}S.lesson=[i,j];S.openMods[lv.id+i]=true;S.t=0;stopPlay();render()};
  const cp=$('#composer');if(cp)cp.onsubmit=e=>{e.preventDefault();const v=$('#post-in').value.trim();if(!v)return;CM.post(S.ch,v).then(()=>{$('#post-in').value='';toast('Publicado')}).catch(fail)};
  document.querySelectorAll('form[data-reply]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const inp=f.querySelector('input');const v=inp.value.trim();if(!v)return;CM.reply(f.dataset.reply,v,(POSTS.find(p=>p.id===f.dataset.reply)||{}).ch||S.ch).then(()=>{inp.value=''}).catch(fail)});
  const rl=$('#rlvl');if(rl)rl.onchange=()=>{S.resLvl=rl.value;render(false)};
  const rq=$('#rq');if(rq)rq.oninput=()=>{S.resQ=rq.value;const pos=rq.selectionStart;render(false);const r2=$('#rq');r2.focus();r2.setSelectionRange(pos,pos)};
  const tk=$('#ticket');if(tk)tk.onsubmit=e=>{e.preventDefault();const m=$('#tk-msg').value.trim();if(!m){toast('Escribe tu mensaje antes de enviarlo');return}CM.ticket($('#tk-topic').value,m).then(()=>{S.sent=true;render(false);toast('Mensaje enviado')}).catch(fail)};
  const sq=$('#sq');if(sq)sq.oninput=()=>{const q=sq.value.toLowerCase().trim();if(!q){render(false);return}const hits=Object.values(FAQ).flatMap(v=>v.q).filter(([a,b])=>(a+b).toLowerCase().includes(q));$('#faq').innerHTML=hits.length?hits.map(([a,b])=>`<details open><summary>${a}</summary><p>${b}</p></details>`).join(''):'<p class="muted" style="padding:14px 4px">No encontramos respuestas. Escríbenos con el formulario.</p>'};
  const lf=$('#live-form');if(lf){lf.onsubmit=e=>{e.preventDefault();const k=keyLesson(lf.dataset.key);const start=new Date($('#lv-start').value);const url=$('#lv-url').value.trim(),rec=$('#lv-rec').value.trim();
      if(isNaN(start))return toast('Indica la fecha y la hora de la clase');if((url&&!isHttps(url))||(rec&&!isHttps(rec)))return toast('Los enlaces deben empezar con https://');
      CM.saveLive(lf.dataset.key,{level:+lf.dataset.level,title:k?k.les.t:'Clase en vivo',start,durationMin:Math.max(15,Math.min(600,+$('#lv-dur').value||90)),url,recordingUrl:rec}).then(()=>{render(false);toast('Clase en vivo guardada')}).catch(fail)};
    const ld=$('#lv-del');if(ld)ld.onclick=()=>{if(confirm('¿Quitar la clase en vivo de esta lección?'))CM.deleteLive(lf.dataset.key).then(()=>{render(false);toast('Clase en vivo quitada')}).catch(fail)}}
  document.querySelectorAll('form[data-answer]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const q=CM.pending[+f.dataset.answer];const v=f.querySelector('textarea').value.trim();if(!q||!v)return;const k=keyLesson(q.lessonKey);
    f.querySelector('button').disabled=true;CM.answer(q,v,k?k.les.t:'tu clase').then(()=>{render(false);toast('Respuesta enviada')}).catch(e=>{f.querySelector('button').disabled=false;fail(e)})});
  const wv=$('#wv-form');if(wv)wv.onsubmit=e=>{e.preventDefault();const u=$('#wv-url').value.trim();if(u&&!isHttps(u))return toast('El enlace debe empezar con https://');CM.saveConfig({welcomeVideo:u}).then(()=>{render(false);toast('Video de bienvenida guardado')}).catch(fail)};
  const cv=$('#cert-preview');if(cv)cv.onclick=certModal;
  const ap=$('#apply');if(ap)ap.onsubmit=e=>{e.preventDefault();S.applied=true;render();toast('Postulación enviada a Karen')};
  const ar=$('#app-reset');if(ar)ar.onclick=()=>{S.applied=false;render(false)};
}
function updPlayer(les,dur){const f=$('#tfill');if(!f)return;f.style.width=S.t/dur*100+'%';$('#tnow').textContent=fmt(S.t);const c=$('#chap-now');if(c&&les.topics.length)c.textContent=les.topics[curChapter(les)].t;
  document.querySelectorAll('.chapters li').forEach((li,i)=>li.classList.toggle('now',i===curChapter(les)))}

document.addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;const d=t.dataset;
  if(d.go)go(d.go);
  else if(d.openLevel)openLevel(d.openLevel);
  else if(d.openLesson){const [id,i,j]=d.openLesson.split(',');S.level=id;S.lesson=[+i,+j];S.view='curso';S.tab='temas';S.t=0;stopPlay();render()}
  else if(d.les){if(t.getAttribute('aria-disabled')){toast('Esta clase se abre al completar el nivel anterior');return}S.lesson=d.les.split(',').map(Number);S.t=0;S.tab='temas';stopPlay();render(false);if(innerWidth<1100)window.scrollTo({top:0,behavior:'smooth'})}
  else if(d.slide!==undefined)goSlide(d.slide);
  else if(d.mod){const lv=S.level;const k=lv+d.mod;const cur=t.getAttribute('aria-expanded')==='true';S.openMods[k]=!cur;render(false)}
  else if(d.tab){S.tab=d.tab;render(false)}
  else if(d.seek){S.t=+d.seek;if(!S.playing){S.playing=false;$('#play')&&$('#play').click()}else render(false)}
  else if(d.toast)toast(d.toast);
  else if(d.checkout)checkout(d.checkout,t);
  else if(d.badge)badgeModal(d.badge);
  else if(d.ch){S.ch=d.ch;render(false)}
  else if(d.like){t.disabled=true;CM.toggleLike(d.like).catch(e=>{t.disabled=false;fail(e)})}
  else if(d.delpost){if(confirm('¿Eliminar esta publicación?'))CM.deletePost(d.delpost).catch(fail)}
  else if(d.focusReply){const i=$('#r'+d.focusReply);i&&i.focus()}
  else if(d.rtype){S.resType=d.rtype;render(false)}
  else if(d.topic){S.supTopic=d.topic;render(false)}
});

/* modal */
// Tienda: el pedido le llega a la Maestra como mensaje (Mensajes de ayuda en su portal) y lo coordina con la alumna
function openShop(id){const p=SHOP.find(x=>x.id===id);if(!p)return;
  openModal(`<span class="eyebrow">Tienda</span><h3>${p.name}</h3><p class="muted" style="margin:0">${p.price} ${p.unit}. Envíanos tu pedido y te escribimos para coordinar el pago y la entrega.</p>
  <form class="ticket" id="shop-form" style="margin-top:12px"><label for="sh-qty">Cantidad<select id="sh-qty">${[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')}</select></label>
  <label for="sh-del">Entrega<select id="sh-del"><option>Despacho a domicilio</option><option>Retiro en consulta</option></select></label>
  <label for="sh-note">Comentario (opcional)<textarea id="sh-note" style="min-height:80px" placeholder="Dirección, ciudad o lo que necesites contarnos"></textarea></label>
  <button class="btn btn-primary">Enviar pedido</button></form>`);
  $('#shop-form').onsubmit=e=>{e.preventDefault();const b=e.target.querySelector('button');b.disabled=true;
    const note=$('#sh-note').value.trim();
    const msg=`Pedido: ${$('#sh-qty').value} × ${p.name} (${p.price} ${p.unit} c/u).\nEntrega: ${$('#sh-del').value}.${note?'\nComentario: '+note:''}`;
    CM.ticket('Pedido de la tienda',msg.slice(0,4000)).then(()=>{closeModal();toast('¡Recibimos tu pedido! Te escribiremos para coordinar el pago y la entrega.')}).catch(err=>{b.disabled=false;fail(err)})};
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-shop]');if(b)openShop(b.dataset.shop)});
function openModal(html){$('#modal').innerHTML='<button class="x" aria-label="Cerrar" id="mx">×</button>'+html;$('#scrim').hidden=false;$('#mx').onclick=closeModal;$('#mx').focus()}
function closeModal(){$('#scrim').hidden=true}
$('#scrim').addEventListener('click',e=>{if(e.target.id==='scrim')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(S.full){S.full=0;document.body.style.overflow='';render(false)}closeModal();$('#pop').hidden=true;closeSide()}
  if((e.key==='ArrowRight'||e.key==='ArrowLeft')&&S.view==='curso'&&$('#scrim').hidden&&!/INPUT|TEXTAREA|SELECT|VIDEO/.test(document.activeElement.tagName)&&curLesson().slides){goSlide(e.key==='ArrowRight'?'next':'prev')}});
function badgeModal(id){const b=BADGES.find(x=>x.id===id);const lv=LEVELS.find(l=>l.n===b.lvl);
  openModal(`<div class="modal-b">${badgeSVG(b,!!b.earned).replace('<svg ','<svg class="big" style="'+(b.earned?'':'filter:grayscale(1);opacity:.5')+'" ')}<span class="eyebrow">${b.sub}</span><h3>${b.name}</h3>
  <p>${b.earned?`Obtenida el ${b.earned} al completar todas las clases y la práctica final. Otorgada por la Maestra Holística, Casa Muladhara.`:`Se obtiene al completar ${lv.title}${b.lvl===4?' en esta especialización':''} y su práctica final.`}</p>
  <div class="acts">${b.earned?`<button class="btn btn-primary btn-sm" data-toast="Aquí se comparte en Instagram, Facebook o LinkedIn">Compartir</button><button class="btn btn-ghost btn-sm" data-toast="Enlace de verificación copiado">Copiar enlace de verificación</button>`:`<button class="btn btn-primary btn-sm" data-open-level="${lv.id}">Ver el nivel</button>`}</div></div>`)}
document.getElementById('modal').addEventListener('click',e=>{const t=e.target.closest('[data-open-level]');if(t)closeModal()});
function certModal(){openModal(`<div class="modal-b"><span class="eyebrow">Vista previa</span><div class="certificate"><svg class="wm"><use href="#mark"/></svg><span class="k">Escuela de Formación Holística · Casa Muladhara</span><h4>Certificado de</h4><h4 style="font-size:clamp(1.1rem,3.8vw,1.7rem)">Terapeuta Holístico Integral</h4><p>se otorga a</p><div class="name">${esc(ME.name)}</div><p>por completar los cinco niveles de la formación: Péndulo Hebreo, Limpieza energética de casas y espacios, Radiestesia y Sanación del Alma, Especializaciones en Radiestesia y Tarot Terapéutico.</p><div class="sig"><div>Karen Oyarce<br>Maestra Holística</div><div>Código de verificación<br>CM-THI-2027-0142</div></div></div>
  <p>Así se verá tu certificado al terminar. Te faltan los niveles 3, 4 y 5.</p></div>`)}

/* shell */
function closeSide(){$('#side').classList.remove('open');const s=document.querySelector('.scrim-side');s&&s.remove()}
$('#menu-btn').onclick=()=>{$('#side').classList.add('open');const s=document.createElement('div');s.className='scrim-side';s.onclick=closeSide;document.body.appendChild(s)};
$('#logout').onclick=()=>{stopPlay();closeSide();closeModal();CM.signOut()};
$('#bell').onclick=e=>{e.stopPropagation();const p=$('#pop');p.hidden=!p.hidden;$('#bell-dot').hidden=true};
document.addEventListener('click',e=>{if(!e.target.closest('#pop')&&!e.target.closest('#bell'))$('#pop').hidden=true});
$('#theme-btn').onclick=()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.dataset.theme=dark?'light':'dark'};
$('#gsearch').addEventListener('keydown',e=>{if(e.key==='Enter'){S.resQ=e.target.value;S.resType='Todos';S.resLvl='0';e.target.value='';go('recursos')}});
