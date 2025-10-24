import React, { useState, useEffect } from 'react';
import './Header.css';
import { useCart } from '../contexts/CartContext';
import Wishlist from './Wishlist';
import DiscountModal from './DiscountModal';

const Header = () => {
  const { getCartCount, openCart, applyDiscount } = useCart();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = localStorage.getItem('craveCrateWishlist');
      if (wishlist) {
        try {
          const parsedWishlist = JSON.parse(wishlist);
          setWishlistCount(parsedWishlist.length);
        } catch (error) {
          setWishlistCount(0);
        }
      } else {
        setWishlistCount(0);
      }
    };

    updateWishlistCount();
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      updateWishlistCount();
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('storage', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('storage', handleWishlistUpdate);
    };
  }, []);

  const handleNavigation = (section) => {
    console.log(`Navigating to ${section}`);
    // Scroll to section or navigate to page
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCartClick = () => {
    console.log('Cart clicked');
    openCart();
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked');
    setIsWishlistOpen(true);
  };

  const handleDiscountClick = () => {
    console.log('Discount button clicked');
    setIsDiscountModalOpen(true);
  };

  const handleApplyDiscount = (discount) => {
    applyDiscount(discount);
    setIsDiscountModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1 onClick={() => handleNavigation('hero')} style={{ cursor: 'pointer' }}>
              CRAVE CRATE
            </h1>
          </div>
          <nav className="navigation">
            <a href="#shop" onClick={(e) => { e.preventDefault(); handleNavigation('pastries'); }}>
              Shop
            </a>
            <a href="#subscription" onClick={(e) => { e.preventDefault(); handleNavigation('cta'); }}>
              Subscription
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('why-choose'); }}>
              About
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('footer'); }}>
              Contact
            </a>
          </nav>
          <div className="header-actions">
            <div className="wishlist-icon" onClick={handleWishlistClick}>
              💝 {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
            </div>
            <div className="cart-icon" onClick={handleCartClick}>
              🛒 {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
            </div>
            <button className="discount-button" onClick={handleDiscountClick}>
              Get 10% off your order 🇵🇭
            </button>
          </div>
        </div>
      </header>
      
      <Wishlist 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />
      
      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        onApplyDiscount={handleApplyDiscount}
      />
    </>
  );
};

export default Header;
