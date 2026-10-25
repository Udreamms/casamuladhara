// Casa Muladhara · contenido del Nivel 2 (solo con acceso a este nivel; lo exige middleware.js).
// Script clásico: sus constantes quedan en el ámbito global que usa src/paginas/aula.html. Se carga después de los niveles anteriores.
/* ---------- Nivel 2 · Limpieza energética de casas y espacios ---------- */
const n2f=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
/* ----- dibujo SVG nativo: sectores, anillos, semicírculos ----- */
const n2P=(cx,cy,r,a)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
const n2N=v=>(+v).toFixed(1);
const n2tc=c=>{const n=parseInt(c.slice(1),16);return (.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))>150?'#1d2a22':'#ffffff'};
function n2sec(cx,cy,r0,r1,a0,a1){const A=n2P(cx,cy,r1,a0),B=n2P(cx,cy,r1,a1),C=n2P(cx,cy,r0,a1),D=n2P(cx,cy,r0,a0),lg=(a1-a0)>Math.PI?1:0;
 return `M${n2N(A[0])} ${n2N(A[1])}A${r1} ${r1} 0 ${lg} 1 ${n2N(B[0])} ${n2N(B[1])}L${n2N(C[0])} ${n2N(C[1])}A${r0} ${r0} 0 ${lg} 0 ${n2N(D[0])} ${n2N(D[1])}Z`}
const n2wrap=(s,n)=>{const L=[];let c='';s.split(' ').forEach(x=>{if(c&&(c+' '+x).length>n){L.push(c);c=x}else c=c?c+' '+x:x});if(c)L.push(c);return L};
const n2tx=(x,y,lines,fs,fill,wt=600)=>{const lh=fs*1.12,y0=y-(lines.length-1)*lh/2+fs*.35;
 return `<text text-anchor="middle" font-size="${fs}" font-weight="${wt}" fill="${fill}">${lines.map((l,i)=>`<tspan x="${n2N(x)}" y="${n2N(y0+i*lh)}">${esc(l)}</tspan>`).join('')}</text>`};
const n2svg=(vb,inner,label,cls='')=>{const v=vb.split(' ').map(Number);return `<div class="n2-w ${cls}"><svg class="n2-svg" viewBox="${vb}" style="aspect-ratio:${v[2]}/${v[3]}" role="group" aria-label="${esc(label)}">${inner}</svg></div>`};
/* un anillo de sectores clicables. o: key, items[{l,c}], sel, cx, cy, r0, r1, a0, span, fs, wrap, mode('rad'|'num'|'none') */
function n2ring(o){const n=o.items.length,d=o.span/n,idx=[...Array(n).keys()];
 const order=idx.filter(i=>i!==o.sel).concat(o.sel>=0&&o.sel<n?[o.sel]:[]);
 return order.map(i=>{const it=o.items[i],a0=o.a0+i*d,a1=a0+d,am=a0+d/2,on=i===o.sel,rm=(o.r0+o.r1)/2,[tx,ty]=n2P(o.cx,o.cy,rm,am);
  let txt='';
  if(o.mode==='num')txt=`<text x="${n2N(tx)}" y="${n2N(ty)}" dy=".35em" text-anchor="middle" font-size="${o.fs}" font-weight="700" fill="${n2tc(it.c)}">${i+1}</text>`;
  else if(o.mode!=='none'&&!(o.only&&!o.only(i))){let rot=am*180/Math.PI;if(Math.cos(am)<-1e-6)rot+=180;
   txt=`<g transform="translate(${n2N(tx)} ${n2N(ty)}) rotate(${n2N(rot)})">${n2tx(0,0,n2wrap(it.t||it.l,o.wrap||14),o.fs,n2tc(it.c))}</g>`}
  const act=o.act?o.act(i,it):rxa('set',o.key,i);
  return `<g ${act} role="button" tabindex="0" aria-label="${esc(it.l)}" aria-pressed="${on}"><path d="${n2sec(o.cx,o.cy,o.r0,o.r1,a0,a1)}" fill="${it.c}" stroke="${on?'var(--fg)':'var(--surface)'}" stroke-width="${on?3.5:1.5}" stroke-linejoin="round"/>${txt}</g>`}).join('')}
/* semicírculo y círculo completos */
const n2semi=o=>{const cx=200,cy=204,r0=o.r0||84,it=o.items[o.sel];
 return n2svg('0 0 400 214',n2ring({...o,cx,cy,r0,r1:190,a0:Math.PI,span:Math.PI,fs:o.fs||12})+
  `<path d="M${cx-r0+6} ${cy}A${r0-6} ${r0-6} 0 0 1 ${cx+r0-6} ${cy}Z" fill="var(--surface-2)"/>`+
  (it?n2tx(cx,cy-r0*.4,n2wrap(it.l,15),13,'var(--fg)',700)+`<text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="10" fill="var(--muted)">${o.sel+1} de ${o.items.length}</text>`:''),o.label)};
const n2full=o=>{const cx=200,cy=200,r0=74,it=o.items[o.sel];
 return n2svg('0 0 400 400',n2ring({...o,cx,cy,r0,r1:192,a0:-Math.PI/2,span:2*Math.PI,fs:o.fs||12})+
  `<circle cx="${cx}" cy="${cy}" r="${r0-5}" fill="var(--surface-2)"/>`+
  (it?n2tx(cx,cy-6,n2wrap(it.l,12),13,'var(--fg)',700)+`<text x="${cx}" y="${cy+r0-22}" text-anchor="middle" font-size="10" fill="var(--muted)">${o.sel+1} de ${o.items.length}</text>`:''),o.label,'sq')};
const n2items=(arr,pal)=>arr.map((x,i)=>({l:Array.isArray(x)?x[0]:x,c:pal[i%pal.length]}));
/* Módulo 1 */
RICH.n2welcome=()=>`<div class="dk-hero"><svg class="mo" aria-hidden="true"><use href="#mark"/></svg>
  <span class="eyebrow">Escuela de Formación Holística · Nivel 2</span><h2>Limpieza de casas<br>y espacios</h2>
  <p>Armoniza, limpia y eleva la energía de tu hogar y espacios, con el Péndulo Hebreo.</p>
  <div class="dk-chips">${['Evaluar','Detectar','Limpiar','Armonizar','Comprobar'].map(x=>`<span class="tg">${x}</span>`).join('')}</div>
  <small class="dk-sig">Método Casa Muladhara®</small></div>`;
