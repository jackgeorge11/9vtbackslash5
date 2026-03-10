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

export interface ShippingOption {
  fields: {
    content: string;
  };
  internal?: {
    content: string;
  };
}

export interface Crumb {
  title: string;
  slug?: string;
}
