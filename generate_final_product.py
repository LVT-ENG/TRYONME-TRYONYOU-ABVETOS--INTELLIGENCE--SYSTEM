#!/usr/bin/env python3
import os
import shutil
import zipfile
import sys

# --- CONFIGURACIÓN DE RUTAS ---
DEMO_ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(DEMO_ROOT, 'public')
ASSETS_DIR = os.path.join(PUBLIC_DIR, 'assets')
FUSION_MEDIA_DIR = os.path.join(ASSETS_DIR, 'fusion_media')
PHOTOS_DIR = os.path.join(ASSETS_DIR, 'photos')
DIST_DIR = os.path.join(DEMO_ROOT, 'dist')
ZIP_OUTPUT_NAME = 'TRYONYOU_PRODUCTO_VENDIBLE.zip'
PIAPCOC_MODEL = 'PIAPCOC_Avatar_Model.glb'
ABVETOS_VIDEO = 'ABVETOS_3D_Fusion.mp4'

# --- INICIO DEL PROCESO ---
print("\n--- INICIO DEL EMPAQUETADO PYTHON ---")

# 2.1. Simulación de archivos de fotos de la demo (Temporal para garantizar que el ZIP incluya la carpeta 'photos')
print("Simulando archivos de fotos de la demo (temporal)...")
os.makedirs(PHOTOS_DIR, exist_ok=True)
for i in range(1, 4):
    temp_file = os.path.join(PHOTOS_DIR, f'demo_photo_{i}.jpg')
    # Create empty placeholder files
    open(temp_file, 'a').close()

# 2.2. Verificación de Build
if not os.path.exists(DIST_DIR):
    print("❌ ERROR CRÍTICO: El directorio 'dist' (Build de React/Vite) no existe. El 'npm run build' falló.")
    shutil.rmtree(PHOTOS_DIR, ignore_errors=True)
    sys.exit(1)

# 2.3. Verificación de Assets Críticos (Advertencia si son placeholders)
model_path = os.path.join(FUSION_MEDIA_DIR, PIAPCOC_MODEL)
video_path = os.path.join(FUSION_MEDIA_DIR, ABVETOS_VIDEO)

if not os.path.exists(model_path) or not os.path.exists(video_path):
    print("⚠️ ADVERTENCIA CRÍTICA: Los assets de fusión (PIAPCOC y/o ABVETOS) no existen.")
    print("⚠️ RECUERDA: Debes crear los archivos en 'public/assets/fusion_media/' antes de la entrega final.")
    model_size = 0
    video_size = 0
else:
    model_size = os.path.getsize(model_path)
    video_size = os.path.getsize(video_path)
    
    if model_size == 0 or video_size == 0:
        print("⚠️ ADVERTENCIA CRÍTICA: Los assets de fusión (PIAPCOC y/o ABVETOS) están utilizando PLACEHOLDERS vacíos (0 bytes).")
        print("⚠️ RECUERDA: Debes reemplazar manual o automáticamente los archivos vacíos de 'public/assets/fusion_media/' antes de la entrega final.")
    else:
        print("✅ Archivos de fusión (PIAPCOC & ABVETOS) encontrados y no son placeholders vacíos.")

# 2.4. Crear el ZIP Final Unificado
print(f"2.4. Creando el archivo ZIP final: {ZIP_OUTPUT_NAME}...")
try:
    with zipfile.ZipFile(ZIP_OUTPUT_NAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # A. Añadir la aplicación web compilada (contenido de 'dist')
        for folder_name, subfolders, filenames in os.walk(DIST_DIR):
            for filename in filenames:
                file_path = os.path.join(folder_name, filename)
                arcname = os.path.relpath(file_path, DIST_DIR)
                # Ruta interna: TRYONYOU_PRODUCTO_FINAL/web_app/...
                zipf.write(file_path, os.path.join('TRYONYOU_PRODUCTO_FINAL/web_app', arcname))
                
        # B. Añadir los assets críticos (incluyendo fusion_media y fotos)
        # Se añaden desde public/assets/ para que los placeholders vayan en el ZIP.
        for root, dirs, files in os.walk(ASSETS_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                relative_path = os.path.relpath(full_path, start=PUBLIC_DIR)
                # Ruta interna: TRYONYOU_PRODUCTO_FINAL/public/assets/...
                zipf.write(full_path, os.path.join('TRYONYOU_PRODUCTO_FINAL', relative_path))
        
    print("🎉 ¡Éxito! Producto final empaquetado.")

finally:
    # 2.5. LIMPIEZA
    print("2.5. Limpieza: Eliminando carpeta temporal de fotos.")
    # El placeholder de fotos se elimina siempre
    shutil.rmtree(PHOTOS_DIR, ignore_errors=True)
    print("--- FIN DEL EMPAQUETADO PYTHON ---")
