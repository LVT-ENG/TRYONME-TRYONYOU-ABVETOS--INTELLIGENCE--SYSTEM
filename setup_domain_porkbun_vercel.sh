#!/bin/bash

clear
echo "=============================================="
echo " AGENTE 70 — CONFIGURACIÓN AUTOMÁTICA PORKBUN "
echo "=============================================="

# --- CONFIGURACIÓN -----------------------------
DOMAIN="tryonyou.app"
SUB1="www"
VERCEL_PROJECT="tryonme-tryonyou-abvetos-intelligence--system"

# --- PEDIR API KEYS ----------------------------
echo "Introduce tu API Key de Porkbun:"
read API_KEY

echo "Introduce tu Secret Key de Porkbun:"
read SECRET_KEY

# --- CREAR DNS ----------------------------
echo "👉 Creando DNS en Porkbun…"

curl -s -X POST "https://porkbun.com/api/json/v3/dns/create/$DOMAIN" \
    -H "Content-Type: application/json" \
    -d "{
        \"apikey\": \"$API_KEY\",
        \"secretapikey\": \"$SECRET_KEY\",
        \"type\": \"CNAME\",
        \"name\": \"$SUB1\",
        \"content\": \"cname.vercel-dns.com\"
    }"

echo ""
echo "✅ DNS creado correctamente en Porkbun."
sleep 1


# --- AÑADIR DOMINIO A VERCEL -------------------------
echo "👉 Añadiendo dominio a Vercel…"

vercel domains add $DOMAIN
vercel domains add $SUB1.$DOMAIN

echo ""
echo "👉 Activando HTTPS…"
vercel certs issue $DOMAIN $SUB1.$DOMAIN

# --- MOSTRAR RESULTADOS -------------------------
echo ""
echo "=============================================="
echo "  ✅ DOMINIO CONFIGURADO Y PUBLICADO"
echo "=============================================="
echo "🔗 Dominio raíz:  https://$DOMAIN"
echo "🔗 Subdominio:    https://$SUB1.$DOMAIN"
echo ""
echo "👉 Si algo tarda en funcionar, espera 5–10 minutos por propagación DNS."
echo "=============================================="
