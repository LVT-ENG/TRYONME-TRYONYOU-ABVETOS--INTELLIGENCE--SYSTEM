#!/bin/bash
# Test script to verify legal documentation is accessible

echo "=================================================="
echo "TRYONYOU Legal Documentation Access Test"
echo "=================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
RAW_BASE="$REPO_URL/raw/main/docs/legal"
BLOB_BASE="$REPO_URL/blob/main/docs/legal"
PRODUCTION_URL="${PRODUCTION_URL:-https://tryonyou.vercel.app}"

echo "Testing GitHub Repository Access..."
echo ""

# Test function
test_url() {
    local url=$1
    local description=$2
    
    if curl -s -f -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
        echo -e "${GREEN}✓${NC} $description"
        echo "  URL: $url"
        return 0
    else
        echo -e "${RED}✗${NC} $description"
        echo "  URL: $url"
        return 1
    fi
}

# Test GitHub raw URLs
echo "1. Testing GitHub Raw URLs"
echo "   (Direct file access)"
echo ""

test_url "$RAW_BASE/README.md" "README.md"
test_url "$RAW_BASE/README_EXTENDED.md" "README_EXTENDED.md"
test_url "$RAW_BASE/UPLOAD_INSTRUCTIONS.md" "UPLOAD_INSTRUCTIONS.md"
test_url "$RAW_BASE/VERIFICATION_CHECKLIST.md" "VERIFICATION_CHECKLIST.md"
test_url "$RAW_BASE/QUICK_ACCESS.md" "QUICK_ACCESS.md"
test_url "$RAW_BASE/index.html" "index.html"
test_url "$RAW_BASE/IMPLEMENTATION_SUMMARY.md" "IMPLEMENTATION_SUMMARY.md"

echo ""
echo "2. Testing GitHub Web Interface URLs"
echo "   (Browser-friendly view)"
echo ""

test_url "$BLOB_BASE/README.md" "README.md (web view)"
test_url "$BLOB_BASE/README_EXTENDED.md" "README_EXTENDED.md (web view)"

echo ""
echo "3. Testing Production Deployment"
echo "   (Vercel/production site)"
echo ""

if [ "$PRODUCTION_URL" != "https://tryonyou.vercel.app" ]; then
    echo -e "${YELLOW}Note: Using custom production URL: $PRODUCTION_URL${NC}"
    echo ""
fi

test_url "$PRODUCTION_URL/docs/legal/index.html" "Legal index page"
test_url "$PRODUCTION_URL/docs/legal/README_EXTENDED.md" "README_EXTENDED.md"
test_url "$PRODUCTION_URL/docs/legal/UPLOAD_INSTRUCTIONS.md" "UPLOAD_INSTRUCTIONS.md"

echo ""
echo "=================================================="
echo "Test Summary"
echo "=================================================="
echo ""

# Count local files that should be accessible
LOCAL_COUNT=$(find . -maxdepth 1 -type f \( -name "*.md" -o -name "*.html" \) | wc -l)
echo "Local files in docs/legal/: $LOCAL_COUNT"

echo ""
echo "Next Steps:"
echo "  1. Review any failed tests above"
echo "  2. If 404 errors, wait for deployment or check build"
echo "  3. Upload pending files using UPLOAD_INSTRUCTIONS.md"
echo "  4. Run verification using VERIFICATION_CHECKLIST.md"
echo ""

echo "For custom production URL, run:"
echo "  PRODUCTION_URL=https://your-domain.com ./test-access.sh"
echo ""
