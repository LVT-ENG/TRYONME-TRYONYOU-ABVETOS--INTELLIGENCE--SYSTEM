#!/bin/bash

###############################################################################
# ABVETOS Auto Integration Script
# Automated integration between ABVETOS agents and PMV Dashboard
#
# This script runs in the background using nohup to continuously monitor
# and synchronize the agent registry with the Google Sheets Dashboard.
#
# Usage:
#   ./abvetos_auto_integrate.sh
#   nohup ./abvetos_auto_integrate.sh > /dev/null 2>&1 &
#
# Author: TRYONYOU Team
# Version: 1.0.0
# Date: 2025-11-01
###############################################################################

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REGISTRY_FILE="$PROJECT_ROOT/public/data/agents_registry.json"
LOG_FILE="$SCRIPT_DIR/abvetos_integration.log"
PID_FILE="$SCRIPT_DIR/abvetos_integration.pid"
SYNC_INTERVAL=3600  # 1 hour in seconds

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

###############################################################################
# Utility Functions
###############################################################################

log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

log_info() {
    log "${BLUE}INFO${NC}: $1"
}

log_success() {
    log "${GREEN}SUCCESS${NC}: $1"
}

log_warning() {
    log "${YELLOW}WARNING${NC}: $1"
}

log_error() {
    log "${RED}ERROR${NC}: $1"
}

###############################################################################
# Main Functions
###############################################################################

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if registry file exists
    if [ ! -f "$REGISTRY_FILE" ]; then
        log_error "Registry file not found: $REGISTRY_FILE"
        return 1
    fi
    
    # Check if jq is installed for JSON processing
    if ! command -v jq &> /dev/null; then
        log_warning "jq is not installed. JSON validation will be limited."
    fi
    
    log_success "Prerequisites check passed"
    return 0
}

validate_registry() {
    log_info "Validating agents registry..."
    
    if command -v jq &> /dev/null; then
        if jq empty "$REGISTRY_FILE" 2>/dev/null; then
            log_success "Registry JSON is valid"
            
            # Get agent counts
            local active_count=$(jq '.active | length' "$REGISTRY_FILE" 2>/dev/null || echo "0")
            local backstage_count=$(jq '.backstage | length' "$REGISTRY_FILE" 2>/dev/null || echo "0")
            
            log_info "Active agents: $active_count"
            log_info "Backstage agents: $backstage_count"
            
            return 0
        else
            log_error "Registry JSON is invalid"
            return 1
        fi
    else
        log_warning "Skipping JSON validation (jq not available)"
        return 0
    fi
}

sync_agents() {
    log_info "Synchronizing agents..."
    
    # Validate registry before syncing
    if ! validate_registry; then
        log_error "Sync aborted due to validation failure"
        return 1
    fi
    
    # Note: The actual sync happens in Google Apps Script
    # This script monitors the registry and ensures it's valid
    log_success "Agent registry validated and ready for sync"
    
    # Display last update time
    local last_updated=$(jq -r '.lastUpdated' "$REGISTRY_FILE" 2>/dev/null || echo "unknown")
    log_info "Registry last updated: $last_updated"
    
    return 0
}

monitor_changes() {
    log_info "Starting continuous monitoring..."
    log_info "Sync interval: $SYNC_INTERVAL seconds ($(($SYNC_INTERVAL / 60)) minutes)"
    
    local last_modified=0
    
    while true; do
        # Get current modification time of registry
        if [ -f "$REGISTRY_FILE" ]; then
            local current_modified=$(stat -c %Y "$REGISTRY_FILE" 2>/dev/null || stat -f %m "$REGISTRY_FILE" 2>/dev/null || echo "0")
            
            # Check if file was modified
            if [ "$current_modified" != "$last_modified" ]; then
                log_info "Registry file changed detected"
                if sync_agents; then
                    last_modified=$current_modified
                    log_success "Sync completed successfully"
                else
                    log_error "Sync failed"
                fi
            fi
        else
            log_error "Registry file not found: $REGISTRY_FILE"
        fi
        
        # Wait for next sync interval
        sleep "$SYNC_INTERVAL"
    done
}

