import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { CartContext } from "../contexts/CartContext";
import { ColorContext } from "../contexts/ColorContext";
import "../styles/styles.scss";

export const NAV_ITEMS = {
  home: { title: "home", slug: "/" },
  catalogue: { title: "catalogue", slug: "/catalogue" },
  submissions: { title: "submissions", slug: "/submissions" },
  about: { title: "about", slug: "/about" },
  inquiries: { title: "inquiries", slug: "/inquiries" },
  cart: { title: `cart`, slug: "/cart" },
};

const slashes = " \\\\ ";

export default function Layout({
  children,
  title,
  description,
  canonical,
  page,
  additional,
}) {
  const { cartTotal } = useContext(CartContext);
  const { color, arrangement, logoClick } = useContext(ColorContext);

  // const getNav = (slot) => {
  //   let navItems = {
  //     home: { title: "home", slug: "/" },
  //     catalogue: { title: "catalogue", slug: "/catalogue" },
  //     submissions: { title: "submissions", slug: "/submissions" },
  //     about: { title: "about", slug: "/about" },
  //     inquiries: { title: "inquiries", slug: "/inquiries" },
  //     cart: { title: `cart`, slug: "/cart" },
  //   };
  //   return navItems[slot];
  // };

  // const [arrangements, setArrangements] = useState(NAV_ITEMS);

  // useEffect(() => {
  //   if (arrangement) {
  //     setArrangements((prev) => {
  //       const items = { ...prev };
  //       arrangements.forEach(
  //         ({ key, top, left }) => (items[key] = { ...items[key], top, left })
  //       );
  //       return items;
  //     });
  //   }
  // }, [arrangement]);

  return (
    <div className="main">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={
            page === "home"
              ? "https://www.9vtbackslash5.com"
              : canonical
              ? `https://www.9vtbackslash5.com/${page}/${canonical}`
              : `https://www.9vtbackslash5.com/${page}`
          }
        />
        <style type="text/css">{`body {background-color: ${color}}`}</style>
        {additional &&
          additional.map((tag) => (
            <meta name={tag.name} content={tag.content} />
          ))}
      </Helmet>
      <nav className="sm">
        {Object.values(NAV_ITEMS).map(
          (a, i) =>
            (i !== 5 || Boolean(cartTotal)) && (
              <>
                <Link
                  to={a.slug}
                  style={a.top ? { top: a.top, left: a.left } : {}}
                  className={`sm ${page === a.title ? "is--active" : ""}`}
                  key={title}
                >
                  {a.title}
                </Link>
                {(i < 4 || (i < 5 && Boolean(cartTotal))) && slashes}
              </>
            )
        )}
      </nav>
      <div className="footer">
        <p className="--muted">© 2024 9VT\5</p>
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
            <StaticImage
              src="../assets/brand/logo.png"
              alt="logo"
              placeholder="none"
            />
          </div>
          <div
            className="w-20 half-logo left pointer"
            onClick={logoClick}
            role="button"
          >
            <StaticImage
              src="../assets/brand/logo.png"
              alt="logo"
              placeholder="none"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
