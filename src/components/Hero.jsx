import React, { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="hero-container">
      <video
        ref={videoRef}
        className="hero-bg"
        autoPlay
        muted
        loop
        playsInline
        src="/hero-video.mp4"
      />
      <div className="hero-overlay">
        <img
          className="hero-logo"
          src="/logo.png"
          alt="TRYONYOU Logo"
        />
        <h1 className="hero-title">TRYONYOU – ABVETOS – REV.04</h1>
        <p className="hero-sub">🎞️ PixVerse Hero integrated successfully</p>
        <p className="hero-sub">🔗 https://tryonyou.app</p>
      </div>
    </div>
  );
}
