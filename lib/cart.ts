import type { Entry, EntrySkeletonType } from "contentful";
import type { CartEntry, ContentfulFields, ShippingOption } from "@/lib/types";

export const MAX_QUANTITY = 5;

// Carts written before this stored a copy of the whole publication, which then
// drifted from the CMS. Only the slug and quantity are read back — both shapes
// carry them — and everything else is dropped. A shipping choice made against
// the old shape was an index into a table we no longer keep, so it is not
// carried over and the destination has to be picked again.
export function readStoredEntry(stored: unknown): CartEntry | null {
  const item = stored as Record<string, unknown>;
  if (typeof item?.slug !== "string") return null;
  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity < 1) return null;
  return {
    slug: item.slug,
    quantity: Math.min(Math.floor(quantity), MAX_QUANTITY),
    ...(typeof item.shippingTo === "string" && { shippingTo: item.shippingTo }),
  };
}

// A cart entry joined to the publication it refers to. `pub` is absent when the
// book is no longer published, and `unavailable` explains why a line cannot be
// bought; either way the line still renders so it can be removed.
export interface CartLine {
  entry: CartEntry;
  pub?: ContentfulFields;
  shipping: ShippingOption[];
  selected?: ShippingOption;
  unavailable?: string;
}

export function buildCartLines(
  entries: CartEntry[],
  publications: Entry<EntrySkeletonType>[]
): CartLine[] {
  const bySlug = new Map<string, ContentfulFields>();
  for (const item of publications) {
    const fields = item.fields as ContentfulFields;
    if (typeof fields?.slug === "string") bySlug.set(fields.slug, fields);
  }

  return entries.map((entry) => {
    const pub = bySlug.get(entry.slug);
    if (!pub) {
      return { entry, shipping: [], unavailable: "no longer available" };
    }
    const shipping: ShippingOption[] = Array.isArray(pub.shipping)
      ? pub.shipping
      : [];
    return {
      entry,
      pub,
      shipping,
      selected: shipping.find((option) => option.to === entry.shippingTo),
      unavailable: pub.soldOut
        ? "sold out"
        : pub.saleEnded
          ? "no longer on sale"
          : undefined,
    };
  });
}

// Tax is a fraction of the price, so anything at or above 1 is a percentage
// that was entered without converting — 8.625 would bill as 862.5%. Such a
// value is ignored rather than guessed at, which undercharges by a little
// instead of overcharging by a lot; correcting the entry in Contentful reaches
// live carts within seconds via the revalidate webhook.
export function taxRate(pub?: ContentfulFields): number {
  const tax = pub?.tax;
  return typeof tax === "number" && Number.isFinite(tax) && tax >= 0 && tax < 1
    ? tax
    : 0;
}

export function lineSubtotal(line: CartLine): number {
  return line.pub ? line.pub.price * line.entry.quantity : 0;
}

// Rounded to whole cents here rather than at display time, so the parts always
// add up to the total PayPal is given and it cannot reject the breakdown.
export function lineTax(line: CartLine): number {
  return Math.round(lineSubtotal(line) * taxRate(line.pub));
}

export function lineShipping(line: CartLine): number {
  return line.selected ? line.selected.cost * line.entry.quantity : 0;
}

export function lineTotal(line: CartLine): number {
  return lineSubtotal(line) + lineTax(line) + lineShipping(line);
}

export function isBuyable(line: CartLine): boolean {
  return !!line.pub && !line.unavailable;
}

export function cartSum(lines: CartLine[]): number {
  return lines.filter(isBuyable).reduce((sum, line) => sum + lineTotal(line), 0);
}

export function canCheckout(lines: CartLine[]): boolean {
  return (
    lines.length > 0 && lines.every((line) => isBuyable(line) && line.selected)
  );
}
