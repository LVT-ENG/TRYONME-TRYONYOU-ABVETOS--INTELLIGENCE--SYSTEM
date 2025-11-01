#!/bin/bash
# ======================================================
# TRYONYOU – ABVETOS – ULTRA-PLUS – ULTIMATUM
# ABVETOS_FLOW_345.sh · Orquestación total
# ======================================================

set -e

echo "🧠 [ABVETOS] Iniciando Flujo 345 (Build → Deploy → Notify)"

# ─── [3] BUILD ───────────────────────────────────────────────
echo "🏗️ [3/5] Build del proyecto..."
npm ci --silent || npm install --silent
npm run build --silent
echo "✅ Build completado."

# ─── [4] DEPLOY ──────────────────────────────────────────────
echo "🚀 [4/5] Desplegando en Vercel..."
npx vercel --token "$VERCEL_TOKEN" --prod --yes > deploy.log 2>&1
if grep -q "https" deploy.log; then
  DEPLOY_URL=$(grep -Eo 'https://[a-zA-Z0-9./?=_-]*' deploy.log | tail -1)
  echo "✅ Despliegue exitoso en: $DEPLOY_URL"
else
  echo "❌ Fallo en el despliegue. Revisar deploy.log"
  exit 1
fi

# ─── [5] NOTIFY + VERIFY ─────────────────────────────────────
echo "📡 [5/5] Enviando notificación a Telegram..."
MESSAGE="✅ TRYONYOU – Flujo 345 completado con éxito en $(date '+%Y-%m-%d %H:%M:%S')%0A🌐 URL: $DEPLOY_URL"
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="$MESSAGE" > /dev/null

echo "🦚 [ABVETOS] Flujo 345 completado correctamente."
