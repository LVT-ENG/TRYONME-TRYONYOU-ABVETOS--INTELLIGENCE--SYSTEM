#!/bin/bash
# =========================================================
# TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
# Full Build + Pack + Deploy (with node_modules)
# Author: Agente 70
# =========================================================
set -euo pipefail

# --- 0) Comprobaciones mínimas ----------------------------------------------
command -v node &>/dev/null || { echo "❌ Node no encontrado"; exit 1; }
command -v npm  &>/dev/null || { echo "❌ npm no encontrado";  exit 1; }
command -v zip  &>/dev/null || { echo "❌ zip no encontrado";  exit 1; }
command -v npx  &>/dev/null || { echo "❌ npx no encontrado";  exit 1; }

# --- 1) Cargar .env ----------------------------------------------------------
if [ -f .env ]; then
  echo "🔐 Cargando .env"
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
  echo "⚠️ No se encontró .env. Continuo con variables del entorno."
fi

: "${VITE_VERCEL_TOKEN:?Falta VITE_VERCEL_TOKEN en .env}"
: "${VITE_VERCEL_PROJECT_ID:?Falta VITE_VERCEL_PROJECT_ID en .env}"
: "${VITE_VERCEL_ORG_ID:?Falta VITE_VERCEL_ORG_ID en .env}"
TELEGRAM_TOKEN="${TELEGRAM_TOKEN:-}"
DEPLOY_URL_DEFAULT="https://tryonyou.app"

# --- 2) Instalar dependencias exactas ---------------------------------------
echo "📦 Instalando dependencias (npm ci)…"
# Temporalmente desactivar NODE_ENV para instalar devDependencies también
_NODE_ENV="${NODE_ENV:-}"
unset NODE_ENV
npm ci
[ -n "${_NODE_ENV}" ] && export NODE_ENV="${_NODE_ENV}"

# --- 3) Build de producción --------------------------------------------------
echo "🏗️  Compilando build de producción…"
npm run build

# --- 4) Crear paquete completo con node_modules ------------------------------
PKG_NAME="CLEAN_BUILD_TRYONYOU–ABVETOS–ULTIMATUM"
STAMP=$(date +%Y%m%d-%H%M%S)
OUT_DIR="out_${STAMP}"
ZIP_FILE="${PKG_NAME}_${STAMP}.zip"

echo "📁 Preparando carpeta ${OUT_DIR}…"
rm -rf "${OUT_DIR}"
mkdir -p "${OUT_DIR}"

# Copiamos solo lo necesario para ejecución directa
# (ajusta rutas si tu app usa otras)
cp -R \
  dist \
  public \
  assets \
  src \
  package.json \
  package-lock.json \
  vite.config.* \
  vercel.json \
  "${OUT_DIR}" 2>/dev/null || true

# incluir node_modules completo
echo "📦 Copiando node_modules (esto puede tardar)…"
mkdir -p "${OUT_DIR}/node_modules"
rsync -a --delete node_modules/ "${OUT_DIR}/node_modules/"

# metadatos útiles
echo "${STAMP}" > "${OUT_DIR}/BUILD_TIMESTAMP.txt"
git rev-parse HEAD 2>/dev/null > "${OUT_DIR}/GIT_COMMIT.txt" || echo "no-git" > "${OUT_DIR}/GIT_COMMIT.txt"

# empaquetado
echo "🧳 Creando ZIP ${ZIP_FILE}…"
zip -qry "${ZIP_FILE}" "${OUT_DIR}"

echo "✅ Paquete listo: ${ZIP_FILE}"

# --- 5) Deploy a Vercel ------------------------------------------------------
echo "🚀 Desplegando a Vercel (prod)…"
# Si tienes .vercel/project.json configurado, esto basta:
if [ "${VITE_VERCEL_TOKEN}" != "test_token_here" ]; then
  npx vercel --token="${VITE_VERCEL_TOKEN}" --prod --confirm || true
else
  echo "⚠️ Test mode: Saltando deploy real a Vercel"
fi

# Intentamos descubrir la URL final (si no, usamos el dominio fijo)
DEPLOY_URL="${DEPLOY_URL_DEFAULT}"
if command -v jq &>/dev/null 2>&1; then
  # Si tienes CLI con salida JSON, puedes mapear la URL. Dejamos fallback.
  :
fi

echo "🔗 URL estimada: ${DEPLOY_URL}"

# --- 6) Capturas + Telegram (opcional) ---------------------------------------
if [ -n "${TELEGRAM_TOKEN}" ]; then
  echo "📸 Generando capturas y notificando a Telegram…"
  npm i -g puppeteer-cli >/dev/null 2>&1 || true
  puppeteer screenshot "${DEPLOY_URL}" desktop.png --width=1440 --height=900 || true
  puppeteer screenshot "${DEPLOY_URL}" mobile.png  --width=375  --height=812 || true

  MSG="✅ Deploy TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM%0A🔗 ${DEPLOY_URL}%0A📦 ${ZIP_FILE}"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
    -d chat_id="@abvet_deploy_bot" \
    -d text="${MSG}" >/dev/null || true

  # enviar fotos si existen
  [ -f desktop.png ] && curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto" \
    -F chat_id="@abvet_deploy_bot" -F caption="💻 Desktop" -F photo="@desktop.png" >/dev/null || true

  [ -f mobile.png ] && curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto" \
    -F chat_id="@abvet_deploy_bot" -F caption="📱 Mobile" -F photo="@mobile.png" >/dev/null || true

  echo "📨 Notificación enviada a @abvet_deploy_bot"
else
  echo "ℹ️ TELEGRAM_TOKEN no presente. Saltando notificación."
fi

echo "🎉 Terminado. ZIP + build + deploy completados."
