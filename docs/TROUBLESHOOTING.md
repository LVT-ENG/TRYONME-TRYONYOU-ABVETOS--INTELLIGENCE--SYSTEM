# Troubleshooting - Guía de Resolución de Problemas

Guía completa para resolver problemas comunes en el sistema TryOnMe / TryOnYou - AVBETOS Intelligence System.

## 🔍 Diagnóstico Rápido

### Estado del Sistema

Antes de diagnosticar problemas específicos, verifica el estado general:

```bash
# 1. Check health endpoint
curl -s https://tu-dominio.com/health.php | jq '.'

# 2. Verificar status de servicios
curl -s https://tu-dominio.com/health.php | jq '.status'

# 3. Ver métricas críticas
curl -s https://tu-dominio.com/health.php | jq '.metrics'
```

### Códigos de Estado

- 🟢 **ok**: Sistema funcionando correctamente
- 🟡 **degraded**: Sistema funcionando con advertencias  
- 🔴 **error**: Sistema con errores críticos

## 🚨 Problemas Críticos

### Sistema No Responde

**Síntomas**:
- Health endpoint retorna 500/503
- Aplicación no carga
- Timeouts en requests

**Diagnóstico**:
```bash
# Verificar conectividad
ping tu-dominio.com

# Check DNS
nslookup tu-dominio.com

# Verificar certificado SSL
curl -I https://tu-dominio.com

# Check Vercel deployment status
vercel ls --token=$VERCEL_TOKEN
```

**Soluciones**:
1. **Problema de despliegue**: Re-desplegar desde GitHub Actions
2. **Problema de DNS**: Verificar configuración en Vercel
3. **Problema de certificado**: Regenerar certificado SSL
4. **Sobrecarga**: Escalar recursos o implementar rate limiting

### Base de Datos Desconectada

**Síntomas**:
- Error "Database connection failed"
- Recomendaciones no cargan
- Datos de usuario no se guardan

**Diagnóstico**:
```bash
# Verificar conexión a Google Sheets (prototipo)
curl -s "https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID" \
  -H "Authorization: Bearer $GOOGLE_API_KEY"

# Verificar MySQL (producción)
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS -e "SELECT 1"
```

**Soluciones**:
1. **Google Sheets**: Verificar permisos de API
2. **MySQL**: Restart del servicio o verificar credenciales
3. **Timeout**: Aumentar timeout de conexión
4. **Límites de API**: Verificar quotas de Google

### Error Rate Alto (>1%)

**Síntomas**:
- Alertas automáticas activadas
- Múltiples errores en Sentry
- Usuarios reportan fallos

**Diagnóstico**:
```bash
# Ver errores recientes en health endpoint
curl -s https://tu-dominio.com/health.php | jq '.metrics.error_rate_percent'

# Check Sentry dashboard
# https://sentry.io/organizations/tu-org/issues/

# Revisar logs de Vercel
vercel logs tu-dominio.com --token=$VERCEL_TOKEN
```

**Soluciones**:
1. **Rollback**: Revertir último despliegue
2. **Hotfix**: Deploy rápido con corrección
3. **Scaling**: Aumentar recursos si es problema de carga
4. **Rate limiting**: Implementar límites temporales

## ⚠️ Problemas de Performance

### Respuesta Lenta (P95 >300ms)

**Síntomas**:
- Health endpoint muestra P95 >300ms
- Usuarios reportan lentitud
- Timeouts ocasionales

**Diagnóstico**:
```bash
# Medir tiempo de respuesta
time curl -s https://tu-dominio.com/health.php

# Verificar métricas de performance
curl -s https://tu-dominio.com/health.php | jq '.metrics.p95_response_time_ms'

# Check Lighthouse score
npx lighthouse https://tu-dominio.com --output=json
```

**Optimizaciones**:
1. **Frontend**: Optimizar bundle size, lazy loading
2. **Images**: Comprimir imágenes, usar WebP
3. **CDN**: Configurar caching en Vercel
4. **Database**: Optimizar queries, añadir índices
5. **API**: Implementar caching, paginación

### Try-On Virtual Lento

**Síntomas**:
- Procesamiento de imágenes >10 segundos
- Timeouts en try-on requests
- Usuarios abandonan la función

