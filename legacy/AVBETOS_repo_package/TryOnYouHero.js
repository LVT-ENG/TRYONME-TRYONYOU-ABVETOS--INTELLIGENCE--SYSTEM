window.TryOnYouHeroInit=function(mount){
  if(!mount)mount=document.getElementById('hero-mount');
  mount.innerHTML='';
  const box=document.createElement('div');box.className='hero';
  const img=document.createElement('img');img.className='hero-img';img.src='assets/hero_final_clean.png';
  const overlay=document.createElement('div');overlay.style.position='relative';
  const txt=document.createElement('div');txt.innerText='TRYONYOU – La experiencia reinventada';txt.style.position='absolute';txt.style.bottom='20px';txt.style.left='50%';txt.style.transform='translateX(-50%)';txt.style.color='#fff';txt.style.fontSize='22px';txt.style.fontWeight='700';txt.style.textShadow='0 0 12px rgba(0,0,0,0.8)';
  overlay.appendChild(img);overlay.appendChild(txt);box.appendChild(overlay);mount.appendChild(box);
  const srcs=['assets/hero_final_clean.png','assets/hero_alt1.png','assets/hero_alt2.png'];let i=0;
  setInterval(()=>{i=(i+1)%srcs.length;img.style.opacity=0;setTimeout(()=>{img.src=srcs[i];img.style.opacity=1},700)},12000);
};
