#!/bin/bash
echo "🚀 Iniciando deploy TRYONYOU–VO3–HOLOGRAPHIC–LIVE–ULTIMATUM..."
npm install
npm run build
npx vercel --prod --confirm
curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage \
  -d chat_id="@abvet_deploy_bot" \
  -d text="🦚 Deploy TRYONYOU–VO3–HOLOGRAPHIC–LIVE–ULTIMATUM completado en https://www.tryonyou.app"
echo "✅ Deploy finalizado"
