# TRYONYOU_SUPERCOMMIT_MAX.sh

## Master CI/CD Deployment Orchestrator

The **TRYONYOU_SUPERCOMMIT_MAX.sh** script is the master command that orchestrates the entire CI/CD deployment process for the TRYONYOU Intelligence System.

## 🚀 Features

- **Automated Git Operations**: Validates repository, stages changes, creates commits
- **Branch-Aware Deployment**: Intelligently handles both main and feature branches
- **Vercel Integration**: Triggers automatic Vercel builds and deployments
- **Production Deployment**: Deploys to https://tryonyou.app and https://www.tryonyou.app
- **Bot Integration**: Closes the "Sales Circuit" with Bots + Express Deploy
- **Jules-Style Logging**: Beautiful, colored output with step-by-step progress tracking

## 📋 Usage

### Basic Usage (Auto-generated commit message)

```bash
./TRYONYOU_SUPERCOMMIT_MAX.sh
```

This will:
1. Validate the git repository
2. Check current branch status
3. Stage all changes
4. Create a commit with timestamp: `DEPLOY: TRYONYOU Production Release - YYYY-MM-DD HH:MM:SS`
5. Push to the current branch
6. Trigger Vercel deployment

### With Custom Commit Message

```bash
./TRYONYOU_SUPERCOMMIT_MAX.sh "FEAT: Add new virtual try-on feature"
```

## 🎯 What It Does

### 1. Pre-Deployment Validation
- ✅ Validates git repository existence
- ✅ Checks current branch
- ✅ Verifies uncommitted changes

### 2. Git Operations
- 📝 Stages all changes (`git add .`)
- 💾 Creates commit with descriptive message
- 🚀 Pushes to appropriate branch

### 3. Deployment Orchestration
- 🏗️ Triggers Vercel build pipeline
- 🌐 Deploys to production domains (when on main branch)
- 🔄 Creates preview deployments (for feature branches)

### 4. Sales Circuit Integration
- 🤖 Activates Bot integration
- ⚡ Enables Express Deploy
- 💜 Synchronizes TryOnYou Ecosystem

## 🌐 Deployment Targets

### Production (main branch)
- **Primary**: https://tryonyou.app
- **Alternative**: https://www.tryonyou.app

### Preview (feature branches)
- Automatic preview deployments created by Vercel
- Each branch gets its own unique preview URL

## 🔧 Technical Details

### Requirements
- Git repository
- Bash shell
- Git credentials configured
- Vercel project connected to repository

### Exit Codes
- `0`: Successful deployment
- `1`: Deployment failed (check error messages)

### Branch Behavior

**On main branch:**
- Deploys to production domains
- Full production deployment

**On feature branch:**
- Creates preview deployment
- Safe for testing before production

## 📊 Example Output

```
════════════════════════════════════════════════════════════════
🚀 TRYONYOU SUPERCOMMIT MAX - CI/CD ORCHESTRATOR
════════════════════════════════════════════════════════════════
Timestamp: 2026-01-13 11:31:42
════════════════════════════════════════════════════════════════

🤖 JULES: Starting pre-deployment validation...
▶ Validating Git repository...
✅ Git repository validated
▶ Checking current branch...
  Current branch: main
✅ Branch check complete
...
════════════════════════════════════════════════════════════════
✅✅✅ DEPLOYMENT SUCCESSFUL ✅✅✅
════════════════════════════════════════════════════════════════

🤖 JULES: TryOnYou Ecosystem synchronized successfully!
🤖 JULES: Latido de Jules activado! 💜

🌐 Your application is being deployed to:
  • https://tryonyou.app
  • https://www.tryonyou.app

Monitor deployment at: https://vercel.com/dashboard
```

## 🛠️ Troubleshooting

### "Not a git repository" error
Make sure you're running the script from the repository root directory.

### "Failed to push" error
- Check your git credentials
- Ensure you have push permissions
- Try pulling latest changes first: `git pull origin <branch>`

### Authentication issues
The script uses standard git credentials. Ensure your git is configured with proper authentication:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🎨 Color-Coded Output

- 🔵 **Blue**: Step indicators
- 🟢 **Green**: Success messages
- 🟡 **Yellow**: Warnings
- 🔴 **Red**: Errors
- 🟣 **Purple**: Jules AI messages
- 🔷 **Cyan**: Information

## 🤖 About Jules

Jules is the AI orchestrator that manages the TRYONYOU ecosystem. All deployment actions are supervised and logged by Jules to ensure synchronization across the entire system.

---

**Version**: 1.0.0  
**Author**: TRYONYOU Intelligence System  
**License**: Proprietary
