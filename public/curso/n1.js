// Casa Muladhara · contenido del Nivel 1 (solo con acceso a este nivel; lo exige middleware.js).
// Script clásico: sus constantes quedan en el ámbito global que usa paginas/aula.html. Se carga después de los niveles anteriores.
/* ---------- Nivel 1 · clases interactivas (marca nueva, poco texto, todo tocable) ---------- */
const RS={};
const st=(k,d)=>(RS[k]===undefined?(RS[k]=d):RS[k]);
const rxa=(...a)=>`data-rx="${a.join('|')}"`;
const IC={
 detecta:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
 limpia:'<path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
 armoniza:'<path d="M12 4v16M7 20h10M4 7h16"/><path d="M4 7l-2.5 6a2.8 2.8 0 0 0 5 0zM20 7l-2.5 6a2.8 2.8 0 0 0 5 0z"/>',
 irradia:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
 persona:'<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.6-4 3.2-6 6.5-6s5.9 2 6.5 6"/>',
 casa:'<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-6h4v6"/>',
 corazon:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
 grupo:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c.5-3.5 3-5 6-5s5.5 1.5 6 5M15 15c3 0 5 1.2 6 4"/>',
 loto:'<path d="M12 5c2 3 2 7 0 10-2-3-2-7 0-10zM5 9c3 0 6 2 7 6-3 0-6-2-7-6zM19 9c-3 0-6 2-7 6 3 0 6-2 7-6zM4 18h16"/>',
 birrete:'<path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v4.5c3 2 7 2 10 0V11"/>',
 pend:'<path d="M12 2v6"/><path d="m12 8 4 5-4 7-4-7z"/>',
 enlace:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 escudo:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/>'
};
const ic=(n,s=26)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
const dkH=(eb,t,l)=>`<div class="dk-h"><span class="eyebrow">${eb}</span><h2>${t}</h2>${l?`<p class="dk-lede">${l}</p>`:''}</div>`;
const pressed=b=>`aria-pressed="${!!b}"`;
const chipRow=(key,items,cur)=>`<div class="dk-chips" role="group">${items.map((x,i)=>`<button class="chip" ${rxa('set',key,i)} ${pressed(i===cur)}>${x}</button>`).join('')}</div>`;
const heb=(h,es)=>({h,es});

