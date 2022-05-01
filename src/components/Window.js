import React, { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../contexts/ColorContext";

function Window({ children, className, scroller }) {
  const { color } = useContext(ColorContext);

  // const catalogue = useRef()

  // useEffect(() => {
  //   console.log(catalogue)

  // }, [])

  return (
    <div
      className={`window ${className}`}
      style={{
        backgroundColor: color,
      }}
      ref={scroller}
    >
      {children}
    </div>
  );
}

export default Window;
