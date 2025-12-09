# Shoes Assets

Este directorio contiene todos los assets de calzado para el sistema Try-On de TRYONYOU.

## Categorías de zapatos

### Mujer
- Tacones / High heels
- Zapatos planos / Flats
- Botas / Boots
- Zapatillas deportivas / Sneakers
- Sandalias / Sandals

### Hombre
- Zapatos formales / Dress shoes
- Zapatos casuales / Casual shoes
- Botas / Boots
- Zapatillas deportivas / Sneakers
- Sandalias / Sandals

## Especificaciones de archivo

- **Formato**: JPG o PNG (PNG si requiere transparencia)
- **Resolución**: 600x600px mínimo
- **Fondo**: Blanco limpio (#FFFFFF) o transparente
- **Vista**: 3/4 frontal (mostrando forma y detalle)
- **Iluminación**: Uniforme, sin sombras duras

## Nomenclatura

```
{gender}-{category}-{brand}-{color}.jpg

Ejemplos:
- female-heels-louboutin-red.jpg
- male-sneakers-nike-white.jpg
- female-boots-zara-black.jpg
```

## Reglas importantes

⚠️ **CRÍTICO**: Los zapatos SIEMPRE deben ser visibles en el modelo
- Nunca recortar los pies del modelo
- Los zapatos son parte esencial de la experiencia Try-On
- Cada outfit debe incluir calzado apropiado

## Ejemplo de uso

```jsx
<ClothingItem
  type="shoes"
  image="/assets/shoes/female-heels-louboutin-red.jpg"
  name="Red Heels"
  brand="Louboutin"
  price="$795"
/>
```
