#!/bin/bash
set -e

echo "🚀 SUPERCOMMIT TOTAL START"

git checkout main || true
git pull origin main || true

rm -rf node_modules/.vite 2>/dev/null || true

npm install
npm run build || true

git add .
git commit -m "SUPERCOMMIT AUTO DEPLOY" || echo "No changes to commit"

git push origin main

if [ -n "$VERCEL_TOKEN" ]; then
  echo "🌍 Deploying to Vercel..."
  npx vercel --prod --yes --token=$VERCEL_TOKEN --confirm --force
else
  echo "⚠️ No VERCEL_TOKEN set. Skipping deploy."
fi

echo "✅ SUPERCOMMIT DONE"
