#!/bin/bash

# 1. Acceder a la carpeta de despliegue rápido
# cd ~/Desktop/LAFAYETTE_PILOT_FINAL

# 2. Sincronizar con el contenido de la "Inbox" (Asegúrate de que los archivos estén ahí)
# Copiamos el cerebro y la lógica preparada de 'Play exprés'
# cp ~/Downloads/TRYONYOU_BRAIN_FINAL_20260125_113217.tar.gz .

# 3. Descomprimir e integrar el cerebro en el código activo
# tar -xzvf TRYONYOU_BRAIN_FINAL_20260125_113217.tar.gz --strip-components=1

# 4. Limpieza de seguridad para evitar archivos pesados accidentales
echo "node_modules\n.DS_Store\n*.tar.gz" > .vercelignore

# 5. LANZAMIENTO FINAL (Directo a Producción)
npx vercel --prod --force --yes
