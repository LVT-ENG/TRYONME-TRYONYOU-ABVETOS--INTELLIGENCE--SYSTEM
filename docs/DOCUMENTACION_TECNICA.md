# Arquitectura Técnica: TRYONYOU Intelligence System

## 1. Visión General del Sistema

El sistema de automatización TRYONYOU consta de tres módulos principales que trabajan de forma integrada para optimizar el flujo de trabajo de desarrollo, finanzas y comunicaciones.

### 1.1 Componentes Principales

| Módulo | Función | Tecnología Base |
|--------|---------|-----------------|
| **Smart QA Agent** | Control de calidad automatizado post-deploy | Cloudflare Workers + Puppeteer |
| **AI Payment Reconciliation** | Conciliación automática de pagos AVBET | Cloudflare Workers + D1 Database |
| **AI Communication Layer** | Filtrado inteligente de mensajes | Cloudflare Workers + OpenAI API |

### 1.2 Stack Tecnológico

- **Runtime:** Cloudflare Workers (Edge Computing)
- **Base de datos:** Cloudflare D1 (SQLite distribuido)
- **Almacenamiento:** Cloudflare KV + R2
- **CI/CD:** GitHub Actions
- **IA:** OpenAI API (GPT-4.1-mini)
- **Notificaciones:** Telegram Bot API

## 2. Arquitectura de Cada Módulo

### 2.1 Smart QA Agent

**Propósito:** Verificar automáticamente cada deployment antes de marcarlo como exitoso.

**Flujo de trabajo:**
```
GitHub Push → GitHub Actions → Deploy → Trigger QA Worker → 
Run Tests → Generate Report → Send Notification
```

**Componentes:**
- `qa-agent-worker`: Worker principal que ejecuta las pruebas
- `qa-results-db`: Base de datos D1 para almacenar resultados
- `qa-config-kv`: KV store para configuración de tests

**Tests automatizados:**
1. Verificación de rutas HTTP (200 OK)
2. Detección de assets faltantes (CSS, JS, imágenes)
3. Verificación de dependencias actualizadas
4. Análisis de performance (Core Web Vitals)
5. Validación de enlaces rotos

**Endpoints:**
- `POST /api/qa/trigger` - Iniciar análisis QA
- `GET /api/qa/status/:deployId` - Consultar estado
- `GET /api/qa/report/:deployId` - Obtener reporte completo

### 2.2 AI Payment Reconciliation

**Propósito:** Cruzar automáticamente pagos AVBET con órdenes JIT.

**Flujo de trabajo:**
```
Cron Daily (3 AM) → Fetch AVBET Payments → Fetch JIT Orders → 
AI Matching → Update Records → Flag Discrepancies → Notify
```

**Componentes:**
- `payment-reconciliation-worker`: Worker de reconciliación
- `payments-db`: Base de datos D1 con tablas de pagos y órdenes
- `reconciliation-logs`: R2 bucket para logs históricos

**Tablas de base de datos:**
```sql
CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  amount REAL,
  currency TEXT,
  timestamp INTEGER,
  status TEXT,
  order_id TEXT,
  reconciled BOOLEAN DEFAULT 0
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  amount REAL,
  customer_id TEXT,
  timestamp INTEGER,
  payment_id TEXT,
  status TEXT
);

CREATE TABLE reconciliation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_date TEXT,
  matched_count INTEGER,
  unmatched_count INTEGER,
  errors TEXT
);
```

**Endpoints:**
- `POST /api/reconciliation/run` - Ejecutar reconciliación manual
- `GET /api/reconciliation/status` - Estado actual
- `GET /api/reconciliation/discrepancies` - Listar discrepancias
- `POST /api/reconciliation/resolve/:id` - Resolver manualmente

### 2.3 AI Communication Layer

**Propósito:** Filtrar y responder automáticamente a comunicaciones comunes.

**Flujo de trabajo:**
```
Email/Telegram Received → Webhook → AI Classification → 
Auto-respond OR Forward → Store Thread → Notify if Important
```

**Componentes:**
- `communication-layer-worker`: Worker de procesamiento
- `messages-db`: Base de datos D1 para mensajes
- `templates-kv`: KV store para plantillas de respuesta

**Clasificación de mensajes:**
1. **Colaboración** → Respuesta automática + guardar en `/partners/`
2. **Prensa** → Respuesta automática + notificar
3. **Licencia** → Respuesta automática + notificar
4. **Soporte técnico** → Clasificar y derivar
5. **Spam** → Descartar
6. **Urgente** → Notificar inmediatamente

**Endpoints:**
- `POST /api/comm/webhook` - Recibir mensaje entrante
- `GET /api/comm/threads/:category` - Listar hilos por categoría
- `POST /api/comm/respond/:id` - Responder manualmente
- `GET /api/comm/stats` - Estadísticas de comunicación

