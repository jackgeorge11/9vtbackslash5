import React, { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../contexts/ColorContext";
import BreadCrumbs from "../components/BreadCrumbs";

function Window({ children, className, scroller, article, crumbs }) {
  const { color } = useContext(ColorContext);

  return article ? (
    <>
      <BreadCrumbs crumbs={crumbs} className={className} />
      <article
        className={`window ${className}`}
        style={{
          backgroundColor: color,
        }}
        ref={scroller}
      >
        {children}
      </article>
    </>
  ) : (
    <>
      <BreadCrumbs crumbs={crumbs} className={className} />
      <main
        className={`window ${className}`}
        style={{
          backgroundColor: color,
        }}
        ref={scroller}
      >
        {children}
      </main>{" "}
    </>
  );
}

export default Window;
