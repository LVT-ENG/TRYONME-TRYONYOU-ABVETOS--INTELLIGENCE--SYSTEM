# API Reference - TryOnMe Motor

## Google Apps Script Functions

### Core Functions

#### `initTryOnMe()`
Inicializa el sistema completo de recomendaciones en Google Sheets.

**Parámetros:** Ninguno

**Retorna:** 
- `SpreadsheetApp.Spreadsheet` - La hoja de cálculo creada con toda la estructura del sistema

**Uso:**
```javascript
// Ejecutar desde el editor de Google Apps Script
initTryOnMe();
```

**Descripción:**
Crea una nueva hoja de cálculo con las siguientes pestañas:
- README: Documentación del sistema
- Lists: Catálogos de validación
- Usuarios: Datos personales y preferencias
- Medidas: Medidas corporales
- Tendencias: Top 20 de Google/FTT
- Reglas: Configuración del algoritmo
- Recomendaciones: Resultados finales

---

#### `resetTryOnMe()`
Reinicia completamente el sistema borrando todos los datos existentes.

**Parámetros:** Ninguno

**Retorna:** `void`

**⚠️ Precaución:** Esta función elimina todos los datos del sistema de manera irreversible.

---

#### `populateTestData()`
Añade datos de prueba para testing del sistema.

**Parámetros:** Ninguno

**Retorna:** `void`

**Datos generados:**
- 5 usuarios de prueba con diferentes perfiles
- Medidas corporales de ejemplo
- Tendencias de moda simuladas
- Configuración de reglas básica

---

### Utility Functions

#### `validateSystem()`
Valida la integridad de la estructura del sistema.

**Parámetros:** Ninguno

**Retorna:** 
- `Object` - Resultado de la validación
  - `isValid: boolean` - Indica si el sistema es válido
  - `errors: string[]` - Lista de errores encontrados
  - `warnings: string[]` - Lista de advertencias

**Ejemplo de respuesta:**
```javascript
{
  isValid: true,
  errors: [],
  warnings: ["Pestaña 'Usuarios' tiene pocas filas de datos"]
}
```

---

#### `generateSystemReport()`
Genera un reporte del estado actual del sistema.

**Parámetros:** Ninguno

**Retorna:** 
- `Object` - Reporte del sistema
  - `totalUsers: number` - Número total de usuarios
  - `totalRecommendations: number` - Número total de recomendaciones
  - `lastUpdate: Date` - Última actualización
  - `dataQuality: string` - Calidad de los datos ('good', 'fair', 'poor')

---

### Helper Functions

#### `validateUser(userData)`
Valida los datos de un usuario antes de insertarlos.

**Parámetros:**
- `userData: Object` - Datos del usuario a validar
  - `nombre: string` - Nombre del usuario
  - `email: string` - Email del usuario
  - `sexo: string` - Sexo ('Masculino', 'Femenino', 'Otro')
  - `edad: number` - Edad del usuario

**Retorna:**
- `Object` - Resultado de la validación
  - `isValid: boolean`
  - `errors: string[]`

---

#### `calculateRecommendationScore(userProfile, productData, trends)`
Calcula el score de recomendación para un producto específico.

**Parámetros:**
- `userProfile: Object` - Perfil del usuario
- `productData: Object` - Datos del producto
- `trends: Object` - Tendencias actuales

**Retorna:**
- `number` - Score de 0-100

---

## Web Interface API

### Endpoints

#### `POST /contact`
Envía un mensaje de contacto.

**URL:** `/mailer.php`

**Parámetros:**
```json
{
  "name": "string",
  "email": "string", 
  "message": "string"
}
```

**Respuesta exitosa:**
```json
{
  "status": "success",
  "message": "Mensaje enviado correctamente"
}
```

**Respuesta de error:**
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

---

## Configuration API

### Spreadsheet Structure

#### Lists Sheet Columns
| Columna | Tipo | Descripción |
|---------|------|-------------|
| A | Estilos | Lista de estilos de moda válidos |
| B | Colores | Lista de colores disponibles |
| C | Tipos_Prenda | Tipos de prendas válidas |
| D | Ajustes | Preferencias de ajuste |
| E | Climas | Tipos de clima |

#### Users Sheet Columns
| Columna | Campo | Tipo | Validación |
|---------|-------|------|------------|
| A | ID | string | Único |
| B | Nombre | string | Requerido |
| C | Email | string | Formato email |
| D | Sexo | string | Lista: Masculino, Femenino, Otro |
| E | Edad | number | 18-100 |
| F | Estilo_Favorito | string | Validado contra Lists |

#### Recommendations Sheet Structure
| Columna | Campo | Tipo | Descripción |
|---------|-------|------|-------------|
| A | Usuario_ID | string | Referencia a Users |
| B | Producto_ID | string | ID único del producto |
| C | Nombre | string | Nombre del producto |
| D | Score | number | Puntuación 0-100 |
| E | Fuente | string | Origen de la recomendación |
| F | URL_Imagen | string | URL de la imagen |

---

## Error Codes

| Código | Descripción | Acción Recomendada |
|--------|-------------|--------------------|
| INVALID_USER_DATA | Datos de usuario inválidos | Verificar formato de datos |
| MISSING_SPREADSHEET | Hoja de cálculo no encontrada | Ejecutar initTryOnMe() |
| PERMISSION_DENIED | Sin permisos | Autorizar acceso a Google Sheets |
| QUOTA_EXCEEDED | Límite de quota excedido | Esperar o optimizar uso |

---

## Limits and Quotas

### Google Sheets Limits
- **Celdas máximas:** 10,000,000 por hoja de cálculo
- **Usuarios máximos recomendados:** 50,000
- **Recomendaciones por usuario:** 20

### Performance Guidelines
- **Tiempo de ejecución máximo:** 6 minutos por función
- **Memoria máxima:** 100 MB
- **Triggers diarios:** 20

---

## Security Considerations

### Data Protection
- Todos los datos se almacenan en Google Drive del usuario
- No se comparte información personal sin consentimiento
- Cumplimiento con GDPR para usuarios europeos

### Access Control
- Solo usuarios autorizados pueden editar la hoja de cálculo
- Registro de auditoría automático en Google Apps Script
- Validación de entrada en todas las funciones