## 3. Integración con Infraestructura Existente

### 3.1 GitHub Actions Integration

**Archivo:** `.github/workflows/deploy-with-qa.yml`

```yaml
name: Deploy with QA
on:
  push:
    branches: [main, production]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Cloudflare
        # ... deploy steps
      - name: Trigger QA Agent
        run: |
          curl -X POST https://tryonyou.app/api/qa/trigger \
            -H "Authorization: Bearer ${{ secrets.QA_TOKEN }}" \
            -d '{"deployId": "${{ github.sha }}", "url": "https://tryonyou.app"}'
```

### 3.2 Cloudflare Workers Deployment

**Estructura de archivos:**
```
/workers
  /smart-qa-agent
    - worker.js
    - wrangler.toml
  /payment-reconciliation
    - worker.js
    - wrangler.toml
  /communication-layer
    - worker.js
    - wrangler.toml
```

### 3.3 Variables de Entorno

```bash
# OpenAI API
OPENAI_API_KEY=sk-...

# Telegram Bot
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# AVBET API
AVBET_API_KEY=...
AVBET_API_URL=https://api.avbet.com

# Authentication
QA_AUTH_TOKEN=...
RECONCILIATION_AUTH_TOKEN=...
COMM_AUTH_TOKEN=...
```

## 4. Seguridad y Autenticación

### 4.1 Autenticación de Workers

Todos los endpoints requieren autenticación mediante Bearer token:

```javascript
async function authenticate(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }
  const token = authHeader.substring(7);
  // Validar token contra KV store
  return await validateToken(token);
}
```

### 4.2 Rate Limiting

Implementado mediante Cloudflare Workers KV:

```javascript
async function rateLimit(clientId, limit = 100, window = 3600) {
  const key = `ratelimit:${clientId}:${Math.floor(Date.now() / (window * 1000))}`;
  const count = await KV.get(key) || 0;
  if (count >= limit) {
    return false;
  }
  await KV.put(key, count + 1, { expirationTtl: window });
  return true;
}
```

## 5. Monitoreo y Logging

### 5.1 Métricas Clave

- **Smart QA Agent:** Tests ejecutados, tests fallidos, tiempo promedio
- **Payment Reconciliation:** Pagos procesados, discrepancias, tasa de éxito
- **Communication Layer:** Mensajes procesados, auto-respuestas, clasificación

### 5.2 Dashboards

Cada worker expone un endpoint de métricas:

```
GET /api/metrics
```

Respuesta:
```json
{
  "worker": "smart-qa-agent",
  "uptime": 99.98,
  "requests_24h": 1247,
  "errors_24h": 3,
  "avg_response_time_ms": 245
}
```

## 6. Escalabilidad

### 6.1 Cloudflare Workers

- **Límite de CPU:** 50ms por request (puede extenderse)
- **Límite de memoria:** 128MB
- **Requests simultáneos:** Ilimitados (edge computing)

### 6.2 Base de datos D1

- **Límite de tamaño:** 10GB por base de datos
- **Queries por día:** 100,000 (plan gratuito)
- **Replicación:** Automática en múltiples regiones

## 7. Costos Estimados

| Servicio | Uso Mensual Estimado | Costo |
|----------|---------------------|-------|
| Cloudflare Workers | 1M requests | $5 |
| Cloudflare D1 | 100K queries/día | Gratis |
| Cloudflare R2 | 10GB storage | $0.15 |
| OpenAI API | 1M tokens | $2 |
| **Total** | | **~$7.15/mes** |

## 8. Roadmap de Implementación

### Fase 1: Infraestructura Base (Semana 1)
- ✅ Diseño de arquitectura
- ⏳ Configuración de Cloudflare Workers
- ⏳ Creación de bases de datos D1
- ⏳ Setup de KV stores

### Fase 2: Desarrollo de Workers (Semana 2-3)
- ⏳ Smart QA Agent
- ⏳ AI Payment Reconciliation
- ⏳ AI Communication Layer

### Fase 3: Integración (Semana 4)
- ⏳ GitHub Actions workflows
- ⏳ Webhooks y notificaciones
- ⏳ Testing end-to-end

### Fase 4: Documentación y Deploy (Semana 5)
- ⏳ Documentación técnica
- ⏳ Diagramas de arquitectura
- ⏳ Deploy a producción

## 9. Próximos Pasos

1. Crear repositorio en GitHub
2. Configurar Cloudflare account y workers
3. Implementar Smart QA Agent (prioridad 1)
4. Implementar AI Payment Reconciliation (prioridad 2)
5. Implementar AI Communication Layer (prioridad 3)
6. Configurar CI/CD con GitHub Actions
7. Deploy a producción en tryonyou.app

# TRYONYOU Intelligence System

