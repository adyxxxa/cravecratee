import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The quality is absolutely incredible! Every bite is pure heaven.",
      author: "Sarah Jones",
      rating: 5
    },
    {
      quote: "Perfect for gifting. The packaging is so beautiful and the taste is amazing.",
      author: "Mike Chen",
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">
                {'★'.repeat(testimonial.rating)}
              </div>
              <blockquote className="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>
              <div className="testimonial-author">
                <span className="heart">♥</span>
                <span className="author-name">{testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
