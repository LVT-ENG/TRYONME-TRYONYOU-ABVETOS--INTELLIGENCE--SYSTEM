import React from 'react';
import HeroSection from '../components/HeroSection';
import ClaimsCarousel from '../components/ClaimsCarousel';
import ModuleLinks from '../components/ModuleLinks';

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <ClaimsCarousel />
      <ModuleLinks />
    </div>
  );
}
