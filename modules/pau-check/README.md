# PAU-CHECK v5

Módulo oficial de aprobación de avatares.
Incluye identidad (Bao), belleza (BeautyScan), dignidad (Royal Aesthetic).

## Funcionalidades principales

1. **Validación de identidad facial** mediante embeddings (mínima distancia permitida).
2. **Análisis de belleza realista**: piel, iluminación, maquillaje, con umbrales configurables.
3. **Evaluación de dignidad/estética**: "look realista y elegante", sin deformaciones, sin exageraciones.
4. **Salida estructurada**: decisión (approved / rejected), notas explicativas, firma "Aprobado por Pau" o "Rejected by Pau", y diagnóstico detallado.

## Tipo & Stack

- Código: TypeScript (tipado fuerte)
- Simulación de endpoints internos (embeddings, análisis de belleza, análisis de estética) con posibilidad de integrarlos luego con tu engine / IA (ej. Manus IA).

## Flujo de integración

1. El avatar se renderiza.
2. Se llama a pau-check.
3. Si resultado = approved → avatar pasa a producción / guardado / entrega.
4. Si rejected → devolver feedback al usuario / pedir nueva foto o ajustes.

## Estructura

```
/modules/pau-check
    ├── README.md
    ├── index.ts
    ├── types.ts
    ├── clients
    │     ├── baoClient.ts
    │     ├── beautyClient.ts
    │     └── dignityClient.ts
    └── utils
          ├── image.ts
          └── math.ts
```
