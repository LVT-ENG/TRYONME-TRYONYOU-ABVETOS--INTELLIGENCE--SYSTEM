import os
import imaplib
import smtplib
import email
import json
import requests
import gspread
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import decode_header
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
import re

# --- CONFIGURACIÓN & CONSTANTES ---
IMAP_SERVER = "imap.gmail.com"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SCOPES = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

class JulesAgent:
    def __init__(self):
        print("🤖 JULES V7: Iniciando sistemas...")
        self.email_user = os.getenv("EMAIL_USER")
        self.email_pass = os.getenv("EMAIL_PASS")
        self.telegram_token = os.getenv("TELEGRAM_TOKEN")
        self.telegram_chat_id = os.getenv("TELEGRAM_CHAT_ID")
        self.sheet_name = os.getenv("SHEET_NAME", "Divineo_Leads_DB")
        
        # Conexión a Google Sheets (CRM)
        self.gc = self._connect_sheets()

    def _connect_sheets(self):
        """Conecta a Google Sheets usando credenciales JSON desde ENV"""
        try:
            creds_json = os.getenv("GOOGLE_CREDENTIALS_JSON")
            if not creds_json:
                raise ValueError("Falta GOOGLE_CREDENTIALS_JSON en variables de entorno.")
            
            creds_dict = json.loads(creds_json)
            creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, SCOPES)
            return gspread.authorize(creds)
        except Exception as e:
            print(f"⚠️ Error conectando a Sheets: {e}")
            return None

    def notify_telegram(self, message):
        """Envía alertas a tu móvil"""
        if not self.telegram_token or not self.telegram_chat_id:
            return
        try:
            url = f"https://api.telegram.org/bot{self.telegram_token}/sendMessage"
            data = {"chat_id": self.telegram_chat_id, "text": f"🦅 JULES: {message}"}
            response = requests.post(url, data=data, timeout=10)
            response.raise_for_status()
        except Exception as e:
            print(f"⚠️ Error enviando notificación Telegram: {e}")

    def get_unread_emails(self):
        """Descarga correos no leídos"""
        emails = []
        try:
            mail = imaplib.IMAP4_SSL(IMAP_SERVER)
            mail.login(self.email_user, self.email_pass)
            mail.select("inbox")
            
            status, messages = mail.search(None, "UNSEEN")
            email_ids = messages[0].split()

            for e_id in email_ids:
                status, msg_data = mail.fetch(e_id, "(RFC822)")
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = email.message_from_bytes(response_part[1])
                        subject, encoding = decode_header(msg["Subject"])[0]
                        if isinstance(subject, bytes):
                            subject = subject.decode(encoding if encoding else "utf-8")
                        
                        sender = msg.get("From")
                        
                        # Extraer cuerpo del mensaje
                        body = ""
                        if msg.is_multipart():
                            for part in msg.walk():
                                if part.get_content_type() == "text/plain":
                                    body = part.get_payload(decode=True).decode()
                                    break
                        else:
                            body = msg.get_payload(decode=True).decode()

                        emails.append({"id": e_id, "subject": subject, "sender": sender, "body": body})
            
            mail.close()
            mail.logout()
        except Exception as e:
            print(f"⚠️ Error IMAP: {e}")
        
        return emails

    def analyze_intent(self, subject, body):
        """
        Clasificador de Intención Simple (Simulando IA)
        Aquí podríamos conectar GPT-4, pero usamos keywords para velocidad/coste 0.
        """
        text = (subject + " " + body).lower()
        
        if "scan" in text or "look" in text or "recomenda" in text or "divineo" in text:
            return "GET_LOOK"
        elif "problem" in text or "error" in text or "ayuda" in text:
            return "SUPPORT"
        elif "invest" in text or "socio" in text:
            return "INVESTOR"
        else:
            return "GENERAL"

    def generate_reply(self, intent):
        """Genera la respuesta HTML basada en la intención (Lógica Lafayette)"""
        if intent == "GET_LOOK":
            return """
            <html>
                <h2>✨ Tu Experiencia Divineo - Galeries Lafayette</h2>
                <p>Hola,</p>
                <p>Gracias por usar el espejo Divineo. Según tu escaneo biométrico, Pau ha seleccionado:</p>
                <ul>
                    <li><strong>Prenda Principal:</strong> Vestido Rojo Minimal (Ajuste 98%)</li>
                    <li><strong>Complemento:</strong> Trench Burberry (Ajuste Talla M)</li>
                </ul>
                <p>Puedes ver tu probador virtual aquí: <a href="https://tryonyou.app/demo">Ver Mi Avatar</a></p>
                <br>
                <p><em>Divineo Pilot Team</em></p>
            </html>
            """
        elif intent == "SUPPORT":
            return "Hola, hemos recibido tu incidencia. Un humano del equipo técnico la revisará en breve."
        else:
            return "Hola, gracias por contactar con Divineo. Hemos recibido tu mensaje y te responderemos pronto."

    def send_email(self, to_email, subject, html_body):
        """Envía respuesta vía SMTP"""
        try:
            msg = MIMEMultipart()
            msg["From"] = self.email_user
            msg["To"] = to_email
            msg["Subject"] = subject
            msg.attach(MIMEText(html_body, "html"))

            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(self.email_user, self.email_pass)
            server.sendmail(self.email_user, to_email, msg.as_string())
            server.quit()
            return True
        except Exception as e:
            print(f"❌ Error enviando email: {e}")
            return False

    def log_interaction(self, sender, intent, status):
        """Guarda el lead en Google Sheets (CRM)"""
        if not self.gc: return
        try:
            sh = self.gc.open(self.sheet_name).sheet1
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            sh.append_row([timestamp, sender, intent, status])
            print(f"📝 CRM Actualizado: {sender} -> {intent}")
        except Exception as e:
            print(f"⚠️ Error escribiendo en Sheets: {e}")

    def extract_email_address(self, sender_string):
        """
        Extrae el email limpio del remitente
        Asumimos formato "Nombre <email@example.com>" o solo "email@example.com"
        """
        if not sender_string:
            return None
        
        # Buscar email entre < >
        match = re.search(r'<([^>]+)>', sender_string)
        if match:
            return match.group(1)
        
        # Si no hay < >, buscar un patrón de email más robusto
        # Pattern supports most common email formats
        match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', sender_string)
        if match:
            return match.group(0)
        
        return sender_string.strip()

    def run(self):
        """Ciclo principal de ejecución"""
        emails = self.get_unread_emails()
        print(f"📬 Correos nuevos encontrados: {len(emails)}")

        for email_data in emails:
            # 1. Analizar
            intent = self.analyze_intent(email_data["subject"], email_data["body"])
            print(f"🧠 Intención detectada: {intent} para {email_data['sender']}")

            # 2. Generar Respuesta
            reply_body = self.generate_reply(intent)
            
            # 3. Extraer email limpio del remitente
            sender_email = self.extract_email_address(email_data["sender"])
            
            if sender_email:
                # 4. Enviar respuesta
                success = self.send_email(
                    to_email=sender_email,
                    subject=f"Re: {email_data['subject']}",
                    html_body=reply_body
                )
                
                # 5. Registrar en CRM
                status = "✅ Respondido" if success else "❌ Error"
                self.log_interaction(sender_email, intent, status)
                
                # 6. Notificar al móvil
                if success:
                    self.notify_telegram(f"Nuevo lead: {sender_email} ({intent})")
                    print(f"✅ Email enviado a {sender_email}")
                else:
                    print(f"❌ Error enviando a {sender_email}")
            else:
                print(f"⚠️ No se pudo extraer email de: {email_data['sender']}")

        print(f"🏁 Ciclo completado. Procesados {len(emails)} correos.")


if __name__ == "__main__":
    """
    Ejecutar manualmente o via cron/GitHub Actions cada 5 minutos
    Ej: */5 * * * * python jules_main.py
    """
    agent = JulesAgent()
    agent.run()
