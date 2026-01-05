# Gemini Code Assist Setup Checklist

Use this checklist to track your Gemini Code Assist setup progress.

## Pre-Setup Verification

- [ ] Have access to Google Cloud Console
- [ ] Have `gcloud` CLI installed locally
- [ ] Have admin access to `LVT-ENG` GitHub organization
- [ ] Know the Google Cloud Project ID
- [ ] Have necessary IAM permissions (see below)

## IAM Permissions (Choose One Path)

### Path A: Request Specific Roles
- [ ] Request `roles/serviceusage.serviceUsageAdmin` from admin
- [ ] Request `roles/geminicodeassistmanagement.scmConnectionAdmin` from admin (via CLI)
- [ ] Verify roles granted: `gcloud projects get-iam-policy PROJECT_ID`

### Path B: Use Existing Basic Roles (if you have)
- [ ] Verify you have `roles/editor` OR `roles/owner`
- [ ] Confirm permissions are sufficient

## Google Cloud Setup

### API Enablement
- [ ] Enable Gemini Code Assist API
  ```bash
  gcloud services enable codeassist.googleapis.com --project=PROJECT_ID
  ```
- [ ] Enable Cloud Resource Manager API (if needed)
  ```bash
  gcloud services enable cloudresourcemanager.googleapis.com --project=PROJECT_ID
  ```
- [ ] Verify APIs are enabled:
  ```bash
  gcloud services list --enabled --project=PROJECT_ID | grep -E "(codeassist|cloudresourcemanager)"
  ```

### Connection Configuration
- [ ] Create GitHub connection in Google Cloud
- [ ] Link TRYONYOU repository
- [ ] Verify connection status
- [ ] Test connection with `gcloud gemini connections list`

## GitHub Setup

### GitHub App Installation
- [ ] Navigate to GitHub Marketplace
- [ ] Search for "Gemini Code Assist"
- [ ] Click "Install" or "Configure" (if already installed)
- [ ] Select organization: `LVT-ENG`
- [ ] Configure repository access:
  - [ ] Grant access to: `TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM`
- [ ] Review and accept permissions:
  - [ ] Read access to code
  - [ ] Write access to pull requests
  - [ ] Read access to metadata
- [ ] Complete installation

### Repository Configuration
- [ ] Clone repository locally (if not already)
- [ ] Review `.gemini-config.yml` configuration
- [ ] Customize settings if needed
- [ ] Commit configuration:
  ```bash
  git add .gemini-config.yml
  git commit -m "chore: configure Gemini Code Assist"
  git push origin main
  ```

## Integration Verification

### Test 1: Create Test Branch
- [ ] Create test branch: `git checkout -b test-gemini-integration`
- [ ] Make a small code change
- [ ] Commit and push: 
  ```bash
  git add .
  git commit -m "test: verify Gemini integration"
  git push origin test-gemini-integration
  ```

### Test 2: Open Pull Request
- [ ] Go to GitHub repository
- [ ] Create PR from `test-gemini-integration` to `main`
- [ ] Add description: "Testing Gemini Code Assist integration"
- [ ] Wait 2-5 minutes for Gemini to analyze

### Test 3: Verify Gemini Comments
- [ ] Check if Gemini bot commented on PR
- [ ] Review code suggestions (if any)
- [ ] Check security scan results
- [ ] Verify all checks passed

### Test 4: Code in IDE
- [ ] Open project in your IDE
- [ ] Start typing a function
- [ ] Verify Gemini suggestions appear
- [ ] Accept a suggestion
- [ ] Test that it works correctly

## Documentation Review

- [ ] Read `docs/GEMINI_CODE_ASSIST_SETUP.md`
- [ ] Read `docs/GEMINI_QUICK_START.md`
- [ ] Review `scripts/README.md`
- [ ] Understand deployment workflow

## Team Onboarding

