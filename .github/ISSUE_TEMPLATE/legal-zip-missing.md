---
name: Legal ZIP Missing
about: Automatically created when legal ZIP file is not accessible
title: '[docs/legal] ZIP not accessible after deploy'
labels: bug, docs, urgent
assignees: ''
---

## ⚠️ Legal ZIP File Not Accessible

The legal documentation ZIP file `TRYONYOU_Incubator_Kit_FINAL.zip` is not accessible after deployment.

### Details

- **File Path**: `docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip`
- **Expected URL**: `https://raw.githubusercontent.com/${{ github.repository }}/main/docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip`

### Issue

The automated workflow detected that the ZIP file either:
1. Does not exist in the repository at the expected path, OR
2. Is not accessible via GitHub's raw content URL

### Action Required

Please verify:
- [ ] The ZIP file exists in `docs/legal/` directory
- [ ] The file is committed and pushed to the main branch
- [ ] The file is not listed in `.gitignore`
- [ ] File permissions allow public access (if intended)
- [ ] File name matches exactly: `TRYONYOU_Incubator_Kit_FINAL.zip`

### Next Steps

1. Check if the file exists locally in `docs/legal/`
2. Ensure the file is tracked by git: `git status`
3. Commit and push if necessary: `git add docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip && git commit -m "Add legal ZIP file" && git push`
4. Wait for GitHub to update the raw content URL (may take a few moments)
5. Re-run the workflow to verify accessibility

---

**Note**: This issue was automatically created by the `check-legal-zip.yml` workflow.
