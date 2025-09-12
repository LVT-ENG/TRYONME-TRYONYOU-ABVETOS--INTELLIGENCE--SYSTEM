# Guía de Despliegue - TryOnMe / TryOnYou AVBETOS

## 🚀 Descripción General

Esta guía cubre el proceso completo de despliegue del sistema AVBETOS Intelligence System en producción y desarrollo.

## 📋 Componentes a Desplegar

### 1. Google Apps Script Motor
**Ver**: [Guía Detallada](./google-apps-script/DEPLOYMENT.md)

```bash
# Inicio rápido
1. Ve a script.google.com
2. Crea nuevo proyecto "TryOnMe Motor"
3. Copia archivos de /google-apps-script/
4. Ejecuta initTryOnMe()
```

### 2. Frontend Web
**Tecnología**: HTML/CSS/JavaScript + Vercel

```bash
# Instalación de dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build
```

### 3. Backend PHP
**Componentes**: `mailer.php`, `health.php`, `config.php`

```bash
# Configuración requerida
cp .env.example .env
# Editar variables de entorno necesarias
```

## 🔧 Configuración de Entornos

### Variables de Entorno Requeridas

```bash
# .env
NODE_ENV=production
VITE_SENTRY_DSN=https://your-sentry-dsn
VITE_ENVIRONMENT=production
VITE_APP_VERSION=1.0.0

# Para PHP
SMTP_HOST=your-smtp-host
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### Secrets de GitHub Actions

```bash
HEALTH_URL=https://your-domain.com/health.php
SLACK_WEBHOOK_URL=https://hooks.slack.com/webhook-url
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=your-project-id
```

## 🏗️ Proceso de Despliegue

### Desarrollo
1. Crear branch feature desde main
2. Hacer cambios siguiendo conventional commits
3. Testear localmente
4. Crear PR con template

### Staging
1. Merge a rama develop (si existe)
2. Deploy automático a ambiente de staging
3. Pruebas de QA

### Producción
1. Merge a main después de review
2. Deploy automático vía Vercel
3. Monitoreo post-deploy con health checks

## 📊 Monitoreo Post-Despliegue

### Health Checks Automáticos
- Endpoint: `/health.php`
- Frecuencia: Cada 30 minutos
- Alertas: GitHub Issues + Slack

### Métricas Clave
- P95 Response Time < 300ms
- Error Rate < 1%
- Uptime > 99.9%

## 🐛 Rollback

En caso de problemas críticos:

```bash
# Vercel - Rollback a deployment anterior
vercel rollback [deployment-url]

# Google Apps Script - Restaurar versión anterior
# Manual en el editor de Apps Script
```

## 📞 Soporte

- **Monitoreo**: Ver OBSERVABILITY.md
- **Issues**: Usar templates de GitHub
- **Urgencias**: Revisar health endpoint y logs