const CHAKRAS=[
 {n:'Raíz',s:'Muladhara',c:'#c23b3b',t:'Seguridad y conexión con la tierra'},
 {n:'Sacro',s:'Svadhisthana',c:'#e58a3a',t:'Creatividad, emociones y placer'},
 {n:'Plexo solar',s:'Manipura',c:'#e0b43a',t:'Poder personal, autoestima y confianza'},
 {n:'Corazón',s:'Anahata',c:'#4c9a5f',t:'Amor, compasión, perdón y conexión'},
 {n:'Garganta',s:'Vishuddha',c:'#3a8dc9',t:'Comunicación, expresión y verdad'},
 {n:'Tercer ojo',s:'Ajna',c:'#3b3f9e',t:'Intuición, claridad mental e imaginación'},
 {n:'Corona',s:'Sahasrara',c:'#8a5fb8',t:'Conexión espiritual y propósito de vida'}
];
const CUERPOS=[
 {n:'Físico',c:'#c23b3b',k:'Tu cuerpo material',t:'Por él vives la experiencia: refleja tu salud, hábitos y cuidado.'},
 {n:'Etérico',c:'#e58a3a',k:'Tu doble energético',t:'Sostiene al cuerpo físico y canaliza la energía vital (prana).'},
 {n:'Mental',c:'#2fa6a0',k:'Ideas y creencias',t:'Pensamientos, creencias, patrones y memorias mentales.'},
 {n:'Emocional',c:'#6c9a45',k:'Sentimientos y memorias afectivas',t:'Guarda lo que sientes e influye en tus relaciones.'},
 {n:'Astral',c:'#2f66b8',k:'Deseos y creatividad',t:'Conecta con el mundo emocional colectivo y los planos sutiles.'},
 {n:'Causal',c:'#3b3f9e',k:'Propósito e intención',t:'Contiene las causas de tus experiencias, talentos y lecciones del alma.'},
 {n:'Espiritual',c:'#7a4fb0',k:'Tu esencia divina',t:'El más sutil: sabiduría superior y propósito espiritual.'}
];
const KIT=[
 ['Péndulo Hebreo','Tu herramienta canalizadora: un puente entre tu energía y la información que necesitas.'],
 ['Etiquetas hebreas','Tarjetas con palabras, símbolos y nombres sagrados para trabajar cada objetivo.'],
 ['Tinta de muérdago','Extracto natural para limpiar, despejar y armonizar el campo energético.'],
 ['Algodón','Limpia las capas energéticas y cada chakra, y libera energías densas.'],
 ['Pinzas','Sostienen el algodón durante la limpieza y retiran los desechos.'],
 ['Madera de descarga','Descarga el péndulo y las herramientas para mantenerlos neutros.'],
 ['Fósforos','Queman los desechos (algodón usado y residuos energéticos) para transformarlos.'],
 ['Cajas Petri','Contienen los algodones usados antes de eliminarlos o quemarlos.'],
 ['Pañuelo o turbante','Cubre la cabeza y protege tu campo energético durante la sesión.']
];
const TAGS=[
 {n:'Detectar',tool:'Polo liso',d:'Identifica bloqueos, desequilibrios y energías que requieren atención.',l:['Miasma','Miasma pesados','Miasma petroquímico','Miasma cáncer','Miasma radioactividad','Magia negra','Mal de ojo','Larva astral','Ritual']},
 {n:'Irradiar',tool:'Polo estriado',d:'Emite la frecuencia de la etiqueta elegida sobre el campo energético.',l:['Autoconfianza','Consolidar','Amor profundo','Iluminación','Campo electromagnético','Canal central','Desbloqueo','Protección superior','Borrar estrés','Armonía constante','Fuerza mental','Depuración','Paz mental','Alegría de vivir','Yo soy','Superar miedos','Depuración emocional','Desinfectar, purificar','Sanar y curar','Gozo y felicidad','Guía','Abundancia y prosperidad','Circuito energético perfecto']},
 {n:'Sellar el campo áurico',tool:'Colores',d:'Cierra la sesión sellando el aura con un color.',l:['Verde','Dorado','Amarillo','Azul','Naranja','Blanco','Turquesa','Violeta','Índigo','Gris']}
];
const COL={Verde:'#4c9a5f',Dorado:'#c9a24a',Amarillo:'#e6c53a',Azul:'#3a78c0',Naranja:'#e58a3a',Blanco:'#f4f1e6',Turquesa:'#2fa6a0',Violeta:'#8a5fb8','Índigo':'#3b3f9e',Gris:'#8d948f'};
const HEB=[
 ['אהבה','Amor'],['שלום','Paz'],['הגנה','Protección'],['פרנסה','Abundancia'],['ריפוי','Sanación'],['חיים','Vida'],['אור','Luz'],['בריאות','Salud'],['רפא','Sanación']
];
const FTYPES=['Miasma','Miasma pesado','Miasma petroquímico','Miasma cáncer','Miasma radioactividad','Magia negra','Mal de ojo','Larva astral','Ritual'];
const ROM=['I','II','III','IV','V','VI','VII'];
const PRAYER=[
 ['guia','Cierra los ojos. Toma tu Péndulo Hebreo con ambas manos y llévalo suavemente hasta tu corazón.'],
 ['guia','Respira profundo. Inhala lento por la nariz y exhala despacio. Deja que tu respiración se vuelva tranquila y consciente.'],
 ['guia','Deja por un instante fuera de tu mente las preocupaciones y todo lo que pueda distraerte. Siente tu corazón, tu presencia y el instrumento entre tus manos.'],
 ['oracion','“Me encuentro en calma, presente y consciente. Me dispongo a conectar con mi Péndulo Hebreo desde el respeto, la claridad y la buena intención. Pido permiso para establecer esta conexión y para trabajar en armonía durante esta sesión.'],
 ['oracion','Que mi mente permanezca serena, que mi corazón permanezca abierto y que mis manos sean un canal consciente y responsable. Que esta herramienta sea utilizada con respeto, conciencia y para el bienestar.'],
 ['oracion','Que pueda reconocer sus movimientos con claridad, sin miedo, sin expectativas y sin interferencias. Péndulo Hebreo, establecemos nuestra conexión. Nos disponemos a trabajar juntos desde la armonía, el respeto y la coherencia.”'],
 ['guia','Inhala profundamente y, al exhalar, sube suavemente el péndulo hasta tu boca. Deja que el aire pase sobre él, como gesto simbólico de sellado y conexión.'],
 ['guia','Vuelve a llevarlo lentamente hacia tu corazón. Respira una vez más y permanece unos segundos en silencio, sintiendo tu conexión.'],
 ['oracion','“Estoy presente. Estoy en calma. Estoy preparado/a para comenzar. Gracias, gracias, gracias.”']
];
const QUIZ=[
 {q:'¿Para qué se usa el polo liso del péndulo?',o:['Para irradiar etiquetas','Para detectar y obtener información energética','Para sellar el aura'],a:1,e:'El polo liso detecta y analiza; el estriado irradia.'},
 {q:'¿Qué polo se usa para irradiar la frecuencia de las etiquetas?',o:['El polo estriado','El polo liso','Cualquiera de los dos'],a:0,e:'Estriado = irradiar. Liso = detectar.'},
 {q:'¿De qué madera suele hacerse el péndulo?',o:['Pino o cedro','Haya o nogal','Bambú'],a:1,e:'Madera sagrada de haya o nogal: transmite vibraciones de forma estable.'},
 {q:'¿Cuántos cuerpos energéticos trabajamos?',o:['Tres','Cinco','Siete'],a:2,e:'Del físico al espiritual: siete cuerpos.'},
 {q:'¿Qué chakra se relaciona con la comunicación, la expresión y la verdad?',o:['Garganta (Vishuddha)','Corazón (Anahata)','Raíz (Muladhara)'],a:0,e:'Vishuddha, el chakra de la garganta.'},
 {q:'¿Cuáles son las tres funciones de las etiquetas?',o:['Detectar, irradiar y sellar el campo áurico','Cortar, pegar y guardar','Medir, pesar y anotar'],a:0,e:'Detectar, irradiar y sellar el campo áurico.'},
 {q:'¿Los 72 Nombres de Dios forman parte del protocolo de trabajo?',o:['Sí, en cada sesión','No: los conocemos solo como contexto','Solo en el trabajo a distancia'],a:1,e:'Se conocen como parte del contexto de las letras hebreas, pero no son parte del protocolo.'},
 {q:'¿Qué usamos para descargar el péndulo y las herramientas?',o:['Los fósforos','La madera de descarga','El pañuelo'],a:1,e:'La madera de descarga libera la energía acumulada y mantiene la neutralidad.'}
];
const RICH={};

