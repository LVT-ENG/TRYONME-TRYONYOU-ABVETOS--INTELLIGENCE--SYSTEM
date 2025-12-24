import os

def create_file(path, content):
    # Asegura que el directorio exista
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    
    # Escribe el archivo
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"✅ Creado: {path}")

def main():
    print("🚀 Iniciando generación del ecosistema TryOnYou...")

    # ==========================================
    # 1. ARCHIVOS DE CONFIGURACIÓN (CRÍTICOS)
    # ==========================================
    
    # vercel.json (Para conectar Python y React en Vercel)
    create_file("vercel.json", """
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
""")

    # vite.config.ts (Motor de construcción)
    create_file("vite.config.ts", """
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
""")

    # package.json (Dependencias e instrucciones)
    create_file("package.json", """
{
  "name": "tryonyou-pilot",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
""")

    # tailwind.config.js (Estilos)
    create_file("tailwind.config.js", """
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        gold: '#c5a059',
      },
    },
  },
  plugins: [],
}
""")

    # postcss.config.js
    create_file("postcss.config.js", """
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
""")

    # index.html (Entrada principal - FALTABA ANTES)
    create_file("index.html", """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/logo_tryonyou.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TryOnYou - Pilot Lafayette</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""")

    # ==========================================
    # 2. BACKEND (PYTHON / IA)
    # ==========================================

    # api/requirements.txt
    create_file("api/requirements.txt", """
fastapi
uvicorn
google-generativeai
python-multipart
""")

    # api/index.py (Cerebro IA)
    create_file("api/index.py", """
from fastapi import FastAPI, UploadFile, File
import google.generativeai as genai
import os

app = FastAPI()

# Configuración segura de la API Key
api_key = os.environ.get("GOOGLE_AI_STUDIO_KEY")
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-pro')

@app.get("/api/status")
def status(): 
    return {"status": "IA CONNECTÉ", "domain": "tryonyou.app"}

@app.post("/api/process")
async def process_biometry(file: UploadFile = File(...)):
    if not api_key:
        return {"error": "API Key no configurada en Vercel"}
        
    content = await file.read()
    # Simulación de la lógica de análisis biométrico real
    try:
        response = model.generate_content(["Analyse cette image pour essai virtuel de vêtements. Return JSON.", content])
        return {"data": response.text}
    except Exception as e:
        return {"error": str(e)}
""")

    # ==========================================
    # 3. FRONTEND (REACT)
    # ==========================================

    # src/main.tsx
    create_file("src/main.tsx", """
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""")

    # src/App.tsx
    create_file("src/App.tsx", """
import Landing from './pages/Landing';

function App() {
  return (
    <Landing />
  );
}

export default App;
""")

    # src/index.css
    create_file("src/index.css", """
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --gold: #c5a059;
  --dark: #0a0a0a;
}

body {
  margin: 0;
  background-color: var(--dark);
  color: white;
}

.pulse-dot {
  height: 12px; width: 12px;
  background-color: #00ff88;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 10px #00ff88;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.7; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
}

.mirror-frame { 
    border: 4px solid var(--gold); 
    border-radius: 20px; 
    overflow: hidden; 
    box-shadow: 0 0 30px rgba(197, 160, 89, 0.4); 
}
""")

    # src/pages/Landing.tsx (LA JOYA DE LA CORONA)
    create_file("src/pages/Landing.tsx", """
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = () => {
    const [look, setLook] = useState(1);
    
    return (
        <div className="bg-dark text-white min-h-screen font-sans">
            <nav className="p-5 flex justify-between items-center border-b border-gray-800">
                <img src="/assets/logo_tryonyou.png" className="h-11" alt="TryOnYou Logo" />
                <div className="text-green-400 text-sm flex items-center">
                    <span className="pulse-dot mr-2"></span> SYSTÈME IA CONNECTÉ
                </div>
            </nav>

            <header className="text-center py-16 px-5">
                <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
                    Allez-vous vraiment essayer 510 pantalons pour trouver celui qui vous va le mieux ?
                </h1>
                <p className="text-xl mt-6 text-gray-400">Le futur du fitting millimétré est ici.</p>
                <img src="/assets/montana_pantalones.png" className="w-3/4 md:w-1/2 mx-auto mt-10 rounded-xl opacity-80" alt="Montana Collection" />
            </header>

            <main className="flex flex-col md:flex-row justify-center items-center gap-16 py-12 px-5">
                {/* PAU - El Activador */}
                <motion.div 
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setLook((look % 3) + 1)} 
                    className="cursor-pointer text-center group"
                >
                    <img src="/assets/pau_blanco_chasquido.png" className="w-48 mx-auto drop-shadow-2xl" alt="PAU Assistant" />
                    <p className="text-gold font-bold mt-5 tracking-widest uppercase text-sm group-hover:text-white transition-colors">
                        Cliquez pour le "Chasquement"
                    </p>
                </motion.div>

                {/* Espejo Mágico */}
                <div className="mirror-frame relative w-full max-w-md h-[550px] bg-black">
                    <AnimatePresence mode="wait">
                        <motion.img 
                            key={look}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            src={`/assets/look${look}.png`}
                            className="w-full h-full object-cover block"
                            alt={`Virtual Look ${look}`}
                        />
                    </AnimatePresence>
                    
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                            Biometría Activa: Look {look}
                        </span>
                    </div>
                </div>
            </main>

            <section className="py-12 border-t border-gray-800">
                <h2 className="text-center text-gray-500 mb-8 uppercase tracking-widest text-sm">Validación Técnica</h2>
                <div className="flex justify-center gap-4 flex-wrap px-4">
                     {/* Marcadores de posición para las capturas técnicas */}
                    {[1,2,3,4,5].map(n => (
                        <div key={n} className="w-24 h-16 border border-gray-700 rounded bg-gray-900 flex items-center justify-center text-xs text-gray-600">
                            System {n}
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-24 bg-zinc-900 mt-20">
                <h2 className="text-gold text-2xl font-bold">TryOnYou : The Fashion Intelligence System</h2>
                <p className="max-w-xl mx-auto mt-4 text-gray-400">Le fin des retours est arrivée. Vivez-le.</p>
                <button className="bg-gold text-black px-12 py-5 font-black rounded-sm mt-8 hover:bg-white transition-colors uppercase tracking-wider">
                    CRÉER MON AVATAR LAFAYETTE
                </button>
            </footer>
        </div>
    );
};
export default Landing;
""")

    # DEPLOYMENT_SUMMARY.md
    create_file("DEPLOYMENT_SUMMARY.md", """
# 🏁 Resumen de Despliegue - TryOnYou Pilot

- **Backend**: FastAPI configurado en `/api/index.py` (Req: `google-generativeai`).
- **Frontend**: React + Vite + Tailwind (Estética de Lujo).
- **IA**: Gemini 1.5 Pro conectado.
- **Configuración Vercel**: `vercel.json` incluido para reescritura de rutas.

## Pasos finales manuales requeridos:
1. Mover imágenes a `public/assets/`.
2. Ejecutar `npm install`.
3. Ejecutar `vercel --prod`.
""")

    # Crear carpeta de assets vacía para evitar errores
    if not os.path.exists("public/assets"):
        os.makedirs("public/assets")

    print("\n✅ ¡GENERACIÓN COMPLETADA!")
    print("===================================================")
    print("⚠️  IMPORTANTE: PASO FINAL MANUAL")
    print("El script ha creado toda la estructura de código, PERO...")
    print("TIENES QUE MOVER TUS IMÁGENES A LA CARPETA: public/assets/")
    print("Las imágenes necesarias son:")
    print("  - logo_tryonyou.png")
    print("  - pau_blanco_chasquido.png")
    print("  - montana_pantalones.png")
    print("  - look1.png")
    print("  - look2.png")
    print("  - look3.png")
    print("===================================================")

if __name__ == "__main__":
    main()
