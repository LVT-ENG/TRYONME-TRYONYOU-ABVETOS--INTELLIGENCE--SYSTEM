# Quick Start Guide - Deployment Scripts

## Prerequisites

Before running the deployment scripts, ensure you have:

1. **Required tokens and keys:**
   - GitHub Personal Access Token (with repo permissions) - [Setup Guide](GITHUB_TOKEN_SETUP.md)
   - Vercel Account Token (from vercel.com/account/tokens)
   - Google Generative AI API Key
   - Stripe Secret Key

2. **Required tools installed:**
   - Git
   - Bash shell
   - Node.js and npm (for Vercel CLI)

## Quick Start

### Step 1: Set Environment Variables

```bash
# Export all required environment variables
export GITHUB_TOKEN="ghp_your_github_token_here"
export VERCEL_TOKEN="your_vercel_token_here"
export GOOGLE_GENAI_KEY="your_google_genai_key_here"
export STRIPE_SECRET_KEY="sk_test_or_live_your_stripe_key_here"
```

**Pro Tip:** Create a `.env.deployment` file (not tracked by git) to store these:

```bash
# .env.deployment (DO NOT COMMIT THIS FILE)
export GITHUB_TOKEN="ghp_..."
export VERCEL_TOKEN="..."
export GOOGLE_GENAI_KEY="..."
export STRIPE_SECRET_KEY="sk_..."
```

Then source it before deployment:
```bash
source .env.deployment
```

### Step 2: Run the Deployment

```bash
# Make sure you're in the repository root
cd /path/to/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Run the main deployment script
./sync_and_deploy.sh
```

### Step 3: Monitor the Process

The script will:
1. 🚀 Synchronize with GitHub (rebase refactor-mirrors-logic on main)
2. 🔑 Inject environment variables to Vercel
3. 📦 Execute deployment to Vercel production
4. ✅ Confirm successful deployment

## Alternative: Deploy Directly (Skip Rebase)

If you only want to deploy without rebasing:

```bash
./deploy_ultimatum.sh --token "$VERCEL_TOKEN"
```

To deploy to staging instead:

```bash
./deploy_ultimatum.sh --token "$VERCEL_TOKEN" --staging
```

## Troubleshooting

### Issue: "Permission denied" when running scripts

**Solution:**
```bash
chmod +x sync_and_deploy.sh deploy_ultimatum.sh
```

### Issue: Git rebase conflicts

**Solution:**
1. Resolve conflicts manually
2. Run: `git rebase --continue`
3. Resume deployment: `./deploy_ultimatum.sh --token "$VERCEL_TOKEN"`

### Issue: Vercel deployment fails

**Solution:**
1. Verify your Vercel token: `vercel whoami --token "$VERCEL_TOKEN"`
2. Check project configuration: `cat vercel.json`
3. Review Vercel logs on your dashboard

### Issue: Safety lint failure (prohibited terms found)

**Solution:**
1. Review the flagged files
2. Remove or replace terms: peso, talla, weight, size
3. Commit changes and retry deployment

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          GOOGLE_GENAI_KEY: ${{ secrets.GOOGLE_GENAI_KEY }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
        run: |
          chmod +x sync_and_deploy.sh
          ./sync_and_deploy.sh
```

## Security Best Practices

✅ **DO:**
- Store tokens in secure secret management (GitHub Secrets, HashiCorp Vault, etc.)
- Use environment variables for sensitive data
- Keep tokens with minimal required permissions
- Rotate tokens regularly
- Review deployment logs for sensitive data leaks

❌ **DON'T:**
- Commit tokens or keys to the repository
- Share tokens in plain text (email, Slack, etc.)
- Use production tokens in development
- Keep tokens with excessive permissions

## Need More Help?

Refer to:
- [DEPLOYMENT_README.md](DEPLOYMENT_README.md) - Full documentation
- [GITHUB_TOKEN_SETUP.md](GITHUB_TOKEN_SETUP.md) - GitHub token generation guide
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Token Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

**Last Updated:** 2026-02-02
**Version:** 1.0.0
