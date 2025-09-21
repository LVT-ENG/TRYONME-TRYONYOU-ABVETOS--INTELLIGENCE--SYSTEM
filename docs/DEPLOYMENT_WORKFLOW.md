# TryOnYou Deployment Workflow

This workflow automates the deployment process for the TryOnYou application with integrated health checks and Telegram notifications.

## Workflow: `tryonyou-deploy.yml`

### Features

- ✅ **Automated Deployment**: Deploys to Vercel on every push to main branch
- ✅ **Health Monitoring**: Performs health checks post-deployment
- ✅ **Telegram Notifications**: Sends success/failure notifications
- ✅ **Manual Trigger**: Can be triggered manually via workflow_dispatch

### Required GitHub Secrets

The workflow requires the following secrets to be configured in your repository:

| Secret | Description | Example |
|--------|-------------|---------|
| `VERCEL_TOKEN` | Vercel authentication token | `your-vercel-token` |
| `VERCEL_ORG_ID` | Vercel organization ID | `team_xxxxxxxxxxxxx` |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for notifications | `123456789:XXXXXXXXXX` |
| `TELEGRAM_CHAT_ID` | Telegram chat ID for notifications | `-1001234567890` |

### Workflow Steps

1. **Checkout**: Gets the latest code from the repository
2. **Setup Node.js**: Configures Node.js 20 environment
3. **Install Dependencies**: Runs `npm install`
4. **Build Project**: Executes `npm run build`
5. **Deploy to Vercel**: Deploys using Vercel CLI with production settings
6. **Health Check**: Validates deployment by checking https://tryonyou.app
7. **Notifications**: Sends Telegram messages based on deployment status

### Health Check

The workflow performs a health check on `https://tryonyou.app` and expects:
- HTTP status code: `200`
- Response within reasonable timeout

If the health check fails, the workflow will:
- Mark the deployment as failed
- Send a failure notification to Telegram with error details

### Telegram Notifications

#### Success Message
```
✅ Health check OK
Repo: TRYONYOU–ULTIMATUM
URL: https://tryonyou.app
Commit: [commit-sha]
```

#### Failure Message
```
⚠️ Health check FAILED
Repo: TRYONYOU–ULTIMATUM
Status: [http-status-code]
URL: https://tryonyou.app
Commit: [commit-sha]
```

### Usage

The workflow triggers automatically on:
- Push to `main` branch
- Manual trigger via GitHub Actions UI

### Customization

To modify the health check URL, update the `URL` variable in the health check step:

```yaml
URL="https://your-custom-domain.com"
```

### Troubleshooting

Common issues and solutions:

1. **Health check fails**: Verify the application is properly deployed and accessible
2. **Telegram not working**: Check bot token and chat ID in repository secrets
3. **Vercel deployment fails**: Verify Vercel token and organization ID

For more details, check the workflow logs in GitHub Actions.