import os
import shutil

# Project Configuration
SOURCE_DIR = "./"  # Where your current project files are
TARGET_DIR = "TRYONYOU_CONTEXT_STUDIO"
MANIFEST_NAME = "MANIFEST_SUMMARY.txt"

# Critical files identified from mission logs
CRITICAL_FILES = [
    "api/index.py",
    "src/pages/Home.jsx",
    "src/components/VirtualMirror.tsx",
    "vercel.json",
    "tailwind.config.js",
    "QUICK_START_DIVINEO.pdf",
    "VALIDACION_PILOTO_TRYONYOU.pdf",
    "ESTRATEGIA_COMERCIAL_V9.pdf",
    "MANIFESTO_MASTER.txt"
]

def create_context_bunker():
    """Consolidates project assets into a single folder for AI Studio upload."""
    
    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)
        print(f"[*] Created directory: {TARGET_DIR}")

    found_count = 0
    
    # Copying files
    for file_path in CRITICAL_FILES:
        if os.path.exists(file_path):
            # Maintain simple structure for AI Studio
            file_name = os.path.basename(file_path)
            shutil.copy2(file_path, os.path.join(TARGET_DIR, file_name))
            print(f"[+] Added: {file_name}")
            found_count += 1
        else:
            print(f"[!] Warning: {file_path} not found in path.")

    # Generate the Manifest Summary for AI Studio context
    with open(os.path.join(TARGET_DIR, MANIFEST_NAME), "w", encoding="utf-8") as f:
        f.write("TRYONYOU MISSION CONTEXT\n")
        f.write("========================\n")
        f.write(f"Total files consolidated: {found_count}\n")
        f.write("Objective: Pilot validation for Galeries Lafayette.\n")
        f.write("Rules: No sizes, no numbers, focus on 'The Snap' and Invisible Elegance.")

    print(f"\n[DONE] Folder '{TARGET_DIR}' is ready with {found_count} assets.")
    print("[TIP] Drag this folder into Google AI Studio for full context.")

if __name__ == "__main__":
    create_context_bunker()
