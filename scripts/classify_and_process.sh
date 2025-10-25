#!/usr/bin/env bash
# DEPLOY EXPRESS - Intelligent File Classifier and Processor
# Classifies and processes files based on type

FILE_PATH="$1"
FILE_NAME=$(basename "$FILE_PATH")
FILE_EXT="${FILE_NAME##*.}"
FILE_EXT_LOWER=$(echo "$FILE_EXT" | tr '[:upper:]' '[:lower:]')
REPO_DIR="/home/ubuntu/tryonyou"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Processing: ${FILE_NAME}${NC}"
echo -e "${BLUE}📋 Extension: ${FILE_EXT_LOWER}${NC}"

# Generate SHA256 hash for integrity verification
FILE_HASH=$(sha256sum "$FILE_PATH" | awk '{print $1}')
echo -e "${GREEN}🔐 SHA256: ${FILE_HASH}${NC}"

# Log entry
echo "${TIMESTAMP} | ${FILE_NAME} | ${FILE_EXT_LOWER} | ${FILE_HASH}" >> "$REPO_DIR/logs/deploy_express_history.log"

# Classification and processing by file type
case "$FILE_EXT_LOWER" in
  html|htm)
    echo -e "${YELLOW}🌐 HTML detected - Publishing to /public/${NC}"
    cp "$FILE_PATH" "$REPO_DIR/public/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/$FILE_NAME"
    ;;
    
  zip)
    echo -e "${YELLOW}📦 ZIP detected - Extracting to /public/modules/${NC}"
    MODULE_DIR="$REPO_DIR/public/modules/${FILE_NAME%.zip}_${TIMESTAMP}"
    mkdir -p "$MODULE_DIR"
    unzip -q "$FILE_PATH" -d "$MODULE_DIR"
    echo -e "${GREEN}✅ Extracted to: ${MODULE_DIR}${NC}"
    DEPLOY_URL="https://tryonyou.app/modules/${FILE_NAME%.zip}_${TIMESTAMP}/"
    ;;
    
  pdf)
    echo -e "${YELLOW}📄 PDF detected - Publishing to /docs/${NC}"
    cp "$FILE_PATH" "$REPO_DIR/docs/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/docs/$FILE_NAME"
    ;;
    
  pptx|ppt)
    echo -e "${YELLOW}📊 PPTX detected - Publishing to /docs/ and linking to investor portal${NC}"
    cp "$FILE_PATH" "$REPO_DIR/docs/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/docs/$FILE_NAME"
    ;;
    
  jpg|jpeg|png|svg|webp|gif)
    echo -e "${YELLOW}🖼️  Image detected - Optimizing and publishing to /public/assets/${NC}"
    cp "$FILE_PATH" "$REPO_DIR/public/assets/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/assets/$FILE_NAME"
    ;;
    
  mp4|mov|avi|webm)
    echo -e "${YELLOW}🎥 Video detected - Publishing to /public/media/${NC}"
    cp "$FILE_PATH" "$REPO_DIR/public/media/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/media/$FILE_NAME"
    ;;
    
  mp3|wav|ogg)
    echo -e "${YELLOW}🎵 Audio detected - Publishing to /public/media/${NC}"
    cp "$FILE_PATH" "$REPO_DIR/public/media/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/media/$FILE_NAME"
    ;;
    
  *)
    echo -e "${YELLOW}📁 Unknown type - Publishing to /public/uploads/${NC}"
    cp "$FILE_PATH" "$REPO_DIR/public/uploads/$FILE_NAME"
    DEPLOY_URL="https://tryonyou.app/uploads/$FILE_NAME"
    ;;
esac

# Export URL for notification script
echo "$DEPLOY_URL" > /tmp/last_deploy_url.txt
echo -e "${GREEN}✅ File processed successfully${NC}"
echo -e "${GREEN}🌐 Deploy URL: ${DEPLOY_URL}${NC}"

exit 0

