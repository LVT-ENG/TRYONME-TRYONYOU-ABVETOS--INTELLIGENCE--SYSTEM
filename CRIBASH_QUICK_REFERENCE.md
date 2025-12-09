# CribaSH 2.0 — Quick Reference Guide

## 🚀 Quick Start

```bash
chmod +x cribash2.0.sh
./cribash2.0.sh
```

## 📋 Interactive Prompts

During execution, the script will ask you:

1. **Origin folder path** (if ~/DeployExpress doesn't exist)
   - Provide the full path to your source folder
   - Press ENTER to cancel if you don't want to continue

2. **Move large files?** (if files >200MB are found)
   - Type `yes` to move them to `/tmp/TRYONYOU_LARGE_FILES/`
   - Type `no` to keep them in place

3. **Include ZIP?** (if ZIP file exists at `/mnt/data/archive_20251207_161946.zip`)
   - Type `yes` to copy it to ASSETS-DEMO/
   - Type `no` to skip it

4. **Repository URL**
   - Provide the full GitHub URL (e.g., `git@github.com:ORG/REPO.git`)
   - Press ENTER to skip Git operations and just create the clean folder + ZIP

5. **Create PR?** (if gh CLI is installed)
   - Type `yes` to automatically create a Pull Request
   - Type `no` to skip PR creation

## 📦 What You Get

After running the script successfully:

1. **Clean Folder**: `~/TRYONYOU_DEMO_CLEAN/`
   - Contains only essential files (html, js, ts, css, json, images)
   - Organized structure with src/, public/, ASSETS-DEMO/

2. **ZIP Archive**: `~/TRYONYOU_DEMO_CLEAN_YYYYMMDD_HHMMSS.zip`
   - Complete compressed package
   - Ready to share or deploy

3. **Git Branch**: `design/criba2.0` (if you provided repo URL)
   - Pushed to your repository
   - Contains the clean codebase

4. **Pull Request**: Automatically created (if you used gh and said yes)
   - Title: "CribaSH 2.0 — demo clean (TRYONYOU)"
   - Links to issue #1211

5. **AI Messages**: Ready to copy/paste
   - Message for Copilot
   - Message for Manus

## 🎯 Common Workflows

### Workflow 1: Full Process (Recommended)
```bash
./cribash2.0.sh
# Follow all prompts
# Provide GitHub repo URL
# Say yes to PR creation
```
**Result**: Clean folder + ZIP + Git push + PR + AI messages

### Workflow 2: Local Only
```bash
./cribash2.0.sh
# Follow file prompts
# Press ENTER when asked for repo URL
```
**Result**: Clean folder + ZIP only (no Git operations)

### Workflow 3: Git Without PR
```bash
./cribash2.0.sh
# Follow file prompts
# Provide GitHub repo URL
# Say no to PR creation
```
**Result**: Clean folder + ZIP + Git push (no PR)

## ⚙️ Customization

Edit variables at the top of `cribash2.0.sh`:

```bash
ORIG="${HOME}/DeployExpress"           # Change source folder
LIMPIO="${HOME}/TRYONYOU_DEMO_CLEAN"  # Change destination folder
BRANCH="design/criba2.0"               # Change branch name
ZIP_PATH="/mnt/data/archive_20251207_161946.zip"  # Change ZIP path
ASSETS_DIR="ASSETS-DEMO"               # Change assets folder name
```

## 🔍 File Type Filters

### ✅ Included Files:
- HTML/HTM
- JavaScript (JS, JSX)
- TypeScript (TS, TSX)
- CSS, SCSS
- JSON
- Images: PNG, JPG, JPEG, SVG, WebP, GIF, ICO

### ❌ Excluded Files:
- node_modules/
- .git/
- dist/, build/
- *.log, *.tmp, *.bak
- .DS_Store
- Videos: MP4, MOV, AVI, MKV
- Archives: ZIP, DMG, ISO

## 📊 Output Messages

### For Copilot:
```
Copilot: usa el contenido del repo [URL]/tree/design/criba2.0/ASSETS-DEMO 
y la raíz del branch design/criba2.0 para reconstruir la demo navegable 
y la landing. Usa sólo los assets en ASSETS-DEMO y el código en la raíz. 
Documento de referencia: Issue LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1211.
```

### For Manus:
```
Manus: escanea el repo [URL]/tree/design/criba2.0 y genera todos los 
assets faltantes (PNGs/Renders/SVGs) y los mockups listos para integración. 
Entrega un ZIP con los assets listos en la misma estructura. 
Usa la guía visual en brand-guidelines/.
```

## ⚠️ Important Notes

- **Backup First**: The script doesn't modify your source folder (except when moving large files if you confirm)
- **Force Push**: Uses `git push --force`, which will overwrite remote branch if it exists
- **Clean Destination**: Removes `~/TRYONYOU_DEMO_CLEAN` if it exists before starting
- **Empty Dirs**: Automatically removes empty directories in the clean copy

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "rsync not found" | Install: `brew install rsync` (macOS) or `sudo apt install rsync` (Linux) |
| "zip not found" | Install: `brew install zip` (macOS) or `sudo apt install zip` (Linux) |
| "gh not found" | Install GitHub CLI (optional): `brew install gh` or see https://cli.github.com/ |
| Script doesn't run | Make it executable: `chmod +x cribash2.0.sh` |
| Permission denied | Check folder permissions or run with appropriate rights |

## 📞 Support

For issues or questions:
- Check the full documentation: `CRIBASH_2.0_README.md`
- Reference: Issue #1211, #1216
- Repository: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

---

**Version**: 2.0  
**Last Updated**: December 2024
