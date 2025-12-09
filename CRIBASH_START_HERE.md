# 🚀 CribaSH 2.0 — Start Here

Welcome to **CribaSH 2.0**, the smart cleanup system for TRYONYOU projects!

## Quick Start (2 steps)

```bash
# 1. Make executable
chmod +x cribash2.0.sh

# 2. Run it
./cribash2.0.sh
```

That's it! The script will guide you through the rest.

## What is CribaSH 2.0?

CribaSH 2.0 is an intelligent bash script that creates clean, optimized copies of your TRYONYOU projects by:

- ✅ Filtering only essential files (html, js, ts, css, json, images)
- ✅ Removing build artifacts, dependencies, and unnecessary files
- ✅ Detecting and managing large files (>200MB)
- ✅ Creating timestamped ZIP archives
- ✅ Initializing Git and pushing to a custom branch
- ✅ Optionally creating Pull Requests via GitHub CLI
- ✅ Generating ready-made messages for AI assistants (Copilot & Manus)

## Which Document Should I Read?

Pick the right guide for your needs:

### 🎯 I Just Want to Use It
→ Read: **[CRIBASH_QUICK_REFERENCE.md](CRIBASH_QUICK_REFERENCE.md)**  
Perfect for: Quick workflows and common use cases

### �� I Want Full Documentation
→ Read: **[CRIBASH_2.0_README.md](CRIBASH_2.0_README.md)**  
Perfect for: Understanding all features, requirements, and configuration

### 💡 I Want Step-by-Step Examples
→ Read: **[CRIBASH_EXAMPLES.md](CRIBASH_EXAMPLES.md)**  
Perfect for: Learning through detailed tutorials and real scenarios

### 📊 I Want the Technical Summary
→ Read: **[CRIBASH_IMPLEMENTATION_SUMMARY.md](CRIBASH_IMPLEMENTATION_SUMMARY.md)**  
Perfect for: Technical details, statistics, and implementation info

## What You'll Get

After running CribaSH 2.0:

1. **Clean Folder**: `~/TRYONYOU_DEMO_CLEAN/`
   - Only essential files
   - Organized structure
   - Ready for deployment

2. **ZIP Archive**: `~/TRYONYOU_DEMO_CLEAN_[timestamp].zip`
   - Complete package
   - Easy to share
   - Timestamped

3. **Git Branch**: `design/criba2.0`
   - Pushed to remote
   - Ready for PR
   - Clean history

4. **Pull Request**: (if you use GitHub CLI)
   - Auto-created
   - Pre-filled description
   - Linked to issues

5. **AI Messages**: Ready to copy/paste
   - Message for Copilot
   - Message for Manus
   - Proper URLs and references

## Interactive Workflow

The script asks you 5 simple questions:

1. **Source folder?** (if ~/DeployExpress doesn't exist)
2. **Move large files?** (if any >200MB detected)
3. **Include ZIP?** (if optional ZIP file exists)
4. **Git repository URL?** (for Git operations)
5. **Create PR?** (if GitHub CLI is installed)

Answer as you go — it's that simple!

## Files Included

```
cribash2.0.sh                      - Main script (executable)
CRIBASH_START_HERE.md             - This file
CRIBASH_QUICK_REFERENCE.md        - Quick guide
CRIBASH_2.0_README.md             - Full documentation
CRIBASH_EXAMPLES.md               - Detailed examples
CRIBASH_IMPLEMENTATION_SUMMARY.md - Technical summary
```

## Need Help?

### Installation Issues
Check requirements in [CRIBASH_2.0_README.md](CRIBASH_2.0_README.md#requirements)

### Usage Questions  
See examples in [CRIBASH_EXAMPLES.md](CRIBASH_EXAMPLES.md)

### Customization
Edit variables at the top of `cribash2.0.sh`:
```bash
ORIG="${HOME}/DeployExpress"
LIMPIO="${HOME}/TRYONYOU_DEMO_CLEAN"
BRANCH="design/criba2.0"
ZIP_PATH="/path/to/your/archive.zip"
ASSETS_DIR="ASSETS-DEMO"
```

## Quick Tips

💡 **First time user?** → Start with [CRIBASH_QUICK_REFERENCE.md](CRIBASH_QUICK_REFERENCE.md)

💡 **Need examples?** → Check [CRIBASH_EXAMPLES.md](CRIBASH_EXAMPLES.md)

💡 **Want all details?** → Read [CRIBASH_2.0_README.md](CRIBASH_2.0_README.md)

💡 **Technical person?** → See [CRIBASH_IMPLEMENTATION_SUMMARY.md](CRIBASH_IMPLEMENTATION_SUMMARY.md)

## Related Issues

- **Primary**: Issue #1211 (CribaSH 2.0 — todo en uno)
- **Related**: Issue #1216 (TRYONYOU Visual Kit + Demo Base)

## Status

✅ **Production Ready**  
�� **Version**: 2.0  
📅 **Date**: December 2024  
🏢 **Repository**: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

---

**Ready to start?** Just run:
```bash
./cribash2.0.sh
```

🎉 **Happy cleaning!**
