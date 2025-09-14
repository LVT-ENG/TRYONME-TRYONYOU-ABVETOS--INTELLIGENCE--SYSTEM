# Guía de Despliegue - TryOnMe Sistema Completo

## 🚀 Visión General

Esta guía cubre el despliegue completo del sistema TryOnMe/TryOnYou AVBETOS Intelligence System en diferentes entornos.

## 🏗️ Arquitectura de Despliegue

### Componentes del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA TRYONME                          │
├─────────────────────────────────────────────────────────────┤
│  Frontend Web        │  Google Apps Script  │  Backend APIs │
│  (React + Vite)      │  (Motor Central)     │  (PHP + Node) │
│  ↓                   │  ↓                   │  ↓            │
│  Vercel/Netlify      │  Google Cloud        │  VPS/Cloud    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Despliegue Frontend (Web Interface)

### Requisitos Previos

- **Node.js** 18 o superior
- **npm** o **pnpm**
- Cuenta en **Vercel** o **Netlify**

### Despliegue en Vercel (Recomendado)

1. **Preparación del Código**
   ```bash
   # Clonar repositorio
   git clone https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git
   cd TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
   
   # Instalar dependencias
   npm install
   
   # Build de prueba
   npm run build
   ```

2. **Configuración de Vercel**
   ```bash
   # Instalar Vercel CLI
   npm install -g vercel
   
   # Login
   vercel login
   
   # Deploy inicial
   vercel
   ```

3. **Variables de Entorno**
   ```bash
   # En Vercel Dashboard > Settings > Environment Variables
   VITE_API_URL=https://tu-api.com
   VITE_GOOGLE_SCRIPT_ID=tu_script_id
   VITE_CONTACT_EMAIL=contacto@tudominio.com
   ```

4. **Configuración Automática**
   
   Archivo `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ],
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-XSS-Protection",
             "value": "1; mode=block"
           }
         ]
       }
     ]
   }
   ```

### Despliegue en Netlify

1. **Deploy Directo**
   ```bash
   # Build local
   npm run build
   
   # Deploy con Netlify CLI
   npx netlify deploy --prod --dir dist
   ```

2. **Auto-deploy desde GitHub**
   - Conectar repositorio en Netlify Dashboard
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## 📊 Despliegue Google Apps Script (Motor Central)

### Preparación

1. **Instalar Google Apps Script CLI**
   ```bash
   npm install -g @google/clasp
   ```

2. **Autenticación**
   ```bash
   clasp login
   ```

3. **Configurar Proyecto**
   ```bash
   cd google-apps-script
   clasp create --type standalone --title "TryOnMe Motor"
   ```

### Despliegue

1. **Push del Código**
   ```bash
   # Desde directorio google-apps-script/
   clasp push
   ```

2. **Crear Versión**
   ```bash
   clasp version "v1.0.0 - Sistema completo TryOnMe"
   ```

3. **Deploy como Web App**
   ```bash
   clasp deploy --description "Producción v1.0.0"
   ```

4. **Configurar Permisos**
   
   En Google Apps Script Editor:
   - Ejecutar `initTryOnMe()` manualmente
   - Autorizar todos los permisos
   - Configurar trigger si es necesario

### Configuración de Triggers

```javascript
// En Google Apps Script Editor
function createTriggers() {
  // Trigger diario para actualización de tendencias
  ScriptApp.newTrigger('updateTrends')
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .create();
    
  // Trigger para backup semanal
  ScriptApp.newTrigger('createBackup')
    .timeBased()
    .everyWeeks(1)
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(2)
    .create();
}
```

---

## 🖥️ Despliegue Backend APIs

### PHP Backend (Sistema de Contacto)

1. **Servidor Web con PHP**
   ```bash
   # Requisitos mínimos
   PHP 7.4+
   Apache/Nginx
   Módulo php-mail
   ```

