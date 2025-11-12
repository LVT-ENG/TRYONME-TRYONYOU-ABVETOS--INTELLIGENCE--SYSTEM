#!/bin/bash
###############################################################################
# 🦚 ABVETOS DEPLOY EXPRESS TEST
# Script de prueba - verifica conexión Telegram y tokens
# Autor: ABVETOS Orchestrator · Agente 70
# Versión: 1.0.0
###############################################################################
#
# 💡 Propósito:
#   • Verificar conectividad con Telegram Bot API
#   • Validar tokens de autenticación (Telegram, Vercel)
#   • Realizar pruebas de pre-despliegue
#   • Verificar configuración del entorno
#
###############################################################################

set -euo pipefail

# === CONFIGURACIÓN =========================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Variables de entorno
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"
VERCEL_TOKEN="${VERCEL_TOKEN:-}"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# === FUNCIONES =============================================================

log_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

log_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

test_telegram_token() {
    log_test "Testing Telegram Bot Token..."
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
        log_error "TELEGRAM_BOT_TOKEN is not set"
        return 1
    fi
    
    # Test Telegram API connectivity
    local response=$(curl -s -X GET "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe")
    
    if echo "$response" | grep -q '"ok":true'; then
        local bot_name=$(echo "$response" | grep -o '"username":"[^"]*' | cut -d'"' -f4)
        log_success "Telegram Bot Token is valid"
        log_info "Bot username: @${bot_name}"
        return 0
    else
        log_error "Telegram Bot Token is invalid or API is unreachable"
        log_info "Response: $response"
        return 1
    fi
}

test_telegram_chat_id() {
    log_test "Testing Telegram Chat ID..."
    
    if [ -z "$TELEGRAM_CHAT_ID" ]; then
        log_error "TELEGRAM_CHAT_ID is not set"
        return 1
    fi
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
        log_error "Cannot test Chat ID without Bot Token"
        return 1
    fi
    
    log_success "Telegram Chat ID is set: $TELEGRAM_CHAT_ID"
    return 0
}

test_telegram_message() {
    log_test "Sending test message to Telegram..."
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        log_error "Telegram credentials not configured"
        return 1
    fi
    
    local test_message="🧪 <b>ABVETOS Test Message</b>%0A%0AThis is a test message from ABVETOS_DEPLOY_EXPRESS_TEST.sh%0A%0ATime: $(date +'%Y-%m-%d %H:%M:%S')%0AStatus: ✅ Testing successful"
    
    local response=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d parse_mode="HTML" \
        -d text="${test_message}")
    
    if echo "$response" | grep -q '"ok":true'; then
        log_success "Test message sent successfully to Telegram"
        return 0
    else
        log_error "Failed to send test message"
        log_info "Response: $response"
        return 1
    fi
}

test_vercel_token() {
    log_test "Testing Vercel Token..."
    
    if [ -z "$VERCEL_TOKEN" ]; then
        log_warning "VERCEL_TOKEN is not set (optional)"
        return 0
    fi
    
    # Test Vercel API connectivity
    if command -v curl &> /dev/null; then
        local response=$(curl -s -H "Authorization: Bearer ${VERCEL_TOKEN}" \
            "https://api.vercel.com/v2/user" 2>&1)
        
        if echo "$response" | grep -q '"user"'; then
            local username=$(echo "$response" | grep -o '"username":"[^"]*' | cut -d'"' -f4 | head -1)
            log_success "Vercel Token is valid"
            log_info "User: ${username}"
            return 0
        else
            log_error "Vercel Token is invalid or API is unreachable"
            return 1
        fi
    else
        log_warning "curl not available, skipping Vercel API test"
        return 0
    fi
}

