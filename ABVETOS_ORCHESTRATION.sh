#!/bin/bash
# ======================================================
# ABVETOS_ORCHESTRATION.sh — Maximum Orchestration Mode
# Llama internamente al Flujo 345
# ======================================================

set -e
clear
echo "🧩 TRYONYOU–ABVETOS–ULTRA-PLUS–ULTIMATUM"
echo "⚙️  MODO: ORQUESTACIÓN MÁXIMA (Flujo 345)"
echo "──────────────────────────────────────────"

[[ -z "$VERCEL_TOKEN" ]] && echo "❌ Falta VERCEL_TOKEN" && exit 1
[[ -z "$TELEGRAM_BOT_TOKEN" ]] && echo "❌ Falta TELEGRAM_BOT_TOKEN" && exit 1
[[ -z "$TELEGRAM_CHAT_ID" ]] && echo "❌ Falta TELEGRAM_CHAT_ID" && exit 1

./ABVETOS_FLOW_345.sh

echo "💾 Guardando logs..."
mkdir -p ./system/logs
cp deploy.log ./system/logs/$(date '+%Y%m%d_%H%M')_flow345.log

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d text="🦚 Flujo 345 completado y registrado — $(date '+%Y-%m-%d %H:%M:%S')" > /dev/null
