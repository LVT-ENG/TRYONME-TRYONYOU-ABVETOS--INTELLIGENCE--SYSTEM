#!/bin/bash

# Documentation Validation Script
# Validates all documentation links and ensures consistency

echo "🔍 Validating TryOnMe Documentation..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Function to check if file exists
check_file() {
    if [ ! -f "$1" ]; then
        echo -e "${RED}❌ Missing file: $1${NC}"
        ((errors++))
        return 1
    else
        echo -e "${GREEN}✅ Found: $1${NC}"
        return 0
    fi
}

# Function to check if directory exists
check_dir() {
    if [ ! -d "$1" ]; then
        echo -e "${RED}❌ Missing directory: $1${NC}"
        ((errors++))
        return 1
    else
        echo -e "${GREEN}✅ Found directory: $1${NC}"
        return 0
    fi
}

echo "📁 Checking Documentation Structure..."
echo "-------------------------------------"

# Check main documentation files
check_file "README.md"
check_file "DEPLOY.md"
check_file "ROADMAP.md"
check_file "SECURITY.md"
check_file "OBSERVABILITY.md"

# Check docs directory
check_dir "docs"
check_file "docs/README.md"
check_file "docs/api-reference.md"
check_file "docs/user-guide.md"
check_file "docs/troubleshooting.md"
check_file "docs/development-setup.md"
check_file "docs/frontend-guide.md"
check_file "docs/integration-guide.md"
check_file "docs/contributing.md"

# Check Google Apps Script documentation
check_dir "google-apps-script"
check_file "google-apps-script/README.md"
check_file "google-apps-script/DEPLOYMENT.md"

echo ""
echo "🔗 Checking Internal Links..."
echo "-----------------------------"

# Check for broken internal links in markdown files
find docs/ -name "*.md" -type f | while read file; do
    echo "Checking links in $file..."
    
    # Extract relative links
    grep -oE '\[([^\]]+)\]\((\./[^)]+|\.\./[^)]+)\)' "$file" | while read link; do
        # Extract the path from the link
        path=$(echo "$link" | sed -n 's/.*](\([^)]*\)).*/\1/p')
        
        # Convert relative path to absolute
        if [[ $path == ./* ]]; then
            abs_path="docs/${path#./}"
        elif [[ $path == ../* ]]; then
            abs_path="${path#../}"
        fi
        
        # Check if target file exists
        if [ ! -f "$abs_path" ]; then
            echo -e "${YELLOW}⚠️  Broken link in $file: $path${NC}"
            ((warnings++))
        fi
    done
done

echo ""
echo "📝 Checking Documentation Quality..."
echo "-----------------------------------"

# Check for TODO markers
todo_count=$(find docs/ -name "*.md" -type f -exec grep -c "TODO\|FIXME\|XXX" {} + 2>/dev/null | awk -F: '{sum += $2} END {print sum+0}')
if [ "$todo_count" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $todo_count TODO/FIXME markers in documentation${NC}"
    ((warnings++))
else
    echo -e "${GREEN}✅ No TODO markers found${NC}"
fi

# Check for basic headings in key files
key_files=("docs/README.md" "docs/api-reference.md" "docs/user-guide.md")
for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        if ! grep -q "^# " "$file"; then
            echo -e "${RED}❌ Missing main heading in $file${NC}"
            ((errors++))
        else
            echo -e "${GREEN}✅ $file has proper structure${NC}"
        fi
    fi
done

echo ""
echo "🔧 Checking Technical Configuration..."
echo "-------------------------------------"

# Check package.json exists and has basic scripts
if check_file "package.json"; then
    if grep -q '"dev"' package.json && grep -q '"build"' package.json; then
        echo -e "${GREEN}✅ package.json has required scripts${NC}"
    else
        echo -e "${YELLOW}⚠️  package.json missing some scripts${NC}"
        ((warnings++))
    fi
fi

# Check for configuration files
config_files=("vite.config.js" "commitlint.config.js")
for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ Found config: $file${NC}"
    else
        echo -e "${YELLOW}⚠️  Missing config: $file${NC}"
        ((warnings++))
    fi
done

echo ""
echo "📊 Validation Summary"
echo "===================="
echo -e "Errors: ${RED}$errors${NC}"
echo -e "Warnings: ${YELLOW}$warnings${NC}"

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}🎉 All documentation validation checks passed!${NC}"
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}✅ Documentation is valid with minor warnings${NC}"
    exit 0
else
    echo -e "${RED}❌ Documentation validation failed with $errors errors${NC}"
    exit 1
fi