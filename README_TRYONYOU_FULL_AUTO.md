# 🚀 TRYONYOU Full Auto Script

> Complete automation for TRYONYOU setup, theme, build, deploy, and backup

## What is this?

`tryonyou_full_auto.sh` is a comprehensive bash script that automates the entire TRYONYOU project setup from zero to production deployment. Perfect for:

- ✅ New developers joining the team
- ✅ Setting up fresh development environments  
- ✅ Automated CI/CD deployments
- ✅ Quick production deployments

## Quick Start (2 Commands)

```bash
chmod +x tryonyou_full_auto.sh
./tryonyou_full_auto.sh
```

That's it! The script will handle everything else automatically.

## What Gets Installed?

### System Dependencies
- Git
- curl
- Node.js (LTS)
- npm
- Vercel CLI

### Project Components
- Complete theme system (cloud + beige + gold design)
- 5 pre-built HTML sections
- Logo and brand assets
- Build configuration
- Deployment settings

### Automation
- Automatic dependency installation
- Repository cloning/updating
- Project building
- Vercel deployment
- Timestamped backups

## Requirements

**macOS:**
- Terminal access
- Internet connection
- Vercel account

**Linux (Ubuntu/Debian):**
- Terminal with `sudo` access
- Internet connection
- Vercel account

## What Happens When You Run It?

The script performs 14 steps:

1. Detects your OS (macOS/Linux)
2. Installs base packages (git, curl, Node.js)
3. Installs Vercel CLI
4. Logs into Vercel (interactive if needed)
5. Clones/updates repository to `$HOME/TRYONYOU_MASTER`
6. Loads `.env` file (if exists)
7. Creates directory structure
8. Generates `theme.css` with complete design system
9. Creates 5 HTML sections (wardrobe, testimonials, partners, roadmap, gallery)
10. Generates logo SVG
11. Modifies `index.html` to include theme and navbar
12. Builds project (`npm install && npm run build`)
13. Deploys to Vercel production
14. Creates timestamped backup

## Expected Results

### Local System
```
$HOME/TRYONYOU_MASTER/
├── src/styles/theme.css          ✅ Generated
├── src/sections/*.html           ✅ 5 sections
├── public/brand/logo.svg         ✅ Logo
├── node_modules/                 ✅ Dependencies
└── dist/                         ✅ Build artifacts
```

### Production
- ✅ Live at https://tryonyou.app
- ✅ SSL certificate active
- ✅ All pages accessible

### Backup
```
$HOME/TRYONYOU_BACKUPS/
└── tryonyou_YYYYMMDD_HHMMSS.tar.gz  ✅ Created
```

## Theme System

The script generates a complete theme with:

**Color Palette:**
- Cloud White: #F9FAFB
- Beige Base: #EDE3CF  
- Beige Gloss: #F4E9D2 (plastificado)
- Gold: #D4AF37
- Anthracite: #222326

**Components:**
- Sticky navigation bar with frosted glass effect
- Gradient cards with hover animations
- Gold gradient buttons
- Responsive grids for all sections
- Mobile-optimized layouts

## Documentation

- 📖 **[QUICK_START.md](QUICK_START.md)** - 2-command quick start
- 📖 **[TRYONYOU_FULL_AUTO_USAGE.md](TRYONYOU_FULL_AUTO_USAGE.md)** - Complete guide
- 📖 **[EXAMPLES.md](EXAMPLES.md)** - 10 usage scenarios  
- 📖 **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Implementation summary

## Troubleshooting

### Script won't run
```bash
# Make sure it's executable
chmod +x tryonyou_full_auto.sh
```

### Permission denied (Linux)
```bash
# You need sudo for apt-get
sudo -v
./tryonyou_full_auto.sh
```

### Vercel login fails
```bash
# Login manually first
vercel login
# Then run script
./tryonyou_full_auto.sh
```

For more troubleshooting, see [TRYONYOU_FULL_AUTO_USAGE.md](TRYONYOU_FULL_AUTO_USAGE.md)

## Advanced Usage

### With Environment Variables
```bash
# Create .env file first
cat > .env <<EOF
VERCEL_TOKEN=your_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
EOF

# Run script (no manual login needed)
./tryonyou_full_auto.sh
```

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Deploy TRYONYOU
  run: |
    chmod +x tryonyou_full_auto.sh
    ./tryonyou_full_auto.sh
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

See [EXAMPLES.md](EXAMPLES.md) for 10 more scenarios.

## Platform Support

| Platform | Status | Package Manager |
|----------|--------|-----------------|
| macOS | ✅ Supported | Homebrew |
| Ubuntu | ✅ Supported | apt |
| Debian | ✅ Supported | apt |
| Other Linux | ⚠️ May work | Manual setup needed |
| Windows | ❌ Not supported | Use WSL2 |

## File Structure Created

```
$HOME/TRYONYOU_MASTER/
├── src/
│   ├── styles/
│   │   └── theme.css               # Complete theme system
│   └── sections/
│       ├── wardrobe.html
│       ├── testimonials.html
│       ├── partners.html
│       ├── roadmap.html
│       └── gallery_claims.html
├── public/
│   └── brand/
│       └── logo.svg
├── assets/
├── scripts/
├── .github/
│   └── workflows/
└── index.html                      # Modified with theme & navbar
```

## Success Indicators

When the script completes successfully, you'll see:

```
════════════════════════════════════════════════════════════════
🎉 TRYONYOU FULL AUTO — COMPLETADO
════════════════════════════════════════════════════════════════
📂 Proyecto: /Users/you/TRYONYOU_MASTER
🌐 URL: https://tryonyou.app
💾 Backup: /Users/you/TRYONYOU_BACKUPS/tryonyou_20251015_120000.tar.gz
════════════════════════════════════════════════════════════════

✅ Todo listo. Verifica tu despliegue en https://tryonyou.app
```

## Features

- ✅ **Cross-platform**: Works on macOS and Linux
- ✅ **Idempotent**: Safe to run multiple times
- ✅ **Automatic backups**: Never lose your work
- ✅ **Smart updates**: Git pull if repo exists, clone if not
- ✅ **Error handling**: Stops on errors, shows clear messages
- ✅ **Colored output**: Easy to read progress indicators
- ✅ **Complete theme**: Professional design system included
- ✅ **Production ready**: Deploys to Vercel automatically

## Statistics

- **Size:** 15KB
- **Lines:** 332
- **Steps:** 14
- **Documentation:** 1,334 lines across 5 files
- **Sections created:** 5 HTML files
- **Theme variables:** 11 CSS variables
- **Components styled:** 15+

## License

Part of the TRYONYOU project. See main repository for license details.

## Support

For issues or questions:
1. Check [TRYONYOU_FULL_AUTO_USAGE.md](TRYONYOU_FULL_AUTO_USAGE.md) troubleshooting section
2. Review [EXAMPLES.md](EXAMPLES.md) for similar scenarios  
3. Run in debug mode: `bash -x tryonyou_full_auto.sh`
4. Contact the development team

---

**Made with ❤️ for the TRYONYOU team**

*Version 1.0.0 - Production Ready*
