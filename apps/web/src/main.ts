import './styles/global.css';
const routes:any={ '/':()=>import('./pages/home.tsx') };
async function mount(path:string){
  const mod=await (routes[path]??routes['/'])();
  const View=(await mod).default;
  document.getElementById('app')!.innerHTML=View();
}
mount(location.pathname);