# Guía de Deployment - TRYONYOU Intelligence System

## 🎯 Objetivo

Conectar los tres módulos de automatización (Smart QA Agent, AI Payment Reconciliation, AI Communication Layer) al dominio **tryonyou.app** mediante Cloudflare Workers.

## 📋 Prerrequisitos Completados

✅ Código de los tres workers desarrollado  
✅ Schemas de bases de datos D1 creados  
✅ Workflows de GitHub Actions configurados  
✅ Documentación técnica generada  
✅ Código sincronizado en repositorio maestro

## 🚀 Pasos de Deployment

### Fase 1: Configuración de Cloudflare (15-20 minutos)

#### 1.1 Crear Bases de Datos D1

```bash
# Conectar a tu cuenta de Cloudflare
wrangler login

# Crear base de datos para Smart QA Agent
wrangler d1 create tryonyou_qa_results

# Copiar el database_id que aparece en la respuesta
# Ejemplo: database_id = "abc123-def456-ghi789"

# Ejecutar el schema
wrangler d1 execute tryonyou_qa_results --file=./schemas/qa-agent-schema.sql

# Repetir para Payment Reconciliation
wrangler d1 create tryonyou_payments
wrangler d1 execute tryonyou_payments --file=./schemas/payment-reconciliation-schema.sql

# Repetir para Communication Layer
wrangler d1 create tryonyou_messages
wrangler d1 execute tryonyou_messages --file=./schemas/communication-layer-schema.sql
```

#### 1.2 Crear KV Namespaces

```bash
# Para Smart QA Agent
wrangler kv:namespace create "QA_CONFIG"
# Copiar el id que aparece

# Para Communication Layer
wrangler kv:namespace create "TEMPLATES_KV"
# Copiar el id que aparece
```

#### 1.3 Actualizar wrangler.toml

Edita cada archivo `wrangler.toml` en las carpetas de workers y reemplaza:

- `YOUR_D1_DATABASE_ID` con los IDs reales de las bases de datos
- `YOUR_KV_NAMESPACE_ID` con los IDs reales de los KV namespaces
- `YOUR_CLOUDFLARE_ACCOUNT_ID` con tu account ID de Cloudflare

**Ejemplo para Smart QA Agent:**

```toml
[[d1_databases]]
binding = "QA_DB"
database_name = "tryonyou_qa_results"
database_id = "abc123-def456-ghi789"  # ← Reemplazar con tu ID real

[[kv_namespaces]]
binding = "QA_CONFIG"
id = "xyz789-uvw456-rst123"  # ← Reemplazar con tu ID real
```

### Fase 2: Configuración de Secrets (10 minutos)

#### 2.1 Generar Tokens de Autenticación

```bash
# Generar tokens seguros (puedes usar este comando o cualquier generador)
openssl rand -hex 32
```

#### 2.2 Configurar Secrets en Cloudflare

**Smart QA Agent:**

```bash
cd workers/smart-qa-agent

# Token de autenticación
wrangler secret put QA_AUTH_TOKEN
# Pegar el token generado cuando se solicite

# Telegram Bot Token (obtener de @BotFather en Telegram)
wrangler secret put TELEGRAM_BOT_TOKEN

# Telegram Chat ID (obtener de @userinfobot en Telegram)
wrangler secret put TELEGRAM_CHAT_ID
```

**Payment Reconciliation:**

```bash
cd workers/payment-reconciliation

wrangler secret put RECONCILIATION_AUTH_TOKEN
wrangler secret put OPENAI_API_KEY  # Tu API key de OpenAI
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler secret put AVBET_API_KEY  # API key de AVBET
wrangler secret put AVBET_API_URL  # URL de la API de AVBET
```

**Communication Layer:**

```bash
cd workers/communication-layer

wrangler secret put COMM_AUTH_TOKEN
wrangler secret put OPENAI_API_KEY
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
```

### Fase 3: Deploy de Workers (10 minutos)

