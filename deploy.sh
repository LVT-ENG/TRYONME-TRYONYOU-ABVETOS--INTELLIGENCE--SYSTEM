#!/usr/bin/env bash
set -euo pipefail

# ──────────── TRYONYOU – ABVETOS – ULTIMATUM ────────────
# Advanced Deployment Script with Full Automation
# Repository: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
# Domains: tryonyou.app | www.tryonyou.app

# ═══════════════════════════════════════════════════════════
# CONFIGURATION AND CONSTANTS
# ═══════════════════════════════════════════════════════════

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_NAME="tryonyou-abvetos-intelligence-system"
readonly REPO_NAME="LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
readonly BRANCH="main"

# Environment Variables with Defaults
export VERCEL_TOKEN="${VERCEL_TOKEN:-}"
export TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
export TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-@abvet_deploy_bot}"
export DOMAIN_PRIMARY="${DOMAIN_PRIMARY:-tryonyou.app}"
export DOMAIN_WWW="${DOMAIN_WWW:-www.tryonyou.app}"

# Colors for output
readonly GOLD='\033[38;5;178m'
readonly PEACOCK='\033[38;5;30m'
readonly GREEN='\033[32m'
readonly RED='\033[31m'
readonly BLUE='\033[34m'
readonly YELLOW='\033[33m'
readonly RESET='\033[0m'

# ═══════════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ═══════════════════════════════════════════════════════════

log_info() {
    printf "${BLUE}ℹ️  %s${RESET}\n" "$1"
}

log_success() {
    printf "${GREEN}✅ %s${RESET}\n" "$1"
}

log_warning() {
    printf "${YELLOW}⚠️  %s${RESET}\n" "$1"
}

log_error() {
    printf "${RED}❌ %s${RESET}\n" "$1"
}

