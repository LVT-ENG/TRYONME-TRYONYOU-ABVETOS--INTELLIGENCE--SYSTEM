#!/bin/bash
set -e
echo "🧪 ABVET: comprobando estado de los dominios..."

for domain in "https://tryonyou.app" "https://abvetos.com"
do
  status=$(curl -o /dev/null -s -w "%{http_code}\n" $domain)
  if [ "$status" -eq 200 ]; then
    echo "✅ $domain está ONLINE (200 OK)"
  else
    echo "❌ $domain devolvió código $status"
  fi
done

echo "🏁 ABVET: test finalizado."
