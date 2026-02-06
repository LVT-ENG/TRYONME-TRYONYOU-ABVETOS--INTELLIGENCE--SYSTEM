import os
import json

SOURCE_DIR = "public/assets/catalog"
OUTPUT_FILE = "src/inventory_index.json"
VALID_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

def regenerate_inventory():
    print(f"🔄 Regenerating inventory from {SOURCE_DIR}...")

    if not os.path.exists(SOURCE_DIR):
        print(f"❌ Error: Source directory '{SOURCE_DIR}' not found.")
        sys.exit(1)

    inventory = []

    # List files and sort them for deterministic output
    files = sorted([f for f in os.listdir(SOURCE_DIR) if os.path.isfile(os.path.join(SOURCE_DIR, f))])

    for filename in files:
        name, ext = os.path.splitext(filename)
        if ext.lower() not in VALID_EXTENSIONS:
            continue

        # Format Title: replace underscores with spaces, Title Case
        title = name.replace("_", " ").title()

        # Build item object
        item = {
            "id": name,
            "Handle": name,
            "Title": title,
            "Variant Price": "0",
            "Image Src": f"/assets/catalog/{filename}"
        }
        inventory.append(item)

    # Write to file
    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(inventory, f, indent=2, ensure_ascii=False)
        print(f"✅ Inventory regenerated! {len(inventory)} items indexed in '{OUTPUT_FILE}'.")
    except Exception as e:
        print(f"❌ Error writing inventory file: {e}")

if __name__ == "__main__":
    regenerate_inventory()
