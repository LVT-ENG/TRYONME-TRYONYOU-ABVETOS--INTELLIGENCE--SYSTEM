import React from 'react';
import Carousel from './Carousel';

interface ClientsCarouselProps {
  images: string[];
}

const ClientsCarousel: React.FC<ClientsCarouselProps> = ({ images }) => {
  return (
    <section className="clients-carousel-section">
      <div className="container">
        <h2 className="section-title">Our Clients</h2>
        <p className="section-subtitle">
          Trusted by leading fashion brands worldwide
        </p>
        <Carousel 
          images={images} 
          autoPlayInterval={3500}
          className="clients-carousel"
        />
      </div>
    </section>
  );
};

export default ClientsCarousel;
