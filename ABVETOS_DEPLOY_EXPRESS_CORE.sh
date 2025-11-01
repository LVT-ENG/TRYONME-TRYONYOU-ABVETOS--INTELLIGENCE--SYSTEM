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
DEPLOY_LOG=$(mktemp)
trap 'rm -f "$DEPLOY_LOG"' EXIT

if npx vercel --token "$VERCEL_TOKEN" --prod --yes > "$DEPLOY_LOG" 2>&1; then
  if grep -qE "https://[a-zA-Z0-9.-]+\.vercel\.app" "$DEPLOY_LOG"; then
    echo "✅ [ABVETOS] Vercel deploy successful."
    DEPLOY_URL=$(grep -oE "https://[a-zA-Z0-9.-]+\.vercel\.app" "$DEPLOY_LOG" | head -1)
  else
    echo "✅ [ABVETOS] Deploy command succeeded but URL not found in output."
    DEPLOY_URL=""
  fi
else
  echo "❌ [ABVETOS] Vercel deploy failed. Check output for details."
  cat "$DEPLOY_LOG"
  exit 1
fi

echo "📡 Sending Telegram notification..."
MESSAGE="✅ TRYONYOU – Deploy completado con éxito en $(date '+%Y-%m-%d %H:%M:%S')"
if [ -n "$DEPLOY_URL" ]; then
  MESSAGE="$MESSAGE%0A🔗 $DEPLOY_URL"
fi

if curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="$MESSAGE" > /dev/null; then
  echo "🦚 [ABVETOS] Done. Notification sent."
else
  echo "⚠️ [ABVETOS] Done. Notification failed (check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)."
fi
