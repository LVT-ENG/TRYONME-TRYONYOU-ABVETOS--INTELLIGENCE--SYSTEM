const heroContainer = document.createElement('div');
heroContainer.style.position = 'relative';
heroContainer.style.width = '100%';
heroContainer.style.maxWidth = '900px';
heroContainer.style.margin = '50px auto';
heroContainer.style.borderRadius = '15px';
heroContainer.style.overflow = 'hidden';
heroContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';

const heroImgs = ['assets/hero_final_clean.png','assets/hero_alt1.png','assets/hero_alt2.png'];
let heroIndex = 0;

const heroImg = document.createElement('img');
heroImg.src = heroImgs[heroIndex];
heroImg.style.width = '100%';
heroImg.style.transition = 'opacity 0.8s ease-in-out';
heroContainer.appendChild(heroImg);

const heroText = document.createElement('div');
heroText.innerText = 'TRYONYOU – La experiencia reinventada';
heroText.style.position = 'absolute';
heroText.style.bottom = '20px';
heroText.style.width = '100%';
heroText.style.textAlign = 'center';
heroText.style.fontSize = '22px';
heroText.style.color = '#fff';
heroText.style.fontWeight = '700';
heroText.style.textShadow = '0 0 10px rgba(0,0,0,0.8)';
heroContainer.appendChild(heroText);

document.body.appendChild(heroContainer);

// Rotación automática de hero images
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImgs.length;
  heroImg.style.opacity = 0;
  setTimeout(() => {
    heroImg.src = heroImgs[heroIndex];
    heroImg.style.opacity = 1;
  }, 800);
}, 12000);

// Animación sutil del texto
let blink = true;
setInterval(() => {
  heroText.style.opacity = blink ? '1' : '0.85';
  blink = !blink;
}, 1000);
