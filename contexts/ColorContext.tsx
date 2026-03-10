"use client";

import { useState, createContext, ReactNode } from "react";
import { NAV_ITEMS } from "@/lib/constants";

interface ColorContextType {
  color: string;
  changeColor: () => void;
  arrangement: undefined;
  rearrange: () => void;
  logoClick: () => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export const ColorContext = createContext<ColorContextType>({
  color: "#FFFFFF",
  changeColor: () => {},
  arrangement: undefined,
  rearrange: () => {},
  logoClick: () => {},
  loading: false,
  setLoading: () => {},
});

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState("#FFFFFF");
  const [arrangement, setArrangement] = useState(undefined);

  const changeColor = () => {
    const c: number[] = [];
    for (let i = 0; i < 3; i++) {
      c.push(Math.floor(Math.random() * 255));
    }
    const values = `rgba(${c[0]}, ${c[1]}, ${c[2]}, .2)`
      .replace(/rgba?\(/, "")
      .replace(/\)/, "")
      .replace(/[\s+]/g, "")
      .split(",");
    const a = parseFloat(values[3] || "1"),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    setColor(
      "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2)
    );
  };

  const rearrange = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const placements = Object.keys(NAV_ITEMS).forEach(() => {
      Math.floor(Math.random() * height);
      Math.floor(Math.random() * width);
    });
    setArrangement(placements as undefined);
  };

  const logoClick = () => {
    changeColor();
    rearrange();
  };

  const [loading, setLoading] = useState(false);

  return (
    <ColorContext.Provider
      value={{
        color,
        changeColor,
        arrangement,
        rearrange,
        logoClick,
        loading,
        setLoading,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
