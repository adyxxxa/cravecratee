import React from 'react';
import './ProductModal.css';
import { useCart } from '../contexts/CartContext';

const ProductModal = ({ isOpen, onClose, category, products }) => {
  const { addToCart } = useCart();

  const addToWishlist = (product) => {
    try {
      console.log('Adding to wishlist:', product);
      const wishlist = JSON.parse(localStorage.getItem('craveCrateWishlist') || '[]');
      const isAlreadyInWishlist = wishlist.some(item => item.name === product.name);
      
      if (!isAlreadyInWishlist) {
        wishlist.push(product);
        localStorage.setItem('craveCrateWishlist', JSON.stringify(wishlist));
        console.log('Successfully added to wishlist:', product.name);
        alert(`Added ${product.name} to your wishlist! 💝`);
        
        // Trigger a custom event to notify other components
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
          detail: { action: 'add', product } 
        }));
      } else {
        console.log('Product already in wishlist:', product.name);
        alert(`${product.name} is already in your wishlist!`);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Error adding to wishlist. Please try again.');
    }
  };

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    addToCart(product);
    alert(`Added ${product.name} to cart!\nPrice: ₱${product.price}\nQuantity: 1`);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{category} Products</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card fade-in">
                <div className="product-image">
                  <img 
                    src={product.image || product.fallbackImage} 
                    alt={product.name}
                    className="product-photo"
                  />
                  <button 
                    className="wishlist-btn"
                    onClick={() => addToWishlist(product)}
                    title="Add to wishlist"
                  >
                    💝
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-details">
                    <span className="product-price">₱{product.price}</span>
                    <span className="product-rating">★ {product.rating}</span>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
