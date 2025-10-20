# Force Deploy TRYONYOU - Usage Guide

## Overview

The `force_deploy_tryonyou.sh` script creates a complete deployment bundle for the TRYONYOU platform. This bundle includes all necessary files and configurations for quick deployment to Vercel or any other hosting platform.

## Quick Start

### 1. Make the Script Executable

```bash
chmod +x force_deploy_tryonyou.sh
```

### 2. Run the Script

```bash
./force_deploy_tryonyou.sh
```

This will:
- Create the `TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL/` directory
- Generate all necessary files and configurations
- Create a ZIP archive `TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL.zip`

## What Gets Created

The script generates a complete deployment bundle with the following structure:

```
TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL/
├── .github/workflows/          # GitHub Actions CI/CD
│   └── deploy.yml             # Automated deployment workflow
├── ABVETOS_ORCHESTRATOR_MASTER/
│   └── config.json            # Orchestrator configuration
├── docs/legal/                # Legal documentation
│   ├── PRIVACY.md
│   └── TERMS.md
├── reports/                   # Deployment reports
│   └── deployment_report.md
├── src/modules/               # Module structure
│   └── README.md
├── index.html                 # Main landing page
├── vercel.json                # Vercel configuration
├── package.json               # Package configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Bundle documentation
```

## Deployment Instructions

### Deploy to Vercel (Recommended)

#### Option 1: Manual Deployment

```bash
cd TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL
vercel --prod
```

#### Option 2: With SSL Certificate Setup

```bash
cd TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL
vercel --prod
vercel certs issue tryonyou.app --yes
```

#### Option 3: Using npm Scripts

```bash
cd TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL
npm run deploy
npm run certs
```

### Verify Deployment

Open your browser to check the deployment:

```bash
open https://tryonyou.app
```

Or manually visit: https://tryonyou.app

## Bundle Features

### 1. Landing Page (index.html)
- Modern, responsive design
- Purple gradient background with glassmorphism effects
- Animated logo
- Success status indicator
- Mobile-friendly

### 2. GitHub Actions Workflow
- Automated deployment on push to main/production
- Manual trigger support (workflow_dispatch)
- Node.js 18 setup
- Vercel deployment integration

### 3. Orchestrator Configuration
- Module status tracking (PAU, CAP, FTT)
- Deployment target configuration
- SSL settings

### 4. Legal Documentation
- Terms of Service
- Privacy Policy

### 5. Deployment Report
- Timestamp and build information
- Contents verification checklist
- Next steps guide

## Prerequisites

### For Vercel Deployment

1. **Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Vercel Account**: Sign up at https://vercel.com

3. **Domain Setup** (optional): Configure tryonyou.app domain in Vercel dashboard

### For GitHub Actions

Required GitHub Secrets:
- `VERCEL_TOKEN`: Your Vercel token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## Troubleshooting

### Script Fails to Execute

**Issue**: Permission denied
```bash
chmod +x force_deploy_tryonyou.sh
./force_deploy_tryonyou.sh
```

### ZIP Archive Not Created

**Issue**: `zip` command not found

Install zip utility:
```bash
# Ubuntu/Debian
sudo apt-get install zip

# macOS
brew install zip
```

### Vercel Deployment Fails

**Issue**: Not logged in to Vercel
```bash
vercel login
```

**Issue**: Token expired
```bash
vercel logout
vercel login
```

## Customization

### Modify Landing Page

Edit `TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL/index.html` to customize:
- Colors (gradient, text)
- Content (title, description)
- Logo (emoji or image)
- Styling (fonts, layout)

### Update Vercel Configuration

Edit `TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL/vercel.json` to:
- Add custom headers
- Configure redirects
- Set environment variables
- Adjust build settings

### Extend Module Structure

Add modules to `TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL/src/modules/`:
```bash
cd TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL/src/modules
mkdir NEW_MODULE
# Add your module files
```

## Clean Up

To remove generated files:

```bash
rm -rf TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL
rm -f TRYONYOU_DEPLOY_EXPRESS_BUNDLE_FULL.zip
```

## Support

For issues or questions:
- GitHub Issues: Create an issue in the repository
- Email: support@tryonyou.app

---

**TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM**

*Fashion Intelligence Platform*
