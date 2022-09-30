import React, { useState, createContext, useEffect } from "react";
import sleep from "../tools/Sleep";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartUpdating, setCartUpdating] = useState(false);

  const addCartItems = async (item) => {
    setCartUpdating(true);
    setCartTotal((prev) => prev + 1);
    if (cart.some((i) => i.slug === item.slug)) {
      const idx = cart.findIndex((i) => i.slug === item.slug);
      if (cart[idx].quantity < cart[idx].maxQuantity - 1) {
        let _cart = cart;
        _cart[idx].quantity += 1;
        setCart(_cart);
        await sleep(1000);
        setCartUpdating(false);
      }
    } else {
      setCart(cart.concat(item));
      await sleep(1000);
      setCartUpdating(false);
    }
  };

  const removeCartItem = async (slug) => {
    const idx = cart.findIndex((i) => i.slug === slug);
    setCartTotal((prev) => prev - cart[idx].quantity);
    let _cart = cart;
    _cart.splice(idx, 1);
    setCart(_cart);
  };

  const updateCartQuantity = async (slug, quantity) => {
    setCartUpdating(true);
    if (quantity) {
      const idx = cart.findIndex((i) => i.slug === slug);
      const toAdd = cart[idx].quantity - quantity;
      setCartTotal((prev) => prev - toAdd);
      let _cart = cart;
      _cart[idx].quantity = quantity;
      setCart(_cart);
    } else {
      removeCartItem(slug);
    }
    await sleep(1000);
    setCartUpdating(false);
  };

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
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
