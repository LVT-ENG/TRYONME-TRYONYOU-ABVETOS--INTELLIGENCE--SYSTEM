#!/usr/bin/env zsh
echo "---- DEPLOY TRYONYOU START ----"
PROJECT_NAME="tryonyou"
DOMAIN_MAIN="www.tryonyou.app"
ALIAS_VERCEL="tryonyou.vercel.app"
echo "Building and deploying..."
DEPLOY_URL=$(vercel deploy --prod --confirm --token "${VERCEL_TOKEN}" | tail -n1)
[[ -z "$DEPLOY_URL" ]] && { echo "Error: no se obtuvo URL de deploy."; exit 1; }
echo "Deployment URL: $DEPLOY_URL"
vercel alias set "$DEPLOY_URL" "$ALIAS_VERCEL" --token "${VERCEL_TOKEN}"
vercel alias set "$DEPLOY_URL" "$DOMAIN_MAIN" --token "${VERCEL_TOKEN}"
echo "Clearing Vercel cache..."
vercel cache clear --all --token "${VERCEL_TOKEN}"
echo "Purging Cloudflare cache..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
     -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}' >/dev/null 2>&1
echo "Cloudflare purge request sent."
MESSAGE="Deploy completado para TRYONYOU\n${DOMAIN_MAIN}\n${DEPLOY_URL}\nCache purgada globalmente"
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
     -d chat_id="${TELEGRAM_CHAT_ID}" \
     -d text="${MESSAGE}" >/dev/null 2>&1
echo "Telegram notified."
echo "---- DEPLOY TRYONYOU FINISHED ----"
