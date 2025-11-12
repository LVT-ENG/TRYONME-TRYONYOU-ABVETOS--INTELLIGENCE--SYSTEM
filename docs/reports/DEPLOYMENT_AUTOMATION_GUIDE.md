# TRYONYOU Deployment Report - Automation Guide

## 📋 Overview

This guide explains the automated deployment reporting system for TRYONYOU. The system generates comprehensive deployment reports and distributes them across multiple platforms.

## 🎯 System Components

### 1. Report Generator Script

**Location**: `/scripts/generate_deploy_report.sh`

**Purpose**: Generates the complete deployment report package including:
- Full deployment report (Markdown format)
- Runtime and pipeline logs
- Deployment metadata (JSON)
- Package README

**Usage**:
```bash
./scripts/generate_deploy_report.sh
```

### 2. Generated Package Structure

```
TRYONYOU_DEPLOY_REPORT_FULLCYCLE.zip
│
├── TRYONYOU_Deploy_Report_FullCycle.md    ← Full deployment report (in English)
├── logs/
│   └── deploy_2025-10-20.log              ← Runtime + pipeline logs
├── meta/
│   └── deploy_metadata.json               ← Version, commit hash, tokens refresh info
└── README.md                               ← Package documentation
```

## 🚀 Deployment Targets

The deployment report is automatically distributed to the following targets:

### 1. Google Drive Backup
- **Path**: `/01_PATENTES/REWRITTEN_FILES/`
- **Purpose**: Long-term archival and patent documentation
- **Automation**: Manual upload or via Google Drive API
- **Access**: Restricted to authorized personnel

**Manual Backup Process**:
```bash
# 1. Download the ZIP file from GitHub or local repository
# 2. Navigate to Google Drive
# 3. Upload to /01_PATENTES/REWRITTEN_FILES/
```

**Automated Backup** (requires setup):
```bash
# Using rclone (requires configuration)
rclone copy docs/reports/TRYONYOU_DEPLOY_REPORT_FULLCYCLE.zip \
  gdrive:/01_PATENTES/REWRITTEN_FILES/
```

### 2. GitHub Repository
- **Path**: `/docs/reports/`
- **Purpose**: Version control and team collaboration
- **Automation**: Automatic via Git commit
- **Access**: Public repository access

**Automated Process**:
```bash
# The report is automatically committed when you run:
git add docs/reports/
git commit -m "📊 Update deployment report"
git push origin main
```

### 3. Vercel Production
- **Environment**: Production
- **URL**: https://tryonyou.app
- **Purpose**: Live deployment hosting
- **Automation**: Automatic deployment on push to main

**Process**:
- Push to `main` branch triggers automatic build
- Vercel builds and deploys to production
- Reports are accessible at: https://tryonyou.app/docs/reports/

**Configuration**: See `vercel.json` for deployment settings

### 4. Notification System
- **Bot**: @abvet_deploy_bot
- **Channels**: Telegram, Email
- **Content**: Status updates + screenshots
- **Automation**: Triggered on successful deployment

**Setup Requirements**:
1. Configure Telegram Bot Token
2. Set up email SMTP settings
3. Configure notification webhook

**Example Notification Script** (placeholder):
```bash
#!/bin/bash
# Send notification to @abvet_deploy_bot

TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="your_chat_id"
MESSAGE="✅ TRYONYOU Deployment Complete - $(date)"

# Send to Telegram
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="${MESSAGE}"

# Send to Email (using sendmail or SMTP)
echo "Subject: TRYONYOU Deployment Complete
From: deploy@tryonyou.app
To: notifications@tryonyou.app

${MESSAGE}
" | sendmail -t
```

## 🔄 Automated Workflow

### Full Deployment Cycle

```
┌─────────────────────────────────────────────────────────┐
│ 1. Code Push to Main Branch                            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 2. GitHub Actions Triggered                            │
│    - Build modules (PAU, CAP)                          │
│    - Run tests                                         │
│    - Build main application                            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Generate Deployment Report                          │
│    - Run: ./scripts/generate_deploy_report.sh          │
│    - Creates ZIP package                               │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Deploy to Vercel                                    │
│    - Auto-deploy production                            │
│    - URL: https://tryonyou.app                         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Commit Report to GitHub                             │
│    - Path: /docs/reports/                              │
│    - Includes: ZIP, logs, metadata                     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Backup to Google Drive                              │
│    - Path: /01_PATENTES/REWRITTEN_FILES/               │
│    - Manual or automated                               │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Send Notifications                                  │
│    - Bot: @abvet_deploy_bot                            │
│    - Includes status + screenshots                     │
└─────────────────────────────────────────────────────────┘
```

