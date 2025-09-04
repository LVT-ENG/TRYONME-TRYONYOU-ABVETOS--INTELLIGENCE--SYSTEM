# Guía de Integración TryOnYou SDK

## 🎯 Casos de Uso por Partner

### Levi's - Integración Básica
Integración simple con productos específicos y branding de Levi's.

```html
<!-- Integración básica para Levi's -->
<script src="https://cdn.tryonyou.app/embed.js" 
        data-partner-id="levis"
        data-theme="light"
        data-products="levis-501,levis-511,levis-trucker">
</script>
```

### Zara - Integración Premium
Integración avanzada con tema oscuro y configuración personalizada.

```html
<!-- Integración premium para Zara -->
<script src="https://cdn.tryonyou.app/embed.js"></script>
<script>
TryOnYou.init({
  partnerId: 'zara',
  theme: 'dark',
  customStyles: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#f5f5f5'
  },
  language: 'es',
  currency: 'EUR'
});
</script>
```

### H&M - Integración Móvil Optimizada
Configuración específica para experiencia móvil.

```html
<script src="https://cdn.tryonyou.app/embed.js"></script>
<script>
TryOnYou.init({
  partnerId: 'hm',
  theme: 'light',
  mobileOptimized: true,
  container: 'hm-tryon-widget',
  customStyles: {
    primary: '#e50000',
    secondary: '#ffffff'
  }
});

// Integración específica para móvil
if (window.innerWidth <= 768) {
  TryOnYou.updateConfig({
    position: 'bottom-center',
    panelSize: 'full-screen'
  });
}
</script>
```

## 🛍️ Integración por Plataforma

### Shopify

#### Método 1: Theme.liquid
```liquid
<!-- En theme.liquid, antes de </body> -->
<script src="https://cdn.tryonyou.app/embed.js"></script>
<script>
TryOnYou.init({
  partnerId: '{{ shop.permanent_domain | replace: ".myshopify.com", "" }}',
  theme: '{{ settings.tryonyou_theme | default: "light" }}',
  {% if product %}
  products: ['{{ product.id }}'],
  currentProduct: {
    id: '{{ product.id }}',
    name: '{{ product.title }}',
    price: '{{ product.price | money_without_currency }}',
    image: '{{ product.featured_image | img_url: "400x400" }}',
    brand: '{{ shop.name }}',
    variants: [
      {% for variant in product.variants %}
      {
        id: '{{ variant.id }}',
        size: '{{ variant.option1 }}',
        color: '{{ variant.option2 }}',
        available: {{ variant.available | json }}
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  }
  {% endif %}
});
</script>
```

#### Método 2: Snippet Reutilizable
Crear `snippets/tryonyou-embed.liquid`:

```liquid
{% comment %}
  TryOnYou Embed Snippet
  Uso: {% include 'tryonyou-embed' %}
{% endcomment %}

<script src="https://cdn.tryonyou.app/embed.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  TryOnYou.init({
    partnerId: '{{ shop.permanent_domain | replace: ".myshopify.com", "" }}',
    theme: '{{ settings.tryonyou_theme | default: "light" }}',
    apiKey: '{{ settings.tryonyou_api_key }}',
    currency: '{{ shop.currency }}',
    language: '{{ request.locale.iso_code }}'
  });

  // Integración con carrito de Shopify
  document.addEventListener('tryonyou:tryOnStarted', function(e) {
    // Tracking personalizado
    if (typeof gtag !== 'undefined') {
      gtag('event', 'try_on_started', {
        'product_id': e.detail.product.id,
        'shop_name': '{{ shop.name }}'
      });
    }
  });
});
</script>
```

### WooCommerce

#### Plugin Personalizado
Crear `wp-content/plugins/tryonyou-integration/tryonyou-integration.php`:

