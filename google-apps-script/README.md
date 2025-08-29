# Google Apps Script - TryOnMe Motor

Este directorio contiene los archivos de Google Apps Script para el motor central del sistema TryOnMe.

## Archivos

- `motor.gs`: Función principal `initTryOnMe()` que crea el prototipo del sistema de recomendaciones en Google Sheets
- `helpers.gs`: Funciones auxiliares para validaciones y utilidades

## Uso

1. Crea un nuevo proyecto en Google Apps Script (script.google.com)
2. Copia el contenido de `motor.gs` y `helpers.gs` en archivos separados del proyecto
3. Ejecuta la función `initTryOnMe()` desde el editor de Google Apps Script
4. Se creará una hoja de cálculo con toda la estructura del sistema de recomendaciones

## Estructura del Sistema

El sistema crea las siguientes pestañas:

- **README**: Documentación y descripción del sistema
- **Lists**: Catálogos para desplegables (estilos, colores, etc.)
- **Usuarios**: Datos del formulario inicial y preferencias
- **Medidas**: Medidas corporales capturadas en TryOn
- **Tendencias**: Top 20 de Google/FTT y etiquetas normalizadas
- **Reglas**: Pesos y cuotas para generar outputs
- **Recomendaciones**: 20 resultados finales por usuario

## Notas

Este archivo sirve como prototipo funcional. Una vez validado, migrar a BD + dashboard web.