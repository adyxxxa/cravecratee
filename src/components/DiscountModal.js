import React, { useState } from 'react';
import './DiscountModal.css';

const DiscountModal = ({ isOpen, onClose, onApplyDiscount }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const validDiscountCodes = {
    'WELCOME10': { percentage: 10, description: '10% off your first order' },
    'SAVE15': { percentage: 15, description: '15% off orders over ₱500' },
    'CRATE20': { percentage: 20, description: '20% off orders over ₱1000' },
    'LOYAL25': { percentage: 25, description: '25% off for loyal customers' },
    'FREESHIP': { percentage: 0, description: 'Free shipping on any order', isShipping: true },
    'PINOY': { percentage: 12, description: '12% off for Filipino customers' },
    'BAKERY': { percentage: 18, description: '18% off bakery items' }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setMessage('Please enter a discount code');
      setMessageType('error');
      return;
    }

    setIsValidating(true);
    
    // Simulate API validation
    setTimeout(() => {
      const code = discountCode.toUpperCase();
      const discount = validDiscountCodes[code];
      
      if (discount) {
        setMessage(`Valid code! ${discount.description}`);
        setMessageType('success');
        onApplyDiscount(discount);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage('');
          setMessageType('');
          onClose();
        }, 2000);
      } else {
        setMessage('Invalid discount code. Please try again.');
        setMessageType('error');
      }
      
      setIsValidating(false);
    }, 1000);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="discount-modal-overlay" onClick={handleOverlayClick}>
      <div className="discount-modal-content">
        <div className="discount-modal-header">
          <h2>Apply Discount Code</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="discount-modal-body">
          <div className="discount-input-group">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-input"
              disabled={isValidating}
            />
            <button 
              className="apply-discount-btn"
              onClick={handleApplyDiscount}
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Apply'}
            </button>
          </div>

          {message && (
            <div className={`discount-message ${messageType}`}>
              {message}
            </div>
          )}

            <div className="available-codes">
            <h3>Available Discount Codes:</h3>
            <div className="codes-list">
              <div className="code-item">
                <span className="code">WELCOME10</span>
                <span className="description">10% off your first order</span>
              </div>
              <div className="code-item">
                <span className="code">SAVE15</span>
                <span className="description">15% off orders over ₱500</span>
              </div>
              <div className="code-item">
                <span className="code">CRATE20</span>
                <span className="description">20% off orders over ₱1000</span>
              </div>
              <div className="code-item">
                <span className="code">LOYAL25</span>
                <span className="description">25% off for loyal customers</span>
              </div>
              <div className="code-item">
                <span className="code">FREESHIP</span>
                <span className="description">Free shipping on any order</span>
              </div>
              <div className="code-item">
                <span className="code">PINOY</span>
                <span className="description">12% off for Filipino customers</span>
              </div>
              <div className="code-item">
                <span className="code">BAKERY</span>
                <span className="description">18% off bakery items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
