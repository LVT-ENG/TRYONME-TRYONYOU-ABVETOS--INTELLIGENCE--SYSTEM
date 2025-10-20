═══════════════════════════════════════════════════════════════
  TRYONYOU - DEPLOY REPORT FULL CYCLE
  Step-by-Step Deployment Instructions
═══════════════════════════════════════════════════════════════

TABLE OF CONTENTS
─────────────────
1. Overview
2. Prerequisites
3. Initial Setup
4. Configuration
5. Automated Deployment
6. Manual Deployment
7. Monitoring & Reports
8. Troubleshooting
9. Support

═══════════════════════════════════════════════════════════════
1. OVERVIEW
═══════════════════════════════════════════════════════════════

The TRYONYOU Deploy Report Full Cycle provides a complete 
automated deployment and monitoring solution for the ABVETOS 
Intelligence System.

Features:
- ✅ Automated CI/CD pipeline
- ✅ 12-hour system orchestration reports
- ✅ Token management and refresh
- ✅ Telegram notifications
- ✅ Vercel deployment integration
- ✅ Visual dashboard monitoring

═══════════════════════════════════════════════════════════════
2. PREREQUISITES
═══════════════════════════════════════════════════════════════

Before starting, ensure you have:

Required:
□ Node.js v22 or higher
□ npm v10 or higher
□ Git installed
□ Vercel account
□ Telegram bot token
□ GitHub repository access

Optional:
□ Vercel CLI (npm i -g vercel)
□ GitHub CLI (gh)

═══════════════════════════════════════════════════════════════
3. INITIAL SETUP
═══════════════════════════════════════════════════════════════

Step 1: Navigate to the deployment directory
────────────────────────────────────────────
cd TRYONYOU_DEPLOY_REPORT_FULLCYCLE

Step 2: Copy environment template
──────────────────────────────────
cp .env.example .env

Step 3: Edit .env file with your credentials
─────────────────────────────────────────────
Open .env in your text editor and fill in:
- VERCEL_TOKEN
- VERCEL_PROJECT_ID
- VERCEL_ORG_ID
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID

═══════════════════════════════════════════════════════════════
4. CONFIGURATION
═══════════════════════════════════════════════════════════════

VERCEL CONFIGURATION
────────────────────
1. Go to https://vercel.com/account/tokens
2. Create a new token
3. Copy token to VERCEL_TOKEN in .env

To get PROJECT_ID and ORG_ID:
1. Open your Vercel project
2. Go to Settings
3. Copy Project ID
4. Copy Team/Org ID

TELEGRAM BOT CONFIGURATION
───────────────────────────
1. Message @BotFather on Telegram
2. Create new bot with /newbot
3. Copy bot token to TELEGRAM_BOT_TOKEN
4. Get chat ID by messaging your bot
5. Visit: https://api.telegram.org/bot<TOKEN>/getUpdates
6. Copy chat ID to TELEGRAM_CHAT_ID

═══════════════════════════════════════════════════════════════
5. AUTOMATED DEPLOYMENT
═══════════════════════════════════════════════════════════════

FULL DEPLOYMENT CYCLE
─────────────────────
Run the complete CI/CD cycle:

./scripts/deploy_express.sh

This will:
1. ✅ Install dependencies
2. ✅ Run linting
3. ✅ Build application
4. ✅ Deploy to Vercel
5. ✅ Send Telegram notification
6. ✅ Update changelog

TOKEN REFRESH
─────────────
Verify and refresh tokens:

./scripts/refresh_tokens.sh

This will:
1. ✅ Verify Vercel token
2. ✅ Verify Telegram bot
3. ✅ Test notifications
4. ✅ Create backup

═══════════════════════════════════════════════════════════════
6. MANUAL DEPLOYMENT
═══════════════════════════════════════════════════════════════

If you prefer manual deployment:

Step 1: Install dependencies
─────────────────────────────
npm ci

Step 2: Build application
─────────────────────────
npm run build

Step 3: Deploy to Vercel
────────────────────────
vercel --token $VERCEL_TOKEN --prod

Or using Vercel dashboard:
1. Push to GitHub
2. Vercel will auto-deploy

═══════════════════════════════════════════════════════════════
7. MONITORING & REPORTS
═══════════════════════════════════════════════════════════════

AUTOMATED REPORTS
─────────────────
System orchestration reports run automatically every 12 hours
via GitHub Actions workflow:

Workflow: .github/workflows/system-orchestration-report.yml
Schedule: 0 */12 * * * (Every 12 hours)

VISUAL DASHBOARD
────────────────
Open the visual dashboard:

docs/reports/TRYONYOU_Dashboard_Status.html

This shows:
- System uptime
- Agent performance
- API status
- User engagement metrics

SYSTEM REPORT
─────────────
View detailed system report:

docs/reports/System_Orchestration_v1.0.md

This includes:
- EPIC status
- Agent metrics
- Security compliance
- Performance data

CHANGELOG
─────────
Latest deployment info:

changelog.log

═══════════════════════════════════════════════════════════════
8. TROUBLESHOOTING
═══════════════════════════════════════════════════════════════

COMMON ISSUES
─────────────

Issue: "Vercel token invalid"
Solution: 
1. Verify token in .env
2. Generate new token at vercel.com/account/tokens
3. Update .env file

Issue: "Telegram notification failed"
Solution:
1. Verify bot token
2. Verify chat ID
3. Ensure bot is not blocked
4. Run: ./scripts/refresh_tokens.sh

Issue: "Build failed"
Solution:
1. Check Node.js version (need v22+)
2. Clear cache: rm -rf node_modules package-lock.json
3. Reinstall: npm ci
4. Check logs in logs/ directory

Issue: "Deployment takes too long"
Solution:
1. Check Vercel status: status.vercel.com
2. Verify internet connection
3. Check build size in dist/

LOGS
────
All operations are logged in:
logs/deploy_express_*.log
logs/token_refresh_*.log

═══════════════════════════════════════════════════════════════
9. SUPPORT
═══════════════════════════════════════════════════════════════

For support:

GitHub Issues:
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

Telegram Bot:
@abvet_deploy_bot

Documentation:
- README.md (main repository)
- System_Orchestration_v1.0.md (detailed report)

═══════════════════════════════════════════════════════════════

QUICK REFERENCE
───────────────

Deploy everything:
  ./scripts/deploy_express.sh

Refresh tokens:
  ./scripts/refresh_tokens.sh

View dashboard:
  open docs/reports/TRYONYOU_Dashboard_Status.html

View report:
  cat docs/reports/System_Orchestration_v1.0.md

Check logs:
  ls -lt logs/

═══════════════════════════════════════════════════════════════

Last Updated: 2025-10-20
Version: 1.0

═══════════════════════════════════════════════════════════════
