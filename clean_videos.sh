#!/bin/zsh
set -e

echo "=== TRYONYOU VIDEO CLEANUP START ==="

# Find an external volume automatically (first one that is not the system disk)
EXTERNAL_VOLUME=""
for v in /Volumes/*; do
  name=$(basename "$v")
  if [ "$name" != "Macintosh HD" ] && [ "$name" != "Macintosh HD - Datos" ] && [ "$name" != "MacintoshHD" ]; then
    EXTERNAL_VOLUME="$v"
    break
  fi
done

if [ -z "$EXTERNAL_VOLUME" ]; then
  echo "⚠️  No external volume found. Videos will be moved to ~/Desktop/TRYONYOU_VIDEOS_BACKUP"
  BACKUP_DIR="$HOME/Desktop/TRYONYOU_VIDEOS_BACKUP"
else
  echo "✅ External volume found: $EXTERNAL_VOLUME"
  BACKUP_DIR="$EXTERNAL_VOLUME/TRYONYOU_VIDEOS_BACKUP"
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo "📁 Backup directory: $BACKUP_DIR"

# Define video locations to clean
VIDEO_LOCATIONS=(
  "$HOME/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX/Backups_Grandes"
  "$HOME/Movies"
  "$HOME/Desktop"
  "$HOME/Downloads"
)

echo ""
echo "🔍 Searching for video files..."
TOTAL_SIZE=0
FILE_COUNT=0

# Constants for size conversion
GB_IN_BYTES=1073741824
MB_IN_BYTES=1048576

# Find and move video files
for location in "${VIDEO_LOCATIONS[@]}"; do
  if [ -d "$location" ]; then
    echo "Scanning: $location"
    
    # Find video files (mov, mp4, avi, mkv, etc.)
    while IFS= read -r video; do
      if [ -f "$video" ]; then
        # Get file size (macOS-specific stat command)
        size=$(stat -f%z "$video" 2>/dev/null || echo 0)
        TOTAL_SIZE=$((TOTAL_SIZE + size))
        FILE_COUNT=$((FILE_COUNT + 1))
        
        # Create relative path structure in backup
        rel_path="${video#$HOME/}"
        backup_path="$BACKUP_DIR/$rel_path"
        backup_dir=$(dirname "$backup_path")
        
        # Create backup directory structure
        mkdir -p "$backup_dir"
        
        # Move video file
        echo "  📹 Moving: $(basename "$video")"
        mv "$video" "$backup_path"
      fi
    done < <(find "$location" -type f \( -iname "*.mov" -o -iname "*.mp4" -o -iname "*.avi" -o -iname "*.mkv" -o -iname "*.m4v" \) 2>/dev/null)
  fi
done

# Convert bytes to human-readable format
if [ $TOTAL_SIZE -gt $GB_IN_BYTES ]; then
  SIZE_GB=$((TOTAL_SIZE / GB_IN_BYTES))
  SIZE_DISPLAY="${SIZE_GB} GB"
elif [ $TOTAL_SIZE -gt $MB_IN_BYTES ]; then
  SIZE_MB=$((TOTAL_SIZE / MB_IN_BYTES))
  SIZE_DISPLAY="${SIZE_MB} MB"
else
  SIZE_DISPLAY="${TOTAL_SIZE} bytes"
fi

echo ""
echo "=== CLEANUP COMPLETE ==="
echo "📊 Files moved: $FILE_COUNT"
echo "💾 Total size: $SIZE_DISPLAY"
echo "📂 Backup location: $BACKUP_DIR"
echo ""
echo "✨ Your Mac is now cleaner!"
