import React, { useState, createContext } from "react";

export const ColorContext = createContext("FFFFFF");

export const ColorProvider = (props) => {
  const [color, setColor] = useState("FFFFFF");
  const [arrangement, setArrangement] = useState(undefined);

  const changeColor = () => {
    const letters = "0123456789ABCDEF";
    let color = [];
    for (let i = 0; i < 3; i++) {
      color.push(Math.floor(Math.random() * 255));
    }
    var values = `rgba(${color[0]}, ${color[1]}, ${color[2]}, .2)`
      .replace(/rgba?\(/, "")
      .replace(/\)/, "")
      .replace(/[\s+]/g, "")
      .split(",");
    var a = parseFloat(values[3] || 1),
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
