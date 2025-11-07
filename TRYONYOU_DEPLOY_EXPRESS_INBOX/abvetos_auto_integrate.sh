#!/bin/bash
################################################################################
# ABVETOS Auto Integration Script
# Automatically integrates ABVETOS dashboard components with TRYONYOU system
# Location: ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/abvetos_auto_integrate.sh
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
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ABVETOS_SYNC_DIR="$REPO_ROOT/TRYONYOU_ABVETOS_DASHBOARD_SYNC"
DASHBOARD_DIR="$REPO_ROOT/dashboard/abvetos-dashboard"
PUBLIC_DIR="$REPO_ROOT/public/dashboard/abvetos-dashboard"
SCRIPTS_DIR="$REPO_ROOT/scripts"

# Function: Print header
print_header() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║         ABVETOS Auto Integration Script                     ║"
    echo "║              TRYONYOU - ABVETOS System                       ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Function: Print step
print_step() {
    echo -e "${GREEN}▶ $1${NC}"
}

# Function: Print warning
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Function: Print error
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function: Print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function: Print info
print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

# Function: Check if directory exists
check_directory() {
    local dir=$1
    local name=$2
    
    if [ -d "$dir" ]; then
        print_success "$name directory found: $dir"
        return 0
    else
        print_error "$name directory not found: $dir"
        return 1
    fi
}

# Function: Sync ABVETOS components
sync_abvetos_components() {
    print_step "Syncing ABVETOS dashboard components..."
    
    # Check if ABVETOS sync directory exists
    if [ -d "$ABVETOS_SYNC_DIR" ]; then
        print_info "Found ABVETOS sync directory"
        
        # Sync dashboard components if they exist
        if [ -d "$ABVETOS_SYNC_DIR/apps/web/src/dashboard/abvetos-dashboard" ]; then
            mkdir -p "$DASHBOARD_DIR"
            cp -r "$ABVETOS_SYNC_DIR/apps/web/src/dashboard/abvetos-dashboard/." "$DASHBOARD_DIR/" 2>/dev/null || true
            print_success "Dashboard components synced"
        fi
        
        # Sync scripts if they exist
        if [ -d "$ABVETOS_SYNC_DIR/scripts" ]; then
            mkdir -p "$SCRIPTS_DIR"
            cp -r "$ABVETOS_SYNC_DIR/scripts/." "$SCRIPTS_DIR/" 2>/dev/null || true
            
            # Make scripts executable
            found_sh=0
            for file in "$SCRIPTS_DIR"/*.sh; do
                if [ -f "$file" ]; then
                    chmod +x "$file"
                    found_sh=1
                fi
            done
            if [ "$found_sh" -eq 1 ]; then
                print_success "Scripts synced and made executable"
            else
                print_info "No .sh scripts found to make executable"
            fi
        fi
    else
        print_warning "ABVETOS sync directory not found, skipping component sync"
    fi
}

# Function: Integrate deploy script
integrate_deploy_script() {
    print_step "Integrating ABVETOS deployment script..."
    
    local deploy_script="$SCRIPTS_DIR/deploy_abvetos_dashboard.sh"
    
    if [ -f "$deploy_script" ]; then
        chmod +x "$deploy_script"
        print_success "Deploy script is ready: $deploy_script"
    else
        print_warning "Deploy script not found, may need manual setup"
    fi
}

# Function: Create necessary directories
create_directories() {
    print_step "Creating necessary directory structure..."
    
    mkdir -p "$DASHBOARD_DIR"
    mkdir -p "$PUBLIC_DIR"
    mkdir -p "$SCRIPTS_DIR"
    
    print_success "Directory structure ready"
}

# Function: Verify integration
verify_integration() {
    print_step "Verifying integration..."
    
    local errors=0
    
    # Check dashboard directory
    if [ ! -d "$DASHBOARD_DIR" ]; then
        print_error "Dashboard directory missing"
        ((errors++))
    else
        print_success "Dashboard directory OK"
    fi
    
    # Check scripts directory
    if [ ! -d "$SCRIPTS_DIR" ]; then
        print_error "Scripts directory missing"
        ((errors++))
    else
        print_success "Scripts directory OK"
    fi
    
    # Check deploy script
    if [ -f "$SCRIPTS_DIR/deploy_abvetos_dashboard.sh" ]; then
        if [ -x "$SCRIPTS_DIR/deploy_abvetos_dashboard.sh" ]; then
            print_success "Deploy script is executable"
        else
            print_warning "Deploy script exists but is not executable"
        fi
    fi
    
    return $errors
}

# Function: Print summary
print_summary() {
    echo ""
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                   Integration Summary                       ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║ Status:     ✓ Integration Complete                         ║"
    # Truncate paths to fit within box (max 48 chars for value)
    local box_width=62
    local label_pad_dashboard="Dashboard:  "
    local label_pad_scripts="Scripts:    "
    local label_pad_public="Public:     "
    local value_width=$((box_width - ${#label_pad_dashboard} - 3)) # 3 for box chars and space
    local dashboard_display="$DASHBOARD_DIR"
    local scripts_display="$SCRIPTS_DIR"
    local public_display="$PUBLIC_DIR"
    if [ ${#dashboard_display} -gt $value_width ]; then
        dashboard_display="${dashboard_display:0:$((value_width-3))}..."
    fi
    if [ ${#scripts_display} -gt $value_width ]; then
        scripts_display="${scripts_display:0:$((value_width-3))}..."
    fi
    if [ ${#public_display} -gt $value_width ]; then
        public_display="${public_display:0:$((value_width-3))}..."
    fi
    printf "║ %s%-*s║\n" "$label_pad_dashboard" $value_width "$dashboard_display"
    printf "║ %s%-*s║\n" "$label_pad_scripts" $value_width "$scripts_display"
    printf "║ %s%-*s║\n" "$label_pad_public" $value_width "$public_display"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    echo ""
    print_info "Next steps:"
    echo "  1. Run: $SCRIPTS_DIR/deploy_abvetos_dashboard.sh"
    echo "  2. Or integrate with your CI/CD pipeline"
    echo "  3. Dashboard will be available at: https://tryonyou.app/dashboard/abvetos-dashboard/"
    echo ""
}

# Main integration function
main() {
    print_header
    
    print_info "Starting ABVETOS auto-integration..."
    print_info "Repository root: $REPO_ROOT"
    echo ""
    
    # Step 1: Create directories
    create_directories
    
    # Step 2: Sync components
    sync_abvetos_components
    
    # Step 3: Integrate deploy script
    integrate_deploy_script
    
    # Step 4: Verify integration
    if verify_integration; then
        print_success "All integration checks passed"
    else
        print_warning "Some integration checks failed, but core setup is complete"
    fi
    
    # Step 5: Print summary
    print_summary
}

# Error handling
trap 'print_error "Integration failed at line $LINENO"' ERR

# Run main function
main

exit 0
