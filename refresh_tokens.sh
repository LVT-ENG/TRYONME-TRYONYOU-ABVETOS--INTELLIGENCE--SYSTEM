#!/bin/bash
# =====================================================
# ♻️  ABVETOS Token Refresh Daemon
# Refreshes environment tokens for TRYONYOU system
# TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM
# =====================================================

set -e

# Get the project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$PROJECT_ROOT/logs"
LOG_FILE="$LOG_DIR/token_refresh.log"

# Ensure logs directory exists
mkdir -p "$LOG_DIR"

echo "♻️  Refreshing tokens..."

# Export environment variables from .env file
if [ -f "$PROJECT_ROOT/.env" ]; then
    export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
else
    echo "⚠️  Warning: .env file not found at $PROJECT_ROOT/.env"
fi

# Log the refresh event with timestamp
DATE=$(date "+%Y-%m-%d %H:%M:%S")
echo "[$DATE] Tokens refreshed." >> "$LOG_FILE"

echo "✅ Token refresh completed at $DATE"
