#!/bin/bash
# ============================================
# 🚀 TRYONYOU – ABVETOS – Force Deploy Auto
# ============================================
# This script watches a directory for new ZIP files and automatically
# deploys them to the TRYONYOU repository and Vercel.
#
# Requirements:
# - fswatch (install via: brew install fswatch on macOS or apt-get install fswatch on Linux)
# - git configured with push access to the repository
# - Vercel CLI installed and authenticated
#
# Environment Variables Required:
# - VERCEL_TOKEN: Your Vercel authentication token
# - VERCEL_ORG_ID: Your Vercel organization ID (default: team_rubenespinarrodri)
# - VERCEL_PROJECT_ID: Your Vercel project ID (default: prj_5cvRv3TeZFOnSlixHu1QC8q9DHI1)
# ============================================

set -e

# Configuration
WATCH_DIR="${WATCH_DIR:-$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX}"
LOG_FILE="${LOG_FILE:-$WATCH_DIR/auto_deploy.log}"
REPO_PATH="${REPO_PATH:-$HOME/TRYONYOU_PROJECT}"

# Vercel Configuration - Use environment variables for security
export VERCEL_TOKEN="${VERCEL_TOKEN:-}"
export VERCEL_ORG_ID="${VERCEL_ORG_ID:-team_rubenespinarrodri}"
export VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID:-prj_5cvRv3TeZFOnSlixHu1QC8q9DHI1}"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Validation function
validate_setup() {
    local errors=0

    # Check if fswatch is installed
    if ! command -v fswatch &> /dev/null; then
        log_error "fswatch is not installed. Please install it first:"
        log_error "  macOS: brew install fswatch"
        log_error "  Linux: apt-get install fswatch"
        errors=$((errors + 1))
    fi

    # Check if watch directory exists
    if [ ! -d "$WATCH_DIR" ]; then
        log_warning "Watch directory does not exist: $WATCH_DIR"
        log_info "Creating watch directory..."
        mkdir -p "$WATCH_DIR" || {
            log_error "Failed to create watch directory"
            errors=$((errors + 1))
        }
    fi

    # Check if repository path exists
    if [ ! -d "$REPO_PATH" ]; then
        log_error "Repository path does not exist: $REPO_PATH"
        log_error "Please set REPO_PATH to a valid git repository"
        errors=$((errors + 1))
    elif [ ! -d "$REPO_PATH/.git" ]; then
        log_error "Repository path is not a git repository: $REPO_PATH"
        errors=$((errors + 1))
    fi

    # Check if Vercel token is set
    if [ -z "$VERCEL_TOKEN" ]; then
        log_error "VERCEL_TOKEN environment variable is not set"
        log_error "Please set it before running this script"
        errors=$((errors + 1))
    fi

    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        log_error "Vercel CLI is not installed. Please install it:"
        log_error "  npm install -g vercel"
        errors=$((errors + 1))
    fi

    # Check if git is configured
    if ! git config user.name &> /dev/null || ! git config user.email &> /dev/null; then
        log_error "Git is not configured. Please set user.name and user.email:"
        log_error "  git config --global user.name \"Your Name\""
        log_error "  git config --global user.email \"your.email@example.com\""
        errors=$((errors + 1))
    fi

    if [ $errors -gt 0 ]; then
        log_error "Setup validation failed with $errors error(s)"
        return 1
    fi

    return 0
}

# Process a ZIP file
process_zip_file() {
    local zip_file="$1"
    local file_basename=$(basename "$zip_file")
    
    log_info "📦 Processing: $file_basename"
    
    # Create timestamp for this deployment
    local timestamp=$(date "+%Y-%m-%d_%H-%M-%S")
    local tmp_dir="$WATCH_DIR/tmp_$timestamp"
    
    # Create temporary directory
    mkdir -p "$tmp_dir"
    
    # Extract ZIP file
    log_info "📂 Extracting ZIP file..."
    if unzip -o "$zip_file" -d "$tmp_dir" &>/dev/null; then
        log_success "Extraction complete"
    else
        log_error "Failed to extract ZIP file: $file_basename"
        rm -rf "$tmp_dir"
        return 1
    fi
    
    # Sync with repository
    log_info "⚙️  Syncing with repository..."
    if rsync -av --exclude='.git' "$tmp_dir/" "$REPO_PATH/" &>/dev/null; then
        log_success "Sync complete"
    else
        log_error "Failed to sync with repository"
        rm -rf "$tmp_dir"
        return 1
    fi
    
    # Change to repository directory
    cd "$REPO_PATH"
    
    # Git operations
    log_info "💬 Committing changes..."
    git add .
    
    if git commit -m "AutoDeploy: $file_basename @ $timestamp" &>/dev/null; then
        log_success "Changes committed"
    else
        log_warning "No changes to commit or commit failed"
    fi
    
    # Push to remote
    log_info "📤 Pushing to remote repository..."
    if git push origin main 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Push complete"
    else
        log_error "Failed to push to remote repository"
        rm -rf "$tmp_dir"
        return 1
    fi
    
    # Deploy to Vercel
    log_info "🚀 Deploying to Vercel..."
    if vercel --prod --confirm --token "$VERCEL_TOKEN" &>/dev/null; then
        log_success "Vercel deployment complete"
    else
        log_error "Vercel deployment failed"
        rm -rf "$tmp_dir"
        return 1
    fi
    
    # Cleanup
    log_info "🧹 Cleaning up temporary files..."
    rm -rf "$tmp_dir"
    
    log_success "✅ Deployment finished for $file_basename"
    echo "" | tee -a "$LOG_FILE"
    
    return 0
}

# Main execution
main() {
    log_info "============================================"
    log_info "🚀 TRYONYOU – Force Deploy Auto Starting"
    log_info "============================================"
    log_info "Watch Directory: $WATCH_DIR"
    log_info "Repository Path: $REPO_PATH"
    log_info "Log File: $LOG_FILE"
    log_info "============================================"
    
    # Validate setup
    if ! validate_setup; then
        log_error "Exiting due to validation errors"
        exit 1
    fi
    
    log_success "Setup validation passed"
    log_info "🔄 Watching $WATCH_DIR for new ZIPs..."
    echo "" | tee -a "$LOG_FILE"
    
    # Monitor folder for new or changed ZIP files
    fswatch -0 "$WATCH_DIR" | while read -d "" event
    do
        file_path="$event"
        file_name=$(basename "$file_path")
        
        # Check if it's a ZIP file
        if [[ "$file_name" == *.zip ]]; then
            log_info "📦 New file detected: $file_name"
            
            # Wait a moment to ensure file is fully written
            sleep 2
            
            # Process the ZIP file
            if process_zip_file "$file_path"; then
                log_success "Successfully processed: $file_name"
            else
                log_error "Failed to process: $file_name"
            fi
            
            echo "" | tee -a "$LOG_FILE"
        fi
    done
}

# Handle script interruption
trap 'log_warning "Script interrupted by user"; exit 130' INT TERM

# Run main function
main
