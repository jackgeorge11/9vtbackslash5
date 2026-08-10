"use client";

import { useState, createContext, useEffect, ReactNode } from "react";
import { sleep } from "@/lib/utils";
import { MAX_QUANTITY, readStoredEntry } from "@/lib/cart";
import type { CartEntry } from "@/lib/types";

interface CartContextType {
  cart: CartEntry[];
  addCartItem: (slug: string) => Promise<void>;
  removeCartItem: (slug: string) => Promise<void>;
  updateCartQuantity: (slug: string, quantity: number) => Promise<void>;
  setCartShipping: (slug: string, to: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartUpdating: boolean;
  setCartUpdating: (v: boolean) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addCartItem: async () => {},
  removeCartItem: async () => {},
  updateCartQuantity: async () => {},
  setCartShipping: async () => {},
  clearCart: async () => {},
  cartTotal: 0,
  cartUpdating: false,
  setCartUpdating: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartUpdating, setCartUpdating] = useState(false);

  const cartTotal = cart.reduce((count, entry) => count + entry.quantity, 0);

  const commit = async (entries: CartEntry[]) => {
    setCartUpdating(true);
    setCart(entries);
    localStorage.setItem("cart", JSON.stringify(entries));
    await sleep(500);
    setCartUpdating(false);
  };

  const addCartItem = async (slug: string) => {
    const existing = cart.find((entry) => entry.slug === slug);
    if (existing) {
      if (existing.quantity >= MAX_QUANTITY) return;
      await commit(
        cart.map((entry) =>
          entry.slug === slug
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      );
    } else {
      await commit([...cart, { slug, quantity: 1 }]);
    }
  };

  const removeCartItem = async (slug: string) => {
    await commit(cart.filter((entry) => entry.slug !== slug));
  };

  const updateCartQuantity = async (slug: string, quantity: number) => {
    if (quantity < 1) return removeCartItem(slug);
    await commit(
      cart.map((entry) =>
        entry.slug === slug
          ? { ...entry, quantity: Math.min(quantity, MAX_QUANTITY) }
          : entry
      )
    );
  };

  const setCartShipping = async (slug: string, to: string) => {
    await commit(
      cart.map((entry) =>
        entry.slug === slug ? { ...entry, shippingTo: to } : entry
      )
    );
  };

  const clearCart = async () => {
    await commit([]);
  };

  useEffect(() => {
    setCartUpdating(true);
    const stored = localStorage?.getItem("cart");
    if (stored) {
      let entries: CartEntry[] = [];
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          entries = parsed
            .map(readStoredEntry)
            .filter((entry): entry is CartEntry => entry !== null);
        }
      } catch {
        entries = [];
      }
      localStorage.setItem("cart", JSON.stringify(entries));
      setCart(entries);
    }
    sleep(500).then(() => setCartUpdating(false));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        updateCartQuantity,
        setCartShipping,
        clearCart,
        cartTotal,
        cartUpdating,
        setCartUpdating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
