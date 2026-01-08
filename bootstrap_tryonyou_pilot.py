import os
import sys
import subprocess
import json

# Definición de dependencias críticas para el motor de IA y el Piloto
JS_DEPENDENCIES = [
    "@mediapipe/pose",
    "@react-three/fiber",
    "@react-three/drei",
    "framer-motion",
    "sharp"
]

def run(cmd):
    print(f"\n▶ Ejecutando: {' '.join(cmd)}")
    subprocess.check_call(cmd, shell=(os.name == 'nt'))

def setup_vercel_routes():
    print("🌐 Configurando arquitectura de rutas (/ y /demo)...")
    config = {
        "framework": "vite",
        "rewrites": [
            { "source": "/demo", "destination": "/index.html" },
            { "source": "/(.*)", "destination": "/index.html" }
        ]
    }
    with open("vercel.json", "w") as f:
        json.dump(config, f, indent=2)
    print("✅ vercel.json listo para el Piloto Comercial.")

def inject_commercial_claims():
    print("📝 Inyectando claims y SEO en index.html...")
    seo_head = """
    <title>TryOnYou | Votre Miroir Intelligent</title>
    <meta name="description" content="L'ajustement parfait, sans mesures inconfortables. Le futur du shopping avec l'IA.">
    """
    if os.path.exists("index.html"):
        with open("index.html", "r") as f:
            content = f.read()
        if "</head>" in content:
            new_content = content.replace("</head>", seo_head + "\n  </head>")
            with open("index.html", "w") as f:
                f.write(new_content)
    print("✅ Landing purgada de textos genéricos.")

def install_ai_engines():
    print("🧠 Instalando motores de Visión (MediaPipe) y 3D (Three.js)...")
    run(["npm", "install"] + JS_DEPENDENCIES)
    # Fix específico para arquitectura de Vercel/Linux
    run(["npm", "install", "--platform=linux", "--arch=x64", "sharp"])

def main():
    print("💎 TRYONYOU — SISTEMA DE DESPLIEGUE DE PILOTO COMERCIAL")
    
    # 1. Configurar Rutas
    setup_vercel_routes()
    
    # 2. Limpiar e inyectar Claims de Galeries Lafayette
    inject_commercial_claims()
    
    # 3. Instalar motores de IA que Manus suele ignorar
    install_ai_engines()
    
    # 4. Build Final
    print("\n🏗️ Generando Build real del software...")
    run(["npm", "run", "build"])
    
    print("\n✅ PILOTO LISTO: Ejecuta 'vercel --prod --force' para ver el efecto Pau.")

if __name__ == "__main__":
    main()
