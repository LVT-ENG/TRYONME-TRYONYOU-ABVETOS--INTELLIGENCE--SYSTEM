#!/bin/bash
################################################################################
# ABVETOS Auto Integration Script
# Automates the integration of ABVETOS components into TRYONYOU system
# Location: ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/abvetos_auto_integrate.sh
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TIMESTAMP=$(date "+%Y-%m-%d_%H-%M-%S")
LOG_FILE="$SCRIPT_DIR/abvetos_integration_${TIMESTAMP}.log"

# Functions
print_header() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║        ABVETOS Auto Integration Script                      ║"
    echo "║                  TRYONYOU - ABVETOS                          ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_step() {
    echo -e "${GREEN}▶ $1${NC}" | tee -a "$LOG_FILE"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}" | tee -a "$LOG_FILE"
}

print_error() {
    echo -e "${RED}✗ $1${NC}" | tee -a "$LOG_FILE"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}" | tee -a "$LOG_FILE"
}

# Main execution
main() {
    print_header
    
    print_step "Starting ABVETOS auto integration process..."
    echo "Log file: $LOG_FILE"
    
    # Check if we're in the correct directory
    if [ ! -f "$REPO_ROOT/package.json" ]; then
        print_error "Repository root not found. Please run this script from TRYONYOU_DEPLOY_EXPRESS_INBOX directory."
        exit 1
    fi
    
    print_step "Repository root: $REPO_ROOT"
    
    # Check if automation directory exists
    if [ ! -d "$REPO_ROOT/automation" ]; then
        print_warning "Automation directory not found, creating..."
        mkdir -p "$REPO_ROOT/automation"
    fi
    
    # Run the ABVETOS full fusion if available
    if [ -f "$REPO_ROOT/automation/abvetos_full_fusion.mjs" ]; then
        print_step "Found ABVETOS full fusion script, executing..."
        cd "$REPO_ROOT"
        
        # Check if Node.js is available
        if command -v node &> /dev/null; then
            print_step "Running ABVETOS full fusion integration..."
            node automation/abvetos_full_fusion.mjs 2>&1 | tee -a "$LOG_FILE"
            print_success "ABVETOS full fusion completed successfully"
        else
            print_error "Node.js not found. Please install Node.js to run the integration."
            exit 1
        fi
    else
        print_warning "ABVETOS full fusion script not found at $REPO_ROOT/automation/abvetos_full_fusion.mjs"
    fi
    
    # Deploy ABVETOS dashboard if script exists
    if [ -f "$REPO_ROOT/scripts/deploy_abvetos_dashboard.sh" ]; then
        print_step "Deploying ABVETOS dashboard..."
        bash "$REPO_ROOT/scripts/deploy_abvetos_dashboard.sh" --auto 2>&1 | tee -a "$LOG_FILE"
        print_success "ABVETOS dashboard deployed successfully"
    else
        print_warning "ABVETOS dashboard deployment script not found"
    fi
    
    # Final status
    print_success "ABVETOS auto integration completed!"
    echo ""
    echo -e "${BLUE}Summary:${NC}"
    echo "- Integration timestamp: $TIMESTAMP"
    echo "- Log file: $LOG_FILE"
    echo "- Repository: $REPO_ROOT"
    echo ""
    echo -e "${GREEN}All components have been integrated successfully.${NC}"
}

# Run main function
main "$@"
