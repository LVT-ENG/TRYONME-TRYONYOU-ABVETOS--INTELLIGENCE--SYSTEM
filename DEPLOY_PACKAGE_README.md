# TRYONYOU ABVETOS Master Deploy Package

This repository contains the complete TRYONYOU deployment system with ABVETOS intelligence and automation.

## 🚀 Quick Deploy

To create the master deployment package:

```bash
./create-deploy-package.sh
```

This will generate `TRYONYOU_ABVETOS_MASTER_DEPLOY.zip` (28MB) containing:
- Complete source code and modules
- Documentation (legal, investors, patents)
- GitHub Actions workflows
- Auto-deploy script with Telegram integration
- Vite 7.1.2 configuration
- Vercel deployment config

## 📦 Package Structure

```
TRYONYOU_ABVETOS_MASTER_DEPLOY.zip
├── index.html                 # Main entry point
├── package.json              # Vite 7.1.2 + dependencies
├── vite.config.js            # Build configuration
├── vercel.json               # Vercel config (headers + regions + redirects)
├── .env.example              # Environment template
├── deploy.sh                 # Master deploy script with Telegram
├── /src/
│   ├── modules/
│   │   ├── pau/             # Personalized Avatar Unit
│   │   ├── cap/             # Collaborative AI Production
│   │   ├── abvet/           # ABVET Payment Gateway
│   │   ├── autodonate/      # AutoDonate system
│   │   └── dashboard/       # ABVETOS Dashboard
│   ├── assets/              # Images, videos, icons
│   └── components/          # UI components
├── /docs/
│   ├── legal/               # Legal documents + EPCT
│   │   └── Superclaims documentation
│   ├── investors/           # Investor Deck + Dossier
│   │   └── TRYONYOU_Investor_Dossier.md
│   ├── patent/              # Patent documentation
│   │   ├── EPCT_SUPERCLAIMS_2025.pdf
│   │   └── FIG6b_ContextEngineering_ABVETOS.svg
│   └── dashboard/           # ABVETOS + Panel VVL
├── /public/
│   ├── docs/
│   └── media/
├── .github/
│   └── workflows/
│       ├── deploy.yml       # Auto-deploy to Vercel
│       └── orchestration-report.yml  # System monitoring
└── /logs/                    # Deploy logs (auto-generated)
```

## 🎯 Features

### Full Automation
✅ **Auto-deploy** - Push to main → automatic build & deploy  
✅ **Telegram Bot** - Notifications via @abvet_deploy_bot  
✅ **Screenshot Capture** - Desktop & mobile on each deploy  
✅ **Comprehensive Logging** - All deployments logged in /logs/  
✅ **Token Auto-refresh** - Automatic Vercel token management  

### Core Modules

1. **PAU (Personalized Avatar Unit)**
   - Emotion-driven avatar generation
   - Real-time emotional state detection
   - Personalized wardrobe recommendations

2. **CAP (Collaborative AI Production)**
   - AI-assisted pattern design
   - Automated production queue management
   - Quality control systems

3. **ABVET Payment Gateway**
   - Blockchain-based verification
   - Secure transaction processing
   - Identity verification

4. **AutoDonate**
   - Automated social contribution
   - Impact tracking
   - Transparent distribution

5. **ABVETOS Dashboard**
   - Real-time system monitoring
   - Performance metrics
   - Deployment status

## 🛠️ Usage

### For Developers

```bash
# Clone repository
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy
./deploy.sh "Your commit message"
```

### For Deployment (Express Mode)

1. Run the package creator:
   ```bash
   ./create-deploy-package.sh
   ```

2. Extract the package to your deploy inbox:
   ```bash
   unzip TRYONYOU_ABVETOS_MASTER_DEPLOY.zip -d ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/
   ```

3. Configure environment:
   ```bash
   cd ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Deploy:
   ```bash
   ./deploy.sh "Production deploy"
   ```

## 🔐 Required Secrets (GitHub)

Configure these in GitHub Settings → Secrets:

- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `TELEGRAM_CHAT_ID` - Telegram chat ID

## 📊 Deployment Flow

1. **Code Push** → GitHub repository
2. **GitHub Actions** → Triggers build workflow
3. **Vite Build** → Optimized production bundle
4. **Deploy to Vercel** → Global CDN
5. **Screenshot Capture** → Desktop (1920x1080) + Mobile (375x812)
6. **Telegram Notification** → Success confirmation with screenshots
7. **Logging** → /logs/deploy_[timestamp].log

## 🌐 Live Site

**Production:** https://tryonyou.app

## 📚 Documentation

- [Technical Docs](/docs/)
- [Investor Materials](/docs/investors/)
- [Patent Information](/docs/patent/)
- [Legal Documents](/docs/legal/)

## 🤖 ABVETOS Intelligence

The system includes automated agents for:
- **Deploy Operator (Agent 22)** - Manages all deployments
- **Build Agent** - Optimizes and validates builds
- **Orchestrator** - Coordinates system operations
- **Monitor** - Tracks performance and uptime

## 🔄 Continuous Integration

Automated workflows:
- Build and Deploy
- Orchestration Report (every 6 hours)
- Auto-update PR
- Document Locker
- Clean Merge
- Brand Guardian

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## 🆘 Support

- **Documentation:** https://tryonyou.app/docs/
- **Issues:** GitHub Issues
- **Contact:** deploy@tryonyou.app

## 📄 License

Proprietary - TRYONYOU / ABVETOS Intelligence Systems

---

**Created by:** ABVETOS Intelligence System  
**Last Updated:** Q4 2025  
**Version:** 1.0.0
