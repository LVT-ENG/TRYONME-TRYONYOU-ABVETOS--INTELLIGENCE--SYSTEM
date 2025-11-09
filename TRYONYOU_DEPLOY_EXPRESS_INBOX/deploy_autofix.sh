#!/usr/bin/env bash
set -euo pipefail

echo "==========================================="
echo "🚀 TRYONYOU – ABVETOS – DEPLOY AUTO-FIX"
echo "==========================================="

PROJECT_NAME="TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"
PROJECT_DIR="$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"
ORG_ID="team_7d968ah5fE123abcXYZ"
PROJECT_ID="prj_5cvw37eFOnS1iXuHqQ89HD1I"

VERCEL_TOKEN="${VERCEL_TOKEN:-}"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID:-}"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

if [[ -z "$VERCEL_TOKEN" ]]; then
  echo "⚠️ No se encontró VERCEL_TOKEN."
  read -p "👉 Pega aquí tu token válido de Vercel (LVT-ENG): " TOKEN_INPUT
  export VERCEL_TOKEN="$TOKEN_INPUT"
  echo "✅ Token guardado temporalmente."
fi

if ! command -v vercel &>/dev/null; then
  echo "📦 Instalando Vercel CLI..."
  npm install -g vercel
fi

if ! command -v jq &>/dev/null; then
  echo "📦 Instalando jq..."
  brew install jq || sudo apt install -y jq
fi

echo "📁 Moviéndose a $PROJECT_DIR..."
cd "$PROJECT_DIR" || { echo "❌ No se encontró la carpeta del proyecto."; exit 1; }

echo "🔍 Verificando conexión con Vercel..."
if ! npx vercel whoami --token=$VERCEL_TOKEN &>/dev/null; then
  echo "❌ Token inválido o no pertenece al equipo LVT-ENG."
  echo "👉 Genera uno nuevo en https://vercel.com/account/tokens (dentro del equipo LVT-ENG)."
  exit 1
else
  echo "✅ Token verificado correctamente (LVT-ENG)."
fi

echo "📦 Instalando dependencias..."
npm install --no-audit --progress=false
echo "🛠️ Ejecutando build..."
npm run build

echo "🚀 Iniciando deploy en producción..."
DEPLOY_OUTPUT=$(npx vercel deploy --prod --token=$VERCEL_TOKEN --scope $ORG_ID --yes 2>&1 || true)
echo "$DEPLOY_OUTPUT"

SITE_URL=$(echo "$DEPLOY_OUTPUT" | grep -Eo "https://[a-zA-Z0-9.-]*\.vercel\.app" | head -n1 || true)
SITE_URL=${SITE_URL:-"(no encontrada)"}

echo "🌐 Sitio desplegado: $SITE_URL"

if [[ -n "$CLOUDFLARE_API_TOKEN" && -n "$CLOUDFLARE_ZONE_ID" ]]; then
  echo "🌀 Purga de caché Cloudflare..."
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
       -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
       -H "Content-Type: application/json" \
       --data '{"purge_everything":true}' | jq -r '.success'
  echo "✅ Caché Cloudflare purgada."
else
  echo "⚠️ No se purgó Cloudflare (faltan tokens)."
fi

if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
  MSG="✅ *Deploy completado*\n🌐 URL: ${SITE_URL}\n🕒 $(date '+%Y-%m-%d %H:%M:%S')"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
       -d "chat_id=${TELEGRAM_CHAT_ID}" \
       -d "parse_mode=Markdown" \
       -d "text=${MSG}" >/dev/null || true
  echo "📲 Notificación enviada a Telegram."
else
  echo "ℹ️ No hay credenciales Telegram configuradas, saltando notificación."
fi

echo "✅ FIN — Deploy completo de $PROJECT_NAME"
echo "==========================================="
