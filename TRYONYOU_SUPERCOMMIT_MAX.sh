#!/bin/bash

# --- Protocolo Ultimatum V7: Jules Pilot Deployment ---
# Goal: Functional commercial pilot deployment to Vercel.
# Author: Gemini / Jules Agent
# Date: 2026-01-22

echo "🚀 Starting Protocolo Ultimatum V7..."

# 1. Configuration & Security Check
VERCEL_TOKEN=$1
PROJECT_NAME="jules-pilot-galeries-lafayette"

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: Vercel Token is missing."
    echo ""
    echo "Usage: ./TRYONYOU_SUPERCOMMIT_MAX.sh <YOUR_TOKEN>"
    echo ""
    echo "Options:"
    echo "  SKIP_CONFIRM=1  Skip confirmation prompt (for CI/automation)"
    echo ""
    echo "Example:"
    echo "  ./TRYONYOU_SUPERCOMMIT_MAX.sh <token>"
    echo "  SKIP_CONFIRM=1 ./TRYONYOU_SUPERCOMMIT_MAX.sh <token>"
    exit 1
fi

# 2. Project Cleanup & Initialization
echo "🧹 Cleaning legacy cache..."
rm -rf .vercel

# 3. Environment Variable Sync
# Ensuring the biometric engine knows it is in production
echo "⚙️  Configuring environment variables..."
# export VERCEL_PROJECT_ID=$PROJECT_NAME
export NODE_ENV="production"

# 4. Build & Deployment (The "SuperCommit")
echo "📤 Preparing deployment to Vercel (Production)..."

# Pre-deployment logging for visibility
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 DEPLOYMENT CONFIGURATION:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Project Name:    $PROJECT_NAME"
echo "  Environment:     production"
echo "  Mode:            Production (--prod)"
echo "  Build Env:       NODE_ENV=production"
echo "  Backend URL:     http://localhost:8000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Confirmation prompt (unless SKIP_CONFIRM is set for CI/automation)
if [ -z "$SKIP_CONFIRM" ]; then
    echo "⚠️  WARNING: This will deploy directly to PRODUCTION."
    echo "⚠️  This will overwrite the current deployment."
    echo ""
    read -p "🤔 Type 'yes' to confirm and proceed: " -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 0
    fi
    echo "✅ Confirmed. Proceeding with deployment..."
else
    echo "ℹ️  Auto-confirm mode enabled (SKIP_CONFIRM is set)."
fi

echo ""
echo "🚀 Executing deployment..."

# Note: We use --prod to bypass staging and force the commercial pilot live
DEPLOYMENT_URL=$(vercel deploy --name "$PROJECT_NAME" \
               --token "$VERCEL_TOKEN" \
               --prod \
               --force \
               --yes \
               --build-env NODE_ENV=production \
               --build-env BACKEND_URL=http://localhost:8000)

# 5. Post-Deployment Validation
if [ $? -eq 0 ]; then
    echo "✅ PROTOCOLO ULTIMATUM SUCCESSFUL."
    echo "🌐 Project is live at: $DEPLOYMENT_URL"
else
    echo "⚠️  Deployment failed. Checking logs for $DEPLOYMENT_URL ..."
    vercel logs "$DEPLOYMENT_URL" --token "$VERCEL_TOKEN"
    exit 1
fi

# 6. Self-Destruct / Maintenance (Optional)
# Uncomment the line below to clear the token from shell history
# history -c