2. **Configuración Apache**
   ```apache
   <VirtualHost *:80>
       ServerName tu-dominio.com
       DocumentRoot /var/www/html/tryonme
       
       <Directory /var/www/html/tryonme>
           AllowOverride All
           Require all granted
       </Directory>
       
       # Security headers
       Header always set X-Content-Type-Options nosniff
       Header always set X-Frame-Options DENY
       Header always set X-XSS-Protection "1; mode=block"
   </VirtualHost>
   ```

3. **Configuración de Email**
   
   Archivo `config.php`:
   ```php
   <?php
   define('SMTP_HOST', 'smtp.gmail.com');
   define('SMTP_PORT', 587);
   define('SMTP_USER', 'tu-email@gmail.com');
   define('SMTP_PASS', 'tu-app-password');
   define('FROM_EMAIL', 'noreply@tu-dominio.com');
   define('TO_EMAIL', 'contacto@tu-dominio.com');
   ?>
   ```

### Node.js APIs (Opcional)

1. **Despliegue en VPS**
   ```bash
   # Instalar PM2 para gestión de procesos
   npm install -g pm2
   
   # Configurar aplicación
   pm2 start index.js --name "tryonme-api"
   pm2 startup
   pm2 save
   ```

2. **Proxy Reverso con Nginx**
   ```nginx
   server {
       listen 80;
       server_name api.tu-dominio.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🔧 Configuración de Entornos

### Desarrollo Local

```bash
# Frontend
npm run dev

# Google Apps Script
clasp push --watch

# PHP (si usas servidor local)
php -S localhost:8000
```

### Staging

1. **Frontend Staging**
   ```bash
   # Deploy a rama staging
   vercel --prod --scope staging
   ```

2. **Google Apps Script Staging**
   ```bash
   # Crear script separado para staging
   clasp create --type standalone --title "TryOnMe Motor Staging"
   clasp push
   ```

### Producción

1. **Checklist Pre-Deploy**
   - [ ] Tests pasando (`npm test`)
   - [ ] Build exitoso (`npm run build`)
   - [ ] Variables de entorno configuradas
   - [ ] Backup de datos realizado
   - [ ] Documentación actualizada

2. **Deploy Producción**
   ```bash
   # Frontend
   vercel --prod
   
   # Google Apps Script
   clasp deploy --description "Production release"
   ```

---

## 📈 Monitoreo y Observabilidad

### Logs y Monitoring

1. **Google Apps Script Logs**
   ```bash
   # Ver logs en tiempo real
   clasp logs --watch
   ```

2. **Frontend Monitoring (Vercel)**
   - Analytics automático
   - Error tracking
   - Performance metrics

3. **Backend Monitoring**
   ```bash
   # PM2 monitoring
   pm2 monit
   
   # Logs
   pm2 logs tryonme-api
   ```

### Health Checks

1. **Endpoint de Health Check**
   ```javascript
   // health.js
   function healthCheck() {
     return {
       status: 'ok',
       timestamp: new Date().toISOString(),
       version: '1.0.0',
       components: {
         database: checkDatabase(),
         apis: checkApis(),
         memory: process.memoryUsage()
       }
     };
   }
   ```

2. **Monitoring Script**
   ```bash
   #!/bin/bash
   # health-check.sh
   
   HEALTH_URL="https://tu-api.com/health"
   
   if curl -f $HEALTH_URL > /dev/null 2>&1; then
     echo "$(date): Sistema OK"
   else
     echo "$(date): Sistema DOWN - Enviando alerta"
     # Enviar notificación
   fi
   ```

---

## 🔐 Seguridad y SSL

### Certificados SSL

1. **Certbot (Let's Encrypt)**
   ```bash
   # Instalar certbot
   sudo apt install certbot python3-certbot-apache
   
   # Obtener certificado
   sudo certbot --apache -d tu-dominio.com
   
   # Auto-renovación
   sudo crontab -e
   # Añadir: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

2. **Cloudflare (Recomendado)**
   - Configurar DNS en Cloudflare
   - Habilitar SSL/TLS automático
   - Configurar reglas de página

### Configuración de Seguridad

