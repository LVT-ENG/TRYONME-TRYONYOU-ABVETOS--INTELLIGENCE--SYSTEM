#!/bin/zsh

set -e

MANUS_URL="https://manus.im/api/export/all"
BASE="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
TARGET="$BASE/MANUS_AUTO_SYNC"
ZIP_OUT="$TARGET/manus_full_export.zip"
FINAL="$BASE/__deploy"
FINAL_ZIP="$BASE/MANUS_FINAL_PACKAGE.zip"

rm -rf "$TARGET"
mkdir -p "$TARGET"

echo "[auto-manus] Workspace cleaned."
echo "[auto-manus] Fetching all Manus outputs..."

curl -L "$MANUS_URL" --output "$ZIP_OUT"

cd "$TARGET"
unzip -o "$ZIP_OUT"

mkdir -p "$FINAL"
rsync -a "$TARGET"/ "$FINAL"/

cd "$FINAL"
zip -r "$FINAL_ZIP" .

echo "[auto-manus] Download complete."
echo "AUTO-MANUS SYNC READY:"
echo "MANUS_FINAL_PACKAGE.zip"
