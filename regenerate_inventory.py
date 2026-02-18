import os
import json

CATALOG_DIR = "public/assets/catalog"
OUTPUT_FILE = "src/inventory_index.json"

inventory = []

if os.path.exists(CATALOG_DIR):
    for filename in os.listdir(CATALOG_DIR):
        if filename.endswith(".png"): # Assuming images only as seen
            item_id = os.path.splitext(filename)[0]
            inventory.append({
                "id": item_id,
                "path": f"/assets/catalog/{filename}"
            })

inventory.sort(key=lambda x: x["id"])

with open(OUTPUT_FILE, "w") as f:
    json.dump(inventory, f, indent=2)

print(f"Generated {OUTPUT_FILE} with {len(inventory)} items.")
