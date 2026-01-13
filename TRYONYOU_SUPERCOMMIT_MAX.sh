#!/bin/bash
echo "Sincronizando Ecosistema TryOnYou..."

# Cleanup
echo "Performing cleanup..."
rm -rf node_modules dist .next legacy legacy_old

# Create Directory Structure
echo "Creating directory structure..."
mkdir -p docs/arquitectura_empresa docs/patent_EPCT docs/investor_edition
mkdir -p public/assets/hero public/assets/modules public/assets/investor public/assets/vision public/assets/google_news
mkdir -p src/modules src/components src/pages

# Create .keep files
touch docs/arquitectura_empresa/.keep docs/patent_EPCT/.keep docs/investor_edition/.keep
touch public/assets/hero/.keep public/assets/modules/.keep public/assets/investor/.keep public/assets/vision/.keep public/assets/google_news/.keep

# Run Orchestrator
echo "Running Orchestrator..."
python3 tryonyou_master_orchestrator.py

echo "System Ready"
