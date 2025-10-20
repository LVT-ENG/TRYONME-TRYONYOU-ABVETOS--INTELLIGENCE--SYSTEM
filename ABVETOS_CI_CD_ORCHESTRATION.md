# 🚀 ABVETOS Auto-Deploy Express

> Automatic CI/CD orchestration system for TRYONYOU with one-click deploy from iCloud

## 📋 Overview

ABVETOS Auto-Deploy Express is a comprehensive CI/CD orchestration system that automatically handles:

1. **Commit → Push → Build** via Vite
2. **Deploy** to Vercel production
3. **Telegram Notification** with deployment screenshots
4. **Backup Package** creation and storage

## 🎯 Quick Start

### For macOS Users (Drag & Drop Deploy)

Simply drag any file to this folder to trigger automatic deployment:

```
📂 ~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX
```

The system will automatically:
- ✅ Detect the new file
- ✅ Trigger GitHub Actions workflow
- ✅ Build the application with Vite
- ✅ Deploy to Vercel production
- ✅ Send Telegram notifications with screenshots
- ✅ Create backup package in Google Drive

### Manual Trigger

You can also manually trigger deployment:

```bash
# Via GitHub CLI
gh workflow run deploy.yml

# Or push to main branch
git push origin main
```

## 🔧 Configuration

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:

```bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id
VERCEL_ORG_ID=your_org_id

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# GitHub (for CI/CD)
GITHUB_TOKEN=your_github_token
```

Optional variables:

```bash
# Google Drive (for backups)
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_DRIVE_CREDENTIALS_JSON=path_to_credentials.json

# Auto-Deploy Settings
AUTO_DEPLOY_ENABLED=true
DEPLOY_INBOX_PATH=~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX
BACKUP_RETENTION_DAYS=30
```

### 2. GitHub Secrets

Configure the following secrets in your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `VERCEL_TOKEN` | Vercel authentication token |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Telegram chat ID for notifications |

See [GITHUB_SECRETS_SETUP_COMPLETE.md](./GITHUB_SECRETS_SETUP_COMPLETE.md) for detailed instructions.

### 3. Token Refresh

Run the token refresh script periodically to ensure all services remain authenticated:

```bash
./refresh_tokens.sh
```

This script validates and refreshes:
- ✅ Vercel authentication
- ✅ GitHub CLI authentication
- ✅ Telegram bot token
- ✅ Google Cloud credentials (optional)

**Automated refresh** (recommended):

Add to crontab for weekly refresh:

```bash
crontab -e
```

Add this line:

```
0 0 * * 0 cd /path/to/repo && ./refresh_tokens.sh
```

## 📦 What Gets Deployed

### Build Process

1. **Dependencies Installation**: `npm ci`
2. **Vite Build**: `npm run build`
3. **Verification**: Checks that all required files are in `dist/`
4. **Optimization**: Minified and optimized production bundle

### Deployment Package

The deployment includes:

```
dist/
├── index.html (optimized)
├── assets/
│   ├── *.js (minified, tree-shaken)
│   ├── *.css (minified)
│   └── images/ (optimized)
├── docs/
│   └── legal/ (required documentation)
└── vercel.json (configuration)
```

### Backup Package

Each deployment creates a timestamped backup:

```
TRYONYOU_BACKUP_YYYYMMDD_HHMMSS.zip
├── dist/ (built files)
├── package.json
├── package-lock.json
├── vercel.json
└── DEPLOY_INFO.txt (deployment metadata)
```

Backups are stored:
- As GitHub Actions artifacts (30 days retention)
- In Google Drive (if configured)

## 📢 Telegram Notifications

After each deployment, you'll receive:

### Text Message

```
🚀 ABVETOS Auto-Deploy Express

✅ Status: Deployment Successful
🌐 URL: https://tryonyou.app
📦 Commit: abc1234
💬 Message: Update homepage design
🌿 Branch: main
👤 Author: LVT-ENG
⏰ Time: 2025-10-20 07:30:00 UTC
💾 Backup: Created and stored

🤖 All systems operational 24/7
```

### Screenshots

- 🖥️ **Desktop View** (1920x1080)
- 📱 **Mobile View** (375x812)

## 🔍 Monitoring

### Deployment Status

Check deployment status:

1. **GitHub Actions**: https://github.com/[org]/[repo]/actions
2. **Vercel Dashboard**: https://vercel.com/dashboard
3. **Telegram**: Real-time notifications

### Logs

Access deployment logs:

