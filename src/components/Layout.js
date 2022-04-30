import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { ColorContext } from "../contexts/ColorContext";
import "../styles/styles.scss";
// import { loadStripe } from "@stripe/stripe-js";

// let stripePromise;
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe("<YOUR STRIPE PUBLISHABLE KEY>");
//   }
//   return stripePromise;
// };

export default function Layout({
  children,
  title,
  description,
  page,
  additional,
}) {
  const { color, arrangement, logoClick } = useContext(ColorContext);

  const getNav = (page, slot) => {
    let navItems = [];
    if (page === "catalogue") {
      navItems = [
        { title: "home", slug: "/" },
        { title: "submissions", slug: "/submissions" },
        { title: "about", slug: "/about" },
        { title: "inquiries", slug: "/inquiries" },
      ];
    } else if (page === "submissions") {
      navItems = [
        { title: "home", slug: "/" },
        { title: "catalogue", slug: "/catalogue" },
        { title: "about", slug: "/about" },
        { title: "inquiries", slug: "/inquiries" },
      ];
    } else if (page === "about") {
      navItems = [
        { title: "home", slug: "/" },
        { title: "catalogue", slug: "/catalogue" },
        { title: "submissions", slug: "/submissions" },
        { title: "inquiries", slug: "/inquiries" },
      ];
    } else if (page === "inquiries") {
      navItems = [
        { title: "home", slug: "/" },
        { title: "catalogue", slug: "/catalogue" },
        { title: "submissions", slug: "/submissions" },
        { title: "about", slug: "/about" },
      ];
    } else {
      navItems = [
        { title: "catalogue", slug: "/catalogue" },
        { title: "submissions", slug: "/submissions" },
        { title: "about", slug: "/about" },
        { title: "inquiries", slug: "/inquiries" },
      ];
    }
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
      ]);
    }
  }, [arrangement]);

  return (
    <div className="main">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
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
          <div className="nav left">
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
          </div>
        </>
      )}
      {children}
      {page !== "home" ? (
        <>
          <div className="w-20 half-logo right pointer" onClick={logoClick} role="button">
            <StaticImage src="../assets/brand/logo.png" alt="logo" />
          </div>
          <div className="w-20 half-logo left pointer" onClick={logoClick} role="button">
            <StaticImage src="../assets/brand/logo.png" alt="logo" />
          </div>
        </>
      ) : null}
    </div>
  );
}
