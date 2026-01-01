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
