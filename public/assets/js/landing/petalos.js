// Petals of the placeholder mark, drawn once into the shared symbol
(function(){
  const g=document.getElementById('petals');const ns='http://www.w3.org/2000/svg';
  const outer='M0,-19 C7,-26 9,-38 0,-47 C-9,-38 -7,-26 0,-19Z';
  const add=(d,r)=>{const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('transform','rotate('+r+')');g.appendChild(p)};
  for(let i=0;i<14;i++){const r=i*360/14+360/28;if(r<22||r>338)continue;add(outer,r)}
  for(let i=0;i<10;i++){const r=i*36+18;if(r<30||r>330)continue;add('M0,-12 C4,-16 5,-23 0,-28 C-5,-23 -4,-16 0,-12Z',r)}
})();
