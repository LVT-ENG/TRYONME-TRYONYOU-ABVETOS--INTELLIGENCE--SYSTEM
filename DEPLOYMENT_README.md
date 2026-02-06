# Deployment Scripts Documentation

## Overview
This repository contains automated deployment scripts for the TRYONME-TRYONYOU-ABVETOS Intelligence System.

## Scripts

### 1. sync_and_deploy.sh
Main orchestration script that handles the complete deployment workflow.

**Purpose:**
- Synchronize codebase using Max Pro protocol (git rebase)
- Inject environment variables to Vercel
- Execute final deployment

**Prerequisites:**
The following environment variables must be set:
- `GITHUB_TOKEN` - GitHub personal access token for repository access ([Setup Guide](GITHUB_TOKEN_SETUP.md))
- `VERCEL_TOKEN` - Vercel authentication token
- `GOOGLE_GENAI_KEY` - Google Generative AI API key
- `STRIPE_SECRET_KEY` - Stripe secret key for payment processing

**Usage:**
```bash
export GITHUB_TOKEN="your_github_token"
export VERCEL_TOKEN="your_vercel_token"
export GOOGLE_GENAI_KEY="your_google_genai_key"
export STRIPE_SECRET_KEY="your_stripe_secret_key"

./sync_and_deploy.sh
```

**What it does:**
1. Configures secure GitHub authentication
2. Fetches latest changes from origin
3. Checks out `refactor-mirrors-logic` branch
4. Rebases onto `origin/main` (Max Pro synchronization)
5. Injects environment variables to Vercel production environment
6. Creates local `.env` backup file
7. Executes `deploy_ultimatum.sh` for final deployment

### 2. deploy_ultimatum.sh
Final deployment script with comprehensive safety checks.

**Purpose:**
- Perform pre-deployment validation
- Execute safety lint checks
- Deploy to Vercel (production or staging)

**Usage:**
```bash
# Deploy to production
./deploy_ultimatum.sh --token YOUR_VERCEL_TOKEN

# Deploy to staging
./deploy_ultimatum.sh --token YOUR_VERCEL_TOKEN --staging
```

**What it does:**
1. **Pre-deployment Checks**
   - Validates presence of package.json
   - Checks for vercel.json

2. **Safety Lint (Zero Tallas Protocol)**
   - Scans source code for prohibited terms (peso, talla, weight, size)
   - Fails deployment if violations are found

3. **Build Verification**
   - Ensures Vercel CLI is installed
   - Prepares for deployment

4. **Deployment to Vercel**
   - Deploys to production (default) or staging
   - Uses token-based authentication

5. **Post-deployment Verification**
   - Confirms deployment success
   - Provides deployment status

**Options:**
- `--token <VERCEL_TOKEN>` - (Required) Vercel authentication token
- `--staging` - (Optional) Deploy to staging instead of production

## Security Notes

⚠️ **IMPORTANT:**
- Never commit tokens or API keys to the repository
- The `.env` file is already excluded in `.gitignore`
- Always use environment variables for sensitive data
- Tokens should be stored in secure secret management systems (GitHub Secrets, CI/CD platforms, etc.)

## Integration with CI/CD

These scripts can be integrated into CI/CD pipelines:

**GitHub Actions Example:**
```yaml
- name: Deploy to Vercel
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    GOOGLE_GENAI_KEY: ${{ secrets.GOOGLE_GENAI_KEY }}
    STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
  run: |
    chmod +x sync_and_deploy.sh
    ./sync_and_deploy.sh
```

## Existing Scripts

### TRYONYOU_SUPERCOMMIT_MAX.sh
Legacy script for local development and testing. This script remains unchanged and can still be used for sandbox testing.

## Troubleshooting

**Issue:** Script fails with "permission denied"
- **Solution:** Ensure scripts are executable: `chmod +x *.sh`

**Issue:** Git rebase conflicts
- **Solution:** Manually resolve conflicts and continue: `git rebase --continue`

**Issue:** Vercel deployment fails
- **Solution:** Check Vercel token validity and project configuration

**Issue:** Safety lint failures
- **Solution:** Remove prohibited terms from source code before deployment

## Additional Documentation

- [GitHub Token Setup Guide](GITHUB_TOKEN_SETUP.md) - Detailed instructions for generating GitHub Personal Access Tokens
- [Quick Start Guide](QUICK_START.md) - Quick deployment instructions

## Support
For issues or questions, please refer to the project documentation or contact the development team.
