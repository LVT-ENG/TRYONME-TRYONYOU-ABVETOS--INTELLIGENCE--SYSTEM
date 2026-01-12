import os
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

def setup_db():
    creds_json = os.getenv('GOOGLE_CREDENTIALS_JSON')
    if not creds_json:
        print("Error: GOOGLE_CREDENTIALS_JSON environment variable not set.")
        return

    try:
        service_account_info = json.loads(creds_json)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse GOOGLE_CREDENTIALS_JSON. {e}")
        return

    scopes = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
    ]

    creds = service_account.Credentials.from_service_account_info(
        service_account_info, scopes=scopes
    )

    try:
        service = build('sheets', 'v4', credentials=creds)
        spreadsheet = {
            'properties': {'title': 'Divineo_Leads_DB'}
        }
        sheet = service.spreadsheets().create(body=spreadsheet).execute()
        spreadsheet_id = sheet['spreadsheetId']
        print(f"Sheet ID: {spreadsheet_id}")
    except Exception as e:
        print(f"Error creating spreadsheet: {e}")
        return

    client_email = service_account_info.get('client_email')
    if client_email:
        print(f"Service Account Email: {client_email}")
        try:
            drive_service = build('drive', 'v3', credentials=creds)
            # Share the file with the client_email (redundant but requested)
            # We add it as a writer
            permission = {
                'type': 'user',
                'role': 'writer',
                'emailAddress': client_email
            }
            # Note: Sharing with itself usually returns 200 OK even if already owner.
            drive_service.permissions().create(
                fileId=spreadsheet_id,
                body=permission,
                fields='id'
            ).execute()
            print(f"Successfully shared 'Divineo_Leads_DB' with {client_email}")
        except Exception as e:
            print(f"Warning: Failed to share spreadsheet with {client_email}. It might already be owned by it. Error: {e}")
    else:
        print("Warning: 'client_email' not found in credentials. Skipping sharing step.")

if __name__ == '__main__':
    setup_db()
