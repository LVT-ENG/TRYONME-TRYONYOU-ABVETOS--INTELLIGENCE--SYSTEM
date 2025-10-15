# Guía de Despliegue de Agentes 24×7

## 📋 Resumen Ejecutivo

Esta guía documenta el despliegue y configuración de los 8 agentes activos 24×7 que garantizan la excelencia operacional de TRYONYOU.

## 🤖 Agentes Implementados

### ✅ Agentes Activos

| ID | Nombre | Función | Estado | Trigger |
|----|--------|---------|--------|---------|
| 70 | Orquestador General | Control y coordinación | 🟢 Activo | Cron diario 09:00 UTC |
| 22 | Deploy Operator | CI/CD + Vercel + Telegram | 🟢 Activo | Push a main |
| 20 | GitHub Commit Agent | Commits, Issues, Branch | 🟢 Activo | GitHub Actions |
| 31 | Video Curator | Hero videos, overlays | 🟢 Activo | Manual/Scheduled |
| 12 | Brand Guardian | Visual, coherencia | 🟢 Activo | Pre-deploy |
| 46 | Document Locker | Patentes, Legal | 🟢 Activo | Git LFS |
| 2 | Content Pro | Investor deck, copy | 🟢 Activo | Content updates |
| 25 | Image Curator | Mockups premium | 🟢 Activo | Asset updates |

## 🚀 Configuración Inicial

### 1. GitHub Secrets Requeridos

Configurar en: `Settings > Secrets and variables > Actions > New repository secret`

```bash
# Vercel Integration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# GitHub (automático)
GITHUB_TOKEN=automatically_provided
```

### 2. Instalación de Dependencias

```bash
# En el repositorio
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Instalar dependencias del proyecto
npm install

# Instalar dependencias adicionales para agentes
npm install @octokit/rest puppeteer
```

### 3. Verificar Workflows

```bash
# Listar workflows
ls -la .github/workflows/

# Outputs esperados:
# - deploy.yml (Deploy Operator)
# - daily-report.yml (Orquestador General)
# - clean-merge.yml (GitHub Commit Agent)
```

## 📅 Operaciones Diarias

### Reporte Diario 09:00 UTC

**Agente:** Orquestador General (70)  
**Workflow:** `.github/workflows/daily-report.yml`  
**Contenido del reporte:**
- 📋 Tareas P0/P1 prioritarias
- 🚀 Deploys últimas 24h
- 📊 Métricas del sistema
- 📖 Guías rápidas contextuales
- 🔗 Links a issues y PRs activos

**Ejecutar manualmente:**
```bash
# Desde GitHub UI
Actions > Daily Agent Report > Run workflow

# O localmente
node scripts/agents/orchestrator-daily-report.js
```

### Deploy Automático Continuo

**Agente:** Deploy Operator (22)  
**Workflow:** `.github/workflows/deploy.yml`  
**Triggers:**
- Push a rama `main`
- Pull request a `main`

**Proceso:**
1. ✅ Build del proyecto
2. ✅ Validación con Brand Guardian
3. ✅ Deploy a Vercel
4. ✅ Captura screenshots (desktop + mobile)
5. ✅ Notificación Telegram con estado

**Notificación incluye:**
- Estado del deploy (✅/❌)
- URL del deployment
- Commit SHA y mensaje
- Autor y branch
- Screenshots (si exitoso)

## 🎨 Validación de Marca

### Brand Guardian (Agente 12)

**Script:** `scripts/agents/brand-guardian.js`  
**Validaciones:**
- ✅ Paleta de colores oficial
- ✅ Tipografías autorizadas
- ✅ Estructura de assets
- ✅ Tamaño de imágenes
- ✅ Formatos optimizados

**Ejecutar validación:**
```bash
node scripts/agents/brand-guardian.js
```

**Estándares:**
- Oro Elegante: `#D3B26A`
- Pavo Real: `#0E6B6B`
- Antracita: `#141619`
- Hueso: `#F5EFE6`

**Tipografías:**
- Headings: Playfair Display, Georgia
- Body: Inter, Helvetica
- Monospace: Fira Code

## 📦 Sincronización de Código

### Estructura Sincronizada

```
TRYONYOU/
├── docs/              # Documentación y legal
│   ├── agentes.md
│   ├── agents-active-24x7.md
│   ├── agent-deployment-guide.md
│   └── legal/         # Patentes y documentos
├── src/               # Código fuente
│   ├── components/
│   ├── assets/
│   └── styles/
├── public/            # Assets públicos
│   ├── assets/
│   ├── hero-video.mp4
│   └── modules/
└── scripts/           # Agentes y automation
    └── agents/
        ├── orchestrator-daily-report.js
        └── brand-guardian.js
```

### Sincronización Automática

Los agentes mantienen sincronizados:
1. **Documentación**: `/docs/` → Deployment `/dist/docs/`
2. **Assets**: `/public/` → CDN/Vercel
3. **Código**: `/src/` → Build optimizado
4. **Legal**: `/docs/legal/` → Git LFS + Backup

## 🔐 Document Locker (Agente 46)

### Gestión de Documentos Sensibles

**Configuración Git LFS:**
```bash
# Ya configurado en .gitattributes
*.pdf filter=lfs diff=lfs merge=lfs -text
*.docx filter=lfs diff=lfs merge=lfs -text
docs/legal/** filter=lfs diff=lfs merge=lfs -text
```

**Estructura:**
```
docs/legal/
├── patents/           # Patentes (Git LFS)
├── contracts/         # Contratos (Git LFS)
├── README_EXTENDED.md # Documentación pública
└── index.html        # Portal de documentos
```

**Subir documentos grandes:**
```bash
# Asegurar Git LFS instalado
git lfs install

# Agregar archivo
git add docs/legal/patents/patent-ES-2024.pdf
git commit -m "docs: add patent ES-2024"
git push
```

