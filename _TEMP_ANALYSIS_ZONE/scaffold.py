import os

# --- CONFIGURACIÓN DE PROYECTO ---
DOMAIN = "tryonyou.app"
CONTENT_FR = {
    "HERO_TITLE": "Allez-vous vraiment essayer 510 pantalons pour trouver celui qui vous va le mieux ?",
    "PAU_SNAP": "Cliquez pour le 'Chasquement' de PAU. Changez de look instantanément.",
    "TECH_CLAIM": "La Science derrière le Style : Précision biométrique millimétrée.",
    "FINAL_CTA": "TryOnYou : The Fashion Intelligence System. Créez votre avatar dès maintenant. Le fin des retours est arrivée. Vivez-le."
}

def setup_all():
    # 1. Crear Carpetas
    folders = ['api', 'src/pages', 'public/assets']
    for f in folders: os.makedirs(f, exist_ok=True)
    
    # 2. Generar requirements.txt
    with open("api/requirements.txt", "w") as f:
        f.write("fastapi\\nuvicorn\\ngoogle-generativeai\\npython-multipart")

    # 3. Generar Backend (api/index.py)
    backend = f"""
from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI()
genai.configure(api_key=os.environ.get("GOOGLE_AI_STUDIO_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

@app.get("/api/status")
def status(): return {{"status": "IA CONNECTÉ", "domain": "{DOMAIN}"}}

@app.post("/api/process-biometry")
async def process(file: UploadFile = File(...)):
    content = await file.read()
    response = model.generate_content(["Analyse biométrique", content])
    return {{"data": response.text}}
"""
    with open("api/index.py", "w") as f: f.write(backend.strip())

    # 4. Generar Frontend (src/pages/Landing.tsx)
    frontend = f"""
import React, {{ useState }} from 'react';

const Landing = () => {{
    const [look, setLook] = useState(1);
    const techImgs = ["tech1.png", "tech2.png", "tech3.png", "tech4.png", "tech5.png"];

    return (
        <div style={{{{'backgroundColor': '#0a0a0a', 'color': 'white', 'minHeight': '100vh'}}}}>
            <nav style={{{{'padding': '20px', 'display': 'flex', 'justifyContent': 'space-between'}}}}>
                <img src="/assets/logo_tryonyou.png" style={{{{'height': '50px'}}}} />
                <div style={{{{'color': '#00ff88'}}}}>● SYSTÈME IA CONNECTÉ</div>
            </nav>

            <header style={{{{'textAlign': 'center', 'padding': '40px'}}}}>
                <h1>{{CONTENT_FR['HERO_TITLE']}}</h1>
                <img src="/assets/montana_pantalones.png" style={{{{'width': '70%'}}}} />
            </header>

            <main style={{{{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '40px'}}}}>
                <div onClick={{() => setLook((look % 3) + 1)}} style={{{{'cursor': 'pointer', 'textAlign': 'center'}}}}>
                    <img src="/assets/pau_blanco_chasquido.png" style={{{{'width': '180px'}}}} />
                    <p>{{CONTENT_FR['PAU_SNAP']}}</p>
                </div>
                <div style={{{{'border': '4px solid #c5a059', 'borderRadius': '15px', 'overflow': 'hidden'}}}}>
                    <img src={{`/assets/look${{look}}.png`}} style={{{{'height': '550px'}}}} />
                </div>
            </main>

            <section style={{{{'padding': '50px'}}}}>
                <h2 style={{{{'textAlign': 'center'}}}}>{{CONTENT_FR['TECH_CLAIM']}}</h2>
                <div style={{{{'display': 'flex', 'gap': '10px'}}}}>
                    {{techImgs.map(img => <img key={{img}} src={{`/assets/${{img}}`}} style={{{{'width': '19%'}}}} />)}}
                </div>
            </section>

            <footer style={{{{'textAlign': 'center', 'padding': '60px', 'background': '#111'}}}}>
                <h2>{{CONTENT_FR['FINAL_CTA']}}</h2>
                <button style={{{{'background': '#c5a059', 'padding': '20px', 'fontWeight': 'bold'}}}}>CRÉER MON AVATAR</button>
            </footer>
        </div>
    );
}};
export default Landing;
"""
    with open("src/pages/Landing.tsx", "w") as f: f.write(frontend.strip())
    print(f"🚀 JULES: Todo listo para Tryonyou.app")

if __name__ == "__main__":
    setup_all()
