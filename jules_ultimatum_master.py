import os
import shutil
import json
from pathlib import Path

# --- CONFIGURACIÓN MAESTRA DEL PROTOCOLO ULTIMATUM V7 ---
CONFIG = {
    "PROJECT_NAME": "TRYONYOU-ABVETOS-ULTIMATUM",
    "TARGET_DIRS": [
        "client/public/assets/catalog",
        "client/public/assets/branding",
        "client/public/assets/ui",
        "client/public/docs/investor",
        "client/public/docs/patent",
        "client/public/docs/admin",
        "client/src/modules/textileComparator",
        "backend"
    ],
    # Mapeo de Assets "Divineo" (UUIDs -> Nombres Semánticos) [Source 3179, 3180, 3181, 3182]
    "ASSET_MAP": {
        # Catálogo Lafayette
        "41C07010": {"name": "red_dress_minimal.png", "dest": "client/public/assets/catalog/"},
        "8762992B": {"name": "burberry_trench.png", "dest": "client/public/assets/catalog/"},
        "8DA257D1": {"name": "red_dress_fur.png", "dest": "client/public/assets/catalog/"},
        "952B0855": {"name": "black_gown_avant.png", "dest": "client/public/assets/catalog/"},
        "CF3F64EF": {"name": "pink_tweed_suit.png", "dest": "client/public/assets/catalog/"},
        "A41D2189": {"name": "wardrobe_grid.jpg", "dest": "client/public/assets/catalog/"},
        
        # Branding & Pau
        "IMG_6206": {"name": "pau_tuxedo_agent.png", "dest": "client/public/assets/branding/"},
        "pau_blanco_chasquido": {"name": "pau_white_celebration.png", "dest": "client/public/assets/branding/"},
        "IMG_6205": {"name": "logo_peacock_silver.png", "dest": "client/public/assets/branding/"},
        "logo_tryonyou": {"name": "logo_text_clean.png", "dest": "client/public/assets/branding/"},
        
        # UI & Contexto
        "IMG_6168": {"name": "lafayette_hero_banner.png", "dest": "client/public/assets/ui/"},
        "IMG_6174": {"name": "future_imprint_hero.png", "dest": "client/public/assets/ui/"},
        "IMG_6155": {"name": "biometric_scan_ui.png", "dest": "client/public/assets/ui/"},
        "wardrobe-bg": {"name": "wardrobe_background.jpg", "dest": "client/public/assets/ui/"},
        
        # Documentación Legal y Venta
        "TRYONYOU_Investor_Dossier": {"name": "investor_dossier_2025.pdf", "dest": "client/public/docs/investor/"},
        "TryOnYou_Presentation_Commerciale": {"name": "commercial_proposal.pdf", "dest": "client/public/docs/investor/"},
        "PATENTE_TRYONYOU": {"name": "consolidated_patent_PCT-EP2025-067317.pdf", "dest": "client/public/docs/patent/"},
        "01_CoverEmail_Hub71": {"name": "hub71_application.pdf", "dest": "client/public/docs/admin/"}
    },
    # Credenciales Críticas [Source 3075]
    "ENV_VARS": {
        "VITE_GOOGLE_API_KEY": "AIzaSyBuKZh-SJtXOi4lHE3bA_K437xcKL0a9RM",
        "VITE_VERCEL_TOKEN": "PdIYWprsCNlI4Hyg8JGxH9kz",
        "PORKBUN_API_KEY": "pk1_a9500f30e15d4e48cde89418d500",
        "VITE_PILOT_MODE": "LAFAYETTE_ACTIVE",
        "VITE_ENVIRONMENT": "production"
    }
}

def setup_structure():
    """Crea la estructura de carpetas necesaria para Vite SPA."""
    print(f"🏗️  Inicializando estructura para {CONFIG['PROJECT_NAME']}...")
    for directory in CONFIG['TARGET_DIRS']:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"   ✅ Creado: {directory}")

def organize_assets(source_dir="."):
    """Busca y mueve los archivos UUID a su ubicación semántica."""
    print("\n🎨 Ejecutando 'Operación Recolección Maestra' de Assets...")
    source_path = Path(source_dir)
    moved_count = 0
    
    # Buscar en el directorio actual y subdirectorios (ej. Downloads)
    for file_path in source_path.rglob("*"):
        if file_path.is_file():
            # Comprobar si el archivo coincide con alguna clave del mapa
            for key, info in CONFIG["ASSET_MAP"].items():
                if key in file_path.name:
                    dest_dir = Path(info["dest"])
                    dest_file = dest_dir / info["name"]
                    
                    try:
                        shutil.copy2(file_path, dest_file)
                        print(f"   ✨ Mapeado: {file_path.name[:15]}... -> {info['dest']}{info['name']}")
                        moved_count += 1
                    except Exception as e:
                        print(f"   ❌ Error moviendo {file_path.name}: {e}")
                    break
    print(f"   📊 Total Assets procesados: {moved_count}")

def generate_env_file():
    """Genera el archivo .env con las llaves maestras."""
    print("\n🔐 Inyectando Credenciales de Seguridad...")
    env_content = "# TRYONYOU PROTOCOL ULTIMATUM V7 - SECRETS\n"
    for key, value in CONFIG["ENV_VARS"].items():
        env_content += f"{key}={value}\n"
    
    with open(".env", "w") as f:
        f.write(env_content)
    print("   ✅ Archivo .env generado correctamente.")

def generate_backend_stub():
    """Genera el backend mínimo para el healthcheck del piloto [Source 3020]."""
    print("\n🐍 Generando Backend Stub (FastAPI)...")
    content = """
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="TryOnYou Pilot API", version="7.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def health_check():
    return {"status": "active", "mode": "LAFAYETTE_PILOT", "version": "v7"}

@app.post("/api/biometric/scan")
def mock_scan():
    return {"match_id": "GL-99283", "confidence": 0.98}
"""
    with open("backend/main.py", "w") as f:
        f.write(content)
    print("   ✅ backend/main.py creado.")

def main():
    print("🚀 INICIANDO PROTOCOLO JULES (Automated Deployment)...")
    setup_structure()
    organize_assets() # Asume que se ejecuta donde están los archivos descargados o en la raíz
    generate_env_file()
    generate_backend_stub()
    print("\n🏁 EJECUCIÓN COMPLETADA. El sistema está listo para 'npm run build'.")
    print("👉 Siguiente paso: Ejecutar './TRYONYOU_SUPERCOMMIT_MAX.sh' para desplegar.")

if __name__ == "__main__":
    main()
