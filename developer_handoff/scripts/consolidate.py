#!/usr/bin/env python3
"""
TRYONYOU Pilot Consolidator -> tryonyou-core (value-code architecture)

What it does:
- Downloads one or more pilot ZIPs (default: Divineo V7 unified)
- Extracts them
- Builds a canonical repo structure: src/{experience,domain,telemetry,narrative,system,ui,styles}
- Moves key UX assets (VirtualMirror, LandingPage) into src/experience
- Preserves api/ (Vercel serverless) and public/
- Adds feature flags, telemetry stubs, narrative claims, config, error handling
- Optionally merges a provided CSS file into src/styles/global.css

Limitations:
- Does NOT connect/assign custom domain in Vercel (needs Vercel auth/API or manual UI)
"""

import argparse
import json
import os
import shutil
import sys
import textwrap
import urllib.request
import zipfile
from pathlib import Path


DEFAULT_PILOT_ZIP_URL = (
    "https://files.manuscdn.com/user_upload_by_module/session_file/"
    "310519663147230146/SpdXfbLXQczQxkOm.zip"
)


def log(msg: str) -> None:
    print(f"[TRYONYOU] {msg}")


def safe_mkdir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def download(url: str, dest: Path) -> None:
    log(f"Downloading: {url}")
    safe_mkdir(dest.parent)
    with urllib.request.urlopen(url) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)
    log(f"Saved to: {dest}")


def unzip(zip_path: Path, out_dir: Path) -> None:
    log(f"Extracting: {zip_path} -> {out_dir}")
    safe_mkdir(out_dir)
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(out_dir)
    log("Extraction complete.")


def find_repo_root(extracted_dir: Path) -> Path:
    """
    Heuristic: locate a folder containing package.json (pilot root).
    If multiple, pick the shallowest.
    """
    candidates = []
    for p in extracted_dir.rglob("package.json"):
        candidates.append(p.parent)
    if not candidates:
        raise FileNotFoundError("Could not find package.json in extracted content.")
    candidates.sort(key=lambda x: len(x.parts))
    return candidates[0]


def copytree_merge(src: Path, dst: Path) -> None:
    if not src.exists():
        return
    safe_mkdir(dst)
    for item in src.iterdir():
        s = item
        d = dst / item.name
        if s.is_dir():
            copytree_merge(s, d)
        else:
            safe_mkdir(d.parent)
            shutil.copy2(s, d)


def move_if_exists(src: Path, dst: Path) -> bool:
    if not src.exists():
        return False
    safe_mkdir(dst.parent)
    if dst.exists():
        # avoid clobber: rename
        base = dst.stem
        ext = dst.suffix
        i = 2
        while True:
            alt = dst.with_name(f"{base}_{i}{ext}")
            if not alt.exists():
                dst = alt
                break
            i += 1
    shutil.move(str(src), str(dst))
    return True


def write_text(path: Path, content: str) -> None:
    safe_mkdir(path.parent)
    path.write_text(content, encoding="utf-8")


