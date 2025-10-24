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
    <div className="modal-overlay bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="modal-content bg-white rounded-lg shadow-2xl">
        <div className="modal-header bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <h2 className="text-white">{category} Products</h2>
          <button className="close-button text-white hover:text-gray-200" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card fade-in hover:shadow-lg transition-shadow duration-300">
                <div className="product-image">
                  <img 
                    src={product.image || product.fallbackImage} 
                    alt={product.name}
                    className="product-photo"
                  />
                  <button 
                    className="wishlist-btn hover:bg-red-100 transition-colors duration-200"
                    onClick={() => addToWishlist(product)}
                    title="Add to wishlist"
                  >
                    💝
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name text-gray-900">{product.name}</h3>
                  <p className="product-description text-gray-600">{product.description}</p>
                  <div className="product-details">
                    <span className="product-price text-amber-600 font-bold">₱{product.price}</span>
                    <span className="product-rating text-gray-500">★ {product.rating}</span>
                  </div>
                  <button 
                    className="add-to-cart-btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-300 hover:scale-105"
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
