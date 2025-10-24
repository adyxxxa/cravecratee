import React, { useState } from 'react';
import './App.css';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Pastries from './components/Pastries';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Newsletter from './components/Newsletter';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [orderDetails, setOrderDetails] = useState(null);

  const handleNavigateToCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleBackToCart = () => {
    setCurrentPage('home');
  };

  const handleOrderComplete = (details) => {
    setOrderDetails(details);
    setCurrentPage('confirmation');
  };

  const handleBackToShop = () => {
    setCurrentPage('home');
    setOrderDetails(null);
  };

  const handleFloatingShopClick = () => {
    if (currentPage === 'home') {
      // Scroll to shop section
      const element = document.getElementById('pastries');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate back to home and then scroll to shop
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById('pastries');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'checkout':
        return (
          <Checkout 
            onBackToCart={handleBackToCart}
            onOrderComplete={handleOrderComplete}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmation 
            orderDetails={orderDetails}
            onBackToShop={handleBackToShop}
          />
        );
      default:
        return (
          <>
            <Hero />
            <WhyChoose />
            <Pastries />
            <Testimonials />
            <CallToAction />
            <Newsletter />
            <FAQ />
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="App">
        <Header />
        {renderPage()}
        <Footer />
        <CartModal onNavigateToCheckout={handleNavigateToCheckout} />
        
        {/* Floating Action Button */}
        <button
          onClick={handleFloatingShopClick}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.backgroundColor = '#d97706';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = '#f59e0b';
          }}
          title="Go to Shop"
        >
          🛍️
        </button>
      </div>
    </CartProvider>
  );
}

export default App;
