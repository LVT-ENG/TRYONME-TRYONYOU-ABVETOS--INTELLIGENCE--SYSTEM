#!/bin/bash
################################################################################
# ABVETOS Dashboard Deployment Script
# Auto-deploys the dashboard to https://tryonyou.app/dashboard/abvetos-dashboard/
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
DASHBOARD_DIR="$REPO_ROOT/dashboard/abvetos-dashboard"
PUBLIC_DIR="$REPO_ROOT/public/dashboard/abvetos-dashboard"

# Functions
print_header() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║          ABVETOS Dashboard Deployment Script                ║"
    echo "║                  TRYONYOU - ABVETOS                          ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_step() {
    echo -e "${GREEN}▶ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Check if running in TRYONYOU_DEPLOY_EXPRESS_INBOX mode
AUTO_DEPLOY=false
if [ "$1" == "--auto" ]; then
    AUTO_DEPLOY=true
    print_warning "Running in AUTO mode - will deploy without confirmation"
elif [ "$1" == "--manual" ]; then
    AUTO_DEPLOY=false
    print_warning "Running in MANUAL mode - requires confirmation"
fi

# Main deployment function
deploy_dashboard() {
    print_header
    
    # Step 1: Check repository structure
    print_step "Step 1: Checking repository structure..."
    
    if [ ! -d "$DASHBOARD_DIR" ]; then
        print_error "Dashboard directory not found: $DASHBOARD_DIR"
        exit 1
    fi
    print_success "Repository structure verified"
    
    # Step 2: Check for required tools
    print_step "Step 2: Checking required tools..."
    
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed. Please install it first."
        echo "  npm install -g pnpm"
        exit 1
    fi
    print_success "pnpm found: $(pnpm --version)"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    print_success "Node.js found: $(node --version)"
    
    # Step 3: Install dependencies
    print_step "Step 3: Installing dependencies..."
    cd "$DASHBOARD_DIR"
    
    if [ -f "pnpm-lock.yaml" ]; then
        pnpm install --frozen-lockfile
    else
        pnpm install
    fi
    print_success "Dependencies installed"
    
    # Step 4: Build dashboard
    print_step "Step 4: Building dashboard with Vite..."
    pnpm run build
    
    if [ ! -d "dist" ]; then
        print_error "Build failed - dist directory not created"
        exit 1
    fi
    print_success "Dashboard built successfully"
    
    # Step 5: Get commit information
    print_step "Step 5: Getting commit information..."
    cd "$REPO_ROOT"
    COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    COMMIT_MSG=$(git log -1 --pretty=%B 2>/dev/null || echo "No commit message")
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    print_success "Commit: $COMMIT_HASH on branch $BRANCH"
    
    # Step 6: Copy build to public directory
    print_step "Step 6: Copying build to public directory..."
    mkdir -p "$PUBLIC_DIR"
    cp -r "$DASHBOARD_DIR/dist/"* "$PUBLIC_DIR/"
    print_success "Build copied to: $PUBLIC_DIR"
    
    # Step 7: Verify build
    print_step "Step 7: Verifying build..."
    if [ -f "$PUBLIC_DIR/index.html" ]; then
        print_success "index.html found in public directory"
    else
        print_error "index.html not found - deployment may have failed"
        exit 1
    fi
    
    # Step 8: Deployment confirmation
    if [ "$AUTO_DEPLOY" = false ]; then
        echo ""
        print_warning "Ready to deploy to production!"
        echo "  Target URL: https://tryonyou.app/dashboard/abvetos-dashboard/"
        echo "  Commit: $COMMIT_HASH"
        echo "  Branch: $BRANCH"
        echo ""
        read -p "Continue with deployment? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_warning "Deployment cancelled by user"
            exit 0
        fi
    fi
    
    # Step 9: Trigger deployment
    print_step "Step 8: Deployment ready..."
    print_success "Dashboard built and ready for deployment"
    echo ""
    echo "To deploy to Vercel:"
    echo "  1. Push changes to GitHub: git add . && git commit -m 'Deploy dashboard' && git push"
    echo "  2. GitHub Actions will automatically deploy to Vercel"
    echo "  3. Dashboard will be available at: https://tryonyou.app/dashboard/abvetos-dashboard/"
    echo ""
    
    # Summary
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                   Deployment Summary                         ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║ Status:     ✓ Build Successful                              ║"
    echo "║ Commit:     $COMMIT_HASH                                        ║"
    echo "║ Branch:     $BRANCH                                          ║"
    echo "║ Output:     public/dashboard/abvetos-dashboard/              ║"
    echo "║ Target URL: https://tryonyou.app/dashboard/abvetos-dashboard/║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Error handling
trap 'print_error "Deployment failed at line $LINENO"' ERR

# Run deployment
deploy_dashboard

exit 0
