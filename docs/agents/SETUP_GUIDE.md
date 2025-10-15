# 🚀 TRYONYOU Agents Setup Guide

This guide will help you configure and activate all 24/7 intelligent agents for the TRYONYOU platform.

## Prerequisites

- Admin access to the GitHub repository
- Vercel account with project configured
- Telegram bot (optional but recommended for notifications)

## Step 1: Verify Workflow Files

All agent workflows are located in `.github/workflows/`:

```bash
# Check that all workflow files exist
ls -la .github/workflows/

# Expected files:
# - orchestrator-agent.yml (Agent 70)
# - deploy.yml (Agent 22)
# - github-agent.yml (Agent 20)
# - brand-guardian.yml (Agent 12)
# - document-locker.yml (Agent 46)
```

## Step 2: Configure GitHub Secrets

### Required Secrets

Go to: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions

#### 🔐 Vercel Secrets (Required for Agent 22)

1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create a new token with full access
   - Add to GitHub Secrets

2. **VERCEL_ORG_ID**
   - Found in Vercel project settings
   - Or run: `vercel whoami` (shows your org ID)
   - Add to GitHub Secrets

3. **VERCEL_PROJECT_ID**
   - Found in Vercel project settings → General
   - Or in `.vercel/project.json` after linking
   - Add to GitHub Secrets

#### 📱 Telegram Secrets (Optional but Recommended)

4. **TELEGRAM_BOT_TOKEN**
   - Create bot via @BotFather on Telegram
   - Send `/newbot` and follow instructions
   - Copy the token provided
   - Add to GitHub Secrets

5. **TELEGRAM_CHAT_ID**
   - Send a message to your bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat.id` in the response
   - Add to GitHub Secrets

## Step 3: Enable GitHub Actions

1. Go to: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/actions

2. Under "Actions permissions", select:
   - ✅ Allow all actions and reusable workflows

3. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

## Step 4: Test Agent Activation

### Test Agent 70 (Orchestrator)

1. Go to: Actions → Agent 70 - Orquestador General
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"
5. Wait for completion (~1-2 minutes)
6. Check logs for success messages

### Test Agent 22 (Deploy Operator)

```bash
# Make a small change and push to main
git add .
git commit -m "test: Trigger Agent 22 deployment"
git push origin main

# Or trigger manually from GitHub Actions
```

Expected behavior:
- Build completes successfully
- Deploy to Vercel
- Screenshots captured (desktop + mobile)
- Telegram notification sent (if configured)

### Test Agent 20 (GitHub Commit Agent)

1. Go to: Actions → Agent 20 - GitHub Commit Agent
2. Click "Run workflow"
3. Review the generated repository analysis report

### Test Agent 12 (Brand Guardian)

```bash
# Trigger by modifying a CSS file
echo "/* test */" >> src/styles/App.css
git add .
git commit -m "test: Trigger Brand Guardian"
git push origin main
```

Expected behavior:
- Color palette verification
- Typography check
- Visual asset inventory
- Brand coherence score calculation

### Test Agent 46 (Document Locker)

```bash
# Trigger by modifying documentation
echo "# Test" >> docs/test.md
git add .
git commit -m "test: Trigger Document Locker"
git push origin main
```

Expected behavior:
- Legal documentation verification
- Documentation quality metrics
- Security scan for sensitive information

## Step 5: Verify Daily Schedules

The agents will automatically run on schedule:

| Time (UTC) | Agent | Frequency |
|------------|-------|-----------|
| 08:00 | Agent 20 | Daily |
| 09:00 | Agent 70 | Daily (Priority Report) |
| 10:00 | Agent 12 | Daily |
| 11:00 | Agent 46 | Daily |
| Every hour | Agent 70 | Hourly monitoring |

### Check Scheduled Runs

1. Go to: Actions tab
2. Select any agent workflow
3. Check "Scheduled" filter to see upcoming runs

## Step 6: Configure Telegram Bot (Detailed)

### Creating a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Choose a name: `TRYONYOU Deploy Bot`
4. Choose a username: `tryonyou_deploy_bot` (or similar)
5. Save the token provided

### Getting Your Chat ID

**Method 1: Using the bot**
```bash
# Send a message to your bot
# Then run:
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

**Method 2: Using a Telegram client**
1. Add the bot to a channel or group
2. Send a message to the channel/group
3. Use the API endpoint above to get the chat ID

### Setting Up Channel/Group

For team notifications:
1. Create a Telegram channel or group
2. Add your bot as an admin
3. Get the channel/group ID (it will be negative, like `-1001234567890`)

## Step 7: Monitor Agent Activity

### View Agent Status

```bash
# Check current status
cat docs/agents/status.md

# View recent reports
ls -la docs/agents/reports/
```

### Check Workflow Runs

1. Go to: Actions tab
2. View recent workflow runs
3. Click on any run to see detailed logs

### Monitor Telegram Notifications

If configured, you'll receive:
- Daily orchestrator report at 09:00 UTC
- Deployment notifications with screenshots
- Repository analysis summaries
- Brand and documentation reports

## Step 8: Troubleshooting

### Agent Not Running

**Issue:** Workflow doesn't trigger
**Solution:**
1. Check GitHub Actions are enabled
2. Verify workflow permissions
3. Check schedule syntax in YAML files

### Telegram Notifications Not Sending

**Issue:** No Telegram messages received
**Solution:**
1. Verify `TELEGRAM_BOT_TOKEN` is correct
2. Verify `TELEGRAM_CHAT_ID` is correct
3. Ensure bot has permission to send messages
4. Check workflow logs for error messages

### Deployment Fails

**Issue:** Agent 22 deployment fails
**Solution:**
1. Verify Vercel secrets are correct
2. Check build logs in workflow
3. Ensure Vercel project is properly linked
4. Verify Node.js version compatibility

### Screenshots Not Captured

**Issue:** Puppeteer fails to capture screenshots
**Solution:**
1. Check Puppeteer installation in workflow logs
2. Verify site is accessible (not blocked)
3. Increase timeout if site loads slowly
4. Check for JavaScript errors in console

## Step 9: Customization

### Adjust Schedule Times

Edit workflow files to change schedule:

```yaml
# Example: Change daily report time to 10:00 UTC
on:
  schedule:
    - cron: '0 10 * * *'  # Changed from 09:00
```

### Customize Notification Messages

Edit the Telegram notification sections in workflow files:

```bash
MESSAGE="🚀 *Custom Message*
Your custom content here"
```

### Add New Agents

1. Create new workflow file in `.github/workflows/`
2. Follow existing agent pattern
3. Add to agent status tracking
4. Update documentation

## Step 10: Best Practices

### ✅ Do's

- Monitor agent status regularly
- Review generated reports
- Keep secrets secure and rotated
- Test changes in feature branches first
- Keep documentation updated

### ❌ Don'ts

- Don't commit secrets to the repository
- Don't disable agents without documentation
- Don't ignore agent warnings
- Don't modify agent reports manually
- Don't skip testing after configuration changes

## Support & Resources

### Documentation
- [Agents Overview](README.md)
- [Agent Status](status.md)
- [Main Documentation](../../README.md)

### Links
- **Repository:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- **Production:** https://tryonyou.app
- **Vercel Dashboard:** https://vercel.com/dashboard

### Getting Help

If you encounter issues:
1. Check workflow logs in GitHub Actions
2. Review agent status in `docs/agents/status.md`
3. Consult this setup guide
4. Check GitHub Actions documentation

---

**Setup Version:** 1.0  
**Last Updated:** 2025-10-15  
**Status:** Ready for deployment  
**Next Steps:** Configure secrets and test each agent
