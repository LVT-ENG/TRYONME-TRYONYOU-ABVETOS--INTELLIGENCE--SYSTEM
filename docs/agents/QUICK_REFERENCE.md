# 🚀 TRYONYOU Agents - Quick Reference

## Agent Overview

| ID | Name | Status | Trigger | Output |
|----|------|--------|---------|--------|
| 70 | Orquestador General | 🟢 | Hourly + 09:00 UTC | Status report, Telegram |
| 22 | Deploy Operator | 🟢 | Push to main | Vercel deploy, Screenshots |
| 20 | GitHub Agent | 🟢 | Daily 08:00 UTC | Repo analysis |
| 12 | Brand Guardian | 🟢 | Daily 10:00 UTC | Brand report |
| 46 | Document Locker | 🟢 | Daily 11:00 UTC | Docs verification |
| 31 | Video Curator | 🟡 | Pending | - |
| 2 | Content Pro | 🟡 | Pending | - |
| 25 | Image Curator | 🟡 | Pending | - |

## Daily Schedule (UTC)

```
06:00 ────────────────────────────────────
07:00 ────────────────────────────────────
08:00 ──────► Agent 20: Repository Check
09:00 ──────► Agent 70: Daily Report (P0/P1) ⭐
10:00 ──────► Agent 12: Brand Verification
11:00 ──────► Agent 46: Documentation Check
12:00 ────────────────────────────────────
...   ──────► Agent 70: Hourly Monitoring
```

## Quick Commands

### Trigger Agents Manually

```bash
# From GitHub Actions UI:
# 1. Go to Actions tab
# 2. Select workflow (e.g., "Agent 70 - Orquestador General")
# 3. Click "Run workflow"
# 4. Select branch: main
# 5. Click "Run workflow" button

# Or using GitHub CLI:
gh workflow run orchestrator-agent.yml
gh workflow run github-agent.yml
gh workflow run brand-guardian.yml
gh workflow run document-locker.yml
```

### Check Agent Status

```bash
# View current status
cat docs/agents/status.md

# View recent reports
ls -la docs/agents/reports/

# View specific report
cat docs/agents/reports/github-agent-*.md | head -50
```

### Monitor Workflows

```bash
# List recent workflow runs
gh run list --limit 10

# View specific workflow run
gh run view <run-id>

# Watch workflow in real-time
gh run watch
```

## Telegram Notifications

### Setup Required

1. Create bot via @BotFather
2. Get bot token
3. Get chat ID
4. Add secrets to GitHub:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### Notification Schedule

| Time (UTC) | Agent | Content |
|------------|-------|---------|
| 09:00 | Agent 70 | Daily P0/P1 priorities + quick links |
| 08:00 | Agent 20 | Repository analysis (if enabled) |
| 10:00 | Agent 12 | Brand consistency report (if enabled) |
| 11:00 | Agent 46 | Documentation status (if enabled) |
| On Deploy | Agent 22 | Deploy status + screenshots |

## Agent Responsibilities

### 🎯 Agent 70 - Orquestador General
```
✓ Coordinate all agents
✓ System health monitoring
✓ Generate daily priorities
✓ Consolidate reports
```

### 🚀 Agent 22 - Deploy Operator
```
✓ Build with Vite
✓ Deploy to Vercel
✓ Capture screenshots (desktop + mobile)
✓ Notify deployment status
```

### 📊 Agent 20 - GitHub Commit Agent
```
✓ Analyze repository metrics
✓ Check code quality
✓ Verify documentation
✓ Security scanning
```

### 🎨 Agent 12 - Brand Guardian
```
✓ Verify color palette:
  • #D3B26A (Gold)
  • #0E6B6B (Peacock)
  • #141619 (Anthracite)
  • #F5EFE6 (Bone)
✓ Check typography
✓ Validate visual assets
✓ Calculate coherence score
```

### 🔒 Agent 46 - Document Locker
```
✓ Verify legal docs (EPCT)
✓ Check patent files
✓ Validate copyright notices
✓ Scan for sensitive data
```

## Common Issues

### Agent Not Running

**Problem:** Workflow doesn't trigger
**Solution:**
```bash
# 1. Check workflow permissions
# Go to: Settings → Actions → General
# Ensure: "Read and write permissions" is enabled

# 2. Verify schedule syntax
# Cron must be in quotes: '0 9 * * *'

# 3. Check branch
# Ensure workflow is on main branch
```

### Telegram Not Working

**Problem:** No messages received
**Solution:**
```bash
# 1. Verify secrets
gh secret list

# 2. Test bot manually
curl "https://api.telegram.org/bot<TOKEN>/getMe"

# 3. Check chat ID
curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
```

### Screenshots Failing

**Problem:** Puppeteer errors
**Solution:**
```bash
# Check workflow logs for:
# - Puppeteer installation success
# - Site accessibility
# - Timeout errors

# Increase timeout if needed (in deploy.yml):
# timeout: 60000 → timeout: 120000
```

## Agent Metrics

### Success Indicators

- ✅ All workflows show green checkmarks
- ✅ Daily Telegram messages received
- ✅ Screenshots captured and sent
- ✅ Reports generated in docs/agents/reports/
- ✅ Agent status file updated

### Warning Signs

- ⚠️ Workflows failing repeatedly
- ⚠️ No Telegram notifications
- ⚠️ Outdated status file
- ⚠️ Missing reports directory
- ⚠️ Non-standard colors detected

## Quick Links

### Documentation
- 📚 [Full Agent Docs](README.md)
- 🔧 [Setup Guide](SETUP_GUIDE.md)
- 📊 [Agent Status](status.md)

### GitHub
- 🏠 [Repository](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM)
- ⚡ [Actions](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions)
- 🔐 [Secrets](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/settings/secrets/actions)

### Production
- 🌐 [tryonyou.app](https://tryonyou.app)
- 📦 [Vercel Dashboard](https://vercel.com/dashboard)

## Pro Tips

### 💡 Efficiency Tips

1. **Use workflow_dispatch** for testing
2. **Check logs immediately** if workflow fails
3. **Keep secrets rotated** every 90 days
4. **Monitor Telegram** for patterns
5. **Review reports weekly** for trends

### 🎯 Best Practices

- ✅ Test in feature branches first
- ✅ Update docs when modifying agents
- ✅ Keep secrets secure (never commit)
- ✅ Monitor agent status daily
- ✅ Review failed workflows immediately

### ⚡ Troubleshooting Speed-Run

```bash
# 1. Check overall status
cat docs/agents/status.md

# 2. View recent runs
gh run list --limit 5

# 3. Check failed workflow
gh run view $(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')

# 4. Re-run failed workflow
gh run rerun $(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
```

## Support

**Issues?** Check:
1. [Setup Guide](SETUP_GUIDE.md) - Complete configuration steps
2. [Agent Status](status.md) - Current agent health
3. Workflow logs - Detailed error messages
4. GitHub Actions docs - Platform-specific issues

---

**Version:** 1.0  
**Last Updated:** 2025-10-15  
**Maintained by:** Agent 70 - Orquestador General
