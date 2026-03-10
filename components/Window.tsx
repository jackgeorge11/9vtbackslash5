"use client";

import { useContext, ReactNode, RefObject } from "react";
import { ColorContext } from "@/contexts/ColorContext";
import BreadCrumbs from "@/components/BreadCrumbs";
import type { Crumb } from "@/lib/types";

interface WindowProps {
  children: ReactNode;
  className?: string;
  scroller?: RefObject<HTMLElement | null>;
  article?: boolean;
  crumbs?: Crumb[];
}

export default function Window({
  children,
  className,
  scroller,
  article,
  crumbs,
}: WindowProps) {
  const { color } = useContext(ColorContext);

  return article ? (
    <>
      <BreadCrumbs crumbs={crumbs} className={className} />
      <article
        className={`window ${className}`}
        style={{ backgroundColor: color }}
        ref={scroller as RefObject<HTMLElement>}
      >
        {children}
      </article>
    </>
  ) : (
    <>
      <BreadCrumbs crumbs={crumbs} className={className} />
      <main
        className={`window ${className}`}
        style={{ backgroundColor: color }}
        ref={scroller as RefObject<HTMLElement>}
      >
        {children}
      </main>
    </>
  );
}
