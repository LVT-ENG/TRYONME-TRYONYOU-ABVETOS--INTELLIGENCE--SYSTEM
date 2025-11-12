# 🚀 Activar Workflows - MANUS TRYONYOU ORCHESTRATION FULL

## ⚠️ Acción Requerida Inmediata

Los 8 workflows del sistema de orquestación están listos en esta carpeta pero deben ser activados manualmente debido a restricciones de permisos de GitHub App.

---

## 📋 Workflows Disponibles

1. **deploy-express-abvet.yml** - Pipeline principal de deployment
2. **inbox-auto-deploy.yml** - Detección automática de INBOX (cada 15 min)
3. **public-auto-deploy.yml** - Auto-deploy de carpeta public
4. **public-auto-deploy-ready.yml** - Verificación pre-deploy
5. **auto-changelog.yml** - Generación automática de changelog
6. **version-release.yml** - Versionado automático
7. **deploy-github-pages.yml** - Deploy a GitHub Pages
8. **deploy-express-scheduled.yml** - Deploys programados

---

## 🔧 Activación Rápida (5 minutos)

### Método 1: GitHub Web UI (Más Rápido)

```bash
# 1. Ir al repositorio en GitHub
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# 2. Navegar a workflows_to_activate/

# 3. Para cada archivo .yml:
   - Abrir el archivo
   - Copiar todo el contenido
   - Ir a .github/workflows/
   - Click "Add file" → "Create new file"
   - Pegar contenido
   - Nombrar igual que el original
   - Commit changes

# 4. Repetir para los 8 workflows
```

### Método 2: Git Local (Recomendado si tienes el repo clonado)

```bash
# En tu máquina local
cd /ruta/a/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Pull últimos cambios
git pull origin main

# Copiar workflows
cp workflows_to_activate/*.yml .github/workflows/

# Commit y push
git add .github/workflows/
git commit -m "feat: Activate MANUS orchestration workflows"
git push origin main
```

### Método 3: GitHub CLI

```bash
# Clonar repo
gh repo clone LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Copiar workflows
cp workflows_to_activate/*.yml .github/workflows/

# Commit y push
git add .github/workflows/
git commit -m "feat: Activate MANUS orchestration workflows"
git push origin main
```

---

## 🔐 Configurar Secrets (Crítico)

Antes de que los workflows funcionen, debes configurar estos secrets en GitHub:

**Ruta:** Settings → Secrets and variables → Actions → New repository secret

### Secrets Requeridos

| Secret Name | Valor | Cómo Obtenerlo |
|-------------|-------|----------------|
| `VERCEL_TOKEN` | Token de Vercel | https://vercel.com/account/tokens |
| `VERCEL_PROJECT_ID` | ID del proyecto | Vercel Dashboard → Settings → General |
| `VERCEL_ORG_ID` | ID de la org | Vercel Dashboard → Settings → General |
| `TELEGRAM_BOT_TOKEN` | Token del bot | @BotFather en Telegram |
| `TELEGRAM_CHAT_ID` | ID del chat | @userinfobot en Telegram |
| `GH_PAT` | Personal Access Token | GitHub Settings → Developer settings → PAT |
| `EPIC_ISSUE_NUMBER` | Número del issue épico | (Opcional) |
| `PRIMARY_DOMAIN` | `tryonyou.app` | Valor fijo |
| `REPO_FULLNAME` | `LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM` | Valor fijo |

### Valores Específicos (según tu script)

```bash
VERCEL_TOKEN="7052531f73a7c17b89ce4a1b7d8720d6"
VERCEL_PROJECT_ID="prj_5cvRv3TeZFOnSlixHu1QC8q9DHI1"
VERCEL_ORG_ID="team_rubenespinarrodri"
TELEGRAM_BOT_TOKEN="7052533162:AAH-DEPLOY-ABVETOS-T"
PRIMARY_DOMAIN="tryonyou.app"
REPO_FULLNAME="LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
```

**⚠️ IMPORTANTE:** Reemplaza `TELEGRAM_CHAT_ID` con tu chat ID real (obtenerlo de @userinfobot)

---

## ✅ Verificación

Después de activar los workflows y configurar los secrets:

### 1. Verificar que aparecen en Actions

```
GitHub → Actions tab
```

Deberías ver los 8 workflows listados.

### 2. Ejecutar test manual

```
1. Click en "Deploy Express by ABVET"
2. Click "Run workflow"
3. Select branch: main
4. Click "Run workflow"
```

### 3. Verificar notificación en Telegram

Deberías recibir una notificación en el chat configurado.

---

## 🎯 Flujo Automático Activado

Una vez completados los pasos:

```
📂 Archivo en INBOX
   ↓ (15 min)
🔍 GitHub Actions detecta
   ↓
🧱 Build con Vite 7.1.2
   ↓
🚀 Deploy a Vercel (tryonyou.app)
   ↓
🤖 Smart QA Agent
   ↓
📸 Screenshots (desktop + mobile)
   ↓
📁 Sync con Google Drive
   ↓
📱 Notificación a Telegram
```

---

## 📊 Workflows Activados

| Workflow | Trigger | Descripción |
|----------|---------|-------------|
| **deploy-express-abvet** | push a main | Deploy principal |
| **inbox-auto-deploy** | cron (*/15) | Detección INBOX |
| **public-auto-deploy** | push a public/ | Auto-deploy public |
| **auto-changelog** | push a main | Changelog automático |
| **version-release** | manual | Release y versioning |
| **deploy-github-pages** | push a main | GitHub Pages |
| **deploy-express-scheduled** | cron diario | Deploys programados |
| **public-auto-deploy-ready** | push a public/ | Pre-check deploy |

---

## 🐛 Troubleshooting

### Workflows no aparecen en Actions

**Causa:** No se copiaron correctamente a `.github/workflows/`

**Solución:** Verificar que los archivos estén en la ubicación correcta

### Workflows fallan inmediatamente

**Causa:** Secrets no configurados

**Solución:** Configurar todos los secrets en GitHub Settings

### No llegan notificaciones a Telegram

**Causa:** `TELEGRAM_CHAT_ID` no configurado o incorrecto

**Solución:** 
1. Hablar con @userinfobot en Telegram
2. Copiar tu chat ID
3. Añadirlo como secret en GitHub

### Deploy falla en Vercel

**Causa:** Tokens de Vercel incorrectos

**Solución:** Verificar `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`

---

## 🎉 Sistema Completamente Operativo

Una vez activados los workflows y configurados los secrets:

✅ **Deploy automático** desde INBOX cada 15 minutos  
✅ **Build optimizado** con Vite 7.1.2  
✅ **QA automático** con Smart QA Agent  
✅ **Capturas automatizadas** desktop y móvil  
✅ **Sincronización** con Google Drive  
✅ **Notificaciones** en tiempo real a Telegram  
✅ **Intelligence System** con 3 automatizaciones IA  
✅ **Versionado automático** y changelog  
✅ **GitHub Pages** deployment  

---

## 📞 Soporte

Si tienes problemas:

1. **Revisar logs:** GitHub → Actions → Click en workflow → Ver detalles
2. **Verificar secrets:** Settings → Secrets and variables → Actions
3. **Documentación:** Ver `/docs/FULL_PIPELINE_GUIDE.md`

---

**Tiempo estimado de activación:** 5-10 minutos  
**Prioridad:** Alta - Sistema no funcional hasta activación  
**Estado:** ⚠️ Pendiente activación manual

---

**Última actualización:** 25 de octubre de 2025  
**Versión:** 1.0.0

