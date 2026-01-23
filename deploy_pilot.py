import os
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler
import socketserver
import threading
import time

# ==============================================================================
# CONFIGURACIÓN DEL PILOTO
# ==============================================================================
PROJECT_NAME = "TRYONYOU_Lafayette_Pilot"
PORT = 8080

# ==============================================================================
# CÓDIGO FUENTE DEL PILOTO (HTML + CSS + JS)
# Contiene: Landing Lujo, PAU Avatar, Chat Lógico, Simulador de Escáner
# ==============================================================================
html_content = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRYONYOU Lafayette Pilot | AI Virtual Try-On</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        
        body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            overflow-x: hidden;
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #C5A46D 0%, #FFE5B4 50%, #C5A46D 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        .glow-effect {
            box-shadow: 0 0 40px rgba(197, 164, 109, 0.4);
        }
        
        .scan-line {
            animation: scan 3s linear infinite;
        }
        
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        
        .pulse-dot {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .stats-counter {
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.05em;
        }

        #videoElement {
            transform: scaleX(-1); /* Mirror effect for camera */
        }

        .btn-primary {
            background: linear-gradient(135deg, #C5A46D 0%, #997B40 100%);
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 40px rgba(197, 164, 109, 0.5);
        }

        .avatar-container {
            position: relative;
            overflow: hidden;
        }

        .measurement-badge {
            background: rgba(197, 164, 109, 0.1);
            border: 1px solid rgba(197, 164, 109, 0.3);
        }
    </style>
</head>
<body class="text-white">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-[#C5A46D] to-[#997B40] rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <div>
                    <h1 class="text-2xl font-black tracking-tighter gradient-text">TRYONYOU</h1>
                    <p class="text-[8px] text-white/40 uppercase tracking-widest">Lafayette Pilot</p>
                </div>
            </div>
            <div class="hidden md:flex items-center space-x-6 text-xs uppercase tracking-wider">
                <a href="#home" class="text-white/60 hover:text-[#C5A46D] transition">Home</a>
                <a href="#tech" class="text-white/60 hover:text-[#C5A46D] transition">Technology</a>
                <a href="#demo" class="text-white/60 hover:text-[#C5A46D] transition">Demo</a>
                <a href="#contact" class="text-white/60 hover:text-[#C5A46D] transition">Contact</a>
            </div>
            <div class="flex items-center space-x-2">
                <span class="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
                <span class="text-xs text-white/60">SYSTEM ONLINE</span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center pt-20 px-6">
        <div id="hero-content" class="max-w-6xl mx-auto text-center fade-in">
            <div class="inline-block mb-6 px-6 py-2 glass-card rounded-full">
                <p class="text-xs uppercase tracking-[0.3em] text-[#C5A46D]">Patent Pending • PCT/EP2025/067317</p>
            </div>
            
            <h2 class="text-7xl md:text-9xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                BODY<br/>
                <span class="gradient-text">INTELLIGENCE.</span>
            </h2>
            
            <p class="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                La era del e-commerce de lotería ha terminado.<br/>
                Bienvenido a la garantía de ajuste perfecto impulsada por IA biométrica.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button onclick="startDemo()" class="btn-primary text-black px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider shadow-2xl">
                    Iniciar Demo
                </button>
                <button onclick="scrollToTech()" class="glass-card text-white px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition">
                    Ver Tecnología
                </button>
            </div>

            <!-- Stats Section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div class="glass-card p-8 rounded-3xl">
                    <p class="text-5xl font-black gradient-text stats-counter mb-2">98%</p>
                    <p class="text-sm uppercase tracking-widest text-white/60">Precisión de Ajuste</p>
                </div>
                <div class="glass-card p-8 rounded-3xl">
                    <p class="text-5xl font-black gradient-text stats-counter mb-2">-90%</p>
                    <p class="text-sm uppercase tracking-widest text-white/60">Reducción de Devoluciones</p>
                </div>
                <div class="glass-card p-8 rounded-3xl">
                    <p class="text-5xl font-black gradient-text stats-counter mb-2">€400M</p>
                    <p class="text-sm uppercase tracking-widest text-white/60">Valoración</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Technology Section -->
    <section id="tech" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h3 class="text-6xl font-black uppercase tracking-tighter mb-4">
                    <span class="gradient-text">PAU Avatar</span> Technology
                </h3>
                <p class="text-xl text-white/60">Biometric AI • 3D Body Mapping • Fabric Physics</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12">
                <!-- Feature 1 -->
                <div class="glass-card p-10 rounded-[3rem] hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-[#C5A46D] to-[#997B40] rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Escaneo Biométrico</h4>
                    <p class="text-white/60 leading-relaxed">Captura 30+ puntos corporales en tiempo real usando MediaPipe AI. Sin hardware especial, solo tu cámara.</p>
                </div>

                <!-- Feature 2 -->
                <div class="glass-card p-10 rounded-[3rem] hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-[#C5A46D] to-[#997B40] rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Física de Telas</h4>
                    <p class="text-white/60 leading-relaxed">Simulación avanzada de elasticidad, caída y drapeado. Cada tejido se comporta de forma realista.</p>
                </div>

                <!-- Feature 3 -->
                <div class="glass-card p-10 rounded-[3rem] hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-[#C5A46D] to-[#997B40] rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Matching Determinístico</h4>
                    <p class="text-white/60 leading-relaxed">Algoritmo propietario que calcula el ajuste perfecto considerando más de 15 variables corporales y de prenda.</p>
                </div>

                <!-- Feature 4 -->
                <div class="glass-card p-10 rounded-[3rem] hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-[#C5A46D] to-[#997B40] rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold mb-4">Renderizado Instantáneo</h4>
                    <p class="text-white/60 leading-relaxed">Visualización en 3D de alta calidad en menos de 2 segundos. Experiencia fluida y profesional.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Demo Section -->
    <section id="demo" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-7xl mx-auto w-full">
            <div class="text-center mb-16">
                <h3 class="text-6xl font-black uppercase tracking-tighter mb-4">
                    <span class="gradient-text">Live Demo</span>
                </h3>
                <p class="text-xl text-white/60">Experimenta el futuro del e-commerce de moda</p>
            </div>

            <!-- Demo Interface -->
            <div id="demo-start" class="text-center">
                <div class="glass-card p-16 rounded-[4rem] max-w-2xl mx-auto">
                    <div class="w-32 h-32 bg-gradient-to-br from-[#C5A46D] to-[#997B40] rounded-full mx-auto mb-8 flex items-center justify-center glow-effect">
                        <svg class="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h4 class="text-3xl font-bold mb-6">Inicia el Escáner Corporal</h4>
                    <p class="text-white/60 mb-8 text-lg">Necesitaremos acceso a tu cámara para capturar tus medidas biométricas</p>
                    <button onclick="activateScanner()" class="btn-primary text-black px-16 py-6 rounded-full font-bold text-xl uppercase tracking-wider">
                        Activar Escáner
                    </button>
                </div>
            </div>

            <!-- Scanner Interface (Hidden initially) -->
            <div id="scanner-interface" class="hidden">
                <div class="grid lg:grid-cols-2 gap-12">
                    <div class="glass-card p-8 rounded-[3rem]">
                        <h4 class="text-2xl font-bold mb-6 text-center">Vista de Cámara</h4>
                        <div class="relative avatar-container rounded-[2rem] overflow-hidden bg-black/50 aspect-[3/4]">
                            <video id="videoElement" autoplay playsinline class="w-full h-full object-cover"></video>
                            <div class="absolute inset-0 border-4 border-[#C5A46D]/30 rounded-[2rem] pointer-events-none"></div>
                            <div class="absolute top-0 left-0 w-full h-1 bg-[#C5A46D] scan-line"></div>
                        </div>
                        <button onclick="captureBodyMetrics()" class="w-full mt-6 btn-primary text-black px-8 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider">
                            Capturar Biometría
                        </button>
                    </div>

                    <div class="glass-card p-8 rounded-[3rem]">
                        <h4 class="text-2xl font-bold mb-6 text-center">Consola Neural</h4>
                        <div id="neural-console" class="bg-black/80 rounded-2xl p-6 h-[500px] overflow-y-auto font-mono text-sm space-y-2 border border-[#C5A46D]/20">
                            <div class="text-[#C5A46D]">> TRYONYOU Neural System v2.0 [ONLINE]</div>
                            <div class="text-white/40">> Esperando inicio de escaneo...</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Interface (Hidden initially) -->
            <div id="results-interface" class="hidden">
                <div class="grid lg:grid-cols-2 gap-12">
                    <div class="glass-card rounded-[4rem] overflow-hidden aspect-[3/4]">
                        <model-viewer 
                            src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb" 
                            auto-rotate 
                            camera-controls 
                            style="width:100%;height:100%" 
                            shadow-intensity="2" 
                            exposure="0.8" 
                            environment-image="neutral">
                        </model-viewer>
                    </div>

                    <div class="flex flex-col justify-center space-y-8">
                        <div>
                            <h3 class="text-6xl font-black italic uppercase tracking-tighter mb-2">Perfect Fit</h3>
                            <p class="text-[#C5A46D] font-bold tracking-[0.4em] uppercase text-sm">Deterministic Match Confirmed</p>
                        </div>

                        <div class="grid grid-cols-2 gap-6">
                            <div class="measurement-badge p-6 rounded-2xl">
                                <p class="text-white/40 text-xs uppercase mb-1">Altura</p>
                                <p class="text-3xl font-black">1.78m</p>
                            </div>
                            <div class="measurement-badge p-6 rounded-2xl">
                                <p class="text-white/40 text-xs uppercase mb-1">Pecho</p>
                                <p class="text-3xl font-black">101cm</p>
                            </div>
                            <div class="measurement-badge p-6 rounded-2xl">
                                <p class="text-white/40 text-xs uppercase mb-1">Cintura</p>
                                <p class="text-3xl font-black">88cm</p>
                            </div>
                            <div class="measurement-badge p-6 rounded-2xl">
                                <p class="text-white/40 text-xs uppercase mb-1">Hombros</p>
                                <p class="text-3xl font-black">45cm</p>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-[#C5A46D] to-[#997B40] p-10 rounded-[3rem] text-black glow-effect">
                            <p class="font-bold text-sm opacity-70 uppercase mb-2 text-center">Lafayette Slim Blazer</p>
                            <p class="text-6xl font-black italic uppercase text-center mb-4">Size M</p>
                            <p class="text-sm font-semibold text-center leading-relaxed">
                                Calculado con 5% elasticidad de lana y score de caída de 8/10.
                            </p>
                        </div>

                        <div class="flex items-center justify-center gap-2 text-xs text-white/40 uppercase tracking-widest">
                            <span class="w-2 h-2 bg-green-500 rounded-full pulse-dot"></span>
                            Sincronizado con Google Looker Studio
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-white/10">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h5 class="text-xl font-bold gradient-text mb-4">TRYONYOU</h5>
                    <p class="text-white/60 text-sm leading-relaxed">
                        Revolucionando el e-commerce de moda con inteligencia artificial biométrica.
                    </p>
                </div>
                <div>
                    <h6 class="text-sm font-bold uppercase tracking-wider mb-4">Enlaces</h6>
                    <ul class="space-y-2 text-sm text-white/60">
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Sobre Nosotros</a></li>
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Tecnología</a></li>
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Partners</a></li>
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h6 class="text-sm font-bold uppercase tracking-wider mb-4">Legal</h6>
                    <ul class="space-y-2 text-sm text-white/60">
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Privacidad</a></li>
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Términos</a></li>
                        <li><a href="#" class="hover:text-[#C5A46D] transition">Patentes</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center text-xs text-white/40 uppercase tracking-widest">
                <p>© 2025 TRYONYOU. Patent Pending PCT/EP2025/067317. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        // Smooth Scroll
        function scrollToTech() {
            document.getElementById('tech').scrollIntoView({ behavior: 'smooth' });
        }

        function startDemo() {
            document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
        }

        // Scanner Activation
        async function activateScanner() {
            const startDiv = document.getElementById('demo-start');
            const scannerDiv = document.getElementById('scanner-interface');
            
            startDiv.classList.add('hidden');
            scannerDiv.classList.remove('hidden');
            
            // Request camera access
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const videoElement = document.getElementById('videoElement');
                videoElement.srcObject = stream;
                
                logToConsole('> CÁMARA ACTIVA: Stream iniciado correctamente');
                
                // Get video settings safely
                const settings = stream.getVideoTracks()[0].getSettings();
                if (settings.width && settings.height) {
                    logToConsole('> Resolución: ' + settings.width + 'x' + settings.height + 'px');
                }
                
                logToConsole('> Listo para captura biométrica');
            } catch (err) {
                console.error('Error accessing camera:', err);
                logToConsole('> ERROR: No se pudo acceder a la cámara', true);
                logToConsole('> Por favor, concede permisos de cámara', true);
            }
        }

        // Capture Body Metrics
        function captureBodyMetrics() {
            logToConsole('> INICIANDO ESCANEO BIOMÉTRICO...');
            logToConsole('> Capturando puntos de referencia corporales');
            
            setTimeout(() => {
                logToConsole('> ANÁLISIS MEDIAPIPE: 30+ landmarks detectados');
            }, 500);
            
            setTimeout(() => {
                logToConsole('> EXTRACCIÓN DE VECTORES: HIP_GIRTH [142px]');
                logToConsole('> EXTRACCIÓN DE VECTORES: SHOULDER_WIDTH [186px]');
                logToConsole('> EXTRACCIÓN DE VECTORES: CHEST_DEPTH [94px]');
            }, 1000);
            
            setTimeout(() => {
                logToConsole('> CALCULANDO PROPORCIONES CORPORALES...');
                logToConsole('> Altura estimada: 178cm ± 2cm');
                logToConsole('> Pecho: 101cm ± 1cm');
            }, 1500);
            
            setTimeout(() => {
                logToConsole('> INICIANDO MATRIZ DE TRANSFORMACIÓN...');
                logToConsole('> Aplicando física de telas (elasticidad: 5%)');
            }, 2000);
            
            setTimeout(() => {
                logToConsole('> MATCHING ALGORITHM: Lafayette Slim Blazer');
                logToConsole('> RESULTADO: Talla M (98.7% confianza)', false, true);
                logToConsole('> RENDERING FINAL: Completado ✓', false, true);
                
                // Show results
                const scannerDiv = document.getElementById('scanner-interface');
                const resultsDiv = document.getElementById('results-interface');
                
                scannerDiv.classList.add('hidden');
                resultsDiv.classList.remove('hidden');
                
                // Scroll to results
                resultsDiv.scrollIntoView({ behavior: 'smooth' });
            }, 2500);
        }

        // Console Logger
        function logToConsole(message, isError = false, isSuccess = false) {
            const consoleEl = document.getElementById('neural-console');
            const logLine = document.createElement('div');
            
            if (isError) {
                logLine.className = 'text-red-400';
            } else if (isSuccess) {
                logLine.className = 'text-[#C5A46D] font-bold';
            } else {
                logLine.className = 'text-white/70';
            }
            
            logLine.textContent = message;
            consoleEl.appendChild(logLine);
            
            // Auto scroll to bottom
            consoleEl.scrollTop = consoleEl.scrollHeight;
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>"""

# ==============================================================================
# ORQUESTADOR (Generación y Despliegue)
# ==============================================================================
def create_project_structure():
    """Crea las carpetas y el archivo index.html."""
    print(f"🚀 Iniciando despliegue de {PROJECT_NAME}...")
    
    # Crear directorio principal
    if not os.path.exists(PROJECT_NAME):
        os.makedirs(PROJECT_NAME)
        print(f"📁 Directorio creado: {PROJECT_NAME}")
    
    # Crear archivo index.html
    file_path = os.path.join(PROJECT_NAME, "index.html")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"📄 Archivo generado: index.html")

def run_server():
    """Inicia un servidor HTTP simple para ver el piloto."""
    web_dir = os.path.join(os.getcwd(), PROJECT_NAME)
    os.chdir(web_dir)
    
    Handler = SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n✅ SERVIDOR ACTIVO EN: http://localhost:{PORT}")
        print("   (Presiona Ctrl+C para detener el servidor)")
        httpd.serve_forever()

def open_browser():
    """Abre el navegador automáticamente después de una breve pausa."""
    time.sleep(1.5)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    try:
        create_project_structure()
        
        # Hilo para abrir navegador
        threading.Thread(target=open_browser).start()
        
        # Ejecutar servidor (bloqueante)
        run_server()
        
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido. ¡Hasta la próxima!")
        sys.exit(0)
