#!/bin/bash

# TRYONYOU - Vercel Domain Configuration Script
# This script configures tryonyou.app as the primary domain in Vercel

set -e

echo "🚀 TRYONYOU - Vercel Domain Configuration"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Export environment variables
export VERCEL_TOKEN="t9mc4kHGRS0VTWBR6qtJmvOw"
export VERCEL_PROJECT_ID="prj_Wkq9QCEn6RJr3x7AMpNkbIZ2Z2AX4"
export VERCEL_TEAM_ID="team_SDhjSkxLVE7oJ3S5KPkwG9uC"

echo "✅ Environment variables configured"
echo ""

# Login to Vercel (using token)
echo "🔐 Authenticating with Vercel..."
vercel login --token "$VERCEL_TOKEN" 2>/dev/null || echo "Already authenticated"
echo ""

# Link project
echo "🔗 Linking project..."
vercel link --yes --token "$VERCEL_TOKEN" --project "$VERCEL_PROJECT_ID" --scope "$VERCEL_TEAM_ID" 2>/dev/null || echo "Project already linked"
echo ""

# List current domains
echo "📋 Current domains for this project:"
vercel domains ls --token "$VERCEL_TOKEN" --scope "$VERCEL_TEAM_ID" 2>/dev/null || echo "No domains found"
echo ""

# Add tryonyou.app domain if not already added
echo "➕ Adding tryonyou.app domain..."
vercel domains add tryonyou.app --token "$VERCEL_TOKEN" --scope "$VERCEL_TEAM_ID" 2>/dev/null || echo "Domain already added or needs DNS configuration"
echo ""

# Add www.tryonyou.app domain if not already added
echo "➕ Adding www.tryonyou.app domain..."
vercel domains add www.tryonyou.app --token "$VERCEL_TOKEN" --scope "$VERCEL_TEAM_ID" 2>/dev/null || echo "Domain already added or needs DNS configuration"
echo ""

echo "✅ Domain configuration completed!"
echo ""
echo "📝 Next steps:"
echo "1. Verify DNS records are correctly configured:"
echo "   - Type: A"
echo "   - Name: @"
echo "   - Value: 76.76.21.21"
echo ""
echo "   - Type: CNAME"
echo "   - Name: www"
echo "   - Value: cname.vercel-dns.com"
echo ""
echo "2. Go to Vercel Dashboard: https://vercel.com/dashboard"
echo "3. Select your project: TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
echo "4. Go to Settings → Domains"
echo "5. Set tryonyou.app as Primary Domain"
echo "6. Verify SSL certificate is active"
echo ""
echo "🔒 To lock the domain and prevent future changes:"
echo "   Contact Vercel support or use the dashboard to set domain protection"
echo ""
echo "🌐 Your site will be available at:"
echo "   - https://tryonyou.app (Primary)"
echo "   - https://www.tryonyou.app (Redirect to primary)"
echo ""
