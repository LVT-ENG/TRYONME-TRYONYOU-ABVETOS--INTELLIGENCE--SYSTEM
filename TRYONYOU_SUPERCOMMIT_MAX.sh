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
    echo "❌ Error: Vercel Token is missing. Usage: ./TRYONYOU_SUPERCOMMIT_MAX.sh <YOUR_TOKEN>"
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
echo "📤 Deploying to Vercel (Production)..."

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
