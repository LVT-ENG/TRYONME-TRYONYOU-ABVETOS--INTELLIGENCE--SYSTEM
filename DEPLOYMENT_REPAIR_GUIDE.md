# TRYONYOU Deployment Repair Guide

## Overview

The `repair_deployment.py` script provides a safe, secure way to repair deployment issues in the TRYONYOU application. It replaces insecure practices with proper environment variable management and includes comprehensive error handling.

## Features

✅ **Secure Environment Variable Management**: No hardcoded secrets  
✅ **Component Verification**: Checks for critical files before proceeding  
✅ **Safe Dependency Cleanup**: Removes corrupted node_modules and build artifacts  
✅ **Comprehensive Error Handling**: Clear error messages and recovery suggestions  
✅ **Optional Deployment**: Can build without deploying for testing  
✅ **Detailed Logging**: Track progress and diagnose issues

## Prerequisites

### Required
- Python 3.7 or higher
- Node.js and npm installed
- Git repository initialized

### For Deployment
- Vercel account with deployment token
- Vercel CLI installed (`npm install -g vercel`)

### For AI Features (Optional)
- Google Cloud API key with Vision API enabled

## Setup

### 1. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```bash
# Required for AI features
GOOGLE_API_KEY=your_actual_google_api_key_here

# Required for deployment (--deploy flag)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

**⚠️ IMPORTANT**: Never commit `.env` to version control. It's already in `.gitignore`.

### 2. Get Your API Keys

#### Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Vision API
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

#### Vercel Token
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token
3. Copy the token to your `.env` file
4. Get your Org ID and Project ID from Vercel project settings

## Usage

### Basic Repair (Build Only)

This will clean dependencies, reinstall, and build the project without deploying:

```bash
python repair_deployment.py
```

Or make it executable and run directly:

```bash
chmod +x repair_deployment.py
./repair_deployment.py
```

### Full Repair with Deployment

This will perform all repair steps AND deploy to Vercel production:

```bash
python repair_deployment.py --deploy
```

**Note**: Requires `VERCEL_TOKEN` to be set in `.env` file.

## What It Does

The repair script performs the following steps in order:

### 1. Environment Validation ✓
- Checks for `GOOGLE_API_KEY` (warns if missing)
- Validates `VERCEL_TOKEN` if deployment is requested
- Loads variables from `.env` file if present

### 2. Component Verification ✓
Verifies critical files exist:
- `package.json`
- `src/App.jsx`
- `src/main.jsx`
- `src/pages/Wardrobe.jsx`
- `vite.config.js`

### 3. Dependency Cleanup 🧹
Safely removes:
- `node_modules/`
- `package-lock.json`
- `.next/`
- `dist/`
- `.vite/`

### 4. Dependency Installation 📦
Runs:
```bash
npm install --legacy-peer-deps
```

### 5. Project Build 🔨
Runs:
```bash
npm run build
```

### 6. Deployment 🚀 (Optional)
If `--deploy` flag is used:
```bash
npx vercel --prod --yes
```

## Troubleshooting

### "GOOGLE_API_KEY not found in environment"

**Impact**: Warning only. Build will continue, but AI features won't work in production.

**Solution**: 
1. Get a Google Cloud API key
2. Add it to your `.env` file
3. Restart the repair script

### "VERCEL_TOKEN required for deployment but not set"

**Impact**: Deployment will fail.

**Solution**:
1. Get a Vercel token from your account settings
2. Add it to your `.env` file
3. Run the script again with `--deploy`

### "Missing critical component: <path>"

**Impact**: Fatal error. Build cannot proceed.

**Solution**:
1. Restore the missing file from git history
2. Clone a fresh copy of the repository
3. Contact the development team

### Build Fails with Exit Code 1

**Common Causes**:
- Corrupted dependencies
- Syntax errors in code
- Missing dependencies

**Solution**:
1. Run the repair script again (it cleans dependencies)
2. Check the error output for specific syntax errors
3. Ensure all required dependencies are in `package.json`

## New Component Modules

The repair process ensures these new modules are present:

### `src/modules/pilot.js`
System coordinator for AI-powered features:
- Environment configuration management
- Vision API integration
- Recommendation engine bridge
- Health check utilities

### `src/modules/Wardrobe/SmartWardrobe.jsx`
Enhanced wardrobe component with:
- AI-powered garment scanning
- Smart outfit recommendations
- Style matching
- Virtual try-on integration

## Security Best Practices

✅ **DO**:
- Use environment variables for all secrets
- Keep `.env` file out of version control
- Rotate API keys regularly
- Use different keys for development and production
- Review the `.env.example` for required variables

❌ **DON'T**:
- Hardcode API keys in source code
- Commit `.env` files to git
- Share API keys in chat or email
- Use production keys in development

## CI/CD Integration

### GitHub Actions

The repair script can be integrated into GitHub Actions:

```yaml
- name: Repair and Deploy
  env:
    GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  run: python repair_deployment.py --deploy
```

Make sure to add all secrets in your GitHub repository settings.

## Manual Deployment Alternative

If you prefer not to use the script, you can deploy manually:

```bash
# Clean
rm -rf node_modules package-lock.json dist .next .vite

# Install
npm install --legacy-peer-deps

# Build
npm run build

# Deploy
npx vercel --prod
```

## Support

For issues or questions:
1. Check the error logs in the script output
2. Review this documentation
3. Check existing deployment scripts (`deploy.sh`, `tryonyou_full_auto.sh`)
4. Contact the development team

## Version History

- **v2.1.0** (Current): Secure environment variable management, comprehensive error handling
- **v2.0.0**: Initial Python-based repair script
- **v1.x**: Shell script-based deployment

---

**Remember**: Security first! Never commit secrets to version control.