```bash
# Smart QA Agent
cd workers/smart-qa-agent
wrangler deploy
# Verificar que aparezca: "Published tryonyou-smart-qa-agent"

# Payment Reconciliation
cd ../payment-reconciliation
wrangler deploy
# Verificar que aparezca: "Published tryonyou-payment-reconciliation"

# Communication Layer
cd ../communication-layer
wrangler deploy
# Verificar que aparezca: "Published tryonyou-communication-layer"
```

### Fase 4: Configurar Routes en tryonyou.app (5 minutos)

#### Opción A: Configurar via Dashboard de Cloudflare

1. Ir a **Cloudflare Dashboard** → **Workers & Pages**
2. Seleccionar cada worker
3. Ir a **Settings** → **Triggers** → **Routes**
4. Añadir las siguientes rutas:

**Smart QA Agent:**
- Route: `tryonyou.app/api/qa/*`
- Zone: `tryonyou.app`

**Payment Reconciliation:**
- Route: `tryonyou.app/api/reconciliation/*`
- Zone: `tryonyou.app`

**Communication Layer:**
- Route: `tryonyou.app/api/comm/*`
- Zone: `tryonyou.app`

#### Opción B: Configurar via CLI

```bash
# Smart QA Agent
wrangler route add tryonyou.app/api/qa/* tryonyou-smart-qa-agent --zone-name tryonyou.app

# Payment Reconciliation
wrangler route add tryonyou.app/api/reconciliation/* tryonyou-payment-reconciliation --zone-name tryonyou.app

# Communication Layer
wrangler route add tryonyou.app/api/comm/* tryonyou-communication-layer --zone-name tryonyou.app
```

### Fase 5: Configurar GitHub Actions (10 minutos)

#### 5.1 Añadir Secrets en GitHub

Ir a tu repositorio en GitHub:
1. **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Añadir los siguientes secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Token de API de Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | Tu Account ID de Cloudflare |
| `QA_AUTH_TOKEN` | Token generado para QA Agent |
| `RECONCILIATION_AUTH_TOKEN` | Token generado para Payment Reconciliation |
| `COMM_AUTH_TOKEN` | Token generado para Communication Layer |
| `TELEGRAM_BOT_TOKEN` | Token de tu bot de Telegram |
| `TELEGRAM_CHAT_ID` | ID de tu chat de Telegram |

#### 5.2 Verificar Workflows

Los workflows ya están configurados en `.github/workflows/`:
- `deploy-with-qa.yml` - Se ejecuta en cada push a main/production
- `daily-payment-reconciliation.yml` - Se ejecuta diariamente a las 3 AM

### Fase 6: Testing y Verificación (15 minutos)

#### 6.1 Test de Smart QA Agent

```bash
curl -X POST https://tryonyou.app/api/qa/trigger \
  -H "Authorization: Bearer TU_QA_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deployId": "test-001",
    "url": "https://tryonyou.app"
  }'
```

**Respuesta esperada:** JSON con resultados de tests

#### 6.2 Test de Payment Reconciliation

```bash
curl -X POST https://tryonyou.app/api/reconciliation/run \
  -H "Authorization: Bearer TU_RECONCILIATION_AUTH_TOKEN"
```

**Respuesta esperada:** JSON con resultados de reconciliación

#### 6.3 Test de Communication Layer

```bash
curl -X POST https://tryonyou.app/api/comm/webhook \
  -H "Authorization: Bearer TU_COMM_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-msg-001",
    "source": "email",
    "from": "test@example.com",
    "subject": "Test de colaboración",
    "body": "Hola, me gustaría colaborar con TRYONYOU"
  }'
```

**Respuesta esperada:** JSON con clasificación y estado del mensaje

#### 6.4 Health Checks

```bash
# Smart QA Agent
curl https://tryonyou.app/api/qa/health

# Payment Reconciliation
curl https://tryonyou.app/api/reconciliation/health

# Communication Layer
curl https://tryonyou.app/api/comm/health
```

**Respuesta esperada para todos:** `{"status":"ok","service":"nombre-del-servicio"}`

### Fase 7: Monitoreo Post-Deployment (Continuo)

