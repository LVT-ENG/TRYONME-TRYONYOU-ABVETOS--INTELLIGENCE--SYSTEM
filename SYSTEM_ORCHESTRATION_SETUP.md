# System Orchestration Monitor Setup Guide

## 📋 Overview

This document describes the **EPIC Monitor – System Orchestration** implementation for TRYONYOU. The system automatically monitors and reports the status of key components every 12 hours.

## 🎯 What Was Implemented

### 1. GitHub Actions Workflow
**File**: `.github/workflows/system-orchestration-report.yml`

**Features**:
- ⏰ **Scheduled Execution**: Runs automatically every 12 hours (00:00 UTC and 12:00 UTC)
- 🖱️ **Manual Trigger**: Can be executed on-demand from GitHub Actions UI
- 📊 **Status Generation**: Creates JSON with real-time system status
- 💾 **Auto-Commit**: Commits status updates with Agent 70 identity
- 📱 **Telegram Alerts**: Sends notifications to configured Telegram chat

### 2. Dashboard Files
**Location**: `public/dashboard/`

**Files**:
- `apiStatus.json` - Current system status (updated by workflow)
- `README.md` - Comprehensive documentation

## 🔧 Configuration

### Required GitHub Secrets

The workflow requires two secrets to be configured in GitHub repository settings:

1. **TELEGRAM_BOT_TOKEN**
   - Your Telegram bot authentication token
   - Get from @BotFather in Telegram
   - Used for sending status notifications

2. **TELEGRAM_CHAT_ID**
   - The chat ID where notifications will be sent
   - Get from your Telegram bot or chat
   - Used to target the correct conversation

### How to Configure Secrets

1. Go to: `https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions`
2. Click **"New repository secret"**
3. Add `TELEGRAM_BOT_TOKEN` with your bot token
4. Add `TELEGRAM_CHAT_ID` with your chat ID
5. Secrets are automatically available to workflows

## 📊 Status JSON Structure

The `apiStatus.json` file contains:

```json
{
  "timestamp": "2025-10-15T00:00:00Z",
  "Legal": "✅ Up to date (EPCT_MASTER_2025.pdf)",
  "Infra": "✅ Stable (Vercel + GitHub OK)",
  "CI_CD": "✅ Build OK (abc1234)",
  "Visual": "✅ Hero + Pau Live"
}
```

### Fields Explained

- **timestamp**: ISO 8601 UTC timestamp of last update
- **Legal**: Status of legal documentation
- **Infra**: Infrastructure health (Vercel + GitHub)
- **CI_CD**: Build status with current commit hash
- **Visual**: UI components availability

## 🚀 How to Use

### Automatic Execution

The workflow runs automatically:
- **Every 12 hours** at 00:00 UTC and 12:00 UTC
- No manual intervention required
- Commits are pushed as "Agent 70"

### Manual Execution

To trigger manually:

1. Go to **Actions** tab in GitHub
2. Select **"EPIC Monitor – System Orchestration"**
3. Click **"Run workflow"**
4. Select branch (usually `main`)
5. Click **"Run workflow"** button

### Viewing Status

**On GitHub:**
- Check `public/dashboard/apiStatus.json` in repository
- View workflow runs in Actions tab

**On Deployed Site:**
- Access at: `https://yoursite.com/dashboard/apiStatus.json`
- Status is automatically deployed with each build

**In Application:**
```javascript
fetch('/dashboard/apiStatus.json')
  .then(res => res.json())
  .then(status => console.log(status));
```

## 📱 Telegram Notifications

When the workflow runs, you'll receive a message like:

```
🪶 EPIC Monitor Updated
Legal✅ Infra✅ CI/CD✅ Visual✅
Wed Oct 15 00:00:00 UTC 2025
```

## 🔍 Monitoring & Debugging

### Check Workflow Status

1. Go to **Actions** tab
2. Select **"EPIC Monitor – System Orchestration"**
3. View recent runs and their logs

### Common Issues

**❌ Workflow fails to commit:**
- Check that `permissions: contents: write` is set
- Verify branch protection rules allow workflow commits

**❌ Telegram notification not sent:**
- Verify `TELEGRAM_BOT_TOKEN` is correct
- Check `TELEGRAM_CHAT_ID` is valid
- Ensure bot has permission to send messages to chat

**❌ JSON not updated:**
- Check workflow execution logs
- Verify file path is `public/dashboard/apiStatus.json`
- Ensure git identity is configured correctly

## 📂 File Locations

```
TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/
├── .github/
│   └── workflows/
│       └── system-orchestration-report.yml  # Workflow definition
└── public/
    └── dashboard/
        ├── apiStatus.json                   # Status data (auto-updated)
        └── README.md                        # Documentation
```

## 🔄 Update Schedule

| Time (UTC) | Action |
|------------|--------|
| 00:00 | Workflow runs automatically |
| 12:00 | Workflow runs automatically |
| Any time | Manual trigger available |

## 📊 Workflow Execution Flow

```
1. Checkout repository
   ↓
2. Generate status JSON with current data
   ↓
3. Configure git identity (Agent 70)
   ↓
4. Add changed files to git
   ↓
5. Commit if changes detected
   ↓
6. Push to repository
   ↓
7. Send Telegram notification
```

## 🎯 Benefits

- ✅ **Automated Monitoring**: No manual status updates needed
- ✅ **Real-time Data**: Always current commit hash and timestamp
- ✅ **Transparency**: Status visible in repository and on live site
- ✅ **Notifications**: Instant alerts via Telegram
- ✅ **Version Control**: All status changes tracked in git history
- ✅ **Zero Maintenance**: Runs indefinitely without intervention

## 🔐 Security Notes

- Workflow uses repository's default `GITHUB_TOKEN` for git operations
- Telegram secrets are securely stored in GitHub Secrets
- No sensitive data exposed in status JSON
- Commits are attributed to Agent 70 (deploy@tryonyou.app)

## 📞 Support

For issues or questions:
- **GitHub Issues**: Report problems in repository issues
- **Email**: deploy@tryonyou.app
- **Workflow Logs**: Check Actions tab for detailed execution logs

## 📝 Maintenance

The system is designed to be maintenance-free:
- ✅ Status updates automatically
- ✅ No external dependencies
- ✅ No database required
- ✅ Simple JSON file storage
- ✅ Deployed with every build

To modify status fields, edit the workflow file at:
`.github/workflows/system-orchestration-report.yml`

## 🎉 Success Criteria

The implementation is successful when:
- ✅ Workflow runs every 12 hours without errors
- ✅ `apiStatus.json` is updated with current data
- ✅ Telegram notifications are received
- ✅ Status file is accessible on deployed site
- ✅ Commit history shows regular Agent 70 updates

---

**Implementation Date**: October 2025  
**Version**: 1.0  
**Status**: Production Ready ✅  
**Implemented By**: GitHub Copilot (@copilot)
