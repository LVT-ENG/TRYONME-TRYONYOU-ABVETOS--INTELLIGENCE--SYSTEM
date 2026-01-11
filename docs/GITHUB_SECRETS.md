# GitHub Secrets Configuration

This document outlines the required GitHub Secrets for the TRYONYOU deployment pipeline.

## Required Secrets

Navigate to: `Settings > Secrets and variables > Actions` in your GitHub repository.

### 1. VERCEL_TOKEN

**Purpose:** Enables automatic deployment to Vercel  
**How to obtain:**
1. Go to https://vercel.com/account/tokens
2. Create a new token with deployment permissions
3. Copy the token value

**Configuration:**
```
Name: VERCEL_TOKEN
Value: [Your Vercel Token]
```

### 2. GOOGLE_API_KEY

**Purpose:** Activates Google Gemini AI for Pau (vision and recommendations)  
**Current Value (if applicable):** `AIzaSyBuKZh-SJtXOi4lHE3bA_K437xcKL0a9RM`  
**How to obtain:**
1. Go to https://console.cloud.google.com/
2. Enable Google AI/Gemini API
3. Create credentials (API Key)
4. Copy the API key

**Configuration:**
```
Name: GOOGLE_API_KEY
Value: [Your Google API Key]
```

### 3. TELEGRAM_BOT_TOKEN

**Purpose:** Enables deployment notifications via @abvet_deploy_bot  
**How to obtain:**
1. Talk to @BotFather on Telegram
2. Create a new bot or use existing bot
3. Copy the bot token provided

**Configuration:**
```
Name: TELEGRAM_BOT_TOKEN
Value: [Your Telegram Bot Token]
```

## Security Best Practices

- ✅ Never commit secrets directly to the repository
- ✅ Use GitHub Secrets for all sensitive data
- ✅ Rotate tokens regularly
- ✅ Use environment-specific secrets when needed
- ✅ Revoke tokens immediately if compromised

## Verifying Configuration

After adding secrets, you can verify they're set correctly by:

1. Going to repository Settings > Secrets and variables > Actions
2. You should see all three secrets listed (values will be hidden)
3. Trigger a deployment via push or workflow dispatch
4. Check the Actions logs for successful authentication

## CI/CD Integration

These secrets are used by:
- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/schedule_deploy.yml` - Scheduled deployments
- `TRYONYOU_SUPERCOMMIT_MAX.sh` - Deployment script

## Support

If you encounter issues with secret configuration:
1. Verify secret names match exactly (case-sensitive)
2. Check that tokens haven't expired
3. Ensure proper permissions are granted
4. Review GitHub Actions logs for error messages

---

**Security Note:** This file does NOT contain actual secret values. All sensitive data must be stored in GitHub Secrets.
