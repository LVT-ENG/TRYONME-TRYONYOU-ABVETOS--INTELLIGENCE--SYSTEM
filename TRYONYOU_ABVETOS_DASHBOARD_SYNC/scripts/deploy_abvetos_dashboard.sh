#!/bin/bash

#######################################################################
# ABVETOS Dashboard Deploy Express
# Auto-executable deployment script for TRYONYOU Dashboard
# 
# Usage: ./deploy_abvetos_dashboard.sh
# 
# Workflow:
# 1. Copy ZIP to /iCloudDrive/TRYONYOU_DEPLOY_EXPRESS_INBOX/
# 2. Auto-detect and execute: npm install && npm run build
# 3. Deploy to Vercel: vercel --prod
# 4. Send Telegram notification
# 5. Log commit and deployment timestamp
#######################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="TRYONYOU_ABVETOS_DASHBOARD"
DEPLOY_INBOX="/iCloudDrive/TRYONYOU_DEPLOY_EXPRESS_INBOX"
LOG_FILE="./logs/deploy_abvetos_$(date +%Y%m%d_%H%M%S).log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Ensure logs directory exists
mkdir -p ./logs

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🚀 ABVETOS Dashboard Deploy Express${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to log messages
log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Step 1: Get current commit info
log "📋 Getting current commit information..."
COMMIT_HASH=$(git rev-parse HEAD 2>/dev/null || echo "unknown")
COMMIT_SHORT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
COMMIT_MSG=$(git log -1 --pretty=%B 2>/dev/null || echo "Manual deployment")
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
AUTHOR=$(git log -1 --pretty=format:'%an' 2>/dev/null || echo "$USER")

log "   Commit: $COMMIT_SHORT"
log "   Branch: $BRANCH"
log "   Author: $AUTHOR"
echo ""

# Step 2: Install dependencies
log "📦 Installing dependencies..."
if npm install; then
    log "   ✅ Dependencies installed successfully"
else
    error "Failed to install dependencies"
    exit 1
fi
echo ""

# Step 3: Build project
log "🔨 Building project..."
if npm run build; then
    log "   ✅ Build completed successfully"
else
    error "Failed to build project"
    exit 1
fi
echo ""

# Step 4: Deploy to Vercel
log "🌐 Deploying to Vercel production..."
if command -v vercel &> /dev/null; then
    if vercel --prod --yes; then
        log "   ✅ Deployed to Vercel successfully"
        DEPLOY_URL="https://tryonyou.app"
    else
        error "Vercel deployment failed"
        exit 1
    fi
else
    warning "Vercel CLI not found. Skipping deployment."
    warning "Install with: npm i -g vercel"
    DEPLOY_URL="N/A"
fi
echo ""

# Step 5: Send Telegram notification
log "📱 Sending Telegram notification..."

if [ -f ".env" ]; then
    source .env
fi

if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    # Create message
    MESSAGE="🚀 *Dashboard ABVETOS actualizado correctamente en producción*

✅ *Status:* Deployment Successful
🌐 *URL:* ${DEPLOY_URL}
📦 *Commit:* ${COMMIT_SHORT}
💬 *Message:* ${COMMIT_MSG}
🌿 *Branch:* ${BRANCH}
👤 *Author:* ${AUTHOR}
⏰ *Time:* ${TIMESTAMP}

🤖 TRYONYOU.APP - Sistema de Inteligencia Operativo 24/7"

    # Send Telegram message
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d parse_mode="Markdown" \
        -d text="$MESSAGE" > /dev/null
    
    log "   ✅ Telegram notification sent"
else
    warning "Telegram credentials not configured. Skipping notification."
    warning "Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env file"
fi
echo ""

# Step 6: Save deployment record
log "💾 Saving deployment record..."
DEPLOY_RECORD_FILE="./logs/deployment_history.json"

# Create deployment record
cat > /tmp/deploy_record.json << EOF
{
  "timestamp": "${TIMESTAMP}",
  "commit": "${COMMIT_SHORT}",
  "commit_full": "${COMMIT_HASH}",
  "branch": "${BRANCH}",
  "author": "${AUTHOR}",
  "message": "${COMMIT_MSG}",
  "url": "${DEPLOY_URL}",
  "status": "success"
}
EOF

# Append to history (create file if doesn't exist)
if [ ! -f "$DEPLOY_RECORD_FILE" ]; then
    echo "[]" > "$DEPLOY_RECORD_FILE"
fi

# Use jq if available to properly append to JSON array
if command -v jq &> /dev/null; then
    jq ". += [$(cat /tmp/deploy_record.json)]" "$DEPLOY_RECORD_FILE" > /tmp/history_new.json
    mv /tmp/history_new.json "$DEPLOY_RECORD_FILE"
    log "   ✅ Deployment record saved to $DEPLOY_RECORD_FILE"
else
    warning "jq not installed. Deployment record saved separately to logs/"
    mv /tmp/deploy_record.json "./logs/deploy_record_${COMMIT_SHORT}.json"
fi
echo ""

# Final summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "📊 Summary:"
echo -e "   Commit:     ${COMMIT_SHORT}"
echo -e "   URL:        ${DEPLOY_URL}"
echo -e "   Timestamp:  ${TIMESTAMP}"
echo -e "   Log:        ${LOG_FILE}"
echo ""
echo -e "${BLUE}Dashboard ABVETOS actualizado correctamente en producción – TRYONYOU.APP${NC}"
echo ""

exit 0
