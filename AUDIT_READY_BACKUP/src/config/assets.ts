// === ASSETS CONFIGURATION ===

export const ASSETS = {
  images: {
    heroLanding: "/assets/images/hero-landing.png",
    scanningVisual: "/assets/images/scanning-visual.png",
    resultHeroBlazer: "/assets/images/result-hero-blazer.png",
    resultHeroDress: "/assets/images/result-hero-dress.png",
    logoTryonYou: "/assets/images/logo-tryonyou.png",
  },
  fallback: {
    hero: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
    scanning: "https://images.unsplash.com/photo-1558769132-cb1aea1f1f57?w=800",
    blazer: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
    dress: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
  }
};

export function getAssetUrl(key: keyof typeof ASSETS.images): string {
  return ASSETS.images[key] || ASSETS.fallback.hero;
}
