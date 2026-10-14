// Casa Muladhara · contenido del Nivel 3 (solo con acceso a este nivel; lo exige middleware.js).
// Script clásico: sus constantes quedan en el ámbito global que usa aula.html. Se carga después de los niveles anteriores.
/* ---------- Nivel 3 interactivo ---------- */
const N3MAN=[
 ['LAM',['Yo estoy.','Estoy aquí.','Soy seguro/a.'],'Base de la columna','Une las puntas de los pulgares e índices.'],
 ['VAM',['Yo siento.','Acepto mis emociones.','Fluyo con placer.'],'Bajo vientre','Une las puntas de los dedos medios y anulares.'],
 ['RAM',['Yo hago.','Tengo poder.','Confío en mí.'],'Ombligo','Entrelaza los dedos y coloca los pulgares juntos, apuntando hacia arriba.'],
 ['YAM',['Yo amo.','Doy y recibo amor.','Estoy en paz.'],'Centro del pecho','Une las palmas de las manos frente al corazón.'],
 ['HAM',['Yo hablo.','Me expreso con verdad.','Escucho y soy escuchado/a.'],'Garganta','Une las puntas de los dedos índices con los pulgares.'],
 ['OM',['Yo veo.','Confío en mi intuición.','Tengo claridad.'],'Entrecejo','Une las puntas de los dedos medios entre sí.'],
 ['SILENCIO',['Después de OM, permanece en silencio para conectar con la conciencia superior.'],'Corona de la cabeza','Entrelaza los dedos y coloca las manos sobre la parte superior de tu cabeza.']];
