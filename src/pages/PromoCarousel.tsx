import React from 'react';
import Carousel from './Carousel';

interface PromoCarouselProps {
  images: string[];
}

const PromoCarousel: React.FC<PromoCarouselProps> = ({ images }) => {
  return (
    <section className="promo-carousel-section">
      <div className="container">
        <h2 className="section-title">Promotional Gallery</h2>
        <p className="section-subtitle">
          Explore our latest fashion intelligence solutions
        </p>
        <Carousel 
          images={images} 
          autoPlayInterval={4000}
          className="promo-carousel"
        />
      </div>
    </section>
  );
};

export default PromoCarousel;
