# Vercel Token Setup Guide

## Issue: Invalid Vercel Token Format

If you're seeing this error in GitHub Actions:
```
Error: You defined "--token", but its contents are invalid. Must not contain: "."
```

This means the `VERCEL_TOKEN` GitHub secret contains an invalid token format.

## Root Cause

Vercel CLI tokens **must not contain period characters (`.`)**. This error typically occurs when:
- A JWT token (JSON Web Token) is used instead of a Vercel CLI token
- The wrong type of credential is stored in the secret
- The token was copied incorrectly with extra characters

## How to Fix

### Step 1: Generate a Valid Vercel Token

1. Go to your Vercel dashboard: https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it a descriptive name (e.g., "GitHub Actions CI/CD")
4. Set an appropriate expiration date
5. Click "Create"
6. **Copy the token immediately** (it will only be shown once)

### Step 2: Update GitHub Secret

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Find the `VERCEL_TOKEN` secret
4. Click "Update" or "Remove" and then "New repository secret"
5. Name: `VERCEL_TOKEN`
6. Value: Paste the token you copied from Vercel (no quotes, no extra spaces)
7. Click "Add secret" or "Update secret"

### Step 3: Verify the Token Format

A valid Vercel CLI token:
- ✅ Does NOT contain periods (`.`)
- ✅ Is a single continuous string
- ✅ Typically starts with specific prefixes
- ✅ Does NOT look like a JWT (no `xxx.yyy.zzz` format)

### Step 4: Test the Workflow

1. After updating the secret, trigger the workflow:
   - Go to **Actions** tab
   - Select "Deploy Every 5 Minutes"
   - Click "Run workflow" → "Run workflow"
2. Monitor the workflow run to ensure it succeeds

## Additional Required Secrets

Make sure these secrets are also configured:
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### How to Find These IDs:

1. **VERCEL_ORG_ID**: 
   - Go to your Vercel dashboard
   - Click on your profile/organization name
   - Go to Settings
   - Copy the "Organization ID"

2. **VERCEL_PROJECT_ID**:
   - Go to your project in Vercel
   - Go to Settings
   - Scroll down to find "Project ID"
   - Copy the Project ID

## Troubleshooting

### Error: "You defined --token, but its contents are invalid"
- The token contains prohibited characters
- Solution: Regenerate the token following Step 1 above

### Error: "Invalid token"
- The token might be expired or revoked
- Solution: Generate a new token

### Error: "Project not found"
- Check that `VERCEL_PROJECT_ID` is correct
- Verify the project exists in your Vercel account

### Error: "Unauthorized"
- The token might not have the right permissions
- Generate a new token with full access

## Security Best Practices

1. **Never commit tokens to your repository**
2. **Rotate tokens regularly** (set expiration dates)
3. **Use separate tokens** for different environments/purposes
4. **Revoke tokens** that are no longer needed
5. **Monitor token usage** in your Vercel dashboard

## Reference

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vercel Authentication](https://vercel.com/docs/cli#authentication)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
