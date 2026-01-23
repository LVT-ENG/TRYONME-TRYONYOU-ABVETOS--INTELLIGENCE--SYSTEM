# TRYONYOU Integration Script Guide

## Overview

The `integrate_tryonyou.sh` script is a comprehensive automation tool designed to integrate multiple TRYONYOU components from ZIP archives into the main repository. It handles extraction, merging, and Git integration with robust error handling.

## Features

- ✅ **Safe extraction** of multiple ZIP archives
- ✅ **Smart directory merging** with conflict resolution
- ✅ **Git integration** (clone or update existing repo)
- ✅ **Automatic structure verification**
- ✅ **Detailed integration report** generation
- ✅ **Comprehensive error handling** and logging
- ✅ **Configurable via environment variables**

## Prerequisites

The script requires the following commands:
- `unzip` - For extracting ZIP archives
- `git` - For repository operations
- `rsync` - For efficient file copying
- `bash` - Version 4.0 or higher

## Usage

### Basic Usage

```bash
./integrate_tryonyou.sh
```

### Custom Configuration

You can customize the behavior using environment variables:

```bash
# Custom working directory
export WORKDIR="/path/to/your/workspace"

# Custom assets directory where ZIPs are located
export ASSETS_DIR="/path/to/your/zips"

# Custom ZIP file names
export MAIN_ZIP="your_pilot.zip"
export CLEAN_ZIP="your_clean_app.zip"
export ENGINE_ZIP="your_engine.zip"

# Run the script
./integrate_tryonyou.sh
```

## Configuration Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `WORKDIR` | `$PWD/TRYONYOU_INTEGRATION` | Working directory for integration |
| `ASSETS_DIR` | `/mnt/data` | Directory containing ZIP files |
| `MAIN_ZIP` | `TRYONYOU_PILOT_COMPLETE.zip` | Main pilot ZIP file |
| `CLEAN_ZIP` | `TRYONYOU_APP_CLEAN_DRS.zip` | Clean app ZIP file |
| `ENGINE_ZIP` | `jules_session_*_motor-recomendacion-core-*.zip` | Engine ZIP file |
| `GITHUB_REPO` | `https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM` | Repository URL |
| `MAIN_DIR_NAME` | `TRYONYOU_PILOT_COMPLETE` | Main directory name in pilot ZIP |

## What the Script Does

### 1. **Verification Phase**
- Checks for required commands
- Verifies ZIP files exist
- Creates working directory

### 2. **Extraction Phase**
- Extracts Main Pilot ZIP
- Extracts Clean App ZIP  
- Extracts Engine ZIP
- Each extraction is independent (missing files are skipped with warnings)

### 3. **Repository Phase**
- Clones repository if not present
- Updates existing repository
- Prepares for integration

### 4. **Integration Phase**
- Merges pilot content into repository
- Integrates clean app components (src/, public/)
- Integrates recommendation engine
- Creates standard directory structure

### 5. **Reporting Phase**
- Generates `INTEGRATION_REPORT.md`
- Shows statistics
- Provides next steps

## Directory Merging Modes

The `safe_copy_dir` function supports three modes:

### `merge` (default)
Copies files from source to destination, keeping existing files:
```bash
safe_copy_dir "$src" "$dest" "merge"
```

### `overwrite`
Removes destination and copies source completely:
```bash
safe_copy_dir "$src" "$dest" "overwrite"
```

### `skip`
Only copies if destination is empty:
```bash
safe_copy_dir "$src" "$dest" "skip"
```

## Output

After successful execution, you'll find:

- **Working Directory**: `$WORKDIR/` containing:
  - `main_pilot/` - Extracted pilot files
  - `clean_app/` - Extracted clean app
  - `engine/` - Extracted engine
  - `repo/` - Updated repository with integrated content

- **Integration Report**: `$WORKDIR/repo/INTEGRATION_REPORT.md`

## Example Session

```bash
$ ./integrate_tryonyou.sh

✅ 🚀 INICIANDO INTEGRACIÓN TRYONYOU
✅ 📁 Preparando directorio de trabajo: /home/user/TRYONYOU_INTEGRATION
✅ 🔍 Verificando archivos ZIP...
✅ Encontrado: /mnt/data/TRYONYOU_PILOT_COMPLETE.zip
✅ 📦 Extrayendo archivos...
✅ Extrayendo: /mnt/data/TRYONYOU_PILOT_COMPLETE.zip -> /home/user/TRYONYOU_INTEGRATION/main_pilot
✅ ✓ Piloto principal extraído
...
✅ 🎉 INTEGRACIÓN COMPLETADA
✅ 📍 Repositorio: /home/user/TRYONYOU_INTEGRATION/repo
✅ 📄 Reporte: /home/user/TRYONYOU_INTEGRATION/repo/INTEGRATION_REPORT.md
```

## Next Steps After Integration

1. **Review Changes**:
   ```bash
   cd $WORKDIR/repo
   git status
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build Project**:
   ```bash
   npm run build
   ```

4. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Integración TRYONYOU piloto completo"
   ```

5. **Push to Repository**:
   ```bash
   git push origin main
   ```

## Troubleshooting

### ZIP Files Not Found
```
⚠️  No se encuentra: /mnt/data/TRYONYOU_PILOT_COMPLETE.zip (se omitirá si existe)
```
**Solution**: Set `ASSETS_DIR` to the correct path where your ZIP files are located.

### Git Clone Failed
```
❌ Error al clonar repositorio
```
**Solution**: Check your network connection and GitHub access. Ensure you have proper permissions.

### Missing Commands
```
❌ Falta el comando 'unzip'. Instálalo y reintenta.
```
**Solution**: Install the required command:
- Ubuntu/Debian: `sudo apt-get install unzip rsync`
- macOS: `brew install unzip rsync`

## Advanced Usage

### Dry Run
To see what would happen without making changes, you can test individual functions:

```bash
# Source the script
source integrate_tryonyou.sh

# Test a function
safe_copy_dir "/source/path" "/dest/path" "merge"
```

### Custom Integration Logic
The script is modular and can be sourced to use individual functions in your own scripts:

```bash
#!/usr/bin/env bash
source integrate_tryonyou.sh

# Use helper functions
log "Starting custom integration"
ensure_cmd unzip
safe_extract "/path/to/file.zip" "/extract/to"
```

## Safety Features

- ✅ **`set -euo pipefail`**: Exits on any error
- ✅ **Path validation**: Checks source directories exist before copying
- ✅ **Conflict resolution**: Supports multiple merge strategies
- ✅ **Comprehensive logging**: Clear messages for each step
- ✅ **Non-destructive by default**: Uses merge mode to preserve existing files

## Support

For issues or questions:
1. Check the `INTEGRATION_REPORT.md` generated after running
2. Review the script output for specific error messages
3. Open an issue in the GitHub repository

## License

This script is part of the TRYONYOU project and follows the same license.
