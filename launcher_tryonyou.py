import os
import shutil
import zipfile
import time
import webbrowser
import threading
from http.server import SimpleHTTPRequestHandler
import socketserver

# ==============================================================================
# 1. CONFIGURACIÓN DEL DESPLIEGUE
# ==============================================================================
# El proyecto se creará en el ESCRITORIO
USER_DESKTOP = os.path.join(os.path.expanduser("~"), "Desktop")
PROJECT_ROOT = os.path.join(USER_DESKTOP, "TRYONYOU_PILOT_V7_LIVE")
TEMP_EXTRACT_DIR = os.path.join(os.getcwd(), "_TEMP_ASSETS")
PORT = 8080

# Definición de carpetas
DIRS = {
    "root": PROJECT_ROOT,
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRYONYOU – Gold Edition</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* Animated Background */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
      animation: pulse 8s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.1); }
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      width: 90%;
      padding: 40px;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 60px;
      animation: fadeInDown 1s ease-out;
    }

    .header h1 {
      font-size: 72px;
      font-weight: 900;
      letter-spacing: -2px;
      color: #d4af37;
      text-transform: uppercase;
      margin-bottom: 10px;
      text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
      font-style: italic;
    }

    .header .subtitle {
      font-size: 18px;
      color: #aaa;
      letter-spacing: 4px;
      text-transform: uppercase;
      font-weight: 300;
    }

    /* Hero Section */
    .hero {
      position: relative;
      width: 100%;
      height: 600px;
      border-radius: 30px;
      overflow: hidden;
      margin-bottom: 40px;
      box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
      animation: fadeIn 1.5s ease-out;
    }

    .hero video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.7);
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 60px;
    }

    .hero-content {
      text-align: center;
      color: #fff;
    }

    .hero-content h2 {
      font-size: 48px;
      font-weight: 900;
      color: #d4af37;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .hero-content p {
      font-size: 20px;
      color: #ddd;
      max-width: 600px;
      line-height: 1.6;
    }

    /* Features Grid */
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
      animation: fadeInUp 2s ease-out;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 20px;
      padding: 40px 30px;
      text-align: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .feature-card:hover {
      transform: translateY(-10px);
      border-color: #d4af37;
      box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

    .feature-icon {
      font-size: 48px;
      margin-bottom: 20px;
      display: inline-block;
    }

    .feature-title {
      font-size: 24px;
      font-weight: 700;
      color: #d4af37;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .feature-desc {
      font-size: 16px;
      color: #aaa;
      line-height: 1.6;
    }

    /* CTA Button */
    .cta-section {
      text-align: center;
      margin-top: 40px;
      animation: fadeIn 2.5s ease-out;
    }

    .cta-button {
      display: inline-block;
      padding: 25px 60px;
      background: linear-gradient(90deg, #d4af37, #c5a46d);
      color: #000;
      font-size: 22px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 3px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 20px 60px rgba(212, 175, 55, 0.4);
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
    }

    .cta-button:hover {
      transform: scale(1.05);
      box-shadow: 0 30px 80px rgba(212, 175, 55, 0.6);
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 80px;
      padding: 30px;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      color: #666;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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

    /* Garment Display */
    .garment-preview {
      position: relative;
      width: 100%;
      max-width: 400px;
      margin: 0 auto 40px;
      border-radius: 20px;
      overflow: hidden;
      border: 2px solid rgba(212, 175, 55, 0.3);
      animation: fadeIn 2s ease-out;
    }

    .garment-preview img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
    }

    .garment-preview:hover img {
      transform: scale(1.05);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header h1 {
        font-size: 48px;
      }
      
      .hero {
        height: 400px;
      }
      
      .hero-content h2 {
        font-size: 32px;
      }
      
      .features {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>TRYONYOU</h1>
      <p class="subtitle">Gold Edition Pilot V7</p>
    </div>

    <!-- Hero Video Section -->
    <div class="hero">
      <video autoplay loop muted playsinline id="heroVideo">
        <source src="assets/video/hero_gold_dust.mp4" type="video/mp4">
        Your browser does not support video.
      </video>
      <div class="hero-overlay">
        <div class="hero-content">
          <h2>Where Beauty Lives in Movement</h2>
          <p>Experience the future of fashion with AI-powered virtual try-on technology.</p>
        </div>
      </div>
    </div>

    <!-- Garment Preview -->
    <div class="garment-preview">
      <img src="assets/images/garment_match.jpg" alt="Featured Garment" id="garmentImage">
    </div>

    <!-- Features Grid -->
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3 class="feature-title">Perfect Fit</h3>
        <p class="feature-desc">AI-powered body measurements ensure the perfect fit every time. No more guessing sizes.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">✨</div>
        <h3 class="feature-title">Virtual Try-On</h3>
        <p class="feature-desc">See how clothes look on you instantly, without physically trying them on.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3 class="feature-title">Zero Returns</h3>
        <p class="feature-desc">Make confident purchases with accurate fit predictions. Reduce returns to zero.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">💎</div>
        <h3 class="feature-title">Luxury Experience</h3>
        <p class="feature-desc">Premium brands meet cutting-edge technology for an unmatched shopping experience.</p>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <button class="cta-button" onclick="alert('Experience launching soon! Stay tuned.')">
        Launch Experience
      </button>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>TRYONYOU © 2025 | Gold Edition Pilot V7 | All Rights Reserved</p>
    </div>
  </div>

  <script>
    // Fallback for missing video
    const video = document.getElementById('heroVideo');
    video.addEventListener('error', function() {
      console.log('Video not found, using fallback background');
      document.querySelector('.hero').style.background = 
        'linear-gradient(135deg, #1a1a2e 0%, #d4af37 50%, #1a1a2e 100%)';
    });

    // Fallback for missing image
    const img = document.getElementById('garmentImage');
    img.addEventListener('error', function() {
      console.log('Image not found, using placeholder');
      this.style.display = 'none';
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    console.log('🚀 TRYONYOU Gold Edition - Pilot V7 Loaded Successfully');
  </script>
</body>
</html>"""

# ==============================================================================
# 3. LÓGICA DE AUTOMATIZACIÓN (El Cerebro)
# ==============================================================================

def launch_everything():
    print("🚀 INICIANDO LANZADOR TRYONYOU...")
    
    # 1. Crear Estructura de Directorios
    for key, path in DIRS.items():
        if not os.path.exists(path):
            os.makedirs(path)
    
    # 2. Generar el HTML
    with open(os.path.join(DIRS["exp"], "index.html"), "w", encoding="utf-8") as f:
        f.write(HTML_CODE)

    # 3. Descomprimir y Organizar Archivos
    files_to_check = []
    
    # Buscar sueltos
    for f in os.listdir(os.getcwd()):
        if os.path.isfile(f) and f != os.path.basename(__file__):
            files_to_check.append({"path": os.path.join(os.getcwd(), f), "name": f})
    
    # Descomprimir ZIPs
    zips = [f for f in os.listdir(os.getcwd()) if f.endswith(".zip")]
    if zips:
        if not os.path.exists(TEMP_EXTRACT_DIR): os.makedirs(TEMP_EXTRACT_DIR)
        print("📦 Descomprimiendo archivos...")
        for z in zips:
            try:
                with zipfile.ZipFile(z, 'r') as ref: ref.extractall(TEMP_EXTRACT_DIR)
                for r, d, f in os.walk(TEMP_EXTRACT_DIR):
                    for file in f: files_to_check.append({"path": os.path.join(r, file), "name": file})
            except: pass

    # Mover Assets
    found_vid = False
    for item in files_to_check:
        ext = item["name"].lower().split('.')[-1]
        if ext in ['mp4', 'mov'] and not found_vid:
            shutil.copy2(item["path"], os.path.join(DIRS["assets_vid"], "hero_gold_dust.mp4"))
            found_vid = True
            print("🎬 Video configurado.")
        elif ext in ['jpg', 'png', 'jpeg'] and ("dress" in item["name"].lower() or "vestido" in item["name"].lower()):
            shutil.copy2(item["path"], os.path.join(DIRS["assets_img"], "garment_match.jpg"))

    # Limpieza
    if os.path.exists(TEMP_EXTRACT_DIR): shutil.rmtree(TEMP_EXTRACT_DIR)

    # 4. LANZAR SERVIDOR Y NAVEGADOR
    print("\n✅ ESTRUCTURA LISTA EN ESCRITORIO.")
    print(f"🌍 INICIANDO SERVIDOR EN http://localhost:{PORT}")
    
    # Cambiar directorio raíz al proyecto web
    os.chdir(DIRS["exp"])
    
    def open_browser():
        time.sleep(1.5)
        webbrowser.open(f"http://localhost:{PORT}")
    
    threading.Thread(target=open_browser).start()
    
    # Servidor (Bloqueante)
    try:
        Handler = SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("   (Presiona Ctrl+C para detener)")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido.")

if __name__ == "__main__":
    launch_everything()
