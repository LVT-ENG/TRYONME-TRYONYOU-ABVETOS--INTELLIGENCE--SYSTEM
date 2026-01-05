#!/bin/bash

echo "🚀 INICIANDO CONFIGURACIÓN TOTAL DEL BACKEND (MANUS IA + GOOGLE GEMINI)..."

# 1. ACTUALIZAR DEPENDENCIAS
echo "📦 Actualizando requirements.txt..."
cat <<REQ > requirements.txt
psutil==5.9.8
numpy==1.26.4
requests==2.31.0
google-generativeai==0.8.3
REQ

pip install -r requirements.txt --quiet
echo "✅ Dependencias instaladas."

# 2. CREAR ESTRUCTURA DE DIRECTORIOS
mkdir -p core/ai_config

# 3. CREAR EL MANIFIESTO DE PROMPTS (CEREBRO JSON)
echo "🧠 Generando Manifiesto de Agentes..."
cat <<JSON > core/ai_config/moe_prompts_manifest.json
{
  "meta": {
    "version": "1.2.0",
    "architecture": "MoE (Mixture of Experts)",
    "optimization": "Google AI Studio",
    "default_language_mode": "TRILINGUAL_PARALLEL"
  },
  "agents": {
    "agent_01_pau_assistant": {
      "role": "Emotional Fashion Assistant",
      "model": "gemini-3-pro",
      "temperature": 0.7,
      "system_instruction": "You are Pau, the Emotional Fashion Assistant. Your goal is to provide empathetic, style-conscious advice based on the user's emotional state and biometric data. \n\nCORE TASK: Generate a personalized, emotionally resonant message and a final outfit recommendation (outfit_id). \n\nCONSTRAINT: NEVER suggest an outfit with a biometric_fit_score below 0.95. NEVER provide medical advice.\n\nOUTPUT FORMAT (JSON): {\"outfit_id\": \"string\", \"message_en\": \"string\", \"message_fr\": \"string\", \"message_es\": \"string\"}",
      "input_schema": ["emotion", "style_preference", "biometric_fit_score", "language"]
    },
    "agent_02_drape_aware": {
      "role": "Drape-Aware AI Expert",
      "model": "gemini-3-flash",
      "temperature": 0.2,
      "system_instruction": "You are the Drape-Aware AI Expert. Your function is to calculate the physical realism score of a virtual garment on a user's body based on millimetric biometrics and fabric properties. Output must be purely technical and numerical.\n\nCORE TASK: Calculate the final drape_score and mesh_correction_vector to achieve a Zero-Return Policy fit.\n\nCONSTRAINT: All calculations must be performed with a precision of at least 4 decimal places. Output JSON only.",
      "input_schema": ["user_biometrics_id", "garment_material_properties", "garment_mesh_id"]
    }
  }
}
JSON

# 4. CREAR EL PUENTE DE CONFIGURACIÓN
echo "bridge Generando Puente de Configuración..."
cat <<PY > core/google_ai_bridge.py
import json
import os

class MOE_Router:
    def __init__(self):
        # Ajustamos la ruta para que funcione desde la raíz del proyecto
        self.config_path = os.path.join("core", "ai_config", "moe_prompts_manifest.json")
        self.experts = self._load_experts()

    def _load_experts(self):
        try:
            with open(self.config_path, 'r') as f:
                data = json.load(f)
                return data['agents']
        except Exception as e:
            print(f"❌ Error loading experts config: {e}")
            return {}

    def get_system_instruction(self, agent_id):
        return self.experts.get(agent_id)
PY

# 5. CREAR EL EJECUTOR DE AGENTES (EL CEREBRO ACTIVO)
echo "🤖 Generando Motor de Ejecución (Agent Executor)..."
cat <<PY > core/agent_executor.py
import os
import json
import google.generativeai as genai
from core.google_ai_bridge import MOE_Router

class AgentExecutor:
    def __init__(self):
        self.router = MOE_Router()
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            print("⚠️ ERROR CRÍTICO: GOOGLE_API_KEY no encontrada en variables de entorno.")
            self.model_active = False
        else:
            genai.configure(api_key=api_key)
            self.model_active = True

    def _clean_json_response(self, text):
        return text.replace("\`\`\`json", "").replace("\`\`\`", "").strip()

    def run_expert(self, agent_id, input_data):
        if not self.model_active:
            return {"error": "API Key no configurada. Revisa tu archivo .env"}

        agent_config = self.router.get_system_instruction(agent_id)
        if not agent_config:
            return {"error": f"Agente '{agent_id}' no encontrado."}

        print(f"⚡ Ejecutando {agent_config['role']}...")

        model = genai.GenerativeModel(
            model_name=agent_config['model'],
            generation_config={"temperature": agent_config['temperature'], "response_mime_type": "application/json"},
            system_instruction=agent_config['system_instruction']
        )

        user_prompt = f"INPUT DATA: {json.dumps(input_data)}"

        try:
            response = model.generate_content(user_prompt)
            return json.loads(self._clean_json_response(response.text))
        except Exception as e:
            print(f"❌ Error en Gemini: {str(e)}")
            return {"error": str(e)}
PY

# 6. CREAR EL SERVIDOR API INTEGRADO (LO "SIGUIENTE" QUE TE IBA A OFRECER)
echo "🌐 Generando Servidor API (Master Brain v2)..."
cat <<PY > master_brain.py
import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from core.agent_executor import AgentExecutor

# Intentar cargar variables de entorno si existe un archivo .env simple
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if "=" in line and not line.startswith("#"):
                k, v = line.strip().split("=", 1)
                os.environ[k] = v

# Inicializar el Ejecutor de IA
executor = AgentExecutor()

class BrainHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*") # Permite conexión desde React
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        self._set_headers()
        self.wfile.write(json.dumps({"status": "TRYONYOU Brain Online", "ai_ready": executor.model_active}).encode())

    def do_POST(self):
        if self.path == '/api/ask-pau':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data)
                
                # Ejecutar Agente Pau
                result = executor.run_expert("agent_01_pau_assistant", data)
                
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode())
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Ruta no encontrada"}).encode())

print(f"💎 TRYONYOU SERVER LIVE: http://localhost:8080")
if not os.getenv("GOOGLE_API_KEY"):
    print("⚠️  AVISO: No se detectó GOOGLE_API_KEY. La IA no responderá.")
else:
    print("✅  IA Conectada y lista.")

HTTPServer(('', 8080), BrainHandler).serve_forever()
PY

# 7. PERMISOS Y LIMPIEZA
chmod +x master_brain.py
echo "✨ INSTALACIÓN COMPLETA. ECOSISTEMA LISTO."
echo "👉 Para iniciar: python3 master_brain.py"
