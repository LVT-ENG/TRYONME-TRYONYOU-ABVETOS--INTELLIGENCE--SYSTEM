import os
import shutil
import zipfile
import time

# ==============================================================================
# 1. CONFIGURACIÓN
# ==============================================================================
# El proyecto se creará en el ESCRITORIO
USER_DESKTOP = os.path.join(os.path.expanduser("~"), "Desktop")
PROJECT_ROOT = os.path.join(USER_DESKTOP, "TRYONYOU_PILOT_V7_MASTER")
TEMP_EXTRACT_DIR = os.path.join(os.getcwd(), "_TEMP_UNZIPPED_ASSETS")

# Definición de subcarpetas destino
DIRS = {
    "exp": os.path.join(PROJECT_ROOT, "01_THE_EXPERIENCE"),
    "assets_vid": os.path.join(PROJECT_ROOT, "01_THE_EXPERIENCE", "assets", "video"),
    "assets_img": os.path.join(PROJECT_ROOT, "01_THE_EXPERIENCE", "assets", "images"),
    "engine": os.path.join(PROJECT_ROOT, "02_THE_ENGINE"),
    "brand": os.path.join(PROJECT_ROOT, "03_THE_BRAND"),
    "vault": os.path.join(PROJECT_ROOT, "04_IP_VAULT_SECURE"),
}

