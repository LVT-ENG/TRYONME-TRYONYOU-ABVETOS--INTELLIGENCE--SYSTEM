# Scripts

This directory contains utility scripts for the TRYONYOU project.

## generate-deploy-zip-accumulative.cjs

Generates a deployment ZIP file for TRYONYOU.app that includes:
- Updated HTML, CSS, and JavaScript files
- React App with TypeScript structure
- i18n internationalization setup
- Vite configuration
- GitHub Actions workflow for deployment
- Premium styling with sparkle animations

### Usage

```bash
# Using npm script (recommended)
npm run generate-deploy-zip

# Or directly with node
node scripts/generate-deploy-zip-accumulative.cjs
```

### Output

The script will:
1. Create a temporary `tryonyou-deploy/` directory with all deployment files
2. Generate a `tryonyou-deploy.zip` archive containing all files
3. Display the size of the generated ZIP file

Both the temporary directory and ZIP file are excluded from git via `.gitignore`.

### Dependencies

- `archiver` - Used for creating ZIP archives

Install dependencies with:
```bash
npm install
```
