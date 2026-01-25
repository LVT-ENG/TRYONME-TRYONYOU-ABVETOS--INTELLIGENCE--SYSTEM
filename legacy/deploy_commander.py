import os
import shutil
import zipfile
import time
import webbrowser
import threading
import subprocess
from http.server import SimpleHTTPRequestHandler
import socketserver

# ==============================================================================
# CONFIGURACIÓN DEL COMANDANTE
# ==============================================================================
USER_DESKTOP = os.path.join(os.path.expanduser("~"), "Desktop")
PROJECT_ROOT = os.path.join(USER_DESKTOP, "TRYONYOU_MASTER_PROJECT")
TEMP_EXTRACT_DIR = os.path.join(os.getcwd(), "_TEMP_ANALYSIS")
PORT = 8080

# Estructura de Carpetas
DIRS = {
    "root": PROJECT_ROOT,
    "web_root": os.path.join(PROJECT_ROOT, "01_DEMO_EXPERIENCE"),
    "web_vid": os.path.join(PROJECT_ROOT, "01_DEMO_EXPERIENCE", "assets", "video"),
    "web_img": os.path.join(PROJECT_ROOT, "01_DEMO_EXPERIENCE", "assets", "images"),
    "engine_docs": os.path.join(PROJECT_ROOT, "02_THE_ENGINE", "documentation"),
    "engine_code": os.path.join(PROJECT_ROOT, "02_THE_ENGINE", "source_code"),
    "brand_footage": os.path.join(PROJECT_ROOT, "03_BRAND_MARKETING", "raw_footage"),
    "brand_photos": os.path.join(PROJECT_ROOT, "03_BRAND_MARKETING", "photoshoot_inspiration"),
    "brand_copy": os.path.join(PROJECT_ROOT, "03_BRAND_MARKETING", "copywriting_texts"),
    "vault": os.path.join(PROJECT_ROOT, "04_IP_SECRET_VAULT"),
}

