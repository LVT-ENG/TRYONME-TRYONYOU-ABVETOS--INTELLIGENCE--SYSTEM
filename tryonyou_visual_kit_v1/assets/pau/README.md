# Pau Assets

Este directorio contiene todos los assets relacionados con Pau, el asistente visual de TRYONYOU.

## Archivos requeridos

### Pau Principal
- `pau-white-official.png` - Versión blanca oficial de Pau
  - Formato: PNG con transparencia
  - Tamaño: 512x512px
  - Peso: < 100KB

### Variantes de estado

- `pau-inactive.png` - Pau en estado inactivo (70% opacidad)
- `pau-hover.png` - Pau en estado hover (con sutil animación)
- `pau-active.png` - Pau con notificación/mensaje nuevo
- `pau-speaking.png` - Pau cuando está dando recomendaciones

## Especificaciones

**Color**: Blanco (#FFFFFF) o tonos muy claros  
**Fondo**: Transparente (alpha channel)  
**Estilo**: Silueta de pavo real estilizada, minimalista  
**Tamaño de uso**: 120px - 200px (se escala del original 512px)

## Ejemplos de uso

```jsx
// React component
<img 
  src="/assets/pau/pau-white-official.png" 
  alt="Pau - Asistente TRYONYOU"
  className="w-32 h-32 opacity-70 hover:opacity-100 transition-opacity"
/>
```

## Notas importantes

- ✅ Siempre en esquina inferior
- ✅ Nunca encima de ropa o personas
- ✅ Tamaño pequeño y discreto
- ❌ Nunca protagonista
- ❌ Nunca en centro de pantalla
