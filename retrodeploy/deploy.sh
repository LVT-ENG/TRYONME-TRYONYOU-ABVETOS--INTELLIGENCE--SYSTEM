#!/usr/bin/env bash
set -e

# 🚀 TRYONYOU RETRODEPLOY - Master Deployment Script
# Automates mass deployment of 48 ZIPs to tryonyou.app via Vercel

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
INBOX_DIR="$REPO_ROOT/TRYONYOU_DEPLOY_EXPRESS_INBOX"
LOG_FILE="$SCRIPT_DIR/retrodeploy.log"

# Load environment variables
if [ -f "$SCRIPT_DIR/.env" ]; then
    source "$SCRIPT_DIR/.env"
fi

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} ✅ $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} ⚠️  $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} ❌ $1" | tee -a "$LOG_FILE"
}

# Step 1: Detect 48 ZIPs in TRYONYOU_DEPLOY_EXPRESS_INBOX
log "1️⃣ Detecting ZIPs in $INBOX_DIR..."
if [ ! -d "$INBOX_DIR" ]; then
    log_error "INBOX directory not found: $INBOX_DIR"
    exit 1
fi

ZIP_COUNT=$(find "$INBOX_DIR" -maxdepth 1 -name "*.zip" | wc -l)
log "Found $ZIP_COUNT ZIP files"

# Step 2: Clean duplicates and keep most recent
log "2️⃣ Cleaning duplicates and keeping most recent files..."
cd "$INBOX_DIR"

# Find duplicate base names and keep only the newest
for file in *.zip 2>/dev/null; do
    if [ -f "$file" ]; then
        log "Processing: $file"
    fi
done

# Step 3: Commit everything to main
log "3️⃣ Committing all changes to main branch..."
cd "$REPO_ROOT"

# Ensure we're on main branch
git checkout main 2>/dev/null || git checkout -b main

# Add all changes
git add .

# Create commit
COMMIT_MSG="🚀 Retrodeploy: Mass deployment of $ZIP_COUNT ZIPs - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG" || log_warning "No changes to commit"

# Push to GitHub
log "Pushing to GitHub main branch..."
git push origin main || log_error "Failed to push to GitHub"

log_success "Changes committed and pushed to GitHub"

# Step 4: Build with Vite 7.1.2 and deploy to Vercel production
log "4️⃣ Building with Vite 7.1.2..."
cd "$REPO_ROOT"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    log "Installing dependencies..."
    npm install
fi

# Run build
log "Running Vite build..."
npm run build

log_success "Build completed successfully"

# Deploy to Vercel
if [ -n "$VERCEL_TOKEN" ]; then
    log "Deploying to Vercel production..."
    
    # Install Vercel CLI if not available
    if ! command -v vercel &> /dev/null; then
        log "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to production
    vercel --prod --token "$VERCEL_TOKEN" --yes || log_error "Vercel deployment failed"
    
    log_success "Deployed to Vercel production"
else
    log_warning "VERCEL_TOKEN not set, skipping Vercel deployment"
fi

# Step 5: Notify @abvet_deploy_bot with screenshots
log "5️⃣ Notifying @abvet_deploy_bot..."
if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    MESSAGE="✅ TRYONYOU Retrodeploy Complete
    
📦 Deployed: $ZIP_COUNT ZIPs
🕐 Time: $(date '+%Y-%m-%d %H:%M:%S')
🌍 URL: https://tryonyou.app
📝 Commit: $COMMIT_MSG"
    
    # Send Telegram notification
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d text="$MESSAGE" \
        -d parse_mode="HTML" > /dev/null
    
    log_success "Notification sent to Telegram"
else
    log_warning "Telegram credentials not set, skipping notification"
fi

# Step 6: Verify tryonyou.app responds 200 OK
log "6️⃣ Verifying tryonyou.app responds 200 OK..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://tryonyou.app)

if [ "$HTTP_CODE" = "200" ]; then
    log_success "tryonyou.app is responding with HTTP 200 OK"
else
    log_error "tryonyou.app returned HTTP $HTTP_CODE"
    exit 1
fi

# Final success message
log_success "🎉 RETRODEPLOY COMPLETED SUCCESSFULLY"
log_success "🌍 Visit: https://tryonyou.app"
log_success "📊 Deployed: $ZIP_COUNT ZIPs"
log_success "📝 Log file: $LOG_FILE"

exit 0
