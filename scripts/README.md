# Scripts

This directory contains automation scripts for the TRYONYOU project.

## clean-merge-repos.js

Creates a clean, distributable version of the TRYONYOU project by:

1. **Including Essential Files**: Copies all important project files and directories
   - Source code (`src/`)
   - Public assets (`public/`)
   - Documentation (`docs/`)
   - Configuration files (`package.json`, `vite.config.js`, etc.)
   - GitHub workflows (`.github/`)

2. **Excluding Build Artifacts**: Automatically excludes:
   - `node_modules/`
   - Build outputs (`dist/`, `build/`)
   - Git history (`.git/`)
   - Environment files (`.env*`)
   - Log files (`*.log`)
   - Temporary files

3. **Creating Archive**: Generates a compressed ZIP file (`tryonyou-clean.zip`) with maximum compression

### Usage

```bash
# Run locally
node scripts/clean-merge-repos.js

# The script will create tryonyou-clean.zip in the project root
```

### Automated Execution

This script runs automatically via GitHub Actions when:
- Code is pushed to the `main` branch
- A pull request is created or updated targeting `main`

The workflow will:
1. Install dependencies
2. Run the clean-merge script
3. Upload the resulting ZIP as a GitHub Actions artifact
4. Send a Telegram notification with the download link

### Output

The script generates detailed logs showing:
- Which files and directories are being included
- Which items are being skipped
- Final archive size
- Location of the generated ZIP file

## abvetos_auto_integrate.sh

Automated deployment orchestrator that monitors an inbox directory for ZIP files, extracts and integrates them into the repository, deploys to Vercel, and sends Telegram notifications.

### Features

- **Automatic ZIP Detection**: Continuously monitors the INBOX directory for new ZIP files
- **Extraction & Integration**: Unzips files and integrates them into the workspace
- **Git Operations**: Commits and pushes changes to GitHub automatically
- **Vercel Deployment**: Triggers production deployment using Vercel CLI
- **Telegram Notifications**: Sends status updates to configured Telegram bot
- **Backup Management**: Archives processed ZIP files to prevent reprocessing
- **Comprehensive Logging**: Detailed logs for troubleshooting and auditing

### Configuration

The script uses environment variables for configuration:

```bash
# Required for Git operations
REPO="LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"  # GitHub repository
BRANCH="main"                                                    # Target branch

# Optional: Override default paths
INBOX="$HOME/TRYONYOU_DEPLOY_EXPRESS_INBOX"                    # ZIP files location
WORKDIR="$HOME/TRYONYOU_DEPLOY_WORKSPACE"                      # Workspace directory

# Optional: Telegram notifications
TELEGRAM_BOT_TOKEN="your_bot_token"                            # Telegram bot token
TELEGRAM_CHAT_ID="your_chat_id"                                # Telegram chat ID

# Optional: Vercel deployment
VERCEL_TOKEN="your_vercel_token"                               # Vercel authentication token
```

### Usage

```bash
# Basic usage (uses default environment variables)
./scripts/abvetos_auto_integrate.sh

# With custom configuration
INBOX=/custom/inbox WORKDIR=/custom/workspace ./scripts/abvetos_auto_integrate.sh

# Run in background
nohup ./scripts/abvetos_auto_integrate.sh > /dev/null 2>&1 &
```

### Prerequisites

- `unzip` - For extracting ZIP files
- `git` - For version control operations
- `curl` - For Telegram notifications
- `npx` or `vercel` CLI - For Vercel deployments (optional)

Install missing dependencies:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install unzip git curl

# Install Vercel CLI
npm install -g vercel
```

### Workflow

1. **Monitor**: Scans INBOX directory every 30 seconds for new ZIP files
2. **Extract**: Unzips the first detected file to a temporary directory
3. **Integrate**: Copies extracted files to the workspace
4. **Commit**: Creates a Git commit with timestamp and filename
5. **Push**: Pushes changes to the configured GitHub repository
6. **Deploy**: Triggers Vercel production deployment
7. **Notify**: Sends success notification to Telegram
8. **Backup**: Moves processed ZIP to `_backup` subdirectory
9. **Repeat**: Returns to monitoring for next file

### Logging

Logs are written to:
- Console output with colored formatting
- Log file: `$INBOX/deploy_express_YYYYMMDD_HHMM.log`

### Security Notes

- Store sensitive tokens in environment variables, never in code
- Use `.gitignore` to exclude log files and backup directories
- Ensure proper file permissions on the script (executable for owner only)
- Consider using systemd or supervisor for production deployments

### Troubleshooting

**Script doesn't start:**
- Check if directories exist and are writable
- Verify all prerequisites are installed

**Git operations fail:**
- Configure git credentials: `git config --global user.name "Your Name"`
- Set up authentication for GitHub (SSH keys or PAT)

**Vercel deployment skipped:**
- Verify `VERCEL_TOKEN` is set
- Ensure Vercel CLI is installed: `npm install -g vercel`
- Check if the project is linked: `vercel link`

**Telegram notifications not sent:**
- Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set correctly
- Test bot manually: `curl -X POST "https://api.telegram.org/bot<TOKEN>/getMe"`
