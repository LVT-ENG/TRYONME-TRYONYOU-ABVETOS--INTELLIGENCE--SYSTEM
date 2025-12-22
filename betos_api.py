#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
from datetime import datetime
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn

APP_NAME = "Abvetos"
BASE_DOMAIN = "abvetos.com"

ICLOUD_BASE = os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs")
OUT_DIR = os.path.join(ICLOUD_BASE, APP_NAME)

app = FastAPI(title="Betos API", version="1.0")

def timestamp():
    return datetime.now().isoformat()

def prepare_dir():
    os.makedirs(OUT_DIR, exist_ok=True)
    return OUT_DIR

@app.get("/demo")
def demo():
    base = prepare_dir()

    data = {
        "app": APP_NAME,
        "domain": BASE_DOMAIN,
        "status": "ok",
        "timestamp": timestamp()
    }

    path = os.path.join(base, "betos_api_demo.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return JSONResponse({
        "message": "Betos API demo ejecutada",
        "saved_to": path,
        "data": data
    })

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
