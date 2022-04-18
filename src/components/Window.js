import React, { useContext, useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { ColorContext } from "../contexts/ColorContext";

function Window({ children, className }) {
  const { color } = useContext(ColorContext);

  const window = useRef();
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    setHeight(`${window?.current?.scrollHeight}px`);
    setWidth(`${window?.current?.scrollWidth}px`)
  }, [window, color]);

  return (
    <div className={`window ${className}`} ref={window}>
      <div
        className="window-bg"
        style={{
          backgroundColor: color,
          height: height ? height : "100%",
          width: width ? width : "100%",
        }}
      ></div>
      {/* <Helmet>
        <style type="text/css">{`.window::before { background-color: ${color}; height: ${height}}`}</style>
      </Helmet> */}
      {/* <div className="window-bg" style={{ backgroundColor: `${color}` }} /> */}
      {children}
    </div>
  );
}

export default Window;
