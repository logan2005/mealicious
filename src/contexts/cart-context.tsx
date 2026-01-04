'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/types/product'

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  refreshCart: () => Promise<void>;
  mergeGuestCart: (token: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // --- Guest Cart Functions ---
  const getGuestCart = (): CartItem[] => {
    try {
      const cart = localStorage.getItem('guestCart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Failed to parse guest cart:", error);
      return [];
    }
  };

  const saveGuestCart = (cart: CartItem[]) => {
    localStorage.setItem('guestCart', JSON.stringify(cart));
    setCartItems(cart);
  };

  const clearGuestCart = () => {
    localStorage.removeItem('guestCart');
  }

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      clearGuestCart();
      return;
    }

    try {
      const response = await fetch('/api/cart/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        refreshCart();
      } else {
        toast({ title: "Error", description: "Failed to clear cart.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({ title: "Error", description: "Failed to clear cart.", variant: "destructive" });
    }
  };

  // --- API Functions ---
  const fetchUserCart = async (token: string) => {
    try {
      const response = await fetch('/api/cart', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) {
        const items = await response.json();
        setCartItems(items);
      } else if (response.status === 401) {
        // Handle expired or invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCartItems(getGuestCart());
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      setCartItems(getGuestCart()); // Fallback to guest cart
    }
  }

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      await fetchUserCart(token);
    } else {
      setCartItems(getGuestCart());
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);


  const addToCart = (product: Product, quantity: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const guestCart = getGuestCart();
      const existingItem = guestCart.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        guestCart.push({ id: product.id, productId: product.id, quantity, product });
      }
      saveGuestCart([...guestCart]);
      toast({ title: "Added to cart", description: `${product.name} has been added.` });
      return;
    }

    // Authenticated user logic
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId: product.id, quantity }),
    }).then(response => {
      if (response.ok) {
        refreshCart();
        toast({ title: "Added to cart", description: `${product.name} has been added.` });
      } else {
        toast({ title: "Error", description: "Failed to add item to cart.", variant: "destructive" });
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const updatedCart = getGuestCart().filter(item => item.id !== itemId);
      saveGuestCart(updatedCart);
      return;
    }

    fetch(`/api/cart/${itemId}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` } 
    }).then(response => {
        if(response.ok) {
            refreshCart();
        } else {
            toast({ title: "Error", description: "Failed to remove item.", variant: "destructive" });
        }
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const guestCart = getGuestCart();
      const itemToUpdate = guestCart.find(item => item.id === itemId);
      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
          saveGuestCart([...guestCart]);
        } else {
          const updatedCart = guestCart.filter(item => item.id !== itemId);
          saveGuestCart(updatedCart);
        }
      }
      return;
    }
    
    fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ quantity }),
    }).then(response => {
        if(response.ok) {
            refreshCart();
        } else {
            toast({ title: "Error", description: "Failed to update quantity.", variant: "destructive" });
        }
    });
  };

  const mergeGuestCart = async (token: string) => {
    console.log('Merging guest cart');
    const guestCart = getGuestCart();
    if (guestCart.length === 0) {
      await refreshCart();
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ guestCart }),
      });

      if (response.ok) {
        console.log('Guest cart merged successfully');
        clearGuestCart();
        await refreshCart();
      } else {
        console.error('Failed to merge guest cart:', response);
         // if merge fails, keep guest cart for next time
        toast({ title: "Could not merge carts", description: "Your items from this device will be merged next time you log in.", variant: "destructive" });
      }
    } catch (error) {
        console.error("Failed to merge guest cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, refreshCart, mergeGuestCart, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
