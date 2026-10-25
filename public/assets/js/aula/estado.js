/* ---------- state ---------- */
let PAYMENTS=[];
const STP={none:'<span class="pill lock">Sin plan</span>',ok:'<span class="pill done">Al día</span>',full:'<span class="pill done">Pagado completo</span>',retry:'<span class="pill prog">Reintentando cobro</span>',overdue:'<span class="pill bad">Pago pendiente</span>',paused:'<span class="pill bad">Acceso pausado</span>'};
let ME={name:'',ini:'',c:'#f2c66d',photo:''};
const S={overdue:false,plan:'none',paying:false,lvl:0,lvls:new Set(),view:'inicio',level:'radiestesia',lesson:[1,0],tab:'temas',ch:'n3',resType:'Todos',resLvl:'0',resQ:'',supTopic:'clases',openMods:{},playing:false,t:0,notes:{},qa:{},sent:false,sl:{},anim:0};
const NAV=[
 ['inicio','Inicio','<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>'],
 ['formacion','Mi formación','<path d="M3 8 12 4l9 4-9 4z"/><path d="M7 10v5c3 2 7 2 10 0v-5"/>'],
 ['insignias','Insignias','<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/>'],
 ['comunidad','Comunidad','<path d="M4 5h16v11H9l-5 4z"/>'],
 ['calendario','Calendario','<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'],
 ['recursos','Recursos','<path d="M5 4h10l4 4v12H5z"/><path d="M14 4v5h5"/>'],
 ['trabaja','Trabaja con nosotras','<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'],
 ['pagos','Mis pagos','<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'],
 ['soporte','Soporte','<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>'],
 ['maestra','Portal de la Maestra','<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>']
];
