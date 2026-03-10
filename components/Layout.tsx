"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, ReactNode } from "react";
import { CartContext } from "@/contexts/CartContext";
import { ColorContext } from "@/contexts/ColorContext";
import { NAV_ITEMS } from "@/lib/constants";

const slashes = " \\\\ ";

interface LayoutProps {
  children: ReactNode;
  page: string;
}

export default function Layout({ children, page }: LayoutProps) {
  const { cartTotal } = useContext(CartContext);
  const { color, logoClick } = useContext(ColorContext);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div className="main">
      <nav className="sm">
        {Object.values(NAV_ITEMS).map((a, i) =>
          i !== 5 || Boolean(cartTotal) ? (
            <span key={a.title}>
              <Link
                href={a.slug}
                className={`sm ${page === a.title ? "is--active" : ""}`}
              >
                {a.title}
              </Link>
              {(i < 4 || (i < 5 && Boolean(cartTotal))) && slashes}
            </span>
          ) : null
        )}
      </nav>
      <div className="footer">
        <p className="--muted">&copy; 2024 9VT\5</p>
        <p className="--muted">
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://instagram.com/9vtbackslash5"
          >
            instagram
          </a>
        </p>
        <p className="--muted">
          website by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://jackgeorge.xyz"
          >
            Jack George
          </a>
        </p>
      </div>
      {children}
      {page !== "home" ? (
        <>
          <div
            className="w-20 half-logo right pointer"
            onClick={logoClick}
            role="button"
          >
            <Image
              src="/brand/logo.png"
              alt="logo"
              width={200}
              height={200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div
            className="w-20 half-logo left pointer"
            onClick={logoClick}
            role="button"
          >
            <Image
              src="/brand/logo.png"
              alt="logo"
              width={200}
              height={200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
