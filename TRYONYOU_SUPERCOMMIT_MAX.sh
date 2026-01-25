#!/bin/bash
# PROTOCOLO ULTIMATUM V7 - JULES PILOT
# USAGE: ./TRYONYOU_SUPERCOMMIT_MAX.sh [VERCEL_TOKEN]

VERCEL_TOKEN=$1

echo "🚀 Preparing Jules Pilot for Galeries Lafayette (SuperCommit MAX)..."

# 1. Install Dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed."
    exit 1
fi

# 2. Build Project
echo "🔨 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ npm run build failed."
    exit 1
fi

# 3. Verify Build
echo "🔍 Verifying build artifacts..."
python3 verification/verify_pilot_build.py
if [ $? -ne 0 ]; then
    echo "❌ Build verification failed."
    exit 1
fi

echo "✅ Build & Verification Complete."

# 4. Deploy (if token provided)
PROJECT_NAME="jules-pilot-galeries-lafayette"

if [ -z "$VERCEL_TOKEN" ]; then
    echo "⚠️  No Vercel Token provided. Deployment paused."
    echo ""
    echo "👉  READY FOR PRODUCTION. Run this command to go live:"
    echo "    vercel deploy --prod"
    echo ""
    echo "    (Ensure you are logged in with 'vercel login' first)"
    exit 0
fi

echo "🚀 Deploying to Vercel..."

vercel deploy --name $PROJECT_NAME \
               --token $VERCEL_TOKEN \
               --prod \
               --yes \
               --build-env NODE_ENV=production

if [ $? -eq 0 ]; then
    echo "✅ DEPLOYMENT SUCCESSFUL: Jules is live."
else
    echo "❌ Deployment failed."
    exit 1
fi
