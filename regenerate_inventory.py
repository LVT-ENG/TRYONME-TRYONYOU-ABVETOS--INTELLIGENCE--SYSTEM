import os
import json

def regenerate_inventory():
    catalog_dir = os.path.join("public", "assets", "catalog")
    output_file = os.path.join("src", "inventory_index.json")

    if not os.path.exists(catalog_dir):
        print(f"Directory {catalog_dir} does not exist.")
        return

    inventory = []

    valid_extensions = {".png", ".jpg", ".jpeg", ".webp"}

    files = sorted(os.listdir(catalog_dir))

    for filename in files:
        name, ext = os.path.splitext(filename)
        if ext.lower() in valid_extensions:
            # Handle is filename without extension
            handle = name

            # Title: Replace underscores with spaces and capitalize words
            title = name.replace("_", " ").title()

            item = {
                "id": name,
                "Handle": handle,
                "Title": title,
                "Variant Price": "0",
                "Image Src": f"/assets/catalog/{filename}"
            }
            inventory.append(item)

    with open(output_file, "w") as f:
        json.dump(inventory, f, indent=2)

    print(f"Inventory regenerated with {len(inventory)} items at {output_file}")

if __name__ == "__main__":
    regenerate_inventory()