# ==============================================================================
# 2. CÓDIGO WEB "GOLD EDITION" (Final)
# ==============================================================================
HTML_CODE = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYONYOU - Gold Edition</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            overflow-x: hidden;
        }
        
        .hero-section {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
        }
        
        #hero-video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translate(-50%, -50%);
            z-index: 1;
            object-fit: cover;
        }
        
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
            z-index: 2;
        }
        
        .content {
            position: relative;
            z-index: 3;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            padding: 20px;
        }
        
        h1 {
            font-size: 4rem;
            font-weight: 300;
            letter-spacing: 0.5rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease-out;
        }
        
        .gold {
            color: #D4AF37;
            font-weight: 700;
        }
        
        .tagline {
            font-size: 1.5rem;
            font-weight: 300;
            letter-spacing: 0.2rem;
            margin-bottom: 3rem;
            animation: fadeInUp 1s ease-out 0.3s both;
        }
        
        .cta-button {
            padding: 1rem 3rem;
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: 0.2rem;
            color: #0a0a0a;
            background: linear-gradient(135deg, #D4AF37 0%, #F4E4B5 100%);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease-out 0.6s both;
            text-transform: uppercase;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        }
        
        .garment-showcase {
            padding: 5rem 2rem;
            background: #050505;
        }
        
        .garment-container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        
        .garment-container h2 {
            font-size: 3rem;
            font-weight: 300;
            letter-spacing: 0.3rem;
            margin-bottom: 3rem;
            color: #D4AF37;
        }
        
        .garment-image {
            max-width: 100%;
            height: auto;
            border: 2px solid #D4AF37;
            box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
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
        
        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }
            
            .tagline {
                font-size: 1rem;
            }
            
            .cta-button {
                padding: 0.8rem 2rem;
                font-size: 1rem;
            }
            
            .garment-container h2 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <section class="hero-section">
        <video id="hero-video" autoplay muted loop playsinline>
            <source src="assets/video/hero_gold_dust.mp4" type="video/mp4">
        </video>
        <div class="overlay"></div>
        <div class="content">
            <h1>TRYON<span class="gold">YOU</span></h1>
            <p class="tagline">LIVE 'IT – Where beauty lives in movement</p>
            <button class="cta-button">Experience Now</button>
        </div>
    </section>
    
    <section class="garment-showcase">
        <div class="garment-container">
            <h2>Featured Collection</h2>
            <img src="assets/images/garment_match.jpg" alt="Featured Garment" class="garment-image">
        </div>
    </section>
    
    <script>
        document.querySelector('.cta-button').addEventListener('click', function() {
            document.querySelector('.garment-showcase').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    </script>
</body>
</html>
"""

# ==============================================================================
# 3. LÓGICA DE UNZIP & ANÁLISIS (EL MOTOR)
# ==============================================================================

def genesis_unzip_master():
    print("✨ INICIANDO PROTOCOLO GÉNESIS (Versión Master Unzip)...")
    print(f"📍 Analizando directorio: {os.getcwd()}")
    
    # 1. Crear Estructura de Proyecto
    for key, path in DIRS.items():
        if not os.path.exists(path):
            os.makedirs(path)
    
    # 2. Escribir Código Web
    with open(os.path.join(DIRS["exp"], "index.html"), "w", encoding="utf-8") as f:
        f.write(HTML_CODE)
    
    # 3. ANALIZAR ARCHIVOS LOCALES Y COMPRIMIDOS
    files_to_check = []
    
    # A) Recopilar archivos sueltos
    for f in os.listdir(os.getcwd()):
        if os.path.isfile(f) and f != os.path.basename(__file__):
            files_to_check.append({"path": os.path.join(os.getcwd(), f), "name": f})

    # B) Detectar y Descomprimir ZIPs
    zips = [f for f in os.listdir(os.getcwd()) if f.endswith(".zip")]
    
    if zips:
        if not os.path.exists(TEMP_EXTRACT_DIR):
            os.makedirs(TEMP_EXTRACT_DIR)
            
        for zip_file in zips:
            print(f"📦 Descomprimiendo: {zip_file}...")
            try:
                with zipfile.ZipFile(zip_file, 'r') as zip_ref:
                    zip_ref.extractall(TEMP_EXTRACT_DIR)
                
                # Escanear recursivamente la carpeta temporal
                for root, dirs, files in os.walk(TEMP_EXTRACT_DIR):
                    for file in files:
                        full_path = os.path.join(root, file)
                        files_to_check.append({"path": full_path, "name": file})
            except Exception as e:
                print(f"⚠️ Error en ZIP {zip_file}: {e}")

    # 4. PROCESAR ASSETS (BUSCAR EL VIDEO Y LA IMAGEN)
    hero_video_found = False
    garment_img_found = False

    print(f"🔍 Analizando {len(files_to_check)} archivos en total...")

    for item in files_to_check:
        full_path = item["path"]
        filename = item["name"]
        ext = filename.lower().split('.')[-1]

        # VIDEO HERO
        if ext in ['mp4', 'mov', 'avi'] and not hero_video_found:
            dest = os.path.join(DIRS["assets_vid"], "hero_gold_dust.mp4")
            shutil.copy2(full_path, dest) # Copy to be safe
            print(f"🎬 VIDEO ENCONTRADO: {filename} -> Configurado como Hero.")
            hero_video_found = True
        
        # IMAGEN PRENDA
        elif ext in ['jpg', 'png', 'jpeg', 'webp'] and not garment_img_found:
            # Preferencia por archivos con nombres relevantes
            if "dress" in filename.lower() or "vestido" in filename.lower() or "garment" in filename.lower():
                dest = os.path.join(DIRS["assets_img"], "garment_match.jpg")
                shutil.copy2(full_path, dest)
                print(f"👗 IMAGEN PRENDA: {filename} -> Configurada.")
                garment_img_found = True
    
    # 5. LIMPIEZA
    if os.path.exists(TEMP_EXTRACT_DIR):
        print("🧹 Limpiando archivos temporales...")
        shutil.rmtree(TEMP_EXTRACT_DIR)

    print("\n✅ ¡PROCESO FINALIZADO!")
    print(f"👉 Tu piloto está listo en el Escritorio: TRYONYOU_PILOT_V7_MASTER")
    
    if not hero_video_found:
        print("⚠️ AVISO: No encontré ningún video .mp4 (ni suelto ni en los zips).")
    
if __name__ == "__main__":
    genesis_unzip_master()
