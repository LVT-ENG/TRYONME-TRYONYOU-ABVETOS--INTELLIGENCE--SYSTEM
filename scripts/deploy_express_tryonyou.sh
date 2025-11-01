#!/bin/bash
# ==========================================================
# 🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
# Deploy Express Script v2.2 – Cloudflare Auto Purge
# ==========================================================

INBOX=~/Library/Mobile\ Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX
WORKDIR="$INBOX/_deploy_build"
LOGFILE="$INBOX/deploy_log_$(date +%Y%m%d_%H%M).log"

echo "🦚 Starting Deploy Express..."
mkdir -p "$WORKDIR"
cd "$INBOX" || exit

for f in *.zip; do
  echo "📦 Descomprimiendo $f ..." | tee -a "$LOGFILE"
  unzip -o "$f" -d "$WORKDIR" > "$LOGFILE" 2>&1
done

cd "$WORKDIR" || exit

{
  npm install
  npm run build
} >> "$LOGFILE" 2>&1

vercel --prod --confirm --token="$VERCEL_TOKEN" >> "$LOGFILE" 2>&1
DEPLOY_URL=$(vercel ls --token="$VERCEL_TOKEN" | head -2 | tail -1 | awk '{print $2}')
echo "🌐 URL final: $DEPLOY_URL" | tee -a "$LOGFILE"

# 🧹 Purga automática de caché Cloudflare
if [ -n "$CLOUDFLARE_API_TOKEN" ] && [ -n "$CLOUDFLARE_ZONE_ID" ]; then
  echo "🧹 Purging Cloudflare cache..." | tee -a "$LOGFILE"
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
       -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
       -H "Content-Type: application/json" \
       --data '{"purge_everything":true}' >> "$LOGFILE" 2>&1
  echo "✅ Cloudflare cache purged." | tee -a "$LOGFILE"
else
  echo "⚠️ Cloudflare environment variables not found — skipping purge." | tee -a "$LOGFILE"
fi

# 📢 Notificación Telegram
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d chat_id="$TELEGRAM_CHAT_ID" \
  -d parse_mode="Markdown" \
  -d text="✅ *TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM* desplegado y cache purgada.\n🌐 <a>Abrir en navegador</a>\n🕓 $(date '+%Y-%m-%d %H:%M')" \
  > "$LOGFILE" 2>&1

echo "✅ Deploy + Cache Purge + Telegram Notification completado." | tee -a "$LOGFILE"
