#!/usr/bin/env bash
set -e

# 🚀 TRYONYOU Master Deploy Script
# Modo: FULL AUTO (Deploy Express)
# Conecta automáticamente con @abvet_deploy_bot
# Uso: ./deploy.sh "mensaje del commit"

# ═══════════════════════════════════════════════════════════
# Configuration
# ═══════════════════════════════════════════════════════════

# Mensaje de commit (por defecto si no se pasa)
MSG=${1:-"🚀 ABVETOS auto-deploy"}

# Timestamp para logs
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_DIR="./logs"
LOG_FILE="${LOG_DIR}/deploy_${TIMESTAMP}.log"

# Crear directorio de logs si no existe
mkdir -p "${LOG_DIR}"

# Función para logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "${LOG_FILE}"
}

# Función para enviar notificación a Telegram
send_telegram() {
    local MESSAGE="$1"
    
    # Verificar si las variables de Telegram están configuradas
    if [ -n "${TELEGRAM_BOT_TOKEN}" ] && [ -n "${TELEGRAM_CHAT_ID}" ]; then
        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -d chat_id="${TELEGRAM_CHAT_ID}" \
            -d parse_mode="Markdown" \
            -d text="${MESSAGE}" > /dev/null 2>&1
        log "✅ Telegram notification sent"
    else
        log "⚠️ Telegram credentials not configured - skipping notification"
    fi
}

# ═══════════════════════════════════════════════════════════
# Main Deploy Process
# ═══════════════════════════════════════════════════════════

log "🚀 Starting TRYONYOU deployment..."
log "📝 Commit message: ${MSG}"

# Asegurarse de estar en main
log "🌿 Switching to main branch..."
git checkout main || git checkout -b main

# Añadir cambios
log "📦 Adding changes..."
git add .

# Crear commit
log "💾 Creating commit..."
if git commit -m "$MSG"; then
    COMMIT_HASH=$(git rev-parse --short HEAD)
    log "✅ Commit created: ${COMMIT_HASH}"
    
    # Subir a GitHub
    log "⬆️  Pushing to GitHub..."
    git push origin main
    
    log "✅ Changes pushed to repository"
    log "🌍 Site: https://tryonyou.app"
    # Determine repository path (owner/repo)
    if [ -n "${GITHUB_REPOSITORY}" ]; then
        REPO_PATH="${GITHUB_REPOSITORY}"
    else
        # Extract owner/repo from git remote URL
        REMOTE_URL=$(git config --get remote.origin.url)
        # Remove .git suffix if present
        REMOTE_URL="${REMOTE_URL%.git}"
        # Extract owner/repo from URL
        if [[ "${REMOTE_URL}" =~ github\.com[:/]+([^/]+/[^/]+)$ ]]; then
            REPO_PATH="${BASH_REMATCH[1]}"
        else
            REPO_PATH="unknown/unknown"
        fi
    fi
    log "📊 GitHub: https://github.com/${REPO_PATH}"
    # Enviar notificación a Telegram
    TELEGRAM_MSG="🚀 *TRYONYOU Deploy Success*

✅ *Status:* Changes pushed
📦 *Commit:* \`${COMMIT_HASH}\`
💬 *Message:* ${MSG}
🌐 *URL:* https://tryonyou.app
⏰ *Time:* $(date -u '+%Y-%m-%d %H:%M:%S UTC')

🤖 Deploy automation active
📋 Log: deploy_${TIMESTAMP}.log"
    
    send_telegram "${TELEGRAM_MSG}"
    
else
    log "⚠️ No changes to commit"
    TELEGRAM_MSG="⚠️ *TRYONYOU Deploy Notice*

ℹ️ No changes detected
⏰ *Time:* $(date -u '+%Y-%m-%d %H:%M:%S UTC')

Repository is up to date."
    
    send_telegram "${TELEGRAM_MSG}"
fi

log "✅ Deploy process completed"
log "📄 Full log saved to: ${LOG_FILE}"

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ TRYONYOU deploy completed"
echo "🌐 https://tryonyou.app"
echo "📄 Log: ${LOG_FILE}"
echo "════════════════════════════════════════════════════════"
