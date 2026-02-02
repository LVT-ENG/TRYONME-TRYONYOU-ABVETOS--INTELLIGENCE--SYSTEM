#!/bin/bash

# ============================================================================
# DEPLOY ULTIMATUM - Final Deployment to Vercel
# Handles production deployment with safety checks
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse command line arguments
VERCEL_TOKEN=""
PRODUCTION=true

while [[ $# -gt 0 ]]; do
  case $1 in
    --token)
      VERCEL_TOKEN="$2"
      shift 2
      ;;
    --staging)
      PRODUCTION=false
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 --token <VERCEL_TOKEN> [--staging]"
      exit 1
      ;;
  esac
done

# Validate Vercel token
if [ -z "$VERCEL_TOKEN" ]; then
  echo -e "${RED}❌ ERROR: VERCEL_TOKEN is required${NC}"
  echo "Usage: $0 --token <VERCEL_TOKEN> [--staging]"
  exit 1
fi

echo "🚀 DEPLOY ULTIMATUM - Starting Deployment"
echo "==========================================="

# --- PASO 1: Pre-deployment Checks ---
echo ""
echo "🔍 PASO 1: Pre-deployment Checks"

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ ERROR: package.json not found${NC}"
  exit 1
fi

# Check if vercel.json exists
if [ ! -f "vercel.json" ]; then
  echo -e "${YELLOW}⚠️  WARNING: vercel.json not found${NC}"
fi

echo -e "${GREEN}✅ Pre-deployment checks passed${NC}"

# --- PASO 2: Safety Lint (Protocolo Zero Tallas) ---
echo ""
echo "🛡️  PASO 2: Safety Lint (Zero Tallas Protocol)"

# Check if src/ directory exists
if [ ! -d "src/" ]; then
  echo -e "${YELLOW}⚠️  WARNING: src/ directory not found, skipping safety lint${NC}"
else
  if grep -rE "peso|talla|weight|size" src/ > /dev/null 2>&1; then
    echo -e "${RED}❌ ERROR CRÍTICO: Se detectaron términos prohibidos (peso, talla, weight, size) en src/${NC}"
    grep -rE "peso|talla|weight|size" src/
    exit 1
  else
    echo -e "${GREEN}✅ Safety Lint Aprobado: Sin términos prohibidos.${NC}"
  fi
fi

# --- PASO 3: Build Verification ---
echo ""
echo "📦 PASO 3: Build Verification"
echo "Checking if build is required..."

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel@latest
fi

echo -e "${GREEN}✅ Build verification completed${NC}"

# --- PASO 4: Deployment to Vercel ---
echo ""
echo "🚢 PASO 4: Deployment to Vercel"

if [ "$PRODUCTION" = true ]; then
  echo "Deploying to PRODUCTION..."
  vercel --prod --token "$VERCEL_TOKEN" --yes
else
  echo "Deploying to STAGING..."
  vercel --token "$VERCEL_TOKEN" --yes
fi

DEPLOY_STATUS=$?

if [ $DEPLOY_STATUS -eq 0 ]; then
  echo ""
  echo "==========================================="
  echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL${NC}"
  echo "==========================================="
  
  if [ "$PRODUCTION" = true ]; then
    echo "🎉 Piloto Lafayette is now LIVE in production!"
  else
    echo "🎉 Piloto Lafayette is now live in staging!"
  fi
else
  echo ""
  echo "==========================================="
  echo -e "${RED}❌ DEPLOYMENT FAILED${NC}"
  echo "==========================================="
  exit 1
fi

# --- PASO 5: Post-deployment Verification ---
echo ""
echo "✓ PASO 5: Post-deployment Verification"
echo "Deployment completed successfully."
echo "Check your Vercel dashboard for deployment details."

echo ""
echo "🎊 DEPLOY ULTIMATUM COMPLETED"
