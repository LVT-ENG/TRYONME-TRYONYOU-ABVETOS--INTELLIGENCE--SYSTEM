# ABVETOS Auto-Integration Script

Automated deployment orchestrator that monitors, integrates, and deploys ZIP packages from the INBOX directory.

## Overview

`abvetos_auto_integrate.sh` is a continuous monitoring script that automatically:
- Detects new ZIP files in the INBOX directory
- Extracts and integrates content with the repository
- Commits and pushes changes to GitHub
- Deploys to Vercel in production mode
- Sends Telegram notifications
- Archives processed files

## Prerequisites

### Required
- `git` - Version control
- `unzip` - ZIP file extraction
- `rsync` - Safe file synchronization
- `curl` - API communications
- `npx` or `vercel` - Vercel deployment CLI

### Git Credentials
The script requires authenticated Git access. Configure one of:
- SSH key with ssh-agent
- Git credential helper
- GitHub personal access token

## Configuration

### Environment Variables

```bash
# Required for Telegram notifications (optional)
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"

# Required for Vercel deployment with token (optional)
export VERCEL_TOKEN="your_vercel_token"
```

### Directory Structure

```
$HOME/
├── TRYONYOU_DEPLOY_EXPRESS_INBOX/      # Monitored directory for ZIP files
│   ├── _backup/                        # Processed ZIP archives
│   └── deploy_express_YYYYMMDD_HHMM.log  # Deployment logs
└── TRYONYOU_DEPLOY_WORKSPACE/          # Working directory for repository
```

## Usage

### Start the Orchestrator

```bash
# Run in foreground (for testing)
./abvetos_auto_integrate.sh

# Run in background
nohup ./abvetos_auto_integrate.sh &

# Run with systemd (recommended for production)
# Create /etc/systemd/system/abvetos-deploy.service
```

### Systemd Service Example

```ini
[Unit]
Description=ABVETOS Auto-Integration Orchestrator
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/repo
Environment="TELEGRAM_BOT_TOKEN=your_token"
Environment="TELEGRAM_CHAT_ID=your_chat_id"
Environment="VERCEL_TOKEN=your_token"
ExecStart=/path/to/repo/abvetos_auto_integrate.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Deploy a Package

1. Copy or move a ZIP file to the INBOX directory:
   ```bash
   cp my-package.zip $HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX/
   ```

2. The script will automatically (within 30 seconds):
   - Detect the ZIP file
   - Extract contents
   - Integrate with repository
   - Commit and push changes
   - Deploy to Vercel
   - Send notification
   - Archive the ZIP file

## Features

### Automatic Processing
- **Continuous monitoring** with 30-second intervals
- **Single-file processing** ensures data integrity
- **Sequential handling** of multiple ZIPs

### Git Integration
- Clones repository if not present
- Updates from remote before integration
- Sanitizes filenames for safe commit messages
- Automatic push to configured branch

### Deployment
- Production deployment to Vercel
- Token-based authentication support
- Graceful fallback without token
- Comprehensive error logging

### Notifications
- HTML-formatted Telegram messages
- Response validation for reliability
- Graceful degradation if not configured

### Logging
- Timestamped entries
- Color-coded console output
- Persistent log files
- Separate log per run

### Safety
- Automatic backup of processed files
- Error handling with `set -e`
- Credential validation
- Safe file operations with rsync

## Monitoring

### Check Logs
```bash
# View latest log
tail -f $HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX/deploy_express_*.log

# View all logs
ls -ltr $HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX/*.log
```

### Check Processed Files
```bash
# List archived ZIPs
ls -ltr $HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX/_backup/
```

### Check Service Status (if using systemd)
```bash
systemctl status abvetos-deploy
journalctl -u abvetos-deploy -f
```

## Troubleshooting

### Git Authentication Fails
- Verify Git credentials are configured
- Test manually: `git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git /tmp/test`
- Configure credential helper: `git config --global credential.helper store`

### Vercel Deployment Fails
- Ensure Vercel CLI is installed: `npm install -g vercel`
- Login manually: `vercel login`
- Or set `VERCEL_TOKEN` environment variable

### Telegram Notifications Not Sent
- Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set
- Test manually: `curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe"`
- Check bot has permission to send messages to the chat

### ZIP Not Processing
- Check ZIP file is in the correct directory
- Ensure ZIP file name doesn't start with '.' (hidden)
- Verify file permissions allow reading
- Check logs for extraction errors

## Security Considerations

- **Sensitive tokens** are loaded from environment variables only
- **No credentials** are hardcoded in the script
- **Log files** may contain repository information - secure appropriately
- **Workspace directory** contains full repository - protect file permissions
- **Git operations** use HTTPS - ensure credentials are secured

## Performance

- **Monitoring interval**: 30 seconds
- **Processing time**: Varies by package size and network speed
- **Resource usage**: Minimal when idle, increases during processing
- **Concurrent handling**: One ZIP at a time (intentional)

## Integration with Existing Scripts

Compatible with:
- `watch_deploy_express.sh` - Similar monitoring approach
- `inbox-watcher.sh` - Shared directory structure
- `notify_telegram.sh` - Same notification format
- `deploy_abvetos_dashboard.sh` - Deployment patterns

## License

Part of the TRYONME-TRYONYOU-ABVETOS Intelligence System.
