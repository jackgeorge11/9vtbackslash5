"use client";

import { useState, createContext, useEffect, ReactNode } from "react";
import { sleep } from "@/lib/utils";
import type { CartItem, ShippingOption } from "@/lib/types";

// Carts persisted by the legacy Gatsby site stored each shipping option as a
// node with a JSON string at internal.content; the current shape is {to, cost}.
const normalizeShippingOption = (option: unknown): ShippingOption | null => {
  const o = option as Record<string, any>;
  if (typeof o?.to === "string" && typeof o?.cost === "number") {
    return { to: o.to, cost: o.cost };
  }
  const raw = o?.internal?.content ?? o?.fields?.content;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed?.to === "string" && typeof parsed?.cost === "number") {
        return { to: parsed.to, cost: parsed.cost };
      }
    } catch {
      return null;
    }
  }
  return null;
};

const sanitizeCart = (stored: unknown): CartItem[] => {
  if (!Array.isArray(stored)) return [];
  const cart: CartItem[] = [];
  for (const item of stored) {
    if (!item || typeof item.slug !== "string" || !Array.isArray(item.shipping))
      continue;
    const shipping = item.shipping.map(normalizeShippingOption);
    if (shipping.some((o: ShippingOption | null) => o === null)) continue;
    cart.push({ ...item, shipping });
  }
  return cart;
};

interface CartContextType {
  cart: CartItem[];
  addCartItems: (item: CartItem) => Promise<void>;
  removeCartItem: (slug: string) => Promise<void>;
  updateCartQuantity: (slug: string, quantity: number) => Promise<void>;
  cartTotal: number;
  cartUpdating: boolean;
  setCartUpdating: (v: boolean) => void;
  setCartShipping: (slug: string, option: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addCartItems: async () => {},
  removeCartItem: async () => {},
  updateCartQuantity: async () => {},
  cartTotal: 0,
  cartUpdating: false,
  setCartUpdating: () => {},
  setCartShipping: async () => {},
  clearCart: async () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartUpdating, setCartUpdating] = useState(false);

  const addCartItems = async (item: CartItem) => {
    setCartUpdating(true);
    setCartTotal((prev) => prev + 1);
    if (cart.some((i) => i.slug === item.slug)) {
      const idx = cart.findIndex((i) => i.slug === item.slug);
      if (cart[idx].quantity < cart[idx].maxQuantity - 1) {
        const newCart = cart.map((c, i) =>
          i === idx ? { ...c, quantity: c.quantity + 1 } : c
        );
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        await sleep(500);
        setCartUpdating(false);
      }
    } else {
      const newCart = [...cart, item];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      await sleep(500);
      setCartUpdating(false);
    }
  };

  const removeCartItem = async (slug: string) => {
    setCartUpdating(true);
    const idx = cart.findIndex((i) => i.slug === slug);
    const newTotal = cartTotal - cart[idx].quantity;
    setCartTotal(newTotal);
    const newCart = cart.filter((_, i) => i !== idx);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    await sleep(500);
    setCartUpdating(false);
  };

  const updateCartQuantity = async (slug: string, quantity: number) => {
    setCartUpdating(true);
    const idx = cart.findIndex((i) => i.slug === slug);
    const toAdd = cart[idx].quantity - quantity;
    setCartTotal((prev) => prev - toAdd);
    const newCart = cart.map((c, i) => (i === idx ? { ...c, quantity } : c));
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    await sleep(500);
    setCartUpdating(false);
  };

  const setCartShipping = async (slug: string, option: string) => {
    setCartUpdating(true);
    const newCart = cart.map((c) =>
      c.slug === slug ? { ...c, shippingOption: option } : c
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    await sleep(500);
    setCartUpdating(false);
  };

  const clearCart = async () => {
    setCartUpdating(true);
    setCartTotal(0);
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    await sleep(500);
    setCartUpdating(false);
  };

  useEffect(() => {
    setCartUpdating(true);
    const stored = localStorage?.getItem("cart");
    if (stored) {
      let localCart: CartItem[] = [];
      try {
        localCart = sanitizeCart(JSON.parse(stored));
      } catch {
        localCart = [];
      }
      localStorage.setItem("cart", JSON.stringify(localCart));
      setCart(localCart);
      setCartTotal(localCart.reduce((x, y) => x + y.quantity, 0));
    }
    sleep(500).then(() => setCartUpdating(false));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItems,
        removeCartItem,
        updateCartQuantity,
        cartTotal,
        cartUpdating,
        setCartUpdating,
        setCartShipping,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
