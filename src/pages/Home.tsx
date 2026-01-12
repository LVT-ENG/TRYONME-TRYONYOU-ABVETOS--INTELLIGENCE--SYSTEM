import React from 'react';
import Hero from '../components/Hero';
import PromoCarousel from '../components/PromoCarousel';
import ClientsCarousel from '../components/ClientsCarousel';
import promoGallery from '../data/promoGallery.json';
import clientsGallery from '../data/clientsGallery.json';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <PromoCarousel images={promoGallery.images} />
      <ClientsCarousel images={clientsGallery.images} />
    </div>
  );
};

export default Home;
