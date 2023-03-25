import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../components/Product";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { ColorContext } from "../contexts/ColorContext";
import { CartContext } from "../contexts/CartContext";
import moment from "moment";

export const query = graphql`
  query ($slug: String!) {
    allContentfulPublication(filter: { slug: { eq: $slug } }) {
      nodes {
        author
        description {
          raw
        }
        cover {
          gatsbyImageData(placeholder: DOMINANT_COLOR)
        }
        slug
        soldOut
        releaseDate(formatString: "MMMM YYYY")
        title
        artwork
        coverDesign
        format
        genre
        pageCount
        isbn
        typesetting
        price
        shipping {
          internal {
            content
          }
        }
        tax
        saleEnded
        preorder
        preorderShipDate
        copies
        editors
        shipsFrom
        sys {
          type
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

  const { loading } = useContext(ColorContext);
  const { addCartItems, cart } = useContext(CartContext);

  const [total, setTotal] = useState(
    publication.price + publication.price * publication.tax
  );
  const [subtotal, setSubtotal] = useState(publication.price);
  const [buyerOptions, setBuyerOptions] = useState({
    quantity: 1,
    shipping: "Select",
  });

  useEffect(() => {
    setSubtotal(publication.price * Number(buyerOptions.quantity));
  }, [buyerOptions.quantity]);

  useEffect(() => {
    setTotal(
      subtotal +
        subtotal * publication.tax +
        (buyerOptions.shipping !== "Select"
          ? JSON.parse(
              publication.shipping[Number(buyerOptions.shipping)].internal
                .content
            ).cost * buyerOptions.quantity
          : 0)
    );
  }, [buyerOptions, subtotal, publication]);

  const publicationWindow = useRef();

  return (
    <Product
      src={cover}
      alt={`${publication.title} cover`}
      title={`${publication.title}, by ${publication.author}`}
      description={`${publication.title}, by ${publication.author}. ${
        publication.genre
          ? `${publication.genre} published in ${publication.format}.`
          : `published in ${publication.format}.`
      } ${formatPrice(publication.price, "USD")}.`}
      canonical={publication.slug}
      scroller={publicationWindow}
      crumbs={[
        { title: "catalogue", slug: "/catalogue" },
        { title: publication.title, slug: `/catalogue/${publication.slug}` },
      ]}
    >
      {loading ? (
        <h2 className="--muted loading">(loading)</h2>
      ) : (
        <>
          <div className="product-header">
            {!publication.soldOut &&
              !publication.saleEnded &&
              ((publication.preorder &&
                !moment(publication.preorderShipDate).isAfter(moment())) ||
                !moment(publication.releaseDate).isAfter(moment())) && (
                <>
                  {cart?.some((i) => i.slug === publication.slug) ? (
                    <Link className="button disarm" to="/cart">
                      <h4>
                        {
                          cart.filter((i) => i.slug === publication.slug)[0]
                            .quantity
                        }{" "}
                        in cart
                      </h4>
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        addCartItems({
                          quantity: 1,
                          maxQuantity: 5,
                          slug: publication.slug,
                          url: `/catalogue/${publication.slug}`,
                          type: publication.sys.type,
                          price: publication.price,
                          tax: publication.tax,
                          title: publication.title,
                          author: publication.author,
                          image: cover ? cover : undefined,
                          shipping: publication.shipping,
                          preorder: publication.preorder,
                          preorderShipDate: publication.preorderShipDate,
                        })
                      }
                    >
                      <h4>add to cart</h4>
                    </button>
                  )}
                </>
              )}
            <h1 className="italic title">{publication.title}</h1>
          </div>
          <h2 className="--muted ta-right author">by {publication.author}</h2>
          {description && renderRichText(description, options)}
          <div className="image image-mobile">
            <GatsbyImage image={cover} alt={`${publication.title} cover`} />
          </div>
          {publication.copies && (
            <h2 className="--muted">
              this edition is limited to {publication.copies} copies.
            </h2>
          )}
          <h1>details</h1>
          {publication.editors && (
            <h2 className="m-0">edited by {publication.editors}</h2>
          )}
          {publication.typesetting && (
            <h2 className="m-0">typesetting by {publication.typesetting}</h2>
          )}
          {publication.coverDesign && (
            <h2 className="m-0">cover design by {publication.coverDesign}</h2>
          )}
          {publication.artwork && (
            <h2 className="m-0">artwork by {publication.artwork}</h2>
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
          {publication.price && (
            <h2 className="m-0">{formatPrice(publication.price, "USD")}</h2>
          )}
          {publication.copies && (
            <h2 className="m-0">limited to {publication.copies} copies</h2>
          )}
          {publication.soldOut && (
            <h2 className="m-0 --muted">this publication is sold out</h2>
          )}
          {publication.saleEnded && (
            <h2 className="m-0 --muted">
              sales for this publication have ended
            </h2>
          )}
          <h2 className="ta-right">
            <Link to="/catalogue">click here</Link> to navigate back to our
            catalogue.
          </h2>
        </>
      )}
    </Product>
  );
}
