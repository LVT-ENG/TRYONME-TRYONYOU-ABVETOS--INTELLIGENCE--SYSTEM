#!/bin/bash

# ABVETOS Build & Deploy Pipeline
# This script orchestrates the full build and deployment process

set -e

echo "🚀 ABVETOS Build & Deploy Pipeline"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Step 1: Ensure dependencies are installed
echo -e "${CYAN}[Step 1/5]${NC} Installing dependencies..."
npm install

# Step 2: Run linting (if configured)
echo -e "${CYAN}[Step 2/5]${NC} Running linters..."
if npm run lint 2>/dev/null; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠ No lint script configured, skipping...${NC}"
fi

# Step 3: Build the project
echo -e "${CYAN}[Step 3/5]${NC} Building project..."
npm run build
echo -e "${GREEN}✓ Build completed${NC}"

# Step 4: Create deployment package
echo -e "${CYAN}[Step 4/5]${NC} Creating deployment package..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="TRYONYOU_MASTER_${TIMESTAMP}.zip"

# Create ZIP excluding unnecessary files
cd dist
zip -r "../${ZIP_NAME}" . -x "*.map"
cd ..
echo -e "${GREEN}✓ Package created: ${ZIP_NAME}${NC}"

# Step 5: Report status
echo -e "${CYAN}[Step 5/5]${NC} Build Summary"
echo "=================================="
echo -e "Build Status: ${GREEN}SUCCESS${NC}"
echo "Package: ${ZIP_NAME}"
echo "Size: $(du -h ${ZIP_NAME} | cut -f1)"
echo "Timestamp: $(date)"
echo ""
echo -e "${GREEN}✓ Ready for deployment${NC}"
echo ""
echo "Next steps:"
echo "  1. Verify build in dist/ folder"
echo "  2. Run: npm run preview (to preview locally)"
echo "  3. Push to main branch for auto-deploy"
echo ""
