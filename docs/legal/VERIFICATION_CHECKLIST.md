# Legal Documentation Verification Checklist

This document provides a comprehensive checklist to verify that legal documents are properly accessible.

## 📋 Pre-Upload Verification

Before uploading files, ensure:

- [ ] Git LFS is installed and initialized (`git lfs install`)
- [ ] `.gitattributes` is configured to track ZIP and PDF files
- [ ] Files are prepared and ready for upload
- [ ] File sizes are noted (for choosing upload method)
- [ ] Repository permissions allow file uploads

## 📦 Upload Verification

### For Files Uploaded via Git LFS

After uploading files, verify:

- [ ] Files are tracked by LFS: `git lfs ls-files`
- [ ] Files show in git status: `git status`
- [ ] Files are committed: `git log --oneline -5`
- [ ] Files are pushed: `git push`
- [ ] No errors during push

### For Files Uploaded via GitHub Releases

After creating a release, verify:

- [ ] Release is published and visible
- [ ] All files are attached to release
- [ ] Download links work
- [ ] File sizes are correct
- [ ] Release is marked as "Latest"

## 🌐 Public Access Verification

Test that files are publicly accessible:

### GitHub Raw URLs

Test each file with:
```
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/raw/main/docs/legal/FILENAME
```

- [ ] README.md loads correctly
- [ ] README_EXTENDED.md loads correctly
- [ ] UPLOAD_INSTRUCTIONS.md loads correctly
- [ ] index.html loads correctly
- [ ] TRYONYOU_Incubator_Kit_FINAL.zip (if uploaded)
- [ ] Patent_Summary.pdf (if uploaded)
- [ ] OnePager.pdf (if uploaded)
- [ ] Investor_Dossier.pdf (if uploaded)
- [ ] README_EXTENDED.pdf (if uploaded)

### GitHub Web Interface

Check files are visible in web interface:
```
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/tree/main/docs/legal
```

- [ ] Directory is visible
- [ ] All files are listed
- [ ] README.md is rendered
- [ ] Files can be downloaded

### Vercel/Production Deployment

After deployment, verify:
```
https://your-domain.vercel.app/docs/legal/
```

- [ ] index.html loads and displays correctly
- [ ] README_EXTENDED.md is accessible
- [ ] All document links work
- [ ] No 404 errors
- [ ] Proper MIME types (application/pdf, application/zip)

### Test from Incognito/Private Browser

Verify public access without authentication:

- [ ] Open incognito/private browser window
- [ ] Navigate to public URLs
- [ ] Confirm files download/display without login
- [ ] Test all file types (MD, HTML, PDF, ZIP)

## 🔧 Build Process Verification

Verify the build process includes docs:

### Local Build Test

```bash
# Clean build
rm -rf dist
npm run build

# Check docs are copied
ls -la dist/docs/legal/
```

- [ ] dist/docs/ directory exists
- [ ] dist/docs/legal/ directory exists
- [ ] All markdown files are present
- [ ] index.html is present
- [ ] File permissions are correct

### GitHub Actions Build

After pushing changes:

- [ ] GitHub Actions workflow triggers
- [ ] Build step completes successfully
- [ ] "Verify docs/legal in build" step passes
- [ ] Artifacts are uploaded
- [ ] No build warnings or errors

## 🔒 Security Verification

Ensure proper security configuration:

### HTTP Headers

Test that proper headers are set:

```bash
curl -I https://your-domain.vercel.app/docs/legal/README.md
```

Check for:
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Cache-Control` is set appropriately
- [ ] `Content-Type` is correct for file type

### File Permissions

- [ ] Files are readable but not executable
- [ ] No sensitive environment variables in files
- [ ] No API keys or tokens in committed files
- [ ] .gitignore excludes sensitive files

## 📱 Cross-Platform Testing

Test access from different platforms:

### Desktop Browsers
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (macOS)
- [ ] Edge

### Mobile Browsers
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Firefox

### Direct Download Tools
- [ ] wget
- [ ] curl
- [ ] Browser download manager

## 📊 Performance Verification

Check that files load efficiently:

- [ ] index.html loads in < 2 seconds
- [ ] Markdown files render quickly
- [ ] PDF files start downloading immediately
- [ ] ZIP files download at reasonable speed
- [ ] No timeout errors

## 🔍 Content Verification

Verify file contents are correct:

### Documentation Files

- [ ] README.md has correct links
- [ ] README_EXTENDED.md is complete and formatted
- [ ] UPLOAD_INSTRUCTIONS.md is accurate
- [ ] index.html displays all documents
- [ ] No broken links within documents

### Binary Files (if uploaded)

- [ ] ZIP file extracts without errors
- [ ] PDF files open in PDF readers
- [ ] File sizes match originals
- [ ] No corruption during upload

## 📝 Documentation Updates

Ensure documentation reflects reality:

- [ ] README.md links are updated
- [ ] docs/legal/README.md table has correct status
- [ ] index.html shows correct availability
- [ ] All "Pending Upload" statuses updated when files added
- [ ] Direct access URLs are correct

## 🎯 Final Integration Test

Complete end-to-end verification:

1. **From Investor Perspective**
   - [ ] Can find legal docs from main README
   - [ ] Can navigate to /docs/legal/
   - [ ] Can read README_EXTENDED.md
   - [ ] Can download incubator kit (if uploaded)
   - [ ] Can access all referenced documents

2. **From Website**
   - [ ] Patent/Legal section links work
   - [ ] Documents are accessible
   - [ ] No broken links
   - [ ] Professional appearance

3. **From Repository**
   - [ ] Files visible in GitHub
   - [ ] Can clone and access locally
   - [ ] Git LFS works for large files
   - [ ] Build process includes files

## ❌ Common Issues Checklist

If experiencing issues, check:

### 404 Errors
- [ ] File is committed and pushed
- [ ] Path is correct (case-sensitive)
- [ ] Vercel deployment completed
- [ ] No typos in filename
- [ ] File exists in dist/ after build

### Git LFS Issues
- [ ] Git LFS is installed
- [ ] .gitattributes is committed
- [ ] File is tracked: `git lfs ls-files`
- [ ] LFS bandwidth not exceeded
- [ ] Repository has LFS enabled

### Build Issues
- [ ] vite-plugin-static-copy is installed
- [ ] vite.config.js is correct
- [ ] docs directory exists
- [ ] No file path errors
- [ ] Build completes without errors

### Access Issues
- [ ] Repository is public (or user has access)
- [ ] Files are not in .gitignore
- [ ] Vercel has access to repository
- [ ] No authentication required
- [ ] CORS headers allow access

## 📞 Support

If issues persist after verification:

1. Check build logs: `npm run build`
2. Check deployment logs in Vercel dashboard
3. Verify Git status: `git status`
4. Check GitHub Actions logs
5. Create issue with specific error messages

## ✅ Success Criteria

The legal documentation is properly accessible when:

- ✅ All files are visible in GitHub repository
- ✅ Direct raw URLs return correct content
- ✅ Vercel deployment serves files correctly
- ✅ No 404 errors for any documented path
- ✅ Files download/display in all major browsers
- ✅ Build process includes docs without errors
- ✅ Documentation accurately reflects availability

---

**Last Updated**: January 2025  
**Maintained By**: TRYONYOU Development Team
