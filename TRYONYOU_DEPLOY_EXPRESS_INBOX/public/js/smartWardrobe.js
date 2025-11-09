export function initWardrobe(rootId='wardrobe'){
  const root=document.getElementById(rootId); if(!root) return;
  const items=['👖 Pantalón Slim','👔 Camisa Entallada','🧥 Blazer','👗 Dress','👟 Sneakers','🥿 Flats','🧣 Scarf','🧥 Overcoat'];
  items.forEach(label=>{
    const d=document.createElement('div'); d.className='slot'; d.textContent=label; root.appendChild(d);
  });
}