def ensure_value_architecture(core: Path) -> None:
    src = core / "src"
    for d in [
        "experience",
        "domain",
        "telemetry",
        "narrative",
        "system",
        "ui",
        "styles",
    ]:
        safe_mkdir(src / d)

    # system config
    write_text(
        src / "system" / "config" / "index.ts",
        textwrap.dedent(
            """\
            export type AppConfig = {
              env: "development" | "preview" | "production";
              version: string;
              features: Record<string, boolean>;
            };

            export const getConfig = (): AppConfig => {
              const env =
                (import.meta as any).env?.MODE === "production"
                  ? "production"
                  : (import.meta as any).env?.MODE === "preview"
                    ? "preview"
                    : "development";

              const version = (import.meta as any).env?.VITE_APP_VERSION ?? "0.0.0";

              return {
                env,
                version,
                features: {},
              };
            };
            """
        ),
    )

    # system errors
    write_text(
        src / "system" / "errors" / "index.ts",
        textwrap.dedent(
            """\
            export class AppError extends Error {
              public code: string;
              public statusCode: number;

              constructor(code: string, message: string, statusCode = 500) {
                super(message);
                this.code = code;
                this.statusCode = statusCode;
                this.name = "AppError";
              }
            }

            export const ErrorCodes = {
              CAMERA_PERMISSION: "CAMERA_PERMISSION",
              CAMERA_NOT_AVAILABLE: "CAMERA_NOT_AVAILABLE",
              UNKNOWN: "UNKNOWN",
            } as const;

            export const toAppError = (err: unknown): AppError => {
              if (err instanceof AppError) return err;
              if (err instanceof Error) return new AppError(ErrorCodes.UNKNOWN, err.message);
              return new AppError(ErrorCodes.UNKNOWN, "Unknown error");
            };
            """
        ),
    )

    # feature flags
    write_text(
        src / "system" / "flags" / "index.ts",
        textwrap.dedent(
            """\
            export type FeatureFlags = {
              RETAIL_PILOT: boolean;
              INVESTOR_DEMO: boolean;
              ADVANCED_SCAN: boolean;
            };

            const bool = (v: any, fallback = false) =>
              v === "true" ? true : v === "false" ? false : fallback;

            export const getFlags = (): FeatureFlags => {
              const env = (import.meta as any).env ?? {};
              return {
                RETAIL_PILOT: bool(env.VITE_FEATURE_RETAIL_PILOT, false),
                INVESTOR_DEMO: bool(env.VITE_FEATURE_INVESTOR_DEMO, false),
                ADVANCED_SCAN: bool(env.VITE_FEATURE_ADVANCED_SCAN, false),
              };
            };
            """
        ),
    )

    # telemetry
    write_text(
        src / "telemetry" / "events.ts",
        textwrap.dedent(
            """\
            export type TelemetryEvent =
              | { type: "view"; name: string; at: number; data?: Record<string, any> }
              | { type: "action"; name: string; at: number; data?: Record<string, any> }
              | { type: "error"; name: string; at: number; data?: Record<string, any> };

            export const emit = (event: TelemetryEvent) => {
              // MVP: console only. Replace with PostHog/GA4 later.
              // eslint-disable-next-line no-console
              console.log("[telemetry]", event.type, event.name, event.data ?? {});
            };
            """
        ),
    )

    # narrative
    write_text(
        src / "narrative" / "claims.ts",
        textwrap.dedent(
            """\
            export const CLAIMS = {
              NO_QUEUE: "No hagas cola.",
              NO_WASTE: "No generes basura.",
              CERTAINTY: "Compra con certeza.",
              PRIVACY: "Privacidad primero: no almacenamos imágenes sensibles.",
              PRECISION: "99.7% precisión (mensaje demo, validar con datos reales).",
            } as const;
            """
        ),
    )

    # domain stubs
    write_text(
        src / "domain" / "recommendation" / "index.ts",
        textwrap.dedent(
            """\
            export type Recommendation = {
              id: string;
              title: string;
              reason: string;
            };

            // Placeholder: replace with real model/rules
            export const getRecommendation = (): Recommendation => {
              return {
                id: "demo-001",
                title: "Look recomendado (demo)",
                reason: "Basado en preferencia y ajuste (stub).",
              };
            };
            """
        ),
    )


def integrate_css(core: Path, css_path: Path | None) -> None:
    if not css_path:
        return
    if not css_path.exists():
        log(f"CSS file not found: {css_path} (skipping)")
        return
    dest = core / "src" / "styles" / "global.css"
    content = css_path.read_text(encoding="utf-8")
    header = "/* Consolidated Divineo V7 styles (imported) */\n"
    write_text(dest, header + content + "\n")
    log(f"Integrated CSS into: {dest}")


