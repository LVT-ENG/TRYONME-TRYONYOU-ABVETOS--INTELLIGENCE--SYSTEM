#!/bin/bash
set -e

echo "🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — SuperCommit MAX"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del repositorio"
    exit 1
fi

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
git add docs/ src/ public/ scripts/ package.json package-lock.json vite.config.js vercel.json index.html .env.example README.md CHANGELOG.md || true

# Super-commit con firma y mensaje largo detallado
echo "💎 Preparado para commit..."
# (Commit y Push se manejan externamente en este entorno)

# Despliegue en Vercel (opcional, solo si hay token)
if [ -n "$VERCEL_TOKEN" ]; then
    echo "🌐 Desplegando en Vercel..."
    npx vercel --prod --token=$VERCEL_TOKEN --yes --confirm --force || echo "⚠️ Error en deploy de Vercel"
else
    echo "ℹ️ Variable VERCEL_TOKEN no definida, saltando deploy de Vercel"
fi

echo "════════════════════════════════════════════════════════════════"
echo "✅ RESULTADO FINAL"
echo "════════════════════════════════════════════════════════════════"
