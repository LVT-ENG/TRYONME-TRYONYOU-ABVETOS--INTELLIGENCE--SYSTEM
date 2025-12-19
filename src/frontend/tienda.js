async function load(){
  const style = new URL(location.href).searchParams.get('style') || '';
  const res = await fetch('/api/pau?style='+encodeURIComponent(style));
  const items = await res.json();
  const grid = document.getElementById('grid');
  grid.innerHTML = items.map(i => `
    <div class="card">
      <img src="${i.img}" alt="${i.name}" />
      <h3>${i.name}</h3>
      <p>Style: ${i.style} • Fit score: ${(i.score*100|0)/100}</p>
      <button class="btn" data-src="${i.img}">Add to Mockups</button>
    </div>`).join('');
  grid.addEventListener('click', e=>{
    const btn = e.target.closest('button[data-src]');
    if(!btn) return;
    const src = btn.getAttribute('data-src');
    const list = JSON.parse(localStorage.getItem('mockups')||'[]');
    list.push(src);
    localStorage.setItem('mockups', JSON.stringify(list));
    btn.textContent = 'Added ✓';
  });
}
load();
