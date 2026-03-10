export interface NavItem {
  title: string;
  slug: string;
}

export const NAV_ITEMS: Record<string, NavItem> = {
  home: { title: "home", slug: "/" },
  catalogue: { title: "catalogue", slug: "/catalogue" },
  submissions: { title: "submissions", slug: "/submissions" },
  about: { title: "about", slug: "/about" },
  inquiries: { title: "inquiries", slug: "/inquiries" },
  cart: { title: "cart", slug: "/cart" },
};

export const SITE_METADATA = {
  title: "9VT\\5",
  description:
    "9VT\\5, also 9vtbackslash5, is an independent publishing house and creative platform for artists, authors, and others.",
  siteUrl: "https://www.9vtbackslash5.com",
};