RICH.welcome=()=>`<div class="dk-hero"><svg class="mo" aria-hidden="true"><use href="#mark"/></svg>
  <span class="eyebrow">Escuela de Formación Holística</span><h2>Péndulo Hebreo<br>Nivel 1</h2>
  <p>Un espacio seguro para que tu energía vuelva a fluir.</p>
  <div class="dk-chips">${['Conocimiento práctico','Herramienta poderosa','Sanación integral','Transformación consciente'].map(x=>`<span class="tg">${x}</span>`).join('')}</div>
  <small class="dk-sig">Sanación · Conciencia · Propósito</small></div>`;

RICH.learn=()=>dkH('Bienvenida','Hoy aprendes a usar el péndulo para limpiar, armonizar y sanar')+
 `<div class="dk-grid c4">${[['birrete','Conocimiento práctico'],['pend','Herramienta poderosa'],['corazon','Sanación integral'],['loto','Transformación consciente']].map(x=>`<div class="pill-card">${ic(x[0],30)}<b>${x[1]}</b></div>`).join('')}</div>`+
 `<div><div class="dk-sub">Tu ruta de hoy · toca para saltar</div><div class="route">${LEVELS[0].modules.map((m,i)=>`<button class="rt" data-les="${i},0"><b>${i+1}</b><span>${esc(m.title.replace(/^Módulo \d · /,''))}</span></button>`).join('')}</div></div>`;

RICH.what=()=>dkH('Módulo 1','¿Qué es el Péndulo Hebreo?')+
 `<p class="dk-quote">Una herramienta de radiestesia de origen ancestral que, con intención y conexión, permite <mark>detectar, equilibrar y armonizar energías</mark>.</p>
  <div><div class="dk-sub">Sirve para trabajar con</div><div class="dk-chips">${[['persona','Personas'],['casa','Espacios'],['grupo','Situaciones']].map(x=>`<span class="tg">${ic(x[0],18)}${x[1]}</span>`).join('')}</div></div>`;

RICH.does=()=>{const o=st('doesF',{});const L=[['detecta','Detecta','Identifica bloqueos y desequilibrios.'],['limpia','Limpia','Limpia el campo energético con las etiquetas.'],['armoniza','Armoniza','Restablece el equilibrio.'],['irradia','Irradia','Emite la frecuencia de la etiqueta elegida.']];
 return dkH('Módulo 1','¿Qué hace el péndulo?','Toca cada tarjeta para darla vuelta.')+
 `<div class="dk-grid c4">${L.map((x,i)=>`<button class="flip ${o[i]?'on':''}" ${rxa('flip','doesF',i)} ${pressed(o[i])}><span><span class="f">${ic(x[0],34)}<b>${x[1]}</b><em>Toca para ver</em></span><span class="b">${x[2]}</span></span></button>`).join('')}</div>`};

RICH.uses=()=>{const U=[['persona','Limpieza energética','Aura, chakras, cuerpos sutiles y bloqueos.'],['casa','Limpieza de espacios','Hogares, trabajos y ambientes cargados.'],['corazon','Bienestar integral','Apoya lo físico, emocional y mental.'],['grupo','Trabajo terapéutico','Complemento en terapias holísticas.'],['loto','Desarrollo espiritual','Conexión interior y crecimiento de la conciencia.']];
 const s=st('uses',0);
 return dkH('Módulo 1','¿Para qué se usa?')+
 `<div class="dk-split"><div class="sel-list">${U.map((x,i)=>`<button class="sel" ${rxa('set','uses',i)} ${pressed(i===s)}>${ic(x[0],24)}<b>${x[1]}</b></button>`).join('')}</div>
  <div class="detail"><span class="eyebrow">${s+1} de 5</span><h3>${U[s][1]}</h3><p>${U[s][2]}</p></div></div>`};

