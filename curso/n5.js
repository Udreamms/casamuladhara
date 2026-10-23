// Casa Muladhara · contenido del Nivel 5 (solo con acceso a este nivel; lo exige middleware.js).
// Script clásico: usa las piezas de curso/n1.js, n2.js y n3.js, que se cargan antes.
/* ---------- Nivel 5 · Tarot Terapéutico: El Camino del Ser ---------- */
(function(){const c=document.createElement('style');c.id='t5-css';c.textContent=`
.t5-card{all:unset;box-sizing:border-box;display:block;width:min(100%,220px);aspect-ratio:7/12;justify-self:center;border-radius:16px;border:1.5px solid var(--nb-gold2);background:var(--nb-paper);padding:9px;box-shadow:0 20px 44px -26px rgba(28,58,43,.65);transition:transform .7s cubic-bezier(.3,.7,.2,1)}
button.t5-card{cursor:pointer}button.t5-card:focus-visible{outline:2px solid var(--nb-gold)}
.t5-card.sm{width:min(100%,150px)}
.t5-card.full{aspect-ratio:auto;padding:6px}
.t5-card.full img{display:block;width:100%;height:auto;border-radius:8px}
.t5-card.on,.t5-card.rev{transform:rotate(180deg)}
.t5-in{display:grid;grid-template-rows:auto minmax(0,1fr) auto;height:100%;border:1px solid var(--nb-line);border-radius:10px;overflow:hidden;justify-items:center;align-items:center;gap:6px;padding:8px 6px}
.t5-in img{width:100%;height:100%;object-fit:cover;border-radius:6px;min-height:0}
.t5-num{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--nb-gold2);display:grid;place-items:center;font:400 .95rem/1 var(--f-display);color:var(--nb-gold)}
.t5-nm{font:600 .7rem/1.2 var(--f-caps);letter-spacing:.2em;text-transform:uppercase;color:var(--nb-ink);text-align:center}
.t5-mk{width:46px;height:46px;color:var(--nb-ink)}
.t5-big{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.t5-big button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:6px;padding:20px 22px;border-radius:18px;border:1px solid var(--nb-line);background:var(--nb-paper2);color:var(--nb-ink);transition:transform .2s,border-color .2s}
.t5-big button:hover{transform:translateY(-2px);border-color:var(--nb-gold)}.t5-big button:focus-visible{outline:2px solid var(--nb-gold)}
.t5-big button[aria-pressed="true"]{background:#1f3f32;color:#ece7d3;border-color:#1f3f32}
.t5-big .k{font:400 3.2rem/1 var(--f-display);color:var(--nb-gold)}
.t5-big button[aria-pressed="true"] .k{color:#e8c680}
.t5-big b{font:400 1.25rem/1.2 var(--f-display)}
.t5-big small{font-size:.85rem;opacity:.85}
.t5-rows{display:grid;gap:8px}
.t5-rows button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:96px minmax(0,1fr);gap:14px;align-items:center;padding:12px 16px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink)}
.t5-rows button:focus-visible{outline:2px solid var(--nb-gold)}
.t5-rows button[aria-pressed="true"]{background:#1f3f32;color:#ece7d3;border-color:#1f3f32}
.t5-rows .r{font:400 1.05rem/1 var(--f-display);color:var(--nb-gold)}
.t5-rows button[aria-pressed="true"] .r{color:#e8c680}
.t5-rows small{display:block;font-size:.8rem;opacity:.8}
.t5-tab{display:grid;gap:6px}
.t5-tab div{display:grid;grid-template-columns:70px minmax(0,1fr);gap:12px;padding:10px 14px;border-radius:12px;border:1px solid var(--nb-line);background:var(--nb-paper);align-items:center}
.t5-tab div.now{background:color-mix(in srgb,var(--nb-gold2) 22%,var(--nb-paper));border-color:var(--nb-gold)}
.t5-tab .k{font:600 .62rem/1.2 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--nb-gold)}
.t5-sw{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}
.t5-sw button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink)}
.t5-sw button:focus-visible{outline:2px solid var(--nb-gold)}
.t5-sw button[aria-pressed="true"]{border-color:var(--nb-gold);background:color-mix(in srgb,var(--nb-gold2) 18%,var(--nb-paper))}
.t5-dot{width:26px;height:26px;border-radius:50%;flex:none;border:1px solid rgba(0,0,0,.15)}
.t5-hs{position:relative;justify-self:center;width:min(100%,330px)}
.t5-hs img{display:block;width:100%;height:auto;border-radius:18px;border:3px solid var(--nb-paper2);box-shadow:0 20px 44px -26px rgba(28,58,43,.65)}
.t5-hs button{all:unset;box-sizing:border-box;cursor:pointer;position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;display:grid;place-items:center;background:rgba(251,247,234,.92);color:#1c3a2b;border:2px solid #c99b4b;font:600 .85rem/1 var(--f-caps);box-shadow:0 4px 12px rgba(0,0,0,.25);animation:t5pulse 2.4s ease-in-out infinite}
.t5-hs button[aria-pressed="true"]{background:#1f3f32;color:#e8c680;border-color:#e8c680;animation:none;transform:scale(1.15)}
.t5-hs button:focus-visible{outline:2px solid #e8c680}
@keyframes t5pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,155,75,.55)}50%{box-shadow:0 0 0 9px rgba(201,155,75,0)}}
.t5-q{border-left:3px solid var(--nb-gold);padding:6px 0 6px 18px;font:400 clamp(1.3rem,2.6vw,1.8rem)/1.35 var(--f-display);color:var(--nb-ink);margin:0}
.t5-fan{width:100%;display:flex!important;justify-content:center;align-items:center}
.t5-fan .t5-card{width:46%;max-width:150px;margin:0 -9%;box-shadow:0 14px 30px -14px rgba(0,0,0,.6)}
.t5-fan .t5-card:nth-child(1){transform:rotate(-8deg) translateY(10px)}.t5-fan .t5-card:nth-child(3){transform:rotate(8deg) translateY(10px)}.t5-fan .t5-card:nth-child(2){z-index:1}
.t5-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;justify-items:center}
@media (prefers-reduced-motion:reduce){.t5-card{transition:none}.t5-hs button{animation:none}}
`;document.head.appendChild(c)})();

const T5C1=N5P+'c1/';
const t5card=o=>{const inner=o.full?`<img src="${o.img}" alt="${o.alt||''}" loading="lazy" decoding="async">`:`<span class="t5-in"><span class="t5-num">${o.n}</span>${o.img?`<img src="${o.img}" alt="${o.alt||''}" loading="lazy" decoding="async">`:`<svg class="t5-mk" aria-hidden="true"><use href="#mark"/></svg>`}<span class="t5-nm">${o.t}</span></span>`;
 return o.key?`<button class="t5-card${o.full?' full':''}${o.sm?' sm':''}${st(o.key,{})[0]?' on':''}" ${rxa('flip',o.key,0)} ${pressed(st(o.key,{})[0])} aria-label="${o.label||'Dar vuelta la carta'}">${inner}</button>`
 :`<div class="t5-card${o.full?' full':''}${o.sm?' sm':''}${o.rev?' rev':''}">${inner}</div>`};
