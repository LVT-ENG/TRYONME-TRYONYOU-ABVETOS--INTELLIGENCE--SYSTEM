# Upload Instructions for TRYONYOU Incubator Kit

This guide explains how to upload the final incubator kit and legal documents to make them publicly accessible.

## 🎯 Goal

Make the following files publicly accessible via direct links:
- `TRYONYOU_Incubator_Kit_FINAL.zip`
- `Patent_Summary.pdf`
- `OnePager.pdf`
- `Investor_Dossier.pdf`
- `README_EXTENDED.pdf`
- Other legal/investor materials

## 📋 Prerequisites

1. Files ready to upload
2. Git LFS installed (for files >25MB)
3. Repository access with push permissions

## 🔧 Method 1: Git LFS (Recommended for files 25MB-2GB)

### Step 1: Install Git LFS

```bash
# macOS
brew install git-lfs

# Ubuntu/Debian
sudo apt-get install git-lfs

# Windows
# Download from https://git-lfs.github.com/

# Initialize Git LFS
git lfs install
```

### Step 2: Configure Git LFS (Already Done)

The `.gitattributes` file is already configured to track:
- `*.zip` files
- `docs/legal/*.pdf` files
- Video files

### Step 3: Add Your Files

```bash
# Navigate to repository
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Copy your files to docs/legal/
cp /path/to/TRYONYOU_Incubator_Kit_FINAL.zip docs/legal/
cp /path/to/Patent_Summary.pdf docs/legal/
cp /path/to/OnePager.pdf docs/legal/
cp /path/to/Investor_Dossier.pdf docs/legal/
cp /path/to/README_EXTENDED.pdf docs/legal/

# Add files to Git
git add docs/legal/*.zip
git add docs/legal/*.pdf

# Commit
git commit -m "docs(legal): add final incubator kit with Patent Summary (30→8 claims + EBTT)"

# Push to repository
git push origin main
```

### Step 4: Verify Upload

Check that files are tracked by LFS:
```bash
git lfs ls-files
```

Files should appear in the output with their sizes.

### Step 5: Access Your Files

Files will be accessible via:
```
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/raw/main/docs/legal/FILENAME
```

Or via Vercel deployment:
```
https://your-domain.vercel.app/docs/legal/FILENAME
```

## 🔧 Method 2: GitHub Releases (For files >2GB)

If files exceed Git LFS limits, use GitHub Releases:

### Step 1: Create a Release

1. Go to: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/releases
2. Click "Create a new release"
3. Tag version: `v1.0-incubator-kit`
4. Release title: "TRYONYOU Incubator Kit FINAL"
5. Description: "Final incubator kit with Patent Summary (30→8 claims + EBTT)"

### Step 2: Attach Files

1. Drag and drop or click to upload:
   - `TRYONYOU_Incubator_Kit_FINAL.zip`
   - `Patent_Summary.pdf`
   - `OnePager.pdf`
   - `Investor_Dossier.pdf`
   - `README_EXTENDED.pdf`

2. Click "Publish release"

### Step 3: Get Download Links

Files will be accessible at:
```
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/releases/download/v1.0-incubator-kit/FILENAME
```

### Step 4: Update Documentation

Update `docs/legal/README.md` with the actual release links.

## 🔧 Method 3: External Hosting (Alternative)

If GitHub isn't suitable, use external hosting:

### Option A: Google Drive

1. Upload files to Google Drive
2. Right-click → "Get link"
3. Set permissions to "Anyone with the link can view"
4. Copy the shareable link
5. Update `docs/legal/README.md` with links

### Option B: AWS S3 / Azure Blob / GCP Storage

1. Create a public bucket/container
2. Upload files
3. Configure public read access
4. Copy public URLs
5. Update `docs/legal/README.md` with links

### Option C: Dropbox / OneDrive

1. Upload files
2. Generate public sharing links
3. Update `docs/legal/README.md` with links

## 🔒 Security Considerations

### Public vs Private

**For Public Access** (Recommended for marketing materials):
- Use Git LFS or GitHub Releases
- Anyone can download without authentication
- Good for: OnePager, Public Patent Summary

**For Private Access** (Recommended for sensitive data):
- Use private repositories
- Require authentication
- Good for: Detailed financials, trade secrets

### Watermarking

Consider watermarking PDFs with "CONFIDENTIAL - FOR INVESTOR USE ONLY" if needed.

## ✅ Post-Upload Checklist

After uploading files:

- [ ] Verify files are accessible via direct link
- [ ] Test download from incognito/private browser
- [ ] Update `docs/legal/README.md` with actual links
- [ ] Update main README.md if needed
- [ ] Test Vercel deployment serves files correctly
- [ ] Notify stakeholders that files are live
- [ ] Update website Patent/Legal section with links

## 🐛 Troubleshooting

### Git LFS Not Working

```bash
# Reinstall Git LFS
git lfs uninstall
git lfs install --force

# Verify tracking
cat .gitattributes
git lfs track

# Re-add files
git rm --cached docs/legal/*.zip
git add docs/legal/*.zip
git commit -m "Fix: Re-add ZIP with LFS"
git push
```

### Files Return 404

1. Check file was committed: `git log -- docs/legal/FILENAME`
2. Check file is in repository: `git ls-files | grep legal`
3. Check LFS status: `git lfs ls-files`
4. Verify Vercel build includes docs: Check build logs

### Files Too Large for GitHub

Git LFS limits:
- Free: 1GB storage, 1GB bandwidth/month
- Pro: 50GB storage, 50GB bandwidth/month

If exceeded, use GitHub Releases or external hosting.

## 📞 Support

For issues with upload:
- **Repository**: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
- **Email**: info@tryonyou.app

---

**Note**: This directory is now properly configured to host legal documents. Follow the steps above to upload your files and make them publicly accessible.
