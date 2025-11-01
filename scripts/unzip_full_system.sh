#!/usr/bin/env bash
###############################################################################
# TRYONYOU - Unzip Full System Package Script
# Extracts TRYONYOU_FULL_SYSTEM packages to the _incoming directory
###############################################################################

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
INCOMING_DIR="$REPO_ROOT/_incoming"
LOG_DIR="$REPO_ROOT/logs"

# Default zip file name (can be overridden via argument)
ZIP_FILE="${1:-TRYONYOU_FULL_SYSTEM_2025-10-31.zip}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level="$1"
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case "$level" in
        INFO)
            echo -e "${BLUE}ℹ️  [${timestamp}] ${message}${NC}"
            ;;
        SUCCESS)
            echo -e "${GREEN}✅ [${timestamp}] ${message}${NC}"
            ;;
        WARNING)
            echo -e "${YELLOW}⚠️  [${timestamp}] ${message}${NC}"
            ;;
        ERROR)
            echo -e "${RED}❌ [${timestamp}] ${message}${NC}"
            ;;
    esac
    
    # Also write to log file
    mkdir -p "$LOG_DIR"
    echo "[${timestamp}] [$level] $message" >> "$LOG_DIR/unzip_full_system.log"
}

# Main function
main() {
    log INFO "Starting TRYONYOU Full System Package extraction"
    log INFO "Script directory: $SCRIPT_DIR"
    log INFO "Repository root: $REPO_ROOT"
    
    # Create incoming directory if it doesn't exist
    if [ ! -d "$INCOMING_DIR" ]; then
        log INFO "Creating _incoming directory at: $INCOMING_DIR"
        mkdir -p "$INCOMING_DIR"
    fi
    
    # Check if unzip is installed
    if ! command -v unzip &> /dev/null; then
        log ERROR "unzip command not found. Please install unzip."
        exit 1
    fi
    
    # Resolve the zip file path
    ZIP_PATH=""
    if [ -f "$REPO_ROOT/$ZIP_FILE" ]; then
        ZIP_PATH="$REPO_ROOT/$ZIP_FILE"
    elif [ -f "$ZIP_FILE" ]; then
        ZIP_PATH="$ZIP_FILE"
    else
        log ERROR "ZIP file not found: $ZIP_FILE"
        log INFO "Searched in:"
        log INFO "  - $REPO_ROOT/$ZIP_FILE"
        log INFO "  - $ZIP_FILE"
        exit 1
    fi
    
    log INFO "Found ZIP file: $ZIP_PATH"
    
    # Get file size
    FILE_SIZE=$(du -h "$ZIP_PATH" | cut -f1)
    log INFO "File size: $FILE_SIZE"
    
    # Check if ZIP file is valid
    if ! unzip -t "$ZIP_PATH" &> /dev/null; then
        log ERROR "ZIP file appears to be corrupted or invalid"
        exit 1
    fi
    
    log SUCCESS "ZIP file integrity verified"
    
    # Extract to _incoming directory with overwrite
    log INFO "Extracting to: $INCOMING_DIR/"
    
    if unzip -o "$ZIP_PATH" -d "$INCOMING_DIR/"; then
        log SUCCESS "Extraction completed successfully"
        
        # List extracted files
        log INFO "Extracted contents:"
        ls -lh "$INCOMING_DIR/" | tail -n +2 | while read -r line; do
            log INFO "  $line"
        done
        
        # Create extraction metadata
        METADATA_FILE="$INCOMING_DIR/.extraction_metadata.txt"
        cat > "$METADATA_FILE" <<EOF
Extraction Metadata
═══════════════════════════════════════════════════════════════
Timestamp: $(date '+%Y-%m-%d %H:%M:%S %Z')
ZIP File: $ZIP_FILE
ZIP Path: $ZIP_PATH
File Size: $FILE_SIZE
Extracted To: $INCOMING_DIR/
Status: SUCCESS
═══════════════════════════════════════════════════════════════
EOF
        log INFO "Metadata written to: $METADATA_FILE"
        
    else
        log ERROR "Extraction failed"
        exit 1
    fi
    
    log SUCCESS "All operations completed successfully"
}

# Run main function
main "$@"
