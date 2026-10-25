/* ---------- conexión con la cuenta (Firestore) ---------- */
const lkey=()=>S.level+'_'+S.lesson.join('_');
const person=(n)=>({who:n});
const fail=e=>{console.error(e);toast(e&&e.code==='permission-denied'?'No tienes permiso para hacer eso.':'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.')};
// /aula?embed=1: el aula dentro del portal de la Maestra (sin menú ni barra superior, ver base.css)
if(new URLSearchParams(location.search).has('embed'))document.documentElement.classList.add('embed');
const fmtDay=d=>d.toLocaleDateString('es',{day:'numeric',month:'short',year:'numeric'});

// primera clase pendiente del nivel más avanzado que ya tiene abierto
function resumePoint(){
  const open=LEVELS.filter(l=>l.status!=='locked');
  let started=false;
  for(const lv of open){
    for(let i=0;i<lv.modules.length;i++)for(let j=0;j<lv.modules[i].lessons.length;j++){
      if(lv.modules[i].lessons[j].done)started=true;
      else return {lv,i,j,les:lv.modules[i].lessons[j],started};
    }
  }
  const lv=open[open.length-1]||LEVELS[0];const i=0,j=0;
  return {lv,i,j,les:lv.modules[i].lessons[j],started:true};
}

// estados de nivel e insignias salen del avance real de la alumna
function refreshDerived(){
  S.paying=CM.isAdmin||CM.profile.plan==='completo'||(CM.profile.plan==='mensual'&&CM.profile.paymentStatus==='ok');
  LEVELS.forEach(lv=>{lv.status=!hasLv(lv.n)?'locked':(pct(lv)===100?'done':'progress')});
  const lastDone=lv=>{let t=0;lv.modules.forEach((m,i)=>m.lessons.forEach((l,j)=>{const d=CM.doneAt[lv.id+'_'+i+'_'+j];if(d&&d.toMillis)t=Math.max(t,d.toMillis())}));return t?fmtDay(new Date(t)):'hoy'};
  BADGES.forEach(b=>{
    const lv=LEVELS.find(l=>l.n===b.lvl);
    let ok;
    if(b.lvl===4){const idx={b4c:0,b4a:1,b4b:2,b4d:3}[b.id];ok=lv.modules[idx].lessons.every(l=>l.done)}
    else ok=pct(lv)===100;
    b.earned=ok?lastDone(lv):undefined;
  });
  S.overdue=CM.profile.paymentStatus==='overdue';
  S.plan=CM.profile.plan==='completo'?'completo':(CM.profile.plan==='mensual'?'mensual':'none');
  PAYMENTS=CM.payments.map(p=>({d:p.paidAt&&p.paidAt.toDate?fmtDay(p.paidAt.toDate()):(p.createdAt&&p.createdAt.toDate?fmtDay(p.createdAt.toDate()):''),c:p.concept||'Pago',a:p.amount||0,s:p.status==='paid'||p.status==='ok'?'ok':'failed',kind:p.kind}));
}

function renderNotifs(){
  const ul=$('#notif-list');if(!ul)return;
  ul.innerHTML=CM.notifications.length?CM.notifications.map(n=>`<li><span class="av sm karen">MH</span><div>${esc(n.text||'')}<small>${esc(n.when||'')}</small></div></li>`).join(''):'<li><div class="muted">Aún no tienes notificaciones.</div></li>';
  $('#bell-dot').hidden=!CM.notifications.some(n=>n.read===false);
}

// carga el contenido nivel por nivel (curso/n1.js, n2.js…); devuelve hasta qué nivel quedó disponible
const COURSE_FILES=[1,2,3,4,5];
const loadScript=src=>new Promise(res=>{const s=document.createElement('script');s.src=src;s.onload=()=>res(true);s.onerror=()=>res(false);document.head.appendChild(s)});
async function loadCourse(lvl){let ok=0;for(const n of COURSE_FILES.filter(n=>n<=lvl)){if(!await loadScript('curso/n'+n+'.js'))return ok;ok=n}return lvl}

// nombre y foto de la cuenta en el menú y en el resto del aula
function syncMe(){
  const p=CM.profile;ME={name:p.name,ini:p.ini,c:p.c,photo:p.photoURL||''};
  const a=$('#me-av'),ph=photoCss(ME.photo);
  a.className='av'+(ph?' ph':'');a.style.cssText='--c:'+ME.c+';'+ph;a.textContent=ph?'':ME.ini;
  $('#me-name').textContent=ME.name;
}
async function openProfile(){
  openModal('<span class="eyebrow">Mi cuenta</span><h3>Mi perfil</h3><p class="muted" style="margin:0">Cambia tu nombre, tus datos y tu foto. Se ven en la comunidad. El correo no se puede cambiar.</p><div id="pf-box" style="margin-top:12px"></div>');
  const {mountProfileEditor}=await import('./assets/js/profile.js');
  const p=CM.profile;
  mountProfileEditor($('#pf-box'),{profile:{displayName:p.displayName||p.name,photoURL:p.photoURL||'',phone:p.phone||'',country:p.country||'',bio:p.bio||'',color:p.c},
    api:CM.editor.api,hasGoogle:CM.editor.hasGoogle,toast,
    onChange:P=>{CM.applyProfile(P);syncMe();render(false)}});
}
$('#me-card').onclick=openProfile;
$('#me-card').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProfile()}};
document.addEventListener('click',e=>{if(e.target.closest('#edit-profile'))openProfile()});

window.cmStart=async function(cm){
  syncMe();
  // los datos de ejemplo del diseño original no se muestran: todo parte en blanco y se llena con su avance real
  LEVELS.forEach(lv=>lv.modules.forEach((m,i)=>m.lessons.forEach((l,j)=>{l.done=!!cm.progress[lv.id+'_'+i+'_'+j]})));
  // el contenido de las clases solo se descarga con acceso (middleware.js lo exige en el servidor)
  // el código de cada nivel usa piezas de los anteriores: se carga hasta el más alto, pero solo se abren los suyos
  if(cm.lvl>0)S.lvl=await loadCourse(cm.lvl);
  S.lvls=new Set(cm.lvls.filter(n=>n<=S.lvl));
  refreshDerived();
  if(S.lvl<cm.lvl)toast('No se pudo cargar el contenido de las clases. Recarga la página.');
  if(cm.paid==='ok')toast('¡Gracias! Estamos confirmando tu pago; tu aula se actualiza en unos segundos.');
  $('#me-sub').textContent=cm.isAdmin?'Maestra Holística':'Estudiante · Nivel '+Math.max(1,...LEVELS.filter(l=>l.status!=='locked').map(l=>l.n));
  renderNotifs();
  cm.onPosts=()=>{POSTS=cm.posts;const a=document.activeElement;const typing=a&&/INPUT|TEXTAREA/.test(a.tagName)&&a.value;if(!typing&&['comunidad','inicio'].includes(S.view))render(false)};
  POSTS=cm.posts;
  // /aula?nivel=radiestesia&clase=2-3 abre esa clase (lo usa el portal de la Maestra)
  const q=new URLSearchParams(location.search),dl=LEVELS.find(l=>l.id===q.get('nivel'));
  if(dl){const [i,j]=(q.get('clase')||'').split('-').map(Number);const ok=dl.modules[i]&&dl.modules[i].lessons[j];
    S.level=dl.id;S.lesson=ok?[i,j]:[0,0];S.openMods[dl.id+S.lesson[0]]=true;S.tab='temas';S.view='curso'}
  $('#login').hidden=true;
  render();
};