RICH.origin=()=>{const N=[['Origen no documentado','Su origen exacto no está documentado con certeza. Se basa en la radiestesia y en el uso de caracteres hebreos.'],['Ondas de forma','Su desarrollo moderno se relaciona con la radiestesia francesa y con la investigación de las ondas de forma y la vibración de las letras hebreas.'],['Pioneros','Jean Gastón Bardet y Jean de La Foye exploraron la relación entre las formas, las letras hebreas y la radiestesia.'],['Difusión','Pierre Heli es mencionado en diversas escuelas de radiestesia como difusor o redescubridor de la técnica.']];
 const s=st('orig',0);
 return dkH('Módulo 1','Origen y evolución','Recorre la línea de tiempo.')+
 `<div class="tl">${N.map((x,i)=>`<button ${rxa('set','orig',i)} ${pressed(i===s)}><span class="n">${i+1}</span><span class="t">${x[0]}</span></button>`).join('')}</div>
  <div class="detail"><span class="eyebrow">${N[s][0]}</span><p style="font-size:1.05rem">${N[s][1]}</p></div>`};

const pendSVG=(inner,cls='')=>`<svg class="pend ${cls}" viewBox="0 0 240 340" aria-hidden="${cls?'true':'false'}"><defs><linearGradient id="wood" x1="0" x2="1"><stop offset="0" stop-color="#b57d3f"/><stop offset=".5" stop-color="#dcab6c"/><stop offset="1" stop-color="#a06a30"/></linearGradient></defs>${inner}</svg>`;
const PBODY=`<path d="M120 0V80" stroke="currentColor" stroke-width="3" fill="none" opacity=".65"/><rect x="88" y="78" width="64" height="172" rx="12" fill="url(#wood)"/><path d="M108 84v34M132 84v34" stroke="#6b4420" stroke-width="3.5" stroke-linecap="round"/><circle cx="120" cy="262" r="11" fill="#8a5a2a"/><path d="M120 273V298" stroke="#c9b88f" stroke-width="3"/><path d="M104 336c0-18 6-34 16-40 10 6 16 22 16 40z" fill="#efe6d2" stroke="#cdbf9f"/>`;
RICH.how=()=>{const on=st('swing',1);
 return dkH('Módulo 1','¿Cómo funciona?','Las letras hebreas vibran y actúan sobre tu campo energético para elevar y armonizar tu frecuencia.')+
 `<div class="dk-split"><div>${pendSVG(`<g class="swing ${on?'':'off'}">${PBODY}</g>`,'')}</div>
  <div style="display:grid;gap:14px"><div class="dk-call"><b>Clave vibracional.</b> Cada etiqueta orienta y armoniza la energía deseada a través del péndulo.</div>
  <div><button class="btn btn-ghost btn-sm" ${rxa('set','swing',on?0:1)}>${on?'Detener el movimiento':'Mover el péndulo'}</button></div></div></div>`};

RICH.anatomy=()=>{const A=[['estriado','Polo estriado · Irradiar','Se usa para irradiar y transmitir la energía de las etiquetas.'],['madera','Madera sagrada','Haya o nogal: canaliza y transmite vibraciones de forma estable.'],['liso','Polo liso · Detectar','Se usa para detectar, analizar y obtener información energética.'],['etiquetas','Etiquetas energéticas','Palabras, símbolos o nombres sagrados que rodean el péndulo.'],['trabajo','Trabajo energético','Armoniza, limpia, equilibra y eleva la energía.'],['especial','Herramienta especializada','Requiere preparación y práctica. No es un péndulo común.']];
 const s=st('anat','estriado');const cur=A.find(x=>x[0]===s)||A[0];
 const hs=(id,y,h,lab)=>`<g class="hs ${s===id?'on':''}" ${rxa('set','anat',id)} role="button" tabindex="0" aria-label="${lab}"><rect class="hit" x="86" y="${y}" width="68" height="${h}" rx="10"/></g>`;
 return dkH('Módulo 1','Conoce tu péndulo','Toca una parte del dibujo o de la lista.')+
 `<div class="dk-split"><div>${pendSVG(PBODY+hs('estriado',78,50,'Polo estriado')+hs('madera',128,60,'Madera sagrada')+hs('liso',188,64,'Polo liso'))}</div>
  <div style="display:grid;gap:12px"><div class="sel-list">${A.map(x=>`<button class="sel" ${rxa('set','anat',x[0])} ${pressed(x[0]===s)}><b>${x[1]}</b></button>`).join('')}</div>
  <div class="detail"><h3>${cur[1]}</h3><p>${cur[2]}</p></div></div></div>`};

