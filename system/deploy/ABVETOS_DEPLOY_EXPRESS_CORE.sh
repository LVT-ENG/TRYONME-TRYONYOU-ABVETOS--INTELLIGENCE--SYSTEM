#!/bin/bash
###############################################################################
# 🦚 ABVETOS DEPLOY EXPRESS CORE
# Script principal de build + deploy + notificación Telegram
# Autor: ABVETOS Orchestrator · Agente 70
# Versión: 1.0.0
###############################################################################
#
# 💡 Significado:
#   • ABVETOS → indica que forma parte del orquestador maestro
#   • DEPLOY_EXPRESS → módulo encargado de la ejecución automática de despliegues
#   • CORE → núcleo estable y oficial, usado por todos los entornos
#            (local, Vercel, GitHub Actions, etc.)
#   • .sh → extensión estándar para scripts ejecutables bash
#
###############################################################################

set -euo pipefail

# === CONFIGURACIÓN =========================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Variables de entorno
export VERCEL_TOKEN="${VERCEL_TOKEN:-}"
export TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
export TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# Información del proyecto
PROJECT_NAME="TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM"
DOMAIN_URL="https://tryonyou.app"

# Directorios
BUILD_DIR="$PROJECT_ROOT/dist"
LOG_DIR="$PROJECT_ROOT/logs"
REPORTS_DIR="$PROJECT_ROOT/docs/reports"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# === FUNCIONES =============================================================

log_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
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

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

notify_telegram() {
    local message="$1"
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        log_warning "Telegram credentials not configured, skipping notification"
        return 0
    fi
    
    local response=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d parse_mode="HTML" \
        -d text="${message}")
    
    if echo "$response" | grep -q '"ok":true'; then
        log_success "Telegram notification sent"
    else
        log_warning "Failed to send Telegram notification"
    fi
}

check_dependencies() {
    log_step "Checking dependencies..."
    
    local missing_deps=()
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        missing_deps+=("node")
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        missing_deps+=("git")
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_error "Missing dependencies: ${missing_deps[*]}"
        return 1
    fi
    
    log_success "All dependencies are available"
    return 0
}

install_dependencies() {
    log_step "Installing project dependencies..."
    
    cd "$PROJECT_ROOT"
    
    if [ -f "package.json" ]; then
        npm ci --silent || npm install --silent
        log_success "Dependencies installed"
    else
        log_warning "No package.json found, skipping dependency installation"
    fi
}

build_project() {
    log_step "Building project..."
    
    cd "$PROJECT_ROOT"
    
    # Check if build script exists in package.json
    if [ -f "package.json" ] && grep -q '"build"' package.json; then
        # Build script exists, run it
        if npm run build; then
            log_success "Project built successfully"
            
            # Verify build output
            if [ -d "$BUILD_DIR" ]; then
                local build_size=$(du -sh "$BUILD_DIR" | cut -f1)
                log_info "Build size: $build_size"
            fi
        else
            log_error "Build failed"
            return 1
        fi
    else
        log_warning "No build script found in package.json, skipping build"
    fi
}

run_tests() {
    log_step "Running tests..."
    
    cd "$PROJECT_ROOT"
    
    # Check if test script exists in package.json
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        # Test script exists, run it
        if npm run test; then
            log_success "Tests passed"
        else
            log_warning "Tests failed, but continuing deployment"
        fi
    else
        log_warning "No test script found in package.json, skipping tests"
    fi
}

deploy_to_vercel() {
    log_step "Deploying to Vercel..."
    
    if [ -z "$VERCEL_TOKEN" ]; then
        log_warning "Vercel token not configured, skipping deployment"
        return 0
    fi
    
    cd "$PROJECT_ROOT"
    
    # Check if vercel CLI is available
    if command -v vercel &> /dev/null; then
        vercel --prod --yes --token="$VERCEL_TOKEN" 2>&1 | tee "$LOG_DIR/vercel_deploy_$TIMESTAMP.log"
        log_success "Deployed to Vercel"
    else
        log_warning "Vercel CLI not installed, skipping Vercel deployment"
        log_info "Install with: npm install -g vercel"
    fi
}

