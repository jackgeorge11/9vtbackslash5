import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Window from "../../components/Window";
import { CartContext } from "../../contexts/CartContext";

export default function Index() {
  const { cart, updateCartQuantity, removeCartItem, cartUpdating } =
    useContext(CartContext);
  return (
    <Layout
      page="cart"
      title={`cart ${cart.length ? `(${cart.length})` : ""}`}
      additional={[{ name: "robots", content: "noindex" }]}
    >
      <Window className="cart small" crumbs={[{ title: "cart" }]}>
        <div className="cart-items">
          {cartUpdating ? (
            <h2 className="--muted loading">(loading)</h2>
          ) : cart.length ? (
            cart.map((item) => (
              <div className="cart-item">
                <Link to={item.url} className="cart-item-image">
                  <GatsbyImage image={item.image} />
                </Link>
                <div className="cart-item-details">
                  <h1 className="italic">
                    <Link to={item.url}>{item.title}</Link>
                  </h1>
                  <h3 className="--muted">{item.author}</h3>
                  <h2 className="breakdown">
                    quantity:{" "}
                    <select
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartQuantity(item.slug, e.target.value)
                      }
                    >
                      {[...Array(item.maxQuantity).keys()].map((n) => (
                        <option value={n + 1}>{n + 1}</option>
                      ))}
                    </select>
                  </h2>
                  <h2>
                    subtotal: ${((item.quantity * item.price) / 100).toFixed(2)}
                  </h2>
                </div>
                <button
                  className="inverted"
                  onClick={() => removeCartItem(item.slug)}
                >
                  <p>delete</p>
                </button>
              </div>
            ))
          ) : (
            <h2>
              your cart is empty, why not check out our{" "}
              <Link to="/catalogue">catalogue</Link>?
            </h2>
          )}
        </div>
      </Window>
    </Layout>
  );
}
