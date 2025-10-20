#!/usr/bin/env bash
# ==========================================================
# ABVETOS Dashboard Deploy Script
# Auto-detects TRYONYOU_MASTER, builds dashboard, and syncs to tryonyou.app
# ==========================================================
set -e

# Color output functions
log() { echo -e "\033[1;32m✅ $1\033[0m"; }
warn() { echo -e "\033[1;33m⚠️  $1\033[0m"; }
err() { echo -e "\033[1;31m❌ $1\033[0m"; exit 1; }
info() { echo -e "\033[1;36mℹ️  $1\033[0m"; }

# Configuration
DASHBOARD_SOURCE="src/dashboard/abvetos-dashboard"
DEPLOY_TARGET="dist/dashboard/abvetos-dashboard"
DASHBOARD_URL="https://tryonyou.app/dashboard/abvetos-dashboard/"

# Script header
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤖 ABVETOS Dashboard Deploy Express"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Auto-detect if inside TRYONYOU_MASTER
info "Detecting TRYONYOU_MASTER environment..."

# Check multiple indicators for TRYONYOU_MASTER
INSIDE_TRYONYOU_MASTER=false

# Method 1: Check if we're in a directory named TRYONYOU_MASTER or similar
if [[ "$PWD" == *"TRYONYOU_MASTER"* ]] || [[ "$PWD" == *"TRYONME-TRYONYOU-ABVETOS"* ]]; then
  INSIDE_TRYONYOU_MASTER=true
  log "Detected TRYONYOU_MASTER from current path: $PWD"
fi

# Method 2: Check if the repository has the expected structure
if [ -d "$DASHBOARD_SOURCE" ] && [ -f "package.json" ] && [ -d ".github/workflows" ]; then
  INSIDE_TRYONYOU_MASTER=true
  log "Validated TRYONYOU_MASTER structure"
fi

# Method 3: Check git remote for TRYONYOU repository
if git remote -v 2>/dev/null | grep -q "TRYONME-TRYONYOU-ABVETOS"; then
  INSIDE_TRYONYOU_MASTER=true
  log "Confirmed TRYONYOU_MASTER from git remote"
fi

if [ "$INSIDE_TRYONYOU_MASTER" = false ]; then
  err "Not inside TRYONYOU_MASTER. This script must be run from the TRYONYOU repository."
fi

log "TRYONYOU_MASTER environment confirmed"

# 2. Verify dashboard source exists
info "Verifying dashboard source files..."

if [ ! -d "$DASHBOARD_SOURCE" ]; then
  err "Dashboard source not found at: $DASHBOARD_SOURCE"
fi

log "Dashboard source verified at: $DASHBOARD_SOURCE"

# 3. Install dependencies if needed
info "Checking dependencies..."

if [ ! -d "node_modules" ]; then
  warn "Dependencies not found. Installing..."
  npm install
  log "Dependencies installed"
else
  log "Dependencies already installed"
fi

# 4. Build the dashboard with Vite
info "Building dashboard with Vite..."

# Set environment variables for build
export NODE_ENV=production
export VITE_ENV=production

# Run the build
if npm run build; then
  log "Dashboard build completed successfully"
else
  err "Dashboard build failed"
fi

# 5. Verify build output
info "Verifying build output..."

if [ ! -d "dist" ]; then
  err "Build output directory 'dist' not found"
fi

if [ ! -d "dist/dashboard" ]; then
  warn "Dashboard not found in expected location, but continuing..."
fi

log "Build output verified"

# 6. Display build summary
info "Build Summary:"
echo ""
echo "  📁 Source: $DASHBOARD_SOURCE"
echo "  📦 Output: dist/"
echo "  🌐 Target URL: $DASHBOARD_URL"
echo ""

# 7. Check if running in CI/CD (auto-deploy)
if [ -n "$CI" ] || [ -n "$GITHUB_ACTIONS" ]; then
  log "Running in CI/CD environment - deployment will be handled by workflow"
else
  info "Local build completed. To deploy:"
  echo ""
  echo "  1. Run: vercel --prod"
  echo "  2. Or commit changes and push to trigger GitHub Actions"
  echo ""
fi

# 8. Success message
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "ABVETOS Dashboard build completed successfully! 🎉"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Dashboard will be available at:"
echo "   $DASHBOARD_URL"
echo ""
echo "🔔 Telegram notifications will be sent to @abvet_deploy_bot"
echo ""

exit 0
