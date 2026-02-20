#!/bin/bash

# ════════════════════════════════════════════════════════════════
# 🦚 TRYONYOU — SUPERCOMMIT MAX
# ════════════════════════════════════════════════════════════════

set -e

echo "🦚 TRYONYOU SUPERCOMMIT MAX — START"

# 1. Verify Repo Root
if [ ! -f "package.json" ]; then
  echo "❌ ERROR: Run this script from the repository root."
  exit 1
fi

# 2. Inventory Sync
echo "🔄 Synchronizing Inventory..."
if [ -f "regenerate_inventory.py" ]; then
    python3 regenerate_inventory.py
    echo "✅ Inventory synchronized."
else
    echo "⚠️  regenerate_inventory.py not found. Skipping."
fi

# 3. Zero Tallas Check
echo "🔍 Checking for Zero Tallas Compliance..."
if [ ! -d "src" ]; then
    echo "⚠️  src/ directory not found. Skipping Zero Tallas check."
else
VIOLATIONS=$(grep -rE "peso|talla|size|weight" src/ | grep -vE "font-size|resize|background-size|inventory_index.json" || true)
fi
if [ -n "$VIOLATIONS" ]; then
    echo "❌ Zero Tallas VIOLATION FOUND:"
    echo "$VIOLATIONS"
    exit 1
else
    echo "✅ Zero Tallas Compliance Verified."
fi

# 4. Clean Cache
rm -rf node_modules/.vite 2>/dev/null || true

# 5. Install & Build
echo "🏗️  Building..."
npm install
npm run build
echo "✅ Build Successful."

# 6. Logging
DATE=$(date)
echo "📝 Logging to logs/audit_lafayette.log..."
mkdir -p logs
echo "[$DATE] TRYONYOU SUPERCOMMIT MAX: VALIDATED" >> logs/audit_lafayette.log

# 7. Stamp Certificate & README
echo "- Validation: $DATE" >> CERTIFICAT_TECHNIQUE_V9.md
echo "Last Validated: $DATE" >> README.md

# 8. Git Commit & Push
echo "🚀 Committing and Pushing..."
git add .
git commit -m "SUPERCOMMIT MAX: $DATE" || echo "No changes to commit"
git push origin main || echo "⚠️  Push failed (check permissions or remote state)."

# 9. Vercel Deploy (optional)
if [ -n "$VERCEL_TOKEN" ]; then
  echo "🌍 Deploying to Vercel..."
  npx vercel --prod --yes --token="$VERCEL_TOKEN" --confirm --force
else
  echo "⚠️  No VERCEL_TOKEN set. Skipping Vercel deploy."
fi

echo "✅ TRYONYOU SUPERCOMMIT MAX — COMPLETED"
