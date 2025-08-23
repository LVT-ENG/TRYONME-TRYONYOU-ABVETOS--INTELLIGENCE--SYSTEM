#!/bin/bash
set -e

PROJECT_PATH="/Users/mac/Library/Mobile Documents/com~apple~CloudDocs/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM"
cd "$PROJECT_PATH"

echo "📥 Actualizando GitHub..."
git fetch origin
git pull origin main --rebase || true
git add .
git commit -m "update: Tryonme Tryonyou Fashion Intelligence System con diseño fashion" || true
git push origin main || git push origin main --force

echo "📦 Instalando dependencias..."
npm install || true

echo "🖌️ Creando App.jsx..."
cat <<'APP' > src/App.jsx
import React from "react";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen font-['Playfair_Display']">
      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-neutral-900">
        <img src="/images/fashion1.jpg" alt="Hero Look"
          className="h-4/5 object-cover rounded-xl shadow-2xl"/>
        <h1 className="mt-6 text-5xl md:text-7xl tracking-wide">TRYONYOU</h1>
        <p className="italic text-gray-400">The End of Returns</p>
      </section>

      {/* NEW COLLECTION */}
      <section className="py-20 px-6 bg-black">
        <h2 className="text-center text-3xl mb-12">New Collection</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <img src="/images/fashion2.jpg" alt="Yellow Dress" className="rounded-lg shadow-lg"/>
          <img src="/images/fashion3.jpg" alt="Black Gold" className="rounded-lg shadow-lg"/>
          <img src="/images/fashion4.jpg" alt="Green Luxury" className="rounded-lg shadow-lg"/>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-20 px-6 bg-neutral-900">
        <h2 className="text-center text-2xl mb-10">Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/fashion5.jpg" alt="Scarf 1" className="rounded-lg"/>
          <img src="/images/fashion6.jpg" alt="Scarf 2" className="rounded-lg"/>
          <img src="/images/fashion7.jpg" alt="Packaging" className="rounded-lg"/>
          <img src="/images/fashion8.jpg" alt="Accessory" className="rounded-lg"/>
        </div>
      </section>

      {/* RUNWAY */}
      <section className="py-20 px-6 bg-black space-y-10">
        <h2 className="text-center text-2xl mb-10">Runway</h2>
        <div className="space-y-10">
          <img src="/images/fashion9.jpg" alt="Runway Look 1" className="rounded-xl shadow-xl"/>
          <img src="/images/fashion10.jpg" alt="Runway Look 2" className="rounded-xl shadow-xl"/>
        </div>
      </section>

      {/* BRAND SIGNATURE */}
      <section className="py-20 text-center bg-neutral-900">
        <img src="/images/fashion11.jpg" alt="Signature" className="mx-auto rounded-xl shadow-xl"/>
        <h2 className="mt-6 text-3xl">Crafted with AI Elegance</h2>
        <p className="text-gray-400 mt-2">TRYONYOU Fashion Intelligence System</p>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-gray-700">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} TRYONYOU · All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
APP

echo "📄 Creando estilos base en src/index.css..."
cat <<'CSS' > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-black text-white;
  font-family: "Didot", "Playfair Display", serif;
  letter-spacing: 0.03em;
}
CSS

echo "📂 Preparando carpeta de imágenes..."
mkdir -p public/images
cat <<'README' > public/images/README.txt
Renombra tus fotos siguiendo este orden:
- fashion1.jpg  -> Hero principal
- fashion2.jpg  -> Vestido Amarillo
- fashion3.jpg  -> Negro/Dorado
- fashion4.jpg  -> Verde
- fashion5.jpg  -> Pañuelo 1
- fashion6.jpg  -> Pañuelo 2
- fashion7.jpg  -> Packaging
- fashion8.jpg  -> Accesorio
- fashion9.jpg  -> Runway Look 1
- fashion10.jpg -> Runway Look 2
- fashion11.jpg -> Signature final
README

echo "⚡ Desplegando en Vercel..."
npx vercel --prod --yes --token=$VERCEL_TOKEN --org $VERCEL_ORG_ID --project $VERCEL_PROJECT_ID

echo "✅ Deploy completado con diseño fashion"
