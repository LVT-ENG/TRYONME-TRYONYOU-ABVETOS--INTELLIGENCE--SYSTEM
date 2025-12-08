#!/bin/zsh

set -e

cd ~/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM

git fetch origin
git checkout origin/main -- package-lock.json package.json

rm -rf node_modules
npm install

npm run build

git add .
git commit -m "clean rebuild after lockfile reset"
git push origin main
