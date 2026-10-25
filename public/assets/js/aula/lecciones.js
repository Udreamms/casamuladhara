/* ---------- Contenido de las clases: curso/clases.js (protegido, se carga solo con acceso) ---------- */
/* ---------- estructura de las lecciones ---------- */

/* ---------- entradas de formularios y controles deslizantes ---------- */
function n2fiSync(){const p=n2fiPct();
 document.querySelectorAll('.n2fi-pct').forEach(e=>{e.textContent=p});document.querySelectorAll('.n2fi-fill').forEach(e=>{e.style.width=p+'%'});
 document.querySelectorAll('[data-n2lv]').forEach(e=>{e.textContent=n2fiLv(e.dataset.n2lv)});document.querySelectorAll('[data-n2var]').forEach(e=>{e.textContent=n2fiVar()})}
document.addEventListener('input',e=>{const t=e.target;if(!t.dataset)return;
 if(t.dataset.n2b!==undefined){RS.n2bv=+t.value;n2bUpd()}
 else if(t.dataset.n2z!==undefined){st('n2z',N2ZI.slice())[+t.dataset.n2z]=+t.value;n2zUpd()}
 else if(t.dataset.n2pc!==undefined){RS.n2pc=+t.value;n2pcUpd()}
 else if(t.dataset.n3c3bv!==undefined){RS.n3c3bv=+t.value;n3c3bvUpd()}
 else if(t.dataset.n2i!==undefined){FI()[t.dataset.n2i]=t.value;n2fiSync()}});