**Diagnóstico**:
```javascript
// Frontend: Medir tiempo de try-on
const startTime = Date.now();
try {
  const result = await tryOnProduct(userId, productId, photo);
  const duration = Date.now() - startTime;
  console.log(`Try-on took ${duration}ms`);
} catch (error) {
  console.error('Try-on failed:', error);
}
```

**Optimizaciones**:
1. **Imagen input**: Reducir resolución antes de enviar
2. **Preprocessing**: Optimizar en cliente cuando sea posible
3. **Queue system**: Implementar cola para procesamiento
4. **Caching**: Cachear resultados similares
5. **Progress indicator**: Mostrar progreso al usuario

## 🔐 Problemas de Autenticación

### Verificación Biométrica Falla

**Síntomas**:
- "Biometric verification failed"
- Confidence score muy bajo (<0.75)
- Usuarios no pueden autenticarse

**Diagnóstico**:
```javascript
// Frontend: Debug biometric data quality
const debugBiometric = async (voiceSample, irisTemplate) => {
  console.log('Voice sample length:', voiceSample.length);
  console.log('Iris template size:', irisTemplate.length);
  
  // Verificar calidad de datos
  const quality = await checkBiometricQuality({
    voiceSample,
    irisTemplate
  });
  
  console.log('Biometric quality:', quality);
};
```

**Soluciones**:
1. **Calidad de audio**: Verificar micrófono, ruido ambiente
2. **Calidad de imagen**: Verificar iluminación, cámara
3. **Re-enrollment**: Permitir re-registro biométrico
4. **Fallback**: Implementar autenticación alternativa temporal
5. **Threshold**: Ajustar umbrales de confianza temporalmente

### Sesiones Expiran Rápidamente

**Síntomas**:
- Usuarios se desconectan frecuentemente
- "Session expired" errors
- Re-autenticación constante

**Diagnóstico**:
```bash
# Verificar configuración de sesiones
grep -r "session" config/
grep -r "expire" config/

# Check JWT token expiration
node -e "
const jwt = require('jsonwebtoken');
const token = 'tu-jwt-token';
const decoded = jwt.decode(token);
console.log('Token expires:', new Date(decoded.exp * 1000));
"
```

**Soluciones**:
1. **Extender TTL**: Aumentar tiempo de vida de sesión
2. **Refresh tokens**: Implementar renovación automática
3. **Remember me**: Opción de sesión persistente
4. **Activity tracking**: Renovar sesión con actividad

## 🌐 Problemas de Frontend

### React App No Carga

**Síntomas**:
- Pantalla en blanco
- Console errors sobre módulos
- Build failures

**Diagnóstico**:
```bash
# Verificar build local
npm run build
npm run preview

# Check console errors
# Abrir DevTools -> Console

# Verificar variables de entorno
echo $VITE_SENTRY_DSN
echo $VITE_API_BASE_URL
```

**Soluciones**:
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json dist
npm install
npm run build

# Verificar variables de entorno
cp .env.example .env.local
# Editar .env.local con valores correctos

# Re-desplegar
git push origin main
```

### Sentry No Reporta Errores

**Síntomas**:
- No aparecen errores en Sentry dashboard
- Métricas de performance vacías
- No hay session replays

**Diagnóstico**:
```javascript
// Probar Sentry manualmente
import * as Sentry from '@sentry/react';

// Test error capture
Sentry.captureException(new Error('Test error'));

// Test custom event
Sentry.addBreadcrumb({
  message: 'Test breadcrumb',
  level: 'info'
});

// Verificar configuración
console.log('Sentry DSN:', import.meta.env.VITE_SENTRY_DSN);
console.log('Environment:', import.meta.env.VITE_ENVIRONMENT);
```

**Soluciones**:
1. **DSN incorrecto**: Verificar VITE_SENTRY_DSN
2. **Configuración**: Revisar sentry.js initialization
3. **Environment**: Verificar que no esté en modo development
4. **Permisos**: Verificar quota y permisos en Sentry

### Componentes No Se Renderizan

**Síntomas**:
- Componentes aparecen vacíos
- Props no llegan a componentes hijos
- Estado no se actualiza

**Diagnóstico**:
```javascript
// Debug props
const DebugComponent = (props) => {
  console.log('Component props:', props);
  console.log('Component state:', useState_value);
  
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);
  
  return <div>Debug info</div>;
};