cleanup() {
    log_info "Cleaning up..."
    
    if [ -f "$PID_FILE" ]; then
        rm -f "$PID_FILE"
        log_success "PID file removed"
    fi
    
    log_info "ABVETOS Auto Integration stopped"
    exit 0
}

show_status() {
    echo "======================================"
    echo "ABVETOS Auto Integration Status"
    echo "======================================"
    
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo "Status: ${GREEN}Running${NC}"
            echo "PID: $pid"
        else
            echo "Status: ${RED}Not Running${NC} (stale PID file)"
            rm -f "$PID_FILE"
        fi
    else
        echo "Status: ${RED}Not Running${NC}"
    fi
    
    echo ""
    echo "Configuration:"
    echo "  Registry: $REGISTRY_FILE"
    echo "  Log file: $LOG_FILE"
    echo "  Sync interval: $SYNC_INTERVAL seconds"
    
    if [ -f "$REGISTRY_FILE" ]; then
        echo ""
        echo "Registry Info:"
        if command -v jq &> /dev/null; then
            echo "  Active agents: $(jq '.active | length' "$REGISTRY_FILE")"
            echo "  Backstage agents: $(jq '.backstage | length' "$REGISTRY_FILE")"
            echo "  Last updated: $(jq -r '.lastUpdated' "$REGISTRY_FILE")"
        fi
    fi
    
    if [ -f "$LOG_FILE" ]; then
        echo ""
        echo "Recent log entries (last 5):"
        tail -n 5 "$LOG_FILE"
    fi
    
    echo "======================================"
}

###############################################################################
# Main Script
###############################################################################

main() {
    # Parse command line arguments
    case "${1:-}" in
        status)
            show_status
            exit 0
            ;;
        stop)
            if [ -f "$PID_FILE" ]; then
                local pid=$(cat "$PID_FILE")
                log_info "Stopping ABVETOS Auto Integration (PID: $pid)..."
                kill "$pid" 2>/dev/null || log_warning "Process not found"
                rm -f "$PID_FILE"
                log_success "Stopped"
            else
                log_warning "No PID file found. Process may not be running."
            fi
            exit 0
            ;;
        --help|-h)
            echo "ABVETOS Auto Integration Script"
            echo ""
            echo "Usage:"
            echo "  $0              Start the integration service"
            echo "  $0 status       Show current status"
            echo "  $0 stop         Stop the running service"
            echo "  $0 --help       Show this help message"
            echo ""
            echo "Background mode:"
            echo "  nohup $0 > /dev/null 2>&1 &"
            exit 0
            ;;
    esac
    
    # Check if already running
    if [ -f "$PID_FILE" ]; then
        local old_pid=$(cat "$PID_FILE")
        if ps -p "$old_pid" > /dev/null 2>&1; then
            log_error "Integration is already running (PID: $old_pid)"
            exit 1
        else
            log_warning "Removing stale PID file"
            rm -f "$PID_FILE"
        fi
    fi
    
    # Save PID
    echo $$ > "$PID_FILE"
    
    # Set up cleanup trap
    trap cleanup SIGINT SIGTERM EXIT
    
    # Initialize log
    log_info "======================================"
    log_info "ABVETOS Auto Integration Started"
    log_info "======================================"
    log_info "PID: $$"
    log_info "Project Root: $PROJECT_ROOT"
    log_info "Registry File: $REGISTRY_FILE"
    
    # Run prerequisite checks
    if ! check_prerequisites; then
        log_error "Prerequisite check failed. Exiting."
        exit 1
    fi
    
    # Perform initial sync
    log_info "Performing initial synchronization..."
    sync_agents
    
    # Start monitoring
    monitor_changes
}

# Run main function
main "$@"
