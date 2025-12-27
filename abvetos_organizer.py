import os
import shutil
import re
from pathlib import Path
from datetime import datetime

# ==========================================
# 🛠️ CONFIGURATION
# ==========================================
ROOT_DIR = os.getcwd()
TARGET_DIR = os.path.join(ROOT_DIR, "TRYONYOU_MASTER_ORGANIZED")

# Folders to Create
STRUCTURE = {
    "CODE": os.path.join(TARGET_DIR, "01_CODIGO_FUENTE"),
    "DOCS": os.path.join(TARGET_DIR, "02_DOCUMENTACION_LEGAL_PATENTES"),
    "MEDIA": os.path.join(TARGET_DIR, "03_ASSETS_VISUALES"),
    "ARCHIVE": os.path.join(TARGET_DIR, "04_ARCHIVE_OLD_ZIPS"),
    "TRASH": os.path.join(TARGET_DIR, "99_PAPELERA_DUPLICADOS"),
}

# Patterns to Ignore/Delete
IGNORE_DIRS = {'.git', '.vscode', '.idea', '__pycache__'}
DELETE_DIRS = {'node_modules', 'dist', 'build', 'coverage', '.next'}
DELETE_FILES = {'.DS_Store', 'Thumbs.db'}

# File Type Mappings
EXTENSIONS = {
    "DOCS": {'.pdf', '.docx', '.doc', '.pptx', '.txt', '.md', '.pages'},
    "MEDIA": {'.png', '.jpg', '.jpeg', '.svg', '.mp4', '.mov', '.gif', '.webp'},
    "ARCHIVE": {'.zip', '.tar.gz', '.rar', '.7z'}
}

def print_log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

def setup_directories():
    """Create the master directory structure."""
    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)
        print_log(f"📁 Created Master Directory: {TARGET_DIR}")
    
    for key, path in STRUCTURE.items():
        if not os.path.exists(path):
            os.makedirs(path)

def is_duplicate(filename):
    """Detects duplicate patterns like 'file (1).txt', 'file copia.pdf', 'file 2.jpg'."""
    # Pattern looks for " copy", " copia", " (1)", " 2", etc.
    pattern = re.compile(r'(\scopia|\scopy|\s\(\d+\)|\s\d{1,2})\.')
    return bool(pattern.search(filename))

def clean_garbage():
    """Removes node_modules and temp files to free up space."""
    print_log("🧹 Starting Deep Clean (node_modules, .DS_Store)...")
    deleted_size = 0
    
    for root, dirs, files in os.walk(ROOT_DIR, topdown=True):
        # Skip Target Directory
        if TARGET_DIR in root:
            continue

        # Remove Garbage Directories
        for d in list(dirs):
            if d in DELETE_DIRS:
                path = os.path.join(root, d)
                try:
                    # Calculate size for reporting
                    for r, _, f in os.walk(path):
                        for file in f:
                            deleted_size += os.path.getsize(os.path.join(r, file))
                    shutil.rmtree(path)
                    print_log(f"🗑️ Deleted: {path}")
                    dirs.remove(d)
                except Exception as e:
                    print_log(f"❌ Error deleting {path}: {e}")

        # Remove Garbage Files
        for f in files:
            if f in DELETE_FILES:
                os.remove(os.path.join(root, f))

    print_log(f"✨ Cleanup Complete. Approx freed: {deleted_size / (1024*1024):.2f} MB")

def organize_files():
    """Moves files to their designated folders based on type and duplicate status."""
    print_log("📦 Organizing Files...")
    
    moved_count = 0
    
    for root, dirs, files in os.walk(ROOT_DIR):
        # Skip Target Directory and hidden folders
        if TARGET_DIR in root or '/.' in root:
            continue
            
        for file in files:
            file_path = os.path.join(root, file)
            file_ext = Path(file).suffix.lower()
            
            # Destination logic
            dest_folder = None
            
            # 1. Check if Duplicate
            if is_duplicate(file):
                dest_folder = STRUCTURE["TRASH"]
            
            # 2. Check File Type
            elif file_ext in EXTENSIONS["DOCS"]:
                dest_folder = STRUCTURE["DOCS"]
            elif file_ext in EXTENSIONS["MEDIA"]:
                # Don't move assets if they are inside a 'src' or 'public' folder (code assets)
                if 'src' not in root and 'public' not in root:
                    dest_folder = STRUCTURE["MEDIA"]
            elif file_ext in EXTENSIONS["ARCHIVE"]:
                dest_folder = STRUCTURE["ARCHIVE"]
            
            # Move File
            if dest_folder:
                try:
                    # Avoid overwriting files in destination
                    dest_path = os.path.join(dest_folder, file)
                    if os.path.exists(dest_path):
                        base, extension = os.path.splitext(file)
                        dest_path = os.path.join(dest_folder, f"{base}_{int(datetime.now().timestamp())}{extension}")
                    
                    shutil.move(file_path, dest_path)
                    moved_count += 1
                except Exception as e:
                    print_log(f"⚠️ Failed to move {file}: {e}")

    print_log(f"✅ Organized {moved_count} files.")

def consolidate_master_repo():
    """Moves the main project folder if found."""
    print_log("💻 Searching for Master Repo...")
    # Based on your file logs, looking for key folders
    potential_repos = ["TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM", "TRYONYOU_MASTER"]
    
    for repo in potential_repos:
        repo_path = os.path.join(ROOT_DIR, repo)
        if os.path.exists(repo_path):
            target_path = os.path.join(STRUCTURE["CODE"], repo)
            if not os.path.exists(target_path):
                shutil.move(repo_path, target_path)
                print_log(f"🚀 Master Repo moved to: {target_path}")
            return

if __name__ == "__main__":
    print("==========================================")
    print("   ABVETOS INTELLIGENCE - DRIVE CLEANER   ")
    print("==========================================")
    
    setup_directories()
    clean_garbage()
    organize_files()
    consolidate_master_repo()
    
    print("\n==========================================")
    print(f"🎉 DONE! Check the folder: {os.path.basename(TARGET_DIR)}")
    print("   1. Code -> 01_CODIGO_FUENTE")
    print("   2. Docs -> 02_DOCUMENTACION_LEGAL")
    print("   3. Media -> 03_ASSETS_VISUALES")
    print("   4. Zips -> 04_ARCHIVE_OLD_ZIPS")
    print("   5. Dups -> 99_PAPELERA_DUPLICADOS")
    print("==========================================")
