# TRYONYOU RETRODEPLOY Makefile
# Automates: Build + Commit + Vercel Deploy

.PHONY: help install build commit deploy clean all status verify

# Default target
help:
	@echo "🚀 TRYONYOU RETRODEPLOY - Available Commands:"
	@echo ""
	@echo "  make install    - Install npm dependencies"
	@echo "  make build      - Build with Vite 7.1.2"
	@echo "  make commit     - Commit and push to main"
	@echo "  make deploy     - Deploy to Vercel production"
	@echo "  make all        - Run: install + build + commit + deploy"
	@echo "  make status     - Check deployment status"
	@echo "  make verify     - Verify tryonyou.app is responding"
	@echo "  make clean      - Clean build artifacts"
	@echo ""

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@cd .. && npm install
	@echo "✅ Dependencies installed"

# Build with Vite
build:
	@echo "🔨 Building with Vite 7.1.2..."
	@cd .. && npm run build
	@echo "✅ Build completed"

# Commit and push to GitHub
commit:
	@echo "📝 Committing changes to main branch..."
	@cd .. && git checkout main || git checkout -b main
	@cd .. && git add .
	@cd .. && git commit -m "🚀 Retrodeploy: Auto-commit $(shell date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️  No changes to commit"
	@cd .. && git push origin main
	@echo "✅ Changes committed and pushed"

# Deploy to Vercel
deploy:
	@echo "🌍 Deploying to Vercel production..."
	@if [ -z "$$VERCEL_TOKEN" ]; then \
		echo "⚠️  VERCEL_TOKEN not set in .env"; \
		exit 1; \
	fi
	@cd .. && vercel --prod --token $$VERCEL_TOKEN --yes
	@echo "✅ Deployed to Vercel"

# Run all steps
all: install build commit deploy verify
	@echo "🎉 Complete deployment pipeline finished!"

# Check deployment status
status:
	@echo "📊 Checking deployment status..."
	@cd .. && git status
	@echo ""
	@echo "Last commit:"
	@cd .. && git log -1 --oneline

# Verify tryonyou.app is responding
verify:
	@echo "🔍 Verifying tryonyou.app..."
	@HTTP_CODE=$$(curl -s -o /dev/null -w "%{http_code}" https://tryonyou.app); \
	if [ "$$HTTP_CODE" = "200" ]; then \
		echo "✅ tryonyou.app is responding (HTTP $$HTTP_CODE)"; \
	else \
		echo "❌ tryonyou.app returned HTTP $$HTTP_CODE"; \
		exit 1; \
	fi

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	@cd .. && rm -rf dist
	@cd .. && rm -rf node_modules/.vite
	@echo "✅ Clean completed"
