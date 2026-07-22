import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../../../homeworks/ts1/3_write';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getQuantity: (productId: string) => number;
  getQuantityFromMap: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const getQuantity = (productId: string): number => {
    const item = cartItems.find((cartItem) => cartItem.product.id === productId);
    return item ? item.quantity : 0;
  };

  const quantityMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => map.set(item.product.id, item.quantity));
    return map;
  }, [cartItems]);

  const getQuantityFromMap = (productId: string): number => {
    return quantityMap.get(productId) ?? 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        getQuantity,
        getQuantityFromMap,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
