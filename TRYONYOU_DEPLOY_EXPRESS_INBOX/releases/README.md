# Releases Directory

## 🎉 Purpose

This directory contains official release packages and version archives for TRYONYOU platform.

## 📋 Release Types

### Major Releases
- v1.0.0 - Initial production release
- v2.0.0 - Major feature updates
- v3.0.0 - Platform overhauls

### Minor Releases
- v1.1.0 - New features
- v1.2.0 - Enhancements

### Patch Releases
- v1.0.1 - Bug fixes
- v1.0.2 - Security patches

## 📦 Release Package Contents

Each release should include:
```
TRYONYOU_Release_v1.0.0/
├── dist/              # Production build
├── CHANGELOG.md       # Release notes
├── LICENSE           # License information
├── README.md         # Release documentation
└── checksums.txt     # File integrity verification
```

## 📝 Release Process

```bash
# 1. Build production version
npm run build

# 2. Create release package
zip -r TRYONYOU_Release_v1.0.0.zip dist/ CHANGELOG.md LICENSE README.md

# 3. Move to releases directory
cp TRYONYOU_Release_v1.0.0.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/

# 4. Generate checksums
cd TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/
sha256sum TRYONYOU_Release_v1.0.0.zip > TRYONYOU_Release_v1.0.0.checksums.txt

# 5. Commit to repository
git add .
git commit -m "release: TRYONYOU v1.0.0"
git push origin main

# 6. Create GitHub Release
gh release create v1.0.0 \
  --title "TRYONYOU v1.0.0" \
  --notes "Release notes..." \
  TRYONYOU_Release_v1.0.0.zip
```

## 🔗 GitHub Releases

Official releases are also published on GitHub:
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/releases

---

**Status**: Ready for official releases  
**Version Format**: Semantic Versioning (MAJOR.MINOR.PATCH)