RICH.chakras=()=>{const s=st('chk',0);const c=CHAKRAS[s];const ys=[236,204,168,130,88,52,22];
 const dots=CHAKRAS.map((x,i)=>`<g ${rxa('set','chk',i)} role="button" tabindex="0" aria-label="Chakra ${x.n}"><circle class="cdot" cx="100" cy="${ys[i]}" r="${i===s?14:10}" fill="${x.c}" stroke="${i===s?'#f2c66d':'#fff'}" stroke-width="${i===s?3:2}"/></g>`).join('');
 const fig=`<svg class="fig" viewBox="0 0 200 270" aria-label="Los siete chakras"><path d="M100 70c-24 0-34 22-36 56l-6 58c-24 8-34 22-34 34 20 14 150 14 152 0 0-12-10-26-34-34l-6-58c-2-34-12-56-36-56z" fill="var(--surface-2)" stroke="var(--line)" stroke-width="2"/><circle cx="100" cy="46" r="21" fill="var(--surface-2)" stroke="var(--line)" stroke-width="2"/><path d="M100 22V236" stroke="var(--line)" stroke-dasharray="3 5"/>${dots}</svg>`;
 return dkH('Módulo 2','Los chakras','Siete centros de energía que reciben, procesan y distribuyen tu fuerza vital. Toca uno.')+
 `<div class="dk-split"><div>${fig}</div><div style="display:grid;gap:12px">
  <div class="detail" style="border-left:6px solid ${c.c}"><span class="eyebrow">Chakra ${s+1} · ${c.s}</span><h3>${c.n}</h3><p>${c.t}</p></div>
  <div class="dk-chips">${CHAKRAS.map((x,i)=>`<button class="chip" ${rxa('set','chk',i)} ${pressed(i===s)}>${i+1}</button>`).join('')}</div>
  <p class="dk-note">Equilibrados, la energía fluye. Con el péndulo los limpiamos y armonizamos.</p></div></div>`};

RICH.aura=()=>{const b=st('aura',1);const cols=['#8a5fb8','#3a78c0','#4c9a5f','#e6c53a','#e58a3a','#e0607a'];
 const layers=cols.map((c,i)=>`<ellipse class="layer" cx="130" cy="170" rx="${118-i*16}" ry="${158-i*20}" fill="${c}" opacity=".32"/>`).join('');
 const svg=`<svg class="fig" style="max-width:270px" viewBox="0 0 260 340" aria-label="El aura"><defs><radialGradient id="gl"><stop offset="0" stop-color="#fff7d8"/><stop offset="1" stop-color="#fff7d8" stop-opacity="0"/></radialGradient></defs><g class="layers">${layers}</g><circle class="glow" cx="130" cy="150" r="56" fill="url(#gl)"/><circle cx="130" cy="96" r="15" fill="#fffdf6" opacity=".95"/><path d="M130 114c-18 0-26 14-26 36l-4 56h20l4 74h12l4-74h20l-4-56c0-22-8-36-26-36z" fill="#fffdf6" opacity=".95"/><g class="blob"><circle cx="76" cy="190" r="16" fill="#3a3a3a"/><circle cx="188" cy="120" r="13" fill="#3a3a3a"/><circle cx="170" cy="250" r="14" fill="#3a3a3a"/></g></svg>`;
 return dkH('Módulo 2','El aura','Es el campo de energía que te rodea y refleja tu estado físico, emocional, mental y espiritual.')+
 `<div class="dk-split"><div class="aura ${b?'blocked':''}">${svg}</div><div style="display:grid;gap:14px">
  <div class="dk-chips"><button class="chip" ${rxa('set','aura',1)} ${pressed(b)}>Con bloqueos</button><button class="chip" ${rxa('set','aura',0)} ${pressed(!b)}>Limpia y equilibrada</button></div>
  <div class="detail"><h3>${b?'Aura con bloqueos':'Aura limpia'}</h3><p>${b?'Pueden aparecer cansancio, estrés, confusión o malestares físicos y emocionales.':'Sentimos vitalidad, claridad y bienestar.'}</p>
  <div class="row">${b?`<button class="btn btn-primary btn-sm" ${rxa('set','aura',0)}>Limpiar con el péndulo</button>`:`<button class="btn btn-ghost btn-sm" ${rxa('set','aura',1)}>Volver a empezar</button>`}</div></div></div></div>`};

RICH.bodies=()=>{const n=st('bdN',1);const s=Math.min(st('bdS',0),n-1);
 const ell=[...CUERPOS].map((x,i)=>i).reverse().map(i=>{const x=CUERPOS[i];const vis=i<n;return `<ellipse ${vis?rxa('set','bdS',i):''} ${vis?'role="button" tabindex="0"':''} aria-label="Cuerpo ${x.n}" cx="130" cy="${176-i*3}" rx="${34+i*14}" ry="${52+i*20}" fill="${vis?x.c:'none'}" fill-opacity="${vis?(i===s?.55:.3):0}" stroke="${vis?x.c:'var(--line)'}" stroke-width="${i===s?4:1.5}" ${vis?'':'stroke-dasharray="4 5"'} style="${vis?'cursor:pointer':''}"/>`}).join('');
 const svg=`<svg class="fig" style="max-width:290px" viewBox="0 0 260 360" aria-label="Los siete cuerpos energéticos">${ell}<circle cx="130" cy="150" r="9" fill="var(--fg)" opacity=".8"/><path d="M130 160c-10 0-14 8-14 20l-2 30h10l2 40h8l2-40h10l-2-30c0-12-4-20-14-20z" fill="var(--fg)" opacity=".8"/></svg>`;
 const c=CUERPOS[s];
 return dkH('Módulo 2','Los 7 cuerpos energéticos','Además del físico, somos campos de energía que interactúan. Construye el tuyo capa por capa.')+
 `<div class="dk-split"><div>${svg}</div><div style="display:grid;gap:12px">
  <div class="detail" style="border-left:6px solid ${c.c}"><span class="eyebrow">Cuerpo ${s+1} de 7</span><h3>${c.n}</h3><p><b>${c.k}</b></p><p>${c.t}</p></div>
  <div class="dk-chips">${n<7?`<button class="btn btn-primary btn-sm" ${rxa('bd','add')}>Agregar el cuerpo ${CUERPOS[n].n.toLowerCase()}</button>`:`<span class="tg">¡Tus 7 cuerpos!</span>`}${n>1?`<button class="btn btn-ghost btn-sm" ${rxa('bd','reset')}>Reiniciar</button>`:''}</div>
  <p class="dk-note">El péndulo detecta, limpia y armoniza todos estos cuerpos.</p></div></div>`};

