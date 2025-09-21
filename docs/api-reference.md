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

**Uso:**
```javascript
resetTryOnMe();
```

**Descripción:**
Muestra un diálogo de confirmación y, si el usuario acepta, ejecuta `initTryOnMe()` para reinicializar completamente el sistema.

**⚠️ Precaución:** Esta función elimina todos los datos del sistema de manera irreversible.

---

#### `populateTestData()`
Añade datos de prueba para testing del sistema.

**Parámetros:** Ninguno

**Retorna:** `void`

**Uso:**
```javascript
populateTestData();
```

**Descripción:**
Inserta datos de ejemplo en las hojas existentes del sistema.

**Datos generados:**
- 3 usuarios de prueba: Ana García, Carlos López, María Rodríguez
- Medidas corporales correspondientes para cada usuario
- 5 tendencias de moda actuales con datos realistas
- Todos los registros incluyen fechas y datos de ejemplo apropiados

---

### Utility Functions

#### `validateSystem()`
Valida la integridad de la estructura del sistema.

**Parámetros:** Ninguno

**Retorna:** 
- `boolean` - `true` si el sistema es válido, `false` si hay errores

**Uso:**
```javascript
const isValid = validateSystem();
if (!isValid) {
  console.log("Sistema requiere correcciones");
}
```

**Descripción:**
Verifica que todas las hojas requeridas existan y que la estructura de listas sea correcta. Muestra un diálogo con el resultado de la validación.

**Validaciones realizadas:**
- Presencia de hojas: README, Lists, Usuarios, Medidas, Tendencias, Reglas, Recomendaciones
- Estructura correcta de encabezados en la hoja Lists
- Integridad de las listas de validación

---

#### `generateSystemReport()`
Genera un reporte completo del estado actual del sistema.

**Parámetros:** Ninguno

**Retorna:** `void`

**Uso:**
```javascript
generateSystemReport();
```

**Descripción:**
Crea un reporte detallado que incluye información general del archivo, lista de hojas configuradas, verificación de hojas requeridas y conteo de registros.

**Información incluida:**
- Fecha del reporte y nombre del archivo
- Estado de configuración de hojas con número de filas y columnas
- Contadores: usuarios registrados, medidas, tendencias, recomendaciones
- Alertas sobre hojas faltantes o problemas de estructura

---

### Helper Functions

#### `addListValidation(sheet, range, listRange)`
Añade validación de lista desplegable a un rango de celdas en una hoja de cálculo.

**Parámetros:**
- `sheet: Sheet` - La hoja donde aplicar la validación
- `range: string` - El rango de celdas (ej: "D2:D1000")
- `listRange: string` - El rango de la lista de validación (ej: "Lists!E2:E100")

**Retorna:** `void`

**Uso:**
```javascript
// Añadir validación de sexo desde la lista
const sheet = SpreadsheetApp.getActiveSheet();
addListValidation(sheet, "D2:D1000", "Lists!E2:E100");

// Múltiples validaciones en una hoja
addListValidation(usuarios, "K2:K1000", "Lists!A2:A100"); // estilos
addListValidation(usuarios, "N2:N1000", "Lists!B2:B100"); // colores
```

**Descripción:**
Configura validación de datos para asegurar que las celdas solo acepten valores de una lista predefinida. Incluye mensaje de ayuda "Selecciona un valor de la lista" y previene valores inválidos.

**Manejo de errores:**
La función incluye un try-catch que registra errores en la consola si la validación no puede aplicarse.

---

#### `setupSheetHeaders(sheet, headers, columnWidth)`
Configura encabezados de una hoja con formato estándar.

**Parámetros:**
- `sheet: Sheet` - La hoja a formatear
- `headers: Array<string>` - Array con los nombres de las columnas
- `columnWidth: number` - Ancho de las columnas (opcional, por defecto 160)

**Retorna:** `void`

**Uso:**
```javascript
const headers = ["user_id", "nombre", "email"];
setupSheetHeaders(sheet, headers, 180);
```

**Descripción:**
Establece encabezados con formato bold, fondo gris, congela la primera fila y configura el ancho de columnas de manera uniforme.

