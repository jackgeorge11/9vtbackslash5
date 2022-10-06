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
        localStorage.setItem("cart", JSON.stringify(_cart));
        await sleep(500);
        setCartUpdating(false);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cart.concat(item)));
      setCart((prev) => prev.concat(item));
      await sleep(500);
      setCartUpdating(false);
    }
  };

  const removeCartItem = async (slug) => {
    setCartUpdating(true);
    let _cart = cart;
    const idx = _cart.findIndex((i) => i.slug === slug);
    const newTotal = cartTotal - _cart[idx].quantity;
    setCartTotal(newTotal);
    _cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(_cart));
    setCart(_cart);
    await sleep(500);
    setCartUpdating(false);
  };

  const updateCartQuantity = async (slug, quantity) => {
    setCartUpdating(true);
    const idx = cart.findIndex((i) => i.slug === slug);
    const toAdd = cart[idx].quantity - quantity;
    setCartTotal((prev) => prev - toAdd);
    let _cart = cart;
    _cart[idx].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(_cart));
    setCart(_cart);
    await sleep(500);
    setCartUpdating(false);
  };

  const setCartShipping = async (slug, option) => {
    setCartUpdating(true);
    const idx = cart.findIndex((i) => i.slug === slug);
    let _cart = cart;
    _cart[idx].shippingOption = option;
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
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
    if (localStorage?.getItem("cart")) {
      const localCart = JSON.parse(localStorage?.getItem("cart"));
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
      {props.children}
    </CartContext.Provider>
  );
};
