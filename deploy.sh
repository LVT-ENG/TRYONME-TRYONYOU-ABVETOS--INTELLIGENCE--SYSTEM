#!/usr/bin/env bash
set -e

# 🚀 TRYONYOU Master Deploy Script
# Full Auto Deploy with Telegram Integration & Logging
# Uso: ./deploy.sh "mensaje del commit"

# ==============================================================================
# CONFIGURATION
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${LOG_DIR}/deploy_${TIMESTAMP}.log"

# Mensaje de commit (por defecto si no se pasa)
MSG=${1:-"🚀 ABVETOS Auto-Deploy"}

# Telegram configuration (from environment or .env)
TELEGRAM_TOKEN="${TELEGRAM_BOT_TOKEN}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID}"

# ==============================================================================
# LOGGING FUNCTIONS
# ==============================================================================

# Create logs directory if it doesn't exist
mkdir -p "${LOG_DIR}"

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "${LOG_FILE}"
}

log_error() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1" | tee -a "${LOG_FILE}" >&2
}

log_success() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1" | tee -a "${LOG_FILE}"
}

# ==============================================================================
# TELEGRAM NOTIFICATION
# ==============================================================================

send_telegram() {
    local message="$1"
    
    if [ -n "$TELEGRAM_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
            -d chat_id="${TELEGRAM_CHAT_ID}" \
            -d parse_mode="Markdown" \
            -d text="$message" > /dev/null 2>&1 || true
    fi
}

# ==============================================================================
# DEPLOYMENT PROCESS
# ==============================================================================

log "🚀 Starting TRYONYOU deployment process"
log "Message: $MSG"

# Get commit info
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
AUTHOR=$(git config user.name 2>/dev/null || echo "ABVETOS")

log "Branch: $BRANCH"
log "Author: $AUTHOR"
log "Current commit: $COMMIT_HASH"

# Asegurarse de estar en main
log "Checking out main branch..."
git checkout main || git checkout -b main

# Añadir cambios
log "Adding changes..."
git add .

# Verificar si hay cambios
if git diff --cached --quiet; then
    log "⚠️ No changes to commit"
    HAS_CHANGES=false
else
    log "Changes detected, proceeding with commit"
    HAS_CHANGES=true
fi

# Crear commit si hay cambios
if [ "$HAS_CHANGES" = true ]; then
    log "Creating commit..."
    git commit -m "$MSG" || log_error "Commit failed"
    NEW_COMMIT_HASH=$(git rev-parse --short HEAD)
    log_success "Commit created: $NEW_COMMIT_HASH"
else
    NEW_COMMIT_HASH=$COMMIT_HASH
fi

# Subir a GitHub
log "Pushing to GitHub..."
if git push origin main 2>&1 | tee -a "${LOG_FILE}"; then
    log_success "Changes pushed to repository"
    DEPLOY_STATUS="success"
else
    log_error "Push failed"
    DEPLOY_STATUS="failed"
    exit 1
fi

# ==============================================================================
# NOTIFICATIONS
# ==============================================================================

log "Sending deployment notification..."

TELEGRAM_MSG="🚀 *TRYONYOU Deploy Express*

✅ *Status:* Deployment ${DEPLOY_STATUS}
🌐 *URL:* https://tryonyou.app
📦 *Commit:* \`${NEW_COMMIT_HASH}\`
💬 *Message:* ${MSG}
🌿 *Branch:* ${BRANCH}
👤 *Author:* ${AUTHOR}
⏰ *Time:* $(date -u '+%Y-%m-%d %H:%M:%S UTC')

🤖 ABVETOS Auto-Deploy Active
📝 Log: deploy_${TIMESTAMP}.log"

send_telegram "$TELEGRAM_MSG"

# ==============================================================================
# COMPLETION
# ==============================================================================

log_success "Deployment completed successfully"
log "📝 Full log saved to: ${LOG_FILE}"
log "🌍 Verify deployment at: https://tryonyou.app"
log "📊 Check GitHub Actions for build status"

echo ""
echo "✅ TRYONYOU deploy completed"
echo "🌐 https://tryonyou.app"
echo "📦 Commit: abvetos-auto-${NEW_COMMIT_HASH}"
echo "📝 Log: ${LOG_FILE}"
