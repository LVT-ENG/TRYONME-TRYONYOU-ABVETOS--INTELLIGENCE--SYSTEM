# Backgrounds Assets

Este directorio contiene todos los fondos para el sistema TRYONYOU.

## Tipos de fondos

### Fondos principales

1. **Clean White** - Fondo blanco puro
   - Color: #FFFFFF
   - Uso: Default para modelos y try-on

2. **Soft Gray** - Gris suave
   - Color: #F8F8F8
   - Uso: Alternativa elegante

3. **Editorial Gray** - Gris editorial
   - Color: #F5F5F5
   - Uso: Estilo revista de moda

### Fondos premium

4. **Gradient Soft** - Gradiente suave
   - Colores: #FFFFFF → #F0F0F0
   - Uso: Secciones premium

5. **Minimalist Pattern** - Pattern minimalista
   - Estilo: Textura muy sutil
   - Uso: Fondos de pantallas específicas

## Especificaciones

- **Formato**: JPG para fondos sólidos, PNG para patterns
- **Resolución**: 
  - Desktop: 1920x1080px mínimo
  - Mobile: 1080x1920px (vertical)
- **Peso**: < 200KB (optimizado)
- **Estilo**: Limpio, premium, editorial

## Nomenclatura

```
{type}-{color}-{resolution}.jpg

Ejemplos:
- clean-white-1920x1080.jpg
- soft-gray-1920x1080.jpg
- gradient-soft-1920x1080.jpg
```

## Reglas de diseño

✅ **Características correctas:**
- Limpio y no distractor
- Premium y elegante
- Sin texturas complejas
- Permite que el modelo sea protagonista
- Estilo editorial

❌ **Evitar:**
- Fondos con mucho ruido visual
- Colores fuertes o saturados
- Patterns complejos o distractores
- Gradientes bruscos
- Texturas pesadas

## Fondos responsive

### Desktop (horizontal)
- Ratio: 16:9
- Tamaño: 1920x1080px

### Tablet
- Ratio: 4:3 o 16:10
- Tamaño: 1024x768px o 1280x800px

### Mobile (vertical)
- Ratio: 9:16
- Tamaño: 1080x1920px

## Ejemplo de uso

```jsx
// Background dinámico según viewport
<div 
  className="tryonyou-background"
  style={{
    backgroundImage: `url('/assets/backgrounds/clean-white-1920x1080.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  <Model />
</div>
```

```css
/* CSS para backgrounds responsive */
.tryonyou-background {
  background-color: #FFFFFF;
  background-image: url('/assets/backgrounds/clean-white-1920x1080.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .tryonyou-background {
    background-image: url('/assets/backgrounds/clean-white-1080x1920.jpg');
  }
}
```

## Paleta de fondos recomendada

```css
/* Colores de fondo del sistema */
--bg-clean-white: #FFFFFF;
--bg-soft-gray: #F8F8F8;
--bg-editorial: #F5F5F5;
--bg-premium-light: #FAFAFA;
--bg-card: #FCFCFC;
```

## Performance

- Usar lazy loading para fondos
- Comprimir imágenes (optimización web)
- Considerar CSS puro para fondos simples
- Progressive JPEG para fondos complejos
