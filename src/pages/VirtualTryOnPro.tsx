import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, RotateCw, Sparkles } from 'lucide-react';
import '../styles/virtual-tryon-pro.css';

interface Garment {
  id: string;
  name: string;
  category: string;
  image: string;
  fabricType: string;
  detailZone: 'chest' | 'waist' | 'shoulders' | 'full';
}

const HYPERREALISTIC_GARMENTS: Garment[] = [
  {
    id: '1',
    name: 'Premium White Blazer',
    category: 'Jackets',
    image: '/assets/garments/white-blazer-hyperrealistic.jpg',
    fabricType: 'Wool & Silk Blend',
    detailZone: 'shoulders',
  },
  {
    id: '2',
    name: 'Elegant Black Silk Dress',
    category: 'Dresses',
    image: '/assets/garments/black-dress-hyperrealistic.jpg',
    fabricType: 'Pure Silk',
    detailZone: 'waist',
  },
  {
    id: '3',
    name: 'Premium Blue Shirt',
    category: 'Shirts',
    image: '/assets/garments/blue-shirt-hyperrealistic.jpg',
    fabricType: 'Egyptian Cotton',
    detailZone: 'chest',
  },
  {
    id: '4',
    name: 'Tailored Beige Trousers',
    category: 'Pants',
    image: '/assets/garments/beige-pants-hyperrealistic.jpg',
    fabricType: 'Linen Blend',
    detailZone: 'waist',
  },
];

/**
 * VirtualTryOnPro Component
 * Professional Virtual Try-On Experience with Photorealistic Avatars
 * 
 * Features:
 * - Hyperrealistic garment images
 * - Photorealistic avatar (recognizable as the user, but enhanced)
 * - 360° rotation on platform when changing garments
 * - Automatic zoom to fabric details (silk texture)
 * - PAU assistant (bottom left, small)
 * - TRYONYOU logo (top right)
 * - Professional dark aesthetic
 */
