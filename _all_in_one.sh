#!/bin/bash

# ════════════════════════════════════════════════════════════════
# 🦚 TRYONYOU — ALL-IN-ONE ORCHESTRATOR
# ════════════════════════════════════════════════════════════════

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🦚 TRYONYOU ORCHESTRATOR — STARTING${NC}"

# Phase 1: Local Validation
echo -e "${YELLOW}⏳ PHASE 1: LOCAL VALIDATION (Lint + Tests)...${NC}"
echo "Running Linter..."
npm run lint
echo "Running Unit Tests..."
npm test

echo -e "${GREEN}✅ PHASE 1 COMPLETE: VALIDATION PASSED.${NC}"

# Phase 2: Build
echo -e "${YELLOW}⏳ PHASE 2: BUILDING PRODUCTION BUNDLE...${NC}"
npm run build

# Verify build output exists (simple check)
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ BUILD FAILED: dist/ directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ PHASE 2 COMPLETE: BUILD SUCCESSFUL.${NC}"

# Phase 3: SuperCommit Handoff
echo -e "${YELLOW}⏳ PHASE 3: HANDING OFF TO SUPERCOMMIT MAX...${NC}"

if [ -f "./TRYONYOU_SUPERCOMMIT_MAX.sh" ]; then
    ./TRYONYOU_SUPERCOMMIT_MAX.sh
else
    echo -e "${RED}❌ ERROR: TRYONYOU_SUPERCOMMIT_MAX.sh not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ ORCHESTRATOR FINISHED SUCCESSFULLY.${NC}"
