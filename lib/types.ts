/* eslint-disable @typescript-eslint/no-explicit-any */

// Loose types for Contentful fields accessed via SDK — kept permissive
// since content models are defined in the CMS, not in code.

export type ContentfulFields = Record<string, any>;

export interface CartItem {
  quantity: number;
  maxQuantity: number;
  slug: string;
  url: string;
  type: string;
  price: number;
  tax: number;
  title: string;
  author?: string;
  image?: string;
  shipping: ShippingOption[];
  shippingOption?: string;
  preorder?: boolean;
  preorderShipDate?: string;
  blurb?: string;
}

// Contentful delivers the shipping JSON field as plain objects.
// Legacy carts persisted by the Gatsby site wrapped each option in a
// node with a JSON string at internal.content — see normalizeShippingOption.
export interface ShippingOption {
  to: string;
  cost: number;
}

export interface Crumb {
  title: string;
  slug?: string;
}