---

#### `calcularRecomendaciones(usuario, tendencias, reglas)`
Calcula recomendaciones de productos basadas en el perfil del usuario y tendencias actuales.

**Parámetros:**
- `usuario: Object` - Datos del usuario con preferencias
  - `user_id: string` - ID único del usuario
  - `estilo_1, estilo_2, estilo_3: string` - Estilos preferidos
  - `color_1, color_2: string` - Colores preferidos
  - `ajuste_preferido: string` - Tipo de ajuste favorito
- `tendencias: Array` - Lista de tendencias actuales del mercado
- `reglas: Object` - Configuración de pesos y cuotas para el algoritmo
  - `peso_preferencias: number` - Peso del match con gustos personales (0-1)
  - `peso_tendencias: number` - Peso del match con tendencias (0-1)
  - `peso_fitting: number` - Peso del match por tallas (0-1)

**Retorna:**
- `Array<Object>` - Lista de recomendaciones con la siguiente estructura:
  - `user_id: string` - ID del usuario
  - `producto_id: string` - ID único del producto
  - `score_preferencias: number` - Score de match con preferencias (0-1)
  - `score_tendencias: number` - Score de alineación con tendencias (0-1)
  - `score_fitting: number` - Score de ajuste de talla (0-1)
  - `score_total: number` - Score total calculado (0-1)
  - `fuente: string` - Origen de la recomendación
  - `motivo_recomendacion: string` - Explicación del por qué
  - `fecha_generacion: Date` - Timestamp de creación

**Uso:**
```javascript
const usuario = {
  user_id: "u_0001",
  estilo_1: "Elegante / Chic",
  color_1: "Negro",
  ajuste_preferido: "Slim"
};

const reglas = {
  peso_preferencias: 0.5,
  peso_tendencias: 0.3,
  peso_fitting: 0.2
};

const recomendaciones = calcularRecomendaciones(
  usuario, 
  listaTendencias, 
  reglas
);
```

**Algoritmo:**
La función implementa un sistema de scoring multifactorial que combina:
1. **Preferencias personales**: Match con estilos y colores favoritos
2. **Tendencias de mercado**: Alineación con keywords populares
3. **Fitting**: Compatibilidad con medidas corporales

---

#### `generarDatosEjemplo(cantidad)`
Genera datos de productos de ejemplo para testing del sistema.

**Parámetros:**
- `cantidad: number` - Número de registros a generar (opcional, por defecto 5)

**Retorna:**
- `Array<Object>` - Array de productos de ejemplo con estructura:
  - `id: string`
  - `nombre: string`
  - `marca: string`
  - `estilo: string`
  - `color: string`
  - `precio: number`

**Uso:**
```javascript
const productos = generarDatosEjemplo(10);
```

### Testing Functions

#### `testSyntax()`
Valida la sintaxis de Google Apps Script sin ejecutar funciones principales.

**Parámetros:** Ninguno

**Retorna:** `boolean` - `true` si la sintaxis es válida

**Uso:**
```javascript
const isValidSyntax = testSyntax();
```

**Descripción:**
Función de diagnóstico que verifica que las funciones básicas de SpreadsheetApp estén disponibles y la sintaxis sea correcta. Útil para debugging durante el desarrollo.

**Funciones verificadas:**
- `SpreadsheetApp.getActiveSpreadsheet`
- `SpreadsheetApp.getUi`
- `SpreadsheetApp.newDataValidation`

---

#### `testDataStructures()`
Valida las estructuras de datos utilizadas en el sistema.

**Parámetros:** Ninguno

**Retorna:** 
- `Object` - Estructuras de datos del sistema:
  - `styles: Array<string>` - Lista de estilos disponibles
  - `usuariosHeaders: Array<string>` - Encabezados de la tabla Usuarios
  - `recomendacionesHeaders: Array<string>` - Encabezados de la tabla Recomendaciones

**Uso:**
```javascript
const structures = testDataStructures();
console.log(structures.styles);
```

**Descripción:**
Función de testing que valida la correcta definición de las estructuras de datos principales del sistema. Retorna muestras de cada estructura para verificación.

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