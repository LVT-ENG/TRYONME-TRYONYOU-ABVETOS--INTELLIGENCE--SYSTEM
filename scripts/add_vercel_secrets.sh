#!/bin/bash

# Script to add Vercel secrets interactively
echo "Adding EMAIL_USER..."
vercel env add EMAIL_USER production

echo "Adding EMAIL_PASS..."
vercel env add EMAIL_PASS production

echo "Adding SHEET_NAME..."
vercel env add SHEET_NAME production

echo "Adding GOOGLE_CREDENTIALS_JSON..."
vercel env add GOOGLE_CREDENTIALS_JSON production

echo "Done!"
