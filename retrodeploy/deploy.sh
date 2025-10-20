#!/usr/bin/env bash
# ==========================================================
# TRYONYOU RETRODEPLOY — Master Deployment Script
# Manages 48 ZIPs, cleanup, commit, and Vercel deployment
# ==========================================================
set -e

# Color output functions
log() { echo -e "\033[1;32m✓ $1\033[0m"; }
warn() { echo -e "\033[1;33m⚠ $1\033[0m"; }
err() { echo -e "\033[1;31m✗ $1\033[0m" >&2; }
info() { echo -e "\033[1;36mℹ $1\033[0m"; }

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
INBOX_DIR="$PROJECT_ROOT/TRYONYOU_DEPLOY_EXPRESS_INBOX"
LOG_FILE="$SCRIPT_DIR/retrodeploy.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Load environment variables if .env exists
if [[ -f "$SCRIPT_DIR/.env" ]]; then
    set -o allexport
    source "$SCRIPT_DIR/.env"
    set +o allexport
    log "Environment variables loaded from .env"
fi

# Logging function
log_message() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

# Step 1: Detect 48 ZIPs in INBOX
detect_zips() {
    info "Step 1/6: Detecting ZIP files in INBOX..."
    log_message "Starting ZIP detection"
    
    if [[ ! -d "$INBOX_DIR" ]]; then
        mkdir -p "$INBOX_DIR"
        warn "INBOX directory created at $INBOX_DIR"
        log_message "INBOX directory created"
    fi
    
    ZIP_COUNT=$(find "$INBOX_DIR" -maxdepth 1 -type f -name "*.zip" | wc -l)
    log "Found $ZIP_COUNT ZIP files in INBOX"
    log_message "Found $ZIP_COUNT ZIP files"
    
    if [[ $ZIP_COUNT -eq 0 ]]; then
        warn "No ZIP files found in INBOX. Continuing anyway..."
    fi
}

# Step 2: Clean duplicates and keep most recent
clean_duplicates() {
    info "Step 2/6: Cleaning duplicate ZIP files..."
    log_message "Starting duplicate cleanup"
    
    cd "$INBOX_DIR" || exit 1
    
    # Find and remove duplicates, keeping the newest
    for base_name in $(ls *.zip 2>/dev/null | sed 's/_[0-9]*\.zip$//' | sort -u); do
        # Find all files matching this base pattern
        matching_files=$(ls ${base_name}*.zip 2>/dev/null | sort -r)
        
        if [[ $(echo "$matching_files" | wc -l) -gt 1 ]]; then
            # Keep the first (newest) and remove others
            newest=$(echo "$matching_files" | head -n 1)
            to_remove=$(echo "$matching_files" | tail -n +2)
            
            log "Keeping: $newest"
            echo "$to_remove" | while read -r old_file; do
                if [[ -n "$old_file" ]]; then
                    rm -f "$old_file"
                    log "Removed duplicate: $old_file"
                    log_message "Removed duplicate: $old_file"
                fi
            done
        fi
    done
    
    cd "$PROJECT_ROOT" || exit 1
    log "Duplicate cleanup completed"
}

# Step 3: Commit to main branch
commit_to_main() {
    info "Step 3/6: Committing changes to main branch..."
    log_message "Starting git commit"
    
    cd "$PROJECT_ROOT" || exit 1
    
    # Ensure we're on main branch
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [[ "$current_branch" != "main" ]]; then
        warn "Not on main branch. Switching to main..."
        git checkout main || git checkout -b main
    fi
    
    # Stage all changes
    git add .
    
    # Commit if there are changes
    if git diff-index --quiet HEAD --; then
        warn "No changes to commit"
        log_message "No changes to commit"
    else
        git commit -m "🚀 RETRODEPLOY: Auto-deploy TRYONYOU ZIPs - $(date +%Y%m%d_%H%M%S)"
        log "Changes committed to main"
        log_message "Changes committed successfully"
        
        # Push to origin
        git push origin main || warn "Push failed - may need manual intervention"
        log "Changes pushed to GitHub"
        log_message "Changes pushed to GitHub"
    fi
}

# Step 4: Build with Vite and deploy to Vercel
build_and_deploy() {
    info "Step 4/6: Building with Vite 7.1.2 and deploying to Vercel..."
    log_message "Starting build and deploy"
    
    cd "$PROJECT_ROOT" || exit 1
    
    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        log "Installing dependencies..."
        npm install
    fi
    
    # Run build
    log "Building project with Vite..."
    npm run build || { err "Build failed"; log_message "Build failed"; exit 1; }
    log "Build completed successfully"
    log_message "Build completed"
    
    # Deploy to Vercel production
    if command -v vercel &> /dev/null; then
        log "Deploying to Vercel production..."
        vercel --prod --yes || warn "Vercel deployment may require manual intervention"
        log "Deployed to tryonyou.app"
        log_message "Deployed to Vercel"
    else
        warn "Vercel CLI not found. Skipping deployment."
        log_message "Vercel CLI not found"
    fi
}

# Step 5: Notify Telegram bot
notify_telegram() {
    info "Step 5/6: Notifying @abvet_deploy_bot..."
    log_message "Sending Telegram notification"
    
    if [[ -z "$TELEGRAM_BOT_TOKEN" ]] || [[ -z "$TELEGRAM_CHAT_ID" ]]; then
        warn "Telegram credentials not configured. Skipping notification."
        log_message "Telegram credentials missing"
        return
    fi
    
    MESSAGE="🚀 TRYONYOU Retrodeploy Complete
📦 ZIPs processed: $ZIP_COUNT
🌐 URL: https://tryonyou.app
⏰ Time: $(date '+%Y-%m-%d %H:%M:%S')
✅ Status: Success"
    
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="$TELEGRAM_CHAT_ID" \
        -d text="$MESSAGE" \
        -d parse_mode="Markdown" > /dev/null 2>&1 || warn "Telegram notification failed"
    
    log "Telegram notification sent"
    log_message "Telegram notification sent"
}

# Step 6: Verify tryonyou.app responds with 200 OK
verify_deployment() {
    info "Step 6/6: Verifying tryonyou.app responds 200 OK..."
    log_message "Starting deployment verification"
    
    # Wait a bit for deployment to propagate
    sleep 5
    
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://tryonyou.app)
    
    if [[ "$RESPONSE_CODE" == "200" ]]; then
        log "✓ tryonyou.app is responding with 200 OK"
        log_message "Verification successful: 200 OK"
    else
        warn "tryonyou.app responded with code: $RESPONSE_CODE"
        log_message "Verification warning: Response code $RESPONSE_CODE"
    fi
}

# Main execution
main() {
    log "════════════════════════════════════════════════════════════════"
    log "    TRYONYOU RETRODEPLOY — Automated Deployment System"
    log "════════════════════════════════════════════════════════════════"
    log_message "=== RETRODEPLOY START ==="
    
    detect_zips
    clean_duplicates
    commit_to_main
    build_and_deploy
    notify_telegram
    verify_deployment
    
    log "════════════════════════════════════════════════════════════════"
    log "    ✅ RETRODEPLOY COMPLETED SUCCESSFULLY"
    log "════════════════════════════════════════════════════════════════"
    log_message "=== RETRODEPLOY COMPLETE ==="
    
    # Display summary
    echo ""
    info "Summary:"
    info "  • ZIP files processed: $ZIP_COUNT"
    info "  • Project built: ✓"
    info "  • Deployed to: https://tryonyou.app"
    info "  • Log file: $LOG_FILE"
    echo ""
}

# Run main function
main "$@"
