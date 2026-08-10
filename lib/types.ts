/* eslint-disable @typescript-eslint/no-explicit-any */

// Loose types for Contentful fields accessed via SDK — kept permissive
// since content models are defined in the CMS, not in code.

export type ContentfulFields = Record<string, any>;

// All that is persisted for a cart: which book, how many, and where it is
// going. Everything priced is read from Contentful when the cart renders, so a
// correction in the CMS reaches carts that already exist. The destination is
// stored by name rather than by position in the shipping table, which would
// point somewhere else the moment that table is reordered.
export interface CartEntry {
  slug: string;
  quantity: number;
  shippingTo?: string;
}

// Contentful delivers the shipping JSON field as plain objects.
export interface ShippingOption {
  to: string;
  cost: number;
}

export interface Crumb {
  title: string;
  slug?: string;
}