const N2GOALS=[['Evaluar el estado energético de una casa o espacio.','Módulo 3 · Medición con el gráfico de Bovis'],['Identificar radiaciones de la Tierra, técnico–dañinas y paranormales.','Módulo 4 · Radiaciones y bloqueos'],['Utilizar los gráficos radiestésicos para detección y medición.','Módulos 3 y 4 · Bovis, radiaciones y bloqueo'],['Aplicar el protocolo de limpieza con Péndulo Hebreo.','Módulos 2 y 5 · Protocolo y práctica'],['Comprobar y elevar la frecuencia de los espacios.','Módulo 3 y Módulo 6 · Medición final y cierre']];
RICH.n2goals=()=>{const s=st('n2gl',0);
 return dkH('Módulo 1','Qué aprenderás y objetivo general','Toca cada punto para ver en qué parte del curso lo practicas.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${N2GOALS.map((x,i)=>`<button class="sel" ${rxa('set','n2gl',i)} ${pressed(i===s)}><span class="k n2-k">${i+1}</span><b>${x[0].replace(/\.$/,'')}</b></button>`).join('')}</div>
  <div style="display:grid;gap:12px"><div class="detail"><span class="eyebrow">Aprenderás a</span><h3>${N2GOALS[s][0]}</h3><p><b>Lo practicas en:</b> ${N2GOALS[s][1]}</p></div>
  <div class="dk-call warn"><b>Objetivo general.</b><p>Aprender a evaluar, detectar, limpiar y armonizar casas y espacios utilizando el <b>Péndulo Hebreo</b>, aplicando la radiestesia como herramienta de transformación y equilibrio energético.</p></div></div></div>`};
RICH.n2def=()=>{const d=st('n2df',0);
 return dkH('Módulo 1','¿Qué es la limpieza energética de un espacio?','Compara cómo está un lugar antes y después de limpiarlo.')+
 chipRow('n2df',['Antes de limpiar','Después de limpiar'],d)+
 `<div class="dk-split"><div class="n2-house ${d?'on':''}" aria-hidden="true">${ic('casa',92)}<span class="n2-halo"></span></div>
  <div style="display:grid;gap:12px">${d?`<div class="detail"><span class="eyebrow">Después</span><h3>Un ambiente de paz, equilibrio y bienestar</h3><p>La limpieza permite restablecer la circulación natural de la energía, promoviendo un ambiente de paz, equilibrio y bienestar.</p></div>`:`<div class="detail"><span class="eyebrow">Antes</span><h3>Energía estancada, densa o discordante</h3><p>Es la energía que puede afectar el bienestar de las personas que habitan el lugar.</p></div>`}
  <div class="dk-call"><b>En una frase.</b> La limpieza energética de un espacio es el proceso de armonizar y liberar la energía estancada, densa o discordante que puede afectar el bienestar de las personas que lo habitan.</div></div></div>
  <p class="dk-note" style="text-align:center;font-style:italic">“Espacios en armonía, vidas más plenas” · Método Casa Muladhara®</p>`};

const N2OBJ=[['casa','Aplicar el Péndulo Hebreo en la limpieza y armonización de casas, espacios y entornos.'],['detecta','Detectar y liberar energías discordantes, bloqueos y cargas energéticas.'],['loto','Elevar la vibración del espacio, generando armonía y bienestar.'],['limpia','Utilizar protocolos específicos y etiquetas hebreas para diferentes situaciones.'],['irradia','Realizar mediciones con el gráfico de Bovis para evaluar el estado energético antes y después.'],['corazon','Integrar esta herramienta en tu práctica profesional, brindando un servicio consciente y ético.']];
RICH.n2obj=()=>{const o=st('n2obj',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Módulo 1','Objetivos de la formación','Al finalizar este nivel serás capaz de lo siguiente. Toca lo que más te resuene.')+
 `<div class="sel-list">${N2OBJ.map((x,i)=>`<button class="ck" ${rxa('tog','n2obj',i)} ${pressed(o[i])}><span class="box"></span>${ic(x[0],22)}<span>${x[1]}</span></button>`).join('')}</div>
  <div class="prog"><span>${n} de 6 te resuenan</span><div class="bar"><i style="width:${n/6*100}%"></i></div></div>`};

const N2WHY=[['detecta','Conocer su estado energético','Permite saber cómo se encuentra el espacio en el momento de la evaluación.'],['limpia','Detectar zonas alteradas','Identifica áreas con energías estancadas, densas o discordantes que requieren intervención.'],['enlace','Determinar dónde intervenir','Orienta sobre qué zonas, objetos o elementos necesitan ser limpiados y armonizados.'],['armoniza','Comparar resultados','Permite medir el estado inicial y final del espacio, comprobando los cambios y el aumento de la vibración.']];
RICH.n2why=()=>{const s=st('n2why',0);
 return dkH('Módulo 1','¿Por qué evaluar primero un espacio?','Antes de realizar cualquier limpieza es fundamental evaluar su estado energético. Así actúas con claridad, precisión y efectividad.')+
 `<div class="dk-split"><div class="sel-list">${N2WHY.map((x,i)=>`<button class="sel" ${rxa('set','n2why',i)} ${pressed(i===s)}>${ic(x[0],24)}<b>${x[1]}</b></button>`).join('')}</div>
  <div class="detail"><span class="eyebrow">${s+1} de 4</span><h3>${N2WHY[s][1]}</h3><p>${N2WHY[s][2]}</p></div></div>
  <p class="dk-quote"><mark>Primero medimos.</mark> Luego intervenimos. Finalmente volvemos a medir.</p>`};

const N2KIT=[['Péndulo Hebreo','Herramienta principal para evaluar, detectar, limpiar y armonizar la energía del espacio. Permite trabajar con las etiquetas hebreas según las necesidades identificadas durante la evaluación.'],['Spray áurico','Preparado de salvia, romero y lavanda. Se usa para acompañar la preparación de la terapeuta y la armonización del espacio, antes, durante o después del trabajo.'],['Gráficos radiestésicos','Herramientas de apoyo para realizar mediciones y evaluaciones del espacio, identificar niveles energéticos y detectar posibles desequilibrios o alteraciones.'],['Etiquetas hebreas','Se utilizan junto al Péndulo Hebreo para el trabajo específico de limpieza, liberación, protección, equilibrio y armonización, según lo determinado en la evaluación.'],['Plano del espacio y ficha de registro','El plano permite ubicar y trabajar las diferentes áreas del espacio. La ficha registra las mediciones iniciales, las zonas evaluadas, el trabajo realizado y las mediciones finales.']];
RICH.n2kit=()=>{const h=st('n2kitH',{});const s=st('n2kitS',0);const n=Object.values(h).filter(Boolean).length;
 return dkH('Módulo 1','Materiales necesarios','Toca cada elemento y marca los que ya tienes.')+
 `<div class="kit">${N2KIT.map((x,i)=>`<button ${rxa('set','n2kitS',i)} ${pressed(i===s)} class="${h[i]?'got':''}"><span class="have"></span><span class="k">${i+1}</span><b>${x[0]}</b></button>`).join('')}</div>
  <div class="detail"><h3>${N2KIT[s][0]}</h3><p>${N2KIT[s][1]}</p><div class="row"><button class="btn ${h[s]?'btn-ghost':'btn-primary'} btn-sm" ${rxa('tog','n2kitH',s)}>${h[s]?'Quitar de mi kit':'Ya lo tengo'}</button></div></div>
  <div class="prog"><span>Tienes ${n} de 5</span><div class="bar"><i style="width:${n/5*100}%"></i></div></div>`};

/* Módulo 2 */
const N2PROTO=[
 ['Preparación de la terapeuta','persona','',['Centrarte y conectar contigo misma.','Establecer una intención clara para el trabajo.','Pedir protección y acompañamiento.','Verificar que estás en condiciones adecuadas para realizar la sesión.']],
 ['Evaluación inicial del espacio','casa','Antes de limpiar, evaluar:',['Estado energético general.','Zonas con mayor carga o alteración.','Presencia de energías estancadas o discordantes.','Posibles fuentes de alteración.','Nivel energético inicial del espacio.']],
 ['Identificación','detecta','Determinar, mediante radiestesia:',['Qué áreas requieren intervención.','Qué tipo de alteración se está detectando.','Influencias del entorno, personas, objetos o situaciones asociadas.','Qué procedimiento será necesario realizar.']],
 ['Limpieza','pend','',['Aplicar el procedimiento correspondiente con el Péndulo Hebreo, recorriendo las áreas previamente identificadas y utilizando los gráficos radiestésicos y etiquetas del Método Casa Muladhara®.']],
 ['Armonización','loto','Una vez realizada la limpieza:',['Volver a evaluar.','Comprobar el estado energético.','Armonizar las zonas que lo requieran.','Utilizar el spray áurico de salvia, romero y lavanda como parte del cierre y armonización del espacio.']],
 ['Comprobación final','irradia','Volver a medir para verificar:',['Estado energético final.','Que las zonas intervenidas hayan sido armonizadas.','Que el espacio se encuentre en condiciones adecuadas para finalizar el trabajo.']],
 ['Cierre','corazon','',['Agradecer el trabajo realizado.','Cerrar el trabajo energético.','Retirarte del espacio conscientemente.']]
];
RICH.n2proto=()=>{const s=st('n2pp',0);const p=N2PROTO[s];
 return dkH('Módulo 2','Protocolo Casa Muladhara®','Siete pasos para una limpieza energética de casas y espacios. Toca cada uno.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${N2PROTO.map((x,i)=>`<button class="sel" ${rxa('set','n2pp',i)} ${pressed(i===s)}>${ic(x[1],24)}<b>${i+1}. ${x[0]}</b></button>`).join('')}</div>
  <div class="detail"><span class="eyebrow">Paso ${s+1} de 7</span><h3>${p[0]}</h3>${p[2]?`<p><b>${p[2]}</b></p>`:''}<ul style="margin:0;padding-left:20px;display:grid;gap:6px">${p[3].map(x=>`<li>${x}</li>`).join('')}</ul>
  <div class="row"><button class="btn btn-ghost btn-sm" ${rxa('set','n2pp',Math.max(0,s-1))} ${s===0?'disabled':''}>Paso anterior</button><button class="btn btn-primary btn-sm" ${rxa('set','n2pp',Math.min(6,s+1))} ${s===6?'disabled':''}>Paso siguiente</button></div></div></div>
  <div class="dk-call"><b>Importante.</b> La intención, la conexión y la práctica consciente son la base de una limpieza energética efectiva. Cada espacio es único: confía en tu guía interior y en la sabiduría del Péndulo Hebreo.</div>`};

RICH.n2order=()=>{const o=st('n2o',{n:0,ord:N2PROTO.map((_,i)=>i).sort(()=>Math.random()-.5),msg:''});
 const fin=o.n===7;
 return dkH('Módulo 2','Ordena el protocolo','Toca los pasos en el orden correcto.')+
 `<div class="dk-chips" style="min-height:40px">${N2PROTO.slice(0,o.n).map((x,i)=>`<span class="tg">${i+1}. ${x[0]}</span>`).join('')||'<span class="dk-note">Aquí aparecerán los pasos que vayas acertando.</span>'}</div>
  <div class="dk-grid c3">${o.ord.map(i=>`<button class="sel" ${rxa('n2o',i)} ${pressed(i<o.n)} ${i<o.n?'disabled':''}>${ic(N2PROTO[i][1],24)}<b>${N2PROTO[i][0]}</b></button>`).join('')}</div>
  ${fin?`<div class="dk-call"><b>¡Lo lograste!</b> Primero medimos, luego intervenimos, finalmente volvemos a medir.</div>`:o.msg?`<div class="dk-call warn">${o.msg}</div>`:''}
  <div class="dk-cta"><button class="btn btn-ghost btn-sm" ${rxa('n2or',0)}>Reiniciar</button></div>`};

const N2PREP=[['loto','Centrarte y conectar','Realiza una breve meditación o respiración consciente para alinearte contigo misma y con la energía que te rodea.'],['detecta','Establecer intención clara','Definir el propósito antes de comenzar orienta y potencia tu trabajo.'],['persona','Mantener equilibrio','Cuida tu estado físico, emocional y mental. Una terapeuta equilibrada sostiene mejores resultados.'],['limpia','Preparar tus herramientas','Verifica tu péndulo, los gráficos y el spray áurico. Asegúrate de que estén limpios, cargados y listos para trabajar.'],['corazon','Conexión consciente','Conéctate con la energía del espacio y pide siempre guía para actuar por el mayor bien de todos.']];
RICH.n2prep=()=>{const o=st('n2prepT',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Módulo 2','Preparación de la terapeuta','Tu estado interno influye directamente en la calidad del trabajo. Márcalos uno por uno, con calma.')+
 `<div class="sel-list">${N2PREP.map((x,i)=>`<button class="ck" ${rxa('tog','n2prepT',i)} ${pressed(o[i])}><span class="box"></span>${ic(x[0],22)}<span><b>${x[1]}.</b> ${x[2]}</span></button>`).join('')}</div>
  <div class="detail"><h3>${n===5?'Lista para comenzar':n+' de 5'}</h3><p>${n===5?'Recuerda: tú eres el canal. Tu preparación es la base para una limpieza profunda y amorosa.':'Tómate el tiempo que necesites.'}</p></div>`};

const N2PROT={a:['Antes de comenzar','Verifico mi energía y mi protección','Con el Péndulo Hebreo sobre el gráfico correspondiente, realiza las siguientes preguntas:',['¿Estoy protegida para realizar esta limpieza?','¿Mi campo energético está limpio y preparado para trabajar?','¿Estoy trabajando desde mi Yo Superior y con la guía de mi Comité Espiritual?'],'Si alguna respuesta no es favorable: detén el trabajo, realiza la limpieza y protección correspondiente y vuelve a verificar.'],
 b:['Al finalizar','Verifico mi cierre y protección','Antes de retirarte del espacio, realiza las siguientes preguntas con el Péndulo Hebreo:',['¿Estoy completamente desconectada de la energía de este espacio?','¿Mi campo energético está limpio y protegido?','¿La conexión energética con este espacio ha quedado cerrada?'],'Cierre: “Doy por finalizada toda conexión energética con este espacio. Quedo limpia, protegida y en equilibrio. Gracias, gracias, gracias.”']};
RICH.n2prot=()=>{const t=st('n2pt','a');const d=N2PROT[t];const o=st('n2pq'+t,{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Módulo 2','Protección de la terapeuta: antes y después','Cada pregunta debe indicar Sí / 100 %.')+
 `<div class="dk-chips" role="group">${['a','b'].map(k=>`<button class="chip" ${rxa('set','n2pt',k)} ${pressed(k===t)}>${N2PROT[k][0]}</button>`).join('')}</div>
  <div><div class="dk-sub">${d[1]}</div><p class="dk-lede" style="margin:0 0 12px">${d[2]}</p>
  <div class="sel-list">${d[3].map((x,i)=>`<button class="ck" ${rxa('tog','n2pq'+t,i)} ${pressed(o[i])}><span class="box"></span><span><b>${x}</b><br><small class="muted">Debe indicar Sí / 100 %</small></span></button>`).join('')}</div></div>
  <div class="dk-call ${n===3?'':'warn'}">${n===3?'<b>Todo en orden.</b> Puedes '+(t==='a'?'comenzar el trabajo.':'retirarte del espacio.'):'<b>'+n+' de 3 confirmadas.</b> '+d[4]}</div>`};

const N2PRAYER=['En este momento me centro, respiro y me conecto con mi Yo Superior, con mi Comité Espiritual, con mis Maestros, Guías, Seres de Luz, Arcángeles y toda la asistencia divina que me acompaña.','Solicito su presencia, protección y guía en este trabajo de limpieza y armonización. Que solo el Amor, la Luz y la Verdad se manifiesten en este lugar.','Pido que se disuelvan y se transmuten todas las energías densas, estancadas, discordantes o de baja vibración, de cualquier origen y de cualquier tiempo. Que este espacio quede libre, limpio, equilibrado y armonizado, para el bienestar de todos los seres que lo habitan.','Que la energía divina lo llene de paz, armonía, salud, prosperidad y protección. Que este lugar sea un refugio de luz, donde solo pueda permanecer aquello que aporta al bien mayor y al más alto propósito.','Gracias, gracias, gracias. Así es, así será, así ya es.'];
RICH.n2prayer=()=>{const i=st('n2pr',0);const full=st('n2prF',0);
 return dkH('Módulo 2','Oración para la limpieza de casas y espacios','Léela en voz alta antes de empezar.')+
 chipRow('n2prF',['Paso a paso','Texto completo'],full)+
 (full?`<div class="detail" style="gap:12px">${N2PRAYER.map(x=>`<p style="font-family:var(--f-display);font-size:1.08rem;font-style:italic">${x}</p>`).join('')}</div>`
 :`<div class="breath" aria-hidden="true"></div>
  <div class="detail" style="text-align:center;min-height:170px;align-content:center"><span class="eyebrow">${i+1} de ${N2PRAYER.length}</span><p style="font-size:1.15rem;font-family:var(--f-display);font-style:italic">${N2PRAYER[i]}</p></div>
  <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('n2pr',-1)} ${i===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('n2pr',1)} ${i===N2PRAYER.length-1?'disabled':''}>Siguiente frase</button></div>`)};

/* Módulo 3 · Bovis */
const BV=[[0,2000,'Muy bajo','Ambiente muy cargado, pesado, denso. Desequilibrio importante.','#b53a22'],[2001,4000,'Bajo','Energía densa. Presencia de bloqueos o energía estancada.','#d4562a'],[4001,6000,'Bajo medio','Ambiente inestable. Puede haber interferencias o cargas emocionales.','#ec8a2c'],[6001,8000,'Medio','Energía neutra. Espacio funcional pero sin vitalidad.','#f3c43a'],[8001,12000,'Medio alto','Energía equilibrada. Ambiente armónico y agradable.','#b9cf45'],[12001,16000,'Alto','Energía elevada. Espacio saludable, vital y positivo.','#6ea943'],[16001,20000,'Muy alto','Energía muy elevada. Espacio muy armonizado, ideal para bienestar.','#2f7a38']];
const bvl=v=>BV.find(r=>v>=r[0]&&v<=r[1])||BV[BV.length-1];
const bvMid=b=>Math.round((b[0]+b[1])/2/100)*100;
/* medidor semicircular; mode 'bb' = elige nivel · 'bv' = fija el valor */
function n2gauge(v,mode,sel,plain){const cx=200,cy=204,r0=92,r1=184;const cur=bvl(v);
 const idx=BV.map((_,i)=>i);const on=i=>mode==='bb'?i===sel:BV[i]===cur;
 const bands=idx.filter(i=>!on(i)).concat(idx.filter(on)).map(i=>{const b=BV[i],a0=Math.PI+b[0]/20000*Math.PI,a1=Math.PI+Math.min(b[1]+1,20000)/20000*Math.PI,am=(a0+a1)/2,[tx,ty]=n2P(cx,cy,(r0+r1)/2,am);
  let rot=am*180/Math.PI;if(Math.cos(am)<-1e-6)rot+=180;const o=!plain&&on(i);
  return `<g ${mode==='bb'?rxa('set','n2bb',i):rxa('n2bv',bvMid(b))} role="button" tabindex="0" aria-label="${b[2]}: ${n2f(b[0])} a ${n2f(b[1])}" aria-pressed="${o}"><path d="${n2sec(cx,cy,r0,r1,a0,a1)}" fill="${b[4]}" stroke="${o?'var(--fg)':'var(--surface)'}" stroke-width="${o?3.5:1.5}" stroke-linejoin="round"/><g transform="translate(${n2N(tx)} ${n2N(ty)}) rotate(${n2N(rot)})">${n2tx(0,0,[b[2]],11,n2tc(b[4]))}</g></g>`}).join('');
 const ticks=[0,4000,8000,12000,16000,20000].map(t=>{const a=Math.PI+t/20000*Math.PI,[x,y]=n2P(cx,cy,r1+8,a),an=t<10000?'end':t>10000?'start':'middle';return `<text x="${n2N(x)}" y="${n2N(y+(t===0||t===20000?-1:3))}" text-anchor="${an}" font-size="10" fill="var(--muted)">${n2f(t)}</text>`}).join('');
 const na=Math.PI+Math.min(Math.max(v,0),20000)/20000*Math.PI,[nx,ny]=n2P(cx,cy,r1-10,na);
 const needle=plain?'':`<line x1="${cx}" y1="${cy}" x2="${n2N(nx)}" y2="${n2N(ny)}" stroke="var(--fg)" stroke-width="4" stroke-linecap="round" style="pointer-events:none"/><circle cx="${cx}" cy="${cy}" r="9" fill="var(--fg)" style="pointer-events:none"/>`;
 return n2svg('-14 0 428 214',bands+ticks+needle,'Gráfico de Bovis de 0 a 20.000 unidades')}
const n2ends=()=>`<div class="n2-ends"><span class="lo">Desequilibrio y alteración</span><span class="hi">Equilibrio y armonía</span></div>`;
const n2bDet=(r,v)=>`<div class="detail" style="border-left:6px solid ${r[4]}"><span class="eyebrow">Nivel energético${v!==undefined?'':' · '+n2f(r[0])+' a '+n2f(r[1])}</span><h3>${r[2]}</h3><p>${r[3]}</p></div>`;
RICH.n2bovis0=()=>{const s=Math.min(st('n2bb',4),6);const r=BV[s];
 return dkH('Módulo 3','Estado energético del espacio','El gráfico de Bovis mide el nivel de energía general de un lugar, de 0 (desequilibrio y alteración) a 20.000 unidades (equilibrio y armonía). Toca un nivel.')+
 `<div class="dk-call"><b>Pregunta al péndulo:</b> ¿Cuál es el nivel energético general de este espacio en este momento?</div>`+
 n2gauge(bvMid(r),'bb',s)+n2ends()+n2bDet(r)};
function n2bOut(v){const r=bvl(v);
 return n2gauge(v,'bv')+n2ends()+
 `<div class="dk-split" style="margin-top:6px"><div style="text-align:center"><span class="qscore" style="font-size:clamp(2.6rem,6vw,3.6rem)">${n2f(v)}</span><div class="dk-note">unidades Bovis</div></div>${n2bDet(r,v)}</div>`}
function n2bUpd(){const o=document.getElementById('n2b-out');if(o)o.innerHTML=n2bOut(st('n2bv',9500))}
RICH.n2bovis=()=>{const v=st('n2bv',9500);
 return dkH('Módulo 3','Practica la lectura de Bovis','Mueve el control, o toca el medidor, como si el péndulo hubiera indicado ese valor.')+
 `<div class="dk-call"><b>Pregunta al péndulo:</b> ¿Cuál es el nivel energético general de este espacio en este momento?</div>
  <label class="dk-note" for="n2b">Medición del péndulo (0 a 20.000)</label><input type="range" class="n2-range" id="n2b" data-n2b min="0" max="20000" step="100" value="${v}">
  <div id="n2b-out" style="display:grid;gap:14px">${n2bOut(v)}</div>
  <div class="dk-call warn"><b>Importante.</b> Realiza la medición en el centro del espacio y luego en las diferentes áreas, para detectar variaciones y zonas que requieran intervención.</div>`};
RICH.n2btab=()=>dkH('Módulo 3','Los 7 niveles de Bovis','Es la tabla que usarás para interpretar cada medición.')+
 `<div class="tbl-wrap"><table class="tbl" style="min-width:480px"><thead><tr><th>Rango</th><th>Nivel</th><th>Significado</th></tr></thead><tbody>${BV.map(r=>`<tr><td>${n2f(r[0])} – ${n2f(r[1])}</td><td><span class="n2-lv"><i class="n2-sw" style="background:${r[4]}"></i><b>${r[2]}</b></span></td><td style="white-space:normal">${r[3]}</td></tr>`).join('')}</tbody></table></div>
  <div class="dk-call"><b>Para imprimir.</b> El gráfico de Bovis también está en el PDF de gráficos radiestésicos (pestaña Materiales), para trabajar con tu péndulo sobre papel.</div>`;

/* Módulo 4 · gráficos de radiestesia */
const N2CH={
 tierra:{img:13,how:14,t:'Radiaciones negativas de la Tierra',lede:'A través de la radiestesia evalúas si existen radiaciones de origen natural que puedan estar afectando la armonía y el equilibrio del espacio.',q:'¿Existe alguna radiación negativa de la tierra en este espacio?',rec:'Se recomienda utilizar SCAP como apoyo para la armonización del espacio.',cats:[
  ['Radioactividad','Se consulta si en el lugar existe, según la lectura radiestésica, una posible influencia asociada a radioactividad.','¿Existe influencia de radioactividad en este espacio?'],
  ['Agua subterránea','Corresponde a corrientes o masas de agua bajo el terreno. Se puede consultar especialmente en lugares donde se permanece muchas horas o donde se descansa.','¿Existe influencia de agua subterránea bajo esta zona?'],
  ['Cementerios','Se utiliza para consultar una posible influencia relacionada con terrenos donde existen o existieron cementerios o lugares de enterramiento.','¿Existe influencia asociada a un antiguo o actual lugar de enterramiento?'],
  ['Minerales metálicos','Se relaciona con la posible presencia de concentraciones de minerales metálicos en el subsuelo.','¿Existe influencia asociada a minerales metálicos en este terreno?'],
  ['Petróleo y carbón','Corresponde a la consulta de posibles yacimientos o características geológicas asociadas al petróleo y al carbón.','¿Existe influencia asociada a petróleo o carbón en este terreno?'],
  ['Anomalía magnética','Se utiliza para consultar una posible alteración o anomalía del campo magnético terrestre en una determinada zona.','¿Existe una anomalía magnética en este punto del espacio?'],
  ['Curry','Se asocia a una red energética terrestre de carácter diagonal, que puede generar alteraciones en el equilibrio del espacio.','¿Existe influencia de la red Curry en este espacio?'],
  ['Red Hartmann','Corresponde a una red energética terrestre que forma una cuadrícula y puede generar zonas de estrés energético.','¿Existe influencia de la red Hartmann en este espacio?'],
  ['Red Global','Es una red energética que se considera una ampliación de la red Hartmann, con líneas más amplias, que también puede influir en el equilibrio energético.','¿Existe influencia de la red Global en este espacio?'],
  ['Chimenea cosmotelúrica','Se refiere a columnas de energía que conectan el subsuelo con el cielo, generando un flujo energético vertical que puede afectar el equilibrio del espacio.','¿Existe influencia de una chimenea cosmotelúrica en este espacio?'],
  ['Falla tectónica','Se utiliza para consultar la posible presencia de fallas o fracturas en la corteza terrestre, que pueden generar inestabilidad energética en el entorno.','¿Existe influencia de una falla tectónica en este espacio?'],
  ['Gas radón','Se consulta para evaluar si existe, según la lectura radiestésica, una posible presencia de gas radón en el subsuelo, que puede influir en la calidad del lugar.','¿Existe influencia de gas radón en este espacio?']]},
 tecnico:{img:17,how:18,t:'Radiaciones técnico dañinas',lede:'Evalúa la presencia e influencia de radiaciones de origen electromagnético y tecnológico que pueden afectar la armonía del espacio.',q:'¿Existe alguna radiación técnico dañina en este espacio?',rec:'Se recomienda utilizar ORGÓN / SCAP.',cats:[
  ['Campo de alta tensión','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Existe influencia de campo de alta tensión?'],
  ['Transformadores eléctricos','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Existe influencia de transformadores eléctricos en este espacio?'],
  ['Radar','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Existe influencia de radar en este espacio?'],
  ['Transmisiones','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Existe influencia de transmisiones en este espacio?'],
  ['Antenas de radio, tv, internet','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Existe radiación de antenas de radio, tv o internet?'],
  ['Antenas telefónicas','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Hay influencia de antenas telefónicas?'],
  ['Instalaciones eléctricas','Fuente de origen tecnológico que puede afectar la armonía del lugar.','¿Existe radiación de instalaciones eléctricas?'],
  ['Aparatos electrónicos','Microondas, computadores, televisores, etc.','¿Hay presencia de aparatos electrónicos (microondas, computadores, televisores, etc.)?'],
  ['Otros','Otras fuentes de radiaciones tecnológicas.','¿Existe otra fuente de radiación tecnológica en este espacio?']]},
 para:{img:19,how:20,t:'Radiaciones paranormales',lede:'Identifica, a través de la radiestesia, si existen en un espacio interferencias o radiaciones de origen sutil que puedan estar afectando su armonía.',q:'¿Existe alguna radiación paranormal en este espacio?',rec:'',cats:[
  ['Entidades','Se consulta la posible presencia de entidades o energías no físicas en el espacio, que pueden generar alteraciones en el ambiente.','¿Existe presencia de entidades en este espacio?'],
  ['Impregnaciones y remanencias','Corresponde a energías que han quedado impregnadas en el lugar por hechos, personas o situaciones del pasado, y que aún pueden influir en el espacio.','¿Existe impregnaciones o remanencias en este espacio?'],
  ['Muebles y objetos antiguos','Se utiliza para evaluar si muebles u objetos antiguos generan influencia energética en el lugar, ya sea por su historia, personas o energías acumuladas.','¿Existe influencia de muebles u objetos antiguos?'],
  ['Portales negativos abiertos','Se consulta la posible existencia de portales o aperturas energéticas no deseadas que pueden permitir el ingreso de energías discordantes.','¿Existe algún portal negativo abierto en este espacio?'],
  ['Ondas de forma','Son formas geométricas, diseños o estructuras presentes en el espacio que pueden generar alteraciones energéticas, según su forma, material o ubicación.','¿Existen ondas de forma que influyan en este espacio?'],
  ['Maleficios','Se utiliza para evaluar la posible presencia de trabajos de maleficio o energías enviadas con intención de daño, que pueden estar afectando la armonía del lugar.','¿Existe influencia de maleficios en este espacio?'],
  ['Magia negra','Se utiliza para evaluar la posible presencia de trabajos de magia negra o energías enviadas con intención de daño, que pueden afectar la armonía del lugar.','¿Existe influencia de magia negra en este espacio?'],
  ['Karma','Corresponde a la posible influencia de cargas kármicas o energías no resueltas del pasado, que pueden manifestarse en un lugar y generar desequilibrios.','¿Existe influencia de karma en este espacio?'],
  ['Decoración','Se consulta si elementos decorativos del lugar generan alteraciones energéticas, ya sea por su forma, material, simbología o carga energética.','¿Existe influencia de la decoración en este espacio?'],
  ['Formas de pensamiento negativo','Se refiere a la presencia de pensamientos, emociones o intenciones negativas que se han proyectado en el lugar y que pueden permanecer como forma energética.','¿Existen formas de pensamiento negativo en este espacio?'],
  ['Ataques psíquicos','Se utiliza para evaluar si el lugar se encuentra afectado por ataques psíquicos o proyecciones de energía densa, que pueden generar sensación de malestar, confusión o tensión en el ambiente.','¿Existe influencia de ataques psíquicos en este espacio?'],
  ['Otros','Otras interferencias de origen sutil no incluidas en las categorías anteriores.','¿Existe otra interferencia de origen sutil en este espacio?']]}
};
const N2NAT=[['Emociones','#f0b8b0','Energías emocionales densas o no resueltas (tristeza, enojo, miedo, etc.).'],['Conflictos familiares','#f2a03a','Tensiones, discusiones o dinámicas familiares que afectan el espacio.'],['Trauma histórico del lugar','#b9705c','Eventos del pasado que aún dejan huella en la energía del lugar.'],['Objeto cargado','#8d8f92','Objetos con carga energética negativa (herencias, regalos, etc.).'],['Memoria residual','#b9aee0','Energías que permanecen en el espacio aunque la causa ya no esté presente.'],['Influencia externa','#7a9cc6','Energías externas que afectan el lugar (vecinos, entorno, situaciones externas).'],['Entidades presentes','#4d6b44','Presencia de entidades o energías no físicas.'],['Tecnología acumulada','#7db6e8','Exceso de tecnología o contaminación electromagnética.'],['Desconocido','#9a9a9a','Origen del bloqueo no identificado claramente.']];
const N2INT=[['Limpio','#8cc66e','Energía en equilibrio. El espacio se encuentra en armonía.'],['Densa leve','#e8c84a','Pequeñas alteraciones. Energía ligeramente densa, fácil de armonizar.'],['Moderado','#f0922e','Bloqueo perceptible. Se recomienda realizar una limpieza completa.'],['Bloqueo fuerte','#e0372f','Energía densa y resistente. Requiere trabajo profundo y uso de múltiples etiquetas.'],['Saturación energética','#b0201c','Alta carga energética. El espacio se encuentra muy afectado. Se recomienda limpieza intensiva y protección posterior.'],['Campo colapsado','#7a1a15','Energía muy alterada. El espacio está fuertemente bloqueado. Se recomienda una limpieza completa, armonización y sellado.']];
const N2ORI=[['Maldiciones','Energía negativa proyectada intencionalmente con la intención de dañar el lugar, sus habitantes o su prosperidad. Puede provenir de una persona, un linaje o un ritual de alta carga negativa.','Frases de maldición, rituales de odio, herencias energéticas.'],['Hechizos','Trabajo energético realizado con intención, utilizando rituales, objetos o palabras para generar un efecto negativo en el espacio o sus habitantes.','Amarres, ataduras, brujería, trabajos de dominio.'],['Portal negativo','Apertura energética no armónica que permite la entrada de energías densas desde otras dimensiones o planos. Puede haber sido abierto intencionalmente o por eventos de alta carga emocional.','Portales creados en rituales, por muertes, violencia o prácticas esotéricas.'],['Entidad de bajo astral','Presencia de entidades de baja vibración que se alimentan de la energía del lugar o de sus habitantes. Pueden generar sensación de malestar, miedo, pesadez o conflictos constantes.','Entidades que se adhieren al lugar, se alimentan de la energía disponible.'],['Desencarnados','Almas que no han trascendido y permanecen en el plano físico o en planos cercanos. Pueden estar por apego, confusión, sufrimiento o por situaciones no resueltas. Generan estancamiento y sensación de presencia.','Almas en tránsito, personas que fallecieron en el lugar, apegos emocionales.']];
const N2PASO=[['Conecta','Con tu péndulo y centra tu intención.'],['Pregunta','«¿Cuál es el origen energético de la alteración en este espacio?»'],['Observa','La categoría que te indique este sector del gráfico.'],['Registra','Anota el resultado y su intensidad (10 % a 50 %).'],['Continúa','Aplica las etiquetas y realiza la limpieza adecuada.']];
/* gráficos nativos de radiestesia */
const N2PAL={tierra:['#ecd2b0','#a9cfe0','#cdbcab','#bfa98f','#b4b9bd','#e3b574','#d3deaa','#b0cfa8','#c2d9a4','#e1cf94','#d49a84','#d4e6cd'],
 tecnico:['#a9c3df','#bdb8e0','#c3d6ea','#9fd3d8','#dccdad','#eabda0','#f2d98f','#c8dcb8','#d7d7d7'],
 para:['#dcc8ec','#cdbbe0','#e4c4d2','#bba9d9','#d6b4cc','#c995a8','#8d79a0','#dcbca4','#ebd9ac','#bccae3','#ab9fcb','#d3d3d3']};
const n2chart=id=>{const c=N2CH[id];const s=Math.min(st('n2ch'+id,0),c.cats.length-1);const k=c.cats[s];
 const fig=n2full({key:'n2ch'+id,items:n2items(c.cats,N2PAL[id]),sel:s,wrap:14,label:'Gráfico de '+c.t+': '+c.cats.length+' categorías'});
 return dkH('Módulo 4',c.t,c.lede)+
 `<div class="dk-grid c2" style="align-items:start"><div>${fig}<p class="dk-note" style="text-align:center">Toca un sector del gráfico para ver qué significa.</p></div>
  <div style="display:grid;gap:12px"><div class="detail"><span class="eyebrow">${s+1} de ${c.cats.length}</span><h3>${k[0]}</h3><p>${k[1]}</p><p><b>Pregunta de ejemplo:</b> <i>«${k[2]}»</i></p></div>
  <div class="dk-call"><b>Cómo se usa.</b> Coloca el gráfico en una superficie plana y sitúa el péndulo en el centro. Haz una pregunta clara, por ejemplo: <i>«${c.q}»</i>. Observa hacia qué sector se dirige el péndulo e interpreta la categoría indicada.</div>${c.rec?`<div class="dk-call warn"><b>Recomendación.</b> ${c.rec}</div>`:''}</div></div>
  ${chipRow('n2ch'+id,c.cats.map((x,i)=>(i+1)+'. '+x[0]),s)}`};
RICH.n2tierra=()=>n2chart('tierra');RICH.n2tecnico=()=>n2chart('tecnico');RICH.n2para=()=>n2chart('para');

const N2NATI=()=>N2NAT.map(x=>({l:x[0],c:x[1]}));
const N2UBI=[['Entrada principal','#c4c4bb'],['Sala','#f6c89a'],['Cocina','#f8e08a'],['Recámara principal','#f2b3c0'],['Recámaras secundarias','#3d96d0'],['Baño','#8cc4ea'],['Escaleras / pasillo','#9ccfe6'],['Patio / jardín','#98d4ae'],['Azotea','#b4b7ba'],['Estudio','#6f8fb0'],['Espacio ritual / altar','#d8d6f0'],['Otra','#e0bf8e']];
const N2UBII=()=>N2UBI.map(x=>({l:x[0],c:x[1]}));
const N2INTI=()=>N2INT.map(x=>({l:x[0],c:x[1]}));
const n2dot=(c)=>`<i class="dot" style="background:${c};width:14px;height:14px;border-radius:50%;flex-shrink:0;border:1px solid rgba(0,0,0,.18)"></i>`;

/* gráfico completo: tres anillos */
const n2bloqSvg=(a,b,c)=>{const cx=400,cy=408,H=Math.PI,NI=N2NATI(),UI=N2UBII(),II=N2INTI();
 return n2svg('0 0 800 420',
  n2ring({key:'n2nat',items:NI,sel:a,cx,cy,r0:300,r1:392,a0:H,span:H,fs:13,wrap:10})+
  n2ring({key:'n2ubi',items:UI,sel:b,cx,cy,r0:206,r1:300,a0:H,span:H,fs:13.5,wrap:11})+
  n2ring({key:'n2int',items:II,sel:c,cx,cy,r0:112,r1:206,a0:H,span:H,fs:13.5,wrap:10})+
  `<path d="M${cx-106} ${cy}A106 106 0 0 1 ${cx+106} ${cy}Z" fill="var(--surface-2)"/>`+n2tx(cx,cy-76,['Tu lectura'],12,'var(--muted)',700)+n2tx(cx,cy-54,[a>=0?N2NAT[a][0]:''],14,'var(--fg)',700)+n2tx(cx,cy-36,[b>=0?N2UBI[b][0]:''],13,'var(--fg)',600)+n2tx(cx,cy-18,[c>=0?N2INT[c][0]:''],13,'var(--fg)',600),
  'Gráfico de bloqueo con tres anillos: naturaleza, ubicación física e intensidad','wide')};
RICH.n2bloq=()=>{const a=st('n2nat',0),b=st('n2ubi',1),c=st('n2int',2);const NI=N2NATI(),UI=N2UBII(),II=N2INTI();
 const svg=n2bloqSvg(a,b,c);
 const grp=(t,key,items,cur,off)=>`<div style="display:grid;gap:8px;align-content:start"><div class="dk-sub" style="margin:0">${t}</div><div class="sel-list" style="gap:6px">${items.map((x,i)=>`<button class="sel n2-sm" ${rxa('set',key,i)} ${pressed(i===cur)}>${n2dot(x.c)}<span class="n2-n">${i+1}</span><b>${x.l}</b></button>`).join('')}</div></div>`;
 return dkH('Módulo 4','El gráfico de bloqueo completo','Tres anillos en un solo gráfico: de afuera hacia adentro, la naturaleza del bloqueo, su ubicación física y su intensidad. Toca un sector de cada anillo para armar una lectura.')+
 `${svg}
  <div class="dk-grid c3" style="align-items:start">${grp('Anillo externo · Naturaleza','n2nat',NI,a)}${grp('Anillo medio · Ubicación física','n2ubi',UI,b)}${grp('Anillo interno · Intensidad','n2int',II,c)}</div>
  <div class="detail" style="border-left:6px solid ${N2INT[c][1]}"><span class="eyebrow">Lectura de ejemplo</span><h3>${N2NAT[a][0]} · ${N2UBI[b][0]} · ${N2INT[c][0]}</h3><p>${N2INT[c][2]}</p></div>
  <div class="dk-call"><b>Cómo se usa.</b> Haz una pregunta para cada anillo con tu péndulo: la naturaleza del bloqueo, dónde se ubica y con qué intensidad. Registra los tres datos en la ficha y elige las etiquetas según la profundidad de la limpieza.</div>`};

RICH.n2naturaleza=()=>{const s=st('n2nat',0);const n=N2NAT[s];
 return dkH('Módulo 4','Naturaleza del bloqueo','Anillo externo del gráfico: te muestra el origen o la causa principal de la alteración, para aplicar la limpieza y las etiquetas adecuadas.')+
 `<div class="dk-grid c2" style="align-items:start"><div>${n2semi({key:'n2nat',items:N2NATI(),sel:s,wrap:12,label:'Naturaleza del bloqueo: 9 categorías'})}<p class="dk-note" style="text-align:center">Toca un sector.</p></div>
  <div style="display:grid;gap:12px"><div class="detail" style="border-left:6px solid ${n[1]}"><span class="eyebrow">${s+1} de ${N2NAT.length}</span><h3>${n[0]}</h3><p>${n[2]}</p></div>
  <div class="dk-call"><b>Pregunta al péndulo:</b> ¿Cuál es la naturaleza del bloqueo presente en este espacio?</div></div></div>`};

RICH.n2ubic=()=>{const s=st('n2ubi',1);const n=N2UBI[s];
 return dkH('Módulo 4','Ubicación física del bloqueo','Anillo medio del gráfico: indica en qué zona del espacio se encuentra la alteración.')+
 `<div class="dk-grid c2" style="align-items:start"><div>${n2semi({key:'n2ubi',items:N2UBII(),sel:s,wrap:12,fs:11,label:'Ubicación física: 12 zonas'})}<p class="dk-note" style="text-align:center">Toca un sector.</p></div>
  <div style="display:grid;gap:12px"><div class="detail" style="border-left:6px solid ${n[1]}"><span class="eyebrow">${s+1} de ${N2UBI.length}</span><h3>${n[0]}</h3><p>Zona del espacio donde el péndulo señala el bloqueo. Anótala en la ficha junto con su naturaleza y su intensidad.</p></div>
  <div class="dk-call"><b>Pregunta al péndulo:</b> ¿En qué zona física del espacio se concentra el bloqueo?</div></div></div>`};

RICH.n2intens=()=>{const s=st('n2int',0);const n=N2INT[s];
 return dkH('Módulo 4','Nivel de intensidad','Tercer anillo del gráfico: muestra el nivel de intensidad del bloqueo en la zona evaluada. Define la profundidad de la limpieza y las etiquetas del Péndulo Hebreo más adecuadas.')+
 `<div class="dk-grid c2" style="align-items:start"><div>${n2semi({key:'n2int',items:N2INTI(),sel:s,wrap:11,fs:13,label:'Nivel de intensidad: 6 niveles'})}<p class="dk-note" style="text-align:center">Toca un sector.</p></div>
  <div style="display:grid;gap:12px"><div class="detail" style="border-left:6px solid ${n[1]}"><span class="eyebrow">Nivel ${s+1} de 6</span><h3>${n[0]}</h3><p>${n[2]}</p></div>
  <div class="dk-call"><b>Pregunta al péndulo:</b> ¿Cuál es el nivel de intensidad que presenta esta alteración?</div></div></div>`};

const N2ORIC=['#e8a6a2','#f1b4ae','#f6c4ba','#fad8bd','#fde6c6'];
RICH.n2origen=()=>{const s=st('n2ori',0),p=st('n2oi',0);const o=N2ORI[s];const it=N2ORI.map((x,i)=>({l:x[0],c:N2ORIC[i]}));
 return dkH('Módulo 4','Origen energético específico','De maldiciones a desencarnados. Cada categoría se consulta con una intensidad del 10 % al 50 %.')+
 `<div class="dk-grid c2" style="align-items:start"><div>${n2semi({key:'n2ori',items:it,sel:s,wrap:11,fs:12,label:'Origen energético específico: 5 categorías'})}
   <div class="dk-sub" style="margin:14px 0 8px;text-align:center">Intensidad</div>${chipRow('n2oi',['10 %','20 %','30 %','40 %','50 %'],p).replace('class="dk-chips"','class="dk-chips" style="justify-content:center"')}</div>
  <div style="display:grid;gap:12px"><div class="detail" style="border-left:6px solid ${N2ORIC[s]}"><span class="eyebrow">${s+1} de 5 · lectura: ${o[0]} al ${(p+1)*10} %</span><h3>${o[0]}</h3><p>${o[1]}</p><p><b>Ejemplo:</b> ${o[2]}</p></div></div></div>
  <div><div class="dk-sub">Paso a paso para identificar el origen del bloqueo</div><div class="route">${N2PASO.map((x,i)=>`<div class="rt" style="cursor:default"><b>${i+1}</b><span><b style="all:unset;font-weight:700">${x[0]}.</b> ${x[1]}</span></div>`).join('')}</div></div>`};

const N2OD=[[
 ['Cementerio o campo de batalla','Energías de muerte, dolor o eventos traumáticos ocurridos en el lugar. Puede haber memoria energética de personas fallecidas, guerra, violencia o sufrimiento.','Terrenos con historia de conflictos, hospitales antiguos, zonas de guerra o sitios de gran carga de muerte.'],
 ['Lugar de culto negativo','Energías provenientes de prácticas religiosas o rituales oscuros realizados en el lugar. Puede haber implantes, símbolos o dedicaciones a entidades no benéficas.','Altares, templos o lugares donde se realizaron ritos con intención de daño.'],
 ['Pensamientos negativos','Energía mental densa y repetitiva de los habitantes o de personas que han estado en el lugar. Genera un campo cargado que afecta el ambiente y la armonía.','Preocupaciones constantes, miedos, discusiones, odio o pensamientos de baja vibración.'],
 ['Objeto negativo','Objetos que almacenan energía densa por su origen, uso o por haber pertenecido a personas con carga negativa. Pueden estar impregnados con intenciones de daño.','Ropa, muebles, cuadros, joyas u objetos heredados o encontrados.'],
 ['Magia','Trabajos mágicos o esotéricos realizados con intención de manipular, bloquear o dañar el lugar y sus habitantes. Puede estar activa o residual.','Rituales de magia negra, simbolismos, sellos o ingredientes esotéricos enterrados o escondidos.'],
 ['Objeto hechizado','Objetos intencionados energéticamente para generar bloqueo, malestar o daño. Pueden ser entregados, dejados o escondidos en el lugar.','Muñecos, paquetes, amarres, prendas, tierra, fotografías o elementos con intención negativa.'],
 ['Portales abiertos','Aperturas energéticas que permiten la entrada de energías no deseadas, entidades o influencias de otros planos. Pueden estar activas por ciertos eventos o ubicaciones.','Portales dimensionales, energéticos o astrales, aberturas en muros, espejos, puertas o lugares de transición.'],
 ['Envidias','Energías de envidia, celos o malas intenciones provenientes de personas del entorno o externas. Generan bloqueo, malestar y estancamiento en el espacio.','Miradas con carga, comentarios negativos, celos, competencia o deseos de que el otro fracase.']],[
 ['Almas perdidas','Almas que no han trascendido y permanecen en el plano físico o emocional. Suelen estar atadas a un lugar por apego, confusión o eventos traumáticos.','Sensación de presencia, frío repentino, ruidos sin explicación.'],
 ['Entidades malvadas','Entidades de baja vibración que se alimentan de la energía del lugar y de sus habitantes. Pueden generar miedo, malestar, conflictos o sensación de opresión.','Pesadez en el ambiente, cansancio constante, conflictos sin causa aparente.'],
 ['Fantasmas','Manifestaciones energéticas de personas fallecidas que repiten patrones o quedan apegadas a un lugar. Pueden ser conscientes o inconscientes.','Voces, sombras, objetos que se mueven, sensación de ser observado.'],
 ['Energías densas','Acumulación de energía estancada proveniente de conflictos, emociones intensas, enfermedades o situaciones difíciles. Genera un ambiente pesado y sin vitalidad.','Sensación de pesadez, cansancio, falta de armonía, dificultad para concentrarse.'],
 ['Demonios','Entidades de muy baja vibración que pueden manifestarse en lugares con alta carga negativa. Generan miedo, caos, enfermedad y bloqueo energético.','Ambiente hostil, miedo intenso, sensación de presencia oscura.'],
 ['Mal de ojo','Energía negativa enviada intencionalmente o de forma inconsciente por envidia, celos o deseos negativos. Puede afectar a las personas y también al hogar.','Problemas repetitivos, cansancio, discusiones sin motivo, estancamiento.'],
 ['Salación a la propiedad','Trabajo energético realizado para bloquear, limitar o dañar la propiedad. Impide la armonía, el bienestar y puede atraer pérdidas o dificultades económicas.','Falta de prosperidad, problemas legales, dificultades para vender o habitar el lugar.'],
 ['Duendes','Energías o seres del plano sutil que pueden estar en el lugar. Pueden ser traviesos o protectores, dependiendo de la intención y el trato que reciban.','Objetos que se pierden, ruidos, travesuras, o sensación de presencia en ciertos espacios.'],
 ['No hay nada','Indica que no se detecta ningún origen energético negativo en el lugar. El espacio se encuentra en equilibrio y armonía.','El lugar está limpio, protegido y con energía armoniosa.']]];
const N2ODC=[['#f0b4b4','#f5c2c0','#f9d3c0','#fbe3c6','#fdf0cf','#e4f0cf','#cfe8c3','#bfe0b8'],['#f0b4b4','#f5c2c0','#f9d3c0','#fbe3c6','#fdf0cf','#eef3cf','#dcedc8','#c9e3bb','#b9d9b0']];
RICH.n2odet=()=>{const g=st('n2odp',0);const L=N2OD[g];const s=Math.min(st('n2od'+g,0),L.length-1);const o=L[s];
 return dkH('Módulo 4','Origen específico · detalle de cada categoría','Qué significa cada sector, con un ejemplo de cómo se manifiesta.')+
 chipRow('n2odp',['Parte I · 8 categorías','Parte II · 9 categorías'],g)+
 `<div class="dk-grid c2" style="align-items:start"><div>${n2semi({key:'n2od'+g,items:L.map((x,i)=>({l:x[0],c:N2ODC[g][i]})),sel:s,wrap:12,fs:12,label:'Origen específico, parte '+(g+1)})}<p class="dk-note" style="text-align:center">Toca un sector.</p></div>
  <div class="detail" style="border-left:6px solid ${N2ODC[g][s]}"><span class="eyebrow">${s+1} de ${L.length}</span><h3>${o[0]}</h3><p>${o[1]}</p><p><b>Ejemplo:</b> ${o[2]}</p></div></div>`};

/* Módulo 5 · gráfico de porcentajes, −100 % a +100 % */
const n2pcCol=v=>v<0?['#f3b9ae','#f6c8bd','#f8d5cb','#fae2d9','#fbeee6'][Math.min(4,Math.floor((100+v)/20.1))]:v===0?'#e8d600':['#eaf3d6','#d9ebc3','#c6e0b0','#b1d49a','#9cc884','#88bc72'][Math.min(5,Math.floor(v/16.7))];
const n2pcT=v=>(v>0?'+':v<0?'−':'')+Math.abs(v)+' %';
function n2pcOut(){const v=st('n2pc',0),i=(v+100)/5;const items=[...Array(41).keys()].map(k=>({l:n2pcT(-100+5*k),c:n2pcCol(-100+5*k)}));
 const svg=n2svg('0 0 400 214',n2ring({key:'n2pc',items,sel:i,cx:200,cy:204,r0:78,r1:190,a0:Math.PI,span:Math.PI,fs:10.5,mode:'rad',wrap:9,only:k=>(-100+5*k)%20===0,act:(k)=>rxa('n2pcs',-100+5*k)})+
  `<path d="M128 204A72 72 0 0 1 272 204Z" fill="var(--surface-2)"/>`+n2tx(200,170,[n2pcT(v)],30,'var(--fg)',700),'Gráfico de porcentajes de −100 % a +100 %');
 const msg=v===0?'Punto neutro: sin inclinación hacia ningún extremo.':v<0?'Hacia el lado negativo del gráfico: se acerca al extremo desfavorable.':'Hacia el lado positivo del gráfico: se acerca al extremo favorable.';
 return svg+`<div class="dk-call"><b>Lectura.</b> ${msg}</div>`}
function n2pcUpd(){const o=document.getElementById('n2pc-out');if(o)o.innerHTML=n2pcOut()}
RICH.n2pct=()=>{const v=st('n2pc',0);
 return dkH('Módulo 5','Gráfico de porcentajes','Escala de −100 % a +100 %, de 5 en 5. El 0 % marca el punto neutro. Mueve el control o toca un sector.')+
 `<div class="dk-call"><b>Cómo se usa.</b> Formula una pregunta clara al péndulo, obsérvalo sobre el gráfico y lee el porcentaje que indica. Regístralo con la pregunta que hiciste.</div>
  <label class="dk-note" for="n2pcr">Valor indicado por el péndulo</label><input type="range" class="n2-range" id="n2pcr" data-n2pc min="-100" max="100" step="5" value="${v}">
  <div id="n2pc-out" style="display:grid;gap:12px">${n2pcOut()}</div>
  ${chipRow('n2pcq',['−100 %','−50 %','0 %','+50 %','+100 %'],-1).replace(/data-rx="set\|n2pcq\|(\d)"/g,(m,d)=>`data-rx="n2pcs|${[-100,-50,0,50,100][+d]}"`)}`};
/* Módulo 5 · práctica sobre el plano */
const N2Z=['Garaje','Sala','Comedor','Cocina','Dormitorio'];const N2ZI=[4200,6800,9500,11000,7800];
const N2ZR=[[20,20,150,320],[170,170,280,170],[310,20,130,150],[440,20,180,150],[450,170,170,170]];
function n2zFig(){const v=st('n2z',N2ZI.slice()),sel=st('n2zs',0);
 const room=i=>{const r=N2ZR[i],b=bvl(v[i]),on=i===sel;
  return `<g ${rxa('set','n2zs',i)} role="button" tabindex="0" aria-label="${N2Z[i]}: ${n2f(v[i])}, nivel ${b[2]}" aria-pressed="${on}"><rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="${b[4]}" fill-opacity=".62" stroke="${on?'var(--brass)':'var(--fg)'}" stroke-width="${on?6:3}"/>${n2tx(r[0]+r[2]/2,r[1]+r[3]/2-9,[N2Z[i]],15,'var(--fg)',700)}${n2tx(r[0]+r[2]/2,r[1]+r[3]/2+12,[n2f(v[i])],13,'var(--fg)',600)}</g>`};
 const stairs=[...Array(9)].map((_,k)=>`<line x1="${178+k*14}" y1="28" x2="${178+k*14}" y2="162" stroke="var(--muted)" stroke-width="1.2"/>`).join('');
 const door=`<path d="M170 300A34 34 0 0 1 204 334" fill="none" stroke="var(--muted)" stroke-width="1.4"/><path d="M330 340A30 30 0 0 1 360 310" fill="none" stroke="var(--muted)" stroke-width="1.4"/>`;
 return n2svg('0 0 640 360',`<rect x="10" y="10" width="620" height="340" fill="var(--surface)" stroke="var(--fg)" stroke-width="5"/><rect x="170" y="20" width="140" height="150" fill="var(--surface-2)" stroke="var(--fg)" stroke-width="3"/>${stairs}${[0,2,3,4,1].map(room).join('')}${door}`,'Plano de práctica con garaje, sala, comedor, cocina y dormitorio')}
function n2zOut(){const v=st('n2z',N2ZI.slice());let min=0;v.forEach((x,i)=>{if(x<v[min])min=i});
 return `<div class="tbl-wrap"><table class="tbl" style="min-width:420px"><thead><tr><th>Zona</th><th>Medición</th><th>Nivel</th><th>Significado</th></tr></thead><tbody>${N2Z.map((z,i)=>{const r=bvl(v[i]);return `<tr><td>${z}</td><td>${n2f(v[i])}</td><td><span class="n2-lv"><i class="n2-sw" style="background:${r[4]}"></i>${r[2]}</span></td><td style="white-space:normal">${r[3]}</td></tr>`}).join('')}</tbody></table></div>
  <div class="dk-call"><b>Zona con la medición más baja: ${N2Z[min]}.</b> Después de limpiar, vuelve a medir y compara con la medición inicial.</div>`}
function n2zUpd(){const f=document.getElementById('n2z-fig'),o=document.getElementById('n2z-out');if(f)f.innerHTML=n2zFig();if(o)o.innerHTML=n2zOut();const s=st('n2zs',0);document.querySelectorAll('[data-n2zv]').forEach(e=>{e.textContent=n2f(st('n2z',N2ZI.slice())[s])})}
RICH.n2plan=()=>{const v=st('n2z',N2ZI.slice()),s=Math.min(st('n2zs',0),4);
 return dkH('Módulo 5','Mide cada zona del plano','Práctica con valores de ejemplo: toca una zona y ajusta su medición como si el péndulo hubiera indicado ese valor. El color cambia según el nivel de Bovis.')+
 `<div id="n2z-fig">${n2zFig()}</div>${chipRow('n2zs',N2Z,s)}
  <div><label class="dk-note" for="n2zr"><b>${N2Z[s]}:</b> <span data-n2zv>${n2f(v[s])}</span> unidades Bovis</label><input type="range" class="n2-range" id="n2zr" data-n2z="${s}" min="0" max="20000" step="100" value="${v[s]}"></div>
  <div id="n2z-out" style="display:grid;gap:14px">${n2zOut()}</div>`};

const N2FURN=[['Regalar','corazon','El péndulo indica que el mueble está en buen estado y su energía puede ser útil para otra persona. Es recomendable regalarlo, para que su energía siga circulando.'],['Limpiar','limpia','El péndulo indica que el mueble puede mantenerse, pero requiere una limpieza energética. Realiza una limpieza con péndulo hebreo, sahumo u otros elementos, y también una limpieza física.'],['Cambiar','enlace','El péndulo indica que el mueble aún puede ser útil, pero su ubicación actual no es la más adecuada. Es recomendable cambiarlo de lugar para que la energía fluya mejor en el espacio.'],['Botar','escudo','El péndulo indica que el mueble está dañado, roto o su energía es muy negativa. Es recomendable desecharlo, para evitar que siga generando desequilibrios.']];
RICH.n2furn=()=>{const s=st('n2fu',0);const f=st('n2f',{i:0,a:null});const sc=[3,2,1,0];/* indice de la acción correcta por caso */
 const cases=['El mueble está dañado, roto o su energía es muy negativa.','El mueble aún es útil, pero su ubicación actual no es la adecuada.','El mueble puede mantenerse, pero requiere una limpieza energética.','El mueble está en buen estado y su energía puede servir a otra persona.'];
 const ans=f.a;const right=sc[f.i];
 return dkH('Módulo 5','¿Qué hacer con este mueble?','Al preguntar al péndulo qué acción es la más adecuada, la respuesta puede ser regalar, limpiar, cambiar o botar.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${N2FURN.map((x,i)=>`<button class="sel" ${rxa('set','n2fu',i)} ${pressed(i===s)}>${ic(x[1],24)}<b>${x[0]}</b></button>`).join('')}</div>
  <div class="detail"><h3>${N2FURN[s][0]}</h3><p>${N2FURN[s][2]}</p></div></div>
  <div><div class="dk-sub">Ponte a prueba · caso ${f.i+1} de 4</div><div class="dk-call"><b>${cases[f.i]}</b> ¿Qué acción corresponde?</div>
  <div class="dk-grid c4" style="margin-top:10px">${N2FURN.map((x,i)=>`<button class="qopt ${ans!==null?(i===right?'right':i===ans?'wrong':''):''}" ${rxa('n2fa',i)} ${ans!==null?'disabled':''}><span class="l">${i+1}</span><span>${x[0]}</span></button>`).join('')}</div>
  ${ans!==null?`<div class="dk-cta" style="margin-top:10px"><span class="dk-note" style="align-self:center">${ans===right?'¡Correcto!':'La respuesta correcta era “'+N2FURN[right][0]+'”.'}</span><button class="btn btn-primary btn-sm" ${rxa('n2fn',0)}>${f.i===3?'Volver a empezar':'Siguiente caso'}</button></div>`:''}</div>`};

const N2OG=[['¿Qué es el ORGÓN?','El ORGÓN es un armonizador energético que combina materiales orgánicos, minerales y metales. Su función es neutralizar y transformar energías densas, contribuyendo a un ambiente más equilibrado y armonioso.'],['¿Qué es el SCAP?','El SCAP (Scalar Protection) es un dispositivo de armonización que trabaja con tecnologías de frecuencias sutiles, ayudando a equilibrar el entorno frente a diversas radiaciones de origen tecnológico.'],['¿Cuándo utilizarlos?','Se recomienda incorporar ORGÓN / SCAP como apoyo en espacios donde se identifique una mayor exposición a:'],['Su función','Ayudan a neutralizar la influencia de radiaciones de origen tecnológico, contribuyen a mantener un ambiente más equilibrado y armónico y apoyan el bienestar de las personas y de los espacios.']];
const N2OGC=['Antenas de radio, televisión o internet','Antenas telefónicas','Instalaciones eléctricas','Transformadores eléctricos','Aparatos electrónicos (microondas, computadores, televisores, etc.)','Campo de alta tensión','Otras fuentes de radiaciones tecnológicas'];
RICH.n2orgon=()=>{const s=st('n2og',0);
 return dkH('Módulo 5','ORGÓN / SCAP','Apoyo en la armonización de espacios. Son herramientas complementarias, especialmente cuando existe exposición a radiaciones de origen tecnológico.')+
 chipRow('n2og',N2OG.map(x=>x[0]),s)+
 `<div class="detail"><h3>${N2OG[s][0]}</h3><p>${N2OG[s][1]}</p>${s===2?`<div class="dk-chips">${N2OGC.map(x=>`<span class="tg">${x}</span>`).join('')}</div>`:''}</div>
  <p class="dk-note" style="font-style:italic">Una herramienta complementaria para espacios más armoniosos.</p>`};

const N2PTY=['Seres de Luz','Ángeles guardianes','Guías espirituales anclados','Rituales o amuletos activos','Protección kármica o ancestral','Geometría sagrada en el espacio','Activación por intención energética','Códigos o símbolos de alta vibración','No hay protección presente','Otra sin especificar'];
const N2PLV=[['0 %','Campo desprotegido','#f4c690'],['10 % a 30 %','Sello débil','#b9e07a'],['40 % a 60 %','Sello activo intermitente','#7fcf5a'],['70 % a 90 %','Protección activa fuerte','#3f9e55'],['100 %','Campo protegido','#1c6b2f']];
RICH.n2prot2=()=>{const s=st('n2pl',0);const l=N2PLV[s];
 return dkH('Módulo 5','Tipos de protección energética activa','Herramientas para resguardar y mantener la armonía del espacio. Este gráfico evalúa si hay protección, de qué tipo y con qué nivel de eficacia.')+
 `<div class="dk-grid c2" style="align-items:start"><div><div class="dk-sub">Escala interna · nivel de protección</div><div class="sel-list">${N2PLV.map((x,i)=>`<button class="sel" ${rxa('set','n2pl',i)} ${pressed(i===s)}><i class="dot" style="background:${x[2]}"></i><span><b>${x[1]}</b><small>${x[0]}</small></span></button>`).join('')}</div></div>
  <div><div class="dk-sub">Escala externa · tipo de protección</div><div class="dk-chips">${N2PTY.map((x,i)=>`<span class="tg"><b style="color:var(--brass)">${i+1}</b>${x}</span>`).join('')}</div></div></div>
  <div class="detail" style="border-left:6px solid ${l[2]}"><span class="eyebrow">${l[0]}</span><h3>${l[1]}</h3>${s<2?`<p>Si el espacio no cuenta con protección o esta es débil, se recomienda realizar una limpieza, armonización y luego activar una protección adecuada, según las necesidades del lugar.</p>`:''}</div>
  <div class="dk-call"><b>Cómo se utiliza.</b> 1) Conecta con el espacio y formula la pregunta. 2) Consulta el nivel de protección (escala interna). 3) Luego identifica el tipo de protección (escala externa). 4) Si no hay protección o aparece “otra”, puedes profundizar con nuevas preguntas.</div>`};

/* Módulo 6 · cierre */
RICH.n2close=()=>dkH('Módulo 6','Oración de cierre','Agradecer · Sellar · Armonizar')+
 `<div class="detail" style="gap:14px;text-align:center">${['Gracias, gracias, gracias.','A la Fuente de Luz, al universo y a todos los seres de amor que me han acompañado en este proceso. Agradezco la guía, la protección y el apoyo en esta limpieza y armonización.','Que este espacio quede libre de toda energía densa, que solo habite aquí la luz, la armonía, la paz y el bienestar. Que así sea, para el más alto bien de todos los que habitan, visitan o se conectan con este lugar.','Así es. Gracias, gracias, gracias.'].map(x=>`<p style="font-family:var(--f-display);font-size:1.12rem;font-style:italic">${x}</p>`).join('')}</div>`;

const N2HEB=[[['שחרור','Liberación'],['שינוי','Transformación'],['איזון','Equilibrio'],['הרמוניה','Armonía'],['הגנה','Protección'],['איתום','Sellado'],['אור','Luz'],['שלום','Paz'],['התחדשות','Renovación']],
 [['אנרגיה שיורית','Energía residual'],['זיכרון','Memoria energética'],['שחרור רגשי','Liberación emocional'],['הפרעה','Interferencia'],['קרינה טכנית','Radiación técnica'],['קרינה מהאדמה','Radiación terrestre'],['אנרגיה תקועה','Energía estancada'],['סגירת פורטל','Cierre de portal']],
 [['ניקוי','Limpieza'],['חיטוי וטיהור','Desinfectar y purificar'],['טיהור','Purificación'],['שחרור','Liberación'],['ניקוי עמוק','Limpieza profunda'],['התחדשות','Renovación'],['סילוק','Eliminación / retiro'],['הוצאת אנרגיה שיורית','Eliminar energía residual'],['ניקוי שגיאות','Depuración'],['ניקוי חסימות','Limpieza de bloqueos']]];
RICH.n2heb=()=>{const g=st('n2hs',0);const o=st('n2hf'+g,{});
 return dkH('Módulo 6','Etiquetas hebreas del Nivel 2','Elige una hoja, adivina el significado y dale la vuelta.')+
 chipRow('n2hs',['Finalización','Situaciones específicas','Limpieza energética'],g)+
 `<div class="dk-grid c4">${N2HEB[g].map((x,i)=>`<button class="flip heb ${o[i]?'on':''}" ${rxa('flip','n2hf'+g,i)} ${pressed(o[i])} style="height:170px"><span><span class="f"><span class="h" lang="he" ${x[0].length>11?'style="font-size:1.5rem"':x[0].length>6?'style="font-size:1.9rem"':''}>${x[0]}</span><em>Toca para ver</em></span><span class="b"><b style="font-size:${x[1].length>12?'1rem':x[1].length>9?'1.15rem':'1.35rem'};overflow-wrap:anywhere">${x[1]}</b></span></span></button>`).join('')}</div>
  <p class="dk-note">Las tres hojas están en el PDF de etiquetas, para imprimir y recortar (pestaña Materiales).</p>`};

/* ---------- Ficha de registro interactiva ---------- */
const FI=()=>st('n2fid',{});
const N2FZ=['Entrada','Living / comedor','Cocina','Dormitorio 1','Dormitorio 2','Baño(s)','Patio / jardín','Oficina / estudio','Otros'];
const N2FD=['Energía densa','Bloqueos energéticos','Presencias','Energía estancada','Conflictos emocionales','Estrés / tensión','Huellas de discusiones','Otras'];
const N2FS=['Pesada','Fría','Tensa','Neutra','Liviana','Cálida','Armónica'];
const N2FT=['Casa','Departamento','Oficina','Local','Otro'];
const N2FM=['Presencial','Plano a distancia'];
const N2FE=(()=>{const seen={},L=[];N2HEB.forEach(g=>g.forEach(x=>{if(!seen[x[1]]){seen[x[1]]=1;L.push(x)}}));return L})();
const fiHas=k=>{const v=FI()[k];return v!==undefined&&String(v).trim()!==''};
const fiBovOk=k=>fiHas(k)&&!isNaN(+FI()[k]);
const n2fiLv=k=>fiBovOk(k)?bvl(+FI()[k])[2]:'Sin medir';
function n2fiScore(){const f=FI();
 return [['Nombre del espacio',fiHas('nom')],['Tipo de espacio',f.tipo!==undefined],['Fecha',fiHas('fecha')],['Medición inicial (Bovis)',fiBovOk('bi')],['Al menos una zona evaluada',N2FZ.some((_,i)=>fiBovOk('zb'+i))],['Desequilibrios detectados',(f.des||[]).length>0],['Etiquetas utilizadas',(f.eti||[]).length>0],['Trabajo realizado',fiHas('trab')],['Medición final (Bovis)',fiBovOk('bf')],['Observaciones y recomendaciones',fiHas('obs')]].map(x=>({l:x[0],ok:x[1]}))}
const n2fiPct=()=>{const s=n2fiScore();return Math.round(s.filter(x=>x.ok).length/s.length*100)};
const n2fiBar=()=>`<div class="prog"><span>Ficha completa al <b class="n2fi-pct">${n2fiPct()}</b> %</span><div class="bar"><i class="n2fi-fill" style="width:${n2fiPct()}%"></i></div></div>`;
const fiHead=(n,t,l)=>dkH('Ficha de registro · '+(String(n).includes('y')?'Secciones ':'Sección ')+n,t,l)+n2fiBar();
const fiVal=k=>esc(FI()[k]===undefined?'':FI()[k]);
const fiIn=(k,label,type='text',ph='')=>`<label class="n2-f"><span>${label}</span><input type="${type}" data-n2i="${k}" value="${fiVal(k)}" placeholder="${ph}"></label>`;
const fiTa=(k,label,ph)=>`<label class="n2-f"><span>${label}</span><textarea rows="4" data-n2i="${k}" placeholder="${ph||''}">${fiVal(k)}</textarea></label>`;
const fiSel=(k,label,items)=>`<div class="n2-f"><span>${label}</span><div class="dk-chips" role="group" aria-label="${label}">${items.map((x,i)=>`<button class="chip" ${rxa('n2fs',k,i)} ${pressed(FI()[k]===i)}>${x}</button>`).join('')}</div></div>`;
const fiMulti=(k,label,items)=>`<div class="n2-f"><span>${label}</span><div class="dk-chips" role="group" aria-label="${label}">${items.map((x,i)=>`<button class="chip" ${rxa('n2ft',k,i)} ${pressed((FI()[k]||[]).includes(i))}>${x}</button>`).join('')}</div></div>`;
const fiBov=(k,label)=>`<div class="n2-f"><span>${label}</span><div class="n2-bov"><input type="number" inputmode="numeric" min="0" max="20000" step="100" data-n2i="${k}" value="${fiVal(k)}" placeholder="0 a 20.000" aria-label="${label}"><span class="pill prog" data-n2lv="${k}">${n2fiLv(k)}</span></div></div>`;
function n2fiVar(){const a=fiBovOk('bi'),b=fiBovOk('bf');if(!a||!b)return 'Anota la medición inicial y la final para ver cuánto cambió el espacio.';
 const d=+FI().bf-+FI().bi;return d>0?`Tu espacio subió ${n2f(d)} unidades: de ${bvl(+FI().bi)[2]} a ${bvl(+FI().bf)[2]}.`:d===0?'La medición final es igual a la inicial. Revisa si falta trabajo o una nueva comprobación.':`La medición final es ${n2f(-d)} unidades menor que la inicial. Revisa el trabajo, repite la limpieza y vuelve a medir.`}
const fiNote=t=>`<div class="dk-call"><b>Recuerda.</b> ${t}</div>`;

RICH.n2fi1=()=>fiHead(1,'Datos generales','Qué espacio es, cuándo lo trabajas y quién realiza la limpieza.')+
 `<div class="n2-grid">${fiIn('nom','Nombre del espacio','text','Ej.: Casa de Ana')}${fiIn('dir','Dirección','text')}${fiIn('fecha','Fecha','date')}${fiIn('ter','Alumna o terapeuta','text')}</div>
  ${fiSel('tipo','Tipo de espacio',N2FT)}${fiSel('mod','Modalidad',N2FM)}`;
RICH.n2fi2=()=>fiHead(2,'Medición inicial del estado energético','Antes de intervenir, mide el nivel general del espacio con el gráfico de Bovis.')+
 `${fiBov('bi','Nivel energético general (Bovis)')}${fiMulti('si','Sensación del espacio al entrar',N2FS)}
  ${fiNote('Mide en el centro del espacio y escribe el valor tal como lo indica el péndulo (de 0 a 20.000).')}`;
RICH.n2fi3=()=>fiHead('3 y 4','Plano y zonas evaluadas','Dibuja el plano o usa uno impreso y marca las zonas que intervienes. Para cada zona anota el nivel de Bovis y tus observaciones.')+
 `<div class="n2-zones">${N2FZ.map((z,i)=>`<div class="n2-zr"><b>${z}</b><input type="number" inputmode="numeric" min="0" max="20000" step="100" data-n2i="zb${i}" value="${fiVal('zb'+i)}" placeholder="Bovis" aria-label="Nivel Bovis de ${z}"><input type="text" data-n2i="zo${i}" value="${fiVal('zo'+i)}" placeholder="Observaciones" aria-label="Observaciones de ${z}"><button class="chip" ${rxa('n2ft','zi',i)} ${pressed((FI().zi||[]).includes(i))}>Intervenida</button></div>`).join('')}</div>`;
RICH.n2fi4=()=>fiHead(5,'Desequilibrios o alteraciones detectadas','Marca lo que encontraste con los gráficos de radiaciones y de bloqueo.')+
 `${fiMulti('des','Detectado en el espacio',N2FD)}${(FI().des||[]).includes(7)?fiIn('deso','Otras: ¿cuáles?','text'):''}`;
RICH.n2fi5=()=>fiHead('6 y 7','Etiquetas utilizadas y trabajo realizado','Marca las etiquetas hebreas que aplicaste y cuenta qué hiciste.')+
 `<div class="n2-f"><span>Etiquetas utilizadas</span><div class="dk-chips" role="group" aria-label="Etiquetas utilizadas">${N2FE.map((x,i)=>`<button class="chip" ${rxa('n2ft','eti',i)} ${pressed((FI().eti||[]).includes(i))}><span lang="he">${x[0]}</span>&nbsp;${x[1]}</button>`).join('')}</div></div>
  ${fiTa('trab','Trabajo realizado','Describe el trabajo que hiciste en el espacio.')}`;
RICH.n2fi6=()=>fiHead('8 y 9','Medición final, observaciones y recomendaciones','Cierra la ficha: vuelve a medir y deja tus observaciones para quienes habitan el espacio.')+
 `${fiBov('bf','Nivel energético general final (Bovis)')}${fiMulti('sf','Sensación del espacio al terminar',N2FS)}
  <div class="dk-call warn n2-var"><b>Resultado.</b> <span data-n2var>${n2fiVar()}</span></div>
  ${fiTa('obs','Observaciones y recomendaciones','Observaciones finales y recomendaciones para quienes habitan el espacio.')}`;
RICH.n2fi7=()=>{const f=FI();const v=k=>fiHas(k)?esc(f[k]):'<em class="n2-empty">—</em>';
 const wr=h=>`<span class="dk-chips">${h}</span>`;const tg=(k,items)=>(f[k]||[]).length?wr((f[k]||[]).slice().sort((a,b)=>a-b).map(i=>`<span class="tg">${items[i]}</span>`).join('')):'<em class="n2-empty">—</em>';
 const eti=(f.eti||[]).length?wr((f.eti||[]).slice().sort((a,b)=>a-b).map(i=>`<span class="tg"><span lang="he">${N2FE[i][0]}</span> ${N2FE[i][1]}</span>`).join('')):'<em class="n2-empty">—</em>';
 const bv=k=>fiBovOk(k)?`<b>${n2f(+f[k])}</b> · ${bvl(+f[k])[2]}`:'<em class="n2-empty">—</em>';
 const rows=N2FZ.map((z,i)=>({z,b:fiBovOk('zb'+i)?n2f(+f['zb'+i]):'',o:fiHas('zo'+i)?esc(f['zo'+i]):'',x:(f.zi||[]).includes(i)})).filter(r=>r.b||r.o||r.x);
 return dkH('Ficha de registro','Tu ficha completa','Así queda tu hoja. Revísala antes de enviarla en la práctica final.')+n2fiBar()+
 `<div class="n2-sheet"><header><svg class="mo" aria-hidden="true"><use href="#mark"/></svg><div><b>Casa Muladhara</b><small>Sanación &amp; Bienestar · Escuela de Formación Holística</small></div></header>
  <h3>Ficha de registro</h3><p class="dk-note">Limpieza y armonización de espacios con Péndulo Hebreo · Nivel 2</p>
  <dl class="n2-dl"><dt>1. Espacio</dt><dd>${v('nom')} · ${f.tipo!==undefined?N2FT[f.tipo]:'—'} · ${f.mod!==undefined?N2FM[f.mod]:'—'}</dd><dt>Dirección y fecha</dt><dd>${v('dir')} · ${v('fecha')}</dd><dt>Terapeuta</dt><dd>${v('ter')}</dd>
  <dt>2. Medición inicial</dt><dd>${bv('bi')}<br>${tg('si',N2FS)}</dd>
  <dt>3 y 4. Zonas evaluadas</dt><dd>${rows.length?`<table class="tbl" style="min-width:0"><thead><tr><th>Zona</th><th style="white-space:nowrap">Bovis</th><th>Observaciones</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.z}${r.x?' ✓':''}</td><td style="white-space:nowrap">${r.b||'—'}</td><td style="white-space:normal">${r.o||'—'}</td></tr>`).join('')}</tbody></table><small class="dk-note">✓ zona intervenida</small>`:'<em class="n2-empty">—</em>'}</dd>
  <dt>5. Desequilibrios</dt><dd>${tg('des',N2FD)}${fiHas('deso')?' '+esc(f.deso):''}</dd>
  <dt>6. Etiquetas</dt><dd>${eti}</dd><dt>7. Trabajo realizado</dt><dd>${v('trab')}</dd>
  <dt>8. Medición final</dt><dd>${bv('bf')}<br>${tg('sf',N2FS)}<br><small>${n2fiVar()}</small></dd>
  <dt>9. Observaciones y recomendaciones</dt><dd>${v('obs')}</dd></dl></div>
  <div class="dk-cta"><button class="btn btn-ghost btn-sm" ${rxa('n2fclr',0)}>Vaciar la ficha</button></div>
  <p class="dk-note">Tus datos se guardan mientras navegas por la plataforma en esta sesión. La hoja en blanco para imprimir está en la pestaña Materiales.</p>`};
