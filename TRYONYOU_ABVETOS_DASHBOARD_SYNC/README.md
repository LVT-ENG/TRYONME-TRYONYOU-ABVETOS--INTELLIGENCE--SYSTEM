# TRYONYOU ABVETOS Dashboard Sync

Automated deployment system for the ABVETOS Dashboard with Express deployment, CI/CD integration, and Telegram notifications.

## 🏗️ Structure

```
TRYONYOU_ABVETOS_DASHBOARD_SYNC/
├── scripts/
│   └── deploy_abvetos_dashboard.sh       # Auto-executable Deploy Express script
├── .github/workflows/
│   ├── abvetos-dashboard-deploy.yml      # CI/CD + Telegram notifications
│   └── vercel-token-refresh.yml          # Daily token validation
├── apps/web/src/dashboard/abvetos-dashboard/
│   ├── Dashboard.jsx                     # Main dashboard component
│   ├── components/
│   │   ├── MetricsCard.jsx              # Metrics display cards
│   │   ├── DeployList.jsx               # Deployment history list
│   │   ├── GitHubActionsStatus.jsx      # GitHub Actions status
│   │   └── SystemHealthGraph.jsx        # System health visualization
│   ├── styles/dashboard.css             # Dashboard styles
│   └── index.js                          # Entry point
├── .env.example                          # Environment variables template
└── README.md                             # This file
```

## 🚀 Deploy Express Workflow

### How It Works

1. **Package Creation**
   - Create a ZIP file of your project with the latest changes
   - Name it with timestamp (e.g., `TRYONYOU_DEPLOY_EXPRESS_20251020.zip`)

2. **iCloud Inbox Drop**
   - Copy the ZIP directly to:
     ```
     /iCloudDrive/TRYONYOU_DEPLOY_EXPRESS_INBOX/
     ```

3. **Automatic Deployment**
   Deploy Express automatically:
   - Extracts the ZIP file
   - Runs `npm install && npm run build`
   - Deploys to Vercel: `vercel --prod`
   - Sends Telegram notification
   - Saves deployment record

4. **Notification**
   You receive a Telegram message:
   ```
   🚀 Dashboard ABVETOS actualizado correctamente en producción

   ✅ Status: Deployment Successful
   🌐 URL: https://tryonyou.app
   📦 Commit: abc123f
   💬 Message: Update ABVETOS Dashboard
   🌿 Branch: main
   👤 Author: LVT-ENG
   ⏰ Time: 2025-10-20 07:30:00 UTC

   🤖 TRYONYOU.APP - Sistema de Inteligencia Operativo 24/7
   ```

## 📋 Manual Deployment

To deploy manually using the script:

```bash
cd TRYONYOU_ABVETOS_DASHBOARD_SYNC
./scripts/deploy_abvetos_dashboard.sh
```

### Prerequisites

- Node.js 20+ installed
- Vercel CLI installed: `npm i -g vercel`
- Environment variables configured in `.env`

## ⚙️ GitHub Actions Workflows

### 1. ABVETOS Dashboard Deploy

**File:** `.github/workflows/abvetos-dashboard-deploy.yml`

**Triggers:**
- Push to `main` branch
- Changes in `src/dashboard/**` or `TRYONYOU_ABVETOS_DASHBOARD_SYNC/**`
- Manual trigger via `workflow_dispatch`

**Steps:**
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build application
5. Deploy to Vercel
6. Save deployment record
7. Send Telegram notification

### 2. Vercel Token Refresh

**File:** `.github/workflows/vercel-token-refresh.yml`

**Triggers:**
- Daily at 00:00 UTC (cron schedule)
- Manual trigger via `workflow_dispatch`

**Functions:**
- Validates Vercel token status
- Checks token expiration
- Sends Telegram alert if token is invalid/expired
- Creates GitHub issue if action required

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Vercel
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_project_id_here
VERCEL_ORG_ID=your_org_id_here

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here

# GitHub
GITHUB_TOKEN=your_github_token_here

# Dashboard
VITE_DASHBOARD_PASSWORD=ABVETOS2025

