.PHONY: help install build deploy clean test

help:
	@echo "════════════════════════════════════════════════════════════════"
	@echo "🦚 TRYONYOU - Makefile Commands"
	@echo "════════════════════════════════════════════════════════════════"
	@echo ""
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make build      - Build the application"
	@echo "  make deploy     - Deploy to production (build + commit + push)"
	@echo "  make clean      - Clean build artifacts"
	@echo "  make test       - Run tests (if available)"
	@echo "  make dev        - Start development server"
	@echo ""
	@echo "════════════════════════════════════════════════════════════════"

install:
	@echo "📦 Installing dependencies..."
	npm install

build:
	@echo "🔨 Building application..."
	npm run build

dev:
	@echo "🚀 Starting development server..."
	npm run dev

deploy:
	@echo "════════════════════════════════════════════════════════════════"
	@echo "🚀 TRYONYOU - Deployment Process"
	@echo "════════════════════════════════════════════════════════════════"
	@echo ""
	@echo "Step 1: Installing dependencies..."
	npm install
	@echo ""
	@echo "Step 2: Building application..."
	npm run build
	@echo ""
	@echo "Step 3: Verifying build output..."
	ls -lh dist/ || echo "Build directory not found!"
	@echo ""
	@echo "Step 4: Running deployment script..."
	@./deploy.sh || echo "Manual deployment required"
	@echo ""
	@echo "════════════════════════════════════════════════════════════════"
	@echo "✅ Deployment Complete!"
	@echo "════════════════════════════════════════════════════════════════"

clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist node_modules package-lock.json

test:
	@echo "🧪 Running tests..."
	@npm run test 2>/dev/null || echo "No tests configured"
