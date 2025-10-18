# Workflow Update Summary

## Overview
Updated the `.github/workflows/deploy.yml` to match the "TRYONYOU 24x7 Orchestrator" specification from the issue.

## Changes Made

### 1. Workflow Configuration (.github/workflows/deploy.yml)

#### Previous Version:
- Name: "Build and Deploy"
- Triggers: push to main, pull requests
- Two separate jobs: build + deploy
- Used Git LFS steps
- Used artifact upload/download between jobs
- Used `amondnet/vercel-action@v25` for deployment

#### New Version:
- Name: "TRYONYOU 24x7 Orchestrator"
- Triggers: push to main, scheduled (every 6 hours), manual dispatch
- Single job: build
- No Git LFS steps (not needed for this workflow)
- No artifact upload/download (simplified workflow)
- Direct Vercel CLI usage: `npx vercel --prod`
- Added screenshot capture step with Playwright
- Added Telegram notification with job status

### 2. New File: scripts/snapshots.js

Created a Playwright-based screenshot capture script that:
- Captures desktop (1920x1080) and mobile (375x812) screenshots
- Saves to `screenshots/` directory
- Gracefully handles errors (won't fail the workflow)
- Can be used for documentation and monitoring purposes

## Key Features of New Workflow

### 🔄 Automated Triggers
- **Push to main**: Deploys on every commit to main branch
- **Scheduled**: Runs every 6 hours (cron: "0 */6 * * *")
- **Manual**: Can be triggered via workflow_dispatch

### 📸 Screenshots
- Optional screenshot capture using Playwright
- Won't fail the workflow if screenshots fail (`|| true`)
- Useful for visual regression testing and documentation

### 🚀 Simplified Deployment
- Direct Vercel CLI usage instead of GitHub Action
- All environment variables passed directly
- More transparent and easier to debug

### 📢 Telegram Notifications
- Sends notification after every run (using `if: always()`)
- Includes job status, branch, and commit SHA
- Uses the configured bot token and chat ID

## Required GitHub Secrets

The workflow requires the following secrets to be configured:

1. **VERCEL_TOKEN**: Token for Vercel authentication
2. **VERCEL_ORG_ID**: Organization/Team ID in Vercel
3. **VERCEL_PROJECT_ID**: Project ID in Vercel
4. **TELEGRAM_BOT_TOKEN**: Bot token for Telegram notifications
5. **TELEGRAM_CHAT_ID**: Chat ID for Telegram notifications

See `GITHUB_SECRETS_SETUP.md` for detailed instructions.

## Benefits of Changes

1. **Simpler**: Single job instead of two separate jobs
2. **More flexible**: Scheduled runs + manual trigger capability
3. **Better visibility**: Emojis in step names for quick scanning
4. **Transparent**: Direct CLI usage instead of wrapped action
5. **Always notified**: Telegram notification runs even if deployment fails
6. **Screenshot capability**: Optional visual monitoring with Playwright

## Compatibility Notes

- Node.js version 22 is required (specified in workflow)
- Playwright will be installed automatically when needed
- The workflow is backward compatible with existing build scripts

## Testing

The workflow has been validated for:
- ✅ YAML syntax correctness
- ✅ All required secrets are properly referenced
- ✅ Build commands match package.json scripts
- ✅ Vercel CLI environment variables are correctly set

## Next Steps

1. Ensure all GitHub secrets are configured (see GITHUB_SECRETS_SETUP.md)
2. Monitor the first automated run after merge
3. Verify Telegram notifications are working
4. Test manual workflow dispatch functionality
5. Review screenshot outputs if enabled