def consolidate_pilot(pilot_root: Path, core: Path) -> None:
    """
    Pull relevant things from pilot_root into core:
    - src -> core/src/ui (merged), then move key files into experience
    - public -> core/public
    - api -> core/api (Vercel serverless)
    - config files -> root
    """
    log(f"Consolidating pilot from: {pilot_root}")

    safe_mkdir(core)

    # copy root configs (best-effort)
    for fname in [
        "package.json",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        "vite.config.js",
        "vite.config.ts",
        "vercel.json",
        "index.html",
        "requirements.txt",
        ".env.example",
        ".gitignore",
        "README.md",
    ]:
        f = pilot_root / fname
        if f.exists():
            shutil.copy2(f, core / fname)

    # merge folders
    copytree_merge(pilot_root / "public", core / "public")
    copytree_merge(pilot_root / "api", core / "api")

    # bring src as "ui" baseline (we'll re-home key parts)
    copytree_merge(pilot_root / "src", core / "src" / "ui")

    ensure_value_architecture(core)

    # Move key known files if present (from src/ui)
    vm_src = core / "src" / "ui" / "components" / "VirtualMirror.jsx"
    lp_src = core / "src" / "ui" / "pages" / "LandingPage.jsx"

    moved_any = False
    moved_any |= move_if_exists(
        vm_src, core / "src" / "experience" / "VirtualMirror" / "VirtualMirror.jsx"
    )
    moved_any |= move_if_exists(
        lp_src, core / "src" / "experience" / "Landing" / "LandingPage.jsx"
    )

    # Move related CSS if exists (optional)
    for css_name in ["VirtualMirror.css", "LandingPage.css", "index.css", "App.css"]:
        css_src = core / "src" / "ui" / "styles" / css_name
        if css_src.exists():
            move_if_exists(
                css_src,
                core / "src" / "styles" / css_name,
            )
            moved_any = True

    # Create a new entry App that composes experience modules (non-destructive)
    app_tsx = core / "src" / "app.tsx"
    if not app_tsx.exists():
        write_text(
            app_tsx,
            textwrap.dedent(
                """\
                import React from "react";
                import { emit } from "./telemetry/events";
                import { CLAIMS } from "./narrative/claims";

                // If these components exist, we render them; otherwise fallback.
                let Landing: any = null;
                let VirtualMirror: any = null;

                try {
                  // @ts-ignore
                  Landing = require("./experience/Landing/LandingPage.jsx").default;
                } catch {}
                try {
                  // @ts-ignore
                  VirtualMirror = require("./experience/VirtualMirror/VirtualMirror.jsx").default;
                } catch {}

                export default function App() {
                  React.useEffect(() => {
                    emit({ type: "view", name: "app_loaded", at: Date.now() });
                  }, []);

                  return (
                    <div>
                      <div style={{ padding: 16 }}>
                        <h1>{CLAIMS.CERTAINTY}</h1>
                        <p>{CLAIMS.NO_QUEUE} {CLAIMS.NO_WASTE}</p>
                      </div>

                      {Landing ? <Landing /> : <div style={{ padding: 16 }}>Landing missing</div>}
                      {VirtualMirror ? <VirtualMirror /> : <div style={{ padding: 16 }}>VirtualMirror missing</div>}
                    </div>
                  );
                }
                """
            ),
        )

    # Ensure main entry points exist (if missing)
    main_jsx = core / "src" / "main.jsx"
    if not main_jsx.exists():
        write_text(
            main_jsx,
            textwrap.dedent(
                """\
                import React from "react";
                import ReactDOM from "react-dom/client";
                import App from "./app.tsx";
                import "./styles/global.css";

                ReactDOM.createRoot(document.getElementById("root")).render(
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                );
                """
            ),
        )

    # Ensure global.css exists at least
    global_css = core / "src" / "styles" / "global.css"
    if not global_css.exists():
        write_text(
            global_css,
            textwrap.dedent(
                """\
                /* Minimal global styles (fallback) */
                body { margin: 0; font-family: system-ui, Arial; }
                """
            ),
        )

    # Write consolidation manifest
    manifest = {
        "pilot_root": str(pilot_root),
        "core_path": str(core),
        "moved_virtual_mirror": str(core / "src/experience/VirtualMirror/VirtualMirror.jsx"),
        "moved_landing": str(core / "src/experience/Landing/LandingPage.jsx"),
        "notes": [
            "src from pilot merged into src/ui (baseline).",
            "Key UX moved into src/experience.",
            "Add feature flags via VITE_FEATURE_* env vars.",
        ],
    }
    write_text(core / "CONSOLIDATION_MANIFEST.json", json.dumps(manifest, indent=2))

    # README quick instructions
    write_text(
        core / "README_CONSOLIDATED.md",
        textwrap.dedent(
            """\
            # tryonyou-core (consolidated)

            ## Run locally
            npm install
            npm run dev

            ## Build
            npm run build

            ## Deploy (Vercel)
            vercel --prod

            ## Feature flags (set in Vercel env)
            - VITE_FEATURE_RETAIL_PILOT=true|false
            - VITE_FEATURE_INVESTOR_DEMO=true|false
            - VITE_FEATURE_ADVANCED_SCAN=true|false

            ## Note about custom domain
            Custom domain attachment (tryonyou.app) must be done in Vercel Dashboard (or Vercel API with token).
            """
        ),
    )

    log(f"Consolidation done. Core repo at: {core}")
    if not moved_any:
        log("Warning: did not find/move VirtualMirror/LandingPage — check pilot structure in src/ui/.")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--workdir", default="tryonyou_work", help="Working directory")
    ap.add_argument(
        "--pilot-zip-url",
        default=DEFAULT_PILOT_ZIP_URL,
        help="Pilot zip URL to download",
    )
    ap.add_argument(
        "--pilot-zip-path",
        default="",
        help="Optional: use a local pilot zip instead of downloading",
    )
    ap.add_argument(
        "--css",
        default="",
        help="Optional: path to Divineo V7 CSS file to import into src/styles/global.css",
    )
    ap.add_argument(
        "--out",
        default="tryonyou-core",
        help="Output consolidated repo directory",
    )
    args = ap.parse_args()

    workdir = Path(args.workdir).resolve()
    safe_mkdir(workdir)

    zip_path = Path(args.pilot_zip_path).resolve() if args.pilot_zip_path else (workdir / "pilot.zip")
    if not args.pilot_zip_path:
        download(args.pilot_zip_url, zip_path)
    else:
        if not zip_path.exists():
            log(f"Local zip not found: {zip_path}")
            return 2

    extracted = workdir / "extracted"
    if extracted.exists():
        shutil.rmtree(extracted)
    unzip(zip_path, extracted)

    pilot_root = find_repo_root(extracted)
    core = Path(args.out).resolve()
    if core.exists():
        log(f"Output dir exists, removing: {core}")
        shutil.rmtree(core)

    consolidate_pilot(pilot_root, core)

    css_path = Path(args.css).resolve() if args.css else None
    integrate_css(core, css_path)

    log("DONE.")
    log("Next: cd tryonyou-core && npm install && npm run dev")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
