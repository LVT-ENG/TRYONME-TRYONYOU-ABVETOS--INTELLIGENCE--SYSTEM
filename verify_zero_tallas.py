import os
import re
import sys

# Configuration
FORBIDDEN_TERMS = ["peso", "talla", "weight", "size"]
IGNORED_FILES = {
    "src/inventory_index.json",
    "src/verify_zero_tallas.py",
    "verify_zero_tallas.py",
}
ALLOWED_PATTERNS = [
    r"font-size",
    r"background-size",
    r"box-sizing",
    r"resize",
    r"fontSize",
    r"fontWeight",
    r"font-weight",
    r"api\.qrserver\.com.*size=", # Exception for external API
]

def check_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except UnicodeDecodeError:
        return [] # Skip binary files

    violations = []
    for line_num, line in enumerate(lines, 1):
        for term in FORBIDDEN_TERMS:
            # Check for the term as a whole word
            pattern = r'\b' + re.escape(term) + r'\b'

            # Robust check:
            # Create a version of the line with allowed patterns removed
            clean_line = line
            for allowed in ALLOWED_PATTERNS:
                clean_line = re.sub(allowed, '', clean_line, flags=re.IGNORECASE)

            # Now check if the term still exists in the clean line
            if re.search(pattern, clean_line, re.IGNORECASE):
                 violations.append((line_num, term, line.strip()))
                 # break # Don't break so we can find multiple violations per line? No, let's just report one per line/term to keep it clean.
                 # Actually, if we break here, we miss other terms on the same line.
                 # But usually one is enough to fail.

    return violations

def main():
    print("Starting Zero Tallas Verification...")
    src_dir = "src"
    all_violations = []

    for root, dirs, files in os.walk(src_dir):
        for file in files:
            filepath = os.path.join(root, file)
            # Normalize path separator
            filepath = filepath.replace("\\", "/")

            if filepath in IGNORED_FILES:
                continue

            # Skip non-source files if any (e.g., binary images)
            if not filepath.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.html')):
                continue

            file_violations = check_file(filepath)
            if file_violations:
                for v in file_violations:
                    all_violations.append((filepath, v[0], v[1], v[2]))

    if all_violations:
        print(f"❌ Zero Tallas Compliance Failed! Found {len(all_violations)} violations:")
        for v in all_violations:
            print(f"  {v[0]}:{v[1]} - Found '{v[2]}' in: {v[3]}")
        sys.exit(1)
    else:
        print("✅ Zero Tallas Compliance Passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()
