#!/usr/bin/env python3
import argparse
import base64
import json
import os
from pathlib import Path
from datetime import datetime, timedelta, timezone

import requests
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# --- INTEGRACIÓN GEMINI SDK ---
try:
    from google import genai
except ImportError:
    genai = None

# --- CONFIGURACIÓN ---
TOKEN_FILE = Path("token.json")
CLIENT_SECRETS = Path("client_secrets.json")
OUTPUT_DIR = Path("output_images")

SCOPES = [
    "https://www.googleapis.com/auth/content",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/datastudio",
    "https://www.googleapis.com/auth/dfareporting",
]

PRODUCT_STUDIO_BASE = "https://merchantapi.googleapis.com/productstudio/v1alpha"

# --- AUTENTICACIÓN ---
def get_credentials():
    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CLIENT_SECRETS.exists():
                raise FileNotFoundError("Error: Necesitas 'client_secrets.json' para las funciones de Google.")
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS, SCOPES)
            creds = flow.run_local_server(port=0)
        TOKEN_FILE.write_text(creds.to_json())

    return creds

def authed_session(creds):
    if not creds.valid:
        creds.refresh(Request())
    s = requests.Session()
    s.headers.update({"Authorization": f"Bearer {creds.token}"})
    return s

# --- GEMINI ---
def run_gemini(prompt, model="gemini-2.0-flash"):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Error: Define la variable de entorno GEMINI_API_KEY."
    if not genai:
        return "Error: Instala el SDK con 'pip install google-genai'."

    client = genai.Client(api_key=api_key)
    res = client.models.generate_content(model=model, contents=prompt)
    return res.text

# --- PRODUCT STUDIO ---
def product_studio_image(creds, account_id, image_path, mode, product_desc=None, bg_desc=None):
    session = authed_session(creds)
    OUTPUT_DIR.mkdir(exist_ok=True)

    endpoints = {
        "upscale": "upscaleProductImage",
        "remove": "removeProductImageBackground",
        "bg": "generateProductImageBackground",
    }

    with open(image_path, "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode()

    payload = {
        "inputImage": {"imageBytes": image_b64},
        "outputConfig": {"returnImageUri": True},
    }

    if mode == "bg":
        payload["config"] = {
            "productDescription": product_desc or "",
            "backgroundDescription": bg_desc or ""
        }

    url = f"{PRODUCT_STUDIO_BASE}/accounts/{account_id}/generatedImages:{endpoints[mode]}"
    r = session.post(url, json=payload)
    r.raise_for_status()

    data = r.json()

    # Lógica de guardado local del resultado
    if "imageBytes" in data:
        output_file = OUTPUT_DIR / f"result_{mode}_{datetime.now().strftime('%H%M%S')}.png"
        with open(output_file, "wb") as f:
            f.write(base64.b64decode(data["imageBytes"]))
        data["local_path"] = str(output_file)

    return data

# --- CALENDAR ---
def create_event(creds, title, minutes=30):
    service = build("calendar", "v3", credentials=creds)
    start = datetime.now(timezone.utc)
    end = start + timedelta(minutes=minutes)

    event = {
        "summary": title,
        "start": {"dateTime": start.isoformat()},
        "end": {"dateTime": end.isoformat()},
    }
    return service.events().insert(calendarId="primary", body=event).execute()

# --- LOOKER ---
def looker_link(report_id, name):
    from urllib.parse import urlencode
    params = {"c.reportId": report_id, "c.reportName": name}
    return "https://lookerstudio.google.com/reporting/create?" + urlencode(params)

# --- CLI ---
def main():
    p = argparse.ArgumentParser(description="Google Studio All-in-One CLI")
    sub = p.add_subparsers(dest="cmd", required=True)

    # Comandos
    sub.add_parser("gemini").add_argument("--prompt", required=True)

    ps = sub.add_parser("product")
    ps.add_argument("--mode", choices=["upscale", "remove", "bg"], required=True)
    ps.add_argument("--account", required=True)
    ps.add_argument("--image", required=True)
    ps.add_argument("--product_desc")
    ps.add_argument("--bg_desc")

    lk = sub.add_parser("looker")
    lk.add_argument("--id", required=True)
    lk.add_argument("--name", required=True)

    sub.add_parser("calendar").add_argument("--title", required=True)

    args = p.parse_args()

    try:
        if args.cmd == "gemini":
            print(f"\n--- Respuesta de Gemini ---\n{run_gemini(args.prompt)}")
        elif args.cmd == "product":
            creds = get_credentials()
            res = product_studio_image(creds, args.account, args.image, args.mode, args.product_desc, args.bg_desc)
            print(f"Éxito. Archivo guardado en: {res.get('local_path', 'N/A')}")
        elif args.cmd == "looker":
            print(f"URL de Looker Studio:\n{looker_link(args.id, args.name)}")
        elif args.cmd == "calendar":
            creds = get_credentials()
            ev = create_event(creds, args.title)
            print(f"Evento creado: {ev.get('htmlLink')}")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    main()
