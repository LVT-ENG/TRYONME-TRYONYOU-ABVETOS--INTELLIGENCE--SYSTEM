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

# Check if any .zip files exist
shopt -s nullglob
ZIP_FILES=(*.zip)
if [ ${#ZIP_FILES[@]} -eq 0 ]; then
  echo "⚠️ No .zip files found in $INBOX" | tee -a "$LOGFILE"
  exit 0
fi

for f in "${ZIP_FILES[@]}"; do
  echo "📦 Descomprimiendo $f ..." | tee -a "$LOGFILE"
  unzip -o "$f" -d "$WORKDIR" >> "$LOGFILE" 2>&1
done

cd "$WORKDIR" || exit

{
  npm install
  npm run build
} >> "$LOGFILE" 2>&1

# Deploy to Vercel and capture the result
if vercel --prod --confirm --token="$VERCEL_TOKEN" >> "$LOGFILE" 2>&1; then
  DEPLOY_STATUS="success"
  # Try to get URL from vercel ls output, with fallback
  DEPLOY_URL=$(vercel ls --token="$VERCEL_TOKEN" 2>/dev/null | grep -oE "https://[a-zA-Z0-9.-]+" | head -1)
  if [ -z "$DEPLOY_URL" ]; then
    # Fallback to default domain if URL extraction fails
    DEPLOY_URL="https://tryonyou.app"
  fi
  echo "🌐 URL final: $DEPLOY_URL" | tee -a "$LOGFILE"
else
  DEPLOY_STATUS="failed"
  echo "❌ Deploy failed" | tee -a "$LOGFILE"
fi

# 🧹 Purga automática de caché Cloudflare (only if deploy succeeded)
if [ "$DEPLOY_STATUS" = "success" ]; then
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
fi

# 📢 Notificación Telegram
if [ "$DEPLOY_STATUS" = "success" ]; then
  TELEGRAM_MESSAGE="✅ *TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM* desplegado exitosamente.\n🌐 $DEPLOY_URL\n🕓 $(date '+%Y-%m-%d %H:%M')"
  echo "✅ Deploy + Cache Purge + Telegram Notification completado." | tee -a "$LOGFILE"
else
  TELEGRAM_MESSAGE="❌ *TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM* deploy falló.\n🕓 $(date '+%Y-%m-%d %H:%M')\nRevisa el log para más detalles."
  echo "❌ Deploy failed - check logs." | tee -a "$LOGFILE"
fi

if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
  curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
    -d chat_id="$TELEGRAM_CHAT_ID" \
    -d parse_mode="Markdown" \
    -d text="$TELEGRAM_MESSAGE" \
    >> "$LOGFILE" 2>&1
fi