const N2FDEMO={nom:'Casa de Ana',dir:'Los Aromos 123',fecha:'2026-10-10',ter:'Alumna Nivel 2',tipo:0,mod:0,bi:'5800',si:[0,1,2],zb0:'7200',zo0:'Entrada oscura, objetos acumulados',zi:[0,2,3],zb1:'5400',zo1:'Sensación de pesadez en el sofá',zb2:'6100',zo2:'Energía estancada junto a la cocina',zb3:'4300',zo3:'Sueño inquieto',des:[0,3,5],eti:[0,2,8,9],trab:'Medí con Bovis, hice la oración de apertura, apliqué las etiquetas de liberación y limpieza profunda en las zonas bajas y sellé el espacio.',bf:'12400',sf:[4,5,6],obs:'Ventilar cada mañana y despejar la entrada. Repetir la medición en 21 días.'};

/* ---------- Práctica final y entrega de insignia ---------- */
const N2PFREQ=[['Una ficha de registro completa','Con los datos del espacio, las zonas evaluadas y las observaciones.'],['Medición inicial y final con Bovis','Para comprobar el cambio de frecuencia del espacio.'],['Desequilibrios y etiquetas','Qué detectaste con los gráficos y qué etiquetas hebreas aplicaste.'],['Trabajo realizado','Cómo aplicaste el protocolo Casa Muladhara® de 7 pasos.'],['Observaciones y recomendaciones','Lo que sugieres a quienes habitan el espacio.']];
const N2PFRT=[['Elige un espacio','Puede ser tu casa, la de un familiar o la de una persona que te dé su permiso.','casa'],['Prepárate y protégete','Preparación de la terapeuta, protección y oración de apertura.','escudo'],['Mide el estado inicial','Gráfico de Bovis en el centro y en cada zona. Registra los valores.','detecta'],['Identifica y limpia','Radiaciones, bloqueos y origen. Aplica las etiquetas hebreas según lo que encuentres.','limpia'],['Comprueba y sella','Vuelve a medir con Bovis, agradece y cierra con la oración de cierre.','armoniza'],['Completa y envía tu ficha','Revisa la ficha y envíala a la Maestra Holística.','corazon']];
RICH.n2pf1=()=>{const o=st('n2pfc',{});const n=Object.values(o).filter(Boolean).length;
 return dkH('Práctica final','Tu práctica final','Para recibir la insignia Guardiana de Espacios realizas una limpieza completa en un espacio real y entregas tu ficha de registro.')+
 `<div class="dk-hero light"><span class="eyebrow">Qué entregas</span><h2>Una limpieza completa,<br>registrada en tu ficha</h2><p>Un espacio real, el protocolo completo y la ficha de registro. Marca lo que ya tienes listo.</p></div>
  <div class="sel-list">${N2PFREQ.map((x,i)=>`<button class="ck" ${rxa('tog','n2pfc',i)} ${pressed(o[i])}><span class="box"></span><span><b>${x[0]}.</b> ${x[1]}</span></button>`).join('')}</div>
  <div class="prog"><span>${n} de 5 listos</span><div class="bar"><i style="width:${n/5*100}%"></i></div></div>`};
