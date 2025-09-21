# Required GitHub Secrets for deploy.yml workflow

The `deploy.yml` workflow requires the following secrets to be configured in the GitHub repository settings:

## Vercel Configuration
- **VERCEL_TOKEN**: Your Vercel authentication token
- **VERCEL_ORG_ID**: Your Vercel organization/team ID

## Telegram Notifications  
- **TELEGRAM_BOT_TOKEN**: Bot token from @BotFather
- **TELEGRAM_CHAT_ID**: Chat ID where notifications should be sent

## How to Configure Secrets

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret" for each required secret
4. Add the name and value for each secret listed above

## Health Check URL

The workflow performs a health check against `https://tryonyou.app`. If you need to change this URL, edit line 35 in `.github/workflows/deploy.yml`.

## Workflow Trigger

This workflow triggers automatically on pushes to the `main` branch and will:
1. Build the application
2. Deploy to Vercel
3. Perform health check
4. Send Telegram notifications for success/failure