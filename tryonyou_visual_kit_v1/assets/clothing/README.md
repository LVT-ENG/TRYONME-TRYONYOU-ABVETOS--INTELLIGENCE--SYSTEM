# Clothing Assets

Este directorio contiene todos los assets de prendas para el sistema Try-On de TRYONYOU.

## Categorías de prendas

### Tops
- Camisas / Shirts
- Blusas / Blouses
- Camisetas / T-shirts
- Suéteres / Sweaters
- Blazers / Jackets

### Bottoms
- Pantalones / Pants
- Jeans
- Faldas / Skirts
- Shorts
- Leggings

### Dresses
- Vestidos casuales / Casual dresses
- Vestidos formales / Formal dresses
- Vestidos de noche / Evening dresses

### Outerwear
- Abrigos / Coats
- Chaquetas / Jackets
- Gabardinas / Trench coats

### Accesorios
- Cinturones / Belts
- Bufandas / Scarves
- Collares / Necklaces
- Bolsos / Bags

## Especificaciones de archivo

- **Formato**: PNG con transparencia (preferido) o JPG
- **Resolución**: 800x1200px mínimo
- **Fondo**: Transparente o blanco limpio (#FFFFFF)
- **Vista**: Frontal plana (flat lay) o en maniquí invisible
- **Iluminación**: Uniforme, profesional

## Nomenclatura

```
{gender}-{category}-{subcategory}-{brand}-{color}-{id}.png

Ejemplos:
- female-top-blouse-zara-white-001.png
- male-bottom-jeans-levis-blue-002.png
- unisex-outerwear-jacket-mango-black-003.png
```

## Organización por subcarpetas

```
clothing/
├── tops/
│   ├── blouses/
│   ├── shirts/
│   ├── tshirts/
│   └── sweaters/
├── bottoms/
│   ├── pants/
│   ├── jeans/
│   └── skirts/
├── dresses/
├── outerwear/
└── accessories/
```

## Reglas de presentación

✅ **Hacer:**
- Cada prenda con espacio propio
- Sin amontonamiento visual
- Scroll vertical para navegar
- Categorización clara
- Vista clara del producto

❌ **No hacer:**
- Amontonar prendas
- Recortar elementos importantes
- Fondos distractores
- Iluminación inconsistente

## Metadata recomendada

Cada prenda debe tener metadata asociada:

```json
{
  "id": "female-top-blouse-zara-white-001",
  "name": "Silk Blouse",
  "brand": "Zara",
  "category": "tops",
  "subcategory": "blouse",
  "color": "white",
  "price": 49.99,
  "sizes": ["XS", "S", "M", "L", "XL"],
  "material": "100% Silk",
  "occasion": ["work", "casual", "evening"]
}
```

## Ejemplo de uso

```jsx
<ClothingPanel>
  {clothingItems.map(item => (
    <ClothingItem
      key={item.id}
      image={`/assets/clothing/${item.category}/${item.id}.png`}
      name={item.name}
      brand={item.brand}
      price={item.price}
      onSelect={() => applyToModel(item)}
    />
  ))}
</ClothingPanel>
```
