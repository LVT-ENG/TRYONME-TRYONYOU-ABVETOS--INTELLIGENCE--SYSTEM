# TRYONYOU Deploy Express Inbox - Usage Examples

## 📋 Real-World Usage Examples

### Example 1: Moving Fabric Tests from Downloads

**Issue Command:**
```bash
mv ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/
```

**Correct Usage in Repository:**
```bash
# Navigate to repository
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Move file to fabric-tests subdirectory
mv ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Verify file was moved
ls -lh TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Add to Git (LFS will handle large files automatically)
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# Commit
git commit -m "test: add DIVINEO fabric test dataset"

# Push to remote
git push origin main
```

### Example 2: Adding Production Brief PDF

**Scenario:** You have `TRYONYOU_Brief_Produccion.pdf` from the issue attachments

```bash
# Download the PDF from GitHub issue attachments first
# Then move it to the inbox

cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Copy or move the production brief
mv ~/Downloads/TRYONYOU_Brief_Produccion.pdf TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/

# Verify
ls -lh TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/

# Add to Git
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/TRYONYOU_Brief_Produccion.pdf

# Commit with descriptive message
git commit -m "docs: add production brief from issue #XXX"

# Push
git push origin main
```

### Example 3: Creating a Symlink for Easy Access

If you frequently use the inbox and want to match the issue command exactly:

```bash
# Create symlink in home directory
ln -s /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/TRYONYOU_DEPLOY_EXPRESS_INBOX ~/TRYONYOU_DEPLOY_EXPRESS_INBOX

# Verify symlink
ls -la ~ | grep TRYONYOU_DEPLOY_EXPRESS_INBOX

# Now you can use the issue command directly
mv ~/Downloads/TRYONYOU_FabricTests_DIVINEO.zip ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Or for production briefs
mv ~/Downloads/TRYONYOU_Brief_Produccion.pdf ~/TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/
```

### Example 4: Batch Moving Multiple Files

**Scenario:** You have multiple fabric test files to organize

```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Move all fabric test ZIP files
mv ~/Downloads/TRYONYOU_FabricTests_*.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Move all production briefs
mv ~/Downloads/TRYONYOU_Brief_*.pdf TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/

# Move all deployment packages
mv ~/Downloads/TRYONYOU_Deploy_*.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/

# Check what was moved
find TRYONYOU_DEPLOY_EXPRESS_INBOX -type f -name "*.zip" -o -name "*.pdf"

# Add everything to Git
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/

# Commit
git commit -m "inbox: organize fabric tests and production documentation"

# Push
git push origin main
```

### Example 5: Creating a Deployment Package

**Scenario:** You've built a new version and want to create a deployment package

```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Build the project
npm run build

# Create deployment package with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
zip -r "TRYONYOU_Deploy_Package_${TIMESTAMP}.zip" dist/ package.json vercel.json

# Move to inbox
mv "TRYONYOU_Deploy_Package_${TIMESTAMP}.zip" TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/

# Verify
ls -lh TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/

# Add to Git
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/deployment-packages/

# Commit
git commit -m "deploy: add deployment package ${TIMESTAMP}"

# Push
git push origin main
```

### Example 6: Creating an Official Release

**Scenario:** You're ready to create version 1.0.0 official release

```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Build production version
npm run build

# Create release package
zip -r TRYONYOU_Release_v1.0.0.zip \
  dist/ \
  CHANGELOG.md \
  LICENSE \
  README.md \
  package.json

# Move to releases directory
mv TRYONYOU_Release_v1.0.0.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/

# Generate checksums for integrity verification
cd TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/
sha256sum TRYONYOU_Release_v1.0.0.zip > TRYONYOU_Release_v1.0.0.checksums.txt

# Go back to repo root
cd ../..

# Add to Git
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/

# Commit
git commit -m "release: TRYONYOU v1.0.0"

# Tag the release
git tag -a v1.0.0 -m "TRYONYOU v1.0.0 - Initial Release"

# Push with tags
git push origin main --tags

# Optional: Create GitHub release
gh release create v1.0.0 \
  --title "TRYONYOU v1.0.0" \
  --notes "First official release of TRYONYOU" \
  TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/TRYONYOU_Release_v1.0.0.zip
```

