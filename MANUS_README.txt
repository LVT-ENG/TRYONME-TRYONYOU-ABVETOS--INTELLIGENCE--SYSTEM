============================================
MANUS - GUÍA DE TRABAJO PARA TRYONYOU
============================================

OBJETIVO:
---------
Tu trabajo es crear la landing oficial de TryOnYou y todo el material comercial,
SIN tocar el proyecto técnico del informático (React / backend).

SOLO debes trabajar dentro de esta carpeta:

  TRYONYOU_PROJECT/
      WIX_LANDING/
      ASSETS/
      COMMERCIAL/

Nunca modifiques nada en el proyecto técnico original (ej: TRYONYOU_MASTER_FINAL).

-------------------------------------------------
1. DÓNDE TRABAJAS Y QUÉ NO DEBES TOCAR
-------------------------------------------------

Trabajas SIEMPRE en:

  TRYONYOU_PROJECT/
    WIX_LANDING/       → todo lo relacionado con la landing de Wix
    ASSETS/            → imágenes, logos, Pau, mockups
    COMMERCIAL/        → PDFs, scripts, contactos, etc.

Prohibido tocar (ejemplos):

  TRYONYOU_MASTER_FINAL/
  cualquier proyecto React del informático
  backend, APIs, código técnico

Si necesitas algo de la demo técnica, se integra por URL (botón "Try Demo"),
nunca metiendo el código de React en Wix.

-------------------------------------------------
2. IDEA CENTRAL DE LA LANDING
-------------------------------------------------

Concepto visual principal:

  Una tienda de moda vista desde fuera,
  con una BANDERA / PANTALLA GIGANTE en la fachada,
  que funciona como un "ESPEJO MÁGICO" donde la gente se prueba ropa con TryOnYou.

La landing tiene que transmitir:

  - Innovación en probadores virtuales
  - Experiencia premium (tipo Galeries Lafayette / Printemps)
  - Claridad para tiendas: menos devoluciones, más ventas
  - Facilidad de uso para el cliente final

-------------------------------------------------
3. ESTRUCTURA MÍNIMA DE LA LANDING EN WIX
-------------------------------------------------

Construye en Wix (usando IA si quieres) al menos estas secciones:

3.1. HERO PRINCIPAL
    - Imagen: tienda + bandera/pantalla gigante (espejo mágico)
    - Logo TryOnYou arriba a la derecha
    - Pau pequeño en una esquina (sin amontonar elementos)
    - Claim corto (ejemplos):
        "La nouvelle façon d'essayer les vêtements, sans cabine."
        "The new way to try clothes, no fitting room needed."
    - Botones:
        • "Try Live Demo"
        • "Book 30-Day Pilot"

3.2. SECCIÓN "ESPEJO MÁGICO"
    - Explica que la gran bandera/pantalla es un espejo inteligente:
        Cliente se ve con distintos outfits sin cambiarse.
    - Acompaña con una imagen / mockup de:
        - cliente delante del espejo
        - avatar / outfits cambiando

3.3. SECCIÓN "CÓMO FUNCIONA" (4 PASOS)
    Ejemplo:
      1) El cliente se coloca delante del espejo
      2) Pau analiza y propone outfits
      3) Los looks cambian en pantalla en segundos
      4) El cliente decide qué comprar, sin probador

3.4. SECCIÓN "PARA TIENDAS / GRANDES ALMACENES"
    - Beneficios para retailers:
        • Menos devoluciones
        • Mejor conversión
        • Experiencia premium en tienda
        • Integración rápida
    - Destinatarios:
        • Galeries Lafayette, Printemps, Le Bon Marché, LVMH, etc.

3.5. SECCIÓN "PILOTE PETIT FORMAT / PILOTO PEQUEÑO"
    - Explica la idea de piloto 30 días o formato reducido:
        • 1 tienda o 1 corner
        • Pocas prendas
        • Prueba controlada
    - CTA:
        • "Demandez une proposition de pilote"
        • "Solicitar propuesta de piloto"

3.6. SECCIÓN "CONTACTO"
    - Formulario conectado a Google Sheets o CRM
    - Campos mínimos:
        • Nombre
        • Empresa
        • Rol
        • Email
        • Mensaje
    - Idioma principal: francés
    - Alternativas: inglés y español (multi-idioma de Wix)

-------------------------------------------------
4. INTEGRACIÓN DE LA DEMO (SIN TOCAR CÓDIGO)
-------------------------------------------------

La demo técnica (React) es el motor del sistema.
Tú NO tocas su código.

En la landing de Wix:
    - Crea un botón "Try Live Demo"
    - Configura ese botón para que abra la demo en otra pestaña del navegador.

Ejemplo:
    URL: https://demo.tryonyou.app
    (se ajustará a la URL real que te den)

No integres React dentro de Wix, no copies código, no modificas nada del dev.
Solo usas URL.

-------------------------------------------------
5. ENTREGABLES QUE TIENES QUE DEJAR LISTOS
-------------------------------------------------

Dentro de TRYONYOU_PROJECT, al final de tu trabajo debe existir:

5.1. URL DE LA LANDING
    Archivo:
        TRYONYOU_PROJECT/WIX_LANDING/landing_url.txt

    Contenido:
        - URL pública de la landing
        - URL de edición de Wix
        - Idiomas activados (FR/EN/ES)

5.2. MAPA DE CONTENIDOS
    Archivo:
        TRYONYOU_PROJECT/WIX_LANDING/content_map.txt

    Contenido (ejemplo):
        - HERO: texto FR/EN/ES
        - SECCIÓN "Espejo Mágico": textos + imágenes
        - SECCIÓN "Cómo funciona": textos 4 pasos
        - SECCIÓN "Para tiendas": bullets usados
        - SECCIÓN "Piloto": oferta, CTA
        - SECCIÓN "Contacto": campos del formulario

5.3. TRADUCCIONES
    Archivo:
        TRYONYOU_PROJECT/WIX_LANDING/translations.txt

    Estructura:
        [FR]
        ...

        [EN]
        ...

        [ES]
        ...

5.4. ASSETS (IMÁGENES, LOGOS, PAU, MOCKUPS)
    Directorio:
        TRYONYOU_PROJECT/ASSETS/IMAGES/

    Debes guardar ahí:
        - Imágenes de la tienda + bandera/espejo
        - Mockups de la interfaz TryOnYou
        - Imágenes de Pau (pavo) en PNG
        - Cualquier recurso visual usado en la landing

5.5. MATERIAL COMERCIAL BÁSICO (OPCIONAL, SI HAY TIEMPO)
    Directorio:
        TRYONYOU_PROJECT/COMMERCIAL/

    Ejemplos:
        - COMMERCIAL/PDF/one_pager.pdf
        - COMMERCIAL/PDF/pitch_retailers.pdf
        - COMMERCIAL/SCRIPTS/script_commercial.txt

-------------------------------------------------
6. RESUMEN RÁPIDO PARA TI
-------------------------------------------------

  - SOLO trabajas en TRYONYOU_PROJECT (WIX_LANDING, ASSETS, COMMERCIAL).
  - Creas la landing en Wix con el concepto de tienda + bandera + espejo mágico.
  - Integras la demo con un botón que abre la demo técnica por URL.
  - No tocas el proyecto técnico del informático.
  - Dejas bien guardados:
      • la URL de la landing,
      • el mapa de contenidos,
      • las traducciones,
      • y los assets utilizados.
