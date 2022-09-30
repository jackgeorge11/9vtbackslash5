import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import Window from "./Window";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { ColorContext } from "../contexts/ColorContext";
import { Link } from "gatsby";
import BreadCrumbs from "./BreadCrumbs";

const isBrowser = typeof window !== "undefined";

export default function Product({
  children,
  src,
  alt,
  title,
  description,
  canonical,
  additional,
  scroller,
  crumbs,
}) {
  const { color } = useContext(ColorContext);

  const [path, setPath] = useState(undefined);
  const [hash, setHash] = useState(undefined);

  let _path = undefined;
  let _hash = undefined;

  if (isBrowser) {
    _path = window.location.pathname;
    _hash = window.location.hash;
  }

  useEffect(() => {
    setPath(_path);
    setHash(_hash);
  }, [_path, _hash]);

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
        canonical={canonical}
        additional={additional}
      >
        <main className="product">
          <Link className="image image-desktop pointer" to={`${path}#zoom`}>
            <GatsbyImage image={src} alt={alt} />
          </Link>
          <div className="product-window-wrapper">
            <BreadCrumbs crumbs={crumbs} className={"small"} />
            <Window className="small" scroller={scroller} article={true}>
              {children}
            </Window>
          </div>
        </main>
      </Layout>
    );
  }
}
