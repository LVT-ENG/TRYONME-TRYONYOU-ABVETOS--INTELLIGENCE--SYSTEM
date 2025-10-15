# Agentes Activos 24×7 - TRYONYOU Intelligence System

## 🎯 Visión General

Sistema de agentes inteligentes operando continuamente para garantizar excelencia operacional, despliegue automático y coherencia visual en todas las operaciones de TRYONYOU.

## 🤖 Agentes Activos

### 70. Orquestador General (General Orchestrator)
**Estado:** 🟢 Activo 24×7  
**Función:** Control total y coordinación de todos los agentes del sistema  
**Responsabilidades:**
- Coordinar ejecución de todos los agentes activos
- Monitorear salud y rendimiento del sistema
- Priorizar tareas según urgencia (P0/P1/P2/P3)
- Reportar estado diario vía Telegram a las 09:00
- Gestionar recursos y balanceo de carga

**Stack Tecnológico:** Node.js, Cron Jobs, Telegram Bot API, GitHub Actions

### 22. Deploy Operator (Operador de Despliegue)
**Estado:** 🟢 Activo 24×7  
**Función:** CI/CD + Vercel + Telegram  
**Responsabilidades:**
- Despliegue automático a Vercel en cada push a main
- Captura de screenshots desktop y mobile post-deploy
- Notificaciones Telegram con estado, URL y capturas
- Rollback automático en caso de fallos
- Monitoreo de rendimiento post-deploy

**Stack Tecnológico:** GitHub Actions, Vercel API, Puppeteer, Telegram Bot API

### 20. GitHub Commit Agent (Agente de Commits)
**Estado:** 🟢 Activo 24×7  
**Función:** Gestión automática de commits, issues y branches  
**Responsabilidades:**
- Commits automáticos de cambios generados por agentes
- Creación y actualización de issues según prioridades
- Gestión de branches para features y hotfixes
- Sincronización con sistemas de tracking
- Generación de changelogs automáticos

**Stack Tecnológico:** GitHub API, Git, Node.js, Conventional Commits

### 31. Video Curator (Curador de Videos LaSeñu)
**Estado:** 🟢 Activo 24×7  
**Función:** Hero videos, overlays de Pau le Paon  
**Responsabilidades:**
- Gestión de videos hero en homepage
- Overlays automáticos con Pau le Paon (mascota)
- Optimización de videos para web (compresión, formatos)
- A/B testing de videos hero
- Analytics de engagement de videos

**Stack Tecnológico:** FFmpeg, Cloud Storage, Video Processing APIs, Analytics