const N3GIRO=[['Antihorario · limpiar','Para limpiar, liberar bloqueos, descargar energía densa y soltar lo que ya no sirve.','ccw'],['Horario · activar y equilibrar','Para activar, armonizar, equilibrar y favorecer el flujo del prana (energía vital).','cw']];
RICH.n3mantras=()=>{const s=st('n3m',0),g=st('n3g',0);const c=CHAKRAS[s],m=N3MAN[s],G=N3GIRO[g];
 const turn=`<svg class="n3-turn ${G[2]}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="n3-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></g></svg>`;
 return dkH('Clase 2','Mantras de los chakras','Para trabajar con las manos. Toca un chakra para ver su mantra, su afirmación y su mudra.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${CHAKRAS.map((x,i)=>`<button class="sel" ${rxa('set','n3m',i)} ${pressed(i===s)}><i class="dot" style="background:${x.c}"></i><span><b>${i+1}. ${x.n}</b><small>${x.s} · ${N3MAN[i][2]}</small></span></button>`).join('')}</div>
  <div class="detail" style="border-left:6px solid ${c.c}"><span class="eyebrow">Chakra ${s+1} · ${c.s}</span><div class="n3-mantra">${m[0]}</div>${m[1].length>1?`<div class="dk-chips">${m[1].map(x=>`<span class="tg">${x}</span>`).join('')}</div>`:`<p>${m[1][0]}</p>`}<figure class="c2-mud" style="--c:${c.c}"><img src="${N3P}c2/mudra${s+1}.webp" alt="Mudra del chakra ${c.n}: ${m[3]}"><figcaption><b>Mudra (con las manos):</b> ${m[3]}</figcaption></figure></div></div>
  <div><div class="dk-sub">¿En qué sentido girar? · depende de la intención y del momento del trabajo</div>${chipRow('n3g',N3GIRO.map(x=>x[0]),g)}</div>
  <div class="detail"><div style="display:flex;gap:14px;align-items:center">${turn}<div><h3>${G[0]}</h3><p>${G[1]}</p></div></div></div>
  <div class="dk-sub">Practica con el chakra ${s+1} · ${c.n}</div>${n3ck('n3mk'+s,[['','Respira profundo y enraíza: siente tus pies conectados a la Tierra.'],['','Con tu péndulo pregunta: ¿qué necesita este chakra? ¿en qué dirección trabajar? ¿cuántos giros?'],['','Forma el mudra: '+m[3]],['','Limpia: gira en sentido antihorario repitiendo '+m[0]+'.'],['','Activa y equilibra: gira en sentido horario manteniendo '+m[0]+' y tu intención de amor.'],['','Agradece, permanece unos instantes en silencio y enraíza.']],['Sigue los pasos en orden; márcalos a medida que los hagas.','¡Chakra trabajado! Pasa al siguiente cuando estés lista.'])}
  <div class="dk-call warn"><b>Confirma con tu péndulo:</b> ¿Qué necesita este chakra? ¿En qué dirección trabajar? ¿Cuántos giros requiere?</div>
  <div class="dk-grid c2"><div class="pill-card"><b>Antes de comenzar</b><p>Respira profundo, mantén tu intención y conecta con tu corazón. Enraíza tu energía sintiendo tus pies conectados a la Tierra.</p></div><div class="pill-card"><b>Al finalizar</b><p>Agradece por el trabajo realizado. Permanece unos instantes en silencio. Enraíza y regresa al aquí y ahora.</p></div></div>
  <p class="dk-note" style="text-align:center;font-style:italic">La energía se equilibra cuando la intención es amor. Cada persona es única y la energía siempre guía.</p>`};
RICH.n3mposter=()=>dkH('Clase 2','Lámina: mantras de los chakras','Para guardar o imprimir.')+
 `<figure class="dk-fig"><img class="dk-img" src="${N3P}mantras.webp" alt="Mantras de los chakras para trabajar con las manos: mantra, mudra y sentido de giro" width="1536" height="1024" decoding="async"></figure>
  <div class="dk-cta"><a class="btn btn-ghost btn-sm" href="${N3P}print/mantras_chakras.pdf" target="_blank" rel="noopener">Abrir PDF</a></div>`;
RICH.n3mvideo=()=>dkH('Clase 2','Video de apoyo','Un recorrido visual por los chakras para acompañar esta clase.')+
 `<video class="dk-video" controls preload="metadata" poster="${N3P}clase2_video_poster.webp" src="${N3P}clase2_video.mp4">Tu navegador no puede reproducir este video.</video><p class="dk-note">Duración: 7 min 32 s.</p>`;


/* ---------- Nivel 3 · Radiestesia y Sanación del Alma · clases interactivas ---------- */
Object.assign(IC,{
 estrella:'<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>',
 luna:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 ojo:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 ola:'<path d="M2 9c3-3 5 3 8 0s5 3 8 0 3 0 4 0M2 15c3-3 5 3 8 0s5 3 8 0 3 0 4 0"/>',
 libro:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
 camino:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
 check:'<path d="m5 12 4.5 4.5L19 7"/>',
 arbol:'<path d="M12 21v-7M12 14c-4 0-6-3-6-6 0-4 3-6 6-6s6 2 6 6c0 3-2 6-6 6z"/>',
 agua:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 incienso:'<path d="M12 3c-2 2 2 3 0 5M8 21h8M10 21v-7h4v7"/>',
 sonido:'<path d="M4 9v6h4l5 4V5L8 9zM16 9c1.5 1.2 1.5 4.8 0 6M18.5 6.5c3 2.7 3 8.3 0 11"/>',
 lupa:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
 diana:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>'
});
const N3PAL=['#ecd2b0','#a9cfe0','#cdbcab','#e3b574','#d3deaa','#b0cfa8','#e1cf94','#d49a84','#bdb8e0','#9fd3d8','#eabda0','#c8dcb8'];
const N3LEN={},N3QZ={};
const q3=s=>s.split('|').map(x=>x.split('~'));
const n3clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const n3nf=()=>{const n=st('n3nom',''),f=st('n3fn','');return (n||f)?esc(n+(n&&f?' · ':'')+f):'(nombre completo y fecha de nacimiento)'};
const n3sub=s=>s.replace(/\{NF\}/g,'<span class="n3-nf">'+n3nf()+'</span>');

/* ----- componentes ----- */
const n3flip=(key,items,cls,h)=>{const o=st(key,{});
 return `<div class="dk-grid ${cls||'c3'}">${items.map((x,i)=>`<button class="flip ${o[i]?'on':''}" ${rxa('flip',key,i)} ${pressed(o[i])}${h?` style="height:${h}px"`:''}><span><span class="f">${ic(x[0],32)}<b>${x[1]}</b><em>Toca para ver</em></span><span class="b">${x[2]}</span></span></button>`).join('')}</div>`};
const n3sel=(key,items,o)=>{o=o||{};const s=n3clamp(st(key,0),0,items.length-1);const x=items[s];
 return `<div class="dk-split" style="align-items:start"><div class="sel-list">${items.map((y,i)=>`<button class="sel" ${rxa('set',key,i)} ${pressed(i===s)}>${y[0]?ic(y[0],24):`<span class="k n2-k">${i+1}</span>`}<b>${y[1]}</b></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">${o.eb||'Punto'} ${s+1} de ${items.length}</span><h3>${x[1]}</h3>${x[2]?`<p${o.it?' style="font-family:var(--f-display);font-style:italic;font-size:1.08rem"':''}>${x[2]}</p>`:''}${x[3]||''}
 ${o.nav?`<div class="row"><button class="btn btn-ghost btn-sm" ${rxa('set',key,Math.max(0,s-1))} ${s===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('set',key,Math.min(items.length-1,s+1))} ${s===items.length-1?'disabled':''}>Siguiente</button></div>`:''}</div></div>`};
const n3ck=(key,items,msgs)=>{const o=st(key,{});const n=Object.values(o).filter(Boolean).length,N=items.length;
 return `<div class="sel-list">${items.map((x,i)=>`<button class="ck" ${rxa('tog',key,i)} ${pressed(o[i])}><span class="box"></span>${x[0]?ic(x[0],22):''}<span>${x[1]}</span></button>`).join('')}</div>
 <div class="prog"><span>${n} de ${N}</span><div class="bar"><i style="width:${n/N*100}%"></i></div></div>${msgs?`<div class="dk-call${n===N?'':' warn'}">${n===N?msgs[1]:msgs[0]}</div>`:''}`};
const n3pray=(key,lines,o)=>{o=o||{};N3LEN[key]=lines.length;const i=n3clamp(st(key,0),0,lines.length-1),full=st(key+'F',0);
 const fx=t=>n3sub(t);
 return (o.name?`<div class="dk-grid c2"><label class="n3-lab">Nombre completo<input type="text" data-rsin="n3nom" placeholder="Tu nombre y apellidos" value="${esc(st('n3nom',''))}"></label><label class="n3-lab">Fecha de nacimiento<input type="text" data-rsin="n3fn" placeholder="dd/mm/aaaa" value="${esc(st('n3fn',''))}"></label></div>`:'')+
 chipRow(key+'F',['Paso a paso','Texto completo'],full)+
 (full?`<div class="detail" style="gap:12px">${lines.map(x=>`<p style="font-family:var(--f-display);font-size:1.08rem;font-style:italic">${fx(x)}</p>`).join('')}</div>`
 :`<div class="breath" aria-hidden="true"></div>
  <div class="detail" style="text-align:center;min-height:170px;align-content:center"><span class="eyebrow">${i+1} de ${lines.length}</span><p style="font-size:1.15rem;font-family:var(--f-display);font-style:italic">${fx(lines[i])}</p></div>
  <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('n3pr',key,-1)} ${i===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('n3pr',key,1)} ${i===lines.length-1?'disabled':''}>Siguiente frase</button></div>`)};
const n3area=(k,label,ph)=>`<label class="n3-lab">${label}<textarea data-rsin="${k}" placeholder="${ph||'Escribe aquí…'}">${esc(st(k,''))}</textarea></label>`;
const n3priv='<p class="dk-note" style="text-align:center">Es tu práctica personal: no se envía a nadie. Anótalo también en tu cuaderno.</p>';
const n3quiz=(id,Q,msgs)=>{N3QZ[id]=Q;const z=st('n3q'+id,{i:0,a:{}});
 if(z.fin){const sc=Q.filter((x,i)=>z.a[i]===x.a).length;
  return dkH('Repaso','¡Terminaste!')+`<div class="detail" style="text-align:center;justify-items:center"><span class="qscore">${sc}/${Q.length}</span><p>${sc>=Q.length-1?msgs[0]:sc>=Math.ceil(Q.length*.6)?msgs[1]:msgs[2]}</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('n3qr',id,0)}>Intentar de nuevo</button></div></div>`}
 const x=Q[z.i],a=z.a[z.i],done=a!==undefined;
 return dkH('Repaso · '+(z.i+1)+' de '+Q.length,x.q)+
 `<div class="sel-list">${x.o.map((t,i)=>`<button class="qopt ${done?(i===x.a?'right':i===a?'wrong':''):''}" ${rxa('n3qa',id,i)} ${done?'disabled':''}><span class="l">${'ABC'[i]}</span><span>${t}</span></button>`).join('')}</div>
 ${done?`<div class="dk-call"><b>${a===x.a?'¡Correcto!':'Casi.'}</b> ${x.e}</div><div class="dk-cta"><button class="btn btn-primary btn-sm" ${rxa('n3qn',id,0)}>${z.i===Q.length-1?'Ver resultado':'Siguiente pregunta'}</button></div>`:''}`};
const n3hero=(eb,h,p,chips,sig,light)=>`<div class="dk-hero${light?' light':''}"><svg class="mo" aria-hidden="true"><use href="#mark"/></svg><span class="eyebrow">${eb}</span><h2>${h}</h2><p>${p}</p>${chips?`<div class="dk-chips">${chips.map(x=>`<span class="tg">${x}</span>`).join('')}</div>`:''}<small class="dk-sig">${sig}</small></div>`;
const n3quote=t=>`<p class="dk-quote" style="text-align:center">${t}</p>`;

/* ================= CLASE 1 · marca nueva ================= */
/* ----- péndulo vivo (SVG + requestAnimationFrame) ----- */
const PND={},PMODES={cw:'Circular horario',ccw:'Circular antihorario',fb:'Adelante-atrás',lr:'Izquierda-derecha',rest:'Quieto'};
const PCAP={cw:'Gira en el sentido de las agujas del reloj, visto desde arriba.',ccw:'Gira en sentido contrario a las agujas del reloj, visto desde arriba.',fb:'Va y viene de adelante hacia atrás.',lr:'Va y viene de izquierda a derecha.',rest:'Está quieto, esperando tu pregunta.',free:'Lo soltaste: se mueve solo y poco a poco se detiene.'};
const PRED=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function pndGet(id,o){return PND[id]||(PND[id]={id,cur:o.mode,want:o.mode,A:o.mode==='rest'?0:o.amp*.7,th:Math.random()*6,x:0,y:0,vx:0,vy:0,L:o.L,amp:o.amp,trail:[],drag:0,t:0})}
function pndStep(P,dt){
 const w=2*Math.PI/(2*Math.sqrt(P.L/10));P.t+=dt;
 if(P.drag)return;
 if(P.cur==='free'){const n=4,h=dt/n;for(let i=0;i<n;i++){P.vx+=(-w*w*P.x-.22*P.vx)*h;P.vy+=(-w*w*P.y-.22*P.vy)*h;P.x+=P.vx*h;P.y+=P.vy*h}
  if(P.want!=='free')P.cur='rest';
  else if(Math.hypot(P.x,P.y)<2.5&&Math.hypot(P.vx,P.vy)<8){P.cur=P.want='rest';P.vx=P.vy=0;pndSync(P)}
  return}
 if(P.cur==='rest'){const k=Math.exp(-dt*2.4);P.x*=k;P.y*=k;
  if(P.want!=='rest'&&P.want!=='free'&&Math.hypot(P.x,P.y)<5){P.cur=P.want;P.A=Math.hypot(P.x,P.y);P.th=0}
  return}
 if(P.want!==P.cur){P.A+=(0-P.A)*Math.min(1,dt*3.4);if(P.A<4)P.cur='rest'}
 else P.A+=(P.amp-P.A)*Math.min(1,dt*1.6);
 P.th+=w*dt;const s=Math.sin(P.th),c=Math.cos(P.th),A=P.A;
 if(P.cur==='cw'){P.x=A*s;P.y=-A*c}else if(P.cur==='ccw'){P.x=-A*s;P.y=-A*c}
 else if(P.cur==='lr'){P.x=A*s;P.y=0}else if(P.cur==='fb'){P.x=0;P.y=A*s}}
function pndDraw(P){const r=P.refs;if(!r)return;
 const Lp=120+P.L*3,x=P.x,y=P.y,h=Math.sqrt(Math.max(1,Lp*Lp-x*x-y*y)),bx=180+x,by=24+h+y*.2;
 r.ch.setAttribute('x2',bx.toFixed(1));r.ch.setAttribute('y2',by.toFixed(1));
 r.bob.setAttribute('transform','translate('+bx.toFixed(1)+' '+by.toFixed(1)+') rotate('+(-Math.atan2(x,h)*57.3).toFixed(1)+')');
 const sx=180+x,sy=334+y*.3;r.sh.setAttribute('cx',sx.toFixed(1));r.sh.setAttribute('cy',sy.toFixed(1));
 const mv=Math.hypot(x,y)>1.5;if(mv)P.trail.push([sx,sy]);else if(P.trail.length)P.trail.splice(0,2);
 if(P.trail.length>150)P.trail.shift();
 r.tr.setAttribute('d',P.trail.length>1?'M'+P.trail.map(p=>p[0].toFixed(0)+' '+p[1].toFixed(0)).join('L'):'')}
let pndLast=0,pndOn=0;
function pndLoop(t){const dt=Math.min(.05,(t-pndLast)/1000||.016);pndLast=t;let any=0;
 for(const id in PND){const P=PND[id];if(P.el&&P.el.isConnected){any=1;pndStep(P,dt);pndDraw(P)}}
 if(any)requestAnimationFrame(pndLoop);else pndOn=0}
function pndSync(P){document.querySelectorAll('[data-pm^="'+P.id+'|"]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pm.split('|')[1]===P.want));
 document.querySelectorAll('[data-cap="'+P.id+'"]').forEach(e=>e.textContent=PCAP[P.want]||'')}
function pndBind(el,P){if(el.__pb)return;el.__pb=1;let lx=0,ly=0,lt=0;
 const pt=e=>{const r=el.getBoundingClientRect(),k=360/r.width;return[(e.clientX-r.left)*k,(e.clientY-r.top)*k]};
 el.addEventListener('pointerdown',e=>{if(!e.target.closest('.bobhit'))return;e.preventDefault();P.drag=1;P.cur=P.want='free';P.vx=P.vy=0;
  try{el.setPointerCapture(e.pointerId)}catch(_){}el.classList.add('grab');const q=pt(e);lx=q[0];ly=q[1];lt=performance.now();pndSync(P)});
 el.addEventListener('pointermove',e=>{if(!P.drag)return;const q=pt(e);P.x=n3clamp(q[0]-180,-125,125);P.y=n3clamp((q[1]-262)*1.3,-100,100);
  const n=performance.now(),d=Math.max(8,n-lt);P.vx=.6*P.vx+.4*((q[0]-lx)/d*1000);P.vy=.6*P.vy+.4*((q[1]-ly)*1.3/d*1000);lx=q[0];ly=q[1];lt=n});
 const up=()=>{if(!P.drag)return;P.drag=0;el.classList.remove('grab');const v=Math.hypot(P.vx,P.vy);if(v>240){P.vx*=240/v;P.vy*=240/v}};
 el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)}
function pndMount(){document.querySelectorAll('.pnd[data-pnd]').forEach(el=>{const d=el.dataset;
  const P=pndGet(d.pnd,{mode:(PRED&&d.amb)?'rest':(d.mode||'rest'),L:+d.len||15,amp:+d.amp||95});
  P.refs={ch:el.querySelector('.ch'),bob:el.querySelector('.bob'),sh:el.querySelector('.sh'),tr:el.querySelector('.tr')};P.el=el;pndBind(el,P);pndDraw(P)});
 if(!pndOn&&document.querySelector('.pnd[data-pnd]')){pndOn=1;pndLast=performance.now();requestAnimationFrame(pndLoop)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-pm]');if(!b)return;const [id,m]=b.dataset.pm.split('|'),P=PND[id];if(!P)return;
 P.want=m;if(P.cur==='free')P.cur='rest';pndSync(P)});
document.addEventListener('input',e=>{const id=e.target.dataset&&e.target.dataset.pl;if(!id||!PND[id])return;PND[id].L=+e.target.value;
 document.querySelectorAll('[data-pl-v="'+id+'"]').forEach(s=>s.textContent=e.target.value+' cm')});
const pndSVG=(id,o)=>{o=o||{};const P=PND[id];
 return `<div class="pnd-w${o.dark?' dark':''}"><svg class="pnd" viewBox="0 0 360 380" data-pnd="${id}" data-mode="${o.mode||'rest'}" data-len="${o.len||15}" data-amp="${o.amp||95}"${o.amb?' data-amb="1"':''} role="img" aria-label="Péndulo animado. Puedes arrastrar el cristal y soltarlo.">
  <ellipse class="tb" cx="180" cy="334" rx="158" ry="44"/><ellipse class="tr1" cx="180" cy="334" rx="104" ry="29"/><ellipse class="tr1" cx="180" cy="334" rx="50" ry="14"/>
  <path class="tx" d="M180 292v84M22 334h316"/>
  <text class="tl" x="180" y="288" text-anchor="middle">ADELANTE</text><text class="tl" x="180" y="378" text-anchor="middle">ATRÁS</text>
  <path class="tr" d=""/><ellipse class="sh" cx="180" cy="334" rx="12" ry="4"/>
  <path class="br" d="M150 12h60l-8 12h-44z"/><circle class="pv" cx="180" cy="24" r="4"/>
  <line class="ch" x1="180" y1="24" x2="180" y2="190"/>
  <g class="bob"><g transform="scale(1.35)"><circle class="ring" cx="0" cy="0" r="3.4"/><path class="cr" d="M0 3L-3 10L-10 24L0 52L10 24L3 10Z"/><path class="fc" d="M-10 24H10M0 3V52M-3 10L0 24L3 10"/></g><circle class="bobhit" cx="0" cy="34" r="40"/></g>
 </svg>
 ${o.hint===0?'':`<p class="pnd-hint"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5a1.6 1.6 0 0 1 3.2 0v5m0-1.5a1.6 1.6 0 0 1 3.2 0V11m0-.5a1.6 1.6 0 0 1 3.2 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.7-2.3L4 14.5a1.6 1.6 0 0 1 2.4-2L9 14.5"/></svg>Arrastra el cristal y suéltalo</p>`}
 ${o.cap===0?'':`<p class="pnd-cap" data-cap="${id}" aria-live="polite">${PCAP[P?P.want:(o.mode||'rest')]}</p>`}</div>`};
const pndCtl=(id,modes,o)=>{o=o||{};const P=PND[id],cur=P?P.want:(o.mode||'rest'),L=P?P.L:15;
 return `<div class="pnd-ctl"><div class="dk-chips" role="group" aria-label="Movimiento del péndulo">${modes.map(m=>`<button class="chip" data-pm="${id}|${m}" ${pressed(cur===m)}>${PMODES[m]}</button>`).join('')}</div>${o.len?`<label class="pnd-len"><span>Longitud de la cadena <b data-pl-v="${id}">${L} cm</b></span><input type="range" min="8" max="22" step="1" value="${L}" data-pl="${id}" aria-label="Longitud de la cadena en centímetros"></label>`:''}</div>`};

/* ----- piezas de marca ----- */
const nbOrn='<div class="nb-orn" aria-hidden="true"><i></i><svg><use href="#mark"/></svg><i></i></div>';
const nbHero=(eb,h,script,p,chips,sig,extra)=>`<div class="nb-cover"><svg class="nb-fol big" aria-hidden="true"><use href="#fol"/></svg><svg class="nb-sprig" aria-hidden="true"><use href="#leaf"/></svg>
 <div class="nb-ct"><svg class="nb-lotus" aria-hidden="true"><use href="#mark"/></svg><span class="eyebrow">${eb}</span><h2>${h}</h2>${script?`<p class="nb-script">${script}</p>`:''}<p class="nb-p">${p}</p>${chips?`<div class="dk-chips">${chips.map(x=>`<span class="tg">${x}</span>`).join('')}</div>`:''}<small class="dk-sig">${sig}</small></div>${extra||''}</div>`;
const nbQuote=t=>`<div class="nb-quote">${nbOrn}<p>${t}</p></div>`;

/* ----- 1 · Bienvenida ----- */
RICH.n3a1=()=>nbHero('Casa Muladhara · Radiestesia y Sanación del Alma','Fundamentos de la radiestesia','y activación del péndulo','Un primer paso para percibir, conectar y confiar en tu intuición.',['Conexión','Intención','Energía','Sabiduría'],'Karen Oyarce · Maestra Holística',
 `<div class="nb-pw">${pndSVG('hero',{dark:1,mode:'lr',amp:62,len:15,amb:1,cap:0})}</div>`);
const N3FORM=[['birrete','Terapeuta Holística','Certificada por la Escuela Argentina de Terapias Complementarias.'],['armoniza','Reikista','Certificada en Argentina.'],['loto','Reikista Nivel III','Certificada por la Sociedad Chilena de Reiki.'],['libro','Registros Akáshicos','Maestra en Registros Akáshicos.'],['pend','Radiestesia Avanzada','Especialización en Radiestesia Avanzada.'],['estrella','Péndulo Hebreo','Especialista en Péndulo Hebreo.'],['ojo','Tarot Terapéutico','Tarot Terapéutico y Evolutivo.'],['grupo','Maestra de Ceremonias','Y acompañamiento espiritual.']];
RICH.n3a2=()=>dkH('Tu maestra','Karen Oyarce Sáez','Maestra holística y especialista en sanación energética.')+
 `<div class="dk-split" style="align-items:center"><img class="n3-photo" src="${N3P}karen.webp" alt="Karen Oyarce sosteniendo un péndulo" width="420" height="580" decoding="async">
 <div class="detail" style="gap:12px"><p>Desde el año 2022 acompaña procesos de bienestar, crecimiento personal y sanación energética a través de diversas terapias holísticas.</p><p>Su formación incluye estudios realizados en Argentina y Chile, integrando herramientas terapéuticas que le han permitido desarrollar una visión profunda, amorosa y respetuosa del trabajo energético.</p></div></div>
 <div><div class="dk-sub">Formación y especializaciones · toca cada tarjeta</div>${n3flip('n3form',N3FORM,'c4',150)}</div>
 ${nbQuote('La sanación comienza cuando reconocemos el poder que habita en nuestro interior.')}`;
const N3REF=[['loto','¿Qué esperas aprender en este curso de Radiestesia?'],['corazon','¿Qué significa para ti la energía?'],['estrella','¿Qué te motiva a aprender Radiestesia?'],['lupa','¿Qué dudas o inquietudes tienes antes de comenzar?'],['arbol','¿Qué intención pones hoy en este proceso de aprendizaje?']];
RICH.n3a3=()=>dkH('Antes de comenzar','Reflexiona','Tómate unos minutos para conectar contigo antes de iniciar este camino de aprendizaje.')+
 `<div class="dk-grid c2">${N3REF.map((x,i)=>`<div class="nb-ref"><span class="nb-ico">${ic(x[0],22)}</span>${n3area('n3ref'+i,x[1],'Tu respuesta…')}</div>`).join('')}</div>${n3priv}
 ${nbQuote('Tu intención es la semilla que dará vida a todo tu aprendizaje. <mark>Confía, suelta y permite que el conocimiento llegue a ti.</mark>')}`;

/* ----- 2 · Fundamentos ----- */
const N3RAD=[['persona','Personas','Percibe, mide e interpreta las vibraciones o frecuencias energéticas presentes en las personas.'],['corazon','Emociones','Permite leer la frecuencia energética que acompaña a lo que sentimos.'],['casa','Espacios','Detecta cómo vibra un lugar: su energía, su armonía y sus alteraciones.'],['grupo','Animales','Las frecuencias energéticas también están presentes en los animales.'],['arbol','Plantas','Todo lo vivo vibra: las plantas también expresan una frecuencia particular.'],['estrella','Energía universal','El campo energético que nos rodea y del que también obtenemos información.']];
RICH.n3a4=()=>{const s=n3clamp(st('n3rad',0),0,5),x=N3RAD[s];
 return dkH('Fundamentos','¿Qué es la radiestesia?')+
 `<div class="dk-call">La radiestesia es la capacidad de <b>percibir, medir e interpretar</b> las vibraciones o <b>frecuencias energéticas</b> presentes en personas, animales, objetos, espacios y situaciones. A través de instrumentos como el <b>péndulo</b>, accedemos a información energética para favorecer el bienestar y la armonización integral.</div>
 <div><div class="dk-sub">¿Dónde la aplicamos? Toca cada ámbito</div>
 <div class="dk-split nb-radwrap"><div class="nb-ring" role="group" aria-label="Ámbitos de la radiestesia"><span class="nb-wave" aria-hidden="true"></span><span class="nb-wave w2" aria-hidden="true"></span><svg class="nb-core" aria-hidden="true"><use href="#mark"/></svg>
 ${N3RAD.map((y,i)=>{const a=(-90+i*60)*Math.PI/180;return `<button class="nb-node" style="left:${(50+39*Math.cos(a)).toFixed(1)}%;top:${(50+39*Math.sin(a)).toFixed(1)}%" ${rxa('set','n3rad',i)} ${pressed(i===s)}>${ic(y[0],22)}<span>${y[1]}</span></button>`}).join('')}</div>
 <div class="detail"><span class="eyebrow">Ámbito ${s+1} de 6</span><h3>${x[1]}</h3><p>${x[2]}</p></div></div></div>
 ${nbQuote('<mark>Todo es energía y todo vibra.</mark> La energía nos rodea constantemente; la radiestesia nos ayuda a interpretarla.')}`};
const N3PRI=[['ola','Todo es energía','Todo posee una dimensión energética que puede ser percibida mediante la radiestesia.'],['estrella','Todo vibra','Cada persona, objeto o lugar expresa una frecuencia energética particular.'],['diana','Todo contiene información','La energía guarda información útil para comprender un proceso terapéutico.'],['pend','El péndulo es un traductor','No genera respuestas: amplifica y traduce la información energética.'],['persona','El terapeuta es el canal','La calidad de la lectura depende de la presencia, la intención y el entrenamiento del terapeuta.']];
RICH.n3a6=()=>dkH('Fundamentos','Los 5 principios de la radiestesia','Toca cada principio para ver su significado.')+n3sel('n3pri',N3PRI,{eb:'Principio',nav:1})+
 `<div class="dk-chips" style="justify-content:center">${['Sanación','Consciencia','Propósito'].map(x=>`<span class="tg">${x}</span>`).join('')}</div>`;

/* ----- 3 · Tu péndulo ----- */
const N3PEN=[['pend','¿Qué es?','Instrumento de radiestesia que percibe y detecta la energía.'],['corazon','¿Para qué se utiliza?','Para obtener respuestas, confirmar información y trabajar con la energía.'],['ola','¿Cómo actúa?','Actúa como un puente entre tu energía, la información y el campo energético.'],['diana','¿De dónde obtiene la información?','Del campo energético que nos rodea y de nuestras microrespuestas neuromusculares.']];
RICH.n3a5=()=>dkH('Tu péndulo','¿Qué es un péndulo?','Toca el cristal y muévelo con tu dedo. Después descubre las cuatro tarjetas.')+
 `<div class="dk-split nb-pwrap">${pndSVG('def',{mode:'rest'})}<div style="display:grid;gap:12px">${pndCtl('def',['rest','cw','lr'])}${n3flip('n3pen',N3PEN,'c2',185)}</div></div>
 <div class="dk-call warn"><b>Recuerda.</b> El péndulo no tiene poder propio: responde a tu intención clara y a la información energética disponible.</div>`;
const N3MOVD={cw:'Giro en el sentido de las agujas del reloj.',ccw:'Giro en sentido contrario a las agujas del reloj.',fb:'Movimiento de adelante hacia atrás.',lr:'Movimiento de izquierda a derecha.',rest:'Sin movimiento: el péndulo permanece en reposo.'};
RICH.n3a7=()=>{const P=PND.mov,m=P&&PMODES[P.want]?P.want:'cw';
 return dkH('Tu péndulo','Los movimientos básicos','Elige un movimiento y mira cómo responde. Cambia la longitud de la cadena y observa el ritmo.')+
 `<div class="dk-split nb-pwrap">${pndSVG('mov',{mode:'cw',len:15,hint:0})}<div style="display:grid;gap:14px">${pndCtl('mov',['cw','ccw','fb','lr','rest'],{len:1,mode:'cw'})}
 <div class="detail"><span class="eyebrow">Observa</span><p><b>Circular horario y antihorario</b>, <b>lineal</b> adelante-atrás o izquierda-derecha, y <b>quieto</b>. Una cadena más larga hace el vaivén más lento.</p></div></div></div>
 <div class="dk-call warn"><b>No existe un significado universal para estos movimientos.</b> Cada radiestesista debe calibrar previamente las respuestas de su propio péndulo. Lo harás en la práctica de esta clase.</div>`};
const pshape=k=>{const S={
 0:'<path d="M30 14 L40 30 L30 84 L20 30Z" fill="url(#pcry)"/><path d="M20 30H40M30 14V84" stroke="#fff" stroke-opacity=".7" fill="none"/>',
 1:'<path d="M30 14C43 34 41 54 30 84C19 54 17 34 30 14Z" fill="url(#pgold)"/><path d="M30 18V80" stroke="#fff" stroke-opacity=".45" fill="none"/>',
 2:'<path d="M30 14L38 26L35 58L30 84L25 58L22 26Z" fill="url(#pwood)"/><path d="M22.4 30H37.6M23.2 44H36.8M25 58H35" stroke="#3b2a17" stroke-opacity=".55" fill="none"/>',
 3:'<path d="M30 14C47 20 48 42 30 84C12 42 13 20 30 14Z" fill="url(#pdeep)"/><path d="M16.5 34H43.5M19 46H41M23 58H37" stroke="#e8c680" fill="none"/>',
 4:'<path d="M24 14h12v8H24z" fill="url(#pgold)"/><path d="M24 22C13 42 20 66 30 84C40 66 47 42 36 22Z" fill="url(#pcry)"/><ellipse cx="30" cy="46" rx="6.5" ry="10" fill="var(--nb-paper)" stroke="var(--nb-gold)"/><circle cx="30" cy="47" r="2.6" fill="var(--nb-gold)"/>'}[k];
 return `<svg class="nb-shape" viewBox="0 0 60 96" aria-hidden="true"><path d="M30 0V14" stroke="var(--nb-gold)" stroke-width="1.2"/>${S}</svg>`};
const N3TIP=[['estrella','Péndulo de cristal','Ideal para trabajos de alta sensibilidad y conexión espiritual.'],['escudo','Péndulo metálico','Resistente y versátil. Excelente para consultas generales.'],['arbol','Péndulo hebreo (de madera)','Tradicional y efectivo para respuestas precisas y profundas.'],['ojo','Péndulo egipcio','Potente para protección energética y limpieza de ambientes.'],['enlace','Péndulo testigo','Permite colocar dentro un testigo (pelo, trozo de ropa, etc.) para encontrar personas o animales.']];
RICH.n3a8=()=>{const s=n3clamp(st('n3tip',0),0,4),x=N3TIP[s];
 return dkH('Tu péndulo','Tipos de péndulos','Cada péndulo tiene su propia energía y afinidad.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${N3TIP.map((y,i)=>`<button class="sel" ${rxa('set','n3tip',i)} ${pressed(i===s)}>${ic(y[0],24)}<b>${y[1]}</b></button>`).join('')}</div>
 <div class="detail nb-tip"><div>${pshape(s)}</div><div style="display:grid;gap:8px;align-content:center"><span class="eyebrow">Tipo ${s+1} de 5</span><h3>${x[1]}</h3><p>${x[2]}</p></div></div></div>
 <div class="dk-call">Elige el que resuene contigo y con tu propósito.</div>`};
const N3ELE=[['estrella','<b>1. Material.</b> Elige un material que te atraiga y con el que sientas afinidad. Los más comunes son metal, madera o cristal.'],['armoniza','<b>2. Peso.</b> Busca un peso que te resulte cómodo para que el péndulo se mueva con facilidad y precisión.'],['persona','<b>3. Tamaño.</b> Debe ser proporcional a tu mano y fácil de sostener: ni muy grande, ni demasiado pequeño.'],['enlace','<b>4. Longitud de la cadena.</b> La longitud ideal permite que el péndulo se mueva libremente sin golpear ni rozar tus dedos.'],['corazon','<b>5. Afinidad personal.</b> Tu intuición es la guía más importante. Si sientes conexión, ese es tu péndulo.']];
RICH.n3a9=()=>dkH('Tu péndulo','¿Cómo elegir tu péndulo?','El péndulo ideal es aquel con el que sientes conexión, confianza y claridad en las respuestas. Marca cada criterio mientras revisas el tuyo.')+
 `<div class="dk-split nb-pwrap" style="align-items:start"><div style="display:grid;gap:10px">${pndSVG('ele',{mode:'lr',amp:70,len:15,hint:0,cap:0})}${pndCtl('ele',['lr','rest'],{len:1,mode:'lr'})}<p class="dk-note" style="text-align:center">Prueba distintas longitudes: la cadena debe moverse libre, sin rozar tus dedos.</p></div>
 <div>${n3ck('n3ele',N3ELE,['Sigue revisando: tu intuición es la guía más importante.','<b>Tu péndulo cumple los cinco criterios.</b> No existe un péndulo “mejor” que otro: existe el péndulo perfecto para ti. Confía en tu intuición.'])}</div></div>`;
const N3LIM=[['agua','<b>Agua</b> (cuando el material lo permite).'],['incienso','<b>Incienso.</b>'],['sonido','<b>Sonido.</b>'],['irradia','<b>Luz solar o lunar.</b>'],['corazon','<b>Intención.</b>']];
RICH.n3a10=()=>dkH('Tu péndulo','Limpieza energética del péndulo','Es importante limpiarlo de manera regular para liberarlo de energías acumuladas. Marca los métodos que usarás.')+
 n3ck('n3lim',N3LIM,['Elige al menos un método y úsalo de forma regular.','Ya conoces los cinco métodos. Elige el que más resuene contigo.']);

/* ----- 4 · Guías de luz ----- */
const N3YS=[['arbol','Sabiduría interior','La parte más elevada de tu conciencia.'],['camino','Guía','Te orienta desde el amor y la claridad.'],['corazon','Intuición','Se expresa a través de la calma y la certeza.'],['loto','Conexión','Siempre está contigo; solo necesitas aprender a escucharla.']];
RICH.n3a12=()=>dkH('Guías de luz','¿Qué es el Yo Superior?','Toca cada tarjeta.')+n3flip('n3ys',N3YS,'c4',180)+
 nbQuote('El Yo Superior es tu guía interior, <mark>la parte más sabia y consciente de tu ser.</mark>');
const N3ACO=[['persona','Yo Superior','La fuente principal de guía y sabiduría interior.'],['escudo','Ángeles','Mensajeros de amor, protección y acompañamiento.'],['estrella','Arcángeles','Seres de luz que apoyan procesos de sanación y transformación.'],['camino','Guías espirituales','Seres que acompañan nuestro camino desde el amor y el respeto por nuestro libre albedrío.'],['loto','Maestros','Conciencias elevadas que inspiran aprendizaje y evolución espiritual.']];
RICH.n3a13=()=>dkH('Guías de luz','¿Quiénes nos acompañan desde la luz?','En todo trabajo radiestésico podemos conectar con diferentes energías que nos guían, apoyan y acompañan desde el amor.')+n3sel('n3aco',N3ACO,{eb:'Presencia',nav:1})+
 `<div class="dk-call">La radiestesia se practica siempre desde la luz, el respeto y la conexión con las energías de mayor vibración.</div>`;
const N3ARC=[['miguel','Arcángel Miguel','Protege, limpia y corta energías negativas. Nos brinda fuerza, coraje y protección divina para afrontar desafíos y vivir en verdad.'],['gabriel','Arcángel Gabriel','Mensajero divino que nos ayuda a comunicar con claridad, abrir nuestro corazón y conectar con nuestra misión del alma.'],['rafael','Arcángel Rafael','Sanador por excelencia: nos acompaña en la sanación física, emocional y espiritual, brindando armonía, salud y bienestar integral.'],['germain','Saint Germain','Maestro de la transmutación y la libertad. Nos ayuda a transformar patrones limitantes, elevar nuestra vibración y vivir en nuestro poder divino.'],['kuanyin','Kuan Yin','Maestra de la compasión y el amor incondicional. Nos acompaña a sanar heridas emocionales y a cultivar el perdón y la paz.'],['francisco','San Francisco de Asís','Maestro del amor universal y la conexión con la naturaleza. Nos inspira a vivir en gratitud, sencillez y servicio a todos los seres.']];
const nbPor=(o,items,off)=>`<div class="dk-grid c3">${items.map((x,j)=>{const i=j+off;return `<button class="flip por ${o[i]?'on':''}" ${rxa('flip','n3arc',i)} ${pressed(o[i])} style="height:290px"><span><span class="f"><img src="${N3P}${x[0]}.webp" alt="" width="96" height="96" loading="lazy"><b>${x[1]}</b><em>Toca para ver</em></span><span class="b">${x[2]}</span></span></button>`}).join('')}</div>`;
RICH.n3a14=()=>{const o=st('n3arc',{});
 return dkH('Guías de luz','Arcángeles, ángeles y maestros ascendidos','Su aporte a la humanidad. Toca cada retrato.')+
 `<div><div class="dk-sub">Arcángeles y ángeles · seres de luz que nos acompañan, protegen y guían</div>${nbPor(o,N3ARC.slice(0,3),0)}</div>
 <div><div class="dk-sub">Maestros ascendidos · almas iluminadas que nos enseñan con su ejemplo</div>${nbPor(o,N3ARC.slice(3),3)}</div>`+
 nbQuote('Nos acompañan desde la luz, recordándonos que <mark>no estamos solos.</mark>')};

/* ----- 5 · Rituales ----- */
const N3CON=[['loto','Respira y sostén','Sostén tu péndulo con ambas manos y centra tu respiración.'],['corazon','Pide conexión','Pide conexión con tu Yo Superior y con la energía divina.'],['estrella','Declara tu intención','Declara tu intención y el propósito con el que trabajarás con tu péndulo.'],['irradia','Agradece y siente','Agradece y siente cómo queda consagrado para acompañarte en tu camino.']];
RICH.n3a11=()=>dkH('Ritual · Conecta · Respira · Intenciona','Consagración del péndulo','Consagrar tu péndulo es establecer una conexión sagrada, alineada a tu propósito y a tu Yo Superior.')+
 `<div class="dk-split nb-rit"><img class="nb-ritimg" src="${N3P}ritual.webp" alt="Una mujer sostiene un péndulo de cristal entre sus manos juntas, junto a una vela, un cuarzo e incienso" width="480" height="824" loading="lazy"><div>${n3sel('n3con',N3CON,{eb:'Paso',nav:1}).replace('class="dk-split" style="align-items:start"','class="nb-stack"')}</div></div>`+
 `<div class="dk-call"><b>Es el primer ritual que tendrás con tu péndulo.</b> Hazlo con amor, presencia e intención. <i>“Todo comienza con una intención consciente.”</i></div>`;
const N3P1=['Cierra tus ojos, respira profundamente y lleva tu atención al centro de tu corazón.','Hoy abro mi corazón a la luz y a la sabiduría que habitan en mi interior.','Reconozco la presencia de mi Yo Superior, la parte más elevada, amorosa y consciente de mi ser.','Te invito a manifestarte con claridad, guiando mis pensamientos, mis palabras y mis acciones desde el amor y la verdad.','Permíteme escuchar tu voz con confianza, reconocer tus señales y caminar con serenidad por el sendero que mi alma ha elegido.','Que toda información que reciba sea siempre para mi mayor bienestar y para el bien más elevado de quienes acompañe.','Libero el miedo, las dudas y las expectativas, permitiendo que solo la luz, la paz y la sabiduría permanezcan en mí.','Hoy elijo confiar en mi intuición, honrar mi esencia y abrirme a la guía divina que siempre me acompaña.','Así es. Así será. Gracias, gracias, gracias.'];
RICH.n3a15=()=>dkH('Ritual','Oración de conexión con el Yo Superior','Léela con calma y en voz alta, o dila en tu interior.')+n3pray('n3p1',N3P1);
const N3P2=['Cierra tus ojos, respira profundamente y sostén tu péndulo entre tus manos.','Hoy consagro este péndulo como una herramienta de luz, sabiduría y servicio.','Que quede libre de toda energía que no le pertenezca y que, desde este momento, vibre en armonía con mi esencia.','Pido a mi Yo Superior que guíe cada movimiento con claridad, respeto y conciencia.','Que toda respuesta recibida sea para el mayor bienestar, siempre desde el amor, la verdad y la luz.','Que este péndulo sea un puente entre mi intuición y la sabiduría universal, permitiéndome acompañar con humildad, responsabilidad y confianza.','A partir de hoy, honro esta herramienta, agradezco su compañía y me comprometo a utilizarla con ética, respeto y un corazón dispuesto a servir.'];
RICH.n3a16=()=>dkH('Ritual de consagración · Conecta · Respira · Intenciona','Oración de consagración del péndulo','“Todo comienza con una intención consciente.”')+n3pray('n3p2',N3P2)+
 `<div class="dk-call"><b>Después de la oración.</b> Acerca el péndulo a tu corazón durante unos segundos. Permite que reconozca tu energía y que tú comiences a reconocer la suya.</div>`;

/* ----- 6 · Práctica y cierre ----- */
const N3CALR=['SÍ','NO','TAL VEZ','REPETIR'],N3CALM=['cw','ccw','fb','lr','rest'];
RICH.n3a17=()=>{const c=st('n3cal',{}),keys=Object.keys(c),n=keys.length,P=PND.cal,cur=P?P.want:'rest',sim=st('n3sim',{}),msg=st('n3calmsg','');
 const dup=N3CALR.some((_,i)=>c[i]!==undefined&&N3CALR.some((_,j)=>j>i&&c[j]===c[i]));
 const ready=n>=2&&!dup;
 return dkH('Práctica · Conecta, pregunta y escucha','Calibra tu péndulo','Con tu péndulo en la mano, pregunta: «¿Cuál es tu SÍ?». Mira el movimiento que hace el tuyo y reprodúcelo aquí para anotarlo.')+
 `<div class="dk-split nb-pwrap">${pndSVG('cal',{mode:'rest'})}<div style="display:grid;gap:12px">${pndCtl('cal',N3CALM)}
  <div class="dk-sub" style="margin:4px 0 0">Asigna el movimiento que ves</div>
  <div class="nb-assign">${N3CALR.map((r,i)=>`<button class="btn btn-ghost btn-sm" ${rxa('n3calp',i,0)}>Es mi ${r}</button>`).join('')}</div>
  ${msg?`<p class="dk-note" role="status">${msg}</p>`:''}</div></div>
 <div class="nb-map">${N3CALR.map((r,i)=>`<div class="nb-mc${c[i]!==undefined?' on':''}"><span class="eyebrow">${r}</span><b>${c[i]!==undefined?PMODES[N3CALM[c[i]]]:'Sin asignar'}</b>${c[i]!==undefined?`<button class="nb-x" ${rxa('n3cal',i,c[i])} aria-label="Quitar ${r}">Quitar</button>`:''}</div>`).join('')}</div>
 ${dup?'<div class="dk-call warn">Dos respuestas tienen el mismo movimiento. Pregunta de nuevo a tu péndulo para distinguirlas.</div>':''}
 <div class="detail nb-sim"><span class="eyebrow">Entrena tu lectura</span>${ready?(()=>{const t=sim.t,ok=sim.pick!==undefined&&c[sim.pick]===c[t];return `<p>El péndulo se moverá según tu calibración. Observa y elige qué respuesta te está dando.</p>
  <div class="dk-split nb-pwrap" style="gap:16px">${pndSVG('sim',{mode:'rest',amp:80,hint:0,cap:0})}<div style="display:grid;gap:10px;align-content:center">${t===undefined?'':`<div class="dk-chips" role="group">${N3CALR.filter((_,i)=>c[i]!==undefined).map(r=>{const i=N3CALR.indexOf(r);return `<button class="chip" ${rxa('n3simpick',i,0)} ${sim.pick!==undefined?'disabled':''} ${pressed(sim.pick===i)}>${r}</button>`}).join('')}</div>`}
  ${sim.pick!==undefined?`<p class="${ok?'nb-ok':'nb-no'}" role="status"><b>${ok?'¡Lo leíste bien!':'Casi.'}</b> ${ok?'Era tu':'Ese movimiento era tu'} ${N3CALR[t]}.</p>`:''}
  <div class="dk-cta"><button class="btn btn-primary btn-sm" ${rxa('n3simask',0,0)}>${t===undefined?'Preguntar al péndulo':'Otra pregunta'}</button>${sim.n?`<span class="dk-note">Aciertos: ${sim.ok||0} de ${sim.n}</span>`:''}</div></div></div>`})():'<p>Asigna al menos dos respuestas distintas (por ejemplo SÍ y NO) para activar este entrenamiento.</p>'}</div>
 <div class="dk-call"><b>Recuerda.</b> No existe un significado universal. Cada radiestesista debe descubrir y calibrar las respuestas de su propio péndulo. Confía en ti, en tu intuición y en tu conexión. <i>La práctica constante fortalece tu conexión y tu precisión.</i></div>`};
const N3EX=['Conexión inicial','Movimiento del péndulo','Preguntas al péndulo','Observa y registra','Agradecimiento'];
RICH.n3a18=()=>{const t=n3clamp(st('n3ex',0),0,4);const c=st('n3cal',{});
 const body=[
  `<p>Sostén tu péndulo entre tus manos, cierra tus ojos y respira profundo. Conéctate con tu energía y con tu Yo Superior. Escribe cómo te sientes en este momento y qué intención tienes para esta formación.</p>${n3area('n3ex0','Cómo me siento e intención')}`,
  `<p>Sostén tu péndulo y observa su movimiento. Identifica y anota qué movimiento corresponde a cada respuesta.</p><div class="nb-map">${N3CALR.map((r,i)=>`<div class="nb-mc${c[i]!==undefined?' on':''}"><span class="eyebrow">${r}</span><b>${c[i]!==undefined?PMODES[N3CALM[c[i]]]:'Sin anotar'}</b></div>`).join('')}</div><p class="dk-note">Puedes calibrarlo en el paso anterior.</p>`,
  `<p>Formula al menos 5 preguntas a tu péndulo sobre temas personales, emocionales o de tu entorno. Registra las respuestas que recibas.</p><div style="display:grid;gap:8px">${[1,2,3,4,5].map(i=>`<div class="n3-q"><b>${i}.</b><input type="text" data-rsin="n3q${i}" placeholder="Pregunta" aria-label="Pregunta ${i}" value="${esc(st('n3q'+i,''))}"><input type="text" data-rsin="n3r${i}" placeholder="Respuesta" aria-label="Respuesta ${i}" value="${esc(st('n3r'+i,''))}"></div>`).join('')}</div>`,
  `<p>Durante tu práctica, observa cómo te sientes y cuáles fueron tus principales aprendizajes o descubrimientos.</p>${n3area('n3ex3','Mis aprendizajes y descubrimientos')}`,
  `<p>Agradece a tu péndulo, a tu Yo Superior y a las energías que te acompañaron. Escribe unas palabras de gratitud.</p>${n3area('n3ex4','Mi agradecimiento')}`][t];
 return dkH('Práctica','Ejercicios','Dedica unos minutos a estos ejercicios: te ayudarán a integrar lo aprendido y a fortalecer tu conexión con tu péndulo.')+
 `<div class="dk-chips" role="group">${N3EX.map((x,i)=>`<button class="chip" ${rxa('set','n3ex',i)} ${pressed(i===t)}>${i+1}. ${x}</button>`).join('')}</div>
 <div class="detail" style="gap:14px"><span class="eyebrow">Ejercicio ${t+1} de 5</span><h3>${N3EX[t]}</h3>${body}</div>${n3priv}
 <div class="dk-call"><b>Recuerda.</b> La práctica constante te permitirá desarrollar mayor precisión, confianza y conexión con tu intuición. <i>Confía en tu proceso.</i></div>
 <div class="dk-cta"><a class="btn btn-ghost btn-sm" href="${N3P}print/clase1_ejercicios_y_reflexion.pdf" target="_blank" rel="noopener">Descargar la hoja para imprimir (PDF)</a></div>`};
const N3Q1=[
 {q:'¿Qué es la radiestesia?',o:['La capacidad de percibir, medir e interpretar vibraciones o frecuencias energéticas','Una técnica para adivinar el futuro con certeza','Un tipo de masaje corporal'],a:0,e:'Se aplica a personas, animales, objetos, espacios y situaciones, con instrumentos como el péndulo.'},
 {q:'¿Qué se dice del péndulo?',o:['Tiene poder propio sobre las personas','No tiene poder propio: responde a tu intención clara y a la información energética disponible','Funciona igual aunque el terapeuta no esté presente'],a:1,e:'El péndulo es un traductor: amplifica y traduce la información energética.'},
 {q:'¿Cuántos principios de la radiestesia vimos?',o:['Tres','Cinco','Siete'],a:1,e:'Todo es energía, todo vibra, todo contiene información, el péndulo es un traductor y el terapeuta es el canal.'},
 {q:'¿Qué significado universal tiene el giro horario?',o:['Siempre significa SÍ','Siempre significa NO','No existe un significado universal: cada radiestesista calibra su propio péndulo'],a:2,e:'Por eso la primera práctica es descubrir tu SÍ y tu NO.'},
 {q:'¿Cuál es el péndulo ideal?',o:['El más caro','Aquel con el que sientes conexión, confianza y claridad','El más pesado'],a:1,e:'Material, peso, tamaño, longitud de la cadena y, sobre todo, afinidad personal.'},
 {q:'¿Cuál es el primer ritual que tendrás con tu péndulo?',o:['La consagración','Una consulta a distancia','Un corte de lazos'],a:0,e:'Se hace con amor, presencia e intención, pidiendo conexión con tu Yo Superior.'},
 {q:'¿Qué es el Yo Superior?',o:['Un maestro externo','La parte más sabia, elevada y consciente de tu ser','Una emoción pasajera'],a:1,e:'Es tu guía interior: sabiduría, intuición, guía y conexión.'},
 {q:'¿Cuánto tiempo diario dedicarás esta semana a conectar con tu péndulo?',o:['5 minutos','10 a 15 minutos','45 minutos'],a:1,e:'La práctica constante fortalece tu conexión y tu precisión.'}];
RICH.n3a19=()=>n3quiz('c1',N3Q1,['Dominas lo esencial de la Clase 1.','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);
RICH.n3a20=()=>nbHero('Cierre de la clase','Hoy aprendimos','',
 'Hoy diste el primer paso en el aprendizaje de la radiestesia. Más que dominar un instrumento, comenzaste a desarrollar una forma consciente de escuchar, observar y confiar en tu intuición. La práctica constante fortalecerá esa conexión: contigo, tu Yo Superior y la Energía.',null,'Confía en el proceso · Todo lo que buscas ya está en ti',
 `<div class="nb-pw">${pndSVG('fin',{dark:1,mode:'cw',amp:56,len:12,amb:1,cap:0,hint:0})}</div>`);
const N3TAR=[['loto','Practica la <b>respiración</b> antes de comenzar.'],['estrella','Conecta con tu <b>Yo Superior</b>.'],['pend','Pregunta cada día: ¿Cuál es mi <b>Sí</b>? ¿Cuál es mi <b>No</b>? ¿Cuál es mi <b>Tal vez</b>? ¿Cuál es mi <b>Repetir</b>?'],['ojo','Observa si los <b>movimientos</b> se mantienen o cambian.'],['libro','Registra tus <b>experiencias</b> en un cuaderno.']];
const N3DIAS=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
RICH.n3a21=()=>{const d=st('n3dias',{});const n=Object.values(d).filter(Boolean).length;
 return dkH('Para la próxima clase','Tarea','Durante esta semana dedica 10 a 15 minutos diarios a conectar con tu péndulo.')+n3ck('n3tar',N3TAR)+
 `<div><div class="dk-sub">Mi semana de práctica · ${n} de 7 días</div><div class="dk-chips" role="group">${N3DIAS.map((x,i)=>`<button class="chip" ${rxa('tog','n3dias',i)} ${pressed(d[i])}>${x}</button>`).join('')}</div></div>
 ${nbQuote('Nos vemos en la próxima clase para comenzar a realizar nuestras primeras <mark>consultas radiestésicas.</mark>')}`};

/* ================= CLASE 2 ================= */
const C2LY=[232,200,166,130,88,52,34];
const c2live=(flow,bare)=>{const s=st('n3lv',-1);const col=i=>flow?'#8d8f86':CHAKRAS[i].c;
 const asc=flow?'':[0,1,2,3].map(k=>`<circle r="2.6" cx="120" fill="#fff6c8" opacity="0"><animate attributeName="cy" values="240;30" dur="4.2s" begin="${k*1.05}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.95;.95;0" keyTimes="0;.15;.85;1" dur="4.2s" begin="${k*1.05}s" repeatCount="indefinite"/></circle>`).join('');
 const rings=[[100,196,0],[120,210,1.2],[140,224,2.4]].map(r=>`<ellipse cx="120" cy="205" rx="${r[0]}" ry="${r[1]}" fill="none" stroke="${flow?'#6c7a70':'url(#c2g)'}" stroke-width="${flow?1.5:2.5}" opacity="${flow?.5:.7}" style="transform-box:fill-box;transform-origin:center;animation:${flow?'c2fl 2.6s steps(2) infinite':'c2br2 5s ease-in-out infinite'};animation-delay:${r[2]}s"/>`).join('');
 const ch=[0,1,2,3,4,5,6].map(i=>{const y=C2LY[i],a=(i/8).toFixed(2),b=(i/8+.07).toFixed(2),c=(i/8+.18).toFixed(2),on=i===s;
  const anim=flow?`<animate attributeName="opacity" values=".35;.1;.4;.15;.35" dur="${2+i*.3}s" repeatCount="indefinite"/>`:`<animate attributeName="r" values="7;7;12;7;7" keyTimes="0;${a};${b};${c};1" dur="8s" repeatCount="indefinite"/>`;
  return `<g ${rxa('set','n3lv',on?-1:i)} role="button" tabindex="0" aria-label="Chakra ${CHAKRAS[i].n}" aria-pressed="${on}" style="cursor:pointer"><circle cx="120" cy="${y}" r="20" fill="transparent"/>${on?`<circle cx="120" cy="${y}" r="18" fill="none" stroke="${col(i)}" stroke-width="2" opacity=".9"><animate attributeName="r" values="14;22;14" dur="1.8s" repeatCount="indefinite"/></circle>`:''}<circle cx="120" cy="${y}" r="7" fill="${col(i)}" filter="url(#c2b)" opacity="${flow?.4:1}">${anim}</circle><circle cx="120" cy="${y}" r="3" fill="#fff" opacity="${flow?.3:.9}"/></g>`}).join('');
 const lab=s>=0&&!flow?`<g pointer-events="none"><rect x="146" y="${C2LY[s]-14}" width="84" height="28" rx="14" fill="rgba(10,25,18,.85)" stroke="${CHAKRAS[s].c}"/><text x="188" y="${C2LY[s]+4}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${CHAKRAS[s].n}</text></g>`:'';
 const cr=flow?[[96,70],[100,128],[104,184]].map(x=>`<path d="M${x[0]} ${x[1]}l12 6-10 8 14 6" stroke="#b33" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".85"/>`).join(''):'';
 return `<div class="c2-live${bare?' bare':''}${flow?' blk':''}"><svg viewBox="0 0 240 400" role="group" aria-label="Cuerpo energético: toca un chakra"><defs><linearGradient id="c2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c77dff"/><stop offset=".35" stop-color="#4db8ff"/><stop offset=".65" stop-color="#6ee07a"/><stop offset="1" stop-color="#ffd35a"/></linearGradient><linearGradient id="c2f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${flow?'#9a9c92':'#fff1b8'}" stop-opacity=".55"/><stop offset="1" stop-color="${flow?'#6d7068':'#ffb347'}" stop-opacity=".3"/></linearGradient><filter id="c2b" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
 ${rings}<path d="M120 62c11 0 18 10 18 24 0 10-4 17-10 21 14 4 30 12 38 26 8 14 12 40 16 70l8 38-12 4-12-36-4 70-4 84 4 28h-22l-8-110h-24l-8 110h-22l4-28-4-84-4-70-12 36-12-4 8-38c4-30 8-56 16-70 8-14 24-22 38-26-6-4-10-11-10-21 0-14 7-24 18-24z" fill="url(#c2f)" stroke="${flow?'#a9ab9f':'#ffe9a0'}" stroke-width="1.6" stroke-linejoin="round" ${flow?'':'filter="url(#c2b)" opacity=".35"'}/><path d="M120 62c11 0 18 10 18 24 0 10-4 17-10 21 14 4 30 12 38 26 8 14 12 40 16 70l8 38-12 4-12-36-4 70-4 84 4 28h-22l-8-110h-24l-8 110h-22l4-28-4-84-4-70-12 36-12-4 8-38c4-30 8-56 16-70 8-14 24-22 38-26-6-4-10-11-10-21 0-14 7-24 18-24z" fill="url(#c2f)" stroke="${flow?'#a9ab9f':'#ffe9a0'}" stroke-width="1.6" stroke-linejoin="round"/>
 <path d="M120 40V250" stroke="${flow?'#8d8f86':'#fff1b8'}" stroke-width="1.5" opacity=".5" stroke-dasharray="${flow?'6 10':'0'}"/>${asc}${cr}${ch}${lab}</svg></div>`};
RICH.n3b1=()=>nbHero('Clase 2','Sistema energético humano','Conociendo la energía que da vida al cuerpo físico.','Aprende a percibir, armonizar y sanar a través de la energía.',['Percibir','Armonizar','Sanar'],'Radiestesia y Sanación del Alma',c2live(0,1));
RICH.n3b2=()=>{const s=st('n3seh',0);
 return dkH('Clase 2','¿Qué es el sistema energético humano?')+
 `<div class="dk-call">Es una <b>red de energía vital</b> que atraviesa y sostiene nuestro <b>cuerpo físico, emocional, mental y espiritual</b>.</div>
 ${chipRow('n3seh',['Cuando la energía fluye','Cuando se bloquea'],s)}
 <div class="dk-split">${c2live(s,0)}
 <div class="detail">${s?'<span class="eyebrow">Bloqueada</span><h3>Desequilibrios</h3><p>Cuando la energía se bloquea, pueden aparecer desequilibrios en diferentes áreas de nuestra vida.</p>':'<span class="eyebrow">Libre</span><h3>Bienestar, claridad y vitalidad</h3><p>Cuando esta energía fluye libremente sentimos bienestar, claridad y vitalidad.</p>'}</div></div>`};
const N3FUN=[['irradia','Mantener la vitalidad','Distribuye la energía vital por todo el organismo, favoreciendo el equilibrio y la sensación de bienestar.'],['armoniza','Integrar cuerpo, mente y emociones','Permite que nuestros distintos planos funcionen de manera coordinada y en armonía.'],['escudo','Proteger el campo energético','Actúa como una barrera natural frente a energías densas o influencias externas.'],['arbol','Favorecer los procesos de sanación','Apoya la recuperación física, emocional y energética cuando el flujo vital circula correctamente.'],['estrella','Potenciar la conexión espiritual','Facilita la intuición, la percepción energética y la conexión con nuestro Yo Superior.']];
RICH.n3b3=()=>dkH('Clase 2','Funciones principales','Toca cada función.')+n3sel('n3fun',N3FUN,{eb:'Función'});
const N3COM=[['loto','Chakras','Centros que reciben, transforman y distribuyen la energía vital.'],['ola','Nadis','Canales por donde circula la energía vital hacia todo el organismo.'],['persona','Cuerpos energéticos','Diferentes niveles de energía que conforman nuestro campo sutil.'],['irradia','Aura','Campo energético que rodea e interpenetra el cuerpo físico.'],['estrella','Yo Superior','Nuestra conexión con la conciencia, la intuición y el propósito del alma.']];
const c2ic=(key,items,pre,round,sel)=>{const s=st(key,0);const x=items[s];
 return `<div class="c2-ic${round?' rd':''}">${items.map((q,i)=>`<button class="c2-ib${i===s?' on':''}" ${rxa('set',key,i)} aria-pressed="${i===s}"><img src="${N3P}c2/${pre}${i+1}.webp" alt="" loading="lazy"><span>${q[1]}</span></button>`).join('')}</div><div class="detail" style="border-left:6px solid var(--gold,#c9a24a)"><span class="eyebrow">${sel} ${s+1} de ${items.length}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`};
RICH.n3b4=()=>dkH('Clase 2','Componentes del sistema energético humano','Los elementos de nuestro sistema energético trabajan de manera integrada para mantener el equilibrio y el bienestar. Toca cada uno.')+c2ic('n3com',N3COM,'comp',0,'Componente')+
 n3quote('Todos estos componentes trabajan en conjunto. <mark>Cuando uno pierde su equilibrio, todo el sistema energético responde.</mark>');
const N3CHQ=[['estrella','Centros de energía','Son vórtices de energía que se relacionan con órganos, emociones, pensamientos y aspectos de nuestra vida.'],['loto','Reciben y transforman','Toman la energía del entorno, la transforman y la adaptan a nuestras necesidades.'],['irradia','Distribuyen la energía','Envían la energía vital a todo el organismo para que cada sistema pueda funcionar en armonía.'],['armoniza','Equilibrio integral','Cuando los chakras están armonizados, experimentamos salud, claridad mental, bienestar emocional y conexión espiritual.'],['persona','A lo largo de nuestro cuerpo','Existen siete chakras principales alineados a lo largo de la columna vertebral, desde la base hasta la coronilla.']];
RICH.n3b5=()=>dkH('Clase 2','Los chakras · ¿qué son?','Son centros energéticos que se encuentran en nuestro cuerpo sutil. Reciben, transforman y distribuyen la energía vital para mantener el equilibrio físico, emocional, mental y espiritual.')+n3flip('n3chq',N3CHQ,'c3',200)+
 `<div class="dk-call">Cada chakra vibra a una <b>frecuencia específica</b> y se asocia a un color, un elemento, un área de la vida y un propósito evolutivo.</div>`;
const N3CHF=['Seguridad, estabilidad y conexión con la tierra.','Creatividad, placer y relaciones.','Poder personal, confianza y transformación.','Amor, compasión y equilibrio emocional.','Comunicación, expresión y verdad.','Intuición, sabiduría interior y claridad mental.','Conexión espiritual y conciencia superior.'];
const C2HY=[8.1,19.3,33.9,46.4,57.4,70,82.6];
RICH.n3b6=()=>{const s=st('n3ch',6);const c=CHAKRAS[s];
 const hs=[6,5,4,3,2,1,0].map(ci=>`<button class="c2-hot${ci===s?' on':''}" style="left:50.2%;top:${C2HY[6-ci]}%;--c:${CHAKRAS[ci].c}" ${rxa('set','n3ch',ci)} aria-label="Chakra ${CHAKRAS[ci].n}" aria-pressed="${ci===s}"></button>`).join('');
 return dkH('Clase 2','Los siete chakras principales','Toca un chakra sobre el cuerpo para conocerlo.')+
 `<div class="dk-split" style="align-items:center"><div class="c2-stage fig"><img src="${N3P}c2/chakras.webp" alt="Los siete chakras sobre la silueta en loto">${hs}</div><div style="display:grid;gap:12px"><div class="detail" style="border-left:6px solid ${c.c}"><span class="eyebrow">Chakra ${s+1} · ${c.s}</span><h3>Chakra ${c.n}</h3><p>${N3CHF[s]}</p><p><b>Mantra:</b> ${N3MAN[s][0]}</p></div>
 <div class="row"><button class="btn btn-ghost btn-sm" ${rxa('set','n3ch',Math.max(0,s-1))} ${s===0?'disabled':''}>Chakra de abajo</button><button class="btn btn-primary btn-sm" ${rxa('set','n3ch',Math.min(6,s+1))} ${s===6?'disabled':''}>Chakra de arriba</button></div></div></div>`};
const N3EQ=[['persona','Mayor vitalidad y energía','Sentimos más energía, entusiasmo y motivación para vivir plenamente.'],['corazon','Equilibrio emocional','Gestionamos mejor nuestras emociones y mantenemos la calma interior.'],['estrella','Claridad mental y mejores decisiones','Pensamos con claridad, tomamos mejores decisiones y nos enfocamos en lo que realmente importa.'],['grupo','Relaciones más saludables','Nos comunicamos mejor, creamos vínculos sanos y cultivamos la empatía y el respeto.'],['loto','Mayor conexión espiritual e intuición','Conectamos con nuestro propósito, confiamos en nuestra intuición y sentimos paz y plenitud.']];
RICH.n3b7=()=>dkH('Clase 2','Cuando los chakras están en equilibrio','La energía vital circula libremente, favoreciendo el bienestar integral y una mayor conexión con nosotros mismos.')+c2ic('n3eq5',N3EQ,'eq',1,'Beneficio')+
 n3quote('El equilibrio energético favorece que cuerpo, mente, emociones y espíritu <mark>trabajen en armonía</mark>, permitiéndonos vivir con bienestar y propósito.');
const N3BLO=[['ola','<b>Disminuye la energía.</b> Sensación de cansancio y falta de vitalidad.'],['corazon','<b>Desequilibrio emocional.</b> Mayor irritabilidad, ansiedad o tristeza.'],['estrella','<b>Confusión mental.</b> Dificultad para concentrarse o tomar decisiones.'],['escudo','<b>Bloqueos en la vida.</b> Sensación de estancamiento en distintas áreas.'],['ojo','<b>Desconexión espiritual.</b> Menor intuición y dificultad para conectar con uno mismo.']];
RICH.n3b8=()=>{const nn=Object.values(st('n3blo',{})).filter(Boolean).length;return dkH('Clase 2','¿Qué ocurre cuando los chakras se bloquean?','Pueden perder su equilibrio por el estrés, las emociones no resueltas, experiencias difíciles o hábitos que afectan nuestro bienestar. Marca las señales que reconoces: el loto se apaga a medida que marcas.')+`<div class="c2-loto"><img src="${N3P}c2/loto.webp" alt="Loto energético" style="filter:grayscale(${nn/5*.9}) brightness(${1-nn*.05})"><small>${nn} de 5 señales</small></div>`+
 n3ck('n3blo',N3BLO,['Observa con calma y sin juzgarte.','Reconocer varias señales es un buen primer paso para evaluar tu sistema.'])+
 `<div class="dk-call warn">Los bloqueos energéticos son <b>señales</b> de que nuestro sistema necesita <b>recuperar el equilibrio</b> y restablecer el flujo natural de la energía vital.</div>`};
const N3NAD=[{n:'Ida',s:'Canal de la luna',ic:'luna',c:'#5b7fbf',l:['Energía femenina','Intuición','Receptividad','Calma','Emociones'],p:'Se relaciona con el lado izquierdo del cuerpo.'},{n:'Pingala',s:'Canal del sol',ic:'irradia',c:'#c08a2c',l:['Energía masculina','Acción','Voluntad','Vitalidad','Razonamiento'],p:'Se relaciona con el lado derecho del cuerpo.'},{n:'Sushumna',s:'Canal central',ic:'ola',c:'#8a5fb8',l:['Es el canal principal que recorre la columna energética'],p:'Cuando Ida y Pingala están en equilibrio, la energía puede ascender por Sushumna favoreciendo la claridad, la expansión de conciencia y el desarrollo espiritual.'}];
RICH.n3b9=()=>{const s=st('n3nad',0);const n=N3NAD[s];const IM=['luna','sol','espiral'];
 const P=['M60 18C104 48 104 92 60 122C16 152 16 196 60 226C104 256 104 276 60 292','M60 18C16 48 16 92 60 122C104 152 104 196 60 226C16 256 16 276 60 292'];
 const svg=`<svg viewBox="0 0 120 310" class="c2-nadi" role="group" aria-label="Los tres nadis sobre la columna"><ellipse cx="60" cy="9" rx="9" ry="8" fill="none" stroke="var(--line)" stroke-width="2"/>
 <g ${rxa('set','n3nad',2)} role="button" tabindex="0" aria-label="Sushumna" style="cursor:pointer"><path d="M60 18V296" stroke="${N3NAD[2].c}" stroke-width="${s===2?9:4}" stroke-linecap="round" opacity="${s===2?1:.55}"/></g>
 ${[0,1].map(k=>`<g ${rxa('set','n3nad',k)} role="button" tabindex="0" aria-label="${N3NAD[k].n}" style="cursor:pointer"><path d="${P[k]}" fill="none" stroke="transparent" stroke-width="16"/><path d="${P[k]}" fill="none" stroke="${N3NAD[k].c}" stroke-width="${s===k?7:3}" stroke-linecap="round" opacity="${s===k?1:.55}"/></g>`).join('')}
 ${[0,1,2,3,4,5,6].map(i=>`<circle cx="60" cy="${40+i*38}" r="4" fill="${CHAKRAS[6-i].c}"/>`).join('')}</svg>`;
 return dkH('Clase 2','Los tres nadis principales','Los nadis son canales sutiles por donde circula el Prana, la energía vital. Según la tradición del yoga existen miles, pero tres son fundamentales para el equilibrio energético y el despertar de la conciencia.')+
 chipRow('n3nad',N3NAD.map(x=>x.n),s)+
 `<div class="dk-split" style="align-items:center"><div>${svg}</div><div class="detail" style="border-left:6px solid ${n.c};gap:12px"><div style="display:flex;gap:14px;align-items:center"><img class="c2-nic" src="${N3P}c2/nadi_${IM[s]}.webp" alt="" loading="lazy"><div><span class="eyebrow">${n.s}</span><h3>${n.n}</h3></div></div><ul style="margin:0;padding-left:20px;display:grid;gap:4px">${n.l.map(x=>`<li>${x}.</li>`).join('')}</ul><p>${n.p}</p></div></div>
 ${n3quote('Cuando nuestros canales energéticos están en armonía, <mark>la intuición puede expresarse con mayor claridad.</mark>')}`};
const N3AUR=[['loto','Refleja','Nuestro estado físico, emocional, mental y espiritual.'],['escudo','Nos rodea','Actúa como un campo de protección energética.'],['estrella','Es dinámica','Se expande, contrae y transforma constantemente.']];
RICH.n3b10=()=>{const s=st('n3aur',0);const x=N3AUR[s];
 const lab=s===0?[['Físico','12%','8%'],['Emocional','70%','22%'],['Mental','4%','52%'],['Espiritual','66%','72%']].map(l=>`<span class="c2-lab" style="left:${l[1]};top:${l[2]}">${l[0]}</span>`).join(''):'';
 return dkH('Clase 2','El aura · ¿qué es?','El aura es el campo energético luminoso que rodea nuestro cuerpo físico. Toca cada idea.')+chipRow('n3aur',N3AUR.map(a=>a[1]),s)+
 `<div class="dk-split" style="align-items:center"><div class="c2-stage aur a${s}"><img src="${N3P}c2/aura.webp" alt="Silueta rodeada por las capas del aura">${lab}</div><div class="detail"><span class="eyebrow">El aura</span><h3>${x[1]}</h3><p>${x[2]}</p></div></div>`+n3quote('<mark>Cuidar nuestra aura es cuidar nuestra energía.</mark>')};
const N3CUE=[['persona','Cuerpo físico','Es la dimensión material. Nos permite vivir en este plano.','Manifestación'],['ola','Cuerpo etérico','Canaliza y distribuye la energía vital. Sostiene el cuerpo físico.','Energía vital'],['corazon','Cuerpo astral','Relacionado con las emociones, deseos y experiencias afectivas.','Emociones'],['estrella','Cuerpo mental','Almacena pensamientos, creencias e ideas que dan forma a nuestra realidad.','Pensamientos'],['enlace','Cuerpo causal','Guarda las causas profundas de nuestras experiencias y los patrones de vida.','Propósito del alma'],['loto','Cuerpo búdico','Conectado con el amor incondicional, la sabiduría y la intuición profunda.','Amor universal'],['irradia','Cuerpo átmico','Nuestra esencia espiritual. Conecta con el propósito del alma y la conciencia divina.','Conciencia divina']];
const C2CC=['#7a55b0','#2f6fc0','#25a7a8','#4a9a4a','#e0a820','#d8508f','#8a65c8'];
RICH.n3b11=()=>{const s=st('n3cu',0);const v=st('n3cuv',0);const x=N3CUE[s];
 let vis;
 if(v===0){vis=`<div class="c2-cuer">${N3CUE.map((q,i)=>`<button class="c2-cb${i===s?' on':''}" style="--c:${C2CC[i]}" ${rxa('set','n3cu',i)} aria-pressed="${i===s}" aria-label="${q[1]}"><img src="${N3P}c2/cuerpo${i+1}.webp" alt="" loading="lazy"><b>${i+1}</b><span>${q[1].replace('Cuerpo ','')}</span></button>`).join('')}</div>`}
 else{const rs=[150,135,120,105,90,75,60].reverse();
  vis=`<svg viewBox="0 0 320 380" class="c2-nest" role="group" aria-label="Los siete cuerpos sutiles, uno dentro de otro"><g>${[6,5,4,3,2,1,0].map(i=>{const k=6-i,rx=46+(i+1)*13,ry=rx*1.24;return `<g ${rxa('set','n3cu',i)} role="button" tabindex="0" aria-label="${N3CUE[i][1]}" style="cursor:pointer"><ellipse cx="160" cy="190" rx="${rx}" ry="${ry}" fill="${C2CC[i]}" fill-opacity="${i===s?.5:.2}" stroke="${C2CC[i]}" stroke-width="${i===s?4:2}" ${i===s?'class="c2-pulse"':''}/><text x="160" y="${190-ry+16}" text-anchor="middle" font-size="13" font-weight="700" fill="${C2CC[i]}">${i+1}</text></g>`}).join('')}
  <g fill="none" stroke="var(--fg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><circle cx="160" cy="132" r="14"/><path d="M160 146v6M130 162q30-10 60 0l8 50M130 162l-8 50M146 168l-2 62-6 60M174 168l2 62 6 60M148 230h24"/></g></g></svg>`}
 return dkH('Clase 2','Los siete cuerpos sutiles · ¿qué son?','Son dimensiones energéticas que coexisten con nuestro cuerpo físico. A través de ellos experimentamos, sentimos y nos conectamos con la vida. Toca cada cuerpo.')+
 chipRow('n3cuv',['Uno por uno','Todos juntos'],v)+vis+
 `<div class="detail" style="border-left:6px solid ${C2CC[s]}"><span class="eyebrow">Cuerpo ${s+1} de 7 · ${x[3]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>
 <div class="dk-call">Todos estos cuerpos trabajan en conjunto. Cuando están en armonía, experimentamos bienestar, claridad y propósito.</div>`};
RICH.n3b12=()=>{const t=st('n3jt',0);
 let body;
 if(t===0){const s=n3clamp(st('n3lad',6),0,6);const x=N3CUE[s];
  body=`<div class="dk-split" style="align-items:start"><div class="sel-list">${[6,5,4,3,2,1,0].map(i=>`<button class="sel" ${rxa('set','n3lad',i)} ${pressed(i===s)}><img class="c2-mini" src="${N3P}c2/cuerpo${i+1}.webp" alt="" style="border:2px solid ${C2CC[i]}"><span><b>${i+1}. ${N3CUE[i][1]}</b><small>${N3CUE[i][3]}</small></span></button>`).join('')}</div>
  <div class="detail"><span class="eyebrow">Cuerpo ${s+1} de 7</span><h3>${x[1]} · ${x[3]}</h3><p>${x[2]}</p><p class="dk-note">La energía fluye desde los planos más elevados hasta manifestarse en el cuerpo físico.</p></div></div>`}
 else{const o=st('n3ord',null)||(RS.n3ord={n:0,ord:[0,1,2,3,4,5,6].sort(()=>Math.random()-.5),msg:''});const fin=o.n===7;
  body=`<p class="dk-lede" style="margin:0">Toca los cuerpos en orden, del más material al más sutil.</p><div class="dk-chips" style="min-height:40px">${N3CUE.slice(0,o.n).map((x,i)=>`<span class="tg">${i+1}. ${x[1]}</span>`).join('')||'<span class="dk-note">Aquí aparecerán los que vayas acertando.</span>'}</div>
  <div class="dk-grid c3">${o.ord.map(i=>`<button class="sel" ${rxa('n3o','n3ord',i)} ${pressed(i<o.n)} ${i<o.n?'disabled':''}><img class="c2-mini" src="${N3P}c2/cuerpo${i+1}.webp" alt="" style="border:2px solid ${C2CC[i]}"><b>${N3CUE[i][1]}</b></button>`).join('')}</div>
  ${fin?`<div class="dk-call"><b>¡Lo lograste!</b> Del físico al átmico: manifestación, energía vital, emociones, pensamientos, propósito del alma, amor universal y conciencia divina.</div>`:o.msg?`<div class="dk-call warn">${o.msg}</div>`:''}<div class="dk-cta"><button class="btn btn-ghost btn-sm" ${rxa('n3or','n3ord',0)}>Reiniciar</button></div>`}
 return dkH('Clase 2','¿Cómo trabajan juntos los cuerpos sutiles?','No funcionan de forma independiente: cada uno influye sobre los demás. Cuando uno de ellos pierde armonía, todo el sistema energético comienza a resentirse.')+chipRow('n3jt',['Escalera de los cuerpos','Ordénalos tú'],t)+body};
const N3CAU=[['ola','Estrés físico y emocional','Sobrecarga constante del sistema nervioso.'],['corazon','Emociones no procesadas','Miedo, tristeza, culpa, rabia o resentimiento.'],['estrella','Pensamientos repetitivos y limitantes','Creencias negativas que disminuyen nuestra energía.'],['grupo','Relaciones y ambientes tóxicos','Personas o espacios que generan desgaste energético.'],['loto','Desconexión espiritual','Falta de propósito, autocuidado y conexión interior.']];
RICH.n3b13=()=>dkH('Clase 2','¿Qué genera un desequilibrio en los cuerpos sutiles?','Las causas más frecuentes. Toca cada tarjeta.')+n3flip('n3cau',N3CAU,'c3',190);
const N3MAF=[['ola','<b>Cansancio constante:</b> agotamiento físico o mental sin causa aparente.'],['corazon','<b>Bloqueos emocionales:</b> dificultad para expresar lo que sentimos o liberar emociones.'],['estrella','<b>Pensamientos negativos repetitivos:</b> ansiedad, preocupación o falta de claridad.'],['camino','<b>Falta de motivación o propósito:</b> desconexión con nuestros objetivos y deseos.'],['persona','<b>Dolores físicos:</b> tensiones, molestias o enfermedades sin causa médica clara.'],['luna','<b>Alteraciones del sueño:</b> insomnio, sueños recurrentes o sueño no reparador.'],['irradia','<b>Falta de energía:</b> dificultad para realizar tareas diarias o mantener el equilibrio.'],['enlace','<b>Sensación de estancamiento:</b> sentir que nada fluye o que no avanzamos en la vida.']];
RICH.n3b14=()=>dkH('Clase 2','¿Cómo se manifiesta el desequilibrio?','Algunas manifestaciones frecuentes. Marca las que reconoces en ti.')+n3ck('n3maf',N3MAF,['Observa sin juzgar: reconocer es el primer paso.','Son varias señales a la vez. Conviene evaluar tu sistema energético con calma y acompañamiento.'])+
 `<p class="dk-note">Si hay dolores físicos o malestares persistentes, consulta también a un profesional de la salud.</p>`;
const N3PER=[['persona','Sensaciones físicas','Cansancio, tensión o bienestar.'],['corazon','Emociones','Cambios de ánimo o bloqueo emocional.'],['estrella','Intuición','Percepción interna y claridad.'],['pend','Radiestesia','El péndulo confirma lo que la energía manifiesta.']];
RICH.n3b15=()=>dkH('Clase 2','¿Cómo percibimos el estado del sistema energético?','El sistema energético siempre nos entrega información. Solo debemos aprender a observarla.')+n3sel('n3per',N3PER,{eb:'Vía'});
const N3EVA=[['ojo','Evita trabajar a ciegas','Evaluar primero te da información real sobre el estado de la energía.'],['lupa','Detecta el origen del bloqueo','La evaluación señala de dónde viene el desequilibrio.'],['diana','Permite priorizar lo que necesita atención','Sabes por dónde empezar y qué es lo más importante.'],['check','El tratamiento es más preciso y efectivo','Armonizas lo que de verdad lo necesita.']];
RICH.n3b16=()=>dkH('Clase 2','¿Por qué evaluar antes de armonizar?')+n3sel('n3eva',N3EVA,{eb:'Razón'})+`<p class="dk-quote" style="text-align:center"><mark>Primero evaluamos.</mark> Luego armonizamos.</p>`;
RICH.n3b17=()=>RICH.n3mantras();
RICH.n3b18=()=>RICH.n3mposter();
RICH.n3b19=()=>RICH.n3mvideo();
const N3CHU=['Parte superior de la cabeza','Entre las cejas','Garganta','Centro del pecho','Encima del ombligo','Debajo del ombligo','Base de la columna'];
const N3CHN=['Coronario','Tercer Ojo','Garganta','Corazón','Plexo Solar','Sacro','Raíz'];
const N3CUP=[['Físico','Salud, vitalidad, estructura corporal'],['Etérico','Energía vital, campo energético que sostiene al cuerpo físico'],['Emocional','Emociones, sentimientos, liberación de cargas emocionales'],['Mental','Pensamientos, creencias, patrones mentales'],['Causal','Memorias profundas, causas de experiencias'],['Espiritual','Conexión con el propósito del alma y la intuición'],['Átmico','Conexión con la esencia divina y la sabiduría universal']];
const n3yn=(key,i)=>{const o=st(key,{});return `<div class="n3-yn"><button class="chip" ${rxa('n3yn',key,i+'_1')} ${pressed(o[i]===1)}>SÍ</button><button class="chip" ${rxa('n3yn',key,i+'_0')} ${pressed(o[i]===0)}>NO</button></div>`};
RICH.n3b20=()=>{const t=st('n3pp',0);const al=st('n3al',-1),A=st('n3pc',{}),B=st('n3pb',{});
 const ba=Object.keys(A).filter(i=>A[i]===1).map(i=>N3CHN[i]),bb=Object.keys(B).filter(i=>B[i]===1).map(i=>N3CUP[i][0]);
 let body;
 if(t===0)body=`<div class="breath" aria-hidden="true"></div><div class="dk-call"><b>Antes de comenzar.</b> Respira profundo 3 veces, centra tu atención y formula tus preguntas en voz clara.</div>
  <div class="detail"><span class="eyebrow">Pregunta 1</span><h3>¿Mis chakras necesitan ser alineados?</h3><p>Pide a tu péndulo que te muestre el estado general de alineación de tus chakras. <b>SÍ:</b> están alineados. <b>NO:</b> no están alineados.</p>
  <div class="dk-chips" role="group"><button class="chip" ${rxa('set','n3al',1)} ${pressed(al===1)}>SÍ · están alineados</button><button class="chip" ${rxa('set','n3al',0)} ${pressed(al===0)}>NO · no están alineados</button></div>${al===0?'<p class="dk-note">Continúa con la pregunta 2 para ubicar cuál chakra está bloqueado.</p>':al===1?'<p class="dk-note">Puedes pasar directo a revisar tus cuerpos energéticos (pregunta 3).</p>':''}</div>`;
 else if(t===1)body=`<div class="detail"><span class="eyebrow">Pregunta 2</span><h3>¿Tengo algún chakra bloqueado?</h3><p>Pide a tu péndulo que te indique si tienes algún chakra bloqueado. <b>Si la respuesta es SÍ</b>, pregunta: «¿Qué chakra está bloqueado?» y usa esta tabla para identificarlo.</p></div>
  <div class="sel-list">${[0,1,2,3,4,5,6].map(i=>`<div class="sel" style="cursor:default"><i class="dot" style="background:${CHAKRAS[6-i].c}"></i><span style="flex:1"><b>${7-i}. ${N3CHN[i]}</b><small>${N3CHU[i]}</small></span>${n3yn('n3pc',i)}</div>`).join('')}</div>`;
 else body=`<div class="detail"><span class="eyebrow">Pregunta 3</span><h3>¿Mis cuerpos energéticos requieren limpieza?</h3><p>Pregunta a tu péndulo si tus cuerpos energéticos requieren limpieza. <b>Si la respuesta es SÍ</b>, pregunta: «¿En cuál de los 7 cuerpos me debo enfocar?» y usa la tabla.</p></div>
  <div class="sel-list">${N3CUP.map((x,i)=>`<div class="sel" style="cursor:default"><span class="k n2-k">${i+1}</span><span style="flex:1"><b>${x[0]}</b><small>${x[1]}</small></span>${n3yn('n3pb',i)}</div>`).join('')}</div>`;
 return dkH('Clase 2 · Conéctate · Respira · Confía','Práctica con péndulo','Tres consultas para observar tu sistema energético.')+
 `<div class="dk-chips" role="group">${['1 · Alineación','2 · Chakra bloqueado','3 · Cuerpos energéticos'].map((x,i)=>`<button class="chip" ${rxa('set','n3pp',i)} ${pressed(i===t)}>${x}</button>`).join('')}</div>${body}
 <div class="detail"><span class="eyebrow">Registra tus hallazgos</span><p><b>Chakras bloqueados:</b> ${ba.length?ba.join(', '):'—'} · <b>Cuerpos a limpiar:</b> ${bb.length?bb.join(', '):'—'}</p>${n3area('n3hall','Notas','Lo que percibiste, sentiste o descubriste…')}</div>${n3priv}
 <p class="dk-quote" style="text-align:center">Agradece a tu péndulo y a ti por este espacio de conexión. <mark>La práctica constante fortalece tu intuición.</mark></p>`};
RICH.n3b21=()=>dkH('Clase 2','Reflexión','Tómate unos minutos para conectar contigo y con lo aprendido hoy. Estas preguntas te ayudarán a integrar y aplicar este conocimiento en tu vida.')+
 `<div class="dk-grid c3">${[['loto','¿Cómo sientes hoy tu energía?'],['arbol','¿Qué área de tu vida necesita mayor equilibrio?'],['estrella','¿Qué aprendiste hoy que podrás aplicar desde ahora?']].map((x,i)=>`<div style="display:grid;gap:8px"><span style="color:var(--brass)">${ic(x[0],26)}</span>${n3area('n3rf'+i,x[1],'Tu respuesta…')}</div>`).join('')}</div>${n3priv}
 ${n3quote('La observación consciente es el primer paso hacia la <mark>transformación y la sanación.</mark>')}`;
const N3Q2=[
 {q:'¿Qué es el sistema energético humano?',o:['Una red de energía vital que atraviesa y sostiene nuestros cuerpos físico, emocional, mental y espiritual','Solo el sistema nervioso','Un conjunto de herramientas de radiestesia'],a:0,e:'Cuando fluye libremente sentimos bienestar, claridad y vitalidad.'},
 {q:'¿Cuántos chakras principales hay a lo largo de la columna?',o:['Cinco','Siete','Doce'],a:1,e:'Desde la base de la columna hasta la coronilla.'},
 {q:'¿Qué chakra se relaciona con la comunicación, la expresión y la verdad?',o:['Corazón','Sacro','Garganta'],a:2,e:'Es el quinto chakra; su mantra es HAM.'},
 {q:'¿Cuál es el mantra del chakra del corazón?',o:['RAM','YAM','LAM'],a:1,e:'YAM: «Yo amo. Doy y recibo amor. Estoy en paz.»'},
 {q:'Ida es el canal de…',o:['La luna: energía femenina, intuición y emociones','El sol: energía masculina y acción','El centro de la columna'],a:0,e:'Se relaciona con el lado izquierdo del cuerpo. Pingala es el sol; Sushumna, el canal central.'},
 {q:'¿Qué canal recorre la columna energética?',o:['Sushumna','Ida','Pingala'],a:0,e:'Cuando Ida y Pingala están en equilibrio, la energía asciende por Sushumna.'},
 {q:'¿Cuántos cuerpos sutiles estudiamos?',o:['Tres','Cinco','Siete'],a:2,e:'Físico, etérico, astral, mental, causal, búdico y átmico.'},
 {q:'¿Qué cuerpo almacena pensamientos, creencias e ideas?',o:['Astral','Mental','Etérico'],a:1,e:'El cuerpo mental da forma a nuestra realidad; el astral se relaciona con las emociones.'},
 {q:'¿Por qué evaluar antes de armonizar?',o:['Para detectar el origen del bloqueo y priorizar lo que necesita atención','Para trabajar a ciegas','Para evitar usar el péndulo'],a:0,e:'El tratamiento es más preciso y efectivo.'}];
RICH.n3b22=()=>n3quiz('c2',N3Q2,['Dominas lo esencial de la Clase 2.','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);
RICH.n3b23=()=>n3hero('Cierre de la clase','¡Gracias por ser parte de esta formación!','Hoy hemos dado un paso importante en tu camino de aprendizaje y conexión con tu sistema energético.',null,'Confía en tu intuición · Practica con amor · Sigue expandiendo tu luz')+
 `<div class="dk-call">Nos vemos en la próxima clase, donde profundizaremos juntas en nuevas herramientas de sanación y transformación.</div>`;

/* ================= PROTOCOLO CASA MULADHARA ================= */
const N3PP=[
 ['','Trabajar solo con mi Yo Superior','Espíritu y yo somos uno solo y juntos trabajamos como equipo. Pido trabajar solo con mi Yo Superior.','<div class="dk-call warn">Cuando ya estoy seguro/a de que estoy trabajando solo con mi Yo Superior, continúa la preparación.</div>'],
 ['','Sanación completa, con amor y luz','Pido por favor a Yo Superior y Comité Espiritual que me guíen para una Sanación Completa, con infinito amor y luz. Pido por favor que me limpien y preparen para trabajar.','<div class="dk-call warn">La respuesta debe ser positiva; de lo contrario, repetir la petición.</div>'],
 ['','Conexión con el Yo Superior de la persona','Pido por favor a Yo Superior y Comité Espiritual la conexión con el Yo Superior de ___ (nombre completo y fecha de nacimiento) para una Sanación completa y que este trabajo sea realizado con infinito amor y luz. Gracias, gracias, gracias.','<div class="dk-call warn">La respuesta debe ser positiva; de lo contrario, repetir la petición.</div>'],
 ['','Tiempo de preparación','¿Cuánto tiempo tomará preparar a mi Yo Superior para trabajar? ¿Cuánto tiempo tomará prepararme a mí para trabajar?','<div class="dk-call warn">La respuesta debe ser <b>0 % de tiempo</b>. De lo contrario, pedir que lo limpien (o que me limpien) para que sea en 0 % de tiempo, y repetir la pregunta.</div>'],
 ['','Limpieza permanente e inmediata','Pido a mi Yo Superior y al Comité Espiritual que me limpien de forma permanente e inmediata, desde lo más profundo de mi ser, de toda energía de renuncia, bloqueo o desconexión, y que todos los programas sean elevados al nivel más expandido de consciencia infinita. Gracias, gracias, gracias.','']];
RICH.n3p1=()=>dkH('Protocolo · Preparación','Preparación para trabajar en sanación','Cinco pasos antes de comenzar cualquier trabajo. Verifica cada respuesta con tu péndulo.')+n3sel('n3pp1',N3PP,{eb:'Paso',nav:1,it:1})+
 `<p class="dk-quote" style="text-align:center">Trabajamos desde el amor, la verdad y el respeto por el libre albedrío. <mark>Que tu luz sea la guía y la sanación sea el camino.</mark></p>`;
const N3ESP=[
 {t:'1 · Yo Superior y Comité',intro:'Sobre el gráfico de Yo Superior y Comité Espiritual, realiza las siguientes preguntas.',items:[
  ['¿Con quién estoy trabajando?','Debe mostrar Yo Superior.','Si no, girando el péndulo pide con convicción: «Pido trabajar solo con Yo Superior».'],
  ['¿Qué nivel de consciencia tiene mi Yo Superior?','Debe mostrar «Infinito».','Si no, pide: «Pido por favor que limpien y eleven al nivel más expandido e infinito».'],
  ['¿Qué nivel de consciencia tiene todo mi Comité Espiritual?','Debe mostrar «Infinito».','Si no, pide lo mismo que en el paso anterior.'],
  ['¿Qué nivel de consciencia tiene el miembro que esté más bajo en mi Comité Espiritual?','Debe mostrar «Infinito».','Si no, pide lo mismo que en el paso anterior.']]},
 {t:'2 · Mapa o porcentajes',intro:'Sobre el gráfico Mapa o de porcentajes, pregunta: «Yo Superior, ¿cuál es el % de…?»',items:[
  ['Bloqueos','Debe mostrar 0 %.','Si no, pedir que limpien al 100 % todos los bloqueos para trabajar.'],
  ['Interferencias','Debe mostrar 0 %.',''],['Almas extras','Debe mostrar 0 %.',''],
  ['Ego','Debe mostrar 0 %.','Si no, pedir que limpien al 100 % todo el ego y los mecanismos del ego para trabajar.'],
  ['Control consciente','Debe mostrar 0 %.',''],
  ['Neutralidad','Debe mostrar 100 %.','Si no, pedir que limpien para ser un canal 100 % neutro para trabajar.'],
  ['Energía física y espiritual','Debe mostrar 100 %.','Si no, pedir que limpien y la eleven al 100 % para trabajar.'],
  ['Pensamientos limitantes','Si es mayor a 0 %:','«Por favor limpia, remueve todos mis pensamientos limitantes y eleva mi nivel de consciencia al nivel más expandido e infinito».'],
  ['Desencarnados','Si aparecen:','«Pido a Yo Superior que por favor se lleve a todos a su sitio correcto, perfecto y adecuado, gracias, gracias, gracias».'],
  ['Espíritus invasores','Si aparecen:','«Pido a Yo Superior y un Comité del Arcángel Miguel que por favor se los lleve a todos a su sitio correcto y perfecto y que cierren y sellen con luz todos los portales negativos de donde estén viniendo», gracias, gracias, gracias.']]},
 {t:'3 · Protección',intro:'Pido por favor a todo mi Comité Espiritual y Seres de Luz que me protejan durante este trabajo. Pido que en estos momentos sea puesto en mí y en mi hogar un triple escudo reforzado de amor y luz para trabajar. (Visualizarlo) Gracias, gracias, gracias.',items:[['Visualicé el triple escudo de amor y luz en mí y en mi hogar','','']]}];
RICH.n3p2=()=>{const t=st('n3pe',0);const T=N3ESP[t];const o=st('n3pek'+t,{});const n=Object.values(o).filter(Boolean).length,N=T.items.length;
 return dkH('Protocolo · Preparación','Preparación del terapeuta y el espacio','Tres bloques de verificación. Marca cada punto cuando el péndulo indique lo esperado.')+
 `<div class="dk-chips" role="group">${N3ESP.map((x,i)=>`<button class="chip" ${rxa('set','n3pe',i)} ${pressed(i===t)}>${x.t}</button>`).join('')}</div>
 <p class="dk-lede" style="margin:0">${T.intro}</p>
 <div class="sel-list">${T.items.map((x,i)=>`<button class="ck" ${rxa('tog','n3pek'+t,i)} ${pressed(o[i])}><span class="box"></span><span><b>${x[0]}</b>${x[1]||x[2]?`<br><small class="muted">${x[1]}${x[2]?' '+x[2]:''}</small>`:''}</span></button>`).join('')}</div>
 <div class="prog"><span>${n} de ${N}</span><div class="bar"><i style="width:${n/N*100}%"></i></div></div>
 <div class="dk-call ${n===N?'':'warn'}">${n===N?'<b>Bloque completo.</b> '+(t<2?'Continúa con el siguiente.':'Ya puedes comenzar el trabajo.'):'Si alguna respuesta no es la esperada, aplica la petición indicada y vuelve a verificar.'}</div>`};
const N3APE=['Yo, {NF}, me uno con esta frecuencia del Amor para armonizar todos mis Cuerpos, y así poder acceder a esta Dimensión de Sabiduría y conectar a mi verdadera esencia Divina Yo Superior, y así caminar junto a mis Maestros Ascendidos, para que me puedan entregar el Conocimiento y Sabiduría necesaria e infinita a la que pondré al servicio del espíritu humano.','Pido a Yo Superior que se instruyan en los Registros Akáshicos del Alma de {NF} y así limpiar en profundidad, de forma ordenada y sin laberintos. Pido me acompañen y me permitan acceder a toda la información y programas a limpiar, tanto los conocidos como los desconocidos, con el fin de limpiar solo desde el amor radiante y perfecto.','Gracias, gracias, gracias.'];
RICH.n3p3=()=>dkH('Protocolo · Apertura','Oración de apertura · Conexión con Yo Superior','Escribe tu nombre y la oración se personaliza.')+n3pray('n3pap',N3APE,{name:1})+
 `<div class="dk-chips" style="justify-content:center">${['Sanación','Consciencia','Propósito'].map(x=>`<span class="tg">${x}</span>`).join('')}</div>`;

/* equilibrio de chakras 0–14.000 */
RICH.n3peq=()=>{const s=st('n3eqv',7);const col=i=>i<=5?'#e0a89a':i<=8?'#a8cf9d':'#9db8e0';
 const items=[...Array(15).keys()].map(i=>({l:i+'.000',t:i+'.000',c:i===7?'#7fbf74':col(i)}));
 const est=s<=5?['Bloqueado','Tendencia al <b>bloqueo físico</b>: el chakra está cerrado o con poca energía.']:s<=8?['Equilibrado',s===7?'<b>7.000 es el punto ideal</b>: el chakra está equilibrado.':'Rango equilibrado (6.000 a 8.000). El punto ideal es 7.000.']:['Muy abierto','Tendencia al <b>bloqueo emocional</b>: el chakra está sobreabierto o desbordado.'];
 return dkH('Protocolo · Chakras','Equilibrio de chakras','Mide cada chakra en este gráfico de 0 a 14.000. El centro, 7.000, es el equilibrio.')+
 `<div class="dk-grid c2" style="align-items:start"><div>${n2semi({key:'n3eqv',items,sel:s,fs:10.5,wrap:8,label:'Gráfico de equilibrio de chakras de 0 a 14.000'})}<p class="dk-note" style="text-align:center">Toca un sector para ver su nivel.</p></div>
 <div style="display:grid;gap:12px"><div class="detail"><span class="eyebrow">${s}.000</span><h3>${est[0]}</h3><p>${est[1]}</p></div>
 <div class="dk-call"><b>Cómo se usa.</b> Pregunta por cada chakra y observa en qué valor se detiene el péndulo. <b>0 a 5.000:</b> bloqueado. <b>6.000 a 8.000:</b> equilibrado. <b>9.000 a 14.000:</b> muy abierto.</div></div></div>`};
const N3LC=['Raíz','Sacro','Plexo solar','Corazón','Garganta','Tercer ojo','Corona'];
RICH.n3plc=()=>{const c=st('n3lc',0);const nm=esc(st('n3lcn',''))||'…(nombre de la persona)';
 const steps=[
  ['','Pide la limpieza y activación',`<p style="font-family:var(--f-display);font-style:italic;font-size:1.08rem">Pido a mi Yo Superior que por favor pueda limpiar, desbloquear y activar el chakra <b>${N3LC[c]}</b> de <b>${nm}</b>.</p>`],
  ['','Transformar la energía','<p style="font-family:var(--f-display);font-style:italic;font-size:1.08rem">Y transformen su energía en bienestar y sanación, para que estén en armonía y paz con el universo. Gracias, gracias, gracias.</p>'],
  ['','Corroborar al 100 %','<p>Luego corroborar que estén todos los chakras limpios y alineados al 100 %.</p><p class="dk-note">Usa el gráfico de porcentajes.</p>']];
 const s=n3clamp(st('n3lcs',0),0,2);
 return dkH('Protocolo · Chakras','Limpieza de chakras','Elige el chakra bloqueado y completa el nombre de la persona.')+
 `<label class="n3-lab">Nombre de la persona<input type="text" data-rsin="n3lcn" placeholder="Nombre" value="${esc(st('n3lcn',''))}"></label>
 <div class="dk-chips" role="group">${N3LC.map((x,i)=>`<button class="chip" ${rxa('set','n3lc',i)} ${pressed(i===c)}><i class="dot" style="background:${CHAKRAS[i].c};width:10px;height:10px;border-radius:50%;display:inline-block"></i> ${x}</button>`).join('')}</div>
 <div class="dk-grid c2" style="align-items:start"><div class="sel-list">${steps.map((x,i)=>`<button class="sel" ${rxa('set','n3lcs',i)} ${pressed(i===s)}><span class="k n2-k">${i+1}</span><b>${x[1]}</b></button>`).join('')}</div><div class="detail"><span class="eyebrow">Paso ${s+1} de 3</span><h3>${steps[s][1]}</h3>${steps[s][2]}</div></div>
 <div class="dk-call">Que tu luz sea la guía y la sanación sea el camino.</div>`};

/* ----- gráficos radiestésicos nativos ----- */
const n3grp=(groups,cols)=>{const items=[],c=[];groups.forEach((g,gi)=>g[1].split('|').forEach(x=>{items.push([x,g[0]]);c.push(cols[gi%cols.length])}));return {items,cols:c}};
const CH7=CHAKRAS.map(x=>x.c);
const N3A=['#4a56d9','#f2e04a','#ec5b8c','#f0efe9','#4f9a4f','#ee7a3a','#8e5bc9'];
const N3CRO=['#1a1a1a','#4a63d8','#7fd68e','#f7f7f7','#d9605f','#eeb25a','#f6e86a','#c28ff0','#f2bfe0','#bdbdbd','#f2c978'];
const N3G={
 ysc:{t:'Yo Superior y Comité Espiritual',eb:'Protocolo · Apertura',lede:'Verifica con quién trabajas y su nivel de consciencia antes de empezar.',how:'Sobre este gráfico pregunta con quién estás trabajando y qué nivel de consciencia tienen tu Yo Superior y tu Comité. Debe mostrar Yo Superior y nivel «Infinito».',rings:[
  {t:'Seres',items:q3('Guías Espirituales|Maestros|Ángeles Guardianes|Yo Superior|Arcángeles|Ángeles de Luz|Espíritus Invasores')},
  {t:'Nivel de consciencia',items:q3('Consciencia muy baja|Consciencia cuerpo físico|Consciencia cuerpo espiritual|Expansión de consciencia|Consciencia crística|Consciencia niveles infinitos')},
  {t:'Bloqueos',items:q3('Bloqueos verdad absoluta|Elevar el nivel de consciencia (consultante o comité)|Energías negativas en común con nuestra alma o la de otros|Requiere más fuerza de luz|Bloqueos para aumentar su fuerza o rapidez de sanación|El alma no permite ser sanada|El alma tiene bloqueos externos que impiden la sanación|Falta de empatía para trabajar|Programas desconocidos para el alma|YS solicita sanación para desbloquear energías negativas|YS requiere cooperación de servidores de luz|Limpiar el «Yo Soy»|Interferencias de otros comités|Limpiar familia del alma|Falta de consenso y armonía en el/los comités|Espíritus invasores|Almas extras (pedir trabajar con 0 almas)|Otros (fuera de los gráficos)')}]},
 mapa:{t:'Mapa / Guía',eb:'Protocolo · Apertura',lede:'El gráfico base: desde aquí investigas y decides a qué gráfico ir.',how:'Pregunta SÍ o NO en el centro del gráfico y deja que el péndulo te lleve al área que necesita atención. El anillo exterior mide el porcentaje (0 a 100 %) y el anillo medio indica el ámbito de vida.',rings:[
  {t:'Áreas de trabajo',items:q3('Armonización de chakras~Tiene su propio gráfico.|Limpieza del aura~Tiene su propio gráfico.|Arcángeles~Tiene su propio gráfico.|Bloqueos e interferencias~Tiene su propio gráfico.|Yo Superior y Comité Esp.~Tiene su propio gráfico.|Salud y bienestar~Tiene su propio gráfico.|Columna vertebral~Tiene su propio gráfico.|Minerales y vitaminas~Tiene su propio gráfico.|Vida intelectual~Tiene su propio gráfico.|Vida espiritual~Tiene su propio gráfico.|Energías discordantes~Tiene su propio gráfico.|Bloqueo a las expresiones positivas~Tiene su propio gráfico.|Visión de vida~Tiene su propio gráfico.|Actitud de vida~Tiene su propio gráfico.|Vida afectiva~Tiene su propio gráfico.|Dinero y trabajo~Tiene su propio gráfico.|Personajes|Constelación familiar|Vida social~Marcado con ** en el Mapa: investiga más a fondo.|Vidas pasadas~Marcado con ** en el Mapa: investiga más a fondo.|Terapias y sanación|Limpieza uterina|Niño interno|Votos|Símbolos y protecciones')},
  {t:'Ámbito de vida',items:q3('Vientre materno|Nacimiento|Niñez|Adolescencia|Adultez|Vida presente|Vidas pasadas|Vidas paralelas|Vida futura|Fuera del gráfico')}]},
 aura:{t:'Limpieza de aura',eb:'Protocolo · Aura',lede:'Pide a Yo Superior que limpie y fortalezca todas las capas.',how:'Pregunta qué hay que limpiar en el aura y observa el sector. El anillo exterior (0 a 100) mide la intensidad; las capas se ubican por rangos.',rings:[
  {t:'Qué limpiar',items:q3('Fisuras y roturas en el aura|Energías negativas acumuladas|Desencarnados|Acoples de entidades|Enganches o cordones|Baja energía|Larvas energéticas|Parásitos astrales|Cansancio físico, mental, emocional|Reajustar las energías del aura|Almas extras|Contaminación espiritual|Otros (fuera del gráfico)|Pactos del alma')},
  {t:'Capas del aura',items:q3('Cuerpo etérico~0 a 10|Cuerpo emocional~10 a 30|Cuerpo mental~30 a 40|Capa astral~40 a 60|Capa etérica~60 a 70|Cuerpo celestial~70 a 90|Cuerpo divino~90 a 100')}]},
 pct:{t:'Gráfico de porcentajes',eb:'Protocolo · Aura',lede:'Tu regla de medir: porcentajes, números y tiempo.',how:'Haz tu pregunta y observa el sector. En el centro respondes SÍ o NO; en los anillos mides el porcentaje, la cantidad (1 a 10) o el tiempo (minutos a años).',rings:[
  {t:'Porcentaje',items:[...Array(11).keys()].map(i=>[i*10+' %'])},{t:'Número',items:[...Array(10).keys()].map(i=>[String(i+1)])},{t:'Tiempo',items:q3('Minutos|Horas|Días|Meses|Años')},{t:'Sí / No',items:q3('SÍ|NO')}]},
 chem:{t:'Chakras · bloqueos emocionales',eb:'Protocolo · Chakras',lede:'Ubica el chakra y la emoción que lo bloquea.',how:'Pregunta qué chakra está bloqueado y luego qué emoción lo mantiene así. Más afuera encontrarás otros bloqueos emocionales.',rings:[
  {t:'Chakra',items:q3('Raíz|Sacro|Plexo solar|Corazón|Garganta|Tercer ojo|Corona'),cols:CH7},
  {t:'Principal bloqueo',items:q3('Miedo / Paranoia~Raíz|Culpa / Falta de creatividad~Sacro|Ira / Vergüenza~Plexo solar|Angustia / Duelo~Corazón|Falta de comunicación / Mentiras~Garganta|Ilusión / No querer ver~Tercer ojo|Apego / Ambición / No aceptar~Corona'),cols:CH7},
  {t:'Otros bloqueos',...n3grp([['Larvas astrales','Culpa|Dependencia|Falta de confianza|Envidia|Odio a la vida|Odio a sí mismo'],['Entidades parasitarias','Frustración|Inestabilidad|Crítica / Celos|Baja autoestima|Mentira'],['Miasmas','Violencia|Egocentrismo|Tristeza|Rechazo|Manipulación|Confusión'],['Lazos o cordones energéticos','Depresión|Inseguridad|Angustia|Sobrepeso|Estreñimiento|Negación|Abandono|Negatividad|Falta de amor propio'],['Otros (fuera del gráfico)','Miedo|Rabia']],N3PAL)}]},
 bio:{t:'Biómetro de órganos · chakras',eb:'Protocolo · Chakras',lede:'Relaciona órganos y sistemas con el chakra y la emoción que los afecta.',how:'Pregunta qué órgano o sistema necesita atención y observa el sector. Cada grupo pertenece a un chakra y a una emoción.',rings:[
  {t:'Chakra y emoción',items:q3('Raíz~Miedo / Paranoia|Sacro~Culpa|Plexo solar~Ira / Vergüenza|Corazón~Angustia / Duelo|Garganta~Falta de comunicación|Tercer ojo~No querer ver|Corona~No aceptar / Apego'),cols:CH7},
  {t:'Órganos y sistemas',...n3grp([['Raíz · Miedo / Paranoia','Columna vertebral|Intestino delgado|Próstata|Ano / Recto|Glándulas suprarrenales|Dientes / Uñas|Músculos / Huesos'],['Sacro · Culpa','Cavidad pélvica / Ovarios|Intestino grueso|Riñones / Vejiga|Aparato reproductor F/M · Gónadas|Sistema urinario|Linfa / Bazo'],['Plexo solar · Ira / Vergüenza','Sist. digestivo superior|Hígado|Páncreas|Vesícula|Espalda lumbar|Colon / Estómago'],['Corazón · Angustia / Duelo','Sist. circulatorio|Corazón|Sist. inmunológico|Cavidad torácica y espalda|Bronquios / Esófago|Pulmones'],['Garganta · Falta de comunicación','Tiroides / Amígdalas|Garganta / Voz|Tráquea / Faringe|Oídos|Cervical'],['Tercer ojo · No querer ver','Ojos|Nariz|Cerebelo|Sist. nervioso central|Glándulas pituitarias|Sist. endocrino'],['Corona · No aceptar / Apego','Cerebro|Glándula pineal|Cráneo|Cuerpo energético|Consciencia superior']],CH7)}]},
 disc:{t:'Energías discordantes',eb:'Protocolo · Bloqueos',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué energía discordante está presente y limpia directamente. Si necesitas ir más al fondo, investiga desde el Mapa.',rings:[
  {t:'Energías',items:q3('Culpa|Decepción|Dependencia|Conflicto|Dudas|Envidia|Odio a la vida|Odio a sí mismo|Frustración|Inestabilidad|Crítica / Celos|Baja autoestima|Mentira|Violencia|Separación|Autocastigo|Egocentrismo|Tristeza|Rechazo|Manipulación|Confusión|Depresión|Votos / Contratos|Humillación|Soledad|Arrepentimiento|Inseguridad|Abuso|Angustia|Deuda emocional|Separación')},
  {t:'Más profundas',items:q3('Traumas|Apegos|Abandono|Traición|Negatividad|Falta de amor propio|Injusticia|Vergüenza|Fracaso|Rabia|Venganza|Resentimiento|Posesividad|Miedo|Odio|Estrés|Pánico')}]},
 bloq:{t:'Bloqueos e interferencias',eb:'Protocolo · Bloqueos',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué bloqueo o interferencia está activa. El anillo exterior (0 a 100) mide su intensidad.',rings:[
  {t:'Bloqueos e interferencias',items:q3('Espíritu invasor|Desencarnados|Fuerzas oscuras|Fuerzas demoníacas|Ataques psíquicos|Portales negativos abiertos|Virus y parásitos|Larvas astrales|Bloqueadores de milagros|Drenadores de energía|Provocadores de enfermedades|Provocadores de adicciones|Bloqueadores de prosperidad|Bloqueadores de la mente|Almas extras|Cordones o lazos energéticos|En posesión|Otros bloqueos')},
  {t:'Origen interno',items:q3('Control consciente|Pensamientos discordantes|Neutralidad|Ego|Emociones negativas|Miedo|Magia negra|Ritual oscuro|Envidia|El alma no quiere ser sanada|Fuera de los gráficos')}]},
 ego:{t:'Mecanismos del ego',eb:'Protocolo · Bloqueos',lede:'Identifica qué defensa del ego está actuando.',how:'Pregunta qué mecanismo del ego está activo y observa el sector. El anillo exterior mide el porcentaje (0 a 100 %).',rings:[{t:'Mecanismos',items:q3('Negación|Evitación|Proyección|Regresión|Aislamiento|Racionalización|Sublimación|Desplazamiento|Formación reactiva|Represión')}]},
 pos:{t:'Bloqueo a las expresiones positivas',eb:'Protocolo · Bloqueos',lede:'Limpiar y activar directo. Investigar desde el Mapa.',how:'Pregunta qué expresión positiva está bloqueada; limpia y activa de inmediato. El anillo exterior mide el porcentaje.',rings:[
  {t:'Expresiones',items:q3('Autoestima|Sabiduría|Vitalidad|Comprensión|Confianza|Éxito|Fortaleza|Responsabilidad|Propósito|Autoperdón|Prosperidad|Equilibrio|Felicidad|Salud|Inteligencia|Risa|Amor|Amor a la vida|Optimismo|Paz')},
  {t:'Interior',items:q3('Libertad|Perdón|Fe|Determinación|Creatividad|Aceptación|Buen humor|Abundancia|Dar libertad|Deseo|Alegría|Justicia|Gratitud|Autoperdón')}]},
 afec:{t:'Vida afectiva',eb:'Protocolo · Áreas de vida',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta por el vínculo que necesita atención. Los anillos indican el tipo de compromiso, la calidad de la relación y su período.',rings:[
  {t:'Relación',items:q3('Amor incondicional|Amor condicional|Imagen padre / madre|Atracción|Atracción sexual|Pareja potencial|Relación por interés|Posesividad|Deuda kármica|Familia|Amigos|Manipulación|Lealtad|Confianza|Crianza|Opuestos|Rivalidad|Relación tóxica|Encuentro pasajero|Admiración|Pareja de vidas pasadas|Compromiso / Obligación|Otra')},
  {t:'Tipo de vínculo',items:q3('Voto~0 a 10 %|Juramento~10 a 30 %|Acuerdo~30 a 40 %|Promesa~40 a 60 %|Pacto~60 a 70 %|Karma~70 a 90 %|Maldición~90 a 100 %')},
  {t:'Calidad',items:q3('Relación dañina|Relación contraria|Relación favorable|Relación indiferente|Relación compatible|Relación excelente')},
  {t:'Período',items:q3('Período corto|Período medio|Período largo')}]},
 col:{t:'Columna vertebral',eb:'Protocolo · Áreas de vida',lede:'Cada vértebra guarda una emoción. Limpiar directo.',how:'Pregunta qué zona de la columna necesita atención y observa la vértebra y su emoción asociada.',rings:[
  {t:'Cervicales',items:q3('C1 · Hipervigilancia|C2 · Reconocimiento|C3 · Miedo de decir no|C4 · Ira, culpa|C5 · Miedo de expresarse|C6 · Carga|C7 · Miedo a no salir de un apuro')},
  {t:'Dorsales',items:q3('D1 · Apego|D2 · Asfixia|D3 · Injusticia|D4 · Miedo a no ser amado|D5 · Ruta falsa en deglución|D6 · Celos|D7 · Conflictos en la familia|D8 · Desengaño|D9 · Abandono|D10 · Rechazo|D11 · Desvalorización|D12 · Perfeccionismo')},
  {t:'Lumbares, sacro y coxis',items:q3('L1 · Inseguridad|L2 · Humillación|L3 · Traición|L4 · Frustración|L5 · Salvador|Sacro · Mantener / sostener|Coxis · Creencias arraigadas')}]},
 salud:{t:'Salud y bienestar',eb:'Protocolo · Áreas de vida',lede:'Sistemas del cuerpo, recomendaciones y equilibrio ácido-base.',how:'Pregunta qué sistema necesita apoyo y qué recomendación le ayuda. El anillo exterior mide el porcentaje.',rings:[
  {t:'Cuerpo físico',items:q3('Sistema esquelético|Sistema circulatorio|Sistema muscular|Sistema respiratorio|Sistema nervioso|Sistema digestivo|Sistema urinario|Sistema endocrino|Sistema linfático|Sistema tegumentario|Sistema reproductor|Columna vertebral~Ir al gráfico de columna vertebral')},
  {t:'Recomendaciones',items:q3('Ingerir verduras crudas|Ingerir agua|Caminar 30 minutos|Elongación|Descanso|Ejercicio físico|Meditar y soporte espiritual|Contacto con la naturaleza|Frutas, verduras y vitaminas|Pensamientos constructivos|Emociones positivas|Sentido a la vida|Relaciones íntimas|Recreación|Cromoterapia|Otros')},
  {t:'Estado',items:q3('Ácido|Neutro|Alcalino')}]},
 min:{t:'Minerales y vitaminas',eb:'Protocolo · Áreas de vida',lede:'Descubre qué aumentar, equilibrar o disminuir.',how:'Pregunta qué mineral o vitamina necesita el cuerpo y, en el centro, si hay que aumentar, equilibrar o disminuir. Es orientación energética: no reemplaza una indicación médica.',rings:[
  {t:'Minerales',items:q3('Agua|Azufre|Calcio|Cloro|Cobalto|Cobre|Cromo|Flúor|Fósforo|Hierro|Magnesio|Manganeso|Molibdeno|Potasio|Selenio|Sodio|Vanadio|Yodo|Zinc')},
  {t:'Vitaminas',items:q3('A|B5 (ácido pantoténico)|B1|B2|B3|B6|B12|B13|B15|B17|Biotina|C|Colina|D|E|F|Ácido fólico|K|P (sanguíneo)|PABA|T (hombres)|U (hortalizas verdes)|Complejo B')},
  {t:'Acción',items:q3('Aumentar|Equilibrio|Disminuir')}]},
 act:{t:'Actitud de vida',eb:'Protocolo · Áreas de vida',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué actitud necesita trabajarse. El anillo exterior mide el porcentaje (0 a 100 %).',rings:[{t:'Actitudes',items:q3('Reconocimiento y merecimiento|Cerrar ciclos|Amor propio|Dejar de juzgar|Abundancia|Depresión|Ansiedad|Equilibrar 4 elementos|Justificaciones|Poco realista|Seguridad e independencia|Valentía y confianza|Alegría de vivir|Relaciones positivas|Apego a relaciones tóxicas|Actitud controladora|Procrastinación|Ser optimista|Todo es un aprendizaje|Ansiedad social|Aislamiento|Programas de creencias de ser víctima y fracaso|Otros fuera del gráfico')}]},
 vis:{t:'Visión de vida',eb:'Protocolo · Áreas de vida',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué aspecto de la visión de vida necesita atención. El anillo exterior mide el porcentaje (0 a 100).',rings:[{t:'Visión de vida',items:q3('Predisposición a cambiar|Darle sentido a la vida|Ordenar los pensamientos|Expresarse, comunicarse|Emociones positivas|Meditar|Tener metas y proyectos|Diversión|Más descanso|Relaciones sociales|Tomar acción|Disposición al cambio|Aprender algo nuevo|Dejar lo viejo y soltar|Depresión (pasado)|Ansiedad (futuro)|Aceptar ayuda|Ver la vida con alegría|Aceptarse plenamente|Expandir la consciencia|Otros fuera del gráfico|Pensamientos limitantes|Pensamientos agobiantes|Soltar cargas y estrés')}]},
 intel:{t:'Vida intelectual',eb:'Protocolo · Áreas de vida',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué aspecto de la mente necesita atención. El anillo exterior mide el porcentaje (0 a 100 %).',rings:[{t:'Vida intelectual',items:q3('Bloqueos en la mente subconsciente|Pensamientos limitantes|Deseo de sufrir|Aceptar|Disfrutar|Ver subjetivamente|Renovarse|Aceptarse|Óxido cerebral|Daños cerebrales|Miedo al qué dirán|Culpar a otros|Ansiedad y estrés|Accionar en lo importante|Soltar las preocupaciones|No hacerse cargo|Mecanismos del ego~Ir al gráfico «Mecanismos del ego».|Ordenar los pensamientos|Disposición al cambio|Programas de evitación|Operación psíquica|Tu cerebro te engaña|Bloqueos en la organización|Bloqueos en la mente consciente')}]},
 esp:{t:'Vida espiritual',eb:'Protocolo · Áreas de vida',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué aspecto espiritual necesita atención. El anillo exterior mide el porcentaje (0 a 100 %).',rings:[{t:'Vida espiritual',items:q3('Sanar cicatrices del alma|Cuerpo etérico desbalanceado|Pérdida de la visión espiritual|Pérdida del oído espiritual|Descubrir tus propósitos de vida|Separación del Uno|Expansión de consciencia|Almas extras|Sentido a la vida|Deseos de restablecer programas negativos|Descifrar los mensajes|Activar tu naturaleza divina|Separación del Amor|Limpiar el canal|Desconexión con Yo Superior|Todos somos parte del gran Fractal|Aceptar tu naturaleza divina|Elevar y activar el amor propio|Defensas espirituales bajas|Programas fuera de los gráficos')}]},
 dinb:{t:'Dinero y trabajo · bloqueos',eb:'Protocolo · Áreas de vida',lede:'Limpiar directo. Investigar desde el Mapa.',how:'Pregunta qué bloqueo con el dinero o el trabajo está presente. Al terminar, usa el decreto de más abajo nombrando los bloqueos que aparecieron.',decreto:'Yo ……… hoy limpio, elimino y libero todas las memorias de limitación hacia el dinero, ya sea en esta vida, en otras vidas, dimensiones y/o lugares en los que yo exista. Ahora decreto estar abierto/a a recibir y disfrutar toda abundancia y prosperidad que por derecho me pertenece. Por favor Yo Superior limpia todos y cada uno de los bloqueos de … (nombra los bloqueos que te aparecen) … gracias, gracias, gracias.',rings:[{t:'Bloqueos',items:q3('El dinero corrompe|El dinero es malo o maldito|El dinero destruye a la familia|Lealtades familiares|Soy pobre|Mi familia es pobre|Ser pobre es ser bueno|Dependencia económica|Pensamientos limitantes de todo tipo|Bloqueo a recibir|Pensamientos y consciencia de pobreza y escasez|Apegos materiales|Votos de pobreza|Procrastinación / Postergación|Beneficios negativos|Bloqueos al éxito|Creencias o pensamientos limitantes|Bloqueos con la madre|Bloqueos con el padre|Deudas transgeneracionales|Miedo a fraudes o estafas|Patrones de limitación y carencia|Otros')}]},
 dina:{t:'Dinero y trabajo · activación',eb:'Protocolo · Áreas de vida',lede:'Limpiar y activar.',how:'Pregunta qué aspecto de la abundancia y el trabajo necesita limpieza y activación. El anillo exterior mide el porcentaje.',rings:[{t:'Activación',items:q3('Beneficios laborales|Dar o recibir dinero|Buen prestigio|Oportunidades laborales|Activar la seguridad|Activar la prosperidad|Activar los negocios / clientes|Reconocimiento y prestigio|Limpiar programas fuera del gráfico|Amor por tu trabajo|Elevar la energía espiritual|Manifestación positiva|Tomar al padre y a la madre|Limpieza y activación de abundancia|Educación financiera|Innovación|La competencia es una oportunidad|El dinero llega a mí con facilidad|Activar códigos sagrados 520-71269|Pensamientos de abundancia y éxito|Ser consecuente|Otros')}]},
 cro:{t:'Cromoterapia',eb:'Protocolo · Cierre',lede:'Elige el color que aumenta o disminuye la energía.',how:'Pregunta qué color necesita la persona, si hay que aumentar (activar) o disminuir (limpiar), y por cuánto tiempo (horas, días, meses o años).',rings:[
  {t:'Color',items:q3('Negro~Introspección, soledad, silencio, poder.|Azul~Verdad, sinceridad, responsabilidad, armonía.|Verde~Regeneración, crecimiento, bienestar y equilibrio.|Blanco~Pureza, inocencia, claridad, luz.|Rojo~Fuerza, pasión, sexualidad, actividad, prosperidad, ambición.|Naranja~Energía positiva, jovialidad, alegría (ayuda contra la depresión).|Amarillo~Creatividad, inteligencia, alegría, innovación, precaución.|Violeta~Transmutación, sabiduría, serenidad, equilibrio, memoria, lucidez mental.|Rosado~Amistad, feminidad, dulzura, encanto, ternura, amor.|Plateado~Pensamientos profundos, intuición, fortaleza, madurez, videncia, decisiones importantes.|Dorado~Fortaleza, poder, prosperidad, abundancia, éxitos.'),cols:N3CRO},
  {t:'Acción',items:q3('Aumentar (activar)|Disminuir (limpiar)')},{t:'Tiempo',items:q3('Horas|Días|Meses|Años')}]},
 arc:{t:'Arcángeles',eb:'Protocolo · Cierre',lede:'Conecta con el arcángel que necesitas y su cualidad.',how:'Pregunta con qué arcángel conectar y luego qué cualidad necesitas. Pide su guía y apoyo con fe y gratitud.',rings:[
  {t:'Arcángel',items:q3('Miguel|Jofiel|Chamuel|Gabriel|Rafael|Uriel|Zadquiel'),cols:N3A},
  {t:'Cualidades',...n3grp([['Arcángel Miguel','Miedo|Confianza|Voluntad|Valentía|Fe|Determinación'],['Arcángel Jofiel','Inteligencia emocional|Sabiduría universal|Iluminación|Creatividad|Autoconocimiento|Intuición'],['Arcángel Chamuel','Amor incondicional|Autoestima|Generosidad|Gratitud|Paciencia|Ternura'],['Arcángel Gabriel','Comunicación|Armonía|Alegría|Claridad|Ascensión|Niño interior'],['Arcángel Rafael','Curación|Sanación|Verdad|Esperanza|Perfección|Integración'],['Arcángel Uriel','Devoción|Vocación|Prosperidad|Plenitud|Manifestación|Gracia'],['Arcángel Zadquiel','Transmutación|Limpieza energética|Cambiar|Perdonar|Transformación|Independencia']],N3A)}]}
};
function n3graph(id){const g=N3G[id];const r=n3clamp(st('n3gr'+id,0),0,g.rings.length-1);const R=g.rings[r];const n=R.items.length;
 const key='n3gs'+id+'_'+r;const s=n3clamp(st(key,0),0,n-1);const it=R.items[s];
 const items=R.items.map((x,i)=>({l:x[0],t:n<=9?x[0]:undefined,c:(R.cols&&R.cols[i])||N3PAL[i%N3PAL.length]}));
 const fig=n2semi({key,items,sel:s,mode:n<=9?undefined:'num',fs:n<=9?11.5:n>26?9.5:11,wrap:n<=9?11:15,label:g.t+' · '+R.t+': '+n+' sectores'});
 return dkH(g.eb,g.t,g.lede)+
 (g.rings.length>1?chipRow('n3gr'+id,g.rings.map(x=>x.t),r):'')+
 `<div class="dk-grid c2" style="align-items:start"><div>${fig}<p class="dk-note" style="text-align:center">Toca un sector del gráfico o elige de la lista.</p></div>
 <div style="display:grid;gap:12px"><div class="detail"><span class="eyebrow">${R.t} · ${s+1} de ${n}</span><h3>${it[0]}</h3>${it[1]?`<p>${it[1]}</p>`:''}
  <div class="row"><button class="btn btn-ghost btn-sm" ${rxa('set',key,Math.max(0,s-1))} ${s===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('set',key,Math.min(n-1,s+1))} ${s===n-1?'disabled':''}>Siguiente</button><button class="btn btn-ghost btn-sm" ${rxa('n3rnd',key,n)}>Sector al azar</button></div></div>
  <div class="dk-call"><b>Cómo se usa.</b> ${g.how}</div>${g.decreto?`<div class="dk-call warn"><b>Decreto.</b> <i>${g.decreto}</i></div>`:''}</div></div>
 <div class="dk-chips" role="group" aria-label="Sectores">${R.items.map((x,i)=>`<button class="chip" ${rxa('set',key,i)} ${pressed(i===s)}>${i+1}. ${x[0]}</button>`).join('')}</div>`}
Object.keys(N3G).forEach(id=>{RICH['n3g_'+id]=()=>n3graph(id)});

const N3ARCT=[
 ['Arcángel Gabriel','Mensajero Divino, comunicación y claridad','Favorece la comunicación clara y efectiva|Ayuda a expresar la verdad con amor','Anuncia nuevos comienzos|Guía en decisiones importantes|Conecta con la intuición divina','Protege a niños, embarazadas y familias|Inspira creatividad y alegría'],
 ['Arcángel Chamuel','Amor Divino, paz y relaciones','Abre y sana el corazón|Fomenta el amor propio y la autoestima','Mejora relaciones de pareja, familia y amistades|Aporta paz emocional','Libera rencores y heridas del pasado|Promueve la compasión y la armonía'],
 ['Arcángel Jofiel','Iluminación, sabiduría y belleza','Ilumina la mente para comprender y aprender|Estimula la creatividad y la inspiración','Ayuda a tomar decisiones con sabiduría|Aporta claridad y perspectiva','Transforma pensamientos negativos|Aprecia la belleza en la vida'],
 ['Arcángel Miguel','Protección Divina, fuerza y fe','Protege de energías negativas y peligros|Fortalece la fe y la confianza','Brinda valor y determinación|Rompe miedos y bloqueos|Defiende la verdad y la justicia','Purifica y limpia el aura|Acompaña en procesos de transformación'],
 ['Arcángel Rafael','Sanación Divina, salud y bienestar','Sana el cuerpo, la mente y el espíritu|Equilibra y armoniza','Apoya tratamientos médicos y recuperaciones|Alivia el dolor y el estrés','Renovación y regeneración|Promueve hábitos saludables y bienestar integral'],
 ['Arcángel Uriel','Luz Divina, sabiduría y prosperidad','Ilumina soluciones prácticas|Aporta orden y discernimiento','Abre caminos de prosperidad y abundancia|Favorece el éxito en proyectos','Transforma ideas en acción|Brinda estabilidad y seguridad material'],
 ['Arcángel Zadquiel','Transmutación, perdón y libertad','Transmuta energías negativas en positivas|Libera culpas y resentimientos','Favorece el perdón propio y hacia otros|Eleva la vibración espiritual','Acompaña cambios profundos|Conecta con la libertad del alma y la compasión']];
RICH.n3parcT=()=>{const L=x=>`<ul style="margin:0 0 8px;padding-left:20px;display:grid;gap:3px">${x.split('|').map(y=>`<li>${y}</li>`).join('')}</ul>`;
 const s=n3clamp(st('n3at',0),0,6);const a=N3ARCT[s];
 return dkH('Protocolo · Cierre','¿A qué se dedica cada arcángel?','Toca un arcángel para ver con qué te ayuda.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${N3ARCT.map((x,i)=>`<button class="sel" ${rxa('set','n3at',i)} ${pressed(i===s)}><i class="dot" style="background:${[N3A[3],N3A[2],N3A[1],N3A[0],N3A[4],N3A[5],N3A[6]][i]}"></i><b>${x[0]}</b></button>`).join('')}</div>
 <div class="detail" style="gap:8px"><span class="eyebrow">${a[1]}</span><h3>${a[0]}</h3><b>¿Qué te ayuda a lograr?</b>${L(a[2])}<b>¿Cómo te apoya en tu vida?</b>${L(a[3])}<b>¿En qué áreas actúa?</b>${L(a[4])}</div></div>
 <div class="dk-call">Conecta con el arcángel que necesitas y pide su guía y apoyo con fe y gratitud.</div>`};
const N3CHK=[['¿Yo Superior, hay algo más que limpiar?','Si la respuesta es sí, volver al gráfico Mapa y continuar con la investigación. Si es no, continuar con el barrido.'],['¿Hay algo más que ustedes puedan hacer?','Si la respuesta es sí, pedir que limpien todos los programas tanto dentro como fuera de los gráficos. Si es no, continuar con el barrido.'],['¿En qué % está Yo Superior de acuerdo con la limpieza?','Debe ser 100 %. De lo contrario, pedir que por favor realice un barrido completo para que sea al 100 %.'],['¿En qué % está mi alma (o del consultante) de acuerdo con la limpieza?','Debe ser 100 %. De lo contrario, pedir que limpie el alma en profundidad, para que sea al 100 %.']];
RICH.n3pchk=()=>{const o=st('n3chk',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Protocolo · Cierre','Chequeos finales','Verificación y cierre de la terapia. Realizamos estos chequeos para asegurar una limpieza profunda y efectiva y cerrar la sesión en armonía.')+
 `<div class="sel-list">${N3CHK.map((x,i)=>`<button class="ck" ${rxa('tog','n3chk',i)} ${pressed(o[i])}><span class="box"></span><span><b>${i+1}. ${x[0]}</b><br><small class="muted">${x[1]}</small></span></button>`).join('')}</div>
 <div class="prog"><span>${n} de 4</span><div class="bar"><i style="width:${n/4*100}%"></i></div></div>
 <div class="dk-call ${n===4?'':'warn'}">${n===4?'<b>Para finalizar damos las gracias,</b> pedimos que cierren sesión y todos los portales abiertos.':'Completa los cuatro chequeos antes de cerrar la sesión.'}</div>`};
const N3QP=[
 {q:'¿Cuánto tiempo debe indicar la preparación del Yo Superior y la tuya para trabajar?',o:['0 % de tiempo','50 % de tiempo','100 % de tiempo'],a:0,e:'Si no es así, pide que limpien para que sea en 0 % de tiempo y repite la pregunta.'},
 {q:'¿Qué nivel de consciencia deben mostrar el Yo Superior y el Comité Espiritual?',o:['Muy bajo','Infinito','Cuerpo físico'],a:1,e:'Si no, se pide que limpien y eleven al nivel más expandido e infinito.'},
 {q:'En el gráfico Mapa, ¿qué porcentaje debe mostrar el ego antes de trabajar?',o:['0 %','50 %','100 %'],a:0,e:'Si no, se pide limpiar al 100 % todo el ego y los mecanismos del ego.'},
 {q:'¿Qué porcentaje debe mostrar la neutralidad?',o:['0 %','100 %','Cualquiera'],a:1,e:'Se necesita ser un canal 100 % neutro para trabajar.'},
 {q:'¿Qué punto marca el equilibrio en el gráfico de chakras de 0 a 14.000?',o:['7.000','0','14.000'],a:0,e:'Hasta 5.000 bloqueado; de 6.000 a 8.000 equilibrado; desde 9.000, muy abierto.'},
 {q:'¿Qué arcángel se relaciona con la sanación divina, la salud y el bienestar?',o:['Uriel','Rafael','Gabriel'],a:1,e:'Rafael sana cuerpo, mente y espíritu; Miguel protege; Gabriel comunica; Uriel trae prosperidad.'},
 {q:'En los chequeos finales, ¿en qué % debe estar Yo Superior respecto de la limpieza?',o:['50 %','80 %','100 %'],a:2,e:'Si no es 100 %, se pide un barrido completo para que lo sea.'},
 {q:'¿Cómo se finaliza la sesión?',o:['Sin hacer nada más','Dando las gracias y pidiendo que cierren sesión y todos los portales abiertos','Repitiendo el gráfico Mapa'],a:1,e:'El cierre es parte esencial del protocolo.'}];
RICH.n3pquiz=()=>n3quiz('pm',N3QP,['Dominas lo esencial del Protocolo.','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar el Protocolo. Puedes volver cuando quieras.']);
