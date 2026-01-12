"""
TRYONYOU – MASTER ORCHESTRATOR

Role: Lead Architect & DevOps Brain
Scope: Infra + Frontend + Assets + Legal + Deploy Prep
Security: NO secrets embedded in source; sensitive values (e.g., API keys) are env-only,
          validated for presence, and never logged or written to reports.
"""

import os
import re
import shutil
import json
from pathlib import Path
from datetime import datetime, timezone

# =========================
# CONFIG (SAFE / NO SECRETS)
# =========================

PROJECT_ROOT = Path.cwd()

PUBLIC_DIR = PROJECT_ROOT / "public"
ASSETS_DIR = PUBLIC_DIR / "assets"
DOCS_DIR = PUBLIC_DIR / "docs"

_downloads_dir_env = os.getenv("TRYONYOU_DOWNLOADS_DIR")
if _downloads_dir_env:
    DOWNLOADS_DIR = Path(_downloads_dir_env).expanduser()
else:
    DOWNLOADS_DIR = Path.home() / "Downloads"

ENV_KEYS_REQUIRED = [
    "GOOGLE_API_KEY",
    "PORKBUN_API",
]

FORBIDDEN_STACK = ["next", "drizzle", "postgres"]

ROUTES_REQUIRED = ["/fit", "/cap", "/abvet", "/claims"]

DIVINEO_COLORS = {
    "anthracite": "#141619",
    "gold": "#C5A46D",
    "peacock": "#006D77",
    "bone": "#F5EFE6",
}

ASSET_MAPPING = {
    "41C07010": "assets/catalog/red_dress_minimal.png",
    "8762992B": "assets/catalog/burberry_trench.png",
    "IMG_6206": "assets/branding/pau_tuxedo.png",
    "TRYONYOU_Investor_Dossier": "docs/investor_dossier.pdf",
}

REPORT = {
    "timestamp": datetime.now(timezone.utc).isoformat(),
    "assets": [],
    "env": {},
    "stack": {},
    "ui": {},
    "routes": {},
    "deploy": {},
}

# =========================
# HELPERS
# =========================

def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)

# =========================
# 1. ASSET ORGANIZER
# =========================

def organize_assets():
    ensure_dir(ASSETS_DIR)
    ensure_dir(DOCS_DIR)

    for prefix, target in ASSET_MAPPING.items():
        # Collect all files in Downloads that start with the given prefix
        matches = [file for file in DOWNLOADS_DIR.glob("*") if file.name.startswith(prefix)]

        if not matches:
            REPORT["assets"].append({
                "source": prefix,
                "destination": target,
                "status": "missing",
            })
            continue

        # Default behavior for a single match remains unchanged.
        # If multiple matches are found, pick the most recently modified file
        # and record the ambiguity in the report.
        if len(matches) > 1:
            matches.sort(key=lambda p: p.stat().st_mtime, reverse=True)

        chosen = matches[0]
        dest = PUBLIC_DIR / target
        ensure_dir(dest.parent)
        shutil.copy(chosen, dest)

        asset_entry = {
            "source": chosen.name,
            "destination": str(dest),
            "status": "mapped" if len(matches) == 1 else "mapped_with_ambiguity",
        }

        if len(matches) > 1:
            asset_entry["alternate_sources"] = [file.name for file in matches[1:]]

        REPORT["assets"].append(asset_entry)
# =========================
# 2. ENV VALIDATION
# =========================

def validate_env():
    env_example = PROJECT_ROOT / ".env.example"

    existing_keys = set()
    existing_lines = []

    if env_example.exists():
        with open(env_example, "r", encoding="utf-8") as f:
            existing_lines = f.readlines()
        for line in existing_lines:
            stripped = line.lstrip()
            if stripped.startswith("#"):
                continue
            if "=" in line:
                key_name = line.split("=", 1)[0].strip()
                if key_name:
                    existing_keys.add(key_name)

    missing_keys = [key for key in ENV_KEYS_REQUIRED if key not in existing_keys]

    if missing_keys:
        with open(env_example, "a", encoding="utf-8") as f:
            if existing_lines and not existing_lines[-1].endswith("\n"):
                f.write("\n")
            for key in missing_keys:
                f.write(f"{key}=\n")
    for key in ENV_KEYS_REQUIRED:
        REPORT["env"][key] = "present" if os.getenv(key) else "missing"

