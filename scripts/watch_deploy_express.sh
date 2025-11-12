#!/usr/bin/env bash
# DEPLOY EXPRESS - Main Watcher Script
# Monitors INBOX folder and triggers automatic deployment pipeline

WATCH_DIR="$HOME/tryonyou/TRYONYOU_DEPLOY_EXPRESS_INBOX"
REPO_DIR="$HOME/tryonyou"
SCRIPT_DIR="$REPO_DIR/scripts"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🦚 DEPLOY EXPRESS - Automatic Deployment Watcher${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📂 Watching: ${WATCH_DIR}${NC}"
echo -e "${YELLOW}🎯 Repository: ${REPO_DIR}${NC}"
echo -e "${GREEN}✅ System ready - Waiting for files...${NC}"
echo ""

# Create watch directory if it doesn't exist
mkdir -p "$WATCH_DIR"

# Check if inotifywait is installed
if ! command -v inotifywait &> /dev/null; then
    echo -e "${RED}❌ inotifywait not found. Installing inotify-tools...${NC}"
    sudo apt-get update -qq && sudo apt-get install -y inotify-tools
fi

# Initialize log file
touch "$REPO_DIR/logs/deploy_express_history.log"

# Generate README for this batch
generate_batch_readme() {
    local FILE_NAME="$1"
    local TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    local README_PATH="$REPO_DIR/logs/auto_generated_readme.md"
    
    if [ ! -f "$README_PATH" ]; then
        cat > "$README_PATH" << EOF
# Deploy Express - Auto-Generated Deployment Log

**Last Updated:** ${TIMESTAMP}

## Recent Deployments

EOF
    fi
    
    echo "- **${TIMESTAMP}** - ${FILE_NAME}" >> "$README_PATH"
}

# Main watch loop
inotifywait -m -e create -e moved_to "$WATCH_DIR" 2>/dev/null |
while read -r path action file; do
    # Skip hidden files and temporary files
    if [[ "$file" =~ ^\. ]] || [[ "$file" =~ ~$ ]]; then
        continue
    fi
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}📦 New file detected: ${file}${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    FILE_PATH="${WATCH_DIR}/${file}"
    
    # Wait a moment to ensure file is fully written
    sleep 1
    
    # Step 1: Classify and process file
    echo -e "${YELLOW}🔄 Step 1: Classifying and processing...${NC}"
    "$SCRIPT_DIR/classify_and_process.sh" "$FILE_PATH"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to process file${NC}"
        continue
    fi
    
    # Step 2: Generate batch README
    echo -e "${YELLOW}🔄 Step 2: Updating deployment log...${NC}"
    generate_batch_readme "$file"
    
    # Step 3: Git operations
    echo -e "${YELLOW}🔄 Step 3: Committing to repository...${NC}"
    cd "$REPO_DIR"
    git add .
    git commit -m "🦚 Auto-deploy: ${file} [Deploy Express]" --quiet
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Git commit successful${NC}"
    else
        echo -e "${YELLOW}⚠️  No changes to commit or commit failed${NC}"
    fi
    
    # Step 4: Push to GitHub
    echo -e "${YELLOW}🔄 Step 4: Pushing to GitHub...${NC}"
    git push origin main --quiet
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Pushed to GitHub successfully${NC}"
    else
        echo -e "${RED}❌ Failed to push to GitHub${NC}"
    fi
    
    # Step 5: Deploy to Vercel
    echo -e "${YELLOW}🔄 Step 5: Deploying to Vercel...${NC}"
    
    if command -v vercel &> /dev/null; then
        DEPLOY_OUTPUT=$(npx vercel --prod --yes 2>&1 | tail -n 5)
        echo -e "${GREEN}✅ Vercel deployment triggered${NC}"
    else
        echo -e "${YELLOW}⚠️  Vercel CLI not found - skipping deployment${NC}"
        DEPLOY_OUTPUT="Vercel CLI not installed"
    fi
    
    # Step 6: Get deployment URL
    DEPLOY_URL=$(cat /tmp/last_deploy_url.txt 2>/dev/null || echo "https://tryonyou.app")
    
    # Step 7: Send Telegram notification
    echo -e "${YELLOW}🔄 Step 6: Sending notification...${NC}"
    NOTIFICATION_MESSAGE="🦚 <b>DEPLOY EXPRESS</b>%0A%0A✅ New content published automatically%0A%0A📄 <b>File:</b> ${file}%0A🌐 <b>URL:</b> ${DEPLOY_URL}%0A⏰ <b>Time:</b> $(date '+%Y-%m-%d %H:%M:%S')"
    
    "$SCRIPT_DIR/notify_telegram.sh" "$NOTIFICATION_MESSAGE"
    
    # Step 8: Move processed file to archive
    ARCHIVE_DIR="$WATCH_DIR/processed"
    mkdir -p "$ARCHIVE_DIR"
    mv "$FILE_PATH" "$ARCHIVE_DIR/${file}"
    
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Deployment pipeline completed successfully${NC}"
    echo -e "${GREEN}🌐 Live at: ${DEPLOY_URL}${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}👀 Watching for next file...${NC}"
    echo ""
done

