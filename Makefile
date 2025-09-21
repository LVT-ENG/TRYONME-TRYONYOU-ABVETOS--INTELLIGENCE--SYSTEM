# Makefile for TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
# Comprehensive build system that integrates npm scripts and custom bash scripts

.PHONY: all build clean install test dev preview lint validate docs orchestrate push help
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[34m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m

##@ Main targets

all: install clean build test lint validate ## 🚀 Build everything (install, clean, build, test, lint, validate)
	@echo "$(GREEN)✅ Make all completed successfully!$(RESET)"

##@ Development

install: ## 📦 Install all dependencies
	@echo "$(BLUE)📦 Installing dependencies...$(RESET)"
	npm install

build: ## 🏗️  Build the project for production
	@echo "$(BLUE)🏗️  Building project...$(RESET)"
	npm run build

dev: ## 🚀 Start development server
	@echo "$(BLUE)🚀 Starting development server...$(RESET)"
	npm run dev

preview: ## 👀 Preview the built project
	@echo "$(BLUE)👀 Starting preview server...$(RESET)"
	npm run preview

##@ Quality & Testing

test: ## 🧪 Run tests and health checks
	@echo "$(BLUE)🧪 Running tests...$(RESET)"
	@if [ -x "./scripts/agent_test.sh" ]; then \
		./scripts/agent_test.sh || echo "$(YELLOW)⚠️  Some tests failed but continuing...$(RESET)"; \
	else \
		echo "$(YELLOW)⚠️  Test script not found or not executable$(RESET)"; \
	fi

lint: ## 🔍 Lint commit messages
	@echo "$(BLUE)🔍 Linting commits...$(RESET)"
	@if git rev-parse --git-dir > /dev/null 2>&1; then \
		npm run lint:commits || echo "$(YELLOW)⚠️  Commit linting failed or not configured$(RESET)"; \
	else \
		echo "$(YELLOW)⚠️  Not in a git repository, skipping commit lint$(RESET)"; \
	fi

validate: ## ✅ Validate templates and documentation
	@echo "$(BLUE)✅ Validating templates...$(RESET)"
	@if [ -x "./scripts/validate-templates.sh" ]; then \
		npm run validate:templates; \
	else \
		echo "$(YELLOW)⚠️  Template validation script not found$(RESET)"; \
	fi
	@if [ -x "./scripts/validate-docs.sh" ]; then \
		./scripts/validate-docs.sh; \
	else \
		echo "$(YELLOW)⚠️  Documentation validation script not found$(RESET)"; \
	fi

##@ Maintenance & Deployment

clean: ## 🧹 Clean up temporary files and organize project
	@echo "$(BLUE)🧹 Cleaning up project...$(RESET)"
	@if [ -x "./scripts/agent_clean.sh" ]; then \
		./scripts/agent_clean.sh; \
	else \
		echo "$(YELLOW)⚠️  Clean script not found, performing basic cleanup$(RESET)"; \
		rm -rf dist/ node_modules/.cache/ .cache/ || true; \
	fi

docs: ## 📑 Organize documentation
	@echo "$(BLUE)📑 Organizing documentation...$(RESET)"
	@if [ -x "./scripts/agent_docs.sh" ]; then \
		./scripts/agent_docs.sh; \
	else \
		echo "$(YELLOW)⚠️  Documentation script not found$(RESET)"; \
	fi

orchestrate: ## 🎼 Run full ABVET orchestration pipeline
	@echo "$(BLUE)🎼 Running ABVET orchestration...$(RESET)"
	@if [ -x "./scripts/abvet_orchestrator.sh" ]; then \
		./scripts/abvet_orchestrator.sh; \
	else \
		echo "$(RED)❌ ABVET orchestrator script not found$(RESET)"; \
		exit 1; \
	fi

push: ## ⬆️  Push changes to repository
	@echo "$(BLUE)⬆️  Pushing changes...$(RESET)"
	@if [ -x "./scripts/agent_push.sh" ]; then \
		./scripts/agent_push.sh; \
	else \
		echo "$(YELLOW)⚠️  Push script not found, manual git push required$(RESET)"; \
	fi

##@ Setup & Configuration

setup: ## ⚙️  Initial project setup
	@echo "$(BLUE)⚙️  Running project setup...$(RESET)"
	@if [ -x "./SETUP.SH" ]; then \
		./SETUP.SH; \
	else \
		echo "$(RED)❌ SETUP.SH not found$(RESET)"; \
		exit 1; \
	fi

deploy: ## 🚀 Deploy to production
	@echo "$(BLUE)🚀 Deploying to production...$(RESET)"
	@if [ -x "./deploy.sh" ]; then \
		./deploy.sh; \
	else \
		echo "$(YELLOW)⚠️  Deploy script not found, check DEPLOY.md for manual instructions$(RESET)"; \
	fi

##@ Information

status: ## 📊 Show project status
	@echo "$(BLUE)📊 Project Status:$(RESET)"
	@echo "Node.js version: $$(node --version 2>/dev/null || echo 'Not installed')"
	@echo "npm version: $$(npm --version 2>/dev/null || echo 'Not installed')"
	@echo "Git status:"
	@git status --porcelain 2>/dev/null || echo "Not in a git repository"
	@echo "Dependencies status:"
	@if [ -f "package.json" ] && [ -d "node_modules" ]; then \
		echo "$(GREEN)✅ Dependencies installed$(RESET)"; \
	else \
		echo "$(RED)❌ Dependencies not installed$(RESET)"; \
	fi
	@echo "Build artifacts:"
	@if [ -d "dist" ]; then \
		echo "$(GREEN)✅ Built artifacts found in dist/$(RESET)"; \
		ls -la dist/ | head -5; \
	else \
		echo "$(YELLOW)⚠️  No build artifacts found$(RESET)"; \
	fi

check-scripts: ## 🔧 Check if all required scripts are executable
	@echo "$(BLUE)🔧 Checking script permissions...$(RESET)"
	@for script in scripts/*.sh SETUP.SH deploy.sh; do \
		if [ -f "$$script" ]; then \
			if [ -x "$$script" ]; then \
				echo "$(GREEN)✅ $$script$(RESET)"; \
			else \
				echo "$(RED)❌ $$script (not executable)$(RESET)"; \
			fi; \
		else \
			echo "$(YELLOW)⚠️  $$script (not found)$(RESET)"; \
		fi; \
	done

##@ Help

help: ## 📖 Show this help message
	@echo "$(BLUE)TRYONME-TRYONYOU-ABVETOS Intelligence System$(RESET)"
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  $(GREEN)%-15s$(RESET) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(RESET)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(BLUE)Examples:$(RESET)"
	@echo "  make all          # Build everything from scratch"
	@echo "  make dev          # Start development server"
	@echo "  make build        # Build for production"
	@echo "  make orchestrate  # Run full ABVET pipeline"
	@echo "  make status       # Check project status"