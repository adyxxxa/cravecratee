import React from 'react';
import './WhyChoose.css';

const WhyChoose = () => {
  const features = [
    {
      icon: '🕐',
      title: 'Freshly Baked Daily',
      description: 'Made fresh every morning with premium ingredients'
    },
    {
      icon: '🎁',
      title: 'Gift-Ready Packaging',
      description: 'Beautiful Presentation for any occasion'
    },
    {
      icon: '📦',
      title: 'Curated Premium Boxes',
      description: 'Hand-Selected Treats'
    },
    {
      icon: '🚚',
      title: 'Nationwide Delivery',
      description: 'Fast delivery across all Philippine provinces'
    },
    {
      icon: '💰',
      title: 'Cash on Delivery',
      description: 'Pay when your order arrives - no online payment needed'
    },
    {
      icon: '🏠',
      title: 'Local Artisans',
      description: 'Supporting local bakers and craftsmanship'
    }
  ];

  return (
    <section className="why-choose" id="why-choose">
      <div className="why-choose-container">
        <h2 className="section-title">Why Choose Crave Crate?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
