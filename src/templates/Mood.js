import React from "react";
import Product from "../components/Product";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { getImage } from "gatsby-plugin-image";

export const query = graphql`
  query ($slug: String!, $collectionSlug: String!) {
    allContentfulMood(filter: { slug: { eq: $slug } }) {
      nodes {
        isSold
        photo {
          gatsbyImageData
        }
        price
        slug
        title
        medium
        size
      }
    }
    allContentfulMoodsCollection(filter: { slug: { eq: $collectionSlug } }) {
      nodes {
        releaseDate(formatString: "MMMM YYYY")
        artist
        slug
        description {
          raw
        }
        saleEnded
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

export default function Mood({ data }) {
  const mood = data.allContentfulMood?.nodes?.[0];
  const collection = data.allContentfulMoodsCollection?.nodes?.[0];

  const src = getImage(mood?.photo);

  const description = mood.description;
  const collectionDescription = collection.description;

  return (
    <Product src={src} alt={mood.title}>
      <h1 className="italic title">{mood.title}</h1>
      <h2 className="--muted ta-right author">by {collection.artist}</h2>
      {description && renderRichText(description, options)}
      {collectionDescription && renderRichText(collectionDescription, options)}
      <h2 className="--muted">{mood.isSold && "this piece is sold."}</h2>
      <h2 className="--muted">
        {collection.saleEnded && "sale has ended for this collection."}
      </h2>
      <h2>
        <Link to={`/catalogue/moods/${collection.slug}`}>click here</Link> to go
        back to the collection, or{" "}
        <Link to="/catalogue">click here</Link> to go back to our catalogue.
      </h2>
      <h1>details</h1>
      {mood.price && <h2 className="m-0">{`$${mood.price}`}</h2>}
      {mood.medium && <h2 className="m-0">{mood.medium}</h2>}
      {mood.size && <h2 className="m-0">{mood.size}</h2>}
      <h2>
        <Link to={`/catalogue/moods/${collection.slug}`}>click here</Link> to go
        back to the collection, or{" "}
        <Link to="/catalogue">click here</Link> to go back to our catalogue.
      </h2>
    </Product>
  );
}
