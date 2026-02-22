import os
import json

def regenerate_inventory():
    catalog_path = "public/assets/catalog"
    inventory_path = "src/inventory_index.json"
    inventory = []

    print(f"Scanning {catalog_path} for .png files...")

    if not os.path.exists(catalog_path):
        print(f"Directory {catalog_path} does not exist.")
        return

    for filename in sorted(os.listdir(catalog_path)):
        if filename.lower().endswith(".png"):
            # Use filename without extension as ID
            file_id = os.path.splitext(filename)[0]
            file_path = f"/assets/catalog/{filename}"
            inventory.append({
                "id": file_id,
                "path": file_path
            })

    print(f"Found {len(inventory)} items.")

    with open(inventory_path, "w") as f:
        json.dump(inventory, f, indent=2)

    print(f"Inventory saved to {inventory_path}")

if __name__ == "__main__":
    regenerate_inventory()
