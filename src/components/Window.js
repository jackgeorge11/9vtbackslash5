import React, { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../contexts/ColorContext";
import { Link } from "gatsby";
import BreadCrumbs from "./BreadCrumbs";

function Window({ children, className, scroller, crumbs }) {
  const { color } = useContext(ColorContext);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} className={className}/>
      <div
        className={`window ${className}`}
        style={{
          backgroundColor: color,
        }}
        ref={scroller}
      >
        {children}
      </div>
    </>
  );
}

export default Window;