```php
<?php
/*
Plugin Name: TryOnYou Integration
Description: Integra TryOnYou SDK en WooCommerce
Version: 1.0.0
*/

class TryOnYouIntegration {
    
    public function __construct() {
        add_action('wp_footer', array($this, 'add_tryonyou_script'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    public function add_tryonyou_script() {
        if (is_product() || is_shop() || is_product_category()) {
            $partner_id = get_option('tryonyou_partner_id', '');
            $theme = get_option('tryonyou_theme', 'light');
            $api_key = get_option('tryonyou_api_key', '');
            
            if (empty($partner_id)) return;
            
            ?>
            <script src="https://cdn.tryonyou.app/embed.js"></script>
            <script>
            TryOnYou.init({
                partnerId: '<?php echo esc_js($partner_id); ?>',
                <?php if (!empty($api_key)): ?>
                apiKey: '<?php echo esc_js($api_key); ?>',
                <?php endif; ?>
                theme: '<?php echo esc_js($theme); ?>',
                currency: '<?php echo get_woocommerce_currency(); ?>',
                language: '<?php echo substr(get_locale(), 0, 2); ?>'
            });

            <?php if (is_product()): ?>
            // Producto específico
            <?php 
            global $product;
            $product_data = array(
                'id' => $product->get_id(),
                'name' => $product->get_name(),
                'price' => $product->get_price(),
                'image' => wp_get_attachment_image_url($product->get_image_id(), 'medium'),
                'brand' => get_bloginfo('name'),
                'category' => $product->get_categories()
            );
            ?>
            TryOnYou.setCurrentProduct(<?php echo json_encode($product_data); ?>);
            <?php endif; ?>
            </script>
            <?php
        }
    }
    
    public function add_admin_menu() {
        add_options_page(
            'TryOnYou Settings',
            'TryOnYou',
            'manage_options',
            'tryonyou-settings',
            array($this, 'settings_page')
        );
    }
    
    public function settings_page() {
        if (isset($_POST['submit'])) {
            update_option('tryonyou_partner_id', sanitize_text_field($_POST['partner_id']));
            update_option('tryonyou_api_key', sanitize_text_field($_POST['api_key']));
            update_option('tryonyou_theme', sanitize_text_field($_POST['theme']));
            echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
        }
        
        $partner_id = get_option('tryonyou_partner_id', '');
        $api_key = get_option('tryonyou_api_key', '');
        $theme = get_option('tryonyou_theme', 'light');
        ?>
        <div class="wrap">
            <h1>TryOnYou Settings</h1>
            <form method="post">
                <table class="form-table">
                    <tr>
                        <th scope="row">Partner ID</th>
                        <td><input type="text" name="partner_id" value="<?php echo esc_attr($partner_id); ?>" required /></td>
                    </tr>
                    <tr>
                        <th scope="row">API Key</th>
                        <td><input type="text" name="api_key" value="<?php echo esc_attr($api_key); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Theme</th>
                        <td>
                            <select name="theme">
                                <option value="light" <?php selected($theme, 'light'); ?>>Light</option>
                                <option value="dark" <?php selected($theme, 'dark'); ?>>Dark</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

new TryOnYouIntegration();
?>
```

### Magento 2

#### Módulo Personalizado
Crear `app/code/TryOnYou/Embed/etc/module.xml`:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="TryOnYou_Embed" setup_version="1.0.0"/>
</config>
```

Crear `app/code/TryOnYou/Embed/Block/Embed.php`:

```php
<?php
namespace TryOnYou\Embed\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\Registry;
use Magento\Store\Model\StoreManagerInterface;

class Embed extends Template
{
    protected $registry;
    protected $storeManager;
    
    public function __construct(
        Template\Context $context,
        Registry $registry,
        StoreManagerInterface $storeManager,
        array $data = []
    ) {
        $this->registry = $registry;
        $this->storeManager = $storeManager;
        parent::__construct($context, $data);
    }
    
    public function getPartnerId()
    {
        return $this->_scopeConfig->getValue('tryonyou/general/partner_id');
    }
    
    public function getApiKey()
    {
        return $this->_scopeConfig->getValue('tryonyou/general/api_key');
    }
    
    public function getTheme()
    {
        return $this->_scopeConfig->getValue('tryonyou/general/theme', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) ?: 'light';
    }
    
    public function getCurrentProduct()
    {
        $product = $this->registry->registry('current_product');
        if (!$product) return null;
        
        return [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'image' => $this->getProductImageUrl($product),
            'brand' => $this->storeManager->getStore()->getName()
        ];
    }
    
    private function getProductImageUrl($product)
    {
        return $this->storeManager->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA) . 
               'catalog/product' . $product->getImage();
    }
}
?>
```

Crear template `app/code/TryOnYou/Embed/view/frontend/templates/embed.phtml`:

```php
<?php if ($block->getPartnerId()): ?>
<script src="https://cdn.tryonyou.app/embed.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    TryOnYou.init({
        partnerId: '<?= $block->escapeJs($block->getPartnerId()) ?>',
        <?php if ($block->getApiKey()): ?>
        apiKey: '<?= $block->escapeJs($block->getApiKey()) ?>',
        <?php endif; ?>
        theme: '<?= $block->escapeJs($block->getTheme()) ?>',
        currency: '<?= $block->escapeJs($this->storeManager->getStore()->getCurrentCurrency()->getCode()) ?>',
        language: '<?= $block->escapeJs(substr($this->resolver->getLocale(), 0, 2)) ?>'
    });

    <?php if ($currentProduct = $block->getCurrentProduct()): ?>
    TryOnYou.setCurrentProduct(<?= $block->escapeJs(json_encode($currentProduct)) ?>);
    <?php endif; ?>
});
</script>
<?php endif; ?>
```

## 📱 Configuraciones Específicas

### Móvil First
```javascript
// Configuración optimizada para móviles
TryOnYou.init({
  partnerId: 'tu-marca',
  theme: 'light',
  responsive: {
    mobile: {
      position: 'bottom-center',
      panelSize: 'full-screen',
      triggerSize: '50px'
    },
    tablet: {
      position: 'bottom-right',
      panelSize: 'medium',
      triggerSize: '60px'
    },
    desktop: {
      position: 'bottom-right',
      panelSize: 'large',
      triggerSize: '70px'
    }
  }
});
```

### Multi-idioma
```javascript
const languages = {
  'es': {
    tryOn: 'Probar',
    createAvatar: 'Crear Avatar',
    loading: 'Cargando...'
  },
  'en': {
    tryOn: 'Try On',
    createAvatar: 'Create Avatar',
    loading: 'Loading...'
  },
  'fr': {
    tryOn: 'Essayer',
    createAvatar: 'Créer Avatar',
    loading: 'Chargement...'
  }
};

