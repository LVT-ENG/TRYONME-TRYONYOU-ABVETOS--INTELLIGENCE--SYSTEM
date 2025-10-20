# TRYONYOU RETRODEPLOY SYSTEM

## 🎯 Overview

The TRYONYOU Retrodeploy system is an automated deployment solution that manages mass deployment of up to 48 ZIP files to tryonyou.app via Vercel. It provides continuous monitoring, automatic duplicate cleanup, Git integration, and Telegram notifications.

## 📁 Directory Structure

```
/retrodeploy/
│
├── deploy.sh              # Master deployment script (Bash)
├── makefile               # Build + commit + Vercel deploy automation
├── vercel.json            # Vercel configuration for tryonyou.app
├── watcher.js             # Auto-sync daemon for ZIP monitoring
├── .env                   # Environment variables (NOT committed)
├── .env.example           # Template for .env configuration
├── .gitignore             # Prevents committing sensitive files
├── retrodeploy.log        # Continuous deployment log
└── README.txt             # User instructions

/TRYONYOU_DEPLOY_EXPRESS_INBOX/
│
├── README.md              # INBOX usage instructions
└── *.zip                  # Deployment ZIP files (NOT committed)
```

## 🚀 Quick Start

### 1. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cd retrodeploy
cp .env.example .env
```

Edit `.env` and provide:
- `VERCEL_TOKEN` - Your Vercel authentication token
- `TELEGRAM_BOT_TOKEN` - Telegram bot token for notifications
- `TELEGRAM_CHAT_ID` - Telegram chat ID for notifications

### 2. Manual Deployment

Run the master deployment script:

```bash
cd retrodeploy
./deploy.sh
```

This will execute all 6 deployment steps automatically.

### 3. Using Makefile

The Makefile provides convenient commands:

```bash
cd retrodeploy

# View all available commands
make help

# Install dependencies
make install

# Build with Vite 7.1.2
make build

# Commit and push to GitHub
make commit

# Deploy to Vercel production
make deploy

# Run complete pipeline
make all

# Verify deployment
make verify

# Check status
make status

# Clean build artifacts
make clean
```

### 4. Auto-Deployment with Watcher

Start the daemon to monitor ZIP files automatically:

```bash
cd retrodeploy
node watcher.js
```

Run in background:

```bash
nohup node watcher.js > watcher.out 2>&1 &
```

The watcher will:
- Monitor `TRYONYOU_DEPLOY_EXPRESS_INBOX/` every 30 seconds
- Detect new or changed ZIP files
- Clean duplicate files automatically
- Trigger deployment pipeline when changes are detected

## 📦 Deployment Process (6 Steps)

### Step 1: Detect ZIPs
- Scans `TRYONYOU_DEPLOY_EXPRESS_INBOX/` directory
- Counts `.zip` files
- Logs findings

### Step 2: Clean Duplicates
- Groups files by base name
- Compares modification times
- Keeps most recent version
- Removes older duplicates

### Step 3: Commit to Main
```bash
git checkout main
git add .
git commit -m "🚀 Retrodeploy: Mass deployment..."
git push origin main
```

### Step 4: Build with Vite
```bash
npm install  # If needed
npm run build  # Vite 7.1.2
```

### Step 5: Deploy to Vercel
```bash
vercel --prod --token $VERCEL_TOKEN --yes
```

### Step 6: Verify & Notify
- Checks `https://tryonyou.app` returns HTTP 200
- Sends Telegram notification to @abvet_deploy_bot
- Logs success/failure

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VERCEL_TOKEN` | Vercel authentication token | Yes (for deploy) |
| `VERCEL_PROJECT_ID` | Vercel project identifier | No |
| `VERCEL_TEAM_ID` | Vercel team identifier | No |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | Yes (for notifications) |
| `TELEGRAM_CHAT_ID` | Telegram chat ID | Yes (for notifications) |
| `NODE_ENV` | Node environment | No (defaults to production) |
| `AUTO_DEPLOY` | Enable auto-deployment | No (defaults to true) |
| `WATCH_INTERVAL` | Watcher interval in ms | No (defaults to 30000) |

### Vercel Configuration

The `vercel.json` file configures:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`
- URL rewrites for SPA routing
- Caching headers for assets
- Production environment variables

