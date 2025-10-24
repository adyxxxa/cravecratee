import React, { useState } from 'react';
import './Footer.css';
import CorporateGifts from './CorporateGifts';
import GiftCards from './GiftCards';

const Footer = () => {
  const [isCorporateGiftsOpen, setIsCorporateGiftsOpen] = useState(false);
  const [isGiftCardsOpen, setIsGiftCardsOpen] = useState(false);

  const handleLinkClick = (linkType, linkName) => {
    console.log(`${linkType} link clicked: ${linkName}`);
    
    switch (linkName) {
      case 'All Products':
        // Navigate to products section
        const pastriesElement = document.getElementById('pastries');
        if (pastriesElement) {
          pastriesElement.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'Subscriptions':
        // Navigate to CTA section
        const ctaElement = document.getElementById('cta');
        if (ctaElement) {
          ctaElement.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'Gift Cards':
        setIsGiftCardsOpen(true);
        break;
      case 'Corporate Gifts':
        setIsCorporateGiftsOpen(true);
        break;
      case 'FAQ':
        // Navigate to FAQ section
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'Contact Us':
        alert('Contact Us page would open here!\n\nContact methods:\n- Email: hello@cravecrate.ph\n- Phone: +63 2 8123-CRAVE\n- Viber: +63 917-CRAVE-1\n- Live chat support\n- Contact form');
        break;
      case 'Shipping Info':
        alert('Shipping Information:\n\n- Free shipping on orders over ₱2000\n- Same-day delivery in Metro Manila\n- 2-3 business days nationwide\n- Cash on delivery available\n- Tracking provided for all orders');
        break;
      case 'Returns':
        alert('Returns Policy:\n\n- 30-day return window\n- Free return shipping\n- Full refund or exchange\n- Contact support to initiate return');
        break;
      default:
        alert(`${linkName} page would open here!`);
    }
  };

  return (
    <>
      <footer className="footer" id="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>CRAVE CRATE 🇵🇭</h3>
            <p>Delivering happiness across the Philippines, One Crate At a Time</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><a href="#all-products" onClick={(e) => { e.preventDefault(); handleLinkClick('Shop', 'All Products'); }}>All Products</a></li>
                <li><a href="#subscriptions" onClick={(e) => { e.preventDefault(); handleLinkClick('Shop', 'Subscriptions'); }}>Subscriptions</a></li>
                <li><a href="#gift-cards" onClick={(e) => { e.preventDefault(); handleLinkClick('Shop', 'Gift Cards'); }}>Gift Cards</a></li>
                <li><a href="#corporate-gifts" onClick={(e) => { e.preventDefault(); handleLinkClick('Shop', 'Corporate Gifts'); }}>Corporate Gifts</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); handleLinkClick('Support', 'FAQ'); }}>FAQ</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('Support', 'Contact Us'); }}>Contact Us</a></li>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); handleLinkClick('Support', 'Shipping Info'); }}>Shipping Info</a></li>
                <li><a href="#returns" onClick={(e) => { e.preventDefault(); handleLinkClick('Support', 'Returns'); }}>Returns</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <CorporateGifts 
        isOpen={isCorporateGiftsOpen} 
        onClose={() => setIsCorporateGiftsOpen(false)} 
      />
      
      <GiftCards 
        isOpen={isGiftCardsOpen} 
        onClose={() => setIsGiftCardsOpen(false)} 
      />
    </>
  );
};

export default Footer;
