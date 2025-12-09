# GitHub Actions Workflow - TRYONYOU Production Deploy Pipeline

## Overview

This GitHub Actions workflow implements an automatic CI/CD pipeline for TRYONYOU that triggers on every push to the `main` branch. It performs a clean build, deploys to Vercel Production, and sends notifications with screenshots to Telegram.

## Workflow File

**Location:** `.github/workflows/deploy-production.yml`

## Features

✅ **Automatic Trigger** - Runs on push to `main` branch  
✅ **Manual Trigger** - Can be run manually via GitHub Actions UI  
✅ **Clean Build** - Removes old dependencies and performs fresh install  
✅ **Vite Build** - Builds the project using Vite  
✅ **Vercel Deployment** - Deploys to Vercel Production environment  
✅ **Screenshot Capture** - Takes desktop (1920x1080) and mobile (375x812) screenshots  
✅ **Telegram Notifications** - Sends deployment status with screenshots to @abvet_deploy_bot  
✅ **Artifact Storage** - Stores screenshots for 30 days in GitHub Actions artifacts

## Pipeline Steps

1. **Checkout Repository** - Fetches the latest code
2. **Setup Node.js** - Installs Node.js 20.x
3. **Clean Dependencies** - Removes `node_modules` and `package-lock.json`
4. **Fresh Install** - Runs `npm install` with clean state
5. **Build Project** - Executes `npm run build` with Vite
6. **Install Vercel CLI** - Installs Vercel CLI globally
7. **Pull Vercel Environment** - Fetches Vercel project configuration
8. **Deploy to Production** - Deploys built assets to Vercel Production
9. **Wait for Deployment** - Waits 30 seconds for deployment to stabilize
10. **Install Puppeteer** - Installs Puppeteer for screenshot capture
11. **Capture Desktop Screenshot** - Takes full-page screenshot at 1920x1080
12. **Capture Mobile Screenshot** - Takes full-page screenshot at 375x812 (iPhone X)
13. **Send Telegram Notification** - Sends status message with screenshots
14. **Upload Artifacts** - Stores screenshots in GitHub Actions

## Required Secrets

Configure the following secrets in your GitHub repository:

### Navigate to: `Settings > Secrets and variables > Actions > New repository secret`

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API token | Create bot via [@BotFather](https://t.me/BotFather) and get token |
| `TELEGRAM_CHAT_ID` | Chat ID for @abvet_deploy_bot | Message [@userinfobot](https://t.me/userinfobot) to get your chat ID |
| `VERCEL_TOKEN` | Vercel authentication token | [Vercel Account Settings > Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel organization/team ID | Found in `.vercel/project.json` after running `vercel link` locally |
| `VERCEL_PROJECT_ID` | Vercel project ID | Found in `.vercel/project.json` after running `vercel link` locally |

### Getting Vercel IDs

Run these commands locally in your project:

```bash
# Install Vercel CLI
npm install -g vercel

# Link your project (follow prompts)
vercel link

# View the generated IDs
cat .vercel/project.json
```

The output will show:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

### Getting Telegram Bot Token & Chat ID

1. **Create Bot:**
   - Message [@BotFather](https://t.me/BotFather) on Telegram
   - Send `/newbot` and follow instructions
   - Copy the API token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **Get Chat ID:**
   - Message [@userinfobot](https://t.me/userinfobot) on Telegram
   - It will reply with your user ID
   - Use this as `TELEGRAM_CHAT_ID`

3. **Start your bot:**
   - Find your bot in Telegram (search for the username you created)
   - Send `/start` to activate it

## Manual Trigger

You can manually trigger the workflow:

1. Go to **Actions** tab in GitHub
2. Select **TRYONYOU Production Deploy Pipeline**
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

## Notification Example

The Telegram notification includes:

```
🚀 TRYONYOU DEPLOYMENT SUCCESSFUL ✅

Environment: Production
URL: https://tryonyou.app
Branch: main
Commit: abc1234
Author: John Doe
Message: Add new feature

Build Status: success
Timestamp: 2025-12-09 18:30:45 UTC

DeployExpress Pipeline by ABVET
```

Followed by:
- 🖥️ Desktop screenshot (1920x1080)
- 📱 Mobile screenshot (375x812 - iPhone X)

## Troubleshooting

### Workflow Fails to Deploy

- **Check Vercel Secrets:** Ensure `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are set correctly
- **Check Build:** Review the build step logs for errors
- **Check Node Version:** Ensure Node.js 20.x is compatible with your dependencies

### Screenshots Not Generated

- **Check Deployment URL:** Ensure the deployment URL is accessible
- **Check Timeout:** The workflow waits 30 seconds; increase if needed
- **Check Puppeteer:** Review Puppeteer logs for errors

### Telegram Notifications Not Received

- **Check Bot Token:** Ensure `TELEGRAM_BOT_TOKEN` is valid
- **Check Chat ID:** Ensure `TELEGRAM_CHAT_ID` is correct
- **Start Bot:** Make sure you've sent `/start` to your bot
- **Check Bot Permissions:** Bot must have permission to send messages and photos

### Build Fails

- **Check Dependencies:** Review `package.json` for incompatible versions
- **Check Node Version:** Ensure compatibility with Node.js 20.x
- **Check Build Command:** Verify `npm run build` works locally

## Monitoring

- **GitHub Actions Tab:** View all workflow runs and their status
- **Telegram:** Real-time notifications for each deployment
- **Artifacts:** Download screenshots from GitHub Actions artifacts (30-day retention)

## Environment Variables

All sensitive data is stored as GitHub Secrets. The workflow uses:

```yaml
env:
  NODE_VERSION: '20.x'
  TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
  TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Security Notes

⚠️ **Never commit secrets to the repository**  
⚠️ **Always use GitHub Secrets for sensitive data**  
⚠️ **Rotate tokens periodically for security**  
⚠️ **Limit Vercel token scope to necessary permissions**

## Workflow Badge

Add this badge to your README to show deployment status:

```markdown
![Deploy Status](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions/workflows/deploy-production.yml/badge.svg)
```

## Support

For issues or questions about the deployment pipeline:

1. Check workflow logs in GitHub Actions
2. Review this README for configuration steps
3. Contact ABVET team for DeployExpress support

---

**Status:** ✅ READY FOR IMPLEMENTATION  
**Assigned to:** Developer-in-charge  
**Approved by:** Agent 70  
**Issue:** #1187 - Pipeline automático (build + deploy)
