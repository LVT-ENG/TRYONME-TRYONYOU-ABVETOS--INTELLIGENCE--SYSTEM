# Quick Reference: Gemini Code Assist Setup

## Prerequisites

✅ You need ONE of the following:

**Option A - Specific Roles:**
- `roles/serviceusage.serviceUsageAdmin` (Service Usage Admin)
- `roles/geminicodeassistmanagement.scmConnectionAdmin` (SCM Connection Admin)

**Option B - Basic Roles (already sufficient):**
- `roles/editor` (Editor)
- `roles/owner` (Owner)

## Quick Setup Commands

### 1. Check Your Current Permissions

```bash
# Replace PROJECT_ID and YOUR_EMAIL
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:user:YOUR_EMAIL"
```

### 2. Grant Permissions (Admin Only)

**Service Usage Admin (can use Console or CLI):**

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:USER_EMAIL" \
  --role="roles/serviceusage.serviceUsageAdmin"
```

**SCM Connection Admin (MUST use CLI):**

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:USER_EMAIL" \
  --role="roles/geminicodeassistmanagement.scmConnectionAdmin"
```

⚠️ **IMPORTANT:** The `geminicodeassistmanagement.scmConnectionAdmin` role CANNOT be granted via Google Cloud Console. You MUST use the gcloud CLI.

### 3. Enable Required APIs

```bash
# Enable Gemini Code Assist API
gcloud services enable codeassist.googleapis.com --project=PROJECT_ID

# Enable Cloud Resource Manager API (if needed)
gcloud services enable cloudresourcemanager.googleapis.com --project=PROJECT_ID
```

### 4. Connect GitHub

**Via Google Cloud Console:**
1. Navigate to: https://console.cloud.google.com/gemini/code-assist
2. Click "Configure GitHub Integration"
3. Select "Connect GitHub Account"
4. Authorize the GitHub App
5. Select repositories to enable

**Via gcloud CLI:**
```bash
# Create connection to GitHub
gcloud gemini connections create TRYONYOU_GITHUB \
  --location=global \
  --connection-type=GITHUB \
  --github-config-app-installation-id=INSTALLATION_ID

# Link repository
gcloud gemini repos create TRYONYOU_REPO \
  --location=global \
  --connection=TRYONYOU_GITHUB \
  --repository=LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### 5. Install GitHub App

1. Go to GitHub Marketplace
2. Search for "Gemini Code Assist"
3. Install on organization `LVT-ENG`
4. Select repository access:
   - ✅ TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
5. Authorize required permissions

### 6. Verify Installation

```bash
# List connections
gcloud gemini connections list --location=global

# List enabled repositories
gcloud gemini repos list --location=global
```

## Configuration Files

The project includes:

- **`.gemini-config.yml`** - Gemini Code Assist configuration
- **`docs/GEMINI_CODE_ASSIST_SETUP.md`** - Full documentation

## Testing the Integration

1. **Create a test branch:**
   ```bash
   git checkout -b test-gemini-assist
   ```

2. **Make a small change:**
   ```bash
   echo "// Test comment" >> src/App.jsx
   git add src/App.jsx
   git commit -m "test: verify Gemini Code Assist integration"
   git push origin test-gemini-assist
   ```

3. **Open a Pull Request:**
   - Go to GitHub
   - Create PR from `test-gemini-assist` to `main`
   - Check for Gemini Code Assist comments

4. **Expected behavior:**
   - ✅ Gemini bot should comment on the PR
   - ✅ Code suggestions should appear
   - ✅ Security scan results visible

## Troubleshooting

### Error: "Permission denied"
**Solution:** Verify you have the correct IAM roles with step 1

### Error: "API not enabled"
**Solution:** Run step 3 to enable required APIs

### Error: "Cannot grant role via Console"
**Solution:** For `scmConnectionAdmin`, you MUST use gcloud CLI (step 2)

### GitHub App not appearing
**Solution:** 
1. Check GitHub App installation: https://github.com/organizations/LVT-ENG/settings/installations
2. Verify repository access is granted
3. Re-authorize if needed

### No Gemini comments on PRs
**Solution:**
1. Verify connection: `gcloud gemini connections list --location=global`
2. Check repository is linked: `gcloud gemini repos list --location=global`
3. Ensure `.gemini-config.yml` is committed to repository
4. Wait 5-10 minutes for initial sync

## Project-Specific Settings

### TRYONYOU Configuration

The `.gemini-config.yml` is configured with:

- **Languages:** JavaScript, TypeScript, Python, JSX, TSX
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js
- **Deployment:** Vercel

### Recommended Settings

Enable these features:
- ✅ Code review on PRs
- ✅ Security vulnerability scanning
- ✅ Dependency audit
- ✅ Performance optimization suggestions
- ✅ Documentation generation

## Support Resources

- **Full Documentation:** `docs/GEMINI_CODE_ASSIST_SETUP.md`
- **Scripts Guide:** `scripts/README.md`
- **Official Docs:** https://cloud.google.com/gemini/docs/code-assist
- **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues

## Next Steps

After setup is complete:

1. ✅ Run deployment: `./scripts/super-deploy.sh`
2. ✅ Monitor first PR with Gemini integration
3. ✅ Adjust `.gemini-config.yml` based on team feedback
4. ✅ Train team on Gemini Code Assist features
5. ✅ Document any custom workflows

---

**Last Updated:** 2026-01-04  
**Maintained By:** LVT-ENG Team  
**Status:** Production Ready ✅
