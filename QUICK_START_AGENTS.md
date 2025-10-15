# 🚀 Quick Start - Sistema de Agentes 24×7

Guía rápida para activar los agentes inteligentes de TRYONYOU en 5 minutos.

## ✅ Pre-requisitos

- [ ] Repositorio clonado localmente
- [ ] Acceso admin a GitHub repository
- [ ] Cuenta Vercel con proyecto vinculado
- [ ] Bot de Telegram creado (opcional pero recomendado)

## 📋 Paso 1: Configurar GitHub Secrets (2 min)

1. Ve a tu repositorio en GitHub
2. Click en `Settings` → `Secrets and variables` → `Actions`
3. Click en `New repository secret` y añade:

```bash
# Vercel (obligatorio para deploy automático)
VERCEL_TOKEN=tu_vercel_token_aqui
VERCEL_ORG_ID=tu_org_id_aqui
VERCEL_PROJECT_ID=tu_project_id_aqui

# Telegram (opcional - para notificaciones)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=123456789
```

### 🔍 ¿Dónde obtener cada valor?

#### Vercel Tokens
```bash
# 1. Ve a https://vercel.com/account/tokens
# 2. Crea nuevo token con scope completo
# 3. Copia el token generado

# Para ORG_ID y PROJECT_ID:
# 1. Ve a tu proyecto en Vercel
# 2. Settings → General
# 3. Encontrarás ambos IDs
```

#### Telegram Bot
```bash
# 1. Abre Telegram y busca @BotFather
# 2. Envía: /newbot
# 3. Sigue instrucciones y copia el token
# 4. Para obtener CHAT_ID:
#    - Envía un mensaje a tu bot
#    - Visita: https://api.telegram.org/bot<TOKEN>/getUpdates
#    - Busca "chat":{"id": en la respuesta
```

## 📦 Paso 2: Instalar Dependencias (1 min)

```bash
# En el directorio del proyecto
npm install

# Esto instalará:
# - @octokit/rest (para Orchestrator)
# - puppeteer (para screenshots)
# - Todas las deps del proyecto
```

## ✅ Paso 3: Verificar Workflows (30 seg)

Los workflows ya están configurados en `.github/workflows/`:

```bash
# Verificar que existen
ls -la .github/workflows/

# Deberías ver:
# - deploy.yml (Deploy automático + Telegram)
# - daily-report.yml (Reporte diario 09:00 UTC)
# - main.yml (Build checks)
```

## 🧪 Paso 4: Probar Localmente (1 min)

### Test Brand Guardian
```bash
node scripts/agents/brand-guardian.js
```

**Output esperado:**
```
🎨 Agente 12: Brand Guardian - Iniciando validación...
✅ Sin violaciones críticas
⚠️  ADVERTENCIAS (X)
📊 Score de Marca: XX%
✅ Validación completada exitosamente
```

### Test Orchestrator (requiere GITHUB_TOKEN)
```bash
export GITHUB_TOKEN=ghp_tu_token_aqui
node scripts/agents/orchestrator-daily-report.js
```

**Output esperado:**
```
🤖 Agente 70: Orquestador General - Iniciando reporte diario...
✅ Issues obtenidos: P0=X, P1=Y
✅ Deploys recientes: Z
✅ Reporte diario completado
```

## 🚀 Paso 5: Activar Sistema (30 seg)

### Opción A: Push a Main (recomendado)

```bash
# Los workflows se activan automáticamente
git add .
git commit -m "feat: activate 24x7 agents"
git push origin main
```

### Opción B: Activación Manual

1. Ve a `Actions` tab en GitHub
2. Selecciona `Daily Agent Report`
3. Click `Run workflow` → `Run workflow`
4. Repite para `Build and Deploy`

## 📱 Verificar que Todo Funciona

### ✅ Checklist de Verificación

