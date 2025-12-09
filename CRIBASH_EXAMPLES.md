# CribaSH 2.0 — Example Usage Tutorial

This document provides step-by-step examples of using CribaSH 2.0 in different scenarios.

## Prerequisites Check

Before running the script, verify you have the required tools:

```bash
# Check rsync
rsync --version

# Check zip
zip --version

# Check git
git --version

# Check gh (optional, for PR creation)
gh --version
```

If any are missing, install them:
- **macOS**: `brew install rsync zip gh`
- **Linux**: `sudo apt install rsync zip gh` (Debian/Ubuntu)

## Example 1: Complete Workflow (Most Common)

This example shows the full process from cleaning to PR creation.

### Step 1: Prepare Your Environment

```bash
# Navigate to your working directory
cd ~/Projects

# Make sure DeployExpress folder exists
ls -la ~/DeployExpress

# Or use a custom folder (you'll be asked during script execution)
ls -la ~/MyCustomProject
```

### Step 2: Run the Script

```bash
# Make script executable (only needed once)
chmod +x cribash2.0.sh

# Run the script
./cribash2.0.sh
```

### Step 3: Follow the Prompts

**Prompt 1: Origin Folder**
```
Origen esperado: /Users/yourname/DeployExpress
```
- If the folder exists → Script continues automatically
- If not found → Enter correct path or press ENTER to cancel

**Prompt 2: Large Files** (if any >200MB found)
```
Se han detectado archivos grandes (>=200MB):
     1  /Users/yourname/DeployExpress/video.mp4
     2  /Users/yourname/DeployExpress/backup.dmg

¿Quieres que MUEVA esos archivos grandes a /tmp/TRYONYOU_LARGE_FILES/? (yes/no)
```
- Type `yes` → Files moved to /tmp (preserving structure)
- Type `no` → Files stay in place

**Prompt 3: Include ZIP** (if ZIP exists at `/mnt/data/archive_20251207_161946.zip`)
```
Se ha encontrado un ZIP interno en: /mnt/data/archive_20251207_161946.zip
¿Deseas que copie... dentro de la criba en ASSETS-DEMO/? (yes/no)
```
- Type `yes` → ZIP copied to ASSETS-DEMO/
- Type `no` → ZIP not included

**Prompt 4: Repository URL**
```
Introduce la URL del repositorio GitHub destino:
```
- Enter: `git@github.com:LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git`
- Or: `https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git`
- Or: Press ENTER to skip Git operations

**Prompt 5: Create PR** (if gh CLI is installed)
```
gh CLI detectado. ¿Quieres crear PR al main/master del repo remoto? (yes/no)
```
- Type `yes` → PR created automatically
- Type `no` → Only Git push, no PR

### Step 4: Get Your Results

After completion, you'll see:

```
=== LISTO. Copia los siguientes mensajes y pégalos en Copilot y Manus ===

Repositorio (branch): git@github.com:LVT-ENG/TRYONME.git (branch: design/criba2.0)

MENSAJE PARA COPILOT:
---------------------------------------------------------------
Copilot: usa el contenido del repo https://github.com/LVT-ENG/TRYONME/tree/design/criba2.0/ASSETS-DEMO...
---------------------------------------------------------------

MENSAJE PARA MANUS:
---------------------------------------------------------------
Manus: escanea el repo https://github.com/LVT-ENG/TRYONME/tree/design/criba2.0...
---------------------------------------------------------------

El ZIP con la criba está en: /Users/yourname/TRYONYOU_DEMO_CLEAN_20241209_183045.zip
La criba limpia está en: /Users/yourname/TRYONYOU_DEMO_CLEAN
```

**Copy the messages and use them with Copilot/Manus!**

## Example 2: Local Cleanup Only (No Git)

If you just want to create a clean folder and ZIP without Git operations:

```bash
./cribash2.0.sh
```

When prompted for repository URL, just press **ENTER**:

```
Introduce la URL del repositorio GitHub destino:
[Press ENTER]

No se proporcionó URL. El proceso terminó dejando la criba en: ~/TRYONYOU_DEMO_CLEAN y el ZIP en: ~/TRYONYOU_DEMO_CLEAN_20241209_183045.zip
```

**Result**: Clean folder + ZIP only

## Example 3: Custom Source Folder

If your project is not in `~/DeployExpress`:

```bash
./cribash2.0.sh
```

When prompted:
```
ATENCIÓN: Carpeta origen /Users/yourname/DeployExpress no encontrada.
Introduce la ruta correcta de DeployExpress (o ENTER para cancelar):
/Users/yourname/MyProject/CustomFolder
```

The script will use your custom folder as the source.

## Example 4: Different Branch Name

To use a different branch name, edit the script before running:

```bash
# Edit the script
nano cribash2.0.sh

# Change this line (around line 8):
BRANCH="design/criba2.0"

# To your desired branch:
BRANCH="feature/demo-cleanup"

# Save and exit (Ctrl+X, Y, Enter)
```

