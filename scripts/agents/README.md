# Agentes Inteligentes TRYONYOU

Este directorio contiene los scripts de los agentes activos 24×7 que automatizan las operaciones críticas del sistema TRYONYOU.

## 🤖 Agentes Disponibles

### orchestrator-daily-report.js
**Agente 70: Orquestador General**

Genera y envía el reporte diario a las 09:00 UTC vía Telegram.

**Uso:**
```bash
# Con variables de entorno
export GITHUB_TOKEN=your_token
export TELEGRAM_BOT_TOKEN=your_bot_token
export TELEGRAM_CHAT_ID=your_chat_id

node scripts/agents/orchestrator-daily-report.js
```

**Variables requeridas:**
- `GITHUB_TOKEN`: Token de GitHub con acceso al repositorio
- `TELEGRAM_BOT_TOKEN`: Token del bot de Telegram
- `TELEGRAM_CHAT_ID`: ID del chat para notificaciones

**Output:**
- Lista de issues P0/P1
- Deploys últimas 24h
- Métricas del sistema
- Guías rápidas

### brand-guardian.js
**Agente 12: Brand Guardian**

Valida coherencia visual, paleta de colores y tipografías.

**Uso:**
```bash
node scripts/agents/brand-guardian.js
```

**Variables:** Ninguna (usa archivos locales)

**Validaciones:**
- ✅ Paleta de colores oficial (#D3B26A, #0E6B6B, #141619, #F5EFE6)
- ✅ Tipografías autorizadas (Playfair Display, Inter, Fira Code)
- ✅ Estructura de assets
- ✅ Tamaño y formato de imágenes

**Output:**
- Score de marca (0-100%)
- Lista de violaciones y advertencias
- Recomendaciones

## 🚀 Integración con GitHub Actions

Estos agentes se ejecutan automáticamente a través de workflows:

### daily-report.yml
Ejecuta `orchestrator-daily-report.js` diariamente a las 09:00 UTC.

### deploy.yml
Ejecuta `brand-guardian.js` antes de cada deploy (en implementaciones futuras).

## 📦 Dependencias

```json
{
  "@octokit/rest": "^20.0.2",  // orchestrator-daily-report.js
  "puppeteer": "^21.0.0"        // future: screenshots
}
```

## 🔧 Desarrollo

### Agregar Nuevo Agente

1. Crear archivo en `scripts/agents/nombre-agente.js`
2. Seguir estructura similar a agentes existentes
3. Documentar en este README
4. Agregar workflow si es necesario
5. Actualizar `docs/agents-active-24x7.md`

### Template Base

```javascript
#!/usr/bin/env node

/**
 * Agente XX: Nombre del Agente
 * 
 * Descripción de funcionalidad
 */

class AgentName {
  constructor() {
    // Inicialización
  }

  async run() {
    // Lógica principal
    console.log('🤖 Agente XX: Iniciando...');
    // ...
    console.log('✅ Completado');
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  const agent = new AgentName();
  agent.run().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

export default AgentName;
```

## 📊 Logs y Monitoring

### Ver Logs en Local
```bash
node scripts/agents/orchestrator-daily-report.js 2>&1 | tee agent.log
```

### Ver Logs en GitHub Actions
1. Ir a: `Actions` tab en GitHub
2. Seleccionar workflow
3. Seleccionar run
4. Ver logs de cada step

## 🧪 Testing

### Test Local
```bash
# Orchestrator
npm install @octokit/rest
export GITHUB_TOKEN=ghp_xxx
export TELEGRAM_BOT_TOKEN=123:ABC
export TELEGRAM_CHAT_ID=123456
node scripts/agents/orchestrator-daily-report.js

# Brand Guardian
node scripts/agents/brand-guardian.js
```

### Test en CI/CD
```bash
# Push a branch para activar workflow
git add .
git commit -m "test: agent validation"
git push
```

## 🔐 Seguridad

### Variables Sensibles
- ❌ NO commitear tokens en código
- ✅ Usar variables de entorno
- ✅ Configurar GitHub Secrets para CI/CD
- ✅ Rotar tokens periódicamente

### Permisos Requeridos
- **GITHUB_TOKEN**: `repo`, `issues`, `actions`
- **TELEGRAM_BOT_TOKEN**: Envío de mensajes
- **VERCEL_TOKEN**: Despliegue automático

## 📚 Recursos

### Documentación
- [docs/agents-active-24x7.md](../../docs/agents-active-24x7.md) - Especificaciones completas
- [docs/agent-deployment-guide.md](../../docs/agent-deployment-guide.md) - Guía de despliegue
- [docs/agentes.md](../../docs/agentes.md) - Catálogo de 50 agentes

### APIs Utilizadas
- [Octokit (GitHub API)](https://github.com/octokit/rest.js)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Vercel API](https://vercel.com/docs/rest-api)

---

**Mantenido por:** Agente 70 - Orquestador General  
**Última actualización:** 2025-10-15
