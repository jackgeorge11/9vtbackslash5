"use client";

import { ReactNode } from "react";
import { ColorProvider } from "@/contexts/ColorContext";
import { CartProvider } from "@/contexts/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ColorProvider>
      <CartProvider>{children}</CartProvider>
    </ColorProvider>
  );
}
