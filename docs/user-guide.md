# Guía de Usuario - TryOnMe Motor

## 👋 Introducción

Bienvenido al sistema de recomendaciones TryOnMe Motor. Esta guía te ayudará a usar el sistema de manera efectiva para generar recomendaciones de moda personalizadas.

## 🚀 Primeros Pasos

### 1. Acceder al Sistema

Una vez que el administrador haya configurado el sistema ([ver guía de despliegue](../google-apps-script/DEPLOYMENT.md)), recibirás un enlace a la hoja de cálculo de Google Sheets.

### 2. Interfaz del Sistema

El sistema está organizado en las siguientes pestañas:

#### 📖 README
Contiene información general y descripción de cada pestaña.

#### 📋 Lists  
Catálogos de referencia con las opciones válidas para el sistema:
- **Estilos:** Casual, Formal, Deportivo, Bohemio, Minimalista, etc.
- **Colores:** Azul, Rojo, Verde, Negro, Blanco, etc.
- **Tipos de Prenda:** Camisa, Pantalón, Vestido, Chaqueta, etc.
- **Ajustes:** Holgado, Ajustado, Regular
- **Climas:** Cálido, Frío, Templado, Húmedo

> ⚠️ **Importante:** No modifiques esta pestaña a menos que seas administrador.

---

## 👤 Gestión de Usuarios

### Añadir un Nuevo Usuario

1. Ve a la pestaña **"Usuarios"**
2. Busca la primera fila vacía
3. Completa los siguientes campos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **ID** | Identificador único | `USR_001` |
| **Nombre** | Nombre completo | `María García` |
| **Email** | Correo electrónico | `maria@email.com` |
| **Sexo** | Masculino/Femenino/Otro | `Femenino` |
| **Edad** | Edad en años | `28` |
| **Estilo_Favorito** | Estilo preferido | `Casual` |
| **Color_Favorito** | Color preferido | `Azul` |
| **Tipo_Prenda_Favorita** | Tipo de prenda favorita | `Vestido` |
| **Ajuste_Preferido** | Ajuste preferido | `Regular` |
| **Clima_Habitual** | Clima de residencia | `Templado` |

### Validaciones Automáticas

El sistema incluye validaciones automáticas que te ayudarán:
- **Desplegables:** Los campos con opciones limitadas mostrarán una lista desplegable
- **Formato de email:** Se validará automáticamente el formato del email
- **Edad:** Solo acepta números entre 18 y 100

### Errores Comunes
- ❌ **Email inválido:** Asegúrate de usar formato correcto (`usuario@dominio.com`)
- ❌ **Estilo no válido:** Selecciona solo estilos de la pestaña Lists
- ❌ **ID duplicado:** Cada usuario debe tener un ID único

---

## 📏 Registro de Medidas

### Añadir Medidas Corporales

1. Ve a la pestaña **"Medidas"**
2. Busca la fila correspondiente al ID del usuario
3. Completa las medidas en centímetros:

| Campo | Descripción | Rango Normal |
|-------|-------------|--------------|
| **Usuario_ID** | ID del usuario | Debe existir en pestaña Usuarios |
| **Pecho** | Contorno del pecho | 80-120 cm |
| **Cintura** | Contorno de cintura | 60-100 cm |
| **Cadera** | Contorno de cadera | 80-120 cm |
| **Largo_Pierna** | Largo interior de pierna | 70-90 cm |
| **Largo_Brazo** | Largo de brazo | 55-70 cm |
| **Hombros** | Ancho de hombros | 35-50 cm |

### Consejos para Medidas Precisas
- **Usa una cinta métrica flexible**
- **Mide sobre ropa interior o ropa ajustada**
- **Mantén la cinta paralela al suelo**
- **No aprietes demasiado la cinta**

---

## 📈 Configuración de Tendencias

### Actualizar Tendencias de Moda

La pestaña **"Tendencias"** contiene las tendencias actuales que influyen en las recomendaciones:

1. Ve a la pestaña **"Tendencias"**
2. Actualiza los datos con las tendencias más recientes:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Keyword** | Palabra clave de tendencia | `vestidos largos` |
| **Fuente** | Origen de la tendencia | `Google Trends` |
| **Posicion** | Posición en ranking | `3` |
| **Volumen** | Volumen de búsqueda | `10000` |
| **URL** | Enlace de referencia | `https://...` |

### Fuentes Recomendadas
- **Google Trends**
- **Fashion Week Reports**
- **Social Media Analytics**
- **Retail Analytics**

---

## ⚙️ Configuración del Motor

### Ajustar Parámetros de Recomendación

En la pestaña **"Reglas"** puedes personalizar cómo funciona el algoritmo:

#### Pesos del Algoritmo
| Parámetro | Descripción | Valor Recomendado |
|-----------|-------------|-------------------|
| **peso_preferencias** | Importancia de gustos personales | `0.4` (40%) |
| **peso_tendencias** | Importancia de tendencias | `0.3` (30%) |
| **peso_fitting** | Importancia del ajuste | `0.3` (30%) |

#### Cuotas por Fuente
| Fuente | Descripción | Cuota Recomendada |
|--------|-------------|-------------------|
| **personalizada** | Productos del catálogo propio | `30%` |
| **live_it** | Productos de Live'it | `25%` |
| **vvl** | Productos de VVL | `25%` |
| **tryon** | Productos de TryOn | `15%` |
| **externa** | Productos de fuentes externas | `5%` |

### Ejemplos de Configuración

