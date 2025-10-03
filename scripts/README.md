# Scripts Directory

This directory contains utility scripts for the TRYONYOU project.

## clean-merge-repos.js

Automated agent for merging legacy repositories into a master repository and cleaning the code.

### Purpose

This script:
1. Scans multiple legacy repositories (TryonViewApp, Ultra, Plus, Legacy)
2. Merges them into a master TRYONYOU-MASTER directory
3. Filters out unnecessary/duplicate files
4. Creates a compressed ZIP archive of the clean repository

### Usage

```bash
npm run clean-merge
```

### Configuration

The script expects the following directory structure:

```
/proyectos/
├── TRYONYOU-MASTER/          # Master repository (will be created if doesn't exist)
├── TryonViewApp/             # Legacy repo 1
├── Ultra/                    # Legacy repo 2
├── Plus/                     # Legacy repo 3
└── Legacy/                   # Legacy repo 4
```

### Features

- **Smart File Filtering**: Ignores unnecessary files (middleware.ts, sparkles.css, old-theme.css, test files, tmp directories, .DS_Store)
- **Intelligent Merging**: Compares file sizes and keeps the larger/better version when duplicates exist
- **ZIP Compression**: Creates a compressed archive of the cleaned repository with maximum compression (level 9)

### Output

- **TRYONYOU-MASTER/**: Merged and cleaned repository directory
- **tryonyou-clean.zip**: Compressed archive of the clean repository

### Target Structure

The script is designed to work with the following final structure:
- apps/web
- apps/api
- packages/shared
- docs
- .github/workflows
