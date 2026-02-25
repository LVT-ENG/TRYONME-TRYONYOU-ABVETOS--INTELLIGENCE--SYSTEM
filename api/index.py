import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
frontend_origin = os.environ.get("FRONTEND_ORIGIN")
if frontend_origin:
    CORS(
        app,
        resources={
            r"/api/scan": {
                "origins": frontend_origin,
                "methods": ["POST"],
                "allow_headers": ["Content-Type"],
            }
        },
    )

# --- CONFIGURACIÓN DE CRUCIAL ---
# Las credenciales se cargan desde variables de entorno en Vercel por seguridad
GOOGLE_SHEETS_ID = os.environ.get("GOOGLE_SHEETS_ID") # Divineo_Leads_DB
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def get_google_service():
    creds_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if not creds_json:
        raise RuntimeError(
            "GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set or is empty. "
            "Please configure it with valid Google service account JSON credentials."
        )
    try:
        creds_info = json.loads(creds_json)
    except json.JSONDecodeError as e:
        raise RuntimeError(
            "GOOGLE_APPLICATION_CREDENTIALS_JSON contains invalid JSON. "
            "Please ensure it is a valid JSON-encoded Google service account key."
        ) from e
    creds = Credentials.from_service_account_info(creds_info, scopes=SCOPES)
    return build('sheets', 'v4', credentials=creds)

# --- LÓGICA DEL ALGORITMO DE AJUSTE (EL CORAZÓN) ---
def calculate_perfect_fit(user_data, product_db):
    """
    Compara medidas sin mostrar números.
    Considera la elasticidad del tejido y la caída.
    """
    best_match = None
    min_diff = float('inf')

    # El usuario envía: peso, altura, tipo_evento
    # Nosotros calculamos el 'fit' ideal comparando con la base de datos ficticia
    for product in product_db:
        # Lógica simplificada de volumen: (Peso / Altura) corregido por elasticidad
        # La elasticidad es un factor de 0.8 (muy elástico) a 1.2 (rígido)
        fit_score = abs(user_data['peso'] - (product['base_weight'] * product['elasticidad']))

        if fit_score < min_diff:
            min_diff = fit_score
            best_match = product

    return best_match

# --- ENDPOINTS DEL PILOTO ---

@app.route('/api/scan', methods=['POST'])
def handle_scan():
    data = request.json
    # 1. Simulación de Escaneo y Lógica de Recomendación
    # En producción, aquí consultamos la DB real de Galeries Lafayette
    mock_db = [
        {"id": "look_01", "name": "Vestido Seda Premium", "base_weight": 60, "elasticidad": 1.1},
        {"id": "look_02", "name": "Traje Estructurado Dior", "base_weight": 75, "elasticidad": 0.9}
    ]

    recommended = calculate_perfect_fit(data, mock_db)

    # 2. Registro en Google Sheets (Divineo_Leads_DB)
    try:
        service = get_google_service()
        sheet = service.spreadsheets()
        row = [data.get('nombre', 'Anónimo'), data.get('email', 'N/A'), recommended['name'], data.get('evento')]

        sheet.values().append(
            spreadsheetId=GOOGLE_SHEETS_ID,
            range="Sheet1!A:D",
            valueInputOption="USER_ENTERED",
            body={"values": [row]}
        ).execute()
    except Exception as e:
        print(f"Error Sheets: {e}")

    # 3. Notificación (Simulada para ver en logs de Vercel)
    print(f"🚀 NOTIFICACIÓN MÓVIL: Nuevo escaneo para {data.get('nombre')}. Look sugerido: {recommended['name']}")

    return jsonify({
        "status": "success",
        "recommendation": recommended['name'],
        "message": "Silueta guardada y look compartido"
    })

@app.route('/api/health', methods=['GET'])
def health():
    return "Jules V7 is breathing and ready."

if __name__ == "__main__":
    app.run(debug=True)
