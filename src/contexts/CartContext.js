import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    if (!appliedDiscount) return 0;
    
    const subtotal = getSubtotal();
    
    if (appliedDiscount.isShipping) {
      return 0; // Free shipping discount
    }
    
    return (subtotal * appliedDiscount.percentage) / 100;
  };

  const getShippingCost = () => {
    if (appliedDiscount && appliedDiscount.isShipping) {
      return 0; // Free shipping
    }
    
    const subtotal = getSubtotal();
    return subtotal >= 2000 ? 0 : 150; // Free shipping over ₱2000
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discountAmount = getDiscountAmount();
    const shippingCost = getShippingCost();
    
    return subtotal - discountAmount + shippingCost;
  };

  const applyDiscount = (discount) => {
    setAppliedDiscount(discount);
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cartItems,
    isCartOpen,
    appliedDiscount,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartCount,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    applyDiscount,
    removeDiscount,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
