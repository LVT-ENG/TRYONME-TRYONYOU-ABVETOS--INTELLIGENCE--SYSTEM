# ABVETOS Orchestration System

## Overview

The ABVETOS Orchestration System provides maximum orchestration mode for TRYONYOU deployments through Flow 345. This system automates deployment workflows, logging, and notifications.

## Components

### 1. ABVETOS_ORCHESTRATION.sh

The main orchestration script that coordinates the entire deployment flow.

**Features:**
- ✅ Environment variable validation
- ✅ Executes Flow 345 workflow
- ✅ Automatic log archiving
- ✅ Telegram notifications
- ✅ Clear visual feedback

**Usage:**

```bash
export VERCEL_TOKEN="your_vercel_token"
export TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
export TELEGRAM_CHAT_ID="your_telegram_chat_id"

./ABVETOS_ORCHESTRATION.sh
```

**Required Environment Variables:**
- `VERCEL_TOKEN` - Your Vercel authentication token
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token for notifications
- `TELEGRAM_CHAT_ID` - Your Telegram chat ID for notifications

### 2. ABVETOS_FLOW_345.sh

Core Flow 345 implementation that executes the main deployment workflow.

**5-Step Process:**
1. **Repository Sync** - Synchronizes with remote repository
2. **Build Verification** - Checks build configuration and dependencies
3. **Deployment Preparation** - Validates deployment tools (Vercel CLI)
4. **Integration Checks** - Verifies Telegram and Vercel configuration
5. **Final Validation** - Confirms successful execution

**Features:**
- ✅ Detailed logging to `deploy.log`
- ✅ Step-by-step progress tracking
- ✅ Non-blocking warnings for missing dependencies
- ✅ Comprehensive validation checks

**Direct Usage:**

```bash
./ABVETOS_FLOW_345.sh
```

Note: Can be run independently without environment variables for testing purposes.

### 3. system/logs/

Log archive directory where all Flow 345 execution logs are stored.

**Structure:**
```
system/
└── logs/
    ├── README.md
    └── YYYYMMDD_HHMM_flow345.log (generated at runtime)
```

**Log Naming Convention:**
- Format: `YYYYMMDD_HHMM_flow345.log`
- Example: `20251101_1430_flow345.log`

## Workflow Diagram

```
┌─────────────────────────────────────┐
│ ABVETOS_ORCHESTRATION.sh            │
│ (Maximum Orchestration Mode)        │
└──────────────┬──────────────────────┘
               │
               │ 1. Validates Environment Variables
               │    ├── VERCEL_TOKEN
               │    ├── TELEGRAM_BOT_TOKEN
               │    └── TELEGRAM_CHAT_ID
               │
               ▼
┌─────────────────────────────────────┐
│ ABVETOS_FLOW_345.sh                 │
│ (Core Deployment Workflow)          │
├─────────────────────────────────────┤
│ Step 1: Repository Sync             │
│ Step 2: Build Verification          │
│ Step 3: Deployment Preparation      │
│ Step 4: Integration Checks          │
│ Step 5: Final Validation            │
└──────────────┬──────────────────────┘
               │
               │ Generates: deploy.log
               │
               ▼
┌─────────────────────────────────────┐
│ Log Archiving                       │
│ deploy.log → system/logs/           │
│ YYYYMMDD_HHMM_flow345.log          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Telegram Notification               │
│ "🦚 Flujo 345 completado"           │
└─────────────────────────────────────┘
```

## Setup Instructions

### Step 1: Configure Environment Variables

Create a `.env` file or export variables:

```bash
export VERCEL_TOKEN="your_vercel_token_here"
export TELEGRAM_BOT_TOKEN="your_telegram_bot_token_here"
export TELEGRAM_CHAT_ID="your_telegram_chat_id_here"
```

**Getting Your Tokens:**

