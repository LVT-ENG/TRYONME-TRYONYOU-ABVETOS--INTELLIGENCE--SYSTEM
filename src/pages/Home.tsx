import React from 'react';
import { Header, Hero, Features, Contact, Footer } from '../components/LandingComponents';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E5E4E2]">
      <Header />
      <main>
        <Hero />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
