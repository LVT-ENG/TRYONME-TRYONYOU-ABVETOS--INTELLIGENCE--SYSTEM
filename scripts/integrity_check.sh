#!/bin/bash
set -e

echo "🔍 Starting Integrity Check..."

REQUIRED_DIRS=("src" "public" "docs")
REQUIRED_FILES=("package.json" "vercel.json" "vite.config.js" "README.md")

MISSING=0

for dir in "${REQUIRED_DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "❌ Missing directory: $dir"
    MISSING=1
  else
    echo "✅ Directory exists: $dir"
  fi
done

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing file: $file"
    MISSING=1
  else
    echo "✅ File exists: $file"
  fi
done

if [ "$MISSING" -eq 1 ]; then
  echo "⚠️  Integrity Check FAILED. Please fix missing files/directories."
  exit 1
else
  echo "🎉 Integrity Check PASSED. Structure is valid."
fi
