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
from datetime import datetime

PROJECT_ROOT = Path.cwd()
PUBLIC_DIR = PROJECT_ROOT / "public"
ASSETS_DIR = PUBLIC_DIR / "assets"
DOCS_DIR = PUBLIC_DIR / "docs"
DOWNLOADS_DIR = Path.home() / "Downloads"

ENV_KEYS_REQUIRED = ["GOOGLE_API_KEY", "PORKBUN_API"]
FORBIDDEN_STACK = ["next", "drizzle", "postgres"]
ROUTES_REQUIRED = ["/fit", "/cap", "/abvet", "/claims"]

DIVINEO_COLORS = {
    "anthracite": "#141619",
    "gold": "#C5A46D",
    "peacock": "#006D77",
    "bone": "#F5EFE6"
}

ASSET_MAPPING = {
    "41C07010": "assets/catalog/red_dress_minimal.png",
    "8762992B": "assets/catalog/burberry_trench.png",
    "IMG_6206": "assets/branding/pau_tuxedo.png",
    "TRYONYOU_Investor_Dossier": "docs/investor_dossier.pdf"
}

REPORT = {
    "timestamp": datetime.utcnow().isoformat(),
    "assets": [],
    "env": {},
    "stack": {},
    "ui": {},
    "routes": {},
    "deploy": {}
}

def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)

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
                    "status": "mapped"
                })
                found = True
                break
        if not found:
            REPORT["assets"].append({
                "source": prefix,
                "destination": target,
                "status": "missing"
            })

def validate_env():
    with open(PROJECT_ROOT / ".env.example", "w") as f:
        for key in ENV_KEYS_REQUIRED:
            f.write(f"{key}=\n")
    for key in ENV_KEYS_REQUIRED:
        REPORT["env"][key] = "present" if os.getenv(key) else "missing"

def validate_stack():
    pkg = PROJECT_ROOT / "package.json"
    if not pkg.exists():
        REPORT["stack"]["status"] = "package.json missing"
        return
    data = json.loads(pkg.read_text())
    deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
    REPORT["stack"]["forbidden"] = [k for k in deps if k in FORBIDDEN_STACK]

def generate_global_css():
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
}}
#pau-mascot {{
  position: fixed;
  bottom: 12px;
  left: 12px;
  width: 64px;
}}
"""
    styles = PROJECT_ROOT / "src" / "global.css"
    ensure_dir(styles.parent)
    styles.write_text(css)
    REPORT["ui"]["divineo"] = "applied"

def validate_routes():
    app = PROJECT_ROOT / "src" / "App.tsx"
    if not app.exists():
        REPORT["routes"]["status"] = "App.tsx missing"
        return
    content = app.read_text()
    for r in ROUTES_REQUIRED:
        REPORT["routes"][r] = "present" if r in content else "missing"

def generate_vercel_config():
    vercel = {
        "regions": ["fra1", "iad1", "hnd1"],
        "headers": [{
            "source": "/(.*)",
            "headers": [
                {"key": "X-Content-Type-Options", "value": "nosniff"},
                {"key": "Strict-Transport-Security", "value": "max-age=63072000"}
            ]
        }]
    }
    with open(PROJECT_ROOT / "vercel.json", "w") as f:
        json.dump(vercel, f, indent=2)

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
