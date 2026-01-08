import os
import imaplib
import email
import gspread
import requests
import google.generativeai as genai
from email.header import decode_header
from dotenv import load_dotenv
from datetime import datetime

# Load Environment Variables
load_dotenv()

# --- CONFIGURATION (PORKBUN INFRASTRUCTURE) ---
IMAP_HOST = os.getenv("IMAP_HOST", "imap.porkbun.com")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

# --- INTELLIGENCE & DATA ---
SHEET_ID = os.getenv("SHEET_ID")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_CREDS = os.getenv("GOOGLE_CREDS_JSON", "service_account.json")

# --- NOTIFICATION ---
TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

# Configure Gemini (Jules' Brain)
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
else:
    print("⚠️  AI WARNING: GOOGLE_API_KEY is missing.")

def send_telegram(message):
    if TELEGRAM_TOKEN and CHAT_ID:
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        requests.post(url, data={"chat_id": CHAT_ID, "text": message})

def analyze_email_intent(body):
    if not GOOGLE_API_KEY:
        return "MANUAL_REVIEW"

    prompt = f"""
    Analyze this email reply regarding 'Lafayette Pilot' or 'Investment'.
    Classify into ONE status: 'INTERESTED', 'NOT_INTERESTED', 'MEETING_REQUEST', 'OUT_OF_OFFICE', or 'OTHER'.

    Email Body:
    {body[:1000]}
    """
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"AI_ERROR"

def main():
    print("🦚 Jules (Ultimatum V7) Active: Scanning Inbox...")

    try:
        # 1. Connect to Email (Porkbun)
        mail = imaplib.IMAP4_SSL(IMAP_HOST)
        mail.login(EMAIL_USER, EMAIL_PASS)
        mail.select("inbox")

        # 2. Search Unread
        status, messages = mail.search(None, '(UNSEEN)')
        email_ids = messages.split()

        if not email_ids:
            print("✅ No new emails.")
            return

        # 3. Connect to Sheets (Graceful Fallback)
        worksheet = None
        if os.path.exists(GOOGLE_CREDS) and SHEET_ID:
            try:
                gc = gspread.service_account(filename=GOOGLE_CREDS)
                sh = gc.open_by_key(SHEET_ID)
                worksheet = sh.worksheet(os.getenv("WORKSHEET_NAME", "Startup Follow-Up"))
            except Exception as e:
                print(f"⚠️ Sheets Error: {e}")

        for e_id in email_ids:
            _, msg_data = mail.fetch(e_id, '(RFC822)')
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part)
                    if msg["Subject"]:
                        subject, encoding = decode_header(msg["Subject"])[0]
                        if isinstance(subject, bytes):
                            subject = subject.decode(encoding if encoding else "utf-8")
                    else:
                        subject = "(No Subject)"
                    sender = msg.get("From")

                    # Extract Body
                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain":
                                body = part.get_payload(decode=True).decode()
                                break
                    else:
                        body = msg.get_payload(decode=True).decode()

                    # Analyze
                    intent = analyze_email_intent(body)
                    print(f"📧 New Email from {sender}: {intent}")

                    # Update Sheet
                    if worksheet:
                        worksheet.append_row([str(datetime.now()), sender, subject, intent, "Pending Action"])

                    # Notify
                    if intent in ['INTERESTED', 'MEETING_REQUEST']:
                        send_telegram(f"🚀 BOOM! Positive reply from {sender}.\nStatus: {intent}\nCheck Dashboard.")

    except Exception as e:
        print(f"❌ Critical Error: {e}")
        send_telegram(f"⚠️ Jules Failure: {e}")

    print("✅ Cycle Complete.")

if __name__ == "__main__":
    main()
