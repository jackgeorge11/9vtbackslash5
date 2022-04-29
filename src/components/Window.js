import React, { useContext, useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { ColorContext } from "../contexts/ColorContext";

function Window({ children, className }) {
  const { color } = useContext(ColorContext);

  const _window = useRef();
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    setHeight(`${_window?.current?.scrollHeight}px`);
    setWidth(`${_window?.current?.scrollWidth}px`);
  }, [_window, color]);

  useEffect(() => {
    function handleResize() {
      setHeight(`${_window?.current?.scrollHeight}px`);
      setWidth(`${_window?.current?.scrollWidth}px`);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`window ${className}`} ref={_window}>
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
