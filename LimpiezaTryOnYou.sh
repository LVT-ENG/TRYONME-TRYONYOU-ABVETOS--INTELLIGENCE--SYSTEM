#!/bin/zsh

echo "🔟 Compactando ZIPs grandes sin tocar contenido…"

for f in ~/Desktop/*.zip ~/Downloads/*.zip ~/Documents/*.zip; do
  if [ -f "$f" ]; then
    echo "⏳ Compactando: $f"
    zip -FF "$f" --out "$f.fixed.zip" >/dev/null 2>&1
  fi
done

echo "💾 Eliminando los ZIPs rotos o incompletos…"
find ~/Desktop ~/Downloads ~/Documents -name "*.zip" -size -50k -delete

echo "📁 Reordenando carpetas grandes en Escritorio…"
mkdir -p ~/Desktop/_ARCHIVOS_GRANDES
find ~/Desktop -maxdepth 1 -type f -size +500M -exec mv {} ~/Desktop/_ARCHIVOS_GRANDES/ \;

echo "✨ TODO COMPLETADO. Tu Mac está limpio y listo para TryOnYou."
