import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";

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
                  gatsbyImageData
                }
              }
              slug
              releaseDate(formatString: "MMMM YYYY")
              artist
              internal {
                type
              }
            }
            ... on ContentfulPublication {
              slug
              author
              cover {
                gatsbyImageData
              }
              releaseDate(formatString: "MMMM YYYY")
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
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    });
  };

  const sortedCatalogue = sortCatalogue(allContentfulCatalogue.nodes[0].items);

  console.log(sortedCatalogue[1].moods?.[getMood()]);

  return (
    <div>
      <Layout page="catalogue">
        <Window className="large catalogue">
          <div className="description">
            <h1>catalogue</h1>
            <h2>discover everything 9VT\5 has put into the world.</h2>
            <h2 className="--muted">(scroll -->)</h2>
          </div>
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
                        ? getImage(item.moods?.[getMood()].photo)
                        : getImage(item.cover)
                    }
                    alt={
                      item.internal.type === "ContentfulMoodsCollection"
                        ? `Moods by ${item.artist}`
                        : item.title
                    }
                    objectFit="contain"
                    style={{ maxHeight: "100%" }}
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
                  <h3>{item.releaseDate}</h3>
                </div>
              </div>
            );
          })}
        </Window>
      </Layout>
    </div>
  );
}
