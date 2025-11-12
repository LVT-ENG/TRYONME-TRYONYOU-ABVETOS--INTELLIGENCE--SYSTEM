#!/bin/bash
###############################################################################
# 🦚 ABVETOS DEPLOY EXPRESS LOGGER
# Guarda logs, capturas y versiones del sistema
# Autor: ABVETOS Orchestrator · Agente 70
# Versión: 1.0.0
###############################################################################
#
# 💡 Propósito:
#   • Registrar logs detallados de cada despliegue
#   • Capturar screenshots de la aplicación desplegada
#   • Mantener historial de versiones
#   • Generar reportes de despliegue
#
###############################################################################

set -euo pipefail

# === CONFIGURACIÓN =========================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Parámetros
TIMESTAMP="${1:-$(date +"%Y-%m-%d_%H-%M-%S")}"

# Directorios
LOG_DIR="$PROJECT_ROOT/logs"
SCREENSHOTS_DIR="$PROJECT_ROOT/logs/screenshots"
VERSIONS_DIR="$PROJECT_ROOT/logs/versions"
REPORTS_DIR="$PROJECT_ROOT/docs/reports"

# Información del proyecto
PROJECT_NAME="TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM"
DOMAIN_URL="https://tryonyou.app"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
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

setup_directories() {
    log_info "Setting up logging directories..."
    
    mkdir -p "$LOG_DIR"
    mkdir -p "$SCREENSHOTS_DIR"
    mkdir -p "$VERSIONS_DIR"
    mkdir -p "$REPORTS_DIR"
    
    log_success "Directories created"
}

