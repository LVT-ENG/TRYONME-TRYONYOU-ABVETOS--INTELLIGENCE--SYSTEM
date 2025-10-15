#!/bin/bash
# Script to generate PDF from TRYONYOU Trademark Portfolio Markdown file
# Requires: pandoc, xelatex (TeXLive), qrencode

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== TRYONYOU Trademark Portfolio PDF Generator ===${NC}"
echo ""

# Check if required tools are installed
echo -e "${YELLOW}Checking required tools...${NC}"

if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}Error: pandoc is not installed.${NC}"
    echo "Please install pandoc: https://pandoc.org/installing.html"
    exit 1
fi

if ! command -v xelatex &> /dev/null; then
    echo -e "${RED}Error: xelatex is not installed.${NC}"
    echo "Please install TeXLive: https://www.tug.org/texlive/"
    exit 1
fi

if ! command -v qrencode &> /dev/null; then
    echo -e "${YELLOW}Warning: qrencode is not installed.${NC}"
    echo "QR code generation will be skipped."
    echo "To install qrencode: apt-get install qrencode (Ubuntu/Debian) or brew install qrencode (macOS)"
else
    # Generate QR code if qrencode is available
    echo -e "${GREEN}Generating QR code...${NC}"
    qrencode -o qr_tryonyou_trademark.png "https://tryonyou.app/trademark"
    echo -e "${GREEN}✓ QR code generated: qr_tryonyou_trademark.png${NC}"
fi

echo ""
echo -e "${GREEN}Generating PDF from Markdown...${NC}"

# Generate PDF using pandoc
pandoc "TRYONYOU_Portefeuille_de_Marques_2025_FR.md" \
  -o "TRYONYOU_Portefeuille_de_Marques_2025_FR.pdf" \
  --pdf-engine=xelatex \
  --metadata=title:"TRYONYOU – ABVETOS – ULTRA-PLUS – ULTIMATUM – Portefeuille de Marques 2025" \
  --metadata=author:"Rubén Espinar – CEO, TRYONYOU SYSTEMS" \
  --metadata=keywords:"WIPO, INPI, EPCT, Trademark, TRYONYOU, ABVETOS, 2025" \
  --metadata=lang:fr \
  -V papersize:A4 \
  -V geometry:landscape \
  -V margin=2cm \
  --pdf-engine-opt=--pdfa

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ PDF generated successfully!${NC}"
    echo -e "${GREEN}  Output: TRYONYOU_Portefeuille_de_Marques_2025_FR.pdf${NC}"
    
    # Display file size
    FILE_SIZE=$(du -h "TRYONYOU_Portefeuille_de_Marques_2025_FR.pdf" | cut -f1)
    echo -e "${GREEN}  Size: ${FILE_SIZE}${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Review the generated PDF"
    echo "  2. Move to TRYONYOU_DEPLOY_EXPRESS_INBOX/ for automated deployment"
    echo "  3. The Deploy Express module will process and commit to /docs/trademarks/"
else
    echo -e "${RED}✗ PDF generation failed!${NC}"
    exit 1
fi
