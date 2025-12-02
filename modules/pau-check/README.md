# PAU-CHECK Module v4

> Director de aprobación de avatar (Pau) - Sistema de validación final para avatares mejorados.

## Descripción

El módulo PAU-CHECK es el último filtro de aprobación antes de que un avatar pase a producción. Garantiza que cada avatar:

- ✅ Mantiene la identidad del usuario (sin cambios de rasgos)
- ✅ Presenta embellecimiento profesional realista
- ✅ Conserva dignidad, elegancia y verdad
- ✅ No parece falso, exagerado o plástico
- ✅ Representa "la mejor versión del usuario"

## Instalación

```bash
# Si usas TypeScript, asegúrate de tener las dependencias necesarias
npm install typescript --save-dev
```

## Estructura del Módulo

```
modules/pau-check/
├── index.ts                 # Punto de entrada principal
├── types.ts                 # Definiciones de tipos TypeScript
├── clients/
│   ├── baoClient.ts         # Cliente de identidad (Bao)
│   ├── beautyClient.ts      # Cliente de análisis de belleza
│   └── dignityClient.ts     # Cliente de análisis de dignidad
├── utils/
│   ├── math.ts              # Utilidades matemáticas
│   └── image.ts             # Utilidades de imagen
├── pau_check_manifest.json  # Manifiesto del módulo
├── pau_check_rules.md       # Reglas y criterios
└── README.md                # Esta documentación
```

## Uso Básico

```typescript
import { runPauCheck } from "./modules/pau-check";

const result = await runPauCheck({
  avatarImage: imageBuffer, // Buffer o string base64
  baoIdentityData: {
    embedding: [0.2, 0.1, 0.33, ...], // Vector de identidad facial
    userId: "user-123"
  },
  styleData: { look: "royal_elegance" }
});

if (result.decision === "approved") {
  console.log("✅ Avatar aprobado por Pau");
  console.log(result.signature);
} else {
  console.log("❌ Avatar rechazado:", result.notes);
}
```

## Pipeline de Validación

1. **INPUT**: Avatar renderizado por Nano Render + Datos de Bao + Parámetros de Tendency
2. **VALIDACIONES**:
   - **Identidad**: Comparación de malla facial con Bao (tolerancia < 3%)
   - **Belleza**: Detección de piel/iluminación artificial
   - **Dignidad**: Evaluación de elegancia y coherencia de estilo
3. **DECISIÓN**: `approved` o `rejected` con diagnósticos detallados

## Configuración de Umbrales

```typescript
const result = await runPauCheck(input, {
  thresholds: {
    identityMaxDistance: 0.03,      // < 3% diferencia
    maxSkinSmoothingLevel: 0.7,     // 0 = nada, 1 = plástico
    maxMakeupIntensity: 0.8,        // 0 = nada, 1 = drag total
    minDignityScore: 0.7,           // 0 = payaso, 1 = retrato real
    minNaturalLightScore: 0.6       // 0 = loco, 1 = luz coherente
  }
});
```

## Integración con Express

```typescript
import express from "express";
import { runPauCheck } from "./modules/pau-check";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/api/pau-check", async (req, res) => {
  try {
    const { avatarImageBase64, baoIdentityData, styleData } = req.body;

    if (!avatarImageBase64 || !baoIdentityData) {
      return res.status(400).json({
        error: "avatarImageBase64 and baoIdentityData are required"
      });
    }

    const buffer = Buffer.from(avatarImageBase64, "base64");

    const result = await runPauCheck({
      avatarImage: buffer,
      baoIdentityData,
      styleData: styleData || {}
    });

    return res.json(result);
  } catch (err) {
    console.error("PAU-CHECK error:", err);
    return res.status(500).json({
      error: "Internal PAU-CHECK error"
    });
  }
});

app.listen(3000);
```

## El Equipo del Avatar Real

| Rol | Responsabilidad |
|-----|-----------------|
| 🧠 **Bao** | Guardián de identidad - protege el DNA facial |
| 🎨 **Tendency** | Director de estilo - define la línea editorial |
| 👑 **Peinador Real** | Estilista oficial - perfecciona el cabello |
| 💄 **Maquillador Real** | Especialista en belleza - embellece con elegancia |
| ✅ **Pau** | Director de aprobación - valida el resultado final |

## Resultado

Cuando el usuario crea su avatar:

1. Se hace la foto normal (sin presión)
2. Entra en la "Sala Real del Avatar"
3. Tendency define la línea
4. Bao protege la identidad
5. El Peinador Real y el Maquillador profesional trabajan
6. PAU-CHECK valida el resultado
7. Sale su yo mejorado, siempre reconocible, más guapo, más pulido

> **"¡Soy yo… pero en mi mejor día!"** — Ese es el objetivo emocional de oro.

## Licencia

Propiedad de TRYONYOU/TRYONME. Uso interno.
