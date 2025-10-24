import React, { useState } from 'react';
import './CorporateGifts.css';

const CorporateGifts = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: '',
    quantity: '',
    budget: '',
    deliveryDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const corporatePackages = [
    {
      name: 'Executive Package',
      price: '₱2,500',
      items: ['Premium Pastry Selection', 'Custom Branded Packaging', 'Executive Gift Box', 'Personalized Message'],
      description: 'Perfect for executive gifts and VIP clients',
      icon: '👔'
    },
    {
      name: 'Team Package',
      price: '₱1,800',
      items: ['Assorted Pastries', 'Team Gift Box', 'Company Logo', 'Bulk Discount'],
      description: 'Ideal for team celebrations and employee recognition',
      icon: '👥'
    },
    {
      name: 'Event Package',
      price: '₱3,200',
      items: ['Large Pastry Selection', 'Event Branding', 'Delivery Setup', 'Event Coordination'],
      description: 'Perfect for corporate events and conferences',
      icon: '🎉'
    },
    {
      name: 'Custom Package',
      price: 'Quote',
      items: ['Fully Customizable', 'Any Quantity', 'Brand Integration', 'Flexible Options'],
      description: 'Tailored solutions for your specific needs',
      icon: '🎨'
    }
  ];

  const features = [
    {
      icon: '📦',
      title: 'Custom Branding',
      description: 'Add your company logo and colors to packaging'
    },
    {
      icon: '💰',
      title: 'Bulk Discounts',
      description: 'Special pricing for large orders (50+ items)'
    },
    {
      icon: '🚚',
      title: 'Scheduled Delivery',
      description: 'Coordinate delivery times for events'
    },
    {
      icon: '🎁',
      title: 'Gift Wrapping',
      description: 'Professional gift wrapping and presentation'
    },
    {
      icon: '📋',
      title: 'Order Management',
      description: 'Dedicated account manager for corporate clients'
    },
    {
      icon: '📄',
      title: 'Invoice & Receipts',
      description: 'Detailed invoices for accounting purposes'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Corporate gift inquiry submitted:', formData);
      setMessage('Thank you! We\'ll contact you within 24 hours to discuss your corporate gift needs.');
      setMessageType('success');
      setIsSubmitting(false);
      
      // Clear form after 3 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          eventType: '',
          quantity: '',
          budget: '',
          deliveryDate: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="corporate-gifts-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="corporate-gifts-content">
        <div className="corporate-gifts-header">
          <h1>Corporate Gifts & Events</h1>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="corporate-gifts-body">
          {/* Features Section */}
          <div className="features-section">
            <h2>Why Choose Our Corporate Services?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Packages Section */}
          <div className="packages-section">
            <h2>Corporate Packages</h2>
            <div className="packages-grid">
              {corporatePackages.map((pkg, index) => (
                <div key={index} className="package-card">
                  <div className="package-icon">{pkg.icon}</div>
                  <h3>{pkg.name}</h3>
                  <div className="package-price">{pkg.price}</div>
                  <p className="package-description">{pkg.description}</p>
                  <ul className="package-items">
                    {pkg.items.map((item, itemIndex) => (
                      <li key={itemIndex}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="inquiry-section">
            <h2>Request Corporate Quote</h2>
            <form onSubmit={handleSubmit} className="corporate-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person *</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventType">Event Type</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Event Type</option>
                    <option value="client-gift">Client Gift</option>
                    <option value="employee-recognition">Employee Recognition</option>
                    <option value="corporate-event">Corporate Event</option>
                    <option value="holiday-gift">Holiday Gift</option>
                    <option value="conference">Conference/Meeting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Estimated Quantity</label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Quantity</option>
                    <option value="10-25">10-25 items</option>
                    <option value="25-50">25-50 items</option>
                    <option value="50-100">50-100 items</option>
                    <option value="100-200">100-200 items</option>
                    <option value="200+">200+ items</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Budget Range</option>
                    <option value="under-5000">Under ₱5,000</option>
                    <option value="5000-10000">₱5,000 - ₱10,000</option>
                    <option value="10000-25000">₱10,000 - ₱25,000</option>
                    <option value="25000-50000">₱25,000 - ₱50,000</option>
                    <option value="50000+">₱50,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about your specific needs, branding requirements, or any special requests..."
                />
              </div>

              {message && (
                <div className={`form-message ${messageType}`}>
                  {message}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateGifts;
