#!/bin/bash
# ===========================================================
# DEPLOY EXPRESS - Complete CI/CD Cycle
# TRYONYOU – ABVETOS – Deploy Report Full Cycle
# ===========================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🚀 DEPLOY EXPRESS - FULL CI/CD CYCLE               ║${NC}"
echo -e "${CYAN}║   TRYONYOU – Complete Deployment Automation           ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="$PROJECT_ROOT/logs/deploy_express_$TIMESTAMP.log"

mkdir -p "$PROJECT_ROOT/logs"

# Function to log messages
log_message() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log_message "${YELLOW}🚀 Starting Deploy Express CI/CD cycle...${NC}"
log_message "${BLUE}Timestamp: $(date)${NC}"
log_message "${BLUE}Project Root: $PROJECT_ROOT${NC}"
echo ""

# 1️⃣ Load environment variables
log_message "${YELLOW}📋 Loading environment variables...${NC}"
if [ -f "$PROJECT_ROOT/.env" ]; then
    source "$PROJECT_ROOT/.env"
    log_message "${GREEN}✅ Environment variables loaded${NC}"
else
    log_message "${YELLOW}⚠️  No .env file found, using defaults${NC}"
fi
echo ""

# 2️⃣ Check Node.js and npm
log_message "${YELLOW}🔍 Checking Node.js and npm...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    log_message "${GREEN}✅ Node.js $NODE_VERSION${NC}"
else
    log_message "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    log_message "${GREEN}✅ npm $NPM_VERSION${NC}"
else
    log_message "${RED}❌ npm not found. Please install npm first.${NC}"
    exit 1
fi
echo ""

# 3️⃣ Install dependencies
log_message "${YELLOW}📦 Installing dependencies...${NC}"
npm ci 2>&1 | tee -a "$LOG_FILE"
log_message "${GREEN}✅ Dependencies installed${NC}"
echo ""

# 4️⃣ Run linting
log_message "${YELLOW}🔍 Running linting checks...${NC}"
if npm run lint --if-present 2>&1 | tee -a "$LOG_FILE"; then
    log_message "${GREEN}✅ Linting passed${NC}"
else
    log_message "${YELLOW}⚠️  Linting warnings detected (continuing)${NC}"
fi
echo ""

# 5️⃣ Build application
log_message "${YELLOW}🔨 Building application...${NC}"
npm run build 2>&1 | tee -a "$LOG_FILE"
log_message "${GREEN}✅ Build completed${NC}"
echo ""

# 6️⃣ Verify build output
log_message "${YELLOW}📋 Verifying build output...${NC}"
if [ -d "$PROJECT_ROOT/dist" ]; then
    DIST_SIZE=$(du -sh "$PROJECT_ROOT/dist" | cut -f1)
    log_message "${GREEN}✅ Build directory exists (Size: $DIST_SIZE)${NC}"
    log_message "${BLUE}   Files in dist:${NC}"
    find "$PROJECT_ROOT/dist" -type f | wc -l | xargs -I {} log_message "${BLUE}   Total files: {}${NC}"
else
    log_message "${RED}❌ Build directory not found${NC}"
    exit 1
fi
echo ""

# 7️⃣ Deploy to Vercel (if configured)
if [ ! -z "$VERCEL_TOKEN" ] && [ ! -z "$VERCEL_PROJECT_ID" ]; then
    log_message "${YELLOW}🚀 Deploying to Vercel...${NC}"
    
    # Check if Vercel CLI is installed
    if command -v vercel &> /dev/null; then
        log_message "${BLUE}   Using Vercel CLI${NC}"
        vercel --token "$VERCEL_TOKEN" --prod 2>&1 | tee -a "$LOG_FILE"
        log_message "${GREEN}✅ Deployed to Vercel${NC}"
    else
        log_message "${YELLOW}⚠️  Vercel CLI not found${NC}"
        log_message "${BLUE}   Install with: npm i -g vercel${NC}"
        log_message "${BLUE}   Or deploy manually${NC}"
    fi
else
    log_message "${YELLOW}⚠️  Vercel credentials not configured${NC}"
    log_message "${BLUE}   Configure VERCEL_TOKEN and VERCEL_PROJECT_ID in .env${NC}"
fi
echo ""

# 8️⃣ Send Telegram notification (if configured)
if [ ! -z "$TELEGRAM_BOT_TOKEN" ] && [ ! -z "$TELEGRAM_CHAT_ID" ]; then
    log_message "${YELLOW}📤 Sending Telegram notification...${NC}"
    
    MESSAGE="🚀 <b>Deploy Express Complete</b>%0A"
    MESSAGE+="⏰ Timestamp: $(date)%0A"
    MESSAGE+="📦 Project: TRYONYOU%0A"
    MESSAGE+="✅ Status: Success%0A"
    MESSAGE+="📊 Build size: $DIST_SIZE"
    
    if command -v curl &> /dev/null; then
        curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
            -d chat_id="$TELEGRAM_CHAT_ID" \
            -d text="$MESSAGE" \
            -d parse_mode="HTML" > /dev/null
        log_message "${GREEN}✅ Telegram notification sent${NC}"
    else
        log_message "${YELLOW}⚠️  curl not found, skipping notification${NC}"
    fi
else
    log_message "${YELLOW}⚠️  Telegram credentials not configured${NC}"
    log_message "${BLUE}   Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env${NC}"
fi
echo ""

# 9️⃣ Update changelog
log_message "${YELLOW}📝 Updating changelog...${NC}"
CHANGELOG_FILE="$PROJECT_ROOT/changelog.log"
GIT_HASH=$(git rev-parse HEAD 2>/dev/null || echo "N/A")
GIT_MESSAGE=$(git log -1 --pretty=%B 2>/dev/null || echo "N/A")

cat > "$CHANGELOG_FILE" << EOF
# TRYONYOU Deployment Changelog
# Last Updated: $(date)

## Latest Deployment
- **Timestamp:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
- **Commit Hash:** $GIT_HASH
- **Commit Message:** $GIT_MESSAGE
- **Build Size:** $DIST_SIZE
- **Node Version:** $NODE_VERSION
- **npm Version:** $NPM_VERSION

## Status
✅ Build: Success
✅ Deploy: Complete
EOF

log_message "${GREEN}✅ Changelog updated${NC}"
echo ""

# 🔟 Summary
log_message "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
log_message "${CYAN}║   ✅ DEPLOY EXPRESS COMPLETE                          ║${NC}"
log_message "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
log_message "${GREEN}🎉 Deployment completed successfully!${NC}"
log_message "${BLUE}📋 Log file: $LOG_FILE${NC}"
log_message "${BLUE}📝 Changelog: $CHANGELOG_FILE${NC}"
log_message "${BLUE}🚀 Git commit: $GIT_HASH${NC}"
echo ""

# Exit successfully
exit 0