const T5LOCO={n:'0',t:'El Loco',img:T5C1+'loco_carta.webp',alt:'El Loco: un joven con una rosa blanca y un hatillo camina hacia el borde de un precipicio, con un perro blanco a sus pies y el sol detrás'};
const T5FOOL={full:1,img:T5C1+'el_loco_rw.webp',alt:'El Loco del mazo Rider-Waite: un joven con una rosa blanca y un hatillo camina hacia el borde de un precipicio bajo el sol, con un perro blanco a sus pies'};
const T5MAY=['El Loco','El Mago','La Sacerdotisa','La Emperatriz','El Emperador','El Hierofante','Los Enamorados','El Carro','La Fuerza','El Ermitaño','La Rueda de la Fortuna','La Justicia','El Colgado','La Muerte','La Templanza','El Diablo','La Torre','La Estrella','La Luna','El Sol','El Juicio','El Mundo'];
const T5ROM=['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];
const t5arc=i=>T5ROM[i]+' '+T5MAY[i];
const t5nav=(key,s,n,lbl)=>`<div class="row"><button class="btn btn-ghost btn-sm" ${rxa('set',key,Math.max(0,s-1))} ${s===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('set',key,Math.min(n-1,s+1))} ${s===n-1?'disabled':''}>${lbl||'Siguiente'}</button></div>`;

/* ----- 1 · Bienvenida ----- */
RICH.t1a1=()=>nbHero('Tarot Camino del Ser · Clase 1','<span style="font-size:.68em">Introducción</span>','y El Loco','Clase 1 · Arcanos Mayores. Comenzamos el viaje con la carta que está antes de todas las demás.',['Espejo','Proceso','Acompañamiento'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw" style="display:grid;justify-items:center">${t5card({...T5LOCO,sm:1})}</div>`);
RICH.t1a2=()=>dkH('Nuestro enfoque','Un tarot para mirarte, no para adivinar','En Camino del Ser cada carta es un <b>espejo de un proceso interno</b>: lo que vives, lo que sientes y lo que estás aprendiendo.')+
 `<div class="dk-sub">Tarot terapéutico y evolutivo · toca cada palabra</div>`+
 n3flip('t1en',[['ojo','Espejo','La carta refleja lo que ya está en ti. <b>No predice: te muestra.</b>'],['camino','Proceso','Cada arcano es una etapa del camino interior que todas recorremos.'],['grupo','Acompañamiento','Aprendes a leer para ti y, más adelante, para acompañar a otras personas.']],'c3',160)+
 n3quote('Cada carta es un espejo: <mark>no predice, te muestra</mark>.');

/* ----- 2 · El tarot y el mazo ----- */
const T5HI=[['Siglo XV','Italia','Nacen los <b>tarocchi</b>, cartas pintadas para un juego de la nobleza.'],['Siglo XVIII','Francia','El tarot empieza a leerse como un <b>libro de símbolos y sabiduría</b>.'],['1909','Londres','Arthur E. Waite y la artista Pamela Colman Smith crean el <b>Rider-Waite</b>.']];
RICH.t1a3=()=>{const s=n3clamp(st('t1hi',0),0,2),x=T5HI[s];
 return dkH('Un poco de historia','De juego de cartas a herramienta interior','Recorre la línea del tiempo.')+
 `<div class="tl" style="grid-template-columns:repeat(3,minmax(0,1fr))">${T5HI.map((y,i)=>`<button ${rxa('set','t1hi',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${y[0]}</span></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">${x[0]} · ${x[1]}</span><h3>${x[0]}</h3><p>${x[2]}</p>${t5nav('t1hi',s,3)}</div>`};
const T5PAL=[['Bastos','hoja'],['Copas','agua'],['Espadas','rayo'],['Oros','sol']];
RICH.t1a4=()=>{const s=n3clamp(st('t1mz',0),0,1);
 return dkH('El mazo Rider-Waite','78 cartas, dos grandes grupos','Toca cada grupo para ver qué cartas lo forman.')+
 `<div class="t5-big">${[['22','Arcanos Mayores','Las grandes etapas del alma. Del 0, El Loco, al XXI, El Mundo.'],['56','Arcanos Menores','La vida cotidiana en 4 palos: Bastos, Copas, Espadas y Oros. 14 cartas cada uno.']].map((y,i)=>`<button ${rxa('set','t1mz',i)} ${pressed(i===s)}><span class="k">${y[0]}</span><b>${y[1]}</b><small>${y[2]}</small></button>`).join('')}</div>`+
 (s===0?`<div class="dk-sub">Los 22 Arcanos Mayores</div><div class="dk-chips">${T5MAY.map((t,i)=>`<span class="tg">${t5arc(i)}</span>`).join('')}</div>`
 :`<div class="dk-sub">Los 4 palos · 14 cartas cada uno</div><div class="dk-grid c4">${T5PAL.map(p=>`<div class="pill-card" style="text-align:center;justify-items:center;display:grid;gap:6px">${ic(p[1],28)}<b>${p[0]}</b><small class="muted">14 cartas</small></div>`).join('')}</div>`)+
 `<div class="dk-call">${ic('libro',18)} 22 + 56 = <b>78 cartas</b>. En los meses 1 y 2 recorremos los Arcanos Mayores.</div>`};
const T5TR=[['I – VII','El mundo exterior','Construir identidad, aprender a ser y a elegir.',1,7],['VIII – XIV','El mundo interior','Mirar hacia adentro, soltar y equilibrar.',8,14],['XV – XXI','El mundo espiritual','Atravesar la sombra, transformarse y llegar a la plenitud.',15,21]];
RICH.t1a5=()=>{const s=n3clamp(st('t1tr',0),0,2),x=T5TR[s];
 return dkH('Los Arcanos Mayores','El Viaje del Loco en tres tramos','El Loco, carta 0, es quien recorre los tres tramos. Toca cada tramo.')+
 `<div class="t5-rows">${T5TR.map((y,i)=>`<button ${rxa('set','t1tr',i)} ${pressed(i===s)}><span class="r">${y[0]}</span><span><b>${y[1]}</b><small>${y[2]}</small></span></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">Tramo ${s+1} de 3 · ${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p><div class="dk-chips">${T5MAY.slice(x[3],x[4]+1).map((t,i)=>`<span class="tg">${t5arc(x[3]+i)}</span>`).join('')}</div></div>
 <div class="dk-call">${ic('camino',18)} <b>0 El Loco</b> no pertenece a ningún tramo: es el viajero que los recorre todos.</div>`};
const T5REC=[[0],[1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18],[19,20,21]];
RICH.t1a6=()=>dkH('Meses 1 y 2','Nuestro recorrido por los Mayores','Ocho clases para conocer los 22 Arcanos Mayores, uno a uno.')+
 `<div class="t5-tab">${T5REC.map((r,i)=>`<div class="${i===0?'now':''}"><span class="k">Clase ${i+1}${i===0?' · hoy':''}</span><span>${r.map(t5arc).join(' · ')}</span></div>`).join('')}</div>`;

/* ----- 3 · Cómo estudiar una carta ----- */
const T5FI=[['libro','Nombre, número y lugar en el viaje','Es el viajero que todavía no empieza. Lleva el número cero: está antes de todo y puede ir a cualquier lugar.'],
 ['ojo','Lectura de la imagen: símbolos y colores','El precipicio, el perro blanco, la rosa blanca, el hatillo, el sol y las montañas.'],
 ['estrella','Palabras clave, de tres a cinco','Inicio · Confianza · Libertad · Espontaneidad · Salto de fe.'],
 ['sol','Mensaje luminoso','Confiar en la vida. Empezar de nuevo con inocencia. Abrirse a lo nuevo.'],
 ['luna','Sombra y carta invertida','Sombra: imprudencia, evadir responsabilidades, miedo al compromiso. Invertida: miedo a dar el paso, impulso sin dirección, ingenuidad que expone.'],
 ['corazon','Mirada terapéutica y evolutiva','El Loco es la parte de ti que se atreve a empezar. Aparece cuando la vida te invita a soltar el control y confiar en el proceso.'],
 ['lupa','Pregunta de autoconocimiento','¿Hacia dónde estoy lista para dar un salto de confianza?']];
RICH.t1a7=()=>{const s=n3clamp(st('t1fi',0),0,6);
 return dkH('Nuestra ficha de estudio','Siete pasos para conocer cada carta','Usaremos esta misma ficha con cada arcano. Recorre los pasos y mira cómo se completa con El Loco.')+
 n3sel('t1fi',T5FI.map(x=>[x[0],x[1],'',`<div class="dk-call"><b>En El Loco:</b> ${x[2]}</div>`]),{eb:'Paso',nav:1})};
const T5CO=[['Amarillo','#e2b33c','Conciencia, luz, alegría'],['Rojo','#c0442f','Pasión, acción, deseo'],['Blanco','#fbf7ea','Pureza, inocencia'],['Azul','#4573a8','Intuición, emociones'],['Verde','#4f7d4a','Crecimiento, naturaleza'],['Negro y gris','#3a3a3a','Misterio, lo oculto']];
RICH.t1a8=()=>{const s=n3clamp(st('t1co',0),0,5),x=T5CO[s];
 return dkH('El lenguaje de la imagen','Los colores también hablan','Toca un color para ver lo que expresa en una carta.')+
 `<div class="t5-sw">${T5CO.map((y,i)=>`<button ${rxa('set','t1co',i)} ${pressed(i===s)}><span class="t5-dot" style="background:${y[1]}"></span><b>${y[0]}</b></button>`).join('')}</div>
 <div class="detail" style="border-left:8px solid ${x[1]}"><span class="eyebrow">Color ${s+1} de 6</span><h3>${x[0]}</h3><p>${x[2]}.</p></div>
 <div class="dk-call">${ic('ojo',18)} Mira también <b>los cielos, las posturas, lo que llevan las manos</b> y <b>hacia dónde mira</b> cada personaje.</div>`};
RICH.t1a9=()=>dkH('Cartas invertidas','No es un mal augurio: es una invitación a mirar','Toca la carta para darla vuelta y luego descubre las cuatro formas de leer una carta invertida.')+
 `<div class="dk-split" style="align-items:center"><div style="display:grid;gap:8px;justify-items:center">${t5card({...T5FOOL,key:'t1inv',sm:1})}<p class="dk-note" style="text-align:center">Toca la carta para darla vuelta.</p></div>`+
 n3flip('t1iv',[['candado','Energía bloqueada','Lo que la carta ofrece aún no logra fluir.'],['espiral','Energía hacia adentro','El proceso es interno, todavía no se ve afuera.'],['balanza','En exceso o en falta','La cualidad de la carta está desequilibrada.'],['libro','Aprendizaje pendiente','Un tema que pide atención y cuidado.']],'c2',140)+`</div>`;

/* ----- 4 · El Loco ----- */
const T5KW=['Inicio','Confianza','Libertad','Espontaneidad','Salto de fe'];
RICH.t1a10=()=>{const o=st('t1kw',{});
 return `<div class="dk-split" style="align-items:center">${t5card(T5FOOL)}
 <div style="display:grid;gap:14px">${dkH('Arcano Mayor · 0','El Loco','El inicio del camino.')}
 <div class="detail"><span class="eyebrow">1 · Lugar en el viaje</span><p>Es el viajero que todavía no empieza. Lleva el <b>número cero</b>: está antes de todo y puede ir a cualquier lugar.</p></div>
 <div class="dk-sub">3 · Palabras clave · marca las que resuenan contigo hoy</div>
 <div class="dk-chips" role="group">${T5KW.map((w,i)=>`<button class="chip" ${rxa('tog','t1kw',i)} ${pressed(o[i])}>${w}</button>`).join('')}</div></div></div>`};
const T5IM=[['El precipicio','El salto a lo desconocido.',28,79],['El perro blanco','El instinto que acompaña y avisa.',80,69],['La rosa blanca','La pureza de la intención.',86,27],['El hatillo','Su historia y sus dones.',71,18],['El sol y el cielo amarillo','La conciencia que ilumina.',87,7],['Las montañas','Los desafíos que vendrán.',13,73]];
RICH.t1a11=()=>{const s=n3clamp(st('t1im',0),0,5),x=T5IM[s];
 return dkH('2 · Lectura de la imagen','Lo que nos cuenta El Loco','Toca los números sobre la carta para descubrir cada símbolo.')+
 `<div class="dk-split" style="align-items:center"><div class="t5-hs"><img src="${T5FOOL.img}" alt="${T5FOOL.alt}" decoding="async">${T5IM.map((y,i)=>`<button style="left:${y[2]}%;top:${y[3]}%" ${rxa('set','t1im',i)} ${pressed(i===s)} aria-label="${y[0]}">${i+1}</button>`).join('')}</div>
 <div style="display:grid;gap:12px"><div class="detail"><span class="eyebrow">Símbolo ${s+1} de 6</span><h3>${x[0]}</h3><p>${x[1]}</p>${t5nav('t1im',s,6)}</div>
 <div class="dk-chips" role="group">${T5IM.map((y,i)=>`<button class="chip" ${rxa('set','t1im',i)} ${pressed(i===s)}>${i+1}. ${y[0]}</button>`).join('')}</div></div></div>`};
const T5CA=[['Mensaje luminoso','sol',['Confiar en la vida','Empezar de nuevo con inocencia','Abrirse a lo nuevo']],['Sombra','luna',['Imprudencia','Evadir responsabilidades','Miedo al compromiso']],['Invertida','espiral',['Miedo a dar el paso','Impulso sin dirección','Ingenuidad que expone']]];
RICH.t1a12=()=>{const s=n3clamp(st('t1ca',0),0,2),x=T5CA[s];
 return dkH('4 y 5 · Luz, sombra e invertida','Las tres caras de El Loco','Una misma carta muestra su luz, su sombra y lo que pide cuando aparece invertida.')+chipRow('t1ca',T5CA.map(c=>c[0]),s)+
 `<div class="dk-split" style="align-items:center">${t5card({...T5FOOL,sm:1,rev:s===2})}
 <div class="detail"><span class="eyebrow">Cara ${s+1} de 3</span><h3>${ic(x[1],26)} ${x[0]}</h3>${c4li(x[2].map(t=>[x[1],t]))}${t5nav('t1ca',s,3)}</div></div>`};
RICH.t1a13=()=>dkH('6 · Mirada terapéutica','El Loco es la parte de ti que se atreve a empezar','Aparece cuando la vida te invita a <b>soltar el control</b> y <b>confiar en el proceso</b>.')+
 `<div class="detail"><span class="eyebrow">7 · Pregunta de autoconocimiento</span><p class="t5-q">¿Hacia dónde estoy lista para dar un salto de confianza?</p></div>`+
 n3area('t1sq','Tu respuesta','Estoy lista para…')+n3priv;

/* ----- 5 · Práctica con tu mazo ----- */
const T5EJ=[['ojo','Observa','Tres minutos en silencio con El Loco frente a ti.'],['chat','Describe','Cuenta lo que ves y lo que sientes, no lo que sabes.'],['grupo','Comparte','Responde la pregunta del salto de confianza.']];
RICH.t1a14=()=>{const s=n3clamp(st('t1ej',0),0,2),x=T5EJ[s];
 return dkH('Ejercicio vivencial · en grupos pequeños','Mirar antes de saber','Tres pasos para encontrarte con la carta antes de buscar su significado.')+
 `<div class="tl" style="grid-template-columns:repeat(3,minmax(0,1fr))">${T5EJ.map((y,i)=>`<button ${rxa('set','t1ej',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${y[1]}</span></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">Paso ${s+1} de 3</span><h3>${ic(x[0],26)} ${x[1]}</h3><p>${x[2]}</p>${t5nav('t1ej',s,3,'Siguiente paso')}</div>`+
 n3area('t1vs','Lo que veo y lo que siento','Veo… Siento…')+n3priv};
RICH.t1a15=()=>dkH('Práctica con tu mazo','Derecha e invertida','Toma El Loco de tu mazo y sigue los pasos. Aquí puedes darle vuelta a la carta tocándola.')+
 `<div class="dk-split" style="align-items:center"><div style="display:grid;gap:8px;justify-items:center">${t5card({...T5FOOL,key:'t1dv'})}<p class="dk-note" style="text-align:center">Toca la carta para verla invertida.</p></div>
 <div style="display:grid;gap:12px">${n3ck('t1dp',[['','1. Pon El Loco derecho frente a la cámara.'],['','2. Respira y nota qué sientes en el cuerpo.'],['','3. Dalo vuelta y míralo invertido.'],['','4. Comparte en una frase qué cambió.']],['Marca cada paso a medida que lo haces.','¡Lista! Escribe abajo qué cambió.'])}</div></div>`+
 n3area('t1dq','En una frase, ¿qué cambió?','Cuando lo vi invertido…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
const t5pick=(key,other,lbl)=>{const o=st(key,{}),b=st(other,{}),n=T5MAY.filter((t,i)=>o[i]).length;
 return `<div class="dk-sub">${lbl} · ${n} de 3</div><div class="dk-chips" role="group" aria-label="${lbl}">${T5MAY.map((t,i)=>`<button class="chip" ${rxa('tog',key,i)} ${pressed(o[i])} ${(!o[i]&&(n>=3||b[i]))?'disabled':''}>${t5arc(i)}</button>`).join('')}</div>`};
RICH.t1a16=()=>{const a=st('t1at',{}),b=st('t1in',{}),nm=o=>T5MAY.map((t,i)=>o[i]?t5arc(i):'').filter(Boolean);
 return dkH('Para esta semana','Tu primer contacto con el mazo','Tres tareas para hacer en casa, con tu mazo y tu cuaderno.')+
 n3ck('t1ta',[['libro','Completa en tu cuaderno la ficha de El Loco con los siete pasos.'],['estrella','Recorre tus 22 Mayores y elige 3 que te atraen y 3 que te incomodan, sin buscar su significado.'],['hoja','Anota qué te hacen sentir. Las revisaremos a medida que avancemos.']])+
 `<div class="dk-call">${ic('estrella',18)} Puedes marcar aquí tus cartas. Una carta no puede estar en los dos grupos.</div>`+
 t5pick('t1at','t1in','Me atraen')+t5pick('t1in','t1at','Me incomodan')+
 (nm(a).length||nm(b).length?`<div class="dk-grid c2"><div class="pill-card"><b>Me atraen</b><p>${nm(a).join(' · ')||'—'}</p></div><div class="pill-card"><b>Me incomodan</b><p>${nm(b).join(' · ')||'—'}</p></div></div>`:'')+
 n3area('t1ts','¿Qué te hacen sentir?','Cuando miro estas cartas siento…')+n3priv};
RICH.t1a17=()=>dkH('Gracias por empezar este camino','Próxima clase','Seguimos el viaje con las tres primeras cartas del mundo exterior.')+
 `<div class="t5-cols">${[1,2,3].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('Un tarot para mirarte, <mark>no para adivinar</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q1=[
 {q:'En Camino del Ser, una carta…',o:['Predice lo que va a pasar','Refleja lo que ya está en ti','Decide por ti'],a:1,e:'La carta es un espejo: no predice, te muestra.'},
 {q:'¿Cuántas cartas tiene el mazo Rider-Waite?',o:['22','56','78'],a:2,e:'22 Arcanos Mayores y 56 Arcanos Menores.'},
 {q:'¿Cuándo y dónde nace el Rider-Waite?',o:['Siglo XV, en Italia','1909, en Londres','Siglo XVIII, en Francia'],a:1,e:'Lo crean Arthur E. Waite y la artista Pamela Colman Smith.'},
 {q:'Los Arcanos Menores se organizan en…',o:['4 palos de 14 cartas: Bastos, Copas, Espadas y Oros','3 tramos de 7 cartas','22 etapas del alma'],a:0,e:'Hablan de la vida cotidiana, en 4 palos de 14 cartas cada uno.'},
 {q:'El tramo VIII – XIV del Viaje del Loco es…',o:['El mundo exterior','El mundo interior','El mundo espiritual'],a:1,e:'Mirar hacia adentro, soltar y equilibrar.'},
 {q:'Una carta invertida…',o:['Siempre es un mal augurio','Es una invitación a mirar','No se lee'],a:1,e:'Puede hablar de energía bloqueada, hacia adentro, en exceso o en falta, o de un aprendizaje pendiente.'},
 {q:'En la imagen de El Loco, el perro blanco representa…',o:['El instinto que acompaña y avisa','Los desafíos que vendrán','La pureza de la intención'],a:0,e:'Los desafíos son las montañas y la pureza de la intención, la rosa blanca.'},
 {q:'¿Qué número lleva El Loco?',o:['I','0','XXI'],a:1,e:'Está antes de todo y puede ir a cualquier lugar.'},
 {q:'¿Cuál es una sombra de El Loco?',o:['Confiar en la vida','Evadir responsabilidades','Abrirse a lo nuevo'],a:1,e:'Su sombra: imprudencia, evadir responsabilidades y miedo al compromiso.'},
 {q:'En el ejercicio «Mirar antes de saber», compartes…',o:['Lo que sabes de la carta','Lo que ves y lo que sientes','El significado del libro'],a:1,e:'Primero se mira y se siente; el significado viene después.'}];
RICH.t1a18=()=>n3quiz('t5c1',T5Q1,['Dominas lo esencial de la Clase 1. ¡Buen comienzo de viaje!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 2 · Voluntad, intuición y creación ---------- */
const T5C2=N5P+'c2/';
// cada arcano: lugar en el viaje, palabras clave, símbolos (con su punto sobre la carta, en %), tres caras, mirada y pregunta
const T5ARC={
 mago:{n:'I',t:'El Mago',img:T5C2+'mago.webp',alt:'El Mago del mazo Rider-Waite: un joven de túnica blanca y manto rojo levanta una vara hacia el cielo y señala la tierra; sobre su cabeza, el infinito; en la mesa, una copa, una espada, un oro y un basto',
  lugar:'Es el primer paso consciente del Loco: descubre que tiene <b>herramientas</b> y que puede usarlas para crear su camino.',
  kw:['Voluntad','Acción','Habilidad','Manifestación','Concentración'],
  im:[['El infinito','Un potencial sin límites.',45,20],['Mano arriba, mano abajo','Une la idea y su concreción.',19,14],['La mesa','Basto, copa, espada y oro.',24,63],['Rosas y lirios','El deseo y la pureza juntos.',50,83],['El cinturón serpiente','El ciclo eterno.',46,51],['Blanco y rojo','Intención pura y acción.',62,38]],
  caras:[['Confiar en tus capacidades','Pasar de la idea a la acción','Comunicar con claridad'],['Manipulación','Dispersión','Hablar mucho y hacer poco'],['Dudar de tus talentos','Energía sin dirección','Engaño o autoengaño']],
  mir:'El Mago te recuerda que <b>ya tienes lo que necesitas</b>. Trabaja la autoestima y el poder personal: dejar de esperar permiso para empezar.',
  q:'¿Qué talento tengo sobre la mesa y todavía no uso?',ph:'El talento que tengo y no uso es…'},
 sacerdotisa:{n:'II',t:'La Sacerdotisa',img:T5C2+'sacerdotisa.webp',alt:'La Sacerdotisa del mazo Rider-Waite: una mujer de manto azul sentada entre dos columnas, B negra y J blanca, con una corona lunar, un pergamino TORA en las manos y una luna creciente a sus pies',
  lugar:'Después de aprender a actuar, el Loco aprende a <b>escuchar</b>: la sabiduría que no viene de afuera, sino del silencio interior.',
  kw:['Intuición','Silencio','Misterio','Sabiduría interior','Receptividad'],
  im:[['Las columnas B y J','Ella se sienta entre los opuestos.',12,44],['El velo de granadas','Lo oculto y fértil de lo interno.',65,15],['El pergamino TORA','Un saber sagrado, medio oculto.',47,57],['La luna a sus pies','Los ciclos y las emociones.',70,82],['La corona lunar','Crecer, plenitud y menguar.',50,24],['El manto azul','Agua que fluye: la intuición.',33,72]],
  caras:[['Escuchar tu intuición','Hacer una pausa','Confiar en lo que sientes'],['Aislamiento','Guardar secretos','Frialdad emocional'],['Ignorar la intuición','Ruido mental','Saber reprimido']],
  mir:'La Sacerdotisa invita al <b>silencio interior</b> y a validar lo que sabes aunque no puedas explicarlo. Sana la desconfianza en la propia percepción.',
  q:'¿Qué sé por dentro y todavía no me permito escuchar?',ph:'Por dentro sé que…'},
 emperatriz:{n:'III',t:'La Emperatriz',img:T5C2+'emperatriz.webp',alt:'La Emperatriz del mazo Rider-Waite: una mujer coronada de doce estrellas, sentada sobre cojines en un bosque con una cascada, con un vestido de granadas, un escudo en forma de corazón con el signo de Venus y trigo maduro a sus pies',
  lugar:'Con la acción del Mago y la escucha de la Sacerdotisa, nace la <b>creación</b>: la vida que se nutre, florece y da frutos.',
  kw:['Abundancia','Creatividad','Fertilidad','Naturaleza','Cuidado'],
  im:[['El trigo maduro','Lo sembrado que da frutos.',30,86],['Doce estrellas','En su corona: los ciclos del año.',55,12],['El corazón con Venus','El amor y la belleza.',21,69],['El bosque y la cascada','La vida que fluye y se renueva.',93,57],['Granadas en su vestido','La fertilidad ya manifestada.',66,62],['Los cojines','El descanso y los sentidos.',9,52]],
  caras:[['Crear y hacer crecer','Nutrir y nutrirte','Disfrutar con los sentidos'],['Sobreprotección','Dependencia','Descuidarse por cuidar a otros'],['Bloqueo creativo','Desconexión del cuerpo','Dar sin recibir']],
  mir:'La Emperatriz es la <b>madre interior</b>: la forma en que te cuidas, te alimentas y te das permiso para disfrutar. Sana la relación con el propio cuerpo.',
  q:'¿Cómo me estoy cuidando y nutriendo hoy?',ph:'Hoy me estoy cuidando…'}};
const t5full=a=>({full:1,img:a.img,alt:a.alt});
const t5Lugar=(id,cl)=>{const a=T5ARC[id],o=st('t5kw'+id,{});
 return `<div class="dk-split" style="align-items:center">${t5card(t5full(a))}
 <div style="display:grid;gap:14px">${dkH(cl+' · Arcano Mayor · '+a.n,a.t)}
 <div class="detail"><span class="eyebrow">1 · Lugar en el viaje</span><p>${a.lugar}</p></div>
 <div class="dk-sub">3 · Palabras clave · marca las que resuenan contigo hoy</div>
 <div class="dk-chips" role="group">${a.kw.map((w,i)=>`<button class="chip" ${rxa('tog','t5kw'+id,i)} ${pressed(o[i])}>${w}</button>`).join('')}</div></div></div>`};
const t5Lect=id=>{const a=T5ARC[id],k='t5im'+id,s=n3clamp(st(k,0),0,a.im.length-1),x=a.im[s];
 return dkH('2 · Lectura de la imagen',(a.cuentan?'Lo que nos cuentan ':'Lo que nos cuenta ')+a.t,'Toca los números sobre la carta para descubrir cada símbolo.')+
 `<div class="dk-split" style="align-items:center"><div class="t5-hs"><img src="${a.img}" alt="${a.alt}" decoding="async">${a.im.map((y,i)=>`<button style="left:${y[2]}%;top:${y[3]}%" ${rxa('set',k,i)} ${pressed(i===s)} aria-label="${y[0]}">${i+1}</button>`).join('')}</div>
 <div style="display:grid;gap:12px"><div class="detail"><span class="eyebrow">Símbolo ${s+1} de ${a.im.length}</span><h3>${x[0]}</h3><p>${x[1]}</p>${t5nav(k,s,a.im.length)}</div>
 <div class="dk-chips" role="group">${a.im.map((y,i)=>`<button class="chip" ${rxa('set',k,i)} ${pressed(i===s)}>${i+1}. ${y[0]}</button>`).join('')}</div></div></div>`};
const T5CAR=[['Mensaje luminoso','sol'],['Sombra','luna'],['Invertida','espiral']];
const t5Caras=id=>{const a=T5ARC[id],k='t5ca'+id,s=n3clamp(st(k,0),0,2),x=T5CAR[s];
 return dkH('4 y 5 · Luz, sombra e invertida','Las tres caras de '+a.t,'Su luz, su sombra y lo que pide cuando aparece invertida.')+chipRow(k,T5CAR.map(c=>c[0]),s)+
 `<div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1,rev:s===2})}
 <div class="detail"><span class="eyebrow">Cara ${s+1} de 3</span><h3>${ic(x[1],26)} ${x[0]}</h3>${c4li(a.caras[s].map(t=>[x[1],t]))}${t5nav(k,s,3)}</div></div>`};
const t5Mir=id=>{const a=T5ARC[id];
 return dkH('6 · Mirada terapéutica',a.t,a.mir)+
 `<div class="detail"><span class="eyebrow">7 · Pregunta de autoconocimiento</span><p class="t5-q">${a.q}</p></div>`+
 n3area('t5mq'+id,'Tu respuesta',a.ph)+n3priv};
const T5HOY=[['mago','Hacer','La voluntad que transforma una idea en acción.','#c0442f'],['sacerdotisa','Saber','La intuición que escucha en silencio.','#4573a8'],['emperatriz','Crear','La fuerza que nutre y hace florecer.','#4f7d4a']];

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t2a1=()=>nbHero('Tarot Camino del Ser · Clase 2','<span style="font-size:.68em">Voluntad, intuición</span>','y creación','Clase 2 · Arcanos Mayores. El Mago, La Sacerdotisa y La Emperatriz.',['Hacer','Saber','Crear'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${['mago','sacerdotisa','emperatriz'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>`);
RICH.t2a2=()=>dkH('Repaso de la semana','¿Cómo te fue con El Loco?','Antes de seguir, compartimos lo que dejó la primera clase. Toca cada tarjeta.')+
 n3flip('t2rp',[['libro','Tu ficha','Comparte una palabra clave que hayas descubierto tú.'],['estrella','Tus cartas elegidas','Muestra una carta que te atrajo y una que te incomodó.'],['chat','Tus dudas','Lo que quedó dando vueltas de la primera clase.']],'c3',150)+
 n3area('t2rw','Mi palabra clave de El Loco','La palabra que descubrí es…')+n3priv;
RICH.t2a3=()=>{const s=n3clamp(st('t2hy',0),0,2),x=T5HOY[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','El Loco descubre sus primeros recursos','Antes de caminar por el mundo, aprende que tiene una <b>voluntad</b>, una <b>voz interior</b> y una <b>fuerza creadora</b>. Tres energías que se complementan.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY.map((y,i)=>`<button ${rxa('set','t2hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t2hy',s,3)}</div></div>`};

/* ----- 2, 3 y 4 · El Mago, La Sacerdotisa y La Emperatriz ----- */
[['b','mago'],['c','sacerdotisa'],['d','emperatriz']].forEach(([l,id])=>{
 RICH['t2'+l+'1']=()=>t5Lugar(id,'Clase 2');
 RICH['t2'+l+'2']=()=>t5Lect(id);
 RICH['t2'+l+'3']=()=>t5Caras(id);
 RICH['t2'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Práctica con tu mazo ----- */
const T5EN=[['libro','Ordena','Pon El Mago, La Sacerdotisa y La Emperatriz frente a ti.'],['ojo','Reconoce','¿Cuál de las tres está más presente en tu vida hoy? ¿Cuál te falta?'],['grupo','Comparte','Cuenta un paso concreto para invitar a la que te falta.']];
RICH.t2e1=()=>{const s=n3clamp(st('t2en',0),0,2),x=T5EN[s],ps=st('t2pr',-1),fa=st('t2fa',-1),nm=i=>T5ARC[T5HOY[i][0]].t;
 return dkH('Ejercicio vivencial · en grupos pequeños','Mis tres energías','Tres pasos para mirar cómo viven hoy en ti el hacer, el saber y el crear.')+
 `<div class="tl" style="grid-template-columns:repeat(3,minmax(0,1fr))">${T5EN.map((y,i)=>`<button ${rxa('set','t2en',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${y[1]}</span></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">Paso ${s+1} de 3</span><h3>${ic(x[0],26)} ${x[1]}</h3><p>${x[2]}</p>${t5nav('t2en',s,3,'Siguiente paso')}</div>
 <div class="dk-sub">La más presente hoy</div>${chipRow('t2pr',[0,1,2].map(nm),ps)}
 <div class="dk-sub">La que me falta</div>${chipRow('t2fa',[0,1,2].map(nm),fa)}`+
 (ps>=0&&ps===fa?`<div class="dk-call warn">Elegiste la misma carta en las dos. Mira de nuevo: ¿cuál está más presente y cuál te falta?</div>`:'')+
 (fa>=0&&ps!==fa?`<div class="dk-call">${ic('camino',18)} Para invitar a <b>${nm(fa)}</b> (${T5HOY[fa][1].toLowerCase()}): ${T5HOY[fa][2].charAt(0).toLowerCase()+T5HOY[fa][2].slice(1)}</div>`:'')+
 n3area('t2ep','Mi paso concreto','Esta semana voy a…')+n3priv};
const T5TZ=['loco','mago','sacerdotisa','emperatriz'];
const t5arcOf=id=>id==='loco'?{n:'0',t:'El Loco',img:T5FOOL.img,alt:T5FOOL.alt,kw:T5KW,caras:T5CA.map(c=>c[2])}:T5ARC[id];
// una tirada entre las cartas vistas: cada una puede salir derecha o invertida
const t5tirada=(key,btn,ids)=>{ids=ids||T5TZ;const N=ids.length*2,r=n3clamp(st(key,-1),-1,N-1);
 if(r<0)return `<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary" ${rxa('n3rnd',key,N)}>${btn}</button></div>`;
 const a=t5arcOf(ids[r>>1]),inv=r%2===1,c=inv?a.caras[2]:a.caras[0];
 return `<div class="dk-split" style="align-items:center"><div style="display:grid;gap:8px;justify-items:center">${t5card({...t5full(a),sm:1,rev:inv})}</div>
 <div class="detail"><span class="eyebrow">Tu carta · ${inv?'invertida':'derecha'}</span><h3>${a.n} ${a.t}</h3><p><b>Palabras clave:</b> ${a.kw.join(' · ')}.</p>
 <p><b>${inv?'Invertida':'Mensaje luminoso'}:</b> ${c.join(' · ')}.</p>
 <div class="row"><button class="btn btn-ghost btn-sm" ${rxa('n3rnd',key,N)}>Sacar otra carta</button></div></div></div>`};
RICH.t2e2=()=>dkH('Práctica con tu mazo','Tu primera tirada de una carta','Con tu mazo, frente a la cámara. Aquí también puedes practicar con las 4 cartas vistas.')+
 `<div class="dk-grid c2" style="align-items:start"><div>${n3ck('t2tp',[['','1. Baraja solo las 4 cartas vistas, derechas e invertidas.'],['','2. Pregunta: ¿qué energía necesito esta semana?'],['','3. Saca una carta y muéstrala a la cámara.'],['','4. Léela con tu ficha y con lo que sientes.']])}</div>
 <div class="t5-cols" style="grid-template-columns:repeat(2,minmax(0,1fr))">${T5TZ.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div></div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué energía necesito esta semana?</b> Respira, formula la pregunta y saca tu carta.</div>`+
 t5tirada('t2tz','Sacar una carta')+n3area('t2tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
RICH.t2f1=()=>dkH('Para esta semana','Tu carta del día','Una práctica diaria para conversar con las 4 cartas vistas.')+
 n3ck('t2ta',[['libro','Completa las fichas de El Mago, La Sacerdotisa y La Emperatriz.'],['sol','Cada mañana saca una carta entre las 4 vistas, derecha o invertida.'],['luna','En la noche anota cómo se reflejó esa carta en tu día.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t2cd','Sacar mi carta del día')+
 n3area('t2cn','En la noche: ¿cómo se reflejó en mi día?','Hoy mi carta se reflejó en…')+n3priv;
RICH.t2f2=()=>dkH('Hacer, saber y crear','Próxima clase','Seguimos el viaje por el mundo exterior.')+
 `<div class="t5-cols">${[4,5,6].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('El Loco ya tiene una voluntad, una voz interior y una fuerza creadora: <mark>hacer, saber y crear</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q2=[
 {q:'¿Qué energía representa El Mago?',o:['Hacer: la voluntad que transforma una idea en acción','Saber: la intuición que escucha en silencio','Crear: la fuerza que nutre y hace florecer'],a:0,e:'El Mago es el hacer; La Sacerdotisa, el saber; La Emperatriz, el crear.'},
 {q:'En la mesa de El Mago hay…',o:['Trigo y granadas','Basto, copa, espada y oro','Un pergamino y una luna'],a:1,e:'Son los cuatro palos de los Arcanos Menores: sus herramientas.'},
 {q:'Mano arriba, mano abajo en El Mago…',o:['Une la idea y su concreción','Pide permiso para empezar','Muestra dispersión'],a:0,e:'Lo que se piensa arriba se concreta abajo.'},
 {q:'¿Cuál es una sombra de El Mago?',o:['Comunicar con claridad','Hablar mucho y hacer poco','Confiar en tus capacidades'],a:1,e:'Su sombra: manipulación, dispersión y hablar mucho y hacer poco.'},
 {q:'La Sacerdotisa se sienta entre…',o:['Dos columnas, B y J: los opuestos','Dos árboles','Dos esfinges'],a:0,e:'Entre los opuestos, con el velo de granadas detrás.'},
 {q:'Cuando La Sacerdotisa sale invertida, puede hablar de…',o:['Escuchar tu intuición','Ruido mental y saber reprimido','Disfrutar con los sentidos'],a:1,e:'Invertida: ignorar la intuición, ruido mental y saber reprimido.'},
 {q:'Las doce estrellas de la corona de La Emperatriz representan…',o:['Los ciclos del año','Los doce apóstoles','Las doce horas'],a:0,e:'Su corona habla de los ciclos del año.'},
 {q:'La mirada terapéutica de La Emperatriz habla de…',o:['La madre interior y la relación con el propio cuerpo','El poder personal','El silencio interior'],a:0,e:'La forma en que te cuidas, te alimentas y te das permiso para disfrutar.'},
 {q:'En tu primera tirada barajas…',o:['Los 22 Mayores','Solo las 4 cartas vistas, derechas e invertidas','Solo las cartas derechas'],a:1,e:'El Loco, El Mago, La Sacerdotisa y La Emperatriz.'},
 {q:'En la tarea «Tu carta del día», ¿qué haces en la noche?',o:['Sacas otra carta','Anotas cómo se reflejó la carta en tu día','Lees el libro'],a:1,e:'En la mañana sacas la carta; en la noche anotas cómo se reflejó.'}];
RICH.t2f3=()=>n3quiz('t5c2',T5Q2,['Dominas lo esencial de la Clase 2. ¡Hacer, saber y crear!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 3 · Estructura, enseñanza y elección ---------- */
const T5C3=N5P+'c3/';
Object.assign(T5ARC,{
 emperador:{n:'IV',t:'El Emperador',img:T5C3+'emperador.webp',alt:'El Emperador del mazo Rider-Waite: un rey de barba blanca con armadura, sentado en un trono de piedra con cabezas de carnero, con un cetro ankh y un orbe, ante montañas áridas',
  lugar:'Después de la madre que crea, llega el <b>padre que ordena</b>: el Loco aprende límites, estructura y responsabilidad.',
  kw:['Estructura','Autoridad','Orden','Estabilidad','Protección'],
  im:[['El trono de piedra','Firmeza y bases sólidas.',80,12],['Las cabezas de carnero','Aries: iniciativa y fuerza.',12,57],['El cetro ankh','El poder al servicio de la vida.',13,28],['El orbe','El dominio del mundo material.',80,46],['La armadura','Protección, siempre preparado.',64,72],['Montañas áridas','Disciplina, y a veces rigidez.',92,36]],
  caras:[['Poner límites sanos','Liderar con responsabilidad','Construir bases firmes'],['Rigidez','Autoritarismo','Necesidad de controlar'],['Falta de límites','Desorden','Autoridad ausente o abusiva']],
  mir:'El Emperador es el <b>padre interior</b>: la forma en que te sostienes, te pones límites y te haces cargo de tu vida. Sana la relación con la autoridad.',
  q:'¿Dónde necesito poner límites sanos en mi vida?',ph:'Necesito poner límites en…'},
 hierofante:{n:'V',t:'El Hierofante',img:T5C3+'hierofante.webp',alt:'El Hierofante del mazo Rider-Waite: un guía espiritual con triple corona y manto rojo, sentado entre dos columnas, bendice con una mano y sostiene un báculo de triple cruz; a sus pies, dos llaves cruzadas y dos discípulos',
  lugar:'El Loco busca un <b>sentido</b>: entra en la tradición, el aprendizaje y los valores que comparte con otros.',
  kw:['Enseñanza','Tradición','Guía espiritual','Valores','Pertenencia'],
  im:[['La triple corona','Cuerpo, mente y espíritu.',50,15],['La mano que bendice','Lo visible y lo invisible.',19,24],['Las llaves cruzadas','El acceso a lo sagrado.',52,88],['Los dos discípulos','El saber que se transmite.',13,80],['Las dos columnas','Como la Sacerdotisa, pero hacia afuera.',8,42],['El báculo de triple cruz','La autoridad espiritual.',78,22]],
  caras:[['Aprender de una guía','Encontrar tus valores','Pertenecer a una comunidad'],['Dogmatismo','Obediencia ciega','Juzgar a quien piensa distinto'],['Romper con las normas','Buscar tu propia verdad','Desconfiar de toda guía']],
  mir:'El Hierofante invita a revisar las <b>creencias que recibimos</b> de la familia, la escuela y la religión: cuáles nos sostienen y cuáles ya nos limitan.',
  q:'¿Qué creencias heredé que ya no me representan?',ph:'Una creencia que heredé y ya no me representa es…'},
 enamorados:{n:'VI',t:'Los Enamorados',cuentan:1,img:T5C3+'enamorados.webp',alt:'Los Enamorados del mazo Rider-Waite: un ángel bajo un sol radiante bendice a un hombre y una mujer; detrás de ella, un árbol con una serpiente; detrás de él, un árbol de llamas',
  lugar:'El Loco enfrenta su <b>primera gran elección</b> personal: elegir desde el corazón y desde sus propios valores.',
  kw:['Amor','Elección','Unión','Valores','Coherencia'],
  im:[['El ángel','Una bendición que viene de lo alto.',50,22],['El sol radiante','La conciencia que ilumina la elección.',76,5],['Hombre y mujer','La unión de los opuestos.',78,62],['Las miradas','Él la mira a ella, ella mira al ángel.',32,48],['El árbol con la serpiente','La tentación y el conocimiento.',8,60],['El árbol de llamas','La pasión y el deseo.',92,40]],
  caras:[['Elegir con el corazón','Vínculos sanos','Coherencia entre sentir y hacer'],['Dependencia emocional','Indecisión','Elegir para complacer'],['Desequilibrio en un vínculo','Conflicto de valores','Evitar elegir']],
  mir:'Cada elección nos define. Los Enamorados nos recuerdan que para elegir con libertad primero necesitamos <b>elegirnos y amarnos</b> a nosotras mismas.',
  q:'¿Qué estoy eligiendo hoy desde el miedo y qué desde el amor?',ph:'Desde el miedo elijo… Desde el amor elijo…'}});
const T5HOY3=[['emperador','Ordenar','Los límites que dan estructura.','#c0442f'],['hierofante','Aprender','La enseñanza que da sentido.','#9b6f27'],['enamorados','Elegir','La elección que nace del corazón.','#4573a8']];
const T5TZ7=['loco','mago','sacerdotisa','emperatriz','emperador','hierofante','enamorados'];

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t3a1=()=>nbHero('Tarot Camino del Ser · Clase 3','<span style="font-size:.68em">Estructura, enseñanza</span>','y elección','Clase 3 · Arcanos Mayores. El Emperador, El Hierofante y Los Enamorados.',['Ordenar','Aprender','Elegir'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${T5HOY3.map(y=>t5card({...t5full(T5ARC[y[0]]),sm:1})).join('')}</div>`);
RICH.t3a2=()=>dkH('Repaso de la semana','Voluntad, intuición y creación','Antes de seguir, compartimos cómo fue la semana con tu carta del día.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['mago','sacerdotisa','emperatriz'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué carta salió más en tu carta del día?</div>${chipRow('t3rc',T5TZ.map(id=>t5arcOf(id).t),st('t3rc',-1))}`+
 n3area('t3rs','¿Cómo se reflejó en tu semana?','Esta semana…')+
 `<div class="dk-sub">¿Cuál de las tres energías invitaste?</div>`+chipRow('t3ri',['Hacer · El Mago','Saber · La Sacerdotisa','Crear · La Emperatriz'],st('t3ri',-1))+n3priv;
RICH.t3a3=()=>{const s=n3clamp(st('t3hy',0),0,2),x=T5HOY3[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','El Loco aprende a vivir en el mundo','Conoce los <b>límites</b> que lo sostienen, las <b>enseñanzas</b> que lo guían y su primera gran <b>elección</b>.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY3.map((y,i)=>`<button ${rxa('set','t3hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t3hy',s,3)}</div></div>`};

/* ----- 2, 3 y 4 · El Emperador, El Hierofante y Los Enamorados ----- */
[['b','emperador'],['c','hierofante'],['d','enamorados']].forEach(([l,id])=>{
 RICH['t3'+l+'1']=()=>t5Lugar(id,'Clase 3');
 RICH['t3'+l+'2']=()=>t5Lect(id);
 RICH['t3'+l+'3']=()=>t5Caras(id);
 RICH['t3'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Práctica con tu mazo ----- */
const T5LCE=[['emperador','Un límite','Que necesito poner o respetar.','Necesito poner o respetar el límite de…'],['hierofante','Una creencia','Que heredé y quiero revisar.','Heredé la creencia de que…'],['enamorados','Una elección','Que estoy lista para tomar.','Estoy lista para elegir…']];
RICH.t3e1=()=>{const s=n3clamp(st('t3lc',0),0,2),x=T5LCE[s],a=T5ARC[x[0]];
 return dkH('Ejercicio vivencial · en grupos pequeños','Mi límite, mi creencia, mi elección','Con cada carta de hoy, anota lo tuyo y compártelo en tu grupo.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5LCE.map((y,i)=>`<button ${rxa('set','t3lc',i)} ${pressed(i===s)}><b>${y[1]}</b><small>${T5ARC[y[0]].t} · ${y[2]}</small>${st('t3lw'+i,'').trim()?`<small>${ic('check',14)} Anotado</small>`:''}</button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div style="display:grid;gap:10px"><div class="detail"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t3lc',s,3)}</div>${n3area('t3lw'+s,x[1],x[3])}</div></div>`+n3priv};
RICH.t3e2=()=>dkH('Práctica con tu mazo','Tirada de una carta','Ahora con las 7 cartas vistas. Practica con tu mazo y aquí mismo.')+
 n3ck('t3tp',[['','Baraja las 7 cartas vistas, derechas e invertidas.'],['','Pregunta: ¿qué necesito ordenar, aprender o elegir esta semana?'],['','Saca una carta, muéstrala a la cámara y léela con tu ficha y con lo que sientes.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:8px">${T5TZ7.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué necesito ordenar, aprender o elegir esta semana?</b></div>`+
 t5tirada('t3tz','Sacar una carta',T5TZ7)+n3area('t3tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
RICH.t3f1=()=>dkH('Para esta semana','Tu carta del día, con 7 cartas','Seguimos la práctica diaria, ahora con las 7 cartas vistas.')+
 n3ck('t3ta',[['libro','Completa las fichas de El Emperador, El Hierofante y Los Enamorados.'],['sol','Cada mañana saca una carta entre las 7 vistas, derecha o invertida.'],['camino','Da un paso concreto con el límite, la creencia o la elección que anotaste hoy.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t3cd','Sacar mi carta del día',T5TZ7)+
 n3area('t3cp','Mi paso concreto de la semana','Esta semana voy a…')+n3priv;
RICH.t3f2=()=>dkH('Ordenar, aprender y elegir','Próxima clase','Cerramos el mundo exterior y empezamos a mirar hacia adentro.')+
 `<div class="t5-cols">${[7,8,9].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('El Loco aprende a vivir en el mundo: <mark>ordenar, aprender y elegir</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q3=[
 {q:'¿Qué energía representa El Emperador?',o:['Ordenar: los límites que dan estructura','Aprender: la enseñanza que da sentido','Elegir: la elección que nace del corazón'],a:0,e:'El Emperador ordena; El Hierofante enseña; Los Enamorados eligen.'},
 {q:'Las cabezas de carnero del trono de El Emperador hablan de…',o:['Aries: iniciativa y fuerza','La tentación','El acceso a lo sagrado'],a:0,e:'El carnero es el símbolo de Aries.'},
 {q:'¿Cuál es una sombra de El Emperador?',o:['Poner límites sanos','Necesidad de controlar','Construir bases firmes'],a:1,e:'Su sombra: rigidez, autoritarismo y necesidad de controlar.'},
 {q:'La mirada terapéutica de El Emperador habla de…',o:['La madre interior','El padre interior y la relación con la autoridad','La intuición'],a:1,e:'La forma en que te sostienes, te pones límites y te haces cargo de tu vida.'},
 {q:'Las llaves cruzadas de El Hierofante representan…',o:['El acceso a lo sagrado','El dominio del mundo material','La pasión'],a:0,e:'Y los dos discípulos, el saber que se transmite.'},
 {q:'Invertido, El Hierofante puede hablar de…',o:['Pertenecer a una comunidad','Buscar tu propia verdad','Aprender de una guía'],a:1,e:'Invertido: romper con las normas, buscar tu propia verdad o desconfiar de toda guía.'},
 {q:'El Hierofante invita a revisar…',o:['Las creencias que heredamos','Los límites del cuerpo','Las cartas invertidas'],a:0,e:'Cuáles nos sostienen y cuáles ya nos limitan.'},
 {q:'En Los Enamorados, ¿hacia dónde mira ella?',o:['Al hombre','Al ángel','Al árbol de llamas'],a:1,e:'Él la mira a ella, ella mira al ángel.'},
 {q:'¿Cuál es una sombra de Los Enamorados?',o:['Elegir para complacer','Vínculos sanos','Elegir con el corazón'],a:0,e:'Su sombra: dependencia emocional, indecisión y elegir para complacer.'},
 {q:'En la tirada de esta clase, ¿con cuántas cartas trabajas?',o:['Con las 4 de la clase pasada','Con las 7 cartas vistas','Con los 22 Mayores'],a:1,e:'De El Loco a Los Enamorados, derechas e invertidas.'}];
RICH.t3f3=()=>n3quiz('t5c3',T5Q3,['Dominas lo esencial de la Clase 3. ¡Ordenar, aprender y elegir!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 4 · Avanzar, sostener y mirar adentro ---------- */
const T5C4=N5P+'c4/';
(function(){const c=document.getElementById('t5-css');if(c)c.textContent+=`
.t5-path{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.t5-path button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:4px;justify-items:center;padding:6px;border-radius:12px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);transition:transform .2s,border-color .2s}
.t5-path button:hover{transform:translateY(-2px);border-color:var(--nb-gold)}.t5-path button:focus-visible{outline:2px solid var(--nb-gold)}
.t5-path button[aria-pressed="true"]{background:#1f3f32;color:#ece7d3;border-color:#1f3f32}
.t5-path img{width:100%;height:auto;border-radius:6px}
.t5-path small{font:600 .6rem/1.2 var(--f-caps);letter-spacing:.12em;text-transform:uppercase;text-align:center}
.t5-path .t5-fx{grid-column:1/-1;font:600 .62rem/1.2 var(--f-caps);letter-spacing:.18em;text-transform:uppercase;color:var(--nb-gold);padding-top:4px}
.t5-two{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:12px;align-items:center;justify-items:center}
.t5-two .ar{font:400 2rem/1 var(--f-display);color:var(--nb-gold)}
.t5-nums small{overflow-wrap:anywhere}
@media (max-width:560px){.t5-nums small{display:none}}
.t5-vj{display:grid;grid-template-columns:minmax(90px,130px) minmax(0,1fr);gap:16px;align-items:center}
@media (max-width:560px){.t5-vj{grid-template-columns:1fr}.t5-vj>.t5-path{width:110px;justify-self:center}}
@media (max-width:560px){.t5-path{grid-template-columns:repeat(5,minmax(0,1fr));gap:5px}.t5-path small{display:none}}
`})();
Object.assign(T5ARC,{
 carro:{n:'VII',t:'El Carro',img:T5C4+'carro.webp',alt:'El Carro del mazo Rider-Waite: un joven con corona y armadura de pie en un carro bajo un dosel de estrellas, con lunas en los hombros; lo tiran una esfinge negra y una blanca, sin riendas, y detrás queda una ciudad',
  lugar:'El Loco ya tiene identidad y valores, y <b>sale al mundo a conquistar su camino</b>. Es la última carta del mundo exterior.',
  kw:['Determinación','Avance','Dominio de sí','Victoria','Dirección'],
  im:[['Dos esfinges','Una negra y una blanca: fuerzas opuestas.',20,76],['Sin riendas','Guía con la voluntad, no con la fuerza.',72,50],['La ciudad atrás','Deja lo conocido para avanzar.',88,40],['El dosel de estrellas','Una guía que viene de lo alto.',25,10],['La corona y el laurel','El triunfo y el logro.',50,13],['Las lunas en los hombros','Las emociones que lo acompañan.',30,29]],
  caras:[['Avanzar con decisión','Tomar el control de tu rumbo','Enfocarte en tu meta'],['Querer controlarlo todo','Ganar a cualquier costo','Avanzar sin escuchar'],['Falta de dirección','Fuerzas internas en conflicto','Sentirse estancada']],
  mir:'El Carro enseña a <b>integrar los opuestos</b> que llevamos dentro, como la razón y la emoción, para avanzar con un solo rumbo.',
  q:'¿Hacia dónde quiero llevar mi vida y qué fuerzas internas necesito alinear?',ph:'Quiero llevar mi vida hacia… Necesito alinear…'},
 fuerza:{n:'VIII',t:'La Fuerza',img:T5C4+'fuerza.webp',alt:'La Fuerza del mazo Rider-Waite: una mujer de vestido blanco, con el símbolo del infinito sobre la cabeza y una cadena de flores, cierra con suavidad la boca de un león rojo; al fondo, una montaña',
  lugar:'Después de conquistar afuera, el Loco descubre la <b>fuerza interior</b>: acompañar su instinto con amor y paciencia. Abre el mundo interior.',
  kw:['Fuerza interior','Compasión','Paciencia','Coraje','Dominio amoroso'],
  im:[['El león','El instinto y las pasiones.',70,65],['Las manos suaves','Calma al león sin violencia.',38,54],['El infinito','El mismo del Mago: un poder sin límites.',18,20],['La cadena de flores','Un lazo de amor, no de fuerza.',58,38],['El vestido blanco','La pureza de la intención.',30,42],['La montaña al fondo','Una meta que se alcanza con calma.',9,68]],
  caras:[['Valentía con ternura','Paciencia contigo','Calmar tus miedos con amor'],['Reprimir emociones','Exigirte demasiado','Aparentar fortaleza'],['Inseguridad','Instinto desbordado','Agotamiento']],
  mir:'La Fuerza invita a <b>abrazar la propia sombra</b> en vez de pelear con ella. Lo que se acompaña con amor se calma; lo que se reprime vuelve con más fuerza.',
  q:'¿Qué parte de mí necesita ser abrazada en vez de controlada?',ph:'La parte de mí que necesita ser abrazada es…'},
 ermitano:{n:'IX',t:'El Ermitaño',img:T5C4+'ermitano.webp',alt:'El Ermitaño del mazo Rider-Waite: un anciano de manto gris y cabeza inclinada, en la cima nevada de una montaña, sostiene en alto una linterna con una estrella de seis puntas y se apoya en un bastón',
  lugar:'El Loco se retira del ruido del mundo para <b>buscar su propia verdad</b>. Su luz ya no viene de afuera: la lleva en la mano.',
  kw:['Introspección','Soledad elegida','Búsqueda','Sabiduría','Guía interior'],
  im:[['La linterna','Ilumina solo el paso siguiente.',8,33],['La estrella de seis puntas','La sabiduría que une cielo y tierra.',15,20],['El bastón','El apoyo de la experiencia.',40,62],['La cima nevada','Un logro alcanzado en soledad.',82,86],['El manto gris','Discreción y humildad.',62,55],['La cabeza inclinada','Mira hacia adentro y hacia abajo.',45,17]],
  caras:[['Retirarte para escucharte','Buscar tus propias respuestas','Guiar con el ejemplo'],['Aislamiento','Desconfianza','Encerrarse en sí misma'],['Soledad no elegida','Miedo a mirarse','No pedir ayuda']],
  mir:'El Ermitaño muestra que el tiempo a solas puede ser medicina. Es el encuentro con el <b>maestro interior</b>: la voz que sabe lo que necesitas.',
  q:'¿Qué respuesta estoy buscando afuera que ya sé por dentro?',ph:'Busco afuera… y por dentro ya sé que…'}});
const T5HOY4=[['carro','Avanzar','La voluntad que guía hacia la meta.','#c0442f'],['fuerza','Sostener','El coraje que abraza el instinto.','#9b6f27'],['ermitano','Mirar adentro','La luz que se busca en el silencio.','#4573a8']];
const T5TZ10=[...T5TZ7,'carro','fuerza','ermitano'];

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t4a1=()=>nbHero('Tarot Camino del Ser · Clase 4','<span style="font-size:.68em">Avanzar, sostener</span>','y mirar adentro','Clase 4 · Arcanos Mayores. El Carro, La Fuerza y El Ermitaño.',['Avanzar','Sostener','Mirar adentro'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${T5HOY4.map(y=>t5card({...t5full(T5ARC[y[0]]),sm:1})).join('')}</div>`);
RICH.t4a2=()=>dkH('Repaso de la semana','Estructura, enseñanza y elección','Antes de seguir, compartimos cómo fue la semana con tu carta del día.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['emperador','hierofante','enamorados'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué carta salió más en tu carta del día?</div>${chipRow('t4rc',T5TZ7.map(id=>t5arcOf(id).t),st('t4rc',-1))}`+
 n3area('t4rs','¿Cómo se reflejó en tu semana?','Esta semana…')+
 n3area('t4rr','¿Qué te quedó resonando de la clase 3?','Me quedó resonando…')+n3priv;
RICH.t4a3=()=>{const s=n3clamp(st('t4hy',0),0,2),x=T5HOY4[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','Tres pasos hacia adentro','Del mundo exterior al mundo interior: el Loco sale a conquistar su camino, descubre su <b>fuerza interior</b> y se retira a buscar su <b>propia luz</b>.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY4.map((y,i)=>`<button ${rxa('set','t4hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t} · ${s?'Mundo interior':'Mundo exterior'}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t4hy',s,3)}</div></div>
 <div class="dk-call">${ic('camino',18)} El Carro <b>cierra el mundo exterior</b>. La Fuerza y El Ermitaño <b>abren el mundo interior</b>.</div>`};

/* ----- 2, 3 y 4 · El Carro, La Fuerza y El Ermitaño ----- */
[['b','carro'],['c','fuerza'],['d','ermitano']].forEach(([l,id])=>{
 RICH['t4'+l+'1']=()=>t5Lugar(id,'Clase 4');
 RICH['t4'+l+'2']=()=>t5Lect(id);
 RICH['t4'+l+'3']=()=>t5Caras(id);
 RICH['t4'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Cierre del primer mes ----- */
// las 10 cartas como botones: el 0 al VII son el mundo exterior; VIII y IX abren el interior
const t5path=(key,s)=>`<div class="t5-path" role="group">${T5TZ10.map((id,i)=>{const a=t5arcOf(id);return `<button ${rxa('set',key,i)} ${pressed(i===s)} aria-label="${a.n} · ${a.t}"><img src="${a.img}" alt="" decoding="async"><small>${a.n}</small></button>`}).join('')}</div>`;
RICH.t4e1=()=>{const s=n3clamp(st('t4vj',0),0,9),a=t5arcOf(T5TZ10[s]);
 return dkH('Cierre del primer mes','Las 10 primeras cartas del viaje','Del Loco que se lanza al Ermitaño que mira hacia adentro: así se construye una persona antes de enfrentar los grandes cambios de la vida. Toca cada carta.')+t5path('t4vj',s)+
 `<div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail"><span class="eyebrow">Carta ${s+1} de 10 · ${s<8?'Mundo exterior':'Mundo interior'}</span><h3>${a.n} · ${a.t}</h3><p><b>Palabras clave:</b> ${a.kw.join(' · ')}.</p><p><b>Mensaje luminoso:</b> ${a.caras[0].join(' · ')}.</p>${t5nav('t4vj',s,10)}</div></div>`};
const T5LG=[['persona','Dónde estoy','Elige, entre las 10, la carta que muestra tu momento actual.'],['camino','Hacia dónde voy','Elige la carta que representa el paso que quieres dar.'],['grupo','Comparte','Cuenta qué necesitas para ir de una carta a la otra.']];
RICH.t4e2=()=>{const s=n3clamp(st('t4lg',0),0,2),x=T5LG[s],de=st('t4de',-1),ha=st('t4ha',-1),nm=i=>t5arcOf(T5TZ10[i]);
 return dkH('Ejercicio vivencial · en grupos pequeños','Mi lugar en el viaje','Tres pasos para ubicarte en el camino del Loco.')+
 `<div class="tl" style="grid-template-columns:repeat(3,minmax(0,1fr))">${T5LG.map((y,i)=>`<button ${rxa('set','t4lg',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${y[1]}</span></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">Paso ${s+1} de 3</span><h3>${ic(x[0],26)} ${x[1]}</h3><p>${x[2]}</p>${t5nav('t4lg',s,3,'Siguiente paso')}</div>
 <div class="dk-sub">Dónde estoy</div>${chipRow('t4de',T5TZ10.map(id=>t5arcOf(id).t),de)}
 <div class="dk-sub">Hacia dónde voy</div>${chipRow('t4ha',T5TZ10.map(id=>t5arcOf(id).t),ha)}`+
 (de>=0&&ha>=0?(de===ha?`<div class="dk-call warn">Elegiste la misma carta en los dos. ¿Qué paso quieres dar desde aquí?</div>`:
 `<div class="t5-two">${t5card({...t5full(nm(de)),sm:1})}<span class="ar" aria-hidden="true">→</span>${t5card({...t5full(nm(ha)),sm:1})}</div>
 <div class="dk-call">${ic('camino',18)} De <b>${nm(de).t}</b> (${nm(de).kw[0].toLowerCase()}) hacia <b>${nm(ha).t}</b> (${nm(ha).kw[0].toLowerCase()}).</div>`):'')+
 n3area('t4lq','Lo que necesito para ir de una carta a la otra','Para llegar ahí necesito…')+n3priv};
RICH.t4e3=()=>dkH('Práctica con tu mazo','Tirada de una carta','Ahora con las 10 cartas vistas. Practica con tu mazo y aquí mismo.')+
 n3ck('t4tp',[['','Baraja las 10 cartas vistas, derechas e invertidas.'],['','Pregunta: ¿qué me llevo de este primer mes?'],['','Saca una carta, muéstrala a la cámara y léela con tu ficha y con lo que sientes.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px">${T5TZ10.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué me llevo de este primer mes?</b></div>`+
 t5tirada('t4tz','Sacar una carta',T5TZ10)+n3area('t4tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
RICH.t4f1=()=>dkH('Para esta semana','Tu propia historia del Loco','Seguimos la carta del día, ahora con las 10 cartas, y escribimos el viaje como propio.')+
 n3ck('t4ta',[['libro','Completa las fichas de El Carro, La Fuerza y El Ermitaño.'],['sol','Cada mañana saca una carta entre las 10 vistas, derecha o invertida.'],['hoja','Escribe una página con el viaje del Loco del 0 al IX, contado como tu propia historia.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t4cd','Sacar mi carta del día',T5TZ10)+
 n3area('t4hl','Mi historia del Loco, del 0 al IX','Un día salí al camino como el Loco…')+n3priv;
RICH.t4f2=()=>dkH('Cerramos el primer mes','Próxima clase','Con estas 10 cartas cerramos el primer mes del viaje.')+
 `<div class="t5-cols">${[10,11,12].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('El Loco avanza, se sostiene con amor y <mark>busca su propia luz</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q4=[
 {q:'¿Qué lugar ocupa El Carro en el viaje del Loco?',o:['La última carta del mundo exterior','La primera del mundo interior','El final del viaje'],a:0,e:'El Carro cierra el mundo exterior; La Fuerza y El Ermitaño abren el interior.'},
 {q:'Las dos esfinges de El Carro, una negra y una blanca, representan…',o:['Fuerzas opuestas','El triunfo','Las emociones'],a:0,e:'Y las guía sin riendas: con la voluntad, no con la fuerza.'},
 {q:'¿Cuál es una sombra de El Carro?',o:['Enfocarte en tu meta','Ganar a cualquier costo','Avanzar con decisión'],a:1,e:'Su sombra: querer controlarlo todo, ganar a cualquier costo y avanzar sin escuchar.'},
 {q:'La mirada terapéutica de El Carro enseña a…',o:['Integrar los opuestos para avanzar con un solo rumbo','Retirarse del mundo','Reprimir las emociones'],a:0,e:'Como la razón y la emoción.'},
 {q:'En La Fuerza, ¿cómo calma la mujer al león?',o:['Con una cadena de hierro','Con manos suaves, sin violencia','Con un bastón'],a:1,e:'La cadena es de flores: un lazo de amor, no de fuerza.'},
 {q:'El símbolo del infinito sobre La Fuerza es el mismo de…',o:['El Mago','La Emperatriz','El Carro'],a:0,e:'Un poder sin límites.'},
 {q:'Invertida, La Fuerza puede hablar de…',o:['Paciencia contigo','Instinto desbordado','Valentía con ternura'],a:1,e:'Invertida: inseguridad, instinto desbordado y agotamiento.'},
 {q:'La linterna de El Ermitaño…',o:['Ilumina todo el camino','Ilumina solo el paso siguiente','Es un trofeo'],a:1,e:'Dentro brilla una estrella de seis puntas: la sabiduría que une cielo y tierra.'},
 {q:'¿Cuál es la diferencia entre la luz y la sombra de El Ermitaño?',o:['Soledad elegida frente a aislamiento','Avanzar frente a detenerse','Hablar frente a callar'],a:0,e:'Su luz es retirarse para escucharse; su sombra, el aislamiento y encerrarse en sí misma.'},
 {q:'En la tarea de esta semana escribes…',o:['Una carta a tu Ermitaño','El viaje del Loco del 0 al IX como tu propia historia','Las palabras clave de los 22 Mayores'],a:1,e:'Y sigues con tu carta del día entre las 10 vistas.'}];
RICH.t4f3=()=>n3quiz('t5c4',T5Q4,['Dominas lo esencial de la Clase 4. ¡Cerraste el primer mes!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 5 · Ciclos, equilibrio y entrega ---------- */
const T5C5=N5P+'c5/';
Object.assign(T5ARC,{
 rueda:{n:'X',t:'La Rueda de la Fortuna',img:T5C5+'rueda.webp',alt:'La Rueda de la Fortuna del mazo Rider-Waite: una gran rueda con letras entre las nubes, una esfinge con espada arriba, Anubis que sube por la derecha, una serpiente que baja por la izquierda y cuatro seres alados que leen libros en las esquinas',
  lugar:'Después del retiro del Ermitaño, el Loco comprende que <b>la vida se mueve en ciclos</b>: lo que sube baja, y lo que baja vuelve a subir.',
  kw:['Ciclos','Cambio','Destino','Oportunidad','Fluir'],
  im:[['La rueda con letras','TARO y ROTA: la vida es una rueda que gira.',50,37],['La esfinge arriba','El centro sereno en medio del cambio.',45,15],['Anubis que sube','Lo que asciende y renace.',85,55],['La serpiente que baja','Lo que desciende y se suelta.',12,55],['Los cuatro seres alados','Leen sus libros: aprender del cambio.',22,13],['Las nubes','Lo que no depende de nosotras.',88,34]],
  caras:[['Aceptar los ciclos','Aprovechar una oportunidad','Fluir con el cambio'],['Querer controlar lo incontrolable','Sentirse víctima del destino','Repetir los mismos ciclos'],['Resistencia al cambio','Un ciclo que se estanca','Sensación de mala racha']],
  mir:'La Rueda enseña que <b>nada es permanente</b>: los ciclos se repiten hasta que aprendemos lo que vienen a mostrarnos.',
  q:'¿Qué ciclo se repite en mi vida y qué me está pidiendo aprender?',ph:'El ciclo que se repite es… y me pide aprender…'},
 justicia:{n:'XI',t:'La Justicia',img:T5C5+'justicia.webp',alt:'La Justicia del mazo Rider-Waite: una figura coronada y de manto rojo, sentada entre dos columnas, sostiene una espada alzada en una mano y una balanza en la otra; asoma un pie blanco bajo el manto',
  lugar:'El Loco mira con honestidad <b>sus actos y sus consecuencias</b>. Aprende a equilibrar lo que da y lo que recibe.',
  kw:['Equilibrio','Verdad','Responsabilidad','Causa y efecto','Claridad'],
  im:[['La balanza','Pesar con equilibrio antes de decidir.',88,58],['La espada alzada','La claridad que corta y decide.',17,18],['Los ojos abiertos','No es ciega: ve la verdad.',46,35],['El pie blanco','La decisión que pasa a la acción.',45,83],['Las dos columnas','Los opuestos, como en La Sacerdotisa.',8,65],['La corona','Una mente clara que gobierna.',50,22]],
  caras:[['Actuar con honestidad','Asumir mis decisiones','Buscar el equilibrio'],['Juzgar con dureza','Exigirme perfección','Vivir cargando culpas'],['Desequilibrio','Evitar responsabilidades','Autoengaño']],
  mir:'La Justicia invita a hacernos <b>responsables de lo que elegimos, sin culpa</b>: cada acto tiene un efecto y de cada efecto podemos aprender.',
  q:'¿Dónde necesito recuperar el equilibrio entre lo que doy y lo que recibo?',ph:'Necesito recuperar el equilibrio en…'},
 colgado:{n:'XII',t:'El Colgado',img:T5C5+'colgado.webp',alt:'El Colgado del mazo Rider-Waite: un hombre cuelga cabeza abajo de un árbol con hojas, atado de un pie, con las piernas en cruz, las manos atrás y una aureola dorada alrededor de su rostro sereno',
  lugar:'El Loco descubre que no todo se resuelve actuando: a veces hay que <b>detenerse, soltar el control</b> y mirar la vida desde otro ángulo.',
  kw:['Pausa','Entrega','Nueva perspectiva','Soltar','Rendición consciente'],
  im:[['Cabeza abajo','Ver el mundo desde otro ángulo.',50,50],['El rostro sereno','No sufre: elige estar ahí.',44,77],['La aureola','La comprensión que llega al soltar.',72,68],['El árbol con hojas','La vida sigue creciendo en la pausa.',12,15],['Las piernas en cruz','Forman un 4: estabilidad al detenerse.',58,35],['Las manos atrás','Deja de hacer y se entrega.',25,62]],
  caras:[['Hacer una pausa consciente','Mirar desde otro lugar','Soltar el control'],['Sacrificarme de más','Postergarme siempre','Quedarme esperando'],['Resistirse a soltar','Una pausa que se alarga','Sacrificio sin sentido']],
  mir:'El Colgado enseña que <b>la pausa también es camino</b>: cuando dejamos de forzar, aparece una nueva forma de ver.',
  q:'¿Qué estoy forzando y qué vería distinto si lo soltara?',ph:'Estoy forzando… Si lo soltara, vería…'}});
const T5HOY5=[['rueda','Fluir','Los ciclos que no controlamos.','#c0442f'],['justicia','Equilibrar','La responsabilidad de lo que elijo.','#9b6f27'],['colgado','Entregarse','Una nueva mirada al soltar.','#4573a8']];
const T5TZ13=[...T5TZ10,'rueda','justicia','colgado'];

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t5a1=()=>nbHero('Tarot Camino del Ser · Clase 5','<span style="font-size:.68em">Ciclos, equilibrio</span>','y entrega','Clase 5 · Arcanos Mayores. La Rueda de la Fortuna, La Justicia y El Colgado.',['Fluir','Equilibrar','Entregarse'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${T5HOY5.map(y=>t5card({...t5full(T5ARC[y[0]]),sm:1})).join('')}</div>`);
RICH.t5a2=()=>dkH('Repaso de la semana','Avanzar, sostener y mirar adentro','Antes de seguir, compartimos cómo fue la semana con tu carta del día y tu historia del Loco.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['carro','fuerza','ermitano'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué carta salió más en tu carta del día?</div>${chipRow('t5rc',T5TZ10.map(id=>t5arcOf(id).t),st('t5rc',-1))}`+
 n3area('t5rh','¿Cómo te fue escribiendo tu historia del Loco?','Al escribir mi historia…')+
 n3area('t5rr','¿Qué te quedó resonando de la clase 4?','Me quedó resonando…')+n3priv;
RICH.t5a3=()=>{const s=n3clamp(st('t5hy',0),0,2),x=T5HOY5[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','Tres leyes de la vida','La vida gira, la vida enseña: el Loco aprende que todo se mueve en <b>ciclos</b>, que cada acto tiene un <b>efecto</b> y que a veces avanzar es <b>soltar</b>.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY5.map((y,i)=>`<button ${rxa('set','t5hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t5hy',s,3)}</div></div>
 <div class="dk-call">${ic('espiral',18)} La Rueda <b>gira</b>, La Justicia <b>equilibra</b> y El Colgado <b>suelta</b> para ver distinto.</div>`};

/* ----- 2, 3 y 4 · La Rueda de la Fortuna, La Justicia y El Colgado ----- */
[['b','rueda'],['c','justicia'],['d','colgado']].forEach(([l,id])=>{
 RICH['t5'+l+'1']=()=>t5Lugar(id,'Clase 5');
 RICH['t5'+l+'2']=()=>t5Lect(id);
 RICH['t5'+l+'3']=()=>t5Caras(id);
 RICH['t5'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Práctica con tu mazo ----- */
const T5CI=[['ojo','Observa','Mira La Rueda en silencio y cuenta lo que ves.','rueda','Veo…'],['espiral','Reconoce','Nombra un ciclo que se repite en tu vida.','rueda','Un ciclo que se repite en mi vida es…'],['luna','Mira distinto','Como El Colgado, ¿qué verías si lo miraras desde otro lugar?','colgado','Si lo mirara desde otro lugar, vería…']];
RICH.t5e1=()=>{const s=n3clamp(st('t5ci',0),0,2),x=T5CI[s],a=T5ARC[x[3]];
 return dkH('Ejercicio vivencial · en grupos pequeños','La rueda de mis ciclos','Tres pasos para mirar un ciclo de tu vida. Anota lo tuyo y compártelo en tu grupo.')+
 `<div class="tl" style="grid-template-columns:repeat(3,minmax(0,1fr))">${T5CI.map((y,i)=>`<button ${rxa('set','t5ci',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${y[1]}</span></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div style="display:grid;gap:10px"><div class="detail"><span class="eyebrow">Paso ${s+1} de 3 · ${a.t}</span><h3>${ic(x[0],26)} ${x[1]}</h3><p>${x[2]}</p>${t5nav('t5ci',s,3,'Siguiente paso')}</div>${n3area('t5cw'+s,x[1],x[4])}</div></div>`+n3priv};
RICH.t5e2=()=>dkH('Práctica con tu mazo','Tirada de una carta','Ahora con las 13 cartas vistas, del 0 al XII. Practica con tu mazo y aquí mismo.')+
 n3ck('t5tp',[['','Baraja las 13 cartas vistas, del 0 al XII, derechas e invertidas.'],['','Pregunta: ¿qué ciclo estoy viviendo hoy?'],['','Saca una carta, muéstrala a la cámara y léela con tu ficha y con lo que sientes.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px">${T5TZ13.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué ciclo estoy viviendo hoy?</b></div>`+
 t5tirada('t5tz','Sacar una carta',T5TZ13)+n3area('t5tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
// las tres preguntas usan las mismas notas que la mirada terapéutica de cada carta
RICH.t5f1=()=>dkH('Para esta semana','Observar mis ciclos','Seguimos la carta del día, ahora con las 13 cartas, y respondemos las preguntas de hoy.')+
 n3ck('t5ta',[['libro','Completa las fichas de La Rueda de la Fortuna, La Justicia y El Colgado.'],['sol','Cada mañana saca una carta entre las 13 vistas, derecha o invertida.'],['hoja','Responde en tu cuaderno las tres preguntas de autoconocimiento de hoy.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t5cd','Sacar mi carta del día',T5TZ13)+
 `<div class="dk-sub">Las tres preguntas de hoy</div>`+T5HOY5.map(y=>{const a=T5ARC[y[0]];return n3area('t5mq'+y[0],a.n+' · '+a.q,a.ph)}).join('')+n3priv;
RICH.t5f2=()=>dkH('Lo que gira también enseña','Próxima clase','Seguimos el viaje hacia las grandes transformaciones.')+
 `<div class="t5-cols">${[13,14,15].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('La vida gira, la vida enseña: <mark>a veces avanzar es soltar</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q5=[
 {q:'¿Qué ley de la vida representa La Rueda de la Fortuna?',o:['Fluir: los ciclos que no controlamos','Equilibrar: la responsabilidad de lo que elijo','Entregarse: una nueva mirada al soltar'],a:0,e:'La Rueda gira, La Justicia equilibra y El Colgado suelta para ver distinto.'},
 {q:'En La Rueda, Anubis que sube y la serpiente que baja hablan de…',o:['Lo que asciende y renace, y lo que desciende y se suelta','Dos fuerzas en guerra','El bien y el mal'],a:0,e:'Lo que sube baja, y lo que baja vuelve a subir.'},
 {q:'¿Cuál es una sombra de La Rueda?',o:['Aprovechar una oportunidad','Sentirse víctima del destino','Fluir con el cambio'],a:1,e:'Su sombra: querer controlar lo incontrolable, sentirse víctima del destino y repetir los mismos ciclos.'},
 {q:'La mirada terapéutica de La Rueda dice que los ciclos se repiten…',o:['Para castigarnos','Hasta que aprendemos lo que vienen a mostrarnos','Siempre igual, sin sentido'],a:1,e:'Nada es permanente.'},
 {q:'¿Por qué La Justicia de este mazo tiene los ojos abiertos?',o:['Porque no es ciega: ve la verdad','Porque desconfía','Porque vigila a los demás'],a:0,e:'Y el pie blanco que asoma es la decisión que pasa a la acción.'},
 {q:'¿Cuál es una sombra de La Justicia?',o:['Asumir mis decisiones','Vivir cargando culpas','Actuar con honestidad'],a:1,e:'Su sombra: juzgar con dureza, exigirme perfección y vivir cargando culpas.'},
 {q:'La Justicia invita a hacernos responsables de lo que elegimos…',o:['Con culpa','Sin culpa','Solo cuando nos equivocamos'],a:1,e:'Cada acto tiene un efecto y de cada efecto podemos aprender.'},
 {q:'Las piernas en cruz de El Colgado forman…',o:['Una X','Un 4: estabilidad al detenerse','Un triángulo'],a:1,e:'Cabeza abajo, ve el mundo desde otro ángulo.'},
 {q:'El rostro de El Colgado está…',o:['Sereno: elige estar ahí','Sufriendo','Enojado'],a:0,e:'No sufre: la aureola es la comprensión que llega al soltar.'},
 {q:'En la tirada de esta clase, ¿con cuántas cartas trabajas?',o:['Con las 10 de la clase pasada','Con las 13 cartas vistas, del 0 al XII','Con los 22 Mayores'],a:1,e:'Derechas e invertidas.'}];
RICH.t5f3=()=>n3quiz('t5c5',T5Q5,['Dominas lo esencial de la Clase 5. ¡Fluir, equilibrar y entregarse!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 6 · Transformación, sanación y sombra ---------- */
const T5C6=N5P+'c6/';
Object.assign(T5ARC,{
 muerte:{n:'XIII',t:'La Muerte',img:T5C6+'muerte.webp',alt:'La Muerte del mazo Rider-Waite: un esqueleto con armadura monta un caballo blanco y lleva una bandera negra con una rosa blanca; a sus pies, un rey caído, una niña y un obispo; al fondo, el sol entre dos torres',
  lugar:'Después de la pausa del Colgado, el Loco <b>deja morir lo que ya cumplió su ciclo</b>. No es un final: es una transformación profunda.',
  kw:['Transformación','Cierre de ciclo','Soltar','Renacer','Desapego'],
  im:[['El jinete esqueleto','Lo esencial que queda cuando todo cae.',25,20],['El caballo blanco','Un cambio que avanza con pureza.',55,38],['La rosa blanca','En la bandera: la vida que renace.',62,14],['El rey caído','Ningún poder detiene el cambio.',20,82],['La niña y el obispo','Formas distintas de recibir el final.',82,62],['El sol en el horizonte','Después de la noche, amanece.',86,38]],
  caras:[['Cerrar un ciclo','Dejar ir lo que ya no sirve','Abrir espacio a lo nuevo'],['Miedo a los finales','Aferrarse al pasado','Duelos que no se viven'],['Resistencia al cambio','Un final que se posterga','Quedarse en lo que ya terminó']],
  mir:'La Muerte enseña que <b>para renacer hay que dejar morir algo</b>: una etapa, una creencia, una forma de ser que ya no nos representa.',
  q:'¿Qué parte de mi vida necesita morir para que yo pueda renacer?',ph:'Necesita morir… para que yo pueda renacer como…'},
 templanza:{n:'XIV',t:'La Templanza',img:T5C6+'templanza.webp',alt:'La Templanza del mazo Rider-Waite: un ángel de alas rojas y túnica blanca, con un triángulo dentro de un cuadrado en el pecho, pasa agua de una copa a otra con un pie en el agua y otro en la tierra; un camino sube entre montañas hacia el sol y crecen lirios junto al agua',
  lugar:'Después de soltar, el Loco <b>se sana</b>: mezcla lo viejo y lo nuevo, la emoción y la razón, y encuentra su punto medio. Es la última carta del mundo interior.',
  kw:['Sanación','Equilibrio','Paciencia','Integración','Armonía'],
  im:[['El ángel','Lo sagrado que habita en nosotras.',50,16],['Las dos copas','El agua que pasa de una a otra: mezclar.',72,40],['Un pie en el agua','Y otro en la tierra: emoción y materia.',50,83],['El triángulo','Dentro del cuadrado: el espíritu en el cuerpo.',47,30],['El camino','Sube hacia la luz entre las montañas.',18,68],['Los lirios','Flores que crecen junto al agua: renovación.',80,55]],
  caras:[['Sanar con paciencia','Encontrar el punto medio','Integrar lo vivido'],['Ir a los extremos','Querer sanar a la fuerza','Calmar a todos menos a mí'],['Desequilibrio','Impaciencia','Excesos']],
  mir:'La Templanza nos recuerda que <b>sanar lleva tiempo</b>: se trata de unir nuestras partes con suavidad, sin forzar, hasta que vuelven a fluir juntas.',
  q:'¿Qué necesito integrar en mí para sentirme en equilibrio?',ph:'Para sentirme en equilibrio necesito integrar…'},
 diablo:{n:'XV',t:'El Diablo',img:T5C6+'diablo.webp',alt:'El Diablo del mazo Rider-Waite: una figura con cuernos y alas de murciélago, sentada sobre un pedestal ante un fondo negro, sostiene una antorcha hacia abajo; a sus pies, una pareja con cuernos y colas, atada con cadenas sueltas al cuello',
  lugar:'Ya sanado, el Loco entra al mundo espiritual y <b>se encuentra con su sombra</b>: los apegos, miedos y deseos que lo atan.',
  kw:['Sombra','Apego','Deseo','Dependencia','Liberación'],
  im:[['Las cadenas sueltas','Podrían quitárselas: la atadura es elegida.',60,58],['La pareja','Los Enamorados, ahora atados al deseo.',22,62],['Cuernos y colas','El instinto que toma el control.',28,12],['La antorcha hacia abajo','Una energía que se usa para atarnos.',85,68],['El pedestal','Lo que ponemos por encima de nosotras.',45,67],['El fondo negro','Lo que no queremos ver de nosotras.',12,40]],
  caras:[['Reconocer mi sombra','Usar el deseo como motor','Abrazar mi poder personal'],['Apegos y dependencias','Vínculos que atan','Patrones que se repiten'],['Romper una cadena','Darse cuenta de un apego','Comenzar a liberarse']],
  mir:'El Diablo nos invita a <b>mirar nuestra sombra sin juicio</b>: lo que reconocemos podemos transformarlo, y lo que negamos nos sigue atando.',
  q:'¿Qué me ata hoy y qué necesito para soltar esa cadena?',ph:'Hoy me ata… Para soltar esa cadena necesito…'}});
const T5HOY6=[['muerte','Soltar','Lo que termina para que algo nazca.','#5b5b5b'],['templanza','Integrar','La sanación que mezcla y equilibra.','#4573a8'],['diablo','Liberarse','Mirar la sombra que nos ata.','#c0442f']];
const T5TZ16=[...T5TZ13,'muerte','templanza','diablo'];

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t6a1=()=>nbHero('Tarot Camino del Ser · Clase 6','<span style="font-size:.68em">Transformación, sanación</span>','y sombra','Clase 6 · Arcanos Mayores. La Muerte, La Templanza y El Diablo.',['Soltar','Integrar','Liberarse'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${T5HOY6.map(y=>t5card({...t5full(T5ARC[y[0]]),sm:1})).join('')}</div>`);
RICH.t6a2=()=>dkH('Repaso de la semana','Ciclos, equilibrio y entrega','Antes de seguir, compartimos cómo fue la semana con tu carta del día y tus ciclos.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['rueda','justicia','colgado'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué carta salió más en tu carta del día?</div>${chipRow('t6rc',T5TZ13.map(id=>t5arcOf(id).t),st('t6rc',-1))}`+
 n3area('t6rh','¿Qué ciclo observaste en tu semana?','Esta semana observé el ciclo de…')+
 n3area('t6rr','¿Qué te quedó resonando de la clase 5?','Me quedó resonando…')+n3priv;
RICH.t6a3=()=>{const s=n3clamp(st('t6hy',0),0,2),x=T5HOY6[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','Tres pasos de transformación','Soltar, integrar y mirar la sombra: el Loco deja morir lo que ya cumplió su ciclo, encuentra su <b>equilibrio</b> y se atreve a mirar aquello que lo <b>ata</b>.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY6.map((y,i)=>`<button ${rxa('set','t6hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t6hy',s,3)}</div></div>
 <div class="dk-call">${ic('espiral',18)} La Muerte <b>suelta</b>, La Templanza <b>sana</b> y El Diablo muestra lo que aún nos <b>ata</b>.</div>`};

/* ----- 2, 3 y 4 · La Muerte, La Templanza y El Diablo ----- */
[['b','muerte'],['c','templanza'],['d','diablo']].forEach(([l,id])=>{
 RICH['t6'+l+'1']=()=>t5Lugar(id,'Clase 6');
 RICH['t6'+l+'2']=()=>t5Lect(id);
 RICH['t6'+l+'3']=()=>t5Caras(id);
 RICH['t6'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Práctica con tu mazo ----- */
const T5SSL=[['muerte','Lo que suelto','Algo que ya cumplió su ciclo.','Suelto…'],['templanza','Lo que integro','Lo que quiero sanar en mí.','Quiero sanar en mí…'],['diablo','Lo que me ata','Una cadena que estoy lista para soltar.','Estoy lista para soltar la cadena de…']];
RICH.t6e1=()=>{const s=n3clamp(st('t6ss',0),0,2),x=T5SSL[s],a=T5ARC[x[0]];
 return dkH('Ejercicio vivencial · en grupos pequeños','Soltar, sanar y liberar','Con cada carta de hoy, anota lo tuyo y compártelo en tu grupo.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5SSL.map((y,i)=>`<button ${rxa('set','t6ss',i)} ${pressed(i===s)}><b>${y[1]}</b><small>Con ${T5ARC[y[0]].t}: ${y[2].charAt(0).toLowerCase()+y[2].slice(1)}</small>${st('t6sw'+i,'').trim()?`<small>${ic('check',14)} Anotado</small>`:''}</button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div style="display:grid;gap:10px"><div class="detail"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t6ss',s,3)}</div>${n3area('t6sw'+s,x[1],x[3])}</div></div>`+n3priv};
RICH.t6e2=()=>dkH('Práctica con tu mazo','Tirada de una carta','Ahora con las 16 cartas vistas, del 0 al XV. Practica con tu mazo y aquí mismo.')+
 n3ck('t6tp',[['','Baraja las 16 cartas vistas, del 0 al XV, derechas e invertidas.'],['','Pregunta: ¿qué estoy lista para transformar?'],['','Saca una carta, muéstrala a la cámara y léela con tu ficha y con lo que sientes.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px">${T5TZ16.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué estoy lista para transformar?</b></div>`+
 t5tirada('t6tz','Sacar una carta',T5TZ16)+n3area('t6tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
RICH.t6f1=()=>dkH('Para esta semana','Un pequeño ritual de cierre','Seguimos la carta del día, ahora con las 16 cartas, y nos despedimos de algo que elegimos soltar.')+
 n3ck('t6ta',[['libro','Completa las fichas de La Muerte, La Templanza y El Diablo.'],['sol','Cada mañana saca una carta entre las 16 vistas, derecha o invertida.'],['hoja','Escribe una carta de despedida a algo que hoy eliges soltar.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t6cd','Sacar mi carta del día',T5TZ16)+
 (st('t6sw0','').trim()?`<div class="dk-call">${ic('hoja',18)} En el ejercicio anotaste lo que sueltas: <b>${esc(st('t6sw0','').trim())}</b></div>`:'')+
 n3area('t6cs','Mi carta de despedida','Querido/a… hoy elijo soltarte porque…')+n3priv;
RICH.t6f2=()=>dkH('Lo que soltamos nos libera','Próxima clase','Seguimos el viaje por el mundo espiritual.')+
 `<div class="t5-cols">${[16,17,18].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('Soltar, integrar y mirar la sombra: <mark>lo que soltamos nos libera</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q6=[
 {q:'¿Qué representa La Muerte en el viaje del Loco?',o:['Un final sin vuelta','Una transformación profunda: dejar morir lo que cumplió su ciclo','Un castigo'],a:1,e:'No es un final: es una transformación profunda.'},
 {q:'La rosa blanca en la bandera de La Muerte habla de…',o:['La vida que renace','La guerra','El poder del rey'],a:0,e:'Y el sol en el horizonte: después de la noche, amanece.'},
 {q:'¿Cuál es una sombra de La Muerte?',o:['Cerrar un ciclo','Aferrarse al pasado','Abrir espacio a lo nuevo'],a:1,e:'Su sombra: miedo a los finales, aferrarse al pasado y duelos que no se viven.'},
 {q:'¿Qué lugar ocupa La Templanza en el viaje?',o:['La primera carta del mundo exterior','La última carta del mundo interior','El final del viaje'],a:1,e:'Después de soltar, el Loco se sana y encuentra su punto medio.'},
 {q:'El ángel de La Templanza tiene un pie en el agua y otro en la tierra. Eso habla de…',o:['Emoción y materia','Duda','Huida'],a:0,e:'Y el agua que pasa de una copa a otra: mezclar.'},
 {q:'¿Cuál es una sombra de La Templanza?',o:['Sanar con paciencia','Calmar a todos menos a mí','Integrar lo vivido'],a:1,e:'Su sombra: ir a los extremos, querer sanar a la fuerza y calmar a todos menos a mí.'},
 {q:'En El Diablo, las cadenas están sueltas. ¿Qué nos dicen?',o:['Que no hay salida','Que podrían quitárselas: la atadura es elegida','Que el Diablo es más fuerte'],a:1,e:'Lo que reconocemos podemos transformarlo.'},
 {q:'La pareja de El Diablo recuerda a…',o:['Los Enamorados, ahora atados al deseo','El Emperador y la Emperatriz','La niña y el obispo'],a:0,e:'La misma pareja, ahora con cuernos y colas.'},
 {q:'Invertido, El Diablo puede hablar de…',o:['Apegos y dependencias','Romper una cadena','Vínculos que atan'],a:1,e:'Invertido: romper una cadena, darse cuenta de un apego y comenzar a liberarse.'},
 {q:'En la tarea de esta semana escribes…',o:['Tu historia del Loco','Una carta de despedida a algo que eliges soltar','Las palabras clave de las 16 cartas'],a:1,e:'Un pequeño ritual de cierre.'}];
RICH.t6f3=()=>n3quiz('t5c6',T5Q6,['Dominas lo esencial de la Clase 6. ¡Soltar, integrar y liberarse!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 7 · Ruptura, esperanza y mundo emocional ---------- */
const T5C7=N5P+'c7/';
Object.assign(T5ARC,{
 torre:{n:'XVI',t:'La Torre',img:T5C7+'torre.webp',alt:'La Torre del mazo Rider-Waite: un rayo golpea una torre alta sobre una roca, la corona de su cima cae, salen llamas por las ventanas y dos figuras caen al vacío entre gotas de luz',
  lugar:'Después de ver su sombra, el Loco vive <b>una sacudida</b>: se derrumba lo que estaba construido sobre bases falsas.',
  kw:['Ruptura','Revelación','Cambio repentino','Liberación','Despertar'],
  im:[['El rayo','Una verdad que llega de golpe.',82,14],['La corona que cae','El ego pierde el control.',28,8],['Las dos figuras','Caen de lo que creían seguro.',18,58],['Las llamas','El fuego que limpia y purifica.',68,22],['Las gotas de luz','En medio de la caída, cae también luz.',10,40],['La roca','Una torre alta, aislada y rígida.',55,80]],
  caras:[['Ver la verdad','Liberarse de lo falso','Reconstruir sobre bases reales'],['Miedo al caos','Sostener lo insostenible','Vivir en alerta'],['Evitar una crisis necesaria','Un cambio interno silencioso','Postergar lo inevitable']],
  mir:'La Torre enseña que <b>algunas crisis son despertares</b>: lo que se derrumba abre espacio para construir una vida más verdadera.',
  q:'¿Qué estructura de mi vida necesita caer para que pueda ser más yo?',ph:'Necesita caer… para que pueda ser más yo.'},
 estrella:{n:'XVII',t:'La Estrella',img:T5C7+'estrella.webp',alt:'La Estrella del mazo Rider-Waite: una mujer desnuda, con una rodilla en la tierra y un pie en el agua, vierte dos cántaros sobre el estanque y la tierra, bajo una gran estrella y siete estrellas blancas; un ave se posa en un árbol',
  lugar:'Después de la tormenta, el Loco <b>se queda sin máscaras</b>. En la calma vuelve la esperanza y la conexión con algo más grande.',
  kw:['Esperanza','Renovación','Fe','Autenticidad','Inspiración'],
  im:[['La mujer desnuda','Sin máscaras: vulnerable y auténtica.',55,46],['Los dos cántaros','Da al agua y a la tierra: nutre todo.',86,50],['La gran estrella','Una guía que brilla después de la noche.',47,17],['Las siete estrellas','Los chakras que vuelven a encenderse.',15,10],['Un pie en el agua','Y la rodilla en la tierra: equilibrio.',42,72],['El ave en el árbol','El pensamiento que se eleva.',85,30]],
  caras:[['Recuperar la esperanza','Mostrarme tal como soy','Confiar en la vida'],['Esperar sin actuar','Dar sin recibir','Idealizar el futuro'],['Desesperanza','Desconexión','Dudar de mí misma']],
  mir:'La Estrella nos muestra que <b>después de cada crisis hay sanación</b>: cuando nos mostramos tal como somos, la vida vuelve a fluir.',
  q:'¿Qué me devuelve la esperanza y cómo puedo cuidarlo?',ph:'Me devuelve la esperanza… y puedo cuidarlo…'},
 luna:{n:'XVIII',t:'La Luna',img:T5C7+'luna.webp',alt:'La Luna del mazo Rider-Waite: una luna con rostro brilla entre dos torres; abajo, un perro y un lobo le aúllan, un cangrejo sale de un estanque y un camino se pierde hacia las montañas',
  lugar:'Guiado por la Estrella, el Loco <b>entra en la noche</b>: el mundo de las emociones, los sueños y los miedos que aún no ve con claridad.',
  kw:['Intuición','Emociones','Sueños','Inconsciente','Incertidumbre'],
  im:[['La luna con rostro','Una luz suave que no lo muestra todo.',55,22],['El perro y el lobo','Lo domesticado y lo salvaje en nosotras.',35,57],['El cangrejo','Sale del agua: lo que emerge del inconsciente.',45,82],['El camino','Sigue entre las torres hacia las montañas.',56,68],['Las dos torres','El umbral hacia lo desconocido.',12,42],['El estanque','El mundo emocional profundo.',20,80]],
  caras:[['Escuchar mi intuición','Honrar mis emociones','Prestar atención a los sueños'],['Miedos sin nombre','Confusión','Engañarme a mí misma'],['La niebla empieza a disiparse','Un miedo que sale a la luz','Claridad que llega de a poco']],
  mir:'La Luna nos invita a <b>atravesar la noche emocional sin huir</b>: los miedos pierden fuerza cuando los miramos, y la intuición nos guía donde la razón no alcanza.',
  q:'¿Qué emoción estoy evitando sentir y qué me diría si la escuchara?',ph:'Estoy evitando sentir… y si la escuchara me diría…'}});
const T5HOY7=[['torre','Despertar','Lo falso que se derrumba.','#c0442f'],['estrella','Confiar','La esperanza que vuelve.','#4573a8'],['luna','Sentir','El mundo emocional y la intuición.','#9b6f27']];
const T5TZ19=[...T5TZ16,'torre','estrella','luna'];

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t7a1=()=>nbHero('Tarot Camino del Ser · Clase 7','<span style="font-size:.68em">Ruptura, esperanza</span>','y mundo emocional','Clase 7 · Arcanos Mayores. La Torre, La Estrella y La Luna.',['Despertar','Confiar','Sentir'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${T5HOY7.map(y=>t5card({...t5full(T5ARC[y[0]]),sm:1})).join('')}</div>`);
RICH.t7a2=()=>dkH('Repaso de la semana','Transformación, sanación y sombra','Antes de seguir, compartimos cómo fue la semana con tu carta del día y tu ritual de cierre.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['muerte','templanza','diablo'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué carta salió más en tu carta del día?</div>${chipRow('t7rc',T5TZ16.map(id=>t5arcOf(id).t),st('t7rc',-1))}`+
 n3area('t7rh','¿Cómo te sentiste al escribir tu carta de despedida?','Al escribirla me sentí…')+
 n3area('t7rr','¿Qué te quedó resonando de la clase 6?','Me quedó resonando…')+n3priv;
RICH.t7a3=()=>{const s=n3clamp(st('t7hy',0),0,2),x=T5HOY7[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','De la sacudida a la intuición','Después de la tormenta, la luz: el Loco ve caer lo que no era verdadero, recupera la <b>esperanza</b> y aprende a atravesar la <b>noche de sus emociones</b>.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY7.map((y,i)=>`<button ${rxa('set','t7hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t7hy',s,3)}</div></div>
 <div class="dk-call">${ic('estrella',18)} La Torre <b>derrumba</b>, La Estrella <b>renueva</b> y La Luna nos <b>guía</b> por lo que aún no vemos.</div>`};

/* ----- 2, 3 y 4 · La Torre, La Estrella y La Luna ----- */
[['b','torre'],['c','estrella'],['d','luna']].forEach(([l,id])=>{
 RICH['t7'+l+'1']=()=>t5Lugar(id,'Clase 7');
 RICH['t7'+l+'2']=()=>t5Lect(id);
 RICH['t7'+l+'3']=()=>t5Caras(id);
 RICH['t7'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Práctica con tu mazo ----- */
const T5TEL=[['torre','Mi torre','Recuerda algo que se derrumbó en tu vida.','Se derrumbó…'],['estrella','Mi estrella','¿Qué nació o se aclaró después de esa caída?','Después de esa caída nació…'],['luna','Mi luna','¿Qué te dijo tu intuición en ese momento?','Mi intuición me dijo…']];
RICH.t7e1=()=>{const s=n3clamp(st('t7te',0),0,2),x=T5TEL[s],a=T5ARC[x[0]];
 return dkH('Ejercicio vivencial · en grupos pequeños','Mi tormenta y mi estrella','Con cada carta de hoy, anota lo tuyo y compártelo en tu grupo.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5TEL.map((y,i)=>`<button ${rxa('set','t7te',i)} ${pressed(i===s)}><span class="k" style="font-size:2rem">${i+1}</span><b>${y[1]}</b><small>${T5ARC[y[0]].t}</small>${st('t7tw'+i,'').trim()?`<small>${ic('check',14)} Anotado</small>`:''}</button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div style="display:grid;gap:10px"><div class="detail"><span class="eyebrow">Paso ${s+1} de 3 · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t7te',s,3)}</div>${n3area('t7tw'+s,x[1],x[3])}</div></div>`+n3priv};
RICH.t7e2=()=>dkH('Práctica con tu mazo','Tirada de una carta','Ahora con las 19 cartas vistas, del 0 al XVIII. Practica con tu mazo y aquí mismo.')+
 n3ck('t7tp',[['','Baraja las 19 cartas vistas, del 0 al XVIII, derechas e invertidas.'],['','Pregunta: ¿qué me quiere mostrar mi intuición hoy?'],['','Saca una carta, muéstrala a la cámara y léela con tu ficha y con lo que sientes.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(60px,1fr));gap:8px">${T5TZ19.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué me quiere mostrar mi intuición hoy?</b></div>`+
 t5tirada('t7tz','Sacar una carta',T5TZ19)+n3area('t7tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
const T5EMO=['Calma','Alegría','Tristeza','Miedo','Enojo','Confusión','Nostalgia','Esperanza'];
RICH.t7f1=()=>dkH('Para esta semana','Diario de sueños','Seguimos la carta del día, ahora con las 19 cartas, y escuchamos lo que nos dice la noche.')+
 n3ck('t7ta',[['libro','Completa las fichas de La Torre, La Estrella y La Luna.'],['sol','Cada mañana saca una carta entre las 19 vistas, derecha o invertida.'],['luna','Al despertar, anota tus sueños y la emoción con la que despertaste.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t7cd','Sacar mi carta del día',T5TZ19)+
 n3area('t7su','Mi sueño de hoy','Soñé que…')+
 `<div class="dk-sub">La emoción con la que desperté</div>${chipRow('t7em',T5EMO,st('t7em',-1))}`+n3priv;
RICH.t7f2=()=>dkH('También en la noche hay un camino','Próxima clase','Llegamos a las últimas cartas del viaje del Loco.')+
 `<div class="t5-cols">${[19,20,21].map(i=>t5card({n:T5ROM[i],t:T5MAY[i],sm:1})).join('')}</div>`+
 n3quote('Después de la tormenta, la luz: <mark>también en la noche hay un camino</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q7=[
 {q:'¿Qué se derrumba en La Torre?',o:['Lo que estaba construido sobre bases falsas','Todo lo bueno','Solo lo material'],a:0,e:'Algunas crisis son despertares.'},
 {q:'El rayo de La Torre representa…',o:['Un castigo','Una verdad que llega de golpe','La suerte'],a:1,e:'Y la corona que cae: el ego pierde el control.'},
 {q:'¿Cuál es una sombra de La Torre?',o:['Ver la verdad','Sostener lo insostenible','Liberarse de lo falso'],a:1,e:'Su sombra: miedo al caos, sostener lo insostenible y vivir en alerta.'},
 {q:'En medio de la caída de La Torre, también caen…',o:['Gotas de luz','Piedras','Estrellas negras'],a:0,e:'En medio de la caída, cae también luz.'},
 {q:'La mujer de La Estrella está desnuda porque…',o:['Está sin máscaras: vulnerable y auténtica','Tiene frío','Se esconde'],a:0,e:'Después de la tormenta, el Loco se queda sin máscaras.'},
 {q:'Las siete estrellas pequeñas de La Estrella representan…',o:['Los días de la semana','Los chakras que vuelven a encenderse','Los planetas'],a:1,e:'Y la gran estrella: una guía que brilla después de la noche.'},
 {q:'¿Cuál es una sombra de La Estrella?',o:['Esperar sin actuar','Confiar en la vida','Recuperar la esperanza'],a:0,e:'Su sombra: esperar sin actuar, dar sin recibir e idealizar el futuro.'},
 {q:'En La Luna, el perro y el lobo representan…',o:['Lo domesticado y lo salvaje en nosotras','El bien y el mal','Dos amigos'],a:0,e:'Y el cangrejo que sale del agua: lo que emerge del inconsciente.'},
 {q:'Invertida, La Luna puede hablar de…',o:['Miedos sin nombre','La niebla que empieza a disiparse','Confusión'],a:1,e:'Invertida: la niebla empieza a disiparse, un miedo sale a la luz y llega claridad de a poco.'},
 {q:'En la tarea «Diario de sueños», al despertar anotas…',o:['Tus sueños y la emoción con la que despertaste','Solo tu carta del día','Tus metas de la semana'],a:0,e:'Y cada mañana sacas una carta entre las 19 vistas.'}];
RICH.t7f3=()=>n3quiz('t5c7',T5Q7,['Dominas lo esencial de la Clase 7. ¡Despertar, confiar y sentir!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 8 · Plenitud y cierre del viaje ---------- */
const T5C8=N5P+'c8/';
Object.assign(T5ARC,{
 sol:{n:'XIX',t:'El Sol',img:T5C8+'sol.webp',alt:'El Sol del mazo Rider-Waite: un gran sol con rostro brilla sobre un niño desnudo con corona de flores que monta un caballo blanco sin riendas y lleva un estandarte rojo; detrás, un muro con girasoles',
  lugar:'Después de atravesar la noche de La Luna, <b>amanece</b>. El Loco recupera la claridad, la alegría y la inocencia de su niño interior.',
  kw:['Alegría','Claridad','Vitalidad','Éxito','Niño interior'],
  im:[['El gran sol','Una luz que ilumina todo, sin sombras.',50,18],['El niño desnudo','La inocencia: nada que esconder.',38,60],['El caballo blanco','Avanza sin riendas, con confianza.',60,80],['El estandarte rojo','La vitalidad que se muestra al mundo.',80,45],['Los girasoles','Crecen mirando hacia la luz.',12,45],['El muro','Queda atrás: el niño ya salió al mundo.',14,74]],
  caras:[['Disfrutar la vida','Mostrarme sin miedo','Reconectar con mi niña interior'],['Necesitar brillar siempre','Negar el dolor','Optimismo forzado'],['Alegría apagada','Una luz que tarda en llegar','Dificultad para disfrutar']],
  mir:'El Sol nos recuerda que <b>la alegría también sana</b>: cuando nos permitimos ser como somos, nuestra luz ilumina también a otros.',
  q:'¿Qué me hace brillar y cuándo me permito disfrutarlo?',ph:'Me hace brillar… y me permito disfrutarlo cuando…'},
 juicio:{n:'XX',t:'El Juicio',img:T5C8+'juicio.webp',alt:'El Juicio del mazo Rider-Waite: un ángel entre nubes toca una trompeta con una bandera de cruz roja; abajo, un hombre, una mujer y un niño se alzan de sus ataúdes con los brazos abiertos, ante montañas nevadas',
  lugar:'Iluminado por El Sol, el Loco <b>escucha el llamado de su alma</b>. Mira su historia completa, la acepta y renace a una nueva conciencia.',
  kw:['Llamado','Renacimiento','Despertar','Perdón','Propósito'],
  im:[['El ángel y la trompeta','Un llamado que despierta.',45,13],['La bandera con la cruz','El encuentro del cielo y la tierra.',34,43],['Las figuras que se alzan','Renacen con los brazos abiertos.',58,67],['Hombre, mujer y niño','La familia: todo nuestro linaje.',86,64],['Los ataúdes','Lo que estaba dormido despierta.',50,86],['Las montañas nevadas','La claridad de una conciencia nueva.',16,55]],
  caras:[['Escuchar mi llamado','Perdonar mi historia','Renacer a algo nuevo'],['Juzgarme por el pasado','Miedo a responder','Vivir según lo que esperan'],['No escuchar el llamado','Autocrítica','Dudar de mi propósito']],
  mir:'El Juicio nos invita a <b>mirar nuestra historia sin condenarla</b>: cuando la aceptamos y la perdonamos, podemos responder al llamado de quienes realmente somos.',
  q:'¿Qué llamado de mi alma estoy lista para responder?',ph:'Estoy lista para responder al llamado de…'},
 mundo:{n:'XXI',t:'El Mundo',img:T5C8+'mundo.webp',alt:'El Mundo del mazo Rider-Waite: una bailarina envuelta en un manto violeta sostiene dos varas dentro de una corona de laurel atada con cintas rojas; en las esquinas, un ángel, un águila, un toro y un león',
  lugar:'El Loco llega al final del viaje con todo lo aprendido integrado. Es <b>plenitud</b>, y también la puerta a un nuevo ciclo: el Loco vuelve a empezar.',
  kw:['Plenitud','Integración','Logro','Cierre de ciclo','Totalidad'],
  im:[['La bailarina','Se mueve con libertad y en armonía.',52,36],['La corona de laurel','El ciclo completo y el logro.',12,42],['Las dos varas','Los opuestos ya integrados.',74,44],['Las cintas rojas','Forman un infinito: todo vuelve a empezar.',50,82],['Los cuatro seres','Los de La Rueda, ahora sin libros.',12,10],['El manto violeta','La espiritualidad que envuelve.',64,58]],
  caras:[['Celebrar lo logrado','Sentirme completa','Cerrar un ciclo con gratitud'],['Miedo a terminar','No valorar lo recorrido','Quedarme en la meta'],['Un ciclo sin cerrar','Falta un último paso','Sentir que algo queda pendiente']],
  mir:'El Mundo nos enseña a <b>reconocer y celebrar lo que hemos integrado</b>: cada final es la base de un nuevo comienzo, y el camino del ser nunca termina.',
  q:'¿Qué ciclo estoy completando y qué me llevo de él?',ph:'Estoy completando el ciclo de… y me llevo…'}});
const T5HOY8=[['sol','Brillar','La alegría de ser quien soy.','#d19a2a'],['juicio','Despertar','El llamado del alma.','#c0442f'],['mundo','Integrar','El ciclo completo.','#4f7d4a']];
const T5TZ22=[...T5TZ19,'sol','juicio','mundo'];
// las tres filas del viaje: I a VII, VIII a XIV y XV a XXI
const T5FIL=[['I a VII','Mundo exterior',1],['VIII a XIV','Mundo interior',8],['XV a XXI','Mundo espiritual',15]];
const t5fila=(key,f,cur)=>`<div class="t5-path" role="group" style="grid-template-columns:repeat(7,minmax(0,1fr))"><span class="t5-fx">${T5FIL[f][0]} · ${T5FIL[f][1]}</span>${T5TZ22.slice(T5FIL[f][2],T5FIL[f][2]+7).map((id,j)=>{const i=T5FIL[f][2]+j,a=t5arcOf(id);return `<button ${rxa('set',key,i)} ${pressed(i===cur)} aria-label="${a.n} · ${a.t}"><img src="${a.img}" alt="" decoding="async"><small>${a.n}</small></button>`}).join('')}</div>`;

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t8a1=()=>nbHero('Tarot Camino del Ser · Clase 8','<span style="font-size:.68em">Plenitud y cierre</span>','del viaje','Clase 8 · Arcanos Mayores. El Sol, El Juicio y El Mundo.',['Brillar','Despertar','Integrar'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${T5HOY8.map(y=>t5card({...t5full(T5ARC[y[0]]),sm:1})).join('')}</div>`);
RICH.t8a2=()=>dkH('Repaso de la semana','Ruptura, esperanza y mundo emocional','Antes de seguir, compartimos cómo fue la semana con tu carta del día y tu diario de sueños.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['torre','estrella','luna'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué carta salió más en tu carta del día?</div>${chipRow('t8rc',T5TZ19.map(id=>t5arcOf(id).t),st('t8rc',-1))}`+
 n3area('t8rh','¿Qué te mostraron tus sueños esta semana?','Mis sueños me mostraron…')+
 n3area('t8rr','¿Qué te quedó resonando de la clase 7?','Me quedó resonando…')+n3priv;
RICH.t8a3=()=>{const s=n3clamp(st('t8hy',0),0,2),x=T5HOY8[s],a=T5ARC[x[0]];
 return dkH('Las cartas de hoy','Los tres últimos pasos del viaje','El viaje llega a su plenitud: después de la noche sale el <b>Sol</b>, el Loco escucha su <b>llamado interior</b> y llega al <b>Mundo</b>, un final que es también un nuevo comienzo.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">${T5HOY8.map((y,i)=>`<button ${rxa('set','t8hy',i)} ${pressed(i===s)} style="border-top:4px solid ${y[3]}"><span class="k" style="font-size:2rem">${T5ARC[y[0]].n}</span><b>${T5ARC[y[0]].t}</b><small>${y[1]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail" style="border-left:6px solid ${x[3]}"><span class="eyebrow">${a.n} · ${a.t}</span><h3>${x[1]}</h3><p>${x[2]}</p>${t5nav('t8hy',s,3)}</div></div>
 <div class="dk-call">${ic('sol',18)} El Sol <b>ilumina</b>, El Juicio <b>despierta</b> y El Mundo <b>integra</b> todo el camino recorrido.</div>`};

/* ----- 2, 3 y 4 · El Sol, El Juicio y El Mundo ----- */
[['b','sol'],['c','juicio'],['d','mundo']].forEach(([l,id])=>{
 RICH['t8'+l+'1']=()=>t5Lugar(id,'Clase 8');
 RICH['t8'+l+'2']=()=>t5Lect(id);
 RICH['t8'+l+'3']=()=>t5Caras(id);
 RICH['t8'+l+'4']=()=>t5Mir(id)});

/* ----- 5 · Cierre de los Arcanos Mayores ----- */
RICH.t8e1=()=>{const s=n3clamp(st('t8vj',0),0,21),a=t5arcOf(T5TZ22[s]),zona=s?T5FIL[s<8?0:s<15?1:2][1]:'El viajero';
 return dkH('Cierre de los Arcanos Mayores','El Viaje del Loco completo','El Loco, el viajero, recorre tres filas de siete cartas: el mundo exterior, el interior y el espiritual. Toca cada carta.')+
 `<div class="t5-vj"><div class="t5-path" style="grid-template-columns:1fr"><button ${rxa('set','t8vj',0)} ${pressed(s===0)} aria-label="0 · El Loco"><img src="${T5FOOL.img}" alt="" decoding="async"><small>0 · El viajero</small></button></div>
 <div style="display:grid;gap:10px">${[0,1,2].map(f=>t5fila('t8vj',f,s)).join('')}</div></div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail"><span class="eyebrow">${a.n} · ${zona}</span><h3>${a.t}</h3><p><b>Palabras clave:</b> ${a.kw.join(' · ')}.</p><p><b>Mensaje luminoso:</b> ${a.caras[0].join(' · ')}.</p>${t5nav('t8vj',s,22)}</div></div>`};
const T5MV=[['estrella','Elige','Una carta de cada fila que hable de tu vida.'],['chat','Cuenta','Tu historia con esas tres cartas, del Loco al Mundo.'],['ojo','Reconoce','¿En qué carta del viaje te encuentras hoy?']];
RICH.t8e2=()=>{const s=n3clamp(st('t8mv',0),0,2),x=T5MV[s],el=[0,1,2].map(f=>st('t8f'+f,-1)),ok=el.every(i=>i>0),hoy=st('t8hoy',-1);
 return dkH('Ejercicio vivencial · en grupos pequeños','Mi propio Viaje del Loco','Tres pasos para contar tu vida con las cartas del viaje.')+
 `<div class="tl" style="grid-template-columns:repeat(3,minmax(0,1fr))">${T5MV.map((y,i)=>`<button ${rxa('set','t8mv',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${y[1]}</span></button>`).join('')}</div>
 <div class="detail"><span class="eyebrow">Paso ${s+1} de 3</span><h3>${ic(x[0],26)} ${x[1]}</h3><p>${x[2]}</p>${t5nav('t8mv',s,3,'Siguiente paso')}</div>`+
 (s===0?`<div style="display:grid;gap:10px">${[0,1,2].map(f=>t5fila('t8f'+f,f,el[f])).join('')}</div>`:'')+
 (s===1?(ok?`<div class="t5-cols" style="grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:center">${['loco',...el.map(i=>T5TZ22[i]),'mundo'].map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('camino',18)} Del Loco al Mundo, pasando por <b>${el.map(i=>t5arcOf(T5TZ22[i]).t).join('</b>, <b>')}</b>.</div>`:`<div class="dk-call warn">Primero elige una carta de cada fila en el paso 1.</div>`)+n3area('t8hi','Mi historia del Loco al Mundo','Mi viaje empezó…'):'')+
 (s===2?`${chipRow('t8hoy',T5TZ22.map(id=>t5arcOf(id).t),hoy)}`+(hoy>=0?`<div class="dk-split" style="align-items:center">${t5card({...t5full(t5arcOf(T5TZ22[hoy])),sm:1})}<div class="detail"><span class="eyebrow">Hoy estoy en</span><h3>${t5arcOf(T5TZ22[hoy]).n} · ${t5arcOf(T5TZ22[hoy]).t}</h3><p><b>Palabras clave:</b> ${t5arcOf(T5TZ22[hoy]).kw.join(' · ')}.</p></div></div>`:''):'')+n3priv};
RICH.t8e3=()=>dkH('Práctica con tu mazo','Tirada con los 22 Mayores','Ahora con todos los Arcanos Mayores. Practica con tu mazo y aquí mismo.')+
 n3ck('t8tp',[['','Baraja los 22 Arcanos Mayores, derechos e invertidos.'],['','Pregunta: ¿qué me llevo de este viaje?'],['','Saca una carta, muéstrala a la cámara y léela con tu ficha y con lo que sientes.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(56px,1fr));gap:6px">${T5TZ22.map(id=>t5card({...t5full(t5arcOf(id)),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Qué me llevo de este viaje?</b></div>`+
 t5tirada('t8tz','Sacar una carta',T5TZ22)+n3area('t8tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
RICH.t8f1=()=>dkH('Para esta semana','Cerrar el viaje, preparar el siguiente','Revisamos los 22 Mayores y preparamos el mazo para los Arcanos Menores.')+
 n3ck('t8ta',[['libro','Completa las fichas de El Sol, El Juicio y El Mundo, y revisa tus 22 fichas.'],['sol','Cada mañana saca una carta entre los 22 Mayores, derecha o invertida.'],['espiral','Separa los 56 Arcanos Menores de tu mazo: los usaremos desde la próxima clase.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t8cd','Sacar mi carta del día',T5TZ22)+
 n3area('t8ll','Lo que me llevo de este viaje','De este viaje me llevo…')+n3priv;
RICH.t8f2=()=>dkH('Cada final es un nuevo comienzo','Próxima clase · Arcanos Menores','Los cuatro palos · Bastos, del As al 7.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">${[['B','Bastos'],['C','Copas'],['E','Espadas'],['O','Oros']].map(p=>t5card({n:p[0],t:p[1],sm:1})).join('')}</div>`+
 n3quote('El viaje llega a su plenitud: <mark>cada final es un nuevo comienzo</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q8=[
 {q:'¿Qué recupera el Loco con El Sol?',o:['La claridad, la alegría y la inocencia de su niño interior','El control','Su corona'],a:0,e:'Después de la noche de La Luna, amanece.'},
 {q:'El niño de El Sol va desnudo porque…',o:['Tiene calor','Es la inocencia: nada que esconder','Perdió su ropa'],a:1,e:'Y el caballo blanco avanza sin riendas, con confianza.'},
 {q:'¿Cuál es una sombra de El Sol?',o:['Disfrutar la vida','Optimismo forzado','Mostrarme sin miedo'],a:1,e:'Su sombra: necesitar brillar siempre, negar el dolor y optimismo forzado.'},
 {q:'En El Juicio, el ángel y la trompeta representan…',o:['Un castigo','Un llamado que despierta','Una fiesta'],a:1,e:'El Loco escucha el llamado de su alma.'},
 {q:'Hombre, mujer y niño en El Juicio hablan de…',o:['La familia: todo nuestro linaje','Tres desconocidos','Tres etapas del día'],a:0,e:'Se alzan de sus ataúdes con los brazos abiertos.'},
 {q:'El Juicio nos invita a mirar nuestra historia…',o:['Sin condenarla','Para juzgarla','Para olvidarla'],a:0,e:'Cuando la aceptamos y la perdonamos, podemos responder al llamado.'},
 {q:'Las cintas rojas de El Mundo forman…',o:['Una cruz','Un infinito: todo vuelve a empezar','Un círculo cerrado'],a:1,e:'Y la corona de laurel: el ciclo completo y el logro.'},
 {q:'Los cuatro seres de El Mundo son los de La Rueda, pero ahora…',o:['Sin libros','Con espadas','Dormidos'],a:0,e:'Ya integraron lo aprendido.'},
 {q:'En el Viaje del Loco completo, ¿qué cartas forman el mundo interior?',o:['I a VII','VIII a XIV','XV a XXI'],a:1,e:'I a VII, mundo exterior; VIII a XIV, mundo interior; XV a XXI, mundo espiritual.'},
 {q:'Para la próxima clase separas…',o:['Los 22 Mayores','Los 56 Arcanos Menores','Solo los Bastos'],a:1,e:'Empezamos con los cuatro palos y los Bastos, del As al 7.'}];
RICH.t8f3=()=>n3quiz('t5c8',T5Q8,['Dominas lo esencial de la Clase 8. ¡Completaste el Viaje del Loco!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);

/* ---------- Clase 9 · Los Menores y el fuego de los Bastos ---------- */
const T5C9=N5P+'c9/';
const T5PALO=[['bastos','Bastos','Fuego','Acción, pasión y proyectos.','#c0442f'],['copas','Copas','Agua','Emociones y vínculos.','#4573a8'],['espadas','Espadas','Aire','Mente, palabra y conflicto.','#7a8a96'],['oros','Oros','Tierra','Cuerpo, trabajo y dinero.','#9b6f27']];
const T5NUM=[['Inicio','La semilla, el potencial puro.'],['Elección','La dualidad y la primera decisión.'],['Crecimiento','La expresión y los primeros frutos.'],['Estabilidad','La estructura que da una base.'],['Crisis','El conflicto que obliga a cambiar.'],['Armonía','El equilibrio que vuelve.'],['Evaluación','La prueba y la reflexión.'],['Movimiento','El avance y la maestría.'],['Culminación','Casi al final: el resultado.'],['Cierre','El ciclo completo, listo para volver a empezar.']];
const T5CORTE=[['sota','Sota','Aprende','La curiosidad y el mensaje.'],['caballo','Caballo','Actúa','El movimiento y la búsqueda.'],['reina','Reina','Siente','El dominio interior del elemento.'],['rey','Rey','Dirige','El dominio exterior del elemento.']];
const T5INVM=[['Bloqueada','La energía del palo aún no logra fluir.'],['Hacia adentro','El proceso es interno, todavía no se ve afuera.'],['Exceso o falta','El elemento está desequilibrado.'],['Aprendizaje','Una situación concreta que pide atención.']];
// los Bastos usan la misma forma que los Mayores (n, t, img, kw, caras) para entrar en t5tirada
const t5bas=(i,nm,alt,desc,kw,luz,som,inv,q,ph,verbo)=>({n:i===1?'As':String(i),t:nm,img:T5C9+'bastos_'+i+'.webp',alt,desc,kw,caras:[luz,som,inv].map(x=>[x.replace(/\.$/,'')]),q,ph,verbo,num:i});
Object.assign(T5ARC,{
 b1:t5bas(1,'As de Bastos','As de Bastos del mazo Rider-Waite: una mano sale de una nube y ofrece una vara con brotes verdes, sobre un paisaje con un castillo','Una mano sale de una nube y ofrece una vara que brota. Es la <b>chispa de una idea</b>, el impulso creativo que todavía es puro potencial.',['Inspiración','Impulso','Nuevo proyecto','Energía creativa'],'Una idea que nace con fuerza.','Empezar mucho y no terminar.','Falta de motivación, una idea que no despega.','¿Qué proyecto quiere nacer en mí?','Quiere nacer en mí…','Nace'),
 b2:t5bas(2,'Dos de Bastos','Dos de Bastos del mazo Rider-Waite: un hombre en lo alto de su castillo sostiene un globo terráqueo y mira el horizonte, entre dos varas','Un hombre en lo alto de su castillo sostiene un globo terráqueo y mira el horizonte. Ya tiene una base y <b>planea hacia dónde llevar su fuego</b>.',['Planificación','Visión','Decisión','Explorar'],'Mirar más allá y planear el próximo paso.','Quedarse planeando sin salir.','Indecisión, miedo a lo desconocido.','¿Qué horizonte quiero explorar y qué me detiene?','Quiero explorar… y me detiene…','Elige'),
 b3:t5bas(3,'Tres de Bastos','Tres de Bastos del mazo Rider-Waite: de espaldas, en lo alto de una colina, un hombre mira el mar entre tres varas','De espaldas, en lo alto de una colina, un hombre mira el mar entre sus tres varas. Lo que empezó <b>ya está en camino</b> y espera ver sus frutos.',['Expansión','Perspectiva','Avance','Confianza'],'Ver crecer lo iniciado y ampliar horizontes.','Impaciencia por los resultados.','Retrasos, planes que no salen como esperaba.','¿Qué estoy esperando y cómo lo cuido mientras llega?','Estoy esperando… y lo cuido…','Crece'),
 b4:t5bas(4,'Cuatro de Bastos','Cuatro de Bastos del mazo Rider-Waite: cuatro varas sostienen una guirnalda de flores y frutos; detrás, dos figuras levantan ramos frente a un castillo','Cuatro varas sostienen una guirnalda de flores y frutos. Detrás, dos figuras levantan ramos frente al castillo: es tiempo de <b>celebrar lo construido</b>.',['Celebración','Hogar','Comunidad','Logro'],'Celebrar y sentirse en casa.','Aparentar una armonía que no se siente.','Tensión en el hogar, falta de pertenencia.','¿Dónde me siento en casa y qué quiero celebrar?','Me siento en casa en… y quiero celebrar…','Celebra'),
 b5:t5bas(5,'Cinco de Bastos','Cinco de Bastos del mazo Rider-Waite: cinco jóvenes cruzan sus varas, cada uno hacia un lado','Cinco jóvenes cruzan sus varas, cada uno hacia un lado. Hay mucha energía y poca dirección común: <b>el fuego choca consigo mismo</b>.',['Conflicto','Competencia','Desacuerdo','Desafío'],'Un desacuerdo que hace crecer.','Pelear por pelear, querer imponerse.','Evitar el conflicto o salir de una disputa.','¿Qué conflicto en mi vida me pide ser escuchado?','El conflicto que me pide ser escuchado es…','Choca'),
 b6:t5bas(6,'Seis de Bastos','Seis de Bastos del mazo Rider-Waite: un jinete coronado de laurel avanza en un caballo blanco entre la gente, con otra corona en su vara','Un jinete coronado de laurel avanza entre la gente, con otra corona en su vara. Superó el conflicto y <b>recibe el reconocimiento</b> de los demás.',['Victoria','Reconocimiento','Éxito','Liderazgo'],'Recibir el reconocimiento por lo logrado.','Depender del aplauso, el orgullo.','Sentirse no vista, inseguridad.','¿Me permito recibir el reconocimiento por lo que logro?','Cuando me reconocen, yo…','Triunfa'),
 b7:t5bas(7,'Siete de Bastos','Siete de Bastos del mazo Rider-Waite: desde lo alto, un joven defiende su lugar con una vara frente a seis varas que suben','Desde lo alto, un joven defiende su lugar con una vara frente a seis que suben. Está en desventaja, pero tiene <b>la posición y la convicción</b>.',['Defensa','Coraje','Perseverancia','Convicción'],'Defender lo que creo y sostener mi lugar.','Vivir siempre a la defensiva.','Rendirse, sentirse sobrepasada.','¿Qué estoy defendiendo y vale la pena sostenerlo?','Estoy defendiendo… y vale la pena porque…','Defiende')});
const T5B7=['b1','b2','b3','b4','b5','b6','b7'];
const T5CAM=['Luz','Sombra','Invertida'];
const t5Menor=id=>{const a=T5ARC[id],o=st('t5kw'+id,{}),k='t5ca'+id,s=n3clamp(st(k,0),0,2);
 return dkH('Bastos · '+a.n+': '+T5NUM[a.num-1][0].toLowerCase(),a.t,a.desc)+
 `<div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1,rev:s===2})}
 <div style="display:grid;gap:12px"><div class="dk-sub">Palabras clave · marca las que resuenan contigo hoy</div>
 <div class="dk-chips" role="group">${a.kw.map((w,i)=>`<button class="chip" ${rxa('tog','t5kw'+id,i)} ${pressed(o[i])}>${w}</button>`).join('')}</div>
 ${chipRow(k,T5CAM,s)}<div class="detail"><span class="eyebrow">${T5CAM[s]}</span><h3>${ic(T5CAR[s][1],24)} ${a.caras[s][0]}</h3>${t5nav(k,s,3)}</div></div></div>
 <div class="detail"><span class="eyebrow">Pregunta</span><p class="t5-q">${a.q}</p></div>`+n3area('t5mq'+id,'Tu respuesta',a.ph)+n3priv};
// fila de los siete Bastos como botones
const t5bfila=(key,cur,lbl)=>`<div class="t5-path" role="group" style="grid-template-columns:repeat(7,minmax(0,1fr))">${T5B7.map((id,i)=>{const a=T5ARC[id];return `<button ${rxa('set',key,i)} ${pressed(i===cur)} aria-label="${a.t}"><img src="${a.img}" alt="" decoding="async"><small>${lbl?a.n+' · '+a.verbo:a.n}</small></button>`}).join('')}</div>`;

/* ----- 1 · Bienvenida y repaso ----- */
RICH.t9a1=()=>nbHero('Tarot Camino del Ser · Clase 9','<span style="font-size:.68em">Los Menores y el fuego</span>','de los Bastos','Clase 9 · Arcanos Menores. Los cuatro palos y los Bastos, del As al 7.',['Fuego','Acción','Pasión'],'Casa Muladhara · Escuela de Formación Holística',
 `<div class="nb-pw t5-fan">${['b1','b4','b7'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>`);
RICH.t9a2=()=>dkH('Repaso de la semana','Cerramos el Viaje del Loco','Antes de empezar con los Menores, compartimos cómo fue la semana con los 22 Mayores.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(3,minmax(0,150px));justify-content:center">${['sol','juicio','mundo'].map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-sub">¿Qué Mayor salió más en tu carta del día?</div>${chipRow('t9rc',T5TZ22.map(id=>t5arcOf(id).t),st('t9rc',-1))}`+
 n3area('t9rh','¿Qué descubriste al revisar tus 22 fichas?','Al revisar mis fichas descubrí…')+
 n3area('t9rr','¿Qué te quedó resonando de la clase 8?','Me quedó resonando…')+n3priv;
RICH.t9a3=()=>dkH('Arcanos Menores','Del alma a la vida cotidiana','Los Mayores muestran las <b>grandes etapas del camino</b>. Los Menores muestran cómo esas etapas <b>se viven cada día</b>: en lo que hacemos, sentimos, pensamos y construimos.')+
 `<div class="t5-two">${t5card({...t5full(T5ARC.mundo),sm:1})}<span class="ar" aria-hidden="true">→</span>${t5card({...t5full(T5ARC.b1),sm:1})}</div>
 <div class="dk-grid c2"><div class="detail"><span class="eyebrow">22 Arcanos Mayores</span><h3>El alma</h3><p>Las grandes etapas del viaje del Loco.</p></div><div class="detail"><span class="eyebrow">56 Arcanos Menores</span><h3>La vida cotidiana</h3><p>Cómo esas etapas se viven en el día a día.</p></div></div>`;

/* ----- 2 · Los Arcanos Menores ----- */
RICH.t9b1=()=>{const s=n3clamp(st('t9pl',0),0,3),x=T5PALO[s];
 return dkH('Los Arcanos Menores','56 cartas, cuatro palos, cuatro elementos','Cada palo tiene 14 cartas: del As al 10 y cuatro cartas de la corte.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">${T5PALO.map((y,i)=>`<button ${rxa('set','t9pl',i)} ${pressed(i===s)} style="border-top:4px solid ${y[4]}"><b>${y[1]}</b><small>${y[2]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({full:1,img:T5C9+x[0]+'_1.webp',alt:'As de '+x[1]+' del mazo Rider-Waite',sm:1})}<div class="detail" style="border-left:6px solid ${x[4]}"><span class="eyebrow">Elemento ${x[2].toLowerCase()}</span><h3>${x[1]}</h3><p>${x[3]}</p>${t5nav('t9pl',s,4)}</div></div>`};
RICH.t9b2=()=>{const s=n3clamp(st('t9nm',0),0,9),x=T5NUM[s],b=T5B7[s];
 return dkH('El lenguaje de los números','Del As al 10, un ciclo completo','Cada número tiene un sentido que se repite en los cuatro palos. Toca cada número.')+
 `<div class="t5-big t5-nums" style="grid-template-columns:repeat(5,minmax(0,1fr));gap:8px">${T5NUM.map((y,i)=>`<button ${rxa('set','t9nm',i)} ${pressed(i===s)} style="padding:12px 8px;justify-items:center;text-align:center"><span class="k" style="font-size:1.6rem">${i+1}</span><small>${y[0]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${b?t5card({...t5full(T5ARC[b]),sm:1}):t5card({n:String(s+1),t:'Bastos',sm:1})}<div class="detail"><span class="eyebrow">Número ${s+1}${b?' · '+T5ARC[b].t:' · la próxima clase'}</span><h3>${x[0]}</h3><p>${x[1]}</p>${t5nav('t9nm',s,10)}</div></div>`};
RICH.t9b3=()=>{const s=n3clamp(st('t9co',0),0,3),x=T5CORTE[s];
 return dkH('Las cartas de la corte','Cuatro formas de vivir cada elemento','Pueden mostrar a una persona, una actitud o una etapa de madurez frente al elemento.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))">${T5CORTE.map((y,i)=>`<button ${rxa('set','t9co',i)} ${pressed(i===s)}><b>${y[1]}</b><small>${y[2]}</small></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({full:1,img:T5C9+'bastos_'+x[0]+'.webp',alt:x[1]+' de Bastos del mazo Rider-Waite',sm:1})}<div class="detail"><span class="eyebrow">${x[1]} · ejemplo con Bastos</span><h3>${x[2]}</h3><p>${x[3]}</p>${t5nav('t9co',s,4)}</div></div>`};
RICH.t9b4=()=>{const s=n3clamp(st('t9iv',0),0,3),x=T5INVM[s];
 return dkH('Cartas invertidas en los Menores','La misma mirada, en lo cotidiano','Cuando un Menor sale invertido, puede leerse de cuatro formas.')+
 `<div class="t5-big" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">${T5INVM.map((y,i)=>`<button ${rxa('set','t9iv',i)} ${pressed(i===s)}><b>${y[0]}</b></button>`).join('')}</div>
 <div class="dk-split" style="align-items:center">${t5card({...t5full(T5ARC.b1),sm:1,rev:1})}<div class="detail"><span class="eyebrow">Forma ${s+1} de 4</span><h3>${ic('espiral',24)} ${x[0]}</h3><p>${x[1]}</p>${t5nav('t9iv',s,4)}</div></div>
 <div class="dk-call">${ic('lupa',18)} En los Mayores la invertida habla de <b>un proceso del alma</b>; en los Menores, de <b>una situación del día a día</b>.</div>`};

/* ----- 3 y 4 · El palo de Bastos ----- */
RICH.t9c1=()=>dkH('El palo de Bastos · elemento fuego','La energía que nos mueve','Los Bastos hablan de la acción, la pasión, la creatividad y los proyectos. Sus varas tienen brotes verdes: <b>es vida que crece</b>.')+
 `<div class="dk-split" style="align-items:center">${t5card({...t5full(T5ARC.b1),sm:1})}<div style="display:grid;gap:10px">
 <div class="detail"><span class="eyebrow">Cuando fluye</span>${c4li(['Entusiasmo','Iniciativa','Valentía','Liderazgo'].map(t=>['sol',t]))}</div>
 <div class="detail"><span class="eyebrow">En sombra</span>${c4li(['Impulsividad','Impaciencia','Agotamiento'].map(t=>['luna',t]))}</div></div></div>`;
['b1','b2','b3'].forEach((id,i)=>{RICH['t9c'+(i+2)]=()=>t5Menor(id)});
['b4','b5','b6','b7'].forEach((id,i)=>{RICH['t9d'+(i+1)]=()=>t5Menor(id)});
RICH.t9d5=()=>{const s=n3clamp(st('t9rf',0),0,6),a=T5ARC[T5B7[s]];
 return dkH('El recorrido del fuego','Del impulso a la defensa','Leídas en orden, las siete cartas cuentan una sola historia. Toca cada carta.')+t5bfila('t9rf',s,1)+
 `<div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail"><span class="eyebrow">${a.n} · ${T5NUM[a.num-1][0]}</span><h3>${a.verbo}</h3><p>${a.caras[0][0]}</p>${t5nav('t9rf',s,7)}</div></div>`+
 n3quote('Una idea que <mark>nace, se planea, crece, se celebra, enfrenta un conflicto, triunfa y se defiende</mark>.')};

/* ----- 5 · Práctica con tu mazo ----- */
RICH.t9e1=()=>{const s=st('t9mf',-1),a=s>=0?T5ARC[T5B7[s]]:null;
 return dkH('Ejercicio vivencial · en grupos pequeños','¿Cómo está mi fuego hoy?','Tres pasos para escuchar tu energía y compartirla en tu grupo.')+
 `<div class="dk-sub">1 · Elige: entre los siete Bastos, la carta que muestra tu energía hoy</div>`+t5bfila('t9mf',s)+
 (a?`<div class="dk-split" style="align-items:center">${t5card({...t5full(a),sm:1})}<div class="detail"><span class="eyebrow">Mi fuego hoy</span><h3>${a.t}</h3><p><b>Palabras clave:</b> ${a.kw.join(' · ')}.</p><p><b>Luz:</b> ${a.caras[0][0]} <b>Sombra:</b> ${a.caras[1][0]}</p></div></div>`:'')+
 n3area('t9ms','2 · Siente: ¿dónde está ese fuego en tu cuerpo y cómo se siente?','Lo siento en…')+
 n3area('t9mc','3 · Comparte: un paso concreto para cuidar o encender tu fuego','Para cuidar mi fuego voy a…')+n3priv};
RICH.t9e2=()=>dkH('Práctica con tu mazo','Tirada de una carta','Con los 7 Bastos vistos. Practica con tu mazo y aquí mismo.')+
 n3ck('t9tp',[['','Baraja los 7 Bastos vistos, derechos e invertidos.'],['','Pregunta: ¿cómo está mi energía para actuar esta semana?'],['','Saca una carta, muéstrala a la cámara y léela uniendo su número con el fuego.']])+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px">${T5B7.map(id=>t5card({...t5full(T5ARC[id]),sm:1})).join('')}</div>
 <div class="dk-call">${ic('lupa',18)} <b>¿Cómo está mi energía para actuar esta semana?</b></div>`+
 t5tirada('t9tz','Sacar una carta',T5B7)+
 (st('t9tz',-1)>=0?`<div class="dk-call">${ic('sol',18)} Su número: <b>${T5NUM[T5ARC[T5B7[st('t9tz',0)>>1]].num-1][0]}</b> (${T5NUM[T5ARC[T5B7[st('t9tz',0)>>1]].num-1][1].toLowerCase().replace(/\.$/,'')}) en el fuego de la acción.</div>`:'')+
 n3area('t9tl','Lo que siento con mi carta','Mi carta me dice…')+n3priv;

/* ----- 6 · Tarea, cierre y repaso ----- */
RICH.t9f1=()=>dkH('Para esta semana','Observar mi fuego','Una práctica diaria con los 7 Bastos vistos.')+
 n3ck('t9ta',[['libro','Completa las fichas del As al 7 de Bastos.'],['sol','Cada mañana saca una carta entre los 7 Bastos vistos, derecha o invertida.'],['luna','Anota cada noche una acción que hiciste guiada por tu fuego.']])+
 `<div class="dk-sub">Tu carta de hoy</div>`+t5tirada('t9cd','Sacar mi carta del día',T5B7)+
 n3area('t9ac','En la noche: una acción guiada por mi fuego','Hoy mi fuego me llevó a…')+n3priv;
RICH.t9f2=()=>dkH('Que tu fuego te guíe','Próxima clase','8, 9 y 10 de Bastos · Sota, Caballo, Reina y Rey.')+
 `<div class="t5-cols" style="grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px">${['8','9','10'].map(n=>t5card({n,t:'Bastos',sm:1})).join('')}${T5CORTE.map(c=>t5card({full:1,img:T5C9+'bastos_'+c[0]+'.webp',alt:c[1]+' de Bastos',sm:1})).join('')}</div>`+
 n3quote('Del alma a la vida cotidiana: <mark>que tu fuego te guíe</mark>.')+`<small class="dk-sig" style="text-align:center;display:block">Casa Muladhara · Escuela de Formación Holística</small>`;
const T5Q9=[
 {q:'¿Cuántas cartas tienen los Arcanos Menores?',o:['22','56','78'],a:1,e:'Cuatro palos de 14 cartas: del As al 10 y cuatro de la corte.'},
 {q:'¿Qué elemento corresponde a las Copas?',o:['Fuego','Agua','Tierra'],a:1,e:'Bastos, fuego; Copas, agua; Espadas, aire; Oros, tierra.'},
 {q:'Los Oros hablan de…',o:['Emociones y vínculos','Cuerpo, trabajo y dinero','Mente y palabra'],a:1,e:'El elemento tierra.'},
 {q:'En el lenguaje de los números, el 5 es…',o:['La armonía','La crisis: el conflicto que obliga a cambiar','El inicio'],a:1,e:'Y el 6 es la armonía, el equilibrio que vuelve.'},
 {q:'¿Qué carta de la corte «siente»?',o:['La Sota','El Caballo','La Reina'],a:2,e:'Sota aprende, Caballo actúa, Reina siente y Rey dirige.'},
 {q:'Una invertida en los Menores habla sobre todo de…',o:['Un proceso del alma','Una situación del día a día','Un castigo'],a:1,e:'Puede estar bloqueada, hacia adentro, en exceso o falta, o pedir aprendizaje.'},
 {q:'Las varas de los Bastos tienen brotes verdes porque…',o:['Es vida que crece','Son viejas','Están en primavera'],a:0,e:'Los Bastos son la energía que nos mueve.'},
 {q:'¿Cuál es la sombra del As de Bastos?',o:['Empezar mucho y no terminar','Celebrar lo construido','Defender lo que creo'],a:0,e:'Su luz: una idea que nace con fuerza.'},
 {q:'En el Cinco de Bastos…',o:['Cinco jóvenes cruzan sus varas: el fuego choca consigo mismo','Un jinete recibe reconocimiento','Un hombre mira el mar'],a:0,e:'Mucha energía y poca dirección común.'},
 {q:'En el recorrido del fuego, el Siete de Bastos…',o:['Nace','Celebra','Defiende'],a:2,e:'As nace, 2 elige, 3 crece, 4 celebra, 5 choca, 6 triunfa y 7 defiende.'}];
RICH.t9f3=()=>n3quiz('t5c9',T5Q9,['Dominas lo esencial de la Clase 9. ¡Que tu fuego te guíe!','Vas muy bien. Repasa lo que falló y sigue practicando.','Vale la pena repasar la clase. Puedes volver cuando quieras.']);