Sistema de automatización inteligente para TRYONYOU, compuesto por tres módulos principales que optimizan el control de calidad, la gestión financiera y las comunicaciones.

## 🎯 Módulos

### 1. Smart QA Agent
Control de calidad automatizado que verifica cada deployment antes de publicarse.

**Características:**
- ✅ Verificación de rutas HTTP
- 🔍 Detección de assets faltantes
- 🔗 Validación de enlaces rotos
- ⚡ Análisis de performance
- 📋 Validación de metadata SEO

**Endpoints:**
- `POST /api/qa/trigger` - Iniciar análisis QA
- `GET /api/qa/status/:deployId` - Consultar estado
- `GET /api/qa/health` - Health check

### 2. AI Payment Reconciliation
Conciliación automática de pagos AVBET con órdenes JIT usando inteligencia artificial.

**Características:**
- 💰 Matching automático de pagos y órdenes
- 🤖 IA para casos complejos
- 📊 Detección de discrepancias
- ⏰ Ejecución programada diaria
- 📱 Notificaciones automáticas

**Endpoints:**
- `POST /api/reconciliation/run` - Ejecutar reconciliación
- `GET /api/reconciliation/status` - Estado actual
- `GET /api/reconciliation/discrepancies` - Listar discrepancias
- `GET /api/reconciliation/health` - Health check

### 3. AI Communication Layer
Filtrado inteligente y respuesta automática a comunicaciones entrantes.

**Características:**
- 📧 Clasificación automática de mensajes
- 🤖 Respuestas automáticas personalizadas
- 📁 Organización por categorías
- 🚨 Notificaciones para mensajes urgentes
- 📊 Estadísticas de comunicación

**Endpoints:**
- `POST /api/comm/webhook` - Recibir mensaje
- `GET /api/comm/threads/:category` - Listar hilos
- `GET /api/comm/stats` - Estadísticas
- `GET /api/comm/health` - Health check

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    TRYONYOU Intelligence System              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Smart QA    │  │   Payment    │  │Communication │      │
│  │    Agent     │  │Reconciliation│  │    Layer     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                  ┌─────────▼─────────┐                      │
│                  │ Cloudflare Workers │                      │
│                  └─────────┬─────────┘                      │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │             │
│    ┌────▼────┐      ┌─────▼─────┐      ┌────▼────┐        │
│    │ D1 DB   │      │ KV Store  │      │ R2 Bucket│        │
│    └─────────┘      └───────────┘      └─────────┘        │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    GitHub Actions CI/CD                      │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 20+
- Cuenta de Cloudflare
- Wrangler CLI
- GitHub account

### 1. Clonar el repositorio

```bash
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Cloudflare

#### Crear bases de datos D1

```bash
# Smart QA Agent
wrangler d1 create tryonyou_qa_results
wrangler d1 execute tryonyou_qa_results --file=./schemas/qa-agent-schema.sql

# Payment Reconciliation
wrangler d1 create tryonyou_payments
wrangler d1 execute tryonyou_payments --file=./schemas/payment-reconciliation-schema.sql

# Communication Layer
wrangler d1 create tryonyou_messages
wrangler d1 execute tryonyou_messages --file=./schemas/communication-layer-schema.sql
```

#### Crear KV Namespaces

```bash
wrangler kv:namespace create "QA_CONFIG"
wrangler kv:namespace create "TEMPLATES_KV"
```

#### Configurar secrets

```bash
# Smart QA Agent
wrangler secret put QA_AUTH_TOKEN --name tryonyou-smart-qa-agent
wrangler secret put TELEGRAM_BOT_TOKEN --name tryonyou-smart-qa-agent
wrangler secret put TELEGRAM_CHAT_ID --name tryonyou-smart-qa-agent

# Payment Reconciliation
wrangler secret put RECONCILIATION_AUTH_TOKEN --name tryonyou-payment-reconciliation
wrangler secret put OPENAI_API_KEY --name tryonyou-payment-reconciliation
wrangler secret put TELEGRAM_BOT_TOKEN --name tryonyou-payment-reconciliation
wrangler secret put TELEGRAM_CHAT_ID --name tryonyou-payment-reconciliation
wrangler secret put AVBET_API_KEY --name tryonyou-payment-reconciliation
wrangler secret put AVBET_API_URL --name tryonyou-payment-reconciliation

# Communication Layer
wrangler secret put COMM_AUTH_TOKEN --name tryonyou-communication-layer
wrangler secret put OPENAI_API_KEY --name tryonyou-communication-layer
wrangler secret put TELEGRAM_BOT_TOKEN --name tryonyou-communication-layer
wrangler secret put TELEGRAM_CHAT_ID --name tryonyou-communication-layer
```

### 4. Actualizar wrangler.toml

Actualiza los IDs de las bases de datos y KV namespaces en cada archivo `wrangler.toml`:

```toml
# Ejemplo para Smart QA Agent
[[d1_databases]]
binding = "QA_DB"
database_name = "tryonyou_qa_results"
database_id = "TU_DATABASE_ID_AQUI"

