# Scripts

This directory contains automation scripts for the TRYONYOU project.

## deploy_flujo_345.sh

Automates the deployment of Flujo 345 by moving the package to the Deploy Express Inbox for processing.

### Purpose

This script implements the Flujo 345 deployment workflow:
1. Locates the `TRYONYOU_FLOW_345.zip` file
2. Moves it to `TRYONYOU_DEPLOY_EXPRESS_INBOX/`
3. Verifies the file is correctly placed
4. Sends a Telegram notification to the orchestrator

### Usage

```bash
# Basic usage (searches common locations)
bash scripts/deploy_flujo_345.sh

# Specify custom path
bash scripts/deploy_flujo_345.sh /path/to/TRYONYOU_FLOW_345.zip
```

### Features

- ✅ **Auto-discovery**: Automatically searches for the ZIP file in:
  - Project root directory
  - `$HOME/Desktop/`
  - `$HOME/Downloads/`
- ✅ **Backup**: Creates backup if file already exists in inbox
- ✅ **Verification**: Confirms file was moved successfully
- ✅ **Telegram notification**: Alerts orchestrator when ready
- ✅ **Detailed logging**: Creates timestamped logs in `logs/`

### Output

The script creates:
- Detailed console output with color-coded status
- Log file: `logs/flujo_345_deploy_TIMESTAMP.log`
- File in inbox: `TRYONYOU_DEPLOY_EXPRESS_INBOX/TRYONYOU_FLOW_345.zip`

### Environment Variables

Optional Telegram configuration:
```bash
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHAT_ID="your_chat_id"
```

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