#### Para un enfoque más personalizado:
```
peso_preferencias: 0.6
peso_tendencias: 0.2
peso_fitting: 0.2
```

#### Para seguir más las tendencias:
```
peso_preferencias: 0.2
peso_tendencias: 0.6
peso_fitting: 0.2
```

#### Para priorizar el ajuste:
```
peso_preferencias: 0.3
peso_tendencias: 0.2
peso_fitting: 0.5
```

---

## 🎯 Generación de Recomendaciones

### Ver Recomendaciones

1. Ve a la pestaña **"Recomendaciones"**
2. Las recomendaciones se generan automáticamente para cada usuario
3. Cada usuario tiene hasta 20 recomendaciones ordenadas por score

### Interpretar los Resultados

| Campo | Descripción |
|-------|-------------|
| **Usuario_ID** | ID del usuario para quien es la recomendación |
| **Producto_ID** | Identificador único del producto |
| **Nombre** | Nombre del producto recomendado |
| **Score** | Puntuación de 0-100 (mayor = mejor recomendación) |
| **Fuente** | Origen del producto |
| **URL_Imagen** | Enlace a la imagen del producto |
| **Estilo** | Estilo del producto |
| **Color** | Color principal del producto |
| **Precio** | Precio del producto |

### Scores de Calidad
- **90-100:** Excelente match
- **80-89:** Muy buena recomendación
- **70-79:** Buena recomendación
- **60-69:** Recomendación aceptable
- **<60:** Recomendación pobre

---

## 🔧 Mantenimiento y Optimización

### Limpieza Regular de Datos

#### Revisión Semanal
- [ ] Verificar que no hay usuarios duplicados
- [ ] Comprobar medidas válidas (no negativas, dentro de rangos)
- [ ] Actualizar tendencias con datos recientes
- [ ] Revisar configuración de reglas

#### Revisión Mensual
- [ ] Análisis de calidad de recomendaciones
- [ ] Optimización de parámetros del algoritmo
- [ ] Backup de la hoja de cálculo
- [ ] Limpieza de datos obsoletos

### Indicadores de Rendimiento

#### KPIs a Monitorear
- **Número total de usuarios activos**
- **Promedio de score de recomendaciones**
- **Distribución por fuentes de productos**
- **Tiempo de actualización del sistema**

### Solución de Problemas Comunes

#### Las recomendaciones son pobres (scores bajos)
**Causas posibles:**
- Datos de usuario incompletos
- Tendencias desactualizadas
- Configuración inadecuada de pesos

**Soluciones:**
1. Verificar que todos los campos obligatorios estén completos
2. Actualizar la pestaña de tendencias
3. Ajustar los pesos en la pestaña de reglas

#### No aparecen recomendaciones para un usuario
**Causas posibles:**
- Usuario sin medidas corporales
- ID de usuario no válido
- Errores en la configuración

**Soluciones:**
1. Verificar que el usuario existe en la pestaña Usuarios
2. Añadir medidas corporales en la pestaña Medidas
3. Ejecutar la función `validateSystem()` para identificar errores

#### Validaciones no funcionan
**Causas posibles:**
- Pestaña Lists modificada incorrectamente
- Permisos insuficientes
- Conflictos en las fórmulas

**Soluciones:**
1. Restaurar la pestaña Lists desde backup
2. Verificar permisos de edición
3. Contactar al administrador del sistema

---

## 📞 Soporte

### Antes de Contactar Soporte

1. **Verifica los datos:** Asegúrate de que toda la información esté completa y correcta
2. **Revisa las validaciones:** Comprueba que no hay errores marcados en rojo
3. **Consulta esta guía:** Muchos problemas tienen solución en esta documentación

### Información a Incluir en tu Consulta

- **Descripción del problema**
- **Pasos para reproducir el error**
- **Datos específicos involucrados (IDs de usuario, etc.)**
- **Capturas de pantalla si es posible**

### Escalación

Para problemas técnicos complejos, el administrador puede:
1. Ejecutar funciones de diagnóstico
2. Restaurar desde backup
3. Contactar al equipo de desarrollo

---

## 📚 Documentación Relacionada

### 🔗 Para Usuarios
- **[🏠 Centro de Documentación](./README.md)** - Volver al índice principal
- **[🐛 Solución de Problemas](./troubleshooting.md)** - FAQ y errores comunes
- **[🚀 Guía de Despliegue](../google-apps-script/DEPLOYMENT.md)** - Para administradores

### 🛠️ Para Técnicos y Desarrolladores
- **[📖 Referencia de API](./api-reference.md)** - Funciones disponibles
- **[🔧 Setup de Desarrollo](./development-setup.md)** - Configurar entorno
- **[🧮 Algoritmos](./algorithms.md)** - Cómo funcionan las recomendaciones
- **[🌐 Frontend Guide](./frontend-guide.md)** - Interface web del sistema

### 📞 Soporte
- **[🤝 Contribuir](./contributing.md)** - Reportar bugs o mejoras
- **[📋 Templates de Issues](../.github/ISSUE_TEMPLATE/template-guide.md)** - Crear issues efectivos

---

## 💡 Consejos y Trucos

### Optimización del Uso
- **Actualiza preferencias regularmente** para mejores recomendaciones
- **Completa todas las medidas** para mayor precisión
- **Revisa las tendencias** para estar al día con la moda

### Personalización Avanzada
- **Ajusta pesos de algoritmo** si eres usuario avanzado
- **Experimenta con diferentes estilos** para descubrir nuevas opciones
- **Usa filtros de clima** según tu ubicación y estación
- [Solución de Problemas](./troubleshooting.md)