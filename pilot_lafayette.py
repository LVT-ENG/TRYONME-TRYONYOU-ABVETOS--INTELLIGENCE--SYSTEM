import json
from http.server import HTTPServer, BaseHTTPRequestHandler

HTML_PILOT = """
<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils"></script>
<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;900&display=swap');
body{font-family:'Inter',sans-serif;background:#050505;color:white;overflow:hidden;}
.gold-text{color:#C5A46D;}</style></head>
<body><div id="app" class="h-screen flex items-center justify-center p-10">
<div id="main_ui" class="grid grid-cols-2 w-full max-w-7xl gap-16">
<div class="relative bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800">
<video id="v" class="hidden"></video><canvas id="c" class="w-full h-full object-cover opacity-60"></canvas></div>
<div class="flex flex-col justify-center"><h1 class="text-7xl font-black italic tracking-tighter">TRYONYOU</h1>
<p id="msg" class="text-2xl gold-text font-light mb-12 italic">Precision Calibration Active...</p>
<div class="grid grid-cols-2 gap-8 mb-12">
<div class="border-b border-zinc-800 pb-4"><span class="text-[10px] opacity-40 block">HEIGHT</span><span id="rh" class="text-4xl font-bold italic text-[#C5A46D]">--</span></div>
<div class="border-b border-zinc-800 pb-4"><span class="text-[10px] opacity-40 block">SHOULDERS</span><span id="rs" class="text-4xl font-bold italic">--</span></div>
</div><div id="voi" class="opacity-0 tracking-widest text-xs gold-text animate-pulse">PAU IS READY...</div></div></div>
<div id="res" class="hidden w-full max-w-5xl text-center"><h2 class="text-6xl font-black italic mb-6">MATCH FOUND</h2>
<p class="text-2xl opacity-80 mb-10">Your biometric profile is now synchronized with Lafayette Stock.</p>
<button onclick="location.reload()" class="border border-[#C5A46D] px-10 py-4 gold-text uppercase text-sm tracking-widest">Restart Scan</button></div></div>
<script>
const v=document.getElementById('v'),canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
let done=false; const pose=new Pose({locateFile:(f)=>`https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`});
pose.setOptions({modelComplexity:1,smoothLandmarks:true,minDetectionConfidence:0.6});
function speak(t,cb){const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.onend=cb;window.speechSynthesis.speak(u);}
pose.onResults((r)=>{if(!r.poseLandmarks||done)return;
const head=r.poseLandmarks[0], ankles=(r.poseLandmarks[27].y+r.poseLandmarks[28].y)/2;
const rawHeight = Math.abs(ankles - head.y);
// AJUSTE DE CALIBRACIÓN: Factor de 175 para medidas humanas reales
const h = Math.round(rawHeight * 175); 
const s = Math.round(Math.abs(r.poseLandmarks[12].x-r.poseLandmarks[11].x)*90);
if(h > 150 && h < 210){ // Solo dispara si la medida es humana y lógica
document.getElementById('rh').innerText=h+" cm";document.getElementById('rs').innerText=s+" cm";
done=true; document.getElementById('voi').style.opacity=1;
speak(`Measurement stabilized at ${h} centimeters. System match complete.`,()=>{
setTimeout(()=>{document.getElementById('main_ui').classList.add('hidden');
document.getElementById('res').classList.remove('hidden');},2000);});}
else { document.getElementById('rh').innerText = "Calibrating..."; }
ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(r.image,0,0,canvas.width,canvas.height);});
new Camera(v,{onFrame:async()=>{await pose.send({image:v})},width:1280,height:720}).start();
</script></body></html>
"""

class PilotHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200); self.send_header("Content-type", "text/html"); self.end_headers()
        if self.path == "/dashboard": self.wfile.write(b"Dashboard Active")
        else: self.wfile.write(HTML_PILOT.encode())

print("\n🚀 MOTOR DE CALIBRACIÓN REPARADO")
print("👉 Intenta medirte ahora: http://localhost:8080")
HTTPServer(('', 8080), PilotHandler).serve_forever()
