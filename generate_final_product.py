import os
import shutil
import zipfile
import json
from datetime import datetime

# --- CONFIGURACIÓN DE RUTAS Y NOMBRES ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.join(BASE_DIR, "TRYONYOU_SRC") # Carpeta con sus archivos de origen
TEMP_DIR = os.path.join(BASE_DIR, "TRYONYOU_BUILD_TEMP")
FINAL_ZIP_NAME = f"TRYONYOU_PRODUCT_ULTIMATUM_{datetime.now().strftime('%Y%m%d')}.zip"

# --- ESTRUCTURA IDEAL DEL PRODUCTO FINAL ---
# Basado en la lógica del proyecto (React + Demos + Assets)
PRODUCT_STRUCTURE = {
    "CODE_BASE": "tryonyou-main/dist", # Carpeta de código web compilado (del FAST_TRYONYOU.zip)
    "ASSETS_IMG": "assets/photos",     # Carpeta para fotos ordenadas
    "ASSETS_VID": "assets/fusion_media" # Carpeta para videos/3D de la fusión
}

# --- FUNCIÓN PRINCIPAL DE EMPAQUETADO ---
def create_perfect_product_zip():
    print("--- 🛠️ Iniciando la creación del producto final TRYONYOU ---")
    
    # 1. Limpieza y preparación
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)
    os.makedirs(os.path.join(TEMP_DIR, PRODUCT_STRUCTURE["ASSETS_IMG"]), exist_ok=True)
    os.makedirs(os.path.join(TEMP_DIR, PRODUCT_STRUCTURE["ASSETS_VID"]), exist_ok=True)
    
    # 2. Fusión y Organización de Archivos
    
    # a) Copiar la base de código compilada (asumiendo que está en SRC_DIR/fast_tryonyou_dist)
    print("2.1. Copiando la base de código (tryonyou-main/dist)...")
    src_code_path = os.path.join(SRC_DIR, "fast_tryonyou_dist")
    dst_code_path = os.path.join(TEMP_DIR, PRODUCT_STRUCTURE["CODE_BASE"])
    if os.path.exists(src_code_path):
        shutil.copytree(src_code_path, dst_code_path)
    else:
        print(f"⚠️ Advertencia: Carpeta de código no encontrada en {src_code_path}. Creando estructura vacía.")
        os.makedirs(dst_code_path)
        
    # b) Ordenar Fotos (simulando, debería reemplazar con su lógica real de copia de archivos)
    print("2.2. Organizando Fotos de Marketing (simulado)...")
    # Lógica: Mover todos los archivos .jpg/.png que no sean código a la carpeta ASSETS_IMG
    # SIMULACIÓN: Cree un archivo de marcador de posición para la demo
    with open(os.path.join(TEMP_DIR, PRODUCT_STRUCTURE["ASSETS_IMG"], "demo_runway_look_01.jpg"), "w") as f:
        f.write("Placeholder para Look #1 - Calidad Ultra-Premium")
    
    # c) Fusión de Medios de Demos (simulando vídeos/3D)
    print("2.3. Fusionando Vídeos y Assets 3D (AVBETOS/PIAPCOC)...")
    # Lógica: Mover archivos de demo final (ModelViewer.jsx, assets de 3D/Video) aquí
    # SIMULACIÓN: Cree un archivo de marcador de posición para la fusión 3D/Biometría
    with open(os.path.join(TEMP_DIR, PRODUCT_STRUCTURE["ASSETS_VID"], "AVBETOS_3D_Fusion.mp4"), "w") as f:
        f.write("Vídeo final de la fusión de demos Lafayette / Classroom")
    with open(os.path.join(TEMP_DIR, PRODUCT_STRUCTURE["ASSETS_VID"], "PIAPCOC_Avatar_Model.glb"), "w") as f:
        f.write("Modelo 3D del Avatar PIAPCOC")

    # 3. Creación del archivo .zip final
    print(f"3. Creando el archivo ZIP final: {FINAL_ZIP_NAME}...")
    with zipfile.ZipFile(FINAL_ZIP_NAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Recorrer la carpeta temporal y añadir todo
        for root, dirs, files in os.walk(TEMP_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                # Crea un camino relativo dentro del zip (ej: tryonyou-main/dist/index.html)
                zip_path = os.path.relpath(full_path, TEMP_DIR)
                zipf.write(full_path, zip_path)
                
    # 4. Limpieza
    shutil.rmtree(TEMP_DIR)
    
    print("--- ✅ ¡Éxito! Producto listo para la venta! ---")
    print(f"El archivo ZIP se generó como: **{FINAL_ZIP_NAME}**")
    print("\nEstructura interna del ZIP para el informático:")
    print(f"- /{PRODUCT_STRUCTURE['CODE_BASE']}/ (Código final listo para Vercel/CDN)")
    print(f"- /{PRODUCT_STRUCTURE['ASSETS_IMG']}/ (Fotos de alta resolución, ordenadas)")
    print(f"- /{PRODUCT_STRUCTURE['ASSETS_VID']}/ (Vídeos y modelos 3D de la fusión de demos)")

# --- INSTRUCCIONES DE USO ---
if __name__ == "__main__":
    
    # PASO CERO: Preparación
    print("--- INSTRUCCIONES ANTES DE EJECUTAR ESTE CÓDIGO ---")
    print("1. Cree una carpeta llamada `TRYONYOU_SRC` en el mismo directorio.")
    print("2. Dentro de `TRYONYOU_SRC`, coloque:")
    print("   - Una carpeta `fast_tryonyou_dist` con el contenido compilado (dist) del ZIP de código.")
    print("   - Todas sus fotos de alta resolución (`.jpg`, `.png`).")
    print("   - Todos los vídeos/modelos 3D de la fusión de demos (`.mp4`, `.glb`).")
    print("-------------------------------------------------------")
    
    # Llamar a la función principal
    # create_perfect_product_zip() # Debe descomentar esta línea para ejecutarlo.

# Simulación de la función para mostrar la respuesta
create_perfect_product_zip()
