#!/bin/bash
###############################################################################
# 🦚 ABVETOS DEPLOY EXPRESS HOOKS
# Ejecuta acciones posteriores al despliegue
# Autor: ABVETOS Orchestrator · Agente 70
# Versión: 1.0.0
###############################################################################
#
# 💡 Propósito:
#   • Ejecutar capturas de pantalla post-despliegue
#   • Realizar backup de archivos críticos
#   • Limpiar caché y archivos temporales
#   • Ejecutar tareas de mantenimiento automático
#
###############################################################################

set -euo pipefail

# === CONFIGURACIÓN =========================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Variables de entorno
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# Directorios
BACKUP_DIR="$PROJECT_ROOT/backups"
CACHE_DIR="$PROJECT_ROOT/.cache"
SCREENSHOTS_DIR="$PROJECT_ROOT/logs/screenshots"

# Información del proyecto
PROJECT_NAME="TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM"
DOMAIN_URL="https://tryonyou.app"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# === FUNCIONES =============================================================

log_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_hook() {
    echo -e "${PURPLE}[HOOK]${NC} $1"
}

notify_telegram() {
    local message="$1"
    
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        return 0
    fi
    
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d parse_mode="HTML" \
        -d text="${message}" > /dev/null 2>&1 || true
}

hook_capture_screenshots() {
    log_hook "Running screenshot capture hook..."
    
    mkdir -p "$SCREENSHOTS_DIR"
    
    # Check if capture script exists
    local capture_script="$PROJECT_ROOT/scripts/capture-screenshots.sh"
    
    if [ -f "$capture_script" ]; then
        log_info "Executing screenshot script..."
        
        # Run screenshot capture
        if bash "$capture_script" "$DOMAIN_URL" "$SCREENSHOTS_DIR" 2>&1; then
            log_success "Screenshots captured successfully"
            
            # Count screenshots
            local screenshot_count=$(find "$SCREENSHOTS_DIR" -name "*.png" -type f | wc -l)
            log_info "Total screenshots: $screenshot_count"
            
            # Notify about screenshots
            notify_telegram "📸 <b>Screenshots Captured</b>%0A%0AProject: $PROJECT_NAME%0ACount: $screenshot_count%0ATime: $(date +'%H:%M:%S')"
        else
            log_warning "Screenshot capture completed with warnings"
        fi
    else
        log_warning "Screenshot script not found, skipping"
    fi
}

