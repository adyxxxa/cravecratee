import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleShopNow = () => {
    console.log('Shop Now clicked');
    // Navigate to shop/pastries section
    const element = document.getElementById('pastries');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewSubscription = () => {
    console.log('View Subscription clicked');
    // Navigate to subscription/CTA section
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <h1 className="hero-title">One crate to rule all cravings.</h1>
        <p className="hero-subtitle">Freshly baked, beautifully packaged. Delivered across the Philippines.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleShopNow}>SHOP NOW ></button>
          <button className="btn-secondary" onClick={handleViewSubscription}>VIEW SUBSCRIPTION</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
