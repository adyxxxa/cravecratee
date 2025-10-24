import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter subscription:', email);
      setMessage('Thank you for subscribing! You\'ll receive our weekly newsletter with exclusive offers and new product updates.');
      setMessageType('success');
      setEmail('');
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }, 1500);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Sweet with Our Newsletter</h2>
          <p className="newsletter-description">
            Get exclusive offers, new product announcements, and baking tips delivered to your inbox weekly.
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                disabled={isSubmitting}
                required
              />
              <button 
                type="submit" 
                className="newsletter-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>

          {message && (
            <div className={`newsletter-message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="newsletter-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🎁</span>
              <span>Exclusive discounts</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🆕</span>
              <span>New product alerts</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <span>Baking tips & recipes</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚚</span>
              <span>Free shipping offers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
