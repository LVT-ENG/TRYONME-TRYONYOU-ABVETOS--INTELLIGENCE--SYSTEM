# TryOnYou Embed SDK

SDK embebible para partners que permite integrar la funcionalidad de probador virtual TryOnYou en sitios web de marcas como Levi's, Zara, y otras.

## 🚀 Instalación Rápida

### Opción 1: Script Tag (Recomendado)

```html
<script src="https://cdn.tryonyou.app/embed.js" 
        data-partner-id="tu-marca"
        data-theme="light">
</script>
```

### Opción 2: NPM

```bash
npm install @tryonyou/embed
```

```javascript
import TryOnYou from '@tryonyou/embed';

TryOnYou.init({
  partnerId: 'tu-marca',
  apiKey: 'tu-api-key'
});
```

## 📝 Configuración

### Configuración Básica

```javascript
TryOnYou.init({
  partnerId: 'tu-marca',        // Requerido: ID de tu marca
  apiKey: 'tu-api-key',         // Opcional: API key para funciones avanzadas
  theme: 'light',               // 'light' o 'dark'
  language: 'es',               // Idioma de la interfaz
  currency: 'EUR'               // Moneda para precios
});
```

### Configuración Avanzada

```javascript
TryOnYou.init({
  partnerId: 'tu-marca',
  apiKey: 'tu-api-key',
  theme: 'light',
  language: 'es',
  currency: 'EUR',
  
  // URLs personalizadas
  apiEndpoint: 'https://api.tryonyou.app',
  cdnEndpoint: 'https://cdn.tryonyou.app',
  
  // Productos específicos para mostrar
  products: ['product-123', 'product-456'],
  
  // Contenedor personalizado (por defecto crea uno automáticamente)
  container: 'mi-widget-container',
  
  // Estilos personalizados
  customStyles: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color'
  }
});
```

## 🎨 Personalización

### Temas

El SDK incluye dos temas predefinidos:

- `light`: Tema claro (por defecto)
- `dark`: Tema oscuro

```javascript
// Cambiar tema dinámicamente
TryOnYou.updateConfig({ theme: 'dark' });
```

### Estilos Personalizados

```javascript
TryOnYou.updateConfig({
  customStyles: {
    primary: '#1565c0',      // Color principal de tu marca
    secondary: '#ffffff',    // Color secundario
    accent: '#f5f5f5',       // Color de acento
    text: '#333333',         // Color de texto
    background: '#ffffff'    // Color de fondo
  }
});
```

### CSS Personalizado

También puedes sobrescribir estilos con CSS:

```css
/* Personalizar el botón de activación */
.tryonyou-trigger {
  background: linear-gradient(135deg, #your-color1, #your-color2) !important;
  width: 70px !important;
  height: 70px !important;
}

/* Personalizar el panel */
.tryonyou-panel {
  width: 400px !important;
  height: 600px !important;
}

/* Tema personalizado */
.tryonyou-widget.theme-custom {
  --primary-color: #your-brand-color;
  --secondary-color: #your-secondary-color;
}
```

## 🔧 API

### Métodos Principales

#### `init(config)`
Inicializa el widget con la configuración especificada.

```javascript
TryOnYou.init({
  partnerId: 'mi-marca',
  theme: 'light'
});
```

#### `tryOnProduct(product)`
Inicia el probador virtual para un producto específico.

```javascript
TryOnYou.tryOnProduct({
  id: 'product-123',
  name: 'Chaqueta Premium',
  price: '89.99',
  image: 'https://mi-tienda.com/imagen.jpg',
  brand: 'mi-marca',
  category: 'outerwear'
});
```

#### `createAvatar()`
Inicia el proceso de creación de avatar 3D.

```javascript
TryOnYou.createAvatar();
```

#### `setAvatar(avatarData)`
Establece los datos del avatar del usuario.

```javascript
TryOnYou.setAvatar({
  id: 'avatar-123',
  measurements: {
    height: 175,
    chest: 92,
    waist: 78,
    hip: 95
  }
});
```

#### `openPanel()` / `closePanel()` / `togglePanel()`
Controla la visibilidad del panel.

```javascript
TryOnYou.openPanel();
TryOnYou.closePanel();
TryOnYou.togglePanel();
```

#### `updateConfig(newConfig)`
Actualiza la configuración del widget.

```javascript
TryOnYou.updateConfig({
  theme: 'dark',
  language: 'en'
});
```

