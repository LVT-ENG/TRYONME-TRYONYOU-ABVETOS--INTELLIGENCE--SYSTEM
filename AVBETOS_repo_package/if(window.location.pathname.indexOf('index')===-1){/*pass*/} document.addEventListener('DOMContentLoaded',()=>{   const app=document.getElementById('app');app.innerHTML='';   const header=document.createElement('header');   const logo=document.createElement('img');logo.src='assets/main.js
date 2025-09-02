if(window.location.pathname.indexOf('index')===-1){/*pass*/}
document.addEventListener('DOMContentLoaded',()=>{
  const app=document.getElementById('app');app.innerHTML='';
  const header=document.createElement('header');
  const logo=document.createElement('img');logo.src='assets/logo_final.png';logo.className='logo';
  header.appendChild(logo);
  const nav=document.createElement('nav');const ul=document.createElement('ul');
  ['Sobre','Funcionalidades','TryOnYou','Contacto'].forEach(t=>{const li=document.createElement('li');const a=document.createElement('a');a.href='#';a.innerText=t;li.appendChild(a);ul.appendChild(li)})
  nav.appendChild(ul);header.appendChild(nav);app.appendChild(header);
  const heroMount=document.createElement('div');heroMount.id='hero-mount';heroMount.className='hero container';app.appendChild(heroMount);
  const featuresMount=document.createElement('div');featuresMount.id='features-mount';featuresMount.className='container features';app.appendChild(featuresMount);
  const tryMount=document.createElement('div');tryMount.id='try-mount';tryMount.className='container';app.appendChild(tryMount);
  const contactMount=document.createElement('div');contactMount.id='contact-mount';contactMount.className='contact container';app.appendChild(contactMount);
  const footer=document.createElement('div');footer.className='footer';footer.innerHTML='© '+new Date().getFullYear()+' TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM';app.appendChild(footer);
  if(window.TryOnYouFullRevampInit)TryOnYouFullRevampInit({heroMount,featuresMount,tryMount,contactMount});
  if(window.TryOnYouHeroInit)TryOnYouHeroInit(document.getElementById('hero-mount'));
  if(window.TryOnYouVirtuallyInit)TryOnYouVirtuallyInit(document.getElementById('try-mount'));
  if(window.TryOnYouFeaturesInit)TryOnYouFeaturesInit(document.getElementById('features-mount'));
  if(window.TryOnYouContactInit)TryOnYouContactInit(document.getElementById('contact-mount'));
});
