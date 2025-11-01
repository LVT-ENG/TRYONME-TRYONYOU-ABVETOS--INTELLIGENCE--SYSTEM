# 🦚 FastSync - Express Auto-Deploy

## Overview

**FastSync** is an automated deployment system that synchronizes and deploys the TRYONYOU application every 10 minutes using GitHub Actions. This provides rapid continuous deployment with minimal latency between code changes and production updates.

## Features

- ⚡ **Fast Synchronization**: Runs every 10 minutes (`*/10 * * * *` cron schedule)
- 🚀 **Automated Deployment**: Automatically builds and deploys to Vercel
- 📱 **Telegram Notifications**: Real-time updates on deployment status
- 🔄 **Manual Trigger**: Can be triggered manually via GitHub Actions UI
- ✅ **Production Ready**: Builds with production environment settings

## How It Works

### Automated Schedule

The FastSync workflow is triggered automatically every 10 minutes through GitHub Actions scheduled workflows. The schedule is defined as:

```yaml
schedule:
  - cron: '*/10 * * * *'
```

### Deployment Pipeline

1. **Checkout**: Fetches the latest code from the repository
2. **Setup**: Configures Node.js 22 environment
3. **Install**: Installs project dependencies
4. **Build**: Builds the project for production
5. **Deploy**: Deploys to Vercel production environment
6. **Notify**: Sends success/failure notifications via Telegram

## Configuration

### Required GitHub Secrets

The following secrets must be configured in your GitHub repository settings:

- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `TELEGRAM_BOT_TOKEN`: Telegram bot token for notifications
- `TELEGRAM_CHAT_ID`: Telegram chat ID for receiving notifications

### Setting Up Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each required secret with its corresponding value

## Manual Triggering

You can manually trigger a FastSync deployment at any time:

1. Go to the **Actions** tab in your GitHub repository
2. Select **FastSync - Express Auto-Deploy** from the workflows list
3. Click **Run workflow**
4. Select the branch (typically `main`)
5. Click **Run workflow** button

## Monitoring

### GitHub Actions Logs

View detailed logs of each deployment:

1. Navigate to the **Actions** tab
2. Click on any **FastSync** workflow run
3. Expand the steps to view detailed logs

### Telegram Notifications

You'll receive Telegram notifications for:

- ✅ Successful deployments with commit hash and timestamp
- ❌ Failed deployments with error information

## Comparison with Other Deployment Methods

| Method | Frequency | Use Case |
|--------|-----------|----------|
| **FastSync** | Every 10 minutes | Rapid continuous deployment |
| Deploy Express | Manual/On-demand | Large file imports from iCloud |
| Standard CI/CD | On push/PR | Code review and testing |

## Benefits

- **Minimal Latency**: Changes reach production within 10 minutes
- **Automatic Recovery**: Failed deployments are retried in the next cycle
- **Zero Downtime**: Vercel handles rolling deployments
- **Visibility**: Telegram notifications keep you informed
- **Flexibility**: Manual trigger option for immediate deployments

## Troubleshooting

### Workflow Not Running

- Check that the workflow file exists at `.github/workflows/fast-sync.yml`
- Verify that scheduled workflows are enabled for your repository
- Ensure the repository is not archived or private without GitHub Actions access

### Deployment Failures

1. Check GitHub Actions logs for specific error messages
2. Verify all required secrets are properly configured
3. Ensure Vercel token has necessary permissions
4. Check build logs for compilation errors

### Telegram Notifications Not Received

- Verify `TELEGRAM_BOT_TOKEN` is correct
- Confirm `TELEGRAM_CHAT_ID` is accurate
- Ensure the bot is not blocked or removed from the chat
- Check that the bot has permission to send messages

## Related Documentation

- [Deploy Express README](DEPLOY_EXPRESS_README.md)
- [Deployment Instructions](DEPLOY_INSTRUCTIONS.md)
- [Vercel Domain Setup](VERCEL_DOMAIN_SETUP.md)
- [GitHub Secrets Setup](GITHUB_SECRETS_SETUP.md)

## Support

For issues or questions about FastSync:

1. Check the GitHub Actions logs
2. Review this documentation
3. Contact the ABVETOS system administrator
4. Create an issue in the repository

---

**Part of TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM System**

*Powered by GitHub Actions • Deployed on Vercel*