test_environment() {
    log_test "Testing environment configuration..."
    
    local all_ok=true
    
    # Check Node.js
    if command -v node &> /dev/null; then
        local node_version=$(node -v)
        log_success "Node.js installed: $node_version"
    else
        log_error "Node.js not found"
        all_ok=false
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        local npm_version=$(npm -v)
        log_success "npm installed: $npm_version"
    else
        log_error "npm not found"
        all_ok=false
    fi
    
    # Check git
    if command -v git &> /dev/null; then
        local git_version=$(git --version)
        log_success "git installed: $git_version"
    else
        log_error "git not found"
        all_ok=false
    fi
    
    # Check curl
    if command -v curl &> /dev/null; then
        local curl_version=$(curl --version | head -1)
        log_success "curl installed: $curl_version"
    else
        log_error "curl not found"
        all_ok=false
    fi
    
    if [ "$all_ok" = true ]; then
        return 0
    else
        return 1
    fi
}

test_network_connectivity() {
    log_test "Testing network connectivity..."
    
    # Test general internet connectivity
    if curl -s --max-time 5 https://www.google.com > /dev/null 2>&1; then
        log_success "Internet connectivity: OK"
    else
        log_error "No internet connectivity"
        return 1
    fi
    
    # Test Telegram API
    if curl -s --max-time 5 https://api.telegram.org > /dev/null 2>&1; then
        log_success "Telegram API reachable"
    else
        log_error "Cannot reach Telegram API"
        return 1
    fi
    
    # Test Vercel API (optional)
    if curl -s --max-time 5 https://api.vercel.com > /dev/null 2>&1; then
        log_success "Vercel API reachable"
    else
        log_warning "Cannot reach Vercel API (may be blocked or unavailable)"
    fi
    
    return 0
}

test_project_structure() {
    log_test "Testing project structure..."
    
    cd "$PROJECT_ROOT"
    
    # Check essential files
    local essential_files=("package.json" "README.md")
    local all_ok=true
    
    for file in "${essential_files[@]}"; do
        if [ -f "$file" ]; then
            log_success "Found: $file"
        else
            log_warning "Missing: $file"
        fi
    done
    
    # Check directories
    local essential_dirs=("src" "docs")
    
    for dir in "${essential_dirs[@]}"; do
        if [ -d "$dir" ]; then
            log_success "Found: $dir/"
        else
            log_warning "Missing: $dir/"
        fi
    done
    
    return 0
}

# === MAIN EXECUTION ========================================================

main() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   🧪 ABVETOS DEPLOY EXPRESS TEST                      ║${NC}"
    echo -e "${CYAN}║   Verificación de Conexión y Tokens                   ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    local tests_passed=0
    local tests_failed=0
    local tests_warned=0
    
    # Run all tests
    echo -e "${BLUE}═══ Environment Tests ═══${NC}"
    if test_environment; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    echo ""
    
    echo -e "${BLUE}═══ Network Tests ═══${NC}"
    if test_network_connectivity; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    echo ""
    
    echo -e "${BLUE}═══ Telegram Tests ═══${NC}"
    if test_telegram_token; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    
    if test_telegram_chat_id; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    
    if test_telegram_message; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    echo ""
    
    echo -e "${BLUE}═══ Vercel Tests ═══${NC}"
    if test_vercel_token; then
        ((tests_passed++))
    else
        ((tests_warned++))
    fi
    echo ""
    
    echo -e "${BLUE}═══ Project Structure Tests ═══${NC}"
    if test_project_structure; then
        ((tests_passed++))
    else
        ((tests_failed++))
    fi
    echo ""
    
    # Summary
    echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}   TEST SUMMARY${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}   ✓ Passed:  $tests_passed${NC}"
    
    if [ $tests_failed -gt 0 ]; then
        echo -e "${RED}   ✗ Failed:  $tests_failed${NC}"
    fi
    
    if [ $tests_warned -gt 0 ]; then
        echo -e "${YELLOW}   ⚠ Warnings: $tests_warned${NC}"
    fi
    
    echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
    echo ""
    
    if [ $tests_failed -eq 0 ]; then
        log_success "All critical tests passed!"
        return 0
    else
        log_error "Some tests failed. Please check the configuration."
        return 1
    fi
}

# Execute main function
main "$@"
