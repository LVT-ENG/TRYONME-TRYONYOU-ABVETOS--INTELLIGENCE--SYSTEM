#!/bin/bash
# Automatic versioning script with changelog generation
# Uses conventional commits to determine version bump

set -e

echo "🔖 ABVETOS Auto-Versioning System"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if standard-version is installed
if ! command -v standard-version &> /dev/null; then
    echo "Installing standard-version..."
    npm install -g standard-version
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}Current version:${NC} $CURRENT_VERSION"
echo ""

# Analyze recent commits to determine version type
echo "Analyzing recent commits..."
COMMITS=$(git log --format=%s -n 10)

# Determine version bump type
BUMP_TYPE="patch"

if echo "$COMMITS" | grep -qiE "^(BREAKING CHANGE|feat!|fix!):"; then
    BUMP_TYPE="major"
    echo -e "${YELLOW}Detected BREAKING CHANGE${NC}"
elif echo "$COMMITS" | grep -qiE "^feat:"; then
    BUMP_TYPE="minor"
    echo -e "${YELLOW}Detected new feature${NC}"
else
    echo -e "${YELLOW}Detected patch/fix${NC}"
fi

echo -e "${BLUE}Version bump type:${NC} $BUMP_TYPE"
echo ""

# Run standard-version
echo "Generating changelog and bumping version..."
npm run release:$BUMP_TYPE

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")

echo ""
echo -e "${GREEN}✅ Version updated successfully!${NC}"
echo -e "${BLUE}New version:${NC} $NEW_VERSION"
echo ""
echo "📝 Changelog has been updated in CHANGELOG.md"
echo "🏷️  Git tag v$NEW_VERSION has been created"
echo ""
echo "Next steps:"
echo "  1. Review CHANGELOG.md"
echo "  2. Push changes: git push --follow-tags origin main"
echo "  3. Deploy will trigger automatically"

