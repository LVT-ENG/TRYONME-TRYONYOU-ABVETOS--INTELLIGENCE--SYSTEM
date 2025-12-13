# Guía de Construcción de Landing Page TryOnYou en Wix

**Autor:** Manus AI
**Fecha:** 6 de Diciembre de 2025
**Proyecto:** TRYONYOU_PROJECT
**Objetivo:** Proporcionar instrucciones paso a paso para construir la landing page de TryOnYou en la plataforma Wix, utilizando el contenido y los assets generados.

---

## 1. Concepto Central y Estructura

El concepto central de la landing es el **"Espejo Mágico"**: una tienda de moda premium con una pantalla gigante en la fachada que funciona como un probador virtual.

### Estructura de la Landing

La landing debe seguir la siguiente estructura mínima de secciones:

| Sección | Contenido Principal | Assets Requeridos | Archivo de Contenido |
| :--- | :--- | :--- | :--- |
| **1. HERO PRINCIPAL** | Claim, Subtítulo, CTAs ("Try Live Demo", "Book 30-Day Pilot") | Imagen de tienda con espejo (`hero_magic_mirror.png`), Logo, Pau (mascota) | `translations.txt` |
| **2. ESPEJO MÁGICO** | Explicación del concepto y la tecnología. | Mockup de la interacción (`magic_mirror_mockup.png`) | `content_map.txt` |
| **3. CÓMO FUNCIONA** | 4 pasos sencillos de uso. | Iconografía (opcional, usar elementos de Wix) | `content_map.txt` |
| **4. PARA TIENDAS** | Beneficios clave para retailers (menos devoluciones, más conversión). | Texto con viñetas | `content_map.txt` |
| **5. PILOTO 30 DÍAS** | Oferta de prueba controlada. | CTA para solicitar propuesta. | `content_map.txt` |
| **6. CONTACTO** | Formulario de contacto. | Campos de formulario. | `content_map.txt` |

---

## 2. Configuración Inicial en Wix

### 2.1. Creación de la Página y Diseño
1.  Cree una nueva página en Wix. Se recomienda usar una plantilla minimalista o de "una sola página" para facilitar la navegación.
2.  Asegúrese de que el diseño sea **limpio, premium y moderno**, en línea con marcas como Galeries Lafayette o Printemps.

### 2.2. Configuración Multi-Idioma
1.  Active la función **Wix Multilingual** en el editor.
2.  Configure los tres idiomas: **Francés (FR)** como idioma principal, **Inglés (EN)** y **Español (ES)**.
3.  Utilice el contenido de `TRYONYOU_PROJECT/WIX_LANDING/translations.txt` y `TRYONYOU_PROJECT/WIX_LANDING/content_map.txt` para rellenar los textos en cada idioma.

---

## 3. Implementación de Secciones

### 3.1. HERO PRINCIPAL
*   **Imagen de Fondo:** Suba y use el archivo `hero_magic_mirror.png` (ubicado en `TRYONYOU_PROJECT/ASSETS/IMAGES/`) como imagen principal de la sección.
*   **Logo y Mascota:** Coloque el logo de TryOnYou (no proporcionado, usar placeholder) en la esquina superior derecha. Coloque la imagen de Pau (`pau_mascot.png` en `TRYONYOU_PROJECT/ASSETS/PAU/`) en una esquina, de forma sutil.
*   **Textos:**
    *   **Claim (Título):** Use `hero_title` de `translations.txt`.
    *   **Subtítulo:** Use `hero_subtitle` de `translations.txt`.
*   **Botones CTA:**
    1.  **"Try Live Demo"**: Use el texto `cta_demo` de `translations.txt`.
        *   **Acción:** Configurar el enlace para que abra una **nueva pestaña** con la URL de la demo técnica (ejemplo: `https://demo.tryonyou.app`).
    2.  **"Book 30-Day Pilot"**: Use el texto `cta_pilot` de `translations.txt`.
        *   **Acción:** Configurar el enlace para que dirija a la **Sección 5 (Piloto 30 Días)** o a la **Sección 6 (Contacto)**.

### 3.2. SECCIÓN "ESPEJO MÁGICO"
*   **Contenido:** Use los textos detallados en la sección `[ESPEJO_MAGICO]` de `content_map.txt`.
*   **Visual:** Inserte el mockup de la interacción `magic_mirror_mockup.png` (ubicado en `TRYONYOU_PROJECT/ASSETS/IMAGES/`) para ilustrar el concepto.

### 3.3. SECCIÓN "CÓMO FUNCIONA" (4 Pasos)
*   **Contenido:** Use los 4 pasos de la sección `[COMMENT_CA_MARCHE / CÓMO FUNCIONA]` de `content_map.txt`.
*   **Diseño:** Presente los pasos de forma clara y secuencial, idealmente con un número grande y un texto corto para cada uno.

### 3.4. SECCIÓN "PARA TIENDAS / GRANDES ALMACENES"
*   **Contenido:** Use las viñetas (bullets) de la sección `[POUR_LES_MAGASINS / PARA TIENDAS]` de `content_map.txt`.
*   **Énfasis:** Destaque los nombres de los grandes almacenes (Galeries Lafayette, Printemps, LVMH) para posicionar la marca como premium.

### 3.5. SECCIÓN "PILOTO PETIT FORMAT / PILOTO PEQUEÑO"
*   **Contenido:** Use la oferta detallada en la sección `[PILOTE_30_JOURS]` de `content_map.txt`.
*   **CTA:** Incluya un botón destacado con el texto "Demandez une proposition de pilote" que dirija a la sección de Contacto.

### 3.6. SECCIÓN "CONTACTO"
*   **Formulario:** Cree un formulario de contacto con los campos mínimos requeridos: **Nombre, Empresa, Rol, Email, Mensaje**.
*   **Integración:** Conecte el formulario a una herramienta de recolección de datos (Google Sheets, CRM, o la base de datos de contactos de Wix) para asegurar que los leads se capturen correctamente.

---

## 4. Tareas Post-Publicación

Una vez que la landing esté terminada y publicada:

1.  **Actualice `landing_url.txt`**: Rellene las URLs pública y de edición en el archivo `TRYONYOU_PROJECT/WIX_LANDING/landing_url.txt`.
2.  **Verificación Multi-Idioma**: Revise que la traducción automática de Wix no haya alterado los textos y que los tres idiomas (FR, EN, ES) se muestren correctamente.
3.  **Prueba de Demo**: Verifique que el botón "Try Live Demo" abra la URL de la demo técnica en una nueva pestaña.
4.  **Prueba de Formulario**: Envíe un formulario de prueba para confirmar que los datos se están registrando en la integración seleccionada (Sheets/CRM).