capture_deployment_log() {
    log_info "Capturing deployment log..."
    
    local log_file="$LOG_DIR/deploy_$TIMESTAMP.log"
    
    cat > "$log_file" << EOF
================================================================================
ABVETOS DEPLOY EXPRESS - DEPLOYMENT LOG
================================================================================
Timestamp: $TIMESTAMP
Date: $(date)
Project: $PROJECT_NAME
Domain: $DOMAIN_URL

================================================================================
GIT INFORMATION
================================================================================
Commit: $(git -C "$PROJECT_ROOT" rev-parse HEAD 2>/dev/null || echo "unknown")
Short Commit: $(git -C "$PROJECT_ROOT" rev-parse --short HEAD 2>/dev/null || echo "unknown")
Branch: $(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
Author: $(git -C "$PROJECT_ROOT" log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo "unknown")
Message: $(git -C "$PROJECT_ROOT" log -1 --pretty=format:'%s' 2>/dev/null || echo "unknown")

================================================================================
BUILD INFORMATION
================================================================================
Node Version: $(node -v 2>/dev/null || echo "unknown")
NPM Version: $(npm -v 2>/dev/null || echo "unknown")
Build Time: $(date)

================================================================================
PACKAGE INFORMATION
================================================================================
EOF

    # Add package.json info if available
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        echo "Package Name: $(node -p "require('$PROJECT_ROOT/package.json').name" 2>/dev/null || echo "unknown")" >> "$log_file"
        echo "Package Version: $(node -p "require('$PROJECT_ROOT/package.json').version" 2>/dev/null || echo "unknown")" >> "$log_file"
    fi
    
    cat >> "$log_file" << EOF

================================================================================
SYSTEM INFORMATION
================================================================================
OS: $(uname -s)
Architecture: $(uname -m)
Hostname: $(hostname)

================================================================================
DEPLOYMENT STATUS
================================================================================
Status: ✅ Completed
Duration: N/A
Exit Code: 0

================================================================================
EOF
    
    log_success "Deployment log saved: $log_file"
}

capture_version_info() {
    log_info "Capturing version information..."
    
    local version_file="$VERSIONS_DIR/version_$TIMESTAMP.json"
    
    # Get package version
    local package_version="unknown"
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        package_version=$(node -p "require('$PROJECT_ROOT/package.json').version" 2>/dev/null || echo "unknown")
    fi
    
    # Get git info
    local git_commit=$(git -C "$PROJECT_ROOT" rev-parse HEAD 2>/dev/null || echo "unknown")
    local git_short=$(git -C "$PROJECT_ROOT" rev-parse --short HEAD 2>/dev/null || echo "unknown")
    local git_branch=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
    
    cat > "$version_file" << EOF
{
  "timestamp": "$TIMESTAMP",
  "date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "project": "$PROJECT_NAME",
  "version": {
    "package": "$package_version",
    "commit": "$git_commit",
    "commit_short": "$git_short",
    "branch": "$git_branch"
  },
  "deployment": {
    "url": "$DOMAIN_URL",
    "environment": "production",
    "platform": "Vercel"
  },
  "build": {
    "node_version": "$(node -v 2>/dev/null || echo 'unknown')",
    "npm_version": "$(npm -v 2>/dev/null || echo 'unknown')"
  }
}
EOF
    
    log_success "Version info saved: $version_file"
}

capture_screenshots() {
    log_info "Attempting to capture screenshots..."
    
    # Check if screenshots script exists
    local screenshot_script="$PROJECT_ROOT/scripts/capture-screenshots.sh"
    
    if [ -f "$screenshot_script" ]; then
        log_info "Running screenshot capture script..."
        
        # Run the screenshot script
        bash "$screenshot_script" "$DOMAIN_URL" "$SCREENSHOTS_DIR" 2>&1 || {
            log_warning "Screenshot capture failed or script not available"
        }
    else
        log_warning "Screenshot script not found at $screenshot_script"
        log_info "Skipping screenshot capture"
    fi
}

generate_deployment_summary() {
    log_info "Generating deployment summary..."
    
    local summary_file="$REPORTS_DIR/deployment_summary_$TIMESTAMP.md"
    
    # Get package version
    local package_version="unknown"
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        package_version=$(node -p "require('$PROJECT_ROOT/package.json').version" 2>/dev/null || echo "unknown")
    fi
    
    cat > "$summary_file" << EOF
# ABVETOS Deployment Summary

**Timestamp:** $TIMESTAMP  
**Date:** $(date)  
**Project:** $PROJECT_NAME  
**Version:** $package_version

---

## Deployment Information

- **URL:** $DOMAIN_URL
- **Environment:** Production
- **Platform:** Vercel
- **Status:** ✅ Completed

## Git Information

- **Commit:** $(git -C "$PROJECT_ROOT" rev-parse --short HEAD 2>/dev/null || echo "unknown")
- **Branch:** $(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
- **Author:** $(git -C "$PROJECT_ROOT" log -1 --pretty=format:'%an' 2>/dev/null || echo "unknown")
- **Message:** $(git -C "$PROJECT_ROOT" log -1 --pretty=format:'%s' 2>/dev/null || echo "unknown")

## Build Information

- **Node Version:** $(node -v 2>/dev/null || echo "unknown")
- **NPM Version:** $(npm -v 2>/dev/null || echo "unknown")
- **Build Time:** $(date)

## Logs

- **Deployment Log:** \`logs/deploy_$TIMESTAMP.log\`
- **Version Info:** \`logs/versions/version_$TIMESTAMP.json\`
- **Screenshots:** \`logs/screenshots/\`

## Next Steps

1. Monitor application performance
2. Check error tracking and logs
3. Verify all features are working correctly
4. Review user feedback

---

*Generated by ABVETOS Deploy Express Logger*
EOF
    
    log_success "Deployment summary saved: $summary_file"
}

cleanup_old_logs() {
    log_info "Cleaning up old logs..."
    
    # Configurable retention periods (days)
    local LOG_RETENTION_DAYS="${LOG_RETENTION_DAYS:-30}"
    local SCREENSHOT_RETENTION_DAYS="${SCREENSHOT_RETENTION_DAYS:-14}"
    local VERSION_RETENTION_DAYS="${VERSION_RETENTION_DAYS:-90}"
    
    # Keep logs for specified days
    if [ -d "$LOG_DIR" ]; then
        find "$LOG_DIR" -name "deploy_*.log" -mtime +${LOG_RETENTION_DAYS} -delete 2>/dev/null || true
        log_success "Old logs cleaned up (kept last ${LOG_RETENTION_DAYS} days)"
    fi
    
    # Keep screenshots for specified days
    if [ -d "$SCREENSHOTS_DIR" ]; then
        find "$SCREENSHOTS_DIR" -name "*.png" -mtime +${SCREENSHOT_RETENTION_DAYS} -delete 2>/dev/null || true
        log_success "Old screenshots cleaned up (kept last ${SCREENSHOT_RETENTION_DAYS} days)"
    fi
    
    # Keep version info for specified days
    if [ -d "$VERSIONS_DIR" ]; then
        find "$VERSIONS_DIR" -name "version_*.json" -mtime +${VERSION_RETENTION_DAYS} -delete 2>/dev/null || true
        log_success "Old version info cleaned up (kept last ${VERSION_RETENTION_DAYS} days)"
    fi
}

create_archive() {
    log_info "Creating deployment archive..."
    
    local archive_dir="/tmp/abvetos_deploy_$TIMESTAMP"
    local archive_file="$REPORTS_DIR/abvetos_deploy_$TIMESTAMP.zip"
    
    # Create temporary directory
    mkdir -p "$archive_dir"
    
    # Copy relevant files
    if [ -f "$LOG_DIR/deploy_$TIMESTAMP.log" ]; then
        cp "$LOG_DIR/deploy_$TIMESTAMP.log" "$archive_dir/"
    fi
    
    if [ -f "$VERSIONS_DIR/version_$TIMESTAMP.json" ]; then
        cp "$VERSIONS_DIR/version_$TIMESTAMP.json" "$archive_dir/"
    fi
    
    if [ -f "$REPORTS_DIR/deployment_summary_$TIMESTAMP.md" ]; then
        cp "$REPORTS_DIR/deployment_summary_$TIMESTAMP.md" "$archive_dir/"
    fi
    
    # Copy screenshots if available
    if [ -d "$SCREENSHOTS_DIR" ] && [ "$(ls -A $SCREENSHOTS_DIR 2>/dev/null)" ]; then
        mkdir -p "$archive_dir/screenshots"
        cp "$SCREENSHOTS_DIR"/* "$archive_dir/screenshots/" 2>/dev/null || true
    fi
    
    # Create zip archive
    if command -v zip &> /dev/null; then
        cd "$(dirname "$archive_dir")"
        zip -r "$archive_file" "$(basename "$archive_dir")" -q 2>/dev/null || true
        
        if [ -f "$archive_file" ]; then
            local archive_size=$(du -sh "$archive_file" | cut -f1)
            log_success "Archive created: $archive_file ($archive_size)"
        fi
    else
        log_warning "zip command not available, skipping archive creation"
    fi
    
    # Cleanup temporary directory
    rm -rf "$archive_dir"
}

# === MAIN EXECUTION ========================================================

main() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   📝 ABVETOS DEPLOY EXPRESS LOGGER                    ║${NC}"
    echo -e "${CYAN}║   Logs, Capturas y Versiones del Sistema              ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    log_info "Starting logging process..."
    log_info "Timestamp: $TIMESTAMP"
    
    # Execute logging steps
    setup_directories
    capture_deployment_log
    capture_version_info
    capture_screenshots
    generate_deployment_summary
    cleanup_old_logs
    create_archive
    
    echo ""
    log_success "═══════════════════════════════════════════════════════"
    log_success "   ✅ LOGGING COMPLETED"
    log_success "═══════════════════════════════════════════════════════"
    log_info "   Logs: $LOG_DIR/deploy_$TIMESTAMP.log"
    log_info "   Version: $VERSIONS_DIR/version_$TIMESTAMP.json"
    log_info "   Summary: $REPORTS_DIR/deployment_summary_$TIMESTAMP.md"
    log_success "═══════════════════════════════════════════════════════"
    echo ""
}

# Execute main function
main "$@"
