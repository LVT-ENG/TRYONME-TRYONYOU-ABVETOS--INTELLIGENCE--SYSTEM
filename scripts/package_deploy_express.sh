#!/bin/bash
# ===========================================================
# DEPLOY EXPRESS PACKAGER
# Empaqueta módulos PAU + CAP + FTT + Build principal
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# ===========================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   📦 DEPLOY EXPRESS PACKAGER                          ║${NC}"
echo -e "${CYAN}║   TRYONYOU – Complete System Package                  ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGE_DIR="$PROJECT_ROOT/DEPLOY_EXPRESS_PACKAGE"
TIMESTAMP=$(date +%Y%m%d_%H%M)
LOG_FILE="$PROJECT_ROOT/logs/package_deploy_$TIMESTAMP.log"

mkdir -p "$PROJECT_ROOT/logs"
mkdir -p "$PACKAGE_DIR"

echo -e "${YELLOW}📂 Package Directory: $PACKAGE_DIR${NC}" | tee -a "$LOG_FILE"
echo ""

# 1️⃣ Clean package directory
echo -e "${YELLOW}🧹 Cleaning package directory...${NC}" | tee -a "$LOG_FILE"
rm -rf "$PACKAGE_DIR"/*
echo -e "${GREEN}✅ Cleaned${NC}" | tee -a "$LOG_FILE"
echo ""

# 2️⃣ Copy main build
echo -e "${YELLOW}📋 Copying main production build...${NC}" | tee -a "$LOG_FILE"
if [ -d "$PROJECT_ROOT/dist" ]; then
  cp -r "$PROJECT_ROOT/dist" "$PACKAGE_DIR/main-build"
  echo -e "${GREEN}✅ Main build copied${NC}" | tee -a "$LOG_FILE"
else
  echo -e "${YELLOW}⚠️  Main build not found, run build first${NC}" | tee -a "$LOG_FILE"
fi
echo ""

# 3️⃣ Copy PAU module
echo -e "${YELLOW}🧠 Copying PAU module...${NC}" | tee -a "$LOG_FILE"
if [ -d "$PROJECT_ROOT/modules/PAU/dist-pau" ]; then
  mkdir -p "$PACKAGE_DIR/modules/PAU"
  cp -r "$PROJECT_ROOT/modules/PAU/dist-pau" "$PACKAGE_DIR/modules/PAU/"
  cp "$PROJECT_ROOT/modules/PAU/package.json" "$PACKAGE_DIR/modules/PAU/" 2>/dev/null || true
  cp "$PROJECT_ROOT/modules/PAU/README.md" "$PACKAGE_DIR/modules/PAU/" 2>/dev/null || true
  echo -e "${GREEN}✅ PAU module copied${NC}" | tee -a "$LOG_FILE"
else
  echo -e "${YELLOW}⚠️  PAU module not found${NC}" | tee -a "$LOG_FILE"
fi
echo ""

# 4️⃣ Copy CAP module
echo -e "${YELLOW}⚙️  Copying CAP module...${NC}" | tee -a "$LOG_FILE"
if [ -d "$PROJECT_ROOT/modules/CAP/dist-cap" ]; then
  mkdir -p "$PACKAGE_DIR/modules/CAP"
  cp -r "$PROJECT_ROOT/modules/CAP/dist-cap" "$PACKAGE_DIR/modules/CAP/"
  cp "$PROJECT_ROOT/modules/CAP/package.json" "$PACKAGE_DIR/modules/CAP/" 2>/dev/null || true
  cp "$PROJECT_ROOT/modules/CAP/README.md" "$PACKAGE_DIR/modules/CAP/" 2>/dev/null || true
  echo -e "${GREEN}✅ CAP module copied${NC}" | tee -a "$LOG_FILE"
else
  echo -e "${YELLOW}⚠️  CAP module not found${NC}" | tee -a "$LOG_FILE"
fi
echo ""

# 5️⃣ Create FTT module placeholder
echo -e "${YELLOW}🔄 Creating FTT module placeholder...${NC}" | tee -a "$LOG_FILE"
mkdir -p "$PACKAGE_DIR/modules/FTT"
cat > "$PACKAGE_DIR/modules/FTT/README.md" << 'EOF'
# FTT Module — Fashion Try-On Technology

## Status: In Development

This module will contain the virtual try-on technology for TRYONYOU platform.

### Features (Planned):
- Real-time garment overlay
- Body tracking and fitting
- AR integration
- Multi-angle view
- Size recommendation

### Integration:
Coming soon in next release.
EOF
echo -e "${GREEN}✅ FTT placeholder created${NC}" | tee -a "$LOG_FILE"
echo ""

# 6️⃣ Copy documentation
echo -e "${YELLOW}📚 Copying documentation...${NC}" | tee -a "$LOG_FILE"
mkdir -p "$PACKAGE_DIR/docs"

DOCS_TO_COPY=(
  "README.md"
  "IMPLEMENTATION_SUMMARY.md"
  "BLOQUES_2_3_IMPLEMENTATION.md"
  "CHANGELOG_PREMIUM_DESIGN.md"
)

for doc in "${DOCS_TO_COPY[@]}"; do
  if [ -f "$PROJECT_ROOT/$doc" ]; then
    cp "$PROJECT_ROOT/$doc" "$PACKAGE_DIR/docs/"
    echo -e "${GREEN}  ✓ $doc${NC}" | tee -a "$LOG_FILE"
  fi
done
echo ""

# 7️⃣ Copy scripts
echo -e "${YELLOW}🔧 Copying deployment scripts...${NC}" | tee -a "$LOG_FILE"
mkdir -p "$PACKAGE_DIR/scripts"

SCRIPTS_TO_COPY=(
  "prebuild_pau.sh"
  "build_cap_local.sh"
  "build_production_cinematic.sh"
  "integrity_check.sh"
  "auto-version-deploy.sh"
)

for script in "${SCRIPTS_TO_COPY[@]}"; do
  if [ -f "$PROJECT_ROOT/scripts/$script" ]; then
    cp "$PROJECT_ROOT/scripts/$script" "$PACKAGE_DIR/scripts/"
    chmod +x "$PACKAGE_DIR/scripts/$script"
    echo -e "${GREEN}  ✓ $script${NC}" | tee -a "$LOG_FILE"
  fi
done
echo ""

# 8️⃣ Create deployment guide
echo -e "${YELLOW}📝 Creating deployment guide...${NC}" | tee -a "$LOG_FILE"
cat > "$PACKAGE_DIR/DEPLOY_GUIDE.md" << 'EOF'
# 🚀 TRYONYOU Deploy Express Guide

## Package Contents

```
DEPLOY_EXPRESS_PACKAGE/
├── main-build/              # Production build (ready to deploy)
├── modules/
│   ├── PAU/                # Emotional Avatar System
│   ├── CAP/                # Creation & Production System
│   └── FTT/                # Fashion Try-On Technology (placeholder)
├── docs/                   # Documentation
├── scripts/                # Deployment scripts
└── DEPLOY_GUIDE.md         # This file
```

## Quick Deploy

### Option 1: Vercel (Recommended)

```bash
cd main-build
vercel --prod --token YOUR_TOKEN
```

### Option 2: Manual Deploy

1. Upload `main-build/` contents to your hosting
2. Configure your domain to point to the uploaded directory
3. Ensure HTTPS is enabled

## Module Integration

### PAU Module

```javascript
import { PAUAvatar, EmotionDetector } from './modules/PAU/dist-pau/pau.es.js'
```

### CAP Module

```javascript
import { PatternGenerator, FabricSimulator } from './modules/CAP/dist-cap/cap.es.js'
```

## Environment Variables

Required for production:

```env
VERCEL_TOKEN=your_token_here
VITE_API_URL=https://api.tryonyou.app
VITE_ENVIRONMENT=production
```

## Support

For issues or questions:
- Email: support@tryonyou.app
- Docs: https://docs.tryonyou.app

---

**TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM**
*Fashion Intelligence Platform*
EOF
echo -e "${GREEN}✅ Deployment guide created${NC}" | tee -a "$LOG_FILE"
echo ""

# 9️⃣ Create package manifest
echo -e "${YELLOW}📋 Creating package manifest...${NC}" | tee -a "$LOG_FILE"
cat > "$PACKAGE_DIR/PACKAGE_MANIFEST.json" << EOF
{
  "package": "TRYONYOU Deploy Express",
  "version": "1.0.0",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "build_id": "$TIMESTAMP",
  "contents": {
    "main_build": {
      "path": "main-build/",
      "size": "$(du -sh "$PACKAGE_DIR/main-build" 2>/dev/null | cut -f1 || echo 'N/A')",
      "description": "Production-ready web application"
    },
    "modules": {
      "PAU": {
        "path": "modules/PAU/",
        "version": "1.0.0",
        "description": "Emotional Avatar System"
      },
      "CAP": {
        "path": "modules/CAP/",
        "version": "1.0.0",
        "description": "Creation & Production System"
      },
      "FTT": {
        "path": "modules/FTT/",
        "version": "0.1.0",
        "description": "Fashion Try-On Technology (placeholder)"
      }
    },
    "documentation": {
      "path": "docs/",
      "files": $(find "$PACKAGE_DIR/docs" -type f 2>/dev/null | wc -l || echo 0)
    },
    "scripts": {
      "path": "scripts/",
      "files": $(find "$PACKAGE_DIR/scripts" -type f 2>/dev/null | wc -l || echo 0)
    }
  },
  "deployment": {
    "recommended_platform": "Vercel",
    "alternatives": ["Netlify", "AWS S3 + CloudFront", "Azure Static Web Apps"],
    "requirements": {
      "node": ">=18.0.0",
      "npm": ">=9.0.0"
    }
  }
}
EOF
echo -e "${GREEN}✅ Package manifest created${NC}" | tee -a "$LOG_FILE"
echo ""

# 🔟 Create ZIP archive
echo -e "${YELLOW}📦 Creating ZIP archive...${NC}" | tee -a "$LOG_FILE"
cd "$PROJECT_ROOT"
ZIP_NAME="TRYONYOU_DEPLOY_EXPRESS_${TIMESTAMP}.zip"
zip -r "$ZIP_NAME" DEPLOY_EXPRESS_PACKAGE/ -q
ZIP_SIZE=$(du -sh "$ZIP_NAME" | cut -f1)
echo -e "${GREEN}✅ ZIP created: $ZIP_NAME ($ZIP_SIZE)${NC}" | tee -a "$LOG_FILE"
echo ""

# 1️⃣1️⃣ Calculate totals
echo -e "${YELLOW}📊 Calculating package statistics...${NC}" | tee -a "$LOG_FILE"
TOTAL_FILES=$(find "$PACKAGE_DIR" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$PACKAGE_DIR" | cut -f1)
echo -e "${BLUE}   Total files: $TOTAL_FILES${NC}" | tee -a "$LOG_FILE"
echo -e "${BLUE}   Total size: $TOTAL_SIZE${NC}" | tee -a "$LOG_FILE"
echo ""

# 1️⃣2️⃣ Summary
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🎉 PACKAGE COMPLETE                                 ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Package: $PACKAGE_DIR${NC}"
echo -e "${GREEN}✅ ZIP: $ZIP_NAME${NC}"
echo -e "${GREEN}✅ Size: $ZIP_SIZE${NC}"
echo -e "${GREEN}✅ Files: $TOTAL_FILES${NC}"
echo ""
echo -e "${BLUE}📦 Contents:${NC}"
echo -e "${BLUE}   ├── Main Build (production)${NC}"
echo -e "${BLUE}   ├── PAU Module (Emotional Avatar)${NC}"
echo -e "${BLUE}   ├── CAP Module (Creation & Production)${NC}"
echo -e "${BLUE}   ├── FTT Module (placeholder)${NC}"
echo -e "${BLUE}   ├── Documentation${NC}"
echo -e "${BLUE}   └── Deployment Scripts${NC}"
echo ""
echo -e "${YELLOW}🚀 Ready for Deploy Express!${NC}"
echo -e "${BLUE}📄 Log: $LOG_FILE${NC}"
echo ""

