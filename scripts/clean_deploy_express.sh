#!/usr/bin/env bash
# DEPLOY EXPRESS - Cleanup and Duplicate Detection Script
# Analyzes and removes duplicate files based on SHA256 hash

REPO_DIR="/home/ubuntu/tryonyou"
LOG_FILE="$REPO_DIR/logs/deploy_express_history.log"
DUPLICATE_LOG="$REPO_DIR/logs/duplicates_found.log"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🧹 DEPLOY EXPRESS - Cleanup & Duplicate Detection${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check if log file exists
if [ ! -f "$LOG_FILE" ]; then
    echo -e "${YELLOW}⚠️  No deployment history found${NC}"
    exit 0
fi

# Initialize duplicate log
echo "# Duplicate Files Detected - $(date '+%Y-%m-%d %H:%M:%S')" > "$DUPLICATE_LOG"
echo "" >> "$DUPLICATE_LOG"

# Find duplicates by hash
echo -e "${YELLOW}🔍 Analyzing deployment history for duplicates...${NC}"

declare -A hash_map
DUPLICATE_COUNT=0

while IFS='|' read -r timestamp filename extension hash; do
    # Trim whitespace
    hash=$(echo "$hash" | xargs)
    filename=$(echo "$filename" | xargs)
    
    if [ -n "$hash" ]; then
        if [ -n "${hash_map[$hash]}" ]; then
            echo -e "${RED}🔄 Duplicate found: ${filename} (same as ${hash_map[$hash]})${NC}"
            echo "- **${filename}** is duplicate of **${hash_map[$hash]}** (Hash: ${hash})" >> "$DUPLICATE_LOG"
            ((DUPLICATE_COUNT++))
        else
            hash_map[$hash]="$filename"
        fi
    fi
done < "$LOG_FILE"

echo ""
echo -e "${GREEN}✅ Analysis complete${NC}"
echo -e "${BLUE}📊 Total duplicates found: ${DUPLICATE_COUNT}${NC}"

if [ $DUPLICATE_COUNT -gt 0 ]; then
    echo -e "${YELLOW}📄 Duplicate report saved to: ${DUPLICATE_LOG}${NC}"
else
    echo -e "${GREEN}✨ No duplicates detected - repository is clean${NC}"
fi

# Clean old processed files (older than 30 days)
echo ""
echo -e "${YELLOW}🗑️  Cleaning processed files older than 30 days...${NC}"

ARCHIVE_DIR="$REPO_DIR/TRYONYOU_DEPLOY_EXPRESS_INBOX/processed"
if [ -d "$ARCHIVE_DIR" ]; then
    DELETED_COUNT=$(find "$ARCHIVE_DIR" -type f -mtime +30 -delete -print | wc -l)
    echo -e "${GREEN}✅ Deleted ${DELETED_COUNT} old processed files${NC}"
else
    echo -e "${YELLOW}⚠️  No archive directory found${NC}"
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Cleanup completed${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

exit 0