1. **Headers de Seguridad**
   ```nginx
   # Nginx security headers
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-XSS-Protection "1; mode=block" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header Referrer-Policy "no-referrer-when-downgrade" always;
   add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
   ```

2. **Rate Limiting**
   ```nginx
   # Rate limiting
   limit_req_zone $binary_remote_addr zone=contact:10m rate=5r/m;
   
   location /mailer.php {
       limit_req zone=contact burst=2 nodelay;
   }
   ```

---

## 🚨 Backup y Recuperación

### Backup Automático

1. **Google Sheets Backup**
   ```javascript
   // En Google Apps Script
   function createDailyBackup() {
     const ss = SpreadsheetApp.getActiveSpreadsheet();
     const backupName = `TryOnMe_Backup_${new Date().toISOString().split('T')[0]}`;
     const backup = ss.copy(backupName);
     
     // Mover a carpeta de backups
     const backupFolder = DriveApp.getFolderById('FOLDER_ID');
     DriveApp.getFileById(backup.getId()).moveTo(backupFolder);
   }
   ```

2. **Database Backup**
   ```bash
   #!/bin/bash
   # backup.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backups"
   
   # Backup base de datos
   mysqldump -u user -p database > $BACKUP_DIR/db_backup_$DATE.sql
   
   # Comprimir
   gzip $BACKUP_DIR/db_backup_$DATE.sql
   
   # Limpiar backups antiguos (mantener 30 días)
   find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete
   ```

### Procedimiento de Recuperación

1. **Recuperación de Google Sheets**
   ```javascript
   function restoreFromBackup(backupId) {
     const backup = SpreadsheetApp.openById(backupId);
     const current = SpreadsheetApp.getActiveSpreadsheet();
     
     // Restaurar cada hoja
     backup.getSheets().forEach(sheet => {
       const sheetName = sheet.getName();
       const currentSheet = current.getSheetByName(sheetName);
       
       if (currentSheet) {
         currentSheet.clear();
         const data = sheet.getDataRange().getValues();
         currentSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
       }
     });
   }
   ```

---

## 📋 Checklist de Despliegue

### Pre-Deploy

- [ ] Código revisado y aprobado
- [ ] Tests unitarios pasando
- [ ] Tests de integración pasando
- [ ] Variables de entorno configuradas
- [ ] Certificados SSL válidos
- [ ] Backup realizado
- [ ] Plan de rollback preparado

### Post-Deploy

- [ ] Health checks pasando
- [ ] Logs sin errores críticos
- [ ] Performance dentro de límites
- [ ] Funcionalidades principales validadas
- [ ] Monitoreo activado
- [ ] Documentación actualizada

### Rollback Plan

1. **Frontend Rollback**
   ```bash
   # Vercel - rollback a deployment anterior
   vercel rollback [deployment-url]
   ```

2. **Google Apps Script Rollback**
   ```bash
   # Revertir a versión anterior
   clasp deploy --versionNumber [version-number]
   ```

3. **Database Rollback**
   ```bash
   # Restaurar desde backup
   gunzip db_backup_YYYYMMDD.sql.gz
   mysql -u user -p database < db_backup_YYYYMMDD.sql
   ```

---

## 📞 Soporte Post-Deploy

### Monitoreo 24/7

- **Uptime monitoring** - Pingdom/UptimeRobot
- **Error tracking** - Sentry
- **Performance monitoring** - Google Analytics/Vercel Analytics

### Escalación de Incidentes

1. **Severidad 1** (Sistema caído)
   - Notificación inmediata
   - Rollback automático si es posible
   - Investigación inmediata

2. **Severidad 2** (Funcionalidad crítica afectada)
   - Notificación en 15 minutos
   - Fix en próximo deployment

3. **Severidad 3** (Funcionalidad menor afectada)
   - Notificación en 1 hora
   - Fix programado

### Contactos de Emergencia

- **Desarrollador Principal**: [contacto]
- **Administrador Sistema**: [contacto]
- **Product Owner**: [contacto]