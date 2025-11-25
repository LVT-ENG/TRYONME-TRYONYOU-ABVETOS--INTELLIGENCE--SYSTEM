setup-dev-environment.mjs
#!/usr/bin/env node
/**
 * TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
 * Dev Environment Bootstrap Script
 * Configura entorno, extensiones y automatizaciones clave
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

console.log("🚀 Iniciando configuración del entorno ABVETOS...");

// --- 1️⃣ Dependencias esenciales del proyecto ---
const devDependencies = [
  "vite@7.1.2",
  "eslint",
  "prettier",
  "stylelint",
  "lighthouse",
  "playwright",
  "axe-core",
  "web-vitals",
  "dotenv",
  "concurrently",
  "cross-env",
  "postcss",
  "autoprefixer"
];

// --- 2️⃣ Extensiones recomendadas (modo local, se lanzan en navegador) ---
const chromeExtensions = [
  "fmkadmapgofadopljbjfkapdkoienihi", // React Developer Tools
  "lmhkpmbekcpmknklioeibfkpmmfibljd", // Redux DevTools
  "cjpalhdlnbpafiamejdnhcphjbkeiagm", // uBlock Origin
  "ghbmnnjooekpmoecnnnilnnbdlolhkhi", // Google Docs Offline (para testing storage)
  "pnddljadjiibdbanhcieeaihdpjpeohh", // Lighthouse
  "aicmkgpgakddgnaphhhpliifpcfhicfo", // ColorZilla
  "fbcohnmimjicjdomonkcbcpbpnhggkip", // WhatFont
  "hgmloofddffdnphfgcellkdfbfbjeloo"  // JSONVue
];

// --- 3️⃣ Automatizaciones internas ABVETOS ---
const workflows = [
  {
    file: ".github/workflows/abvetos-lighthouse.yml",
    content: `
name: 🔍 Lighthouse CI
on:
  push:
    branches: [ main ]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install deps
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Run Lighthouse
        run: npx lighthouse --output=json --output-path=./reports/lh-report.json --quiet http://localhost:4173
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-report
          path: ./reports/lh-report.json
`
  },
  {
    file: ".github/workflows/abvetos-a11y.yml",
    content: `
name: ♿ Accessibility Audit
on:
  push:
    branches: [ main ]
jobs:
  axe-core-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Axe
        run: npm i -g axe-core playwright
      - name: Run accessibility audit
        run: npx playwright test --project=chromium --reporter=list
`
  }
];

// --- 4️⃣ Crear archivos de configuración ---
function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log(`✅ Creado: ${filePath}`);
}

// --- 5️⃣ Ejecutar instalación ---
console.log("📦 Instalando dependencias...");
execSync(`npm install -D ${devDependencies.join(" ")}`, { stdio: "inherit" });

// --- 6️⃣ Crear Workflows ---
console.log("⚙️ Creando workflows automáticos...");
for (const wf of workflows) createFile(wf.file, wf.content);

// --- 7️⃣ Crear scripts base ---
const pkgPath = "./package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

pkg.scripts ||= {};
Object.assign(pkg.scripts, {
  dev: "vite",
  build: "vite build",
  preview: "vite preview",
  lint: "eslint src --ext .js,.jsx,.ts,.tsx",
  format: "prettier --write .",
  "audit:accessibility": "axe http://localhost:5173",
  "audit:performance": "npx lighthouse http://localhost:5173 --view"
});

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("🧩 Scripts añadidos a package.json");

// --- 8️⃣ Mostrar instrucciones finales ---
console.log(`
✅ Entorno TRYONYOU listo.

🧠 Incluye:
- Vite 7.1.2 + Prettier + ESLint + Stylelint
- Lighthouse y Axe automatizados (GitHub Actions)
- Web Vitals integrado
- Extensiones Chrome sugeridas (instala manualmente desde IDs si lo deseas)
- Scripts rápidos:
    npm run dev
    npm run audit:performance
    npm run audit:accessibility
`);

console.log(`
🧠 Recomendado:
chrome://extensions/?id=${chromeExtensions.join(",")}
`);