RICH.work=()=>{const o=st('workT',{});const W=['Limpiar y armonizar tu aura','Liberar bloqueos y patrones que ya no te sirven','Equilibrar tus chakras','Restaurar tu bienestar físico, emocional, mental y espiritual','Elevar tu vibración y tu conexión interior'];
 const n=Object.values(o).filter(Boolean).length;
 return dkH('Módulo 2','¿Qué vamos a trabajar?','Toca lo que más resuena contigo.')+
 `<div class="sel-list">${W.map((x,i)=>`<button class="ck" ${rxa('tog','workT',i)} ${pressed(o[i])}><span class="box"></span><span>${x}</span></button>`).join('')}</div>
  <div class="prog"><span>${n} de 5 te resuenan</span><div class="bar"><i style="width:${n*20}%"></i></div></div>`};

RICH.benefits=()=>{const B=[['loto','Armoniza el aura'],['limpia','Limpia energías densas'],['enlace','Libera bloqueos'],['irradia','Equilibra tus chakras'],['corazon','Da claridad y baja el estrés'],['persona','Eleva tu vibración']];
 return dkH('Módulo 2','Beneficios de la terapia')+
 `<div class="dk-grid c3">${B.map(x=>`<div class="pill-card">${ic(x[0],30)}<b>${x[1]}</b></div>`).join('')}</div>
  <p class="dk-note">Terapia complementaria: no reemplaza la atención médica ni psicológica.</p>`};

RICH.kit=()=>{const h=st('kitH',{});const s=st('kitS',0);const n=Object.values(h).filter(Boolean).length;
 return dkH('Módulo 3','Tu kit de trabajo','Toca cada elemento y marca los que ya tienes.')+
 `<div class="kit">${KIT.map((x,i)=>`<button ${rxa('set','kitS',i)} ${pressed(i===s)} class="${h[i]?'got':''}"><span class="have"></span><span class="k">${i+1}</span><b>${x[0]}</b></button>`).join('')}</div>
  <div class="detail"><h3>${KIT[s][0]}</h3><p>${KIT[s][1]}</p><div class="row"><button class="btn ${h[s]?'btn-ghost':'btn-primary'} btn-sm" ${rxa('tog','kitH',s)}>${h[s]?'Quitar de mi kit':'Ya lo tengo'}</button></div></div>
  <div class="prog"><span>Tienes ${n} de 9</span><div class="bar"><i style="width:${n/9*100}%"></i></div></div>`};

RICH.labels=()=>{const o=st('lblF',{});const L=[['limpia','Palabras sagradas','Palabras, símbolos y nombres sagrados en hebreo.'],['irradia','Frecuencia única','Cada etiqueta vibra distinto al irradiarse.'],['detecta','Intención precisa','Canalizan intenciones en lo físico, emocional, mental y espiritual.'],['corazon','Guía poderosa','Junto al péndulo facilitan sanación, equilibrio y transformación.']];
 return dkH('Módulo 3','¿Qué son las etiquetas?','Toca para darlas vuelta.')+
 `<div class="dk-grid c4">${L.map((x,i)=>`<button class="flip ${o[i]?'on':''}" ${rxa('flip','lblF',i)} ${pressed(o[i])}><span><span class="f">${ic(x[0],32)}<b>${x[1]}</b><em>Toca para ver</em></span><span class="b">${x[2]}</span></span></button>`).join('')}</div>
  <p class="dk-note" style="font-style:italic">Trabajamos siempre con respeto, enfoque y amor, permitiendo que la energía haga su trabajo.</p>`};

RICH.tags=()=>{const s=st('tag',0);const t=TAGS[s];
 return dkH('Módulo 3','Tres usos de las etiquetas')+
 chipRow('tag',TAGS.map(x=>x.n),s)+
 `<div class="detail"><span class="eyebrow">${t.tool}</span><h3>${t.n}</h3><p>${t.d}</p></div>
  <div class="dk-chips">${t.l.map(x=>`<span class="tg">${COL[x]?`<i style="background:${COL[x]}"></i>`:''}${x}</span>`).join('')}</div>`};

