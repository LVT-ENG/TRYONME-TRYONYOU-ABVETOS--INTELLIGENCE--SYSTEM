const container = document.createElement('div');
container.style.position = 'relative';
container.style.textAlign = 'center';
container.style.width = '100%';
container.style.maxWidth = '600px';
container.style.margin = '40px auto';

const modelImg = document.createElement('img');
modelImg.src = 'assets/model_tryonyou.png'; // reemplaza con tu imagen real
modelImg.style.width = '100%';
modelImg.style.borderRadius = '12px';
container.appendChild(modelImg);

const textOverlay = document.createElement('div');
textOverlay.innerText = 'TryOnYou Virtually';
textOverlay.style.position = 'absolute';
textOverlay.style.bottom = '20px'; // texto debajo de la modelo
textOverlay.style.width = '100%';
textOverlay.style.fontSize = '18px'; // más pequeño
textOverlay.style.color = '#fff';
textOverlay.style.fontWeight = '600';
textOverlay.style.textShadow = '0px 0px 5px rgba(0,0,0,0.7)';
container.appendChild(textOverlay);

document.body.appendChild(container);
