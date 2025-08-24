#!/bin/bash

# TRYONME/TRYONYOU - AVBETOS Intelligence System
# Repository Clone and Setup Script

set -e

echo "🚀 Cloning TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM repository..."

# Clone the repository
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git

# Navigate to project directory
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

echo "✅ Repository cloned successfully!"
echo "📁 Project directory: $(pwd)"

# Check if package.json exists before running npm commands
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
    
    # Copy environment file if it exists
    if [ -f ".env.example" ]; then
        echo "⚙️ Setting up environment configuration..."
        cp .env.example .env
        echo "📝 Please edit .env file with your configuration"
    fi
    
    echo "🎉 Setup complete! Run 'npm run dev' to start development server"
else
    echo "📋 No package.json found. Manual setup may be required."
fi

echo ""
echo "🔧 Next steps:"
echo "   cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
echo "   # Configure your .env file if needed"
echo "   # npm run dev (if applicable)"