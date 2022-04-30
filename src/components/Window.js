import React, { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../contexts/ColorContext";

function Window({ children, className }) {
  const { color } = useContext(ColorContext);

  return (
    <div
      className={`window ${className}`}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
}

export default Window;