export default function VirtualTryOnPro() {
  const [currentGarmentIndex, setCurrentGarmentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [showFabricDetail, setShowFabricDetail] = useState(false);

  const currentGarment = HYPERREALISTIC_GARMENTS[currentGarmentIndex];

  // Auto-rotation effect (360°)
  useEffect(() => {
    if (!isRotating) return;

    const rotationInterval = setInterval(() => {
      setRotation((prev) => {
        const newRotation = prev + 2; // 2 degrees per frame
        if (newRotation >= 360) {
          setIsRotating(false);
          return 0;
        }
        return newRotation;
      });
    }, 20); // Smooth rotation

    return () => clearInterval(rotationInterval);
  }, [isRotating]);

  // Auto-zoom to fabric details after rotation
  useEffect(() => {
    if (!isRotating && rotation === 0 && !isZoomed) {
      const zoomTimer = setTimeout(() => {
        setIsZoomed(true);
        setShowFabricDetail(true);
      }, 800);

      return () => clearTimeout(zoomTimer);
    }
  }, [isRotating, rotation, isZoomed]);

  const handleGarmentChange = (direction: 'next' | 'prev') => {
    setIsChanging(true);
    setIsZoomed(false);
    setShowFabricDetail(false);
    setRotation(0);

    // Elegant fade transition
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentGarmentIndex((prev) => (prev + 1) % HYPERREALISTIC_GARMENTS.length);
      } else {
        setCurrentGarmentIndex((prev) => 
          prev === 0 ? HYPERREALISTIC_GARMENTS.length - 1 : prev - 1
        );
      }

      setTimeout(() => {
        setIsChanging(false);
        // Start 360° rotation after garment change
        setTimeout(() => {
          setIsRotating(true);
        }, 400);
      }, 600); // Fade-in duration
    }, 600); // Fade-out duration
  };

  const getDetailZoomClass = () => {
    if (!isZoomed) return '';
    
    switch (currentGarment.detailZone) {
      case 'chest':
        return 'zoom-chest';
      case 'waist':
        return 'zoom-waist';
      case 'shoulders':
        return 'zoom-shoulders';
      default:
        return 'zoom-full';
    }
  };

  return (
    <div className="virtual-tryon-pro">
      {/* Logo - Top Right */}
      <div className="tryon-logo">
        <img src="/assets/tryonyou-logo.png" alt="TRYONYOU" />
      </div>

      {/* PAU Assistant - Bottom Left */}
      <div className="pau-assistant">
        <div className="pau-avatar">
          <img src="/assets/pau-assistant.png" alt="PAU" />
        </div>
        <div className="pau-bubble">
          <p>Hi! I'm PAU, your styling assistant</p>
        </div>
      </div>

      <div className="tryon-container">
        {/* Header */}
        <div className="tryon-header">
          <h1 className="tryon-title">Virtual Try-On Experience</h1>
          <p className="tryon-subtitle">
            See yourself in premium fashion with photorealistic precision
          </p>
        </div>

        {/* Main Stage */}
        <div className="tryon-stage">
          {/* Holographic Panels (like reference image) */}
          <div className="holographic-panel panel-left">
            <div className="panel-content">
              <h3>Personal Profile</h3>
              <div className="profile-item">
                <span className="label">Height:</span>
                <span className="value">5'8"</span>
              </div>
              <div className="profile-item">
                <span className="label">Size:</span>
                <span className="value">M</span>
              </div>
              <div className="profile-item">
                <span className="label">Style:</span>
                <span className="value">Elegant</span>
              </div>
            </div>
          </div>

          {/* Avatar Display with Rotating Platform */}
          <div className="avatar-stage">
            {/* Rotating Platform */}
            <div className="rotating-platform">
              <div className="platform-base"></div>
              <div className="platform-light"></div>
            </div>

            {/* Avatar Container */}
            <div 
              className={`
                avatar-container
                ${isChanging ? 'changing' : ''}
                ${isRotating ? 'rotating' : ''}
                ${getDetailZoomClass()}
              `}
              style={{
                transform: `rotateY(${rotation}deg)`,
              }}
            >
              {/* Photorealistic Avatar */}
              <div className="avatar-photorealistic">
                {/* Avatar Image (recognizable as user, but enhanced) */}
                <div className="avatar-image">
                  <div className="avatar-body">
                    {/* Garment Overlay */}
                    <img 
                      src={currentGarment.image} 
                      alt={currentGarment.name}
                      className="garment-image"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = 'https://placehold.co/600x800/111/D4AF37?text=Garment+Preview';
                      }}
                    />
                  </div>
                </div>

                {/* Recognition Badge */}
                <div className="recognition-badge">
                  <Sparkles className="icon" />
                  <span>Enhanced You</span>
                </div>
              </div>

              {/* Rotation Indicator */}
              {isRotating && (
                <div className="rotation-indicator">
                  <RotateCw className="icon rotating" />
                  <span>360° View</span>
                  <div className="progress-ring">
                    <svg width="60" height="60">
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        fill="none"
                        stroke="rgba(212, 175, 55, 0.3)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="2"
                        strokeDasharray={`${(rotation / 360) * 157} 157`}
                        transform="rotate(-90 30 30)"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Fabric Detail Zoom */}
              {showFabricDetail && (
                <div className="fabric-detail-overlay">
                  <div className="detail-magnifier">
                    <ZoomIn className="icon" />
                    <img 
                      src="/assets/textures/silk-texture-detail.jpg" 
                      alt="Fabric Detail"
                      className="fabric-texture"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/200x200/111/D4AF37?text=Texture';
                      }}
                    />
                    <div className="detail-label">
                      <span className="fabric-name">{currentGarment.fabricType}</span>
                      <span className="detail-text">Premium Quality</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Garment Info Panel */}
          <div className="holographic-panel panel-right">
            <div className="panel-content">
              <h3>{currentGarment.name}</h3>
              <div className="garment-details">
                <div className="detail-row">
                  <span className="label">Category:</span>
                  <span className="value">{currentGarment.category}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Fabric:</span>
                  <span className="value">{currentGarment.fabricType}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className="value status-available">Available</span>
                </div>
              </div>

              <div className="action-buttons">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRotating(true)}
                  disabled={isRotating || isChanging}
                  className="action-btn"
                >
                  <RotateCw className="icon" />
                  Rotate 360°
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsZoomed(!isZoomed);
                    setShowFabricDetail(!showFabricDetail);
                  }}
                  disabled={isRotating || isChanging}
                  className="action-btn"
                >
                  <ZoomIn className="icon" />
                  {isZoomed ? 'Full View' : 'Fabric Detail'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Garment Navigation */}
        <div className="tryon-navigation">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleGarmentChange('prev')}
            disabled={isChanging || isRotating}
            className="nav-button"
          >
            <ChevronLeft className="icon" />
            Previous
          </Button>

          <div className="navigation-indicator">
            {HYPERREALISTIC_GARMENTS.map((_, index) => (
              <div
                key={index}
                className={`indicator-dot ${index === currentGarmentIndex ? 'active' : ''}`}
                onClick={() => {
                  if (!isChanging && !isRotating) {
                    setCurrentGarmentIndex(index);
                    setIsRotating(true);
                  }
                }}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleGarmentChange('next')}
            disabled={isChanging || isRotating}
            className="nav-button"
          >
            Next
            <ChevronRight className="icon" />
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="feature-highlights">
          <div className="feature">
            <div className="feature-icon">✨</div>
            <div className="feature-text">
              <strong>Photorealistic Avatar</strong>
              <p>Recognizable as you, enhanced with professional styling</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <div className="feature-text">
              <strong>360° Platform Rotation</strong>
              <p>Automatic rotation when changing garments</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <div className="feature-text">
              <strong>Fabric Detail Zoom</strong>
              <p>Automatic magnification of silk and premium textures</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
