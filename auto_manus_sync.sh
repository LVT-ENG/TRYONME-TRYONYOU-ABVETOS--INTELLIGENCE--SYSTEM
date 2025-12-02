#!/bin/bash
# AUTO-MANUS-SYNC.sh
# Automated deployment and sync script for TRYONYOU project
# This script helps you set up and deploy your project online

set -e

echo "🚀 TRYONYOU - Auto Manus Sync Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check for required tools
check_dependencies() {
    echo ""
    echo "📋 Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    print_status "Node.js found: $(node --version)"
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    print_status "npm found: $(npm --version)"
    
    if ! command -v git &> /dev/null; then
        print_warning "git is not installed. Some features may not work."
    else
        print_status "git found: $(git --version)"
    fi
}

# Install dependencies
install_dependencies() {
    echo ""
    echo "📦 Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        rm package-lock.json
        print_status "Removed old package-lock.json"
    fi
    
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        print_status "Removed old node_modules"
    fi
    
    npm install
    print_status "Dependencies installed successfully"
}

# Build the project
build_project() {
    echo ""
    echo "🔨 Building project..."
    
    npm run build
    print_status "Project built successfully"
    
    if [ -d "dist" ]; then
        print_status "Build output available in ./dist"
    fi
}

# Start development server
start_dev() {
    echo ""
    echo "🌐 Starting development server..."
    npm run dev
}

# Deploy to GitHub Pages (if configured)
deploy_github_pages() {
    echo ""
    echo "🚀 Deploying to GitHub Pages..."
    
    if [ ! -d ".git" ]; then
        print_error "This is not a git repository. Initialize git first."
        return 1
    fi
    
    # Build first
    build_project
    
    # Deploy dist folder
    if [ -d "dist" ]; then
        cd dist
        git init
        git add -A
        git commit -m "Deploy to GitHub Pages"
        print_status "Deployment prepared. Push to your gh-pages branch manually."
        cd ..
    fi
}

# Show help
show_help() {
    echo ""
    echo "Usage: ./auto_manus_sync.sh [command]"
    echo ""
    echo "Commands:"
    echo "  install    Install/reinstall all dependencies"
    echo "  build      Build the project for production"
    echo "  dev        Start the development server"
    echo "  deploy     Build and prepare for deployment"
    echo "  all        Run full setup (install + build)"
    echo "  help       Show this help message"
    echo ""
}

# Main execution
main() {
    check_dependencies
    
    case "${1:-all}" in
        install)
            install_dependencies
            ;;
        build)
            build_project
            ;;
        dev)
            start_dev
            ;;
        deploy)
            deploy_github_pages
            ;;
        all)
            install_dependencies
            build_project
            echo ""
            print_status "Setup complete! Run 'npm run dev' to start the development server."
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
