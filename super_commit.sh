#!/bin/bash
set -e

echo "🦚 TRYONYOU — SuperCommit SAFE MODE"

# Guardas básicas
if [ ! -f "package.json" ]; then
  echo "❌ Ejecuta desde la raíz del repo"
  exit 1
fi

# Confirmación explícita para limpieza
read -p "⚠️ Limpieza destructiva (node_modules/dist). ¿Continuar? (y/N): " confirm
[[ "$confirm" == "y" ]] || exit 1

# Rama
git checkout main
git pull origin main

# Limpieza controlada
rm -rf node_modules dist 2>/dev/null || true

# Dependencias
npm install

# Estructura mínima
mkdir -p docs/arquitectura_empresa docs/patent_EPCT docs/investor_edition
mkdir -p public/assets/{hero,modules,investor,vision}
mkdir -p src/{modules,components,pages}

# Staging selectivo
git add src public docs scripts || true
git add package.json package-lock.json vite.config.js vercel.json index.html
git add .env.example README.md CHANGELOG.md

# Commit (si hay cambios)
git commit -m "chore(repo): consolidate architecture + docs" || echo "ℹ️ Sin cambios"

# Push (deploy lo hace CI)
git push origin main

echo "✅ Push realizado. El deploy se ejecuta vía GitHub Actions."