```bash
# View latest workflow run
gh run list --workflow=deploy.yml

# View specific run logs
gh run view [run-id]

# Download artifacts
gh run download [run-id]
```

### Health Checks

The system performs automatic health checks:

- ✅ Build verification
- ✅ Deployment success
- ✅ Screenshot capture (confirms site is live)
- ✅ Telegram notification delivery

## 🛠️ Troubleshooting

### Common Issues

#### 1. Deployment Fails

**Problem**: GitHub Actions workflow fails

**Solution**:
```bash
# Check workflow logs
gh run list --workflow=deploy.yml
gh run view [run-id] --log

# Common fixes:
- Verify all GitHub secrets are set correctly
- Check Vercel token is valid: ./refresh_tokens.sh
- Ensure node_modules is not committed
```

#### 2. No Telegram Notifications

**Problem**: Deployment succeeds but no Telegram message

**Solution**:
```bash
# Test Telegram bot manually
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="Test message"

# Verify secrets:
- Check TELEGRAM_BOT_TOKEN in GitHub Secrets
- Check TELEGRAM_CHAT_ID in GitHub Secrets
- Run: ./refresh_tokens.sh
```

#### 3. Screenshots Not Generated

**Problem**: Telegram message sent but no screenshots

**Solution**:
- Puppeteer may have failed to launch
- Check workflow logs for Puppeteer errors
- Verify site is accessible at deployment URL
- May need to wait longer for site to be fully deployed

#### 4. Backup Not Created

**Problem**: Deployment succeeds but backup missing

**Solution**:
```bash
# Check GitHub Actions artifacts
gh run view [run-id] --web

# Backups are retained for 30 days
# Download manually if needed:
gh run download [run-id]
```

### Token Refresh Issues

If `refresh_tokens.sh` fails:

```bash
# Manually login to services:

# Vercel
vercel login

# GitHub
gh auth login

# Google Cloud (optional)
gcloud auth login
```

## 📚 Related Documentation

- [Deploy Instructions](./DEPLOY_INSTRUCTIONS.md) - Manual deployment guide
- [GitHub Secrets Setup](./GITHUB_SECRETS_SETUP_COMPLETE.md) - Secrets configuration
- [Vercel Domain Setup](./VERCEL_DOMAIN_SETUP.md) - Domain configuration
- [Quick Start](./QUICK_START.md) - Getting started guide

## 🔒 Security

### Best Practices

1. **Never commit secrets** to the repository
2. **Use GitHub Secrets** for all sensitive tokens
3. **Rotate tokens regularly** using `refresh_tokens.sh`
4. **Use environment-specific** `.env` files
5. **Enable 2FA** on all service accounts

### Token Permissions

Ensure tokens have minimal required permissions:

- **Vercel Token**: Deploy permission only
- **GitHub Token**: `repo` and `workflow` scopes
- **Telegram Bot**: Message send permission
- **Google Service Account**: Drive write permission only

## 🎨 Customization

### Modify Notification Message

Edit `.github/workflows/deploy.yml`:

```yaml
- name: 📢 Send Telegram Notification
  env:
    TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
  run: |
    MESSAGE="Your custom message here"
    # ... rest of the notification code
```

### Change Backup Retention

Edit `.github/workflows/deploy.yml`:

```yaml
- name: 📤 Upload Backup to Artifacts
  uses: actions/upload-artifact@v4
  with:
    retention-days: 30  # Change this value
```

### Add Custom Build Steps

Edit `.github/workflows/deploy.yml` in the `build` job:

```yaml
- name: Your Custom Step
  run: |
    # Your custom commands
```

## 📈 Performance

### Build Times

Typical build times:

- **Dependencies Installation**: ~30 seconds
- **Vite Build**: ~45 seconds
- **Deployment**: ~30 seconds
- **Screenshots**: ~20 seconds
- **Total**: ~2-3 minutes

### Optimization Tips

1. Use `npm ci` instead of `npm install`
2. Enable Vite caching
3. Optimize images before committing
4. Use code splitting for large apps
5. Enable Vercel Edge Caching

## 🤝 Support

For issues or questions:

1. Check [Troubleshooting](#troubleshooting) section
2. Review workflow logs: `gh run view --log`
3. Test tokens: `./refresh_tokens.sh`
4. Check Telegram bot status
5. Verify Vercel deployment status

---

**Maintained by**: TRYONYOU Team  
**Version**: 1.0.0  
**Last Updated**: 2025-10-20
