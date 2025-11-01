#!/bin/bash
cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX

echo "🚀 Activando Modo ABVETOS Orchestrator"
git add .
git commit -m "🤖 ABVETOS Auto-Sync $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main

# 🔁 Build + Deploy automático
npm run build && npx vercel --prod --yes

# 📡 Notificación al bot de Telegram
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
-d "chat_id=$TELEGRAM_CHAT_ID" \
-d "text=✅ Deploy automático completado en https://tryonyou.app – $(date +'%H:%M')"