# =========================
# 3. STACK VALIDATION
# =========================

def validate_stack():
    pkg = PROJECT_ROOT / "package.json"

    if not pkg.exists():
        REPORT["stack"]["status"] = "package.json missing"
        return

    data = json.loads(pkg.read_text(encoding="utf-8"))
    deps = {
        **data.get("dependencies", {}),
        **data.get("devDependencies", {}),
    }

    REPORT["stack"]["forbidden"] = [d for d in deps if d in FORBIDDEN_STACK]

# =========================
# 4. UI – DIVINEO V7
# =========================

def generate_global_css():
    css = f"""
:root {{
  --anthracite: {DIVINEO_COLORS['anthracite']};
  --gold: {DIVINEO_COLORS['gold']};
  --peacock: {DIVINEO_COLORS['peacock']};
  --bone: {DIVINEO_COLORS['bone']};
}}

body {{
  background-color: var(--anthracite);
  color: var(--bone);
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}}

.glass {{
  background: rgba(20, 22, 25, 0.65);
  backdrop-filter: blur(14px);
  border: 1px solid var(--gold);
  border-radius: 12px;
}}

#pau-mascot {{
  position: fixed;
  bottom: 12px;
  left: 12px;
  width: 64px;
  opacity: 0.9;
}}
"""

    styles = PROJECT_ROOT / "src" / "global.css"
    ensure_dir(styles.parent)
    styles.write_text(css.strip(), encoding="utf-8")

    REPORT["ui"]["divineo"] = "applied"

# =========================
# 5. ROUTE CHECK (JSX + TSX)
# =========================

def validate_routes():
    app_files = [
        PROJECT_ROOT / "src" / "App.jsx",
        PROJECT_ROOT / "src" / "App.tsx",
    ]

    app_file = next((f for f in app_files if f.exists()), None)

    if not app_file:
        REPORT["routes"]["status"] = "App component missing"
        return

    content = app_file.read_text(encoding="utf-8")

    for route in ROUTES_REQUIRED:
        REPORT["routes"][route] = "present" if re.search(f'path\\s*=\\s*["\']{route}["\']', content) else "missing"

# =========================
# 6. DEPLOY PREP (VERCEL)
# =========================

def generate_vercel_config():
    """
    Generate or update vercel.json without discarding existing configuration.

    - Preserves any existing keys (e.g., framework, rewrites).
    - Adds default regions and security headers only if they are not already set.
    """
    vercel_path = PROJECT_ROOT / "vercel.json"

    # Load any existing configuration so we don't wipe important settings
    existing_config = {}
    if vercel_path.exists():
        try:
            with open(vercel_path, "r", encoding="utf-8") as f:
                existing_config = json.load(f)
                if not isinstance(existing_config, dict):
                    # If the existing file is not a JSON object, ignore it
                    existing_config = {}
        except json.JSONDecodeError:
            # Malformed JSON: fall back to a fresh config instead of crashing
            existing_config = {}

    # Defaults this orchestrator wants to ensure
    required_regions = ["fra1", "iad1", "hnd1"]
    required_headers = [
        {
            "source": "/(.*)",
            "headers": [
                {"key": "X-Content-Type-Options", "value": "nosniff"},
                {
                    "key": "Strict-Transport-Security",
                    "value": "max-age=63072000; includeSubDomains; preload",
                },
            ],
        }
    ]

    # Merge: preserve existing fields and only add defaults when missing
    merged_config = dict(existing_config)
    if "regions" not in merged_config:
        merged_config["regions"] = required_regions
    if "headers" not in merged_config:
        merged_config["headers"] = required_headers

    with open(vercel_path, "w", encoding="utf-8") as f:
        json.dump(merged_config, f, indent=2)
    REPORT["deploy"]["vercel"] = "configured"

# =========================
# ENTRYPOINT
# =========================

if __name__ == "__main__":
    organize_assets()
    validate_env()
    validate_stack()
    generate_global_css()
    validate_routes()
    generate_vercel_config()

    with open(PROJECT_ROOT / "TRYONYOU_MASTER_REPORT.json", "w", encoding="utf-8") as f:
        json.dump(REPORT, f, indent=2)

    print("✅ TRYONYOU MASTER ORCHESTRATOR COMPLETE")
