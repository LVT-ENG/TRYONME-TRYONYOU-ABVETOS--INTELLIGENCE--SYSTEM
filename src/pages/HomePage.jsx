import React from 'react';
import HeroSection from '../components/HeroSection';
import ClaimsCarousel from '../components/ClaimsCarousel';
import FashionGrid from '../components/FashionGrid';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main style={{ paddingTop: '60px' }}>
      <HeroSection />
      <ClaimsCarousel />
      <FashionGrid />
      <Footer />
    </main>
  );
}
