import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import Product from "../components/Product";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { ColorContext } from "../contexts/ColorContext";
import getStripe from "../utils/stripe";

export const query = graphql`
  query ($slug: String!, $productId: String!) {
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
    allStripePrice(filter: { product: { id: { eq: $productId } } }) {
      nodes {
        product {
          object
          name
          type
          id
          metadata {
            shipping01
            shipping02
            shipping03
          }
        }
        unit_amount
        currency
        type
        id
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

const formatPrice = (amount, currency) => {
  if ((amount && currency) || (amount === 0 && currency)) {
    let price = (amount / 100).toFixed(2);
    let numberFormat = new Intl.NumberFormat(["en-US"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    });
    return numberFormat.format(price);
  }
};

export default function Index({ data }) {
  const publication = data?.allContentfulPublication?.nodes?.[0];
  const description = publication?.description;
  const cover = getImage(publication?.cover);
  const prices = data?.allStripePrice?.nodes;
  console.log(prices);

  const { loading, setLoading } = useContext(ColorContext);

  const buy = async (price, e) => {
    e.preventDefault();
    setLoading(true);
    const id = price.id;
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ id, quantity: 1 }],

      successUrl: `${window.location.href}/page-2/`,
      cancelUrl: `${window.location.href}/advanced`,
    });
    if (error) {
      console.warn("Error:", error);
      setLoading(false);
    }
  };

  console.log(window.location);

  return (
    <Product src={cover} alt={`${publication.title} cover`}>
      {loading ? (
        <h2 className="--muted loading">(loading)</h2>
      ) : (
        <>
          <h1 className="italic title">{publication.title}</h1>
          <h2 className="--muted ta-right author">by {publication.author}</h2>
          {description && renderRichText(description, options)}
          {publication.soldOut && (
            <h2 className="--muted">this publication is sold out</h2>
          )}
          <h2>
            <button
              className="under thick md"
              onClick={(e) => buy(prices[0], e)}
            >
              buy this publication
            </button>
          </h2>
          <h1>details</h1>
          {prices?.every((p) => p.unit_amount || p.unit_amount === 0) && (
            <h2 className="m-0">
              {formatPrice(prices[0].unit_amount, prices[0].currency)}
            </h2>
            // <h2 className="m-0">
            //   {prices.length
            //     ? prices.map((price, i) => {
            //         if (i === prices.length - 1) {
            //           formatPrice(price.unit_amount, price.currency);
            //           return `${formatPrice(
            //             price.unit_amount,
            //             price.currency
            //           )}`;
            //         } else {
            //           return `${formatPrice(
            //             price.unit_amount,
            //             price.currency
            //           )} \\\\ `;
            //         }
            //       })
            //     : formatPrice(prices[0]?.unit_amount, prices[0]?.currency)}
            // </h2>
          )}
          {publication.shipsFrom && (
            <h2 className="m-0">ships from {publication.shipsFrom}</h2>
          )}
          {publication.editors && (
            <h2 className="m-0">typesetting by {publication.typesetting}</h2>
          )}
          {publication.typesetting && (
            <h2 className="m-0">typesetting by {publication.typesetting}</h2>
          )}
          {publication.artwork && (
            <h2 className="m-0">artwork by {publication.artwork}</h2>
          )}
          {publication.coverDesign && (
            <h2 className="m-0">cover design by {publication.coverDesign}</h2>
          )}
          {publication.publisher && (
            <h2 className="m-0">printed by {publication.publisher}</h2>
          )}
          {publication.releaseDate && (
            <h2 className="m-0">published in {publication.releaseDate}</h2>
          )}
          {publication.genre && <h2 className="m-0">{publication.genre}</h2>}
          {publication.format && <h2 className="m-0">{publication.format}</h2>}
          {publication.pageCount && (
            <h2 className="m-0">{publication.pageCount} pages</h2>
          )}
          {publication.isbn && (
            <h2 className="m-0">ISBN: {publication.isbn}</h2>
          )}

          {publication.soldOut && (
            <h2 className="m-0 --muted">this publication is sold out</h2>
          )}
          <h2>
            <Link to="/catalogue">click here</Link> to navigate back to our
            catalogue.
          </h2>
        </>
      )}
    </Product>
  );
}
