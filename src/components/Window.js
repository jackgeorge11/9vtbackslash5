import React, { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../contexts/ColorContext";

function Window({ children, className, scroller, article }) {
  const { color } = useContext(ColorContext);

  return article ? (
    <article
      className={`window ${className}`}
      style={{
        backgroundColor: color,
      }}
      ref={scroller}
    >
      {children}
    </article>
  ) : (
    <main
      className={`window ${className}`}
      style={{
        backgroundColor: color,
      }}
      ref={scroller}
    >
      {children}
    </main>
  );
}

export default Window;
