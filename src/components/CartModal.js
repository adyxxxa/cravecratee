import React, { useState } from 'react';
import './CartModal.css';
import { useCart } from '../contexts/CartContext';
import DiscountModal from './DiscountModal';

const CartModal = ({ onNavigateToCheckout }) => {
  const { 
    cartItems, 
    isCartOpen, 
    appliedDiscount,
    updateQuantity, 
    removeFromCart, 
    closeCart,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    applyDiscount,
    removeDiscount
  } = useCart();

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  const handleCheckout = () => {
    closeCart();
    onNavigateToCheckout();
  };

  const handleApplyDiscount = (discount) => {
    applyDiscount(discount);
    setIsDiscountModalOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-modal-overlay" onClick={handleOverlayClick}>
        <div className="cart-modal-content">
          <div className="cart-modal-header">
            <h2>Shopping Cart</h2>
            <button className="close-button" onClick={closeCart}>
              ×
            </button>
          </div>
          
          <div className="cart-modal-body">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some delicious pastries to get started!</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="item-icon">{item.icon}</div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-price">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="item-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(index)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {appliedDiscount && (
                    <div className="summary-row discount">
                      <span>Discount ({appliedDiscount.percentage}%):</span>
                      <span>-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>{getShippingCost() === 0 ? 'Free' : `$${getShippingCost().toFixed(2)}`}</span>
                  </div>
                  
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="discount-section">
                  {appliedDiscount ? (
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
                  ) : (
                    <button 
                      className="apply-discount-btn"
                      onClick={() => setIsDiscountModalOpen(true)}
                    >
                      Apply Discount Code
                    </button>
                  )}
                </div>
                
                <div className="cart-actions">
                  <button className="continue-shopping-btn" onClick={closeCart}>
                    Continue Shopping
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        onApplyDiscount={handleApplyDiscount}
      />
    </>
  );
};

export default CartModal;
