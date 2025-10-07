# Legal Documentation

This directory contains legal documentation for the TRYONYOU project.

## Contents

- **TRYONYOU_Incubator_Kit_FINAL.zip**: Complete legal incubator kit including:
  - Patent documentation (EPCT)
  - Trademark registrations
  - Legal agreements and templates
  - Corporate documentation

## Automated Verification

A GitHub Actions workflow (`check-legal-zip.yml`) automatically verifies that the ZIP file:
1. Exists in this directory
2. Is accessible via GitHub's raw content URL

If the verification fails, an issue will be automatically created with troubleshooting steps.

## Important Notes

- The ZIP file must be committed to the repository
- Do not add `*.zip` to `.gitignore` for this directory
- File name must match exactly: `TRYONYOU_Incubator_Kit_FINAL.zip`
- Changes to files in `docs/legal/**` trigger the verification workflow

## Access

The legal documentation ZIP file can be accessed at:
```
https://raw.githubusercontent.com/<owner>/<repo>/main/docs/legal/TRYONYOU_Incubator_Kit_FINAL.zip
```

---

© 2025 TRYONYOU. All rights reserved.
Patent-protected technology (EPCT Pending).
