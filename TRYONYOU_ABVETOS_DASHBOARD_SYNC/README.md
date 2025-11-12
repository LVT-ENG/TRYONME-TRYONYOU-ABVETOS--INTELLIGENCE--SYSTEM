# 🤖 ABVETOS Dashboard - Quick Guide

Complete deployment package for the ABVETOS Intelligence System Dashboard with automated build, deploy, and notification pipeline.

## 📦 Package Structure

```
TRYONYOU_ABVETOS_DASHBOARD_SYNC/
├── apps/web/src/dashboard/abvetos-dashboard/
│   ├── Dashboard.jsx                 # Main dashboard component
│   ├── components/
│   │   ├── MetricsCard.jsx          # Metrics display card
│   │   ├── DeployList.jsx           # Deployment history list
│   │   ├── GitHubActionsStatus.jsx  # GitHub Actions monitor
│   │   └── SystemHealthGraph.jsx    # System health metrics
│   ├── styles/dashboard.css         # Dashboard styles
│   └── index.js                     # Entry point
├── scripts/
│   └── deploy_abvetos_dashboard.sh  # Auto-executable deploy script
├── .github/workflows/
│   ├── abvetos-dashboard-deploy.yml # Build+Deploy+Telegram workflow
│   └── vercel-token-refresh.yml     # Daily token validation
├── .env.example                      # Environment variables template
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ installed
- npm or pnpm package manager
- Vercel account with CLI installed
- Telegram bot (optional, for notifications)

### Installation

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables:**
   Edit `.env` and add your Vercel and Telegram credentials

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## ⚙️ Automated Deployment

### Method 1: Auto-Deploy via iCloud (macOS)

When you copy the ZIP package to:
```
~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX/
```

The system automatically triggers:
1. ✅ Cleanup of previous dashboard
2. ✅ `npm install && npm run build`
3. ✅ `vercel --prod`
4. ✅ Telegram notification to `@abvet_deploy_bot`
5. ✅ Desktop (1920x1080) screenshot
6. ✅ Mobile (375x812) screenshot

### Method 2: Manual Deploy Script

Run the auto-executable script:

```bash
./scripts/deploy_abvetos_dashboard.sh
```

This script performs the same automated steps as above.

### Method 3: GitHub Actions

Push changes to the `main` branch:

```bash
git add .
git commit -m "Update ABVETOS Dashboard"
git push origin main
```

The workflow automatically:
- Builds the dashboard
- Deploys to Vercel production
- Captures screenshots
- Sends Telegram notifications

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VERCEL_TOKEN` | Vercel authentication token | [Vercel Tokens](https://vercel.com/account/tokens) |
| `VERCEL_PROJECT_ID` | Your project ID | Run `vercel` in project directory |
| `VERCEL_ORG_ID` | Your team/org ID | Vercel team settings |

### Optional Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `TELEGRAM_BOT_TOKEN` | Bot token for notifications | [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Chat ID for messages | `/getUpdates` endpoint |
| `GITHUB_TOKEN` | For GitHub API access | GitHub Settings > Developer |

## 📊 Dashboard Features

### Metrics Cards
- **Total Deployments**: Track deployment count with trends
- **Active Agents**: Monitor active automation agents
- **Builds Today**: Daily build statistics
- **System Uptime**: Real-time uptime monitoring

### Components

1. **GitHub Actions Status**
   - Real-time workflow status
   - Build success/failure tracking
   - Direct links to workflow runs

2. **System Health Graph**
   - CPU usage monitoring
   - Memory usage tracking
   - Request per second metrics
   - Error rate monitoring

3. **Deploy List**
   - Recent deployment history
   - Branch and commit information
   - Deployment duration
   - Direct links to live URLs

## 🔄 Automated Workflows

### Dashboard Deploy Workflow

**Trigger:** Push to `main` branch or manual dispatch

**Steps:**
1. Checkout code
2. Setup Node.js 22
3. Install dependencies
4. Build dashboard
5. Deploy to Vercel
6. Capture screenshots
7. Send Telegram notification

**Files:** `.github/workflows/abvetos-dashboard-deploy.yml`

### Vercel Token Refresh Workflow

**Trigger:** Daily at 00:00 UTC or manual dispatch

**Steps:**
1. Check token validity
2. Fetch token info
3. Send status notification
4. Create issue if invalid

**Files:** `.github/workflows/vercel-token-refresh.yml`

## 📱 Telegram Notifications

The dashboard sends automated notifications to `@abvet_deploy_bot` including:

- ✅ Deployment status
- 🌐 Live URL
- 📦 Commit information
- 👤 Author details
- ⏰ Timestamp
- 🖥️ Desktop screenshot
- 📱 Mobile screenshot

### Setup Telegram Bot

1. **Create bot:**
   - Message [@BotFather](https://t.me/BotFather)
   - Send `/newbot`
   - Follow instructions

2. **Get bot token:**
   - Copy token from BotFather
   - Add to `TELEGRAM_BOT_TOKEN`

3. **Get chat ID:**
   ```bash
   curl https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
   ```
   - Start chat with your bot first
   - Copy chat ID from response
   - Add to `TELEGRAM_CHAT_ID`

## 🔧 Customization

### Update Dashboard Components

Edit components in `apps/web/src/dashboard/abvetos-dashboard/components/`

### Modify Styles

Edit `apps/web/src/dashboard/abvetos-dashboard/styles/dashboard.css`

### Change Deployment Script

Edit `scripts/deploy_abvetos_dashboard.sh`

### Adjust Workflows

Edit `.github/workflows/*.yml` files

## 📝 GitHub Secrets Setup

Add these secrets in repository settings:

1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add each variable:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

## 🐛 Troubleshooting

### Build Fails

```bash
# Clean build artifacts
rm -rf dist .vercel node_modules

# Reinstall dependencies
npm install

# Try building again
npm run build
```

### Vercel Deploy Fails

```bash
# Check Vercel login
vercel whoami

# Login if needed
vercel login

# Try deploying manually
vercel --prod
```

### Telegram Not Sending

1. Check bot token is correct
2. Verify chat ID is accurate
3. Ensure you've started chat with bot
4. Test with curl:
   ```bash
   curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
     -d chat_id="<CHAT_ID>" \
     -d text="Test message"
   ```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Vite Documentation](https://vitejs.dev/)

## 🎯 Next Steps

1. ✅ Configure environment variables
2. ✅ Set up GitHub secrets
3. ✅ Create Telegram bot
4. ✅ Deploy to Vercel
5. ✅ Test auto-deploy workflow

## 💡 Tips

- Use `npm run dev` for local development
- Test builds locally before pushing
- Monitor GitHub Actions for deployment status
- Check Telegram for deployment confirmations
- Review Vercel dashboard for deployment logs

## 📄 License

© 2025 TRYONYOU Intelligence System. All rights reserved.

---

**Built with ❤️ by the ABVETOS Team**

For support, contact the development team or check the main repository documentation.
