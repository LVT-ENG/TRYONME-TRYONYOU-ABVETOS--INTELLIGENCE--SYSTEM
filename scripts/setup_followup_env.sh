#!/bin/bash

# Configuration for Follow-Up Manager
export SHEET_ID="TU_SHEET_ID"
export WORKSHEET_NAME="Startup Follow-Up"
export GOOGLE_CREDS_JSON="/ruta/service_account.json"

export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USER="tu_email@gmail.com"
export SMTP_PASS="tu_app_password"
export FROM_EMAIL="tu_email@gmail.com"
export FROM_NAME="Rubén Espinar"

export DRY_RUN="1"

echo "Environment configured for Dry Run."
