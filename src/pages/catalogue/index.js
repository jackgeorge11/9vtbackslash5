import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";
import moment from "moment";
import { isSafari } from "react-device-detect";

export default function Index() {
  const getMood = () => {
    return Math.floor(Math.random() * 10);
  };

  const { allContentfulCatalogue } = useStaticQuery(graphql`
    query MyQuery {
      allContentfulCatalogue {
        nodes {
          items {
            ... on ContentfulMoodsCollection {
              moods {
                photo {
                  gatsbyImageData(
                    layout: FIXED
                    height: 300
                    placeholder: DOMINANT_COLOR
                  )
                  publicUrl
                }
              }
              slug
              releaseDate
              artist
              internal {
                type
              }
            }
            ... on ContentfulPublication {
              slug
              author
              cover {
                gatsbyImageData(
                  layout: FIXED
                  height: 300
                  placeholder: DOMINANT_COLOR
                )
                height
                width
              }
              releaseDate
              internal {
                type
              }
              title
            }
          }
        }
      }
    }
  `);

  const sortCatalogue = (catalogue) => {
    return catalogue.sort(function (a, b) {
      return (
        moment(b.releaseDate).format("YYYYMMDD") -
        moment(a.releaseDate).format("YYYYMMDD")
      );
    });
  };

  const sortedCatalogue = sortCatalogue(allContentfulCatalogue.nodes[0].items);

  const scroller = useRef();

  return (
    <div>
      <Layout
        page="catalogue"
        title="catalogue"
        description="discover everything we've put into the world, from books to collections of art."
      >
        <Window
          className="large catalogue"
          scroller={scroller}
          crumbs={[{ title: "catalogue", slug: "/catalogue" }]}
        >
          <h2
            className="--muted scroll pointer"
            onClick={
              scroller && scroller.current
                ? () =>
                    (scroller.current.scrollLeft =
                      scroller.current.clientWidth / 2)
                : null
            }
          >
            (scroll -->)
          </h2>
          {sortedCatalogue?.map((item, i) => {
            return (
              <div className="idea">
                <Link
                  to={`/catalogue/${
                    item.internal.type === "ContentfulMoodsCollection"
                      ? `moods/${item.slug}`
                      : item.slug
                  }`}
                  className="cover"
                >
                  <GatsbyImage
                    image={
                      item.internal.type === "ContentfulMoodsCollection"
                        ? getImage(item.moods?.[0].photo)
                        : getImage(item.cover)
                    }
                    alt={
                      item.internal.type === "ContentfulMoodsCollection"
                        ? `Moods by ${item.artist}`
                        : item.title
                    }
                    objectFit="contain"
                    style={{ maxHeight: "300px" }}
                  />
                </Link>
                <div className="info">
                  <h1 className="italic">
                    <Link
                      to={`/catalogue/${
                        item.internal.type === "ContentfulMoodsCollection"
                          ? `moods/${item.slug}`
                          : item.slug
                      }`}
                    >
                      {item.internal.type === "ContentfulMoodsCollection"
                        ? "Moods"
                        : item.title}
                    </Link>
                  </h1>
                  <h2>
                    by{" "}
                    {item.internal.type === "ContentfulMoodsCollection"
                      ? item.artist
                      : item.author}
                  </h2>
                  <h3>{moment(item.releaseDate).format("MMM YYYY")}</h3>
                </div>
              </div>
            );
          })}
        </Window>
      </Layout>
    </div>
  );
}
