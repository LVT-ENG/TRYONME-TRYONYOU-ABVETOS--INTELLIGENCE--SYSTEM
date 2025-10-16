#!/usr/bin/env bash
set -e

# ========================================
# TRYONYOU - Auto Version & Deploy Script
# ========================================
# Uso:
#   ./scripts/auto-version-deploy.sh patch   # Para cambios pequeños (1.0.0 -> 1.0.1)
#   ./scripts/auto-version-deploy.sh minor   # Para nuevas features (1.0.0 -> 1.1.0)
#   ./scripts/auto-version-deploy.sh major   # Para cambios grandes (1.0.0 -> 2.0.0)

RELEASE_TYPE=${1:-patch}

echo "🚀 TRYONYOU - Auto Version & Deploy"
echo "===================================="
echo ""

# 1. Verificar que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  No estás en la rama main. Cambiando a main..."
  git checkout main
  git pull origin main
fi

# 2. Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  Hay cambios sin commitear. Por favor, commitea o descarta los cambios primero."
  git status --short
  exit 1
fi

# 3. Ejecutar standard-version para generar changelog y bump version
echo "📝 Generando changelog y actualizando versión ($RELEASE_TYPE)..."
npm run release:$RELEASE_TYPE

# 4. Obtener la nueva versión
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ Nueva versión: v$NEW_VERSION"

# 5. Build de producción
echo "🔨 Generando build de producción..."
npm run build

# 6. Verificar que el build fue exitoso
if [ ! -d "dist" ]; then
  echo "❌ Error: El directorio dist no existe. Build falló."
  exit 1
fi

echo "✅ Build completado"

# 7. Push de tags y commits
echo "📤 Subiendo cambios y tags a GitHub..."
git push --follow-tags origin main

# 8. Información final
echo ""
echo "✅ ¡Completado!"
echo "===================================="
echo "📦 Versión: v$NEW_VERSION"
echo "🌍 URL: https://tryonyou.app"
echo "📊 GitHub Actions se encargará del deploy automático"
echo ""
echo "Para ver el changelog completo: cat CHANGELOG.md"