hook_backup_critical_files() {
    log_hook "Running backup hook..."
    
    mkdir -p "$BACKUP_DIR"
    
    local backup_archive="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
    
    # Files and directories to backup
    local backup_items=(
        "package.json"
        "package-lock.json"
        "vercel.json"
        ".env.example"
        "README.md"
        "docs"
    )
    
    log_info "Creating backup archive..."
    
    cd "$PROJECT_ROOT"
    
    # Create backup archive
    local items_to_backup=()
    for item in "${backup_items[@]}"; do
        if [ -e "$item" ]; then
            items_to_backup+=("$item")
        fi
    done
    
    if [ ${#items_to_backup[@]} -gt 0 ]; then
        tar -czf "$backup_archive" "${items_to_backup[@]}" 2>/dev/null || {
            log_warning "Backup creation completed with warnings"
            return 0
        }
        
        local backup_size=$(du -sh "$backup_archive" | cut -f1)
        log_success "Backup created: $backup_archive ($backup_size)"
        
        # Cleanup old backups (keep last 7 days)
        find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete 2>/dev/null || true
        log_info "Old backups cleaned up (kept last 7 days)"
    else
        log_warning "No items to backup"
    fi
}

hook_clear_cache() {
    log_hook "Running cache cleanup hook..."
    
    local cache_cleared=false
    
    # Clear npm cache
    if command -v npm &> /dev/null; then
        log_info "Clearing npm cache..."
        npm cache verify &> /dev/null || true
        cache_cleared=true
    fi
    
    # Clear project cache directory
    if [ -d "$CACHE_DIR" ]; then
        log_info "Clearing project cache..."
        rm -rf "$CACHE_DIR"
        cache_cleared=true
    fi
    
    # Clear node_modules/.cache if exists
    if [ -d "$PROJECT_ROOT/node_modules/.cache" ]; then
        log_info "Clearing node_modules cache..."
        rm -rf "$PROJECT_ROOT/node_modules/.cache"
        cache_cleared=true
    fi
    
    # Clear Vite cache if exists
    if [ -d "$PROJECT_ROOT/.vite" ]; then
        log_info "Clearing Vite cache..."
        rm -rf "$PROJECT_ROOT/.vite"
        cache_cleared=true
    fi
    
    if [ "$cache_cleared" = true ]; then
        log_success "Cache cleared successfully"
    else
        log_info "No cache to clear"
    fi
}

hook_optimize_assets() {
    log_hook "Running asset optimization hook..."
    
    # Check if optimize-images script exists
    local optimize_script="$PROJECT_ROOT/scripts/optimize-images.sh"
    
    if [ -f "$optimize_script" ]; then
        log_info "Running image optimization..."
        
        if bash "$optimize_script" 2>&1; then
            log_success "Assets optimized"
        else
            log_warning "Asset optimization completed with warnings"
        fi
    else
        log_info "Optimization script not found, skipping"
    fi
}

hook_sync_to_drive() {
    log_hook "Running Google Drive sync hook..."
    
    # Check if sync script exists
    local sync_script="$PROJECT_ROOT/scripts/sync-to-drive.sh"
    
    if [ -f "$sync_script" ]; then
        log_info "Syncing to Google Drive..."
        
        if bash "$sync_script" 2>&1; then
            log_success "Synced to Google Drive"
            notify_telegram "☁️ <b>Google Drive Sync</b>%0A%0AProject: $PROJECT_NAME%0AStatus: ✅ Completed%0ATime: $(date +'%H:%M:%S')"
        else
            log_warning "Drive sync completed with warnings"
        fi
    else
        log_info "Drive sync script not found, skipping"
    fi
}

hook_generate_report() {
    log_hook "Running report generation hook..."
    
    # Check if report script exists
    local report_script="$PROJECT_ROOT/scripts/generate_deploy_report.sh"
    
    if [ -f "$report_script" ]; then
        log_info "Generating deployment report..."
        
        if bash "$report_script" 2>&1; then
            log_success "Deployment report generated"
        else
            log_warning "Report generation completed with warnings"
        fi
    else
        log_info "Report script not found, skipping"
    fi
}

hook_health_check() {
    log_hook "Running health check hook..."
    
    log_info "Checking deployment URL: $DOMAIN_URL"
    
    # Perform HTTP health check
    if command -v curl &> /dev/null; then
        local http_code=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN_URL" --max-time 10)
        
        if [ "$http_code" -eq 200 ]; then
            log_success "Health check passed (HTTP $http_code)"
            notify_telegram "✅ <b>Health Check Passed</b>%0A%0AURL: $DOMAIN_URL%0AStatus: HTTP $http_code%0ATime: $(date +'%H:%M:%S')"
        else
            log_warning "Health check returned HTTP $http_code"
            notify_telegram "⚠️ <b>Health Check Warning</b>%0A%0AURL: $DOMAIN_URL%0AStatus: HTTP $http_code%0ATime: $(date +'%H:%M:%S')"
        fi
    else
        log_warning "curl not available, skipping health check"
    fi
}

hook_update_version_badge() {
    log_hook "Running version badge update hook..."
    
    # Get current version
    local current_version="unknown"
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        current_version=$(node -p "require('$PROJECT_ROOT/package.json').version" 2>/dev/null || echo "unknown")
    fi
    
    log_info "Current version: $current_version"
    
    # Create version badge file
    local badge_file="$PROJECT_ROOT/docs/version-badge.json"
    mkdir -p "$(dirname "$badge_file")"
    
    cat > "$badge_file" << EOF
{
  "schemaVersion": 1,
  "label": "version",
  "message": "$current_version",
  "color": "blue"
}
EOF
    
    log_success "Version badge updated"
}

hook_cleanup_temp_files() {
    log_hook "Running temporary files cleanup hook..."
    
    cd "$PROJECT_ROOT"
    
    # Remove common temporary files
    local temp_patterns=(
        "*.tmp"
        "*.temp"
        ".DS_Store"
        "Thumbs.db"
        "*.log.old"
    )
    
    local cleaned_count=0
    for pattern in "${temp_patterns[@]}"; do
        while IFS= read -r -d '' file; do
            rm -f "$file" 2>/dev/null && ((cleaned_count++))
        done < <(find . -name "$pattern" -type f -print0 2>/dev/null)
    done
    
    if [ $cleaned_count -gt 0 ]; then
        log_success "Cleaned $cleaned_count temporary files"
    else
        log_info "No temporary files to clean"
    fi
}

# === MAIN EXECUTION ========================================================

main() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   🔗 ABVETOS DEPLOY EXPRESS HOOKS                     ║${NC}"
    echo -e "${CYAN}║   Post-Deployment Actions                              ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    log_info "Starting post-deployment hooks..."
    
    notify_telegram "🔗 <b>Running Post-Deployment Hooks</b>%0A%0AProject: $PROJECT_NAME%0ATime: $(date +'%Y-%m-%d %H:%M:%S')"
    
    # Execute all hooks
    hook_capture_screenshots
    echo ""
    
    hook_health_check
    echo ""
    
    hook_backup_critical_files
    echo ""
    
    hook_clear_cache
    echo ""
    
    hook_optimize_assets
    echo ""
    
    hook_sync_to_drive
    echo ""
    
    hook_generate_report
    echo ""
    
    hook_update_version_badge
    echo ""
    
    hook_cleanup_temp_files
    echo ""
    
    log_success "═══════════════════════════════════════════════════════"
    log_success "   ✅ ALL HOOKS COMPLETED"
    log_success "═══════════════════════════════════════════════════════"
    echo ""
    
    notify_telegram "✅ <b>Post-Deployment Hooks Completed</b>%0A%0AProject: $PROJECT_NAME%0ATime: $(date +'%H:%M:%S')"
}

# Execute main function
main "$@"
