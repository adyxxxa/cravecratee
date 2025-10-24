import React from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = ({ orderDetails, onBackToShop }) => {
  const { orderNumber, total, items, paymentMethod, customerInfo } = orderDetails;

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p className="order-number">Order #{orderNumber}</p>
        </div>

        <div className="confirmation-content">
          <div className="order-details">
            <h2>Order Details</h2>
            
            {/* Customer Information */}
            {customerInfo && (
              <div className="customer-info">
                <h3>Delivery Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{customerInfo.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{customerInfo.email}</span>
                  </div>
                  {customerInfo.phone && (
                    <div className="info-item">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{customerInfo.phone}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{customerInfo.address}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="payment-method-info">
              <h3>Payment Method</h3>
              <div className={`payment-method-badge ${paymentMethod}`}>
                {paymentMethod === 'cod' ? (
                  <>
                    <span className="payment-icon">💰</span>
                    <span>Cash on Delivery</span>
                  </>
                ) : (
                  <>
                    <span className="payment-icon">💳</span>
                    <span>Paid Online</span>
                  </>
                )}
              </div>
              {paymentMethod === 'cod' && (
                <p className="cod-instructions">
                  Please have exact change ready when our delivery person arrives.
                </p>
              )}
            </div>

            <div className="order-items">
              <h3>Items Ordered</h3>
              {items.map((item, index) => (
                <div key={index} className="confirmation-item">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
          </div>

          <div className="next-steps">
            <h2>What's Next?</h2>
            <div className="steps">
              <div className="step">
                <div className="step-icon">📧</div>
                <div className="step-content">
                  <h3>Order Confirmation</h3>
                  <p>You'll receive an email confirmation shortly</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-icon">👨‍🍳</div>
                <div className="step-content">
                  <h3>Preparation</h3>
                  <p>Our bakers are preparing your fresh pastries</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-icon">🚚</div>
                <div className="step-content">
                  <h3>Delivery</h3>
                  <p>Your order will be delivered within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="back-to-shop-btn" onClick={onBackToShop}>
              Continue Shopping
            </button>
            <button className="track-order-btn">
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
