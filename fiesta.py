#!/usr/bin/env python3
import os
import json
from datetime import datetime
from PIL import Image, ImageDraw

# =========================
# CONFIG
# =========================
ICLOUD_BASE = os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs")
FIESTA_DIR = os.path.join(ICLOUD_BASE, "Fiesta")

# =========================
# CORE
# =========================
def preparar_directorio():
    os.makedirs(FIESTA_DIR, exist_ok=True)
    return FIESTA_DIR

def timestamp():
    return datetime.now().isoformat()

def manus_genera_texto():
    return (
        "🎉 FIESTA DE LISTOS\n"
        "Manus IA operativo\n"
        f"Timestamp: {timestamp()}\n"
        "Estado: ACTIVO\n"
    )

def manus_genera_json():
    return {
        "sistema": "Manus IA",
        "modo": "Fiesta",
        "estado": "activo",
        "timestamp": timestamp()
    }

def guardar_texto(base):
    path = os.path.join(base, "fiesta.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(manus_genera_texto())

def guardar_json(base):
    path = os.path.join(base, "fiesta.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(manus_genera_json(), f, indent=2, ensure_ascii=False)

def guardar_imagen(base):
    img = Image.new("RGB", (600, 300), color=(40, 40, 40))
    draw = ImageDraw.Draw(img)
    draw.text((60, 130), "🎉 FIESTA DE LISTOS 🎉", fill=(255, 255, 255))
    img.save(os.path.join(base, "fiesta.png"))

# =========================
# MAIN
# =========================
def main():
    base = preparar_directorio()
    guardar_texto(base)
    guardar_json(base)
    guardar_imagen(base)
    print("✅ TODO LISTO")
    print(f"📂 Guardado en: {base}")

if __name__ == "__main__":
    main()
