#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os, sys, ssl, smtplib
from email.message import EmailMessage
from datetime import datetime, timezone

try:
    import gspread
    from google.oauth2.service_account import Credentials
except Exception as e:
    print("Missing deps. Run:\n  pip install gspread google-auth", file=sys.stderr)
    raise

DATE_FMT = "%Y-%m-%d"

STATUSES = {
    "Contacted",
    "Pending reply",
    "Follow-up sent",
    "Interested",
    "Not interested",
    "Meeting scheduled",
    "Closed / In discussion",
}

def env(name: str, default: str | None = None) -> str:
    v = os.getenv(name, default)
    if v is None or v == "":
        raise SystemExit(f"Missing env var: {name}")
    return v

def normalize(s: str) -> str:
    return (s or "").strip()

def today_utc_str() -> str:
    return datetime.now(timezone.utc).strftime(DATE_FMT)

def send_email_smtp(to_email: str, subject: str, body_text: str) -> None:
    host = env("SMTP_HOST")
    port = int(env("SMTP_PORT", "587"))
    user = env("SMTP_USER")
    password = env("SMTP_PASS")
    from_email = env("FROM_EMAIL", user)
    from_name = os.getenv("FROM_NAME", "TRYONYOU")

    msg = EmailMessage()
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body_text)

    context = ssl.create_default_context()
    with smtplib.SMTP(host, port, timeout=30) as server:
        server.ehlo()
        if port == 587:
            server.starttls(context=context)
            server.ehlo()
        server.login(user, password)
        server.send_message(msg)

def build_followup_email(name: str, company: str | None = None) -> tuple[str, str]:
    name = normalize(name) or "there"
    company = normalize(company) or ""
    company_line = f" ({company})" if company else ""

    subject = f"Follow-up{company_line} — TRYONYOU equity offer (500,000€ for 20%)"

    body = f"""Hi {name},

Quick follow-up in case my previous note got buried.

We’re opening a simple equity round for TRYONYOU:
• Investment: 500,000 €
• Equity: 20%

If you’re still open to reviewing it, I can share:
• 1-page overview + deck
• short demo links
• dataroom access under NDA

If this isn’t a fit, just reply “pass” and I’ll close the loop.

Best,
Rubén Espinar
TRYONYOU
"""
    return subject, body

def append_note(existing: str, new_note: str) -> str:
    existing = (existing or "").strip()
    if not existing:
        return new_note
    if existing.endswith("\n"):
        return existing + new_note
    return existing + "\n" + new_note

def main():
    sheet_id = env("SHEET_ID")                 # e.g. 1AbC... or from URL
    worksheet_name = env("WORKSHEET_NAME")     # e.g. "Startup Follow-Up"
    creds_path = env("GOOGLE_CREDS_JSON")      # path to service account json
    dry_run = os.getenv("DRY_RUN", "1").strip() in {"1", "true", "TRUE", "yes", "YES"}
    status_targets = {s.strip() for s in os.getenv("TARGET_STATUSES", "Pending reply,Contacted").split(",") if s.strip()}

    for s in status_targets:
        if s not in STATUSES:
            print(f"Warning: TARGET_STATUSES contains unknown status: {s}", file=sys.stderr)

    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ]
    creds = Credentials.from_service_account_file(creds_path, scopes=scopes)
    gc = gspread.authorize(creds)

    sh = gc.open_by_key(sheet_id)
    ws = sh.worksheet(worksheet_name)

    rows = ws.get_all_records()
    if not rows:
        raise SystemExit("No rows found in worksheet.")

    headers = ws.row_values(1)
    header_map = {h: i + 1 for i, h in enumerate(headers)}  # 1-based col index

    def col(name_candidates: list[str]) -> str:
        for c in name_candidates:
            if c in header_map:
                return c
        raise SystemExit(f"Missing required column. Expected one of: {name_candidates}. Found: {headers}")

    col_email = col(["Email", "E-mail", "email"])
    col_name = col(["Name", "First Name", "Contact Name", "Contact"])
    col_company = None
    for opt in ["Company", "Organization", "Institution"]:
        if opt in header_map:
            col_company = opt
            break

    col_status = col(["Status", "status"])
    col_last_action = col(["Last Action Date", "Last action", "Last Action"])
    col_next_action = col(["Next Action", "Next step", "Next"])
    col_offer_sent = col(["Offer Sent", "Offer", "OfferSent"])
    col_notes = col(["Notes / Comments", "Notes", "Comments"])

    col_offer_sent_date = None
    for opt in ["Offer Sent Date", "Offer Date", "OfferSentDate"]:
        if opt in header_map:
            col_offer_sent_date = opt
            break

    today = today_utc_str()
    updated_count = 0
    emailed_count = 0
    skipped = 0

    for idx, r in enumerate(rows, start=2):  # sheet row number starts at 2 for data
        email = normalize(r.get(col_email, ""))
        name = normalize(r.get(col_name, ""))
        company = normalize(r.get(col_company, "")) if col_company else ""
        status = normalize(r.get(col_status, ""))

        if not email:
            skipped += 1
            continue

        if status not in status_targets:
            skipped += 1
            continue

        subject, body = build_followup_email(name=name, company=company)

        if dry_run:
            print(f"[DRY_RUN] Would email: {email} | status={status} | row={idx}")
        else:
            send_email_smtp(email, subject, body)
            print(f"[SENT] {email} | row={idx}")
        emailed_count += 1

        new_status = "Follow-up sent"
        new_next_action = "Follow-up email sent"
        new_offer_sent = "YES"
        new_note = "Follow-up resent with equity terms"

        existing_notes = r.get(col_notes, "") or ""
        merged_notes = append_note(existing_notes, new_note)

        updates = []
        updates.append((idx, header_map[col_status], new_status))
        updates.append((idx, header_map[col_last_action], today))
        updates.append((idx, header_map[col_next_action], new_next_action))
        updates.append((idx, header_map[col_offer_sent], new_offer_sent))
        updates.append((idx, header_map[col_notes], merged_notes))
        if col_offer_sent_date:
            updates.append((idx, header_map[col_offer_sent_date], today))

        if dry_run:
            print(f"[DRY_RUN] Would update row={idx} -> Status='{new_status}', Last Action Date='{today}'")
        else:
            for rr, cc, val in updates:
                ws.update_cell(rr, cc, val)
        updated_count += 1

    print("\n=== SUMMARY ===")
    print(f"Dry run: {dry_run}")
    print(f"Emailed: {emailed_count}")
    print(f"Rows updated: {updated_count}")
    print(f"Skipped: {skipped}")

if __name__ == "__main__":
    main()
