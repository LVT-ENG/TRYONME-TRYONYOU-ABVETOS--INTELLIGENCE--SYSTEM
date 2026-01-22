#!/bin/bash
# PROTOCOLO ULTIMATUM V7 - JULES PILOT
VERCEL_TOKEN=$1

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: Vercel Token missing. Usage: ./TRYONYOU_SUPERCOMMIT_MAX.sh <TOKEN>"
    exit 1
fi

echo "🚀 Preparing Jules Pilot for Galeries Lafayette..."

# 1. Sync Project Name
PROJECT_NAME="jules-pilot-galeries-lafayette"

# 2. Deploy
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
