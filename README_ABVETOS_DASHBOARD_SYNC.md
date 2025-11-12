# TRYONYOU ABVETOS DASHBOARD SYNC

> 🚀 **Automatic deployment system for ABVETOS Dashboard**  
> Integrated with GitHub Actions, Vercel, and Telegram notifications

---

## 📁 Project Structure

```
TRYONYOU_ABVETOS_DASHBOARD_SYNC/
├── apps/web/src/dashboard/abvetos-dashboard/
│   ├── Dashboard.jsx                 # Main dashboard component
│   ├── components/
│   │   ├── MetricsCard.jsx          # System metrics display
│   │   ├── DeployList.jsx           # Deployment history
│   │   ├── GitHubActionsStatus.jsx  # Workflow status
│   │   └── SystemHealthGraph.jsx    # Health metrics grid
│   ├── styles/dashboard.css         # Dashboard styles
│   └── index.js                     # Entry point
│
├── .github/workflows/
│   ├── abvetos-dashboard-deploy.yml     # Build + Deploy + Telegram
│   └── vercel-token-refresh.yml         # Daily token refresh
│
├── scripts/deploy_abvetos_dashboard.sh  # Executable deployment script
├── .env.example                         # Environment variables template
│
├── public/assets/dashboard/
│   ├── hero-bg.png                  # Hero background image
│   └── dashboard_preview.jpg        # Dashboard preview screenshot
│
└── README.md                        # This file
```

---

## ⚙️ Automatic Features

### 1. **Repository Detection**
Automatically detects the structure of:
```
LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### 2. **Build Process**
- Uses `vite build` to generate optimized `dist/` directory
- Minifies assets and code
- Generates production-ready bundle

### 3. **Auto-Deploy**
Automatically deploys to:
```
👉 https://tryonyou.app/dashboard/abvetos-dashboard/
```

### 4. **Token Refresh**
- Refreshes Vercel token every 24 hours
- Validates token status
- Sends alerts on expiration

### 5. **Telegram Notifications**
Sends deployment notifications to `@abvet_deploy_bot` including:
- ✅ Deployment status
- 📦 Commit hash and message
- 🌿 Branch information
- 👤 Author details
- 🖥️ Desktop screenshot (1920x1080)
- 📱 Mobile screenshot (375x812)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22.x or higher
- **pnpm** 10.4.1 or higher
- **Git** with repository access
- **Vercel** account with project configured

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
   cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
   ```

2. **Install dependencies:**
   ```bash
   cd dashboard/abvetos-dashboard
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Test locally:**
   ```bash
   pnpm run dev
   # Open http://localhost:5173
   ```

5. **Build for production:**
   ```bash
   pnpm run build
   ```

---

## 📝 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_project_id_here
VERCEL_ORG_ID=your_vercel_org_id_here

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here

# Dashboard Configuration
VITE_GITHUB_REPO=LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
VITE_PRODUCTION_URL=https://tryonyou.app
VITE_DASHBOARD_URL=https://tryonyou.app/dashboard/abvetos-dashboard/
```

### GitHub Secrets

Configure the following secrets in your GitHub repository:

1. **VERCEL_TOKEN** - Your Vercel authentication token
2. **VERCEL_ORG_ID** - Your Vercel organization/team ID
3. **VERCEL_PROJECT_ID** - Your Vercel project ID
4. **TELEGRAM_BOT_TOKEN** - Bot token from @BotFather
5. **TELEGRAM_CHAT_ID** - Chat ID for notifications

---

## 🔧 Deployment Methods

### Method 1: Automatic (Git Push)

```bash
# Make changes to dashboard
cd apps/web/src/dashboard/abvetos-dashboard/

# Test locally
cd ../../../../dashboard/abvetos-dashboard
pnpm run dev

# Commit and push
git add .
git commit -m "Update dashboard"
git push origin main

# GitHub Actions will automatically:
# 1. Build the dashboard
# 2. Deploy to Vercel
# 3. Send Telegram notification with screenshots
```

### Method 2: Manual Script

```bash
# Automatic deployment (no confirmation)
./scripts/deploy_abvetos_dashboard.sh --auto

# Manual deployment (requires confirmation)
./scripts/deploy_abvetos_dashboard.sh --manual
```

### Method 3: TRYONYOU_DEPLOY_EXPRESS_INBOX

The deployment script is designed to work with the TRYONYOU_DEPLOY_EXPRESS_INBOX system:

1. **Auto Mode**: Drag ZIP → Automatic deployment
2. **Manual Mode**: Drag ZIP → Click to deploy

Configure mode in `deploy_abvetos_dashboard.sh`:
- `--auto` for automatic deployment
- `--manual` for confirmation-required deployment

---

## 📊 Dashboard Features

### System Metrics
- **CPU Usage**: Real-time processor utilization (15-45%)
- **Memory Usage**: RAM consumption tracking (40-60%)
- **Total Requests**: Request count with trends
- **System Uptime**: Time since last deployment

### GitHub Actions Integration
- **Live Status**: Real-time workflow status
- **Build History**: Last 5 workflow runs
- **Status Indicators**: Success, Failed, Cancelled, In Progress
- **Direct Links**: Quick access to GitHub

### Deployment Tracking
- **Recent Deployments**: Successful production deploys
- **Commit Info**: Branch, hash, and duration
- **Production Links**: Direct access to live site

### Auto-Refresh
- Fetches new data every 30 seconds
- Manual refresh button available
- Live connection indicator

---

## 🔐 Security

### Token Management
- Vercel token checked daily
- Automatic expiration alerts
- Secure storage in GitHub Secrets