## 📝 Manual Generation

To manually generate a deployment report:

```bash
# Navigate to project root
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Run the generator script
./scripts/generate_deploy_report.sh

# Check the generated files
ls -la docs/reports/

# Output:
# - TRYONYOU_DEPLOY_REPORT_FULLCYCLE.zip
# - TRYONYOU_Deploy_Report_FullCycle.md
# - logs/deploy_YYYY-MM-DD.log
# - meta/deploy_metadata.json
# - README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (not committed to repository):

```env
# Google Drive Configuration
GOOGLE_DRIVE_TOKEN=your_token_here
GOOGLE_DRIVE_FOLDER_ID=your_folder_id

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password

# Vercel Configuration (already in vercel.json)
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id
```

### GitHub Secrets

For automated workflows, configure these secrets in GitHub:

1. Go to: Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `GOOGLE_DRIVE_TOKEN`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `SMTP_PASSWORD`
   - `VERCEL_TOKEN`

## 📊 Deployment Metadata

The `deploy_metadata.json` file contains:

```json
{
  "deployment": {
    "timestamp": "ISO 8601 timestamp",
    "date": "YYYY-MM-DD",
    "environment": "production",
    "platform": "Vercel",
    "status": "completed"
  },
  "version": {
    "app_version": "1.0.0",
    "commit_hash": "full commit hash",
    "commit_short": "short commit hash",
    "branch": "branch name",
    "build_number": "YYYYMMDDHHmm"
  },
  "tokens": {
    "refresh_date": "ISO 8601 timestamp",
    "next_refresh": "ISO 8601 timestamp (+30 days)",
    "status": "active"
  },
  "modules": {
    "PAU": { "version": "1.0.0", "status": "deployed" },
    "CAP": { "version": "1.0.0", "status": "deployed" },
    "FTT": { "version": "0.1.0", "status": "placeholder" }
  },
  "deployment_targets": {
    "google_drive": { "status": "success", "path": "..." },
    "github": { "status": "success", "commit": "..." },
    "vercel": { "status": "success", "url": "..." },
    "notifications": { "status": "sent", "bot": "..." }
  }
}
```

## 🔐 Security Considerations

1. **Never commit sensitive credentials** to the repository
2. Use environment variables for all tokens and passwords
3. Configure GitHub Secrets for automated workflows
4. Restrict Google Drive access to authorized personnel
5. Use secure HTTPS connections for all API calls

## 📚 Related Documentation

- [Deployment Guide](../../DEPLOY_INSTRUCTIONS.md)
- [Vercel Configuration](../../vercel.json)
- [GitHub Workflows](../../.github/workflows/deploy.yml)
- [Security Guidelines](../../SECURITY.md)

## 🆘 Troubleshooting

### Report Generation Fails

**Problem**: Script exits with error

**Solution**:
```bash
# Check script permissions
chmod +x scripts/generate_deploy_report.sh

# Verify Git is installed and repository is initialized
git --version
git status

# Check for required dependencies
which zip
which node
```

### ZIP File Not Created

**Problem**: No ZIP file in `/tmp` or `docs/reports/`

**Solution**:
```bash
# Ensure zip is installed
sudo apt-get install zip  # On Debian/Ubuntu

# Check disk space
df -h /tmp

# Run with verbose output
bash -x scripts/generate_deploy_report.sh
```

### Vercel Deployment Fails

**Problem**: Changes don't appear on production

**Solution**:
```bash
# Check Vercel status
vercel --version

# Manually trigger deployment
vercel --prod

# Check deployment logs
vercel logs
```

### Notification Not Sent

**Problem**: Bot doesn't send notifications

**Solution**:
```bash
# Verify bot token
echo $TELEGRAM_BOT_TOKEN

# Test bot manually
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"

# Check chat ID
echo $TELEGRAM_CHAT_ID
```

## 📞 Support

For issues or questions:
- **Email**: support@tryonyou.app
- **Repository**: [GitHub Issues](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)
- **Documentation**: https://docs.tryonyou.app

---

**Last Updated**: 2025-10-20  
**Version**: 1.0.0  
**Status**: Active

---

*TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM*  
*Fashion Intelligence Platform*
