import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";

export default function Index() {
  const {
    cart,
    setCartShipping,
    updateCartQuantity,
    cartUpdating,
    cartTotal,
    removeCartItem,
    clearCart,
  } = useContext(CartContext);

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

  const [shippingError, setShippingError] = useState(false);
  const [success, setSuccess] = useState(undefined);

  const getItemTotal = (item) => {
    return (
      item.quantity * (item.price + item.price * item.tax) +
      item.quantity *
        JSON.parse(item.shipping[Number(item.shippingOption)].internal.content)
          .cost
    );
  };
  console.log(cart);
  return (
    <Layout
      page="cart"
      title={`cart ${cart.length ? `(${cart.length})` : ""}`}
      additional={[{ name: "robots", content: "noindex" }]}
    >
      <Window className="cart small" crumbs={[{ title: "cart" }]}>
        <h1>Cart ({cartTotal})</h1>
        {success ? (
          <h2 className="">{success}</h2>
        ) : cart.length ? (
          <>
            {cartUpdating ? (
              <h2 className="--muted loading">(loading)</h2>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item">
                      <Link to={item.url} className="cart-item-image">
                        <GatsbyImage image={item.image} />
                      </Link>
                      <div className="cart-item-details">
                        <h1 className="italic title">
                          <Link to={item.url}>{item.title}</Link>{" "}
                          {item.preorder &&
                          moment(item.preorderShipDate).isAfter(moment()) ? (
                            <span className="--muted">(preorder)</span>
                          ) : (
                            ""
                          )}
                        </h1>
                        <h3 className="--muted subtitle">
                          {item.author}
                          {item.preorder &&
                          moment(item.preorderShipDate).isAfter(moment())
                            ? ` \\\\ this item ships from
                              ${moment(item.preorderShipDate).format(
                                "MMMM Do"
                              )}`
                            : ""}
                        </h3>

                        <h3 className="breakdown">
                          quantity:{" "}
                          <select
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => {
                              if (Number(e.target.value)) {
                                updateCartQuantity(
                                  item.slug,
                                  Number(e.target.value)
                                );
                              } else if (cart.length > 1) {
                                removeCartItem(item.slug);
                              } else {
                                clearCart();
                              }
                            }}
                            className="xsm"
                          >
                            {[...Array(item.maxQuantity + 1).keys()].map(
                              (n) => (
                                <option value={n}>{n}</option>
                              )
                            )}
                          </select>
                        </h3>
                        <h3>
                          subtotal: $
                          {((item.quantity * item.price) / 100).toFixed(2)}
                        </h3>
                        <h3>tax: {item.tax * 100}%</h3>
                        <h3
                          className={
                            shippingError
                              ? "breakdown thick --warning"
                              : "breakdown"
                          }
                        >
                          shipping:{" "}
                          <select
                            name="shipping"
                            onChange={(e) =>
                              setCartShipping(item.slug, e.target.value)
                            }
                            defaultValue="Select"
                            value={
                              item.shippingOption ? item.shippingOption : null
                            }
                            className={shippingError ? "--warning xsm" : "xsm"}
                          >
                            <option value="Select" disabled>
                              Select
                            </option>
                            {item.shipping.map((option, i) => {
                              const parsed = JSON.parse(
                                option.internal.content
                              );
                              return (
                                <option value={i}>
                                  {formatPrice(parsed.cost, "USD")} ~ shipping
                                  to {parsed.to}
                                </option>
                              );
                            })}
                          </select>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-numbers">
                  {cart.filter((x) => x.shippingOption).length ===
                  cart.length ? (
                    <>
                      <h1>
                        Total:{" "}
                        {formatPrice(
                          cart.reduce((x, y) => x + getItemTotal(y), 0),
                          "USD"
                        )}
                      </h1>
                      <h3 className="--muted ta-right">
                        Enter your shipping details at the next step.
                      </h3>
                      <div className="paypal-btn-wrapper">
                        <PayPalButton
                          style={{ color: "black" }}
                          options={{
                            clientId: `${process.env.GATSBY_PAYAPL_CLIENT_ID}`,
                          }}
                          currency="USD"
                          onError={(err) => {
                            console.log(err);
                          }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: cart.map((item) => ({
                                reference_id: item.slug,
                                amount: {
                                  currency_code: "USD",
                                  value: (getItemTotal(item) / 100).toFixed(2),
                                  breakdown: {
                                    item_total: {
                                      currency_code: "USD",
                                      value: (
                                        (item.quantity * item.price) /
                                        100
                                      ).toFixed(2),
                                    },
                                    shipping: {
                                      currency_code: "USD",
                                      value: (
                                        (JSON.parse(
                                          item.shipping[
                                            Number(item.shippingOption)
                                          ].internal.content
                                        ).cost *
                                          item.quantity) /
                                        100
                                      ).toFixed(2),
                                    },
                                    tax_total: {
                                      currency_code: "USD",
                                      value: (
                                        (item.quantity *
                                          item.price *
                                          item.tax) /
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
                                        (item.price / 100).toFixed(2)
                                      ),
                                    },
                                    quantity: item.quantity,
                                    name: item.title,
                                    description: item.blurb ? item.blurb : "",
                                  },
                                ],
                              })),
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order
                              .capture()
                              .then(function (details) {
                                clearCart();
                                setSuccess(
                                  `Thanks for your purchase, ${details.payer.name.given_name}.`
                                );
                              });
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <h1>
                      In order to proceed, please select shipping options for
                      all items in your cart.
                    </h1>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <h2>
            your cart is empty, why not check out our{" "}
            <Link to="/catalogue">catalogue</Link>?
          </h2>
        )}
      </Window>
    </Layout>
  );
}
