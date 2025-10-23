#!/usr/bin/env bash
# ============================================
# ABVETOS Auto-Deploy Express - Token Refresh
# ============================================
# This script refreshes authentication tokens for:
# - Vercel CLI
# - GitHub CLI
# - Google Cloud (for Drive backups)
# - Telegram Bot (validates token)
# ============================================

set -e

# Color output helpers
log() { echo -e "\033[1;32m✅ $1\033[0m"; }
warn() { echo -e "\033[1;33m⚠️  $1\033[0m"; }
err() { echo -e "\033[1;31m❌ $1\033[0m"; exit 1; }
info() { echo -e "\033[1;36mℹ️  $1\033[0m"; }

echo "╔════════════════════════════════════════════╗"
echo "║  ABVETOS Auto-Deploy Express             ║"
echo "║  Token Refresh & Validation               ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Load environment variables if .env exists
if [ -f .env ]; then
  info "Loading environment variables from .env"
  set -a
  source .env
  set +a
else
  warn ".env file not found. Using system environment variables."
fi

# ============================================
# 1. VERCEL TOKEN REFRESH
# ============================================
echo ""
info "1️⃣  Checking Vercel authentication..."

if command -v vercel >/dev/null 2>&1; then
  if vercel whoami >/dev/null 2>&1; then
    VERCEL_USER=$(vercel whoami)
    log "Vercel: Authenticated as ${VERCEL_USER}"
  else
    warn "Vercel: Not authenticated. Running login..."
    vercel login
    if vercel whoami >/dev/null 2>&1; then
      log "Vercel: Login successful"
    else
      err "Vercel: Login failed"
    fi
  fi
else
  warn "Vercel CLI not installed. Installing..."
  npm install -g vercel
  vercel login
fi

# Validate Vercel token from environment
if [ -n "$VERCEL_TOKEN" ]; then
  info "Validating VERCEL_TOKEN from environment..."
  RESPONSE=$(curl -sf -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user 2>/dev/null)
  CURL_STATUS=$?
  if [ $CURL_STATUS -ne 0 ]; then
    warn "Network error or HTTP error occurred while validating VERCEL_TOKEN"
  elif echo "$RESPONSE" | grep -q '"user"'; then
    log "VERCEL_TOKEN is valid"
  else
    warn "VERCEL_TOKEN appears to be invalid or expired"
  fi
else
  warn "VERCEL_TOKEN not set in environment"
fi

# ============================================
# 2. GITHUB TOKEN REFRESH
# ============================================
echo ""
info "2️⃣  Checking GitHub authentication..."

if command -v gh >/dev/null 2>&1; then
  if gh auth status >/dev/null 2>&1; then
    GITHUB_USER=$(gh api user -q .login)
    log "GitHub: Authenticated as ${GITHUB_USER}"
  else
    warn "GitHub: Not authenticated. Running login..."
    gh auth login
    if gh auth status >/dev/null 2>&1; then
      log "GitHub: Login successful"
    else
      err "GitHub: Login failed"
    fi
  fi
else
  warn "GitHub CLI not installed. Please install from https://cli.github.com/"
fi

# Validate GitHub token from environment
if [ -n "$GITHUB_TOKEN" ]; then
  info "Validating GITHUB_TOKEN from environment..."
  if curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep -q '"login"'; then
    log "GITHUB_TOKEN is valid"
  else
    warn "GITHUB_TOKEN appears to be invalid or expired"
  fi
else
  warn "GITHUB_TOKEN not set in environment"
fi

# ============================================
# 3. TELEGRAM BOT TOKEN VALIDATION
# ============================================
echo ""
info "3️⃣  Checking Telegram Bot authentication..."

if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
  info "Validating Telegram Bot token..."
  
  # Get bot info
  BOT_INFO=$(curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe")
  
  if echo "$BOT_INFO" | grep -q '"ok":true'; then
    BOT_NAME=$(echo "$BOT_INFO" | grep -o '"username":"[^"]*"' | cut -d'"' -f4)
    log "Telegram: Bot @${BOT_NAME} is active"
    
    # Test sending a message
    TEST_MSG="🔄 Token refresh completed at $(date '+%Y-%m-%d %H:%M:%S')"
    SEND_RESULT=$(curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d chat_id="${TELEGRAM_CHAT_ID}" \
      -d text="${TEST_MSG}")
    
    if echo "$SEND_RESULT" | grep -q '"ok":true'; then
      log "Telegram: Test message sent successfully to chat ${TELEGRAM_CHAT_ID}"
    else
      warn "Telegram: Failed to send test message. Check TELEGRAM_CHAT_ID"
    fi
  else
    warn "Telegram: Bot token appears to be invalid"
  fi
else
  warn "Telegram credentials not set in environment"
fi

# ============================================
# 4. GOOGLE CLOUD AUTHENTICATION (Optional)
# ============================================
echo ""
info "4️⃣  Checking Google Cloud authentication..."

if command -v gcloud >/dev/null 2>&1; then
  if gcloud auth list 2>&1 | grep -q "ACTIVE"; then
    GCLOUD_ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)")
    log "Google Cloud: Authenticated as ${GCLOUD_ACCOUNT}"
  else
    warn "Google Cloud: Not authenticated. Running login..."
    gcloud auth login
    if gcloud auth list 2>&1 | grep -q "ACTIVE"; then
      log "Google Cloud: Login successful"
    else
      warn "Google Cloud: Login failed or skipped"
    fi
  fi
else
  warn "Google Cloud SDK not installed. Skipping..."
fi

# Check for service account credentials
if [ -n "$GOOGLE_DRIVE_CREDENTIALS_JSON" ] && [ -f "$GOOGLE_DRIVE_CREDENTIALS_JSON" ]; then
  log "Google: Service account credentials file found"
  info "Activating service account..."
  GCLOUD_ACTIVATE_OUTPUT=$(gcloud auth activate-service-account --key-file="$GOOGLE_DRIVE_CREDENTIALS_JSON" 2>&1)
  if [ $? -eq 0 ]; then
    log "Google: Service account activated successfully"
  else
    warn "Google: Failed to activate service account: $GCLOUD_ACTIVATE_OUTPUT"
  fi
else
  warn "GOOGLE_DRIVE_CREDENTIALS_JSON not configured"
fi

# ============================================
# 5. SUMMARY
# ============================================
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  Token Refresh Summary                    ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Create summary
SUMMARY_FILE="/tmp/token_refresh_summary.txt"
cat > "$SUMMARY_FILE" << EOF
Token Refresh Summary - $(date '+%Y-%m-%d %H:%M:%S')
================================================

Vercel: $(vercel whoami 2>/dev/null || echo "Not authenticated")
GitHub: $(gh api user -q .login 2>/dev/null || echo "Not authenticated")
Telegram: $([ -n "$TELEGRAM_BOT_TOKEN" ] && echo "Configured" || echo "Not configured")
Google Cloud: $(gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null || echo "Not authenticated")

All tokens have been validated and refreshed where necessary.
Run this script periodically to ensure uninterrupted service.
EOF

cat "$SUMMARY_FILE"

# Optionally save summary to a log file
LOG_DIR="./logs"
mkdir -p "$LOG_DIR"
cp "$SUMMARY_FILE" "$LOG_DIR/token_refresh_$(date '+%Y%m%d_%H%M%S').log"

log "Token refresh completed successfully!"
echo ""
info "💡 Tip: Add this script to your crontab for automatic token refresh:"
echo "   0 0 * * 0 cd /path/to/repo && ./refresh_tokens.sh"
echo ""
