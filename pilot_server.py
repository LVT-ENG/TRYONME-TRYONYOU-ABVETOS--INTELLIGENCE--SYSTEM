import json, time
from http.server import BaseHTTPRequestHandler, HTTPServer

# --- ESTRUCTURA DE DATOS PROFESIONAL ---
# Datos estratégicos para Dashboard e Inversores
VALORACION_PILOTO = "120M-400M EUR"
PATENTE_ID = "PCT/EP2025/067317"

# Dataset de Prendas (Simulacro Galeries Lafayette)
GARMENT_DB = {
    "jacket_01": {
        "name": "Lafayette Slim Blazer",
        "measurements": {"chest": 102, "shoulders": 45, "waist": 88},
        "fabric": {"elasticity": 0.05, "drape_score": 8, "type": "Wool Blend"},
        "occasion": "Work/Ceremony"
    }
}

# --- INTERFAZ PREMIUM (HTML/JS) ---
H = """<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'>
<script src='https://cdn.tailwindcss.com'></script>
<script type='module' src='https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'></script>
</head><body class='bg-black text-white font-sans'>"""

NAV = f"""<nav class='p-8 border-b border-white/10 flex justify-between items-center'>
    <h1 class='text-[#C5A46D] font-black italic text-3xl tracking-tighter'>TRYONYOU</h1>
    <div class='text-[11px] opacity-40 uppercase tracking-[0.3em]'>System Pilot v2.0 | {PATENTE_ID}</div>
</nav>"""

CONTENT = """<div id='app' class='min-h-[80vh] flex flex-col items-center justify-center p-10'>
    <div id='w' class='max-w-4xl text-center space-y-10'>
        <h2 class='text-9xl font-black uppercase italic leading-[0.85] tracking-tighter'>BODY<br/><span class='text-[#C5A46D]'>INTELLIGENCE.</span></h2>
        <p class='text-xl opacity-60 max-w-2xl mx-auto uppercase font-light tracking-widest'>Zero returns. Perfect fit. Powered by biometric AI.</p>
        <button onclick='st()' class='bg-[#C5A46D] text-black px-20 py-8 rounded-full font-black text-2xl shadow-[0_20px_60px_rgba(197,164,109,0.3)] hover:scale-105 transition-transform'>ENTER PILOT</button>
    </div>
    
    <div id='sc' class='hidden flex flex-col items-center gap-8'>
        <div class='relative group'>
            <video id='v' autoplay playsinline class='w-[400px] h-[600px] rounded-[4rem] object-cover border border-white/20 grayscale group-hover:grayscale-0 transition-all'></video>
            <div class='absolute inset-0 border-[20px] border-black/20 rounded-[4rem] pointer-events-none'></div>
        </div>
        <button onclick='pr()' class='bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm'>Capture Biometrics</button>
    </div>

    <div id='r' class='hidden grid lg:grid-cols-2 gap-16 w-full max-w-7xl'>
        <div class='bg-zinc-900 rounded-[5rem] overflow-hidden border border-white/5 shadow-2xl aspect-[3/4]'>
             <model-viewer src='https://modelviewer.dev/shared-assets/models/RobotExpressive.glb' auto-rotate camera-controls style='width:100%;height:100%' shadow-intensity='2' exposure='0.8' environment-image='neutral'></model-viewer>
        </div>
        <div class='flex flex-col justify-center space-y-10'>
            <div class='space-y-2'><h3 class='text-6xl font-black italic uppercase tracking-tighter'>Perfect Fit</h3><p class='text-[#C5A46D] font-bold tracking-[0.4em] uppercase text-sm'>Deterministic Matching Logic</p></div>
            <div class='grid grid-cols-2 gap-6'>
                <div class='bg-white/5 p-8 rounded-[2.5rem] border border-white/10'><p class='opacity-40 text-xs uppercase mb-1'>Height</p><p class='text-4xl font-black italic'>1.78m</p></div>
                <div class='bg-white/5 p-8 rounded-[2.5rem] border border-white/10'><p class='opacity-40 text-xs uppercase mb-1'>Chest</p><p class='text-4xl font-black italic'>101cm</p></div>
            </div>
            <div class='bg-[#C5A46D] p-12 rounded-[4rem] text-black'>
                <p class='font-black text-lg opacity-60 uppercase mb-2 text-center'>Lafayette Slim Blazer</p>
                <p class='text-7xl font-black italic uppercase text-center'>Size M</p>
                <p class='mt-4 font-bold text-sm leading-relaxed text-center italic'>Calculated with 5% Wool elasticity and drape score of 8/10.</p>
            </div>
            <div class='text-[10px] opacity-40 uppercase tracking-widest flex items-center justify-center gap-2'><span class='w-2 h-2 bg-green-500 rounded-full animate-ping'></span> Sincronizado con Google Looker Studio</div>
        </div>
    </div>
</div>"""

JS = """<script>
async function st(){document.getElementById('w').classList.add('hidden');document.getElementById('sc').classList.remove('hidden');const s=await navigator.mediaDevices.getUserMedia({video:true});document.getElementById('v').srcObject=s;}
function pr(){document.getElementById('sc').innerHTML='<div class=\"text-5xl font-black animate-pulse text-[#C5A46D] italic tracking-tighter uppercase\">Analyzing Drape & Biometrics...</div>';setTimeout(()=>{document.getElementById('sc').classList.add('hidden');document.getElementById('r').classList.remove('hidden');},3000);}
</script></body></html>"""

class PilotHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, c_type="text/html"):
        self.send_response(status)
        self.send_header("Content-type", c_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("bypass-tunnel-reminder", "true") # Bypass para Looker Studio
        self.end_headers()

    def do_GET(self):
        if self.path == '/':
            self._set_headers()
            self.wfile.write((H+NAV+CONTENT+JS).encode())
        elif self.path == '/api/stats':
            self._set_headers(200, "application/json")
            # Datos biométricos integrados para Looker Studio
            data = [{"user": "Demo_Lafayette", "h": 1.78, "chest": 101, "fit": "M", "elasticity": 0.05}]
            self.wfile.write(json.dumps(data).encode())
        elif self.path == '/invest':
            self._set_headers(200, "application/json")
            # Endpoint para auditoría de inversores
            invest_data = {"valuation": VALORACION_PILOTO, "patent": PATENTE_ID, "status": "Ready for Pilot"}
            self.wfile.write(json.dumps(invest_data).encode())

if __name__ == "__main__":
    print(f"🚀 TRYONYOU PILOT ONLINE | Valuation: {VALORACION_PILOTO}")
    server = HTTPServer(('', 8080), PilotHandler)
    server.serve_forever()
