import type { ContentfulFields } from "@/lib/types";

const SITE_URL = "https://www.9vtbackslash5.com";

// Escapes "<" so a literal "</script>" in CMS data can't close the
// JSON-LD script tag early.
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "9VT\\5",
    url: SITE_URL,
    sameAs: ["https://instagram.com/9vtbackslash5"],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "home",
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    ],
  };
}

export function productJsonLd(pub: ContentfulFields, description?: string) {
  const coverUrl = pub.cover?.fields?.file?.url as string | undefined;
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Book"],
    name: pub.title,
    description: description || `${pub.title}, by ${pub.author}`,
    ...(coverUrl && { image: `https:${coverUrl}` }),
    ...(pub.author && {
      author: { "@type": "Person", name: pub.author },
    }),
    publisher: { "@type": "Organization", name: "9VT\\5" },
    ...(pub.releaseDate && { datePublished: pub.releaseDate }),
    ...(pub.pageCount && { numberOfPages: pub.pageCount }),
    ...(pub.genre && { genre: pub.genre }),
    ...(pub.isbn && { isbn: pub.isbn }),
    ...(pub.price != null && {
      offers: {
        "@type": "Offer",
        // pub.price is stored in cents; schema.org expects major units
        price: (pub.price / 100).toFixed(2),
        priceCurrency: "USD",
        availability:
          pub.soldOut === true
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
        url: `${SITE_URL}/catalogue/${pub.slug}`,
      },
    }),
  };
}
