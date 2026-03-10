"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { CartItem } from "@/lib/types";

interface PayPalCheckoutProps {
  cart: CartItem[];
  getItemTotal: (item: CartItem) => number;
  clearCart: () => Promise<void>;
  onSuccess: (message: string) => void;
}

export default function PayPalCheckout({
  cart,
  getItemTotal,
  clearCart,
  onSuccess,
}: PayPalCheckoutProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ color: "black" }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: cart.map((item) => ({
              reference_id: item.slug,
              amount: {
                currency_code: "USD",
                value: (getItemTotal(item) / 100).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: ((item.quantity * item.price) / 100).toFixed(2),
                  },
                  shipping: {
                    currency_code: "USD",
                    value: (
                      (JSON.parse(
                        item.shipping[Number(item.shippingOption)].fields
                          .content
                      ).cost *
                        item.quantity) /
                      100
                    ).toFixed(2),
                  },
                  tax_total: {
                    currency_code: "USD",
                    value: (
                      (item.quantity * item.price * item.tax) /
                      100
                    ).toFixed(2),
                  },
                },
              },
              items: [
                {
                  unit_amount: {
                    currency_code: "USD",
                    value: String((item.price / 100).toFixed(2)),
                  },
                  quantity: String(item.quantity),
                  name: item.title,
                  description: item.blurb ? item.blurb : "",
                },
              ],
            })),
          });
        }}
        onApprove={(_data, actions) => {
          return actions.order!.capture().then(function (details) {
            clearCart();
            onSuccess(
              `Thanks for your purchase, ${details.payer?.name?.given_name}.`
            );
          });
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    </PayPalScriptProvider>
  );
}
