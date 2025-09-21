# ================================================================
# TRYONME-TRYONYOU-ABVETOS INTELLIGENCE SYSTEM - Makefile
# ================================================================
# Makefile for automating git operations and deployment tasks
# 
# Usage:
#   make commit    - Git add, commit with standard message, and push
#   make help      - Show available targets
# ================================================================

# Default variables
REPO_DIR := .
REMOTE := origin
BRANCH := $(shell git branch --show-current)

# Default target
.DEFAULT_GOAL := help

# ================================================================
# Git Operations
# ================================================================

.PHONY: commit
commit:
	cd $(REPO_DIR) && \
	git add -A && \
	( git diff --cached --quiet || git commit -m "ULTIMATUM: Flujo completo orquestado" ) && \
	git push $(REMOTE) $(BRANCH) && \
	echo "✔️ Git commit + push completado en branch $(BRANCH)"

# ================================================================
# Development Targets
# ================================================================

.PHONY: install
install:
	@echo "📦 Installing dependencies..."
	npm install

.PHONY: build
build:
	@echo "🔨 Building project..."
	npm run build

.PHONY: dev
dev:
	@echo "🚀 Starting development server..."
	npm run dev

.PHONY: lint
lint:
	@echo "🔍 Linting commits..."
	npm run lint:commits

# ================================================================
# Utility Targets
# ================================================================

.PHONY: status
status:
	@echo "📊 Repository Status:"
	@echo "Branch: $(BRANCH)"
	@echo "Remote: $(REMOTE)"
	@echo ""
	git --no-pager status --short

.PHONY: help
help:
	@echo "================================================================"
	@echo "TRYONME-TRYONYOU-ABVETOS INTELLIGENCE SYSTEM - Makefile"
	@echo "================================================================"
	@echo ""
	@echo "Available targets:"
	@echo "  commit       Git add, commit with standard message, and push"
	@echo "  install      Install npm dependencies"
	@echo "  build        Build the project"
	@echo "  dev          Start development server"
	@echo "  lint         Run commit linting"
	@echo "  status       Show git repository status"
	@echo "  help         Show this help message"
	@echo ""
	@echo "Variables:"
	@echo "  REPO_DIR     Repository directory (default: .)"
	@echo "  REMOTE       Git remote name (default: origin)"
	@echo "  BRANCH       Current git branch (auto-detected: $(BRANCH))"
	@echo ""
	@echo "Usage examples:"
	@echo "  make commit"
	@echo "  make commit REMOTE=upstream"
	@echo "  make commit BRANCH=main"
	@echo "  make install && make build"
	@echo ""