#### `destroy()`
Destruye el widget y limpia los recursos.

```javascript
TryOnYou.destroy();
```

### Eventos

El SDK emite eventos personalizados que puedes escuchar:

```javascript
// Widget inicializado
document.addEventListener('tryonyou:initialized', (e) => {
  console.log('TryOnYou initialized:', e.detail);
});

// Panel abierto/cerrado
document.addEventListener('tryonyou:panelOpened', (e) => {
  console.log('Panel opened');
});

document.addEventListener('tryonyou:panelClosed', (e) => {
  console.log('Panel closed');
});

// Probador virtual iniciado
document.addEventListener('tryonyou:tryOnStarted', (e) => {
  console.log('Try-on started for product:', e.detail.product);
  
  // Integrar con analytics
  gtag('event', 'virtual_try_on', {
    product_id: e.detail.product.id,
    product_name: e.detail.product.name
  });
});

// Creación de avatar iniciada
document.addEventListener('tryonyou:avatarCreationStarted', (e) => {
  console.log('Avatar creation started');
});

// Avatar establecido
document.addEventListener('tryonyou:avatarSet', (e) => {
  console.log('Avatar set:', e.detail.avatar);
});

// Configuración actualizada
document.addEventListener('tryonyou:configUpdated', (e) => {
  console.log('Config updated:', e.detail.config);
});

// Widget destruido
document.addEventListener('tryonyou:destroyed', (e) => {
  console.log('Widget destroyed');
});
```

### API de Eventos

También puedes usar los métodos `on()` y `off()`:

```javascript
// Añadir listener
TryOnYou.on('tryOnStarted', (e) => {
  console.log('Try-on started:', e.detail);
});

// Remover listener
const handler = (e) => console.log('Event:', e.detail);
TryOnYou.on('panelOpened', handler);
TryOnYou.off('panelOpened', handler);
```

## 🔌 Integración con Plataformas

### Shopify

```html
<!-- En tu theme.liquid o en la página de producto -->
<script src="https://cdn.tryonyou.app/embed.js" 
        data-partner-id="{{ shop.permanent_domain | replace: '.myshopify.com', '' }}"
        data-theme="light">
</script>

<script>
  // Integrar con producto actual de Shopify
  {% if product %}
  TryOnYou.init({
    partnerId: '{{ shop.permanent_domain | replace: ".myshopify.com", "" }}',
    products: ['{{ product.id }}'],
    customStyles: {
      primary: '{{ settings.color_primary }}',
      secondary: '{{ settings.color_secondary }}'
    }
  });
  {% endif %}
</script>
```

### WooCommerce

```php
// En functions.php
function add_tryonyou_script() {
    ?>
    <script src="https://cdn.tryonyou.app/embed.js" 
            data-partner-id="<?php echo get_option('tryonyou_partner_id'); ?>"
            data-theme="light">
    </script>
    
    <script>
    <?php if (is_product()): ?>
        global $product;
        TryOnYou.init({
            partnerId: '<?php echo get_option('tryonyou_partner_id'); ?>',
            products: ['<?php echo $product->get_id(); ?>']
        });
    <?php endif; ?>
    </script>
    <?php
}
add_action('wp_footer', 'add_tryonyou_script');
```

### Magento

```xml
<!-- En tu layout XML -->
<body>
    <script src="https://cdn.tryonyou.app/embed.js" 
            data-partner-id="<?php echo $this->getPartnerId(); ?>"
            data-theme="light">
    </script>
    
    <script>
        require(['jquery'], function($) {
            TryOnYou.init({
                partnerId: '<?php echo $this->getPartnerId(); ?>',
                theme: 'light'
            });
        });
    </script>
</body>
```

## 📊 Analytics e Integración

### Google Analytics

```javascript
document.addEventListener('tryonyou:tryOnStarted', (e) => {
  gtag('event', 'virtual_try_on', {
    'event_category': 'TryOnYou',
    'event_label': e.detail.product.name,
    'value': parseFloat(e.detail.product.price)
  });
});

document.addEventListener('tryonyou:avatarCreationStarted', (e) => {
  gtag('event', 'avatar_creation_started', {
    'event_category': 'TryOnYou'
  });
});
```

### Facebook Pixel

