# organize_assets.py
import os
import shutil

# Mapeo estricto basado en el Manifiesto de Activos
ASSET_MAP = {
    # EL HÉROE (La Identidad)
    "IMG_6206.png": "public/assets/branding/pau_tuxedo_agent.png",

    # EL PRODUCTO (La Solución)
    "41C07010-0419-410B-8CA8-EE67FE9BBBDB.png": "public/assets/catalog/red_dress_minimal.png",
    "8762992B-964D-4156-A83F-F2EBC8FA680C.png": "public/assets/catalog/burberry_trench.png",

    # LA INTERFAZ (UI Piloto)
    "IMG_6168.png": "public/assets/ui/lafayette_hero_banner.png",
    "IMG_6155.jpeg": "public/assets/ui/biometric_scan_ui.png",

    # DOCUMENTACIÓN
    "TryOnYou_Presentation_Commerciale.pdf": "public/docs/investor/commercial_deck.pdf",
    "PATENTE_TRYONYOU_ABVETOS_ULTRA_PLUS_ULTIMATUM.pdf": "public/docs/patent/consolidated_patent.pdf"
}

def execute_rescue():
    # Crear directorios si no existen
    os.makedirs("public/assets/branding", exist_ok=True)
    os.makedirs("public/assets/catalog", exist_ok=True)
    os.makedirs("public/assets/ui", exist_ok=True)
    os.makedirs("public/docs/investor", exist_ok=True)
    os.makedirs("public/docs/patent", exist_ok=True)

    print("🚀 Reestructurando Activos Divineo...")

    # Mover archivos (búsqueda recursiva en directorio actual)
    rescued_count = 0
    for root, dirs, files in os.walk("."):
        # Evitar buscar dentro de los directorios de destino para no copiar sobre sí mismo
        if "public/assets" in root or "public/docs" in root:
            continue

        for original, target in ASSET_MAP.items():
            if original in files:
                source_path = os.path.join(root, original)
                # Check if target already exists to avoid redundant copy
                if not os.path.exists(target):
                    shutil.copy2(source_path, target)
                    print(f"✅ Mapeado: {original} -> {target}")
                    rescued_count += 1
                else:
                    print(f"ℹ️  Ya existe: {target}")

    if rescued_count == 0:
        print("⚠️  No se encontraron nuevos activos para rescatar.")
    else:
        print(f"✨ Se rescataron {rescued_count} activos.")

if __name__ == "__main__":
    execute_rescue()
