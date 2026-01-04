# ADR-014: Unified Biometric Intelligence Engine (FastAPI + Gemini + Looker)

**Estado**: Propuesto  
**Fecha**: 2025-01-XX  
**Deciders**: LVT-ENG / ABVETOS Core Team  
**Contexto**: Sistema TRYONME / TRYONYOU – ABVETOS Intelligence System  
**Issue relacionado**: [LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM#1408](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues/1408)

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

---

## Arquitectura

### Componentes Principales

```
┌─────────────────┐
│   Frontend      │
│  (React/Vite)   │
└────────┬────────┘
         │ POST /api/analyze
         │ { images, measurements }
         ▼
┌─────────────────────────┐
│  FastAPI Backend        │
│  unified_engine.py      │
│                         │
│  ┌──────────────────┐   │
│  │ Input Validation │   │
│  └────────┬─────────┘   │
│           │             │
│  ┌────────▼─────────┐   │
│  │ Gemini API Call  │   │
│  │ (Biometric LLM)  │   │
│  └────────┬─────────┘   │
│           │             │
│  ┌────────▼─────────┐   │
│  │ Response Parser  │   │
│  └────────┬─────────┘   │
│           │             │
│  ┌────────▼─────────┐   │
│  │ Sheets Persister │   │
│  └──────────────────┘   │
└─────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Google Sheets   │
│ (Data Store)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Looker Studio   │
│  (Analytics)    │
└─────────────────┘
```

### Flujo de Datos

1. **Input**: El frontend envía datos de escaneo (imágenes base64 o URLs, medidas previas opcionales)
2. **Procesamiento**: 
   - FastAPI valida el payload
   - Construye un prompt estructurado para Gemini
   - Gemini infiere: altura, peso, medidas corporales, talla recomendada
3. **Output**:
   - Respuesta JSON con métricas inferidas
   - Persistencia asíncrona en Google Sheets
   - Looker Studio consume los datos para dashboards

### Tecnologías

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| API Framework | FastAPI | Endpoints REST, validación con Pydantic |
| IA/Inferencia | Google Gemini (AI Studio) | Análisis biométrico multimodal |
| Persistencia | Google Sheets API | Base de datos simple para analítica |
| Reporting | Looker Studio | Dashboards y visualización |
| Deploy | Cloud Run / Railway | Servicio stateless, autoescalable |

---

## Consecuencias

### Positivas

✅ **Desacoplamiento**: El frontend no tiene lógica de IA ni acceso a credenciales  
✅ **Escalabilidad**: Cloud Run puede escalar horizontalmente según demanda  
✅ **Observabilidad**: Logs centralizados en un único servicio Python  
✅ **Flexibilidad**: Cambiar el modelo de IA no afecta al frontend  
✅ **Analytics**: Google Sheets + Looker permiten analítica sin base de datos compleja  

### Negativas

⚠️ **Dependencia de Gemini**: Si Google AI Studio falla, el sistema queda inoperativo  
⚠️ **Latencia**: Cada análisis requiere llamada a API externa (Gemini)  
⚠️ **Costo**: Uso de Gemini API puede escalar con volumen de usuarios  
⚠️ **Límites de Google Sheets**: No apto para alto volumen transaccional (>60 req/min)  

### Mitigaciones Propuestas

- **Caché local** de inferencias para usuarios recurrentes
- **Fallback a modelo local** si Gemini no está disponible (futuro)
- **Rate limiting** en FastAPI para proteger cuotas de API
- **Migración a BigQuery** si el volumen supera capacidad de Sheets

---

## Alternativas Consideradas

### Opción A: Frontend con IA embebida (Descartada)
- **Pros**: Sin latencia de red
- **Contras**: Expone credenciales de IA, dificulta actualización del modelo

### Opción B: Backend Node.js + TensorFlow.js (Descartada)
- **Pros**: JavaScript end-to-end
- **Contras**: Menor madurez en ML, dificulta integración con Gemini

### Opción C: Microservicios separados (Descartada)
- **Pros**: Separación de concerns extrema
- **Contras**: Overhead operacional innecesario para el volumen actual

---

## Implementación

### Archivo Principal: `unified_engine.py`

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = FastAPI()

# Configuración Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro-vision')

# Configuración Google Sheets
scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
client = gspread.authorize(creds)
sheet = client.open("TRYONYOU_Biometrics").sheet1

class BiometricInput(BaseModel):
    images: list[str]  # URLs o base64
    context: dict = {}  # Medidas previas opcionales

@app.post("/api/analyze")
async def analyze_biometrics(data: BiometricInput):
    # 1. Construir prompt para Gemini
    prompt = f"""
    Analiza estas imágenes corporales y proporciona:
    - Altura estimada (cm)
    - Peso estimado (kg)
    - Medidas: pecho, cintura, cadera (cm)
    - Talla recomendada: XS, S, M, L, XL
    Contexto adicional: {data.context}
    """
    
    # 2. Llamar a Gemini
    response = model.generate_content([prompt] + data.images)
    metrics = parse_gemini_response(response.text)
    
    # 3. Persistir en Sheets
    sheet.append_row([
        datetime.now().isoformat(),
        metrics["altura"],
        metrics["peso"],
        metrics["talla"],
        # ... más campos
    ])
    
    return metrics

def parse_gemini_response(text: str) -> dict:
    # Parsing estructurado de la respuesta de Gemini
    # (implementación específica según formato de salida)
    pass
```

### Deployment

```bash
# Dockerfile
FROM python:3.11-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY unified_engine.py .
COPY credentials.json .
CMD ["uvicorn", "unified_engine:app", "--host", "0.0.0.0", "--port", "8080"]
```

```bash
# Cloud Run deployment
gcloud run deploy tryonyou-engine \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

---

## Testing

### Test Unitario (FastAPI TestClient)
```python
from fastapi.testclient import TestClient
from unified_engine import app

client = TestClient(app)

def test_analyze_endpoint():
    response = client.post("/api/analyze", json={
        "images": ["https://example.com/body_scan.jpg"],
        "context": {"height_hint": 175}
    })
    assert response.status_code == 200
    assert "altura" in response.json()
```

### Test de Integración
- Mock de Gemini API para evitar costos en CI/CD
- Test de escritura en Google Sheets (sandbox sheet)

---

## Roadmap

### Fase 1 (Actual)
- ✅ Endpoint `/api/analyze` funcional
- ✅ Integración Gemini + Sheets
- ✅ Deploy en Cloud Run

### Fase 2 (Q1 2025)
- 🔲 Caché de inferencias con Redis
- 🔲 Webhook para notificaciones (nueva medida lista)
- 🔲 Soporte multi-idioma en respuestas

### Fase 3 (Q2 2025)
- 🔲 Modelo local de fallback (TensorFlow)
- 🔲 Migración a BigQuery para volumen alto
- 🔲 A/B testing de diferentes prompts de Gemini

---

## Referencias

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Google Sheets API Python](https://gspread.readthedocs.io/)
- [Looker Studio](https://lookerstudio.google.com/)
- Issue #1408: [Link](https://github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM/issues/1408)

---

## Aprobación

Este ADR debe ser aprobado por:
- [ ] Tech Lead (LVT-ENG)
- [ ] Product Owner (ABVETOS)
- [ ] Security Review (antes de deploy a producción)

---

**Fecha de revisión sugerida**: 2025-03-XX (trimestral)
