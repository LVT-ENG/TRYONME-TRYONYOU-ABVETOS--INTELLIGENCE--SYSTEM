#!/bin/zsh
set -e

echo "STEP 1: instalar dependencias"
npm install

echo "STEP 2: build"
npm run build

echo "STEP 3: inicializar git si hace falta"
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

echo "STEP 4: commit"
git add .
git commit -m "final demo stable" || true

echo "STEP 5: push y deploy"
if git remote | grep -q origin; then
  git push -u origin main
else
  echo "NO hay remote origin"
  echo "Añádelo con:"
  echo "git remote add origin https://github.com/TU_USUARIO/TU_REPO.git"
fi

npx vercel --prod

echo "TODO COMPLETADO"
