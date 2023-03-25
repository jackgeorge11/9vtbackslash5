import React, { useContext } from "react";
import { ColorContext } from "../contexts/ColorContext";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";

export default function IndexPage() {
  const { logoClick } = useContext(ColorContext);

  return (
    <Layout
      title="9VT\5"
      description="9VT\5, also 9vtbackslash5, is an independent publishing house and creative platform for artists, authors, and others. We love putting novel ideas into the world, from books to collections of art."
      page="home"
    >
      <div className="home-logo w-30 pointer" onClick={logoClick}>
        <StaticImage
          src="../assets/brand/logo.png"
          alt="logo"
          placeholder="none"
        />
      </div>
    </Layout>
  );
}
