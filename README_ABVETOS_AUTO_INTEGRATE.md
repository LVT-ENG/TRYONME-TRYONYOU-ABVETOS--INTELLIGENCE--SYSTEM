# ABVETOS Auto-Integration Quick Start

This guide will help you quickly set up and run the `abvetos_auto_integrate.sh` automation script.

## Prerequisites

Install required tools:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install unzip git curl

# Install Node.js and Vercel CLI (optional, for Vercel deployments)
npm install -g vercel
```

## Setup

### 1. Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Set Environment Variables

Create a `.env` file or export variables:

```bash
# Required for Telegram notifications (optional)
export TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
export TELEGRAM_CHAT_ID="your_telegram_chat_id"

# Required for Vercel deployment (optional)
export VERCEL_TOKEN="your_vercel_token"

# Optional: Custom paths
export INBOX="$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"
export WORKDIR="$HOME/TRYONYOU_DEPLOY_WORKSPACE"
```

### 3. Create Required Directories

```bash
mkdir -p "$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"
mkdir -p "$HOME/TRYONYOU_DEPLOY_WORKSPACE"
```

## Running the Script

### Foreground Mode (for testing)

```bash
./scripts/abvetos_auto_integrate.sh
```

Press `Ctrl+C` to stop.

### Background Mode (for production)

```bash
# Start in background
nohup ./scripts/abvetos_auto_integrate.sh > /dev/null 2>&1 &

# Save the process ID
echo $! > /tmp/abvetos_auto_integrate.pid

# Check if running
ps -p $(cat /tmp/abvetos_auto_integrate.pid)

# Stop the process
kill $(cat /tmp/abvetos_auto_integrate.pid)
```

### Using systemd (recommended for servers)

Create `/etc/systemd/system/abvetos-auto-integrate.service`:

```ini
[Unit]
Description=ABVETOS Auto-Integration Service
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/repo
Environment="TELEGRAM_BOT_TOKEN=your_token"
Environment="TELEGRAM_CHAT_ID=your_chat_id"
Environment="VERCEL_TOKEN=your_vercel_token"
ExecStart=/path/to/repo/scripts/abvetos_auto_integrate.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable abvetos-auto-integrate
sudo systemctl start abvetos-auto-integrate

# Check status
sudo systemctl status abvetos-auto-integrate

# View logs
sudo journalctl -u abvetos-auto-integrate -f
```

## Usage

1. **Drop ZIP files** into the INBOX directory:
   ```bash
   cp myupdate.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/
   ```

2. **Monitor logs** to see the processing:
   ```bash
   tail -f ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/deploy_express_*.log
   ```

3. **Check backup** to verify processed files:
   ```bash
   ls -lh ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/_backup/
   ```

## Troubleshooting

### Script doesn't start

```bash
# Check permissions
chmod +x scripts/abvetos_auto_integrate.sh

# Check syntax
bash -n scripts/abvetos_auto_integrate.sh
```

### Git operations fail

```bash
# Set up git credentials
git config --global credential.helper store

# Or use SSH keys
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add the public key to GitHub
```

### Vercel deployment fails

```bash
# Login to Vercel
vercel login

# Link the project
cd ~/TRYONYOU_DEPLOY_WORKSPACE
vercel link

# Get token
vercel --token
```

### No Telegram notifications

```bash
# Test the bot
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"

# Test sending a message
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="Test message"
```

## Monitoring

### Check if script is running

```bash
ps aux | grep abvetos_auto_integrate.sh
```

### View recent logs

```bash
ls -lht ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/deploy_express_*.log | head -5
```

### Monitor in real-time

```bash
tail -f ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/deploy_express_*.log
```

## Security Best Practices

1. **Never commit tokens** to the repository
2. **Use environment variables** for sensitive data
3. **Restrict file permissions** on the script and directories
4. **Regularly rotate tokens** and credentials
5. **Monitor logs** for suspicious activity

## Support

For more detailed documentation, see:
- `scripts/README.md` - Complete script documentation
- `scripts/abvetos_auto_integrate.sh` - Source code with comments

For issues or questions, please open an issue in the repository.
