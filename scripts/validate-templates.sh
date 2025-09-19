#!/bin/bash

# Template Validation Script
# Validates that issue templates follow conventional commit format

set -e

echo "🔍 Validating issue templates..."

TEMPLATE_DIR=".github/ISSUE_TEMPLATE"
VALID_SCOPES="core|ui|api|auth|db|deploy|config|docs|test|avbetos|tryonme|tryonyou|health|workflow"
ERRORS=0

validate_template() {
    local file="$1"
    local template_name=$(basename "$file" .md)
    
    echo "  Checking $template_name..."
    
    # Extract title line
    local title_line=$(grep "^title:" "$file" | head -1)
    
    if [[ -z "$title_line" ]]; then
        echo "    ❌ No title found in $file"
        ((ERRORS++))
        return
    fi
    
    # Check if title contains placeholder text
    if echo "$title_line" | grep -q "REPLACE_WITH\|scope\|descripción breve"; then
        echo "    ✅ Template has placeholder (expected)"
    else
        echo "    ⚠️  Template might not have proper placeholder"
    fi
    
    # Check if template has conventional commit format
    if echo "$title_line" | grep -qE "(feat|fix|docs|style|refactor|test|chore)\([^)]+\):"; then
        echo "    ✅ Conventional commit format detected"
    else
        echo "    ❌ Title doesn't follow conventional commit format"
        ((ERRORS++))
    fi
}

# Validate each template
for template in "$TEMPLATE_DIR"/*.md; do
    if [[ -f "$template" && "$(basename "$template")" != "template-guide.md" ]]; then
        validate_template "$template"
    fi
done

# Check config.yml exists
if [[ -f "$TEMPLATE_DIR/config.yml" ]]; then
    echo "  ✅ config.yml found"
else
    echo "  ❌ config.yml missing"
    ((ERRORS++))
fi

echo
if [[ $ERRORS -eq 0 ]]; then
    echo "✅ All templates are valid!"
    exit 0
else
    echo "❌ Found $ERRORS errors in templates"
    exit 1
fi