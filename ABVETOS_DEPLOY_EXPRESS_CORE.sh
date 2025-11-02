#!/bin/bash
# ======================================================
# TRYONYOU – ABVETOS – ULTRA–PLUS – ULTIMATUM
# ABVETOS_DEPLOY_EXPRESS_CORE.sh
# v1.0.1 — Core deploy orchestrator by ABVETOS
# ======================================================

set -e  # Stop if any command fails

# Validate required environment variables
if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ [ABVETOS] Error: VERCEL_TOKEN is not set"
  exit 1
fi

if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
  echo "⚠️ [ABVETOS] Warning: Telegram credentials not set. Notification will be skipped."
fi

echo "🧠 [ABVETOS] Starting Deploy Express..."
echo "📦 Installing dependencies..."
npm ci --silent || npm install --silent

echo "🏗️ Building production bundle..."
npm run build --silent

echo "🚀 Deploying to Vercel..."
if npx vercel --token "$VERCEL_TOKEN" --prod --yes > deploy.log 2>&1; then
  if grep -qE "(Production:|Preview:).*https://" deploy.log; then
    echo "✅ [ABVETOS] Vercel deploy successful."
  else
    echo "⚠️ [ABVETOS] Vercel command succeeded but no deployment URL found in log."
  fi
else
  echo "❌ [ABVETOS] Vercel deploy failed. Check deploy.log for details."
  exit 1
fi

if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
  echo "📡 Sending Telegram notification..."
  MESSAGE="✅ TRYONYOU – Deploy completado con éxito en $(date '+%Y-%m-%d %H:%M:%S')"
  if curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="${TELEGRAM_CHAT_ID}" \
    -d text="$MESSAGE" > /dev/null; then
    echo "🦚 [ABVETOS] Done. Notification sent."
  else
    echo "⚠️ [ABVETOS] Done. Notification failed to send."
  fi
else
  echo "🦚 [ABVETOS] Done. (Telegram notification skipped)"
fi
