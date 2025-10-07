# GitHub Configuration

This directory contains GitHub-specific configuration files for the TRYONYOU project.

## Structure

```
.github/
├── workflows/
│   └── check-legal-zip.yml     # Legal ZIP verification workflow
├── ISSUE_TEMPLATE/
│   └── legal-zip-missing.md    # Issue template for missing legal ZIP
└── README.md                   # This file
```

## Workflows

### Check Legal ZIP Availability

**File**: `workflows/check-legal-zip.yml`

This workflow automatically verifies that the legal documentation ZIP file is properly committed and accessible.

#### Trigger
- Runs on every push to `docs/legal/**` paths

#### What it does
1. **Checks local existence**: Verifies the file exists in `docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip`
2. **Checks remote accessibility**: Verifies the file is accessible via GitHub raw content URL
3. **Creates issue on failure**: Automatically opens an issue with troubleshooting steps if verification fails

#### Required Setup
- The ZIP file must be present at: `docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip`
- The file must not be excluded by `.gitignore`
- The file must be committed to the main branch

#### Expected Behavior
- ✅ On success: Workflow completes with green checkmark
- ❌ On failure: Issue is automatically created with label `bug, docs, urgent`

## Issue Templates

### Legal ZIP Missing

**File**: `ISSUE_TEMPLATE/legal-zip-missing.md`

This template is automatically used when the legal ZIP verification workflow fails. It includes:
- Detailed description of the problem
- Expected file location and URL
- Troubleshooting checklist
- Step-by-step resolution guide

## Usage

### To test the workflow manually:
1. Make any change to a file in `docs/legal/` (e.g., update README.md)
2. Commit and push the change
3. Check the Actions tab in GitHub to see the workflow run

### To add the ZIP file:
```bash
# Place your ZIP file in the docs/legal directory
cp /path/to/TRYONYOU_Incubator_Kit_FINAL.zip docs/legal/

# Commit and push
git add docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip
git commit -m "Add legal documentation ZIP"
git push
```

### To verify accessibility:
```bash
# The file should be accessible at:
curl -I https://raw.githubusercontent.com/<owner>/<repo>/main/docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip
```

## Troubleshooting

### Workflow not triggering
- Ensure changes are made to files in `docs/legal/**` path
- Check that the workflow file is on the main branch
- Verify GitHub Actions is enabled for the repository

### ZIP file not accessible
- Confirm the file is committed (not just staged)
- Wait a few moments for GitHub to update raw content
- Check the file is not listed in `.gitignore`
- Verify the file name matches exactly: `TRYONYOU_Incubator_Kit_FINAL.zip`

### Issue not being created
- The issue creation requires the `peter-evans/create-issue-from-file@v4` action
- Ensure GitHub Actions has permissions to create issues
- Check the workflow logs for any errors

---

© 2025 TRYONYOU. All rights reserved.
