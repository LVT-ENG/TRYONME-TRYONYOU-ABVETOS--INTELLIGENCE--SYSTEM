#!/bin/bash
# Validation script for TRYONYOU Trademark Portfolio setup
# This script checks that all required files are present and properly configured

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  TRYONYOU Trademark Portfolio - Setup Validation${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

ERRORS=0
WARNINGS=0

# Function to check file existence
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description: ${GREEN}Found${NC}"
        return 0
    else
        echo -e "${RED}✗${NC} $description: ${RED}Missing${NC}"
        ((ERRORS++))
        return 1
    fi
}

# Function to check file is executable
check_executable() {
    local file=$1
    local description=$2
    
    if [ -x "$file" ]; then
        echo -e "${GREEN}✓${NC} $description: ${GREEN}Executable${NC}"
        return 0
    else
        echo -e "${RED}✗${NC} $description: ${RED}Not executable${NC}"
        ((ERRORS++))
        return 1
    fi
}

# Function to check command availability
check_command() {
    local cmd=$1
    local description=$2
    local optional=$3
    
    if command -v $cmd &> /dev/null; then
        local version=$($cmd --version 2>&1 | head -n1)
        echo -e "${GREEN}✓${NC} $description: ${GREEN}Available${NC} ($version)"
        return 0
    else
        if [ "$optional" = "true" ]; then
            echo -e "${YELLOW}⚠${NC} $description: ${YELLOW}Not available (optional)${NC}"
            ((WARNINGS++))
        else
            echo -e "${RED}✗${NC} $description: ${RED}Not available${NC}"
            ((ERRORS++))
        fi
        return 1
    fi
}

echo -e "${YELLOW}Checking required files...${NC}"
echo ""

# Check all required files
check_file "TRYONYOU_Portefeuille_de_Marques_2025_FR.md" "Markdown source file"
check_file "generate_pdf.sh" "PDF generation script"
check_file "README.md" "Main README"
check_file "README_DEPLOY.txt" "Deployment instructions"
check_file "QR_CODE_GENERATION.md" "QR code instructions"

echo ""
echo -e "${YELLOW}Checking script permissions...${NC}"
echo ""

# Check executable permissions
check_executable "generate_pdf.sh" "PDF generation script"

echo ""
echo -e "${YELLOW}Checking required tools (for PDF generation)...${NC}"
echo ""

# Check required tools
check_command "pandoc" "Pandoc" "false"
check_command "xelatex" "XeLaTeX" "false"
check_command "qrencode" "QR Code generator" "true"

echo ""
echo -e "${YELLOW}Validating Markdown file structure...${NC}"
echo ""

# Validate markdown file has required sections
if [ -f "TRYONYOU_Portefeuille_de_Marques_2025_FR.md" ]; then
    SECTIONS=(
        "Couverture"
        "Résumé exécutif"
        "Vision d'ensemble"
        "TRYONYOU"
        "ABVET"
        "ABVETOS"
        "CAP"
        "PAU"
        "FTT"
        "VVL"
        "LIVEIT"
        "ARMOIRE SOLIDAIRE"
        "ADBET"
        "ARMOIRE INTELLIGENTE"
    )
    
    for section in "${SECTIONS[@]}"; do
        if grep -q "$section" "TRYONYOU_Portefeuille_de_Marques_2025_FR.md"; then
            echo -e "${GREEN}✓${NC} Section found: $section"
        else
            echo -e "${RED}✗${NC} Section missing: $section"
            ((ERRORS++))
        fi
    done
    
    # Check for YAML frontmatter
    if head -n 1 "TRYONYOU_Portefeuille_de_Marques_2025_FR.md" | grep -q "^---$"; then
        echo -e "${GREEN}✓${NC} YAML frontmatter present"
    else
        echo -e "${RED}✗${NC} YAML frontmatter missing"
        ((ERRORS++))
    fi
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Validation Summary${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo -e "You can now generate the PDF by running:"
    echo -e "  ${BLUE}bash generate_pdf.sh${NC}"
    exit 0
elif [ $ERRORS -eq 0 ] && [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠ Setup complete with $WARNINGS warning(s)${NC}"
    echo ""
    echo -e "The setup is functional but some optional tools are missing."
    echo -e "  • Warnings: $WARNINGS"
    echo ""
    echo -e "You can still generate the PDF, but some features may be limited."
    echo -e "Run: ${BLUE}bash generate_pdf.sh${NC}"
    exit 0
else
    echo -e "${RED}✗ Setup incomplete with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo ""
    echo -e "  • Errors: $ERRORS"
    echo -e "  • Warnings: $WARNINGS"
    echo ""
    echo -e "Please resolve the errors before generating the PDF."
    echo -e "See README.md for installation instructions."
    exit 1
fi
