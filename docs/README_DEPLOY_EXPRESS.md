# ABVETOS FULL FUSION - Deploy Express

## 🚀 Overview

**ABVETOS Full Fusion Deploy Express** is an automated deployment protocol that integrates three core repositories:
- **ABVETOS** - Core system
- **NOTS** - Notification system
- **ABVEY** - Additional modules

The fusion creates a unified **TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM** deployment.

## 📁 Directory Structure

```
ABVETOS_FULL_FUSION_DEPLOY_EXPRESS/
│
├── automation/
│   └── abvetos_full_fusion.mjs       ← Master script: clones, merges, and deploys
│
├── deploy/
│   └── deploy_trigger.json           ← Triggers automatic execution
│
├── reports/
│   └── placeholder.txt               ← Stores logs and PDF reports
│
└── docs/
    └── README_DEPLOY_EXPRESS.md      ← Quick usage and diagnostics guide
```

## 🎯 Quick Start

### Prerequisites

- Node.js 20 or higher
- Git installed and configured
- npm or yarn package manager
- rsync (for Unix/Linux/macOS systems)
- Vercel CLI (optional, for production deployment)

### Installation

No installation required. The script is self-contained and handles all dependencies.

### Basic Usage

Run the fusion script manually:

```bash
node automation/abvetos_full_fusion.mjs
```

## 📋 What the Script Does

### Step 1: Clone Repositories
Clones the three source repositories into a `./workspace` directory:
- ABVETOS
- NOTS
- ABVEY

### Step 2: Merge Modules
Uses rsync to merge all code and modules into a `./merged` directory, excluding .git folders.

### Step 3: Normalize Configuration
Updates the `package.json` in the merged directory:
- Sets Vite version to 7.1.2
- Configures standard scripts (dev, build, preview)
- Ensures Node 20 compatibility

### Step 4: Build and Deploy
Executes the build process and deploys to production:
```bash
npm install
npm run build
npx vercel --prod --confirm
```

### Step 5: Generate Report
Creates a fusion summary report in `./reports/fusion-summary.json` with:
- Execution timestamp
- List of merged repositories
- Target domain
- Success/failure status

## 🔧 Configuration

### Deploy Trigger Configuration

Edit `deploy/deploy_trigger.json` to customize:

```json
{
  "trigger": "abvetos_full_fusion",
  "enabled": true,
  "schedule": {
    "manual": true,
    "automated": false
  },
  "config": {
    "repos": [
      "https://github.com/LVT-ENG/ABVETOS.git",
      "https://github.com/LVT-ENG/NOTS.git",
      "https://github.com/LVT-ENG/ABVEY.git"
    ],
    "targetDomain": "https://tryonyou.app",
    "viteVersion": "7.1.2",
    "nodeVersion": "20"
  }
}
```

## 📊 Output and Reports

### Fusion Summary Report

After successful execution, check `./reports/fusion-summary.json`:

```json
{
  "timestamp": "2025-10-20T07:32:00.000Z",
  "merged": ["ABVETOS", "NOTS", "ABVEY"],
  "domain": "https://tryonyou.app",
  "status": "Success"
}
```

## 🔍 Diagnostics

### Common Issues

#### Issue: "rsync: command not found"
**Solution**: Install rsync on your system
- macOS: `brew install rsync`
- Ubuntu/Debian: `sudo apt-get install rsync`
- Windows: Use WSL or install rsync via Cygwin

#### Issue: "Permission denied" on git clone
**Solution**: Ensure you have access to the repositories
- Check GitHub authentication
- Verify SSH keys or personal access tokens
- Ensure repositories exist and are accessible

#### Issue: Vercel deployment fails
**Solution**: Configure Vercel credentials
- Install Vercel CLI: `npm install -g vercel`
- Login: `vercel login`
- Configure project settings

#### Issue: Build fails during npm install
**Solution**: Check Node.js version
- Ensure Node.js 20 is installed
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json, retry

### Debug Mode

To run with verbose output, modify the script to use:
```javascript
execSync(command, { stdio: "inherit" })
```

This is already the default behavior in the script.

## 🛡️ Security Considerations

- **Repository Access**: Ensure proper authentication for private repositories
- **Credentials**: Never commit Vercel tokens or API keys
- **File Permissions**: The script creates directories with appropriate permissions
- **Clean Workspace**: Always review merged code before production deployment

## 📝 Manual Steps

If automated deployment is not desired, you can run individual steps:

```bash
# 1. Clone repositories
mkdir workspace && cd workspace
git clone https://github.com/LVT-ENG/ABVETOS.git
git clone https://github.com/LVT-ENG/NOTS.git
git clone https://github.com/LVT-ENG/ABVEY.git
cd ..

# 2. Merge (manual copy)
mkdir merged
cp -r workspace/ABVETOS/* merged/
cp -r workspace/NOTS/* merged/
cp -r workspace/ABVEY/* merged/

# 3. Build
cd merged
npm install
npm run build

# 4. Deploy manually
vercel --prod
```

## 🔄 Automated Execution

To set up automated execution (e.g., via cron or GitHub Actions):

### Using Cron (Linux/macOS)
```bash
# Run daily at 3 AM
0 3 * * * cd /path/to/project && node automation/abvetos_full_fusion.mjs >> logs/fusion.log 2>&1
```

### Using GitHub Actions
Create `.github/workflows/fusion-deploy.yml`:

```yaml
name: ABVETOS Full Fusion Deploy

on:
  workflow_dispatch:
  schedule:
    - cron: '0 3 * * *'  # Daily at 3 AM UTC

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Run Fusion Script
        run: node automation/abvetos_full_fusion.mjs
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 📚 Related Documentation

- [Main README](../README.md)
- [Deployment Instructions](../DEPLOY_INSTRUCTIONS.md)
- [GitHub Secrets Setup](../GITHUB_SECRETS_SETUP_COMPLETE.md)
- [Automation Scripts](../automation/README.md)

## 🤝 Support

For issues or questions:
1. Check the diagnostics section above
2. Review logs in `./reports/`
3. Consult the main project documentation
4. Contact the TRYONYOU development team

## 📜 Version History

- **1.0.0** (2025-10-20): Initial release of ABVETOS Full Fusion Deploy Express

---

**Maintained by**: TRYONYOU Team  
**Last Updated**: 2025-10-20
