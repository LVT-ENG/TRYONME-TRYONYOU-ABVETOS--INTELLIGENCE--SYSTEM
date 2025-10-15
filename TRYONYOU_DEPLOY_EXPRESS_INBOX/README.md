# TRYONYOU Deploy Express Inbox

📥 **Central hub for deployment files, fabric tests, and production materials**

## 🎯 Purpose

This directory serves as the **Express Inbox** for organizing deployment-related files, including:
- Fabric test results and datasets (e.g., DIVINEO tests)
- Production briefs and documentation
- Deployment packages and releases
- Quality assurance materials

## 📂 Directory Structure

```
TRYONYOU_DEPLOY_EXPRESS_INBOX/
├── fabric-tests/           # Fabric test results, DIVINEO datasets, material analysis
├── production-briefs/      # Production documentation, deployment briefs, specifications
├── deployment-packages/    # Ready-to-deploy packages, builds, archives
└── releases/              # Official release packages and version archives
```

## 📥 How to Use This Inbox

### Adding Files

1. **Fabric Tests** (e.g., `TRYONYOU_FabricTests_DIVINEO.zip`)
   ```bash
   cp ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/
   ```

2. **Production Briefs** (e.g., `TRYONYOU_Brief_Produccion.pdf`)
   ```bash
   cp ~/Downloads/TRYONYOU_Brief_Produccion.pdf TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/
   ```

3. **Deployment Packages**
   ```bash
   cp ~/Downloads/TRYONYOU_Deploy_v1.0.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/
   ```

4. **Official Releases**
   ```bash
   cp dist/tryonyou-release-v1.0.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/
   ```

### Git LFS Configuration

For large files (>25MB), Git LFS is already configured in `.gitattributes`:
```
*.zip filter=lfs diff=lfs merge=lfs -text
*.pdf filter=lfs diff=lfs merge=lfs -text
```

### Committing Files

```bash
# Add files to Git
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/

# Commit with descriptive message
git commit -m "inbox: add fabric tests DIVINEO dataset"

# Push to repository
git push origin main
```

## 📋 File Organization Guidelines

### Naming Convention

Use descriptive names with dates and versions:
- `TRYONYOU_FabricTests_DIVINEO_2025-01-15.zip`
- `TRYONYOU_Brief_Produccion_v2.3.pdf`
- `TRYONYOU_Deploy_Package_v1.0.0.zip`
- `TRYONYOU_Release_v1.5.0_Final.zip`

### File Types by Directory

#### fabric-tests/
- `.zip` - Compressed test datasets
- `.csv` - Raw test data
- `.json` - Structured test results
- `.pdf` - Test reports and analysis

#### production-briefs/
- `.pdf` - Production documentation
- `.md` - Technical specifications
- `.docx` - Project briefs

#### deployment-packages/
- `.zip` - Complete deployment packages
- `.tar.gz` - Compressed deployment archives

#### releases/
- `.zip` - Official release packages
- `CHANGELOG.md` - Release notes

## 🔄 Integration with Deployment Pipeline

This inbox integrates with:
- **GitHub Actions**: `.github/workflows/deploy.yml`
- **Vercel Deployment**: `vercel.json`
- **Documentation**: Links to `/docs/legal/` for official materials

## 🔗 Related Documentation

- [Deployment Instructions](../DEPLOY_INSTRUCTIONS.md)
- [Upload Instructions](../docs/legal/UPLOAD_INSTRUCTIONS.md)
- [Solution Summary](../SOLUTION_SUMMARY.md)

## ⚠️ Important Notes

- **Large Files**: Files >25MB should use Git LFS (already configured)
- **Sensitive Data**: Do not commit credentials or API keys
- **Quality Control**: Test all deployment packages before committing
- **Version Control**: Always use version numbers in filenames

## 📞 Support

For questions about the deployment inbox:
- **Repository Issues**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
- **Email**: contact@tryonyou.app

---

**Created**: January 2025  
**Purpose**: Centralized deployment file management  
**Status**: Active
