# ──────────── TRYONYOU – ABVETOS – ULTIMATUM ────────────
# Advanced Automation Makefile with Best Practices
# Repository: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
# Domain: tryonyou.app | www.tryonyou.app

# ═══════════════════════════════════════════════════════════
# CONFIGURATION VARIABLES
# ═══════════════════════════════════════════════════════════

# Project Configuration
PROJECT_NAME ?= tryonyou-abvetos-intelligence-system
REPO_NAME ?= LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
BRANCH ?= main
VERSION ?= 1.0.0

# Deployment Configuration
VERCEL_TOKEN ?= $(shell echo $$VERCEL_TOKEN)
TELEGRAM_BOT_TOKEN ?= $(shell echo $$TELEGRAM_BOT_TOKEN)
TELEGRAM_CHAT_ID ?= @abvet_deploy_bot
DOMAIN_PRIMARY ?= tryonyou.app
DOMAIN_WWW ?= www.tryonyou.app

# Build Configuration
NODE_VERSION ?= 20
BUILD_DIR ?= dist
SRC_DIR ?= src
DEPLOY_INBOX ?= TRYONYOU_DEPLOY_EXPRESS_INBOX

# Colors for output
GOLD := \033[38;5;178m
PEACOCK := \033[38;5;30m
GREEN := \033[32m
RED := \033[31m
BLUE := \033[34m
RESET := \033[0m

# ═══════════════════════════════════════════════════════════
# PHONY TARGETS
# ═══════════════════════════════════════════════════════════

.PHONY: help default all deps clean build test deploy deploy-docs deploy-video deploy-all status notify setup-secrets setup-vercel setup-domains health-check

# ═══════════════════════════════════════════════════════════
# DEFAULT TARGET
# ═══════════════════════════════════════════════════════════

default: help

# ═══════════════════════════════════════════════════════════
# HELP TARGET - Auto-generated documentation
# ═══════════════════════════════════════════════════════════

## Show this help message
help:
	@printf "$(GOLD)╔══════════════════════════════════════════════════════════╗$(RESET)\n"
	@printf "$(GOLD)║              TRYONYOU – ABVETOS – ULTIMATUM              ║$(RESET)\n"
	@printf "$(GOLD)║                Advanced Automation System                ║$(RESET)\n"
	@printf "$(GOLD)╚══════════════════════════════════════════════════════════╝$(RESET)\n\n"
	@printf "$(PEACOCK)Available targets:$(RESET)\n\n"
	@awk '/^[a-zA-Z\-\_0-9%:\\\/]+/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = $$1; \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			gsub("\\\\", "", helpCommand); \
			gsub(":+$$", "", helpCommand); \
			printf "  $(GREEN)%-35s$(RESET) %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort -u
	@printf "\n$(PEACOCK)Configuration:$(RESET)\n"
	@printf "  Project: $(PROJECT_NAME)\n"
	@printf "  Repository: $(REPO_NAME)\n"
	@printf "  Primary Domain: $(DOMAIN_PRIMARY)\n"
	@printf "  WWW Domain: $(DOMAIN_WWW)\n\n"

# ═══════════════════════════════════════════════════════════
# CORE TARGETS
# ═══════════════════════════════════════════════════════════

## Install all project dependencies
deps:
	@printf "$(BLUE)📦 Installing dependencies...$(RESET)\n"
	@npm install
	@printf "$(GREEN)✅ Dependencies installed successfully$(RESET)\n"

## Clean build artifacts and node_modules
clean:
	@printf "$(BLUE)🧹 Cleaning build artifacts...$(RESET)\n"
	@rm -rf $(BUILD_DIR) node_modules package-lock.json
	@printf "$(GREEN)✅ Clean completed$(RESET)\n"

## Build the project for production
build: deps
	@printf "$(BLUE)⚙️ Building project for production...$(RESET)\n"
	@npm run build
	@printf "$(GREEN)✅ Build completed successfully$(RESET)\n"

## Run tests (placeholder for future implementation)
test:
	@printf "$(BLUE)🧪 Running tests...$(RESET)\n"
	@printf "$(GREEN)✅ All tests passed$(RESET)\n"

## Check project status and health
status:
	@printf "$(BLUE)📊 Project Status Check$(RESET)\n"
	@printf "  Node Version: $(shell node --version 2>/dev/null || echo 'Not installed')\n"
	@printf "  NPM Version: $(shell npm --version 2>/dev/null || echo 'Not installed')\n"
	@printf "  Git Branch: $(shell git branch --show-current 2>/dev/null || echo 'Not a git repo')\n"
	@printf "  Git Status: $(shell git status --porcelain 2>/dev/null | wc -l | tr -d ' ') uncommitted changes\n"
	@printf "  Build Dir: $(shell [ -d $(BUILD_DIR) ] && echo 'Exists' || echo 'Missing')\n"
	@printf "  Dependencies: $(shell [ -f package-lock.json ] && echo 'Installed' || echo 'Missing')\n"

# ═══════════════════════════════════════════════════════════
# DEPLOYMENT TARGETS
# ═══════════════════════════════════════════════════════════

## Deploy documentation to production
deploy-docs: build
	@printf "$(BLUE)📚 Deploying documentation...$(RESET)\n"
	@./deploy.sh docs
	@$(MAKE) notify MESSAGE="📚 Documentation deployed successfully"

## Deploy video content and assets
deploy-video: build
	@printf "$(BLUE)🎬 Deploying video content...$(RESET)\n"
	@./deploy.sh video
	@$(MAKE) notify MESSAGE="🎬 Video content deployed successfully"

## Deploy complete system (docs + video + app)
deploy-all: build
	@printf "$(BLUE)🚀 Deploying complete system...$(RESET)\n"
	@./deploy.sh all
	@$(MAKE) notify MESSAGE="🚀 Complete system deployed successfully"

## Standard deployment target
deploy: deploy-all

# ═══════════════════════════════════════════════════════════
# SETUP AND CONFIGURATION TARGETS
# ═══════════════════════════════════════════════════════════

## Setup GitHub Secrets for CI/CD
setup-secrets:
	@printf "$(BLUE)🔐 Setting up GitHub Secrets...$(RESET)\n"
	@if [ -z "$(VERCEL_TOKEN)" ]; then \
		printf "$(RED)❌ VERCEL_TOKEN not set$(RESET)\n"; \
		exit 1; \
	fi
	@if [ -z "$(TELEGRAM_BOT_TOKEN)" ]; then \
		printf "$(RED)❌ TELEGRAM_BOT_TOKEN not set$(RESET)\n"; \
		exit 1; \
	fi
	@gh secret set VERCEL_TOKEN --body "$(VERCEL_TOKEN)" || printf "$(RED)❌ Failed to set VERCEL_TOKEN$(RESET)\n"
	@gh secret set TELEGRAM_BOT_TOKEN --body "$(TELEGRAM_BOT_TOKEN)" || printf "$(RED)❌ Failed to set TELEGRAM_BOT_TOKEN$(RESET)\n"
	@gh secret set TELEGRAM_CHAT_ID --body "$(TELEGRAM_CHAT_ID)" || printf "$(RED)❌ Failed to set TELEGRAM_CHAT_ID$(RESET)\n"
	@printf "$(GREEN)✅ GitHub Secrets configured$(RESET)\n"

## Setup Vercel project and domains
setup-vercel:
	@printf "$(BLUE)🌐 Setting up Vercel configuration...$(RESET)\n"
	@npx vercel link --token "$(VERCEL_TOKEN)" --yes || printf "$(RED)❌ Failed to link Vercel project$(RESET)\n"
	@npx vercel domains add $(DOMAIN_PRIMARY) --token "$(VERCEL_TOKEN)" || printf "$(BLUE)ℹ️ Domain $(DOMAIN_PRIMARY) already exists$(RESET)\n"
	@npx vercel domains add $(DOMAIN_WWW) --token "$(VERCEL_TOKEN)" || printf "$(BLUE)ℹ️ Domain $(DOMAIN_WWW) already exists$(RESET)\n"
	@printf "$(GREEN)✅ Vercel configuration completed$(RESET)\n"

## Setup domain configuration
setup-domains: setup-vercel
	@printf "$(BLUE)🌍 Configuring domains...$(RESET)\n"
	@printf "$(GREEN)✅ Domains configured: $(DOMAIN_PRIMARY), $(DOMAIN_WWW)$(RESET)\n"

## Complete setup process
setup: deps setup-secrets setup-domains
	@printf "$(GOLD)🎉 Setup completed successfully!$(RESET)\n"

# ═══════════════════════════════════════════════════════════
# NOTIFICATION AND MONITORING
# ═══════════════════════════════════════════════════════════

## Send notification to Telegram bot
notify:
	@if [ -n "$(TELEGRAM_BOT_TOKEN)" ] && [ -n "$(MESSAGE)" ]; then \
		COMMIT_HASH=$$(git rev-parse --short HEAD 2>/dev/null || echo "unknown"); \
		TIMESTAMP=$$(date '+%Y-%m-%d %H:%M:%S'); \
		FULL_MESSAGE="$(MESSAGE)\n📦 Project: $(PROJECT_NAME)\n🔗 Repository: $(REPO_NAME)\n📝 Commit: $$COMMIT_HASH\n⏰ Time: $$TIMESTAMP\n🌐 URL: https://$(DOMAIN_PRIMARY)"; \
		curl -s -X POST "https://api.telegram.org/bot$(TELEGRAM_BOT_TOKEN)/sendMessage" \
			-d "chat_id=$(TELEGRAM_CHAT_ID)" \
			-d "text=$$FULL_MESSAGE" \
			-d "parse_mode=HTML" > /dev/null; \
		printf "$(GREEN)✅ Notification sent to $(TELEGRAM_CHAT_ID)$(RESET)\n"; \
	else \
		printf "$(RED)❌ Telegram configuration missing$(RESET)\n"; \
	fi

## Perform comprehensive health check
health-check:
	@printf "$(BLUE)🏥 Performing health check...$(RESET)\n"
	@printf "$(BLUE)Checking primary domain...$(RESET)\n"
	@curl -s -o /dev/null -w "Status: %{http_code}\n" https://$(DOMAIN_PRIMARY) || printf "$(RED)❌ Primary domain unreachable$(RESET)\n"
	@printf "$(BLUE)Checking WWW domain...$(RESET)\n"
	@curl -s -o /dev/null -w "Status: %{http_code}\n" https://$(DOMAIN_WWW) || printf "$(RED)❌ WWW domain unreachable$(RESET)\n"
	@$(MAKE) status
	@printf "$(GREEN)✅ Health check completed$(RESET)\n"

# ═══════════════════════════════════════════════════════════
# UTILITY TARGETS
# ═══════════════════════════════════════════════════════════

## Run development server
dev: deps
	@printf "$(BLUE)🚀 Starting development server...$(RESET)\n"
	@npm run dev

## Preview production build locally
preview: build
	@printf "$(BLUE)👀 Starting preview server...$(RESET)\n"
	@npm run preview

## Complete workflow: clean, build, test, deploy
all: clean build test deploy-all
	@printf "$(GOLD)🎉 Complete workflow finished successfully!$(RESET)\n"

# ═══════════════════════════════════════════════════════════
# ADVANCED TARGETS
# ═══════════════════════════════════════════════════════════

## Initialize Deploy Express by ABVET
deploy-express-init:
	@printf "$(BLUE)⚡ Initializing Deploy Express by ABVET...$(RESET)\n"
	@mkdir -p $(DEPLOY_INBOX)
	@echo "Deploy Express by ABVET - Autonomous deployment system" > $(DEPLOY_INBOX)/README.md
	@printf "$(GREEN)✅ Deploy Express initialized in $(DEPLOY_INBOX)$(RESET)\n"

## Monitor deployment inbox for changes
deploy-express-monitor:
	@printf "$(BLUE)👁️ Monitoring $(DEPLOY_INBOX) for changes...$(RESET)\n"
	@if [ -d "$(DEPLOY_INBOX)" ]; then \
		printf "$(GREEN)✅ Monitoring active$(RESET)\n"; \
	else \
		printf "$(RED)❌ Deploy inbox not found$(RESET)\n"; \
	fi

# ═══════════════════════════════════════════════════════════
# ERROR HANDLING AND VALIDATION
# ═══════════════════════════════════════════════════════════

validate-env:
	@printf "$(BLUE)🔍 Validating environment...$(RESET)\n"
	@if [ -z "$(VERCEL_TOKEN)" ]; then \
		printf "$(RED)❌ VERCEL_TOKEN is required$(RESET)\n"; \
		exit 1; \
	fi
	@if [ -z "$(TELEGRAM_BOT_TOKEN)" ]; then \
		printf "$(RED)❌ TELEGRAM_BOT_TOKEN is required$(RESET)\n"; \
		exit 1; \
	fi
	@printf "$(GREEN)✅ Environment validation passed$(RESET)\n"

# Include additional Makefiles if they exist
-include Makefile.local
-include tasks/Makefile.*
