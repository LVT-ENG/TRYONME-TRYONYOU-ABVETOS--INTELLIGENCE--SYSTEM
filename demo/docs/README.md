# Paquete de Entrega TryOnYou - FASE 2

Este paquete contiene todos los activos generados para la Fase 2 del proyecto TryOnYou, enfocados en la landing page, la integración de la demo y el material comercial.

## 1. Estructura del Paquete

| Directorio | Contenido | Destinatario Principal |
| :--- | :--- | :--- |
| **landing/** | Archivos para la implementación de la Landing Page en Wix. | Implementador Wix / Diseñador |
| **integration/** | Archivo HTML con el *iframe* de integración para la Demo React. | Informático / Desarrollador |
| **pdf/** | Script y activos para la generación del PDF comercial dinámico. | Comercial / Ventas |
| **assets/** | Placeholders para los mockups y otros activos visuales. | Todos |
| **docs/** | Documentación general (este README). | Todos |

## 2. Guía para el Informático (Integración de la Demo React)

El objetivo es reemplazar el *placeholder* de la demo en la landing de Wix con la aplicación React final.

### Archivo Clave: `integration/index.html`

Este archivo contiene:
1.  Un **iframe seguro** con el `id="tryonyou_demo_iframe"`.
2.  Un **script de reemplazo** que busca una URL de demo final.

**Pasos de Integración:**

1.  **Despliegue de la Demo React:** Asegúrese de que la aplicación React (`TRYONYOU_MASTER_FINAL` o el ZIP de referencia) esté desplegada y accesible a través de una URL pública y segura (HTTPS).
2.  **Actualización del Script:** Edite el archivo `integration/index.html`. Busque la línea:
    ```javascript
    const finalDemoUrl = "URL_DE_LA_DEMO_FINAL_DEL_INFORMATICO_AQUI"; 
    ```
    y reemplace el valor con la URL pública de la demo React.
3.  **Incrustación en Wix:** El implementador de Wix debe incrustar el contenido de `integration/index.html` (o el archivo en sí, si Wix lo permite) en la sección "Demo Interactiva" de la landing. El script se encargará de cargar la demo real una vez que la URL esté configurada.

## 3. Guía para el Comercial (Sistema Automático de PDF)

El sistema permite generar un *one-pager* comercial actualizado automáticamente con los precios y beneficios.

### Archivos Clave: `pdf/generate_pdf.py` y `pdf/one_pager_template.md`

| Archivo | Función |
| :--- | :--- |
| `content_map.txt` | **Fuente de datos.** Contiene precios, beneficios y contacto comercial. **EDITAR AQUÍ.** |
| `pdf/one_pager_template.md` | **Plantilla editable.** Estructura del PDF. Se puede modificar el texto y el formato Markdown. |
| `pdf/generate_pdf.py` | **Script de ejecución.** Lee `content_map.txt` y `one_pager_template.md` para generar el PDF. |
| `tryonyou_one_pager.pdf` | **PDF generado.** El resultado final listo para enviar al cliente. |

**Pasos de Actualización:**

1.  **Editar Datos:** Modifique los valores en el archivo raíz `content_map.txt` (ej. cambiar el precio del piloto).
2.  **Ejecutar Script:** Desde la terminal, ejecute el script de Python:
    ```bash
    python3 pdf/generate_pdf.py
    ```
3.  **Resultado:** El nuevo PDF (`tryonyou_one_pager.pdf`) se generará automáticamente con los datos actualizados.

## 4. Guía para el Implementador Wix

Las instrucciones detalladas para la construcción de la landing se encuentran en:

### Archivo Clave: `landing/landing_page_wix_instructions.md`

Este documento detalla:
*   La estructura de las 6 secciones de la landing.
*   El contenido multilingüe (FR/EN/ES) a usar, extraído de `translations.txt`.
*   La necesidad de usar el `iframe` de `integration/index.html` en la sección "Demo Interactiva".
*   La conexión del formulario a Google Sheets.

**¡Importante!** La URL final de la landing debe registrarse en el archivo raíz `landing_url.txt`.