/* acciones de las clases interactivas */
function rxAct(p,el){const [a,k,v]=p;
 if(a==='set'){RS[k]=/^-?\d+$/.test(v)?+v:v;render(false)}
 else if(a==='tog'){const o=st(k,{});o[v]=!o[v];render(false)}
 else if(a==='flip'){const o=st(k,{});o[v]=!o[v];el.classList.toggle('on',!!o[v]);el.setAttribute('aria-pressed',!!o[v])}
 else if(a==='cell'){const o=st('cells'+k,{});o[v]=!o[v];render(false)}
 else if(a==='bd'){if(k==='add'){RS.bdN=Math.min(7,st('bdN',1)+1);RS.bdS=RS.bdN-1}else{RS.bdN=1;RS.bdS=0}render(false)}
 else if(a==='pr'){RS.pr=Math.max(0,Math.min(PRAYER.length-1,st('pr',0)+ +k));render(false)}
 else if(a==='qa'){const z=st('qz',{i:0,a:{}});if(z.a[z.i]===undefined){z.a[z.i]=+k;render(false)}}
 else if(a==='qn'){const z=st('qz',{i:0,a:{}});if(z.i>=QUIZ.length-1)z.fin=1;else z.i++;render(false)}
 else if(a==='qr'){RS.qz={i:0,a:{}};render(false)}
 else if(a==='n2o'){const o=st('n2o',{n:0,ord:[],msg:''});if(+k===o.n){o.n++;o.msg=''}else o.msg='Ese no es el siguiente paso. Piensa qué ocurre primero.';render(false)}
 else if(a==='n2or'){delete RS.n2o;render(false)}
 else if(a==='n2pr'){RS.n2pr=Math.max(0,Math.min(N2PRAYER.length-1,st('n2pr',0)+ +k));render(false)}
 else if(a==='n2fa'){const f=st('n2f',{i:0,a:null});if(f.a===null){f.a=+k;render(false)}}
 else if(a==='n2fn'){const f=st('n2f',{i:0,a:null});f.i=f.i>=3?0:f.i+1;f.a=null;render(false)}
 else if(a==='n2qa'){const z=st('n2qz',{i:0,a:{}});if(z.a[z.i]===undefined){z.a[z.i]=+k;render(false)}}
 else if(a==='n2qn'){const z=st('n2qz',{i:0,a:{}});if(z.i>=N2QUIZ.length-1)z.fin=1;else z.i++;render(false)}
 else if(a==='n2qr'){RS.n2qz={i:0,a:{}};render(false)}
 else if(a==='n2fs'){const o=FI();o[k]=o[k]===+v?undefined:+v;render(false)}
 else if(a==='n2ft'){const o=FI();const r=o[k]||(o[k]=[]);const i=r.indexOf(+v);if(i<0)r.push(+v);else r.splice(i,1);render(false)}
 else if(a==='n2fclr'){RS.n2fid={};RS.n2sent=0;render(false)}
 else if(a==='n2demo'){RS.n2fid=JSON.parse(JSON.stringify(N2FDEMO));render(false)}
 else if(a==='n2send'){RS.n2sent=1;render(false)}
 else if(a==='n2unsend'){RS.n2sent=0;render(false)}
 else if(a==='n2bv'){RS.n2bv=+k;render(false)}
 else if(a==='n2pcs'){RS.n2pc=+k;render(false)}
 else if(a==='n3pr'){RS[k]=n3clamp(st(k,0)+ +v,0,(N3LEN[k]||1)-1);render(false)}
 else if(a==='n3qa'){const z=st('n3q'+k,{i:0,a:{}});if(z.a[z.i]===undefined){z.a[z.i]=+v;render(false)}}
 else if(a==='n3qn'){const z=st('n3q'+k,{i:0,a:{}});if(z.i>=N3QZ[k].length-1)z.fin=1;else z.i++;render(false)}
 else if(a==='n3qr'){RS['n3q'+k]={i:0,a:{}};render(false)}
 else if(a==='n3rnd'){RS[k]=Math.floor(Math.random()*+v);render(false)}
 else if(a==='n3o'){const o=RS.n3ord;if(!o)return;if(+v===o.n){o.n++;o.msg=''}else o.msg='Ese no es el siguiente cuerpo. Piensa qué viene primero.';render(false)}
 else if(a==='n3or'){delete RS.n3ord;render(false)}
 else if(a==='n3c3eg'){const z=st('n3c3eg',{});if(z[k]===+v)delete z[k];else z[k]=+v;render(false)}
 else if(a==='n3c3egr'){delete RS.n3c3eg;render(false)}
 else if(a==='n3cal'){const c=st('n3cal',{});if(c[k]===+v)delete c[k];else c[k]=+v;render(false)}

 else if(a==='n3calp'){const P=PND.cal,m=P?N3CALM.indexOf(P.want):-1;if(m<0)RS.n3calmsg='Primero elige arriba el movimiento que hizo tu péndulo.';else{st('n3cal',{})[k]=m;RS.n3calmsg='';delete RS.n3sim}render(false)}
 else if(a==='n3simask'){const c=st('n3cal',{}),ks=Object.keys(c).map(Number),s=st('n3sim',{});let t;do{t=ks[Math.floor(Math.random()*ks.length)]}while(ks.length>1&&t===s.t);
  RS.n3sim={t,n:s.n||0,ok:s.ok||0};const P=PND.sim;if(P){P.want=N3CALM[c[t]];if(P.cur==='free')P.cur='rest'}render(false)}
 else if(a==='n3simpick'){const s=st('n3sim',{}),c=st('n3cal',{});if(s.pick===undefined&&s.t!==undefined){s.pick=+k;s.n=(s.n||0)+1;if(c[+k]===c[s.t])s.ok=(s.ok||0)+1;render(false)}}
 else if(window.RX&&RX[a])RX[a](k,v,el); // acciones propias de un nivel (p. ej. curso/n4.js)
 else if(a==='n3yn'){const [i,x]=v.split('_');const o=st(k,{});o[i]=o[i]===+x?undefined:+x;render(false)}
}
document.addEventListener('click',e=>{const r=e.target.closest('[data-rx]');if(r)rxAct(r.dataset.rx.split('|'),r)});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('g[data-rx],ellipse[data-rx]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.rsin;if(k){RS[k]=e.target.type==='checkbox'?e.target.checked:e.target.value;if(k==='n3nom'||k==='n3fn')document.querySelectorAll('.n3-nf').forEach(s=>s.innerHTML=n3nf())}});

function deckHTML(les,i){const n=les.slides.length;const kk=S.level+S.lesson.join()+i;const enter=(S.anim||S.lastDeck!==kk)?' enter':'';S.lastDeck=kk;S.anim=0;
 return `<div class="deck${les.nb?' nb':''}${enter}${S.full?' full':''}"><div class="dk-top"><span class="dk-brand"><svg><use href="#mark"/></svg><span>Casa Muladhara · Escuela de Formación Holística</span></span><span class="dk-tr"><span class="dk-step">Paso ${i+1} de ${n}</span><button class="dk-zoom" data-slide="zoom" aria-label="${S.full?'Cerrar pantalla ampliada':'Ampliar esta pantalla'}">${S.full?'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>Cerrar':'<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>Ampliar'}</button></span></div>
  <div class="dk-body">${les.nb?'<svg class="nb-fol" aria-hidden="true"><use href="#fol"/></svg><svg class="nb-leaf" aria-hidden="true"><use href="#leaf"/></svg>':''}${RICH[les.slides[i]]()}</div>
  <div class="dk-foot"><button class="btn btn-ghost btn-sm" data-slide="prev" ${i===0?'disabled':''}>Anterior</button>
  <div class="sl-dots">${les.slides.map((_,j)=>`<button data-slide="${j}" aria-label="Ir al paso ${j+1}" aria-current="${j===i}"></button>`).join('')}</div>
  ${i===n-1?`<button class="btn btn-primary btn-sm" data-slide="nextles">Siguiente clase</button>`:`<button class="btn btn-primary btn-sm" data-slide="next">Siguiente</button>`}</div></div>`}
