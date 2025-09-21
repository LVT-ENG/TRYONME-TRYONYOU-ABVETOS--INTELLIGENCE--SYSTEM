# Makefile Quick Reference

## 🚀 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM

```bash
# Complete workflow (as requested in issue #144)
make all

# Individual steps
make integrate    # Git operations and branch merging
make components   # Web component generation  
make pau          # Video rendering (requires ffmpeg)
make docs         # PDF document generation
make build        # Vite compilation
make commit       # Git commit and push
make deploy       # Vercel deployment with notifications

# Utilities
make install      # Install dependencies
make clean        # Clean temporary files
make help         # Show detailed help
```

## Environment Variables for Deploy

```bash
export VERCEL_TOKEN="your_token"
export VERCEL_PROJECT_ID="your_project_id" 
export VERCEL_ORG_ID="your_org_id"
export TELEGRAM_BOT_TOKEN="your_bot_token"    # Optional
export TELEGRAM_CHAT_ID="your_chat_id"       # Optional
```

See [Full Documentation](./docs/MAKEFILE_ORCHESTRATION.md) for complete details.