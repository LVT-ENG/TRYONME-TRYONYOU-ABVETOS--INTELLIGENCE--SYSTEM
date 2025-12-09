# TRYONYOU - Deployment Guide

## Unified Final Deployment Flow

This guide explains how to use the unified deployment system to create a production-ready package of the TRYONYOU application.

## Prerequisites

- Node.js (v16 or higher)
- Python 3.x
- npm or yarn

## Quick Start

To create a production package, simply run:

```bash
./deploy_final.sh
```

This will:
1. Create the necessary directory structure
2. Generate placeholder files for fusion media assets
3. Install dependencies (if needed)
4. Build the React application
5. Package everything into a ZIP file

## Output

The script will create a file named `TRYONYOU_PRODUCTO_VENDIBLE.zip` containing:

```
TRYONYOU_PRODUCTO_FINAL/
├── web_app/           # Compiled React application (from dist/)
│   ├── index.html
│   ├── assets/
│   └── ...
└── assets/            # Additional assets from public/
    ├── fusion_media/  # 3D models and videos
    │   ├── PIAPCOC_Avatar_Model.glb
    │   └── ABVETOS_3D_Fusion.mp4
    └── ...
```

## Manual Steps

If you prefer to run the steps manually:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the deployment:**
   ```bash
   npm run deploy:final
   ```

## Important Notes

### Fusion Media Placeholders

The script creates placeholder files for fusion media assets:
- `public/assets/fusion_media/PIAPCOC_Avatar_Model.glb` (3D avatar model)
- `public/assets/fusion_media/ABVETOS_3D_Fusion.mp4` (3D fusion video)

⚠️ **WARNING**: These placeholder files are empty (0 bytes). Before final delivery, you must replace them with actual assets.

The Python packaging script will detect empty placeholders and display a warning, but the build will continue successfully.

### Replacing Placeholders

To replace the placeholder files with real assets:

1. **Manual replacement:**
   ```bash
   cp /path/to/your/PIAPCOC_Avatar_Model.glb public/assets/fusion_media/
   cp /path/to/your/ABVETOS_3D_Fusion.mp4 public/assets/fusion_media/
   ```

2. **Then run deployment again:**
   ```bash
   ./deploy_final.sh
   ```

## Troubleshooting

### Build Fails

If the build fails, check:
- Node.js version is compatible (v16+)
- All dependencies are installed (`npm install`)
- No syntax errors in the code

### Python Script Fails

If the Python packaging script fails:
- Ensure Python 3 is installed (`python3 --version`)
- Check that the `dist` directory was created by the build
- Verify file permissions

### ZIP Not Created

If the ZIP file is not created:
- Check the console output for errors
- Ensure you have write permissions in the project directory
- Make sure the `dist` directory exists

## Project Structure

```
TRYONYOU/
├── deploy_final.sh              # Main deployment script
├── generate_final_product.py    # Python packaging script
├── package.json                 # Updated with deploy:final command
├── public/
│   └── assets/
│       └── fusion_media/        # Placeholder directory
└── ...
```

## Development Workflow

For development:
```bash
npm run dev
```

For production build only:
```bash
npm run build
```

For final deployment package:
```bash
./deploy_final.sh
# or
npm run deploy:final
```

## Cleanup

The deployment script automatically:
- Removes temporary photo files after packaging
- Preserves the build artifacts in `dist/` (can be cleaned manually)

To clean up manually:
```bash
rm -f TRYONYOU_PRODUCTO_VENDIBLE.zip
rm -rf dist/
```

## Support

For issues or questions, please refer to the main project documentation or contact the development team.
