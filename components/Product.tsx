"use client";

import { useContext, useEffect, useState, ReactNode, RefObject } from "react";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import Image from "next/image";
import Link from "next/link";
import { ColorContext } from "@/contexts/ColorContext";
import BreadCrumbs from "@/components/BreadCrumbs";
import type { Crumb } from "@/lib/types";

interface ProductProps {
  children: ReactNode;
  src: string;
  alt: string;
  scroller?: RefObject<HTMLElement | null>;
  crumbs?: Crumb[];
}

export default function Product({
  children,
  src,
  alt,
  scroller,
  crumbs,
}: ProductProps) {
  const { color } = useContext(ColorContext);

  const [path, setPath] = useState<string | undefined>(undefined);
  const [hash, setHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPath(window.location.pathname);
    setHash(window.location.hash);

    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash) {
    return (
      <div className="zoom" style={{ backgroundColor: color }}>
        <div className="image">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1600}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="back">
          <h2>
            <Link className="thick under pointer" href={path!}>
              click here
            </Link>{" "}
            to go back to the details.
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <Layout page="catalogue">
        <main className="product">
          <Link
            className="image image-desktop pointer"
            href={`${path}#zoom`}
          >
            <Image
              src={src}
              alt={alt}
              width={800}
              height={1000}
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
          <div className="product-window-wrapper">
            <BreadCrumbs crumbs={crumbs} className="small" />
            <Window className="small" scroller={scroller} article={true}>
              {children}
            </Window>
          </div>
        </main>
      </Layout>
    );
  }
}
