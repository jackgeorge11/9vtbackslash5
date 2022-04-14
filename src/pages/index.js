import React, { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";

export default function IndexPage() {
  const { changeColor } = useContext(ColorContext);

  return (
    <Layout
      title="9VT\5"
      description="9VT\5 -- also 9vtbackslash5 -- is an independent publishing house and creative platform for artists, authors, and others."
      page="home"
    >
      <div className="home-logo w-30 pointer" onClick={changeColor}>
        <StaticImage src="../assets/brand/logo.png" />
      </div>
    </Layout>
  );
}
