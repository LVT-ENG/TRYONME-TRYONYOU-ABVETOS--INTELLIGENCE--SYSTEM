#!/usr/bin/env python3
# TRYONYOU — VIDEO & SALES NARRATIVE GENERATOR
# Works in Jupyter Notebook or as a .py file

from datetime import datetime
from pathlib import Path

OUTPUT_DIR = Path("./TRYONYOU_OUTPUT")
OUTPUT_DIR.mkdir(exist_ok=True)

now = datetime.now().strftime("%Y-%m-%d")

video_script = f"""
# 🎬 TRYONYOU — EL SUPERHÉROE DE LA FASHION TECH
Fecha: {now}

## 1. 🦹 EL VILLANO — EL PURGATORIO DEL RETAIL

Estoy aquí otra vez.
Dos horas.
En la cola de devoluciones de Lafayette.
Plenas fiestas.
Bolsas, caras cansadas, montañas de ropa que volverán al almacén.

No es culpa mía.
Es una lotería.
El e-commerce falla en el 30–40% de los casos.
Esto genera frustración, residuos y CO₂.

**Imagen:** IMG_6175.png  
**Mensaje:** No hagas cola. No generes basura.

---

## 2. 📉 EL VILLANO — LA FATIGA DE DECISIÓN

Me pregunto:
¿De verdad voy a probarme 5, 10, 20 pantalones
para encontrar uno que me quede bien?

S, M, L.
Adivinar.
No saber.

El probador es caos.
El tiempo se va.
La confianza también.

**Visual:** Probadores desordenados / contraste caos vs orden.

---

## 3. 🦸 EL HÉROE — LA CERTEZA ABSOLUTA (TRYONYOU)

Pero… ¿y si no tuviera que adivinar?
¿Y si pudiera **saber** cuál es el mío?

No es magia.
Es ciencia.
Patente **PCT/EP2025/067317**.

Escaneo biométrico.
IA emocional.
Precisión del **99.7%**.

El sistema elimina 509 pantalones.
Y me muestra solo uno.
El mío.

**Imagen:** IMG_6168.png  
**Mensaje:** El piloto funciona. Hoy.

---

## 4. 🧞 EL AYUDANTE — PAU, MI DOBLE DIGITAL

"El que mal me queda…"
Eso se acabó.

PAU me conoce.
Sabe mis medidas.
Sabe cómo me siento hoy.

No es un algoritmo frío.
Es mi asistente personal.

**Imagen:** IMG_6206.png  
**Mensaje:** Elegancia. Tiempo ganado. Confianza.

---

## 5. 🛡️ EL ESCUDO — ABVET (ADIÓS A LA COLA)

No espero.
No pago en caja.
No devuelvo.

Iris.
Voz.
Listo.

Pago biométrico seguro.
Instantáneo.

**Imagen:** IMG_6155.jpeg  
**Mensaje:** Compra sin fricción.

---

## FRASE FINAL

Nadie quiere probarse 500 pantalones.
Todos quieren saber cuál es el suyo.

**TRYONYOU vende certeza.**
"""

pitch_script = f"""
# 💶 TRYONYOU — RESUMEN COMERCIAL

## MODELOS

1. SaaS mensual — tiendas medianas
2. Licencia anual — grandes grupos (uso ilimitado)
3. Piloto 30 días — devoluciones → cero

## PROMESA

• −30/40% devoluciones  
• +confianza cliente  
• −CO₂  
• +ventas netas  

## FRASE DE CIERRE

"Nadie quiere probarse 500 pantalones.
Todos quieren saber cuál es el suyo.
Nosotros vendemos esa certeza."
"""

# Save files
(video_path := OUTPUT_DIR / "TRYONYOU_VIDEO_SCRIPT.md").write_text(video_script, encoding="utf-8")
(pitch_path := OUTPUT_DIR / "TRYONYOU_PITCH.md").write_text(pitch_script, encoding="utf-8")

print("✅ TODO LISTO")
print(f"📄 Guion de vídeo: {video_path}")
print(f"📊 Pitch comercial: {pitch_path}")