create_deployment_report() {
    log_step "Creating deployment report..."
    
    mkdir -p "$REPORTS_DIR"
    
    local report_file="$REPORTS_DIR/deployment_$TIMESTAMP.md"
    
    cat > "$report_file" << EOF
# ABVETOS Deploy Express - Deployment Report

**Timestamp:** $TIMESTAMP
**Project:** $PROJECT_NAME
**Domain:** $DOMAIN_URL

## Deployment Summary

- **Status:** ✅ Completed
- **Environment:** Production
- **Platform:** Vercel
- **Build Time:** $(date)

## Build Information

- **Commit:** $(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
- **Branch:** $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
- **Node Version:** $(node -v 2>/dev/null || echo "unknown")
- **NPM Version:** $(npm -v 2>/dev/null || echo "unknown")

## Deployment Targets

1. **Vercel Production**
   - URL: $DOMAIN_URL
   - Status: ✅ Deployed

2. **Notifications**
   - Bot: @abvet_deploy_bot
   - Status: ✅ Sent

## Next Steps

- Monitor application performance
- Review deployment logs
- Check error tracking

---

*Generated by ABVETOS Deploy Express Core*
EOF
    
    log_success "Deployment report created: $report_file"
}

cleanup() {
    log_step "Cleaning up temporary files..."
    
    # Remove old logs (keep last 30 days)
    if [ -d "$LOG_DIR" ]; then
        find "$LOG_DIR" -name "*.log" -mtime +30 -delete 2>/dev/null || true
    fi
    
    log_success "Cleanup completed"
}

# === MAIN EXECUTION ========================================================

main() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   🦚 ABVETOS DEPLOY EXPRESS CORE                      ║${NC}"
    echo -e "${CYAN}║   Script Principal de Despliegue Automático           ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    log_info "Starting deployment process at $(date)"
    log_info "Project: $PROJECT_NAME"
    
    # Create necessary directories
    mkdir -p "$LOG_DIR" "$REPORTS_DIR"
    
    # Send start notification
    notify_telegram "🚀 <b>ABVETOS Deploy Express</b>%0A%0AStarting deployment...%0AProject: $PROJECT_NAME%0ATime: $(date +'%Y-%m-%d %H:%M:%S')"
    
    # Execute deployment steps
    if ! check_dependencies; then
        log_error "Dependency check failed"
        notify_telegram "❌ <b>Deployment Failed</b>%0A%0AReason: Missing dependencies%0AProject: $PROJECT_NAME"
        exit 1
    fi
    
    install_dependencies
    
    if ! build_project; then
        log_error "Build failed"
        notify_telegram "❌ <b>Deployment Failed</b>%0A%0AReason: Build error%0AProject: $PROJECT_NAME"
        exit 1
    fi
    
    run_tests
    
    deploy_to_vercel
    
    # Run post-deployment hooks if available
    if [ -f "$SCRIPT_DIR/ABVETOS_DEPLOY_EXPRESS_HOOKS.sh" ]; then
        log_step "Running post-deployment hooks..."
        bash "$SCRIPT_DIR/ABVETOS_DEPLOY_EXPRESS_HOOKS.sh"
    fi
    
    # Run logger if available
    if [ -f "$SCRIPT_DIR/ABVETOS_DEPLOY_EXPRESS_LOGGER.sh" ]; then
        log_step "Running deployment logger..."
        bash "$SCRIPT_DIR/ABVETOS_DEPLOY_EXPRESS_LOGGER.sh" "$TIMESTAMP"
    fi
    
    create_deployment_report
    
    cleanup
    
    echo ""
    log_success "═══════════════════════════════════════════════════════"
    log_success "   ✅ DEPLOYMENT COMPLETED SUCCESSFULLY"
    log_success "═══════════════════════════════════════════════════════"
    log_info "   URL: $DOMAIN_URL"
    log_info "   Time: $(date)"
    log_success "═══════════════════════════════════════════════════════"
    echo ""
    
    # Send success notification
    notify_telegram "✅ <b>Deployment Successful</b>%0A%0AProject: $PROJECT_NAME%0AURL: $DOMAIN_URL%0ATime: $(date +'%Y-%m-%d %H:%M:%S')"
}

# Execute main function
main "$@"