1. **Vercel Token**: Get from [Vercel Settings → Tokens](https://vercel.com/account/tokens)
2. **Telegram Bot Token**: Create a bot with [@BotFather](https://t.me/botfather)
3. **Telegram Chat ID**: Get your chat ID from [@userinfobot](https://t.me/userinfobot)

### Step 2: Make Scripts Executable

```bash
chmod +x ABVETOS_ORCHESTRATION.sh
chmod +x ABVETOS_FLOW_345.sh
```

### Step 3: Run Orchestration

```bash
./ABVETOS_ORCHESTRATION.sh
```

## Example Output

```
🧩 TRYONYOU–ABVETOS–ULTRA-PLUS–ULTIMATUM
⚙️  MODO: ORQUESTACIÓN MÁXIMA (Flujo 345)
──────────────────────────────────────────

🔄 Iniciando FLOW 345...
──────────────────────────────────────────
📦 Paso 1/5: Sincronizando repositorio...
✅ Repositorio sincronizado

🔨 Paso 2/5: Verificando build...
✅ package.json encontrado
✅ Dependencias instaladas

🚀 Paso 3/5: Preparando deployment...
✅ Vercel CLI disponible: 28.4.0

🔗 Paso 4/5: Verificando integraciones...
✅ Telegram configurado
✅ Vercel token configurado

✨ Paso 5/5: Validación final...
✅ FLOW 345 completado exitosamente
──────────────────────────────────────────
✅ FLOW 345 ejecutado correctamente

💾 Guardando logs...
```

Then you'll receive a Telegram notification:
```
🦚 Flujo 345 completado y registrado — 2025-11-01 14:30:00
```

## Logs

### Viewing Logs

```bash
# List all Flow 345 logs
ls -la system/logs/

# View the latest log
cat system/logs/$(ls -t system/logs/*_flow345.log | head -1)

# View a specific log
cat system/logs/20251101_1430_flow345.log
```

### Log Content

Logs include:
- Timestamp of execution
- Step-by-step progress
- Success/warning messages
- Integration status
- Completion confirmation

## Troubleshooting

### Error: "Falta VERCEL_TOKEN"

**Solution:** Export the required environment variable:
```bash
export VERCEL_TOKEN="your_token_here"
```

### Error: "Falta TELEGRAM_BOT_TOKEN"

**Solution:** Configure your Telegram bot token:
```bash
export TELEGRAM_BOT_TOKEN="your_bot_token_here"
```

### Error: "Falta TELEGRAM_CHAT_ID"

**Solution:** Get your chat ID and export it:
```bash
export TELEGRAM_CHAT_ID="your_chat_id_here"
```

### Warning: "Vercel CLI no encontrado"

**Solution:** Install Vercel CLI:
```bash
npm install -g vercel
```

### Warning: "Dependencias no instaladas"

**Solution:** Install Node.js dependencies:
```bash
npm install
```

## Integration with CI/CD

You can integrate ABVETOS Orchestration into your CI/CD pipeline:

### GitHub Actions Example

```yaml
name: ABVETOS Deploy

on:
  push:
    branches: [ main ]

jobs:
  orchestrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run ABVETOS Orchestration
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
        run: ./ABVETOS_ORCHESTRATION.sh
```

## Best Practices

1. **Always validate environment variables** before running in production
2. **Keep logs archived** for troubleshooting and audit purposes
3. **Monitor Telegram notifications** for deployment status
4. **Review logs regularly** to identify patterns or issues
5. **Test with mock credentials** in development environments

## Security Notes

⚠️ **Important Security Considerations:**

- Never commit `.env` files with real tokens to version control
- Store sensitive tokens in secure secret management systems
- Use GitHub Secrets for CI/CD integration
- Rotate tokens regularly
- Limit token permissions to minimum required scope

## Support

For issues or questions:
- Check logs in `system/logs/`
- Review the troubleshooting section above
- Verify environment variables are correctly set
- Ensure all dependencies are installed

## Version History

- **v1.0.0** (2025-11-01): Initial release
  - ABVETOS_ORCHESTRATION.sh
  - ABVETOS_FLOW_345.sh
  - system/logs/ structure
  - Complete documentation
