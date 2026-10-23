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