- [ ] Share documentation with team
- [ ] Schedule demo session
- [ ] Create team guidelines for:
  - [ ] When to accept Gemini suggestions
  - [ ] How to report issues
  - [ ] Code review process with Gemini
- [ ] Set up notification preferences

## Configuration Tuning

### Review and Adjust `.gemini-config.yml`
- [ ] Verify language settings match project
- [ ] Adjust scanning paths if needed
- [ ] Configure notification preferences
- [ ] Set security scan sensitivity
- [ ] Enable/disable features based on team needs

### Project-Specific Settings
- [ ] Configure for React 18 patterns
- [ ] Set Vite build preferences
- [ ] Adjust Tailwind CSS suggestions
- [ ] Configure Three.js recommendations
- [ ] Set up module-specific rules:
  - [ ] Avatar3D
  - [ ] TextileComparator
  - [ ] PAU/CAP systems
  - [ ] ABVET

## Deployment Integration

### Update CI/CD
- [ ] Review GitHub Actions workflows
- [ ] Ensure Gemini checks run on PRs
- [ ] Configure required checks:
  - [ ] Code quality
  - [ ] Security scan
  - [ ] Performance analysis
- [ ] Set up failure notifications

### Deploy Scripts
- [ ] Test `./scripts/super-deploy.sh`
- [ ] Verify directory structure creation
- [ ] Confirm commit message format
- [ ] Test Vercel integration (if token available)
- [ ] Document any custom modifications

## Monitoring & Maintenance

### Initial Monitoring (First 2 Weeks)
- [ ] Track Gemini suggestion acceptance rate
- [ ] Monitor false positive rates
- [ ] Collect team feedback
- [ ] Document common issues

### Regular Maintenance
- [ ] Weekly: Review security alerts
- [ ] Monthly: Update `.gemini-config.yml` based on learnings
- [ ] Quarterly: Review IAM permissions
- [ ] As needed: Update team guidelines

## Troubleshooting Completed

- [ ] Documented common issues
- [ ] Created troubleshooting guide
- [ ] Shared solutions with team
- [ ] Updated this checklist with learnings

## Success Criteria

Mark complete when ALL of the following are true:

- [ ] ✅ Gemini bot comments on PRs automatically
- [ ] ✅ Code suggestions appear in IDE
- [ ] ✅ Security scans run on every PR
- [ ] ✅ Team is trained on usage
- [ ] ✅ Documentation is complete and accessible
- [ ] ✅ CI/CD integration is working
- [ ] ✅ No blocking issues in last 3 PRs
- [ ] ✅ Team feedback is positive
- [ ] ✅ Configuration is optimized for project

## Post-Setup Actions

### Optimization
- [ ] Analyze first month of suggestions
- [ ] Identify most useful features
- [ ] Disable unhelpful suggestions
- [ ] Fine-tune configuration

### Team Training
- [ ] Create video tutorial
- [ ] Document best practices
- [ ] Share success stories
- [ ] Collect improvement ideas

### Documentation
- [ ] Update README with Gemini info
- [ ] Add to onboarding docs
- [ ] Create FAQ based on common questions
- [ ] Link all resources

## Resources

- **Quick Start:** `docs/GEMINI_QUICK_START.md`
- **Full Setup:** `docs/GEMINI_CODE_ASSIST_SETUP.md`
- **Scripts:** `scripts/README.md`
- **Configuration:** `.gemini-config.yml`
- **Official Docs:** https://cloud.google.com/gemini/docs/code-assist

## Notes & Custom Configurations

Use this section to track project-specific customizations:

```
Date: _______________
Modified by: _______________
Change: _______________
Reason: _______________

Date: _______________
Modified by: _______________
Change: _______________
Reason: _______________
```

## Sign-Off

Setup completed by: _______________  
Date: _______________  
Verified by: _______________  
Date: _______________  

---

**Checklist Version:** 1.0.0  
**Last Updated:** 2026-01-04  
**Maintained by:** LVT-ENG Team
