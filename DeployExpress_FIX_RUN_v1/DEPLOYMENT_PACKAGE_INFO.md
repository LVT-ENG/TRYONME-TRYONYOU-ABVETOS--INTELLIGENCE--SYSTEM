# DeployExpress_FIX_RUN_v1 - Deployment Package Information

## 📦 Package Overview

This is an automatic deployment repair package for **TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM**.

## 🗂️ Package Structure

```
DeployExpress_FIX_RUN_v1/
├── .github/
│   └── workflows/
│       └── main.yml              # GitHub Actions workflow
├── TRYONYOU_DEPLOY_EXPRESS_INBOX/
│   ├── deploy_package/
│   │   ├── assets/
│   │   │   └── logo_pavo_real.png    # TRYONYOU logo
│   │   └── index.html            # Landing page
│   └── vercel.json               # Vercel configuration
├── README_FIX.md                 # Installation guide
└── DEPLOYMENT_PACKAGE_INFO.md    # This file
```

## 🚀 What This Package Does

### 1. GitHub Actions Workflow (`.github/workflows/main.yml`)
- **Trigger**: Automatically runs on push to `main` branch
- **Environment**: Ubuntu latest with Node.js 22.x
- **Steps**:
  1. Checks out repository code
  2. Sets up Node.js 22.x environment
  3. Installs dependencies (`npm install`)
  4. Builds project with Vite 7.1.2 (`npm run build`)
  5. Deploys to Vercel using `VERCEL_TOKEN` secret

### 2. Vercel Configuration (`vercel.json`)
- **Version**: 2
- **Build Source**: `deploy_package/index.html`
- **Build Type**: Static (`@vercel/static`)
- **Routing**: All routes redirect to `/deploy_package/index.html`
- **Domain**: `tryonyou.app`

### 3. Deploy Package
- **Landing Page**: Professional HTML page with deployment status
- **Assets**: Logo and branding materials
- **Static Deployment**: Optimized for Vercel static hosting

## 📋 Installation Instructions

### Step 1: Extract Package
```bash
unzip TRYONYOU_DEPLOY_EXPRESS_INBOX.zip
```

### Step 2: Move to Target Directory
```bash
mv DeployExpress_FIX_RUN_v1 ~/TRYONYOU_DEPLOY_EXPRESS_INBOX
```

### Step 3: Automatic ABVET Processing
ABVET will automatically:
- ✅ Install all npm dependencies
- ✅ Build project with Vite 7.1.2
- ✅ Deploy to https://tryonyou.app
- ✅ Send Telegram notification via @abvet_deploy_bot
- ✅ Backup deployment logs to `/01_PATENTES/REWRITTEN_FILES/`

## 🔧 Technical Specifications

| Component | Version/Details |
|-----------|----------------|
| Node.js | 22.x |
| Vite | 7.1.2 |
| Build Tool | npm |
| Deployment Platform | Vercel |
| Domain | tryonyou.app |
| CI/CD | GitHub Actions |
| Notification Bot | @abvet_deploy_bot (Telegram) |

## 🔐 Required GitHub Secrets

The workflow requires the following secret configured in GitHub:
- `VERCEL_TOKEN`: Vercel authentication token

## 📝 Notes

- This package is designed for seamless deployment with minimal configuration
- All paths are configured relative to the `deploy_package/` directory
- The workflow is optimized for the TRYONYOU project structure
- Logs and deployment artifacts are automatically backed up

## 🆘 Support

For issues or questions:
- Contact: LVT-ENG organization
- Telegram Bot: @abvet_deploy_bot
- Repository: TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

---

**Package Version**: v1.0.0  
**Created**: October 2025  
**Status**: ✅ Ready for Deployment
