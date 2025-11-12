# ============================================================
# TRYONYOU RETRODEPLOY — Makefile
# Build + Commit + Vercel Deploy Automation
# ============================================================

.PHONY: all build commit deploy clean install help

# Default target
all: install build commit deploy

# Help target
help:
	@echo "════════════════════════════════════════════════════════════════"
	@echo "  TRYONYOU RETRODEPLOY — Makefile Commands"
	@echo "════════════════════════════════════════════════════════════════"
	@echo ""
	@echo "  make all       - Full pipeline: install, build, commit, deploy"
	@echo "  make install   - Install npm dependencies"
	@echo "  make build     - Build project with Vite 7.1.2"
	@echo "  make commit    - Commit and push changes to main"
	@echo "  make deploy    - Deploy to Vercel production"
	@echo "  make clean     - Clean build artifacts and logs"
	@echo "  make watch     - Start watcher daemon for auto-sync"
	@echo "  make help      - Show this help message"
	@echo ""
	@echo "════════════════════════════════════════════════════════════════"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@cd .. && npm install
	@echo "✅ Dependencies installed"

# Build project with Vite
build:
	@echo "🔨 Building project with Vite 7.1.2..."
	@cd .. && npm run build
	@echo "✅ Build completed"

# Commit changes to main
commit:
	@echo "💾 Committing changes to main branch..."
	@cd .. && git add .
	@cd .. && git commit -m "🚀 RETRODEPLOY: Auto-commit $(shell date +%Y%m%d_%H%M%S)" || echo "⚠️  No changes to commit"
	@cd .. && git push origin main || echo "⚠️  Push failed - may need manual intervention"
	@echo "✅ Changes committed and pushed"

# Deploy to Vercel production
deploy:
	@echo "🚀 Deploying to Vercel production (tryonyou.app)..."
	@if command -v vercel &> /dev/null; then \
		cd .. && vercel --prod --yes; \
		echo "✅ Deployed to https://tryonyou.app"; \
	else \
		echo "⚠️  Vercel CLI not found. Install with: npm install -g vercel"; \
		exit 1; \
	fi

# Clean build artifacts and logs
clean:
	@echo "🧹 Cleaning build artifacts and logs..."
	@cd .. && rm -rf dist node_modules/.vite
	@rm -f retrodeploy.log
	@echo "✅ Clean completed"

# Start watcher daemon
watch:
	@echo "👁️  Starting watcher daemon..."
	@if [ -f watcher.js ]; then \
		node watcher.js; \
	else \
		echo "⚠️  watcher.js not found"; \
		exit 1; \
	fi

# Quick deploy (build + deploy only)
quick:
	@echo "⚡ Quick deploy (build + deploy)..."
	@$(MAKE) build
	@$(MAKE) deploy

# Full retrodeploy (use deploy.sh)
retrodeploy:
	@echo "🎯 Running full retrodeploy script..."
	@./deploy.sh

# Verify deployment
verify:
	@echo "🔍 Verifying deployment..."
	@HTTP_CODE=$$(curl -s -o /dev/null -w "%{http_code}" https://tryonyou.app); \
	if [ "$$HTTP_CODE" = "200" ]; then \
		echo "✅ tryonyou.app is responding with 200 OK"; \
	else \
		echo "⚠️  tryonyou.app responded with code: $$HTTP_CODE"; \
	fi

# Check logs
logs:
	@if [ -f retrodeploy.log ]; then \
		tail -n 50 retrodeploy.log; \
	else \
		echo "⚠️  No log file found"; \
	fi
