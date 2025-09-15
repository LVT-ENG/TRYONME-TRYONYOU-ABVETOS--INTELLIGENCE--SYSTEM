# Guía de Solución de Problemas

## 🚨 Problemas Críticos

### Sistema No Inicializa

**Síntomas:**
- Error al ejecutar `initTryOnMe()`
- No se crea la hoja de cálculo
- Mensaje de permisos denegados

**Soluciones:**

1. **Verificar Permisos**
   ```javascript
   // Verificar en Google Apps Script Console
   console.log(DriveApp.getFiles().hasNext()); // Debe retornar true
   ```

2. **Autorizar Manualmente**
   - Ve a Google Apps Script Editor
   - Selecciona `initTryOnMe` en el menú desplegable
   - Haz clic en "Autorizar"
   - Acepta todos los permisos solicitados

3. **Verificar Cuotas**
   - Revisa límites diarios en Google Apps Script Dashboard
   - Espera si has excedido la cuota
   - Considera optimizar el código si ocurre frecuentemente

---

### Datos Corruptos o Perdidos

**Síntomas:**
- Fórmulas rotas en las celdas
- Validaciones que no funcionan
- Datos que desaparecen

**Soluciones:**

1. **Restaurar desde Backup**
   ```javascript
   // Ejecutar función de validación
   validateSystem();
   ```

2. **Recrear Sistema**
   ```javascript
   // Solo como último recurso
   resetTryOnMe();
   initTryOnMe();
   ```

3. **Restaurar Validaciones**
   - Verificar pestaña "Lists"
   - Recrear validaciones de datos manualmente si es necesario

---

## ⚠️ Problemas Comunes

### Recomendaciones de Baja Calidad

**Síntomas:**
- Scores consistentemente bajos (<60)
- Recomendaciones irrelevantes
- Productos no relacionados con preferencias del usuario

**Diagnóstico:**
```javascript
// Verificar datos del usuario
function debugUser(userId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userId) {
      console.log('Datos del usuario:', data[i]);
      break;
    }
  }
}
```

**Soluciones:**

1. **Completar Datos del Usuario**
   - Verificar que todos los campos obligatorios estén llenos
   - Asegurar que las preferencias estén en la lista válida

2. **Actualizar Tendencias**
   - Revisar fecha de última actualización en pestaña "Tendencias"
   - Añadir tendencias recientes y relevantes

3. **Ajustar Pesos del Algoritmo**
   ```
   Configuración recomendada para mejorar relevancia:
   peso_preferencias: 0.5
   peso_tendencias: 0.3
   peso_fitting: 0.2
   ```

---

### Errores de Validación

**Síntomas:**
- Celdas marcadas en rojo
- Mensajes de error al introducir datos
- Desplegables que no funcionan

**Soluciones:**

1. **Verificar Formato de Datos**
   ```
   Email: usuario@dominio.com (no usuario@dominio)
   Edad: Números enteros entre 18-100
   Medidas: Números positivos en centímetros
   ```

2. **Restaurar Validaciones**
   - Ir a Datos > Validación de datos
   - Seleccionar rango de celdas afectado
   - Configurar criterio: "Lista de elementos"
   - Fuente: Rango de la pestaña "Lists"

3. **Limpiar Caché**
   - Recargar la página de Google Sheets
   - Cerrar y reabrir la hoja de cálculo

---

### Rendimiento Lento

**Síntomas:**
- Carga lenta de la hoja de cálculo
- Demoras al introducir datos
- Timeouts en Google Apps Script

**Optimizaciones:**

1. **Reducir Cantidad de Datos**
   ```javascript
   // Limitar usuarios activos
   const MAX_USERS = 1000;
   
   // Archivar datos antiguos
   function archiveOldData() {
     // Implementar lógica de archivado
   }
   ```

2. **Optimizar Fórmulas**
   - Evitar referencias circulares
   - Usar índices en lugar de BUSCARV cuando sea posible
   - Limitar rangos de búsqueda

3. **Configurar Cálculo Manual**
   - Archivo > Configuración de hoja de cálculo
   - Cálculo: "Al cambiar" en lugar de "Automático"

---

## 🔧 Problemas de Integración

### Error de Conexión con APIs Externas

**Síntomas:**
- Fallan las actualizaciones de tendencias
- No se obtienen datos de productos externos
- Errores de red en Google Apps Script

**Soluciones:**

1. **Verificar URLs y APIs**
   ```javascript
   function testApiConnection() {
     try {
       const response = UrlFetchApp.fetch('https://api.ejemplo.com/test');
       console.log('Status:', response.getResponseCode());
       console.log('Content:', response.getContentText());
     } catch (error) {
       console.error('Error de conexión:', error);
     }
   }
   ```

2. **Verificar Límites de Rate**
   - Implementar delays entre llamadas
   - Usar caché para reducir llamadas repetidas

