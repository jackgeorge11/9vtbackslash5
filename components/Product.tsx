"use client";

import { useContext, useEffect, useRef, useState, ReactNode, RefObject } from "react";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ColorContext } from "@/contexts/ColorContext";
import BreadCrumbs from "@/components/BreadCrumbs";
import type { Crumb } from "@/lib/types";

// The large image a click on the cover opens, carrying its real dimensions so
// the optimiser is asked for sizes that exist rather than upscaling to a shape
// guessed from the cover.
export interface ZoomImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ProductProps {
  children: ReactNode;
  src: string;
  alt: string;
  zoom?: ZoomImage;
  scroller?: RefObject<HTMLElement | null>;
  crumbs?: Crumb[];
}

export default function Product({
  children,
  src,
  alt,
  zoom,
  scroller,
  crumbs,
}: ProductProps) {
  const { color } = useContext(ColorContext);
  const pathname = usePathname();

  const [zoomed, setZoomed] = useState(false);

  // Whether the `#zoom` entry in history is one we pushed, and so one we may
  // pop. A buyer who arrived on a shared `#zoom` link has no such entry behind
  // them, and going back would take them off the site entirely.
  const pushed = useRef(false);

  // The hash is still the source of truth, so a shared link opens zoomed and
  // Back leaves it. It cannot be the only source: the App Router changes a
  // hash-only URL through `history.pushState`, which fires no event at all.
  // Listening alone is what left the old link updating the address bar and
  // doing nothing until a history move finally emitted `hashchange`.
  useEffect(() => {
    const sync = () => {
      const open = window.location.hash === "#zoom";
      if (!open) pushed.current = false;
      setZoomed(open);
    };

    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const openZoom = () => {
    window.history.pushState(null, "", "#zoom");
    pushed.current = true;
    setZoomed(true);
  };

  const closeZoom = () => {
    // Popping our own entry keeps history clean, so Back from the details goes
    // wherever it went before the detour through zoom.
    if (pushed.current) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", pathname);
    setZoomed(false);
  };

  if (zoomed) {
    const image = zoom ?? { src, alt, width: 1200, height: 1600 };

    return (
      <div className="zoom" style={{ backgroundColor: color }}>
        {/* The photo closes the view it opened, which is where anyone who has
            finished looking at it already has their cursor. */}
        <a
          className="image"
          href={pathname}
          onClick={(event) => {
            event.preventDefault();
            closeZoom();
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            style={{ width: "100%", height: "auto" }}
          />
        </a>
        <div className="back">
          <h2>
            {/* A real href, so the link is navigable without JavaScript and
                reads as a link to anything inspecting the page. */}
            <a
              className="thick under pointer"
              href={pathname}
              onClick={(event) => {
                event.preventDefault();
                closeZoom();
              }}
            >
              click here
            </a>{" "}
            to go back to the details.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Layout page="catalogue">
      <main className="product">
        <a
          className="image image-desktop pointer"
          href="#zoom"
          onClick={(event) => {
            event.preventDefault();
            openZoom();
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={800}
            height={1000}
            style={{ width: "100%", height: "auto" }}
          />
        </a>
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
