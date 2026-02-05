#!/bin/bash
set -e

echo "=== STARTING CUSTOM BUILD SCRIPT ==="
echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"
echo "Current Directory: $(pwd)"

# Ensure we are in the root
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in root!"
    exit 1
fi

echo "=== INSTALLING DEPENDENCIES ==="
# Use ci if lockfile exists, otherwise install
if [ -f "package-lock.json" ]; then
    npm ci --legacy-peer-deps
else
    npm install --legacy-peer-deps
fi

echo "=== BUILDING FRONTEND ==="
npm run build

echo "=== VERIFYING ARTIFACTS ==="
if [ -d "dist" ]; then
    echo "Dist directory exists."
    ls -la dist/
else
    echo "Error: Dist directory was not created!"
    exit 1
fi

echo "=== BUILD SUCCESSFUL ==="
