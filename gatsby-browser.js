import React from "react";
import { ColorProvider } from "./src/contexts/ColorContext";

export const wrapRootElement = ({ element }) => (
  <ColorProvider>{element}</ColorProvider>
);

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === "undefined") {
    await import("intersection-observer")
  }
}