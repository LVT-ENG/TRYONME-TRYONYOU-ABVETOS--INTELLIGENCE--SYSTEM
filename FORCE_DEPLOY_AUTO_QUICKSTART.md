# 🚀 Quick Start Guide: Force Deploy Auto

## What is Force Deploy Auto?

`force_deploy_auto.sh` is an automated deployment script that continuously monitors a directory for ZIP file uploads and automatically deploys them to your TRYONYOU project. Perfect for continuous deployment workflows.

## 🎯 Quick Setup (5 Minutes)

### Step 1: Install Prerequisites

```bash
# macOS
brew install fswatch
npm install -g vercel

# Linux
sudo apt-get install fswatch
npm install -g vercel
```

### Step 2: Set Environment Variables

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
export VERCEL_TOKEN="your_vercel_token_here"
export WATCH_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
export REPO_PATH="$HOME/TRYONYOU_PROJECT"
```

Get your Vercel token from: https://vercel.com/account/tokens

### Step 3: Clone Repository (if needed)

```bash
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git "$HOME/TRYONYOU_PROJECT"
cd "$HOME/TRYONYOU_PROJECT"
```

### Step 4: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 5: Run the Script

```bash
cd "$HOME/TRYONYOU_PROJECT"
./force_deploy_auto.sh
```

## 📦 How to Use

1. **Start the watcher**: Run `./force_deploy_auto.sh`
2. **Drop a ZIP file**: Add any `.zip` file to your watch directory
3. **Automatic deployment**: The script will:
   - Extract the ZIP
   - Sync with your repository
   - Commit and push to GitHub
   - Deploy to Vercel production
4. **Check logs**: View `auto_deploy.log` in your watch directory

## 🔍 Example Workflow

```bash
# Terminal 1: Start the watcher
./force_deploy_auto.sh

# Terminal 2: Create and upload a deployment
cd /path/to/your/changes
zip -r update_v1.2.3.zip .
cp update_v1.2.3.zip "$WATCH_DIR/"

# Watch Terminal 1 - automatic deployment starts!
```

## ⚡ Common Commands

```bash
# Check if it's running
ps aux | grep force_deploy_auto

# View live logs
tail -f "$WATCH_DIR/auto_deploy.log"

# Stop the watcher
# Press Ctrl+C in the terminal running the script
```

## 🆘 Troubleshooting

### Error: "fswatch: command not found"
```bash
# macOS
brew install fswatch

# Linux
sudo apt-get install fswatch
```

### Error: "VERCEL_TOKEN environment variable is not set"
```bash
export VERCEL_TOKEN="your_token_here"
# Add to ~/.bashrc or ~/.zshrc for persistence
```

### Error: Git push fails
```bash
# Check remote
git remote -v

# Verify SSH keys
ssh -T git@github.com
```

## 📚 Full Documentation

For comprehensive documentation, see: [FORCE_DEPLOY_AUTO_README.md](FORCE_DEPLOY_AUTO_README.md)

## 🔗 Related Scripts

- **tryonyou_full_auto.sh**: Complete system setup
- **deploy.sh**: Quick manual deployment
- **scripts/auto-version-deploy.sh**: Versioned deployments
- **scripts/package_deploy_express.sh**: Package creation

---

**TRYONYOU – ABVETOS – INTELLIGENCE SYSTEM**  
*Automated Continuous Deployment*
