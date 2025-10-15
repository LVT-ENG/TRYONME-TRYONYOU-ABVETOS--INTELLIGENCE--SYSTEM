# TRYONYOU Domain Sync & Deploy Workflow

## Overview

This workflow automatically syncs and deploys the TRYONYOU application with proper domain configuration on Vercel.

## Workflow File

`.github/workflows/tryonyou-domain-sync-deploy.yml`

## Triggers

- **Automatic**: Runs on every push to the `main` branch
- **Manual**: Can be triggered manually via GitHub Actions UI

## Workflow Steps

### 1. Checkout Repository
Checks out the latest code from the repository.

### 2. Setup Node.js
Configures Node.js v22 environment for building the application.

### 3. Install Dependencies
Runs `npm ci` to install all project dependencies.

### 4. Build Application
Builds the application using `npm run build`.

### 5. Install Vercel CLI
Installs the latest version of Vercel CLI globally.

### 6. Link to Project
Links the repository to the Vercel project `tryonyou-master`.

### 7. Add Domain tryonyou.app
- Attempts to add the domain `tryonyou.app` to Vercel
- Assigns the domain to the `tryonyou-master` project
- Uses `|| true` to continue even if domain already exists

### 8. Add Subdomain www.tryonyou.app
- Attempts to add the subdomain `www.tryonyou.app` to Vercel
- Assigns the subdomain to the `tryonyou-master` project
- Uses `|| true` to continue even if subdomain already exists

### 9. Redirect abvetos.com to tryonyou.app
- Sets up a 308 permanent redirect from `abvetos.com/*` to `https://tryonyou.app/$1`
- The redirect preserves the URL path structure
- Uses `|| true` to continue even if redirect already exists

### 10. Deploy to Production
Deploys the application to Vercel production environment with:
- `--prod`: Deploy to production
- `--yes`: Skip confirmation prompts
- `--confirm`: Confirm deployment
- `--force`: Force deployment even if there are no changes

### 11. Notify Deployment Status
Displays deployment status and domain information.

## Required GitHub Secrets

The workflow requires the following secrets to be configured in the repository:

- `VERCEL_TOKEN`: Vercel authentication token
- `VERCEL_PROJECT_ID`: Vercel project ID (e.g., `prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4`)
- `VERCEL_ORG_ID`: Vercel organization/team ID (e.g., `team_SDhjSkxLVE7oJ3S5KPkwG9uC`)

## Domain Configuration

After successful deployment, the following domains will be configured:

- **Primary**: https://tryonyou.app
- **Subdomain**: https://www.tryonyou.app
- **Redirect**: abvetos.com → https://tryonyou.app

## Manual Execution

To run the workflow manually:

1. Go to the **Actions** tab in GitHub
2. Select **TRYONYOU Domain Sync & Deploy** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow** button

## Troubleshooting

### Domain Already Exists Error
If you see "domain already exists" errors, this is expected. The workflow uses `|| true` to continue execution.

### Authentication Issues
Ensure all required secrets are properly configured in GitHub repository settings.

### Deployment Failures
Check the workflow logs in the Actions tab for detailed error messages.

## Related Documentation

- [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md) - How to configure GitHub Secrets
- [VERCEL_DOMAIN_SETUP.md](VERCEL_DOMAIN_SETUP.md) - Vercel domain configuration guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - General deployment guide

## Support

For issues or questions:
- Check workflow logs in GitHub Actions
- Review Vercel deployment logs
- Contact @LVT-ENG organization
