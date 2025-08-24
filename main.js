const form = document.querySelector('#lead-form');
const btn = document.querySelector('#lead-submit');
const statusEl = document.querySelector('#lead-status');
form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.textContent = '';
  btn.disabled = true;
  try{
    const fd = new FormData(form);
    const r = await fetch('/mailer.php', { method:'POST', body: fd });
    const j = await r.json();
    if(j.ok){ statusEl.textContent = '¡Gracias! Te hemos contactado.'; form.reset(); }
    else { statusEl.textContent = 'No se pudo enviar. Intenta de nuevo.'; }
  }catch(err){
    statusEl.textContent = 'Error de conexión.';
  }finally{
    btn.disabled = false;
  }
});