### 12. Brand Guardian (Guardián de Marca)
**Estado:** 🟢 Activo 24×7  
**Función:** Visual, coherencia, tipografía  
**Responsabilidades:**
- Validar coherencia visual en todos los assets
- Verificar paleta de colores premium (oro #D3B26A, pavo real #0E6B6B)
- Control de tipografías y espaciados
- Validación de estándares Vogue-tech
- Rechazo automático de visuales que no cumplen estándares

**Stack Tecnológico:** Computer Vision, Color Analysis, Typography Validation

### 46. Document Locker (Bloqueador de Documentos)
**Estado:** 🟢 Activo 24×7  
**Función:** Patente + Legal  
**Responsabilidades:**
- Gestión segura de documentos de patentes
- Control de acceso a documentación legal
- Versionado de documentos críticos
- Backup automático en múltiples ubicaciones
- Auditoría de accesos a documentos sensibles

**Stack Tecnológico:** Encryption, Git LFS, Access Control, Audit Logging

### 2. Content Pro (Profesional de Contenido)
**Estado:** 🟢 Activo 24×7  
**Función:** Investor deck + copy  
**Responsabilidades:**
- Generación y actualización de investor decks
- Copywriting para materiales de marketing
- Optimización SEO de contenidos
- Traducción multiidioma (ES/EN/FR)
- Mantenimiento de brand voice consistente

**Stack Tecnológico:** NLP, GPT Models, SEO Tools, Translation APIs

### 25. Image Curator (Curador de Imágenes)
**Estado:** 🟢 Activo 24×7  
**Función:** Mockups, renders premium  
**Responsabilidades:**
- Gestión de mockups de productos
- Optimización de imágenes para web
- Validación de calidad visual premium
- Generación de variantes responsive
- Categorización y metadatos de imágenes

**Stack Tecnológico:** Image Processing, AI Image Quality Assessment, CDN

## 📅 Rutinas Diarias

### 09:00 - Reporte Diario Telegram
**Enviado por:** Agente 70 (Orquestador General)  
**Contenido:**
- 📋 Lista de tareas P0 (críticas) y P1 (alta prioridad)
- 🚀 Deploys realizados en las últimas 24h
- ⚠️ Alertas y warnings del sistema
- 📊 Métricas clave (uptime, performance, errores)
- 📖 Guías rápidas para tareas del día
- 🔗 Links directos a issues y PRs activos

### Operaciones Continuas (24×7)

#### Deploy Automation
- ✅ Build automático en cada push
- ✅ Deploy a Vercel con validación
- ✅ Capturas de pantalla automáticas
- ✅ Notificaciones Telegram instantáneas
- ✅ Rollback en caso de errores

#### Visual Quality Control
- ✅ Validación de colores premium
- ✅ Verificación de tipografías
- ✅ Control de coherencia Vogue-tech
- ✅ Optimización de imágenes y videos
- ✅ A/B testing de elementos visuales

#### Content Synchronization
- ✅ Sincronización en /docs/
- ✅ Sincronización en /src/frontend/
- ✅ Sincronización en /public/assets/
- ✅ Versionado automático
- ✅ Backup en múltiples ubicaciones

## 🔄 Flujo de Trabajo Automático

```
1. Desarrollador hace commit → main
   ↓
2. GitHub Actions se activa
   ↓
3. Agente 20 (GitHub Commit) procesa cambios
   ↓
4. Build y tests automáticos
   ↓
5. Agente 12 (Brand Guardian) valida visuales
   ↓
6. Agente 22 (Deploy Operator) despliega a Vercel
   ↓
7. Captura screenshots (desktop + mobile)
   ↓
8. Agente 70 (Orquestador) coordina notificaciones
   ↓
9. Notificación Telegram con estado y capturas
   ↓
10. Agente 25 (Image Curator) optimiza assets
```

## 📊 Prioridades (Sistemas P0-P3)

### P0 - Crítico (Resolución inmediata)
- Sitio caído o inaccesible
- Errores de seguridad
- Pérdida de datos
- Build fallido en producción

### P1 - Alta (Resolución en < 4 horas)
- Funcionalidad principal rota
- Performance degradada significativamente
- Visuales fuera de estándares premium
- Documentación legal desactualizada

### P2 - Media (Resolución en < 24 horas)
- Bugs menores en UI
- Optimizaciones de rendimiento
- Actualizaciones de contenido
- Mejoras de SEO

### P3 - Baja (Resolución en < 1 semana)
- Mejoras cosméticas
- Optimizaciones no críticas
- Documentación general
- Features nice-to-have

## 🎨 Estándares Visuales Premium

### Paleta de Colores
- **Oro Elegante:** #D3B26A (botones, highlights)
- **Pavo Real:** #0E6B6B (acentos, links)
- **Antracita:** #141619 (fondos)
- **Hueso:** #F5EFE6 (textos)

### Tipografía
- **Headings:** Playfair Display, Georgia, serif
- **Body:** Inter, Helvetica, sans-serif
- **Monospace:** Fira Code, monospace

### Modelos y Fotografía
- ✅ Modelos diversos (edad, etnia, tipo de cuerpo)
- ✅ Fotografía estilo Vogue
- ✅ Iluminación profesional
- ✅ Composición editorial
- ✅ Post-procesado premium

## 🔐 Seguridad y Compliance

### Document Locker (Agente 46)
- Documentos de patente en `/docs/legal/patents/`
- Encriptación AES-256
- Control de acceso basado en roles
- Auditoría completa de accesos
- Backup cifrado en múltiples ubicaciones

### Datos Sensibles
- ❌ NO commitear secrets en código
- ✅ Usar GitHub Secrets para CI/CD
- ✅ Variables de entorno para configuración
- ✅ Git LFS para archivos grandes
- ✅ .gitignore para archivos sensibles

## 📱 Configuración Telegram Bot

### Bot Token
Variable de entorno: `TELEGRAM_BOT_TOKEN`  
Scope: Envío de mensajes y archivos

### Chat ID
Variable de entorno: `TELEGRAM_CHAT_ID`  
Destinatario: @abvet_deploy_bot

### Mensajes Programados
- **09:00 UTC:** Reporte diario completo
- **En tiempo real:** Notificaciones de deploy
- **En tiempo real:** Alertas críticas (P0)
- **12:00 UTC:** Resumen de mediodia
- **18:00 UTC:** Resumen de fin de jornada

## 🚀 Activación de Agentes

### Requisitos Previos
1. ✅ GitHub Secrets configurados
2. ✅ Telegram Bot creado y token obtenido
3. ✅ Vercel integrado con repositorio
4. ✅ Git LFS habilitado
5. ✅ Node.js 22+ instalado

### Comandos de Activación

```bash
# Instalar dependencias
npm install

# Build del proyecto
npm run build

# Activar workflows de GitHub Actions
# (Ya están en .github/workflows/)

# Configurar Telegram Bot
# (Variables de entorno en GitHub Secrets)

# Deploy inicial
npm run deploy
```

## 📈 Monitoreo y Métricas

### KPIs Monitoreados
- **Uptime:** >99.9%
- **Deploy time:** <3 minutos
- **Build success rate:** >95%
- **Visual compliance:** 100%
- **Response time:** <200ms
- **Lighthouse score:** >90

### Dashboards
- Vercel Analytics
- GitHub Actions
- Telegram Bot logs
- Custom metrics endpoint

## 🛠️ Mantenimiento

### Actualizaciones de Agentes
- Revisión semanal de logs
- Ajuste de prioridades según feedback
- Optimización de tiempos de respuesta
- Actualización de reglas de Brand Guardian
- Mejora continua de notificaciones

### Troubleshooting
Ver `/docs/troubleshooting-agents.md` para guía completa de resolución de problemas.

---

**Documento generado por PMV – Project Manager Virtual**  
**Última actualización:** 2025-10-15  
**Estado del sistema:** 🟢 Operacional 24×7
