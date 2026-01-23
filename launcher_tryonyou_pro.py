import os
import shutil
import zipfile
import time
import webbrowser
import threading
from http.server import SimpleHTTPRequestHandler
import socketserver

# ==============================================================================
# 1. CONFIGURACIÓN DEL PROYECTO
# ==============================================================================
# Se crea en el ESCRITORIO
USER_DESKTOP = os.path.join(os.path.expanduser("~"), "Desktop")
PROJECT_ROOT = os.path.join(USER_DESKTOP, "TRYONYOU_MASTER_PROJECT")
TEMP_EXTRACT_DIR = os.path.join(os.getcwd(), "_TEMP_ANALYSIS_ZONE")
PORT = 8080

# --- MAPA DE CARPETAS (ORDEN Y SENTIDO) ---
DIRS = {
    "root": PROJECT_ROOT,
    
    # ZONA 1: LA DEMO WEB (Lo que ve el cliente)
    "web_root": os.path.join(PROJECT_ROOT, "01_DEMO_EXPERIENCE"),
    "web_vid": os.path.join(PROJECT_ROOT, "01_DEMO_EXPERIENCE", "assets", "video"),
    "web_img": os.path.join(PROJECT_ROOT, "01_DEMO_EXPERIENCE", "assets", "images"),
    
    # ZONA 2: EL MOTOR Y CÓDIGO (Para desarrolladores)
    "engine_docs": os.path.join(PROJECT_ROOT, "02_THE_ENGINE", "documentation"),
    "engine_code": os.path.join(PROJECT_ROOT, "02_THE_ENGINE", "source_code"),
    
    # ZONA 3: MARKETING Y BRANDING (Fotos y videos extra)
    "brand_footage": os.path.join(PROJECT_ROOT, "03_BRAND_MARKETING", "raw_footage"),
    "brand_photos": os.path.join(PROJECT_ROOT, "03_BRAND_MARKETING", "photoshoot_inspiration"),
    "brand_copy": os.path.join(PROJECT_ROOT, "03_BRAND_MARKETING", "copywriting_texts"),

    # ZONA 4: SEGURIDAD Y LEGAL (Caja Fuerte)
    "vault": os.path.join(PROJECT_ROOT, "04_IP_SECRET_VAULT"),
}

