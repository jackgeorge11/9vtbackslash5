import React, { useContext, useState } from "react";
import Layout from "./Layout";
import Window from "./Window";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { ColorContext } from "../contexts/ColorContext";

export default function Product({ children, src, alt, url }) {
  // const [closer, setCloser] = useState(false);
  const [zoom, setZoom] = useState(false);

  const { color } = useContext(ColorContext);

  if (zoom) {
    return (
      <div className="zoom" style={{ backgroundColor: color }}>
        <div className="image">
          <img src={url} alt={alt} />
        </div>
        <div className="back">
          <h2>
            <a className="thick under pointer" onClick={() => setZoom(false)}>
              click here
            </a>{" "}
            to go back to the details.
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <Layout page="catalogue">
        <div className="product">
          <div className="image pointer" onClick={() => setZoom(true)}>
            <GatsbyImage image={src} alt={alt} />
          </div>
          <Window className="small">{children}</Window>
        </div>
      </Layout>
    );
  }
}
