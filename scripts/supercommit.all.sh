#!/bin/bash

# ════════════════════════════════════════════════
# 🦚 TRYONYOU — SUPERCOMMIT ALL-IN-ONE PRO MAX
# ════════════════════════════════════════════════

set -e

echo "🦚 SUPERCOMMIT ALL-IN-ONE START"

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
    echo "❌ regenerate_inventory.py not found!"
    exit 1
fi

# 3. Zero Tallas Check
echo "🔍 Checking for Zero Tallas Compliance..."
# Grep for prohibited words, excluding allowed files/patterns
VIOLATIONS=$(grep -rE "peso|talla|size|weight" src/ | grep -vE "font-size|resize|background-size|inventory_index.json" || true)

if [ -n "$VIOLATIONS" ]; then
    echo "❌ Zero Tallas VIOLATION FOUND:"
    echo "$VIOLATIONS"
    exit 1
else
    echo "✅ Zero Tallas Compliance Verified."
fi

# 4. Build
echo "🏗️ Building..."
npm install
npm run build
echo "✅ Build Successful."

# 5. Logging
DATE=$(date)
echo "📝 Logging to logs/audit_lafayette.log..."
mkdir -p logs
echo "[$DATE] SUPERCOMMIT MAX: VALIDATED" >> logs/audit_lafayette.log

# 6. Stamping
echo "- Validation: $DATE" >> CERTIFICAT_TECHNIQUE_V9.md
# Update README
echo "Last Validated: $DATE" >> README.md

# 7. Git Commit & Push
echo "🚀 Committing and Pushing..."
git add .
git commit -m "SUPERCOMMIT MAX: $DATE" || echo "No changes to commit"
git push origin main || echo "Push failed (maybe already up to date or no perm)"

echo "✅ SUPERCOMMIT ALL-IN-ONE PRO MAX COMPLETED"
