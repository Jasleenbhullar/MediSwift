import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]); // For Orders screen

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.name === item.name);
      if (existing) {
        return prev.map(p => p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (item, delta) => {
    setCartItems(prev =>
      prev.map(p =>
        p.name === item.name
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const removeItem = (item) => {
    setCartItems(prev => prev.filter(p => p.name !== item.name));
  };

  const placeOrder = (order) => {
    setOrders(prev => [...prev, order]);
    clearCart();
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      clearCart,
      updateQuantity,
      removeItem,
      placeOrder,
      orders
    }}>
      {children}
    </CartContext.Provider>
  );
};