#### 7.1 Dashboards de Cloudflare

Acceder a:
- **Workers & Pages** → Ver métricas de requests, errores, latencia
- **D1** → Ver queries ejecutadas, tamaño de bases de datos
- **Logs** → Ver logs en tiempo real

#### 7.2 GitHub Actions

- Ver ejecuciones en **Actions** tab del repositorio
- Revisar logs de deployments y reconciliaciones

#### 7.3 Telegram

- Verificar que lleguen notificaciones de:
  - Deployments exitosos/fallidos
  - Resultados de QA
  - Alertas de reconciliación
  - Mensajes importantes clasificados

## 🔧 Troubleshooting

### Problema: Worker no responde

**Solución:**
1. Verificar que el worker esté publicado: `wrangler deployments list`
2. Verificar routes: `wrangler route list`
3. Ver logs: `wrangler tail nombre-del-worker`

### Problema: Error de autenticación

**Solución:**
1. Verificar que el token sea correcto
2. Verificar que el header sea: `Authorization: Bearer TOKEN`
3. Regenerar el token si es necesario: `wrangler secret put NOMBRE_TOKEN`

### Problema: Error de base de datos

**Solución:**
1. Verificar que el database_id en wrangler.toml sea correcto
2. Verificar que el schema se haya ejecutado: `wrangler d1 execute DB_NAME --command "SELECT * FROM sqlite_master"`
3. Re-ejecutar schema si es necesario

### Problema: Cron no se ejecuta

**Solución:**
1. Verificar que el trigger esté configurado en wrangler.toml
2. Ver logs de ejecuciones programadas en Cloudflare Dashboard
3. Ejecutar manualmente para probar: `wrangler dev --test-scheduled`

## 📊 Métricas de Éxito

Después del deployment, deberías ver:

✅ **Smart QA Agent:**
- Tests ejecutándose automáticamente después de cada deploy
- Notificaciones en Telegram de resultados
- Logs en D1 de cada ejecución

✅ **Payment Reconciliation:**
- Ejecución diaria a las 3 AM
- Matches automáticos de pagos y órdenes
- Alertas de discrepancias en Telegram

✅ **Communication Layer:**
- Mensajes clasificados automáticamente
- Respuestas automáticas enviadas
- Notificaciones de mensajes urgentes

## 🎉 ¡Deployment Completado!

Una vez completados todos los pasos, el sistema estará:

- ✅ Conectado a **tryonyou.app**
- ✅ Ejecutándose en **Cloudflare Workers**
- ✅ Integrado con **GitHub Actions**
- ✅ Monitoreado vía **Telegram**
- ✅ Listo para producción

## 📞 Soporte

Para cualquier problema durante el deployment, contactar al equipo de ingeniería de TRYONYOU.

---

**Última actualización:** 25 de octubre de 2025  
**Versión:** 1.0.0

# 🚀 TRYONYOU Deploy Express - INBOX Auto Deploy

## 📂 Sistema de Deploy Automático

Esta carpeta funciona como **INBOX** para disparar deploys automáticos de TRYONYOU.APP.

### ¿Cómo funciona?

```
1. Colocar archivo en INBOX
2. GitHub Actions detecta el archivo (cada 15 min)
3. Build automático con Vite 7.1.2
4. Deploy a Vercel (tryonyou.app)
5. Notificación a @abvet_deploy_bot
6. Archivo movido a .processed/
```

---

## 📋 Instrucciones de Uso

### Opción A: Via GitHub Web

1. Ir a: https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/tree/main/TRYONYOU_DEPLOY_EXPRESS_INBOX
2. Click en "Add file" → "Upload files"
3. Arrastrar archivo(s)
4. Commit changes
5. **Esperar 15 minutos** (o disparar manualmente)

### Opción B: Via Git Local

```bash
# Clonar repositorio
git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

# Copiar archivo a INBOX
cp /path/to/file.md TRYONYOU_DEPLOY_EXPRESS_INBOX/

# Commit y push
git add TRYONYOU_DEPLOY_EXPRESS_INBOX/
git commit -m "deploy: Add file to INBOX"
git push origin main

# El workflow se ejecutará automáticamente
```

