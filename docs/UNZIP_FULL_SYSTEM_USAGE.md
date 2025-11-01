# TRYONYOU Full System Package Extraction

## Overview

This document describes the usage of the `unzip_full_system.sh` script for extracting TRYONYOU_FULL_SYSTEM packages to the `_incoming/` directory.

## Script Location

```
scripts/unzip_full_system.sh
```

## Purpose

The script automates the extraction of TRYONYOU_FULL_SYSTEM packages, providing:
- Automatic directory creation
- ZIP file integrity verification
- Detailed logging
- Metadata generation
- Error handling

## Usage

### Basic Usage (Default File)

Extract the default file `TRYONYOU_FULL_SYSTEM_2025-10-31.zip`:

```bash
./scripts/unzip_full_system.sh
```

### Custom ZIP File

Extract a different ZIP file by providing its name as an argument:

```bash
./scripts/unzip_full_system.sh TRYONYOU_FULL_SYSTEM_2025-11-01.zip
```

You can also provide a full path:

```bash
./scripts/unzip_full_system.sh /path/to/custom_package.zip
```

## Command Equivalent

The script executes the equivalent of:

```bash
unzip -o TRYONYOU_FULL_SYSTEM_2025-10-31.zip -d ./_incoming/
```

With additional features:
- Pre-flight validation
- Integrity checking
- Comprehensive logging
- Metadata generation

## Directory Structure

```
.
├── _incoming/                          # Extraction target directory
│   ├── README.md                       # Directory documentation
│   ├── .gitkeep                        # Ensures directory exists in git
│   ├── .extraction_metadata.txt       # Metadata from last extraction
│   └── [extracted files]              # Files from ZIP package
├── logs/
│   └── unzip_full_system.log          # Detailed operation log
└── scripts/
    └── unzip_full_system.sh           # This script
```

## Features

### 1. Automatic Directory Creation

The script automatically creates the `_incoming/` directory if it doesn't exist.

### 2. ZIP Integrity Verification

Before extraction, the script verifies the ZIP file is valid and not corrupted.

### 3. Overwrite Mode

Uses the `-o` flag to overwrite existing files without prompting, matching the issue requirement.

### 4. Detailed Logging

All operations are logged to:
- Console (with color-coded output)
- Log file: `logs/unzip_full_system.log`

### 5. Extraction Metadata

Creates `.extraction_metadata.txt` with:
- Timestamp
- ZIP file information
- Extraction location
- Status

## Exit Codes

- `0`: Success
- `1`: Error (missing file, corrupted ZIP, extraction failure, etc.)

## Examples

### Example 1: First Time Extraction

```bash
$ ./scripts/unzip_full_system.sh

ℹ️  [2025-11-01 00:35:45] Starting TRYONYOU Full System Package extraction
ℹ️  [2025-11-01 00:35:45] Script directory: /path/to/scripts
ℹ️  [2025-11-01 00:35:45] Repository root: /path/to/repo
ℹ️  [2025-11-01 00:35:45] Found ZIP file: /path/to/TRYONYOU_FULL_SYSTEM_2025-10-31.zip
ℹ️  [2025-11-01 00:35:45] File size: 4.0K
✅ [2025-11-01 00:35:45] ZIP file integrity verified
ℹ️  [2025-11-01 00:35:45] Extracting to: /path/to/_incoming/
✅ [2025-11-01 00:35:45] Extraction completed successfully
ℹ️  [2025-11-01 00:35:45] Extracted contents:
ℹ️  [2025-11-01 00:35:45]   -rw-rw-r-- 1 user user 174 Nov  1 00:34 README.md
ℹ️  [2025-11-01 00:35:45]   -rw-rw-r-- 1 user user  12 Nov  1 00:35 module.json
✅ [2025-11-01 00:35:45] All operations completed successfully
```

### Example 2: Custom File Extraction

```bash
$ ./scripts/unzip_full_system.sh TRYONYOU_FULL_SYSTEM_2025-12-01.zip

ℹ️  [2025-12-01 10:00:00] Starting TRYONYOU Full System Package extraction
ℹ️  [2025-12-01 10:00:00] Found ZIP file: /path/to/TRYONYOU_FULL_SYSTEM_2025-12-01.zip
✅ [2025-12-01 10:00:00] Extraction completed successfully
```

### Example 3: Error Handling

```bash
$ ./scripts/unzip_full_system.sh missing_file.zip

ℹ️  [2025-11-01 00:40:00] Starting TRYONYOU Full System Package extraction
❌ [2025-11-01 00:40:00] ZIP file not found: missing_file.zip
ℹ️  [2025-11-01 00:40:00] Searched in:
ℹ️  [2025-11-01 00:40:00]   - /path/to/repo/missing_file.zip
ℹ️  [2025-11-01 00:40:00]   - missing_file.zip
```

## Integration with Existing Automation

This script follows the same patterns as other scripts in the repository:

- Similar to `scripts/classify_and_process.sh` for file processing
- Compatible with `scripts/inbox-watcher.sh` workflow
- Follows the logging standards used in `scripts/deploy_abvetos_dashboard.sh`

## Requirements

- `bash` (or compatible shell)
- `unzip` command (install via `apt install unzip` or `brew install unzip`)

## Troubleshooting

### ZIP file not found

Ensure the ZIP file is in the repository root or provide the full path:

```bash
./scripts/unzip_full_system.sh /full/path/to/file.zip
```

### Permission denied

Make sure the script is executable:

```bash
chmod +x scripts/unzip_full_system.sh
```

### Corrupted ZIP file

The script will detect and report corrupted ZIP files before attempting extraction.

## Notes

- The `_incoming/` directory contents (except README.md) are gitignored
- Each extraction overwrites previous files with the same name
- Extraction metadata is preserved for reference
- All operations are logged for audit purposes
