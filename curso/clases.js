// Casa Muladhara · contenido de las clases (solo alumnas con suscripción activa o la Maestra).
// Se sirve detrás de middleware.js: sin sesión con acceso devuelve 401/403.
// Es un script clásico: sus constantes quedan en el ámbito global que usa aula.html.
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