Then run normally:
```bash
./cribash2.0.sh
```

## Example 5: Customizing File Filters

To include additional file types (e.g., `.md`, `.txt`):

```bash
# Edit the script
nano cribash2.0.sh

# Find the rsync section (around line 34)
# Add new --include lines:

rsync -av --progress "$ORIG/" "$LIMPIO/" \
  --include="*/" \
  --include="*.html" \
  --include="*.md" \     # Add this
  --include="*.txt" \    # Add this
  --include="*.js" \
  ...
```

To exclude additional patterns:

```bash
# Find the --exclude section (around line 53)
# Add new --exclude lines:

  --exclude="node_modules/" \
  --exclude=".git/" \
  --exclude="**/.vscode/**" \  # Add this
  --exclude="**/.idea/**" \    # Add this
  ...
```

## Example 6: Automated Workflow with Script

For repeated use, create a wrapper script:

```bash
# Create automation script
cat > auto_cribash.sh << 'EOF'
#!/bin/bash

# Automated CribaSH workflow
cd /path/to/cribash

# Run with predefined answers using expect or here-doc
./cribash2.0.sh << ANSWERS
no
no
git@github.com:LVT-ENG/TRYONME.git
yes
ANSWERS

echo "Automated cleanup complete!"
EOF

chmod +x auto_cribash.sh
./auto_cribash.sh
```

**Note**: This requires the `expect` package for fully automated input.

## Example 7: Verifying the Clean Copy

After running CribaSH, verify the output:

```bash
# Check the clean folder structure
tree -L 2 ~/TRYONYOU_DEMO_CLEAN

# Check file types included
find ~/TRYONYOU_DEMO_CLEAN -type f | grep -E '\.(html|js|css|json|png|jpg)$' | wc -l

# Check folder sizes
du -sh ~/TRYONYOU_DEMO_CLEAN
du -sh ~/TRYONYOU_DEMO_CLEAN_*.zip

# Verify no unwanted files
find ~/TRYONYOU_DEMO_CLEAN -name "node_modules" -o -name ".git" -o -name "*.log"
# Should return nothing
```

## Example 8: Reviewing Before Push

If you want to review changes before pushing:

```bash
# Run CribaSH but DON'T provide repo URL
./cribash2.0.sh
# Press ENTER at "Introduce la URL del repositorio"

# Review the clean folder
cd ~/TRYONYOU_DEMO_CLEAN
ls -la
find . -type f | head -20

# If satisfied, manually push:
git init
git checkout -b design/criba2.0
git remote add origin git@github.com:LVT-ENG/TRYONME.git
git add .
git commit -m "CribaSH 2.0 — demo clean"
git push -u origin design/criba2.0 --force
```

## Troubleshooting Examples

### Problem: Permission Denied

```bash
# If you get "Permission denied"
sudo chmod +x cribash2.0.sh
./cribash2.0.sh

# Or run with bash explicitly
bash cribash2.0.sh
```

### Problem: rsync Not Found

```bash
# Install rsync
# macOS:
brew install rsync

# Linux (Ubuntu/Debian):
sudo apt update && sudo apt install rsync

# Verify installation
rsync --version
```

### Problem: ZIP Creation Fails

```bash
# Check if zip is installed
which zip

# If not, install:
# macOS:
brew install zip

# Linux:
sudo apt install zip
```

### Problem: Git Push Fails

```bash
# Check SSH keys
ssh -T git@github.com

# Or use HTTPS instead
# When prompted for URL, use:
https://github.com/LVT-ENG/TRYONME.git
```

### Problem: Large Files Detection Slow

```bash
# If find is slow on large filesystems, you can:
# 1. Skip the large files check by editing the script
# 2. Or limit the search depth:

# Edit line 78 in cribash2.0.sh:
find "$ORIG" -maxdepth 3 -type f -size +200M 2>/dev/null > "$LARGE_LIST" || true
```

## Best Practices

1. **Backup First**: Always keep a backup of your original folder
2. **Test Run**: First time using? Try with a small test folder
3. **Review Output**: Check the clean folder before pushing to Git
4. **Custom Filters**: Adjust include/exclude patterns for your project
5. **Version Control**: Keep the script in version control with your settings
6. **Documentation**: Document any custom modifications you make

## Next Steps After CribaSH

After running CribaSH successfully:

1. **Share with Team**: Send the AI messages to Copilot and Manus
2. **Review PR**: Check the automatically created PR on GitHub
3. **Test Build**: Clone the clean repo and test if it builds
4. **Document Changes**: Note what was cleaned and why
5. **Iterate**: Run again if you need to refine the cleanup

---

**Questions?** Check `CRIBASH_2.0_README.md` for detailed documentation.

**Version**: 2.0  
**Last Updated**: December 2024
