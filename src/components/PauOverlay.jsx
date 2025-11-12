import React, { useState, useEffect } from 'react';
import '../styles/PauOverlay.css';

/**
 * PauOverlay Component
 * 
 * Displays the animated Pau character (peacock mascot) in the bottom-left corner.
 * Supports multiple animation states: idle, hover, celebration, etc.
 * 
 * @component
 */
const PauOverlay = ({ 
  visible = true, 
  animationState = 'idle',
  onInteraction = null 
}) => {
  const [currentAnimation, setCurrentAnimation] = useState(animationState);
  const [isHovered, setIsHovered] = useState(false);

  // Animation file mapping
  const animations = {
    idle: '/assets/pau/pau_idle.webm',
    hover: '/assets/pau/pau_hover.webm',
    celebration: '/assets/pau/pau_celebration.webm',
    thinking: '/assets/pau/pau_thinking.webm',
    waving: '/assets/pau/pau_waving.webm'
  };

  useEffect(() => {
    setCurrentAnimation(animationState);
  }, [animationState]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animations.hover) {
      setCurrentAnimation('hover');
    }
    if (onInteraction) {
      onInteraction('hover');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentAnimation('idle');
    if (onInteraction) {
      onInteraction('idle');
    }
  };

  const handleClick = () => {
    if (onInteraction) {
      onInteraction('click');
    }
    // Trigger celebration animation on click
    setCurrentAnimation('celebration');
    setTimeout(() => {
      setCurrentAnimation('idle');
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div 
      className="pau-overlay"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      aria-label="Pau - TRYONYOU Assistant"
      tabIndex={0}
    >
      <video
        className="pau-video"
        src={animations[currentAnimation] || animations.idle}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={animations[currentAnimation] || animations.idle} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {isHovered && (
        <div className="pau-tooltip">
          <p>Hi! I'm Pau, your fashion assistant 🦚</p>
        </div>
      )}
    </div>
  );
};

export default PauOverlay;