RICH.n2pf2=()=>{const s=st('n2pfr',0);const p=N2PFRT[s];
 return dkH('Práctica final','Tu recorrido, paso a paso','Seis pasos desde que eliges el espacio hasta que envías la ficha.')+
 `<div class="dk-split" style="align-items:start"><div class="sel-list">${N2PFRT.map((x,i)=>`<button class="sel" ${rxa('set','n2pfr',i)} ${pressed(i===s)}>${ic(x[2],24)}<b>${i+1}. ${x[0]}</b></button>`).join('')}</div>
  <div class="detail"><span class="eyebrow">Paso ${s+1} de 6</span><h3>${p[0]}</h3><p>${p[1]}</p><div class="row"><button class="btn btn-ghost btn-sm" ${rxa('set','n2pfr',Math.max(0,s-1))} ${s===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('set','n2pfr',Math.min(5,s+1))} ${s===5?'disabled':''}>Siguiente</button></div></div></div>`};
RICH.n2pf3=()=>{const sc=n2fiScore();const ok=sc.every(x=>x.ok);const sent=st('n2sent',0);const b=BADGES.find(x=>x.id==='b2');
 if(sent)return `<div class="dk-hero"><svg class="mo" aria-hidden="true"><use href="#mark"/></svg><span class="eyebrow">Ficha enviada</span><h2>Tu ficha llegó<br>a la Maestra Holística</h2><p>Cuando la revise, tu insignia queda en tu perfil y te llega un correo. Mientras tanto, mira cómo se verá.</p>
  <div style="display:grid;justify-items:center;gap:10px;margin:8px 0">${badgeSVG(b,1).replace('<svg ','<svg class="big" style="width:150px;height:150px" ')}<b style="font:400 1.5rem var(--f-display)">${b.name}</b><small style="opacity:.8">${b.sub}</small></div>
  <div class="dk-cta"><button class="btn btn-primary btn-sm" style="background:#e9e4d0;color:#1f3f32" data-badge="b2">Ver mi insignia</button><button class="btn btn-ghost btn-sm" style="border-color:rgba(236,231,211,.4);color:#ece7d3" ${rxa('n2unsend',0)}>Volver a la ficha</button></div></div>`;
 return dkH('Práctica final','Envía tu ficha y recibe tu insignia','Revisa que tu ficha tenga todo lo necesario y envíala a la Maestra Holística.')+
  `<div class="sel-list">${sc.map(x=>`<button class="ck" tabindex="-1" aria-disabled="true" ${pressed(x.ok)} style="cursor:default"><span class="box"></span><span>${x.l}</span></button>`).join('')}</div>${n2fiBar()}
  ${ok?`<div class="dk-call"><b>Tu ficha está lista.</b> Al enviarla, la Maestra Holística la revisa y te entrega la insignia <b>Guardiana de Espacios</b>.</div>`:`<div class="dk-call warn"><b>Aún falta completar la ficha.</b> Ve a la clase «Ficha de registro» del Módulo 6 y llena los puntos pendientes.${n2fiPct()<30?' Si quieres ver cómo se ve una ficha terminada, puedes cargar un ejemplo.':''}</div>`}
  <div class="dk-cta"><button class="btn btn-primary btn-sm" ${rxa('n2send',0)} ${ok?'':'disabled'}>Enviar a la Maestra Holística</button>${!ok&&n2fiPct()<30?`<button class="btn btn-ghost btn-sm" ${rxa('n2demo',0)}>Cargar ficha de ejemplo</button>`:''}</div>`};

