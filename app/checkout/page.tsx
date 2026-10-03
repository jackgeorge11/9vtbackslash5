import { redirect } from "next/navigation";
import { getAllPublicationSlugs } from "@/lib/contentful";
import { parseProducts } from "@/lib/checkout";
import CheckoutRedirect from "./CheckoutRedirect";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "checkout",
  robots: { index: false, follow: false },
};

// Where Meta sends a buyer who taps Buy on Instagram or Facebook. A `coupon`
// parameter is accepted and deliberately ignored: there is no discount system
// here to apply one to, and refusing the URL over it would cost a sale.
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { products } = await searchParams;
  const slugs = await getAllPublicationSlugs();

  const entries = parseProducts(
    Array.isArray(products) ? products.join(",") : (products ?? ""),
    new Set(slugs.map((item) => item.slug).filter(Boolean))
  );

  // Nothing recognisable to buy — a withdrawn title, a mangled link, or a bare
  // visit to the route. The catalogue is a better landing than an error page
  // for someone who arrived here meaning to shop.
  if (!entries.length) redirect("/catalogue");

  return <CheckoutRedirect entries={entries} />;
}
