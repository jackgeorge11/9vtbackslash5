import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import Window from "./Window";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { ColorContext } from "../contexts/ColorContext";
import { Link } from "gatsby";
import BreadCrumbs from "./BreadCrumbs";

export default function Product({
  children,
  src,
  alt,
  title,
  description,
  additional,
  scroller,
  crumbs,
}) {
  const { color } = useContext(ColorContext);

  const [path, setPath] = useState(undefined);
  const [hash, setHash] = useState(undefined);

  useEffect(() => {
    setPath(window.location.pathname);
    setHash(window.location.hash);
  }, []);

  if (hash) {
    return (
      <div className="zoom" style={{ backgroundColor: color }}>
        <div className="image">
          <GatsbyImage image={src} alt={alt} />
        </div>
        <div className="back">
          <h2>
            <Link className="thick under pointer" to={path}>
              click here
            </Link>{" "}
            to go back to the details.
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <Layout
        page="catalogue"
        title={title}
        description={description}
        additional={additional}
      >
        <div className="product">
          <Link className="image image-desktop pointer" to={`${path}#zoom`}>
            <GatsbyImage image={src} alt={alt} />
          </Link>
          <div className="product-window-wrapper">
            <BreadCrumbs crumbs={crumbs} className={"small"} />
            <Window className="small" scroller={scroller}>
              {children}
            </Window>
          </div>
        </div>
      </Layout>
    );
  }
}