const N2QUIZ=[
 {q:'Completa el lema: “Primero medimos, luego intervenimos, finalmente…”',o:['volvemos a medir','cerramos sin revisar','repetimos la limpieza'],a:0,e:'La medición final permite comprobar los cambios y el aumento de la vibración.'},
 {q:'¿Cuántos pasos tiene el Protocolo Casa Muladhara®?',o:['Cinco','Siete','Diez'],a:1,e:'Preparación, evaluación inicial, identificación, limpieza, armonización, comprobación final y cierre.'},
 {q:'¿Qué paso va justo después de la identificación?',o:['Limpieza','Cierre','Evaluación inicial'],a:0,e:'Con la identificación sabes qué zonas y qué tipo de alteración tratar; sigue la limpieza.'},
 {q:'Antes de comenzar, ¿qué debe indicar el péndulo en las preguntas de protección?',o:['Sí / 100 %','No / 0 %','Cualquier valor'],a:0,e:'Si alguna respuesta no es favorable, detén el trabajo, realiza la limpieza y protección y vuelve a verificar.'},
 {q:'¿Qué hay que hacer si una respuesta de protección no es favorable?',o:['Continuar igual','Detener el trabajo, limpiar y proteger, y volver a verificar','Cambiar de espacio'],a:1,e:'Es el criterio de seguridad de la terapeuta antes y después del trabajo.'},
 {q:'Una medición de 9.500 unidades Bovis corresponde a un nivel…',o:['Bajo','Medio alto','Muy alto'],a:1,e:'De 8.001 a 12.000: energía equilibrada, ambiente armónico y agradable.'},
 {q:'¿Qué se recomienda en caso de radiaciones negativas de la Tierra?',o:['SCAP','Dejar el espacio sin tratar','Solo cambiar los muebles'],a:0,e:'Se recomienda usar SCAP como apoyo para la armonización del espacio.'},
 {q:'¿Qué se recomienda para las radiaciones técnico dañinas?',o:['ORGÓN / SCAP','Solo spray áurico','Nada'],a:0,e:'Antenas, instalaciones eléctricas y campos de alta tensión se apoyan con ORGÓN o SCAP.'},
 {q:'¿Qué muestra el tercer anillo del gráfico de bloqueo?',o:['La naturaleza del bloqueo','El nivel de intensidad','Los materiales'],a:1,e:'Va de Limpio a Campo colapsado y define la profundidad de la limpieza.'},
 {q:'El mueble está dañado, roto o su energía es muy negativa. ¿Qué haces?',o:['Botar','Regalar','Cambiar de lugar'],a:0,e:'Se recomienda desecharlo para evitar que siga generando desequilibrios.'},
 {q:'¿Qué nivel de protección activa corresponde a 100 %?',o:['Campo protegido','Campo desprotegido','Sello débil'],a:0,e:'0 % campo desprotegido, 10 a 30 % sello débil, 40 a 60 % sello activo intermitente, 70 a 90 % protección activa fuerte.'},
 {q:'¿Qué etiqueta hebrea corresponde a “Paz”?',o:['שלום','שחרור','איתום'],a:0,e:'Shalom. Liberación es שחרור y sellado es איתום.'}
];
RICH.n2quiz=()=>{const z=st('n2qz',{i:0,a:{}});
 if(z.fin){const sc=N2QUIZ.filter((q,i)=>z.a[i]===q.a).length;
  return dkH('Repaso','¡Terminaste!')+`<div class="detail" style="text-align:center;justify-items:center"><span class="qscore">${sc}/${N2QUIZ.length}</span><p>${sc>=N2QUIZ.length-1?'Dominas lo esencial del Nivel 2.':sc>=8?'Vas muy bien. Repasa lo que falló y sigue practicando.':'Vale la pena repasar las clases. Puedes volver cuando quieras.'}</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('n2qr',0)}>Intentar de nuevo</button></div></div>`}
 const q=N2QUIZ[z.i];const a=z.a[z.i];const done=a!==undefined;
 return dkH('Repaso · '+(z.i+1)+' de '+N2QUIZ.length,q.q)+
 `<div class="sel-list">${q.o.map((x,i)=>`<button class="qopt ${done?(i===q.a?'right':i===a?'wrong':''):''}" ${rxa('n2qa',i)} ${done?'disabled':''}><span class="l">${'ABC'[i]}</span><span ${/[֐-׿]/.test(x)?'lang="he" style="font-size:1.5rem"':''}>${x}</span></button>`).join('')}</div>
  ${done?`<div class="dk-call"><b>${a===q.a?'¡Correcto!':'Casi.'}</b> ${q.e}</div><div class="dk-cta"><button class="btn btn-primary btn-sm" ${rxa('n2qn',0)}>${z.i===N2QUIZ.length-1?'Ver resultado':'Siguiente pregunta'}</button></div>`:''}`};

RICH.n2end=()=>`<div class="dk-hero"><svg class="mo" aria-hidden="true"><use href="#mark"/></svg><span class="eyebrow">Cierre de la clase</span><h2>Espacios en armonía,<br>vidas más plenas</h2>
  <p>Gracias por tu presencia y tu compromiso. Practica el protocolo, registra cada medición y deja que este conocimiento se integre en tu forma de servir.</p>
  <div class="dk-cta"><button class="btn btn-primary btn-sm" style="background:#e9e4d0;color:#1f3f32" data-open-level="radiestesia">Ir al Nivel 3</button><button class="btn btn-ghost btn-sm" style="border-color:rgba(236,231,211,.4);color:#ece7d3" data-go="comunidad">Compartir en la comunidad</button></div>
  <small class="dk-sig">Limpiamos · Sanamos · Elevamos vidas</small></div>`;
