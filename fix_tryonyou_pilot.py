#!/usr/bin/env python3
import os
import shutil
import subprocess
import sys
from pathlib import Path

PROJECT_NAME = "TRYONYOU"
SRC_DIR = Path("src")
PAGES_DIR = SRC_DIR / "pages"
ASSETS_DIR = Path("public/assets")

def run(cmd):
    print(f"\n▶ {cmd}")
    subprocess.run(cmd, shell=True, check=True)

def clean_project():
    print("🧹 Cleaning project...")
    for folder in ["node_modules", "dist", ".vercel"]:
        if Path(folder).exists():
            shutil.rmtree(folder)
    for lock in ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]:
        if Path(lock).exists():
            os.remove(lock)

def install_dependencies():
    print("📦 Installing dependencies...")
    run("npm install")
    run("npm install react-router-dom")

def fix_main_router():
    print("🛠 Fixing main.jsx router...")
    main = SRC_DIR / "main.jsx"
    main.write_text(
        """import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
"""
    )

def fix_app_routes():
    print("🧭 Fixing App.jsx routes...")
    app = SRC_DIR / "App.jsx"
    app.write_text(
        """import { Routes, Route } from "react-router-dom";
import Pilot from "./pages/Pilot";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Pilot />} />
      <Route path="/pilot" element={<Pilot />} />
    </Routes>
  );
}
"""
    )

def create_pilot():
    print("🚀 Creating Pilot page...")
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    pilot = PAGES_DIR / "Pilot.jsx"
    pilot.write_text(
        """export default function Pilot() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>TRYONYOU PILOT</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Experience the future of fashion</p>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #333',
        borderRadius: '12px',
        backgroundColor: '#111'
      }}>
        <img 
          src="/assets/pilot-look.jpg" 
          alt="Pilot Look" 
          style={{ 
            maxWidth: '100%', 
            width: '100%', 
            borderRadius: '12px',
            display: 'block'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">Add pilot-look.jpg to /public/assets/</p>';
          }}
        />
      </div>
    </div>
  );
}
"""
    )

def prepare_assets():
    print("🖼 Preparing assets folder...")
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    placeholder = ASSETS_DIR / "pilot-look.jpg"
    readme = ASSETS_DIR / "README.txt"
    if not readme.exists():
        readme.write_text("PLACEHOLDER IMAGE — REPLACE pilot-look.jpg WITH REAL LOOK")

def build_project():
    print("🏗 Building project...")
    run("npm run build")

def final_report():
    print("\n" + "=" * 60)
    print("✅ TRYONYOU PILOT READY")
    print("▶ Local test: http://localhost:5173")
    print("▶ Production routes:")
    print("   /")
    print("   /pilot")
    print("\n👉 If deploying on Vercel:")
    print("   - Framework: Vite")
    print("   - Build command: npm run build")
    print("   - Output directory: dist")
    print("=" * 60 + "\n")

def main():
    clean_project()
    install_dependencies()
    fix_main_router()
    fix_app_routes()
    create_pilot()
    prepare_assets()
    build_project()
    final_report()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("\n❌ ERROR")
        print(e)
        print("\nQué arreglar:")
        print("- Verifica que Manus tenga acceso al repo")
        print("- Ejecuta `npm install` manualmente si falla")
        print("- Acepta el link del proyecto en Vercel si lo pide")
        sys.exit(1)
