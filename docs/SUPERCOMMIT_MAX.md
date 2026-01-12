# Supercommit MAX - Automated Deployment Script

## Overview

The **Supercommit MAX** script (`scripts/TRYONYOU_SUPERCOMMIT_MAX.sh`) is the master automation tool for the TRYONYOU-ABVETOS platform. It performs a complete deployment workflow including code cleanup, dependency installation, git operations, and automatic deployment to Vercel.

## Features

✅ **Automated Git Operations**
- Switches to the main branch
- Pulls latest changes from origin
- Stages all relevant files
- Creates detailed, formatted commits
- Pushes changes to GitHub

✅ **Intelligent Cleanup**
- Removes obsolete directories (legacy_old, temp_old, apps/web-old, tests-old)
- Cleans up duplicate integration folders
- Preserves important project structure

✅ **Dependency Management**
- Installs or updates Node.js dependencies
- Ensures consistent package versions

✅ **Directory Structure Verification**
- Creates required directories if missing
- Maintains consistent project architecture

✅ **Automated Deployment**
- Deploys to Vercel production (if VERCEL_TOKEN is set)
- Provides deployment status feedback
- Handles errors gracefully

## Usage

### Method 1: NPM Script (Recommended)

```bash
npm run supercommit
```

### Method 2: Direct Execution

```bash
./scripts/TRYONYOU_SUPERCOMMIT_MAX.sh
```

### Method 3: Bash Command

```bash
bash scripts/TRYONYOU_SUPERCOMMIT_MAX.sh
```

## Prerequisites

1. **Git Configuration**: Ensure you have proper git credentials configured
2. **Node.js**: Required for npm dependencies
3. **Vercel Token** (Optional): Set `VERCEL_TOKEN` environment variable for automatic deployment

### Setting Up Vercel Token

To enable automatic deployment to Vercel, set the VERCEL_TOKEN environment variable:

```bash
# Temporary (current session only)
export VERCEL_TOKEN=your_vercel_token_here
npm run supercommit

# Persistent (add to ~/.bashrc or ~/.zshrc)
echo 'export VERCEL_TOKEN=your_vercel_token_here' >> ~/.bashrc
source ~/.bashrc
```

## What the Script Does

### Step 1: Environment Validation
- Checks if running from repository root
- Verifies package.json exists

### Step 2: Git Operations
- Switches to main branch (or exits if unable)
- Pulls latest changes from origin/main
- Handles merge conflicts gracefully

### Step 3: Cleanup
- Removes node_modules, dist, and legacy folders
- Cleans up deprecated directories
- Ensures clean working environment

### Step 4: Dependencies
- Runs `npm install` to update dependencies
- Ensures all packages are properly installed

### Step 5: Directory Structure
- Creates missing documentation directories
- Ensures asset directories exist
- Sets up proper src structure

### Step 6: Git Staging
- Conditionally adds directories (apps, api, modules, integrations, tests)
- Always adds docs, src, public, scripts
- Stages configuration files (package.json, vite.config.js, etc.)

### Step 7: Commit Creation
- Creates detailed commit message including:
  - Module integration status
  - Infrastructure details
  - Documentation updates
  - Deployment information
  - System architecture overview

### Step 8: Push and Deploy
- Pushes changes to origin/main
- Deploys to Vercel production (if token available)
- Displays final status summary

## Commit Message Format

The script generates comprehensive commit messages with the following structure:

```
🔥 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM

✅ Consolidated architecture: Avatar3D, TextileComparator, PAU, CAP, ABVET, Wardrobe, AutoDonate, FTT.
✅ Integrated Deploy Express + CI/CD (Vercel + Telegram).
✅ Clean merge of all legacy repositories...
[Additional details about modules, infrastructure, and deployment]
```

## Security Considerations

⚠️ **Important**: Never commit secrets directly in the script file!

- Always use environment variables for sensitive tokens
- The VERCEL_TOKEN should be set externally
- Use `.env` files (excluded from git via .gitignore)
- GitHub Secrets for CI/CD workflows

## Troubleshooting

### Script fails to switch to main branch
```bash
git checkout main
git pull origin main
```

### Node modules installation fails
```bash
rm -rf node_modules package-lock.json
npm install
```

### Push fails due to conflicts
```bash
git status
git pull origin main
# Resolve conflicts manually
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Vercel deployment fails
- Verify VERCEL_TOKEN is set correctly
- Check Vercel project configuration
- Ensure vercel.json is properly configured
- Run `npx vercel` manually to test

## Output Example

```
🦚 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM — SuperCommit MAX
📌 Cambiando a branch main...
📥 Actualizando desde origin main...
🧹 Realizando limpieza previa...
📦 Instalando dependencias...
📁 Verificando estructura de directorios...
➕ Añadiendo archivos al staging area...
💎 Creando commit con mensaje detallado...
🚀 Enviando cambios a origin main...
🌐 Desplegando en Vercel...

════════════════════════════════════════════════════════════════
✅ RESULTADO FINAL
════════════════════════════════════════════════════════════════
📦 Repositorio: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
🌿 Branch: main
🌐 Dominio: https://tryonyou.app
📊 Estado: LIVE + sincronizado
🔗 Notifications: @abvet_deploy_bot (Telegram)
💎 Generado por: Agente 70 — SuperCommit MAX
════════════════════════════════════════════════════════════════
```

## Integration with CI/CD

This script is designed to work alongside GitHub Actions and other CI/CD tools. It can be:

- Triggered manually by developers
- Called from GitHub Actions workflows
- Integrated into pre-deployment pipelines
- Used as part of release automation

## Related Documentation

- [Repository Workflow](./flujo_repositorio.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
- [Architecture Documentation](./arquitectura_empresa.md)

## Support

For issues or questions about Supercommit MAX:
1. Check the [Deployment Guide](../DEPLOYMENT_GUIDE.md)
2. Review recent git logs for error patterns
3. Verify environment configuration
4. Contact the development team

---

**Generated by**: Agente 70 — SuperCommit MAX
**Last Updated**: January 2026
