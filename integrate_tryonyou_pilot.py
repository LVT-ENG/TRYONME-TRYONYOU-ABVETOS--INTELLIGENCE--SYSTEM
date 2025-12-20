#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
TRYONYOU - Pilot Integrator (One-file Python)
- Unzips project (optional)
- Adds Core /try page
- Adds fitEngine service
- Patches Demo to show FIT/NO FIT banner and default size from localStorage
- Adds serverless /api/lead endpoint
- Patches App routes
- Attempts to patch Home CTA to /try
- Generates PATCH_REPORT.md with warnings/manual follow-ups

Usage:
  python integrate_tryonyou_pilot.py --zip "TRYONYOU_v3_Complete_Look_Builder.zip" --out "./TRYONYOU_MAIN_PATCHED"
  python integrate_tryonyou_pilot.py --repo "./existing-repo"
"""

import argparse
import os
import re
import shutil
import sys
import textwrap
import zipfile
from pathlib import Path
from datetime import datetime

REPORT = {
    "touched": [],
    "created": [],
    "warnings": [],
    "errors": [],
}

FIT_ENGINE_JS = """\
export function avatarFromMetrics({ heightCm, weightKg }) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!h || !w) return { bmi: null, suggestedSize: "M" };

  const bmi = w / ((h / 100) ** 2);

  const suggestedSize =
    bmi < 20 ? "S" :
    bmi < 25 ? "M" :
    bmi < 30 ? "L" : "XL";

  return { bmi: Number(bmi.toFixed(1)), suggestedSize };
}

export function fitLabel(score) {
  if (score >= 90) return { label: "FIT", note: "Te queda muy bien" };
  if (score >= 85) return { label: "CASI FIT", note: "Puede ir algo justo" };
  return { label: "NO FIT", note: "Mejor otra talla o prenda" };
}
"""

TRY_PAGE = """\
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { avatarFromMetrics } from "../services/fitEngine";

export default function Try() {
  const nav = useNavigate();
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const result = useMemo(
    () => avatarFromMetrics({ heightCm, weightKg }),
    [heightCm, weightKg]
  );

  const onContinue = () => {
    localStorage.setItem(
      "tryonyou_avatar",
      JSON.stringify({
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        bmi: result.bmi,
        suggestedSize: result.suggestedSize,
        ts: Date.now()
      })
    );
    nav("/demo");
  };

  const disabled = !heightCm || !weightKg;

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">Tu talla perfecta</h1>
      <p className="opacity-60 mb-6">
        Basado en tu cuerpo real. Reduce devoluciones.
      </p>

      <input
        type="number"
        placeholder="Altura (cm)"
        value={heightCm}
        onChange={(e) => setHeightCm(e.target.value)}
        className="w-full mb-4 p-4 rounded-xl"
      />

      <input
        type="number"
        placeholder="Peso (kg)"
        value={weightKg}
        onChange={(e) => setWeightKg(e.target.value)}
        className="w-full mb-6 p-4 rounded-xl"
      />

      <div className="mb-6">
        <div className="text-sm opacity-60">Talla sugerida</div>
        <div className="text-4xl font-black">{result.suggestedSize}</div>
        <div className="text-xs opacity-50">BMI: {result.bmi ?? "-"}</div>
      </div>

      <button
        onClick={onContinue}
        disabled={disabled}
        className={`w-full py-4 rounded-xl font-bold ${disabled ? "bg-white/10 opacity-40" : "bg-blue-600"}`}
      >
        Ver mi look
      </button>
    </div>
  );
}
"""

LEAD_API = """\
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { email, name, event, meta } = req.body || {};
    if (!email) {
      return res.status(400).json({ ok: false, error: "Missing email" });
    }

    const url = process.env.LEADS_WEBHOOK_URL;
    if (url) {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || "",
          event: event || "lead",
          meta: meta || {},
          ts: Date.now()
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}
"""

FIT_BANNER_BLOCK = """\
<div className="max-w-6xl mx-auto px-6 pt-10">
  <div className="glass rounded-2xl p-5 flex items-center justify-between">
    <div>
      <div className="opacity-60 text-sm">Resultado</div>
      <div className="text-2xl font-black">{verdict.label}</div>
      <div className="opacity-60 text-sm">{verdict.note}</div>
    </div>
    <div className="text-right">
      <div className="opacity-60 text-sm">Talla sugerida</div>
      <div className="text-3xl font-black">{selectedSize}</div>
      <div className="opacity-50 text-xs">Fit medio: {averageFit}%</div>
    </div>
  </div>
