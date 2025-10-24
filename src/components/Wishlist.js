import React, { useState, useEffect } from 'react';
import './Wishlist.css';

const Wishlist = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = localStorage.getItem('craveCrateWishlist');
      if (savedWishlist) {
        try {
          const parsedWishlist = JSON.parse(savedWishlist);
          setWishlistItems(parsedWishlist);
          console.log('Loaded wishlist:', parsedWishlist);
        } catch (error) {
          console.error('Error parsing wishlist:', error);
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
    };

    loadWishlist();
    
    // Listen for storage changes (when items are added from other components)
    const handleStorageChange = () => {
      loadWishlist();
    };
    
    // Listen for custom wishlist update events
    const handleWishlistUpdate = () => {
      loadWishlist();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(loadWishlist, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      clearInterval(interval);
    };
  }, []);

  const saveWishlist = (items) => {
    setWishlistItems(items);
    localStorage.setItem('craveCrateWishlist', JSON.stringify(items));
    console.log('Saved wishlist:', items);
  };

  const removeFromWishlist = (productName) => {
    const updatedItems = wishlistItems.filter(item => item.name !== productName);
    saveWishlist(updatedItems);
    console.log('Removed from wishlist:', productName);
  };

  const addToCartFromWishlist = (product) => {
    // This would integrate with the cart context
    alert(`Added ${product.name} to cart from wishlist!`);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="wishlist-overlay" onClick={handleOverlayClick}>
      <div className="wishlist-content">
        <div className="wishlist-header">
          <h2>My Wishlist ({wishlistItems.length})</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="wishlist-body">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-wishlist-icon">💝</div>
              <h3>Your wishlist is empty</h3>
              <p>Add products to your wishlist to save them for later!</p>
            </div>
          ) : (
            <div className="wishlist-items">
              {wishlistItems.map((item, index) => (
                <div key={index} className="wishlist-item">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-description">{item.description}</p>
                    <div className="item-info">
                      <span className="item-price">${item.price}</span>
                      <span className="item-rating">★ {item.rating}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCartFromWishlist(item)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
