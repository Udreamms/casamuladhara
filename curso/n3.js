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
  {t:'Otros bloqueos',...n3grp([['Larvas astrales','Culpa|Dependencia|Falta de confianza|Envidia|Odio a la vida|Odio a sí mismo'],['Entidades parasitarias','Frustración|Inestabilidad|Crítica / Celos|Baja autoestima|Mentira'],['Miasmas','Violencia|Egocentrismo|Tristeza|Rechazo|Manipulación|Confusión'],['Lazos o cordones energéticos','Depresión|Inseguridad|Angustia|Sobrepeso|Estreñimiento'],['Otros (fuera del gráfico)','Negación|Abandono|Negatividad|Falta de amor propio|Miedo|Rabia']],N3PAL)}]},
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

/* ================= CLASE 3 · Yo Superior y biómetros ================= */
Object.assign(IC,{
 cruz:'<path d="M7 7l10 10M17 7 7 17"/>',
 infinito:'<path d="M12 12c-2.5-3-6.5-3-6.5 0s4 3 6.5 0 6.5-3 6.5 0-4 3-6.5 0z"/>',
 sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 balanza:'<path d="M12 4v16M7 20h10M5 8h14M5 8l-3 6h6zM19 8l-3 6h6z"/>',
 paloma:'<path d="M3 13c3 0 5-2 6-5 1 3 3 4 6 4l4-3-1 4c-1 4-5 6-9 6-3 0-5-2-6-6z"/>',
 hoja:'<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7"/>',
 manzana:'<path d="M12 7c-3-2-8-1-8 5s4 9 6 9c1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 6-3 6-9s-5-7-8-5zM12 7c0-2 1-4 3-4"/>',
 reloj:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
});
const N3C3P=N3P+'c3/';
const c3img=(f,alt,st)=>`<img src="${N3C3P}${f}" alt="${alt}" loading="lazy" decoding="async" style="display:block;max-width:100%;height:auto;border-radius:20px;justify-self:center;${st||''}">`;

/* ----- 1 · Bienvenida y objetivos ----- */
const N3C3T=[['loto','Conexión con tu Yo Superior','Aprenderemos a conectar con tu esencia, obtener guía y claridad.'],['estrella','Biómetro de Bovis','Utilizaremos el Biómetro de Bovis para medir la energía vital.'],['camino','Gráfico Mapa / Guía','Aprenderemos a leer e interpretar el gráfico para guiar procesos de sanación.'],['check','Preparación energética','Preparación de nosotros y del espacio para una sesión consciente y efectiva.']];
RICH.n3c1=()=>nbHero('Clase 3','Yo Superior y biómetros','En esta clase aprenderemos','Estas herramientas nos permiten medir, interpretar y armonizar las energías para acompañar procesos de transformación y sanación.',['Sanación','Consciencia','Propósito'],'Radiestesia y Sanación del Alma',
 `<div class="nb-pw">${pndSVG('c3hero',{dark:1,mode:'cw',amp:58,len:15,amb:1,cap:0})}</div>`)+
 `<div><div class="dk-sub">En esta clase aprenderemos · toca cada tarjeta</div>${n3flip('n3c3t',N3C3T,'c4',180)}</div>`;
const N3C3O=[['loto','Conectar','Reconocer y comprender qué es el Yo Superior y su importancia en nuestro camino.'],['corazon','Identificar','Distinguir las señales, mensajes y formas de comunicación de nuestro Yo Superior.'],['armoniza','Preparar','Aprender a preparar nuestro cuerpo, mente y energía para establecer una conexión clara y segura.'],['escudo','Proteger','Conocer herramientas de protección y enraizamiento para mantenernos en equilibrio.'],['pend','Aplicar','Realizar un ejercicio práctico para conectar con nuestro Yo Superior a través del péndulo.']];
RICH.n3c2=()=>dkH('Clase 3','Objetivos','Cinco pasos que recorreremos juntas en esta clase.')+
 `<div class="dk-split" style="align-items:center">${c3img('yo.webp','Mujer meditando sobre una flor de loto, con una luz sobre su cabeza','max-height:420px')}<div>${n3sel('n3c3o',N3C3O,{eb:'Objetivo',nav:1})}</div></div>`;

