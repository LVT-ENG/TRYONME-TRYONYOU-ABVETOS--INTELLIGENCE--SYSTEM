# Guía de Despliegue - TryOnMe Motor (Google Apps Script)

## 📋 Requisitos Previos

- Cuenta de Google (Gmail/Google Workspace)
- Acceso a Google Sheets y Google Apps Script
- Navegador web actualizado

## 🚀 Pasos de Instalación

### 1. Crear un nuevo proyecto en Google Apps Script

1. Ve a [script.google.com](https://script.google.com)
2. Haz clic en **"Nuevo proyecto"**
3. Cambia el nombre del proyecto a **"TryOnMe Motor"**

### 2. Configurar los archivos del proyecto

#### 2.1 Configurar el archivo de manifiesto
1. En el editor de Apps Script, haz clic en el icono de engranaje (⚙️) o busca **"appsscript.json"**
2. Reemplaza el contenido con el código del archivo `appsscript.json`

#### 2.2 Añadir archivo principal
1. Abre el archivo `Code.gs` por defecto
2. Borra todo el contenido existente
3. Copia y pega el contenido completo del archivo `motor.gs`

#### 2.3 Añadir archivo de funciones auxiliares
1. Haz clic en **"+"** junto a **"Archivos"**
2. Selecciona **"Script"** y nómbralo **"helpers"**
3. Copia y pega el contenido del archivo `helpers.gs`

#### 2.4 Añadir archivo de utilidades
1. Crea otro archivo script llamado **"utils"**
2. Copia y pega el contenido del archivo `utils.gs`

### 3. Guardar y autorizar el proyecto

1. Haz clic en **"Guardar"** (Ctrl+S)
2. Si es la primera vez, se te pedirá autorizar permisos para:
   - Crear y modificar hojas de cálculo
   - Enviar alertas al usuario

## 🎯 Ejecución del Sistema

### Inicialización Completa

1. En el editor de Apps Script, selecciona la función **`initTryOnMe`** en el menú desplegable
2. Haz clic en el botón **"Ejecutar"** (▶️)
3. Autoriza los permisos cuando se soliciten
4. Espera a que aparezca el mensaje de confirmación
5. Se abrirá automáticamente una nueva hoja de cálculo con todo el sistema configurado

### Funciones Adicionales Disponibles

- **`resetTryOnMe()`**: Reinicia completamente el sistema (borra datos existentes)
- **`populateTestData()`**: Añade datos de prueba para testing
- **`generateSystemReport()`**: Genera un reporte del estado actual del sistema
- **`validateSystem()`**: Valida la integridad de la estructura del sistema

## 📊 Estructura del Sistema Generado

Una vez ejecutado, el sistema creará una hoja de cálculo con las siguientes pestañas:

### 1. **README**
- Información general del sistema
- Descripción de cada pestaña
- Notas importantes

### 2. **Lists**
- Catálogos de validación para desplegables
- Estilos, colores, tipos de prenda, ajustes, etc.
- Base para las validaciones de datos

### 3. **Usuarios**
- Formulario de datos personales y preferencias
- Validaciones automáticas en celdas
- Campos: ID, nombre, email, sexo, edad, medidas básicas, preferencias de estilo

### 4. **Medidas**
- Medidas corporales detalladas capturadas en TryOn
- Campos: pecho, cintura, cadera, largo de pierna/brazo, hombros
- Notas sobre el método de captura

### 5. **Tendencias**
- Top 20 de Google/FTT y etiquetas normalizadas
- Keywords, URLs fuente, posición en ranking
- Volumen de búsqueda y repeticiones

### 6. **Reglas**
- Configuración de pesos y cuotas para el algoritmo
- Parámetros ajustables para personalizar el motor
- Quotas por fuente de productos

### 7. **Recomendaciones**
- Resultados finales del motor de recomendaciones
- 20 productos por usuario con scoring detallado
- Múltiples fuentes: personalizada, Live'it, Vvl, TryOn, externa

## ⚙️ Configuración y Personalización

### Modificar Catálogos de Validación

Edita la pestaña **"Lists"** para:
- Añadir nuevos estilos de moda
- Actualizar colores disponibles
- Modificar tipos de prendas
- Ajustar preferencias de ajuste

### Configurar Parámetros del Algoritmo

En la pestaña **"Reglas"** puedes ajustar:
- `peso_preferencias`: Importancia de gustos personales (0-1)
- `peso_tendencias`: Importancia de tendencias externas (0-1)  
- `peso_fitting`: Importancia del ajuste por medidas (0-1)
- Quotas por fuente de productos

### Validaciones Automáticas

El sistema incluye validaciones automáticas en:
- Sexo (Usuarios)
- Clima (Usuarios)
- Estilos de moda (Usuarios, Recomendaciones)
- Colores (Usuarios, Recomendaciones)
- Tipos de prenda (Usuarios)
- Ajustes preferidos (Usuarios)
- Fuentes de productos (Recomendaciones)

## 🔧 Mantenimiento

### Datos de Prueba

Ejecuta `populateTestData()` para añadir datos de ejemplo que te permitan probar el sistema.

### Validación del Sistema

Ejecuta `validateSystem()` regularmente para verificar que la estructura del sistema sigue siendo correcta.

### Reportes

Usa `generateSystemReport()` para obtener estadísticas sobre el uso del sistema y cantidad de datos almacenados.

## 📝 Notas Importantes

1. **Backup**: Haz copias de seguridad regulares de la hoja de cálculo
2. **Permisos**: Solo usuarios autorizados deben tener acceso de edición
3. **Escalabilidad**: Este es un prototipo; para uso en producción considerar migrar a base de datos
4. **Límites**: Google Sheets tiene límites de 10 millones de celdas por hoja de cálculo

## 🐛 Solución de Problemas

### Error de Permisos
- Verifica que has autorizado todos los permisos solicitados
- Intenta ejecutar la función de nuevo

### Error en Validaciones
- Verifica que la pestaña "Lists" existe y tiene los datos correctos
- Ejecuta `validateSystem()` para identificar problemas

### Datos Faltantes
- Ejecuta `populateTestData()` para añadir datos de ejemplo
- Verifica que todas las pestañas estén presentes

## 📞 Soporte

Para problemas técnicos o dudas sobre la implementación, revisa los logs en el editor de Google Apps Script (Ver > Logs) donde se registran errores detallados.