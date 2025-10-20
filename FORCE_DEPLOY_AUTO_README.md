# 🚀 Force Deploy Auto Script

## Overview

`force_deploy_auto.sh` is an automated deployment script for the TRYONYOU project that watches a designated directory for new ZIP files and automatically:

1. Extracts the ZIP file contents
2. Syncs them with your local repository
3. Commits and pushes changes to GitHub
4. Deploys to Vercel production

## Prerequisites

### Required Software

- **fswatch**: File system monitoring tool
  - macOS: `brew install fswatch`
  - Linux: `sudo apt-get install fswatch`
  
- **Git**: Version control
  - Must be configured with `user.name` and `user.email`
  - Must have push access to the repository
  
- **Vercel CLI**: Deployment tool
  - Install: `npm install -g vercel`
  - Must be authenticated: `vercel login`

- **rsync**: File synchronization (usually pre-installed on macOS/Linux)

### Required Environment Variables

```bash
# Required
export VERCEL_TOKEN="your_vercel_token_here"

# Optional (defaults provided)
export VERCEL_ORG_ID="team_rubenespinarrodri"
export VERCEL_PROJECT_ID="prj_5cvRv3TeZFOnSlixHu1QC8q9DHI1"
export WATCH_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
export REPO_PATH="$HOME/TRYONYOU_PROJECT"
```

## Setup

### 1. Get Your Vercel Token

```bash
# Option 1: Via Vercel CLI
vercel whoami

# Option 2: From Vercel Dashboard
# Go to: https://vercel.com/account/tokens
# Create a new token with appropriate permissions
```

### 2. Configure Environment Variables

Add to your `~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`:

```bash
# TRYONYOU Force Deploy Auto Configuration
export VERCEL_TOKEN="your_actual_token_here"
export VERCEL_ORG_ID="team_rubenespinarrodri"
export VERCEL_PROJECT_ID="prj_5cvRv3TeZFOnSlixHu1QC8q9DHI1"
export WATCH_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"
export REPO_PATH="$HOME/TRYONYOU_PROJECT"
```

Reload your shell configuration:

```bash
source ~/.bashrc  # or ~/.zshrc
```

### 3. Verify Git Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. Ensure Repository Exists

```bash
# Clone or verify the repository exists at REPO_PATH
cd "$HOME/TRYONYOU_PROJECT" || git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git "$HOME/TRYONYOU_PROJECT"
```

## Usage

### Starting the Auto-Deploy Watcher

```bash
# From the repository root
./force_deploy_auto.sh
```

The script will:
1. Validate all prerequisites
2. Create the watch directory if it doesn't exist
3. Start monitoring for new ZIP files
4. Process each ZIP file automatically

### Stopping the Watcher

Press `Ctrl+C` to gracefully stop the watcher.

## How It Works

### Workflow

```
┌─────────────────────────────────────────────────┐
│  1. New ZIP file appears in watch directory     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  2. Extract ZIP to temporary directory          │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  3. Sync contents to repository (rsync)         │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  4. Git add, commit, and push                   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  5. Deploy to Vercel production                 │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  6. Cleanup temporary files                     │
└─────────────────────────────────────────────────┘
```

### File Processing

1. **Detection**: `fswatch` monitors the watch directory for any changes
2. **Filtering**: Only `.zip` files trigger the deployment process
3. **Extraction**: ZIP files are extracted to a timestamped temporary directory
4. **Synchronization**: `rsync` copies files while preserving the `.git` directory
5. **Version Control**: Changes are committed with an auto-generated message
6. **Deployment**: Vercel CLI deploys to production
7. **Logging**: All operations are logged to `auto_deploy.log`

## Logging

Logs are written to: `$WATCH_DIR/auto_deploy.log`

