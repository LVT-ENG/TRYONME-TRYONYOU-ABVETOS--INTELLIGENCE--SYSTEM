# Instrucciones de Construcción de Landing Page en Wix para TryOnYou

**Objetivo:** Crear una landing page de alta conversión en Wix, utilizando el contenido multilingüe de `translations.txt` y siguiendo la estructura de secciones solicitada.

**Estilo Visual:**
Se debe seguir la guía de estilo visual del proyecto:
*   **Paleta de Colores:** Tonos tierra, ocre, blanco y dorado.
*   **Imágenes:** Usar las imágenes del **FULL KIT V2** (simuladas). Deben estar tratadas para coincidir con la paleta de colores. Evitar texto sobre el sujeto principal de la imagen.
*   **Logo/Símbolo ('tráilon'):** Colocación discreta en la esquina superior derecha.

---

## Estructura de la Landing Page

La landing debe ser **simple, limpia y enfocada a la conversión**. Se recomienda usar una plantilla de Wix de una sola página con navegación ancla.

### 1. Hero con Espejo Mágico

| Elemento | Contenido (ES) | Notas de Implementación |
| :--- | :--- | :--- |
| **Título Principal** | Pruébate Virtualmente | Usar `hero_title` de `translations.txt`. Fuente grande y legible. |
| **Subtítulo** | El espejo mágico que transforma la experiencia de compra. | Usar `hero_subtitle` de `translations.txt`. |
| **Imagen/Vídeo** | Imagen de alta calidad del "Espejo Mágico" (Mockup de escaparate). | Debe ser la primera imagen que capte la atención. |
| **CTA Principal** | Solicita tu Demo Gratuita | Botón destacado que enlaza directamente a la sección **Formulario**. |

### 2. Cómo funciona TryOnYou

| Elemento | Contenido (ES) | Notas de Implementación |
| :--- | :--- | :--- |
| **Título de Sección** | Cómo funciona | Usar `how_it_works_title` de `translations.txt`. |
| **Contenido** | Explicación concisa en 3 pasos (Ej: 1. El cliente se sitúa frente al espejo. 2. Elige un producto. 3. Se lo prueba virtualmente). | Usar gráficos o iconos para cada paso. Incluir imágenes futuristas y close-up photography. |

### 3. Caso de uso en tienda física

| Elemento | Contenido (ES) | Notas de Implementación |
| :--- | :--- | :--- |
| **Título de Sección** | Caso de uso en tienda física | Usar `case_study_title` de `translations.txt`. |
| **Contenido** | Beneficios clave y métricas de éxito (Ej: Aumento de tráfico, mejora de la experiencia, datos de conversión). | Usar una tabla o lista de beneficios. Incluir una imagen hiperrealista de una clienta usando el espejo. |

### 4. Demo Interactiva (Placeholder)

| Elemento | Contenido (ES) | Notas de Implementación |
| :--- | :--- | :--- |
| **Título de Sección** | Demo Interactiva | Usar `demo_title` de `translations.txt`. |
| **Contenido** | "La demo estará disponible pronto. Mientras tanto, puedes ver un vídeo de demostración." | **Implementación Clave:** Insertar un **iframe seguro** (HTML Embed) en esta sección. El `src` inicial debe ser un placeholder de vídeo (Ej: YouTube de la demo). Este iframe será el que se reemplazará con la demo del informático. |
| **ID del Iframe** | Asignar un ID único y fácil de identificar al iframe, por ejemplo: `tryonyou_demo_iframe`. | Esto es crucial para la integración futura. |

### 5. Plan Piloto 30 Días

| Elemento | Contenido (ES) | Notas de Implementación |
| :--- | :--- | :--- |
| **Título de Sección** | Plan Piloto 30 Días | Usar `pilot_plan_title` de `translations.txt`. |
| **Contenido** | Resumen de la oferta (30 días, sin compromiso, precios de `content_map.txt`). | Destacar el valor y la facilidad de inicio. Usar un diseño de "tarjeta de precios" simple. |
| **CTA Secundaria** | Empezar mi Piloto Ahora | Botón que enlaza al **Formulario**. |

### 6. Formulario Conectado a Google Sheets

| Elemento | Contenido (ES) | Notas de Implementación |
| :--- | :--- | :--- |
| **Título de Sección** | Solicita tu demo | Usar `form_title` de `translations.txt`. |
| **Campos** | Nombre, Email, Empresa, Teléfono, Mensaje (Opcional). | Campos esenciales para contacto comercial. |
| **Conexión** | **Crucial:** El formulario debe configurarse para enviar los datos a una **Google Sheet** específica. Wix tiene integraciones nativas para esto. |
| **CTA Final** | Enviar Solicitud | Botón de envío. |

---

## Implementación Multi-Idioma (FR/EN/ES)

1.  **Herramienta de Wix:** Utilizar la función nativa de Wix **Wix Multilingual** para gestionar las traducciones.
2.  **Traducciones:** El contenido de `translations.txt` debe usarse para poblar los textos de cada idioma (FR, EN, ES).
3.  **Sincronización:** Asegurarse de que el formulario y el iframe placeholder se mantengan consistentes en todas las versiones de idioma.

---

## Integración Externa (Nota para el Informático)

*   La sección de Demo Interactiva contiene un `iframe` con el ID `tryonyou_demo_iframe`.
*   La URL de la landing final debe guardarse en `landing_url.txt`.

**Fin de las Instrucciones.**
