import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import Product from "../components/Product";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { ColorContext } from "../contexts/ColorContext";
import { PayPalButton } from "react-paypal-button-v2";
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

  const { loading, setLoading } = useContext(ColorContext);
  const [success, setSuccess] = useState(undefined);

  const getShippingOptions = (options) => {
    let stripeShipping = [];
    options?.forEach((option) => {
      const parsed = JSON.parse(option?.internal?.content);
    });
    return stripeShipping;
  };

  const [total, setTotal] = useState(
    publication.price + publication.price * publication.tax
  );
  const [subtotal, setSubtotal] = useState(publication.price);
  const [buyerOptions, setBuyerOptions] = useState({
    quantity: 1,
    shipping: "Select",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setBuyerOptions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(buyerOptions);
  };

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
            ).cost
          : 0)
    );
  }, [buyerOptions.shipping, subtotal]);

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
    >
      {loading ? (
        <h2 className="--muted loading">(loading)</h2>
      ) : success ? (
        <>
          <h2>{success}</h2>
          <h2>nearly 100% of proceeds go to the author(s).</h2>
          <h2>
            if you have any questions about your purchase, email us at{" "}
            <a href="mailto:transactions@9vtbackslash5.com">
              transactions@9vtbackslash5.com
            </a>
            .
          </h2>
          <h2 className="ta-right">
            <Link to="/catalogue">click here</Link> to navigate back to our
            catalogue.
          </h2>
          <h2 className="ta-right">
            or{" "}
            <a
              href="https://instagram.com/9vtbackslash5"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>{" "}
            to checkout our Instagram.
          </h2>
        </>
      ) : (
        <>
          <h1 className="italic title">{publication.title}</h1>
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
          {publication.soldOut ? (
            <h2 className="--muted">this publication is sold out</h2>
          ) : publication.saleEnded ? (
            <h2 className="--muted">sales for this publication have ended</h2>
          ) : (
            <>
              {publication.preorder &&
                moment(publication.preorderShipDate).isAfter(moment()) && (
                  <h2 className="--muted">
                    this publication will ship from{" "}
                    {moment(publication.preorderShipDate).format("MMMM Do")}
                  </h2>
                )}
              <h1>
                {publication.preorder &&
                moment(publication.preorderShipDate).isAfter(moment())
                  ? "preorder"
                  : "purchase"}{" "}
                this publication
              </h1>
              <h2 className="breakdown">
                cost: <span>{formatPrice(publication.price, "USD")}</span>
              </h2>
              <h2 className="breakdown">
                quantity:{" "}
                <select
                  name="quantity"
                  value={buyerOptions.quantity}
                  onChange={handleChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </h2>
              <h2 className="breakdown">
                subtotal: <span>{formatPrice(subtotal, "USD")}</span>
              </h2>
              <h2 className="breakdown">
                tax: <span>{publication.tax * 100}%</span>
              </h2>
              <h2 className="breakdown">
                shipping:{" "}
                <select
                  name="shipping"
                  onChange={handleChange}
                  defaultValue="Select"
                >
                  <option value="Select" disabled>
                    Select
                  </option>
                  {publication.shipping.map((option, i) => {
                    const parsed = JSON.parse(option.internal.content);
                    return (
                      <option value={i}>
                        {formatPrice(parsed.cost, "USD")} ~ shipping to{" "}
                        {parsed.to}
                      </option>
                    );
                  })}
                </select>
              </h2>
              <h2 className="breakdown">
                total: <span>{formatPrice(total, "USD")}</span>
              </h2>
              <div className="paypal-btn-wrapper">
                <PayPalButton
                  style={{ color: "black" }}
                  options={{
                    clientId: `${process.env.GATSBY_PAYAPL_SANDBOX_ID}`,
                  }}
                  currency="USD"
                  onError={(err) => {
                    if (buyerOptions.shipping === "Select") {
                      alert("Please select shipping.");
                    } else {
                      console.log(err);
                    }
                  }}
                  createOrder={(data, actions) => {
                    if (buyerOptions.shipping === "Select") {
                      return null;
                    } else {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: (total / 100).toFixed(2),
                              breakdown: {
                                item_total: {
                                  currency_code: "USD",
                                  value: (subtotal / 100).toFixed(2),
                                },
                                shipping: {
                                  currency_code: "USD",
                                  value: (
                                    JSON.parse(
                                      publication.shipping[
                                        Number(buyerOptions.shipping)
                                      ].internal.content
                                    ).cost / 100
                                  ).toFixed(2),
                                },
                                tax_total: {
                                  currency_code: "USD",
                                  value: (
                                    (subtotal * publication.tax) /
                                    100
                                  ).toFixed(2),
                                },
                              },
                            },
                            items: [
                              {
                                unit_amount: {
                                  currency_code: "USD",
                                  value: String(
                                    (publication.price / 100).toFixed(2)
                                  ),
                                },
                                quantity: buyerOptions.quantity,
                                name: publication.title,
                                description: publication.blurb
                                  ? publication.blurb
                                  : "",
                              },
                            ],
                          },
                        ],
                      });
                    }
                  }}
                  onApprove={(data, actions) => {
                    // Capture the funds from the transaction
                    return actions.order.capture().then(function (details) {
                      setSuccess(
                        `Thanks for your purchase, ${details.payer.name.given_name}.`
                      );
                    });
                  }}
                />
              </div>
            </>
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
