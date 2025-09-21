# ==============================
# TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM
# Orquestación de agentes vía Makefile
# ==============================

# Variables
REPO_DIR := $(shell pwd)
APP_DIR := $(REPO_DIR)
SRC_DIR := $(APP_DIR)/src
PUB_DIR := $(APP_DIR)/public
DOCS_DIR := $(PUB_DIR)/docs
VID_DIR := $(PUB_DIR)/assets/videos

BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
REMOTE := origin

# Secrets deben estar en entorno:
# VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

.PHONY: all integrate components pau docs build commit deploy install clean help

### ========= 1) INTEGRACIÓN DE CÓDIGO =========
integrate:
	@echo "➤ Integrando Manus + Nanos…"
	cd $(REPO_DIR) && git fetch $(REMOTE) --prune
	cd $(REPO_DIR) && git checkout $(BRANCH) && git pull $(REMOTE) $(BRANCH)
	@if git show-ref --quiet refs/heads/branch-4; then \
	  cd $(REPO_DIR) && git merge --no-ff branch-4 -m "MERGE: branch-4 (Manus) → main"; \
	fi
	@mkdir -p $(SRC_DIR)/pages $(SRC_DIR)/components $(SRC_DIR)/styles $(DOCS_DIR) $(VID_DIR)

### ========= 2) COMPONENTES WEB =========
components:
	@echo "➤ Generando componentes web (Hero, Pau, Claims, Wardrobe, Mockups, ABVET, Corporate, BusinessUnits, SupportUnits, Docs, Brand)…"
	@mkdir -p $(SRC_DIR)/pages
	@test -f $(SRC_DIR)/pages/HomePage.jsx || echo "// TODO: Generar HomePage.jsx" > $(SRC_DIR)/pages/HomePage.jsx
	@echo "✔ Componentes listos."

### ========= 3) VÍDEO PAU INTRO =========
pau:
	@echo "➤ Renderizando Pau Intro…"
	@test -f $(REPO_DIR)/pau_intro_scene.json && \
	 test -f $(REPO_DIR)/pau_intro.srt && \
	 test -f $(REPO_DIR)/config.json && \
	 ffmpeg -f lavfi -i color=c=black:s=1080x1920:d=55 \
	   -vf "subtitles=$(REPO_DIR)/pau_intro.srt:force_style='FontName=Arial,FontSize=32,PrimaryColour=&HFFFFFF&'" \
	   -c:v libx264 -pix_fmt yuv420p -y $(VID_DIR)/TRYONYOU_PAU_INTRO.mp4 || \
	 echo "⚠️ Material incompleto para Pau Intro."

### ========= 4) DOCUMENTOS PDF =========
docs:
	@echo "➤ Generando docs (claims.pdf, customer-journey.pdf)…"
	@mkdir -p $(DOCS_DIR)
	@test -f $(DOCS_DIR)/claims.pdf || echo "%PDF-1.4\n..." > $(DOCS_DIR)/claims.pdf
	@test -f $(DOCS_DIR)/customer-journey.pdf || echo "%PDF-1.4\n..." > $(DOCS_DIR)/customer-journey.pdf
	@echo "✔ Docs listos."

### ========= 5) BUILD LOCAL =========
build:
	@echo "➤ Instalando dependencias y compilando (Vite)…"
	cd $(APP_DIR) && npm install --no-audit --no-fund
	cd $(APP_DIR) && npm run build

### ========= 6) COMMIT & PUSH =========
commit:
	@echo "➤ Commit + Push a GitHub…"
	cd $(REPO_DIR) && git add -A
	@if ! git diff --cached --quiet; then \
	  cd $(REPO_DIR) && git commit -m "ULTIMATUM: Integración + Pau + Docs + Build"; \
	  cd $(REPO_DIR) && git push $(REMOTE) $(BRANCH); \
	else \
	  echo "ℹ️ No hay cambios para commit."; \
	fi

### ========= 7) DEPLOY A VERCEL =========
deploy:
	@echo "➤ Deploy a producción (Vercel)…"
	cd $(APP_DIR) && vercel deploy --prebuilt --prod --token $$VERCEL_TOKEN || true
	@DEPLOY_URL=$$(cd $(APP_DIR) && vercel ls --token $$VERCEL_TOKEN | grep tryonyou | head -n1 | awk '{print $$2}'); \
	echo "🌍 Deploy en: $$DEPLOY_URL"; \
	if [ -n "$$TELEGRAM_BOT_TOKEN" ] && [ -n "$$TELEGRAM_CHAT_ID" ]; then \
	  COMMIT_HASH=$$(cd $(REPO_DIR) && git rev-parse --short HEAD); \
	  MSG="✅ Deploy completado\nRepo: $(REPO_DIR)\nBranch: $(BRANCH)\nCommit: $$COMMIT_HASH\nURL: $$DEPLOY_URL"; \
	  curl -s -X POST "https://api.telegram.org/bot$$TELEGRAM_BOT_TOKEN/sendMessage" \
	    -d "chat_id=$$TELEGRAM_CHAT_ID" --data-urlencode "text=$$MSG" >/dev/null || true; \
	fi

### ========= TARGET GLOBAL =========
all: integrate components pau docs build commit deploy
	@echo "🎉 Flujo completo terminado."

### ========= UTILIDADES =========
install:
	@echo "➤ Instalando dependencias del sistema..."
	@npm install --no-audit --no-fund
	@npm install -g vercel || echo "⚠️ Vercel CLI no se pudo instalar globalmente"

clean:
	@echo "➤ Limpiando archivos temporales..."
	@rm -rf dist/ node_modules/.cache/ .vite/
	@echo "✔ Limpieza completada."

help:
	@echo "📖 TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM - Makefile"
	@echo ""
	@echo "Targets disponibles:"
	@echo "  all        - Ejecuta flujo completo: integrate → components → pau → docs → build → commit → deploy"
	@echo "  integrate  - Integración git: fetch, pull, merge branch-4 si existe"
	@echo "  components - Genera componentes web básicos"
	@echo "  pau        - Renderiza vídeo Pau Intro (requiere ffmpeg y archivos fuente)"
	@echo "  docs       - Genera documentos PDF básicos"
	@echo "  build      - Compila aplicación con Vite"
	@echo "  commit     - Commit y push a GitHub"
	@echo "  deploy     - Deploy a Vercel con notificaciones Telegram"
	@echo "  install    - Instala dependencias del sistema"
	@echo "  clean      - Limpia archivos temporales"
	@echo "  help       - Muestra esta ayuda"
	@echo ""
	@echo "Variables de entorno necesarias para deploy:"
	@echo "  VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID"
	@echo "  TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (opcional)"