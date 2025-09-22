#!/usr/bin/env bash
set -euo pipefail

echo "🚀 ORQUESTADO4 DEF – Manus base + faltantes de otros repos..."

# 1) Entrar en proyecto
cd ~/Downloads/"Web Project TRYONYOU–ABVETOS_ React and Vite Overview" || cd ~/tryonyou-abvetos-ultra-plus-ultimatum

# 2) Actualizar repo
git fetch --all
git checkout main || git checkout -b main
git pull origin main || true

# 3) Crear estructura si falta
mkdir -p apps/web/{public/{assets,docs/claims},src/{pages,components,styles,lib}} \
         packages/shared \
         docs/{patent,merge} \
         .github/workflows

# 4) Merge-report inicial
echo "# Merge Report (orquestado4-def)" > docs/merge-report.md
echo "Fecha: $(date)" >> docs/merge-report.md
echo "" >> docs/merge-report.md

# 5) Función auxiliar: aportar archivo solo si falta
aportar_si_falta () {
  local destino="$1"
  local origen="$2"
  local contenido="$3"
  if [ -f "$destino" ]; then
    echo "✔ $destino ya existe (Manus) → respetado" >> docs/merge-report.md
  else
    echo "➕ $destino faltaba → aportado desde $origen" >> docs/merge-report.md
    mkdir -p "$(dirname "$destino")"
    cat > "$destino" <<EOF
$contenido
EOF
  fi
}

# 6) Aportar tokens
aportar_si_falta "packages/shared/design-tokens.ts" "Ultimatum" "$(cat <<'TS'
export const colors = {
  gold:'#D3B26A', peacock:'#0E6B6B', anth:'#141619',
  base:'#0B0D10', text:'#EEF0F3',
  glass:'rgba(255,255,255,.06)', glassStroke:'rgba(255,255,255,.18)'
};
export const radii = { sm:'10px', md:'16px', lg:'22px', xl:'28px' };
export const shadow = { glow:'0 0 24px rgba(211,178,106,.35)', panel:'0 20px 60px rgba(0,0,0,.45)' };
TS
)"

# 7) Aportar CSS global
aportar_si_falta "apps/web/src/styles/global.css" "Ultimatum" "$(cat <<'CSS'
:root{
  --gold:#D3B26A; --peacock:#0E6B6B; --anth:#141619; --base:#0B0D10; --text:#EEF0F3;
  --glass:rgba(255,255,255,.06); --glass-stroke:rgba(255,255,255,.18);
  font-family:Inter,Roboto,system-ui,-apple-system,Segoe UI,sans-serif;
}
html,body,#app{height:100%;margin:0;background:var(--base);color:var(--text)}
a{color:var(--gold)}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
CSS
)"

# 8) Aportar index.html y vite.config.ts
aportar_si_falta "apps/web/index.html" "Ultimatum" "$(cat <<'HTML'
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
)"

aportar_si_falta "apps/web/vite.config.ts" "Ultimatum" "$(cat <<'TS'
import { defineConfig } from 'vite';
export default defineConfig({ server:{port:5173}, preview:{port:4173} });
TS
)"

# 9) Componentes básicos
aportar_si_falta "apps/web/src/components/Navbar.tsx" "Ultimatum" 'export default function Navbar(){ return ("<nav>TRYONYOU Navbar</nav>"); }'
aportar_si_falta "apps/web/src/components/Hero.tsx" "Ultimatum" 'export default function Hero(){ return ("<section><h1>Hero</h1></section>"); }'
aportar_si_falta "apps/web/src/components/Footer.tsx" "Ultimatum" 'export default function Footer(){ return ("<footer>© TRYONYOU</footer>"); }'

# 10) Páginas
for page in home fit recommender cap abvet factory wardrobe market claims about legal contact; do
  aportar_si_falta "apps/web/src/pages/$page.tsx" "Ultimatum" "export default function ${page^}(){ return (\"<main><h1>${page^}</h1></main>\"); }"
done

# 11) main.ts router mínimo
aportar_si_falta "apps/web/src/main.ts" "Ultimatum" "$(cat <<'TS'
import './styles/global.css';
const routes:any={ '/':()=>import('./pages/home.tsx') };
async function mount(path:string){
  const mod=await (routes[path]??routes['/'])();
  const View=(await mod).default;
  document.getElementById('app')!.innerHTML=View();
}
mount(location.pathname);
TS
)"

# 12) Docs super-claims
aportar_si_falta "apps/web/public/docs/claims/README.md" "Ultimatum" "$(cat <<'MD'
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
)"

# 13) vercel.json
aportar_si_falta "vercel.json" "Ultimatum" "$(cat <<'JSON'
{
  "builds": [{ "src": "apps/web/index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/apps/web/$1" }],
  "name": "tryonyou-app",
  "alias": ["tryonyou.app", "www.tryonyou.app"]
}
JSON
)"

# 14) Workflow deploy-vercel.yml
aportar_si_falta ".github/workflows/deploy-vercel.yml" "Ultimatum" "$(cat <<'YAML'
name: deploy-vercel
on: { push: { branches: [ main ] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: cd apps/web && npm install && npx vite build
      - run: |
          npm i -g vercel@latest
          vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
          vercel deploy --prod --token "$VERCEL_TOKEN"
YAML
)"

# 15) Commit + push
git add .
git commit -m "orquestado4-def: aportar faltantes respetando Manus como base" || echo "ℹ️ Nada nuevo que commitear"
git push origin main

# 16) Deploy (local si token)
if [ -n "${VERCEL_TOKEN:-}" ]; then
  echo "🚀 Deployando directamente a tryonyou.app..."
  npx vercel --prod --token "$VERCEL_TOKEN"
else
  echo "⚠️ No hay VERCEL_TOKEN en local. El deploy se hará vía GitHub Actions."
fi

echo "🎉 Orquestado4 DEF completado. Verifica https://tryonyou.app y consulta docs/merge-report.md para ver qué se aportó."
