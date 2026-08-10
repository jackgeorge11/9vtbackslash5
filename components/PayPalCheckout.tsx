"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { lineShipping, lineSubtotal, lineTax, lineTotal } from "@/lib/cart";
import type { CartLine } from "@/lib/cart";

interface PayPalCheckoutProps {
  lines: CartLine[];
  clearCart: () => Promise<void>;
  onSuccess: (message: string) => void;
}

const usd = (cents: number) => ({
  currency_code: "USD",
  value: (cents / 100).toFixed(2),
});

export default function PayPalCheckout({
  lines,
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
            purchase_units: lines.map((line) => ({
              reference_id: line.entry.slug,
              amount: {
                ...usd(lineTotal(line)),
                breakdown: {
                  item_total: usd(lineSubtotal(line)),
                  shipping: usd(lineShipping(line)),
                  tax_total: usd(lineTax(line)),
                },
              },
              items: [
                {
                  unit_amount: usd(line.pub!.price),
                  quantity: String(line.entry.quantity),
                  name: line.pub!.title,
                  description: line.pub!.blurb ?? "",
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
