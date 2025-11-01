#!/bin/bash
# ======================================================
# TRYONYOU – ABVETOS – ULTRA-PLUS – ULTIMATUM
# ABVETOS_DEPLOY_EXPRESS_CORE.sh
# v1.0.1 — Core deploy orchestrator by ABVETOS
# ======================================================

set -e

echo "🧠 [ABVETOS] Starting Deploy Express..."
echo "📦 Installing dependencies..."
npm ci --silent || npm install --silent

echo "🏗️ Building production bundle..."
npm run build --silent

echo "🚀 Deploying to Vercel..."
npx vercel --token "$VERCEL_TOKEN" --prod --yes > deploy.log 2>&1

if grep -q "https" deploy.log; then
  echo "✅ [ABVETOS] Vercel deploy successful."
else
  echo "❌ [ABVETOS] Vercel deploy failed. Check deploy.log for details."
  exit 1
fi

echo "📡 Sending Telegram notification..."
MESSAGE="✅ TRYONYOU – Deploy completado con éxito en $(date '+%Y-%m-%d %H:%M:%S')"
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="$MESSAGE" > /dev/null

echo "🦚 [ABVETOS] Done. Notification sent."
