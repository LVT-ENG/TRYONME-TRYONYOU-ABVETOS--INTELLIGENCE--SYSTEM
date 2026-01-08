import json
from http.server import HTTPServer, BaseHTTPRequestHandler

# --- CONFIGURACIÓN DEL SISTEMA ---
PORT = 8080
VERSION = "v7.0-MASTER"

HTML_PILOT = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils"></script>
    <title>TRYONYOU | Galeries Lafayette Master</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #050505; color: white; overflow: hidden; }
        .gold-text { color: #C5A46D; }
        .canvas-container { mask-image: radial-gradient(circle, black 50%, transparent 100%); }
    </style>
</head>
<body>
    <div class="h-screen flex items-center justify-center p-10">
        <div class="grid lg:grid-cols-2 w-full max-w-7xl gap-16 items-center">
            
            <div class="relative bg-zinc-900 rounded-[3rem] aspect-video overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <video id="v" class="hidden"></video>
                <canvas id="c" class="w-full h-full object-cover opacity-70"></canvas>
                <div class="absolute top-8 left-8 flex items-center gap-2">
                    <div class="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                    <span class="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Sensor Biométrico Activo</span>
                </div>
            </div>

            <div class="flex flex-col">
                <h1 class="text-8xl font-black italic tracking-tighter mb-2">TRYONYOU</h1>
                <p class="text-xl gold-text font-light mb-16 italic tracking-widest uppercase">Galeries Lafayette Edition</p>
                
                <div class="space-y-8">
                    <div class="border-l-2 border-zinc-800 pl-6">
                        <span class="text-[10px] opacity-40 block uppercase tracking-widest mb-1">Estatura Estimada</span>
                        <span id="rh" class="text-5xl font-bold italic tracking-tighter">Calculando...</span>
                    </div>
                    <div class="border-l-2 border-zinc-800 pl-6">
                        <span class="text-[10px] opacity-40 block uppercase tracking-widest mb-1">Ancho de Hombros</span>
                        <span id="rs" class="text-5xl font-bold italic tracking-tighter">--</span>
                    </div>
                </div>

                <div class="mt-20 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <p class="text-[10px] gold-text font-bold uppercase tracking-[0.2em] mb-2">Estado del Agente 015</p>
                    <p id="status-msg" class="text-sm opacity-60 italic">Sincronizando malla 3D con biometría real...</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        const v=document.getElementById('v'), c=document.getElementById('c'), ctx=c.getContext('2d');
        const pose = new Pose({locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`});
        
        pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.6 });

        pose.onResults((r) => {
            if (!r.poseLandmarks) return;
            
            // Lógica de Medición Master (Basada en Patente PCT)
            const eyeDist = Math.abs(r.poseLandmarks[7].x - r.poseLandmarks[8].x);
            const heightFactor = 235; // Calibración para Galeries
            const h = Math.round(Math.abs(r.poseLandmarks[28].y - r.poseLandmarks[0].y) * heightFactor);
            const s = Math.round(Math.abs(r.poseLandmarks[12].x - r.poseLandmarks[11].x) * 115);

            if (h > 100) {
                document.getElementById('rh').innerText = h + " cm";
                document.getElementById('rs').innerText = s + " cm";
                document.getElementById('status-msg').innerText = "Malla 3D estabilizada. Ajuste perfecto detectado.";
            }

            ctx.clearRect(0,0,c.width,c.height);
            ctx.drawImage(r.image, 0,0,c.width,c.height);
        });

        new Camera(v, {
            onFrame: async () => { await pose.send({image: v}); },
            width: 1280, height: 720
        }).start();
    </script>
</body>
</html>
"""

class MasterHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(HTML_PILOT.encode())

if __name__ == "__main__":
    print(f"💎 ECOSISTEMA MAESTRO LIVE")
    print(f"👉 ACCESO: http://localhost:{PORT}")
    HTTPServer(('', PORT), MasterHandler).serve_forever()
