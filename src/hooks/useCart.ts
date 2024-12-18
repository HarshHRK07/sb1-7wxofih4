import { useState, useCallback } from 'react';
import type { CartItem } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((artworkId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.artworkId === artworkId);
      if (existingItem) {
        return prev.map(item =>
          item.artworkId === artworkId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { artworkId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((artworkId: string) => {
    setCartItems(prev => prev.filter(item => item.artworkId !== artworkId));
  }, []);

  return { cartItems, addToCart, removeFromCart };
}