- [ ] **Deploy automático funciona**
  - Push un cambio a main
  - Ve a Actions y verifica que `Build and Deploy` se ejecuta
  - Verifica que despliega a Vercel
  
- [ ] **Telegram notificaciones funcionan**
  - Si configuraste Telegram, deberías recibir un mensaje tras el deploy
  - Mensaje incluye: estado, URL, commit, autor
  
- [ ] **Reporte diario funciona**
  - Ejecuta manualmente: Actions → Daily Agent Report → Run workflow
  - O espera hasta mañana a las 09:00 UTC
  - Deberías recibir reporte completo en Telegram
  
- [ ] **Brand Guardian funciona**
  - Se ejecuta automáticamente en cada build
  - O manualmente: `node scripts/agents/brand-guardian.js`

## 📊 Monitoreo Continuo

### GitHub Actions Dashboard
```
https://github.com/TU_ORG/TU_REPO/actions
```

Aquí verás:
- ✅ Deploys exitosos/fallidos
- ⏱️ Tiempo de ejecución
- 📊 Historial completo

### Vercel Dashboard
```
https://vercel.com/dashboard
```

Aquí verás:
- 🌐 URLs de deployments
- ⚡ Performance metrics
- 📈 Analytics

### Telegram
- 📱 Notificaciones en tiempo real
- 📋 Reporte diario 09:00 UTC
- ⚠️ Alertas de errores

## 🎯 Uso Diario

### Crear Issues con Prioridades

Cuando crees un issue en GitHub, usa las plantillas:
- 🔴 **P0 - Crítico**: Sitio caído, seguridad
- 🟡 **P1 - Alta**: Funcionalidad importante rota
- ✨ **Feature Request**: Nuevas características

Los issues P0/P1 aparecerán automáticamente en el reporte diario.

### Deploy Automático

```bash
# Simplemente haz push a main
git push origin main

# El sistema automáticamente:
# 1. Build del proyecto
# 2. Valida con Brand Guardian
# 3. Deploy a Vercel
# 4. Captura screenshots
# 5. Te notifica vía Telegram
```

### Ejecutar Reportes Manualmente

```bash
# Reporte diario completo
node scripts/agents/orchestrator-daily-report.js

# Validación de marca
node scripts/agents/brand-guardian.js
```

## 🆘 Troubleshooting Rápido

### ❌ Deploy falla

**Solución:**
```bash
# 1. Verifica build local
npm run build

# 2. Revisa logs en GitHub Actions
# 3. Verifica secrets de Vercel
```

### 📱 No recibo notificaciones Telegram

**Solución:**
```bash
# 1. Verifica secrets:
# - TELEGRAM_BOT_TOKEN
# - TELEGRAM_CHAT_ID

# 2. Test rápido:
curl -X POST \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=Test"
```

### ⏰ Reporte diario no llega

**Solución:**
1. Verifica que `daily-report.yml` existe
2. Ejecuta manualmente desde GitHub Actions
3. Revisa logs del workflow

## 📚 Documentación Completa

- [docs/agents-active-24x7.md](docs/agents-active-24x7.md) - Especificaciones completas
- [docs/agent-deployment-guide.md](docs/agent-deployment-guide.md) - Guía detallada
- [docs/agentes.md](docs/agentes.md) - Catálogo de 50 agentes
- [scripts/agents/README.md](scripts/agents/README.md) - Documentación de scripts

## 🎉 ¡Listo!

Tu sistema de agentes 24×7 está ahora activo. Recibirás:

- ✅ **09:00 UTC diario**: Reporte completo con P0/P1, deploys, métricas
- 🚀 **Cada push a main**: Deploy automático + notificación
- 🎨 **Cada build**: Validación de marca automática
- 📸 **Cada deploy**: Screenshots desktop + mobile

---

**🤖 Sistema mantenido por Agente 70 - Orquestador General**  
**📅 Operacional 24×7**  
**✉️ Soporte: team@tryonyou.app**
