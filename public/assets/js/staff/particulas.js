// Partículas de fondo del login (las mismas del login de las alumnas); se detienen al entrar al portal
(function(){
  const box=document.getElementById('login'),cv=document.getElementById('particles'),ctx=cv.getContext('2d');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const size=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener('resize',size);size();
  const ps=Array.from({length:innerWidth<640?220:450},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,s:Math.random()*1.5+.5,seed:Math.random()}));
  (function tick(){
    if(box.hidden)return;
    ctx.clearRect(0,0,cv.width,cv.height);const t=Date.now()*.001;
    for(const p of ps){
      if(!reduce){p.x+=p.vx+Math.sin(t+p.seed*10)*.2;p.y+=p.vy+Math.cos(t+p.seed*10)*.2}
      if(p.x<0)p.x=cv.width;if(p.x>cv.width)p.x=0;if(p.y<0)p.y=cv.height;if(p.y>cv.height)p.y=0;
      ctx.fillStyle='rgba(168,85,247,'+(.1+p.seed*.3)+')';ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
})();
