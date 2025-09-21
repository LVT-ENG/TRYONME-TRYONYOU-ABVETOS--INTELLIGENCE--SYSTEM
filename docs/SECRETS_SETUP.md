# 🔐 Secrets Configuration Guide

## Quick Setup for Update from ZIPs Automation

Follow these steps to configure the GitHub secrets needed for the automated ZIP processing and deployment workflow.

### Step 1: Configure Vercel Secrets (Required)

1. **Get VERCEL_TOKEN**:
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it "GitHub Actions" or similar
   - Copy the token value

2. **Get VERCEL_PROJECT_ID**:
   - Go to your Vercel project dashboard
   - Click on your project
   - Go to Settings → General
   - Copy the "Project ID" value

3. **Get VERCEL_ORG_ID**:
   - In Vercel dashboard, go to your team/organization settings
   - Settings → General
   - Copy the "Team ID" value

### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add each secret:

```
Name: VERCEL_TOKEN
Value: [your_vercel_token]

Name: VERCEL_PROJECT_ID  
Value: [your_project_id]

Name: VERCEL_ORG_ID
Value: [your_org_id]
```

### Step 3: Configure Telegram Notifications (Optional)

1. **Create Telegram Bot**:
   - Message @BotFather on Telegram
   - Send `/newbot`
   - Follow instructions and save the token

2. **Get Chat ID**:
   - Add your bot to a chat/channel
   - Send a test message
   - Go to: `https://api.telegram.org/bot[YOUR_TOKEN]/getUpdates`
   - Find the `chat.id` value

3. **Add Telegram Secrets**:
```
Name: TELEGRAM_BOT_TOKEN
Value: [your_bot_token]

Name: TELEGRAM_CHAT_ID
Value: [your_chat_id]
```

### Step 4: Test the Setup

#### Method A: Upload a ZIP file
```bash
# Add any ZIP file to the repository root
git add your-file.zip
git commit -m "test: add ZIP file for automation"
git push origin main
```

#### Method B: Manual trigger
1. Go to **Actions** tab in GitHub
2. Select **"Update from ZIPs"**
3. Click **"Run workflow"**
4. Select branch and run

### 🔍 Verify Setup

After running the workflow, check:
- ✅ Actions tab shows successful execution
- ✅ Your Vercel project was deployed
- ✅ Telegram notification received (if configured)
- ✅ No ZIP content was extracted and committed

### 🚨 Troubleshooting

**"VERCEL_TOKEN not found"**
→ Make sure secret name is exactly `VERCEL_TOKEN`

**"Build failed"**  
→ Check that your package.json and dependencies are correct

**"No ZIP files found"**
→ Ensure ZIP files are in the repository root (not in subfolders)

**"Telegram notification failed"**
→ Verify bot token and chat ID are correct

### 📚 Need Help?

See the complete documentation: [docs/UPDATE_FROM_ZIPS.md](../docs/UPDATE_FROM_ZIPS.md)