# Código Web Final
HTML_CODE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYONYOU | Galeries Lafayette Pilot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .hero-section {
            text-align: center;
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .logo {
            font-size: 48px;
            font-weight: 300;
            letter-spacing: 4px;
            color: #d4af37;
            text-transform: uppercase;
            margin-bottom: 15px;
            animation: fadeInDown 1s ease-out;
        }

        .tagline {
            font-size: 18px;
            color: #aaa;
            letter-spacing: 2px;
            margin-bottom: 40px;
            animation: fadeInUp 1s ease-out 0.3s both;
        }

        .video-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 40px auto;
            border: 3px solid #d4af37;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 60px rgba(212, 175, 55, 0.3);
            animation: fadeIn 1s ease-out 0.6s both;
        }

        .video-container video {
            width: 100%;
            height: auto;
            display: block;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 60px 0;
            padding: 0 20px;
            max-width: 1200px;
            animation: fadeIn 1s ease-out 0.9s both;
        }

        .feature-card {
            background: rgba(26, 26, 46, 0.6);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
            border-color: #d4af37;
        }

        .feature-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }

        .feature-title {
            font-size: 20px;
            color: #d4af37;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .feature-description {
            font-size: 14px;
            color: #aaa;
            line-height: 1.6;
        }

        .cta-button {
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
            color: #0a0a0a;
            padding: 15px 40px;
            border: none;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            margin-top: 40px;
            animation: fadeIn 1s ease-out 1.2s both;
        }

        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        }

        .garment-preview {
            width: 100%;
            max-width: 400px;
            margin: 40px auto;
            border: 2px solid #d4af37;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 0 40px rgba(212, 175, 55, 0.2);
            animation: fadeIn 1s ease-out 1.5s both;
        }

        .garment-preview img {
            width: 100%;
            height: auto;
            display: block;
        }

        .footer {
            text-align: center;
            padding: 40px 20px;
            color: #666;
            font-size: 12px;
            letter-spacing: 1px;
            animation: fadeIn 1s ease-out 1.8s both;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .logo {
                font-size: 36px;
            }
            .tagline {
                font-size: 14px;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="hero-section">
        <h1 class="logo">TRYONYOU</h1>
        <p class="tagline">LIVE 'IT – Where beauty lives in movement</p>
        
        <div class="video-container">
            <video autoplay loop muted playsinline>
                <source src="assets/video/hero_gold_dust.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">Perfect Fit</h3>
                <p class="feature-description">AI-powered measurements ensure 99.7% fit accuracy for every garment.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">✨</div>
                <h3 class="feature-title">Instant Try-On</h3>
                <p class="feature-description">See yourself in luxury fashion instantly with our virtual mirror technology.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🦚</div>
                <h3 class="feature-title">Pau le Paon</h3>
                <p class="feature-description">Your personal AI stylist providing personalized recommendations.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3 class="feature-title">Style Discovery</h3>
                <p class="feature-description">Explore curated collections from top luxury brands.</p>
            </div>
        </div>

        <div class="garment-preview">
            <img src="assets/images/garment_match.jpg" alt="Featured Garment">
        </div>

        <button class="cta-button" onclick="alert('Welcome to TRYONYOU Pilot Experience!')">
            Experience the Future
        </button>

        <div class="footer">
            <p>TRYONYOU © 2025 | Galeries Lafayette Pilot Program</p>
            <p>Powered by AI Vision Technology</p>
        </div>
    </div>
</body>
</html>
"""

# ==============================================================================
# 1. GENERACIÓN Y ORGANIZACIÓN (EL MOTOR)
# ==============================================================================
def execute_construction():
    print("🚧 CONSTRUYENDO INFRAESTRUCTURA TRYONYOU V7 PRO...")
    
    # Crear carpetas
    for key, path in DIRS.items():
        if not os.path.exists(path):
            os.makedirs(path)

    # Generar Web
    with open(os.path.join(DIRS["web_root"], "index.html"), "w", encoding="utf-8") as f:
        f.write(HTML_CODE)

    # Recopilar Archivos del Inbox Actual
    all_files = []
    for f in os.listdir(os.getcwd()):
        if os.path.isfile(f) and f != os.path.basename(__file__):
            all_files.append({"path": os.path.join(os.getcwd(), f), "name": f})

    # Descomprimir ZIPs
    zips = [f for f in os.listdir(os.getcwd()) if f.endswith(".zip")]
    if zips:
        print("📦 Descomprimiendo archivos...")
        for z in zips:
            try:
                # Create unique temp directory for each ZIP to avoid conflicts
                zip_temp_dir = os.path.join(TEMP_EXTRACT_DIR, os.path.splitext(z)[0])
                if not os.path.exists(zip_temp_dir): os.makedirs(zip_temp_dir)
                
                with zipfile.ZipFile(z, 'r') as ref: ref.extractall(zip_temp_dir)
                for r, d, f in os.walk(zip_temp_dir):
                    for file in f: all_files.append({"path": os.path.join(r, file), "name": file})
            except (zipfile.BadZipFile, PermissionError, OSError) as e:
                print(f"⚠️ Error procesando {z}: {e}")
                continue

    # Clasificar Inteligente
    hero_vid_set = False
    hero_img_set = False

    print(f"🧠 Clasificando {len(all_files)} activos...")
    for item in all_files:
        name_lower = item["name"].lower()
        # Use os.path.splitext for safer extension extraction
        _, ext = os.path.splitext(name_lower)
        ext = ext.lstrip('.') if ext else ''
        src = item["path"]

        # VIDEO
        if ext in ['mp4', 'mov', 'avi']:
            if not hero_vid_set:
                shutil.copy2(src, os.path.join(DIRS["web_vid"], "hero_gold_dust.mp4"))
                hero_vid_set = True
            shutil.copy2(src, os.path.join(DIRS["brand_footage"], item["name"]))
        
        # IMG
        elif ext in ['jpg', 'png', 'jpeg', 'webp']:
            if "dress" in name_lower or "vestido" in name_lower:
                if not hero_img_set:
                    shutil.copy2(src, os.path.join(DIRS["web_img"], "garment_match.jpg"))
                    hero_img_set = True
                else:
                    shutil.copy2(src, os.path.join(DIRS["brand_photos"], item["name"]))
            else:
                shutil.copy2(src, os.path.join(DIRS["brand_photos"], item["name"]))
        
        # DOCS / CODE
        elif ext in ['pdf', 'doc', 'txt']:
            if "patent" in name_lower or "contrato" in name_lower:
                shutil.copy2(src, os.path.join(DIRS["vault"], item["name"]))
            else:
                shutil.copy2(src, os.path.join(DIRS["engine_docs"], item["name"]))
        elif ext in ['py', 'js', 'json']:
            shutil.copy2(src, os.path.join(DIRS["engine_code"], item["name"]))

    if os.path.exists(TEMP_EXTRACT_DIR): shutil.rmtree(TEMP_EXTRACT_DIR)
    print("✅ Construcción Completada.")

# ==============================================================================
# 2. SUPER-COMMIT (GIT AUTOMATION)
# ==============================================================================
def execute_supercommit():
    print("\n⚔️ INICIANDO SUPER-COMMIT PRO...")
    
    # Verificar si Git está instalado
    try:
        subprocess.run(["git", "--version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("⚠️ GIT NO DETECTADO. Saltando fase de commit.")
        return

    # Comandos Git
    try:
        # Inicializar
        if not os.path.exists(os.path.join(PROJECT_ROOT, ".git")):
            subprocess.run(["git", "init"], cwd=PROJECT_ROOT, check=True)
            print("🔹 Repositorio Inicializado.")
        
        # Añadir todo
        subprocess.run(["git", "add", "."], cwd=PROJECT_ROOT, check=True)
        print("🔹 Archivos Añadidos al Staging.")
        
        # Commit
        commit_msg = f"🚀 RELEASE: TRYONYOU Pilot v7 Pro - Full Deployment {time.strftime('%Y-%m-%d %H:%M')}"
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=PROJECT_ROOT, check=True)
        print(f"✅ SUPER-COMMIT REALIZADO: '{commit_msg}'")
        
    except Exception as e:
        print(f"⚠️ Error en Git: {e}")

# ==============================================================================
# 3. LANZAMIENTO (SERVIDOR)
# ==============================================================================
def launch_mission():
    print("\n🌍 LANZANDO SERVIDOR WEB...")
    os.chdir(DIRS["web_root"])
    
    def open_browser():
        time.sleep(2)
        webbrowser.open(f"http://localhost:{PORT}")
    
    threading.Thread(target=open_browser).start()
    
    try:
        Handler = SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 PILOTO ACTIVO EN: http://localhost:{PORT}")
            print("   (Presiona Ctrl+C para finalizar la misión)")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Misión Finalizada.")

# ==============================================================================
# EJECUCIÓN MAESTRA
# ==============================================================================
if __name__ == "__main__":
    execute_construction()  # Paso 1: Generar y Ordenar
    execute_supercommit()   # Paso 2: Git Commit
    launch_mission()        # Paso 3: Web Server
