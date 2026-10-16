// Casa Muladhara · Especialización Niño Interno (aparte de los cinco niveles; por ahora solo la Maestra, lo exige middleware.js).
// Script clásico: usa las piezas de curso/n1.js y curso/n3.js, que se cargan antes.
/* ---------- Especialización Niño Interno · Clase 1 ---------- */
(function(){const c=document.createElement('style');c.id='ni-css';c.textContent=`
.ni{--ni-lil:#e6dcf2;--ni-lil2:#7a5aa6;--ni-tea:#d6e8e2;--ni-tea2:#3f7d6e;--ni-olv:#3b4a24;--ni-red:#c0392b}
.ni-tag{display:inline-block;font:600 .62rem/1 var(--f-caps);letter-spacing:.18em;text-transform:uppercase;color:var(--ni-lil2)}
.ni-cover{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:26px;align-items:center}
.ni-cover .nb-cover{min-height:0}
.ni-ph{position:relative;justify-self:center;width:min(100%,300px);margin:0 auto}
.ni-ph img{display:block;width:100%;aspect-ratio:536/578;object-fit:cover;border-radius:999px 999px 22px 22px;border:4px solid #f3ecd8;box-shadow:0 22px 50px -26px rgba(28,58,43,.7)}
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
  qs:'Reconocer su derecho a existir, ocupar su lugar y ser vista o visto sin tener que esconderse.',
  hv:'sintió que no era aceptado tal como era',ha:'retirarse, callarse y refugiarse en su mundo interior'},
 {n:'Abandono',m:'Dependiente',ic:'nino',med:'presencia',mic:'grupo',need:'Presencia y apoyo emocional',act:'Se queda solo o siente distancia',sana:'La capacidad de sostenerse a sí mismo',
  viv:'Sintió que le faltó presencia, compañía o apoyo emocional. Puede venir de ausencias reales, como separaciones, hospitalizaciones o padres que trabajaban mucho, o de adultos presentes en el cuerpo pero no en lo emocional.',
  cre:'Si me dejan sola o solo, no voy a poder.',
  adu:['Miedo intenso a la soledad y a perder a quien ama','Necesita atención y aprobación constantes','Permanece en relaciones que le hacen daño','Le cuesta tomar decisiones sin apoyo'],
  masc:'Se protege buscando sostén en otros: pide ayuda, se aferra y hace lo posible para no quedarse sola o solo.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del sexo opuesto.',
  qs:'Aprender a acompañarse, sostener su propia soledad y elegir los vínculos desde el deseo y no desde el miedo.',
  hv:'vivió la falta de presencia',ha:'aferrarse, pedir aprobación y temerle a la distancia'},
 {n:'Humillación',m:'Masoquista',ic:'gota',med:'dignidad',mic:'estrella',need:'Respeto por su cuerpo y su dignidad',act:'Siente vergüenza o culpa por lo que desea',sana:'La dignidad y el permiso para disfrutar',
  viv:'Se sintió avergonzado, controlado o ridiculizado, sobre todo en relación con su cuerpo, sus necesidades o sus deseos. Aprendió que el placer y la libertad eran motivo de culpa.',
  cre:'Lo que yo deseo está mal; primero los demás.',
  adu:['Carga con los problemas de otros y se olvida de sí','Siente vergüenza de su cuerpo o de sus deseos','Le cuesta disfrutar sin sentir culpa','Se pone en segundo lugar para ser querida o querido'],
  masc:'Se protege cargando y sirviendo: se sacrifica por otros y se castiga antes de que alguien la humille.',
  fig:'Según Bourbeau, suele vivirse con quien se ocupó de su cuerpo y su crianza, con frecuencia la madre.',
  qs:'Recuperar su dignidad, darse permiso para disfrutar y poner límites sin culpa.',
  hv:'se sintió avergonzado o controlado en su cuerpo y sus deseos',ha:'cargar con otros, sacrificarse y ponerse en segundo lugar'},
 {n:'Traición',m:'Controlador',ic:'candado',med:'confianza',mic:'escudo',need:'Poder confiar en el adulto',act:'Se rompe una promesa o un compromiso',sana:'La confianza y el soltar el control',
  viv:'Sintió que un adulto importante no cumplió lo que prometió, no lo protegió o lo usó para sus propias necesidades. Perdió la confianza en que el amor era seguro.',
  cre:'Si no controlo, me van a fallar.',
  adu:['Necesita controlar situaciones y personas','Le cuesta delegar y confiar','Se impacienta y necesita tener la razón','Sospecha de las intenciones de los demás'],
  masc:'Se protege adelantándose: planifica, vigila y decide por otros para no volver a ser defraudado.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del sexo opuesto.',
  qs:'Volver a confiar, soltar el control y aceptar que los demás pueden fallar sin que eso la destruya.',
  hv:'sintió que no cumplieron lo prometido o que no lo protegieron',ha:'adelantarse, vigilar y controlar para no volver a ser defraudado'},
 {n:'Injusticia',m:'Rígido/a',ic:'balanza',med:'reconocimiento',mic:'sol',need:'Reconocimiento, calidez y equidad',act:'Percibe trato desigual o frialdad',sana:'El permiso para sentir y descansar',
  viv:'Creció con adultos fríos, exigentes o autoritarios. Sintió que lo valoraban por lo que hacía bien y no por lo que era, o que lo trataban distinto que a otros.',
  cre:'Tengo que ser perfecta o perfecto para merecer.',
  adu:['Perfeccionismo y autoexigencia alta','Le cuesta mostrar emociones y vulnerabilidad','Se juzga con dureza a sí mismo y a otros','Trabaja de más y le cuesta descansar'],
  masc:'Se protege con orden y perfección: se desconecta de lo que siente para no sufrir.',
  fig:'Según Bourbeau, suele vivirse con el progenitor del mismo sexo.',
  qs:'Permitirse sentir, equivocarse y descansar, y reconocer su valor más allá de lo que logra.',
  hv:'vivió frialdad, exigencia o un trato distinto que a otros',ha:'ser perfecto, exigirse y desconectarse de lo que siente'}
];
const niBox=(c,t,p)=>`<div class="ni-box ${c}"><b>${t}</b>${p?`<p>${p}</p>`:''}</div>`;
const niQ=t=>`<div class="ni-quote">${t}</div>`;
const niNote=t=>`<p class="dk-note" style="text-align:center">${t}</p>`;

/* ----- 1 · Bienvenida y agenda ----- */
RICH.ni1=()=>`<div class="ni">${nbHero('Especialización Niño Interno · Clase 1 · Profundización','Lo que el niño interno','nos enseña a sanar','Las cinco heridas, sus máscaras y las figuras de madre y padre, leídas en el gráfico con mayor profundidad.',['Heridas','Máscaras','Madre y padre','Sanación'],'Karen Oyarce · Maestra Holística',
 `<div class="ni-ph"><img src="assets/esp/nino-abrazo.webp" alt="Una mujer abraza con ternura a una niña, con los ojos cerrados"><svg class="ni-arc" viewBox="0 0 200 104" aria-hidden="true"><path pathLength="1" d="M10 100a90 90 0 0 1 180 0" stroke="#f3ecd8" stroke-width="16"/><path pathLength="1" d="M34 100a66 66 0 0 1 132 0" stroke="#cfe3dc" stroke-width="16"/><path pathLength="1" d="M58 100a42 42 0 0 1 84 0" stroke="#e6dcf2" stroke-width="16"/><circle cx="100" cy="100" r="18" fill="#c0392b"/></svg></div>`)}</div>`;
const NI_AG=[['Qué es el niño interno',1],['Cómo se forma',1],['Qué podemos sanar con él',1],['Cómo se forma una herida',2],['Las cinco heridas, una por una',3],['Rechazo y abandono: diferencias',4],['La madre y el padre en el gráfico',5],['Lectura profunda, sanación y práctica',6]];
RICH.ni2=()=>dkH('Clase 1','Agenda de la clase','Ocho momentos. Toca uno para ir directo a él.')+
 `<div class="ni dk-split" style="align-items:stretch"><div class="ni-agenda ni-st">${NI_AG.map((x,i)=>`<button data-les="0,${x[1]}"><b>${i+1}</b><span>${x[0]}</span><small>Ir</small></button>`).join('')}</div>
 <div class="ni-obj"><span class="ni-tag" style="color:#d9c9ef">Objetivo de hoy</span><h3>Pasar de la lectura a la comprensión</h3><p>Reconocer cada herida, su máscara, la figura involucrada y lo que la persona puede sanar.</p></div></div>`;

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
  ${niBox('d','Qué se sana',h.qs)}</div></div>`};
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
 return dkH('Anillo 2 · Quién la provocó',F.t,'Recorre las tres columnas: lo que representa, cómo se ve la herida y lo que se sana.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-fig">${col(0,F.c1,'Lo que representa',F.rep)}${col(1,'','Cuando la herida es con '+(f==='madre'?'la madre':'el padre'),F.her,'background:var(--nb-paper);border:1px solid var(--nb-line);color:var(--nb-ink)')}${col(2,'d','Qué se sana',F.san)}</div>
 ${s<2?`<div class="dk-cta" style="justify-content:center"><button class="btn btn-primary btn-sm" ${rxa('set',k,s+1)}>Siguiente</button></div>`:`<div class="ni-quote ni-in">${F.q}</div>`}</div>`};
RICH.ni14=niFig('madre');RICH.ni15=niFig('padre');

/* ----- 7 · Lectura profunda y sanación ----- */
RICH.ni16=()=>{const ed=st('nired','0 a 5'),cu=st('nircu','Meses'),f=st('nirf',0),h=n3clamp(st('nirh',1),0,4),H=NI_H[h];
 const fig=['Madre','Padre'][f];
 return dkH('Lectura profunda','De la lectura a la comprensión','Arma una lectura con los cuatro datos del gráfico y mira cómo se traduce en una hipótesis de trabajo.')+
 `<div class="ni" style="display:grid;gap:14px"><div class="ni-read">
  <label><small>Edad</small><input type="text" data-rsin="nired" value="${esc(ed)}" placeholder="0 a 5"></label>
  <div><small>Quién</small>${chipRow('nirf',['Madre','Padre'],f)}</div>
  <div><small>Herida y máscara</small>${chipRow('nirh',NI_H.map(x=>x.n),h)}</div>
  <label><small>Cuándo</small><input type="text" data-rsin="nircu" value="${esc(cu)}" placeholder="Meses"></label></div>
 <div class="ni-hyp ni-in"><span class="ni-tag">Lo que podría haber vivido · ${H.n} · ${H.m}</span><p>En la etapa de <mark>${esc(ed)||'…'}</mark> años, durante <mark>${esc(cu.toLowerCase())||'…'}</mark>, esa niña o ese niño ${H.hv} con su <mark>${fig.toLowerCase()}</mark>. Para protegerse aprendió a ${H.ha}.</p></div>
 <div class="dk-grid c2" style="align-items:start"><div style="display:grid;gap:8px"><div class="dk-sub">Preguntas para abrir la conversación · marca las que harías</div>${n3ck('nirq',[['chat','¿Qué pasaba en tu familia en esa etapa?'],['chat','¿Cómo reaccionas hoy cuando alguien se aleja?'],['chat','¿Qué necesitaba esa niña o ese niño?'],['chat','¿Qué puedes darte hoy que no recibiste?']])}</div>
 <div style="display:grid;gap:10px">${niBox('t','Qué se sana',H.qs)}${c4imp('La lectura es una hipótesis de trabajo que la persona confirma o descarta; no es un diagnóstico.')}</div></div>
 ${niNote('El ejemplo inicial (0 a 5 · Madre · Abandono · Meses) es un caso ficticio.')}</div>`};
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.rsin;if(k==='nired'||k==='nircu'){const p=document.querySelector('.ni-hyp mark:nth-of-type('+(k==='nired'?1:2)+')');if(p)p.textContent=k==='nircu'?e.target.value.toLowerCase():e.target.value}});
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
const NI_OR=['Amado Yo Superior, ángeles, arcángeles, seres de luz y todo mi comité espiritual: pido en este momento su presencia.','Envuélvanme en su luz, protección y amor, y acompáñenme en este encuentro con mi niño interior.','Abran mi corazón para recibir con ternura todo lo que hoy quiera mostrarse, sin juicio y sin miedo.','Ayúdenme a verlo, escucharlo y abrazarlo, a reconocer sus heridas y a darle el amor, la presencia y el cuidado que necesitó.','Que todo lo que se mueva en este espacio sea para mi mayor bien y el de todas las personas presentes, y que sane en totalidad lo que hoy esté listo para sanar.','Gracias, gracias, gracias.'];
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
