import os

def create_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"✅ Generado: {path}")

def main():
    print("🚀 Jules: Iniciando reconstrucción del ecosistema TryOnYou...")

    # 1. CONFIGURACIÓN VERCEL (CRÍTICO)
    create_file("vercel.json", """
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
""")

    # 2. CONFIGURACIÓN VITE & DEPENDENCIAS
    create_file("vite.config.ts", """
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
""")

    create_file("package.json", """
{
  "name": "tryonyou-pilot",
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "tsc && vite build", "preview": "vite preview" },
  "dependencies": { "react": "^18.2.0", "react-dom": "^18.2.0", "framer-motion": "^10.16.4" },
  "devDependencies": { "@types/react": "^18.2.15", "@types/react-dom": "^18.2.7", "@vitejs/plugin-react": "^4.0.3", "autoprefixer": "^10.4.19", "postcss": "^8.4.38", "tailwindcss": "^3.4.3", "typescript": "^5.0.2", "vite": "^4.4.5" }
}
""")

    # 3. BACKEND (IA / FASTAPI)
    create_file("api/requirements.txt", "fastapi\nuvicorn\ngoogle-generativeai\npython-multipart")
    
    create_file("api/index.py", """
from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI()
api_key = os.environ.get("GOOGLE_AI_STUDIO_KEY")
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-pro')

@app.get("/api/status")
def status(): return {"status": "IA CONNECTÉ", "system": "TryOnYou Pilot v2.5"}

@app.post("/api/process")
async def process(file: UploadFile = File(...)):
    if not api_key: return {"error": "Falta API Key en Vercel"}
    content = await file.read()
    try:
        response = model.generate_content(["Analyse biométrique pour vêtements.", content])
        return {"data": response.text}
    except Exception as e:
        return {"error": str(e)}
""")

    # 4. FRONTEND (LANDING PAGE)
    create_file("index.html", """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TryOnYou - Pilot Lafayette</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""")

    create_file("src/main.tsx", """
import React from 'react'; import ReactDOM from 'react-dom/client'; import App from './App.tsx'; import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
""")

    create_file("src/index.css", """
@tailwind base; @tailwind components; @tailwind utilities;
:root { --gold: #c5a059; --dark: #0a0a0a; }
body { background-color: var(--dark); color: white; }
.pulse-dot { height: 10px; width: 10px; background-color: #00ff88; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
""")

    create_file("src/App.tsx", """
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
    const [look, setLook] = useState(1);
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c5a059] selection:text-black">
            <nav className="p-6 border-b border-white/10 flex justify-between items-center">
                <div className="text-2xl font-bold tracking-tighter">TRYONYOU</div>
                <div className="text-[#00ff88] text-xs font-mono flex items-center gap-2">
                    <span className="pulse-dot"></span> SYSTEM ONLINE
                </div>
            </nav>
            <main className="flex flex-col items-center justify-center p-10 text-center">
                <header className="mb-12 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">La fin des retours est arrivée.</h1>
                    <p className="text-gray-400 text-lg">Système d'Intelligence de Mode pour Lafayette.</p>
                </header>
                
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div 
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setLook((look % 3) + 1)}
                        className="cursor-pointer group relative"
                    >
                        <div className="absolute inset-0 bg-[#c5a059]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src="/assets/pau_blanco_chasquido.png" className="w-64 relative z-10" alt="PAU" />
                        <p className="mt-4 text-[#c5a059] font-bold text-sm tracking-widest uppercase">Cliquez pour le "Snap"</p>
                    </motion.div>

                    <div className="relative border-4 border-[#c5a059] rounded-2xl overflow-hidden h-[500px] w-[350px] shadow-[0_0_40px_rgba(197,160,89,0.3)]">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={look}
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0 }}
                                src={`/assets/look${look}.png`}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
""")

    # 5. CREAR CARPETA ASSETS (VACÍA PERO NECESARIA)
    if not os.path.exists("public/assets"):
        os.makedirs("public/assets")

    print("\n✅ ESTRUCTURA CREADA.")
    print("⚠️  IMPORTANTE: Mueve tus imágenes (logo, pau, looks) a la carpeta 'public/assets' antes de desplegar.")

if __name__ == "__main__":
    main()
