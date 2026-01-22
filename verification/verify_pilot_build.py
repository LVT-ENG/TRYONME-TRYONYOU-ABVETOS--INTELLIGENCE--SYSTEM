import os
import sys

def verify_build():
    dist_path = "dist"
    index_path = os.path.join(dist_path, "index.html")

    print(f"🔍 Verifying build in {dist_path}...")

    if not os.path.exists(dist_path):
        print("❌ Error: 'dist' directory not found. Build failed?")
        sys.exit(1)

    if not os.path.exists(index_path):
        print("❌ Error: 'dist/index.html' not found.")
        sys.exit(1)

    # Search for the string in any file within dist/
    found = False
    search_string = "GALERIES LAFAYETTE"

    for root, dirs, files in os.walk(dist_path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8", errors='ignore') as f:
                    content = f.read()
                    if search_string in content:
                        print(f"✅ Found '{search_string}' in {file_path}")
                        found = True
                        break
            except Exception as e:
                print(f"⚠️  Could not read {file_path}: {e}")
        if found:
            break

    if not found:
        print(f"❌ Error: '{search_string}' not found in any file in {dist_path}.")
        sys.exit(1)

    print("✅ Build verification passed: Pilot content detected.")

if __name__ == "__main__":
    verify_build()
