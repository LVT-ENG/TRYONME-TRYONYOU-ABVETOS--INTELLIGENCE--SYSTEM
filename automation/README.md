# TRYONYOU Automation Scripts

This directory contains automation scripts and integrations for the TRYONYOU platform.

## 📁 Contents

### 🔹 [google-apps-script/](./google-apps-script/)

**Daily Task Planner & Telegram Notifier**

Automated daily reports sent to Telegram at 09:00 CEST with:
- Critical tasks (P0 and P1 priorities)
- AI-agent-based execution guidance
- Integration with Google Sheets Dashboard

**Files:**
- `dailyPlanner.gs` - Main script for Google Apps Script
- `README.md` - Complete setup and configuration guide
- `QUICK_START.md` - 5-minute quick start guide

**Key Features:**
- ⏰ Automatic daily execution at 09:00 CEST
- 📊 Reads tasks from Google Sheets Dashboard
- 🤖 Telegram bot integration for notifications
- 🎯 AI-agent guidance for task execution
- 🔧 Configurable priorities and workflows

**Quick Links:**
- [Quick Start Guide](./google-apps-script/QUICK_START.md)
- [Full Documentation](./google-apps-script/README.md)
- [Script Source](./google-apps-script/dailyPlanner.gs)

## 🚀 Getting Started

1. **Daily Planner Setup**: See [google-apps-script/QUICK_START.md](./google-apps-script/QUICK_START.md)
2. Configure your Telegram bot credentials
3. Set up Google Sheets with the expected format
4. Run the setup script and test

## 🔗 Related Documentation

- [GitHub Actions Workflows](../.github/workflows/) - CI/CD automation
- [Deploy Instructions](../DEPLOY_INSTRUCTIONS.md) - Deployment workflows
- [GitHub Secrets Setup](../GITHUB_SECRETS_SETUP_COMPLETE.md) - Secret configuration

## 📋 Future Automations

Planned automation scripts:
- Weekly progress reports
- Automated PR updates
- Performance monitoring alerts
- Deployment status tracking
- Analytics reports

## 🤝 Contributing

When adding new automation scripts:
1. Create a dedicated subdirectory
2. Include comprehensive README.md
3. Provide configuration examples
4. Document all dependencies
5. Add troubleshooting guide

---

**Maintained by**: TRYONYOU Team  
**Last Updated**: 2025-01-15
