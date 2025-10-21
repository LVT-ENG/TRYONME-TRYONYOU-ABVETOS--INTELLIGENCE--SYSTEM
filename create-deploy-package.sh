#!/usr/bin/env bash
set -e

# ═══════════════════════════════════════════════════════════
# TRYONYOU_ABVETOS_MASTER_DEPLOY Package Creator
# Creates deployment-ready ZIP with all necessary files
# ═══════════════════════════════════════════════════════════

PACKAGE_NAME="TRYONYOU_ABVETOS_MASTER_DEPLOY.zip"
TEMP_DIR="/tmp/tryonyou_deploy_package"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "════════════════════════════════════════════════════════"
echo "🚀 TRYONYOU ABVETOS Master Deploy Package Creator"
echo "════════════════════════════════════════════════════════"
echo ""

# Clean up old temp directory if exists
if [ -d "$TEMP_DIR" ]; then
    echo "🧹 Cleaning up old temp directory..."
    rm -rf "$TEMP_DIR"
fi

# Create temp directory structure
echo "📁 Creating package structure..."
mkdir -p "$TEMP_DIR"

# Copy core files
echo "📄 Copying core configuration files..."
cp index.html "$TEMP_DIR/"
cp package.json "$TEMP_DIR/"
cp vite.config.js "$TEMP_DIR/"
cp vercel.json "$TEMP_DIR/"
cp .env.example "$TEMP_DIR/"
cp deploy.sh "$TEMP_DIR/"
chmod +x "$TEMP_DIR/deploy.sh"

# Copy src directory
echo "📦 Copying source directory..."
cp -r src "$TEMP_DIR/"

# Copy modules directory (PAU, CAP)
echo "🔧 Copying modules..."
cp -r modules "$TEMP_DIR/"

# Copy docs directory
echo "📚 Copying documentation..."
cp -r docs "$TEMP_DIR/"

# Copy public directory
echo "🌐 Copying public assets..."
cp -r public "$TEMP_DIR/"

# Copy .github workflows
echo "⚙️  Copying GitHub workflows..."
mkdir -p "$TEMP_DIR/.github/workflows"
cp .github/workflows/deploy.yml "$TEMP_DIR/.github/workflows/"
cp .github/workflows/orchestration-report.yml "$TEMP_DIR/.github/workflows/"

# Create logs directory (empty)
echo "📋 Creating logs directory..."
mkdir -p "$TEMP_DIR/logs"
echo "# Deploy logs will be created here" > "$TEMP_DIR/logs/README.md"

# Create README for the package
echo "📝 Creating package README..."
cat > "$TEMP_DIR/README_DEPLOY.md" << 'EOF'
# TRYONYOU ABVETOS Master Deploy Package

This package contains everything needed for automated deployment of TRYONYOU.

## Quick Start

1. **Extract the package**
   ```bash
   unzip TRYONYOU_ABVETOS_MASTER_DEPLOY.zip
   cd TRYONYOU_MASTER/
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Deploy**
   ```bash
   ./deploy.sh "Your commit message"
   ```

## Package Contents

```
/
├── index.html                 # Main entry point
├── vite.config.js            # Vite configuration (7.1.2)
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment template
├── package.json              # Dependencies
├── deploy.sh                 # Master deploy script
├── /src/                     # Source code
│   ├── modules/              # Core modules
│   │   ├── pau/             # Personalized Avatar Unit
│   │   ├── cap/             # Collaborative AI Production
│   │   ├── abvet/           # ABVET Payment Gateway
│   │   ├── autodonate/      # AutoDonate system
│   │   └── dashboard/       # ABVETOS Dashboard
│   ├── assets/              # Images, videos, icons
│   └── frontend/            # UI components
├── /docs/                    # Documentation
│   ├── legal/               # Legal documents (EPCT + Superclaims)
│   ├── investors/           # Investor materials (Deck + Dossier)
│   ├── patent/              # Patent documentation
│   └── dashboard/           # ABVETOS + Panel VVL
├── /public/                  # Public assets
│   ├── docs/
│   └── media/
├── .github/
│   └── workflows/
│       ├── deploy.yml       # Auto-deploy workflow
│       └── orchestration-report.yml
└── /logs/                    # Deploy logs (auto-generated)

```

## Features

✅ **Full Auto Deploy** - Automated deployment with GitHub Actions
✅ **Telegram Integration** - Notifications via @abvet_deploy_bot
✅ **Comprehensive Logging** - All deployments logged in /logs/
✅ **Token Auto-refresh** - Automatic Vercel token management
✅ **Multi-region Support** - Global CDN via Vercel
✅ **Screenshot Capture** - Desktop & mobile screenshots on each deploy

## Deployment Flow

1. Push changes to GitHub
2. GitHub Actions triggers build
3. Vite builds optimized production bundle
4. Deploy to Vercel
5. Capture screenshots (desktop/mobile)
6. Send Telegram notification with results
7. Log everything to /logs/deploy_[date].log

## Configuration

### Required Secrets (GitHub)

- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `TELEGRAM_CHAT_ID` - Telegram chat ID

### Environment Variables

See `.env.example` for all configuration options.

## Support

- Documentation: https://tryonyou.app/docs/
- Issues: GitHub Issues
- Contact: deploy@tryonyou.app

## License

Proprietary - TRYONYOU / ABVETOS Intelligence Systems
EOF

# Create the ZIP package
echo "🗜️  Creating ZIP package..."
CURRENT_DIR=$(pwd)

# Create ZIP with proper structure
cd "$TEMP_DIR"
zip -r "$CURRENT_DIR/$PACKAGE_NAME" . -q

# Get package size
PACKAGE_SIZE=$(du -h "$CURRENT_DIR/$PACKAGE_NAME" | cut -f1)

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Package created successfully!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📦 Package: $PACKAGE_NAME"
echo "📊 Size: $PACKAGE_SIZE"
echo "📍 Location: $CURRENT_DIR/$PACKAGE_NAME"
echo ""
echo "🎯 Next Steps:"
echo "   1. Extract the package"
echo "   2. Configure .env file"
echo "   3. Run: ./deploy.sh"
echo ""
echo "🤖 The package includes:"
echo "   ✅ All source code and modules"
echo "   ✅ Documentation (legal, investors, patents)"
echo "   ✅ GitHub Actions workflows"
echo "   ✅ Auto-deploy script with Telegram integration"
echo "   ✅ Vite 7.1.2 configuration"
echo "   ✅ Vercel deployment config"
echo ""
echo "════════════════════════════════════════════════════════"

# Cleanup
rm -rf "$TEMP_DIR"

echo "✨ Package ready for TRYONYOU_DEPLOY_EXPRESS_INBOX!"
