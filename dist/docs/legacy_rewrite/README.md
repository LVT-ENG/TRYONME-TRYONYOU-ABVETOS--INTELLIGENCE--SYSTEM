# Legacy Rewrite Import Directory

This directory is used by the **Deploy Express Automator** script to store imported files from iCloud Drive.

## Structure

Each import creates a timestamped subdirectory:

```
docs/legacy_rewrite/
├── import_2025-10-20_08-30-00/
│   ├── IMPORT_LOG.txt
│   ├── file1.zip
│   ├── file2.js
│   └── ...
├── import_2025-10-20_14-15-30/
│   ├── IMPORT_LOG.txt
│   └── ...
└── README.md (this file)
```

## Import Log

Each import directory contains an `IMPORT_LOG.txt` file with:
- Timestamp of import
- Project information
- Number of files imported
- List of imported files

## Automated by

`deploy_express.sh` - TRYONYOU Deploy Express Automator