// React DevTools
// Instalar React Developer Tools extension
```

**Soluciones**:
1. **Key props**: Verificar keys únicas en listas
2. **State updates**: Verificar que setState se llame correctamente
3. **Effect dependencies**: Revisar useEffect dependencies
4. **Conditional rendering**: Verificar condiciones de renderizado

## 📧 Problemas de Email

### Emails No Se Envían

**Síntomas**:
- Formulario de contacto no funciona
- 500 error en mailer.php
- Usuarios no reciben confirmaciones

**Diagnóstico**:
```bash
# Test PHP mail function
php -r "
if (mail('test@example.com', 'Test', 'Test message')) {
    echo 'Mail function works';
} else {
    echo 'Mail function failed';
}
"

# Verificar configuración SMTP
grep -r "SMTP" config/
```

**Soluciones**:
```php
// mailer.php - Añadir debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verificar configuración
if (!mail($to, $subject, $message, $headers)) {
    error_log("Mail failed: " . error_get_last()['message']);
}

// Usar SMTP alternativo
// Configurar SendGrid, Mailgun, etc.
```

### Rate Limiting en Emails

**Síntomas**:
- Algunos emails se envían, otros no
- Errores 429 del proveedor SMTP
- Delay en entrega de emails

**Soluciones**:
1. **Queue system**: Implementar cola de emails
2. **Rate limiting**: Espaciar envíos automáticamente
3. **Provider upgrade**: Aumentar límites del proveedor
4. **Multiple providers**: Failover entre proveedores

## 📱 Google Apps Script Issues

### Script No Ejecuta

**Síntomas**:
- Timeout en initTryOnMe()
- "Script function not found"
- Permisos insuficientes

**Diagnóstico**:
```javascript
// En Google Apps Script Editor
function debugTryOnMe() {
  try {
    console.log('Starting initTryOnMe...');
    initTryOnMe();
    console.log('initTryOnMe completed successfully');
  } catch (error) {
    console.error('Error in initTryOnMe:', error);
    console.error('Stack trace:', error.stack);
  }
}
```

**Soluciones**:
1. **Permisos**: Autorizar acceso a Google Sheets
2. **Timeout**: Dividir función en partes más pequeñas
3. **Quotas**: Verificar límites de Google Apps Script
4. **Triggers**: Configurar triggers automáticos si es necesario

### Datos No Se Guardan en Sheets

**Síntomas**:
- Spreadsheet se crea pero sin datos
- Algunos datos faltan
- Formato incorrecto

**Diagnóstico**:
```javascript
// Test básico de escritura
function testSheetWrite() {
  const ss = SpreadsheetApp.create('Test Sheet');
  const sheet = ss.getActiveSheet();
  
  try {
    sheet.getRange('A1').setValue('Test');
    const value = sheet.getRange('A1').getValue();
    console.log('Read back:', value);
    
    // Limpiar
    DriveApp.getFileById(ss.getId()).setTrashed(true);
  } catch (error) {
    console.error('Sheet write failed:', error);
  }
}
```

**Soluciones**:
1. **Permisos**: Verificar acceso a Google Drive
2. **Sheet limits**: Verificar límites de celdas/filas
3. **Data validation**: Validar datos antes de escribir
4. **Batch operations**: Usar setValues() para múltiples celdas

## 🔄 Problemas de CI/CD

### GitHub Actions Fallan

**Síntomas**:
- Build failures en PRs
- Tests no pasan
- Deploy no se ejecuta

**Diagnóstico**:
```bash
# Verificar localmente lo que CI hace
npm ci
npm run lint:commits
npm test
npm run build

# Verificar secrets en GitHub
# GitHub repo -> Settings -> Secrets and variables
```

**Soluciones**:
```yaml
# .github/workflows/ci.yml - Añadir debugging
- name: Debug environment
  run: |
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo "Working directory: $(pwd)"
    ls -la

- name: Debug build
  run: |
    npm run build -- --verbose
  env:
    VITE_DEBUG: true
```

### Vercel Deploy Falla

**Síntomas**:
- Build successful pero deploy falla
- 404 en production
- Environment variables no disponibles

**Diagnóstico**:
```bash
# Local preview
npm run build
npm run preview

# Verificar Vercel config
cat vercel.json

