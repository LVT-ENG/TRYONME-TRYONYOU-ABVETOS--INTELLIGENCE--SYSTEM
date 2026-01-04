# Comprehensive Deployment Script

## Overview

`deploy_comprehensive.sh` is a comprehensive deployment script for the TRYONYOU platform. It handles the complete deployment workflow from cleanup to production deployment.

## Features

✅ **Directory Verification** - Ensures script runs from repository root  
✅ **Branch Management** - Switches to and updates main branch  
✅ **Deep Cleanup** - Removes obsolete files and build artifacts  
✅ **Dependency Management** - Installs npm and Python dependencies  
✅ **Structure Verification** - Creates required directory structure  
✅ **Smart Staging** - Adds files selectively with error handling  
✅ **Detailed Commit** - Creates comprehensive commit message with module details  
✅ **Safe Push** - Pushes to origin main with error handling  
✅ **Optional Vercel Deploy** - Deploys to Vercel if token is available  
✅ **Comprehensive Reporting** - Provides detailed status output  

## Prerequisites

- Git repository initialized
- Node.js and npm installed
- Python 3 (optional, for backend dependencies)
- Vercel token (optional, for automatic deployment)

## Usage

### Basic Usage

```bash
./deploy_comprehensive.sh
```

### With Vercel Deployment

```bash
export VERCEL_TOKEN="your_vercel_token_here"
./deploy_comprehensive.sh
```

## What It Does

### 1. Verification Phase
- Checks if `package.json` exists (confirms correct directory)
- Exits with error if not in repository root

### 2. Git Management
- Switches to `main` branch
- Pulls latest changes from `origin/main`
- Handles errors gracefully

### 3. Cleanup Phase
Removes:
- `node_modules/` and `dist/` directories
- Legacy directories: `legacy_old`, `temp_old`, `apps/web-old`, etc.
- Python cache files: `*.pyc`, `__pycache__/`
- System files: `.DS_Store`

### 4. Dependencies
- Installs npm packages from `package.json`
- Optionally installs Python packages from `requirements.txt`

### 5. Directory Structure
Creates essential directories:
```
docs/
├── arquitectura_empresa/
├── patent_EPCT/
└── investor_edition/

public/
├── assets/
│   ├── hero/
│   ├── modules/
│   ├── investor/
│   ├── vision/
│   ├── images/
│   ├── videos/
│   └── logo/
└── models/

src/
├── modules/
├── components/
├── pages/
├── agents/
├── data/
├── hooks/
└── styles/
```

### 6. File Staging
Adds files in priority order:
1. Main application directories (`apps/`, `api/`, `modules/`, etc.)
2. Core directories (`docs/`, `src/`, `public/`, `scripts/`)
3. Configuration files (`package.json`, `vite.config.js`, etc.)
4. Deployment scripts
5. Python files

### 7. Commit Creation
Creates a detailed commit message including:
- System architecture overview
- Integrated modules list
- Infrastructure details
- Documentation references
- Deployment information

### 8. Push to GitHub
- Pushes changes to `origin/main`
- Exits with error if push fails

### 9. Vercel Deployment (Optional)
- Deploys to Vercel if `VERCEL_TOKEN` is set
- Uses production configuration
- Continues on error (non-blocking)

### 10. Final Report
Displays:
- Repository information
- Branch status
- Domain URL
- Deployment status
- Monitoring links

## Modules Integrated

The script recognizes and documents these modules:

- **Avatar3D**: 3D virtual try-on system
- **TextileComparator**: Fabric comparison engine
- **PAU**: Personal AI Unforgettable recommendations
- **CAP**: Capsule Automation Platform
- **ABVET**: Advanced Biometric Verification & Encrypted Transactions
- **Wardrobe**: Digital closet management
- **AutoDonate**: Automated clothing donation
- **FTT**: Fashion Trend Tracker

## Infrastructure

- **Frontend**: Vite 5.x + React 18.x
- **Deployment**: Vercel + Cloudflare SSL
- **CI/CD**: GitHub Actions
- **Monitoring**: Telegram (@abvet_deploy_bot)

## Error Handling

The script uses `set -e` to exit on errors and provides specific error messages:

- `❌ Error: Este script debe ejecutarse desde la raíz del repositorio` - Not in repo root
- `❌ Error al cambiar a main` - Cannot switch to main branch
- `❌ Error al hacer pull` - Cannot pull from remote
- `❌ Error al hacer push` - Cannot push to remote
- `⚠️  Error en deploy de Vercel` - Vercel deployment failed (non-fatal)

## Output Symbols

- ✅ Success
- ❌ Error (fatal)
- ⚠️  Warning (non-fatal)
- ℹ️  Information
- 📦 Package/Repository operations
- 🌿 Branch operations
- 🌐 Deployment operations
- 📊 Status information
- 🔗 Links/Notifications
- 💎 Special/Important
- 📁 Directory operations
- ➕ Adding files
- 🚀 Pushing/Deploying
- 🧹 Cleanup operations

## Related Scripts

- `deploy.sh` - Basic deployment script
- `consolidar_sistema.sh` - System consolidation
- `SUPERCOMMIT_MAX.sh` - Quick deployment for Lafayette
- `setup_backend_full.sh` - Backend setup

## Troubleshooting

### Script Won't Run
```bash
chmod +x deploy_comprehensive.sh
```

### Not in Repository Root
```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
./deploy_comprehensive.sh
```

### Vercel Token Not Found
```bash
export VERCEL_TOKEN="your_token_here"
./deploy_comprehensive.sh
```

### Git Push Fails
Ensure you have push permissions and the remote is configured:
```bash
git remote -v
```

## Security Notes

- Never commit the script with hardcoded tokens
- Use environment variables for sensitive data
- The script removes but doesn't commit `.env` files
- Python cache files are always cleaned

## Production Deployment

For production deployment:
1. Ensure all tests pass
2. Review changes with `git status` and `git diff`
3. Set `VERCEL_TOKEN` environment variable
4. Run the script
5. Verify deployment at https://tryonyou.app

## Support

For issues or questions:
- Repository: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- Telegram: @abvet_deploy_bot
- Domain: https://tryonyou.app

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintainer**: TRYONYOU Team
