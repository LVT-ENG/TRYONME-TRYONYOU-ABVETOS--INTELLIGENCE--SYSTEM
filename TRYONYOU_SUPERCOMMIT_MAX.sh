#!/bin/bash

# =================================================================
# PROTOCOLO ULTIMATUM V7 - JULES PILOT DEPLOYMENT
# Target: Galeries Lafayette Commercial Pilot
# Function: Full stack deployment (Vite + FastAPI logic)
# =================================================================

# 1. AUTHENTICATION & VARS
# Usage: ./TRYONYOU_SUPERCOMMIT_MAX.sh <VERCEL_TOKEN>
TOKEN=$1

if [ -z "$TOKEN" ]; then
    echo "❌ ERROR: No Vercel Token provided."
    echo "Usage: ./TRYONYOU_SUPERCOMMIT_MAX.sh <YOUR_TOKEN>"
    exit 1
fi

echo "🚀 Initiating Protocolo Ultimatum V7..."

# 2. DIRECTORY VALIDATION
if [ ! -d "api" ] || [ ! -d "src" ]; then
    echo "❌ ERROR: Project structure invalid. Run from root."
    exit 1
fi

# 3. CLEANING PREVIOUS BUILDS
echo "🧹 Cleaning cache and legacy builds..."
rm -rf .vercel
rm -rf dist

# 4. SETTING PRODUCTION ENVIRONMENT
# We force these vars to ensure the 3-Layer Canvas and BiometricEngine
# activate their high-performance modes.
echo "⚙️  Configuring Production Environment..."
export VERCEL_ORG_ID="team_jules_pilot"
export VERCEL_PROJECT_ID="jules-retail-experience"

# 5. DEPLOYMENT (The SuperCommit)
# --prod: Pushes directly to the live URL
# --yes: Bypasses manual confirmations for the informático
echo "📤 Pushing SuperCommit to Vercel Production..."

vercel deploy --token $TOKEN \
               --prod \
               --yes \
               --build-env NODE_ENV=production \
               --build-env JULES_PILOT_MODE=commercial \
               --env JULES_API_VERSION=v7

# 6. POST-DEPLOYMENT VERIFICATION
if [ $? -eq 0 ]; then
    echo "---"
    echo "✅ DEPLOYMENT SUCCESSFUL"
    echo "🎯 THE JULES PILOT IS LIVE"
    echo "---"
else
    echo "❌ DEPLOYMENT FAILED. Checking logs..."
    vercel logs --token $TOKEN
    exit 1
fi
