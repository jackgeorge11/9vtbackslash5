import React from "react";
import { ColorProvider } from "./src/contexts/ColorContext";
import { CartProvider } from "./src/contexts/CartContext";

export const wrapRootElement = ({ element }) => (
  <ColorProvider>
    <CartProvider>{element}</CartProvider>
  </ColorProvider>
);

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === "undefined") {
    await import("intersection-observer");
  }
};
