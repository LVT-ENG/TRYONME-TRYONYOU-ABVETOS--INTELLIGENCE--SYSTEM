#!/bin/bash
# ======================================================
# TRYONYOU – ABVETOS – ULTRA-PLUS – ULTIMATUM
# ABVETOS_FLOW_345.sh · Orquestación total
# ======================================================

set -euo pipefail

echo "🧠 [ABVETOS] Iniciando Flujo 345 (Build → Deploy → Notify)"

# ─── [1] BUILD ───────────────────────────────────────────────
echo "🏗️ [1/3] Build del proyecto..."
npm ci --silent || npm install --silent
npm run build --silent
echo "✅ Build completado."

# ─── [2] DEPLOY ──────────────────────────────────────────────
echo "🚀 [2/3] Desplegando en Vercel..."
npx vercel --token "$VERCEL_TOKEN" --prod --yes > deploy.log 2>&1
if grep -q "https" deploy.log; then
  DEPLOY_URL=$(grep -Eo 'https://[a-zA-Z0-9./?=_-]*' deploy.log | tail -1)
  echo "✅ Despliegue exitoso en: $DEPLOY_URL"
else
  echo "❌ Fallo en el despliegue. Revisar deploy.log"
  exit 1
fi

# ─── [3] NOTIFY + VERIFY ─────────────────────────────────────
echo "📡 [3/3] Enviando notificación a Telegram..."
MESSAGE="✅ TRYONYOU – Flujo 345 completado con éxito en $(date '+%Y-%m-%d %H:%M:%S')%0A🌐 URL: $DEPLOY_URL"
RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d parse_mode=HTML \
  -d text="$MESSAGE")

# Check if Telegram notification was successful
if echo "$RESPONSE" | grep -q '"ok":true'; then
  echo "✅ Notificación enviada exitosamente."
else
  echo "⚠️ Advertencia: No se pudo enviar la notificación a Telegram."
fi

echo "🦚 [ABVETOS] Flujo 345 completado correctamente."
