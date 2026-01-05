import os
import shutil
import re

# Mapping of UUIDs/Hashes to Clean Names (Simulated based on context)
# In a real scenario, this might come from a CSV or DB.
ASSET_MAPPING = {
    # Clothing
    "41C07010-8A1B-4C2D-9E3F-1A2B3C4D5E6F": "red_dress_minimal.png",
    "B2D18020-9B2C-5D3E-AF4G-2B3C4D5E6F7G": "blue_silk_blouse.png",
    "C3E29030-AC3D-6E4F-BG5H-3C4D5E6F7G8H": "black_tuxedo_jacket.png",
    # Textures/Fabrics
    "D4F3A040-BD4E-7F5G-CH6I-4D5E6F7G8H9I": "fabric_silk_crepe.jpg",
    "E5G4B050-CE5F-8G6H-DI7J-5E6F7G8H9I0J": "fabric_denim_raw.jpg",
    # Avatars
    "F6H5C060-DF6G-9H7I-EJ8K-6F7G8H9I0J1K": "avatar_female_base.glb",
    "G7I6D070-EG7H-0I8J-FK9L-7G8H9I0J1K2L": "avatar_male_base.glb"
}

SOURCE_DIRS = ["public/assets", "public/assets/images", "public/models"]

def organize_assets():
    print("--- 🦚 ORGANIZING ASSETS (UUID -> CLEAN NAME) ---")

    renamed_count = 0

    for directory in SOURCE_DIRS:
        if not os.path.exists(directory):
            continue

        print(f"Scanning {directory}...")
        for filename in os.listdir(directory):
            # Check if filename (without extension) matches a known UUID prefix or full UUID
            name_part, ext = os.path.splitext(filename)

            # Simple simulation: if we find a file starting with the UUID prefix
            found_mapping = None
            for uuid, clean_name in ASSET_MAPPING.items():
                if name_part.upper().startswith(uuid[:8]): # Match first 8 chars of UUID
                    found_mapping = clean_name
                    break

            if found_mapping:
                old_path = os.path.join(directory, filename)
                new_path = os.path.join(directory, found_mapping)

                # Verify if it's actually an image/model
                if ext.lower() not in ['.png', '.jpg', '.jpeg', '.glb', '.gltf']:
                    # Update extension if the mapping has one and the file doesn't match?
                    # For safety, keep original extension if not specified in mapping?
                    # Here we assume mapping includes correct extension.
                    pass

                print(f"🔄 Renaming: {filename} -> {found_mapping}")
                os.rename(old_path, new_path)
                renamed_count += 1

            # Also handle the "Pau" mascot placeholder mentioned in memory
            if filename == "pau_tuxedo_full.txt":
                 print(f"⚠️ Found placeholder {filename}. Recommend replacing with binary.")

    print(f"--- DONE. Renamed {renamed_count} files. ---")

if __name__ == "__main__":
    organize_assets()
