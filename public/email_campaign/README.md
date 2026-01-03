# Email Campaign Script

This directory contains the Python script and assets for sending the TryOnYou Pilot campaign emails.

## Setup

1.  **Install Dependencies**
    The script uses standard libraries, but if you need to regenerate the PDF, you need `fpdf`.
    ```bash
    pip install fpdf
    ```

2.  **Environment Variables**
    Rename `.env.example` to `.env` (or set these variables in your environment) and fill in your SMTP credentials.
    ```bash
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_app_password
    ```

3.  **Assets**
    **IMPORTANT**: The image files in `assets/` are currently placeholders. Please replace them with your actual high-resolution images before running the campaign.
    - `assets/logo.png`: Your brand logo.
    - `assets/demo.png`: The main visual for the email.

4.  **Contacts**
    Edit `contacts.csv` to add your real recipients. The `language` column supports `en`, `fr`, and `es`.

## Usage

Run the script in "Dry Run" mode first (default) to verify logic without sending emails.

```bash
python3 send_pilot_emails.py
```

To send real emails, set `DRY_RUN=False` in the script or via environment variable:

```bash
DRY_RUN=False python3 send_pilot_emails.py
```
