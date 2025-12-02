#!/bin/bash
#
# Telegram Deploy Bot Notification Script
# Sends deployment status to Telegram channel
#

set -e

# Configuration (use environment variables)
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# Deployment information
DEPLOY_STATUS="${1:-SUCCESS}"
DEPLOY_URL="${2:-https://tryonyou.vercel.app}"
COMMIT_SHA="${3:-$(git rev-parse --short HEAD 2>/dev/null || echo 'N/A')}"
BRANCH="${4:-$(git branch --show-current 2>/dev/null || echo 'main')}"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

# Build notification message
if [ "$DEPLOY_STATUS" = "SUCCESS" ]; then
    STATUS_EMOJI="✅"
    STATUS_TEXT="DEPLOYED SUCCESSFULLY"
else
    STATUS_EMOJI="❌"
    STATUS_TEXT="DEPLOYMENT FAILED"
fi

MESSAGE="
${STATUS_EMOJI} *TRYONYOU Deployment Notification*
━━━━━━━━━━━━━━━━━━━━━━━━━━

*Status:* ${STATUS_TEXT}
*Environment:* Production
*URL:* ${DEPLOY_URL}

*Details:*
• Branch: \`${BRANCH}\`
• Commit: \`${COMMIT_SHA}\`
• Time: ${TIMESTAMP}

*Modules:*
✅ Factory
✅ CAP
✅ Smart Wardrobe
✅ Solidarity Wardrobe
✅ Q-API
✅ ABVET Core Dock
✅ Agent70

━━━━━━━━━━━━━━━━━━━━━━━━━━
🦚 TRYONYOU-ABVETOS-ULTRA-PLUS-ULTIMATUM
"

# Function to send Telegram message
send_telegram_notification() {
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        echo "⚠️  Telegram credentials not configured"
        echo "   Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables"
        echo ""
        echo "📝 Notification message would be:"
        echo "$MESSAGE"
        return 0
    fi

    # Validate token format (basic check)
    if [[ ! "$TELEGRAM_BOT_TOKEN" =~ ^[0-9]+:[a-zA-Z0-9_-]+$ ]]; then
        echo "❌ Invalid Telegram bot token format"
        return 1
    fi

    echo "📡 Sending Telegram notification..."
    
    # Use POST data to avoid token in URL logs
    RESPONSE=$(curl -s -X POST \
        "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
        --data-urlencode "text=${MESSAGE}" \
        --data-urlencode "parse_mode=Markdown" \
        --data-urlencode "disable_web_page_preview=true" 2>&1)

    if echo "$RESPONSE" | grep -q '"ok":true'; then
        echo "✅ Telegram notification sent successfully"
    else
        echo "❌ Failed to send Telegram notification"
        return 1
    fi
}

# Main execution
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 TRYONYOU Telegram Deploy Bot"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

send_telegram_notification

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
