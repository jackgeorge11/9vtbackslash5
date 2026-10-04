import { MAX_QUANTITY } from "@/lib/cart";
import type { CartEntry } from "@/lib/types";

// Meta appends `products=SLUG:QUANTITY,...` to the checkout URL when a buyer
// taps Buy on Instagram or Facebook. The ids in the Meta catalogue are the
// Contentful slugs the cart already keys on, so an incoming id needs no
// translation — it either names a publication or it is unknown.
//
// Nothing here rejects the whole string: a buyer who tapped Buy on three books
// should not lose all three because Meta sent one id we no longer publish.
export function parseProducts(
  products: string,
  known: Set<string>
): CartEntry[] {
  const quantities = new Map<string, number>();

  for (const pair of products.split(",")) {
    const [rawSlug, rawQuantity] = pair.split(":");
    const slug = rawSlug?.trim();
    if (!slug || !known.has(slug)) continue;

    // A quantity Meta omitted, or sent as something that is not a whole
    // positive number, still means the buyer tapped Buy on this book, so it
    // counts as one copy rather than none.
    const parsed = Number(rawQuantity);
    const quantity =
      Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;

    quantities.set(slug, (quantities.get(slug) ?? 0) + quantity);
  }

  return [...quantities].map(([slug, quantity]) => ({
    slug,
    quantity: Math.min(quantity, MAX_QUANTITY),
  }));
}
