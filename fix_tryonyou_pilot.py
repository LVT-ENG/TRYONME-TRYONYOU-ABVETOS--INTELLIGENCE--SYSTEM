#!/usr/bin/env python3
"""
fix_tryonyou_pilot.py
Limpia el proyecto, arregla el router, crea un piloto estable y fuerza render en produccion.
"""

import os
import shutil
import subprocess
import json

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

def log(msg):
    print(f"[PILOT] {msg}")

def clean_project():
    """Limpia archivos innecesarios del proyecto"""
    log("Limpiando proyecto...")
    
    # Archivos y carpetas a eliminar
    to_remove = [
        'node_modules',
        'dist',
        '.DS_Store',
        'package-lock.json',
    ]
    
    for item in to_remove:
        path = os.path.join(PROJECT_ROOT, item)
        if os.path.exists(path):
            if os.path.isdir(path):
                shutil.rmtree(path)
                log(f"  Eliminado directorio: {item}")
            else:
                os.remove(path)
                log(f"  Eliminado archivo: {item}")
    
    # Eliminar archivos .DS_Store recursivamente
    for root, dirs, files in os.walk(PROJECT_ROOT):
        for f in files:
            if f == '.DS_Store':
                os.remove(os.path.join(root, f))
                log(f"  Eliminado: {os.path.join(root, f)}")

def create_minimal_app():
    """Crea un App.jsx minimo y estable"""
    log("Creando App.jsx minimo...")
    
    app_content = '''import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          TRYONYOU
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
          <Link to="/demo" className="text-white/70 hover:text-white transition-colors">Demo</Link>
        </div>
      </div>
    </nav>
    
    <main className="pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Virtual Try-On
          </span>
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Experience the future of fashion with AI-powered virtual fitting technology.
        </p>
        <Link 
          to="/demo" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Try Demo
        </Link>
      </div>
    </main>
    
    <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-white/40 text-sm">
      TRYONYOU Pilot v1.0
    </footer>
  </div>
)

const Demo = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          TRYONYOU
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
          <Link to="/demo" className="text-blue-400 font-semibold">Demo</Link>
        </div>
      </div>
    </nav>
    
    <main className="pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Virtual Try-On Demo
          </span>
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Pilot entry point - Ready for production
        </p>
        
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
            <div className="text-4xl text-white/30">Avatar</div>
          </div>
          <p className="text-white/60 text-sm">
            Virtual fitting technology placeholder
          </p>
        </div>
        
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
'''
    
    app_path = os.path.join(PROJECT_ROOT, 'src', 'App.jsx')
    with open(app_path, 'w') as f:
        f.write(app_content)
    log(f"  Creado: {app_path}")

def create_minimal_main():
    """Crea un main.jsx minimo"""
    log("Creando main.jsx minimo...")
    
    main_content = '''import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
'''
    
    main_path = os.path.join(PROJECT_ROOT, 'src', 'main.jsx')
    with open(main_path, 'w') as f:
        f.write(main_content)
    log(f"  Creado: {main_path}")

def update_package_json():
    """Actualiza package.json con dependencias minimas estables"""
    log("Actualizando package.json...")
    
    package = {
        "name": "tryonyou-pilot",
        "version": "1.0.0",
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        },
        "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "react-router-dom": "^6.22.0"
        },
        "devDependencies": {
            "@vitejs/plugin-react": "^4.2.1",
            "autoprefixer": "^10.4.18",
            "postcss": "^8.4.35",
            "tailwindcss": "^3.4.1",
            "vite": "^5.1.4"
        }
    }
    
    package_path = os.path.join(PROJECT_ROOT, 'package.json')
    with open(package_path, 'w') as f:
        json.dump(package, f, indent=2)
    log(f"  Actualizado: {package_path}")

def ensure_vercel_config():
    """Asegura configuracion correcta de Vercel"""
    log("Configurando vercel.json...")
    
    vercel_config = {
        "framework": "vite",
        "buildCommand": "npm run build",
        "outputDirectory": "dist",
        "routes": [
            {"handle": "filesystem"},
            {"src": "/(.*)", "dest": "/index.html"}
        ]
    }
    
    vercel_path = os.path.join(PROJECT_ROOT, 'vercel.json')
    with open(vercel_path, 'w') as f:
        json.dump(vercel_config, f, indent=2)
    log(f"  Creado: {vercel_path}")