[[kv_namespaces]]
binding = "QA_CONFIG"
id = "TU_KV_NAMESPACE_ID_AQUI"
```

### 5. Deploy de Workers

```bash
# Smart QA Agent
cd workers/smart-qa-agent
wrangler deploy

# Payment Reconciliation
cd ../payment-reconciliation
wrangler deploy

# Communication Layer
cd ../communication-layer
wrangler deploy
```

### 6. Configurar GitHub Actions

Añade los siguientes secrets en tu repositorio de GitHub:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `QA_AUTH_TOKEN`
- `RECONCILIATION_AUTH_TOKEN`
- `COMM_AUTH_TOKEN`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## 📖 Uso

### Smart QA Agent

#### Trigger manual

```bash
curl -X POST https://tryonyou.app/api/qa/trigger \
  -H "Authorization: Bearer YOUR_QA_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deployId": "abc123",
    "url": "https://tryonyou.app"
  }'
```

#### Consultar resultados

```bash
curl https://tryonyou.app/api/qa/status/abc123 \
  -H "Authorization: Bearer YOUR_QA_AUTH_TOKEN"
```

### Payment Reconciliation

#### Ejecutar reconciliación

```bash
curl -X POST https://tryonyou.app/api/reconciliation/run \
  -H "Authorization: Bearer YOUR_RECONCILIATION_AUTH_TOKEN"
```

#### Ver discrepancias

```bash
curl https://tryonyou.app/api/reconciliation/discrepancies \
  -H "Authorization: Bearer YOUR_RECONCILIATION_AUTH_TOKEN"
```

### Communication Layer

#### Enviar mensaje para procesamiento

```bash
curl -X POST https://tryonyou.app/api/comm/webhook \
  -H "Authorization: Bearer YOUR_COMM_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "msg_123",
    "source": "email",
    "from": "contact@example.com",
    "subject": "Consulta de colaboración",
    "body": "Hola, me gustaría colaborar con TRYONYOU..."
  }'
```

#### Ver estadísticas

```bash
curl https://tryonyou.app/api/comm/stats?days=7 \
  -H "Authorization: Bearer YOUR_COMM_AUTH_TOKEN"
```

## 🔧 Desarrollo

### Estructura del proyecto

```
tryonyou-intelligence-system/
├── workers/
│   ├── smart-qa-agent/
│   │   ├── worker.js
│   │   └── wrangler.toml
│   ├── payment-reconciliation/
│   │   ├── worker.js
│   │   └── wrangler.toml
│   └── communication-layer/
│       ├── worker.js
│       └── wrangler.toml
├── schemas/
│   ├── qa-agent-schema.sql
│   ├── payment-reconciliation-schema.sql
│   └── communication-layer-schema.sql
├── .github/
│   └── workflows/
│       ├── deploy-with-qa.yml
│       └── daily-payment-reconciliation.yml
├── docs/
│   └── arquitectura_tryonyou.md
└── README.md
```

### Testing local

```bash
# Smart QA Agent
cd workers/smart-qa-agent
wrangler dev

# Payment Reconciliation
cd workers/payment-reconciliation
wrangler dev

# Communication Layer
cd workers/communication-layer
wrangler dev
```

## 📊 Monitoreo

### Métricas disponibles

Cada worker expone métricas en el endpoint `/api/metrics`:

```json
{
  "worker": "smart-qa-agent",
  "uptime": 99.98,
  "requests_24h": 1247,
  "errors_24h": 3,
  "avg_response_time_ms": 245
}
```

### Dashboards

- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **GitHub Actions:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/actions

## 💰 Costos Estimados

| Servicio | Uso Mensual | Costo |
|----------|-------------|-------|
| Cloudflare Workers | 1M requests | $5 |
| Cloudflare D1 | 100K queries/día | Gratis |
| Cloudflare R2 | 10GB storage | $0.15 |
| OpenAI API | 1M tokens | $2 |
| **Total** | | **~$7.15/mes** |

## 🤝 Contribución

Este es un proyecto interno de TRYONYOU. Para contribuir:

1. Crea una rama desde `main`
2. Realiza tus cambios
3. Crea un Pull Request
4. Espera la revisión y aprobación

## 📝 Licencia

Propiedad de TRYONYOU. Todos los derechos reservados.

## 📞 Soporte

Para soporte técnico, contacta al equipo de ingeniería de TRYONYOU.

---

**Versión:** 1.0.0  
**Última actualización:** 25 de octubre de 2025  
**Mantenido por:** LVT-ENG Team

