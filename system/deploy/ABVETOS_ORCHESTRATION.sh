#!/bin/bash
################################################################################
# ABVETOS Orchestration Script
# Orchestrates and manages ABVETOS deployment flows
# Part of the TRYONME-TRYONYOU-ABVETOS Intelligence System
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
LOG_FILE="$LOG_DIR/orchestration_$(date +%Y%m%d_%H%M%S).log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Functions
print_header() {
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║            ABVETOS Orchestration System v1.0                   ║"
    echo "║        TRYONME-TRYONYOU-ABVETOS INTELLIGENCE SYSTEM            ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_step() {
    echo -e "${GREEN}▶ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1" >> "$LOG_FILE"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >> "$LOG_FILE"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS: $1" >> "$LOG_FILE"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] INFO: $1" >> "$LOG_FILE"
}

# Orchestration functions
check_prerequisites() {
    print_step "Checking prerequisites"
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js $NODE_VERSION is available"
    else
        print_error "Node.js is required but not installed"
        return 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm $NPM_VERSION is available"
    else
        print_warning "npm not found"
    fi
    
    # Check git
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version | cut -d' ' -f3)
        print_success "git $GIT_VERSION is available"
    else
        print_warning "git not found"
    fi
    
    return 0
}

check_environment() {
    print_step "Checking environment configuration"
    
    local env_issues=0
    
    # Check VERCEL_TOKEN
    if [ -z "$VERCEL_TOKEN" ]; then
        print_warning "VERCEL_TOKEN not set"
        env_issues=$((env_issues + 1))
    else
        print_success "VERCEL_TOKEN is configured"
    fi
    
    # Check TELEGRAM credentials
    if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
        print_warning "TELEGRAM_BOT_TOKEN not set"
        env_issues=$((env_issues + 1))
    else
        print_success "TELEGRAM_BOT_TOKEN is configured"
    fi
    
    if [ -z "$TELEGRAM_CHAT_ID" ]; then
        print_warning "TELEGRAM_CHAT_ID not set"
        env_issues=$((env_issues + 1))
    else
        print_success "TELEGRAM_CHAT_ID is configured"
    fi
    
    if [ $env_issues -gt 0 ]; then
        print_info "Some environment variables are not configured"
        print_info "Deployment will continue with limited functionality"
    fi
    
    return 0
}

execute_flow_345() {
    print_step "Executing ABVETOS Flow 345"
    
    local flow_script="$SCRIPT_DIR/ABVETOS_FLOW_345.sh"
    
    if [ ! -f "$flow_script" ]; then
        print_error "Flow 345 script not found at $flow_script"
        return 1
    fi
    
    if [ ! -x "$flow_script" ]; then
        print_step "Making Flow 345 script executable"
        chmod +x "$flow_script"
    fi
    
    print_info "Starting Flow 345 execution"
    
    # Execute Flow 345
    if bash "$flow_script"; then
        print_success "Flow 345 executed successfully"
        return 0
    else
        print_error "Flow 345 execution failed"
        return 1
    fi
}

send_orchestration_notification() {
    if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
        print_step "Sending orchestration notification"
        
        local status="$1"
        local emoji="✅"
        
        if [ "$status" != "success" ]; then
            emoji="❌"
        fi
        
        TIMESTAMP="$(date -u '+%Y-%m-%d %H:%M:%S UTC')"
        MESSAGE="${emoji} *ABVETOS Orchestration Complete*

📊 *Status:* ${status}
⏰ *Time:* ${TIMESTAMP}
📋 *Log:* ${LOG_FILE}

🎯 Flow 345 Orchestration
🤖 ABVETOS Intelligence System"
        
        if curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -d chat_id="${TELEGRAM_CHAT_ID}" \
            -d parse_mode="Markdown" \
            -d text="$MESSAGE" > /dev/null 2>&1; then
            print_success "Orchestration notification sent"
        else
            print_warning "Failed to send Telegram notification"
        fi
    fi
}

# Main orchestration flow
main() {
    print_header
    print_step "Starting ABVETOS Orchestration"
    
    local start_time=$(date +%s)
    local exit_code=0
    
    # Step 1: Check prerequisites
    if ! check_prerequisites; then
        print_error "Prerequisites check failed"
        exit_code=1
        send_orchestration_notification "failed - prerequisites"
        exit $exit_code
    fi
    
    # Step 2: Check environment
    check_environment
    
    # Step 3: Execute Flow 345
    if ! execute_flow_345; then
        print_error "Flow 345 execution failed"
        exit_code=1
        send_orchestration_notification "failed - flow execution"
        exit $exit_code
    fi
    
    # Calculate duration
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    print_success "ABVETOS Orchestration completed successfully"
    print_info "Total execution time: ${duration} seconds"
    print_step "Log file saved to: $LOG_FILE"
    
    send_orchestration_notification "success"
    
    exit 0
}

# Execute main function
main "$@"
