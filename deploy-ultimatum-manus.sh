#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Integrando Manus como base + aportando faltantes (TRYONYOU–ULTIMATUM)..."

# 1) Entrar a carpeta del proyecto (ajusta si usas otra ruta)
cd ~/Downloads/"Web Project TRYONYOU–ABVETOS_ React and Vite Overview" || cd ~/tryonyou-abvetos-ultra-plus-ultimatum

# 2) Actualizar repo base (Manus)
git fetch --all
git checkout main || git checkout -b main
git pull origin main || true

# 3) Estructura mínima (no rompe si ya existe)
mkdir -p apps/web/{public/{assets,docs/claims},src/{pages,components,styles,lib}} \
         packages/shared \
         docs/{patent,merge} \
         .github/workflows

# 4) Tokens de marca (solo si faltan)
[ -f packages/shared/design-tokens.ts ] || cat > packages/shared/design-tokens.ts <<'TS'
export const colors = {
  gold:'#D3B26A', peacock:'#0E6B6B', anth:'#141619',
  base:'#0B0D10', text:'#EEF0F3',
  glass:'rgba(255,255,255,.06)', glassStroke:'rgba(255,255,255,.18)'
};
export const radii = { sm:'10px', md:'16px', lg:'22px', xl:'28px' };
export const shadow = { glow:'0 0 24px rgba(211,178,106,.35)', panel:'0 20px 60px rgba(0,0,0,.45)' };
TS

# 5) CSS global
[ -f apps/web/src/styles/global.css ] || cat > apps/web/src/styles/global.css <<'CSS'
:root{
  --gold:#D3B26A; --peacock:#0E6B6B; --anth:#141619; --base:#0B0D10; --text:#EEF0F3;
  --glass:rgba(255,255,255,.06); --glass-stroke:rgba(255,255,255,.18);
  font-family:Inter,Roboto,system-ui,-apple-system,Segoe UI,sans-serif;
}
html,body,#app{height:100%;margin:0;background:var(--base);color:var(--text)}
a{color:var(--gold)}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
CSS

# 6) index.html + vite.config.ts
[ -f apps/web/index.html ] || cat > apps/web/index.html <<'HTML'
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>TRYONYOU — Ultimatum</title>
</head>
<body>
  <div id="nav"></div>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
HTML

[ -f apps/web/vite.config.ts ] || cat > apps/web/vite.config.ts <<'TS'
import { defineConfig } from 'vite';
export default defineConfig({ server:{port:5173}, preview:{port:4173} });
TS

# 7) Componentes básicos (si no están en Manus)
[ -f apps/web/src/components/Navbar.tsx ] || cat > apps/web/src/components/Navbar.tsx <<'TSX'
export default function Navbar(){ return ("<nav>TRYONYOU Navbar</nav>"); }
TSX
[ -f apps/web/src/components/Hero.tsx ] || cat > apps/web/src/components/Hero.tsx <<'TSX'
export default function Hero(){ return ("<section><h1>Hero</h1></section>"); }
TSX
[ -f apps/web/src/components/Footer.tsx ] || cat > apps/web/src/components/Footer.tsx <<'TSX'
export default function Footer(){ return ("<footer>© TRYONYOU</footer>"); }
TSX

# 8) Páginas (se crean solo si faltan)
for page in home fit recommender cap abvet factory wardrobe market claims about legal contact; do
  [ -f apps/web/src/pages/$page.tsx ] || cat > apps/web/src/pages/$page.tsx <<TSX
export default function ${page^}(){ return ("<main><h1>${page^}</h1></main>"); }
TSX
done

# 9) main.ts router (si falta)
[ -f apps/web/src/main.ts ] || cat > apps/web/src/main.ts <<'TS'
import './styles/global.css';
const routes:any={ '/':()=>import('./pages/home.tsx') };
async function mount(path:string){
  const mod=await (routes[path]??routes['/'])();
  const View=(await mod).default;
  document.getElementById('app')!.innerHTML=View();
}
mount(location.pathname);
TS

# 10) Docs super-claims
[ -f apps/web/public/docs/claims/README.md ] || cat > apps/web/public/docs/claims/README.md <<'MD'
# 8 Super-Claims
1) Avatar 3D paramétrico
2) Fit-score objetivo
3) Simulación textil realista
4) PAU + FTT en tiempo real
5) CAP Auto-Production
6) Pago dual ABVET (iris + voz)
7) Orquestación JIT
8) Sistema embebible + versionado Git
MD

# 11) vercel.json
[ -f vercel.json ] || cat > vercel.json <<'JSON'
{
  "builds": [{ "src": "apps/web/index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/apps/web/$1" }],
  "name": "tryonyou-app",
  "alias": ["tryonyou.app", "www.tryonyou.app"]
}
JSON

# 12) Workflow deploy-vercel.yml
[ -f .github/workflows/deploy-vercel.yml ] || cat > .github/workflows/deploy-vercel.yml <<'YAML'
name: deploy-vercel
on: { push: { branches: [ main ] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: cd apps/web && npm install && npm run build
      - run: |
          npm i -g vercel@latest
          vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
          vercel deploy --prod --token "$VERCEL_TOKEN"
YAML

# 13) Commit + push
git add .
git commit -m "chore: integrar faltantes sobre base Manus para TRYONYOU–ULTIMATUM" || echo "ℹ️ Nada nuevo que commitear"
git push origin main

# 14) Deploy (local si token disponible)
if [ -n "${VERCEL_TOKEN:-}" ]; then
  echo "🚀 Deployando directamente a tryonyou.app..."
  npx vercel --prod --token "$VERCEL_TOKEN"
else
  echo "⚠️ No hay VERCEL_TOKEN local. El deploy se hará vía GitHub Actions automáticamente."
fi

echo "🎉 Integración completada. Verifica en https://tryonyou.app"
