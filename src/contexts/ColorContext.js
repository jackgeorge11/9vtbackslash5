import React, { useState, createContext } from "react";

export const ColorContext = createContext("FFFFFF");

export const ColorProvider = (props) => {
  const [color, setColor] = useState("FFFFFF");
  const [arrangement, setArrangement] = useState(undefined);

  const changeColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setColor(color + "33");
  };

  const rearrange = () => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let placements = {
      a: {},
      b: {},
      c: {},
      d: {},
    };
    for (const [key] of Object.keys(placements)) {
      let top = Math.floor(Math.random() * height);
      let left = Math.floor(Math.random() * width);
      placements[key].top = top;
      placements[key].left = left;
    }
    setArrangement(placements);
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
      {props.children}
    </ColorContext.Provider>
  );
};
