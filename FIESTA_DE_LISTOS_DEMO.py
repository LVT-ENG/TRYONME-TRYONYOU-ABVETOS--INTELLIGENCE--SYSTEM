#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
from datetime import datetime

try:
    from PIL import Image, ImageDraw
    PIL_OK = True
except Exception:
    PIL_OK = False

ICLOUD_BASE = os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs")
FIESTA_DIR = os.path.join(ICLOUD_BASE, "Fiesta")

def timestamp():
    return datetime.now().isoformat()

def preparar_directorio():
    os.makedirs(FIESTA_DIR, exist_ok=True)
    return FIESTA_DIR

def guardar_texto(base):
    with open(os.path.join(base, "fiesta.txt"), "w", encoding="utf-8") as f:
        f.write(f"Fiesta de listos\nTimestamp: {timestamp()}")

def guardar_json(base):
    with open(os.path.join(base, "fiesta.json"), "w", encoding="utf-8") as f:
        json.dump({"modo": "Fiesta", "timestamp": timestamp()}, f, indent=2)

def guardar_imagen(base):
    if not PIL_OK:
        return
    img = Image.new("RGB", (600, 300), color=(40, 40, 40))
    d = ImageDraw.Draw(img)
    d.text((60, 130), "FIESTA DE LISTOS", fill=(255,255,255))
    img.save(os.path.join(base, "fiesta.png"))

def main():
    base = preparar_directorio()
    guardar_texto(base)
    guardar_json(base)
    guardar_imagen(base)
    os.system(f'open "{base}"')

if __name__ == "__main__":
    main()
