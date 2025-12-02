#!/bin/bash

# ABVETOS Orchestration Status Check
# This script checks the status of all system components

echo "🔍 ABVETOS System Status Check"
echo "================================"

# Check Node.js
echo -n "Node.js: "
if command -v node &> /dev/null; then
    echo "✓ $(node -v)"
else
    echo "✗ Not installed"
fi

# Check npm
echo -n "npm: "
if command -v npm &> /dev/null; then
    echo "✓ $(npm -v)"
else
    echo "✗ Not installed"
fi

# Check Git
echo -n "Git: "
if command -v git &> /dev/null; then
    echo "✓ $(git --version | cut -d' ' -f3)"
else
    echo "✗ Not installed"
fi

# Check project structure
echo ""
echo "Project Structure:"
echo "================================"

# Check key directories
for dir in src dist node_modules public scripts; do
    if [ -d "$dir" ]; then
        echo "✓ /$dir"
    else
        echo "✗ /$dir (missing)"
    fi
done

# Check key files
echo ""
echo "Key Files:"
echo "================================"
for file in package.json vite.config.js index.html src/App.jsx src/main.jsx; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ $file (missing)"
    fi
done

# Check modules
echo ""
echo "ABVETOS Modules:"
echo "================================"
for module in ABVETOS Agent70 CoreDock QAPI CAP PAU DeployExpress Wardrobe; do
    if [ -d "src/modules/$module" ]; then
        echo "✓ $module"
    else
        echo "○ $module (not installed)"
    fi
done

echo ""
echo "Status check complete."
