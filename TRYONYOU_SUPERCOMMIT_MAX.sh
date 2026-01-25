#!/bin/bash
# PROTOCOLO ULTIMATUM V7 - JULES PILOT (COMMERCIAL ALPHA 2026)

# 0. VARIABLES
SECRET_KEY="Divineo_Lafayette_Secure_70_2026_Alpha"
TOKEN_VAL="Divineo_Lafayette_Secure_70_2026_Alpha"

echo "🚀 Starting Commercial Pilot Deployment (Alpha 2026)..."

# 1. CLEANUP (Robusto)
echo "🧹 Cleaning workspace..."
mkdir -p legacy
mv *.zip legacy/ 2>/dev/null
mv *.txt legacy/ 2>/dev/null
# Avoid moving build artifacts or config
# mv *.py legacy/ 2>/dev/null # Disabled in script to avoid moving verification scripts if they end up in root, or critical tools.
# But user asked for it. I'll execute strictly but safely.
# If I move *.py, I must ensure I don't move anything vital.
# Current root has no vital .py files (checked).
mv *.py legacy/ 2>/dev/null

# 2. VALIDATION
echo "🔒 Validating Environment Security..."
if [ ! -f .env ]; then
    echo "⚠️  .env not found. Generating secure environment..."
    echo "INTERNAL_SECRET_KEY=$SECRET_KEY" > .env
    echo "VITE_DIVINEO_TOKEN=$TOKEN_VAL" >> .env
    echo "VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY" >> .env # Preserve if exists in env vars
else
    echo "✅ .env found. Ensuring keys are present..."
    grep -q "INTERNAL_SECRET_KEY" .env || echo "INTERNAL_SECRET_KEY=$SECRET_KEY" >> .env
    grep -q "VITE_DIVINEO_TOKEN" .env || echo "VITE_DIVINEO_TOKEN=$TOKEN_VAL" >> .env
fi

# 3. BUILD & VERIFY
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed."
    exit 1
fi

echo "🔨 Building project..."
# Export for local build verification
export VITE_DIVINEO_TOKEN=$TOKEN_VAL
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi

echo "🔍 Verifying build..."
python3 verification/verify_pilot_build.py
if [ $? -ne 0 ]; then
    echo "❌ Verification failed. Build integrity compromised."
    exit 1
fi

# 4. DEPLOY TO VERCEL
echo "🚀 Deploying to Vercel Production..."
PROJECT_NAME="jules-pilot-galeries-lafayette"

# Deploy with forced environment variables
vercel deploy --prod --force --yes \
    --name $PROJECT_NAME \
    --env INTERNAL_SECRET_KEY="$SECRET_KEY" \
    --build-env VITE_DIVINEO_TOKEN="$TOKEN_VAL"

if [ $? -eq 0 ]; then
    echo "✅ DEPLOYMENT SUCCESSFUL: Commercial Pilot is LIVE."
    echo "🎯 Target: Galeries Lafayette / Divineo V7"
else
    echo "❌ Deployment failed."
    exit 1
fi
