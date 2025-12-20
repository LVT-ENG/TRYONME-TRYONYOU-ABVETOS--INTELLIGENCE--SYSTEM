#!/usr/bin/env bash
set -e

echo "=============================================="
echo " TRYONYOU – FRONTEND DEMO €0 (ONE SCRIPT)"
echo "=============================================="

ROOT_DIR="$(pwd)"
COMP_DIR="$ROOT_DIR/components"

mkdir -p "$COMP_DIR"

# index.html
cat > "$ROOT_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TRYONYOU — Real Measure Fashion Tech</title>

  <script src="https://cdn.tailwindcss.com"></script>

  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background-color: #f8fafc;
    }
  </style>

  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.2.0",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
    }
  }
  </script>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
  <div id="root"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>
EOF

# main.js
cat > "$ROOT_DIR/main.js" << 'EOF'
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

createRoot(document.getElementById("root")).render(<App />);
EOF

# App.js
cat > "$ROOT_DIR/App.js" << 'EOF'
import React from "react";
import ScanView from "./components/ScanView.js";
import MeasureFlow from "./components/MeasureFlow.js";
import ProcessingView from "./components/ProcessingView.js";

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

# Components
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
        <li>Waist & hips</li>
        <li>Leg & calf width</li>
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

echo "=============================================="
echo " ✅ TRYONYOU DEMO READY (€0)"
echo " Push to GitHub → Import in Vercel"
echo " Framework: Other | Build: empty | Output: ."
echo "=============================================="