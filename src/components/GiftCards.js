import React, { useState } from 'react';
import './GiftCards.css';

const GiftCards = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  const [messageType, setMessageType] = useState('');

  const giftCardAmounts = [
    { amount: 500, display: '₱500', popular: false },
    { amount: 1000, display: '₱1,000', popular: true },
    { amount: 2000, display: '₱2,000', popular: false },
    { amount: 3000, display: '₱3,000', popular: false },
    { amount: 5000, display: '₱5,000', popular: true },
    { amount: 0, display: 'Custom Amount', popular: false }
  ];

  const features = [
    {
      icon: '📧',
      title: 'Instant Delivery',
      description: 'Digital gift cards delivered via email instantly'
    },
    {
      icon: '🎨',
      title: 'Custom Design',
      description: 'Beautiful, personalized gift card designs'
    },
    {
      icon: '⏰',
      title: 'Scheduled Delivery',
      description: 'Schedule delivery for special occasions'
    },
    {
      icon: '💳',
      title: 'Easy to Use',
      description: 'Simple redemption process at checkout'
    },
    {
      icon: '🔄',
      title: 'Flexible Spending',
      description: 'Use for any products on our website'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices'
    }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAmount || !recipientName || !recipientEmail || !senderName) {
      setMessageStatus('Please fill in all required fields');
      setMessageType('error');
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      console.log('Gift card purchase:', {
        amount: selectedAmount,
        recipientName,
        recipientEmail,
        senderName,
        message,
        deliveryDate
      });
      
      setMessageStatus('Gift card sent successfully! Check your email for confirmation.');
      setMessageType('success');
      setIsProcessing(false);
      
      // Clear form after 3 seconds
      setTimeout(() => {
        setMessageStatus('');
        setMessageType('');
        setSelectedAmount('');
        setRecipientName('');
        setRecipientEmail('');
        setSenderName('');
        setMessage('');
        setDeliveryDate('');
      }, 3000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="gift-cards-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="gift-cards-content">
        <div className="gift-cards-header">
          <h1>Digital Gift Cards</h1>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="gift-cards-body">
          {/* Features Section */}
          <div className="features-section">
            <h2>Why Choose Our Gift Cards?</h2>
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

          {/* Gift Card Purchase Form */}
          <div className="purchase-section">
            <h2>Purchase Gift Card</h2>
            <form onSubmit={handleSubmit} className="gift-card-form">
              {/* Amount Selection */}
              <div className="amount-section">
                <h3>Select Amount</h3>
                <div className="amount-grid">
                  {giftCardAmounts.map((card, index) => (
                    <div
                      key={index}
                      className={`amount-card ${selectedAmount === card.amount ? 'selected' : ''} ${card.popular ? 'popular' : ''}`}
                      onClick={() => handleAmountSelect(card.amount)}
                    >
                      {card.popular && <div className="popular-badge">Most Popular</div>}
                      <div className="amount-display">{card.display}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Information */}
              <div className="recipient-section">
                <h3>Recipient Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="recipientName">Recipient Name *</label>
                    <input
                      type="text"
                      id="recipientName"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipientEmail">Recipient Email *</label>
                    <input
                      type="email"
                      id="recipientEmail"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sender Information */}
              <div className="sender-section">
                <h3>Your Information</h3>
                <div className="form-group">
                  <label htmlFor="senderName">Your Name *</label>
                  <input
                    type="text"
                    id="senderName"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Personal Message */}
              <div className="message-section">
                <h3>Personal Message</h3>
                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    placeholder="Write a personal message for the recipient..."
                  />
                </div>
              </div>

              {/* Delivery Options */}
              <div className="delivery-section">
                <h3>Delivery Options</h3>
                <div className="form-group">
                  <label htmlFor="deliveryDate">Delivery Date (Optional)</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                  <small>Leave empty for immediate delivery</small>
                </div>
              </div>

              {/* Order Summary */}
              {selectedAmount > 0 && (
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-item">
                    <span>Gift Card Amount:</span>
                    <span>₱{selectedAmount.toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Processing Fee:</span>
                    <span>₱0</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total:</span>
                    <span>₱{selectedAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {messageStatus && (
                <div className={`form-message ${messageType}`}>
                  {messageStatus}
                </div>
              )}

              <button type="submit" className="purchase-btn" disabled={isProcessing || !selectedAmount}>
                {isProcessing ? 'Processing...' : `Purchase Gift Card - ₱${selectedAmount.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Terms and Conditions */}
          <div className="terms-section">
            <h3>Terms & Conditions</h3>
            <ul>
              <li>Gift cards are valid for 1 year from purchase date</li>
              <li>Gift cards cannot be redeemed for cash</li>
              <li>Gift cards can be used for any products on our website</li>
              <li>Unused balance remains on the gift card</li>
              <li>Gift cards are non-refundable</li>
              <li>Digital delivery only - no physical cards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
