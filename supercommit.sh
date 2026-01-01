#!/bin/bash
set -e

echo "🦚 TRYONYOU — SuperCommit SAFE MODE"

# Guardas básicas
if [ ! -f "package.json" ]; then
  echo "❌ Ejecuta desde la raíz del repo"
  exit 1
fi

# Mensaje de commit (argumento o default)
COMMIT_MSG="${1:-chore(repo): consolidate architecture + docs}"

# Confirmación explícita para limpieza (skip si FORCE=true)
if [ "$FORCE" != "true" ]; then
    read -p "⚠️ Limpieza destructiva (node_modules/dist). ¿Continuar? (y/N): " confirm
    [[ "$confirm" == "y" ]] || exit 1
fi

# Rama
# git checkout main
# git pull origin main
# Comentado para permitir ejecución en rama actual (chore/supercommit...)

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
git add .env.example README.md CHANGELOG.md .github/workflows/schedule_deploy.yml .jules/bolt.md supercommit.sh

# Commit (si hay cambios)
git commit -m "$COMMIT_MSG" || echo "ℹ️ Sin cambios"

# Push (deploy lo hace CI)
# git push origin main
# Adaptado para usar la rama actual
CURRENT_BRANCH=$(git branch --show-current)
git push origin "$CURRENT_BRANCH"

echo "✅ Push realizado a $CURRENT_BRANCH. El deploy se ejecuta vía GitHub Actions."
