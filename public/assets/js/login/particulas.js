/* Partículas de fondo (mismas que Udreamms: 450 puntos blancos a la deriva) */
(function(){
  const cv=document.getElementById('particles'),ctx=cv.getContext('2d',{alpha:true});
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ps=[];
  const size=()=>{cv.width=innerWidth;cv.height=innerHeight};
  addEventListener('resize',size);size();
  const N=innerWidth<640?220:450;
  ps=Array.from({length:N},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,s:Math.random()*1.5+.5,seed:Math.random()}));
  (function tick(){
    ctx.clearRect(0,0,cv.width,cv.height);
    const t=Date.now()*.001;
    for(const p of ps){
      if(!reduce){p.x+=p.vx+Math.sin(t+p.seed*10)*.2;p.y+=p.vy+Math.cos(t+p.seed*10)*.2}
      if(p.x<0)p.x=cv.width;if(p.x>cv.width)p.x=0;if(p.y<0)p.y=cv.height;if(p.y>cv.height)p.y=0;
      ctx.fillStyle='rgba(255,255,255,'+(.1+p.seed*.3)+')';
      ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
})();
