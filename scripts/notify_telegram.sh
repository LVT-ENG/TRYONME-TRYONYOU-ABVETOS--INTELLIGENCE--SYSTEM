#!/usr/bin/env bash
# DEPLOY EXPRESS - Telegram Notification Script
# Sends deployment notifications to @abvet_deploy_bot

MESSAGE="$1"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# If no message provided, exit
if [ -z "$MESSAGE" ]; then
  echo "⚠️  No message provided for Telegram notification"
  exit 1
fi

# Check if Telegram credentials are configured
if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
  echo "⚠️  Telegram credentials not configured"
  echo "ℹ️  Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables"
  echo "📝 Message would have been: $MESSAGE"
  exit 0
fi

# Send message to Telegram
RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d parse_mode=HTML \
  -d text="${MESSAGE}")

# Check if successful
if echo "$RESPONSE" | grep -q '"ok":true'; then
  echo "✅ Telegram notification sent successfully"
else
  echo "❌ Failed to send Telegram notification"
  echo "Response: $RESPONSE"
fi

exit 0

