import os
import shutil
import zipfile
from pathlib import Path

# --- RUTAS DINÁMICAS (AJUSTADAS A TU MAC) ---
ICLOUD_INBOX = Path(os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX"))
DRIVE_INBOX = Path(os.path.expanduser("~/Downloads/Proyectos_Ruben"))
PROJECT_ROOT = Path(os.getcwd())

# Mapeo de Destinos
TARGETS = {
    ".tsx": PROJECT_ROOT / "src/pages",
    ".ts": PROJECT_ROOT / "src/lib",
    ".py": PROJECT_ROOT / "core",
    ".json": PROJECT_ROOT / "src/data"
}

def clean_and_extract():
    print(f"🚀 Jules está en la escena. Iniciando consolidación...")
    
    # Crear carpetas si no existen
    for folder in TARGETS.values():
        folder.mkdir(parents=True, exist_ok=True)

    sources = [ICLOUD_INBOX, DRIVE_INBOX]
    
    for source in sources:
        if not source.exists():
            print(f"⚠️  Saltando {source}: No encontrado.")
            continue

        print(f"📂 Escaneando: {source}")
        
        for item in source.iterdir():
            # 1. Descomprimir si es un ZIP
            if item.suffix == ".zip":
                print(f"📦 Descomprimiendo {item.name}...")
                with zipfile.ZipFile(item, 'r') as zip_ref:
                    temp_extract = source / "temp_extract"
                    zip_ref.extractall(temp_extract)
                    process_files(temp_extract)
                    shutil.rmtree(temp_extract)
                # Opcional: Mover el zip procesado a una carpeta de 'Hecho'
                # item.unlink() 

            # 2. Procesar si es un archivo suelto
            else:
                process_single_file(item)

    print("\n✅ CONSOLIDACIÓN COMPLETADA. Código de valor integrado en Divineo v7.")

def process_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            process_single_file(Path(root) / file)

def process_single_file(file_path):
    if file_path.suffix in TARGETS:
        dest = TARGETS[file_path.suffix] / file_path.name
        # Solo copiar si es código "value" (evitar archivos de sistema)
        if not file_path.name.startswith('.'):
            shutil.copy2(file_path, dest)
            print(f"   💎 {file_path.name} -> {dest.relative_to(PROJECT_ROOT)}")

if __name__ == "__main__":
    try:
        clean_and_extract()
    except Exception as e:
        print(f"❌ Error en la cirugía de Jules: {e}")