### Opción C: Disparo Manual

```bash
# Via GitHub Actions UI
1. Ir a: Actions → INBOX Auto Deploy
2. Click en "Run workflow"
3. Seleccionar branch: main
4. Click en "Run workflow"
```

---

## ⏱️ Frecuencia de Verificación

- **Automático:** Cada 15 minutos (cron schedule)
- **Manual:** On-demand via workflow_dispatch

---

## 📁 Estructura de Archivos

```
TRYONYOU_DEPLOY_EXPRESS_INBOX/
├── .gitkeep                    # Mantiene la carpeta en Git
├── README.md                   # Documentación original
├── AUTO_DEPLOY_README.md       # Esta guía
├── .processed/                 # Archivos ya procesados
│   └── [archivos antiguos]
└── [nuevos archivos]           # Archivos pendientes de deploy
```

---

## 🔔 Notificaciones

Cada deploy automático envía una notificación a **@abvet_deploy_bot** con:

- ✅ Número de archivos procesados
- ✅ Estado del build
- ✅ URL del deployment
- ✅ Lista de archivos

---

## 📊 Logs y Historial

### Ver Ejecuciones

```
GitHub → Actions → INBOX Auto Deploy
```

### Ver Archivos Procesados

```
TRYONYOU_DEPLOY_EXPRESS_INBOX/.processed/
```

### Ver Logs de Deploy

```
logs/inbox-watcher.log
logs/deploy-history.log
```

---

## 🛠️ Troubleshooting

### El archivo no se procesa

**Posibles causas:**
1. El archivo tiene un nombre que empieza con `.` (oculto)
2. El archivo se llama `README.md`
3. El workflow aún no se ha ejecutado (esperar 15 min)

**Solución:**
- Renombrar el archivo
- Disparar el workflow manualmente

### El deploy falla

**Posibles causas:**
1. Error en el build de Vite
2. Secrets no configurados en GitHub
3. Error de conexión con Vercel

**Solución:**
- Revisar logs en GitHub Actions
- Verificar secrets en Settings → Secrets
- Verificar conexión con Vercel

### No llegan notificaciones

**Posibles causas:**
1. `TELEGRAM_BOT_TOKEN` incorrecto
2. `TELEGRAM_CHAT_ID` incorrecto
3. Bot bloqueado o sin permisos

**Solución:**
- Verificar secrets en GitHub
- Probar el bot manualmente
- Verificar permisos del bot

---

## 🎯 Best Practices

### ✅ Hacer

- Usar nombres descriptivos para los archivos
- Incluir fecha en el nombre (ej: `2025-10-25-feature.md`)
- Verificar que el archivo sea válido antes de subirlo
- Revisar notificaciones de Telegram

### ❌ Evitar

- Subir archivos muy grandes (>10MB)
- Usar caracteres especiales en nombres
- Subir múltiples archivos a la vez (puede causar conflictos)
- Modificar archivos en `.processed/`

---

## 📞 Soporte

Para problemas o preguntas:

1. **GitHub Issues:** https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues
2. **Telegram:** @abvet_deploy_bot
3. **Logs:** Revisar GitHub Actions

---

## 🔄 Flujo Completo Detallado

```mermaid
graph TD
    A[Archivo en INBOX] --> B{Cron 15 min}
    B --> C[GitHub Actions detecta]
    C --> D[Checkout repo]
    D --> E[Count files]
    E --> F{Files > 0?}
    F -->|No| G[Skip]
    F -->|Yes| H[Setup Node.js]
    H --> I[Install deps]
    I --> J[Build con Vite]
    J --> K[Deploy a Vercel]
    K --> L[Notificar Telegram]
    L --> M[Mover a .processed]
    M --> N[Commit changes]
    N --> O[Push to main]
```

---

**Última actualización:** 25 de octubre de 2025  
**Versión:** 1.0.0  
**Mantenido por:** LVT-ENG Team

