#!/bin/bash

###############################################################################
# ABVETOS Dashboard Auto-Deploy Script
# 
# This script automates the deployment process for the ABVETOS Dashboard:
# 1. Cleans previous build artifacts
# 2. Installs dependencies
# 3. Builds the dashboard
# 4. Deploys to Vercel production
# 5. Sends notification to Telegram
# 6. Captures screenshots (desktop & mobile)
#
# Usage: ./deploy_abvetos_dashboard.sh
###############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DASHBOARD_DIR="TRYONYOU_ABVETOS_DASHBOARD_SYNC/apps/web/src/dashboard/abvetos-dashboard"
DEPLOY_INBOX="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running from correct directory
check_directory() {
    if [ ! -d "$DASHBOARD_DIR" ]; then
        log_error "Dashboard directory not found: $DASHBOARD_DIR"
        log_info "Please run this script from the repository root"
        exit 1
    fi
    log_success "Dashboard directory found"
}

# Step 1: Clean previous build
clean_build() {
    log_info "Cleaning previous build artifacts..."
    
    if [ -d "dist" ]; then
        rm -rf dist
        log_success "Removed dist directory"
    fi
    
    if [ -d ".vercel" ]; then
        rm -rf .vercel
        log_success "Removed .vercel directory"
    fi
    
    log_success "Build cleanup completed"
}

# Step 2: Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    
    if command -v npm &> /dev/null; then
        npm install
        log_success "Dependencies installed successfully"
    else
        log_error "npm not found. Please install Node.js and npm"
        exit 1
    fi
}

# Step 3: Build dashboard
build_dashboard() {
    log_info "Building dashboard..."
    
    npm run build
    
    if [ ! -d "dist" ]; then
        log_error "Build failed - dist directory not created"
        exit 1
    fi
    
    log_success "Dashboard built successfully"
}

# Step 4: Deploy to Vercel
deploy_to_vercel() {
    log_info "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    # Deploy to production
    vercel --prod --yes
    
    log_success "Deployed to Vercel successfully"
}

# Step 5: Capture screenshots
capture_screenshots() {
    log_info "Capturing screenshots..."
    
    # This requires puppeteer or similar tool
    # For now, we'll skip this in the script
    # Screenshots will be handled by GitHub Actions workflow
    
    log_warning "Screenshots will be captured by GitHub Actions workflow"
}

# Step 6: Send Telegram notification
send_telegram_notification() {
    log_info "Sending Telegram notification..."
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        log_warning "Telegram credentials not configured"
        log_info "Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables"
        return
    fi
    
    COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
    TIMESTAMP=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
    AUTHOR=$(git config user.name 2>/dev/null || echo "Unknown")
    
    MESSAGE="🚀 *ABVETOS Dashboard Deployed*

✅ *Status:* Deployment Successful
🌐 *URL:* https://tryonyou.app
📦 *Commit:* ${COMMIT_HASH}
👤 *Author:* ${AUTHOR}
⏰ *Time:* ${TIMESTAMP}

🤖 Auto-deploy completed successfully"

    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d parse_mode="Markdown" \
        -d text="$MESSAGE" > /dev/null
    
    log_success "Telegram notification sent"
}

# Main execution
main() {
    log_info "Starting ABVETOS Dashboard deployment..."
    echo ""
    
    check_directory
    clean_build
    install_dependencies
    build_dashboard
    deploy_to_vercel
    capture_screenshots
    send_telegram_notification
    
    echo ""
    log_success "🎉 Deployment completed successfully!"
    log_info "Dashboard is live at: https://tryonyou.app"
}

# Run main function
main
