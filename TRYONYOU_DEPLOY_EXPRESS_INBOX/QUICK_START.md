# TRYONYOU Deploy Express Inbox - Quick Start Guide

## 🚀 Quick Reference

### Move Files from Downloads to Inbox

```bash
# Fabric Tests
mv ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Production Briefs
mv ~/Downloads/TRYONYOU_Brief_Produccion.pdf ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/

# Deployment Packages
mv ~/Downloads/TRYONYOU_Deploy_Package.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/

# Release Packages
mv ~/Downloads/TRYONYOU_Release_v1.0.0.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/
```

### For Repository Users

If you're working with the Git repository:

```bash
# Navigate to repository
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Copy files to inbox
cp ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/
cp ~/Downloads/TRYONYOU_Brief_Produccion.pdf TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/

# Add to Git
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/

# Commit
git commit -m "inbox: add fabric tests and production brief"

# Push to remote
git push origin main
```

## 📂 Directory Map

| File Type | Destination Directory |
|-----------|----------------------|
| Fabric test datasets | `fabric-tests/` |
| Production documentation | `production-briefs/` |
| Deployment packages | `deployment-packages/` |
| Official releases | `releases/` |

## 💡 Common Commands

### Check Inbox Contents
```bash
ls -lh TRYONYOU_DEPLOY_EXPRESS_INBOX/*/
```

### Find Specific Files
```bash
find TRYONYOU_DEPLOY_EXPRESS_INBOX -name "*.zip"
find TRYONYOU_DEPLOY_EXPRESS_INBOX -name "*.pdf"
```

### Check File Sizes (for Git LFS)
```bash
du -sh TRYONYOU_DEPLOY_EXPRESS_INBOX/*/*.zip
```

## ⚡ One-Line Commands

```bash
# Move all ZIP files from Downloads to fabric-tests
mv ~/Downloads/TRYONYOU_FabricTests*.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Move all PDF briefs from Downloads to production-briefs
mv ~/Downloads/TRYONYOU_Brief*.pdf TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/

# Copy deployment packages
cp ~/Downloads/*Deploy*.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/
```

## 🔍 Verify Files

```bash
# List all files in inbox
tree TRYONYOU_DEPLOY_EXPRESS_INBOX

# Or without tree command
find TRYONYOU_DEPLOY_EXPRESS_INBOX -type f ! -name ".gitkeep"
```

## 📋 Git Status Check

```bash
# Check what files are ready to commit
git status TRYONYOU_DEPLOY_EXPRESS_INBOX/

# See what will be committed
git diff --cached TRYONYOU_DEPLOY_EXPRESS_INBOX/
```

## 🔗 Related Commands

### Create Deployment Symlinks (Optional)
```bash
# Create symlink in home directory for easy access
ln -s /path/to/repo/TRYONYOU_DEPLOY_EXPRESS_INBOX ~/TRYONYOU_DEPLOY_EXPRESS_INBOX

# Then you can use the issue command directly:
mv ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/
```

### Batch Operations
```bash
# Move multiple fabric test files
for file in ~/Downloads/TRYONYOU_FabricTests*.zip; do
  mv "$file" TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/
done

# Move multiple brief files
for file in ~/Downloads/TRYONYOU_Brief*.pdf; do
  mv "$file" TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/
done
```

## ⚠️ Important Notes

- Files over 25MB will use Git LFS automatically (already configured)
- Always verify files are in the correct subdirectory before committing
- Use descriptive commit messages: `inbox: add [type] [description]`
- Test large file uploads on a separate branch first

## 📞 Help

For detailed documentation, see:
- Main README: `TRYONYOU_DEPLOY_EXPRESS_INBOX/README.md`
- Subdirectory guides: Each folder has its own `README.md`

---

**Last Updated**: January 2025
