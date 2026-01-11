from http.server import BaseHTTPRequestHandler
import json
import os
import sys

# Ensure the root directory is in sys.path so 'core' can be imported
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from core.agent_executor import AgentExecutor

# Inicializar el Ejecutor de IA de manera global para que se reutilice en las invocaciones serverless
# Nota: En un entorno serverless real, esto se ejecutaría en cada arranque en frío.
executor = AgentExecutor()

class handler(BaseHTTPRequestHandler):
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
        # En Vercel, la ruta puede venir completa o relativa dependiendo de cómo se invocó
        # Para simplificar, revisamos si contiene el endpoint esperado
        if '/api/ask-pau' in self.path or self.path == '/api/index.py': # Fallback si el rewrite apunta aquí por defecto
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = self.rfile.read(content_length)
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
            self.wfile.write(json.dumps({"error": f"Ruta no encontrada: {self.path}"}).encode())
