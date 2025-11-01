#!/bin/bash
set -e

# Cambiar al directorio de trabajo
cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX || exit 1

echo "🚀 Activando Modo ABVETOS Orchestrator"
git add .
git commit -m "🤖 ABVETOS Auto-Sync $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin main

# 🔁 Build + Deploy automático
if npm run build; then
  npx vercel --prod --yes
else
  echo "❌ Build failed, skipping deployment"
  exit 1
fi

# 📡 Notificación al bot de Telegram
if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT_ID}" \
    -d "text=✅ Deploy automático completado en https://tryonyou.app – $(date +'%H:%M')"
fi