## 📱 Configuración Telegram Bot

### Crear Bot

1. Abrir [@BotFather](https://t.me/botfather) en Telegram
2. Enviar `/newbot`
3. Seguir instrucciones y guardar token
4. Configurar nombre: `TRYONYOU Deploy Bot`
5. Username sugerido: `@abvet_deploy_bot`

### Obtener Chat ID

```bash
# 1. Enviar mensaje al bot
# 2. Ejecutar:
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates

# 3. Buscar "chat":{"id": en la respuesta
# 4. Guardar el chat_id
```

### Configurar Secrets

```bash
# En GitHub: Settings > Secrets > Actions
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=123456789
```

## 🔄 Workflows de GitHub Actions

### Deploy Workflow
```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

**Pasos:**
1. Checkout código
2. Setup Node.js 22
3. Install dependencies
4. Build proyecto
5. Validar docs/legal
6. Deploy a Vercel
7. Capturar screenshots
8. Notificar Telegram

### Daily Report Workflow
```yaml
# .github/workflows/daily-report.yml
on:
  schedule:
    - cron: '0 9 * * *'  # 09:00 UTC diario
  workflow_dispatch:      # Manual también
```

**Pasos:**
1. Checkout código
2. Setup Node.js
3. Install @octokit/rest
4. Ejecutar orchestrator-daily-report.js
5. Enviar reporte a Telegram

## 🧪 Testing y Validación

### Test Manual de Agentes

```bash
# 1. Brand Guardian
node scripts/agents/brand-guardian.js

# 2. Orchestrator (requiere GITHUB_TOKEN)
export GITHUB_TOKEN=your_token
node scripts/agents/orchestrator-daily-report.js

# 3. Deploy (automático en push)
git add .
git commit -m "test: trigger deploy"
git push origin main
```

### Verificar Telegram

```bash
# Test rápido de envío
curl -X POST \
  https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage \
  -d chat_id=${TELEGRAM_CHAT_ID} \
  -d text="🤖 Test from TRYONYOU Agents"
```

### Monitorear Workflows

```bash
# Ver estado en GitHub
https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions

# Logs de workflows
Actions > [workflow name] > [run] > [job] > Ver logs
```

## 📊 Métricas y KPIs

### Monitoreo Continuo

| Métrica | Target | Actual | Agente |
|---------|--------|--------|--------|
| Uptime | >99.9% | 🟢 | Deploy Operator |
| Deploy Time | <3min | 🟢 | Deploy Operator |
| Build Success | >95% | 🟢 | Deploy Operator |
| Visual Compliance | 100% | 🟢 | Brand Guardian |
| Response Time | <200ms | 🟢 | Vercel Analytics |
| Lighthouse Score | >90 | 🟢 | Deploy Operator |

### Reportes Disponibles

1. **Diario 09:00 UTC** - Reporte completo vía Telegram
2. **Por Deploy** - Notificación instantánea
3. **Semanal** - Resumen de métricas (manual)
4. **Mensual** - Análisis de tendencias (manual)

## 🆘 Troubleshooting

### Deploy Falla

**Síntomas:** Workflow `deploy.yml` falla
**Solución:**
1. Verificar logs en GitHub Actions
2. Verificar secrets de Vercel
3. Verificar build local: `npm run build`
4. Revisar cambios en último commit

### Telegram No Recibe Notificaciones

**Síntomas:** Deploy exitoso pero sin mensaje
**Solución:**
1. Verificar `TELEGRAM_BOT_TOKEN` en secrets
2. Verificar `TELEGRAM_CHAT_ID` en secrets
3. Test manual: ver sección "Verificar Telegram"
4. Revisar logs del workflow

### Brand Guardian Falla

**Síntomas:** Validación reporta violaciones
**Solución:**
1. Revisar output del script
2. Verificar colores en CSS
3. Verificar tipografías
4. Ajustar o marcar como excepción

### Reporte Diario No Llega

**Síntomas:** 09:00 UTC pasa sin reporte
**Solución:**
1. Verificar cron está activo en `.github/workflows/daily-report.yml`
2. Ejecutar manualmente: Actions > Daily Agent Report > Run workflow
3. Verificar `GITHUB_TOKEN` tiene permisos
4. Verificar logs del workflow

## 🔮 Próximos Pasos

### Mejoras Planificadas

- [ ] Video Curator (Agente 31) - Procesamiento automático
- [ ] Content Pro (Agente 2) - Generación de investor decks
- [ ] Image Curator (Agente 25) - Optimización automática
- [ ] Analytics Dashboard - Métricas en tiempo real
- [ ] A/B Testing - Experimentación automática
- [ ] Performance Monitoring - Alertas proactivas

### Expansión de Agentes

- [ ] SEO Optimizer (nuevo)
- [ ] Social Media Publisher (nuevo)
- [ ] Customer Feedback Analyzer (nuevo)
- [ ] Inventory Tracker (nuevo)

## 📚 Referencias

### Documentación Relacionada

- [docs/agentes.md](./agentes.md) - Catálogo completo de 50 agentes
- [docs/agents-active-24x7.md](./agents-active-24x7.md) - Especificaciones de agentes activos
- [DEPLOY_INSTRUCTIONS.md](../DEPLOY_INSTRUCTIONS.md) - Guía de deploy manual
- [README.md](../README.md) - Documentación principal del proyecto

### Links Útiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Actions](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Git LFS](https://git-lfs.github.com/)

---

**📝 Mantenido por:** Agente 70 - Orquestador General  
**📅 Última actualización:** 2025-10-15  
**🔄 Revisión:** Trimestral  
**✉️ Contacto:** team@tryonyou.app
