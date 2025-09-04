#!/bin/bash
# Post-Deployment QA Validation Script
# Tests the deployed application for all required functionality

set -e

# Configuration
DOMAIN_PRIMARY="https://tryonyou-abvetos-ultra-plus-ultimatum.vercel.app"
DOMAIN_SECONDARY="https://tryonme-tryonyou-abvetos-intelligence-system.vercel.app"

echo "🔍 Starting Post-Deployment QA Validation..."
echo "Primary domain: $DOMAIN_PRIMARY"
echo "Secondary domain: $DOMAIN_SECONDARY"
echo ""

# Function to check URL response
check_url() {
    local url=$1
    local expected_status=${2:-200}
    local description=$3
    
    echo "🌐 Testing: $description"
    echo "   URL: $url"
    
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    
    if [ "$status_code" = "$expected_status" ]; then
        echo "   ✅ SUCCESS - Status: $status_code"
    else
        echo "   ❌ FAILED - Expected: $expected_status, Got: $status_code"
        return 1
    fi
    echo ""
}

# Function to check if content exists
check_content() {
    local url=$1
    local search_text=$2
    local description=$3
    
    echo "🔍 Checking content: $description"
    echo "   URL: $url"
    echo "   Looking for: $search_text"
    
    if curl -s "$url" | grep -q "$search_text"; then
        echo "   ✅ SUCCESS - Content found"
    else
        echo "   ❌ FAILED - Content not found"
        return 1
    fi
    echo ""
}

# Test Health API endpoint
test_health_api() {
    local domain=$1
    echo "🏥 Testing Health API endpoint..."
    
    health_response=$(curl -s "$domain/api/health" || echo "")
    
    if echo "$health_response" | grep -q '"ok":true'; then
        echo "   ✅ Health API responding correctly"
        echo "   Response: $health_response"
    else
        echo "   ❌ Health API failed"
        echo "   Response: $health_response"
        return 1
    fi
    echo ""
}

# Main validation tests
echo "📋 Running comprehensive QA tests..."
echo ""

# Test 1: Primary domain accessibility
check_url "$DOMAIN_PRIMARY" 200 "Primary domain accessibility"

# Test 2: Health API endpoint
test_health_api "$DOMAIN_PRIMARY"

# Test 3: Check for video content
check_content "$DOMAIN_PRIMARY" "video_portada.mp4" "Video background presence"

# Test 4: Check for Avatar Pau content
check_content "$DOMAIN_PRIMARY" "Avatar Pau" "Avatar Pau section"

# Test 5: Check for wardrobes content
check_content "$DOMAIN_PRIMARY" "Armarios Digitales" "Digital wardrobes section"

# Test 6: Check for main title
check_content "$DOMAIN_PRIMARY" "TryonU Luxury Digital Workflow Experience" "Main application title"

# Test 7: Check for catalog section
check_content "$DOMAIN_PRIMARY" "Catálogo TryOnYou" "Product catalog section"

echo "🎉 QA Validation completed!"
echo ""
echo "📸 Next step: Take screenshot for issue documentation"
echo "🔗 Visit: $DOMAIN_PRIMARY"