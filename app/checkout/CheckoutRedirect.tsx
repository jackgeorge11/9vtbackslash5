"use client";

import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Window from "@/components/Window";
import { CartContext } from "@/contexts/CartContext";
import type { CartEntry } from "@/lib/types";

interface CheckoutRedirectProps {
  entries: CartEntry[];
}

export default function CheckoutRedirect({ entries }: CheckoutRedirectProps) {
  const { mergeCartItems, cartReady } = useContext(CartContext);
  const router = useRouter();

  // Strict Mode runs mount effects twice in development, and a resolved import
  // left to run again would add every quantity a second time.
  const imported = useRef(false);

  useEffect(() => {
    if (!cartReady || imported.current) return;
    imported.current = true;
    // `replace` rather than `push`: this route is a step the buyer passes
    // through, and leaving it in history would re-run the import — doubling
    // their quantities — the moment they pressed Back from the cart.
    mergeCartItems(entries).then(() => router.replace("/cart"));
  }, [cartReady, entries, mergeCartItems, router]);

  return (
    <Layout page="cart">
      <Window className="cart small" crumbs={[{ title: "cart" }]}>
        <h1>Cart</h1>
        <h2 className="--muted loading">(loading)</h2>
      </Window>
    </Layout>
  );
}
