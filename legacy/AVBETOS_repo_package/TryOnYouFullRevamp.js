// Container principal
const mainContainer = document.createElement('div');
mainContainer.style.fontFamily = "'Poppins', sans-serif";
mainContainer.style.color = '#111';
mainContainer.style.backgroundColor = '#fff';
mainContainer.style.width = '100%';
mainContainer.style.margin = '0';
mainContainer.style.padding = '0';
document.body.innerHTML = '';
document.body.appendChild(mainContainer);

// Header
const header = document.createElement('header');
header.style.display = 'flex';
header.style.justifyContent = 'space-between';
header.style.alignItems = 'center';
header.style.padding = '20px';
header.style.backgroundColor = '#050505';
const logo = document.createElement('img');
logo.src = 'assets/logo_final.png';
logo.style.height = '50px';
header.appendChild(logo);
const nav = document.createElement('nav');
const ul = document.createElement('ul');
ul.style.display = 'flex';
ul.style.listStyle = 'none';
ul.style.gap = '20px';
['Sobre', 'Funcionalidades', 'Contacto'].forEach(text => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = '#';
  a.innerText = text;
  a.style.color = '#fff';
  a.style.textDecoration = 'none';
  a.style.fontWeight = '600';
  li.appendChild(a);
  ul.appendChild(li);
});
nav.appendChild(ul);
header.appendChild(nav);
mainContainer.appendChild(header);

// Hero
const heroSection = document.createElement('section');
heroSection.style.textAlign = 'center';
heroSection.style.padding = '60px 20px';
heroSection.style.backgroundColor = '#f5f5f5';
const heroImg = document.createElement('img');
heroImg.src = 'assets/hero_final_clean.png';
heroImg.style.width = '80%';
heroImg.style.borderRadius = '12px';
heroSection.appendChild(heroImg);
const heroText = document.createElement('h1');
heroText.innerText = 'La experiencia de compra reinventada';
heroText.style.color = '#1a1a1a';
heroText.style.fontSize = '2.5rem';
heroSection.appendChild(heroText);
const heroDesc = document.createElement('p');
heroDesc.innerText = 'TRYONYOU te asegura que cada prenda que elijas te quedará perfecta, cada vez.';
heroSection.appendChild(heroDesc);
const heroBtn = document.createElement('button');
heroBtn.innerText = 'Probar Ahora';
heroBtn.style.padding = '15px 40px';
heroBtn.style.fontWeight = 'bold';
heroBtn.style.fontSize = '1rem';
heroBtn.style.backgroundColor = '#ff2e63';
heroBtn.style.color = '#fff';
heroBtn.style.border = 'none';
heroBtn.style.borderRadius = '8px';
heroBtn.style.cursor = 'pointer';
heroBtn.addEventListener('mouseover', () => heroBtn.style.backgroundColor = '#e52b58');
heroBtn.addEventListener('mouseout', () => heroBtn.style.backgroundColor = '#ff2e63');
heroBtn.addEventListener('click', () => alert('Bienvenido a TRYONYOU – tu prueba virtual comienza ahora.'));
heroSection.appendChild(heroBtn);
mainContainer.appendChild(heroSection);

// Features dinámicas
const featuresSection = document.createElement('section');
featuresSection.style.padding = '60px 20px';
featuresSection.style.textAlign = 'center';
const featuresTitle = document.createElement('h2');
featuresTitle.innerText = 'Funcionalidades Clave';
featuresSection.appendChild(featuresTitle);
const featuresList = document.createElement('ul');
featuresList.style.listStyle = 'none';
featuresList.style.padding = '0';
['Prueba virtual en tiempo real','Recomendaciones de estilo personalizadas','Integración con tu armario y devoluciones automáticas','Conectado con FTT para tendencias en tiempo real'].forEach(f => {
  const li = document.createElement('li');
  li.innerText = f;
  li.style.margin = '15px 0';
  li.style.fontSize = '1.2rem';
  featuresList.appendChild(li);
});
featuresSection.appendChild(featuresList);
mainContainer.appendChild(featuresSection);

// Contact
const contactSection = document.createElement('section');
contactSection.style.padding = '40px 20px';
contactSection.style.textAlign = 'center';
contactSection.style.backgroundColor = '#050505';
contactSection.style.color = '#fff';
const contactTitle = document.createElement('h2');
contactTitle.innerText = 'Contacto';
contactSection.appendChild(contactTitle);
const contactEmail = document.createElement('p');
contactEmail.innerText = 'Email: contacto@tryonyou.app';
contactSection.appendChild(contactEmail);
mainContainer.appendChild(contactSection);

// Rotación automática de hero images
const heroImages = ['assets/hero_final_clean.png','assets/hero_alt1.png','assets/hero_alt2.png'];
let index = 0;
setInterval(() => {
  index = (index + 1) % heroImages.length;
  heroImg.src = heroImages[index];
}, 10000);

// Texto animado en hero
let heroBlink = true;
setInterval(() => {
  heroText.style.opacity = heroBlink ? '1' : '0.8';
  heroBlink = !heroBlink;
}, 1000);
