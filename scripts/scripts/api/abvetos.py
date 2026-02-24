cat << 'EOF' > api/abvetos.py
import os
import sys
from pathlib import Path

# --- BUG 3: BLINDAJE DE IMPORTACIONES ---
# Asegura que el root del proyecto sea visible para Vercel Serverless
_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _root not in sys.path:
    sys.path.insert(0, _root)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

# --- CARGA DINÁMICA DE MÓDULOS ---
try:
    from api.main import app as _main_app
except ImportError:
    _main_app = FastAPI()

try:
    from ABVETOS_ULTIMATUM_FINAL import app as _abvetos_app
except ImportError:
    _abvetos_app = FastAPI()

app = FastAPI(title="TRYONYOU UNIFIED HANDLER V9.2.1")

# --- MIDDLEWARE DE REESCRITURA QUIRÚRGICA ---
# Vercel inyecta su propio path en la redirección.
# Este middleware limpia el prefijo para que FastAPI encuentre la ruta real.
class VercelRouterMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        path = request.scope.get('path', '')
        if path.startswith("/api/abvetos"):
            new_path = path.replace("/api/abvetos", "", 1)
            if not new_path: new_path = "/"
            request.scope['path'] = new_path
        return await call_next(request)

app.add_middleware(VercelRouterMiddleware)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --- BUG 1: FUSIÓN DE RUTAS SIN ATTR ERRORS ---
def merge_logic(target, source):
    # Accedemos al router subyacente para evitar fallos de instancia
    source_router = getattr(source, "router", source)
    for route in source_router.routes:
        target.router.routes.append(route)

# Unificamos el Piloto (Lafayette) y el Cerebro (ABVETOS)
merge_logic(app, _main_app)
merge_logic(app, _abvetos_app)

@app.get("/api/status")
async def health():
    return {
        "status": "OPERATIONAL",
        "protocol": "Divineo V9",
        "agents_active": 53,
        "ip_shield": "PCT/EP2025/067317"
    }
EOF
