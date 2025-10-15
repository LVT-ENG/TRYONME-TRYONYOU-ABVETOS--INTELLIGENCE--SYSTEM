#!/bin/bash
# ==============================================================
# TRYONYOU – Automatic Domain Connection Script (Vercel CLI)
# ==============================================================
# Author: Ruben Espinar Rodríguez
# Project: TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
# ==============================================================

echo "🚀 Connecting TRYONYOU.APP to project tryonyou-master..."

# Ensure login
vercel login

# Link project
vercel link --project tryonyou-master --yes

# Add and assign domain tryonyou.app
vercel domains add tryonyou.app || true
vercel domains assign tryonyou.app --project tryonyou-master

# Add www subdomain
vercel domains add www.tryonyou.app || true
vercel domains assign www.tryonyou.app --project tryonyou-master

# Optional redirect from abvetos.com → tryonyou.app
vercel redirect add abvetos.com/* https://tryonyou.app/\$1 --status 308 || true

echo "✅ Domain configuration complete!"
echo "🌍 Verify online: https://tryonyou.app"
