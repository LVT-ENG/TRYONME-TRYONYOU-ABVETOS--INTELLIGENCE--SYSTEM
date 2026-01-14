"""
TRYONYOU – MASTER ORCHESTRATOR

Role: Lead Architect & DevOps Brain
Scope: Infra + Frontend + Assets + Legal + Deploy Prep
Security: NO secrets embedded (env-only)
"""

import os
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
    "timestamp": None,  # Will be set at runtime
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
        found = False
        for file in DOWNLOADS_DIR.glob("*"):
            if file.name.startswith(prefix):
                dest = PUBLIC_DIR / target
                ensure_dir(dest.parent)
                shutil.copy(file, dest)
                REPORT["assets"].append({
                    "source": file.name,
                    "destination": str(dest),
                    "status": "mapped",
                })
                found = True
                break

        if not found:
            REPORT["assets"].append({
                "source": prefix,
                "destination": target,
                "status": "missing",
            })

# =========================
# 2. ENV VALIDATION
# =========================

def validate_env():
    env_example = PROJECT_ROOT / ".env.example"
    
    # Only create or update if file doesn't exist or is missing keys
    existing_keys = set()
    if env_example.exists():
        existing_keys = {line.split('=')[0] for line in env_example.read_text(encoding="utf-8").splitlines() if '=' in line}
    
    missing_keys = [key for key in ENV_KEYS_REQUIRED if key not in existing_keys]
    
    if missing_keys or not env_example.exists():
        with open(env_example, "a" if env_example.exists() else "w", encoding="utf-8") as f:
            for key in missing_keys if env_example.exists() else ENV_KEYS_REQUIRED:
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
        REPORT["routes"][route] = "present" if route in content else "missing"

# =========================
# 6. DEPLOY PREP (VERCEL)
# =========================

def generate_vercel_config():
    vercel_file = PROJECT_ROOT / "vercel.json"
    
    # Load existing config if it exists
    existing_config = {}
    if vercel_file.exists():
        try:
            existing_config = json.loads(vercel_file.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            REPORT["deploy"]["vercel_error"] = f"Invalid JSON in vercel.json: {str(e)}"
            return
    
    # Merge with new config, preserving existing keys
    vercel_config = {
        **existing_config,
        "regions": ["fra1", "iad1", "hnd1"],
        "headers": [
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
        ],
    }

    with open(vercel_file, "w", encoding="utf-8") as f:
        json.dump(vercel_config, f, indent=2)

    REPORT["deploy"]["vercel"] = "configured"

# =========================
# ENTRYPOINT
# =========================

if __name__ == "__main__":
    # Set timestamp at runtime
    REPORT["timestamp"] = datetime.now(timezone.utc).isoformat()
    
    organize_assets()
    validate_env()
    validate_stack()
    generate_global_css()
    validate_routes()
    generate_vercel_config()

    with open(PROJECT_ROOT / "TRYONYOU_MASTER_REPORT.json", "w", encoding="utf-8") as f:
        json.dump(REPORT, f, indent=2)

    print("✅ TRYONYOU MASTER ORCHESTRATOR COMPLETE")
