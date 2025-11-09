#!/bin/bash
set -e

echo "🧹 Cleaning Vercel & Cloudflare caches..."
npx vercel cache clear --scope "$VERCEL_SCOPE" >/dev/null 2>&1 || true

if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}' >/dev/null 2>&1 || true
  echo "☁️ Cloudflare cache purged"
fi

echo "⚙️ Building TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM..."
npm install >/dev/null 2>&1
npm run build

echo "🚀 Deploying to Vercel..."
DEPLOY_URL=$(vercel --prod --confirm --token $VERCEL_TOKEN | tail -n1)
echo "✅ Deployment completed: $DEPLOY_URL"

# 🧾 Telegram Notification
if [ -n "$TELEGRAM_BOT_TOKEN" ]; then
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="@abvet_deploy_bot" \
  -d text="🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM successfully deployed! 🌍 LIVE: ${DEPLOY_URL}" >/dev/null 2>&1
  echo "📨 Telegram notification sent to @abvet_deploy_bot"
fi

echo "🎯 DONE :: LIVE SITE → ${DEPLOY_URL}"
