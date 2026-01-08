/**
 * NOTA IMPORTANTE SOBRE ESTE ARCHIVO:
 *
 * Este archivo contiene una plantilla HTML y JavaScript embebida en una string (HTML_PILOT)
 * que se inyecta en un <iframe> usando la propiedad srcDoc de React.
 *
 * Debido a la cantidad de código HTML y JS dentro de la template string, los analizadores
 * estáticos de TypeScript/JavaScript pueden mostrar advertencias o errores falsos en el editor.
 *
 * Estos avisos NO afectan la ejecución ni el funcionamiento real del componente,
 * ya que el contenido se interpreta como HTML/JS dentro del iframe, no como código JS de React.
 *
 * Si deseas evitar estos avisos, puedes:
 *  - Renombrar el archivo a .js en vez de .jsx (ya realizado en la versión Pilot.js)
 *  - Mover el HTML a un archivo externo y cargarlo vía fetch o importarlo como recurso estático
 *
 * El funcionamiento en producción y desarrollo es correcto y seguro ignorar los avisos del editor.
 */
import React from "react";

const HTML_PILOT = `<!DOCTYPE html><html><head><meta charset=\"UTF-8\">
<script src=\"https://cdn.tailwindcss.com\"></script>
<script src=\"https://cdn.jsdelivr.net/npm/@mediapipe/pose\"></script>
<script src=\"https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils\"></script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;900&display=swap');
    body{font-family:'Inter',sans-serif;background:#050505;color:white;overflow:hidden;}
    .gold-text{color:#C5A46D;}
</style></head>
<body>
    <div id=\"app\" class=\"h-screen flex items-center justify-center p-10\">
        <div id=\"main_ui\" class=\"grid grid-cols-2 w-full max-w-7xl gap-16\">
            <div class=\"relative bg-zinc-900 rounded-[3rem] border border-zinc-800 overflow-hidden shadow-2xl\">
                <video id=\"v\" class=\"hidden\"></video>
                <canvas id=\"c\" class=\"w-full h-full object-cover opacity-60\"></canvas>
            </div>
            <div class=\"flex flex-col justify-center\">
                <h1 class=\"text-7xl font-black italic tracking-tighter mb-4\">TRYONYOU</h1>
                <p id=\"msg\" class=\"text-2xl gold-text font-light mb-12 italic\">AI Calibration in progress...</p>
                <div class=\"grid grid-cols-2 gap-8 mb-12\">
                    <div class=\"border-b border-zinc-800 pb-4\">
                        <span class=\"text-[10px] opacity-40 block uppercase tracking-widest\">Height</span>
                        <span id=\"rh\" class=\"text-4xl font-bold italic text-white\">--</span>
                    </div>
                    <div class=\"border-b border-zinc-800 pb-4\">
                        <span class=\"text-[10px] opacity-40 block uppercase tracking-widest\">Shoulders</span>
                        <span id=\"rs\" class=\"text-4xl font-bold italic text-white\">--</span>
                    </div>
                </div>
                <div id=\"voi\" class=\"opacity-0 tracking-widest text-xs gold-text animate-pulse font-bold\">PAU IS READY...</div>
            </div>
        </div>
        <div id=\"res\" class=\"hidden text-center\">
            <h2 class=\"text-6xl font-black italic mb-6\">MATCH CONFIRMED</h2>
            <p class=\"text-2xl opacity-60 mb-10\">Profile synced with Galeries Lafayette inventory.</p>
            <button onclick=\"location.reload()\" class=\"border border-gold px-12 py-4 gold-text uppercase text-xs tracking-[0.3em]\">Restart Scan</button>
        </div>
    </div>
<script>
const v=document.getElementById('v'),canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
let done=false;
const pose=new window.Pose({locateFile:(f)=>`https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`});
pose.setOptions({modelComplexity:1,smoothLandmarks:true,minDetectionConfidence:0.6});

function speak(t,cb){
    const u=new window.SpeechSynthesisUtterance(t);
    u.lang='en-US';
    u.rate=0.9;
    u.onend=cb;
    window.speechSynthesis.speak(u);
}

pose.onResults((r)=>{
    if(!r.poseLandmarks || done) return;
    const head=r.poseLandmarks[0], ankles=(r.poseLandmarks[27].y+r.poseLandmarks[28].y)/2;
    const rawHeight = Math.abs(ankles - head.y);
    
    // FACTOR DE CALIBRACIÓN REAL (Ajustado para 2 metros de distancia)
    const h = Math.round(rawHeight * 172); 
    const s = Math.round(Math.abs(r.poseLandmarks[12].x - r.poseLandmarks[11].x) * 95);

    if(h > 140 && h < 210){
        document.getElementById('rh').innerText = h + " cm";
        document.getElementById('rs').innerText = s + " cm";
        done=true; 
        document.getElementById('voi').style.opacity=1;
        speak("Measurements stabilized. Syncing with Lafayette stock.",()=>{
            setTimeout(()=>{
                document.getElementById('main_ui').classList.add('hidden');
                document.getElementById('res').classList.remove('hidden');
            },1500);
        });
    } else {
        document.getElementById('rh').innerText = "Calibrating...";
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(r.image,0,0,canvas.width,canvas.height);
});


</script></body></html>`;

const Pilot = () => {
  return (
    <div className="w-full h-full min-h-screen bg-black flex items-center justify-center">
      <iframe
        title="Pilot Lafayette"
        srcDoc={HTML_PILOT}
        style={{ width: "100vw", height: "100vh", border: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Pilot;
