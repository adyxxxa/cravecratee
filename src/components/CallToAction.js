import React, { useState } from 'react';
import './CallToAction.css';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Email submitted:', email);
      setMessage('Thank you for subscribing! Check your email for a special discount code.');
      setEmail('');
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    }, 1000);
  };

  return (
    <section className="call-to-action" id="cta">
      <div className="cta-container">
        <h2 className="section-title">Ready To Satisfy Your Cravings?</h2>
        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="get-started-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Get Started'}
          </button>
        </form>
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
