# ADR-014: Unified Biometric Intelligence Engine (FastAPI + Gemini + Looker)

**Estado:** Propuesto  
**Fecha:** 2025-01-04  
**Deciders:** LVT-ENG / ABVETOS Core Team  
**Contexto:** Sistema TRYONME / TRYONYOU – ABVETOS Intelligence System  
**Issue relacionado:** LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1408

---

## Contexto

El sistema TRYONME / TRYONYOU requiere un motor central de inteligencia biométrica capaz de:
- Recibir datos de escaneo corporal desde el frontend
- Inferir métricas corporales y tallaje de forma flexible
- Persistir resultados para analítica y reporting
- Mantener desacoplamiento entre UI, IA y capa de datos

Hasta ahora, la lógica de inferencia y persistencia no estaba formalmente definida como un componente backend único, lo que dificultaba la evolución del sistema, la observabilidad y la escalabilidad.

---

## Decisión

Se define un backend unificado implementado como un único archivo Python con FastAPI, que actúa como:

**Motor Biométrico Central del sistema ABVETOS / Ultimatum**

Este backend:
- Expone un endpoint REST `/api/analyze`
- Utiliza Google AI Studio (Gemini) para inferencia biométrica
- Persiste resultados en Google Sheets, consumidos por Looker Studio
- Está diseñado para ser desplegado como servicio stateless (Cloud Run compatible)

```
[ Frontend (React / Next) ]
            |
            v
      POST /api/analyze
            |
            v
[ FastAPI – Biometric Engine ]
      |            |
      |            ├─ Google AI Studio (Gemini)
      |            |
      └────────────┴─ Google Sheets → Looker Studio
```

### Componentes clave

#### FastAPI
- Define contrato claro frontend ↔ backend
- Proporciona documentación automática (Swagger)

#### Gemini (Google AI Studio)
- Inferencia flexible de medidas y talla
- Permite evolución del modelo sin tocar frontend

#### Google Sheets
- Persistencia simple y transparente
- Fuente directa de datos para Looker Studio

#### Looker Studio
- Capa de analítica y reporting
- No recibe datos directamente; consume desde Sheets

---

## Contrato de API

### Endpoint

```
POST /api/analyze
```

### Input (ScanInput)

```json
{
  "session_id": "uuid",
  "gender": "male | female | null",
  "height_hint": 178
}
```

### Output (Metrics)

```json
{
  "altura": "178 cm",
  "hombros": "46 cm",
  "pecho": "98 cm",
  "cintura": "82 cm",
  "talla": "M"
}
```

---

## Justificación de la decisión

### Por qué FastAPI + archivo único
- Reduce fricción para adopción inicial
- Facilita revisión en issues / PRs
- Sirve como spec ejecutable
- Puede evolucionar a arquitectura modular sin romper contrato

### Por qué Gemini (AI Studio)
- Inferencia probabilística adecuada a datos incompletos
- Ajustable vía prompt (dominio moda / tallaje)
- Evita hardcodear reglas biométricas rígidas

### Por qué Google Sheets (fase inicial)
- Tiempo de integración mínimo
- Transparente para negocio y analítica
- Directamente compatible con Looker Studio

---

## Consecuencias

### Positivas
- Desacoplamiento claro entre UI, IA y datos
- Backend reutilizable por web, mobile o partners
- Base sólida para ABVETOS como motor de inteligencia
- Observabilidad y trazabilidad de resultados

### Negativas / Limitaciones
- Sheets no es óptimo para alta escala
- Inferencia dependiente de calidad del prompt
- Seguridad básica (sin auth avanzada en MVP)

---

## Evolución futura prevista

Este ADR no bloquea las siguientes evoluciones:
- Migración de Sheets → BigQuery
- Autenticación por usuario / sesión
- Versionado de prompts Gemini
- Modelos híbridos (Gemini + lógica propia)
- Generación de avatares 3D por talla
- Despliegue en Cloud Run / GKE

---

## Alternativas consideradas

### Lógica embebida en frontend

❌ Rechazada
- No escalable
- Sin trazabilidad
- No reutilizable

### Backend monolítico complejo desde inicio

❌ Rechazada
- Sobrecoste inicial
- Fricción para iterar UX

---

## Conclusión

Este ADR establece el núcleo técnico oficial del sistema ABVETOS a nivel backend.

El archivo `fastapi_biometric_engine.py` debe considerarse:
- Referencia canónica del motor biométrico
- Punto de partida para toda evolución futura
- Contrato estable entre experiencia de usuario e inteligencia del sistema

---

## Referencias

- Issue: LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1408
- Archivo: `fastapi_biometric_engine.py`
- Stack: FastAPI + Gemini + Google Sheets + Looker Studio
