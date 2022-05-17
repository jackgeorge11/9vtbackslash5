import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Window from "../components/Window";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export const query = graphql`
  query ($slug: String!) {
    allContentfulMoodsCollection(filter: { slug: { eq: $slug } }) {
      nodes {
        artist
        releaseDate(formatString: "MMMM YYYY")
        description {
          raw
        }
        slug
        saleEnded
        moods {
          isSold
          price
          slug
          title
          photo {
            gatsbyImageData(
              layout: FIXED
              height: 300
              placeholder: DOMINANT_COLOR
            )
          }
        }
      }
    }
  }
`;

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    },
  },
};

export default function MoodsCollection({ data }) {
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const collection = data.allContentfulMoodsCollection.nodes[0];
  const randomMoods = shuffle(collection.moods);

  return (
    <Layout
      page="catalogue"
      title={`Moods by ${collection.title}`}
      description={`${collection.artist}'s Moods collection. Released ${collection.releaseDate}.`}
      canonical={collection.slug}
    >
      <Window
        className="large catalogue"
        crumbs={[
          { title: "catalogue", slug: "/catalogue" },
          { title: "Moods", slug: `/catalogue/moods/${collection.slug}` },
          {
            title: collection.artist,
            slug: `/catalogue/moods/${collection.slug}`,
          },
        ]}
      >
        <div className="description">
          <h1 className="title italic">Moods</h1>
          <h2 className="--muted ta-right author">by {collection.artist}</h2>
          {collection.description &&
            renderRichText(collection.description, options)}
          {collection.saleEnded && (
            <h2 className="--muted">sale has ended for this collection.</h2>
          )}
          <h2 className="--muted scroll">(scroll -->)</h2>
        </div>
        {randomMoods.map((mood) => {
          return (
            <div className="idea">
              <Link
                className="cover"
                to={`/catalogue/moods/cottu/${mood.slug}`}
              >
                <GatsbyImage
                  image={getImage(mood.photo)}
                  alt={mood.title}
                  objectFit="contain"
                  style={{ maxHeight: "100%" }}
                />
              </Link>
              <div className="info">
                <h1>
                  <Link
                    className="cover"
                    to={`/catalogue/moods/cottu/${mood.slug}`}
                  >
                    {mood.title}
                  </Link>
                </h1>
                {mood.isSold && <h2 className="--muted">(sold)</h2>}
              </div>
            </div>
          );
        })}
      </Window>
    </Layout>
  );
}