Log format:
```
[INFO] 2025-10-20 10:30:45 - 🔄 Watching directory for new ZIPs...
[INFO] 2025-10-20 10:35:12 - 📦 New file detected: update_v1.2.3.zip
[SUCCESS] 2025-10-20 10:35:15 - Extraction complete
[SUCCESS] 2025-10-20 10:35:18 - Sync complete
[SUCCESS] 2025-10-20 10:35:22 - Changes committed
[SUCCESS] 2025-10-20 10:35:28 - Push complete
[SUCCESS] 2025-10-20 10:36:45 - Vercel deployment complete
[SUCCESS] 2025-10-20 10:36:46 - ✅ Deployment finished for update_v1.2.3.zip
```

## Troubleshooting

### Common Issues

#### 1. `fswatch: command not found`

**Solution**: Install fswatch
```bash
# macOS
brew install fswatch

# Linux
sudo apt-get install fswatch
```

#### 2. `VERCEL_TOKEN environment variable is not set`

**Solution**: Set the environment variable
```bash
export VERCEL_TOKEN="your_vercel_token"
# Add to ~/.bashrc or ~/.zshrc for persistence
```

#### 3. Git push fails

**Solution**: 
- Ensure you have push access to the repository
- Check if SSH keys are set up correctly
- Verify remote URL: `git remote -v`

#### 4. Vercel deployment fails

**Solution**:
- Verify Vercel token is valid: `vercel whoami`
- Check project ID and org ID are correct
- Ensure you have deployment permissions for the project

#### 5. "Repository path is not a git repository"

**Solution**: 
```bash
cd "$REPO_PATH"
git init  # If starting fresh, or
git clone <repository-url> "$REPO_PATH"  # If cloning
```

## Security Considerations

### ⚠️ Important Security Notes

1. **Never commit tokens**: The script uses environment variables to avoid hardcoding sensitive data
2. **Token permissions**: Limit Vercel token permissions to only what's needed
3. **File validation**: Only ZIP files are processed, reducing potential attack vectors
4. **Log security**: Logs may contain file paths; ensure appropriate access controls
5. **Environment isolation**: Use separate tokens for development and production

### Best Practices

- Rotate Vercel tokens regularly
- Use team tokens instead of personal tokens for shared projects
- Monitor the watch directory for unauthorized access
- Review deployment logs regularly
- Set up alerts for failed deployments

## Advanced Configuration

### Custom Watch Directory

```bash
export WATCH_DIR="/path/to/your/custom/directory"
./force_deploy_auto.sh
```

### Different Repository Path

```bash
export REPO_PATH="/path/to/your/repo"
./force_deploy_auto.sh
```

### Running as a Background Service

#### Using systemd (Linux)

Create `/etc/systemd/system/tryonyou-auto-deploy.service`:

```ini
[Unit]
Description=TRYONYOU Auto Deploy Service
After=network.target

[Service]
Type=simple
User=yourusername
Environment="VERCEL_TOKEN=your_token"
Environment="WATCH_DIR=/path/to/watch/dir"
Environment="REPO_PATH=/path/to/repo"
ExecStart=/path/to/force_deploy_auto.sh
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable tryonyou-auto-deploy
sudo systemctl start tryonyou-auto-deploy
sudo systemctl status tryonyou-auto-deploy
```

#### Using launchd (macOS)

Create `~/Library/LaunchAgents/com.tryonyou.autodeploy.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.tryonyou.autodeploy</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/force_deploy_auto.sh</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>VERCEL_TOKEN</key>
        <string>your_token_here</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Load and start:
```bash
launchctl load ~/Library/LaunchAgents/com.tryonyou.autodeploy.plist
launchctl start com.tryonyou.autodeploy
```

## Integration with Existing Scripts

This script complements existing deployment scripts:

- **tryonyou_full_auto.sh**: Complete setup and deployment
- **deploy.sh**: Quick manual deployment
- **scripts/auto-version-deploy.sh**: Versioned deployments
- **force_deploy_auto.sh**: Automated continuous deployment

## Support

For issues or questions:
- **Repository**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- **Documentation**: See repository docs/
- **Logs**: Check `$WATCH_DIR/auto_deploy.log`

## License

Part of the TRYONYOU – ABVETOS Intelligence System project.
