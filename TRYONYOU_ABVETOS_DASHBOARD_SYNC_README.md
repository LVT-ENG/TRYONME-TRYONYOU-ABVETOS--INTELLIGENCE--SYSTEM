# TRYONYOU_ABVETOS_DASHBOARD_SYNC

🤖 **Automated Dashboard Deployment System for ABVETOS Intelligence**

## 📋 Overview

This system provides automated build, deployment, and notification functionality for the ABVETOS Dashboard, integrated with the TRYONYOU Intelligence System.

## 🏗️ Structure

```
TRYONYOU_ABVETOS_DASHBOARD_SYNC/
├── src/dashboard/abvetos-dashboard/
│   ├── Dashboard.jsx              # Main dashboard component
│   ├── components/
│   │   ├── MetricsCard.jsx       # System metrics display
│   │   ├── DeployList.jsx        # Deployment history
│   │   └── GitHubActionsStatus.jsx # Workflow status
│   ├── styles/
│   │   └── dashboard.css         # Dashboard styling
│   └── index.js                  # Entry point
│
├── .github/workflows/
│   └── dashboard-sync.yml        # Automated build + deploy + notifications
│
├── scripts/
│   └── deploy_abvetos_dashboard.sh  # Direct execution script
│
├── .env.example                  # Environment configuration template
└── README.md                     # This file
```

## 🚀 Features

### 1. Automatic Detection
- ✅ Detects if running inside TRYONYOU_MASTER
- ✅ Validates repository structure
- ✅ Verifies git remote configuration
- ✅ Prevents execution in wrong environments

### 2. Build Process
- ✅ Runs `vite build` for optimized production build
- ✅ Copies dashboard to `dist/dashboard/`
- ✅ Validates build output
- ✅ Provides detailed build summary

### 3. Deployment
- ✅ Syncs with `tryonyou.app/dashboard/abvetos-dashboard/`
- ✅ Vercel integration for seamless deployment
- ✅ Automatic cache invalidation
- ✅ Zero-downtime updates

### 4. Notifications
- ✅ Desktop notifications via Telegram
- ✅ Mobile notifications with inline buttons
- ✅ Sends to @abvet_deploy_bot
- ✅ Includes deployment status, URL, and metadata

## 🔧 Installation

### Prerequisites

- Node.js 22.x or higher
- npm or pnpm
- Git
- Vercel account (for deployment)
- Telegram bot token (for notifications)

### Setup Steps

1. **Clone the repository** (if not already in TRYONYOU_MASTER):
```bash
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. **Setup GitHub Secrets** (for automated deployment):
   - Go to Repository Settings → Secrets and Variables → Actions
   - Add the following secrets:
     - `VERCEL_TOKEN` - Your Vercel deployment token
     - `VERCEL_ORG_ID` - Your Vercel organization ID
     - `VERCEL_PROJECT_ID` - Your Vercel project ID
     - `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
     - `TELEGRAM_CHAT_ID` - Your Telegram chat ID
     - `VITE_DASHBOARD_PASSWORD` - Dashboard access password

5. **Setup Telegram Bot**:
```bash
# Talk to @BotFather on Telegram
/newbot
# Follow the prompts to create @abvet_deploy_bot
# Copy the bot token to your .env file

# Get your chat ID
# Message your bot, then visit:
# https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

## 📖 Usage

### Method 1: GitHub Actions (Recommended)

The dashboard automatically builds and deploys when you push changes:

```bash
# Make changes to the dashboard
vim src/dashboard/abvetos-dashboard/Dashboard.jsx

# Commit and push
git add .
git commit -m "Update ABVETOS dashboard"
git push origin main
```

The workflow will:
1. ✅ Build the dashboard
2. ✅ Deploy to Vercel
3. ✅ Send notifications to Telegram

### Method 2: Direct Script Execution

Run the deploy script directly from Deploy Express:

```bash
./scripts/deploy_abvetos_dashboard.sh
```

This will:
1. ✅ Detect TRYONYOU_MASTER environment
2. ✅ Build the dashboard with Vite
3. ✅ Prepare for deployment
4. ✅ Show next steps

### Method 3: Manual Build

For local development and testing:

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🔐 Environment Variables

### Required Variables

```bash
# Vercel (for deployment)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here

# Telegram (for notifications)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here

# Dashboard Authentication
VITE_DASHBOARD_PASSWORD=ABVETOS2025
```

### Optional Variables

```bash
# Dashboard Configuration
DASHBOARD_SYNC_ENABLED=true
DASHBOARD_DEPLOY_URL=https://tryonyou.app/dashboard/abvetos-dashboard/

# Application Environment
NODE_ENV=production
VITE_ENV=production
```

## 📊 Dashboard Features

### System Metrics
- CPU Usage
- Memory Consumption
- Request Rate
- System Uptime

### Deployment History
- Recent deployments
- Status indicators
- Commit information
- Quick links to deployments

### GitHub Actions Status
- Workflow status
- Run duration
- Branch information
- Direct links to GitHub

## 🔔 Notifications

### Desktop Notification Format
```
🤖 ABVETOS Dashboard Sync

✅ Status: Deployment Successful
🌐 URL: https://tryonyou.app/dashboard/abvetos-dashboard/
📦 Commit: a1b2c3d
💬 Message: Update dashboard components
🌿 Branch: main
👤 Author: LVT-ENG
⏰ Time: 2025-10-20 12:00:00 UTC

📊 Dashboard synced with TRYONYOU_MASTER
🔔 Notification sent to @abvet_deploy_bot
```

### Mobile Notification
```
📱 ABVETOS Dashboard deployed!

🔗 View Dashboard →
[Open Dashboard Button]
```

## 🛠️ Troubleshooting

### Dashboard not building
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Not inside TRYONYOU_MASTER error
```bash
# Verify you're in the correct directory
pwd
# Should contain: TRYONYOU_MASTER or TRYONME-TRYONYOU-ABVETOS

# Verify git remote
git remote -v
# Should show: TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### Telegram notifications not working
```bash
# Test your bot token
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"

# Test sending a message
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
  -d chat_id=<YOUR_CHAT_ID> \
  -d text="Test message"
```

### Deployment fails
```bash
# Check Vercel configuration
vercel whoami
vercel --version

# Re-login if needed
vercel login
```

## 📝 Development Workflow

1. **Local Development**:
```bash
npm run dev
# Dashboard runs on http://localhost:3000
```

2. **Make Changes**:
   - Edit components in `src/dashboard/abvetos-dashboard/`
   - Update styles in `src/dashboard/abvetos-dashboard/styles/`

3. **Test Build**:
```bash
npm run build
npm run preview
```

4. **Deploy**:
```bash
git add .
git commit -m "Your message"
git push origin main
# Automatic deployment via GitHub Actions
```

## 🔗 Related Documentation

- [Main README](../README.md) - TRYONYOU project overview
- [Deployment Guide](../DEPLOYMENT.md) - General deployment instructions
- [Agents Documentation](../docs/agents/README.md) - Intelligence agents system

## 📞 Support

For issues, questions, or feature requests:
- **GitHub Issues**: [Create an issue](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)
- **Email**: contact@tryonyou.app

## 📜 License

Copyright © 2025 TRYONYOU. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or use is strictly prohibited.

---

**Built with ❤️ for TRYONYOU – ABVETOS Intelligence System**
