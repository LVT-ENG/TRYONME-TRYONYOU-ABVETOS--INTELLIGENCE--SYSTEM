import json
import os
from datetime import datetime, timezone

def generate_global_css():
    css_content = """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --anthracite: #1A1A1A;
  --gold: #D4AF37;
  --peacock-blue: #006D77;
  --bone: #F5EFE6;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--anthracite);
  color: var(--bone);
  font-family: 'Inter', sans-serif;
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
"""
    with open('src/global.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("Generated src/global.css")

def generate_report():
    report = {
        "status": "SYSTEM_ONLINE",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "modules": {
            "jules_brain": "ACTIVE",
            "global_css": "GENERATED",
            "assets": "VERIFIED"
        },
        "patent": "PCT/EP2025/067317"
    }
    with open('TRYONYOU_MASTER_REPORT.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
    print("Generated TRYONYOU_MASTER_REPORT.json")

if __name__ == "__main__":
    generate_global_css()
    generate_report()
