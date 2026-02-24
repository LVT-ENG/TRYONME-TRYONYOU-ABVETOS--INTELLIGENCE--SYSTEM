import os
import shutil
from pathlib import Path

def reunir_archivos(fuentes):
    """
    Orquestación de búsqueda y captura de activos dispersos.
    Agente Responsable: Unidad Alpha (Agentes 1-15).
    """
    print("📡 [MANUS AI]: Iniciando fase de captura de activos...")
    
    # Destinos en el proyecto
    DESTINOS = {
        "video": "public/assets/videos",
        "docs": "public/assets/docs",
        "images": "public/assets/img"
    }

    # Crear directorios si no existen
    for folder in DESTINOS.values():
        os.makedirs(folder, exist_ok=True)

    for ruta_base in fuentes:
        path = Path(os.path.expanduser(ruta_base))
        if not path.exists():
            print(f"⚠️ Ruta no encontrada: {ruta_base}")
            continue

        print(f"🔍 Escaneando: {ruta_base}")
        for archivo in path.rglob("*"):
            if archivo.is_file():
                # Lógica de clasificación por extensión
                ext = archivo.suffix.lower()
                target = None
                
                if ext in ['.mp4', '.mov', '.avi']:
                    target = DESTINOS["video"]
                elif ext in ['.pdf', '.txt', '.docx']:
                    target = DESTINOS["docs"]
                elif ext in ['.jpg', '.jpeg', '.png', '.svg']:
                    target = DESTINOS["images"]

                if target:
                    try:
                        shutil.copy2(archivo, target)
                        print(f"✅ Sincronizado: {archivo.name} -> {target}")
                    except Exception as e:
                        print(f"❌ Error al copiar {archivo.name}: {e}")

if __name__ == "__main__":
    fuentes_externas = [
        "~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX",
        "~/Downloads",
        "~/Google Drive/My Drive/DeployExpress"
    ]
    reunir_archivos(fuentes_externas)
