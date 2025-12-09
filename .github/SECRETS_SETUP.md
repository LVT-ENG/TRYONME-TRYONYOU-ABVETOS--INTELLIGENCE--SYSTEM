# Quick Setup Guide - GitHub Actions Secrets

## Step-by-Step Configuration

### 1. Navigate to Repository Secrets

1. Go to your GitHub repository: `LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM`
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**

---

### 2. Create Vercel Secrets

#### A. Get Vercel Token

1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Name it: `TRYONYOU_GITHUB_ACTIONS`
4. Select scope: **Full Account**
5. Click **Create**
6. **Copy the token** (you won't see it again!)

**Add to GitHub:**
- Secret name: `VERCEL_TOKEN`
- Value: (paste the token)

#### B. Get Vercel Organization & Project IDs

Run these commands in your local project directory:

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Link your project
vercel link
```

Follow the prompts:
- Set up and link: **Yes**
- Scope: (select your team/account)
- Link to existing project: **Yes**
- Project name: (select TRYONYOU project)

Then view the IDs:

```bash
cat .vercel/project.json
```

Output example:
```json
{
  "orgId": "team_abc123xyz",
  "projectId": "prj_def456uvw"
}
```

**Add to GitHub:**

Secret 1:
- Secret name: `VERCEL_ORG_ID`
- Value: `team_abc123xyz` (your orgId)

Secret 2:
- Secret name: `VERCEL_PROJECT_ID`
- Value: `prj_def456uvw` (your projectId)

---

### 3. Create Telegram Bot Secrets

#### A. Create Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send: `/newbot`
3. Follow prompts:
   - Bot name: `ABVET Deploy Bot`
   - Bot username: `abvet_deploy_bot` (must end with "bot")
4. **Copy the API token** (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

**Add to GitHub:**
- Secret name: `TELEGRAM_BOT_TOKEN`
- Value: (paste the token)

#### B. Get Your Chat ID

1. Search for [@userinfobot](https://t.me/userinfobot) in Telegram
2. Send any message to it
3. It will reply with your ID (example: `123456789`)

**Add to GitHub:**
- Secret name: `TELEGRAM_CHAT_ID`
- Value: `123456789` (your ID)

#### C. Activate Your Bot

1. Search for your bot in Telegram: `@abvet_deploy_bot`
2. Send: `/start`
3. You should see a welcome message or "Command not recognized" (either is fine)

---

### 4. Verify All Secrets

Go back to **Settings** → **Secrets and variables** → **Actions**

You should see 5 secrets:

✅ `TELEGRAM_BOT_TOKEN`  
✅ `TELEGRAM_CHAT_ID`  
✅ `VERCEL_TOKEN`  
✅ `VERCEL_ORG_ID`  
✅ `VERCEL_PROJECT_ID`

---

### 5. Test the Workflow

#### Option A: Push to Main

```bash
git add .
git commit -m "test: trigger deployment pipeline"
git push origin main
```

#### Option B: Manual Trigger

1. Go to **Actions** tab
2. Select **TRYONYOU Production Deploy Pipeline**
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

---

### 6. Monitor Deployment

1. **GitHub Actions:** Watch the workflow progress
2. **Telegram:** You'll receive a notification when complete
3. **Vercel:** Check your Vercel dashboard for deployment status

---

## Checklist

Before pushing to main, ensure:

- [ ] All 5 secrets are configured in GitHub
- [ ] Vercel project is linked locally (`.vercel/project.json` exists)
- [ ] Telegram bot is created and started
- [ ] You've tested locally with `npm install` and `npm run build`
- [ ] `.gitignore` includes `.vercel` (to avoid committing local Vercel config)

---

## Common Issues

### "Invalid Vercel token"
- Regenerate token in Vercel dashboard
- Ensure it has correct scope (Full Account)
- Update `VERCEL_TOKEN` secret in GitHub

### "Telegram notification not received"
- Verify bot token is correct
- Verify chat ID is correct
- Send `/start` to your bot in Telegram
- Check if bot is blocked

### "Build failed"
- Review GitHub Actions logs
- Test build locally: `npm install && npm run build`
- Check Node.js version compatibility

### "Screenshots not generated"
- Check if deployment URL is accessible
- Review Puppeteer step logs
- Ensure deployment has time to stabilize (30s wait)

---

## Security Best Practices

🔒 **Never share your tokens publicly**  
🔒 **Never commit secrets to Git**  
🔒 **Rotate tokens every 90 days**  
🔒 **Use minimum required permissions**  
🔒 **Keep this guide private**

---

**Status:** Ready for Setup  
**Estimated Time:** 10-15 minutes  
**Support:** Contact ABVET team for assistance
