import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { CartContext } from "../contexts/CartContext";
import { ColorContext } from "../contexts/ColorContext";
import "../styles/styles.scss";

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

  const getNav = (page, slot) => {
    let navItems = [
      { title: "home", slug: "/" },
      { title: "catalogue", slug: "/catalogue" },
      { title: "submissions", slug: "/submissions" },
      { title: "about", slug: "/about" },
      { title: "inquiries", slug: "/inquiries" },
      { title: "cart", slug: "/cart" },
    ];
    // if (page === "catalogue") {
    //   navItems = [
    //     { title: "home", slug: "/" },
    //     { title: "submissions", slug: "/submissions" },
    //     { title: "about", slug: "/about" },
    //     { title: "inquiries", slug: "/inquiries" },
    //   ];
    // } else if (page === "submissions") {
    //   navItems = [
    //     { title: "home", slug: "/" },
    //     { title: "catalogue", slug: "/catalogue" },
    //     { title: "about", slug: "/about" },
    //     { title: "inquiries", slug: "/inquiries" },
    //   ];
    // } else if (page === "about") {
    //   navItems = [
    //     { title: "home", slug: "/" },
    //     { title: "catalogue", slug: "/catalogue" },
    //     { title: "submissions", slug: "/submissions" },
    //     { title: "inquiries", slug: "/inquiries" },
    //   ];
    // } else if (page === "inquiries") {
    //   navItems = [
    //     { title: "home", slug: "/" },
    //     { title: "catalogue", slug: "/catalogue" },
    //     { title: "submissions", slug: "/submissions" },
    //     { title: "about", slug: "/about" },
    //   ];
    // } else {
    //   navItems = [
    //     { title: "catalogue", slug: "/catalogue" },
    //     { title: "submissions", slug: "/submissions" },
    //     { title: "about", slug: "/about" },
    //     { title: "inquiries", slug: "/inquiries" },
    //   ];
    // }
    return navItems[slot];
  };

  const [arrangements, setArrangements] = useState([{}, {}, {}, {}]);

  useEffect(() => {
    if (arrangement) {
      setArrangements([
        arrangement.a,
        arrangement.b,
        arrangement.c,
        arrangement.d,
        arrangement.e,
      ]);
    }
  }, [arrangement]);

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
      {arrangement ? (
        arrangements.map((a, i) => {
          return (
            <Link
              to={getNav(page, i).slug}
              style={{ top: a.top, left: a.left }}
              className="nav-item sm"
              key={i}
            >
              {getNav(page, i).title}
            </Link>
          );
        })
      ) : (
        <>
          <nav className="sm">
            <Link to={"/"} className={page === "home" ? "is--active sm" : "sm"}>
              home
            </Link>
            {" \\\\ "}
            <Link
              to={"/catalogue"}
              className={page === "catalogue" ? "is--active sm" : "sm"}
            >
              catalogue
            </Link>
            {" \\\\ "}
            <Link
              to={"/about"}
              className={page === "about" ? "is--active sm" : "sm"}
            >
              about
            </Link>
            {" \\\\ "}
            <Link
              to={"/inquiries"}
              className={page === "inquiries" ? "is--active sm" : "sm"}
            >
              inquiries
            </Link>
            {cartTotal ? (
              <>
                {" \\\\ "}
                <Link
                  to={"/cart"}
                  className={page === "cart" ? "is--active sm" : "sm"}
                >
                  cart ({cartTotal})
                </Link>
              </>
            ) : null}
          </nav>
          <div className="footer">
            <p className="--muted">© 2022 9VT\5</p>
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
          {/* <div className="nav left">
            {arrangements.map((link, i) => {
              if (i === 0) {
                return (
                  <>
                    <Link to={getNav(page, i).slug} className="sm" key={i}>
                      {getNav(page, i).title}
                    </Link>
                    {" \\\\ "}
                  </>
                );
              } else if (i === 1) {
                return (
                  <Link to={getNav(page, i).slug} className="sm" key={i}>
                    {getNav(page, i).title}
                  </Link>
                );
              } else return null;
            })}
          </div>
          <div className="nav right">
            {arrangements.map((link, i) => {
              if (i === 2) {
                return (
                  <>
                    <Link to={getNav(page, i).slug} className="sm" key={i}>
                      {getNav(page, i).title}
                    </Link>
                    {" \\\\ "}
                  </>
                );
              } else if (i === 3) {
                return (
                  <Link to={getNav(page, i).slug} className="sm" key={i}>
                    {getNav(page, i).title}
                  </Link>
                );
              } else return null;
            })}
          </div> */}
        </>
      )}
      {children}
      {page !== "home" ? (
        <>
          <div
            className="w-20 half-logo right pointer"
            onClick={logoClick}
            role="button"
          >
            <StaticImage src="../assets/brand/logo.png" alt="logo" />
          </div>
          <div
            className="w-20 half-logo left pointer"
            onClick={logoClick}
            role="button"
          >
            <StaticImage src="../assets/brand/logo.png" alt="logo" />
          </div>
        </>
      ) : null}
    </div>
  );
}