TryOnYou.init({
  partnerId: 'tu-marca',
  language: 'es',
  customTexts: languages[document.documentElement.lang || 'es']
});
```

### Configuración A/B Testing
```javascript
// Configuración para A/B testing
const variant = Math.random() < 0.5 ? 'A' : 'B';

TryOnYou.init({
  partnerId: 'tu-marca',
  theme: variant === 'A' ? 'light' : 'dark',
  position: variant === 'A' ? 'bottom-right' : 'bottom-left',
  abVariant: variant
});

// Tracking del experimento
document.addEventListener('tryonyou:initialized', (e) => {
  gtag('event', 'ab_test_variant', {
    'variant': variant,
    'experiment_id': 'tryonyou_position_test'
  });
});
```

## 🔧 Configuraciones Avanzadas

### Integración con Analytics Múltiples
```javascript
// Configuración para múltiples plataformas de analytics
TryOnYou.init({
  partnerId: 'tu-marca',
  analytics: {
    google: {
      enabled: true,
      trackingId: 'GA_TRACKING_ID'
    },
    facebook: {
      enabled: true,
      pixelId: 'FACEBOOK_PIXEL_ID'
    },
    adobe: {
      enabled: true,
      reportSuite: 'ADOBE_REPORT_SUITE'
    }
  }
});

// Event tracking personalizado
document.addEventListener('tryonyou:tryOnStarted', (e) => {
  const { product } = e.detail;
  
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'try_on_started', {
      currency: 'EUR',
      value: parseFloat(product.price),
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand,
        price: parseFloat(product.price)
      }]
    });
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'ViewContent', {
      content_ids: [product.id],
      content_type: 'product',
      content_name: product.name,
      value: parseFloat(product.price),
      currency: 'EUR'
    });
  }
  
  // Adobe Analytics
  if (typeof s !== 'undefined') {
    s.linkTrackVars = 'events,products';
    s.linkTrackEvents = 'event1';
    s.events = 'event1';
    s.products = `${product.category};${product.id};1;${product.price}`;
    s.tl(true, 'o', 'TryOnYou Virtual Try-On');
  }
});
```

### Configuración para Enterprise
```javascript
// Configuración enterprise con múltiples marcas
TryOnYou.init({
  partnerId: 'enterprise-group',
  brands: {
    'brand-a': {
      name: 'Marca A',
      colors: { primary: '#ff0000', secondary: '#ffffff' },
      logo: 'https://cdn.marca-a.com/logo.png'
    },
    'brand-b': {
      name: 'Marca B',
      colors: { primary: '#00ff00', secondary: '#000000' },
      logo: 'https://cdn.marca-b.com/logo.png'
    }
  },
  currentBrand: 'brand-a',
  features: {
    avatar3d: true,
    fitComparator: true,
    emotionalRecommender: true,
    biometricPayment: false  // Enterprise feature
  }
});
```

## 🚀 Optimización de Rendimiento

### Carga Diferida
```html
<!-- Carga diferida del SDK -->
<script>
// Cargar TryOnYou solo cuando sea necesario
function loadTryOnYou() {
  if (window.TryOnYou) return;
  
  const script = document.createElement('script');
  script.src = 'https://cdn.tryonyou.app/embed.js';
  script.onload = function() {
    TryOnYou.init({
      partnerId: 'tu-marca',
      theme: 'light'
    });
  };
  document.head.appendChild(script);
}

// Cargar en interacción del usuario o scroll
document.addEventListener('DOMContentLoaded', function() {
  let loaded = false;
  
  function loadOnInteraction() {
    if (!loaded) {
      loadTryOnYou();
      loaded = true;
    }
  }
  
  // Cargar en primer scroll o click
  window.addEventListener('scroll', loadOnInteraction, { once: true });
  document.addEventListener('click', loadOnInteraction, { once: true });
  
  // O cargar después de 3 segundos como fallback
  setTimeout(loadOnInteraction, 3000);
});
</script>
```

### Preconnect y Prefetch
```html
<!-- Optimización de recursos -->
<link rel="preconnect" href="https://cdn.tryonyou.app">
<link rel="preconnect" href="https://api.tryonyou.app">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- Prefetch del SDK para páginas de producto -->
<link rel="prefetch" href="https://cdn.tryonyou.app/embed.js">
<link rel="prefetch" href="https://cdn.tryonyou.app/embed.css">
```

Esta guía proporciona ejemplos completos de integración para los principales casos de uso y plataformas e-commerce.