# Deploy Express
DEPLOY_EXPRESS_INBOX=/iCloudDrive/TRYONYOU_DEPLOY_EXPRESS_INBOX
```

### GitHub Secrets

Configure these secrets in your GitHub repository:

1. `VERCEL_TOKEN` - Vercel authentication token
2. `VERCEL_PROJECT_ID` - Vercel project ID
3. `VERCEL_ORG_ID` - Vercel organization ID
4. `TELEGRAM_BOT_TOKEN` - Telegram bot token
5. `TELEGRAM_CHAT_ID` - Telegram chat ID for notifications

## 📊 Dashboard Features

### Components

1. **MetricsCard**
   - Displays key deployment metrics
   - Shows trends and changes
   - Real-time updates

2. **DeployList**
   - Shows deployment history
   - Commit information
   - Deployment status and duration

3. **GitHubActionsStatus**
   - Monitors workflow runs
   - Shows success/failure status
   - Last run timestamps

4. **SystemHealthGraph**
   - System uptime tracking
   - Service health monitoring
   - Active services counter

## 🎨 Dashboard UI

The dashboard features:
- Modern dark theme with gradient accents
- Real-time data updates
- Responsive design for mobile/desktop
- Smooth animations and transitions
- Status indicators with color coding

### Color Scheme

- **Primary**: Purple gradient (#667eea → #764ba2)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Dark gradient (#0f0f1e → #1a1a2e)

## 📝 Deployment Records

Each deployment is logged with:
- Timestamp
- Commit hash (short and full)
- Branch name
- Author
- Commit message
- Deployment URL
- Status

Records are saved to:
- `logs/deployment_history.json` (aggregated)
- `logs/deploy_record_[commit].json` (individual)

## 🔍 Monitoring

### Daily Token Check

The system automatically:
- Validates Vercel token every day
- Sends alerts if token is invalid
- Creates GitHub issues for action items
- Reports successful validations

### Deployment Notifications

Every deployment triggers:
- Telegram message with deployment details
- GitHub Actions artifact upload
- Log file creation
- Deployment record save

## 🛠️ Development

### Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing Deploy Script

```bash
cd TRYONYOU_ABVETOS_DASHBOARD_SYNC/scripts
chmod +x deploy_abvetos_dashboard.sh
./deploy_abvetos_dashboard.sh
```

## 📦 Package for Deploy Express

To create a deployment package:

```bash
# Create ZIP with timestamp
zip -r "TRYONYOU_DEPLOY_EXPRESS_$(date +%Y%m%d_%H%M%S).zip" . \
  -x "*.git*" -x "*node_modules*" -x "*dist*"

# Copy to iCloud inbox
cp TRYONYOU_DEPLOY_EXPRESS_*.zip /iCloudDrive/TRYONYOU_DEPLOY_EXPRESS_INBOX/
```

## 🔐 Security

- Dashboard is password-protected (default: ABVETOS2025)
- Vercel tokens are validated daily
- Secrets stored in GitHub Secrets
- Environment variables never committed

## 🚨 Troubleshooting

### Deployment Fails

1. Check Vercel token validity
2. Verify environment variables
3. Check build logs in GitHub Actions
4. Review deployment records in `logs/`

### No Telegram Notifications

1. Verify `TELEGRAM_BOT_TOKEN` is set
2. Confirm `TELEGRAM_CHAT_ID` is correct
3. Check bot has access to chat
4. Review workflow logs

### Token Expired

1. Go to https://vercel.com/account/tokens
2. Generate new token
3. Update `VERCEL_TOKEN` in GitHub Secrets
4. Re-run deployment

## 📈 Metrics & Analytics

The dashboard tracks:
- Total deployments
- Success rate percentage
- Average deployment time
- Last deployment timestamp
- Active services count
- System uptime
- Response times

## 🤖 Automation Features

- Auto-deploy on push to main
- Daily token validation
- Automatic Telegram notifications
- Deployment record keeping
- Issue creation for failures
- Health monitoring

## 📄 License

Part of the TRYONYOU Intelligence System
© 2025 TRYONYOU.APP

## 🔗 Related Documentation

- [Main README](../../../README.md)
- [Deployment Guide](../../../DEPLOYMENT.md)
- [GitHub Secrets Setup](../../../GITHUB_SECRETS_SETUP.md)

---

**Sistema de Inteligencia Operativo 24/7** 🤖
