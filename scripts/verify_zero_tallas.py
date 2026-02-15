import os
import sys

def verify_zero_tallas():
    # Forbidden terms
    forbidden_terms = ["peso", "talla", "weight", "size"]

    # Allowed CSS properties/tokens (to prevent false positives)
    # Based on memory: "excludes CSS and style-related tokens such as font-size, background-size, resize, box-sizing, fontSize, fontWeight, and font-weight"
    allowed_tokens = [
        "font-size", "background-size", "resize", "box-sizing",
        "fontsize", "fontweight", "font-weight",
        "text-size-adjust", "background-position", "background-repeat", # Common CSS
        "background-image", "background-color", # Just in case
        "oversized", # Fashion fit term, allowed
        "pantalla", # Screen (Spanish), allowed
        "size=" # Allow API parameters like size=300x300
    ]

    # Files/Dirs to ignore
    ignore_dirs = {".git", "node_modules", "dist", ".next", "__pycache__", "build", "coverage", ".vercel", ".netlify"}
    ignore_files = {"package-lock.json", "verify_zero_tallas.py", "regenerate_inventory.py", ".DS_Store", "audit_lafayette.log", "yarn.lock", "pnpm-lock.yaml"}
    ignore_extensions = {".png", ".jpg", ".jpeg", ".webp", ".ico", ".svg", ".mp4", ".pyc", ".lock", ".log", ".pdf", ".md"}

    root_dir = "."
    violations = []

    print("Starting Zero Tallas Verification...")

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Remove ignored directories in-place
        dirnames[:] = [d for d in dirnames if d not in ignore_dirs]

        for filename in filenames:
            if filename in ignore_files:
                continue

            _, ext = os.path.splitext(filename)
            if ext.lower() in ignore_extensions:
                continue

            filepath = os.path.join(dirpath, filename)

            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    lines = f.readlines()

                for i, line in enumerate(lines):
                    line_lower = line.lower()

                    # Pre-process line to remove allowed tokens
                    clean_line = line_lower
                    for token in allowed_tokens:
                        clean_line = clean_line.replace(token.lower(), "")

                    for term in forbidden_terms:
                        if term in clean_line:
                            # Found a potential violation
                            violations.append({
                                "file": filepath,
                                "line": i + 1,
                                "term": term,
                                "content": line.strip()
                            })
                            # Break to avoid multiple violations per line
                            break

            except Exception as e:
                print(f"Error reading {filepath}: {e}")

    if violations:
        print(f"\nFAIL: Found {len(violations)} Zero Tallas violations:")
        for v in violations:
            print(f"  {v['file']}:{v['line']} - Found '{v['term']}': {v['content']}")
        sys.exit(1)
    else:
        print("\nSUCCESS: No Zero Tallas violations found.")
        sys.exit(0)

if __name__ == "__main__":
    verify_zero_tallas()