def ensure_index_html():
    """Asegura index.html correcto"""
    log("Verificando index.html...")
    
    index_content = '''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TRYONYOU - Virtual Try-On</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'''
    
    index_path = os.path.join(PROJECT_ROOT, 'index.html')
    with open(index_path, 'w') as f:
        f.write(index_content)
    log(f"  Creado: {index_path}")

def ensure_css():
    """Asegura CSS basico con Tailwind"""
    log("Verificando CSS...")
    
    css_content = '''@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
'''
    
    styles_dir = os.path.join(PROJECT_ROOT, 'src', 'styles')
    os.makedirs(styles_dir, exist_ok=True)
    
    css_path = os.path.join(styles_dir, 'index.css')
    with open(css_path, 'w') as f:
        f.write(css_content)
    log(f"  Creado: {css_path}")

def ensure_vite_config():
    """Asegura vite.config.js correcto"""
    log("Verificando vite.config.js...")
    
    vite_content = '''import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
'''
    
    vite_path = os.path.join(PROJECT_ROOT, 'vite.config.js')
    with open(vite_path, 'w') as f:
        f.write(vite_content)
    log(f"  Creado: {vite_path}")

def ensure_tailwind_config():
    """Asegura tailwind.config.js correcto"""
    log("Verificando tailwind.config.js...")
    
    tailwind_content = '''/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
'''
    
    tailwind_path = os.path.join(PROJECT_ROOT, 'tailwind.config.js')
    with open(tailwind_path, 'w') as f:
        f.write(tailwind_content)
    log(f"  Creado: {tailwind_path}")

def ensure_postcss_config():
    """Asegura postcss.config.js correcto"""
    log("Verificando postcss.config.js...")
    
    postcss_content = '''export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'''
    
    postcss_path = os.path.join(PROJECT_ROOT, 'postcss.config.js')
    with open(postcss_path, 'w') as f:
        f.write(postcss_content)
    log(f"  Creado: {postcss_path}")

def remove_extra_files():
    """Elimina archivos extra que no son necesarios para el piloto"""
    log("Eliminando archivos extra...")
    
    # Carpetas a limpiar dentro de src
    src_dirs_to_clean = ['pages', 'components', 'hooks', 'utils', 'data', 'assets']
    
    for dir_name in src_dirs_to_clean:
        dir_path = os.path.join(PROJECT_ROOT, 'src', dir_name)
        if os.path.exists(dir_path):
            shutil.rmtree(dir_path)
            log(f"  Eliminado: src/{dir_name}")

def run_npm_install():
    """Ejecuta npm install"""
    log("Ejecutando npm install...")
    result = subprocess.run(['npm', 'install'], cwd=PROJECT_ROOT, capture_output=True, text=True)
    if result.returncode == 0:
        log("  npm install completado")
    else:
        log(f"  Error: {result.stderr}")
        return False
    return True

def run_npm_build():
    """Ejecuta npm run build"""
    log("Ejecutando npm run build...")
    result = subprocess.run(['npm', 'run', 'build'], cwd=PROJECT_ROOT, capture_output=True, text=True)
    if result.returncode == 0:
        log("  Build completado exitosamente")
        return True
    else:
        log(f"  Error en build: {result.stderr}")
        return False

def main():
    log("=" * 50)
    log("TRYONYOU PILOT FIX SCRIPT")
    log("=" * 50)
    
    # 1. Limpiar proyecto
    clean_project()
    
    # 2. Eliminar archivos extra
    remove_extra_files()
    
    # 3. Crear/actualizar archivos de configuracion
    update_package_json()
    ensure_vite_config()
    ensure_tailwind_config()
    ensure_postcss_config()
    ensure_vercel_config()
    ensure_index_html()
    ensure_css()
    
    # 4. Crear App.jsx y main.jsx minimos
    create_minimal_app()
    create_minimal_main()
    
    # 5. Instalar dependencias
    if not run_npm_install():
        log("ERROR: npm install fallo")
        return 1
    
    # 6. Build
    if not run_npm_build():
        log("ERROR: npm build fallo")
        return 1
    
    log("=" * 50)
    log("PILOTO LISTO")
    log("Siguiente paso: npm run dev para verificar local")
    log("=" * 50)
    
    return 0

if __name__ == '__main__':
    exit(main())
