#!/bin/bash

set -e

echo "🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — SuperCommit MAX"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del repositorio"
    exit 1
fi

# Cambiar a branch main
# echo "📌 Cambiando a branch main..."
# git checkout main || { echo "❌ Error al cambiar a main"; exit 1; }

# Actualizar desde remoto
# echo "📥 Actualizando desde origin main..."
# git pull origin main || { echo "❌ Error al hacer pull"; exit 1; }

# Limpieza previa (Destructiva)
echo "🧹 Realizando limpieza previa..."
rm -rf node_modules dist legacy_old temp_old apps/web-old tests-old legacy integrations/duplicados 2>/dev/null || true

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Crear directorios si no existen (estructura flexible)
echo "📁 Verificando estructura de directorios..."
mkdir -p docs/arquitectura_empresa docs/patent_EPCT docs/investor_edition
mkdir -p public/assets/hero public/assets/modules public/assets/investor public/assets/vision
mkdir -p src/modules src/components src/pages

# Añadir todo el código principal
echo "➕ Añadiendo archivos al staging area..."

# Directorios principales (si existen)
[ -d "apps" ] && git add apps/ || echo "ℹ️ apps/ no existe"
[ -d "api" ] && git add api/ || echo "ℹ️ api/ no existe"
[ -d "modules" ] && git add modules/ || echo "ℹ️ modules/ no existe"
[ -d "integrations" ] && git add integrations/ || echo "ℹ️ integrations/ no existe"
[ -d "tests" ] && git add tests/ || echo "ℹ️ tests/ no existe"

# Directorios que siempre deben existir
git add docs/ || echo "⚠️ No se pudo añadir docs/"
git add src/ || echo "⚠️ No se pudo añadir src/"
git add public/ || echo "⚠️ No se pudo añadir public/"
git add scripts/ || echo "⚠️ No se pudo añadir scripts/"

# Archivos de configuración
git add package.json package-lock.json || echo "⚠️ No se pudieron añadir archivos de configuración"
git add vite.config.js vercel.json index.html || echo "⚠️ No se pudieron añadir archivos de configuración"
git add .env.example README.md CHANGELOG.md 2>/dev/null || echo "⚠️ No se pudieron añadir archivos de documentación"

# Archivos adicionales opcionales
[ -f "Makefile" ] && git add Makefile || echo "ℹ️ Makefile no existe"
[ -f "deploy.sh" ] && git add deploy.sh || echo "ℹ️ deploy.sh ya existe"

# Super-commit con firma y mensaje largo detallado
# echo "💎 Creando commit con mensaje detallado..."
# git commit -m "🔥 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM..." || echo "⚠️ No hay cambios nuevos para commitear"

# Push final
# echo "🚀 Enviando cambios a origin main..."
# git push origin main || { echo "❌ Error al hacer push"; exit 1; }

# Despliegue en Vercel (opcional, solo si hay token)
if [ -n "$VERCEL_TOKEN" ]; then
    echo "🌐 Desplegando en Vercel..."
    # npx vercel --prod --token=$VERCEL_TOKEN || echo "⚠️ Error en deploy de Vercel"
    echo "⚠️ Deploy manual en Vercel saltado en este paso."
else
    echo "ℹ️ Variable VERCEL_TOKEN no definida, saltando deploy de Vercel"
    echo " Para desplegar automáticamente, exporta VERCEL_TOKEN antes de ejecutar este script"
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ RESULTADO FINAL (Pre-Commit)"
echo "════════════════════════════════════════════════════════════════"
echo "📦 Repositorio: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
echo "🌿 Branch: (Current)"
echo "🌐 Dominio: https://tryonyou.app"
echo "📊 Estado: Ready to Commit"
echo "💎 Preparado por: Agente 70 — SuperCommit MAX"
echo "════════════════════════════════════════════════════════════════"