</div>
"""

def log_created(path: Path):
    REPORT["created"].append(str(path))

def log_touched(path: Path):
    REPORT["touched"].append(str(path))

def warn(msg: str):
    REPORT["warnings"].append(msg)

def err(msg: str):
    REPORT["errors"].append(msg)

def write_file(path: Path, content: str, overwrite: bool = True):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and not overwrite:
        warn(f"Skipped existing file (overwrite disabled): {path}")
        return
    path.write_text(content, encoding="utf-8")
    if path.exists():
        log_created(path)

def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def write_text(path: Path, content: str):
    path.write_text(content, encoding="utf-8")
    log_touched(path)

def unzip(zip_path: Path, out_dir: Path):
    out_dir.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(out_dir)

def find_first(repo: Path, candidates):
    for c in candidates:
        p = repo / c
        if p.exists():
            return p
    return None

def patch_app_routes(app_path: Path):
    s = read_text(app_path)

    # Ensure imports
    if "react-router-dom" not in s:
        warn(f"{app_path}: Could not find react-router-dom usage. App router structure may differ.")
        # Still try best-effort insert if Routes exists
    # Ensure Try import
    if re.search(r'import\s+Try\s+from\s+[\'"]./pages/Try[\'"]', s) is None:
        # Insert after last import
        m = list(re.finditer(r'^\s*import .*?;\s*$', s, flags=re.M))
        if m:
            idx = m[-1].end()
            s = s[:idx] + '\nimport Try from "./pages/Try";' + s[idx:]
        else:
            s = 'import Try from "./pages/Try";\n' + s
        warn(f"{app_path}: Added Try import.")
    # Ensure Demo import if missing and route used; usually exists.
    if re.search(r'import\s+Demo\s+from\s+[\'"]./pages/Demo[\'"]', s) is None and "/demo" in s:
        warn(f"{app_path}: Demo import not found but /demo route present. Skipping Demo import.")
    elif re.search(r'import\s+Demo\s+from\s+[\'"]./pages/Demo[\'"]', s) is None:
        # Try to add it too (safe)
        m = list(re.finditer(r'^\s*import .*?;\s*$', s, flags=re.M))
        if m:
            idx = m[-1].end()
            s = s[:idx] + '\nimport Demo from "./pages/Demo";' + s[idx:]
        else:
            s = 'import Demo from "./pages/Demo";\n' + s

    # Add /try route if missing
    if re.search(r'path\s*=\s*["\']/try["\']', s) is None:
        # Insert near other <Route ...> inside <Routes>
        if "<Routes" in s and "</Routes>" in s:
            # Insert before closing </Routes>
            s = re.sub(r'(</Routes>)', '  <Route path="/try" element={<Try />} />\n\\1', s, count=1)
        else:
            warn(f"{app_path}: Could not locate <Routes>. Please add /try route manually.")
    # Ensure /demo route exists
    if re.search(r'path\s*=\s*["\']/demo["\']', s) is None:
        if "<Routes" in s and "</Routes>" in s:
            s = re.sub(r'(</Routes>)', '  <Route path="/demo" element={<Demo />} />\n\\1', s, count=1)
        else:
            warn(f"{app_path}: Could not locate <Routes>. Please add /demo route manually.")

    write_text(app_path, s)

def patch_demo(demo_path: Path):
    s = read_text(demo_path)

    # Add import fitLabel
    if "fitLabel" not in s:
        # If there are imports, add after them
        imports = list(re.finditer(r'^\s*import .*?;\s*$', s, flags=re.M))
        if imports:
            idx = imports[-1].end()
            s = s[:idx] + '\nimport { fitLabel } from "../services/fitEngine";' + s[idx:]
        else:
            s = 'import { fitLabel } from "../services/fitEngine";\n' + s
    # Ensure useMemo imported if we use it
    # Many files import React hooks in various ways. We'll best-effort ensure useMemo exists.
    # If the file uses "import React" only, we won't rewrite heavily; we’ll insert a tiny helper that doesn't require useMemo.
    # We'll prefer useMemo insertion only if there's a hooks import line.
    if "useMemo" not in s and re.search(r'import\s*\{[^}]*useState[^}]*\}\s*from\s*[\'"]react[\'"]', s):
        s = re.sub(r'import\s*\{([^}]*)\}\s*from\s*[\'"]react[\'"];',
                   lambda m: f'import {{{m.group(1)}, useMemo}} from "react";', s, count=1)

    # Insert stored + selectedSize state inside component
    # Try to locate the first function component body start: export default function Demo( ... ) {  OR function Demo() {
    fn_match = re.search(r'(export\s+default\s+function\s+Demo\s*\([^)]*\)\s*\{)', s)
    if not fn_match:
        fn_match = re.search(r'(function\s+Demo\s*\([^)]*\)\s*\{)', s)
    if not fn_match:
        warn(f"{demo_path}: Could not locate Demo() function signature. Manual patch needed.")
        write_text(demo_path, s)
        return

    insert_pos = fn_match.end()

    # If already has tryonyou_avatar reading, skip
    if "tryonyou_avatar" not in s:
        inject = textwrap.dedent("""
          const stored = (() => {
            try { return JSON.parse(localStorage.getItem("tryonyou_avatar") || "null"); }
            catch { return null; }
          })();

          const [selectedSize, setSelectedSize] = useState(stored?.suggestedSize || "M");
        """).rstrip("\n")
        s = s[:insert_pos] + "\n" + inject + "\n" + s[insert_pos:]
    else:
        # Ensure selectedSize state exists
        if "selectedSize" not in s:
            warn(f"{demo_path}: Found tryonyou_avatar but no selectedSize state detected. Please verify manually.")

    # Ensure verdict computed. We need averageFit variable: try to find it; if missing, create a safe one.
    if "const verdict" not in s:
        # Place after averageFit definition if exists; otherwise just insert near top of component (after selectedSize).
        avg_match = re.search(r'const\s+averageFit\s*=\s*[^;]+;', s)
        if avg_match:
            pos = avg_match.end()
            s = s[:pos] + "\nconst verdict = fitLabel(averageFit);\n" + s[pos:]
        else:
            # Insert a safe averageFit if missing, but do not override existing logic; only add if not present.
            inject2 = textwrap.dedent("""
              // If your Look Builder already computes averageFit, keep it.
              // Fallback for demo stability:
              const averageFit = (typeof window !== "undefined" && window.__TRYONYOU_AVG_FIT__) ? window.__TRYONYOU_AVG_FIT__ : 92;
              const verdict = fitLabel(averageFit);
            """).rstrip("\n")
            # Insert after selectedSize state if present
            sel_match = re.search(r'const\s+\[selectedSize,\s*setSelectedSize\][^;]*;', s)
            if sel_match:
                pos = sel_match.end()
                s = s[:pos] + "\n" + inject2 + "\n" + s[pos:]
            else:
                s = s[:insert_pos] + "\n" + inject2 + "\n" + s[insert_pos:]
            warn(f"{demo_path}: averageFit not found. Inserted fallback averageFit=92.")

    # Add banner block into JSX: insert right after the first 'return (' line.
    if "Resultado" not in s or "{verdict.label}" not in s:
        ret_match = re.search(r'return\s*\(\s*', s)
        if ret_match:
            pos = ret_match.end()
            s = s[:pos] + "\n" + FIT_BANNER_BLOCK + "\n" + s[pos:]
        else:
            warn(f"{demo_path}: Could not locate return( ... ) to inject banner. Manual inject needed.")

    write_text(demo_path, s)

def patch_home_cta(home_path: Path):
    s = read_text(home_path)

    # If there is already a Link/button to /try, skip.
    if re.search(r'["\']/try["\']', s):
        return

    # Best-effort: replace common "/demo" CTA to "/try"
    if "/demo" in s:
        s2 = s.replace('"/demo"', '"/try"').replace("'/demo'", "'/try'")
        if s2 != s:
            warn(f"{home_path}: Rewired CTA /demo -> /try (best effort). Please verify UI copy.")
            s = s2
            write_text(home_path, s)
            return

    # If a button has onClick navigate('/demo') etc.
    s2 = re.sub(r"navigate\(\s*['\"]/demo['\"]\s*\)", "navigate('/try')", s)
    if s2 != s:
        warn(f"{home_path}: Rewired navigate('/demo') -> navigate('/try') (best effort). Please verify.")
        s = s2
        write_text(home_path, s)
        return

    warn(f"{home_path}: Could not confidently patch CTA to /try. Please update manually: primary CTA should go to /try.")

def ensure_react_router(repo: Path):
    pkg = repo / "package.json"
    if not pkg.exists():
        warn("package.json not found. Cannot verify react-router-dom dependency.")
        return
    s = read_text(pkg)
    if "react-router-dom" not in s:
        warn("react-router-dom not found in package.json. Routes may not work until dependency is added.")
        warn("Suggested: npm i react-router-dom")

def write_report(repo: Path):
    report_path = repo / "PATCH_REPORT.md"
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%SZ")
    lines = []
    lines.append(f"# TRYONYOU Pilot Patch Report\n\nGenerated: {now}\n")
    lines.append("## Created files\n")
    for p in REPORT["created"]:
        lines.append(f"- {p}\n")
    lines.append("\n## Modified files\n")
    for p in REPORT["touched"]:
        lines.append(f"- {p}\n")
    lines.append("\n## Warnings\n")
    if REPORT["warnings"]:
        for w in REPORT["warnings"]:
            lines.append(f"- {w}\n")
    else:
        lines.append("- None\n")
    lines.append("\n## Errors\n")
    if REPORT["errors"]:
        for e in REPORT["errors"]:
            lines.append(f"- {e}\n")
    else:
        lines.append("- None\n")

    lines.append("\n## Deployment notes (Vercel)\n")
    lines.append("- Create env var: `LEADS_WEBHOOK_URL` (Apps Script webhook) for /api/lead\n")
    lines.append("- Verify routes: `/try` -> `/demo`\n")
    lines.append("- Verify Home CTA points to `/try`\n")

    report_path.write_text("".join(lines), encoding="utf-8")
    log_created(report_path)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--zip", type=str, default="", help="Path to project zip")
    ap.add_argument("--out", type=str, default="TRYONYOU_MAIN_PATCHED", help="Output directory when using --zip")
    ap.add_argument("--repo", type=str, default="", help="Existing repo directory (skip unzip)")
    args = ap.parse_args()

    if not args.zip and not args.repo:
        print("ERROR: Provide --zip or --repo")
        sys.exit(1)

    if args.repo:
        repo = Path(args.repo).resolve()
        if not repo.exists():
            print(f"ERROR: repo not found: {repo}")
            sys.exit(1)
    else:
        zip_path = Path(args.zip).resolve()
        if not zip_path.exists():
            print(f"ERROR: zip not found: {zip_path}")
            sys.exit(1)

        out_dir = Path(args.out).resolve()
        if out_dir.exists():
            shutil.rmtree(out_dir)
        out_dir.mkdir(parents=True, exist_ok=True)
        unzip(zip_path, out_dir)

        # If zip contains nested root folder, detect it
        entries = [p for p in out_dir.iterdir() if p.is_dir()]
        if len(entries) == 1 and (entries[0] / "package.json").exists():
            repo = entries[0]
        else:
            repo = out_dir

    # Identify key paths
    src = repo / "src"
    if not src.exists():
        err(f"src/ not found in repo: {repo}")
        write_report(repo)
        print("FAILED: src/ not found.")
        sys.exit(2)

    # Create fitEngine and Try page
    write_file(src / "services" / "fitEngine.js", FIT_ENGINE_JS, overwrite=True)
    write_file(src / "pages" / "Try.jsx", TRY_PAGE, overwrite=True)

    # Create lead API (serverless)
    write_file(repo / "api" / "lead.js", LEAD_API, overwrite=True)

    # Patch App routes
    app_path = find_first(src, ["App.jsx", "App.tsx"])
    if not app_path:
        warn("App.jsx/App.tsx not found. Please add routes manually.")
    else:
        patch_app_routes(app_path)

    # Patch Demo
    demo_path = find_first(src, ["pages/Demo.jsx", "pages/Demo.tsx"])
    if not demo_path:
        warn("src/pages/Demo.jsx not found. Demo patch skipped.")
    else:
        patch_demo(demo_path)

    # Patch Home CTA (best-effort)
    home_path = find_first(src, ["pages/Home.jsx", "pages/Home.tsx"])
    if home_path:
        patch_home_cta(home_path)
    else:
        warn("src/pages/Home.jsx not found. Please ensure primary CTA routes to /try.")

    # Verify react-router-dom
    ensure_react_router(repo)

    # Write report
    write_report(repo)

    print("\n✅ DONE. Pilot integration complete.")
    print(f"Repo: {repo}")
    print("Next: npm install && npm run build && npm run dev/preview")
    print("See PATCH_REPORT.md for warnings/manual steps.\n")

if __name__ == "__main__":
    main()