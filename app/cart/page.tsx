"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import { CartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

const PayPalCheckout = dynamic(
  () => import("@/components/PayPalCheckout"),
  { ssr: false }
);

export default function CartPage() {
  const {
    cart,
    setCartShipping,
    updateCartQuantity,
    cartUpdating,
    cartTotal,
    removeCartItem,
    clearCart,
  } = useContext(CartContext);

  const [success, setSuccess] = useState<string | undefined>(undefined);

  const getItemTotal = (item: CartItem): number => {
    return (
      item.quantity * (item.price + item.price * item.tax) +
      item.quantity *
        JSON.parse(item.shipping[Number(item.shippingOption)].fields.content)
          .cost
    );
  };

  return (
    <Layout page="cart">
      <Window className="cart small" crumbs={[{ title: "cart" }]}>
        <h1>Cart ({cartTotal})</h1>
        {success ? (
          <>
            <h2>{success}</h2>
            <h2>nearly 100% of proceeds go to our authors and artists.</h2>
            <h2>
              if you have any questions about your purchase, email us at{" "}
              <a href="mailto:transactions@9vtbackslash5.com">
                transactions@9vtbackslash5.com
              </a>
              .
            </h2>
            <h2 className="ta-right">
              <Link href="/catalogue">click here</Link> to navigate back to our
              catalogue.
            </h2>
            <h2 className="ta-right">
              or{" "}
              <a
                href="https://instagram.com/9vtbackslash5"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                click here
              </a>{" "}
              to check out our Instagram.
            </h2>
          </>
        ) : cart.length ? (
          <>
            {cartUpdating ? (
              <h2 className="--muted loading">(loading)</h2>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.slug}>
                      <Link href={item.url} className="cart-item-image">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={150}
                            height={200}
                            style={{ width: "100%", height: "auto" }}
                          />
                        )}
                      </Link>
                      <div className="cart-item-details">
                        <h1 className="italic title">
                          <Link href={item.url}>{item.title}</Link>{" "}
                          {item.preorder &&
                          dayjs(item.preorderShipDate).isAfter(dayjs()) ? (
                            <span className="--muted">(preorder)</span>
                          ) : (
                            ""
                          )}
                        </h1>
                        <h3 className="--muted subtitle">
                          {item.author}
                          {item.preorder &&
                          dayjs(item.preorderShipDate).isAfter(dayjs())
                            ? ` \\\\ this item ships from
                              ${dayjs(item.preorderShipDate).format(
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
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              )
                            )}
                          </select>
                        </h3>
                        <h3>
                          subtotal: $
                          {((item.quantity * item.price) / 100).toFixed(2)}
                        </h3>
                        <h3>tax: {item.tax * 100}%</h3>
                        <h3>
                          shipping:{" "}
                          <select
                            name="shipping"
                            onChange={(e) =>
                              setCartShipping(item.slug, e.target.value)
                            }
                            defaultValue="Select"
                            value={
                              item.shippingOption ? item.shippingOption : ""
                            }
                            className="xsm"
                          >
                            <option value="Select" disabled>
                              Select
                            </option>
                            {item.shipping.map((option, i) => {
                              const parsed = JSON.parse(option.fields.content);
                              return (
                                <option key={i} value={i}>
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
                        <PayPalCheckout
                          cart={cart}
                          getItemTotal={getItemTotal}
                          clearCart={clearCart}
                          onSuccess={setSuccess}
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
            <Link href="/catalogue">catalogue</Link>?
          </h2>
        )}
      </Window>
    </Layout>
  );
}
