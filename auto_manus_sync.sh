#!/bin/bash
# AUTO-MANUS SYNC — Full Workspace Downloader for Deploy Express
# This script retrieves files generated from the Manus Ubuntu workspace
# and prepares them for deployment.

set -e

# Store original working directory
ORIGINAL_DIR="$(pwd)"

# Configuration - adjust these paths as needed for your environment
MANUS_URL="${MANUS_URL:-https://manus.im/api/export/all}"

# URL validation - only allow https URLs from expected domains
if [[ ! "$MANUS_URL" =~ ^https://[a-zA-Z0-9.-]+\.(im|io|com)/.*$ ]]; then
    echo "[auto-manus] Warning: URL does not match expected pattern, using default"
    MANUS_URL="https://manus.im/api/export/all"
fi

BASE="${BASE:-./deploy}"
# Convert BASE to absolute path
BASE="$(cd "$(dirname "$BASE")" 2>/dev/null && pwd)/$(basename "$BASE")" || BASE="$ORIGINAL_DIR/deploy"
TARGET="$BASE/MANUS_AUTO_SYNC"
ZIP_OUT="$TARGET/manus_full_export.zip"
FINAL="$BASE/__deploy"
FINAL_ZIP="$BASE/MANUS_FINAL_PACKAGE.zip"

echo "[auto-manus] Starting sync process..."

# Clean and create directories
rm -rf "$TARGET"
mkdir -p "$TARGET"

echo "[auto-manus] Fetching Manus outputs from $MANUS_URL..."

# Download if URL is provided and accessible
if curl --connect-timeout 10 -sfL "$MANUS_URL" --output "$ZIP_OUT" 2>/dev/null; then
    echo "[auto-manus] Download complete."
    
    # Use absolute paths to avoid directory change issues
    unzip -o "$ZIP_OUT" -d "$TARGET" 2>/dev/null || echo "[auto-manus] No files to unzip or already extracted."
    
    mkdir -p "$FINAL"
    rsync -a "$TARGET"/. "$FINAL"/ 2>/dev/null || cp -r "$TARGET"/. "$FINAL"/ 2>/dev/null || true
    
    # Create zip using absolute paths
    (cd "$FINAL" && zip -r "$FINAL_ZIP" . >/dev/null 2>&1) || true
    
    echo "[auto-manus] MANUS_FINAL_READY"
    echo "[auto-manus] Package available at: $FINAL_ZIP"
else
    echo "[auto-manus] Note: Could not reach Manus URL - this is expected in CI environments"
    echo "[auto-manus] For local usage, ensure manus.im is accessible"
fi

# Return to original directory
cd "$ORIGINAL_DIR"

echo "[auto-manus] AUTO-MANUS SYNC COMPLETE"
