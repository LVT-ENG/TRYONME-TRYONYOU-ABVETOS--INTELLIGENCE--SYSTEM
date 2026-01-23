# TRYONYOU Gold Edition Launcher

## Overview

`launcher_tryonyou.py` is a standalone Python script that automates the deployment and launch of the TRYONYOU Gold Edition Pilot V7 experience. It creates a complete project structure, generates a luxury web interface, and launches a local web server.

## Features

✨ **Automated Deployment**
- Creates complete directory structure on user's desktop
- Generates production-ready HTML interface (Gold Edition)
- Organizes assets automatically from ZIP files or loose files

🎬 **Asset Management**
- Extracts video files (MP4, MOV) and configures them as hero content
- Organizes image files (JPG, PNG, JPEG) for garment display
- Automatic cleanup of temporary extraction directories

🌍 **Local Web Server**
- Launches HTTP server on port 8080
- Automatically opens browser to the experience
- Graceful shutdown with Ctrl+C

## Requirements

- Python 3.6 or higher (no additional packages needed)
- Standard library modules used:
  - `os` - File system operations
  - `shutil` - File operations
  - `zipfile` - ZIP extraction
  - `time` - Delays for browser launch
  - `webbrowser` - Auto-open browser
  - `threading` - Background browser launch
  - `http.server` - Simple HTTP server
  - `socketserver` - Server infrastructure

## Usage

### Basic Launch

```bash
python3 launcher_tryonyou.py
```

### With Assets

Place your assets in the same directory as the launcher:

```bash
# Option 1: Loose files
launcher_tryonyou.py
hero_video.mp4
garment_dress.jpg

# Option 2: ZIP archives
launcher_tryonyou.py
assets.zip
```

The launcher will automatically:
1. Extract ZIP files to temporary directory
2. Find the first video file → `hero_gold_dust.mp4`
3. Find dress/vestido images → `garment_match.jpg`
4. Copy them to the appropriate asset folders
5. Clean up temporary files

### Stopping the Server

Press `Ctrl+C` in the terminal to stop the server gracefully.

## Directory Structure

The launcher creates this structure on your desktop:

```
~/Desktop/TRYONYOU_PILOT_V7_LIVE/
├── 01_THE_EXPERIENCE/
│   ├── index.html              # Generated Gold Edition interface
│   └── assets/
│       ├── video/
│       │   └── hero_gold_dust.mp4
│       └── images/
│           └── garment_match.jpg
├── 02_THE_ENGINE/              # Reserved for backend logic
├── 03_THE_BRAND/               # Reserved for brand assets
└── 04_IP_VAULT_SECURE/         # Reserved for IP documentation
```

## Configuration

You can modify these constants at the top of the script:

```python
PORT = 8080                    # Change server port
USER_DESKTOP = "~/Desktop"     # Change deployment location
PROJECT_ROOT = "..."           # Change project folder name
```

## Gold Edition Interface

The generated HTML includes:

- **Luxury Design**: Gold (#d4af37) color scheme with dark background
- **Responsive Layout**: Mobile-first design with breakpoints
- **Animations**: Smooth fade-in, pulse, and hover effects
- **Hero Section**: Full-screen video with overlay
- **Feature Cards**: 4 highlighted features with icons
- **Garment Preview**: Display for featured clothing items
- **Fallback Handling**: Graceful degradation if assets are missing

## Troubleshooting

### Port Already in Use

If port 8080 is taken, modify the `PORT` constant:

```python
PORT = 8081  # Or any available port
```

### Permission Denied

Ensure you have write permissions to the Desktop folder:

```bash
# Check permissions
ls -ld ~/Desktop

# If needed, fix permissions
chmod 755 ~/Desktop
```

### Assets Not Found

The launcher will still work without assets but shows fallback:
- Video section displays gradient background
- Image preview is hidden

To add assets after launch:
1. Copy files to the appropriate folders in `TRYONYOU_PILOT_V7_LIVE`
2. Refresh browser (F5)

## Development

### Testing Without Launching Server

```python
import launcher_tryonyou

# Test directory creation only
for key, path in launcher_tryonyou.DIRS.items():
    print(f"{key}: {path}")

# Test HTML generation
print(len(launcher_tryonyou.HTML_CODE))
```

### Modifying the HTML

The complete HTML is stored in the `HTML_CODE` variable. Edit this to customize:
- Colors and styling (CSS section)
- Layout and content (HTML body)
- Interactions (JavaScript section)

## Security

✅ **Security Checks Passed**
- Specific exception handling (no bare `except`)
- Safe file extension parsing with `os.path.splitext()`
- No external dependencies or remote code execution
- Local server only (127.0.0.1)

## License

Private - TRYONYOU © 2025

---

**Version**: Gold Edition Pilot V7  
**Created**: January 2025  
**Platform**: Cross-platform (Windows, macOS, Linux)
