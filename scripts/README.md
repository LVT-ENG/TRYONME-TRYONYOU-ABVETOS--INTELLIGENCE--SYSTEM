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
