#!/bin/bash
# Vercel Token Validation Script
# This script validates that the VERCEL_TOKEN secret has the correct format
# Usage: ./scripts/validate_vercel_token.sh

set -e

echo "🔍 Validating Vercel Token Format..."

# Check if VERCEL_TOKEN is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ ERROR: VERCEL_TOKEN environment variable is not set"
    echo ""
    echo "Please set VERCEL_TOKEN as a GitHub secret or environment variable."
    echo "See docs/VERCEL_TOKEN_SETUP.md for instructions."
    exit 1
fi

# Check if token contains a period (invalid for Vercel CLI)
if [[ "$VERCEL_TOKEN" == *"."* ]]; then
    echo "❌ ERROR: VERCEL_TOKEN contains a period character ('.')"
    echo ""
    echo "This is not a valid Vercel CLI token format."
    echo "Common causes:"
    echo "  - You might be using a JWT token instead of a Vercel CLI token"
    echo "  - The token was copied incorrectly"
    echo ""
    echo "Solution:"
    echo "  1. Go to https://vercel.com/account/tokens"
    echo "  2. Create a new token"
    echo "  3. Update the VERCEL_TOKEN GitHub secret with the new token"
    echo ""
    echo "See docs/VERCEL_TOKEN_SETUP.md for detailed instructions."
    exit 1
fi

# Check if token is empty or contains only whitespace
if [[ -z "${VERCEL_TOKEN// }" ]]; then
    echo "❌ ERROR: VERCEL_TOKEN is empty or contains only whitespace"
    exit 1
fi

# Check token length (Vercel tokens are typically 24-32 characters)
TOKEN_LENGTH=${#VERCEL_TOKEN}
if [ $TOKEN_LENGTH -lt 20 ]; then
    echo "⚠️  WARNING: VERCEL_TOKEN seems too short (length: $TOKEN_LENGTH)"
    echo "This might not be a valid token. Typical Vercel tokens are 24-32 characters."
fi

echo "✅ VERCEL_TOKEN format validation passed"
echo "Token length: $TOKEN_LENGTH characters"
echo ""
echo "Note: This only validates the format, not whether the token is valid/active."
echo "The actual token validity will be checked during deployment."