# Check Vercel logs
vercel logs tu-dominio.com --token=$VERCEL_TOKEN
```

**Soluciones**:
1. **Vercel config**: Verificar vercel.json
2. **Environment vars**: Configurar en Vercel dashboard
3. **Build settings**: Verificar build command y output directory
4. **Domain config**: Verificar configuración de dominio

## 📊 Problemas de Monitoring

### Alertas No Se Envían

**Síntomas**:
- Sistema degradado pero sin alertas
- Slack/Email silent
- GitHub Issues no se crean

**Diagnóstico**:
```bash
# Test manual del health monitor
.github/workflows/scripts/health-check.sh

# Verificar webhooks
curl -X POST $SLACK_WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{"text": "Test alert"}'
```

**Soluciones**:
1. **Webhook URLs**: Verificar que no hayan expirado
2. **GitHub secrets**: Actualizar secrets si es necesario
3. **Workflow schedule**: Verificar que cron esté activo
4. **Thresholds**: Ajustar umbrales si son muy estrictos

### Métricas Incorrectas

**Síntomas**:
- Health endpoint retorna datos extraños
- Conversion rate 0%
- Active users negativo

**Diagnóstico**:
```php
// health.php - Añadir debugging
function debugMetrics() {
    error_log("Debug: Getting error rate...");
    $errorRate = getErrorRate();
    error_log("Debug: Error rate = " . $errorRate);
    
    return [
        'debug' => true,
        'raw_metrics' => [
            'total_requests' => getTotalRequests(),
            'error_requests' => getErrorRequests(),
            'active_sessions' => getActiveSessions()
        ]
    ];
}
```

**Soluciones**:
1. **Data validation**: Añadir validación de datos
2. **Fallback values**: Usar valores por defecto para métricas
3. **Logging**: Añadir logs detallados
4. **Mock data**: Usar datos mock para testing

## 🛠️ Tools para Debugging

### Comandos Útiles

```bash
# Verificar todo el sistema
./scripts/health-check-full.sh

# Reset completo de desarrollo
./scripts/dev-reset.sh

# Backup de configuración
./scripts/backup-config.sh

# Restaurar desde backup
./scripts/restore-config.sh backup-file.tar.gz
```

### Scripts de Diagnóstico

```bash
# scripts/debug-system.sh
#!/bin/bash

echo "=== System Health Check ==="
curl -s https://tu-dominio.com/health.php | jq '.'

echo "=== Frontend Build Check ==="
npm run build --silent

echo "=== Backend PHP Check ==="
php -l health.php
php -l mailer.php

echo "=== Google Apps Script Check ==="
cd google-apps-script/
clasp list

echo "=== Environment Variables ==="
echo "NODE_ENV: $NODE_ENV"
echo "VITE_SENTRY_DSN: ${VITE_SENTRY_DSN:0:20}..."
echo "VERCEL_TOKEN: ${VERCEL_TOKEN:0:10}..."
```

### Logging Centralizado

```javascript
// utils/debug.js
export const Debug = {
  log: (message, data = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      message,
      data,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Console log
    console.log('[DEBUG]', logEntry);
    
    // Send to external logging service
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/debug-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      }).catch(err => console.error('Failed to send debug log:', err));
    }
  }
};

// Uso
Debug.log('User tried biometric verification', {
  userId: 'user123',
  confidence: 0.45,
  reason: 'low_quality_voice'
});
```

## 🔄 Escalation Path

### Nivel 1: Auto-diagnóstico
1. Verificar health endpoint
2. Revisar esta guía de troubleshooting
3. Intentar soluciones básicas

### Nivel 2: Team Support
1. Crear issue en GitHub con:
   - Descripción del problema
   - Pasos para reproducir
   - Logs relevantes
   - Output de health endpoint
2. Contactar en Slack #support

### Nivel 3: Emergency
1. Para issues críticos (sistema completamente down):
   - Llamar al number de emergencia
   - Enviar email a alerts@tryonme.com
   - Crear issue con label "critical"

### Nivel 4: External Support
1. Contactar soporte de Vercel
2. Contactar soporte de Google Apps Script
3. Contactar soporte de Sentry

---

**Última actualización**: Enero 2025  
**Mantenido por**: Equipo DevOps TryOnMe

¿No encuentras solución? Crea un issue en GitHub con toda la información de debugging.