3. **Configurar Timeouts**
   ```javascript
   const options = {
     muteHttpExceptions: true,
     timeout: 30000 // 30 segundos
   };
   ```

---

### Problemas de Autenticación

**Síntomas:**
- Error 401 Unauthorized
- Tokens expirados
- Acceso denegado a recursos

**Soluciones:**

1. **Renovar Tokens**
   - Reautorizar la aplicación en Google Apps Script
   - Verificar permisos en Google Cloud Console

2. **Verificar Scopes**
   ```json
   // En appsscript.json
   {
     "oauthScopes": [
       "https://www.googleapis.com/auth/spreadsheets",
       "https://www.googleapis.com/auth/drive"
     ]
   }
   ```

---

## 🐛 Debugging Avanzado

### Habilitar Logging Detallado

```javascript
function enableDetailedLogging() {
  console.log('=== INICIO DEBUG ===');
  
  // Log del sistema
  console.log('Timestamp:', new Date().toISOString());
  console.log('Usuario actual:', Session.getActiveUser().getEmail());
  
  // Log de datos
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  console.log('ID Spreadsheet:', ss.getId());
  console.log('Número de hojas:', ss.getSheets().length);
  
  console.log('=== FIN DEBUG ===');
}
```

### Verificar Integridad de Datos

```javascript
function runSystemDiagnostics() {
  const diagnostics = {
    timestamp: new Date(),
    errors: [],
    warnings: [],
    stats: {}
  };
  
  // Verificar estructura
  const requiredSheets = ['README', 'Lists', 'Usuarios', 'Medidas', 'Tendencias', 'Reglas', 'Recomendaciones'];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  requiredSheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      diagnostics.errors.push(`Falta la hoja: ${sheetName}`);
    } else {
      diagnostics.stats[sheetName] = {
        rows: sheet.getLastRow(),
        columns: sheet.getLastColumn()
      };
    }
  });
  
  // Verificar datos
  const usersSheet = ss.getSheetByName('Usuarios');
  if (usersSheet) {
    const userData = usersSheet.getDataRange().getValues();
    diagnostics.stats.totalUsers = userData.length - 1; // Excluir header
    
    // Verificar usuarios sin email
    for (let i = 1; i < userData.length; i++) {
      if (!userData[i][2] || !userData[i][2].includes('@')) {
        diagnostics.warnings.push(`Usuario en fila ${i+1} sin email válido`);
      }
    }
  }
  
  console.log('Diagnóstico del sistema:', JSON.stringify(diagnostics, null, 2));
  return diagnostics;
}
```

### Performance Monitoring

```javascript
function measurePerformance() {
  const startTime = new Date().getTime();
  
  // Tu función a medir
  initTryOnMe();
  
  const endTime = new Date().getTime();
  const duration = endTime - startTime;
  
  console.log(`Tiempo de ejecución: ${duration}ms`);
  
  if (duration > 30000) {
    console.warn('Rendimiento lento detectado');
  }
}
```

---

## 📋 Checklist de Solución de Problemas

### Antes de Reportar un Bug

- [ ] He verificado que tengo los permisos necesarios
- [ ] He intentado recargar la hoja de cálculo
- [ ] He verificado que los datos están en el formato correcto
- [ ] He ejecutado `validateSystem()` para identificar errores
- [ ] He revisado los logs en Google Apps Script Editor
- [ ] He probado con datos de prueba (`populateTestData()`)

### Información a Incluir en el Reporte

- **Descripción del problema**
- **Pasos para reproducir**
- **Datos específicos involucrados**
- **Capturas de pantalla**
- **Logs de error de Google Apps Script**
- **Timestamp del problema**

### Contacto para Soporte Técnico

1. **Nivel 1:** Consulta esta guía y documentación
2. **Nivel 2:** Administrador del sistema
3. **Nivel 3:** Equipo de desarrollo

---

## 🔄 Procedimientos de Recuperación

### Backup y Restauración

```javascript
function createBackup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const backupName = `TryOnMe_Backup_${new Date().toISOString().split('T')[0]}`;
  const backup = ss.copy(backupName);
  
  console.log(`Backup creado: ${backup.getId()}`);
  return backup.getId();
}

function restoreFromBackup(backupId) {
  const backup = SpreadsheetApp.openById(backupId);
  const current = SpreadsheetApp.getActiveSpreadsheet();
  
  // Lógica de restauración
  console.log('Restauración completada');
}
```

### Reset Completo del Sistema

```javascript
function emergencyReset() {
  const confirmation = Browser.msgBox(
    'Reset de Emergencia', 
    '¿Estás seguro? Esto eliminará TODOS los datos.', 
    Browser.Buttons.YES_NO
  );
  
  if (confirmation === 'yes') {
    resetTryOnMe();
    initTryOnMe();
    populateTestData();
    console.log('Reset de emergencia completado');
  }
}
```