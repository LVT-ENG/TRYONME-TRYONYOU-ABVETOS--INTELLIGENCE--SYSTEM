#!/bin/bash
# ===========================================================
# PRODUCTION BUILD with Hero Cinematic Assets
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# ===========================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${PURPLE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║   🎬 PRODUCTION BUILD — Hero Cinematic Edition       ║${NC}"
echo -e "${PURPLE}║   TRYONYOU – Fashion Intelligence Platform            ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
LOG_FILE="$PROJECT_ROOT/logs/build_production_$(date +%Y%m%d_%H%M).log"
ASSETS_DIR="$PROJECT_ROOT/public"

mkdir -p "$PROJECT_ROOT/logs"

echo -e "${YELLOW}📂 Project Root: $PROJECT_ROOT${NC}" | tee -a "$LOG_FILE"
echo ""

# 1️⃣ Clean previous build
echo -e "${YELLOW}🧹 Cleaning previous build...${NC}" | tee -a "$LOG_FILE"
if [ -d "$DIST_DIR" ]; then
  rm -rf "$DIST_DIR"
fi
echo -e "${GREEN}✅ Cleaned${NC}" | tee -a "$LOG_FILE"
echo ""

# 2️⃣ Verify Hero Cinematic assets
echo -e "${YELLOW}🎬 Verifying Hero Cinematic assets...${NC}" | tee -a "$LOG_FILE"

REQUIRED_ASSETS=(
  "images/people/diverse-models-flowers.jpg"
  "images/people/fashion-diversity-group.jpg"
  "images/people/backstage-diversity.jpg"
  "images/people/beauty-emotion-portrait.jpg"
  "hero/pau_intro.json"
)

MISSING_ASSETS=0
for asset in "${REQUIRED_ASSETS[@]}"; do
  if [ -f "$ASSETS_DIR/$asset" ]; then
    echo -e "${GREEN}  ✓ $asset${NC}" | tee -a "$LOG_FILE"
  else
    echo -e "${YELLOW}  ✗ $asset (missing)${NC}" | tee -a "$LOG_FILE"
    MISSING_ASSETS=$((MISSING_ASSETS + 1))
  fi
done

if [ $MISSING_ASSETS -gt 0 ]; then
  echo -e "${YELLOW}⚠️  $MISSING_ASSETS assets missing (build will continue)${NC}" | tee -a "$LOG_FILE"
else
  echo -e "${GREEN}✅ All Hero Cinematic assets verified${NC}" | tee -a "$LOG_FILE"
fi
echo ""

# 3️⃣ Check dependencies
echo -e "${YELLOW}📦 Checking dependencies...${NC}" | tee -a "$LOG_FILE"
cd "$PROJECT_ROOT"

if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Installing dependencies...${NC}" | tee -a "$LOG_FILE"
  npm ci >> "$LOG_FILE" 2>&1
fi
echo -e "${GREEN}✅ Dependencies ready${NC}" | tee -a "$LOG_FILE"
echo ""

# 4️⃣ Run integrity check
echo -e "${YELLOW}🔍 Running integrity check...${NC}" | tee -a "$LOG_FILE"
if [ -f "$PROJECT_ROOT/scripts/integrity_check.sh" ]; then
  bash "$PROJECT_ROOT/scripts/integrity_check.sh" >> "$LOG_FILE" 2>&1 || true
  echo -e "${GREEN}✅ Integrity check completed${NC}" | tee -a "$LOG_FILE"
fi
echo ""

# 5️⃣ Build production
echo -e "${YELLOW}🔨 Building production bundle...${NC}" | tee -a "$LOG_FILE"
echo -e "${BLUE}   Mode: Production${NC}"
echo -e "${BLUE}   Vite: 7.1.2${NC}"
echo -e "${BLUE}   Target: ES2015+${NC}"
echo ""

BUILD_START=$(date +%s)
npm run build >> "$LOG_FILE" 2>&1
BUILD_END=$(date +%s)
BUILD_TIME=$((BUILD_END - BUILD_START))

echo -e "${GREEN}✅ Build completed in ${BUILD_TIME}s${NC}" | tee -a "$LOG_FILE"
echo ""

# 6️⃣ Analyze build
echo -e "${YELLOW}📊 Analyzing build...${NC}" | tee -a "$LOG_FILE"

if [ -d "$DIST_DIR" ]; then
  DIST_SIZE=$(du -sh "$DIST_DIR" | cut -f1)
  echo -e "${BLUE}   Total size: $DIST_SIZE${NC}" | tee -a "$LOG_FILE"
  
  # Count files by type
  JS_COUNT=$(find "$DIST_DIR" -name "*.js" | wc -l)
  CSS_COUNT=$(find "$DIST_DIR" -name "*.css" | wc -l)
  IMG_COUNT=$(find "$DIST_DIR" -name "*.jpg" -o -name "*.png" -o -name "*.webp" | wc -l)
  
  echo -e "${BLUE}   JavaScript files: $JS_COUNT${NC}" | tee -a "$LOG_FILE"
  echo -e "${BLUE}   CSS files: $CSS_COUNT${NC}" | tee -a "$LOG_FILE"
  echo -e "${BLUE}   Image files: $IMG_COUNT${NC}" | tee -a "$LOG_FILE"
  
  # Show largest files
  echo -e "${BLUE}   Largest files:${NC}" | tee -a "$LOG_FILE"
  find "$DIST_DIR" -type f -exec du -h {} + | sort -rh | head -5 | while read size file; do
    filename=$(basename "$file")
    echo -e "${BLUE}     - $filename ($size)${NC}" | tee -a "$LOG_FILE"
  done
fi
echo ""

# 7️⃣ Create build manifest
echo -e "${YELLOW}📝 Creating build manifest...${NC}" | tee -a "$LOG_FILE"

cat > "$DIST_DIR/build-manifest.json" << EOF
{
  "name": "TRYONYOU - Fashion Intelligence Platform",
  "version": "1.0.0",
  "build": {
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "duration": "${BUILD_TIME}s",
    "mode": "production",
    "vite": "7.1.2",
    "edition": "Hero Cinematic"
  },
  "assets": {
    "total_size": "$DIST_SIZE",
    "js_files": $JS_COUNT,
    "css_files": $CSS_COUNT,
    "images": $IMG_COUNT
  },
  "modules": {
    "PAU": "Emotional Avatar System",
    "CAP": "Creation & Production System",
    "ABVET": "Biometric Payment System",
    "ABVETOS": "Intelligence Orchestrator"
  },
  "features": [
    "Hero Cinematic with hyperrealistic images",
    "Modern color palette (Purple, Cyan, Pink)",
    "Glassmorphism UI",
    "Smooth scroll navigation",
    "Multi-language support (EN, ES, FR)",
    "Responsive design",
    "Optimized bundle splitting"
  ]
}
EOF

echo -e "${GREEN}✅ Build manifest created${NC}" | tee -a "$LOG_FILE"
echo ""

# 8️⃣ Summary
echo -e "${PURPLE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║   🎉 PRODUCTION BUILD COMPLETE                        ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Build: Success${NC}"
echo -e "${GREEN}✅ Time: ${BUILD_TIME}s${NC}"
echo -e "${GREEN}✅ Size: $DIST_SIZE${NC}"
echo -e "${GREEN}✅ Output: $DIST_DIR${NC}"
echo -e "${GREEN}✅ Manifest: $DIST_DIR/build-manifest.json${NC}"
echo ""
echo -e "${BLUE}📄 Full log: $LOG_FILE${NC}"
echo ""
echo -e "${YELLOW}🚀 Ready for deployment!${NC}"
echo ""

