#!/bin/zsh

set -e

rm -rf node_modules dist package-lock.json

npm install

npm run build

git add -A
git commit -m "TRYONYOU demo auto-deploy"
git push origin main

vercel link --project tryonyou --yes
vercel pull --yes
vercel build
vercel deploy --prebuilt --prod --yes
