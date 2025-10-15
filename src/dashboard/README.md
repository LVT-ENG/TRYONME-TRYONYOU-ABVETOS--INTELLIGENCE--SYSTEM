# EPIC Monitor – System Orchestration Dashboard

## Overview

This directory contains the system orchestration monitoring dashboard for TRYONYOU. The dashboard tracks the health and status of various system components.

## Files

### `apiStatus.json`

This file contains the current system status and is automatically updated by the GitHub Actions workflow every 12 hours.

**Structure:**
```json
{
  "timestamp": "ISO 8601 timestamp",
  "Legal": "Status of legal documentation",
  "Infra": "Infrastructure status (Vercel + GitHub)",
  "CI_CD": "Build status with commit hash",
  "Visual": "UI components status"
}
```

## GitHub Actions Workflow

The system orchestration is automated via `.github/workflows/system-orchestration-report.yml`.

### Features

- **Scheduled Updates**: Runs automatically every 12 hours
- **Manual Trigger**: Can be triggered manually via GitHub Actions UI
- **Automatic Status Generation**: Creates JSON with current system status
- **Git Integration**: Commits and pushes updates automatically
- **Telegram Notifications**: Sends alerts to configured Telegram chat

### How It Works

1. **Checkout**: Pulls the latest code from the repository
2. **Generate Status**: Creates/updates `apiStatus.json` with:
   - Current UTC timestamp
   - Legal documentation status
   - Infrastructure health
   - Latest CI/CD build info (with commit hash)
   - Visual components status
3. **Commit & Push**: Commits the updated status file to the repository
4. **Notify**: Sends a Telegram message with status summary

### Required Secrets

The workflow requires the following GitHub Secrets to be configured:

- `TELEGRAM_BOT_TOKEN`: Bot token for Telegram notifications
- `TELEGRAM_CHAT_ID`: Chat ID where notifications will be sent

### Manual Execution

To manually trigger the workflow:

1. Go to **Actions** tab in GitHub
2. Select **EPIC Monitor – System Orchestration**
3. Click **Run workflow**
4. Select the branch (usually `main`)
5. Click **Run workflow**

## Usage in Application

The `apiStatus.json` file can be consumed by the application to display real-time system status:

```javascript
// Example: Fetch and display system status
fetch('/dashboard/apiStatus.json')
  .then(response => response.json())
  .then(status => {
    console.log('System Status:', status);
    // Display status in UI
  });
```

## Status Indicators

- ✅ **Green Check**: Component is healthy/up-to-date
- ⚠️ **Warning**: Component needs attention
- ❌ **Error**: Component is down or has issues

## Maintenance

The workflow is fully automated. However, you may need to:

1. Update status messages in the workflow file if components change
2. Verify GitHub Secrets are properly configured
3. Check Telegram notifications are being received

## Monitoring Schedule

- **Production**: Every 12 hours (00:00 UTC and 12:00 UTC)
- **On-demand**: Via GitHub Actions manual trigger

## Support

For issues or questions about the monitoring system:

- Check GitHub Actions logs for workflow runs
- Verify Telegram bot configuration
- Contact: deploy@tryonyou.app

---

**Last Updated**: 2025-10-15  
**Maintained By**: Agent 70  
**Part Of**: TRYONYOU Intelligence System