## 📊 Monitoring & Logging

### Log File

All operations are logged to `retrodeploy.log`:

```bash
# View full log
cat retrodeploy.log

# View last 20 lines
tail -20 retrodeploy.log

# Follow log in real-time
tail -f retrodeploy.log

# Search for errors
grep ERROR retrodeploy.log
```

### Log Format

```
[YYYY-MM-DDTHH:MM:SS.sssZ] [LEVEL] message
```

Levels: `INFO`, `WARN`, `ERROR`, `DEBUG`

## 🔄 ZIP File Management

### Expected ZIP Format

ZIP files should follow this naming convention:

```
TRYONYOU_DEPLOY_EXPRESS_YYYYMMDD_HHMM.zip
```

Example:
```
TRYONYOU_DEPLOY_EXPRESS_20251020_0737.zip
```

### Placing ZIP Files

1. Copy ZIP files to `TRYONYOU_DEPLOY_EXPRESS_INBOX/`
2. If watcher is running, deployment starts automatically within 30 seconds
3. Otherwise, run `./deploy.sh` manually

### Duplicate Handling

The system automatically:
- Detects files with the same base name
- Compares modification timestamps
- Keeps the newest file
- Deletes older versions

## 🔔 Notifications

### Telegram Integration

When deployment completes, a notification is sent to @abvet_deploy_bot with:
- ✅ Deployment status
- 📦 Number of ZIPs deployed
- 🕐 Timestamp
- 🌍 Deployment URL
- 📝 Commit message

### Configure Telegram

1. Create a Telegram bot via @BotFather
2. Get bot token
3. Find your chat ID
4. Add to `.env` file

## 🛡️ Security

### Protecting Sensitive Data

- **Never commit** `.env` with real tokens
- Use `.env.example` as template
- Set restrictive permissions: `chmod 600 .env`
- Rotate tokens regularly
- Use Vercel environment variables for production secrets

### .gitignore

The retrodeploy `.gitignore` prevents committing:
- `.env` files
- `*.log` files
- `node_modules/`
- `dist/` build artifacts
- Temporary files

## 🧪 Testing

### Test Build

```bash
cd retrodeploy
make build
```

### Test Deployment (Dry Run)

To test without actually deploying:

```bash
cd retrodeploy
# Comment out deployment section in deploy.sh
./deploy.sh
```

### Test Watcher

```bash
cd retrodeploy
timeout 60 node watcher.js
```

This runs the watcher for 60 seconds then stops.

### Verify Site

```bash
cd retrodeploy
make verify
```

Expected output:
```
✅ tryonyou.app is responding (HTTP 200)
```

## 🔍 Troubleshooting

### Common Issues

**Problem**: `VERCEL_TOKEN not set`
- **Solution**: Add your token to `.env` file

**Problem**: `tryonyou.app returned HTTP 000`
- **Solution**: Site may not be deployed yet or DNS not configured

**Problem**: Watcher not detecting new ZIPs
- **Solution**: Check permissions on INBOX directory, verify watcher is running

**Problem**: Build fails
- **Solution**: Run `npm install` first, check Node.js version

**Problem**: Git push fails
- **Solution**: Check GitHub credentials, ensure you're on main branch

### Debug Mode

Enable verbose logging in scripts:

```bash
# In deploy.sh
set -x  # Add this at the top for detailed output
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## 🤝 Contributing

When making changes:
1. Test thoroughly in development
2. Update documentation
3. Follow existing code style
4. Add appropriate logging
5. Update version in comments

## 📄 License

Part of the TRYONYOU Intelligence System.
Created by LVT-ENG.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check `retrodeploy.log` for error details
- Contact the development team

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-20  
**Maintained by**: LVT-ENG
