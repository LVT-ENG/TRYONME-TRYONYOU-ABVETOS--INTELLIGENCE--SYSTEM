# 🤖 TRYONYOU Active Agents System (24/7)

## Overview

The TRYONYOU platform operates with a sophisticated multi-agent system that provides continuous monitoring, deployment, quality assurance, and documentation management. These intelligent agents work autonomously 24/7 to ensure optimal performance, brand consistency, and operational excellence.

## 🎯 Active Agents

### Agent 70 - Orquestador General
**Status:** 🟢 Active  
**Schedule:** Every hour + Daily report at 09:00 UTC  
**Function:** Central orchestrator that coordinates all agents, monitors system health, and generates comprehensive status reports.

**Key Responsibilities:**
- Monitor all agent workflows
- Generate daily priority reports (P0/P1)
- Coordinate deployment activities
- Track system health metrics
- Send consolidated Telegram notifications

**Workflow:** `.github/workflows/orchestrator-agent.yml`

---

### Agent 22 - Deploy Operator
**Status:** 🟢 Active  
**Schedule:** On push to main + Manual trigger  
**Function:** Manages CI/CD pipeline with Vercel integration and automated screenshot capture.

**Key Responsibilities:**
- Build project with Vite
- Deploy to Vercel production
- Capture desktop (1920x1080) and mobile (375x812) screenshots
- Send deployment notifications with screenshots to Telegram
- Monitor deployment health

**Workflow:** `.github/workflows/deploy.yml`

**Technologies:**
- GitHub Actions
- Vercel
- Puppeteer for screenshots
- Telegram Bot API

---

### Agent 20 - GitHub Commit Agent
**Status:** 🟢 Active  
**Schedule:** On push/PR + Daily at 08:00 UTC  
**Function:** Repository health monitoring, code quality checks, and commit analysis.

**Key Responsibilities:**
- Monitor branch status
- Analyze code quality metrics
- Verify documentation structure
- Check asset organization
- Security scanning for sensitive files
- Generate comprehensive repository reports

**Workflow:** `.github/workflows/github-agent.yml`

---

### Agent 12 - Brand Guardian
**Status:** 🟢 Active  
**Schedule:** On code/asset changes + Daily at 10:00 UTC  
**Function:** Ensures brand consistency across visual elements, colors, and typography.

**Key Responsibilities:**
- Verify official color palette usage:
  - Oro elegante (#D3B26A)
  - Pavo real profundo (#0E6B6B)
  - Antracita oscuro (#141619)
  - Hueso claro (#F5EFE6)
- Check typography consistency
- Validate visual asset inventory
- Monitor component consistency
- Calculate brand coherence score
- Ensure Vogue-tech premium standards

**Workflow:** `.github/workflows/brand-guardian.yml`

---

### Agent 46 - Document Locker
**Status:** 🟢 Active  
**Schedule:** On doc changes + Daily at 11:00 UTC  
**Function:** Protects and monitors legal documentation, patents, and intellectual property.

**Key Responsibilities:**
- Verify patent documentation (EPCT)
- Monitor legal directory integrity
- Check copyright notices
- Validate core documentation completeness
- Scan for exposed sensitive information
- Track documentation quality metrics

**Workflow:** `.github/workflows/document-locker.yml`

---

### Agent 31 - Video Curator
**Status:** 🟡 Pending Implementation  
**Function:** Will manage hero videos, LaSeñu content, and Pau overlay integration.

**Planned Features:**
- Video asset management
- Hero video optimization
- Pau overlay coordination
- Video quality assurance

---

### Agent 2 - Content Pro
**Status:** 🟡 Pending Implementation  
**Function:** Will manage investor decks, marketing copy, and brand content.

**Planned Features:**
- Content generation and curation
- Investor materials management
- Marketing copy optimization
- Multi-language content support

---

### Agent 25 - Image Curator
**Status:** 🟡 Pending Implementation  
**Function:** Will manage product mockups, fashion images, and visual assets.

**Planned Features:**
- Image asset organization
- Mockup generation
- Image optimization
- Visual quality assurance

---

## 📅 Daily Schedule (UTC)

| Time | Agent | Action |
|------|-------|--------|
| 08:00 | Agent 20 | GitHub repository analysis |
| 09:00 | Agent 70 | Daily orchestrator report with P0/P1 priorities |
| 10:00 | Agent 12 | Brand consistency check |
| 11:00 | Agent 46 | Documentation verification |
| Hourly | Agent 70 | System health monitoring |
| On Push | Agent 22 | Automatic deployment to Vercel |

## 📱 Telegram Integration

All agents send notifications to the configured Telegram channel:
- **Daily Reports:** Consolidated at 09:00 UTC
- **Deploy Notifications:** Immediate with screenshots
- **Alert Notifications:** On-demand for critical issues

### Required Secrets

Configure these in GitHub Settings → Secrets:
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `TELEGRAM_CHAT_ID`: Your Telegram chat ID
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

## 📊 Monitoring & Reports

### Agent Status Dashboard

Real-time agent status is maintained in:
- `docs/agents/status.md` - Updated hourly by Agent 70

### Historical Reports

Individual agent reports are stored in:
- `docs/agents/reports/github-agent-*.md`
- `docs/agents/reports/brand-guardian-*.md`
- `docs/agents/reports/document-locker-*.md`

Reports are automatically pruned to keep only the last 10 for each agent.

## 🔒 Security Features

All agents include:
- ✅ Sensitive file detection
- ✅ Secret scanning in documentation
- ✅ .gitignore validation
- ✅ Legal documentation protection
- ✅ Copyright notice verification

## 🎯 Expected Results

### 1. Daily Telegram Notification (09:00 UTC)
- Priority task list (P0/P1)
- Quick access links
- Agent status summary
- System health metrics

### 2. 24/7 Deployment
- Automatic build on push
- Vercel production deployment
- Desktop and mobile screenshots
- Immediate Telegram notification

### 3. Premium Visual Standards
- Vogue-tech aesthetic maintained
- Brand color consistency enforced
- Typography coherence verified
- Asset quality monitored

### 4. Code Synchronization
- `/docs/` directory: Up-to-date documentation
- `/src/` directory: Clean, quality code
- `/public/assets/`: Organized visual assets
- `.github/workflows/`: Active agent workflows

## 🚀 Getting Started

1. **Configure Secrets:**
   ```bash
   # Go to: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions
   # Add required secrets listed above
   ```

2. **Verify Workflows:**
   ```bash
   # Check that all workflow files exist
   ls -la .github/workflows/
   ```

3. **Test Agents:**
   ```bash
   # Manual trigger any agent from GitHub Actions tab
   # Actions → Select workflow → Run workflow
   ```

4. **Monitor Activity:**
   ```bash
   # Check agent status
   cat docs/agents/status.md
   ```

## 📖 Additional Resources

- [Main Agents Documentation](../agentes.md) - Complete agent descriptions
- [System Architecture](../arquitectura.md) - System design and integration
- [Deployment Guide](../../DEPLOYMENT.md) - Deployment procedures
- [Security Policy](../../SECURITY.md) - Security guidelines

---

**Last Updated:** 2025-10-15  
**System Status:** 🟢 All core agents active  
**CEO:** Rubén Espinar (TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM)
