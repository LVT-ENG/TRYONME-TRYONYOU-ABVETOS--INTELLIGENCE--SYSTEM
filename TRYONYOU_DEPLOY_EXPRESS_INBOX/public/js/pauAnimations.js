export function initPau(canvasId='pau-canvas'){
  const el=document.getElementById(canvasId); if(!el) return;
  el.innerHTML='🦚 Pau está cargando animaciones…';
  let i=0; const frames=['🦚','🦚✨','🦚','🦚💫'];
  setInterval(()=>{ el.textContent=frames[i++%frames.length]; }, 600);
}
