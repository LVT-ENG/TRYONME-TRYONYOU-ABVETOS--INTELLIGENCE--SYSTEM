#!/bin/bash
# ===========================================================
# REFRESH TOKENS - Auto-renewal for Vercel + Telegram
# TRYONYOU – ABVETOS – Deploy Report Full Cycle
# ===========================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🔄 TOKEN REFRESH AUTOMATION                         ║${NC}"
echo -e "${CYAN}║   Auto-renew Vercel + Telegram tokens                 ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="$PROJECT_ROOT/logs/token_refresh_$TIMESTAMP.log"

mkdir -p "$PROJECT_ROOT/logs"

# Function to log messages
log_message() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log_message "${YELLOW}📝 Starting token refresh process...${NC}"
log_message "${BLUE}Timestamp: $(date)${NC}"
echo ""

# 1️⃣ Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    log_message "${RED}❌ Error: .env file not found at $ENV_FILE${NC}"
    log_message "${YELLOW}Please copy .env.example to .env and configure your tokens${NC}"
    exit 1
fi

log_message "${GREEN}✅ .env file found${NC}"
echo ""

# 2️⃣ Load current environment variables
log_message "${YELLOW}📋 Loading current configuration...${NC}"
source "$ENV_FILE"

# Verify required variables are set
MISSING_VARS=()

if [ -z "$VERCEL_TOKEN" ]; then
    MISSING_VARS+=("VERCEL_TOKEN")
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
    MISSING_VARS+=("VERCEL_PROJECT_ID")
fi

if [ -z "$VERCEL_ORG_ID" ]; then
    MISSING_VARS+=("VERCEL_ORG_ID")
fi

if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    MISSING_VARS+=("TELEGRAM_BOT_TOKEN")
fi

if [ -z "$TELEGRAM_CHAT_ID" ]; then
    MISSING_VARS+=("TELEGRAM_CHAT_ID")
fi

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    log_message "${RED}❌ Missing required environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        log_message "   - $var"
    done
    log_message "${YELLOW}Please configure these in your .env file${NC}"
    exit 1
fi

log_message "${GREEN}✅ All required variables are configured${NC}"
echo ""

# 3️⃣ Verify Vercel token is valid
log_message "${YELLOW}🔑 Verifying Vercel token...${NC}"
if command -v curl &> /dev/null; then
    VERCEL_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        https://api.vercel.com/v2/user)
    
    if [ "$VERCEL_RESPONSE" = "200" ]; then
        log_message "${GREEN}✅ Vercel token is valid${NC}"
    else
        log_message "${RED}❌ Vercel token validation failed (HTTP $VERCEL_RESPONSE)${NC}"
        log_message "${YELLOW}Please update your VERCEL_TOKEN in .env${NC}"
    fi
else
    log_message "${YELLOW}⚠️  curl not found, skipping Vercel token verification${NC}"
fi
echo ""

# 4️⃣ Verify Telegram bot token
log_message "${YELLOW}🤖 Verifying Telegram bot token...${NC}"
if command -v curl &> /dev/null; then
    TELEGRAM_RESPONSE=$(curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe")
    
    if echo "$TELEGRAM_RESPONSE" | grep -q '"ok":true'; then
        log_message "${GREEN}✅ Telegram bot token is valid${NC}"
        BOT_USERNAME=$(echo "$TELEGRAM_RESPONSE" | grep -o '"username":"[^"]*"' | cut -d'"' -f4)
        log_message "${BLUE}   Bot username: @$BOT_USERNAME${NC}"
    else
        log_message "${RED}❌ Telegram bot token validation failed${NC}"
        log_message "${YELLOW}Please update your TELEGRAM_BOT_TOKEN in .env${NC}"
    fi
else
    log_message "${YELLOW}⚠️  curl not found, skipping Telegram token verification${NC}"
fi
echo ""

# 5️⃣ Test Telegram notification
log_message "${YELLOW}📤 Testing Telegram notification...${NC}"
if command -v curl &> /dev/null; then
    TEST_MESSAGE="🔄 Token Refresh Test - $(date)"
    SEND_RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
        -d chat_id="$TELEGRAM_CHAT_ID" \
        -d text="$TEST_MESSAGE" \
        -d parse_mode="HTML")
    
    if echo "$SEND_RESPONSE" | grep -q '"ok":true'; then
        log_message "${GREEN}✅ Test notification sent successfully${NC}"
    else
        log_message "${YELLOW}⚠️  Failed to send test notification${NC}"
        log_message "${YELLOW}Please verify your TELEGRAM_CHAT_ID in .env${NC}"
    fi
fi
echo ""

# 6️⃣ Create backup of current .env
log_message "${YELLOW}💾 Creating backup of .env file...${NC}"
BACKUP_FILE="$PROJECT_ROOT/.env.backup.$TIMESTAMP"
cp "$ENV_FILE" "$BACKUP_FILE"
log_message "${GREEN}✅ Backup created: $BACKUP_FILE${NC}"
echo ""

# 7️⃣ Summary
log_message "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
log_message "${CYAN}║   📊 TOKEN REFRESH SUMMARY                            ║${NC}"
log_message "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
log_message "${GREEN}✅ Token refresh process completed${NC}"
log_message "${BLUE}📋 Log file: $LOG_FILE${NC}"
log_message "${BLUE}💾 Backup file: $BACKUP_FILE${NC}"
echo ""
log_message "${YELLOW}💡 Note: Tokens are validated but not auto-renewed.${NC}"
log_message "${YELLOW}   For security, manual token rotation is recommended.${NC}"
log_message "${YELLOW}   Update tokens in .env when they expire.${NC}"
echo ""

# 8️⃣ Exit successfully
exit 0