/* ----- 2 · El Yo Superior ----- */
const N3C3Q=[['loto','Conciencia elevada','Es un estado de conciencia superior, libre del ego, del miedo y de las limitaciones de la mente. Desde ahí vemos la vida con claridad, comprensión y compasión.'],['corazon','Guía interior','El Yo Superior siempre está con nosotros. Nos guía, nos protege y nos muestra el camino más alineado con nuestro propósito de alma.'],['infinito','Conexión divina','Es nuestro puente con la fuente universal de amor, sabiduría y abundancia. A través de esta conexión recibimos inspiración, respuestas y sanación.'],['estrella','Nuestro verdadero ser','No tiene juicio, solo amor. No tiene prisa, solo presencia. No busca controlar, sino expandirse en paz, luz y armonía.'],['sol','Siempre dispuesto a ayudarnos','Cuando nos conectamos con nuestro Yo Superior, accedemos a nuestra intuición, a nuestra verdad y a nuestra fuerza interior para vivir una vida más plena y consciente.']];
RICH.n3c3=()=>dkH('El Yo Superior','¿Qué es el Yo Superior?','El Yo Superior es la parte más elevada de nuestro ser, nuestra esencia divina y eterna. Es la conexión con nuestra sabiduría infinita, con el amor incondicional y con la fuente universal que todo lo crea.')+n3flip('n3c3q',N3C3Q,'c3',210);
const N3C3NO=['No habla desde el miedo.','No juzga.','No obliga.','No castiga.'],N3C3SI=[['paloma','La paz'],['corazon','El amor'],['estrella','La claridad'],['hoja','La verdad']];
RICH.n3c4=()=>{const o=st('n3c3no',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('El Yo Superior','¿Qué no es el Yo Superior?','Muchas personas creen que el Yo Superior es una voz externa o un ser separado de nosotros. En realidad, el Yo Superior no es una entidad ajena, sino la expresión más elevada de nuestra propia conciencia.')+
 `<div class="dk-grid c3" style="align-items:center"><div style="display:grid;gap:10px"><div class="dk-sub">El Yo Superior no · toca cada frase</div><div class="sel-list">${N3C3NO.map((x,i)=>`<button class="ck" ${rxa('tog','n3c3no',i)} ${pressed(o[i])}>${ic('cruz',22)}<span>${o[i]?'<s>'+x+'</s>':x}</span></button>`).join('')}</div></div>
 ${c3img('silueta.webp','Silueta luminosa en meditación','max-height:300px;opacity:'+(.45+n*.14))}
 <div style="display:grid;gap:10px"><div class="dk-sub">Su lenguaje siempre nace desde</div><div class="sel-list">${N3C3SI.map((x,i)=>`<div class="ck" style="cursor:default;opacity:${i<n?1:.45}">${ic(x[0],22)}<span><b>${x[1]}</b></span></div>`).join('')}</div></div></div>
 <div class="dk-call${n===4?'':' warn'}">${n===4?'Cuando sueltas el miedo, el juicio, la obligación y el castigo, queda el lenguaje del Yo Superior: <b>paz, amor, claridad y verdad.</b>':'Toca cada frase de la izquierda para soltarla.'}</div>`};
const N3C3EG=[['reloj','Quiere respuestas inmediatas.'],['lupa','Duda constantemente.'],['diana','Busca controlar el resultado.'],['ola','Habla desde el miedo y la preocupación.'],['grupo','Se compara con los demás.'],['birrete','Necesita tener la razón.'],['irradia','Reacciona impulsivamente.']];
const N3C3YS=[['hoja','Inspira tranquilidad.'],['libro','Habla con claridad y sencillez.'],['camino','No impone, orienta.'],['corazon','Confía en el proceso.'],['armoniza','Actúa desde el amor.'],['arbol','Invita a crecer.'],['reloj','Siempre respeta nuestros tiempos.']];
const N3C3MIX=[[0,0],[1,2],[1,0],[0,3],[0,1],[1,5],[0,6],[1,1],[0,2],[1,4],[1,6],[0,4],[1,3],[0,5]];
RICH.n3c5=()=>{const t=st('n3c3ev',0);
 if(t===1){const z=st('n3c3eg',{});const done=Object.keys(z).length;const ok=Object.keys(z).filter(k=>z[k]===N3C3MIX[k][0]).length;
  return dkH('Ego vs. Yo Superior','¿Desde dónde estás escuchando?','Practica: ¿esta voz viene del ego o del Yo Superior?')+chipRow('n3c3ev',['Comparar','Practica'],t)+
  `<div class="sel-list">${N3C3MIX.map((m,i)=>{const x=(m[0]?N3C3YS:N3C3EG)[m[1]],a=z[i];return `<div class="ck" style="cursor:default;display:flex;flex-wrap:wrap;gap:8px;align-items:center"><span style="flex:1 1 200px">${x[1]}</span><button class="chip" ${rxa('n3c3eg',i,0)} ${pressed(a===0)}>Ego</button><button class="chip" ${rxa('n3c3eg',i,1)} ${pressed(a===1)}>Yo Superior</button>${a!==undefined?`<b class="${a===m[0]?'nb-ok':'nb-no'}">${a===m[0]?'Bien':'Revisa'}</b>`:''}</div>`}).join('')}</div>
  <div class="prog"><span>${ok} de ${N3C3MIX.length} correctas</span><div class="bar"><i style="width:${ok/N3C3MIX.length*100}%"></i></div></div>
  ${done?`<div class="row"><button class="btn btn-ghost btn-sm" ${rxa('n3c3egr',0,0)}>Empezar de nuevo</button></div>`:''}`}
 const col=(h,ico,p,items,c)=>`<div class="detail" style="border-top:6px solid ${c}"><span class="eyebrow">${ico}</span><h3>${h}</h3><p>${p}</p><div class="dk-sub">Se manifiesta como</div><div class="sel-list">${items.map(x=>`<div class="ck" style="cursor:default">${ic(x[0],22)}<span>${x[1]}</span></div>`).join('')}</div></div>`;
 return dkH('Ego vs. Yo Superior','¿Desde dónde estás escuchando?')+chipRow('n3c3ev',['Comparar','Practica'],t)+
 `<div class="dk-grid c2" style="align-items:start">${col('Ego','La mente','El ego tiene una función importante: protegernos. Sin embargo, cuando dirige nuestras decisiones espirituales, puede confundir la intuición con el miedo.',N3C3EG,'#b07a4a')}${col('Yo Superior','La conciencia','El Yo Superior representa nuestra conciencia más elevada. Nos guía desde la paz, la sabiduría y el amor, respetando siempre nuestro libre albedrío.',N3C3YS,'#5f7f55')}</div>
 <div class="dk-call"><b>Reflexión.</b> Antes de realizar una lectura radiestésica, pregúntate: <i>«¿La respuesta que estoy esperando nace desde mi necesidad de controlar o desde la paz de mi conciencia?»</i> La calidad de una respuesta radiestésica depende, en gran parte, del estado interno desde el cual realizamos la consulta.</div>`};

/* ----- 3 · Preparación energética ----- */
const N3C3F=[['loto','Respira conscientemente','Respira profundo y lento. Calma tu mente y tu cuerpo.'],['corazon','Silencia tu mente','Suelta pensamientos innecesarios. Observa sin juzgar.'],['persona','Coherencia corazón-mente','Lleva tu atención al corazón. Siente gratitud y amor.'],['estrella','Intención clara','Define tu propósito antes de conectar. Pide guía con el corazón.'],['armoniza','Presencia plena','Confía y permite que tu Yo Superior te guíe.']];
RICH.n3c6=()=>{const s=n3clamp(st('n3c3f',0),0,4);
 return dkH('Preparación energética','¿Cómo elevar la frecuencia para conectar con el Yo Superior?','La preparación energética es el primer paso para reducir el ruido mental, elevar la vibración y favorecer una comunicación intuitiva más precisa. Recorre los cinco pasos con calma.')+
 `<div class="breath" aria-hidden="true"></div>`+n3sel('n3c3f',N3C3F,{eb:'Paso',nav:1})+
 `<div class="prog"><span>Paso ${s+1} de 5</span><div class="bar"><i style="width:${(s+1)/5*100}%"></i></div></div>`+
 n3quote('Elevar tu frecuencia es abrir tu <mark>canal interno de sabiduría, amor y luz.</mark>')};
const N3C3E=[['hoja','Presencia','Estar completamente en el aquí y ahora.'],['ola','Calma','Mantener la mente y el cuerpo en calma.'],['estrella','Confianza','Confiar en la guía interna y en el proceso de la vida.'],['balanza','Neutralidad','Soltar juicios y expectativas para percibir con claridad.'],['corazon','Gratitud','Agradecer eleva tu energía y abre tu corazón.'],['paloma','Apertura','Estar dispuesto a recibir sabiduría y guía.']];
RICH.n3c7=()=>{const o=st('n3c3e',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Preparación energética','Estados de conciencia para una conexión clara','Cultivar estos estados internos favorece una conexión clara, estable y consciente con el Yo Superior. Antes de practicar, marca los que sientes presentes en ti ahora.')+
 `<div class="dk-split" style="align-items:start">${c3img('camino.webp','Sendero de piedras en un bosque iluminado por el sol','max-height:440px;filter:saturate('+(.3+n*.12)+')')}<div style="display:grid;gap:12px">${n3ck('n3c3e',N3C3E.map(x=>[x[0],`<b>${x[1]}.</b> ${x[2]}`]),['Respira y vuelve a revisar cuando te sientas lista.','Tu estado interno está alineado para conectar.'])}</div></div>`+
 n3quote('Cuando tu estado interno está alineado, <mark>la conexión con tu Yo Superior se vuelve clara y precisa.</mark>')};

/* ----- 4 · Biómetro de Bovis ----- */
const N3C3B=[['diana','Primeros gráficos de Bovis','Aprenderemos a interpretar los primeros gráficos del Biómetro de Bovis y su relación con la energía vital.'],['camino','Trabajaremos el Mapa Guía','Aprenderemos a leer e interpretar el Mapa Guía para guiar procesos de sanación y equilibrio energético.'],['loto','Alineación de chakras','Realizaremos alineación y armonización de chakras para equilibrar el flujo energético y fortalecer nuestro campo áurico.']];
RICH.n3c8=()=>dkH('Biómetros de Bovis','En esta parte aprenderemos','Estas herramientas nos permiten medir, interpretar y armonizar las energías para acompañar procesos de transformación y sanación.')+n3flip('n3c3b',N3C3B,'c3',200);
const N3C3EV=[['persona','Personas'],['loto','Chakras'],['casa','Espacios'],['libro','Objetos'],['manzana','Alimentos'],['hoja','Plantas'],['corazon','Animales'],['armoniza','Terapias']];
RICH.n3c9=()=>{const o=st('n3c3ev8',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Metodología Casa Muladhara®','¿Qué es el Biómetro de Bovis?')+
 `<div class="dk-grid c2" style="align-items:start"><div class="detail"><span class="eyebrow">1 · ¿Qué es?</span><p>El Biómetro de Bovis es una plantilla radiestésica que permite cuantificar la <b>energía vital</b> mediante una escala de <b>Unidades Bovis (UB)</b>.</p><p>Se utiliza junto al péndulo para evaluar el estado energético de personas, espacios, objetos y diferentes elementos.</p></div>
 <div class="detail"><span class="eyebrow">2 · ¿Para qué sirve?</span>${n3ck('n3c3ps',[['check','Medir el nivel energético.'],['check','Detectar bloqueos o excesos de energía.'],['check','Comparar mediciones antes y después de una terapia.'],['check','Evaluar la armonía energética.']])}</div></div>
 <div><div class="dk-sub">3 · ¿Qué podemos evaluar? · toca cada uno</div><div class="dk-chips" role="group">${N3C3EV.map((x,i)=>`<button class="chip" ${rxa('tog','n3c3ev8',i)} ${pressed(o[i])}>${ic(x[0],18)} ${x[1]}</button>`).join('')}</div><p class="dk-note">${n} de 8. Todo es energía: todo puede medirse con el Biómetro.</p></div>
 <div class="dk-call warn"><b>Nota importante.</b> El péndulo capta la información; el Biómetro únicamente organiza e interpreta la respuesta. <b>No es el gráfico quien mide, sino tu conexión radiestésica.</b></div>`};
const N3C3UB=[['ola','Cuantifican','Permiten cuantificar el nivel energético de personas, espacios, objetos y diferentes elementos.'],['pend','Junto al péndulo','Se utilizan junto al péndulo, que capta la información energética.'],['irradia','De 0 a más de 10.000 UB','La escala va desde 0 hasta más de 10.000 UB, permitiendo identificar el estado energético en el que se encuentra cada elemento.'],['loto','Orientan la sanación','Su objetivo es orientar el proceso de sanación y armonización energética.']];
RICH.n3c10=()=>dkH('Metodología Casa Muladhara®','¿Qué son las Unidades Bovis (UB)?','Las Unidades Bovis son una escala de medida de la energía vital desarrollada por el físico André Bovis. Toca cada tarjeta.')+n3flip('n3c3ub',N3C3UB,'c4',200)+
 n3quote('Es una herramienta <mark>sencilla, profunda y amorosa</mark> para acompañar procesos de equilibrio y bienestar.');
/* evaluación energética de chakras: 0 a 14.000 UB */
const C3BV=[[0,5000,'Bajo / bloqueado','Déficit de energía. Puede haber bloqueo, estrés o fatiga.','#c94a3a'],[5001,5999,'En ascenso','Energía en proceso de activación.','#e5822f'],[6000,8000,'Equilibrado','Flujo energético armónico, salud y bienestar.','#5f9a4f'],[8001,9000,'Expansión','Energía elevada, crecimiento y vitalidad.','#e3b52e'],[9001,14000,'Hiperactivo','Exceso de energía. Puede generar sobrecarga, alerta, ansiedad o agitación.','#8e6bc0']];
const c3bvl=v=>C3BV.find(r=>v>=r[0]&&v<=r[1])||C3BV[C3BV.length-1];
function c3gauge(v){const cx=200,cy=204,r0=92,r1=184,M=14000,cur=c3bvl(v);
 const bands=C3BV.map(b=>{const a0=Math.PI+b[0]/M*Math.PI,a1=Math.PI+Math.min(b[1]+1,M)/M*Math.PI,on=b===cur;
  return `<g ${rxa('set','n3c3bv',Math.round((b[0]+Math.min(b[1],M))/2/100)*100)} role="button" tabindex="0" aria-label="${b[2]}: ${n2f(b[0])} a ${n2f(b[1])} UB" aria-pressed="${on}"><path d="${n2sec(cx,cy,r0,r1,a0,a1)}" fill="${b[4]}" stroke="${on?'var(--fg)':'var(--surface)'}" stroke-width="${on?3.5:1.5}" stroke-linejoin="round" opacity="${on?1:.75}"/></g>`}).join('');
 const ticks=[0,2000,4000,6000,8000,10000,12000,14000].map(t=>{const a=Math.PI+t/M*Math.PI,[x,y]=n2P(cx,cy,r1+8,a),an=t<7000?'end':t>7000?'start':'middle';return `<text x="${n2N(x)}" y="${n2N(y+(t===0||t===M?-1:3))}" text-anchor="${an}" font-size="10" fill="var(--muted)">${n2f(t)}</text>`}).join('');
 const na=Math.PI+n3clamp(v,0,M)/M*Math.PI,[nx,ny]=n2P(cx,cy,r1-10,na);
 return n2svg('-28 0 456 214',bands+ticks+`<line x1="${cx}" y1="${cy}" x2="${n2N(nx)}" y2="${n2N(ny)}" stroke="var(--fg)" stroke-width="4" stroke-linecap="round" style="pointer-events:none"/><circle cx="${cx}" cy="${cy}" r="9" fill="var(--fg)" style="pointer-events:none"/>`,'Evaluación energética de chakras de 0 a 14.000 UB')}
function c3bvOut(v){const r=c3bvl(v),c=CHAKRAS[n3clamp(st('n3c3ch',3),0,6)];
 return c3gauge(v)+`<div class="dk-split" style="margin-top:6px"><div style="text-align:center"><span class="qscore" style="font-size:clamp(2.6rem,6vw,3.6rem)">${n2f(v)}</span><div class="dk-note">UB · chakra ${c.n}</div></div><div class="detail" style="border-left:6px solid ${r[4]}"><span class="eyebrow">${n2f(r[0])} a ${n2f(r[1])} UB</span><h3>${r[2]}</h3><p>${r[3]}</p></div></div>`}
function n3c3bvUpd(){const o=document.getElementById('c3bv-out');if(o)o.innerHTML=c3bvOut(st('n3c3bv',7000))}
RICH.n3c11=()=>{const v=st('n3c3bv',7000),ch=n3clamp(st('n3c3ch',3),0,6);
 return dkH('Metodología Casa Muladhara®','Evaluación energética de chakras','Elige un chakra y mueve el control, o toca el medidor, como si el péndulo hubiera indicado ese valor.')+
 `<div class="dk-chips" role="group">${CHAKRAS.map((c,i)=>`<button class="chip" ${rxa('set','n3c3ch',i)} ${pressed(i===ch)}><i style="background:${c.c};width:10px;height:10px;border-radius:50%;display:inline-block"></i> ${c.n}</button>`).join('')}</div>
 <label class="dk-note" for="c3bv">Medición del péndulo (0 a 14.000 UB)</label><input type="range" class="n2-range" id="c3bv" data-n3c3bv min="0" max="14000" step="100" value="${v}">
 <div id="c3bv-out" style="display:grid;gap:14px">${c3bvOut(v)}</div>
 <div class="dk-call"><b>Cómo utilizar.</b> Sostén el péndulo sobre el centro del gráfico, formula tu pregunta y observa el movimiento. La escala donde se detenga o estabilice el péndulo indicará el nivel energético del chakra evaluado.</div>
 <div class="dk-grid c3">${[['persona','Personas','Estado energético físico, emocional, mental y espiritual.'],['libro','Objetos','Herramientas, cristales, amuletos, agua, alimentos, etc.'],['casa','Lugares','Hogares, habitaciones, oficinas, terrenos, espacios sagrados.'],['camino','Situaciones','Eventos, decisiones, relaciones, proyectos, procesos.'],['corazon','Tratamientos','Terapias, limpiezas, oraciones, intenciones, afirmaciones, etc.']].map(x=>`<div class="ck" style="cursor:default">${ic(x[0],22)}<span><b>${x[1]}.</b> ${x[2]}</span></div>`).join('')}</div>
 ${n3quote('Medir es comprender, comprender es transformar, <mark>transformar es sanar.</mark> Todo es energía: todo vibra, todo se transforma.')}`};
const N3C3FM=[['corazon','Emociones','Estados emocionales intensos pueden elevar o disminuir la energía.'],['loto','Estrés','El estrés físico, mental o emocional puede afectar la medición.'],['escudo','Enfermedad','Procesos físicos que cursa el cuerpo pueden disminuir la energía.'],['manzana','Alimentación','Los alimentos que consumimos influyen en nuestro campo energético.'],['casa','Lugares','Los espacios pueden estar cargados, drenados o equilibrados.'],['grupo','Personas','La energía de otras personas puede influir positiva o negativamente.']];
RICH.n3c12=()=>{const v=st('n3c3fv',0);
 return dkH('Pregunta para reflexionar','¿Qué crees que puede modificar una medición energética?','Escribe tu respuesta antes de ver los factores.')+n3area('n3c3fq','Tu respuesta','Escribe lo que crees…')+n3priv+
 (v?`<div class="dk-sub">Factores que modifican una medición · toca cada tarjeta</div><p class="dk-lede" style="margin:0">La medición con el Biómetro de Bovis puede verse influenciada por diferentes factores. Es importante tomarlos en cuenta para una <b>lectura consciente</b>.</p>${n3flip('n3c3fm',N3C3FM,'c3',170)}
 <div class="dk-call">Por eso es fundamental <b>realizar varias mediciones, observar el contexto y confiar en tu intuición.</b></div>`
 :`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','n3c3fv',1)}>Ver los factores</button></div>`)};

/* ----- 5 · Mapa Guía ----- */
const N3C3MG=[['pend','Cómo utilizar el Mapa Guía','<ol style="margin:0;padding-left:20px;display:grid;gap:4px"><li>Formula tu pregunta de manera clara y específica.</li><li>Ubica el área correspondiente en el mapa.</li><li>Pide la respuesta con tu péndulo.</li><li>Actúa según la información recibida, siempre para el mayor bien.</li></ol>'],['diana','Lectura del porcentaje','Indica el nivel o intensidad del tema consultado.<br><b>0 %</b> ausente / no presente · <b>25 %</b> bajo · <b>50 %</b> moderado · <b>75 %</b> alto · <b>100 %</b> muy alto / total.'],['check','Uso del SÍ / NO','Para preguntas que requieren respuesta directa. Úsalo para confirmar, descartar o tomar decisiones dentro de la sesión.'],['reloj','Línea del tiempo','Permite identificar en qué momento de la vida se origina el tema: vientre materno, niñez, adolescencia, adultez, vida presente, vidas pasadas o vida futura. Pregunta y deja que tu péndulo te indique el período correspondiente.'],['loto','Áreas terapéuticas','Explora las diferentes áreas para obtener claridad y orientación: salud y bienestar, chakras y energía, Yo Superior y guía, bloqueos e interferencias, minerales y vitaminas, vida espiritual, dinero, trabajo y abundancia, relaciones y vida afectiva, terapias y sanación, y más.']];
RICH.n3c13=()=>{const s=n3clamp(st('n3c3mg',0),0,4),x=N3C3MG[s];
 return dkH('Mapa Guía Casa Muladhara®','El centro de navegación de toda la sesión radiestésica','El Mapa Guía reúne en un solo gráfico las principales áreas de exploración utilizadas durante una sesión. No reemplaza la intuición del terapeuta: la organiza. Cada respuesta obtenida con el péndulo orienta el siguiente paso del proceso terapéutico de manera clara, ordenada y consciente.')+
 `<a href="${N3C3P}mapa_guia.webp" target="_blank" rel="noopener">${c3img('mapa_guia.webp','Gráfico Mapa / Guía Casa Muladhara','border-radius:14px;border:1px solid var(--line)')}</a><p class="dk-note" style="text-align:center">Toca la lámina para verla en grande. En la siguiente lección la usarás de forma interactiva.</p>
 <div class="dk-grid c2" style="align-items:start"><div class="detail"><span class="eyebrow">¿Para qué sirve?</span><ul style="margin:0;padding-left:20px;display:grid;gap:4px"><li>Localizar rápidamente el área de trabajo.</li><li>Orientar el orden de la sesión.</li><li>Reducir preguntas innecesarias.</li><li>Favorecer una lectura objetiva.</li><li>Mantener un protocolo estructurado.</li></ul></div>
 <div class="detail"><span class="eyebrow">Principio Casa Muladhara®</span><p style="font-family:var(--f-display);font-style:italic;font-size:1.08rem">El mapa no toma decisiones. La conciencia del terapeuta es quien interpreta la información.</p></div></div>
 <div class="dk-chips" role="group">${N3C3MG.map((y,i)=>`<button class="chip" ${rxa('set','n3c3mg',i)} ${pressed(i===s)}>Gráfico ${i+1}</button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">Gráfico ${s+1} de 5</span><h3>${x[1]}</h3><div>${x[2]}</div></div>
 ${n3quote('El Mapa Guía Casa Muladhara es tu aliado para sesiones claras, conscientes y poderosas. <mark>Confía en tu conexión. Confía en la información. Confía en la sabiduría de tu Yo Superior.</mark>')}`};

/* ----- 6 · Repaso y cierre ----- */
const N3Q3=[
 {q:'¿Qué es el Yo Superior?',o:['Una voz externa, separada de nosotros','La parte más elevada de nuestro ser, nuestra esencia divina y eterna','Un guía que decide por nosotros'],a:1,e:'No es una entidad ajena: es la expresión más elevada de nuestra propia conciencia.'},
 {q:'¿Desde dónde nace el lenguaje del Yo Superior?',o:['Desde el miedo y la urgencia','Desde la paz, el amor, la claridad y la verdad','Desde la obligación'],a:1,e:'El Yo Superior no habla desde el miedo, no juzga, no obliga y no castiga.'},
 {q:'«Quiere respuestas inmediatas y busca controlar el resultado». ¿Quién habla?',o:['El Yo Superior','El ego','El Comité Espiritual'],a:1,e:'El Yo Superior inspira tranquilidad, no impone y respeta nuestros tiempos.'},
 {q:'¿Cuál es el primer paso para elevar la frecuencia?',o:['Respirar conscientemente','Hacer muchas preguntas seguidas','Medir con el Biómetro'],a:0,e:'Respira profundo y lento; luego silencia la mente, une corazón y mente, define tu intención y permanece en presencia plena.'},
 {q:'¿Qué mide el Biómetro de Bovis?',o:['La temperatura del cuerpo','La energía vital, en Unidades Bovis (UB)','Solo la energía de los espacios'],a:1,e:'Sirve para personas, chakras, espacios, objetos, alimentos, plantas, animales y terapias.'},
 {q:'¿Quién mide realmente en una lectura con el Biómetro?',o:['El gráfico','Tu conexión radiestésica, a través del péndulo','La persona consultante'],a:1,e:'El péndulo capta la información; el Biómetro solo la organiza e interpreta.'},
 {q:'En la evaluación de chakras, ¿qué rango indica equilibrio?',o:['0 a 5.000 UB','6.000 a 8.000 UB','Más de 9.000 UB'],a:1,e:'Bajo 5.000 hay déficit o bloqueo; sobre 9.000, hiperactividad o exceso de energía.'},
 {q:'¿Qué puede modificar una medición energética?',o:['Nada: la medición siempre es igual','Emociones, estrés, enfermedad, alimentación, lugares y personas','Solo el tipo de péndulo'],a:1,e:'Por eso conviene hacer varias mediciones, observar el contexto y confiar en la intuición.'},
 {q:'Según el principio Casa Muladhara®, el Mapa Guía…',o:['Toma las decisiones de la sesión','No toma decisiones: la conciencia del terapeuta interpreta la información','Reemplaza la intuición'],a:1,e:'El mapa organiza la intuición, no la reemplaza.'},
 {q:'En la preparación, ¿qué tiempo debe mostrar el péndulo para preparar al Yo Superior?',o:['0 % de tiempo','50 % de tiempo','Una hora'],a:0,e:'Si no, se pide que lo limpien para que sea en 0 % de tiempo y se repite la pregunta.'}];
RICH.n3c14=()=>n3quiz('c3',N3Q3,['Dominas lo esencial de la Clase 3.','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);
RICH.n3c15=()=>nbHero('Cierre de la clase','Gracias por participar de esta clase','','Tu presencia y compromiso hacen crecer este espacio de aprendizaje y sanación.',['Sanación','Consciencia','Propósito'],'Que tu luz sea la guía y la sanación sea el camino')+
 `<div class="dk-call">Practica la preparación y la oración de apertura antes de cada trabajo, y mide tus chakras con el Biómetro. Nos vemos en la próxima clase.</div>`;

/* ================= CLASE 4 · Interpretación terapéutica y evaluación energética integral ================= */
Object.assign(IC,{
 nino:'<circle cx="12" cy="7" r="3.5"/><path d="M6 21v-3a6 6 0 0 1 12 0v3M10 15.5l2 1.5 2-1.5"/>',
 nudo:'<path d="M4 12c0-3 3-4 5-2l6 4c2 2 5 1 5-2s-3-4-5-2l-6 4c-2 2-5 1-5-2z"/>',
 candado:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 ala:'<path d="M12 8c-3-4-9-3-9 2 0 4 4 7 9 9M12 8c3-4 9-3 9 2 0 4-4 7-9 9M9 4a3 1.2 0 1 0 6 0 3 1.2 0 1 0-6 0"/>',
 bateria:'<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4M6 13h4"/>',
 utero:'<path d="M12 21v-5M8 16h8M6 6c-2 0-3 2-2 3s3 0 4 2v3a4 4 0 0 0 8 0v-3c1-2 3-1 4-2s0-3-2-3"/>'
});
const N3C4P=N3P+'c4/';
const c4img=(f,alt,s)=>`<img src="${N3C4P}${f}" alt="${alt}" loading="lazy" decoding="async" style="display:block;max-width:100%;height:auto;border-radius:20px;justify-self:center;${s||''}">`;
/* mini Mapa Guía con los pétalos señalados. ring 0 = áreas, 1 = etapas de la vida */
const c4map=(ring,hl,cap)=>{const R=N3G.mapa.rings[ring].items;
 const items=R.map((x,i)=>({l:x[0],t:x[0],c:hl.includes(i)?'#a9a3dc':'#efe7d6'}));
 return `<div>${n2semi({key:'c4mk',items,sel:hl[0],fs:hl.length>2?9.5:11,wrap:12,only:i=>hl.includes(i),act:()=>'',label:'Mapa Guía: '+hl.map(i=>R[i][0]).join(', ')})}<p class="dk-note" style="text-align:center">${cap||'Así se ve este pétalo en el Mapa Guía.'}</p></div>`};
const c4li=items=>`<div class="sel-list">${items.map(x=>`<div class="ck" style="cursor:default">${ic(Array.isArray(x)?x[0]:'hoja',20)}<span>${Array.isArray(x)?x[1]:x}</span></div>`).join('')}</div>`;
const c4box=(eb,body)=>`<div class="detail"><span class="eyebrow">${eb}</span>${body}</div>`;
const c4pri=t=>`<div class="dk-call"><b>Principio Casa Muladhara®.</b> <i>${t}</i></div>`;
const c4imp=t=>`<div class="dk-call warn"><b>Importante.</b> ${t}</div>`;
/* pétalo genérico: mapa + qué indica + lista para marcar */
const c4pet=o=>dkH(o.eb||'Pétalos del Mapa Guía',o.t,o.sub)+
 `<div class="dk-grid c2" style="align-items:center">${c4map(o.ring||0,o.hl)}${c4box(o.qt||'¿Qué indica?',o.q)}</div>
 <div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:8px"><div class="dk-sub">${o.ot||'Nos orienta a observar'} · marca lo que reconoces</div>${n3ck(o.key,o.obs.map(x=>['hoja',x]))}</div>${o.side||''}</div>
 ${o.imp?c4imp(o.imp):''}${o.pri?c4pri(o.pri):''}`;

/* ----- 1 · Bienvenida, objetivos y reflexión ----- */
RICH.n4a1=()=>nbHero('Clase 4','Interpretación terapéutica','y evaluación energética integral','Hoy comienzas a mirar más allá de la respuesta. Hoy aprendes a <b>comprender, interpretar y acompañar</b> desde la conciencia y el amor.',['Sanación','Consciencia','Propósito'],'Formación en Radiestesia y Sanación',
 `<div class="nb-pw">${pndSVG('c4hero',{dark:1,mode:'fb',amp:55,len:15,amb:1,cap:0})}</div>`);
const N4OB=[['diana','Evaluación energética integral','Realizar una evaluación energética integral utilizando la Metodología Casa Muladhara®.'],['lupa','Significado terapéutico','Comprender el significado terapéutico de cada respuesta antes de intervenir.'],['libro','Hipótesis terapéutica','Integrar la información obtenida para elaborar una hipótesis terapéutica consciente, ética y responsable.']];
RICH.n4a2=()=>dkH('Clase 4','Objetivo de la clase','Al finalizar esta clase serás capaz de:')+n3sel('n4ob',N4OB,{eb:'Objetivo',nav:1})+
 `<div class="dk-call"><b>Propósito de esta clase.</b> Aprender a observar antes de interpretar, comprender antes de intervenir y acompañar desde la conciencia.</div>`+
 n3quote('La calidad de una terapia no depende de la cantidad de respuestas obtenidas, <mark>sino de la capacidad del terapeuta para comprenderlas.</mark>');
RICH.n4a3=()=>dkH('Reflexión grupal','Pregunta para compartir','Escucha con apertura. Cada mirada enriquece el aprendizaje de todas.')+
 `<div class="nb-ref" style="max-width:640px;margin:auto"><span class="nb-ico">${ic('grupo',22)}</span>${n3area('n4rg','¿Cuál crees que es la diferencia entre obtener una respuesta y comprender realmente su significado?','Tu reflexión…')}</div>${n3priv}`;

/* ----- 2 · Interpretar antes de intervenir ----- */
const N4PR=[['lupa','Observar','¿Qué está indicando el péndulo?'],['libro','Comprender','¿Qué significado puede tener esta información?'],['enlace','Integrar','¿Cómo se relaciona con el resto de la evaluación?'],['armoniza','Intervenir','Solo cuando la información ha sido comprendida.']];
RICH.n4a4=()=>dkH('Metodología Casa Muladhara®','La evaluación energética no busca respuestas; busca comprender un proceso','Un terapeuta no busca confirmar una idea. Busca descubrir la información que el Yo Superior considera prioritaria en ese momento.')+
 `<div class="dk-grid c2" style="align-items:start">${c4box('Toda evaluación comienza con una pregunta','<p style="font-family:var(--f-display);font-style:italic;font-size:1.15rem">¿Qué necesita comprender el consultante para avanzar en su proceso de sanación?</p>')}
 <div style="display:grid;gap:8px"><div class="dk-sub">Cada respuesta con el péndulo debe ser</div>${n3ck('n4rs',[['check','Observada sin expectativas.'],['check','Comprendida dentro del contexto del consultante.'],['check','Relacionada con el resto de la evaluación.'],['check','Verificada antes de intervenir.']])}</div></div>
 <div class="dk-sub">El proceso de interpretación · recorre los 4 pasos</div>`+n3sel('n4pr',N4PR,{eb:'Paso',nav:1})+
 n3quote('Una respuesta aislada entrega información. <mark>Una evaluación completa revela el camino de la sanación.</mark>');
RICH.n4a5=()=>dkH('Mapa Guía Casa Muladhara®','¿Qué es el Mapa Guía?','El Mapa Guía <b>no entrega un diagnóstico</b>. Es una herramienta que nos permite identificar el área que el Yo Superior considera prioritaria para comenzar el proceso terapéutico.')+
 `<a href="${N3C3P}mapa_guia.webp" target="_blank" rel="noopener">${c3img('mapa_guia.webp','Gráfico Mapa / Guía Casa Muladhara','border-radius:14px;border:1px solid var(--line)')}</a>
 <div class="dk-sub">Su función es</div>${n3flip('n4fn',[['camino','Orientar','La evaluación.'],['diana','Priorizar','El origen del conflicto.'],['loto','Guiar','El orden de la intervención.']],'c3',150)}
 ${n3quote('El Mapa Guía nos indica dónde comenzar; <mark>el proceso terapéutico nos muestra el camino.</mark>')}`;

/* ----- 3 · Etapas de la vida ----- */
const c4etapa=(key,items,ring,hl)=>{const s=n3clamp(st(key,0),0,items.length-1),x=items[s];
 return `<div class="dk-grid c2" style="align-items:center">${c4map(1,[hl[s]],'Toca una etapa en la lista para ubicarla en el anillo del Mapa.')}
 <div style="display:grid;gap:10px">${chipRow(key,items.map(y=>y[0]),s)}<div class="detail"><span class="eyebrow">Etapa ${s+1} de ${items.length}</span><h3>${x[0]}</h3><p>${x[1]}</p><div class="dk-sub">Nos ayuda a comprender</div>${c4li(x[2])}</div></div></div>`};
const N4E1=[['Vientre materno','Es el primer espacio que habitamos. Aquí registramos las emociones, creencias y estados de nuestra madre durante el embarazo.',['Cómo fue acogida nuestra vida.','El vínculo con nuestra madre.','La seguridad de merecer existir.','Patrones heredados desde el inicio.']],['Nacimiento','El momento del nacimiento marca nuestro primer gran tránsito. Las experiencias de parto pueden influir en nuestra forma de vivir.',['Cómo fue nuestro paso a la vida.','Las emociones del parto.','Sensación de bienvenida o rechazo.','Impacto en nuestra seguridad básica.']],['Niñez','En esta etapa construimos nuestra autoimagen, aprendemos a relacionarnos y desarrollamos nuestra confianza y valores fundamentales.',['Creencias sobre uno mismo.','Relaciones familiares y entorno.','Experiencias de amor y límites.','Patrones que aún nos acompañan.']],['Adolescencia','Etapa de búsqueda de identidad y sentido de vida. Se definen nuestros ideales, metas y forma de ver el mundo.',['Conflictos internos y decisiones.','Necesidad de pertenencia.','Relación con la autoridad.','Dirección que tomamos en la vida.']]];
RICH.n4a6=()=>dkH('Etapas de la vida','Primera etapa de la vida · Los cimientos de nuestro ser','En esta primera etapa se forman las bases de nuestra identidad, nuestra seguridad emocional y nuestra relación con la vida.')+c4etapa('n4e1',N4E1,1,[0,1,2,3])+
 n3quote('Al comprender esta primera etapa, podemos identificar el <mark>origen</mark> de muchas emociones, miedos, bloqueos y <mark>patrones</mark> que se repiten en nuestra vida.');
const N4E2=[['Adultez','Etapa de construcción y responsabilidad. Aquí definimos nuestro rumbo, tomamos decisiones importantes y damos forma a nuestros sueños y proyectos.',['Nuestras elecciones y su impacto.','La relación con el trabajo y el dinero.','La realización personal.','Los desafíos que nos impulsan a evolucionar.']],['Vida presente','El aquí y ahora. Es el momento de integrar, sanar y transformar lo que vivimos. Refleja nuestro estado actual en lo físico, emocional, mental y espiritual.',['Nuestro estado de bienestar actual.','Los bloqueos que nos detienen.','Los aprendizajes vigentes.','Lo que necesitamos equilibrar para avanzar.']],['Vida futura','Representa las posibilidades, proyecciones y potencialidades que podemos crear. Nos conecta con nuestra visión, propósito y legado.',['Nuestro propósito de vida.','Los caminos disponibles.','Los talentos y dones por desarrollar.','Lo que podemos crear desde nuestra esencia.']]];
RICH.n4a7=()=>dkH('Etapas de la vida','Segunda etapa de la vida · Vivimos, elegimos y creamos nuestro camino','En esta etapa tomamos decisiones, construimos proyectos y enfrentamos desafíos que nos invitan a crecer, sanar y expandir nuestra conciencia.')+c4etapa('n4e2',N4E2,1,[4,5,8]);
const N4E3=[['Vidas pasadas','Corresponde a experiencias del alma en otras encarnaciones. Estas memorias pueden traer aprendizajes pendientes, lealtades, miedos, talentos y patrones repetitivos.',['Origen de miedos, bloqueos o fobias.','Patrones que se repiten vida tras vida.','Talentos y dones que traemos al nacer.','Lealtades y promesas del alma.','Causas profundas de enfermedades o conflictos.']],['Vidas paralelas','Son existencias simultáneas en otros tiempos, dimensiones o líneas de realidad. Pueden generar interferencias energéticas, confusiones de identidad o conexiones significativas con otras almas.',['Conflictos de identidad o sensación de «no pertenecer».','Relaciones que se repiten en distintos escenarios.','Interferencias energéticas que drenan o confunden.','Conexiones de alma que apoyan nuestro propósito.','Recursos y aprendizajes desde otras realidades.']]];
RICH.n4a8=()=>dkH('Etapas de la vida','Dimensión espiritual · Miramos más allá del tiempo y del espacio','En esta dimensión exploramos memorias y conexiones que trascienden esta vida y que influyen en nuestro presente. Nos permite comprender patrones, lealtades y aprendizajes del alma.')+c4etapa('n4e3',N4E3,1,[6,7]);

/* ----- 4 · Áreas de vida y de salud ----- */
RICH.n4a9=()=>c4pet({t:'Vida afectiva',sub:'Cuando el Yo Superior señala «Vida afectiva»…',hl:[14],qt:'¿Qué significa?',key:'n4va',
 q:'<p>La respuesta indica que el origen del conflicto puede estar relacionado con la <b>forma</b> en que la persona vive, expresa o experimenta sus <b>vínculos afectivos</b>.</p><p class="dk-note">No señala necesariamente una relación de pareja.</p>',
 ot:'Explora aspectos como',obs:['Amor propio.','Relaciones de pareja.','Vínculos familiares.','Relaciones con hijos.','Amistades.','Capacidad de recibir y entregar amor.','Pérdidas, duelos o separaciones.'],
 side:c4box('Preguntas terapéuticas sugeridas',`<ol style="margin:0;padding-left:20px;display:grid;gap:6px"><li>¿Qué aspecto de la vida afectiva necesita ser observado?</li><li>¿El origen corresponde al pasado o al presente?</li><li>¿Existe una persona involucrada?</li><li>¿Hay emociones que aún no han sido integradas?</li><li>¿Se requiere trabajar otra área antes de intervenir?</li></ol>`),
 pri:'Vida afectiva no identifica un problema; indica el lugar donde el proceso terapéutico comienza a revelar su historia.'});
const N4AV=[['libro','Vida intelectual','Nos invita a observar todo lo relacionado con el aprendizaje, la mente, los pensamientos, creencias y la forma en que usamos nuestra inteligencia.'],['loto','Vida espiritual','Nos invita a observar nuestra conexión con el alma, la fe, los valores, la energía sutil y el propósito espiritual de nuestra existencia.'],['corazon','Vida afectiva','Nos invita a observar cómo damos y recibimos amor, nuestros vínculos emocionales, heridas afectivas y la capacidad de abrir el corazón.'],['ojo','Visión de vida','Nos invita a observar cómo percibimos la vida, nuestras metas, sueños, claridad interna y la dirección que queremos tomar.'],['irradia','Actitud de vida','Nos invita a observar nuestra disposición frente a la vida, nuestra motivación, forma de elegir y cómo enfrentamos los desafíos diarios.'],['grupo','Vida social','Nos invita a observar cómo nos vinculamos con los demás, nuestros roles, relaciones, entorno y sentido de pertenencia.']];
const N4AVI=[8,9,14,12,13,18];
RICH.n4a10=()=>{const s=n3clamp(st('n4av',0),0,5);
 return dkH('Pétalos del Mapa Guía','Áreas de vida','Pétalos que nos invitan a observar diferentes dimensiones de nuestro ser. Toca cada área para ubicarla en el Mapa.')+
 `<div class="dk-grid c2" style="align-items:center">${c4map(0,[N4AVI[s]])}<div>${n3sel('n4av',N4AV,{eb:'Área'})}</div></div>
 <div class="dk-call">Estas áreas nos ofrecen una mirada completa para identificar qué necesita equilibrio, comprensión y sanación. <b>La radiestesia orienta la evaluación y permite identificar la dimensión que requiere atención.</b></div>`};
const N4SA=[['persona','Salud y bienestar','Nos orienta a evaluar el estado general del cuerpo físico y su equilibrio energético, identificando posibles desequilibrios que afectan la vitalidad y el bienestar.',['Energía vital y niveles de vitalidad.','Sistemas del cuerpo.','Órganos y funciones.','Factores que afectan la salud.','Estilo de vida y hábitos.','Bienestar integral.']],['estrella','Minerales y vitaminas','Nos permite detectar carencias, excesos o bloqueos en la asimilación de minerales y vitaminas esenciales, fundamentales para el correcto funcionamiento del organismo.',['Déficit de minerales.','Déficit de vitaminas.','Excesos.','Asimilación y absorción.','Apoyo nutricional.','Equilibrio y vitalidad celular.']],['arbol','Columna vertebral','Nos orienta a evaluar el estado de la columna vertebral y su relación con la estructura física, la energía y el flujo en el cuerpo.',['Alineación y estructura.','Bloqueos y tensiones.','Relación vértebra – emoción / energía.','Soporte estructural y movilidad.','Flujo energético en la columna.','Armonía y equilibrio.']]];
RICH.n4a11=()=>{const s=n3clamp(st('n4sa',0),0,2),x=N4SA[s];
 return dkH('Pétalos del Mapa Guía','Áreas de salud y bienestar','Pétalos que nos permiten evaluar aspectos físicos y nutricionales que influyen en nuestro equilibrio integral.')+
 `<div class="dk-grid c2" style="align-items:center">${c4map(0,[[5,7,6][s]])}<div style="display:grid;gap:10px">${chipRow('n4sa',N4SA.map(y=>y[1]),s)}<div class="detail"><span class="eyebrow">Pétalo ${s+1} de 3</span><h3>${x[1]}</h3><p>${x[2]}</p>${c4li(x[3])}</div></div></div>
 <div class="dk-call">Estas áreas nos brindan información valiosa para acompañar procesos de equilibrio físico, energético y nutricional. <b>La radiestesia orienta la evaluación y permite identificar lo que requiere atención.</b></div>
 <p class="dk-note">La evaluación energética no reemplaza la consulta con un profesional de la salud.</p>`};

/* ----- 5 · Vínculos, sistema familiar y alma ----- */
RICH.n4a12=()=>c4pet({t:'Personajes',sub:'Cuando el Yo Superior señala «Personajes»…',hl:[16],qt:'¿Qué significa?',key:'n4pj',
 q:'<p>La respuesta indica que existe una <b>persona significativa</b> relacionada con el origen, mantenimiento o resolución del proceso que se está evaluando.</p><p style="color:var(--live)"><i>No significa que esa persona sea la causa del conflicto.</i></p>',
 ot:'Nos ayuda a comprender',obs:['Vínculos que requieren ser observados.','Conflictos aún no resueltos.','Lealtades familiares.','Aprendizajes pendientes.','Personas que impulsan o limitan el proceso de evolución.'],
 side:c4box('Puede corresponder a',`<div class="dk-chips">${['Padre','Madre','Pareja','Hijo(a)','Hermano(a)','Abuelo(a)','Jefe o compañero de trabajo','Amigo(a)','Otra persona significativa'].map(x=>`<span class="tg">${x}</span>`).join('')}</div>`),
 pri:'El gráfico Personajes no busca señalar culpables; revela vínculos que necesitan ser comprendidos para favorecer el proceso de sanación.'});
RICH.n4a13=()=>c4pet({t:'Constelación familiar',sub:'Cuando el Yo Superior señala «Constelación familiar»…',hl:[17],key:'n4cf',
 q:'<p>Nos invita a observar si el proceso que vive el consultante puede estar relacionado con <b>su sistema familiar</b>.</p><p>No busca identificar culpables, sino comprender las dinámicas que pueden influir en la situación actual.</p>',
 obs:['Patrones familiares.','Lealtades invisibles.','Relaciones dentro del sistema.','Aprendizajes heredados.','Influencia del linaje familiar.'],
 imp:'En esta formación utilizaremos este pétalo como una orientación dentro de la evaluación radiestésica. La interpretación profunda, las dinámicas sistémicas y el trabajo terapéutico con Constelaciones Familiares y Terapia Transgeneracional serán desarrollados en la <b>Formación de Constelaciones Familiares y Terapia Transgeneracional Casa Muladhara®</b>.',
 pri:'El Mapa Guía orienta la evaluación. La comprensión profunda del sistema familiar requiere una formación específica.'});
RICH.n4a14=()=>c4pet({t:'Vidas pasadas',sub:'Comprender memorias del alma que pueden influir en el presente.',hl:[19],key:'n4vp',
 q:'<p>Cuando el Yo Superior señala este pétalo, nos invita a observar si la situación que vive el consultante puede estar relacionada con <b>memorias del alma</b> que aún requieren comprensión, integración o aprendizaje.</p><p>La radiestesia <b>orienta la evaluación</b> y permite identificar si esta área necesita ser explorada.</p>',
 obs:['Aprendizajes del alma.','Patrones que se repiten en la vida.','Memorias aún no integradas.','Talentos o recursos del alma.','Experiencias que invitan a una mayor comprensión.'],
 imp:'En esta formación utilizaremos este pétalo únicamente como una orientación dentro de la evaluación radiestésica. La comprensión profunda y el abordaje terapéutico de las memorias del alma serán desarrollados en la <b>Especialización en Terapia de Vidas Pasadas Casa Muladhara®</b>.',
 pri:'La radiestesia abre una puerta hacia la comprensión; el proceso terapéutico permite integrar aquello que el alma está preparada para sanar.'});
RICH.n4a15=()=>c4pet({t:'Niño interno',sub:'Reconocer y sanar las experiencias que dejaron huella en nuestra esencia.',hl:[22],key:'n4ni',
 q:'<p>Nos invita a observar si la situación actual puede estar relacionada con <b>heridas, emociones o creencias originadas en la infancia</b>.</p><p>Reconocer al niño interior es el primer paso para brindarle comprensión, amor y validación.</p>',
 obs:['Heridas emocionales de la infancia.','Necesidades no satisfechas.','Creencias limitantes originadas en esa etapa.','Memorias que aún generan dolor, miedo, culpa o abandono.','Recursos que el niño interior necesita para sentirse seguro, amado y protegido.'],
 imp:'En esta formación utilizaremos este pétalo únicamente como una orientación dentro de la evaluación radiestésica. La comprensión profunda y el abordaje terapéutico del Niño Interior serán desarrollados en la <b>Especialización en Sanación del Niño Interior Casa Muladhara®</b>.',
 pri:'Sanar al niño interior es devolverle amor y seguridad a la parte de nosotros que un día dejó de sentirse vista.'});
RICH.n4a16=()=>c4pet({t:'Limpieza uterina',sub:'Liberar, armonizar y sanar la energía del útero.',hl:[21],key:'n4lu',
 q:'<p>Nos invita a observar si la situación actual puede estar relacionada con <b>memorias, energías o experiencias</b> almacenadas en el útero que necesitan ser liberadas y armonizadas.</p><p>La radiestesia <b>orienta la evaluación</b> y permite identificar si esta área necesita atención.</p>',
 obs:['Memorias emocionales o energéticas del linaje femenino.','Experiencias pasadas que dejaron huella en el útero.','Bloqueos que afectan la creatividad, la expresión y la conexión femenina.','Duelo, pérdidas o situaciones aún no integradas.','Necesidad de limpieza, liberación y renovación energética.'],
 imp:'En esta formación utilizaremos este pétalo únicamente como una orientación dentro de la evaluación radiestésica. La metodología completa y el abordaje terapéutico de la Limpieza Uterina serán desarrollados en la <b>Especialización en Limpieza Uterina Casa Muladhara®</b>.',
 pri:'El útero guarda memorias, pero también el poder de crear, transformar y dar vida. Sanarlo es reconectar con nuestra esencia femenina y con el flujo de la vida.'});
const N4VO=[['lupa','Identificar','La existencia de votos.'],['check','Verificar','Si aún permanecen activos.'],['corazon','Solicitar autorización','Para su liberación.'],['nudo','Aplicar el protocolo Casa Muladhara®','Para el corte de votos mediante radiestesia.'],['check','Confirmar','Energéticamente que el proceso quedó finalizado.']];
RICH.n4a17=()=>c4pet({t:'Votos',sub:'Liberar compromisos del pasado para vivir en libertad y coherencia.',hl:[23],key:'n4vo',
 q:'<p>Nos invita a observar si existe un <b>voto, juramento, promesa o compromiso energético</b> que continúa influyendo en la vida del consultante.</p><p>Estos acuerdos pueden haber sido realizados de forma consciente o inconsciente y limitar el desarrollo personal.</p>',
 obs:['Votos espirituales.','Juramentos.','Promesas.','Pactos personales.','Compromisos energéticos que ya no corresponden al momento presente.'],
 side:`<div style="display:grid;gap:8px"><div class="dk-sub">En esta formación aprenderás a</div>${n3sel('n4vos',N4VO,{eb:'Paso',nav:1})}</div>`,
 imp:'Algunos votos pueden estar relacionados con experiencias de <b>Vidas Pasadas</b> o con dinámicas del <b>Sistema Familiar</b>. Sin embargo, en esta formación aprenderemos el procedimiento radiestésico para su identificación y liberación, sin profundizar en esas metodologías terapéuticas.',
 pri:'Todo voto cumplió un propósito en un momento determinado. Cuando deja de servir al mayor bien, puede ser liberado con respeto, consciencia y autorización.'});

/* ----- 6 · Bloqueos, energías y luz ----- */
RICH.n4a18=()=>c4pet({t:'Bloqueos e interferencias',sub:'Cuando el Yo Superior señala «Bloqueos e interferencias»…',hl:[3],key:'n4bi',
 q:'<p>Este gráfico señala que pueden existir <b>bloqueos</b> o <b>interferencias energéticas</b> que están afectando el equilibrio, el avance o el bienestar del consultante.</p>',
 ot:'Puede estar relacionado con',obs:['Energías densas o estancadas.','Pensamientos, emociones o creencias limitantes.','Influencia de personas, ambientes o situaciones.','Programas o patrones que interfieren en el proceso.','Necesidad de limpieza, protección o armonización.'],
 side:c4box('Nos invita a',c4li([['lupa','Observar qué está generando el bloqueo.'],['ojo','Identificar la interferencia que está actuando.'],['irradia','Liberar y transformar aquello que no permite el flujo natural de energía.'],['armoniza','Restablecer el equilibrio para avanzar.']])),
 pri:'Lo que se reconoce se puede transformar. Liberar bloqueos es abrir el camino para la sanación y el bienestar.'});
const N4OR=[['persona','Energías adquiridas en la vida actual.'],['arbol','Memorias del sistema familiar.'],['reloj','Experiencias de vidas pasadas.'],['corazon','Emociones no resueltas.'],['casa','Ambientes o personas.'],['estrella','Otros orígenes que el Yo Superior indique.']];
RICH.n4a19=()=>dkH('Pétalos del Mapa Guía','Energías discordantes','No toda energía discordante tiene el mismo origen.')+
 `<div class="dk-grid c2" style="align-items:center">${c4map(0,[10])}<div style="display:grid;gap:12px">${c4box('¿Qué indica?','<p>Cuando el Yo Superior señala este pétalo, nos informa que existe una energía que está alterando el equilibrio del consultante.</p>')}<div class="dk-call">La función del terapeuta <b>no es asumir su origen</b>, sino <b>investigarlo</b> mediante la radiestesia.</div></div></div>
 <div class="dk-sub">Puede tener distintos orígenes · toca cada uno</div><div class="dk-chips" role="group">${N4OR.map((x,i)=>`<button class="chip" ${rxa('tog','n4or',i)} ${pressed(st('n4or',{})[i])}>${ic(x[0],18)} ${x[1]}</button>`).join('')}</div>
 <div class="dk-call warn"><b>El terapeuta nunca debe interpretar antes de verificar.</b> La presencia de una energía discordante no indica automáticamente que exista una entidad, un trabajo energético o una experiencia de vidas pasadas. La radiestesia orienta el proceso paso a paso.</div>
 ${n3quote('Observar · <mark>Verificar</mark> · Comprender · Acompañar · Sanar')}`;
RICH.n4a20=()=>c4pet({t:'Arcángeles',sub:'La luz también forma parte del proceso terapéutico.',hl:[2],key:'n4ar',
 q:'<p>Nos orienta a solicitar la asistencia de los Arcángeles para acompañar el proceso terapéutico.</p>',
 obs:['Qué Arcángel acompaña la sesión.','Qué color de luz corresponde utilizar.','La energía que necesita el consultante.','La armonización y cierre del campo áurico.'],
 side:c4box('En esta formación aprenderás',c4li([['pend','Identificar el Arcángel mediante radiestesia.'],['check','Verificar el color de luz correspondiente.'],['irradia','Utilizar esa frecuencia para armonizar y cerrar el campo áurico.']])+`<p class="dk-note">Practica con los gráficos de arcángeles y cromoterapia en la siguiente lección.</p>`)});

/* ----- 7 · Limpieza de aura ----- */
const c4aura=(img,alt,eb,t,sub,items,extra)=>dkH('Limpieza de aura',t,sub)+
 c4img(img,alt,'max-height:300px')+n3sel(eb,items,{eb:'Pétalo',nav:1})+(extra||'');
RICH.n4a21=()=>c4aura('aura.webp','Figura humana rodeada por las capas del aura','n4en','Energías negativas acumuladas, baja energía, pactos del alma y otros','Cuando estos pétalos aparecen, el objetivo es identificar el origen antes de intervenir.',
 [['ola','Energías negativas acumuladas','Energías densas que se han acumulado con el tiempo por personas, ambientes, situaciones o estrés prolongado.'],['bateria','Baja energía','Disminución del nivel energético del consultante. Puede tener diversas causas que serán verificadas.'],['nudo','Pactos del alma','Acuerdos energéticos o compromisos que pueden influir en la experiencia de vida.'],['lupa','Otros (fuera del gráfico)','Si el Yo Superior responde «Otros», la información no está en este gráfico. Se continúa la investigación con otros gráficos o herramientas.']],
 n3quote('La radiestesia nos permite seguir investigando hasta encontrar <mark>la información necesaria para el mayor bienestar del consultante.</mark>'));
RICH.n4a22=()=>dkH('Limpieza de aura','Larvas y parásitos energéticos','Energías discordantes que pueden adherirse a nuestro campo áurico y drenar nuestra vitalidad.')+
 n3sel('n4lp',[['lupa','¿Qué indican?','Son formas de energía discordante que se adhieren al campo áurico y drenan la vitalidad. Pueden alojarse en diferentes capas áuricas y afectar el bienestar físico, mental, emocional y espiritual.'],['ola','Larvas energéticas','Energías de baja frecuencia que se alimentan de nuestra energía vital. Generan cansancio, pesadez, falta de claridad y desmotivación.'],['irradia','Parásitos astrales','Entidades energéticas que se conectan al campo áurico para extraer energía. Pueden generar bloqueos, confusión, alteraciones emocionales y sensación de no avanzar.']],{eb:'Punto'})+
 `<div class="dk-call">El Yo Superior nos guía para identificar, comprender y liberar aquello que altera nuestro equilibrio. Ubica estos pétalos en el gráfico de limpieza de aura (anillo «Qué limpiar») y sus capas en el anillo «Capas del aura».</div>`+n3graph('aura');
RICH.n4a23=()=>c4aura('medita.webp','Silueta en meditación rodeada de un aura suave','n4ca','Cansancio físico, mental y emocional','Reajuste energético del campo áurico. Estos pétalos indican que el campo energético ha perdido equilibrio y necesita ser armonizado antes de continuar con el proceso terapéutico.',
 [['bateria','Cansancio físico, mental y emocional','Puede reflejar un desgaste de la energía vital provocado por estrés, procesos emocionales, cargas energéticas o desequilibrios del campo áurico.'],['armoniza','Reajustar energías del aura','Indica que las capas del aura requieren volver a su frecuencia natural para recuperar estabilidad, protección y flujo energético.'],['escudo','Fisuras y roturas del aura','Corresponde a debilitamientos o aperturas del campo energético que pueden favorecer la pérdida de energía y aumentar la sensibilidad frente a influencias externas.']],
 n3quote('Observar · Verificar · <mark>Equilibrar · Armonizar</mark> · Sanar'));
const N4DEC=['Pido a mi Yo Superior y a mi Comité Espiritual que toda alma, desencarnado, acople o entidad que no pertenezca a este consultante sea guiada al lugar perfecto, correcto y adecuado para su evolución.','Que el portal quede completamente sellado, protegido y armonizado para el mayor bien de todos los involucrados.','Gracias, gracias, gracias.'];
RICH.n4a24=()=>c4aura('almas.webp','Figura humana con presencias tenues alrededor de su aura','n4al','Almas extras, desencarnados, acoples de entidades','Energías que pueden interferir con nuestro bienestar y equilibrio.',
 [['persona','Almas extras','Fragmentos del alma de otras personas que pueden quedar adheridos al campo áurico y generar desequilibrio.'],['luna','Desencarnados','Energías de personas que han desencarnado y pueden permanecer cerca del consultante por diversos motivos.'],['grupo','Acoples de entidades','Vínculos energéticos o presencias que se conectan al campo áurico y pueden influir en pensamientos, emociones y bienestar.'],['diana','Contaminación espiritual','Acumulación de energías densas provenientes del entorno, lugares, personas o situaciones que afectan nuestro campo energético.'],['escudo','Propósito','Identificar, liberar y limpiar estas energías para recuperar la armonía, la protección y el equilibrio del campo áurico.']],
 `<div class="dk-sub">Decreto de liberación</div>`+n3pray('n4dec',N4DEC));

/* ----- 8 · Práctica, reflexión y repaso ----- */
RICH.n4a25=()=>`<div class="dk-split" style="align-items:center">${c4img('manos.webp','Manos abiertas sosteniendo una luz con una flor de loto','max-height:440px;border-radius:50%')}
 <div style="display:grid;gap:14px;text-align:center">${dkH('Práctica','Comenzamos nuestra práctica','Nos conectamos con nuestra intención para trabajar con respeto, claridad y amor.')}
 ${n3area('n4int','Escribe tu intención para esta práctica','Mi intención es…')}
 <div class="dk-call">Recorre el proceso: <b>preparación y oración de apertura</b> (Clase 3), luego el <b>Mapa Guía</b> para ubicar el área prioritaria, y <b>observa, comprende e integra</b> cada respuesta antes de intervenir.</div></div></div>`+n3graph('mapa');
RICH.n4a26=()=>nbHero('Reflexión de la clase','La radiestesia no busca generar temor','','La radiestesia no busca generar temor frente a las respuestas del gráfico, sino <b>comprender</b> el origen de los desequilibrios para acompañar procesos de <i>armonización</i> desde el <i>respeto, la ética y el amor.</i>',['Observar','Comprender','Integrar','Intervenir'],'Con conciencia, claridad y respeto guiamos procesos de transformación')+
 n3area('n4rf','¿Qué te llevas de esta clase?','Tu reflexión…')+n3priv;
const N3Q4=[
 {q:'¿Qué busca la evaluación energética?',o:['Obtener muchas respuestas rápidas','Comprender un proceso','Confirmar una idea del terapeuta'],a:1,e:'Busca la información que el Yo Superior considera prioritaria en ese momento.'},
 {q:'¿Cuál es el orden del proceso de interpretación?',o:['Intervenir, observar, comprender, integrar','Observar, comprender, integrar, intervenir','Comprender, intervenir, observar, integrar'],a:1,e:'Se interviene solo cuando la información ha sido comprendida.'},
 {q:'El Mapa Guía…',o:['Entrega un diagnóstico','Identifica el área que el Yo Superior considera prioritaria','Reemplaza la intuición del terapeuta'],a:1,e:'Su función es orientar la evaluación, priorizar el origen del conflicto y guiar el orden de la intervención.'},
 {q:'¿Qué etapas forman la primera etapa de la vida?',o:['Vientre materno, nacimiento, niñez y adolescencia','Adultez, vida presente y vida futura','Vidas pasadas y vidas paralelas'],a:0,e:'Son los cimientos de nuestro ser: identidad, seguridad emocional y relación con la vida.'},
 {q:'Si el Yo Superior señala «Personajes»…',o:['Esa persona es la causa del conflicto','Existe una persona significativa relacionada con el proceso','Hay que cortar el vínculo de inmediato'],a:1,e:'No busca señalar culpables; revela vínculos que necesitan ser comprendidos.'},
 {q:'«Vida afectiva» señala necesariamente…',o:['Una relación de pareja','La forma en que la persona vive sus vínculos afectivos','Una pérdida reciente'],a:1,e:'Puede tratarse de amor propio, familia, hijos, amistades, duelos y más.'},
 {q:'Ante una energía discordante, el terapeuta debe…',o:['Asumir que es una entidad','Investigar su origen antes de interpretar','Suponer que viene de vidas pasadas'],a:1,e:'El terapeuta nunca debe interpretar antes de verificar.'},
 {q:'En esta formación, los pétalos Vidas pasadas, Niño interno y Limpieza uterina se usan…',o:['Como orientación dentro de la evaluación','Para hacer terapia completa de cada tema','No se usan'],a:0,e:'El abordaje profundo se desarrolla en las especializaciones Casa Muladhara®.'},
 {q:'¿Qué pasos se siguen con los votos?',o:['Identificar, verificar, solicitar autorización, aplicar el protocolo y confirmar','Cortarlos siempre sin preguntar','Ignorarlos'],a:0,e:'Todo voto cumplió un propósito; se libera con respeto, consciencia y autorización.'},
 {q:'Si en Limpieza de aura el Yo Superior responde «Otros (fuera del gráfico)»…',o:['Se termina la sesión','Se continúa investigando con otros gráficos o herramientas','Se repite la misma pregunta hasta que cambie'],a:1,e:'La información no está en este gráfico.'}];
RICH.n4a27=()=>n3quiz('c4',N3Q4,['Dominas lo esencial de la Clase 4.','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ================= CLASE 5 · Aplicación práctica: revisión y desarrollo de la clase ================= */
Object.assign(IC,{
 rayo:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
 gota:'<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>',
 espiral:'<path d="M12 12a1.5 1.5 0 1 1 1.5-1.5M12 12m-4-1.5a4 4 0 1 1 4 5.5M6 10a6.5 6.5 0 1 1 6 8.5"/>',
 puno:'<path d="M7 11V7a2 2 0 0 1 4 0v3M11 10V6a2 2 0 0 1 4 0v4M15 10V8a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-1a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2h3"/>',
 mascara:'<path d="M4 5c5 2 11 2 16 0v6a8 8 0 0 1-16 0zM8 10h2M14 10h2M9 15c2 1 4 1 6 0"/>',
 xcirc:'<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
 hilos:'<path d="M5 3v4M12 3v6M19 3v4M3 7h18M5 7v6M12 9v8M19 7v5"/><circle cx="5" cy="15" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="14" r="2"/>',
 bicho:'<ellipse cx="12" cy="13" rx="4" ry="6"/><path d="M12 7V5M9 4l1.5 2M15 4l-1.5 2M8 11H4M8 15H4M16 11h4M16 15h4M9 19l-2 2M15 19l2 2"/>',
 puzzle:'<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4v-4a2 2 0 1 0 0-4z"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',
 puntos:'<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>'
});
const N3C5P=N3P+'c5/';
const c5img=(f,alt,s)=>`<img src="${N3C5P}${f}" alt="${alt}" loading="lazy" decoding="async" style="display:block;max-width:100%;height:auto;border-radius:20px;justify-self:center;${s||''}">`;
const c5tags=a=>`<div class="dk-chips">${a.map(x=>`<span class="tg">${x}</span>`).join('')}</div>`;
const N5REC='Cada información es una guía. Siempre acompañamos desde el amor, el respeto y la conciencia.';

/* ----- 1 · Bienvenida, conexión interior y agenda ----- */
RICH.n5a1=()=>nbHero('Clase 5','Aplicación práctica','Revisión y desarrollo de la clase','La práctica con conciencia es el puente entre el <b>conocimiento</b> y la <b>transformación</b>.',['Sanación','Consciencia','Propósito'],'Formación en Radiestesia y Sanación',
 `<div class="nb-pw">${pndSVG('c5hero',{dark:1,mode:'fb',amp:50,len:15,amb:1,cap:0})}</div>`);
const N5CI=['Cierra tus ojos por un instante.','Respira profundamente tres veces.','Llevo mi atención a mi corazón y aquieto mi mente.','Me conecto con mi Yo Superior, con mi Comité Espiritual y con las energías de luz que acompañan mi camino.','Solicito claridad, discernimiento y sabiduría para interpretar con respeto, amor y conciencia.','Que toda la información que hoy reciba sea para el mayor bien de todos.'];
RICH.n5a2=()=>dkH('Práctica inicial','Conexión interior','Un ejercicio breve para conectar, centrar y sintonizar nuestra energía antes de comenzar.')+
 `<div class="dk-split" style="align-items:center">${c5img('loto.webp','Flor de loto dorada sobre el agua irradiando luz','max-height:380px')}<div style="display:grid;gap:12px">${n3pray('n5ci',N5CI)}</div></div>`;
const N5AG=[['diana','Práctica inicial','Ejercicio breve para conectar, centrar y sintonizar nuestra energía.'],['grupo','Revisión de tarea','Compartimos experiencias, aprendizajes y descubrimientos.'],['libro','Desarrollo de la Clase 5','Interpretación terapéutica y evaluación energética integral.'],['loto','Integración','Conectamos todo lo aprendido con la sanación y la conciencia.'],['corazon','Cierre y reflexión','Agradecemos, integramos y sembramos nuestra intención.']];
RICH.n5a3=()=>dkH('Clase 5','¿Qué haremos hoy?','Recorre los cinco momentos de la clase.')+n3sel('n5ag',N5AG,{eb:'Momento',nav:1});

/* ----- 2 · Revisión de tarea y cambio de mirada ----- */
RICH.n5a4=()=>dkH('Revisión de tarea','Revisión de Guía N.° 1','Hoy revisaremos juntas su primera evaluación completa realizada con la <b>Guía de Trabajo N.° 1</b>.')+
 `<div class="dk-call">Este espacio es para compartir, observar y comprender. <i>Cada práctica nos fortalece y nos acerca a una interpretación más consciente y precisa.</i></div>
 <div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:8px"><div class="dk-sub">¿Qué haremos hoy? · marca lo que ya hiciste</div>${n3ck('n5gu',[['grupo','Compartiremos sus experiencias durante la práctica.'],['lupa','Revisaremos cada área de la evaluación realizada.'],['diana','Analizaremos los resultados obtenidos.'],['libro','Aclararemos conceptos clave para fortalecer su comprensión.'],['loto','Integraremos lo aprendido para seguir avanzando.']])}</div>
 <div style="display:grid;gap:10px">${n3area('n5gx','¿Qué te sorprendió de tu primera evaluación completa?','Lo que descubrí…')}${n3area('n5gd','¿Qué duda quieres llevar a la clase?','Mi duda es…')}</div></div>`+n3priv+
 n3quote('Cada evaluación es un <mark>mapa</mark> que nos muestra dónde estamos y hacia dónde podemos <mark>sanar y transformar</mark>.');
const N5MI=[['lupa','Observar','Detectamos el desequilibrio energético a través de los gráficos y la respuesta del péndulo.'],['puzzle','Relacionar','Conectamos la información entre distintos gráficos para entender el porqué del bloqueo.'],['diana','Priorizar','Identificamos qué es lo más importante de abordar según el origen y el impacto energético encontrado.'],['loto','Intervenir','Aplicamos la limpieza o armonización adecuada en el orden correcto para lograr transformación.']];
RICH.n5a5=()=>dkH('Metodología Casa Muladhara®','Un cambio de mirada en la práctica radiestésica','Hasta ahora hemos utilizado el péndulo para obtener respuestas. Desde hoy damos un paso más profundo.')+
 `<div class="dk-call"><b>Vamos a investigar para comprender el origen del bloqueo</b> y así poder acompañar con claridad y efectividad.</div>
 <div class="dk-sub">Los cuatro pasos · toca cada uno</div>`+n3flip('n5mi',N5MI,'c4',190)+
 n3quote('El péndulo no hace el trabajo por nosotras. Nuestra capacidad de <mark>preguntar, interpretar y conectar</mark> la información es lo que marca la diferencia en una sesión.');

/* ----- 3 · Gráfico de chakras y bloqueos emocionales ----- */
RICH.n5a6=()=>dkH('Gráfico de chakras','Gráfico de chakras y bloqueos emocionales','Este gráfico nos ayuda a identificar el chakra que requiere atención, reconocer la <b>emoción principal</b> asociada y orientar la investigación hacia el posible origen del desequilibrio energético.')+
 `<div class="dk-grid c2" style="align-items:start">${c4box('Importante','<p>No entrega un diagnóstico definitivo. Nos ofrece un <b>punto de partida</b> para comprender qué necesita ser observado antes de intervenir.</p>')}
 <div style="display:grid;gap:8px"><div class="dk-sub">En esta clase aprenderemos a</div>${c4li([['loto','Identificar el chakra que necesita atención.'],['corazon','Comprender la emoción relacionada con ese centro energético.'],['lupa','Relacionar la información obtenida con los demás gráficos de investigación.'],['espiral','Interpretar los resultados desde una mirada terapéutica e integral.']])}</div></div>`+
 c4pri('«El péndulo señala un camino de investigación. Nuestra labor es observar, relacionar e interpretar la información con respeto, claridad y conciencia.»')+
 `<div class="dk-sub">Practica sobre el gráfico</div>`+n3graph('chem');
const c5dot=c=>`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${c};margin-right:6px;vertical-align:middle"></span>`;
const N5NV=[[0,'Raíz','Es nuestra base, seguridad y supervivencia. Los bloqueos aquí se relacionan con el <b>miedo</b>, la <b>paranoia</b>, la <b>culpa</b> y la sensación de inseguridad.'],
 [1,'Sacro','Se vincula con la creatividad, la sexualidad, el placer y las relaciones. Los bloqueos se expresan como <b>culpa</b>, <b>falta de creatividad</b> o dificultades en el disfrute.'],
 [2,'Plexo solar','Está relacionado con el poder personal, la autoestima y la voluntad. Aquí emergen la <b>ira</b> y la <b>vergüenza</b>, que afectan nuestra confianza y dirección de vida.'],
 ['espiral','Larvas astrales','Son patrones energéticos que pueden adherirse a nuestro campo emocional. Generan bloqueos como <b>inestabilidad</b>, <b>frustración</b>, <b>odio a sí mismo</b>, <b>envidia</b> y <b>falta de confianza</b>.'],
 ['bicho','Entidades parasitarias','Corresponden a influencias externas que drenan nuestra energía. Pueden provocar <b>dependencia</b>, <b>odio a la vida</b> y <b>culpa</b> constante.']];
RICH.n5a7=()=>dkH('Chakras · bloqueos emocionales','Nuestra base y nuestra conexión con la vida','En esta sección exploramos los primeros niveles del gráfico. Toca cada nivel.')+
 n3sel('n5nv',N5NV.map(x=>[typeof x[0]==='number'?'':x[0],x[1],x[2],typeof x[0]==='number'?`<p>${c5dot(CH7[x[0]])}Chakra ${CHAKRAS[x[0]].n} · <i>${CHAKRAS[x[0]].s}</i></p>`:'']),{eb:'Nivel',nav:1});
const N5CO=[['rayo','Angustia','Dolor emocional acumulado que genera cierres.'],['espiral','Duelo','Pérdidas no elaboradas que siguen activas.'],['puno','Violencia','Energía agresiva o experiencias de daño.'],['mascara','Egocentrismo','Falta de empatía, centrarse sólo en uno mismo.'],['hilos','Manipulación','Controlar o influir en otros desde el interés propio.'],['gota','Tristeza','Pesimismo, desánimo o sensación de vacío.'],['xcirc','Rechazo','Sentirse excluido, no aceptado o no valorado.']];
RICH.n5a8=()=>dkH('Chakras · bloqueos emocionales','El pétalo del Chakra Corazón','<b>Anahata</b> · Centro de amor, compasión y conexión. Toca cada bloqueo para ver su significado.')+
 n3flip('n5co',N5CO,'c4',170)+
 `<div class="dk-call">El Chakra Corazón nos conecta con el <b>amor propio</b>, el <b>perdón</b> y la capacidad de <b>dar y recibir amor</b>. <i>Cuando estos bloqueos se liberan, el corazón se abre y fluye la armonía.</i></div>`;
const N5GT=[[4,'Comunicación, expresión y verdad.',['Falta de comunicación / Mentiras','Ilusión / No querer ver','Confusión']],[5,'Intuición, percepción y sabiduría interior.',['Egocentrismo','Tristeza','Rechazo']],[6,'Conexión espiritual, conciencia y propósito.',['Manipulación','Apegos / Ambición / No aceptar','Falta de amor propio']]];
const N5OF=[['nudo','Lazos o cordones energéticos','Conexiones que nos atan a energías o situaciones que ya no nos benefician.'],['bicho','Entidades parasitarias','Influencias externas que drenan y afectan nuestra energía.'],['espiral','Larvas astrales','Patrones energéticos que se adhieren a nuestro campo emocional.'],['puntos','Otros bloqueos','Cargas, memorias o situaciones que impactan diferentes áreas de la vida.']];
RICH.n5a9=()=>dkH('Chakras · bloqueos emocionales','Garganta, Tercer Ojo, Corona y «Otros fuera del gráfico»','Profundicemos en estos tres pétalos y en la sección «Otros fuera del gráfico».')+
 n3sel('n5gt',N5GT.map(x=>['',`Chakra ${CHAKRAS[x[0]].n}`,`<i>${x[1]}</i>`,`<p>${c5dot(CH7[x[0]])}<i>${CHAKRAS[x[0]].s}</i></p><div class="dk-sub">Bloqueos asociados</div>${c4li(x[2])}`]),{eb:'Chakra'})+
 `<div class="dk-sub">Otros fuera del gráfico</div>`+n3flip('n5of',N5OF,'c4',170)+
 n3quote('Cada nivel nos entrega una pieza importante del rompecabezas. <mark>Observar, comprender e integrar es el camino hacia la sanación.</mark>');

/* ----- 4 · Biómetro de órganos ----- */
const N5EMO=['Miedo / Paranoia','Culpa','Ira / Vergüenza','Angustia / Duelo','Falta de comunicación','No querer ver','No aceptar / Apego'];
const N5ORG=[
 ['estructuras relacionadas con la supervivencia, la estabilidad y el sostén físico del cuerpo','Columna vertebral|Intestino delgado|Próstata / Útero|Ano / Recto|Glándulas suprarrenales|Dientes y uñas|Músculos','El cuerpo muchas veces expresa aquello que la energía aún no ha podido resolver.'],
 ['los órganos y sistemas relacionados con la energía sexual, la creatividad, el placer, las emociones y la reproducción','Sistema reproductor|Riñones|Vejiga|Páncreas|Intestino grueso|Órganos sexuales|Zona lumbar baja y sacro','La energía fluye donde hay conciencia. El equilibrio se construye desde el interior.'],
 ['los órganos y sistemas relacionados con nuestro poder personal, la digestión, la energía vital y la acción','Estómago|Hígado|Vesícula biliar|Páncreas|Bazo|Intestino delgado|Plexo solar|Glándulas suprarrenales|Sistema digestivo / Absorción de nutrientes','La energía fluye donde hay conciencia. El equilibrio se construye desde el interior.'],
 ['los órganos y sistemas relacionados con el amor, la conexión, la circulación y el equilibrio emocional','Corazón|Pulmones|Sistema circulatorio|Timo|Sistema inmunológico|Columna dorsal|Esófago|Estómago (parte superior)|Piel|Brazos y manos','El amor consciente armoniza, equilibra y sana el sistema completo.'],
 ['los órganos y sistemas relacionados con la comunicación, la expresión, la escucha y la verdad','Tiroides / Amígdalas|Laringe / Cuerdas vocales|Tráquea / Bronquios|Pulmones|Boca / Lengua|Oídos|Cervicales|Ojos|Hombros / Brazos / Manos|Sistema auditivo / Expresión','La verdad que expresamos y la que guardamos impactan directamente en nuestro bienestar.'],
 ['los órganos y sistemas relacionados con la intuición, la percepción, la claridad mental y la sabiduría','Cerebro|Glándula pineal|Hipófisis|Ojos|Oídos|Nariz / Senos paranasales|Sistema límbico|Sistema nervioso central|Memoria / Conexión intuitiva|Intuición / Conexión interior','La claridad interior nos permite ver más allá de lo evidente y tomar decisiones conscientes.'],
 ['los órganos y sistemas relacionados con la conexión espiritual, la conciencia superior y la unidad','Cerebro|Glándula pineal|Sistema nervioso superior|Sistema endócrino superior|Conexión espiritual / Yo Superior|Conciencia superior|Cuerpo energético (integración)|Unidad / Luz (Plan Divino)|Alma / Propósito de vida','La conciencia que despertamos en lo sutil, se refleja en la armonía del todo.']];
RICH.n5a10=()=>dkH('Biómetro de órganos','Biómetro de órganos · Chakras','Relaciona órganos y sistemas con el chakra y la emoción que los afecta.')+
 `<div class="dk-sub">¿Para qué se utiliza?</div>`+n3flip('n5bu',[['hoja','Identificar','El órgano o sistema relacionado con el desequilibrio.'],['persona','Relacionar','La información energética con el cuerpo físico.'],['pend','Orientar','La investigación radiestésica.']],'c3',150)+
 `<div class="dk-sub">Cada chakra y su emoción</div>${c5tags(CHAKRAS.map((c,i)=>`${c5dot(c.c)}${c.n} · ${N5EMO[i]}`))}
 <div class="dk-sub">Practica sobre el gráfico</div>`+n3graph('bio')+
 n3quote('Observar · Comprender · Integrar · <mark>Intervenir</mark>');
RICH.n5a11=()=>{const s=n3clamp(st('n5or',0),0,6),c=CHAKRAS[s],o=N5ORG[s];
 const items=CHAKRAS.map((x,i)=>({l:x.n,c:x.c}));
 return dkH('Biómetro de órganos','Los órganos de cada chakra','Toca un pétalo del abanico o un chakra de la lista para ver qué observamos en él.')+
 `<div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:10px">${n2semi({key:'n5or',items,sel:s,fs:11,wrap:10,label:'Abanico de chakras: '+c.n})}${chipRow('n5or',CHAKRAS.map(x=>x.n),s)}</div>
 <div class="detail"><span class="eyebrow">Chakra ${s+1} de 7 · ${N5EMO[s]}</span><h3 style="color:${c.c}">Chakra ${c.n}</h3><p style="letter-spacing:.3em;text-transform:uppercase;font-size:.85rem">${c.s}</p>
 <p><b>¿Qué observamos en este pétalo?</b> El Chakra ${c.n} nos orienta hacia ${o[0]}.</p>${c5tags(o[1].split('|'))}</div></div>
 <div class="dk-grid c2" style="align-items:start">${c4box('¿Qué nos indica?',c4li([['pend','Cuando el péndulo señala alguno de estos órganos, investigamos si existe un desequilibrio energético relacionado con esa zona.'],['check','No significa necesariamente enfermedad.'],['lupa','Es una invitación a profundizar en el origen energético antes de intervenir.']]))}
 <div style="display:grid;gap:10px">${c4pri(o[2])}<div class="dk-call warn"><b>Recuerda.</b> ${N5REC}</div></div></div>
 <p class="dk-note">La evaluación energética no reemplaza la consulta con un profesional de la salud.</p>`};

/* ----- 5 · Energías discordantes ----- */
RICH.n5a12=()=>dkH('Energías discordantes','Comprendiendo las memorias que alteran nuestro equilibrio','Antes de intervenir energéticamente, necesitamos comprender qué energía está sosteniendo el desequilibrio.')+
 `<div class="dk-grid c2" style="align-items:start">${c4box('¿Qué son?','<p>Son patrones energéticos de baja vibración que pueden permanecer activos en el campo energético de una persona, influyendo en sus emociones, pensamientos, decisiones y forma de vivir determinadas experiencias.</p>')}
 ${c4box('¿Cuál puede ser su origen?',c4li(['Experiencias de la vida actual.','Memorias transgeneracionales.','Registros de vidas pasadas.','Traumas o pérdidas no resueltas.','Votos, promesas o contratos del alma.']))}</div>
 <div class="dk-sub">¿Qué nos permite observar este gráfico? · toca cada punto</div>`+
 n3flip('n5dp',[['lupa','Identificar','La emoción o memoria que está interfiriendo.'],['persona','Relacionar','El bloqueo con la historia de la persona.'],['grupo','Reconocer','Si el origen pertenece a la vida actual, al sistema familiar o a vidas pasadas.'],['pend','Orientar','La limpieza o armonización energética más adecuada.']],'c4',170)+
 `<div class="dk-grid c2" style="align-items:start">${c4box('¿Cómo pueden influir?',c4li(['Mantienen bloqueos emocionales.','Generan patrones repetitivos.','Debilitan el flujo energético.','Favorecen el desgaste físico, emocional y espiritual.','Dificultan los procesos de transformación.']))}
 <div style="display:grid;gap:10px">${c4pri('Las energías discordantes no definen a la persona. Son información energética que nos orienta hacia aquello que necesita ser observado, comprendido y transformado durante el proceso terapéutico.')}
 <div class="dk-call warn"><b>Cada emoción es una señal.</b> Este gráfico no busca encontrar culpables. Nos ayuda a identificar la energía predominante para comprender su origen y acompañar un proceso de sanación consciente.</div></div></div>
 <div class="dk-sub">Practica sobre el gráfico</div>`+n3graph('disc');
const N5DG=[
 {t:'Autoestima y valor personal',s:'Cuando dejamos de reconocer nuestro propio valor.',ic:'persona',e:'Culpa|Baja autoestima|Odio hacia sí mismo|Falta de amor propio|Vergüenza|Fracaso',f:'Disminuyen la confianza.|Favorecen el autosabotaje.|Limitan el crecimiento personal.|Dificultan reconocer el propio valor.',d:'No buscamos culpables. Buscamos comprender: <b>¿cuál es su origen?</b> y <b>¿qué aprendizaje necesita integrar?</b>',r:'Toda energía discordante puede transformarse cuando es comprendida desde la conciencia.'},
 {t:'Miedo e inseguridad',s:'Cuando la energía de la protección se desequilibra.',ic:'escudo',e:'Miedo|Pánico|Angustia|Inseguridad|Estrés|Soledad',f:'Generan tensión y desgaste energético.|Bloquean la toma de decisiones.|Limitan la confianza y el movimiento en la vida.|Mantienen al cuerpo en alerta.',d:'Investigamos su origen y comprendemos su mensaje.',r:'Toda energía discordante puede transformarse cuando es comprendida y liberada con conciencia.'},
 {t:'Relaciones y vínculos',s:'Cuando los vínculos duelen más de lo que sanan.',ic:'enlace',e:'Dependencia|Apegos|Abandono|Traición|Celos|Posesividad|Manipulación',f:'Generan dependencia emocional.|Mantienen patrones repetitivos en las relaciones.|Dificultan la confianza y la entrega sana.|Pueden producir dolor emocional profundo y desgaste energético.',d:'Investigamos su origen y comprendemos el mensaje que esta energía trae para la persona.',r:'Los vínculos son una oportunidad de aprendizaje. Comprender lo que duele, libera y transforma.'},
 {t:'Tristeza',s:'Cuando el corazón guarda dolores que aún no ha soltado.',ic:'gota',e:'Tristeza|Soledad|Separación|Decepción|Arrepentimiento|Humillación',f:'Generan desmotivación y falta de alegría.|Pueden aislar a la persona y cerrarle el corazón.|Bloquean la expresión emocional y creativa.|Dificultan avanzar y confiar nuevamente.',d:'Indagamos su origen, el contexto en que se activó y qué aprendizaje trae para integrar.',r:'La tristeza pide ser sentida para poder transformarse.'},
 {t:'Angustia / Duelo',s:'El dolor no expresado se convierte en carga.',ic:'corazon',e:'Angustia|Duelo emocional|Separación|Pánico|Estrés',f:'Genera tristeza y vacío.|Dificulta soltar y seguir adelante.|Afecta el bienestar emocional y físico.|Puede mantenerse en el cuerpo y el aura.',d:'Indagamos su origen para comprender, integrar y liberar.'}];
RICH.n5a13=()=>{const s=n3clamp(st('n5dg',0),0,N5DG.length-1),g=N5DG[s];
 return dkH('Energías discordantes','Las energías por temas','Agrupamos las energías discordantes según el área de la vida que afectan. Toca cada tema.')+
 chipRow('n5dg',N5DG.map(x=>x.t),s)+
 `<div class="detail"><span class="eyebrow">Tema ${s+1} de ${N5DG.length}</span><h3>${ic(g.ic,26)} ${g.t}</h3><p style="font-family:var(--f-display);font-style:italic;font-size:1.1rem">${g.s}</p></div>
 <div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:8px"><div class="dk-sub">¿Qué energías encontramos? · marca las que aparecieron en tu práctica</div>${n3ck('n5dk'+s,g.e.split('|').map(x=>['hoja',x]))}</div>
 <div style="display:grid;gap:10px">${c4box('¿Cómo pueden influir?',c4li(g.f.split('|')))}${c4box('Durante la evaluación…','<p>'+g.d+'</p>')}</div></div>`+
 (g.r?n3quote(g.r):'')};

/* ----- 6 · Integración, cierre y repaso ----- */
RICH.n5a14=()=>`<div class="dk-split" style="align-items:center">${c5img('medita.webp','Silueta en meditación dentro de un círculo con una flor de loto','max-height:420px')}
 <div style="display:grid;gap:12px">${dkH('Integración','Integración de la Clase 5','Hoy aprendimos a… Marca lo que ya sientes integrado.')}
 ${n3ck('n5in',[['loto','Interpretar el gráfico de Chakras.'],['persona','Relacionar órganos y sistemas con la información energética.'],['espiral','Comprender el mapa de Energías Discordantes.'],['lupa','Identificar el origen probable de un conflicto antes de intervenir.']],['Repasa las lecciones que aún no sientes integradas.','¡Hermoso! Has integrado lo esencial de esta clase.'])}</div></div>`+
 n3quote('La radiestesia no busca etiquetas; busca <mark>comprender el origen</mark> para acompañar un proceso de transformación consciente.');
RICH.n5a15=()=>nbHero('Cierre y reflexión','Agradecemos, integramos','y sembramos nuestra intención','Con conciencia, claridad y respeto guiamos procesos de transformación.',['Observar','Comprender','Integrar','Intervenir'],'Casa Muladhara · Sanación y Bienestar')+
 n3area('n5rf','¿Qué te llevas de esta clase?','Tu reflexión…')+n3area('n5it','Siembra tu intención para la próxima práctica','Mi intención es…')+n3priv;
const N3Q5=[
 {q:'¿Qué cambio de mirada propone esta clase?',o:['Usar el péndulo solo para obtener respuestas','Investigar para comprender el origen del bloqueo','Intervenir lo antes posible'],a:1,e:'Desde hoy investigamos para comprender el origen y acompañar con claridad y efectividad.'},
 {q:'¿Cuál es el orden de los cuatro pasos?',o:['Observar, relacionar, priorizar, intervenir','Intervenir, observar, priorizar, relacionar','Relacionar, intervenir, observar, priorizar'],a:0,e:'Intervenimos al final, en el orden correcto, tras observar, relacionar y priorizar.'},
 {q:'El gráfico de chakras y bloqueos emocionales…',o:['Entrega un diagnóstico definitivo','Ofrece un punto de partida para la investigación','Reemplaza los demás gráficos'],a:1,e:'Nos indica qué necesita ser observado antes de intervenir.'},
 {q:'¿Qué emoción principal se asocia al Chakra Plexo solar?',o:['Angustia / Duelo','Ira / Vergüenza','Miedo / Paranoia'],a:1,e:'El Plexo solar se relaciona con el poder personal, la autoestima y la voluntad.'},
 {q:'¿Qué bloqueos aparecen en el pétalo del Chakra Corazón?',o:['Angustia, duelo, violencia, egocentrismo, manipulación, tristeza y rechazo','Culpa y falta de creatividad','Confusión y mentiras'],a:0,e:'Cuando se liberan, el corazón se abre y fluye la armonía.'},
 {q:'Los lazos o cordones energéticos son…',o:['Patrones que se adhieren al campo emocional','Conexiones que nos atan a energías o situaciones que ya no nos benefician','Influencias externas que drenan la energía'],a:1,e:'Forman parte de la sección «Otros fuera del gráfico».'},
 {q:'Si el péndulo señala un órgano en el biómetro…',o:['Significa que hay una enfermedad','Investigamos si existe un desequilibrio energético relacionado con esa zona','Lo ignoramos'],a:1,e:'No significa necesariamente enfermedad: es una invitación a profundizar en el origen energético.'},
 {q:'¿A qué chakra pertenecen la tiroides y la laringe?',o:['Corazón','Garganta','Tercer ojo'],a:1,e:'El Chakra Garganta se relaciona con la comunicación, la expresión, la escucha y la verdad.'},
 {q:'Las energías discordantes…',o:['Definen a la persona','Son información energética que nos orienta','Siempre vienen de vidas pasadas'],a:1,e:'Pueden venir de la vida actual, memorias transgeneracionales, vidas pasadas, traumas o votos.'},
 {q:'Durante la evaluación de las energías discordantes buscamos…',o:['Culpables','Comprender su origen y el aprendizaje que traen','Etiquetar a la persona'],a:1,e:'La radiestesia no busca etiquetas; busca comprender el origen.'}];
RICH.n5a16=()=>n3quiz('c5',N3Q5,['Dominas lo esencial de la Clase 5.','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);
