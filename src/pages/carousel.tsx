import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  autoPlayInterval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  autoPlayInterval = 3000,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`carousel-container ${className}`}>
      <div className="carousel-wrapper">
        <button 
          className="carousel-button carousel-button-prev" 
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div className="carousel-content">
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
        </div>

        <button 
          className="carousel-button carousel-button-next" 
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