### Example 7: Organizing Existing Files

**Scenario:** You already have files in the repository and want to organize them

```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Find existing ZIP files (excluding node_modules)
find . -name "*.zip" -not -path "*/node_modules/*" -not -path "*/.git/*"

# Move TRYONYOU_OFFICIAL_PACKAGE.zip to releases
git mv TRYONYOU_OFFICIAL_PACKAGE.zip TRYONYOU_DEPLOY_EXPRESS_INBOX/releases/

# Commit the reorganization
git commit -m "refactor: move official package to inbox/releases"

# Push
git push origin main
```

### Example 8: Verifying Large File Upload with Git LFS

**Scenario:** You want to verify a large file is properly tracked by Git LFS

```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Check if file is tracked by LFS
git lfs ls-files | grep TRYONYOU_FabricTests_DIVINEO

# If not tracked, check file size
du -h TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# Verify .gitattributes is configured
cat .gitattributes | grep "*.zip"

# Force LFS tracking (if needed)
git lfs track "TRYONYOU_DEPLOY_EXPRESS_INBOX/**/*.zip"
git add .gitattributes

# Add the file
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# Commit
git commit -m "test: add DIVINEO fabric tests (LFS tracked)"

# Push with LFS
git push origin main
```

## 🔍 Troubleshooting Examples

### Issue: File Too Large for Git

```bash
# Check file size
ls -lh TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# If >100MB, use GitHub Releases instead
gh release create fabric-tests-v1 \
  --title "Fabric Tests DIVINEO Dataset" \
  --notes "Complete DIVINEO fabric test dataset" \
  TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# Update README with download link
echo "Download: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/releases/download/fabric-tests-v1/TRYONYOU_FabricTests_DIVINEO.zip" >> TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/README.md
```

### Issue: Wrong Directory

```bash
# If you accidentally put a file in the wrong directory
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Move from production-briefs to fabric-tests
git mv TRYONYOU_DEPLOY_EXPRESS_INBOX/production-briefs/TRYONYOU_FabricTests_DIVINEO.zip \
       TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/

# Commit the correction
git commit -m "fix: move fabric tests to correct directory"

# Push
git push origin main
```

### Issue: Need to Update a File

```bash
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Replace the old file with new version
mv ~/Downloads/TRYONYOU_FabricTests_DIVINEO_v2.zip \
   TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# Git will detect the change
git status

# Add the updated file
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/fabric-tests/TRYONYOU_FabricTests_DIVINEO.zip

# Commit with version info
git commit -m "test: update DIVINEO fabric tests to v2"

# Push
git push origin main
```

## 📊 Quick Reference Commands

```bash
# List all files in inbox
find TRYONYOU_DEPLOY_EXPRESS_INBOX -type f ! -name ".gitkeep"

# Check size of all files
du -sh TRYONYOU_DEPLOY_EXPRESS_INBOX/*/

# Count files by type
find TRYONYOU_DEPLOY_EXPRESS_INBOX -type f -name "*.zip" | wc -l
find TRYONYOU_DEPLOY_EXPRESS_INBOX -type f -name "*.pdf" | wc -l

# Show recent commits to inbox
git log --oneline TRYONYOU_DEPLOY_EXPRESS_INBOX/ | head -10

# Check what's pending to commit
git status TRYONYOU_DEPLOY_EXPRESS_INBOX/
```

## 🔗 Integration with CI/CD

The inbox integrates with GitHub Actions for automated testing:

```yaml
# .github/workflows/deploy.yml will automatically:
# 1. Detect new files in TRYONYOU_DEPLOY_EXPRESS_INBOX
# 2. Verify file integrity
# 3. Copy to deployment artifacts
# 4. Deploy to Vercel (if configured)
```

---

**Note:** Always commit files with descriptive messages indicating what was added and why. Use issue numbers in commit messages when applicable (e.g., `git commit -m "test: add fabric tests from issue #123"`).
