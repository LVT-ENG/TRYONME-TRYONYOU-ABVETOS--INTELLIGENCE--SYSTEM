import os
import json
import time
import smtplib
import imaplib
import email
import requests
import gspread
from email.mime.text import MIMEText
from email.header import decode_header
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime

# --- CONFIGURATION (Loaded from Environment Secrets) ---
EMAIL_USER = os.environ.get("EMAIL_USER")
EMAIL_PASS = os.environ.get("EMAIL_PASS")
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
SHEET_NAME = os.environ.get("SHEET_NAME")
GOOGLE_CREDENTIALS_JSON = os.environ.get("GOOGLE_CREDENTIALS_JSON")

class JulesAgent:
    def __init__(self):
        print("🤖 JULES: Initializing systems...")

        # --- SMART CONFIGURATION ---
        # Detect if we are using the Corporate Identity (Porkbun) or a Test Account (Gmail)
        if EMAIL_USER and "gmail.com" in EMAIL_USER:
            print("ℹ️ MODE: Gmail Infrastructure Detected")
            self.imap_server = "imap.gmail.com"
            self.smtp_server = "smtp.gmail.com"
            self.imap_port = 993
            self.smtp_port = 465
        else:
            # Default to Divineo/Porkbun Infrastructure (Professional Pilot Mode)
            print("ℹ️ MODE: Corporate Infrastructure (Porkbun) Detected")
            self.imap_server = "imap.porkbun.com"  # Standard Porkbun IMAP
            self.smtp_server = "smtp.porkbun.com"  # Standard Porkbun SMTP
            self.imap_port = 993
            self.smtp_port = 465

        self.sheet = None

        # Initialize connections
        self.connect_google_sheets()

    def connect_google_sheets(self):
        """Connects to Google Sheets using JSON credentials from Env Var."""
        try:
            if not GOOGLE_CREDENTIALS_JSON:
                # Fallback logging if secrets are missing
                print("⚠️ JULES: GOOGLE_CREDENTIALS_JSON missing. Sheets disabled.")
                return

            # Parse the JSON string from the environment variable
            creds_dict = json.loads(GOOGLE_CREDENTIALS_JSON)
            scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
            creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
            client = gspread.authorize(creds)

            # Open the sheet
            if SHEET_NAME:
                self.sheet = client.open(SHEET_NAME).sheet1
                print(f"✅ JULES: Connected to Google Sheet '{SHEET_NAME}'")
            else:
                print("⚠️ JULES: SHEET_NAME missing. Connected to API but no sheet selected.")

        except Exception as e:
            print(f"❌ JULES: Error connecting to Sheets: {e}")

    def send_telegram_alert(self, message):
        """Sends a notification to the specified Telegram chat."""
        if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
            print("⚠️ JULES: Telegram credentials missing. Skipping alert.")
            return

        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        payload = {"chat_id": TELEGRAM_CHAT_ID, "text": message}
        try:
            requests.post(url, json=payload)
            print("✅ JULES: Telegram notification sent.")
        except Exception as e:
            print(f"❌ JULES: Error sending Telegram: {e}")

    def send_email_reply(self, to_email):
        """Sends the auto-reply via SMTP."""
        subject = "Recibido: Tu solicitud para el Piloto Try On You"

        # CONTENT IN SPANISH (As requested for Pilot Context)
        body = f"""Hola,

Soy Jules, el asistente virtual de Try On You.

Hemos recibido tu solicitud correctamente. Actualmente estamos en fase de piloto exclusivo (Closed Beta) preparando nuestra integración con partners comerciales.

He registrado tus datos en nuestra lista de prioridad. Te contactaremos en cuanto se abran nuevos slots para la experiencia.

Atentamente,
Jules @ Try On You
"""
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = to_email

        try:
            server = smtplib.SMTP_SSL(self.smtp_server, self.smtp_port)
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, to_email, msg.as_string())
            server.quit()
            print(f"✅ JULES: Auto-reply sent to {to_email}")
        except Exception as e:
            print(f"❌ JULES: Error sending email: {e}")

    def log_interaction(self, sender_email, subject):
        """Logs the interaction into Google Sheets."""
        if self.sheet:
            try:
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                # Structure: Date, Email, Subject, Status
                self.sheet.append_row([timestamp, sender_email, subject, "Auto-Replied"])
                print(f"✅ JULES: Interaction logged in Sheets.")
            except Exception as e:
                print(f"❌ JULES: Error writing to Sheet: {e}")

    def check_inbox(self):
        """Checks Inbox for unread messages."""
        try:
            # Use the port defined in __init__
            mail = imaplib.IMAP4_SSL(self.imap_server, self.imap_port)
            mail.login(EMAIL_USER, EMAIL_PASS)
            mail.select("inbox")

            # Search for all unread emails
            status, messages = mail.search(None, "UNSEEN")
            email_ids = messages[0].split()

            if not email_ids:
                print("💤 JULES: No new unread emails.")
                return

            print(f"📬 JULES: Found {len(email_ids)} new emails!")

            for email_id in email_ids:
                # Fetch the email
                res, msg_data = mail.fetch(email_id, "(RFC822)")
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = email.message_from_bytes(response_part[1])

                        # Decode Subject
                        subject, encoding = decode_header(msg["Subject"])[0]
                        if isinstance(subject, bytes):
                            subject = subject.decode(encoding if encoding else "utf-8")

                        # Get Sender
                        sender = msg.get("From")

                        print(f"📨 Processing email from: {sender} | Subject: {subject}")

                        # EXECUTE ACTIONS
                        self.log_interaction(sender, subject)
                        self.send_telegram_alert(f"🚨 Nuevo Lead Detectado:\nDe: {sender}\nAsunto: {subject}")

                        # Extract pure email address for reply
                        if "<" in sender:
                            sender_email = sender.split("<")[1].split(">")[0]
                        else:
                            sender_email = sender

                        self.send_email_reply(sender_email)

            mail.close()
            mail.logout()

        except Exception as e:
            print(f"❌ JULES: Error checking inbox: {e}")

    def run(self):
        """Main execution loop."""
        print("🚀 JULES AGENT STARTED (Pilot Mode)")
        # Run once immediately
        self.check_inbox()
        print("🏁 JULES: Session finished.")

if __name__ == "__main__":
    agent = JulesAgent()
    agent.run()