### API Access
- GitHub API: Public access (60 req/hour unauthenticated)
- Vercel API: Token-authenticated
- Telegram API: Bot token required

### Best Practices
- Never commit secrets to repository
- Use `.env` for local development
- Configure GitHub Secrets for CI/CD
- Rotate tokens regularly

---

## 🐛 Troubleshooting

### Build Fails

**Problem**: `vite: command not found`

**Solution**:
```bash
cd dashboard/abvetos-dashboard
pnpm install
```

### Deployment Fails

**Problem**: Vercel token expired

**Solution**:
1. Generate new token at https://vercel.com/account/tokens
2. Update `VERCEL_TOKEN` in GitHub Secrets
3. Re-run workflow

### No Telegram Notifications

**Problem**: Bot not sending messages

**Solution**:
1. Verify `TELEGRAM_BOT_TOKEN` is correct
2. Verify `TELEGRAM_CHAT_ID` is correct
3. Ensure bot is added to chat/channel
4. Check bot permissions

### API Rate Limiting

**Problem**: GitHub API returning 403

**Solution**:
- Wait for rate limit reset (1 hour)
- Add GitHub token for higher limits (5000 req/hour)
- Reduce auto-refresh frequency

---

## 📈 Monitoring

### GitHub Actions
- View workflow runs: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions
- Check deployment logs
- Download screenshots from artifacts

### Vercel Dashboard
- View deployments: https://vercel.com/dashboard
- Check build logs
- Monitor performance

### Telegram Channel
- Receive deployment notifications
- View deployment screenshots
- Get instant alerts on failures

---

## 🔄 Workflow Details

### `abvetos-dashboard-deploy.yml`

**Triggers:**
- Push to `main` branch
- Changes in dashboard files
- Manual workflow dispatch

**Steps:**
1. Checkout repository
2. Setup Node.js and pnpm
3. Install dependencies
4. Build dashboard with Vite
5. Copy build to public directory
6. Deploy to Vercel
7. Capture desktop/mobile screenshots
8. Send Telegram notifications
9. Create deployment summary

**Artifacts:**
- Dashboard screenshots (30 days retention)

### `vercel-token-refresh.yml`

**Triggers:**
- Daily at 00:00 UTC (cron: '0 0 * * *')
- Manual workflow dispatch

**Steps:**
1. Check Vercel token validity
2. Test API access
3. Verify project configuration
4. Send alerts on token expiry
5. Create status summary

---

## 📚 Component Documentation

### Dashboard.jsx
Main dashboard component handling:
- State management
- GitHub API integration
- Auto-refresh logic
- Error handling

### MetricsCard.jsx
Displays individual system metrics:
- CPU, Memory, Requests, Uptime
- Progress bars for percentage values
- Color-coded icons

### DeployList.jsx
Shows recent deployments:
- Deployment status
- Commit information
- Production links
- Timestamps

### GitHubActionsStatus.jsx
Displays workflow runs:
- Workflow status
- Build details
- Duration tracking
- GitHub links

### SystemHealthGraph.jsx
Grid of metric cards:
- 4-column responsive layout
- System health overview

---

## 🎨 Styling

The dashboard uses a custom CSS design system:

- **Colors**: Slate/Blue/Purple palette
- **Typography**: System fonts, responsive sizing
- **Layout**: CSS Grid, Flexbox
- **Animations**: Smooth transitions, pulse effects
- **Responsive**: Mobile-first design

### Color Palette

```css
Primary Blue:    #2563eb
Primary Purple:  #9333ea
Success Green:   #22c55e
Warning Yellow:  #eab308
Error Red:       #ef4444
Neutral Slate:   #64748b
```

---

## 🚀 Performance

### Build Metrics
- **Bundle Size**: ~297 KB (gzipped: ~78 KB)
- **Build Time**: ~30 seconds
- **Deployment Time**: ~2 minutes

### Runtime Performance
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **API Response**: <500ms

### Optimization
- Code splitting enabled
- Tree shaking active
- Asset minification
- Gzip compression

---

## 🧪 Testing

### Local Development
```bash
cd dashboard/abvetos-dashboard
pnpm run dev
# Test at http://localhost:5173
```

### Production Build
```bash
pnpm run build
pnpm run preview
# Test at http://localhost:4173
```

### Manual Deployment Test
```bash
./scripts/deploy_abvetos_dashboard.sh --manual
```

---

## 📄 License

Part of the **TRYONYOU – ABVETOS – ULTRA–PLUS–ULTIMATUM** platform.

© 2025 TRYONYOU. All rights reserved.

---

## 👥 Support

### Documentation
- [Implementation Report](../IMPLEMENTATION_REPORT_OCT_2025.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [GitHub Secrets Setup](../GITHUB_SECRETS_SETUP.md)

### Resources
- **Repository**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- **Production**: https://tryonyou.app
- **Dashboard**: https://tryonyou.app/dashboard/abvetos-dashboard/

### Issues
For bugs or feature requests, create an issue at:
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues

---

## 🔮 Future Enhancements

- [ ] **Real-time Logs**: Stream workflow logs
- [ ] **Deployment Previews**: Preview URLs for PRs
- [ ] **Performance Metrics**: Lighthouse scores
- [ ] **Cost Tracking**: Vercel usage monitoring
- [ ] **Custom Filters**: Filter by branch/status/date
- [ ] **Export Data**: CSV/JSON export
- [ ] **Webhook Alerts**: Custom notification triggers
- [ ] **Historical Analytics**: Long-term trend analysis

---

**Version**: 1.0.0  
**Last Updated**: October 20, 2025  
**Status**: ✅ Production Ready
