# GitHub Classic Personal Access Token Setup Guide

## Overview

This guide provides step-by-step instructions for generating a GitHub Classic Personal Access Token (PAT) required for deploying the TRYONYOU Intelligence System.

## Why You Need a GitHub Token

The deployment scripts (`sync_and_deploy.sh` and `deploy_ultimatum.sh`) require a GitHub token to:
- Authenticate with GitHub repositories
- Push code changes during deployment
- Access repository metadata
- Perform git operations securely

## Prerequisites

Before generating your token, ensure you have:
- A GitHub account with access to the repository
- Appropriate permissions to create Personal Access Tokens
- Admin or write access to the target repository

## Step-by-Step Instructions

### 1. Access GitHub Token Settings

1. Log in to your GitHub account at [github.com](https://github.com)
2. Click on your **profile picture** in the top-right corner
3. Select **Settings** from the dropdown menu
4. In the left sidebar, scroll down to find **Developer settings**
5. Click on **Developer settings**

### 2. Navigate to Personal Access Tokens (Classic)

1. In the Developer settings sidebar, find **Personal access tokens**
2. Click on **Tokens (classic)** (not "Fine-grained tokens")
3. Click the **Generate new token** button
4. Select **Generate new token (classic)** from the dropdown

### 3. Configure Your Token

#### Token Name (Note)
- Enter a descriptive name, e.g., "TRYONYOU Deployment Token"
- This helps you identify the token's purpose later

#### Expiration
- Select an appropriate expiration date
- **Recommended:** 90 days or 1 year for production deployments
- **Note:** You'll need to regenerate the token after expiration

#### Select Scopes (Permissions)

For the TRYONYOU deployment scripts, you need the following scopes:

**Required Scopes:**
- ✅ `repo` (Full control of private repositories)
  - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`

**Optional but Recommended:**
- ✅ `workflow` (Update GitHub Action workflows)
  - Only needed if you plan to modify CI/CD workflows

**Minimum Required Permissions:**
If you want to limit access, at minimum select:
- ✅ `repo` (full repository access)

### 4. Generate and Copy Your Token

1. Scroll to the bottom and click **Generate token**
2. **IMPORTANT:** Copy your new token immediately
   - GitHub shows the token only once
   - Store it securely (password manager recommended)
   - If you lose it, you'll need to generate a new one

### 5. Verify Your Token

Test your token by running:

```bash
# Set the token as an environment variable
export GITHUB_TOKEN="ghp_your_token_here"

# Test authentication
git ls-remote https://x-access-token:${GITHUB_TOKEN}@github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
```

If successful, you should see a list of repository references.

## Using Your Token

### For Local Development

Create a secure `.env.deployment` file (not tracked by git):

```bash
# .env.deployment (DO NOT COMMIT THIS FILE)
export GITHUB_TOKEN="ghp_your_actual_token_here"
export VERCEL_TOKEN="your_vercel_token_here"
export GOOGLE_GENAI_KEY="your_google_genai_key_here"
export STRIPE_SECRET_KEY="sk_your_stripe_key_here"
```

Then source it before deployment:
```bash
source .env.deployment
./sync_and_deploy.sh
```

### For CI/CD (GitHub Actions)

1. Go to your repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GITHUB_TOKEN` (Note: GitHub automatically provides `GITHUB_TOKEN` for workflows, but you may need a custom one for specific operations)
5. Paste your token value
6. Click **Add secret**

### For Vercel Deployment

If using Vercel's platform:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `GITHUB_TOKEN` with your token value
4. Select appropriate environments (Production, Preview, Development)

## Security Best Practices

### ✅ DO:

- **Store tokens securely** in password managers (1Password, LastPass, Bitwarden)
- **Use environment variables** for tokens in scripts
- **Rotate tokens regularly** (every 90 days recommended)
- **Use minimal required scopes** - don't grant unnecessary permissions
- **Delete unused tokens** from your GitHub settings
- **Monitor token usage** in GitHub's security log
- **Use separate tokens** for different purposes (development, production, CI/CD)

### ❌ DON'T:

- **Never commit tokens to git** - they will be exposed in repository history
- **Don't share tokens** via email, Slack, or other plain-text channels
- **Don't use production tokens** in development environments
- **Don't store tokens in plain text files** committed to the repository
- **Don't give tokens more permissions** than necessary
- **Don't reuse tokens** across multiple projects if possible

## Token Compromised?

If you suspect your token has been compromised:

1. **Immediately revoke the token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Click **Delete** next to the compromised token
   
2. **Generate a new token** following the steps above

3. **Update the token** in all locations:
   - Local environment variables
   - CI/CD secrets
   - Deployment platform settings

4. **Review GitHub security log:**
   - Go to Settings → Security log
   - Check for unauthorized access

5. **Enable two-factor authentication (2FA)** if not already enabled

## Troubleshooting

### Issue: "Bad credentials" error

**Solution:**
- Verify the token is copied correctly (no extra spaces)
- Check if the token has expired
- Ensure you selected the `repo` scope
- Try generating a new token

### Issue: "Permission denied" error

**Solution:**
- Verify you have write access to the repository
- Ensure the `repo` scope is enabled
- Check if organization policies restrict token usage

### Issue: Token not working after generation

**Solution:**
- Wait a few minutes - token propagation can take time
- Clear any cached git credentials: `git credential-cache exit`
- Re-test with `git ls-remote` command

### Issue: Organization requires SSO

**Solution:**
- After generating the token, you may need to authorize it for SSO
- Go to your tokens list
- Click **Configure SSO** next to your token
- Authorize for the required organization

## Alternative: Fine-Grained Tokens (Future)

GitHub's newer "Fine-grained personal access tokens" offer more granular control but are currently in beta. For now, Classic tokens are recommended for this project. If you want to use fine-grained tokens:

- They allow repository-specific access
- More detailed permission controls
- Currently may have limited support in older tools

**Note:** The deployment scripts are tested with Classic tokens. Fine-grained tokens may require additional configuration.

## Token Format Reference

GitHub Classic Personal Access Tokens follow this format:
- Prefix: `ghp_` (for personal access tokens)
- Length: 40 characters after prefix
- Example: `ghp_1234567890abcdefghijklmnopqrstuvwxyzABCD`

## Additional Resources

- [GitHub PAT Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub Token Best Practices](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation)
- [Managing GitHub PATs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/reviewing-your-authorized-integrations)
- [Deployment Scripts Documentation](DEPLOYMENT_README.md)
- [Quick Start Guide](QUICK_START.md)

## Support

For issues related to:
- **Token generation:** See GitHub's official documentation
- **Deployment scripts:** Refer to [DEPLOYMENT_README.md](DEPLOYMENT_README.md)
- **General setup:** See [QUICK_START.md](QUICK_START.md)

---

**Last Updated:** 2026-02-06  
**Version:** 1.0.0  
**Maintained by:** LVT-ENG Team
