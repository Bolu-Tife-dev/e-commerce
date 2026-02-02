'use client';

import { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const payload = action.payload;
      const existing = state.find((item) => item.id === payload.id);
      const addQty = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;
      if (existing) {
        return state.map((item) =>
          item.id === payload.id ? { ...item, quantity: item.quantity + addQty } : item
        );
      }
      return [...state, { ...payload, quantity: addQty }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const qty = Math.max(1, parseInt(quantity, 10) || 1);
      return state.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
    }
    case 'LOAD_CART':
      return Array.isArray(action.payload) ? action.payload : state;
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const initializer = () => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
  } catch (e) {
    return [];
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore localStorage write errors
    }
  }, [cart]);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };