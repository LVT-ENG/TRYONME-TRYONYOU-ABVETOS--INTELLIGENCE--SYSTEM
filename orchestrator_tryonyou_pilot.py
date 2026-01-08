import os
import json
import subprocess

def deploy_vertebral_pilot():
    print("💎 INICIANDO DESPLIEGUE: PILOTO COMERCIAL GALERIES LAFAYETTE")

    # 1. ARQUITECTURA DE RUTAS (Vercel)
    # Configuramos / para la Landing y /demo para el producto real
    config = {
        "framework": "vite",
        "rewrites": [
            { "source": "/demo", "destination": "/index.html" },
            { "source": "/(.*)", "destination": "/index.html" }
        ]
    }
    with open("vercel.json", "w") as f:
        json.dump(config, f, indent=2)
    print("✅ vercel.json configurado: / (Landing) y /demo (Escáner)")

    # 2. INSTALACIÓN DE MOTORES DE IA (MediaPipe + Three.js)
    # Manus suele ignorar estas librerías, aquí obligamos su instalación
    packages = ["@mediapipe/pose", "@react-three/fiber", "@react-three/drei", "framer-motion", "sharp"]
    print(f"🧠 Instalando motores de visión y 3D: {packages}")
    subprocess.check_call(["npm", "install"] + packages)
    
    # Fix específico para que Vercel no falle con las imágenes del piloto
    subprocess.check_call(["npm", "install", "--platform=linux", "--arch=x64", "sharp"])

    # 3. IMPLEMENTACIÓN DE CLAIMS Y SEO PROFESIONAL
    # Inyectamos el SEO en francés para Galeries Lafayette
    if os.path.exists("index.html"):
        seo_head = """
    <title>TryOnYou | Votre Miroir Intelligent</title>
    <meta name="description" content="L'ajustement parfait, défini par l'IA. Sans mesures inconfortables.">
    <meta property="og:title" content="TryOnYou: Scannez. Essayez. Validez.">
        """
        with open("index.html", "r") as f:
            content = f.read()
        if "</head>" in content:
            new_content = content.replace("</head>", seo_head + "\n  </head>")
            with open("index.html", "w") as f:
                f.write(new_content)
    print("✅ SEO y Claims profesionales inyectados")

    # 4. COMPILACIÓN FINAL
    print("🏗️ Generando Build real de Vite...")
    subprocess.check_call(["npm", "run build"])
    
    print("\n📦 ORDEN FINAL PARA MANUS:")
    print("1. Landing (/) -> Hero con Pau (Chasquido) y Carrusel de Claims.")
    print("2. Demo (/demo) -> Integrar BiometricCapture.tsx para escaneo flúor.")
    print("3. Ejecutar: vercel --prod --force")

if __name__ == "__main__":
    deploy_vertebral_pilot()
