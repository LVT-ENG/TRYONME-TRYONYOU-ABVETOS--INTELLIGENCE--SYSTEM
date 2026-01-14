"""
TRYONYOU – MASTER ORCHESTRATOR
Role: Lead Architect & DevOps Brain
Scope: Infra + Frontend + Assets + Legal + Deploy Prep
Security: NO secrets embedded (env-only)
"""

import os
import shutil
import json
import re
from pathlib import Path
from datetime import datetime, timezone

# =========================
# CONFIG (SAFE / NO SECRETS)
# =========================

PROJECT_ROOT = Path.cwd()
PUBLIC_DIR = PROJECT_ROOT / "public"
ASSETS_DIR = PUBLIC_DIR / "assets"
DOCS_DIR = PUBLIC_DIR / "docs"

DOWNLOADS_DIR = Path.home() / "Downloads"  # editable

ENV_KEYS_REQUIRED = [
    "GOOGLE_API_KEY",
    "PORKBUN_API",
]

VITE_REQUIRED = "vite"
FORBIDDEN_STACK = ["next", "drizzle", "postgres"]

ROUTES_REQUIRED = ["/fit", "/cap", "/abvet", "/claims"]

DIVINEO_COLORS = {
    "anthracite": "#141619",
    "gold": "#C5A46D",
    "peacock": "#006D77",
    "bone": "#F5EFE6"
}

ASSET_MAPPING = {
    "41C07010": "catalog/red_dress_minimal.png",
    "8762992B": "catalog/burberry_trench.png",
    "IMG_6206": "branding/pau_tuxedo.png",
    "TRYONYOU_Investor_Dossier": "docs/investor_dossier.pdf"
}

REPORT = {
    "timestamp": datetime.now(timezone.utc).isoformat(),
    "assets": [],
    "env": {},
    "stack": {},
    "ui": {},
    "routes": {},
    "deploy": {}
}

# =========================
# HELPERS
# =========================

def log(section, message):
    print(f"[{section}] {message}")

def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)

# =========================
# 1. ASSET ORGANIZER
# =========================

def organize_assets():
    log("ASSETS", "Organizing UUID assets")
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
                    "status": "mapped"
                })
                found = True
                log("ASSETS", f"{file.name} → {dest}")
                break

        if not found:
            REPORT["assets"].append({
                "source": prefix,
                "destination": target,
                "status": "missing"
            })
            log("ASSETS", f"WARNING: {prefix} not found")

# =========================
# 2. ENV VALIDATION
# =========================

def validate_env():
    log("ENV", "Validating environment variables")

    env_example = PROJECT_ROOT / ".env.example"
    with open(env_example, "w", encoding="utf-8") as f:
        for key in ENV_KEYS_REQUIRED:
            f.write(f"{key}=\n")

    for key in ENV_KEYS_REQUIRED:
        REPORT["env"][key] = "present" if os.getenv(key) else "missing"
        if not os.getenv(key):
            log("ENV", f"CRITICAL: {key} missing")

# =========================
# 3. STACK VALIDATION
# =========================

def validate_stack():
    log("STACK", "Validating frontend stack")

    pkg = PROJECT_ROOT / "package.json"
    if not pkg.exists():
        REPORT["stack"]["status"] = "package.json missing"
        log("STACK", "package.json not found")
        return

    try:
        data = json.loads(pkg.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        REPORT["stack"]["status"] = f"package.json parse error: {str(e)}"
        log("STACK", f"ERROR: Failed to parse package.json - {e}")
        return

    deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}

    REPORT["stack"]["vite"] = VITE_REQUIRED in deps
    REPORT["stack"]["forbidden"] = [k for k in deps if k in FORBIDDEN_STACK]

    if REPORT["stack"]["forbidden"]:
        log("STACK", f"FORBIDDEN deps detected: {REPORT['stack']['forbidden']}")

# =========================
# 4. UI – DIVINEO V7 BASE
# =========================

def generate_global_css():
    log("UI", "Generating Divineo v7 base CSS")

    css = f"""
:root {{
  --anthracite: {DIVINEO_COLORS['anthracite']};
  --gold: {DIVINEO_COLORS['gold']};
  --peacock: {DIVINEO_COLORS['peacock']};
  --bone: {DIVINEO_COLORS['bone']};
}}

body {{
  background: var(--anthracite);
  color: var(--bone);
  font-family: system-ui, sans-serif;
}}

.glass {{
  background: rgba(20,22,25,0.6);
  backdrop-filter: blur(12px);
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
    styles.write_text(css, encoding="utf-8")

    REPORT["ui"]["divineo"] = "applied"

# =========================
# 5. ROUTE CHECK
# =========================

def validate_routes():
    log("ROUTES", "Checking SPA routes")

    app = PROJECT_ROOT / "src" / "App.tsx"
    if not app.exists():
        # Try .jsx extension as well
        app = PROJECT_ROOT / "src" / "App.jsx"
        if not app.exists():
            REPORT["routes"]["status"] = "App.tsx/App.jsx missing"
            return

    try:
        content = app.read_text(encoding="utf-8")
    except (UnicodeDecodeError, IOError) as e:
        REPORT["routes"]["status"] = f"App file read error: {str(e)}"
        log("ROUTES", f"ERROR: Failed to read App file - {e}")
        return

    for r in ROUTES_REQUIRED:
        REPORT["routes"][r] = "present" if r in content else "missing"

# =========================
# 6. DEPLOY PREP (VERCEL)
# =========================

def generate_vercel_config():
    log("DEPLOY", "Generating vercel.json")

    vercel = {
        "headers": [
            {
                "source": "/(.*)",
                "headers": [
                    {"key": "X-Content-Type-Options", "value": "nosniff"},
                    {"key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload"}
                ]
            }
        ],
        "regions": ["fra1", "iad1", "hnd1"]
    }

    with open(PROJECT_ROOT / "vercel.json", "w", encoding="utf-8") as f:
        json.dump(vercel, f, indent=2)

    REPORT["deploy"]["vercel"] = "configured"

# =========================
# 7. FINAL REPORT
# =========================

def write_report():
    report_path = PROJECT_ROOT / "TRYONYOU_MASTER_REPORT.json"
    try:
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(REPORT, f, indent=2)
        log("REPORT", f"Written to {report_path}")
    except (IOError, OSError) as e:
        log("REPORT", f"ERROR: Failed to write report - {e}")

# =========================
# ENTRYPOINT
# =========================

if __name__ == "__main__":
    print("\n🧠 TRYONYOU MASTER ORCHESTRATOR START\n")

    organize_assets()
    validate_env()
    validate_stack()
    generate_global_css()
    validate_routes()
    generate_vercel_config()
    write_report()

    print("\n✅ ORCHESTRATION COMPLETE\n")
