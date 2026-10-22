// Casa Muladhara · contenido del Nivel 4 (solo con acceso a este nivel; lo exige middleware.js).
// Script clásico: sus constantes quedan en el ámbito global que usa aula.html. Se carga después de los niveles anteriores.
/* ---------- Nivel 4 · Especialización Niño Interno · Clase 1 ---------- */
const N4P='assets/n4/';
(function(){const c=document.createElement('style');c.id='ni-css';c.textContent=`
.ni{--ni-lil:#e6dcf2;--ni-lil2:#7a5aa6;--ni-tea:#d6e8e2;--ni-tea2:#3f7d6e;--ni-olv:#3b4a24;--ni-red:#c0392b}
.ni-tag{display:inline-block;font:600 .62rem/1 var(--f-caps);letter-spacing:.18em;text-transform:uppercase;color:var(--ni-lil2)}
.ni-cover{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:26px;align-items:center}
.ni-cover .nb-cover{min-height:0}
.ni-ph{position:relative;justify-self:center;width:min(100%,300px);margin:0 auto}
.ni-ph img{display:block;width:100%;aspect-ratio:605/648;object-fit:cover;border-radius:999px 999px 22px 22px;border:4px solid #f3ecd8;box-shadow:0 22px 50px -26px rgba(28,58,43,.7)}
.ni-arc{display:block;width:58%;margin:14px auto 0}
.ni-arc path{fill:none;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:niDraw 1.6s cubic-bezier(.3,.7,.2,1) forwards}
.ni-arc path:nth-child(2){animation-delay:.25s}.ni-arc path:nth-child(3){animation-delay:.5s}
.ni-arc circle{transform-origin:50% 100%;transform-box:fill-box;animation:niPop .7s .9s both, niBeat 2.6s 1.8s ease-in-out infinite}
@keyframes niDraw{to{stroke-dashoffset:0}}
@keyframes niPop{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes niBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes niUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes niFade{from{opacity:0}to{opacity:1}}
@keyframes niGlow{0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--ni-lil2) 35%,transparent)}50%{box-shadow:0 0 0 10px transparent}}
.ni-st>*{animation:niUp .55s both}
.ni-st>*:nth-child(2){animation-delay:.07s}.ni-st>*:nth-child(3){animation-delay:.14s}.ni-st>*:nth-child(4){animation-delay:.21s}.ni-st>*:nth-child(5){animation-delay:.28s}.ni-st>*:nth-child(6){animation-delay:.35s}.ni-st>*:nth-child(7){animation-delay:.42s}.ni-st>*:nth-child(8){animation-delay:.49s}
.ni-in{animation:niFade .45s both}
.ni-agenda{display:grid;gap:8px;counter-reset:ag}
.ni-agenda button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:34px 1fr auto;gap:12px;align-items:center;padding:10px 14px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);transition:transform .2s,border-color .2s}
.ni-agenda button:hover,.ni-agenda button:focus-visible{transform:translateX(4px);border-color:var(--ni-lil2)}
.ni-agenda b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--ni-lil2);color:#fff;font:600 .85rem/1 var(--f-caps)}
.ni-agenda small{color:var(--nb-soft);font-size:.72rem}
.ni-obj{background:var(--ni-olv);color:#ece7d3;border-radius:20px;padding:22px;display:grid;gap:10px;align-content:center}
.ni-obj h3{color:#fff;font:400 1.35rem/1.2 var(--f-display);margin:0}
.ni-obj p{margin:0;color:#dfe3cf;line-height:1.55}
.ni-quote{background:var(--ni-lil);color:#4a3470;border-radius:16px;padding:16px 20px;font:italic 400 1.1rem/1.45 var(--f-display)}
.ni-time{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding-top:54px}
.ni-time::before{content:"";position:absolute;left:6%;right:6%;top:24px;height:3px;border-radius:3px;background:var(--nb-line)}
.ni-time .fill{position:absolute;left:6%;top:24px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--ni-tea2),var(--ni-lil2));transition:width .5s}
.ni-time .kid{position:absolute;top:0;width:46px;height:46px;margin-left:-23px;display:grid;place-items:center;border-radius:50%;background:var(--nb-paper);border:2px solid var(--ni-lil2);color:var(--ni-lil2);animation:niPop .45s both;z-index:1}
.ni-time button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:6px;align-content:start;padding:14px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);min-height:100%}
.ni-time button[aria-pressed="true"]{border-color:var(--ni-lil2);background:color-mix(in srgb,var(--ni-lil) 60%,var(--nb-paper));animation:niGlow 2.4s ease-in-out infinite}
.ni-time button b{font:400 1.05rem/1.2 var(--f-display)}
.ni-time button small{font:600 .58rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.ni-time button span{font-size:.84rem;color:var(--nb-soft);line-height:1.45}
.ni-built{background:var(--ni-olv);border-radius:18px;padding:16px;display:grid;gap:12px}
.ni-built .ni-tag{color:#d9c9ef}
.ni-built .row4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.ni-built .row4 span{display:grid;place-items:center;text-align:center;padding:12px 8px;border-radius:12px;font-weight:600;font-size:.86rem;background:rgba(236,231,211,.08);color:rgba(236,231,211,.35);border:1px dashed rgba(236,231,211,.25);transition:all .4s}
.ni-built .row4 span.on{background:var(--ni-lil);color:#3b2a5a;border:1px solid transparent;animation:niPop .4s both}
.ni-chain{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:stretch}
.ni-chain button{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:grid;gap:6px;align-content:start;padding:14px 12px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);opacity:.45;transition:opacity .35s,transform .35s}
.ni-chain button.lit{opacity:1}
.ni-chain button.cur{transform:translateY(-6px);border-color:var(--ni-lil2);box-shadow:0 14px 30px -20px rgba(58,40,90,.7)}
.ni-chain button.mask{background:var(--ni-olv);color:#ece7d3;border-color:var(--ni-olv)}
.ni-chain button.mask span{color:#dfe3cf}
.ni-chain button small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.ni-chain button.mask small{color:#d9c9ef}
.ni-chain button b{font:400 1.05rem/1.2 var(--f-display)}
.ni-chain button span{font-size:.82rem;line-height:1.45;color:var(--nb-soft)}
.ni-chain button:not(:last-child)::after{content:"";position:absolute;right:-8px;top:50%;width:8px;height:2px;background:var(--ni-lil2);opacity:.6}
.ni-hpills{display:flex;gap:6px;flex-wrap:wrap}
.ni-hpills button{all:unset;cursor:pointer;display:inline-flex;gap:6px;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid var(--nb-line);font-size:.8rem;color:var(--nb-soft);background:var(--nb-paper)}
.ni-hpills button[aria-current="true"]{background:var(--ni-lil2);border-color:var(--ni-lil2);color:#fff}
.ni-hpills .ic{width:16px;height:16px;stroke:currentColor}
.ni-bel{font:italic 400 clamp(1.15rem,2.6vw,1.5rem)/1.35 var(--f-display);color:var(--ni-lil2);margin:0;animation:niUp .7s .15s both}
.ni-mask{all:unset;box-sizing:border-box;cursor:pointer;display:block;perspective:1000px;height:210px}
.ni-mask>span{display:block;position:relative;width:100%;height:100%;transition:transform .7s cubic-bezier(.3,.7,.2,1);transform-style:preserve-3d}
.ni-mask.on>span{transform:rotateY(180deg)}
.ni-mask .f,.ni-mask .b{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;padding:18px;display:grid;align-content:center;gap:8px}
.ni-mask .f{background:var(--ni-lil);color:#3b2a5a}
.ni-mask .f .ic{stroke:var(--ni-lil2);animation:niFloat 3.2s ease-in-out infinite}
.ni-mask .b{background:var(--ni-olv);color:#ece7d3;transform:rotateY(180deg)}
.ni-mask b{font:400 1.25rem/1.2 var(--f-display)}
.ni-mask p{margin:0;font-size:.9rem;line-height:1.5}
.ni-mask em{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;font-style:normal;opacity:.75}
@keyframes niFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.ni-box{border-radius:16px;padding:16px 18px;display:grid;gap:6px}
.ni-box b{font:400 1.08rem/1.2 var(--f-display)}
.ni-box p{margin:0;font-size:.9rem;line-height:1.5}
.ni-box.t{background:var(--ni-tea);color:#1f3f32}
.ni-box.l{background:var(--ni-lil);color:#3b2a5a}
.ni-box.d{background:var(--ni-olv);color:#ece7d3}
.ni-box.d p{color:#dfe3cf}
.ni-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.ni-row>div{border-radius:14px;padding:12px;background:var(--nb-paper);border:1px solid var(--nb-line);display:grid;gap:4px;align-content:start}
.ni-row small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.ni-row span{font-size:.88rem;color:var(--nb-ink);line-height:1.4}
.ni-tbl{width:100%;border-collapse:separate;border-spacing:0 6px;font-size:.86rem}
.ni-tbl th{font:600 .58rem/1 var(--f-caps);letter-spacing:.14em;text-transform:uppercase;text-align:left;padding:8px 10px;color:#ece7d3;background:var(--ni-olv)}
.ni-tbl th:first-child{border-radius:10px 0 0 10px}.ni-tbl th:last-child{border-radius:0 10px 10px 0}
.ni-tbl td{padding:10px;background:var(--nb-paper);color:var(--nb-ink);border-top:1px solid var(--nb-line);border-bottom:1px solid var(--nb-line);vertical-align:top}
.ni-tbl td:first-child{border-left:1px solid var(--nb-line);border-radius:10px 0 0 10px;font-weight:600}
.ni-tbl td:last-child{border-right:1px solid var(--nb-line);border-radius:0 10px 10px 0}
.ni-tbl tr.on td{background:var(--ni-lil);border-color:transparent}
.ni-tbl td:nth-child(2){color:var(--ni-lil2);font-weight:600}
.ni-tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
.ni-conf{position:relative;height:120px;border-radius:18px;background:linear-gradient(90deg,var(--ni-lil),var(--nb-paper) 50%,var(--ni-tea));overflow:hidden}
.ni-conf .c{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:var(--ni-red);opacity:.85;animation:niBeat 1.6s ease-in-out infinite;display:grid;place-items:center;color:#fff;font:600 .5rem/1 var(--f-caps);letter-spacing:.1em}
.ni-conf .p{position:absolute;top:50%;width:40px;height:40px;margin-top:-20px;border-radius:50%;display:grid;place-items:center}
.ni-conf .p .ic{stroke:#fff;width:22px;height:22px}
.ni-conf .r{left:calc(50% - 90px);background:var(--ni-lil2);animation:niAway 3.2s ease-in-out infinite}
.ni-conf .a{left:calc(50% + 50px);background:var(--ni-tea2);animation:niNear 3.2s ease-in-out infinite}
.ni-conf .lb{position:absolute;bottom:8px;font:600 .58rem/1 var(--f-caps);letter-spacing:.14em;text-transform:uppercase}
.ni-conf .lb.r1{left:14px;color:var(--ni-lil2)}.ni-conf .lb.a1{right:14px;color:var(--ni-tea2)}
.ni-conf.dim-r .r,.ni-conf.dim-r .r1{opacity:.15}.ni-conf.dim-a .a,.ni-conf.dim-a .a1{opacity:.15}
@keyframes niAway{0%,15%{transform:translateX(0)}55%,80%{transform:translateX(-36vw)}100%{transform:translateX(0)}}
@keyframes niNear{0%,15%{transform:translateX(0)}55%,80%{transform:translateX(-24px)}100%{transform:translateX(0)}}
@media (min-width:900px){@keyframes niAway{0%,15%{transform:translateX(0)}55%,80%{transform:translateX(-260px)}100%{transform:translateX(0)}}}
.ni-cmp{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1fr) minmax(0,1fr);gap:6px}
.ni-cmp>*{padding:10px 12px;border-radius:10px;font-size:.88rem}
.ni-cmp .h{font:600 .6rem/1.2 var(--f-caps);letter-spacing:.12em;text-transform:uppercase;color:#fff}
.ni-cmp .h.r{background:var(--ni-lil2);color:#fff}.ni-cmp .h.a{background:var(--ni-olv);color:#fff}
.ni-cmp .k{font-weight:600;color:var(--nb-ink);padding-left:0}
.ni-cmp .r{background:var(--ni-lil);color:#3b2a5a}.ni-cmp .a{background:var(--ni-tea);color:#1f3f32}
.ni-cmp .off{opacity:.25}
.ni-fig{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.ni-fig>div{border-radius:18px;padding:16px;display:grid;gap:8px;align-content:start}
.ni-fig ul{margin:0;padding-left:18px;display:grid;gap:6px;font-size:.88rem;line-height:1.45}
.ni-fig li{animation:niUp .45s both}
.ni-fig .ni-tag{margin-bottom:2px}
.ni-read{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;align-items:stretch}
.ni-read>label,.ni-read>div{border-radius:14px;padding:10px 12px;background:var(--nb-paper);border:1px solid var(--nb-line);display:grid;gap:6px;align-content:start}
.ni-read small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.ni-read span{font:400 1.05rem/1.25 var(--f-display);color:var(--nb-ink)}
.ni-read input{all:unset;box-sizing:border-box;width:100%;font:400 1.05rem/1.2 var(--f-display);color:var(--nb-ink);border-bottom:1px dashed var(--nb-line);padding:2px 0}
.ni-read .dk-chips{gap:4px}.ni-read .chip{padding:5px 9px;font-size:.78rem}
.ni-hyp{background:var(--ni-olv);color:#ece7d3;border-radius:18px;padding:18px 20px;display:grid;gap:8px}
.ni-hyp .ni-tag{color:#d9c9ef}
.ni-hyp p{margin:0;font:400 1.08rem/1.55 var(--f-display)}
.ni-hyp mark{background:none;color:#f2c66d}
.ni-med{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.ni-med button{all:unset;box-sizing:border-box;cursor:pointer;text-align:center;display:grid;gap:4px;justify-items:center;padding:12px 8px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);font-size:.86rem;transition:transform .2s}
.ni-med button:hover{transform:translateY(-3px)}
.ni-med button[aria-pressed="true"]{border-color:var(--ni-lil2);background:var(--ni-lil)}
.ni-med button.ok{background:var(--ni-tea);border-color:var(--ni-tea2);cursor:default}
.ni-med button.ok i{color:var(--ni-tea2);font-style:normal;font-weight:600}
.ni-med button.no{animation:niShake .4s}
@keyframes niShake{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.ni-med .ic{stroke:var(--ni-lil2)}
.ni-orb{width:min(46vw,190px);aspect-ratio:1;border-radius:50%;justify-self:center;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,#fff6,transparent 60%),radial-gradient(circle,var(--ni-lil) 0,var(--ni-lil2) 100%);box-shadow:0 0 0 14px color-mix(in srgb,var(--ni-lil) 45%,transparent),0 0 60px 10px color-mix(in srgb,var(--ni-lil2) 35%,transparent);animation:niOrb 8s ease-in-out infinite;color:#fff;text-align:center;font:600 .62rem/1.3 var(--f-caps);letter-spacing:.16em;text-transform:uppercase}
.ni-orb span::before{content:"Inhala";animation:niOrbT 8s steps(1) infinite}
@keyframes niOrb{0%,100%{transform:scale(.82)}50%{transform:scale(1.05)}}
@keyframes niOrbT{0%{content:"Inhala"}50%{content:"Exhala"}}
.ni-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.ni-steps button{all:unset;box-sizing:border-box;cursor:pointer;padding:10px;border-radius:12px;background:var(--ni-olv);color:#cfd5bf;font-size:.8rem;display:grid;gap:4px;opacity:.55;transition:opacity .3s}
.ni-steps button[aria-pressed="true"]{opacity:1;color:#fff;box-shadow:inset 0 0 0 2px #d9c9ef}
.ni-steps small{font:600 .52rem/1 var(--f-caps);letter-spacing:.14em;text-transform:uppercase;color:#d9c9ef}
.ni-case{display:grid;gap:10px;align-content:start;border-radius:18px;padding:16px;background:var(--nb-paper);border:1px solid var(--nb-line)}
.ni-case h3{margin:0;font:400 1.15rem/1.2 var(--f-display);color:var(--nb-ink)}
.ni-case>p{margin:0;font-size:.9rem;line-height:1.5;color:var(--nb-soft)}
.ni-case .dk-chips{gap:4px}.ni-case .chip{padding:5px 9px;font-size:.78rem}
.ni-case .res{border-radius:12px;padding:10px 12px;font-size:.86rem;line-height:1.45;animation:niUp .4s both}
.ni-case .res.ok{background:var(--ni-tea);color:#1f3f32}.ni-case .res.no{background:#f6e3dc;color:#7a2e1f}
.ni-task{display:grid;gap:10px}
@media (max-width:760px){.ni-cover{grid-template-columns:1fr}.ni-time{grid-template-columns:1fr 1fr;padding-top:0}.ni-time::before,.ni-time .fill,.ni-time .kid{display:none}
 .ni-built .row4,.ni-row,.ni-read{grid-template-columns:1fr 1fr}.ni-chain{grid-template-columns:1fr}.ni-chain button{opacity:1}.ni-chain button:not(.lit){opacity:.55}.ni-chain button::after{display:none}
 .ni-fig{grid-template-columns:1fr}.ni-med{grid-template-columns:repeat(3,minmax(0,1fr))}.ni-med button{font-size:.78rem;overflow-wrap:anywhere}.ni-steps{grid-template-columns:1fr}.ni-cmp{font-size:.82rem}}
`;document.head.appendChild(c)})();

Object.assign(IC,{
 regalo:'<path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13"/><path d="M12 7c-2-3-5-3-5-1s3 1 5 1zm0 0c2-3 5-3 5-1s-3 1-5 1z"/>',
 voz:'<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 vientre:'<path d="M12 4c4 0 7 3.6 7 8s-3 8-7 8-7-3.6-7-8 3-8 7-8z"/><circle cx="12" cy="13" r="3"/>'
});

const NIK='Especialización Niño Interno · Clase 1';
const NI_H=[
 {n:'Rechazo',m:'Evasivo/a',ic:'xcirc',med:'aceptación',mic:'corazon',need:'Ser aceptado tal como es',act:'Siente que no lo ven o no lo quieren',sana:'El derecho a existir y ocupar su lugar',
  viv:'Sintió que no era deseado o aceptado tal como era: por su llegada, su sexo, su forma de ser o sus necesidades. Es la herida más temprana; puede originarse en el vientre o en el primer año de vida.',
  cre:'No tengo derecho a existir tal como soy.',
  adu:['Se siente invisible o fuera de lugar en los grupos','Se aísla o desaparece ante el conflicto','Duda de su valor y se compara constantemente','Le cuesta recibir afecto y reconocimiento'],
  masc:'Se protege desapareciendo: se retira, se calla o se refugia en su mundo interior para no volver a sentir el rechazo.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del mismo sexo.',
  qs:'Reconocer su derecho a existir, ocupar su lugar y ser vista o visto sin tener que esconderse.',pg:'¿En qué situaciones has visto a alguien desaparecer para no sentirse rechazado?',
  hv:'sintió que no era aceptado tal como era',ha:'retirarse, callarse y refugiarse en su mundo interior'},
 {n:'Abandono',m:'Dependiente',ic:'nino',med:'presencia',mic:'grupo',need:'Presencia y apoyo emocional',act:'Se queda solo o siente distancia',sana:'La capacidad de sostenerse a sí mismo',
  viv:'Sintió que le faltó presencia, compañía o apoyo emocional. Puede venir de ausencias reales, como separaciones, hospitalizaciones o padres que trabajaban mucho, o de adultos presentes en el cuerpo pero no en lo emocional.',
  cre:'Si me dejan sola o solo, no voy a poder.',
  adu:['Miedo intenso a la soledad y a perder a quien ama','Necesita atención y aprobación constantes','Permanece en relaciones que le hacen daño','Le cuesta tomar decisiones sin apoyo'],
  masc:'Se protege buscando sostén en otros: pide ayuda, se aferra y hace lo posible para no quedarse sola o solo.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del sexo opuesto.',
  qs:'Aprender a acompañarse, sostener su propia soledad y elegir los vínculos desde el deseo y no desde el miedo.',pg:'¿Qué diferencia hay entre estar acompañada y sentirse acompañada?',
  hv:'vivió la falta de presencia',ha:'aferrarse, pedir aprobación y temerle a la distancia'},
 {n:'Humillación',m:'Masoquista',ic:'gota',med:'dignidad',mic:'estrella',need:'Respeto por su cuerpo y su dignidad',act:'Siente vergüenza o culpa por lo que desea',sana:'La dignidad y el permiso para disfrutar',
  viv:'Se sintió avergonzado, controlado o ridiculizado, sobre todo en relación con su cuerpo, sus necesidades o sus deseos. Aprendió que el placer y la libertad eran motivo de culpa.',
  cre:'Lo que yo deseo está mal; primero los demás.',
  adu:['Carga con los problemas de otros y se olvida de sí','Siente vergüenza de su cuerpo o de sus deseos','Le cuesta disfrutar sin sentir culpa','Se pone en segundo lugar para ser querida o querido'],
  masc:'Se protege cargando y sirviendo: se sacrifica por otros y se castiga antes de que alguien la humille.',
  fig:'Según Bourbeau, suele vivirse con quien se ocupó de su cuerpo y su crianza, con frecuencia la madre.',
  qs:'Recuperar su dignidad, darse permiso para disfrutar y poner límites sin culpa.',pg:'¿Cómo se ve en el día a día alguien que siempre se pone en segundo lugar?',
  hv:'se sintió avergonzado o controlado en su cuerpo y sus deseos',ha:'cargar con otros, sacrificarse y ponerse en segundo lugar'},
 {n:'Traición',m:'Controlador',ic:'candado',med:'confianza',mic:'escudo',need:'Poder confiar en el adulto',act:'Se rompe una promesa o un compromiso',sana:'La confianza y el soltar el control',
  viv:'Sintió que un adulto importante no cumplió lo que prometió, no lo protegió o lo usó para sus propias necesidades. Perdió la confianza en que el amor era seguro.',
  cre:'Si no controlo, me van a fallar.',
  adu:['Necesita controlar situaciones y personas','Le cuesta delegar y confiar','Se impacienta y necesita tener la razón','Sospecha de las intenciones de los demás'],
  masc:'Se protege adelantándose: planifica, vigila y decide por otros para no volver a ser defraudado.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del sexo opuesto.',
  qs:'Volver a confiar, soltar el control y aceptar que los demás pueden fallar sin que eso la destruya.',pg:'¿Qué tipo de promesa no cumplida puede quebrar la confianza de un niño?',
  hv:'sintió que no cumplieron lo prometido o que no lo protegieron',ha:'adelantarse, vigilar y controlar para no volver a ser defraudado'},
 {n:'Injusticia',m:'Rígido/a',ic:'balanza',med:'reconocimiento',mic:'sol',need:'Reconocimiento, calidez y equidad',act:'Percibe trato desigual o frialdad',sana:'El permiso para sentir y descansar',
  viv:'Creció con adultos fríos, exigentes o autoritarios. Sintió que lo valoraban por lo que hacía bien y no por lo que era, o que lo trataban distinto que a otros.',
  cre:'Tengo que ser perfecta o perfecto para merecer.',
  adu:['Perfeccionismo y autoexigencia alta','Le cuesta mostrar emociones y vulnerabilidad','Se juzga con dureza a sí mismo y a otros','Trabaja de más y le cuesta descansar'],
  masc:'Se protege con orden y perfección: se desconecta de lo que siente para no sufrir.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del mismo sexo.',
  qs:'Permitirse sentir, equivocarse y descansar, y reconocer su valor más allá de lo que logra.',pg:'¿Cómo distinguimos una exigencia sana de la máscara rígida?',
  hv:'vivió frialdad, exigencia o un trato distinto que a otros',ha:'ser perfecto, exigirse y desconectarse de lo que siente'}
];
const niBox=(c,t,p)=>`<div class="ni-box ${c}"><b>${t}</b>${p?`<p>${p}</p>`:''}</div>`;
const niQ=t=>`<div class="ni-quote">${t}</div>`;
const niNote=t=>`<p class="dk-note" style="text-align:center">${t}</p>`;

/* ----- 1 · Bienvenida y agenda ----- */
RICH.ni1=()=>`<div class="ni">${nbHero('Especialización Niño Interno · Clase 1','Lo que el niño interno','nos enseña a sanar','Las cinco heridas, sus máscaras y las figuras de madre y padre, leídas en el gráfico con mayor profundidad.',['Heridas','Máscaras','Madre y padre','Sanación'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="${N4P}nino/abrazo.webp" alt="Una mujer abraza con ternura a una niña, con los ojos cerrados"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#cfe3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#e6dcf2" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#c0392b"/></svg></div>`)}</div>`;
const NI_AG=['Qué es el niño interno y cómo se forma','Qué podemos sanar con él','Cómo se forma una herida','Las cinco heridas, una por una','Rechazo y abandono: diferencias','El gráfico: la madre y el padre','Lectura profunda y camino de sanación','Meditación: encuentro con mi niño interior','Práctica, repaso y tarea'];
const NI_OBJ=['Explicar qué es el niño interno y cómo se forma','Reconocer las cinco heridas y su máscara en un caso','Distinguir rechazo de abandono','Relacionar madre y padre con el anillo 4'];
// la especialización es el primer módulo del Nivel 4; cada momento de la agenda es una lección
RICH.ni2=()=>dkH('Clase 1','Agenda de la clase','Nueve momentos. Toca uno para ir directo a él.')+
 `<div class="ni dk-split" style="align-items:stretch"><div class="ni-agenda ni-st">${NI_AG.map((x,i)=>`<button data-les="${S.lesson[0]},${i+1}"><b>${i+1}</b><span>${x}</span><small>Ir</small></button>`).join('')}</div>
 <div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Objetivo de hoy</span><h3>Al terminar la clase podrás</h3><ul class="ni-st" style="margin:0;padding-left:18px;display:grid;gap:8px;color:#dfe3cf;line-height:1.5">${NI_OBJ.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`;

/* ----- 2 · El niño interno ----- */
RICH.ni3=()=>dkH('El niño interno','¿Qué es el niño interno?','Es la estructura inicial que formó lo que hoy soy: la parte de nosotros que guarda las emociones, los recuerdos, las experiencias y las necesidades de la infancia.')+
 `<div class="ni dk-split" style="align-items:start"><div style="display:grid;gap:12px"><p style="margin:0;line-height:1.6">No se quedó en el pasado: sigue presente en la vida adulta e influye en cómo pensamos, sentimos, decidimos y nos relacionamos. <b>Cuando algo nos duele más de lo que la situación amerita, muchas veces es el niño interno el que está reaccionando.</b></p>${niQ('Es una parte viva que necesita ser vista, escuchada y sanada.')}</div>
 <div style="display:grid;gap:8px"><div class="dk-sub">Qué guarda · toca cada tarjeta</div>${n3flip('nig',[['corazon','Emociones','Alegría, miedo, tristeza y rabia que no siempre pudieron expresarse.'],['reloj','Recuerdos','Momentos que marcaron, aunque hoy no se recuerden con claridad.'],['grupo','Experiencias','Lo que vivió con su madre, su padre, su familia y su entorno.'],['regalo','Necesidades','Amor, presencia, respeto y protección: lo que recibió y lo que faltó.']],'c4',170)}</div></div>`;
const NI_ET=[['Vientre y nacimiento','Primeras sensaciones de ser esperado y bienvenido, o de no serlo.'],['Primeros años','Con la madre, el padre o quien lo cuidó aprende si el mundo es seguro y si lo van a atender.'],['Infancia','Absorbe lo que ve y escucha, imita a los adultos y forma la imagen de quién es y cuánto vale.'],['Adolescencia','Esa imagen se refuerza o se cuestiona. También aquí pueden quedar heridas.']];
const NI_BUILT=['Cómo me veo','Cómo veo a los demás','Cómo amo y me vinculo','Qué creo merecer'];
RICH.ni4=()=>{const s=n3clamp(st('niet',0),0,3);const pos=6+s*(88/3);
 return dkH('El niño interno','¿Cómo se forma el niño interno?','Se va construyendo a lo largo de la infancia, con cada vínculo, cada experiencia y cada emoción vivida. Recorre las etapas.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-time"><i class="fill" style="width:${pos-6}%"></i><span class="kid" style="left:${pos}%" aria-hidden="true">${ic('nino',24)}</span>
 ${NI_ET.map((x,i)=>`<button ${rxa('set','niet',i)} ${pressed(i===s)}><small>Etapa ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 <div class="ni-built"><span class="ni-tag">Lo que queda construido</span><div class="row4">${NI_BUILT.map((x,i)=>`<span class="${i<=s?'on':''}" style="animation-delay:${i*.08}s">${x}</span>`).join('')}</div></div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','niet',s+1)}>Siguiente etapa</button></div>`:`<div class="ni-quote ni-in">Esa base no es un destino: en la vida adulta se puede mirar, comprender y sanar.</div>`}</div>`};
RICH.ni5=()=>dkH('El niño interno','¿Qué podemos sanar con el niño interno?','Seis caminos de sanación. Toca cada uno.')+
 `<div class="ni">${n3flip('nis',[['estrella','Autoestima y merecimiento','Sentir que vale y que merece amor, descanso y abundancia sin tener que ganárselo.'],['corazon','Relaciones y pareja','Dejar de buscar en la pareja al padre o a la madre que faltó, y elegir vínculos más sanos.'],['grupo','Vínculo con madre y padre','Mirar a los padres con comprensión, soltar el reclamo y tomar lo bueno que dieron.'],['espiral','Patrones que se repiten','Reconocer el origen de reacciones automáticas: huir, aferrarse, aguantar, controlar o exigirse.'],['voz','Límites y voz propia','Aprender a decir que no, pedir lo que necesita y expresar lo que siente.'],['sol','Alegría y creatividad','Recuperar el juego, la espontaneidad y la capacidad de disfrutar la vida.']],'c3',170)}</div>`+
 n3quote('Sanar no cambia lo que pasó: <mark>cambia la forma en que eso sigue actuando hoy.</mark>');

/* ----- 3 · Cómo se forma una herida ----- */
const NI_PA=[['Necesidad','El niño necesitaba ser aceptado, acompañado, respetado, protegido o tratado con justicia.'],['Emoción','Lo que no recibió se vive como miedo, tristeza, vergüenza o rabia.'],['Creencia','Concluye algo sobre sí mismo: «no merezco», «me van a dejar», «no puedo confiar».'],['Máscara','Crea una forma de protegerse para no volver a sentir ese dolor.'],['Patrón adulto','La protección se vuelve hábito y sigue actuando aunque ya no haga falta.']];
RICH.ni6=()=>{const s=n3clamp(st('nipa',0),0,4);
 return dkH('Cómo se forma una herida','De la necesidad al patrón adulto','Cinco pasos que se encadenan. Avanza uno por uno.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-chain">${NI_PA.map((x,i)=>`<button class="${i<=s?'lit':''} ${i===s?'cur':''} ${i===3?'mask':''}" ${rxa('set','nipa',i)}><small>Paso ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${s<4?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','nipa',s+1)}>Siguiente paso</button></div>`:`<div class="ni-quote ni-in">Por eso en el gráfico la herida y la máscara están juntas: <b>la herida es lo que dolió; la máscara, lo que la persona aprendió a hacer para no sentirlo.</b></div>`}</div>`};
RICH.ni7=()=>{const s=st('nivt',0),all=st('nivtA',0);
 const row=(h,i)=>`<tr class="${i===s?'on':''}"><td>${h.n}</td><td>${h.m}</td><td>${h.need}</td><td>${h.act}</td><td>${h.sana}</td></tr>`;
 return dkH('Cómo se forma una herida','Las cinco heridas de un vistazo','Toca una herida para ver qué necesitaba el niño, cuándo se activa y lo que se sana.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="ni-hpills">${NI_H.map((h,i)=>`<button ${rxa('set','nivt',i)} aria-current="${i===s}">${ic(h.ic,16)}${h.n}</button>`).join('')}</div>
 ${s>=0&&!all?`<div class="ni-row ni-st" style="grid-template-columns:repeat(4,minmax(0,1fr))"><div><small>Máscara</small><span><b>${NI_H[s].m}</b></span></div><div><small>Lo que el niño necesitaba</small><span>${NI_H[s].need}</span></div><div><small>Se activa cuando…</small><span>${NI_H[s].act}</span></div><div><small>Lo que se sana</small><span>${NI_H[s].sana}</span></div></div>`:''}
 ${all?`<div class="ni-tw ni-in"><table class="ni-tbl"><thead><tr><th>Herida</th><th>Máscara</th><th>Lo que el niño necesitaba</th><th>Se activa cuando…</th><th>Lo que se sana</th></tr></thead><tbody>${NI_H.map(row).join('')}</tbody></table></div>`:''}
 <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','nivtA',all?0:1)}>${all?'Ver una por una':'Ver la tabla completa'}</button></div></div>`+
 niNote('Basado en el enfoque de las cinco heridas de Lise Bourbeau, adaptado al gráfico del niño interno de Casa Muladhara.')};

/* ----- 4 · Las cinco heridas ----- */
const niHerida=i=>()=>{const h=NI_H[i],k='nih'+i,mo=!!st(k+'m',{})[0];
 return `<div class="ni" style="display:grid;gap:14px"><div class="ni-hpills">${NI_H.map((x,j)=>`<button data-slide="${j}" aria-current="${j===i}">${ic(x.ic,16)}${x.n}</button>`).join('')}</div></div>`+
 dkH('Herida '+(i+1)+' de 5 · Máscara '+h.m,'Herida de '+h.n.toLowerCase())+
 `<div class="ni dk-split" style="align-items:start"><div style="display:grid;gap:12px"><div class="dk-sub">Cómo se vivió</div><p style="margin:0;line-height:1.6">${h.viv}</p><p class="ni-bel">«${h.cre}»</p>
  <div class="dk-sub">En la vida adulta · marca lo que reconoces en una persona</div>${n3ck(k,h.adu.map(x=>['',x]))}</div>
 <div style="display:grid;gap:10px"><button class="ni-mask ${mo?'on':''}" ${rxa('flip',k+'m',0)} ${pressed(mo)} aria-label="Máscara ${h.m}: toca para ver lo que protege"><span><span class="f">${ic('mascara',34)}<em>Lo que se ve · toca para mirar detrás</em><b>Máscara ${h.m}</b><p>${h.masc}</p></span>
  <span class="b"><em>Detrás de la máscara</em><b>Herida de ${h.n.toLowerCase()}</b><p>El niño necesitaba: <strong>${h.need.toLowerCase()}</strong>. Se activa cuando ${h.act.toLowerCase()}.</p></span></span></button>
  ${niBox('t','Figura asociada',h.fig+' En el gráfico, la figura se confirma siempre con el péndulo.')}
  ${niBox('d','Qué se sana',h.qs)}</div></div>
 <div class="ni ni-pg"><div class="dk-call"><b>Pregunta al grupo.</b> <i>${h.pg}</i></div>${n3area('nipg'+i,'Tu respuesta (opcional)','Lo que he visto…')}</div>`};
[8,9,10,11,12].forEach((n,i)=>{RICH['ni'+n]=niHerida(i)});

/* ----- 5 · Rechazo y abandono ----- */
const NI_RA=[['Qué duele','No ser aceptado por lo que es','Que le falte presencia y apoyo'],['Miedo central','No valer, no tener lugar','Quedarse sola o solo'],['Ante el conflicto','Se aleja y desaparece','Se acerca y se aferra'],['Lo que busca','Pasar desapercibido','Compañía y atención'],['Lo que sana','Su derecho a existir','Sostenerse a sí mismo']];
RICH.ni13=()=>{const v=st('nira',0);
 return dkH('Rechazo y abandono','No son lo mismo','Ante el mismo conflicto, el rechazo huye y el abandono se aferra. Míralo en movimiento.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-conf ${v===1?'dim-a':v===2?'dim-r':''}" aria-hidden="true"><span class="c">Conflicto</span><span class="p r">${ic('persona',22)}</span><span class="p a">${ic('persona',22)}</span><span class="lb r1">Rechazo · se aleja</span><span class="lb a1">Abandono · se aferra</span></div>
 ${chipRow('nira',['Ver las dos','Solo rechazo','Solo abandono'],v)}
 <div class="ni-cmp"><span></span><span class="h r">Rechazo · Evasivo/a</span><span class="h a">Abandono · Dependiente</span>
 ${NI_RA.map(x=>`<span class="k">${x[0]}</span><span class="r ${v===2?'off':''}">${x[1]}</span><span class="a ${v===1?'off':''}">${x[2]}</span>`).join('')}</div>
 ${niQ('Una misma persona puede tener ambas heridas.')}</div>`};

/* ----- 6 · La madre y el padre ----- */
const NI_FIG={
 madre:{t:'La madre en el gráfico',rep:['Nutrición y cuidado del cuerpo','Acogida y vínculo afectivo','Capacidad de recibir','Seguridad emocional y merecimiento'],her:['Dificultad para recibir y pedir ayuda','Sensación de no ser suficiente','Poco autocuidado y desconexión del cuerpo','Búsqueda de cuidado materno en la pareja'],san:['Mirarla como mujer, con su propia historia','Tomar la vida que dio y soltar lo que no pudo dar','Aprender a nutrirse y cuidarse a sí misma o a sí mismo'],q:'Sanar a la madre interna es aprender a darse el cuidado que no se recibió.',c1:'l'},
 padre:{t:'El padre en el gráfico',rep:['Protección y límites','Estructura y dirección','Confianza para salir al mundo','Logro, trabajo y prosperidad'],her:['Inseguridad para decidir y avanzar','Conflicto con la autoridad o los límites','Bloqueos con el trabajo o el dinero','Búsqueda de aprobación y protección en otros'],san:['Reconocer su historia y sus propios límites','Tomar la fuerza que dio y soltar el reclamo','Construir su propia protección y dirección'],q:'Sanar al padre interno es aprender a protegerse y a avanzar con confianza.',c1:'t'}};
const niFig=f=>()=>{const F=NI_FIG[f],k='nif'+f,s=n3clamp(st(k,0),0,2);
 const col=(i,c,eb,items,x)=>`<div class="ni-box ${c}" style="${x||''};${i>s?'opacity:.25;filter:blur(1.5px)':''};transition:opacity .4s,filter .4s"><span class="ni-tag"${c==='d'?' style="color:#d9c9ef"':''}>${eb}</span>${i<=s?`<ul style="margin:0;padding-left:18px;display:grid;gap:6px;font-size:.88rem;line-height:1.45">${items.map((x,j)=>`<li style="animation:niUp .45s ${j*.08}s both">${x}</li>`).join('')}</ul>`:'<p style="font-size:.85rem">Toca «Siguiente» para abrir.</p>'}</div>`;
 return dkH('Anillo 4 · Quién la provocó',F.t,'Recorre las tres columnas: lo que representa, cómo se ve la herida y lo que se sana.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-fig">${col(0,F.c1,'Lo que representa',F.rep)}${col(1,'','Cuando la herida es con '+(f==='madre'?'la madre':'el padre'),F.her,'background:var(--nb-paper);border:1px solid var(--nb-line);color:var(--nb-ink)')}${col(2,'d','Qué se sana',F.san)}</div>
 ${s<2?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set',k,s+1)}>Siguiente</button></div>`:`<div class="ni-quote ni-in">${F.q}</div>`}</div>`};
RICH.ni14=niFig('madre');RICH.ni15=niFig('padre');

/* ----- 7 · Lectura profunda y sanación ----- */
/* el gráfico del niño interno, interactivo: cinco anillos de adentro hacia afuera */
const NIG=[
 {k:'cu',t:'Cuándo',r0:46,r1:102,items:['Vientre','Nacimiento','Días','Semanas','Meses','Años'],fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:10.5},
 {k:'ma',t:'Máscara',r0:102,r1:136,items:['Evasivo/a','Dependiente','Masoquista','Controlador','Rígido/a'],fill:'#efe4f7',on:'#7a5aa6',m:'tan',fs:9.5},
 {k:'he',t:'Herida',r0:136,r1:178,items:['Rechazo','Abandono','Humillación','Traición','Injusticia'],fill:'#ffffff',on:'#7a5aa6',m:'tan',fs:10.5},
 {k:'qu',t:'Quién la provocó',r0:178,r1:252,items:['Niño Interno','Adulto','Padre','Madre','Grupo','Familia','Soñador','Tutor','Femenino','Masculino','Amigo(a)','Otro reparto'],fill:'#d3e9e5',on:'#3f7d6e',m:'rad',fs:10},
 {k:'ed',t:'Edad',r0:252,r1:280,items:Array.from({length:21},(_,i)=>String(i*5)),fill:'#ffffff',on:'#9b6f27',m:'tan',fs:9}];
const NIG_D={cu:4,he:1,qu:3,ed:1};
const nigSel=k=>{const v=st('nig'+(k==='ma'?'he':k),NIG_D[k==='ma'?'he':k]);return v};
window.RX=window.RX||{};
RX.nigs=(k,v)=>{RS['nig'+(k==='ma'?'he':k)]=+v;render(false)};
const niChart=o=>{o=o||{};const cx=300,cy=292,P=(r,a)=>[(cx+r*Math.cos(a)).toFixed(1),(cy-r*Math.sin(a)).toFixed(1)];
 const seg=(r0,r1,a1,a2)=>{const [x1,y1]=P(r1,a1),[x2,y2]=P(r1,a2),[x3,y3]=P(r0,a2),[x4,y4]=P(r0,a1);return `M${x1} ${y1}A${r1} ${r1} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r0} ${r0} 0 0 0 ${x4} ${y4}Z`};
 let g='';
 const HL=o.hl?[].concat(o.hl):0;
 NIG.forEach(R=>{const n=R.items.length,sel=nigSel(R.k),dim=HL&&!HL.includes(R.k);
  g+=`<g class="nig-r${dim?' dim':''}${HL&&!dim?' hl':''}">`;
  R.items.forEach((t,i)=>{const a1=Math.PI-i*Math.PI/n,a2=Math.PI-(i+1)*Math.PI/n,am=(a1+a2)/2,deg=am*180/Math.PI,rm=(R.r0+R.r1)/2,[tx,ty]=P(rm,am),on=i===sel;
   const rot=R.m==='rad'?(deg<=90?-deg:180-deg):90-deg;
   g+=`<g class="nig-s${on?' on':''}" ${rxa('nigs',R.k,i)} role="button" tabindex="0" aria-label="${R.t}: ${t}" aria-pressed="${on}"><path d="${seg(R.r0,R.r1,a1,a2)}" fill="${on?R.on:R.fill}"/><text x="${tx}" y="${ty}" transform="rotate(${rot.toFixed(1)} ${tx} ${ty})" font-size="${R.fs}" fill="${on?'#fff':'#1f3f32'}">${t}</text></g>`});
  g+='</g>'});
 return `<figure class="nig"><svg viewBox="0 0 600 334" role="group" aria-label="Gráfico del niño interno">${g}<path d="M${cx-282} ${cy}A282 282 0 0 1 ${cx+282} ${cy}" fill="none" stroke="#a89a6e" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="40" fill="#1f3f32"/><svg x="${cx-26}" y="${cy-34}" width="52" height="52" style="color:#ece7d3"><use href="#mark"/></svg></svg>${o.cap===0?'':'<figcaption>Toca un sector de cada anillo. La herida y su máscara van juntas.</figcaption>'}</figure>`};
(function(){const c=document.createElement('style');c.textContent=`
.nig{margin:0;display:grid;gap:6px}
.ni-cp .flip .f b{font:400 1.02rem/1.4 var(--f-display)}
@media (max-width:640px){.ni-cp .dk-grid{grid-template-columns:1fr}.ni-cp .flip{height:210px!important}}.ni-cp .flip .b{font-size:.9rem;line-height:1.5}
.nig>svg{width:100%;height:auto;display:block;overflow:visible}
.nig-s{cursor:pointer;outline:none}
.nig-s path{stroke:#b9ad84;stroke-width:1;transition:filter .2s}
.nig-s:hover path,.nig-s:focus-visible path{filter:brightness(.93)}
.nig-s:focus-visible path{stroke:#7a5aa6;stroke-width:2.5}
.nig-s text{text-anchor:middle;dominant-baseline:central;font-family:var(--f-body,system-ui);font-weight:600;pointer-events:none}
.nig-s.on path{animation:nigOn .45s both}
@keyframes nigOn{from{opacity:.3}to{opacity:1}}
.nig-r{transition:opacity .35s}
.nig-r.dim{opacity:.28}
.nig-r.hl path{stroke:#9b6f27;stroke-width:1.6}
.nig figcaption{font-size:.78rem;color:var(--nb-soft);text-align:center}
.ni-rings{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
@media (max-width:760px){.ni-rings{grid-template-columns:1fr 1fr}}
.ni-ring{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:4px;padding:12px 14px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);transition:transform .25s,background .25s}
.ni-ring b{font:400 1.02rem/1.2 var(--f-display)}
.ni-ring span{font-size:.84rem;color:var(--nb-soft);line-height:1.45}
.ni-ring[aria-pressed="true"]{background:var(--ni-lil);border-color:var(--ni-lil2);transform:translateY(-4px)}
.ni-ring[aria-pressed="true"]:last-child{background:var(--ni-olv);color:#ece7d3}.ni-ring[aria-pressed="true"]:last-child span{color:#dfe3cf}
.ni-orig{width:100%;border-radius:14px;border:1px solid var(--nb-line);display:block}
`;document.head.appendChild(c)})();

const NI_AN=[['ed','Anillo 1 · Edad','Del vientre a los años: en qué momento se originó la herida.'],['ma','Anillo 2 · Máscara','La forma en que la persona aprendió a protegerse.'],['he','Anillo 3 · Herida','Rechazo, abandono, humillación, traición o injusticia.'],['qu','Anillo 4 · Quién la provocó','Madre, Padre y otras diez figuras. Es el que miramos ahora.']];
RICH.nian=()=>{const s=n3clamp(st('nian',3),0,3),orig=st('nianO',0);
 return dkH('Los anillos, de adentro hacia afuera','Volvamos al gráfico','Toca un anillo para verlo en el gráfico.')+
 `<div class="ni" style="display:grid;gap:12px"><div style="max-width:760px;width:100%;justify-self:center">${orig?`<img class="ni-orig ni-in" src="${N4P}nino/grafico.webp" alt="Lámina original del gráfico del niño interno de Casa Muladhara">`:niChart({hl:NI_AN[s][0]})}
  <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','nianO',orig?0:1)}>${orig?'Ver el gráfico interactivo':'Ver la lámina original'}</button></div></div>
 <div class="ni-rings ni-st">${NI_AN.map((x,i)=>`<button class="ni-ring" ${rxa('set','nian',i)} ${pressed(i===s)}><b>${x[1]}</b><span>${x[2]}</span></button>`).join('')}</div></div>`+
 `<div class="ni">${niQ('La figura se confirma siempre con el péndulo; no se da por supuesta.')}</div>`};

const NI_QUP=['su niño interno','un adulto','su padre','su madre','un grupo','su familia','la figura del soñador','un tutor','una figura femenina','una figura masculina','un amigo o una amiga','otra figura de su vida'];
const NI_CUP=['ya en el vientre','en el nacimiento','durante días','durante semanas','durante meses','durante años'];
RICH.ni16=()=>{const ed=nigSel('ed')*5,qu=nigSel('qu'),h=n3clamp(nigSel('he'),0,4),cu=nigSel('cu'),H=NI_H[h];
 const edP=ed===0?'Antes del primer año':'Alrededor de los '+ed+' años';const fig=qu===3?NI_FIG.madre:qu===2?NI_FIG.padre:null;
 return dkH('Lectura profunda','De la lectura a la comprensión','Arma una lectura en el gráfico: toca la edad, quién la provocó, la herida y cuándo. Abajo se traduce en una hipótesis de trabajo.')+
 `<div class="ni" style="display:grid;gap:14px">${niChart()}
 <div class="ni-read ni-st"><div><small>Edad</small><span>${ed}</span></div><div><small>Quién</small><span>${NIG[3].items[qu]}</span></div><div><small>Herida y máscara</small><span>${H.n} · ${H.m}</span></div><div><small>Cuándo</small><span>${NIG[0].items[cu]}</span></div></div>
 <div class="ni-hyp ni-in"><span class="ni-tag">Lo que podría haber vivido</span><p><mark>${edP}</mark>, <mark>${NI_CUP[cu]}</mark>, esa niña o ese niño ${H.hv}, en relación con <mark>${NI_QUP[qu]}</mark>. Para protegerse aprendió a ${H.ha}.</p></div>
 <div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:8px"><div class="dk-sub">Preguntas para abrir la conversación · marca las que harías</div>${n3ck('nirq',[['chat','¿Qué pasaba en tu familia en esa etapa?'],['chat','¿Cómo reaccionas hoy cuando alguien se aleja?'],['chat','¿Qué necesitaba esa niña o ese niño?'],['chat','¿Qué puedes darte hoy que no recibiste?']])}</div>
 <div style="display:grid;gap:10px">${niBox('t','Qué se sana · '+H.n,H.qs)}${fig?niBox('d','Qué se sana con '+(qu===3?'la madre':'el padre'),fig.san.join('. ')+'.'):''}${c4imp('La lectura es una hipótesis de trabajo que la persona confirma o descarta; no es un diagnóstico.')}</div></div>
 ${niNote('Caso ficticio para practicar. En una sesión real, cada dato se confirma con el péndulo.')}</div>`};
const NI_CA=[['ojo','Reconocer','Nombrar la herida y la máscara sin juicio: «esto me pasó y así aprendí a protegerme».'],['gota','Sentir','Dar espacio a la emoción que quedó guardada, sin apurarla ni explicarla.'],['regalo','Dar lo que faltó','El adulto de hoy le ofrece al niño aceptación, presencia, respeto, confianza o reconocimiento.'],['camino','Integrar','Elegir una respuesta nueva cada vez que la máscara quiera aparecer.']];
const NI_MORD=[3,0,4,1,2];
window.RX=window.RX||{};
RX.nimh=(k)=>{RS.nimh=+k;delete RS.nimx;render(false)};
RX.nimm=(k)=>{const ok=st('nimok',{});if(RS.nimh===undefined){RS.nimmsg='Primero elige una herida.';render(false);return}
 if(+k===RS.nimh){ok[+k]=1;delete RS.nimh;RS.nimmsg=Object.keys(ok).length===5?'':'¡Bien! Esa es su medicina.'}else{RS.nimx=+k;RS.nimmsg='Esa medicina corresponde a otra herida. Piensa qué necesitaba el niño.'}render(false)};
RX.nimr=()=>{delete RS.nimok;delete RS.nimh;delete RS.nimx;delete RS.nimmsg;render(false)};
RICH.ni17=()=>{const ok=st('nimok',{}),sel=RS.nimh,n=Object.keys(ok).length;
 return dkH('Sanación','El camino de sanación','Cuatro pasos y una medicina para cada herida.')+
 `<div class="ni" style="display:grid;gap:14px">${n3flip('nica',NI_CA.map((x,i)=>[x[0],(i+1)+' · '+x[1],x[2]]),'c4',170)}
 <div class="dk-sub">La medicina de cada herida · elige una herida y luego su medicina</div>
 <div class="ni-med">${NI_H.map((h,i)=>`<button ${ok[i]?'class="ok" disabled':`${rxa('nimh',i)} ${pressed(sel===i)}`}>${ic(h.ic,22)}<b>${h.n}</b>${ok[i]?`<i>${h.med}</i>`:''}</button>`).join('')}</div>
 <div class="ni-med">${NI_MORD.map(j=>`<button ${ok[j]?'class="ok" disabled':`class="${RS.nimx===j?'no':''}" ${rxa('nimm',j)}`}>${ic(NI_H[j].mic,22)}<span style="text-transform:capitalize">${NI_H[j].med}</span></button>`).join('')}</div>
 ${n===5?`<div class="ni-quote ni-in">Rechazo, aceptación · Abandono, presencia · Humillación, dignidad · Traición, confianza · Injusticia, reconocimiento.</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('nimr',0)}>Jugar de nuevo</button></div>`:RS.nimmsg?`<div class="dk-call${/Bien/.test(RS.nimmsg)?'':' warn'}">${RS.nimmsg} <span class="muted">(${n} de 5)</span></div>`:''}</div>`};

/* ----- 8 · Meditación, práctica y cierre ----- */
const NI_OR=['Amado Yo Superior, ángeles, arcángeles, seres de luz, todo mi comité espiritual: pido en este momento su presencia.','Envuélvanme en su luz, su protección, su amor. Acompáñenme en este encuentro con mi niño interior.','Abran mi corazón para recibir con ternura lo que hoy quiera mostrarse, sin juicio, sin miedo.','Ayúdenme a verlo, a escucharlo, a abrazarlo; a reconocer sus heridas para darle el amor, la presencia, el cuidado que necesitó.','Que todo lo que se mueva en este espacio sea para mi mayor bien y el de todas las personas presentes.','Que sane en totalidad lo que hoy esté listo para sanar. Gracias, gracias, gracias.'];
const NI_ME=[['Llegar al cuerpo','Respira profundo y siente tu cuerpo apoyado, aquí y ahora.'],['El lugar seguro','Camina hacia un lugar donde te sientes en paz y a salvo.'],['El encuentro','Allí está tu niño interior. Mira su edad, su ropa, su mirada.'],['Escuchar','Pregúntale qué necesita y dile: «te veo, estoy aquí».'],['Abrazar y volver','Abrázalo, prométele cuidarlo y vuelve despacio al presente.']];
RICH.ni18=()=>{const m=st('nimo',0),s=n3clamp(st('nime',0),0,4);
 return dkH('Meditación guiada · 15 minutos','Encuentro con mi niño interior','Primero la oración de conexión; luego, los cinco pasos del encuentro.')+
 `<div class="ni" style="display:grid;gap:14px">${chipRow('nimo',['Oración de conexión','Los cinco pasos'],m)}
 ${m===0?`<div class="ni-in">${n3pray('nior',NI_OR)}</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','nimo',1)}>Ir a los cinco pasos</button></div>`:
 `<div class="dk-split ni-in" style="align-items:center"><div class="ni-orb" aria-hidden="true"><span></span></div>
  <div class="detail" style="text-align:center;min-height:170px;align-content:center"><span class="eyebrow">Paso ${s+1} de 5</span><h3>${NI_ME[s][0]}</h3><p style="font-family:var(--f-display);font-style:italic;font-size:1.12rem">${NI_ME[s][1]}</p>
  <div class="row" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','nime',Math.max(0,s-1))} ${s===0?'disabled':''}>Anterior</button><button class="btn btn-primary btn-sm" ${rxa('set','nime',Math.min(4,s+1))} ${s===4?'disabled':''}>Siguiente paso</button></div></div></div>
 <div class="ni-steps">${NI_ME.map((x,i)=>`<button ${rxa('set','nime',i)} ${pressed(i===s)}><small>Paso ${i+1}</small>${x[0]}</button>`).join('')}</div>
 ${niNote('Al terminar, comparte en voz alta solo si lo deseas.')}`}</div>`};
const NI_CS=[['Laura','Evita las reuniones familiares. Siente que nadie la nota y suele irse antes de que la dejen de lado.',0,'Se protege desapareciendo antes de que la dejen de lado: es la máscara evasiva. Necesita sanar su derecho a existir y ocupar su lugar.'],
 ['Pedro','No tolera estar solo. Cuando su pareja sale, la llama muchas veces y siente angustia hasta que vuelve.',1,'El miedo a la soledad y la necesidad de atención constante son la máscara dependiente. Necesita aprender a sostenerse a sí mismo.'],
 ['Carmen','Revisa todo dos veces, se exige ser impecable en el trabajo y no se permite llorar frente a nadie.',4,'El perfeccionismo y la desconexión de lo que siente son la máscara rígida. Necesita darse permiso para sentir y descansar.']];
RICH.ni19=()=>dkH('Práctica · en parejas','Práctica: reconoce la herida','Para cada caso, identifiquen la herida, la máscara y lo que la persona necesita sanar. Luego compartan con el grupo cómo llegaron a esa conclusión.')+
 `<div class="ni dk-grid c3" style="align-items:start">${NI_CS.map((c,i)=>{const a=st('nic'+i,-1);return `<div class="ni-case"><span class="ni-tag">Caso ${i+1}</span><h3>${c[0]}</h3><p>${c[1]}</p><div class="dk-sub">¿Qué herida ves?</div>${chipRow('nic'+i,NI_H.map(x=>x.n),a)}
 ${a<0?'':a===c[2]?`<div class="res ok"><b>Herida de ${NI_H[a].n.toLowerCase()}.</b> ${c[3]}</div>`:`<div class="res no"><b>Mira otra vez.</b> ${NI_H[a].n} se reconoce porque ${NI_H[a].act.toLowerCase()}. ¿Es eso lo que le pasa a ${c[0]}?</div>`}</div>`}).join('')}</div>`+niNote('Casos ficticios.');
RICH.ni20=()=>dkH('Facilitación','Reglas de oro del facilitador','Toca cada regla.')+
 `<div class="ni">${n3flip('niro',[['candado','Confidencialidad','Lo que se lee en una sesión no se comparte fuera de ella.'],['escudo','Sin diagnósticos ni promesas','El gráfico orienta; no diagnostica ni garantiza resultados.'],['corazon','Comprender, no culpar','Madre y padre también tuvieron un niño interno herido. La sanación no busca culpables.'],['enlace','Derivar cuando corresponda','Ante malestar intenso o crisis, se acompaña y se deriva a un profesional de salud.']],'c2',150)}</div>`;
RICH.nicp=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta. Después toquen cada tarjeta para ver la respuesta.')+
 `<div class="ni ni-cp">${n3flip('nicp',[['lupa','1 · Una persona se aleja ante cualquier conflicto y siente que no tiene lugar en el grupo. ¿Qué herida y qué máscara reconoces?','<b>Herida de rechazo, máscara evasiva.</b> Se protege desapareciendo y duda de su lugar. Lo que se sana es su derecho a existir y ocupar su lugar.'],['candado','2 · ¿Qué máscara corresponde a la herida de traición?','<b>Máscara controladora.</b> Se protege adelantándose: planifica, vigila y decide por otros para no volver a ser defraudado.'],['camino','3 · ¿Cuáles son los cuatro pasos del camino de sanación?','<b>Reconocer, sentir, dar lo que faltó e integrar.</b> Nombrar sin juicio, dar espacio a la emoción, ofrecer lo que faltó y elegir una respuesta nueva.']],'c4',260)}</div>`;
const NI_QZ=[
 {q:'¿Qué es el niño interno?',o:['Un recuerdo de la infancia que ya no influye','La estructura inicial que formó lo que hoy soy y sigue presente en la vida adulta','Una etapa que termina en la adolescencia'],a:1,e:'Guarda emociones, recuerdos, experiencias y necesidades de la infancia, y sigue influyendo hoy.'},
 {q:'¿En qué orden se forma una herida?',o:['Máscara, creencia, emoción, necesidad y patrón adulto','Necesidad, emoción, creencia, máscara y patrón adulto','Emoción, necesidad, patrón adulto, creencia y máscara'],a:1,e:'Lo que no se recibió se vive como emoción, se convierte en creencia y luego en una forma de protegerse.'},
 {q:'En el gráfico, ¿qué es la máscara?',o:['Lo que dolió','Lo que la persona aprendió a hacer para no sentir el dolor','La figura que provocó la herida'],a:1,e:'La herida es lo que dolió; la máscara, la protección que se aprendió.'},
 {q:'¿Qué máscara corresponde a la herida de traición?',o:['Controlador','Dependiente','Rígido/a'],a:0,e:'Se protege adelantándose: planifica, vigila y decide por otros.'},
 {q:'Ante el mismo conflicto…',o:['El rechazo se aferra y el abandono huye','El rechazo huye y el abandono se aferra','Los dos reaccionan igual'],a:1,e:'El evasivo se aleja; el dependiente se acerca y se aferra. Una persona puede tener ambas heridas.'},
 {q:'«Tengo que ser perfecta o perfecto para merecer» es la creencia de la herida de…',o:['Humillación','Injusticia','Abandono'],a:1,e:'La máscara rígida se protege con orden y perfección.'},
 {q:'¿Cómo se confirma la figura asociada a una herida en el gráfico?',o:['Siempre con el péndulo','Por el sexo de la persona','Por la edad de la herida'],a:0,e:'Bourbeau orienta, pero en el gráfico la figura se confirma siempre con el péndulo.'},
 {q:'¿Cuál es la medicina de la herida de abandono?',o:['Dignidad','Presencia','Reconocimiento'],a:1,e:'Rechazo, aceptación · Abandono, presencia · Humillación, dignidad · Traición, confianza · Injusticia, reconocimiento.'},
 {q:'Una lectura del niño interno es…',o:['Un diagnóstico','Una hipótesis de trabajo que la persona confirma o descarta','Una promesa de resultado'],a:1,e:'El gráfico orienta; no diagnostica ni garantiza resultados.'}];
RICH.ni21=()=>`<div class="ni">${n3quiz('ni',NI_QZ,['¡Excelente! Ya reconoces las cinco heridas y sus máscaras.','Muy bien. Repasa las heridas que te costaron.','Vuelve a recorrer las cinco heridas y la tabla de un vistazo.'])}</div>`;
RICH.ni22=()=>dkH('Cierre de la clase','Tarea de la semana')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('nita',[['ojo','Lee tu propio gráfico e identifica tu herida principal y su máscara'],['libro','Escribe una carta a tu niño interno dándole lo que necesitaba']],['Marca cada tarea cuando la completes.','¡Listo! Trae tu carta y lo que descubriste a la próxima clase.'])}
 ${niBox('l','Para la próxima clase','Trae tu carta y lo que descubriste en tu gráfico. Compartir la carta es voluntario.')}</div>
 <div style="display:grid;gap:8px">${n3area('nicarta','Empieza aquí tu carta','Querida niña, querido niño…')}${n3priv}</div></div>`+
 nbQuote('Te veo, estoy aquí.');

/* ---------- Nivel 4 · Especialización Niño Interno · Clase 2 ---------- */
(function(){const c=document.createElement('style');c.id='nj-css';c.textContent=`
.nj-two{display:grid;gap:14px}.nj-two>.nj-fig{width:100%;max-width:780px;justify-self:center}
.nj-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:start}
.nj-steps.h{grid-template-columns:repeat(3,minmax(0,1fr))}
.nj-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.nig-s.hot path{stroke:#7a5aa6;stroke-width:2.2;animation:njHot 1.8s ease-in-out infinite}
.nig-s.cold{opacity:.42}
.nig-s.st{cursor:default}
.nig-s text.sub{font-weight:400;opacity:.75}
@keyframes njHot{0%,100%{filter:none}50%{filter:brightness(.88)}}
.nj-proto{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.nj-proto button{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:grid;gap:6px;align-content:start;padding:14px 12px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);min-height:150px;transition:transform .3s,box-shadow .3s;animation:niUp .5s both}
.nj-proto button.new{background:var(--ni-olv);border-color:var(--ni-olv);color:#ece7d3}
.nj-proto button.new span{color:#dfe3cf}.nj-proto button.new small{color:#d9c9ef}
.nj-proto button[aria-pressed="true"]{transform:translateY(-6px);box-shadow:0 16px 30px -18px rgba(28,58,43,.75);outline:2px solid var(--ni-lil2);outline-offset:2px}
.nj-proto small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.nj-proto b{font:400 1.05rem/1.2 var(--f-display)}
.nj-proto span{font-size:.82rem;line-height:1.45;color:var(--nb-soft)}
.nj-proto i{position:absolute;top:10px;right:10px;font:600 .5rem/1 var(--f-caps);letter-spacing:.12em;text-transform:uppercase;font-style:normal;background:var(--ni-lil);color:#3b2a5a;padding:4px 6px;border-radius:999px}
.nj-proto button:not(:last-child)::after{content:"";position:absolute;right:-12px;top:50%;width:0;height:0;border:6px solid transparent;border-left:8px solid var(--ni-lil2);margin-top:-6px;animation:njArr 1.6s ease-in-out infinite}
@keyframes njArr{0%,100%{transform:translateX(-2px);opacity:.5}50%{transform:translateX(2px);opacity:1}}
.nj-det{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;border-radius:16px;padding:14px 18px;background:var(--ni-lil);color:#3b2a5a;animation:niUp .4s both}
.nj-det b{font:400 1.1rem/1.2 var(--f-display)}.nj-det p{margin:2px 0 0;font-size:.9rem;line-height:1.5}
.nj-card{border-radius:18px;padding:16px;display:grid;gap:10px;align-content:start}
.nj-card.l{background:var(--ni-lil);color:#3b2a5a}.nj-card.t{background:var(--ni-tea);color:#1f3f32}.nj-card.b{background:#efe6d6;color:#4a3a1f}
.nj-card h3{margin:0;font:400 1.15rem/1.2 var(--f-display)}.nj-card>p{margin:0;font-size:.86rem;opacity:.85}
.nj-card .sel-list{gap:6px}.nj-card .ck{background:rgba(255,255,255,.55)}
.nj-ronda{display:grid;gap:10px}
.nj-ronda>div{display:grid;grid-template-columns:38px 1fr;gap:12px;align-items:start;padding:14px 16px;border-radius:16px;background:var(--nb-paper);border:1px solid var(--nb-line);animation:niUp .5s both}
.nj-ronda>div:nth-child(2){animation-delay:.1s}.nj-ronda>div:nth-child(3){animation-delay:.2s}
.nj-ronda .n{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--ni-lil2);color:#fff;font:600 .9rem/1 var(--f-caps)}
.nj-ronda b{font:400 1.1rem/1.25 var(--f-display);color:var(--nb-ink)}
.nj-ronda small{display:block;color:var(--nb-soft);font-size:.8rem;margin:2px 0 8px}
.nj-ronda input{all:unset;box-sizing:border-box;width:100%;font:400 1.02rem/1.3 var(--f-display);font-style:italic;color:var(--nb-ink);border-bottom:1px dashed var(--nb-line);padding:4px 0}
.nj-ronda .dk-chips{gap:4px}.nj-ronda .chip{padding:5px 10px;font-size:.8rem}
.nj-steps{display:grid;gap:8px;counter-reset:s}
.nj-steps>div{display:grid;grid-template-columns:32px 1fr;gap:10px;align-items:start;padding:12px 14px;border-radius:14px;background:var(--nb-paper);border:1px solid var(--nb-line);opacity:.5;transition:opacity .3s,background .3s}
.nj-steps>div.cur{opacity:1;background:var(--ni-lil);border-color:var(--ni-lil2)}
.nj-steps>div.ok{opacity:1}
.nj-steps .n{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--ni-lil2);color:#fff;font:600 .8rem/1 var(--f-caps)}
.nj-steps>div.ok .n{background:var(--ni-tea2)}
.nj-steps b{font-weight:600;font-size:.92rem;color:var(--nb-ink)}
.nj-steps p{margin:2px 0 0;font-size:.82rem;line-height:1.45;color:var(--nb-soft)}
.nj-steps .ans{font:400 1.05rem/1.2 var(--f-display);color:var(--ni-lil2);margin-top:4px;animation:niPop .35s both}
.nj-sort{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.nj-sort .nj-card{min-height:200px}
.nj-sort .nj-card.d{background:var(--ni-olv);color:#ece7d3}.nj-sort .nj-card.d>p{color:#dfe3cf}
.nj-sort ul{margin:0;padding:0;list-style:none;display:grid;gap:6px}
.nj-sort li{padding:8px 12px;border-radius:10px;font-size:.88rem;line-height:1.4;background:rgba(255,255,255,.6);animation:niPop .4s both}
.nj-sort .nj-card.d li{background:rgba(236,231,211,.12)}
.nj-sort li.e{background:none;border:1px dashed currentColor;opacity:.35;animation:none;min-height:20px}
.nj-pile{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.nj-pile>div{display:grid;gap:8px;padding:12px;border-radius:14px;background:var(--nb-paper);border:1px solid var(--nb-line);animation:niUp .4s both;align-content:space-between}
.nj-pile>div.no{animation:niShake .4s;border-color:#c0392b}
.nj-pile span{font-size:.88rem;line-height:1.4;color:var(--nb-ink)}
.nj-pile .row{display:flex;gap:6px;flex-wrap:wrap}
.nj-sec{display:grid;gap:6px}
.nj-sec button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:minmax(150px,.32fr) 1fr;gap:12px;align-items:center;padding:11px 14px;border-radius:12px;color:#2b2b22;transition:transform .2s}
.nj-sec button:hover{transform:translateX(4px)}
.nj-sec b{font-weight:600;font-size:.92rem}
.nj-sec .em{display:flex;gap:6px;flex-wrap:wrap}
.nj-sec .em span{padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.7);font-size:.82rem;animation:niPop .35s both}
.nj-sec .em em{font-size:.78rem;opacity:.6}
.nj-pend{position:relative;width:120px;height:150px;justify-self:center}
.nj-pend i{position:absolute;left:50%;top:6px;width:2px;height:104px;margin-left:-1px;background:#a89a6e;transform-origin:50% 0;animation:njSw 2.4s ease-in-out infinite}
.nj-pend i::after{content:"";position:absolute;left:50%;bottom:-20px;width:22px;height:28px;margin-left:-11px;background:var(--ni-lil2);clip-path:polygon(50% 100%,0 30%,50% 0,100% 30%)}
.nj-pend::before{content:"";position:absolute;left:50%;top:0;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#1f3f32}
.nj-pend.yes i{animation:njYes 1s ease-in-out infinite}
.nj-pend.cl i{animation:njCl 1.4s linear infinite}
@keyframes njSw{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
@keyframes njYes{0%,100%{transform:rotate(0) scaleY(1)}50%{transform:rotate(0) scaleY(.88)}}
@keyframes njCl{0%{transform:rotate(-14deg)}25%{transform:rotate(0) scaleY(.9)}50%{transform:rotate(14deg)}75%{transform:rotate(0) scaleY(.9)}100%{transform:rotate(-14deg)}}
.nj-lim{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:16px;align-items:start}
.nj-act{display:grid;gap:12px;justify-items:center;text-align:center;padding:18px;border-radius:18px;background:var(--nb-paper);border:1px solid var(--nb-line);min-height:300px;align-content:center}
.nj-act h3{margin:0;font:400 1.3rem/1.2 var(--f-display);color:var(--nb-ink)}
.nj-act p{margin:0;line-height:1.55;color:var(--nb-soft);max-width:44ch}
.nj-act q{font:italic 400 1.15rem/1.45 var(--f-display);color:var(--ni-lil2)}
.nj-act .row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.nj-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.nj-flow>div{position:relative;display:grid;gap:6px;align-content:start;padding:14px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);min-height:130px;opacity:.25;transition:opacity .45s,transform .45s}
.nj-flow>div.lit{opacity:1;transform:translateY(-4px)}
.nj-flow>div:last-child{background:var(--ni-olv);border-color:var(--ni-olv);color:#ece7d3}
.nj-flow>div:last-child span{color:#dfe3cf}.nj-flow>div:last-child small{color:#d9c9ef}
.nj-flow small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.nj-flow b{font:400 1.15rem/1.2 var(--f-display)}
.nj-flow span{font-size:.84rem;color:var(--nb-soft);line-height:1.45}
.nj-flow>div:not(:last-child)::after{content:"";position:absolute;right:-14px;top:50%;border:6px solid transparent;border-left:9px solid var(--ni-lil2);margin-top:-6px}
.nj-lect{background:var(--ni-lil);color:#3b2a5a;border-radius:18px;padding:16px 20px;display:grid;gap:6px;animation:niUp .5s both}
.nj-lect p{margin:0;font:400 1.1rem/1.55 var(--f-display)}
.nj-ficha{min-width:760px}
.nj-ficha td{padding:4px 6px}
.nj-ficha td:nth-child(2){color:var(--nb-ink);font-weight:400}
.nj-ficha input{all:unset;box-sizing:border-box;width:100%;padding:6px 4px;font-size:.86rem;color:var(--nb-ink);border-bottom:1px dashed var(--nb-line)}
.nj-ficha tr.ex td{font-style:italic;color:var(--nb-soft);font-weight:400;padding:9px 8px}
@media (max-width:760px){.nj-lim,.nj-sort,.nj-row,.nj-steps.h{grid-template-columns:1fr}.nj-three,.nj-pile{grid-template-columns:1fr}.nj-proto,.nj-flow{grid-template-columns:1fr;gap:10px}.nj-proto button{min-height:0}.nj-proto button::after,.nj-flow>div::after{display:none}.nj-sec button{grid-template-columns:1fr;gap:6px}.nj-flow>div{min-height:0}.nj-det{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();

// abanico genérico: anillos de adentro hacia afuera; cada sector es un botón (o.act|anillo|índice)
const niFan=o=>{const cx=300,cy=292,P=(r,a)=>[cx+r*Math.cos(a),cy-r*Math.sin(a)],F=v=>v.toFixed(1);
 const seg=(r0,r1,a1,a2)=>{const [x1,y1]=P(r1,a1),[x2,y2]=P(r1,a2),[x3,y3]=P(r0,a2),[x4,y4]=P(r0,a1);return `M${F(x1)} ${F(y1)}A${r1} ${r1} 0 0 1 ${F(x2)} ${F(y2)}L${F(x3)} ${F(y3)}A${r0} ${r0} 0 0 0 ${F(x4)} ${F(y4)}Z`};
 let g='';
 o.rings.forEach(R=>{const n=R.items.length;
  R.items.forEach((it,i)=>{if(typeof it==='string')it={t:it};const a1=Math.PI-i*Math.PI/n,a2=Math.PI-(i+1)*Math.PI/n,am=(a1+a2)/2,deg=am*180/Math.PI,rm=(R.r0+R.r1)/2+(R.dr||0),[tx,ty]=P(rm,am);
   const on=o.sel&&o.sel(R.k,i),h=o.hot?o.hot(R.k,i,it.t):0,rot=R.m==='rad'?(deg<=90?-deg:180-deg):90-deg,rr=rot*Math.PI/180;
   const L=it.t.split('\n').map(t=>[t,'']);if(it.sub)L.push([it.sub,'sub']);const lh=(R.fs||10)*1.15,mid=(L.length-1)/2;
   const txt=L.map(([t,c],j)=>{const d=(j-mid)*lh,x=tx-d*Math.sin(rr),y=ty+d*Math.cos(rr);return `<text class="${c}" x="${F(x)}" y="${F(y)}" transform="rotate(${F(rot)} ${F(x)} ${F(y)})" font-size="${c?(R.fs||10)-1.5:R.fs||10}" fill="${on?'#fff':'#1f3f32'}">${t}</text>`}).join('');
   g+=`<g class="nig-s${on?' on':''}${h===1?' hot':h===-1?' cold':''}${R.st?' st':''}" ${R.st?'':`${rxa(o.act,R.k,i)} role="button" tabindex="0" aria-label="${it.t.replace('\n',' ')}" aria-pressed="${!!on}"`}><path d="${seg(R.r0,R.r1,a1,a2)}" fill="${on?it.on||R.on:it.c||R.fill}"/>${txt}</g>`})});
 return `<figure class="nig"><svg viewBox="0 0 600 334" role="group" aria-label="${o.label}">${g}${o.inner?`<path d="M${cx-o.inner} ${cy}A${o.inner} ${o.inner} 0 0 1 ${cx+o.inner} ${cy}" fill="none" stroke="#a89a6e" stroke-width="1.5"/>`:''}<path d="M${cx-282} ${cy}A282 282 0 0 1 ${cx+282} ${cy}" fill="none" stroke="#a89a6e" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="40" fill="#1f3f32"/><svg x="${cx-26}" y="${cy-34}" width="52" height="52" style="color:#ece7d3"><use href="#mark"/></svg></svg>${o.cap?`<figcaption>${o.cap}</figcaption>`:''}</figure>`};
const niOrig=(k,src,alt,html)=>{const v=st(k,0);return (v?`<img class="ni-orig ni-in" src="${N4P}${src.includes('/')?src:'nino/'+src}" alt="${alt}">`:html)+`<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set',k,v?0:1)}>${v?'Ver el gráfico interactivo':'Ver la lámina original'}</button></div>`};
const njGo=(off,t,cls)=>`<button class="btn ${cls||'btn-primary'} btn-sm" data-les="${S.lesson[0]},${S.lesson[1]+off}">${t}</button>`;

/* ----- 1 · Bienvenida, agenda y oración ----- */
RICH.nj1=()=>`<div class="ni">${nbHero('Especialización Niño Interno · Clase 2','De la herida','a la limpieza','Los cinco pasos del protocolo de Casa Muladhara: leer la herida, encontrar la energía discordante que la acompaña, investigarla en el Mapa, limpiarla y verificar.',['Protocolo','Energías Discordantes','Mapa de Emociones','Limpieza'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="${N4P}nino/c2-portada.webp" alt="Una mujer arrodillada toma las manos de una niña y se miran sonriendo"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#cfe3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#e6dcf2" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3f7d6e"/></svg></div>`)}</div>`;
const NJ_AG=['Oración de conexión','Revisión de la tarea','El protocolo de Casa Muladhara','Paso 2: leer la herida','Paso 3: Energías Discordantes','Paso 4: limpiar directo o investigar en el Mapa','Paso 5: la limpieza','Ejemplo y práctica en parejas','Reglas de oro, repaso y tarea'];
const NJ_OBJ=['Seguir los 5 pasos del protocolo','Encontrar la energía discordante de una herida','Investigar una emoción en el Mapa','Limpiar y verificar la energía encontrada'];
RICH.nj2=()=>dkH('Clase 2','Agenda de la clase','Nueve momentos. Toca uno para ir directo a él.')+
 `<div class="ni dk-split" style="align-items:stretch"><div class="ni-agenda ni-st">${NJ_AG.map((x,i)=>`<button data-les="${S.lesson[0]},${S.lesson[1]+i+1}"><b>${i+1}</b><span>${x}</span><small>Ir</small></button>`).join('')}</div>
 <div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Objetivo de hoy</span><h3>Al terminar la clase podrás</h3><ul class="ni-st" style="margin:0;padding-left:18px;display:grid;gap:8px;color:#dfe3cf;line-height:1.5">${NJ_OBJ.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`;
RICH.nj3=()=>dkH('Apertura','Oración de conexión','La decimos juntas para abrir el espacio. Avanza frase a frase o lee el texto completo.')+`<div class="ni">${n3pray('njor',NI_OR)}</div>`;

/* ----- 2 · Revisión de la tarea ----- */
RICH.nj4=()=>dkH('Lo que trajiste','Revisemos la tarea de la semana','Marca las preguntas a medida que las conversan.')+
 `<div class="ni dk-grid c2" style="align-items:stretch"><div class="nj-card l ni-in"><h3>1 · Mi herida principal y mi máscara</h3><p>Leíste tu propio gráfico del Niño Interno.</p>${n3ck('njt1',[['chat','¿Qué herida apareció como principal?'],['chat','¿Qué máscara reconoces en tu vida diaria?'],['chat','¿Qué edad y qué figura marcó el péndulo?'],['chat','¿Te sorprendió algo de lo que salió?']])}</div>
 <div class="nj-card t ni-in" style="animation-delay:.12s"><h3>2 · Carta a mi niño interno</h3><p>Le escribiste dándole lo que necesitaba.</p>${n3ck('njt2',[['chat','¿Cómo te sentiste al escribirla?'],['chat','¿Qué fue lo más difícil de decirle?'],['chat','¿Qué le prometiste?'],['chat','¿Quieres leer una parte? Es voluntario.']])}</div></div>`+
 niNote('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.');
RICH.nj5=()=>{const h=st('njrh',-1);
 return dkH('Lo que trajiste','Ronda de descubrimientos','Cada alumna completa en voz alta:')+
 `<div class="ni nj-ronda"><div><span class="n">1</span><div><b>Mi herida principal es…</b><small>Rechazo, abandono, humillación, traición o injusticia.</small>${chipRow('njrh',NI_H.map(x=>x.n),h)}${h>=0?`<small class="ni-in" style="margin:8px 0 0">Su máscara: <b style="font-size:.95rem">${NI_H[h].m}</b></small>`:''}</div></div>
 <div><span class="n">2</span><div><b>Mi máscara aparece cuando…</b><small>Una situación concreta de esta semana.</small><input type="text" data-rsin="njr2" placeholder="Por ejemplo: cuando me piden algo en el trabajo…" value="${esc(st('njr2',''))}"></div></div>
 <div><span class="n">3</span><div><b>Lo que descubrí de mi niño interno es…</b><small>Una frase, una imagen o una emoción.</small><input type="text" data-rsin="njr3" placeholder="Escribe tu frase" value="${esc(st('njr3',''))}"></div></div></div>`+n3priv};

/* ----- 3 · El protocolo ----- */
const NJ_PR=[['Oración de conexión','Abrir el espacio y pedir la presencia de nuestro comité espiritual.',-2],['Gráfico del Niño Interno','Leer edad, quién la provocó, herida, máscara y cuándo.',1],['Energías Discordantes','Preguntar qué energía acompaña a esa herida.',2],['Limpiar o investigar','Limpiar directo o investigar la emoción en el Mapa.',3],['Verificar y cerrar','Confirmar con el péndulo, agradecer y registrar.',4]];
RICH.nj6=()=>{const s=n3clamp(st('njpr',2),0,4),x=NJ_PR[s];
 return dkH('El protocolo','El protocolo de Casa Muladhara','Cinco pasos, siempre en el mismo orden. Toca uno para verlo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-proto">${NJ_PR.map((p,i)=>`<button class="${i>=2?'new':''}" ${rxa('set','njpr',i)} ${pressed(i===s)} style="animation-delay:${i*.08}s">${i>=2?'<i>Nuevo</i>':''}<small>Paso ${i+1}</small><b>${p[0]}</b><span>${p[1]}</span></button>`).join('')}</div>
 <div class="nj-det"><div><span class="ni-tag">Paso ${s+1}</span><br><b>${x[0]}</b><p>${x[1]}</p></div>${njGo(x[2],'Ir a este paso','btn-ghost')}</div>
 ${niBox('l','Hoy nos enfocamos en los pasos 3, 4 y 5: lo nuevo de esta clase.')}</div>`};

/* ----- 4 · Paso 2: leer la herida ----- */
const NJ_AN=[['cu','1 · Edad','Del vientre a los años.'],['ma','2 · Máscara','La forma en que aprendió a protegerse.'],['he','3 · Herida','Rechazo, abandono, humillación, traición o injusticia.'],['qu','4 · Quién la provocó','Madre, padre u otra figura.']];
RICH.nj7=()=>{const s=n3clamp(st('njan',2),0,3),h=n3clamp(nigSel('he'),0,4),H=NI_H[h];
 return dkH('Gráfico del niño interno','Paso 2: leer la herida','Los anillos, de adentro hacia afuera. Toca un anillo para verlo y luego marca tu lectura en el gráfico.')+
 `<div class="ni nj-two"><div class="nj-fig">${niOrig('njanO','grafico.webp','Lámina original del gráfico del niño interno de Casa Muladhara',niChart({hl:NJ_AN[s][0]}))}</div>
 <div class="ni-rings ni-st">${NJ_AN.map((x,i)=>`<button class="ni-ring" ${rxa('set','njan',i)} ${pressed(i===s)}><b>${x[1]}</b><span>${x[2]}</span></button>`).join('')}</div>
 <div class="nj-row"><div class="ni-read" style="grid-template-columns:1fr 1fr"><div><small>Edad</small><span>${nigSel('ed')*5} · ${NIG[0].items[nigSel('cu')]}</span></div><div><small>Quién</small><span>${NIG[3].items[nigSel('qu')]}</span></div><div style="grid-column:1/-1"><small>Herida y máscara</small><span>${H.n} · ${H.m}</span></div></div>
 <div class="ni-hyp"><span class="ni-tag">«Se limpian con E-Discordantes»</span><p style="font-size:.98rem">Una vez leída la herida, pasamos al gráfico de Energías Discordantes.</p><div>${njGo(1,'Ir al Paso 3')}</div></div></div></div>`};

/* ----- 5 · Paso 3: Energías Discordantes ----- */
const NJ_EDO=['Culpa','Decepción','Dependencia','Conflicto','Dudas','Envidia','Odio a la vida','Odio a sí mismo','Frustración','Inestabilidad','Crítica/Celos','Baja autoestima','Mentira','Violencia','Separación','Autocastigo','Egocentrismo','Tristeza','Rechazo','Manipulación','Confusión','Depresión','Votos/Contratos','Humillación','Soledad','Arrepentimiento','Inseguridad','Abuso','Angustia','Deuda emocional','Separación'];
const NJ_EDI=['Traumas','Apegos','Abandono','Traición','Negatividad','Falta de amor propio','Injusticia','Vergüenza','Fracaso','Rabia','Venganza','Resentimiento','Posesividad','Miedo','Odio','Estrés','Pánico'];
const NJ_HE=[['Baja autoestima','Soledad','Autocastigo','Tristeza'],['Dependencia','Apegos','Miedo','Soledad'],['Vergüenza','Culpa','Autocastigo','Falta de amor propio'],['Resentimiento','Manipulación','Posesividad','Rabia'],['Rabia','Frustración','Crítica/Celos','Resentimiento']];
const njEh=()=>n3clamp(st('njeh',nigSel('he')),0,4);
const njEdName=()=>{const v=RS.njed;if(!v)return '';const [r,i]=v.split('.');return (r==='o'?NJ_EDO:NJ_EDI)[+i]||''};
window.RX=window.RX||{};
RX.njed=(k,v)=>{RS.njed=RS.njed===k+'.'+v?'':k+'.'+v;render(false)};
const njEdChart=hot=>niFan({label:'Gráfico de Energías Discordantes',act:'njed',sel:(k,i)=>RS.njed===k+'.'+i,hot:hot?(k,i,t)=>hot.includes(t)?1:-1:0,
 rings:[{k:'i',r0:48,r1:168,items:NJ_EDI,fill:'#ffffff',on:'#7a5aa6',m:'rad',fs:9.5,dr:8},{k:'o',r0:168,r1:280,items:NJ_EDO.map(t=>t==='Votos/Contratos'?{t,c:'#f6e3e6'}:t),fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:9.5}],
 cap:'Toca la energía que marca el péndulo.'});
RICH.nj8=()=>{const h=njEh(),hl=st('njehl',1),e=njEdName();
 return dkH('Paso 3','Energías Discordantes','Elige la herida que leíste: se iluminan las energías que suelen acompañarla. Luego toca la que marca el péndulo.')+
 `<div class="ni nj-two"><div class="nj-fig">${niOrig('njedO','energias.webp','Lámina original del gráfico de Energías Discordantes',njEdChart(hl?NJ_HE[h]:0))}</div>
 <div class="nj-row"><div style="display:grid;gap:10px"><div class="dk-sub">La herida que leíste</div>${chipRow('njeh',NI_H.map(x=>x.n),h)}
 <label class="ck" style="cursor:pointer"><input type="checkbox" ${hl?'checked':''} ${rxa('set','njehl',hl?0:1)} style="accent-color:var(--ni-lil2)"> <span>Iluminar las energías frecuentes</span></label></div>
 ${e?`<div class="ni-hyp ni-in"><span class="ni-tag">El péndulo marcó</span><p><mark>${e}</mark> acompaña a la herida de ${NI_H[h].n.toLowerCase()}.</p><p style="font-size:.92rem">Ahora pregunta: ¿se limpia directo o se investiga desde el Mapa?</p><div>${njGo(1,'Ir al Paso 4')}</div></div>`:
 `<div class="ni-quote">Pregunta al péndulo: ¿qué energía discordante acompaña a esta herida?</div>`}</div>
 <div class="nj-three">${niBox('t','Qué son','Emociones y cargas que quedaron unidas a la herida y siguen actuando en la persona.')}
 ${niBox('l','Las cinco heridas están aquí','Rechazo, abandono, humillación, traición e injusticia.')}
 ${niBox('d','Dos caminos','Limpiar directo, o investigar desde el Mapa.')}</div></div>`};
RICH.nj9=()=>{const h=njEh();
 return dkH('Paso 3','Heridas y las energías que suelen acompañarlas','Toca una herida para ver sus energías frecuentes.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="ni-tw"><table class="ni-tbl"><thead><tr><th>Herida</th><th>Máscara</th><th>Energías discordantes frecuentes</th></tr></thead><tbody>
 ${NI_H.map((x,i)=>`<tr class="${i===h?'on':''}" ${rxa('set','njeh',i)} style="cursor:pointer"><td>${x.n}</td><td>${x.m}</td><td>${i===h?`<span class="ni-hpills">${NJ_HE[i].map((y,j)=>`<span class="tg ni-in" style="animation-delay:${j*.08}s;padding:4px 10px;border-radius:999px;background:#fff;font-size:.82rem">${y}</span>`).join('')}</span>`:NJ_HE[i].join(' · ')}</td></tr>`).join('')}</tbody></table></div>
 <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" data-slide="0">Verlas en el gráfico</button></div></div>`+
 niNote('Son tendencias para orientar la búsqueda. El péndulo siempre confirma cuál está presente.')};

/* ----- 6 · Paso 4: limpiar directo o investigar ----- */
const NJ_SO=[['El péndulo marca la energía con claridad',0],['La energía es general y hace falta precisarla',1],['La persona la reconoce de inmediato',0],['La persona necesita comprender qué emoción quedó guardada',1],['Se busca el sector y luego la emoción',1],['Se limpia en el mismo gráfico',0]];
RX.njso=(k,v)=>{const o=st('njso',{});if(NJ_SO[+k][1]===+v){o[k]=1;RS.njsx=-1}else RS.njsx=+k;render(false)};
RX.njsr=()=>{delete RS.njso;RS.njsA=0;RS.njsx=-1;render(false)};
RICH.nj10=()=>{const o=st('njso',{}),x=st('njsx',-1),all=st('njsA',0),done=Object.keys(o).length===6||all;
 const col=w=>NJ_SO.map((s,i)=>[s,i]).filter(([s])=>s[1]===w).map(([s,i])=>o[i]||all?`<li>${s[0]}</li>`:'<li class="e"></li>').join('');
 return dkH('Paso 4','Limpiar directo o investigar','¿Qué camino corresponde? Lleva cada frase a su columna.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="nj-sort"><div class="nj-card l"><h3>Limpiar directo</h3><p>Con el gráfico de Energías Discordantes</p><ul>${col(0)}</ul></div><div class="nj-card d"><h3>Investigar desde el Mapa</h3><p>Cuando hay más capas</p><ul>${col(1)}</ul></div></div>
 ${done?`<div class="ni-quote ni-in">En ambos casos se pregunta al péndulo cuál camino corresponde.</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('njsr',0)}>Jugar de nuevo</button></div>`:
 `<div class="nj-pile">${NJ_SO.map((s,i)=>o[i]?'':`<div class="${x===i?'no':''}"><span>${s[0]}</span><div class="row"><button class="btn btn-ghost btn-sm" ${rxa('njso',i,0)}>Directo</button><button class="btn btn-ghost btn-sm" ${rxa('njso',i,1)}>Mapa</button></div></div>`).join('')}</div>
 ${x>=0?'<div class="dk-call warn">Mira otra vez: ¿la energía ya está clara o hace falta precisarla?</div>':''}<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','njsA',1)}>Ver la respuesta</button></div>`}</div>`};
const NJ_MS=[['Rechazo',['Invisibilidad','Exclusión','Desvalorización','Desconexión','Sentirse de más'],'#e8dff2','#d6c7ea','#7a5aa6'],
 ['Abandono',['Desamparo','Soledad','Vacío','Apego','Miedo a perder'],'#d8ebe5','#bfdcd2','#3f7d6e'],
 ['Humillación',['Vergüenza','Culpa','Indignidad','Sumisión','Autocastigo'],'#f6e2e8','#ecc9d4','#a9567a'],
 ['Traición',['Desconfianza','Decepción','Control','Resentimiento','Celos'],'#f2e9dd','#e3d4bf','#94692a'],
 ['Injusticia',['Rabia','Exigencia','Rigidez','Frustración','Impotencia'],'#e5edd6','#d0dfba','#5c7a32'],
 ['Emociones comunes',['Miedo','Tristeza','Angustia','Inseguridad','Bloqueo'],'#f5f0d6','#e8dfb3','#97822a']];
RX.njmp=(k,v)=>{v=+v;if(k==='s'){RS.njms=RS.njms===v?-1:v;RS.njme=-1}else{RS.njms=Math.floor(v/5);RS.njme=v}RS.njmc=0;render(false)};
RX.njmc=(k)=>{if(+k){RS.njmc=1}else{RS.njmc=-1;RS.njme=-1;RS.njms=-1}render(false)};
const njMapa=()=>{const s=st('njms',-1),e=st('njme',-1);
 return niFan({label:'Mapa de Emociones',act:'njmp',inner:58,sel:(k,i)=>k==='s'?i===s:i===e,hot:s<0?0:(k,i)=>(k==='s'?i===s:Math.floor(i/5)===s)?1:-1,
 rings:[{k:'s',r0:76,r1:180,items:NJ_MS.map((x,i)=>({t:x[0]==='Emociones comunes'?'Emociones\ncomunes':x[0],sub:'Sector '+(i+1),c:x[3],on:x[4]})),m:'tan',fs:10.5},
  {k:'e',r0:180,r1:280,items:NJ_MS.flatMap(x=>x[1].map(t=>({t,c:x[2],on:x[4]}))),m:'rad',fs:10}],cap:'Primero el sector, luego la emoción.'})};
RICH.nj11=()=>{const s=st('njms',-1),e=st('njme',-1),c=st('njmc',0),E=e>=0?NJ_MS[Math.floor(e/5)][1][e%5]:'';
 const cl=i=>i===0?(s>=0?'ok':'cur'):i===1?(e>=0?'ok':s>=0?'cur':''):(c===1?'ok':e>=0?'cur':'');
 return dkH('Paso 4 · Investigar','El Mapa: investigar la emoción','Pregunta al péndulo y marca en el Mapa lo que responde.')+
 `<div class="ni nj-two"><div class="nj-fig">${niOrig('njmO','mapa.webp','Lámina original del Mapa de Emociones',njMapa())}</div>
 <div style="display:grid;gap:10px"><div class="dk-sub">Cómo se lee</div><div class="nj-steps h">
 <div class="${cl(0)}"><span class="n">1</span><div><b>¿En qué sector está la emoción?</b><p>Una de las cinco heridas o emociones comunes.</p>${s>=0?`<div class="ans">${s+1} · ${NJ_MS[s][0]}</div>`:''}</div></div>
 <div class="${cl(1)}"><span class="n">2</span><div><b>¿Cuál es la emoción?</b><p>Una de las cinco de ese sector.</p>${E?`<div class="ans">${E}</div>`:''}</div></div>
 <div class="${cl(2)}"><span class="n">3</span><div><b>Confirmar</b><p>Preguntar si es correcta antes de limpiar.</p>${e>=0&&c!==1?`<div class="row" style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" ${rxa('njmc',1)}>El péndulo dice sí</button><button class="btn btn-ghost btn-sm" ${rxa('njmc',0)}>Dice no</button></div>`:''}</div></div></div>
 ${c===1?`<div class="ni-hyp ni-in"><span class="ni-tag">Confirmada</span><p>Sector ${s+1}, ${NJ_MS[s][0].toLowerCase()} · <mark>${E}</mark>. Ya se puede limpiar.</p><div>${njGo(1,'Ir al Paso 5')}</div></div>`:c===-1?'<div class="dk-call warn">No era esa. Vuelve a preguntar desde el sector.</div>':''}
 ${niNote('6 sectores · 5 emociones por sector')}</div></div>`};
RICH.nj12=()=>{const o=st('njsc',{}),all=st('njscA',0);
 return dkH('Paso 4 · Investigar','Los seis sectores del Mapa','Toca un sector para ver sus cinco emociones.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="nj-sec">${NJ_MS.map((x,i)=>`<button style="background:${x[2]}" ${rxa('tog','njsc',i)} ${pressed(!!(o[i]||all))}><b>${i+1} · ${x[0]}</b><span class="em">${o[i]||all?x[1].map((y,j)=>`<span style="animation-delay:${j*.06}s">${y}</span>`).join(''):'<em>Toca para ver</em>'}</span></button>`).join('')}</div>
 <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','njscA',all?0:1)}>${all?'Ocultar todas':'Ver todas'}</button></div></div>`};

/* ----- 7 · Paso 5: la limpieza ----- */
const NJ_LI=[['Pedir permiso','Preguntar al péndulo si es el momento de limpiar esta energía.'],['Nombrar','Decir en voz alta la energía o emoción encontrada y la herida a la que pertenece.'],['Limpiar','Limpiar la energía o emoción encontrada, como aprendieron en Radiestesia y Sanación del Alma.'],['Verificar','Preguntar si la energía fue limpiada en totalidad. Si no, repetir.'],['Agradecer y registrar','Agradecer al comité espiritual y anotar lo encontrado en la ficha.']];
const njEnergy=()=>{const e=st('njme',-1);if(e>=0&&st('njmc',0)===1)return NJ_MS[Math.floor(e/5)][1][e%5];return njEdName()||'Rabia'};
RX.njl=(k)=>{const s=st('njl',0);if(k==='no0'){RS.njlp=1}else if(k==='no3'){RS.njl=2;RS.njlv=st('njlv',1)+1}else if(k==='r'){RS.njl=0;RS.njlv=1;RS.njlp=0}else RS.njl=s+1;render(false)};
RICH.nj13=()=>{const s=n3clamp(st('njl',0),0,5),v=st('njlv',1),p=st('njlp',0),E=njEnergy(),H=NI_H[njEh()].n.toLowerCase();
 let act;
 if(p)act=`<div class="nj-pend" aria-hidden="true"><i></i></div><h3>Se respeta la respuesta</h3><p>Hoy no es el momento de limpiar esta energía. Se agradece al comité espiritual y se registra en la ficha.</p><div class="row"><button class="btn btn-ghost btn-sm" ${rxa('njl','r')}>Empezar de nuevo</button></div>`;
 else if(s===0)act=`<div class="nj-pend" aria-hidden="true"><i></i></div><h3>¿Es el momento de limpiar esta energía?</h3><p>Pregunta al péndulo y espera su respuesta.</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('njl','si')}>Sí</button><button class="btn btn-ghost btn-sm" ${rxa('njl','no0')}>No</button></div>`;
 else if(s===1)act=`<div class="nj-pend yes" aria-hidden="true"><i></i></div><h3>Nombrar en voz alta</h3><q>Nombro la energía de ${E.toLowerCase()}, que acompaña a la herida de ${H}.</q><div class="row"><button class="btn btn-primary btn-sm" ${rxa('njl','si')}>La nombré</button></div>`;
 else if(s===2)act=`<div class="nj-pend cl" aria-hidden="true"><i></i></div><h3>Limpiar${v>1?` · vuelta ${v}`:''}</h3><p>Limpia ${E.toLowerCase()} como aprendiste en Radiestesia y Sanación del Alma.</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('njl','si')}>Ya limpié</button></div>`;
 else if(s===3)act=`<div class="nj-pend" aria-hidden="true"><i></i></div><h3>¿Fue limpiada en totalidad?</h3><p>Pregunta al péndulo.</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('njl','si')}>Sí, en totalidad</button><button class="btn btn-ghost btn-sm" ${rxa('njl','no3')}>No, repetir</button></div>`;
 else if(s===4)act=`<div class="nj-pend yes" aria-hidden="true"><i></i></div><h3>Agradecer y registrar</h3><q>Gracias, gracias, gracias.</q><p>Anota en la ficha la energía, la herida y que quedó verificada.</p><div class="row"><button class="btn btn-primary btn-sm" ${rxa('njl','si')}>Terminar</button></div>`;
 else act=`<div class="ni-orb" aria-hidden="true" style="width:120px"><span></span></div><h3>Limpieza verificada</h3><p>${E} quedó limpiada en totalidad${v>1?` después de ${v} vueltas`:''}.</p><div class="row"><button class="btn btn-ghost btn-sm" ${rxa('njl','r')}>Empezar de nuevo</button></div>`;
 return dkH('Paso 5','La limpieza','Practica la secuencia completa con la energía que encontraste.')+
 `<div class="ni nj-lim"><div class="nj-act ni-in">${act}</div>
 <div class="nj-steps">${NJ_LI.map((x,i)=>`<div class="${p&&i===0?'cur':i<s?'ok':i===s?'cur':''}"><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div></div>`};

/* ----- 8 · Ejemplo y práctica ----- */
const NJ_EJ=[['Niño interno','5 a 10 años · Padre','Injusticia · Rígido/a · Años'],['E. Discordantes','Rabia','Camino: investigar desde el Mapa'],['Mapa','Sector 5','Injusticia · Frustración'],['Limpieza','Verificada','Limpiada en totalidad']];
RICH.nj14=()=>{const s=n3clamp(st('njej',0),0,4);
 return dkH('Ejemplo','Ejemplo del protocolo completo','Avanza paso a paso por un caso.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow">${NJ_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('')}</div>
 ${s<4?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','njej',s+1)}>${s?'Siguiente paso':'Empezar'}</button></div>`:
 `<div class="nj-lect"><span class="ni-tag">Lectura</span><p>Entre los 5 y los 10 años, vinculada a la figura del padre, quedó una herida de injusticia con máscara rígida. La acompaña la rabia; en el Mapa aparece la frustración. Se limpió y se verificó.</p></div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','njej',0)}>Ver de nuevo</button></div>`}</div>`+
 niNote('Caso ficticio. La lectura es una hipótesis de trabajo que la persona confirma o descarta; no es un diagnóstico.')};
const NJ_FC=['Consultante','Edad · Quién','Herida y máscara','Energía discordante','Mapa (sector · emoción)','Verificada'];
// ficha de sesión: filas editables y un botón que la llena con lo marcado en los gráficos
const NI_FILL={};
RX.nifi=(k,v)=>{const n=st(k+'n',2),C=NI_FILL[k].c;if(v==='add'){RS[k+'n']=Math.min(10,n+1)}else{let r=0;while(r<n&&C.some((_,c)=>st(k+r+'_'+c,'')))r++;if(r>=n)RS[k+'n']=n+1;
 NI_FILL[k].f().forEach((x,c)=>{if(x)RS[k+r+'_'+c]=x})}render(false)};
const niFicha=(k,C,ex,f,w)=>{NI_FILL[k]={c:C,f};const n=st(k+'n',2);
 return `<div class="dk-sub">Ficha de sesión</div><div class="ni-tw"><table class="ni-tbl nj-ficha"${w?` style="min-width:${w}px"`:''}><thead><tr>${C.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>
 <tr class="ex">${ex.map(x=>`<td>${x}</td>`).join('')}</tr>
 ${Array.from({length:n},(_,r)=>`<tr>${C.map((x,c)=>`<td><input type="text" data-rsin="${k}${r}_${c}" aria-label="${x}, fila ${r+1}" value="${esc(st(k+r+'_'+c,''))}"></td>`).join('')}</tr>`).join('')}</tbody></table></div>
 <div class="dk-cta" style="justify-content:center;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" ${rxa('nifi',k,'add')}>Agregar fila</button><button class="btn btn-primary btn-sm" ${rxa('nifi',k,'fill')}>Llenar con lo que marqué en los gráficos</button></div>`};
const njMapaTxt=()=>{const e=st('njme',-1);return e>=0?`${Math.floor(e/5)+1} · ${NJ_MS[Math.floor(e/5)][1][e%5]}`:''};
RICH.nj15=()=>{
 return dkH('Práctica en parejas','Práctica en parejas','Una persona consulta, la otra facilita. Al terminar, registran y cambian de rol.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-three ni-st"><div class="nj-card l"><span class="ni-tag">Persona A</span><h3>Consultante</h3><p>Comparte su herida principal de la tarea.</p></div><div class="nj-card t"><span class="ni-tag">Persona B</span><h3>Facilitadora</h3><p>Dice la oración de conexión y sigue los 5 pasos del protocolo.</p></div><div class="nj-card b"><span class="ni-tag">Al terminar</span><h3>Registran</h3><p>Completan la ficha de sesión y cambian de rol.</p></div></div>
 ${niFicha('njf',NJ_FC,['Ej.: M. R.','5–10 · Padre','Injusticia · Rígido/a','Rabia','5 · Frustración','Sí'],()=>{const h=n3clamp(nigSel('he'),0,4);return ['',`${nigSel('ed')*5} · ${NIG[3].items[nigSel('qu')]}`,`${NI_H[h].n} · ${NI_H[h].m}`,njEdName(),njMapaTxt(),st('njl',0)>=5?'Sí':'']})}</div>`+n3priv};

/* ----- 9 · Reglas de oro, repaso y tarea ----- */
RICH.nj16=()=>dkH('Facilitación','Reglas de oro al limpiar','Toca cada regla.')+
 `<div class="ni">${n3flip('njro',[['pend','Siempre con permiso','Se pregunta al péndulo antes de limpiar, y se respeta la respuesta.'],['balanza','Hipótesis, no certezas','La persona confirma o descarta lo que aparece; no hay diagnósticos ni promesas.'],['corazon','Cuidar lo que se abre','Se da tiempo a la emoción. No se apura el cierre de la sesión.'],['enlace','Derivar cuando corresponda','Ante malestar intenso o crisis, se acompaña y se deriva a un profesional de salud.']],'c2',150)}</div>`;
RICH.nj17=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('njcp',[['camino','1 · ¿Cuáles son los cinco pasos del protocolo de Casa Muladhara?','<b>Oración de conexión, Gráfico del Niño Interno, Energías Discordantes, limpiar o investigar, y verificar y cerrar.</b>'],['lupa','2 · ¿Cuándo conviene investigar en el Mapa en lugar de limpiar directo?','<b>Cuando hay más capas:</b> la energía es general y hace falta precisarla, o la persona necesita comprender qué emoción quedó guardada.'],['pend','3 · ¿Qué dos preguntas se hacen al péndulo en el Mapa?','<b>¿En qué sector está la emoción? y ¿Cuál es la emoción?</b> Luego se confirma antes de limpiar.']],'c4',260)}</div>`;
RICH.nj18=()=>dkH('Cierre de la clase','Tarea de la semana')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('njta',[['ojo','Aplica el protocolo completo en ti misma, partiendo de tu herida principal'],['pend','Limpia las energías discordantes que aparezcan y verifica con el péndulo'],['libro','Completa tu ficha de sesión con lo que encontraste en el Mapa']],['Marca cada tarea cuando la completes.','¡Listo! Trae tu ficha de sesión a la próxima clase.'])}</div>
 <div style="display:grid;gap:10px">${niBox('l','Para la próxima clase','Trae tu ficha de sesión. Compartir lo que encontraste es voluntario.')}${c4imp('Si al aplicarte el protocolo aparece una energía muy intensa, como abuso, violencia o autolesión, detente y conversa con tu facilitadora antes de seguir.')}</div></div>`;

/* ---------- Nivel 4 · Especialización Niño Interno · Clase 3 ---------- */
(function(){const c=document.createElement('style');c.id='nk-css';c.textContent=`
.nk-mo{display:grid;gap:12px}
.nk-track{position:relative;height:58px;margin:0 6%}
.nk-track::before{content:"";position:absolute;left:0;right:0;top:40px;height:3px;border-radius:3px;background:var(--nb-line)}
.nk-track .fill{position:absolute;left:0;top:40px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--ni-lil2),var(--ni-tea2));transition:width .5s}
.nk-track .dot{position:absolute;top:35px;width:13px;height:13px;margin-left:-6.5px;border-radius:50%;background:var(--nb-paper);border:2px solid var(--ni-lil2)}
.nk-track .dot.on{background:var(--ni-lil2)}
.nk-track .kid{position:absolute;top:0;width:34px;height:34px;margin-left:-17px;display:grid;place-items:center;border-radius:50%;background:var(--ni-lil);color:var(--ni-lil2);transition:left .5s cubic-bezier(.3,.7,.2,1)}
.nk-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.nk-cards button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:6px;align-content:start;padding:14px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);transition:transform .25s,background .25s;animation:niUp .45s both}
.nk-cards button[aria-pressed="true"]{background:var(--ni-olv);border-color:var(--ni-olv);color:#ece7d3;transform:translateY(-4px)}
.nk-cards button[aria-pressed="true"] span{color:#dfe3cf}.nk-cards button[aria-pressed="true"] small{color:#d9c9ef}
.nk-cards small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.nk-cards b{font:400 1.1rem/1.2 var(--f-display)}
.nk-cards span{font-size:.85rem;line-height:1.45;color:var(--nb-soft)}
.nk-mem{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;align-items:center;font-size:.8rem;color:var(--nb-soft)}
.nk-mem i{display:block;height:8px;border-radius:8px;transition:width .5s}
.nk-rule{width:100%;height:auto;display:block}
.nk-rule .tr{cursor:pointer}
.nk-rule .tr rect{transition:fill .3s}
.nk-rule .tr:focus-visible rect{stroke:#7a5aa6;stroke-width:2}
.nk-rule .sec{animation:niPop .45s both;transform-box:fill-box;transform-origin:50% 100%}
.nk-rule text{font-family:var(--f-body,system-ui);font-size:11px;fill:#5d6b55;text-anchor:middle}
.nk-legend{display:flex;flex-wrap:wrap;gap:6px}
.nk-legend button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;border:1px solid var(--nb-line);font-size:.8rem;color:var(--nb-ink);background:var(--nb-paper)}
.nk-legend button i{width:12px;height:12px;border-radius:3px}
.nk-legend button[aria-pressed="true"]{border-color:var(--ni-lil2);box-shadow:inset 0 0 0 1px var(--ni-lil2)}
.nk-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.nk-grid button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:2px;padding:12px 14px;border-radius:12px;color:#2b2b22;transition:opacity .3s,transform .25s;animation:niPop .4s both}
.nk-grid button b{font-weight:600;font-size:.92rem}.nk-grid button small{font-size:.72rem;opacity:.7}
.nk-grid button.off{opacity:.3}
.nk-grid button[aria-pressed="true"]{transform:translateY(-3px);box-shadow:0 0 0 2px var(--ni-lil2)}
.nk-figs{display:grid;gap:10px}
.nk-fig{display:grid;gap:10px;align-content:start;padding:16px;border-radius:18px;background:var(--nb-paper);border:1px solid var(--nb-line);animation:niUp .5s both}
.nk-fig header{display:flex;justify-content:space-between;align-items:center;gap:8px}
.nk-fig h3{margin:0;font:400 1.25rem/1.2 var(--f-display);color:var(--nb-ink)}
.nk-fig p{margin:0;font-size:.88rem;line-height:1.5;color:var(--nb-ink)}
.nk-fig .ej{padding:10px 12px;border-radius:12px;background:var(--ni-tea);color:#1f3f32;animation:niUp .4s both}
.nk-fig .q{padding:10px 12px;border-radius:12px;background:var(--ni-lil);color:#3b2a5a;font:italic 400 1rem/1.4 var(--f-display)}
.nk-fig svg{width:74px;height:auto;flex:none}
.nk-5{grid-template-columns:repeat(5,minmax(0,1fr))}
@media (max-width:760px){.nk-cards,.nk-grid{grid-template-columns:1fr 1fr}.nk-track{display:none}.nk-5{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();

const niAgenda=(cl,ag,obj)=>dkH(cl,'Agenda de la clase',(['Seis','Siete','Ocho','Nueve','Diez'][ag.length-6]||ag.length)+' momentos. Toca uno para ir directo a él.')+
 `<div class="ni dk-split" style="align-items:stretch"><div class="ni-agenda ni-st">${ag.map((x,i)=>`<button data-les="${S.lesson[0]},${S.lesson[1]+i+1}"><b>${i+1}</b><span>${x}</span><small>Ir</small></button>`).join('')}</div>
 <div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Objetivo de hoy</span><h3>Al terminar la clase podrás</h3><ul class="ni-st" style="margin:0;padding-left:18px;display:grid;gap:8px;color:#dfe3cf;line-height:1.5">${obj.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`;

/* ----- 1 · Bienvenida y agenda ----- */
RICH.nk1=()=>`<div class="ni">${nbHero('Especialización Niño Interno · Clase 3','El tiempo y','las figuras de la herida','Completamos el gráfico: el anillo 1 con la escala de 0 a 100, para saber cuándo se originó la herida, y el anillo 4 con sus doce figuras, para saber quién la provocó.',['Anillo 1','Escala 0 a 100','Doce figuras','Lectura completa'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="${N4P}nino/c3-portada.webp" alt="Una mujer y una niña sentadas en el pasto, con los ojos cerrados; la niña apoya la cabeza en su hombro"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#cfe3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#e6dcf2" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#7a5aa6"/></svg></div>`)}</div>`;
RICH.nk2=()=>niAgenda('Clase 3',['Revisión de la tarea','Los anillos que completamos hoy','Anillo 1: el momento de la herida','Anillo 4: las doce figuras','Figuras del vínculo y del entorno','Lo femenino, lo masculino y uno mismo','Ejemplo y práctica en parejas','Reglas de oro, repaso y tarea'],
 ['Leer el anillo 1 y la escala de 0 a 100','Reconocer las doce figuras del anillo 4','Integrar edad y figura en una lectura','Aplicar el protocolo con una compañera']);

/* ----- 2 · Revisión de la tarea ----- */
RICH.nk3=()=>dkH('Lo que trajiste','Revisemos la tarea de la semana','Marca las preguntas a medida que las conversan.')+
 `<div class="ni dk-grid c2" style="align-items:stretch"><div class="nj-card l ni-in"><h3>1 · El protocolo en ti misma</h3><p>Aplicaste los 5 pasos partiendo de tu herida principal.</p>${n3ck('nkt1',[['chat','¿Qué energía discordante apareció?'],['chat','¿Limpiaste directo o investigaste en el Mapa?'],['chat','¿Qué sector y qué emoción encontraste?'],['chat','¿Cómo te sentiste después de limpiar?']])}</div>
 <div class="nj-card t ni-in" style="animation-delay:.12s"><h3>2 · Tu ficha de sesión</h3><p>Registraste lo que encontraste.</p>${n3ck('nkt2',[['chat','¿Completaste todos los pasos?'],['chat','¿Qué paso te costó más?'],['chat','¿Qué dudas te quedaron del protocolo?'],['chat','¿Quieres compartir tu ficha? Es voluntario.']])}</div></div>`+
 niNote('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.');
const NK_EDL=[...new Set(NJ_EDO.concat(NJ_EDI))].sort((a,b)=>a.localeCompare(b,'es'));
RICH.nk4=()=>{const s=st('nkrs',-1),e=st('nkre',-1);
 return dkH('Lo que trajiste','Ronda de descubrimientos','Cada alumna completa en voz alta:')+
 `<div class="ni nj-ronda"><div><span class="n">1</span><div><b>La energía discordante que apareció fue…</b><small>Una de las energías del gráfico.</small><input type="text" list="nk-edl" data-rsin="nkr1" placeholder="Escribe o elige una energía" value="${esc(st('nkr1',''))}"><datalist id="nk-edl">${NK_EDL.map(x=>`<option value="${x}">`).join('')}</datalist></div></div>
 <div><span class="n">2</span><div><b>En el Mapa encontré…</b><small>El sector y la emoción, si investigaste.</small>${chipRow('nkrs',NJ_MS.map((x,i)=>(i+1)+' · '+x[0]),s)}${s>=0?`<div class="ni-in" style="margin-top:8px">${chipRow('nkre',NJ_MS[s][1],e)}</div>`:''}${s>=0&&e>=0?`<small class="ni-in" style="margin:8px 0 0">Sector ${s+1} · <b style="font-size:.95rem">${NJ_MS[s][1][e]||''}</b></small>`:''}</div></div>
 <div><span class="n">3</span><div><b>Después de limpiar sentí…</b><small>Una sensación, una imagen o una emoción.</small><input type="text" data-rsin="nkr3" placeholder="Escribe tu frase" value="${esc(st('nkr3',''))}"></div></div></div>`+n3priv};

/* ----- 3 · Los anillos que completamos hoy ----- */
const NK_AN=[[['cu','ed'],'Anillo 1 · Edad','Del vientre a los años, más la escala de 0 a 100: cuándo se originó la herida.','Hoy'],[['ma','he'],'Anillos 2 y 3','Máscara y herida: vistos en la Clase 1.','Visto'],[['qu'],'Anillo 4 · Quién la provocó','Madre y padre ya vistos. Hoy, las otras diez figuras.','Hoy']];
RICH.nk5=()=>{const s=n3clamp(st('nkan',0),0,2);
 return dkH('Anillos 1 y 4','Hoy completamos el gráfico','Toca cada grupo de anillos para verlo en el gráfico.')+
 `<div class="ni nj-two"><div class="nj-fig">${niOrig('nkanO','grafico.webp','Lámina original del gráfico del niño interno de Casa Muladhara',niChart({hl:NK_AN[s][0]}))}</div>
 <div class="nk-cards">${NK_AN.map((x,i)=>`<button ${rxa('set','nkan',i)} ${pressed(i===s)} style="animation-delay:${i*.08}s"><small>${x[3]}</small><b>${x[1]}</b><span>${x[2]}</span></button>`).join('')}</div></div>`};

/* ----- 4 · Anillo 1: el momento de la herida ----- */
const NK_MO=[['Vientre','Lo que vivió la madre durante el embarazo: si fue esperado, el clima emocional, las preocupaciones.'],['Nacimiento','Cómo fue el parto y la llegada: separaciones, complicaciones, cómo fue recibido.'],['Días','Los primeros días de vida: contacto, cuidados y presencia de quienes lo recibieron.'],['Semanas','Las primeras semanas: alimentación, rutina y disponibilidad de quien lo cuidaba.'],['Meses','El primer tiempo de vida: apego, separaciones o cambios en la familia.'],['Años','Experiencias que ya recuerda o le contaron. La edad se precisa en la escala de 0 a 100.']];
RICH.nk6=()=>{const s=n3clamp(nigSel('cu'),0,5),pos=s*20;
 return dkH('Anillo 1','El momento de la herida','Seis momentos, del vientre a los años. Toca uno: también queda marcado en tu gráfico.')+
 `<div class="ni nk-mo"><div class="nk-track" aria-hidden="true"><i class="fill" style="width:${pos}%"></i>${NK_MO.map((_,i)=>`<i class="dot${i<=s?' on':''}" style="left:${i*20}%"></i>`).join('')}<span class="kid" style="left:${pos}%">${ic(s===0?'vientre':'nino',20)}</span></div>
 <div class="nk-cards">${NK_MO.map((x,i)=>`<button ${rxa('nigs','cu',i)} ${pressed(i===s)} style="animation-delay:${i*.05}s"><small>${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 <div class="nk-mem"><span>Recuerdo consciente</span><i style="width:${8+s*18}%;background:var(--ni-tea2)"></i><span>Sensación</span><i style="width:${98-s*14}%;background:var(--ni-lil2)"></i></div>
 ${s===5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" data-slide="1">Precisar la edad en la escala</button></div>`:''}
 ${niQ('Cuanto más temprano el momento, menos recuerdo consciente: suele reconocerse como sensación.')}</div>`};
RX.nkt=k=>{RS.nkt=+k;RS.nks=-1;render(false)};
RX.nks=k=>{RS.nks=+k;RS.niged=st('nkt',0)*4+ +k;render(false)};
const nkEdad=()=>{const cu=nigSel('cu'),a=nigSel('ed')*5;return cu===5?`Años · ${a}–${Math.min(100,a+5)}`:NIG[0].items[cu]};
RICH.nk7=()=>{const t=st('nkt',-1),z=st('nks',-1),cu=nigSel('cu'),X=v=>30+v*5.4;
 let svg=`<svg class="nk-rule" viewBox="0 0 600 110" role="group" aria-label="Escala de 0 a 100">`;
 for(let i=0;i<5;i++)svg+=`<g class="tr" ${rxa('nkt',i)} role="button" tabindex="0" aria-label="Tramo ${i*20} a ${i*20+20}" aria-pressed="${i===t}"><rect x="${X(i*20)+1}" y="34" width="${20*5.4-2}" height="22" rx="4" fill="${i===t?'#7a5aa6':'#e6dcf2'}"/><text x="${X(i*20+10)}" y="76" style="font-weight:${i===t?700:400};fill:${i===t?'#7a5aa6':'#5d6b55'}">Tramo ${i*20}–${i*20+20}</text></g>`;
 for(let v=0;v<=100;v+=5)svg+=`<line x1="${X(v)}" x2="${X(v)}" y1="${v%10?24:18}" y2="32" stroke="#a89a6e" stroke-width="${v%10?1:1.5}"/>${v%10?'':`<text x="${X(v)}" y="12">${v}</text>`}`;
 svg+=`<line x1="${X(0)}" x2="${X(100)}" y1="32" y2="32" stroke="#a89a6e" stroke-width="1.5"/>`;
 if(t>=0&&z>=0)svg+=`<rect class="sec" x="${X(t*20+z*5)}" y="28" width="${5*5.4}" height="32" rx="3" fill="#3b4a24" opacity=".85"/><text class="sec" x="${X(t*20+z*5+2.5)}" y="100" style="font-weight:700;fill:#3b4a24">${t*20+z*5} a ${t*20+z*5+5} años</text>`;
 svg+='</svg>';
 return dkH('Anillo 1 · Escala','La escala de 0 a 100: la edad en años','Pregunta al péndulo en dos pasos y marca su respuesta en la escala.')+
 `<div class="ni" style="display:grid;gap:14px">${svg}
 <div class="dk-grid c2" style="align-items:stretch"><div class="nj-card l"><span class="ni-tag">Paso 1 · El tramo</span><p style="font-size:.9rem;opacity:1">Preguntar al péndulo en qué tramo de 20 años está la herida. Toca un tramo en la escala o aquí.</p><div class="dk-chips">${[0,1,2,3,4].map(i=>`<button class="chip" ${rxa('nkt',i)} ${pressed(i===t)}>${i*20}–${i*20+20}</button>`).join('')}</div>${t>=0?'':'<p><i>Ejemplo: tramo 0–20.</i></p>'}</div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><span class="ni-tag" style="color:#d9c9ef">Paso 2 · El sector</span><p style="font-size:.9rem;color:#dfe3cf">Dentro del tramo, afinar de 5 en 5 hasta llegar al sector.</p>
 ${t>=0?`<div class="dk-chips ni-in">${[0,1,2,3].map(i=>`<button class="chip" ${rxa('nks',i)} ${pressed(i===z)}>${t*20+i*5}–${t*20+i*5+5}</button>`).join('')}</div>`:'<p style="color:#dfe3cf"><i>Ejemplo: entre 10 y 15 años.</i></p>'}</div></div>
 ${t>=0&&z>=0?`<div class="ni-hyp ni-in"><span class="ni-tag">Lectura del anillo 1</span><p>La herida se originó <mark>entre los ${t*20+z*5} y los ${t*20+z*5+5} años</mark>. Ya quedó marcado en tu gráfico.</p></div>`:''}
 ${cu!==5?`<div class="dk-call warn">La escala se lee cuando el anillo 1 marca «Años». En tu gráfico marca «${NIG[0].items[cu]}». <button class="btn btn-ghost btn-sm" ${rxa('nigs','cu',5)}>Marcar «Años»</button></div>`:niNote('La escala se lee cuando el anillo 1 marca «Años».')}</div>`};

/* ----- 5 · Anillo 4: las doce figuras ----- */
const NK_CAT={v:['Vínculo cercano','#d6e8e2'],e:['Entorno','#efe6d6'],f:['Lo femenino y lo masculino','#e6dcf2'],u:['Uno mismo','#f6e2e8']};
const NK_F=[
 {c:'u',rep:'Lo que el propio niño concluyó sobre sí mismo y sigue sosteniendo.',ej:'«Yo tuve la culpa», «no soy suficiente», «tengo que portarme bien».',q:'¿Qué decidió tu niña sobre sí misma?'},
 {c:'u',rep:'La persona de hoy, que repite la herida o se la provoca a sí misma.',ej:'Autoexigencia, abandonarse a sí misma, relaciones que repiten el patrón.',q:'¿Cómo te repites hoy esa herida?'},
 {c:'v',c1:1,rep:'Protección, límites, estructura y confianza para salir al mundo.',q:'Vista en la Clase 1.'},
 {c:'v',c1:1,rep:'Nutrición, acogida, capacidad de recibir y seguridad emocional.',q:'Vista en la Clase 1.'},
 {c:'e',rep:'Los colectivos donde participó: el curso, el colegio, el barrio, una comunidad o un equipo.',ej:'Burlas en el colegio, no ser elegida en el equipo, rechazo de una comunidad.',q:'¿En qué grupo te sentiste fuera de lugar?'},
 {c:'v',rep:'El sistema familiar más amplio: abuelos, tíos, hermanos, y los mandatos de la familia.',ej:'Comparaciones entre hermanos, secretos familiares, «aquí no se llora».',q:'¿Qué se esperaba de ti en tu familia?'},
 {c:'u',rep:'Los sueños e ideales: la herida de lo que no se pudo ser o hacer.',ej:'Un sueño abandonado, una vocación negada, un ideal frustrado.',q:'¿Qué sueño de niña quedó guardado?'},
 {c:'v',rep:'Quien cuidó o educó en lugar de los padres o junto a ellos.',ej:'Una abuela que crió, un profesor que humilló, un cuidador distante.',q:'¿Quién te cuidaba cuando tus padres no estaban?'},
 {c:'f',rep:'Lo femenino en general y la relación con las mujeres, más allá de la madre.',ej:'Mensajes sobre el cuerpo, la sensibilidad o el lugar de la mujer.',q:'¿Qué aprendiste de niña sobre lo femenino?'},
 {c:'f',rep:'Lo masculino en general y la relación con los hombres, más allá del padre.',ej:'Mensajes sobre la fuerza, la autoridad o el lugar del hombre.',q:'¿Qué aprendiste de niña sobre lo masculino?'},
 {c:'v',rep:'Los vínculos de amistad y los pares más cercanos.',ej:'Una amiga que contó un secreto, la exclusión de un mejor amigo.',q:'¿Hubo una amistad que te marcó?'},
 {c:'e',rep:'Personas que no están en las otras figuras: vecinos, médicos, desconocidos, autoridades ocasionales.',ej:'Un médico en el nacimiento, un vecino, alguien que apareció en un momento difícil.',q:'¿Hubo alguien fuera de tu círculo que te dejó una huella?'}];
const NK_GRID=[0,1,2,3,4,5,6,7,8,9,10,11];
RICH.nk8=()=>{const q=nigSel('qu'),c=st('nkc',''),F=NK_F[q],off=F.c==='u'||F.c==='f'?2:1;
 return dkH('Anillo 4','Las doce figuras','Toca una figura o un sector del anillo 4. El color dice a qué grupo pertenece.')+
 `<div class="ni nj-two"><div class="nj-fig">${niChart({hl:'qu',cap:0})}</div>
 <div class="nk-legend">${Object.entries(NK_CAT).map(([k,x])=>`<button ${rxa('set','nkc',c===k?'':k)} ${pressed(c===k)}><i style="background:${x[1]}"></i>${x[0]}</button>`).join('')}</div>
 <div class="nk-grid">${NK_GRID.map(i=>`<button ${rxa('nigs','qu',i)} ${pressed(i===q)} class="${c&&NK_F[i].c!==c?'off':''}" style="background:${NK_CAT[NK_F[i].c][1]};animation-delay:${i*.03}s"><b>${NIG[3].items[i]}</b>${NK_F[i].c1?'<small>Vista en la Clase 1</small>':''}</button>`).join('')}</div>
 <div class="nj-det" style="background:${NK_CAT[F.c][1]}"><div><span class="ni-tag">${NK_CAT[F.c][0]}</span><br><b>${NIG[3].items[q]}</b><p>${F.rep}</p></div>${F.c1?`<button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},6">Repasar en la Clase 1</button>`:njGo(off,'Ver en detalle','btn-ghost')}</div></div>`+
 niNote('El orden sigue el gráfico, de izquierda a derecha. Cada figura se confirma con el péndulo.')};

/* ----- 6 y 7 · Las figuras en detalle ----- */
const nkMini=i=>{const cx=40,cy=38,r0=12,r1=34,P=(r,a)=>[(cx+r*Math.cos(a)).toFixed(1),(cy-r*Math.sin(a)).toFixed(1)];let g='';
 for(let j=0;j<12;j++){const a1=Math.PI-j*Math.PI/12,a2=Math.PI-(j+1)*Math.PI/12,[x1,y1]=P(r1,a1),[x2,y2]=P(r1,a2),[x3,y3]=P(r0,a2),[x4,y4]=P(r0,a1);
  g+=`<path d="M${x1} ${y1}A${r1} ${r1} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r0} ${r0} 0 0 0 ${x4} ${y4}Z" fill="${j===i?'#7a5aa6':'#e9e3d0'}" stroke="#fff" stroke-width="1"${j===i?' style="animation:niPop .5s .2s both;transform-origin:40px 38px"':''}/>`}
 return `<svg viewBox="0 0 80 42" aria-hidden="true">${g}<circle cx="${cx}" cy="${cy}" r="8" fill="#1f3f32"/></svg>`};
const nkFigs=(k,ids)=>{const o=st(k,{});
 return `<div class="ni dk-grid ${ids.length===3?'c3':'c2'} nk-figs" style="align-items:stretch">${ids.map((i,n)=>{const F=NK_F[i];return `<div class="nk-fig" style="animation-delay:${n*.1}s"><header><div><span class="ni-tag">Qué representa</span><h3>${NIG[3].items[i]}</h3></div>${nkMini(i)}</header><p>${F.rep}</p>
 ${o[i]?`<div class="ej"><span class="ni-tag" style="color:#3f7d6e">Ejemplos</span><p style="color:inherit">${F.ej}</p></div>`:`<button class="btn btn-ghost btn-sm" ${rxa('tog',k,i)}>Ver ejemplos</button>`}
 <div class="q">${F.q}</div></div>`}).join('')}</div>`};
RICH.nk9=()=>dkH('Anillo 4 · Quién la provocó','Figuras del vínculo cercano','Lee qué representa cada figura y abre sus ejemplos. La pregunta sirve para la sesión.')+nkFigs('nkf9',[5,7,10]);
RICH.nk10=()=>dkH('Anillo 4 · Quién la provocó','Figuras del entorno','Lee qué representa cada figura y abre sus ejemplos.')+nkFigs('nkf10',[4,11]);
RICH.nk11=()=>dkH('Anillo 4 · Quién la provocó','Lo femenino y lo masculino','Más allá de la madre y del padre. Abre los ejemplos.')+nkFigs('nkf11',[8,9]);
RICH.nk12=()=>dkH('Anillo 4 · Quién la provocó','Cuando la figura es uno mismo','Tres figuras que miran hacia la propia persona. Abre los ejemplos.')+nkFigs('nkf12',[0,1,6]);

/* ----- 8 · Ejemplo y práctica ----- */
const NK_EJ=[['Anillo 1','Años','Escala: 10 a 15'],['Anillo 4','Grupo','El curso del colegio'],['Anillos 3 y 2','Rechazo','Máscara Evasivo/a'],['E. Discordantes','Baja autoestima','Limpiar directo'],['Limpieza','Verificada','En totalidad']];
RICH.nk13=()=>{const s=n3clamp(st('nkej',0),0,5);
 return dkH('Ejemplo','Ejemplo: una lectura completa','Avanza anillo por anillo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow nk-5">${NK_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('')}</div>
 ${s<5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','nkej',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="dk-grid c2" style="align-items:start"><div class="nj-lect"><span class="ni-tag">Lectura</span><p>Entre los 10 y los 15 años, en el grupo del colegio, quedó una herida de rechazo con máscara evasiva. La acompaña la baja autoestima. Se limpió y se verificó.</p></div>
 <div style="display:grid;gap:8px"><div class="dk-sub">Preguntas para la consultante · marca las que harías</div>${n3ck('nkeq',[['chat','¿Cómo era tu curso a esa edad?'],['chat','¿Cuándo empezaste a desaparecer para no ser vista?'],['chat','¿Dónde ocurre eso hoy?']])}</div></div>
 <div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','nkej',0)}>Ver de nuevo</button></div>`}</div>`+
 niNote('Caso ficticio. La lectura es una hipótesis de trabajo que la persona confirma o descarta; no es un diagnóstico.')};
RICH.nk14=()=>dkH('Práctica en parejas','Práctica en parejas','Una persona consulta, la otra facilita. Al terminar, registran y cambian de rol.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-three ni-st"><div class="nj-card l"><span class="ni-tag">Persona A</span><h3>Consultante</h3><p>Elige un tema liviano o su herida principal.</p></div><div class="nj-card t"><span class="ni-tag">Persona B</span><h3>Facilitadora</h3><p>Aplica el protocolo y precisa anillo 1, escala y figura.</p></div><div class="nj-card b"><span class="ni-tag">Al terminar</span><h3>Registran</h3><p>Completan la ficha y cambian de rol.</p></div></div>
 ${niFicha('nkf',['Consultante','Anillo 1 · escala','Quién','Herida y máscara','Energía · Mapa','Verificada'],['Ej.: M. R.','Años · 10–15','Grupo','Rechazo · Evasivo/a','Baja autoestima','Sí'],()=>{const h=n3clamp(nigSel('he'),0,4),m=njMapaTxt();return ['',nkEdad(),NIG[3].items[nigSel('qu')],`${NI_H[h].n} · ${NI_H[h].m}`,[njEdName(),m].filter(Boolean).join(' · '),st('njl',0)>=5?'Sí':'']})}</div>`+n3priv;

/* ----- 9 · Reglas de oro, repaso y tarea ----- */
RICH.nk15=()=>dkH('Facilitación','Reglas de oro al leer figuras','Toca cada regla.')+
 `<div class="ni">${n3flip('nkro',[['corazon','Comprender, no culpar','Cada figura también tuvo su historia. La lectura busca comprender, no señalar culpables.'],['balanza','Hipótesis, no certezas','La persona confirma o descarta lo que aparece; no hay diagnósticos ni promesas.'],['escudo','Cuidar lo que se abre','Los momentos tempranos y la figura «Otro reparto» pueden tocar experiencias difíciles.'],['enlace','Derivar cuando corresponda','Ante malestar intenso o crisis, se acompaña y se deriva a un profesional de salud.']],'c2',150)}</div>`;
RICH.nk16=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('nkcp',[['reloj','1 · Si el anillo 1 marca «Años», ¿cómo se precisa la edad?','<b>Con la escala de 0 a 100.</b> Primero se pregunta al péndulo el tramo de 20 años y luego se afina de 5 en 5 hasta llegar al sector.'],['grupo','2 · ¿Qué diferencia hay entre la figura Madre y la figura Femenino?','<b>Madre es la propia madre.</b> Femenino es lo femenino en general y la relación con las mujeres, más allá de la madre.'],['persona','3 · Si la figura es el Adulto, ¿qué estamos viendo?','<b>A la persona de hoy,</b> que repite la herida o se la provoca a sí misma.']],'c4',260)}</div>`;
RICH.nk17=()=>dkH('Cierre de la clase','Tarea de la semana')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('nkta',[['grupo','Realiza dos sesiones completas con personas voluntarias'],['reloj','Precisa en cada una el anillo 1, la escala y la figura del anillo 4'],['libro','Completa una ficha de sesión por cada persona']],['Marca cada tarea cuando la completes.','¡Listo! Trae tus dos fichas a la próxima clase.'])}</div>
 <div style="display:grid;gap:10px">${niBox('l','Para la próxima clase','Trae tus dos fichas. Las usaremos en la evaluación práctica de la Clase 4.')}${c4imp('Si en una sesión aparece algo muy intenso, detén la lectura, acompaña con calma y conversa con tu facilitadora.')}</div></div>`;

/* ---------- Nivel 4 · Especialización Niño Interno · Clase 4 ---------- */
(function(){const c=document.createElement('style');c.id='nl-css';c.textContent=`
.nl-path{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;position:relative}
.nl-path button{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:grid;gap:6px;align-content:start;padding:14px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);min-height:180px;animation:niUp .5s both;transition:transform .25s}
.nl-path button:hover{transform:translateY(-4px)}
.nl-path button:last-child{background:var(--ni-olv);border-color:var(--ni-olv);color:#ece7d3}
.nl-path button:last-child span{color:#dfe3cf}.nl-path button:last-child small{color:#d9c9ef}
.nl-path small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.nl-path b{font:400 1.12rem/1.2 var(--f-display)}
.nl-path span{font-size:.84rem;line-height:1.45;color:var(--nb-soft)}
.nl-path em{font:600 .55rem/1 var(--f-caps);letter-spacing:.14em;text-transform:uppercase;font-style:normal;margin-top:auto;opacity:.7}
.nl-path button:not(:last-child)::after{content:"";position:absolute;right:-14px;top:50%;border:6px solid transparent;border-left:9px solid var(--ni-lil2);margin-top:-6px;animation:njArr 1.6s ease-in-out infinite}
.nl-bar{display:flex;gap:4px;height:46px;position:relative}
.nl-bar button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;place-items:center;border-radius:12px;font:600 .62rem/1.2 var(--f-caps);letter-spacing:.12em;text-transform:uppercase;transition:filter .25s,transform .25s;text-align:center}
.nl-bar button[aria-pressed="true"]{transform:translateY(-4px);box-shadow:0 10px 20px -12px rgba(28,58,43,.8)}
.nl-mom{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.nl-mom>div{border-radius:18px;padding:16px;display:grid;gap:8px;align-content:start;transition:opacity .35s,transform .35s}
.nl-mom>div.off{opacity:.4}
.nl-mom>div.on{transform:translateY(-4px)}
.nl-mom h3{margin:0;font:400 1.3rem/1.2 var(--f-display)}
.nl-mom small{font-size:.78rem;opacity:.75}
.nl-mom ul{margin:0;padding-left:18px;display:grid;gap:6px;font-size:.88rem;line-height:1.45}
.nl-mom li{animation:niUp .4s both}
.nl-say{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:14px;align-items:start}
.nl-frase{background:var(--ni-lil);color:#3b2a5a;border-radius:18px;padding:18px;display:grid;gap:8px;align-content:start;animation:niUp .5s .15s both}
.nl-frase.d{background:var(--ni-olv);color:#ece7d3}.nl-frase.d .ni-tag{color:#d9c9ef}
.nl-frase p{margin:0;font:italic 400 1.12rem/1.5 var(--f-display)}
.nl-alert{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start}
.nl-alert .nj-card{min-height:100%}
.nl-do{display:grid;gap:8px}
.nl-do>div{display:grid;grid-template-columns:30px 1fr;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;background:rgba(236,231,211,.1);color:#dfe3cf;opacity:.35;transition:opacity .4s,background .4s}
.nl-do.on>div{opacity:1;background:rgba(236,231,211,.16);animation:niUp .45s both}
.nl-do .n{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#d9c9ef;color:#3b2a5a;font:600 .78rem/1 var(--f-caps)}
.nl-role{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.nl-role .who{display:inline-block;justify-self:start;padding:4px 10px;border-radius:999px;background:#fff;color:var(--nb-ink);font-weight:600;font-size:.82rem;animation:niPop .45s both}
.nl-pauta td{vertical-align:middle}
.nl-pauta td:nth-child(2){color:var(--nb-ink);font-weight:400}
.nl-pauta .b{display:flex;gap:6px;flex-wrap:wrap}
.nl-pauta .b button{all:unset;cursor:pointer;padding:5px 10px;border-radius:999px;border:1px solid var(--nb-line);font-size:.76rem;color:var(--nb-soft);background:var(--nb-paper);white-space:nowrap}
.nl-pauta .b button[aria-pressed="true"].y{background:var(--ni-tea2);border-color:var(--ni-tea2);color:#fff;animation:niPop .3s both}
.nl-pauta .b button[aria-pressed="true"].d{background:#e9c46a;border-color:#d8b155;color:#3b2a1a;animation:niPop .3s both}
.nl-req{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.nl-req button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:start;padding:16px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);transition:background .3s;animation:niUp .45s both}
.nl-req button[aria-pressed="true"]{background:var(--ni-olv);border-color:var(--ni-olv);color:#ece7d3}
.nl-req button[aria-pressed="true"] span{color:#dfe3cf}
.nl-req i{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:2px solid var(--ni-lil2);font-style:normal;color:#fff}
.nl-req button[aria-pressed="true"] i{background:var(--ni-tea2);border-color:var(--ni-tea2);animation:niPop .35s both}
.nl-req b{font:400 1.1rem/1.2 var(--f-display);display:block;margin-bottom:4px}
.nl-req span{font-size:.86rem;line-height:1.45;color:var(--nb-soft)}
@media (max-width:760px){.nl-path,.nl-mom,.nl-say,.nl-alert,.nl-role,.nl-req{grid-template-columns:1fr}.nl-path button{min-height:0}.nl-path button::after{display:none}.nl-bar button{font-size:.52rem;letter-spacing:.06em}}
`;document.head.appendChild(c)})();

// juego de clasificar: cada frase va a su columna; las que se aciertan pasan a la tarjeta correspondiente
window.RX=window.RX||{};
const NI_SO={};
RX.niso=(k,v)=>{const [key,i]=k.split('.'),o=st(key,{});if(NI_SO[key][+i][1]===+v){o[i]=1;RS[key+'x']=-1}else RS[key+'x']=+i;render(false)};
RX.nisr=k=>{delete RS[k];RS[k+'A']=0;RS[k+'x']=-1;render(false)};
const niSort=(key,items,cols,end,warn)=>{NI_SO[key]=items;const o=st(key,{}),x=st(key+'x',-1),all=st(key+'A',0),done=Object.keys(o).length===items.length||all;
 const col=w=>items.map((s,i)=>[s,i]).filter(([s])=>s[1]===w).map(([s,i])=>o[i]||all?`<li>${s[0]}</li>`:'<li class="e"></li>').join('');
 return `<div class="ni" style="display:grid;gap:12px"><div class="nj-sort">${cols.map((c,w)=>`<div class="nj-card ${c[2]}"><h3>${c[0]}</h3>${c[1]?`<p>${c[1]}</p>`:''}<ul>${col(w)}</ul></div>`).join('')}</div>
 ${done?`<div class="ni-quote ni-in">${end}</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('nisr',key)}>Jugar de nuevo</button></div>`:
 `<div class="nj-pile">${items.map((s,i)=>o[i]?'':`<div class="${x===i?'no':''}"><span>${s[0]}</span><div class="row">${cols.map((c,w)=>`<button class="btn btn-ghost btn-sm" ${rxa('niso',key+'.'+i,w)}>${c[3]}</button>`).join('')}</div></div>`).join('')}</div>
 ${x>=0?`<div class="dk-call warn">${warn}</div>`:''}<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set',key+'A',1)}>Ver la respuesta</button></div>`}</div>`};

/* ----- 1 · Bienvenida y agenda ----- */
const NL_PH=`${N4P}nino/c4-portada.webp`;
const nlPhoto=alt=>`<div class="ni-ph"><img src="${NL_PH}" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#cfe3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#e6dcf2" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#e9c46a"/></svg></div>`;
RICH.nl1=()=>`<div class="ni">${nbHero('Especialización Niño Interno · Clase 4','La sesión','completa','Todo lo aprendido se integra en una sesión con una consultante: antes, durante y después, cómo comunicar la lectura, cuándo derivar y la evaluación práctica.',['Encuadre','Protocolo','Cierre','Evaluación'],'Karen Oyarce · Maestra Holística',nlPhoto('Una mujer y una niña caminan de la mano por un sendero entre árboles, de espaldas'))}</div>`;
RICH.nl2=()=>niAgenda('Clase 4',['Revisión de la tarea','El camino recorrido','La sesión completa: antes, durante y después','Cómo comunicar la lectura','Cierre, señales de alerta y registro','Demostración y evaluación práctica','Repaso y certificación','Oración de agradecimiento y cierre'],
 ['Realizar una sesión completa de principio a fin','Comunicar la lectura como hipótesis, sin culpar','Reconocer señales de alerta y derivar','Aprobar la evaluación práctica']);

/* ----- 2 · Revisión de la tarea ----- */
RICH.nl3=()=>dkH('Lo que trajiste','Revisemos la tarea de la semana','Marca las preguntas a medida que las conversan.')+
 `<div class="ni"><div class="nj-card l ni-in" style="max-width:720px;margin:0 auto"><h3>Tus dos sesiones con voluntarias</h3>${n3ck('nlt1',[['chat','¿Cómo te sentiste como facilitadora?'],['chat','¿Qué anillo 1, escala y figura aparecieron?'],['chat','¿Qué paso del protocolo te resultó más natural?'],['chat','¿En qué momento dudaste o no supiste qué decir?'],['chat','¿Qué te dijeron las personas al terminar?']])}</div></div>`+
 niNote('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.');

/* ----- 3 · El camino recorrido ----- */
const NL_CA=[['Clase 1','Comprender las heridas','Qué es el niño interno, las cinco heridas y sus máscaras, la madre y el padre.',0],['Clase 2','El protocolo de limpieza','Niño Interno, Energías Discordantes, el Mapa, limpiar y verificar.',10],['Clase 3','El tiempo y las figuras','Anillo 1, escala de 0 a 100 y las doce figuras del anillo 4.',20],['Clase 4','La sesión completa','Antes, durante y después; comunicación, cuidado y evaluación.',29]];
RICH.nl4=()=>dkH('El camino recorrido','Cuatro clases, un camino','Toca una clase para volver a ella.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nl-path">${NL_CA.map((x,i)=>`<button data-les="${S.lesson[0]},${x[3]}" style="animation-delay:${i*.12}s"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span><em>${i<3?'Repasar':'Hoy'}</em></button>`).join('')}</div>
 ${niQ('Hoy todo se integra en una sesión completa con una consultante.')}</div>`;

/* ----- 4 · La sesión completa ----- */
const NL_MO=[['Antes','Unos 10 minutos',10,['Encuadre y consentimiento','Motivo de consulta','Oración de conexión'],'#e6dcf2','#3b2a5a'],['Durante','Unos 40 minutos',40,['Gráfico del Niño Interno','Energías Discordantes y Mapa','Limpiar y verificar'],'#3b4a24','#ece7d3'],['Después','Unos 10 minutos',10,['Comunicar la lectura y cerrar','Sugerir autocuidado','Registrar la ficha'],'#d6e8e2','#1f3f32']];
RICH.nl5=()=>{const s=st('nlmo',-1);
 return dkH('La sesión completa','La sesión completa en tres momentos','Una hora de sesión. Toca un momento en la barra.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nl-bar">${NL_MO.map((x,i)=>`<button ${rxa('set','nlmo',s===i?-1:i)} ${pressed(s===i)} style="flex:${x[2]};background:${x[4]};color:${x[5]}">${x[0]} · ${x[2]} min</button>`).join('')}</div>
 <div class="nl-mom">${NL_MO.map((x,i)=>`<div class="${s<0?'':s===i?'on':'off'}" style="background:${x[4]};color:${x[5]}"><h3>${x[0]}</h3><small>${x[1]}</small><ul>${x[3].map((y,j)=>`<li style="animation-delay:${j*.08}s">${y}</li>`).join('')}</ul></div>`).join('')}</div></div>`+
 niNote('Tiempos de referencia para una sesión de una hora.')};
RICH.nl6=()=>dkH('Momento 1','Antes: el encuadre','Marca cada paso a medida que lo haces.')+
 `<div class="ni nl-say"><div>${n3ck('nlan',[['persona','Presentarte y explicar en qué consiste el trabajo con el niño interno'],['escudo','Aclarar lo que no es: no reemplaza una terapia ni hace diagnósticos'],['candado','Explicar la confidencialidad de la sesión'],['check','Pedir el consentimiento de la persona para leer su gráfico'],['chat','Preguntar el motivo de consulta: qué le gustaría mirar hoy'],['loto','Abrir con la oración de conexión']],['Sigue el orden: el encuadre va antes de leer el gráfico.','¡Encuadre completo! Ya puedes empezar a leer el gráfico.'])}</div>
 <div class="nl-frase"><span class="ni-tag">Frase para empezar</span><p>«Vamos a mirar juntas lo que tu niño interno guarda. Lo que aparezca es una posibilidad que tú confirmas o descartas. ¿Estás de acuerdo en que comencemos?»</p></div></div>`;
const NL_DU=[['Paso 2','Gráfico del Niño Interno','Los cuatro anillos de adentro hacia afuera y la escala de 0 a 100.',14],['Paso 3','Energías Discordantes','La energía que acompaña a la herida.',15],['Paso 4','Limpiar o investigar','Limpiar directo o investigar la emoción en el Mapa.',16],['Paso 5','Verificar','Confirmar con el péndulo que la limpieza se completó.',17]];
RICH.nl7=()=>{const s=n3clamp(st('nldu',0),0,3),x=NL_DU[s];
 return dkH('Momento 2','Durante: el protocolo','Cuatro pasos. Toca uno para verlo o repasarlo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-proto" style="grid-template-columns:repeat(4,minmax(0,1fr))">${NL_DU.map((p,i)=>`<button class="${i===3?'new':''}" ${rxa('set','nldu',i)} ${pressed(i===s)} style="animation-delay:${i*.08}s"><small>${p[0]}</small><b>${p[1]}</b><span>${p[2]}</span></button>`).join('')}</div>
 <div class="nj-det"><div><span class="ni-tag">${x[0]}</span><br><b>${x[1]}</b><p>${x[2]}</p></div><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${x[3]}">Repasar en la Clase 2</button></div>
 ${niBox('l','Entre un gráfico y otro, pregunta a la persona qué le hace sentido.','La sesión es una conversación, no una lectura en voz alta.')}</div>`};

/* ----- 5 · Cómo comunicar la lectura ----- */
RICH.nl8=()=>dkH('Comunicación','Cómo comunicar la lectura','¿Se dice así o se evita? Lleva cada frase a su columna.')+
 niSort('nlco',[['«El gráfico muestra una posible herida de abandono. ¿Te hace sentido?»',0],['«Tu madre te abandonó.»',1],['«¿Qué recuerdas de esa etapa de tu vida?»',0],['«Esto te pasó, seguro.»',1],['«Tu niña aprendió a protegerse de esta forma.»',0],['«Tienes que perdonar ya.»',1],['«¿Qué necesitaba esa niña en ese momento?»',0],['«Con esta sesión se sana todo.»',1]],
 [['Decir así','',' t','Decir así'],['Evitar','','l','Evitar']],'Hablamos en hipótesis, sin culpar y sin prometer resultados.','Mira otra vez: ¿la frase habla en hipótesis o afirma, culpa o promete?');

/* ----- 6 · Cierre, señales de alerta y registro ----- */
RICH.nl9=()=>dkH('Momento 3','Después: cierre y acompañamiento','Marca cada paso a medida que lo haces.')+
 `<div class="ni nl-say"><div>${n3ck('nlde',[['chat','Resumir la lectura en una frase y preguntar cómo se siente'],['loto','Agradecer al comité espiritual y cerrar el espacio'],['corazon','Sugerir autocuidado: carta al niño interno, meditación, observar la máscara'],['libro','Registrar la ficha de sesión con iniciales'],['reloj','Acordar un seguimiento si la persona lo necesita']],['Cierra con calma, sin apurar.','¡Sesión cerrada con cuidado!'])}</div>
 <div class="nl-frase d"><span class="ni-tag">Frase para cerrar</span><p>«Hoy tu niño interno fue visto y escuchado. Date tiempo para integrar lo que apareció. ¿Cómo te sientes ahora?»</p></div></div>`;
const NL_DO=['Detener la lectura y no profundizar','Acompañar con calma y presencia','Sugerir la ayuda de un profesional de salud','Ante riesgo inmediato, contactar a los servicios de emergencia'];
RICH.nl10=()=>{const o=st('nlse',{}),on=Object.values(o).some(Boolean);
 return dkH('Cuidado','Señales de alerta y derivación','Marca una señal de alerta para ver qué hacer.')+
 `<div class="ni nl-alert"><div class="nj-card" style="background:#f6e2e8;color:#5a2a3a"><h3>Señales de alerta</h3>${n3ck('nlse',[['gota','Angustia intensa que no baja con el cierre'],['rayo','Recuerdos traumáticos que irrumpen con fuerza'],['xcirc','Ideas de hacerse daño'],['escudo','Relatos de abuso o violencia que ocurren hoy']])}</div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><h3>Qué hacer</h3><div class="nl-do${on?' on':''}">${NL_DO.map((x,i)=>`<div style="animation-delay:${i*.12}s"><span class="n">${i+1}</span><span>${x}</span></div>`).join('')}</div>${on?'':'<p style="margin:0;color:#dfe3cf;font-size:.86rem">Marca una señal a la izquierda.</p>'}</div></div>`+
 `<div class="ni">${niQ('Acompañar también es saber cuándo derivar.')}</div>`};
RICH.nl11=()=>{const d=new Date(),hoy=String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0');
 return dkH('Registro','Ficha de sesión completa','La ficha final de la especialización. El botón la llena con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:12px">${niFicha('nlf',['Fecha','Consultante','Motivo','Anillo 1 · escala','Quién','Herida · máscara','Energía · Mapa','Verificada','Autocuidado'],['Ej.: 04/11','M. R.','Miedo a quedarse sola','Meses','Madre','Abandono · Dependiente','Soledad · Desamparo','Sí','Carta al niño interno'],
 ()=>{const h=n3clamp(nigSel('he'),0,4);return [hoy,'','',nkEdad(),NIG[3].items[nigSel('qu')],`${NI_H[h].n} · ${NI_H[h].m}`,[njEdName(),njMapaTxt()].filter(Boolean).join(' · '),st('njl',0)>=5?'Sí':'','']},1080)}</div>`+
 niNote('Usa iniciales y registra solo lo necesario. La primera fila es un ejemplo ficticio.')};

/* ----- 7 · Demostración y evaluación práctica ----- */
RICH.nl12=()=>dkH('En vivo','Demostración en vivo','Observa la sesión completa y toma nota.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="nj-card l"><h3>Una sesión completa en vivo</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;line-height:1.5" class="ni-st"><li>Con una voluntaria del grupo y un tema liviano</li><li>Antes, durante y después, sin saltar pasos</li><li>Pausas breves para explicar cada decisión</li></ul></div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><h3>Mientras observas</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;line-height:1.5;color:#dfe3cf" class="ni-st"><li>Usa la pauta de evaluación <button class="btn btn-ghost btn-sm" data-slide="2" style="margin-left:6px;color:#ece7d3;border-color:#d9c9ef">Abrir la pauta</button></li><li>Anota una frase que quieras usar</li><li>Anota una pregunta para el final</li></ul></div></div>
 <div class="ni dk-grid c2">${n3area('nlnf','Una frase que quiero usar','«…»')}${n3area('nlnq','Una pregunta para el final','¿…?')}</div>`+n3priv;
const NL_RO=[['Consultante','Recibe la sesión','Trae un tema liviano y responde con honestidad.','l'],['Facilitadora','Realiza la sesión completa','Antes, durante y después, con la ficha.','t'],['Observadora','Evalúa con la pauta','Marca cada criterio y da una devolución amable.','b']];
RICH.nl13=()=>{const r=n3clamp(st('nlr',0),0,2),A=['Alumna A','Alumna B','Alumna C'];
 return dkH('Evaluación práctica','Evaluación práctica en tríos','Tres rondas: todas pasan por los tres roles. Toca una ronda para ver quién hace qué.')+
 `<div class="ni" style="display:grid;gap:14px">${chipRow('nlr',['Ronda 1','Ronda 2','Ronda 3'],r)}
 <div class="nl-role">${NL_RO.map((x,i)=>`<div class="nj-card ${x[3]}"><span class="ni-tag">${x[0]}</span><span class="who" style="animation-delay:${i*.1}s">${A[(i+r)%3]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div>
 ${niBox('d','Tres rondas','Cada ronda, unos 30 minutos de sesión y 5 de devolución.')}</div>`};
const NL_PA=[['Encuadre y consentimiento','Explica el trabajo, aclara lo que no es y pide consentimiento'],['Apertura','Abre con la oración de conexión'],['Lectura del gráfico','Lee los cuatro anillos y la escala con orden'],['Energías y Mapa','Encuentra la energía y, si corresponde, la emoción en el Mapa'],['Limpieza y verificación','Limpia y verifica antes de cerrar'],['Comunicación','Habla en hipótesis, sin culpar ni prometer'],['Cierre y registro','Cierra con cuidado, sugiere autocuidado y completa la ficha']];
RX.nlpa=(k,v)=>{const o=st('nlpa',{});o[k]=o[k]===+v?0:+v;render(false)};
RX.nlpr=()=>{delete RS.nlpa;render(false)};
RICH.nl14=()=>{const o=st('nlpa',{}),y=NL_PA.filter((_,i)=>o[i]===1).length,d=NL_PA.filter((_,i)=>o[i]===2).length;
 return dkH('Evaluación práctica','Pauta de evaluación','La observadora marca cada criterio durante la sesión.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="ni-tw"><table class="ni-tbl nl-pauta" style="min-width:640px"><thead><tr><th>Criterio</th><th>Qué se observa</th><th>Marca</th></tr></thead><tbody>
 ${NL_PA.map((x,i)=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td><div class="b"><button class="y" ${rxa('nlpa',i,1)} ${pressed(o[i]===1)}>Logrado</button><button class="d" ${rxa('nlpa',i,2)} ${pressed(o[i]===2)}>En desarrollo</button></div></td></tr>`).join('')}</tbody></table></div>
 <div class="prog"><span>${y} logrados · ${d} en desarrollo · ${7-y-d} sin marcar</span><div class="bar"><i style="width:${y/7*100}%"></i></div></div>
 ${y+d===7?`<div class="dk-call${d?' warn':''} ni-in">${d?'Hay criterios en desarrollo: dales una devolución amable y concreta para la próxima sesión.':'¡Todos los criterios logrados!'}</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('nlpr',0)}>Evaluar otra sesión</button></div>`:''}</div>`};

/* ----- 8 · Repaso y certificación ----- */
RICH.nl15=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('nlcp',[['escudo','1 · ¿Qué se aclara siempre en el encuadre, antes de leer el gráfico?','<b>En qué consiste el trabajo y lo que no es:</b> no reemplaza una terapia ni hace diagnósticos. Se explica la confidencialidad y se pide el consentimiento.'],['chat','2 · Elige una frase de «Evitar» y dila como hipótesis.','<b>Por ejemplo:</b> en lugar de «Tu madre te abandonó», «El gráfico muestra una posible herida de abandono vinculada a la madre. ¿Te hace sentido?»'],['enlace','3 · ¿Qué haces si aparece una señal de alerta?','<b>Detener la lectura y no profundizar,</b> acompañar con calma, sugerir un profesional de salud y, ante riesgo inmediato, contactar a los servicios de emergencia.']],'c4',260)}</div>`;
const NL_RQ=[['grupo','Asistencia','Participar en las cuatro clases de la especialización.'],['libro','Tareas','Entregar la carta al niño interno y las fichas de las clases 2 y 3.'],['ojo','Sesiones','Registrar al menos tres sesiones completas con su ficha.'],['check','Evaluación práctica','Aprobar la sesión observada en tríos según la pauta.']];
RICH.nl16=()=>{const o=st('nlrq',{}),n=NL_RQ.filter((_,i)=>o[i]).length;
 return dkH('Certificación','Requisitos para la certificación','Marca los que ya cumples.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="nl-req">${NL_RQ.map((x,i)=>`<button ${rxa('tog','nlrq',i)} ${pressed(!!o[i])} style="animation-delay:${i*.08}s"><i>${o[i]?'✓':''}</i><div><b>${x[1]}</b><span>${x[2]}</span></div></button>`).join('')}</div>
 <div class="prog"><span>${n} de 4</span><div class="bar"><i style="width:${n/4*100}%"></i></div></div>
 ${n===4?niQ('¡Cumples los cuatro requisitos para tu certificación en Niño Interno!'):''}</div>`};

/* ----- 9 · Oración de agradecimiento y cierre ----- */
const NL_OR=['Amado Yo Superior, ángeles, arcángeles, seres de luz, todo mi comité espiritual: gracias por acompañarnos en este camino.','Gracias por cada herida reconocida, por cada niña y cada niño interior que fue visto, escuchado, abrazado.','Que lo aprendido se convierta en servicio, con humildad, respeto y amor.','Que cada sesión sea para el mayor bien de quien llega a nosotras.','Gracias, gracias, gracias.'];
RICH.nl17=()=>dkH('Cierre de la especialización','Oración de agradecimiento','La decimos juntas para cerrar el camino.')+`<div class="ni">${n3pray('nlor',NL_OR)}</div>`;
RICH.nl18=()=>`<div class="ni">${nbHero('Especialización Niño Interno','Gracias por','este camino','Sigue practicando, registra tus sesiones y acompáñate como acompañas a otras.',['Clase 1','Clase 2','Clase 3','Clase 4'],'Karen Oyarce · Maestra Holística',nlPhoto('Una mujer y una niña caminan de la mano por un sendero iluminado por el sol'))}</div>`;

/* ---------- Nivel 4 · Formación Transgeneracional · Clase 1 ---------- */
(function(){const c=document.createElement('style');c.id='tg-css';c.textContent=`
.tgx{--tg-m:#f6d3ef;--tg-m2:#b0589a;--tg-p:#c9c9f5;--tg-p2:#5a5ab0}
.tg-st4{grid-template-columns:repeat(2,minmax(0,1fr))!important}@media (max-width:760px){.tg-st4{grid-template-columns:1fr!important}}
.tg-tree{width:100%;height:auto;display:block;overflow:visible}
.tg-tree .nd{cursor:pointer;outline:none}
.tg-tree .nd circle{stroke:#fff;stroke-width:2;transition:transform .3s;transform-box:fill-box;transform-origin:50% 50%}
.tg-tree .nd:hover circle,.tg-tree .nd:focus-visible circle{transform:scale(1.12)}
.tg-tree .nd.on circle{stroke:#3b4a24;stroke-width:3}
.tg-tree .nd.new{animation:niPop .5s both}
.tg-tree .dim{opacity:.25}
.tg-tree text{font-family:var(--f-body,system-ui);text-anchor:middle;fill:#3b4a24}
.tg-tree .rl{text-anchor:start;font:600 10px var(--f-body,system-ui);fill:#5d6b55}
.tg-tree line{stroke:#b9ad84;stroke-width:1.2}
.tg-sum{display:flex;justify-content:center;gap:8px;align-items:center;flex-wrap:wrap;font:400 1.2rem/1 var(--f-display);color:var(--ni-lil2)}
.tg-sum span{animation:niPop .4s both}
.tg-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.tg-two>.m{background:var(--tg-m);color:#5a2350}.tg-two>.p{background:var(--tg-p);color:#2a2a6a}
.tg-flow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.tg-flow>button{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:grid;gap:6px;align-content:start;padding:16px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);opacity:.4;transition:opacity .4s,transform .4s}
.tg-flow>button.lit{opacity:1}.tg-flow>button.cur{transform:translateY(-5px);border-color:var(--ni-lil2)}
.tg-flow>button:last-child.lit{background:var(--ni-lil)}
.tg-flow small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.tg-flow b{font:400 1.2rem/1.2 var(--f-display)}.tg-flow span{font-size:.88rem;line-height:1.45;color:var(--nb-soft)}
.tg-flow>button:not(:last-child)::after{content:"";position:absolute;right:-14px;top:50%;border:6px solid transparent;border-left:9px solid var(--ni-lil2);margin-top:-6px}
.tg-law{display:grid;gap:8px}
.tg-law>div{display:grid;grid-template-columns:minmax(110px,.6fr) 40px minmax(110px,.6fr) minmax(0,1.5fr) minmax(0,1fr);gap:10px;align-items:center;padding:12px 14px;border-radius:14px;background:var(--nb-paper);border:1px solid var(--nb-line)}
.tg-law b{font-weight:600}.tg-law .ar{color:var(--ni-lil2);font-size:1.3rem;text-align:center;animation:njArr 1.6s ease-in-out infinite}
.tg-law .c{color:var(--ni-lil2);font-weight:600;animation:niPop .4s both}
.tg-law span{font-size:.86rem;line-height:1.45;color:var(--nb-ink);animation:niUp .4s both}
.tg-law small{font-size:.78rem;color:var(--nb-soft);animation:niUp .4s .1s both}
.tg-gen{display:grid;gap:6px}
.tg-gen button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:1fr 1fr;padding:10px 14px;border-radius:10px;border:1px solid var(--nb-line);background:var(--nb-paper);font-size:.9rem;color:var(--nb-ink)}
.tg-gen button b{font-weight:600}
.tg-gen button[aria-pressed="true"]{background:#e5edd6;border-color:#5c7a32}
.tg-meter{height:14px;border-radius:14px;background:var(--nb-line);overflow:hidden}
.tg-meter i{display:block;height:100%;border-radius:14px;background:linear-gradient(90deg,#e6dcf2,#7a5aa6);transition:width .6s cubic-bezier(.3,.7,.2,1)}
.tg-groups{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.tg-groups button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:4px;align-content:start;padding:12px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);transition:transform .25s;animation:niUp .4s both}
.tg-groups button b{font-weight:600;font-size:.88rem}.tg-groups button span{font-size:.76rem;line-height:1.4;color:var(--nb-soft)}
.tg-groups button[aria-pressed="true"]{background:var(--ni-lil);border-color:var(--ni-lil2);transform:translateY(-3px)}
.tg-groups button.x{background:var(--ni-olv);color:#ece7d3;cursor:default}.tg-groups button.x span{color:#dfe3cf}
.tg-pr{font-size:.8rem;line-height:1.5;color:var(--nb-soft);text-align:center;font-style:italic;max-width:70ch;margin:0 auto}
@media (max-width:760px){.tg-two,.tg-flow{grid-template-columns:1fr}.tg-flow>button{opacity:1}.tg-flow>button::after{display:none}.tg-law>div{grid-template-columns:1fr 30px 1fr}.tg-law span,.tg-law small{grid-column:1/-1}.tg-groups{grid-template-columns:1fr 1fr}}
`;document.head.appendChild(c)})();

/* el árbol de cuatro generaciones: 15 personas, la rama materna a la izquierda */
const TG_X=[340,225,455,168,282,398,512];for(let i=0;i<8;i++)TG_X.push(110+i*65.7);
const TG_GEN=i=>i===0?0:i<3?1:i<7?2:3,TG_SIDE=i=>i===0?'':[1,3,4,7,8,9,10].includes(i)?'m':'p';
const TG_PAR=i=>i===0?[1,2]:i<3?[i*2+1,i*2+2]:i<7?[7+(i-3)*2,8+(i-3)*2]:null;
const TG_LB=(()=>{const L=['Yo','Madre','Padre','Abuela materna','Abuelo materno','Abuela paterna','Abuelo paterno'];
 for(let a=3;a<7;a++){const s=a<5?'materna':'paterna',so=a<5?'materno':'paterno';L.push(`Bisabuela ${s} · madre de tu ${L[a].toLowerCase()}`,`Bisabuelo ${so} · padre de tu ${L[a].toLowerCase()}`)}return L})();
const TG_SH=i=>i===0?'Yo':i<3?TG_LB[i]:i<7?TG_LB[i].split(' ')[0]:i%2?'Bisabuela':'Bisabuelo';
const tgTree=o=>{o=o||{};const Y=[262,190,115,40],R=[24,20,18,16],rv=o.rv===undefined?3:o.rv;let g='';
 ['Yo','Padres','Abuelos','Bisabuelos'].forEach((t,k)=>{if(k<=rv)g+=`<text class="rl${o.hg!==undefined&&o.hg!==k?' dim':''}" x="0" y="${Y[k]+4}">${t}</text>`});
 for(let i=0;i<15;i++){const P=TG_PAR(i);if(P&&TG_GEN(i)+1<=rv)P.forEach(p=>{g+=`<line x1="${TG_X[i]}" y1="${Y[TG_GEN(i)]}" x2="${TG_X[p]}" y2="${Y[TG_GEN(p)]}"/>`})}
 for(let i=0;i<15;i++){const k=TG_GEN(i);if(k>rv)continue;const s=TG_SIDE(i),dim=(o.hs&&s&&s!==o.hs)||(o.hg!==undefined&&o.hg!==k),nm=st('tan'+i,'');
  g+=`<g class="nd${o.sel===i?' on':''}${dim?' dim':''}${k===rv&&o.anim?' new':''}" ${o.act?`${rxa(o.act,i)} role="button" tabindex="0" aria-label="${TG_LB[i]}"`:''} style="animation-delay:${(i%8)*.05}s"><circle cx="${TG_X[i]}" cy="${Y[k]}" r="${R[k]}" fill="${s==='m'?'#f6d3ef':s==='p'?'#c9c9f5':'#1f3f32'}"/>${i===0?`<text x="${TG_X[i]}" y="${Y[k]+4}" style="fill:#ece7d3;font-size:10px;font-weight:600">Yo</text>`:''}<text x="${TG_X[i]}" y="${Y[k]+R[k]+11}" style="font-size:${k===3?7.5:9}px">${esc(nm?nm.slice(0,12):i===0?'':TG_SH(i))}</text></g>`}
 return `<svg class="tg-tree" viewBox="0 0 600 300" role="group" aria-label="Árbol de cuatro generaciones">${g}</svg>`};
RX.tgn=k=>{RS.tgn=RS.tgn===+k?-1:+k;render(false)};

/* el gráfico de Constelación Familiar, interactivo */
const TG_T=['Ser hijo\nbastón','Excluidos\nen el árbol','Herencias','Muertes\ntempranas','Abortos o\nabusos','Abundancia /\ndinero','Divorcios /\nseparaciones','Éxitos','Heredero\nuniversal','Problemas con\nla familia','Migración','Yacente','Guerras','Bloqueos con\nla madre','Bloqueos con\nel padre','Repetición de\npatrones','Doble','Lealtades\ninconscientes','Lealtades\nconscientes','Roles\ncambiados','Recuperar mi\nlugar en el clan','Enfermedades (de-\npresiones / adicciones)','Vínculos\ndisfuncionales','Cargas\nemocionales','Votos\n(ir al gráfico)','Transgeneracional\n(ir al gráfico)'];
const tgT=i=>TG_T[i].replace(/-\n/,'').replace(/\n/g,' ').replace(' (ir al gráfico)','');
const TG_G=['1era Generación','2da Generación','3era Generación','4ta Generación'],TG_GQ=['Yo','Padres','Abuelos','Bisabuelos'],TG_L=['Materno','Paterno'];
RX.tgc=(k,v)=>{const K='tg'+k;RS[K]=RS[K]===+v?-1:+v;render(false)};
const tgChart=o=>{o=o||{};return niFan({label:'Gráfico de Constelación Familiar',act:'tgc',inner:50,sel:(k,i)=>st('tg'+k,-1)===i,
 hot:o.ring||o.hot?(k,i,t)=>o.ring?(k===o.ring?0:-1):(k==='t'?(o.hot.includes(i)?1:-1):0):0,
 rings:[{k:'l',r0:62,r1:118,items:[{t:'Linaje\nMaterno',c:'#f6d3ef',on:'#b0589a'},{t:'Linaje\nPaterno',c:'#c9c9f5',on:'#5a5ab0'}],m:'tan',fs:11},
  {k:'t',r0:118,r1:238,items:TG_T,fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:7.6},
  {k:'g',r0:238,r1:260,items:TG_G,fill:'#eef4dc',on:'#5c7a32',m:'tan',fs:9.5},
  {k:'e',r0:260,r1:280,items:Array.from({length:21},(_,i)=>String(i*5)),fill:'#efe4f3',on:'#7a5aa6',m:'tan',fs:7.5}],cap:o.cap===0?'':o.cap||'Toca el linaje, el tema, la generación y la escala.'})};
const tgSel=()=>({l:st('tgl',-1),t:st('tgt',-1),g:st('tgg',-1),e:st('tge',-1)});
const tgRead=()=>{const s=tgSel();return [s.l>=0?TG_L[s.l]:'',s.g>=0?`${TG_G[s.g].split(' ')[0]} · ${TG_GQ[s.g].toLowerCase()}`:'',s.e>=0?String(s.e*5):'',s.t>=0?tgT(s.t):'']};
const tgReadRow=()=>{const r=tgRead();return `<div class="ni-read ni-st">${['Linaje','Generación','Escala','Tema'].map((x,i)=>`<div><small>Paso ${i+1} · ${x}</small><span>${r[i]||'—'}</span></div>`).join('')}</div>`};
const TG_PRAY='Pido a mi Yo Superior, maestros ascendidos y seres de luz de la más alta vibración, que por favor limpien todo mi linaje ancestral, que corten todos los votos y energías negativas del pasado que ya no sirvan para el desarrollo y evolución de mi Alma en tiempo presente. Hoy reconozco, limpio, sano, libero y agradezco a todos mis ancestros por las experiencias del pasado. Hoy yo ………… con plena consciencia creo mi propia historia. Gracias, gracias, gracias.';

/* ----- 1 · Bienvenida y agenda ----- */
RICH.ta1=()=>`<div class="ni tgx">${nbHero('Formación Transgeneracional · Clase 1','El árbol','y el clan','Lo que pasa de una generación a otra: el árbol de cuatro generaciones, los dos linajes, las leyes del clan y el gráfico de Constelación Familiar.',['Árbol','Linajes','Leyes del clan','Constelación'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="${N4P}trans/c1-portada.webp" alt="Una abuela, una madre y una niña, de espaldas, apoyan las manos en el tronco de un árbol enorme"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#f6d3ef" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#c9c9f5" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3b4a24"/></svg></div>`)}</div>`;
RICH.ta2=()=>niAgenda('Clase 1',['Del niño interno al clan','Qué es lo transgeneracional y cómo se transmite','El árbol y los dos linajes','Las leyes del clan','Los tres gráficos de la formación','El gráfico de Constelación Familiar','Práctica en parejas','Honrar, repaso y tarea'],
 ['Explicar qué es lo transgeneracional','Dibujar tu árbol de cuatro generaciones','Reconocer las tres leyes del clan','Leer el gráfico de Constelación: linaje, generación, escala y tema']);

/* ----- 2 · Del niño interno al clan ----- */
RICH.ta3=()=>{const v=st('ta3v',0),h=nigSel('he');
 return dkH('Lo que traemos de antes de nacer','Del niño interno al clan','Toca cada lado para verlo.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:stretch">
 <button class="nj-card ${v===0?'l':''}" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;border:1px solid var(--nb-line);${v===0?'background:var(--nb-paper);box-shadow:0 0 0 2px var(--ni-lil2)':'background:var(--nb-paper)'}" ${rxa('set','ta3v',0)}><span class="ni-tag">Niño interno</span><h3 style="margin:0;font:400 1.4rem/1.2 var(--f-display)">Lo que viví</h3><p style="margin:0;line-height:1.5;color:var(--nb-soft)">Las heridas de mi infancia, la madre y el padre que tuve, las máscaras que aprendí para protegerme.</p></button>
 <button style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;background:var(--ni-olv);color:#ece7d3;${v===1?'box-shadow:0 0 0 2px var(--ni-lil2)':''}" ${rxa('set','ta3v',1)}><span class="ni-tag" style="color:#d9c9ef">Transgeneracional</span><h3 style="margin:0;font:400 1.4rem/1.2 var(--f-display);color:#fff">Lo que heredé</h3><p style="margin:0;line-height:1.5;color:#dfe3cf">Las memorias de mis padres, abuelos y bisabuelos: lo que vivieron, callaron o no pudieron resolver.</p></button></div>
 <div style="max-width:560px;width:100%;justify-self:center">${tgTree({hg:v===0?0:undefined,rv:3})}</div>
 ${niQ('Muchas heridas de la infancia repiten una historia que empezó antes que nosotras.')}
 ${niBox('l','Pregunta al grupo','¿Qué herida de tu gráfico del niño interno crees que también vivió tu madre o tu padre? En tu gráfico marcaste la herida de '+NI_H[n3clamp(h,0,4)].n.toLowerCase()+'.')}</div>`};

/* ----- 3 · Qué es lo transgeneracional ----- */
const TG_HR=[['Se hereda','Llega con la vida, junto con el apellido, los gestos y las costumbres.'],['Se repite','Aparece otra vez en fechas, nombres, uniones, pérdidas o enfermedades.'],['Se puede sanar','Al reconocerlo y limpiarlo, deja de pasar a la siguiente generación.']];
RICH.ta4=()=>{const s=n3clamp(st('ta4s',0),0,2);
 return dkH('Lo transgeneracional','¿Qué es lo transgeneracional?','Avanza por los tres movimientos.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="ni-hyp"><p>Es lo que pasa de una generación a otra sin que nadie lo decida: emociones, creencias, miedos, lealtades y memorias de lo que vivieron nuestros ancestros.</p></div>
 <div class="tg-flow">${TG_HR.map((x,i)=>`<button class="${i<=s?'lit':''} ${i===s?'cur':''}" ${rxa('set','ta4s',i)}><small>${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${s<2?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','ta4s',s+1)}>Siguiente</button></div>`:''}
 ${niBox('l','Pregunta al grupo','¿Qué frase o costumbre se repite en tu familia desde siempre?')}${n3area('ta4a','Anota la tuya','En mi familia siempre se dice…')}</div>`};
RICH.ta5=()=>dkH('Lo transgeneracional','Cómo se transmite una memoria','Tres caminos. Toca cada tarjeta.')+
 `<div class="ni tgx" style="display:grid;gap:14px">${n3flip('ta5',[['candado','Lo no dicho · Secretos','Lo que se calló o se escondió: un hijo no reconocido, una unión oculta, una muerte de la que no se habla.'],['gota','Lo no resuelto · Duelos y deudas','Pérdidas que no se lloraron, injusticias sin reparar, deudas emocionales o materiales.'],['persona','Lo excluido · Personas olvidadas','Alguien que fue rechazado, borrado o al que no se nombra en la familia.']],'c3',190)}
 <div class="ni-hyp"><p>Lo que una generación no puede mirar, la siguiente lo vive.</p></div></div>`;

/* ----- 4 · El árbol y los dos linajes ----- */
RICH.ta6=()=>{const rv=n3clamp(st('tarv',0),0,3),s=st('tgn',-1),N=[1,2,4,8];
 return dkH('El árbol','El árbol de cuatro generaciones','Construye el árbol generación por generación. Toca a una persona para anotar su nombre.')+
 `<div class="ni tgx" style="display:grid;gap:12px"><div style="max-width:720px;width:100%;justify-self:center">${tgTree({rv,act:'tgn',sel:s,anim:1})}</div>
 <div class="tg-sum">${N.slice(0,rv+1).map((n,i)=>`<span style="animation-delay:${i*.05}s">${i?'+ ':''}${n}</span>`).join('')}<span>= ${N.slice(0,rv+1).reduce((a,b)=>a+b,0)} ${rv===0?'persona':'personas'}</span></div>
 ${rv<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','tarv',rv+1)}>Agregar ${['','los padres','los abuelos','los bisabuelos'][rv+1]}</button></div>`:''}
 ${s>=0&&TG_GEN(s)<=rv?`<div class="nj-det ni-in" style="background:${TG_SIDE(s)==='m'?'#f6d3ef':TG_SIDE(s)==='p'?'#c9c9f5':'var(--ni-tea)'}"><div><span class="ni-tag">${['1era','2da','3era','4ta'][TG_GEN(s)]} generación${TG_SIDE(s)?' · linaje '+(TG_SIDE(s)==='m'?'materno':'paterno'):''}</span><br><b>${TG_LB[s]}</b><p><input type="text" data-rsin="tan${s}" placeholder="Escribe su nombre" value="${esc(st('tan'+s,''))}" style="all:unset;box-sizing:border-box;width:100%;border-bottom:1px dashed currentColor;padding:4px 0;font:400 1rem var(--f-display)"></p></div></div>`:''}
 ${niNote('Rosado: linaje materno · Lila: linaje paterno. Lo que anotes queda solo en tu sesión.')}</div>`};
RICH.ta7=()=>{const s=st('ta7',-1);
 return dkH('Los dos linajes','Linaje materno y linaje paterno','Toca un linaje para verlo en el árbol.')+
 `<div class="ni tgx" style="display:grid;gap:12px"><div class="tg-two">${[['m','Linaje materno','La rama de mi madre','Mi madre, mis abuelos maternos y mis bisabuelos maternos. Lo que pasa de mujer a mujer suele verse con fuerza aquí.'],['p','Linaje paterno','La rama de mi padre','Mi padre, mis abuelos paternos y mis bisabuelos paternos. Aunque no conozca a mi padre, su linaje también es mío.']].map((x,i)=>`<button class="nj-card ${x[0]}" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;background:${i?'#c9c9f5':'#f6d3ef'};color:${i?'#2a2a6a':'#5a2350'};${s===i?'box-shadow:0 0 0 3px '+(i?'#5a5ab0':'#b0589a'):''}" ${rxa('set','ta7',s===i?-1:i)} ${pressed(s===i)}><span class="ni-tag" style="color:inherit;opacity:.8">${x[1]}</span><h3 style="margin:0;font:400 1.3rem/1.2 var(--f-display)">${x[2]}</h3><p style="margin:0;line-height:1.5">${x[3]}</p></button>`).join('')}</div>
 <div style="max-width:620px;width:100%;justify-self:center">${tgTree({hs:s===0?'m':s===1?'p':''})}</div>
 ${niQ('Las dos raíces cuentan por igual: nadie puede elegir uno solo de sus linajes.')}</div>`};

/* ----- 5 · Las leyes del clan ----- */
const TG_LY=[['grupo','Pertenencia','Todos los miembros tienen derecho a pertenecer: los que murieron, los que se fueron, los que no nacieron.','Exclusión','Alguien de una generación siguiente repite el destino del excluido.','Excluidos en el árbol',[1]],['camino','Orden','Quienes llegaron antes tienen su lugar primero. Los padres dan y los hijos reciben.','Desorden','Hijos que cuidan a sus padres o toman un lugar que no les corresponde.','Roles cambiados · Hijo bastón',[19,0]],['balanza','Equilibrio','Entre dar y recibir. Lo que se toma se devuelve, y lo que se da se reconoce.','Deudas','Alguien paga lo que otro no pagó: dinero, culpa o reparación.','Cargas emocionales',[23]]];
RICH.ta8=()=>{const q=st('ta8q',-1);
 return dkH('Las leyes del clan','Las tres leyes del clan','Toca cada ley.')+
 `<div class="ni tgx" style="display:grid;gap:14px">${n3sel('ta8',TG_LY.map((x,i)=>[x[0],'Ley '+(i+1)+' · '+x[1],x[2]]),{eb:'Ley',nav:1})}
 <div class="nj-card l"><span class="ni-tag">Pregunta al grupo</span><p style="opacity:1;font-size:.95rem">¿Cuál de estas tres leyes sientes más presente en tu familia?</p>${chipRow('ta8q',TG_LY.map(x=>x[1]),q)}</div></div>`};
RICH.ta9=()=>{const o=st('ta9',{}),n=Object.values(o).filter(Boolean).length;
 return dkH('Las leyes del clan','Qué pasa cuando una ley se rompe','Toca «Romper» en cada ley para ver qué aparece y dónde se ve en el gráfico.')+
 `<div class="ni tgx tg-law">${TG_LY.map((x,i)=>`<div><b>${x[1]}</b>${o[i]?`<span class="ar" aria-hidden="true">➜</span><span class="c">${x[3]}</span><span>${x[4]}</span><small><b>En el gráfico:</b> ${x[5]}</small>`:`<span></span><button class="btn btn-ghost btn-sm" ${rxa('tog','ta9',i)} style="justify-self:start">Romper</button><span></span><span></span>`}</div>`).join('')}</div>
 ${n===3?`<div class="ni" style="display:grid;gap:10px"><div style="max-width:640px;width:100%;justify-self:center">${tgChart({hot:[1,19,0,23],cap:'Estos temas aparecen en el gráfico de Constelación Familiar.'})}</div></div>`:''}`};

/* ----- 6 · Los tres gráficos ----- */
RICH.ta10=()=>dkH('La formación','Los tres gráficos de la formación','Una puerta de entrada y dos gráficos para profundizar.')+
 `<div class="ni tgx" style="display:grid;gap:12px"><div class="nj-three ni-st"><div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><span class="ni-tag" style="color:#d9c9ef">Clases 1 y 2</span><h3 style="color:#fff">Constelación Familiar</h3><p style="color:#dfe3cf">La puerta de entrada: muestra el linaje, la generación y el tema.</p><div><button class="btn btn-ghost btn-sm" style="color:#ece7d3;border-color:#d9c9ef" data-les="${S.lesson[0]},${S.lesson[1]+1}">Verlo ahora</button></div></div>
 <div class="nj-card" style="background:var(--nb-paper);border:1px solid var(--nb-line)"><span class="ni-tag">Clase 3</span><h3>Transgeneracional</h3><p>Las memorias del linaje: lo oculto, las uniones, las pérdidas y la historia colectiva.</p></div>
 <div class="nj-card" style="background:var(--nb-paper);border:1px solid var(--nb-line)"><span class="ni-tag">Clase 3</span><h3>Votos o Pactos</h3><p>Los votos y pactos heredados, su nivel y cómo anularlos.</p></div></div>
 <div class="nj-det"><div><span class="ni-tag">También usamos</span><p>Energías Discordantes para limpiar directo y el Mapa de Emociones para investigar, como ya aprendiste en Niño interior.</p></div><div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="0,15">Energías</button><button class="btn btn-ghost btn-sm" data-les="0,16">Mapa</button></div></div></div>`;

/* ----- 7 · El gráfico de Constelación Familiar ----- */
RICH.ta11=()=>dkH('Constelación Familiar','El gráfico de Constelación Familiar','Explóralo: toca el linaje, un tema, la generación y la escala.')+
 `<div class="ni tgx nj-two"><div class="nj-fig">${niOrig('ta11O','trans/constelacion.webp','Lámina original del gráfico de Constelación Familiar de Casa Muladhara',tgChart())}</div>${tgReadRow()}
 <p class="tg-pr">${TG_PRAY}</p></div>`;
RICH.ta12=()=>{const l=st('tgl',-1);
 return dkH('Paso 1','El centro: ¿de qué linaje viene?','Toca un linaje en el centro del gráfico o aquí.')+
 `<div class="ni tgx nj-two"><div class="nj-fig">${tgChart({ring:'l',cap:0})}</div>
 <div class="tg-two">${[['Linaje materno','La memoria viene de la rama de la madre.'],['Linaje paterno','La memoria viene de la rama del padre.']].map((x,i)=>`<button style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;padding:16px;display:grid;gap:6px;background:${i?'#c9c9f5':'#f6d3ef'};color:${i?'#2a2a6a':'#5a2350'};${l===i?'box-shadow:0 0 0 3px '+(i?'#5a5ab0':'#b0589a'):''}" ${rxa('tgc','l',i)} ${pressed(l===i)}><b style="font:400 1.2rem/1.2 var(--f-display)">${x[0]}</b><span style="font-size:.9rem">${x[1]}</span></button>`).join('')}</div>
 ${niQ('Siempre se mide primero el linaje: ordena todo lo que viene después.')}</div>`};
RICH.ta13=()=>{const g=st('tgg',-1),e=st('tge',-1);
 return dkH('Pasos 2 y 3','Las cuatro generaciones y la escala','Toca una generación y después la intensidad en la escala.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:center"><div class="tg-gen">${TG_G.map((x,i)=>`<button ${rxa('tgc','g',i)} ${pressed(g===i)}><b>${x}</b><span>${TG_GQ[i]}</span></button>`).join('')}</div>
 <div>${tgTree({hg:g>=0?g:undefined})}</div></div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><span class="ni-tag" style="color:#d9c9ef">Escala de 0 a 100</span><p style="color:#dfe3cf;font-size:.92rem">Indica con qué intensidad la memoria está presente hoy en tu vida. Mientras más alto el número, más pesa.</p>
 <div class="dk-chips">${Array.from({length:11},(_,i)=>`<button class="chip" ${rxa('tgc','e',i*2)} ${pressed(e===i*2)}>${i*10}</button>`).join('')}</div>
 <div class="tg-meter" aria-hidden="true"><i style="width:${e<0?0:e*5}%"></i></div>${e>=0?`<b class="ni-in" style="font:400 1.1rem var(--f-display);color:#fff">${e*5} · ${e*5<35?'pesa poco':e*5<70?'pesa bastante':'pesa mucho'}</b>`:''}</div>
 <div style="max-width:680px;width:100%;justify-self:center">${tgChart({ring:g<0?'g':'e',cap:'También puedes marcarlo en el gráfico.'})}</div></div>`};
const TG_GR=[['El lugar en el clan',[0,19,1,20,11,16,8]],['Lealtades y patrones',[18,17,15,9]],['Madre y padre',[13,14]],['Pérdidas y rupturas',[3,4,6,10,12]],['Lo material',[2,5,7]],['Lo que se carga',[21,22,23]],['Ir a otro gráfico',[24,25]]];
RICH.ta14=()=>{const s=st('ta14',-1),t=st('tgt',-1);
 return dkH('Paso 4','Los temas del gráfico','26 temas en siete grupos. Toca un grupo para encontrarlo en el gráfico.')+
 `<div class="ni tgx nj-two"><div class="nj-fig">${tgChart({hot:s>=0?TG_GR[s][1]:null,ring:s<0?'t':null,cap:0})}</div>
 <div class="tg-groups">${TG_GR.map((x,i)=>`<button ${rxa('set','ta14',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.04}s"><b>${x[0]}</b><span>${x[1].map(tgT).join(' · ')}</span></button>`).join('')}<button class="x"><b>26 temas</b><span>En la Clase 2 los miramos uno a uno.</span></button></div>
 ${t>=0?`<div class="nj-det ni-in"><div><span class="ni-tag">Tema marcado</span><br><b>${tgT(t)}</b></div></div>`:''}</div>`};
RICH.ta15=()=>{const r=tgRead();
 return dkH('Lectura','Cómo se lee el gráfico','Siempre en el mismo orden. Abajo aparece lo que marcaste en el gráfico.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nj-flow">${[['Linaje','Materno o paterno, en el centro.'],['Generación','De la 1era a la 4ta.'],['Escala','De 0 a 100: cuánto pesa hoy.'],['Tema','Cuál de los 26 temas está activo.']].map((x,i)=>`<div class="lit" style="animation:niUp .45s ${i*.1}s both"><small>Paso ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span><span style="font:400 1rem var(--f-display);color:${i===3?'#f2c66d':'var(--ni-lil2)'}">${r[i]||'—'}</span></div>`).join('')}</div>
 ${r.every(Boolean)?`<div class="ni-hyp ni-in"><span class="ni-tag">Tu lectura</span><p>Linaje <mark>${r[0].toLowerCase()}</mark>, <mark>${r[1]}</mark>, con una intensidad de <mark>${r[2]}</mark>: el tema activo es <mark>${r[3].toLowerCase()}</mark>.</p></div>`:`<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" data-slide="0">Marcar en el gráfico</button></div>`}
 ${niBox('l','Después','Limpiar directo con Energías Discordantes o investigar en el Mapa o el Transgeneracional. Lo veremos en la Clase 2.')}</div>`};
RX.tgex=()=>{RS.tgl=0;RS.tgg=2;RS.tge=14;RS.tgt=6;goSlide('0')};
const TG_EJ=[['Linaje','Materno'],['Generación','3era · abuelos'],['Escala','70'],['Tema','Divorcios / separaciones']];
RICH.ta16=()=>{const s=n3clamp(st('ta16',0),0,4);
 return dkH('Ejemplo','Ejemplo de lectura','Consultante: M. R., sus relaciones de pareja terminan siempre en separación.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nj-flow">${TG_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<4?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','ta16',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>La abuela materna vivió una separación de la que no se habló. Por lealtad, la nieta repite esa historia en sus parejas.</p></div>
 <div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('tgex',0)}>Verlo en el gráfico</button><button class="btn btn-ghost btn-sm" ${rxa('set','ta16',0)}>Ver de nuevo</button></div>`}</div>`+niNote('Ejemplo ficticio.')};

/* ----- 8 · Práctica en parejas ----- */
const TG_PS=[['Dibuja tu árbol','Con lo que sabes hoy: nombres y lo que conozcas de cada persona.'],['Tu pareja lee','Linaje, generación, escala y tema en el gráfico de Constelación.'],['Conversen','¿Qué sabes de esa generación y de ese tema en tu familia?'],['Cambien de rol','La otra persona dibuja su árbol y recibe la lectura.']];
RICH.ta17=()=>{const s=n3clamp(st('ta17',0),0,3);
 return dkH('Práctica en parejas','Práctica en parejas','Cuatro pasos. Anota en tu ficha lo que aparece.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${TG_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','ta17',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','ta17',s+1)}>Siguiente paso</button></div>`:''}
 ${niFicha('taf',['Persona','Linaje','Generación','Escala','Tema','Lo que sabes de esa historia'],['Ej.: M. R.','Materno','3era · abuelos','70','Divorcios / separaciones','La abuela se separó y nadie habla de eso'],()=>['',...tgRead(),''])}</div>`+n3priv};

/* ----- 9 · Honrar, repaso y tarea ----- */
RICH.ta18=()=>dkH('Honrar a los ancestros','Comprender sin juzgar','Lo decimos frase a frase.')+`<div class="ni">${n3pray('taho',['Miramos la historia para comprenderla, no para buscar culpables.','Cada ancestro hizo lo que pudo con lo que tenía y con lo que sabía.','Tomo la vida que llegó a través de ellos y la agradezco.','Lo que no me pertenece, lo reconozco y lo libero.'])}</div>`;
RICH.ta19=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('tacp',[['nino','1 · ¿Qué diferencia hay entre lo que trabaja el niño interno y lo transgeneracional?','<b>El niño interno trabaja lo que viví:</b> las heridas de mi infancia. <b>Lo transgeneracional, lo que heredé:</b> las memorias de padres, abuelos y bisabuelos.'],['grupo','2 · ¿Cuáles son las tres leyes del clan y qué pasa cuando se rompe la pertenencia?','<b>Pertenencia, orden y equilibrio.</b> Si se rompe la pertenencia hay exclusión: alguien de una generación siguiente repite el destino del excluido.'],['camino','3 · ¿En qué orden se lee el gráfico de Constelación Familiar?','<b>Linaje, generación, escala y tema.</b> Siempre se mide primero el linaje.']],'c4',260)}</div>`;
RICH.ta20=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Tu árbol de cuatro generaciones.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('tata',[['grupo','Nombres de las 15 personas y nombres que se repiten'],['reloj','Fechas de nacimiento y de muerte que conozcas'],['casa','Oficios y lugares donde vivieron'],['camino','Sucesos importantes: migraciones, pérdidas, uniones, separaciones'],['chat','Lo que nadie sabe o no se cuenta: anótalo como pregunta']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu árbol a la Clase 2.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Pregunta a tu familia lo que no sabes, con delicadeza y sin forzar. Trae tu árbol a la Clase 2: trabajaremos con él.')}<div class="dk-cta"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${S.lesson[1]-5}">Completar mi árbol</button></div></div></div>`;

/* ---------- Nivel 4 · Formación Transgeneracional · Clase 2 ---------- */
(function(){const c=document.createElement('style');c.id='tb-css';c.textContent=`
.tb-c{border-radius:18px;padding:18px;display:grid;gap:10px;align-content:start}
.tb-c.d{background:var(--ni-olv);color:#ece7d3}.tb-c.d p{color:#dfe3cf}.tb-c.d small{color:#d9c9ef}
.tb-c.w{background:var(--nb-paper);border:1px solid var(--nb-line);color:var(--nb-ink)}
.tb-c p{margin:0;line-height:1.55}.tb-c small{font-size:.8rem;font-style:italic;line-height:1.45}
.tb-c h3{margin:0;font:400 1.25rem/1.2 var(--f-display)}
.tb-ls{display:grid;gap:8px}
.tb-ls button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center;padding:11px 14px;border-radius:12px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);font-size:.92rem;line-height:1.45;transition:transform .25s,background .25s;animation:niUp .4s both}
.tb-ls button i{font-style:normal;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:.7rem;font-weight:700;background:var(--ni-lil);color:var(--ni-lil2)}
.tb-ls button[aria-pressed="true"]{background:var(--ni-lil);border-color:var(--ni-lil2);transform:translateX(4px)}
.tb-ls button[aria-pressed="true"] i{background:var(--ni-lil2);color:#fff}
.tb-frs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tb-frs button{all:unset;box-sizing:border-box;cursor:pointer;padding:16px 18px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);font:italic 400 1.08rem/1.4 var(--f-display);color:var(--nb-ink);display:grid;gap:6px;animation:niUp .5s both;transition:background .3s,transform .3s}
.tb-frs button:nth-child(4n+1),.tb-frs button:nth-child(4n){background:var(--ni-lil)}
.tb-frs button small{font:600 .56rem/1 var(--f-caps);font-style:normal;letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.tb-frs button[aria-pressed="true"]{background:var(--ni-olv);color:#fff;transform:translateY(-3px)}
.tb-frs button[aria-pressed="true"] small{color:#d9c9ef}
.tb-gens{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;position:relative}
.tb-gens>div{position:relative;display:grid;justify-items:center;gap:6px;text-align:center;padding:14px 8px;border-radius:16px;background:var(--nb-paper);border:1px solid var(--nb-line)}
.tb-gens>div:not(:last-child)::after{content:"";position:absolute;right:-13px;top:50%;border:6px solid transparent;border-left:9px solid var(--ni-lil2);margin-top:-6px}
.tb-gens small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--nb-soft)}
.tb-gens .dot{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:var(--ni-lil);color:var(--ni-lil2)}
.tb-gens .on .dot{background:var(--ni-lil2);color:#fff;animation:niPop .5s both}
.tb-gens .on b{animation:niUp .5s both}
.tb-gens b{font:400 1rem/1.25 var(--f-display);min-height:2.5em}
.tb-fam{width:100%;max-width:440px;height:auto;display:block;margin:0 auto;overflow:visible}
.tb-fam text{font-family:var(--f-body,system-ui);text-anchor:middle;font-size:12px;fill:#3b4a24}
.tb-fam .mv{animation:tbMv .9s cubic-bezier(.3,.7,.2,1) forwards}
.tb-fam .dim{opacity:.3;transition:opacity .6s}
.tb-fam .ln{stroke:#b9ad84;stroke-width:1.5}
.tb-fam .ex{animation:tbOut 2.4s ease-in-out infinite}
.tb-fam .in{animation:tbIn .9s cubic-bezier(.3,.7,.2,1) forwards}
.tb-fam .pl{animation:niBeat 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}
@keyframes tbMv{to{transform:translate(var(--dx),var(--dy))}}
@keyframes tbOut{0%,100%{opacity:.35}50%{opacity:.6}}
@keyframes tbIn{from{transform:translate(var(--dx),var(--dy));opacity:.4}to{transform:none;opacity:1}}
.tb-quiz{display:grid;gap:10px}
.tb-quiz>div{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,2fr);gap:10px;align-items:center;padding:12px 14px;border-radius:14px;background:var(--nb-paper);border:1px solid var(--nb-line);animation:niUp .4s both}
.tb-quiz>div>span{font-size:.9rem;line-height:1.45}
.tb-quiz .ok{border-color:#5c7a32;background:#eef4dc}.tb-quiz .no{animation:niShake .4s}
.tb-quiz .dk-chips{justify-content:flex-end}
.tb-5{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.tb-5 button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:8px;align-content:start;min-height:150px;padding:14px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .45s both;transition:transform .3s,background .3s}
.tb-5 button b{font:400 1.08rem/1.2 var(--f-display)}.tb-5 button span{font-size:.84rem;line-height:1.45;color:var(--nb-soft)}
.tb-5 button small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2);align-self:end}
.tb-5 button.s{background:var(--ni-lil)}
.tb-5 button[aria-pressed="true"]{transform:translateY(-4px);border-color:var(--ni-lil2)}
.tb-wave{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;text-align:center}
.tb-wave div{display:grid;gap:4px;justify-items:center;padding:10px;border-radius:14px;background:rgba(236,231,211,.1);animation:niUp .5s both}
.tb-wave i{width:16px;height:16px;border-radius:50%;background:#d9c9ef;animation:niBeat 1.8s ease-in-out infinite}
.tb-wave small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:#d9c9ef}
.tb-wave b{font:400 1rem var(--f-display);color:#fff}
.tg-flow.tb-f4{grid-template-columns:repeat(4,minmax(0,1fr))}
.tb-warn{border-radius:16px;padding:14px 18px;background:#f7dde5;color:#6a2a3e;font-weight:600;display:flex;gap:10px;align-items:center}
.tb-dec{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.tb-dec button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:8px;align-content:start;padding:16px 18px;border-radius:16px;transition:transform .3s,box-shadow .3s}
.tb-dec button b{font:400 1.2rem/1.2 var(--f-display)}.tb-dec button span{font-size:.9rem;line-height:1.5}
.tb-dec button:first-child{background:var(--ni-tea);color:#1f3f32}.tb-dec button:last-child{background:var(--ni-lil);color:#3b2a5a}
.tb-dec button[aria-pressed="true"]{transform:translateY(-4px);box-shadow:0 0 0 3px var(--ni-lil2)}
.tb-ej{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.tb-ej>div{display:grid;gap:8px;align-content:start;min-height:96px;padding:14px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);opacity:.25;transition:opacity .45s,transform .45s}
.tb-ej>div.lit{opacity:1;transform:translateY(-4px)}
.tb-ej>div:first-child{background:#c9c9f5;border-color:#c9c9f5}.tb-ej>div:last-child{background:var(--ni-lil);border-color:var(--ni-lil)}
.tb-ej small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.tb-ej b{font:400 1.1rem/1.25 var(--f-display)}
.tb-gold{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tb-gold button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:auto 1fr;gap:4px 12px;align-items:center;padding:14px 16px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .4s both;transition:background .3s}
.tb-gold button i{grid-row:span 2;font-style:normal;width:26px;height:26px;border-radius:50%;border:1.5px solid var(--ni-lil2);display:grid;place-items:center;font-size:.8rem;color:#fff}
.tb-gold button b{font:400 1.08rem/1.2 var(--f-display)}.tb-gold button span{font-size:.86rem;line-height:1.45;color:var(--nb-soft)}
.tb-gold button[aria-pressed="true"] i{background:var(--ni-lil2);animation:niPop .4s both}
.tb-gold button.hl{background:var(--ni-olv);color:#ece7d3;border-color:var(--ni-olv)}.tb-gold button.hl span{color:#dfe3cf}.tb-gold button.hl i{border-color:#d9c9ef}
.tb-say{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tb-say button{all:unset;box-sizing:border-box;cursor:pointer;padding:16px;border-radius:14px;border:1px solid var(--nb-line);background:var(--nb-paper);font:italic 400 1.05rem/1.45 var(--f-display);color:var(--nb-ink);transition:transform .3s}
.tb-say button.ok{background:#eef4dc;border-color:#5c7a32}.tb-say button.no{background:#f7dde5;border-color:#c46a85}
@media (max-width:760px){.tg-flow.tb-f4{grid-template-columns:1fr}.tb-frs,.tb-dec,.tb-gold,.tb-say{grid-template-columns:1fr}.tb-5,.tb-ej{grid-template-columns:1fr 1fr}.tb-5 button{min-height:0}.tb-quiz>div{grid-template-columns:1fr}.tb-quiz .dk-chips{justify-content:flex-start}.tb-gens{gap:10px}.tb-gens .dot{width:42px;height:42px}.tb-wave{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();

/* «Qué es» de cada tema y su lugar en el gráfico de Constelación */
const tbQue=(k,que,hot)=>{const v=st(k,0);return `<div class="tb-c d"><span class="ni-tag" style="color:#d9c9ef">Qué es</span><p>${que}</p><small>En el gráfico: ${hot.map(tgT).join(' · ')}</small><div><button class="btn btn-ghost btn-sm" style="color:#ece7d3;border-color:#d9c9ef" ${rxa('set',k,v?0:1)} ${pressed(!!v)}>${v?'Ocultar el gráfico':'Verlo en el gráfico'}</button></div></div>`};
const tbGraf=(k,hot)=>st(k,0)?`<div class="ni-in" style="max-width:620px;width:100%;justify-self:center">${tgChart({hot,cap:'Así aparece en el gráfico de Constelación Familiar.'})}</div>`:'';
const tbList=(k,items,multi)=>{const o=multi?st(k,{}):null,s=multi?-1:st(k,-1);return `<div class="tb-ls">${items.map((x,i)=>{const on=multi?!!o[i]:s===i;return `<button ${multi?rxa('tog',k,i):rxa('set',k,on?-1:i)} ${pressed(on)} style="animation-delay:${i*.06}s"><i>${multi&&on?'✓':i+1}</i><span>${x}</span></button>`}).join('')}</div>`};
const tbAsk=t=>niBox('l','Pregunta al grupo',t);
const TB_PH=`${N4P}trans/c2-portada.webp`;

/* ----- 1 · Bienvenida y agenda ----- */
RICH.tb1=()=>`<div class="ni tgx">${nbHero('Formación Transgeneracional · Clase 2','Lealtades, roles','y repeticiones','Lo que el clan pide sin decirlo: las lealtades, los lugares que ocupamos en la familia, lo que se hereda y se carga, y el protocolo para limpiar directo o investigar.',['Lealtades','Lugares en el clan','Pérdidas y cargas','Protocolo'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="${TB_PH}" alt="La mano de una abuela, la de una mujer adulta y la de una niña se toman entre hojas verdes"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#f6d3ef" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#c9c9f5" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#7a5aa6"/></svg></div>`)}</div>`;
RICH.tb2=()=>niAgenda('Clase 2',['Revisión de la tarea y ronda','Lealtades y repeticiones','Los lugares en el clan','Madre, padre y abundancia','Pérdidas y cargas','El protocolo y un ejemplo','Práctica en parejas','Reglas de oro, repaso y tarea'],
 ['Reconocer lealtades y repeticiones en tu árbol','Distinguir roles cambiados, el doble, el yacente y los excluidos','Aplicar el protocolo: limpiar directo o investigar','Registrar una lectura en la ficha']);

/* ----- 2 · Revisión de la tarea y ronda ----- */
const TB_RV=['¿Pudiste completar las 15 personas?','¿Qué nombres, fechas u oficios se repiten?','¿Qué te contó tu familia que no sabías?','¿Qué quedó como pregunta sin respuesta?','¿Qué sentiste al armarlo?'];
RICH.tb3=()=>{const s=st('tb3',-1);let n=0;for(let i=0;i<15;i++)if(st('tan'+i,''))n++;
 return dkH('Lo que trajiste','Revisemos la tarea de la semana','Tu árbol de cuatro generaciones. Toca una pregunta para anotar tu respuesta.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">
 <div style="display:grid;gap:10px"><div>${tgTree()}</div><div class="tg-sum"><span>${n} de 15 personas con nombre</span></div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},3">${n?'Completar mi árbol':'Anotar los nombres en mi árbol'}</button></div></div>
 <div style="display:grid;gap:10px">${tbList('tb3',TB_RV)}${s>=0?`<div class="ni-in">${n3area('tb3a'+s,TB_RV[s],'Lo que descubrí…')}</div>`:''}</div></div>
 ${niQ('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.')}</div>`};
const TB_RO=[['puzzle','Algo que se repite','Un nombre, una fecha, una forma de unirse o de separarse.'],['candado','Algo que no se dice','Una persona de la que no se habla o una historia a medias.'],['regalo','Algo que agradezco','Un ancestro, una fortaleza o un regalo que llegó a través del clan.']];
RICH.tb4=()=>{const s=st('tb4',-1);
 return dkH('La ronda','Ronda: lo que descubrí en mi árbol','Elige una tarjeta y prepara tu frase.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nk-cards">${TB_RO.map((x,i)=>`<button ${rxa('set','tb4',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.08}s${i===2&&s!==i?';background:var(--ni-lil)':''}">${ic(x[0],24)}<b>${x[1]}</b><span>${x[2]}</span>${st('tb4a'+i,'')?'<small>Ya la anotaste</small>':''}</button>`).join('')}</div>
 ${s>=0?`<div class="ni-in">${n3area('tb4a'+s,TB_RO[s][1],'Una o dos frases…')}</div>`:niNote('Una o dos frases por persona.')}</div>`};

/* ----- 3 · Lealtades y repeticiones ----- */
const TB_FR=['En esta familia las mujeres salen adelante solas.','No seas más que tus padres.','El dinero se va tan rápido como llega.','De eso no se habla.'];
RICH.tb5=()=>{const o=st('tb5',{}),n=Object.values(o).filter(Boolean).length;
 return dkH('Lealtades','Lo que el clan pide sin decirlo','Toca las frases que también escuchaste en tu familia.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="ni-hyp"><p>Cada familia tiene reglas que nadie escribió. Se aprenden desde niñas y, sin darnos cuenta, las seguimos para seguir perteneciendo.</p></div>
 <div class="tb-frs">${TB_FR.map((x,i)=>`<button ${rxa('tog','tb5',i)} ${pressed(!!o[i])} style="animation-delay:${i*.12}s">«${x}»${o[i]?'<small>La escuché en mi familia</small>':''}</button>`).join('')}</div>
 ${tbAsk('¿Qué frase de este tipo escuchaste en tu familia?')}${n3area('tb5a',n?'Escribe la tuya':'Escribe la de tu familia','En mi familia se decía…')}</div>`};
RICH.tb6=()=>dkH('Tema del gráfico','Lealtades conscientes e inconscientes','Ordena cada ejemplo: ¿la elijo o la repito sin darme cuenta?')+
 `<div class="ni tgx" style="display:grid;gap:14px">${tbQue('tb6g','Una lealtad es una forma de amor al clan: hago lo que mi familia hizo para seguir perteneciendo. Es <b>consciente</b> cuando la elijo; es <b>inconsciente</b> cuando la repito sin darme cuenta.',[18,17])}
 ${tbGraf('tb6g',[18,17])}
 ${niSort('tb6s',[['Seguir el oficio familiar porque lo amo',0],['No permitirme estar mejor que mi madre',1],['Enfermar o fracasar a la misma edad que un ancestro',1],['Cargar la tristeza de un abuelo que nunca la mostró',1]],[['Consciente','La elijo','t','Consciente'],['Inconsciente','La repito sin darme cuenta','l','Inconsciente']],'Al verla, una lealtad inconsciente puede volverse una elección.','Mira de nuevo: ¿la persona lo elige o le pasa sin darse cuenta?')}
 ${tbAsk('¿Qué lealtad sientes que eliges y cuál repites sin querer?')}</div>`;
const TB_RP=[['Separaciones a la misma edad en madre, abuela e hija','xcirc',['Abuela','Madre','Hija'],'Se separa a la misma edad'],['Accidentes o pérdidas en fechas cercanas de distintos años','reloj',['Hace 60 años','Hace 30 años','Este año'],'Una pérdida en la misma fecha'],['Uniones con parejas ausentes, generación tras generación','corazon',['Abuela','Madre','Hija'],'Una pareja ausente'],['Negocios que se pierden siempre de la misma forma','balanza',['Abuelo','Padre','Hijo'],'El negocio se pierde igual']];
RICH.tb7=()=>{const s=st('tb7',0),x=TB_RP[n3clamp(s,0,3)];
 return dkH('Tema del gráfico','Repetición de patrones','Elige un ejemplo y mira cómo vuelve a aparecer en cada generación.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">${tbQue('tb7g','Un mismo hecho aparece en varias generaciones: en la misma fecha, a la misma edad o en la misma situación. Es el clan intentando mirar algo que quedó sin resolver.',[15,9])}
 <div style="display:grid;gap:12px">${chipRow('tb7',['Separaciones','Fechas','Parejas ausentes','Negocios'],s)}<p style="margin:0;font-size:.92rem;color:var(--nb-soft)">${x[0]}.</p>
 <div class="tb-gens">${x[2].map((g,i)=>`<div class="on" style="--d:${i*.35}s"><small>${g}</small><span class="dot" style="animation-delay:${i*.35}s">${ic(x[1],24)}</span><b style="animation-delay:${i*.35+.1}s">${x[3]}</b></div>`).join('')}</div></div></div>
 ${tbGraf('tb7g',[15,9])}${tbAsk('¿Qué se repite en tu árbol de cuatro generaciones?')}</div>`};

/* ----- 4 · Los lugares en el clan ----- */
const TB_RC=[['La hija que hace de madre de su madre',{H:[-50,-100],M:[50,100]},'cuida a mamá'],['El hijo que se vuelve pareja emocional de su madre o su padre',{H:[50,-100],P:[70,30,1]},'ocupa el lugar del padre'],['Quien se queda en casa para cuidar y posterga su vida',{H:[0,-50]},'posterga su vida'],['Hermanos mayores que crían a los menores',{H:[60,-50],M:[0,0,1],P:[0,0,1]},'cría a su hermano']];
const tbFam=s=>{const x=s>=0?TB_RC[s]:null,m=x?x[1]:{},N=[['M','Madre',150,50,'#f6d3ef'],['P','Padre',250,50,'#c9c9f5'],['H',s===3?'Hermano mayor':s===0?'Hija':'Hijo',s===3?140:200,150,'#1f3f32']];if(s===3)N.push(['h','Hermano menor',300,150,'#e6dcf2']);
 const g=N.map(([k,t,cx,cy,f])=>{const d=m[k],mv=d&&(d[0]||d[1]),dim=d&&d[2];return `<g class="${mv?'mv':''}${dim?' dim':''}" style="--dx:${d?d[0]:0}px;--dy:${d?d[1]:0}px"><circle cx="${cx}" cy="${cy}" r="${k==='H'?24:22}" fill="${f}"${k==='H'&&mv?' class="pl"':''}/><text x="${cx}" y="${cy+40}">${t}</text>${k==='H'&&mv?`<text x="${cx}" y="${cy+55}" style="fill:#7a5aa6;font-weight:600">${esc(x[2])}</text>`:''}</g>`}).join('');
 return `<svg class="tb-fam" viewBox="60 -10 280 230" role="img" aria-label="${x?esc(x[0]):'Una familia en orden: los padres arriba y los hijos abajo'}"><line class="ln" x1="150" y1="50" x2="250" y2="50"/><line class="ln" x1="200" y1="50" x2="200" y2="${s===3?120:126}"/>${s===3?'<line class="ln" x1="140" y1="120" x2="300" y2="120"/>':''}${g}</svg>`};
RICH.tb8=()=>{const s=st('tb8',-1);
 return dkH('El lugar en el clan','Roles cambiados y ser hijo bastón','Toca un ejemplo y mira qué lugar ocupa cada uno.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">${tbQue('tb8g','Un rol cambiado es ocupar un lugar que no nos corresponde. El <b>hijo bastón</b> es quien sostiene a uno de sus padres: lo cuida, lo acompaña o lo consuela como si fuera el adulto.',[19,0])}
 <div style="display:grid;gap:10px"><div class="nj-card b" style="min-height:0;padding:12px">${tbFam(s)}<p style="text-align:center;opacity:1">${s<0?'<b>En orden:</b> los padres dan y los hijos reciben.':'<b>Rol cambiado:</b> '+TB_RC[s][0].toLowerCase()+'.'}</p></div>${tbList('tb8',TB_RC.map(x=>x[0]))}</div></div>
 ${tbGraf('tb8g',[19,0])}${tbAsk('¿Hubo en tu familia alguien que tuvo que ser grande antes de tiempo?')}</div>`};
const TB_DY=[['El doble','Lleva otra historia','Quien recibe el nombre, la fecha o el lugar de un ancestro y, sin saberlo, repite parte de su destino.','espiral'],['El yacente','Nace en lugar de otro','Quien es concebido o nace cerca de la muerte de un familiar y carga la memoria de esa persona.','hoja'],['El heredero universal','Carga lo pendiente','Quien recibe lo que el clan dejó sin resolver: deudas, secretos o tareas de otros.','bateria']];
const TB_DQ=[['Lleva el nombre de su abuelo y vive un destino parecido al de él.',0],['Nació pocos meses después de que murió su tío.',1],['Le tocó resolver las deudas y los secretos que dejó la familia.',2]];
RX.tbdq=(k,v)=>{const o=st('tb9q',{});o[k]=+v;RS.tb9q=o;render(false)};
RICH.tb9=()=>{const o=st('tb9q',{}),ok=TB_DQ.filter((q,i)=>o[i]===q[1]).length;
 return dkH('El lugar en el clan','El doble, el yacente y el heredero universal','Toca cada tarjeta. Después reconoce a cada uno.')+
 `<div class="ni tgx" style="display:grid;gap:14px">${n3flip('tb9',TB_DY.map(x=>[x[3],x[0]+' · '+x[1],x[2]]),'c3',170)}
 <div class="dk-sub">¿Quién es?</div><div class="tb-quiz">${TB_DQ.map((q,i)=>{const a=o[i],r=a===undefined?'':a===q[1]?'ok':'no';return `<div class="${r}" style="animation-delay:${i*.06}s"><span>${q[0]}${r==='ok'?` <b style="color:#5c7a32">✓ ${TB_DY[q[1]][0]}</b>`:''}</span><div class="dk-chips">${TB_DY.map((d,j)=>`<button class="chip" ${rxa('tbdq',i,j)} ${pressed(a===j)}>${d[0].replace('El ','')}</button>`).join('')}</div></div>`}).join('')}</div>
 ${ok===3?niQ('¡Los tres reconocidos! En el gráfico aparecen como Doble, Yacente y Heredero universal.'):niNote('Situaciones de práctica.')}
 ${tbAsk('¿Llevas el nombre o la fecha de alguien de tu árbol?')}</div>`};
const TB_EX=['Hijos no reconocidos o dados en adopción','Embarazos que no llegaron a término','Parejas anteriores de las que no se habla','Quien se fue lejos, enfermó o trajo vergüenza'];
RICH.tb10=()=>{const s=n3clamp(st('tb10',0),0,3),v=st('tb10v',0),X=[110,170,230,290];
 const fam=X.map((x,i)=>`<g><circle cx="${x}" cy="70" r="20" fill="${i%2?'#c9c9f5':'#f6d3ef'}"/></g>`).join('');
 const ds=`<g><circle cx="200" cy="170" r="22" fill="#1f3f32"${v?'':' class="pl"'}/><text x="200" y="174" style="fill:#ece7d3;font-size:10px">Yo</text><text x="200" y="208">${v?'toma su propio lugar':'repite su destino'}</text></g>`;
 const ex=`<g class="${v?'in':'ex'}" style="--dx:45px;--dy:0px"><circle cx="${v?350:395}" cy="70" r="20" fill="#e6dcf2" stroke="#7a5aa6" stroke-width="2" ${v?'':'stroke-dasharray="4 4"'}/><text x="${v?350:395}" y="74" style="font-size:14px;fill:#7a5aa6">${v?'♡':'?'}</text><text x="${v?350:395}" y="106">${v?'tiene su lugar':'excluido'}</text></g>`;
 return dkH('El lugar en el clan','Excluidos en el árbol','Elige un ejemplo y devuélvele su lugar.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">${tbQue('tb10g','Son quienes fueron olvidados, rechazados o borrados de la historia familiar. Cuando alguien queda fuera, otro miembro del clan suele repetir su destino para que sea visto.',[1,20])}
 <div style="display:grid;gap:10px">${chipRow('tb10',['Hijos','Embarazos','Parejas','Quien se fue'],s)}<p style="margin:0;font-size:.92rem;color:var(--nb-soft)">${TB_EX[s]}.</p>
 <div class="nj-card b" style="min-height:0;padding:12px"><svg class="tb-fam" viewBox="70 30 360 190" role="img" aria-label="${v?'La persona excluida vuelve a tener su lugar en la familia':'Una persona queda fuera de la familia y otro miembro repite su destino'}"><line class="ln" x1="110" y1="70" x2="${v?350:290}" y2="70"/><line class="ln" x1="200" y1="70" x2="200" y2="148"/>${v?'':'<line class="ln" x1="200" y1="148" x2="380" y2="85" stroke-dasharray="3 5" style="stroke:#7a5aa6"/>'}${fam}${ex}${ds}</svg></div>
 <div class="dk-cta" style="justify-content:center"><button class="btn ${v?'btn-ghost':'btn-primary'} btn-sm" ${rxa('set','tb10v',v?0:1)}>${v?'Ver de nuevo':'Darle su lugar'}</button></div></div></div>
 ${v?`<div class="ni-box t ni-in"><b>Recuperar mi lugar en el clan</b><p>Darle a cada uno el suyo, empezando por los excluidos, y tomar el mío.</p></div>`:''}${tbGraf('tb10g',[1,20])}</div>`};

/* ----- 5 · Madre, padre y abundancia ----- */
RICH.tb11=()=>{const s=st('tb11',-1);
 return dkH('Madre y padre','Bloqueos con la madre y con el padre','Toca un linaje para verlo en el árbol.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tg-two">${[['Linaje materno','Bloqueos con la madre','Dificultad para recibir: el cuidado, el cuerpo, los vínculos, la ternura.','Muchas veces la madre también tuvo una madre con la que no pudo conectar.'],['Linaje paterno','Bloqueos con el padre','Dificultad para salir al mundo: el trabajo, la dirección, la confianza en sí misma.','Muchas veces el padre tampoco tuvo un padre presente.']].map((x,i)=>`<button style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;align-content:start;background:${i?'#c9c9f5':'#f6d3ef'};color:${i?'#2a2a6a':'#5a2350'};${s===i?'box-shadow:0 0 0 3px '+(i?'#5a5ab0':'#b0589a'):''}" ${rxa('set','tb11',s===i?-1:i)} ${pressed(s===i)}><span class="ni-tag" style="color:inherit;opacity:.8">${x[0]}</span><h3 style="margin:0;font:400 1.3rem/1.2 var(--f-display)">${x[1]}</h3><p style="margin:0;line-height:1.5">${x[2]}</p>${s===i?`<p class="ni-in" style="margin:0;line-height:1.5;font-style:italic">${x[3]}</p>`:''}</button>`).join('')}</div>
 <div style="max-width:620px;width:100%;justify-self:center">${tgTree({hs:s===0?'m':s===1?'p':''})}</div>
 ${s>=0?`<div class="ni-in" style="max-width:560px;width:100%;justify-self:center">${tgChart({hot:[s?14:13],cap:'En el gráfico: '+tgT(s?14:13)+'.'})}</div>`:''}
 ${tbAsk('¿Qué historia vivió tu madre o tu padre con sus propios padres?')}</div>`};
RICH.tb12=()=>dkH('Lo material','Herencias, abundancia, dinero y éxitos','Toca los ejemplos que reconoces en tu familia.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">${tbQue('tb12g','Lo material también se hereda: bienes, deudas y creencias. Hay familias donde prosperar se siente como traicionar a quienes vivieron con poco.',[2,5,7])}
 <div style="display:grid;gap:10px"><div class="dk-sub">Cómo se ve en la familia</div>${tbList('tb12',['Herencias que separaron a la familia','Creencias como «ser pobre pero honrado»','Sentir culpa al ganar más que los padres','Éxitos que se pierden justo al llegar'],1)}</div></div>
 ${tbGraf('tb12g',[2,5,7])}${tbAsk('¿Qué te enseñó tu familia sobre el dinero?')}${n3area('tb12a','Anota lo que te enseñaron','En mi casa el dinero…')}</div>`;

/* ----- 6 · Pérdidas y cargas ----- */
const TB_PE=[['Muertes tempranas','Hijos, hermanos o padres que murieron jóvenes.'],['Abortos o abusos','Memorias delicadas: se leen sin buscar detalles.'],['Divorcios y separaciones','Uniones que se rompieron y lo que quedó pendiente.'],['Migración','Dejar la tierra, la lengua y la familia.'],['Guerras','Lo que el clan vivió en conflictos y persecuciones.']];
RICH.tb13=()=>{const o=st('tb13',{}),n=Object.values(o).filter(Boolean).length;
 return dkH('Pérdidas y rupturas','Pérdidas y rupturas','Toca cada tarjeta para verla.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tb-5">${TB_PE.map((x,i)=>`<button class="${i===1?'s':''}" ${rxa('tog','tb13',i)} ${pressed(!!o[i])} style="animation-delay:${i*.07}s"><b>${x[0]}</b>${o[i]?`<span class="ni-in">${x[1]}</span>`:'<small>Toca para ver</small>'}</button>`).join('')}</div>
 <div class="tb-c d"><p style="font:400 1.15rem/1.45 var(--f-display);color:#fff">Un duelo que no se vivió pasa a la siguiente generación como tristeza, miedo o una pérdida que se repite.</p>
 <div class="tb-wave">${['Tristeza','Miedo','Una pérdida que se repite'].map((x,i)=>`<div style="animation-delay:${i*.25}s"><i style="animation-delay:${i*.3}s"></i><small>${i+1}ª generación siguiente</small><b>${x}</b></div>`).join('')}</div></div>
 ${n===5?`<div class="ni-in" style="max-width:620px;width:100%;justify-self:center">${tgChart({hot:[3,4,6,10,12],cap:'Los cinco temas en el gráfico de Constelación Familiar.'})}</div>`:niNote(`${n} de 5 tarjetas vistas.`)}</div>`};
const TB_CA=[['Enfermedades','Que aparecen en varias generaciones, incluidas depresiones y adicciones.'],['Vínculos disfuncionales','Control, dependencia o violencia que se repite.'],['Cargas emocionales','Culpa, rabia o tristeza que no son propias.']];
RICH.tb14=()=>dkH('Lo que se carga','Enfermedades, vínculos y cargas emocionales','Toca cada carga.')+
 `<div class="ni tgx" style="display:grid;gap:14px">${tbQue('tb14g','Son pesos que pasan de una generación a otra: enfermedades que se repiten, formas de relacionarse que hacen daño y emociones que nadie pudo expresar.',[21,22,23])}
 <div class="dk-sub">Cómo se ve en la familia</div>${n3sel('tb14',TB_CA.map((x,i)=>[['gota','hilos','bateria'][i],x[0],x[1]]),{eb:'Carga',nav:1})}
 <div class="tb-warn">${ic('escudo',22)}<span>El gráfico muestra memorias del linaje, no diagnósticos.</span></div>${tbGraf('tb14g',[21,22,23])}</div>`;

/* ----- 7 · El protocolo y un ejemplo ----- */
const TB_PR=[['Leer','Constelación: linaje, generación, escala y tema.'],['Decidir','Limpiar directo o investigar.'],['Limpiar','Como aprendiste en Radiestesia y Sanación del Alma.'],['Cerrar','Con la oración del linaje.']];
RICH.tb15=()=>{const s=n3clamp(st('tb15',0),0,3),d=st('tb15d',-1),t=st('tgt',-1);
 return dkH('El protocolo','El protocolo','Cuatro pasos, siempre en el mismo orden.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tg-flow tb-f4">${TB_PR.map((x,i)=>`<button class="${i<=s?'lit':''} ${i===s?'cur':''}" ${rxa('set','tb15',i)}><small>Paso ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','tb15',s+1)}>Siguiente paso</button></div>`:''}
 ${s===1?`<div class="tb-dec ni-in"><button ${rxa('set','tb15d',d===0?-1:0)} ${pressed(d===0)}><b>Limpiar directo</b><span>Con Energías Discordantes: la energía del tema se limpia sin investigar más.</span></button><button ${rxa('set','tb15d',d===1?-1:1)} ${pressed(d===1)}><b>Investigar</b><span>En el Mapa de Emociones (sector y emoción). Si el tema es Votos o Transgeneracional, se va a ese gráfico: lo vemos en la Clase 3.</span></button></div>
 ${d>=0?`<div class="dk-cta ni-in" style="justify-content:center"><button class="btn btn-ghost btn-sm" data-les="0,${d?16:15}">${d?'Abrir el Mapa de Emociones':'Abrir Energías Discordantes'}</button></div>`:''}`:''}
 ${s===3?`<div class="ni-box d ni-in"><b>La oración del linaje</b><p style="font-style:italic">${TG_PRAY}</p></div>`:''}
 ${t>=0?niBox('l','Con tu lectura',`Marcaste <b>${tgT(t)}</b>. ${t>=24?'Ese tema se va a su propio gráfico: anótalo y lo trabajamos en la Clase 3.':'Puedes limpiar directo con Energías Discordantes o investigar en el Mapa de Emociones.'}`):''}</div>`};
const TB_EJ=[['Linaje','Paterno'],['Generación','2da · padres'],['Escala','80'],['Tema','Abundancia / dinero'],['Mapa','Humillación → Culpa']];
RX.tbex=()=>{RS.tgl=1;RS.tgg=1;RS.tge=16;RS.tgt=5;RS.tb16c=1;render(false)};
RICH.tb16=()=>{const s=n3clamp(st('tb16',0),0,6),c=st('tb16c',0);
 return dkH('Ejemplo','Ejemplo de lectura y limpieza','Consultante: C. P., siente culpa cada vez que gana más dinero.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tb-ej">${TB_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s>=6?`<div class="ni-box d ni-in"><b>Comprensión posible</b><p>Su padre perdió su negocio y vivió con culpa. Por lealtad, ganar más se siente como dejarlo atrás.</p></div>
 <div class="tg-flow ni-in">${[['Investiga','En el Mapa: humillación y culpa.'],['Limpia','La culpa, con el péndulo.'],['Cierra','Con la oración del linaje.']].map((x,i)=>`<button class="lit" style="cursor:default;animation:niUp .45s ${i*.12}s both"><small>${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${c?`<div class="ni-in" style="max-width:620px;width:100%;justify-self:center">${tgChart({cap:'La lectura de C. P. marcada en el gráfico.'})}</div>`:''}
 <div class="dk-cta" style="justify-content:center">${c?'':`<button class="btn btn-primary btn-sm" ${rxa('tbex',0)}>Verlo en el gráfico</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','tb16',0)}>Ver de nuevo</button></div>`:
 `<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','tb16',s+1)}>${s===0?'Empezar':s===5?'Ver la comprensión':'Siguiente'}</button></div>`}</div>`+niNote('Ejemplo ficticio.')};

/* ----- 8 · Práctica en parejas ----- */
const TB_PS=[['Tu pareja lee','Tu árbol en Constelación: linaje, generación, escala y tema.'],['Deciden juntas','Limpiar directo o investigar en el Mapa.'],['Limpian y cierran','Con la oración del linaje.'],['Completan la ficha','Y cambian de rol.']];
const tbHoy=()=>{const d=new Date();return d.getDate()+'/'+(d.getMonth()+1)};
RICH.tb17=()=>{const s=n3clamp(st('tb17',0),0,3);
 return dkH('Práctica en parejas','Práctica en parejas','Cuatro pasos. Anota en la ficha lo que aparece.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${TB_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','tb17',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','tb17',s+1)}>Siguiente paso</button></div>`:''}
 ${niFicha('tbf',['Fecha','Consultante','Motivo','Linaje','Generación','Escala','Tema','Limpieza','Verificada'],['Ej.: 11/11','C. P.','Culpa al ganar dinero','Paterno','2da','80','Abundancia / dinero','Mapa: Humillación · Culpa','Sí'],()=>{const r=tgRead(),m=njMapaTxt();return [tbHoy(),'','',r[0],r[1].split(' ')[0],r[2],r[3],m?'Mapa: '+m:'','']},1000)}</div>`+n3priv};

/* ----- 9 · Reglas de oro, repaso y tarea ----- */
const TB_RG=[['Hablar en hipótesis','«El gráfico muestra una posible…». La persona confirma.'],['No culpar a los ancestros','Comprendemos la historia; no buscamos culpables.'],['No afirmar hechos','Nunca decir que algo le pasó a una persona concreta.'],['Pedir consentimiento','Antes de leer el árbol o el gráfico de otra persona.'],['Cuidar los temas sensibles','No profundizar y derivar si la persona relata algo propio.'],['Confidencialidad','Lo que se comparte en la sesión, queda en la sesión.']];
RICH.tb18=()=>{const o=st('tb18',{}),n=Object.values(o).filter(Boolean).length,q=st('tb18q',-1);
 return dkH('Reglas de oro','Reglas de oro','Toca cada regla para comprometerte con ella.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tb-gold">${TB_RG.map((x,i)=>`<button class="${i===4?'hl':''}" ${rxa('tog','tb18',i)} ${pressed(!!o[i])} style="animation-delay:${i*.06}s"><i>${o[i]?'✓':''}</i><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${niNote(n===6?'Te comprometiste con las seis reglas.':`${n} de 6 reglas.`)}
 <div class="dk-sub">¿Cómo lo dirías?</div><div class="tb-say">${['«Tu abuela sufrió un abuso.»','«El gráfico muestra una posible memoria delicada en el linaje materno. ¿Te hace sentido?»'].map((x,i)=>`<button class="${q===i?(i?'ok':'no'):''}" ${rxa('set','tb18q',i)} ${pressed(q===i)}>${x}</button>`).join('')}</div>
 ${q===0?`<div class="dk-call warn ni-in">Así se afirma un hecho sobre una persona concreta. Habla en hipótesis y deja que la persona confirme.</div>`:q===1?niQ('Así es: hablas en hipótesis, no afirmas hechos y la persona confirma.'):''}</div>`};
RICH.tb19=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('tbcp',[['corazon','1 · ¿Qué es una lealtad inconsciente? Da un ejemplo.','<b>Repetir lo que hizo mi familia sin darme cuenta, para seguir perteneciendo.</b> Por ejemplo: no permitirme estar mejor que mi madre, o cargar la tristeza de un abuelo que nunca la mostró.'],['persona','2 · ¿En qué se diferencia un rol cambiado del doble?','<b>En el rol cambiado ocupo un lugar que no me corresponde</b>, como la hija que hace de madre de su madre. <b>El doble lleva la historia de un ancestro:</b> recibe su nombre, su fecha o su lugar y repite parte de su destino.'],['lupa','3 · Si decides investigar un tema, ¿en qué gráficos lo haces?','<b>En el Mapa de Emociones</b>, con el sector y la emoción. Si el tema es <b>Votos o Transgeneracional</b>, se va a ese gráfico: lo vemos en la Clase 3.']],'c4',270)}</div>`;
RICH.tb20=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Una lealtad o repetición en tu árbol.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('tbta',[['lupa','Elige una lealtad o una repetición que reconozcas en tu árbol'],['diana','Léela en el gráfico de Constelación: linaje, generación, escala y tema'],['limpia','Limpia directo o investiga en el Mapa'],['paloma','Cierra con la oración del linaje'],['libro','Completa la ficha y anota lo que sentiste durante la semana']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 3.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Si el tema que aparece es Votos o Transgeneracional, anótalo y no lo trabajes todavía: lo veremos en la Clase 3. Trae tu ficha.')}<div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},6">Abrir el gráfico de Constelación</button><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${S.lesson[1]-1}">Volver a la ficha</button></div></div></div>`;

/* ---------- Nivel 4 · Formación Transgeneracional · Clase 3 ---------- */
(function(){const c=document.createElement('style');c.id='tc-css';c.textContent=`
.tc-mem{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-content:start}
.tc-mem button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:6px;align-content:start;padding:14px;border-radius:16px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .45s both;transition:transform .25s,background .25s,box-shadow .25s}
.tc-mem button.i{background:var(--ni-lil);border-color:var(--ni-lil)}
.tc-mem small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.tc-mem b{font:400 1.08rem/1.2 var(--f-display)}
.tc-mem span{font-size:.84rem;line-height:1.45;color:var(--nb-soft)}
.tc-mem em{font-style:normal;font-size:.7rem;color:var(--ni-lil2)}
.tc-mem button[aria-pressed="true"]{transform:translateY(-3px);box-shadow:0 0 0 2px var(--ni-lil2)}
.tc-mem button.seen:not([aria-pressed="true"]) b::after{content:" ✓";color:#5c7a32}
.tc-side{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:16px;align-items:start}
.tc-r3{grid-template-columns:repeat(3,minmax(0,1fr))}
.tc-vow{display:grid;gap:8px}
.tc-vow button{all:unset;box-sizing:border-box;cursor:pointer;padding:12px 16px;border-radius:12px;border:1px solid var(--nb-line);background:var(--nb-paper);font:italic 400 1.08rem/1.35 var(--f-display);color:var(--nb-ink);animation:niUp .45s both;transition:transform .25s,background .25s}
.tc-vow button[aria-pressed="true"]{background:var(--ni-olv);color:#fff;transform:translateX(5px)}
.tc-name{display:flex;gap:10px;flex-wrap:wrap;align-items:end}
.tc-name label{display:grid;gap:4px;font-size:.8rem;color:var(--nb-soft);flex:1 1 200px}
.tc-name input{all:unset;box-sizing:border-box;width:100%;padding:8px 2px;border-bottom:1.5px dashed var(--ni-lil2);font:400 1.1rem var(--f-display);color:var(--nb-ink)}
@media (max-width:760px){.tc-side>.nj-fig{order:-1}.tc-mem{grid-template-columns:1fr}.tc-side{grid-template-columns:1fr}.tc-r3{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();

/* el gráfico Transgeneracional: linaje al centro, 11 memorias profundas y 26 memorias del linaje */
const TR_I=['Secretos','Adulterio','Poligamia','Adopciones','Esterilidad','Guerras','Inanición','Violaciones','Crímenes','Asesinatos','Incestos'];
const TR_O=['Abuso de la\nJerarquía','Enfermedades\nMentales','Madre soltera','Matrimonio\nforzado','Doble por el\nnombre','Exclusión de un\nmiembro familiar','Abortos /\ngemelos','Divorcio /\nSeparación','Niños no\nreconocidos','Hijo no deseado','Discriminación\nracial','Abusos / tortura','Electra / Edipo','Pederastia','Votos\n(ir a Votos)','Accidentes y\ntragedias','Enfermedad /\npandemia','Narcisismo / Psico-\npatía / Machismo','Esclavitud / terro-\nrismo / prisión','Pérdidas / Asuntos\nfinancieros','Deportaciones /\ninmigraciones','Muertes por\ncataclismos','Intolerancia a\nla felicidad','Obligaciones\nreligiosas','Deudas transge-\nneracionales','Muertes\ntempranas'];
const tcClean=t=>t.replace(/-\n/,'').replace(/\n/g,' ');
RX.trc=(k,v)=>{const K='tr'+k;RS[K]=RS[K]===+v?-1:+v;render(false)};
const trChart=o=>{o=o||{};const H=o.hot&&[].concat(o.hot);return niFan({label:'Gráfico Transgeneracional',act:'trc',inner:50,
 sel:(k,i)=>o.sel!==undefined?o.sel===k+i:st('tr'+k,-1)===i,
 hot:H||o.ring?(k,i)=>o.ring?(k===o.ring?0:-1):(k==='l'?0:H.includes(k+i)?1:-1):0,
 rings:[{k:'l',r0:62,r1:118,items:[{t:'Linaje\nMaterno',c:'#f6d3ef',on:'#b0589a'},{t:'Linaje\nPaterno',c:'#c9c9f5',on:'#5a5ab0'}],m:'tan',fs:11},
  {k:'i',r0:118,r1:172,items:TR_I,fill:'#f8f5ec',on:'#7a5aa6',m:'rad',fs:8.6},
  {k:'o',r0:172,r1:280,items:TR_O,fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:7.4}],cap:o.cap===0?'':o.cap||'Toca el linaje, una memoria del anillo interior y una del exterior.'})};
const trRead=()=>{const l=st('trl',-1),i=st('tri',-1),e=st('tro',-1);return [l>=0?TG_L[l]:'',i>=0?TR_I[i]:'',e>=0?tcClean(TR_O[e]):'']};
const tcRow=(L,r)=>`<div class="ni-read tc-r3 ni-st">${L.map((x,i)=>`<div><small>${i+1} · ${x}</small><span>${r[i]||'—'}</span></div>`).join('')}</div>`;

/* el gráfico de Votos o Pactos: nivel al centro, 27 votos y la escala de 0 a 100 */
const TV_N=['Bajo','Medio','Alto','Muy alto'];
const TV_V=['Maldiciones (cono-\ncidas o no conocidas)','Votos de pobreza','Depresiones y\nadicciones','Seguir a un\nfallecido','Votos de castidad','Votos de obediencia','Secretos','Idealización','Votos de ansiedad','Votos de enfermedad','No recibir ayuda\no regalos','Votos de miedo\na Dios','Compromisos con-\nvertidos en votos','Creencias limitantes','Votos de sufrimiento','Seguir a un salvador','Votos de silencio','Votos de celibato','Votos religiosos\nde cualquier tipo','Renunciar al amor','Votos de soledad','Votos de separación','Votos de sacrificio','Condena eterna','Deseos de muerte','Desbalance\nemocional','Otros votos'];
RX.tvc=(k,v)=>{const K='tv'+k;RS[K]=RS[K]===+v?-1:+v;render(false)};
const tvChart=o=>{o=o||{};const H=o.hot&&[].concat(o.hot);return niFan({label:'Gráfico de Votos o Pactos',act:'tvc',inner:50,sel:(k,i)=>st('tv'+k,-1)===i,
 hot:H||o.ring?(k,i)=>o.ring?(k===o.ring?0:-1):(k==='v'?(H.includes(i)?1:-1):0):0,
 rings:[{k:'n',r0:62,r1:125,items:TV_N.map((t,i)=>({t,c:['#efeafa','#e1d8f7','#cfc3f4','#b9a3f1'][i]})),on:'#6a4aa6',m:'tan',fs:11},
  {k:'v',r0:125,r1:258,items:TV_V,fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:7.4},
  {k:'e',r0:258,r1:280,items:Array.from({length:21},(_,i)=>String(i*5)),fill:'#efe4f3',on:'#7a5aa6',m:'tan',fs:7.5}],cap:o.cap===0?'':o.cap||'Toca el voto, el nivel y la escala.'})};
const tvRead=()=>{const v=st('tvv',-1),n=st('tvn',-1),e=st('tve',-1);return [v>=0?tcClean(TV_V[v]):'',n>=0?TV_N[n]:'',e>=0?String(e*5):'']};
const tvDe=t=>t?t.replace(/^Votos (de |religiosos )?/,m=>m==='Votos religiosos '?'religiosos ':'').toLowerCase():'';

/* ----- 1 · Bienvenida y agenda ----- */
RICH.tc1=()=>`<div class="ni tgx">${nbHero('Formación Transgeneracional · Clase 3','Memorias y votos','del linaje','Dos gráficos para profundizar: el Transgeneracional, con las memorias del linaje, y Votos o Pactos, para medir un voto heredado y anularlo con su oración.',['Transgeneracional','Memorias','Votos o Pactos','Oraciones'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="${N4P}trans/c3-portada.webp" alt="Unas manos sostienen una fotografía antigua de una familia: un padre, una madre y una niña"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#e6dcf2" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#b9a3f1" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3b4a24"/></svg></div>`)}</div>`;
RICH.tc2=()=>niAgenda('Clase 3',['Revisión de la tarea y ronda','El gráfico Transgeneracional','Las memorias del linaje','Memorias de violencia: leer con cuidado','La oración del linaje','El gráfico de Votos o Pactos','La oración para anular votos','Ejemplo, práctica, repaso y tarea'],
 ['Leer el gráfico Transgeneracional','Reconocer los grupos de memorias del linaje','Leer con cuidado las memorias de violencia','Medir un voto heredado y anularlo con la oración']);

/* ----- 2 · Revisión de la tarea y ronda ----- */
const TC_RV=['¿Qué tema apareció en el gráfico de Constelación?','¿Limpiaste directo o investigaste en el Mapa?','¿Qué notaste durante la semana?','¿A quién le apareció Votos o Transgeneracional? Lo trabajamos hoy','¿Qué duda te quedó?'];
RICH.tc3=()=>{const s=st('tc3',-1),t=st('tgt',-1),r=tgRead();
 return dkH('Lo que trajiste','Revisemos la tarea de la semana','La lealtad o repetición que limpiaste. Toca una pregunta para anotar tu respuesta.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">
 <div style="display:grid;gap:10px">${tgReadRow()}${t>=24?niBox('d','Tu tema: '+tgT(t),'Es justo lo que trabajamos hoy. '+(t===24?'Lo verás en el gráfico de Votos o Pactos.':'Lo verás en el gráfico Transgeneracional.')):r.every(Boolean)?niBox('l','Tu lectura de la semana','Linaje '+r[0].toLowerCase()+', '+r[1]+', escala '+r[2]+': '+r[3].toLowerCase()+'.'):niNote('Aquí aparece la lectura que marcaste en el gráfico de Constelación.')}</div>
 <div style="display:grid;gap:10px">${tbList('tc3',TC_RV)}${s>=0?`<div class="ni-in">${n3area('tc3a'+s,TC_RV[s],'Lo que noté…')}</div>`:''}</div></div>
 ${niQ('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.')}</div>`};
const TC_RO=[['lupa','Lo que comprendí','Algo de mi historia familiar que hoy miro distinto.'],['luna','Lo que cambió','Algo que sentí, soñé o noté distinto durante la semana.'],['chat','Lo que me pregunto','Una historia de mi árbol que todavía quiero mirar.']];
RICH.tc4=()=>{const s=st('tc4',-1);
 return dkH('La ronda','Ronda de descubrimientos','Elige una tarjeta y prepara tu frase.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nk-cards">${TC_RO.map((x,i)=>`<button ${rxa('set','tc4',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.08}s${i===2&&s!==i?';background:var(--ni-lil)':''}">${ic(x[0],24)}<b>${x[1]}</b><span>${x[2]}</span>${st('tc4a'+i,'')?'<small>Ya la anotaste</small>':''}</button>`).join('')}</div>
 ${s>=0?`<div class="ni-in">${n3area('tc4a'+s,TC_RO[s][1],'Una o dos frases…')}</div>`:niNote('Una o dos frases por persona.')}</div>`};

/* ----- 3 · El gráfico Transgeneracional ----- */
const TC_ST=[['l','Linaje','Materno o paterno, en el centro.'],['i','Anillo interior','11 memorias profundas del clan.'],['o','Anillo exterior','26 memorias del linaje.']];
RICH.tc5=()=>{const s=st('tc5',-1),r=trRead();
 return dkH('Transgeneracional','El gráfico Transgeneracional','Se lee de adentro hacia afuera. Toca cada paso o explora el gráfico.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('tc5O','trans/transgeneracional.webp','Lámina original del gráfico Transgeneracional de Casa Muladhara',trChart({ring:s>=0?TC_ST[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${niBox('l','Cuándo','Cuando Constelación marca «Transgeneracional».')}${tbList('tc5',TC_ST.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${tcRow(['Linaje','Interior','Exterior'],r)}</div></div>
 ${r.every(Boolean)?`<div class="ni-hyp ni-in"><span class="ni-tag">Tu lectura</span><p>Linaje <mark>${r[0].toLowerCase()}</mark>, memoria profunda de <mark>${r[1].toLowerCase()}</mark> y, en el anillo exterior, <mark>${r[2].toLowerCase()}</mark>.</p></div>`:''}
 ${niQ('Se lee de adentro hacia afuera y se cierra con la oración del linaje.')}</div>`};

/* ----- 4 · Las memorias del linaje ----- */
const tcMem=(key,eb,ti,sub,items,ask)=>{const s=st(key,-1),o=st(key+'v',{}),n=Object.keys(o).length;RX['tcm_'+key]=v=>{const O=st(key+'v',{});O[v]=1;RS[key+'v']=O;RS[key]=RS[key]===+v?-1:+v;render(false)};
 return dkH(eb,ti,sub+' Toca cada memoria para verla en el gráfico.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tc-side"><div class="tc-mem">${items.map((x,i)=>`<button class="${x[0]}${o[i]?' seen':''}" ${rxa('tcm_'+key,i)} ${pressed(s===i)} style="animation-delay:${i*.06}s"><small>Anillo ${x[0]==='i'?'interior':'exterior'}</small><b>${x[2]}</b>${s===i||o[i]?`<span${s===i?' class="ni-in"':''}>${x[3]}</span>`:'<em>Toca para ver</em>'}</button>`).join('')}</div>
 <div class="nj-fig">${trChart({hot:s>=0?items[s][0]+items[s][1]:items.map(x=>x[0]+x[1]),sel:s>=0?items[s][0]+items[s][1]:'',cap:n===items.length?'Viste todas las memorias de este grupo.':`${n} de ${items.length} memorias vistas.`})}</div></div>
 ${ask?tbAsk(ask):''}</div>`};
RICH.tc6=()=>tcMem('tc6','Memorias del linaje','Lo que se ocultó','Historias que la familia calló y que siguen buscando ser vistas.',[['i',0,'Secretos','Lo que se escondió para proteger el honor o evitar el dolor.'],['i',1,'Adulterio','Relaciones paralelas, hijos o amores escondidos.'],['o',8,'Niños no reconocidos','Hijos sin el apellido o sin el lugar de su padre o su madre.'],['o',9,'Hijo no deseado','Un embarazo que llegó en un momento difícil o no fue recibido.']],'¿Qué historia de tu árbol se cuenta en voz baja?');
RICH.tc7=()=>tcMem('tc7','Memorias del linaje','Las uniones','Cómo se unieron y se separaron nuestros ancestros marca cómo vivimos la pareja hoy.',[['o',3,'Matrimonio forzado','Uniones por obligación, conveniencia o presión familiar.'],['i',2,'Poligamia','Más de una pareja o familia al mismo tiempo.'],['o',2,'Madre soltera','Mujeres que criaron solas, a veces con vergüenza o rechazo.'],['o',7,'Divorcio / separación','Rupturas y lo que quedó pendiente entre las partes.']],'¿Qué forma de unirse o separarse se repite en tu familia?');
RICH.tc8=()=>tcMem('tc8','Memorias del linaje','Fertilidad y nacimientos','Lo que pasó con los hijos que llegaron, los que no llegaron y los que se criaron en otro hogar.',[['i',4,'Esterilidad','Dificultad para tener hijos en una o varias generaciones.'],['o',6,'Abortos / gemelos','Embarazos que no llegaron a término y gemelos que no nacieron.'],['i',3,'Adopciones','Hijos criados por otra familia, o que llegaron por adopción.']],'¿Qué historias de nacimientos conoces en tu árbol?');
RICH.tc9=()=>tcMem('tc9','Memorias del linaje','Exclusión y poder','Cuando alguien quedó fuera o alguien usó su lugar para dominar a otros.',[['o',5,'Exclusión de un miembro','Alguien rechazado, borrado o al que no se nombra.'],['o',0,'Abuso de la jerarquía','Autoridad usada para someter o controlar.'],['o',17,'Narcisismo / Psicopatía / Machismo','Formas de dominio que dañaron el clan.'],['o',10,'Discriminación racial','Rechazo por origen, color o pueblo.'],['o',23,'Obligaciones religiosas','Mandatos de fe impuestos o cumplidos por miedo.'],['o',4,'Doble por el nombre','Llevar el nombre de otro y parte de su destino.']]);
RICH.tc10=()=>tcMem('tc10','Memorias del linaje','La historia colectiva','Lo que el clan vivió junto a su pueblo, su país o su época.',[['i',5,'Guerras','Combates, persecuciones y lo que se perdió en ellos.'],['i',6,'Inanición','Hambre y escasez extrema.'],['o',18,'Esclavitud / terrorismo / prisión','Pérdida de la libertad o de la seguridad.'],['o',20,'Deportaciones / inmigraciones','Dejar o perder la tierra, la lengua y la familia.'],['o',21,'Muertes por cataclismos','Terremotos, inundaciones, incendios.'],['o',16,'Enfermedad / pandemia','Epidemias que golpearon a la familia.']]);
RICH.tc11=()=>tcMem('tc11','Memorias del linaje','Pérdidas, deudas y muertes','Lo que se perdió, lo que quedó debiendo y quienes partieron antes de tiempo.',[['o',19,'Pérdidas / asuntos financieros','Ruinas, quiebras o bienes perdidos.'],['o',24,'Deudas transgeneracionales','Lo que un ancestro quedó debiendo, material o emocionalmente.'],['o',22,'Intolerancia a la felicidad','Sentir que estar bien no está permitido.'],['o',25,'Muertes tempranas','Niños, jóvenes o padres que murieron antes de tiempo.'],['o',15,'Accidentes y tragedias','Hechos repentinos que marcaron a la familia.'],['o',1,'Enfermedades mentales','Sufrimiento psíquico que atravesó generaciones.']]);

/* ----- 5 · Memorias de violencia ----- */
const TC_CL=['Se nombra la memoria sin buscar detalles','Nunca se afirma que le pasó a una persona concreta','No se pregunta por lo que ocurrió','Si la consultante relata algo propio, se detiene la lectura, se acompaña y se sugiere apoyo profesional'];
const TC_VQ=[['«El gráfico muestra una posible memoria de violencia en el linaje paterno.»',0],['«¿Qué le pasó exactamente a tu abuela?»',1],['La consultante cuenta algo que vivió ella: detengo la lectura y la acompaño.',0],['«A tu bisabuelo lo asesinaron.»',1]];
RX.tcq=(k,v)=>{const [key,i]=k.split('.'),o=st(key,{});o[i]=+v;RS[key]=o;render(false)};
RICH.tc12=()=>{const s=n3clamp(st('tc12',0),0,4),o=st('tc12q',{}),ok=TC_VQ.filter((q,i)=>o[i]===q[1]).length;
 return dkH('Leer con cuidado','Memorias de violencia: leer con cuidado','Primero la forma de leerlas. Después, decide qué sí y qué no.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:10px">
 <div class="tb-c w"><h3>Electra / Edipo</h3><p style="font-size:.92rem">Una dinámica familiar: la hija o el hijo ocupa, en lo emocional, el lugar de pareja de su padre o su madre.</p></div>
 <div class="tb-c" style="background:var(--ni-lil);color:#3b2a5a"><h3>Memorias de violencia</h3><p style="font-size:.92rem">Abusos / tortura · Pederastia · Violaciones · Crímenes · Asesinatos · Incestos. Hechos graves que pudo vivir el clan y que hoy pueden pesar como miedo, vergüenza o silencio.</p></div></div>
 <div class="tb-c d"><h3 style="color:#fff">Cómo se leen</h3><div class="tb-ls">${TC_CL.map((x,i)=>i<s?`<button style="cursor:default;background:rgba(236,231,211,.1);border-color:transparent;color:#ece7d3;animation-delay:${i===s-1?0:0}s" tabindex="-1"><i>${i+1}</i><span>${x}</span></button>`:'').join('')}</div>
 ${s<4?`<div><button class="btn btn-ghost btn-sm" style="color:#ece7d3;border-color:#d9c9ef" ${rxa('set','tc12',s+1)}>${s?'Siguiente':'Ver cómo se leen'}</button></div>`:''}</div></div>
 <div class="tb-warn">${ic('escudo',22)}<span>Ante cualquier riesgo actual para alguien, se contacta a los servicios de emergencia.</span></div>
 ${s>=4?`<div class="dk-sub">¿Así se lee?</div><div class="tb-quiz ni-in">${TC_VQ.map((q,i)=>{const a=o[i],r=a===undefined?'':a===q[1]?'ok':'no';return `<div class="${r}"><span>${q[0]}</span><div class="dk-chips">${['Sí','No'].map((d,j)=>`<button class="chip" ${rxa('tcq','tc12q.'+i,j)} ${pressed(a===j)}>${d}</button>`).join('')}</div></div>`}).join('')}</div>
 ${ok===4?niQ('Así es: se nombra la memoria, nunca se afirma ni se pregunta qué pasó, y se acompaña a la persona.'):niNote(`${ok} de 4 respondidas bien.`)}`:''}
 <div class="nj-fig" style="max-width:560px">${trChart({hot:['i7','i8','i9','i10','o11','o12','o13'],cap:'Las memorias de violencia y Electra / Edipo en el gráfico.'})}</div></div>`};

/* ----- 6 · La oración del linaje ----- */
const tcName=()=>`<div class="tc-name"><label>Tu nombre, para decir la oración<input type="text" data-rsin="tcnm" value="${esc(st('tcnm',''))}" placeholder="Escribe tu nombre"></label><button class="btn btn-ghost btn-sm" ${rxa('set','tcnmk',st('tcnmk',0)+1)}>Ponerlo en la oración</button></div>`;
RICH.tc13=()=>{const n=esc(st('tcnm',''))||'…………';
 return dkH('Cierre de la lectura','La oración del linaje','Escribe tu nombre y dila frase a frase.')+`<div class="ni" style="display:grid;gap:12px">${tcName()}${n3pray('tcor',['Pido a mi Yo Superior, maestros ascendidos y seres de luz de la más alta vibración,','que por favor limpien todo mi linaje ancestral, que corten todos los votos y energías negativas del pasado que ya no sirvan para el desarrollo y evolución de mi Alma en tiempo presente.','Hoy reconozco, limpio, sano, libero y agradezco a todos mis ancestros por las experiencias del pasado.',`Hoy yo ${n} con plena consciencia creo mi propia historia.`,'Gracias, gracias, gracias.'])}</div>`};

/* ----- 7 · El gráfico de Votos o Pactos ----- */
const TC_VS=['Nunca más volveré a amar.','Juro no ser como mi padre.','Dedicaré mi vida a Dios.','De esto no se hablará jamás.'];
RICH.tc14=()=>{const d=st('tc14',-1),o=st('tc14v',{});
 return dkH('Votos o Pactos','Cuándo se va al gráfico de Votos','Un voto es una promesa, un juramento o un pacto que alguien hizo y que sigue actuando en el clan.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">
 <div class="tb-c d"><h3 style="color:#fff">Se llega desde</h3><div class="tb-dec" style="grid-template-columns:1fr">${[['Constelación Familiar','El sector «Votos (ir al gráfico)».'],['Transgeneracional','El sector «Votos (ir a Votos)».']].map((x,i)=>`<button ${rxa('set','tc14',d===i?-1:i)} ${pressed(d===i)}><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div></div>
 <div style="display:grid;gap:10px"><div class="dk-sub">Cómo puede sonar un voto</div><div class="tc-vow">${TC_VS.map((x,i)=>`<button ${rxa('tog','tc14v',i)} ${pressed(!!o[i])} style="animation-delay:${i*.1}s">«${x}»</button>`).join('')}</div></div></div>
 ${d>=0?`<div class="ni-in nj-fig" style="max-width:600px">${d?trChart({hot:'o14',sel:'o14',cap:'En el Transgeneracional: Votos (ir a Votos).'}):tgChart({hot:[24],cap:'En Constelación Familiar: Votos (ir al gráfico).'})}</div>`:''}
 ${tbAsk('¿Qué promesa crees que hizo alguien de tu familia y aún pesa?')}${n3area('tc14a','Anótala como la diría esa persona','«Nunca…»')}</div>`};
const TC_VP=[['v','Voto','Cuál de los 27 votos está activo.'],['n','Nivel','Bajo, medio, alto o muy alto.'],['e','Escala','De 0 a 100: cuánto pesa hoy.']];
RICH.tc15=()=>{const s=st('tc15',-1),r=tvRead();
 return dkH('Votos o Pactos','El gráfico de Votos o Pactos','Tres medidas. Toca cada una o explora el gráfico.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('tc15O','trans/votos.webp','Lámina original del gráfico de Votos o Pactos de Casa Muladhara',tvChart({ring:s>=0?TC_VP[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('tc15',TC_VP.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${tcRow(['Voto','Nivel','Escala'],r)}${niBox('l','Se anula con la oración de Votos','La verás más adelante en esta clase.')}</div></div>
 ${r.every(Boolean)?`<div class="ni-hyp ni-in"><span class="ni-tag">Tu medida</span><p>El voto activo es <mark>${r[0].toLowerCase()}</mark>, de nivel <mark>${r[1].toLowerCase()}</mark>, con una escala de <mark>${r[2]}</mark>.</p></div>`:''}</div>`};
const TC_FR=[[1,'Votos de pobreza','El dinero llega y no se queda.'],[5,'Votos de obediencia','Cuesta decir que no.'],[16,'Votos de silencio','No poder expresar lo que siento.'],[22,'Votos de sacrificio','Darlo todo y no recibir.'],[18,'Votos religiosos','Culpa ante el placer o la abundancia.'],[19,'Renunciar al amor','Relaciones que no llegan a concretarse.'],[4,'Votos de castidad','Bloqueo para disfrutar del cuerpo y la pareja.'],[20,'Votos de soledad','Sentirse sola aun acompañada.']];
RICH.tc16=()=>{const s=st('tc16',-1),o=st('tc16v',{}),n=Object.keys(o).length,ef=st('tc16e',0);RX.tcfr=v=>{const O=st('tc16v',{});O[v]=1;RS.tc16v=O;RS.tc16=RS.tc16===+v?-1:+v;RS.tc16e=0;render(false)};
 return dkH('Votos o Pactos','Votos frecuentes en el linaje','Toca cada voto para ver cómo se nota y dónde está en el gráfico.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tc-side"><div class="tc-mem">${TC_FR.map((x,i)=>`<button class="${i%3===0?'i':''}${o[i]?' seen':''}" ${rxa('tcfr',i)} ${pressed(s===i)} style="animation-delay:${i*.05}s"><b>${x[1]}</b>${s===i||o[i]?`<span${s===i?' class="ni-in"':''}>${x[2]}</span>`:'<em>Toca para ver</em>'}</button>`).join('')}</div>
 <div class="nj-fig">${tvChart({hot:ef?[13,2]:s>=0?[TC_FR[s][0]]:TC_FR.map(x=>x[0]),cap:ef?'Creencias limitantes · Depresiones y adicciones.':`${n} de 8 votos vistos.`})}</div></div>
 <div class="tb-c d"><p><b style="color:#fff">También aparecen efectos de un voto:</b> creencias limitantes, depresiones y adicciones. Al encontrarlos, se busca el voto que los origina.</p><div><button class="btn btn-ghost btn-sm" style="color:#ece7d3;border-color:#d9c9ef" ${rxa('set','tc16e',ef?0:1)} ${pressed(!!ef)}>${ef?'Volver a los votos':'Ver los efectos en el gráfico'}</button></div></div></div>`};
RICH.tc17=()=>{const s=st('tc17',-1);
 return dkH('Votos o Pactos','Votos del linaje y votos de vidas pasadas','Toca cada tarjeta.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tg-two">${[['En esta formación','Votos heredados del linaje','Promesas y pactos de padres, abuelos o bisabuelos que siguen actuando en el clan. Se llega desde Constelación o Transgeneracional.','d'],['En Vidas pasadas','Votos de otras vidas','Votos que el alma trae de vidas anteriores. Se profundizan en la formación de Vidas Pasadas.','w']].map((x,i)=>`<button class="tb-c ${x[3]}" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:20px;display:grid;gap:10px;align-content:start;${i?'background:var(--nb-paper);border:1px solid var(--nb-line)':'background:var(--ni-olv);color:#ece7d3'};${s===i?'box-shadow:0 0 0 3px var(--ni-lil2);transform:translateY(-3px)':''};transition:transform .3s" ${rxa('set','tc17',s===i?-1:i)} ${pressed(s===i)}><span class="ni-tag"${i?'':' style="color:#d9c9ef"'}>${x[0]}</span><h3 style="margin:0;font:400 1.35rem/1.2 var(--f-display)${i?'':';color:#fff'}">${x[1]}</h3>${s===i?`<p class="ni-in" style="margin:0;line-height:1.55${i?'':';color:#dfe3cf'}">${x[2]}</p>`:`<em style="font-style:normal;font-size:.75rem;opacity:.75">Toca para ver</em>`}</button>`).join('')}</div>
 ${niQ('La oración de Votos sirve para ambos: nombra las vidas pasadas y también lo heredado del linaje.')}</div>`};

/* ----- 8 · La oración para anular votos ----- */
RICH.tc18=()=>{const n=esc(st('tcnm',''))||'…………',v=st('tvv',-1),vt=v>=0?tvDe(tcClean(TV_V[v])):'………';
 return dkH('Anular un voto','La oración de Votos','Escribe tu nombre, elige el voto y dila frase a frase.')+`<div class="ni" style="display:grid;gap:12px">${tcName()}
 <div><div class="dk-sub">El voto que vas a anular</div>${chipRow('tvv',TV_V.map(tcClean),v)}</div>
 ${n3pray('tcvo',['Desde mi amada y divina presencia YO SOY, a todos mis guías y seres de luz que me acompañan,','pido permiso para anular todos los votos kármicos limitantes contraídos en cualquier vida pasada, simultánea, plano o dimensión en que mi ser exista, o heredados de mi linaje.',`Yo ${n} anulo y cancelo todos los votos de ${esc(vt)},`,'me libero de ellos para siempre y los transformo, recuperando así mi poder personal y mi voluntad.','Gracias, gracias, gracias.'])}</div>`};

/* ----- 9 · Ejemplo, práctica, repaso y tarea ----- */
const TC_EJ=[['Constelación','Materno · 4ta · 60 · Votos'],['Votos','Renunciar al amor'],['Nivel y escala','Alto · 70'],['Cierre','Oración de Votos y del linaje']];
RX.tcex=()=>{RS.tgl=0;RS.tgg=3;RS.tge=12;RS.tgt=24;RS.tvv=19;RS.tvn=2;RS.tve=14;RS.tc19c=1;render(false)};
RICH.tc19=()=>{const s=n3clamp(st('tc19',0),0,5),c=st('tc19c',0);
 return dkH('Ejemplo','Ejemplo de lectura','Consultante: L. M., sus relaciones no prosperan.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nj-flow">${TC_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"${i===0?' style="background:#f6d3ef;border-color:#f6d3ef"':i===1?' style="background:var(--ni-lil);border-color:var(--ni-lil)"':''}><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s>=5?`<div class="ni-box d ni-in"><b>Comprensión posible</b><p>Una bisabuela materna se prometió no volver a amar tras perder a su esposo.</p></div>
 ${c?`<div class="dk-grid c2 ni-in"><div>${tgChart({cap:'Constelación: materno, 4ta generación, 60, Votos.'})}</div><div>${tvChart({cap:'Votos: renunciar al amor, alto, 70.'})}</div></div>`:''}
 <div class="dk-cta" style="justify-content:center">${c?'':`<button class="btn btn-primary btn-sm" ${rxa('tcex',0)}>Verlo en los gráficos</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','tc19',0)}>Ver de nuevo</button></div>`:
 `<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','tc19',s+1)}>${s===0?'Empezar':s===4?'Ver la comprensión':'Siguiente'}</button></div>`}</div>`+niNote('Ejemplo ficticio.')};
const TC_PS=[['Lean en Constelación','El tema que anotaste en la tarea.'],['Si es Transgeneracional','Lean linaje, anillo interior y anillo exterior.'],['Si es Votos','Midan el voto, su nivel y la escala, y digan la oración de Votos.'],['Cierren','Con la oración del linaje, completen la ficha y cambien de rol.']];
RICH.tc20=()=>{const s=n3clamp(st('tc20',0),0,3);
 return dkH('Práctica en parejas','Ahora en parejas','Cuatro pasos. Anota en la ficha lo que aparece.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${TC_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','tc20',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','tc20',s+1)}>Siguiente paso</button></div>`:''}
 ${niFicha('tcf',['Fecha','Consultante','Motivo','Constelación','Transgeneracional','Voto','Nivel · Escala','Oraciones','Verificada'],['Ej.: 18/11','L. M.','Sus relaciones no prosperan','Materno · 4ta · 60 · Votos','—','Renunciar al amor','Alto · 70','Votos y linaje','Sí'],()=>{const g=tgRead(),t=trRead(),v=tvRead();return [tbHoy(),'','',g.filter(Boolean).join(' · '),t.filter(Boolean).join(' · '),v[0],[v[1],v[2]].filter(Boolean).join(' · '),'','']},1100)}</div>`+n3priv};
RICH.tc21=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('tccp',[['diana','1 · ¿En qué orden se lee el gráfico Transgeneracional?','<b>De adentro hacia afuera:</b> primero el linaje en el centro, después el anillo interior con sus 11 memorias profundas y luego el anillo exterior con sus 26 memorias. Se cierra con la oración del linaje.'],['escudo','2 · ¿Cómo se lee una memoria de violencia?','<b>Con cuidado:</b> se nombra sin buscar detalles, nunca se afirma que le pasó a una persona concreta y no se pregunta por lo que ocurrió. Si la consultante relata algo propio, se detiene la lectura, se acompaña y se sugiere apoyo profesional.'],['enlace','3 · ¿Desde qué gráficos se llega a Votos?','<b>Desde Constelación Familiar</b>, en el sector «Votos (ir al gráfico)», <b>y desde el Transgeneracional</b>, en el sector «Votos (ir a Votos)».']],'c4',290)}</div>`;
RICH.tc22=()=>dkH('Cierre de la clase','Tarea para la Clase 4','Una memoria y un voto de tu linaje.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('tcta',[['lupa','Investiga en tu linaje una memoria del Transgeneracional y un voto'],['diana','Mide linaje y anillos; y el voto con su nivel y escala'],['limpia','Limpia, di la oración de Votos y cierra con la oración del linaje'],['libro','Completa la ficha y tráela a la Clase 4']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 4.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Recuerda','Lee siempre en hipótesis y con cuidado. Si aparece una memoria de violencia, nómbrala sin buscar detalles.')}<div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${S.lesson[1]-6}">Abrir el Transgeneracional</button><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${S.lesson[1]-2}">Abrir Votos o Pactos</button><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${S.lesson[1]-1}">Oración de Votos</button></div></div></div>`;

/* ---------- Nivel 4 · Formación Transgeneracional · Clase 4 ---------- */
const TD_PH=`${N4P}trans/c4-portada.webp`;
const tdPhoto=alt=>`<div class="ni-ph"><img src="${TD_PH}" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#f6d3ef" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#c9c9f5" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#e9c46a"/></svg></div>`;

/* ----- 1 · Bienvenida y agenda ----- */
RICH.td1=()=>`<div class="ni tgx">${nbHero('Formación Transgeneracional · Clase 4','La sesión','transgeneracional','Todo lo aprendido se integra en una sesión completa: antes, durante y después, cómo comunicar una memoria sin culpar, cuándo derivar y la evaluación práctica.',['Encuadre','Protocolo','Cierre','Evaluación'],'Karen Oyarce · Maestra Holística',tdPhoto('Una mujer sentada al pie de un árbol, con los ojos cerrados y las manos en el pecho'))}</div>`;
RICH.td2=()=>niAgenda('Clase 4',['Revisión de la tarea','El camino recorrido','La sesión: antes, durante y después','Comunicar y cuidar','Cierre y ficha de sesión','Demostración y evaluación práctica','Niño interno y linaje','Repaso y certificación','Ritual, oración y cierre'],
 ['Realizar una sesión transgeneracional completa','Comunicar una memoria sin culpar a los ancestros','Cuidar los temas sensibles y derivar','Aprobar la evaluación práctica']);

/* ----- 2 · Revisión de la tarea ----- */
RICH.td3=()=>dkH('Lo que trajiste','Revisemos la tarea de la semana','La memoria y el voto en tu linaje. Marca las preguntas a medida que las conversan.')+
 `<div class="ni tgx dk-grid c2" style="align-items:start"><div class="nj-card l ni-in" style="min-height:0"><h3>La memoria y el voto en tu linaje</h3>${n3ck('tdt1',[['lupa','¿Qué memoria apareció en el Transgeneracional? ¿En qué anillo?'],['diana','¿Qué voto encontraste? ¿Con qué nivel y escala?'],['voz','¿Cómo te sentiste al decir la oración de Votos?'],['hoja','¿Qué cambió en ti durante la semana?'],['chat','¿Qué duda te quedó?']])}</div>
 <div style="display:grid;gap:10px"><div class="dk-sub">Lo que marcaste en los gráficos</div>${tcRow(['Linaje','Interior','Exterior'],trRead())}${tcRow(['Voto','Nivel','Escala'],tvRead())}<div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},20">Transgeneracional</button><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},24">Votos o Pactos</button></div></div></div>`+
 niNote('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.');

/* ----- 3 · El camino recorrido ----- */
const TD_CA=[['Clase 1','El árbol y el clan','Lo transgeneracional, el árbol de cuatro generaciones, las leyes del clan y Constelación.',0],['Clase 2','Lealtades, roles y repeticiones','Lo que el clan pide sin decirlo y el protocolo: limpiar directo o investigar.',9],['Clase 3','Memorias y votos','El Transgeneracional, las memorias del linaje y el gráfico de Votos.',18],['Clase 4','La sesión completa','Antes, durante y después; comunicación, cuidado y evaluación.',27]];
RICH.td4=()=>dkH('El camino recorrido','El camino recorrido','Toca una clase para volver a ella.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nl-path">${TD_CA.map((x,i)=>`<button data-les="${S.lesson[0]},${x[3]}" style="animation-delay:${i*.12}s"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span><em>${i<3?'Repasar':'Hoy'}</em></button>`).join('')}</div>
 ${niQ('Hoy todo se integra en una sesión transgeneracional completa.')}</div>`;

/* ----- 4 · La sesión: antes, durante y después ----- */
const TD_MO=[['Antes','Unos 10 minutos',10,['Encuadre y consentimiento','Motivo de consulta','Datos del árbol'],'#e6dcf2','#3b2a5a'],['Durante','Unos 40 minutos',40,['Constelación Familiar','Limpiar directo o investigar','Transgeneracional y Votos'],'#3b4a24','#ece7d3'],['Después','Unos 10 minutos',10,['Comunicar sin culpar','Oraciones de cierre','Registrar la ficha'],'#d6e8e2','#1f3f32']];
RICH.td5=()=>{const s=st('tdmo',-1);
 return dkH('La sesión','La sesión en tres momentos','Una hora de sesión. Toca un momento en la barra.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nl-bar">${TD_MO.map((x,i)=>`<button ${rxa('set','tdmo',s===i?-1:i)} ${pressed(s===i)} style="flex:${x[2]};background:${x[4]};color:${x[5]}">${x[0]} · ${x[2]} min</button>`).join('')}</div>
 <div class="nl-mom">${TD_MO.map((x,i)=>`<div class="${s<0?'':s===i?'on':'off'}" style="background:${x[4]};color:${x[5]}"><h3>${x[0]}</h3><small>${x[1]}</small><ul>${x[3].map((y,j)=>`<li style="animation-delay:${j*.08}s">${y}</li>`).join('')}</ul></div>`).join('')}</div></div>`+
 niNote('Tiempos de referencia para una sesión de una hora.')};
RICH.td6=()=>dkH('Momento 1','Antes: encuadre y datos del árbol','Marca cada paso a medida que lo haces.')+
 `<div class="ni nl-say"><div>${n3ck('tdan',[['persona','Presentarte y explicar en qué consiste el trabajo transgeneracional'],['escudo','Aclarar lo que no es: no reemplaza una terapia ni hace diagnósticos'],['candado','Explicar la confidencialidad y pedir el consentimiento'],['chat','Preguntar el motivo de consulta: qué le gustaría mirar hoy'],['arbol','Pedir los datos del árbol que conozca: nombres, fechas, sucesos'],['loto','Abrir con la oración de conexión']],['Sigue el orden: el encuadre va antes de leer el árbol.','¡Encuadre completo! Ya puedes empezar con Constelación.'])}</div>
 <div class="nl-frase"><span class="ni-tag">Frase para empezar</span><p>«Vamos a mirar juntas la historia de tu linaje. Lo que aparezca es una posibilidad que tú confirmas o descartas con lo que sabes de tu familia. ¿Estás de acuerdo en que comencemos?»</p></div></div>`;
const TD_DU=[['Paso 1','Constelación Familiar','Linaje, generación, escala y tema.',[['Abrir Constelación',6]]],['Paso 2','Decidir','Limpiar directo con Energías Discordantes o investigar.',[['Repasar el protocolo',15]]],['Paso 3','Investigar','Mapa de Emociones, Transgeneracional o Votos.',[['Mapa','0,16'],['Transgeneracional',20],['Votos',24]]],['Paso 4','Limpiar','Como aprendiste; los votos se anulan con su oración.',[['Oración de Votos',25]]],['Paso 5','Verificar','Confirmar con el péndulo que la limpieza se completó.',[['Repasar en Niño interior','0,17']]]];
RICH.td7=()=>{const s=n3clamp(st('tddu',0),0,4),x=TD_DU[s];
 return dkH('Momento 2','Durante: el protocolo completo','Cinco pasos. Toca uno para verlo o repasarlo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-proto td-5">${TD_DU.map((p,i)=>`<button class="${i===4?'new':''}" ${rxa('set','tddu',i)} ${pressed(i===s)} style="animation-delay:${i*.08}s"><small>${p[0]}</small><b>${p[1]}</b><span>${p[2]}</span></button>`).join('')}</div>
 <div class="nj-det"><div><span class="ni-tag">${x[0]}</span><br><b>${x[1]}</b><p>${x[2]}</p></div><div style="display:flex;gap:6px;flex-wrap:wrap">${x[3].map(b=>`<button class="btn btn-ghost btn-sm" data-les="${typeof b[1]==='string'?b[1]:S.lesson[0]+','+b[1]}">${b[0]}</button>`).join('')}</div></div>
 ${niBox('l','Entre un gráfico y otro, pregunta a la persona qué sabe de esa historia.','La sesión es una conversación, no una lectura en voz alta.')}</div>`};

/* ----- 5 · Comunicar y cuidar ----- */
RICH.td8=()=>dkH('Comunicación','Comunicar sin culpar a los ancestros','¿Se dice así o se evita? Lleva cada frase a su columna.')+
 niSort('tdco',[['«El gráfico muestra una posible memoria de pérdidas en el linaje paterno. ¿Te hace sentido?»',0],['«Tu abuelo arruinó a la familia.»',1],['«¿Qué sabes de tus abuelos en ese tema?»',0],['«En tu familia hubo un abuso, seguro.»',1],['«Tu abuela hizo lo que pudo con lo que tenía.»',0],['«Tu madre te pasó su enfermedad.»',1],['«Lo que no te pertenece, hoy lo puedes liberar.»',0],['«Con esta sesión se limpia todo tu linaje.»',1]],
 [['Decir así','','t','Decir así'],['Evitar','','l','Evitar']],'Hablamos en hipótesis, sin culpar, sin afirmar hechos y sin prometer resultados.','Mira otra vez: ¿la frase habla en hipótesis o culpa, afirma o promete?');
RICH.td9=()=>{const o=st('tdse',{}),on=Object.values(o).some(Boolean);
 return dkH('Cuidado','Temas sensibles y derivación','Marca una señal de alerta para ver qué hacer.')+
 `<div class="ni nl-alert"><div class="nj-card" style="background:#f6e2e8;color:#5a2a3a"><h3>Señales de alerta</h3>${n3ck('tdse',[['escudo','La persona relata un abuso o una violencia propia'],['gota','Angustia intensa que no baja con el cierre'],['rayo','Recuerdos traumáticos que irrumpen con fuerza'],['xcirc','Ideas de hacerse daño']])}</div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><h3>Qué hacer</h3><div class="nl-do${on?' on':''}">${NL_DO.map((x,i)=>`<div style="animation-delay:${i*.12}s"><span class="n">${i+1}</span><span>${x}</span></div>`).join('')}</div>${on?'':'<p style="margin:0;color:#dfe3cf;font-size:.86rem">Marca una señal a la izquierda.</p>'}</div></div>`+
 `<div class="ni">${niQ('Acompañar también es saber cuándo derivar.')}</div>`};

/* ----- 6 · Cierre y ficha de sesión ----- */
RICH.td10=()=>dkH('Momento 3','Después: cierre de la sesión','Marca cada paso a medida que lo haces.')+
 `<div class="ni nl-say"><div>${n3ck('tdde',[['chat','Resumir la lectura en una frase y preguntar cómo se siente'],['voz','Si hubo votos, decir juntas la oración de Votos'],['paloma','Cerrar con la oración del linaje'],['loto','Agradecer al comité espiritual y cerrar el espacio'],['libro','Registrar la ficha y acordar un seguimiento si hace falta']],['Cierra con calma, sin apurar.','¡Sesión cerrada con cuidado!'])}
 <div class="dk-cta" style="flex-wrap:wrap;margin-top:8px"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},25">Oración de Votos</button><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},23">Oración del linaje</button></div></div>
 <div class="nl-frase d"><span class="ni-tag">Frase para cerrar</span><p>«Hoy miraste una parte de la historia de tu clan. Lo que reconociste ya no tiene que repetirse. Date tiempo para integrarlo. ¿Cómo te sientes ahora?»</p></div></div>`;
RICH.td11=()=>dkH('Registro','Ficha de sesión transgeneracional','Constelación: linaje · generación · escala · tema. Investigación: Mapa, Transgeneracional o Votos. El botón la llena con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:12px">${niFicha('tdf',['Fecha','Consultante','Motivo','Constelación','Investigación','Voto · nivel · escala','Verificada','Oraciones'],['Ej.: 18/11','L. M.','Relaciones que no prosperan','Materno · 4ta · 60 · Votos','Votos','Renunciar al amor · Alto · 70','Sí','Votos y linaje'],
 ()=>{const g=tgRead(),t=trRead(),v=tvRead(),m=njMapaTxt();return [tbHoy(),'','',g.filter(Boolean).join(' · '),v[0]?'Votos':t.some(Boolean)?'Transgeneracional':m?'Mapa: '+m:'',v.filter(Boolean).join(' · '),'',v[0]?'Votos y linaje':'Linaje']},1060)}</div>`+
 niNote('Usa iniciales; la primera fila es un ejemplo ficticio.');

/* ----- 7 · Demostración y evaluación práctica ----- */
RICH.td12=()=>dkH('En vivo','Demostración en vivo','Observa la sesión completa y toma nota.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="nj-card l" style="min-height:0"><h3>Una sesión completa en vivo</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;line-height:1.5" class="ni-st"><li>Con una voluntaria del grupo y un tema liviano</li><li>Antes, durante y después, sin saltar pasos</li><li>De Constelación al gráfico que corresponda</li><li>Pausas breves para explicar cada decisión</li></ul></div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3;min-height:0"><h3>Mientras observas</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;line-height:1.5;color:#dfe3cf" class="ni-st"><li>Observa el orden de los pasos</li><li>Anota una frase que quieras usar</li><li>Anota una pregunta para el final</li></ul></div></div>
 <div class="ni dk-grid c2">${n3area('tdnf','Una frase que quiero usar','«…»')}${n3area('tdnq','Una pregunta para el final','¿…?')}</div>`+n3priv;
const TD_RO=[['Consultante','Recibe la sesión','Trae un tema liviano de su linaje y responde con honestidad.','l'],['Facilitadora','Realiza la sesión completa','Antes, durante y después, con la ficha.','t'],['Observadora','Observa y acompaña','Sigue la sesión paso a paso y da una devolución amable.','b']];
RX.tdobr=()=>{delete RS.tdob;render(false)};
const TD_OB=[['Antes','Encuadre y consentimiento'],['Antes','Motivo de consulta y datos del árbol'],['Durante','Constelación Familiar'],['Durante','Limpiar directo o investigar'],['Durante','Transgeneracional o Votos, si corresponde'],['Durante','Verificar con el péndulo'],['Después','Comunicar sin culpar'],['Después','Oraciones de cierre'],['Después','Registrar la ficha']];
RICH.td13=()=>{const r=n3clamp(st('tdr',0),0,2),A=['Alumna A','Alumna B','Alumna C'],o=st('tdob',{}),n=TD_OB.filter((_,i)=>o[i]).length;
 return dkH('Evaluación práctica','Evaluación práctica en tríos','Tres rondas: todas pasan por los tres roles. Toca una ronda para ver quién hace qué.')+
 `<div class="ni" style="display:grid;gap:14px">${chipRow('tdr',['Ronda 1','Ronda 2','Ronda 3'],r)}
 <div class="nl-role">${TD_RO.map((x,i)=>`<div class="nj-card ${x[3]}" style="min-height:0"><span class="ni-tag">${x[0]}</span><span class="who" style="animation-delay:${i*.1}s">${A[(i+r)%3]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div>
 ${niBox('d','Tres rondas','Todas pasan por los tres roles. Cada ronda, unos 30 minutos de sesión y 5 de devolución.')}
 <div class="dk-sub">Para la observadora: sigue la sesión paso a paso</div><div class="tb-gold">${TD_OB.map((x,i)=>`<button ${rxa('tog','tdob',i)} ${pressed(!!o[i])} style="animation-delay:${i*.04}s"><i>${o[i]?'✓':''}</i><b>${x[1]}</b><span>${x[0]}</span></button>`).join('')}</div>
 <div class="prog"><span>${n} de ${TD_OB.length} pasos observados</span><div class="bar"><i style="width:${n/TD_OB.length*100}%"></i></div></div>
 ${n===TD_OB.length?`<div class="dk-call ni-in">Sesión completa, sin saltar pasos. Ahora, una devolución amable.</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('tdobr',0)}>Observar otra ronda</button></div>`:''}</div>`};

/* ----- 8 · Niño interno y linaje ----- */
RICH.td14=()=>{const v=st('td14',-1),h=nigSel('he');
 return dkH('Dos caminos','Niño interno y linaje: cómo se complementan','Toca cada forma de unirlos.')+
 `<div class="ni tgx" style="display:grid;gap:14px"><div class="tg-two"><div class="tb-c w"><span class="ni-tag">Niño interno</span><h3>Lo que viví</h3><p>Las heridas de mi infancia, mis máscaras y quién las provocó.</p><div><button class="btn btn-ghost btn-sm" data-les="0,0">Ir a Niño interior</button></div></div>
 <div class="tb-c d"><span class="ni-tag" style="color:#d9c9ef">Transgeneracional</span><h3 style="color:#fff">Lo que heredé</h3><p>Las memorias, lealtades y votos que llegaron a través del clan.</p></div></div>
 ${tbList('td14',['Si una herida del niño interno también la vivió la madre o el padre, se mira en el linaje.','Si una memoria del linaje se limpia, se observa cómo responde el niño interno.'])}
 ${v===0?`<div class="ni-in dk-grid c2" style="align-items:center"><div>${tgTree({hg:1})}</div>${niBox('l','Tu herida: '+NI_H[n3clamp(h,0,4)].n.toLowerCase(),'Pregúntate si también la vivió tu madre o tu padre. Si es así, mírala en el linaje con Constelación.')}</div>`:
 v===1?`<div class="ni-in dk-grid c2" style="align-items:center"><div>${tgTree({hg:0})}</div>${niBox('t','Después de limpiar','Observa cómo responde tu niño interno: lo que sientes, sueñas o notas distinto. Puedes volver a medir tu gráfico del niño interno.')}</div>`:''}</div>`};

/* ----- 9 · Repaso y certificación ----- */
RICH.td15=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('tdcp',[['escudo','1 · ¿Qué se aclara siempre en el encuadre, antes de leer el árbol?','<b>En qué consiste el trabajo transgeneracional y lo que no es:</b> no reemplaza una terapia ni hace diagnósticos. Se explica la confidencialidad y se pide el consentimiento.'],['chat','2 · Di como hipótesis: «Tu abuelo arruinó a la familia.»','<b>Por ejemplo:</b> «El gráfico muestra una posible memoria de pérdidas en el linaje paterno. ¿Te hace sentido? ¿Qué sabes de tus abuelos en ese tema?»'],['corazon','3 · ¿Qué haces si una consultante relata un abuso propio?','<b>Detener la lectura y no profundizar,</b> acompañar con calma y presencia, y sugerir la ayuda de un profesional de salud. Ante riesgo inmediato, contactar a los servicios de emergencia.']],'c4',280)}</div>`;
const TD_RQ=[['grupo','Asistencia','Participar en las cuatro clases de la formación.'],['libro','Tareas','Entregar las tres tareas: el árbol, la lealtad o repetición, y la memoria y el voto.'],['check','Evaluación práctica','Aprobar la sesión observada en tríos.']];
RICH.td16=()=>{const o=st('tdrq',{}),n=TD_RQ.filter((_,i)=>o[i]).length;
 return dkH('Certificación','Requisitos para la certificación','Marca los que ya cumples.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="nl-req td-3">${TD_RQ.map((x,i)=>`<button ${rxa('tog','tdrq',i)} ${pressed(!!o[i])} style="animation-delay:${i*.08}s"><i>${o[i]?'✓':''}</i><div><b>${x[1]}</b><span>${x[2]}</span></div></button>`).join('')}</div>
 <div class="prog"><span>${n} de 3</span><div class="bar"><i style="width:${n/3*100}%"></i></div></div>
 ${n===3?niQ('¡Cumples los tres requisitos para tu certificación en la Formación Transgeneracional!'):''}</div>`};

/* ----- 10 · Ritual, oración y cierre ----- */
RICH.td17=()=>dkH('Ritual de cierre','Honrar a los ancestros','Lo hacemos juntas, frase a frase.')+`<div class="ni">${n3pray('tdho',['Cierra los ojos y siente detrás de ti a tu madre y a tu padre; detrás de ellos, a sus padres.','Di en tu interior: «Gracias por la vida. Tomo lo bueno que me dieron.»','«Lo que les pertenece, se lo dejo con amor.»','Siente el apoyo de tu linaje a tu espalda y da un paso hacia adelante.'])}</div>`;
RICH.td18=()=>dkH('Cierre de la formación','Oración de agradecimiento','La decimos juntas para cerrar el camino.')+`<div class="ni">${n3pray('tdor',['Amado Yo Superior, ángeles, arcángeles, seres de luz, todo mi comité espiritual: gracias por acompañarnos en este camino.','Gracias a nuestros ancestros, a cada madre y a cada padre que nos antecedió, por la vida que llegó a través de ellos.','Gracias por cada memoria reconocida, por cada voto liberado, por cada historia que hoy miramos con amor.','Que lo aprendido se convierta en servicio, con humildad, respeto y amor.','Que cada sesión sea para el mayor bien de quien llega a nosotras y de todo su linaje.','Gracias, gracias, gracias.'])}</div>`;
RICH.td19=()=>`<div class="ni tgx">${nbHero('Formación Transgeneracional','Gracias por','este camino','Sigue practicando, registra tus sesiones y honra a tu linaje como honras el de otras.',['Clase 1','Clase 2','Clase 3','Clase 4'],'Karen Oyarce · Maestra Holística',tdPhoto('Una mujer sentada al pie de un árbol, con los ojos cerrados y las manos en el pecho, sonríe'))}</div>`;
(function(){const c=document.createElement('style');c.id='td-css';c.textContent=`
.nj-proto.td-5{grid-template-columns:repeat(5,minmax(0,1fr))}
.nl-req.td-3{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:760px){.nj-proto.td-5,.nl-req.td-3{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();

/* ---------- Nivel 4 · Especialización Vidas Pasadas · Clase 1 ---------- */
(function(){const c=document.createElement('style');c.id='va-css';c.textContent=`
.va-arcs{width:100%;max-width:520px;justify-self:center;display:block}
.va-arcs path{transition:fill .4s,opacity .4s}.va-arcs text{font:400 13px var(--f-display);text-anchor:middle;fill:#1f3f32}
.va-arcs .dim{opacity:.35}
.va-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.va-3>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;align-content:start;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .45s both;transition:transform .3s,box-shadow .3s}
.va-3>button:nth-child(2){animation-delay:.08s}.va-3>button:nth-child(3){animation-delay:.16s}
.va-3>button.d{background:var(--ni-olv);border-color:var(--ni-olv);color:#ece7d3}.va-3>button.d p{color:#dfe3cf}.va-3>button.d .ni-tag{color:#d9c9ef}
.va-3>button[aria-pressed="true"]{transform:translateY(-4px);box-shadow:0 0 0 2px var(--ni-lil2)}
.va-3 h3{margin:0;font:400 1.3rem/1.2 var(--f-display)}.va-3 p{margin:0;line-height:1.5;color:var(--nb-soft);font-size:.92rem}
.va-g5{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.va-g5>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;overflow:hidden;display:grid;align-content:start;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .45s both;transition:transform .3s,box-shadow .3s}
.va-g5>button img{width:100%;aspect-ratio:611/344;object-fit:cover;background:#fff;display:block}
.va-g5>button div{padding:12px;display:grid;gap:4px}.va-g5 b{font:400 1.05rem/1.2 var(--f-display)}.va-g5 small{font-size:.8rem;color:var(--nb-soft)}
.va-g5>button.d{background:var(--ni-olv);border-color:var(--ni-olv);color:#fff}.va-g5>button.d small{color:#dfe3cf}.va-g5>button.d img{border:6px solid var(--ni-olv);border-bottom:0}
.va-g5>button[aria-pressed="true"]{transform:translateY(-4px);box-shadow:0 0 0 2px var(--ni-lil2)}
.va-yn{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.va-yn>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px 20px;display:grid;gap:8px;align-content:start;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);min-height:120px;transition:transform .3s,background .3s,opacity .3s}
.va-yn>button b{font:400 1.7rem/1 var(--f-display)}.va-yn>button span{line-height:1.5;font-size:.95rem}
.va-yn>button.va-y[aria-pressed="true"]{background:var(--ni-olv);color:#fff;border-color:var(--ni-olv)}
.va-yn>button.va-n[aria-pressed="true"]{background:var(--ni-tea);border-color:var(--ni-tea)}
.va-yn.va-ch>button[aria-pressed="false"]{opacity:.45}
.va-yn>button[aria-pressed="true"]{transform:translateY(-4px)}
.va-q{background:var(--ni-olv);color:#fff;border-radius:18px;padding:22px 26px;font:italic 400 1.3rem/1.45 var(--f-display);animation:niUp .5s both}
.va-ty{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.va-ty>button,.va-ty>div{all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;padding:14px 16px;display:grid;gap:6px;align-content:start;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);min-height:112px;animation:niUp .4s both;transition:transform .25s,background .25s}
.va-ty>button b{font:400 1.12rem/1.2 var(--f-display)}.va-ty span{font-size:.84rem;line-height:1.45;color:var(--nb-soft)}
.va-ty>button[aria-pressed="true"]{background:#f6d3e6;border-color:#c0628f;transform:translateY(-3px)}
.va-ty>button[aria-pressed="true"] b::after{content:" ✓";color:#c0628f}
.va-ty>div{cursor:default;background:var(--ni-olv);border-color:var(--ni-olv);color:#fff}.va-ty>div span{color:#dfe3cf}.va-ty>div b{font:400 1.12rem/1.2 var(--f-display)}
.va-int{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.va-int>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;align-content:start;min-height:150px;border:1px solid var(--nb-line);transition:transform .3s,box-shadow .3s;animation:niUp .45s both}
.va-int>button:nth-child(1){background:var(--nb-paper)}.va-int>button:nth-child(2){background:var(--ni-lil);border-color:var(--ni-lil);animation-delay:.08s}.va-int>button:nth-child(3){background:var(--ni-olv);border-color:var(--ni-olv);color:#fff;animation-delay:.16s}
.va-int>button:nth-child(3) span{color:#dfe3cf}
.va-int b{font:400 1.25rem/1.2 var(--f-display)}.va-int span{font-size:.9rem;line-height:1.5;color:var(--nb-soft)}
.va-int>button[aria-pressed="true"]{transform:translateY(-4px);box-shadow:0 0 0 3px #e9c46a}
.va-int i{display:flex;gap:4px}.va-int i u{display:block;width:18px;height:6px;border-radius:3px;background:currentColor;opacity:.2}.va-int i u.on{opacity:1;background:#c0628f}
.nj-flow.va-5{grid-template-columns:repeat(5,minmax(0,1fr))}
.va-calc{display:grid;gap:10px;border-radius:18px;padding:16px 18px;background:var(--nb-paper);border:1px solid var(--nb-line)}
.va-calc .dk-chips{margin:0}.va-calc small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.va-res{font:400 1.25rem/1.35 var(--f-display);color:var(--nb-ink)}
.va-res mark{background:#f7f1c8;padding:0 4px;border-radius:4px}
@media (max-width:760px){.va-3,.va-yn,.va-int{grid-template-columns:1fr}.va-g5{grid-template-columns:1fr 1fr}.va-ty{grid-template-columns:1fr 1fr}.nj-flow.va-5{grid-template-columns:1fr}.va-q{font-size:1.1rem;padding:18px}}
`;document.head.appendChild(c)})();

const VA_PH=`${N4P}vidas/c1-portada.webp`;
const vaPhoto=alt=>`<div class="ni-ph"><img src="${VA_PH}" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#d8d8f3" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#f7f1c8" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3b4a24"/></svg></div>`;
const vaGo=(off,t,cls)=>`<button class="btn ${cls||'btn-ghost'} btn-sm" data-les="${S.lesson[0]},${S.lesson[1]+off}">${t}</button>`;

/* el gráfico de Fechas: número · sí · no al centro, esta vida, años del siglo y siglo */
const VF_N=['0','1','2','3','4','5','6','7','8','9','Sí','No','*'];
const VF_V=['Gestación','Nacimiento','0 a 7\naños','8 a 14\naños','15 a 21\naños','22 a 35\naños','36 a 50\naños','51 años\no más'];
const VF_A=['00 a 09','10 a 19','20 a 29','30 a 39','40 a 49','50 a 59','60 a 69','70 a 79','80 a 89','90 a 99'];
const VF_S=['a. C.','I a V','VI a X','XI a XV','XVI','XVII','XVIII','XIX','XX','XXI'];
RX.vfc=(k,v)=>{v=+v;const T=(K,x)=>{RS[K]=st(K,-1)===x?-1:x};
 if(k==='n'){if(v<10)T('vfn',v);else if(v<12)T('vfq',v-10);else T('vfx',1)}else T('vf'+k,v);render(false)};
const vfSel=(k,i)=>k==='n'?(i<10?st('vfn',-1)===i:i<12?st('vfq',-1)===i-10:st('vfx',-1)===1):st('vf'+k,-1)===i;
const vfChart=o=>{o=o||{};return niFan({label:'Gráfico de Fechas',act:'vfc',inner:50,sel:vfSel,
 hot:o.ring||o.hot?(k,i)=>o.hot?(o.hot(k,i)?1:-1):(k===o.ring?0:-1):0,
 rings:[{k:'n',r0:62,r1:112,items:VF_N,fill:'#fbf8e6',on:'#a08a2a',m:'tan',fs:10},
  {k:'v',r0:112,r1:178,items:VF_V,fill:'#fbeef4',on:'#c0628f',m:'rad',fs:8.6},
  {k:'a',r0:178,r1:232,items:VF_A,fill:'#ffffff',on:'#3f7d6e',m:'tan',fs:8.6},
  {k:'s',r0:232,r1:280,items:VF_S,fill:'#e8e8f8',on:'#5a5ab0',m:'tan',fs:9.5}],cap:o.cap===0?'':o.cap||'Toca un número o Sí / No en el centro, el siglo y los años del siglo.'})};
const vaRom={'XVI':16,'XVII':17,'XVIII':18,'XIX':19,'XX':20,'XXI':21};
const vfEpoca=(s,a,short)=>{if(s<0)return '';const S=VF_S[s],c=vaRom[S],A=a>=0?VF_A[a]:'';
 if(short)return (s===0?'a. C.':'S. '+S)+(A?' · '+A.replace(' a ','–'):'');
 if(c&&a>=0){const y=(c-1)*100+a*10;return `alrededor de ${y} a ${y+9}`}
 return (s===0?'antes de Cristo':c?'siglo '+S:'siglos '+S)+(A?', años '+A+' de su siglo':'')};
const vfRead=()=>{const q=st('vfq',-1),n=st('vfn',-1),s=st('vfs',-1),a=st('vfa',-1);return [q<0?'':q?'No':'Sí',n<0?'':String(n),vfEpoca(s,a,1)]};

/* el gráfico Vidas Pasadas (Investigación): ¿hubo daño? al centro, siete tipos y su intensidad */
const VI_H=['Sí','No'],VI_T=['Físico','Emocional','Mental','Moral','Mortal','Económico','Espiritual'],VI_I=['Daño menor','Daño mayor','Daño mortal'];
const VI_TD=['Heridas, golpes o enfermedades en el cuerpo.','Pérdidas, abandono, miedo o desamor.','Creencias impuestas, presión o confusión.','Vergüenza, culpa, juicio o deshonra.','Un daño que terminó con esa vida.','Pobreza, ruina o despojo.','Desconexión, pérdida de la fe o castigo religioso.'];
RX.vic=(k,v)=>{v=+v;if(k==='t'){const o=st('vit',{});if(o[v])delete o[v];else o[v]=1;RS.vit=o}else{const K='vi'+k;RS[K]=st(K,-1)===v?-1:v}render(false)};
const viTipos=()=>Object.keys(st('vit',{})).map(Number).sort((a,b)=>a-b);
const viChart=o=>{o=o||{};return niFan({label:'Gráfico Vidas Pasadas, investigación',act:'vic',inner:50,
 sel:(k,i)=>k==='t'?!!st('vit',{})[i]:st('vi'+k,-1)===i,
 hot:o.ring?(k,i)=>k===o.ring?0:-1:0,
 rings:[{k:'h',r0:62,r1:130,items:VI_H,fill:'#e3e9fa',on:'#4f6fb0',m:'tan',fs:13},
  {k:'t',r0:130,r1:205,items:VI_T,fill:'#fbeef4',on:'#c0628f',m:'rad',fs:10},
  {k:'i',r0:205,r1:280,items:VI_I,fill:'#fbf8e6',on:'#a08a2a',m:'tan',fs:11.5}],cap:o.cap===0?'':o.cap||'Toca Sí o No en el centro, uno o más tipos de daño y su intensidad.'})};
const viRead=()=>{const h=st('vih',-1),i=st('vii',-1);return [h<0?'':VI_H[h],viTipos().map(x=>VI_T[x]).join(', '),i<0?'':VI_I[i].replace('Daño ','')]};

/* ----- 1 · Bienvenida y agenda ----- */
RICH.va1=()=>`<div class="ni">${nbHero('Especialización Vidas Pasadas · Clase 1','La memoria','del alma','Lo que el alma trae de otras vidas: qué es una vida pasada, para qué se investiga, el encuadre ético y los dos primeros gráficos de la especialización, Fechas e Investigación.',['Memoria del alma','Encuadre ético','Fechas','Investigación'],'Karen Oyarce · Maestra Holística',vaPhoto('Ruinas de piedra con arcos cubiertos de hiedra y musgo en un bosque con niebla'))}</div>`;
RICH.va2=()=>niAgenda('Clase 1',['Del linaje al alma','Qué es una vida pasada y cómo se expresa','Para qué se investiga y el encuadre ético','Los cinco gráficos de la especialización','Fechas: vida activa, vidas atrás y época','Investigación: daño, tipo e intensidad','Ejemplo y práctica en parejas','Repaso y tarea'],
 ['Explicar qué es una memoria de vida pasada','Confirmar si hay una vida pasada activa, cuántas vidas atrás y en qué época','Investigar el daño: si lo hubo, tipo e intensidad','Leer con cuidado ético, en hipótesis']);

/* ----- 2 · Del linaje al alma ----- */
const VA_MI=[['Niño interno','Lo que viví','Las heridas de mi infancia y las máscaras que aprendí.','0,0','Repasar Niño interior'],['Transgeneracional','Lo que heredé','Las memorias, lealtades y votos que llegaron a través del clan.','2,0','Repasar Transgeneracional'],['Vidas pasadas','Lo que mi alma trae','Experiencias de otras vidas que siguen presentes en esta.','','']];
RICH.va3=()=>{const s=st('va3',-1);
 const arc=(r,i,t)=>`<path class="${s>=0&&s!==i?'dim':''}" d="M${260-r} 250A${r} ${r} 0 0 1 ${260+r} 250" fill="none" stroke="${['#e6dcf2','#d8d8f3','#3b4a24'][i]}" stroke-width="44"/><text x="260" y="${256-r}" style="${i===2?'fill:#fff':''}">${t}</text>`;
 return dkH('Tres miradas','Del linaje al alma','Toca cada mirada.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-3">${VA_MI.map((x,i)=>`<button class="${i===2?'d':''}" ${rxa('set','va3',s===i?-1:i)} ${pressed(s===i)}><span class="ni-tag">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></button>`).join('')}</div>
 <svg class="va-arcs" viewBox="0 0 520 262" aria-hidden="true">${arc(206,2,'Lo que mi alma trae')}${arc(150,1,'Lo que heredé')}${arc(94,0,'Lo que viví')}<circle cx="260" cy="250" r="40" fill="#1f3f32"/><svg x="234" y="216" width="52" height="52" style="color:#ece7d3"><use href="#mark"/></svg></svg>
 ${s>=0&&VA_MI[s][3]?`<div class="nj-det ni-in"><div><span class="ni-tag">${VA_MI[s][0]}</span><br><b>${VA_MI[s][1]}</b><p>${VA_MI[s][2]}</p></div><button class="btn btn-ghost btn-sm" data-les="${VA_MI[s][3]}">${VA_MI[s][4]}</button></div>`:''}
 ${niQ('Tres miradas sobre una misma persona.')}
 ${niBox('l','Pregunta al grupo','¿Hay algo en tu vida que no logras explicar ni por tu infancia ni por tu familia?')}${n3area('va3a','Anota lo tuyo','Algo que no logro explicar es…')}</div>`};

/* ----- 3 · Qué es una vida pasada y cómo se expresa ----- */
const VA_DEF=[['El alma recuerda','Las experiencias intensas dejan huella más allá de una vida.'],['Lo no resuelto vuelve','Aparece como miedo, patrón o vínculo que se repite.'],['Se puede liberar','Al reconocerlo y limpiarlo, deja de actuar en el presente.']];
RICH.va4=()=>{const s=n3clamp(st('va4s',0),0,2);
 return dkH('La memoria del alma','¿Qué es una vida pasada?','Avanza por los tres movimientos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-hyp"><p>Es una experiencia que el alma vivió antes de esta vida. Lo que quedó sin resolver en ella puede seguir presente hoy como una memoria.</p></div>
 <div class="tg-flow">${VA_DEF.map((x,i)=>`<button class="${i<=s?'lit':''} ${i===s?'cur':''}" ${rxa('set','va4s',i)}><small>${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${s<2?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','va4s',s+1)}>Siguiente</button></div>`:''}
 ${niBox('l','Pregunta al grupo','¿Qué te gustaría comprender de tu alma en esta especialización?')}${n3area('va4a','Anota lo tuyo','Me gustaría comprender…')}</div>`};
RICH.va5=()=>dkH('Señales','Cómo puede expresarse hoy','Seis señales posibles. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px">${n3flip('va5',[['rayo','Miedos sin origen','Al agua, al fuego, a la altura o a la oscuridad, sin una causa en esta vida.'],['espiral','Patrones que se repiten','Situaciones que vuelven una y otra vez, aunque cambien las personas.'],['camino','Afinidades','Lugares, épocas, idiomas u oficios que atraen sin saber por qué.'],['enlace','Vínculos intensos','Personas que sentimos conocer desde siempre, para bien o para mal.'],['persona','Sensaciones en el cuerpo','Molestias sin explicación aparente, siempre después de consultar a un profesional.'],['nudo','Votos que pesan','Renuncias que se cumplen sin haberlas elegido: al amor, al dinero, a la voz.']],'c3',180)}
 ${niBox('d','Son señales posibles, no pruebas','Este trabajo no reemplaza la atención médica ni psicológica.')}</div>`;

/* ----- 4 · Para qué se investiga y el encuadre ético ----- */
RICH.va6=()=>dkH('El propósito','Para qué se investiga','¿Para sanar o no? Lleva cada motivo a su columna.')+
 niSort('vasa',[['Comprender un patrón que se repite',0],['Satisfacer la curiosidad',1],['Liberar un miedo sin origen',0],['Buscar si fuimos alguien famoso',1],['Sanar un vínculo difícil',0],['Alimentar fantasías o historias',1],['Anular un voto que limita',0],['Culpar a alguien por lo que pasó en otra vida',1]],
 [['Para sanar','','t','Para sanar'],['No para','','l','No para']],'Investigamos para sanar, no por curiosidad.','Mira otra vez: ¿ese motivo ayuda a sanar algo de hoy?');
const VA_ET=[['check','Pedir siempre el consentimiento de la persona'],['chat','Hablar en hipótesis: «el gráfico muestra una posible…»'],['xcirc','No agregar detalles imaginados ni nombres de personajes históricos'],['balanza','No culpar a nadie por lo que pasó en otra vida'],['corazon','Recordar que no reemplaza la atención médica ni psicológica'],['escudo','Ante un tema sensible, detenerse y derivar a un profesional']];
RICH.va7=()=>dkH('El encuadre ético','El encuadre ético','Seis acuerdos para cada sesión. Márcalos a medida que los conversan.')+
 `<div class="ni dk-split" style="align-items:start"><div>${n3ck('vaet',VA_ET,['Marca cada acuerdo.','Este es el encuadre de cada sesión de vidas pasadas.'])}</div>
 <div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Recuerda</span><p style="margin:0;font:italic 400 1.15rem/1.5 var(--f-display);color:#ece7d3">Lo que aparece en el gráfico es una posibilidad. La persona la confirma o la descarta con lo que siente y sabe de sí misma.</p></div></div>`;

/* ----- 5 · Los cinco gráficos ----- */
const VA_G=[['fechas','Fechas','Clases 1 y 2','Si hay una vida pasada activa, cuántas vidas atrás, en qué época y cuándo se activó en esta vida.',5],['investigacion','Investigación','Clase 1','Si hubo daño o herida en esa vida, de qué tipo y con qué intensidad.',6],['anexo','Anexo','Clase 2 · opcional','Más detalles de esa vida, solo si hace falta.',0],['muerte','Causas de Muerte','Clase 3','Cuando el daño fue mortal.',0],['votos','Votos o Pactos','Clase 3','Los votos y pactos que vienen de otras vidas.',0]];
RICH.va8=()=>{const s=st('va8',-1);
 return dkH('La especialización','Los cinco gráficos de la especialización','Toca un gráfico para saber cuándo lo usamos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-g5">${VA_G.map((x,i)=>`<button class="${i<2?'d':''}" ${rxa('set','va8',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.07}s"><img src="${N4P}vidas/g-${x[0]}.webp" alt="Miniatura del gráfico ${x[1]}" loading="lazy"><div><b>${x[1]}</b><small>${x[2]}</small></div></button>`).join('')}</div>
 ${s>=0?`<div class="nj-det ni-in"><div><span class="ni-tag">${VA_G[s][2]}</span><br><b>${VA_G[s][1]}</b><p>${VA_G[s][3]}</p></div>${VA_G[s][4]?`<button class="btn btn-primary btn-sm" data-les="${S.lesson[0]},${VA_G[s][4]}">Verlo ahora</button>`:''}</div>`:''}
 ${niQ('Hoy: Fechas e Investigación.')}</div>`};

/* ----- 6 · Fechas ----- */
const VF_RG=[['n','Número · Sí · No','Sí o no, y cuántas vidas atrás (0 a 9).'],['v','Esta vida','En qué etapa se activó. Lo vemos en la Clase 2.'],['a','Años del siglo','La década dentro del siglo.'],['s','Siglo','Desde antes de Cristo hasta el siglo XXI.']];
RICH.va9=()=>{const s=st('va9',-1);
 return dkH('Fechas','El gráfico de Fechas','Cuatro anillos, de adentro hacia afuera. Toca un anillo para verlo o explora el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('va9O','vidas/fechas.webp','Lámina original del gráfico de Fechas de Casa Muladhara',vfChart({ring:s>=0?VF_RG[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('va9',VF_RG.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${tcRow(['Vida activa','Vidas atrás','Época'],vfRead())}</div></div>
 ${niQ('Se pregunta del centro hacia afuera: primero si hay una vida activa, después cuántas vidas atrás y al final la época.')}</div>`};
RICH.va10=()=>{const q=st('vfq',-1);
 return dkH('Paso 1','¿Hay una vida pasada activa?','Pregúntalo en el centro del gráfico de Fechas. Toca la respuesta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-q">«¿Hay una vida pasada que influye hoy en este motivo de consulta?»</div>
 <div class="va-yn${q>=0?' va-ch':''}"><button class="va-y" ${rxa('vfc','n',10)} ${pressed(q===0)}><b>Sí</b><span>Seguimos: cuántas vidas atrás y en qué época.</span></button><button class="va-n" ${rxa('vfc','n',11)} ${pressed(q===1)}><b>No</b><span>El motivo se mira con otras herramientas, como Niño Interno o Transgeneracional.</span></button></div>
 ${q===0?`<div class="dk-cta ni-in" style="justify-content:center"><button class="btn btn-primary btn-sm" data-slide="2">Seguir al paso 2</button></div>`:q===1?`<div class="nj-det ni-in"><div><span class="ni-tag">Otras herramientas</span><br><b>Niño Interno o Transgeneracional</b></div><div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="0,0">Niño interior</button><button class="btn btn-ghost btn-sm" data-les="2,0">Transgeneracional</button></div></div>`:''}
 <div style="max-width:560px;width:100%;justify-self:center">${vfChart({hot:(k,i)=>k==='n'&&i>9&&i<12,cap:'Sí y No están en el centro, junto a los números.'})}</div>
 ${niQ('Una pregunta clara, una respuesta clara.')}</div>`};
RX.vfex=()=>{RS.vfs=6;RS.vfa=4;render(false)};
RICH.va11=()=>{const n=st('vfn',-1),s=st('vfs',-1),a=st('vfa',-1),T=(K,i,t)=>`<button class="chip" ${rxa('vfc',K,i)} ${pressed(st('vf'+K,-1)===i)}>${t}</button>`;
 return dkH('Pasos 2 y 3','¿Cuántas vidas atrás y en qué época?','Marca el número en el centro y después el siglo y los años del siglo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${vfChart({ring:n<0?'n':s<0?'s':'a',cap:0})}</div>
 <div class="va-calc"><small>Paso 2 · Centro · Cuántas vidas atrás</small><p style="margin:0;font-size:.88rem;color:var(--nb-soft)">Del 0 al 9. El 1 es la vida inmediatamente anterior.</p><div class="dk-chips">${VF_N.slice(0,10).map((t,i)=>T('n',i,t)).join('')}</div>
 <small>Paso 3 · Anillos exteriores · Siglo</small><div class="dk-chips">${VF_S.map((t,i)=>T('s',i,t)).join('')}</div>
 <small>Años del siglo</small><div class="dk-chips">${VF_A.map((t,i)=>T('a',i,t)).join('')}</div></div></div>
 ${n>=0||s>=0?`<div class="ni-hyp ni-in"><span class="ni-tag">Tu lectura</span><p>${n>=0?`<mark>${n===0?'En esta misma vida':n===1?'La vida inmediatamente anterior':n+' vidas atrás'}</mark>`:'Marca cuántas vidas atrás'}${s>=0?`, ${vfEpoca(s,a)}`:''}.</p></div>`:''}
 <div class="nj-det"><div><span class="ni-tag">Ejemplo</span><p style="font-size:1rem">Siglo XVIII + años 40 a 49 = una vida alrededor de 1740 a 1749.</p></div><button class="btn btn-ghost btn-sm" ${rxa('vfex',0)}>Probar el ejemplo</button></div></div>`};

/* ----- 7 · Investigación ----- */
const VI_RG=[['h','1. ¿Hubo daño o herida?','Sí o no, en el centro.'],['t','2. Tipo de daño','Siete tipos, en el anillo del medio.'],['i','3. Intensidad del daño','Menor, mayor o mortal, en el anillo exterior.']];
RICH.va12=()=>{const s=st('va12',-1);
 return dkH('Investigación','El gráfico Vidas Pasadas (Investigación)','Tres anillos. Toca un paso para verlo o explora el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('va12O','vidas/investigacion.webp','Lámina original del gráfico Vidas Pasadas, investigación, de Casa Muladhara',viChart({ring:s>=0?VI_RG[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('va12',VI_RG.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${tcRow(['Daño','Tipo','Intensidad'],viRead())}</div></div>
 ${niQ('Se lee de adentro hacia afuera.')}</div>`};
RICH.va13=()=>{const h=st('vih',-1);
 return dkH('Paso 4','¿Hubo daño o herida?','Pregúntalo en el centro del gráfico de Investigación. Toca la respuesta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-yn${h>=0?' va-ch':''}"><button class="va-y" ${rxa('vic','h',0)} ${pressed(h===0)}><b>Sí</b><span>Seguimos con el tipo de daño y su intensidad.</span></button><button class="va-n" ${rxa('vic','h',1)} ${pressed(h===1)}><b>No</b><span>Esa vida puede traer un don o un aprendizaje. Se reconoce y se agradece.</span></button></div>
 ${h===0?`<div class="dk-cta ni-in" style="justify-content:center"><button class="btn btn-primary btn-sm" data-slide="2">Seguir al paso 5</button></div>`:h===1?niQ('Un don de otra vida también es una memoria del alma: se reconoce y se agradece.'):''}
 <div style="max-width:560px;width:100%;justify-self:center">${viChart({ring:'h',cap:0})}</div>
 ${niBox('l','Pregunta al grupo','¿Qué don podrías haber traído de otra vida?')}${n3area('va13a','Anota el tuyo','Un don que siento que traigo es…')}</div>`};
RICH.va14=()=>{const T=viTipos();
 return dkH('Paso 5','Los siete tipos de daño','Toca cada tipo que marque el péndulo. Puede haber más de uno.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-ty">${VI_T.map((t,i)=>`<button ${rxa('vic','t',i)} ${pressed(T.includes(i))} style="animation-delay:${i*.05}s"><b>${t}</b><span>${VI_TD[i]}</span></button>`).join('')}<div><b>Puede haber más de uno</b><span>Se pregunta por cada tipo hasta que el péndulo indique que no hay más.</span></div></div>
 <div class="tc-side"><div class="nj-fig">${viChart({ring:'t',cap:0})}</div>
 <div style="display:grid;gap:10px">${T.length?niBox('l',T.length===1?'Marcaste un tipo':`Marcaste ${T.length} tipos`,T.map(x=>VI_T[x]).join(', ')+'.'):niNote('Lo que marques aquí aparece también en el gráfico.')}${T.includes(4)?niBox('d','Daño mortal','Si el tipo es mortal, la intensidad también lo será. La causa de muerte se investiga en la Clase 3.'):''}</div></div></div>`};
RICH.va15=()=>{const i=st('vii',-1);
 return dkH('Paso 6','La intensidad del daño','Toca la intensidad que marque el péndulo en el anillo exterior.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-int">${[['Daño menor','Dejó una marca leve en esa vida.'],['Daño mayor','Marcó esa vida de forma importante.'],['Daño mortal','Terminó con esa vida. Se completa en la Clase 3 con Causas de Muerte.']].map((x,k)=>`<button ${rxa('vic','i',k)} ${pressed(i===k)}><i>${[0,1,2].map(j=>`<u class="${j<=k?'on':''}"></u>`).join('')}</i><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 <div style="max-width:560px;width:100%;justify-self:center">${viChart({ring:'i',cap:0})}</div>
 ${niQ('A mayor intensidad, más cuidado al comunicar.')}</div>`};
RICH.va16=()=>{const f=vfRead(),v=viRead(),R=[f[0],f[1],f[2],v[0],[v[1],v[2]].filter(Boolean).join(' · ')];
 return dkH('Lectura','Cómo se lee','Siempre en el mismo orden. Abajo aparece lo que marcaste en los dos gráficos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow va-5">${[['Vida activa','Sí o no.'],['Vidas atrás','Del 0 al 9.'],['Época','Siglo y años.'],['Daño','Sí o no.'],['Tipo e intensidad','Uno o más tipos; menor, mayor o mortal.']].map((x,i)=>`<div class="lit" style="animation:niUp .45s ${i*.1}s both"><small>Paso ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span><span style="font:400 1rem var(--f-display);color:${i===4?'#f2c66d':'var(--ni-lil2)'}">${R[i]||'—'}</span></div>`).join('')}</div>
 ${R.every(Boolean)&&f[0]==='Sí'&&v[0]==='Sí'?`<div class="ni-hyp ni-in"><span class="ni-tag">Tu lectura, en hipótesis</span><p>El gráfico muestra una posible vida pasada activa, <mark>${f[1]==='1'?'la vida anterior':f[1]+' vidas atrás'}</mark>, ${vfEpoca(st('vfs',-1),st('vfa',-1))}, con un daño de tipo <mark>${v[1].toLowerCase().replace(/, ([^,]*)$/,' y $1')}</mark> y de intensidad <mark>${v[2]}</mark>.</p></div>`:
 `<div class="dk-cta" style="justify-content:center">${vaGo(-1,'Marcar en Fechas')}<button class="btn btn-ghost btn-sm" data-slide="0">Marcar en Investigación</button></div>`}
 ${niBox('l','Después','Limpiar lo encontrado como aprendiste en Radiestesia y Sanación del Alma.')}</div>`};

/* ----- 8 · Ejemplo y práctica en parejas ----- */
const VA_EJ=[['Vida activa','Sí'],['Vidas atrás','3'],['Época','Siglo XVII · 20 a 29'],['Daño','Sí'],['Tipo e intensidad','Físico · mortal']];
RX.vaex=()=>{RS.vfq=0;RS.vfn=3;RS.vfs=5;RS.vfa=2;RS.vih=0;RS.vit={0:1};RS.vii=2;RS.va17v=1;render(false)};
RICH.va17=()=>{const s=n3clamp(st('va17',0),0,5),v=st('va17v',0);
 return dkH('Ejemplo','Ejemplo de lectura','Consultante: P. R., miedo intenso al agua desde niña, sin ningún hecho que lo explique.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow va-5">${VA_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','va17',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>Hace tres vidas, alrededor de 1620, un daño físico terminó con esa vida. El miedo al agua puede ser la memoria de ese final.</p></div>
 <div class="dk-cta" style="justify-content:center">${v?'':`<button class="btn btn-primary btn-sm" ${rxa('vaex',0)}>Verlo en los gráficos</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','va17',0)}>Ver de nuevo</button></div>
 ${v?`<div class="dk-grid c2 ni-in" style="align-items:start"><div>${vfChart({cap:'Fechas: Sí, 3, siglo XVII, años 20 a 29.'})}</div><div>${viChart({cap:'Investigación: Sí, físico, daño mortal.'})}</div></div>`:''}`}</div>`+niNote('La causa de muerte se investiga en la Clase 3. Ejemplo ficticio.')};
const VA_PS=[['Elige un tema','Un tema liviano que quieras mirar. Pide consentimiento.'],['Fechas','Tu pareja pregunta: vida activa, vidas atrás y época.'],['Investigación','Luego: daño, tipo e intensidad.'],['Limpien y cambien','Limpien lo encontrado, completen la ficha y cambien de rol.']];
RICH.va18=()=>{const s=n3clamp(st('va18',0),0,3);
 return dkH('Práctica en parejas','Práctica en parejas','Cuatro pasos. El botón llena la ficha con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${VA_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','va18',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','va18',s+1)}>Siguiente paso</button></div>`:''}
 ${s===1||s===2?`<div class="dk-cta" style="justify-content:center">${s===1?vaGo(-2,'Abrir Fechas'):vaGo(-1,'Abrir Investigación')}</div>`:''}
 ${niFicha('vaf',['Fecha','Consultante','Motivo','Vida activa','Vidas atrás','Época','Daño','Tipo','Intensidad'],['Ej.: 04/11','P. R.','Miedo al agua','Sí','3','S. XVII · 20–29','Sí','Físico','Mortal'],()=>{const f=vfRead(),v=viRead();return [tbHoy(),'','',f[0],f[1],f[2],v[0],v[1],v[2]?v[2][0].toUpperCase()+v[2].slice(1):'']},980)}</div>`+niNote('Usa iniciales; la primera fila es un ejemplo ficticio.')};

/* ----- 9 · Repaso y tarea ----- */
RICH.va19=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('vacp',[['arbol','1 · ¿En qué se diferencia una memoria transgeneracional de una vida pasada?','<b>La transgeneracional viene del clan:</b> lo que vivieron padres, abuelos y bisabuelos. <b>La vida pasada es del alma:</b> una experiencia que ella misma vivió antes de esta vida.'],['camino','2 · ¿En qué orden se investiga una vida pasada?','<b>Vida activa, vidas atrás, época, daño, y tipo e intensidad.</b> Primero Fechas, después Investigación.'],['reloj','3 · El péndulo marca siglo XVIII y años 40 a 49. ¿En qué época fue esa vida?','<b>Alrededor de 1740 a 1749.</b> Primero el siglo, después los años del siglo.']],'c3',260)}</div>`;
RICH.va20=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Investiga una vida pasada en ti.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('vata',[['diana','Elige un tema propio que quieras comprender'],['check','Pregunta si hay una vida pasada activa en ese tema'],['reloj','Mide cuántas vidas atrás y en qué época'],['lupa','Investiga el daño: si lo hubo, tipo e intensidad'],['limpia','Limpia lo encontrado y completa la ficha']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 2.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Elige un tema liviano. Si aparece un daño mortal, anótalo y no profundices: lo veremos en la Clase 3. Trae tu ficha.')}<div class="dk-cta">${vaGo(-1,'Abrir mi ficha')}</div></div></div>`;

/* ---------- Nivel 4 · Especialización Vidas Pasadas · Clase 2 ---------- */
(function(){const c=document.createElement('style');c.id='vb-css';c.textContent=`
.vb-soc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;position:relative}
.vb-soc>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;padding:16px 14px;display:grid;gap:8px;align-content:start;min-height:120px;color:#4a3a1f;animation:niUp .45s both;transition:transform .3s,box-shadow .3s}
.vb-soc b{font:400 1.12rem/1.2 var(--f-display)}.vb-soc span{font-size:.86rem;line-height:1.45}
.vb-soc>button[aria-pressed="true"]{transform:translateY(-5px);box-shadow:0 0 0 2px #a08a2a}
.vb-arrow{display:grid;justify-items:center;gap:6px;color:var(--nb-soft);font-size:.86rem}
.vb-arrow i{display:block;height:6px;width:min(320px,70%);border-radius:3px;background:linear-gradient(90deg,#f7f1c8,var(--ni-lil2));position:relative;animation:vbGrow 1.2s .2s both}
.vb-arrow i::after{content:"";position:absolute;right:-10px;top:-6px;border:9px solid transparent;border-left:12px solid var(--ni-lil2)}
@keyframes vbGrow{from{width:0}}
.vb-grp{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.vb-grp>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;padding:14px 16px;display:grid;gap:6px;align-content:start;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .4s both;transition:transform .25s,background .25s,box-shadow .25s}
.vb-grp b{font:400 1.08rem/1.2 var(--f-display)}.vb-grp span{font-size:.84rem;line-height:1.45;color:var(--nb-soft)}
.vb-grp>button.k{background:var(--ni-olv);border-color:var(--ni-olv);color:#fff}.vb-grp>button.k span{color:#dfe3cf}
.vb-grp>button.o{background:var(--ni-lil);border-color:var(--ni-lil)}
.vb-grp>button[aria-pressed="true"]{transform:translateY(-3px);box-shadow:0 0 0 2px var(--ni-lil2)}
.vb-et{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.vb-et>button{all:unset;box-sizing:border-box;cursor:pointer;text-align:center;padding:10px 6px;border-radius:12px;border:1px solid #efc9d9;background:#fbeef4;color:#6a2a48;font:400 .98rem/1.2 var(--f-display);animation:niUp .35s both;transition:transform .25s,background .25s}
.vb-et>button[aria-pressed="true"]{background:#c0628f;color:#fff;transform:translateY(-3px)}
.vb-ron{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.vb-ron>div{border-radius:18px;padding:16px;display:grid;gap:8px;align-content:start;background:var(--nb-paper);border:1px solid var(--nb-line);animation:niUp .45s both}
.vb-ron>div:nth-child(2){animation-delay:.08s}.vb-ron>div:nth-child(3){animation-delay:.16s;background:var(--ni-lil);border-color:var(--ni-lil)}
.vb-ron h3{margin:0;font:400 1.2rem/1.2 var(--f-display)}.vb-ron p{margin:0;font-size:.88rem;line-height:1.5;color:var(--nb-soft)}
.vb-ron textarea{all:unset;box-sizing:border-box;width:100%;min-height:74px;padding:8px 2px;border-bottom:1.5px dashed var(--ni-lil2);font:italic 400 1rem/1.45 var(--f-display);color:var(--nb-ink);white-space:pre-wrap}
@media (max-width:760px){.vb-soc{grid-template-columns:1fr}.vb-soc>button{min-height:0}.vb-grp,.vb-ron{grid-template-columns:1fr}.vb-et{grid-template-columns:1fr 1fr}}
`;document.head.appendChild(c)})();

const vbPhoto=alt=>`<div class="ni-ph"><img src="${N4P}vidas/c2-portada.webp" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#d8d8f3" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#f6d8dc" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3b4a24"/></svg></div>`;

/* el gráfico del anexo: hombre o mujer al centro, clase social, tipo de relación y profesión */
const VX_S=['Hombre','Mujer'],VX_C=['En la\nmiseria','Pobre','Media\nbaja','Media\nalta','Rico'];
const VX_R=['Familiar','Apoyo\nmutuo','Amor','Amistad','Laboral','Estudio','Diversión','Sexual','Conflicto','Interés','Indiferente','Vecindad','Karma','Enemistad','Dependencia','Estima','Compromiso','Amantes','Otra'];
const VX_P=['Sanador','Soldado','Político','Religioso','Comerciante','Campesino','Pescador','Cazador /\nrecolector','Marinero','Profesor /\nerudito','Artista','Criado / sir-\nviente / esclavo','Músico','Vagabundo','Noble','Artesano /\npeón','Brujo(a)','Otro'];
RX.vxc=(k,v)=>{const K='vx'+k;RS[K]=st(K,-1)===+v?-1:+v;render(false)};
const vxChart=o=>{o=o||{};return niFan({label:'Gráfico Vidas Pasadas, anexo de investigación',act:'vxc',inner:50,sel:(k,i)=>st('vx'+k,-1)===i,
 hot:o.ring||o.hot?(k,i)=>o.hot?(o.hot(k,i)?1:-1):(k===o.ring?0:-1):0,
 rings:[{k:'s',r0:62,r1:112,items:VX_S,fill:'#f6dde1',on:'#b0566a',m:'tan',fs:12},
  {k:'c',r0:112,r1:160,items:VX_C,fill:'#f7f1c8',on:'#a08a2a',m:'rad',fs:8.6},
  {k:'r',r0:160,r1:222,items:VX_R,fill:'#ffffff',on:'#5a5ab0',m:'rad',fs:7.6},
  {k:'p',r0:222,r1:280,items:VX_P,fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:7.4}],cap:o.cap===0?'':o.cap||'Toca hombre o mujer, la clase social, el tipo de relación y la profesión.'})};
const vxRead=()=>{const s=st('vxs',-1),c=st('vxc',-1),r=st('vxr',-1),p=st('vxp',-1);return [s<0?'':VX_S[s],c<0?'':tcClean(VX_C[c]),r<0?'':tcClean(VX_R[r]),p<0?'':tcClean(VX_P[p])]};
const vfAct=()=>{const v=st('vfv',-1);return v<0?'':tcClean(VF_V[v])};

/* ----- 1 · Bienvenida y agenda ----- */
RICH.vb1=()=>`<div class="ni">${nbHero('Especialización Vidas Pasadas · Clase 2','Quién fui','y con quién','Completamos la historia de una vida pasada con el anexo de investigación: hombre o mujer, clase social, profesión y tipo de relación. Reconocemos los vínculos kármicos y medimos en qué etapa de esta vida se activó la memoria.',['Anexo','Clase social','Profesión','Vínculos kármicos'],'Karen Oyarce · Maestra Holística',vbPhoto('Una mujer con un largo manto verde camina de espaldas por un jardín junto a un castillo de piedra'))}</div>`;
RICH.vb2=()=>niAgenda('Clase 2',['Revisión de la tarea y ronda','El anexo de investigación','Hombre o mujer y clase social','Profesión','Tipo de relación y vínculos kármicos','Fechas: cuándo se activó en esta vida','Limpiar, ejemplo y práctica','Reglas de oro, repaso y tarea'],
 ['Decidir cuándo usar el anexo','Completar la historia: sexo, clase social, profesión y relación','Reconocer un vínculo kármico con alguien de esta vida','Medir en qué etapa de esta vida se activó la memoria']);

/* ----- 2 · Revisión de la tarea y ronda ----- */
const VB_RV=['¿Qué tema elegiste y hubo una vida pasada activa?','¿Cuántas vidas atrás y en qué época?','¿Qué tipo de daño apareció y con qué intensidad?','¿Qué sentiste después de limpiar?','¿Qué te gustaría saber de esa vida?'];
RICH.vb3=()=>{const s=st('vb3',-1),f=vfRead(),v=viRead();
 return dkH('Lo que trajiste','Revisemos la tarea de la semana','La vida pasada que investigaste. Toca una pregunta para anotar tu respuesta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">
 <div style="display:grid;gap:10px"><div class="dk-sub" style="margin:0">Lo que marcaste en la Clase 1</div>${tcRow(['Vida activa','Vidas atrás','Época','Daño','Tipo','Intensidad'],[...f,...v])}${f.some(Boolean)?'':niNote('Aquí aparece lo que marcaste en los gráficos de Fechas e Investigación.')}<div class="dk-cta">${'<button class="btn btn-ghost btn-sm" data-les="1,5">Fechas</button><button class="btn btn-ghost btn-sm" data-les="1,6">Investigación</button>'}</div></div>
 <div style="display:grid;gap:10px">${tbList('vb3',VB_RV)}${s>=0?`<div class="ni-in">${n3area('vb3a'+s,VB_RV[s],'Lo que noté…')}</div>`:''}</div></div>
 ${niQ('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.')}</div>`};
RICH.vb4=()=>dkH('Lo que trajiste','Ronda: lo que resonó en ti','Una o dos frases por persona. Si quieres, anota la tuya.')+
 `<div class="ni vb-ron">${[['Lo que reconocí','Algo de esa vida que se parece a mi vida de hoy.'],['Lo que sentí','Una emoción o sensación que apareció al investigar.'],['Lo que quiero saber','Una pregunta sobre esa vida que hoy podemos responder.']].map((x,i)=>`<div><h3>${x[0]}</h3><p>${x[1]}</p><textarea data-rsin="vb4${i}" aria-label="${x[0]}" placeholder="Escribe aquí…">${esc(st('vb4'+i,''))}</textarea></div>`).join('')}</div>`+n3priv;

/* ----- 3 · El anexo de investigación ----- */
RICH.vb5=()=>dkH('El anexo','El anexo de investigación','Se usa solo cuando falta completar la historia. Lleva cada caso a su columna.')+
 niSort('vbus',[['El daño involucra a alguien de esta vida',0],['La investigación ya es clara',1],['El patrón tiene que ver con dinero, poder o trabajo',0],['La persona no lo necesita para comprender',1],['La persona necesita comprender el contexto para soltar',0],['Solo nace de la curiosidad',1]],
 [['Úsalo cuando','','t','Úsalo'],['No hace falta cuando','','l','No hace falta']],'Más datos no siempre es más sanación.','Mira otra vez: ¿ese dato ayuda a completar la historia o solo agrega información?');
const VX_RG=[['s','1. Hombre o mujer','En el centro.'],['c','2. Clase social','Cinco niveles, de la miseria a la riqueza.'],['r','3. Tipo de relación','Cómo se vinculó con alguien de esta vida.'],['p','4. Profesión','El oficio de esa vida.']];
RICH.vb6=()=>{const s=st('vb6',-1);
 return dkH('El anexo','El gráfico del anexo','Cuatro anillos. Toca uno para verlo o explora el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('vb6O','vidas/anexo.webp','Lámina original del gráfico Vidas Pasadas, anexo de investigación, de Casa Muladhara',vxChart({ring:s>=0?VX_RG[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('vb6',VX_RG.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${tcRow(['Sexo','Clase social','Relación','Profesión'],vxRead())}</div></div>
 ${niQ('Se lee de adentro hacia afuera, solo lo que hace falta.')}</div>`};

/* ----- 4 · Hombre o mujer y clase social ----- */
RICH.vb7=()=>{const s=st('vxs',-1);
 return dkH('Centro del anexo','Hombre o mujer','Toca la respuesta en el centro del gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${vxChart({ring:'s',cap:0})}</div>
 <div style="display:grid;gap:10px"><div class="va-yn${s>=0?' va-ch':''}">${VX_S.map((x,i)=>`<button class="${i?'va-n':'va-y'}" ${rxa('vxc','s',i)} ${pressed(s===i)}><b>${x}</b></button>`).join('')}</div>
 ${niBox('t','Qué puede explicar','Afinidades, rechazos o formas de estar en el cuerpo y en los vínculos que no se explican por esta vida.')}${niBox('l','Qué no hace','No define la identidad de hoy. Es un dato de esa historia que ayuda a comprenderla.')}</div></div>
 ${niBox('l','Pregunta al grupo','¿Sientes afinidad con formas de vivir que no son las de tu historia actual?')}</div>`};
const VB_CS=[['Sobrevivir día a día.','#fbf6dc'],['Lo justo, con esfuerzo.','#f7f1c8'],['Estabilidad frágil.','#f1e7b0'],['Comodidad y prestigio.','#ead98e'],['Abundancia y poder.','#e2c96a']];
RICH.vb8=()=>{const c=st('vxc',-1);
 return dkH('Anillo 2','Clase social','Cinco niveles, de la miseria a la riqueza. Toca uno.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="vb-soc">${VB_CS.map((x,i)=>`<button ${rxa('vxc','c',i)} ${pressed(c===i)} style="background:${x[1]};animation-delay:${i*.07}s"><b>${tcClean(VX_C[i])}</b><span>${x[0]}</span></button>`).join('')}</div>
 <div class="vb-arrow"><span>De la miseria a la riqueza</span><i></i></div>
 <div style="max-width:560px;width:100%;justify-self:center">${vxChart({ring:'c',cap:0})}</div>
 ${niBox('l','Pregunta al grupo','¿Cómo crees que vivió tu alma la abundancia o la escasez?')}</div>`};
RICH.vb9=()=>{const q=st('vb9q',-1),H=[['Carencia','Miedo a que falte, dificultad para recibir o para disfrutar lo que se tiene.'],['Poder','Temor a destacar, a mandar o a abusar de una posición.'],['Culpa','Sentir culpa por tener más que otros o por haber tenido.'],['Exigencia','Sentir que todo se gana con esfuerzo y que nada llega fácil.']];
 return dkH('Huellas','Lo que puede dejar la clase social','Cuatro huellas posibles. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px">${n3flip('vb9',[['gota',H[0][0],H[0][1]],['escudo',H[1][0],H[1][1]],['balanza',H[2][0],H[2][1]],['reloj',H[3][0],H[3][1]]],'c4',170)}
 <div class="nj-card l"><span class="ni-tag">Pregunta al grupo</span><p style="opacity:1;font-size:.95rem">¿Cuál de estas huellas reconoces en tu relación con el dinero?</p>${chipRow('vb9q',H.map(x=>x[0]),q)}${q>=0?`<p class="ni-in" style="opacity:1;margin:0;font:italic 400 1.05rem/1.45 var(--f-display)">${H[q][1]}</p>`:''}</div></div>`};

/* ----- 5 · Profesión ----- */
const VB_PG=[['Cuidado y espíritu',[0,3,16]],['Tierra y mar',[5,6,7,8]],['Poder',[1,2,14]],['Comercio y trabajo',[4,15,11]],['Saber y arte',[9,10,12]],['Otros caminos',[13,17]]];
RICH.vb10=()=>{const s=st('vb10',-1),p=st('vxp',-1);
 return dkH('Anillo 4','Profesión','Dieciocho oficios en seis grupos. Toca un grupo para encontrarlo en el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="vb-grp">${VB_PG.map((x,i)=>`<button class="${i===5?'o':''}" ${rxa('set','vb10',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.05}s"><b>${x[0]}</b><span>${x[1].map(j=>tcClean(VX_P[j])).join(' · ')}</span></button>`).join('')}</div>
 <div style="max-width:620px;width:100%;justify-self:center">${vxChart({hot:s>=0?(k,i)=>k==='p'&&VB_PG[s][1].includes(i):null,ring:s<0?'p':null,cap:'Toca un oficio en el anillo exterior para marcarlo.'})}</div>
 ${p>=0?`<div class="nj-det ni-in"><div><span class="ni-tag">Profesión marcada</span><br><b>${tcClean(VX_P[p])}</b></div></div>`:''}</div>`};
const VB_PH=[[0,'Sanador','Vocación de ayudar y, a veces, miedo a mostrar el don.','corazon'],[16,'Brujo(a)','Miedo a ser juzgada o perseguida por lo que sabe.','luna'],[3,'Religioso','Votos de pobreza, castidad u obediencia que siguen activos.','candado'],[1,'Soldado','Culpa, rabia o estado de alerta constante.','escudo'],[11,'Criado / esclavo','Dificultad para poner límites o sentirse merecedora.','nudo'],[14,'Noble','Exigencia de perfección o culpa por el privilegio.','diana']];
RICH.vb11=()=>{const p=st('vxp',-1),h=VB_PH.find(x=>x[0]===p);
 return dkH('Huellas','Profesiones que pueden dejar huella','Seis oficios y la huella que pueden dejar. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px">${n3flip('vb11',VB_PH.map(x=>[x[3],x[1],x[2]]),'c3',170)}
 ${h?niBox('l','Tu profesión marcada: '+h[1],h[2]+(p===3?' Los votos se trabajan en la Clase 3 con el gráfico de Votos o Pactos.':'')):''}
 ${niQ('Son huellas posibles: la persona confirma lo que le hace sentido.')}</div>`};

/* ----- 6 · Tipo de relación y vínculos kármicos ----- */
const VB_RG=[['Afecto',[0,2,3,1,15],''],['Pareja',[17,7,16],''],['Vida diaria',[4,5,6,11],''],['Tensión',[8,13,14,9,10],''],['Karma',[12],'Una deuda o un aprendizaje pendiente entre dos almas.'],['Otra',[18],'Una relación que no está en la lista.']];
RICH.vb12=()=>{const s=st('vb12',-1),r=st('vxr',-1);
 return dkH('Anillo 3','Tipo de relación','Diecinueve relaciones en seis grupos. Toca un grupo para encontrarlo en el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-q">«¿Qué relación tuvo mi alma con esta persona en esa vida?»</div>
 <div class="vb-grp">${VB_RG.map((x,i)=>`<button class="${i===4?'k':''}" ${rxa('set','vb12',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.05}s"><b>${x[0]}</b><span>${x[2]||x[1].map(j=>tcClean(VX_R[j])).join(' · ')}</span></button>`).join('')}</div>
 <div style="max-width:620px;width:100%;justify-self:center">${vxChart({hot:s>=0?(k,i)=>k==='r'&&VB_RG[s][1].includes(i):null,ring:s<0?'r':null,cap:'Toca una relación en el anillo 3 para marcarla.'})}</div>
 ${r>=0?`<div class="nj-det ni-in"><div><span class="ni-tag">Relación marcada</span><br><b>${tcClean(VX_R[r])}</b>${r===12?'<p>Un vínculo kármico: lo vemos en la siguiente diapositiva.</p>':''}</div></div>`:''}</div>`};
RICH.vb13=()=>dkH('Vínculos kármicos','Vínculos kármicos','¿Cómo puede sentirse? Marca lo que reconoces.')+
 `<div class="ni dk-split" style="align-items:start"><div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Qué es</span><p style="margin:0;font:400 1.12rem/1.55 var(--f-display);color:#ece7d3">Una relación con algo pendiente entre dos almas: una deuda, un daño o una promesa.</p><p style="margin:0;font:italic 400 1.05rem/1.5 var(--f-display);color:#f2c66d">No es un castigo: es una oportunidad de cerrar lo que quedó abierto.</p></div>
 <div>${n3ck('vb13',[['enlace','Atracción o rechazo inmediato al conocer a alguien'],['espiral','Una relación que se repite con distintas personas'],['nudo','Una dependencia difícil de soltar'],['rayo','Conflictos intensos sin una causa clara']])}</div></div>
 <div class="ni" style="margin-top:14px">${niBox('l','Pregunta al grupo','¿Hay alguien en tu vida a quien sentiste conocer desde siempre?')}${n3area('vb13a','Anota lo tuyo','Siento que conozco desde siempre a…')}</div>`;
RICH.vb14=()=>{const s=st('vb14',-1),X=[['grupo','En la familia','Los roles pueden cambiar: quien hoy es madre pudo ser hija, hermana o amiga.'],['corazon','En la pareja','Uniones que se sienten conocidas o que repiten un mismo final.'],['enlace','En la amistad','Amistades profundas que nacen de inmediato o se reencuentran tras años.']];
 return dkH('Reencuentros','Las almas que se reencuentran','Tres lugares donde se reencuentran. Toca cada uno.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-3">${X.map((x,i)=>`<button class="${i===1&&s<0?'':''}" ${rxa('set','vb14',s===i?-1:i)} ${pressed(s===i)}>${ic(x[0],28)}<h3>${x[1]}</h3><p>${x[2]}</p></button>`).join('')}</div>
 <div class="ni-hyp"><p>Reencontrarse es una oportunidad para sanar lo pendiente, no una obligación de seguir juntas.</p></div></div>`};

/* ----- 7 · Fechas: cuándo se activó ----- */
RICH.vb15=()=>{const v=st('vfv',-1);
 return dkH('Gráfico de Fechas','¿Cuándo se activó en esta vida?','El anillo «Esta vida»: gestación, nacimiento y tramos de edad. Toca una etapa.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('vb15O','vidas/fechas.webp','Lámina original del gráfico de Fechas de Casa Muladhara',vfChart({ring:'v',cap:0}))}</div>
 <div style="display:grid;gap:10px"><div class="vb-et">${VF_V.map((x,i)=>`<button ${rxa('vfc','v',i)} ${pressed(v===i)} style="animation-delay:${i*.04}s">${tcClean(x)}</button>`).join('')}</div>
 ${niBox('l','Para qué sirve','Saber cuándo la memoria empezó a actuar hoy.')}${niBox('d','Qué observar','Qué pasó en esa etapa: una pérdida, un encuentro, un cambio.')}
 ${v>=0?`<div class="ni-in">${n3area('vb15a','¿Qué pasó en tu vida '+(v<2?'en la '+tcClean(VF_V[v]).toLowerCase():'entre los '+tcClean(VF_V[v]))+'?','Una pérdida, un encuentro, un cambio…')}</div>`:''}</div></div>
 ${niQ('La memoria suele activarse en una etapa que se parece a esa historia.')}</div>`};

/* ----- 8 · Limpiar, ejemplo y práctica ----- */
const VB_LM=[['Limpiar el daño','Como aprendiste en Radiestesia y Sanación del Alma.'],['Liberar el vínculo','Si hay una relación kármica con alguien de esta vida.'],['Verificar','Confirmar con el péndulo que la limpieza se completó.'],['Agradecer','A esa vida y a lo que vino a enseñar.']];
RICH.vb16=()=>{const s=n3clamp(st('vb16',0),0,4);
 return dkH('Limpieza','Limpiar la memoria','Cuatro pasos, en este orden.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow">${VB_LM.map((x,i)=>`<div class="${i<s?'lit':''}"><small>Paso ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>
 ${s<4?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','vb16',s+1)}>${s?'Siguiente paso':'Empezar'}</button></div>`:`<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','vb16',0)}>Ver de nuevo</button></div>`}
 ${niQ('Comprender la historia prepara para soltarla.')}</div>`};
const VB_EJ=[['Vida pasada','2 vidas atrás · S. XIX · 60 a 69'],['Daño','Emocional · mayor'],['Anexo','Mujer · pobre · criada'],['Relación','Dependencia'],['Activación','15 a 21 años']];
RX.vbex=()=>{Object.assign(RS,{vfq:0,vfn:2,vfs:7,vfa:6,vfv:4,vih:0,vit:{1:1},vii:1,vxs:1,vxc:1,vxr:14,vxp:11,vb17v:1});render(false)};
RICH.vb17=()=>{const s=n3clamp(st('vb17',0),0,5),v=st('vb17v',0);
 return dkH('Ejemplo','Ejemplo de lectura completa','Consultante: M. S., una relación de dependencia con su hermana que no logra soltar.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow va-5">${VB_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','vb17',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>En esa vida, siendo criada, dependía de ella para sobrevivir. A los 18 años, cuando su hermana se fue de casa, la memoria se activó y la dependencia se repitió.</p></div>
 <div class="dk-cta" style="justify-content:center">${v?'':`<button class="btn btn-primary btn-sm" ${rxa('vbex',0)}>Verlo en los gráficos</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','vb17',0)}>Ver de nuevo</button></div>
 ${v?`<div class="dk-grid c2 ni-in" style="align-items:start"><div>${vxChart({cap:'Anexo: mujer, pobre, dependencia, criada.'})}</div><div>${vfChart({ring:'v',cap:'Fechas: se activó entre los 15 y 21 años.'})}</div></div>`:''}`}</div>`+niNote('Se limpia el daño, se libera el vínculo, se verifica y se agradece. Ejemplo ficticio.')};
const VB_PS=[['El anexo','Retoma la vida pasada de tu tarea y decidan si hace falta el anexo.'],['Completar','Tu pareja mide en el anexo solo lo que ayuda a completar la historia.'],['Fechas','Midan en qué etapa de esta vida se activó.'],['Limpiar y cambiar','Limpien, liberen el vínculo si lo hay, verifiquen y cambien de rol.']];
RICH.vb18=()=>{const s=n3clamp(st('vb18',0),0,3);
 return dkH('Práctica en parejas','Práctica en parejas','Cuatro pasos. El botón llena la ficha con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${VB_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','vb18',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','vb18',s+1)}>Siguiente paso</button></div>`:''}
 ${s===1?`<div class="dk-cta" style="justify-content:center">${vaGo(-5,'Abrir el anexo')}</div>`:s===2?`<div class="dk-cta" style="justify-content:center">${vaGo(-1,'Abrir Esta vida')}</div>`:''}
 ${niFicha('vbf',['Consultante','Vida pasada','Daño','Sexo','Clase social','Profesión','Relación','Activación','Limpieza'],['M. S.','2 · S. XIX · 60–69','Emocional · mayor','Mujer','Pobre','Criada','Dependencia','15 a 21','Sí · verificada'],()=>{const f=vfRead(),v=viRead(),x=vxRead();return ['',[f[1],f[2]].filter(Boolean).join(' · '),[v[1],v[2]].filter(Boolean).join(' · '),x[0],x[1],x[3],x[2],vfAct().replace(' años',''),'']},1040)}</div>`+niNote('Usa iniciales; la primera fila es un ejemplo ficticio.')};

/* ----- 9 · Reglas de oro, repaso y tarea ----- */
RICH.vb19=()=>dkH('Reglas de oro','Reglas de oro y comprobemos','Marca cada regla. Después respondan en voz alta y toquen cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px">${n3ck('vbro',[['chat','Hablar siempre en hipótesis'],['balanza','No culpar a nadie de hoy por lo que pasó en otra vida'],['enlace','No usar una lectura para romper o forzar un vínculo'],['persona','No decidir por otra persona a partir de su historia']],['Marca cada regla de oro.','Estas reglas acompañan cada lectura del anexo.'])}
 <div class="ni-cp">${n3flip('vbcp',[['libro','1 · ¿Cuándo se usa el anexo de investigación?','<b>Solo cuando falta completar la historia:</b> si el daño involucra a alguien de esta vida, si el patrón tiene que ver con dinero, poder o trabajo, o si la persona necesita el contexto para soltar.'],['enlace','2 · ¿Qué es un vínculo kármico?','<b>Una relación con algo pendiente entre dos almas:</b> una deuda, un daño o una promesa. No es un castigo, es una oportunidad de cerrar lo que quedó abierto.'],['reloj','3 · ¿Dónde se mide en qué etapa de esta vida se activó una memoria?','<b>En el gráfico de Fechas, en el anillo «Esta vida»:</b> gestación, nacimiento y tramos de edad.']],'c3',250)}</div></div>`;
RICH.vb20=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Completa la historia de tu vida pasada.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('vbta',[['lupa','Decide si necesitas el anexo para comprenderla'],['diana','Si lo usas, mide solo lo que completa la historia'],['enlace','Pregunta si se relaciona con alguien de esta vida y qué relación tuvieron'],['reloj','Mide en qué etapa de esta vida se activó'],['limpia','Limpia, verifica, agradece y completa la ficha']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 3.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Lo que descubras sobre una persona de tu vida es para tu comprensión. No se lo comuniques como un hecho. Trae tu ficha.')}<div class="dk-cta">${vaGo(-1,'Abrir mi ficha')}</div></div></div>`;

/* ---------- Nivel 4 · Especialización Vidas Pasadas · Clase 3 ---------- */
(function(){const c=document.createElement('style');c.id='vc-css';c.textContent=`
.vc-cz{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.vc-cz>button{all:unset;box-sizing:border-box;cursor:pointer;padding:12px 14px;border-radius:12px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);font:600 .92rem/1.3 var(--f-body,inherit);animation:niUp .35s both;transition:transform .25s,background .25s}
.vc-cz.c>button{background:var(--ni-lil);border-color:var(--ni-lil);text-align:center;font-weight:600}
.vc-cz>button[aria-pressed="true"]{background:var(--ni-olv);border-color:var(--ni-olv);color:#fff;transform:translateY(-3px)}
.vc-cz.c5{grid-template-columns:repeat(5,minmax(0,1fr))}
.vc-alert{border-radius:14px;padding:14px 18px;background:#f6dde4;color:#5a2337;font-weight:600;line-height:1.5;animation:niUp .45s both}
.vc-born{display:grid;gap:8px}
.vc-born>button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:4px;padding:12px 16px;border-radius:12px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .4s both;transition:transform .25s,background .25s}
.vc-born small{font:600 .56rem/1 var(--f-caps);letter-spacing:.16em;text-transform:uppercase;color:var(--ni-lil2)}
.vc-born b{font:italic 400 1.08rem/1.35 var(--f-display)}
.vc-born>button[aria-pressed="true"]{background:var(--ni-olv);color:#fff;transform:translateX(5px)}.vc-born>button[aria-pressed="true"] small{color:#d9c9ef}
.vc-vf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.vc-vf>button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;padding:14px 16px;display:grid;gap:6px;align-content:start;min-height:108px;border:1px solid var(--nb-line);background:var(--nb-paper);color:var(--nb-ink);animation:niUp .4s both;transition:transform .25s,background .25s,box-shadow .25s}
.vc-vf>button.l{background:var(--ni-lil);border-color:var(--ni-lil)}
.vc-vf b{font:400 1.06rem/1.2 var(--f-display)}.vc-vf span{font-size:.84rem;line-height:1.45;color:var(--nb-soft)}
.vc-vf>button[aria-pressed="true"]{transform:translateY(-3px);box-shadow:0 0 0 2px var(--ni-lil2)}
.vc-calm{border-radius:18px;padding:18px 20px;background:var(--ni-lil);color:#3b2a5a;display:grid;gap:10px;align-content:start;position:relative;overflow:hidden}
.vc-calm p{margin:0;font:italic 400 1.18rem/1.55 var(--f-display)}
.vc-calm i{position:absolute;right:-30px;bottom:-30px;width:120px;height:120px;border-radius:50%;background:rgba(122,90,166,.18);animation:vcBreath 6s ease-in-out infinite}
@keyframes vcBreath{0%,100%{transform:scale(.7);opacity:.5}50%{transform:scale(1.15);opacity:1}}
@media (max-width:760px){.vc-cz,.vc-cz.c5,.vc-vf{grid-template-columns:1fr 1fr}}
`;document.head.appendChild(c)})();

const vcPhoto=alt=>`<div class="ni-ph"><img src="${N4P}vidas/c3-portada.webp" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#efe4f3" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#b9a3f1" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3b4a24"/></svg></div>`;

/* el gráfico de Causas de Muerte: causa y edad al morir (0 a 100) */
const VM_C=['Muerte natural','Vejez','Complicación de herida','Acto de violencia','Infecciones','Abortos','Parto','Ejecución','Sacrificios rituales','Hambruna','Asesinato','Suicidio','Sobredosis','Envenenamiento','Inquisición','Tortura','En prisión','Enfermedad','Violencia sexual','En terremoto','Por asfixia','En inundación','Quemado','Guerra','Caída accidental','Peste','Picadura de animal','Animal','Disparo','Accidente','Secuestro','Muerte súbita','Decapitado','Catástrofe','Cirugía','Otro'];
RX.vmc=(k,v)=>{const K='vm'+k;RS[K]=st(K,-1)===+v?-1:+v;render(false)};
const vmChart=o=>{o=o||{};return niFan({label:'Gráfico de Causas de Muerte',act:'vmc',inner:50,sel:(k,i)=>st('vm'+k,-1)===i,
 hot:o.ring||o.hot?(k,i)=>o.hot?(o.hot(k,i)?1:-1):(k===o.ring?0:-1):0,
 rings:[{k:'c',r0:62,r1:256,items:VM_C,fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:7.6},
  {k:'e',r0:256,r1:280,items:Array.from({length:21},(_,i)=>String(i*5)),fill:'#efe4f3',on:'#7a5aa6',m:'tan',fs:7.5}],cap:o.cap===0?'':o.cap||'Toca la causa y después la edad al morir en el borde.'})};
const vmRead=()=>{const c=st('vmc',-1),e=st('vme',-1);return [c<0?'':VM_C[c],e<0?'':e*5+' años']};

/* el gráfico de Votos o Pactos, con sus propias marcas para Vidas pasadas */
RX.vvc=(k,v)=>{const K='vv'+k;RS[K]=st(K,-1)===+v?-1:+v;render(false)};
const vvChart=o=>{o=o||{};return niFan({label:'Gráfico de Votos o Pactos',act:'vvc',inner:50,sel:(k,i)=>st('vv'+k,-1)===i,
 hot:o.ring||o.hot?(k,i)=>o.hot?(o.hot(k,i)?1:-1):(k===o.ring?0:-1):0,
 rings:[{k:'n',r0:62,r1:125,items:TV_N.map((t,i)=>({t,c:['#efeafa','#e1d8f7','#cfc3f4','#b9a3f1'][i]})),on:'#6a4aa6',m:'tan',fs:11},
  {k:'v',r0:125,r1:258,items:TV_V,fill:'#ffffff',on:'#3f7d6e',m:'rad',fs:7.4},
  {k:'e',r0:258,r1:280,items:Array.from({length:21},(_,i)=>String(i*5)),fill:'#efe4f3',on:'#7a5aa6',m:'tan',fs:7.5}],cap:o.cap===0?'':o.cap||'Toca el voto, el nivel y la escala.'})};
const vvRead=()=>{const v=st('vvv',-1),n=st('vvn',-1),e=st('vve',-1);return [v<0?'':tcClean(TV_V[v]),n<0?'':TV_N[n],e<0?'':String(e*5)]};

/* ----- 1 · Bienvenida y agenda ----- */
RICH.vc1=()=>`<div class="ni">${nbHero('Especialización Vidas Pasadas · Clase 3','Cómo terminó','y qué prometí','Cómo terminó esa vida y qué promesa quedó activa: el gráfico de Causas de Muerte, cómo leer con cuidado las muertes delicadas, los votos de vidas pasadas y la oración para anularlos.',['Causas de Muerte','Leer con cuidado','Votos','Oración'],'Karen Oyarce · Maestra Holística',vcPhoto('Un reloj de arena, una vela encendida, un libro antiguo y una pluma sobre una mesa de madera junto a una ventana'))}</div>`;
RICH.vc2=()=>niAgenda('Clase 3',['Revisión de la tarea y ronda','Por qué importa cómo terminó una vida','El gráfico de Causas de Muerte','Cómo se expresa hoy y cómo leer con cuidado','Los votos de vidas pasadas','La oración de Votos','Ejemplo, práctica y repaso','Tarea'],
 ['Leer la causa de muerte y la edad al morir','Leer con cuidado las muertes delicadas y saber cuándo derivar','Detectar un voto de otra vida, su nivel y su escala','Anular un voto con la oración']);

/* ----- 2 · Revisión de la tarea y ronda ----- */
const VC_RV=['¿Usaste el anexo? ¿Qué te ayudó a comprender?','¿Apareció una relación con alguien de esta vida?','¿En qué etapa de esta vida se activó la memoria?','¿Qué sentiste después de limpiar y agradecer?','¿A quién le apareció un daño mortal? Lo vemos hoy'];
RICH.vc3=()=>{const s=st('vc3',-1),x=vxRead(),m=viTipos().includes(4)||st('vii',-1)===2;
 return dkH('Lo que trajiste','Revisemos la tarea de la semana','La historia completa de tu vida pasada. Toca una pregunta para anotar tu respuesta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start">
 <div style="display:grid;gap:10px"><div class="dk-sub" style="margin:0">Lo que marcaste en la Clase 2</div>${tcRow(['Sexo','Clase social','Relación','Profesión','Activación'],[...x,vfAct()])}${x.some(Boolean)?'':niNote('Aquí aparece lo que marcaste en el anexo y en el anillo «Esta vida».')}
 ${m?niBox('d','En tu tarea apareció un daño mortal','Es justo lo que vemos hoy con el gráfico de Causas de Muerte.'):''}</div>
 <div style="display:grid;gap:10px">${tbList('vc3',VC_RV)}${s>=0?`<div class="ni-in">${n3area('vc3a'+s,VC_RV[s],'Lo que noté…')}</div>`:''}</div></div>
 ${niQ('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.')}</div>`};
RICH.vc4=()=>dkH('Lo que trajiste','Ronda de descubrimientos','Una o dos frases por persona. Si quieres, anota la tuya.')+
 `<div class="ni vb-ron">${[['Lo que comprendí','Algo de esa vida que hoy miro distinto.'],['Lo que solté','Algo que se sintió más liviano después de limpiar.'],['Lo que me pregunto','Lo que aún quiero saber de esa historia.']].map((x,i)=>`<div><h3>${x[0]}</h3><p>${x[1]}</p><textarea data-rsin="vc4${i}" aria-label="${x[0]}" placeholder="Escribe aquí…">${esc(st('vc4'+i,''))}</textarea></div>`).join('')}</div>`+n3priv;

/* ----- 3 · Por qué importa cómo terminó una vida ----- */
RICH.vc5=()=>{const s=st('vc5',-1),X=[['corazon','Lo que se sintió','Miedo, dolor, soledad o injusticia en los últimos momentos.'],['reloj','Lo que quedó pendiente','Despedidas, tareas o vínculos que no alcanzaron a cerrarse.'],['nudo','Lo que se prometió','Votos hechos en el sufrimiento: «nunca más», «nunca volveré a».']];
 return dkH('El final de una vida','Por qué importa cómo terminó una vida','Tres cosas que pueden quedar sin cerrar. Toca cada una.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-hyp"><p>El final de una vida es un momento intenso. Lo que el alma sintió o prometió en ese momento puede quedar sin cerrar.</p></div>
 <div class="va-3">${X.map((x,i)=>`<button class="${i===2?'d':''}" ${rxa('set','vc5',s===i?-1:i)} ${pressed(s===i)}>${ic(x[0],28)}<h3>${x[1]}</h3><p>${x[2]}</p></button>`).join('')}</div>
 ${s===2?niBox('l','Lo veremos hoy','Los votos hechos en el sufrimiento se miden en el gráfico de Votos o Pactos y se anulan con su oración.'):''}
 ${niBox('l','Pregunta al grupo','¿Por qué crees que el momento de la muerte puede dejar huella en el alma?')}${n3area('vc5a','Anota lo tuyo','Creo que…')}</div>`};

/* ----- 4 · El gráfico de Causas de Muerte ----- */
const VM_RG=[['c','1. Causa','Cuál de las causas del gráfico, o «Otro».'],['e','2. Edad al morir','En el borde: de 0 a 100 años.']];
RICH.vc6=()=>{const s=st('vc6',-1);
 return dkH('Causas de Muerte','El gráfico de Causas de Muerte','Se mide primero la causa y después la edad al morir. Toca un paso o explora el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('vc6O','vidas/muerte.webp','Lámina original del gráfico de Causas de Muerte de Casa Muladhara',vmChart({ring:s>=0?VM_RG[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('vc6',VM_RG.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${niBox('d','Cuándo se usa','Si el daño fue mortal o el final es parte del motivo.')}${tcRow(['Causa','Edad al morir'],vmRead())}</div></div>
 ${niQ('Se mide primero la causa y después la edad al morir.')}</div>`};
const VM_G=[[0,1,17,4,25,6,2,34],[29,24,31,19,21,22,20,33,27,26,9],[23,28,10,3,13,7,32,14,15,16,30],[11,12,18,8,5]];
const vcGroup=(g,sub,box)=>{const c=st('vmc',-1),G=VM_G[g];
 return `<div class="ni" style="display:grid;gap:14px">${sub?`<p class="dk-lede" style="margin:0">${sub}</p>`:''}<div class="vc-cz${g===3?' c c5':''}">${G.map((i,k)=>`<button ${rxa('vmc','c',i)} ${pressed(c===i)} style="animation-delay:${k*.04}s">${VM_C[i]}</button>`).join('')}</div>
 ${box}<div style="max-width:620px;width:100%;justify-self:center">${vmChart({hot:(k,i)=>k==='c'&&G.includes(i),cap:'Las causas de este grupo, en el gráfico.'})}</div></div>`};
RICH.vc7=()=>dkH('Causas de Muerte','Muertes naturales y por enfermedad','Finales que llegaron por el cuerpo, la edad o la enfermedad.')+vcGroup(0,'',`<div class="ni-hyp"><p>Pueden dejar miedo a enfermar, a envejecer o a dar a luz.</p></div>`);
RICH.vc8=()=>dkH('Causas de Muerte','Accidente, catástrofe y escasez','Finales repentinos o causados por la naturaleza.')+vcGroup(1,'',`<div class="ni-hyp"><p>Pueden dejar miedos concretos: al agua, al fuego, a las alturas o a que falte el alimento.</p></div>`);
RICH.vc9=()=>dkH('Causas de Muerte','Muertes por violencia','Finales causados por otras personas o por el poder de una época.')+vcGroup(2,'',`<div class="ni-hyp"><p>Se nombran sin buscar detalles. Pueden dejar desconfianza, miedo a mostrarse o sensación de injusticia.</p></div>`);
RICH.vc10=()=>dkH('Causas de Muerte','Muertes que piden más cuidado','Se nombran con respeto, se limpian y no se profundiza.')+vcGroup(3,'',`<div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Cómo se leen</span><ul class="ni-st" style="margin:0;padding-left:18px;display:grid;gap:8px;color:#dfe3cf;line-height:1.5"><li>Se nombran con respeto, se limpian y no se profundiza</li><li>No se pregunta cómo ocurrió</li><li>Si la persona relata algo propio de esta vida, o ideas de hacerse daño: se detiene la lectura, se acompaña y se deriva a un profesional</li></ul></div><div class="vc-alert">Ante cualquier riesgo actual para alguien, se contacta a los servicios de emergencia.</div>`);

/* ----- 5 · Cómo se expresa hoy y cómo leer con cuidado ----- */
RICH.vc11=()=>{const e=st('vme',-1);
 return dkH('Huellas','Cómo puede expresarse hoy','Cuatro huellas posibles. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px">${n3flip('vc11',[['rayo','Miedos concretos','Al agua, al fuego, a las alturas, a los espacios cerrados.'],['persona','Sensaciones en el cuerpo','Molestias sin explicación aparente, siempre después de consultar a un profesional.'],['xcirc','Rechazos','A lugares, épocas, objetos o situaciones sin saber por qué.'],['reloj','Una edad sensible','Inquietud al acercarse a la edad en que terminó esa vida.']],'c4',180)}
 ${e>=0?niBox('l','Edad al morir que marcaste: '+e*5+' años','Si hoy te acercas a esa edad, observa con calma lo que sientes.'):''}
 ${niQ('Son huellas posibles, no pruebas.')}</div>`};
RICH.vc12=()=>dkH('Cuidado','Leer con cuidado','Seis acuerdos para leer una causa de muerte. Márcalos a medida que los conversan.')+
 `<div class="ni dk-split" style="align-items:start"><div>${n3ck('vc12',[['chat','Nombrar la causa sin agregar detalles'],['balanza','No afirmar: «el gráfico muestra una posible…»'],['xcirc','No preguntar cómo ocurrió ni pedir que lo imagine'],['ojo','Observar a la persona: su respiración, su cuerpo, sus palabras'],['limpia','Limpiar, verificar y volver al presente con calma'],['escudo','Si aparece algo propio de esta vida, detenerse y derivar']],['Marca cada acuerdo.','Así se lee una causa de muerte: con calma y sin detalles.'])}</div>
 <div class="vc-calm"><i></i><span class="ni-tag">Frase para acompañar</span><p>«Esa vida ya terminó. Hoy estás aquí, a salvo. Lo que quedó de ese final lo podemos soltar ahora.»</p></div></div>`;

/* ----- 6 · Los votos de vidas pasadas ----- */
const VC_BN=[['En la vida religiosa','pobreza, castidad, obediencia'],['En el sufrimiento','«nunca más volveré a amar»'],['En el momento de morir','«nunca volveré a confiar»'],['En un pacto','con otra persona o con un grupo']];
RICH.vc13=()=>{const s=st('vc13',-1);
 return dkH('Votos','Los votos de vidas pasadas','¿Cómo puede nacer un voto? Toca cada forma.')+
 `<div class="ni dk-split" style="align-items:start"><div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Qué es</span><p style="margin:0;font:400 1.15rem/1.55 var(--f-display);color:#ece7d3">Una promesa, un juramento o un pacto que el alma hizo en otra vida y sigue cumpliendo en esta, aunque ya no tenga sentido.</p></div>
 <div class="vc-born">${VC_BN.map((x,i)=>`<button ${rxa('set','vc13',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.07}s"><small>${x[0]}</small><b>${x[1]}</b></button>`).join('')}</div></div>
 <div class="ni" style="margin-top:14px">${niBox('l','Pregunta al grupo','¿Qué promesa podría estar cumpliendo tu alma sin saberlo?')}${n3area('vc13a','Anota lo tuyo','Quizás mi alma prometió…')}</div>`};
const VV_RG=[['v','1. Voto','Cuál de los 27 votos está activo.'],['n','2. Nivel','Bajo, medio, alto o muy alto.'],['e','3. Escala','De 0 a 100: cuánto pesa hoy.']];
RICH.vc14=()=>{const s=st('vc14',-1);
 return dkH('Votos o Pactos','El gráfico de Votos o Pactos','Tres pasos. Toca uno para verlo o explora el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('vc14O','vidas/votos.webp','Lámina original del gráfico de Votos o Pactos de Casa Muladhara',vvChart({ring:s>=0?VV_RG[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('vc14',VV_RG.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${tcRow(['Voto','Nivel','Escala'],vvRead())}</div></div>
 ${niQ('Se anula con la oración de Votos.')}</div>`};
const VC_VF=[[1,'Votos de pobreza','El dinero llega y no se queda.'],[4,'Votos de castidad','Bloqueo para disfrutar del cuerpo y la pareja.'],[5,'Votos de obediencia','Cuesta decir que no.'],[16,'Votos de silencio','No poder expresar lo que se siente.'],[22,'Votos de sacrificio','Darlo todo y no recibir.'],[14,'Votos de sufrimiento','Sentir que la vida tiene que doler.'],[3,'Seguir a un fallecido','Sentir que una parte se fue con alguien que murió.'],[19,'Renunciar al amor','Relaciones que no llegan a concretarse.']];
RICH.vc15=()=>{const v=st('vvv',-1);
 return dkH('Votos','Votos frecuentes de otras vidas','Ocho votos frecuentes. Toca uno para marcarlo en el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="vc-vf">${VC_VF.map((x,k)=>`<button class="${k===0||k===5?'l':''}" ${rxa('vvc','v',x[0])} ${pressed(v===x[0])} style="animation-delay:${k*.04}s"><b>${x[1]}</b><span>${x[2]}</span></button>`).join('')}</div>
 <div style="max-width:620px;width:100%;justify-self:center">${vvChart({hot:(k,i)=>k==='v'&&VC_VF.some(x=>x[0]===i),cap:'Los ocho votos frecuentes, en el gráfico.'})}</div>
 ${niQ('Son huellas posibles: la persona confirma lo que le hace sentido.')}</div>`};
RICH.vc16=()=>{const s=st('vc16',-1);
 return dkH('Dos orígenes','Votos del linaje y votos de vidas pasadas','Toca cada origen.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-3" style="grid-template-columns:repeat(2,minmax(0,1fr))"><button ${rxa('set','vc16',s===0?-1:0)} ${pressed(s===0)}><span class="ni-tag">En Transgeneracional</span><h3>Votos heredados del linaje</h3><p>Promesas de padres, abuelos o bisabuelos que siguen actuando en el clan.</p></button>
 <button class="d" ${rxa('set','vc16',s===1?-1:1)} ${pressed(s===1)}><span class="ni-tag">En Vidas Pasadas</span><h3>Votos de otras vidas</h3><p>Promesas que mi propia alma hizo en otra vida y sigue cumpliendo.</p></button></div>
 ${s===0?`<div class="nj-det ni-in"><div><span class="ni-tag">Repasar</span><br><b>Los votos del linaje</b><p>Los viste en la Clase 3 de Transgeneracional.</p></div><button class="btn btn-ghost btn-sm" data-les="2,24">Ir a Votos del linaje</button></div>`:''}
 ${niQ('La oración de Votos nombra a ambos: las vidas pasadas y lo heredado del linaje.')}</div>`};

/* ----- 7 · La oración de Votos ----- */
RICH.vc17=()=>{const n=esc(st('tcnm',''))||'…………',v=st('vvv',-1),vt=v>=0?tvDe(tcClean(TV_V[v])):'………';
 return dkH('Anular un voto','La oración de Votos','Escribe tu nombre, elige el voto y dila frase a frase.')+`<div class="ni" style="display:grid;gap:12px">${tcName()}
 <div><div class="dk-sub">El voto que vas a anular</div>${chipRow('vvv',TV_V.map(tcClean),v)}</div>
 ${n3pray('vcvo',['Desde mi amada y divina presencia YO SOY, a todos mis guías y seres de luz que me acompañan,','pido permiso para anular todos los votos kármicos limitantes contraídos en cualquier vida pasada, simultánea, plano o dimensión en que mi ser exista, o heredados de mi linaje.',`Yo ${n} anulo y cancelo todos los votos de ${esc(vt)},`,'me libero de ellos para siempre y los transformo, recuperando así mi poder personal y mi voluntad.','Gracias, gracias, gracias.'])}</div>`};

/* ----- 8 · Ejemplo, práctica y repaso ----- */
const VC_EJ=[['Causa de muerte','En inundación'],['Edad al morir','34 años'],['Voto','Votos de sufrimiento'],['Nivel y escala','Medio · 55'],['Cierre','Oración de Votos']];
RX.vcex=()=>{Object.assign(RS,{vmc:21,vme:-1,vvv:14,vvn:1,vve:11,vc18v:1});render(false)};
RICH.vc18=()=>{const s=n3clamp(st('vc18',0),0,5),v=st('vc18v',0);
 return dkH('Ejemplo','Ejemplo: de la causa de muerte al voto','Consultante: P. R., miedo intenso al agua. Clase 1: 3 vidas atrás, siglo XVII, daño físico mortal.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow va-5">${VC_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','vc18',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>Esa vida terminó en una inundación a los 34 años. En ese final, el alma sintió que la vida tenía que doler. El miedo al agua y esa sensación pueden venir de ahí.</p></div>
 <div class="dk-cta" style="justify-content:center">${v?'':`<button class="btn btn-primary btn-sm" ${rxa('vcex',0)}>Verlo en los gráficos</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','vc18',0)}>Ver de nuevo</button></div>
 ${v?`<div class="dk-grid c2 ni-in" style="align-items:start"><div>${vmChart({hot:(k,i)=>k==='c'?i===21:i===6||i===7,cap:'Causas de Muerte: en inundación, a los 34 años (entre 30 y 35).'})}</div><div>${vvChart({cap:'Votos: sufrimiento, nivel medio, escala 55.'})}</div></div>`:''}`}</div>`+niNote('Se limpia, se anula el voto con la oración, se verifica y se agradece. Ejemplo ficticio.')};
const VC_PS=[['Consentimiento','Retoma tu vida pasada y pide consentimiento.'],['Causa y edad','Midan la causa y la edad al morir, con cuidado.'],['El voto','Pregunten si hay un voto: cuál, nivel y escala.'],['Anular y cambiar','Limpien, anulen el voto con la oración y cambien de rol.']];
RICH.vc19=()=>{const s=n3clamp(st('vc19',0),0,3);
 return dkH('Práctica en parejas','Práctica en parejas','Cuatro pasos. El botón llena la ficha con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${VC_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','vc19',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','vc19',s+1)}>Siguiente paso</button></div>`:''}
 ${s===1?`<div class="dk-cta" style="justify-content:center">${vaGo(-4,'Abrir Causas de Muerte')}</div>`:s===2?`<div class="dk-cta" style="justify-content:center">${vaGo(-2,'Abrir Votos o Pactos')}</div>`:s===3?`<div class="dk-cta" style="justify-content:center">${vaGo(-1,'Abrir la oración')}</div>`:''}
 ${niFicha('vcf',['Consultante','Vida pasada','Causa de muerte','Edad al morir','Voto','Nivel · escala','Anulado'],['P. R.','3 · S. XVII · físico mortal','En inundación','34','Votos de sufrimiento','Medio · 55','Sí · verificado'],()=>{const f=vfRead(),m=vmRead(),v=vvRead();return ['',[f[1],f[2]].filter(Boolean).join(' · '),m[0],m[1].replace(' años',''),v[0],[v[1],v[2]].filter(Boolean).join(' · '),'']},900)}</div>`+niNote('Usa iniciales; la primera fila es un ejemplo ficticio.')};
RICH.vc20=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('vccp',[['reloj','1 · ¿Qué se mide en el gráfico de Causas de Muerte?','<b>La causa y la edad al morir,</b> en ese orden. Se usa si el daño fue mortal o el final es parte del motivo.'],['escudo','2 · ¿Cómo se lee una muerte que pide más cuidado?','<b>Se nombra con respeto, se limpia y no se profundiza.</b> No se pregunta cómo ocurrió. Si aparece algo propio de esta vida, se detiene la lectura, se acompaña y se deriva.'],['paloma','3 · ¿Cómo se anula un voto de otra vida?','<b>Con la oración de Votos,</b> nombrando el voto que apareció en el gráfico. Después se verifica y se agradece.']],'c3',260)}</div>`;

/* ----- 9 · Tarea ----- */
RICH.vc21=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Cierra la historia de tu vida pasada.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('vcta',[['reloj','Si hubo daño mortal, mide la causa y la edad al morir'],['nudo','Pregunta si esa vida dejó un voto: cuál, nivel y escala'],['limpia','Limpia lo encontrado y verifica'],['paloma','Anula el voto con la oración de Votos'],['corazon','Agradece a esa vida y completa la ficha']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 4.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Hazlo en un momento tranquilo. Si algo te remueve mucho, detente y pide apoyo. Trae tu ficha a la Clase 4.')}<div class="dk-cta">${vaGo(-1,'Abrir mi ficha')}</div></div></div>`;

/* ---------- Nivel 4 · Especialización Vidas Pasadas · Clase 4 ---------- */
const vdPhoto=alt=>`<div class="ni-ph"><img src="${N4P}vidas/c4-portada.webp" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#d6e8e2" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#b9a3f1" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#3b4a24"/></svg></div>`;

/* ----- 1 · Bienvenida y agenda ----- */
RICH.vd1=()=>`<div class="ni">${nbHero('Especialización Vidas Pasadas · Clase 4','La sesión','de vidas pasadas','Todo lo aprendido se integra en una sesión completa: antes, durante y después, cómo comunicar en hipótesis y sin fantasía, cuándo derivar y la evaluación práctica.',['Encuadre','Protocolo','Cierre','Evaluación'],'Karen Oyarce · Maestra Holística',vdPhoto('Una mujer de perfil, con los ojos cerrados, entre columnas antiguas cubiertas de hiedra al atardecer'))}</div>`;
RICH.vd2=()=>niAgenda('Clase 4',['Revisión de la tarea','El camino recorrido','La sesión: antes, durante y después','Comunicar y cuidar','Cierre y ficha de sesión','Demostración y evaluación práctica','Tres miradas y repaso','Certificación y cuidado de la facilitadora','Ritual, oración y cierre'],
 ['Realizar una sesión de vidas pasadas completa','Comunicar en hipótesis, sin fantasía','Cuidar los temas sensibles y derivar','Aprobar la evaluación práctica']);

/* ----- 2 · Revisión de la tarea ----- */
RICH.vd3=()=>dkH('Lo que trajiste','Revisemos la tarea de la semana','El cierre de tu vida pasada. Marca las preguntas a medida que las conversan.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="nj-card l ni-in" style="min-height:0"><h3>El cierre de tu vida pasada</h3>${n3ck('vdt1',[['reloj','¿Apareció una causa de muerte? ¿A qué edad?'],['nudo','¿Qué voto encontraste, con qué nivel y escala?'],['voz','¿Cómo te sentiste al decir la oración de Votos?'],['hoja','¿Qué cambió en ti durante la semana?'],['chat','¿Qué duda te quedó?']])}</div>
 <div style="display:grid;gap:10px"><div class="dk-sub">Lo que marcaste en los gráficos</div>${tcRow(['Causa','Edad al morir'],vmRead())}${tcRow(['Voto','Nivel','Escala'],vvRead())}<div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},21">Causas de Muerte</button><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},23">Votos o Pactos</button></div></div></div>`+
 niNote('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.');

/* ----- 3 · El camino recorrido ----- */
const VD_CA=[['Clase 1','La memoria del alma','Vida activa, vidas atrás, época, daño, tipo e intensidad.',0],['Clase 2','Quién fui y con quién','El anexo, los vínculos kármicos y cuándo se activó en esta vida.',9],['Clase 3','Cómo terminó y qué prometí','Causas de muerte, votos de otras vidas y su oración.',18],['Clase 4','La sesión completa','Antes, durante y después; comunicación, cuidado y evaluación.',27]];
RICH.vd4=()=>dkH('El camino recorrido','El camino recorrido','Toca una clase para volver a ella.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nl-path">${VD_CA.map((x,i)=>`<button data-les="${S.lesson[0]},${x[3]}" style="animation-delay:${i*.12}s"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span><em>${i<3?'Repasar':'Hoy'}</em></button>`).join('')}</div>
 ${niQ('Hoy todo se integra en una sesión completa.')}</div>`;

/* ----- 4 · La sesión: antes, durante y después ----- */
const VD_MO=[['Antes','Unos 10 minutos',10,['Encuadre y consentimiento','Motivo de consulta','Oración de conexión'],'#e6dcf2','#3b2a5a'],['Durante','Unos 40 minutos',40,['Fechas e Investigación','Anexo y Causas de Muerte si hace falta','Votos, limpieza y verificación'],'#3b4a24','#ece7d3'],['Después','Unos 10 minutos',10,['Volver al presente','Comunicar en hipótesis','Oraciones y ficha'],'#d6e8e2','#1f3f32']];
RICH.vd5=()=>{const s=st('vdmo',-1);
 return dkH('La sesión','La sesión en tres momentos','Una hora de sesión. Toca un momento en la barra.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nl-bar">${VD_MO.map((x,i)=>`<button ${rxa('set','vdmo',s===i?-1:i)} ${pressed(s===i)} style="flex:${x[2]};background:${x[4]};color:${x[5]}">${x[0]} · ${x[2]} min</button>`).join('')}</div>
 <div class="nl-mom">${VD_MO.map((x,i)=>`<div class="${s<0?'':s===i?'on':'off'}" style="background:${x[4]};color:${x[5]}"><h3>${x[0]}</h3><small>${x[1]}</small><ul>${x[3].map((y,j)=>`<li style="animation-delay:${j*.08}s">${y}</li>`).join('')}</ul></div>`).join('')}</div></div>`+
 niNote('Tiempos de referencia para una sesión de una hora.')};
RICH.vd6=()=>dkH('Momento 1','Antes: el encuadre','Marca cada paso a medida que lo haces.')+
 `<div class="ni nl-say"><div>${n3ck('vdan',[['persona','Presentarte y explicar en qué consiste el trabajo con vidas pasadas'],['escudo','Aclarar lo que no es: no reemplaza una terapia ni la atención médica'],['candado','Explicar la confidencialidad y pedir el consentimiento'],['chat','Preguntar el motivo de consulta: qué le gustaría comprender'],['ojo','Recordar que lo que aparezca es una posibilidad'],['loto','Abrir con la oración de conexión']],['Sigue el orden: el encuadre va antes de medir.','¡Encuadre completo! Ya puedes empezar con Fechas.'])}</div>
 <div class="nl-frase"><span class="ni-tag">Frase para empezar</span><p>«Vamos a mirar si hay una experiencia de tu alma que influye en lo que vives hoy. Lo que aparezca es una posibilidad que tú confirmas o descartas. ¿Estás de acuerdo en que comencemos?»</p></div></div>`;
const VD_DU=[['Paso 1','Fechas','Vida activa, vidas atrás y época.',0,[['Abrir Fechas',5]]],['Paso 2','Investigación','Daño, tipo e intensidad.',0,[['Abrir Investigación',6]]],['Paso 3 · si hace falta','Anexo','Solo si falta completar la historia.',1,[['Abrir el anexo',11]]],['Paso 4 · si hace falta','Causas de Muerte','Si el daño fue mortal: causa y edad al morir.',1,[['Abrir Causas de Muerte',21]]],['Paso 5 · si hace falta','Votos o Pactos','Si aparece un voto: nivel y escala.',1,[['Abrir Votos',23]]],['Paso 6','Limpiar y verificar','Como aprendiste; los votos, con su oración.',2,[['Oración de Votos',24]]]];
RICH.vd7=()=>{const s=n3clamp(st('vddu',0),0,5),x=VD_DU[s];
 return dkH('Momento 2','Durante: el protocolo completo','Seis pasos. Toca uno para verlo o repasarlo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-proto vd-6">${VD_DU.map((p,i)=>`<button class="${p[3]===1?'vd-opt':p[3]===2?'new':''}" ${rxa('set','vddu',i)} ${pressed(i===s)} style="animation-delay:${i*.08}s"><small>${p[0]}</small><b>${p[1]}</b><span>${p[2]}</span></button>`).join('')}</div>
 <div class="nj-det"><div><span class="ni-tag">${x[0]}</span><br><b>${x[1]}</b><p>${x[2]}</p></div><div style="display:flex;gap:6px;flex-wrap:wrap">${x[4].map(b=>`<button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${b[1]}">${b[0]}</button>`).join('')}</div></div>
 ${niBox('l','Solo los gráficos que hagan falta.','La sesión es una conversación, no una lectura en voz alta.')}</div>`};

/* ----- 5 · Comunicar y cuidar ----- */
RICH.vd8=()=>dkH('Comunicación','Comunicar en hipótesis y sin fantasía','¿Se dice así o se evita? Lleva cada frase a su columna.')+
 niSort('vdco',[['«El gráfico muestra una posible vida en el siglo XVII, con un daño emocional. ¿Te hace sentido?»',0],['«Fuiste una princesa egipcia.»',1],['«¿Qué sientes al escuchar esto?»',0],['«Tu pareja te hizo daño en otra vida.»',1],['«Esa vida ya terminó; hoy puedes soltar lo que quedó.»',0],['«Por eso estás enferma.»',1],['«Esta sesión te libera de todo tu karma.»',1]],
 [['Decir así','','t','Decir así'],['Evitar','','l','Evitar']],'Hablamos en hipótesis, sin agregar detalles, sin culpar y sin prometer resultados.','Mira otra vez: ¿la frase habla en hipótesis o agrega detalles, culpa o promete?');
const VD_DO=['Detener la lectura y no profundizar','Volver al presente: respirar, sentir los pies, mirar el lugar','Sugerir la ayuda de un profesional de salud','Ante riesgo inmediato, contactar a los servicios de emergencia'];
RICH.vd9=()=>{const o=st('vdse',{}),on=Object.values(o).some(Boolean);
 return dkH('Cuidado','Temas sensibles y derivación','Marca una señal de alerta para ver qué hacer.')+
 `<div class="ni nl-alert"><div class="nj-card" style="background:#f6e2e8;color:#5a2a3a"><h3>Señales de alerta</h3>${n3ck('vdse',[['escudo','La persona relata una violencia que vive hoy'],['gota','Angustia intensa que no baja con el cierre'],['xcirc','Ideas de hacerse daño'],['rayo','Confunde la vida pasada con lo que vive hoy']])}</div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3"><h3>Qué hacer</h3><div class="nl-do${on?' on':''}">${VD_DO.map((x,i)=>`<div style="animation-delay:${i*.12}s"><span class="n">${i+1}</span><span>${x}</span></div>`).join('')}</div>${on?'':'<p style="margin:0;color:#dfe3cf;font-size:.86rem">Marca una señal a la izquierda.</p>'}</div></div>`+
 `<div class="ni">${niQ('Acompañar también es saber cuándo derivar.')}</div>`};

/* ----- 6 · Cierre y ficha de sesión ----- */
RICH.vd10=()=>dkH('Momento 3','Después: cierre de la sesión','Marca cada paso a medida que lo haces.')+
 `<div class="ni nl-say"><div>${n3ck('vdde',[['hoja','Volver al presente: respirar, sentir los pies, abrir los ojos'],['chat','Resumir la lectura en una frase y preguntar cómo se siente'],['voz','Si hubo votos, decir juntas la oración de Votos'],['paloma','Agradecer a esa vida y al comité espiritual'],['libro','Registrar la ficha y sugerir descanso, agua y escribir lo vivido']],['Cierra con calma, sin apurar.','¡Sesión cerrada con cuidado!'])}
 <div class="dk-cta" style="flex-wrap:wrap;margin-top:8px"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},24">Oración de Votos</button></div></div>
 <div class="nl-frase d"><span class="ni-tag">Frase para cerrar</span><p>«Esa vida ya terminó y hoy pudiste mirarla con amor. Lo que reconociste ya no tiene que repetirse. ¿Cómo te sientes ahora?»</p></div></div>`;
RICH.vd11=()=>dkH('Registro','Ficha de sesión de vidas pasadas','Vida pasada: vidas atrás · siglo · años. Muerte: causa · edad. Voto: cuál · nivel · escala. El botón la llena con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:12px">${niFicha('vdf',['Fecha','Consultante','Motivo','Vida pasada','Daño','Anexo','Muerte','Voto','Verificada'],['Ej.: 25/11','P. R.','Miedo al agua','3 · S. XVII · 20–29','Físico · mortal','—','Inundación · 34','Sufrimiento · medio · 55','Sí'],
 ()=>{const f=vfRead(),i=viRead(),x=vxRead(),m=vmRead(),v=vvRead();return [tbHoy(),'','',[f[1],f[2]].filter(Boolean).join(' · '),[i[1],i[2]].filter(Boolean).join(' · '),x.filter(Boolean).join(' · '),[m[0],m[1].replace(' años','')].filter(Boolean).join(' · '),v.filter(Boolean).join(' · '),'']},1140)}</div>`+
 niNote('Usa iniciales; la primera fila es un ejemplo ficticio.');

/* ----- 7 · Demostración y evaluación práctica ----- */
RICH.vd12=()=>dkH('En vivo','Demostración en vivo','Observa la sesión completa y toma nota.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="nj-card l" style="min-height:0"><h3>Una sesión completa en vivo</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;line-height:1.5" class="ni-st"><li>Con una voluntaria del grupo y un tema liviano</li><li>Antes, durante y después, sin saltar pasos</li><li>Solo los gráficos que hagan falta</li><li>Pausas breves para explicar cada decisión</li></ul></div>
 <div class="nj-card" style="background:var(--ni-olv);color:#ece7d3;min-height:0"><h3>Mientras observas</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;line-height:1.5;color:#dfe3cf" class="ni-st"><li>Observa el orden de los pasos</li><li>Anota una frase que quieras usar</li><li>Anota una pregunta para el final</li></ul></div></div>
 <div class="ni dk-grid c2">${n3area('vdnf','Una frase que quiero usar','«…»')}${n3area('vdnq','Una pregunta para el final','¿…?')}</div>`+n3priv;
const VD_RO=[['Consultante','Recibe la sesión','Trae un tema liviano y responde con honestidad.','l'],['Facilitadora','Realiza la sesión completa','Antes, durante y después, con la ficha.','t'],['Observadora','Observa y acompaña','Sigue la sesión paso a paso y da una devolución amable.','b']];
RX.vdobr=()=>{delete RS.vdob;render(false)};
const VD_OB=[['Antes','Encuadre y consentimiento'],['Antes','Motivo de consulta y oración de conexión'],['Durante','Fechas'],['Durante','Investigación'],['Durante','Anexo o Causas de Muerte, si hace falta'],['Durante','Votos, si aparece uno'],['Durante','Limpiar y verificar'],['Después','Volver al presente y comunicar en hipótesis'],['Después','Oraciones y ficha']];
RICH.vd13=()=>{const r=n3clamp(st('vdr',0),0,2),A=['Alumna A','Alumna B','Alumna C'],o=st('vdob',{}),n=VD_OB.filter((_,i)=>o[i]).length;
 return dkH('Evaluación práctica','Evaluación práctica en tríos','Tres rondas: todas pasan por los tres roles. Toca una ronda para ver quién hace qué.')+
 `<div class="ni" style="display:grid;gap:14px">${chipRow('vdr',['Ronda 1','Ronda 2','Ronda 3'],r)}
 <div class="nl-role">${VD_RO.map((x,i)=>`<div class="nj-card ${x[3]}" style="min-height:0"><span class="ni-tag">${x[0]}</span><span class="who" style="animation-delay:${i*.1}s">${A[(i+r)%3]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div>
 ${niBox('d','Tres rondas','Todas pasan por los tres roles. Cada ronda, unos 30 minutos de sesión y 5 de devolución.')}
 <div class="dk-sub">Para la observadora: sigue la sesión paso a paso</div><div class="tb-gold">${VD_OB.map((x,i)=>`<button ${rxa('tog','vdob',i)} ${pressed(!!o[i])} style="animation-delay:${i*.04}s"><i>${o[i]?'✓':''}</i><b>${x[1]}</b><span>${x[0]}</span></button>`).join('')}</div>
 <div class="prog"><span>${n} de ${VD_OB.length} pasos observados</span><div class="bar"><i style="width:${n/VD_OB.length*100}%"></i></div></div>
 ${n===VD_OB.length?`<div class="dk-call ni-in">Sesión completa, sin saltar pasos. Ahora, una devolución amable.</div><div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('vdobr',0)}>Observar otra ronda</button></div>`:''}</div>`};

/* ----- 8 · Tres miradas y repaso ----- */
const VD_MI=[['Niño interno','Lo que viví','Las heridas de mi infancia y mis máscaras.','0,0','w'],['Transgeneracional','Lo que heredé','Las memorias, lealtades y votos del clan.','2,0','w'],['Vidas pasadas','Lo que mi alma trae','Daños, vínculos y votos de otras vidas.','','d']];
RICH.vd14=()=>{const v=st('vd14',-1);
 return dkH('Tres miradas','Tres miradas, una misma persona','¿Apareció una vida pasada activa en Fechas? Elige para ver por dónde seguir.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="va-3">${VD_MI.map((x,i)=>`<div class="tb-c ${x[4]}${v===1&&i<2?' vd-on':''}${v===0&&i===2?' vd-on':''}" style="animation-delay:${i*.1}s"><span class="ni-tag"${x[4]==='d'?' style="color:#d9c9ef"':''}>${x[0]}</span><h3${x[4]==='d'?' style="color:#fff"':''}>${x[1]}</h3><p>${x[2]}</p>${x[3]?`<div><button class="btn btn-ghost btn-sm" data-les="${x[3]}">Abrir</button></div>`:''}</div>`).join('')}</div>
 <div class="dk-cta" style="justify-content:center;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" ${rxa('set','vd14',v===0?-1:0)} ${pressed(v===0)}>Sí, apareció</button><button class="btn btn-ghost btn-sm" ${rxa('set','vd14',v===1?-1:1)} ${pressed(v===1)}>No apareció</button></div>
 ${v===0?niBox('d','Sigue con vidas pasadas','Continúa con Investigación y los gráficos que hagan falta.'):v===1?niBox('l','Mira el motivo desde otra especialización','Si en Fechas no aparece una vida pasada activa, el motivo se mira con Niño Interno o Transgeneracional.'):niQ('Si en Fechas no aparece una vida pasada activa, el motivo se mira con Niño Interno o Transgeneracional.')}</div>`};
RICH.vd15=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('vdcp',[['reloj','1 · ¿En qué orden se recorren los gráficos en una sesión completa?','<b>Fechas, Investigación y, si hace falta, el anexo, Causas de Muerte y Votos o Pactos.</b> Después se limpia y se verifica; los votos se anulan con su oración.'],['chat','2 · Di como hipótesis: «Fuiste una sacerdotisa y por eso tienes este don.»','<b>Por ejemplo:</b> «El gráfico muestra una posible vida ligada a lo espiritual. ¿Te hace sentido? ¿Qué sientes al escuchar esto?» Sin agregar detalles ni explicar el presente por esa vida.'],['escudo','3 · ¿Qué haces si la persona confunde la vida pasada con lo que vive hoy?','<b>Detener la lectura y no profundizar.</b> Volver al presente: respirar, sentir los pies, mirar el lugar. Si no se aclara, sugerir la ayuda de un profesional de salud.']],'c3',280)}</div>`;

/* ----- 9 · Certificación y cuidado de la facilitadora ----- */
const VD_RQ=[['grupo','Asistencia','Participar en las cuatro clases de la especialización.'],['libro','Tareas','Entregar las tres tareas: tu vida activa y su daño, la historia completa, y el cierre y el voto.'],['check','Evaluación práctica','Aprobar la sesión observada en tríos.']];
RICH.vd16=()=>{const o=st('vdrq',{}),n=VD_RQ.filter((_,i)=>o[i]).length;
 return dkH('Certificación','Requisitos para la certificación','Marca los que ya cumples.')+
 `<div class="ni" style="display:grid;gap:12px"><div class="nl-req td-3">${VD_RQ.map((x,i)=>`<button ${rxa('tog','vdrq',i)} ${pressed(!!o[i])} style="animation-delay:${i*.08}s"><i>${o[i]?'✓':''}</i><div><b>${x[1]}</b><span>${x[2]}</span></div></button>`).join('')}</div>
 <div class="prog"><span>${n} de 3</span><div class="bar"><i style="width:${n/3*100}%"></i></div></div>
 ${n===3?niQ('¡Cumples los tres requisitos para tu certificación en Vidas Pasadas!'):''}</div>`};
RICH.vd17=()=>dkH('Autocuidado','Cuidar a quien acompaña','Antes, durante, después y siempre. Toca cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('vdcu',[['loto','Antes · Prepararte','Oración de conexión y protección. Llegar descansada y presente.'],['escudo','Durante · No cargar la historia','Acompañar sin hacer tuyo lo que aparece. Volver a tu respiración.'],['limpia','Después · Limpiarte','Tu limpieza personal como aprendiste, agua y descanso.'],['chat','Siempre · Compartir lo difícil','Llevar los casos que te remuevan a tu facilitadora del programa.']],'c4',220)}</div>`;

/* ----- 10 · Ritual, oración y cierre ----- */
RICH.vd18=()=>dkH('Ritual de cierre','Honrar el camino del alma','Lo hacemos juntas, frase a frase.')+`<div class="ni">${n3pray('vdho',['Cierra los ojos y visualiza un camino que viene desde muy atrás, hasta este momento.','Agradece a cada vida lo que te enseñó.','Lo que ya no te pertenece, déjalo con amor en el camino.','Da un paso hacia adelante: hacia esta vida, hacia tu presente.'])}</div>`;
RICH.vd19=()=>dkH('Cierre de la especialización','Oración de agradecimiento','La decimos juntas para cerrar el camino.')+`<div class="ni">${n3pray('vdor',['Amado Yo Superior, ángeles, arcángeles, seres de luz, todo mi comité espiritual: gracias por acompañarnos en este camino.','Gracias a mi alma por cada vida vivida, por cada aprendizaje, por cada promesa que hoy pudo liberarse.','Que lo aprendido se convierta en servicio, con humildad, respeto y amor.','Que cada sesión sea para el mayor bien de quien llega a nosotras y de su alma.','Gracias, gracias, gracias.'])}</div>`;
RICH.vd20=()=>`<div class="ni">${nbHero('Especialización Vidas Pasadas','Gracias por','este camino','Sigue practicando, registra tus sesiones y camina hacia tu presente con lo aprendido.',['Clase 1','Clase 2','Clase 3','Clase 4'],'Karen Oyarce · Maestra Holística',vdPhoto('Una mujer de perfil, con los ojos cerrados, entre columnas antiguas cubiertas de hiedra al atardecer'))}</div>`;
(function(){const c=document.createElement('style');c.id='vd-css';c.textContent=`
.nj-proto.vd-6{grid-template-columns:repeat(3,minmax(0,1fr))}
.nj-proto.vd-6 button{min-height:118px}
.nj-proto.vd-6 button:nth-child(3)::after{display:none}
.nj-proto.vd-6 button.vd-opt{background:#ece3f6;border-color:#ddd0ee}
.nj-proto.vd-6 button.vd-opt small{color:#6b4fa0}
.tb-c.vd-on{box-shadow:0 0 0 3px #b9a3f1;transform:translateY(-4px)}
.va-3 .tb-c{transition:transform .35s,box-shadow .35s}
@media (max-width:760px){.nj-proto.vd-6{grid-template-columns:1fr}.nj-proto.vd-6 button{min-height:0}}
`;document.head.appendChild(c)})();

/* ---------- Nivel 4 · Especialización Limpieza Uterina · Clase 1 ---------- */
(function(){const c=document.createElement('style');c.id='lu-css';c.textContent=`
.lu-tree{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));position:relative;padding:8px 0 4px}
.lu-tree::before{content:"";position:absolute;left:7%;right:7%;top:50px;height:3px;background:#efd3e6;border-radius:3px}
.lu-tree button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;justify-items:center;gap:8px;position:relative;text-align:center;animation:niUp .5s both}
.lu-tree i{display:grid;place-items:center;border-radius:50%;font:600 1.15rem var(--f-body);background:#f6e2ef;border:2px solid #efd3e6;color:#3b4a24;transition:transform .35s,box-shadow .35s,background .35s}
.lu-tree button:nth-child(odd) i{background:#ecc3dc}
.lu-tree button:first-child i{background:var(--ni-olv);border-color:var(--ni-olv);color:#fff}
.lu-tree b{font:600 .82rem/1.2 var(--f-body);color:#3b4a24}.lu-tree small{font-size:.72rem;color:#7a5aa6;min-height:1em}
.lu-tree button[aria-pressed="true"] i{transform:scale(1.12);box-shadow:0 0 0 4px #b0589a55}
.lu-tree button.dim{opacity:.35}
.lu-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.lu-two button{all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;align-content:start;transition:transform .3s,box-shadow .3s}
.lu-two button:hover{transform:translateY(-3px)}
.lu-two .m{background:#f6e2ef;color:#5a2350}.lu-two .p{background:#c9c9f5;color:#2a2a6a}
.lu-two button[aria-pressed="true"].m{box-shadow:0 0 0 3px #b0589a}.lu-two button[aria-pressed="true"].p{box-shadow:0 0 0 3px #5a5ab0}
.lu-two b{font:400 1.25rem/1.2 var(--f-display)}.lu-two small{font:600 .62rem var(--f-caps);letter-spacing:.14em;text-transform:uppercase;opacity:.8}
.lu-pc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.lu-pc>div{border-radius:16px;padding:16px;display:grid;gap:6px;transition:opacity .35s,transform .35s;border:1px solid var(--nb-line)}
.lu-pc>div:nth-child(1){background:var(--nb-paper)}.lu-pc>div:nth-child(2){background:#f6e2ef;border-color:#f6e2ef}.lu-pc>div:nth-child(3){background:#ecc3dc;border-color:#ecc3dc}
.lu-pc>div.off{opacity:.35}.lu-pc>div.on{transform:translateY(-4px);box-shadow:0 8px 20px #b0589a33}
.lu-pc b{font:400 1.3rem var(--f-display);color:#3b4a24}.lu-pc span{font-size:.9rem;color:#4a4a3a}
.lu-pct{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:4px}
.lu-pct button{all:unset;box-sizing:border-box;cursor:pointer;text-align:center;padding:8px 0;border-radius:10px;font:600 .78rem var(--f-body);background:var(--nb-paper);border:1px solid var(--nb-line);color:#3b4a24}
.lu-pct button[aria-pressed="true"]{background:#b0589a;border-color:#b0589a;color:#fff}
.lu-meter{height:10px;border-radius:6px;background:linear-gradient(90deg,#fbf3f8,#ecc3dc 50%,#b0589a);position:relative}
.lu-meter i{position:absolute;top:-5px;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #b0589a;margin-left:-10px;transition:left .4s}
.lu-names{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.lu-names label{display:grid;gap:4px;font-size:.78rem;color:#7a5aa6;font-weight:600}
.lu-names input{font:inherit;font-weight:400;font-size:.92rem;color:var(--nb-ink);padding:8px 10px;border-radius:10px;border:1px solid var(--nb-line);background:var(--nb-paper)}
@media (max-width:760px){.lu-tree{grid-template-columns:repeat(4,minmax(0,1fr));row-gap:14px}.lu-tree::before{display:none}.lu-two,.lu-pc,.lu-names{grid-template-columns:1fr}.lu-pct{grid-template-columns:repeat(6,minmax(0,1fr))}}
`;document.head.appendChild(c)})();
const luPhoto=alt=>`<div class="ni-ph"><img src="${N4P}utero/c1-portada.webp" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#f6e2ef" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#ecc3dc" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#b0589a"/></svg></div>`;

/* el gráfico de Limpieza Uterina */
const LU_T=['Limpiar memorias\nancestrales de dolor','Memorias de\nabusos','Limpiar impactos\nde abortos','Limpiar\nansiedades','Limpiar\ndolor físico','Memorias de\ntristeza','Sexualidad','Limpiar\nvictimismo','Manifestar\ncreatividad','Recuperar\nvirtudes','Recuperar\nfuerza','Honrar las\nexperiencias','Respetar','Perdonar','Memorias de\nmiedos','Memorias de\ninseguridad','Falta de\nautoestima','Memorias de\nira','Memorias de\nasco','Memorias de\nfrustración','Memorias de\nrencor','Miomas','Memorias de\nodio','Soltar, confiar\ny dejar ir','Exceso de\nenergía masculina','Fertilidad'];
const LU_RC=[6,8,9,10,23];
const luT=i=>LU_T[i].replace(/\n/g,' ');
const LU_GQ=['la consultante','madre','abuelas','bisabuelas','tatarabuelas','ancestras','ancestras'];
RX.luc=(k,v)=>{const K='lu'+k;RS[K]=st(K,-1)===+v?-1:+v;render(false)};
const luChart=o=>{o=o||{};return niFan({label:'Gráfico de Limpieza Uterina',act:'luc',inner:50,sel:(k,i)=>st('lu'+k,-1)===i,
 hot:o.ring||o.hot?(k,i)=>o.hot?(o.hot(k,i)?1:-1):(k===o.ring?0:-1):0,
 rings:[{k:'t',r0:62,r1:234,items:LU_T.map((t,i)=>LU_RC.includes(i)?{t,c:'#f6e2ef'}:t),fill:'#ffffff',on:'#b0589a',m:'rad',fs:7.4},
  {k:'g',r0:234,r1:258,items:Array.from({length:7},(_,i)=>'Generación '+(i+1)),fill:'#ffffff',on:'#5c7a32',m:'tan',fs:8.4},
  {k:'p',r0:258,r1:280,items:Array.from({length:11},(_,i)=>i*10+'%'),fill:'#f6e2ef',on:'#7a5aa6',m:'tan',fs:8}],cap:o.cap===0?'':o.cap||'Toca la generación, el tema y el porcentaje.'})};
const luRead=()=>{const g=st('lug',-1),t=st('lut',-1),p=st('lup',-1);return [g<0?'':`${g+1} · ${LU_GQ[g]}`,t<0?'':luT(t),p<0?'':p*10+' %']};
const LU_PRAY='Hoy limpio, sano y bendigo mi linaje femenino, a mi madre, a mis abuelas y a todas las que precedieron mi camino, las perdono por no amarse, por no sentirse fuertes y no atreverse a cambiar su destino. Las libero y me libero de sus ataduras y anclajes y me uno a ellas con un sagrado hilo que nos vincula en amor, en perdón, en sabiduría y en equilibrio. Hoy de mi espíritu borro las memorias de dolor y tristeza que mi linaje trajo consigo y las reemplazo por la energía del amor, de respeto y el poder de mis ancestros femeninos.';

/* el árbol femenino de siete generaciones */
const LU_GN=['Yo','Madre','Abuela','Bisabuela','Tatarabuela','Ancestra','Ancestra'];
const luTree=o=>{o=o||{};const s=st('lutg',-1),line=o.line;
 const lab=i=>i===0?'Yo':line==='p'?(i===1?'Padre':LU_GN[i]+' paterna'):line==='m'?(i===1?'Madre':LU_GN[i]+' materna'):LU_GN[i];
 return `<div class="lu-tree" role="group" aria-label="Árbol femenino de siete generaciones">${LU_GN.map((x,i)=>{const nm=esc(st('lun'+i,'')),sz=96-i*7;return `<button class="${line==='p'&&i===1?'dim':''}" ${rxa('set','lutg',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.09}s"><i style="width:${sz}px;height:${sz}px">${i+1}</i><b>${lab(i)}</b><small>${nm}</small></button>`}).join('')}</div>`};
const LU_GD=['La consultante: la generación 1 es quien recibe la lectura.','Tu madre. La historia infantil que ella vivió llega directo a ti.','Tus abuelas: la madre de tu madre y la madre de tu padre.','Tus bisabuelas. Muchas veces ya no conocemos sus nombres.','Tus tatarabuelas: mujeres de hace más de un siglo.','Ancestras más lejanas. Aunque no conozcamos sus nombres, viven en nuestra historia.','La generación más lejana que lee el gráfico.'];

/* ----- 1 · Bienvenida y agenda ----- */
RICH.lu1=()=>`<div class="ni">${nbHero('Especialización Limpieza de Útero · Clase 1','El útero','y el linaje femenino','Lo que las mujeres del linaje vivieron y el útero guarda como memoria: qué es y qué no es la limpieza de útero, la fidelidad al linaje femenino, el árbol de siete generaciones y el gráfico de Limpieza Uterina.',['Linaje femenino','Siete generaciones','Gráfico'],'Karen Oyarce · Maestra Holística',luPhoto('Tres mujeres de tres generaciones, abuela, madre e hija, abrazadas en un jardín con flores'))}</div>`;
RICH.lu2=()=>niAgenda('Clase 1',['Del linaje al cuerpo','Sanación de Útero','Qué es y qué no es la limpieza de útero','La fidelidad al linaje femenino','El árbol femenino de siete generaciones','El gráfico de Limpieza Uterina','Ejemplo y práctica','Repaso y tarea'],
 ['Explicar qué es la limpieza de útero y qué no es','Reconocer la fidelidad al linaje femenino','Armar el árbol femenino de siete generaciones','Leer el gráfico: generación, tema y porcentaje']);

/* ----- 2 · Del linaje al cuerpo ----- */
RICH.lu3=()=>{const v=st('lu3',-1);
 return dkH('Lo que ya conocemos','Del linaje al cuerpo','Del clan completo a la línea de las mujeres. Toca cada mirada.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tg-two">${[['Transgeneracional','El clan completo','Las memorias, lealtades y votos de los dos linajes.','w'],['Limpieza de útero','La línea de las mujeres','Lo que las mujeres del linaje vivieron y que el útero guarda como memoria.','d']].map((x,i)=>`<button class="tb-c ${x[3]}" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:10px;align-content:start;${x[3]==='d'?'background:var(--ni-olv);color:#ece7d3':'background:var(--nb-paper);border:1px solid var(--nb-line)'};${v===i?'box-shadow:0 0 0 3px #b0589a;':''}transition:box-shadow .3s" ${rxa('set','lu3',v===i?-1:i)} ${pressed(v===i)}><span class="ni-tag"${i?' style="color:#d9c9ef"':''}>${x[0]}</span><h3 style="margin:0;font:400 1.4rem var(--f-display)${i?';color:#fff':''}">${x[1]}</h3><p style="margin:0${i?';color:#dfe3cf':''}">${x[2]}</p></button>`).join('')}</div>
 ${v===0?`<div class="ni-in dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" data-les="2,0">Repasar Transgeneracional</button></div>`:v===1?niBox('l','En esta especialización','Miramos solo la línea de las mujeres, hasta siete generaciones atrás, y lo que el útero guarda de ellas.'):''}
 ${n3area('lu3a','Pregunta al grupo: ¿qué sabes de la vida de tu madre cuando era niña?','Lo que sé…')}</div>`+n3priv};

/* ----- 3 · Sanación de Útero ----- */
RICH.lu4=()=>dkH('Sanación de Útero','Sanación de Útero','Léanlo en voz alta.')+
 `<div class="ni">${n3quote('«Estamos conectadas a la historia infantil que vivió nuestra madre, y así también a la de todas las mujeres que la antecedieron. Llevamos <mark>las heridas de sus niñas internas</mark> en el corazón, y repetimos las corazas que ellas mismas crearon para protegerse de ser heridas nuevamente. Esto ocurre debido a nuestra alta <mark>fidelidad al linaje femenino</mark>, con el cual nuestro inconsciente se identifica con mayor fuerza.»')}${luTree()}</div>`;
RICH.lu5=()=>dkH('Sanación de Útero','Sanar no es traicionar','Léanlo en voz alta.')+
 `<div class="ni">${n3quote('«No traicionamos a nuestras antepasadas cuando decidimos sanar. <mark>No dejamos de pertenecer</mark> a nuestro linaje cuando elegimos vivir una vida sin la repetición de las cargas familiares.»')}</div>`;

/* ----- 4 · Qué es y qué no es ----- */
const LU_QE=[['1','Reconocer','De qué generación viene la memoria.'],['2','Limpiar','Lo que no es nuestro y pesa.'],['3','Recuperar','Sexualidad, creatividad, virtudes y fuerza.']];
RICH.lu6=()=>{const s=n3clamp(st('lu6',0),0,3);
 return dkH('Limpieza de útero','¿Qué es la limpieza de útero?','Tres movimientos. Avanza para verlos.')+
 `<div class="ni" style="display:grid;gap:14px">${niBox('d','Qué es','Es un trabajo energético y emocional que limpia las memorias que el útero guarda del linaje femenino, para recuperar la energía de cada mujer.')}
 <div class="nj-flow lu-3">${LU_QE.map((x,i)=>`<div class="${i<s?'lit':''}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','lu6',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:`<div class="dk-cta ni-in" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set','lu6',0)}>Ver de nuevo</button></div>`}
 ${n3area('lu6a','Pregunta al grupo: ¿qué te gustaría limpiar o recuperar en esta especialización?','Me gustaría…')}</div>`+n3priv};
RICH.lu7=()=>dkH('Límites','Lo que no es','¿Es o no es? Lleva cada frase a su columna.')+
 niSort('lu7',[['Un tratamiento médico ni ginecológico',0],['Un acompañamiento que complementa la atención de salud',1],['Un diagnóstico',0],['Un camino para comprender y soltar',1],['Una promesa de curar o de lograr un embarazo',0],['Un trabajo con el útero energético, también si no hay útero físico',1],['Un juicio sobre la madre o las abuelas',0],['Una forma de honrar a las mujeres del linaje',1]],
 [['No es','','l','No es'],['Sí es','','t','Sí es']],'Acompañamos, no reemplazamos la atención médica.','Mira otra vez: ¿reemplaza a la medicina, promete o juzga?');
const LU_SI=[['Liviano','Qué bueno. Esta especialización te ayuda a cuidar esa liviandad.'],['Cargado','Es justo lo que vamos a mirar: qué memorias pesan y de qué generación vienen.'],['Desconectado','Muchas mujeres lo sienten así. Volver a sentirlo es parte del camino.']];
RICH.lu8=()=>{const v=st('lu8s',-1);
 return dkH('El útero','El útero como centro','Tres sentidos. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-cp">${n3flip('lu8',[['libro','Memoria','Guarda lo que vivimos y lo que vivieron las mujeres que nos antecedieron.'],['estrella','Creatividad','Es el centro desde donde creamos: ideas, proyectos, caminos.'],['corazon','Vida','Es el lugar simbólico de la fuerza vital y del placer de estar vivas.']],'c3',200)}</div>
 <div><div class="dk-sub">Pregunta al grupo: ¿cómo sientes hoy tu útero?</div>${chipRow('lu8s',LU_SI.map(x=>x[0]),v)}</div>
 ${v>=0?`<div class="ni-quote ni-in">${LU_SI[v][1]}</div>`:''}</div>`};

/* ----- 5 · La fidelidad al linaje femenino ----- */
RICH.lu9=()=>{const o=st('lu9',{}),n=Object.values(o).filter(Boolean).length;
 return dkH('Fidelidad','La fidelidad al linaje femenino','Marca las corazas que reconoces en tu familia.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div style="display:grid;gap:12px">${niBox('d','Qué es','Una lealtad inconsciente con las mujeres del linaje: repetimos sus corazas para seguir perteneciendo, aunque ya no nos protejan.')}
 ${n?`<div class="ni-quote ni-in">${n===1?'Una coraza reconocida.':n+' corazas reconocidas.'} Reconocerla es el primer paso para dejar de repetirla.</div>`:''}</div>
 <div class="nj-card" style="min-height:0"><h3>Corazas que se repiten</h3>${n3ck('lu9',[['escudo','«Las mujeres de esta familia no necesitan a nadie»'],['voz','Callar para no molestar'],['xcirc','Desconfiar del placer o del propio cuerpo'],['nudo','Cargar con todo sin pedir ayuda']])}</div></div>
 <div class="ni">${n3area('lu9a','Pregunta al grupo: ¿qué coraza de tu madre o tu abuela reconoces en ti?','Reconozco…')}</div>`+n3priv};

/* ----- 6 · El árbol femenino de siete generaciones ----- */
RICH.lu10=()=>{const s=st('lutg',-1);
 return dkH('Siete generaciones','El árbol femenino de siete generaciones','Generación 1: la consultante · Generación 7: la más lejana. Toca cada mujer.')+
 `<div class="ni" style="display:grid;gap:14px">${luTree()}
 ${s>=0?`<div class="nj-det ni-in"><div><span class="ni-tag">Generación ${s+1}</span><br><b>${LU_GN[s]}</b><p>${LU_GD[s]}</p></div></div>`:''}
 ${niQ('Aunque no conozcamos sus nombres, todas ellas viven en nuestra historia.')}</div>`};
RICH.lu11=()=>{const l=st('lu11',-1);
 return dkH('Dos líneas','Las dos líneas femeninas','Toca una línea para verla en el árbol.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lu-two">${[['m','Línea materna','Las mujeres de mi madre','Mi madre, mi abuela materna, mi bisabuela materna... Es la línea que más se lee en el útero.'],['p','Línea paterna','Las mujeres de mi padre','Mi abuela paterna, mi bisabuela paterna... También dejan su huella en el linaje femenino.']].map((x,i)=>`<button class="${x[0]}" ${rxa('set','lu11',l===i?-1:i)} ${pressed(l===i)}><small>${x[1]}</small><b>${x[2]}</b><span>${x[3]}</span></button>`).join('')}</div>
 ${l>=0?`<div class="ni-in">${luTree({line:l?'p':'m'})}</div>`:''}
 ${niNote('En la Clase 2 vemos cómo saber desde qué línea viene la memoria.')}</div>`};
RICH.lu12=()=>dkH('Punto de partida','Constelación Familiar como punto de partida','El mismo gráfico de la formación Transgeneracional.')+
 `<div class="ni tc-side"><div class="nj-fig">${niOrig('lu12O','trans/constelacion.webp','Lámina original del gráfico de Constelación Familiar de Casa Muladhara',tgChart())}</div>
 <div style="display:grid;gap:10px">${niBox('l','Para qué','Confirmar desde qué linaje y generación viene la memoria.')}${niBox('d','Después','Se lee el gráfico de Limpieza Uterina para ver qué guarda el útero.')}${tcRow(['Linaje','Generación'],tgRead().slice(0,2))}<div class="dk-cta"><button class="btn btn-ghost btn-sm" data-les="2,6">Repasar Constelación</button></div></div></div>`;

/* ----- 7 · El gráfico de Limpieza Uterina ----- */
const LU_RG=[['g','1. Generación','De la 1 a la 7.'],['t','2. Tema','Cuál de los 26 está activo.'],['p','3. Porcentaje','Cuánto está presente hoy, de 0 a 100 %.']];
RICH.lu13=()=>{const s=st('lu13',-1);
 return dkH('Limpieza Uterina','El gráfico de Limpieza Uterina','Explóralo, o toca un paso para verlo en el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="tc-side"><div class="nj-fig">${niOrig('lu13O','utero/limpieza.webp','Lámina original del gráfico de Limpieza Uterina de Casa Muladhara',luChart({ring:s>=0?LU_RG[s][0]:null,cap:s>=0?0:undefined}))}</div>
 <div style="display:grid;gap:10px">${tbList('lu13',LU_RG.map(x=>`<b>${x[1]}</b> · ${x[2]}`))}${niBox('d','Limpiar directo o investigar','Energías Discordantes o el Mapa.')}${tcRow(['Generación','Tema','Porcentaje'],luRead())}</div></div>
 <p class="tg-pr">${LU_PRAY}</p></div>`};
RICH.lu14=()=>{const g=st('lug',-1);
 return dkH('Paso 1','Las siete generaciones','Toca una generación aquí o en el borde del gráfico.')+
 `<div class="ni nj-two"><div class="nj-fig">${luChart({ring:g<0?'g':null,cap:0})}</div>
 <div style="display:grid;gap:10px"><div class="tg-gen">${['La consultante','Madre','Abuelas','Bisabuelas','Tatarabuelas','Ancestras más lejanas','Ancestras más lejanas'].map((x,i)=>`<button ${rxa('luc','g',i)} ${pressed(g===i)} style="animation-delay:${i*.05}s"><b>Generación ${i+1}</b><span>${x}</span></button>`).join('')}</div>
 ${niBox('d','Para qué sirve','Saber de qué mujer del linaje viene la memoria que el útero guarda hoy.')}</div></div>`};
const LU_GR=[['Memorias emocionales',[5,14,15,16,17,18,19,20,22]],['Memorias de dolor',[0,1,2,3,4,7]],['El cuerpo',[21,25,24]],['Para sanar',[11,12,13]],['Recuperar',[6,8,9,10,23]]];
RICH.lu15=()=>{const s=st('lu15',-1),t=st('lut',-1);
 return dkH('Paso 2','Los temas del gráfico','26 temas en cinco grupos. Toca un grupo para encontrarlo en el gráfico.')+
 `<div class="ni nj-two"><div class="nj-fig">${luChart({hot:s>=0?(k,i)=>k==='t'&&LU_GR[s][1].includes(i):null,ring:s<0?'t':null,cap:0})}</div>
 <div class="tg-groups">${LU_GR.map((x,i)=>`<button ${rxa('set','lu15',s===i?-1:i)} ${pressed(s===i)} style="animation-delay:${i*.04}s"><b>${x[0]}</b><span>${x[1].map(j=>luT(j).replace(/^(Memorias de |Limpiar )/,'').replace(/^./,c=>c.toUpperCase())).join(' · ')}${i===2?' (memorias, no diagnósticos)':''}</span></button>`).join('')}<button class="x"><b>26 temas</b><span>En las Clases 2 y 3 los miramos uno a uno.</span></button></div>
 ${t>=0?`<div class="nj-det ni-in"><div><span class="ni-tag">Tema marcado</span><br><b>${luT(t)}</b></div></div>`:''}</div>`};
const LU_PB=[['0 a 30 %','Presente, pero liviana.'],['40 a 60 %','Pesa en la vida diaria.'],['70 a 100 %','Muy presente: se trabaja primero.']];
RICH.lu16=()=>{const p=st('lup',-1),b=p<0?-1:p<=3?0:p<=6?1:2;
 return dkH('Paso 3','El porcentaje','Indica cuánto de esa memoria está presente hoy, de 0 a 100 %. Toca un valor.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lu-pct">${Array.from({length:11},(_,i)=>`<button ${rxa('luc','p',i)} ${pressed(p===i)}>${i*10}</button>`).join('')}</div>
 <div class="lu-meter" aria-hidden="true">${p>=0?`<i style="left:${p*10}%"></i>`:''}</div>
 <div class="lu-pc">${LU_PB.map((x,i)=>`<div class="${b<0?'':b===i?'on':'off'}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>
 ${niQ('Después de limpiar, se vuelve a medir: el porcentaje debería bajar.')}</div>`};
RICH.lu17=()=>{const r=luRead();
 return dkH('Lectura','Cómo se lee el gráfico','Siempre en el mismo orden. Abajo aparece lo que marcaste en el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow lu-3">${[['Generación','De la 1 a la 7.'],['Tema','Cuál de los 26 está activo.'],['Porcentaje','Cuánto está presente hoy.']].map((x,i)=>`<div class="lit" style="animation:niUp .45s ${i*.1}s both"><small>Paso ${i+1}</small><b>${x[0]}</b><span>${x[1]}</span><span style="font:400 1rem var(--f-display);color:${i===2?'#f2c66d':'var(--ni-lil2)'}">${r[i]||'—'}</span></div>`).join('')}</div>
 ${r.every(Boolean)?`<div class="ni-hyp ni-in"><span class="ni-tag">Tu lectura</span><p>Generación <mark>${r[0]}</mark>: el tema activo es <mark>${r[1].toLowerCase()}</mark>, presente hoy en un <mark>${r[2]}</mark>.</p></div>`:`<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" data-slide="0">Marcar en el gráfico</button></div>`}
 ${niBox('l','Después','Limpiar directo con Energías Discordantes o investigar desde el Mapa. Lo vemos en la Clase 2.')}</div>`};

/* ----- 8 · Ejemplo y práctica ----- */
RX.luex=()=>{Object.assign(RS,{lug:2,lut:5,lup:7,lu18v:1});render(false)};
const LU_EJ=[['Generación','3 · abuelas'],['Tema','Memorias de tristeza'],['Porcentaje','70 %']];
RICH.lu18=()=>{const s=n3clamp(st('lu18',0),0,3),v=st('lu18v',0),pr=n3clamp(st('lu18p',0),0,1);
 return dkH('Ejemplo','Ejemplo y práctica en parejas','Consultante: A. V., una tristeza que aparece sin motivo y que no sabe de dónde viene.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow lu-3">${LU_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"${i===1?' style="background:#f6e2ef"':''}><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','lu18',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>Una abuela vivió una pena que no pudo llorar; la nieta la siente como propia.</p></div>
 <div class="dk-cta" style="justify-content:center">${v?'':`<button class="btn btn-primary btn-sm" ${rxa('luex',0)}>Verlo en el gráfico</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','lu18',0)}>Ver de nuevo</button></div>
 ${v?`<div class="ni-in" style="max-width:640px;width:100%;justify-self:center">${luChart({hot:(k,i)=>k==='g'?i===2:k==='t'?i===5:i===7,cap:'Generación 3, memorias de tristeza, 70 %.'})}</div>`:''}`}
 <div class="dk-sub" style="margin:0">Ahora en parejas</div>
 <div class="nj-steps h">${[['Dibuja tu árbol','Con lo que sabes de tu árbol femenino, y pide consentimiento.'],['Tu pareja lee','Generación, tema y porcentaje; conversen y cambien de rol.']].map((x,i)=>`<div class="${i<pr?'ok':i===pr?'cur':''}" style="cursor:pointer" ${rxa('set','lu18p',i)}><span class="n">${i<pr?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 <div class="dk-cta" style="justify-content:center;flex-wrap:wrap">${pr===0?`<button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},5">Abrir el árbol</button><button class="btn btn-primary btn-sm" ${rxa('set','lu18p',1)}>Siguiente paso</button>`:vaGo(-1,'Abrir el gráfico')}</div></div>`+niNote('Ejemplo ficticio.')};

/* ----- 9 · Repaso y tarea ----- */
RICH.lu19=()=>dkH('Repaso en voz alta','Comprobemos lo aprendido','Respondan en voz alta y compartan cómo llegaron a su respuesta. Después toquen cada tarjeta.')+
 `<div class="ni ni-cp">${n3flip('lucp',[['loto','1 · ¿Qué es la limpieza de útero y qué no es?','<b>Es un trabajo energético y emocional</b> que limpia las memorias que el útero guarda del linaje femenino. <b>No es</b> un tratamiento médico, un diagnóstico, una promesa de curar o de lograr un embarazo, ni un juicio sobre la madre o las abuelas.'],['corazon','2 · ¿Qué es la fidelidad al linaje femenino?','<b>Una lealtad inconsciente con las mujeres del linaje:</b> repetimos sus corazas para seguir perteneciendo, aunque ya no nos protejan.'],['reloj','3 · ¿En qué orden se lee el gráfico de Limpieza Uterina?','<b>Generación, tema y porcentaje.</b> Después se limpia directo con Energías Discordantes o se investiga desde el Mapa.']],'c3',260)}</div>`;
RICH.lu20=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Tu árbol femenino de siete generaciones.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('luta',[['grupo','Escribe el nombre de cada mujer que conozcas'],['libro','Anota lo que sabes de su vida: hijos, pérdidas, uniones, oficios'],['corazon','Anota cómo vivió su cuerpo, su sexualidad y su maternidad, si lo sabes'],['arbol','Incluye la línea femenina de tu padre'],['chat','Lo que no sabes, anótalo como pregunta']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu árbol a la Clase 2.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Pregunta a las mujeres de tu familia con delicadeza y sin forzar. Trae tu árbol a la Clase 2.')}
 <div class="dk-sub" style="margin:0">Empieza aquí tu árbol</div><div class="lu-names">${LU_GN.map((x,i)=>`<label>${i+1} · ${x}<input type="text" data-rsin="lun${i}" value="${esc(st('lun'+i,''))}" placeholder="Nombre"></label>`).join('')}</div></div></div>`+n3priv;
(function(){const c=document.createElement('style');c.id='lu-css2';c.textContent=`
.nj-flow.lu-3{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:760px){.nj-flow.lu-3{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();

/* ---------- Nivel 4 · Especialización Limpieza Uterina · Clase 2 ---------- */
(function(){const c=document.createElement('style');c.id='lv-css';c.textContent=`
.lv-emo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:14px;align-items:start}
.lv-emo .q{background:var(--ni-olv);color:#ece7d3;border-radius:18px;padding:18px;display:grid;gap:10px;align-content:start;min-height:100%}
.lv-emo .q p{margin:0;color:#dfe3cf;line-height:1.55}.lv-emo .q small{font-style:italic;color:#d9c9ef;font-size:.82rem}
.lv-pink{background:#f6e2ef;color:#4a2340;border-radius:16px;padding:14px 18px;font:italic 400 1.02rem/1.45 var(--f-display)}
.lv-drop{display:grid;gap:8px}
.lv-drop .bar{height:14px;border-radius:8px;background:#f6e2ef;overflow:hidden}
.lv-drop .bar i{display:block;height:100%;background:linear-gradient(90deg,#ecc3dc,#b0589a);border-radius:8px;animation:lvDrop 2.4s .4s ease-in-out both}
.lv-drop .lab{display:flex;justify-content:space-between;font:600 .82rem var(--f-body);color:#7a5aa6}
@keyframes lvDrop{from{width:80%}to{width:10%}}
.lu-two.lv-g3{grid-template-columns:repeat(3,minmax(0,1fr))}
.lv-rg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
@media (max-width:760px){.lv-emo,.lv-rg,.lu-two.lv-g3{grid-template-columns:1fr}}
`;document.head.appendChild(c)})();
const lvPhoto=alt=>`<div class="ni-ph"><img src="${N4P}utero/c2-portada.webp" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#ecc3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#e6dcf2" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#b0589a"/></svg></div>`;
const lvSee=(k,hot,cap)=>{const v=st(k,0);return `<div class="dk-cta" style="justify-content:center"><button class="btn btn-ghost btn-sm" ${rxa('set',k,v?0:1)} ${pressed(!!v)}>${v?'Ocultar el gráfico':'Verlo en el gráfico de Limpieza Uterina'}</button></div>${v?`<div class="ni-in" style="max-width:640px;width:100%;justify-self:center">${luChart({hot:(r,i)=>r==='t'&&hot.includes(i),cap})}</div>`:''}`};

/* ----- 1 · Bienvenida y agenda ----- */
RICH.lv1=()=>`<div class="ni">${nbHero('Especialización Limpieza de Útero · Clase 2','Las memorias','del útero','Lo que el útero guarda: memorias emocionales, de dolor y del cuerpo, cómo leer con cuidado los temas sensibles y el protocolo para limpiar directo, investigar en el Mapa o profundizar en el linaje.',['Memorias','Protocolo','Mapa','Transgeneracional'],'Karen Oyarce · Maestra Holística',lvPhoto('Una mujer embarazada, con los ojos cerrados, sostiene su vientre entre flores rosadas'))}</div>`;
RICH.lv2=()=>niAgenda('Clase 2',['Revisión de la tarea y ronda','Lo que el útero guarda','Memorias emocionales y de dolor','Abusos, abortos y el cuerpo: leer con cuidado','El protocolo','Leer con cuidado y derivar','Ejemplo y práctica','Reglas de oro, repaso y tarea'],
 ['Reconocer las memorias que guarda el útero','Leer con cuidado abusos, abortos y temas del cuerpo','Limpiar directo o investigar en el Mapa','Saber cuándo profundizar en lo transgeneracional']);

/* ----- 2 · Revisión de la tarea y ronda ----- */
RICH.lv3=()=>{const n=LU_GN.filter((_,i)=>st('lun'+i,'')).length;
 return dkH('Lo que trajiste','Revisemos la tarea de la semana','Tu árbol femenino de siete generaciones. Marca las preguntas a medida que las conversan.')+
 `<div class="ni" style="display:grid;gap:14px">${luTree()}${n?'':niNote('En el árbol aparecen los nombres que escribiste en la tarea de la Clase 1.')}
 <div class="dk-grid c2" style="align-items:start"><div class="nj-card l ni-in" style="min-height:0;background:#f6e2ef"><h3>Tu árbol femenino</h3>${n3ck('lvt1',[['arbol','¿Hasta qué generación llegaste?'],['nudo','¿Qué se repite en las mujeres de tu linaje?'],['corazon','¿Qué supiste de cómo vivieron su cuerpo, su sexualidad o su maternidad?'],['chat','¿Qué te contaron las mujeres de tu familia que no sabías?'],['hoja','¿Qué sentiste al armarlo?']])}</div>
 <div style="display:grid;gap:10px">${niQ('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.')}<div class="dk-cta"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},8">Completar mi árbol</button></div></div></div></div>`};
RICH.lv4=()=>dkH('Ronda','Ronda: las mujeres de mi linaje','Una o dos frases por persona. Si quieres, anota la tuya.')+
 `<div class="ni va-3">${[['Algo que se repite','Una forma de amar, de callar o de cargar que veo en varias generaciones.'],['Algo que me duele','Una historia de una mujer de mi linaje que me conmueve.'],['Algo que agradezco','Una fuerza o un don que heredé de ellas.']].map((x,i)=>`<div class="nj-card${i===2?' l':''}" style="min-height:0;animation:niUp .45s ${i*.1}s both${i===2?';background:#f6e2ef':''}"><h3>${x[0]}</h3><p>${x[1]}</p>${n3area('lv4'+i,'','Escribe aquí…')}</div>`).join('')}</div>`+n3priv;

/* ----- 3 · Lo que el útero guarda ----- */
const LV_GU=[['Memorias emocionales','Tristeza, miedos, ira, asco, rencor...',[5,14,15,16,17,18,19,20,22]],['Memorias de dolor','Dolor ancestral, abusos, abortos, ansiedades...',[0,1,2,3,4,7]],['El cuerpo','Miomas, fertilidad, exceso de energía masculina.',[21,25,24]]];
RICH.lv5=()=>{const s=st('lv5',-1);
 return dkH('El útero','Lo que el útero guarda','Tres tipos de memoria. Toca uno para verlo en el gráfico.')+
 `<div class="ni" style="display:grid;gap:14px">${niBox('d','Memorias propias y del linaje','El útero guarda memorias propias y memorias de las mujeres del linaje. Muchas de las emociones que sentimos no empezaron en nosotras.')}
 <div class="lu-two lv-g3">${LV_GU.map((x,i)=>`<button class="m" style="${i<2?'background:var(--nb-paper);border:1px solid var(--nb-line);color:var(--nb-ink)':''}" ${rxa('set','lv5',s===i?-1:i)} ${pressed(s===i)}><b>${x[0]}</b><span>${x[1]}</span></button>`).join('')}</div>
 ${s>=0?`<div class="ni-in" style="max-width:640px;width:100%;justify-self:center">${luChart({hot:(r,i)=>r==='t'&&LV_GU[s][2].includes(i),cap:LV_GU[s][0]+' en el gráfico de Limpieza Uterina.'})}</div>`:''}
 ${n3area('lv5a','Pregunta al grupo: ¿qué emoción sientes que no empezó en ti?','Siento que…')}</div>`+n3priv};

/* ----- 4 · Memorias emocionales y de dolor ----- */
const lvEmo=(k,t,que,graf,items,hot,foot)=>dkH('Memorias emocionales',t,'Marca lo que reconoces. Es tu práctica personal.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lv-emo"><div class="q"><span class="ni-tag" style="color:#d9c9ef">Qué es</span><p>${que}</p><small>En el gráfico: ${graf}</small></div>
 <div class="nj-card" style="min-height:0"><h3>Cómo puede sentirse hoy</h3>${n3ck(k,items)}</div></div>
 ${lvSee(k+'g',hot,'En el gráfico: '+graf+'.')}${foot}</div>`;
RICH.lv6=()=>lvEmo('lv6','Tristeza, miedos e inseguridad','Emociones que las mujeres del linaje no pudieron expresar ni sanar, y que el útero sigue guardando como propias.','Memorias de tristeza · de miedos · de inseguridad · Falta de autoestima',[['gota','Una tristeza que aparece sin motivo'],['xcirc','Miedos que no se explican por la propia historia'],['persona','Sentirse menos, dudar de sí misma'],['corazon','Dificultad para quererse y cuidarse']],[5,14,15,16],n3area('lv6a','Pregunta al grupo: ¿cuál de estas emociones viste también en tu madre o en tu abuela?','La vi en…'));
RICH.lv7=()=>lvEmo('lv7','Ira, frustración, rencor y odio','Rabia contenida por injusticias, silencios o violencias que las mujeres del linaje no pudieron expresar ni defender.','Memorias de ira · de frustración · de rencor · de odio',[['rayo','Irritabilidad o explosiones que sorprenden'],['nudo','Resentimiento con la madre, la pareja o los hombres'],['xcirc','Frustración por no lograr lo que se desea'],['grupo','Cansancio de cargar con todo']],[17,19,20,22],n3area('lv7a','Pregunta al grupo: ¿qué injusticia crees que callaron las mujeres de tu linaje?','Creo que…'));
RICH.lv8=()=>lvEmo('lv8','Asco y rechazo','Rechazo al propio cuerpo, a la sexualidad o al contacto, muchas veces heredado de experiencias de vergüenza o de abuso en el linaje.','Memorias de asco',[['persona','Incomodidad con el propio cuerpo'],['escudo','Rechazo al contacto o a la intimidad'],['gota','Vergüenza con la menstruación o la sexualidad'],['ojo','Sentir que el cuerpo es algo que hay que esconder']],[18],`<div class="lv-pink">Se nombra con respeto. Lo que la persona cuenta, lo cuenta porque quiere.</div>`);
RICH.lv9=()=>dkH('Memorias de dolor','Memorias de dolor','Cuatro memorias. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-cp">${n3flip('lv9',[['reloj','Memorias ancestrales de dolor','El dolor de muchas generaciones de mujeres, guardado sin nombre.'],['rayo','Ansiedades','Inquietud constante, como si algo malo fuera a pasar.'],['corazon','Dolor físico','Molestias sin explicación aparente, siempre después de consultar a un profesional.'],['nudo','Victimismo','Sentir que la vida pasa por encima, sin poder elegir.']],'c4',190)}</div>
 ${niQ('En el gráfico se nombran como «limpiar»: el dolor se reconoce y se suelta.')}${lvSee('lv9g',[0,3,4,7],'Limpiar memorias ancestrales de dolor · ansiedades · dolor físico · victimismo.')}</div>`;

/* ----- 5 · Abusos, abortos y el cuerpo ----- */
RICH.lv10=()=>dkH('Leer con cuidado','Abusos e impactos de abortos: leer con cuidado','Marca cada acuerdo a medida que lo conversan.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:12px">${[['Memorias de abusos','Lo que el linaje vivió y que hoy puede pesar como miedo, vergüenza o desconexión del cuerpo.'],['Impactos de abortos','Espontáneos o provocados, propios o del linaje. Se limpia el impacto que dejaron, sin juzgar a nadie.']].map((x,i)=>`<div class="nj-card" style="min-height:0;background:#f6e2ef;animation:niUp .45s ${i*.12}s both"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
 <div class="nj-card" style="min-height:0;background:var(--ni-olv);color:#ece7d3"><h3>Cómo se leen</h3>${n3ck('lv10',[['chat','Se nombra la memoria sin buscar detalles'],['persona','Nunca se afirma que le pasó a una persona concreta'],['escudo','No se juzga ni se pregunta por lo ocurrido'],['corazon','Si la consultante relata algo propio, se detiene la lectura, se acompaña y se sugiere apoyo profesional']])}</div></div>
 <div class="vc-alert">Ante cualquier riesgo actual para alguien, se contacta a los servicios de emergencia.</div></div>`;
RICH.lv11=()=>{const q=st('lv11q',-1);
 return dkH('El cuerpo','El cuerpo: memorias, no diagnósticos','Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-cp">${n3flip('lv11',[['loto','Miomas','Se lee la memoria emocional que el linaje asocia a ese lugar del cuerpo.'],['corazon','Fertilidad','Memorias del linaje sobre la maternidad, las pérdidas o el deseo de ser madre.'],['rayo','Exceso de energía masculina','Vivir solo desde el hacer, la exigencia y el control, sin espacio para recibir.']],'c3',190)}</div>
 ${niBox('d','Nunca se diagnostica','Ni se promete curar o lograr un embarazo. Este trabajo acompaña la atención médica y ginecológica.')}
 <div class="dk-sub" style="margin:0">¿Se puede decir así? «Con esta limpieza vas a poder quedar embarazada.»</div>
 <div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" ${rxa('set','lv11q',0)} ${pressed(q===0)}>Sí</button><button class="btn btn-ghost btn-sm" ${rxa('set','lv11q',1)} ${pressed(q===1)}>No</button></div>
 ${q===1?`<div class="dk-call ni-in">Correcto. Se puede decir: «El gráfico muestra una posible memoria del linaje sobre la maternidad. La podemos mirar y limpiar, junto con lo que indique tu médico.»</div>`:q===0?`<div class="dk-call warn ni-in">No: es una promesa de resultado. Se habla de memorias, nunca de curar o de lograr un embarazo.</div>`:''}</div>`};

/* ----- 6 · El protocolo ----- */
const LV_PR=[['Paso 1','Árbol femenino','Las mujeres de las siete generaciones.',[['Abrir el árbol',5]]],['Paso 2','Constelación','Linaje y generación.',[['Abrir Constelación',5]]],['Paso 3','Limpieza Uterina','Generación, tema y porcentaje.',[['Abrir el gráfico',6]]],['Paso 4','Decidir','Limpiar directo, investigar o ir al linaje.',[]],['Paso 5','Limpiar y medir','El porcentaje debería bajar.',[]]];
RICH.lv12=()=>{const s=n3clamp(st('lv12',0),0,4),x=LV_PR[s];
 return dkH('Protocolo','El protocolo','Cinco pasos. Toca uno para verlo o repasarlo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-proto">${LV_PR.map((p,i)=>`<button class="${i===4?'new':i===2?'vd-opt':''}" ${rxa('set','lv12',i)} ${pressed(i===s)} style="animation-delay:${i*.08}s${i===2?';background:#f6e2ef;border-color:#f6e2ef':''}"><small>${p[0]}</small><b>${p[1]}</b><span>${p[2]}</span></button>`).join('')}</div>
 <div class="nj-det"><div><span class="ni-tag">${x[0]}</span><br><b>${x[1]}</b><p>${x[2]}</p></div><div style="display:flex;gap:6px;flex-wrap:wrap">${s===3?`<button class="btn btn-ghost btn-sm" data-slide="1">Ver las tres opciones</button>`:x[3].map(b=>`<button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},${b[1]}">${b[0]}</button>`).join('')}</div></div>
 ${niQ('Y al final: recuperar lo que se perdió. Lo vemos en la Clase 3.')}</div>`};
const lvOpt=(n,cu,mid,de)=>`<div style="display:grid;gap:10px">${niBox('l','Cuándo',cu)}<div class="nj-card" style="min-height:0;background:#f6e2ef;padding:14px 16px"><h3 style="font-size:1.05rem">${mid[0]}</h3><p>${mid[1]}</p></div>${niBox('d','Después',de)}</div>`;
RICH.lv13=()=>{const e=njEdName();
 return dkH('Paso 4 · Opción 1','Limpiar directo: Energías Discordantes','Toca la energía que marca el péndulo.')+
 `<div class="ni tc-side"><div class="nj-fig">${niOrig('lv13O','energias.webp','Lámina original del gráfico de Energías Discordantes',njEdChart(0))}</div>
 <div style="display:grid;gap:10px">${lvOpt(1,'Cuando el tema se puede limpiar sin investigar más.',['Cómo','Como aprendiste en Radiestesia y Sanación del Alma.'],'Volver a medir el porcentaje en Limpieza Uterina.')}${e?`<div class="nj-det ni-in"><div><span class="ni-tag">El péndulo marcó</span><br><b>${e}</b></div></div>`:''}</div></div>`};
RICH.lv14=()=>{const m=njMapaTxt();
 return dkH('Paso 4 · Opción 2','Investigar desde el Mapa','Primero el sector, luego la emoción.')+
 `<div class="ni tc-side"><div class="nj-fig">${niOrig('lv14O','mapa.webp','Lámina original del Mapa de Emociones',njMapa())}</div>
 <div style="display:grid;gap:10px">${lvOpt(2,'Cuando hace falta saber qué emoción sostiene el tema.',['Qué se mide','El sector y la emoción.'],'Limpiar y volver a medir el porcentaje.')}${m?`<div class="nj-det ni-in"><div><span class="ni-tag">Sector · emoción</span><br><b>${m}</b></div></div>`:''}</div></div>`};
RICH.lv15=()=>{const v=st('lv15',0);
 return dkH('Paso 4 · Opción 3','Cuándo ir al Transgeneracional','Si la memoria viene de un hecho del linaje.')+
 `<div class="ni tc-side"><div class="nj-fig">${niOrig('lv15O','trans/transgeneracional.webp','Lámina original del gráfico Transgeneracional de Casa Muladhara',trChart(v?{hot:['i0','o6','o11','o3','o25'],cap:'Abortos · abusos · secretos · uniones forzadas · muertes tempranas.'}:{}))}</div>
 <div style="display:grid;gap:10px">${niBox('l','Cuándo','Si la memoria viene de un hecho del linaje.')}<button class="nj-card" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:16px;padding:14px 16px;display:grid;gap:6px;background:#f6e2ef;${v?'box-shadow:0 0 0 3px #b0589a':''}" ${rxa('set','lv15',v?0:1)} ${pressed(!!v)}><b style="font:400 1.05rem var(--f-display)">Por ejemplo</b><span>Abortos, abusos, secretos, uniones forzadas, muertes tempranas.</span><small style="color:#7a5aa6;font-weight:600">${v?'Ocultar en el gráfico':'Verlos en el gráfico'}</small></button>${niBox('d','Después','Limpiar, oración del linaje y volver a medir.')}<div class="dk-cta"><button class="btn btn-ghost btn-sm" data-les="2,20">Repasar el Transgeneracional</button></div></div></div>`};

/* ----- 7 · Leer con cuidado y derivar ----- */
RICH.lv16=()=>dkH('Cuidado','Leer con cuidado','Seis acuerdos. Márcalos a medida que los conversan.')+
 `<div class="ni nl-say"><div>${n3ck('lv16',[['check','Pedir siempre el consentimiento'],['chat','Hablar en hipótesis: «el gráfico muestra una posible...»'],['corazon','No culpar a la madre ni a las abuelas: honrar lo que vivieron'],['escudo','No diagnosticar ni prometer resultados en el cuerpo'],['ojo','No buscar detalles en abusos o abortos'],['persona','Si aparece algo propio y doloroso, detenerse y derivar']],['Son acuerdos para cada sesión.','¡Seis acuerdos claros!'])}</div>
 <div class="nl-frase" style="background:#f6e2ef;color:#4a2340"><span class="ni-tag">Frase para acompañar</span><p>«Esto que apareció no es tu culpa ni la de ellas. Hoy lo podemos mirar con amor y empezar a soltarlo.»</p></div></div>`;

/* ----- 8 · Ejemplo y práctica ----- */
RX.lvex=()=>{Object.assign(RS,{tgl:0,tgg:2,lug:2,lut:17,lup:8,njms:4,njme:20,njmc:1,lv17v:1});render(false)};
const LV_EJ=[['Constelación','Materno · 3era'],['Generación','3 · abuelas'],['Tema','Memorias de ira'],['Mapa','Injusticia → Rabia'],['Porcentaje','80 % → 10 %']];
RICH.lv17=()=>{const s=n3clamp(st('lv17',0),0,5),v=st('lv17v',0);
 return dkH('Ejemplo','Ejemplo de lectura y limpieza','Consultante: C. M., una rabia contenida que explota con su pareja.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow va-5">${LV_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"${i===2?' style="background:#f6e2ef"':''}><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','lv17',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>La abuela materna calló injusticias toda su vida. Esa rabia quedó en el linaje y hoy aparece en la nieta. Se investiga en el Mapa, se limpia y el porcentaje baja.</p></div>
 <div class="lv-drop ni-in"><div class="lab"><span>Antes · 80 %</span><span>Después · 10 %</span></div><div class="bar"><i></i></div></div>
 <div class="dk-cta" style="justify-content:center">${v?'':`<button class="btn btn-primary btn-sm" ${rxa('lvex',0)}>Verlo en los gráficos</button>`}<button class="btn btn-ghost btn-sm" ${rxa('set','lv17',0)}>Ver de nuevo</button></div>
 ${v?`<div class="dk-grid c2 ni-in" style="align-items:start"><div>${luChart({hot:(k,i)=>k==='g'?i===2:k==='t'?i===17:i===8,cap:'Limpieza Uterina: generación 3, memorias de ira, 80 %.'})}</div><div>${njMapa()}</div></div>`:''}`}</div>`+niNote('Ejemplo ficticio.')};
const LV_PS=[['Leer','Con tu árbol a la vista, tu pareja lee Constelación y Limpieza Uterina.'],['Decidir','Deciden juntas: limpiar directo, investigar en el Mapa o ir al linaje.'],['Limpiar y medir','Limpian y vuelven a medir el porcentaje.'],['Ficha','Completan la ficha y cambian de rol.']];
RICH.lv18=()=>{const s=n3clamp(st('lv18',0),0,3);
 return dkH('Práctica en parejas','Práctica en parejas','Cuatro pasos. El botón llena la ficha con lo que marcaste en los gráficos.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${LV_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','lv18',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 ${s<3?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','lv18',s+1)}>Siguiente paso</button></div>`:''}
 ${niFicha('lvf',['Fecha','Consultante','Motivo','Linaje','Generación','Tema','% inicial','Limpieza','% final'],['Ej.: 04/11','C. M.','Rabia con su pareja','Materno','3','Memorias de ira','80 %','Mapa: Injusticia · Rabia','10 %'],
 ()=>{const g=tgRead(),u=luRead(),m=njMapaTxt(),e=njEdName();return [tbHoy(),'','',g[0],u[0]?u[0].split(' · ')[0]:'',u[1],u[2],m?'Mapa: '+NJ_MS[st('njms',0)][0]+' · '+m.split(' · ')[1]:e?'Directo: '+e:'','']},1060)}</div>`+niNote('Usa iniciales; la primera fila es un ejemplo ficticio.')};

/* ----- 9 · Reglas de oro, repaso y tarea ----- */
RICH.lv19=()=>dkH('Repaso','Reglas de oro y comprobemos','Las reglas de cada sesión. Después respondan en voz alta y toquen cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-card" style="min-height:0;background:var(--ni-olv);color:#ece7d3"><h3>Reglas de oro</h3><div class="lv-rg">${['Hablar siempre en hipótesis','Honrar a las mujeres del linaje, sin culparlas','No diagnosticar ni prometer resultados','Cuidar los temas sensibles y derivar cuando haga falta'].map((x,i)=>`<div style="background:#ffffff14;border-radius:12px;padding:10px 12px;color:#dfe3cf;animation:niUp .45s ${i*.1}s both"><b style="color:#f2c66d">${i+1}</b> ${x}</div>`).join('')}</div></div>
 <div class="ni-cp">${n3flip('lvcp',[['diana','1 · ¿Cuándo se limpia directo y cuándo se investiga en el Mapa?','<b>Directo,</b> con Energías Discordantes, cuando el tema se puede limpiar sin investigar más. <b>En el Mapa,</b> cuando hace falta saber qué emoción sostiene el tema.'],['arbol','2 · ¿Cuándo se profundiza en el Transgeneracional?','<b>Si la memoria viene de un hecho del linaje:</b> abortos, abusos, secretos, uniones forzadas o muertes tempranas. Después se limpia, se dice la oración del linaje y se vuelve a medir.'],['loto','3 · ¿Cómo se leen miomas y fertilidad?','<b>Como memorias, no como diagnósticos.</b> Se lee la memoria emocional del linaje, sin prometer curar ni lograr un embarazo, y acompañando la atención médica.']],'c3',260)}</div></div>`;
RICH.lv20=()=>dkH('Cierre de la clase','Tarea para la próxima clase','Una memoria de tu linaje femenino.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('lvta',[['arbol','Lee en Constelación tu linaje y la generación'],['diana','Lee en Limpieza Uterina la generación, el tema y el porcentaje'],['limpia','Limpia directo, investiga en el Mapa o profundiza en el linaje'],['reloj','Vuelve a medir el porcentaje'],['libro','Completa la ficha y anota lo que sentiste durante la semana']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 3.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Elige un tema que puedas mirar con calma. Si algo te remueve mucho, detente y pide apoyo. Trae tu ficha.')}<div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},6">Limpieza Uterina</button>${vaGo(-1,'Abrir mi ficha')}</div></div></div>`;

/* ---------- Nivel 4 · Especialización Limpieza Uterina · Clase 3 ---------- */
(function(){const c=document.createElement('style');c.id='lw-css';c.textContent=`
.lw-mv{display:grid;grid-template-columns:minmax(0,1fr) 150px minmax(0,1fr);gap:14px;align-items:center}
.lw-mv .nj-card{min-height:0;transition:opacity .3s,box-shadow .3s}.lw-mv .nj-card.dim{opacity:.45}
.lw-mv .nj-card.on{box-shadow:0 0 0 3px #b0589a}
.lw-jar{position:relative;width:110px;height:150px;margin:0 auto;border:3px solid #7a5aa6;border-top:0;border-radius:0 0 46px 46px;overflow:hidden;background:#fff}
.lw-jar i{position:absolute;left:0;right:0;bottom:0;transition:height 1.6s ease-in-out,background 1.2s}
.lw-jar i.h0{height:78%;background:linear-gradient(#8a8476,#5c5a4f)}.lw-jar i.h1{height:8%;background:linear-gradient(#8a8476,#5c5a4f)}.lw-jar i.h2{height:84%;background:linear-gradient(#ecc3dc,#b0589a)}
.lw-jar b{position:absolute;inset:auto 0 8px;text-align:center;font:600 .74rem var(--f-body);color:#fff;z-index:1}
.lw-jar.s1 b{color:#7a5aa6}
.lw-sec{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.lw-sec span{background:#f6e2ef;color:#4a2340;border-radius:999px;padding:6px 12px;font:600 .84rem var(--f-body);animation:niUp .45s both}
.lw-sec.h span{background:var(--ni-olv);color:#ece7d3}
.lw-bal{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) minmax(0,1fr);gap:14px;align-items:center}
.lw-bal .lw-sd{border-radius:18px;padding:16px;display:grid;gap:8px;align-content:start;transition:transform .5s,box-shadow .5s}
.lw-bal .lw-sd.lw-f{background:#f6e2ef;color:#4a2340}.lw-bal .lw-sd.lw-m{background:var(--ni-olv);color:#ece7d3}
.lw-bal .lw-sd.lw-on{box-shadow:0 0 0 3px #b0589a}
.lw-bal .lw-sd ul{margin:0;padding-left:18px;display:grid;gap:3px}
.lw-bal svg{width:100%;height:auto;display:block}
.lw-bal .beam{transition:transform .8s cubic-bezier(.3,1.4,.5,1);transform-origin:120px 60px}
.lw-rng{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
.lw-es{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px}
.lw-my{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}
@media (max-width:760px){.lw-mv,.lw-bal,.lw-es{grid-template-columns:1fr}.lw-mv .lw-jar{height:110px;width:120px}}
`;document.head.appendChild(c)})();
const lwPhoto=alt=>`<div class="ni-ph"><img src="${N4P}utero/c3-portada.webp" alt="${alt}"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#ecc3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#b0589a" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#e6dcf2"/></svg></div>`;
const LW_REC=[6,8,9,10,23],LW_SAN=[11,12,13];

/* ----- 1 · Bienvenida y agenda ----- */
RICH.lw1=()=>`<div class="ni">${nbHero('Especialización Limpieza de Útero · Clase 3','Recuperar la','energía femenina','Después de limpiar, se recupera: la sexualidad, la creatividad, las virtudes y la fuerza; honrar, respetar y perdonar; soltar y volver al equilibrio, con la oración del linaje femenino y la meditación del útero.',['Recuperar','Honrar','Perdonar','Equilibrio'],'Karen Oyarce · Maestra Holística',lwPhoto('Manos de mujeres unidas sobre el musgo, con hilos rojos en las muñecas'))}</div>`;
RICH.lw2=()=>niAgenda('Clase 3',['Revisión de la tarea y ronda','Limpiar y recuperar','Sexualidad, creatividad, virtudes y fuerza','Honrar, respetar y perdonar','Soltar y el equilibrio de energías','Oración y meditación','Ejemplo, práctica y repaso','Tarea'],
 ['Explicar por qué después de limpiar se recupera','Reconocer los sectores de recuperación del gráfico','Acompañar la recuperación de una cualidad','Guiar la oración del linaje femenino y la meditación']);

/* ----- 2 · Revisión de la tarea y ronda ----- */
RICH.lw3=()=>{const r=luRead();
 return dkH('Lo que trajiste','Revisemos la tarea de la semana','La memoria de tu linaje femenino. Marca las preguntas a medida que las conversan.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="nj-card l ni-in" style="min-height:0;background:#f6e2ef"><h3>Tu ficha</h3>${n3ck('lwt1',[['arbol','¿Qué generación y qué tema aparecieron?'],['diana','¿Limpiaste directo, investigaste en el Mapa o fuiste al linaje?'],['reloj','¿Cuánto bajó el porcentaje?'],['vientre','¿Qué sentiste en tu cuerpo durante la semana?'],['chat','¿Qué duda te quedó?']])}</div>
 <div style="display:grid;gap:10px">${r.every(Boolean)?`<div class="ni-hyp ni-in"><span class="ni-tag">Lo que marcaste en el gráfico</span><p>Generación <mark>${r[0]}</mark>, <mark>${r[1].toLowerCase()}</mark>, <mark>${r[2]}</mark>.</p></div>`:''}${niQ('Compartir es voluntario. Lo que se dice en el grupo, queda en el grupo.')}<div class="dk-cta" style="flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},16">Abrir mi ficha</button></div></div></div>`};
RICH.lw4=()=>dkH('Ronda','Ronda de descubrimientos','Una o dos frases por persona. Si quieres, anota la tuya.')+
 `<div class="ni va-3">${[['Lo que solté','Algo que se siente más liviano después de limpiar.'],['Lo que noté','Un cambio en mi cuerpo, mis emociones o mis vínculos.'],['Lo que quiero recuperar','Una cualidad que siento que me falta.']].map((x,i)=>`<div class="nj-card${i===2?' l':''}" style="min-height:0;animation:niUp .45s ${i*.1}s both${i===2?';background:#f6e2ef':''}"><h3>${x[0]}</h3><p>${x[1]}</p>${n3area('lw4'+i,'','Escribe aquí…')}</div>`).join('')}</div>`+n3priv;

/* ----- 3 · Limpiar y recuperar ----- */
RICH.lw5=()=>{const s=n3clamp(st('lw5',0),0,2);
 return dkH('Dos movimientos','Limpiar y recuperar','Toca cada movimiento y mira qué pasa en el útero.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lw-mv">
 <button class="nj-card ${s===1?'on':s===2?'dim':''}" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:16px;display:grid;gap:6px;background:var(--nb-paper);border:1px solid var(--nb-line)" ${rxa('set','lw5',1)} ${pressed(s===1)}><span class="ni-tag">Primer movimiento</span><b style="font:400 1.25rem var(--f-display)">Limpiar</b><span>Soltar las memorias de dolor, miedo o rabia que no son nuestras.</span></button>
 <div class="lw-jar s${s}" role="img" aria-label="${['Útero con memorias','Útero limpio: un espacio libre','Útero lleno de fuerza, creatividad, placer y virtudes'][s]}"><b>${['Memorias','Espacio libre','Recuperado'][s]}</b><i class="h${s}"></i></div>
 <button class="nj-card ${s===2?'on':s===0?'dim':''}" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:16px;display:grid;gap:6px;background:#f6e2ef;color:#4a2340" ${rxa('set','lw5',2)} ${pressed(s===2)}><span class="ni-tag">Segundo movimiento</span><b style="font:400 1.25rem var(--f-display)">Recuperar</b><span>Llenar ese espacio con fuerza, creatividad, placer y virtudes.</span></button></div>
 ${s?`<div class="dk-call ni-in">${s===1?'El útero queda con un espacio libre. Ahora toca «Recuperar».':'Lo que el linaje no pudo vivir, hoy se recupera.'}</div>`:''}
 ${niBox('d','La idea','Limpiar deja un espacio libre; recuperar lo llena con lo que el linaje no pudo vivir.')}</div>`};
RICH.lw6=()=>{const s=st('lw6',0);
 return dkH('El gráfico','Los sectores de recuperación','Toca cada grupo para verlo en el gráfico de Limpieza Uterina.')+
 `<div class="ni tc-side"><div class="nj-fig">${luChart({hot:(r,i)=>r==='t'&&(s===0?LW_REC:LW_SAN).includes(i),cap:s===0?'Sectores rosados: recuperar.':'Para sanar: honrar, respetar y perdonar.'})}</div>
 <div style="display:grid;gap:12px;align-content:start">${chipRow('lw6',['Sectores rosados','Para sanar'],s)}
 ${s===0?`<div class="lw-sec">${['Sexualidad','Manifestar creatividad','Recuperar virtudes','Recuperar fuerza','Soltar, confiar y dejar ir'].map((x,i)=>`<span style="animation-delay:${i*.07}s">${x}</span>`).join('')}</div>`:
 `<div class="lw-sec h">${['Honrar las experiencias','Respetar','Perdonar'].map((x,i)=>`<span style="animation-delay:${i*.07}s">${x}</span>`).join('')}</div>`}
 ${niBox('l','Cómo se trabaja','Se mide cuál pide recuperarse y su porcentaje, antes y después.')}</div></div>`};

/* ----- 4 · Sexualidad, creatividad, virtudes y fuerza ----- */
const lwRec=(k,t,i,que,items,q,ph)=>dkH('Recuperar',t,'Marca lo que reconoces. Es tu práctica personal.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lv-emo"><div class="q" style="background:#f6e2ef;color:#4a2340"><span class="ni-tag">Qué es recuperarla</span><p style="color:#4a2340">${que}</p><small style="color:#7a5aa6">En el gráfico: ${luT(i)}</small></div>
 <div class="nj-card" style="min-height:0;background:var(--ni-olv);color:#ece7d3"><h3>Cuando vuelve, se nota en</h3>${n3ck(k,items)}</div></div>
 ${lvSee(k+'g',[i],'En el gráfico: '+luT(i)+'.')}${n3area(k+'a','Pregunta al grupo: '+q,ph)}</div>`+n3priv;
RICH.lw7=()=>lwRec('lw7','Recuperar la sexualidad',6,'Vivir el cuerpo, el placer y la intimidad con dignidad, libre de la vergüenza o el miedo que el linaje cargó.',[['persona','Disfrutar del propio cuerpo sin culpa'],['escudo','Poner límites con claridad'],['corazon','Vivir la intimidad desde el deseo, no la obligación'],['luna','Vivir el ciclo menstrual sin vergüenza']],'¿Qué mensaje sobre el cuerpo recibiste de las mujeres de tu linaje?','Recibí que…');
RICH.lw8=()=>lwRec('lw8','Manifestar la creatividad',8,'Recuperar el útero como centro creador: ideas, proyectos, arte y caminos nuevos que piden nacer.',[['estrella','Ganas de crear y de jugar'],['check','Terminar lo que se empieza'],['voz','Expresarse con libertad'],['sol','Confiar en las propias ideas']],'¿Qué quieres crear que todavía no te permites?','Quiero crear…');
RICH.lw9=()=>lwRec('lw9','Recuperar las virtudes',9,'Tomar los dones que también nos dejaron las mujeres del linaje: sabiduría, ternura, intuición, resiliencia.',[['regalo','Reconocer en una misma los dones de las abuelas'],['ojo','Confiar en la propia intuición'],['corazon','Cuidar sin descuidarse'],['arbol','Sentirse orgullosa de su origen']],'¿Qué virtud de una mujer de tu linaje quieres tomar?','Quiero tomar…');
RICH.lw10=()=>lwRec('lw10','Recuperar la fuerza',10,'La fuerza para decidir, poner límites y sostener el propio camino, sin dureza y sin cargar con todo.',[['xcirc','Decir que no sin culpa'],['grupo','Pedir ayuda cuando se necesita'],['escudo','Defenderse sin violencia'],['puno','Sostenerse en los momentos difíciles']],'¿En qué momento de tu vida necesitas hoy tu fuerza?','La necesito en…');

/* ----- 5 · Honrar, respetar y perdonar ----- */
RICH.lw11=()=>dkH('Para sanar','Honrar las experiencias','Tres gestos. Toca cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px">${niBox('d','Honrar','Reconocer lo que vivieron las mujeres del linaje, con su dolor y su fuerza, sin negarlo ni juzgarlo.')}
 <div class="ni-cp">${n3flip('lw11',[['ojo','Ver','Mirar su historia completa, no solo lo que dolió.'],['hilos','Reconocer','Lo que vivieron les dio forma a ellas y a nosotras.'],['corazon','Agradecer','La vida llegó a través de ellas.']],'c3',170)}</div>
 ${lvSee('lw11g',[11],'En el gráfico: Honrar las experiencias.')}${n3area('lw11a','Pregunta al grupo: ¿qué experiencia de una mujer de tu linaje quieres honrar hoy?','Quiero honrar…')}</div>`+n3priv;
RICH.lw12=()=>{const o=st('lw12',{});
 return dkH('Para sanar','Respetar','Dos respetos. Toca cada uno.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lw-es">${[['Respetar sus decisiones','Ellas eligieron con lo que tenían y con lo que sabían. No nos toca juzgarlas.','#f6e2ef','#4a2340'],['Respetar las propias','Podemos elegir distinto sin dejar de pertenecer al linaje.','var(--ni-olv)','#ece7d3']].map((x,i)=>`<button class="nj-card" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:18px;padding:18px;display:grid;gap:8px;background:${x[2]};color:${x[3]};animation:niUp .45s ${i*.12}s both${o[i]?';box-shadow:0 0 0 3px #b0589a':''}" ${rxa('tog','lw12',i)} ${pressed(!!o[i])}><b style="font:400 1.2rem var(--f-display)">${x[0]}</b>${o[i]?`<span class="ni-in">${x[1]}</span>`:`<small style="opacity:.75">Toca para ver</small>`}</button>`).join('')}</div>
 ${o[0]&&o[1]?`<div class="ni-in">${n3quote('<mark>Elegir distinto no es traicionar.</mark>')}</div>`:''}
 ${lvSee('lw12g',[12],'En el gráfico: Respetar.')}</div>`};
RICH.lw13=()=>dkH('Para sanar','Perdonar: liberar sin justificar','Ordena cada frase: ¿es perdonar o no lo es?')+
 niSort('lw13',[['Soltar el peso que nos ata a lo ocurrido',0],['Justificar lo que pasó',1],['Liberar a las mujeres del linaje y liberarse',0],['Olvidar o negar el dolor',1],['Un proceso que llega a su tiempo',0],['Volver a relacionarse con quien dañó',1],['Una obligación',1]],
 [['Perdonar es','','l','Es'],['Perdonar no es','','d','No es']],'Nadie está obligada a perdonar.','Mira de nuevo: perdonar libera, pero no justifica, no olvida ni obliga.');

/* ----- 6 · Soltar y el equilibrio de energías ----- */
RICH.lw14=()=>lwRec('lw14','Soltar, confiar y dejar ir',23,'Dejar de sostener lo que ya no nos pertenece y confiar en que la vida puede ser distinta a la del linaje.',[['ala','Menos necesidad de controlar'],['camino','Confianza en el propio camino'],['paloma','Capacidad de despedirse'],['loto','Más descanso y más disfrute']],'¿Qué necesitas soltar hoy para seguir adelante?','Necesito soltar…');
const LW_BAL=['Solo hacer','Más hacer','En equilibrio','Más recibir','Solo recibir'];
RICH.lw15=()=>{const v=n3clamp(st('lw15',0),0,4),a=(v-2)*-9;
 return dkH('Equilibrio','El equilibrio de las energías','Mueve la balanza: ¿desde dónde vives hoy?')+
 `<div class="ni" style="display:grid;gap:14px"><div class="lw-bal"><div class="lw-sd lw-f${v>2?' lw-on':''}"><span class="ni-tag">Energía femenina</span><b style="font:400 1.2rem var(--f-display)">Recibir</b><ul>${['Sentir','Descansar','Intuir','Crear','Cuidar y dejarse cuidar'].map(x=>`<li>${x}</li>`).join('')}</ul></div>
 <svg viewBox="0 0 240 150" role="img" aria-label="Balanza: ${LW_BAL[v]}"><path d="M120 60v74M90 138h60" stroke="#7a5aa6" stroke-width="5" stroke-linecap="round" fill="none"/>
 <g class="beam" style="transform:rotate(${a}deg)"><path d="M30 60h180" stroke="#7a5aa6" stroke-width="5" stroke-linecap="round"/><path d="M30 60l-18 38h36zM210 60l-18 38h36z" fill="none" stroke="#7a5aa6" stroke-width="2"/><ellipse cx="30" cy="100" rx="22" ry="6" fill="#ecc3dc"/><ellipse cx="210" cy="100" rx="22" ry="6" fill="#5c6b4a"/></g><circle cx="120" cy="60" r="7" fill="#b0589a"/></svg>
 <div class="lw-sd lw-m${v<2?' lw-on':''}"><span class="ni-tag" style="color:#d9c9ef">Energía masculina</span><b style="font:400 1.2rem var(--f-display)">Hacer</b><ul>${['Decidir','Proteger','Avanzar','Ordenar','Sostener'].map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
 <div class="lw-rng">${LW_BAL.map((x,i)=>`<button class="chip" ${rxa('set','lw15',i)} ${pressed(i===v)}>${x}</button>`).join('')}</div>
 <div class="dk-call${v===2?'':' warn'} ni-in">${v===2?'Las dos energías se sostienen: se recibe y se hace.':v<2?'Cuando solo vivimos desde el hacer, aparece el exceso de energía masculina.':'Recibir sin hacer también desequilibra: hacen falta las dos.'}</div>
 ${niBox('d','Sanar','Es volver al equilibrio: recibir y hacer, las dos energías juntas.')}${lvSee('lw15g',[24],'En el gráfico: Exceso de energía masculina.')}</div>`};

/* ----- 7 · Oración y meditación ----- */
const LW_PR=LU_PRAY.split(/(?<=[.,])\s+(?=las perdono|Las libero|y me uno|Hoy de mi|y las reemplazo)/);
RICH.lw16=()=>dkH('Cierre de la limpieza','La oración del linaje femenino','La decimos juntas, frase a frase, para cerrar cada limpieza.')+`<div class="ni">${n3pray('lwor',LW_PR)}</div>`;
RICH.lw17=()=>dkH('Meditación','Conexión con el útero','Lee despacio cada frase y respira entre una y otra.')+`<div class="ni">${n3pray('lwme',['Siéntate cómoda, cierra los ojos y pon tus manos sobre el vientre.','Respira lento y lleva tu atención a tu útero. Imagina allí una luz suave.','Siente detrás de ti a tu madre, a tus abuelas y a todas las mujeres de tu linaje.','Diles en tu interior: «Gracias por la vida. Lo que es de ustedes, se los devuelvo con amor».','Pide recuperar la cualidad que necesitas hoy y siente cómo llena ese espacio.','Respira, agradece y vuelve despacio al presente.'])}</div>`;

/* ----- 8 · Ejemplo, práctica y repaso ----- */
const LW_EJ=[['Memoria','Ira · abuela materna'],['Limpieza','80 % → 10 %'],['Sector','Recuperar fuerza'],['Para sanar','Perdonar'],['Cierre','Oración del linaje']];
RICH.lw18=()=>{const s=n3clamp(st('lw18',0),0,5),v=st('lw18v',0);
 return dkH('Ejemplo','De la memoria a la recuperación','Consultante: C. M., la misma de la Clase 2.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-flow va-5">${LW_EJ.map((x,i)=>`<div class="${i<s?'lit':''}"${i===2||i===3?' style="background:#f6e2ef"':''}><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
 ${s<5?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','lw18',s+1)}>${s?'Siguiente':'Empezar'}</button></div>`:
 `<div class="ni-hyp ni-in"><span class="ni-tag">Comprensión posible</span><p>La abuela no pudo defenderse y su fuerza se volvió rabia callada. Hoy la nieta recupera esa fuerza como una <mark>fuerza serena</mark>, que pone límites sin explotar.</p></div>
 <div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set','lw18v',v?0:1)} ${pressed(!!v)}>${v?'Ocultar el gráfico':'Verlo en el gráfico'}</button><button class="btn btn-ghost btn-sm" ${rxa('set','lw18',0)}>Ver de nuevo</button></div>
 ${v?`<div class="ni-in" style="max-width:640px;width:100%;justify-self:center">${luChart({hot:(k,i)=>k==='t'&&(i===10||i===13),cap:'Recuperar fuerza y Perdonar.'})}</div>`:''}`}</div>`+niNote('Ejemplo ficticio.')};
const LW_PS=[['Retoma','La memoria que limpiaste en la tarea.'],['Mide','Tu pareja mide qué sector pide recuperarse y su porcentaje.'],['Oración','Digan juntas la oración del linaje femenino.'],['Vuelve a medir','Y cambien de rol.']];
RICH.lw19=()=>{const s=n3clamp(st('lw19',0),0,3);
 return dkH('Práctica y repaso','Práctica en parejas y comprobemos','Cuatro pasos. Después respondan en voz alta y toquen cada tarjeta.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="nj-steps h tg-st4">${LW_PS.map((x,i)=>`<div class="${i<s?'ok':i===s?'cur':''}" style="cursor:pointer" ${rxa('set','lw19',i)}><span class="n">${i<s?'✓':i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div>
 <div class="dk-cta" style="justify-content:center;flex-wrap:wrap">${s<3?`<button class="btn btn-primary btn-sm" ${rxa('set','lw19',s+1)}>Siguiente paso</button>`:''}${s===1||s===3?`<button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},6">Abrir el gráfico</button>`:s===2?`<button class="btn btn-ghost btn-sm" data-les="${S.lesson[0]},24">Abrir la oración</button>`:''}</div>
 <div class="ni-cp">${n3flip('lwcp',[['vientre','1 · ¿Por qué después de limpiar se recupera?','<b>Porque limpiar deja un espacio libre</b> y recuperar lo llena con lo que el linaje no pudo vivir: fuerza, creatividad, placer y virtudes.'],['diana','2 · ¿Cuáles son los sectores de recuperación?','<b>Los sectores rosados:</b> sexualidad, manifestar creatividad, recuperar virtudes, recuperar fuerza y soltar, confiar y dejar ir. Para sanar: honrar, respetar y perdonar.'],['paloma','3 · ¿Qué es perdonar y qué no es?','<b>Es</b> soltar el peso, liberar y liberarse, a su tiempo. <b>No es</b> justificar, olvidar, volver con quien dañó ni una obligación.']],'c3',260)}</div></div>`};

/* ----- 9 · Tarea ----- */
RICH.lw20=()=>{const s=st('lwq',-1);
 return dkH('Cierre de la clase','Tarea para la próxima clase','Recupera una cualidad.')+
 `<div class="ni dk-grid c2" style="align-items:start"><div class="ni-task">${n3ck('lwta',[['diana','Mide qué sector pide recuperarse y su porcentaje'],['vientre','Haz la meditación de conexión con el útero tres veces en la semana'],['hilos','Di cada día la oración del linaje femenino'],['libro','Anota cómo se manifiesta esa cualidad en tu vida'],['reloj','Vuelve a medir al final de la semana y completa la ficha']],['Marca cada punto cuando lo tengas.','¡Listo! Trae tu ficha a la Clase 4.'])}</div>
 <div style="display:grid;gap:10px">${niBox('d','Importante','Recuperar lleva su tiempo. Sé amable contigo y observa los pequeños cambios. Trae tu ficha a la Clase 4.')}
 <div class="dk-sub" style="margin:0">Mi cualidad de la semana</div>${chipRow('lwq',['Sexualidad','Creatividad','Virtudes','Fuerza','Soltar'],s)}
 <div class="lw-my"><label class="n3-lab">% al inicio<input type="text" data-rsin="lwq0" value="${esc(st('lwq0',''))}" placeholder="0 a 100 %"></label><label class="n3-lab">% al final<input type="text" data-rsin="lwq1" value="${esc(st('lwq1',''))}" placeholder="0 a 100 %"></label></div>
 ${n3area('lwq2','Cómo se manifiesta en mi vida','Esta semana noté…')}</div></div>`+n3priv};
