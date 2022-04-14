import { Link } from "gatsby";
import React, { useContext } from "react";
import Helmet from "react-helmet";
import { ColorContext } from "../contexts/ColorContext";
import "../styles/styles.scss";

export default function Layout({ children, title, description, page }) {
  const { color, changeColor } = useContext(ColorContext);

  const rearrange = () => {
    changeColor();
  };

  return (
    <div className="main">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <style type="text/css">{`html {background-color: ${color}}`}</style>
      </Helmet>
      <div className="nav left">
        <Link to={page === "catalogue" ? "/" : "/catalogue"} className="nav-a">
          {page === "catalogue" ? "home" : "catalogue"}
        </Link>
        <span className={false ? "backslashes hidden" : "backslashes"}>
          {" \\\\ "}
        </span>
        <Link
          to={page === "submissions" ? "/catalogue" : "/submissions"}
          className="nav-b"
        >
          {page === "submissions" ? "catalogue" : "submissions"}
        </Link>
      </div>
      <div className="nav right">
        <Link
          to={page === "about" ? "/submissions" : "/about"}
          className="nav-b"
        >
          {page === "about" ? "submissions" : "about"}
        </Link>
        <span className={false ? "backslashes hidden" : "backslashes"}>
          {" \\\\ "}
        </span>
        <Link
          to={page === "inquiries" ? "/about" : "/inquiries"}
          className="nav-b"
        >
          {page === "inquiries" ? "about" : "inquiries"}
        </Link>
      </div>
      {children}
    </div>
  );
}
