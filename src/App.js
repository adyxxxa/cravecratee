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
      </div>
    </CartProvider>
  );
}

export default App;
