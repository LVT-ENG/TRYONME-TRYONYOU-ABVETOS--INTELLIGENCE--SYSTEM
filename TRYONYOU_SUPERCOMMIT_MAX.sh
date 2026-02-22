#!/bin/bash
set -e
set -o pipefail

# Define paths
LOG_FILE="logs/audit_lafayette.log"
CERT_FILE="CERTIFICAT_TECHNIQUE_V9.md"
README_FILE="README.md"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# Ensure logs directory exists
mkdir -p logs

echo "--- STARTING SUPERCOMMIT MAX ---" | tee -a "$LOG_FILE"
echo "Date: $TIMESTAMP" | tee -a "$LOG_FILE"

# 1. Regenerate Inventory
echo "[1/4] Regenerating Inventory..." | tee -a "$LOG_FILE"
if [ -f "regenerate_inventory.py" ]; then
    python3 regenerate_inventory.py 2>&1 | tee -a "$LOG_FILE"
else
    echo "Error: regenerate_inventory.py not found." | tee -a "$LOG_FILE"
    exit 1
fi

# 2. Zero Tallas Compliance Check
echo "[2/4] Verifying 'Zero Tallas' Compliance..." | tee -a "$LOG_FILE"
# Check for forbidden terms in src/ excluding specific files
FORBIDDEN_TERMS="peso|talla|weight|size"
# We exclude inventory_index.json and any matches that look like css properties (e.g. font-size, background-size)
# This is a basic grep check. If it finds matches that are not excluded, it should warn or fail.
# For now, we will just log occurrences.
if grep -rE "$FORBIDDEN_TERMS" src/ --exclude="inventory_index.json" | grep -vE "font-size|background-size|resize"; then
    echo "ERROR: Potential 'Zero Tallas' violations found. Compliance Failed. See log for details." | tee -a "$LOG_FILE"
    exit 1
else
    echo "COMPLIANT: No forbidden terms found." | tee -a "$LOG_FILE"
fi

# 3. Build Project
echo "[3/4] Building Project..." | tee -a "$LOG_FILE"
npm run build 2>&1 | tee -a "$LOG_FILE"

# 4. Stamp Certificates
echo "[4/4] Stamping Certificates..." | tee -a "$LOG_FILE"

if [ -f "$CERT_FILE" ]; then
    echo "Validated on: $TIMESTAMP" >> "$CERT_FILE"
    echo "Stamped $CERT_FILE" | tee -a "$LOG_FILE"
else
    echo "Warning: $CERT_FILE not found." | tee -a "$LOG_FILE"
fi

if [ -f "$README_FILE" ]; then
    # Check if already stamped to avoid duplication, or just append
    echo "" >> "$README_FILE"
    echo "**Certified Technical Validation: $TIMESTAMP**" >> "$README_FILE"
    echo "Stamped $README_FILE" | tee -a "$LOG_FILE"
else
    echo "Warning: $README_FILE not found." | tee -a "$LOG_FILE"
fi

echo "--- SUPERCOMMIT MAX COMPLETE ---" | tee -a "$LOG_FILE"