log_header() {
    printf "${GOLD}╔══════════════════════════════════════════════════════════╗${RESET}\n"
    printf "${GOLD}║ %-56s ║${RESET}\n" "$1"
    printf "${GOLD}╚══════════════════════════════════════════════════════════╝${RESET}\n"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validate required environment variables
validate_environment() {
    local missing_vars=()
    
    if [[ -z "$VERCEL_TOKEN" ]]; then
        missing_vars+=("VERCEL_TOKEN")
    fi
    
    if [[ -z "$TELEGRAM_BOT_TOKEN" ]]; then
        missing_vars+=("TELEGRAM_BOT_TOKEN")
    fi
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        log_error "Missing required environment variables: ${missing_vars[*]}"
        log_info "Please set the following environment variables:"
        for var in "${missing_vars[@]}"; do
            printf "  export %s=your_token_here\n" "$var"
        done
        exit 1
    fi
}

# Send notification to Telegram
send_notification() {
    local message="$1"
    local commit_hash
    local timestamp
    local full_message
    
    if [[ -n "$TELEGRAM_BOT_TOKEN" ]]; then
        commit_hash=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
        timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        
        full_message="$message
📦 Project: $PROJECT_NAME
🔗 Repository: $REPO_NAME
📝 Commit: $commit_hash
⏰ Time: $timestamp
🌐 Primary: https://$DOMAIN_PRIMARY
🌐 WWW: https://$DOMAIN_WWW"
        
        if curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
            -d "chat_id=$TELEGRAM_CHAT_ID" \
            -d "text=$full_message" \
            -d "parse_mode=HTML" > /dev/null; then
            log_success "Notification sent to $TELEGRAM_CHAT_ID"
        else
            log_warning "Failed to send Telegram notification"
        fi
    else
        log_warning "Telegram bot token not configured"
    fi
}

# ═══════════════════════════════════════════════════════════
# SETUP AND PREPARATION FUNCTIONS
# ═══════════════════════════════════════════════════════════

setup_environment() {
    log_info "Setting up deployment environment..."
    
    # Ensure we're in the correct directory
    cd "$SCRIPT_DIR"
    
    # Check required commands
    local required_commands=("node" "npm" "git")
    for cmd in "${required_commands[@]}"; do
        if ! command_exists "$cmd"; then
            log_error "Required command not found: $cmd"
            exit 1
        fi
    done
    
    # Install Vercel CLI if not present
    if ! command_exists "vercel"; then
        log_info "Installing Vercel CLI..."
        npm install -g vercel@latest
    fi
    
    log_success "Environment setup completed"
}

clean_workspace() {
    log_info "Cleaning workspace..."
    
    # Remove old build artifacts
    rm -rf dist/ node_modules/ package-lock.json
    
    # Clean git working directory
    if git status --porcelain | grep -q .; then
        log_warning "Working directory has uncommitted changes"
        git status --short
    fi
    
    log_success "Workspace cleaned"
}

install_dependencies() {
    log_info "Installing dependencies..."
    
    # Ensure package.json exists
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found"
        exit 1
    fi
    
    # Install dependencies
    npm install
    
    log_success "Dependencies installed"
}

# ═══════════════════════════════════════════════════════════
# BUILD FUNCTIONS
# ═══════════════════════════════════════════════════════════

build_project() {
    log_info "Building project for production..."
    
    # Run build command
    npm run build
    
    # Verify build output
    if [[ ! -d "dist" ]]; then
        log_error "Build failed - dist directory not found"
        exit 1
    fi
    
    log_success "Project built successfully"
}

# ═══════════════════════════════════════════════════════════
# DEPLOYMENT FUNCTIONS
# ═══════════════════════════════════════════════════════════

deploy_to_vercel() {
    local deployment_type="$1"
    
    log_info "Deploying to Vercel ($deployment_type)..."
    
    # Configure Vercel project
    cat > vercel.json <<EOF
{
  "name": "$PROJECT_NAME",
  "version": 2,
  "builds": [
    {
      "src": "apps/web/index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/apps/web/\$1"
    }
  ],
  "alias": [
    "$DOMAIN_PRIMARY",
    "$DOMAIN_WWW"
  ]
}
EOF
    
    # Deploy to production
    local deploy_output
    deploy_output=$(vercel --prod --token "$VERCEL_TOKEN" --yes 2>&1)
    
    # Extract deployment URL
    local deploy_url
    deploy_url=$(echo "$deploy_output" | grep -Eo 'https://[a-zA-Z0-9.-]+\.vercel\.app' | tail -n1)
    
    if [[ -n "$deploy_url" ]]; then
        log_success "Deployed to: $deploy_url"
        echo "$deploy_url" > .deploy_url
    else
        log_error "Failed to extract deployment URL"
        echo "$deploy_output"
        exit 1
    fi
}

configure_domains() {
    log_info "Configuring custom domains..."
    
    # Add domains to Vercel project
    vercel domains add "$DOMAIN_PRIMARY" --token "$VERCEL_TOKEN" 2>/dev/null || log_info "Domain $DOMAIN_PRIMARY already exists"
    vercel domains add "$DOMAIN_WWW" --token "$VERCEL_TOKEN" 2>/dev/null || log_info "Domain $DOMAIN_WWW already exists"
    
    log_success "Domains configured"
}

# ═══════════════════════════════════════════════════════════
# SPECIALIZED DEPLOYMENT FUNCTIONS
# ═══════════════════════════════════════════════════════════

deploy_docs() {
    log_header "DEPLOYING DOCUMENTATION"
    
    # Create documentation structure
    mkdir -p src/docs/{api,guides,examples}
    
    # Generate documentation files
    cat > src/docs/README.md <<EOF
# TRYONYOU – ABVETOS Documentation

## Overview
Complete documentation for the TRYONYOU–ABVETOS Intelligence System.

## Modules
- Avatar 3D Generation
- Fabric Fit Comparator
- Smart Wardrobe
- Solidarity Wardrobe
- ABVET Biometric Payment
- Fashion Trend Tracker
- Creative Auto-Production
- LiveIt Factory Orchestration

## Getting Started
Visit our [API documentation](./api/) for technical details.
EOF
    
    deploy_to_vercel "docs"
    log_success "Documentation deployed successfully"
}

deploy_video() {
    log_header "DEPLOYING VIDEO CONTENT"
    
    # Create video content structure
    mkdir -p src/media/{videos,images,assets}
    
    # Generate video content placeholder
    cat > src/media/README.md <<EOF
# TRYONYOU – ABVETOS Media Content

## Video Assets
- Product demonstrations
- Tutorial videos
- Marketing materials

## Image Assets
- Product screenshots
- UI mockups
- Brand assets
EOF
    
    deploy_to_vercel "video"
    log_success "Video content deployed successfully"
}

deploy_complete_system() {
    log_header "DEPLOYING COMPLETE SYSTEM"
    
    # Deploy all components
    deploy_docs
    deploy_video
    deploy_to_vercel "complete"
    configure_domains
    
    log_success "Complete system deployed successfully"
}

# ═══════════════════════════════════════════════════════════
# MONITORING AND HEALTH CHECK
# ═══════════════════════════════════════════════════════════

health_check() {
    log_info "Performing health check..."
    
    local urls=("https://$DOMAIN_PRIMARY" "https://$DOMAIN_WWW")
    
    for url in "${urls[@]}"; do
        if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
            log_success "$url is responding"
        else
            log_warning "$url is not responding properly"
        fi
    done
}

# ═══════════════════════════════════════════════════════════
# MAIN DEPLOYMENT LOGIC
# ═══════════════════════════════════════════════════════════

main() {
    local deployment_type="${1:-all}"
    
    log_header "TRYONYOU – ABVETOS – ULTIMATUM DEPLOYMENT"
    log_info "Deployment type: $deployment_type"
    
    # Validate environment
    validate_environment
    
    # Setup and preparation
    setup_environment
    clean_workspace
    install_dependencies
    build_project
    
    # Execute deployment based on type
    case "$deployment_type" in
        "docs")
            deploy_docs
            ;;
        "video")
            deploy_video
            ;;
        "all")
            deploy_complete_system
            ;;
        *)
            log_error "Unknown deployment type: $deployment_type"
            log_info "Available types: docs, video, all"
            exit 1
            ;;
    esac
    
    # Post-deployment tasks
    health_check
    
    # Send notification
    send_notification "🚀 Deployment completed successfully ($deployment_type)"
    
    log_header "DEPLOYMENT COMPLETED SUCCESSFULLY"
    log_success "Primary URL: https://$DOMAIN_PRIMARY"
    log_success "WWW URL: https://$DOMAIN_WWW"
}

# ═══════════════════════════════════════════════════════════
# SCRIPT EXECUTION
# ═══════════════════════════════════════════════════════════

# Handle script interruption
trap 'log_error "Deployment interrupted"; exit 1' INT TERM

# Execute main function with all arguments
main "$@"