RICH.cards=()=>{const o=st('hebF',{});
 return dkH('Módulo 3','Algunas etiquetas','Adivina el significado y dale la vuelta.')+
 `<div class="dk-grid c4">${HEB.map((x,i)=>`<button class="flip heb ${o[i]?'on':''}" ${rxa('flip','hebF',i)} ${pressed(o[i])} style="height:170px"><span><span class="f"><span class="h">${x[0]}</span><em>Toca para ver</em></span><span class="b"><b>${x[1]}</b></span></span></button>`).join('')}</div>`};

RICH.kabbalah=()=>{const s=st('kab',0);
 const C=['Las letras hebreas y su significado','Los nombres de Dios','Los 72 Nombres de Dios','Estudio de la energía y los mundos espirituales','El Árbol de la Vida (Sefirot)','Búsqueda de transformación espiritual'];
 return dkH('Módulo 3','Contexto: letras, nombres y Cábala')+
 chipRow('kab',['Los 72 Nombres de Dios','Tradición cabalística'],s)+
 (s===0?`<div class="dk-split"><div class="pill-card"><span class="qscore" style="font-size:3.6rem">72</span><b>combinaciones de tres letras hebreas</b></div><div style="display:grid;gap:10px"><p>Cada una expresa una cualidad o atributo divino. Tradicionalmente se usan para contemplación, meditación y conexión espiritual.</p></div></div>
  <div class="dk-call warn"><b>Importante:</b> los conoceremos como contexto, pero <b>NO</b> forman parte del protocolo de trabajo con el Péndulo Hebreo.</div>`
 :`<p class="dk-lede" style="margin:0">Corriente mística del judaísmo que busca comprender la relación entre Dios, la creación y el ser humano. Estudia:</p>
  <div class="dk-chips">${C.map(x=>`<span class="tg">${x}</span>`).join('')}</div>
  <div class="dk-call warn"><b>Aclaración:</b> la Cábala y el Péndulo Hebreo no son lo mismo. El péndulo moderno toma elementos de las letras hebreas y de corrientes esotéricas, pero no debe presentarse como práctica de la Cábala tradicional.</div>`)};

RICH.ficha=()=>{const t=st('fT',0);const cells=st('cells'+t,{});const n=Object.values(cells).filter(Boolean).length;
 return dkH('Módulo 4','Tu ficha clínica','Registra, evalúa y da seguimiento a cada paciente. Practica marcando una ficha de ejemplo.')+
 `<div class="dk-chips">${FTYPES.map((x,i)=>`<button class="chip" ${rxa('set','fT',i)} ${pressed(i===t)}>${x}</button>`).join('')}</div>
  <div><div class="fgrid"><span class="hd"></span>${ROM.map(r=>`<span class="hd">C${r}</span>`).join('')}${ROM.map((r,ri)=>`<span class="hd">${r}</span>${ROM.map((_,ci)=>{const k=ri+','+ci;return `<button ${rxa('cell',t,k)} ${pressed(cells[k])} aria-label="Cuerpo ${r}, chakra ${ci+1}"></button>`}).join('')}`).join('')}</div>
  <p class="dk-note" style="margin-top:10px">Columnas = chakras (CI–CVII) · filas = cuerpos (I–VII). ${n?`Marcaste ${n} casillas en “${FTYPES[t]}”.`:'Toca una casilla para marcarla.'}</p></div>
  <div class="dk-chips">${['Estado energético','Chakras y miasmas','Seguimiento de avances','Tratamiento personalizado'].map(x=>`<span class="tg">${x}</span>`).join('')}</div>`};

RICH.prep=()=>{const o=st('prepT',{});const P=[['loto','Higiene energética'],['persona','Respiración consciente'],['escudo','Protección energética'],['corazon','Conexión espiritual'],['detecta','Intención clara']];
 const n=Object.values(o).filter(Boolean).length;
 return dkH('Módulo 4','Antes de cada sesión','Márcalos uno por uno, con calma.')+
 `<div class="sel-list">${P.map((x,i)=>`<button class="ck" ${rxa('tog','prepT',i)} ${pressed(o[i])}><span class="box"></span>${ic(x[0],22)}<b>${x[1]}</b></button>`).join('')}</div>
  <div class="detail"><h3>${n===5?'Lista para comenzar':`${n} de 5`}</h3><p>${n===5?'Respira, y sigue con la oración de conexión.':'Tómate el tiempo que necesites.'}</p>${n===5?`<div class="row"><button class="btn btn-primary btn-sm" data-slide="nextles">Ir a la oración</button></div>`:''}</div>`};