```javascript
document.addEventListener('tryonyou:tryOnStarted', (e) => {
  fbq('track', 'ViewContent', {
    content_ids: [e.detail.product.id],
    content_type: 'product',
    content_name: e.detail.product.name,
    value: parseFloat(e.detail.product.price),
    currency: 'EUR'
  });
});
```

### Custom Analytics

```javascript
document.addEventListener('tryonyou:tryOnStarted', (e) => {
  // Enviar a tu backend
  fetch('/analytics/tryonyou-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'try_on_started',
      product_id: e.detail.product.id,
      timestamp: e.detail.timestamp,
      user_id: getCurrentUserId()
    })
  });
});
```

## 🔒 Seguridad y Privacidad

### API Keys

Las API keys son opcionales para funcionalidad básica, pero requeridas para:
- Acceso a productos personalizados
- Analytics avanzados
- Funciones premium

```javascript
TryOnYou.init({
  partnerId: 'tu-marca',
  apiKey: 'tu-api-key-secreta'  // No exponer en cliente para producción
});
```

### GDPR Compliance

El SDK respeta la privacidad del usuario:
- No almacena datos personales sin consentimiento
- Permite opt-out de analytics
- Cumple con GDPR automáticamente

```javascript
// Deshabilitar analytics si el usuario no ha dado consentimiento
TryOnYou.init({
  partnerId: 'tu-marca',
  enableAnalytics: userHasConsent()
});
```

## 🛠️ Desarrollo y Testing

### Modo Desarrollo

```javascript
TryOnYou.init({
  partnerId: 'tu-marca',
  apiEndpoint: 'https://api-dev.tryonyou.app',  // API de desarrollo
  debug: true  // Habilita logs de debug
});
```

### Testing

```javascript
// Test de integración básica
function testTryOnYouIntegration() {
  console.log('Testing TryOnYou integration...');
  
  // Verificar que el SDK está cargado
  if (typeof TryOnYou === 'undefined') {
    console.error('TryOnYou SDK not loaded');
    return false;
  }
  
  // Inicializar con configuración de test
  TryOnYou.init({
    partnerId: 'test-partner',
    debug: true
  });
  
  // Verificar que el widget se crea
  setTimeout(() => {
    const widget = document.querySelector('.tryonyou-widget');
    if (widget) {
      console.log('✅ Widget created successfully');
    } else {
      console.error('❌ Widget not created');
    }
  }, 1000);
}

// Ejecutar test cuando la página cargue
document.addEventListener('DOMContentLoaded', testTryOnYouIntegration);
```

## 🚀 Despliegue en Producción

### CDN

El SDK se distribuye a través de CDN para máximo rendimiento:

```html
<!-- Producción -->
<script src="https://cdn.tryonyou.app/embed.js"></script>

<!-- Específica por versión -->
<script src="https://cdn.tryonyou.app/embed@1.0.0.js"></script>

<!-- Desarrollo -->
<script src="https://cdn-dev.tryonyou.app/embed.js"></script>
```

### Optimización de Rendimiento

```html
<!-- Carga asíncrona -->
<script async src="https://cdn.tryonyou.app/embed.js" 
        data-partner-id="tu-marca">
</script>

<!-- Preload para mejor rendimiento -->
<link rel="preload" href="https://cdn.tryonyou.app/embed.js" as="script">
<link rel="preload" href="https://cdn.tryonyou.app/embed.css" as="style">
```

## 🆘 Soporte

### Documentación Adicional
- [API Reference](https://docs.tryonyou.app/api)
- [Examples Repository](https://github.com/tryonyou/examples)
- [Changelog](https://docs.tryonyou.app/changelog)

### Contacto
- Email: partners@tryonyou.app
- Slack: [TryOnYou Partners](https://tryonyou-partners.slack.com)
- GitHub Issues: [Reportar problema](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues)

### FAQ

**¿Es gratuito el SDK?**
Sí, el SDK básico es gratuito. Las funciones premium requieren suscripción.

**¿Funciona en móviles?**
Sí, el SDK es completamente responsive y optimizado para móviles.

**¿Qué navegadores son compatibles?**
Todos los navegadores modernos (Chrome, Firefox, Safari, Edge). IE11+ con polyfills.

**¿Puedo personalizar completamente el diseño?**
Sí, mediante CSS personalizado y la configuración de `customStyles`.

**¿Cómo obtengo mi partner ID?**
Contacta con el equipo de TryOnYou en partners@tryonyou.app