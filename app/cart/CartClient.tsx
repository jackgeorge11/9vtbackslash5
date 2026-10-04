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
import {
  buildCartLines,
  canCheckout,
  cartSum,
  lineSubtotal,
  MAX_QUANTITY,
  taxRate,
} from "@/lib/cart";
import type { Entry, EntrySkeletonType } from "contentful";

const PayPalCheckout = dynamic(() => import("@/components/PayPalCheckout"), {
  ssr: false,
});

interface CartClientProps {
  publications: Entry<EntrySkeletonType>[];
}

export default function CartClient({ publications }: CartClientProps) {
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

  const lines = buildCartLines(cart, publications);

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
          </>
        ) : lines.length ? (
          <>
            {cartUpdating ? (
              <h2 className="--muted loading">(loading)</h2>
            ) : (
              <>
                <div className="cart-items">
                  {lines.map((line) => {
                    const { entry, pub } = line;
                    const coverUrl = pub?.cover?.fields?.file?.url as
                      | string
                      | undefined;
                    const isPreorder =
                      !!pub?.preorder &&
                      dayjs(pub.preorderShipDate).isAfter(dayjs());

                    return (
                      <div className="cart-item" key={entry.slug}>
                        <Link
                          href={`/catalogue/${entry.slug}`}
                          className="cart-item-image"
                        >
                          {coverUrl && (
                            <Image
                              src={`https:${coverUrl}`}
                              alt={pub?.title ?? entry.slug}
                              width={150}
                              height={200}
                              style={{ width: "100%", height: "auto" }}
                            />
                          )}
                        </Link>
                        <div className="cart-item-details">
                          <h1 className="italic title">
                            <Link href={`/catalogue/${entry.slug}`}>
                              {pub?.title ?? entry.slug}
                            </Link>{" "}
                            {isPreorder ? (
                              <span className="--muted preorder">
                                (preorder)
                              </span>
                            ) : (
                              ""
                            )}
                          </h1>
                          <h3 className="--muted subtitle">
                            {pub?.author}
                            {isPreorder
                              ? ` \\\\ this item ships from ${dayjs(
                                  pub.preorderShipDate
                                ).format("MMMM D")}`
                              : ""}
                          </h3>

                          {line.unavailable ? (
                            <>
                              <h3 className="--muted">
                                this title is {line.unavailable}.
                              </h3>
                              <h3>
                                <button
                                  className="disarm"
                                  onClick={() => removeCartItem(entry.slug)}
                                >
                                  <h4>remove</h4>
                                </button>
                              </h3>
                            </>
                          ) : (
                            <>
                              <h3 className="breakdown">
                                quantity:{" "}
                                <select
                                  name="quantity"
                                  value={entry.quantity}
                                  onChange={(e) => {
                                    if (Number(e.target.value)) {
                                      updateCartQuantity(
                                        entry.slug,
                                        Number(e.target.value)
                                      );
                                    } else if (lines.length > 1) {
                                      removeCartItem(entry.slug);
                                    } else {
                                      clearCart();
                                    }
                                  }}
                                  className="xsm"
                                >
                                  {[...Array(MAX_QUANTITY + 1).keys()].map(
                                    (n) => (
                                      <option key={n} value={n}>
                                        {n}
                                      </option>
                                    )
                                  )}
                                </select>
                              </h3>
                              <h3>
                                subtotal: ${(lineSubtotal(line) / 100).toFixed(2)}
                              </h3>
                              <h3>tax: {taxRate(pub) * 100}%</h3>
                              <h3>
                                shipping:{" "}
                                <select
                                  name="shipping"
                                  onChange={(e) =>
                                    setCartShipping(entry.slug, e.target.value)
                                  }
                                  value={line.selected?.to ?? "Select"}
                                  className="xsm"
                                >
                                  <option value="Select" disabled>
                                    Select
                                  </option>
                                  {line.shipping.map((option) => (
                                    <option key={option.to} value={option.to}>
                                      {formatPrice(option.cost, "USD")} ~
                                      shipping to {option.to}
                                    </option>
                                  ))}
                                </select>
                              </h3>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-numbers">
                  {canCheckout(lines) ? (
                    <>
                      <h1>Total: {formatPrice(cartSum(lines), "USD")}</h1>
                      <h3 className="--muted ta-right">
                        Enter your shipping details at the next step.
                      </h3>
                      <div className="paypal-btn-wrapper">
                        <PayPalCheckout
                          lines={lines}
                          clearCart={clearCart}
                          onSuccess={setSuccess}
                        />
                      </div>
                    </>
                  ) : lines.some((line) => line.unavailable) ? (
                    <h3>
                      In order to proceed, please remove the items above that
                      are no longer for sale.
                    </h3>
                  ) : (
                    <h3>
                      In order to proceed, please select shipping options for
                      all items in your cart.
                    </h3>
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
        <h3 className="--muted mt-md">
          <Link href="/returns">return policy</Link> \\{" "}
          <Link href="/privacy">privacy policy</Link>
        </h3>
      </Window>
    </Layout>
  );
}
