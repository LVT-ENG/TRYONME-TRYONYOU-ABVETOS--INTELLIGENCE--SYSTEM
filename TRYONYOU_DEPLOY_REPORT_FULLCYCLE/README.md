# TRYONYOU_DEPLOY_REPORT_FULLCYCLE

Complete automated deployment and reporting system for TRYONYOU - ABVETOS Intelligence System.

## 📁 Directory Structure

```
TRYONYOU_DEPLOY_REPORT_FULLCYCLE/
│
├── .env.example
│     ├─ VERCEL_TOKEN=
│     ├─ VERCEL_PROJECT_ID=
│     ├─ VERCEL_ORG_ID=
│     ├─ TELEGRAM_BOT_TOKEN=
│     └─ TELEGRAM_CHAT_ID=
│
├── .github/workflows/
│     ├─ deploy.yml                     # Build + Deploy Vercel
│     └─ system-orchestration-report.yml # Report every 12h
│
├── scripts/
│     ├─ refresh_tokens.sh               # Auto-renew tokens Vercel + Telegram
│     └─ deploy_express.sh               # Execute complete CI/CD cycle
│
├── docs/reports/
│     ├─ System_Orchestration_v1.0.md    # EPIC status + subtasks
│     └─ TRYONYOU_Dashboard_Status.html  # Visual ABVETOS dashboard
│
├── README_DEPLOY.txt                    # Step-by-step instructions
└── changelog.log                        # Latest commit and hash
```

## 🚀 Quick Start

### 1. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 2. Deploy Full Cycle

```bash
./scripts/deploy_express.sh
```

### 3. Refresh Tokens

```bash
./scripts/refresh_tokens.sh
```

## 📊 Features

### ✅ Automated Deployment
- Complete CI/CD pipeline
- Vercel integration
- Automated builds
- Telegram notifications

### ✅ System Monitoring
- 12-hour orchestration reports
- Real-time dashboard
- Agent performance metrics
- API status tracking

### ✅ Token Management
- Automatic token verification
- Backup creation
- Notification testing

## 📖 Documentation

- **README_DEPLOY.txt** - Complete deployment guide
- **System_Orchestration_v1.0.md** - Detailed system report
- **TRYONYOU_Dashboard_Status.html** - Visual monitoring dashboard

## 🔧 Configuration

### Required Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| VERCEL_TOKEN | Vercel API token | https://vercel.com/account/tokens |
| VERCEL_PROJECT_ID | Project ID | Vercel project settings |
| VERCEL_ORG_ID | Organization ID | Vercel team settings |
| TELEGRAM_BOT_TOKEN | Bot API token | @BotFather on Telegram |
| TELEGRAM_CHAT_ID | Chat ID for notifications | Bot getUpdates API |

## 🔄 Automated Workflows

### Deploy Workflow
- **File:** `.github/workflows/deploy.yml`
- **Trigger:** Push to main branch
- **Actions:** Build, test, deploy to Vercel

### System Orchestration Report
- **File:** `.github/workflows/system-orchestration-report.yml`
- **Trigger:** Every 12 hours (cron: 0 */12 * * *)
- **Actions:** Generate system reports, update metrics

## 📈 Monitoring

### Visual Dashboard
Open `docs/reports/TRYONYOU_Dashboard_Status.html` to view:
- System uptime
- Response times
- Agent performance
- API endpoint status
- User engagement metrics

### System Report
View `docs/reports/System_Orchestration_v1.0.md` for:
- EPIC status and progress
- Agent performance details
- Security compliance
- Performance metrics
- Recommendations

## 🛠️ Scripts

### deploy_express.sh
Complete deployment cycle:
1. Install dependencies
2. Run linting
3. Build application
4. Deploy to Vercel
5. Send notifications
6. Update changelog

### refresh_tokens.sh
Token management:
1. Verify Vercel token
2. Verify Telegram bot
3. Test notifications
4. Create backups

## 📝 Changelog

The `changelog.log` file contains:
- Latest commit hash
- Commit message
- Build information
- Deployment status

## 🔒 Security

All sensitive credentials are stored in `.env` file (not committed to repository).
Use `.env.example` as template and never commit real credentials.

## 🆘 Support

For issues or questions:
- Check README_DEPLOY.txt for troubleshooting
- Review logs in logs/ directory
- Contact via Telegram: @abvet_deploy_bot

## 📄 License

Part of TRYONYOU - ABVETOS Intelligence System
© 2025 LVT-ENG

---

**Last Updated:** 2025-10-20  
**Version:** 1.0
