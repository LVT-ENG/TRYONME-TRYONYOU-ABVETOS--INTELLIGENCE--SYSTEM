# TRYONYOU PRO Launcher

## Overview

`launcher_tryonyou_pro.py` is an intelligent file organization and demo launcher system for TRYONYOU projects. It automatically analyzes, classifies, and organizes project files into a structured directory on your Desktop, then launches a luxury demo web experience.

## Features

### 🧠 Intelligent File Classification
- **Videos** (MP4, MOV, AVI): Automatically designates the first video as the hero video for the web demo
- **Images** (JPG, PNG, JPEG, WEBP): Classifies garment/fashion photos for the demo and marketing materials
- **Documents** (PDF, DOC, DOCX, TXT, MD): Sorts into technical documentation, marketing copy, or secure vault based on keywords
- **Code** (PY, JS, HTML, CSS, JSON): Archives in the engine source code directory

### 📁 Project Structure
Creates a master project on your Desktop with four zones:
```
TRYONYOU_MASTER_PROJECT/
├── 01_DEMO_EXPERIENCE/          # Web demo assets
│   ├── index.html               # Generated luxury demo page
│   └── assets/
│       ├── video/               # Hero videos
│       └── images/              # Garment photos
├── 02_THE_ENGINE/               # Technical files
│   ├── documentation/           # Docs and specs
│   └── source_code/             # Code files
├── 03_BRAND_MARKETING/          # Marketing materials
│   ├── raw_footage/             # Video assets
│   ├── photoshoot_inspiration/  # Photo library
│   └── copywriting_texts/       # Marketing copy
└── 04_IP_SECRET_VAULT/          # Secure documents
    └── (patents, contracts, NDAs)
```

### 🌐 Demo Web Experience
Generates a luxury-styled HTML demo page featuring:
- Hero video section with TRYONYOU branding
- Glass morphism effects and gradient backgrounds
- Responsive design optimized for all devices
- Feature showcase with animations
- Local HTTP server on port 8080

## Usage

### Prerequisites
- Python 3.6+
- Standard library modules (no external dependencies required)

### Running the Launcher

```bash
python3 launcher_tryonyou_pro.py
```

The script will:
1. ✅ Create the organized folder structure on your Desktop
2. 📦 Extract and process any ZIP files in the current directory
3. 🗂️ Classify and organize all files intelligently
4. 🎨 Generate the luxury demo HTML page
5. 🚀 Launch a local web server at http://localhost:8080
6. 🌐 Automatically open your browser to view the demo

### Stopping the Server

Press `Ctrl+C` in the terminal to stop the web server.

## File Classification Logic

### Videos
- **First video** → Hero video for web demo (`hero_gold_dust.mp4`)
- **All videos** → Copied to Marketing/Footage for archival

### Images
- **Garment photos** (keywords: dress, vestido, garment, match) → Web assets or Marketing photos
- **Other photos** → Marketing inspiration library

### Documents
- **Sensitive** (keywords: patent, patente, contrato, agreement, nda) → Secure vault
- **Marketing** (keywords: copy, guion, script, brand) → Copywriting folder
- **Technical** → Engine documentation

### Code Files
- All source code → Engine source code directory

## Security Features

- ✅ Specific exception handling for ZIP extraction
- ✅ File extension validation
- ✅ Safe file copy operations with error handling
- ✅ HTTP server bound to localhost only (127.0.0.1)
- ✅ No external dependencies required
- ✅ CodeQL security scan passed

## Error Handling

The launcher includes robust error handling:
- Corrupted ZIP files are skipped with warnings
- Files without extensions are safely ignored
- File copy errors are logged without crashing
- Continues processing remaining files on errors

## Notes

- The temporary extraction directory `_TEMP_ANALYSIS_ZONE` is automatically cleaned up after processing
- Files are copied (not moved), so your original files remain intact
- The launcher excludes itself from being copied
- All file operations are performed safely with validation

## Support

For issues or questions about TRYONYOU, please contact the development team.

---

**TRYONYOU** - *LIVE IT - Where Beauty Lives in Movement*  
© 2025 TRYONYOU - Powered by Advanced AI Technology
