#!/usr/bin/env bash
echo "🦚 TRYONYOU – ABVETOS FINAL DEPLOY"
git fetch --all
git reset --hard origin/main
git pull origin main
export VERCEL_ORG_ID=org_39QS518A6R2bz4Q9A39MR
export VERCEL_PROJECT_ID=prj_tryonyou_main_9Q5H6AE8RZ2bz4Q9A39MR
export VERCEL_TOKEN=tkn_3vTryonYouABVETOSLiveDeployMaster
npx vercel link --yes
npx vercel --prod --yes
echo "✅ Despliegue completado. Comprueba el enlace de producción en la salida de Vercel."
