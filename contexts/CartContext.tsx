"use client";

import { useState, createContext, useEffect, ReactNode } from "react";
import { sleep } from "@/lib/utils";
import { MAX_QUANTITY, readStoredEntry } from "@/lib/cart";
import { mergeEntries } from "@/lib/checkout";
import type { CartEntry } from "@/lib/types";

interface CartContextType {
  cart: CartEntry[];
  addCartItem: (slug: string) => Promise<void>;
  removeCartItem: (slug: string) => Promise<void>;
  updateCartQuantity: (slug: string, quantity: number) => Promise<void>;
  mergeCartItems: (entries: CartEntry[]) => Promise<void>;
  setCartShipping: (slug: string, to: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartUpdating: boolean;
  setCartUpdating: (v: boolean) => void;
  cartReady: boolean;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addCartItem: async () => {},
  removeCartItem: async () => {},
  updateCartQuantity: async () => {},
  mergeCartItems: async () => {},
  setCartShipping: async () => {},
  clearCart: async () => {},
  cartTotal: 0,
  cartUpdating: false,
  setCartUpdating: () => {},
  cartReady: false,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartUpdating, setCartUpdating] = useState(false);
  // Until the stored cart has been read back, `cart` is empty because nothing
  // has loaded it yet, which is indistinguishable from an empty cart. Anything
  // that adds to what is already there — the Meta checkout import — has to wait
  // for this, or it merges into the wrong baseline and drops the real cart.
  const [cartReady, setCartReady] = useState(false);

  const cartTotal = cart.reduce((count, entry) => count + entry.quantity, 0);

  // Storage can be unavailable rather than merely empty — a webview with
  // cookies blocked, or private browsing at its quota — and it throws when it
  // is. Losing the cart on reload is a far better outcome than every click
  // rejecting, so the write is allowed to fail and the session carries on in
  // memory.
  const persist = (entries: CartEntry[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(entries));
    } catch {
      // nothing to recover: the in-memory cart is still correct
    }
  };

  const commit = async (entries: CartEntry[]) => {
    setCartUpdating(true);
    setCart(entries);
    persist(entries);
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

  // Adds several titles at once, summing against whatever is already in the
  // cart. `addCartItem` cannot be called in a loop to do this: each call reads
  // `cart` from the render it was created in, so every item after the first
  // would merge into a stale array and be lost on commit.
  const mergeCartItems = async (entries: CartEntry[]) => {
    if (!entries.length) return;
    await commit(mergeEntries(cart, entries));
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
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("cart");
    } catch {
      // storage is blocked; this visit starts from an empty cart
    }
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
      persist(entries);
      setCart(entries);
    }
    // Set last and unconditionally: anything waiting to merge into the stored
    // cart waits on this, and a reader that threw above would otherwise leave
    // the Meta checkout import stuck on its loading state forever.
    setCartReady(true);
    sleep(500).then(() => setCartUpdating(false));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        updateCartQuantity,
        mergeCartItems,
        setCartShipping,
        clearCart,
        cartTotal,
        cartUpdating,
        setCartUpdating,
        cartReady,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