# ==============================================================================
# 2. GENERADOR DE LA WEB (Frontend Lujo)
# ==============================================================================
HTML_CODE = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYONYOU - DEMO EXPERIENCE</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%);
            color: #ffffff;
            overflow-x: hidden;
        }
        
        .hero {
            position: relative;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
        }
        
        .hero video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.6;
            z-index: 0;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            padding: 2rem;
        }
        
        .logo {
            font-size: 4rem;
            font-weight: 700;
            background: linear-gradient(135deg, #00A8E8 0%, #D4AF37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            text-shadow: 0 0 40px rgba(0, 168, 232, 0.5);
        }
        
        .tagline {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: #8B92A0;
            letter-spacing: 2px;
        }
        
        .cta-button {
            display: inline-block;
            padding: 1rem 3rem;
            background: linear-gradient(135deg, #00A8E8 0%, #003459 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 168, 232, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 168, 232, 0.5);
        }
        
        .features {
            padding: 5rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #D4AF37;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 40px rgba(0, 168, 232, 0.2);
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .feature-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #00A8E8;
        }
        
        .feature-desc {
            color: #8B92A0;
            line-height: 1.6;
        }
        
        .showcase {
            padding: 5rem 2rem;
            background: rgba(0, 52, 89, 0.2);
        }
        
        .showcase-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .showcase-image {
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .showcase-text h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: #D4AF37;
        }
        
        .showcase-text p {
            font-size: 1.2rem;
            line-height: 1.8;
            color: #8B92A0;
            margin-bottom: 1rem;
        }
        
        footer {
            text-align: center;
            padding: 3rem 2rem;
            background: #0A0A0A;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-text {
            color: #8B92A0;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .logo {
                font-size: 2.5rem;
            }
            
            .tagline {
                font-size: 1.1rem;
            }
            
            .showcase-content {
                grid-template-columns: 1fr;
            }
            
            .feature-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <video autoplay loop muted playsinline>
            <source src="assets/video/hero_gold_dust.mp4" type="video/mp4">
        </video>
        <div class="hero-content">
            <h1 class="logo">TRYONYOU</h1>
            <p class="tagline">LIVE IT - Where Beauty Lives in Movement</p>
            <a href="#features" class="cta-button">Descubre la Experiencia</a>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <h2 class="section-title">Tecnología de Vanguardia</h2>
        <div class="feature-grid">
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3 class="feature-title">IA Avanzada</h3>
                <p class="feature-desc">Algoritmos de última generación para un ajuste perfecto y recomendaciones personalizadas.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">👗</div>
                <h3 class="feature-title">Prueba Virtual</h3>
                <p class="feature-desc">Visualiza cómo te queda la ropa antes de comprar, con tecnología de realidad aumentada.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">✨</div>
                <h3 class="feature-title">Experiencia Premium</h3>
                <p class="feature-desc">Interfaz de lujo diseñada para ofrecer la mejor experiencia de compra online.</p>
            </div>
        </div>
    </section>

    <!-- Showcase Section -->
    <section class="showcase">
        <div class="showcase-content">
            <div>
                <img src="assets/images/garment_match.jpg" alt="Fashion Match" class="showcase-image">
            </div>
            <div class="showcase-text">
                <h2>Encuentra tu Estilo Perfecto</h2>
                <p>TRYONYOU revoluciona la forma en que compras moda online. Nuestra tecnología de IA analiza tu estilo personal y encuentra las prendas que mejor se adaptan a ti.</p>
                <p>Olvídate de las devoluciones y las compras incorrectas. Con TRYONYOU, cada compra es una experiencia perfecta.</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p class="footer-text">© 2025 TRYONYOU - All Rights Reserved | Powered by Advanced AI Technology</p>
    </footer>
</body>
</html>
"""

# ==============================================================================
# 3. LÓGICA DE CLASIFICACIÓN INTELIGENTE
# ==============================================================================

def safe_copy_file(src, dest, description=""):
    """Safely copy a file with error handling."""
    try:
        shutil.copy2(src, dest)
        return True
    except (IOError, OSError) as e:
        print(f"⚠️ Error copiando {description if description else os.path.basename(src)}: {str(e)}")
        return False

def analyze_and_organize():
    print("🧠 ACTIVANDO IA DE ORGANIZACIÓN (TRYONYOU PRO)...")
    
    # 1. Crear carpetas
    for key, path in DIRS.items():
        if not os.path.exists(path):
            os.makedirs(path)
            
    # 2. Generar el HTML
    with open(os.path.join(DIRS["web_root"], "index.html"), "w", encoding="utf-8") as f:
        f.write(HTML_CODE)

    # 3. Recopilar Archivos (Sueltos + Zips)
    all_files = []
    
    # Archivos sueltos en directorio actual
    for f in os.listdir(os.getcwd()):
        if os.path.isfile(f) and f != os.path.basename(__file__):
            all_files.append({"path": os.path.join(os.getcwd(), f), "name": f})
    
    # Descomprimir Zips
    zips = [f for f in os.listdir(os.getcwd()) if f.endswith(".zip")]
    if zips:
        if not os.path.exists(TEMP_EXTRACT_DIR): os.makedirs(TEMP_EXTRACT_DIR)
        print("📦 Descomprimiendo archivos comprimidos...")
        for z in zips:
            try:
                with zipfile.ZipFile(z, 'r') as ref: ref.extractall(TEMP_EXTRACT_DIR)
                for r, d, f in os.walk(TEMP_EXTRACT_DIR):
                    for file in f: all_files.append({"path": os.path.join(r, file), "name": file})
            except zipfile.BadZipFile:
                print(f"⚠️ Archivo ZIP corrupto: {z}")
            except Exception as e:
                print(f"⚠️ Error al extraer {z}: {str(e)}")

    # 4. CLASIFICACIÓN POR TIPO Y CONTENIDO
    hero_video_set = False
    hero_img_set = False

    print(f"📂 Procesando {len(all_files)} archivos encontrados...")

    for item in all_files:
        name_lower = item["name"].lower()
        # Validate file has an extension
        if '.' not in name_lower:
            print(f"⚠️ Archivo sin extensión ignorado: {item['name']}")
            continue
        ext = name_lower.split('.')[-1]
        src = item["path"]
        
        # A. VIDEOS (MP4, MOV)
        if ext in ['mp4', 'mov', 'avi']:
            # El primero se convierte en el HERO de la web
            if not hero_video_set:
                if safe_copy_file(src, os.path.join(DIRS["web_vid"], "hero_gold_dust.mp4"), item['name']):
                    hero_video_set = True
                    print(f"🎬 Web Hero Video: {item['name']}")
            
            # TODOS se guardan también en Marketing/Footage
            safe_copy_file(src, os.path.join(DIRS["brand_footage"], item["name"]), item['name'])
        
        # B. IMÁGENES (JPG, PNG)
        elif ext in ['jpg', 'png', 'jpeg', 'webp']:
            # Si parece una prenda -> Activo Web
            if "dress" in name_lower or "vestido" in name_lower or "garment" in name_lower or "match" in name_lower:
                if not hero_img_set:
                    if safe_copy_file(src, os.path.join(DIRS["web_img"], "garment_match.jpg"), item['name']):
                        hero_img_set = True
                        print(f"👗 Web Garment Image: {item['name']}")
                else:
                    # Si sobran vestidos, a marketing
                    safe_copy_file(src, os.path.join(DIRS["brand_photos"], item["name"]), item['name'])
            else:
                # Resto de fotos -> Inspiración de Marca
                safe_copy_file(src, os.path.join(DIRS["brand_photos"], item["name"]), item['name'])
                print(f"📸 Foto a Marketing: {item['name']}")

        # C. DOCUMENTOS DE TEXTO / PDF
        elif ext in ['pdf', 'doc', 'docx', 'txt', 'md']:
            # Palabras clave de seguridad
            if "patent" in name_lower or "patente" in name_lower or "contrato" in name_lower or "agreement" in name_lower or "nda" in name_lower:
                safe_copy_file(src, os.path.join(DIRS["vault"], item["name"]), item['name'])
                print(f"🔐 DOC SENSIBLE a Caja Fuerte: {item['name']}")
            
            # Palabras clave de marketing
            elif "copy" in name_lower or "guion" in name_lower or "script" in name_lower or "brand" in name_lower:
                safe_copy_file(src, os.path.join(DIRS["brand_copy"], item["name"]), item['name'])
            
            # Resto -> Documentación Técnica
            else:
                safe_copy_file(src, os.path.join(DIRS["engine_docs"], item["name"]), item['name'])
                print(f"📄 Doc a Engine: {item['name']}")

        # D. CÓDIGO FUENTE
        elif ext in ['py', 'js', 'html', 'css', 'json']:
            safe_copy_file(src, os.path.join(DIRS["engine_code"], item["name"]), item['name'])
            print(f"💻 Código archivado: {item['name']}")

    # Limpieza
    if os.path.exists(TEMP_EXTRACT_DIR): shutil.rmtree(TEMP_EXTRACT_DIR)

    # 5. LANZAR
    print("\n✅ ORGANIZACIÓN COMPLETA.")
    print(f"🌍 INICIANDO DEMO WEB...")
    os.chdir(DIRS["web_root"])
    
    def open_browser():
        time.sleep(1.5)
        webbrowser.open(f"http://localhost:{PORT}")
    
    threading.Thread(target=open_browser).start()
    
    try:
        Handler = SimpleHTTPRequestHandler
        with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
            print(f"🚀 Servidor activo en http://localhost:{PORT}")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido.")

if __name__ == "__main__":
    analyze_and_organize()
