#!/bin/zsh
echo "🦚 Building Hub71 Application Pack for TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"

NAME="Rubén Espinar"
EMAIL="ceo@tryonyou.app"
PROJECT="TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM"
PCT="PCT/EP2025/067317"

# JSON form
cat > hub71_application_form.json <<EOF
{
  "founder": "$NAME",
  "email": "$EMAIL",
  "company": "TRYONYOU IP Holding FZ-LLC",
  "project": "$PROJECT",
  "pct_number": "$PCT",
  "stage": "Pre-incorporation (IP Holding)",
  "sector": "Fashion-Technology / AI",
  "requested_support": ["Incorporation fees", "Housing", "Visa"]
}
EOF

# Cover letter
cat > cover_letter.txt <<EOF
Dear Hub71 Selection Team,

I, $NAME, inventor of the patented fashion-technology system $PROJECT (PCT $PCT),
request inclusion in Hub71’s incubation program.
The project integrates AI, virtual fashion try-on, biometric payment and sustainability analytics.
I kindly request sponsorship for incorporation and initial housing under your startup support scheme.

Sincerely,
Rubén Espinar
EOF

# Executive summary PDF
cat > summary.md <<EOF
# TRYONYOU – ABVETOS – ULTRA – PLUS – ULTIMATUM
**International PCT:** $PCT  
**Founder:** $NAME  
**Focus:** AI-driven fashion ecosystem (TRYONYOU platform, ABVET biometric system, ABVETOS orchestrator).
EOF
pypandoc --from=md --to=pdf -o executive_summary.pdf summary.md

echo "✅ Application files generated in $(pwd)"
echo "📧 Send manually to: apply@hub71.com"
