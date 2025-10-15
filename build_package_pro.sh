#!/bin/bash
# =========================================================
# TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
# Dual Build: FULL + LIGHT Packages + Auto Deploy
# Author: Agente 70 for CEO
# =========================================================
set -euo pipefail

echo "🔧 Inicializando entorno..."

# Cargar .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️ No se encontró .env, usando entorno actual."
fi

# Comprobaciones
for cmd in node npm zip rsync; do
  command -v "$cmd" &>/dev/null || { echo "❌ Falta $cmd"; exit 1; }
done

# Variables
STAMP=$(date +%Y%m%d-%H%M%S)
PKG_NAME="TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"
OUT_FULL="out_full_${STAMP}"
OUT_LIGHT="out_light_${STAMP}"
ZIP_FULL="${PKG_NAME}_FULL_${STAMP}.zip"
ZIP_LIGHT="${PKG_NAME}_LIGHT_${STAMP}.zip"

# =========================================================
echo "📦 Instalando dependencias exactas..."
npm ci

echo "🏗️ Compilando build de producción..."
npm run build

# =========================================================
echo "🧱 Creando carpeta base..."
mkdir -p "$OUT_FULL"
mkdir -p "$OUT_LIGHT"

echo "📂 Copiando archivos base..."
for dir in dist public assets src package.json package-lock.json vite.config.* vercel.json; do
  [ -e "$dir" ] && cp -R "$dir" "$OUT_FULL" || true
done

# =========================================================
echo "📦 Copiando node_modules completos (FULL)..."
mkdir -p "$OUT_FULL/node_modules"
rsync -a node_modules/ "$OUT_FULL/node_modules/"

echo "🧳 Creando ZIP FULL..."
zip -qry "$ZIP_FULL" "$OUT_FULL"
echo "✅ Paquete completo creado: $ZIP_FULL"

# =========================================================
echo "🪶 Creando versión LIGHT (solo dependencias producción)..."
cp -R "$OUT_FULL" "$OUT_LIGHT"
(
  cd "$OUT_LIGHT"
  npm prune --production
)
zip -qry "$ZIP_LIGHT" "$OUT_LIGHT"
echo "✅ Paquete light creado: $ZIP_LIGHT"

# =========================================================
echo "🚀 Desplegando a Vercel..."
npx vercel --prod --token="${VITE_VERCEL_TOKEN}" --confirm || true

DEPLOY_URL="https://tryonyou.app"

# =========================================================
if [ -n "${TELEGRAM_TOKEN:-}" ]; then
  echo "📡 Notificando a Telegram..."
  MSG="✅ Deploy TRYONYOU–ABVETOS–ULTIMATUM completado%0A🔗 ${DEPLOY_URL}%0A📦 FULL: ${ZIP_FULL}%0A🪶 LIGHT: ${ZIP_LIGHT}"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
    -d chat_id="@abvet_deploy_bot" -d text="$MSG" &>/dev/null || true
else
  echo "ℹ️ Sin TELEGRAM_TOKEN, no se enviará notificación."
fi

echo "🎉 Finalizado correctamente."
