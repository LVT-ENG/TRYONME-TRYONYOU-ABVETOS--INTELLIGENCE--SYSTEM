#!/usr/bin/env python3
from pathlib import Path
from datetime import datetime
import json

ROOT = Path.cwd()
CURSOR = ROOT / ".cursor"
AGENTS = CURSOR / "agents"
RULES = CURSOR / "rules"
SPECS = CURSOR / "specs"
TASKS = CURSOR / "tasks"
TEMPLATES = ROOT / "templates"
DATA = ROOT / "data"

NOW = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def mkdir(p): p.mkdir(parents=True, exist_ok=True)
def write(p,c): mkdir(p.parent); p.write_text(c.strip()+"\n")
def write_json(p,d): mkdir(p.parent); p.write_text(json.dumps(d,indent=2,ensure_ascii=False))

for d in [CURSOR,AGENTS,RULES,SPECS,TASKS,TEMPLATES,DATA]: mkdir(d)

write(RULES/"strategy.md",f"""
# AGENTE 70 — V18 ORQUESTACIÓN
Generated: {NOW}

Flujo:
1 Medición cuerpo
2 Cotejo DB Lafayette
3 Top 5 referencias
4 Overlay vídeo
5 Mensaje FR premium
6 Reserva probador
7 Email único con QR + sugerencias

REGLA: No tallas visibles.
""")

write(SPECS/"v18_spec.md","""V18 SPEC sin tallas visibles.""")

write(TEMPLATES/"email_fr.html","""Email template V18 con QR y recomendaciones.""")

write(TASKS/"v18_tasks.md","""Backend / Frontend / Automation / Jules / Agent70 tasks.""")

write(CURSOR/"COMPOSER_MASTER_PROMPT.md","""
Lee rules, specs y tasks.
Implementa flujo V18 exacto.
No introducir tallas.
Orquestación total por agentes.
""")

write_json(DATA/"lafayette_seed.json",{
  "store":"Galeries Lafayette",
  "example_reference":"ARMANI-001"
})

print("V18 bootstrap complete.")
print("Open .cursor/COMPOSER_MASTER_PROMPT.md and paste into Composer.")
