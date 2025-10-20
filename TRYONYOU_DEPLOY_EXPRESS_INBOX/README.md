# TRYONYOU_DEPLOY_EXPRESS_INBOX

This directory is used to store ZIP files for automatic deployment.

## Usage

Place your deployment ZIP files here. The retrodeploy system will:
1. Detect new ZIP files automatically (via watcher.js)
2. Clean duplicate files keeping the most recent ones
3. Deploy changes to production

## Expected ZIP Format

ZIP files should follow this naming convention:
```
TRYONYOU_DEPLOY_EXPRESS_YYYYMMDD_HHMM.zip
```

Example:
```
TRYONYOU_DEPLOY_EXPRESS_20251020_0737.zip
```

## Automatic Processing

When you place ZIP files here:
- The watcher daemon (if running) will detect them within 30 seconds
- Duplicates will be automatically cleaned
- The deployment pipeline will be triggered
- Changes will be committed and deployed to tryonyou.app

## Manual Deployment

To manually trigger deployment:
```bash
cd ../retrodeploy
./deploy.sh
```

## Notes

- ZIP files are ignored by git (see .gitignore)
- Only keep necessary deployment packages
- Old ZIPs are automatically removed when duplicates are detected
