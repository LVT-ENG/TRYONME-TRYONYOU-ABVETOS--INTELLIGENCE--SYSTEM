#!/bin/bash
set -e

DOMAIN="tryonyou.app"

echo "🌐 Setting up Vercel domain: $DOMAIN"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI could not be found. Please install it with 'npm i -g vercel'."
    exit 1
fi

echo "ℹ️  Adding domain $DOMAIN..."
# Attempt to add the domain. This requires the user to be logged in.
# We use --yes to skip confirmation prompts if possible, but strict auth is needed.
vercel domains add "$DOMAIN" --prod || echo "⚠️  Failed to add domain. Ensure you are logged in via 'vercel login'."

echo "🔒 Verifying SSL configuration..."
# Vercel handles SSL automatically, but we can inspect it.
vercel domains inspect "$DOMAIN" || echo "⚠️  Could not inspect domain."

echo "✅ Domain setup script finished."