RICH.remote=()=>{const S=[['Conexión energética','Con el nombre completo y la fecha de nacimiento del paciente.'],['El péndulo como canal','Detecta, equilibra y armoniza la energía a distancia.'],['Protocolo consciente','El mismo que en la sesión presencial.'],['Respeto y ética','Amor, confidencialidad y la mejor intención.']];
 return dkH('Módulo 4','Trabajo a distancia','La distancia no es un límite: la energía y la intención nos conectan.')+
 `<div class="dk-split" style="align-items:start"><div>${S.map((x,i)=>`<div class="stp"><span class="n">${i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
  <div class="testigo"><header>Plantilla de trabajo (testigo)</header><div class="tb">
  <label>Nombre completo del paciente<input type="text" data-rsin="tgN" value="${esc(st('tgN',''))}"></label>
  <label>Fecha de nacimiento<input type="text" data-rsin="tgF" placeholder="dd/mm/aaaa" value="${esc(st('tgF',''))}"></label>
  <label class="cb"><input type="checkbox" data-rsin="tgP" ${st('tgP',false)?'checked':''}> Se sigue el mismo protocolo que presencial</label>
  <label>Notas<textarea data-rsin="tgT">${esc(st('tgT',''))}</textarea></label>
  <button class="btn btn-ghost btn-sm" data-toast="Plantilla de práctica: no se guarda">Guardar</button></div></div></div>`};

RICH.prayer=()=>{const i=st('pr',0);const full=st('prFull',0);const p=PRAYER[i];
 return dkH('Módulo 4','Oración de conexión con el péndulo')+
 chipRow('prFull',['Paso a paso','Texto completo'],full)+
 (full?`<div class="detail" style="gap:12px">${PRAYER.map(x=>`<p style="${x[0]==='oracion'?'font-family:var(--f-display);font-size:1.08rem;font-style:italic':''}">${x[1]}</p>`).join('')}</div>`
 :`<div class="breath" aria-hidden="true"></div>
  <div class="detail" style="text-align:center;min-height:150px;align-content:center"><span class="eyebrow">${p[0]==='guia'?'Guía':'Dilo en tu interior'} · ${i+1} de ${PRAYER.length}</span><p style="font-size:1.15rem;${p[0]==='oracion'?'font-family:var(--f-display);font-style:italic':''}">${p[1]}</p></div>
  <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('pr',-1)} ${i===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('pr',1)} ${i===PRAYER.length-1?'disabled':''}>Siguiente frase</button></div>`)};

RICH.close=()=>`<div class="dk-hero"><svg class="mo" aria-hidden="true"><use href="#mark"/></svg><span class="eyebrow">Cierre de la clase</span><h2>Hoy diste un paso más</h2>
  <p>Gracias por tu presencia, tu energía y tu compromiso. Confía en tu proceso, practica y deja que este conocimiento se integre en tu vida.</p><small class="dk-sig">Gracias, gracias, gracias</small></div>`;

RICH.quiz=()=>{const z=st('qz',{i:0,a:{}});
 if(z.fin){const sc=QUIZ.filter((q,i)=>z.a[i]===q.a).length;
  return dkH('Repaso','¡Terminaste!')+`<div class="detail" style="text-align:center;justify-items:center"><span class="qscore">${sc}/${QUIZ.length}</span><p>${sc>=QUIZ.length-1?'Dominas lo esencial del Nivel 1.':sc>=5?'Vas muy bien. Repasa lo que falló y sigue practicando.':'Vale la pena repasar las clases. Puedes volver cuando quieras.'}</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('qr',0)}>Intentar de nuevo</button></div></div>`}
 const q=QUIZ[z.i];const a=z.a[z.i];const done=a!==undefined;
 return dkH('Repaso · '+(z.i+1)+' de '+QUIZ.length,q.q)+
 `<div class="sel-list">${q.o.map((x,i)=>`<button class="qopt ${done?(i===q.a?'right':i===a?'wrong':''):''}" ${rxa('qa',i)} ${done?'disabled':''}><span class="l">${'ABC'[i]}</span><span>${x}</span></button>`).join('')}</div>
  ${done?`<div class="dk-call"><b>${a===q.a?'¡Correcto!':'Casi.'}</b> ${q.e}</div><div class="dk-cta"><button class="btn btn-primary btn-sm" ${rxa('qn',0)}>${z.i===QUIZ.length-1?'Ver resultado':'Siguiente pregunta'}</button></div>`:''}`};

RICH.next=()=>{const P=['Péndulo Hebreo','Limpieza de casas y espacios','Radiestesia y Sanación del Alma','Especializaciones','Tarot Terapéutico'];
 return dkH('Siguiente paso','Tu camino a Terapeuta Holístico Integral')+
 `<div class="mini-path">${P.map((x,i)=>`<div class="${i===0?'now':''}"><b>${i+1}</b><span>${x}</span></div>`).join('')}</div>
  <div class="dk-call"><b>Práctica presencial el próximo sábado.</b> Nos reunimos para vivir la práctica, compartir experiencias y seguir creciendo juntos.</div>
  <div class="dk-cta"><button class="btn btn-primary btn-sm" data-go="calendario">Ver calendario</button><button class="btn btn-ghost btn-sm" data-go="comunidad">Compartir en la comunidad</button><button class="btn btn-ghost btn-sm" data-open-level="espacios">Ir al Nivel 2</button></div>`};
