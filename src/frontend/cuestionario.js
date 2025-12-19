const form = document.getElementById('tryon-form');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  await fetch('/api/questionnaire', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  alert('Thanks! Your preferences were saved.');
  const u = new URL('/tienda.html', location.origin);
  if(data.style) u.searchParams.set('style', data.style);
  location.href = u.toString();
});
