import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import Product from "../components/Product";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

export const query = graphql`
  query ($slug: String!) {
    allContentfulPublication(filter: { slug: { eq: $slug } }) {
      nodes {
        author
        description {
          raw
        }
        cover {
          gatsbyImageData
          publicUrl
        }
        slug
        soldOut
        releaseDate(formatString: "MMMM YYYY")
        title
        artwork
        coverDesign
        format
        genre
        price
        pageCount
        isbn
        shipsFrom
        typesetting
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

export default function index({ data }) {
  const publication = data?.allContentfulPublication?.nodes?.[0];
  const description = publication.description;
  const cover = getImage(publication?.cover);

  console.log(publication);

  return (
    <Product src={cover} alt={`${publication.title} cover`}>
      <h1 className="italic title">{publication.title}</h1>
      <h2 className="--muted ta-right author">by {publication.author}</h2>
      {description && renderRichText(description, options)}
      {publication.soldOut && (
        <h2 className="--muted">this publication is sold out</h2>
      )}
      <h2>
        <Link to="/catalogue">click here</Link> to navigate back to our
        catalogue.
      </h2>
      <h1>details</h1>
      {publication.price && (
        <h2 className="m-0">${publication.price}</h2>
      )}
      {publication.artwork && (
        <h2 className="m-0">artwork by {publication.artwork}</h2>
      )}
      {publication.coverDesign && (
        <h2 className="m-0">cover design by {publication.coverDesign}</h2>
      )}
      {publication.typsetting && (
        <h2 className="m-0">typesetting by {publication.typesetting}</h2>
      )}
      {publication.publisher && (
        <h2 className="m-0">printed by {publication.publisher}</h2>
      )}
      {publication.releaseDate && (
        <h2 className="m-0">published in {publication.releaseDate}</h2>
      )}
      {publication.genre && <h2 className="m-0">{publication.genre}</h2>}
      {publication.format && <h2 className="m-0">{publication.format}</h2>}
      {publication.pageCount && <h2 className="m-0">{publication.pageCount} pages</h2>}
      {publication.isbn && <h2 className="m-0">ISBN: {publication.isbn}</h2>}
      {publication.shipsFrom && (
        <h2 className="m-0">ships from {publication.shipsFrom}</h2>
      )}
      {publication.soldOut && (
        <h2 className="m-0 --muted">this publication is sold out</h2>
      )}
      <h2>
        <Link to="/catalogue">click here</Link> to navigate back to our
        catalogue.
      </h2>
    </Product>
  );
}
