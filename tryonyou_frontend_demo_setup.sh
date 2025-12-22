#!/usr/bin/env bash
set -e

echo "=============================================="
echo " TRYONYOU – FRONTEND DEMO €0 (ONE SCRIPT)"
echo "=============================================="

# -------- CONFIG --------
ROOT_DIR="$(pwd)"
COMP_DIR="$ROOT_DIR/components"

echo "📁 Working directory: $ROOT_DIR"

# -------- STRUCTURE --------
mkdir -p "$COMP_DIR"

# -------- index.html --------
cat > "$ROOT_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TRYONYOU – Real Measure · Real Fit</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
EOF

echo "✅ index.html creado"

# -------- main.js --------
cat > "$ROOT_DIR/main.js" << 'EOF'
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

createRoot(document.getElementById("root")).render(<App />);
EOF

echo "✅ main.js creado"

# -------- App.js --------
cat > "$ROOT_DIR/App.js" << 'EOF'
import React from "react";
import ProcessingView from "./components/ProcessingView.js";
import MeasureFlow from "./components/MeasureFlow.js";
import ScanView from "./components/ScanView.js";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-2">TRYONYOU</h1>
      <p className="text-slate-600 mb-8">
        Real Measure · Real Fit · Fashion Tech
      </p>

      <button className="px-6 py-3 bg-black text-white rounded-full mb-12">
        Start Measuring
      </button>

      <div className="w-full max-w-xl space-y-8">
        <ScanView />
        <MeasureFlow />
        <ProcessingView />
      </div>
    </div>
  );
}
EOF

echo "✅ App.js creado"

# -------- components --------
cat > "$COMP_DIR/ScanView.js" << 'EOF'
import React from "react";

export default function ScanView() {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="font-semibold mb-2">Scan Guidance</h3>
      <p className="text-sm text-slate-600">
        Place your phone vertically and stand 2m away.
      </p>
    </div>
  );
}
EOF

cat > "$COMP_DIR/MeasureFlow.js" << 'EOF'
import React from "react";

export default function MeasureFlow() {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="font-semibold mb-2">Real Measure</h3>
      <ul className="text-sm text-slate-600 list-disc pl-4">
        <li>Bust length</li>
        <li>Waist &amp; hips</li>
        <li>Leg &amp; calf width</li>
      </ul>
    </div>
  );
}
EOF

cat > "$COMP_DIR/ProcessingView.js" << 'EOF'
import React from "react";

export default function ProcessingView() {
  return (
    <div className="p-6 bg-white rounded-xl shadow text-center">
      <h3 className="font-semibold mb-2">Processing</h3>
      <p className="text-sm text-slate-600">
        Analysing body proportions…
      </p>
    </div>
  );
}
EOF

echo "✅ components creados"

# -------- DONE --------
echo ""
echo "=============================================="
echo "✅ TRYONYOU FRONTEND DEMO READY"
echo ""
echo "Next steps (manual, €0):"
echo "1) Push to GitHub"
echo "2) Import repo in Vercel"
echo "3) Framework: Other | Build: empty | Output: ."
echo "4) Attach domain tryonyou.app"
echo "=============================================="
