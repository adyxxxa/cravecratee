import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from '../contexts/CartContext';

const Checkout = ({ onBackToCart, onOrderComplete }) => {
  const {
    cartItems,
    appliedDiscount,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    removeDiscount
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation (always required)
    const alwaysRequiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    
    alwaysRequiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Payment method specific validation
    if (paymentMethod === 'online') {
      const paymentRequiredFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
      
      paymentRequiredFields.forEach(field => {
        if (!formData[field].trim()) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      });
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Card validation (only if online payment)
    if (paymentMethod === 'online') {
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\D/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (formData.cvv && !/^\d{3}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid 3-digit CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      console.log('Order submitted:', {
        formData,
        cartItems,
        total: getTotal(),
        discount: appliedDiscount,
        paymentMethod
      });
      
      setIsProcessing(false);
      onOrderComplete({
        orderNumber: `CC-${Date.now()}`,
        total: getTotal(),
        items: cartItems,
        paymentMethod,
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
        }
      });
    }, 3000);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious pastries to get started!</p>
        <button className="back-to-shop-btn" onClick={onBackToCart}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBackToCart}>
          ← Back to Cart
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Shipping Information */}
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
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
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="online" className="payment-label">
                    <div className="payment-icon">💳</div>
                    <div className="payment-info">
                      <h3>Pay Online</h3>
                      <p>Secure payment with credit/debit card</p>
                    </div>
                  </label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod" className="payment-label">
                    <div className="payment-icon">💰</div>
                    <div className="payment-info">
                      <h3>Cash on Delivery</h3>
                      <p>Pay when your order arrives</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Information - Only show for online payment */}
            {paymentMethod === 'online' && (
              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card *</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'error' : ''}
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setFormData(prev => ({ ...prev, cardNumber: formatted }));
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        setFormData(prev => ({ ...prev, expiryDate: formatted }));
                      }}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="3"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Cash on Delivery Information */}
            {paymentMethod === 'cod' && (
              <div className="form-section cod-info">
                <h2>Cash on Delivery Details</h2>
                <div className="cod-notice">
                  <div className="cod-icon">💰</div>
                  <div className="cod-content">
                    <h3>Pay When Your Order Arrives</h3>
                    <p>You can pay with cash when our delivery person arrives with your order.</p>
                    <ul>
                      <li>✅ No online payment required</li>
                      <li>✅ Pay exact amount to delivery person</li>
                      <li>✅ Get receipt upon payment</li>
                      <li>✅ Safe and secure delivery across Philippines</li>
                      <li>✅ Available nationwide</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing 
                ? (paymentMethod === 'cod' ? 'Processing Order...' : 'Processing Payment...') 
                : `${paymentMethod === 'cod' ? 'Place Order (COD)' : 'Pay & Place Order'} - $${getTotal().toFixed(2)}`
              }
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              
              {appliedDiscount && (
                <div className="total-row discount">
                  <span>Discount ({appliedDiscount.percentage}%):</span>
                  <span>-${getDiscountAmount().toFixed(2)}</span>
                </div>
              )}
              
              <div className="total-row">
                <span>Shipping:</span>
                <span>{getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}</span>
              </div>
              
              <div className="total-row final-total">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            {appliedDiscount && (
              <div className="applied-discount">
                <span className="discount-info">
                  ✅ {appliedDiscount.description}
                </span>
                <button 
                  className="remove-discount-btn"
                  onClick={removeDiscount}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
