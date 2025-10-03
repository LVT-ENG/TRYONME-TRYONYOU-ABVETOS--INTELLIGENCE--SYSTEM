// generate-deploy-zip.js
// Script para generar el ZIP definitivo de TRYONYOU.app listo para Deploy Express

const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

const outDir = path.join(__dirname, "tryonyou-deploy");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ============================
// index.html
// ============================
fs.writeFileSync(path.join(outDir, "index.html"), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TRYONYOU – Premium Futuristic</title>
  <link rel="stylesheet" href="/theme.css" />
</head>
<body>
  <div id="root"></div>
  <canvas id="sparkleCanvas"></canvas>
  <script type="module" src="/src/App.tsx"></script>
  <script src="/sparkles.js"></script>
</body>
</html>`);

// ============================
// theme.css
// ============================
fs.writeFileSync(path.join(outDir, "theme.css"), `
:root {
  --color-bg: #141619;        /* antracita */
  --color-text: #F5EFE6;      /* hueso */
  --color-accent: #0E6B6B;    /* pavo real */
  --color-premium: #D3B26A;   /* oro */
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  color: var(--color-text);
  text-shadow: 0 0 14px rgba(211,178,106,0.9);
  z-index: 2;
  position: relative;
}

.button-premium {
  margin-top: 20px;
  padding: 14px 28px;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-premium), var(--color-accent));
  color: var(--color-text);
  box-shadow: 0 0 16px rgba(211,178,106,0.7);
  transition: all 0.3s ease-in-out;
  z-index: 2;
  position: relative;
}
.button-premium:hover {
  box-shadow: 0 0 28px rgba(211,178,106,1);
  transform: scale(1.07);
}
`);

// ============================
// sparkles.js (Canvas animado)
// ============================
fs.writeFileSync(path.join(outDir, "sparkles.js"), `
const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Sparkle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.color = Math.random() > 0.5 
      ? "rgba(211,178,106,0.8)"  // oro
      : "rgba(14,107,107,0.8)";  // pavo real
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const sparkles = Array.from({ length: 80 }, () => new Sparkle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparkles.forEach(s => { s.update(); s.draw(); });
  requestAnimationFrame(animate);
}
animate();
`);

// ============================
// src/App.tsx
// ============================
const srcDir = path.join(outDir, "src");
if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);

fs.writeFileSync(path.join(srcDir, "App.tsx"), `
import React from 'react';
import './i18n';
import '../theme.css';

function App() {
  const userLang = navigator.language || 'en';
  return (
    <div>
      <h1>TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM</h1>
      <p>Idioma detectado: {userLang}</p>
      <button className="button-premium">Explorar</button>
    </div>
  );
}
export default App;
`);

// ============================
// src/i18n.ts
// ============================
fs.writeFileSync(path.join(srcDir, "i18n.ts"), `
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { "welcome": "Welcome to TRYONYOU" }},
    es: { translation: { "welcome": "Bienvenido a TRYONYOU" }},
    fr: { translation: { "welcome": "Bienvenue chez TRYONYOU" }},
  },
  lng: navigator.language.split('-')[0],
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
`);

// ============================
// vite.config.js
// ============================
fs.writeFileSync(path.join(outDir, "vite.config.js"), `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
});
`);

// ============================
// package.json
// ============================
fs.writeFileSync(path.join(outDir, "package.json"), `
{
  "name": "tryonyou-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-i18next": "^13.0.0",
    "i18next": "^23.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "7.1.2",
    "puppeteer": "^21.5.0",
    "tsparticles": "^3.0.0"
  }
}
`);

// ============================
// Workflow
// ============================
const workflowDir = path.join(outDir, ".github", "workflows");
fs.mkdirSync(workflowDir, { recursive: true });

fs.writeFileSync(path.join(workflowDir, "deploy.yml"), `name: Deploy Express Auto Ultimate
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: rm -rf node_modules && npm ci
      - run: npm run build
      - run: |
          URL=$(npx vercel --prod --token=\${{ secrets.VERCEL_TOKEN }} --confirm)
          echo "deploy_url=$URL" >> $GITHUB_ENV
      - run: |
          sudo apt-get update
          sudo apt-get install -y wget unzip fontconfig libx11-6 libx11-xcb1 libxcomposite1 \
            libxcursor1 libxdamage1 libxi6 libxext6 libxfixes3 libxrandr2 libgbm1 libgtk-3-0 \
            libnss3 libasound2 ca-certificates fonts-liberation
          npm install puppeteer --save-dev
      - run: |
          node <<'EOF'
          const puppeteer = require('puppeteer');
          (async () => {
            const url = process.env.deploy_url || "https://tryonyou.app";
            const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
            const page = await browser.newPage();
            await page.setViewport({ width: 1440, height: 900 });
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: 'screenshot-desktop.png' });
            await page.setViewport({ width: 390, height: 844, isMobile: true });
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: 'screenshot-mobile.png' });
            await browser.close();
          })();
          EOF
      - run: |
          COMMIT_MSG=$(git log -1 --pretty=%B)
          URL=\${{ env.deploy_url }}
          curl -s -X POST "https://api.telegram.org/bot\${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
            -d "chat_id=\${{ secrets.TELEGRAM_CHAT_ID }}" \
            -d "text=🚀 Deploy TRYONYOU\n🌍 $URL\n📝 $COMMIT_MSG"
          curl -s -X POST "https://api.telegram.org/bot\${{ secrets.TELEGRAM_BOT_TOKEN }}/sendPhoto" \
            -F chat_id=\${{ secrets.TELEGRAM_CHAT_ID }} -F photo=@screenshot-desktop.png
          curl -s -X POST "https://api.telegram.org/bot\${{ secrets.TELEGRAM_BOT_TOKEN }}/sendPhoto" \
            -F chat_id=\${{ secrets.TELEGRAM_CHAT_ID }} -F photo=@screenshot-mobile.png
`);

// ============================
// Crear ZIP
// ============================
const output = fs.createWriteStream(path.join(__dirname, "tryonyou-deploy.zip"));
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`✅ ZIP generado: tryonyou-deploy.zip (${archive.pointer()} bytes)`);
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(outDir, false);
archive.finalize();
